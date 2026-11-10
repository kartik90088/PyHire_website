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
      'PyHire is the AI-powered applicant tracking system that takes a role from requisition to joining day — job descriptions, candidate matching, interviews, offers, client and vendor work, all in one workspace.',
    email: 'support@veriright.com',
    telephone: '+91-9964667676',
    areaServed: 'IN',
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/pyhire-logo.webp'),
      width: 400,
      height: 123,
    },
    /* `sameAs` is deliberately absent: there are no social profile URLs yet,
       and claiming profiles that do not resolve is worse than claiming none.
       Add the real URLs here (and to the footer) when they exist. */
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
 * `offers` is deliberately omitted for now: the pricing page publishes plan
 * prices, but the content document flags the GST wording as "confirm with
 * finance before publishing". Add Offer entries once that is settled.
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
      'PyHire is the AI-powered applicant tracking system for Indian recruiting teams — consultancies, in-house HR and hybrid teams. It takes a role from requisition to joining day: job descriptions, candidate matching, interviews, offers, client and vendor work, all in one workspace.',
    publisher: { '@id': `${siteOrigin()}/#organization` },
    isPartOf: { '@id': `${siteOrigin()}/#website` },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Recruitment consultancies, in-house HR teams and hybrid teams',
    },
    featureList: [
      'Requisitions with approvals, AI-read job descriptions and one table of every open role',
      'Bulk CV upload, a resume bank and a candidate pipeline from first contact to joining day',
      'AI resume and JD parsing, and candidate matching with reasons',
      'Interview scheduling with reminders, evaluation forms, offer letters and joining checks',
      'Email, SMS, WhatsApp and cloud calling with recordings on one candidate timeline',
      'Client onboarding, vendor scorecards and a prospect pipeline for consultancies',
      'Role-based dashboards, job description analysis and recruiter performance',
      'Branded careers page, candidate portal and an Android app',
      'Consent, data access requests, erasure and retention tools for DPDP and GDPR',
    ],
  };
}
