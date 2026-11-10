import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { DEMO_PATH } from '../../lib/routes';
import type { ProductPageContent } from '../../data/productPages';
import { AppWindow, BeamBorder, StatTile } from '../medic/AppWindow';
import { BlockViz } from './BlockViz';
import { MobileMockup } from './Mockups';
import { useLoops, type Block } from './PageParts';

/**
 * Eight body layouts for the product pages — one per page, so no two pages
 * read the same way. All copy is the page's own blocks (content document
 * §3–§10); only the arrangement differs. Illustrations are BlockViz,
 * animated only while on screen and never under reduced motion.
 */

const ease = [0.22, 1, 0.36, 1] as const;
const rise = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease },
};
const num = (i: number) => String(i + 1).padStart(2, '0');
const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();

function Wrap({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[1320px] mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** True while the element is mostly on screen. */
function useOnScreen<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, on] as const;
}

/** A BlockViz inside a white panel, sized and scaled to fit. */
function Viz({ heading, on, height = 250, zoom = 1.3, className = '' }: { heading: string; on: boolean; height?: number; zoom?: number; className?: string }) {
  const loops = useLoops();
  return (
    <div aria-hidden="true" className={`rounded-2xl bg-white border border-[#E7E3F6] p-4 overflow-hidden ${className}`} style={{ height }}>
      <div style={{ height: (height - 32) / zoom, zoom }}>
        <BlockViz heading={heading} on={on && loops} />
      </div>
    </div>
  );
}

function Points({ block, dark = false, limit }: { block: Block; dark?: boolean; limit?: number }) {
  const pts = limit ? block.points.slice(0, limit) : block.points;
  if (block.points.length === 1) {
    return <p className={`mt-3 text-[15.5px] leading-[1.7] ${dark ? 'text-white/75' : 'text-[#514D7A]'}`}>{block.points[0]}</p>;
  }
  return (
    <ul className="mt-4 space-y-2.5">
      {pts.map((pt) => (
        <li key={pt} className={`flex gap-3 text-[15px] leading-[1.6] ${dark ? 'text-white/80' : 'text-[#3A3766]'}`}>
          <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${dark ? 'bg-white/15 text-[#C4B5FD]' : 'bg-[#EEEAFE] text-[#5B21B6]'}`}>
            <Check className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
          </span>
          <span>{pt}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · AI — sticky showcase: the screen stays, the features scroll     */
/* ------------------------------------------------------------------ */
export function StickyShowcase({ blocks }: { blocks: Block[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.5;
      let next = 0;
      refs.current.forEach((el, i) => el && el.getBoundingClientRect().top <= line && (next = i));
      setActive(next);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, [blocks.length]);

  return (
    <section className="bg-[#FBFAFF] py-12 lg:py-16 border-b border-[#E7E3F6]">
      <Wrap className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] gap-10 xl:gap-16">
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <AppWindow title={blocks[active].heading}>
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                  <Viz heading={blocks[active].heading} on height={350} zoom={1.7} />
                </motion.div>
              </AnimatePresence>
            </AppWindow>
            <div className="mt-5 flex items-center gap-1.5" aria-hidden="true">
              {blocks.map((b, i) => (
                <span key={b.heading} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-10 bg-[#6D28D9]' : 'w-4 bg-[#E7E3F6]'}`} />
              ))}
              <span className="ml-3 text-[12px] font-semibold text-[#514D7A]">{num(active)} / {num(blocks.length - 1)}</span>
            </div>
          </div>
        </div>
        <ol className="space-y-5 lg:space-y-0">
          {blocks.map((b, i) => (
            <li key={b.heading} ref={(el) => { refs.current[i] = el; }} className="lg:min-h-[58vh] lg:flex lg:flex-col lg:justify-center">
              <motion.article
                {...rise}
                className={`rounded-[28px] border bg-white p-6 sm:p-8 transition-all duration-500 ${i === active ? 'border-[#C4B5FD] shadow-[0_30px_60px_-36px_rgba(109,40,217,0.6)] lg:-translate-x-1' : 'border-[#E7E3F6] lg:opacity-60'}`}
              >
                <span className="font-display font-extrabold text-[2.6rem] leading-none text-[#EDE9FE]">{num(i)}</span>
                <h3 className="mt-2 font-display font-extrabold text-[1.55rem] leading-tight tracking-[-0.02em] text-[#1B1650]">{b.heading}</h3>
                <Points block={b} />
                <div className="lg:hidden mt-5 overflow-hidden rounded-2xl"><Viz heading={b.heading} on height={260} zoom={1.4} /></div>
              </motion.article>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · Interviews — a journey timeline that fills as you scroll        */
/* ------------------------------------------------------------------ */
export function TimelineFlow({ blocks }: { blocks: Block[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 55%'] });
  return (
    <section className="bg-white py-12 lg:py-16 border-b border-[#E7E3F6] overflow-hidden">
      <Wrap>
        <div ref={ref} className="relative">
          <div aria-hidden="true" className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full bg-[#EDE9FE]" />
          <motion.div aria-hidden="true" className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-[#6D28D9] to-[#A78BFA]" style={{ scaleY: scrollYProgress }} />
          <ol className="space-y-10 lg:space-y-14">
            {blocks.map((b, i) => (
              <TimelineItem key={b.heading} block={b} i={i} right={i % 2 === 1} />
            ))}
          </ol>
        </div>
      </Wrap>
    </section>
  );
}
function TimelineItem({ block, i, right }: { block: Block; i: number; right: boolean }) {
  const [ref, on] = useOnScreen<HTMLLIElement>(0.4);
  return (
    <li ref={ref} className="relative pl-14 lg:pl-0">
      <span className={`absolute left-5 lg:left-1/2 top-6 -translate-x-1/2 z-10 w-11 h-11 rounded-full border-4 border-white flex items-center justify-center font-display font-extrabold text-[14px] shadow-[0_10px_24px_-10px_rgba(109,40,217,0.7)] transition-colors duration-500 ${on ? 'bg-[#6D28D9] text-white' : 'bg-[#EDE9FE] text-[#5B21B6]'}`}>
        {num(i)}
      </span>
      <motion.article
        initial={{ opacity: 0, x: right ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease }}
        className={`rounded-[28px] border bg-white p-6 sm:p-7 transition-all duration-500 lg:w-[calc(50%-48px)] ${right ? 'lg:ml-auto' : ''} ${on ? 'border-[#C4B5FD] shadow-[0_28px_56px_-34px_rgba(109,40,217,0.6)]' : 'border-[#E7E3F6]'}`}
      >
        <h3 className="font-display font-extrabold text-[1.4rem] leading-tight tracking-[-0.02em] text-[#1B1650]">{block.heading}</h3>
        <Points block={block} limit={3} />
        <div className="mt-5 overflow-hidden rounded-2xl"><Viz heading={block.heading} on={on} height={250} zoom={1.35} /></div>
      </motion.article>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Communication — channel tabs                                    */
/* ------------------------------------------------------------------ */
export function ChannelTabs({ blocks }: { blocks: Block[] }) {
  const [tab, setTab] = useState(0);
  const [ref, on] = useOnScreen<HTMLDivElement>(0.3);
  const b = blocks[tab];
  return (
    <section className="bg-[#FBFAFF] py-12 lg:py-16 border-b border-[#E7E3F6]">
      <Wrap>
        <motion.div ref={ref} {...rise}>
          <BeamBorder radius={34} className="bg-[#E4DCFF] shadow-[0_44px_90px_-50px_rgba(27,22,80,0.5)]" delay={1}>
            <div className="rounded-[34px] bg-white p-4 sm:p-6 lg:p-8">
              <div role="tablist" aria-label="Communication features" className="flex gap-2 overflow-x-auto pb-1">
                {blocks.map((blk, i) => (
                  <button
                    key={blk.heading}
                    role="tab"
                    aria-selected={i === tab}
                    onClick={() => setTab(i)}
                    className={`shrink-0 rounded-full px-4 py-2.5 text-[14px] font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] ${
                      i === tab ? 'bg-panel text-white shadow-[0_14px_26px_-14px_rgba(27,22,80,0.7)]' : 'bg-[#F2EFFB] text-[#514D7A] hover:bg-[#EEEAFE] hover:text-[#1B1650]'
                    }`}
                  >
                    <span className={`mr-2 text-[11px] font-bold ${i === tab ? 'text-[#C4B5FD]' : 'text-[#5B21B6]'}`}>{num(i)}</span>
                    {blk.heading}
                  </button>
                ))}
              </div>
              <div role="tabpanel" className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 items-center">
                <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
                  <h3 className="font-display font-extrabold text-[1.9rem] leading-tight tracking-[-0.025em] text-[#1B1650]">{b.heading}</h3>
                  <Points block={b} />
                  <div className="mt-6 flex items-center gap-3 text-[13px] font-semibold text-[#514D7A]">
                    <button type="button" disabled={tab === 0} onClick={() => setTab(tab - 1)} className="rounded-full border border-[#E7E3F6] px-4 py-2 hover:border-[#6D28D9] disabled:opacity-40 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]">← Previous</button>
                    <button type="button" disabled={tab === blocks.length - 1} onClick={() => setTab(tab + 1)} className="rounded-full bg-[#6D28D9] px-4 py-2 text-white hover:bg-[#8B5CF6] disabled:opacity-40 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]">Next →</button>
                    <span className="ml-auto">{num(tab)} / {num(blocks.length - 1)}</span>
                  </div>
                </motion.div>
                <motion.div key={`v-${tab}`} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease }}>
                  <AppWindow title={b.heading}>
                    <Viz heading={b.heading} on={on} height={330} zoom={1.65} />
                  </AppWindow>
                </motion.div>
              </div>
            </div>
          </BeamBorder>
        </motion.div>
      </Wrap>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · Clients — bento grid                                            */
/* ------------------------------------------------------------------ */
const SPANS = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-6'];
const TONES = ['bg-white border-[#E7E3F6]', 'bg-panel border-transparent text-white', 'bg-[#EEEAFE] border-[#E4DCFF]', 'bg-white border-[#E7E3F6]', 'bg-[#EEEAFE] border-[#E4DCFF]', 'bg-panel border-transparent text-white'];
export function BentoBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <section className="bg-white py-12 lg:py-16 border-b border-[#E7E3F6]">
      <Wrap>
        <ul className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {blocks.map((b, i) => (
            <BentoTile key={b.heading} block={b} i={i} />
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
function BentoTile({ block, i }: { block: Block; i: number }) {
  const [ref, on] = useOnScreen<HTMLLIElement>(0.35);
  const span = SPANS[i % SPANS.length];
  const tone = TONES[i % TONES.length];
  const dark = tone.includes('02224C');
  const wide = span.includes('col-span-4') || span.includes('col-span-6');
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease }}
      className={`${i === 0 ? 'beam' : ''} group relative overflow-hidden rounded-[30px] border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_34px_60px_-36px_rgba(27,22,80,0.5)] ${span} ${tone}`}
    >
      {dark && <div aria-hidden="true" className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-[#6D28D9]/25 blur-3xl" />}
      <div className={`relative ${wide ? 'grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-center h-full' : 'flex flex-col h-full'}`}>
        <div>
          <span className={`text-[12px] font-bold uppercase tracking-[0.14em] ${dark ? 'text-[#C4B5FD]' : 'text-[#5B21B6]'}`}>{num(i)}</span>
          <h3 className="mt-1.5 font-display font-extrabold text-[1.35rem] leading-tight tracking-[-0.02em]">{block.heading}</h3>
          <Points block={block} dark={dark} limit={wide ? 4 : 2} />
        </div>
        <div className={wide ? '' : 'mt-auto pt-5'}>
          <Viz heading={block.heading} on={on} height={wide ? 260 : 215} zoom={wide ? 1.4 : 1.2} />
        </div>
      </div>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · Analytics — cards that stack over each other                    */
/* ------------------------------------------------------------------ */
export function StackedCards({ blocks }: { blocks: Block[] }) {
  return (
    <section className="bg-[#FBFAFF] py-12 lg:py-16 border-b border-[#E7E3F6]">
      <Wrap>
        <ol className="pb-4">
          {blocks.map((b, i) => (
            <StackCard key={b.heading} block={b} i={i} total={blocks.length} />
          ))}
        </ol>
      </Wrap>
    </section>
  );
}
function StackCard({ block, i, total }: { block: Block; i: number; total: number }) {
  const [ref, on] = useOnScreen<HTMLLIElement>(0.3);
  return (
    <li ref={ref} className="lg:sticky mb-6 lg:mb-10" style={{ top: 108 + i * 22, zIndex: i + 1 }}>
      <div className="rounded-[34px] border border-[#E7E3F6] bg-white p-6 sm:p-8 shadow-[0_30px_70px_-44px_rgba(27,22,80,0.5)]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-8 items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display font-extrabold text-[3.2rem] leading-none text-[#DDD6FE]">{num(i)}</span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#C4B5FD] to-transparent" />
              <span className="text-[12px] font-semibold text-[#514D7A]">{i + 1} of {total}</span>
            </div>
            <h3 className="mt-3 font-display font-extrabold text-[1.7rem] leading-tight tracking-[-0.025em] text-[#1B1650]">{block.heading}</h3>
            <Points block={block} />
          </div>
          <AppWindow title={block.heading}>
            <Viz heading={block.heading} on={on} height={285} zoom={1.5} />
          </AppWindow>
        </div>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Careers — a four-step path                                      */
/* ------------------------------------------------------------------ */
export function StepsPath({ blocks }: { blocks: Block[] }) {
  return (
    <section className="bg-white py-12 lg:py-16 border-b border-[#E7E3F6]">
      <Wrap>
        <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div aria-hidden="true" className="hidden lg:block absolute left-[12%] right-[12%] top-[26px] h-0 border-t-2 border-dashed border-[#C4B5FD]" />
          {blocks.map((b, i) => (
            <PathStep key={b.heading} block={b} i={i} />
          ))}
        </ol>
      </Wrap>
    </section>
  );
}
function PathStep({ block, i }: { block: Block; i: number }) {
  const [ref, on] = useOnScreen<HTMLLIElement>(0.4);
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: i * 0.12, ease }}
      className="relative flex flex-col"
    >
      <span className={`relative z-10 mx-auto lg:mx-0 lg:ml-6 w-[52px] h-[52px] rounded-2xl flex items-center justify-center font-display font-extrabold text-[1.2rem] shadow-[0_14px_28px_-12px_rgba(109,40,217,0.7)] transition-colors duration-500 ${on ? 'bg-[#6D28D9] text-white' : 'bg-[#EDE9FE] text-[#5B21B6]'}`}>
        {i + 1}
      </span>
      <div className="-mt-6 flex-1 rounded-[28px] border border-[#E7E3F6] bg-white p-5 pt-10 transition-all duration-300 hover:-translate-y-1 hover:border-[#C4B5FD] hover:shadow-[0_28px_50px_-34px_rgba(109,40,217,0.55)]">
        <Viz heading={block.heading} on={on} height={215} zoom={1.25} />
        <h3 className="mt-5 font-display font-extrabold text-[1.2rem] leading-tight text-[#1B1650]">{block.heading}</h3>
        <Points block={block} />
      </div>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* 7 · Mobile — a large phone with the features around it              */
/* ------------------------------------------------------------------ */
export function PhoneShowcase({ blocks, secondaryCta }: { blocks: Block[]; secondaryCta?: ProductPageContent['secondaryCta'] }) {
  const [ref, on] = useOnScreen<HTMLDivElement>(0.3);
  const left = [blocks[0], blocks[2]].filter(Boolean);
  const right = [blocks[1]].filter(Boolean);
  const card = (b: Block, i: number, side: 'l' | 'r') => (
    <motion.article
      key={b.heading}
      initial={{ opacity: 0, x: side === 'l' ? -36 : 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: i * 0.12, ease }}
      className="rounded-[28px] border border-[#E7E3F6] bg-white p-6 shadow-[0_24px_50px_-36px_rgba(27,22,80,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C4B5FD]"
    >
      <h3 className="font-display font-extrabold text-[1.3rem] leading-tight text-[#1B1650]">{b.heading}</h3>
      <Points block={b} />
      <div className="mt-4 overflow-hidden rounded-2xl"><Viz heading={b.heading} on={on} height={195} zoom={1.15} /></div>
    </motion.article>
  );
  return (
    <section className="relative bg-[#FBFAFF] py-12 lg:py-16 border-b border-[#E7E3F6] overflow-hidden">
      <Wrap>
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px_minmax(0,1fr)] gap-6 lg:gap-10 items-center">
          <div className="space-y-5 order-2 lg:order-1">{left.map((b, i) => card(b, i, 'l'))}</div>
          <motion.div {...rise} className="order-1 lg:order-2 relative flex justify-center">
            <div aria-hidden="true" className="absolute inset-0 m-auto w-[300px] h-[300px] rounded-full bg-[#6D28D9]/15 blur-3xl" />
            <BeamBorder radius={44} className="bg-[#E4DCFF]" delay={2}>
              <div className="relative rounded-[44px] bg-gradient-to-b from-[#F6F3FF] to-white px-6 py-8">
                <div className="scale-[1.18] origin-center py-8"><MobileMockup /></div>
              </div>
            </BeamBorder>
          </motion.div>
          <div className="space-y-5 order-3">
            {right.map((b, i) => card(b, i, 'r'))}
            {secondaryCta && (
              <motion.div {...rise} className="relative overflow-hidden rounded-[28px] bg-panel p-6 text-white">
                <div aria-hidden="true" className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-[#6D28D9]/30 blur-2xl" />
                <p className="relative font-display font-extrabold text-[1.3rem] leading-tight">Stay on top of candidates between meetings.</p>
                <div className="relative mt-5 flex flex-wrap gap-2.5">
                  <Link to={DEMO_PATH} className="inline-flex items-center gap-1.5 rounded-full bg-[#6D28D9] px-5 py-2.5 text-[14px] font-bold text-white hover:-translate-y-0.5 transition-transform">Book a demo</Link>
                  <Link to={secondaryCta.to} className="inline-flex items-center gap-1.5 rounded-full border border-white/40 px-5 py-2.5 text-[14px] font-bold text-white hover:bg-white/10 transition-colors">{secondaryCta.label} <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Hero visual — a headline screen with sample stats                    */
/* ------------------------------------------------------------------ */
const HERO: Partial<Record<ProductPageContent['mockup'], { stats: [string, string][]; signature: string }>> = {
  jobs: { stats: [['12', 'Open roles'], ['340', 'Candidates'], ['7', 'Pipeline stages']], signature: 'One table for every open role' },
  ai: { stats: [['240', 'CVs read today'], ['24', 'Matched'], ['94%', 'Top match']], signature: 'Candidate matching with reasons' },
  interviews: { stats: [['14', 'Interviews'], ['5', 'Offers out'], ['3', 'Joining checks']], signature: 'Scheduling with reminders' },
  communication: { stats: [['4', 'Channels'], ['48', 'Campaign sends'], ['12', 'Calls logged']], signature: 'One inbox for every channel' },
  clients: { stats: [['12', 'Active clients'], ['8', 'Vendors'], ['4', 'Prospects']], signature: 'A portfolio view of every client' },
};
export function hasHeroDash(kind: ProductPageContent['mockup']) {
  return !!HERO[kind];
}
export function HeroDash({ page, wide = false }: { page: ProductPageContent; wide?: boolean }) {
  const cfg = HERO[page.mockup]!;
  return (
    <AppWindow title={page.eyebrow} className={`${wide ? 'w-[880px]' : 'w-[590px]'} max-w-full`}>
      <div className="grid grid-cols-3 gap-2.5">
        {cfg.stats.map(([v, l]) => <StatTile key={l} value={v} label={l} />)}
      </div>
      <div className="mt-3"><Viz heading={cfg.signature} on height={300} zoom={1.55} /></div>
    </AppWindow>
  );
}

/** Body layout for each product page. */
export function ProductBody({ page }: { page: ProductPageContent }) {
  switch (page.mockup) {
    case 'ai': return <StickyShowcase blocks={page.blocks} />;
    case 'interviews': return <TimelineFlow blocks={page.blocks} />;
    case 'communication': return <ChannelTabs blocks={page.blocks} />;
    case 'clients': return <BentoBlocks blocks={page.blocks} />;
    case 'analytics': return <StackedCards blocks={page.blocks} />;
    case 'careers': return <StepsPath blocks={page.blocks} />;
    case 'mobile': return <PhoneShowcase blocks={page.blocks} secondaryCta={page.secondaryCta} />;
    default: return null;
  }
}
