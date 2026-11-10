import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { animate, useInView, useReducedMotion } from 'motion/react';

/**
 * Building blocks shared by every page, in the PyCore family style (shared
 * with PyMedic): navy ink, one brand accent, pale tinted surfaces, Outfit
 * headings, uppercase eyebrows, two-tone headlines and pill buttons.
 * PyHire's accent is the orange from its own logo, where PyMedic uses blue.
 */

/** Deep indigo ink — headings and body text. */
export const INK = '#1B1650';
/** Secondary text. */
export const MUTED = '#514D7A';
/** Logo violet — links, highlights and brand accents. */
export const ACCENT = '#6D28D9';
/** Deeper violet for small accent text and links on white. */
export const ACCENT_DEEP = '#5B21B6';
/** Pale lavender surface, from the logo backdrop. */
export const TINT = '#F3F0FF';
/** Page background. */
export const CREAM = '#FBFAFF';
/** Dark panels — closing bands, highlighted cards. */
export const PANEL = '#2A1B7A';
export const PANEL_DEEP = '#1B1650';

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[13px] font-semibold uppercase tracking-[0.12em] text-[#5B21B6] ${className}`}>
      {children}
    </p>
  );
}

/**
 * Two-tone headline: `children` in navy, then `accent` in orange — PyMedic's
 * "Nine parts, one record." pattern. Both parts are the page's own copy.
 */
export function SectionHeading({
  children,
  accent,
  className = '',
  as: Tag = 'h2',
}: {
  children?: ReactNode;
  accent?: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <Tag
      className={`font-display font-extrabold text-[2.1rem] sm:text-[2.75rem] leading-[1.08] tracking-[-0.025em] text-[#1B1650] ${className}`}
    >
      {children}
      {children && accent ? ' ' : null}
      {accent && <span className="text-brand-gradient">{accent}</span>}
    </Tag>
  );
}

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[16px] font-bold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2 hover:-translate-y-0.5';

export function PrimaryButton({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={`${buttonBase} bg-gradient-to-r from-[#FFA94D] to-[#F28C30] hover:from-[#FFB766] hover:to-[#F59A45] text-[#1B1650] shadow-[0_12px_28px_-10px_rgba(242,140,48,0.8)] ${className}`}>
      {children}
    </Link>
  );
}

export function OutlineButton({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={`${buttonBase} border border-[#DDD8F0] bg-white hover:border-[#6D28D9] text-[#1B1650] ${className}`}>
      {children}
    </Link>
  );
}

/**
 * Sample people used across the product illustrations. Photos are local,
 * cropped from the site's own portrait set (public/avatars); they are
 * illustrative, not customers.
 */
const PEOPLE: Record<string, string> = {
  'Sarah Jenkis': '/avatars/sarah-jenkis.webp',
  'David Ross': '/avatars/david-ross.webp',
  'Priya N.': '/avatars/priya-nair.webp',
  'Priya Nair': '/avatars/priya-nair.webp',
  'Arjun M.': '/avatars/arjun-mehta.webp',
  'Arjun Mehta': '/avatars/arjun-mehta.webp',
};

/** Avatar: the person's photo when we have one, otherwise their initials. */
export function Initials({
  name,
  tone = 'bg-violet-100 text-violet-700',
  size = 'w-10 h-10 text-[13px]',
  shape = 'rounded-xl',
}: { name: string; tone?: string; size?: string; shape?: string }) {
  const photo = PEOPLE[name];
  if (photo) {
    return (
      <img
        src={photo}
        alt=""
        aria-hidden="true"
        width={96}
        height={96}
        loading="lazy"
        decoding="async"
        className={`${size} ${shape} object-cover shrink-0 ring-2 ring-white bg-slate-100`}
      />
    );
  }
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  return (
    <span aria-hidden="true" className={`${size} ${tone} ${shape} inline-flex items-center justify-center font-bold shrink-0`}>
      {initials}
    </span>
  );
}

/** Soft cloud made of three rounded pills. Decorative. */
export function Cloud({ className = '', tone = 'bg-violet-100' }: { className?: string; tone?: string }) {
  return (
    <div aria-hidden="true" className={`absolute pointer-events-none ${className}`}>
      <div className={`relative w-44 h-16`}>
        <span className={`absolute left-6 top-0 w-20 h-12 rounded-full ${tone}`} />
        <span className={`absolute left-0 top-5 w-44 h-11 rounded-full ${tone}`} />
        <span className={`absolute right-[-36px] top-9 w-12 h-5 rounded-full ${tone}`} />
      </div>
    </div>
  );
}

/** Layered hills with light shafts, in the brand's orange range. Decorative. */
export function Hills({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="hill-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DDD6FE" />
          <stop offset="1" stopColor="#C4B5FD" />
        </linearGradient>
        <linearGradient id="hill-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C4B5FD" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="hill-front" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6D28D9" />
          <stop offset="1" stopColor="#5B21B6" />
        </linearGradient>
      </defs>
      <path d="M0 230 L170 120 L420 300 L640 170 L900 330 L1150 140 L1440 280 L1440 520 L0 520 Z" fill="url(#hill-back)" />
      <path d="M0 330 L260 210 L560 400 L820 250 L1100 410 L1300 300 L1440 360 L1440 520 L0 520 Z" fill="url(#hill-mid)" />
      <g fill="#ffffff" opacity="0.18">
        <path d="M150 520 L230 230 L270 230 L210 520 Z" />
        <path d="M980 520 L1100 300 L1150 300 L1050 520 Z" />
        <path d="M1240 520 L1320 330 L1350 330 L1290 520 Z" />
      </g>
      <path d="M0 420 L360 330 L760 470 L1080 380 L1440 450 L1440 520 L0 520 Z" fill="url(#hill-front)" />
      <path d="M0 470 L520 410 L1000 500 L1440 470 L1440 520 L0 520 Z" fill="#5B21B6" />
    </svg>
  );
}

/** True at the `lg` breakpoint and above. Read synchronously so the first render is right. */
export function useIsDesktop() {
  const query = '(min-width: 1024px)';
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setIsDesktop(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
}

/**
 * Renders the final value first, then counts up once when scrolled into view.
 * Starting from the real figure keeps the prerendered HTML accurate; automated
 * browsers (the prerenderer) and reduced-motion visitors skip the count.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^([\d.,]+)(.*)$/);
    if (!el || !inView || reduce || !match || navigator.webdriver) return;
    const target = Number.parseFloat(match[1].replace(/,/g, ''));
    const decimals = match[1].split('.')[1]?.length ?? 0;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${v.toFixed(decimals)}${match[2]}`;
      },
      onComplete: () => {
        el.textContent = value;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return <span ref={ref}>{value}</span>;
}
