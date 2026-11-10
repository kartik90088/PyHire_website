import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { DEMO_PATH } from "../lib/routes";
import { useSeo } from "../lib/useSeo";
import { absoluteUrl } from "../lib/site";
import { Prose } from "../components/Prose";
import type { Block } from "../lib/content";

export function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSeo({
    title: 'About PyHire — Making hiring radically simple | PyHire',
    description:
      'PyHire builds AI-powered recruitment software for staffing agencies and in-house hiring teams — sourcing, screening, interviews and compliance in one platform.',
    canonicalPath: '/about-us',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About PyHire',
        url: absoluteUrl('/about-us'),
        mainEntity: { '@id': `${absoluteUrl('/')}#organization` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: absoluteUrl('/about-us') },
        ],
      },
    ],
  });

  return (
    <main className="pt-12 bg-white min-h-screen font-sans overflow-hidden">
      
            {/* 1. Hero Section */}
      <section className="relative w-full pt-10 lg:pt-10 flex flex-col items-center text-center overflow-hidden bg-white pb-0">
        {/* Subtle radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F5F9FF] via-white to-white pointer-events-none"></div>
        
        <div className="relative w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 flex flex-col items-center">
                {/* Decorative elements */}
        <div className="absolute top-10 left-[45%] text-violet-500">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute top-16 right-[40%] text-slate-300">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
             <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="3"/>
          </svg>
        </div>
        
        <h1 className="text-[3.5rem] lg:text-[4rem] font-bold text-[#111111] leading-tight mb-6 tracking-tight relative z-10">
          About Us
        </h1>
        <p className="text-[1.125rem] text-[#4B5563] max-w-3xl mb-8 leading-relaxed relative z-10">
          At PyHire, we are on a mission to transform the way companies hire.<br className="hidden sm:block" />
          We combine AI technology with human insight to build a smarter,<br className="hidden sm:block" />
          faster, and more reliable hiring experience.
        </p>

        {/* Gallery */}
        <div className="relative w-full flex overflow-x-auto lg:overflow-visible lg:justify-center items-center gap-4 lg:gap-6 h-auto lg:h-[450px] px-5 sm:px-8 lg:px-0 pb-8 lg:pb-0 mt-8 lg:mt-8 hide-scrollbar snap-x snap-mandatory">
          
          {/* Decorative dots left */}
          <div className="absolute left-[-20px] bottom-10 z-0 hidden lg:block opacity-60">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="5" r="2" fill="#4ade80"/>
              <circle cx="20" cy="5" r="2" fill="#4ade80"/>
              <circle cx="35" cy="5" r="2" fill="#4ade80"/>
              <circle cx="5" cy="20" r="2" fill="#4ade80"/>
              <circle cx="20" cy="20" r="2" fill="#4ade80"/>
              <circle cx="35" cy="20" r="2" fill="#4ade80"/>
              <circle cx="5" cy="35" r="2" fill="#4ade80"/>
              <circle cx="20" cy="35" r="2" fill="#4ade80"/>
              <circle cx="35" cy="35" r="2" fill="#4ade80"/>
            </svg>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02, rotate: -1, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.1 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }
            }}
            className="relative z-10 w-[180px] h-[220px] shrink-0 rounded-[28px] md:rounded-[32px] overflow-hidden shadow-lg border-4 border-white lg:mt-8 snap-center bg-white cursor-pointer"
          >
            <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Recruiter reviewing resumes" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02, rotate: 1, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.2 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
            className="relative z-10 w-[240px] md:w-[320px] h-[300px] md:h-[380px] shrink-0 rounded-[28px] md:rounded-[32px] overflow-hidden shadow-lg border-4 border-white lg:-mt-8 snap-center bg-white cursor-pointer"
          >
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="HR team collaboration" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02, rotate: -1, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
            animate={{ y: [0, -7, 0] }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.3 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
            }}
            className="relative z-10 w-[200px] md:w-[260px] h-[260px] md:h-[320px] shrink-0 rounded-[28px] md:rounded-[32px] overflow-hidden shadow-lg border-4 border-white lg:mt-6 snap-center bg-white cursor-pointer"
          >
            <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=500&q=80" className="w-full h-full object-cover" alt="Candidate interview" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02, rotate: 1, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
            animate={{ y: [0, -9, 0] }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.4 },
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
            }}
            className="relative z-10 w-[240px] md:w-[320px] h-[300px] md:h-[380px] shrink-0 rounded-[28px] md:rounded-[32px] overflow-hidden shadow-lg border-4 border-white lg:-mt-8 snap-center bg-white cursor-pointer"
          >
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Team brainstorming" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02, rotate: -1, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.5 },
              y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
            }}
            className="relative z-10 w-[200px] md:w-[260px] h-[260px] md:h-[320px] shrink-0 rounded-[28px] md:rounded-[32px] overflow-hidden shadow-lg border-4 border-white lg:mt-8 snap-center bg-white cursor-pointer"
          >
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Hiring meeting" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02, rotate: 1, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.6 },
              y: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
            }}
            className="relative z-10 w-[180px] h-[220px] shrink-0 rounded-[28px] md:rounded-[32px] overflow-hidden shadow-lg border-4 border-white lg:mt-6 snap-center bg-white cursor-pointer"
          >
            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Office discussion" />
          </motion.div>

          {/* Decorative dots right */}
          <div className="absolute right-[-10px] top-10 z-0 hidden lg:block opacity-60">
             <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="5" r="2" fill="#6D28D9"/>
              <circle cx="20" cy="5" r="2" fill="#6D28D9"/>
              <circle cx="35" cy="5" r="2" fill="#6D28D9"/>
              <circle cx="5" cy="20" r="2" fill="#6D28D9"/>
              <circle cx="20" cy="20" r="2" fill="#6D28D9"/>
              <circle cx="35" cy="20" r="2" fill="#6D28D9"/>
            </svg>
          </div>
          
          {/* Decorative purple circle */}
          <div className="absolute right-[8%] bottom-[-20px] w-20 h-20 bg-indigo-100 rounded-full z-0 hidden lg:block"></div>
        </div>
        </div>
      </section>

      {/* 2. What PyHire does — the page’s opening statement */}
      <section className="py-4 lg:py-8 bg-white relative">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:gap-6 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col">
              <h2 className="text-[2.5rem] lg:text-[3rem] font-bold text-[#111111] leading-[1.1] mb-6 tracking-tight">
                Built to Make Hiring<br />
                Work Better
              </h2>
              <div className="flex flex-col gap-5 text-[15px] lg:text-[16px] text-[#4B5563] leading-relaxed max-w-[560px]">
                <p>
                  PyHire brings every part of your hiring process into one connected platform.
                  From sourcing and managing candidates to interviews, communication, offers,
                  onboarding, and compliance, everything works together in one configurable
                  workspace.
                </p>
                <p>
                  We help recruitment teams reduce manual work, stay on top of every candidate,
                  and make hiring decisions with greater clarity and confidence.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative w-full aspect-[3/2] rounded-[32px] overflow-hidden bg-slate-100">
                <img
                  src="/about-hiring-dashboard.webp"
                  className="w-full h-full object-cover"
                  alt="A recruiter reviewing the PyHire candidate dashboard — candidates with job title, stage and score, alongside pipeline, source and hiring-progress charts."
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
            </div>

          </div>
        </div>
      </section>

      {/* 2b. What we build — long-form */}
      <WhatWeBuildSection />

      {/* 3. Our Commitment Section */}
      <section className="py-4 lg:py-8 bg-white mt-6">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:gap-6 items-center">
            
            {/* Left Image */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -left-10 -top-10 text-violet-500 opacity-60 z-0">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="5" cy="5" r="2" fill="currentColor"/>
                  <circle cx="20" cy="5" r="2" fill="currentColor"/>
                  <circle cx="35" cy="5" r="2" fill="currentColor"/>
                  <circle cx="5" cy="20" r="2" fill="currentColor"/>
                  <circle cx="20" cy="20" r="2" fill="currentColor"/>
                  <circle cx="35" cy="20" r="2" fill="currentColor"/>
                  <circle cx="5" cy="35" r="2" fill="currentColor"/>
                  <circle cx="20" cy="35" r="2" fill="currentColor"/>
                  <circle cx="35" cy="35" r="2" fill="currentColor"/>
                </svg>
              </div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-100 rounded-full z-0"></div>

              <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden bg-slate-100 z-10 border-4 border-white shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" 
                  className="w-full h-full object-cover" 
                  alt="Team working together" 
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="flex flex-col order-1 lg:order-2 lg:pl-10">
              <span className="text-violet-500 font-bold text-[14px] uppercase tracking-wider mb-3">Our Commitment</span>
              <h2 className="text-[2.5rem] lg:text-[3rem] font-bold text-[#111111] leading-[1.1] mb-6 tracking-tight">
                We empower<br />
                recruitment teams
              </h2>
              <p className="text-[15px] text-[#4B5563] leading-relaxed mb-8">
                We build technology that empowers recruiters to work smarter, collaborate seamlessly, and make confident hiring decisions. Our platform is designed to simplify complexity and bring clarity to every stage of hiring.
              </p>
              
              <div className="border-l-4 border-violet-500 pl-6 py-1">
                <p className="text-[16px] font-bold text-[#111111] leading-relaxed">
                  We believe technology should enable people, not complicate their work. PyHire is built to make hiring smarter, faster and more human.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Final CTA Section */}
      <section className="py-12 bg-white pb-12 lg:pb-12">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="bg-[#F8F9FA] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6 text-center md:text-left">
               <div className="w-24 h-24 shrink-0 flex items-center justify-center bg-white rounded-2xl shadow-sm">
                 <Rocket className="w-12 h-12 text-[#6D28D9]" />
               </div>
               <div>
                 <h2 className="text-[1.75rem] font-bold text-[#111111] mb-2 tracking-tight">Ready to transform your hiring process?</h2>
                 <p className="text-[15px] text-[#4B5563]">Join thousands of teams hiring smarter with PyHire.</p>
               </div>
            </div>
            
            <Link to={DEMO_PATH} className="px-8 py-3.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-lg font-bold text-[15px] transition-all inline-flex items-center gap-2 whitespace-nowrap shadow-[0_4px_14px_rgb(249,115,22,0.3)] shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2">
              Book a Demo <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Long-form copy                                                      */
/*                                                                     */
/* The page previously ran to about 340 words — largely headings and   */
/* a photo gallery — which said very little about what PyHire is or    */
/* who it is built for. These sections carry that in prose.            */
/* ------------------------------------------------------------------ */

const whatWeBuildBlocks: Block[] = [
  {
    type: 'p',
    text: "PyHire is a Recruitment Operating System. That phrase is doing real work: it means one platform covering the full hiring lifecycle rather than a tool that handles one stage and hands off to a spreadsheet for the rest.",
  },
  {
    type: 'p',
    text: "Job creation, candidate sourcing, AI matching, interviews, offers and analytics all run against the same records. A requisition raised in the platform is the same requisition that candidates are matched to, that interviews are scheduled against, and that reporting later measures. Nothing is re-keyed between stages, because there are no stages living in separate systems.",
  },
  {
    type: 'p',
    text: "**That design choice is the whole product.** Most of the pain in recruitment is not any single task being hard — it is the seams between tasks, where information is copied, lost, or quietly falls out of date. Candidates go cold in the gap between an interview and a decision. Vendor commissions are reconciled at month end from records that were never connected. A client asks for a status update and someone spends an afternoon assembling one.",
  },
  {
    type: 'p',
    text: "We build for the seams. AI removes the volume work — reading resumes, ranking applicants against requirements, drafting descriptions, chasing follow-ups — so recruiters spend their time on interviews and decisions rather than spreadsheets and inboxes. The automation exists to return attention to the parts of hiring that genuinely need a person.",
  },
];

function WhatWeBuildSection() {
  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="w-full lg:w-[62%]">
            <span className="text-violet-500 font-bold text-[14px] uppercase tracking-wider mb-3 block">
              What We Build
            </span>
            <h2 className="text-[2rem] lg:text-[2.75rem] font-bold text-[#111111] leading-[1.15] tracking-tight mb-6">
              One platform for the whole hiring lifecycle
            </h2>
            <Prose blocks={whatWeBuildBlocks} />
          </div>

          <aside className="w-full lg:w-[38%]">
            <div className="lg:sticky lg:top-28 bg-[#F5F9FF] rounded-[28px] p-7 lg:p-8 border border-violet-50">
              <h3 className="text-[15px] font-bold text-[#111111] uppercase tracking-wider mb-6">
                The platform
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  { to: '/candidate-management', label: 'Candidate Management' },
                  { to: '/job-management', label: 'Job Management' },
                  { to: '/ai-candidate-matching', label: 'AI Candidate Matching' },
                  { to: '/interview-management', label: 'Interview Management' },
                  { to: '/client-vendor-management', label: 'Client & Vendor Management' },
                  { to: '/unified-communication', label: 'Unified Communication' },
                  { to: '/analytics-dashboards', label: 'Analytics & Dashboards' },
                  { to: '/compliance-security', label: 'Compliance & Security' },
                ].map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="group flex items-center justify-between gap-3 text-[15px] font-semibold text-[#111111] hover:text-[#6D28D9] transition-colors py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded"
                    >
                      {item.label}
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#6D28D9] group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
