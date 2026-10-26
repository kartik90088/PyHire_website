import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { DEMO_PATH, QUOTE_PATH } from '../lib/routes';

/**
 * The hero visual is supplied as a single rendered graphic (the scheduling list,
 * live interview window, panel and notes cards composed together), so the right
 * column is one image rather than a JSX collage. Left-hand copy is unchanged.
 */
const HERO_VISUAL = '/interview-management-hero.jpg';
const HERO_VISUAL_ALT =
  'PyHire interview workspace: an Upcoming Interviews schedule listing a Product Designer at 10:00 AM, a Frontend Developer at 11:30 AM and a UX Researcher at 2:00 PM, beside a live video interview with panel members and an interview notes card rated five stars';

export function InterviewManagementHero() {
  return (
    <section className="relative w-full bg-[#fdfdfd] pt-12 pb-12 lg:pt-10 lg:pb-8 overflow-hidden flex justify-center">
      
      {/* Background Shapes */}
      <div className="absolute top-1/2 -left-20 w-40 h-40 bg-blue-500 rounded-full opacity-90 -translate-y-1/2 hidden lg:block"></div>
      <div className="absolute bottom-20 left-40 w-6 h-6 bg-green-400 rounded-full hidden lg:block"></div>
      {/* The bottom-right orange circle is baked into the hero visual, so no
          decorative circle is drawn here — a second one showed the image's
          rectangular edge cutting across it. */}
      
      {/* Decorative Dots */}
      <div className="absolute bottom-[20%] left-[8%] w-3 h-3 bg-green-400 rounded-full hidden lg:block"></div>
      <div className="absolute bottom-16 left-16 hidden lg:grid grid-cols-4 gap-2 opacity-50">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-orange-300 rounded-full"></div>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-8">
        
        {/* Left Content */}
        <div className="w-full lg:w-5/12 z-10 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[3.5rem] lg:text-[4.5rem] font-bold text-[#111111] leading-[1.1] tracking-tight mb-6"
          >
            Interview<br/>Management
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[1.125rem] text-[#4B5563] mb-6 leading-relaxed max-w-md"
          >
            Simplify scheduling, conduct structured interviews, and collaborate with your team — all in one place. Better process. Better decisions.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Link to={DEMO_PATH} className="inline-flex items-center justify-center px-8 py-4 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full font-bold text-[16px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgb(249,115,22,0.4)] hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2">
              Book a Demo
            </Link>
            <Link to={QUOTE_PATH} className="inline-flex items-center justify-center px-4 py-4 text-[#f97316] font-bold text-[16px] transition-colors hover:text-[#ea580c] underline underline-offset-8 decoration-2 outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] rounded-full">
              Get Free Quote
            </Link>
          </motion.div>
        </div>

        {/* Right Content - Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full lg:w-7/12 relative z-10 mt-8 lg:mt-0"
        >
          <img
            src={HERO_VISUAL}
            alt={HERO_VISUAL_ALT}
            className="w-full h-auto object-contain"
            width={1400}
            height={939}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>

      </div>
    </section>
  );
}
