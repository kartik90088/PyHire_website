import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp, Mail } from 'lucide-react';
import { readingMinutes, type BlogPost } from '../../data/blogPosts';

/** Re-exported from the shared renderer so existing blog imports keep working. */
export { RichText } from '../RichText';

/* ------------------------------------------------------------------ */
/* ArticleCard — the existing listing card, now linked and data-driven  */
/* ------------------------------------------------------------------ */

export function ArticleCard({ post, eager = false }: { post: BlogPost; eager?: boolean }) {
  return (
    <article className="group flex flex-col gap-4 h-full">
      <Link
        to={`/blog/${post.slug}`}
        className="flex flex-col gap-4 h-full rounded-[24px] outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
      >
        <div className="relative aspect-[4/3] sm:aspect-auto sm:h-[240px] rounded-[24px] overflow-hidden mb-2 bg-slate-100">
          <img
            src={post.image}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt={post.imageAlt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
          />
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[12px] sm:text-[11px] font-bold px-3 py-1.5 rounded-full">
            {post.category}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-[1.25rem] font-bold text-[#111111] leading-snug group-hover:text-[#6D28D9] transition-colors line-clamp-3">
          {post.title}
        </h3>

        <p className="text-[15px] text-slate-600 leading-relaxed line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center gap-2 text-[13px] font-bold text-slate-600 mt-auto pt-2 group-hover:text-[#6D28D9] transition-colors">
          {readingMinutes(post)} Min read
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar building blocks                                             */
/* ------------------------------------------------------------------ */

export function SidebarWidget({
  title,
  children,
  bodyClassName = 'p-3',
}: {
  title: string;
  children: React.ReactNode;
  bodyClassName?: string;
}) {
  return (
    <section
      className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100"
      aria-labelledby={`widget-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="bg-[#6D28D9] py-5 px-6">
        <h3 id={`widget-${title.replace(/\s+/g, '-').toLowerCase()}`} className="text-white font-bold text-[18px]">
          {title}
        </h3>
      </div>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

export function CategoryItem({
  name,
  count,
  active = false,
  onClick,
}: {
  name: string;
  count: number | string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors group text-left outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] ${
        active ? 'bg-violet-50' : 'hover:bg-slate-50'
      }`}
    >
      <span
        className={`text-[15px] font-medium transition-colors ${
          active ? 'text-[#6D28D9] font-bold' : 'text-slate-700 group-hover:text-[#6D28D9]'
        }`}
      >
        {name}
      </span>
      <span className="text-[14px] text-slate-500">({count})</span>
    </button>
  );
}

export function PopularArticleItem({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="flex gap-4 group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2"
    >
      <div className="w-16 h-16 shrink-0 rounded-[14px] overflow-hidden bg-slate-100">
        <img
          src={post.thumb}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt=""
          loading="lazy"
          decoding="async"
          width={64}
          height={64}
        />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="text-[14px] font-bold text-[#111111] leading-snug mb-1.5 group-hover:text-[#6D28D9] transition-colors line-clamp-2">
          {post.title}
        </h4>
        <div className="text-[12px] text-slate-500 font-medium">{readingMinutes(post)} min read</div>
      </div>
    </Link>
  );
}

export function TagPill({
  name,
  active = false,
  onClick,
}: {
  name: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-3 py-2.5 sm:py-1.5 rounded-full text-[13px] font-semibold border transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] ${
        active
          ? 'bg-[#6D28D9] text-white border-[#6D28D9] shadow-[0_4px_14px_rgb(249,115,22,0.3)]'
          : 'bg-white text-slate-600 border-slate-200 hover:border-[#6D28D9] hover:text-[#6D28D9]'
      }`}
    >
      {name}
    </button>
  );
}

export function NewsletterWidget() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <SidebarWidget title="Newsletter" bodyClassName="p-6">
      <p className="text-[14px] text-slate-600 leading-relaxed mb-4">
        Get new articles on smarter hiring delivered to your inbox.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="flex flex-col gap-3"
      >
        <label htmlFor="blog-newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-2.5 focus-within:border-[#6D28D9] transition-colors">
          <Mail className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
          <input
            id="blog-newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="bg-transparent border-none outline-none text-[16px] sm:text-[14px] py-2.5 w-full text-slate-700 placeholder:text-slate-400 font-medium"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full font-bold text-[14px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgb(249,115,22,0.4)] hover:-translate-y-0.5"
        >
          Subscribe
        </button>
        <p role="status" aria-live="polite" className="text-[13px] text-emerald-600 font-medium min-h-[1rem]">
          {sent ? 'Thanks — we’ll be in touch.' : ''}
        </p>
      </form>
    </SidebarWidget>
  );
}

/* ------------------------------------------------------------------ */
/* Back to top                                                         */
/* ------------------------------------------------------------------ */

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-28 right-6 z-40 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-slate-600 hover:text-[#6D28D9] hover:border-[#6D28D9] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
