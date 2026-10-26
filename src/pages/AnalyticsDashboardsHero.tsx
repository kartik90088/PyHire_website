import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { DEMO_PATH, QUOTE_PATH } from '../lib/routes';
import { Users, UserPlus, Briefcase, Clock, LineChart, PieChart as PieChartIcon, MapPin, Target, TrendingUp, BarChart } from 'lucide-react';

export function AnalyticsDashboardsHero() {
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
        <div className="w-full lg:w-4/12 z-10 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[3.5rem] lg:text-[4.5rem] font-bold text-[#111111] leading-[1.1] tracking-tight mb-6"
          >
            Analytics &<br/>Dashboards
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[1.125rem] text-[#4B5563] mb-6 leading-relaxed max-w-md"
          >
            Real-time insights and powerful dashboards to track performance, measure success, and make data-driven hiring decisions.
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
        <div className="w-full lg:w-8/12 relative h-[700px] hidden lg:block">
          
          {/* Main Container SVG lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
             {/* Lines connecting the different widgets */}
             <path d="M 450 150 L 450 100 L 400 100" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="4 4" />
             <path d="M 680 400 L 730 400 L 730 450" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="4 4" />
             <path d="M 450 480 L 450 560 L 500 560" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Node icons for lines */}
          <div className="absolute top-[80px] left-[360px] w-12 h-12 bg-white rounded-full shadow-lg border border-orange-100 flex items-center justify-center z-10 text-orange-500">
             <PieChartIcon className="w-5 h-5" />
          </div>
          
          <div className="absolute top-[430px] right-[40px] w-12 h-12 bg-orange-500 rounded-full shadow-lg border-2 border-white flex items-center justify-center z-10 text-white">
             <Users className="w-5 h-5" />
          </div>

          <div className="absolute top-[540px] left-[460px] w-12 h-12 bg-white rounded-full shadow-lg border border-orange-100 flex items-center justify-center z-10 text-orange-500">
             <BarChart className="w-5 h-5" />
          </div>

          {/* Main Dashboard Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-[130px] left-[10px] w-[650px] bg-white rounded-3xl p-6 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] z-10 border border-slate-100"
          >
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[17px] text-[#111111]">Hiring Overview</h3>
                <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] text-slate-600 font-medium cursor-pointer flex items-center gap-2">
                   This Month <span className="text-[10px]">▼</span>
                </div>
             </div>

             <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                   <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center mb-3">
                      <Users className="w-4 h-4" />
                   </div>
                   <div className="text-[11px] text-slate-500 mb-1">Total Candidates</div>
                   <div className="text-xl font-bold text-[#111111] mb-1">12,540</div>
                   <div className="text-[11px] text-green-500 font-medium">+18.6% ↑</div>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                   <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3">
                      <Target className="w-4 h-4" />
                   </div>
                   <div className="text-[11px] text-slate-500 mb-1">Hired Candidates</div>
                   <div className="text-xl font-bold text-[#111111] mb-1">1,250</div>
                   <div className="text-[11px] text-green-500 font-medium">+12.4% ↑</div>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                   <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center mb-3">
                      <Briefcase className="w-4 h-4" />
                   </div>
                   <div className="text-[11px] text-slate-500 mb-1">Offer Acceptance</div>
                   <div className="text-xl font-bold text-[#111111] mb-1">85%</div>
                   <div className="text-[11px] text-green-500 font-medium">+8.2% ↑</div>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                   <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center mb-3">
                      <BarChart className="w-4 h-4" />
                   </div>
                   <div className="text-[11px] text-slate-500 mb-1">Time to Hire</div>
                   <div className="text-xl font-bold text-[#111111] mb-1">18</div>
                   <div className="text-[11px] text-green-500 font-medium">-10.3% ↑</div>
                </div>
             </div>

             <div className="grid grid-cols-5 gap-6">
                 {/* Candidates by Stage */}
                 <div className="col-span-2 bg-slate-50/50 border border-slate-100 rounded-2xl p-5">
                    <h4 className="font-bold text-[13px] text-[#111111] mb-4">Candidates by Stage</h4>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full border-[16px] border-blue-500 relative flex items-center justify-center shadow-inner" style={{ borderTopColor: '#f97316', borderRightColor: '#22c55e', borderBottomColor: '#f59e0b', borderLeftColor: '#3b82f6' }}>
                           <div className="text-center absolute bg-white rounded-full w-full h-full flex flex-col items-center justify-center">
                              <span className="font-bold text-[#111111] text-[13px]">12,540</span>
                              <span className="text-[9px] text-slate-400">Total</span>
                           </div>
                        </div>
                        <div className="space-y-2.5 flex-1">
                            <div className="flex items-center justify-between text-[10px]">
                               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-blue-500"></div><span className="text-slate-600">Applied</span></div>
                               <span className="font-bold text-[#111111]">5,420 <span className="font-normal text-slate-400">(43%)</span></span>
                            </div>
                            <div className="flex items-center justify-between text-[10px]">
                               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-orange-500"></div><span className="text-slate-600">Screening</span></div>
                               <span className="font-bold text-[#111111]">3,210 <span className="font-normal text-slate-400">(26%)</span></span>
                            </div>
                            <div className="flex items-center justify-between text-[10px]">
                               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-amber-400"></div><span className="text-slate-600">Interview</span></div>
                               <span className="font-bold text-[#111111]">2,450 <span className="font-normal text-slate-400">(20%)</span></span>
                            </div>
                            <div className="flex items-center justify-between text-[10px]">
                               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-red-500"></div><span className="text-slate-600">Offered</span></div>
                               <span className="font-bold text-[#111111]">980 <span className="font-normal text-slate-400">(8%)</span></span>
                            </div>
                            <div className="flex items-center justify-between text-[10px]">
                               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-green-500"></div><span className="text-slate-600">Hired</span></div>
                               <span className="font-bold text-[#111111]">480 <span className="font-normal text-slate-400">(3%)</span></span>
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* Hiring Trends Chart (Fake) */}
                 <div className="col-span-3 bg-slate-50/50 border border-slate-100 rounded-2xl p-5 relative overflow-hidden">
                    <h4 className="font-bold text-[13px] text-[#111111] mb-6">Hiring Trends</h4>
                    <div className="absolute bottom-6 left-5 right-5 h-[100px] border-l border-b border-slate-200">
                        {/* Fake grid lines */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-slate-100"></div>
                        <div className="absolute top-[25%] left-0 w-full h-[1px] bg-slate-100"></div>
                        <div className="absolute top-[50%] left-0 w-full h-[1px] bg-slate-100"></div>
                        <div className="absolute top-[75%] left-0 w-full h-[1px] bg-slate-100"></div>
                        
                        {/* Fake line chart */}
                        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                           <path d="M 0 80 Q 20 70 40 50 T 80 40 T 120 70 T 160 50 T 200 40 T 240 60 T 280 20" fill="none" stroke="#3b82f6" strokeWidth="2" />
                           <path d="M 0 80 Q 20 70 40 50 T 80 40 T 120 70 T 160 50 T 200 40 T 240 60 T 280 20 L 280 100 L 0 100 Z" fill="url(#gradient)" opacity="0.2" />
                           <defs>
                              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                              </linearGradient>
                           </defs>
                           {/* Data points */}
                           <circle cx="0" cy="80" r="3" fill="#3b82f6" />
                           <circle cx="40" cy="50" r="3" fill="#3b82f6" />
                           <circle cx="80" cy="40" r="3" fill="#3b82f6" />
                           <circle cx="120" cy="70" r="3" fill="#3b82f6" />
                           <circle cx="160" cy="50" r="3" fill="#3b82f6" />
                           <circle cx="200" cy="40" r="3" fill="#3b82f6" />
                           <circle cx="240" cy="60" r="3" fill="#3b82f6" />
                           <circle cx="280" cy="20" r="3" fill="#3b82f6" />
                        </svg>

                        {/* Y-axis labels */}
                        <div className="absolute -left-6 top-[-5px] text-[8px] text-slate-400">8K</div>
                        <div className="absolute -left-6 top-[20px] text-[8px] text-slate-400">6K</div>
                        <div className="absolute -left-6 top-[45px] text-[8px] text-slate-400">4K</div>
                        <div className="absolute -left-6 top-[70px] text-[8px] text-slate-400">2K</div>
                        <div className="absolute -left-4 top-[95px] text-[8px] text-slate-400">0</div>

                        {/* X-axis labels */}
                        <div className="absolute bottom-[-15px] left-0 flex justify-between w-full text-[8px] text-slate-400">
                           <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                        </div>
                    </div>
                 </div>
             </div>
          </motion.div>

          {/* Floating Card: Offer Acceptance Rate */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute top-[520px] left-[50px] w-[180px] bg-white rounded-3xl p-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] z-20 border border-slate-100 flex flex-col items-center justify-center text-center"
          >
             <h4 className="font-bold text-[12px] text-[#111111] mb-3">Offer Acceptance Rate</h4>
             <div className="relative w-24 h-12 overflow-hidden mb-2">
                 <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-[10px] border-slate-100"></div>
                 <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-[10px] border-green-500 border-b-transparent border-r-transparent transform -rotate-45"></div>
             </div>
             <div className="font-bold text-2xl text-[#111111] -mt-4 mb-1">85%</div>
             <div className="text-[9px] text-green-500 font-medium">▲ 8.2% vs last month</div>
          </motion.div>

          {/* Floating Card: Candidate Location Map */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute top-[520px] left-[260px] w-[260px] bg-white rounded-3xl p-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] z-20 border border-slate-100"
          >
             <h4 className="font-bold text-[12px] text-[#111111] mb-3">Candidate Location</h4>
             <div className="w-full h-20 bg-blue-50/50 rounded-xl relative border border-blue-100 overflow-hidden">
                {/* Simplified map shapes */}
                <svg className="w-full h-full opacity-30 text-blue-400" viewBox="0 0 100 50">
                   <path fill="currentColor" d="M10,20 Q15,15 20,20 T30,15 T40,25 T35,35 T20,30 Z M50,15 Q60,10 70,20 T80,10 T90,25 T75,35 T60,25 Z M30,40 Q40,35 45,45 T35,50 Z" />
                </svg>
                <div className="absolute top-3 left-4 w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_0_3px_rgba(37,99,235,0.2)]"></div>
                <div className="absolute top-6 left-12 w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_0_3px_rgba(37,99,235,0.2)]"></div>
                <div className="absolute top-5 right-8 w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_0_3px_rgba(37,99,235,0.2)]"></div>
                <div className="absolute bottom-4 right-16 w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_0_3px_rgba(37,99,235,0.2)]"></div>
             </div>
          </motion.div>

          {/* Floating Card: Source of Hire (Right side) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute top-[230px] right-[0px] w-[180px] bg-white rounded-3xl p-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] z-20 border border-slate-100"
          >
             <h4 className="font-bold text-[12px] text-[#111111] mb-4">Source of Hire</h4>
             
             <div className="w-20 h-20 mx-auto rounded-full border-[12px] border-blue-500 relative flex items-center justify-center shadow-sm mb-4" style={{ borderTopColor: '#f97316', borderRightColor: '#f59e0b', borderBottomColor: '#3b82f6', borderLeftColor: '#60a5fa' }}>
                <div className="w-8 h-8 rounded-full bg-white absolute"></div>
             </div>

             <div className="space-y-2">
                 <div className="flex items-center justify-between text-[9px]">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-blue-500"></div><span className="text-slate-600">Job Boards</span></div>
                    <span className="font-bold text-[#111111]">45%</span>
                 </div>
                 <div className="flex items-center justify-between text-[9px]">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-blue-400"></div><span className="text-slate-600">Referrals</span></div>
                    <span className="font-bold text-[#111111]">25%</span>
                 </div>
                 <div className="flex items-center justify-between text-[9px]">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-orange-400"></div><span className="text-slate-600">Career Site</span></div>
                    <span className="font-bold text-[#111111]">20%</span>
                 </div>
                 <div className="flex items-center justify-between text-[9px]">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-orange-500"></div><span className="text-slate-600">Others</span></div>
                    <span className="font-bold text-[#111111]">10%</span>
                 </div>
             </div>
          </motion.div>

        </div>

        {/* Mobile Visual Fallback */}
        <div className="w-full relative h-[400px] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-white lg:hidden mt-8">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="Analytics & Dashboards" className="w-full h-full object-cover" />
        </div>

      </div>
    </section>
  );
}
