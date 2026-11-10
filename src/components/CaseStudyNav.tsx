import { useEffect, useState } from 'react';
import { Check, List } from 'lucide-react';

/**
 * Key takeaways, shown directly under the deck line.
 *
 * The case studies run 1,000–1,800 words, and their outcome statements sit two
 * thirds of the way down. Surfacing them above the fold gives both readers and
 * extraction engines a dense, self-contained summary without re-authoring
 * anything — the bullets are the document's own `h3` statements.
 */
export function KeyTakeaways({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <aside
      aria-labelledby="key-takeaways-heading"
      data-speakable="takeaways"
      className="mt-10 bg-[#F5F9FF] border border-violet-100 rounded-[24px] p-6 sm:p-8"
    >
      <h2
        id="key-takeaways-heading"
        className="text-[12px] font-bold text-[#6D28D9] tracking-wider uppercase mb-5"
      >
        Key takeaways
      </h2>
      <ul className="space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] text-[#374151] leading-relaxed">
            <Check
              className="w-[18px] h-[18px] mt-0.5 shrink-0 text-[#6D28D9]"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/**
 * Sticky contents rail for the case study body.
 *
 * Sits in the column to the right of the 920px article — space that was
 * otherwise empty on wide screens. The headings already carry ids from
 * `slugifyHeading`; this is what finally makes them reachable, which also gives
 * search engines anchors to offer as jump-to links.
 */
export function TableOfContents({ headings }: { headings: { id: string; text: string }[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');

  useEffect(() => {
    if (headings.length < 2) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Track the topmost heading currently in view, so the rail follows
        // reading position rather than whichever entry fired last.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav aria-label="On this page" className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto">
      <p className="flex items-center gap-2 text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-4">
        <List className="w-3.5 h-3.5" aria-hidden="true" />
        On this page
      </p>
      <ul className="space-y-1 border-l border-slate-100">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`block -ml-px border-l-2 pl-4 py-1.5 text-[13.5px] leading-snug transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded-r ${
                  isActive
                    ? 'border-[#6D28D9] text-[#6D28D9] font-bold'
                    : 'border-transparent text-slate-500 hover:text-[#111111]'
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
