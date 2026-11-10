import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { complianceBadges } from '../Compliance';
import { Eyebrow, SectionHeading } from './shared';

/**
 * Compliance badges in a single bordered, column-divided card. Status wording
 * comes from complianceBadges unchanged — it is deliberately hedged.
 */
export function ComplianceGrid() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>Compliance &amp; Security</Eyebrow>
          <SectionHeading className="mt-4">Built to enterprise hiring standards.</SectionHeading>
          <p className="mt-5 text-[1.125rem] leading-[1.7] text-[#514D7A]">
            Data governance is not an afterthought. Every call, every profile and every piece of
            candidate data sits inside a compliant pipeline.
          </p>
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[32px] border border-slate-200 overflow-hidden divide-y sm:divide-y-0 divide-slate-200"
        >
          {complianceBadges.map((badge, i) => (
            <li
              key={badge.title}
              className={`p-8 flex flex-col min-h-[200px] border-slate-200 ${i > 0 ? 'lg:border-l' : ''} ${
                i % 2 === 1 ? 'sm:border-l' : ''
              } ${i >= 2 ? 'sm:border-t lg:border-t-0' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 text-[#6D28D9] flex items-center justify-center">
                  {badge.icon}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-[13px] font-medium text-slate-700">
                  {badge.title === 'HIPAA' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />}
                  {badge.desc}
                </span>
              </div>
              <p className="mt-auto pt-6 font-display font-bold text-[2.5rem] leading-none tracking-[-0.03em] text-[#1B1650]">
                {badge.title}
              </p>
              <p className="mt-3 text-[12px] font-semibold tracking-[0.2em] uppercase text-slate-400">
                Enterprise-grade compliance
              </p>
            </li>
          ))}
        </motion.ul>

        <div className="mt-8 text-center">
          <Link
            to="/compliance-security"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#5B21B6] hover:text-[#9A3412] outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded"
          >
            Explore Compliance &amp; Security <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
