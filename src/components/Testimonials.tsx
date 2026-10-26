import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Testimonials() {
  const testimonials = [
    {
      text: "PyHire transformed our recruitment process from day one. The AI-powered candidate matching, interview management, and unified communication helped our team hire faster while significantly reducing manual work.",
      author: "Technology Startup",
      role: "Founder"
    },
    {
      text: "Managing multiple hiring campaigns became effortless with PyHire. Our recruiters collaborate more efficiently, candidate tracking is seamless, and hiring decisions are now backed by real-time insights.",
      author: "D2C Brand",
      role: "HR Manager"
    },
    {
      text: "PyHire has streamlined our end-to-end hiring operations. From sourcing candidates to scheduling interviews and managing offers, everything is available in one intelligent platform.",
      author: "Manufacturing Company",
      role: "Talent Acquisition Head"
    }
  ];

  return (
    <section className="py-4 lg:py-8 bg-white text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-black mb-2 tracking-wide">Testimonials</h2>
        <h3 className="text-[2rem] text-black font-medium mb-8 tracking-tight">What Our Clients Say</h3>

        <div className="rounded-[3rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] bg-[#FFFCF4]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white">
            {testimonials.map((t, i) => (
              <div key={i} className="flex flex-col items-center pt-8 md:pt-0 first:pt-0 px-6">
                <div className="text-orange-200 mb-6">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                     <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25-.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                </div>
                <p className="text-slate-600 text-[13px] leading-relaxed mb-6 flex-1 italic font-medium">"{t.text}"</p>
                <h4 className="font-bold text-[#8b5cf6] text-sm mb-1">{t.author}</h4>
                <p className="text-[#3b82f6] text-xs font-semibold">{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col items-center mt-6">
          <Link to="/about-us" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-[12px] font-bold text-[17px] transition-colors shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2">
            Explore more
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </Link>
          <p className="text-slate-500 text-[13px] mt-4 font-medium">
            See how PyHire can transform your hiring process.
          </p>
        </div>
      </div>
    </section>
  );
}
