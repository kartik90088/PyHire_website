import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import {
  ArrowRight, BarChart3, BrainCircuit, Briefcase, CalendarCheck, Globe, Handshake, Kanban, MessagesSquare, Pause, Play,
  type LucideIcon,
} from 'lucide-react';
import { DEMO_PATH } from '../../lib/routes';
import { featureCards } from '../Features';
import { CareersMockup } from '../site/Mockups';
import { PANEL, PANEL_DEEP, useIsDesktop } from './shared';

/**
 * "Everything in one workspace" — the eight tiles from the PyHire website
 * content document (home page feature grid), each linking to its product
 * page. Illustrations reuse the hand-built feature-card mockups.
 */
const mockupOf = (title: string) => featureCards.find((c) => c.title === title)?.mockup;
const icon = (Icon: LucideIcon) => <Icon className="w-6 h-6 text-[#6D28D9]" aria-hidden="true" />;

const tiles: { title: string; description: string; icon: ReactNode; mockup: ReactNode; href: string }[] = [
  { title: 'Job descriptions & requisitions', description: 'Approvals, AI-read JDs and one table of every open role',
    icon: icon(Briefcase), mockup: mockupOf('Job Management'), href: '/product/jobs-and-candidates' },
  { title: 'Candidate pipeline', description: 'Bulk upload, resume bank, status tracking and follow-ups',
    icon: icon(Kanban), mockup: mockupOf('Candidate Pipeline'), href: '/product/jobs-and-candidates' },
  { title: 'AI matching', description: 'Every candidate scored against every open role, with reasons',
    icon: icon(BrainCircuit), mockup: mockupOf('AI Candidate Matching'), href: '/product/ai' },
  { title: 'Interviews & offers', description: 'Scheduling, evaluation forms, offer letters, joining checks',
    icon: icon(CalendarCheck), mockup: mockupOf('Interview Management'), href: '/product/interviews-and-offers' },
  { title: 'Communication & calling', description: 'Inbox, campaigns, workflows and cloud calling with recordings',
    icon: icon(MessagesSquare), mockup: mockupOf('Unified Communication'), href: '/product/communication' },
  { title: 'Clients & vendors', description: 'Onboarding, reviews, vendor scorecards and a sales pipeline',
    icon: icon(Handshake), mockup: mockupOf('Client & Vendor Management'), href: '/product/clients-and-vendors' },
  { title: 'Analytics', description: 'Role-based dashboards, JD analysis and recruiter performance',
    icon: icon(BarChart3), mockup: mockupOf('Recruitment Analytics'), href: '/product/analytics' },
  { title: 'Careers page & mobile', description: 'Your own job board, a candidate portal and an Android app',
    icon: icon(Globe), mockup: <CareersMockup />, href: '/product/careers-page' },
];

/** How long each card stays open before the accordion advances. */
const CARD_MS = 5000;

/**
 * On desktop the eight tiles expand one at a time on a timer — the rest
 * collapse into vertical tabs that can be clicked to jump to them. Phones get
 * every tile stacked.
 */
export function ProductAccordion() {
  const isDesktop = useIsDesktop();

  return (
    <section className="bg-white px-3 py-6">
      {isDesktop ? <AutoAccordion /> : <StackedCards />}
    </section>
  );
}

function PanelHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
      <div className="max-w-3xl min-w-0">
        <p className="font-script text-[2rem] leading-none text-violet-100">The product</p>
        <h2 className="mt-4 font-display font-bold text-[2.25rem] sm:text-[2.9rem] leading-[1.08] tracking-[-0.03em] text-white">
          Everything in one workspace
        </h2>
      </div>
      <Link
        to={DEMO_PATH}
        className="self-start lg:self-auto shrink-0 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-[16px] font-semibold text-[#1B1650] hover:-translate-y-0.5 transition-transform duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#5B21B6]"
      >
        Book a demo
      </Link>
    </div>
  );
}

/**
 * The expanded card. Sized by container query on the card itself (its width
 * changes as tabs collapse), and laid out so the Explore button is pinned to
 * the bottom and always visible — the description clamps and the mockup is
 * cropped with a fade before either can push it out.
 */
function CardBody({ index }: { index: number }) {
  const card = tiles[index];
  return (
    <div className="@container h-full">
      <div className="h-full grid grid-cols-1 @[500px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-5 @[680px]:gap-8">
        <div className="hidden @[500px]:flex flex-col min-h-0 rounded-[24px] border border-slate-100 bg-slate-50/60 p-4 overflow-hidden [&>div]:mt-0 [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
          {card.mockup}
        </div>
        <div className="flex flex-col min-h-0">
          <span className="w-12 h-12 shrink-0 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center">
            {card.icon}
          </span>
          <h3 className="mt-5 font-display font-bold text-[1.9rem] leading-tight tracking-[-0.02em] text-[#1B1650]">
            {card.title}
          </h3>
          <p className="mt-4 text-[1.0625rem] leading-[1.65] text-[#514D7A] line-clamp-5">
            {card.description}
          </p>
          <Link
            to={card.href}
            className="mt-auto mb-3 self-start shrink-0 inline-flex items-center gap-2 rounded-2xl border border-black/20 px-6 py-3 text-[16px] font-semibold text-[#1B1650] hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
          >
            Explore <ArrowRight className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">{card.title}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Advances every CARD_MS, with a progress bar on the open card. Pauses on
 * hover or keyboard focus, while scrolled out of view, and via the pause
 * button (moving content must be stoppable). Never autoplays for
 * reduced-motion visitors, or in the prerenderer, so the snapshot is stable.
 */
function AutoAccordion() {
  const ref = useRef<HTMLDivElement>(null);
  const count = tiles.length;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const canAutoplay = !reduce && typeof navigator !== 'undefined' && !navigator.webdriver;
  const running = canAutoplay && playing && !held && inView;

  const progress = useMotionValue(0);
  const barWidth = useTransform(progress, (v) => `${v * 100}%`);

  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const next = progress.get() + (now - last) / CARD_MS;
      last = now;
      if (next >= 1) {
        progress.set(0);
        setActive((a) => (a + 1) % count);
      } else {
        progress.set(next);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, count, progress]);

  const show = (index: number) => {
    progress.set(0);
    setActive(index);
  };

  return (
    <div
      ref={ref}
      className="rounded-[40px] px-8 xl:px-12 py-10"
      style={{ backgroundColor: PANEL }}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <PanelHeader />

        <div className="mt-8 h-[500px] flex gap-2 xl:gap-2.5">
          {tiles.map((card, i) => {
            const isActive = i === active;
            return (
              <div
                key={card.title}
                className={`relative min-w-0 overflow-hidden transition-[flex-grow,flex-basis,background-color,border-radius] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isActive ? 'grow basis-0 rounded-[32px] bg-white' : 'grow-0 basis-[42px] xl:basis-[52px] rounded-[22px] xl:rounded-[26px]'
                }`}
                style={isActive ? undefined : { backgroundColor: PANEL_DEEP }}
              >
                {isActive ? (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        className="absolute inset-0 p-7"
                      >
                        <CardBody index={i} />
                      </motion.div>
                    </AnimatePresence>
                    {canAutoplay && (
                      <div aria-hidden="true" className="absolute inset-x-7 bottom-3 h-1 rounded-full bg-violet-100 overflow-hidden">
                        <motion.div className="h-full rounded-full bg-[#6D28D9]" style={{ width: barWidth }} />
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => show(i)}
                    aria-label={`Show ${card.title}`}
                    className="absolute inset-0 flex items-center justify-center hover:bg-black/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                  >
                    <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap font-display font-semibold text-[14px] xl:text-[16px] text-white">
                      {card.title}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-3">
          {canAutoplay && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause feature carousel' : 'Play feature carousel'}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {playing ? <Pause className="w-3.5 h-3.5" aria-hidden="true" /> : <Play className="w-3.5 h-3.5" aria-hidden="true" />}
            </button>
          )}
          {/* Announced only when the visitor drives it, not on every auto-advance. */}
          <p className="text-[13px] text-violet-100/80" aria-live={running ? 'off' : 'polite'}>
            {active + 1} / {count} · {tiles[active].title}
          </p>
        </div>
      </div>
    </div>
  );
}

function StackedCards() {
  return (
    <div className="rounded-[32px] px-5 sm:px-8 py-10" style={{ backgroundColor: PANEL }}>
      <PanelHeader />
      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map((card, i) => (
          <li key={card.title} className="min-w-0 rounded-[28px] bg-white p-6 flex flex-col">
            <CardBodyStacked index={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CardBodyStacked({ index }: { index: number }) {
  const card = tiles[index];
  return (
    <>
      <span className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center">{card.icon}</span>
      <h3 className="mt-5 font-display font-bold text-[1.5rem] leading-tight text-[#1B1650]">{card.title}</h3>
      <p className="mt-3 text-[15px] leading-[1.6] text-[#514D7A]">{card.description}</p>
      <div className="min-w-0 overflow-hidden">{card.mockup}</div>
      <Link
        to={card.href}
        className="mt-5 self-start inline-flex items-center gap-2 text-[15px] font-semibold text-[#5B21B6] hover:text-[#9A3412] outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded"
      >
        Explore {card.title} <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    </>
  );
}
