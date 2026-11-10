import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { DEMO_PATH, TRIAL_PATH } from '../../lib/routes';
import { CREAM, Eyebrow, OutlineButton, PANEL, PrimaryButton } from '../home/shared';
import { BlockViz } from './BlockViz';
import { AppWindow } from '../medic/AppWindow';

/**
 * Building blocks shared by the inner pages (product, solutions, security,
 * pricing, partners, about, contact), in the same visual language as the home
 * page. Continuous loops are skipped for reduced-motion visitors and in the
 * prerenderer (navigator.webdriver), so snapshots stay stable.
 */

/** React Router does not reset scroll between routes. */
export function useScrollTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

/** True when continuous (looping) animation is appropriate. */
export function useLoops() {
  const reduce = useReducedMotion();
  return !reduce && typeof navigator !== 'undefined' && !navigator.webdriver;
}

export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

/** Hero backdrop in the PyCore family style: a soft tinted panel to the right. */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-[55%] rounded-l-[80px] bg-gradient-to-br from-[#EEEAFE] via-[#F6F3FF] to-transparent" />
    </div>
  );
}

/** Split a headline into navy lead + accent tail (sentence, then comma, then last two words). */
export function splitHeadline(h: string): [string, string] {
  const dot = h.indexOf('. ');
  if (dot > -1) return [h.slice(0, dot + 1), h.slice(dot + 2)];
  const comma = h.lastIndexOf(', ');
  if (comma > -1) return [h.slice(0, comma + 1), h.slice(comma + 2)];
  const words = h.split(' ');
  return [words.slice(0, -2).join(' '), words.slice(-2).join(' ')];
}

/** Two-tone headline revealed word by word; one plain heading for search and screen readers. */
function RevealTitle({ text }: { text: string }) {
  const [lead, tail] = splitHeadline(text);
  const words = [...lead.split(' ').map((w) => ({ w, a: false })), ...tail.split(' ').filter(Boolean).map((w) => ({ w, a: true }))];
  return (
    <h1 className="mt-4 font-display font-extrabold text-[2.5rem] sm:text-[3.1rem] lg:text-[3.5rem] leading-[1.06] tracking-[-0.03em] text-[#1B1650]">
      {words.map(({ w, a }, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.08em]">
            <motion.span
              className={`inline-block ${a ? 'text-[#5B21B6]' : ''}`}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </h1>
  );
}

/** Chips that float around a hero visual. */
function FloatingChips({ chips }: { chips: string[] }) {
  const loops = useLoops();
  const spots = ['-left-6 -top-4', '-right-3 -bottom-5', 'left-2 -bottom-8'];
  return (
    <>
      {chips.slice(0, 3).map((chip, i) => (
        <motion.span
          key={chip}
          aria-hidden="true"
          className={`absolute ${spots[i]} hidden xl:inline-flex items-center gap-1.5 rounded-full bg-white border border-violet-100 px-3 py-1.5 text-[12px] font-semibold text-slate-700 shadow-[0_10px_24px_-12px_rgba(17,17,17,0.3)] whitespace-nowrap`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: loops ? [0, i % 2 ? 8 : -8, 0] : 0 }}
          transition={{
            opacity: { duration: 0.4, delay: 0.6 + i * 0.15 },
            scale: { duration: 0.4, delay: 0.6 + i * 0.15 },
            y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <Check className="w-3.5 h-3.5 text-[#6D28D9]" /> {chip}
        </motion.span>
      ))}
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  intro,
  actions,
  visual,
  chips,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro?: string;
  actions?: ReactNode;
  visual?: ReactNode;
  /** Short labels that float around the visual. */
  chips?: string[];
  /** Text centred with the visual underneath, instead of the split layout. */
  centered?: boolean;
}) {
  const loops = useLoops();
  const split = !!visual && !centered;
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-32 pb-10 lg:pb-14" style={{ backgroundColor: CREAM }}>
      <div className="relative">
      <HeroBackdrop />
      <div
        className={`relative max-w-[1320px] mx-auto px-4 sm:px-6 ${
          split ? 'grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 lg:gap-12 items-center' : 'text-center'
        }`}
      >
        <div className={split ? 'min-w-0' : 'max-w-4xl mx-auto'}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          <RevealTitle text={title} />
          <motion.p
            className="mt-6 text-[1.125rem] sm:text-[1.3rem] leading-[1.6] text-[#514D7A]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {subtitle}
          </motion.p>
          {actions && (
            <motion.div
              className={`mt-9 flex flex-col sm:flex-row gap-3 ${split ? '' : 'justify-center'}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {actions}
            </motion.div>
          )}
        </div>
        {visual && (
          <motion.div
            className={`relative flex justify-center min-w-0 max-w-full pb-6 ${split ? 'lg:justify-end' : 'mt-12'}`}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative min-w-0 max-w-full"
              animate={loops ? { y: [0, -10, 0] } : undefined}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              {visual}
              {chips && <FloatingChips chips={chips} />}
            </motion.div>
          </motion.div>
        )}
      </div>
      </div>
      {intro && (
        <motion.p
          {...reveal}
          className="relative max-w-3xl mx-auto px-4 sm:px-6 mt-10 lg:mt-12 text-center text-[1.2rem] leading-[1.75] text-[#3A3766] before:block before:mx-auto before:mb-5 before:w-12 before:h-1 before:rounded-full before:bg-[#6D28D9]"
        >
          {intro}
        </motion.p>
      )}
    </section>
  );
}

/** The doc's standard pair: Book a demo (primary) and Start free trial (secondary). */
export function DefaultActions({ secondary }: { secondary?: { label: string; to: string } }) {
  return (
    <>
      <PrimaryButton to={DEMO_PATH}>Book a demo</PrimaryButton>
      <OutlineButton to={secondary?.to ?? TRIAL_PATH}>{secondary?.label ?? 'Start free trial'}</OutlineButton>
    </>
  );
}

export interface Block {
  heading: string;
  points: string[];
}

function BlockBody({ block }: { block: Block }) {
  return block.points.length === 1 ? (
    <p className="mt-4 text-[16px] leading-[1.7] text-[#514D7A]">{block.points[0]}</p>
  ) : (
    <ul className="mt-4 space-y-3">
      {block.points.map((point, i) => (
        <motion.li
          key={point}
          className="flex gap-3 text-[16px] leading-[1.65] text-[#514D7A]"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
        >
          <Check className="w-5 h-5 text-[#6D28D9] shrink-0 mt-0.5" aria-hidden="true" />
          <span>{point}</span>
        </motion.li>
      ))}
    </ul>
  );
}

/**
 * Feature blocks as a scroll story: on desktop a sticky contents list with a
 * progress rail tracks the block being read (and jumps to any block); on the
 * right the cards reveal as they scroll in, and the active one glows.
 */
export function FeatureBlocks({
  blocks,
  icons,
  visuals = false,
}: {
  blocks: Block[];
  icons?: ReactNode[];
  /** Show an animated illustration beside each block (product pages). */
  visuals?: boolean;
}) {
  const [active, setActive] = useState(0);
  const loops = useLoops();
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  /* Active block = the last one whose top has passed the middle of the viewport.
     Deterministic on scroll and after a contents click (which centres the card). */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.5;
      let next = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) next = i;
      });
      setActive(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [blocks.length]);

  const badge = (i: number, on: boolean) => (
    <span
      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-display font-bold text-[15px] transition-colors duration-300 [&_svg]:w-5 [&_svg]:h-5 ${
        on ? 'bg-[#6D28D9] text-white' : 'bg-violet-50 border border-violet-100 text-[#6D28D9]'
      }`}
    >
      {icons?.[i] ?? String(i + 1).padStart(2, '0')}
    </span>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
      <nav aria-label="On this page" className="hidden lg:block sticky top-28">
        <div className="relative pl-5">
          <div className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-violet-100" />
          <motion.div
            className="absolute left-0 top-1 w-[3px] rounded-full bg-[#6D28D9]"
            animate={{ height: `${((active + 1) / blocks.length) * 100}%` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          <ol className="space-y-1">
            {blocks.map((block, i) => (
              <li key={block.heading}>
                <button
                  type="button"
                  onClick={() => refs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className={`w-full text-left rounded-lg px-3 py-2 text-[15px] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] ${
                    i === active ? 'bg-violet-50 text-[#5B21B6] font-semibold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {block.heading}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <ol className="space-y-5">
        {blocks.map((block, i) => {
          const on = i === active;
          return (
            <motion.li
              key={block.heading}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-[28px] border bg-white p-7 sm:p-8 transition-[border-color,box-shadow] duration-300 ${
                on ? 'border-violet-200 shadow-[0_24px_50px_-30px_rgba(91,33,182,0.45)]' : 'border-slate-200'
              }`}
            >
              <div className={visuals ? 'grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_260px] gap-6 items-center' : ''}>
                <div>
                  <div className="flex items-center gap-3">
                    {badge(i, on)}
                    <h3 className="font-display font-bold text-[1.45rem] leading-tight tracking-[-0.02em] text-[#1B1650]">{block.heading}</h3>
                  </div>
                  <BlockBody block={block} />
                </div>
                {visuals && (
                  <div
                    aria-hidden="true"
                    className={`hidden md:block h-[170px] rounded-[22px] border p-4 transition-colors duration-500 ${
                      on ? 'bg-[#EEEAFE] border-violet-100' : 'bg-slate-50/80 border-slate-100'
                    }`}
                  >
                    <BlockViz heading={block.heading} on={on && loops} />
                  </div>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * Feature blocks as full-width alternating rows (PyCore family style, as on
 * PyMedic's feature pages): numbered heading and checklist on one side, an
 * app window with the block's animated illustration on the other. The
 * illustration animates only while its row is on screen.
 */
function FeatureRow({ block, i, total }: { block: Block; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const loops = useLoops();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const flip = i % 2 === 1;
  return (
    <section className={`py-12 lg:py-16 border-b border-[#E7E3F6] ${flip ? 'bg-white' : 'bg-[#FBFAFF]'}`}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div {...reveal} className={flip ? 'lg:order-2' : ''}>
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#5B21B6]">
            {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
          <h2 className="mt-3 font-display font-extrabold text-[1.9rem] sm:text-[2.3rem] leading-[1.1] tracking-[-0.025em] text-[#1B1650]">
            {block.heading}
          </h2>
          {block.points.length === 1 ? (
            <p className="mt-5 text-[1.075rem] leading-[1.75] text-[#514D7A]">{block.points[0]}</p>
          ) : (
            <ul className="mt-5 space-y-3.5">
              {block.points.map((point, k) => (
                <motion.li
                  key={point}
                  className="flex gap-3 text-[1.0rem] leading-[1.65] text-[#3A3766]"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.1 + k * 0.08 }}
                >
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-[#EEEAFE] text-[#5B21B6] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
        <motion.div ref={ref} {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className={flip ? 'lg:order-1' : ''}>
          <AppWindow title={block.heading}>
            <div className="rounded-2xl bg-white border border-[#E7E3F6] p-4 h-[250px] overflow-hidden">
              <div className="h-[170px]" style={{ zoom: 1.35 }}>
                <BlockViz heading={block.heading} on={on && loops} />
              </div>
            </div>
          </AppWindow>
        </motion.div>
      </div>
    </section>
  );
}

export function FeatureRows({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <FeatureRow key={block.heading} block={block} i={i} total={blocks.length} />
      ))}
    </>
  );
}

/** Feature blocks as a simple card grid (kept for short lists). */
export function BlockGrid({ blocks, icons }: { blocks: Block[]; icons?: ReactNode[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {blocks.map((block, i) => (
        <motion.li
          key={block.heading}
          {...reveal}
          transition={{ ...reveal.transition, delay: (i % 2) * 0.08 }}
          className="rounded-[28px] border border-slate-200 bg-white p-8 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(17,17,17,0.25)] transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-2xl bg-violet-50 border border-violet-100 text-[#6D28D9] flex items-center justify-center shrink-0 font-display font-bold text-[15px] [&_svg]:w-5 [&_svg]:h-5">
              {icons?.[i] ?? String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display font-bold text-[1.4rem] leading-tight tracking-[-0.02em] text-[#1B1650]">{block.heading}</h3>
          </div>
          <BlockBody block={block} />
        </motion.li>
      ))}
    </ul>
  );
}

/** Navy closing band (PyCore family style): brand tile, the page's last line, CTAs. */
export function ClosingBand({ text, children }: { text: string; children?: ReactNode }) {
  const [lead, tail] = splitHeadline(text);
  return (
    <section className="px-4 sm:px-6 py-10">
      <motion.div
        {...reveal}
        className="relative overflow-hidden max-w-[1320px] mx-auto rounded-[32px] px-6 sm:px-12 py-12 lg:py-14"
        style={{ backgroundColor: PANEL }}
      >
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/[0.05] to-transparent skew-x-[-14deg] origin-top" />
        <div aria-hidden="true" className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full bg-[#6D28D9]/20 blur-3xl" />
        <div className="relative grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)_auto] gap-8 items-center">
          <span className="hidden lg:flex w-20 h-20 rounded-[24px] bg-white items-center justify-center shadow-[0_0_50px_-10px_rgba(109,40,217,0.7)]">
            <img src="/pyhire-mark.png" alt="" className="w-12 h-12 object-contain" />
          </span>
          <p className="font-display font-extrabold text-[1.9rem] sm:text-[2.4rem] leading-[1.1] tracking-[-0.025em] text-white">
            {lead} <span className="text-[#C4B5FD]">{tail}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            {children ?? (
              <>
                <Link to={DEMO_PATH} className={bandPrimary}>Book a demo</Link>
                <Link to={TRIAL_PATH} className={bandSecondary}>Start free trial</Link>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/** Light and dark button styles for use inside the navy band. */
export const bandPrimary =
  'inline-flex items-center justify-center rounded-full bg-[#6D28D9] hover:bg-[#8B5CF6] px-7 py-3.5 text-[16px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(109,40,217,0.8)] hover:-translate-y-0.5 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1650]';
export const bandSecondary =
  'inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-[16px] font-bold text-white hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[1320px] mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}
