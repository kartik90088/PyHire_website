import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { DEMO_PATH, QUOTE_PATH } from '../lib/routes';
import { Star, Users, Target, TrendingUp, Award, UserCheck } from 'lucide-react';

export function AICandidateMatchingHero() {
  return (
    <section className="relative w-full bg-[#fdfdfd] pt-12 pb-12 lg:pt-10 lg:pb-8 overflow-hidden flex justify-center">
      
      {/* Background Shapes */}
      <div className="absolute top-1/2 -left-20 w-40 h-40 bg-violet-500 rounded-full opacity-90 -translate-y-1/2 hidden lg:block"></div>
      <div className="absolute bottom-20 left-40 w-6 h-6 bg-green-400 rounded-full hidden lg:block"></div>
      <div className="absolute -bottom-20 right-[-100px] w-80 h-80 bg-violet-600 rounded-full hidden lg:block"></div>
      
      {/* Decorative Dots */}
      <div className="absolute bottom-[20%] left-[8%] w-3 h-3 bg-green-400 rounded-full hidden lg:block"></div>
      <div className="absolute bottom-16 left-16 hidden lg:grid grid-cols-4 gap-2 opacity-50">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-violet-300 rounded-full"></div>
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
            AI Candidate<br/>Matching
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[1.125rem] text-[#4B5563] mb-6 leading-relaxed max-w-md"
          >
            PyHire AI analyzes skills, experience, and potential to match the right talent to the right roles — accurately and effortlessly.
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

        {/* Right Content - Visual Collage */}
        <div className="w-full lg:w-7/12 relative h-[700px] hidden lg:block">
          
          {/* Central AI Node */}
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="absolute top-[300px] left-[250px] w-32 h-32 bg-white rounded-full shadow-[0_0_50px_rgba(109,40,217,0.2)] border-2 border-violet-100 flex flex-col items-center justify-center z-10"
          >
             <div className="text-violet-500 font-bold text-4xl tracking-tighter">AI</div>
             {/* Simple decorative circuits around AI */}
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-4 bg-violet-200"></div>
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-violet-200"></div>
             
             <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-4 bg-violet-200"></div>
             <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-violet-200"></div>
             
             <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-4 h-1 bg-violet-200"></div>
             <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-violet-200"></div>
             
             <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-4 h-1 bg-violet-200"></div>
             <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-violet-200"></div>
          </motion.div>
          
          {/* Connecting Lines (Simplified SVG approach) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ strokeDasharray: "4 4" }}>
            {/* AI to Sophia (Left) */}
            <path d="M 250 364 Q 150 364 150 430" fill="none" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M 150 430 L 140 420 M 150 430 L 160 420" fill="none" stroke="#C4B5FD" strokeWidth="2" /> {/* Arrowhead */}
            
            {/* AI to Liam (Top Right) */}
            <path d="M 360 330 Q 420 300 450 250" fill="none" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M 450 250 L 440 260 M 450 250 L 460 255" fill="none" stroke="#C4B5FD" strokeWidth="2" /> {/* Arrowhead */}
            
            {/* AI to Olivia (Bottom Right) */}
            <path d="M 370 400 Q 450 450 480 480" fill="none" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M 480 480 L 470 470 M 480 480 L 475 465" fill="none" stroke="#C4B5FD" strokeWidth="2" /> {/* Arrowhead */}
          </svg>

          {/* Sophia Card (Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute top-[180px] left-[0px] w-[220px] bg-white rounded-3xl p-3 shadow-xl z-20"
          >
            {/* Height matches the source aspect (1291x1218) so the badge baked
                into the image is never cropped. */}
            <div className="w-full h-[185px] rounded-2xl overflow-hidden mb-3 bg-violet-50 relative">
               <img src="/match-candidate-98.jpg" alt="Sophia Williams — 98% match" className="w-full h-full object-cover" width={520} height={491} />
            </div>
            <div className="px-1">
              <h3 className="font-bold text-[15px] text-[#111111]">Sophia Williams</h3>
              <p className="text-[12px] text-slate-500 mb-3">Senior UI/UX Designer</p>
              
              <div className="flex gap-1 mb-4 flex-wrap">
                <span className="text-[10px] bg-violet-50 text-violet-600 px-2 py-0.5 rounded">UI/UX</span>
                <span className="text-[10px] bg-violet-50 text-violet-600 px-2 py-0.5 rounded">Figma</span>
                <span className="text-[10px] bg-violet-50 text-violet-600 px-2 py-0.5 rounded">Prototyping</span>
              </div>
              
              <div className="bg-green-50 rounded-xl p-2 flex items-center gap-2 border border-green-100 mb-1">
                 <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                 </div>
                 <div className="flex flex-col leading-tight">
                    <span className="text-[10px] text-green-700">Match Score</span>
                    <span className="font-bold text-green-700 text-[18px]">98%</span>
                 </div>
              </div>
              <p className="text-green-600 text-[11px] font-medium text-center">Highly Matched</p>
            </div>
          </motion.div>

          {/* Liam Card (Top Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute top-[80px] left-[350px] w-[180px] bg-white rounded-3xl p-2 shadow-xl z-20"
          >
            {/* Height matches the source aspect (1324x1188). */}
            <div className="w-full h-[147px] rounded-2xl overflow-hidden mb-2 bg-violet-50 relative">
               <img src="/match-candidate-85.jpg" alt="Liam Johnson — 85% match" className="w-full h-full object-cover" width={460} height={413} />
            </div>
            <div className="px-2 pb-2">
              <h3 className="font-bold text-[13px] text-[#111111]">Liam Johnson</h3>
              <p className="text-[10px] text-slate-500 mb-2">Product Designer</p>
              <div className="flex gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-violet-500 text-violet-500" />
                ))}
                <Star className="w-3 h-3 fill-slate-200 text-slate-200" />
              </div>
            </div>
          </motion.div>

          {/* Olivia Card (Bottom Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute bottom-[80px] right-[100px] w-[180px] bg-white rounded-3xl p-2 shadow-xl z-20"
          >
            {/* Height matches the source aspect (1254x1254). */}
            <div className="w-full h-[164px] rounded-2xl overflow-hidden mb-2 bg-purple-50 relative">
               <img src="/match-candidate-72.jpg" alt="Olivia Brown — 72% match" className="w-full h-full object-cover" width={460} height={460} />
            </div>
            <div className="px-2 pb-2">
              <h3 className="font-bold text-[13px] text-[#111111]">Olivia Brown</h3>
              <p className="text-[10px] text-slate-500 mb-2">UX Researcher</p>
              <div className="flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-purple-500 text-purple-500" />
                ))}
                <Star className="w-3 h-3 fill-slate-200 text-slate-200" />
                <Star className="w-3 h-3 fill-slate-200 text-slate-200" />
              </div>
            </div>
          </motion.div>

          {/* AI Matching Insights Card (Top Right Corner) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute top-[80px] right-[-50px] w-[260px] bg-white rounded-3xl p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-30"
          >
            <h3 className="font-bold text-[15px] mb-5 text-[#111111]">AI Matching Insights</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center"><Users className="w-4 h-4 text-green-600"/></div>
                  <span className="text-[13px] font-medium text-[#111111]">Total Candidates</span>
                </div>
                <span className="font-bold text-green-600 text-[14px]">12,540</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center"><Target className="w-4 h-4 text-violet-600"/></div>
                  <span className="text-[13px] font-medium text-[#111111]">Matched Candidates</span>
                </div>
                <span className="font-bold text-violet-600 text-[14px]">3,782</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-violet-500"/></div>
                  <span className="text-[13px] font-medium text-[#111111]">Avg. Match Score</span>
                </div>
                <span className="font-bold text-violet-500 text-[14px]">86%</span>
              </div>
            </div>
          </motion.div>
          
        </div>

        {/* Mobile Visual Fallback */}
        <div className="w-full relative h-[400px] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-white lg:hidden mt-8">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="AI Candidate Matching" className="w-full h-full object-cover" />
        </div>

      </div>
    </section>
  );
}
