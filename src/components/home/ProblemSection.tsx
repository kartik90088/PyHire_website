import { motion, useReducedMotion } from 'motion/react';
import { FileSpreadsheet, FolderOpen, Mail, MessageCircle, Phone, PhoneCall, Send, Sparkles, MessageSquareText } from 'lucide-react';
import { Eyebrow, SectionHeading } from './shared';

/**
 * "The problem" — copy verbatim from the PyHire website content document,
 * section 2. The illustration contrasts the scattered tools the copy lists
 * with PyHire's single candidate timeline (Equip's without/with frame).
 */

const scattered = [
  { icon: Mail, label: 'JDs in email', className: 'left-[6%] top-[32%]', rotate: -6 },
  { icon: FolderOpen, label: 'CVs in a shared drive', className: 'right-[5%] top-[45%]', rotate: 5 },
  { icon: Phone, label: 'Calls on personal phones', className: 'left-[4%] top-[58%]', rotate: 4 },
  { icon: MessageCircle, label: 'Feedback on WhatsApp', className: 'right-[4%] top-[71%]', rotate: -5 },
  { icon: FileSpreadsheet, label: 'A status spreadsheet', className: 'left-[12%] bottom-[4%]', rotate: -3 },
];

const timeline = [
  { icon: Send, text: 'Email sent · Interview invite' },
  { icon: MessageSquareText, text: 'WhatsApp reply · “Confirmed”' },
  { icon: PhoneCall, text: 'Call logged · Outcome recorded' },
  { icon: Sparkles, text: 'Feedback in · Moved to offer' },
];

export function ProblemSection() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-white py-12 lg:py-16 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow>The problem</Eyebrow>
          <SectionHeading className="mt-4">Recruiting shouldn’t need six tools and a spreadsheet.</SectionHeading>
          <p className="mt-6 text-[1.125rem] leading-[1.75] text-[#514D7A]">
            Job descriptions live in email. CVs pile up in a shared drive. Candidate calls happen on personal phones,
            interview feedback arrives on WhatsApp, and the weekly status report is out of date before it is sent.
            Good candidates slip through and nobody can say where the time went.
          </p>
          <p className="mt-5 text-[1.125rem] leading-[1.75] text-[#1B1650] font-medium">
            PyHire puts every step — and every conversation — on one timeline per candidate and one dashboard per team.
          </p>
        </motion.div>

        <div aria-hidden="true" className="grid grid-cols-1 sm:grid-cols-2 rounded-[32px] overflow-hidden border border-slate-200">
          {/* Without */}
          <div className="relative min-h-[400px] bg-[#F3F1EE] p-6">
            <span className="inline-block rounded-xl bg-panel px-4 py-2 font-display font-bold text-[17px] text-white">Today</span>
            <p className="mt-2 text-[14px] text-slate-500">Six tools that don’t talk to each other</p>
            {scattered.map(({ icon: Icon, label, className, rotate }, i) => (
              <motion.span
                key={label}
                className={`absolute ${className} inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-[13px] font-medium text-slate-700 shadow-sm border border-black/5 whitespace-nowrap`}
                style={{ rotate }}
                animate={reduce ? undefined : { y: [0, i % 2 ? -8 : 8, 0], rotate: [rotate, rotate * -0.6, rotate] }}
                transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Icon className="w-4 h-4 text-slate-500" /> {label}
              </motion.span>
            ))}
          </div>

          {/* With PyHire */}
          <div className="relative min-h-[400px] bg-[#EEEAFE] p-6 sm:border-l border-t sm:border-t-0 border-slate-200">
            <span className="inline-block rounded-xl bg-[#6D28D9] px-4 py-2 font-display font-bold text-[17px] text-white">With PyHire</span>
            <p className="mt-2 text-[14px] text-slate-600">One timeline per candidate</p>
            <ol className="mt-6 relative pl-6 before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-px before:bg-violet-200">
              {timeline.map(({ icon: Icon, text }, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.15 }}
                  className="relative mb-3 last:mb-0"
                >
                  <span className="absolute -left-6 top-2.5 w-[19px] h-[19px] rounded-full bg-white border-2 border-[#6D28D9]" />
                  <span className="flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm border border-violet-100">
                    <Icon className="w-4 h-4 text-[#6D28D9] shrink-0" /> {text}
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
