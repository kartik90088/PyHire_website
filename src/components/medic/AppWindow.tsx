import type { ReactNode } from 'react';

/**
 * Animated highlight border: a soft orange light that travels round the edge
 * (a rotating conic gradient behind a 1.5px gap). Static under reduced motion
 * (the global reset in index.css stops the spin). `delay` staggers windows
 * on the same page so the lights don't move in lockstep.
 */
export function BeamBorder({
  children,
  radius = 26,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  radius?: number;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`relative p-[1.5px] overflow-hidden ${className}`} style={{ borderRadius: radius + 1.5 }}>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 w-[200%] aspect-square -translate-x-1/2 -translate-y-1/2 [animation:spin_7s_linear_infinite]"
        style={{
          background: 'conic-gradient(from 0deg, rgba(109,40,217,0) 0deg, rgba(109,40,217,0) 250deg, #C4B5FD 300deg, #6D28D9 335deg, rgba(109,40,217,0) 360deg)',
          animationDelay: `${-delay}s`,
        }}
      />
      <div className="relative h-full" style={{ borderRadius: radius }}>{children}</div>
    </div>
  );
}

/**
 * Product window frame in the PyCore family style (as on PyMedic): a pale
 * title bar with three dots, a centred title and a live dot, over a softly
 * tinted body. Decorative wrapper for product mockups.
 */
export function AppWindow({
  title,
  children,
  dark = false,
  className = '',
}: {
  title: string;
  children: ReactNode;
  /** Navy inner screen (hero "display" style). */
  dark?: boolean;
  className?: string;
}) {
  return (
    <BeamBorder className={`shadow-[0_30px_70px_-30px_rgba(27,22,80,0.35)] bg-[#E0DBF1] ${className}`} delay={(title.length % 7)}>
    <div aria-hidden="true" className="rounded-[26px] bg-[#F0EDFA] overflow-hidden h-full">
      <div className="relative flex items-center px-5 h-11 border-b border-[#E0DBF1]">
        <span className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D6D1EA]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#D6D1EA]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#D6D1EA]" />
        </span>
        <span className="absolute left-1/2 -translate-x-1/2 text-[13px] text-[#514D7A] whitespace-nowrap">{title}</span>
        <span className="ml-auto w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15" />
      </div>
      <div className={dark ? 'p-4' : 'p-5'}>{children}</div>
    </div>
    </BeamBorder>
  );
}

/** White stat tile used inside windows ("14 · Booked today"). */
export function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white border border-[#E7E3F6] px-4 py-3">
      <p className="font-display font-bold text-[1.6rem] leading-none text-[#1B1650]">{value}</p>
      <p className="mt-1.5 text-[12px] text-[#514D7A]">{label}</p>
    </div>
  );
}
