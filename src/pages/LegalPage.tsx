import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Prose } from '../components/Prose';
import { extractHeadings } from '../lib/content';
import { absoluteUrl } from '../lib/site';
import { useSeo } from '../lib/useSeo';
import { DEMO_PATH } from '../lib/routes';
import type { LegalDocument } from '../data/legal';

/**
 * Shared layout for the Privacy Policy and Terms of Use.
 *
 * Deliberately plain: no marquees, no scroll-reveal animations. These pages get
 * read when someone is deciding whether to trust us with their details, or when
 * a procurement reviewer is checking a box — both want the text visible
 * immediately, not fading in on scroll.
 *
 * Both documents are indexable. A privacy policy that search engines cannot see
 * is no use to the compliance reviewer trying to find it.
 */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [doc.slug]);

  const headings = extractHeadings(doc.body);

  useSeo({
    title: `${doc.seoTitle} | PyHire`,
    description: doc.description,
    canonicalPath: `/${doc.slug}`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: doc.title,
        description: doc.description,
        url: absoluteUrl(`/${doc.slug}`),
        dateModified: doc.lastUpdatedIso,
        inLanguage: 'en',
        isPartOf: { '@id': `${absoluteUrl('/')}#website` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: doc.title, item: absoluteUrl(`/${doc.slug}`) },
        ],
      },
    ],
  });

  return (
    <main className="pt-28 pb-14 bg-white font-sans">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-[13px] text-slate-500">
            <li>
              <Link to="/" className="hover:text-[#6D28D9] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li className="text-slate-700 font-medium">{doc.title}</li>
          </ol>
        </nav>

        <header className="mb-10 pb-10 border-b border-slate-100">
          <h1 className="text-[2.5rem] lg:text-[3.25rem] font-bold text-[#111111] leading-[1.1] tracking-tight mb-5">
            {doc.title}
          </h1>
          <p className="text-[1.125rem] text-[#4B5563] leading-relaxed max-w-3xl mb-6">{doc.intro}</p>
          <p className="text-[14px] text-slate-500">
            Last updated{' '}
            <time dateTime={doc.lastUpdatedIso} className="font-medium text-slate-700">
              {doc.lastUpdated}
            </time>
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Contents — sticky on desktop, inline on mobile */}
          <aside className="lg:col-span-4 xl:col-span-3 order-first lg:order-last">
            <nav
              aria-label="On this page"
              className="lg:sticky lg:top-28 rounded-[20px] border border-slate-100 bg-[#FAFAFA] p-6"
            >
              <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-4">
                On this page
              </p>
              <ul className="space-y-2.5">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="block text-[14px] text-slate-600 leading-snug hover:text-[#6D28D9] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="lg:col-span-8 xl:col-span-9">
            <Prose blocks={doc.body} size="article" headingIds />

            <div className="mt-8 pt-10 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
              <p className="text-[15px] text-slate-600">
                Still have a question about this?{' '}
                <a
                  href="mailto:support@veriright.com"
                  className="font-bold text-[#6D28D9] hover:underline"
                >
                  Email our team
                </a>
                .
              </p>
              <Link
                to={DEMO_PATH}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full font-bold text-[15px] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2"
              >
                Book a Demo <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
