import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight, Award, BadgeCheck, Briefcase, CalendarCheck, FileText, Handshake, Quote, Search, Sparkles, UserCheck,
} from 'lucide-react';
import { missionStats } from '../Mission';
import { testimonialList } from '../Testimonials';
import { CREAM, Cloud, Eyebrow, Initials, PANEL, SectionHeading } from './shared';

/**
 * "What They Say About Us" — a masonry wall of cards whose columns drift
 * slowly up and down at different speeds (pausing on hover), over faint,
 * floating hiring illustrations.
 *
 * Only three real testimonials exist, so the wall interleaves them with the
 * published KPI figures rather than inventing quotes or star ratings. Add new
 * quotes to `testimonialList` and they flow into the columns automatically.
 */

type WallCard =
  | { kind: 'quote'; index: number; highlight?: boolean }
  | { kind: 'stat'; index: number; highlight?: boolean };

/* Four columns, each in a different order so neighbours rarely match. */
const COLUMNS: { cards: WallCard[]; duration: number; reverse?: boolean; className?: string }[] = [
  {
    /* The first column is the one screen readers hear, so it carries every quote. */
    duration: 46,
    cards: [
      { kind: 'quote', index: 0 },
      { kind: 'stat', index: 2, highlight: true },
      { kind: 'quote', index: 1 },
      { kind: 'stat', index: 1 },
      { kind: 'quote', index: 2 },
    ],
  },
  {
    duration: 54,
    reverse: true,
    cards: [
      { kind: 'quote', index: 1, highlight: true },
      { kind: 'stat', index: 0 },
      { kind: 'quote', index: 0, highlight: true },
      { kind: 'stat', index: 4 },
    ],
    className: 'hidden md:block',
  },
  {
    duration: 50,
    cards: [
      { kind: 'stat', index: 4, highlight: true },
      { kind: 'quote', index: 2 },
      { kind: 'stat', index: 3 },
      { kind: 'quote', index: 1 },
    ],
    className: 'hidden lg:block',
  },
  {
    duration: 58,
    reverse: true,
    cards: [
      { kind: 'quote', index: 2, highlight: true },
      { kind: 'stat', index: 1 },
      { kind: 'quote', index: 1 },
      { kind: 'stat', index: 3, highlight: true },
    ],
    className: 'hidden xl:block',
  },
];

function QuoteCard({ index, highlight }: { index: number; highlight?: boolean }) {
  const t = testimonialList[index % testimonialList.length];
  return (
    <figure
      className={`rounded-[20px] p-6 border transition-transform duration-300 hover:-translate-y-1 ${
        highlight ? 'border-transparent text-white' : 'bg-white border-slate-200 shadow-[0_4px_20px_-12px_rgba(17,17,17,0.12)]'
      }`}
      style={highlight ? { backgroundColor: PANEL } : undefined}
    >
      <figcaption className="flex items-center gap-3">
        <Initials
          name={t.author}
          size="w-11 h-11 text-[13px]"
          tone={highlight ? 'bg-white/20 text-white' : 'bg-violet-100 text-violet-700'}
          shape="rounded-full"
        />
        <span className="min-w-0">
          <span className="block font-semibold text-[16px] leading-tight">{t.author}</span>
          <span className={`block text-[14px] ${highlight ? 'text-violet-100' : 'text-slate-500'}`}>{t.role}</span>
        </span>
        <Quote className={`ml-auto w-5 h-5 shrink-0 ${highlight ? 'text-violet-200' : 'text-violet-300'}`} aria-hidden="true" />
      </figcaption>
      <blockquote className={`mt-4 text-[16px] leading-[1.6] ${highlight ? 'text-white' : 'text-[#3A3766]'}`}>
        {t.text}
      </blockquote>
    </figure>
  );
}

function StatCard({ index, highlight }: { index: number; highlight?: boolean }) {
  const s = missionStats[index % missionStats.length];
  return (
    <div
      className={`rounded-[20px] p-6 border transition-transform duration-300 hover:-translate-y-1 ${
        highlight ? 'border-transparent text-white' : 'bg-white border-slate-200 shadow-[0_4px_20px_-12px_rgba(17,17,17,0.12)]'
      }`}
      style={highlight ? { backgroundColor: PANEL } : undefined}
    >
      <BadgeCheck className={`w-6 h-6 ${highlight ? 'text-violet-200' : 'text-[#6D28D9]'}`} aria-hidden="true" />
      <p className="mt-4 font-display font-bold text-[2.5rem] leading-none tracking-[-0.03em]">{s.value}</p>
      <p className={`mt-2 text-[15px] leading-[1.5] whitespace-pre-line ${highlight ? 'text-violet-50' : 'text-[#514D7A]'}`}>
        {s.label}
      </p>
    </div>
  );
}

function Column({ cards, duration, reverse, className = '', hidden }: (typeof COLUMNS)[number] & { hidden: boolean }) {
  const list = (copy: number) => (
    <ul className="flex flex-col gap-5 pb-5" aria-hidden={copy === 1 || hidden || undefined}>
      {cards.map((card, i) => (
        <li key={`${copy}-${i}`}>
          {card.kind === 'quote' ? <QuoteCard {...card} /> : <StatCard {...card} />}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`min-w-0 ${className}`}>
      <div
        className="group-hover:[animation-play-state:paused] will-change-transform"
        style={{ animation: `home-marquee-y ${duration}s linear infinite${reverse ? ' reverse' : ''}` }}
      >
        {list(0)}
        {list(1)}
      </div>
    </div>
  );
}

/* Faint hiring illustrations that drift behind the content. */
const DOODLES = [
  { icon: FileText, label: 'Resume', className: 'left-[3%] top-[9%]', delay: 0 },
  { icon: Briefcase, className: 'left-[12%] top-[22%]', delay: 1.2 },
  { icon: Search, label: 'Screening', className: 'right-[4%] top-[8%]', delay: 0.6 },
  { icon: CalendarCheck, className: 'right-[14%] top-[24%]', delay: 1.8 },
  { icon: Handshake, label: 'Offered', className: 'left-[2%] bottom-[18%]', delay: 0.9 },
  { icon: UserCheck, label: 'Hired', className: 'right-[3%] bottom-[20%]', delay: 0.3 },
  { icon: Award, className: 'left-[24%] top-[6%]', delay: 2.1 },
  { icon: Sparkles, label: '98% Match', className: 'right-[26%] top-[5%]', delay: 1.5 },
];

function HiringDoodles() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none hidden md:block">
      {DOODLES.map(({ icon: Icon, label, className, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute ${className} opacity-[0.35]`}
          animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, i % 2 ? 4 : -4, 0] }}
          transition={{ duration: 6 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay }}
        >
          {label ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 px-3.5 py-1.5 text-[13px] font-semibold text-violet-700">
              <Icon className="w-4 h-4" /> {label}
            </span>
          ) : (
            <span className="w-12 h-12 rounded-2xl border border-violet-200 bg-white/60 text-violet-500 flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </span>
          )}
        </motion.div>
      ))}
      {/* Small sparkles, as in the reference */}
      <span className="absolute left-[30%] top-[14%] w-3 h-3 rotate-45 rounded-[3px] bg-violet-300/60" />
      <span className="absolute left-[32%] top-[18%] w-2 h-2 rotate-45 rounded-[2px] bg-violet-300/50" />
      <span className="absolute right-[30%] top-[16%] w-3 h-3 rotate-45 rounded-[3px] bg-violet-300/50" />
    </div>
  );
}

export function TestimonialWall() {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden" style={{ backgroundColor: CREAM }}>
      <Cloud className="-left-10 top-16 hidden md:block" tone="bg-violet-100" />
      <Cloud className="right-0 top-[30%] hidden md:block" tone="bg-violet-100" />
      <HiringDoodles />

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="text-center">
          <Eyebrow>Testimonials</Eyebrow>
          <SectionHeading className="mt-4">What They Say About Us</SectionHeading>
        </div>

        {/* Screen readers get each quote once, from the first column; the
            moving duplicates are hidden from them. */}
        <div className="group relative mt-14 h-[640px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {COLUMNS.map((col, i) => (
              <Column key={i} {...col} hidden={i > 0} />
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="flex items-baseline gap-3">
            <span className="font-display font-bold text-[2rem] text-[#1B1650]">9.2/10</span>
            <span className="text-[14px] text-slate-600">Total Reviews out of 10 in app (Interviews module)</span>
          </p>
          <p className="text-[15px] text-slate-600">See how PyHire can transform your hiring process.</p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-2xl bg-violet-100 px-5 py-2.5 text-[15px] font-semibold text-violet-800 hover:bg-violet-200 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
          >
            Explore more <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
