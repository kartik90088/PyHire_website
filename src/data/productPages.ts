/**
 * Copy for the eight product pages, verbatim from the PyHire website content
 * document (14 October 2026), sections 3–10 and the title/meta table in 15.
 *
 * Each block's `points`: one entry renders as a paragraph, several as a list.
 * `mockup` names the illustration shown in the hero (see ProductPage.tsx).
 */

export interface ProductBlock {
  heading: string;
  points: string[];
}

export interface ProductPageContent {
  path: string;
  /** Short label above the headline. */
  eyebrow: string;
  seoTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  intro: string;
  blocks: ProductBlock[];
  closing: string;
  /** Secondary button in the closing band; defaults to the free trial. */
  secondaryCta?: { label: string; to: string };
  mockup: 'jobs' | 'ai' | 'interviews' | 'communication' | 'clients' | 'analytics' | 'careers' | 'mobile';
}

export const productPages: ProductPageContent[] = [
  {
    path: '/product/jobs-and-candidates',
    eyebrow: 'Jobs, requisitions and candidates',
    seoTitle: 'Requisitions, Job Descriptions & Candidate Pipeline | PyHire',
    metaDescription:
      'Approvals, AI-read job descriptions, bulk CV upload and a pipeline from first contact to joining day — in one place.',
    headline: 'Every role and every candidate, in order.',
    subheadline:
      'From the first requisition to the last candidate update, PyHire keeps one source of truth for what you are hiring and who is in the running.',
    intro:
      'Recruiting teams lose hours rebuilding lists: which roles are open, who owns them, which candidates are where. PyHire keeps all of it in one place and updates it as people work.',
    blocks: [
      {
        heading: 'Requisitions with approvals',
        points: [
          'A hiring manager raises a requisition with headcount, budget, location and justification. It goes through your approval chain — one manager or several levels — and can be put on hold and resumed. Once approved, HR turns it into a job description, or adds the headcount to an existing role instead of creating a duplicate.',
        ],
      },
      {
        heading: 'Job descriptions that read themselves',
        points: [
          'Upload a JD as PDF or Word and PyHire extracts the title, skills, experience, salary and responsibilities. Or create one step by step: choose the client or department, configure the role and set the matching thresholds.',
        ],
      },
      {
        heading: 'One table for every open role',
        points: [
          'Openings filled, days open, candidates, recruiters, vendors and source — on one row per JD.',
          'Switch to the funnel view to see matched, sourced, screened, interviewed, offered, hired and joined for any period, compared with the period before.',
          'Filter by client, department, recruiter, vendor, priority, location, deadline and more; export exactly what you filtered to Excel or CSV.',
        ],
      },
      {
        heading: 'Bulk upload and a resume bank',
        points: [
          'Upload hundreds of CVs at once (PDF, Word or Excel). Re-uploading the same person updates their record instead of creating a duplicate. Every resume is filed by department in the resume bank, by rules or with AI.',
        ],
      },
      {
        heading: 'A pipeline you can trust',
        points: [
          'Clear stages from new to screened, interviewed, selected, offer extended, hired and joined — with every change and who made it on the candidate’s timeline.',
          'Lost candidates keep their reason; joined candidates move to their own list.',
          'Follow-ups with reminders, so no promised call is forgotten.',
          'An interview stages board that shows who is waiting at which round.',
        ],
      },
      {
        heading: 'Screening built in',
        points: [
          'Ask every applicant your must-have questions before a recruiter spends time on them — including short video answers — and record a structured screening sheet during the first call. Negative criteria are named, so a candidate is never marked down without a stated reason.',
        ],
      },
    ],
    closing: 'Open roles, owners, candidates and next steps — always current, never rebuilt by hand.',
    mockup: 'jobs',
  },
  {
    path: '/product/ai',
    eyebrow: 'AI matching, screening and insights',
    seoTitle: 'AI Resume Parsing & Candidate Matching | PyHire',
    metaDescription:
      'Every CV read, every candidate matched to your open roles with reasons, and a daily AI briefing. People make the call.',
    headline: 'AI that does the reading. People make the call.',
    subheadline:
      'PyHire’s AI reads every CV, ranks candidates for every open role and summarises progress every morning — and tells you why, so your team decides faster and with more confidence.',
    intro:
      'Most of a recruiter’s day goes into reading. PyHire’s AI takes that on: parsing documents, comparing candidates with roles and turning the numbers into a short daily briefing. It works on facts in your data and always shows its reasons.',
    blocks: [
      {
        heading: 'Resume and JD parsing',
        points: [
          'CVs and job descriptions in PDF or Word — including scanned files — are turned into structured fields: skills, experience, education, salary expectations and contact details. No retyping.',
        ],
      },
      {
        heading: 'Candidate matching with reasons',
        points: [
          'Every candidate is scored against your open roles, with the skills that match and the ones that are missing.',
          'New uploads are matched automatically against open JDs.',
          'Set a minimum match score per role and filter lists by it.',
        ],
      },
      {
        heading: 'Rules for what the AI may do',
        points: [
          'You decide what the AI may shortlist or reject on its own and what always goes to a recruiter. Knock-out screening questions decide; the AI only advises.',
        ],
      },
      {
        heading: 'Points to verify on a resume',
        points: [
          'PyHire flags gaps, overlaps and inconsistencies in a CV as "points to verify" for the recruiter to raise in conversation. It never labels a candidate dishonest.',
        ],
      },
      {
        heading: 'Video answers, transcribed',
        points: [
          'When a screening question asks for a short video answer, PyHire transcribes it and writes a summary of what was said. It scores the content, never accent, appearance or delivery.',
        ],
      },
      {
        heading: 'Daily AI insights',
        points: [
          'Every morning at 7:00 AM, PyHire writes a short briefing for each open job description, client and candidate: how hiring is going, where people drop off, the forecast fill date and the next steps. Unchanged records are not regenerated, so you are not charged twice. Insights can be switched off at any time.',
        ],
      },
      {
        heading: 'Ask about your team’s capacity',
        points: [
          'Type a question such as "a new requirement for five Java developers in Bengaluru — who can take it?" and get an answer built from live workload data: recommended recruiters, their free capacity and the risks.',
        ],
      },
    ],
    closing: 'Honest AI: it explains itself, it works from your data, and the decision stays with your people.',
    mockup: 'ai',
  },
  {
    path: '/product/interviews-and-offers',
    eyebrow: 'Interviews and offers',
    seoTitle: 'Interview Scheduling & Offer Letters | PyHire',
    metaDescription:
      'Schedule interviews with reminders, collect structured feedback, release offer letters online and track joining.',
    headline: 'From first interview to joining day, without the chasing.',
    subheadline:
      'Schedule interviews, collect structured feedback, release offer letters and track every joining document in one flow.',
    intro:
      'The end of the funnel is where hires are won or lost — and where most teams are still chasing feedback and paperwork by hand. PyHire makes each step a click and keeps everyone on the same page.',
    blocks: [
      {
        heading: 'Scheduling with reminders',
        points: [
          'Book interviews with the candidate and the panel, reschedule or cancel in a click, and let PyHire send reminders about 24 hours and one hour before. Interviewers see only their own interviews.',
        ],
      },
      {
        heading: 'Evaluation forms that fit the round',
        points: [
          'Build your own interview forms and attach them by stage, department, client or job description. The right form opens for each interview, and every recommendation is recorded the same way.',
        ],
      },
      {
        heading: 'A question bank for every role',
        points: [
          'Keep interview questions by role and level, copy them into a round and reuse what works. Send online assessments through your preferred test provider.',
        ],
      },
      {
        heading: 'Offer letters in minutes',
        points: [
          'Design offer letter templates with placeholders; PyHire fills them and produces the PDF.',
          'Offers can require internal approval before release.',
          'Candidates open their offer online and accept or decline — the status updates by itself.',
        ],
      },
      {
        heading: 'Joining, checked',
        points: [
          'Ask for documents through a secure upload link, and set the checks that must be complete — documents, background verification, medical — before a candidate can be marked as joined. Joined candidates can be sent to your HR system automatically.',
        ],
      },
      {
        heading: 'Placements and invoicing',
        points: [
          'For consultancies, every hire becomes a placement with fee terms. Invoices are drafted when the guarantee period ends, and vendor commissions are calculated from their agreed terms.',
        ],
      },
    ],
    closing: 'Faster feedback, cleaner offers, fewer joining-day surprises.',
    mockup: 'interviews',
  },
  {
    path: '/product/communication',
    eyebrow: 'Communication, campaigns and calling',
    seoTitle: 'Recruiting Inbox, Campaigns & Cloud Calling | PyHire',
    metaDescription:
      'Email, SMS, WhatsApp and recorded calls on one candidate timeline, with templates, campaigns and workflows.',
    headline: 'Reach candidates on every channel. Keep every word.',
    subheadline:
      'Email, SMS, WhatsApp and calls — sent from PyHire, logged on the candidate’s timeline, visible to the whole team.',
    intro:
      'When conversations live on personal phones and inboxes, context disappears the day someone is on leave. PyHire brings every channel into one place.',
    blocks: [
      {
        heading: 'One inbox for every channel',
        points: [
          'Inbound and outbound email, SMS and WhatsApp in a single inbox, threaded per candidate. Reply from the same screen.',
        ],
      },
      {
        heading: 'Templates and scheduled sends',
        points: [
          'Write once, reuse everywhere: templates for each channel and stage, with placeholders. Schedule a message for 9:00 AM and it goes at 9:00 AM.',
        ],
      },
      {
        heading: 'Campaigns that capture interest',
        points: [
          'Message a set of candidates about a role with one-tap "I’m interested" and "Not for me" links. Interested candidates are flagged for follow-up — no reading through replies.',
        ],
      },
      {
        heading: 'Workflows that follow up for you',
        points: [
          'Build multi-step automations triggered by candidate events: follow-ups, nudges for cold candidates and reminders, running in the background.',
        ],
      },
      {
        heading: 'Cloud calling with recordings',
        points: [
          'Call candidates from the profile through PyHire’s cloud calling; every call is recorded and logged.',
          'Calling can be switched off per job description.',
          'Record the outcome of every call so the next recruiter knows what happened.',
        ],
      },
      {
        heading: 'Call quality, measured',
        points: ['Score recorded calls against your own quality rubric and see how each recruiter performs over time.'],
      },
      {
        heading: 'Your channels or ours',
        points: [
          'Connect your own email and WhatsApp accounts, or start on PyHire’s shared ones. Messages and calls are paid for from a prepaid credit wallet.',
        ],
      },
    ],
    closing: 'Every conversation, on the record and in context.',
    mockup: 'communication',
  },
  {
    path: '/product/clients-and-vendors',
    eyebrow: 'Clients, vendors and prospects',
    seoTitle: 'Client & Vendor Management for Recruiters | PyHire',
    metaDescription:
      'Client onboarding, portfolio health, review meetings, vendor scorecards and a prospect pipeline for consultancies.',
    headline: 'Run your clients and vendor network like a business.',
    subheadline:
      'Onboard clients properly, keep them happy with structured reviews, score your vendors and grow your pipeline — in the same system that runs your hiring.',
    intro:
      'For a consultancy, recruiting is only half the job. PyHire manages the relationships around it: the clients you hire for, the vendors who supply candidates and the prospects you want to win.',
    blocks: [
      {
        heading: 'Client onboarding with approval',
        points: [
          'A seven-step onboarding captures company details, contacts and escalation matrix, locations, hiring needs, commercials, contract, SLA and documents. New clients wait for approval, and every status change is recorded.',
        ],
      },
      {
        heading: 'A portfolio view of every client',
        points: [
          'See demand against delivery across all clients for any period, a six-month trend, a health score for each client with the reasons, and what needs attention this week.',
        ],
      },
      {
        heading: 'Reviews and complaints, on record',
        points: [
          'Record client review meetings with points, owners and status, and email the minutes to the client in one click. Log complaints with severity and close them with a trail.',
        ],
      },
      {
        heading: 'Win new clients',
        points: [
          'Add prospect clients as leads, move them through stages from first contact to proposal and negotiation, set follow-ups and convert a won lead straight into client onboarding. Lost leads keep their reason and can be reopened.',
        ],
      },
      {
        heading: 'A vendor network you can measure',
        points: [
          'Vendor onboarding with agreements, documents and approval.',
          'A vendor dashboard with a score, rank and trend for every vendor, and side-by-side comparisons.',
          'Assign vendors to job descriptions and see exactly which candidates each one supplied.',
          'Vendor review meetings, client reviews of vendors and complaints, all in one place.',
        ],
      },
      {
        heading: 'Know what drives joining',
        points: [
          'For each client, PyHire shows how likely offers are to turn into joiners, the reasons offers fall through and which recruiters and vendors deliver the best results.',
        ],
      },
    ],
    closing: 'Clients, vendors and prospects — managed with the same rigour as your candidates.',
    mockup: 'clients',
  },
  {
    path: '/product/analytics',
    eyebrow: 'Analytics and reporting',
    seoTitle: 'Recruitment Analytics & Dashboards | PyHire',
    metaDescription:
      'Role-based dashboards, job description analysis, recruiter performance and capacity, with exports that match the screen.',
    headline: 'Know where every role stands — before anyone asks.',
    subheadline: 'Role-based dashboards, period-on-period analysis and exports that match what you see on screen.',
    intro:
      'Reporting should not be a weekly project. PyHire’s numbers update as your team works, and each person sees the view that matters to them.',
    blocks: [
      {
        heading: 'A dashboard for every role',
        points: [
          'Admins see the whole business, managers see their team, recruiters see their own work and interviewers see their interviews. Click any number to see the candidates behind it.',
        ],
      },
      {
        heading: 'Job description analysis',
        points: [
          'For every role: matched, sourced, screened, assessed, interviewed, offered, hired, joined and lost, plus days open, time to submission and time to hire — compared with any earlier period, with a totals row and Excel export.',
        ],
      },
      {
        heading: 'Recruiter performance and capacity',
        points: [
          'See each recruiter’s pipeline, interviews, offers, joins and working hours, a team leaderboard and who has capacity for the next requirement.',
        ],
      },
      {
        heading: 'Sources and losses',
        points: [
          'Find out which sources and vendors convert, and why candidates drop out — by client, role, recruiter and location.',
        ],
      },
      {
        heading: 'A weekly management summary',
        points: [
          'Every Monday morning, last week is frozen into a summary for leadership: roles opened and closed, interviews, offers, hires and joins, with the trend.',
        ],
      },
    ],
    closing: 'Decisions on live numbers, not last week’s spreadsheet.',
    mockup: 'analytics',
  },
  {
    path: '/product/careers-page',
    eyebrow: 'Careers page and candidate portal',
    seoTitle: 'Careers Page & Candidate Portal | PyHire',
    metaDescription:
      'Publish roles on your own branded careers page, take applications into your pipeline and keep candidates informed.',
    headline: 'Your own careers page, live in minutes.',
    subheadline:
      'Publish open roles on a branded careers page, take applications straight into your pipeline and keep candidates informed through a simple portal.',
    intro:
      'Candidates expect to apply online and to know where they stand. PyHire gives every company its own careers page and a self-service portal without a separate website project.',
    blocks: [
      {
        heading: 'Publish with a switch',
        points: [
          'Turn on your careers page and choose which job descriptions appear. Salary is shown only if you choose to show it, and client names and commercials are never published.',
        ],
      },
      {
        heading: 'Applications straight into the pipeline',
        points: [
          'Applicants upload their CV and answer your screening questions; they arrive in PyHire tagged with the careers page as their source, ready to be matched.',
        ],
      },
      {
        heading: 'A portal without passwords',
        points: [
          'Candidates sign in with a one-time link sent to their email and see the stage of each application. They are never shown internal notes or rejection reasons.',
        ],
      },
      {
        heading: 'Your brand',
        points: ['The careers page and candidate emails carry your company name, logo and colours.'],
      },
    ],
    closing: 'A better candidate experience, with no extra tools.',
    mockup: 'careers',
  },
  {
    path: '/product/mobile',
    eyebrow: 'Mobile app',
    seoTitle: 'PyHire Mobile App for Recruiters',
    metaDescription:
      'Call candidates, record outcomes and get follow-up reminders on Android, with your web account.',
    headline: 'Your pipeline, in your pocket.',
    subheadline:
      'The PyHire app for Android lets recruiters, managers and admins call candidates, record outcomes and never miss a follow-up — away from the desk.',
    intro:
      'Recruiting happens on the phone. The PyHire app puts the calls, the candidate details and the reminders where recruiters already are.',
    blocks: [
      {
        heading: 'Call from the app',
        points: [
          'Place calls through PyHire’s cloud calling, with the phone’s own dialer as a fallback, and record the outcome as soon as the call ends.',
        ],
      },
      {
        heading: 'Follow-up reminders',
        points: ['A notification about 15 minutes before each follow-up that is due today.'],
      },
      {
        heading: 'Signed in on web and phone',
        points: [
          'Use PyHire on the web and on one phone at the same time; signing in on a new phone signs the old one out.',
        ],
      },
    ],
    closing: 'Stay on top of candidates between meetings.',
    secondaryCta: { label: 'Ask about the app', to: '/contact?topic=app' },
    mockup: 'mobile',
  },
];

export function productPageByPath(path: string) {
  return productPages.find((page) => page.path === path);
}
