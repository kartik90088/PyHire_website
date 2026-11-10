import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertCircle, ArrowRight, Building, Building2, CheckCircle2, Clock, Layers, Loader2, Mail, Phone, Send, Sparkles } from 'lucide-react';
import { useSeo } from '../../lib/useSeo';
import { absoluteUrl } from '../../lib/site';
import { CREAM, Eyebrow } from '../../components/home/shared';
import { useLoops, useScrollTop } from '../../components/site/PageParts';

/**
 * Contact — copy and fields from the PyHire website content document,
 * section 14. Posts to /api/contact (nginx → pyhire-site-api on 127.0.0.1:8060),
 * which records every enquiry before emailing it.
 *
 * The document marks the office address, phone number and reply-time promise
 * "confirm before publishing"; the phone, email and hours shown are the ones
 * already published on the earlier site.
 *
 * `?topic=` (set by the trial, partner, enterprise and app buttons)
 * labels the enquiry so sales knows what was asked for.
 */

const TOPICS: Record<string, string> = {
  trial: 'Starting the 15-day free trial',
  partner: 'Becoming a partner',
  enterprise: 'The Enterprise plan',
  app: 'The mobile app',
};

const COMPANY_TYPES = ['Consultancy', 'In-house HR', 'Both'];
const TEAM_SIZES = ['1–5', '6–20', '21–100', '100+'];

const TYPE_ICONS: Record<string, typeof Building> = { Consultancy: Building2, 'In-house HR': Building, Both: Layers };

const EMPTY = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  companyType: '',
  teamSize: '',
  message: '',
  consent: false,
};
type Field = keyof typeof EMPTY;

export function Contact() {
  useScrollTop();
  useSeo({
    title: 'Contact PyHire — Book a Demo',
    description: 'Book a demo, ask about pricing or partnerships. We reply within one business day.',
    canonicalPath: '/contact',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact PyHire',
        url: absoluteUrl('/contact'),
        mainEntity: {
          '@type': 'Organization',
          '@id': `${absoluteUrl('/')}#organization`,
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            telephone: '+91-9964667676',
            email: 'support@veriright.com',
            areaServed: 'IN',
            availableLanguage: 'en',
          },
        },
      },
    ],
  });

  const [params] = useSearchParams();
  const topicKey = params.get('topic') ?? '';
  const topic = TOPICS[topicKey];

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  function update(field: Field, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: '' } : prev));
  }

  function validate() {
    const next: Partial<Record<Field, string>> = {};
    if (!form.fullName.trim()) next.fullName = 'Please enter your full name.';
    if (!form.email.trim()) next.email = 'Please enter your work email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Please enter a valid email address.';
    if (!form.phone.trim()) next.phone = 'Please enter your phone number.';
    if (!form.company.trim()) next.company = 'Please enter your company.';
    if (!form.companyType) next.companyType = 'Please choose your company type.';
    if (!form.consent) next.consent = 'Please agree to be contacted so we can reply.';
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    const first = Object.keys(found).find((k) => found[k as Field]);
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }

    setStatus('submitting');
    setServerError('');
    const [firstName, ...rest] = form.fullName.trim().split(/\s+/);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          topic: topic ?? '',
          /* Legacy fields for a server that predates this form (firstName and a
             non-empty message were required). Safe to drop once the API in
             server/index.js is deployed everywhere. */
          firstName,
          lastName: rest.join(' '),
          subject: [topic ?? 'Website enquiry', form.company, form.companyType && `(${form.companyType})`]
            .filter(Boolean)
            .join(' — '),
          message: form.message.trim() || '(No message)',
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${response.status})`);
      }
      setStatus('success');
      setForm(EMPTY);
      requestAnimationFrame(() => {
        document.getElementById('contact-form-panel')?.scrollIntoView({ block: 'center' });
      });
    } catch (error) {
      setStatus('error');
      setServerError(error instanceof Error ? error.message : 'Something went wrong.');
    }
  }

  const fieldClass = (field: Field) =>
    `w-full bg-white border ${
      errors[field] ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-violet-500 focus:ring-violet-100'
    } text-[#1B1650] text-[16px] rounded-xl px-4 py-3.5 outline-none focus:ring-2 transition-all placeholder:text-slate-400`;

  /* Progress through the required fields — fills as the visitor completes the form. */
  const required = [
    form.fullName.trim(),
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
    form.phone.trim(),
    form.company.trim(),
    form.companyType,
    form.consent,
  ];
  const done = required.filter(Boolean).length;

  /* "What happens next" lights up step by step. */
  const loops = useLoops();
  const [next, setNext] = useState(2);
  useEffect(() => {
    if (!loops) return;
    setNext(0);
    const id = setInterval(() => setNext((n) => (n + 1) % 4), 1500);
    return () => clearInterval(id);
  }, [loops]);

  const labelClass = 'block text-[14px] font-semibold text-[#1B1650] mb-1.5';
  const helpClass = 'mt-1.5 text-[13px] text-slate-500';

  function ErrorText({ field }: { field: Field }) {
    return errors[field] ? (
      <p id={`${field}-error`} role="alert" className="mt-1.5 text-[13px] text-red-600">{errors[field]}</p>
    ) : null;
  }

  const described = (field: Field, help?: boolean) =>
    [errors[field] && `${field}-error`, help && `${field}-help`].filter(Boolean).join(' ') || undefined;

  return (
    <main className="font-inter text-[#1B1650]">
      <section className="relative overflow-x-clip pt-28 lg:pt-32 pb-12 lg:pb-16" style={{ backgroundColor: CREAM }}>
        <div aria-hidden="true" className="absolute right-0 top-16 w-[48%] h-[80%] rounded-l-[80px] bg-gradient-to-br from-[#EEEAFE] via-[#F6F3FF] to-transparent" />

        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-12 items-start">
          <motion.div className="lg:sticky lg:top-28" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-4 font-display font-bold text-[2.5rem] sm:text-[3.25rem] leading-[1.05] tracking-[-0.04em]">
              Let’s talk about your hiring.
            </h1>
            <p className="mt-6 text-[1.125rem] sm:text-[1.3rem] leading-[1.6] text-[#514D7A]">
              Book a demo, ask about pricing or partnerships. We reply within one business day.
            </p>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: Phone, label: 'Call us', value: '+91 9964667676', href: 'tel:+919964667676', wide: false },
                { icon: Mail, label: 'Email', value: 'support@veriright.com', href: 'mailto:support@veriright.com', wide: false },
                { icon: Clock, label: 'Hours', value: 'Mon–Sat, 9:30 AM – 7:00 PM IST', href: undefined, wide: true },
              ].map(({ icon: Icon, label, value, href, wide }, i) => {
                const body = (
                  <>
                    <span className="w-11 h-11 rounded-2xl bg-[#EEEAFE] text-[#5B21B6] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#6D28D9] group-hover:text-white group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12px] font-semibold uppercase tracking-wider text-slate-400">{label}</span>
                      <span className="block font-semibold text-[15px] text-[#1B1650] truncate">{value}</span>
                    </span>
                  </>
                );
                const cls = `group flex items-center gap-3.5 rounded-2xl border border-[#E7E3F6] bg-white px-4 py-3.5 shadow-[0_12px_28px_-22px_rgba(27,22,80,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C4B5FD] hover:shadow-[0_20px_40px_-24px_rgba(109,40,217,0.5)]`;
                return (
                  <motion.li key={label} className={wide ? 'sm:col-span-2' : ''} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.35 + i * 0.1 }}>
                    {href ? (
                      <a href={href} className={`${cls} outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]`}>{body}</a>
                    ) : (
                      <div className={cls}>{body}</div>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            {/* What happens next — each step restates a promise from the content document */}
            <motion.div
              className="relative mt-6 overflow-hidden rounded-[28px] bg-panel p-6 text-white shadow-[0_28px_60px_-30px_rgba(27,22,80,0.7)]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div aria-hidden="true" className="absolute -right-12 -top-16 w-52 h-52 rounded-full bg-[#6D28D9]/25 blur-3xl" />
              <p className="relative flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#C4B5FD]">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" /> What happens next
              </p>
              <ol className="relative mt-5">
                {[
                  { icon: Send, title: 'You send your details', text: 'Name, work email, phone and company.' },
                  { icon: Mail, title: 'We reply', text: 'Within one business day.' },
                  { icon: Sparkles, title: 'See PyHire on your own roles', text: 'A 30-minute demo with one of your open positions.' },
                ].map(({ icon: Icon, title, text }, i, arr) => {
                  const lit = i <= next;
                  return (
                    <li key={title} className="relative flex gap-4 pb-6 last:pb-0">
                      {i < arr.length - 1 && (
                        <span aria-hidden="true" className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-white/15 overflow-hidden">
                          <span className={`block w-full bg-[#6D28D9] transition-all duration-700 ${i < next ? 'h-full' : 'h-0'}`} />
                        </span>
                      )}
                      <span className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${lit ? 'bg-[#6D28D9] text-white scale-100' : 'bg-white/10 text-white/60 scale-95'}`}>
                        <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                      </span>
                      <span className={`transition-opacity duration-500 ${lit ? 'opacity-100' : 'opacity-50'}`}>
                        <span className="block font-display font-bold text-[16px]">{title}</span>
                        <span className="block text-[14px] text-white/70">{text}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </motion.div>
          </motion.div>

          <motion.div
            id="contact-form-panel"
            className="beam rounded-[32px] bg-white border border-black/5 p-7 sm:p-10 shadow-[0_24px_60px_-30px_rgba(17,17,17,0.3)] scroll-mt-28"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {status === 'success' ? (
              <div role="status" className="text-center py-8">
                <motion.span
                  className="mx-auto w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                >
                  <CheckCircle2 className="w-8 h-8" strokeWidth={2.5} aria-hidden="true" />
                </motion.span>
                <p className="mt-5 text-[1.25rem] font-semibold leading-[1.5] max-w-md mx-auto">
                  Thank you — we have your message and will be in touch within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-[15px] font-semibold text-[#5B21B6] hover:underline outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-busy={status === 'submitting'} className="space-y-5">
                <div>
                  <div className="flex items-end justify-between">
                    <p className="font-display font-extrabold text-[1.5rem] leading-none tracking-[-0.02em] text-[#1B1650]">Book a demo</p>
                    <p className="text-[12px] font-semibold text-slate-500" aria-live="polite">{done} of 6 required</p>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-violet-100 overflow-hidden" aria-hidden="true">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-[#6D28D9] to-[#A78BFA]" animate={{ width: `${(done / 6) * 100}%` }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
                  </div>
                </div>
                {topic && (
                  <p className="inline-flex rounded-full bg-violet-50 border border-violet-100 px-4 py-1.5 text-[14px] text-violet-800">
                    About: <span className="ml-1 font-semibold">{topic}</span>
                  </p>
                )}
                {status === 'error' && (
                  <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-[14px] text-red-800 leading-relaxed">
                      We couldn't send your message{serverError ? ` (${serverError})` : ''}. Please try again, or email us at{' '}
                      <a href="mailto:support@veriright.com" className="font-semibold underline">support@veriright.com</a>.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className={labelClass}>Full name</label>
                    <input id="fullName" name="fullName" autoComplete="name" required value={form.fullName}
                      onChange={(e) => update('fullName', e.target.value)} aria-invalid={!!errors.fullName}
                      aria-describedby={described('fullName')} className={fieldClass('fullName')} />
                    <ErrorText field="fullName" />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Work email</label>
                    <input id="email" name="email" type="email" autoComplete="email" required value={form.email}
                      onChange={(e) => update('email', e.target.value)} aria-invalid={!!errors.email}
                      aria-describedby={described('email', true)} className={fieldClass('email')} />
                    <p id="email-help" className={helpClass}>We’ll send the demo invite here</p>
                    <ErrorText field="email" />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" required value={form.phone}
                      onChange={(e) => update('phone', e.target.value)} aria-invalid={!!errors.phone}
                      aria-describedby={described('phone', true)} className={fieldClass('phone')} />
                    <p id="phone-help" className={helpClass}>With country code</p>
                    <ErrorText field="phone" />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClass}>Company</label>
                    <input id="company" name="company" autoComplete="organization" required value={form.company}
                      onChange={(e) => update('company', e.target.value)} aria-invalid={!!errors.company}
                      aria-describedby={described('company')} className={fieldClass('company')} />
                    <ErrorText field="company" />
                  </div>
                </div>

                <fieldset>
                  <legend className={labelClass}>Company type</legend>
                  <div className="flex flex-wrap gap-2">
                    {COMPANY_TYPES.map((type, i) => (
                      <label key={type}
                        className={`cursor-pointer rounded-xl border px-4 py-2.5 text-[15px] transition-all duration-200 hover:-translate-y-0.5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#6D28D9] ${
                          form.companyType === type ? 'border-[#6D28D9] bg-violet-50 text-violet-800 font-semibold' : 'border-slate-200 hover:border-slate-300'
                        }`}>
                        <input type="radio" name="companyType" value={type} id={i === 0 ? 'companyType' : undefined}
                          checked={form.companyType === type} onChange={() => update('companyType', type)} className="sr-only" />
                        {(() => { const I = TYPE_ICONS[type]; return <I className={`inline w-4 h-4 mr-2 -mt-0.5 ${form.companyType === type ? 'text-[#6D28D9]' : 'text-slate-400'}`} aria-hidden="true" />; })()}
                        {type}
                      </label>
                    ))}
                  </div>
                  <ErrorText field="companyType" />
                </fieldset>

                <div>
                  <label htmlFor="teamSize" className={labelClass}>
                    Team size <span className="font-normal text-slate-500">(optional)</span>
                  </label>
                  <select id="teamSize" name="teamSize" value={form.teamSize}
                    onChange={(e) => update('teamSize', e.target.value)} className={fieldClass('teamSize')}>
                    <option value="">Choose…</option>
                    {TEAM_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    What would you like to see? <span className="font-normal text-slate-500">(optional)</span>
                  </label>
                  <textarea id="message" name="message" rows={4} value={form.message}
                    onChange={(e) => update('message', e.target.value)} aria-describedby="message-help"
                    className={`${fieldClass('message')} resize-y`} />
                  <p id="message-help" className={helpClass}>Tell us about your roles or questions</p>
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input id="consent" name="consent" type="checkbox" checked={form.consent}
                      onChange={(e) => update('consent', e.target.checked)} aria-invalid={!!errors.consent}
                      aria-describedby={described('consent')}
                      className="mt-1 w-4 h-4 rounded border-slate-300 accent-[#6D28D9]" />
                    <span className="text-[14px] leading-relaxed text-slate-600">
                      I agree to receive communications from PyHire about their products and services, and accept the{' '}
                      <Link to="/privacy-policy" className="font-semibold text-[#5B21B6] hover:underline">Privacy Policy</Link>.
                    </span>
                  </label>
                  <ErrorText field="consent" />
                </div>

                <button type="submit" disabled={status === 'submitting'}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#6D28D9] hover:bg-[#8B5CF6] disabled:opacity-70 px-8 py-3.5 text-[16px] font-bold text-white shadow-[0_14px_30px_-12px_rgba(109,40,217,0.7)] transition-all hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2">
                  <span aria-hidden="true" className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/30 transition-transform duration-700 group-hover:translate-x-[520%]" />
                  {status === 'submitting' ? <Loader2 className="relative w-4 h-4 animate-spin" aria-hidden="true" /> : null}
                  <span className="relative">Send</span>
                  {status !== 'submitting' && <ArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
                </button>
                <p className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" /> We reply within one business day</span>
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" /> No card needed for the trial</span>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
