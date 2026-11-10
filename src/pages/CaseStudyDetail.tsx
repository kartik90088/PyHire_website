import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ChevronRight, Layers } from 'lucide-react';
import {
  caseStudies,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
} from '../data/caseStudies';
import {
  blocksToText,
  extractFaq,
  extractHeadings,
  extractTakeaways,
  plainText,
  slugifyHeading,
  metaDescription,
  type Block,
} from '../lib/content';
import { absoluteUrl, defaultAuthor, publisher } from '../lib/site';
import { KeyTakeaways, TableOfContents } from '../components/CaseStudyNav';
import { RichText } from '../components/RichText';
import { BackToTop } from '../components/blog/BlogPrimitives';
import { CaseStudyCard } from './CaseStudiesList';
import { DEMO_PATH } from '../lib/routes';
import { useSeo } from '../lib/useSeo';

/**
 * Renders the case study body exactly as authored. Most source documents share
 * a four-part structure — The starting point (the challenge), What moved onto
 * PyHire (the solution), What that changes, directionally (results and
 * benefits) and The underlying lesson (the conclusion) — but headings carry
 * through verbatim rather than being remapped onto invented section names, so
 * documents with their own structure render as written.
 */
function CaseStudyBody({ body }: { body: Block[] }) {
  return (
    <div className="max-w-none">
      {body.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2
              key={i}
              id={slugifyHeading(block.text)}
              className="scroll-mt-28 text-[1.5rem] lg:text-[1.75rem] font-bold text-[#111111] leading-snug tracking-tight mt-12 mb-5 first:mt-0"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === 'h3') {
          return (
            <h3
              key={i}
              id={slugifyHeading(block.text)}
              className="scroll-mt-28 text-[1.1875rem] lg:text-[1.3125rem] font-bold text-[#111111] leading-snug tracking-tight mt-9 mb-3"
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={i}
              className="my-8 border-l-4 border-[#6D28D9] bg-[#F5F9FF] rounded-r-[16px] pl-6 pr-6 py-5 text-[1.125rem] text-[#111111] italic leading-relaxed"
            >
              <RichText text={block.text} />
            </blockquote>
          );
        }

        if (block.type === 'ul' || block.type === 'ol') {
          const Tag = block.type === 'ul' ? 'ul' : 'ol';
          return (
            <Tag key={i} className="my-6 space-y-4">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3.5 text-[1.0625rem] text-[#4B5563] leading-[1.75]">
                  {block.type === 'ul' ? (
                    <span
                      className="mt-[0.65em] w-1.5 h-1.5 rounded-full bg-[#6D28D9] shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="shrink-0 w-7 h-7 rounded-full bg-violet-50 border border-violet-100 text-[#6D28D9] text-[13px] font-bold flex items-center justify-center mt-1">
                      {j + 1}
                    </span>
                  )}
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </Tag>
          );
        }

        return (
          <p key={i} className="text-[1.0625rem] text-[#4B5563] leading-[1.85] mb-6">
            <RichText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}

export function CaseStudyDetail() {
  const { slug = '' } = useParams();
  const study = getCaseStudyBySlug(slug);

  const related = useMemo(() => (study ? getRelatedCaseStudies(study.slug, 2) : []), [study]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  /* The deck line is written for search; fall back to the card blurb without one. */
  const metaDesc = study ? metaDescription(study.subtitle ?? study.excerpt) : '';

  /* All three are lifted from the body rather than authored separately, so they
     cannot drift from the document they summarise. */
  const faqs = useMemo(() => (study ? extractFaq(study.body) : []), [study]);
  const headings = useMemo(() => (study ? extractHeadings(study.body) : []), [study]);
  const takeaways = useMemo(() => (study ? extractTakeaways(study.body) : []), [study]);

  useSeo({
    // seoTitle keeps the tag inside the ~60-char SERP cut-off; the H1 is unchanged.
    title: study ? `${study.seoTitle ?? study.title} | PyHire` : 'Case study not found | PyHire',
    description: study ? metaDesc : 'The case study you are looking for could not be found.',
    canonicalPath: study ? `/case-studies/${study.slug}` : '/case-studies',
    image: study?.image,
    type: 'article',
    jsonLd: study
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: study.title,
            description: metaDesc,
            image: study.image,
            articleSection: study.segment,
            wordCount: blocksToText(study.body).trim().split(/\s+/).length,
            inLanguage: 'en',
            isAccessibleForFree: true,
            url: absoluteUrl(`/case-studies/${study.slug}`),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': absoluteUrl(`/case-studies/${study.slug}`),
            },
            author: defaultAuthor(),
            publisher: publisher(),
            /* Names the deck line and the takeaways list as the passages worth
               reading aloud. Google currently limits speakable results to news
               publishers, so treat this as forward-looking rather than active. */
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['[data-speakable="deck"]', '[data-speakable="takeaways"]'],
            },
            // Omitted entirely until real dates exist — see CaseStudy.datePublished.
            ...(study.datePublished ? { datePublished: study.datePublished } : {}),
            ...(study.dateModified ?? study.datePublished
              ? { dateModified: study.dateModified ?? study.datePublished }
              : {}),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Case Studies',
                item: absoluteUrl('/case-studies'),
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: study.title,
                item: absoluteUrl(`/case-studies/${study.slug}`),
              },
            ],
          },
          ...(faqs.length >= 2
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  '@id': `${absoluteUrl(`/case-studies/${study.slug}`)}#faq`,
                  mainEntity: faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
                  })),
                },
              ]
            : []),
        ]
      : [],
  });

  if (!study) {
    return (
      <main className="pt-28 pb-14 bg-white min-h-screen font-sans">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <div className="inline-block px-3 py-1 bg-violet-50 text-violet-600 text-[12px] sm:text-[11px] font-bold rounded-md mb-8 tracking-wider uppercase border border-violet-100">
            CASE STUDIES
          </div>
          <h1 className="text-[2.5rem] lg:text-[3rem] font-bold text-[#111111] leading-[1.1] mb-6 tracking-tight">
            We couldn’t find that case study
          </h1>
          <p className="text-[1.125rem] text-[#4B5563] leading-relaxed max-w-md mx-auto mb-8">
            The link may be out of date. Browse all {caseStudies.length} case studies to find what
            you were looking for.
          </p>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full font-bold text-[15px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to case studies
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-12 bg-white min-h-screen font-sans overflow-hidden">
      {/* 1. Hero banner */}
      <section className="relative bg-[#F5F9FF]">
        <div
          className="absolute top-0 right-0 w-[520px] h-[520px] bg-violet-100/40 rounded-full -translate-y-1/3 translate-x-1/4 z-0 hidden lg:block"
          aria-hidden="true"
        />

        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-12 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 flex-wrap">
              <li>
                <Link to="/" className="inline-block py-3 -my-3 hover:text-[#6D28D9] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded">
                  Home
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5 text-slate-300" /></li>
              <li>
                <Link to="/case-studies" className="inline-block py-3 -my-3 hover:text-[#6D28D9] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded">
                  Case Studies
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5 text-slate-300" /></li>
              <li className="text-[#111111] line-clamp-1" aria-current="page">{study.title}</li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[920px]"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 text-violet-600 text-[12px] sm:text-[11px] font-bold rounded-md mb-6 tracking-wider uppercase border border-violet-100">
              <Layers className="w-3.5 h-3.5" aria-hidden="true" />
              {study.segment}
            </div>

            <h1 className="text-[1.875rem] sm:text-[2.375rem] lg:text-[2.875rem] font-bold text-[#111111] leading-[1.15] mb-5 tracking-tight">
              {study.title}
            </h1>

            {/* Deck line — carries the search context the plain H1 deliberately doesn't. */}
            {study.subtitle && (
              <p
                data-speakable="deck"
                className="text-[1.0625rem] sm:text-[1.1875rem] text-[#4B5563] leading-relaxed mb-6"
              >
                {study.subtitle}
              </p>
            )}

            {/* Verbatim scope note from the source document. */}
            <p className="text-[15px] text-slate-500 italic leading-relaxed border-l-2 border-violet-200 pl-4">
              {study.disclaimer}
            </p>

            <KeyTakeaways items={takeaways} />
          </motion.div>
        </div>

        {/* Featured image */}
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[24px] overflow-hidden bg-slate-100 aspect-[16/7] shadow-[0_18px_45px_-25px_rgba(0,0,0,0.3)]"
          >
            <img
              src={study.image}
              alt={study.imageAlt}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Body + contents rail */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-16">
        {/* The article keeps the same measure and left edge as the hero copy, so
            it, the H1 and the featured image line up. The contents rail occupies
            the column to its right, which was otherwise empty on wide screens. */}
        <div className="flex gap-12">
          <article className="max-w-[920px] min-w-0 flex-1">
          <CaseStudyBody body={study.body} />

          {/* CTA */}
          <div className="mt-12 bg-[#F5F9FF] border border-violet-100 rounded-[32px] p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-[1.5rem] font-bold text-[#111111] leading-snug mb-2">
                See this working on your own hiring
              </h2>
              <p className="text-[15px] text-[#4B5563] leading-relaxed">
                Book a walkthrough and we’ll show you how PyHire handles the workflows described above.
              </p>
            </div>
            <Link
              to={DEMO_PATH}
              className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full font-bold text-[15px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgb(249,115,22,0.4)] hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2"
            >
              Book a Demo <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-[14px] font-bold text-slate-600 hover:text-[#6D28D9] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded-full px-2 py-2.5"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to all case studies
            </Link>
          </div>
          </article>

          {/* Hidden below xl, where there is no spare column and the takeaways
              block above already summarises the page. */}
          <div className="hidden xl:block w-[240px] shrink-0">
            <TableOfContents headings={headings} />
          </div>
        </div>
      </section>

      {/* 3. Related case studies */}
      {related.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pb-12">
          <div className="border-t border-slate-100 pt-14">
            <h2 className="text-[1.75rem] lg:text-[2rem] font-bold text-[#111111] tracking-tight mb-2">
              Related Case Studies
            </h2>
            <p className="text-[1.0625rem] text-[#4B5563] mb-10">
              More operational shifts PyHire is designed to produce.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8 items-stretch">
              {related.map((c, i) => (
                <CaseStudyCard key={c.slug} study={c} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <BackToTop />
    </main>
  );
}
