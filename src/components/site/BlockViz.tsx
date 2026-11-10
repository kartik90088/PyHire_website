import type { ReactNode } from 'react';
import { motion, type Transition } from 'motion/react';
import {
  Bell, Building2, CalendarCheck, Check, CheckCircle2, FileText, Flag, Mail, MessageCircle, MessageSquareText, Mic,
  Phone, PhoneCall, Smartphone, Sparkles, Star, Upload, Video,
} from 'lucide-react';
import { Initials } from '../home/shared';
import { EXACT_VIZ } from './BlockViz2';

/**
 * Small animated illustrations for product-page feature blocks. One is chosen
 * per block from its heading (see pick()). Each loops only while `on` (the
 * block being read, and motion allowed); otherwise it shows its settled
 * final frame. Decorative — names, figures and labels are sample data that
 * restate the block's own copy.
 */

const loop = (on: boolean, duration: number, delay = 0, repeatDelay = 1.2): Transition =>
  on ? { duration, delay, repeat: Infinity, repeatDelay, ease: [0.22, 1, 0.36, 1] } : { duration: 0 };
const fin = <T,>(f: T[]) => f[f.length - 1];
const frames = <T,>(on: boolean, f: T[]) => (on ? f : fin(f));

function Panel({ children }: { children: ReactNode }) {
  return <div className="h-full w-full flex flex-col justify-center gap-2">{children}</div>;
}

/* ---------------- individual visuals ---------------- */

function Approval({ on }: { on: boolean }) {
  const steps = ['Hiring manager', 'Finance', 'HR'];
  return (
    <Panel>
      <p className="text-[11px] font-semibold text-slate-600">Requisition · 2 × Sales Executive</p>
      {steps.map((s, i) => {
        const at = 0.2 + i * 0.25;
        return (
          <div key={s} className="flex items-center gap-2 rounded-lg bg-white border border-slate-100 px-2.5 py-1.5 text-[11px] text-slate-600">
            <motion.span
              className="w-4 h-4 rounded-full border-2 border-[#6D28D9] text-white flex items-center justify-center"
              initial={false}
              animate={{ backgroundColor: frames(on, ['#fff', '#fff', '#6D28D9', '#6D28D9']) }}
              transition={{ ...loop(on, 2.8), times: [0, at - 0.01, at, 1], ease: 'linear' }}
            >
              <Check className="w-2.5 h-2.5" strokeWidth={3} />
            </motion.span>
            {s}
            <motion.span
              className="ml-auto text-[9px] font-bold text-emerald-700"
              initial={false}
              animate={{ opacity: frames(on, [0, 0, 1, 1]) }}
              transition={{ ...loop(on, 2.8), times: [0, at - 0.01, at, 1], ease: 'linear' }}
            >
              Approved
            </motion.span>
          </div>
        );
      })}
    </Panel>
  );
}

function Parse({ on }: { on: boolean }) {
  const rows = [['Title', 'Senior React Developer'], ['Skills', 'React · TypeScript'], ['Experience', '5–8 years'], ['Salary', '₹24–32 LPA']];
  return (
    <div className="h-full flex items-center gap-3">
      <div className="relative w-14 h-[74px] rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
        <FileText className="w-6 h-6 text-[#6D28D9]" />
        <motion.span
          className="absolute left-0 right-0 h-0.5 bg-[#6D28D9]/70"
          initial={false}
          animate={{ top: frames(on, ['8%', '92%', '8%']) }}
          transition={loop(on, 2.4, 0, 0.4)}
        />
      </div>
      <div className="flex-1 space-y-1.5">
        {rows.map(([k, v], i) => (
          <motion.div
            key={k}
            className="flex items-center justify-between rounded-md bg-white border border-slate-100 px-2 py-1 text-[10px]"
            initial={false}
            animate={{ opacity: frames(on, [0, 1, 1]), x: frames(on, [-8, 0, 0]) }}
            transition={{ ...loop(on, 2.4, 0.3 + i * 0.25, 0.4), times: [0, 0.3, 1] }}
          >
            <span className="text-slate-400">{k}</span>
            <span className="font-semibold text-slate-700">{v}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Table({ on }: { on: boolean }) {
  const rows = [['Senior React Dev', '3/4', 12], ['Product Manager', '1/2', 21], ['Sales Executive', '5/8', 9]];
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="grid grid-cols-[1fr_44px_44px] gap-2 px-2 pb-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
        <span>Job description</span><span>Filled</span><span>Days</span>
      </div>
      {rows.map(([jd, filled, days], i) => (
        <motion.div
          key={jd as string}
          className="grid grid-cols-[1fr_44px_44px] gap-2 rounded-md px-2 py-1.5 text-[11px] text-slate-700 odd:bg-white even:bg-slate-50"
          initial={false}
          animate={{ opacity: frames(on, [0, 1, 1]), y: frames(on, [6, 0, 0]) }}
          transition={{ ...loop(on, 2.2, i * 0.2), times: [0, 0.3, 1] }}
        >
          <span className="truncate font-semibold">{jd}</span><span>{filled}</span><span>{days}</span>
        </motion.div>
      ))}
      <motion.span
        className="mt-1.5 self-end rounded-md bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700"
        initial={false}
        animate={{ opacity: frames(on, [0, 0, 1, 1]) }}
        transition={{ ...loop(on, 2.2, 0.6), times: [0, 0.5, 0.6, 1] }}
      >
        Export to Excel
      </motion.span>
    </div>
  );
}

function UploadBank({ on }: { on: boolean }) {
  return (
    <div className="h-full flex items-center gap-4">
      <div className="relative w-16 h-[90px]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute left-0 w-14 h-[70px] rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center"
            initial={false}
            animate={{ y: frames(on, [-30, i * 8, i * 8]), opacity: frames(on, [0, 1, 1]) }}
            transition={{ ...loop(on, 2.4, i * 0.25), times: [0, 0.35, 1] }}
          >
            <FileText className="w-5 h-5 text-slate-400" />
          </motion.span>
        ))}
      </div>
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-700"><Upload className="w-3.5 h-3.5 text-[#6D28D9]" /> 240 CVs uploaded</div>
        <motion.div
          className="rounded-md bg-amber-50 border border-amber-100 px-2 py-1 text-[10px] text-amber-800"
          initial={false}
          animate={{ opacity: frames(on, [0, 0, 1, 1]) }}
          transition={{ ...loop(on, 2.4, 0.4), times: [0, 0.4, 0.5, 1] }}
        >
          Duplicate found · record updated
        </motion.div>
        <div className="flex gap-1.5 text-[10px]">
          {['Sales', 'Engineering', 'HR'].map((d) => (
            <span key={d} className="rounded bg-white border border-slate-100 px-1.5 py-0.5 text-slate-500">{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pipeline({ on }: { on: boolean }) {
  const stages = ['New', 'Screened', 'Interviewed', 'Offer', 'Joined'];
  const n = stages.length;
  return (
    <Panel>
      <div className="relative mx-2">
        <div className="absolute left-0 right-0 top-[9px] h-0.5 bg-violet-100" />
        <motion.div
          className="absolute left-0 top-[9px] h-0.5 bg-[#6D28D9]"
          initial={false}
          animate={{ width: frames(on, ['0%', '100%', '100%']) }}
          transition={{ ...loop(on, 3, 0, 1), times: [0, 0.8, 1], ease: 'linear' }}
        />
        <div className="relative flex justify-between">
          {stages.map((s, i) => {
            const at = (i / (n - 1)) * 0.8;
            return (
              <div key={s} className="flex flex-col items-center gap-1">
                <motion.span
                  className="w-5 h-5 rounded-full border-2 border-[#6D28D9]"
                  initial={false}
                  animate={{ backgroundColor: frames(on, ['#fff', '#fff', '#6D28D9', '#6D28D9']) }}
                  transition={{ ...loop(on, 3, 0, 1), times: [0, Math.max(0, at - 0.01), at, 1], ease: 'linear' }}
                />
                <span className="text-[9px] font-semibold text-slate-500">{s}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-lg bg-white border border-slate-100 px-2.5 py-1.5 text-[10px] text-slate-600">
        <Initials name="Sarah Jenkis" size="w-5 h-5 text-[8px]" shape="rounded-full" /> Moved to Joined · by Priya · just now
      </div>
    </Panel>
  );
}

function Checklist({ on, items }: { on: boolean; items: string[] }) {
  return (
    <Panel>
      {items.map((q, i) => {
        const at = 0.2 + i * 0.22;
        return (
          <div key={q} className="flex items-center gap-2 rounded-lg bg-white border border-slate-100 px-2.5 py-1.5 text-[11px] text-slate-600">
            <motion.span
              className="w-4 h-4 rounded-md border-2 border-[#6D28D9] text-white flex items-center justify-center"
              initial={false}
              animate={{ backgroundColor: frames(on, ['#fff', '#fff', '#6D28D9', '#6D28D9']) }}
              transition={{ ...loop(on, 2.8), times: [0, at - 0.01, at, 1], ease: 'linear' }}
            >
              <Check className="w-2.5 h-2.5" strokeWidth={3} />
            </motion.span>
            <span className="truncate">{q}</span>
          </div>
        );
      })}
    </Panel>
  );
}

function Match({ on }: { on: boolean }) {
  const rows = [['Sarah Jenkis', 94], ['David Ross', 81], ['Priya N.', 67]] as const;
  return (
    <Panel>
      {rows.map(([name, pct], i) => (
        <div key={name} className="flex items-center gap-2">
          <Initials name={name} size="w-6 h-6 text-[8px]" shape="rounded-full" />
          <div className="flex-1 h-2 rounded-full bg-violet-100 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${i === 0 ? 'bg-[#6D28D9]' : 'bg-violet-300'}`}
              initial={false}
              animate={{ width: frames(on, ['0%', `${pct}%`, `${pct}%`]) }}
              transition={{ ...loop(on, 2.2, i * 0.2), times: [0, 0.5, 1] }}
            />
          </div>
          <span className="w-8 text-right text-[10px] font-bold text-slate-600">{pct}%</span>
        </div>
      ))}
      <p className="text-[10px] text-slate-500">Matches: React, TypeScript · Missing: GraphQL</p>
    </Panel>
  );
}

function Flagged({ on }: { on: boolean }) {
  return (
    <Panel>
      {['2019–2021 · Frontend Lead', '2020–2022 · Senior Developer', '2022–now · Engineering Manager'].map((r, i) => (
        <motion.div
          key={r}
          className="flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-[10px]"
          initial={false}
          animate={{
            backgroundColor: frames(on, ['#ffffff', i < 2 ? '#fffbeb' : '#ffffff', i < 2 ? '#fffbeb' : '#ffffff']),
            borderColor: frames(on, ['#f1f5f9', i < 2 ? '#fde68a' : '#f1f5f9', i < 2 ? '#fde68a' : '#f1f5f9']),
          }}
          transition={{ ...loop(on, 2.4, 0.3), times: [0, 0.4, 1] }}
        >
          <span className="text-slate-600">{r}</span>
          {i < 2 && <Flag className="w-3 h-3 text-amber-500" />}
        </motion.div>
      ))}
      <p className="text-[10px] font-semibold text-amber-700">Point to verify · overlapping dates</p>
    </Panel>
  );
}

function VideoAnswer({ on }: { on: boolean }) {
  return (
    <div className="h-full flex items-center gap-3">
      <div className="w-16 h-16 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
        <Video className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <div className="flex items-end gap-0.5 h-7">
          {Array.from({ length: 22 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-[#6D28D9]/70"
              initial={false}
              animate={{ height: on ? ['20%', `${30 + ((i * 37) % 70)}%`, '20%'] : `${30 + ((i * 37) % 70)}%` }}
              transition={on ? { duration: 0.9, delay: i * 0.04, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
            />
          ))}
        </div>
        <p className="mt-2 text-[10px] text-slate-500 flex items-center gap-1"><Mic className="w-3 h-3" /> Transcribed · summary ready</p>
      </div>
    </div>
  );
}

function Briefing({ on, label }: { on: boolean; label: string }) {
  const lines = ['Product Manager — on track, fill by 18 Nov', '2 candidates dropped at interview', 'Next: schedule round 2 for 3 people'];
  return (
    <Panel>
      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
        <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" /> {label}
      </div>
      {lines.map((l, i) => (
        <motion.p
          key={l}
          className="rounded-md bg-white border border-slate-100 px-2 py-1 text-[10px] text-slate-600 overflow-hidden whitespace-nowrap"
          initial={false}
          animate={{ clipPath: frames(on, ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 0)']) }}
          transition={{ ...loop(on, 2.6, i * 0.5, 0.8), times: [0, 0.4, 1], ease: 'linear' }}
        >
          {l}
        </motion.p>
      ))}
    </Panel>
  );
}

function Ask({ on }: { on: boolean }) {
  return (
    <Panel>
      <motion.div
        className="self-end max-w-[85%] rounded-2xl rounded-br-md bg-[#6D28D9] text-white px-3 py-1.5 text-[10px]"
        initial={false}
        animate={{ opacity: frames(on, [0, 1, 1]), y: frames(on, [8, 0, 0]) }}
        transition={{ ...loop(on, 3, 0), times: [0, 0.15, 1] }}
      >
        Five Java developers in Bengaluru — who can take it?
      </motion.div>
      <motion.div
        className="max-w-[90%] rounded-2xl rounded-bl-md bg-white border border-slate-100 px-3 py-1.5 text-[10px] text-slate-600"
        initial={false}
        animate={{ opacity: frames(on, [0, 0, 1, 1]), y: frames(on, [8, 8, 0, 0]) }}
        transition={{ ...loop(on, 3, 0), times: [0, 0.35, 0.5, 1] }}
      >
        <span className="font-semibold text-slate-800">Priya (40% free)</span> and <span className="font-semibold text-slate-800">David (25% free)</span> · risk: tight timeline
      </motion.div>
    </Panel>
  );
}

function Calendar({ on }: { on: boolean }) {
  return (
    <Panel>
      <div className="grid grid-cols-5 gap-1 text-center">
        {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
          <motion.span
            key={i}
            className="rounded-md py-1 text-[10px] font-semibold"
            initial={false}
            animate={{ backgroundColor: frames(on, ['#f8fafc', i === 3 ? '#6D28D9' : '#f8fafc', i === 3 ? '#6D28D9' : '#f8fafc']), color: frames(on, ['#64748b', i === 3 ? '#fff' : '#64748b', i === 3 ? '#fff' : '#64748b']) }}
            transition={{ ...loop(on, 2.6, 0.2), times: [0, 0.3, 1] }}
          >
            {d}
          </motion.span>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-white border border-slate-100 px-2.5 py-1.5 text-[10px] text-slate-600">
        <CalendarCheck className="w-3.5 h-3.5 text-[#6D28D9]" /> Thu 2:00 PM · panel of 2
      </div>
      {['Reminder · 24 hours before', 'Reminder · 1 hour before'].map((r, i) => (
        <motion.div
          key={r}
          className="flex items-center gap-2 rounded-lg bg-violet-50 px-2.5 py-1 text-[10px] text-violet-800"
          initial={false}
          animate={{ opacity: frames(on, [0, 0, 1, 1]), x: frames(on, [10, 10, 0, 0]) }}
          transition={{ ...loop(on, 2.6, 0.2), times: [0, 0.4 + i * 0.15, 0.5 + i * 0.15, 1] }}
        >
          <Bell className="w-3 h-3" /> {r}
        </motion.div>
      ))}
    </Panel>
  );
}

function Scorecard({ on }: { on: boolean }) {
  const crit = ['Problem solving', 'Communication', 'Role fit'];
  return (
    <Panel>
      {crit.map((c, i) => (
        <div key={c} className="flex items-center justify-between rounded-lg bg-white border border-slate-100 px-2.5 py-1.5">
          <span className="text-[10px] text-slate-600">{c}</span>
          <span className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((s) => (
              <motion.span
                key={s}
                initial={false}
                animate={{ scale: frames(on, [0.4, 1, 1]), opacity: frames(on, [0.2, 1, 1]) }}
                transition={{ ...loop(on, 2.4, i * 0.3 + s * 0.06), times: [0, 0.3, 1] }}
              >
                <Star className={`w-3 h-3 ${s < 4 - (i % 2) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
              </motion.span>
            ))}
          </span>
        </div>
      ))}
      <p className="text-[10px] font-semibold text-emerald-700">Recommendation recorded · Hire</p>
    </Panel>
  );
}

function Offer({ on }: { on: boolean }) {
  return (
    <div className="h-full flex items-center gap-3">
      <div className="w-24 rounded-lg bg-white border border-slate-200 shadow-sm p-2 space-y-1">
        <p className="text-[9px] font-bold text-slate-700">Offer letter</p>
        {[90, 70, 80, 55].map((w, i) => <span key={i} className="block h-1 rounded bg-slate-100" style={{ width: `${w}%` }} />)}
        <p className="text-[8px] text-slate-400">PDF · Sarah Jenkis</p>
      </div>
      <div className="flex-1 space-y-1.5">
        <div className="rounded-md bg-white border border-slate-100 px-2 py-1 text-[10px] text-slate-600">Internal approval ✓</div>
        <motion.div
          className="rounded-md px-2 py-1 text-[10px] font-semibold"
          initial={false}
          animate={{
            backgroundColor: frames(on, ['#f8fafc', '#f8fafc', '#ecfdf5', '#ecfdf5']),
            color: frames(on, ['#64748b', '#64748b', '#047857', '#047857']),
          }}
          transition={{ ...loop(on, 2.6, 0.2), times: [0, 0.45, 0.55, 1] }}
        >
          <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Accepted online</span>
        </motion.div>
      </div>
    </div>
  );
}

function Inbox({ on }: { on: boolean }) {
  const msgs = [
    { icon: Mail, tone: 'bg-[#EA4335]', text: 'Interview invite sent' },
    { icon: MessageCircle, tone: 'bg-[#25D366]', text: '“Yes, I’m interested”' },
    { icon: MessageSquareText, tone: 'bg-[#6D28D9]', text: 'SMS reminder · 9:00 AM' },
  ];
  return (
    <Panel>
      {msgs.map(({ icon: Icon, tone, text }, i) => (
        <motion.div
          key={text}
          className="flex items-center gap-2 rounded-lg bg-white border border-slate-100 px-2 py-1.5 text-[10px] text-slate-600"
          initial={false}
          animate={{ opacity: frames(on, [0, 1, 1]), x: frames(on, [i % 2 ? 12 : -12, 0, 0]) }}
          transition={{ ...loop(on, 2.6, i * 0.35), times: [0, 0.25, 1] }}
        >
          <span className={`w-5 h-5 rounded-md ${tone} text-white flex items-center justify-center`}><Icon className="w-3 h-3" /></span>
          {text}
        </motion.div>
      ))}
    </Panel>
  );
}

function CallViz({ on }: { on: boolean }) {
  return (
    <div className="h-full flex items-center gap-3">
      <div className="relative w-14 h-14 rounded-full bg-[#6D28D9] text-white flex items-center justify-center shrink-0">
        {on && (
          <motion.span className="absolute inset-0 rounded-full border-2 border-[#6D28D9]" animate={{ scale: [1, 1.5], opacity: [0.6, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
        )}
        <PhoneCall className="w-6 h-6" />
      </div>
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-red-600">
          <span className="w-2 h-2 rounded-full bg-red-500" /> Recording · 03:12
        </div>
        <div className="flex items-end gap-0.5 h-6">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-[#6D28D9]/60"
              initial={false}
              animate={{ height: on ? ['25%', `${35 + ((i * 29) % 65)}%`, '25%'] : `${35 + ((i * 29) % 65)}%` }}
              transition={on ? { duration: 0.8, delay: i * 0.05, repeat: Infinity } : { duration: 0 }}
            />
          ))}
        </div>
        <p className="text-[10px] text-slate-500">Outcome logged · Interested, call back Thu</p>
      </div>
    </div>
  );
}

function Bars({ on, title }: { on: boolean; title: string }) {
  const bars = [38, 62, 47, 75, 58, 88];
  return (
    <div className="h-full flex flex-col">
      <p className="text-[10px] font-semibold text-slate-500">{title}</p>
      <div className="mt-2 flex-1 flex items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className={`flex-1 rounded-t-md ${i === bars.length - 1 ? 'bg-[#6D28D9]' : 'bg-violet-200'}`}
            initial={false}
            animate={{ height: frames(on, ['6%', `${h}%`, `${h}%`]) }}
            transition={{ ...loop(on, 2.2, i * 0.1), times: [0, 0.5, 1] }}
          />
        ))}
      </div>
    </div>
  );
}

function Clients({ on }: { on: boolean }) {
  const cs = [['Acme Corp', 'bg-emerald-500', 82], ['Global Tech', 'bg-emerald-500', 70], ['Nova Retail', 'bg-amber-400', 46]] as const;
  return (
    <Panel>
      {cs.map(([n, dot, pct], i) => (
        <div key={n} className="rounded-lg bg-white border border-slate-100 px-2.5 py-1.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700"><Building2 className="w-3 h-3 text-slate-400" />{n}</span>
            <span className={`w-2 h-2 rounded-full ${dot}`} />
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-violet-100 overflow-hidden">
            <motion.div
              className="h-full bg-[#6D28D9] rounded-full"
              initial={false}
              animate={{ width: frames(on, ['0%', `${pct}%`, `${pct}%`]) }}
              transition={{ ...loop(on, 2.2, i * 0.2), times: [0, 0.5, 1] }}
            />
          </div>
        </div>
      ))}
    </Panel>
  );
}

function Brand({ on }: { on: boolean }) {
  const colours = ['#6D28D9', '#0f766e', '#4f46e5'];
  return (
    <div className="h-full flex flex-col justify-center gap-2">
      <motion.div
        className="rounded-xl text-white px-3 py-2 text-[11px] font-semibold"
        initial={false}
        animate={{ backgroundColor: on ? colours : colours[0] }}
        transition={on ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
      >
        Careers at YourCo · 6 open roles
      </motion.div>
      {['Senior React Developer', 'Product Manager'].map((r) => (
        <div key={r} className="flex items-center justify-between rounded-lg bg-white border border-slate-100 px-2.5 py-1.5 text-[10px]">
          <span className="font-semibold text-slate-700">{r}</span>
          <span className="rounded bg-violet-50 px-1.5 py-0.5 text-violet-700 font-semibold">Apply</span>
        </div>
      ))}
    </div>
  );
}

function PhoneViz({ on }: { on: boolean }) {
  return (
    <div className="h-full flex items-center justify-center gap-3">
      <div className="w-[70px] h-[120px] rounded-2xl border-4 border-slate-800 bg-white p-1.5 flex flex-col items-center justify-center gap-1">
        <Smartphone className="w-4 h-4 text-slate-400" />
        <Initials name="Sarah Jenkis" size="w-7 h-7 text-[8px]" shape="rounded-full" />
        <span className="text-[7px] font-semibold text-slate-600">Calling…</span>
        <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center"><Phone className="w-2.5 h-2.5 rotate-[135deg]" /></span>
      </div>
      <motion.div
        className="rounded-xl bg-white border border-violet-100 shadow-sm px-2.5 py-1.5 text-[10px] text-slate-600 max-w-[130px]"
        initial={false}
        animate={{ opacity: frames(on, [0, 1, 1, 0]), y: frames(on, [-8, 0, 0, -8]) }}
        transition={{ ...loop(on, 3, 0.2, 0.6), times: [0, 0.15, 0.85, 1] }}
      >
        <span className="flex items-center gap-1 font-semibold text-slate-800"><Bell className="w-3 h-3 text-[#6D28D9]" /> In 15 min</span>
        Follow-up with Sarah
      </motion.div>
    </div>
  );
}

/* ---------------- chooser ---------------- */

type Kind = (on: boolean) => ReactNode;
/* Order matters — the first heading match wins, so specific phrases come
   before the general ones they contain (e.g. "client onboarding with
   approval" before "approval", "scheduled sends" before "schedul"). */
const RULES: [RegExp, Kind][] = [
  [/weekly|management summary/i, (on) => <Briefing on={on} label="Monday summary · last week" />],
  [/insight/i, (on) => <Briefing on={on} label="Daily briefing · 7:00 AM" />],
  [/video/i, (on) => <VideoAnswer on={on} />],
  [/ask about/i, (on) => <Ask on={on} />],
  [/points to verify/i, (on) => <Flagged on={on} />],
  [/rules for what the ai/i, (on) => <Checklist on={on} items={['Shortlist on its own · off', 'Reject on its own · off', 'Knock-out questions decide']} />],
  [/match/i, (on) => <Match on={on} />],
  [/parsing|read themselves/i, (on) => <Parse on={on} />],
  [/client onboarding|portfolio|reviews and complaints|win new|vendor network|drives joining/i, (on) => <Clients on={on} />],
  [/approval/i, (on) => <Approval on={on} />],
  [/one table|job description analysis/i, (on) => <Table on={on} />],
  [/bulk upload|resume bank/i, (on) => <UploadBank on={on} />],
  [/applications straight|publish|portal|brand/i, (on) => <Brand on={on} />],
  [/pipeline|stages/i, (on) => <Pipeline on={on} />],
  [/screening/i, (on) => <Checklist on={on} items={['Notice period under 30 days?', 'Open to Bengaluru?', 'Short video answer']} />],
  [/inbox|template|scheduled sends|campaign|workflow|channels or ours/i, (on) => <Inbox on={on} />],
  [/schedul/i, (on) => <Calendar on={on} />],
  [/evaluation|question bank/i, (on) => <Scorecard on={on} />],
  [/offer letter/i, (on) => <Offer on={on} />],
  [/joining/i, (on) => <Checklist on={on} items={['Documents uploaded', 'Background verification', 'Medical check']} />],
  [/placements|invoic/i, (on) => <Bars on={on} title="Placements & invoices" />],
  [/signed in|follow-up reminders/i, (on) => <PhoneViz on={on} />],
  [/call/i, (on) => <CallViz on={on} />],
  [/dashboard|recruiter performance|sources|losses/i, (on) => <Bars on={on} title="Live numbers" />],
];

export function BlockViz({ heading, on }: { heading: string; on: boolean }) {
  const exact = EXACT_VIZ[heading];
  if (exact) return <>{exact(on)}</>;
  const rule = RULES.find(([re]) => re.test(heading));
  return <>{rule ? rule[1](on) : <Checklist on={on} items={['Set up', 'In use', 'Logged']} />}</>;
}
