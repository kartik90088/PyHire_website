import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from 'motion/react';
import { CalendarDays, CheckCircle2, Sparkles, Users } from 'lucide-react';
import { Initials } from './shared';

/**
 * Product mockups for the hero and final CTA. Stage names use the app's own
 * pipeline vocabulary (content document §3); names, roles and counts are
 * illustrative sample data.
 *
 * `live` turns the pipeline board into a looping demo: the interviewed
 * candidate lifts and glides into "Offer extended" (shared-layout animation),
 * the next candidate slides up, counts roll over and a notification slides
 * in. Runs only on screen, never under reduced motion or in the prerenderer.
 */

interface Person { name: string; role: string; match: string }
const QUEUE: Person[] = [
  { name: 'Sarah Jenkis', role: 'Sr. Product Designer', match: '98%' },
  { name: 'Arjun M.', role: 'Product Manager', match: '91%' },
  { name: 'Priya N.', role: 'Frontend Engineer', match: '89%' },
];
const STEP_MS = 2400;
const spring = { type: 'spring', stiffness: 260, damping: 28 } as const;

/** A number that rolls up when it changes. */
function Roll({ value, className }: { value: number; className: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function HiringBoard({ popped = false, live = false }: { popped?: boolean; live?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const running = live && inView && !reduce && typeof navigator !== 'undefined' && !navigator.webdriver;

  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setStep((s) => s + 1), STEP_MS);
    return () => clearInterval(id);
  }, [running]);

  const k = Math.floor(step / 2);
  const moved = step % 2 === 1;
  const inInterview = moved ? QUEUE[(k + 1) % QUEUE.length] : QUEUE[k % QUEUE.length];
  const inOffer: Person | null = moved ? QUEUE[k % QUEUE.length] : k === 0 ? null : QUEUE[(k - 1) % QUEUE.length];
  const offered = 18 + ((k + (moved ? 1 : 0)) % 6);
  const counts = [320 + (k % 4), 150, 45, offered];
  const stageNames = ['Sourced', 'Screened', 'Interviewed', 'Offer extended'];
  const latest = QUEUE[k % QUEUE.length];

  return (
    <div
      ref={ref}
      className="relative w-[1000px] max-w-full bg-white rounded-[32px] p-7 shadow-[0_24px_60px_-20px_rgba(17,17,17,0.25)] border border-black/5 text-left"
      style={popped ? { animation: 'board-pop 0.6s cubic-bezier(0.22, 1, 0.36, 1)' } : undefined}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display font-bold text-[1.6rem] text-[#1B1650] tracking-tight">Candidate Pipeline</p>
          <p className="text-[14px] text-slate-500 mt-1">From requisition to joining day</p>
        </div>
        {live && (
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-[12px] font-semibold text-emerald-700">
            <span className="relative flex w-2 h-2">
              {running && <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />}
              <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        )}
      </div>

      {/* Notification for the latest move */}
      <AnimatePresence>
        {running && moved && (
          <motion.div
            key={`toast-${k}`}
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-24 top-5 z-20 flex items-center gap-3 rounded-2xl bg-panel text-white pl-2 pr-4 py-2 shadow-[0_16px_40px_-16px_rgba(17,17,17,0.6)]"
          >
            <Initials name={latest.name} size="w-8 h-8 text-[10px]" shape="rounded-full" />
            <span className="text-[13px] leading-tight">
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Offer extended
              </span>
              <span className="text-white/60">{latest.name} · just now</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <LayoutGroup>
        <div className="grid grid-cols-4 gap-4 mt-6">
          {stageNames.map((name, i) => (
            <div key={name} className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
              <span className="font-semibold text-[15px] text-[#1B1650]">{name}</span>
              <Roll value={counts[i]} className="text-[12px] font-bold text-white bg-[#6D28D9] rounded-full px-2 py-0.5" />
            </div>
          ))}

          {/* Sourced — talent pool */}
          <div className="rounded-2xl border border-slate-100 p-4">
            <Users className="w-5 h-5 text-[#6D28D9]" aria-hidden="true" />
            <p className="mt-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Talent Pool</p>
            <p className="font-display font-bold text-[1.6rem] text-[#1B1650]">1,290</p>
            <p className="text-[13px] text-slate-500">Profiles</p>
            <div className="mt-3 flex gap-2 text-[11px] font-semibold">
              <span className="rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5">490 Active</span>
              <span className="rounded-md bg-slate-100 text-slate-600 px-2 py-0.5">800 Passive</span>
            </div>
          </div>

          {/* Screened */}
          <CandidateCard person={{ name: 'David Ross', role: 'UX Researcher', match: '94%' }} meter={live} running={running} />

          {/* Interviewed — the lifted card */}
          <div className="relative min-h-[178px]">
            <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-slate-200" />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={inInterview.name}
                layoutId={live ? inInterview.name : undefined}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: moved ? 0 : -12, rotate: moved ? 0 : 3 }}
                exit={{ opacity: 0 }}
                transition={spring}
                className={`relative rounded-2xl ${moved ? '' : 'shadow-[0_18px_40px_-16px_rgba(17,17,17,0.35)]'}`}
              >
                <CandidateCard person={inInterview} highlight />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Offer extended */}
          <div className="relative min-h-[178px]">
            <AnimatePresence mode="popLayout" initial={false}>
              {inOffer ? (
                <motion.div
                  key={inOffer.name}
                  layoutId={live ? inOffer.name : undefined}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, rotate: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={spring}
                  className="relative rounded-2xl"
                >
                  <CandidateCard person={inOffer} offered />
                </motion.div>
              ) : (
                <motion.div
                  key="upcoming"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full rounded-2xl border border-slate-100 p-4 flex flex-col"
                >
                  <CalendarDays className="w-5 h-5 text-[#6D28D9]" aria-hidden="true" />
                  <p className="mt-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Upcoming</p>
                  <p className="mt-1 text-[14px] font-semibold text-[#1B1650]">10:00 AM</p>
                  <p className="text-[13px] text-slate-500">Interview with Sarah</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </LayoutGroup>
    </div>
  );
}

function CandidateCard({
  person,
  highlight = false,
  offered = false,
  meter = false,
  running = false,
}: { person: Person; highlight?: boolean; offered?: boolean; meter?: boolean; running?: boolean }) {
  const pct = Number.parseInt(person.match, 10);
  return (
    <div className={`rounded-2xl border p-4 bg-white ${offered ? 'border-emerald-200' : highlight ? 'border-violet-200' : 'border-slate-100'}`}>
      <div className="flex items-start justify-between">
        <Initials name={person.name} tone={highlight ? 'bg-violet-100 text-violet-700' : 'bg-sky-100 text-sky-700'} />
        {offered && (
          <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[11px] font-bold">Offer sent</span>
        )}
      </div>
      <p className="mt-3 font-semibold text-[15px] text-[#1B1650]">{person.name}</p>
      <p className="text-[13px] text-slate-500">{person.role}</p>
      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-slate-400">Match score</span>
          <span className={`text-[13px] font-bold rounded-lg px-2 py-0.5 ${highlight || offered ? 'bg-violet-50 text-violet-700' : 'bg-emerald-50 text-emerald-700'}`}>
            {person.match}
          </span>
        </div>
        {meter && (
          <div className="mt-2 h-1.5 rounded-full bg-emerald-50 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-emerald-500"
              initial={false}
              animate={{ width: running ? ['0%', `${pct}%`] : `${pct}%` }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/** Hero card, left: the Job Management preview. */
export function JobsCard() {
  return (
    <div className="w-[340px] bg-white rounded-[28px] p-6 shadow-[0_24px_50px_-20px_rgba(17,17,17,0.3)] border border-black/5 text-left">
      <p className="font-display font-bold text-[1.35rem] text-[#1B1650]">Active Jobs</p>
      {[
        { title: 'Senior React Developer', meta: 'Remote • Full-time', applicants: '12 Applicants', accent: 'border-l-orange-400' },
        { title: 'Product Manager', meta: 'New York • Hybrid', applicants: '45 Applicants', accent: 'border-l-sky-400' },
      ].map((job) => (
        <div key={job.title} className={`mt-4 rounded-2xl border border-slate-100 border-l-4 ${job.accent} p-4`}>
          <p className="font-semibold text-[15px] text-[#1B1650]">{job.title}</p>
          <div className="mt-2 flex items-center justify-between text-[12px]">
            <span className="text-slate-500">{job.meta}</span>
            <span className="rounded-full bg-violet-50 text-violet-700 font-semibold px-2.5 py-0.5">{job.applicants}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Hero card, right: the AI Candidate Matching preview. */
export function MatchesCard() {
  return (
    <div className="w-[320px] bg-white rounded-[28px] p-6 shadow-[0_24px_50px_-20px_rgba(17,17,17,0.3)] border border-black/5 text-left">
      <p className="font-display font-bold text-[1.35rem] text-[#1B1650] flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-[#6D28D9]" aria-hidden="true" /> Top Matches
      </p>
      {[
        { name: 'Sarah Jenkis', role: 'Sr. Product Designer', match: '98% Match' },
        { name: 'David Ross', role: 'UX Researcher', match: '94% Match' },
      ].map((c) => (
        <div key={c.name} className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
          <Initials name={c.name} />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-[14px] text-[#1B1650]">{c.name}</p>
            <p className="text-[12px] text-slate-500">{c.role}</p>
          </div>
          <span className="text-[12px] font-bold text-emerald-700 bg-emerald-50 rounded-lg px-2 py-1 whitespace-nowrap">{c.match}</span>
        </div>
      ))}
    </div>
  );
}
