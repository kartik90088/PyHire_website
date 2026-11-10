import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';
import { useSeo } from '../../lib/useSeo';
import { absoluteUrl } from '../../lib/site';
import { TRIAL_PATH } from '../../lib/routes';
import { SALES_PATH, plans } from '../../data/plans';
import { ClosingBand, Container, PageHero, bandPrimary, bandSecondary, useScrollTop } from '../../components/site/PageParts';
import { Eyebrow, OutlineButton, PANEL, PrimaryButton, SectionHeading } from '../../components/home/shared';

/**
 * Copy and figures verbatim from the PyHire website content document,
 * section 13 (prices from the in-app plan catalogue, 14 October 2026).
 * Two items there are flagged "confirm before publishing": the GST wording and
 * the trial card policy — check both with finance before going live.
 */

const faqs = [
  {
    q: 'Do I need a card to start the trial?',
    a: 'No. The trial runs for 15 days on the Free plan; choose a paid plan when you are ready.',
  },
  {
    q: 'What happens when the trial ends?',
    a: 'Your data is kept. The account is locked except for Billing until you choose a plan.',
  },
  {
    q: 'How are messages and calls charged?',
    a: 'From a prepaid credit wallet that you top up. Each email, SMS, WhatsApp message or call minute is deducted at the published rate, and failed sends are refunded.',
  },
  {
    q: 'Can I change plans?',
    a: 'Yes — upgrade at any time from the Billing page. Talk to us about moving to Enterprise or about a custom agreement.',
  },
  { q: 'Is there a setup fee?', a: 'No.' },
];

export function Pricing() {
  useScrollTop();
  useSeo({
    title: 'PyHire Pricing — Plans from ₹6,999 / month',
    description: 'Start free for 15 days. Starter ₹6,999, Pro ₹14,999 per month, Enterprise custom. No setup fee.',
    canonicalPath: '/pricing',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${absoluteUrl('/pricing')}#faq`,
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  });

  return (
    <main className="font-inter text-[#1B1650]">
      <PageHero
        eyebrow="Pricing"
        title="Simple plans. Start free."
        subtitle="Try PyHire free for 15 days, then choose the plan that fits your team. No setup fee."
        actions={
          <>
            <PrimaryButton to={TRIAL_PATH}>Start free trial</PrimaryButton>
            <OutlineButton to={SALES_PATH}>Talk to sales about Enterprise</OutlineButton>
          </>
        }
      />

      <section className="bg-white py-12 lg:py-16">
        <Container>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
            {plans.map((plan, i) => {
              const dark = plan.name === 'Enterprise';
              return (
                <motion.li
                  key={plan.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className={`${plan.name === 'Pro' ? 'beam ' : ''}rounded-[28px] p-7 flex flex-col border hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(91,33,182,0.45)] transition-[transform,box-shadow] duration-300 ${dark ? 'text-white border-transparent' : 'bg-white border-slate-200 hover:border-violet-200'}`}
                  style={dark ? { backgroundColor: PANEL } : undefined}
                >
                  <h2 className="font-display font-bold text-[1.5rem]">{plan.name}</h2>
                  <p className={`mt-1 text-[14px] leading-[1.5] min-h-[42px] ${dark ? 'text-violet-100' : 'text-slate-500'}`}>{plan.bestFor}</p>
                  <p className="mt-5 flex items-baseline gap-1.5">
                    <span className="font-display font-bold text-[2.5rem] leading-none tracking-[-0.03em]">{plan.price}</span>
                    {plan.period && <span className={`text-[15px] ${dark ? 'text-violet-100' : 'text-slate-500'}`}>{plan.period}</span>}
                  </p>
                  <p className={`mt-2 text-[13px] ${dark ? 'text-violet-100' : 'text-slate-500'}`}>Billing: {plan.billing}</p>

                  <Link
                    to={plan.cta.to}
                    className={`mt-6 inline-flex items-center justify-center rounded-2xl px-5 py-3 text-[15px] font-semibold text-center transition-all duration-200 hover:-translate-y-0.5 outline-none focus-visible:ring-2 ${
                      dark
                        ? 'bg-white text-[#1B1650] focus-visible:ring-white'
                        : 'bg-[#6D28D9] hover:bg-[#8B5CF6] text-white focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2'
                    }`}
                  >
                    {plan.cta.label}
                  </Link>

                  <dl className={`mt-7 pt-6 border-t space-y-2.5 ${dark ? 'border-white/20' : 'border-slate-100'}`}>
                    {plan.limits.map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-3 text-[14px]">
                        <dt className={dark ? 'text-violet-100' : 'text-slate-500'}>{label}</dt>
                        <dd className="font-semibold text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </motion.li>
              );
            })}
          </ul>
          <p className="mt-6 text-center text-[14px] text-slate-500">
            Prices exclude GST. Messages and calls are paid from a prepaid credit wallet at the published rates.
          </p>
        </Container>
      </section>

      <section className="py-12 lg:py-16 bg-[#F8F6FD]">
        <Container>
          <div className="text-center">
            <Eyebrow>Plans</Eyebrow>
            <SectionHeading className="mt-4">What each plan includes</SectionHeading>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {plans.map((plan) => (
              <div key={plan.name} className="rounded-[28px] bg-white border border-slate-200 p-7">
                <h3 className="font-display font-bold text-[1.25rem]">
                  {plan.name}
                  {plan.price !== 'Custom' && plan.name !== 'Free trial' && (
                    <span className="font-inter font-medium text-[14px] text-slate-500"> — {plan.price} {plan.period}</span>
                  )}
                  {plan.name === 'Free trial' && <span className="font-inter font-medium text-[14px] text-slate-500"> — 15 days</span>}
                  {plan.price === 'Custom' && <span className="font-inter font-medium text-[14px] text-slate-500"> — custom pricing</span>}
                </h3>
                {plan.includesIntro && <p className="mt-3 text-[14px] font-semibold text-violet-700">{plan.includesIntro}</p>}
                <ul className="mt-4 space-y-2.5">
                  {plan.includes.map((item, n) => (
                    <motion.li
                      key={item}
                      className="flex gap-2.5 text-[15px] leading-[1.5] text-[#3A3766]"
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.35, delay: n * 0.05 }}
                    >
                      <Check className="w-4 h-4 text-[#6D28D9] shrink-0 mt-1" aria-hidden="true" /> {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <Container className="max-w-3xl">
          <div className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            <SectionHeading className="mt-4">Pricing FAQ</SectionHeading>
          </div>
          <FaqList items={faqs} />
        </Container>
      </section>

      <ClosingBand text="Simple plans. Start free.">
        <Link to={TRIAL_PATH} className={bandPrimary}>Start free trial</Link>
        <Link to={SALES_PATH} className={bandSecondary}>Talk to sales about Enterprise</Link>
      </ClosingBand>
    </main>
  );
}

function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <h3>
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left font-semibold text-[17px] text-[#1B1650] outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded"
              >
                {item.q}
                <ChevronDown className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
            </h3>
            {/* Height animates open/closed; closed answers stay in the DOM but are
                inert and hidden from assistive tech. */}
            <motion.div
              id={`faq-a-${i}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
              aria-hidden={!isOpen}
              inert={!isOpen}
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="pb-5 text-[16px] leading-[1.7] text-[#514D7A]">{item.a}</p>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
}
