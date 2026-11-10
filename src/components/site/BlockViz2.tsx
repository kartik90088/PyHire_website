import type { ReactNode } from 'react';
import { motion, type Transition } from 'motion/react';
import {
  ArrowRight, Bell, Briefcase, Building2, Check, CheckCircle2, Clock, FileText, Globe, KeyRound, Laptop, Link2, Mail,
  MessageCircle, MessageSquareText, Monitor, Phone, Receipt, Send, Smartphone, Star, ThumbsDown, ThumbsUp, TrendingDown,
  Trophy, Users, Wallet, Zap,
} from 'lucide-react';
import { Initials } from '../home/shared';

/**
 * Additional feature-row illustrations, so no two rows on the same product
 * page share one. Same contract as BlockViz: loops only while `on`,
 * otherwise shows the settled final frame. Decorative; names, figures and
 * labels are sample data restating each block's own copy.
 */

const loop = (on: boolean, duration: number, delay = 0, repeatDelay = 1.2): Transition =>
  on ? { duration, delay, repeat: Infinity, repeatDelay, ease: [0.22, 1, 0.36, 1] } : { duration: 0 };
const fin = <T,>(f: T[]) => f[f.length - 1];
const fr = <T,>(on: boolean, f: T[]) => (on ? f : fin(f));
const P = ({ children }: { children: ReactNode }) => <div className="h-full w-full flex flex-col justify-center gap-2">{children}</div>;
const row = 'flex items-center gap-2 rounded-lg bg-white border border-slate-100 px-2.5 py-1.5 text-[10.5px] text-slate-600';

/** Fades/slides an element in at a point in a looping timeline. */
function In({ on, at, children, className = '', x = 0, y = 8, dur = 2.8 }: { on: boolean; at: number; children: ReactNode; className?: string; x?: number; y?: number; dur?: number }) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={{ opacity: fr(on, [0, 0, 1, 1]), x: fr(on, [x, x, 0, 0]), y: fr(on, [y, y, 0, 0]) }}
      transition={{ ...loop(on, dur), times: [0, at, Math.min(at + 0.12, 0.98), 1] }}
    >
      {children}
    </motion.div>
  );
}
/** A bar that fills to `pct`. */
function Fill({ on, pct, delay = 0, tone = 'bg-[#6D28D9]' }: { on: boolean; pct: number; delay?: number; tone?: string }) {
  return (
    <div className="flex-1 h-1.5 rounded-full bg-violet-100 overflow-hidden">
      <motion.div className={`h-full rounded-full ${tone}`} initial={false} animate={{ width: fr(on, ['0%', `${pct}%`, `${pct}%`]) }} transition={{ ...loop(on, 2.4, delay), times: [0, 0.5, 1] }} />
    </div>
  );
}
/** A check that ticks at a point in the timeline. */
function Tick({ on, at, dur = 2.8 }: { on: boolean; at: number; dur?: number }) {
  return (
    <motion.span
      className="w-4 h-4 rounded-full border-2 border-[#6D28D9] text-white flex items-center justify-center shrink-0"
      initial={false}
      animate={{ backgroundColor: fr(on, ['#fff', '#fff', '#6D28D9', '#6D28D9']) }}
      transition={{ ...loop(on, dur), times: [0, at - 0.01, at, 1], ease: 'linear' }}
    >
      <Check className="w-2.5 h-2.5" strokeWidth={3} />
    </motion.span>
  );
}

/* ---------- Clients, vendors & prospects ---------- */
function Onboarding({ on }: { on: boolean }) {
  const steps = ['Company', 'Contacts', 'Locations', 'Hiring needs', 'Commercials', 'Contract & SLA', 'Documents'];
  return (
    <P>
      <p className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-[#6D28D9]" /> New client · Nova Retail</p>
      <div className="grid grid-cols-7 gap-1">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-col items-center gap-1">
            <Tick on={on} at={0.1 + i * 0.1} dur={3.2} />
            <span className="text-[8px] text-center leading-tight text-slate-500">{s}</span>
          </div>
        ))}
      </div>
      <In on={on} at={0.82} dur={3.2} className="self-start rounded-full bg-amber-50 border border-amber-100 px-2.5 py-1 text-[10px] font-semibold text-amber-800">Waiting for approval</In>
    </P>
  );
}
function Reviews({ on }: { on: boolean }) {
  return (
    <P>
      <div className={row}><Users className="w-3.5 h-3.5 text-[#6D28D9]" /> Review · Acme Corp · 3 points · 2 owners</div>
      <In on={on} at={0.15} className={row}><Check className="w-3.5 h-3.5 text-emerald-600" /> Minutes emailed to client</In>
      <In on={on} at={0.4} className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-100 px-2.5 py-1.5 text-[10.5px] text-red-700">
        Complaint · <span className="font-bold">High</span> · late submissions
      </In>
      <In on={on} at={0.65} className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 text-[10.5px] text-emerald-700">
        <CheckCircle2 className="w-3.5 h-3.5" /> Closed · with trail
      </In>
    </P>
  );
}
function Prospects({ on }: { on: boolean }) {
  const cols = ['Lead', 'Proposal', 'Negotiation', 'Won'];
  return (
    <div className="h-full grid grid-cols-4 gap-1.5 items-start">
      {cols.map((c, i) => (
        <div key={c} className="rounded-lg bg-slate-50 border border-slate-100 p-1.5 h-full">
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{c}</p>
          <motion.div
            className={`mt-1.5 rounded-md px-1.5 py-1 text-[9.5px] font-semibold ${i === 3 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-white border border-slate-100 text-slate-700'}`}
            initial={false}
            animate={{ opacity: fr(on, [0, 0, 1, 1, i === 3 ? 1 : 0]) }}
            transition={{ ...loop(on, 3.2), times: [0, i * 0.2, i * 0.2 + 0.05, (i + 1) * 0.2, (i + 1) * 0.2 + 0.05].map((t) => Math.min(t, 1)) }}
          >
            BrightPay
          </motion.div>
          {[['Zenith Labs', 'Kora Foods'], ['Nimbus HR'], ['Vertex Co'], ['Acme Corp']][i].map((n) => (
            <div key={n} className="mt-1.5 rounded-md bg-white border border-slate-100 px-1.5 py-1 text-[9.5px] text-slate-500">{n}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
function VendorRank({ on }: { on: boolean }) {
  const vs = [['Talent Bridge', 92], ['HireHub', 78], ['QuickStaff', 61]] as const;
  return (
    <P>
      {vs.map(([n, sc], i) => (
        <div key={n} className={row}>
          <span className={`w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center ${i === 0 ? 'bg-[#6D28D9] text-white' : 'bg-slate-100 text-slate-600'}`}>#{i + 1}</span>
          <span className="w-20 truncate font-semibold text-slate-700">{n}</span>
          <Fill on={on} pct={sc} delay={i * 0.15} />
          <span className="w-6 text-right font-bold text-slate-700">{sc}</span>
        </div>
      ))}
      <p className="text-[10px] text-slate-500 flex items-center gap-1"><Trophy className="w-3 h-3 text-amber-500" /> Score, rank and trend for every vendor</p>
    </P>
  );
}
function JoinFunnel({ on }: { on: boolean }) {
  const st = [['Offers', 100], ['Accepted', 72], ['Joined', 58]] as const;
  return (
    <P>
      {st.map(([n, w], i) => (
        <div key={n} className="flex items-center gap-2">
          <span className="w-14 text-[10px] text-slate-500">{n}</span>
          <div className="flex-1 h-5 rounded-md bg-violet-50 overflow-hidden">
            <motion.div className="h-full rounded-md bg-gradient-to-r from-[#6D28D9] to-violet-400 flex items-center justify-end pr-1.5 text-[9px] font-bold text-white" initial={false} animate={{ width: fr(on, ['0%', `${w}%`, `${w}%`]) }} transition={{ ...loop(on, 2.6, i * 0.2), times: [0, 0.45, 1] }}>
              {w}%
            </motion.div>
          </div>
        </div>
      ))}
      <In on={on} at={0.6} className="flex items-center gap-1.5 text-[10px] text-slate-600"><TrendingDown className="w-3 h-3 text-red-500" /> Top reason lost: counter-offer</In>
    </P>
  );
}

/* ---------- Communication ---------- */
function Templates({ on }: { on: boolean }) {
  return (
    <P>
      <div className="rounded-lg bg-white border border-slate-100 px-2.5 py-2 text-[10.5px] text-slate-600 leading-relaxed">
        Hi <span className="rounded bg-violet-50 px-1 text-violet-700 font-semibold">{'{first_name}'}</span>, your interview for <span className="rounded bg-violet-50 px-1 text-violet-700 font-semibold">{'{role}'}</span> is confirmed.
      </div>
      <In on={on} at={0.25} className={row}><Clock className="w-3.5 h-3.5 text-[#6D28D9]" /> Scheduled · tomorrow 9:00 AM</In>
      <In on={on} at={0.6} className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 text-[10.5px] text-emerald-700"><Send className="w-3.5 h-3.5" /> Sent at 9:00 AM · 18 candidates</In>
    </P>
  );
}
function Campaign({ on }: { on: boolean }) {
  return (
    <P>
      <div className={row}><Send className="w-3.5 h-3.5 text-[#6D28D9]" /> Campaign · Senior React Developer · 48 sent</div>
      <div className="grid grid-cols-2 gap-2">
        <In on={on} at={0.2} className="rounded-lg bg-emerald-50 border border-emerald-100 px-2 py-2 text-center">
          <ThumbsUp className="w-4 h-4 mx-auto text-emerald-600" /><p className="mt-1 text-[16px] font-bold text-emerald-700">17</p><p className="text-[9px] text-emerald-700">I’m interested</p>
        </In>
        <In on={on} at={0.35} className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-2 text-center">
          <ThumbsDown className="w-4 h-4 mx-auto text-slate-400" /><p className="mt-1 text-[16px] font-bold text-slate-600">9</p><p className="text-[9px] text-slate-500">Not for me</p>
        </In>
      </div>
      <In on={on} at={0.6} className="text-[10px] font-semibold text-violet-700">17 flagged for follow-up</In>
    </P>
  );
}
function Workflow({ on }: { on: boolean }) {
  const nodes = [[Zap, 'Stage → Screened'], [Clock, 'Wait 2 days'], [MessageCircle, 'WhatsApp nudge'], [Bell, 'Remind recruiter']] as const;
  return (
    <div className="h-full flex flex-col justify-center gap-1">
      {nodes.map(([Icon, t], i) => (
        <div key={t}>
          <In on={on} at={0.08 + i * 0.18} className={row}><Icon className="w-3.5 h-3.5 text-[#6D28D9]" /> {t}</In>
          {i < nodes.length - 1 && <div className="ml-4 h-2 border-l-2 border-dashed border-violet-200" />}
        </div>
      ))}
    </div>
  );
}
function CallQuality({ on }: { on: boolean }) {
  const r = [['Opening & intro', 90], ['Role pitch', 75], ['Next steps agreed', 60]] as const;
  return (
    <P>
      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-700"><Initials name="Priya N." size="w-5 h-5 text-[8px]" shape="rounded-full" /> Recruiter · Priya · call scored</div>
      {r.map(([n, v], i) => (
        <div key={n} className="flex items-center gap-2 text-[10px] text-slate-600"><span className="w-28 truncate">{n}</span><Fill on={on} pct={v} delay={i * 0.15} tone="bg-emerald-500" /><span className="w-7 text-right font-bold">{v}</span></div>
      ))}
    </P>
  );
}
function WalletViz({ on }: { on: boolean }) {
  return (
    <P>
      <div className="rounded-xl bg-gradient-to-r from-[#1B1650] to-[#33238A] px-3 py-2.5 text-white flex items-center gap-3">
        <Wallet className="w-5 h-5 text-violet-300" />
        <span><span className="block text-[9px] uppercase tracking-wider text-white/60">Credit wallet</span><span className="block text-[16px] font-bold">₹4,820</span></span>
      </div>
      {[[Mail, 'Own email account · connected'], [MessageCircle, 'PyHire shared WhatsApp']].map(([I, t], i) => {
        const Icon = I as typeof Mail;
        return <In key={t as string} on={on} at={0.2 + i * 0.2} className={row}><Icon className="w-3.5 h-3.5 text-[#6D28D9]" /> {t as string}<Check className="w-3 h-3 ml-auto text-emerald-600" /></In>;
      })}
    </P>
  );
}

/* ---------- Analytics ---------- */
function RoleDash({ on }: { on: boolean }) {
  const roles = ['Admin', 'Manager', 'Recruiter'];
  return (
    <P>
      <div className="flex gap-1">
        {roles.map((r, i) => (
          <motion.span key={r} className="rounded-full px-2 py-0.5 text-[10px] font-semibold border" initial={false}
            animate={{ backgroundColor: fr(on, ['#fff', i === 2 ? '#6D28D9' : '#fff', i === 2 ? '#6D28D9' : '#fff']), color: fr(on, ['#64748b', i === 2 ? '#fff' : '#64748b', i === 2 ? '#fff' : '#64748b']), borderColor: '#e2e8f0' }}
            transition={{ ...loop(on, 2.4, 0.2), times: [0, 0.3, 1] }}>{r}</motion.span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[['My pipeline', '64'], ['Interviews', '9'], ['Joins', '3']].map(([l, v], i) => (
          <In key={l} on={on} at={0.3 + i * 0.1} dur={2.4} className="rounded-lg bg-white border border-slate-100 px-2 py-1.5"><p className="text-[14px] font-bold text-slate-800">{v}</p><p className="text-[9px] text-slate-500">{l}</p></In>
        ))}
      </div>
      <p className="text-[10px] text-slate-500">Click any number to see the candidates behind it</p>
    </P>
  );
}
function Leaderboard({ on }: { on: boolean }) {
  const p = [['Priya N.', 12, 40], ['David Ross', 9, 25], ['Arjun M.', 7, 10]] as const;
  return (
    <P>
      {p.map(([n, joins, free], i) => (
        <In key={n} on={on} at={0.1 + i * 0.15} className={row}>
          <span className="w-4 text-[10px] font-bold text-slate-400">{i + 1}</span>
          <Initials name={n} size="w-5 h-5 text-[8px]" shape="rounded-full" />
          <span className="flex-1 font-semibold text-slate-700">{n}</span>
          <span className="text-slate-500">{joins} joins</span>
          <span className="rounded bg-emerald-50 px-1 text-emerald-700 font-semibold">{free}% free</span>
        </In>
      ))}
    </P>
  );
}
function Sources({ on }: { on: boolean }) {
  const s = [['Careers page', 34, 'bg-[#6D28D9]'], ['Vendors', 28, 'bg-violet-400'], ['Job portals', 22, 'bg-violet-300'], ['Referrals', 16, 'bg-violet-200']] as const;
  return (
    <P>
      <p className="text-[10px] font-semibold text-slate-500">Hires by source</p>
      <div className="flex h-4 rounded-full overflow-hidden">
        {s.map(([n, v, t], i) => (
          <motion.span key={n} className={`${t} h-full`} initial={false} animate={{ width: fr(on, ['0%', `${v}%`, `${v}%`]) }} transition={{ ...loop(on, 2.4, i * 0.15), times: [0, 0.5, 1] }} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
        {s.map(([n, v, t]) => <span key={n} className="flex items-center gap-1 text-[10px] text-slate-600"><span className={`w-2 h-2 rounded-full ${t}`} />{n} · {v}%</span>)}
      </div>
      <In on={on} at={0.6} className="text-[10px] text-red-600 flex items-center gap-1"><TrendingDown className="w-3 h-3" /> Most drop-outs: after interview round 1</In>
    </P>
  );
}

/* ---------- Careers page & portal ---------- */
function PublishToggle({ on }: { on: boolean }) {
  return (
    <P>
      <div className="flex items-center justify-between rounded-lg bg-white border border-slate-100 px-2.5 py-1.5">
        <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-[#6D28D9]" /> Careers page</span>
        <motion.span className="w-9 h-5 rounded-full p-0.5 flex" initial={false} animate={{ backgroundColor: fr(on, ['#cbd5e1', '#6D28D9', '#6D28D9']), justifyContent: fr(on, ['flex-start', 'flex-end', 'flex-end']) }} transition={{ ...loop(on, 2.6), times: [0, 0.2, 1] }}>
          <motion.span layout className="w-4 h-4 rounded-full bg-white shadow" />
        </motion.span>
      </div>
      {[['Senior React Developer', 'Live'], ['Product Manager', 'Live'], ['Client mandate · Acme', 'Hidden']].map(([r, s], i) => (
        <In key={r} on={on} at={0.3 + i * 0.12} className={row}>
          <Briefcase className="w-3.5 h-3.5 text-slate-400" /> <span className="flex-1">{r}</span>
          <span className={`text-[9px] font-bold ${s === 'Live' ? 'text-emerald-600' : 'text-slate-400'}`}>{s}</span>
        </In>
      ))}
    </P>
  );
}
function ApplyFlow({ on }: { on: boolean }) {
  return (
    <div className="h-full flex items-center gap-2">
      <div className="flex-1 rounded-lg bg-white border border-slate-100 p-2 space-y-1.5">
        <p className="text-[10px] font-bold text-slate-700">Apply · Product Manager</p>
        <div className="rounded bg-slate-50 px-2 py-1 text-[9px] text-slate-500 flex items-center gap-1"><FileText className="w-3 h-3" /> resume.pdf</div>
        <div className="rounded bg-slate-50 px-2 py-1 text-[9px] text-slate-500">Notice period? · 30 days</div>
        <span className="block rounded bg-[#6D28D9] text-white text-[9px] font-bold text-center py-1">Submit</span>
      </div>
      <motion.div initial={false} animate={{ x: fr(on, [0, 6, 0]) }} transition={{ ...loop(on, 1.6, 0, 0.4) }}><ArrowRight className="w-4 h-4 text-[#6D28D9]" /></motion.div>
      <In on={on} at={0.4} x={-12} y={0} className="flex-1 rounded-lg bg-[#EEEAFE] border border-violet-100 p-2">
        <p className="text-[9px] font-bold uppercase tracking-wider text-violet-700">New · pipeline</p>
        <div className="mt-1 flex items-center gap-1.5"><Initials name="Priya N." size="w-5 h-5 text-[8px]" shape="rounded-full" /><span className="text-[10px] font-semibold text-slate-700">Priya N.</span></div>
        <p className="mt-1 text-[9px] text-slate-500">Source · Careers page</p>
      </In>
    </div>
  );
}
function MagicLink({ on }: { on: boolean }) {
  return (
    <P>
      <div className={row}><Mail className="w-3.5 h-3.5 text-[#6D28D9]" /> Your sign-in link · <span className="font-semibold text-[#6D28D9]">Open portal</span><Link2 className="w-3 h-3 ml-auto" /></div>
      <In on={on} at={0.25} className="rounded-lg bg-white border border-slate-100 p-2">
        <p className="text-[10px] font-bold text-slate-700 flex items-center gap-1"><KeyRound className="w-3 h-3 text-emerald-600" /> No password needed</p>
        {[['Product Manager', 'Interviewed'], ['UX Researcher', 'Screened']].map(([r, s]) => (
          <div key={r} className="mt-1 flex justify-between text-[10px]"><span className="text-slate-600">{r}</span><span className="font-semibold text-violet-700">{s}</span></div>
        ))}
      </In>
    </P>
  );
}

/* ---------- Mobile ---------- */
function DeviceSync({ on }: { on: boolean }) {
  return (
    <div className="h-full flex items-center justify-center gap-3">
      <div className="w-[120px] rounded-lg border-2 border-slate-700 bg-white p-1.5">
        <div className="flex items-center gap-1 text-[8px] font-bold text-slate-600"><Laptop className="w-3 h-3" /> Web · signed in</div>
        <div className="mt-1 space-y-1">{[70, 90, 55].map((w, i) => <span key={i} className="block h-1 rounded bg-slate-100" style={{ width: `${w}%` }} />)}</div>
      </div>
      <motion.div initial={false} animate={{ opacity: fr(on, [0.3, 1, 0.3]) }} transition={{ ...loop(on, 1.4, 0, 0) }} className="flex gap-0.5">{[0, 1, 2].map((i) => <span key={i} className="w-1 h-1 rounded-full bg-[#6D28D9]" />)}</motion.div>
      <div className="relative">
        <div className="w-[56px] h-[96px] rounded-xl border-[3px] border-slate-700 bg-white p-1 flex flex-col items-center justify-center gap-1">
          <Smartphone className="w-3.5 h-3.5 text-slate-500" /><span className="text-[7px] font-bold text-emerald-600">Phone 2 · active</span>
        </div>
        <In on={on} at={0.4} className="absolute -top-3 -left-16 rounded-md bg-white border border-slate-200 px-1.5 py-1 text-[8px] text-slate-500 shadow-sm whitespace-nowrap">Phone 1 · signed out</In>
      </div>
    </div>
  );
}
function DialApp({ on }: { on: boolean }) {
  return (
    <div className="h-full flex items-center justify-center gap-3">
      <div className="w-[76px] h-[124px] rounded-2xl border-4 border-slate-800 bg-gradient-to-b from-[#33238A] to-[#1B1650] p-1.5 flex flex-col items-center justify-center gap-1 text-white">
        <Initials name="Arjun M." size="w-7 h-7 text-[8px]" shape="rounded-full" />
        <span className="text-[7px]">Calling via PyHire</span>
        <span className="relative w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
          {on && <motion.span className="absolute inset-0 rounded-full border-2 border-emerald-400" animate={{ scale: [1, 1.6], opacity: [0.7, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />}
          <Phone className="w-3 h-3" />
        </span>
      </div>
      <div className="space-y-1.5">
        <In on={on} at={0.4} className={row}><Monitor className="w-3 h-3 text-slate-400" /> Cloud calling</In>
        <In on={on} at={0.6} className={row}><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Outcome · Interested</In>
      </div>
    </div>
  );
}

/* ---------- Interviews & offers ---------- */
function QuestionBank({ on }: { on: boolean }) {
  const q = ['Design a component library for a large app', 'How do you profile a slow render?', 'Explain state management trade-offs'];
  return (
    <P>
      <div className="flex gap-1">{['Frontend', 'Senior', 'Round 2'].map((t) => <span key={t} className="rounded-full bg-violet-50 px-2 py-0.5 text-[9px] font-semibold text-violet-700">{t}</span>)}</div>
      {q.map((t, i) => (
        <In key={t} on={on} at={0.15 + i * 0.15} className={row}><MessageSquareText className="w-3.5 h-3.5 text-[#6D28D9] shrink-0" /><span className="truncate">{t}</span></In>
      ))}
      <In on={on} at={0.65} className="self-start text-[10px] font-semibold text-emerald-700">Copied into round · reused 14 times</In>
    </P>
  );
}
function Invoice({ on }: { on: boolean }) {
  return (
    <P>
      <div className="rounded-lg bg-white border border-slate-100 p-2.5">
        <div className="flex items-center justify-between text-[10.5px]"><span className="font-bold text-slate-700 flex items-center gap-1"><Receipt className="w-3.5 h-3.5 text-[#6D28D9]" /> Placement · Sarah Jenkis</span><span className="text-slate-500">Acme Corp</span></div>
        <div className="mt-2 flex items-center gap-2 text-[9.5px] text-slate-500">Guarantee period <Fill on={on} pct={100} /> 90 days</div>
      </div>
      <In on={on} at={0.55} className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 text-[10.5px] text-emerald-700">
        <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Invoice drafted</span><span className="font-bold">INV-0147</span>
      </In>
      <In on={on} at={0.7} className={row}><Star className="w-3.5 h-3.5 text-amber-500" /> Vendor commission calculated</In>
    </P>
  );
}

type Viz = (on: boolean) => ReactNode;
/** Exact block heading → illustration. Checked before BlockViz's keyword rules. */
export const EXACT_VIZ: Record<string, Viz> = {
  'Client onboarding with approval': (on) => <Onboarding on={on} />,
  'Reviews and complaints, on record': (on) => <Reviews on={on} />,
  'Win new clients': (on) => <Prospects on={on} />,
  'A vendor network you can measure': (on) => <VendorRank on={on} />,
  'Know what drives joining': (on) => <JoinFunnel on={on} />,
  'Templates and scheduled sends': (on) => <Templates on={on} />,
  'Campaigns that capture interest': (on) => <Campaign on={on} />,
  'Workflows that follow up for you': (on) => <Workflow on={on} />,
  'Call quality, measured': (on) => <CallQuality on={on} />,
  'Your channels or ours': (on) => <WalletViz on={on} />,
  'A dashboard for every role': (on) => <RoleDash on={on} />,
  'Recruiter performance and capacity': (on) => <Leaderboard on={on} />,
  'Sources and losses': (on) => <Sources on={on} />,
  'Publish with a switch': (on) => <PublishToggle on={on} />,
  'Applications straight into the pipeline': (on) => <ApplyFlow on={on} />,
  'A portal without passwords': (on) => <MagicLink on={on} />,
  'Call from the app': (on) => <DialApp on={on} />,
  'Signed in on web and phone': (on) => <DeviceSync on={on} />,
  'A question bank for every role': (on) => <QuestionBank on={on} />,
  'Placements and invoicing': (on) => <Invoice on={on} />,
};
