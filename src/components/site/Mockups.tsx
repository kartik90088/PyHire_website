import { motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Globe, Phone, PhoneCall, Bell } from 'lucide-react';
import { CountUp } from '../home/shared';
import { useLoops } from './PageParts';
import { featureCards } from '../Features';
import type { ProductPageContent } from '../../data/productPages';

/**
 * Hero illustrations for the product pages. Six reuse the hand-built mockups
 * from the home page feature cards; the careers page and mobile app have
 * their own. All are decorative (aria-hidden) — the page copy carries the
 * meaning.
 */

const FROM_FEATURE_CARDS: Partial<Record<ProductPageContent['mockup'], string>> = {
  jobs: 'Job Management',
  ai: 'AI Candidate Matching',
  interviews: 'Interview Management',
  communication: 'Unified Communication',
  clients: 'Client & Vendor Management',
  analytics: 'Recruitment Analytics',
};

export function ProductMockup({ kind }: { kind: ProductPageContent['mockup'] }) {
  const title = FROM_FEATURE_CARDS[kind];
  const card = title ? featureCards.find((c) => c.title === title) : undefined;
  if (kind === 'analytics') return <AnalyticsMockup />;
  const body = card ? card.mockup : kind === 'careers' ? <CareersMockup /> : <MobileMockup />;

  return (
    <div
      aria-hidden="true"
      className="w-full max-w-[530px] rounded-[28px] bg-white border border-black/5 p-5 shadow-[0_24px_60px_-24px_rgba(17,17,17,0.3)] [&>div]:mt-0"
    >
      {body}
    </div>
  );
}

export function CareersMockup() {
  return (
    <div className="bg-[#f8fbfa] rounded-2xl p-5 border border-slate-100 flex flex-col">
      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-3">
        <Globe className="w-3.5 h-3.5" /> careers · Open roles
      </div>
      <div className="space-y-3">
        {[
          { title: 'Senior React Developer', meta: 'Remote • Full-time' },
          { title: 'Product Manager', meta: 'New York • Hybrid' },
        ].map((job) => (
          <div key={job.title} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between gap-3">
            <div>
              <div className="text-[12px] font-bold text-slate-800">{job.title}</div>
              <div className="text-[10px] text-slate-500 mt-1">{job.meta}</div>
            </div>
            <span className="text-[10px] font-bold text-white bg-[#6D28D9] rounded-lg px-3 py-1.5">Apply</span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-white border border-violet-100 p-3 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        <span className="text-[11px] text-slate-600">Your application · <b className="text-slate-800">Interviewed</b></span>
      </div>
    </div>
  );
}

export function MobileMockup() {
  return (
    <div className="flex justify-center py-2">
      <div className="w-[220px] rounded-[30px] border-[6px] border-slate-800 bg-[#f8fbfa] p-3 shadow-lg">
        <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-slate-300" />
        <div className="rounded-xl bg-white border border-violet-100 p-2.5 flex items-start gap-2 shadow-sm">
          <Bell className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
          <div className="text-[10px] leading-snug text-slate-600">
            <b className="block text-slate-800">Follow-up in 15 min</b>
            Call back Sarah Jenkis
          </div>
        </div>
        <div className="mt-3 rounded-2xl bg-white border border-slate-100 p-4 text-center shadow-sm">
          <div className="mx-auto w-12 h-12 rounded-full bg-violet-100 text-violet-700 font-bold flex items-center justify-center">SJ</div>
          <div className="mt-2 text-[12px] font-bold text-slate-800">Sarah Jenkis</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1 mt-0.5">
            <PhoneCall className="w-3 h-3" /> Calling via PyHire
          </div>
          <div className="mt-3 mx-auto w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center rotate-[135deg]">
            <Phone className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-semibold">
          <span className="rounded-lg bg-emerald-50 text-emerald-700 py-1.5 text-center">Interested</span>
          <span className="rounded-lg bg-slate-100 text-slate-600 py-1.5 text-center">Call back</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Analytics hero: a live dashboard. All figures are sample data.      */
/* ------------------------------------------------------------------ */

const TREND = [34, 32, 33, 29, 30, 27, 26, 24]; // days to hire, oldest → newest
const MONTHS = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
const CW = 300;
const CH = 96;
const px = (i: number) => (i / (TREND.length - 1)) * CW;
const py = (v: number) => 10 + ((36 - v) / 14) * 70;
const pts = TREND.map((v, i) => [px(i), py(v)] as const);

/** Smooth path through the points (Catmull-Rom → cubic Bézier). */
const smooth = pts
  .map(([x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [x0, y0] = pts[i - 2] ?? pts[i - 1];
    const [x1, y1] = pts[i - 1];
    const [x3, y3] = pts[i + 1] ?? pts[i];
    const c1x = x1 + (x - x0) / 6;
    const c1y = y1 + (y - y0) / 6;
    const c2x = x - (x3 - x1) / 6;
    const c2y = y - (y3 - y1) / 6;
    return `C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x} ${y}`;
  })
  .join(' ');

const FUNNEL = [
  ['Matched', 240],
  ['Screened', 172],
  ['Interviewed', 96],
  ['Offered', 41],
  ['Joined', 29],
] as const;

const SOURCES = [
  ['Careers page', 34, '#6D28D9'],
  ['Vendors', 28, '#A78BFA'],
  ['Job portals', 22, '#C4B5FD'],
  ['Referrals', 16, '#1B1650'],
] as const;
const R = 24;
const CIRC = 2 * Math.PI * R;

function Kpi({ value, label, delta, down = true }: { value: string; label: string; delta: string; down?: boolean }) {
  const Arrow = down ? ArrowDownRight : ArrowUpRight;
  return (
    <div className="rounded-xl bg-white border border-slate-100 px-3 py-2.5 shadow-sm">
      <p className="font-display font-bold text-[1.35rem] leading-none text-[#1B1650]">
        <CountUp value={value} />
      </p>
      <p className="mt-1 text-[10px] text-slate-500">{label}</p>
      <p className="mt-1.5 inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
        <Arrow className="w-2.5 h-2.5" /> {delta}
      </p>
    </div>
  );
}

export function AnalyticsMockup() {
  const loops = useLoops();
  /* One looping timeline per element; without loops everything is the settled final frame. */
  const tr = (d: number, delay = 0) =>
    loops
      ? { duration: d, delay, repeat: Infinity, repeatDelay: 2.4, ease: [0.22, 1, 0.36, 1] as const, times: [0, 0.55, 1] }
      : { duration: 0 };
  let used = 0;

  return (
    <div aria-hidden="true" className="w-full max-w-[530px] rounded-[28px] bg-white border border-black/5 p-4 shadow-[0_24px_60px_-24px_rgba(17,17,17,0.3)] space-y-3">
      <div className="flex items-center justify-between px-1">
        <p className="font-display font-bold text-[15px] text-[#1B1650]">Hiring performance</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
          <span className="relative flex w-1.5 h-1.5">
            {loops && <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />}
            <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </span>
          Live · this month
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Kpi value="24 days" label="Time to hire" delta="−10 days" />
        <Kpi value="31 days" label="Time to fill" delta="−6 days" />
        <Kpi value="72%" label="Offer acceptance" delta="+8 pts" down={false} />
      </div>

      <div className="rounded-xl bg-white border border-slate-100 p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Time to hire · last 8 months</p>
          <span className="text-[10px] font-semibold text-emerald-700">Trending down</span>
        </div>
        <svg viewBox={`0 0 ${CW} ${CH}`} className="mt-2 w-full h-[96px] overflow-visible">
          <defs>
            <linearGradient id="an-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6D28D9" stopOpacity="0.28" />
              <stop offset="1" stopColor="#6D28D9" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20, 45, 70].map((y) => (
            <line key={y} x1="0" x2={CW} y1={y} y2={y} stroke="#F0EDFA" strokeDasharray="3 4" />
          ))}
          <motion.path
            d={`${smooth} L ${CW} ${CH} L 0 ${CH} Z`}
            fill="url(#an-fill)"
            initial={false}
            animate={{ opacity: loops ? [0, 1, 1] : 1 }}
            transition={tr(2.6, 0.5)}
          />
          <motion.path
            d={smooth}
            fill="none"
            stroke="#6D28D9"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: loops ? [0, 1, 1] : 1 }}
            transition={tr(2.6)}
          />
          {pts.map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={i === pts.length - 1 ? 4.5 : 2.5}
              fill={i === pts.length - 1 ? '#6D28D9' : '#fff'}
              stroke="#6D28D9"
              strokeWidth="1.5"
              initial={false}
              animate={{ opacity: loops ? [0, 0, 1] : 1 }}
              transition={{ ...tr(2.6, 0.2), times: [0, Math.min(i / pts.length, 0.9), Math.min(i / pts.length + 0.12, 1)] }}
            />
          ))}
        </svg>
        <div className="flex justify-between text-[9px] text-slate-400">
          {MONTHS.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[1.25fr_1fr] gap-2">
        <div className="rounded-xl bg-white border border-slate-100 p-3 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Hiring funnel</p>
          <div className="mt-2 space-y-1.5">
            {FUNNEL.map(([label, n], i) => (
              <div key={label} className="flex items-center gap-2 text-[9.5px]">
                <span className="w-[58px] text-slate-500">{label}</span>
                <div className="flex-1 h-3.5 rounded bg-violet-50 overflow-hidden">
                  <motion.div
                    className="h-full rounded bg-gradient-to-r from-[#6D28D9] to-[#A78BFA]"
                    initial={false}
                    animate={{ width: loops ? ['0%', `${(n / 240) * 100}%`, `${(n / 240) * 100}%`] : `${(n / 240) * 100}%` }}
                    transition={tr(2.2, i * 0.12)}
                  />
                </div>
                <span className="w-6 text-right font-bold text-slate-700">{n}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white border border-slate-100 p-3 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Hires by source</p>
          <div className="mt-2 flex items-center gap-2">
            <svg viewBox="0 0 64 64" className="w-[58px] h-[58px] -rotate-90 shrink-0">
              <circle cx="32" cy="32" r={R} fill="none" stroke="#F1F5F9" strokeWidth="9" />
              {SOURCES.map(([name, v, colour], i) => {
                const len = (v / 100) * CIRC;
                const dashOffset = -used;
                used += len;
                const full = `${len - 1} ${CIRC - len + 1}`;
                return (
                  <motion.circle
                    key={name}
                    cx="32"
                    cy="32"
                    r={R}
                    fill="none"
                    stroke={colour}
                    strokeWidth="9"
                    strokeDashoffset={dashOffset}
                    initial={false}
                    animate={{ strokeDasharray: loops ? [`0 ${CIRC}`, full, full] : full }}
                    transition={tr(2.2, i * 0.15)}
                  />
                );
              })}
            </svg>
            <ul className="space-y-0.5">
              {SOURCES.map(([name, v, colour]) => (
                <li key={name} className="flex items-center gap-1 text-[9px] text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: colour }} />
                  <span className="truncate">{name}</span>
                  <span className="ml-auto font-bold text-slate-700">{v}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
