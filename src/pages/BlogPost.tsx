import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Linkedin,
  Link2,
  List,
  Tag as TagIcon,
  Twitter,
} from 'lucide-react';
import {
  blogPosts,
  getHeadings,
  getPostBySlug,
  getRelatedPosts,
  plainText,
  postText,
  readingMinutes,
  slugifyHeading,
  type Block,
} from '../data/blogPosts';
import { metaDescription } from '../lib/content';
import { absoluteUrl, defaultAuthor, publisher } from '../lib/site';
import {
  ArticleCard,
  BackToTop,
  NewsletterWidget,
  PopularArticleItem,
  RichText,
  SidebarWidget,
  TagPill,
} from '../components/blog/BlogPrimitives';
import { useSeo } from '../lib/useSeo';

/* ------------------------------------------------------------------ */
/* Reading progress                                                    */
/* ------------------------------------------------------------------ */

function ReadingProgress({ target }: { target: React.RefObject<HTMLElement | null> }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = target.current;
      if (!el) return;
      const start = el.offsetTop;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(window.scrollY > start ? 100 : 0);
        return;
      }
      const scrolled = ((window.scrollY - start) / total) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [target]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-transparent"
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-[#f97316] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Share buttons                                                       */
/* ------------------------------------------------------------------ */

function ShareButtons({ title, orientation = 'vertical' }: { title: string; orientation?: 'vertical' | 'horizontal' }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const base =
    'w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#f97316] hover:border-[#f97316] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#f97316]';

  return (
    <div className={orientation === 'vertical' ? 'flex flex-col gap-3 items-center' : 'flex gap-3 items-center'}>
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Share</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={base}
      >
        <Linkedin className="w-4 h-4" aria-hidden="true" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={base}
      >
        <Twitter className="w-4 h-4" aria-hidden="true" />
      </a>
      <button type="button" onClick={copy} aria-label="Copy link to this article" className={base}>
        {copied ? <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" /> : <Link2 className="w-4 h-4" aria-hidden="true" />}
      </button>
      <span role="status" aria-live="polite" className="sr-only">{copied ? 'Link copied' : ''}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Article body renderer                                               */
/* ------------------------------------------------------------------ */

function ArticleBody({ body }: { body: Block[] }) {
  return (
    <div className="max-w-none">
      {body.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2
              key={i}
              id={slugifyHeading(block.text)}
              className="scroll-mt-28 text-[1.65rem] lg:text-[1.875rem] font-bold text-[#111111] leading-snug tracking-tight mt-12 mb-5 first:mt-0"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul key={i} className="my-6 space-y-4">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3.5 text-[1.0625rem] text-[#4B5563] leading-[1.75]">
                  <span className="mt-[0.65em] w-1.5 h-1.5 rounded-full bg-[#f97316] shrink-0" aria-hidden="true" />
                  <span><RichText text={item} /></span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={i} className="my-6 space-y-4">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-4 text-[1.0625rem] text-[#4B5563] leading-[1.75]">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-orange-50 border border-orange-100 text-[#f97316] text-[13px] font-bold flex items-center justify-center mt-1">
                    {j + 1}
                  </span>
                  <span><RichText text={item} /></span>
                </li>
              ))}
            </ol>
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

/* ------------------------------------------------------------------ */
/* Table of contents                                                   */
/* ------------------------------------------------------------------ */

function TableOfContents({ headings, activeId }: { headings: { id: string; text: string }[]; activeId: string }) {
  if (headings.length < 2) return null;
  return (
    <nav aria-label="Table of contents" className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
      <div className="bg-[#f97316] py-5 px-6 flex items-center gap-2">
        <List className="w-4 h-4 text-white" aria-hidden="true" />
        <h2 className="text-white font-bold text-[18px]">On this page</h2>
      </div>
      <ul className="p-3">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={activeId === h.id ? 'location' : undefined}
              className={`block px-4 py-3 text-[14px] leading-snug rounded-xl transition-colors border-l-2 outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] ${
                activeId === h.id
                  ? 'text-[#f97316] bg-orange-50 font-bold border-[#f97316]'
                  : 'text-slate-600 hover:text-[#f97316] hover:bg-orange-50 border-transparent'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function BlogPost() {
  const { slug = '' } = useParams();
  const post = getPostBySlug(slug);

  const articleRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState('');

  const headings = useMemo(() => (post ? getHeadings(post) : []), [post]);
  const related = useMemo(() => (post ? getRelatedPosts(post.slug) : []), [post]);
  const minutes = post ? readingMinutes(post) : 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useSeo({
    // seoTitle keeps the tag inside the ~60-char SERP cut-off; the H1 is unchanged.
    // Suffix shortened from " | PyHire Blog" — those five characters were being
    // spent on a word the title itself usually already implies.
    title: post ? `${post.seoTitle ?? post.title} | PyHire` : 'Article not found | PyHire',
    description: post ? metaDescription(post.excerpt) : 'The article you are looking for could not be found.',
    canonicalPath: post ? `/blog/${post.slug}` : '/blog',
    image: post?.image,
    type: 'article',
    jsonLd: post
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: metaDescription(post.excerpt),
            image: post.image,
            articleSection: post.category,
            keywords: post.tags.join(', '),
            // Was measuring the excerpt, not the article — off by roughly 20×.
            wordCount: postText(post).trim().split(/\s+/).length,
            timeRequired: `PT${minutes}M`,
            inLanguage: 'en',
            isAccessibleForFree: true,
            url: absoluteUrl(`/blog/${post.slug}`),
            mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/blog/${post.slug}`) },
            author: defaultAuthor(),
            publisher: publisher(),
            // Omitted entirely until real dates exist — see BlogPost.datePublished.
            ...(post.datePublished ? { datePublished: post.datePublished } : {}),
            ...(post.dateModified ?? post.datePublished
              ? { dateModified: post.dateModified ?? post.datePublished }
              : {}),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: absoluteUrl(`/blog/${post.slug}`),
              },
            ],
          },
        ]
      : [],
  });

  /* Scrollspy for the table of contents. */
  useEffect(() => {
    if (headings.length < 2) return;
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-120px 0px -65% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (!post) {
    return (
      <main className="pt-32 pb-24 bg-white min-h-screen font-sans">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 text-center">
          <div className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-[12px] sm:text-[11px] font-bold rounded-md mb-8 tracking-wider uppercase border border-orange-100">
            BLOG
          </div>
          <h1 className="text-[2.5rem] lg:text-[3rem] font-bold text-[#111111] leading-[1.1] mb-6 tracking-tight">
            We couldn’t find that article
          </h1>
          <p className="text-[1.125rem] text-[#4B5563] leading-relaxed max-w-md mx-auto mb-8">
            The link may be out of date. Browse all articles to find what you were looking for.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full font-bold text-[15px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to the blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-12 bg-white min-h-screen font-sans overflow-hidden">
      <ReadingProgress target={articleRef} />

      {/* 1. Hero banner */}
      <section className="relative">
        <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-[#FFF8E7] rounded-full -translate-y-1/3 translate-x-1/4 z-0" aria-hidden="true" />

        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-6 pb-10 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 flex-wrap">
              <li>
                <Link to="/" className="inline-block py-3 -my-3 hover:text-[#f97316] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] rounded">
                  Home
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5 text-slate-300" /></li>
              <li>
                <Link to="/blog" className="inline-block py-3 -my-3 hover:text-[#f97316] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] rounded">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5 text-slate-300" /></li>
              <li className="text-[#111111] line-clamp-1" aria-current="page">{post.title}</li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-[12px] sm:text-[11px] font-bold rounded-md mb-6 tracking-wider uppercase border border-orange-100">
              {post.category}
            </div>

            <h1 className="text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold text-[#111111] leading-[1.12] mb-6 tracking-tight">
              {post.title}
            </h1>

            <p className="text-[1.125rem] text-[#4B5563] leading-relaxed mb-7">{post.excerpt}</p>

            <div className="flex items-center gap-5 flex-wrap">
              <span className="flex items-center gap-2 text-[13px] font-bold text-slate-600">
                <Clock className="w-4 h-4 text-[#f97316]" aria-hidden="true" />
                {minutes} Min read
              </span>
              <span className="hidden sm:block w-[1px] h-5 bg-slate-200" aria-hidden="true" />
              <span className="flex items-center gap-2 flex-wrap">
                <TagIcon className="w-4 h-4 text-slate-400" aria-hidden="true" />
                {post.tags.map((t) => (
                  <span key={t} className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Featured image */}
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[24px] overflow-hidden bg-slate-100 aspect-[16/7] shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
          >
            <img
              src={post.image}
              alt={post.imageAlt}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Article + sidebar */}
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">

          {/* Sticky share rail (desktop) */}
          <div className="hidden xl:block xl:col-span-1">
            <div className="sticky top-28">
              <ShareButtons title={post.title} />
            </div>
          </div>

          {/* Article */}
          <article ref={articleRef} className="lg:col-span-8 xl:col-span-7">
            {/* Share row (mobile / tablet) */}
            <div className="xl:hidden mb-8 pb-8 border-b border-slate-100">
              <ShareButtons title={post.title} orientation="horizontal" />
            </div>

            <ArticleBody body={post.body} />

            {/* Tag footer */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mr-1">Tagged</span>
              {post.tags.map((t) => (
                <TagPill key={t} name={t} />
              ))}
            </div>

            {/* Article CTA */}
            <div className="mt-10 bg-[#FFFCF4] border border-orange-100 rounded-[32px] p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-[1.5rem] font-bold text-[#111111] leading-snug mb-2">
                  See PyHire in action
                </h2>
                <p className="text-[15px] text-[#4B5563] leading-relaxed">
                  Book a walkthrough and see how one connected system replaces the spreadsheets, inboxes and manual follow-ups described above.
                </p>
              </div>
              <Link
                to="/contact-us"
                className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full font-bold text-[15px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgb(249,115,22,0.4)] hover:-translate-y-0.5"
              >
                Book a Demo <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[14px] font-bold text-slate-600 hover:text-[#f97316] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] rounded-full px-2 py-2.5"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to all articles
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8" aria-label="Article sidebar">
            <div className="lg:sticky lg:top-28 space-y-8">
              <TableOfContents headings={headings} activeId={activeId} />

              <SidebarWidget title="Popular Articles" bodyClassName="p-6 flex flex-col gap-6">
                {blogPosts.filter((p) => p.slug !== post.slug).slice(0, 5).map((p) => (
                  <PopularArticleItem key={p.slug} post={p} />
                ))}
              </SidebarWidget>

              <NewsletterWidget />
            </div>
          </aside>
        </div>
      </section>

      {/* 3. Related articles */}
      {related.length > 0 && (
        <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pb-20">
          <div className="border-t border-slate-100 pt-14">
            <h2 className="text-[1.75rem] lg:text-[2rem] font-bold text-[#111111] tracking-tight mb-2">
              Related articles
            </h2>
            <p className="text-[1.0625rem] text-[#4B5563] mb-10">
              More on smarter hiring from the PyHire team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              {related.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <ArticleCard post={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <BackToTop />
    </main>
  );
}
