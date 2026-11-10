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
import { ComplianceSecurityHero } from './ComplianceSecurityHero';

export function ComplianceSecurity() {
  return (
    <ProductPageLayout 
      customHero={<ComplianceSecurityHero />}
      
      hero={{ imageSrc: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80" }}
      title="Compliance & Security"
      seoTitle="Recruitment Data Security & DPDP Compliance"
      description="Ensure secure recruitment with role-based access control, audit logs, GDPR compliance, document security, and enterprise-grade data protection."
      features={[
        { title: "Enterprise Encryption", desc: "Data is encrypted at rest (AES-256) and in transit (TLS 1.2+).", icon: <Lock /> },
        { title: "Role-Based Access", desc: "Granular permissions ensure users only see the data they need.", icon: <Key /> },
        { title: "GDPR & CCPA Ready", desc: "Built-in tools for data anonymization, consent management, and right-to-be-forgotten requests.", icon: <ShieldCheck /> },
        { title: "Comprehensive Audit Logs", desc: "Track every action, view, and export across your entire workspace.", icon: <Eye /> }
      ]}
      workflowTitle="Secure by Design"
      workflowDesc="How we protect your sensitive candidate and corporate data."
      workflowSteps={[
        { id: "01", title: "Access Control", desc: "Users authenticate via SSO (SAML/OAuth) with MFA enforcement.", icon: <Lock className="w-6 h-6 text-[#6D28D9]" /> },
        { id: "02", title: "Permission Check", desc: "System verifies user roles before granting access to records.", icon: <Key className="w-6 h-6 text-[#6D28D9]" /> },
        { id: "03", title: "Data Encryption", desc: "Information is retrieved via secure, encrypted channels.", icon: <Shield className="w-6 h-6 text-[#6D28D9]" /> },
        { id: "04", title: "Action Auditing", desc: "Every read, write, and export is logged immutably.", icon: <FileText className="w-6 h-6 text-[#6D28D9]" /> },
        { id: "05", title: "Compliance Scans", desc: "Continuous monitoring for PII exposure and policy adherence.", icon: <AlertTriangle className="w-6 h-6 text-[#6D28D9]" /> },
        { id: "06", title: "Data Retention", desc: "Automated deletion of old records per compliance policies.", icon: <Server className="w-6 h-6 text-[#6D28D9]" /> }
      ]}
      benefitsTitle="Peace of Mind for Enterprise"
      benefitsDesc="Focus on hiring while we handle the complex regulatory and security landscape."
      benefitsImage="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
      benefits={[
        { title: "Mitigate Risk", desc: "Prevent data breaches and compliance violations with proactive security measures.", icon: <Shield /> },
        { title: "Global Compliance", desc: "Easily adhere to international privacy laws without manual effort.", icon: <Globe /> },
        { title: "Secure Collaboration", desc: "Share candidate data internally and externally with absolute confidence.", icon: <CheckCircle /> },
        { title: "Automated Governance", desc: "Set retention policies and let the system manage data lifecycles.", icon: <Settings /> }
      ]}
      overview={{
        eyebrow: "Compliance & Security",
        title: "Recruitment data is personal data, and hiring is a regulated activity",
        blocks: [
          {
            type: 'p',
            text: "A recruitment system holds an unusual concentration of sensitive information: identity documents, contact details, employment history, salary expectations, interview assessments and rejection reasons — for people who are not your employees and who never signed anything beyond a consent to be considered.",
          },
          {
            type: 'p',
            text: "**PyHire treats that as the design constraint rather than as a feature to be added later.** Data is encrypted at rest with AES-256 and in transit over TLS 1.2 or above. Access is governed by role-based permissions checked before any record is returned. Every action, view and export is written to an audit log. Retention policies run automatically against the records that have passed their retention period.",
          },
          {
            type: 'p',
            text: "Two obligations sit in tension in every recruitment system, and both have to be met. Candidates have a right to have their data erased. Regulators and clients expect a complete, unaltered record of how hiring decisions were made. PyHire's approach is anonymisation in place — personal identifiers are removed while the process record they belonged to remains intact — so a right-to-be-forgotten request does not create a hole in an audit trail.",
          },
          {
            type: 'p',
            text: "For teams hiring in India, this is what DPDP readiness means in practice: consent captured at the point of collection, purpose limitation enforced by access control, retention handled by policy rather than by remembering, and erasure honoured without destroying the evidence of a defensible process.",
          },
        ],
        highlights: [
          { label: "Encryption", value: "AES-256 at rest, TLS 1.2 or above in transit." },
          { label: "Access control", value: "Role-based permissions verified before records are returned, with SSO via SAML/OAuth and MFA enforcement." },
          { label: "Privacy tooling", value: "Built-in data anonymisation, consent management, and right-to-be-forgotten handling for GDPR and CCPA." },
          { label: "Audit", value: "Every read, write and export logged immutably, across the whole workspace." },
        ],
      }}
      deepDive={{
        title: "What enterprise-grade actually means here",
        desc: "Four controls that determine whether a recruitment platform can be trusted with candidate data.",
        items: [
          {
            title: "Access control that is enforced, not advisory",
            blocks: [
              {
                type: 'p',
                text: "Users authenticate through SSO using SAML or OAuth with MFA enforcement, and every request is checked against the user's role before any record is returned.",
              },
              {
                type: 'p',
                text: "The distinction that matters is where the check happens. Hiding a record from a user interface is not access control — the data was still retrieved. PyHire verifies permission before granting access to the record, which is what makes it safe to give clients and external vendors direct access to the parts of the system that concern them.",
              },
              {
                type: 'p',
                text: "In multi-client and multi-vendor operations this is the control that carries the most weight: **granular permissions ensure each party sees only what they need to,** and that boundary is enforced by the platform rather than by policy.",
              },
            ],
          },
          {
            title: "Encryption and the shape of the data",
            blocks: [
              {
                type: 'p',
                text: "Candidate data is encrypted at rest using AES-256, and all traffic is carried over TLS 1.2 or above. Documents — resumes, identity papers, offer letters — are handled under the same protection as structured records.",
              },
              {
                type: 'p',
                text: "Continuous compliance scanning monitors for PII exposure and policy adherence, which addresses the practical failure mode in recruitment: sensitive information arriving in an unexpected place, such as a document attached where it did not belong.",
              },
            ],
          },
          {
            title: "Audit logs that hold up under review",
            blocks: [
              {
                type: 'p',
                text: "Every read, write and export is logged immutably. The log covers viewing, not only editing — which matters, because unauthorised access to candidate data usually looks like reading it rather than changing it.",
              },
              {
                type: 'p',
                text: "An immutable log is also what makes a hiring process defensible. When a decision is challenged, the question is what was actually done and by whom, and a record that could have been amended afterwards does not answer it.",
              },
              {
                type: 'p',
                text: "Communication history is held to the same standard: a complete, uneditable trail of every interaction with a candidate.",
              },
            ],
          },
          {
            title: "Retention and erasure without contradiction",
            blocks: [
              {
                type: 'p',
                text: "Retention policies are configured once and enforced automatically, so records that have passed their retention period are deleted on schedule rather than accumulating until someone notices.",
              },
              {
                type: 'p',
                text: "Right-to-be-forgotten requests are handled through anonymisation in place. Personal identifiers are removed from the candidate record while the process history that references it stays intact — so the individual is no longer identifiable and the audit chain is not broken.",
              },
              {
                type: 'p',
                text: "Consent management records what a candidate agreed to and when, which is the evidence a regulator asks for first when questioning why data was held at all.",
              },
            ],
          },
        ],
      }}
      useCases={{
        title: "Who this matters to",
        desc: "Compliance requirements arrive from different directions depending on where and how you hire.",
        items: [
          {
            persona: "In-house HR teams in India",
            situation: "DPDP obligations around consent, purpose limitation and erasure apply, but the hiring process runs on tools that were not built with them in mind.",
            outcome: "Consent, retention and erasure are handled by the platform's own workflows rather than by manual discipline.",
          },
          {
            persona: "Organisations hiring internationally",
            situation: "GDPR and CCPA add anonymisation, consent and right-to-be-forgotten requirements on top of local law.",
            outcome: "Built-in privacy tooling means international obligations are met without a separate manual process per jurisdiction.",
          },
          {
            persona: "Agencies handling client candidate data",
            situation: "Client data protection obligations flow through to you as a processor, and clients audit for it.",
            outcome: "Role-based access, encryption and complete audit logs make data handling demonstrable rather than asserted.",
          },
          {
            persona: "Enterprise security and IT teams",
            situation: "A new system needs to meet identity, access and logging standards before it can be approved.",
            outcome: "SSO with SAML/OAuth, MFA enforcement, encryption in transit and at rest, and immutable workspace-wide audit logs.",
          },
        ],
      }}
      faqsTitle="Frequently Asked Questions"
      faqsDesc="Learn about our security practices."
      faqs={[
        { q: "Is PyHire SOC 2 Compliant?", a: "Yes, we undergo regular SOC 2 Type II audits to verify our security controls." },
        { q: "Do you support Single Sign-On (SSO)?", a: "Yes, we support SAML 2.0 integrations with Okta, Azure AD, Google Workspace, and more. SSO is available on the enterprise plan, and MFA can be enforced at the point of authentication." },
        { q: "Where is candidate data hosted?", a: "Data is hosted in secure AWS/GCP regions, with options for EU-only or US-only data residency." },
        { q: "How is candidate data encrypted?", a: "Data is encrypted at rest using AES-256 and in transit over TLS 1.2 or above. Documents such as resumes, identity papers and offer letters are protected on the same basis as structured candidate records." },
        { q: "How do you handle right-to-be-forgotten requests?", a: "Through anonymisation in place. Personal identifiers are removed from the candidate record while the process history referencing it remains intact, so the individual is no longer identifiable and the audit chain is not broken. This is what allows erasure obligations and record-keeping obligations to be met at the same time." },
        { q: "What do the audit logs actually capture?", a: "Every action, view and export across the workspace, written immutably. The log covers reads and not only changes, because unauthorised access to candidate data usually takes the form of viewing it rather than editing it." },
        { q: "Is PyHire ready for India's DPDP Act?", a: "PyHire's controls are aligned for DPDPA: consent is captured at the point of collection, purpose limitation is enforced through role-based access, retention runs on policy rather than on memory, and erasure is honoured without destroying the process record." },
        { q: "Can we set our own data retention periods?", a: "Yes. Retention policies are configured once and enforced automatically, so records that pass their retention period are removed on schedule rather than accumulating until someone reviews them." },
      ]}
      ctaTitle="Ready to Secure Your Recruitment?"
      ctaDesc="Ensure compliance, protect candidate privacy, and secure your hiring data with PyHire."
      ctaImage="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
    />
  );
}

// Add Globe
