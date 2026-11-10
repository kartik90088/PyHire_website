# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# PyHire — AI Recruiting Platform (Marketing Website)

> Comprehensive technical and product documentation for this repository.
> Last analyzed: 2026-08-26 (lead capture, legal pages and deployment added same day)

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Business Logic](#2-business-logic)
3. [Technical Architecture](#3-technical-architecture)
4. [Folder Structure](#4-folder-structure)
5. [Feature Documentation](#5-feature-documentation)
6. [Module Documentation](#6-module-documentation)
7. [API Documentation](#7-api-documentation)
8. [Database Relationships](#8-database-relationships)
9. [User Workflows](#9-user-workflows)
10. [Important Files](#10-important-files)
11. [Business Benefits](#11-business-benefits)
12. [Development Workflow](#12-development-workflow)
13. [Known Gaps & Technical Debt](#13-known-gaps--technical-debt)

---

## 1. Product Overview

### What this repository is

This repository contains the **public-facing marketing website** for **PyHire**, an AI-powered Recruitment Operating System (ROS). It is a **client-side-only React single-page application**. It markets the PyHire product; it is **not** the PyHire product itself.

**Critical distinction:** the eight "Platform" pages describe ATS/CRM capabilities (candidate databases, AI matching, interview scheduling, analytics). None of that functionality is implemented here — those pages are static marketing content rendered from hard-coded arrays. There is no backend, no database, no authentication, and no live AI inference in this codebase. See [Section 13](#13-known-gaps--technical-debt).

### The product being marketed

**PyHire** is positioned as a single intelligent platform covering the complete hiring lifecycle — job creation → candidate sourcing → AI matching → interviews → offers → analytics — for:

| Segment | Primary need PyHire addresses |
|---|---|
| Recruitment agencies | Multi-client requisition and submittal management |
| Staffing firms | Vendor collaboration, contracts, placement tracking |
| In-house HR / TA teams | Pipeline automation, recruiter productivity, hiring analytics |
| Enterprise buyers | Role-based access, audit trails, DPDPA/GDPR-aligned governance |

### Brand and positioning

- **Product name:** PyHire
- **Headline (home hero):** *"AI-Powered Platform for End-to-End Recruitment"*
- **Value proposition:** *"Simplify and automate every stage of your hiring process with PyHire. From sourcing and screening candidates to interviews and communication, manage everything in one platform. Reduce manual work, save time, and hire the right talent faster."*
- **Mission statement:** *"To make hiring products radically simple, powerful, and accessible."*
- **Primary CTAs:** "Book a Demo", "Request Demo", "Get Free Quote"
- **Primary brand color:** Orange `#f97316` (with `#ea580c` hover, `#FF6B00`/`#ff5a1f` variants in the chatbot and contact form)
- **Supporting palette:** off-white `#fdfdfd`, cream `#FFFCF4`, slate greys, `#f8fbfa` mint-white

### Marketing proof points (as published on the site)

Source: [src/components/Mission.tsx](src/components/Mission.tsx)

| Metric | Claim |
|---|---|
| Profiles processed (last 6 months) | 1M |
| Profiles processed daily | 10K+ |
| In-app review score (Interviews module) | 9.2 / 10 |
| AI accuracy rate | 99.87% |
| Candidate matching accuracy | 99.3% |

### Contact and conversion details

Present in both [src/components/Footer.tsx](src/components/Footer.tsx) and [src/pages/ContactUs.tsx](src/pages/ContactUs.tsx):

- **Phone:** +91 9964667676
- **Email:** support@veriright.com
- **Office hours:** Mon–Sat, 9:30 AM – 7:00 PM IST
- **Implied market:** India-first (DPDPA alignment, IST hours, +91 number, India-focused blog content), with global compliance messaging (GDPR/CCPA) for enterprise buyers.

---

## 2. Business Logic

This is a **conversion-oriented marketing site**. Its "business logic" is not transactional processing — it is the funnel design, the content model, and the small amount of client-side interaction logic that supports them.

### 2.1 Conversion funnel

```
Traffic
  │
  ├─► Home (/)                      ── broad value prop + social proof
  │      └─ Hero CTA: "Book a Demo" / "Get Free Quote"
  │
  ├─► Platform pages (8 routes)     ── capability-specific deep dives
  │      └─ Repeated CTA: "Request Demo" (hero) + "Book a Demo Today" (footer CTA block)
  │
  ├─► About Us / Blog               ── trust and authority building
  │
  └─► Contact Us (/contact-us)      ── lead capture form
         └─ Persistent: Navbar "Request Demo" + floating ChatbotWidget on every page
```

Every route renders the same persistent conversion surfaces:
- **Navbar** — sticky "Request Demo" button (desktop and mobile)
- **Footer** — newsletter signup + full platform/company sitemap + contact block
- **ChatbotWidget** — floating orange bot button, bottom-right, on 100% of pages

### 2.2 Content model as business logic

The site's core architectural decision is that **product marketing content is data, not markup**. Each of the 8 platform pages is a data object passed into one shared layout component.

The canonical content contract (`ProductPageProps` in [src/components/ProductPageLayout.tsx:5](src/components/ProductPageLayout.tsx#L5)) encodes the standard B2B SaaS sales narrative:

| Content slot | Sales purpose |
|---|---|
| `title` + `description` | Positioning statement — what the module is |
| `features[]` (4 items) | Capability proof — what it does |
| `workflowSteps[]` (6 items) | Process credibility — how it works end-to-end |
| `benefits[]` (4 items) | Outcome framing — why it matters commercially |
| `faqs[]` (3 items) | Objection handling — de-risk the purchase |
| `ctaTitle` / `ctaDesc` | Conversion ask — book a demo |

**Business consequence:** launching a new product module page requires authoring one data object (~40 lines), not building a page. Narrative consistency across all modules is enforced structurally.

### 2.3 Interactive business logic (the only real logic in the codebase)

| Logic | Location | Behavior |
|---|---|---|
| **FAQ knowledge-base search** | [src/components/FAQ.tsx:67](src/components/FAQ.tsx#L67) | Case-insensitive substring match of the user query against a local 9-entry `knowledgeBase` array (question text and answer text). First match wins; result scrolls into view. On no match, shows a fallback prompt. |
| **Chatbot conversation** | [src/components/ChatbotWidget.tsx:26](src/components/ChatbotWidget.tsx#L26) | Appends the user message to local state, then after a 1000 ms `setTimeout` appends a **fixed canned reply**: *"Thanks for your message! Our team will get back to you shortly…"*. No network call, no AI. |
| **Active-route highlighting** | [src/components/Navbar.tsx](src/components/Navbar.tsx) | `useLocation().pathname` compared against link paths; matching link renders in brand orange + bold. |
| **Scroll-state navbar** | [src/components/Navbar.tsx:11](src/components/Navbar.tsx#L11) | Past 10 px scroll, header switches from transparent to `bg-white/90` + backdrop blur + shadow. |
| **FAQ accordion** | [src/components/ProductPageLayout.tsx:53](src/components/ProductPageLayout.tsx#L53) | Single-open accordion via `openIdx` state; index `0` open by default, clicking the open item sets `-1` (all closed). |
| **Scroll restoration** | `useEffect` in every page component | `window.scrollTo(0, 0)` on mount, since React Router does not reset scroll between routes. |

### 2.4 Lead-capture logic — current state

**The funnel is closed end to end.** *(Updated Oct 2026: the form is now [site/Contact.tsx](src/pages/site/Contact.tsx) at `/contact` (since Nov 2026 also: contact cards, a sticky navy "What happens next" panel, a form progress bar "n of 6 required", icon chips for company type) with the content document's fields — full name, work email, phone, company, company type, optional team size and message, plus consent. [server/index.js](server/index.js) accepts that shape and, for cached old pages, the earlier firstName/lastName/subject/message shape; the form also sends those legacy fields so it works against an undeployed old API. Redeploy the API with `deploy.sh --api`.)* Every "Book a Demo" / "Request Demo" / "Get Free Quote" control links to the constants in [src/lib/routes.ts](src/lib/routes.ts) (`DEMO_PATH`, `QUOTE_PATH`, `PLATFORM_PATH`), all of which currently point at `/contact-us`. The form there is a controlled React form that POSTs to `/api/contact`.

```
ContactUs form  ──POST /api/contact──►  nginx  ──proxy──►  127.0.0.1:8060
                                                            (pyhire-site-api, pm2)
                                                                 │
                                                    ┌────────────┴────────────┐
                                                    ▼                         ▼
                                          append to leads.jsonl        SMTP → support@veriright.com
                                          (source of truth)            (notification)
```

**The recording happens before the email, deliberately.** SMTP is the part that breaks — expired passwords, provider limits, DNS. A lead that only ever existed inside a failed `sendMail()` is a lead lost silently, so the JSONL file is authoritative and the email is a notification about it. If SMTP is unconfigured or failing, the visitor still gets a success confirmation because their message *is* safely recorded; the gap is ours, not theirs. See [server/index.js](server/index.js).

Validation runs on both sides: the client's is for the visitor's benefit (inline messages, focus moves to the first bad field), the server's is the one that counts. The API also rate-limits to 5 submissions per IP per 15 minutes.

**The newsletter signup was removed, not repaired** ([Footer.tsx](src/components/Footer.tsx)). It reported "you're on the list" while storing nothing. There is no list to subscribe anyone to yet, so the honest move was to take it down; wire an endpoint first, then restore the markup from history.

The chatbot still returns a canned string. See [Section 13](#13-known-gaps--technical-debt).

---

## 3. Technical Architecture

### 3.1 Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| UI framework | React | ^19.0.1 | Function components + hooks only; no class components |
| Language | TypeScript | ~5.8.2 | `noEmit` — type-check only, Vite handles transpilation |
| Build tool | Vite | ^6.2.3 | With `@vitejs/plugin-react` ^5.0.4 |
| Routing | react-router-dom | ^7.18.2 | `BrowserRouter`, client-side only, with `lazy()` chunks for the content routes |
| Styling | Tailwind CSS | ^4.1.14 | Via the `@tailwindcss/vite` plugin — **no `tailwind.config.js`** |
| Animation | motion (Framer Motion) | ^12.23.24 | Imported as `motion/react` |
| Icons | lucide-react | ^0.546.0 | Sole icon system |
| Prerendering | puppeteer (dev dep) | ^25.5.0 | Drives [scripts/prerender.mjs](scripts/prerender.mjs); downloads a Chromium on install |
| Package manager | Bun or npm | — | Both `bun.lock` and `package-lock.json` are committed |

**Declared but unused in `src/`:** `@google/genai`, `express`, `dotenv`, `tsx`, `esbuild`, `autoprefixer`. These are inherited from the Google AI Studio scaffold. The only environment variable any source file reads is `VITE_SITE_URL` (in [src/lib/site.ts](src/lib/site.ts)); there are still zero `fetch`/`axios` calls anywhere in `src/`.

### 3.2 Architectural shape

```
┌──────────────────────────────────────────────────────────┐
│  index.html   →   src/main.tsx   (createRoot + StrictMode)│
└───────────────────────────┬──────────────────────────────┘
                            ▼
┌──────────────────────────────────────────────────────────┐
│  src/App.tsx  —  BrowserRouter shell                      │
│  ┌────────────────────────────────────────────────────┐  │
│  │  <Navbar />           persistent, fixed, z-50       │  │
│  ├────────────────────────────────────────────────────┤  │
│  │  <Routes>  16 routes (4 lazy)  ← swapping region    │  │
│  ├────────────────────────────────────────────────────┤  │
│  │  <Footer />           persistent                    │  │
│  │  <ChatbotWidget />    persistent, fixed, z-50       │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

Layout root: `min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-emerald-200`. `App` also calls `useSiteJsonLd()`, so the Organization / WebSite / SoftwareApplication graphs are emitted on every route. The four content routes render inside a `<Suspense>` skeleton.

### 3.3 Core architectural patterns

**Pattern 1 — Layout inversion / data-driven pages (the most important pattern in the repo)**

Seven of the eight platform pages contain **no JSX layout of their own**. They export a single function that returns `<ProductPageLayout {...contentObject} />`. All visual structure lives in one file.

```
JobManagement.tsx ─┐
AICandidateMatching.tsx ─┤
InterviewManagement.tsx ─┤
ClientVendorManagement.tsx ─┼──► ProductPageLayout.tsx ──► rendered page
UnifiedCommunication.tsx ─┤        (single source of
AnalyticsDashboards.tsx ─┤         layout truth)
ComplianceSecurity.tsx ─┘
```

**Editing `ProductPageLayout.tsx` changes seven pages simultaneously.** This is the highest-blast-radius file in the codebase.

**Pattern 2 — Custom hero override**

Each product page supplies a bespoke hero via the `customHero?: React.ReactNode` prop, paired with a dedicated `*Hero.tsx` component. When `customHero` is provided, the layout's generic hero is bypassed entirely ([ProductPageLayout.tsx:59](src/components/ProductPageLayout.tsx#L59)). All 8 product pages use this override, which means the `hero: { imageSrc }` prop each page still passes is **dead data** — never rendered.

**Pattern 3 — CSS-only infinite marquees**

Three distinct marquee animations are implemented with inline `<style>` blocks and `animate-[name_duration_linear_infinite]` arbitrary Tailwind values, all pausable on hover via `group-hover:[animation-play-state:paused]`:

| Animation | Where | Technique |
|---|---|---|
| `marquee` (horizontal, features) | ProductPageLayout | Array tripled `[...features, ...features, ...features]`, translate to `-33.33%` |
| `marqueeWorkflow` (horizontal, timeline) | ProductPageLayout | Array doubled, translate to `-50%`, alternating above/below a centre rail |
| `marqueeVertical` (benefits column) | ProductPageLayout | Array doubled, `translateY(-50%)`, gradient masks top and bottom |
| `marqueeHorizontal` (wavy SVG timeline) | CandidateManagement | 5800 px-wide SVG bezier path with a gradient stroke, 18-column grid |

The seamless-loop invariant: **the duplication factor must match the translate percentage** (2× → −50%, 3× → −33.33%). Changing one without the other visibly breaks the loop.

**Pattern 4 — Utility-first styling with arbitrary values**

There is no design-token file and no `tailwind.config.js`. Tailwind v4 is configured entirely by the Vite plugin, and [src/index.css](src/index.css) contains exactly one line: `@import "tailwindcss";`. Consequently the design system lives as **repeated arbitrary values** across components — e.g. `text-[#f97316]`, `rounded-[32px]`, `text-[1.125rem]`, `shadow-[0_8px_30px_rgb(0,0,0,0.04)]`. A rebrand currently requires a global find-and-replace.

**Pattern 5 — Scroll-triggered reveal animations**

Motion's viewport API is used consistently for section entrances:
```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
```

### 3.4 Rendering and state model

- **No global state.** No Context, Redux, Zustand, or React Query anywhere.
- **No data fetching.** Zero network requests originate from application code.
- **All state is component-local `useState`** — 6 stateful components total (Navbar, FAQ, ChatbotWidget, ProductPageLayout, CandidateManagement, plus the router).
- **All content is compiled into the bundle** as literal arrays and JSX.

### 3.5 Asset strategy

| Asset type | Source | Risk |
|---|---|---|
| Product demo videos | `public/ai-recruitment-platform-mvp.mp4` (3.5 MB, hero autoplay) and `public/pyhire-website-video.mp4` (8.8 MB, user-controlled, with a `.jpg` poster) | 12.3 MB combined — still the dominant load cost |
| Brand + product photography | Local `.webp` / `.jpg` in `public/` (hero shots, avatars, logo, favicon) | None |
| Remaining photography | **Unsplash hot-links** (`images.unsplash.com`) — still ~50 references across 18 files | Third-party dependency; a hotlink block degrades many pages at once. `index.html` preconnects to the host |
| Icons | lucide-react (bundled SVG) | None |
| Illustrations, dashboards, charts | Hand-built JSX + inline SVG | None |

### 3.6 Responsive strategy

Mobile-first Tailwind breakpoints. Two notable patterns:
- **Navbar:** desktop hover-dropdown nav below `lg`, replaced by a `max-h`-transition mobile accordion.
- **Timelines:** the animated horizontal marquee timeline is `hidden lg:block` (or `hidden xl:block` on CandidateManagement); a simple stacked vertical card list renders as the mobile alternative. Both render the same `workflowSteps` data.

---

## 4. Folder Structure

```
ai-recruiting-platform/
│
├── CLAUDE.md                         ← this document
├── README.md                         ← AI Studio scaffold readme (STALE — still says "set GEMINI_API_KEY")
├── index.html                        ← Vite entry; real title, description, favicon, Unsplash preconnect
├── package.json                      ← name is still "react-example"
├── vite.config.ts / tsconfig.json
├── metadata.json  /  .env.example    ← AI Studio leftovers (see §7.1)
├── bun.lock  /  package-lock.json    ← two lockfiles present
│
├── update_*.sh|js|py (4 files)       ← one-off codemods, already applied (see §10 Tier 3)
├── *.mp4 (2 files, ~33.5 MB)         ← unused originals of the public/ videos
├── CLAUDE.zip                        ← stray archive
│
├── scripts/                          ← build-time Node scripts (not shipped)
│   ├── routes.mjs                    ★ single source of truth for crawlable URLs
│   ├── prerender.mjs                 ★ puppeteer snapshot of every route → static HTML
│   ├── sitemap.mjs                   ← sitemap.xml + robots.txt
│   └── build-guard.mjs               ★ refuses to let a half-built dist/ be deployed
│
├── server/                           ← the contact form's backend (deployed separately)
│   ├── index.js                      ← express + nodemailer, binds 127.0.0.1:8060
│   ├── .env.example                  ← SMTP settings; the real .env lives on the server
│   └── data/leads.jsonl              ← every enquiry, appended (gitignored, server-side)
│
├── deploy/
│   ├── deploy.sh                     ★ build → verify → upload → restart → smoke test
│   └── nginx-pyhire-site.conf        ← vhost for pyhire.veriright.com
│
├── public/                           ← served at web root; 2 videos + local .webp/.jpg imagery (~14 MB)
│
└── src/
    ├── main.tsx                      ← createRoot (NOT hydrateRoot — see §12.6)
    ├── App.tsx                       ← router shell, lazy content routes, persistent chrome
    ├── index.css                     ← Tailwind import + scroll-padding + prefers-reduced-motion reset
    │
    ├── lib/                          ← the only non-presentational code in the app
    │   ├── routes.ts                 ★ DEMO_PATH / QUOTE_PATH / PLATFORM_PATH — every CTA target
    │   ├── site.ts                   ★ siteOrigin(), absoluteUrl(), Organization/WebSite/SoftwareApplication JSON-LD
    │   ├── useSeo.ts                 ★ per-route <head> management + sitewide JSON-LD hook
    │   └── content.ts                ← Block type, plainText, slugifyHeading, extractFaq, extractHeadings
    │
    ├── data/                         ← the CMS: plain TypeScript content stores
    │   ├── blogPosts.ts              ← articles as structured Block[] bodies
    │   └── caseStudies.ts            ← case studies, same shape
    │
    ├── components/                   ← shared + home-page components
    │   ├── Navbar / Footer / ChatbotWidget      persistent chrome
    │   ├── ProductPageLayout.tsx     ★ shared layout driving 7 product pages
    │   ├── Prose.tsx / RichText.tsx  ← long-form typography + inline-marker renderer
    │   ├── blog/BlogPrimitives.tsx   ← cards/meta shared by Blog, BlogPost, CaseStudyDetail
    │   ├── CaseStudyNav.tsx          ← prev/next between case studies
    │   ├── Hero, Mission, PlatformOverview, Features, Compliance, FeatureHighlight,
    │   │   VideoSection, Testimonials, FAQ, FAQContact, Insights, CTA
    │   └── LogoCloud.tsx             ⚠ defined but never imported (dead code)
    │
    └── pages/                        ← 16 routed pages + 8 hero partials
        ├── Home.tsx                      composes 11 home sections
        ├── CandidateManagement.tsx   ★   bespoke page (does NOT use ProductPageLayout)
        ├── 7 data-only product pages     → <ProductPageLayout {...content} />
        ├── *Hero.tsx (8 files)           bespoke hero per product page
        ├── Blog.tsx / BlogPost.tsx       listing + /blog/:slug article
        ├── CaseStudies.tsx / CaseStudiesList.tsx / CaseStudyDetail.tsx / CaseStudiesHero.tsx
        ├── AboutUs.tsx / ContactUs.tsx
        └── NotFound.tsx                  catch-all, noindex
```

**Convention note:** `src/pages/` mixes routed pages with non-routed hero partials (`*Hero.tsx`) and a list partial (`CaseStudiesList.tsx`); conventionally those belong in `src/components/`.

---

## 5. Feature Documentation

### 5.1 Route map

**Content source of truth: `PyHire_Website_Content.pdf` (14 October 2026).** Every page's copy, the menu, CTAs, prices and title/meta tags come from it verbatim. Where it says "to be supplied" or "confirm before publishing", the site shows nothing rather than inventing it (customer logos, quotes, results, company story, commission terms, certifications/hosting region).

| Route | Page | Source |
|---|---|---|
| `/` | [Home.tsx](src/pages/Home.tsx) | doc §2 |
| `/product/{jobs-and-candidates, ai, interviews-and-offers, communication, clients-and-vendors, analytics, careers-page, mobile}` | one template, [site/ProductPage.tsx](src/pages/site/ProductPage.tsx) | copy in [data/productPages.ts](src/data/productPages.ts), doc §3–10 |
| `/solutions` | [site/Solutions.tsx](src/pages/site/Solutions.tsx) | doc §12 |
| ~~`/security`~~ | **Removed 2026-10-28 at the business's request** (doc §11). `/compliance-security` now redirects to `/` | — |
| `/pricing` | [site/Pricing.tsx](src/pages/site/Pricing.tsx) | doc §13 (plans, limits, inclusions, FAQ + FAQPage JSON-LD) |
| `/partners`, `/about`, `/contact` | [site/Partners.tsx](src/pages/site/Partners.tsx), [site/About.tsx](src/pages/site/About.tsx), [site/Contact.tsx](src/pages/site/Contact.tsx) | doc §14 |
| `/blog`, `/blog/:slug`, `/case-studies`, `/case-studies/:slug`, `/privacy-policy`, `/terms-of-use` | unchanged | — |
| old URLs (`/job-management`, `/candidate-management`, `/about-us`, `/contact-us`, …) | `<Navigate replace>` to the new page | `legacyRedirects` in [data/navigation.ts](src/data/navigation.ts) — **also add these as nginx 301s** |
| `*` | [NotFound.tsx](src/pages/NotFound.tsx) | noindex |

All inner pages are `lazy()` chunks. The old page components (`JobManagement.tsx`, `AboutUs.tsx`, `ContactUs.tsx`, `ProductPageLayout.tsx`, …) are no longer routed but are kept.

**Navigation has one source:** [src/data/navigation.ts](src/data/navigation.ts) (`productLinks`, `mainLinks`, `resourceLinks`, `legalLinks`, `legacyRedirects`) feeds the Navbar, Footer, product-page "More of PyHire" strip and the router. The only list kept by hand is `STATIC_ROUTES` in [scripts/routes.mjs](scripts/routes.mjs) (prerender + sitemap) — update it with any route change.

**CTAs** ([lib/routes.ts](src/lib/routes.ts)): `DEMO_PATH = /contact`; `TRIAL_PATH = /contact?topic=trial` because no self-serve sign-up URL exists yet. `?topic=` (trial, partner, enterprise, app) labels the enquiry on the form and in the lead record.

### 5.2 Home page composition — PyCore family design (2026-10-30)

**The whole site now follows the PyMedic (pymedic.com) design system**, with PyHire's own logo colours: navy `#02224C` (ink, dark panels) and orange `#FD6500` (where PyMedic uses blue). Fonts: **Outfit** headings (extra-bold, tight), **Figtree** body — loaded in `index.html`, exposed via `@theme` (`--font-inter`/`--font-script` now also resolve to Figtree). Tokens and primitives live in [components/home/shared.tsx](src/components/home/shared.tsx): `INK`, `MUTED`, `ACCENT`, `ACCENT_DEEP`, `TINT`, `PANEL` (navy); `Eyebrow` (uppercase), `SectionHeading` with an `accent` prop for **two-tone headlines** (navy lead + orange tail), pill `PrimaryButton` (navy text on orange — white on orange fails contrast) / `OutlineButton`.

**Home "next level" pass (2026-11):** `MTour` (tabbed product tour — 8 areas × 3 features, auto-steps every 3.2 s, built from `productPages` data, BlockViz visuals), `WhyChoose` (the doc's four reasons), `MPlans` (plan cards from the shared [data/plans.ts](src/data/plans.ts), also used by Pricing), and a `ScrollProgress` bar mounted in `App.tsx`; `MFeatures` is no longer rendered. Current order: MProblem → MMarquee → MJourney → MModules → MTour → MWorkspaces → WhyChoose → MOrbit → MPlans → MFaq → MVideo → MCta. Home sections ([components/medic/](src/components/medic/)): **since 2026-11-02 the top section is `MProblem` as the hero** (H1 "Recruiting shouldn’t need six tools and a spreadsheet.", CTAs added, with the cycling problem picture (`ProblemScene`: email, drive, phone, WhatsApp, report, slip-through) on the right and the six problem cards in a 3×2 grid below; the `OrbitDiagram` "Every module. One PyHire." now lives in its own `MOrbit` section between Workspaces and the FAQ (hero polish: drifting glow backdrop, pulsing eyebrow pill, shimmering gradient tail on the H1, green tick row, counting stats strip, and two floating callouts under the orbit — keep callouts out of the orbit area or they hide labels); the separate `MOrbit` section and `MHero` are kept but not rendered; the video `MVideo` sits just above the closing band). Orbit rings turn the same way at the same speed with inner labels offset 18°, so labels never collide. Original PyMedic order: `MHero` (two-tone H1, highlight, green trust pills, dark "Recruiter workspace" window + toast) → `MMarquee` ("One platform for") → `MVideo` (existing demo video) → `MProblem` (photo + dashed cards + solution banner) → `MJourney` (4 doc steps + 7-stage pipeline) → `MModules` (8 numbered cards, Explore →) → `MFeatures` (4 alternating deep dives from productPages data, app windows with BlockViz) → `MWorkspaces` (platform → 3 team boxes) → `MOrbit` → `MFaq` (pricing FAQ) → `MCta` (navy band). `AppWindow` is the shared window frame. Labels mirroring PyMedic ("One platform for", "Every module. One PyHire.", "Before you book a demo.") are the only non-document headings.

Inner pages: `PageHero` (left-aligned, two-tone word-reveal title via `splitHeadline`), product pages use `FeatureRows` (alternating full-width rows, app window + BlockViz), `ClosingBand` is the navy PyMedic band. Header: white floating bar, active link in a pale pill. Footer: white, divided columns. The Equip-era home components (HomeHero, HubFlow, WhyChoose, ProductAccordion, FinalCta, DemoShowcase, TestimonialWall…) remain in `components/home` but are not rendered.

### 5.3 Platform feature modules (the 8 marketed capabilities)

Each module below is one navigation item, one route, one footer link, and one card in the home `Features` grid.

#### Job Management — `/job-management`
> *"Create, publish, approve, and manage job openings efficiently from one platform."*

- **Features:** Smart Requisitions (AI-assisted JDs), Multi-level Approvals, One-Click Publishing (job boards + social + careers page), Dynamic Pipelines (custom stages per job)
- **Workflow:** Draft Requisition → Approval Chain → Job Description → Job Publishing → Sourcing Begins → Pipeline Management
- **Benefits:** Accelerate Approvals, Wider Reach, Better Organization, Cost Control
- **Stated integrations:** LinkedIn and other premium boards

#### AI Candidate Matching — `/ai-candidate-matching`
> *"Automatically match candidates to job openings using AI based on skills, experience, education, certifications, and job requirements."*

- **Features:** Deep Profile Analysis (context beyond keywords), Skill Graph Matching (adjacent skills), Instant Scoring, Bias Reduction
- **Workflow:** Job Requirements → Data Ingestion → Semantic Analysis → Scoring Generation → Ranking → Recruiter Action
- **Benefits:** Save Hundreds of Hours, Improve Quality of Hire, Rediscover Silver Medalists, Scale Your Hiring
- **Stated model behavior:** criteria weights are recruiter-adjustable; the model refines against your organization's hiring outcomes over time

#### Candidate Management — `/candidate-management`
> *"PyHire simplifies candidate management with AI-powered automation, smarter workflows, and seamless collaboration."*

The only bespoke platform page. Documents six capabilities — Unified Candidate Profile, AI Candidate Matching, Resume Parsing, Smart Candidate Search, Automated Pipeline, Activity Timeline — and the flagship **9-step hiring lifecycle** (see [Section 9](#9-user-workflows)).

#### Interview Management — `/interview-management`
> *"Schedule interviews, coordinate interview panels, collect structured feedback, and manage interview workflows from one platform."*

- **Features:** Smart Scheduling (calendar sync), Video Integration, Structured Scorecards, Panel Coordination
- **Benefits:** Eliminate Scheduling Ping-Pong, Objective Evaluations, Faster Feedback Loops, better Candidate Experience
- **Stated integrations:** Zoom, Microsoft Teams, Google Meet

#### Client & Vendor Management — `/client-vendor-management`
> *"Manage clients, staffing vendors, contracts, requisitions, and recruitment collaboration from a centralized workspace."*

- **Features:** Client Portals (review/approve submittals), Vendor Collaboration (agency submissions per requisition), Contract Management (MSAs, SLAs, placement terms), Performance Tracking
- **Benefits:** Enhanced Client Experience, Streamlined Communication, Data Security via granular permissions, Vendor Accountability
- **Note:** this is the module that makes PyHire an agency/staffing product rather than an in-house-only ATS

#### Unified Communication — `/unified-communication`
> *"Manage Email, WhatsApp, SMS, Calling, and internal recruiter communication from one unified inbox."*

- **Features:** Omnichannel Inbox (single thread across channels), Automated Sequences (multi-channel drip nurture), Internal Collaboration (@mentions, private notes), Communication History (uneditable audit trail)
- **Benefits:** Higher Response Rates, No Context Switching, Perfect Team Alignment (prevents duplicate outreach), Instant Notifications

#### Analytics & Dashboards — `/analytics-dashboards`
> *"Track recruitment KPIs, hiring performance, recruiter productivity, pipeline analytics, source effectiveness, and executive dashboards in real time."*

- **Features:** Real-time Dashboards, Source Effectiveness, Time-to-Hire Tracking (stage-by-stage velocity), Recruiter Productivity
- **Benefits:** Optimize Spend, Improve Forecasting, Enhance Candidate Quality, Executive Visibility

#### Compliance & Security — `/compliance-security`
> *"Ensure secure recruitment with role-based access control, audit logs, GDPR compliance, document security, and enterprise-grade data protection."*

- **Features:** Enterprise Encryption (AES-256 at rest, TLS 1.2+ in transit), Role-Based Access, GDPR & CCPA Ready (anonymization, consent, right-to-be-forgotten), Comprehensive Audit Logs
- **Benefits:** Mitigate Risk, Global Compliance, Secure Collaboration, Automated Governance
- **Home-page compliance badges** ([Compliance.tsx](src/components/Compliance.tsx)): DPDPA *(aligned for India)*, HIPAA *(programme in progress)*, ISO 27001 *(aligned controls)*, SSO/SAML *(enterprise plan)* — note the deliberately hedged wording

### 5.4 Home `Features` grid — 11 capability cards

[src/components/Features.tsx](src/components/Features.tsx) contains the 8 platform modules plus 3 additional capabilities that have **no dedicated page**:

| Card | Has its own route? |
|---|---|
| Job Management, AI Candidate Matching, Candidate Management, Interview Management, Unified Communication, Client & Vendor Management, Recruitment Analytics, Compliance & Audit Trail | ✅ Yes |
| **Candidate Pipeline** | ❌ No |
| **AI Interviews** | ❌ No |
| **Role-Based Access** | ❌ No |

Each card embeds a hand-coded JSX mockup of the corresponding product UI — e.g. the AI Matching card shows ranked candidates with "98% Match" / "94% Match" badges; the Candidate Management card shows a donut chart reading 1,290 profiles / 490 active.

### 5.5 Supporting content features

**Blog** ([Blog.tsx](src/pages/Blog.tsx) listing, [BlogPost.tsx](src/pages/BlogPost.tsx) detail) — 10 articles from [src/data/blogPosts.ts](src/data/blogPosts.ts), rendered at `/blog` and `/blog/:slug`. Article pages carry a derived reading time, an `h2` table of contents with scrollspy, an FAQ section extracted from the body, breadcrumbs, and `BlogPosting` + `BreadcrumbList` JSON-LD.

**Case Studies** ([CaseStudies.tsx](src/pages/CaseStudies.tsx) + [CaseStudiesList.tsx](src/pages/CaseStudiesList.tsx) listing, [CaseStudyDetail.tsx](src/pages/CaseStudyDetail.tsx) detail) — 10 studies from [src/data/caseStudies.ts](src/data/caseStudies.ts), same rendering pipeline plus a `disclaimer` field and prev/next navigation via [CaseStudyNav](src/components/CaseStudyNav.tsx). Client names and logos are deliberately absent from the data — the source documents don't contain them.

**About Us** ([AboutUs.tsx](src/pages/AboutUs.tsx)) — 5 sections: Hero + photo gallery, Idea & Creation, Our Commitment, Our Mission (3 value cards), and a closing CTA.

**FAQ knowledge base** ([FAQ.tsx](src/components/FAQ.tsx)) — 9 entries covering what PyHire is, AI matching, staffing-agency support, multi-recruiter/multi-client management, HR integration, data security, implementation time, workflow customization, and booking a demo. Serves as both sales collateral and objection handling.

**404** ([NotFound.tsx](src/pages/NotFound.tsx)) — catch-all page, marked `noindex, follow` through `useSeo`.

---

## 6. Module Documentation

### 6.1 `ProductPageLayout` — the system's keystone

**File:** [src/components/ProductPageLayout.tsx](src/components/ProductPageLayout.tsx)
**Consumers:** 7 product pages
**Exports:** `ProductPageProps` (interface), `ProductPageLayout` (component)

Renders six sections in fixed order:

| § | Section | Behavior |
|---|---|---|
| 1 | Hero | Renders `customHero` if supplied; otherwise a generic centered hero with a video-or-image frame |
| 2 | Powerful Features | Horizontal marquee of 350 px cards, array tripled, 40 s loop, edge gradient masks, pauses on hover |
| 3 | Workflow | Desktop: animated alternating timeline on a centre rail. Mobile: stacked cards |
| 4 | Benefits | Two-column split — heading + image left, vertically scrolling benefit cards right (30 s loop) |
| 5 | FAQ | Single-open accordion, item 0 open by default |
| 6 | Final CTA | Cream rounded panel, circular image, "Book a Demo Today" |

Behavior on mount: `window.scrollTo(0, 0)`.

**Full props contract:**

```ts
interface ProductPageProps {
  hero: { imageSrc?: string; videoSrc?: string };   // ignored when customHero is set
  title: string;
  description: string;
  features:      { title: string; desc: string; icon: React.ReactNode }[];
  workflowTitle: string;
  workflowDesc:  string;
  workflowSteps: { id: string; title: string; desc: string; icon: React.ReactNode }[];
  benefitsTitle: string;
  benefitsDesc:  string;
  benefitsImage: string;                             // absolute URL
  benefits:      { title: string; desc: string; icon: React.ReactNode }[];
  faqsTitle: string;
  faqsDesc:  string;
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaDesc:  string;
  ctaImage: string;                                  // absolute URL
  customHero?: React.ReactNode;
}
```

**Content conventions observed across all consumers:** 4 features, 6 workflow steps (`id` as `"01"`…`"06"`), 4 benefits, 3 FAQs. Feature/benefit icons are passed unstyled (the layout colors them); workflow icons are passed pre-styled as `className="w-6 h-6 text-[#f97316]"`.

### 6.2 Persistent chrome modules

| Module | State | Responsibilities |
|---|---|---|
| **Navbar** | `isScrolled`, `isMobileMenuOpen`, `useLocation()` | Logo → `/`; Home; Platform dropdown (8 links); Resources dropdown (Blog, Case Studies); About Us; Contact; "Request Demo" CTA. Desktop dropdowns are pure CSS (`group-hover` + opacity/visibility); the mobile menu is a `max-h` transition accordion that closes on link click. |
| **Footer** | none | Newsletter signup block; social icon row (4 placeholder `#` links); Platform column (8 links); Company column (4 links, one placeholder); Contact Information block (phone/email/hours); legal row (Privacy Policy, Terms of Use — both `#`). |
| **ChatbotWidget** | `isOpen`, `messages`, `inputValue`, `messagesEndRef` | 360×500 px panel anchored bottom-right, `AnimatePresence` enter/exit. Seeds one bot greeting. Auto-scrolls to newest message on change. Submit disabled while input is empty. **Replies are canned; no AI or network involved.** |

### 6.3 Home section modules

| Module | Data shape | Notes |
|---|---|---|
| `Hero` | none (literal JSX) | Autoplaying muted looping `/ai-recruitment-platform-mvp.mp4` in an orange-bordered frame; decorative absolute-positioned shapes |
| `Mission` | `stats[5]` — `{value, label}` | `whitespace-pre-line` renders `\n` in labels; yellow blur glow behind the card row |
| `Features` | `cards[11]` — `{icon, title, description, mockup: JSX}` | The largest home component (24 KB); each `mockup` is a bespoke product-UI illustration |
| `Compliance` | `badges[4]` — `{icon, title, desc}` | Dotted radial-gradient background; amber status dot conditionally rendered for HIPAA only |
| `FeatureHighlight` | literal JSX | Node-and-edge diagram using a `viewBox="0 0 100 100"` SVG with dashed bezier connectors and absolutely-positioned percentage-based nodes |
| `VideoSection` | none | User-controlled demo player, `preload="metadata"` |
| `Testimonials` | `testimonials[3]` — `{text, author, role, image}` | Authors are anonymized by company type (Technology Startup / D2C Brand / Manufacturing Company) |
| `FAQ` | `knowledgeBase[9]` — `{question, answer}` | Search + click-to-expand; embeds `FAQContact` at its foot to share the background glow |
| `Insights` | `articles[3]` — `{title, …}` | Teal `#0f766e` hover accent — the one place the brand orange is not used |
| `CTA` | literal JSX | Dual CTA + a 4-item trust row with emerald check icons |

### 6.4 `CandidateManagement` — the bespoke outlier

**File:** [src/pages/CandidateManagement.tsx](src/pages/CandidateManagement.tsx) (37 KB — the largest file in the repo)

Does not use `ProductPageLayout`. Contains its own section stack plus internal sub-components defined in the same file (a benefits section at line 415, an accordion FAQ at line 536 with its own `openIdx` state, and a CTA at line 584).

Its signature element is the **9-step wavy timeline**: an 18-column grid across a 5800 px canvas, with a hand-plotted quadratic-bezier SVG path (`M 0 100 Q 161 160, 322 100 T 644 100 T …`) carrying a fading orange gradient stroke, nodes alternating above and below the wave, animated as a 40 s marquee with a doubled step array. It renders only at `xl` and above; smaller viewports get a stacked card list.

**Maintenance warning:** the wave path, the `5800px` container width, the `repeat(18,1fr)` grid, and the doubled 9-step array are mutually dependent constants. Changing the number of steps requires recomputing all four.

### 6.5 Content subsystem — `src/data` + `src/lib/content.ts`

The blog and case-study sections are a **file-based CMS**: two TypeScript modules holding the canonical content, rendered by three pages.

```
data/blogPosts.ts  ─┐                    ┌─► Blog.tsx          (listing, lazy)
                    ├─ Block[] bodies ──►├─► BlogPost.tsx      (/blog/:slug)
data/caseStudies.ts ┘   + lib/content.ts └─► CaseStudyDetail.tsx (/case-studies/:slug)
                            │
                            └─► scripts/routes.mjs (regex-reads `slug:`) ─► prerender + sitemap
```

**Rules the content model enforces — respect them when adding content:**

| Rule | Why |
|---|---|
| Bodies are `Block[]` (`p` / `h2` / `h3` / `quote` / `ul` / `ol`), never HTML strings | The same source renders through different layouts; blocks are also what headings/FAQ extraction walks |
| Inline emphasis uses `**bold**` / `*italic*` markers, rendered by [RichText.tsx](src/components/RichText.tsx) | Avoids a markdown dependency; `plainText()` strips them for measuring and structured data |
| Reading time is **derived** from body word count, never hand-written | Kept honest automatically |
| FAQs are **extracted** from a body's "Frequently Asked Questions" `h2` section (`extractFaq`) | One source of truth for the visible FAQ and the `FAQPage` JSON-LD |
| The table of contents comes from `extractHeadings` (`h2` only) | `h3`s are too numerous in the long studies |
| `datePublished` / `dateModified` are optional and currently **unset** | The source documents carry no dates; the schema omits the fields rather than inventing them. Same reasoning kills `sameAs` in `organizationSchema()` and `offers` in `softwareApplicationSchema()` |
| The `slug:` field must stay on its own line in the form `slug: 'x',` | [scripts/routes.mjs](scripts/routes.mjs) parses the file with a regex rather than a TS loader; a reformat that breaks the pattern throws the build |

**Adding an article or case study** is therefore: append one object to the data module, and rebuild. Route, sitemap entry, prerendered HTML, listing card, reading time and structured data all follow automatically.

### 6.6 SEO subsystem — `src/lib`

| Module | Responsibility |
|---|---|
| [site.ts](src/lib/site.ts) | `siteOrigin()` (from `VITE_SITE_URL`), `absoluteUrl()`, and the sitewide `Organization` / `WebSite` / `SoftwareApplication` graphs. **All schema `@id`s and canonicals must be absolute** — building them here is what stopped relative `@id`s being emitted |
| [useSeo.ts](src/lib/useSeo.ts) | `useSeo({title, description, canonicalPath, image, type, noIndex, jsonLd})` writes title/canonical/OG/Twitter/robots and JSON-LD directly into `document.head`, tagging everything `data-seo` and reverting on unmount. `useSiteJsonLd()` (called once in `App`) emits the sitewide graphs under a separate `data-seo-site` marker so per-route cleanup leaves them alone |
| [routes.ts](src/lib/routes.ts) | `DEMO_PATH`, `QUOTE_PATH`, `PLATFORM_PATH` — every CTA destination |

`useSeo` is called by Home, the seven `ProductPageLayout` pages (via the layout), CandidateManagement, AboutUs, ContactUs, Blog, BlogPost, CaseStudies, CaseStudyDetail and NotFound. **Any new routed page must call it** — a page that doesn't inherits whatever the previous route left in `<head>`, and the prerenderer will flag it (see the `SHELL_TITLE` note in [Section 13](#13-known-gaps--technical-debt)).

### 6.7 Dead and duplicated code

| Item | Status |
|---|---|
| [src/components/LogoCloud.tsx](src/components/LogoCloud.tsx) | Exported, never imported. Fully dead. |
| `hero={{ imageSrc: ... }}` on all 8 product pages | Passed but never rendered — every page overrides with `customHero`. Dead data. |
| Large `lucide-react` import blocks | Copy-pasted across the product pages; each uses only a fraction. |
| Root-level `.mp4` files (~33.5 MB) | Unused originals of the two `public/` videos. |
| `CLAUDE.zip` | Stray archive in the project root. |

---

## 7. API Documentation

### 7.1 HTTP API — none exists

**This application has no backend API and makes no runtime network requests.** There are zero `fetch`/`axios`/`XMLHttpRequest` calls in `src/`, and the only environment variable read anywhere is `VITE_SITE_URL` (build-time, in [site.ts](src/lib/site.ts)).

Leftovers from the Google AI Studio scaffold that imply an API that was never built:

| Artifact | Implication | Reality |
|---|---|---|
| `"@google/genai"` in dependencies | Gemini integration | Never imported |
| `"express"` + `"clean": "rm -rf dist server.js"` | An Express server | No server file exists |
| `metadata.json` → `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` | Server-side Gemini | No server-side code |
| `.env.example` → `GEMINI_API_KEY`, `APP_URL` | Runtime config | Neither is read; the variable that matters is `VITE_SITE_URL`, which `.env.example` does **not** document |

### 7.2 Internal component API (the actual contracts)

The meaningful "API" in this codebase is the set of component prop contracts.

**`ProductPageLayout(props: ProductPageProps)`** — the primary contract. Full signature in [Section 6.1](#61-productpagelayout--the-systems-keystone). All fields are required except `customHero`; there are no defaults and no runtime validation. Omitting a required field is a TypeScript error caught only by `npm run lint`.

**`Blog.tsx` internal components** (defined in-file, typed `any` — no prop validation):

```ts
ArticleCard({ image, category, featured, date, title, readTime }: any)
CategoryItem({ name, count }: any)
PopularArticleItem({ image, title, readTime }: any)
```

**Zero-prop components** (all content internal): `Navbar`, `Footer`, `ChatbotWidget`, `Hero`, `Mission`, `Features`, `Compliance`, `FeatureHighlight`, `VideoSection`, `Testimonials`, `FAQ`, `FAQContact`, `Insights`, `CTA`, `LogoCloud`, all 8 `*Hero` components, and every routed page.

### 7.3 Routing API

Declared in [src/App.tsx](src/App.tsx) with `BrowserRouter`. Two parameterised routes (`/blog/:slug`, `/case-studies/:slug`) resolve their content from the data stores and render `NotFound`-style copy for an unknown slug; a `*` catch-all renders [NotFound](src/pages/NotFound.tsx). The four content routes are `React.lazy` chunks behind a `<Suspense>` skeleton. No query-string handling, no nested routes, no route guards, no error boundaries.

**Deployment requirement:** `npm run build` prerenders all 35 routes (see [Section 12.6](#126-build-and-deploy)), so `dist/` contains a real `index.html` per route — e.g. `dist/case-studies/case-study-01-agency-multi-client/index.html`. The host must therefore satisfy **two** rules, in this order:

1. **Serve the directory index first.** A request for `/job-management` must resolve to `/job-management/index.html`. If the SPA rewrite runs first it shadows every prerendered page, and crawlers fall back to the empty shell — silently undoing the prerender.
2. **Then rewrite anything unmatched to `/index.html`**, because `BrowserRouter` uses the History API.

| Platform | Required setting |
|---|---|
| Netlify | `_redirects`: `/*  /index.html  200` — existing files win automatically, so rule 1 is satisfied by default |
| Vercel | `vercel.json` rewrite: `{ "source": "/(.*)", "destination": "/index.html" }` — filesystem is checked first by default |
| Nginx | `try_files $uri $uri/index.html $uri/ /index.html;` — note `$uri/index.html` must come **before** the final fallback |
| Apache | `.htaccess` with `DirectoryIndex index.html` and `FallbackResource /index.html` |

Verify after deploying with `curl -s https://<host>/case-studies/case-study-01-agency-multi-client | grep -c "<h2"` — a prerendered page returns a non-zero count, the empty shell returns 0.

### 7.4 Integration surface for future backend work

When the site is made functional, these are the endpoints it will need. **None of this is implemented** — it is the specification implied by the existing UI.

| Endpoint | Method | Consumer | Payload |
|---|---|---|---|
| `/api/contact` | POST | [ContactUs.tsx](src/pages/ContactUs.tsx) form | `firstName, lastName, email, phone, subject, message, consent` |
| `/api/newsletter` | POST | [Footer.tsx](src/components/Footer.tsx) signup | `email` |
| `/api/demo-request` | POST | Demo CTAs — repoint `DEMO_PATH` in [lib/routes.ts](src/lib/routes.ts) at a modal or scheduler | `name, email, company, phone` |
| `/api/chat` | POST (or stream) | [ChatbotWidget.tsx](src/components/ChatbotWidget.tsx) | `message, conversationId` → replaces the `setTimeout` stub |

Blog and case-study content deliberately needs **no** API: it lives in [src/data](src/data) and is prerendered at build time. Introducing a CMS fetch would trade away the static HTML that `scripts/prerender.mjs` exists to produce — if a CMS is ever added, keep it build-time.

---

## 8. Database Relationships

### 8.1 Current state: no database

**This repository contains no database, no ORM, no schema, no migrations, and no persistence of any kind.** All content is compiled into the JavaScript bundle as literal arrays. Nothing entered by a visitor is stored anywhere — form input is discarded on page unload, and chatbot messages live only in component state.

### 8.2 Conceptual domain model (implied by the marketed product — not implemented)

The eight platform pages describe a coherent recruitment data model. The following is reverse-engineered from that marketing copy and is documented as a **specification for future backend work**, not as a description of existing code.

```
                    ┌───────────────┐
                    │  Organization │  (tenant root)
                    └───────┬───────┘
                            │ 1
        ┌───────────────────┼────────────────────┬──────────────────┐
        │ N                 │ N                  │ N                │ N
   ┌────▼─────┐       ┌─────▼──────┐      ┌──────▼──────┐    ┌──────▼──────┐
   │   User   │       │   Client   │      │   Vendor    │    │  AuditLog   │
   │(recruiter│       │ (hiring    │      │ (staffing   │    │             │
   │ /manager)│       │  company)  │      │  agency)    │    └─────────────┘
   └────┬─────┘       └─────┬──────┘      └──────┬──────┘
        │ N:M               │ 1                  │ N:M
        │             ┌─────▼──────┐             │
        │             │ Requisition│◄────────────┘
        │             │   (Job)    │   vendors submit candidates
        │             └─────┬──────┘   to specific requisitions
        │                   │ 1
        │                   │ N
        │           ┌───────▼────────┐        ┌──────────────┐
        │           │   Application  │───N:1─►│   Candidate  │
        │           │   (Pipeline    │        │  (unified    │
        │           │    Entry)      │        │   profile)   │
        │           └───────┬────────┘        └──────┬───────┘
        │                   │ 1                      │ 1
        │      ┌────────────┼───────────┐            │ N
        │      │ N          │ N         │ N   ┌──────▼────────┐
        │  ┌───▼────┐  ┌────▼─────┐ ┌───▼───┐ │    Resume     │
        └─►│Interview│  │MatchScore│ │ Offer │ │  (parsed doc) │
           └───┬────┘  └──────────┘ └───────┘ └───────────────┘
               │ 1                                   │
               │ N                                   │ N
        ┌──────▼──────┐                    ┌─────────▼─────────┐
        │  Scorecard  │                    │ CommunicationLog  │
        │ (structured │                    │ (email/SMS/       │
        │  feedback)  │                    │  WhatsApp/call)   │
        └─────────────┘                    └───────────────────┘
```

### 8.3 Entity specifications

| Entity | Source page | Key attributes | Relationships |
|---|---|---|---|
| **Organization** | Compliance & Security | Tenant root; RBAC and retention policy scope | 1:N → all other entities |
| **User** | Compliance & Security, Unified Communication | Role (recruiter / hiring manager / admin / client user / vendor user), permission set | N:M ↔ Requisition; 1:N → Interview, CommunicationLog, AuditLog |
| **Client** | Client & Vendor Management | Company profile, contract terms (MSA/SLA), portal access | 1:N → Requisition |
| **Vendor** | Client & Vendor Management | Staffing agency, submittal/interview/placement performance metrics | N:M ↔ Requisition (scoped visibility) |
| **Requisition (Job)** | Job Management | Title, skills, budget, location, status, approval chain state, custom pipeline stage set | N:1 ← Client; 1:N → Application |
| **Candidate** | Candidate Management | **Unified profile** — one record regardless of how many roles they apply to (explicitly stated in the page FAQ) | 1:N → Application, Resume, CommunicationLog |
| **Application (Pipeline Entry)** | Candidate Management | The **join entity** between Candidate and Requisition; carries current stage, timestamps, status | N:1 ← Candidate; N:1 ← Requisition |
| **Resume** | Candidate Management | Original document + parsed skills/experience/contact fields | N:1 ← Candidate |
| **MatchScore** | AI Candidate Matching | Fit percentage, contributing factors, adjustable criteria weights | N:1 ← Application |
| **Interview** | Interview Management | Schedule, panel members, video conference link, stage | N:1 ← Application; N:M ↔ User (panel) |
| **Scorecard** | Interview Management | Structured, standardized evaluation criteria and ratings | N:1 ← Interview |
| **Offer** | Candidate Management (step 08) | Terms, negotiation history, acceptance status | N:1 ← Application |
| **CommunicationLog** | Unified Communication | Channel (email / SMS / WhatsApp / call / internal note), direction, body, thread id. **Stated as immutable** — "a complete, uneditable audit trail" | N:1 ← Candidate; N:1 ← User |
| **AuditLog** | Compliance & Security | Actor, action, target, timestamp. Covers "every action, view, and export" | N:1 ← Organization |

### 8.4 Relationship rules stated in the marketing copy

These are explicit product commitments and should be treated as hard requirements for any implementation:

1. **A candidate has exactly one profile across all applications.** *"Candidates can be associated with multiple positions while maintaining a single unified profile."* → `Candidate ─1:N─ Application ─N:1─ Requisition`; deduplication on ingest is mandatory.
2. **Pipeline stages are per-requisition, not global.** *"Pipelines are fully customizable per job opening."* → stage definitions belong to Requisition; Application references a stage within its own requisition's set.
3. **Approval chains can be sequential or parallel**, keyed on department or budget → the approval workflow needs its own state machine, not a single status column.
4. **Vendor visibility is row-level scoped.** *"Granular permissions ensure vendors only see what they need to."* → authorization must filter at the Application/Candidate level, not just by route.
5. **Communication and audit history are append-only.** Both are described as complete and uneditable → no UPDATE or DELETE on these tables; soft-delete only.
6. **Right-to-be-forgotten must be supported** (GDPR/CCPA/DPDPA) → anonymization must be reconcilable with rule 5; anonymize PII in place while preserving the audit chain.
7. **Silver-medalist re-matching** — past candidates are automatically matched against new openings → Candidate records persist beyond any single requisition's lifecycle, subject to retention policy.

---

## 9. User Workflows

### 9.1 Visitor workflows on this website

**A. Evaluate the product (primary path)**
```
Land on /  →  Hero  →  Mission KPIs  →  Platform overview  →  Features grid
  →  Compliance badges  →  Why-choose-PyHire  →  Demo video  →  Testimonials
  →  FAQ  →  Blog teasers  →  Final CTA  →  "Book a Demo" → /contact-us  ✔
```

**B. Research one capability**
```
Navbar → Platform dropdown → 1 of 8 modules  →  hero → features marquee
  →  workflow timeline → benefits → module FAQ → "Book a Demo Today" → /contact-us  ✔
```

**C. Self-serve a question** — Home → FAQ → type a query → substring match against the 9-entry knowledge base; match expands and scrolls into view, no match shows the `FAQContact` prompt. ✔

**D. Ask the assistant** — floating bot → type → 1 s delay → **fixed canned reply**. ⚠ No AI, no routing, no lead capture.

**E. Read editorial content**
```
/blog or /case-studies  →  listing card  →  /blog/:slug or /case-studies/:slug
  →  article with table of contents, scrollspy, extracted FAQ, prev/next  ✔
```

**F. Submit an enquiry**
```
/contact-us  →  fill 6 fields + consent  →  "Send Message"
  →  nothing happens   🔴 type="button", no handler, no state — the lead is lost
```

**G. Subscribe to the newsletter**
```
Footer → email → submit  →  UI reports success, nothing is stored   🔴 false confirmation
```

A, B, C and E work as designed. **F and G are the critical breakages** — and every CTA in A and B funnels straight into F.

### 9.2 The marketed 9-step hiring lifecycle

Documented on [CandidateManagement.tsx](src/pages/CandidateManagement.tsx) as the flagship end-to-end workflow — the process the actual PyHire product is claimed to run:

| Step | Stage | Description |
|---|---|---|
| 01 | Candidate Application | Candidates apply via careers page, job portals, or referrals |
| 02 | Resume Parsing | Key information extracted from resumes automatically |
| 03 | Candidate Profile Creation | Structured profiles built with all relevant details |
| 04 | AI Candidate Matching | AI matches candidates to suitable roles by best fit |
| 05 | Recruiter Review | Recruiters review matched candidates and shortlist |
| 06 | Interview Scheduling | Interviews scheduled with selected candidates |
| 07 | Evaluation & Feedback | Feedback collected and candidates evaluated at every stage |
| 08 | Offer Management | Offers sent, negotiations managed, acceptance tracked |
| 09 | Candidate Hired | Selected candidate converted to employee and onboarded |

### 9.3 Module-level workflows (6 steps each)

| Module | Workflow |
|---|---|
| **Job Management** | Draft Requisition → Approval Chain → Job Description → Job Publishing → Sourcing Begins → Pipeline Management |
| **AI Candidate Matching** | Job Requirements → Data Ingestion → Semantic Analysis → Scoring Generation → Ranking → Recruiter Action |
| **Interview Management** | *"Seamless Interview Workflows"* — scheduling through structured feedback collection |
| **Client & Vendor Management** | *"Collaborative Recruitment Workflow"* — requisition intake through client approval of submittals |
| **Unified Communication** | *"How Unified Communication Works"* — omnichannel inbox through automated sequences |
| **Analytics & Dashboards** | *"From Data to Insights"* — capture through executive reporting |
| **Compliance & Security** | *"Secure by Design"* — access control through automated governance |

Each module's six steps live in its page's `workflowSteps` array and render through the shared timeline in [ProductPageLayout](src/components/ProductPageLayout.tsx).

---

## 10. Important Files

### Tier 1 — highest impact

| File | Why it matters |
|---|---|
| [src/components/ProductPageLayout.tsx](src/components/ProductPageLayout.tsx) | **Highest blast radius.** Any edit changes 7 pages at once. Owns 3 of the 4 marquee animations, the `ProductPageProps` contract, and those pages' `useSeo` call. |
| [src/App.tsx](src/App.tsx) | Route table, lazy chunks, persistent chrome, `useSiteJsonLd()`. |
| [scripts/routes.mjs](scripts/routes.mjs) | The crawlable-URL list shared by the prerenderer and the sitemap. A static route missing here is invisible to crawlers. |
| [src/lib/site.ts](src/lib/site.ts) + [src/lib/useSeo.ts](src/lib/useSeo.ts) | All head/structured-data behaviour for all 33 URLs. |
| [src/data/blogPosts.ts](src/data/blogPosts.ts) + [src/data/caseStudies.ts](src/data/caseStudies.ts) | The content store — 10 posts and 10 studies; also the source of the dynamic routes. |
| [src/pages/CandidateManagement.tsx](src/pages/CandidateManagement.tsx) | The only bespoke product page; owns the 9-step lifecycle and the wavy-timeline geometry. |
| [src/components/Navbar.tsx](src/components/Navbar.tsx) | Navigation source of truth; `platformLinks` must stay in sync with `App.tsx`, the Footer and `routes.mjs`. |

### Tier 2 — content and configuration

| File | Role |
|---|---|
| [scripts/prerender.mjs](scripts/prerender.mjs) | Puppeteer snapshot of every route; scrolls each page and clears Motion's `opacity: 0` before capture |
| [scripts/sitemap.mjs](scripts/sitemap.mjs) | `sitemap.xml` + `robots.txt`; **fails the build without `VITE_SITE_URL`** |
| [src/lib/content.ts](src/lib/content.ts) | `Block` type, `plainText`, `slugifyHeading`, `extractFaq`, `extractHeadings` |
| [src/lib/routes.ts](src/lib/routes.ts) | Every CTA destination, in three constants |
| [src/components/Features.tsx](src/components/Features.tsx) | 11 capability cards with hand-built product mockups — the densest content file |
| [src/components/FAQ.tsx](src/components/FAQ.tsx) | The `knowledgeBase` array is the site's canonical product Q&A |
| [src/components/Footer.tsx](src/components/Footer.tsx) | Sitemap + contact details + the newsletter form |
| [src/components/Mission.tsx](src/components/Mission.tsx) | The 5 published KPI claims — verify before changing |
| [src/components/Compliance.tsx](src/components/Compliance.tsx) | Compliance badge wording is legally sensitive; the hedged phrasing is deliberate |
| [src/index.css](src/index.css) | Tailwind import, `scroll-padding-top` for anchor targets, global `prefers-reduced-motion` reset |
| [index.html](index.html) | Title, description, theme-color, favicon, Unsplash preconnect |
| [vite.config.ts](vite.config.ts) | Plugins, `@` alias, `DISABLE_HMR` escape hatch |
| [package.json](package.json) | Scripts and dependencies (still named `react-example`) |

### Tier 3 — historical / stale artifacts

`update_app.sh`, `update_navbar.js`, `update_product_layout.py`, `update_workflow.py` are one-off codemods that have **already run**. They are not part of the build and re-running them will no-op or corrupt files. `README.md` is still the unmodified AI Studio scaffold (it instructs setting `GEMINI_API_KEY`, which nothing reads). `metadata.json`, `.env.example` and `CLAUDE.zip` are likewise leftovers. Recommendation: archive or delete all of them, and rewrite the README around `VITE_SITE_URL` and the prerendered build.

### Static assets

| File | Size | Used by |
|---|---|---|
| `public/ai-recruitment-platform-mvp.mp4` | 3.5 MB | [Hero.tsx](src/components/Hero.tsx) — autoplay, muted, loop |
| `public/pyhire-website-video.mp4` (+ `-poster.jpg`) | 8.8 MB | [VideoSection.tsx](src/components/VideoSection.tsx) — user-controlled |
| `public/*.webp` / `*.jpg` | ~1.5 MB | Local hero, avatar and product imagery |
| `public/favicon.png`, `pyhire-mark.png`, `pyhire-logo.webp` | small | `index.html`, and the logo in every JSON-LD graph |
| Root `.mp4` × 2 | 33.5 MB | **Unused duplicates** |

---

## 11. Business Benefits

### 11.1 Benefits PyHire claims to deliver to customers

Aggregated from all eight platform pages — this is the value inventory available for sales and campaign copy.

**Speed**
- Save hundreds of hours by eliminating manual resume screening
- Approvals in hours instead of days — no email sign-off chains
- Eliminate scheduling ping-pong via automated calendar coordination
- Faster feedback loops through automated interviewer reminders

**Quality**
- Improve quality of hire via deep, objective criteria matching
- Objective evaluations through standardized scorecards
- Bias reduction by scoring strictly on qualifications
- Correlate candidate sources with long-term employee success

**Scale**
- Handle thousands of applications effortlessly
- Wider reach through integrated premium job boards
- Reusable talent pools; automatic re-matching of silver medalists
- Multi-user, multi-client, multi-vendor collaboration under RBAC

**Cost and ROI**
- Monitor job-board spend and posting ROI
- Reallocate budget away from underperforming sources
- Improve time-to-fill forecasting from historical data

**Experience**
- Better candidate experience — faster responses, consistent communication
- Higher response rates by reaching candidates on WhatsApp and SMS
- Branded client portals for reviewing submitted talent
- No recruiter context-switching between email, phone, and ATS

**Risk and governance**
- Mitigate breach and compliance risk proactively
- Adhere to international privacy law without manual effort
- Automated retention and data-lifecycle governance
- Complete audit trail of every action, view, and export

### 11.2 Business benefits of this codebase's architecture

| Architectural choice | Commercial benefit |
|---|---|
| Data-driven product pages | A new capability page ships as ~40 lines of content, not a design-and-build cycle — marketing can move at campaign speed |
| Single shared layout | Narrative consistency across all modules is structurally guaranteed; one design change updates 7 pages |
| Static SPA, no backend | Near-zero hosting cost, deployable to any CDN, no server to patch or scale |
| No database or auth | No PII is stored by the marketing site, which materially shrinks the compliance surface for a company selling on compliance |
| Marquee-based content display | Large content volumes fit in small viewport space without pagination, keeping the scroll depth to the CTA short |
| Hand-built JSX mockups (not screenshots) | Product visuals never go stale against a changing real UI; they are crisp at any resolution and cost nothing in image bandwidth |

### 11.3 Business risks currently carried by the site

| Risk | Impact | Priority |
|---|---|---|
| **Contact form silently discards leads** | Every CTA on the site funnels here, and every enquiry is lost with the visitor unaware | 🔴 Critical |
| **Newsletter reports success without storing anything** | Worse than inert — it makes a promise to the visitor that nothing fulfils | 🔴 Critical |
| **Chatbot gives a canned reply to everything** | Visitors expecting an "AI assistant" from an AI company get an obviously scripted response — an active credibility risk | 🟠 High |
| **Unsplash hot-linked imagery** (~50 references) | A third-party outage or hotlink block degrades many pages at once | 🟡 Medium |
| **12.3 MB of video on the two most-visited pages** | Slow first paint on mobile; measurable Core Web Vitals cost | 🟡 Medium |
| **Placeholder `#` links** (3 social icons, Privacy Policy, Terms of Use) | Dead navigation erodes trust; **missing Privacy Policy and Terms is a compliance exposure** for a DPDPA/GDPR-positioned vendor | 🟡 Medium |
| **No published dates on articles or case studies** | Freshness is a ranking and AI-citation signal; the schema correctly omits invented dates, so the fix is to supply real ones | 🟡 Medium |

---

## 12. Development Workflow

### 12.1 Prerequisites

- Node.js (LTS recommended)
- npm, or Bun (both lockfiles are present — **pick one and delete the other** to prevent dependency drift)

### 12.2 Setup

```bash
npm install          # or: bun install
npm run dev          # Vite dev server on 0.0.0.0:3000
```

Open http://localhost:3000.

`.env.local` is **not required** — no source file reads any environment variable. `.env.example` documents `GEMINI_API_KEY` and `APP_URL` for a Gemini integration that does not exist yet.

### 12.3 Available scripts

| Script | Command | Purpose |
|---|---|---|
| `npm run dev` | `vite --port=3000 --host=0.0.0.0` | Dev server with HMR, exposed on the local network |
| `npm run build` | `vite build && npm run prerender && npm run sitemap` | **Full production build** — bundle, then prerender all 35 routes, then sitemap/robots. Requires `VITE_SITE_URL` |
| `npm run build:spa` | `vite build` | Bundle only — skips prerender and sitemap (fast iteration) |
| `npm run prerender` | `node scripts/prerender.mjs` | Re-run the prerender against an existing `dist/` |
| `npm run sitemap` | `node scripts/sitemap.mjs` | Re-run sitemap + robots generation |
| `npm run preview` | `vite preview` | Serve the production build locally |
| `npm run lint` | `tsc --noEmit` | **Type-check only.** No ESLint or Prettier config exists in this repo |
| `npm run clean` | `rm -rf dist server.js` | Removes build output (the `server.js` reference is vestigial) |

**Windows notes:** `npm run clean` is Unix-only — use Git Bash or delete `dist/` by hand. `npm run build` also needs the Chromium that `puppeteer` downloads at install time; if install ran with downloads skipped, prerendering fails and `build:spa` is the fallback.

There is **no test runner** in this repo. `npm run lint` is the only automated check — run it before every commit.

### 12.4 Common development tasks

**Add a new product/platform page**

1. Create `src/pages/NewModuleHero.tsx` — the bespoke hero (model it on [JobManagementHero.tsx](src/pages/JobManagementHero.tsx)).
2. Create `src/pages/NewModule.tsx` returning `<ProductPageLayout customHero={<NewModuleHero />} … />`. Follow the established content shape: 4 features, 6 workflow steps (`"01"`…`"06"`), 4 benefits, 3 FAQs.
3. Register the route in [src/App.tsx](src/App.tsx).
4. Add the link to `platformLinks` in [src/components/Navbar.tsx](src/components/Navbar.tsx).
5. Add the link to the Platform column in [src/components/Footer.tsx](src/components/Footer.tsx).
6. **Add the path to `STATIC_ROUTES` in [scripts/routes.mjs](scripts/routes.mjs)** — skip this and the page is neither prerendered nor in the sitemap, so crawlers never see it.
7. Optionally add a matching card to [src/components/Features.tsx](src/components/Features.tsx).

Steps 3–6 are four separate lists kept in sync by hand. **Extracting a shared platform-nav constant that all four read is the single highest-value refactor available in the codebase.**

**Add a blog post or case study** — append one object to [src/data/blogPosts.ts](src/data/blogPosts.ts) or [src/data/caseStudies.ts](src/data/caseStudies.ts) (see [Section 6.5](#65-content-subsystem--srcdata--srclibcontentts) for the rules). Route, listing card, reading time, structured data, prerendered HTML and sitemap entry all follow automatically — nothing else to edit.

**Edit product copy** — change the data arrays in the relevant `src/pages/*.tsx` file. No layout changes needed.

**Edit the FAQ** — modify `knowledgeBase` in [src/components/FAQ.tsx](src/components/FAQ.tsx). Remember the search is a naive substring match: phrase questions using the words visitors will actually type.

**Change brand color** — currently requires a global find-and-replace of `#f97316` (plus `#ea580c`, `#FF6B00`, `#ff5a1f`, `orange-50`, `orange-100`, `orange-200`, `orange-600`). **Recommended:** define CSS custom properties in [src/index.css](src/index.css) via Tailwind v4's `@theme` block first.

**Change a marquee's speed** — edit the duration in the `animate-[name_40s_linear_infinite]` arbitrary value. **Do not change the array duplication factor without also changing the translate percentage** (2× ↔ −50%, 3× ↔ −33.33%), or the loop will visibly jump.

### 12.5 Conventions to follow

| Convention | Rule |
|---|---|
| Component exports | Named function exports (`export function X()`), except `App.tsx` which is a default export |
| File naming | PascalCase `.tsx` for all components and pages |
| Styling | Tailwind utilities inline; arbitrary values for exact design specs. No CSS modules, no styled-components |
| Icons | lucide-react exclusively |
| Animation | `motion/react` — `initial` / `whileInView` / `viewport={{ once: true }}` for reveals; CSS keyframes for marquees |
| Scroll reset | Every routed page must call `window.scrollTo(0, 0)` in a mount `useEffect` |
| **Page metadata** | Every routed page must call `useSeo({title, description, canonicalPath, …})`. Titles end with a `PyHire` suffix and should stay inside ~60 characters |
| **New routes** | Register in `App.tsx`, Navbar, Footer **and** `scripts/routes.mjs` |
| **Structured data** | Never invent a field to satisfy a rich-result warning. Dates, `sameAs` and `offers` are omitted precisely because the real values don't exist yet |
| Images | Local `public/` assets preferred; remaining Unsplash hot-links are legacy |
| Responsive | Mobile-first; provide a non-animated fallback for every desktop-only marquee |

### 12.6 Build and deploy

```bash
VITE_SITE_URL=https://pyhire.veriright.com npm run build   # bundle → prerender → sitemap
npm run check                                              # is dist/ actually deployable?
./deploy/deploy.sh --api                                   # build, verify, upload, restart
```

**`npm run build` runs four stages:** `vite build` produces the bundle, `build-guard start` drops a marker, [prerender.mjs](scripts/prerender.mjs) writes all 35 routes back as static HTML, [sitemap.mjs](scripts/sitemap.mjs) writes `sitemap.xml` + `robots.txt`, and `build-guard clear` removes the marker. Use `npm run build:spa` to skip prerendering during fast iteration.

**Why the guard exists.** `vite build` empties `dist/` *before* the prerender runs. If prerendering then fails — no Chrome, no `VITE_SITE_URL`, OOM — you are left with a `dist/` that looks perfectly deployable and is really just the empty SPA shell. Humans would see a working site; every crawler that does not execute JavaScript would see a blank page, and nothing in the output would warn you. `npm run check` ([build-guard.mjs](scripts/build-guard.mjs)) fails the deploy on a leftover marker, a missing sitemap, or an `index.html` whose `#root` is still empty. `deploy.sh` calls it before a single byte is uploaded. **This has already happened once — do not remove the guard.**

**Prerendering needs a Chrome.** `deploy.sh` finds the system Chrome and exports `PUPPETEER_EXECUTABLE_PATH`, because puppeteer's own downloaded `chrome.exe` on the Windows dev box is 0 bytes (antivirus truncation — the other 24 files in its cache are intact). An explicit path always wins, so this is harmless where puppeteer's copy is fine.

**`VITE_SITE_URL` is not optional.** [useSeo](src/lib/useSeo.ts) builds canonicals and `og:url` from it, and the sitemap step fails the build without it.

#### Deployment target — devserver

| | |
|---|---|
| Host | `ssh devserver` (Ubuntu 24.04, nginx, pm2, user `veriright`) |
| Site root | `/home/veriright/pyhire-site/dist` |
| API | `/home/veriright/pyhire-site/api`, pm2 process `pyhire-site-api`, bound to `127.0.0.1:8060` |
| Vhost | `pyhire.veriright.com` — [deploy/nginx-pyhire-site.conf](deploy/nginx-pyhire-site.conf) |
| Rollback | previous release is kept as `dist.previous`; `mv dist dist.broken && mv dist.previous dist` |

**Do not confuse this with `pyhire-uat`.** That is a different nginx site serving the TruHire *product* frontend at `uat.pyhire.veriright.com` from `/home/veriright/pyhire-frontend/dist`, with its own API on port 8050. The marketing site is entirely separate and must not overwrite it.

**The nginx rule that matters** (already correct in the supplied vhost):

```nginx
location / { try_files $uri $uri/ /index.html; }
```

`$uri/` must come **before** the `/index.html` fallback. Reversed, the SPA fallback shadows every prerendered page and the whole prerender step is silently undone. Verify after any nginx change:

```bash
curl -s https://pyhire.veriright.com/product/ai | grep -o '<h2' | wc -l   # non-zero = prerendered
```

Use `grep -o … | wc -l`, not `grep -c`: the built HTML is a single long line, so a line count always reports 1.

### 12.7 Quality gates

Currently there are **no automated quality gates**: no tests, no test runner, no ESLint, no Prettier, no CI, no pre-commit hooks, and no git repository initialized in this directory.

`npm run lint` (which is only `tsc --noEmit`) is the sole automated check. Run it before every commit.

**Recommended additions, in order of value:** git init → ESLint + Prettier → CI running `lint` + `build` → Vitest + React Testing Library for the stateful components (FAQ search, Navbar, ChatbotWidget) → Lighthouse budget for the media-heavy home page.

---

## 13. Known Gaps & Technical Debt

Reflects the codebase as of 2026-08-26. Items marked 🔴 block a production launch.

### Functional gaps

| # | Gap | Location | Severity |
|---|---|---|---|
| 1 | **SMTP is not configured on the server.** Enquiries are recorded to `api/data/leads.jsonl` but no notification email is sent, so nobody knows a lead arrived until someone reads the file. Fill in `SMTP_*` in `/home/veriright/pyhire-site/api/.env` and `pm2 restart pyhire-site-api` | [server/.env.example](server/.env.example) | 🔴 |
| 2 | **Privacy Policy and Terms have not been through legal review.** Both were drafted from what the site actually does and are factually accurate as of 2026-08-26, but the governing-law clause (India / Bengaluru) and the liability wording need counsel's sign-off | [src/data/legal.ts](src/data/legal.ts) | 🟠 |
| 3 | Chatbot returns a fixed canned string after a `setTimeout` — no AI, no lead capture. An obviously scripted "AI assistant" on an AI company's site | [ChatbotWidget.tsx](src/components/ChatbotWidget.tsx) | 🟠 |
| 4 | Newsletter signup is removed rather than working — no way to subscribe at all | [Footer.tsx](src/components/Footer.tsx) | 🟡 |
| 5 | 3 social icons still link to `#`; `organizationSchema()` correctly omits `sameAs` until they exist | [Footer.tsx](src/components/Footer.tsx) | 🟡 |
| 6 | Articles and case studies carry no `datePublished` / `dateModified` — deliberately, since the sources have none. Supply real dates; freshness is a ranking and AI-citation signal | [blogPosts.ts](src/data/blogPosts.ts), [caseStudies.ts](src/data/caseStudies.ts) | 🟡 |
| 7 | `leads.jsonl` grows without rotation and is never pruned. Fine at current volume; revisit alongside a retention policy, which the Privacy Policy already promises | [server/index.js](server/index.js) | 🟢 |

*Resolved 2026-08-26:* the contact form captures and delivers leads; the newsletter's false success state is gone; Privacy Policy and Terms of Use exist as real pages, linked from the footer and the consent checkbox; the build can no longer ship a half-prerendered `dist/`; the site and its API are deployed to devserver.

### Build and SEO

| # | Gap | Severity |
|---|---|---|
| 7 | **`SHELL_TITLE` in [prerender.mjs:27](scripts/prerender.mjs#L27) no longer matches the `<title>` in [index.html](index.html)**, so the "this route set no metadata of its own" check can never fire — a new page that forgets `useSeo` passes the build silently. Keep the two strings equal, or read the title out of `dist/index.html` | 🟠 |
| 8 | `.env.example` documents `GEMINI_API_KEY` / `APP_URL` (unused) and **not** `VITE_SITE_URL`, the one variable the build actually requires | 🟡 |
| 9 | `README.md` is the untouched AI Studio scaffold — wrong install and run instructions | 🟡 |
| 10 | Route lists are duplicated in four places (App.tsx, Navbar, Footer, `scripts/routes.mjs`) with no shared constant | 🟡 |
| 11 | `scripts/routes.mjs` parses slugs from the data files with a regex — a reformat of `slug: 'x',` breaks the build | 🟢 |

### Performance

| # | Gap | Severity |
|---|---|---|
| 12 | 12.3 MB of video across the home page's two players; the hero video autoplays during initial load | 🟡 |
| 13 | ~50 Unsplash hot-links across 18 files — unsized and third-party, though `index.html` does preconnect | 🟡 |
| 14 | Only the four content routes are code-split; the 8 product pages and their heroes ship in the main bundle | 🟡 |
| 15 | Four simultaneous infinite CSS animations on product pages drive continuous compositing (now suppressed under `prefers-reduced-motion`) | 🟢 |

### Code quality

| # | Item | Severity |
|---|---|---|
| 16 | **No git repository initialised in this directory** — no history, no branches, no revert | 🟠 |
| 17 | Package still named `react-example` | 🟡 |
| 18 | Two lockfiles (`bun.lock` + `package-lock.json`) risk dependency drift — pick one | 🟡 |
| 19 | ~33.5 MB of unused root `.mp4` originals, plus `CLAUDE.zip` and four applied codemod scripts in the project root | 🟡 |
| 20 | Unused dependencies: `@google/genai`, `express`, `dotenv`, `tsx`, `esbuild`, `autoprefixer`; `metadata.json` still declares `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` | 🟢 |
| 21 | No design tokens — brand colours and radii repeated as arbitrary Tailwind values throughout | 🟡 |
| 22 | [LogoCloud.tsx](src/components/LogoCloud.tsx) is dead code; `hero.imageSrc` is dead data on all 8 product pages | 🟢 |

### Accessibility

| # | Gap | Severity |
|---|---|---|
| 23 | Navbar dropdowns are **hover-only** (`group-hover` + `invisible`) — not reachable by keyboard. The trigger is a `<button>` with no `aria-expanded` and no focus/click handling | 🟠 |
| 24 | No skip-to-content link; the fixed navbar is cleared for anchors via `scroll-padding-top` but not for tab order | 🟡 |
| 25 | Decorative Unsplash images lack meaningful or empty `alt` in several places | 🟡 |

*Resolved:* a global `prefers-reduced-motion` reset now neutralises every marquee and transition ([index.css](src/index.css)); the accordions in ProductPageLayout, CandidateManagement and Blog carry `aria-expanded`; the lazy-route fallback is `role="status"` / `aria-live`.

### Suggested launch sequence

1. **Wire lead capture** — items 1 and 2 (one form endpoint unblocks both; the newsletter's fake success is arguably more urgent than the dead form)
2. **Publish Privacy Policy and Terms** — item 4, a compliance exposure for a compliance-positioned vendor
3. **Fix the prerender metadata guard** — item 7, so the SEO work stays enforced
4. **Make the chatbot real or honest** — item 3
5. **`git init` and add CI running `lint` + `build`** — item 16
6. **Extract the shared route/nav constant** — item 10
7. **Accessibility pass** — items 23–25
8. **Performance pass** — items 12–14
9. **Cleanup** — items 8, 9, 17–22

---

*Documentation reflects a full read of the codebase. Where the site's marketing copy describes capabilities that are not implemented in this repository, that distinction is stated explicitly rather than assumed.*

---

## Addendum — per-page product layouts (2026-11-04)

The eight product pages no longer share one template. Copy still comes from `src/data/productPages.ts`; the layout is chosen by `page.mockup` in [src/components/site/ProductLayouts.tsx](src/components/site/ProductLayouts.tsx) (`ProductBody`):

| mockup | Body layout |
|---|---|
| jobs | `FeatureRows` (alternating rows) + `HeroDash` |
| ai | `StickyShowcase` (scroll-driven active block), centered hero |
| interviews | `TimelineFlow` (scroll-filled vertical line) |
| communication | `ChannelTabs` (tabs + Prev/Next) |
| clients | `BentoBlocks` (bento grid) |
| analytics | `StackedCards` (sticky stacking cards) |
| careers | `StepsPath` (numbered path), centered hero |
| mobile | `PhoneShowcase` (phone between feature columns) |

`ProductPage.tsx` uses `CENTERED = ['ai','careers']` for the hero and `hasHeroDash(kind)` to pick the dashboard hero visual. Continuous loops use `useLoops()` so prerendered snapshots stay stable.
