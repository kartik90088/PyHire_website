import { ArrowRight, Calendar, CheckCircle2, Sparkle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { DEMO_PATH, PLATFORM_PATH } from "../lib/routes";

export function CTA() {
  return (
    <section className="py-4 lg:py-8 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-[40px] overflow-hidden bg-[#F5F9FF] p-8 sm:p-12 lg:p-16 border border-yellow-100/50 shadow-[0_20px_60px_-15px_rgba(109,40,217,0.1)]">
          {/* Decorative Dotted Patterns */}
          <div className="absolute top-8 left-8 grid grid-cols-4 gap-2 opacity-20 pointer-events-none">
             {[...Array(16)].map((_, i) => (
               <div key={`dot-tl-${i}`} className="w-2 h-2 rounded-full bg-[#6D28D9]"></div>
             ))}
          </div>

          <div className="absolute bottom-8 right-8 grid grid-cols-4 gap-2 opacity-20 pointer-events-none">
             {[...Array(16)].map((_, i) => (
               <div key={`dot-br-${i}`} className="w-2 h-2 rounded-full bg-[#6D28D9]"></div>
             ))}
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left Side - Illustration / Image */}
            <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-8 lg:mt-0">
               <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
                  
                  {/* Main Image */}
                  <img 
                    src="/girl-with-ai.png" 
                    alt="Recruitment Professional with AI" 
                    className="w-[95%] h-auto object-contain relative z-10"
                    onError={(e) => {
                      // Fallback if the user hasn't uploaded the image yet
                      e.currentTarget.src = "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&h=800";
                      e.currentTarget.className = "w-[85%] h-[85%] object-cover rounded-full shadow-2xl border-8 border-white relative z-10";
                    }}
                  />

                  {/* Top Candidates Card */}
                  <div className="absolute top-[5%] left-[-5%] bg-white/95 backdrop-blur-sm rounded-[20px] p-4 shadow-xl z-20 w-[200px] animate-[float_5s_ease-in-out_infinite]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-violet-200"></div>
                      <span className="text-[10px] font-bold text-slate-500 tracking-wider">Top Candidates</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Aarav Kapoor", score: "96%", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100" },
                        { name: "Cody Fisher", score: "94%", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100" },
                        { name: "Darlene Howard", score: "92%", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100" }
                      ].map((candidate, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <img alt="" src={candidate.img} className="w-8 h-8 rounded-full object-cover" />
                          <div className="flex-1">
                            <div className="text-[11px] font-bold text-slate-800 leading-tight">{candidate.name}</div>
                            <div className="flex gap-0.5 mt-0.5">
                               {[...Array(5)].map((_, j) => (
                                 <Star key={j} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                               ))}
                            </div>
                          </div>
                          <div className="text-violet-500 font-bold text-[12px]">{candidate.score}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Bubble */}
                  <div className="absolute top-[5%] right-[0%] bg-white/95 backdrop-blur-sm rounded-2xl rounded-bl-sm p-4 shadow-xl z-20 max-w-[180px] animate-[float_6s_ease-in-out_infinite_reverse]">
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#8b5cf6] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <Sparkle className="w-4 h-4 text-white fill-white" />
                    </div>
                    <p className="text-[12px] text-slate-700 font-medium leading-snug">
                      AI suggests the best candidates, you make the right hire.
                    </p>
                  </div>

                  {/* AI Match Score */}
                  <div className="absolute top-[40%] right-[-10%] bg-white/95 backdrop-blur-sm rounded-[20px] p-4 shadow-xl z-20 flex flex-col items-center animate-[float_4s_ease-in-out_infinite]">
                    <div className="text-[11px] font-bold text-slate-600 mb-2">AI Match Score</div>
                    <div className="relative w-16 h-16 rounded-full border-[3px] border-slate-100 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                         <circle cx="32" cy="32" r="29" stroke="#6D28D9" strokeWidth="3" fill="none" strokeDasharray="182" strokeDashoffset="10" strokeLinecap="round" />
                      </svg>
                      <span className="text-[#6D28D9] font-bold text-[14px]">95%</span>
                    </div>
                  </div>

                  {/* Interview Scheduled */}
                  <div className="absolute bottom-[5%] left-[-10%] bg-white/95 backdrop-blur-sm rounded-2xl p-3 px-4 shadow-xl z-20 flex items-center gap-3 animate-[float_5.5s_ease-in-out_infinite]">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#8b5cf6]" />
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-slate-800">Interview Scheduled</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <div className="text-[11px] text-slate-500 font-medium">Tomorrow, 10:00 AM</div>
                      </div>
                    </div>
                  </div>

               </div>
            </div>

            {/* Right Side - Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              
              <h2 className="text-[3rem] lg:text-[4.5rem] font-bold text-slate-900 leading-[1.05] tracking-tight mb-6">
                Ready to Transform<br/>Your Hiring?
              </h2>
              
              <p className="text-[1.125rem] text-slate-600 leading-relaxed mb-6 max-w-[480px]">
                Discover how PyHire helps recruitment teams automate hiring, improve recruiter productivity, and hire top talent faster with AI-powered recruitment workflows.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <Link to={DEMO_PATH} className="w-full sm:w-auto px-8 py-4 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full font-bold text-[17px] transition-all shadow-[0_8px_20px_rgb(249,115,22,0.3)] hover:shadow-[0_12px_25px_rgb(249,115,22,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2">
                  Book a Demo
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </Link>
                <Link to={PLATFORM_PATH} className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 rounded-full font-bold text-[17px] transition-all border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]">
                  Explore Platform
                </Link>
              </div>

              {/* Trust Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-slate-600 text-[14px] font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  No setup fees
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Fast implementation
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Enterprise-ready security
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Dedicated onboarding support
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
