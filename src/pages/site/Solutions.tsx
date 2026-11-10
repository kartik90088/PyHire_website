import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import {
  BarChart3, Building, Building2, ClipboardCheck, FileText, Handshake, Layers, LayoutGrid, Receipt, Send, Target, Users,
  type LucideIcon,
} from 'lucide-react';
import { useSeo } from '../../lib/useSeo';
import { ClosingBand, Container, DefaultActions, PageHero, reveal, useLoops, useScrollTop } from '../../components/site/PageParts';
import { Eyebrow, SectionHeading } from '../../components/home/shared';

/**
 * Solutions — copy verbatim from the PyHire website content document,
 * section 12. The key-screen lists are the document's own, split into chips.
 * Dashboard figures, client and department names in the illustrations are
 * sample data.
 */

interface Team {
  id: string;
  name: string;
  short: string;
  icon: LucideIcon;
  hireFor: string;
  screens: string;
  screenChips: string[];
  see: string;
  heading: string;
  body: string;
  menu: { icon: LucideIcon; label: string }[];
}

const teams: Team[] = [
  {
    id: 'consultancy',
    name: 'Recruitment consultancies',
    short: 'Consultancy',
    icon: Building2,
    hireFor: 'Your clients',
    screens: 'Client onboarding and portfolio, vendors, prospects, placements and invoicing',
    screenChips: ['Client onboarding', 'Client portfolio', 'Vendors', 'Prospects', 'Placements', 'Invoicing'],
    see: 'Delivery per client, vendor scorecards, client health',
    heading: 'For consultancies',
    body: 'Win clients, onboard them properly, deliver against their roles with your own recruiters and your vendor network, and bill on placement. PyHire keeps client and vendor work in the same place as the candidates.',
    menu: [
      { icon: Building2, label: 'Clients' },
      { icon: Handshake, label: 'Vendors' },
      { icon: Target, label: 'Prospects' },
      { icon: Users, label: 'Placements' },
      { icon: Receipt, label: 'Invoicing' },
    ],
  },
  {
    id: 'inhouse',
    name: 'In-house HR teams',
    short: 'In-house HR',
    icon: Building,
    hireFor: 'Your own departments and locations',
    screens: 'Departments, requisition approvals, internal job descriptions, offer release',
    screenChips: ['Departments', 'Requisition approvals', 'Internal job descriptions', 'Offer release'],
    see: 'Time to hire per department, requisitions awaiting approval',
    heading: 'For in-house teams',
    body: 'Requisitions with approvals, departments and locations, offer letters and joining checks — without client screens you do not need.',
    menu: [
      { icon: LayoutGrid, label: 'Departments' },
      { icon: ClipboardCheck, label: 'Requisition approvals' },
      { icon: FileText, label: 'Job descriptions' },
      { icon: Send, label: 'Offer release' },
    ],
  },
  {
    id: 'hybrid',
    name: 'Hybrid teams',
    short: 'Both',
    icon: Layers,
    hireFor: 'Both',
    screens: 'Everything, with "Internal or client?" asked when a role is opened',
    screenChips: ['Everything', '“Internal or client?” when a role is opened'],
    see: 'Both views side by side',
    heading: 'For hybrid teams',
    body: 'Run internal hiring and client mandates in one account, with every report split the way you need it.',
    menu: [
      { icon: Building2, label: 'Clients' },
      { icon: Handshake, label: 'Vendors' },
      { icon: LayoutGrid, label: 'Departments' },
      { icon: ClipboardCheck, label: 'Requisition approvals' },
      { icon: BarChart3, label: 'Reports · split view' },
    ],
  },
];

const rows: { label: string; key: 'hireFor' | 'screens' | 'see' }[] = [
  { label: 'You hire for', key: 'hireFor' },
  { label: 'Key screens', key: 'screens' },
  { label: 'What you see', key: 'see' },
];

/* ------------------------------------------------------------------ */
/* Hero: the product's menu adapting to the company type               */
/* ------------------------------------------------------------------ */
function AdaptVisual() {
  const loops = useLoops();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!loops) return;
    const id = setInterval(() => setI((n) => (n + 1) % teams.length), 2600);
    return () => clearInterval(id);
  }, [loops]);
  const team = teams[i];

  return (
    <div aria-hidden="true" className="w-[510px] max-w-full rounded-[28px] bg-white border border-black/5 shadow-[0_24px_60px_-24px_rgba(17,17,17,0.3)] overflow-hidden">
      <div className="flex items-center gap-1.5 px-5 py-3 border-b border-slate-100 bg-slate-50/70">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[12px] font-semibold text-slate-500">PyHire · Settings</span>
      </div>
      <div className="p-5">
        <p className="text-[12px] font-semibold text-slate-500">Company type</p>
        <div className="relative mt-2 grid grid-cols-3 rounded-xl bg-slate-100 p-1">
          {teams.map((t, n) => (
            <span key={t.id} className={`relative z-10 py-1.5 text-center text-[12px] font-semibold transition-colors ${n === i ? 'text-white' : 'text-slate-600'}`}>
              {n === i && (
                <motion.span layoutId="adapt-pill" className="absolute inset-0 -z-10 rounded-lg bg-[#6D28D9] shadow-sm" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              {t.short}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-[150px_minmax(0,1fr)] gap-4 min-h-[220px]">
          <ul className="space-y-1.5">
            <AnimatePresence mode="popLayout" initial={false}>
              {team.menu.map(({ icon: Icon, label }, n) => (
                <motion.li
                  key={`${team.id}-${label}`}
                  layout
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.3, delay: n * 0.05 }}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] font-medium ${n === 0 ? 'bg-violet-50 text-violet-800' : 'text-slate-600'}`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">{label}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="rounded-2xl border border-dashed border-violet-200 bg-[#F6F3FF] p-3 flex flex-col justify-center gap-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={team.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-700">Menus adapted</p>
                <p className="mt-1 font-display font-bold text-[15px] leading-tight text-[#1B1650]">{team.name}</p>
                {team.id === 'hybrid' ? (
                  <div className="mt-3 rounded-xl bg-white border border-violet-100 p-2.5">
                    <p className="text-[11px] font-semibold text-slate-700">New role — internal or client?</p>
                    <div className="mt-2 grid grid-cols-2 gap-1.5 text-[11px] font-semibold">
                      <span className="rounded-md bg-violet-50 text-violet-800 text-center py-1">Internal</span>
                      <span className="rounded-md bg-slate-100 text-slate-600 text-center py-1">Client</span>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-[12px] leading-snug text-slate-500">You hire for: {team.hireFor.toLowerCase()}</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* "What you see" — a small dashboard per team                         */
/* ------------------------------------------------------------------ */
function Bar({ label, value, pct, tone = 'bg-[#6D28D9]', delay = 0, dot }: { label: string; value: string; pct: number; tone?: string; delay?: number; dot?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[12px]">
        <span className="flex items-center gap-1.5 font-semibold text-slate-700">
          {dot && <span className={`w-2 h-2 rounded-full ${dot}`} />}
          {label}
        </span>
        <span className="text-slate-500">{value}</span>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-violet-100/70 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${tone}`}
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function ConsultancyView() {
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Delivery per client</p>
      <Bar label="Acme Corp" value="4 / 5 roles" pct={80} dot="bg-emerald-500" />
      <Bar label="Global Tech" value="2 / 3 roles" pct={66} dot="bg-emerald-500" delay={0.1} />
      <Bar label="Nova Retail" value="3 / 6 roles" pct={50} dot="bg-amber-400" delay={0.2} />
      <div className="pt-2 grid grid-cols-2 gap-2">
        <Stat label="Vendor scorecard" value="Rank #1 · Talent Bridge" />
        <Stat label="Client health" value="2 healthy · 1 needs attention" />
      </div>
    </div>
  );
}

function InHouseView() {
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Time to hire per department</p>
      <Bar label="Sales" value="18 days" pct={45} />
      <Bar label="Engineering" value="32 days" pct={80} delay={0.1} />
      <Bar label="Operations" value="24 days" pct={60} delay={0.2} />
      <div className="pt-2 grid grid-cols-2 gap-2">
        <Stat label="Requisitions awaiting approval" value="3 pending" accent />
        <Stat label="Offers released" value="This month · 7" />
      </div>
    </div>
  );
}

function HybridView() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl border border-slate-100 p-3 space-y-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Internal</p>
        <Bar label="Sales" value="18 days" pct={45} />
        <Bar label="Engineering" value="32 days" pct={80} delay={0.1} />
      </div>
      <div className="rounded-xl border border-slate-100 p-3 space-y-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Clients</p>
        <Bar label="Acme Corp" value="4 / 5" pct={80} tone="bg-violet-400" />
        <Bar label="Global Tech" value="2 / 3" pct={66} tone="bg-violet-400" delay={0.1} />
      </div>
      <p className="col-span-2 text-center text-[12px] text-slate-500">Both views side by side</p>
    </div>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl px-3 py-2 ${accent ? 'bg-violet-50 border border-violet-100' : 'bg-slate-50 border border-slate-100'}`}>
      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{label}</p>
      <p className={`mt-0.5 text-[12px] font-semibold ${accent ? 'text-violet-800' : 'text-slate-700'}`}>{value}</p>
    </div>
  );
}

const VIEWS: Record<string, () => ReactNode> = {
  consultancy: () => <ConsultancyView />,
  inhouse: () => <InHouseView />,
  hybrid: () => <HybridView />,
};

/* ------------------------------------------------------------------ */
/* Interactive team tabs                                               */
/* ------------------------------------------------------------------ */
const TAB_MS = 6000;

function TeamExplorer({ active, setActive }: { active: number; setActive: (n: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const loops = useLoops();
  const [held, setHeld] = useState(false);
  const [userPicked, setUserPicked] = useState(false);
  const auto = loops && inView && !held && !userPicked;

  useEffect(() => {
    if (!auto) return;
    const id = setTimeout(() => setActive((active + 1) % teams.length), TAB_MS);
    return () => clearTimeout(id);
  }, [auto, active, setActive]);

  const team = teams[active];
  const Icon = team.icon;

  return (
    <div ref={ref} onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)}>
      <div role="tablist" aria-label="Team type" className="relative grid grid-cols-3 gap-2 rounded-[22px] bg-slate-100 p-1.5">
        {teams.map((t, n) => {
          const TIcon = t.icon;
          const on = n === active;
          return (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              onClick={() => {
                setUserPicked(true);
                setActive(n);
              }}
              className={`relative z-10 flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-[14px] sm:text-[15px] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] ${
                on ? 'text-[#1B1650]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {on && (
                <motion.span layoutId="team-tab" className="absolute inset-0 -z-10 rounded-2xl bg-white shadow-[0_8px_20px_-10px_rgba(17,17,17,0.25)]" transition={{ type: 'spring', stiffness: 380, damping: 34 }}>
                  {auto && (
                    <motion.span
                      key={`progress-${active}`}
                      className="absolute left-3 right-3 bottom-1 h-[3px] origin-left rounded-full bg-[#6D28D9]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: TAB_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </motion.span>
              )}
              <TIcon className={`w-4 h-4 ${on ? 'text-[#6D28D9]' : ''}`} aria-hidden="true" />
              <span className="hidden sm:inline">{t.name}</span>
              <span className="sm:hidden">{t.short}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={team.id}
          role="tabpanel"
          id={`panel-${team.id}`}
          aria-labelledby={`tab-${team.id}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-5"
        >
          <div className="rounded-[28px] bg-gradient-to-br from-[#EAE5FF] to-[#F6F3FF] p-7 sm:p-8 flex flex-col">
            <span className="w-12 h-12 rounded-2xl bg-white text-[#5B21B6] shadow-sm flex items-center justify-center">
              <Icon className="w-6 h-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display font-bold text-[1.9rem] leading-tight tracking-[-0.02em]">{team.heading}</h3>
            <p className="mt-3 text-[16px] leading-[1.7] text-[#514D7A]">{team.body}</p>

            <p className="mt-6 text-[12px] font-semibold uppercase tracking-wider text-violet-800/70">You hire for</p>
            <p className="mt-1 font-semibold text-[16px]">{team.hireFor}</p>

            <p className="mt-5 text-[12px] font-semibold uppercase tracking-wider text-violet-800/70">Key screens</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {team.screenChips.map((chip, n) => (
                <motion.li
                  key={chip}
                  initial={{ opacity: 0, scale: 0.85, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + n * 0.06 }}
                  className="rounded-full bg-white border border-violet-100 px-3 py-1.5 text-[13px] font-medium text-slate-700 shadow-sm"
                >
                  {chip}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-7 sm:p-8 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="font-display font-bold text-[1.2rem]">What you see</p>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-[12px] font-semibold text-violet-700">{team.see}</span>
            </div>
            <div aria-hidden="true" className="mt-6 flex-1">{VIEWS[team.id]()}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Solutions() {
  useScrollTop();
  useSeo({
    title: 'ATS for Consultancies, In-house & Hybrid Teams | PyHire',
    description:
      'PyHire adapts to recruitment consultancies, in-house HR teams and hybrid teams. See how it fits the way you hire.',
    canonicalPath: '/solutions',
  });

  const [active, setActive] = useState(0);

  return (
    <main className="font-inter text-[#1B1650]">
      <PageHero
        eyebrow="Solutions"
        title="One platform, set up for how you hire."
        subtitle="Tell PyHire whether you are a consultancy, an in-house team or both, and the product adapts its menus and flows to fit."
        actions={<DefaultActions />}
        visual={<AdaptVisual />}
      />

      <section className="bg-white py-12 lg:py-16">
        <Container>
          <TeamExplorer active={active} setActive={setActive} />
        </Container>
      </section>

      <section className="bg-white pb-12 lg:pb-16">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow>At a glance</Eyebrow>
              <SectionHeading className="mt-3 !text-[2rem] sm:!text-[2.4rem]">Side by side</SectionHeading>
            </div>
          </div>

          {/* Comparison — the column for the active tab lights up */}
          <motion.div {...reveal} className="mt-8 hidden lg:block overflow-hidden rounded-[32px] border border-slate-200">
            <table className="w-full text-left">
              <caption className="sr-only">How PyHire fits each type of hiring team</caption>
              <thead>
                <tr className="bg-[#F8F6FD]">
                  <td className="p-6 w-[18%]" />
                  {teams.map(({ id, name, icon: Icon }, n) => (
                    <th key={id} scope="col" className={`relative p-6 border-l border-slate-200 align-bottom transition-colors duration-500 ${n === active ? 'bg-violet-100/70' : ''}`}>
                      {n === active && <motion.span layoutId="col-mark" className="absolute top-0 left-0 right-0 h-1 bg-[#6D28D9]" />}
                      <button type="button" onClick={() => setActive(n)} className="text-left outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded">
                        <Icon className="w-6 h-6 text-[#6D28D9]" aria-hidden="true" />
                        <span className="mt-3 block font-display font-bold text-[1.35rem] text-[#1B1650]">{name}</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, r) => (
                  <motion.tr
                    key={row.key}
                    className="border-t border-slate-200"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.45, delay: 0.1 + r * 0.12 }}
                  >
                    <th scope="row" className="p-6 text-[13px] font-semibold tracking-[0.15em] uppercase text-slate-500 align-top">
                      {row.label}
                    </th>
                    {teams.map((team, n) => (
                      <td
                        key={team.id}
                        className={`p-6 border-l border-slate-200 text-[16px] leading-[1.6] align-top transition-colors duration-500 ${
                          n === active ? 'bg-violet-50/60 text-[#1B1650]' : 'text-[#3A3766]'
                        }`}
                      >
                        {team[row.key]}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <ul className="mt-8 lg:hidden grid grid-cols-1 md:grid-cols-3 gap-4">
            {teams.map(({ id, name, icon: Icon, ...team }) => (
              <li key={id} className="rounded-[28px] border border-slate-200 p-6">
                <Icon className="w-6 h-6 text-[#6D28D9]" aria-hidden="true" />
                <h2 className="mt-3 font-display font-bold text-[1.35rem]">{name}</h2>
                <dl className="mt-4 space-y-4">
                  {rows.map((row) => (
                    <div key={row.key}>
                      <dt className="text-[12px] font-semibold tracking-[0.15em] uppercase text-slate-500">{row.label}</dt>
                      <dd className="mt-1 text-[15px] leading-[1.6] text-[#3A3766]">{team[row.key]}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ClosingBand text="One platform, set up for how you hire." />
    </main>
  );
}
