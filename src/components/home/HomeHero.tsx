import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { DEMO_PATH, TRIAL_PATH } from '../../lib/routes';
import { HiringBoard, JobsCard, MatchesCard } from './HiringBoard';
import { CREAM, Cloud, Eyebrow, Hills, OutlineButton, PrimaryButton, useIsDesktop } from './shared';

/**
 * Hero. On desktop the section is 260vh tall with a sticky stage: as the
 * visitor scrolls, the copy lifts away, the two tilted preview cards fly in
 * and the full pipeline board rises, flattens and "pops" into place over the
 * hills. Phones and reduced-motion visitors get a static layout.
 */
export function HomeHero() {
  const isDesktop = useIsDesktop();
  const reduce = useReducedMotion();
  const animated = isDesktop && !reduce;

  return (
    <section style={{ backgroundColor: CREAM }} className="relative">
      {animated ? <AnimatedStage /> : <StaticStage showBoard={isDesktop} />}
    </section>
  );
}

/** Hero copy verbatim from the PyHire website content document, section 2. */
function HeroCopy() {
  return (
    <div className="max-w-5xl mx-auto px-4 text-center">
      <Eyebrow>The AI-powered applicant tracking system</Eyebrow>
      <h1 className="mt-5 font-display font-bold text-[2.75rem] sm:text-[4rem] lg:text-[4.5rem] leading-[1.05] tracking-[-0.05em] text-[#1B1650]">
        Hire faster, from one place.
      </h1>
      <p className="mt-6 text-[1.125rem] sm:text-[1.4rem] leading-[1.6] text-[#514D7A] max-w-4xl mx-auto">
        PyHire is the AI-powered applicant tracking system that takes a role from{' '}
        <span className="rounded-md bg-violet-100 px-1.5 text-violet-700">requisition to joining day</span> — job
        descriptions, candidate matching, interviews, offers, client and vendor work, all in one workspace.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <PrimaryButton to={DEMO_PATH} className="w-full sm:w-auto">Book a demo</PrimaryButton>
        <OutlineButton to={TRIAL_PATH} className="w-full sm:w-auto">Start your 15-day free trial</OutlineButton>
      </div>
      <p className="mt-5 text-[14px] text-slate-500">
        No card needed for the trial · Set up in a day · Built for Indian recruiting teams
      </p>
    </div>
  );
}

/**
 * Clamped linear map of scroll progress. Written as a function transform on
 * purpose: Motion hands plain range-to-range opacity transforms to the native
 * ScrollTimeline, which mis-maps this sticky stage (opacity drifted to ~0.7 at
 * the top of the page). Function transforms always run in JS.
 */
function useRange(p: MotionValue<number>, [a, b]: [number, number], [from, to]: [number, number]) {
  return useTransform(p, (v) => {
    const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
    return from + (to - from) * t;
  });
}

function AnimatedStage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [popped, setPopped] = useState(false);

  useMotionValueEvent(p, 'change', (v) => {
    if (v >= 0.72 && !popped) setPopped(true);
    if (v < 0.6 && popped) setPopped(false);
  });

  const copyY = useRange(p, [0, 0.35], [0, -180]);
  const copyOpacity = useRange(p, [0, 0.25], [1, 0]);
  const hillsY = useRange(p, [0, 1], [0, -40]);

  const leftX = useRange(p, [0, 0.5], [0, 280]);
  const leftY = useRange(p, [0, 0.5], [0, -200]);
  const leftRotate = useRange(p, [0, 0.5], [-14, 0]);
  const rightX = useRange(p, [0, 0.5], [0, -280]);
  const rightY = useRange(p, [0, 0.5], [0, -220]);
  const rightRotate = useRange(p, [0, 0.5], [12, 0]);
  const cardsOpacity = useRange(p, [0.4, 0.55], [1, 0]);

  const boardOpacity = useRange(p, [0.35, 0.55], [0, 1]);
  const boardY = useRange(p, [0.3, 0.72], [240, 0]);
  const boardScale = useRange(p, [0.3, 0.72], [0.86, 1]);
  const boardRotateX = useRange(p, [0.3, 0.72], [28, 0]);

  return (
    <div ref={ref} className="relative h-[210vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Cloud className="left-[4%] top-[30%]" />
        <Cloud className="right-[8%] top-[22%] scale-75" />

        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-20 pt-36">
          <HeroCopy />
        </motion.div>

        <motion.div style={{ y: hillsY }} className="absolute inset-x-0 bottom-0 h-[52vh]">
          <Hills className="w-full h-full" />
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={{ x: leftX, y: leftY, rotate: leftRotate, opacity: cardsOpacity }}
          className="absolute z-10 left-[5%] bottom-[6vh]"
        >
          <JobsCard />
        </motion.div>
        <motion.div
          aria-hidden="true"
          style={{ x: rightX, y: rightY, rotate: rightRotate, opacity: cardsOpacity }}
          className="absolute z-10 right-[5%] bottom-[10vh]"
        >
          <MatchesCard />
        </motion.div>

        <div className="absolute inset-x-0 top-[54%] -translate-y-1/2 z-30 flex justify-center px-6 [perspective:1400px]">
          <motion.div
            style={{ opacity: boardOpacity, y: boardY, scale: boardScale, rotateX: boardRotateX }}
            className="opacity-0 origin-bottom"
          >
            <HiringBoard popped={popped} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StaticStage({ showBoard }: { showBoard: boolean }) {
  return (
    <div className="relative overflow-hidden pt-28 lg:pt-32">
      <HeroCopy />
      {showBoard ? (
        <div className="relative mt-10 pb-10 flex justify-center px-6">
          <Hills className="absolute inset-x-0 bottom-0 w-full h-[60%]" />
          <div className="relative">
            <HiringBoard />
          </div>
        </div>
      ) : (
        <div aria-hidden="true" className="relative mt-12 h-[400px]">
          <Hills className="absolute inset-x-0 bottom-0 w-full h-[75%]" />
          <div className="absolute left-3 top-4 -rotate-6 scale-[0.54] sm:scale-75 origin-top-left">
            <JobsCard />
          </div>
          <div className="absolute right-3 top-20 rotate-6 scale-[0.54] sm:scale-75 origin-top-right">
            <MatchesCard />
          </div>
        </div>
      )}
    </div>
  );
}
