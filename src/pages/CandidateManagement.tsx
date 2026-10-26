import React, { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Search, BarChart, MessageSquare, CheckCircle, Users, UserPlus, FileText, User, Sparkles, Calendar, Star, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { DEMO_PATH, QUOTE_PATH } from "../lib/routes";
import { useSeo } from "../lib/useSeo";
import { absoluteUrl } from "../lib/site";
import { CandidateManagementHero } from "./CandidateManagementHero";
import { Prose } from "../components/Prose";
import type { Block } from "../lib/content";

export function CandidateManagement() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* The only platform page not driven by ProductPageLayout, so it sets its own
     metadata rather than inheriting the generic shell title. */
  useSeo({
    title: 'Candidate Management | PyHire',
    description:
      'PyHire simplifies candidate management with AI-powered automation, resume parsing, smart search, and a unified profile for every candidate.',
    canonicalPath: '/candidate-management',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Candidate Management',
            item: absoluteUrl('/candidate-management'),
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${absoluteUrl('/candidate-management')}#faq`,
        mainEntity: candidateFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  });

  return (
    <main className="pt-12 bg-white min-h-screen font-sans overflow-hidden">
      
      {/* 1. Hero Section */}
      <CandidateManagementHero />

      {/* 1b. Overview — long-form introduction */}
      <CandidateOverviewSection />

      {/* 2. Features Section */}
      <section className="py-4 lg:py-8 bg-[#FFFCF4]">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-8">
            {/* h2, not h1 — CandidateManagementHero owns this page's single h1. */}
            <h2 className="text-[2.5rem] font-bold text-[#111111] mb-4 tracking-tight">
              Everything You Need to<br />Manage Candidates Efficiently
            </h2>
            <p className="text-[1.125rem] text-[#4B5563] max-w-3xl mx-auto">
              Powerful features to help you attract, engage, and hire the best talent with a great candidate experience.
            </p>
          </div>

          <div className="relative overflow-hidden w-full mask-image-fade" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="flex gap-6 animate-[marqueeHorizontal_30s_linear_infinite] hover:[animation-play-state:paused] w-max py-4">
              {[...features, ...features].map((feature, idx) => (
                <div key={idx} className="w-[280px] sm:w-[300px] shrink-0 bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#f2f2f2] flex flex-col hover:-translate-y-1 transition-transform">
                  <div className="h-32 bg-[#FFF8F3] rounded-[16px] mb-6 flex items-center justify-center border border-orange-50 overflow-hidden relative">
                     {feature.illustration}
                  </div>
                  <h3 className="text-[1.125rem] font-bold text-[#111111] mb-2 leading-snug">{feature.title}</h3>
                  <p className="text-[#4B5563] text-[13px] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
            <style>{`
              @keyframes marqueeHorizontal {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* 2b. Capability detail */}
      <CapabilityDetailSection />

      {/* 3. Workflow Section */}
      <WorkflowSection />

      {/* 4. Benefits Section */}
      <section className="py-4 lg:py-8 bg-[#FFFCF4]">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">
            
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-[3rem] font-bold text-[#111111] leading-[1.1] mb-6">
                  Manage Candidates <br/>
                  <span className="relative inline-block">
                    with Ease
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-400" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3"/>
                    </svg>
                  </span>
                </h2>
                <p className="text-[1.125rem] text-[#4B5563] leading-relaxed">
                  PyHire simplifies candidate management with AI-powered automation, smarter workflows, and seamless collaboration.
                </p>
              </div>

              {/* Composition Image */}
              <div className="relative w-full aspect-[4/3] bg-white rounded-[32px] border border-slate-100 shadow-xl p-4">
                 <img 
                   src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80" 
                   className="w-full h-full object-cover rounded-[24px]"
                   alt="Recruiter working"
                 />
                 
                 {/* Floating Card 1 */}
                 <div className="absolute top-8 -left-6 bg-white p-4 rounded-[16px] shadow-lg border border-slate-100 flex flex-col items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">AI Match Score</span>
                    <div className="relative w-16 h-16 rounded-full border-4 border-orange-100 border-t-[#f97316] flex items-center justify-center">
                      <span className="text-xl font-bold text-[#111]">98%</span>
                    </div>
                 </div>

                 {/* Floating Card 2 */}
                 <div className="absolute bottom-12 -right-6 bg-white p-4 rounded-[16px] shadow-lg border border-slate-100 flex items-center gap-4">
                    <img alt="" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="text-sm font-bold text-[#111]">Rahul Sharma</div>
                      <div className="text-[11px] text-slate-500">Frontend Developer</div>
                    </div>
                 </div>
                 
                 {/* Floating Card 3 */}
                 <div className="absolute bottom-6 left-6 bg-white p-4 rounded-[16px] shadow-lg border border-slate-100 flex flex-col gap-3">
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Hiring Pipeline</span>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div><span className="text-[11px] font-medium">Applied</span></div>
                      <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div><span className="text-[11px] font-medium">Screened</span></div>
                      <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full border-2 border-orange-500"></div><span className="text-[11px] font-medium">Interviewing</span></div>
                      <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full border-2 border-slate-200"></div><span className="text-[11px] font-medium text-slate-400">Offer</span></div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right Column (List) */}
            <div className="relative h-[600px] overflow-hidden mask-image-fade" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)' }}>
              <div className="flex flex-col gap-6 animate-[marqueeVertical_30s_linear_infinite] hover:[animation-play-state:paused] pt-4">
                {[
                  { title: "Reduce Manual Screening", desc: "Automatically shortlist the most relevant candidates using AI matching capabilities.", icon: <Search className="w-6 h-6" /> },
                  { title: "Improve Recruiter Productivity", desc: "Spend less time on administrative tasks and more time engaging with top talent.", icon: <BarChart className="w-6 h-6" /> },
                  { title: "Enhance Candidate Experience", desc: "Respond faster, maintain consistent communication, and reduce hiring delays.", icon: <MessageSquare className="w-6 h-6" /> },
                  { title: "Better Hiring Decisions", desc: "Involve multiple stakeholders, collect clear feedback, and evaluate talent objectively.", icon: <CheckCircle className="w-6 h-6" /> },
                  { title: "Build a Strong Talent Pool", desc: "Create reusable candidate databases for future hiring requirements.", icon: <Users className="w-6 h-6" /> },
                  { title: "Reduce Manual Screening", desc: "Automatically shortlist the most relevant candidates using AI matching capabilities.", icon: <Search className="w-6 h-6" /> },
                  { title: "Improve Recruiter Productivity", desc: "Spend less time on administrative tasks and more time engaging with top talent.", icon: <BarChart className="w-6 h-6" /> },
                  { title: "Enhance Candidate Experience", desc: "Respond faster, maintain consistent communication, and reduce hiring delays.", icon: <MessageSquare className="w-6 h-6" /> },
                  { title: "Better Hiring Decisions", desc: "Involve multiple stakeholders, collect clear feedback, and evaluate talent objectively.", icon: <CheckCircle className="w-6 h-6" /> },
                  { title: "Build a Strong Talent Pool", desc: "Create reusable candidate databases for future hiring requirements.", icon: <Users className="w-6 h-6" /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-5 bg-white p-6 rounded-[20px] border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:border-orange-100 transition-colors shrink-0">
                    <div className="w-14 h-14 shrink-0 bg-[#FFF8F3] text-[#f97316] rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[1.125rem] font-bold text-[#111111] mb-1.5">{item.title}</h4>
                      <p className="text-[14px] text-[#4B5563] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <style>{`
                @keyframes marqueeVertical {
                  0% { transform: translateY(0%); }
                  100% { transform: translateY(-50%); }
                }
              `}</style>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <FAQSection />

      {/* 6. Final CTA Section */}
      <FinalCTASection />

    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Long-form copy                                                      */
/*                                                                     */
/* This page carried roughly 570 words before these sections — the     */
/* flagship platform page, and thinner than any blog post on the site. */
/* The blocks below say in full sentences what the feature cards and   */
/* the nine-step timeline can only label.                              */
/* ------------------------------------------------------------------ */

const overviewBlocks: Block[] = [
  {
    type: 'p',
    text: "Candidate management is the part of recruitment that quietly decides everything else. A strong sourcing channel is wasted if applications pile up faster than anyone can read them. A good interview process cannot help a candidate who was never shortlisted because their resume used different words. And a candidate who applied last year for a role that went to someone else is, in most systems, effectively gone — even though they may be the best fit for the opening you are about to publish.",
  },
  {
    type: 'p',
    text: "**PyHire treats the candidate, not the application, as the unit of record.** A person who applies to four roles over two years has one profile, carrying every resume they have submitted, every message exchanged with them, every interview they attended and every assessment recorded. Applications attach to that profile rather than duplicating it.",
  },
  {
    type: 'p',
    text: "That single decision resolves most of what makes candidate databases difficult. There is no reconciling of duplicate records, no question of which copy is current, and no situation where one recruiter is unaware of what another already discussed with the same person. The complete history is where it belongs — on the candidate.",
  },
  {
    type: 'p',
    text: "Around that record, PyHire automates the work that does not need judgement. Resumes are parsed into structured profiles on arrival. AI matches candidates to suitable openings. Pipelines move candidates through stages configured for the specific role. Communication is logged automatically. What is left for the recruiter is the part that actually requires a recruiter: deciding who to talk to, and talking to them.",
  },
];

const capabilityDetail: { title: string; blocks: Block[] }[] = [
  {
    title: "One profile, however many times they apply",
    blocks: [
      {
        type: 'p',
        text: "Candidates can be associated with multiple positions while maintaining a single unified profile. The profile holds their resumes, their communication history, their interview scorecards and their progress on every role they have been considered for.",
      },
      {
        type: 'p',
        text: "This is what makes a talent pool usable rather than merely large. A recruiter looking at a candidate sees that they interviewed for a similar role eight months ago and why it did not proceed — which is the context that determines whether to approach them again and what to say.",
      },
    ],
  },
  {
    title: "Resume parsing that produces structure, not text",
    blocks: [
      {
        type: 'p',
        text: "PyHire extracts skills, experience and contact details from resumes automatically and builds a structured profile from them. The difference between a stored document and a structured record is searchability: a PDF sitting in a folder can only be found by someone who remembers it exists.",
      },
      {
        type: 'p',
        text: "Structured fields are also what make matching and filtering possible at all. Every downstream capability — AI matching, smart search, pipeline reporting — depends on the profile having been parsed properly at the point of entry.",
      },
    ],
  },
  {
    title: "Search that finds people you had forgotten",
    blocks: [
      {
        type: 'p',
        text: "Smart candidate search queries the whole database on skills, experience and qualifications rather than requiring exact keyword matches. Combined with AI matching, past applicants are automatically re-evaluated against new openings.",
      },
      {
        type: 'p',
        text: "For an established team this is often the highest-value capability on the page. The candidates most likely to fit your next role are frequently already in your system — they applied before, they were good, and the timing was wrong.",
      },
    ],
  },
  {
    title: "Pipelines and a timeline that records itself",
    blocks: [
      {
        type: 'p',
        text: "Automated pipelines move candidates through the stages configured for each specific role, and every movement, message and assessment is written to the candidate's activity timeline as it happens.",
      },
      {
        type: 'p',
        text: "Because the timeline is a by-product of the work rather than something anyone has to maintain, it is still accurate months later — when a hiring decision is being reviewed, or a candidate asks what happened to their application.",
      },
    ],
  },
];

function CandidateOverviewSection() {
  return (
    <section className="py-10 lg:py-16 bg-white border-t border-slate-100">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="w-full lg:w-[62%]">
            <span className="text-[#f97316] font-bold text-[13px] uppercase tracking-wider mb-3 block">
              Candidate Management
            </span>
            <h2 className="text-[2rem] lg:text-[2.75rem] font-bold text-[#111111] leading-[1.15] tracking-tight mb-6">
              Your candidate database is an asset — if you can actually use it
            </h2>
            <Prose blocks={overviewBlocks} />
          </div>

          <aside className="w-full lg:w-[38%]">
            <div className="lg:sticky lg:top-28 bg-[#FFFCF4] rounded-[28px] p-7 lg:p-8 border border-orange-50">
              <h3 className="text-[15px] font-bold text-[#111111] uppercase tracking-wider mb-6">
                At a glance
              </h3>
              <dl className="flex flex-col gap-5">
                {[
                  { label: 'Unit of record', value: 'The candidate, not the application — one profile across every role they apply to.' },
                  { label: 'On arrival', value: 'Resumes are parsed into structured profiles with skills, experience and contact details extracted.' },
                  { label: 'Communication', value: 'Email, SMS and WhatsApp are sent from the profile and logged against it automatically.' },
                  { label: 'Pipelines', value: 'Stages are configured per job opening, so each role runs the process it actually needs.' },
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-orange-100/70 last:border-0 pb-5 last:pb-0">
                    <dt className="text-[13px] font-bold text-[#f97316] uppercase tracking-wide mb-1.5">
                      {item.label}
                    </dt>
                    <dd className="text-[15px] text-[#4B5563] leading-relaxed">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function CapabilityDetailSection() {
  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <h2 className="text-[2rem] lg:text-[2.75rem] font-bold text-[#111111] leading-[1.15] tracking-tight mb-5">
            How candidate management works in practice
          </h2>
          <p className="text-[1.125rem] text-[#4B5563] leading-relaxed">
            The capabilities above, explained in the detail a buyer needs before booking a demo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10">
          {capabilityDetail.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: Math.min(idx, 1) * 0.08 }}
              className="border-t-2 border-[#f97316] pt-6"
            >
              <h3 className="text-[1.3125rem] lg:text-[1.5rem] font-bold text-[#111111] leading-snug tracking-tight mb-4">
                {item.title}
              </h3>
              <Prose blocks={item.blocks} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  { 
    title: "Unified Candidate Profile", 
    desc: "Get a complete view of every candidate, including resumes, communications, and interview scores.",
    illustration: (
      <div className="w-[85%] bg-white rounded-lg shadow-sm border border-orange-100 p-3 flex gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-100 shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-orange-100 rounded w-1/2"></div>
          <div className="h-2 bg-slate-100 rounded w-3/4"></div>
          <div className="flex gap-1 mt-1">
            <div className="h-4 w-12 bg-emerald-50 rounded text-[8px] flex items-center justify-center text-emerald-600 font-bold">Top Fit</div>
          </div>
        </div>
      </div>
    )
  },
  { 
    title: "AI Candidate Matching", 
    desc: "Automatically match candidates to job requirements based on skills and experience using AI.",
    illustration: (
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full border-[5px] border-orange-100 border-t-[#f97316] flex items-center justify-center bg-white shadow-sm">
          <span className="font-bold text-[#f97316] text-lg">95%</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-16 bg-slate-200 rounded"></div>
          <div className="h-2 w-12 bg-slate-200 rounded"></div>
        </div>
      </div>
    )
  },
  { 
    title: "Resume Parsing", 
    desc: "Extract key information from resumes and CVs instantly to populate candidate profiles.",
    illustration: (
      <div className="w-[65%] h-[80%] bg-white rounded-lg shadow-sm border border-slate-200 p-3 flex flex-col gap-2 relative">
        <div className="h-2 w-full bg-orange-400 absolute top-1/2 left-0 -translate-y-1/2 opacity-30 shadow-[0_0_15px_#f97316]"></div>
        <div className="h-2 bg-slate-200 rounded w-1/3 mb-1"></div>
        <div className="h-1.5 bg-slate-100 rounded w-full"></div>
        <div className="h-1.5 bg-slate-100 rounded w-5/6"></div>
        <div className="h-1.5 bg-slate-100 rounded w-4/6"></div>
      </div>
    )
  },
  { 
    title: "Smart Candidate Search", 
    desc: "Quickly find the right candidates using advanced filters, keyword search, and Boolean queries.",
    illustration: (
      <div className="w-[85%] bg-white rounded-lg shadow-sm border border-slate-200 p-2.5 flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400" />
        <div className="h-2 bg-slate-200 rounded w-1/2"></div>
        <div className="ml-auto px-2.5 py-1 bg-[#f97316] text-white rounded text-[9px] font-bold">Search</div>
      </div>
    )
  },
  { 
    title: "Automated Pipeline", 
    desc: "Drag and drop candidates across stages. Automate emails and tasks as candidates move.",
    illustration: (
      <div className="w-full flex gap-2 px-3 h-[70%]">
        <div className="flex-1 bg-white rounded shadow-sm border border-slate-100 flex flex-col p-2 gap-2">
          <div className="h-2 w-1/2 bg-slate-200 rounded mb-1"></div>
          <div className="h-8 w-full bg-orange-50 rounded border border-orange-100"></div>
          <div className="h-8 w-full bg-slate-50 rounded border border-slate-100"></div>
        </div>
        <div className="flex-1 bg-white rounded shadow-sm border border-slate-100 flex flex-col p-2 gap-2">
          <div className="h-2 w-1/2 bg-slate-200 rounded mb-1"></div>
          <div className="h-8 w-full bg-slate-50 rounded border border-slate-100"></div>
        </div>
      </div>
    )
  },
  { 
    title: "Activity Timeline", 
    desc: "Track every interaction, email, interview, and status change in a chronological timeline.",
    illustration: (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-orange-400 relative after:content-[''] after:absolute after:top-4 after:left-1.5 after:w-[2px] after:h-5 after:bg-slate-200"></div>
          <div className="h-2 w-20 bg-slate-200 rounded"></div>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-400"></div>
          <div className="h-2 w-16 bg-slate-200 rounded"></div>
        </div>
      </div>
    )
  }
];

function WorkflowSection() {
  const steps = [
    { 
      id: "01", title: "Candidate Application", desc: "Candidates apply through careers page, job portals, or referrals.",
      icon: <UserPlus className="w-5 h-5" />,
      illustration: (
        <div className="w-full h-full flex flex-col relative items-center justify-end bg-slate-100 rounded-lg pt-4 px-2 pb-0">
          <div className="w-full bg-white rounded-t-md border-x border-t border-slate-300 p-2 flex flex-col gap-2 shadow-sm">
            <div className="text-[8px] font-bold text-center">Apply for a Job</div>
            <div className="h-1 bg-slate-100 rounded w-full"></div>
            <div className="h-1 bg-slate-100 rounded w-2/3"></div>
            <div className="mt-1 bg-orange-400 h-3 w-1/2 mx-auto rounded text-[6px] text-white flex items-center justify-center font-bold">Submit</div>
          </div>
          <div className="w-[110%] h-1.5 bg-slate-400 rounded-b-md shadow-md"></div>
        </div>
      )
    },
    { 
      id: "02", title: "Resume Parsing", desc: "Extract key information from resumes automatically.",
      icon: <FileText className="w-5 h-5" />,
      illustration: (
        <div className="relative w-[80%] h-[90%] bg-white rounded shadow-sm border border-slate-200 p-2 flex flex-col gap-1.5 overflow-hidden">
          <div className="text-[7px] font-bold text-slate-800">RESUME</div>
          <div className="h-1 bg-slate-200 rounded w-full"></div>
          <div className="h-1 bg-slate-200 rounded w-5/6"></div>
          <div className="h-1 bg-slate-200 rounded w-4/6"></div>
          <div className="absolute top-1/2 left-0 w-full h-4 bg-blue-400/20 border-y border-blue-400 flex items-center justify-center -translate-y-1/2 shadow-[0_0_10px_rgba(96,165,250,0.5)]">
             <span className="text-[5px] font-bold text-blue-700">Parsing...</span>
          </div>
        </div>
      )
    },
    { 
      id: "03", title: "Candidate Profile Creation", desc: "Create structured candidate profiles with all relevant details.",
      icon: <User className="w-5 h-5" />,
      illustration: (
        <div className="w-full h-full flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 p-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="" /></div>
            <div>
              <div className="text-[8px] font-bold text-slate-800">Ananya Rao</div>
              <div className="text-[6px] text-slate-500">Software Engineer</div>
            </div>
          </div>
          <div className="flex gap-1 mt-auto">
            <span className="px-1 py-0.5 bg-blue-50 text-blue-600 rounded text-[5px] font-medium">Java</span>
            <span className="px-1 py-0.5 bg-blue-50 text-blue-600 rounded text-[5px] font-medium">React</span>
            <span className="px-1 py-0.5 bg-blue-50 text-blue-600 rounded text-[5px] font-medium">AWS</span>
          </div>
        </div>
      )
    },
    { 
      id: "04", title: "AI Candidate Matching", desc: "AI matches candidates with suitable job roles based on best fit.",
      icon: <Sparkles className="w-5 h-5" />,
      illustration: (
        <div className="w-full h-full bg-white rounded-lg shadow-sm border border-slate-200 p-2 flex flex-col gap-1">
          <div className="text-[7px] font-bold text-slate-800 mb-1">Best Matches</div>
          <div className="flex items-center justify-between border-b border-slate-50 pb-1">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="" /></div>
              <div className="text-[6px] font-medium text-slate-700">Ananya Rao</div>
            </div>
            <div className="text-[6px] font-bold text-orange-600 bg-orange-50 px-1 py-0.5 rounded">95%</div>
          </div>
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="" /></div>
              <div className="text-[6px] font-medium text-slate-700">Rohit Sharma</div>
            </div>
            <div className="text-[6px] font-bold text-orange-600 bg-orange-50 px-1 py-0.5 rounded">92%</div>
          </div>
        </div>
      )
    },
    { 
      id: "05", title: "Recruiter Review", desc: "Recruiters review matched candidates and shortlist the best.",
      icon: <Users className="w-5 h-5" />,
      illustration: (
        <div className="w-full h-full bg-white rounded-lg overflow-hidden border border-slate-200 relative shadow-sm">
           <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=200&h=200&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
      )
    },
    { 
      id: "06", title: "Interview Scheduling", desc: "Schedule interviews with selected candidates easily.",
      icon: <Calendar className="w-5 h-5" />,
      illustration: (
        <div className="w-full h-full bg-white rounded-lg shadow-sm border border-slate-200 p-2 flex flex-col">
          <div className="flex items-center gap-1 mb-1.5">
            <CheckCircle className="w-3 h-3 text-emerald-500" />
            <span className="text-[7px] font-bold text-slate-800">Interview Scheduled</span>
          </div>
          <div className="grid grid-cols-7 gap-0.5 mb-2 px-1">
            {[...Array(14)].map((_, i) => (
              <div key={i} className={`h-1.5 rounded-sm ${i === 9 ? 'bg-orange-500' : 'bg-slate-100'}`}></div>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-1.5 bg-blue-50/50 p-1 rounded border border-blue-100">
            <div className="w-3 h-3 bg-blue-500 rounded flex items-center justify-center text-white text-[5px]">▶</div>
            <div className="text-[5px] font-bold text-blue-700 leading-none">May 20, 11:00 AM<br/><span className="font-medium text-[4px]">Video Interview</span></div>
          </div>
        </div>
      )
    },
    { 
      id: "07", title: "Evaluation & Feedback", desc: "Collect feedback and evaluate candidates at every stage.",
      icon: <Star className="w-5 h-5" />,
      illustration: (
        <div className="w-full h-full bg-white rounded-lg shadow-sm border border-slate-200 p-2 flex flex-col gap-1.5">
          <div className="text-[7px] font-bold text-slate-800">Candidate Feedback</div>
          <div className="flex items-center gap-1 text-[7px] text-orange-400">★★★★★</div>
          <div className="space-y-1 mt-1">
            <div className="flex items-center justify-between">
              <span className="text-[5px] text-slate-600">Technical Skills</span>
              <CheckCircle className="w-2.5 h-2.5 text-emerald-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[5px] text-slate-600">Communication</span>
              <CheckCircle className="w-2.5 h-2.5 text-emerald-500" />
            </div>
          </div>
        </div>
      )
    },
    { 
      id: "08", title: "Offer Management", desc: "Send offers, manage negotiations and track acceptance.",
      icon: <Mail className="w-5 h-5" />,
      illustration: (
        <div className="w-full h-full bg-white rounded-lg shadow-sm border border-slate-200 p-2 flex flex-col items-center justify-center gap-1.5 relative">
          <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-1">
            <CheckCircle className="w-3.5 h-3.5" />
          </div>
          <div className="text-[8px] font-bold text-slate-800">Offer Letter</div>
          <div className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[5px] rounded-full font-bold">Accepted</div>
        </div>
      )
    },
    { 
      id: "09", title: "Candidate Hired", desc: "Convert selected candidate to employee and onboard seamlessly.",
      icon: <CheckCircle className="w-5 h-5" />,
      illustration: (
        <div className="w-full h-full bg-white rounded-lg overflow-hidden border border-slate-200 relative shadow-sm">
           <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=200&h=200&fit=crop" alt="" className="w-full h-full object-cover" />
           <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-white text-[6px] px-1.5 py-0.5 rounded shadow-md flex items-center gap-0.5 font-bold">
             <CheckCircle className="w-2 h-2" /> Hired!
           </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-8 lg:py-16 bg-[#fdfdfd] overflow-hidden relative border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center mb-12">
          <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold text-[#111111] mb-4 tracking-tight">Candidate Management Workflow</h2>
          <p className="text-[1.125rem] text-[#4B5563] max-w-2xl mx-auto">
            From application to hiring, PyHire streamlines every step to help you hire the best talent faster.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden xl:block relative w-full overflow-hidden pb-12 pt-16">
          <style>{`
            @keyframes marqueeHorizontal {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
          <div className="w-[5800px] relative px-0 h-[560px] animate-[marqueeHorizontal_40s_linear_infinite] hover:[animation-play-state:paused]">
            
            {/* Wavy Line SVG */}
            <div className="absolute top-1/2 left-0 w-full h-[200px] -translate-y-1/2 z-0 pointer-events-none">
              <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 5800 200" fill="none">
                 <path d="M 0 100 Q 161 160, 322 100 T 644 100 T 966 100 T 1288 100 T 1610 100 T 1932 100 T 2254 100 T 2576 100 T 2900 100 T 3222 100 T 3544 100 T 3866 100 T 4188 100 T 4510 100 T 4832 100 T 5154 100 T 5476 100 T 5800 100" 
                       fill="none" stroke="url(#orange-grad)" strokeWidth="4" />
                 <defs>
                   <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                     <stop offset="10%" stopColor="#f97316" stopOpacity="1" />
                     <stop offset="90%" stopColor="#f97316" stopOpacity="1" />
                     <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
                   </linearGradient>
                 </defs>
              </svg>
            </div>
            
            <div className="grid grid-cols-[repeat(18,1fr)] gap-0 w-full h-full relative z-10">
              {[...steps, ...steps].map((step, idx) => {
                const isTop = idx % 2 === 0;
                return (
                  <div key={idx} className="relative flex justify-center w-full h-full">
                     {/* Node */}
                     <div className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#f97316] ring-[6px] ring-white shadow-[0_0_15px_rgba(249,115,22,0.5)] z-20 flex items-center justify-center ${isTop ? 'top-[calc(50%+60px)]' : 'top-[calc(50%-60px)]'} -translate-y-1/2`}>
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                     </div>
                     
                     {/* Dashed line */}
                     <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-[75px] border-l-[2.5px] border-dashed border-orange-200 z-10 ${isTop ? 'bottom-[calc(50%-60px)]' : 'top-[calc(50%-60px)]'}`}></div>

                     {/* Card */}
                     <div className={`absolute left-1/2 -translate-x-1/2 w-[310px] bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-orange-50 z-30 ${isTop ? 'bottom-[calc(50%+25px)]' : 'top-[calc(50%+25px)]'} hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] transition-all hover:-translate-y-1`}>
                       {/* Floating icon */}
                       <div className={`absolute -top-5 right-6 w-12 h-12 rounded-full bg-[#f97316] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(249,115,22,0.4)] border-4 border-white`}>
                          {step.icon}
                       </div>
                       
                       <div className="flex gap-4 h-full items-center">
                          {/* Left text */}
                          <div className="flex-1 flex flex-col justify-center">
                             <span className="text-[#f97316] font-bold text-[20px] leading-none mb-1.5">{step.id}</span>
                             <h4 className="font-bold text-[#111111] text-[16px] leading-tight mb-2">{step.title}</h4>
                             <p className="text-[12px] text-[#4B5563] leading-relaxed">
                               {step.desc}
                             </p>
                          </div>
                          {/* Right illustration */}
                          <div className="w-[110px] shrink-0 bg-slate-50/50 rounded-xl overflow-hidden border border-slate-100 flex flex-col items-center justify-center relative p-1.5 h-[110px]">
                             {step.illustration}
                          </div>
                       </div>
                     </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet View */}
        <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative w-full pt-8">
          {steps.map((step, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.5 }}
              key={idx} 
              className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f2f2f2] flex flex-col gap-5 hover:shadow-[0_8px_30px_rgb(249,115,22,0.08)] hover:border-orange-200 transition-all cursor-default"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center font-bold text-[#f97316] text-xl shrink-0">
                  {step.id}
                </div>
                <div>
                  <h4 className="font-bold text-[#111111] text-[16px] leading-snug mb-2">{step.title}</h4>
                  <p className="text-[14px] text-[#4B5563] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
              <div className="w-full h-[140px] bg-slate-50 rounded-xl border border-slate-100 p-2 overflow-hidden flex items-center justify-center">
                 <div className="w-1/2 max-w-[140px] h-[110px]">
                   {step.illustration}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}


/* Module scope so the page can emit these as FAQPage structured data without
   the on-page copy and the schema drifting apart. */
export const candidateFaqs = [
    { q: "Can PyHire manage candidates for multiple job openings?", a: "Yes. Candidates can be associated with multiple positions while maintaining a single unified profile. Applications attach to the person rather than duplicating them, so someone who applies to four roles over two years is still one record carrying every resume, message, interview and assessment." },
    { q: "Does PyHire automatically parse resumes?", a: "Yes. PyHire extracts relevant skills, experience and contact details from resumes to create structured profiles. This matters beyond convenience — matching, filtering and smart search all depend on the profile having been parsed into structured fields rather than stored as a document." },
    { q: "Can recruiters communicate from the platform?", a: "Absolutely. Recruiters can send emails, SMS and WhatsApp messages directly from the candidate profile, and every message is logged against that profile automatically. The whole team sees the communication history, which is what prevents two recruiters approaching the same candidate independently." },
    { q: "Is candidate data secure?", a: "We employ enterprise-grade security and encryption to ensure all candidate data is fully protected and compliant. Access is governed by role-based permissions, and every action, view and export is recorded in an audit log." },
    { q: "What happens to candidates who were not hired?", a: "They stay in your database as complete profiles and are automatically re-matched against new openings as those are created. The candidates most likely to fit your next role are often already in the system — they applied before, they were strong, and the timing was wrong." },
    { q: "How do I find a candidate I remember but cannot name?", a: "Smart candidate search queries the database on skills, experience and qualifications rather than requiring an exact keyword match, so you can search by what someone can do instead of by how their resume happened to be worded." },
    { q: "Can hiring stages differ between roles?", a: "Yes. Pipelines are configured per job opening, so a senior technical role with several interview rounds and a high-volume role with a single screening call each run their own sequence while living in the same platform." },
    { q: "Is there a record of what happened to each candidate?", a: "Every stage change, message and assessment is written to the candidate's activity timeline as it happens. Because the timeline is a by-product of the work rather than something anyone maintains, it is still accurate months later when a decision is reviewed or a candidate asks what became of their application." }
];

function FAQSection() {
  const faqs = candidateFaqs;
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-4 lg:py-8 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-[2.5rem] font-bold text-[#111111] mb-4">Frequently Asked Questions</h2>
          <p className="text-[1.125rem] text-[#4B5563]">Find answers to common questions about PyHire Candidate Management.</p>
        </div>

        <div className="grid gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border border-[#F2F2F2] rounded-[16px] overflow-hidden transition-all duration-300 ${openIdx === idx ? "bg-[#FFFCF4] shadow-sm" : "bg-white hover:border-orange-100"}`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                aria-expanded={openIdx === idx}
                aria-controls={`cm-faq-answer-${idx}`}
                id={`cm-faq-question-${idx}`}
                className="w-full text-left px-8 py-6 flex justify-between items-center gap-4 outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-inset rounded-[16px]"
              >
                <span className="font-bold text-[16px] text-[#111111]">{faq.q}</span>
                <ChevronDown aria-hidden="true" className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${openIdx === idx ? "rotate-180 text-[#f97316]" : ""}`} />
              </button>
              {/* 0fr→1fr grid row rather than a fixed 200px max-height, which
                  truncated taller content with no visual cue. */}
              <div
                id={`cm-faq-answer-${idx}`}
                role="region"
                aria-labelledby={`cm-faq-question-${idx}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openIdx === idx ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="px-8 pb-6 text-[#4B5563] text-[15px] leading-relaxed border-t border-orange-100/50 mt-2 pt-5">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-[15px] font-medium text-[#4B5563]">Still have questions? Our team is here to help you.</span>
          <Link to={DEMO_PATH} className="px-8 py-3 bg-[#f97316] text-white rounded-lg text-[15px] font-bold shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:bg-[#ea580c] transition-colors inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2">
            Contact Us →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-4 lg:py-8 bg-white">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="bg-[#FFFCF4] rounded-[40px] p-10 md:p-16 border border-orange-50 shadow-xl flex flex-col lg:flex-row items-center gap-8 lg:gap-8 relative overflow-hidden">
           
           <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[450px]">
             {/* Abstract Background Blur */}
             <div className="absolute inset-0 bg-white rounded-full opacity-60 blur-3xl pointer-events-none"></div>
             
             {/* Main Circular Image */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl z-10">
               <img alt="" src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" />
             </div>

             {/* Floating elements matching screenshot */}
             <div className="absolute top-8 left-0 lg:left-4 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 z-20">
               <div className="space-y-3">
                 <div className="flex items-center gap-3">
                   <img alt="" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" className="w-8 h-8 rounded-full" />
                   <div>
                     <div className="h-2 w-16 bg-slate-200 rounded mb-1"></div>
                     <div className="flex text-orange-400 text-[10px]">★★★★★</div>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <img alt="" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" className="w-8 h-8 rounded-full" />
                   <div>
                     <div className="h-2 w-16 bg-slate-200 rounded mb-1"></div>
                     <div className="flex text-orange-400 text-[10px]">★★★★★</div>
                   </div>
                 </div>
               </div>
             </div>

             <div className="absolute bottom-16 right-0 lg:-right-4 bg-white p-5 rounded-full shadow-lg border border-slate-100 z-20 flex items-center justify-center w-24 h-24 border-[6px] border-t-[#f97316]">
                <span className="font-bold text-[#f97316] text-2xl">95%</span>
             </div>
             
             <div className="absolute bottom-4 left-8 bg-white px-5 py-3 rounded-xl shadow-lg border border-slate-100 z-20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">📅</div>
                <div>
                  <div className="text-[12px] font-bold text-[#111]">Interview Scheduled</div>
                  <div className="text-[10px] text-slate-500">Tomorrow, 10:00 AM</div>
                </div>
             </div>
           </div>

           <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
             <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold text-[#111111] leading-[1.1] tracking-tight mb-6">
               Ready to Build a Smarter Recruitment Process?
             </h2>
             <p className="text-[1.125rem] text-[#4B5563] leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
               Streamline candidate management, accelerate hiring, and deliver a better recruitment experience with PyHire's AI-powered Candidate Management platform.
             </p>
             <Link to={DEMO_PATH} className="px-10 py-4 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full font-bold text-[17px] transition-all shadow-[0_8px_20px_rgb(249,115,22,0.3)] hover:-translate-y-1 inline-flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2">
               Book a Demo Today <ArrowRight className="w-5 h-5" />
             </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
