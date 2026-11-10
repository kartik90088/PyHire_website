/**
 * pyhire-site-api — the contact form's only backend.
 *
 * Scope is deliberately tiny: accept one POST, write it down, email it on.
 * The marketing site has no other server-side needs, and every capability added
 * here becomes something that has to be patched and monitored.
 *
 * Two things are worth understanding before changing this file:
 *
 * 1. Every enquiry is appended to leads.jsonl BEFORE the email is attempted.
 *    Email is the part most likely to break — an expired SMTP password, a
 *    provider rate limit, a DNS blip — and a lead that only ever existed in a
 *    failed sendMail() call is a lead lost silently. The file is the source of
 *    truth; the email is a notification about it. If the two disagree, trust
 *    the file.
 *
 * 2. It binds to 127.0.0.1 only. nginx proxies /api/ to it. Never bind this to
 *    0.0.0.0 — it has no authentication because it is not reachable from
 *    outside the host.
 *
 * Config comes from server/.env (see .env.example). Start with:
 *   node --env-file=.env index.js
 */

import express from 'express';
import nodemailer from 'nodemailer';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8060);
const HOST = '127.0.0.1';
const LEADS_FILE = path.join(ROOT, 'data', 'leads.jsonl');

const MAIL_TO = process.env.MAIL_TO || 'support@veriright.com';
const MAIL_FROM = process.env.MAIL_FROM || MAIL_TO;

const app = express();
app.use(express.json({ limit: '32kb' }));

/* nginx sits in front, so req.ip must come from X-Forwarded-For or every
   visitor shares the proxy's address and the rate limiter becomes a global
   throttle instead of a per-visitor one. */
app.set('trust proxy', 1);

/* ------------------------------------------------------------------ */
/* Rate limiting                                                       */
/*                                                                     */
/* A public form with an email side effect is a spam amplifier. Five   */
/* submissions per IP per 15 minutes is far above what a real enquirer */
/* needs and far below what makes this worth abusing. In-memory on     */
/* purpose: one process, and a restart clearing the counters is not a  */
/* problem worth a Redis dependency.                                   */
/* ------------------------------------------------------------------ */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  /* Opportunistic cleanup — without it the map grows for the life of the
     process, one entry per IP that ever submitted. */
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

/* ------------------------------------------------------------------ */
/* Validation — the client's checks are for the visitor's benefit;     */
/* these are the ones that actually matter.                            */
/* ------------------------------------------------------------------ */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

const COMPANY_TYPES = ['Consultancy', 'In-house HR', 'Both'];
const TEAM_SIZES = ['1–5', '6–20', '21–100', '100+'];

/**
 * Two payload shapes are accepted:
 *  - current form (content document, Oct 2026): fullName, email, phone,
 *    company, companyType, optional teamSize/message/topic, consent;
 *  - the earlier form: firstName/lastName, email, phone, subject, message.
 * The legacy shape keeps visitors on a cached old page from being rejected;
 * it can be removed once no old bundle is in circulation.
 */
function validate(body) {
  const legacy = !body.fullName;
  const firstName = clean(body.firstName, 100);
  const lastName = clean(body.lastName, 100);
  const data = {
    fullName: legacy ? [firstName, lastName].filter(Boolean).join(' ') : clean(body.fullName, 200),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    company: clean(body.company, 200),
    companyType: clean(body.companyType, 40),
    teamSize: clean(body.teamSize, 20),
    topic: clean(body.topic, 100),
    subject: clean(body.subject, 200),
    message: clean(body.message, 5000),
    consent: body.consent === true,
  };

  const errors = [];
  if (!data.fullName) errors.push('Full name is required.');
  if (!data.email) errors.push('Email address is required.');
  else if (!EMAIL_RE.test(data.email)) errors.push('Email address is not valid.');
  if (legacy) {
    if (!data.message) errors.push('Message is required.');
  } else {
    if (!data.phone) errors.push('Phone is required.');
    if (!data.company) errors.push('Company is required.');
    if (!COMPANY_TYPES.includes(data.companyType)) errors.push('Company type is required.');
    if (data.teamSize && !TEAM_SIZES.includes(data.teamSize)) data.teamSize = '';
  }
  if (!data.consent) errors.push('Consent is required.');

  return { data, errors };
}

/* Header injection guard: a newline in a value that lands in a Subject or
   Reply-To lets an attacker append their own headers. */
const stripNewlines = (value) => value.replace(/[\r\n]+/g, ' ').trim();

/* ------------------------------------------------------------------ */
/* Mail                                                                */
/* ------------------------------------------------------------------ */
let transporter = null;

if (process.env.SMTP_HOST) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
} else {
  console.warn('[pyhire-site-api] SMTP_HOST is not set — enquiries will be recorded to');
  console.warn('[pyhire-site-api] leads.jsonl but NO email will be sent. Set it in .env.');
}

function emailBody(data, meta) {
  return [
    `New enquiry from the PyHire website.`,
    ``,
    `Name:         ${data.fullName}`,
    `Email:        ${data.email}`,
    `Phone:        ${data.phone || '—'}`,
    `Company:      ${data.company || '—'}`,
    `Company type: ${data.companyType || '—'}`,
    `Team size:    ${data.teamSize || '—'}`,
    `About:        ${data.topic || data.subject || '—'}`,
    ``,
    `What they would like to see:`,
    data.message || '—',
    ``,
    `---`,
    `Consent given: yes`,
    `Received:      ${meta.receivedAt}`,
    `Source IP:     ${meta.ip}`,
  ].join('\n');
}

/* ------------------------------------------------------------------ */
/* Routes                                                              */
/* ------------------------------------------------------------------ */
app.get('/api/health', (_req, res) => {
  res.json({
    service: 'pyhire-site-api',
    status: 'healthy',
    smtp: transporter ? 'configured' : 'not configured',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/contact', async (req, res) => {
  const ip = req.ip || 'unknown';

  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many messages. Please try again later.' });
  }

  const { data, errors } = validate(req.body || {});
  if (errors.length > 0) {
    return res.status(400).json({ error: errors[0], errors });
  }

  const meta = { receivedAt: new Date().toISOString(), ip };

  /* Record first. See the note at the top of this file. */
  try {
    await mkdir(path.dirname(LEADS_FILE), { recursive: true });
    await appendFile(LEADS_FILE, JSON.stringify({ ...data, ...meta }) + '\n', 'utf8');
  } catch (error) {
    console.error('[pyhire-site-api] FAILED to write lead to disk:', error);
    /* If we can neither store nor (below) send, the honest answer is an error,
       so the visitor knows to use the email address on the page instead. */
    if (!transporter) {
      return res.status(500).json({ error: 'Could not record your message.' });
    }
  }

  if (!transporter) {
    /* Recorded but not delivered. The visitor's message is safe, so this is a
       success from their point of view — the gap is ours to fix. */
    console.warn('[pyhire-site-api] Lead recorded without email (no SMTP configured).');
    return res.status(200).json({ ok: true });
  }

  try {
    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: `${stripNewlines(data.fullName)} <${data.email}>`,
      subject: stripNewlines(
        [
          `PyHire enquiry${data.topic ? ` (${data.topic})` : ''}: ${data.fullName}`,
          data.company,
        ]
          .filter(Boolean)
          .join(' — '),
      ),
      text: emailBody(data, meta),
    });
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[pyhire-site-api] sendMail failed:', error.message);
    /* The lead is already on disk, so do not tell the visitor to resend and
       create a duplicate. Report success and alert on the log line above. */
    res.status(200).json({ ok: true });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`[pyhire-site-api] listening on http://${HOST}:${PORT}`);
  console.log(`[pyhire-site-api] enquiries -> ${MAIL_TO}, recorded in ${LEADS_FILE}`);
});
