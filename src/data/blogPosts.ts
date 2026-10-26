/**
 * Canonical blog content store.
 *
 * The article body text below is reproduced verbatim from the supplied source
 * documents. Nothing is rephrased, summarised or trimmed. The only character-level
 * change is the repair of mis-decoded UTF-8 in the source files
 * ("â" -> "—", "rÃ©sumÃ©" -> "résumé", "â¢" -> "•"), so the intended characters render.
 *
 * Presentational metadata that the source documents do not contain
 * (image, category, tags) is marked below and kept separate from `body`.
 * Reading time is *derived* from the body word count, never hand-written.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] };

export interface BlogPost {
  slug: string;
  /** Verbatim H1 from the source document. */
  title: string;
  /**
   * Shorter title for the `<title>` tag only — the H1 on the page is unchanged.
   * Search results truncate at roughly 60 characters including the " | PyHire"
   * suffix. Falls back to `title` when absent.
   */
  seoTitle?: string;
  /** Verbatim first paragraph of the source document — used as the listing excerpt. */
  excerpt: string;
  /** Verbatim body of the source document. */
  body: Block[];
  /** Presentational metadata — not present in the source documents. */
  category: string;
  tags: string[];
  image: string;
  thumb: string;
  imageAlt: string;
  /**
   * ISO 8601 date (YYYY-MM-DD) published, and last substantively revised. Both
   * feed the `BlogPosting` graph, where freshness is a significant ranking and
   * AI-citation signal.
   *
   * Deliberately optional and currently unset: the source documents carry no
   * dates, and inventing them would put false information into structured data.
   * Populate with the real authoring dates — the schema omits the fields until
   * then rather than guessing.
   */
  datePublished?: string;
  dateModified?: string;
}

/* ------------------------------------------------------------------ */
/* Posts                                                               */
/* ------------------------------------------------------------------ */

export const blogPosts: BlogPost[] = [
  {
    slug: 'the-real-cost-of-manual-hiring',
    title: 'The Real Cost of Manual Hiring (and What Changes When It Stops)',
    seoTitle: 'The Real Cost of Manual Hiring',
    excerpt:
      'Ask any staffing agency owner or HR lead where their hiring data actually lives, and you\'ll usually get an honest but uncomfortable answer: "a bit of everywhere." A candidate tracker in Excel. Interview feedback in someone\'s inbox. Vendor commissions worked out at month-end on a calculator. Candidate follow-ups happening on a recruiter\'s personal WhatsApp — which means the moment that recruiter is on leave, or leaves the company, so does the relationship.',
    category: 'Strategy',
    tags: ['Spreadsheets', 'Automation', 'Profitability'],
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    thumb:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=200&q=70',
    imageAlt: 'A team reviewing hiring spreadsheets and notes around a table',
    body: [
      {
        type: 'p',
        text: 'Ask any staffing agency owner or HR lead where their hiring data actually lives, and you\'ll usually get an honest but uncomfortable answer: "a bit of everywhere." A candidate tracker in Excel. Interview feedback in someone\'s inbox. Vendor commissions worked out at month-end on a calculator. Candidate follow-ups happening on a recruiter\'s personal WhatsApp — which means the moment that recruiter is on leave, or leaves the company, so does the relationship.',
      },
      {
        type: 'p',
        text: 'None of this is because teams aren\'t working hard. It\'s because hiring generates a lot of small decisions and a lot of small messages — and spreadsheets and inboxes were never built to hold either at scale.',
      },
      { type: 'h2', text: 'Where the leaks are' },
      {
        type: 'ul',
        items: [
          '**Cold leads.** A candidate not followed up within a day or two quietly disappears to another offer.',
          '**Double-booked interviewers.** Without a shared, clash-aware calendar, two recruiters can book the same panelist for the same slot.',
          '**Inconsistent evaluations.** When every interviewer scores their own way, comparing two shortlisted candidates becomes opinion, not data.',
          '**Commission disputes.** Manually calculated vendor payouts invite disagreement over what was agreed.',
          '**Compliance exposure.** "We deleted the row in the spreadsheet" isn\'t the same as actually erasing a candidate\'s data.',
        ],
      },
      {
        type: 'p',
        text: 'Each of these is a small leak. Across hundreds of candidates and dozens of open roles, they add up to missed placements, disputed payouts, and risk that doesn\'t show up on a P&L until it does.',
      },
      { type: 'h2', text: 'What changes with one connected system' },
      {
        type: 'p',
        text: 'A platform like PyHire doesn\'t just digitise the spreadsheet — it connects the candidate\'s stage, the recruiter\'s task list, the interviewer\'s calendar, the vendor\'s commission, and the compliance record as one underlying data set, seen through role-specific screens.',
      },
      {
        type: 'p',
        text: 'Recruiters work from tabs that match how they think — Unassigned, My Assigned, Follow-up, Interview Scheduled, Offer Sent • Pending Documentation — instead of scrolling a shared sheet. New candidates route through weighted auto-assignment instead of manual triage. Interview slots show inline before booking, so clashes are blocked outright. Evaluation forms are built once and applied consistently. Vendor commissions accrue automatically the moment a candidate joins. And when a candidate asks for their data to be erased, the system removes the records *and* the stored documents, logged for audit — not a manual search across folders.',
      },
      { type: 'h2', text: 'Where the profit actually comes from' },
      {
        type: 'p',
        text: 'It\'s tempting to file a system like this under "saves time." That undersells it. The value shows up in three places:',
      },
      {
        type: 'ol',
        items: [
          '**Fewer lost placements** — faster, more consistent follow-up means fewer candidates drop out before an offer is made.',
          '**Visible profitability, per client and per channel** — because every candidate carries their source, an agency can finally see which channel converts to joins, not just which sends the most résumés.',
          '**Lower risk, lower overhead** — automatic commission accrual removes a manual finance task every month; a real audit trail removes the guesswork around compliance.',
        ],
      },
      {
        type: 'p',
        text: 'Manual hiring asks your team to *remember* the process. A connected system builds the process in, so your team spends time on the part that actually needs a human: talking to people.',
      },
    ],
  },

  {
    slug: 'built-for-dpdp-compliance-as-a-feature',
    title: 'Built for DPDP: Compliance as a Feature, Not an Afterthought',
    seoTitle: 'Built for DPDP: Compliance as a Feature',
    excerpt:
      'A candidate\'s résumé, phone number, salary history and ID proof sit in your systems the moment they apply. Under India\'s DPDP Act, that data isn\'t just useful — it\'s a liability until it\'s handled correctly. Most hiring stacks weren\'t built with that in mind, because most hiring stacks weren\'t built as one system at all.',
    category: 'Compliance',
    tags: ['DPDP Act', 'Data Privacy', 'Audit Trail'],
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    thumb:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=200&q=70',
    imageAlt: 'A padlock resting on a laptop keyboard, representing data protection',
    body: [
      {
        type: 'p',
        text: 'A candidate\'s résumé, phone number, salary history and ID proof sit in your systems the moment they apply. Under India\'s DPDP Act, that data isn\'t just useful — it\'s a liability until it\'s handled correctly. Most hiring stacks weren\'t built with that in mind, because most hiring stacks weren\'t built as one system at all.',
      },
      { type: 'h2', text: 'The gap in a typical process' },
      {
        type: 'p',
        text: 'When candidate data is spread across a spreadsheet, an email inbox, a shared drive of résumé PDFs, and a WhatsApp thread, two questions become genuinely hard to answer:',
      },
      {
        type: 'ul',
        items: [
          '**"Can you show me who accessed this candidate\'s data, and when?"** — Without a single system of record, there\'s no consistent log to point to.',
          '**"Can you prove you actually deleted it?"** — Deleting a row in a spreadsheet doesn\'t touch the résumé sitting in a shared folder, or the copy in someone\'s downloads.',
        ],
      },
      {
        type: 'p',
        text: 'Both of these are the kind of question a candidate, a client\'s legal team, or a regulator can ask — and "we\'re pretty sure we did" isn\'t an answer that holds up.',
      },
      { type: 'h2', text: 'What "compliance as a feature" actually means' },
      {
        type: 'p',
        text: 'PyHire treats data rights as part of the product, not a policy document sitting outside it:',
      },
      {
        type: 'ul',
        items: [
          '**Data-subject rights, self-serve.** Candidates can request their data, or its erasure, through a secure, verified public link — no login required, no back-and-forth over email.',
          '**True erasure.** Erasure removes the candidate\'s records *and* their stored documents — résumés and ID proofs included — not just a database row.',
          '**A real audit trail.** Consent, access, and every status change are logged, so you can show exactly who did what, and when, without reconstructing a timeline from memory.',
        ],
      },
      { type: 'h2', text: 'Why this matters beyond avoiding fines' },
      {
        type: 'p',
        text: 'For a TA or HR lead, this isn\'t just about staying on the right side of the law — it\'s about being able to say "yes, and here\'s the proof" the moment a client\'s legal team, an auditor, or a candidate asks. For an agency, it\'s a credibility signal that helps win larger, more compliance-conscious clients who wouldn\'t otherwise trust a vendor running hiring off a shared spreadsheet.',
      },
      {
        type: 'p',
        text: 'Compliance handled well doesn\'t slow hiring down. It\'s what lets you scale hiring volume without scaling your exposure alongside it.',
      },
    ],
  },

  {
    slug: 'never-lose-a-candidate-to-a-forgotten-follow-up',
    title: 'Never Lose a Candidate to a Forgotten Follow-Up',
    excerpt:
      'Most candidates aren\'t lost because they turned down an offer. They\'re lost earlier — quietly, at the follow-up stage, because no one got back to them for three or four days and a competing offer did.',
    category: 'Hiring Process',
    tags: ['Follow-up', 'Auto-assignment', 'Candidate Search'],
    image:
      'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=1200&q=80',
    thumb:
      'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=200&q=70',
    imageAlt: 'A recruiter on a call, following up with a candidate',
    body: [
      {
        type: 'p',
        text: 'Most candidates aren\'t lost because they turned down an offer. They\'re lost earlier — quietly, at the follow-up stage, because no one got back to them for three or four days and a competing offer did.',
      },
      {
        type: 'p',
        text: 'This is the least visible failure point in recruiting, and often the most expensive one. A candidate who was a genuine fit, sourced at real cost, simply falls out of the pipeline because "follow-up" depended on someone remembering to scroll to the right row in a shared sheet.',
      },
      { type: 'h2', text: 'Two problems, one root cause' },
      {
        type: 'p',
        text: '**Problem one: no clear ownership.** In a shared spreadsheet, it\'s rarely obvious whose job it is to chase a specific candidate today. Everyone\'s a little bit responsible, which in practice means no one is.',
      },
      {
        type: 'p',
        text: '**Problem two: no visibility into load.** New candidates often get assigned to whichever recruiter is nearest, or fastest to claim them — which means some recruiters are buried while others have room. Buried recruiters are exactly the ones who let follow-ups slip.',
      },
      { type: 'h2', text: 'How PyHire closes both gaps' },
      {
        type: 'p',
        text: '**Weighted auto-assignment** distributes new candidates by balancing load, specialisation and location — so no recruiter is buried and no lead goes cold waiting for someone to notice it.',
      },
      {
        type: 'p',
        text: '**Tabs built around what needs doing**, not just a status column: Unassigned, My Assigned, Follow-up, Interview Scheduled, and Offer Sent • Pending Documentation. A candidate needing follow-up today shows up in a place a recruiter actually looks — not buried in a 40-row sheet.',
      },
      {
        type: 'p',
        text: '**AI candidate search** means a recruiter doesn\'t have to manually re-scan the database every time a similar role opens. Describing who\'s needed in plain language turns into editable filters and a ranked shortlist — recovering time that would otherwise go into re-sourcing instead of follow-up.',
      },
      { type: 'h2', text: 'The compounding effect' },
      {
        type: 'p',
        text: 'None of this is a single dramatic fix — it\'s a lot of small frictions removed at once. But follow-up speed compounds: a candidate contacted within a day is far more likely to still be available than one contacted after four. Multiply that across every open role, every month, and "we responded a bit faster" turns into placements that would otherwise have gone to a competitor who simply moved first.',
      },
    ],
  },

  {
    slug: 'ai-that-reads-the-jd',
    title: 'AI That Reads the JD, So Your Recruiters Don\'t Have To',
    seoTitle: 'AI That Reads the Job Description',
    excerpt:
      'Every open role starts the same way: a job description lands in an inbox, and someone has to translate it into search filters — skills, experience band, must-haves, nice-to-haves — before any actual sourcing can begin. Done manually, this step is slow, and it\'s the first place inconsistency creeps in, because two recruiters reading the same JD will often extract slightly different requirements.',
    category: 'Technology',
    tags: ['AI Matching', 'Job Descriptions', 'Hiring Timeline'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    thumb:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=70',
    imageAlt: 'A screen showing structured data extracted from a document',
    body: [
      {
        type: 'p',
        text: 'Every open role starts the same way: a job description lands in an inbox, and someone has to translate it into search filters — skills, experience band, must-haves, nice-to-haves — before any actual sourcing can begin. Done manually, this step is slow, and it\'s the first place inconsistency creeps in, because two recruiters reading the same JD will often extract slightly different requirements.',
      },
      { type: 'h2', text: 'Where the time actually goes' },
      {
        type: 'p',
        text: 'In a manual process, a JD doesn\'t become searchable filters instantly — it becomes them after someone reads it carefully, decides what matters, and manually builds a search. For a role with dozens of applicants and a fast-moving client deadline, that lag is time a competitor didn\'t lose.',
      },
      { type: 'h2', text: 'What changes with AI-assisted matching' },
      {
        type: 'p',
        text: 'PyHire\'s job creation flow is deliberately client-first: client → department → JD → filters → AI thresholds → match — so the client relationship is attached from the very first step, and reporting is never orphaned from who it\'s actually for.',
      },
      {
        type: 'p',
        text: 'From there, PyHire reads the uploaded JD — PDF or Word — and extracts skills, experience band and responsibilities automatically, then scores candidates in the database against it. A recruiter\'s job shifts from "build the filters" to "review the shortlist and use judgement" — the part that actually needs a person.',
      },
      {
        type: 'p',
        text: 'The same natural-language approach extends to search more broadly: describing who\'s needed in plain language turns into editable filters and a ranked list of matching profiles, instead of a recruiter manually querying the database field by field.',
      },
      { type: 'h2', text: 'Why the timeline matters as much as the match' },
      {
        type: 'p',
        text: 'Every JD also carries a living hiring timeline — opened, matched, interviewed, offered, joined — visible in one view. That means a hiring manager or client doesn\'t need to ask "where are we?" over email; the answer is already there, and a lead can see the gap between the client\'s target date and the internal commitment before it becomes a problem, not after.',
      },
      { type: 'h2', text: 'The net effect' },
      {
        type: 'p',
        text: 'Faster time from "JD received" to "shortlist ready" isn\'t just a convenience — for a role under a tight client deadline, it\'s often the difference between filling it and losing the mandate to another agency that moved faster on the same brief.',
      },
    ],
  },

  {
    slug: 'the-hidden-tax-of-inconsistent-interviews',
    title: 'The Hidden Tax of Inconsistent Interviews',
    excerpt:
      'Two candidates apply for the same role. Both get interviewed. One interviewer takes detailed notes and rates rigorously; another jots a few lines and goes on gut feel. When it\'s time to decide between them, what you\'re comparing isn\'t really the candidates — it\'s two different interviewers\' styles.',
    category: 'Hiring Process',
    tags: ['Scorecards', 'Evaluation Forms', 'Interview Feedback'],
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
    thumb:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=200&q=70',
    imageAlt: 'Two interviewers comparing structured evaluation notes',
    body: [
      {
        type: 'p',
        text: 'Two candidates apply for the same role. Both get interviewed. One interviewer takes detailed notes and rates rigorously; another jots a few lines and goes on gut feel. When it\'s time to decide between them, what you\'re comparing isn\'t really the candidates — it\'s two different interviewers\' styles.',
      },
      {
        type: 'p',
        text: 'This is one of the most common, least discussed problems in hiring: without a shared evaluation standard, "who\'s the better candidate" quietly becomes "whose interviewer wrote more."',
      },
      { type: 'h2', text: 'Why this is expensive, not just untidy' },
      {
        type: 'ul',
        items: [
          '**Bad hiring decisions.** A strong candidate can lose out to a weaker one simply because they drew a less generous interviewer.',
          '**No defensibility.** If a hiring decision is ever questioned — by a candidate, a client, or legal — "the interviewer felt good about the other person" isn\'t an answer that holds up.',
          '**No usable data.** Free-text feedback can\'t be aggregated into a source-of-truth on which interview stages predict good hires and which don\'t.',
        ],
      },
      { type: 'h2', text: 'Forms your organisation actually controls' },
      {
        type: 'p',
        text: 'PyHire lets teams design their own evaluation forms — rating scales, sections, question types — and scope different forms to different rounds, departments, clients or roles, with the platform automatically applying the most specific match. A technical round for one client can look completely different from an HR round for another, without any of it being hard-coded.',
      },
      {
        type: 'p',
        text: 'This does two things at once: it makes every candidate for a given role judged against the same criteria, and it turns interview feedback into structured data instead of scattered notes — which is what makes recruiter and stage-level analytics possible in the first place.',
      },
      { type: 'h2', text: 'Nothing slips through afterward, either' },
      {
        type: 'p',
        text: 'An interview whose scheduled time has passed but is still marked "Scheduled" is automatically surfaced as needing attention — so a candidate is never left waiting on a decision no one remembers to make. Interviewers also get a focused workspace of just their interviews, upcoming and overdue, with feedback one click away — removing the friction that often causes feedback to get delayed in the first place.',
      },
      { type: 'h2', text: 'The payoff' },
      {
        type: 'p',
        text: 'Consistent scorecards don\'t just make hiring fairer — they make it provable. When a client, a candidate, or your own leadership asks "why this person and not the other," the answer is a structured score against agreed criteria, not a recollection of how an interview felt.',
      },
    ],
  },

  {
    slug: 'commission-that-calculates-itself',
    title: 'Commission That Calculates Itself: Fixing the Vendor Payout Problem',
    seoTitle: 'Vendor Commission That Calculates Itself',
    excerpt:
      'For any agency working with external sourcing vendors, commission is where operational messiness meets real money — and it\'s often the single most contentious line item in the business relationship.',
    category: 'Strategy',
    tags: ['Vendor Management', 'Commission', 'Source Tracking'],
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    thumb:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=200&q=70',
    imageAlt: 'A calculator and financial statements on a desk',
    body: [
      {
        type: 'p',
        text: 'For any agency working with external sourcing vendors, commission is where operational messiness meets real money — and it\'s often the single most contentious line item in the business relationship.',
      },
      { type: 'h2', text: 'Why manual commission tracking breaks down' },
      {
        type: 'p',
        text: 'Vendor terms are rarely identical. One vendor might be paid a percentage of CTC, another a flat fee per placement, another per candidate joined — each with its own guarantee window and payment terms. Tracked manually, across multiple vendors and multiple clients, this becomes a spreadsheet of exceptions, recalculated by hand at month-end from scattered notes on who sourced whom and when they joined.',
      },
      {
        type: 'p',
        text: 'The predictable result: disputes. A vendor believes they\'re owed one figure; the agency\'s records say another. Resolving that eats time, and repeated disputes erode a relationship that\'s meant to be a reliable sourcing channel.',
      },
      { type: 'h2', text: 'Automating the calculation, not just the record-keeping' },
      {
        type: 'p',
        text: 'PyHire lets an agency configure exactly how each vendor is paid — percentage of CTC, fixed fee per placement, or per candidate joined — along with the guarantee window and payment terms, set once per vendor. From that point, the moment a sourced candidate joins, the commission accrues automatically, calculated the same way every time.',
      },
      {
        type: 'p',
        text: 'This connects directly to source tracking: every candidate carries their source — direct, referral, job board, or a named vendor — through the entire pipeline, so there\'s never ambiguity about which vendor a placement is attributed to.',
      },
      {
        type: 'p',
        text: 'Placements are also tracked against fee terms and guarantee periods, so invoicing happens when a candidate clears the replacement window — not before, and not from memory.',
      },
      { type: 'h2', text: 'Beyond removing the month-end scramble' },
      {
        type: 'p',
        text: 'The bigger win is what automated, source-linked commission tracking makes visible: which vendors actually convert candidates into joins, not just resumes into a database. That\'s the number that separates a vendor worth investing more in from one worth reconsidering — and it\'s only visible once commission and source tracking live in the same system.',
      },
      {
        type: 'p',
        text: 'Getting vendor payouts right, consistently and automatically, isn\'t just an efficiency gain. It\'s what keeps sourcing partners as long-term, trusted channels instead of recurring points of friction.',
      },
    ],
  },

  {
    slug: 'one-platform-many-clients-multi-tenancy',
    title: 'One Platform, Many Clients: Why Multi-Tenancy Is an Agency\'s Trust Advantage',
    seoTitle: 'Multi-Tenancy: One Platform, Many Clients',
    excerpt:
      'When an agency runs six clients off one shared spreadsheet or one shared inbox, there\'s always a quiet risk sitting underneath the convenience: one client\'s data is one accidental filter, one copy-paste, or one forwarded email away from landing in front of another client. Most of the time nothing goes wrong. But "most of the time" isn\'t a security posture, and it\'s not something you can put in a proposal to a cautious enterprise prospect.',
    category: 'Technology',
    tags: ['Multi-Tenancy', 'Data Isolation', 'Enterprise Readiness'],
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    thumb:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=70',
    imageAlt: 'Separate glass-walled workspaces in a modern office',
    body: [
      {
        type: 'p',
        text: 'When an agency runs six clients off one shared spreadsheet or one shared inbox, there\'s always a quiet risk sitting underneath the convenience: one client\'s data is one accidental filter, one copy-paste, or one forwarded email away from landing in front of another client. Most of the time nothing goes wrong. But "most of the time" isn\'t a security posture, and it\'s not something you can put in a proposal to a cautious enterprise prospect.',
      },
      { type: 'h2', text: 'Why this matters more as an agency grows' },
      {
        type: 'p',
        text: 'A small agency with two clients can manage boundaries through discipline and care. That approach doesn\'t scale. By the time an agency is running eight or ten client relationships, each with its own recruiters, own branding expectations, and own reporting needs, "we\'re careful" stops being a reassuring answer to "how do you keep our data separate from your other clients."',
      },
      {
        type: 'p',
        text: 'Larger, more risk-conscious clients ask this question directly, often as part of procurement. An agency that can\'t answer it cleanly loses the deal before pricing or capability even come into the conversation.',
      },
      { type: 'h2', text: 'What multi-tenancy actually provides' },
      {
        type: 'p',
        text: 'PyHire is multi-tenant by design: one platform, many fully isolated workspaces. Each client — or each of an agency\'s own sub-brands — runs as a separate tenant with its own users, its own data, its own branding, and its own settings, while the agency\'s leadership retains a consolidated view across all of them.',
      },
      {
        type: 'p',
        text: 'This isn\'t a permissions filter layered on top of shared data — it\'s tenant-isolated data from the ground up. Communication credentials are per-tenant too, so messages to a client\'s candidates go out under the right brand, not a shared sending account that blurs which client a message actually belongs to.',
      },
      { type: 'h2', text: 'What this unlocks commercially' },
      {
        type: 'ul',
        items: [
          '**Enterprise-readiness.** Tenant isolation is often the first technical question a larger prospect asks, and it\'s one an agency can now answer with a clear yes.',
          '**Cleaner client reporting.** Each client sees their own numbers, not a filtered view of a shared file that might accidentally reveal another client\'s data.',
          '**Faster onboarding of new clients.** Standing up a new client relationship is a configuration step — a new tenant — not a new set of manual workarounds.',
          '**Internal sub-branding, for free.** An agency running its own distinct sub-brands can treat each the same way it treats an external client — same isolation, same guarantees.',
        ],
      },
      { type: 'h2', text: 'The underlying point' },
      {
        type: 'p',
        text: 'Multi-tenancy isn\'t a technical footnote — it\'s the structural reason an agency can say "your data is walled off from every other client we work with" and mean it, not just claim it. That\'s what turns a capable agency into a trusted long-term partner for the clients who ask hard questions before they sign.',
      },
    ],
  },

  {
    slug: 'reply-from-where-you-sent-omnichannel-inbox',
    title: 'Reply From Where You Sent: The Case for a Two-Way Omnichannel Inbox',
    seoTitle: 'The Case for a Two-Way Omnichannel Inbox',
    excerpt:
      'A candidate gets a message from a recruiter on WhatsApp, replies there, and that reply lands in the recruiter\'s personal phone — not in any system the rest of the team can see. Multiply this across a team of recruiters, three channels (email, SMS, WhatsApp), and hundreds of candidates, and the candidate conversation — arguably the most important record in the entire hiring process — ends up scattered across personal devices instead of living with the candidate\'s record.',
    category: 'Recruitment',
    tags: ['WhatsApp', 'Omnichannel', 'Candidate Experience'],
    image:
      'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=80',
    thumb:
      'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=200&q=70',
    imageAlt: 'A phone and laptop side by side showing messaging threads',
    body: [
      {
        type: 'p',
        text: 'A candidate gets a message from a recruiter on WhatsApp, replies there, and that reply lands in the recruiter\'s personal phone — not in any system the rest of the team can see. Multiply this across a team of recruiters, three channels (email, SMS, WhatsApp), and hundreds of candidates, and the candidate conversation — arguably the most important record in the entire hiring process — ends up scattered across personal devices instead of living with the candidate\'s record.',
      },
      { type: 'h2', text: 'Why this is a bigger problem than it looks' },
      {
        type: 'p',
        text: 'When a recruiter is out sick, on leave, or leaves the company, their conversation history with active candidates often leaves with them. A manager reviewing why a candidate went cold has no way to see what was actually said, or when. And candidates increasingly expect to be reached on the channel they actually check — for many, that\'s WhatsApp, not email — which means an email-only process is already starting from a response-rate disadvantage.',
      },
      { type: 'h2', text: 'What changes with a connected, two-way inbox' },
      {
        type: 'p',
        text: 'PyHire brings email, SMS and WhatsApp into one composer, with reusable templates and per-tenant sending accounts so messages go out under the right brand for the right client. Critically, it\'s two-way: candidate replies thread back into a shared inbox, so the conversation lives with the candidate\'s record — visible to the team, not locked in one person\'s phone.',
      },
      {
        type: 'p',
        text: 'On top of that, multi-step workflows can trigger automatically off candidate events — a status change fires the right message at the right moment, without a recruiter needing to remember to send it. And a health indicator flags the moment a channel needs attention — a stopped WhatsApp integration, for instance — instead of messages silently failing to send for days before anyone notices.',
      },
      { type: 'h2', text: 'What this changes in practice' },
      {
        type: 'ul',
        items: [
          '**No conversation is trapped on a personal device.** Anyone on the team can pick up where a candidate\'s thread left off.',
          '**Candidates get reached where they actually respond.** WhatsApp, treated as a first-class channel rather than a workaround, tends to get faster replies than email alone.',
          '**Fewer messages fail silently.** A channel health warning catches a broken integration before it costs a week of missed follow-ups.',
          '**Communication becomes auditable**, which matters both operationally and for compliance — you can show exactly what was said to a candidate, and when.',
        ],
      },
      { type: 'h2', text: 'The underlying point' },
      {
        type: 'p',
        text: 'The candidate conversation is one of the most valuable — and most fragile — records in the hiring process. Keeping it inside the system, two-way and across the channels candidates actually use, turns it from something that lives and dies with one recruiter\'s phone into something the whole team, and the whole process, can rely on.',
      },
    ],
  },

  {
    slug: 'the-dashboard-that-shows-everyone-exactly-what-they-need',
    title: 'The Dashboard That Shows Everyone Exactly What They Need — Nothing More',
    seoTitle: 'Role-Aware Recruitment Dashboards',
    excerpt:
      'Most reporting problems in hiring aren\'t a shortage of data — they\'re too much of it, aimed at the wrong person. A recruiter doesn\'t need platform-wide analytics; they need to know what\'s on their plate today. A manager doesn\'t need every candidate\'s individual record; they need their team\'s performance. Give everyone the same dashboard, and you either overwhelm the people doing the work or under-inform the people making decisions.',
    category: 'Analytics',
    tags: ['Role-Aware Analytics', 'Stage SLA', 'Reporting'],
    image:
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80',
    thumb:
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=200&q=70',
    imageAlt: 'An analytics dashboard displaying hiring performance charts',
    body: [
      {
        type: 'p',
        text: 'Most reporting problems in hiring aren\'t a shortage of data — they\'re too much of it, aimed at the wrong person. A recruiter doesn\'t need platform-wide analytics; they need to know what\'s on their plate today. A manager doesn\'t need every candidate\'s individual record; they need their team\'s performance. Give everyone the same dashboard, and you either overwhelm the people doing the work or under-inform the people making decisions.',
      },
      { type: 'h2', text: 'The manual version of this problem' },
      {
        type: 'p',
        text: 'Without role-aware reporting, most teams solve this with status meetings — a recruiter reports up to a manager, a manager reports up to leadership, and the same numbers get manually re-assembled and re-explained at every level. It works, but it costs meeting time every week, and the numbers are only as fresh as the last time someone updated the slide.',
      },
      { type: 'h2', text: 'Five roles, one page, five experiences' },
      {
        type: 'p',
        text: 'PyHire\'s analytics are role-aware by design. Management sees team-wide performance and platform analytics. A manager sees their team. A recruiter sees their own work. An interviewer sees their interviews. Nobody has to ask for access to the right view, and nobody sees more than what\'s relevant — and useful — to their role, because access is independently protected underneath, not just visually hidden.',
      },
      {
        type: 'p',
        text: 'The metrics themselves are the ones that actually move hiring forward: interviews scheduled — upcoming and overdue — recruiter performance across assigned, joined and conversion, source analysis comparing volume against actual joins, stage SLA showing exactly where candidates stall in the pipeline, and lead allocation across the team.',
      },
      { type: 'h2', text: 'Why "stage SLA" matters more than it sounds' },
      {
        type: 'p',
        text: 'Most dashboards can tell you how many candidates are in each stage right now. Fewer can tell you where candidates are getting stuck — which stage is quietly becoming a bottleneck, role after role. That\'s the number that turns a dashboard from a status report into a diagnostic tool: it tells a manager not just what happened, but where to intervene next.',
      },
      { type: 'h2', text: 'What this replaces' },
      {
        type: 'ul',
        items: [
          '**Weekly status meetings**, because the numbers are already visible to the person who needs them, live.',
          '**Manually assembled reporting decks**, because the dashboard is the report.',
          '**Guesswork about where a pipeline is stalling**, because stage SLA makes the bottleneck visible directly.',
        ],
      },
      { type: 'h2', text: 'The underlying point' },
      {
        type: 'p',
        text: 'A dashboard is only useful if the right person can act on what they\'re seeing without wading through what they can\'t. Role-aware analytics isn\'t a smaller feature set for lower-level users — it\'s a sharper, faster one for everyone, because each person sees exactly the slice of the truth that\'s theirs to act on.',
      },
    ],
  },

  {
    slug: 'from-job-board-to-joining-day-source-to-join',
    title: 'From Job Board to Joining Day: Why Source-to-Join Is the Only Metric That Matters',
    seoTitle: 'Why Source-to-Join Is the Metric That Matters',
    excerpt:
      'Ask most teams which sourcing channel performs best, and the answer usually comes from whichever channel produces the most résumés. That\'s an easy number to see and a genuinely misleading one to act on — because a channel that floods your pipeline with applicants who rarely convert isn\'t actually your best channel. It\'s your loudest one.',
    category: 'Analytics',
    tags: ['Source Analysis', 'Conversion', 'Sourcing Spend'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    thumb:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&q=70',
    imageAlt: 'A conversion funnel chart on a screen',
    body: [
      {
        type: 'p',
        text: 'Ask most teams which sourcing channel performs best, and the answer usually comes from whichever channel produces the most résumés. That\'s an easy number to see and a genuinely misleading one to act on — because a channel that floods your pipeline with applicants who rarely convert isn\'t actually your best channel. It\'s your loudest one.',
      },
      { type: 'h2', text: 'The metric almost everyone tracks, and the one almost nobody does' },
      {
        type: 'p',
        text: 'Application volume by source is easy to track because it\'s visible at the top of the funnel — the moment a candidate applies. Source-to-join is harder, because it requires following that same candidate all the way through screening, interviews, offer, and joining — weeks or months later, often past the point where most teams are still bothering to track where they came from.',
      },
      {
        type: 'p',
        text: 'That gap is exactly why so much sourcing spend goes to the channel that "feels" productive rather than the one that actually is.',
      },
      { type: 'h2', text: 'What PyHire tracks instead' },
      {
        type: 'p',
        text: 'Every candidate in PyHire carries their source — direct, referral, job board, or a named vendor — as a permanent part of their record, from first contact through every stage to Hired/Joined. That means source analysis isn\'t a volume count; it\'s a conversion number: how many of this channel\'s candidates actually joined, not just applied.',
      },
      {
        type: 'p',
        text: 'The same logic extends to vendors specifically. Because vendor commission is tracked against the same source data, an agency can see not just "which vendor sends the most candidates" but "which vendor\'s candidates are actually the ones a client ends up hiring" — the number that should be driving where sourcing budget goes next.',
      },
      { type: 'h2', text: 'Why this changes spending decisions' },
      {
        type: 'ul',
        items: [
          '**Budget shifts toward what converts**, not what generates the most applications.',
          '**Underperforming vendors become visible early**, instead of being discovered only when a contract renewal comes up.',
          '**Referral programs get properly credited**, because referral, as a source, is tracked with the same rigor as a paid job board.',
          '**Client conversations get easier**, because an agency can show a client exactly which channel delivered their hires — not just which one generated the most résumés for the client to review.',
        ],
      },
      { type: 'h2', text: 'The underlying point' },
      {
        type: 'p',
        text: 'Volume tells you how loud a channel is. Source-to-join tells you whether it\'s actually working. Once that number is visible, sourcing spend stops being a habit and starts being a decision — and that shift alone is often worth more than any single process improvement elsewhere in the pipeline.',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Derived helpers                                                     */
/* ------------------------------------------------------------------ */

/** Strips the lightweight inline markers so text can be measured or read aloud. */
export function plainText(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1');
}

/** Every word of a post's body, used for reading time and full-text search. */
export function postText(post: BlogPost): string {
  const parts: string[] = [post.title, post.excerpt];
  for (const block of post.body) {
    if (block.type === 'ul' || block.type === 'ol') parts.push(...block.items);
    else parts.push(block.text);
  }
  return plainText(parts.join(' '));
}

/** Derived from word count at 200 wpm — never hand-authored. */
export function readingMinutes(post: BlogPost): number {
  const words = postText(post).trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Category list with counts computed from the posts themselves. */
export function getCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of blogPosts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Unique tag list with counts computed from the posts themselves. */
export function getTags(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of blogPosts) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Same category first, then anything else, excluding the current post. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return blogPosts.slice(0, limit);
  const others = blogPosts.filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const sharesTag = others.filter(
    (p) => !sameCategory.includes(p) && p.tags.some((t) => current.tags.includes(t)),
  );
  const rest = others.filter((p) => !sameCategory.includes(p) && !sharesTag.includes(p));
  return [...sameCategory, ...sharesTag, ...rest].slice(0, limit);
}

/** Section headings of a post, for the in-article table of contents. */
export function getHeadings(post: BlogPost): { id: string; text: string }[] {
  return post.body
    .filter((b): b is { type: 'h2'; text: string } => b.type === 'h2')
    .map((b) => ({ id: slugifyHeading(b.text), text: b.text }));
}

export function slugifyHeading(text: string): string {
  return plainText(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
