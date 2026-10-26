import {
  Play,
  ArrowRight,
  Search,
  Zap,
  FileText,
  Database,
  GitBranch,
  History,
  UserCheck,
  Tags,
  MessageSquare,
  PlusSquare,
  Target,
  Clock,
  Star,
  Users,
  Briefcase,
  FileSearch,
  User,
  PenTool,
  CheckCircle,
  Award,
  Calendar,
  Filter,
  Mail,
  Building,
  Globe,
  Share2,
  BarChart,
  FileCheck,
  Layers,
  BrainCircuit,
  Shield,
  BarChart2,
  Video,
  ClipboardList,
  CalendarCheck,
  FileQuestion,
  Building2,
  FileSignature,
  Handshake,
  ScrollText,
  CheckSquare,
  BarChart3,
  Network,
  ShieldCheck,
  Phone,
  Smartphone,
  Inbox,
  Send,
  Bell,
  PieChart,
  TrendingUp,
  LineChart,
  Activity,
  Presentation,
  Lock,
  Eye,
  Server,
  Key,
  AlertTriangle,
  Settings
} from "lucide-react";
import React from 'react';
import { ProductPageLayout } from '../components/ProductPageLayout';
import { ClientVendorManagementHero } from './ClientVendorManagementHero';

export function ClientVendorManagement() {
  return (
    <ProductPageLayout 
      customHero={<ClientVendorManagementHero />}
      
      hero={{ imageSrc: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80" }}
      title="Client & Vendor Management"
      seoTitle="Client & Vendor Management for Agencies"
      description="Manage clients, staffing vendors, contracts, requisitions, and recruitment collaboration from a centralized workspace."
      features={[
        { title: "Client Portals", desc: "Dedicated secure portals for clients to review and approve submitted candidates.", icon: <Building2 /> },
        { title: "Vendor Collaboration", desc: "Invite staffing agencies to submit candidates to specific requisitions securely.", icon: <Network /> },
        { title: "Contract Management", desc: "Store and track MSAs, SLAs, and placement terms in one centralized hub.", icon: <FileSignature /> },
        { title: "Performance Tracking", desc: "Monitor vendor submittals, interview rates, and placement success.", icon: <BarChart3 /> }
      ]}
      workflowTitle="Collaborative Recruitment Workflow"
      workflowDesc="Seamlessly bridge the gap between your agency, your clients, and your vendors."
      workflowSteps={[
        { id: "01", title: "Client Requisition", desc: "Receive and process new job orders from clients.", icon: <Briefcase className="w-6 h-6 text-[#f97316]" /> },
        { id: "02", title: "Vendor Assignment", desc: "Optionally assign requisitions to preferred staffing vendors.", icon: <Network className="w-6 h-6 text-[#f97316]" /> },
        { id: "03", title: "Candidate Submission", desc: "Vendors submit candidates through a secure portal.", icon: <Users className="w-6 h-6 text-[#f97316]" /> },
        { id: "04", title: "Internal Review", desc: "Review vendor submissions before forwarding to clients.", icon: <CheckSquare className="w-6 h-6 text-[#f97316]" /> },
        { id: "05", title: "Client Presentation", desc: "Present shortlisted candidates to the client via portal.", icon: <Building2 className="w-6 h-6 text-[#f97316]" /> },
        { id: "06", title: "Feedback & Hiring", desc: "Clients leave feedback and make hiring decisions directly.", icon: <Handshake className="w-6 h-6 text-[#f97316]" /> }
      ]}
      benefitsTitle="Build Stronger Partnerships"
      benefitsDesc="Deliver exceptional service to your clients while maximizing vendor efficiency."
      benefitsImage="/client-vendor-partnership.webp"
      benefits={[
        { title: "Enhanced Client Experience", desc: "Provide clients with a modern, branded portal to review talent.", icon: <Building2 /> },
        { title: "Streamlined Communication", desc: "Keep all client and vendor messaging attached to the candidate record.", icon: <ScrollText /> },
        { title: "Data Security", desc: "Granular permissions ensure vendors only see what they need to.", icon: <ShieldCheck /> },
        { title: "Vendor Accountability", desc: "Track which vendors provide the best quality candidates.", icon: <BarChart3 /> }
      ]}
      overview={{
        eyebrow: "Client & Vendor Management",
        title: "The module that makes PyHire an agency platform, not just an ATS",
        blocks: [
          {
            type: 'p',
            text: "An in-house talent team hires for one organisation. An agency hires for several at once, through a mix of its own recruiters and external staffing vendors, under contracts with different terms — and has to keep each client's information separate while running all of it from one operation.",
          },
          {
            type: 'p',
            text: "That is a fundamentally different problem, and it is the one this module solves. **PyHire manages clients, staffing vendors, contracts, requisitions and recruitment collaboration from a centralized workspace,** with permissions strict enough that clients and vendors can be given direct access without seeing anything that is not theirs.",
          },
          {
            type: 'p',
            text: "Clients get a branded portal to review and approve the candidates you submit to them. Vendors get a secure route to submit candidates against specific requisitions, and nothing beyond those requisitions. Your recruiters see the whole picture. The separation is enforced by the platform rather than by everyone being careful, which is what makes it safe to give partners access at all.",
          },
          {
            type: 'p',
            text: "The second thing the module produces is accountability. Vendor submittals, interview rates and placement success are tracked as they happen, so the question of which vendors are actually performing is answered by the record rather than by the end-of-quarter reconciliation that agencies usually run in a spreadsheet.",
          },
        ],
        highlights: [
          { label: "Built for", value: "Recruitment agencies, staffing firms and RPO providers running multiple clients at once." },
          { label: "Client access", value: "Branded portals where clients review and approve submitted candidates — and see only what you shared." },
          { label: "Vendor access", value: "Secure per-requisition submission links, with granular permissions limiting visibility to the assigned roles." },
          { label: "Contracts", value: "MSAs, SLAs and placement terms stored and tracked in one hub alongside the requisitions they govern." },
        ],
      }}
      deepDive={{
        title: "How multi-party recruitment works in PyHire",
        desc: "Four parties, one record, and permissions that decide who sees which part of it.",
        items: [
          {
            title: "Client portals that clients will actually use",
            blocks: [
              {
                type: 'p',
                text: "Each client gets a portal, customisable with your agency's branding and logo, where they review the candidates you have submitted and record their decisions directly.",
              },
              {
                type: 'p',
                text: "The alternative — emailing profiles as attachments and chasing responses — costs more than the time it takes. Feedback arrives in a thread rather than against the candidate, so the reason a submittal was rejected is not attached to the record that would have improved the next one.",
              },
              {
                type: 'p',
                text: "Clients see only the specific candidates you have explicitly shared with them. Nothing about your other clients, your wider database, or your other submissions is visible from a client portal.",
              },
            ],
          },
          {
            title: "Vendor collaboration with real boundaries",
            blocks: [
              {
                type: 'p',
                text: "Staffing vendors are invited to submit candidates against specific requisitions. Each receives a secure, unique link to upload resumes and candidate details straight into the assigned role, so submissions arrive structured rather than as attachments to be re-keyed.",
              },
              {
                type: 'p',
                text: "**Granular permissions ensure vendors only see what they need to.** Visibility is scoped to the requisitions a vendor is assigned, which is what allows several competing agencies to work the same client without any of them seeing the others' candidates.",
              },
              {
                type: 'p',
                text: "Submissions still pass through your internal review before anything reaches the client, so the vendor route adds candidate volume without giving up control of what the client sees.",
              },
            ],
          },
          {
            title: "Contracts kept next to the work they govern",
            blocks: [
              {
                type: 'p',
                text: "MSAs, SLAs and placement terms are stored centrally and tracked against the clients and vendors they apply to. The commercial terms of a relationship sit alongside the requisitions being delivered under them.",
              },
              {
                type: 'p',
                text: "This matters at the point of payment. When placement terms live in a contract folder and placements live in a recruitment system, reconciling the two is manual work performed at month end — which is exactly when errors are least likely to be caught.",
              },
            ],
          },
          {
            title: "Performance you can see before the invoice",
            blocks: [
              {
                type: 'p',
                text: "PyHire tracks vendor submittals, the proportion that convert to interviews, and the placements that result. Vendor quality becomes a visible metric rather than an impression formed from the most recent conversation.",
              },
              {
                type: 'p',
                text: "The same tracking answers the question agencies find hardest: which client, recruiter or vendor is actually contributing the most value. When candidates, requisitions, vendors and outcomes are separate records in separate places, that answer has to be assembled by hand. Here it is a report.",
              },
            ],
          },
        ],
      }}
      faqsTitle="Frequently Asked Questions"
      faqsDesc="Learn about managing external partners."
      faqs={[
        { q: "Can clients see other candidates in the system?", a: "No. Clients only have access to the specific candidates you have explicitly shared with them. Nothing about your other clients, your wider candidate database, or submissions made elsewhere is visible from a client portal — the separation is enforced by permissions rather than by everyone remembering to be careful." },
        { q: "Is the client portal white-labeled?", a: "Yes. You can customize the client portal with your agency's branding and logo, so clients review talent in an environment that reads as yours rather than as a third-party tool." },
        { q: "How do vendors submit candidates?", a: "Vendors receive a secure, unique link to upload resumes and candidate details directly into the assigned requisition. Submissions arrive structured and attached to the right role, so nobody re-keys an emailed attachment into the system." },
        { q: "Can two competing vendors work the same client?", a: "Yes. Vendor visibility is scoped to the requisitions each vendor is assigned, so several agencies can work the same client without any of them seeing the others' candidates or submissions." },
        { q: "Do vendor submissions go straight to the client?", a: "No. Vendor submissions pass through your internal review first, and you decide which candidates are presented to the client. The vendor route adds candidate volume without giving up control of what the client sees." },
        { q: "How do you track which vendors are performing?", a: "PyHire tracks submittals, the proportion converting to interviews, and the placements that result. Vendor quality becomes a metric visible during the quarter rather than an impression reconciled at the end of it." },
        { q: "Where do contracts live?", a: "MSAs, SLAs and placement terms are stored in one centralized hub and tracked against the clients and vendors they apply to, so the commercial terms sit alongside the requisitions being delivered under them." },
        { q: "How is communication with clients and vendors recorded?", a: "Client and vendor messaging is kept attached to the candidate record rather than in individual inboxes, so the reason a submittal was accepted or rejected stays with the candidate it concerns." },
      ]}
      ctaTitle="Ready to Elevate Your Client Experience?"
      ctaDesc="Manage clients, staffing vendors, and collaborative hiring effortlessly with PyHire."
      ctaImage="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80"
    />
  );
}
