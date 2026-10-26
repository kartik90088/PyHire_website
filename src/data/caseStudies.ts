import { blocksToText, type Block } from '../lib/content';

/**
 * Case study content store.
 *
 * Every `disclaimer`, `excerpt` and `body` string below is reproduced VERBATIM
 * from the supplied Combined_Case_Studies document. Nothing is rephrased,
 * summarised or trimmed. `title` is the document's H1 with only the leading
 * "Case Study: " label dropped — the surrounding page already says so, and the
 * prefix repeated on every card added nothing.
 *
 * `segment` and `image` are presentational metadata the document does not
 * contain as such:
 *   - `segment` is taken from the audience each document names in its own
 *     italic disclaimer line ("patterns common across staffing agencies", etc.).
 *   - `image` is an Unsplash placeholder — swap for real artwork when available.
 *
 * Deliberately ABSENT because the source document contains no such data, and
 * inventing it would misrepresent the content: client name / logo (every study
 * states it is "not a specific named client"), technology stack, solution
 * category, and publication date.
 */

export interface CaseStudy {
  slug: string;
  /** H1 from the source document, minus its "Case Study: " label. */
  title: string;
  /**
   * Shorter title for the `<title>` tag only — the H1 on the page is unchanged.
   *
   * Search results truncate at roughly 60 characters including the " | PyHire"
   * suffix. These headlines are written to read naturally on the page and all
   * run past that, so the keyword-bearing tail is what gets cut. Set this to a
   * front-loaded variant; falls back to `title` when absent.
   */
  seoTitle?: string;
  /**
   * Deck line shown under the H1. The H1 stays as the document wrote it — plain
   * and natural — and this carries the search context (what the product does,
   * for whom) that a keyword-stuffed headline would otherwise have to hold. Also
   * used as the page's meta description in preference to `excerpt`.
   */
  subtitle?: string;
  /** Verbatim italic scope note that opens each document. */
  disclaimer: string;
  /**
   * The card blurb, and the meta description when there is no `subtitle`. Taken
   * from the document's own summary line where it has one, otherwise the first
   * paragraph of "The starting point".
   */
  excerpt: string;
  /** Verbatim body of the source document. */
  body: Block[];
  /** Audience named in the document's own disclaimer line. */
  segment: string;
  image: string;
  imageAlt: string;
  /**
   * ISO 8601 date (YYYY-MM-DD) the study was published, and the date it was last
   * substantively revised. Both feed the `Article` graph, where freshness is a
   * significant ranking and AI-citation signal.
   *
   * Deliberately optional and currently unset: the source documents carry no
   * dates, and inventing them would put false information into structured data.
   * Populate with the real authoring dates — the schema omits the fields until
   * then rather than guessing.
   */
  datePublished?: string;
  dateModified?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'case-study-01-agency-multi-client',
    title:
      'How a Multi-Client Staffing Agency Gained Visibility Into Recruitment Profitability',
    seoTitle: 'Recruitment Profitability for Staffing Agencies',
    subtitle:
      'How PyHire helps staffing agencies manage multiple clients, recruitment vendors, candidate sources, and hiring performance from a centralized platform.',
    disclaimer:
      'This is an illustrative scenario based on operational patterns common across staffing and recruitment agencies. It demonstrates the type of operational shift PyHire is designed to support and does not represent results from a specific named customer.',
    excerpt:
      "A mid-sized staffing agency manages recruitment for six active clients simultaneously. Candidates come through multiple channels, including direct applications, referrals, job boards, and four external recruitment vendors. The agency's recruitment process runs on a shared Excel workbook, with one tab for each client.",
    segment: 'Staffing Agencies',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'An agency team reviewing client and vendor performance together',
    body: [
      { type: 'h2', text: 'The Starting Point' },
      {
        type: 'p',
        text: 'A mid-sized staffing agency manages recruitment for six active clients simultaneously. Candidates come through multiple channels, including direct applications, referrals, job boards, and four external recruitment vendors.',
      },
      {
        type: 'p',
        text: "The agency's recruitment process runs on a shared Excel workbook, with one tab for each client. Recruiters manually update candidate records, while vendor commissions are calculated separately at the end of each month.",
      },
      {
        type: 'p',
        text: 'Client reporting is also handled manually. Each client receives a version of the spreadsheet containing the information relevant to them.',
      },
      {
        type: 'p',
        text: 'As the agency grows, a simple business question becomes increasingly difficult to answer:',
      },
      {
        type: 'p',
        text: '**Which client, recruiter, or vendor is actually contributing the most value to the business?**',
      },
      {
        type: 'p',
        text: 'The answer is buried across spreadsheets, candidate records, vendor information, and manual calculations.',
      },
      { type: 'quote', text: '"I\'d have to go dig for it."' },

      { type: 'h2', text: 'The Challenge' },
      {
        type: 'p',
        text: "The agency's biggest challenge was not a lack of recruitment data. It was the lack of a connected view across clients, candidates, recruiters, vendors, and hiring outcomes.",
      },
      { type: 'p', text: 'The team needed better visibility into:' },
      {
        type: 'ul',
        items: [
          'Client-wise recruitment performance',
          'Recruiter contribution',
          'Vendor performance',
          'Candidate sources',
          'Source-to-join conversion',
          'Vendor commission calculations',
          'Candidate and joining status',
          'Client-specific reporting',
        ],
      },
      {
        type: 'p',
        text: 'Without a centralized recruitment workflow, comparing this information required manual reconciliation and increased the risk of inconsistent reporting.',
      },

      { type: 'h2', text: 'What Moved Onto PyHire' },
      {
        type: 'p',
        text: "With PyHire, each of the agency's six clients could operate within its own isolated workspace, with separate users, branding, and reporting access, while the agency retained a consolidated operational view across its client accounts.",
      },
      {
        type: 'p',
        text: 'Candidate sources could also be tracked throughout the recruitment lifecycle.',
      },
      { type: 'p', text: 'Each candidate could be associated with a source such as:' },
      {
        type: 'ul',
        items: [
          'Direct application',
          'Employee referral',
          'Job board',
          'External recruitment vendor',
        ],
      },
      {
        type: 'p',
        text: "This allowed the agency to connect the candidate's original source with their progress through the recruitment pipeline and eventual joining status.",
      },

      { type: 'h2', text: 'Bringing Vendor Commission Tracking Into the Workflow' },
      {
        type: 'p',
        text: 'Recruitment vendors can operate under different commercial arrangements. Depending on the agreement, commissions may be based on:',
      },
      {
        type: 'ul',
        items: [
          'A percentage of CTC',
          'A fixed placement fee',
          'A per-join fee',
          'A defined guarantee period',
        ],
      },
      {
        type: 'p',
        text: 'Instead of manually reconstructing vendor payouts at the end of each month, vendor commission terms could be configured within the recruitment workflow.',
      },
      {
        type: 'p',
        text: 'As candidates progressed through selection and joining, the applicable commission could be tracked according to the configured terms.',
      },
      {
        type: 'p',
        text: 'This creates a more consistent basis for monitoring vendor commissions and can help reduce disputes caused by manual calculations or incomplete records.',
      },

      { type: 'h2', text: 'From Candidate Volume to Hiring Outcomes' },
      {
        type: 'p',
        text: 'The agency previously knew how many candidates different sources were providing.',
      },
      {
        type: 'p',
        text: 'But candidate volume alone does not answer the more important question:',
      },
      { type: 'p', text: '**Which sources actually produce successful hires?**' },
      {
        type: 'p',
        text: 'With candidate source tracking, the agency can follow candidates from their original source through the recruitment pipeline and joining stage.',
      },
      { type: 'p', text: 'This makes it possible to compare metrics such as:' },
      {
        type: 'ul',
        items: [
          'Candidates sourced',
          'Candidates shortlisted',
          'Candidates interviewed',
          'Candidates selected',
          'Candidates joined',
          'Source-to-join conversion',
        ],
      },
      {
        type: 'p',
        text: 'For example, a vendor submitting 100 resumes but producing only two successful joins may deliver less hiring value than a vendor submitting 30 candidates and producing eight successful joins.',
      },
      {
        type: 'p',
        text: 'This provides recruitment teams with a more meaningful way to evaluate sourcing channels and vendor relationships.',
      },

      { type: 'h2', text: 'Client-by-Client Visibility' },
      {
        type: 'p',
        text: 'Managing recruitment for multiple clients becomes increasingly complex when each client has different hiring requirements, users, positions, and reporting needs.',
      },
      {
        type: 'p',
        text: 'With separate client workspaces, the agency can maintain client-specific recruitment information while retaining an overall view of operations.',
      },
      { type: 'p', text: 'This can help teams monitor:' },
      {
        type: 'ul',
        items: [
          'Open positions',
          'Candidate pipelines',
          'Hiring progress',
          'Recruiter activity',
          'Vendor contribution',
          'Candidate sources',
          'Joining status',
          'Recruitment performance',
        ],
      },
      {
        type: 'p',
        text: 'Instead of maintaining multiple versions of spreadsheets, the agency can work with structured recruitment data and generate reporting based on the relevant client or account.',
      },

      { type: 'h2', text: 'What Changed, Directionally' },
      {
        type: 'p',
        text: 'Moving recruitment operations from disconnected spreadsheets into a centralized workflow changes how the agency can evaluate its recruitment business.',
      },
      { type: 'h3', text: 'Client performance becomes easier to analyze' },
      {
        type: 'p',
        text: 'Instead of manually reconciling information across six spreadsheet tabs, recruitment activity can be viewed by individual client.',
      },
      { type: 'h3', text: 'Vendor performance becomes measurable' },
      {
        type: 'p',
        text: 'The agency can compare vendors based not only on candidate submissions, but also on selection and joining outcomes.',
      },
      { type: 'h3', text: 'Commission tracking becomes more consistent' },
      {
        type: 'p',
        text: 'Configured vendor terms provide a standardized basis for tracking applicable commissions.',
      },
      { type: 'h3', text: 'Source-to-join conversion becomes visible' },
      {
        type: 'p',
        text: 'The agency can identify which sourcing channels produce candidates who ultimately join.',
      },
      { type: 'h3', text: 'Recruiter contribution becomes easier to evaluate' },
      {
        type: 'p',
        text: 'Recruitment activity and candidate outcomes can be analyzed to understand recruiter-level performance.',
      },
      { type: 'h3', text: 'Client reporting becomes more structured' },
      {
        type: 'p',
        text: 'Each client can access relevant information from its own workspace without relying on manually filtered versions of a shared spreadsheet.',
      },

      { type: 'h2', text: 'The Underlying Lesson' },
      {
        type: 'p',
        text: 'For a staffing agency managing multiple clients, recruiters, and external recruitment vendors, the profitability question was never necessarily unanswerable.',
      },
      {
        type: 'p',
        text: 'The information was simply distributed across disconnected records.',
      },
      {
        type: 'p',
        text: 'When the **client, candidate, recruiter, vendor, source, placement, and commission** become connected parts of the recruitment workflow, agencies can gain a more structured view of how their recruitment operations are performing.',
      },
      { type: 'p', text: 'What previously required someone to say:' },
      { type: 'quote', text: '"I\'d have to go dig for it."' },
      {
        type: 'p',
        text: 'can instead become information that is available through a centralized recruitment management system.',
      },

      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'h3', text: 'How can staffing agencies track recruitment performance by client?' },
      {
        type: 'p',
        text: 'A centralized recruitment management system can connect candidates, positions, recruiters, vendors, hiring outcomes, and other recruitment activity to individual client accounts, making client-level performance easier to monitor.',
      },
      { type: 'h3', text: 'How can recruitment agencies track vendor commissions?' },
      {
        type: 'p',
        text: 'Vendor commission rules can be configured according to the applicable commercial arrangement, such as a percentage of CTC, fixed placement fee, per-join fee, or guarantee period. The applicable commission can then be tracked as candidates progress through the hiring process.',
      },
      { type: 'h3', text: 'Why is candidate source tracking important?' },
      {
        type: 'p',
        text: 'Candidate source tracking helps staffing agencies understand which channels and vendors generate successful hires rather than measuring performance only by the number of resumes submitted.',
      },
      { type: 'h3', text: 'What is source-to-join conversion?' },
      {
        type: 'p',
        text: 'Source-to-join conversion measures how effectively a recruitment source converts candidates into successful joins. It helps agencies compare the effectiveness of different sourcing channels and vendors.',
      },
      { type: 'h3', text: 'Can staffing software manage multiple clients?' },
      {
        type: 'p',
        text: 'Multi-client recruitment software can provide separate client workspaces, users, access controls, and reporting while allowing the staffing agency to maintain a consolidated operational view.',
      },

      { type: 'h2', text: 'See How PyHire Can Support Your Recruitment Operations' },
      {
        type: 'p',
        text: 'Manage candidates, clients, recruiters, and recruitment vendors through a structured recruitment workflow with **PyHire**.',
      },
      {
        type: 'p',
        text: '**Explore PyHire to bring greater visibility and control to your staffing operations.**',
      },
    ],
  },

  {
    slug: 'case-study-02-hr-lead-compliance',
    title: 'How an In-House HR Team Built a More Defensible Hiring Process',
    seoTitle: 'Building a Defensible Hiring Process',
    subtitle:
      'How PyHire helps HR teams structure candidate evaluation, maintain hiring audit trails, and manage candidate data rights.',
    disclaimer:
      'This is an illustrative scenario based on operational challenges commonly experienced by in-house talent acquisition teams. It demonstrates the type of workflow PyHire is designed to support and does not represent results from a specific named customer.',
    excerpt:
      'An in-house HR team at a mid-sized company runs hiring across eight departments. Interview feedback arrives as free-text emails from different interviewers, in different formats, with no shared rating scale.',
    segment: 'In-House Talent Teams',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'A padlock resting on a laptop keyboard, representing auditable candidate data',
    body: [
      { type: 'h2', text: 'The Starting Point' },
      {
        type: 'p',
        text: 'An in-house HR team at a mid-sized company runs hiring across eight departments.',
      },
      {
        type: 'p',
        text: 'Interview feedback arrives as free-text emails from different interviewers, in different formats, with no shared rating scale.',
      },
      {
        type: 'p',
        text: 'One interviewer writes three paragraphs. Another writes a single line. A third replies only to the recruiter who invited them, so the rest of the panel never sees it.',
      },
      {
        type: 'p',
        text: 'When a department head or the legal team asks why one candidate was selected over another, the honest answer is often a recollection rather than a record:',
      },
      { type: 'quote', text: '"The panel felt good about them."' },
      {
        type: 'p',
        text: 'That may well be true. It is simply not something the organization can demonstrate afterwards.',
      },
      {
        type: 'p',
        text: 'Candidate data raises a second question. When a candidate emails asking for their information to be deleted, someone has to manually search shared drives, folders and old email threads to try to locate every copy of their resume and identity documents.',
      },
      {
        type: 'p',
        text: 'Nobody can say with certainty that every copy has been found.',
      },

      { type: 'h2', text: 'The Challenge' },
      {
        type: 'p',
        text: 'The HR team needed hiring decisions and candidate data handling to be structured enough to explain later, without adding manual work to every interview.',
      },
      { type: 'p', text: 'The main challenges included:' },
      {
        type: 'ul',
        items: [
          'Interview feedback in inconsistent formats',
          'No shared evaluation criteria across interviewers',
          'Different requirements across eight departments',
          'Difficulty comparing candidates objectively',
          'No consolidated record of who accessed candidate data',
          'Candidate documents stored across multiple locations',
          'Manual handling of data deletion requests',
          'Limited ability to evidence the basis of a hiring decision',
        ],
      },
      {
        type: 'p',
        text: 'The problem was not that the team was making poor decisions.',
      },
      {
        type: 'p',
        text: 'The problem was that **the reasoning behind those decisions lived in inboxes and memory rather than in a structured record.**',
      },

      { type: 'h2', text: 'What Moved Onto PyHire' },
      {
        type: 'p',
        text: 'PyHire introduced a more structured approach to candidate evaluation, access logging, and candidate data requests.',
      },
      {
        type: 'p',
        text: 'Evaluation forms could be configured once per department and interview round, then applied automatically to the relevant interviews.',
      },
      {
        type: 'p',
        text: 'Recruitment activity — including status changes, consent records and data access events — could be recorded within the platform rather than reconstructed afterwards.',
      },
      {
        type: 'p',
        text: 'Candidate data requests could be handled through a defined workflow instead of an ad-hoc search across storage locations.',
      },

      { type: 'h2', text: 'Structured Candidate Evaluation' },
      {
        type: 'p',
        text: 'Different departments and interview rounds assess different things.',
      },
      {
        type: 'p',
        text: 'A technical round in Engineering and an HR round in Sales are not measuring the same qualities, and forcing both onto one generic form helps nobody.',
      },
      {
        type: 'p',
        text: 'Configurable evaluation forms allow each round to use criteria appropriate to it, while every candidate within a given round is assessed against the same criteria.',
      },
      { type: 'p', text: 'A configured form might capture:' },
      {
        type: 'ul',
        items: [
          'Defined evaluation criteria for that round',
          'A consistent rating scale',
          'Structured comments',
          'An overall recommendation',
          'The interviewer and interview stage',
        ],
      },
      {
        type: 'p',
        text: 'This changes the comparison from free-text impressions to a common structure:',
      },
      { type: 'p', text: '**Same round → same criteria → comparable evaluations**' },
      {
        type: 'p',
        text: 'Interviewers also spend less time deciding what to write, because the structure is provided rather than invented for each interview.',
      },

      { type: 'h2', text: 'Making Hiring Decisions Explainable' },
      {
        type: 'p',
        text: 'A defensible hiring process is one where the organization can describe, after the fact, what was assessed and on what basis.',
      },
      { type: 'p', text: 'With structured evaluations, a decision can be traced back to:' },
      {
        type: 'ul',
        items: [
          'Which interviews took place',
          'Who conducted them',
          'Which criteria were applied',
          'How each candidate was rated',
          'What the recommendation was at each stage',
        ],
      },
      {
        type: 'p',
        text: 'The question shifts from a recollection to a record:',
      },
      { type: 'quote', text: '**"Here is what was assessed, by whom, and how it was scored."**' },
      {
        type: 'p',
        text: 'This does not remove judgement from hiring, and it is not intended to. It makes the judgement visible enough to review.',
      },

      { type: 'h2', text: 'Audit Trails for Candidate Data' },
      {
        type: 'p',
        text: 'Recruitment involves handling personal information — resumes, identity documents, contact details, evaluation records, and communication history.',
      },
      {
        type: 'p',
        text: 'When that information is spread across drives, inboxes and personal folders, it becomes difficult to establish who accessed what, and when.',
      },
      {
        type: 'p',
        text: 'A centralized recruitment platform can record recruitment activity as it happens, including:',
      },
      {
        type: 'ul',
        items: [
          'Candidate status changes',
          'Data access events',
          'Consent records',
          'Document uploads',
          'Evaluation submissions',
          'User actions within the platform',
        ],
      },
      {
        type: 'p',
        text: 'The value is not the log itself. It is that the log already exists when someone asks for it, rather than needing to be assembled under time pressure.',
      },

      { type: 'h2', text: 'Handling Candidate Data Requests' },
      {
        type: 'p',
        text: 'Candidates can ask an organization to provide or delete the personal data held about them.',
      },
      {
        type: 'p',
        text: 'Handled manually, that request becomes a search exercise: which folders, which inboxes, which shared drives, which recruiter still has an attachment.',
      },
      {
        type: 'p',
        text: 'Handled through a defined workflow, the request can follow a consistent path:',
      },
      {
        type: 'ol',
        items: [
          '**Request received through a defined channel**',
          '**Requester identity verified**',
          '**Associated candidate records located**',
          '**Applicable action carried out**',
          '**Action recorded**',
        ],
      },
      {
        type: 'p',
        text: 'Where erasure applies, it needs to cover stored documents as well as database records — resumes and identity proofs included — rather than only the visible profile.',
      },
      {
        type: 'p',
        text: 'PyHire is designed to support these workflows. It does not, by itself, make an organization compliant. Data protection obligations depend on the policies, lawful bases, retention rules, consent mechanisms and access controls each organization configures and operates under its applicable law.',
      },

      { type: 'h2', text: 'Role-Based Access to Candidate Information' },
      {
        type: 'p',
        text: 'Not everyone involved in hiring needs access to everything.',
      },
      {
        type: 'p',
        text: 'An interviewer may need the candidate profile and the evaluation form for their round. A recruiter may need the full pipeline. A department head may need their own requisitions.',
      },
      {
        type: 'p',
        text: 'Role-based access allows an organization to align visibility with responsibility, which both reduces unnecessary exposure of personal data and makes access logs more meaningful.',
      },
      {
        type: 'p',
        text: 'Broad access to everything makes an audit trail harder to interpret, because everything looks normal.',
      },

      { type: 'h2', text: 'What Changed, Directionally' },
      {
        type: 'p',
        text: 'Moving evaluation and candidate data handling into a structured workflow changes what the HR team can demonstrate.',
      },
      { type: 'h3', text: 'Hiring decisions become explainable' },
      {
        type: 'p',
        text: 'Selection can be supported by structured evaluations against agreed criteria rather than a recollection of how an interview felt.',
      },
      { type: 'h3', text: 'Candidate comparison becomes more consistent' },
      {
        type: 'p',
        text: 'Candidates within the same round are assessed against the same criteria, which makes their evaluations comparable.',
      },
      { type: 'h3', text: 'Data requests become more manageable' },
      {
        type: 'p',
        text: 'A defined workflow replaces an ad-hoc search across drives and inboxes when a candidate asks about their data.',
      },
      { type: 'h3', text: 'Audit readiness stops being a scramble' },
      {
        type: 'p',
        text: 'When someone asks who accessed a candidate record and when, the information is already recorded rather than reconstructed.',
      },
      { type: 'h3', text: 'Interviewers spend less time on format' },
      {
        type: 'p',
        text: 'Evaluation structure is provided, so interviewers can focus on the assessment rather than on how to write it up.',
      },

      { type: 'h2', text: 'Why Structure Matters More as Hiring Scales' },
      {
        type: 'p',
        text: 'With three open roles and one interviewer, informal feedback is manageable.',
      },
      {
        type: 'p',
        text: 'Across eight departments, multiple interview rounds and many interviewers, the same informality produces inconsistency — not because anyone intends it, but because there is no shared structure holding the process together.',
      },
      { type: 'p', text: 'That inconsistency surfaces in familiar ways:' },
      {
        type: 'ul',
        items: [
          'Two candidates assessed on different criteria for the same role',
          'Feedback that cannot be compared',
          'Decisions that are difficult to explain months later',
          'Candidate data held in more places than anyone can list',
        ],
      },
      {
        type: 'p',
        text: 'Structure is what allows a hiring process to stay consistent as the number of people involved grows.',
      },

      { type: 'h2', text: 'The Underlying Lesson' },
      {
        type: 'p',
        text: 'A defensible hiring process is not a stricter hiring process.',
      },
      {
        type: 'p',
        text: 'It is one where the organization can answer two questions without a search: **what was assessed, and what happened to the candidate\'s data.**',
      },
      {
        type: 'p',
        text: 'Both answers depend less on policy documents than on whether the recruitment workflow records the information as work happens.',
      },
      {
        type: 'p',
        text: 'A policy that lives outside the system relies on people remembering to follow it. A structure built into the workflow produces the record as a by-product of the hiring itself.',
      },
      {
        type: 'p',
        text: 'By connecting **evaluation forms, interview records, access logging, role-based permissions and candidate data workflows**, PyHire is designed to help HR teams build hiring processes that can be reviewed with confidence.',
      },

      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'h3', text: 'What is a defensible hiring process?' },
      {
        type: 'p',
        text: 'A defensible hiring process is one where an organization can explain afterwards what was assessed, by whom, against which criteria, and how candidate data was handled — supported by records rather than recollection.',
      },
      { type: 'h3', text: 'How do structured interview scorecards help HR teams?' },
      {
        type: 'p',
        text: 'Structured scorecards apply the same criteria and rating scale to every candidate in a given interview round, which makes evaluations comparable and reduces reliance on free-text impressions.',
      },
      { type: 'h3', text: 'Can different departments use different evaluation forms?' },
      {
        type: 'p',
        text: 'Yes. Evaluation forms can be configured per department and per interview round, so a technical round and an HR round can assess different criteria while remaining consistent within each round.',
      },
      { type: 'h3', text: 'What is an audit trail in recruitment software?' },
      {
        type: 'p',
        text: 'A recruitment audit trail is a record of actions taken within the hiring system — status changes, data access, consent records, document uploads and evaluation submissions — captured as work happens rather than reconstructed later.',
      },
      { type: 'h3', text: 'How can recruitment teams handle candidate data deletion requests?' },
      {
        type: 'p',
        text: 'A defined workflow can verify the requester, locate the associated candidate records, carry out the applicable action across both database records and stored documents, and record what was done.',
      },
      { type: 'h3', text: 'Does recruitment software make an organization compliant?' },
      {
        type: 'p',
        text: 'No. Software can support compliance workflows such as consent capture, access control, audit logging and data requests, but compliance depends on the policies, lawful bases, retention rules and practices each organization configures and operates under its applicable law.',
      },

      { type: 'h2', text: 'See How PyHire Can Support Defensible Hiring' },
      {
        type: 'p',
        text: 'Explaining a hiring decision months later should not depend on who remembers the interview.',
      },
      {
        type: 'p',
        text: '**PyHire helps HR teams structure candidate evaluation, record recruitment activity, manage access, and handle candidate data requests through one recruitment workflow.**',
      },
      {
        type: 'p',
        text: '**Explore PyHire** to see how a more structured hiring process can make decisions easier to review and candidate data easier to manage.',
      },
    ],
  },

  {
    slug: 'case-study-03-recruiter-dropoff',
    title: 'How a Recruiting Team Reduced Candidate Drop-Off With Faster Follow-Up',
    seoTitle: 'Reducing Candidate Drop-Off With Faster Follow-Up',
    subtitle:
      'How PyHire helps recruiting teams manage candidate assignment, recruiter workloads, follow-ups, interviews, offers, and AI-powered candidate search through a centralized recruitment workflow.',
    disclaimer:
      'This is an illustrative scenario based on operational challenges commonly experienced by high-volume recruiting teams. It demonstrates the type of workflow PyHire is designed to support and does not represent results from a specific named customer.',
    excerpt:
      'A five-person recruiting team is sourcing candidates for fifteen open roles simultaneously. Candidate information is maintained in a shared spreadsheet, with new candidates assigned informally. Whoever notices a new candidate row first tends to claim it.',
    segment: 'High-Volume Recruiting',
    image:
      'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'A recruiter on a call, following up with a candidate',
    body: [
      { type: 'h2', text: 'The Starting Point' },
      {
        type: 'p',
        text: 'A five-person recruiting team is sourcing candidates for fifteen open roles simultaneously.',
      },
      {
        type: 'p',
        text: 'Candidate information is maintained in a shared spreadsheet, with new candidates assigned informally. Whoever notices a new candidate row first tends to claim it.',
      },
      {
        type: 'p',
        text: 'As the volume of candidates increases, this approach creates an uneven workload across the recruiting team. Some recruiters accumulate large candidate backlogs while others may have available capacity.',
      },
      { type: 'p', text: 'Follow-ups create another challenge.' },
      {
        type: 'p',
        text: 'Candidates who need a call, email, interview confirmation, or document request can easily get buried among hundreds of spreadsheet rows. There is no consistent, centralized view showing which candidates require action today or which recruiter is responsible for the next step.',
      },
      { type: 'p', text: 'The result is a familiar recruiting problem:' },
      {
        type: 'p',
        text: '**The team has candidates in the pipeline, but keeping every candidate moving forward becomes difficult.**',
      },

      { type: 'h2', text: 'The Challenge' },
      {
        type: 'p',
        text: 'The recruiting team needed a more structured way to manage candidate allocation and follow-up activity across multiple open positions.',
      },
      { type: 'p', text: 'The main challenges included:' },
      {
        type: 'ul',
        items: [
          'Uneven distribution of candidates across recruiters',
          'Manual candidate assignment',
          'Limited visibility into recruiter workload',
          'Follow-ups being buried in a shared spreadsheet',
          'Difficulty identifying candidates requiring action',
          'Repeated manual searches for suitable candidates',
          'Time spent rebuilding candidate filters for similar roles',
          'Risk of candidates becoming inactive because follow-ups were missed',
        ],
      },
      { type: 'p', text: "The issue wasn't necessarily a shortage of candidates." },
      {
        type: 'p',
        text: 'The bigger challenge was making sure the **right recruiter knew what needed to happen next — and when.**',
      },

      { type: 'h2', text: 'What Moved Onto PyHire' },
      {
        type: 'p',
        text: 'PyHire introduced a more structured recruitment workflow for candidate assignment, follow-up management, and candidate discovery.',
      },

      { type: 'h3', text: 'Automated Candidate Assignment' },
      {
        type: 'p',
        text: 'Instead of allowing recruiters to claim candidates manually, new candidates could be routed through weighted auto-assignment.',
      },
      { type: 'p', text: 'Assignment could consider factors such as:' },
      {
        type: 'ul',
        items: [
          'Recruiter workload',
          'Recruiter specialization',
          'Candidate or role location',
          'Other configured assignment criteria',
        ],
      },
      {
        type: 'p',
        text: 'This creates a more structured approach to distributing candidates across the recruiting team.',
      },

      { type: 'h3', text: 'Action-Based Recruiter Work Queues' },
      {
        type: 'p',
        text: 'Each recruiter could work from dedicated views based on the action required.',
      },
      { type: 'p', text: 'These included:' },
      {
        type: 'ul',
        items: [
          '**Unassigned**',
          '**My Assigned**',
          '**Follow-up**',
          '**Interview Scheduled**',
          '**Offer Sent • Pending Documentation**',
        ],
      },
      {
        type: 'p',
        text: 'Rather than scanning hundreds of spreadsheet rows, recruiters could focus on the candidates relevant to their current workload and next actions.',
      },
      { type: 'p', text: 'The workflow shifts the question from:' },
      { type: 'quote', text: '"Where is that candidate in the spreadsheet?"' },
      { type: 'p', text: 'to:' },
      { type: 'quote', text: '**"Which candidates need my action today?"**' },

      { type: 'h3', text: 'AI-Powered Candidate Search' },
      {
        type: 'p',
        text: 'For roles requiring a fresh shortlist, recruiters could use natural-language AI search to find relevant candidates from the existing database.',
      },
      {
        type: 'p',
        text: 'Instead of repeatedly rebuilding filters and manually searching through candidate records, recruiters could describe the type of candidate they were looking for using natural language.',
      },
      {
        type: 'p',
        text: "This can help reduce repetitive sourcing work when suitable candidates already exist within the organization's candidate database.",
      },

      { type: 'h2', text: 'How PyHire Helps Recruiting Teams Stay on Top of Candidates' },

      { type: 'h3', text: '1. Candidates Can Be Assigned More Systematically' },
      {
        type: 'p',
        text: 'Weighted assignment can help distribute incoming candidates according to configured factors such as workload, specialization, and location.',
      },
      {
        type: 'p',
        text: 'This gives recruiting teams a more structured alternative to informal candidate claiming.',
      },

      { type: 'h3', text: '2. Recruiters Can Prioritize Follow-Ups' },
      {
        type: 'p',
        text: 'A dedicated follow-up queue makes candidates requiring action easier to identify during daily recruitment activities.',
      },
      {
        type: 'p',
        text: "Recruiters don't have to rely entirely on memory or manually search through a spreadsheet to find candidates waiting for a response.",
      },

      { type: 'h3', text: '3. Recruitment Stages Stay Visible' },
      {
        type: 'p',
        text: 'Candidate views can help recruiters keep track of important stages such as:',
      },
      {
        type: 'ul',
        items: [
          'Assigned candidates',
          'Follow-ups',
          'Scheduled interviews',
          'Offers',
          'Pending documentation',
        ],
      },
      {
        type: 'p',
        text: 'This provides a clearer view of what needs attention at each stage of the recruitment process.',
      },

      { type: 'h3', text: '4. Existing Candidates Can Be Reused' },
      {
        type: 'p',
        text: 'When a similar position opens, recruiters can search the existing candidate database rather than starting the sourcing process from scratch.',
      },
      {
        type: 'p',
        text: 'AI-powered natural-language search can help identify relevant candidate profiles more efficiently.',
      },

      { type: 'h2', text: 'What Changed, Directionally' },
      {
        type: 'p',
        text: 'Moving from a shared spreadsheet to a structured recruitment workflow can change how the recruiting team manages candidate activity.',
      },
      { type: 'h3', text: 'Recruiter workload becomes more visible' },
      {
        type: 'p',
        text: 'Candidate allocation can be structured around configured assignment criteria rather than relying on whoever notices and claims a new candidate first.',
      },
      { type: 'h3', text: 'Follow-up becomes easier to prioritize' },
      {
        type: 'p',
        text: 'Candidates requiring action can appear in a dedicated follow-up view rather than being buried among hundreds of spreadsheet rows.',
      },
      { type: 'h3', text: 'Candidate search becomes more efficient' },
      {
        type: 'p',
        text: 'Recruiters can use existing candidate data and AI-powered search to identify relevant profiles without repeatedly rebuilding complex filters.',
      },
      { type: 'h3', text: 'Recruitment stages become easier to monitor' },
      {
        type: 'p',
        text: 'Dedicated views for assignments, follow-ups, interviews, offers, and documentation provide recruiters with clearer visibility into their immediate workload.',
      },
      { type: 'h3', text: 'Candidate engagement can become more consistent' },
      {
        type: 'p',
        text: 'When recruiters can quickly identify candidates awaiting action, the team can respond more consistently and reduce the likelihood of candidates being overlooked.',
      },

      { type: 'h2', text: 'From Candidate Volume to Candidate Progress' },
      {
        type: 'p',
        text: 'Recruitment teams often focus on how many candidates enter the pipeline.',
      },
      {
        type: 'p',
        text: 'But candidate volume alone does not determine recruitment success.',
      },
      { type: 'p', text: 'A healthier recruitment workflow also needs to answer:' },
      {
        type: 'ul',
        items: [
          'Who owns this candidate?',
          'What action is required next?',
          'When was the candidate last contacted?',
          'Is an interview scheduled?',
          'Is the candidate waiting for documentation?',
          'Has an offer been sent?',
          'Which candidates require follow-up today?',
        ],
      },
      {
        type: 'p',
        text: 'PyHire is designed to make these actions more visible within the recruitment workflow.',
      },
      { type: 'p', text: "The objective isn't simply to collect more candidates." },
      {
        type: 'p',
        text: 'It is to help recruiting teams **move the right candidates through the hiring process efficiently.**',
      },

      { type: 'h2', text: 'The Role of AI in Candidate Search' },
      { type: 'p', text: 'AI can also reduce repetitive work within recruitment operations.' },
      {
        type: 'p',
        text: 'Instead of manually rebuilding database searches for every new role, recruiters can use natural-language queries to identify candidates based on relevant requirements.',
      },
      {
        type: 'p',
        text: 'For example, a recruiter might search for candidates based on a combination of:',
      },
      {
        type: 'ul',
        items: [
          'Skills',
          'Experience',
          'Location',
          'Role requirements',
          'Previous candidate information',
        ],
      },
      {
        type: 'p',
        text: 'The value comes from connecting AI-powered search with an existing candidate database, allowing recruiters to discover relevant profiles without repeatedly starting the sourcing process from the beginning.',
      },

      { type: 'h2', text: 'The Underlying Lesson' },
      { type: 'p', text: "Candidate drop-off isn't always a sourcing problem." },
      {
        type: 'p',
        text: 'For high-volume recruiting teams, follow-up speed and ownership can be just as important.',
      },
      {
        type: 'p',
        text: 'A candidate may already be qualified and interested, but if nobody knows that the candidate is waiting for a response, interview confirmation, document request, or next step, the opportunity can be lost.',
      },
      { type: 'p', text: 'The challenge is therefore not simply:' },
      { type: 'p', text: '**"Do we have enough candidates?"**' },
      { type: 'p', text: 'It is:' },
      { type: 'p', text: '**"Does the right recruiter know what needs to happen next?"**' },
      {
        type: 'p',
        text: 'By making candidate ownership, workload, follow-ups, recruitment stages, and candidate search more visible, PyHire is designed to help recruiting teams build a more structured and responsive hiring workflow.',
      },

      { type: 'h2', text: 'Frequently Asked Questions' },
      {
        type: 'h3',
        text: 'How can recruiting teams prevent candidates from being lost during follow-up?',
      },
      {
        type: 'p',
        text: 'Recruiting teams can use centralized candidate tracking and dedicated follow-up queues to identify candidates who require action. This reduces reliance on spreadsheets, memory, and manual searches.',
      },
      { type: 'h3', text: 'How does automated candidate assignment help recruiters?' },
      {
        type: 'p',
        text: 'Automated candidate assignment can distribute candidates based on configured criteria such as recruiter workload, specialization, and location. This provides a more systematic approach to candidate allocation.',
      },
      { type: 'h3', text: 'What is candidate tracking software?' },
      {
        type: 'p',
        text: 'Candidate tracking software helps recruiting teams manage candidate records, assignments, follow-ups, interviews, offers, and other stages of the hiring process within a centralized system.',
      },
      { type: 'h3', text: 'How can AI help recruiters find candidates?' },
      {
        type: 'p',
        text: 'AI-powered candidate search allows recruiters to use natural-language queries to identify relevant profiles from an existing candidate database, reducing the need to repeatedly build manual searches.',
      },
      { type: 'h3', text: 'Why is candidate follow-up important in recruitment?' },
      {
        type: 'p',
        text: 'Consistent follow-up helps recruiting teams keep candidates informed and moving through the hiring process. A structured follow-up workflow makes candidates requiring action easier for recruiters to identify.',
      },

      { type: 'h2', text: 'See How PyHire Can Streamline Your Recruitment Workflow' },
      {
        type: 'p',
        text: "Managing candidates across multiple roles doesn't have to mean managing hundreds of spreadsheet rows.",
      },
      {
        type: 'p',
        text: '**PyHire helps recruiting teams bring candidate assignment, follow-ups, interviews, offers, documentation, and candidate search into a structured recruitment workflow.**',
      },
      {
        type: 'p',
        text: '**Explore PyHire** and see how your recruiting team can manage candidate activity with greater visibility and consistency.',
      },
    ],
  },

  {
    slug: 'case-study-04-rpo-blended-teams',
    title: 'How an RPO Firm Manages Multiple Client Hiring Processes With PyHire',
    seoTitle: 'RPO Software for Multi-Client Hiring',
    subtitle:
      'How PyHire helps RPO and managed-hiring providers manage client-specific recruitment workflows, recruiter performance, usage, and analytics from a centralized platform.',
    disclaimer:
      'This is an illustrative scenario based on operational challenges commonly experienced by RPO and managed-hiring providers. It demonstrates the type of workflow PyHire is designed to support and does not represent results from a specific named customer.',
    excerpt:
      "An RPO firm provides recruitment services to three client organizations, with its recruiters working directly within each client's hiring process. Although the RPO team manages recruitment across all three accounts, each client operates differently.",
    segment: 'RPO & Managed Hiring',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Separate glass-walled workspaces in a modern office',
    body: [
      { type: 'h2', text: 'The Starting Point' },
      {
        type: 'p',
        text: "An RPO firm provides recruitment services to three client organizations, with its recruiters working directly within each client's hiring process.",
      },
      {
        type: 'p',
        text: 'Although the RPO team manages recruitment across all three accounts, each client operates differently.',
      },
      {
        type: 'p',
        text: 'One client may have a five-stage recruitment process. Another may use different interview stages, evaluation criteria, approval workflows, and reporting requirements.',
      },
      {
        type: 'p',
        text: "The RPO firm's recruiters therefore need to adapt to each client's way of working while still being measured on overall recruitment performance.",
      },
      {
        type: 'p',
        text: 'The operational challenge becomes more difficult when each client provides its own recruitment tools or systems.',
      },
      {
        type: 'p',
        text: 'Recruiter activity and candidate information are distributed across multiple platforms, making it difficult for the RPO management team to answer questions such as:',
      },
      {
        type: 'ul',
        items: [
          'How many candidates are being managed for each client?',
          'How many interviews are being conducted?',
          'Which recruiters are performing best across accounts?',
          'What is the candidate conversion rate for each client?',
          'How much platform or AI-assisted usage is each client consuming?',
          'How much effort does each account require to operate?',
          'Is the current RPO contract priced appropriately for the actual workload?',
        ],
      },
      {
        type: 'p',
        text: 'The firm has the recruitment data, but not a consistent operational view across client accounts.',
      },

      { type: 'h2', text: 'The Challenge' },
      {
        type: 'p',
        text: 'The RPO provider needed to balance two competing requirements.',
      },

      { type: 'h3', text: 'Each client needed a customized recruitment process' },
      { type: 'p', text: 'Clients had different:' },
      {
        type: 'ul',
        items: [
          'Hiring stages',
          'Interview processes',
          'Evaluation forms',
          'Recruitment workflows',
          'Reporting expectations',
        ],
      },
      {
        type: 'p',
        text: 'The RPO team could not simply force every client into the same recruitment process.',
      },

      { type: 'h3', text: 'The RPO management team needed consistent visibility' },
      {
        type: 'p',
        text: 'At the same time, leadership needed common metrics to compare recruitment performance across accounts.',
      },
      { type: 'p', text: 'They needed to understand:' },
      {
        type: 'ul',
        items: [
          'Candidate assignments',
          'Candidate joining',
          'Conversion',
          'Recruiter activity',
          'Interview activity',
          'AI-assisted usage',
          'Client workload',
          'Account-level usage',
        ],
      },
      {
        type: 'p',
        text: 'The challenge was finding a way to provide **client-specific workflows without losing centralized operational visibility**.',
      },

      { type: 'h2', text: 'What Moved Onto PyHire' },
      {
        type: 'p',
        text: 'PyHire provided the RPO firm with a centralized recruitment platform where each client could operate within its own isolated workspace.',
      },
      {
        type: 'p',
        text: "Each client became its own tenant, allowing the RPO provider to configure the recruitment environment according to that client's requirements.",
      },
      { type: 'p', text: 'This created a model where:' },
      {
        type: 'p',
        text: '**Different clients could work differently, while the RPO provider could still manage them from one underlying platform.**',
      },

      { type: 'h2', text: 'Client-Specific Recruitment Workflows' },
      {
        type: 'p',
        text: 'Each client could have its own recruitment process, including its own interview stages and evaluation forms.',
      },
      { type: 'p', text: 'For example, one client could use:' },
      {
        type: 'p',
        text: '**Screening → Technical Interview → HR Interview → Management Round → Offer**',
      },
      { type: 'p', text: 'while another client could use:' },
      {
        type: 'p',
        text: '**Application Review → Assessment → Panel Interview → Final Interview → Offer**',
      },
      {
        type: 'p',
        text: 'The underlying recruitment platform does not need to force both clients into the same stage structure.',
      },
      {
        type: 'p',
        text: "Instead, the RPO team can configure the workflow according to the client's actual hiring process.",
      },
      {
        type: 'p',
        text: "This allows recruiters to work according to each client's requirements without maintaining a completely separate recruitment system for every account.",
      },

      { type: 'h2', text: 'Tenant-Based Client Management' },
      { type: 'p', text: 'Each client operates within its own tenant or isolated workspace.' },
      {
        type: 'p',
        text: 'This allows the RPO provider to maintain separation between client environments while managing recruitment operations through the same platform.',
      },
      { type: 'p', text: 'Client-specific configurations can include:' },
      {
        type: 'ul',
        items: [
          'Recruitment stages',
          'Evaluation forms',
          'Users',
          'Candidate workflows',
          'Reporting views',
          'Applicable platform settings',
        ],
      },
      {
        type: 'p',
        text: 'This approach is particularly useful for RPO providers managing several clients simultaneously.',
      },
      {
        type: 'p',
        text: 'Instead of creating a completely new technology environment for every client, a new account can be configured within the existing recruitment platform.',
      },

      { type: 'h2', text: 'Consistent Recruitment Analytics Across Different Clients' },
      {
        type: 'p',
        text: "Although each client's hiring workflow may look different, the RPO management team still needs a common way to evaluate recruitment performance.",
      },
      {
        type: 'p',
        text: 'PyHire can provide common recruitment metrics across client accounts, allowing RPO leaders to compare performance using consistent underlying measures.',
      },
      { type: 'p', text: 'Examples include:' },
      {
        type: 'ul',
        items: [
          'Candidates assigned',
          'Candidates progressed',
          'Candidates joined',
          'Conversion rates',
          'Recruiter activity',
          'Interview activity',
        ],
      },
      { type: 'p', text: 'This creates an important distinction:' },
      {
        type: 'p',
        text: '**The process can be customized, while the performance view remains consistent.**',
      },
      {
        type: 'p',
        text: 'An RPO manager can therefore evaluate recruiter and account performance without requiring every client to follow the exact same hiring workflow.',
      },

      { type: 'h2', text: 'Making Platform Usage Visible' },
      {
        type: 'p',
        text: 'For an RPO provider, recruitment performance is only one part of account management.',
      },
      {
        type: 'p',
        text: 'Usage can also influence the actual cost of delivering recruitment services.',
      },
      {
        type: 'p',
        text: 'If different clients consume different levels of recruitment activity or AI-assisted functionality, understanding that usage can help the RPO provider evaluate the operational demands of each account.',
      },
      {
        type: 'p',
        text: 'With tenant-level usage visibility, the firm can monitor applicable platform consumption, including configured AI-parse quotas.',
      },
      {
        type: 'p',
        text: 'This provides a more structured basis for understanding how individual client accounts use the recruitment platform.',
      },
      {
        type: 'p',
        text: 'Instead of estimating account usage based on assumptions, the RPO team can use available platform-level information to support operational and commercial discussions.',
      },

      { type: 'h2', text: 'Supporting More Informed RPO Pricing' },
      {
        type: 'p',
        text: 'RPO contracts are often influenced by the level of recruitment activity required to support a client.',
      },
      {
        type: 'p',
        text: 'If one account requires significantly more candidate processing, recruiter activity, interviews, or platform usage than another, the cost of servicing those accounts may also differ.',
      },
      {
        type: 'p',
        text: 'Having account-level operational and usage information can help RPO providers evaluate questions such as:',
      },
      {
        type: 'ul',
        items: [
          'Is the current contract aligned with the workload?',
          'Which accounts require more recruiter capacity?',
          'Which clients consume more platform resources?',
          'How does usage compare between accounts?',
          'Where are operational costs increasing?',
        ],
      },
      {
        type: 'p',
        text: 'This does not automatically determine contract pricing or profitability, but it gives the RPO provider better information with which to make those decisions.',
      },

      { type: 'h2', text: 'Onboarding a New RPO Client' },
      {
        type: 'p',
        text: 'Adding a new RPO client traditionally can involve introducing another recruitment system, learning another workflow, configuring reports, and establishing new processes for recruiters.',
      },
      {
        type: 'p',
        text: 'With a tenant-based recruitment platform, onboarding can instead involve configuring a new client workspace within the existing environment.',
      },
      { type: 'p', text: "The RPO team can define the client's:" },
      {
        type: 'ul',
        items: [
          'Hiring stages',
          'Evaluation forms',
          'Users',
          'Recruitment workflow',
          'Reporting requirements',
        ],
      },
      {
        type: 'p',
        text: 'Recruiters can then operate within the configured environment while continuing to use the same underlying recruitment platform.',
      },
      {
        type: 'p',
        text: 'This creates a more repeatable approach to onboarding new RPO accounts.',
      },

      { type: 'h2', text: 'What Changed, Directionally' },
      {
        type: 'p',
        text: 'Moving from separate client systems toward a tenant-based recruitment platform changes how the RPO provider can manage its accounts.',
      },
      { type: 'h3', text: 'Client-specific processes remain flexible' },
      {
        type: 'p',
        text: 'Each client can have its own recruitment stages, evaluation forms, and workflows instead of being forced into one standardized process.',
      },
      { type: 'h3', text: 'Recruiter performance becomes easier to compare' },
      {
        type: 'p',
        text: 'Common analytics provide a consistent basis for evaluating recruitment activity and outcomes across different client accounts.',
      },
      { type: 'h3', text: 'Account-level usage becomes more visible' },
      {
        type: 'p',
        text: 'Tenant-level usage information can help RPO management understand how recruitment activity and platform consumption vary between clients.',
      },
      { type: 'h3', text: 'New client onboarding becomes more repeatable' },
      {
        type: 'p',
        text: 'A new account can be configured within the existing platform rather than requiring the RPO team to introduce an entirely separate recruitment system.',
      },
      { type: 'h3', text: 'Management gains a consolidated view' },
      {
        type: 'p',
        text: 'RPO leadership can maintain a broader view of multiple client operations while recruiters continue working within client-specific environments.',
      },

      { type: 'h2', text: 'Why Multi-Client Recruitment Management Matters for RPO Firms' },
      { type: 'p', text: 'RPO providers have a unique operational challenge.' },
      {
        type: 'p',
        text: "They are responsible for delivering recruitment services according to each client's requirements while simultaneously managing their own workforce, performance, technology, and commercial operations.",
      },
      {
        type: 'p',
        text: 'A recruitment process that works for one client may not work for another.',
      },
      {
        type: 'p',
        text: 'The technology therefore needs to support two things at the same time:',
      },
      { type: 'p', text: '**Flexibility for the client.**' },
      { type: 'p', text: '**Consistency for the RPO provider.**' },
      {
        type: 'p',
        text: 'A tenant-based recruitment platform can provide that balance by allowing individual client environments to remain configurable while maintaining common reporting and operational visibility at the platform level.',
      },

      { type: 'h2', text: 'The Underlying Lesson' },
      {
        type: 'p',
        text: "For an RPO provider, the challenge isn't simply running one hiring process well.",
      },
      {
        type: 'p',
        text: 'It is running several different hiring processes at the same time without losing visibility into performance, workload, usage, and account operations.',
      },
      {
        type: 'p',
        text: 'Client-specific recruitment workflows are important because every organization has different hiring requirements.',
      },
      {
        type: 'p',
        text: 'But centralized analytics and tenant-level visibility are equally important because the RPO provider needs to understand how its overall operation is performing.',
      },
      {
        type: 'p',
        text: 'By combining **tenant-isolated client workspaces, configurable recruitment workflows, common analytics, and usage visibility**, PyHire is designed to help RPO and managed-hiring providers manage multiple client recruitment operations through one underlying platform.',
      },
      {
        type: 'p',
        text: 'The result is not about making every client work the same way.',
      },
      {
        type: 'p',
        text: 'It is about allowing every client to **work their own way while giving the RPO provider a consistent view of the business.**',
      },

      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'h3', text: 'What is RPO software?' },
      {
        type: 'p',
        text: 'RPO software is a recruitment technology platform designed to support Recruitment Process Outsourcing providers in managing candidate workflows, recruiters, client accounts, hiring processes, reporting, and recruitment operations.',
      },
      { type: 'h3', text: 'How can RPO software manage multiple clients?' },
      {
        type: 'p',
        text: 'RPO software can use separate client workspaces or tenant environments to keep client-specific users, workflows, recruitment stages, and reporting separated while allowing the RPO provider to manage multiple accounts through one underlying platform.',
      },
      { type: 'h3', text: 'Can different RPO clients have different recruitment processes?' },
      {
        type: 'p',
        text: 'Yes. A configurable recruitment platform can allow individual clients to have different hiring stages, interview workflows, evaluation forms, and reporting requirements.',
      },
      { type: 'h3', text: 'How can RPO firms compare recruiter performance across clients?' },
      {
        type: 'p',
        text: 'RPO firms can use common recruitment metrics such as candidates assigned, candidates joined, activity, and conversion rates to compare performance across accounts even when the underlying client workflows differ.',
      },
      { type: 'h3', text: 'Why is usage tracking important for RPO providers?' },
      {
        type: 'p',
        text: 'Usage tracking can help RPO providers understand how recruitment activity and platform consumption vary across client accounts. This information can support workload planning, account management, and commercial discussions.',
      },
      { type: 'h3', text: 'How does tenant-based recruitment software help RPO firms?' },
      {
        type: 'p',
        text: 'Tenant-based recruitment software allows each client to have an isolated recruitment environment while the RPO provider maintains centralized visibility and management across multiple accounts.',
      },

      { type: 'h2', text: 'See How PyHire Can Support Multi-Client Recruitment' },
      {
        type: 'p',
        text: 'Managing multiple RPO accounts does not have to mean managing multiple disconnected recruitment systems.',
      },
      {
        type: 'p',
        text: '**PyHire helps RPO and managed-hiring providers manage client-specific recruitment workflows, recruiter activity, candidate operations, analytics, and platform usage through a centralized recruitment platform.**',
      },
      {
        type: 'p',
        text: '**Explore PyHire** to see how multi-client recruitment management can work within one configurable platform.',
      },
    ],
  },

  {
    slug: 'case-study-05-hiring-manager-visibility',
    title: 'How a Hiring Manager Gained Real-Time Visibility Into the Hiring Pipeline',
    seoTitle: 'Real-Time Hiring Pipeline Visibility',
    subtitle:
      'How PyHire helps hiring managers track requisitions, candidate progress, hiring timelines, and recruitment status without relying on constant recruiter updates.',
    disclaimer:
      'This is an illustrative scenario based on operational challenges commonly experienced by in-house hiring teams. It demonstrates the type of workflow PyHire is designed to support and does not represent results from a specific named customer.',
    excerpt:
      'A hiring manager at a fast-growing product company has four open roles at any given time. The manager needs to know where each role stands, but the only way to get an update is to message the recruiter responsible for the position.',
    segment: 'In-House Hiring Teams',
    image:
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'A hiring manager reviewing a live requisition timeline on screen',
    body: [
      { type: 'h2', text: 'The Starting Point' },
      {
        type: 'p',
        text: 'A hiring manager at a fast-growing product company has four open roles at any given time.',
      },
      {
        type: 'p',
        text: 'The manager needs to know where each role stands, but the only way to get an update is to message the recruiter responsible for the position.',
      },
      { type: 'p', text: 'A typical question might be:' },
      { type: 'quote', text: '"Where are we with the Backend Developer role?"' },
      {
        type: 'p',
        text: 'The recruiter may be busy screening candidates, conducting interviews, coordinating with candidates, or working on other open positions. The response might not arrive until the next morning.',
      },
      { type: 'p', text: 'By then, the situation may have already changed.' },
      {
        type: 'p',
        text: 'A candidate may have been interviewed, an offer may have been initiated, or the role may have stalled because the required candidate pipeline has not been built.',
      },
      {
        type: 'p',
        text: 'The hiring manager has no independent way to see the current status without asking the recruiting team.',
      },

      { type: 'h2', text: 'The Challenge' },
      {
        type: 'p',
        text: 'The hiring manager needed visibility into the recruitment pipeline without having to depend on individual status-update messages.',
      },
      { type: 'p', text: 'The main challenges included:' },
      {
        type: 'ul',
        items: [
          'No centralized view of open requisitions',
          'Dependence on recruiters for status updates',
          'Limited visibility into candidate progress',
          'Difficulty identifying stalled roles',
          'No clear view of target versus committed hiring timelines',
          'Repeated back-and-forth between hiring managers and recruiters',
          'Status information becoming outdated between conversations',
        ],
      },
      {
        type: 'p',
        text: 'The problem was not necessarily that recruiters were failing to communicate.',
      },
      {
        type: 'p',
        text: 'The problem was that **the hiring manager had no direct access to the information they needed.**',
      },

      { type: 'h2', text: 'What Moved Onto PyHire' },
      {
        type: 'p',
        text: 'PyHire introduced a more transparent recruitment workflow where each job requisition could carry a visible hiring timeline.',
      },
      {
        type: 'p',
        text: 'The hiring manager could see the progress of a role through key stages such as:',
      },
      { type: 'p', text: '**Opened → Matched → Interviewed → Offered → Joined**' },
      {
        type: 'p',
        text: 'Instead of asking a recruiter for an update, the hiring manager could check the relevant recruitment information directly.',
      },
      {
        type: 'p',
        text: 'This changed the workflow from **requesting status updates** to **checking the current hiring status when needed**.',
      },

      { type: 'h2', text: 'A Living Hiring Timeline' },
      {
        type: 'p',
        text: 'Each job requisition can provide a view of where the hiring process currently stands.',
      },
      { type: 'p', text: 'For example:' },
      {
        type: 'ol',
        items: [
          '**Role Opened**',
          '**Candidates Matched**',
          '**Interviews Conducted**',
          '**Offer Initiated**',
          '**Candidate Joined**',
        ],
      },
      {
        type: 'p',
        text: 'This gives hiring managers a simple way to understand the current position of a role without having to interpret multiple recruiter messages.',
      },
      {
        type: 'p',
        text: 'If a role is still at the candidate-matching stage after a significant period, the manager can identify the delay earlier.',
      },
      {
        type: 'p',
        text: 'If interviews are underway, the manager can see that the requisition is actively progressing.',
      },
      {
        type: 'p',
        text: 'If an offer has been initiated, the hiring manager has visibility that the role is approaching completion.',
      },

      { type: 'h2', text: 'Role-Aware Recruitment Visibility' },
      {
        type: 'p',
        text: 'Not every person involved in recruitment needs access to the same information.',
      },
      { type: 'p', text: 'Recruiters may need a broad operational view covering:' },
      {
        type: 'ul',
        items: [
          'Multiple requisitions',
          'Candidate pipelines',
          'Recruiter activity',
          'Follow-ups',
          'Interviews',
          'Offers',
          'Candidate documentation',
        ],
      },
      {
        type: 'p',
        text: 'A hiring manager, on the other hand, may primarily need information related to their own roles.',
      },
      {
        type: 'p',
        text: "PyHire's role-aware approach allows the hiring manager to access the recruitment information relevant to their responsibilities without necessarily exposing broader team-level performance information.",
      },
      { type: 'p', text: 'This creates a more focused recruitment experience for each user.' },

      { type: 'h2', text: 'Making Hiring Timelines Visible' },
      {
        type: 'p',
        text: 'One of the most important pieces of information for a hiring manager is whether a role is progressing according to expectations.',
      },
      { type: 'p', text: 'The hiring process may have:' },
      {
        type: 'ul',
        items: [
          'A target hiring date',
          'An internal commitment date',
          'A current recruitment stage',
          'A candidate pipeline',
          'A joining expectation',
        ],
      },
      {
        type: 'p',
        text: 'When these timelines are visible within the recruitment workflow, potential delays can be identified earlier.',
      },
      { type: 'p', text: 'For example:' },
      {
        type: 'ul',
        items: [
          '**Target hiring date:** 15 September',
          '**Internal committed date:** 20 September',
          '**Current stage:** Interview',
          '**Status:** In Progress',
        ],
      },
      {
        type: 'p',
        text: 'The hiring manager can immediately see the relationship between the expected timeline and the current recruitment stage.',
      },
      {
        type: 'p',
        text: 'This is more useful than waiting for someone to explain the status manually.',
      },

      { type: 'h2', text: 'From Status Requests to Self-Service Visibility' },
      {
        type: 'p',
        text: "Before the structured workflow, the hiring manager's process looked like:",
      },
      {
        type: 'p',
        text: '**Hiring Manager → Message Recruiter → Wait for Response → Receive Update → Ask Follow-Up Question**',
      },
      { type: 'p', text: 'With a centralized recruitment workflow, it becomes:' },
      {
        type: 'p',
        text: '**Hiring Manager → Open Dashboard → Check Role Status → Identify Next Action**',
      },
      {
        type: 'p',
        text: 'This does not eliminate communication between hiring managers and recruiters.',
      },
      {
        type: 'p',
        text: 'Instead, it makes routine status communication more efficient by giving both sides access to a shared source of recruitment information.',
      },

      { type: 'h2', text: 'What Changed, Directionally' },
      {
        type: 'p',
        text: 'Moving from recruiter-dependent updates to visible recruitment timelines can change how hiring managers interact with the recruiting team.',
      },
      { type: 'h3', text: 'Status updates become easier to access' },
      {
        type: 'p',
        text: 'Hiring managers can check the current status of their roles without sending a separate message for every update.',
      },
      { type: 'h3', text: 'Recruitment delays become easier to identify' },
      {
        type: 'p',
        text: 'When role progress and hiring timelines are visible, potential slippage can be recognized earlier.',
      },
      { type: 'h3', text: 'Recruiters spend less time answering routine status questions' },
      {
        type: 'p',
        text: 'Recruiters can spend less time responding to repeated "Where are we?" messages and more time working on candidate sourcing, screening, interviews, and follow-ups.',
      },
      { type: 'h3', text: 'Hiring managers gain greater visibility' },
      {
        type: 'p',
        text: 'Managers can see where their requisitions stand without requiring access to broader recruitment-team information.',
      },
      { type: 'h3', text: 'Communication becomes more focused' },
      {
        type: 'p',
        text: 'Instead of spending conversations on basic status updates, hiring managers and recruiters can focus their discussions on decisions, blockers, candidates, and next steps.',
      },

      { type: 'h2', text: 'Why Hiring Pipeline Visibility Matters' },
      { type: 'p', text: 'Recruitment involves multiple stakeholders.' },
      { type: 'p', text: 'A single job requisition may involve:' },
      {
        type: 'ul',
        items: [
          'Hiring managers',
          'Recruiters',
          'Interviewers',
          'HR teams',
          'Candidates',
          'Department leadership',
        ],
      },
      { type: 'p', text: 'Each stakeholder needs different information.' },
      {
        type: 'p',
        text: "When recruitment status exists only inside a recruiter's inbox, spreadsheet, or memory, other stakeholders must constantly request updates.",
      },
      {
        type: 'p',
        text: 'A centralized hiring pipeline gives relevant stakeholders access to the information they need while maintaining appropriate role-based visibility.',
      },
      { type: 'p', text: "The goal isn't to give everyone access to everything." },
      {
        type: 'p',
        text: 'The goal is to make **the right recruitment information available to the right person at the right time.**',
      },

      { type: 'h2', text: 'The Underlying Lesson' },
      {
        type: 'p',
        text: "A lot of friction between hiring managers and recruiters isn't necessarily caused by slow hiring.",
      },
      {
        type: 'p',
        text: 'It can be caused by **limited visibility into the hiring process**.',
      },
      {
        type: 'p',
        text: "A hiring manager who can independently see whether a role is open, matched, being interviewed, offered, or joined doesn't need to rely entirely on messages and meetings for basic status information.",
      },
      {
        type: 'p',
        text: 'That visibility can help reduce unnecessary communication, identify potential delays earlier, and create greater confidence in the recruitment process.',
      },
      {
        type: 'p',
        text: 'With PyHire, the objective is to give hiring teams a shared, structured view of recruitment progress while ensuring each user sees the information relevant to their role.',
      },
      { type: 'p', text: 'Instead of asking:' },
      { type: 'quote', text: '**"What\'s the status of this role?"**' },
      { type: 'p', text: 'the hiring manager can check the answer directly.' },

      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'h3', text: 'How can hiring managers track recruitment progress?' },
      {
        type: 'p',
        text: 'Hiring managers can use a centralized recruitment dashboard to monitor the status of their job requisitions, candidate progress, interviews, offers, and joining stages without relying entirely on manual recruiter updates.',
      },
      { type: 'h3', text: 'What is hiring pipeline management?' },
      {
        type: 'p',
        text: 'Hiring pipeline management is the process of tracking open positions and candidates through different recruitment stages, from requisition creation and candidate matching through interviews, offers, and joining.',
      },
      { type: 'h3', text: 'How does recruitment software improve visibility for hiring managers?' },
      {
        type: 'p',
        text: 'Recruitment software can provide role-specific dashboards that allow hiring managers to view the recruitment information relevant to their positions while maintaining appropriate access controls.',
      },
      { type: 'h3', text: 'How can hiring teams identify recruitment delays?' },
      {
        type: 'p',
        text: 'By comparing the current recruitment stage with target or committed hiring timelines, hiring teams can identify roles that may be progressing slower than expected.',
      },
      { type: 'h3', text: 'Why is real-time recruitment visibility important?' },
      {
        type: 'p',
        text: 'Real-time or frequently updated recruitment visibility helps hiring managers understand the current status of open positions without repeatedly requesting updates from recruiters.',
      },
      { type: 'h3', text: 'Can hiring managers see only their assigned roles?' },
      {
        type: 'p',
        text: 'Role-based recruitment systems can provide users with access to the information relevant to their responsibilities, such as the requisitions or candidates associated with their roles.',
      },

      { type: 'h2', text: 'See How PyHire Can Improve Hiring Pipeline Visibility' },
      {
        type: 'p',
        text: "Hiring managers shouldn't have to chase recruiters for every recruitment update.",
      },
      {
        type: 'p',
        text: '**PyHire provides a structured recruitment workflow that helps teams track requisitions, candidate progress, interviews, offers, joining stages, and hiring timelines from a centralized platform.**',
      },
      {
        type: 'p',
        text: '**Explore PyHire** to see how greater recruitment visibility can help hiring managers and recruiting teams work from the same information.',
      },
    ],
  },

  {
    slug: 'case-study-06-scheduling-noshows',
    title: 'How a Tech-Hiring Team Reduced Interview Scheduling Conflicts and No-Shows',
    seoTitle: 'Preventing Interview Scheduling Conflicts',
    subtitle:
      'How PyHire helps technical hiring teams manage interviewer availability, schedule interviews, track overdue interviews, and streamline feedback through a centralized interview workflow.',
    disclaimer:
      'This is an illustrative scenario based on operational challenges commonly experienced by interview-heavy technical hiring teams. It demonstrates the type of workflow PyHire is designed to support and does not represent results from a specific named customer.',
    excerpt:
      'A technical hiring team conducts a high volume of interviews across multiple stages of the hiring process. With multiple interviewers, candidates, and open positions being coordinated simultaneously, scheduling becomes increasingly difficult.',
    segment: 'Technical Hiring',
    image:
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'A calendar used to coordinate interview panels',
    body: [
      { type: 'h2', text: 'The Starting Point' },
      {
        type: 'p',
        text: 'A technical hiring team conducts a high volume of interviews across multiple stages of the hiring process.',
      },
      { type: 'p', text: 'Candidates may move through:' },
      {
        type: 'ul',
        items: [
          'Phone screening',
          'Technical interviews',
          'Panel interviews',
          'Managerial rounds',
          'Final interviews',
        ],
      },
      {
        type: 'p',
        text: 'With multiple interviewers, candidates, and open positions being coordinated simultaneously, scheduling becomes increasingly difficult.',
      },
      {
        type: 'p',
        text: 'The team manages interview coordination primarily through email and manually created calendar invitations.',
      },
      {
        type: 'p',
        text: 'Double-bookings occur when two interviews are scheduled for overlapping time slots. In many cases, the conflict is discovered only when the candidate joins the meeting and the interviewer is already committed to another interview.',
      },
      { type: 'p', text: 'Other problems emerge after an interview has been scheduled.' },
      {
        type: 'p',
        text: 'An interview may be completed late, rescheduled, or cancelled, but the recruitment record can remain marked as **"Scheduled"** because nobody updates the status.',
      },
      {
        type: 'p',
        text: 'Over time, these outdated records make it difficult to determine which interviews are genuinely upcoming and which require follow-up.',
      },
      {
        type: 'p',
        text: 'Candidates can also end up waiting longer than expected for interview feedback or a hiring decision.',
      },

      { type: 'h2', text: 'The Challenge' },
      {
        type: 'p',
        text: 'The hiring team needed a more structured approach to interview scheduling and follow-up.',
      },
      { type: 'p', text: 'The main challenges included:' },
      {
        type: 'ul',
        items: [
          'Multiple interview rounds across different panels',
          'Manual calendar coordination',
          'Interviewer availability being checked separately',
          'Risk of overlapping interview bookings',
          'Difficulty identifying overdue interviews',
          'Interview statuses becoming outdated',
          'Feedback being buried in emails or separate communication',
          'Delays in communicating interview outcomes to candidates',
        ],
      },
      { type: 'p', text: "The problem wasn't simply finding an available time." },
      {
        type: 'p',
        text: 'The bigger challenge was maintaining **one reliable view of interview availability, scheduled interviews, interview status, and feedback.**',
      },

      { type: 'h2', text: 'What Moved Onto PyHire' },
      {
        type: 'p',
        text: 'PyHire introduced a centralized interview scheduling and management workflow.',
      },
      {
        type: 'p',
        text: 'Interviewer availability became visible during the scheduling process, allowing recruiters to identify suitable time slots before confirming an interview.',
      },
      {
        type: 'p',
        text: 'Overlapping bookings could be blocked rather than simply flagged, helping prevent scheduling conflicts before they were confirmed.',
      },
      {
        type: 'p',
        text: 'For video interviews, meeting links could also be generated as part of the scheduling workflow.',
      },
      {
        type: 'p',
        text: 'Interviewers received a focused workspace showing the interviews relevant to them, including upcoming and overdue interviews.',
      },
      {
        type: 'p',
        text: 'This gave interviewers a clear view of what required their attention without requiring them to search through multiple email threads or calendar invitations.',
      },

      { type: 'h2', text: 'Interviewer Availability and Conflict Prevention' },
      {
        type: 'p',
        text: 'One of the biggest scheduling challenges in technical recruitment is coordinating multiple interviewers.',
      },
      { type: 'p', text: 'A candidate may need to meet:' },
      {
        type: 'ul',
        items: [
          'A technical interviewer',
          'A hiring manager',
          'A panel',
          'An HR representative',
          'A subject-matter expert',
        ],
      },
      { type: 'p', text: 'Each person may have a different schedule.' },
      {
        type: 'p',
        text: 'If availability is checked manually, there is a greater opportunity for overlapping bookings or incorrect scheduling.',
      },
      {
        type: 'p',
        text: 'With PyHire, interviewer availability can be surfaced during scheduling.',
      },
      {
        type: 'p',
        text: 'If an existing booking conflicts with a proposed time slot, the system can prevent the overlapping interview from being confirmed.',
      },
      { type: 'p', text: 'This changes the workflow from:' },
      { type: 'p', text: '**Book → Discover conflict → Reschedule**' },
      { type: 'p', text: 'to:' },
      { type: 'p', text: '**Check availability → Select valid slot → Confirm interview**' },

      { type: 'h2', text: 'Automated Video Interview Links' },
      { type: 'p', text: 'Technical hiring often involves remote interviews.' },
      {
        type: 'p',
        text: 'Creating and sharing meeting links manually for every interview adds another administrative step and creates opportunities for incorrect or missing links.',
      },
      {
        type: 'p',
        text: 'With PyHire, video interview links can be generated as part of the scheduling workflow.',
      },
      {
        type: 'p',
        text: 'This allows the interview invitation and meeting information to remain connected to the scheduled interview rather than requiring interviewers or recruiters to create and distribute meeting links separately.',
      },

      { type: 'h2', text: 'A Dedicated Interviewer Workspace' },
      {
        type: 'p',
        text: "Interviewers don't need to see every recruitment activity happening across the organization.",
      },
      { type: 'p', text: 'They primarily need to know:' },
      {
        type: 'ul',
        items: [
          'Which interviews are coming up?',
          'Which interviews are overdue?',
          'Which candidates need feedback?',
          'Which interviews require their action?',
        ],
      },
      {
        type: 'p',
        text: 'PyHire provides an interviewer-focused workspace that surfaces the interviews relevant to the individual interviewer.',
      },
      {
        type: 'p',
        text: 'This creates a more focused experience and reduces the need to search through email conversations and calendar invitations.',
      },

      { type: 'h2', text: 'Automatically Surfacing Overdue Interviews' },
      {
        type: 'p',
        text: 'A scheduled interview that has already passed should not remain invisible in the recruitment workflow.',
      },
      { type: 'p', text: 'For example:' },
      {
        type: 'ul',
        items: [
          '**Interview:** Technical Round',
          '**Scheduled:** 10:00 AM',
          '**Current Status:** Scheduled',
          '**Time:** 2:00 PM',
        ],
      },
      {
        type: 'p',
        text: 'The interview has already passed, but its status has not been updated.',
      },
      {
        type: 'p',
        text: 'Instead of relying on someone to notice the discrepancy manually, PyHire can identify past-due interviews that remain marked as **"Scheduled"** and surface them for attention.',
      },
      {
        type: 'p',
        text: 'This helps recruiters and interviewers identify interviews that may require:',
      },
      {
        type: 'ul',
        items: [
          'Status updates',
          'Feedback',
          'Rescheduling',
          'Candidate communication',
          'Internal follow-up',
        ],
      },

      { type: 'h2', text: 'Faster Interview Feedback' },
      {
        type: 'p',
        text: 'Interview feedback is an important part of the candidate journey.',
      },
      {
        type: 'p',
        text: 'When feedback is scattered across email threads, messages, or separate documents, recruiters may need to chase interviewers for responses.',
      },
      {
        type: 'p',
        text: 'A focused interviewer workspace provides direct access to relevant interviews and feedback actions.',
      },
      { type: 'p', text: 'Instead of:' },
      {
        type: 'p',
        text: '**Interview → Search email → Find candidate → Find feedback request → Submit feedback**',
      },
      { type: 'p', text: 'the workflow becomes:' },
      {
        type: 'p',
        text: '**Open interview workspace → Select interview → Submit feedback**',
      },
      {
        type: 'p',
        text: 'Reducing unnecessary steps can make feedback collection more straightforward for interviewers.',
      },

      { type: 'h2', text: 'What Changed, Directionally' },
      {
        type: 'p',
        text: 'Moving from manual interview coordination to a structured interview workflow can create several operational improvements.',
      },
      { type: 'h3', text: 'Scheduling conflicts become easier to prevent' },
      {
        type: 'p',
        text: 'Interviewer availability can be checked before confirming a slot, while overlapping bookings can be blocked according to the configured scheduling rules.',
      },
      { type: 'h3', text: 'Overdue interviews become visible' },
      {
        type: 'p',
        text: 'Interviews that have passed their scheduled time while remaining in a scheduled state can be surfaced for attention.',
      },
      { type: 'h3', text: 'Interviewer workflows become more focused' },
      {
        type: 'p',
        text: 'Interviewers can see their relevant upcoming and overdue interviews without searching across multiple communication channels.',
      },
      { type: 'h3', text: 'Feedback collection becomes more accessible' },
      {
        type: 'p',
        text: 'Interviewers can access feedback actions directly from their interview workspace rather than relying on email reminders.',
      },
      { type: 'h3', text: 'Video interview coordination becomes simpler' },
      {
        type: 'p',
        text: 'Meeting links can be generated as part of the scheduling workflow, keeping the interview and its virtual meeting information connected.',
      },
      { type: 'h3', text: 'Candidate communication can become more consistent' },
      {
        type: 'p',
        text: 'When scheduling, interview status, and feedback are easier for the recruitment team to track, candidates are less likely to be left waiting because an interview or decision has been overlooked.',
      },

      { type: 'h2', text: 'Why Interview Management Matters in Technical Hiring' },
      {
        type: 'p',
        text: 'Technical hiring often involves multiple interview stages and specialized interviewers.',
      },
      {
        type: 'p',
        text: 'A single candidate may interact with several people before a hiring decision is made.',
      },
      { type: 'p', text: 'That creates multiple opportunities for operational issues:' },
      {
        type: 'ul',
        items: [
          'Interviewer scheduling conflicts',
          'Missed interviews',
          'Delayed feedback',
          'Outdated interview statuses',
          'Rescheduling',
          'Candidate communication gaps',
        ],
      },
      {
        type: 'p',
        text: 'A centralized interview management workflow helps connect these activities.',
      },
      {
        type: 'p',
        text: 'Instead of treating scheduling, interviews, feedback, and candidate status as separate tasks, the recruitment team can manage them as connected parts of the same hiring process.',
      },

      { type: 'h2', text: 'The Candidate Experience Connection' },
      { type: 'p', text: 'Candidates may never see the internal recruitment system.' },
      { type: 'p', text: 'But they experience its outcomes directly.' },
      { type: 'p', text: 'They notice when:' },
      {
        type: 'ul',
        items: [
          'An interviewer is unavailable at the scheduled time',
          'An interview needs to be rescheduled unexpectedly',
          'A meeting link is missing',
          'Feedback takes too long',
          'A promised update never arrives',
        ],
      },
      {
        type: 'p',
        text: 'These moments can influence how candidates perceive the organization.',
      },
      {
        type: 'p',
        text: 'By structuring interview scheduling, status tracking, and feedback collection, PyHire is designed to help recruitment teams reduce avoidable coordination problems and create a more consistent candidate experience.',
      },

      { type: 'h2', text: 'The Underlying Lesson' },
      {
        type: 'p',
        text: 'Interview scheduling problems are rarely caused simply by a lack of interviewer availability.',
      },
      {
        type: 'p',
        text: 'The bigger challenge is often the absence of a **single, shared source of truth** for interviewer availability, scheduled interviews, interview status, and feedback.',
      },
      {
        type: 'p',
        text: 'When recruiters have to manually cross-check calendars, email threads, and recruitment records, scheduling conflicts and missed follow-ups become easier to overlook.',
      },
      {
        type: 'p',
        text: 'By connecting **interviewer availability, interview scheduling, meeting links, interview status, overdue interviews, and feedback** within one recruitment workflow, PyHire is designed to make interview coordination more structured and visible.',
      },
      { type: 'p', text: "The goal isn't simply to schedule more interviews." },
      {
        type: 'p',
        text: "It is to help recruitment teams **schedule the right interviews, keep them on track, and make sure the next action doesn't get lost.**",
      },

      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'h3', text: 'How can recruitment teams prevent interview scheduling conflicts?' },
      {
        type: 'p',
        text: 'Recruitment teams can use interview scheduling software that checks interviewer availability before confirming a time slot and prevents overlapping bookings according to configured scheduling rules.',
      },
      { type: 'h3', text: 'What is interview scheduling software?' },
      {
        type: 'p',
        text: 'Interview scheduling software helps recruitment teams coordinate interviewer availability, candidate appointments, interview stages, meeting links, and scheduling information through a centralized workflow.',
      },
      { type: 'h3', text: 'How can recruiters identify overdue interviews?' },
      {
        type: 'p',
        text: 'A recruitment platform can identify interviews whose scheduled time has passed while their status remains unchanged, allowing recruiters to review and update them.',
      },
      { type: 'h3', text: 'How can interview software improve feedback collection?' },
      {
        type: 'p',
        text: 'Interview management software can provide interviewers with a dedicated workspace where they can view relevant interviews and submit feedback directly, reducing reliance on email reminders.',
      },
      { type: 'h3', text: 'Why is interview scheduling important for candidate experience?' },
      {
        type: 'p',
        text: 'Accurate scheduling, reliable meeting information, timely feedback, and clear communication can help reduce avoidable friction during the candidate journey.',
      },
      { type: 'h3', text: 'Can interview scheduling software support technical hiring?' },
      {
        type: 'p',
        text: 'Yes. Interview scheduling software can support multi-stage technical hiring processes involving phone screens, technical rounds, panel interviews, managerial rounds, and final interviews.',
      },

      { type: 'h2', text: 'See How PyHire Can Simplify Interview Management' },
      {
        type: 'p',
        text: "Managing multiple interviewers, candidates, and hiring stages doesn't have to mean managing disconnected calendars and email threads.",
      },
      {
        type: 'p',
        text: '**PyHire helps recruitment teams manage interviewer availability, interview scheduling, meeting links, interview status, overdue interviews, and feedback through a structured recruitment workflow.**',
      },
      {
        type: 'p',
        text: '**Explore PyHire** to see how a centralized interview management process can help your hiring team keep interviews moving and candidates informed.',
      },
    ],
  },

  {
    slug: 'case-study-07-whatsapp-response-rates',
    title: 'How a Recruiting Agency Improved Candidate Response With WhatsApp',
    seoTitle: 'WhatsApp Recruitment for Candidate Response',
    subtitle:
      'How PyHire helps recruiting teams use WhatsApp, email, and SMS to communicate with candidates while keeping conversations connected to a centralized recruitment workflow.',
    disclaimer:
      'This is an illustrative scenario based on operational challenges commonly experienced by recruiting teams managing high-volume candidate communication. It demonstrates the type of workflow PyHire is designed to support and does not represent results from a specific named customer.',
    excerpt:
      'A recruiting agency manages a large volume of candidates across multiple open positions. Recruiters primarily communicate with candidates through email and phone calls. While these channels remain important, candidate engagement can vary significantly.',
    segment: 'High-Volume Recruiting',
    image:
      'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'A phone and laptop side by side showing candidate messaging threads',
    body: [
      { type: 'h2', text: 'The Starting Point' },
      {
        type: 'p',
        text: 'A recruiting agency manages a large volume of candidates across multiple open positions.',
      },
      {
        type: 'p',
        text: 'Recruiters primarily communicate with candidates through email and phone calls.',
      },
      {
        type: 'p',
        text: 'While these channels remain important, candidate engagement can vary significantly.',
      },
      {
        type: 'p',
        text: 'Some candidates check email regularly. Others may not open their inbox until later in the day or may not see an important recruitment message at all.',
      },
      {
        type: 'p',
        text: 'This becomes particularly challenging for high-volume hiring, where recruiters may need to contact hundreds of candidates about:',
      },
      {
        type: 'ul',
        items: [
          'Interview schedules',
          'Job opportunities',
          'Document requirements',
          'Interview confirmations',
          'Offer updates',
          'Joining information',
          'Follow-ups',
        ],
      },
      {
        type: 'p',
        text: 'Recruiters had started using WhatsApp informally to reach candidates faster.',
      },
      {
        type: 'p',
        text: 'However, those conversations were taking place through personal phones.',
      },
      {
        type: 'p',
        text: 'Candidate replies were therefore outside the recruitment system, making it difficult for other team members to see conversations, continue follow-ups, or understand the latest candidate status.',
      },
      {
        type: 'p',
        text: 'The agency had effectively created a new communication channel without creating a structured way to manage it.',
      },

      { type: 'h2', text: 'The Challenge' },
      {
        type: 'p',
        text: 'The recruiting team needed to reach candidates through channels they were more likely to check while maintaining centralized visibility and control over candidate communication.',
      },
      { type: 'p', text: 'The main challenges included:' },
      {
        type: 'ul',
        items: [
          'Inconsistent email engagement',
          'High volumes of candidate communication',
          'Manual WhatsApp conversations from personal devices',
          'Candidate replies being disconnected from recruitment records',
          'Lack of shared visibility into conversations',
          'Difficulty maintaining communication continuity when recruiters were unavailable',
          'Manual document-request messages',
          'Risk of candidate conversations existing outside company systems',
        ],
      },
      {
        type: 'p',
        text: 'The problem was not simply choosing between email, phone, or WhatsApp.',
      },
      { type: 'p', text: 'The bigger challenge was:' },
      {
        type: 'p',
        text: '**How can recruiters communicate through the right channel without losing control of the conversation?**',
      },

      { type: 'h2', text: 'What Moved Onto PyHire' },
      {
        type: 'p',
        text: 'PyHire brought WhatsApp into the recruitment workflow as a structured communication channel alongside email and SMS.',
      },
      {
        type: 'p',
        text: 'Instead of recruiters using personal WhatsApp accounts, candidate communication could be handled through a configured business account associated with the relevant tenant.',
      },
      {
        type: 'p',
        text: 'This created a more centralized approach to candidate communication.',
      },
      {
        type: 'p',
        text: "Recruiters could use WhatsApp for common recruitment interactions while keeping candidate conversations connected to the candidate's recruitment record.",
      },

      { type: 'h2', text: 'WhatsApp as a Recruitment Communication Channel' },
      {
        type: 'p',
        text: 'Candidates can receive recruitment communication through WhatsApp for appropriate hiring touchpoints.',
      },
      { type: 'p', text: 'Common examples include:' },
      {
        type: 'ul',
        items: [
          'Interview confirmations',
          'Interview reminders',
          'Document requests',
          'Offer follow-ups',
          'Joining communication',
          'Recruitment status updates',
        ],
      },
      {
        type: 'p',
        text: 'This gives recruiters another channel for communicating with candidates instead of relying exclusively on email and phone calls.',
      },
      {
        type: 'p',
        text: 'For high-volume recruitment, having multiple communication channels can help teams match their outreach method to the candidate and recruitment workflow.',
      },

      { type: 'h2', text: 'Business WhatsApp Instead of Personal Numbers' },
      {
        type: 'p',
        text: 'One of the biggest operational changes is moving candidate communication away from personal recruiter phones.',
      },
      { type: 'p', text: 'Personal-device communication creates several problems.' },
      {
        type: 'p',
        text: 'When a recruiter leaves the organization, changes roles, or becomes unavailable, important candidate conversations may remain on their device.',
      },
      { type: 'p', text: 'Other recruiters may not know:' },
      {
        type: 'ul',
        items: [
          'What was communicated',
          'When the candidate last replied',
          'What documents were requested',
          'Whether an interview was confirmed',
          'What the next action should be',
        ],
      },
      {
        type: 'p',
        text: 'Using a business communication channel connected to the recruitment workflow provides greater continuity.',
      },
      {
        type: 'p',
        text: "The conversation belongs to the recruitment process rather than to an individual recruiter's personal phone.",
      },

      { type: 'h2', text: 'Shared Candidate Conversations' },
      {
        type: 'p',
        text: "Candidate replies can be connected to the candidate's recruitment record and made visible to authorized team members.",
      },
      { type: 'p', text: 'This changes the communication workflow from:' },
      {
        type: 'p',
        text: "**Candidate → Recruiter's Personal WhatsApp → Recruiter**",
      },
      { type: 'p', text: 'to:' },
      {
        type: 'p',
        text: '**Candidate → Business WhatsApp → Shared Recruitment Record → Authorized Recruitment Team**',
      },
      {
        type: 'p',
        text: 'If a recruiter is unavailable, another authorized team member can review the conversation and continue the recruitment process.',
      },
      {
        type: 'p',
        text: "This can reduce dependency on a single recruiter's personal communication history.",
      },

      { type: 'h2', text: 'Reusable WhatsApp Templates' },
      {
        type: 'p',
        text: 'Recruiters frequently send similar messages to large numbers of candidates.',
      },
      { type: 'p', text: 'Examples include:' },
      { type: 'p', text: '**Interview Confirmation**' },
      {
        type: 'quote',
        text: 'Your interview for the [Role] position is scheduled for [Date] at [Time].',
      },
      { type: 'p', text: '**Document Request**' },
      {
        type: 'quote',
        text: 'Please share the required documents to proceed with your application for the [Role] position.',
      },
      { type: 'p', text: '**Offer Follow-Up**' },
      {
        type: 'quote',
        text: 'We are following up regarding your offer for the [Role] position. Please let us know if you have any questions.',
      },
      {
        type: 'p',
        text: 'Using reusable templates can help recruiters maintain consistency across common candidate communication scenarios.',
      },
      {
        type: 'p',
        text: 'Templates can also reduce the time spent repeatedly writing similar messages.',
      },

      { type: 'h2', text: 'Status-Triggered Candidate Communication' },
      {
        type: 'p',
        text: "Recruitment communication becomes more useful when it is connected to the candidate's current hiring stage.",
      },
      { type: 'p', text: 'For example:' },
      {
        type: 'ol',
        items: [
          '**Candidate Status: Offer Sent • Pending Documentation**',
          '**Trigger Document Request**',
          '**Send WhatsApp Message**',
          '**Candidate Replies**',
          '**Recruiter Reviews Response**',
        ],
      },
      {
        type: 'p',
        text: 'Instead of relying entirely on recruiters to remember when to send every message, status-triggered workflows can initiate appropriate communication based on configured recruitment events.',
      },
      {
        type: 'p',
        text: 'This helps connect candidate communication with the actual recruitment workflow.',
      },

      { type: 'h2', text: 'WhatsApp for Document Collection' },
      {
        type: 'p',
        text: 'Document collection can be a time-consuming part of high-volume recruitment.',
      },
      { type: 'p', text: 'Candidates may need to provide:' },
      {
        type: 'ul',
        items: [
          'Identification documents',
          'Educational certificates',
          'Address information',
          'Employment documents',
          'Other role-specific requirements',
        ],
      },
      {
        type: 'p',
        text: 'A recruiter may otherwise need to manually identify candidates who are waiting for documents and send individual reminders.',
      },
      {
        type: 'p',
        text: 'With status-triggered communication, a document request can be initiated when the candidate reaches the relevant recruitment stage.',
      },
      {
        type: 'p',
        text: 'This creates a more structured process for communicating document requirements and following up with candidates.',
      },

      { type: 'h2', text: 'What Changed, Directionally' },
      {
        type: 'p',
        text: 'Moving WhatsApp communication into a structured recruitment workflow can create several operational improvements.',
      },
      { type: 'h3', text: 'Candidate communication becomes more channel-flexible' },
      {
        type: 'p',
        text: 'Recruiters can use WhatsApp alongside email and SMS rather than depending on a single communication channel.',
      },
      { type: 'h3', text: 'Conversations become easier to access' },
      {
        type: 'p',
        text: "Candidate replies can remain connected to the recruitment record instead of existing only on one recruiter's personal device.",
      },
      { type: 'h3', text: 'Recruiter handovers become easier' },
      {
        type: 'p',
        text: "When conversations are visible to authorized team members, another recruiter can review the candidate's communication history when required.",
      },
      { type: 'h3', text: 'Repetitive communication becomes more efficient' },
      {
        type: 'p',
        text: 'Reusable templates can help recruiters send common recruitment messages without repeatedly creating them from scratch.',
      },
      { type: 'h3', text: 'Document requests can become more timely' },
      {
        type: 'p',
        text: 'Status-triggered workflows can initiate configured document-request messages when candidates reach the relevant stage.',
      },
      { type: 'h3', text: 'Candidate communication becomes more structured' },
      {
        type: 'p',
        text: 'Recruitment conversations become part of the hiring workflow instead of operating as a disconnected communication activity.',
      },

      { type: 'h2', text: 'WhatsApp and the Candidate Experience' },
      {
        type: 'p',
        text: 'Candidates increasingly expect recruitment communication to be convenient and easy to access.',
      },
      {
        type: 'p',
        text: 'For some candidate groups, particularly candidates involved in high-volume or frontline hiring, WhatsApp may be a more frequently checked communication channel than email.',
      },
      {
        type: 'p',
        text: 'However, simply moving recruitment conversations to WhatsApp is not enough.',
      },
      { type: 'p', text: 'The communication also needs to remain:' },
      {
        type: 'ul',
        items: [
          'Relevant',
          'Timely',
          'Consistent',
          'Securely managed',
          'Connected to the candidate record',
        ],
      },
      {
        type: 'p',
        text: 'The objective is therefore not simply to send more WhatsApp messages.',
      },
      {
        type: 'p',
        text: 'It is to use WhatsApp as part of a structured recruitment communication workflow.',
      },

      { type: 'h2', text: 'WhatsApp Recruitment Automation' },
      {
        type: 'p',
        text: 'Recruitment teams can combine WhatsApp communication with workflow automation to reduce repetitive manual activities.',
      },
      { type: 'p', text: 'A typical workflow might look like:' },
      {
        type: 'ol',
        items: [
          '**Candidate enters recruitment stage**',
          '**PyHire identifies configured trigger**',
          '**WhatsApp template is selected**',
          '**Message is sent through the configured business account**',
          '**Candidate replies**',
          '**Conversation is associated with the candidate record**',
          '**Recruiter takes the next action**',
        ],
      },
      { type: 'p', text: 'This connects communication directly with recruitment operations.' },

      { type: 'h2', text: 'Centralized Communication Across Multiple Channels' },
      {
        type: 'p',
        text: 'WhatsApp does not need to replace every other recruitment communication channel.',
      },
      {
        type: 'p',
        text: 'Different candidates and situations may require different channels.',
      },
      { type: 'p', text: 'A recruitment team may use:' },
      {
        type: 'ul',
        items: [
          '**WhatsApp** for quick candidate communication and reminders.',
          '**Email** for formal communication and detailed information.',
          '**SMS** for concise notifications and alerts.',
          '**Phone** for conversations requiring direct interaction.',
        ],
      },
      {
        type: 'p',
        text: 'The value comes from managing these communication channels within a connected recruitment workflow rather than treating each channel as a separate system.',
      },

      { type: 'h2', text: 'The Compliance and Continuity Perspective' },
      {
        type: 'p',
        text: 'Candidate communication can contain sensitive recruitment information.',
      },
      {
        type: 'p',
        text: 'When conversations happen through personal devices, organizations may have less visibility and control over how those conversations are retained, accessed, or handed over.',
      },
      {
        type: 'p',
        text: 'Moving candidate communication into a business-controlled workflow can help organizations establish clearer ownership and continuity.',
      },
      {
        type: 'p',
        text: 'However, WhatsApp integration by itself does not guarantee legal or regulatory compliance.',
      },
      {
        type: 'p',
        text: 'Organizations should still configure their communication processes, access controls, retention policies, consent mechanisms, and data handling practices according to their applicable legal and regulatory requirements.',
      },
      {
        type: 'p',
        text: 'The goal is to make candidate communication more controlled and auditable rather than leaving important recruitment conversations on personal devices.',
      },

      { type: 'h2', text: 'The Underlying Lesson' },
      { type: 'p', text: 'Channel choice is more than a communication preference.' },
      {
        type: 'p',
        text: 'It can influence how quickly candidates see messages, how easily recruiters receive responses, and how effectively a recruitment team can continue a conversation.',
      },
      { type: 'p', text: 'But the channel is only one part of the equation.' },
      {
        type: 'p',
        text: 'A WhatsApp message sent from a personal phone may be fast, but it can create continuity and visibility problems.',
      },
      {
        type: 'p',
        text: 'A WhatsApp conversation connected to a structured recruitment workflow can provide a different model:',
      },
      { type: 'p', text: '**The candidate gets a convenient communication channel.**' },
      { type: 'p', text: '**The recruiter gets a structured workflow.**' },
      { type: 'p', text: '**The organization gets greater visibility into the conversation.**' },
      {
        type: 'p',
        text: 'PyHire is designed to bring WhatsApp, email, SMS, candidate records, and recruitment workflows together so that candidate communication becomes part of the hiring process rather than a separate activity happening outside it.',
      },
      { type: 'p', text: "The objective isn't simply to send more messages." },
      {
        type: 'p',
        text: 'It is to **reach candidates through the right channel while keeping the conversation connected to the recruitment process.**',
      },

      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'h3', text: 'How can WhatsApp improve recruitment communication?' },
      {
        type: 'p',
        text: 'WhatsApp can provide recruiting teams with an additional communication channel for interview confirmations, reminders, document requests, offer follow-ups, and other candidate interactions. Its effectiveness depends on candidate preferences, message relevance, timing, and the recruitment workflow.',
      },
      { type: 'h3', text: 'What is WhatsApp recruitment software?' },
      {
        type: 'p',
        text: 'WhatsApp recruitment software connects WhatsApp-based candidate communication with recruitment workflows and candidate records, allowing recruiters to manage conversations as part of the hiring process.',
      },
      { type: 'h3', text: 'Can recruiters use WhatsApp to send interview confirmations?' },
      {
        type: 'p',
        text: 'Yes. Recruitment teams can use configured WhatsApp templates and workflows to send interview confirmations and other candidate notifications, subject to the applicable WhatsApp Business requirements and organizational policies.',
      },
      { type: 'h3', text: 'How can recruiters manage WhatsApp conversations centrally?' },
      {
        type: 'p',
        text: "A recruitment platform can connect candidate WhatsApp conversations to the candidate record so authorized members of the recruitment team can access relevant communication history rather than relying on an individual recruiter's personal phone.",
      },
      { type: 'h3', text: 'Can WhatsApp recruitment workflows automate document requests?' },
      {
        type: 'p',
        text: 'Yes. Where supported and appropriately configured, recruitment workflows can trigger document-request communication when a candidate reaches a specific hiring stage, such as an offer or pre-joining stage.',
      },
      {
        type: 'h3',
        text: 'Why should recruiters avoid managing candidate conversations only from personal WhatsApp accounts?',
      },
      {
        type: 'p',
        text: 'Personal-device communication can make candidate conversations difficult for other team members to access and can create continuity, governance, and data-management challenges when recruiters are unavailable or leave the organization.',
      },
      { type: 'h3', text: 'Can WhatsApp work alongside email and SMS for recruitment?' },
      {
        type: 'p',
        text: "Yes. A multi-channel recruitment workflow can use WhatsApp, email, SMS, and phone communication according to the candidate's situation and the organization's recruitment process.",
      },

      {
        type: 'h2',
        text: 'See How PyHire Can Connect Candidate Communication With Recruitment',
      },
      {
        type: 'p',
        text: "Candidate communication shouldn't live separately from the hiring process.",
      },
      {
        type: 'p',
        text: '**PyHire helps recruiting teams connect WhatsApp, email, SMS, candidate records, templates, and recruitment workflows through a centralized platform.**',
      },
      {
        type: 'p',
        text: '**Explore PyHire** to see how your recruitment team can communicate with candidates through the channels they use while maintaining greater visibility and continuity across the hiring process.',
      },
    ],
  },

  {
    slug: 'case-study-08-enterprise-dashboard',
    title:
      'How an Enterprise Talent Team Reduced Recruitment Reporting Overhead With One Dashboard',
    seoTitle: 'Enterprise Recruitment Analytics Dashboards',
    subtitle:
      'How PyHire helps enterprise talent acquisition teams centralize recruitment analytics, monitor hiring performance, identify stage bottlenecks, and give each role access to the information it needs.',
    disclaimer:
      'This is an illustrative scenario based on operational challenges commonly experienced by enterprise in-house talent acquisition teams. It demonstrates the type of workflow PyHire is designed to support and does not represent results from a specific named customer.',
    excerpt:
      'A large enterprise talent acquisition team manages recruitment across five business units. Each business unit has its own hiring managers, recruiters, and recruiting pods. Every week, recruiters prepare updates for their respective managers.',
    segment: 'Enterprise Talent Acquisition',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'A live analytics dashboard showing hiring performance across teams',
    body: [
      { type: 'h2', text: 'The Starting Point' },
      {
        type: 'p',
        text: 'A large enterprise talent acquisition team manages recruitment across five business units.',
      },
      {
        type: 'p',
        text: 'Each business unit has its own hiring managers, recruiters, and recruiting pods.',
      },
      { type: 'p', text: 'Every week, recruiters prepare updates for their respective managers.' },
      {
        type: 'p',
        text: 'Those managers then consolidate information from their teams and report it to TA leadership.',
      },
      { type: 'p', text: 'The process looks something like:' },
      { type: 'p', text: '**Recruiter → Recruiting Manager → Business Unit → TA Leadership**' },
      {
        type: 'p',
        text: 'At every step, recruitment information is collected, interpreted, reformatted, and passed to the next level.',
      },
      {
        type: 'p',
        text: 'By the time leadership receives the consolidated report, some of the information may already be outdated.',
      },
      {
        type: 'p',
        text: 'A candidate who was awaiting an interview last week may have already progressed.',
      },
      {
        type: 'p',
        text: 'A role that appeared to be on track may have encountered a new bottleneck.',
      },
      {
        type: 'p',
        text: 'A recruiter who appeared to have a large backlog may have already cleared much of it.',
      },
      { type: 'p', text: 'Leadership therefore spends significant time asking:' },
      {
        type: 'ul',
        items: [
          'How many roles are currently open?',
          'How many candidates are in each stage?',
          'Which teams are progressing fastest?',
          'Where are candidates getting stuck?',
          'Which recruiters have the highest workload?',
          'Which hiring stages are exceeding expected timelines?',
          'Which business units require attention?',
        ],
      },
      { type: 'p', text: 'The data exists.' },
      {
        type: 'p',
        text: 'The problem is that **the data has to be manually assembled before leadership can use it.**',
      },

      { type: 'h2', text: 'The Challenge' },
      {
        type: 'p',
        text: 'The enterprise TA team needed a centralized way to monitor recruitment performance without requiring recruiters and managers to repeatedly prepare reports.',
      },
      { type: 'p', text: 'The main challenges included:' },
      {
        type: 'ul',
        items: [
          'Multiple business units with separate recruiting teams',
          'Weekly manual status reporting',
          'Different reporting levels across the organization',
          'Delayed visibility into recruitment performance',
          'Manual consolidation of recruiter updates',
          'Difficulty identifying stage-level bottlenecks',
          'Limited visibility into recruitment SLAs',
          'Time spent preparing reports instead of working on hiring',
        ],
      },
      { type: 'p', text: 'The underlying issue was not a lack of recruitment data.' },
      {
        type: 'p',
        text: 'It was the absence of a **shared, role-aware source of truth**.',
      },

      { type: 'h2', text: 'What Moved Onto PyHire' },
      {
        type: 'p',
        text: "PyHire provided a centralized recruitment analytics workflow where reporting visibility could be aligned with each user's role.",
      },
      {
        type: 'p',
        text: 'Instead of manually preparing separate reports for recruiters, managers, and leadership, the underlying recruitment data could be presented through role-appropriate dashboards.',
      },
      { type: 'p', text: 'This created a structure where:' },
      { type: 'p', text: '**Recruiters see their work.**' },
      { type: 'p', text: '**Managers see their teams.**' },
      { type: 'p', text: '**TA leadership sees the broader recruitment operation.**' },
      {
        type: 'p',
        text: 'Everyone works from the same underlying recruitment data without requiring every user to see information outside their responsibilities.',
      },

      { type: 'h2', text: 'Role-Aware Recruitment Analytics' },
      {
        type: 'p',
        text: 'Different stakeholders need different levels of recruitment information.',
      },

      { type: 'h3', text: 'Recruiters' },
      {
        type: 'p',
        text: 'Recruiters need to focus on their own operational workload, including:',
      },
      {
        type: 'ul',
        items: [
          'Assigned candidates',
          'Candidate progress',
          'Follow-ups',
          'Interviews',
          'Offers',
          'Recruitment activity',
        ],
      },

      { type: 'h3', text: 'Recruiting Managers' },
      { type: 'p', text: 'Managers need a broader view of their recruiting teams.' },
      { type: 'p', text: 'They may need visibility into:' },
      {
        type: 'ul',
        items: [
          'Team candidate activity',
          'Recruiter performance',
          'Candidate conversion',
          'Open requisitions',
          'Hiring progress',
          'Recruitment bottlenecks',
        ],
      },

      { type: 'h3', text: 'TA Leadership' },
      {
        type: 'p',
        text: 'Talent acquisition leadership needs an organization-wide perspective.',
      },
      { type: 'p', text: 'This can include:' },
      {
        type: 'ul',
        items: [
          'Overall recruitment activity',
          'Team performance',
          'Business-unit performance',
          'Candidate conversion',
          'Hiring progress',
          'Stage-level bottlenecks',
          'SLA performance',
        ],
      },
      {
        type: 'p',
        text: 'With role-aware analytics, each stakeholder can access the information relevant to their responsibilities while the underlying data remains consistent.',
      },

      { type: 'h2', text: 'One Dashboard Instead of Multiple Status Reports' },
      {
        type: 'p',
        text: 'Before a centralized dashboard, recruitment reporting may follow a chain like:',
      },
      {
        type: 'ol',
        items: [
          '**Recruiter prepares update**',
          '**Manager reviews update**',
          '**Manager consolidates team data**',
          '**Leadership receives report**',
          '**Leadership asks follow-up questions**',
          '**Manager requests clarification**',
          '**Recruiter provides another update**',
        ],
      },
      { type: 'p', text: 'This process can create significant reporting overhead.' },
      {
        type: 'p',
        text: 'With a centralized recruitment dashboard, the workflow becomes:',
      },
      {
        type: 'ol',
        items: [
          '**Recruitment activity occurs**',
          '**Data is recorded in the platform**',
          '**Dashboards reflect the available data**',
          '**Each stakeholder views their relevant information**',
        ],
      },
      { type: 'p', text: 'The objective is not simply to create another report.' },
      {
        type: 'p',
        text: 'It is to reduce the amount of manual work required to produce the report in the first place.',
      },

      { type: 'h2', text: 'Identifying Recruitment Bottlenecks With Stage SLA Reporting' },
      {
        type: 'p',
        text: "Recruitment performance isn't only about the number of candidates or hires.",
      },
      {
        type: 'p',
        text: 'The time candidates spend in each stage can also reveal operational bottlenecks.',
      },
      { type: 'p', text: 'For example:' },
      {
        type: 'ul',
        items: [
          '**Application Review → 2 days**',
          '**Screening → 4 days**',
          '**Technical Interview → 9 days**',
          '**HR Interview → 2 days**',
        ],
      },
      {
        type: 'p',
        text: 'If the technical interview stage consistently takes significantly longer than other stages, it may indicate a bottleneck that requires attention.',
      },
      {
        type: 'p',
        text: 'Stage SLA reporting can help recruitment leaders identify where candidates are spending longer than expected within the hiring workflow.',
      },
      {
        type: 'p',
        text: 'Instead of discovering the issue during a weekly meeting, the team can use stage-level data to investigate the bottleneck directly.',
      },

      {
        type: 'h2',
        text: 'From "Where Is the Problem?" to "Which Stage Is the Problem?"',
      },
      {
        type: 'p',
        text: 'Traditional status reporting often produces broad statements such as:',
      },
      { type: 'quote', text: '"Engineering hiring is moving slowly."' },
      { type: 'p', text: "That doesn't immediately explain why." },
      { type: 'p', text: 'Stage-level analytics can provide a more specific view:' },
      {
        type: 'quote',
        text: '"Technical interviews in the Engineering pod are exceeding the configured SLA."',
      },
      { type: 'p', text: 'That distinction matters.' },
      {
        type: 'p',
        text: 'A broad status report tells leadership **that** there may be a problem.',
      },
      {
        type: 'p',
        text: 'Stage-level analytics can help identify **where** the problem exists.',
      },
      { type: 'p', text: 'The team can then investigate potential causes such as:' },
      {
        type: 'ul',
        items: [
          'Interviewer availability',
          'Candidate scheduling',
          'Interview feedback delays',
          'Recruiter workload',
          'Approval delays',
          'Candidate availability',
        ],
      },

      { type: 'h2', text: 'A Shared Source of Truth for Recruitment' },
      {
        type: 'p',
        text: 'One of the biggest problems with manually consolidated reporting is that the same candidate or requisition may be interpreted differently at different reporting levels.',
      },
      { type: 'p', text: 'A recruiter may report:' },
      { type: 'quote', text: '"Interview scheduled."' },
      { type: 'p', text: 'A manager may summarize that as:' },
      { type: 'quote', text: '"Candidate progressing."' },
      { type: 'p', text: 'Leadership may then interpret it as:' },
      { type: 'quote', text: '"Role is on track."' },
      {
        type: 'p',
        text: 'But if the interview is actually two weeks away, the role may not be progressing as expected.',
      },
      {
        type: 'p',
        text: 'When stakeholders use the same underlying recruitment data, there is less dependence on manually reinterpreted status updates.',
      },
      {
        type: 'p',
        text: 'The dashboard becomes the common reference point for recruitment information.',
      },

      { type: 'h2', text: 'What Changed, Directionally' },
      {
        type: 'p',
        text: 'Moving from manually consolidated reports to centralized recruitment analytics can create several operational improvements.',
      },
      { type: 'h3', text: 'Reporting becomes more accessible' },
      {
        type: 'p',
        text: 'Recruiters, managers, and TA leadership can access recruitment information through role-appropriate dashboards rather than relying entirely on recurring status reports.',
      },
      { type: 'h3', text: 'Recruitment bottlenecks become more visible' },
      {
        type: 'p',
        text: 'Stage-level SLA reporting can help identify where candidates are spending longer than expected.',
      },
      { type: 'h3', text: 'Data interpretation becomes more consistent' },
      {
        type: 'p',
        text: 'Different management levels can work from the same underlying recruitment information rather than repeatedly rebuilding the same report.',
      },
      { type: 'h3', text: 'Manual reporting work decreases' },
      {
        type: 'p',
        text: 'Recruiters and managers can spend less time preparing recurring status updates and more time on recruitment activities.',
      },
      { type: 'h3', text: 'Leadership gains broader visibility' },
      {
        type: 'p',
        text: 'TA leadership can monitor recruitment performance across teams and business units through centralized analytics.',
      },

      { type: 'h2', text: 'How Recruitment Analytics Supports Enterprise Hiring' },
      { type: 'p', text: 'Enterprise hiring involves multiple levels of decision-making.' },
      { type: 'p', text: 'A recruiter may focus on individual candidates.' },
      { type: 'p', text: 'A recruiting manager may focus on team workload.' },
      { type: 'p', text: 'A business leader may focus on hiring progress.' },
      {
        type: 'p',
        text: 'TA leadership may focus on overall organizational performance.',
      },
      {
        type: 'p',
        text: 'Each perspective is different, but they are all connected to the same recruitment process.',
      },
      {
        type: 'p',
        text: 'A recruitment analytics platform helps connect those perspectives by transforming operational recruitment activity into structured, accessible information.',
      },
      {
        type: 'p',
        text: 'Instead of creating separate reports for every management level, organizations can provide each role with the appropriate view of the same underlying data.',
      },

      { type: 'h2', text: 'Why Stage-Level Analytics Matters' },
      {
        type: 'p',
        text: 'A recruitment funnel can look healthy at a high level while still containing significant bottlenecks.',
      },
      { type: 'p', text: 'For example:' },
      {
        type: 'ol',
        items: [
          '**100 Candidates**',
          '**60 Screened**',
          '**30 Interviewed**',
          '**15 Final Round**',
          '**8 Offers**',
          '**6 Joined**',
        ],
      },
      { type: 'p', text: 'The final numbers may appear reasonable.' },
      {
        type: 'p',
        text: 'But if candidates are spending an unusually long time between screening and interview, the organization may still be losing time and potentially candidates.',
      },
      {
        type: 'p',
        text: 'Stage-level analytics provides a way to look beyond final outcomes and examine the process itself.',
      },
      {
        type: 'p',
        text: 'This is particularly useful for enterprise recruiting teams where small delays across multiple business units can accumulate into significant operational overhead.',
      },

      { type: 'h2', text: 'The Underlying Lesson' },
      {
        type: 'p',
        text: "Most recruitment reporting overhead isn't caused by the need to understand recruitment performance.",
      },
      {
        type: 'p',
        text: 'It is caused by **rebuilding the same underlying information repeatedly at different levels of the organization.**',
      },
      { type: 'p', text: 'A recruiter prepares a report.' },
      { type: 'p', text: 'A manager consolidates it.' },
      { type: 'p', text: 'Leadership reviews it.' },
      { type: 'p', text: 'Someone asks for clarification.' },
      { type: 'p', text: 'The report is updated.' },
      { type: 'p', text: 'The cycle repeats.' },
      {
        type: 'p',
        text: 'A centralized, role-aware recruitment analytics platform changes that model.',
      },
      {
        type: 'p',
        text: 'When recruiters, managers, and TA leadership can access the same underlying recruitment data through appropriately scoped dashboards, much of the manual reassembly becomes unnecessary.',
      },
      {
        type: 'p',
        text: 'PyHire is designed to help enterprise talent acquisition teams move from **manually assembled recruitment reporting** toward **centralized, role-aware recruitment analytics**.',
      },
      {
        type: 'p',
        text: "The objective isn't simply to replace a weekly meeting with a dashboard.",
      },
      {
        type: 'p',
        text: 'It is to make recruitment performance visible enough that the organization can spend less time asking for updates and more time acting on the information.',
      },

      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'h3', text: 'What is recruitment analytics software?' },
      {
        type: 'p',
        text: 'Recruitment analytics software helps talent acquisition teams collect, analyze, and visualize hiring data such as candidate activity, recruiter performance, recruitment stages, conversion rates, hiring progress, and process timelines.',
      },
      { type: 'h3', text: 'How can recruitment analytics reduce reporting overhead?' },
      {
        type: 'p',
        text: 'A centralized recruitment dashboard can provide stakeholders with direct access to current recruitment information, reducing the need for recruiters and managers to manually prepare and consolidate recurring status reports.',
      },
      { type: 'h3', text: 'What is stage SLA reporting in recruitment?' },
      {
        type: 'p',
        text: 'Stage SLA reporting measures how long candidates remain in specific recruitment stages and can help teams identify stages where candidates are taking longer than the configured service-level target.',
      },
      { type: 'h3', text: 'How can enterprise talent teams identify recruitment bottlenecks?' },
      {
        type: 'p',
        text: 'Enterprise talent teams can use stage-level recruitment analytics to compare candidate processing times across hiring stages, recruiters, teams, or business units and identify areas where candidates are progressing more slowly than expected.',
      },
      { type: 'h3', text: 'Can recruiters and managers see different recruitment dashboards?' },
      {
        type: 'p',
        text: 'Yes. Role-aware recruitment analytics can provide recruiters, managers, and TA leadership with different views based on their responsibilities and access permissions.',
      },
      { type: 'h3', text: 'Why is a single source of truth important for recruitment reporting?' },
      {
        type: 'p',
        text: 'A shared source of recruitment data reduces dependence on manually consolidated reports and helps different stakeholders work from consistent information when reviewing hiring performance.',
      },
      { type: 'h3', text: 'How can recruitment dashboards help TA leadership?' },
      {
        type: 'p',
        text: 'Recruitment dashboards can give TA leadership visibility into hiring activity, recruiter performance, candidate conversion, stage-level bottlenecks, SLA performance, and recruitment trends across teams or business units.',
      },

      { type: 'h2', text: 'See How PyHire Can Simplify Recruitment Analytics' },
      {
        type: 'p',
        text: "Enterprise recruitment shouldn't depend on manually assembled spreadsheets and weekly status updates.",
      },
      {
        type: 'p',
        text: '**PyHire helps talent acquisition teams centralize recruitment analytics, provide role-aware dashboards, monitor hiring performance, and identify stage-level bottlenecks from one recruitment platform.**',
      },
      {
        type: 'p',
        text: '**Explore PyHire** to see how centralized recruitment analytics can give recruiters, managers, and TA leadership a clearer view of the hiring operation.',
      },
    ],
  },

  {
    slug: 'case-study-09-vendor-spend-reallocation',
    title:
      'How an Agency Reallocated Vendor Spend After Seeing Real Source-to-Join Numbers',
    seoTitle: 'Vendor Spend and Source-to-Join Analytics',
    subtitle:
      'How PyHire helps staffing agencies track candidate source through the full pipeline, measure source-to-join conversion, and connect vendor commissions to hiring outcomes.',
    disclaimer:
      'This is an illustrative scenario based on operational challenges commonly experienced by staffing agencies working with multiple external sourcing vendors. It demonstrates the type of workflow PyHire is designed to support and does not represent results from a specific named customer.',
    excerpt:
      'A staffing agency works with five external vendors to source candidates for its clients, each under different commission terms. Vendor performance has historically been judged by resume volume — because that was the number that could be counted manually.',
    segment: 'Staffing Agencies',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'A team reviewing sourcing performance charts around a table',
    body: [
      { type: 'h2', text: 'The Starting Point' },
      {
        type: 'p',
        text: 'A staffing agency works with five external vendors to source candidates for its clients.',
      },
      {
        type: 'p',
        text: 'Each vendor operates under different commission terms — some on a percentage of CTC, some on a fixed placement fee, some per join.',
      },
      {
        type: 'p',
        text: 'Vendor performance has historically been judged by resume volume: how many candidates each vendor submits per month.',
      },
      {
        type: 'p',
        text: 'That metric was not chosen because it was the most useful one. It was chosen because it was the one that could be counted manually.',
      },
      {
        type: 'p',
        text: 'One vendor consistently submits the most resumes and is treated internally as the top performer. That vendor receives the largest share of new roles.',
      },
      {
        type: 'p',
        text: 'Nobody in the agency can say with confidence whether those submissions actually become hires:',
      },
      { type: 'quote', text: '"They send us the most candidates, so they must be our best vendor."' },
      {
        type: 'p',
        text: 'It is a reasonable assumption. It is also completely untested.',
      },

      { type: 'h2', text: 'The Challenge' },
      {
        type: 'p',
        text: 'The agency needed to evaluate sourcing vendors on hiring outcomes rather than submission counts.',
      },
      { type: 'p', text: 'The main challenges included:' },
      {
        type: 'ul',
        items: [
          'Vendor performance measured only by resume volume',
          'No visibility into which vendor sourced a candidate who joined',
          'Candidate source lost as candidates moved through the pipeline',
          'Different commission terms across vendors',
          'Manual commission reconciliation at month-end',
          'Role allocation based on assumption rather than conversion',
          'No shared performance number to discuss with vendors',
        ],
      },
      {
        type: 'p',
        text: 'The issue was not that vendors were underperforming.',
      },
      {
        type: 'p',
        text: 'The issue was that **the agency was optimizing for the only metric it could see.**',
      },

      { type: 'h2', text: 'What Moved Onto PyHire' },
      {
        type: 'p',
        text: 'PyHire connected candidate source tracking, pipeline progression, and vendor commission terms within one recruitment workflow.',
      },
      {
        type: 'p',
        text: "Each candidate's source — including the specific vendor who submitted them — could be retained from first contact through every pipeline stage to joining.",
      },
      {
        type: 'p',
        text: 'Because the source stays attached to the candidate record, the agency can measure vendor performance at the point that actually matters commercially: the join.',
      },

      { type: 'h2', text: 'Source Tracking Across the Full Pipeline' },
      {
        type: 'p',
        text: 'Source tracking is only useful if the source survives the whole process.',
      },
      {
        type: 'p',
        text: 'Many teams record where a candidate came from at the point of entry, then lose it as the candidate moves through screening, interviews and offers — which means the source can be reported against submissions but never against outcomes.',
      },
      { type: 'p', text: 'With the source retained throughout, each vendor can be measured across:' },
      {
        type: 'ul',
        items: [
          'Candidates submitted',
          'Candidates shortlisted',
          'Candidates interviewed',
          'Candidates selected',
          'Candidates joined',
          'Source-to-join conversion',
        ],
      },
      {
        type: 'p',
        text: 'This changes the reporting question from *how many did they send* to *how many became hires*.',
      },

      { type: 'h2', text: 'Volume Is Not Conversion' },
      {
        type: 'p',
        text: 'Submission volume and hiring conversion measure different things, and they can point in opposite directions.',
      },
      { type: 'p', text: 'Consider two vendors over the same period:' },
      {
        type: 'ul',
        items: [
          '**Vendor A** — 100 candidates submitted, 2 joined',
          '**Vendor B** — 30 candidates submitted, 8 joined',
        ],
      },
      {
        type: 'p',
        text: 'Measured on volume, Vendor A looks like the stronger partner by a wide margin.',
      },
      {
        type: 'p',
        text: 'Measured on joins, Vendor B delivered four times the hiring outcome from less than a third of the submissions.',
      },
      {
        type: 'p',
        text: 'Volume also carries a cost that submission counts never show. Every candidate submitted is screened, contacted, and coordinated by a recruiter. A high-volume, low-conversion vendor consumes recruiter capacity that could be spent on candidates more likely to join.',
      },
      {
        type: 'p',
        text: 'These figures are illustrative, but the pattern they describe is the reason volume-only reporting can be misleading.',
      },

      { type: 'h2', text: 'Connecting Commission to Outcomes' },
      {
        type: 'p',
        text: 'Vendor commissions depend on the commercial arrangement in place — a percentage of CTC, a fixed placement fee, a per-join fee, or terms subject to a guarantee period.',
      },
      {
        type: 'p',
        text: 'When those terms are configured within the recruitment workflow, the applicable commission can be tracked as candidates progress through selection and joining, rather than reconstructed from notes at month-end.',
      },
      {
        type: 'p',
        text: 'That produces a more consistent basis for two separate conversations:',
      },
      {
        type: 'ul',
        items: [
          '**What is owed** — calculated the same way each time, against the configured terms',
          '**What was delivered** — measured against joins rather than submissions',
        ],
      },
      {
        type: 'p',
        text: 'Both sides can look at the same underlying record, which tends to make disputes less frequent and vendor reviews less adversarial.',
      },

      { type: 'h2', text: 'Reallocating Roles Toward Conversion' },
      {
        type: 'p',
        text: 'Once conversion is visible per vendor, role allocation can follow the data rather than the assumption.',
      },
      { type: 'p', text: 'The agency can consider questions such as:' },
      {
        type: 'ul',
        items: [
          'Which vendors produce candidates who join?',
          'Which vendors perform best for specific role types?',
          'Which vendors consume the most recruiter effort per hire?',
          'Where is commission spend producing placements?',
          'Which relationships are worth expanding?',
        ],
      },
      {
        type: 'p',
        text: 'This does not automatically mean ending relationships with high-volume vendors. A vendor may convert poorly on one role type and strongly on another, which is itself useful information for deciding what to send them.',
      },
      {
        type: 'p',
        text: 'The point is that the decision becomes an informed one.',
      },

      { type: 'h2', text: 'Better Conversations With Vendors' },
      {
        type: 'p',
        text: 'Vendor performance reviews are difficult when each side arrives with its own numbers.',
      },
      {
        type: 'p',
        text: 'A vendor can reasonably point to submission volume as evidence of effort. The agency can reasonably point to placements as evidence of value. Without a shared record, the conversation becomes a negotiation over whose figures are correct.',
      },
      {
        type: 'p',
        text: 'A shared, consistently calculated set of numbers changes the discussion from:',
      },
      { type: 'quote', text: '"We send you plenty of candidates."' },
      { type: 'p', text: 'to:' },
      {
        type: 'quote',
        text: '**"Here is the conversion across the roles we sent you, and here is where it works best."**',
      },
      {
        type: 'p',
        text: 'That is a more productive basis for improving a sourcing relationship than either side asserting its own view of performance.',
      },

      { type: 'h2', text: 'What Changed, Directionally' },
      {
        type: 'p',
        text: 'Moving from volume-based vendor reporting to source-to-join tracking changes how the agency evaluates its sourcing partners.',
      },
      { type: 'h3', text: 'Vendor performance becomes outcome-based' },
      {
        type: 'p',
        text: 'Vendors can be compared on candidates who joined rather than candidates who were submitted.',
      },
      { type: 'h3', text: 'Assumptions about top performers can be tested' },
      {
        type: 'p',
        text: 'The vendor sending the most resumes may or may not be the vendor producing the most hires — with conversion data, that is a question with an answer.',
      },
      { type: 'h3', text: 'Commission tracking becomes more consistent' },
      {
        type: 'p',
        text: 'Configured terms provide a standard basis for tracking what is owed, reducing month-end reconstruction.',
      },
      { type: 'h3', text: 'Role allocation becomes more deliberate' },
      {
        type: 'p',
        text: 'New roles can be routed toward vendors whose candidates convert, and toward the role types each vendor handles best.',
      },
      { type: 'h3', text: 'Recruiter effort becomes easier to account for' },
      {
        type: 'p',
        text: 'High-volume, low-conversion sourcing has a visible cost in screening and coordination time, not just in commission.',
      },

      { type: 'h2', text: 'Why Source-to-Join Matters' },
      {
        type: 'p',
        text: 'Most recruitment metrics measure activity. Source-to-join measures result.',
      },
      {
        type: 'p',
        text: 'Submissions, screenings, interviews and offers all describe work in progress. Only the join confirms that the sourcing decision produced what the client actually needed.',
      },
      {
        type: 'p',
        text: 'For an agency whose margin depends on placements rather than submissions, that distinction is the difference between measuring effort and measuring outcome.',
      },
      {
        type: 'p',
        text: 'It also compounds. A sourcing channel that converts well is worth more of the agency\'s recruiter capacity, more of its commission budget, and more of its client-facing confidence.',
      },

      { type: 'h2', text: 'The Underlying Lesson' },
      {
        type: 'p',
        text: 'Volume and conversion are not the same signal.',
      },
      {
        type: 'p',
        text: 'Optimizing for the wrong one is easy when it is the only one visible — and submission counts are visible by default in almost every manual process, while conversion is not.',
      },
      {
        type: 'p',
        text: 'The agency was not making an error of judgement. It was making a reasonable decision from incomplete information.',
      },
      {
        type: 'p',
        text: 'Once candidate source is retained through the full pipeline and connected to joining and commission, **"who is actually our best sourcing partner" stops being an opinion and becomes a number both sides can examine.**',
      },
      {
        type: 'p',
        text: 'By connecting **candidate source, pipeline progression, joining status and vendor commission terms**, PyHire is designed to help agencies evaluate sourcing relationships on hiring outcomes.',
      },

      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'h3', text: 'What is source-to-join conversion?' },
      {
        type: 'p',
        text: 'Source-to-join conversion measures the proportion of candidates from a given source — a vendor, job board, referral or direct application — who ultimately join. It evaluates a sourcing channel on hiring outcomes rather than submission volume.',
      },
      { type: 'h3', text: 'Why is resume volume a misleading vendor metric?' },
      {
        type: 'p',
        text: 'Submission volume measures effort, not result. A vendor submitting many candidates who do not progress can consume significant recruiter screening and coordination time while producing fewer hires than a lower-volume vendor.',
      },
      { type: 'h3', text: 'How can agencies track which vendor sourced a hire?' },
      {
        type: 'p',
        text: 'The candidate source needs to be recorded at entry and retained on the candidate record through every pipeline stage, so it is still attached when the candidate reaches selection and joining.',
      },
      { type: 'h3', text: 'How can recruitment software track vendor commissions?' },
      {
        type: 'p',
        text: 'Commission terms can be configured per vendor according to the commercial arrangement — percentage of CTC, fixed placement fee, per-join fee, or guarantee period — and the applicable commission tracked as candidates progress through selection and joining.',
      },
      { type: 'h3', text: 'Should agencies stop working with high-volume vendors?' },
      {
        type: 'p',
        text: 'Not necessarily. A vendor may convert poorly on one role type and strongly on another. Conversion data supports more deliberate decisions about which roles to send where, rather than a single judgement about the relationship.',
      },
      { type: 'h3', text: 'What is vendor management software for staffing agencies?' },
      {
        type: 'p',
        text: 'Vendor management software helps staffing agencies manage external sourcing partners — their submissions, candidate outcomes, contract terms, commission arrangements and performance — within a centralized recruitment workflow.',
      },

      { type: 'h2', text: 'See How PyHire Can Support Vendor Performance Tracking' },
      {
        type: 'p',
        text: 'Choosing sourcing partners should not depend on the one metric that happens to be easy to count.',
      },
      {
        type: 'p',
        text: '**PyHire helps staffing agencies track candidate source through the full pipeline, measure source-to-join conversion, and connect vendor commission terms to hiring outcomes.**',
      },
      {
        type: 'p',
        text: '**Explore PyHire** to see how outcome-based vendor reporting can change where your sourcing spend goes.',
      },
    ],
  },

  {
    slug: 'case-study-10-startup-onboarding',
    title:
      'How a Scaling Startup Automated Offer-to-Joining So Nothing Slipped in the Final Mile',
    seoTitle: 'Automating Offer-to-Joining Workflows',
    subtitle:
      'How PyHire helps scaling recruiting teams trigger document collection, keep pre-joining candidates visible, and connect joining events to downstream systems.',
    disclaimer:
      'This is an illustrative scenario based on operational challenges commonly experienced by fast-scaling companies hiring in high volume. It demonstrates the type of workflow PyHire is designed to support and does not represent results from a specific named customer.',
    excerpt:
      'A startup scaling headcount quickly is making offers faster than its small recruiting team can manually track them. Once a candidate accepts, document collection happens over email threads that are easy to lose track of.',
    segment: 'Fast-Scaling Companies',
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'A recruiting team coordinating offers and joining paperwork',
    body: [
      { type: 'h2', text: 'The Starting Point' },
      {
        type: 'p',
        text: 'A startup scaling headcount quickly is making offers faster than its small recruiting team can manually track them.',
      },
      {
        type: 'p',
        text: 'Once a candidate accepts, the remaining work is administrative but not optional: collecting the signed offer letter, identity proofs, education documents and background-check consents.',
      },
      {
        type: 'p',
        text: 'All of it happens over email threads.',
      },
      {
        type: 'p',
        text: 'Each thread is easy to start and easy to lose. A recruiter sends the request, the candidate replies with two of the four documents, and the thread drops down the inbox behind more urgent work.',
      },
      {
        type: 'p',
        text: 'Some candidates\' documentation stalls for days without anyone noticing, and the joining date moves.',
      },
      {
        type: 'p',
        text: 'Occasionally something worse happens. A candidate the team had mentally filed as hired goes quiet, and nobody follows up, because the internal assumption was already made:',
      },
      { type: 'quote', text: '"They\'ve accepted — that one\'s done."' },
      {
        type: 'p',
        text: 'The candidate had not started. They had only agreed to.',
      },
      { type: 'h2', text: 'The Challenge' },
      {
        type: 'p',
        text: 'The recruiting team needed the stage between offer acceptance and joining to be actively managed rather than assumed complete.',
      },
      { type: 'p', text: 'The main challenges included:' },
      {
        type: 'ul',
        items: [
          'Document collection handled over email threads',
          'No consolidated view of which candidates were awaiting documents',
          'Manual reminders depending on recruiter memory',
          'Candidates treated as complete once an offer was accepted',
          'Joining dates slipping without anyone noticing',
          'Manual re-entry of joined candidates into HR systems',
          'No trigger connecting the offer stage to document collection',
        ],
      },
      {
        type: 'p',
        text: 'The difficulty was not that the team lacked process knowledge.',
      },
      {
        type: 'p',
        text: 'It was that **the final stage had no dedicated place in the workflow, so it depended entirely on someone remembering it.**',
      },

      { type: 'h2', text: 'What Moved Onto PyHire' },
      {
        type: 'p',
        text: 'PyHire brought the offer-to-joining stage into the recruitment workflow as an actively tracked phase rather than an administrative afterthought.',
      },
      {
        type: 'p',
        text: 'Reaching the offer stage could trigger a document-collection request automatically, instead of relying on a recruiter to remember to send it.',
      },
      {
        type: 'p',
        text: 'That stage could also have its own place in the recruiter\'s working view, so candidates awaiting documentation remain as visible as any other active candidate.',
      },
      {
        type: 'p',
        text: 'Once documentation was complete and the candidate joined, the joining event could be passed onward to downstream systems rather than re-entered by hand.',
      },

      { type: 'h2', text: 'Status-Triggered Document Collection' },
      {
        type: 'p',
        text: 'Document collection is predictable work. It happens at the same point in every hire, and it needs the same set of items each time.',
      },
      {
        type: 'p',
        text: 'Predictable work is exactly what should not depend on memory.',
      },
      { type: 'p', text: 'When a candidate reaches the relevant stage, the workflow can proceed:' },
      {
        type: 'ol',
        items: [
          '**Candidate reaches Offer Sent • Pending Documentation**',
          '**Configured document request is triggered**',
          '**Candidate receives the request through the configured channel**',
          '**Candidate uploads the required documents**',
          '**Documents are attached to the candidate record**',
          '**Recruiter reviews and confirms**',
        ],
      },
      { type: 'p', text: 'The documents typically requested at this stage include:' },
      {
        type: 'ul',
        items: [
          'Signed offer letter',
          'Identification documents',
          'Educational certificates',
          'Previous employment documents',
          'Background verification consents',
        ],
      },
      {
        type: 'p',
        text: 'Because the request is triggered by the candidate\'s status rather than by a recruiter\'s to-do list, it goes out at the same point in every hire.',
      },

      { type: 'h2', text: 'Making the Final Stage Visible' },
      {
        type: 'p',
        text: 'A candidate who has accepted an offer feels like a completed hire.',
      },
      {
        type: 'p',
        text: 'That perception is the source of the problem. Work that feels finished stops being reviewed, and a candidate waiting on a document request can sit untouched for days without anyone registering it as a pending action.',
      },
      {
        type: 'p',
        text: 'Giving the offer-to-joining stage its own view in the recruiter\'s workspace keeps those candidates in the same field of attention as active pipeline work.',
      },
      { type: 'p', text: 'The recruiter can see at a glance:' },
      {
        type: 'ul',
        items: [
          'Which candidates have accepted an offer',
          'Which documents are still outstanding',
          'How long a candidate has been waiting',
          'Which joining dates are approaching',
          'Which candidates need a follow-up today',
        ],
      },
      {
        type: 'p',
        text: 'The stage stops being a formality and becomes a queue with a next action.',
      },

      { type: 'h2', text: 'Connecting Joining to Downstream Systems' },
      {
        type: 'p',
        text: 'A hire does not end at the recruitment platform.',
      },
      {
        type: 'p',
        text: 'When a candidate joins, that fact typically needs to reach an HR system, and for agency hiring it may also determine when vendor commission becomes applicable.',
      },
      {
        type: 'p',
        text: 'Handled manually, the same information is entered twice — once in the recruitment system and again wherever it is needed next — which creates both duplicated effort and an opportunity for the two records to disagree.',
      },
      {
        type: 'p',
        text: 'Where an integration is configured, the joining event can be passed onward instead:',
      },
      { type: 'p', text: '**Candidate joins → recruitment record updated → downstream systems informed**' },
      {
        type: 'p',
        text: 'This keeps the final hiring step connected to the systems that depend on it, rather than ending at the recruiter\'s inbox.',
      },

      { type: 'h2', text: 'Why the Final Mile Is Where Hires Are Lost' },
      {
        type: 'p',
        text: 'A candidate who has accepted an offer has not yet joined.',
      },
      {
        type: 'p',
        text: 'Between those two points, a candidate may still be interviewing elsewhere, may be negotiating a counter-offer with their current employer, or may simply be waiting for a response that never arrives.',
      },
      { type: 'p', text: 'Silence at this stage is costly because the candidate interprets it:' },
      {
        type: 'ul',
        items: [
          'A delayed document request reads as disorganization',
          'An unanswered question reads as disinterest',
          'A slipping joining date reads as uncertainty',
          'A gap in communication leaves room for a competing offer',
        ],
      },
      {
        type: 'p',
        text: 'The cost is also higher here than anywhere else in the pipeline. Every sourcing, screening, interview and evaluation step has already been paid for. A candidate lost at the final stage represents the full cost of the hire with none of the result.',
      },

      { type: 'h2', text: 'What Changed, Directionally' },
      {
        type: 'p',
        text: 'Moving the offer-to-joining stage into a structured workflow changes how reliably the final step completes.',
      },
      { type: 'h3', text: 'Document collection starts consistently' },
      {
        type: 'p',
        text: 'The request is triggered by the candidate reaching the relevant stage rather than by a recruiter finding time to send it.',
      },
      { type: 'h3', text: 'Pending candidates stay visible' },
      {
        type: 'p',
        text: 'A dedicated view keeps candidates awaiting documentation in the recruiter\'s active workload instead of treating them as already complete.',
      },
      { type: 'h3', text: 'Joining dates become more predictable' },
      {
        type: 'p',
        text: 'When document collection begins immediately and outstanding items are visible, delays surface early enough to act on.',
      },
      { type: 'h3', text: 'Handoff to HR systems requires less manual work' },
      {
        type: 'p',
        text: 'Where integrations are configured, the joining event can flow onward rather than being re-entered in a second system.',
      },
      { type: 'h3', text: 'Hiring volume scales without proportional coordination effort' },
      {
        type: 'p',
        text: 'The steps that previously required manual chasing are driven by candidate status, so more offers do not require proportionally more administrative follow-up.',
      },

      { type: 'h2', text: 'Why This Matters for Fast-Scaling Teams' },
      {
        type: 'p',
        text: 'A small recruiting team making a handful of offers can track the final stage informally.',
      },
      {
        type: 'p',
        text: 'The same team making offers continuously across many roles cannot, because the number of candidates in the final stage at any moment grows faster than the attention available to check on them.',
      },
      {
        type: 'p',
        text: 'This is usually the point at which a scaling company decides it needs more recruiting operations headcount.',
      },
      {
        type: 'p',
        text: 'Often what it actually needs is for the predictable parts of the process to stop requiring a person to remember them.',
      },

      { type: 'h2', text: 'The Underlying Lesson' },
      {
        type: 'p',
        text: 'The stage between offer accepted and candidate joined receives the least attention precisely because it feels like the hire is already secured.',
      },
      { type: 'p', text: 'It is not.' },
      {
        type: 'p',
        text: 'It is the stage where the organization has invested the most and confirmed the least.',
      },
      {
        type: 'p',
        text: 'Treating it as an actively managed phase — with a triggered document request, a visible queue, and a connection to the systems downstream — closes one of the most avoidable points of candidate loss in the entire pipeline.',
      },
      {
        type: 'p',
        text: 'By connecting **offer status, document collection, candidate communication, joining confirmation and downstream handoff**, PyHire is designed to help scaling teams complete the hires they have already won.',
      },

      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'h3', text: 'What is offer-to-joining in recruitment?' },
      {
        type: 'p',
        text: 'Offer-to-joining is the stage between a candidate accepting an offer and actually starting. It typically involves signed offer letters, identity and education documents, background verification consents, and confirmation of the joining date.',
      },
      { type: 'h3', text: 'Why do candidates drop out after accepting an offer?' },
      {
        type: 'p',
        text: 'Candidates may still be considering other opportunities or a counter-offer. Delays, unanswered questions, or gaps in communication during the pre-joining period can leave room for a competing offer to take priority.',
      },
      { type: 'h3', text: 'How can recruitment software automate document collection?' },
      {
        type: 'p',
        text: 'Where configured, reaching a defined recruitment stage can trigger a document request to the candidate, with uploaded documents attached to the candidate record for recruiter review.',
      },
      { type: 'h3', text: 'How can recruiters track candidates awaiting documents?' },
      {
        type: 'p',
        text: 'A dedicated view for the pending-documentation stage lets recruiters see which candidates have accepted an offer, which documents are outstanding, and how long each has been waiting.',
      },
      { type: 'h3', text: 'Can recruitment software connect to an HRMS?' },
      {
        type: 'p',
        text: 'Where an integration is configured, a joining event can be passed from the recruitment platform to downstream systems such as an HRMS, reducing manual re-entry of the same information.',
      },
      { type: 'h3', text: 'Why is the pre-joining stage important for hiring costs?' },
      {
        type: 'p',
        text: 'By the pre-joining stage, the full cost of sourcing, screening, interviewing and evaluating the candidate has already been incurred. A candidate lost at this point represents that entire cost without the resulting hire.',
      },

      { type: 'h2', text: 'See How PyHire Can Support the Offer-to-Joining Stage' },
      {
        type: 'p',
        text: 'The hardest part of hiring should not be the last step.',
      },
      {
        type: 'p',
        text: '**PyHire helps recruiting teams trigger document collection, keep pre-joining candidates visible, track outstanding items, and connect joining events to downstream systems.**',
      },
      {
        type: 'p',
        text: '**Explore PyHire** to see how a structured final mile can protect the hires your team has already won.',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Derived helpers                                                     */
/* ------------------------------------------------------------------ */

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/** Segment list with counts computed from the studies themselves. */
export function getSegments(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const c of caseStudies) counts.set(c.segment, (counts.get(c.segment) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Same segment first, then the rest, excluding the current study. */
export function getRelatedCaseStudies(slug: string, limit = 2): CaseStudy[] {
  const current = getCaseStudyBySlug(slug);
  const others = caseStudies.filter((c) => c.slug !== slug);
  if (!current) return others.slice(0, limit);
  const sameSegment = others.filter((c) => c.segment === current.segment);
  const rest = others.filter((c) => c.segment !== current.segment);
  return [...sameSegment, ...rest].slice(0, limit);
}

/** Full-text haystack for search: title, segment, disclaimer and body. */
export function caseStudyText(study: CaseStudy): string {
  return [study.title, study.segment, study.disclaimer, blocksToText(study.body)].join(' ');
}
