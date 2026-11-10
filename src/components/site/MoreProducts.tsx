import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { productLinks } from '../../data/navigation';
import { DEMO_PATH } from '../../lib/routes';
import { useLoops } from './PageParts';

/**
 * "More of PyHire" — links to the other product pages.
 *
 * Motion: cards rise in with a stagger; while the strip is on screen a light
 * sweeps from card to card (the lit card gets an orange border, a filled icon
 * and a nudged arrow); hovering takes over, and a spotlight follows the
 * cursor over the hovered card. Loops stop for reduced motion and in the
 * prerenderer. The closing tile reuses the document's "See PyHire on your own
 * roles." call to action.
 */

const SWEEP_MS = 1500;
const ease = [0.22, 1, 0.36, 1] as const;

export function MoreProducts({
  currentPath = '',
  heading = true,
  cta = true,
}: {
  /** Product page to leave out (the one being viewed); empty shows all eight. */
  currentPath?: string;
  /** Show the small "More of PyHire" label and rule above the grid. */
  heading?: boolean;
  /** Show the closing "Book a demo" tile (use with 7 cards so the grid ends flush). */
  cta?: boolean;
}) {
  const others = productLinks.filter((l) => l.path !== currentPath);
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const loops = useLoops();
  const [hover, setHover] = useState<number | null>(null);
  const [sweep, setSweep] = useState(0);

  useEffect(() => {
    if (!loops || !inView || hover !== null) return;
    const id = setTimeout(() => setSweep((s) => (s + 1) % others.length), SWEEP_MS);
    return () => clearTimeout(id);
  }, [loops, inView, hover, sweep, others.length]);

  const lit = hover ?? (loops && inView ? sweep : -1);

  const spot = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div>
      {heading && (
      <div className="flex items-center gap-4">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#514D7A]">More of PyHire</h2>
          <motion.span
            aria-hidden="true"
            className="h-px flex-1 origin-left bg-gradient-to-r from-[#6D28D9] via-[#C4B5FD] to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          />
        </div>
      )}

      <ul ref={ref} className={`${heading ? 'mt-5' : ''} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3`} onMouseLeave={() => setHover(null)}>
        {others.map(({ path, label, desc, icon: Icon }, i) => {
          const on = i === lit;
          return (
            <motion.li
              key={path}
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 + Math.floor(i / 4) * 0.12, ease }}
            >
              <Link
                to={path}
                onMouseEnter={() => setHover(i)}
                onMouseMove={spot}
                onFocus={() => setHover(i)}
                className={`group relative h-full flex flex-col overflow-hidden rounded-[22px] border p-5 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] ${
                  on
                    ? 'border-[#6D28D9] bg-[#F3F0FF] -translate-y-1 shadow-[0_22px_44px_-26px_rgba(109,40,217,0.7)]'
                    : 'border-[#E7E3F6] bg-white'
                }`}
              >
                {/* cursor spotlight */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), rgba(109,40,217,0.14), transparent 70%)' }}
                />
                {/* sweep shine */}
                {on && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                    initial={{ left: '-40%' }}
                    animate={{ left: '130%' }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                  />
                )}
                <span className="relative flex items-center gap-2.5 font-display font-bold text-[15px] text-[#1B1650]">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      on ? 'bg-[#6D28D9] text-white scale-110 -rotate-6' : 'bg-[#EEEAFE] text-[#5B21B6]'
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                  </span>
                  {label}
                  <ArrowRight
                    className={`w-4 h-4 ml-auto transition-all duration-300 ${on ? 'text-[#6D28D9] translate-x-1' : 'text-[#A39EC6]'}`}
                    aria-hidden="true"
                  />
                </span>
                <span className="relative mt-2.5 text-[14px] leading-[1.55] text-[#514D7A]">{desc}</span>
                <span
                  aria-hidden="true"
                  className={`relative mt-4 h-[3px] rounded-full bg-[#6D28D9] origin-left transition-transform duration-500 ${on ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </Link>
            </motion.li>
          );
        })}

        {cta && (
        <motion.li
          initial={{ opacity: 0, y: 22, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
        >
          <Link
            to={DEMO_PATH}
            className="group relative h-full min-h-[132px] flex flex-col justify-between overflow-hidden rounded-[22px] bg-panel p-5 text-white outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2"
          >
            <span aria-hidden="true" className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-[#6D28D9]/30 blur-2xl transition-transform duration-500 group-hover:scale-125" />
            <span className="relative font-display font-extrabold text-[1.2rem] leading-tight">
              See PyHire <span className="text-[#C4B5FD]">on your own roles.</span>
            </span>
            <span className="relative mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-[#6D28D9] px-4 py-2 text-[14px] font-bold text-white transition-transform duration-300 group-hover:-translate-y-0.5">
              Book a demo <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
          </Link>
        </motion.li>
        )}
      </ul>
    </div>
  );
}
