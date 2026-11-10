import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts, readingMinutes } from "../data/blogPosts";

/**
 * Home page blog teasers.
 *
 * Reads the first three posts out of the canonical store rather than carrying
 * its own copy. The cards previously listed three articles that do not exist on
 * this site, credited the product as "Saaseek", and linked nowhere — so the one
 * place the home page points at the blog was a dead end advertising a competitor's
 * name.
 *
 * Taking `slice(0, 3)` means publishing a post at the top of `blogPosts` surfaces
 * it here automatically, the same way the sitemap and prerenderer derive their
 * route lists from the data.
 */

/* Panel tints are presentational and belong to this layout, not to the posts —
   they cycle by position so the row keeps its warm/red/teal rhythm whichever
   three articles are current. */
const PANEL_TINTS = ["bg-[#DDD6FE]", "bg-[#ffa1a1]", "bg-[#a6d8d4]"];

/** Warms the lazily-loaded article chunk before the visitor clicks through. */
let prefetched = false;
const prefetchArticleRoute = () => {
  if (prefetched) return;
  prefetched = true;
  void import("../pages/BlogPost");
};

export function Insights() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section
      className="py-4 lg:py-8 bg-white text-center"
      onPointerEnter={prefetchArticleRoute}
      onFocusCapture={prefetchArticleRoute}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl md:text-[2.5rem] font-bold text-slate-900 mb-5">Explore the Latest Insights</h2>
        <p className="text-slate-600 mb-6 text-lg">Dive into our blog for tips, trends, and expert advice on making the most of PyHire.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {posts.map((post, i) => (
            <article key={post.slug} className="group flex flex-col h-full">
              {/* The whole card is one link, so the title and the "read" control
                  share a single target rather than competing for the same click. */}
              <Link
                to={`/blog/${post.slug}`}
                className="flex flex-col h-full rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
              >
                <div className={`relative w-full aspect-[4/2.5] rounded-3xl overflow-hidden mb-6 ${PANEL_TINTS[i % PANEL_TINTS.length]} flex items-center justify-center p-8`}>
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover mix-blend-overlay opacity-60 rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-md text-white text-[12px] sm:text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-white/10">
                    {post.category}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-5 line-clamp-3 group-hover:text-[#0f766e] transition-colors leading-snug">
                  {post.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 group-hover:text-[#0f766e] transition-colors mt-auto pt-2">
                  {readingMinutes(post)} Min read
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
