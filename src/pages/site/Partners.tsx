import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { LayoutDashboard, Palette, ServerCog } from 'lucide-react';
import { useSeo } from '../../lib/useSeo';
import { ClosingBand, Container, PageHero, bandPrimary, useScrollTop } from '../../components/site/PageParts';
import { PrimaryButton } from '../../components/home/shared';
import { PartnerVisual } from '../../components/site/PageVisuals';

/**
 * Copy verbatim from the PyHire website content document, section 14.
 * Commission rates and partner terms are "confirm before publishing", so they
 * are not stated here.
 */
const PARTNER_PATH = '/contact?topic=partner';

const points = [
  { icon: LayoutDashboard, text: 'A partner portal with your clients, their revenue and your commission.' },
  { icon: Palette, text: 'White-label branding: your product name, logo and colours on the login page and inside the app.' },
  { icon: ServerCog, text: 'PyHire runs the platform, the updates and the infrastructure.' },
];

export function Partners() {
  useScrollTop();
  useSeo({
    title: 'Resell & White-label PyHire | Partner Programme',
    description: 'Offer PyHire to your clients under your own brand and earn commission on every subscription.',
    canonicalPath: '/partners',
  });

  return (
    <main className="font-inter text-[#1B1650]">
      <PageHero
        eyebrow="Partners"
        visual={<PartnerVisual />}
        title="Sell PyHire under your own name."
        subtitle="Join the PyHire channel partner programme: bring PyHire to your clients, earn commission on every subscription and offer it with your own branding."
        actions={<PrimaryButton to={PARTNER_PATH}>Become a partner</PrimaryButton>}
      />

      <section className="bg-white py-12 lg:py-16">
        <Container className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {points.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="rounded-[32px] bg-[#EAE5FF] p-8 min-h-[190px] flex flex-col"
            >
              <span className="w-12 h-12 rounded-2xl bg-white/70 text-[#5B21B6] flex items-center justify-center">
                <Icon className="w-6 h-6" aria-hidden="true" />
              </span>
              <p className="mt-auto pt-6 font-display font-semibold text-[1.35rem] leading-[1.3] tracking-[-0.01em] text-[#1B1650]">{text}</p>
            </motion.div>
          ))}
        </Container>
      </section>

      <ClosingBand text="Sell PyHire under your own name.">
        <Link to={PARTNER_PATH} className={bandPrimary}>Become a partner</Link>
      </ClosingBand>
    </main>
  );
}
