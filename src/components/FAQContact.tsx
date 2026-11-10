import { ArrowRight, Headset, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";
import { DEMO_PATH } from "../lib/routes";

export function FAQContact() {
  return (
    <section className="pb-12 lg:pb-8 relative bg-transparent">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#F5F9FF] rounded-[32px] p-8 sm:p-12 lg:px-16 lg:py-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-violet-50/50 flex flex-col lg:flex-row items-center gap-8 lg:gap-8 transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.05)]">
          
          {/* Left Column: Illustration */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-start shrink-0 relative animate-[float_6s_ease-in-out_infinite]">
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Soft background glow */}
              <div className="absolute inset-0 bg-violet-200/40 rounded-full blur-xl transform scale-90"></div>
              
              {/* Headset Base */}
              <div className="relative z-10 w-20 h-20 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center">
                <Headset className="w-10 h-10 text-[#6D28D9]" strokeWidth={1.5} />
              </div>
              
              {/* Chat Bubble Accent (Purple) */}
              <div className="absolute -bottom-1 -right-2 z-20 w-12 h-12 bg-[#8b5cf6] rounded-full shadow-md border-2 border-[#F5F9FF] flex items-center justify-center transform hover:scale-105 transition-transform">
                <MessageSquareText className="w-6 h-6 text-white" strokeWidth={2} />
              </div>

              {/* Decorative shapes */}
              <div className="absolute top-2 -right-4 w-4 h-4 bg-yellow-400 rounded-full opacity-80 animate-[bounce_3s_infinite]"></div>
              <div className="absolute bottom-6 -left-4 w-3 h-3 bg-violet-400 rounded-full opacity-70 animate-[bounce_4s_infinite]"></div>
            </div>
          </div>

          {/* Center Column: Text */}
          <div className="w-full lg:flex-1 text-center lg:text-left">
            <h3 className="text-2xl lg:text-[28px] font-bold text-slate-900 mb-3 tracking-tight">
              Still have questions?
            </h3>
            <p className="text-slate-600 text-[15px] sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              Our team is happy to help you understand how PyHire can fit your recruitment process. Schedule a personalised demo or get in touch with our experts.
            </p>
          </div>

          {/* Right Column: CTA Buttons */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link to={DEMO_PATH} className="w-full sm:w-auto px-7 py-3.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full font-bold text-[15px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgb(249,115,22,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2">
              Book a Demo
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
            <Link to="/contact-us" className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-[#6D28D9] text-[#6D28D9] hover:text-white rounded-full font-bold text-[15px] transition-all border-2 border-[#6D28D9] shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2">
              Contact Us
              <ArrowRight className="w-4 h-4 group-hover:text-white transition-colors" strokeWidth={2.5} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
