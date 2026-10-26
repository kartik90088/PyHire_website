/**
 * Writes `dist/sitemap.xml` and `dist/robots.txt`.
 *
 * Runs after the bundle so both land in the deployed output, and shares its URL
 * list with the prerenderer (scripts/routes.mjs) so the sitemap can never
 * advertise a page that was not rendered.
 *
 * Run directly with `npm run sitemap`; `npm run build` chains it automatically.
 */

import { writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { allRoutes, ROOT } from './routes.mjs';

const DIST = path.join(ROOT, 'dist');
const SITE_URL = process.env.VITE_SITE_URL?.replace(/\/$/, '') ?? '';

/**
 * Last-modified dates come from the content itself. Both content stores declare
 * `dateModified`/`datePublished` as optional and none are populated yet, so
 * `<lastmod>` is omitted rather than filled with a build timestamp — a date that
 * changes on every deploy trains crawlers to ignore the signal.
 */
async function lastmodBySlug() {
  const map = new Map();
  for (const [file, prefix] of [
    ['src/data/blogPosts.ts', '/blog'],
    ['src/data/caseStudies.ts', '/case-studies'],
  ]) {
    const source = await readFile(path.join(ROOT, file), 'utf8');
    // Each entry: capture its slug, then any date fields before the next entry.
    for (const match of source.matchAll(
      /slug: '([^']+)',([\s\S]*?)(?=\n  \{\n    slug: '|\n\];)/g,
    )) {
      const [, slug, body] = match;
      const date =
        body.match(/dateModified: '(\d{4}-\d{2}-\d{2})'/)?.[1] ??
        body.match(/datePublished: '(\d{4}-\d{2}-\d{2})'/)?.[1];
      if (date) map.set(`${prefix}/${slug}`, date);
    }
  }
  return map;
}

function xmlEscape(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function main() {
  if (!existsSync(DIST)) {
    throw new Error('dist/ not found — run `vite build` first.');
  }
  if (!SITE_URL) {
    console.error(
      'Cannot write sitemap.xml: VITE_SITE_URL is not set. Sitemaps require absolute\n' +
        'URLs, and robots.txt requires an absolute Sitemap: line, so there is no safe\n' +
        'fallback. Re-run as: VITE_SITE_URL=https://pyhire.com npm run build',
    );
    process.exit(1);
  }

  const routes = await allRoutes();
  const lastmod = await lastmodBySlug();

  const urls = routes
    .map(({ path: route, priority }) => {
      const date = lastmod.get(route);
      return [
        '  <url>',
        `    <loc>${xmlEscape(SITE_URL + route)}</loc>`,
        date ? `    <lastmod>${date}</lastmod>` : null,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8');

  /* AI crawlers are named explicitly. A bare `User-agent: *` already permits
     them, but several operators check for an explicit rule, and naming them
     documents the intent for whoever edits this next. */
  const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Answer and generative engines — explicitly welcome.
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  await writeFile(path.join(DIST, 'robots.txt'), robots, 'utf8');

  const dated = routes.filter((r) => lastmod.has(r.path)).length;
  console.log(`\nWrote sitemap.xml (${routes.length} URLs, ${dated} with <lastmod>) and robots.txt.`);
  if (dated === 0) {
    console.warn(
      'Note: no <lastmod> dates — populate datePublished/dateModified in the content stores.',
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
