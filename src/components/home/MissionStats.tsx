import { motion } from 'motion/react';
import { DEMO_PATH } from '../../lib/routes';
import { missionStats } from '../Mission';
import { Cloud, CountUp, Eyebrow, PrimaryButton, SectionHeading } from './shared';

/** Mission statement beside the published KPI cards, which count up on entry. */
export function MissionStats() {
  return (
    <section className="relative bg-white py-12 lg:py-16 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow>Our Mission</Eyebrow>
          <SectionHeading className="mt-4">
            To make hiring products radically simple, powerful, and accessible.
          </SectionHeading>
          <p className="mt-6 text-[1.125rem] leading-[1.7] text-[#514D7A] max-w-xl">
            Whether you're supercharging your spreadsheets or searching across your candidate database,
            our tools empower every recruiter to make faster, more confident decisions.
          </p>
          <PrimaryButton to={DEMO_PATH} className="mt-9">Book a Demo</PrimaryButton>
        </motion.div>

        <div className="relative">
          <Cloud className="-top-10 right-10 hidden sm:block" />
          <ul className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
            {missionStats.map((stat, i) => (
              <motion.li
                key={stat.value}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-[32px] bg-[#F5F2EF] p-8 flex flex-col justify-end min-h-[190px] ${
                  i % 2 === 1 ? 'sm:translate-y-10' : ''
                } ${i === missionStats.length - 1 ? 'sm:col-span-2 sm:translate-y-0 sm:mt-10' : ''}`}
              >
                <p className="font-display font-bold text-[3rem] leading-none tracking-[-0.03em] text-[#1B1650]">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-3 text-[15px] leading-[1.5] text-[#514D7A] whitespace-pre-line">{stat.label}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
