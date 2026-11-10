import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarCheck, Check, Clock, Layers, MessagesSquare } from 'lucide-react';
import { DEMO_PATH, TRIAL_PATH } from '../../lib/routes';
import { Initials, OutlineButton, PrimaryButton } from '../home/shared';
import { useLoops } from '../site/PageParts';
import { AppWindow } from './AppWindow';

/**
 * Home hero in the PyCore family layout (as on PyMedic): two-tone headline
 * with an underlined lead word, highlighted phrase, green trust pills, two
 * CTAs and three feature pills — beside a dark "display" window.
 * Copy: PyHire website content document §2. Candidate names, roles and
 * scores in the window are sample data.
 */

const shortlist = [
  { name: 'Sarah Jenkis', role: 'Sr. Product Designer', score: 94 },
  { name: 'David Ross', role: 'UX Researcher', score: 81 },
  { name: 'Priya N.', role: 'Frontend Engineer', score: 67 },
];
const stages = [
  { label: 'Sourced', n: 320 },
  { label: 'Screened', n: 150 },
  { label: 'Interviewed', n: 45 },
  { label: 'Offer', n: 18 },
];
const trust = ['No card needed for the trial', 'Set up in a day', 'Built for Indian recruiting teams'];
const pills = [
  { icon: Clock, text: 'Shortlists in minutes' },
  { icon: MessagesSquare, text: 'Every channel, one timeline' },
  { icon: Layers, text: 'From requisition to joining day' },
];

function DisplayWindow() {
  const loops = useLoops();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!loops) return;
    const id = setInterval(() => setActive((a) => (a + 1) % shortlist.length), 2600);
    return () => clearInterval(id);
  }, [loops]);

  return (
    <div className="relative">
      <AppWindow title="Recruiter workspace" dark>
        <div className="relative overflow-hidden rounded-[20px] bg-panel p-5 text-white">
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#6D28D9]/20 blur-3xl" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/[0.04] to-transparent skew-x-[-12deg] origin-top" />
          <div className="relative flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <img src="/pyhire-mark.png" alt="" className="w-5 h-5 object-contain" />
            </span>
            <span className="font-display font-bold text-[15px]">PyHire</span>
            <span className="text-white/30">|</span>
            <span className="text-[13px] text-white/70">Senior React Developer</span>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#6D28D9]/15 px-2.5 py-1 text-[11px] font-bold text-[#C4B5FD]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6D28D9]" /> LIVE
            </span>
          </div>
          <p className="relative mt-5 text-[11px] font-bold tracking-[0.14em] text-white/60">TODAY’S SHORTLIST</p>
          <div className="relative mt-3 grid grid-cols-3 gap-3">
            {shortlist.map((c, i) => {
              const on = i === active;
              return (
                <div
                  key={c.name}
                  className={`relative rounded-2xl border p-3.5 min-h-[178px] flex flex-col transition-all duration-500 ${
                    on
                      ? 'border-[#6D28D9] bg-[#33238A] shadow-[0_0_0_4px_rgba(109,40,217,0.18),0_0_40px_-6px_rgba(109,40,217,0.6)]'
                      : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <Initials name={c.name} size="w-9 h-9 text-[11px]" shape="rounded-full" />
                  <p className="mt-2.5 font-display font-bold text-[14px] leading-tight">{c.name}</p>
                  <p className="text-[11px] text-white/60">{c.role}</p>
                  <p className={`mt-auto font-display font-extrabold text-[2.1rem] leading-none ${on ? 'text-[#C4B5FD]' : 'text-white'}`}>
                    {c.score}%
                  </p>
                  <span
                    className={`mt-2 self-start rounded-full px-2 py-0.5 text-[10px] font-bold transition-opacity duration-300 ${
                      on ? 'opacity-100 bg-[#6D28D9] text-white' : 'opacity-0'
                    }`}
                  >
                    Shortlisted
                  </span>
                </div>
              );
            })}
          </div>
          <div className="relative mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-[12px]">
            <span className="text-white/60 mr-1">Pipeline</span>
            {stages.map((s) => (
              <span key={s.label} className="rounded-lg bg-white/[0.08] px-2.5 py-1 font-semibold">
                {s.label} <span className="text-[#C4B5FD]">{s.n}</span>
              </span>
            ))}
          </div>
        </div>
      </AppWindow>

      {/* Floating toast */}
      <div className="absolute -bottom-8 left-[18%] z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3 rounded-2xl bg-white border border-[#E7E3F6] px-4 py-3 shadow-[0_18px_40px_-18px_rgba(27,22,80,0.35)]"
          >
            <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-semibold text-[#1B1650]">Interview scheduled · {shortlist[active].name}</span>
              <span className="block text-[12px] text-[#514D7A]">Reminder sent on WhatsApp</span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function MHero() {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-32 pb-16 lg:pb-20">
      <div aria-hidden="true" className="absolute right-0 top-16 w-[55%] h-[85%] rounded-l-[80px] bg-gradient-to-br from-[#EEEAFE] via-[#F6F3FF] to-transparent" />
      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-12 lg:gap-14 items-center">
        <div>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#5B21B6]">
            The AI-powered applicant tracking system
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display font-extrabold text-[2.75rem] sm:text-[3.5rem] lg:text-[3.9rem] leading-[1.04] tracking-[-0.035em] text-[#1B1650]"
          >
            <span className="relative inline-block">
              Hire faster,
              <span aria-hidden="true" className="absolute left-0 right-0 -bottom-1 h-[6px] rounded-full bg-[#6D28D9]/80" />
            </span>{' '}
            <br />
            <span className="text-[#5B21B6]">from one place.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-[1.125rem] sm:text-[1.25rem] leading-[1.65] text-[#514D7A] max-w-xl"
          >
            PyHire is the AI-powered applicant tracking system that takes a role from{' '}
            <span className="rounded-lg bg-[#EEEAFE] px-2 py-0.5 font-semibold text-[#5B21B6]">requisition to joining day</span> — job
            descriptions, candidate matching, interviews, offers, client and vendor work, all in one workspace.
          </motion.p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-[13px] font-semibold text-emerald-700">
                <Check className="w-3.5 h-3.5" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <PrimaryButton to={DEMO_PATH} className="px-7 py-3.5">Book a demo</PrimaryButton>
            <OutlineButton to={TRIAL_PATH} className="px-7 py-3.5">Start your 15-day free trial</OutlineButton>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {pills.map(({ icon: Icon, text }) => (
              <li key={text} className="inline-flex items-center gap-2.5 rounded-full border border-[#E7E3F6] bg-white px-3.5 py-2 text-[14px] font-medium text-[#1B1650]">
                <span className="w-6 h-6 rounded-full bg-[#EEEAFE] text-[#5B21B6] flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block"
        >
          <DisplayWindow />
        </motion.div>
      </div>
    </section>
  );
}
