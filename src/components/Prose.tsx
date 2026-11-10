import { RichText } from './RichText';
import { slugifyHeading, type Block } from '../lib/content';

/**
 * Renders a `Block[]` as body copy.
 *
 * Extracted from CaseStudyDetail's private `CaseStudyBody` so the marketing
 * pages can carry real long-form prose without either re-implementing the
 * renderer or importing the case-study page. The two are intentionally the
 * same component: editorial copy and product copy should read alike.
 *
 * `size` trades vertical rhythm for density — `article` keeps the generous
 * measure a 2,000-word case study wants, `compact` tightens it for the
 * shorter runs that sit between other sections on a product page.
 */
export function Prose({
  blocks,
  size = 'compact',
  headingIds = false,
}: {
  blocks: Block[];
  size?: 'article' | 'compact';
  /** Emit slug ids on headings — only wanted where something links to them. */
  headingIds?: boolean;
}) {
  const article = size === 'article';
  const body = article
    ? 'text-[1.0625rem] text-[#4B5563] leading-[1.85] mb-6'
    : 'text-[1rem] text-[#4B5563] leading-[1.8] mb-5';

  return (
    <div className="max-w-none">
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2
              key={i}
              id={headingIds ? slugifyHeading(block.text) : undefined}
              className={`scroll-mt-28 font-bold text-[#111111] leading-snug tracking-tight first:mt-0 ${
                article
                  ? 'text-[1.5rem] lg:text-[1.75rem] mt-12 mb-5'
                  : 'text-[1.375rem] lg:text-[1.5rem] mt-10 mb-4'
              }`}
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === 'h3') {
          return (
            <h3
              key={i}
              id={headingIds ? slugifyHeading(block.text) : undefined}
              className={`scroll-mt-28 font-bold text-[#111111] leading-snug tracking-tight ${
                article ? 'text-[1.1875rem] lg:text-[1.3125rem] mt-9 mb-3' : 'text-[1.0625rem] lg:text-[1.125rem] mt-7 mb-2.5'
              }`}
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={i}
              className="my-7 border-l-4 border-[#6D28D9] bg-[#F5F9FF] rounded-r-[16px] pl-6 pr-6 py-5 text-[1.0625rem] text-[#111111] italic leading-relaxed"
            >
              <RichText text={block.text} />
            </blockquote>
          );
        }

        if (block.type === 'ul' || block.type === 'ol') {
          const Tag = block.type === 'ul' ? 'ul' : 'ol';
          return (
            <Tag key={i} className={article ? 'my-6 space-y-4' : 'my-5 space-y-3'}>
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className={`flex gap-3.5 text-[#4B5563] ${
                    article ? 'text-[1.0625rem] leading-[1.75]' : 'text-[1rem] leading-[1.7]'
                  }`}
                >
                  {block.type === 'ul' ? (
                    <span
                      className="mt-[0.65em] w-1.5 h-1.5 rounded-full bg-[#6D28D9] shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="shrink-0 w-7 h-7 rounded-full bg-violet-50 border border-violet-100 text-[#6D28D9] text-[13px] font-bold flex items-center justify-center mt-0.5">
                      {j + 1}
                    </span>
                  )}
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </Tag>
          );
        }

        return (
          <p key={i} className={body}>
            <RichText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
