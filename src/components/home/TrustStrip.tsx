import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { featureCards } from '../Features';

/**
 * "Trusted By" strip. There are no verified customer logos yet, so the
 * marquee carries PyHire's own modules rather than invented brands; swap in
 * logos here once they are cleared for use.
 */
export function TrustStrip() {
  const items = featureCards.map((card) => ({ title: card.title, icon: card.icon }));

  return (
    <section className="bg-white py-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-2 text-center">
        <span className="text-[13px] font-semibold tracking-[0.3em] uppercase text-slate-500">Trusted By</span>
        <span className="font-script text-[2rem] leading-none text-[#1B1650]">Top companies choose PyHire.</span>
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-1 text-[13px] font-semibold tracking-[0.2em] uppercase text-[#6D28D9] hover:text-[#8B5CF6] outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded"
        >
          Read customer stories <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      <div
        className="group relative mt-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        aria-label="PyHire modules"
      >
        <div className="flex w-max [animation:home-marquee_32s_linear_infinite] group-hover:[animation-play-state:paused] will-change-transform">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex gap-4 pr-4" aria-hidden={copy === 1 || undefined}>
              {items.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 whitespace-nowrap text-[15px] font-semibold text-slate-700 [&_svg]:w-5 [&_svg]:h-5"
                >
                  {item.icon}
                  {item.title}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
