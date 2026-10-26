/**
 * Marks a build as incomplete until every stage has finished.
 *
 * Why this exists: `vite build` empties dist/ before it writes anything, and
 * the prerender + sitemap stages run *after* it. If either of those fails —
 * puppeteer cannot find a browser, VITE_SITE_URL is unset, the machine runs out
 * of memory — you are left with a dist/ that looks perfectly deployable and is
 * actually just the empty SPA shell: no prerendered routes, no sitemap.xml, no
 * robots.txt. Deploy that and the site works for humans while every crawler
 * that does not execute JavaScript sees a blank page. Nothing in the output
 * says "do not ship this".
 *
 * So: `start` drops a marker file immediately after the bundle is written, and
 * `clear` removes it only once the whole chain has succeeded. `check` fails
 * loudly if the marker is still there — deploy.sh calls it before uploading
 * anything, which turns a silent bad deploy into a refused one.
 *
 *   node scripts/build-guard.mjs start   # after vite build
 *   node scripts/build-guard.mjs clear   # after sitemap
 *   node scripts/build-guard.mjs check   # before deploying
 */

import { writeFile, rm, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './routes.mjs';

const DIST = path.join(ROOT, 'dist');
const MARKER = path.join(DIST, '.build-incomplete');

const command = process.argv[2];

if (command === 'start') {
  await writeFile(
    MARKER,
    `Build started but not finished.\n` +
      `If this file exists, dist/ is an un-prerendered SPA shell — do not deploy it.\n` +
      `Re-run: VITE_SITE_URL=<origin> npm run build\n`,
    'utf8',
  );
  process.exit(0);
}

if (command === 'clear') {
  await rm(MARKER, { force: true });
  process.exit(0);
}

if (command === 'check') {
  const problems = [];

  if (!existsSync(DIST)) {
    problems.push('dist/ does not exist — nothing has been built.');
  } else {
    if (existsSync(MARKER)) {
      problems.push(
        'dist/.build-incomplete is present — the last build failed after bundling.\n' +
          '    dist/ is the empty SPA shell, not a prerendered site.',
      );
    }
    if (!existsSync(path.join(DIST, 'sitemap.xml'))) {
      problems.push('dist/sitemap.xml is missing — the sitemap stage did not run.');
    }
    if (!existsSync(path.join(DIST, 'robots.txt'))) {
      problems.push('dist/robots.txt is missing — the sitemap stage did not run.');
    }

    /* The decisive check: a prerendered home page carries real markup. The
       un-prerendered shell is about 1 KB with an empty <div id="root">. */
    const indexPath = path.join(DIST, 'index.html');
    if (!existsSync(indexPath)) {
      problems.push('dist/index.html is missing.');
    } else {
      const html = await readFile(indexPath, 'utf8');
      if (/<div id="root">\s*<\/div>/.test(html)) {
        problems.push(
          'dist/index.html has an empty #root — it was never prerendered.\n' +
            '    Crawlers that do not run JavaScript would see a blank page.',
        );
      }
    }
  }

  if (problems.length > 0) {
    console.error('\n✗ dist/ is NOT safe to deploy:\n');
    for (const problem of problems) console.error(`  • ${problem}`);
    console.error('\n  Fix with: VITE_SITE_URL=<origin> npm run build\n');
    process.exit(1);
  }

  console.log('✓ dist/ passed the pre-deploy check (prerendered, sitemap and robots present).');
  process.exit(0);
}

console.error('Usage: node scripts/build-guard.mjs <start|clear|check>');
process.exit(1);
