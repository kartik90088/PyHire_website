import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView } from 'motion/react';
import {
  ArrowRight, BrainCircuit, Building, Building2, CalendarCheck, Check, FileSpreadsheet, FolderOpen, Layers, LayoutGrid, Lock, Mail,
  MessageCircle, MessagesSquare, Phone, ShieldCheck, Sparkles, UserCheck, Users,
} from 'lucide-react';
import { useSeo } from '../../lib/useSeo';
import { DEMO_PATH } from '../../lib/routes';
import { productLinks } from '../../data/navigation';
import { ClosingBand, Container, PageHero, bandPrimary, bandSecondary, reveal, useLoops, useScrollTop } from '../../components/site/PageParts';
import { CountUp, Eyebrow, Initials, OutlineButton, PrimaryButton, SectionHeading } from '../../components/home/shared';
import { AboutVisual } from '../../components/site/AboutVisual';
import { MoreProducts } from '../../components/site/MoreProducts';
import { TeamCards } from '../../components/site/TeamCards';

/**
 * About — the headline, intro and principles are verbatim from the PyHire
 * website content document, section 14. The document leaves the company
 * story as "[to be supplied by the business]", so nothing is invented in its
 * place. The other sections restate facts from elsewhere in the same
 * document; each quote below notes its section.
 */

/* Facts stated in the content document (§1, §2, §6, §12, §13). */
const factIcons = [LayoutGrid, Users, MessagesSquare, CalendarCheck];
const facts = [
  { value: '8', label: 'Product areas in one workspace' },
  { value: '3', label: 'Ways to set up — consultancy, in-house or both' },
  { value: '4', label: 'Channels on one timeline — email, SMS, WhatsApp, calls' },
  { value: '15', label: 'Free trial, then choose a plan' },
];

/* "The problem" (§2). */
const before = [
  { icon: Mail, text: 'Job descriptions live in email' },
  { icon: FolderOpen, text: 'CVs pile up in a shared drive' },
  { icon: Phone, text: 'Calls happen on personal phones' },
  { icon: MessageCircle, text: 'Feedback arrives on WhatsApp' },
  { icon: FileSpreadsheet, text: 'The status report is out of date' },
];

/* Principles (§14) with supporting lines quoted from §2, §4 and §11. */
const principles: { icon: typeof Layers; title: string; support: string[]; viz: (on: boolean) => ReactNode }[] = [
  {
    icon: Layers,
    title: 'One place for the whole hiring process.',
    support: [
      'PyHire puts every step — and every conversation — on one timeline per candidate and one dashboard per team.',
      'Approvals, interviews, evaluation forms, offer letters, documents and joining checks follow one pipeline — nothing is tracked on the side.',
    ],
    viz: (on) => <OnePlaceViz on={on} />,
  },
  {
    icon: BrainCircuit,
    title: 'AI that explains itself and leaves decisions to people.',
    support: [
      'Honest AI: it explains itself, it works from your data, and the decision stays with your people.',
      'You decide what the AI may shortlist or reject on its own and what always goes to a recruiter.',
    ],
    viz: (on) => <DecideViz on={on} />,
  },
  {
    icon: ShieldCheck,
    title: 'Candidate data handled with care, by design.',
    support: [
      'Every company’s data is kept separate, and every request is checked against the company it belongs to.',
      'Consent records, data subject access requests and erasure, and retention rules for how long candidate data is kept.',
    ],
    viz: (on) => <CareViz on={on} />,
  },
];

/* "Built for the way you hire" (§2). */
const teams = [
  { icon: Building2, name: 'Recruitment consultancies', text: 'Manage clients, their job descriptions and your vendor network, and see delivery per client.' },
  { icon: Building, name: 'In-house HR teams', text: 'Hire for your own departments and locations, with requisition approvals and no client clutter.' },
  { icon: Layers, name: 'Hybrid teams', text: 'Run internal hiring and client mandates side by side in one account.' },
];

/* ---------------- principle illustrations ---------------- */

function useStep(on: boolean, count: number, ms: number) {
  const [n, setN] = useState(count - 1);
  useEffect(() => {
    if (!on) {
      setN(count - 1);
      return;
    }
    setN(0);
    const id = setInterval(() => setN((v) => (v + 1) % (count + 2)), ms);
    return () => clearInterval(id);
  }, [on, count, ms]);
  return Math.min(n, count - 1);
}

function OnePlaceViz({ on }: { on: boolean }) {
  const s = useStep(on, 5, 700);
  const steps = ['Requisition', 'Interview', 'Feedback', 'Offer', 'Joined'];
  return (
    <div className="space-y-2">
      {steps.map((st, i) => (
        <div key={st} className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] transition-all duration-300 ${i <= s ? 'bg-white border border-violet-100 text-slate-700 shadow-sm' : 'border border-dashed border-slate-200 text-slate-300'}`}>
          <span className={`w-4 h-4 rounded-full flex items-center justify-center ${i <= s ? 'bg-[#6D28D9] text-white' : 'border border-slate-200'}`}>
            {i <= s && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
          </span>
          {st}
          {i === s && <span className="ml-auto text-[10px] font-semibold text-violet-700">one timeline</span>}
        </div>
      ))}
    </div>
  );
}

function DecideViz({ on }: { on: boolean }) {
  const s = useStep(on, 3, 1100);
  return (
    <div className="space-y-2.5">
      <div className="rounded-xl bg-white border border-slate-100 p-3 shadow-sm">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" /> AI suggests
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Initials name="Sarah Jenkis" size="w-7 h-7 text-[9px]" shape="rounded-full" />
          <span className="text-[12px] text-slate-700">Shortlist Sarah Jenkis</span>
          <span className="ml-auto rounded-md bg-violet-50 px-1.5 py-0.5 text-[11px] font-bold text-violet-700">94%</span>
        </div>
        <AnimatePresence>
          {s >= 1 && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 text-[11px] text-slate-500 overflow-hidden">
              Why: React and TypeScript match · GraphQL missing
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {s >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl bg-panel px-3 py-2 text-[12px] text-white"
          >
            <UserCheck className="w-4 h-4 text-emerald-400" /> Recruiter decides · shortlisted
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CareViz({ on }: { on: boolean }) {
  const s = useStep(on, 4, 800);
  const items = ['Company data kept separate', 'Consent recorded', 'Access request handled', 'Retention rule applied'];
  return (
    <div className="flex gap-4 items-center">
      <div className="relative w-16 h-16 shrink-0">
        {on && (
          <motion.span className="absolute inset-0 rounded-2xl border-2 border-violet-300" animate={{ scale: [1, 1.35], opacity: [0.7, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        )}
        <span className="relative w-16 h-16 rounded-2xl bg-[#6D28D9] text-white flex items-center justify-center"><Lock className="w-7 h-7" /></span>
      </div>
      <ul className="flex-1 space-y-1.5">
        {items.map((it, i) => (
          <li key={it} className={`flex items-center gap-2 text-[12px] transition-colors duration-300 ${i <= s ? 'text-slate-700' : 'text-slate-300'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${i <= s ? 'bg-emerald-500 text-white' : 'bg-slate-100'}`}>
              {i <= s && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
            </span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- why we built it ---------------- */

function WhyBuilt() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const loops = useLoops();
  const on = loops && inView;
  const [gathered, setGathered] = useState(!loops);
  useEffect(() => {
    if (!on) return;
    setGathered(false);
    const a = setTimeout(() => setGathered(true), 1400);
    const id = setInterval(() => {
      setGathered(false);
      setTimeout(() => setGathered(true), 1400);
    }, 5200);
    return () => {
      clearTimeout(a);
      clearInterval(id);
    };
  }, [on]);

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 lg:gap-14 items-center">
      <motion.div {...reveal}>
        <Eyebrow>Why we built it</Eyebrow>
        <SectionHeading className="mt-4">Recruiting shouldn’t need six tools and a spreadsheet.</SectionHeading>
        <p className="mt-5 text-[1.0625rem] leading-[1.75] text-[#514D7A]">
          Job descriptions live in email. CVs pile up in a shared drive. Candidate calls happen on personal phones,
          interview feedback arrives on WhatsApp, and the weekly status report is out of date before it is sent. Good
          candidates slip through and nobody can say where the time went.
        </p>
        <p className="mt-4 text-[1.0625rem] leading-[1.75] font-medium text-[#1B1650]">
          PyHire puts every step — and every conversation — on one timeline per candidate and one dashboard per team.
        </p>
      </motion.div>

      <div aria-hidden="true" className="relative rounded-[32px] border border-slate-200 bg-gradient-to-br from-[#F8F6FD] to-white p-6 sm:p-8 overflow-hidden min-h-[380px]">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#fdba74_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4 items-center h-full">
          <ul className="space-y-2.5">
            {before.map(({ icon: Icon, text }, i) => (
              <motion.li
                key={text}
                className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-3 py-2 text-[12px] text-slate-600 shadow-sm"
                animate={{
                  x: gathered ? 40 : 0,
                  opacity: gathered ? 0.25 : 1,
                  rotate: gathered ? 0 : (i % 2 ? 2 : -2),
                }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Icon className="w-4 h-4 text-slate-400 shrink-0" /> <span className="truncate">{text}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="w-[72px] h-[72px] rounded-[22px] bg-white border border-violet-100 shadow-[0_14px_30px_-14px_rgba(91,33,182,0.5)] flex items-center justify-center"
            animate={{ scale: gathered ? 1.08 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <img src="/pyhire-mark.png" alt="" className="w-10 h-10 object-contain" />
          </motion.div>

          <div className="space-y-3">
            {['One timeline per candidate', 'One dashboard per team'].map((t, i) => (
              <motion.div
                key={t}
                className="rounded-2xl bg-white border border-violet-200 px-3.5 py-3 shadow-[0_12px_28px_-16px_rgba(91,33,182,0.5)]"
                animate={{ opacity: gathered ? 1 : 0.15, x: gathered ? 0 : -16, scale: gathered ? 1 : 0.96 }}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[13px] font-semibold text-[#1B1650]">{t}</p>
                <div className="mt-2 flex gap-1">
                  {[60, 85, 45, 70].map((w, k) => (
                    <span key={k} className="h-1.5 rounded-full bg-violet-200" style={{ width: `${w / 4}%` }} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- page ---------------- */

function PrincipleCard({ p, i }: { p: (typeof principles)[number]; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const loops = useLoops();
  const Icon = p.icon;
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-[32px] p-[1px] bg-gradient-to-b from-violet-200 via-violet-100 to-slate-100 hover:from-[#6D28D9] transition-colors duration-300"
    >
      <div className="h-full rounded-[31px] bg-white p-7 flex flex-col">
        <div className="flex items-center justify-between">
          <span className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 text-[#6D28D9] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
            <Icon className="w-6 h-6" aria-hidden="true" />
          </span>
          <span className="font-display font-bold text-[2.5rem] leading-none text-violet-100">0{i + 1}</span>
        </div>
        <h3 className="mt-5 font-display font-bold text-[1.45rem] leading-[1.2] tracking-[-0.02em] text-[#1B1650]">{p.title}</h3>
        <div aria-hidden="true" className="mt-5 rounded-[22px] bg-[#F6F3FF] border border-violet-100/70 p-4 min-h-[190px] flex flex-col justify-center">
          {p.viz(loops && inView)}
        </div>
        <ul className="mt-5 space-y-2.5">
          {p.support.map((line) => (
            <li key={line} className="flex gap-2.5 text-[14.5px] leading-[1.6] text-[#514D7A]">
              <Check className="w-4 h-4 text-[#6D28D9] shrink-0 mt-1" aria-hidden="true" /> {line}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}

export function About() {
  useScrollTop();
  const loops = useLoops();
  useSeo({
    title: 'About PyHire',
    description:
      'Why we built PyHire: one place for the whole hiring process, honest AI and careful handling of candidate data.',
    canonicalPath: '/about',
  });

  return (
    <main className="font-inter text-[#1B1650]">
      <PageHero
        eyebrow="About"
        visual={<AboutVisual />}
        title="We build the recruiting system we wanted to use."
        subtitle="PyHire was built for Indian recruiting teams — consultancies and in-house HR — who were running hiring across spreadsheets, inboxes and phones."
        actions={
          <>
            <PrimaryButton to={DEMO_PATH}>Book a demo</PrimaryButton>
            <OutlineButton to="/contact">Contact us</OutlineButton>
          </>
        }
      />

      {/* At a glance */}
      <section className="bg-white pt-12 lg:pt-16">
        <Container>
          <div className="relative overflow-hidden rounded-[32px] bg-panel shadow-[0_30px_70px_-34px_rgba(27,22,80,0.7)]">
            <div aria-hidden="true" className="absolute -left-16 -top-20 w-72 h-72 rounded-full bg-[#6D28D9]/25 blur-3xl" />
            <div aria-hidden="true" className="absolute -right-20 -bottom-24 w-72 h-72 rounded-full bg-[#6D28D9]/15 blur-3xl" />
            {/* a slow light sweeping across the band */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
              initial={{ left: '-30%' }}
              animate={loops ? { left: ['-30%', '120%'] } : { left: '-30%' }}
              transition={{ duration: 5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            />
            <ul className="relative grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
              {facts.map((f, i) => {
                const Icon = factIcons[i];
                return (
                  <motion.li
                    key={f.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: i * 0.09 }}
                    className="group relative p-6 lg:p-8 transition-colors duration-300 hover:bg-white/[0.04]"
                  >
                    <span className="flex items-center justify-between">
                      <span className="w-11 h-11 rounded-2xl bg-white/10 text-[#C4B5FD] flex items-center justify-center transition-all duration-300 group-hover:bg-[#6D28D9] group-hover:text-white group-hover:-rotate-6 group-hover:scale-110">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <span className="font-display font-extrabold text-[1.1rem] text-white/15">0{i + 1}</span>
                    </span>
                    <p className="mt-6 font-display font-extrabold text-[3rem] leading-none tracking-[-0.03em] text-white">
                      <CountUp value={f.value} />
                      {f.value === '15' && <span className="text-[#A78BFA]">-day</span>}
                    </p>
                    <p className="mt-3 text-[14px] leading-[1.55] text-white/70">{f.label}</p>
                    <span aria-hidden="true" className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#6D28D9] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      {/* Why we built it */}
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <WhyBuilt />
        </Container>
      </section>

      {/* Principles */}
      <section className="py-12 lg:py-16 bg-[#F8F6FD]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>How we build</Eyebrow>
            <SectionHeading className="mt-4">Our principles</SectionHeading>
          </div>
          <ul className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {principles.map((p, i) => (
              <PrincipleCard key={p.title} p={p} i={i} />
            ))}
          </ul>
        </Container>
      </section>

      {/* Who we build for */}
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <Eyebrow>Who we build for</Eyebrow>
              <SectionHeading className="mt-4">Built for the way you hire</SectionHeading>
            </div>
            <OutlineButton to="/solutions" className="self-start md:self-auto">See solutions</OutlineButton>
          </div>
          <TeamCards />
        </Container>
      </section>

      {/* Everything in one workspace */}
      <section className="bg-white pb-12 lg:pb-16">
        <Container>
          <div>
            <Eyebrow>What PyHire covers</Eyebrow>
            <SectionHeading className="mt-4">Everything in one workspace</SectionHeading>
          </div>
          <div className="mt-8">
            <MoreProducts heading={false} cta={false} />
          </div>
        </Container>
      </section>

      <ClosingBand text="We build the recruiting system we wanted to use.">
        <Link to={DEMO_PATH} className={bandPrimary}>Book a demo</Link>
        <Link to="/contact" className={bandSecondary}>Contact us</Link>
      </ClosingBand>
    </main>
  );
}
