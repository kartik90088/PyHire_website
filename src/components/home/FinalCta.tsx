import { motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { DEMO_PATH, TRIAL_PATH } from '../../lib/routes';
import { DemoShowcase } from './DemoShowcase';
import { CREAM, Cloud, Eyebrow, Hills, OutlineButton, PrimaryButton, SectionHeading } from './shared';

/* Final call to action — copy verbatim from the PyHire website content document, section 2. */
const highlights = ['No card needed for the trial', 'Set up in a day', 'Built for Indian recruiting teams'];

/** Closing call to action; the demo-booking illustration rises out of the hills into the footer. */
export function FinalCta() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden pt-14 lg:pt-16" style={{ backgroundColor: CREAM }}>
      <Cloud className="right-[-30px] bottom-[45%] hidden md:block" tone="bg-violet-100" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <Eyebrow>Get started</Eyebrow>
        <SectionHeading className="mt-4">See PyHire on your own roles.</SectionHeading>
        <p className="mt-5 text-[1.125rem] leading-[1.7] text-[#514D7A]">
          Book a 30-minute demo and we will walk through PyHire with one of your open positions — or start the free
          trial and set it up yourself.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <PrimaryButton to={DEMO_PATH} className="w-full sm:w-auto">Book a demo</PrimaryButton>
          <OutlineButton to={TRIAL_PATH} className="w-full sm:w-auto">Start free trial</OutlineButton>
        </div>
        <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] text-[#514D7A]">
          {highlights.map((h) => (
            <li key={h} className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" /> {h}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-10 h-[240px] md:h-[520px]">
        <Hills className="absolute inset-x-0 bottom-0 w-full h-full" />
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex absolute inset-x-0 top-0 justify-center px-6"
        >
          {/* Gentle idle float once it has risen into place. */}
          {/* w-full + max width so the showcase can shrink to the screen on tablets. */}
          <motion.div
            className="w-full max-w-[1000px]"
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <DemoShowcase />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
