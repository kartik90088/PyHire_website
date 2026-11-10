import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Users, UserPlus, Target, X, Check } from 'lucide-react';
import {
  blogPosts,
  getCategories,
  getTags,
  plainText,
  postText,
  readingMinutes,
} from '../data/blogPosts';
import { absoluteUrl, publisher } from '../lib/site';
import {
  ArticleCard,
  BackToTop,
  CategoryItem,
  NewsletterWidget,
  PopularArticleItem,
  SidebarWidget,
  TagPill,
} from '../components/blog/BlogPrimitives';
import { useSeo } from '../lib/useSeo';

const POSTS_PER_PAGE = 6;

/** Warms the lazily-loaded article chunk before the visitor clicks a card. */
let prefetched = false;
const prefetchArticleRoute = () => {
  if (prefetched) return;
  prefetched = true;
  void import('./BlogPost');
};

const LENGTH_FILTERS = [
  { id: 'all', label: 'Any length', test: () => true },
  { id: 'short', label: 'Under 4 min', test: (m: number) => m < 4 },
  { id: 'long', label: '4 min or more', test: (m: number) => m >= 4 },
] as const;

type LengthId = (typeof LENGTH_FILTERS)[number]['id'];

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full text-[13px] font-semibold bg-violet-50 text-[#6D28D9] border border-violet-100">
      {label}
      <button
        type="button"
        onClick={onClear}
        aria-label={`Remove ${label} filter`}
        className="hover:bg-violet-100 rounded-full p-0.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
      >
        <X className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </span>
  );
}

export function Blog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [length, setLength] = useState<LengthId>('all');
  const [page, setPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => getCategories(), []);
  const tags = useMemo(() => getTags(), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSeo({
    title: 'Blog — Insights, tips & trends on smarter hiring | PyHire',
    description:
      'Explore the latest recruitment strategies, HR tech insights, and expert advice to attract, engage, and hire the best talent.',
    canonicalPath: '/blog',
    image: blogPosts[0]?.image,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${absoluteUrl('/blog')}#blog`,
        name: 'PyHire Blog',
        url: absoluteUrl('/blog'),
        description:
          'Explore the latest recruitment strategies, HR tech insights, and expert advice to attract, engage, and hire the best talent.',
        inLanguage: 'en',
        publisher: publisher(),
        blogPost: blogPosts.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: plainText(post.excerpt),
          image: post.image,
          articleSection: post.category,
          keywords: post.tags.join(', '),
          url: absoluteUrl(`/blog/${post.slug}`),
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
        ],
      },
    ],
  });

  /* Close the category dropdown on outside click / Escape. */
  useEffect(() => {
    if (!dropdownOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [dropdownOpen]);

  /* Any filter change returns to the first page. */
  useEffect(() => {
    setPage(1);
  }, [query, category, tag, length]);

  const searchIndex = useMemo(
    () => blogPosts.map((post) => ({ post, haystack: postText(post).toLowerCase() })),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const lengthTest = LENGTH_FILTERS.find((f) => f.id === length)!.test;
    return searchIndex
      .filter(({ post, haystack }) => {
        if (q && !haystack.includes(q) && !post.tags.some((t) => t.toLowerCase().includes(q))) {
          return false;
        }
        if (category && post.category !== category) return false;
        if (tag && !post.tags.includes(tag)) return false;
        if (!lengthTest(readingMinutes(post))) return false;
        return true;
      })
      .map(({ post }) => post);
  }, [searchIndex, query, category, tag, length]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const hasFilters = Boolean(query || category || tag || length !== 'all');

  const clearAll = () => {
    setQuery('');
    setCategory(null);
    setTag(null);
    setLength('all');
  };

  const goToPage = (next: number) => {
    setPage(next);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="pt-24 lg:pt-12 bg-white min-h-screen font-sans overflow-hidden">
      {/* 1. Hero Section */}
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-4 lg:py-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-6">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start relative z-10">
          <div className="inline-block px-3 py-1 bg-violet-50 text-violet-600 text-[12px] sm:text-[11px] font-bold rounded-md mb-8 tracking-wider uppercase border border-violet-100">
            BLOG
          </div>
          <h1 className="text-[2.6rem] sm:text-[3.5rem] lg:text-[4rem] font-bold text-[#1B1650] leading-[1.1] mb-6 tracking-tight">
            Insights, tips &amp;<br className="hidden sm:block" /> trends on smarter<br className="hidden sm:block" /> hiring
          </h1>
          <p className="text-[1.125rem] text-[#4B5563] leading-relaxed max-w-md">
            Explore the latest recruitment strategies, HR tech insights, and expert advice to attract, engage, and hire the best talent.
          </p>
        </div>

        {/* Right Image Content */}
        <div className="w-full lg:w-1/2 relative h-[460px] sm:h-[500px] lg:h-[560px] flex justify-center items-end mt-8 lg:mt-0">
          {/* Backdrop: soft violet disc with an orbit ring and dot grid */}
          <div aria-hidden="true" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] max-w-[500px] aspect-square rounded-full bg-gradient-to-br from-[#EEEAFE] via-[#F6F3FF] to-[#E6EFFC]" />
          <div aria-hidden="true" className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[78%] max-w-[420px] aspect-square rounded-full border border-dashed border-[#C4B5FD]" />
          <div aria-hidden="true" className="absolute right-2 top-16 opacity-50">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              {[5, 20, 35, 50].flatMap((x) => [5, 20, 35].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="#6D28D9" />))}
            </svg>
          </div>

          {/* Portrait in an arch frame */}
          <div className="relative z-10 h-[92%] w-[min(340px,72%)] rounded-t-[999px] rounded-b-[32px] overflow-hidden bg-gradient-to-b from-[#6D28D9] to-[#2D5BE3] p-[6px] shadow-[0_40px_80px_-30px_rgba(76,29,149,0.6)]">
            <img
              src="/recruiter-portrait.jpg"
              alt="Recruiter at her desk, smiling"
              width={600}
              height={849}
              className="h-full w-full rounded-t-[999px] rounded-b-[26px] object-cover object-top"
              decoding="async"
            />
          </div>

          {/* Second, smaller portrait */}
          <div className="absolute z-20 left-0 sm:left-2 lg:-left-2 bottom-8 hidden sm:block w-[132px] h-[132px] rounded-[26px] overflow-hidden border-4 border-white shadow-[0_18px_40px_-16px_rgba(27,22,80,0.5)]">
            <img
              src="/job-management-hiring-manager.jpg"
              alt="Hiring manager"
              width={900}
              height={618}
              className="h-full w-full object-cover object-[60%_20%]"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Floating cards */}
          <div className="absolute top-8 right-0 lg:right-2 bg-white rounded-[20px] shadow-[0_12px_34px_-12px_rgba(27,22,80,0.25)] p-3.5 pr-7 flex items-center gap-3.5 z-30 border border-[#E7E3F6]">
            <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600">
              <Users className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-medium tracking-wide">Open Positions</div>
              <div className="text-[22px] font-bold text-[#1B1650] leading-none mt-1">124</div>
            </div>
          </div>

          <div className="absolute top-[42%] left-0 sm:left-4 lg:left-0 bg-white rounded-[20px] shadow-[0_12px_34px_-12px_rgba(27,22,80,0.25)] p-3.5 pl-5 pr-4 flex items-center gap-5 z-30 border border-[#E7E3F6]">
            <div>
              <div className="text-[11px] text-slate-500 font-medium tracking-wide">Hires This Month</div>
              <div className="text-[22px] font-bold text-[#1B1650] leading-none mt-1">32</div>
            </div>
            <div className="w-12 h-12 border-2 border-violet-500 rounded-xl flex items-center justify-center text-violet-600">
              <UserPlus className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
            </div>
          </div>

          <div className="absolute bottom-16 right-0 lg:right-2 bg-white rounded-[20px] shadow-[0_12px_34px_-12px_rgba(27,22,80,0.25)] p-3.5 pr-7 flex items-center gap-3.5 z-30 border border-[#E7E3F6]">
            <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600">
              <Target className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-medium tracking-wide">Time to Hire</div>
              <div className="text-[22px] font-bold text-[#1B1650] leading-none mt-1">12 Days</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Search Bar */}
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 mb-6 relative z-30">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-slate-200 rounded-full p-2.5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] focus-within:border-[#6D28D9] transition-colors">
          <div className="flex items-center gap-3 pl-4 w-full sm:w-auto flex-1 h-10">
            <Search className="w-5 h-5 text-slate-400 shrink-0" strokeWidth={2} aria-hidden="true" />
            <label htmlFor="blog-search" className="sr-only">Search articles</label>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="bg-transparent border-none outline-none text-[16px] sm:text-[15px] py-2.5 w-full text-slate-700 placeholder:text-slate-400 font-medium"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="text-slate-400 hover:text-[#6D28D9] transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="hidden sm:block w-[1px] h-8 bg-slate-200 mx-4"></div>

          {/* Category dropdown */}
          <div
            ref={dropdownRef}
            className="relative w-full sm:w-auto border-t sm:border-t-0 border-slate-100 mt-2 sm:mt-0 pt-2 sm:pt-0"
          >
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
              className="flex items-center justify-between sm:justify-start gap-2 pr-4 pl-4 sm:pl-0 w-full sm:w-auto h-10 sm:h-auto cursor-pointer text-slate-700 font-bold text-[14px] hover:text-[#6D28D9] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded-full"
            >
              <span>{category ?? 'All Categories'}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </button>

            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                role="listbox"
                aria-label="Filter by category"
                className="absolute right-0 sm:right-0 top-full mt-3 w-full sm:w-60 bg-white rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-2 z-40"
              >
                <button
                  type="button"
                  role="option"
                  aria-selected={category === null}
                  onClick={() => { setCategory(null); setDropdownOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-[14px] rounded-xl transition-colors text-left ${category === null ? 'text-[#6D28D9] bg-violet-50 font-bold' : 'text-slate-600 hover:text-[#6D28D9] hover:bg-violet-50'}`}
                >
                  All Categories
                  {category === null && <Check className="w-4 h-4" aria-hidden="true" />}
                </button>
                {categories.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    role="option"
                    aria-selected={category === c.name}
                    onClick={() => { setCategory(c.name); setDropdownOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-[14px] rounded-xl transition-colors text-left ${category === c.name ? 'text-[#6D28D9] bg-violet-50 font-bold' : 'text-slate-600 hover:text-[#6D28D9] hover:bg-violet-50'}`}
                  >
                    <span>{c.name}</span>
                    {category === c.name ? <Check className="w-4 h-4" aria-hidden="true" /> : <span className="text-slate-400">({c.count})</span>}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 2b. Result count, active filters and reading-time control.
          Category and tag filtering live in the sidebar widgets, so this row
          stays compact and the first article row remains near the fold. */}
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 mb-8 relative z-20">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <p className="text-[13px] font-bold text-slate-500">
            Showing {filtered.length} of {blogPosts.length} articles
          </p>

          {category && (
            <FilterChip label={category} onClear={() => setCategory(null)} />
          )}
          {tag && <FilterChip label={tag} onClear={() => setTag(null)} />}

          <div className="flex items-center gap-2 ml-auto">
            <label htmlFor="blog-length" className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
              Read time
            </label>
            <select
              id="blog-length"
              value={length}
              onChange={(e) => setLength(e.target.value as LengthId)}
              className="px-3 py-2.5 sm:py-1.5 rounded-full text-[13px] font-semibold bg-white text-slate-600 border border-slate-200 hover:border-[#6D28D9] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] cursor-pointer"
            >
              {LENGTH_FILTERS.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>

            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="flex items-center gap-1.5 text-[13px] font-bold text-slate-500 hover:text-[#6D28D9] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded-full px-2 py-1"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" /> Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Main Grid Layout */}
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pb-12 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">

          {/* Articles Grid */}
          <div
            className="lg:col-span-8"
            ref={resultsRef}
            onPointerEnter={prefetchArticleRoute}
            onFocusCapture={prefetchArticleRoute}
          >
            <p className="sr-only" role="status" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} found
            </p>

            {visible.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {visible.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.06 }}
                  >
                    <ArticleCard post={post} eager={currentPage === 1 && i < 2} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-6 bg-slate-50 rounded-[24px] border border-slate-100">
                <Search className="w-8 h-8 text-slate-300 mx-auto mb-4" aria-hidden="true" />
                <h2 className="text-[1.25rem] font-bold text-[#111111] mb-2">No articles found</h2>
                <p className="text-[15px] text-slate-600 mb-6">
                  Try a different search term, or clear the filters to see all {blogPosts.length} articles.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-6 py-2.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full font-bold text-[14px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:-translate-y-0.5"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label="Blog pagination" className="flex items-center justify-center gap-2 mt-8">
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#6D28D9] hover:border-[#6D28D9] transition-colors disabled:opacity-40 disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => goToPage(n)}
                    aria-label={`Page ${n}`}
                    aria-current={n === currentPage ? 'page' : undefined}
                    className={`w-10 h-10 rounded-full text-[14px] font-bold transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] ${
                      n === currentPage
                        ? 'bg-[#6D28D9] text-white shadow-[0_4px_14px_rgb(249,115,22,0.3)]'
                        : 'border border-slate-200 text-slate-600 hover:text-[#6D28D9] hover:border-[#6D28D9]'
                    }`}
                  >
                    {n}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#6D28D9] hover:border-[#6D28D9] transition-colors disabled:opacity-40 disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </nav>
            )}
          </div>

          {/* Sidebar */}
          <aside
            className="lg:col-span-4 space-y-8"
            aria-label="Blog sidebar"
            onPointerEnter={prefetchArticleRoute}
          >

            {/* Categories Widget */}
            <SidebarWidget title="Categories">
              {categories.map((c) => (
                <CategoryItem
                  key={c.name}
                  name={c.name}
                  count={c.count}
                  active={category === c.name}
                  onClick={() => setCategory(category === c.name ? null : c.name)}
                />
              ))}
            </SidebarWidget>

            {/* Popular Articles Widget */}
            <SidebarWidget title="Popular Articles" bodyClassName="p-6 flex flex-col gap-6">
              {blogPosts.slice(0, 6).map((post) => (
                <PopularArticleItem key={post.slug} post={post} />
              ))}
            </SidebarWidget>

            {/* Tags Widget */}
            <SidebarWidget title="Tags" bodyClassName="p-6 flex flex-wrap gap-2">
              {tags.map((t) => (
                <TagPill
                  key={t.name}
                  name={t.name}
                  active={tag === t.name}
                  onClick={() => setTag(tag === t.name ? null : t.name)}
                />
              ))}
            </SidebarWidget>

            <NewsletterWidget />

          </aside>
        </div>
      </section>

      <BackToTop />
    </main>
  );
}
