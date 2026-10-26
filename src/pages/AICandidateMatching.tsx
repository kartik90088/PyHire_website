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
import { AICandidateMatchingHero } from './AICandidateMatchingHero';

export function AICandidateMatching() {
  return (
    <ProductPageLayout 
      customHero={<AICandidateMatchingHero />}
      
      hero={{ imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" }}
      title="AI Candidate Matching"
      seoTitle="AI Candidate Matching & Resume Screening"
      description="Automatically match candidates to job openings using AI based on skills, experience, education, certifications, and job requirements."
      features={[
        { title: "Deep Profile Analysis", desc: "AI comprehensively reads beyond keywords to understand candidate context.", icon: <BrainCircuit /> },
        { title: "Skill Graph Matching", desc: "Identify adjacent skills and true capability potential for exact job fit.", icon: <Search /> },
        { title: "Instant Scoring", desc: "Receive an immediate match score for every applicant.", icon: <Star /> },
        { title: "Bias Reduction", desc: "Focus strictly on qualifications, neutralizing demographic biases.", icon: <Shield /> }
      ]}
      workflowTitle="How AI Matching Works"
      workflowDesc="Let the AI do the heavy lifting of sorting and ranking your talent pool."
      workflowSteps={[
        { id: "01", title: "Job Requirements", desc: "System ingests the core skills and experience needed.", icon: <Layers className="w-6 h-6 text-[#f97316]" /> },
        { id: "02", title: "Data Ingestion", desc: "Candidate resumes and profiles are processed.", icon: <Filter className="w-6 h-6 text-[#f97316]" /> },
        { id: "03", title: "Semantic Analysis", desc: "AI understands context and meaning behind keywords.", icon: <BrainCircuit className="w-6 h-6 text-[#f97316]" /> },
        { id: "04", title: "Scoring Generation", desc: "Calculates fit percentage against the job requirements.", icon: <Star className="w-6 h-6 text-[#f97316]" /> },
        { id: "05", title: "Ranking", desc: "Surfaces the most qualified candidates to the top.", icon: <BarChart2 className="w-6 h-6 text-[#f97316]" /> },
        { id: "06", title: "Recruiter Action", desc: "Recruiters focus on engaging the best matches immediately.", icon: <Target className="w-6 h-6 text-[#f97316]" /> }
      ]}
      benefitsTitle="Hire Smarter, Not Harder"
      benefitsDesc="Maximize the efficiency of your talent acquisition team with precise recommendations."
      benefitsImage="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
      benefits={[
        { title: "Save Hundreds of Hours", desc: "Eliminate manual resume screening and start interviewing faster.", icon: <Zap /> },
        { title: "Improve Quality of Hire", desc: "Select candidates based on deep, objective criteria matching.", icon: <Target /> },
        { title: "Rediscover Silver Medalists", desc: "Automatically match past candidates to new openings.", icon: <Search /> },
        { title: "Scale Your Hiring", desc: "Handle thousands of applications effortlessly.", icon: <BarChart2 /> }
      ]}
      overview={{
        eyebrow: "AI Candidate Matching",
        title: "Screening that reads for meaning, not for keywords",
        blocks: [
          {
            type: 'p',
            text: "Manual resume screening does not fail because recruiters are careless. It fails because it is a volume problem being solved by attention. A role that attracts four hundred applications gets a few seconds of consideration per resume, and the candidates who are read carefully are the ones who happened to be near the top of the pile.",
          },
          {
            type: 'p',
            text: "**PyHire uses AI to analyse job descriptions and candidate profiles, then match applicants on skills, experience, qualifications and relevance.** Every applicant is evaluated against the same criteria with the same depth, whether they applied first or four hundredth. The output is a ranked shortlist with a fit score attached to each candidate, so the recruiter's attention starts where it is most likely to be productive.",
          },
          {
            type: 'p',
            text: "The distinction that matters is between keyword filtering and semantic analysis. A keyword filter asked for \"React\" rejects a candidate whose resume says \"Next.js\" — the same capability described differently. PyHire reads the context around the terms, so adjacent and equivalent skills are recognised as what they are rather than discarded as absent.",
          },
          {
            type: 'p',
            text: "Matching also runs against candidates already in your database, not only against new applicants. A strong candidate who narrowly missed a role six months ago is re-evaluated automatically when a similar opening is created — which turns your existing talent pool into a live source rather than an archive.",
          },
        ],
        highlights: [
          { label: "Matches on", value: "Skills, experience, education, certifications and the requirements written into the job description." },
          { label: "Best for", value: "Any team where application volume exceeds the hours available to read applications properly." },
          { label: "Recruiter control", value: "Criteria weights are adjustable — skills or certifications critical to a role can be weighted more heavily." },
          { label: "Improves over time", value: "The model refines its understanding of a successful candidate as your organisation makes hiring decisions." },
        ],
      }}
      deepDive={{
        title: "What the AI actually does",
        desc: "Matching is four distinct operations, and the difference between them is where the quality comes from.",
        items: [
          {
            title: "Reading the job description properly",
            blocks: [
              {
                type: 'p',
                text: "Matching quality is capped by how well the requirements are understood. PyHire ingests the core skills, experience level and qualifications from the requisition and the job description, and treats those as the criteria — rather than asking a recruiter to translate a description into a search query by hand.",
              },
              {
                type: 'p',
                text: "This removes a step where a great deal of accuracy is normally lost. A job description written over an hour becomes a three-keyword search, and everything the description said about seniority, domain and context is dropped at that moment.",
              },
            ],
          },
          {
            title: "Understanding context, not matching strings",
            blocks: [
              {
                type: 'p',
                text: "Semantic analysis means the system considers what a resume is describing rather than which exact words it contains. Two candidates who did comparable work at comparable seniority should score comparably, even where neither used the phrasing the job description happened to use.",
              },
              {
                type: 'p',
                text: "Skill-graph matching extends this to **adjacent capability**. A candidate whose demonstrated skills sit next to the ones required is surfaced as a near fit with the gap made visible, instead of being filtered out silently — which is how strong candidates disappear from keyword-driven processes.",
              },
            ],
          },
          {
            title: "Scoring that a recruiter can interrogate",
            blocks: [
              {
                type: 'p',
                text: "Every applicant receives a fit score against the role. The score is not the decision — it is the ordering of the queue, and it comes with the factors that produced it, so a recruiter can see why a candidate ranked where they did.",
              },
              {
                type: 'p',
                text: "Where a particular skill or certification is genuinely non-negotiable, recruiters can weight it more heavily and the ranking recalculates. The criteria stay under human control; what the AI removes is the reading time, not the judgement.",
              },
            ],
          },
          {
            title: "Consistency as a fairness mechanism",
            blocks: [
              {
                type: 'p',
                text: "PyHire's models evaluate on skills, experience and education, which helps reduce the unconscious bias that enters manual screening through name, background or the order a resume happened to arrive in.",
              },
              {
                type: 'p',
                text: "The structural benefit is consistency: the four-hundredth application is assessed against the same criteria, at the same depth, as the first. That is difficult to achieve with human screening at volume regardless of intent, and it is also what makes a hiring decision defensible after the fact.",
              },
            ],
          },
        ],
      }}
      faqsTitle="Frequently Asked Questions"
      faqsDesc="Understand the AI behind PyHire matching."
      faqs={[
        { q: "Is the AI matching process biased?", a: "Our AI models are trained to evaluate purely on skills, experience, and education, which helps reduce the unconscious bias that enters manual screening. Just as importantly, every application is assessed against the same criteria at the same depth — the four-hundredth resume gets the same consideration as the first, which is difficult to guarantee with manual screening at volume." },
        { q: "Can I adjust the matching criteria?", a: "Yes. Recruiters can weight specific skills or certifications more heavily where they are critical to the role, and the ranking recalculates against the new weighting. The criteria remain under human control — what the AI removes is the reading time, not the judgement." },
        { q: "Does the AI learn over time?", a: "Yes. As your team makes hiring decisions, the model refines its understanding of what a successful candidate looks like in your organisation, so matching accuracy improves against your actual outcomes rather than against a generic benchmark." },
        { q: "How is this different from keyword search?", a: "A keyword filter matches strings, so a candidate who wrote \"Next.js\" is rejected by a search for \"React\" despite describing the same capability. PyHire reads the context around the terms, so equivalent and adjacent skills are recognised rather than discarded as absent." },
        { q: "Does matching only apply to new applicants?", a: "No. Matching also runs against candidates already in your database. A strong candidate who narrowly missed a role is automatically re-evaluated when a similar opening is created, which is how silver medallists resurface without anyone having to remember them." },
        { q: "Does the AI make the hiring decision?", a: "No. The score orders the queue and shows the factors behind it; recruiters review the matched candidates and decide who to shortlist. The workflow is explicitly designed so that a human reviews and acts — step 06 of the matching process is recruiter action." },
        { q: "What information does the AI use to match?", a: "PyHire analyses job descriptions and candidate profiles, matching on skills, experience, education, certifications and the requirements captured on the requisition. Because it reads the description directly, the seniority and domain context a recruiter would otherwise have to translate into a search query is preserved." },
        { q: "Can it handle thousands of applications?", a: "Yes — scale is the point. The system processes candidate resumes and profiles in bulk and ranks them against the role, so application volume stops being the constraint on how carefully each application is considered." },
      ]}
      ctaTitle="Experience the Power of AI Matching"
      ctaDesc="Automatically match candidates to job openings using AI based on skills, experience, education, certifications, and job requirements."
      ctaImage="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
    />
  );
}
