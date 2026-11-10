import { useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion, type Transition } from 'motion/react';
import { ArrowRight, Building, Building2, Check, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Eyebrow, SectionHeading } from './shared';

/**
 * "Built for the way you hire" — copy verbatim from the PyHire website content
 * document, section 2. Each team type gets a small looping illustration of
 * how PyHire fits it. Client and department names are illustrative.
 * Loops run only on screen; reduced motion and the prerenderer get the final frame.
 */

function loop(on: boolean, duration: number, delay = 0, repeatDelay = 1.4): Transition {
  return on ? { duration, delay, repeat: Infinity, repeatDelay, ease: [0.22, 1, 0.36, 1] } : { duration: 0 };
}
const last = <T,>(frames: T[]) => frames[frames.length - 1];

/* Consultancies — delivery per client fills in. */
function ConsultancyViz({ on }: { on: boolean }) {
  const clients = [
    { name: 'Acme Corp', filled: 4, of: 5 },
    { name: 'Global Tech', filled: 2, of: 3 },
    { name: 'Nova Retail', filled: 3, of: 6 },
  ];
  return (
    <div className="space-y-2.5">
      {clients.map((c, i) => {
        const pct = `${Math.round((c.filled / c.of) * 100)}%`;
        const width = ['0%', pct, pct];
        return (
          <div key={c.name} className="rounded-xl bg-white border border-violet-100 px-3 py-2 shadow-sm">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-700">{c.name}</span>
              <span className="text-slate-500">{c.filled}/{c.of} roles delivered</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-violet-100 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#6D28D9]"
                initial={false}
                animate={{ width: on ? width : last(width) }}
                transition={{ ...loop(on, 2.2, i * 0.25), times: [0, 0.5, 1] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* In-house — a requisition moves through the approval chain. */
function InHouseViz({ on }: { on: boolean }) {
  const steps = ['Hiring manager', 'Department head', 'HR'];
  return (
    <div className="rounded-xl bg-white border border-violet-100 p-3 shadow-sm">
      <div className="text-[11px] font-semibold text-slate-700">Requisition · 2 × Sales Executive</div>
      <div className="text-[10px] text-slate-500">Bengaluru · Sales department</div>
      <ol className="mt-3 space-y-2">
        {steps.map((step, i) => {
          const bg = ['#ffffff', '#ffffff', '#6D28D9', '#6D28D9'];
          const at = 0.15 + i * 0.25;
          return (
            <li key={step} className="flex items-center gap-2 text-[11px] text-slate-600">
              <motion.span
                className="w-4 h-4 rounded-full border-2 border-[#6D28D9] text-white flex items-center justify-center"
                initial={false}
                animate={{ backgroundColor: on ? bg : last(bg) }}
                transition={{ ...loop(on, 3, 0, 1.2), times: [0, at - 0.01, at, 1], ease: 'linear' }}
              >
                <Check className="w-2.5 h-2.5" strokeWidth={3} />
              </motion.span>
              {step}
              <motion.span
                className="ml-auto rounded-full bg-emerald-50 text-emerald-700 px-1.5 text-[9px] font-bold"
                initial={false}
                animate={{ opacity: on ? [0, 0, 1, 1] : 1 }}
                transition={{ ...loop(on, 3, 0, 1.2), times: [0, at - 0.01, at, 1], ease: 'linear' }}
              >
                Approved
              </motion.span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* Hybrid — "Internal or client?" asked when a role is opened. */
function HybridViz({ on }: { on: boolean }) {
  const x = ['0%', '0%', '100%', '100%'];
  const times = [0, 0.4, 0.5, 1];
  return (
    <div className="rounded-xl bg-white border border-violet-100 p-3 shadow-sm">
      <div className="text-[11px] font-semibold text-slate-700">New role · Product Manager</div>
      <div className="mt-0.5 text-[10px] text-slate-500">Internal or client?</div>
      <div className="relative mt-3 grid grid-cols-2 rounded-full bg-violet-50 p-1 text-[11px] font-semibold">
        <motion.span
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-white border border-violet-300 shadow-sm"
          initial={false}
          animate={{ x: on ? x : last(x) }}
          transition={{ ...loop(on, 3.2, 0, 0.6), times, ease: 'easeInOut' }}
        />
        <span className="relative z-10 text-center py-1 text-violet-800">Internal</span>
        <span className="relative z-10 text-center py-1 text-violet-800">Client</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
        <span className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-1.5 text-slate-600">Time to hire · Sales</span>
        <span className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-1.5 text-slate-600">Delivery · Acme Corp</span>
      </div>
    </div>
  );
}

const segments: { name: string; desc: string; icon: typeof Building; viz: (on: boolean) => ReactNode }[] = [
  {
    name: 'Recruitment consultancies',
    desc: 'Manage clients, their job descriptions and your vendor network, and see delivery per client.',
    icon: Building2,
    viz: (on) => <ConsultancyViz on={on} />,
  },
  {
    name: 'In-house HR teams',
    desc: 'Hire for your own departments and locations, with requisition approvals and no client clutter.',
    icon: Building,
    viz: (on) => <InHouseViz on={on} />,
  },
  {
    name: 'Hybrid teams',
    desc: 'Run internal hiring and client mandates side by side in one account.',
    icon: Layers,
    viz: (on) => <HybridViz on={on} />,
  },
];

export function SegmentsGrid() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const on = inView && !reduce && typeof navigator !== 'undefined' && !navigator.webdriver;

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>Solutions</Eyebrow>
            <SectionHeading className="mt-4">Built for the way you hire</SectionHeading>
          </div>
          <Link
            to="/solutions"
            className="group self-start md:self-auto inline-flex items-center gap-2 rounded-2xl border border-black/20 bg-white px-6 py-3 text-[16px] font-semibold text-[#1B1650] hover:border-[#6D28D9] hover:text-[#5B21B6] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
          >
            See solutions
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <ul ref={ref} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {segments.map(({ name, desc, icon: Icon, viz }, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-[32px] p-[1px] bg-gradient-to-b from-violet-200 via-violet-100 to-transparent hover:from-[#6D28D9] hover:via-violet-200 transition-colors duration-300"
            >
              <div className="h-full rounded-[31px] bg-gradient-to-b from-[#F6F3FF] to-white p-6 flex flex-col group-hover:-translate-y-0.5 transition-transform duration-300">
                <div aria-hidden="true" className="relative h-[150px] rounded-[22px] bg-[#EAE5FF]/60 px-4 pt-7 pb-3 flex flex-col justify-center">
                  <span className="absolute -top-3 -left-3 w-10 h-10 rounded-2xl bg-white text-[#5B21B6] shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </span>
                  {viz(on)}
                </div>
                <h3 className="mt-6 font-display font-bold text-[1.5rem] leading-[1.15] tracking-[-0.02em] text-[#1B1650]">{name}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-[#514D7A]">{desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
