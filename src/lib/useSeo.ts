import { useEffect } from 'react';
import { organizationSchema, siteOrigin, softwareApplicationSchema, webSiteSchema } from './site';

/**
 * Client-side document head management.
 *
 * The app is a Vite SPA with no SSR/head library, so tags are written directly
 * to `document.head` and reverted on unmount. Every tag this hook creates is
 * flagged with `data-seo` so it can be cleaned up without touching static tags.
 */

export interface SeoOptions {
  title: string;
  description: string;
  /** Path only, e.g. "/blog/my-post". Resolved against the current origin. */
  canonicalPath: string;
  image?: string;
  type?: 'website' | 'article';
  /** Keeps a page out of the index while still following its links — 404s. */
  noIndex?: boolean;
  /** JSON-LD objects (BlogPosting, BreadcrumbList, …). */
  jsonLd?: Record<string, unknown>[];
}

const MANAGED = 'data-seo';
/** Sitewide graphs use their own marker so per-route cleanup leaves them alone. */
const MANAGED_SITE = 'data-seo-site';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute(MANAGED, '');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    el.setAttribute(MANAGED, '');
    document.head.appendChild(el);
  }
  el.href = href;
}

export function useSeo({
  title,
  description,
  canonicalPath,
  image,
  type = 'website',
  noIndex = false,
  jsonLd = [],
}: SeoOptions) {
  const serializedJsonLd = JSON.stringify(jsonLd);

  useEffect(() => {
    const previousTitle = document.title;
    const origin = siteOrigin();
    const url = `${origin}${canonicalPath}`;
    const absoluteImage = image?.startsWith('http') ? image : image && `${origin}${image}`;

    document.title = title;
    upsertCanonical(url);

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noIndex ? 'noindex, follow' : 'index, follow');
    upsertMeta('property', 'og:site_name', 'PyHire');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:card', absoluteImage ? 'summary_large_image' : 'summary');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    if (absoluteImage) {
      upsertMeta('property', 'og:image', absoluteImage);
      upsertMeta('name', 'twitter:image', absoluteImage);
    }

    /* Prerendered pages already carry this route's JSON-LD in their static HTML.
       Drop it before re-emitting, or hydration leaves two copies of every graph. */
    document.head
      .querySelectorAll(`script[type="application/ld+json"][${MANAGED}]`)
      .forEach((s) => s.remove());

    const scripts = (JSON.parse(serializedJsonLd) as Record<string, unknown>[]).map((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute(MANAGED, '');
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      document.title = previousTitle;
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, canonicalPath, image, type, noIndex, serializedJsonLd]);
}

/**
 * Emits the sitewide Organization, WebSite and SoftwareApplication graphs.
 *
 * Mounted once from App, so it covers all 33 routes — including the ten pages
 * that never call `useSeo`. Written on mount rather than into index.html so the
 * URLs resolve through `siteOrigin()`; the prerenderer snapshots the DOM after
 * effects run, so the tags land in the static HTML either way.
 */
export function useSiteJsonLd() {
  useEffect(() => {
    document.head.querySelectorAll(`script[${MANAGED_SITE}]`).forEach((s) => s.remove());

    const scripts = [organizationSchema(), webSiteSchema(), softwareApplicationSchema()].map((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute(MANAGED_SITE, '');
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
      return script;
    });

    return () => scripts.forEach((s) => s.remove());
    // `siteOrigin()` is constant for the session; the graphs never need rebuilding.
  }, []);
}
