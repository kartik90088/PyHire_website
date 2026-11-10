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
import { InterviewManagementHero } from './InterviewManagementHero';

export function InterviewManagement() {
  return (
    <ProductPageLayout 
      customHero={<InterviewManagementHero />}
      
      hero={{ imageSrc: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80" }}
      title="Interview Management"
      seoTitle="Interview Scheduling & Scorecard Software"
      description="Schedule interviews, coordinate interview panels, collect structured feedback, and manage interview workflows from one platform."
      features={[
        { title: "Smart Scheduling", desc: "Automated calendar syncing to find the perfect time for candidates and interviewers.", icon: <Calendar /> },
        { title: "Video Integration", desc: "Native integrations with Zoom, Teams, and Google Meet.", icon: <Video /> },
        { title: "Structured Scorecards", desc: "Standardize evaluations with customizable interview scorecards.", icon: <ClipboardList /> },
        { title: "Panel Coordination", desc: "Easily manage multi-stage and multi-interviewer panels.", icon: <Users /> }
      ]}
      workflowTitle="Seamless Interview Workflows"
      workflowDesc="Coordinate complex interview processes with absolute simplicity."
      workflowSteps={[
        { id: "01", title: "Select Candidates", desc: "Move shortlisted candidates to the interview stage.", icon: <Users className="w-6 h-6 text-[#6D28D9]" /> },
        { id: "02", title: "Find Availability", desc: "System auto-suggests slots based on interviewer calendars.", icon: <Clock className="w-6 h-6 text-[#6D28D9]" /> },
        { id: "03", title: "Send Invites", desc: "Automated calendar invites with video links.", icon: <CalendarCheck className="w-6 h-6 text-[#6D28D9]" /> },
        { id: "04", title: "Conduct Interview", desc: "Interviewers access candidate profiles and scorecards instantly.", icon: <Video className="w-6 h-6 text-[#6D28D9]" /> },
        { id: "05", title: "Submit Feedback", desc: "Prompt interviewers to complete scorecards post-interview.", icon: <FileQuestion className="w-6 h-6 text-[#6D28D9]" /> },
        { id: "06", title: "Make Decision", desc: "Review consolidated feedback to make a hiring choice.", icon: <CheckCircle className="w-6 h-6 text-[#6D28D9]" /> }
      ]}
      benefitsTitle="Better Interviews, Better Hires"
      benefitsDesc="Create a frictionless experience for both your hiring team and your candidates."
      benefitsImage="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80"
      benefits={[
        { title: "Eliminate Scheduling Ping-Pong", desc: "No more endless emails to find a time that works.", icon: <Clock /> },
        { title: "Objective Evaluations", desc: "Standardized scorecards ensure fair and consistent candidate assessment.", icon: <Star /> },
        { title: "Faster Feedback Loops", desc: "Automated reminders ensure interviewers submit feedback promptly.", icon: <MessageSquare /> },
        { title: "Candidate Experience", desc: "Provide a professional, organized scheduling experience.", icon: <Users /> }
      ]}
      overview={{
        eyebrow: "Interview Management",
        title: "The stage where good candidates are most often lost",
        blocks: [
          {
            type: 'p',
            text: "Interviewing is the most expensive part of hiring and the least systematised. A panel interview consumes an hour from four senior people, plus the coordination that arranged it — and the output is frequently four opinions in four different formats, arriving over the following week, in a channel that is not the hiring record.",
          },
          {
            type: 'p',
            text: "**PyHire manages the whole interview stage in one place:** finding a time that works across calendars, sending the invite with the video link attached, giving interviewers the candidate profile and scorecard when they need them, and collecting structured feedback afterwards so a decision can actually be made.",
          },
          {
            type: 'p',
            text: "Two problems get solved by that. The first is scheduling friction — the back-and-forth that adds days to a process while a candidate in demand is talking to other employers. The second is evaluation drift: when every interviewer assesses against their own private criteria, feedback cannot be compared, and the decision falls to whoever was most confident rather than whoever was most accurate.",
          },
          {
            type: 'p',
            text: "Structured scorecards fix the second by asking every interviewer the same questions about the same competencies. That makes feedback comparable across a panel, across candidates for the same role, and across roles over time — which is the point at which interview data becomes something you can improve against rather than just record.",
          },
        ],
        highlights: [
          { label: "Integrates with", value: "Zoom, Microsoft Teams and Google Meet for video; Google Workspace and Microsoft 365/Outlook for calendars." },
          { label: "Best for", value: "Any team running multi-stage or multi-interviewer processes, where coordination cost is real." },
          { label: "Scorecards", value: "Customisable per job and per interview stage, so a screening call and a final panel ask different things." },
          { label: "Candidate-facing", value: "Self-scheduling links let candidates pick from available slots instead of waiting on an email thread." },
        ],
      }}
      deepDive={{
        title: "How PyHire handles the interview stage",
        desc: "Scheduling, panels, evaluation and decision — the four places interview processes usually lose time.",
        items: [
          {
            title: "Scheduling without the back-and-forth",
            blocks: [
              {
                type: 'p',
                text: "PyHire syncs with interviewer calendars and suggests slots that are genuinely free, rather than proposing times that then have to be withdrawn. Invites go out automatically with the video conference link already attached.",
              },
              {
                type: 'p',
                text: "Candidates can be sent a self-scheduling link to pick from the available slots themselves. That removes the single slowest exchange in most hiring processes — the one where a recruiter proposes three times, the candidate can do none of them, and two days have passed.",
              },
              {
                type: 'p',
                text: "For a candidate weighing several offers, those two days are often decisive, which is why scheduling speed shows up in outcomes and not just in recruiter workload.",
              },
            ],
          },
          {
            title: "Panels that stay coordinated",
            blocks: [
              {
                type: 'p',
                text: "Multi-stage and multi-interviewer processes are managed as a unit. The panel for a given stage is defined on the role, everyone is invited together, and each interviewer can see which stage they are conducting and what has already been assessed.",
              },
              {
                type: 'p',
                text: "Interviewers open the candidate's profile and their scorecard from the invite, so nobody arrives at an interview reading a resume for the first time in the first two minutes — and nobody re-asks a question the previous round already covered.",
              },
            ],
          },
          {
            title: "Structured, comparable evaluation",
            blocks: [
              {
                type: 'p',
                text: "Scorecards are customisable per job and per interview stage. A first-round screening and a final technical panel are assessing different things and should ask different questions; both are still recorded in a comparable structure.",
              },
              {
                type: 'p',
                text: "Standardising the criteria is what makes evaluation objective in a practical sense: candidates for the same role are assessed against the same competencies rather than against whatever each interviewer thought to probe that day.",
              },
              {
                type: 'p',
                text: "It also produces a record. When a hiring decision is questioned later — internally or by a candidate — the basis for it exists in a reviewable form.",
              },
            ],
          },
          {
            title: "Feedback that arrives while it is still useful",
            blocks: [
              {
                type: 'p',
                text: "Interviewers are prompted to complete their scorecard after the interview, and automated reminders follow up on the ones outstanding. Feedback that arrives a week late has already lost most of its detail and all of its urgency.",
              },
              {
                type: 'p',
                text: "Once the panel's scorecards are in, they are consolidated into a single view for the decision — so the hiring conversation starts from assembled evidence rather than from someone recalling what they thought.",
              },
            ],
          },
        ],
      }}
      faqsTitle="Frequently Asked Questions"
      faqsDesc="Learn how PyHire simplifies interviews."
      faqs={[
        { q: "Does it sync with our corporate calendars?", a: "Yes. PyHire integrates with Google Workspace and Microsoft 365/Outlook calendars, so suggested interview slots reflect interviewers' real availability rather than times that have to be withdrawn once someone checks their diary." },
        { q: "Can we set up custom scorecards for different roles?", a: "Absolutely. Scorecards are fully customizable per job and per interview stage, so a first-round screening call and a final technical panel can assess different competencies while both still produce comparable, structured feedback." },
        { q: "Can candidates self-schedule?", a: "Yes. You can send a link that lets candidates pick a time from the available slots themselves. This removes the slowest exchange in most processes — the round trip where a recruiter proposes times and the candidate can make none of them." },
        { q: "Which video conferencing tools do you support?", a: "PyHire integrates natively with Zoom, Microsoft Teams and Google Meet. The conference link is generated and attached to the calendar invite automatically, so nobody is sending joining details separately." },
        { q: "How do you make sure interviewers actually submit feedback?", a: "Interviewers are prompted to complete their scorecard after the interview, and automated reminders chase the ones still outstanding. Feedback that arrives a week later has lost most of its detail, so the reminders exist to protect the quality of the decision, not just the completeness of the record." },
        { q: "Can interviewers see the candidate's details before the interview?", a: "Yes. Interviewers open the candidate profile and their scorecard directly from the invite, so they arrive prepared and can see what earlier stages already assessed rather than repeating those questions." },
        { q: "How does feedback get turned into a decision?", a: "Completed scorecards from the panel are consolidated into a single view. Because every interviewer assessed the same competencies, the feedback can be compared directly instead of being reconciled from four different formats." },
        { q: "Does interview data connect to reporting?", a: "It does. Interview stages, scheduling and outcomes feed recruitment analytics, so stage-by-stage velocity — including how long candidates wait between shortlist and interview — is measurable rather than anecdotal." },
      ]}
      ctaTitle="Ready to Perfect Your Interview Process?"
      ctaDesc="Coordinate panels, schedule effortlessly, and gather structured feedback with PyHire."
      ctaImage="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
    />
  );
}
