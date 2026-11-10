import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useSpring } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { productLinks } from '../../data/navigation';
import { productPages } from '../../data/productPages';
import { plans } from '../../data/plans';
import { Eyebrow, SectionHeading } from '../home/shared';
import { BlockViz } from '../site/BlockViz';
import { splitHeadline, useLoops } from '../site/PageParts';
import { AppWindow, BeamBorder } from './AppWindow';

/**
 * Home page sections added in the "next level" pass. All copy is from the
 * PyHire website content document: the tour restates each product page's own
 * headline, sub-headline and feature headings; the plans preview restates the
 * Pricing page's plans (single source: data/plans.ts). Only the labels "Product
 * tour" and "A tour of PyHire." are layout wording.
 */

const ease = [0.22, 1, 0.36, 1] as const;
const rise = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease },
};
const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();

/* ------------------------------------------------------------------ */
/* Scroll progress — a thin orange line across the top of every page   */
/* ------------------------------------------------------------------ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#6D28D9] via-[#A78BFA] to-[#6D28D9] pointer-events-none"
      style={{ scaleX }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Product tour — eight tabs, each stepping through its three features */
/* ------------------------------------------------------------------ */
const STEP_MS = 3200;
const PER_TAB = 3;

const tours = productLinks.map((link) => {
  const page = productPages.find((p) => p.path === link.path)!;
  return { link, page, features: page.blocks.slice(0, PER_TAB) };
});

export function MTour() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const loops = useLoops();
  const [step, setStep] = useState(0);
  const [hover, setHover] = useState(false);
  const running = loops && inView && !hover;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setStep((s) => (s + 1) % (tours.length * PER_TAB)), STEP_MS);
    return () => clearTimeout(id);
  }, [running, step]);

  const tab = Math.floor(step / PER_TAB);
  const bullet = step % PER_TAB;
  const { link, page, features } = tours[tab];
  const [lead, tail] = splitHeadline(page.headline);
  const Icon = link.icon;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F6F3FF] to-white py-14 lg:py-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <motion.div {...rise} className="max-w-3xl">
          <Eyebrow>Product tour</Eyebrow>
          <SectionHeading className="mt-3" accent="PyHire.">A tour of</SectionHeading>
          <p className="mt-4 text-[1.0625rem] leading-[1.7] text-[#514D7A]">
            Tell PyHire whether you are a consultancy, an in-house team or both, and the product adapts its menus and flows to fit.
          </p>
        </motion.div>

        <motion.div ref={ref} {...rise} className="mt-10" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <BeamBorder radius={36} className="bg-[#E4DCFF] shadow-[0_44px_90px_-46px_rgba(27,22,80,0.55)]" delay={3}>
            <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)] rounded-[36px] bg-white overflow-hidden">
              {/* tab rail */}
              <div role="tablist" aria-label="PyHire product areas" className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible bg-[#F8F6FD] p-3 lg:p-4 border-b lg:border-b-0 lg:border-r border-[#E7E3F6]">
                {tours.map(({ link: l }, i) => {
                  const on = i === tab;
                  const TabIcon = l.icon;
                  return (
                    <button
                      key={l.path}
                      role="tab"
                      id={`tour-tab-${i}`}
                      aria-selected={on}
                      aria-controls="tour-panel"
                      onClick={() => setStep(i * PER_TAB)}
                      className={`relative shrink-0 flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-left text-[14px] font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] ${
                        on ? 'bg-white text-[#1B1650] shadow-[0_12px_26px_-16px_rgba(27,22,80,0.4)]' : 'text-[#514D7A] hover:bg-white/70'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${on ? 'bg-[#6D28D9] text-white -rotate-6' : 'bg-white text-[#5B21B6]'}`}>
                        <TabIcon className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span className="whitespace-nowrap lg:whitespace-normal leading-tight">{l.label}</span>
                      {on && (
                        <span aria-hidden="true" className="absolute left-3 right-3 -bottom-px h-[3px] rounded-full bg-violet-100 overflow-hidden">
                          <motion.span
                            className="block h-full rounded-full bg-[#6D28D9]"
                            initial={false}
                            animate={{ width: `${((bullet + 1) / PER_TAB) * 100}%` }}
                            transition={{ duration: 0.4, ease }}
                          />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* panel */}
              <div id="tour-panel" role="tabpanel" aria-labelledby={`tour-tab-${tab}`} className="relative p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 items-center">
                  <motion.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#EEEAFE] px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-[#5B21B6]">
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" /> {page.eyebrow}
                    </span>
                    <h3 className="mt-4 font-display font-extrabold text-[1.8rem] sm:text-[2.1rem] leading-[1.1] tracking-[-0.025em] text-[#1B1650]">
                      {lead} <span className="text-[#5B21B6]">{tail}</span>
                    </h3>
                    <p className="mt-3 text-[15.5px] leading-[1.65] text-[#514D7A]">{page.subheadline}</p>

                    <ul className="mt-6 space-y-2.5">
                      {features.map((f, i) => {
                        const on = i === bullet;
                        return (
                          <li key={f.heading}>
                            <button
                              type="button"
                              onClick={() => setStep(tab * PER_TAB + i)}
                              className={`w-full text-left flex gap-3 rounded-2xl border px-4 py-3 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] ${
                                on ? 'border-[#6D28D9]/60 bg-[#F3F0FF] shadow-[0_16px_30px_-22px_rgba(109,40,217,0.7)]' : 'border-[#E7E3F6] bg-white hover:border-[#C4B5FD]'
                              }`}
                            >
                              <span className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${on ? 'bg-[#6D28D9] text-white' : 'bg-[#F2EFFB] text-[#A39EC6]'}`}>
                                <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />
                              </span>
                              <span>
                                <span className="block font-display font-bold text-[15px] text-[#1B1650]">{f.heading}</span>
                                <span className={`block text-[13.5px] leading-[1.55] text-[#514D7A] transition-all duration-300 ${on ? 'mt-1 max-h-24 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                  {firstSentence(f.points[0])}
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    <Link to={link.path} className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-bold text-[#5B21B6] hover:gap-2.5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded">
                      Explore {link.label} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </motion.div>

                  <motion.div key={`${tab}-${bullet}`} initial={{ opacity: 0, scale: 0.97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
                    <AppWindow title={features[bullet].heading}>
                      <div className="rounded-2xl bg-white border border-[#E7E3F6] p-4 h-[250px] overflow-hidden">
                        <div className="h-[170px]" style={{ zoom: 1.3 }}>
                          <BlockViz heading={features[bullet].heading} on={running} />
                        </div>
                      </div>
                    </AppWindow>
                  </motion.div>
                </div>
              </div>
            </div>
          </BeamBorder>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Plans preview                                                       */
/* ------------------------------------------------------------------ */
export function MPlans() {
  return (
    <section className="relative bg-white py-14 lg:py-20 overflow-hidden">
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-full w-[44%] -translate-x-1/2 bg-gradient-to-b from-[#F3F0FF] to-transparent" />
      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6">
        <motion.div {...rise} className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div className="max-w-2xl">
            <Eyebrow>Pricing</Eyebrow>
            <SectionHeading className="mt-3" accent="Start free.">Simple plans.</SectionHeading>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-[#514D7A]">
              Try PyHire free for 15 days, then choose the plan that fits your team. No setup fee.
            </p>
          </div>
          <Link to="/pricing" className="inline-flex items-center gap-1.5 self-start md:self-auto text-[15px] font-bold text-[#5B21B6] hover:gap-2.5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded">
            Compare every plan <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>

        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {plans.map((plan, i) => {
            const dark = plan.name === 'Enterprise';
            const first = i === 0;
            const shown = plan.limits.filter(([k]) => ['Users', 'Active job descriptions', 'Candidates'].includes(k));
            return (
              <motion.li
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
                className={`${first ? 'beam' : ''} group relative flex flex-col rounded-[28px] border p-6 transition-all duration-300 hover:-translate-y-1.5 ${
                  dark
                    ? 'border-transparent bg-panel text-white shadow-[0_30px_60px_-34px_rgba(27,22,80,0.8)]'
                    : 'border-[#E7E3F6] bg-white hover:border-[#C4B5FD] hover:shadow-[0_28px_56px_-34px_rgba(109,40,217,0.55)]'
                }`}
              >
                {first && <span className="absolute -top-3 left-6 rounded-full bg-[#6D28D9] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Start here</span>}
                <p className="font-display font-extrabold text-[1.3rem]">{plan.name}</p>
                <p className={`mt-1 text-[13.5px] leading-snug min-h-[40px] ${dark ? 'text-white/70' : 'text-[#514D7A]'}`}>{plan.bestFor}</p>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-display font-extrabold text-[2.3rem] leading-none tracking-[-0.03em]">{plan.price}</span>
                  {plan.period && <span className={`text-[14px] ${dark ? 'text-white/60' : 'text-[#514D7A]'}`}>{plan.period}</span>}
                </p>
                <ul className={`mt-5 space-y-2 border-t pt-4 ${dark ? 'border-white/15' : 'border-[#F0EDFA]'}`}>
                  {shown.map(([k, v]) => (
                    <li key={k} className="flex items-center gap-2 text-[14px]">
                      <Check className={`w-4 h-4 shrink-0 ${dark ? 'text-[#C4B5FD]' : 'text-[#6D28D9]'}`} strokeWidth={3} aria-hidden="true" />
                      <span className={dark ? 'text-white/70' : 'text-[#514D7A]'}>{k}</span>
                      <span className="ml-auto font-semibold">{v}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.cta.to}
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-bold transition-all hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2 ${
                    dark ? 'bg-white text-white' : 'bg-[#6D28D9] text-white shadow-[0_12px_26px_-12px_rgba(109,40,217,0.7)]'
                  }`}
                >
                  {plan.cta.label}
                </Link>
              </motion.li>
            );
          })}
        </ul>
        <p className="mt-5 text-center text-[13px] text-[#514D7A]">Prices exclude GST. Messages and calls are paid from a prepaid credit wallet at the published rates.</p>
      </div>
    </section>
  );
}
