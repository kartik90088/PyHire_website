import { Mail, Phone, Clock, Facebook, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#FEF9DC] pt-10 pb-8 border-t border-slate-200 mt-auto">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Newsletter signup removed 2026-08-26.

            It reported "Thanks — you're on the list." while storing nothing —
            a promise to the visitor that no system fulfilled. Hidden rather
            than repaired because there is no list to subscribe anyone to yet.
            To restore it, wire the form to a real endpoint FIRST, then bring
            the markup back from git history. */}

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 mb-6">
          
          {/* Brand */}
          <div className="lg:col-span-4">
             <div className="flex items-center gap-2 mb-6">
                <img
                  src="/pyhire-logo.webp"
                  alt="PyHire"
                  width={400}
                  height={123}
                  className="h-10 w-auto"
                  loading="lazy"
                  decoding="async"
                />
            </div>
            <p className="text-slate-800 text-[15px] leading-relaxed mb-8 max-w-[280px]">
              AI-powered automation and enterprise management solutions for modern hiring teams.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full border border-slate-800/20 flex items-center justify-center text-slate-800 hover:border-[#f97316] hover:text-[#f97316] hover:bg-white transition-colors">
                 <Linkedin className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-800/20 flex items-center justify-center text-slate-800 hover:border-[#f97316] hover:text-[#f97316] hover:bg-white transition-colors">
                 <Twitter className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-800/20 flex items-center justify-center text-slate-800 hover:border-[#f97316] hover:text-[#f97316] hover:bg-white transition-colors">
                 <Facebook className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className="lg:col-span-3">
             <div className="mb-6">
               <h4 className="text-[17px] font-bold text-[#111111] mb-2">Platform</h4>
               <div className="w-8 h-0.5 bg-[#f97316]"></div>
             </div>
             <ul className="space-y-4">
               {[
                 { name: "Candidate Management", path: "/candidate-management" },
                 { name: "Job Management", path: "/job-management" },
                 { name: "AI Candidate Matching", path: "/ai-candidate-matching" },
                 { name: "Interview Management", path: "/interview-management" },
                 { name: "Client & Vendor Management", path: "/client-vendor-management" },
                 { name: "Unified Communication", path: "/unified-communication" },
                 { name: "Analytics & Dashboards", path: "/analytics-dashboards" },
                 { name: "Compliance & Security", path: "/compliance-security" }
               ].map((item, idx) => (
                 <li key={idx}>
                   <Link to={item.path} className="text-slate-800 hover:text-[#f97316] text-[15px] flex items-center gap-2.5 group transition-colors py-2.5 -my-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]"></span>
                      {item.name}
                   </Link>
                 </li>
               ))}
             </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
             <div className="mb-6">
               <h4 className="text-[17px] font-bold text-[#111111] mb-2">Company</h4>
               <div className="w-8 h-0.5 bg-[#f97316]"></div>
             </div>
             <ul className="space-y-4">
               {[
                 { name: "About Us", path: "/about-us" },
                 { name: "Contact Us", path: "/contact-us" },
                 { name: "Use Cases", path: "/case-studies" },
                 { name: "Blog", path: "/blog" }
               ].map((item, idx) => (
                 <li key={idx}>
                   <Link to={item.path} className="text-slate-800 hover:text-[#f97316] text-[15px] flex items-center gap-2.5 group transition-colors py-2.5 -my-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]"></span>
                      {item.name}
                   </Link>
                 </li>
               ))}
             </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3">
             <div className="mb-8">
               <h4 className="text-[17px] font-bold text-[#111111] mb-2">Contact Information</h4>
               <div className="w-8 h-0.5 bg-[#f97316]"></div>
             </div>
             
             <div className="space-y-7">
               <div className="flex items-start gap-4">
                 <div className="w-11 h-11 rounded-full bg-white/60 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#f97316]" strokeWidth={1.5} />
                 </div>
                 <div className="pt-0.5">
                    <p className="text-[13px] text-slate-700 mb-1">Call us on</p>
                    <a href="tel:+919964667676" className="inline-block py-2.5 -my-2 text-[15px] font-bold text-[#111111] hover:text-[#f97316] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] rounded">
                      +91 9964667676
                    </a>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="w-11 h-11 rounded-full bg-white/60 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#f97316]" strokeWidth={1.5} />
                 </div>
                 <div className="pt-0.5">
                    <p className="text-[13px] text-slate-700 mb-1">Reach out</p>
                    <a href="mailto:support@veriright.com" className="inline-block py-2.5 -my-2 text-[15px] font-bold text-[#111111] hover:text-[#f97316] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] rounded">
                      support@veriright.com
                    </a>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="w-11 h-11 rounded-full bg-white/60 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#f97316]" strokeWidth={1.5} />
                 </div>
                 <div className="pt-0.5">
                    <p className="text-[13px] text-slate-700 mb-1">Office Hours</p>
                    <p className="text-[15px] font-bold text-[#111111]">Mon-Sat 9:30 AM - 7:00 PM IST</p>
                 </div>
               </div>
             </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-800 text-[14px]">© 2026 PyHire. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[14px]">
             <Link to="/privacy-policy" className="inline-block py-2.5 -my-2 text-slate-800 hover:text-[#f97316]">Privacy Policy</Link>
             <span className="text-slate-800/30">|</span>
             <Link to="/terms-of-use" className="inline-block py-2.5 -my-2 text-slate-800 hover:text-[#f97316]">Terms of Use</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
