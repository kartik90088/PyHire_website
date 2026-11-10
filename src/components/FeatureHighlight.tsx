import { Sparkle, Zap, Target, Users, Settings, Shield, BarChart3, Star, Check, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { DEMO_PATH } from "../lib/routes";

export function FeatureHighlight() {
  return (
    <section className="py-4 lg:py-8 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Left Content */}
          <div className="w-full lg:w-[35%] space-y-6 z-10">
            <h2 className="text-[3.5rem] lg:text-[4.5rem] font-bold text-slate-900 leading-[1.05] tracking-tight mb-8">
              Why Recruitment Teams<br />
              Choose PyHire.
            </h2>
            <p className="text-slate-600 text-[1.125rem] leading-relaxed max-w-[440px] mb-8">
              Recruitment teams choose PyHire to hire faster, improve recruiter productivity, deliver a better candidate experience, and scale hiring operations with AI-powered automation—all from one intelligent recruitment platform.
            </p>
            <div className="pt-6 relative inline-block">
              <Link to={DEMO_PATH} className="px-8 py-4 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full font-medium text-lg transition-colors shadow-lg shadow-violet-500/25 inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2">
                Book A Demo
              </Link>
              <Sparkle className="absolute -top-2 -right-6 w-8 h-8 text-yellow-400 fill-yellow-400" />
            </div>
          </div>

          {/* Right Content - Illustration area */}
          <div className="w-full lg:w-[65%] relative h-[650px] lg:h-[800px] flex items-center justify-center">
             {/* Large background blob */}
             <div className="absolute right-[-10%] top-[0%] w-[120%] h-[120%] bg-[#F5F9FF] rounded-full blur-[60px] opacity-80 -z-10 hidden sm:block"></div>
             <div className="absolute right-[-10%] top-[5%] bottom-0 w-[95%] bg-[#F6F3FF] rounded-tl-[400px] rounded-bl-[200px] -z-10"></div>
             
             {/* The Interactive Diagram */}
             <div className="relative w-full h-full min-h-[650px] max-w-[900px] hidden sm:block">
                
                {/* SVG Connections (Responsive) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                   <g stroke="#fde68a" strokeWidth="0.3" strokeDasharray="1.5 1.5" fill="none">
                     <path d="M 50 46 C 40 46 27 55 27 64" />
                     <path d="M 50 46 C 50 35 35 30 35 22" />
                     <path d="M 50 46 C 55 35 60 20 68 20" />
                     <path d="M 50 46 C 65 40 75 29 86 29" />
                     <path d="M 50 46 C 65 48 75 50 88 50" />
                     <path d="M 50 46 C 65 60 75 73 86 73" />
                     <path d="M 50 46 C 60 70 65 80 68 85" />
                     <path d="M 50 46 C 60 70 70 90 85 88" />
                   </g>
                </svg>

                {/* AI Center Node */}
                <div className="absolute top-[46%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/90 backdrop-blur-sm rounded-[24px] shadow-[0_8px_40px_rgb(245,166,35,0.25)] flex items-center justify-center z-30 border border-violet-50">
                   <span className="text-[1.25rem] font-bold text-[#6D28D9]">PyHire</span>
                </div>

                {/* 1. Hire Faster */}
                <div className="absolute top-[22%] left-[35%] -translate-x-1/2 -translate-y-1/2 w-[210px] bg-white rounded-[20px] p-4 shadow-xl border border-slate-50 z-20 hover:-translate-y-1 transition-transform">
                   <h4 className="font-bold text-slate-800 text-[13px] mb-3 tracking-tight">Hire Faster</h4>
                   <div className="w-10 h-10 mb-3 bg-violet-50/50 rounded-xl flex items-center justify-center">
                     <Zap className="w-6 h-6 text-[#6D28D9]" strokeWidth={1.5} />
                   </div>
                   <p className="text-[11px] text-slate-500 leading-snug">Reduce time-to-hire with intelligent automation and streamlined recruitment workflows.</p>
                   <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#f5a623] rounded-full flex items-center justify-center border-2 border-white"><Check className="w-3.5 h-3.5 text-white stroke-[3]"/></div>
                </div>

                {/* 2. Better Candidate Quality */}
                <div className="absolute top-[20%] left-[68%] -translate-x-1/2 -translate-y-1/2 w-[210px] bg-white rounded-[20px] p-4 shadow-xl border border-slate-50 z-20 hover:-translate-y-1 transition-transform">
                   <h4 className="font-bold text-slate-800 text-[13px] mb-3 tracking-tight">Better Candidate Quality</h4>
                   <div className="w-10 h-10 mb-3 bg-violet-50/50 rounded-xl flex items-center justify-center">
                     <Target className="w-6 h-6 text-[#6D28D9]" strokeWidth={1.5} />
                   </div>
                   <p className="text-[11px] text-slate-500 leading-snug">AI helps identify the most relevant candidates based on skills, experience, and job fit.</p>
                   <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#f5a623] rounded-full flex items-center justify-center border-2 border-white"><Check className="w-3.5 h-3.5 text-white stroke-[3]"/></div>
                </div>

                {/* 3. Boost Recruiter Productivity */}
                <div className="absolute top-[29%] left-[86%] -translate-x-1/2 -translate-y-1/2 w-[210px] bg-white rounded-[20px] p-4 shadow-xl border border-slate-50 z-20 hover:-translate-y-1 transition-transform">
                   <h4 className="font-bold text-slate-800 text-[13px] mb-3 tracking-tight">Boost Recruiter Productivity</h4>
                   <div className="w-10 h-10 mb-3 bg-violet-50/50 rounded-xl flex items-center justify-center">
                     <Users className="w-6 h-6 text-[#6D28D9]" strokeWidth={1.5} />
                   </div>
                   <p className="text-[11px] text-slate-500 leading-snug">Automate repetitive recruitment tasks so recruiters can focus on engaging top talent.</p>
                   <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#f5a623] rounded-full flex items-center justify-center border-2 border-white"><Check className="w-3.5 h-3.5 text-white stroke-[3]"/></div>
                </div>

                {/* 4. Scale Without Complexity */}
                <div className="absolute top-[50%] left-[88%] -translate-x-1/2 -translate-y-1/2 w-[210px] bg-white rounded-[20px] p-4 shadow-xl border border-slate-50 z-20 hover:-translate-y-1 transition-transform">
                   <h4 className="font-bold text-slate-800 text-[13px] mb-3 tracking-tight">Scale Without Complexity</h4>
                   <div className="w-10 h-10 mb-3 bg-violet-50/50 rounded-xl flex items-center justify-center">
                     <Settings className="w-6 h-6 text-[#6D28D9]" strokeWidth={1.5} />
                   </div>
                   <p className="text-[11px] text-slate-500 leading-snug">Manage multiple recruiters, teams, clients, and high-volume hiring from one platform.</p>
                   <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#f5a623] rounded-full flex items-center justify-center border-2 border-white"><Check className="w-3.5 h-3.5 text-white stroke-[3]"/></div>
                </div>

                {/* 5. Enterprise Security */}
                <div className="absolute top-[73%] left-[86%] -translate-x-1/2 -translate-y-1/2 w-[210px] bg-white rounded-[20px] p-4 shadow-xl border border-slate-50 z-20 hover:-translate-y-1 transition-transform">
                   <h4 className="font-bold text-slate-800 text-[13px] mb-3 tracking-tight">Enterprise Security</h4>
                   <div className="w-10 h-10 mb-3 bg-violet-50/50 rounded-xl flex items-center justify-center">
                     <Shield className="w-6 h-6 text-[#6D28D9]" strokeWidth={1.5} />
                   </div>
                   <p className="text-[11px] text-slate-500 leading-snug">Protect candidate data with role-based access, audit trails, and compliance-ready workflows.</p>
                   <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#f5a623] rounded-full flex items-center justify-center border-2 border-white"><Check className="w-3.5 h-3.5 text-white stroke-[3]"/></div>
                </div>

                {/* 6. Data-Driven Hiring */}
                <div className="absolute top-[85%] left-[68%] -translate-x-1/2 -translate-y-1/2 w-[210px] bg-white rounded-[20px] p-4 shadow-xl border border-slate-50 z-20 hover:-translate-y-1 transition-transform">
                   <h4 className="font-bold text-slate-800 text-[13px] mb-3 tracking-tight">Data-Driven Hiring</h4>
                   <div className="w-10 h-10 mb-3 bg-violet-50/50 rounded-xl flex items-center justify-center">
                     <BarChart3 className="w-6 h-6 text-[#6D28D9]" strokeWidth={1.5} />
                   </div>
                   <p className="text-[11px] text-slate-500 leading-snug">Track hiring performance, recruiter productivity, and pipeline health with real-time analytics.</p>
                   <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#f5a623] rounded-full flex items-center justify-center border-2 border-white"><Check className="w-3.5 h-3.5 text-white stroke-[3]"/></div>
                </div>

                {/* 7. Hiring Success (Small) */}
                <div className="absolute top-[88%] left-[85%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-[16px] p-3 px-5 shadow-xl border border-slate-50 z-20 hover:-translate-y-1 transition-transform flex flex-col items-center gap-1">
                   <h4 className="font-bold text-slate-800 text-[13px]">Hiring Success</h4>
                   <div className="flex items-center gap-2 mt-1">
                      <div className="w-6 h-6 bg-[#4ade80] rounded-full flex items-center justify-center"><Check className="w-3.5 h-3.5 text-white stroke-[3]"/></div>
                      <span className="text-[12px] font-medium text-slate-600">Faster hiring!</span>
                   </div>
                   <Sparkle className="absolute -bottom-2 -right-3 w-4 h-4 text-yellow-400 fill-yellow-400" />
                   <Sparkle className="absolute top-0 -left-2 w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                </div>

                {/* Main Screen Mockup (Top Candidates) */}
                <div className="absolute top-[64%] left-[27%] -translate-x-1/2 -translate-y-1/2 w-[340px] bg-white rounded-[28px] p-6 shadow-2xl border-[6px] border-slate-50/80 z-20">
                   <div className="flex items-center justify-between mb-6">
                      <h4 className="font-bold text-slate-900 text-[15px]">Top Candidates</h4>
                   </div>
                   <div className="space-y-5">
                      {/* Candidate 1 */}
                      <div className="flex items-center justify-between border-b border-slate-50/80 pb-4">
                         <div className="flex items-center gap-4">
                            <img alt="" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100" className="w-11 h-11 rounded-full object-cover bg-slate-100" />
                            <div>
                               <div className="text-[14px] font-bold text-slate-800">Jane Cooper</div>
                               <div className="text-[12px] text-slate-500">Product Designer</div>
                            </div>
                         </div>
                         <div className="flex items-center gap-1 text-[#f5a623] font-bold text-[15px]">
                            <Star className="w-4 h-4 fill-[#f5a623] text-[#f5a623]" /> 98%
                         </div>
                      </div>
                      {/* Candidate 2 */}
                      <div className="flex items-center justify-between border-b border-slate-50/80 pb-4">
                         <div className="flex items-center gap-4">
                            <img alt="" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100" className="w-11 h-11 rounded-full object-cover bg-slate-100" />
                            <div>
                               <div className="text-[14px] font-bold text-slate-800">Cody Fisher</div>
                               <div className="text-[12px] text-slate-500">Full Stack Developer</div>
                            </div>
                         </div>
                         <div className="flex items-center gap-1 text-[#f5a623] font-bold text-[15px]">
                            <Star className="w-4 h-4 fill-[#f5a623] text-[#f5a623]" /> 94%
                         </div>
                      </div>
                      {/* Candidate 3 */}
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <img alt="" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100" className="w-11 h-11 rounded-full object-cover bg-slate-100" />
                            <div>
                               <div className="text-[14px] font-bold text-slate-800">Esther Howard</div>
                               <div className="text-[12px] text-slate-500">Marketing Manager</div>
                            </div>
                         </div>
                         <div className="flex items-center gap-1 text-[#f5a623] font-bold text-[15px]">
                            <Star className="w-4 h-4 fill-[#f5a623] text-[#f5a623]" /> 92%
                         </div>
                      </div>
                   </div>
                   
                   {/* Monitor stand decoration */}
                   <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-slate-200 to-slate-100 rounded-b-lg -z-10"></div>
                   <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-36 h-2.5 bg-slate-200 rounded-full -z-10 shadow-sm"></div>
                </div>

                {/* Decorative plant */}
                <div className="absolute top-[68%] left-[6%] -translate-x-1/2 -translate-y-1/2 w-24 h-40 z-10 hidden lg:block">
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-12 bg-violet-200 rounded-b-[16px] rounded-t-sm shadow-sm"></div>
                   <div className="absolute bottom-12 left-1/2 w-1.5 h-16 bg-emerald-700 -rotate-12 origin-bottom rounded-full"></div>
                   <div className="absolute bottom-16 left-[8px] w-8 h-12 bg-[#f5a623] rounded-full rounded-bl-none rotate-45 opacity-90"></div>
                   <div className="absolute bottom-20 right-[4px] w-7 h-10 bg-[#fcd34d] rounded-full rounded-br-none -rotate-45 opacity-90"></div>
                   <div className="absolute bottom-24 left-[24px] w-6 h-14 bg-[#fbbf24] rounded-full opacity-90"></div>
                </div>
             </div>
             
             {/* Mobile View (simplified) */}
             <div className="sm:hidden flex flex-col items-center gap-6 mt-8 w-full px-4 relative z-10">
                <div className="w-full max-w-[340px] bg-white rounded-[24px] p-6 shadow-2xl border-4 border-slate-50/80">
                   <div className="flex items-center justify-between mb-6">
                      <h4 className="font-bold text-slate-900 text-[15px]">Top Candidates</h4>
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                         <div className="flex items-center gap-3">
                            <img alt="" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100" className="w-10 h-10 rounded-full object-cover bg-slate-100" />
                            <div>
                               <div className="text-[13px] font-bold text-slate-800">Jane Cooper</div>
                               <div className="text-[11px] text-slate-500">Product Designer</div>
                            </div>
                         </div>
                         <div className="flex items-center gap-1 text-[#f5a623] font-bold text-[14px]">
                            <Star className="w-4 h-4 fill-[#f5a623] text-[#f5a623]" /> 98%
                         </div>
                      </div>
                   </div>
                </div>
                
                {/* A couple of cards for mobile context */}
                <div className="w-full max-w-[340px] bg-white rounded-[20px] p-4 shadow-xl border border-slate-50">
                   <h4 className="font-bold text-slate-800 text-[13px] mb-3">Hire Faster</h4>
                   <p className="text-[12px] text-slate-500">Reduce time-to-hire with intelligent automation.</p>
                </div>
             </div>

          </div>
        </div>
      </div>
    </section>
  );
}
