import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { CalendarCheck, CheckCircle2, FileText, Loader2, MousePointer2, Sparkles, Upload } from 'lucide-react';
import { Initials } from './shared';

/**
 * Final-CTA illustration: "Book a 30-minute demo and we will walk through
 * PyHire with one of your open positions" (content document §2).
 *
 * Left — your role: a JD uploads and PyHire reads it into structured fields
 * (title, experience, skills, salary, location — the fields the document says
 * it extracts), then matches candidates. Right — booking the 30-minute demo.
 * The role details, dates and counts are illustrative sample data.
 *
 * One timeline drives both cards. Loops only on screen; reduced motion and
 * the prerenderer get the finished state.
 */

const TICK_MS = 750;
const END = 14; // ticks per loop (last few hold the finished state)
const FINAL = 10; // first tick at which everything is shown

const fields = [
  { label: 'Title', value: 'Senior React Developer' },
  { label: 'Experience', value: '5–8 years' },
  { label: 'Skills', chips: ['React', 'TypeScript', 'Node.js'] },
  { label: 'Salary', value: '₹24–32 LPA' },
  { label: 'Location', value: 'Bengaluru · Hybrid' },
];
const days = [
  { d: 'Mon', n: 3 },
  { d: 'Tue', n: 4 },
  { d: 'Wed', n: 5 },
  { d: 'Thu', n: 6 },
  { d: 'Fri', n: 7 },
];
const slots = ['10:00 AM', '11:30 AM', '3:00 PM'];
const matched = ['Sarah Jenkis', 'David Ross', 'Priya N.', 'Arjun M.'];

export function DemoShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const loops = !reduce && typeof navigator !== 'undefined' && !navigator.webdriver;
  const running = loops && inView;

  const [tick, setTick] = useState(loops ? 0 : FINAL);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => (t + 1) % END), TICK_MS);
    return () => clearInterval(id);
  }, [running]);
  const t = loops ? tick : FINAL;

  // Left card timeline
  const uploaded = t >= 2;
  const shownFields = Math.max(0, Math.min(fields.length, t - 2));
  const matching = t === 8;
  const done = t >= 9;
  // Right card timeline (runs alongside)
  const dayPicked = t >= 3;
  const slotPicked = t >= 5;
  const booked = t >= 6;

  return (
    <div ref={ref} aria-hidden="true" className="w-[1000px] max-w-full grid grid-cols-1 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-5 text-left">
      {/* ---------------- Your role ---------------- */}
      <div className="rounded-[28px] bg-white border border-black/5 p-6 shadow-[0_24px_60px_-24px_rgba(17,17,17,0.3)]">
        <div className="flex items-center justify-between">
          <p className="font-display font-bold text-[1.25rem] text-[#1B1650]">Your open role</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
            <Sparkles className="w-3.5 h-3.5" /> Read by PyHire
          </span>
        </div>

        {/* File upload */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-3.5 py-3">
          <span className="w-9 h-9 rounded-xl bg-white border border-violet-100 text-[#6D28D9] flex items-center justify-center shrink-0">
            {uploaded ? <FileText className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-slate-700 truncate">Senior-React-Developer-JD.pdf</p>
            <div className="mt-1.5 h-1.5 rounded-full bg-violet-100 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#6D28D9]"
                initial={false}
                animate={{ width: t >= 1 ? '100%' : '0%' }}
                transition={{ duration: t >= 1 && loops ? 1.1 : 0, ease: 'easeInOut' }}
              />
            </div>
          </div>
          <span className={`text-[11px] font-semibold ${uploaded ? 'text-emerald-600' : 'text-slate-400'}`}>
            {uploaded ? 'Uploaded' : 'Uploading…'}
          </span>
        </div>

        {/* Extracted fields */}
        <ul className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-100">
          {fields.map((f, i) => {
            const on = i < shownFields;
            return (
              <li key={f.label} className="flex items-center gap-3 px-4 py-2.5 min-h-[42px]">
                <span className="w-24 shrink-0 text-[12px] text-slate-400">{f.label}</span>
                <AnimatePresence initial={false}>
                  {on ? (
                    <motion.span
                      key="v"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-wrap gap-1.5 text-[13px] font-semibold text-slate-800"
                    >
                      {f.chips
                        ? f.chips.map((c) => (
                            <span key={c} className="rounded-md bg-violet-50 text-violet-700 px-2 py-0.5 text-[11px] font-semibold">{c}</span>
                          ))
                        : f.value}
                    </motion.span>
                  ) : (
                    <motion.span key="s" exit={{ opacity: 0 }} className="h-2.5 w-28 rounded-full bg-slate-100" />
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Match result */}
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#EEEAFE] px-4 py-3 min-h-[56px]">
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                <span className="flex -space-x-2">
                  {matched.map((n) => (
                    <Initials key={n} name={n} size="w-7 h-7 text-[9px]" shape="rounded-full" />
                  ))}
                </span>
                <span className="text-[13px] font-semibold text-slate-800">24 candidates matched</span>
              </motion.div>
            ) : (
              <motion.div key="wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-[13px] text-slate-500">
                <Loader2 className={`w-4 h-4 text-[#6D28D9] ${uploaded && loops ? 'animate-spin' : ''}`} />
                {matching
                  ? 'Matching candidates against this role…'
                  : uploaded
                    ? 'Reading the job description…'
                    : 'Waiting for the job description…'}
              </motion.div>
            )}
          </AnimatePresence>
          {done && <span className="text-[12px] font-bold text-violet-700">Top match 94%</span>}
        </div>
      </div>

      {/* ---------------- Book the demo ---------------- */}
      <div className="relative rounded-[28px] bg-white border border-black/5 p-6 shadow-[0_24px_60px_-24px_rgba(17,17,17,0.3)] overflow-hidden">
        <p className="font-display font-bold text-[1.25rem] text-[#1B1650]">Book a 30-minute demo</p>
        <p className="mt-1 text-[13px] text-slate-500">We walk through PyHire with your role</p>

        <div className="mt-4 grid grid-cols-5 gap-2">
          {days.map(({ d, n }) => {
            const on = dayPicked && d === 'Thu';
            return (
              <div
                key={d}
                className={`rounded-xl border py-2 text-center transition-colors duration-300 ${
                  on ? 'border-[#6D28D9] bg-[#6D28D9] text-white' : 'border-slate-100 text-slate-600'
                }`}
              >
                <div className={`text-[10px] ${on ? 'text-white/80' : 'text-slate-400'}`}>{d}</div>
                <div className="text-[15px] font-bold">{n}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 space-y-2">
          {slots.map((s) => {
            const on = slotPicked && s === '11:30 AM';
            return (
              <div
                key={s}
                className={`relative rounded-xl border px-3.5 py-2.5 text-[13px] font-semibold transition-colors duration-300 ${
                  on ? 'border-[#6D28D9] bg-violet-50 text-violet-800' : 'border-slate-100 text-slate-600'
                }`}
              >
                {s}
                {on && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6D28D9]" />}
              </div>
            );
          })}
        </div>

        {/* Pointer that makes the picks */}
        {loops && (
          <motion.span
            className="absolute z-10 text-slate-800 drop-shadow"
            initial={false}
            animate={
              t < 2
                ? { left: '80%', top: '86%', opacity: 0 }
                : t < 4
                  ? { left: '66%', top: '30%', opacity: 1 }
                  : t < 6
                    ? { left: '40%', top: '56%', opacity: 1 }
                    : { left: '40%', top: '56%', opacity: 0 }
            }
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <MousePointer2 className="w-5 h-5 fill-white" />
          </motion.span>
        )}

        {/* Confirmation */}
        <AnimatePresence>
          {booked && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="mt-3 flex items-center gap-3 rounded-2xl bg-panel text-white px-4 py-3"
            >
              <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <CalendarCheck className="w-4 h-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold">Demo booked</span>
                <span className="block text-[12px] text-white/60">Thu 6 · 11:30 AM · 30 minutes</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
