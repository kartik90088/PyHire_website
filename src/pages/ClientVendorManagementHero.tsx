import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { DEMO_PATH, QUOTE_PATH } from '../lib/routes';
import { Building2, Briefcase, Users, Handshake, BarChart, ShieldCheck, User } from 'lucide-react';

export function ClientVendorManagementHero() {
  return (
    <section className="relative w-full bg-[#fdfdfd] pt-12 pb-12 lg:pt-10 lg:pb-8 overflow-hidden flex justify-center">
      
      {/* Background Shapes */}
      <div className="absolute top-1/2 -left-20 w-40 h-40 bg-blue-500 rounded-full opacity-90 -translate-y-1/2 hidden lg:block"></div>
      <div className="absolute bottom-20 left-40 w-6 h-6 bg-green-400 rounded-full hidden lg:block"></div>
      <div className="absolute -bottom-20 right-[-100px] w-80 h-80 bg-orange-600 rounded-full hidden lg:block"></div>
      
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
            Client & Vendor<br/>Management
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[1.125rem] text-[#4B5563] mb-6 leading-relaxed max-w-md"
          >
            Build stronger relationships and manage all your clients and vendors in one unified system. Seamless. Organized. Efficient.
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

        {/* Right Content - Visual Collage */}
        <div className="w-full lg:w-7/12 relative h-[700px] hidden lg:block perspective-[1000px]">
          
          <div className="absolute inset-0 flex items-center justify-center transform-style-3d rotate-x-12">
            
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ transform: 'translateZ(-50px)' }}>
                {/* Left lines */}
                <path d="M 280 250 L 330 250 L 330 350 L 370 350" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 280 350 L 370 350" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 280 450 L 330 450 L 330 350 L 370 350" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4" />
                
                {/* Right lines */}
                <path d="M 520 250 L 470 250 L 470 350 L 430 350" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 520 350 L 430 350" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 520 450 L 470 450 L 470 350 L 430 350" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

            {/* Left Panel - Clients */}
            <motion.div 
                initial={{ opacity: 0, x: -50, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 15 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute left-[50px] top-[100px] w-[260px] bg-white rounded-3xl p-5 shadow-[20px_20px_60px_rgba(0,0,0,0.1),-10px_-10px_30px_rgba(255,255,255,0.8)] z-10 border border-slate-100"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div className="flex items-center gap-3 mb-6 bg-blue-500 rounded-full p-2 pr-6 w-max shadow-lg shadow-blue-200">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="text-white font-bold text-[13px] tracking-wide">CLIENTS</span>
                </div>
                
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                                <Building2 className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="h-2 bg-slate-200 rounded-full w-full"></div>
                                <div className="h-1.5 bg-slate-100 rounded-full w-2/3"></div>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Center Node */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute left-[340px] top-[290px] w-32 h-32 bg-white rounded-full shadow-[0_0_50px_rgba(167,139,250,0.3)] border-4 border-indigo-50 flex items-center justify-center z-20"
            >
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center border border-indigo-100">
                    <div className="flex -space-x-2">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center shadow-md z-10">
                            <User className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
                
                {/* Decorative nodes on circle */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-200 border-2 border-white"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-purple-200 border-2 border-white"></div>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-400 border-2 border-white"></div>
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-400 border-2 border-white"></div>
            </motion.div>

            {/* Right Panel - Vendors */}
            <motion.div 
                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: -15 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute right-[10px] top-[100px] w-[260px] bg-white rounded-3xl p-5 shadow-[20px_20px_60px_rgba(0,0,0,0.1),-10px_-10px_30px_rgba(255,255,255,0.8)] z-10 border border-slate-100"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div className="flex items-center gap-3 mb-6 bg-purple-500 rounded-full p-2 pr-6 w-max shadow-lg shadow-purple-200 float-right">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-purple-500" />
                    </div>
                    <span className="text-white font-bold text-[13px] tracking-wide">VENDORS</span>
                </div>
                <div className="clear-both"></div>
                
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                                <User className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="h-2 bg-slate-200 rounded-full w-full"></div>
                                <div className="h-1.5 bg-slate-100 rounded-full w-2/3"></div>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Bottom Pedestal Elements */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[480px] h-24 bg-white rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center gap-8 border-b-4 border-slate-100"
            >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-[0_10px_20px_-5px_rgba(59,130,246,0.3)] flex items-center justify-center -mt-6 border border-slate-50">
                    <Handshake className="w-8 h-8 text-blue-500" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white shadow-[0_10px_20px_-5px_rgba(167,139,250,0.3)] flex items-center justify-center mt-2 border border-slate-50">
                    <BarChart className="w-8 h-8 text-purple-500" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white shadow-[0_10px_20px_-5px_rgba(34,197,94,0.3)] flex items-center justify-center -mt-6 border border-slate-50">
                    <ShieldCheck className="w-8 h-8 text-green-500" />
                </div>
            </motion.div>
            
          </div>

        </div>

        {/* Mobile Visual Fallback */}
        <div className="w-full relative h-[400px] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-white lg:hidden mt-8">
          <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80" alt="Client & Vendor Management" className="w-full h-full object-cover" />
        </div>

      </div>
    </section>
  );
}
