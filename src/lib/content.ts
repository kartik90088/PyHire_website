/**
 * Shared primitives for long-form editorial content (blog posts, case studies).
 *
 * Body copy is stored as structured blocks rather than raw HTML so the same
 * source text can be rendered by different layouts without re-authoring it.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  /** A pulled-out quotation from the source document. */
  | { type: 'quote'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] };

/** Strips the lightweight inline markers so text can be measured or searched. */
export function plainText(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1');
}

export function slugifyHeading(text: string): string {
  return plainText(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Pulls the Q&A pairs out of a document's "Frequently Asked Questions" section.
 *
 * The source documents already write FAQs the way search engines want them — an
 * `h3` question followed by a self-contained paragraph — so the pairs are read
 * back out of the body rather than duplicated into a separate field. Returns an
 * empty array for documents with no FAQ section.
 */
export function extractFaq(blocks: Block[]): { question: string; answer: string }[] {
  const start = blocks.findIndex(
    (b) => b.type === 'h2' && plainText(b.text).trim().toLowerCase() === 'frequently asked questions',
  );
  if (start === -1) return [];

  const faqs: { question: string; answer: string }[] = [];
  let question: string | null = null;
  let answer: string[] = [];

  const flush = () => {
    if (question && answer.length > 0) {
      faqs.push({ question, answer: answer.join(' ') });
    }
    question = null;
    answer = [];
  };

  for (const block of blocks.slice(start + 1)) {
    if (block.type === 'h2') break; // next section — the FAQ has ended
    if (block.type === 'h3') {
      flush();
      question = plainText(block.text);
    } else if (block.type === 'p' && question) {
      answer.push(plainText(block.text));
    } else if (block.type === 'ul' || block.type === 'ol') {
      if (question) answer.push(block.items.map(plainText).join('. '));
    }
  }
  flush();

  return faqs;
}

/**
 * Section headings of a document, for an in-page table of contents.
 *
 * `h3` levels are excluded: several studies carry 11–17 of them, which would
 * make the contents list longer than the sections it points at.
 */
export function extractHeadings(blocks: Block[]): { id: string; text: string }[] {
  return blocks
    .filter((b): b is { type: 'h2'; text: string } => b.type === 'h2')
    .map((b) => ({ id: slugifyHeading(b.text), text: plainText(b.text) }));
}

/**
 * The document's own summary of outcomes, for a key-takeaways block near the top.
 *
 * Every study ends its results section with a run of `h3` statements — "Vendor
 * performance becomes measurable", "Follow-up becomes easier to prioritize" —
 * which are already written as standalone claims. They are lifted rather than
 * re-summarised so the takeaways can never drift from the body.
 */
export function extractTakeaways(blocks: Block[], limit = 5): string[] {
  const start = blocks.findIndex(
    (b) => b.type === 'h2' && /^what changed, directionally$/i.test(plainText(b.text).trim()),
  );
  if (start === -1) return [];

  const takeaways: string[] = [];
  for (const block of blocks.slice(start + 1)) {
    if (block.type === 'h2') break;
    if (block.type === 'h3') takeaways.push(plainText(block.text));
  }
  return takeaways.slice(0, limit);
}

/** Every word of a block list, for search indexing. */
export function blocksToText(blocks: Block[]): string {
  const parts: string[] = [];
  for (const b of blocks) {
    if (b.type === 'ul' || b.type === 'ol') parts.push(...b.items);
    else parts.push(b.text);
  }
  return plainText(parts.join(' '));
}

/**
 * Trims prose to a length search engines will actually display.
 *
 * Google truncates meta descriptions around 155–160 characters. The editorial
 * excerpts these pages use as descriptions are full opening paragraphs — some
 * run past 450 characters, so the useful half was being cut off in results.
 *
 * Prefers a sentence boundary so the description still reads as a complete
 * thought; falls back to a word boundary with an ellipsis.
 */
export function metaDescription(text: string, max = 155): string {
  const clean = plainText(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  const window = clean.slice(0, max + 1);
  const sentenceEnd = Math.max(
    window.lastIndexOf('. '),
    window.lastIndexOf('? '),
    window.lastIndexOf('! '),
  );
  // only use the sentence break if it still leaves a useful description
  if (sentenceEnd >= 70) return clean.slice(0, sentenceEnd + 1);

  const wordEnd = window.lastIndexOf(' ');
  return clean.slice(0, wordEnd > 0 ? wordEnd : max).replace(/[,;:]$/, '') + '…';
}
