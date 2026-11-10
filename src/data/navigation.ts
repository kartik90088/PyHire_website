import type { LucideIcon } from 'lucide-react';
import {
  BarChart3, BrainCircuit, Briefcase, CalendarCheck, Globe, Handshake, MessagesSquare, Smartphone,
} from 'lucide-react';

/**
 * The site map from the PyHire website content document (14 October 2026).
 * Navbar, Footer, the home page feature tiles and the router all read from
 * here, so a page is added or renamed in one place. Keep scripts/routes.mjs in
 * step — it cannot import TypeScript.
 */

export interface ProductLink {
  path: string;
  /** Page name as the content document's site map gives it. */
  label: string;
  /** One-line description from the home page feature grid. */
  desc: string;
  icon: LucideIcon;
}

export const productLinks: ProductLink[] = [
  { path: '/product/jobs-and-candidates', label: 'Jobs & candidates', icon: Briefcase,
    desc: 'Approvals, AI-read JDs and one table of every open role' },
  { path: '/product/ai', label: 'AI matching & insights', icon: BrainCircuit,
    desc: 'Every candidate scored against every open role, with reasons' },
  { path: '/product/interviews-and-offers', label: 'Interviews & offers', icon: CalendarCheck,
    desc: 'Scheduling, evaluation forms, offer letters, joining checks' },
  { path: '/product/communication', label: 'Communication & calling', icon: MessagesSquare,
    desc: 'Inbox, campaigns, workflows and cloud calling with recordings' },
  { path: '/product/clients-and-vendors', label: 'Clients, vendors & prospects', icon: Handshake,
    desc: 'Onboarding, reviews, vendor scorecards and a sales pipeline' },
  { path: '/product/analytics', label: 'Analytics', icon: BarChart3,
    desc: 'Role-based dashboards, JD analysis and recruiter performance' },
  { path: '/product/careers-page', label: 'Careers page & portal', icon: Globe,
    desc: 'Your own job board and a candidate portal' },
  { path: '/product/mobile', label: 'Mobile app', icon: Smartphone,
    desc: 'Calling and follow-ups on the phone' },
];

/** Top-level pages after "Product", in header order. */
export const mainLinks = [
  { path: '/solutions', label: 'Solutions' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/partners', label: 'Partners' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

/** Kept from the earlier site; linked from the footer. */
export const resourceLinks = [
  { path: '/blog', label: 'Blog' },
  { path: '/case-studies', label: 'Case studies' },
];

export const legalLinks = [
  { path: '/privacy-policy', label: 'Privacy Policy' },
  { path: '/terms-of-use', label: 'Terms of Use' },
];

/**
 * Pre-redesign URLs and where their content now lives. Each renders a
 * client-side redirect so bookmarks and inbound links keep working; add the
 * same pairs as 301s in nginx so search engines move their ranking across.
 */
export const legacyRedirects: Record<string, string> = {
  '/job-management': '/product/jobs-and-candidates',
  '/candidate-management': '/product/jobs-and-candidates',
  '/ai-candidate-matching': '/product/ai',
  '/interview-management': '/product/interviews-and-offers',
  '/unified-communication': '/product/communication',
  '/client-vendor-management': '/product/clients-and-vendors',
  '/analytics-dashboards': '/product/analytics',
  '/compliance-security': '/', // Security page removed (2026-10-28)
  '/about-us': '/about',
  '/contact-us': '/contact',
};
