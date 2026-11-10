import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { caseStudies, caseStudyText, type CaseStudy } from '../data/caseStudies';

/** Warms the lazily-loaded detail chunk before the visitor clicks through. */
let prefetched = false;
const prefetchDetailRoute = () => {
  if (prefetched) return;
  prefetched = true;
  void import('./CaseStudyDetail');
};

const ctaClasses =
  'inline-flex items-center gap-3 px-7 py-3.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full font-bold text-[15px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgb(249,115,22,0.4)] hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2';

/**
 * Vertical card (image on top) so three sit side by side in the grid without the
 * copy column becoming cramped. Cards stretch to equal height and the CTA is
 * pinned to the bottom so buttons align across a row.
 */
export function CaseStudyCard({ study, index = 0 }: { study: CaseStudy; index?: number }) {
  const headingId = `case-study-${study.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: Math.min(index, 2) * 0.08 }}
      aria-labelledby={headingId}
      className="group h-full bg-[#F5F9FF] rounded-[28px] p-5 sm:p-6 flex flex-col transition-all duration-300 hover:shadow-[0_18px_45px_-25px_rgba(0,0,0,0.25)] hover:-translate-y-1"
    >
      {/* Visual */}
      <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-slate-100 mb-6 shrink-0">
        <img
          src={study.image}
          alt={study.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          loading={index < 3 ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[12px] sm:text-[11px] font-bold px-3 py-1.5 rounded-full">
          {study.segment}
        </span>
      </div>

      {/* Copy */}
      <div className="flex gap-4 sm:gap-5 flex-1 min-h-0">
        <span
          className="w-[3px] shrink-0 rounded-full bg-[#6D28D9] h-[40px]"
          aria-hidden="true"
        />
        <div className="min-w-0 flex flex-col flex-1">
          <h3
            id={headingId}
            className="text-[1.125rem] sm:text-[1.25rem] font-bold text-[#111111] leading-[1.4] tracking-tight mb-3"
          >
            {study.title}
          </h3>

          <p className="text-[14.5px] text-[#4B5563] leading-relaxed mb-6 line-clamp-3">
            {study.excerpt}
          </p>

          <div className="mt-auto">
            <Link to={`/case-studies/${study.slug}`} className={ctaClasses}>
              Read More
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function CaseStudiesList() {
  return (
    <section
      className="bg-white py-10 lg:py-14 scroll-mt-24"
      aria-label="Customer case studies"
      onPointerEnter={prefetchDetailRoute}
      onFocusCapture={prefetchDetailRoute}
    >
      {/* Container matches CaseStudiesHero so the grid lines up with the hero copy. */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Every case study on one page — three per row, two at md, one on mobile. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Exposed so the detail page's "Related Case Studies" reuses the same search index. */
export { caseStudyText };
