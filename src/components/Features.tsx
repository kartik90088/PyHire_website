import { Briefcase, Target, Users, Kanban, CalendarDays, MessageSquare, Building2, BarChart3, Video, Shield, FileCheck, Layers, ChevronRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { DEMO_PATH } from "../lib/routes";

/** The 11 capability cards, shared with the home page product accordion. */
export const featureCards = [
    {
      icon: <Briefcase className="w-6 h-6 text-[#6D28D9]" />,
      title: "Job Management",
      description: "Create, manage, and organize job openings with AI-assisted job creation and hiring workflows.",
      mockup: (
        <div className="bg-[#f8fbfa] rounded-2xl p-5 border border-slate-100 flex-1 flex flex-col mt-4">
           <div className="text-[11px] font-bold text-slate-400 mb-3">Active Jobs</div>
           <div className="space-y-3">
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm border-l-2 border-l-orange-400">
                 <div className="text-[12px] font-bold text-slate-800">Senior React Developer</div>
                 <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500">
                   <span>Remote • Full-time</span>
                   <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold">12 Applicants</span>
                 </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm border-l-2 border-l-blue-400">
                 <div className="text-[12px] font-bold text-slate-800">Product Manager</div>
                 <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500">
                   <span>New York • Hybrid</span>
                   <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold">45 Applicants</span>
                 </div>
              </div>
           </div>
        </div>
      )
    },
    {
      icon: <Target className="w-6 h-6 text-[#6D28D9]" />,
      title: "AI Candidate Matching",
      description: "Automatically identify the best candidates using AI-powered skills, experience, and qualification matching.",
      mockup: (
        <div className="bg-[#f8fbfa] rounded-2xl p-5 border border-slate-100 flex-1 flex flex-col mt-4">
           <div className="text-[11px] font-bold text-slate-400 mb-3">Top Matches</div>
           <div className="space-y-3">
              <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden"><img alt="" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100" className="w-full h-full object-cover"/></div>
                   <div>
                     <div className="text-[12px] font-bold text-slate-800">Sarah Jenkis</div>
                     <div className="text-[10px] text-slate-500">Sr. Product Designer</div>
                   </div>
                 </div>
                 <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-[10px] font-bold">98% Match</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden"><img alt="" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100" className="w-full h-full object-cover"/></div>
                   <div>
                     <div className="text-[12px] font-bold text-slate-800">David Ross</div>
                     <div className="text-[10px] text-slate-500">UX Researcher</div>
                   </div>
                 </div>
                 <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-[10px] font-bold">94% Match</div>
              </div>
           </div>
        </div>
      )
    },
    {
      icon: <Users className="w-6 h-6 text-[#6D28D9]" />,
      title: "Candidate Management",
      description: "Manage candidate profiles, recruitment history, assignments, and sourcing from one centralized database.",
      mockup: (
        <div className="bg-[#f8fbfa] rounded-2xl p-5 border border-slate-100 flex-1 flex flex-col mt-4">
          <div className="text-[11px] font-bold text-slate-400 mb-4">Talent Pool</div>
          <div className="flex items-center gap-6 justify-center mt-2">
            <div className="relative w-24 h-24 rounded-full border-[8px] border-[#f0fdf4] flex items-center justify-center border-l-[#4ade80] border-t-[#4ade80]">
               <div className="text-center">
                 <div className="text-xl font-bold text-slate-800">1,290</div>
                 <div className="text-[9px] text-slate-500 uppercase">Profiles</div>
               </div>
            </div>
            <div className="space-y-3">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#4ade80]"></div>
                 <div className="text-[11px] text-slate-600"><span className="font-bold text-slate-800">490</span> Active</div>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                 <div className="text-[11px] text-slate-600"><span className="font-bold text-slate-800">800</span> Passive</div>
               </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Kanban className="w-6 h-6 text-[#6D28D9]" />,
      title: "Candidate Pipeline",
      description: "Track every candidate from application to hiring with customizable recruitment stages.",
      mockup: (
        <div className="bg-[#f8fbfa] rounded-2xl p-5 border border-slate-100 flex-1 flex flex-col mt-4">
           <div className="space-y-3 mt-2">
              <div className="flex items-center justify-between text-[12px]">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-300"></div><span className="font-medium text-slate-600">Sourced</span></div>
                 <div className="font-bold text-slate-900">320</div>
              </div>
              <div className="flex items-center justify-between text-[12px] bg-white p-2 rounded-lg shadow-sm border border-violet-100 -mx-2 px-2">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-violet-400"></div><span className="font-bold text-violet-600">Screening</span></div>
                 <div className="font-bold text-violet-600">150</div>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-violet-400"></div><span className="font-medium text-slate-600">Interview</span></div>
                 <div className="font-bold text-slate-900">45</div>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400"></div><span className="font-medium text-slate-600">Offered</span></div>
                 <div className="font-bold text-slate-900">18</div>
              </div>
           </div>
        </div>
      )
    },
    {
      icon: <CalendarDays className="w-6 h-6 text-[#6D28D9]" />,
      title: "Interview Management",
      description: "Schedule interviews, collect structured feedback, and eliminate scheduling conflicts.",
      mockup: (
        <div className="bg-[#f8fbfa] rounded-2xl p-5 border border-slate-100 flex-1 flex flex-col mt-4">
           <div className="flex justify-between items-center mb-4">
              <div className="text-[12px] font-bold text-slate-800 flex items-center gap-1"><ChevronRight className="w-3 h-3 rotate-180"/> April 2025 <ChevronRight className="w-3 h-3"/></div>
           </div>
           <div className="flex justify-between mb-4 px-2">
              <div className="text-center"><div className="text-[10px] text-slate-400 mb-1">Mon</div><div className="w-6 h-6 flex items-center justify-center text-[12px] font-medium text-slate-600">23</div></div>
              <div className="text-center"><div className="text-[10px] text-slate-400 mb-1">Tue</div><div className="w-6 h-6 flex items-center justify-center text-[12px] font-medium text-slate-600">24</div></div>
              <div className="text-center relative"><div className="text-[10px] text-violet-500 font-bold mb-1">Wed</div><div className="w-7 h-7 bg-[#6D28D9] text-white rounded-full flex items-center justify-center text-[12px] font-bold shadow-md">25</div><div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-500 rounded-full"></div></div>
              <div className="text-center"><div className="text-[10px] text-slate-400 mb-1">Thu</div><div className="w-6 h-6 flex items-center justify-center text-[12px] font-medium text-slate-600">26</div></div>
              <div className="text-center"><div className="text-[10px] text-slate-400 mb-1">Fri</div><div className="w-6 h-6 flex items-center justify-center text-[12px] font-medium text-slate-600">27</div></div>
           </div>
           <div className="space-y-2 mt-2">
              <div className="flex items-start gap-3">
                 <div className="text-[10px] font-bold text-slate-500 mt-1 w-10 text-right">10:00 AM</div>
                 <div className="flex-1 bg-white border-l-2 border-violet-400 p-2 rounded shadow-sm">
                    <div className="text-[11px] font-bold text-slate-800">Interview with Sarah</div>
                 </div>
              </div>
           </div>
        </div>
      )
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#6D28D9]" />,
      title: "Unified Communication",
      description: "Manage Email, WhatsApp, SMS, and calling from one shared communication hub.",
      mockup: (
        <div className="bg-[#f8fbfa] rounded-2xl p-5 border border-slate-100 flex-1 flex flex-col mt-4">
           <div className="space-y-3">
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">W</div>
                 <div className="flex-1">
                    <div className="flex justify-between items-center"><span className="text-[11px] font-bold text-slate-800">Sarah Jenkis</span><span className="text-[9px] text-slate-400">10:42 AM</span></div>
                    <div className="text-[10px] text-slate-500 mt-1 truncate">Are we still on for the interview?</div>
                 </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
                 <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">@</div>
                 <div className="flex-1">
                    <div className="flex justify-between items-center"><span className="text-[11px] font-bold text-slate-800">David Ross</span><span className="text-[9px] text-slate-400">Yesterday</span></div>
                    <div className="text-[10px] text-slate-500 mt-1 truncate">I have attached my updated resume.</div>
                 </div>
              </div>
           </div>
        </div>
      )
    },
    {
      icon: <Building2 className="w-6 h-6 text-[#6D28D9]" />,
      title: "Client & Vendor Management",
      description: "Manage recruitment clients, sourcing vendors, commissions, and business relationships from one platform.",
      mockup: (
        <div className="bg-[#f8fbfa] rounded-2xl p-5 border border-slate-100 flex-1 flex flex-col mt-4">
           <div className="text-[11px] font-bold text-slate-400 mb-3">Top Clients</div>
           <div className="space-y-3">
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold">A</div>
                    <div className="text-[12px] font-bold text-slate-800">Acme Corp</div>
                 </div>
                 <div className="text-[10px] text-slate-500">4 Active Roles</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold">G</div>
                    <div className="text-[12px] font-bold text-slate-800">Global Tech</div>
                 </div>
                 <div className="text-[10px] text-slate-500">2 Active Roles</div>
              </div>
           </div>
        </div>
      )
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#6D28D9]" />,
      title: "Recruitment Analytics",
      description: "Monitor recruiter productivity, hiring performance, pipeline health, and hiring trends with real-time dashboards.",
      mockup: (
        <div className="bg-[#f8fbfa] rounded-2xl p-5 border border-slate-100 flex-1 flex flex-col mt-4">
           <div className="flex gap-4 mb-4">
             <div className="flex-1 bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="text-[18px] font-bold text-slate-900">24 <span className="text-[10px] text-slate-500 font-normal">Days</span></div>
                <div className="text-[9px] text-slate-500 uppercase mt-1">Time to Hire</div>
             </div>
             <div className="flex-1 bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="text-[18px] font-bold text-slate-900">31 <span className="text-[10px] text-slate-500 font-normal">Days</span></div>
                <div className="text-[9px] text-slate-500 uppercase mt-1">Time to Fill</div>
             </div>
           </div>
           <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mt-auto">
             <div className="text-[10px] font-bold text-slate-400 mb-3">Placement Time Trend</div>
             <div className="h-10 w-full flex items-end gap-1.5 justify-between">
                {[40, 60, 45, 80, 50, 75, 90, 65].map((h, i) => (
                  <div key={i} className="w-full bg-violet-100 rounded-t-sm relative group">
                    <div className="absolute bottom-0 w-full bg-violet-400 rounded-t-sm transition-all" style={{height: `${h}%`}}></div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      )
    },
    {
      icon: <Video className="w-6 h-6 text-[#6D28D9]" />,
      title: "AI Interviews",
      description: "Conduct live and recorded interviews with AI-powered insights and candidate evaluation.",
      mockup: (
        <div className="bg-[#f8fbfa] rounded-2xl p-4 border border-slate-100 flex-1 flex flex-col mt-4">
           <div className="relative rounded-xl overflow-hidden mb-3 bg-slate-900">
             <img alt="" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=250" className="w-full h-[100px] object-cover opacity-80" />
             <div className="absolute bottom-2 left-2 flex gap-1">
                <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[8px] text-white flex items-center gap-1"><Video className="w-2.5 h-2.5"/> 05:32</div>
             </div>
             <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-lg">
                <img alt="" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100" className="w-full h-full object-cover"/>
             </div>
           </div>
           <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
             <div className="text-[11px] font-bold text-slate-800 mb-2">AI Insights</div>
             <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                   <span className="text-slate-500">Confidence</span>
                   <span className="font-bold text-emerald-500">High</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                   <span className="text-slate-500">Communication</span>
                   <span className="font-bold text-emerald-500">Excellent</span>
                </div>
             </div>
           </div>
        </div>
      )
    },
    {
      icon: <Shield className="w-6 h-6 text-[#6D28D9]" />,
      title: "Role-Based Access",
      description: "Provide secure access for recruiters, managers, interviewers, and administrators with configurable permissions.",
      mockup: (
        <div className="bg-[#f8fbfa] rounded-2xl p-5 border border-slate-100 flex-1 flex flex-col mt-4">
           <div className="text-[11px] font-bold text-slate-400 mb-3">Permissions</div>
           <div className="space-y-2">
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                 <span className="text-[11px] font-bold text-slate-800">View Candidates</span>
                 <div className="w-8 h-4 bg-emerald-400 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div></div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                 <span className="text-[11px] font-bold text-slate-800">Edit Pipeline</span>
                 <div className="w-8 h-4 bg-emerald-400 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div></div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between opacity-60">
                 <span className="text-[11px] font-bold text-slate-800">Manage Billing</span>
                 <div className="w-8 h-4 bg-slate-200 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5"></div></div>
              </div>
           </div>
        </div>
      )
    },
    {
      icon: <FileCheck className="w-6 h-6 text-[#6D28D9]" />,
      title: "Compliance & Audit Trail",
      description: "Protect candidate data with audit logs, consent tracking, and compliance-ready recruitment workflows.",
      mockup: (
        <div className="bg-[#f8fbfa] rounded-2xl p-5 border border-slate-100 flex-1 flex flex-col mt-4">
           <div className="text-[11px] font-bold text-slate-400 mb-3">Recent Activity</div>
           <div className="space-y-4">
              <div className="relative pl-4 border-l-2 border-slate-200">
                 <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-slate-400"></div>
                 <div className="text-[10px] text-slate-500 mb-0.5">Today, 10:45 AM</div>
                 <div className="text-[11px] font-bold text-slate-800">Consent recorded for Sarah J.</div>
              </div>
              <div className="relative pl-4 border-l-2 border-slate-200">
                 <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-slate-400"></div>
                 <div className="text-[10px] text-slate-500 mb-0.5">Yesterday, 04:30 PM</div>
                 <div className="text-[11px] font-bold text-slate-800">Data retention policy applied</div>
              </div>
           </div>
        </div>
      )
    }
];

export function Features() {
  const cards = featureCards;

  return (
    <section className="py-4 lg:py-8 bg-[#fdfdfd] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 items-start">
          
          {/* Left Content */}
          <div className="w-full lg:w-[30%] lg:sticky lg:top-32 space-y-8 z-10 pt-4">
            <h2 className="text-[3.5rem] lg:text-[4.5rem] font-bold text-[#111827] leading-[1.05] tracking-tight mb-6">
              Everything Your <br className="hidden lg:block"/> Recruitment Team Needs.
            </h2>
            <p className="text-[1.125rem] text-[#6b7280] leading-relaxed mb-8">
              From creating jobs to managing candidates, interviews, communication, analytics, and compliance—PyHire brings every recruitment operation into one AI-powered platform.
            </p>
            <div className="relative inline-block">
              <Link to={DEMO_PATH} className="px-8 py-4 bg-[#6D28D9] hover:bg-[#8B5CF6] text-white rounded-full font-medium text-lg transition-colors shadow-lg shadow-violet-500/25 inline-flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2">
                Book A Demo <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Content - Cards scroller */}
          <div className="w-full lg:w-[70%] overflow-hidden relative pb-12 pt-4 lg:pl-4 mt-8 lg:mt-0">
            {/* Fade overlays for smooth entry/exit */}
            <div className="absolute left-0 top-0 bottom-0 w-8 lg:w-24 bg-gradient-to-r from-[#fdfdfd] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 lg:w-24 bg-gradient-to-l from-[#fdfdfd] to-transparent z-10"></div>
            
            <div className="flex w-max animate-marquee hover:pause">
              {/* First Set */}
              <div className="flex gap-6 pr-6">
                {cards.map((card, idx) => (
                  <div key={idx} className="flex-none w-[340px] md:w-[380px] bg-white rounded-[32px] p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                     <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center mb-6 border border-violet-100/50">
                        {card.icon}
                     </div>
                     <h4 className="font-bold text-[#111827] text-[1.35rem] leading-tight mb-3">{card.title}</h4>
                     <p className="text-[14px] text-[#6b7280] mb-6 leading-relaxed">
                       {card.description}
                     </p>
                     {card.mockup}
                  </div>
                ))}
              </div>
              
              {/* Second Set (Duplicate for seamless looping) */}
              <div className="flex gap-6 pr-6" aria-hidden="true">
                {cards.map((card, idx) => (
                  <div key={`dup-${idx}`} className="flex-none w-[340px] md:w-[380px] bg-white rounded-[32px] p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                     <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center mb-6 border border-violet-100/50">
                        {card.icon}
                     </div>
                     <h4 className="font-bold text-[#111827] text-[1.35rem] leading-tight mb-3">{card.title}</h4>
                     <p className="text-[14px] text-[#6b7280] mb-6 leading-relaxed">
                       {card.description}
                     </p>
                     {card.mockup}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

