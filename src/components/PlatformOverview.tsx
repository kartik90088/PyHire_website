import { Prose } from './Prose';
import type { Block } from '../lib/content';

/**
 * Long-form explanation of the platform, for the home page.
 *
 * The home page reached the Features grid without ever stating in prose what
 * PyHire is or who it is for — everything above the fold was headline copy and
 * a stat row. This section carries that.
 */

const overviewBlocks: Block[] = [
  {
    type: 'p',
    text: "PyHire is an AI-powered Recruitment Operating System. It covers the complete hiring lifecycle — job creation, candidate sourcing, AI matching, interviews, offers and analytics — inside one platform, for recruitment agencies, staffing firms and in-house HR teams.",
  },
  {
    type: 'p',
    text: "The reason that matters is not feature count. It is that hiring breaks at the joins. A candidate cools off in the days between an interview and a decision. A vendor's commission is reconciled at month end from records that were never connected to each other. A hiring manager asks how their role is progressing and someone has to go and find out. None of those are hard problems individually; they persist because the information needed to solve them lives in different places.",
  },
  {
    type: 'p',
    text: "**In PyHire, a requisition raised at the start is the same record that candidates are matched to, that interviews are scheduled against, and that reporting later measures.** Nothing is re-keyed between stages, because there are no stages sitting in separate systems.",
  },
  {
    type: 'p',
    text: "The AI handles the volume work — reading and parsing resumes, ranking applicants against the requirements in a job description, drafting descriptions, chasing follow-ups that would otherwise be forgotten. What that returns is recruiter attention, spent on interviews and decisions instead of spreadsheets and inboxes.",
  },
];

export function PlatformOverview() {
  return (
    <section className="py-10 lg:py-16 bg-white border-t border-[#F2F2F2]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="w-full lg:w-[58%]">
            <span className="text-[#f97316] font-bold text-[13px] uppercase tracking-wider mb-3 block">
              The Platform
            </span>
            <h2 className="text-[2rem] lg:text-[2.75rem] font-bold text-[#111111] leading-[1.15] tracking-tight mb-6">
              What PyHire is, and why one platform matters
            </h2>
            <Prose blocks={overviewBlocks} />
          </div>

          <aside className="w-full lg:w-[42%]">
            <div className="lg:sticky lg:top-28 bg-[#FFFCF4] rounded-[28px] p-7 lg:p-8 border border-orange-50">
              <h3 className="text-[15px] font-bold text-[#111111] uppercase tracking-wider mb-6">
                Built for
              </h3>
              <dl className="flex flex-col gap-5">
                {[
                  {
                    label: 'Recruitment agencies',
                    value: 'Multi-client requisition and submittal management, with each client separated by permission.',
                  },
                  {
                    label: 'Staffing firms',
                    value: 'Vendor collaboration, contract terms and placement tracking alongside the recruitment work.',
                  },
                  {
                    label: 'In-house HR and TA teams',
                    value: 'Pipeline automation, recruiter productivity and hiring analytics in a single system.',
                  },
                  {
                    label: 'Enterprise buyers',
                    value: 'Role-based access, complete audit trails and DPDPA/GDPR-aligned data governance.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-orange-100/70 last:border-0 pb-5 last:pb-0">
                    <dt className="text-[13px] font-bold text-[#f97316] uppercase tracking-wide mb-1.5">
                      {item.label}
                    </dt>
                    <dd className="text-[15px] text-[#4B5563] leading-relaxed">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
