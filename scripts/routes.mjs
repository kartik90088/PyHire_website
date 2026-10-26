/**
 * The site's crawlable URL list, shared by the prerenderer and the sitemap
 * generator so the two can never disagree about what exists.
 *
 * Content routes are read out of the data modules rather than hand-listed, so
 * publishing a new case study or blog post updates both automatically.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Routes with no parameters, mirroring the <Route> table in src/App.tsx.
 * `priority` is a sitemap hint only.
 */
const STATIC_ROUTES = [
  { path: '/', priority: '1.0' },
  { path: '/candidate-management', priority: '0.9' },
  { path: '/job-management', priority: '0.9' },
  { path: '/ai-candidate-matching', priority: '0.9' },
  { path: '/interview-management', priority: '0.9' },
  { path: '/client-vendor-management', priority: '0.9' },
  { path: '/unified-communication', priority: '0.9' },
  { path: '/analytics-dashboards', priority: '0.9' },
  { path: '/compliance-security', priority: '0.9' },
  { path: '/about-us', priority: '0.6' },
  { path: '/blog', priority: '0.8' },
  { path: '/case-studies', priority: '0.8' },
  { path: '/contact-us', priority: '0.8' },
  { path: '/privacy-policy', priority: '0.3' },
  { path: '/terms-of-use', priority: '0.3' },
];

/**
 * Reads `slug` values straight out of a content module's source. Parsing the
 * text avoids needing a TypeScript loader in a build script.
 */
async function slugsFrom(relativePath) {
  const source = await readFile(path.join(ROOT, relativePath), 'utf8');
  const slugs = [...source.matchAll(/^\s*slug: '([^']+)',/gm)].map((m) => m[1]);
  if (slugs.length === 0) {
    throw new Error(`No slugs found in ${relativePath} — has the data shape changed?`);
  }
  return slugs;
}

/** Every crawlable route, as `{ path, priority }`. */
export async function allRoutes() {
  const [blog, caseStudies] = await Promise.all([
    slugsFrom('src/data/blogPosts.ts'),
    slugsFrom('src/data/caseStudies.ts'),
  ]);

  return [
    ...STATIC_ROUTES,
    ...blog.map((slug) => ({ path: `/blog/${slug}`, priority: '0.7' })),
    ...caseStudies.map((slug) => ({ path: `/case-studies/${slug}`, priority: '0.7' })),
  ];
}
