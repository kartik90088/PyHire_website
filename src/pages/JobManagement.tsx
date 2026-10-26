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
import { JobManagementHero } from './JobManagementHero';

export function JobManagement() {
  return (
    <ProductPageLayout 
      customHero={<JobManagementHero />}
      
      hero={{ imageSrc: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80" }}
      title="Job Management"
      seoTitle="Job Requisition & Posting Software"
      description="Create, publish, approve, and manage job openings efficiently from one platform."
      features={[
        { title: "Smart Requisitions", desc: "Easily draft job requisitions with AI-assisted descriptions and auto-filled details.", icon: <FileText /> },
        { title: "Multi-level Approvals", desc: "Customizable approval workflows to keep hiring managers and finance aligned.", icon: <CheckCircle /> },
        { title: "One-Click Publishing", desc: "Publish to multiple premium job boards, social media, and your careers page.", icon: <Globe /> },
        { title: "Dynamic Pipelines", desc: "Create custom hiring stages per job to match specific recruitment needs.", icon: <Layers /> }
      ]}
      workflowTitle="Job Creation Workflow"
      workflowDesc="From drafting to publishing, streamline your requisition process in minutes."
      workflowSteps={[
        { id: "01", title: "Draft Requisition", desc: "Create new job request with required skills and budget.", icon: <FileText className="w-6 h-6 text-[#f97316]" /> },
        { id: "02", title: "Approval Chain", desc: "Automated routing for multi-stakeholder approvals.", icon: <CheckCircle className="w-6 h-6 text-[#f97316]" /> },
        { id: "03", title: "Job Description", desc: "AI-enhanced formatting and JD optimization.", icon: <PenTool className="w-6 h-6 text-[#f97316]" /> },
        { id: "04", title: "Job Publishing", desc: "Distribute across multiple channels simultaneously.", icon: <Globe className="w-6 h-6 text-[#f97316]" /> },
        { id: "05", title: "Sourcing Begins", desc: "Start receiving applications and matching candidates.", icon: <Target className="w-6 h-6 text-[#f97316]" /> },
        { id: "06", title: "Pipeline Management", desc: "Track candidates progressing through tailored stages.", icon: <Filter className="w-6 h-6 text-[#f97316]" /> }
      ]}
      benefitsTitle="Simplify Job Operations"
      benefitsDesc="Centralize your job tracking and scale your hiring without losing control."
      benefitsImage="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
      benefits={[
        { title: "Accelerate Approvals", desc: "No more waiting for email sign-offs. Get jobs approved in hours.", icon: <FileCheck /> },
        { title: "Wider Reach", desc: "Integrations with top job portals ensure maximum visibility for your roles.", icon: <Share2 /> },
        { title: "Better Organization", desc: "Track all open, closed, and draft positions in a single dashboard.", icon: <Briefcase /> },
        { title: "Cost Control", desc: "Monitor job board spending and track ROI on your job postings.", icon: <BarChart /> }
      ]}
      overview={{
        eyebrow: "Job Management",
        title: "Every open role, from first request to first shortlist, in one place",
        blocks: [
          {
            type: 'p',
            text: "A job opening starts life as a request — a hiring manager needs a person, a budget holder has to agree, and someone has to write the description before anything can be advertised. In most recruitment teams that sequence happens across email threads, chat messages and a spreadsheet that tracks which roles are live. Nothing is wrong with any single step. The problem is that no one can see the whole sequence at once, so roles stall in places nobody is watching.",
          },
          {
            type: 'p',
            text: "**PyHire's job management module turns that sequence into a tracked process.** A requisition is raised in the platform with the skills, budget and location attached. It routes automatically to whoever has to approve it. Once approved, the description is drafted with AI assistance, published to your chosen channels in one action, and the applications that come back land in a pipeline built for that specific role.",
          },
          {
            type: 'p',
            text: "The practical difference is that every role has a status, and that status is visible without asking anyone. A recruiter can see which requisitions are awaiting approval and who they are waiting on. A hiring manager can see whether the role they requested has been published. A finance lead can see what has been committed to job boards. The same record serves all three, so no one is maintaining a private version of the truth.",
          },
          {
            type: 'p',
            text: "Because pipelines are defined per job rather than globally, a senior engineering role with four interview rounds and a bulk support-agent role with one screening call can both run inside the same system without either being forced into the other's shape.",
          },
        ],
        highlights: [
          { label: "Best for", value: "Recruitment agencies, staffing firms and in-house talent teams running more than a handful of roles at once." },
          { label: "Replaces", value: "Requisition email chains, approval chasing, and the spreadsheet tracking which jobs are live." },
          { label: "Works with", value: "LinkedIn and other premium job boards, social channels, and your own careers page." },
          { label: "Connects to", value: "AI candidate matching, interview management, and recruitment analytics — the same requisition record feeds all three." },
        ],
      }}
      deepDive={{
        title: "How job management works in practice",
        desc: "The four capabilities above, explained in the detail a buyer actually needs before booking a demo.",
        items: [
          {
            title: "Requisitions that arrive complete",
            blocks: [
              {
                type: 'p',
                text: "Most delays in opening a role are not approval delays — they are clarification delays. A request arrives without a budget band, or without the seniority settled, and it bounces back and forth before anyone can act on it.",
              },
              {
                type: 'p',
                text: "PyHire captures the requisition as a structured record: required skills, budget, location, seniority and the reason for the hire. Because the fields are part of the form rather than the covering email, an incomplete request is visible as incomplete at the moment it is raised, not three days later.",
              },
              {
                type: 'p',
                text: "AI assistance drafts the job description from those inputs, so the recruiter is editing a draft rather than starting from an empty page — and the description stays anchored to the requirements that were actually approved.",
              },
            ],
          },
          {
            title: "Approvals that route themselves",
            blocks: [
              {
                type: 'p',
                text: "Approval chains in PyHire are configured, not improvised. You can set them to run **sequentially**, where each approver sees the role only after the previous one has signed off, or **in parallel**, where everyone is asked at once and the role proceeds when all have responded.",
              },
              {
                type: 'p',
                text: "Which chain applies can depend on the department raising the request or the budget attached to it, so a routine backfill and a new headcount request do not have to travel the same path.",
              },
              {
                type: 'p',
                text: "The state of the chain is visible throughout. A role waiting on a specific approver shows that it is waiting, and on whom — which is usually enough to unstick it without a status meeting.",
              },
            ],
          },
          {
            title: "Publishing to every channel in one action",
            blocks: [
              {
                type: 'p',
                text: "Once a description is approved, publishing is a single action rather than a series of logins. PyHire distributes to LinkedIn and other premium job boards, to social channels, and to your own careers page at the same time.",
              },
              {
                type: 'p',
                text: "The value is not only the time saved on posting. It is that every applicant arrives tagged with the channel they came from, which is what makes source effectiveness measurable later. A role posted manually across five sites produces five separate streams of candidates and no reliable way to compare them.",
              },
              {
                type: 'p',
                text: "That channel tag follows the candidate through the pipeline, so the question \"which board actually produced hires, not just applications\" has an answer.",
              },
            ],
          },
          {
            title: "Pipelines shaped to the role",
            blocks: [
              {
                type: 'p',
                text: "Hiring stages in PyHire belong to the job opening, not to the organisation. Each role defines its own sequence — screening, technical assessment, panel interview, client submittal, offer — and candidates move through that sequence.",
              },
              {
                type: 'p',
                text: "This matters most for agencies and staffing firms, where one client's process genuinely differs from another's, and forcing both into a shared set of global stages means the stage names stop describing anything real.",
              },
              {
                type: 'p',
                text: "Because each stage transition is recorded against the requisition, stage-by-stage velocity becomes visible: not just how long a role took to fill, but where in the process the time actually went.",
              },
            ],
          },
        ],
      }}
      faqsTitle="Frequently Asked Questions"
      faqsDesc="Learn more about managing jobs with PyHire."
      faqs={[
        { q: "Can I customize the approval workflow?", a: "Yes. You can set up sequential approvals, where each approver sees the requisition after the previous one signs off, or parallel approvals, where everyone is asked at the same time. Which chain applies can be based on the department raising the request or the budget attached to it, so a routine backfill and a new headcount request do not have to follow the same path." },
        { q: "Does PyHire integrate with LinkedIn?", a: "Absolutely. You can publish directly to LinkedIn and other premium job boards from the platform, alongside social channels and your own careers page, in a single publishing action rather than logging into each one separately." },
        { q: "Can I have different hiring stages for different jobs?", a: "Yes, pipelines are fully customizable per job opening. Stages belong to the requisition rather than to the organisation, so a senior engineering role with four interview rounds and a high-volume role with a single screening call can each run their own sequence in the same platform." },
        { q: "What happens to a requisition that is missing information?", a: "Requisitions are captured as structured records with fields for required skills, budget, location and seniority. An incomplete request is visible as incomplete when it is raised, rather than surfacing days later when an approver asks for the missing detail." },
        { q: "How does AI help with job descriptions?", a: "PyHire drafts the job description from the requirements already captured on the requisition, so recruiters edit a draft rather than starting from a blank page. Because the draft is generated from the approved requirements, the published description stays anchored to what was actually signed off." },
        { q: "Can I track how much we spend on job boards?", a: "Yes. Posting spend is tracked against the requisition it belongs to, and because applicants arrive tagged with the channel they came from, you can compare boards on the candidates and hires they produced rather than on applications alone." },
        { q: "Can multiple recruiters work on the same role?", a: "Yes. PyHire supports multi-user collaboration with role-based access, so several recruiters, hiring managers and clients can work on the same requisition while each sees only what their role permits." },
        { q: "Does job management connect to the rest of the platform?", a: "It does. The requisition record is the same record used by AI candidate matching, interview management and recruitment analytics. Candidates matched to the role, interviews scheduled against it, and the reporting on how it performed all reference the same job rather than a re-keyed copy of it." },
      ]}
      ctaTitle="Ready to Streamline Your Job Management?"
      ctaDesc="Create, publish, and track your job requisitions in one powerful platform."
      ctaImage="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
    />
  );
}
