import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView } from 'motion/react';
import {
  ArrowRight, BarChart3, Briefcase, Building, Building2, CalendarCheck, Check, CheckCircle2, FileText, Globe, Handshake,
  Layers, Lock, Mail, MessageCircle, MessagesSquare, Minus, Phone, Plus, Send, Smartphone, Sparkles, UserPlus,
  Users,
} from 'lucide-react';
import { DEMO_PATH, TRIAL_PATH } from '../../lib/routes';
import { productLinks } from '../../data/navigation';
import { productPageByPath } from '../../data/productPages';
import { CountUp, Eyebrow, Initials, OutlineButton, PrimaryButton, SectionHeading } from '../home/shared';
import { useLoops } from '../site/PageParts';
import { BlockViz } from '../site/BlockViz';
import { AppWindow, BeamBorder, StatTile } from './AppWindow';
import { ProblemScene } from './ProblemScenes';

/**
 * Home page sections in the PyCore family layout (as on PyMedic). Body copy
 * is from the PyHire website content document (sections noted inline) or the
 * existing site; figures inside product windows are sample data. Section
 * labels that mirror PyMedic ("One platform for", "Every module. One PyHire.",
 * "Before you book a demo.") are layout labels, not product claims.
 */

const ease = [0.22, 1, 0.36, 1] as const;
const rise = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease },
};

function Wrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-[1320px] mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}

/* ---------------- One platform for — marquee ---------------- */
export function MMarquee() {
  const items = productLinks.map((l) => l.label);
  return (
    <section className="border-y border-[#E7E3F6] bg-white">
      <Wrap className="flex items-center gap-6 py-5 overflow-hidden">
        <span className="shrink-0 text-[12px] font-bold uppercase tracking-[0.16em] text-[#514D7A]">One platform for</span>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max [animation:home-marquee_36s_linear_infinite] hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex items-center gap-8 pr-8" aria-hidden={copy === 1 || undefined}>
                {items.map((t) => (
                  <li key={t} className="flex items-center gap-2.5 whitespace-nowrap font-display font-semibold text-[17px] text-[#1B1650]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6D28D9]" /> {t}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ---------------- See PyHire in action — video ---------------- */
export function MVideo() {
  const steps = ['Open the role', 'Fill the pipeline', 'Shortlist and talk', 'Interview, offer, join'];
  return (
    <section id="see-in-action" className="bg-gradient-to-b from-[#FBFAFF] via-[#F3F0FF] to-[#FBFAFF] py-14 lg:py-20 border-t border-[#E7E3F6]">
      <Wrap>
        <motion.div {...rise}>
          <SectionHeading accent="in action.">See PyHire</SectionHeading>
          <p className="mt-4 max-w-2xl text-[1.125rem] leading-[1.7] text-[#514D7A]">
            Watch how our intelligent platform transforms your recruitment process from start to finish.
          </p>
        </motion.div>
        <motion.div {...rise} className="relative mt-10">
          <div aria-hidden="true" className="absolute -inset-6 rounded-[40px] bg-[#6D28D9]/10 blur-2xl" />
          <div className="relative rounded-[28px] overflow-hidden border border-[#E7E3F6] bg-white shadow-[0_30px_70px_-30px_rgba(27,22,80,0.4)]">
            <video
              className="w-full aspect-video bg-panel"
              src="/pyhire-website-video.mp4"
              poster="/pyhire-website-video-poster.jpg"
              controls
              preload="metadata"
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {steps.map((s, i) => (
            <li key={s} className="inline-flex items-center gap-2 rounded-full border border-[#E7E3F6] bg-white px-4 py-2 text-[14px] font-medium text-[#1B1650]">
              <span className="text-[12px] font-bold text-[#5B21B6]">0{i + 1}</span> {s}
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

/* ---------------- The problem (§2) ---------------- */
const scattered = [
  { t: 'Job descriptions', d: 'live in email' },
  { t: 'CVs', d: 'pile up in a shared drive' },
  { t: 'Candidate calls', d: 'happen on personal phones' },
  { t: 'Interview feedback', d: 'arrives on WhatsApp' },
  { t: 'The weekly status report', d: 'is out of date before it is sent' },
  { t: 'Good candidates', d: 'slip through' },
];
const SCENE_MS = 3600;
export function MProblem() {
  const loops = useLoops();
  const [hi, setHi] = useState(0);
  const [hover, setHover] = useState(false);
  /* Cycles through the problems automatically; pauses only while the pointer
     is over the cards, and carries on from whichever card was picked. */
  useEffect(() => {
    if (!loops || hover) return;
    const id = setTimeout(() => setHi((h) => (h + 1) % scattered.length), SCENE_MS);
    return () => clearTimeout(id);
  }, [loops, hover, hi]);
  const pick = (i: number) => setHi(i);
  return (
    /* Home hero (2026-11-02): this section is now the top of the page. */
    <section className="relative overflow-hidden bg-[#FBFAFF] pt-28 lg:pt-32 pb-16 lg:pb-20 border-b border-[#E7E3F6]">
      {/* soft animated backdrop */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.45] [background-image:radial-gradient(#FDC9A1_1px,transparent_1px)] [background-size:30px_30px] [mask-image:radial-gradient(ellipse_at_70%_40%,black_10%,transparent_65%)]" />
        <motion.div
          className="absolute -top-24 right-[8%] w-[520px] h-[520px] rounded-full bg-[#DDD6FE]/60 blur-3xl"
          animate={loops ? { x: [0, -40, 0], y: [0, 30, 0] } : undefined}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-40 -left-24 w-[380px] h-[380px] rounded-full bg-[#DCE8F7]/70 blur-3xl"
          animate={loops ? { x: [0, 40, 0], y: [0, -24, 0] } : undefined}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <Wrap className="relative">
        <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_700px] gap-10 xl:gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E4DCFF] bg-white/80 backdrop-blur px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#5B21B6] shadow-[0_8px_20px_-14px_rgba(109,40,217,0.6)]">
              <span className="relative flex w-2 h-2">
                {loops && <span className="absolute inset-0 rounded-full bg-[#6D28D9] animate-ping opacity-60" />}
                <span className="relative w-2 h-2 rounded-full bg-[#6D28D9]" />
              </span>
              The AI-powered applicant tracking system
            </span>
            <SectionHeading
              as="h1"
              className="mt-5 sm:!text-[3.1rem] lg:!text-[3.6rem] !leading-[1.04]"
              accent={
                <span className="bg-gradient-to-r from-[#6D28D9] via-[#F28C30] to-[#6D28D9] bg-[length:200%_auto] bg-clip-text text-transparent [animation:text-shine_6s_linear_infinite]">
                  and a spreadsheet.
                </span>
              }
            >
              Recruiting shouldn’t need six tools
            </SectionHeading>
            <p className="mt-6 text-[1.125rem] leading-[1.75] text-[#514D7A]">
              Job descriptions live in email. CVs pile up in a shared drive. Candidate calls happen on personal phones,
              interview feedback arrives on WhatsApp, and the weekly status report is out of date before it is sent. Good
              candidates slip through and nobody can say where the time went.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <PrimaryButton to={DEMO_PATH} className="px-7 py-3.5">Book a demo</PrimaryButton>
              <OutlineButton to={TRIAL_PATH} className="px-7 py-3.5">Start your 15-day free trial</OutlineButton>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-[#514D7A]">
              {['No card needed for the trial', 'Set up in a day', 'Built for Indian recruiting teams'].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Check className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 max-w-xl rounded-2xl border border-[#E7E3F6] bg-white/80 backdrop-blur divide-y sm:divide-y-0 sm:divide-x divide-[#E7E3F6] shadow-[0_18px_40px_-28px_rgba(27,22,80,0.35)]">
              {[
                ['8', 'Product areas in one workspace'],
                ['4', 'Channels on one timeline'],
                ['15-day', 'Free trial, then choose a plan'],
              ].map(([v, l]) => (
                <div key={l} className="px-4 py-3.5">
                  <dt className="font-display font-extrabold text-[1.6rem] leading-none tracking-[-0.02em] text-[#1B1650]">
                    <CountUp value={v} />
                  </dt>
                  <dd className="mt-1.5 text-[12px] leading-snug text-[#514D7A]">{l}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2, ease }}><BeamBorder radius={26} className="bg-[#E7E3F6] h-full" delay={4}><div className="relative rounded-[26px] overflow-hidden min-h-[580px] h-full bg-gradient-to-br from-[#F0EDFA] via-[#F8F6FD] to-[#EEEAFE]">
            <AnimatePresence mode="wait">
              <motion.div
                key={hi}
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease }}
                className="absolute inset-0 p-5 pb-[84px]"
              >
                <ProblemScene index={hi} />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`cap-${hi}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute left-4 right-4 bottom-4 rounded-2xl bg-panel px-4 py-3 text-white"
              >
                <p className="font-display font-bold text-[15px]">{scattered[hi].t}</p>
                <p className="text-[13px] text-white/75">{scattered[hi].d}</p>
              </motion.div>
            </AnimatePresence>
          </div></BeamBorder></motion.div>
        </div>
        <div className="mt-10">

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {scattered.map((s, i) => (
              <motion.li
                key={s.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                onMouseEnter={() => pick(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
                tabIndex={0}
                className={`cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded-2xl border border-dashed px-4 py-4 transition-colors duration-500 ${
                  i === hi ? 'border-[#6D28D9] bg-[#F3F0FF] border-solid' : 'border-[#D6D1EA] bg-white hover:border-[#C4B5FD]'
                }`}
              >
                <p className="flex items-center gap-2 font-display font-bold text-[15px] text-[#1B1650]">
                  <span className={`w-2 h-2 rounded-full ${i === hi ? 'bg-[#6D28D9]' : 'bg-[#D6D1EA]'}`} /> {s.t}
                </p>
                <p className="mt-1 pl-4 text-[14px] text-[#514D7A]">{s.d}</p>
                {i === hi && loops && !hover && (
                  <span aria-hidden="true" className="mt-3 ml-4 block h-1 rounded-full bg-[#DDD6FE] overflow-hidden">
                    <motion.span
                      key={`bar-${hi}`}
                      className="block h-full rounded-full bg-[#6D28D9]"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: SCENE_MS / 1000, ease: 'linear' }}
                    />
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
        <motion.div {...rise} className="mt-6 flex items-start gap-4 rounded-[22px] bg-gradient-to-r from-[#EEEAFE] to-[#F6F3FF] px-6 py-5">
          <span className="w-11 h-11 rounded-xl bg-[#6D28D9] text-white flex items-center justify-center shrink-0">
            <Check className="w-5 h-5" strokeWidth={3} aria-hidden="true" />
          </span>
          <p className="font-display font-bold text-[1.2rem] sm:text-[1.35rem] leading-snug text-[#1B1650]">
            PyHire puts every step — and every conversation — on one timeline per candidate and one dashboard per team.
          </p>
        </motion.div>
      </Wrap>
    </section>
  );
}

/* ---------------- How it works (§2) + pipeline stages (§3) ---------------- */
const howSteps = [
  { icon: FileText, title: 'Open the role', d: 'Raise a requisition, get it approved and turn it into a job description — or upload an existing JD and let PyHire read it.' },
  { icon: UserPlus, title: 'Fill the pipeline', d: 'Bulk-upload CVs, publish to your careers page, take vendor submissions and inbound applications. Duplicates are caught automatically.' },
  { icon: Sparkles, title: 'Shortlist and talk', d: 'AI matching ranks candidates for the role. Call, email or WhatsApp them from the profile; screening questions and campaigns do the first pass.' },
  { icon: CheckCircle2, title: 'Interview, offer, join', d: 'Schedule interviews with reminders, collect structured feedback, release offer letters the candidate accepts online, and track documents to joining day.' },
];
const pipeline = ['New', 'Screened', 'Interviewed', 'Selected', 'Offer extended', 'Hired', 'Joined'];

export function MJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const loops = useLoops();
  const [step, setStep] = useState(pipeline.length - 1);
  useEffect(() => {
    if (!loops || !inView) return;
    setStep(0);
    const id = setInterval(() => setStep((s) => (s + 1) % (pipeline.length + 2)), 700);
    return () => clearInterval(id);
  }, [loops, inView]);
  const lit = Math.min(step, pipeline.length - 1);

  return (
    <section className="relative bg-white py-14 lg:py-20 overflow-hidden">
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-full w-[40%] -skew-x-12 bg-gradient-to-b from-[#F3F0FF] to-transparent" />
      <Wrap className="relative">
        <motion.div {...rise} className="text-center">
          <Eyebrow>How it works</Eyebrow>
          <SectionHeading className="mt-3" accent="to joining day.">From requisition</SectionHeading>
        </motion.div>

        <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
          <div aria-hidden="true" className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-[3px] rounded-full bg-gradient-to-r from-[#6D28D9] via-[#C4B5FD] to-[#6D28D9]" />
          {howSteps.map(({ icon: Icon, title, d }, i) => (
            <motion.li key={title} {...rise} transition={{ ...rise.transition, delay: i * 0.1 }} className="relative text-center px-2">
              <span className="relative mx-auto w-16 h-16 rounded-2xl bg-white border-2 border-[#C4B5FD] text-[#5B21B6] flex items-center justify-center shadow-[0_10px_24px_-14px_rgba(109,40,217,0.6)]">
                <Icon className="w-6 h-6" aria-hidden="true" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-panel text-white text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
              </span>
              <h3 className="mt-4 font-display font-bold text-[1.2rem] text-[#1B1650]">{title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-[#514D7A]">{d}</p>
            </motion.li>
          ))}
        </ol>

        <div ref={ref} className="mt-14 rounded-[26px] border border-[#E7E3F6] bg-[#FBFAFF] p-6 sm:p-8">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#514D7A]">A pipeline you can trust</p>
          <ol className="mt-5 relative flex flex-wrap lg:flex-nowrap items-start justify-between gap-y-6">
            <div aria-hidden="true" className="hidden lg:block absolute left-6 right-6 top-[19px] h-[3px] rounded-full bg-[#E7E3F6]" />
            <motion.div
              aria-hidden="true"
              className="hidden lg:block absolute left-6 top-[19px] h-[3px] rounded-full bg-[#6D28D9]"
              animate={{ width: `calc((100% - 48px) * ${lit / (pipeline.length - 1)})` }}
              transition={{ duration: 0.5, ease }}
            />
            {pipeline.map((p, i) => {
              const on = i <= lit;
              return (
                <li key={p} className="relative z-10 flex flex-col items-center gap-2 w-1/4 lg:w-auto">
                  <span className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${on ? 'bg-[#6D28D9] border-[#6D28D9] text-white' : 'bg-white border-[#D6D1EA] text-[#A39EC6]'}`}>
                    <Check className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className={`text-[13px] font-semibold text-center ${on ? 'text-[#1B1650]' : 'text-[#A39EC6]'}`}>{p}</span>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-[14.5px] text-[#514D7A]">
            Clear stages from new to screened, interviewed, selected, offer extended, hired and joined — with every change and who made it on the candidate’s timeline.
          </p>
        </div>
      </Wrap>
    </section>
  );
}

/* ---------------- Everything in one workspace (§2) ---------------- */
export function MModules() {
  return (
    <section className="bg-gradient-to-b from-white to-[#F6F3FF] py-14 lg:py-20">
      <Wrap>
        <motion.div {...rise}>
          <SectionHeading accent="in one workspace.">Everything</SectionHeading>
        </motion.div>
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productLinks.map(({ path, label, desc, icon: Icon }, i) => (
            <motion.li key={path} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45, delay: (i % 4) * 0.07, ease }}>
              <Link
                to={path}
                className="group relative h-full flex flex-col rounded-[24px] border border-[#E7E3F6] bg-white p-6 overflow-hidden transition-all duration-300 hover:border-[#6D28D9] hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(109,40,217,0.6)] outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[#6D28D9] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span aria-hidden="true" className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-[#EEEAFE] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-start justify-between">
                  <span className="w-11 h-11 rounded-xl bg-[#EEEAFE] text-[#5B21B6] flex items-center justify-center transition-colors group-hover:bg-[#6D28D9] group-hover:text-white">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-[#F2EFFB] px-2.5 py-1 text-[12px] font-bold text-[#1B1650] transition-colors group-hover:bg-panel group-hover:text-white">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="relative mt-5 font-display font-bold text-[1.2rem] leading-tight text-[#1B1650]">{label}</h3>
                <p className="relative mt-2 text-[14.5px] leading-[1.6] text-[#514D7A]">{desc}</p>
                <span className="relative mt-auto pt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#5B21B6]">
                  Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

/* ---------------- Feature deep dives (product pages, §4–§8) ---------------- */
interface Deep {
  path: string;
  window: string;
  stats: [string, string][];
  vizA: string;
  vizB: string;
  points: string[]; // block headings whose first sentence is shown
}
const deeps: Deep[] = [
  {
    path: '/product/ai', window: 'AI matching · Senior React Developer',
    stats: [['240', 'CVs read today'], ['24', 'Matched'], ['3', 'Points to verify']],
    vizA: 'Candidate matching with reasons', vizB: 'Points to verify on a resume',
    points: ['Resume and JD parsing', 'Candidate matching with reasons', 'Rules for what the AI may do'],
  },
  {
    path: '/product/communication', window: 'Inbox · Sarah Jenkis',
    stats: [['4', 'Channels'], ['48', 'Campaign sends'], ['12', 'Calls logged']],
    vizA: 'One inbox for every channel', vizB: 'Cloud calling with recordings',
    points: ['One inbox for every channel', 'Campaigns that capture interest', 'Cloud calling with recordings'],
  },
  {
    path: '/product/interviews-and-offers', window: 'Interviews & offers · This week',
    stats: [['14', 'Interviews'], ['5', 'Offers out'], ['3', 'Joining checks']],
    vizA: 'Scheduling with reminders', vizB: 'Offer letters in minutes',
    points: ['Scheduling with reminders', 'Evaluation forms that fit the round', 'Offer letters in minutes'],
  },
  {
    path: '/product/clients-and-vendors', window: 'Client portfolio · October',
    stats: [['12', 'Active clients'], ['8', 'Vendors'], ['4', 'Prospects']],
    vizA: 'A portfolio view of every client', vizB: 'Placements and invoicing',
    points: ['Client onboarding with approval', 'A vendor network you can measure', 'Win new clients'],
  },
];
const pointIcons = [Sparkles, CheckCircle2, Layers];

function splitHeadline(h: string): [string, string] {
  const dot = h.indexOf('. ');
  if (dot > -1) return [h.slice(0, dot + 1), h.slice(dot + 2)];
  const comma = h.lastIndexOf(', ');
  if (comma > -1) return [h.slice(0, comma + 1), h.slice(comma + 2)];
  const words = h.split(' ');
  return [words.slice(0, -2).join(' '), words.slice(-2).join(' ')];
}
const firstSentence = (s: string) => {
  const m = s.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : s).trim();
};

function DeepDive({ d, i }: { d: Deep; i: number }) {
  const page = productPageByPath(d.path)!;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const loops = useLoops();
  const on = loops && inView;
  const [lead, rest] = splitHeadline(page.headline);
  const flip = i % 2 === 1;

  return (
    <section className={`py-14 lg:py-20 ${flip ? 'bg-white' : 'bg-[#FBFAFF]'} border-b border-[#E7E3F6]`}>
      <Wrap className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
        <motion.div {...rise} className={flip ? 'lg:order-2' : ''}>
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <SectionHeading className="mt-3" accent={rest}>{lead}</SectionHeading>
          <p className="mt-5 text-[1.075rem] leading-[1.7] text-[#514D7A]">{page.intro}</p>
          <ul className="mt-7 space-y-5">
            {d.points.map((h, k) => {
              const block = page.blocks.find((b) => b.heading === h)!;
              const Icon = pointIcons[k];
              return (
                <li key={h} className="flex gap-4">
                  <span className="w-11 h-11 rounded-xl bg-[#EEEAFE] text-[#5B21B6] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display font-bold text-[16px] text-[#1B1650]">{block.heading}</span>
                    <span className="block mt-1 text-[14.5px] leading-[1.6] text-[#514D7A]">{firstSentence(block.points[0])}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <Link to={d.path} className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-bold text-[#5B21B6] hover:gap-2.5 transition-all">
            Explore {productLinks.find((l) => l.path === d.path)?.label ?? 'more'} <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div ref={ref} {...rise} transition={{ ...rise.transition, delay: 0.1 }} className={flip ? 'lg:order-1' : ''}>
          <AppWindow title={d.window}>
            <div className="grid grid-cols-3 gap-3">
              {d.stats.map(([v, l]) => <StatTile key={l} value={v} label={l} />)}
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[d.vizA, d.vizB].map((h) => (
                <div key={h} className="rounded-2xl bg-white border border-[#E7E3F6] p-4 h-[200px]">
                  <BlockViz heading={h} on={on} />
                </div>
              ))}
            </div>
          </AppWindow>
        </motion.div>
      </Wrap>
    </section>
  );
}

export function MFeatures() {
  return <>{deeps.map((d, i) => <DeepDive key={d.path} d={d} i={i} />)}</>;
}

/* ---------------- Built for the way you hire (§2, §12) ---------------- */
const teams = [
  { icon: Building2, name: 'Recruitment consultancies', items: ['Clients', 'Vendors', 'Placements'] },
  { icon: Building, name: 'In-house HR teams', items: ['Departments', 'Requisition approvals', 'Offer release'] },
  { icon: Layers, name: 'Hybrid teams', items: ['Internal hiring', 'Client mandates', 'Split reports'] },
];
const shared = ['Candidate database', 'Job descriptions', 'Messages & calls', 'Analytics'];
const segmentCopy = [
  ['Recruitment consultancies', 'Manage clients, their job descriptions and your vendor network, and see delivery per client.'],
  ['In-house HR teams', 'Hire for your own departments and locations, with requisition approvals and no client clutter.'],
  ['Hybrid teams', 'Run internal hiring and client mandates side by side in one account.'],
];
export function MWorkspaces() {
  const loops = useLoops();
  const [hi, setHi] = useState(0);
  useEffect(() => {
    if (!loops) return;
    const id = setInterval(() => setHi((h) => (h + 1) % teams.length), 2400);
    return () => clearInterval(id);
  }, [loops]);
  return (
    <section className="bg-[#F3F0FF] py-14 lg:py-20">
      <Wrap className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-14 items-center">
        <motion.div {...rise}>
          <SectionHeading accent="the way you hire.">Built for</SectionHeading>
          <p className="mt-5 text-[1.075rem] leading-[1.7] text-[#514D7A]">
            Tell PyHire whether you are a consultancy, an in-house team or both, and the product adapts its menus and flows to fit.
          </p>
          <ul className="mt-7 space-y-4">
            {segmentCopy.map(([n, t], i) => (
              <li key={n} className={`flex gap-3 rounded-2xl px-4 py-3 transition-colors duration-500 ${i === hi ? 'bg-white shadow-[0_12px_30px_-20px_rgba(27,22,80,0.35)]' : ''}`}>
                <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${i === hi ? 'bg-[#6D28D9] text-white' : 'bg-white text-[#5B21B6]'}`}>
                  <Check className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display font-bold text-[16px] text-[#1B1650]">{n}</span>
                  <span className="block text-[14.5px] leading-[1.6] text-[#514D7A]">{t}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link to="/solutions" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-bold text-[#5B21B6] hover:gap-2.5 transition-all">
            See solutions <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div {...rise} aria-hidden="true">
          <div className="relative rounded-[26px] bg-panel p-6 text-white overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full bg-[#6D28D9]/25 blur-3xl" />
            <div className="relative flex items-center gap-4">
              <span className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                <img src="/pyhire-mark.png" alt="" className="w-8 h-8 object-contain" />
              </span>
              <span>
                <span className="block font-display font-bold text-[1.25rem]">PyHire platform</span>
                <span className="block text-[13px] text-white/70">One account, set up for how you hire</span>
              </span>
            </div>
            <div className="relative mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {shared.map((s) => (
                <span key={s} className="rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2.5 text-[13px] font-semibold">{s}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {teams.map(({ icon: Icon, name, items }, i) => (
              <div key={name} className="flex flex-col items-center">
                <span className={`h-6 border-l-2 border-dashed transition-colors ${i === hi ? 'border-[#6D28D9]' : 'border-[#C4B5FD]/60'}`} />
                <div className={`w-full rounded-2xl border-2 border-dashed p-4 transition-all duration-500 ${i === hi ? 'border-[#6D28D9] bg-white -translate-y-1 shadow-[0_16px_34px_-22px_rgba(109,40,217,0.7)]' : 'border-[#C4B5FD]/70 bg-white/60'}`}>
                  <Icon className="w-5 h-5 text-[#5B21B6]" />
                  <p className="mt-2 font-display font-bold text-[14px] leading-tight text-[#1B1650]">{name}</p>
                  <ul className="mt-3 space-y-1.5">
                    {items.map((it) => (
                      <li key={it} className="flex items-center gap-1.5 text-[12px] text-[#514D7A]">
                        <span className="w-1 h-1 rounded-full bg-[#6D28D9]" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Wrap>
    </section>
  );
}

/* ---------------- Every module — orbit ---------------- */
const inner = [
  { icon: Briefcase, t: 'Requisitions' }, { icon: Sparkles, t: 'AI matching' }, { icon: CalendarCheck, t: 'Interviews' },
  { icon: FileText, t: 'Offer letters' }, { icon: MessagesSquare, t: 'Inbox' },
];
const outer = [
  { icon: MessageCircle, t: 'WhatsApp' }, { icon: Phone, t: 'Cloud calling' }, { icon: Send, t: 'Campaigns' },
  { icon: Handshake, t: 'Vendors' }, { icon: Users, t: 'Prospects' }, { icon: BarChart3, t: 'Analytics' },
  { icon: Globe, t: 'Careers page' }, { icon: Smartphone, t: 'Mobile app' }, { icon: Lock, t: 'DPDP tools' }, { icon: Mail, t: 'Templates' },
];
/*
 * Both rings turn in the same direction at the same speed, so the labels
 * never drift into each other; inner labels sit at the angles midway between
 * outer ones. Each label counter-rotates to stay upright.
 */
const ORBIT_SECONDS = 80;
function Ring({ items, r, offset = 0 }: { items: typeof inner; r: number; offset?: number }) {
  const loops = useLoops();
  return (
    <motion.div className="absolute inset-0" animate={loops ? { rotate: 360 } : undefined} transition={{ duration: ORBIT_SECONDS, repeat: Infinity, ease: 'linear' }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#C4B5FD]/70" style={{ width: r * 2, height: r * 2 }} />
      {items.map(({ icon: Icon, t }, i) => {
        const a = offset + (i / items.length) * 360;
        return (
          <div key={t} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${a}deg) translateY(-${r}px) rotate(-${a}deg)` }}>
            <motion.span
              className="-translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#E7E3F6] bg-white px-2.5 py-1.5 text-[12px] font-semibold text-[#1B1650] shadow-[0_10px_24px_-14px_rgba(27,22,80,0.35)]"
              animate={loops ? { rotate: -360 } : undefined}
              transition={{ duration: ORBIT_SECONDS, repeat: Infinity, ease: 'linear' }}
            >
              <Icon className="w-3.5 h-3.5 text-[#5B21B6]" /> {t}
            </motion.span>
          </div>
        );
      })}
    </motion.div>
  );
}

/** The module orbit diagram. */
export function OrbitDiagram() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-[620px] h-[570px] max-w-full shrink-0">
      <Ring items={outer} r={255} />
      <Ring items={inner} r={140} offset={18} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 -m-4 rounded-full bg-[#6D28D9]/10" />
        <div className="relative w-28 h-28 rounded-full bg-white border-[6px] border-[#EEEAFE] shadow-[0_20px_50px_-20px_rgba(109,40,217,0.6)] flex items-center justify-center">
          <img src="/pyhire-logo.webp" alt="" className="h-6 w-auto" />
        </div>
      </div>
    </div>
  );
}

/** "Every module. One PyHire." — the orbit, as its own section (moved out of the header). */
export function MOrbit() {
  const loops = useLoops();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBFAFF] via-[#F6F3FF] to-[#FBFAFF] py-14 lg:py-20">
      <Wrap className="relative">
        <motion.div {...rise} className="text-center max-w-2xl mx-auto">
          <Eyebrow>Everything connected</Eyebrow>
          <SectionHeading className="mt-3" accent="One PyHire.">Every module.</SectionHeading>
          <p className="mt-4 text-[1.0625rem] leading-[1.7] text-[#514D7A]">
            Job descriptions, candidate matching, interviews, offers, client and vendor work, all in one workspace.
          </p>
        </motion.div>

        <motion.div {...rise} className="mt-10 mx-auto max-w-[700px] hidden md:block">
          <BeamBorder radius={40} className="bg-[#E4DCFF] shadow-[0_40px_80px_-40px_rgba(109,40,217,0.55)]" delay={2}>
            <div className="flex flex-col items-center rounded-[40px] bg-gradient-to-br from-[#EEEAFE] via-[#F6F3FF] to-[#FBFDFF] pt-4 pb-3 overflow-hidden">
              <OrbitDiagram />
              <div aria-hidden="true" className="relative z-10 grid grid-cols-2 gap-3 w-full px-6 pb-3">
                <motion.div
                  className="flex items-center gap-3 rounded-2xl border border-[#E7E3F6] bg-white px-3.5 py-2.5 shadow-[0_18px_36px_-22px_rgba(27,22,80,0.45)]"
                  animate={loops ? { y: [0, -5, 0] } : undefined}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Initials name="Sarah Jenkis" size="w-9 h-9 text-[11px]" shape="rounded-full" />
                  <span className="leading-tight min-w-0">
                    <span className="flex items-center gap-1.5 text-[12px] font-bold text-[#1B1650]">
                      <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" /> Match found
                    </span>
                    <span className="block text-[11px] text-[#514D7A] truncate">Sarah Jenkis · 94% match</span>
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 rounded-2xl border border-[#E7E3F6] bg-white px-3.5 py-2.5 shadow-[0_18px_36px_-22px_rgba(27,22,80,0.45)]"
                  animate={loops ? { y: [0, 5, 0] } : undefined}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                >
                  <span className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CalendarCheck className="w-4 h-4" />
                  </span>
                  <span className="leading-tight min-w-0">
                    <span className="block text-[12px] font-bold text-[#1B1650]">Interview scheduled</span>
                    <span className="block text-[11px] text-[#514D7A] truncate">Reminders set · WhatsApp</span>
                  </span>
                </motion.div>
              </div>
            </div>
          </BeamBorder>
        </motion.div>

        <ul className="md:hidden mt-8 flex flex-wrap justify-center gap-2">
          {[...inner, ...outer].map(({ icon: Icon, t }) => (
            <li key={t} className="inline-flex items-center gap-2 rounded-full border border-[#E7E3F6] bg-white px-3 py-1.5 text-[13px] font-semibold text-[#1B1650]">
              <Icon className="w-3.5 h-3.5 text-[#5B21B6]" aria-hidden="true" /> {t}
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

/* ---------------- FAQ (Pricing FAQ, §13) ---------------- */
const faqs = [
  { q: 'Do I need a card to start the trial?', a: 'No. The trial runs for 15 days on the Free plan; choose a paid plan when you are ready.' },
  { q: 'What happens when the trial ends?', a: 'Your data is kept. The account is locked except for Billing until you choose a plan.' },
  { q: 'How are messages and calls charged?', a: 'From a prepaid credit wallet that you top up. Each email, SMS, WhatsApp message or call minute is deducted at the published rate, and failed sends are refunded.' },
  { q: 'Can I change plans?', a: 'Yes — upgrade at any time from the Billing page. Talk to us about moving to Enterprise or about a custom agreement.' },
  { q: 'Is there a setup fee?', a: 'No.' },
];
export function MFaq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#FBFAFF] py-14 lg:py-20">
      <Wrap className="max-w-[1080px]">
        <motion.div {...rise}>
          <Eyebrow>FAQ</Eyebrow>
          <SectionHeading className="mt-3" accent="book a demo.">Before you</SectionHeading>
        </motion.div>
        <ul className="mt-8 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className={`rounded-2xl border bg-white transition-colors ${isOpen ? 'border-[#6D28D9] shadow-[0_16px_40px_-28px_rgba(109,40,217,0.6)]' : 'border-[#E7E3F6]'}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`mfaq-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded-2xl"
                  >
                    <span className={`w-8 h-8 rounded-lg text-[12px] font-bold flex items-center justify-center shrink-0 ${isOpen ? 'bg-[#6D28D9] text-white' : 'bg-[#F2EFFB] text-white'}`}>0{i + 1}</span>
                    <span className="flex-1 font-display font-bold text-[16px] text-[#1B1650]">{f.q}</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isOpen ? 'bg-panel text-white' : 'bg-[#EEEAFE] text-[#5B21B6]'}`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                </h3>
                <motion.div
                  id={`mfaq-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="overflow-hidden"
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                >
                  <p className="px-5 pb-5 pl-[4.25rem] text-[15px] leading-[1.7] text-[#514D7A]">{f.a}</p>
                </motion.div>
              </li>
            );
          })}
        </ul>
        <Link to="/pricing" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-bold text-[#5B21B6] hover:gap-2.5 transition-all">
          See pricing <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </Wrap>
    </section>
  );
}

/* ---------------- Closing band (§2) ---------------- */
export function MCta() {
  return (
    <section className="bg-[#FBFAFF] pb-16 lg:pb-20">
      <Wrap>
        <motion.div {...rise} className="relative overflow-hidden rounded-[32px] bg-panel px-6 sm:px-12 py-12 lg:py-14">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/[0.05] to-transparent skew-x-[-14deg] origin-top" />
          <div aria-hidden="true" className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full bg-[#6D28D9]/20 blur-3xl" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)_auto] gap-8 items-center">
            <span className="hidden lg:flex w-24 h-24 rounded-[26px] bg-white items-center justify-center shadow-[0_0_50px_-10px_rgba(109,40,217,0.7)]">
              <img src="/pyhire-mark.png" alt="" className="w-14 h-14 object-contain" />
            </span>
            <div>
              <h2 className="font-display font-extrabold text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.025em] text-white">
                See PyHire <span className="text-[#C4B5FD]">on your own roles.</span>
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-[1.7] text-white/75 max-w-2xl">
                Book a 30-minute demo and we will walk through PyHire with one of your open positions — or start the free trial and set it up yourself.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={DEMO_PATH} className="inline-flex items-center justify-center rounded-full bg-[#6D28D9] hover:bg-[#8B5CF6] px-7 py-3.5 text-[16px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(109,40,217,0.8)] transition-all hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-white">
                Book a demo
              </Link>
              <Link to={TRIAL_PATH} className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-[16px] font-bold text-white hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white">
                Start free trial
              </Link>
            </div>
          </div>
        </motion.div>
      </Wrap>
    </section>
  );
}

