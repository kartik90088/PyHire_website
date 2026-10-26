/**
 * Privacy Policy and Terms of Use.
 *
 * ⚠ DRAFTED FROM WHAT THIS SITE ACTUALLY DOES — NOT LEGALLY REVIEWED.
 *
 * Every factual claim below was checked against the codebase as of 2026-08-26:
 * the contact form is the only input that leaves the browser, there are no
 * cookies, no analytics and no tracking of any kind, and the only third parties
 * that see a visitor are the Unsplash image CDN and the SMTP provider that
 * carries enquiry emails. If any of that changes — an analytics tag, a chat
 * integration, a CRM webhook — this file must change in the same commit.
 *
 * Have counsel review both documents before they are relied on. In particular
 * the governing-law clause names India/Bengaluru on the strength of the IST
 * office hours and +91 contact number; confirm it matches the contracting
 * entity.
 */

import type { Block } from '../lib/content';

export interface LegalDocument {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  /** Human-readable date shown under the title. */
  lastUpdated: string;
  /** ISO date for structured data. */
  lastUpdatedIso: string;
  intro: string;
  body: Block[];
}

const CONTACT_EMAIL = 'support@veriright.com';
const CONTACT_PHONE = '+91 9964667676';

export const privacyPolicy: LegalDocument = {
  slug: 'privacy-policy',
  title: 'Privacy Policy',
  seoTitle: 'Privacy Policy',
  description:
    'How PyHire collects, uses and protects personal information submitted through this website, and the rights you have over that information under the DPDP Act and GDPR.',
  lastUpdated: '26 August 2026',
  lastUpdatedIso: '2026-08-26',
  intro:
    'This policy explains what happens to personal information you provide through this website, who can see it, how long we keep it, and what you can ask us to do with it.',
  body: [
    { type: 'h2', text: 'Who this policy covers' },
    {
      type: 'p',
      text: 'This policy applies to **this website only** — the pages describing the PyHire platform, our blog and case studies, and the contact form. It does not cover the PyHire application itself. If your organisation uses PyHire as a customer, the handling of candidate and recruitment data inside the platform is governed by the agreement between us and your organisation, not by this policy.',
    },
    {
      type: 'p',
      text: `PyHire is operated by Veriright. You can reach us at ${CONTACT_EMAIL} or ${CONTACT_PHONE}, Monday to Saturday, 9:30 AM to 7:00 PM IST.`,
    },

    { type: 'h2', text: 'What we collect' },
    {
      type: 'p',
      text: 'We collect two things, and only two things.',
    },
    {
      type: 'ol',
      items: [
        '**What you type into the contact form.** First name, last name, email address, phone number (optional), subject, and your message. We also record that you ticked the consent box, and when.',
        '**Standard web server logs.** Like any website, our server records the IP address, browser user-agent, requested page and timestamp of each request. These logs exist to keep the site running and secure, and are not linked to form submissions or used to build a profile of you.',
      ],
    },
    {
      type: 'p',
      text: 'That is the complete list. This site sets **no cookies**, runs **no analytics**, and carries **no advertising, tracking pixels or session recording**. Nothing is stored in your browser and there is no cookie banner because there is nothing to consent to.',
    },

    { type: 'h2', text: 'How we use it' },
    {
      type: 'p',
      text: 'Information from the contact form is used to reply to your enquiry and, where you have asked about the product, to follow up about PyHire. We do not sell it, rent it, or share it for anyone else’s marketing.',
    },
    {
      type: 'p',
      text: 'Where the GDPR applies, our lawful basis is your consent for marketing follow-up, and our legitimate interest in responding to a business enquiry you initiated. Where the Digital Personal Data Protection Act, 2023 applies, we rely on the consent you give when submitting the form. You can withdraw that consent at any time — see **Your rights** below.',
    },

    { type: 'h2', text: 'Who else can see it' },
    {
      type: 'p',
      text: 'Your enquiry is delivered to our team by email. Three categories of third party are involved in operating this site:',
    },
    {
      type: 'ul',
      items: [
        '**Our email provider**, which transmits and stores the enquiry email so our team can read and reply to it.',
        '**Our hosting provider**, on whose servers this website and its logs run.',
        '**Unsplash**, whose image CDN serves some of the photography on these pages. Because your browser fetches those images directly, Unsplash receives your IP address and user-agent as part of that request. They receive nothing you type.',
      ],
    },
    {
      type: 'p',
      text: 'We may also disclose information where we are legally required to do so, or to establish or defend legal claims.',
    },

    { type: 'h2', text: 'How long we keep it' },
    {
      type: 'p',
      text: 'Contact form enquiries are kept for as long as needed to deal with your enquiry and any resulting business relationship, and then for a reasonable period afterwards for our records. Server logs are retained on a short rolling basis for security and troubleshooting. If you ask us to delete your enquiry, we will, subject to any records we are legally required to keep.',
    },

    { type: 'h2', text: 'Your rights' },
    {
      type: 'p',
      text: 'Depending on where you are, you may have some or all of the following rights over the information we hold about you:',
    },
    {
      type: 'ul',
      items: [
        'Ask what personal information we hold about you, and get a copy of it.',
        'Ask us to correct information that is wrong or incomplete.',
        'Ask us to delete your information (the "right to erasure" or "right to be forgotten").',
        'Withdraw your consent to marketing follow-up, at any time, without affecting anything we did before you withdrew it.',
        'Object to or ask us to restrict how we use your information.',
        'Complain to your data protection authority — in India, the Data Protection Board; in the EEA or UK, your national supervisory authority.',
      ],
    },
    {
      type: 'p',
      text: `To exercise any of these, email ${CONTACT_EMAIL}. We aim to respond within 30 days. If you are not satisfied with how we handled your request, you can raise it with our grievance contact at the same address, marking your message "Grievance — Data Protection".`,
    },

    { type: 'h2', text: 'Security' },
    {
      type: 'p',
      text: 'This site is served over HTTPS, so what you submit is encrypted in transit. Access to enquiry emails is limited to the people who need it to respond to you. No system is perfectly secure, but we take reasonable technical and organisational measures appropriate to the small amount of information this website handles.',
    },

    { type: 'h2', text: 'Children' },
    {
      type: 'p',
      text: 'This is a business website and is not directed at children. We do not knowingly collect information from anyone under 18. If you believe a child has submitted information to us, contact us and we will delete it.',
    },

    { type: 'h2', text: 'International transfers' },
    {
      type: 'p',
      text: 'We are based in India, and information you send us is processed there. If you contact us from outside India, your information will be transferred to and processed in India, which may not offer the same level of data protection as your home country. By submitting the form you understand this transfer takes place.',
    },

    { type: 'h2', text: 'Changes to this policy' },
    {
      type: 'p',
      text: 'If we change how this site handles personal information — for example by adding analytics or a live chat tool — we will update this policy and change the date shown at the top of the page before the change takes effect.',
    },

    { type: 'h2', text: 'Contact us' },
    {
      type: 'p',
      text: `Questions about this policy, or about anything we hold about you: email ${CONTACT_EMAIL} or call ${CONTACT_PHONE}, Monday to Saturday, 9:30 AM to 7:00 PM IST.`,
    },
  ],
};

export const termsOfUse: LegalDocument = {
  slug: 'terms-of-use',
  title: 'Terms of Use',
  seoTitle: 'Terms of Use',
  description:
    'The terms on which you may use the PyHire website, including intellectual property, acceptable use, and the status of the product claims published on these pages.',
  lastUpdated: '26 August 2026',
  lastUpdatedIso: '2026-08-26',
  intro:
    'These terms govern your use of this website. By browsing it or sending us an enquiry, you accept them. If you do not accept them, please do not use the site.',
  body: [
    { type: 'h2', text: 'What this website is' },
    {
      type: 'p',
      text: 'This site describes the PyHire platform and the company behind it. It is **marketing material, not a contract**. Nothing on these pages is an offer capable of acceptance, a quotation, a warranty, or a commitment to deliver any particular feature.',
    },
    {
      type: 'p',
      text: 'Access to the PyHire product itself is governed by a separate written agreement between us and your organisation. Where anything on this website conflicts with that agreement, the agreement governs.',
    },

    { type: 'h2', text: 'Product descriptions and claims' },
    {
      type: 'p',
      text: 'The capabilities, workflows, metrics, accuracy figures and customer outcomes described on this site are provided for general information. Product functionality evolves, and figures cited are illustrative of results seen in particular circumstances rather than a promise of the results you will get. Case studies describe specific situations; your own results will depend on your data, your process and your team.',
    },
    {
      type: 'p',
      text: 'Statements about planned or future functionality are not commitments. Do not make a purchasing decision in reliance on a feature that has not yet shipped — ask us to confirm it in writing first.',
    },

    { type: 'h2', text: 'Acceptable use' },
    { type: 'p', text: 'You may read, browse, and share links to this site freely. You may not:' },
    {
      type: 'ul',
      items: [
        'Use the site in any way that breaks the law, or that infringes anyone else’s rights.',
        'Attempt to gain unauthorised access to the site, its server, or any connected system.',
        'Interfere with the site’s operation — including by overloading it, probing it for vulnerabilities without our written permission, or circumventing any security measure.',
        'Scrape, harvest or systematically extract content for the purpose of building a competing product or a marketing list.',
        'Submit anything through the contact form that is unlawful, abusive, deceptive, or that contains malicious code.',
        'Misrepresent who you are, or submit someone else’s personal details without their knowledge.',
      ],
    },

    { type: 'h2', text: 'Intellectual property' },
    {
      type: 'p',
      text: 'The PyHire name and logo, the design of this site, and its text, graphics, illustrations and code are owned by us or licensed to us, and are protected by intellectual property law. You may quote short extracts with attribution and a link. You may not copy, republish, or adapt substantial parts of the site without our written permission.',
    },
    {
      type: 'p',
      text: 'Some photography on this site is licensed from third parties and remains the property of its respective owners.',
    },

    { type: 'h2', text: 'Anything you send us' },
    {
      type: 'p',
      text: 'If you send us feedback, suggestions or ideas about PyHire through this site, we may use them without restriction or payment. Please do not send us anything you consider confidential or proprietary — use a signed non-disclosure agreement for that. Personal information you submit is handled as described in our **Privacy Policy**.',
    },

    { type: 'h2', text: 'Links to other sites' },
    {
      type: 'p',
      text: 'Where this site links to a third-party website, we do not control it and are not responsible for its content, its accuracy, or how it handles your data. A link is not an endorsement.',
    },

    { type: 'h2', text: 'Availability' },
    {
      type: 'p',
      text: 'We try to keep this site available and up to date, but we do not guarantee it will be uninterrupted or error-free. We may change, suspend or withdraw any part of it at any time without notice.',
    },

    { type: 'h2', text: 'Disclaimer and liability' },
    {
      type: 'p',
      text: 'This website is provided "as is". To the fullest extent permitted by law, we exclude all warranties, express or implied, including those of accuracy, fitness for a particular purpose, and non-infringement.',
    },
    {
      type: 'p',
      text: 'To the fullest extent permitted by law, we are not liable for any indirect or consequential loss, or for any loss of profit, revenue, business, goodwill or data, arising out of your use of this website. Nothing in these terms excludes or limits liability for fraud, for death or personal injury caused by negligence, or for anything else that cannot lawfully be excluded.',
    },

    { type: 'h2', text: 'Governing law' },
    {
      type: 'p',
      text: 'These terms are governed by the laws of India, and the courts at Bengaluru, Karnataka have exclusive jurisdiction over any dispute arising from them or from your use of this website.',
    },

    { type: 'h2', text: 'Changes to these terms' },
    {
      type: 'p',
      text: 'We may update these terms from time to time. The version published here, with the date shown at the top of the page, is the one that applies. Continuing to use the site after a change means you accept the updated terms.',
    },

    { type: 'h2', text: 'Contact us' },
    {
      type: 'p',
      text: `Questions about these terms: email ${CONTACT_EMAIL} or call ${CONTACT_PHONE}, Monday to Saturday, 9:30 AM to 7:00 PM IST.`,
    },
  ],
};

export const legalDocuments = [privacyPolicy, termsOfUse];
