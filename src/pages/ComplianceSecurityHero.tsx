import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { DEMO_PATH, QUOTE_PATH } from '../lib/routes';

/**
 * The hero visual is supplied as a single rendered graphic (Security Overview,
 * Compliance Status, Audit Readiness and Risk Overview composed together), so the
 * right column is one image rather than a JSX collage.
 */
const HERO_VISUAL = '/compliance-security-hero.jpg';
const HERO_VISUAL_ALT =
  'PyHire security dashboard: a Security Overview panel confirming Data Encryption, Access Control, Threat Detection and Backup Status; a Compliance Status ring at 100% compliant, broken down as 72% compliant, 20% in progress and 8% not compliant; an Audit Readiness card showing 92% of systems compliant; and a Risk Overview gauge reading Low Risk 12';

export function ComplianceSecurityHero() {
  return (
    <section className="relative w-full bg-[#fdfdfd] pt-12 pb-12 lg:pt-10 lg:pb-8 overflow-hidden flex justify-center">
      
      {/* Background Shapes */}
      <div className="absolute top-1/2 -left-20 w-40 h-40 bg-violet-500 rounded-full opacity-90 -translate-y-1/2 hidden lg:block"></div>
      <div className="absolute bottom-20 left-40 w-6 h-6 bg-green-400 rounded-full hidden lg:block"></div>
      {/* Sits above the hero visual (z-20 vs z-10): the image is opaque, so a
          circle behind it would show the image's rectangular edge cutting
          through the curve. It overlaps only the visual's empty bottom-right. */}
      <div className="absolute -bottom-20 right-[-100px] w-80 h-80 bg-violet-600 rounded-full hidden lg:block z-20"></div>
      
      {/* Decorative Dots */}
      <div className="absolute bottom-[20%] left-[8%] w-3 h-3 bg-green-400 rounded-full hidden lg:block"></div>
      <div className="absolute bottom-16 left-16 hidden lg:grid grid-cols-4 gap-2 opacity-50">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-violet-300 rounded-full"></div>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-8">
        
        {/* Left Content */}
        <div className="w-full lg:w-4/12 z-10 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[3.5rem] lg:text-[4.5rem] font-bold text-[#111111] leading-[1.1] tracking-tight mb-6"
          >
            Compliance &<br/>Security
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[1.125rem] text-[#4B5563] mb-6 leading-relaxed max-w-md"
          >
            Protect your data, ensure compliance, and build a future-ready hiring process with confidence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Link to={DEMO_PATH} className="inline-flex items-center justify-center px-8 py-4 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full font-bold text-[16px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgb(249,115,22,0.4)] hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2">
              Book a Demo
            </Link>
            <Link to={QUOTE_PATH} className="inline-flex items-center justify-center px-4 py-4 text-[#6D28D9] font-bold text-[16px] transition-colors hover:text-[#5B21B6] underline underline-offset-8 decoration-2 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded-full">
              Get Free Quote
            </Link>
          </motion.div>
        </div>

        {/* Right Content - Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full lg:w-8/12 relative z-10 mt-8 lg:mt-0"
        >
          <img
            src={HERO_VISUAL}
            alt={HERO_VISUAL_ALT}
            className="w-full h-auto object-contain"
            width={950}
            height={699}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>

      </div>
    </section>
  );
}
