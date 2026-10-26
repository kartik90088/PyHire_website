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
import { UnifiedCommunicationHero } from './UnifiedCommunicationHero';

export function UnifiedCommunication() {
  return (
    <ProductPageLayout 
      customHero={<UnifiedCommunicationHero />}
      
      hero={{ imageSrc: "/unified-communication-team.webp" }}
      title="Unified Communication"
      seoTitle="Omnichannel Recruitment Inbox & Messaging"
      description="Manage Email, WhatsApp, SMS, Calling, and internal recruiter communication from one unified inbox."
      features={[
        { title: "Omnichannel Inbox", desc: "View and reply to emails, SMS, and WhatsApp messages from a single thread.", icon: <Inbox /> },
        { title: "Automated Sequences", desc: "Set up multi-channel drip campaigns to nurture passive talent.", icon: <Zap /> },
        { title: "Internal Collaboration", desc: "@mention teammates and leave internal notes on candidate profiles.", icon: <Users /> },
        { title: "Communication History", desc: "A complete, uneditable audit trail of every interaction with a candidate.", icon: <History /> }
      ]}
      workflowTitle="How Unified Communication Works"
      workflowDesc="Keep candidates engaged without losing track of the conversation."
      workflowSteps={[
        { id: "01", title: "Connect Channels", desc: "Sync your work email, WhatsApp Business, and SMS providers.", icon: <Phone className="w-6 h-6 text-[#f97316]" /> },
        { id: "02", title: "Candidate Outreach", desc: "Initiate contact via the candidate's preferred channel.", icon: <Send className="w-6 h-6 text-[#f97316]" /> },
        { id: "03", title: "Centralized Replies", desc: "All candidate responses route to the unified candidate timeline.", icon: <Inbox className="w-6 h-6 text-[#f97316]" /> },
        { id: "04", title: "Team Visibility", desc: "The entire hiring team can see the communication history.", icon: <Users className="w-6 h-6 text-[#f97316]" /> },
        { id: "05", title: "Automated Follow-ups", desc: "Trigger automated messages based on pipeline stage changes.", icon: <Clock className="w-6 h-6 text-[#f97316]" /> },
        { id: "06", title: "Internal Alignment", desc: "Discuss candidates internally using private profile notes.", icon: <MessageSquare className="w-6 h-6 text-[#f97316]" /> }
      ]}
      benefitsTitle="Connect Faster, Hire Better"
      benefitsDesc="Never let a top candidate slip through the cracks due to missed emails or unread texts."
      benefitsImage="https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=800&q=80"
      benefits={[
        { title: "Higher Response Rates", desc: "Reach candidates where they are most active, like WhatsApp or SMS.", icon: <Smartphone /> },
        { title: "No Context Switching", desc: "Stop switching between your email client, phone, and ATS.", icon: <Inbox /> },
        { title: "Perfect Team Alignment", desc: "Prevent multiple recruiters from accidentally contacting the same candidate.", icon: <CheckCircle /> },
        { title: "Instant Notifications", desc: "Get real-time alerts when a high-priority candidate replies.", icon: <Bell /> }
      ]}
      overview={{
        eyebrow: "Unified Communication",
        title: "One conversation, however many channels it travelled through",
        blocks: [
          {
            type: 'p',
            text: "A single candidate relationship routinely spans four channels. The first approach goes out by email. The reply comes on WhatsApp because that is where the candidate actually reads messages. A scheduling detail is confirmed by SMS. A phone call settles the salary question. Each of those exchanges lands somewhere different, and none of them are in the hiring record.",
          },
          {
            type: 'p',
            text: "**PyHire brings email, WhatsApp, SMS, calling and internal recruiter discussion into one inbox,** threaded against the candidate rather than scattered across the tools they happened to arrive in. A recruiter picking up a conversation sees everything that has already been said, regardless of who said it or where.",
          },
          {
            type: 'p',
            text: "This solves a coordination problem before it solves a productivity one. When communication history lives in individual inboxes, two recruiters can contact the same candidate about different roles in the same week, and neither knows. From the candidate's side, that reads as an organisation that does not talk to itself — which is a real cost at the exact moment you are asking them to trust you.",
          },
          {
            type: 'p',
            text: "The record is also permanent. Communication history is a complete, uneditable trail of every interaction with a candidate, which means the answer to \"what did we actually promise them\" exists in the system rather than in someone's memory of a call.",
          },
        ],
        highlights: [
          { label: "Channels", value: "Email, WhatsApp, SMS, calling, and internal recruiter notes — in one threaded view." },
          { label: "Email sync", value: "Bi-directional sync with Google Workspace and Microsoft 365, so replies land in both places." },
          { label: "WhatsApp", value: "Supported through the WhatsApp Business API for global candidate messaging." },
          { label: "Record keeping", value: "A complete, uneditable audit trail of every interaction, attached to the candidate." },
        ],
      }}
      deepDive={{
        title: "What a unified inbox actually changes",
        desc: "Reach, coordination, follow-up and record — the four things that break when conversations live in separate tools.",
        items: [
          {
            title: "Meeting candidates on the channel they use",
            blocks: [
              {
                type: 'p',
                text: "Response rates are largely a function of where a message arrives. An email to a working candidate competes with everything else in a crowded inbox; a WhatsApp or SMS message is read within minutes.",
              },
              {
                type: 'p',
                text: "PyHire lets recruiters initiate contact on the candidate's preferred channel and, critically, **reply from where the message was sent.** A conversation that starts on WhatsApp continues on WhatsApp rather than being answered by email that the candidate may never open.",
              },
              {
                type: 'p',
                text: "All of it still routes back to the unified candidate timeline, so channel flexibility does not cost you the record.",
              },
            ],
          },
          {
            title: "Preventing the duplicate-outreach problem",
            blocks: [
              {
                type: 'p',
                text: "The entire hiring team can see a candidate's communication history. That visibility is what stops two recruiters approaching the same person about different roles, or a colleague repeating an outreach that was already declined last month.",
              },
              {
                type: 'p',
                text: "Internal discussion happens in the same place, through @mentions and private notes on the candidate profile, so the conversation about a candidate sits next to the conversation with them — without any risk of the two being confused.",
              },
            ],
          },
          {
            title: "Follow-up that does not depend on remembering",
            blocks: [
              {
                type: 'p',
                text: "Automated sequences send multi-channel follow-ups triggered by pipeline stage changes, so a candidate who has moved to a new stage hears about it without a recruiter having to notice.",
              },
              {
                type: 'p',
                text: "Most candidate drop-off is not caused by rejection. It is caused by silence during the gaps in a process — the days between application and screen, or between interview and outcome, where a candidate reasonably concludes nothing is happening.",
              },
              {
                type: 'p',
                text: "Real-time notifications work the other way: when a high-priority candidate replies, the recruiter knows immediately rather than at the next inbox check.",
              },
            ],
          },
          {
            title: "An audit trail, not just a message log",
            blocks: [
              {
                type: 'p',
                text: "Every interaction is retained as a complete and uneditable history. Nothing is quietly amended after the fact, which is what makes the record usable as evidence rather than merely as a reference.",
              },
              {
                type: 'p',
                text: "For agencies this matters commercially — what was committed to a client or a candidate is recorded. For regulated hiring it matters legally, because candidate communication is part of what a defensible process has to be able to show.",
              },
            ],
          },
        ],
      }}
      faqsTitle="Frequently Asked Questions"
      faqsDesc="Learn more about our communication tools."
      faqs={[
        { q: "Does PyHire integrate with Gmail and Outlook?", a: "Yes. PyHire offers bi-directional sync with both Google Workspace and Microsoft 365, so messages sent from PyHire appear in your mail client and replies received there flow back into the candidate timeline." },
        { q: "Can I send bulk messages?", a: "Yes. You can send personalized mass emails or SMS to segmented talent pools, and set up automated multi-channel sequences to nurture passive candidates over time rather than in a single send." },
        { q: "Is WhatsApp integration supported globally?", a: "Yes. PyHire supports the WhatsApp Business API for global candidate messaging, which matters in markets where WhatsApp — not email — is where working candidates actually read messages." },
        { q: "Can I reply on the same channel the candidate used?", a: "Yes, and this is the point of the omnichannel inbox. A conversation that started on WhatsApp continues on WhatsApp rather than being answered by an email the candidate may never open. Every channel still routes back into one threaded candidate timeline." },
        { q: "How does this stop two recruiters contacting the same candidate?", a: "The whole hiring team can see a candidate's communication history, so prior contact is visible before anyone sends a new message. That visibility is what prevents duplicate outreach — which candidates read as an organisation that does not talk to itself." },
        { q: "Can the team discuss a candidate privately?", a: "Yes. Internal collaboration happens on the candidate profile through @mentions and private notes, kept clearly separate from the messages sent to the candidate." },
        { q: "Can follow-ups be automated?", a: "Yes. Automated sequences trigger on pipeline stage changes, so candidates hear from you during the gaps in a process without a recruiter having to remember. Most drop-off comes from silence rather than rejection." },
        { q: "Can communication history be edited or deleted?", a: "No. Communication history is a complete, uneditable audit trail of every interaction with a candidate. That immutability is what makes it usable as evidence of what was actually said and committed." },
      ]}
      ctaTitle="Ready to Centralize Your Communications?"
      ctaDesc="Manage Email, WhatsApp, SMS, Calling, and internal collaboration from one unified platform."
      ctaImage="/unified-communication-team.webp"
    />
  );
}
