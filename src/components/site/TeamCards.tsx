import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Building, Building2, Layers } from 'lucide-react';
import { useLoops } from './PageParts';
import { BlockViz } from './BlockViz';

/**
 * "Built for the way you hire" — the three team types (copy verbatim from the
 * PyHire website content document, §2) as cards with a small animated picture
 * each. The three cards light up in turn while on screen (hover takes over);
 * the lit card gets the travelling highlight border. Client names, figures
 * and role names inside the pictures are sample data.
 */

function HybridPicture({ on }: { on: boolean }) {
  const x = ['0%', '0%', '100%', '100%'];
  return (
    <div className="h-full flex flex-col justify-center gap-2.5">
      <p className="text-[11px] font-semibold text-slate-700">New role · Product Manager</p>
      <p className="-mt-1.5 text-[10px] text-slate-500">Internal or client?</p>
      <div className="relative grid grid-cols-2 rounded-full bg-violet-50 p-1 text-[11px] font-semibold">
        <motion.span
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-white border border-violet-300 shadow-sm"
          initial={false}
          animate={{ x: on ? x : x[x.length - 1] }}
          transition={on ? { duration: 3.2, repeat: Infinity, repeatDelay: 0.6, times: [0, 0.4, 0.5, 1], ease: 'easeInOut' } : { duration: 0 }}
        />
        <span className="relative z-10 py-1 text-center text-violet-800">Internal</span>
        <span className="relative z-10 py-1 text-center text-violet-800">Client</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
        <span className="rounded-lg border border-slate-100 bg-white px-2 py-1.5 text-slate-600">Time to hire · Sales</span>
        <span className="rounded-lg border border-slate-100 bg-white px-2 py-1.5 text-slate-600">Delivery · Acme Corp</span>
      </div>
    </div>
  );
}

const teams = [
  {
    icon: Building2,
    name: 'Recruitment consultancies',
    text: 'Manage clients, their job descriptions and your vendor network, and see delivery per client.',
    picture: (on: boolean) => <BlockViz heading="A portfolio view of every client" on={on} />,
  },
  {
    icon: Building,
    name: 'In-house HR teams',
    text: 'Hire for your own departments and locations, with requisition approvals and no client clutter.',
    picture: (on: boolean) => <BlockViz heading="Requisitions with approvals" on={on} />,
  },
  {
    icon: Layers,
    name: 'Hybrid teams',
    text: 'Run internal hiring and client mandates side by side in one account.',
    picture: (on: boolean) => <HybridPicture on={on} />,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function TeamCards() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const loops = useLoops();
  const [hover, setHover] = useState<number | null>(null);
  const [auto, setAuto] = useState(0);

  useEffect(() => {
    if (!loops || !inView || hover !== null) return;
    const id = setTimeout(() => setAuto((a) => (a + 1) % teams.length), 3400);
    return () => clearTimeout(id);
  }, [loops, inView, hover, auto]);

  const lit = hover ?? (loops && inView ? auto : -1);
  const run = loops && inView;

  return (
    <ul ref={ref} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5" onMouseLeave={() => setHover(null)}>
      {teams.map(({ icon: Icon, name, text, picture }, i) => {
        const on = i === lit;
        return (
          <motion.li
            key={name}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: i * 0.1, ease }}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            className={`${on ? 'beam' : ''} group relative flex flex-col rounded-[30px] border bg-white p-5 transition-all duration-300 ${
              on
                ? 'border-[#6D28D9]/60 -translate-y-1.5 shadow-[0_28px_56px_-30px_rgba(109,40,217,0.65)]'
                : 'border-[#E7E3F6] shadow-[0_14px_30px_-24px_rgba(27,22,80,0.25)]'
            }`}
          >
            <div aria-hidden="true" className={`relative h-[178px] rounded-[22px] px-4 pb-3 pt-10 transition-colors duration-500 ${on ? 'bg-[#EEEAFE]' : 'bg-[#F8F6FD]'}`}>
              <span
                className={`absolute -top-3 -left-2 w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 ${
                  on ? 'bg-[#6D28D9] text-white -rotate-6 scale-110' : 'bg-white text-[#5B21B6]'
                }`}
              >
                <Icon className="w-5 h-5" />
              </span>
              <div className="h-full">{picture(run)}</div>
            </div>
            <h3 className="mt-5 font-display font-extrabold text-[1.35rem] leading-tight tracking-[-0.02em] text-[#1B1650]">{name}</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-[#514D7A]">{text}</p>
            <Link
              to="/solutions"
              className={`mt-4 inline-flex items-center gap-1.5 self-start text-[14px] font-bold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded ${
                on ? 'text-[#5B21B6] gap-2.5' : 'text-[#A39EC6]'
              }`}
            >
              See how it fits <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}
