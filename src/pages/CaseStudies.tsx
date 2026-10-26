import { useEffect } from 'react';
import { CaseStudiesHero } from './CaseStudiesHero';
import { CaseStudiesList } from './CaseStudiesList';
import { caseStudies } from '../data/caseStudies';
import { useSeo } from '../lib/useSeo';
import { absoluteUrl } from '../lib/site';

export function CaseStudies() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSeo({
    title: 'Case Studies — Success stories of Hiring with PyHire',
    description:
      'Discover how organizations simplify hiring, improve collaboration, and build winning teams with PyHire.',
    canonicalPath: '/case-studies',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Case Studies',
            item: absoluteUrl('/case-studies'),
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': `${absoluteUrl('/case-studies')}#list`,
        name: 'PyHire Case Studies',
        numberOfItems: caseStudies.length,
        itemListElement: caseStudies.map((study, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: study.title,
          image: study.image,
          // Each entry now resolves to its own page — previously the list named
          // the studies without ever linking them.
          url: absoluteUrl(`/case-studies/${study.slug}`),
        })),
      },
    ],
  });

  return (
    <main className="bg-white min-h-screen font-sans">
      <CaseStudiesHero />
      <CaseStudiesList />
    </main>
  );
}
