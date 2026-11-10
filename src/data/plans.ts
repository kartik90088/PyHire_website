/**
 * Plans and prices — verbatim from the PyHire website content document,
 * section 13 (prices from the in-app plan catalogue, 14 October 2026). Single
 * source for the Pricing page and the home page preview. The document flags
 * the GST wording and the trial card policy "confirm before publishing".
 */
import { TRIAL_PATH } from '../lib/routes';

export const SALES_PATH = '/contact?topic=enterprise';

export interface Plan {
  name: string;
  price: string;
  period?: string;
  billing: string;
  bestFor: string;
  limits: [string, string][];
  includesIntro?: string;
  includes: string[];
  cta: { label: string; to: string };
}

export const plans: Plan[] = [
  {
    name: 'Free trial',
    price: '₹0',
    period: 'for 15 days',
    billing: '—',
    bestFor: 'Trying PyHire',
    limits: [
      ['Users', '1'], ['Active job descriptions', '5'], ['Candidates', '50'],
      ['AI resume reads / month', '—'], ['Workflow runs / month', '—'], ['Storage', '1 GB'],
    ],
    includes: [
      'Job descriptions, clients, departments and locations',
      'Candidate timeline',
      'Email, SMS and WhatsApp messaging with templates',
      'Calling',
    ],
    cta: { label: 'Start free trial', to: TRIAL_PATH },
  },
  {
    name: 'Starter',
    price: '₹6,999',
    period: '/ month',
    billing: 'Prepaid',
    bestFor: 'Small teams getting organised',
    limits: [
      ['Users', '3'], ['Active job descriptions', '25'], ['Candidates', '2,000'],
      ['AI resume reads / month', '250'], ['Workflow runs / month', '500'], ['Storage', '10 GB'],
    ],
    includesIntro: 'Everything in the trial, plus:',
    includes: [
      'AI resume and JD reading',
      'Bulk candidate upload and Excel export',
      'Interviews with evaluation forms and panel feedback',
      'Pipeline stages and status tracking',
      'Job roles library and multi-recruiter job descriptions',
      'Documents and notifications',
      'Users and roles, multi-factor authentication',
      'DPDP / GDPR compliance tools',
      'Support',
    ],
    cta: { label: 'Start free trial', to: TRIAL_PATH },
  },
  {
    name: 'Pro',
    price: '₹14,999',
    period: '/ month',
    billing: 'Prepaid',
    bestFor: 'Growing teams that want AI matching, vendors and analytics',
    limits: [
      ['Users', '10'], ['Active job descriptions', '100'], ['Candidates', '15,000'],
      ['AI resume reads / month', '1,500'], ['Workflow runs / month', '5,000'], ['Storage', '50 GB'],
    ],
    includesIntro: 'Everything in Starter, plus:',
    includes: [
      'AI candidate matching',
      'Vendor management and placements',
      'Recruiter analytics and the billing dashboard',
      'Workflows and automatic follow-ups',
      'Automatic assignment of candidates to recruiters',
      'Call recording',
      'Calendar integration',
    ],
    cta: { label: 'Start free trial', to: TRIAL_PATH },
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    billing: 'Postpaid',
    bestFor: 'Large teams that need integrations, branding and a dedicated set-up',
    limits: [
      ['Users', 'Unlimited'], ['Active job descriptions', 'Unlimited'], ['Candidates', 'Unlimited'],
      ['AI resume reads / month', 'Unlimited'], ['Workflow runs / month', 'Unlimited'], ['Storage', 'Unlimited'],
    ],
    includesIntro: 'Everything in Pro, plus:',
    includes: [
      'Unlimited users, roles and data',
      'Job portal posting and custom integrations',
      'API and webhooks',
      'Your own branding (white-label)',
      'Dedicated deployment option',
      'Premium support and a relationship manager',
    ],
    cta: { label: 'Talk to sales about Enterprise', to: SALES_PATH },
  },
];
