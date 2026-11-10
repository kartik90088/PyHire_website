import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { CheckCircle, FileText, Sparkles, UserPlus, Check } from 'lucide-react';
import { Eyebrow, SectionHeading, useIsDesktop } from './shared';

/**
 * "How it works" — the four steps verbatim from the PyHire website content
 * document, section 2. `tag` is a short label for the centre illustration,
 * drawn from the same step's copy.
 */
const steps = [
  {
    title: 'Open the role',
    desc: 'Raise a requisition, get it approved and turn it into a job description — or upload an existing JD and let PyHire read it.',
    tag: 'Requisition approved',
    icon: FileText,
  },
  {
    title: 'Fill the pipeline',
    desc: 'Bulk-upload CVs, publish to your careers page, take vendor submissions and inbound applications. Duplicates are caught automatically.',
    tag: 'Duplicates caught',
    icon: UserPlus,
  },
  {
    title: 'Shortlist and talk',
    desc: 'AI matching ranks candidates for the role. Call, email or WhatsApp them from the profile; screening questions and campaigns do the first pass.',
    tag: 'Ranked by AI matching',
    icon: Sparkles,
  },
  {
    title: 'Interview, offer, join',
    desc: 'Schedule interviews with reminders, collect structured feedback, release offer letters the candidate accepts online, and track documents to joining day.',
    tag: 'Offer accepted online',
    icon: CheckCircle,
  },
];

const ROW = 112; // px between centre rows — side steps align to the same grid
const ROW_H = 72;

export function HowItWorks() {
  const isDesktop = useIsDesktop();
  const reduce = useReducedMotion();

  return (
    <section className="bg-white pt-12 lg:pt-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <Eyebrow>Four steps</Eyebrow>
        <SectionHeading className="mt-4">How it works</SectionHeading>
      </div>
      {isDesktop && !reduce ? <PinnedFlow /> : <StepList />}
    </section>
  );
}

function PinnedFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const height = steps.length * ROW + 40;
  /* Not pinned: pinning leaves a blank band the length of the pin. Instead the
     steps light up as the flow travels up the screen — step 1 as it enters,
     the last by the time it is near the top — at its natural height. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 60%'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    if (next !== active) setActive(next);
  });

  return (
    <div ref={ref} className="relative mt-8">
      <div>
        <div
          className="relative w-full max-w-[1320px] mx-auto px-6 grid grid-cols-[minmax(0,1fr)_minmax(0,500px)_minmax(0,1fr)] gap-10"
          style={{ height }}
        >
          <SideColumn side="left" active={active} />

          {/* Centre: the flow builds one row per step */}
          <div className="relative rounded-[40px] bg-[#EEEAFE] px-6 py-5" aria-hidden="true">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const done = i <= active;
              return (
                <motion.div
                  key={step.title}
                  initial={false}
                  animate={done ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-6 flex items-center gap-3 rounded-2xl bg-white border border-violet-100 px-4 shadow-[0_6px_18px_-10px_rgba(91,33,182,0.35)]"
                  style={{ top: 20 + i * ROW + (ROW - ROW_H) / 2 - 24, height: ROW_H }}
                >
                  <span className="w-10 h-10 rounded-xl bg-[#6D28D9] text-white flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] font-bold text-violet-700">STEP {String(i + 1).padStart(2, '0')}</span>
                    <span className="block font-semibold text-[15px] text-[#1B1650] truncate">{step.tag}</span>
                  </span>
                  {i < active && (
                    <span className="ml-auto w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          <SideColumn side="right" active={active} />
        </div>
      </div>
    </div>
  );
}

function SideColumn({ side, active }: { side: 'left' | 'right'; active: number }) {
  const left = side === 'left';
  return (
    <ol className="relative" aria-label={left ? 'Steps 1, 3, 5, 7 and 9' : 'Steps 2, 4, 6 and 8'}>
      {steps.map((step, i) => {
        if ((i % 2 === 0) !== left) return null;
        const isActive = i === active;
        return (
          <li
            key={step.title}
            className={`absolute w-full max-w-[360px] rounded-[24px] p-5 transition-all duration-500 ${
              left ? 'right-0 text-right' : 'left-0 text-left'
            } ${isActive ? 'bg-[#F5F2EF]' : 'bg-transparent'} ${i > active ? 'opacity-25' : 'opacity-100'}`}
            style={{ top: 20 + i * ROW - 24 }}
          >
            <p className="text-[12px] font-bold tracking-[0.2em] text-violet-700">STEP {String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-1 font-display font-bold text-[1.4rem] leading-tight text-[#1B1650]">{step.title}</h3>
            <p className="mt-1.5 text-[15px] leading-[1.5] text-[#514D7A]">{step.desc}</p>
            {isActive && (
              <svg
                aria-hidden="true"
                viewBox="0 0 80 40"
                className={`absolute top-1/2 w-16 h-8 text-slate-500 ${left ? '-right-14 ' : '-left-14 -scale-x-100'}`}
              >
                <motion.path
                  d="M4 8 C 30 4, 52 14, 70 30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <path d="M62 31 L71 31 L69 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function StepList() {
  return (
    <ol className="mt-8 max-w-2xl mx-auto px-4 space-y-3">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
            className="flex gap-4 rounded-[24px] bg-[#F5F2EF] p-5"
          >
            <span className="w-10 h-10 rounded-xl bg-[#6D28D9] text-white flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[12px] font-bold tracking-[0.2em] text-violet-700">STEP {String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-display font-bold text-[1.2rem] text-[#1B1650]">{step.title}</h3>
              <p className="mt-1 text-[15px] leading-[1.5] text-[#514D7A]">{step.desc}</p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
