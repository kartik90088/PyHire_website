import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { useSeo } from '../lib/useSeo';
import { DEMO_PATH } from '../lib/routes';

/**
 * Catch-all for unmatched URLs.
 *
 * Previously these rendered the navbar and footer around an empty gap, which
 * reads as a broken page and leaves the visitor with nowhere to go. Marked
 * `noindex, follow` so mistyped or stale URLs never enter the index while their
 * links are still crawled.
 *
 * Note this is a soft 404: static hosting rewrites unmatched paths to
 * index.html, which returns 200. The `noindex` directive is what keeps it out
 * of search results.
 */
export function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSeo({
    title: 'Page not found | PyHire',
    description: 'The page you were looking for could not be found.',
    canonicalPath: '/404',
    noIndex: true,
  });

  return (
    <main className="pt-28 pb-14 bg-white min-h-screen font-sans">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center mx-auto mb-8 text-[#6D28D9]">
          <Compass className="w-8 h-8" strokeWidth={1.5} aria-hidden="true" />
        </div>

        <p className="text-[13px] font-bold text-[#6D28D9] tracking-wider uppercase mb-4">
          404
        </p>

        <h1 className="text-[2.5rem] lg:text-[3rem] font-bold text-[#1B1650] leading-[1.1] mb-6 tracking-tight">
          We couldn’t find that page
        </h1>

        <p className="text-[1.125rem] text-[#4B5563] leading-relaxed max-w-lg mx-auto mb-10">
          The link may be out of date, or the address may have been mistyped. Here are a few
          places worth trying instead.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#6D28D9] hover:bg-[#8B5CF6] text-white rounded-full font-bold text-[15px] transition-all shadow-[0_4px_14px_rgb(253,101,0,0.3)] hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to home
          </Link>
          <Link
            to={DEMO_PATH}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 rounded-full font-bold text-[15px] transition-all border border-slate-200 shadow-sm hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
          >
            Book a demo
          </Link>
        </div>

        <nav aria-label="Suggested pages" className="max-w-2xl mx-auto">
          <p className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-5">
            Popular pages
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: 'Jobs & candidates', path: '/product/jobs-and-candidates' },
              { name: 'AI matching & insights', path: '/product/ai' },
              { name: 'Solutions', path: '/solutions' },
              { name: 'Pricing', path: '/pricing' },
              { name: 'Blog', path: '/blog' },
              { name: 'About', path: '/about' },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="inline-block px-4 py-2 rounded-full border border-slate-200 text-[14px] font-semibold text-slate-600 hover:text-[#6D28D9] hover:border-[#6D28D9] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
