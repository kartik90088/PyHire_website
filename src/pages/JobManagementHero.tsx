import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { DEMO_PATH, QUOTE_PATH } from '../lib/routes';
import { Briefcase, FileText, CheckCircle, Folder, Star, Building2, User, Users } from 'lucide-react';

export function JobManagementHero() {
  return (
    <section className="relative w-full bg-[#fdfdfd] pt-12 pb-12 lg:pt-10 lg:pb-8 overflow-hidden flex justify-center">
      
      {/* Background Shapes */}
      <div className="absolute top-1/2 -left-20 w-40 h-40 bg-blue-500 rounded-full opacity-90 -translate-y-1/2 hidden lg:block"></div>
      <div className="absolute bottom-20 left-40 w-6 h-6 bg-green-400 rounded-full hidden lg:block"></div>
      <div className="absolute -bottom-20 right-[-100px] w-80 h-80 bg-orange-600 rounded-full hidden lg:block"></div>
      <div className="absolute top-20 right-[40%] w-12 h-12 border-4 border-orange-200 rounded-full hidden lg:block"></div>
      
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
            Job Management<br/>Made Simple<br/>With PyHire
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[1.125rem] text-[#4B5563] mb-6 leading-relaxed max-w-md"
          >
            Create, track, and manage jobs effortlessly. From opening to closing, PyHire keeps your hiring process organized and efficient.
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


        {/* Mobile Visual Fallback */}
        <div className="w-full relative h-[400px] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-white lg:hidden mt-8">
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80" alt="Job Management" className="w-full h-full object-cover" />
        </div>

        {/* Right Content - Visual Collage */}
        <div className="w-full lg:w-7/12 relative h-[700px] hidden lg:block">
          
          {/* Connecting Lines (Simplified SVG approach) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ strokeDasharray: "4 4" }}>
            <path d="M 200 300 Q 300 250 450 150" fill="none" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M 450 150 Q 550 200 650 450" fill="none" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M 350 400 Q 400 500 500 600" fill="none" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M 300 550 Q 200 600 250 700" fill="none" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M 500 600 Q 600 600 700 650" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          </svg>

          {/* Main central image (Woman pointing) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute top-[80px] left-[150px] w-[260px] h-[340px] rounded-[32px] overflow-hidden shadow-2xl z-20 border-4 border-white bg-slate-100"
          >
            <img src="/recruiter-portrait.jpg" alt="Recruiter reviewing job openings" className="w-full h-full object-cover" width={600} height={849} />
          </motion.div>

          {/* Second image (Man on phone) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute top-[220px] right-[160px] w-[200px] h-[280px] rounded-[32px] overflow-hidden shadow-2xl z-20 border-4 border-white bg-slate-100"
          >
            <img src="/job-management-hiring-manager.jpg" alt="Hiring manager at his desk" className="w-full h-full object-cover" width={900} height={618} />
          </motion.div>

          {/* Job Management Card (Top Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-0 right-0 w-[240px] bg-white rounded-3xl p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-30"
          >
            <h3 className="font-bold text-[15px] mb-4 text-[#111111]">Job Management</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center"><Briefcase className="w-4 h-4 text-blue-500"/></div>
                  <span className="text-[13px] font-medium text-slate-600">Active Jobs</span>
                </div>
                <span className="font-bold text-blue-500">24</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center"><FileText className="w-4 h-4 text-orange-500"/></div>
                  <span className="text-[13px] font-medium text-slate-600">Draft Jobs</span>
                </div>
                <span className="font-bold text-orange-500">06</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500"/></div>
                  <span className="text-[13px] font-medium text-slate-600">Closed Jobs</span>
                </div>
                <span className="font-bold text-green-500">18</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center"><Folder className="w-4 h-4 text-purple-500"/></div>
                  <span className="text-[13px] font-medium text-slate-600">Total Jobs</span>
                </div>
                <span className="font-bold text-[#111111]">48</span>
              </div>
            </div>
          </motion.div>

          {/* Ratings Card (Center Bottom) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute bottom-[100px] left-[320px] w-[180px] bg-white rounded-3xl p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-30 flex flex-col items-center"
          >
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="font-bold text-[24px] text-[#111111] mb-4">4.5</div>
            <div className="w-full space-y-2">
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-slate-500">Jan</span>
                <span className="font-bold flex items-center gap-1">4.2 <Star className="w-3 h-3 fill-yellow-400 text-yellow-400"/></span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-slate-500">Feb</span>
                <span className="font-bold flex items-center gap-1">3.4 <Star className="w-3 h-3 fill-yellow-400 text-yellow-400"/></span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-slate-500">March</span>
                <span className="font-bold flex items-center gap-1">4.3 <Star className="w-3 h-3 fill-yellow-400 text-yellow-400"/></span>
              </div>
            </div>
          </motion.div>

          
          {/* Small floating avatars */}
          <div className="absolute top-[40px] left-[350px] w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden z-20">
             <img src="https://images.unsplash.com/photo-1600878459138-e1123b37cb30?auto=format&fit=crop&w=100&q=80" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-[80px] right-[240px] w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden z-20">
             <img src="https://images.unsplash.com/photo-1628726987013-db899232027c?auto=format&fit=crop&w=100&q=80" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-[130px] right-[280px] w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden z-20">
             <img src="https://images.unsplash.com/photo-1584554376766-ac0f2c65e949?auto=format&fit=crop&w=100&q=80" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-[260px] left-[420px] w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden z-20">
             <img src="https://images.unsplash.com/photo-1568585105565-e372998a195d?auto=format&fit=crop&w=100&q=80" alt="" className="w-full h-full object-cover" />
          </div>
          
          {/* Small circular icons */}
          <div className="absolute top-[-20px] left-[250px] w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shadow-sm z-20">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="absolute bottom-[10px] right-[250px] w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shadow-sm z-20">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

      </div>
    </section>
  );
}
