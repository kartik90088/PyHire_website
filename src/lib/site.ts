/**
 * Site-level identity and URL helpers shared by every structured-data builder.
 *
 * Schema.org identifiers and canonical URLs must be absolute. Building them in
 * one place keeps `/case-studies/x` from being emitted as an `@id`, which is
 * what several graphs were doing before.
 */

export const SITE_NAME = 'PyHire';

/**
 * Absolute production origin.
 *
 * Set `VITE_SITE_URL` before building. Without it the live origin is used —
 * correct in a browser, but during prerendering that is the preview server, so
 * scripts/prerender.mjs rewrites those URLs to root-relative and warns.
 */
export function siteOrigin(): string {
  const configured = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '');
  if (configured) return configured;
  return typeof window === 'undefined' ? '' : window.location.origin;
}

/** Resolves a root-relative path against the site origin. */
export function absoluteUrl(path: string): string {
  return `${siteOrigin()}${path}`;
}

/** Publisher reference used by every Article and BlogPosting graph. */
export function publisher() {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/pyhire-logo.webp'),
      width: 400,
      height: 123,
    },
  };
}

/**
 * Default author for editorial content.
 *
 * The source documents carry no byline, so the organisation is named as author
 * rather than inventing a person. Individual entries may override it.
 */
export function defaultAuthor() {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    url: absoluteUrl('/'),
  };
}

/** Sitewide Organization graph — emitted once, on every page. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteOrigin()}/#organization`,
    name: SITE_NAME,
    url: absoluteUrl('/'),
    description:
      'PyHire is an AI-powered recruitment operating system covering the complete hiring lifecycle — job creation, candidate sourcing, AI matching, interviews, offers and analytics.',
    email: 'support@veriright.com',
    telephone: '+91-9964667676',
    areaServed: 'IN',
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/pyhire-logo.webp'),
      width: 400,
      height: 123,
    },
    /* `sameAs` is deliberately absent: every social link in the footer is still
       a "#" placeholder, and claiming profiles that do not resolve is worse
       than claiming none. Add the real URLs here when they exist. */
  };
}

/** Sitewide WebSite graph — establishes the site entity and its name. */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteOrigin()}/#website`,
    name: SITE_NAME,
    url: absoluteUrl('/'),
    inLanguage: 'en',
    publisher: { '@id': `${siteOrigin()}/#organization` },
  };
}

/**
 * Sitewide SoftwareApplication graph.
 *
 * Organization says who publishes PyHire; WebSite says where it lives. Neither
 * says what it *is*. This is the graph an answer engine reads to classify the
 * product, who it serves and what it does — the difference between being
 * described accurately in an AI answer and being guessed at from prose.
 *
 * `offers` is deliberately omitted: pricing is not published anywhere on this
 * site, and inventing a price to satisfy a rich-result warning would put false
 * information into structured data.
 */
export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${siteOrigin()}/#software`,
    name: SITE_NAME,
    url: absoluteUrl('/'),
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Recruitment Software, Applicant Tracking System (ATS)',
    operatingSystem: 'Web browser',
    inLanguage: 'en',
    description:
      'PyHire is an AI-powered recruitment operating system for staffing agencies, recruitment firms and in-house HR teams. It covers the full hiring lifecycle — job requisitions, candidate sourcing, AI resume screening and matching, interview scheduling, omnichannel candidate communication, offers, analytics and compliance — in one configurable platform.',
    publisher: { '@id': `${siteOrigin()}/#organization` },
    isPartOf: { '@id': `${siteOrigin()}/#website` },
    audience: {
      '@type': 'BusinessAudience',
      audienceType:
        'Recruitment agencies, staffing firms, RPO providers, in-house HR and talent acquisition teams',
    },
    featureList: [
      'Candidate management with a single unified profile per candidate',
      'AI candidate matching and resume parsing',
      'Job requisition management, approval chains and one-click job posting',
      'Interview scheduling, panel coordination and structured scorecards',
      'Client and vendor management with branded portals',
      'Omnichannel candidate communication across email, WhatsApp, SMS and calling',
      'Recruitment analytics, pipeline reporting and hiring dashboards',
      'Role-based access control, audit logs and DPDPA/GDPR-aligned compliance',
    ],
  };
}
