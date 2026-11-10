import { Link } from 'react-router-dom';
import { useSeo } from '../../lib/useSeo';
import { absoluteUrl } from '../../lib/site';
import type { ProductPageContent } from '../../data/productPages';
import { ClosingBand, Container, DefaultActions, FeatureRows, PageHero, bandPrimary, bandSecondary, useScrollTop } from '../../components/site/PageParts';
import { HeroDash, ProductBody, hasHeroDash } from '../../components/site/ProductLayouts';
import { ProductMockup } from '../../components/site/Mockups';
import { AppWindow } from '../../components/medic/AppWindow';
import { MoreProducts } from '../../components/site/MoreProducts';
import { DEMO_PATH } from '../../lib/routes';

/**
 * One template for all eight product pages; copy lives in data/productPages.ts.
 * Hero: word-by-word headline, floating mockup with the page's first feature
 * headings as chips. Body: a scroll story — sticky contents with a progress
 * rail on the left, revealing feature cards on the right.
 */
/** Pages whose hero is centred with the screen beneath (the rest are split). */
const CENTERED: ProductPageContent['mockup'][] = ['ai', 'careers'];

export function ProductPage({ page }: { page: ProductPageContent }) {
  useScrollTop();
  useSeo({
    title: page.seoTitle,
    description: page.metaDescription,
    canonicalPath: page.path,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: page.eyebrow, item: absoluteUrl(page.path) },
        ],
      },
    ],
  });

  return (
    <main className="font-inter text-[#1B1650]">
      <PageHero
        eyebrow={page.eyebrow}
        title={page.headline}
        subtitle={page.subheadline}
        intro={page.intro}
        actions={<DefaultActions secondary={page.secondaryCta} />}
        centered={CENTERED.includes(page.mockup)}
        visual={
          hasHeroDash(page.mockup) ? (
            <HeroDash page={page} wide={CENTERED.includes(page.mockup)} />
          ) : (
            <AppWindow title={page.eyebrow} className="w-[560px] max-w-full">
              <div className="flex justify-center"><ProductMockup kind={page.mockup} /></div>
            </AppWindow>
          )
        }
      />

      {page.mockup === 'jobs' ? <FeatureRows blocks={page.blocks} /> : <ProductBody page={page} />}

      <ClosingBand text={page.closing}>
        {page.secondaryCta && (
          <>
            <Link to={DEMO_PATH} className={bandPrimary}>Book a demo</Link>
            <Link to={page.secondaryCta.to} className={bandSecondary}>{page.secondaryCta.label}</Link>
          </>
        )}
      </ClosingBand>

      <section className="bg-white pt-6 pb-12">
        <Container>
          <MoreProducts currentPath={page.path} />
        </Container>
      </section>
    </main>
  );
}
