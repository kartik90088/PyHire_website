import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { BrainCircuit, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { useLoops } from './PageParts';
import { BeamBorder } from '../medic/AppWindow';
import { Initials } from '../home/shared';

/**
 * About-page hero illustration: the three principles orbit the PyHire mark,
 * with an AI-suggests card and the candidate timeline.
 * Decorative (aria-hidden). Loops, tilt and cycling are skipped for
 * reduced-motion visitors and in the prerenderer, so snapshots stay stable.
 */

const STAGE_W = 600;
const STAGE_H = 540;

/** Scale a fixed-size stage down to fit narrow containers (never up). */
function useFit(base: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / base)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [base]);
  return { ref, scale };
}

/* The three principles from the About page (content document §14). */
const ORBIT = [
  { icon: Layers, label: 'One place', angle: 0 },
  { icon: BrainCircuit, label: 'Explainable AI', angle: 120 },
  { icon: ShieldCheck, label: 'Data care', angle: 240 },
];
const R = 165;

/* Satellites drifting on the rings. */
const SATELLITES = [
  { r: 85, dur: 22, dir: 1, color: '#F28C30', a: 40 },
  { r: 85, dur: 22, dir: 1, color: '#6D28D9', a: 220 },
  { r: 125, dur: 34, dir: -1, color: '#2D5BE3', a: 100 },
  { r: 125, dur: 34, dir: -1, color: '#F28C30', a: 290 },
  { r: 215, dur: 56, dir: 1, color: '#6D28D9', a: 160 },
];

const AURORA = [
  { c: 'rgba(109,40,217,0.28)', x: ['-4%', '6%', '-4%'], y: ['2%', '10%', '2%'], pos: 'left-[-8%] top-[-6%]', d: 14 },
  { c: 'rgba(45,91,227,0.24)', x: ['0%', '-8%', '0%'], y: ['0%', '8%', '0%'], pos: 'right-[-10%] top-[22%]', d: 17 },
  { c: 'rgba(242,140,48,0.2)', x: ['0%', '8%', '0%'], y: ['0%', '-8%', '0%'], pos: 'left-[22%] bottom-[-14%]', d: 20 },
];

const TIMELINE = ['Requisition', 'Interview', 'Offer', 'Joined'];

const CARD =
  'absolute rounded-2xl bg-white/90 backdrop-blur border border-[#E7E3F6] shadow-[0_18px_40px_-20px_rgba(27,22,80,0.45)]';

export function AboutVisual() {
  const loops = useLoops();
  const { ref, scale } = useFit(STAGE_W);
  const spin = { duration: 40, repeat: Infinity, ease: 'linear' as const };

  const [step, setStep] = useState(3);
  useEffect(() => {
    if (!loops) return;
    setStep(0);
    const id = setInterval(() => setStep((n) => (n + 1) % 6), 800);
    return () => clearInterval(id);
  }, [loops]);
  const at = Math.min(step, TIMELINE.length - 1);

  /* Gentle pointer tilt. */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 90, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 90, damping: 18 });
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!loops) return;
    const b = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - b.left) / b.width - 0.5);
    my.set((e.clientY - b.top) / b.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <BeamBorder radius={36} className="w-[600px] max-w-full bg-[#E4DCFF]" delay={1}>
      <div
        ref={ref}
        aria-hidden="true"
        className="relative w-full overflow-hidden rounded-[36px]"
        style={{ height: STAGE_H * scale }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div className="absolute left-0 top-0 origin-top-left" style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}>
          <motion.div
            className="relative w-full h-full overflow-hidden rounded-[36px] bg-gradient-to-br from-[#EEEAFE] via-[#F6F3FF] to-[#E6EFFC]"
            style={{ rotateX, rotateY, transformPerspective: 1100 }}
          >
            {/* aurora */}
            {AURORA.map((b, n) => (
              <motion.span
                key={n}
                className={`absolute w-[320px] h-[320px] rounded-full blur-3xl ${b.pos}`}
                style={{ background: b.c }}
                animate={loops ? { x: b.x, y: b.y } : undefined}
                transition={{ duration: b.d, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(#A78BFA_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(circle_at_50%_40%,black_25%,transparent_75%)]" />

            {/* orbit field, centred at (300, 215) so it clears the timeline card */}
            <div className="absolute inset-x-0 top-0 h-[430px]">
              {[430, 330, 250, 170].map((d, n) => (
                <span
                  key={d}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    width: d,
                    height: d,
                    borderColor: `rgba(109,40,217,${[0.12, 0.3, 0.22, 0.2][n]})`,
                    borderStyle: n === 0 ? 'dotted' : n === 2 ? 'dashed' : 'solid',
                  }}
                />
              ))}

              {SATELLITES.map((sat, n) => (
                <motion.div
                  key={n}
                  className="absolute inset-0"
                  initial={{ rotate: sat.a }}
                  animate={loops ? { rotate: sat.a + sat.dir * 360 } : undefined}
                  transition={{ duration: sat.dur, repeat: Infinity, ease: 'linear' }}
                >
                  <span
                    className="absolute left-1/2 top-1/2 -ml-1 -mt-1 w-2 h-2 rounded-full"
                    style={{ transform: `translateY(-${sat.r}px)`, background: sat.color, boxShadow: `0 0 14px 3px ${sat.color}99` }}
                  />
                </motion.div>
              ))}

              {/* principles: connectors, data packets and chips rotate together */}
              <motion.div className="absolute inset-0" animate={loops ? { rotate: 360 } : undefined} transition={spin}>
                {ORBIT.map(({ icon: Icon, label, angle }, n) => (
                  <div key={label}>
                    <div className="absolute left-1/2 top-1/2 w-0" style={{ transform: `rotate(${angle + 180}deg)`, transformOrigin: 'top center' }}>
                      <span
                        className="absolute -left-px top-0 w-[2px] rounded-full bg-gradient-to-b from-transparent via-[#8B5CF6]/30 to-[#8B5CF6]/60"
                        style={{ height: R - 24 }}
                      />
                      {loops && (
                        <motion.span
                          className="absolute -left-[3px] top-0 w-1.5 h-1.5 rounded-full bg-[#F28C30] shadow-[0_0_10px_2px_rgba(242,140,48,0.7)]"
                          animate={{ y: [30, R - 30], opacity: [0, 1, 1, 0] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: n * 0.8 }}
                        />
                      )}
                    </div>
                    <span
                      className="absolute left-1/2 top-1/2"
                      style={{ transform: `rotate(${angle}deg) translateY(-${R}px) rotate(-${angle}deg)` }}
                    >
                      <motion.span
                        className="-translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-violet-100 bg-white/95 backdrop-blur pl-1.5 pr-3.5 py-1.5 text-[13px] font-semibold text-[#1B1650] shadow-[0_14px_30px_-14px_rgba(27,22,80,0.5)]"
                        animate={loops ? { rotate: -360 } : undefined}
                        transition={spin}
                      >
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6D28D9] to-[#2D5BE3] flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5 text-white" />
                        </span>
                        {label}
                      </motion.span>
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* hub */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute -inset-8 rounded-full bg-[#6D28D9]/25 blur-2xl" />
                <motion.span
                  className="absolute -inset-3 rounded-full opacity-90 [background:conic-gradient(from_0deg,#6D28D9,#2D5BE3,#F28C30,#6D28D9)]"
                  animate={loops ? { rotate: 360 } : undefined}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                />
                {loops &&
                  [0, 1].map((n) => (
                    <motion.span
                      key={n}
                      className="absolute -inset-3 rounded-full border border-violet-300"
                      animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: n * 1.5 }}
                    />
                  ))}
                <div className="relative w-[96px] h-[96px] rounded-[28px] bg-white border border-black/[0.06] shadow-[0_18px_40px_-14px_rgba(109,40,217,0.6)] flex items-center justify-center">
                  <img src="/pyhire-mark.png" alt="" className="w-14 h-14 object-contain" />
                </div>
              </div>
            </div>

            {/* AI suggests, people decide */}
            <motion.div
              className={`${CARD} right-3 top-3 flex items-center gap-2.5 px-3 py-2`}
              animate={loops ? { y: [0, 6, 0] } : undefined}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="flex -space-x-1.5">
                <Initials name="Sarah Jenkis" size="w-7 h-7 text-[8px]" shape="rounded-full" />
                <Initials name="David Ross" size="w-7 h-7 text-[8px]" shape="rounded-full" />
              </span>
              <span className="leading-tight">
                <span className="flex items-center gap-1 text-[12px] font-bold text-[#1B1650]">
                  <Sparkles className="w-3 h-3 text-[#F28C30]" /> AI suggests
                </span>
                <span className="block text-[10px] text-[#514D7A]">People decide</span>
              </span>
            </motion.div>

            {/* one timeline per candidate */}
            <motion.div
              className="absolute bottom-4 left-4 right-4 rounded-2xl bg-panel px-5 py-4 text-white shadow-[0_22px_46px_-18px_rgba(27,22,80,0.75)]"
              animate={loops ? { y: [0, 4, 0] } : undefined}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">One timeline per candidate</p>
                <span className="text-[10px] font-semibold text-[#FFB766]">{TIMELINE[at]}</span>
              </div>
              <div className="mt-3 flex items-center">
                {TIMELINE.map((t, n) => (
                  <div key={t} className="flex items-center flex-1 last:flex-none">
                    <span className="flex flex-col items-center gap-1.5">
                      <span className="relative">
                        {n === at && loops && <span className="absolute inset-0 rounded-full bg-[#A78BFA] animate-ping opacity-60" />}
                        <span
                          className={`relative w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300 ${
                            n <= step ? 'bg-gradient-to-br from-[#8B5CF6] to-[#2D5BE3] shadow-[0_0_14px_rgba(139,92,246,0.9)]' : 'bg-white/15'
                          }`}
                        >
                          {n <= step && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </span>
                      <span className={`text-[10px] ${n <= step ? 'text-white' : 'text-white/45'}`}>{t}</span>
                    </span>
                    {n < TIMELINE.length - 1 && (
                      <span className="mx-2 h-[3px] flex-1 rounded-full bg-white/15 overflow-hidden -mt-4">
                        <span className={`block h-full bg-gradient-to-r from-[#8B5CF6] to-[#60A5FA] transition-all duration-500 ${n < step ? 'w-full' : 'w-0'}`} />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </BeamBorder>
  );
}
