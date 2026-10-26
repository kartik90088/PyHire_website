/**
 * Post-build prerenderer.
 *
 * The app is a client-rendered Vite SPA, so `dist/index.html` ships an empty
 * `<div id="root">`. Googlebot executes JS and eventually sees the content, but
 * most other crawlers — GPTBot, ClaudeBot, PerplexityBot, social scrapers — do
 * not, which means the copy, headings and JSON-LD are invisible to them.
 *
 * This script serves the built `dist/`, visits every route in a headless
 * browser, and writes the fully rendered DOM back to disk as static HTML. The
 * client bundle still loads and hydrates on top of it, so behaviour is
 * unchanged for users.
 *
 * Run directly with `npm run prerender`; `npm run build` chains it automatically.
 */

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { allRoutes, ROOT } from './routes.mjs';

const DIST = path.join(ROOT, 'dist');
const PORT = 4176;
/**
 * Fallback <title> from index.html — a page still showing it never set its own.
 *
 * Read from the built shell rather than hard-coded: the literal that used to
 * live here drifted out of sync with index.html, which silently disabled the
 * missing-metadata check below. A page that forgot useSeo would have shipped
 * with the generic title and nothing would have said so.
 */
const SHELL_TITLE = await readFile(path.join(DIST, 'index.html'), 'utf8')
  .then((html) => html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim() ?? '')
  .catch(() => '');
/** Mirrors the VITE_SITE_URL the client bundle was built with, if any. */
const SITE_URL = process.env.VITE_SITE_URL?.replace(/\/$/, '') ?? '';

/** Triggers every `whileInView` reveal so no section is snapshotted mid-fade. */
async function scrollThroughPage(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let scrolled = 0;
      const step = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        scrolled += step;
        if (scrolled >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 40);
    });
    window.scrollTo(0, 0);
  });
}

/**
 * Motion writes `opacity: 0` inline for anything still waiting to animate.
 * Baking that into static HTML would hide real copy from crawlers that evaluate
 * CSS, so any not-yet-revealed element is reset to its settled state. Motion
 * reapplies its own values as soon as the bundle hydrates.
 */
async function revealHiddenElements(page) {
  return page.evaluate(() => {
    let cleaned = 0;
    document.querySelectorAll('[style*="opacity"]').forEach((el) => {
      const opacity = Number.parseFloat(el.style.opacity);
      if (Number.isFinite(opacity) && opacity < 1) {
        el.style.removeProperty('opacity');
        el.style.removeProperty('transform');
        cleaned += 1;
      }
    });
    return cleaned;
  });
}

async function main() {
  if (!existsSync(path.join(DIST, 'index.html'))) {
    throw new Error('dist/index.html not found — run `vite build` first.');
  }

  const routes = (await allRoutes()).map((r) => r.path);

  const server = await preview({
    root: ROOT,
    preview: { port: PORT, strictPort: true, open: false },
    logLevel: 'warn',
  });

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const failures = [];
  /* Routes that rendered fine but never called useSeo, so they inherit the
     generic shell title and description. Reported, but not build-breaking. */
  const missingMetadata = [];
  /* Snapshots are buffered rather than written as we go: writing dist/blog/index.html
     mid-run would make the preview server serve the prerendered copy for the next
     visit, snapshotting a snapshot. */
  const snapshots = new Map();

  for (const route of routes) {
    try {
      const response = await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 45_000,
      });
      if (!response?.ok()) throw new Error(`HTTP ${response?.status()}`);

      // Every routed page scrolls to top on mount and useSeo writes its head
      // tags in an effect; give both a beat before touching the DOM.
      await page.waitForSelector('#root > *', { timeout: 15_000 });
      await scrollThroughPage(page);
      await new Promise((r) => setTimeout(r, 700));
      await revealHiddenElements(page);

      const rendered = await page.evaluate(
        () => `<!doctype html>\n${document.documentElement.outerHTML}`,
      );

      /* useSeo builds canonical/og:url from VITE_SITE_URL, falling back to the
         live origin — which here is the preview server. Rather than publish
         `http://localhost:4176/...` as a canonical, strip it to a root-relative
         URL, which Google resolves against the request URL. Setting
         VITE_SITE_URL at build time makes this a no-op. */
      const html = SITE_URL
        ? rendered
        : rendered.replaceAll(`http://localhost:${PORT}`, '');

      const title = await page.title();
      if (route !== '/' && (!title || title === SHELL_TITLE)) {
        missingMetadata.push(route);
      }

      snapshots.set(route, html);
      process.stdout.write(`  ✓ ${route}\n`);
    } catch (error) {
      failures.push(`${route} — ${error.message}`);
      process.stdout.write(`  ✗ ${route} — ${error.message}\n`);
    }
  }

  await browser.close();
  await server.httpServer.close();

  for (const [route, html] of snapshots) {
    const file =
      route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route, 'index.html');
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html, 'utf8');
  }

  console.log(`\nPrerendered ${snapshots.size}/${routes.length} routes to dist/.`);

  if (!SITE_URL) {
    console.warn(
      '\nWarning: VITE_SITE_URL is not set, so canonical and og:url were written as ' +
        'root-relative URLs. Set it to the production origin (e.g. ' +
        'VITE_SITE_URL=https://pyhire.com npm run build) for absolute URLs.',
    );
  }

  if (missingMetadata.length > 0) {
    console.warn(
      `\nWarning: ${missingMetadata.length} route(s) inherit the generic shell title ` +
        `and description because they never call useSeo:`,
    );
    missingMetadata.forEach((r) => console.warn(`  - ${r}`));
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} route(s) failed:`);
    failures.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
