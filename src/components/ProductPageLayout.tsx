import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { DEMO_PATH } from '../lib/routes';
import { useSeo } from '../lib/useSeo';
import { absoluteUrl } from '../lib/site';
import { Prose } from './Prose';
import type { Block } from '../lib/content';

/**
 * Long-form prose introducing the module, rendered directly under the hero.
 *
 * The card-and-marquee sections below it are all one-line copy by design, which
 * capped every page driven by this layout at roughly 400 words — thinner than
 * any blog post or case study on the site, on the pages that carry the most
 * commercial intent. This section is where a page states, in full sentences,
 * what the module is and who it is for.
 */
export interface ProductOverview {
  eyebrow?: string;
  title: string;
  blocks: Block[];
  /** Supporting facts pulled out beside the prose. */
  highlights?: { label: string; value: string }[];
}

/** Capability explanations — a heading and a few paragraphs each. */
export interface ProductDeepDive {
  title: string;
  desc: string;
  items: { title: string; blocks: Block[] }[];
}

/** Buyer-segment scenarios: who has the problem, and what changes for them. */
export interface ProductUseCases {
  title: string;
  desc: string;
  items: { persona: string; situation: string; outcome: string }[];
}

export interface ProductPageProps {
  hero: {
    imageSrc?: string;
    videoSrc?: string;
  };
  title: string;
  /**
   * Keyword-bearing title for the <title> tag only; the on-page h1 keeps
   * `title`. Search results truncate around 60 characters including the
   * " | PyHire" suffix, and short module names waste that budget.
   */
  seoTitle?: string;
  description: string;
  features: { title: string; desc: string; icon: React.ReactNode }[];
  workflowTitle: string;
  workflowDesc: string;
  workflowSteps: { id: string; title: string; desc: string; icon: React.ReactNode }[];
  benefitsTitle: string;
  benefitsDesc: string;
  benefitsImage: string;
  benefits: { title: string; desc: string; icon: React.ReactNode }[];
  faqsTitle: string;
  faqsDesc: string;
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaDesc: string;
  ctaImage: string;
  customHero?: React.ReactNode;
  /**
   * Workflow timeline styling. `wave` (default) is the bezier-curve treatment
   * shared with the Candidate Management page; `rail` is the older straight
   * centre line, kept as an opt-out.
   */
  workflowVariant?: "rail" | "wave";
  /* All four optional, so a page can adopt them one at a time. */
  overview?: ProductOverview;
  deepDive?: ProductDeepDive;
  useCases?: ProductUseCases;
}

export function ProductPageLayout({
  customHero,
  hero,
  title,
  seoTitle,
  description,
  features,
  workflowTitle,
  workflowDesc,
  workflowSteps,
  benefitsTitle,
  benefitsDesc,
  benefitsImage,
  benefits,
  faqsTitle,
  faqsDesc,
  faqs,
  ctaTitle,
  ctaDesc,
  ctaImage,
  overview,
  deepDive,
  useCases,
  workflowVariant = "wave"
}: ProductPageProps) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /*
   * Metadata for all seven pages driven by this layout.
   *
   * Each of them previously shipped the generic shell title and description
   * from index.html, so seven of the site's most commercially important pages
   * were duplicates of each other in search results. The props already carry a
   * page-specific title and description, and `faqs` is a ready-made FAQPage —
   * setting it here rather than in each page keeps them from drifting apart.
   */
  const { pathname } = useLocation();
  useSeo({
    title: `${seoTitle ?? title} | PyHire`,
    description,
    canonicalPath: pathname,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: title, item: absoluteUrl(pathname) },
        ],
      },
      /*
       * Per-module SoftwareApplication. The sitewide graph describes PyHire as a
       * whole; this one names the individual module and enumerates its
       * capabilities in machine-readable form, which is what an answer engine
       * quotes when asked what a specific module does.
       */
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': `${absoluteUrl(pathname)}#module`,
        name: `PyHire ${title}`,
        url: absoluteUrl(pathname),
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Recruitment Software',
        operatingSystem: 'Web browser',
        description,
        isPartOf: { '@id': `${absoluteUrl('/')}#software` },
        publisher: { '@id': `${absoluteUrl('/')}#organization` },
        featureList: features.map((f) => `${f.title}: ${f.desc}`),
      },
      ...(faqs.length >= 2
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              '@id': `${absoluteUrl(pathname)}#faq`,
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
              })),
            },
          ]
        : []),
    ],
  });

  /*
   * Wave geometry, derived rather than hardcoded.
   *
   * The original wavy timeline pins nine steps to a 5800px canvas, an 18-column
   * grid and a hand-plotted bezier path — four constants that must agree. Here
   * they are all computed from the step count, so the same treatment works for
   * a six-step workflow without replotting anything by hand.
   */
  const COLUMN = 322;                          // px per step; card is 300px
  const waveCols = workflowSteps.length * 2;   // array is doubled for the loop
  const waveWidth = waveCols * COLUMN;
  const wavePath =
    `M 0 100 Q ${COLUMN / 2} 160, ${COLUMN} 100 ` +
    Array.from({ length: waveCols - 1 }, (_, i) => `T ${COLUMN * (i + 2)} 100`).join(" ");
  /* Hold the scroll speed constant in px/sec whatever the width works out to. */
  const waveDuration = Math.round((waveWidth / 5800) * 40);

  const [openIdx, setOpenIdx] = useState(0);
  /* Ties each question button to its answer region for assistive tech. */
  const faqIdBase = `faq-${pathname.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'page'}`;

  return (
    <main className="pt-12 bg-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      {customHero ? customHero : (
      <section className="relative w-full bg-[#fdfdfd] pt-10 pb-8 flex justify-center">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 w-full flex flex-col items-center">
          
          <div className="text-center max-w-[800px] mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[3.5rem] lg:text-[4.5rem] font-bold text-[#111111] leading-[1.1] tracking-tight mb-6"
            >
              {title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[1.125rem] text-[#4B5563] mb-8 leading-relaxed max-w-2xl mx-auto"
            >
              {description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link to={DEMO_PATH} className="px-8 py-4 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full font-bold text-[16px] transition-all shadow-[0_8px_20px_rgb(249,115,22,0.2)] hover:shadow-[0_12px_25px_rgb(249,115,22,0.3)] hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 mx-auto outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2">
                Request Demo <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <div className="relative w-full rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-[#f2f2f2] bg-white">
            {hero.videoSrc ? (
               <video 
                 className="w-full h-auto object-contain" 
                 autoPlay 
                 loop 
                 muted 
                 playsInline
               >
                 <source src={hero.videoSrc} type="video/mp4" />
               </video>
            ) : (
              <img 
                src={hero.imageSrc} 
                className="w-full h-auto object-cover"
                alt={title}
              />
            )}
          </div>
          
        </div>
      </section>
      )}

      {/* Overview — long-form introduction to the module */}
      {overview && (
        <section className="py-10 lg:py-16 bg-white border-t border-[#F2F2F2]">
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              <div className="w-full lg:w-[62%]">
                {overview.eyebrow && (
                  <span className="text-[#f97316] font-bold text-[13px] uppercase tracking-wider mb-3 block">
                    {overview.eyebrow}
                  </span>
                )}
                <h2 className="text-[2rem] lg:text-[2.75rem] font-bold text-[#111111] leading-[1.15] tracking-tight mb-6">
                  {overview.title}
                </h2>
                <Prose blocks={overview.blocks} />
              </div>

              {overview.highlights && overview.highlights.length > 0 && (
                <aside className="w-full lg:w-[38%]">
                  <div className="lg:sticky lg:top-28 bg-[#FFFCF4] rounded-[28px] p-7 lg:p-8 border border-orange-50">
                    <h3 className="text-[15px] font-bold text-[#111111] uppercase tracking-wider mb-6">
                      At a glance
                    </h3>
                    <dl className="flex flex-col gap-5">
                      {overview.highlights.map((item, idx) => (
                        <div key={idx} className="border-b border-orange-100/70 last:border-0 pb-5 last:pb-0">
                          <dt className="text-[13px] font-bold text-[#f97316] uppercase tracking-wide mb-1.5">
                            {item.label}
                          </dt>
                          <dd className="text-[15px] text-[#4B5563] leading-relaxed">{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Features Carousel Section */}
      <section className="py-4 lg:py-8 bg-[#FFFCF4] overflow-hidden relative">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 mb-8">
          <div className="text-center">
            <h2 className="text-[2.5rem] font-bold text-[#111111] mb-4">Powerful Features</h2>
            <p className="text-[1.125rem] text-[#4B5563]">Everything you need to succeed with {title}</p>
          </div>
        </div>

        <div className="relative w-full max-w-[100vw] overflow-hidden flex group">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FFFCF4] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FFFCF4] to-transparent z-10 pointer-events-none"></div>

          <div className="flex gap-6 animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] px-4">
            {[...features, ...features, ...features].map((feature, idx) => (
              <div 
                key={idx} 
                className="w-[350px] shrink-0 bg-white p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f2f2f2] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(249,115,22,0.08)] transition-all duration-300 group/card"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover/card:scale-110 transition-transform duration-300 text-[#f97316]">
                  {feature.icon}
                </div>
                <h3 className="text-[1.25rem] font-bold text-[#111111] mb-3">{feature.title}</h3>
                <p className="text-[15px] text-[#4B5563] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-33.33%); }
          }
        `}</style>
      </section>

      {/* Deep dive — the capability cards above, explained properly */}
      {deepDive && (
        <section className="py-10 lg:py-16 bg-white">
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-3xl mb-10 lg:mb-14">
              <h2 className="text-[2rem] lg:text-[2.75rem] font-bold text-[#111111] leading-[1.15] tracking-tight mb-5">
                {deepDive.title}
              </h2>
              <p className="text-[1.125rem] text-[#4B5563] leading-relaxed">{deepDive.desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10">
              {deepDive.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: Math.min(idx, 1) * 0.08 }}
                  className="border-t-2 border-[#f97316] pt-6"
                >
                  <h3 className="text-[1.3125rem] lg:text-[1.5rem] font-bold text-[#111111] leading-snug tracking-tight mb-4">
                    {item.title}
                  </h3>
                  <Prose blocks={item.blocks} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Workflow Section */}
      <section className="py-4 lg:py-8 bg-[#fdfdfd] overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-8">
            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold text-[#111111] mb-6 tracking-tight">
              {workflowTitle}
            </h2>
            <p className="text-[1.125rem] text-[#4B5563] max-w-2xl mx-auto">
              {workflowDesc}
            </p>
          </div>

          {/* Wave timeline — opt-in via workflowVariant="wave" */}
          {workflowVariant === "wave" && (
          <div className="hidden xl:block relative w-full overflow-hidden pb-12 pt-16">
            <style>{`
              @keyframes marqueeWave {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
            <div
              className="relative px-0 h-[460px] animate-[marqueeWave_40s_linear_infinite] hover:[animation-play-state:paused]"
              style={{ width: `${waveWidth}px`, animationDuration: `${waveDuration}s` }}
            >
              {/* The curve itself */}
              <div className="absolute top-1/2 left-0 w-full h-[200px] -translate-y-1/2 z-0 pointer-events-none">
                <svg width="100%" height="100%" preserveAspectRatio="none" viewBox={`0 0 ${waveWidth} 200`} fill="none" aria-hidden="true">
                  <path d={wavePath} fill="none" stroke="url(#wave-grad)" strokeWidth="4" />
                  <defs>
                    <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                      <stop offset="10%" stopColor="#f97316" stopOpacity="1" />
                      <stop offset="90%" stopColor="#f97316" stopOpacity="1" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="grid gap-0 w-full h-full relative z-10" style={{ gridTemplateColumns: `repeat(${waveCols}, 1fr)` }}>
                {[...workflowSteps, ...workflowSteps].map((step, idx) => {
                  const isTop = idx % 2 === 0;
                  return (
                    <div key={idx} className="relative flex justify-center w-full h-full">
                      <div className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#f97316] ring-[6px] ring-white shadow-[0_0_15px_rgba(249,115,22,0.5)] z-20 flex items-center justify-center ${isTop ? "top-[calc(50%+60px)]" : "top-[calc(50%-60px)]"} -translate-y-1/2`}>
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>

                      <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-[75px] border-l-[2.5px] border-dashed border-orange-200 z-10 ${isTop ? "bottom-[calc(50%-60px)]" : "top-[calc(50%-60px)]"}`}></div>

                      <div className={`absolute left-1/2 -translate-x-1/2 w-[300px] bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-orange-50 z-30 ${isTop ? "bottom-[calc(50%+25px)]" : "top-[calc(50%+25px)]"} hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] transition-all hover:-translate-y-1`}>
                        {/*
                          Steps arrive with their icon pre-coloured `text-[#f97316]`
                          for the rail, which would vanish on this orange disc.
                          Force it white here rather than re-authoring every page.
                        */}
                        <span className="absolute -top-5 right-6 w-12 h-12 rounded-full bg-[#f97316] flex items-center justify-center shadow-[0_4px_15px_rgba(249,115,22,0.4)] border-4 border-white [&_svg]:!text-white [&_svg]:w-5 [&_svg]:h-5">
                          {step.icon}
                        </span>
                        <span className="text-[#f97316] font-bold text-[20px] leading-none mb-2 block">{step.id}</span>
                        <h4 className="font-bold text-[#111111] text-[16px] leading-tight mb-2 pr-12">{step.title}</h4>
                        <p className="text-[13px] text-[#4B5563] leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          )}

          {workflowVariant === "rail" && (
          <div className="hidden lg:block relative w-full overflow-hidden pb-8 pt-12">
            <style>{`
              @keyframes marqueeWorkflow {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
            <div className="w-max flex relative h-[450px] animate-[marqueeWorkflow_40s_linear_infinite] hover:[animation-play-state:paused]">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#111111] -translate-y-1/2 z-0"></div>
              
              <div className="flex items-center h-full relative z-10 w-max gap-[150px] pr-[75px] pl-[75px]">
                {[...workflowSteps, ...workflowSteps].map((step, idx) => {
                  const isTop = idx % 2 === 0;
                  return (
                    <div 
                      key={idx} 
                      className={`relative flex flex-col items-center justify-center w-[220px] shrink-0 ${isTop ? 'mb-[220px]' : 'mt-[220px]'}`}
                    >
                      <div className={`absolute left-1/2 -translate-x-1/2 w-[1px] h-[60px] border-l border-dashed border-[#111111] ${isTop ? '-bottom-[60px]' : '-top-[60px]'}`}></div>
                      <div className={`absolute left-1/2 -translate-x-1/2 ${isTop ? '-bottom-[68px]' : '-top-[68px]'} w-4 h-4 rounded-full bg-[#111111] ring-[6px] ring-white shadow-sm z-10`}></div>
                      <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#f2f2f2] w-[220px] flex flex-col gap-4 relative z-20 hover:shadow-[0_8px_30px_rgb(249,115,22,0.12)] transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-inner">
                            {step.icon}
                          </div>
                          <div className="flex flex-col pt-1">
                            <span className="text-[#f97316] font-extrabold text-[18px] leading-none mb-1">{step.id}</span>
                            <h4 className="font-bold text-[#111111] text-[13px] leading-snug">{step.title}</h4>
                          </div>
                        </div>
                        <p className="text-[12px] text-[#6b7280] leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          )}

          {/* Stacked fallback — below lg for the rail, below xl for the wave. */}
          <div className={`${workflowVariant === "wave" ? "xl:hidden" : "lg:hidden"} space-y-4 max-w-xl mx-auto`}>
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-white border border-[#F2F2F2] p-5 rounded-2xl shadow-sm relative">
                <div className="absolute left-6 top-full w-[1px] h-4 border-l border-dashed border-slate-200"></div>
                <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
                   {step.icon}
                </div>
                <div>
                   <div className="flex items-center gap-2 mb-1">
                     <span className="text-[#f97316] font-bold text-sm">{step.id}</span>
                     <span className="font-bold text-[#111111] text-[15px]">{step.title}</span>
                   </div>
                   <div className="text-[#4B5563] text-[13px] leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases — who this is for, stated as scenarios */}
      {useCases && (
        <section className="py-10 lg:py-16 bg-[#FFFCF4] border-y border-orange-50">
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-3xl mb-10 lg:mb-12">
              <h2 className="text-[2rem] lg:text-[2.75rem] font-bold text-[#111111] leading-[1.15] tracking-tight mb-5">
                {useCases.title}
              </h2>
              <p className="text-[1.125rem] text-[#4B5563] leading-relaxed">{useCases.desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {useCases.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: Math.min(idx, 3) * 0.06 }}
                  className="bg-white rounded-[24px] p-7 border border-[#F2F2F2] flex flex-col h-full"
                >
                  <h3 className="text-[1.0625rem] font-bold text-[#111111] leading-snug mb-4 pb-4 border-b border-slate-100">
                    {item.persona}
                  </h3>
                  <p className="text-[15px] text-[#4B5563] leading-relaxed mb-5">{item.situation}</p>
                  <p className="text-[15px] text-[#111111] leading-relaxed mt-auto">
                    <span className="block text-[12px] font-bold text-[#f97316] uppercase tracking-wider mb-1.5">
                      With PyHire
                    </span>
                    {item.outcome}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-4 lg:py-8 bg-white overflow-hidden border-t border-[#F2F2F2]">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 items-center">
            
            <div className="w-full lg:w-1/2">
              <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold text-[#111111] leading-[1.1] tracking-tight mb-6">
                {benefitsTitle}
              </h2>
              <p className="text-[1.125rem] text-[#4B5563] mb-8 leading-relaxed">
                {benefitsDesc}
              </p>
              
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-white border-8 border-white">
                <img 
                  src={benefitsImage} 
                  alt={`${benefitsTitle} — PyHire ${title}`} 
                  className="w-full h-auto object-cover rounded-[24px]"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative h-[600px] overflow-hidden group rounded-[32px]">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex flex-col gap-6 animate-[marqueeVertical_30s_linear_infinite] group-hover:[animation-play-state:paused] pt-12 pb-12">
                {[...benefits, ...benefits].map((benefit, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white p-8 rounded-[24px] border border-[#F2F2F2] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(249,115,22,0.08)] hover:border-orange-200"
                  >
                    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-5 text-[#f97316]">
                      {benefit.icon}
                    </div>
                    <h3 className="text-[1.25rem] font-bold text-[#111111] mb-3">{benefit.title}</h3>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes marqueeVertical {
            0% { transform: translateY(0%); }
            100% { transform: translateY(-50%); }
          }
        `}</style>
      </section>

      {/* FAQ Section */}
      <section className="py-4 lg:py-8 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-[2.5rem] font-bold text-[#111111] mb-4">{faqsTitle}</h2>
            <p className="text-[1.125rem] text-[#4B5563]">{faqsDesc}</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className={`border border-[#F2F2F2] rounded-[20px] overflow-hidden transition-all duration-300 ${openIdx === idx ? 'bg-[#FFFCF4] shadow-sm' : 'bg-white hover:border-orange-100'}`}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                  aria-expanded={openIdx === idx}
                  aria-controls={`${faqIdBase}-answer-${idx}`}
                  id={`${faqIdBase}-question-${idx}`}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-inset rounded-[20px]"
                >
                  <span className="font-bold text-[16px] text-[#111111]">{faq.q}</span>
                  <span aria-hidden="true" className="text-[#f97316] text-2xl font-light shrink-0">{openIdx === idx ? '−' : '+'}</span>
                </button>
                {/*
                  A 0fr→1fr grid row rather than an animated max-height.

                  The previous fixed 200px cap silently truncated anything
                  taller, with no visual cue that text was missing. Now that
                  these answers run to full paragraphs the tallest measures
                  195px at a 390px viewport — 5px of headroom, and the cap
                  would bite on the next answer anyone lengthens or on a
                  narrower device. This animates to the content's own height,
                  so the failure mode is gone rather than deferred.
                */}
                <div
                  id={`${faqIdBase}-answer-${idx}`}
                  role="region"
                  aria-labelledby={`${faqIdBase}-question-${idx}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openIdx === idx ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-[#4B5563] text-[15px] leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-4 lg:py-8 bg-white">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#FFFCF4] rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-6 border border-orange-50 relative overflow-hidden"
          >
            <div className="w-full lg:w-1/2 relative h-[400px] flex items-center justify-center">
              <img 
                src={ctaImage} 
                className="w-[80%] h-[80%] object-cover rounded-full border-8 border-white shadow-xl relative z-10"
                alt={`A recruitment team using PyHire ${title}`}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full opacity-50 blur-3xl pointer-events-none"></div>
            </div>
            
            <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
              <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold text-[#111111] leading-[1.1] tracking-tight mb-6">
                {ctaTitle}
              </h2>
              <p className="text-[1.125rem] text-[#4B5563] leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                {ctaDesc}
              </p>
              <Link to={DEMO_PATH} className="px-10 py-4 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full font-bold text-[17px] transition-all shadow-[0_8px_20px_rgb(249,115,22,0.3)] hover:shadow-[0_12px_25px_rgb(249,115,22,0.4)] hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2">
                Book a Demo Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
