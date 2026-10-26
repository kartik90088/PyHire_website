import { useState, useEffect } from "react";
import {
  ChevronDown, Menu, X,
  Users, Briefcase, BrainCircuit, CalendarCheck,
  Building2, Inbox, BarChart3, ShieldCheck,
  Newspaper, BookOpen,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { DEMO_PATH } from "../lib/routes";

export function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* `desc` is condensed from each destination page own description, so the menu
     blurb and the page it opens cannot drift apart. */
  const platformLinks = [
    { name: "Candidate Management", path: "/candidate-management", icon: Users,
      desc: "Unified profiles, resume parsing and smart search" },
    { name: "Job Management", path: "/job-management", icon: Briefcase,
      desc: "Requisitions, approvals and one-click publishing" },
    { name: "AI Candidate Matching", path: "/ai-candidate-matching", icon: BrainCircuit,
      desc: "Score and rank applicants against the role" },
    { name: "Interview Management", path: "/interview-management", icon: CalendarCheck,
      desc: "Scheduling, panels and structured scorecards" },
    { name: "Client & Vendor Management", path: "/client-vendor-management", icon: Building2,
      desc: "Client portals, vendor submissions and contracts" },
    { name: "Unified Communication", path: "/unified-communication", icon: Inbox,
      desc: "Email, WhatsApp, SMS and calls in one inbox" },
    { name: "Analytics & Dashboards", path: "/analytics-dashboards", icon: BarChart3,
      desc: "Pipeline, source and recruiter productivity" },
    { name: "Compliance & Security", path: "/compliance-security", icon: ShieldCheck,
      desc: "Role-based access, audit logs and governance" },
  ];

  const resourcesLinks = [
    { name: "Blog", path: "/blog", icon: Newspaper,
      desc: "Practical writing on how hiring actually works" },
    { name: "Case Studies", path: "/case-studies", icon: BookOpen,
      desc: "Illustrative scenarios from common hiring patterns" },
  ];

  return (
    /* Floating pill: the <header> is only a fixed positioning frame with no
       surface of its own — the rounded bar inside carries the background, so
       the corners can curve away from the viewport edges rather than butting
       against them. */
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 lg:px-8 pt-3 lg:pt-4 pointer-events-none">
      <div
        className={`relative max-w-7xl mx-auto rounded-full border pointer-events-auto transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border-white/70 shadow-[0_10px_30px_rgba(15,23,42,0.10)]"
            : "bg-white/70 backdrop-blur-md border-white/60 shadow-[0_6px_24px_rgba(15,23,42,0.06)]"
        }`}
      >
        <div className="px-5 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 py-1 -my-1">
            {/* Full lockup as one image — the mark is an illustration that the
                old square-P placeholder could not represent. width/height are the
                intrinsic size so the row does not reflow while it loads. */}
            <img
              src="/pyhire-logo.webp"
              alt="PyHire"
              width={400}
              height={123}
              className="h-8 w-auto"
              decoding="async"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-slate-600 hover:text-[#f97316] font-medium text-[15px] transition-colors">
              Home
            </Link>
            
            <div className="relative group">
              <button className="flex items-center gap-1 text-slate-600 group-hover:text-[#f97316] font-medium text-[15px] transition-colors py-2">
                Platform
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              {/* pt-2 keeps a hoverable bridge between the trigger and the panel,
                  so the menu does not close as the pointer crosses the gap. */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="w-[600px] bg-white rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-3">
                  <div className="grid grid-cols-2 gap-1">
                    {platformLinks.map((link) => {
                      const Icon = link.icon;
                      const active = location.pathname === link.path;
                      return (
                        <Link
                          key={link.name}
                          to={link.path}
                          className={`group/item flex items-start gap-3 p-3 rounded-xl transition-colors ${active ? "bg-orange-50" : "hover:bg-orange-50"}`}
                        >
                          <span
                            className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${active ? "bg-[#f97316] text-white" : "bg-orange-50 text-[#f97316] group-hover/item:bg-[#f97316] group-hover/item:text-white"}`}
                          >
                            <Icon className="w-[18px] h-[18px]" strokeWidth={2} aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className={`block text-[14px] font-bold leading-snug ${active ? "text-[#f97316]" : "text-slate-800 group-hover/item:text-[#f97316]"}`}>
                              {link.name}
                            </span>
                            <span className="block text-[12.5px] text-slate-500 leading-snug mt-0.5">
                              {link.desc}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 text-slate-600 group-hover:text-[#f97316] font-medium text-[15px] transition-colors py-2">
                Resources
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="w-[320px] bg-white rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-3">
                  {resourcesLinks.map((link) => {
                    const Icon = link.icon;
                    const active = location.pathname === link.path;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={`group/item flex items-start gap-3 p-3 rounded-xl transition-colors ${active ? "bg-orange-50" : "hover:bg-orange-50"}`}
                      >
                        <span
                          className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${active ? "bg-[#f97316] text-white" : "bg-orange-50 text-[#f97316] group-hover/item:bg-[#f97316] group-hover/item:text-white"}`}
                        >
                          <Icon className="w-[18px] h-[18px]" strokeWidth={2} aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className={`block text-[14px] font-bold leading-snug ${active ? "text-[#f97316]" : "text-slate-800 group-hover/item:text-[#f97316]"}`}>
                            {link.name}
                          </span>
                          <span className="block text-[12.5px] text-slate-500 leading-snug mt-0.5">
                            {link.desc}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <Link to="/about-us" className={`text-slate-600 hover:text-[#f97316] font-medium text-[15px] transition-colors ${location.pathname === '/about-us' ? 'text-[#f97316] font-bold' : ''}`}>
              About Us
            </Link>
            
            <Link to="/contact-us" className={`text-slate-600 hover:text-[#f97316] font-medium text-[15px] transition-colors ${location.pathname === '/contact-us' ? 'text-[#f97316] font-bold' : ''}`}>
              Contact
            </Link>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link to={DEMO_PATH} className="hidden lg:flex px-6 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full font-bold text-[15px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgb(249,115,22,0.4)] hover:-translate-y-0.5 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2">
              Request Demo
            </Link>
            <button 
              className="lg:hidden text-slate-600 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-[24px] border border-slate-100 shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible max-h-[80vh] overflow-y-auto' : 'opacity-0 invisible max-h-0 overflow-hidden'}`}>
        <div className="p-4 space-y-1">
          <Link to="/" className="block px-4 py-3.5 text-[15px] font-medium text-slate-900 rounded-xl hover:bg-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          
          <div className="px-4 py-3">
            <div className="text-[15px] font-medium text-slate-900 mb-2">Platform</div>
            <div className="pl-4 space-y-1 border-l-2 border-slate-100 ml-2">
              {platformLinks.map(link => {
                const Icon = link.icon;
                const active = location.pathname === link.path;
                return (
                  <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 py-2.5 text-[14px] transition-colors ${active ? "text-[#f97316] font-bold" : "text-slate-600 hover:text-[#f97316]"}`}>
                    <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-[#f97316] text-white" : "bg-orange-50 text-[#f97316]"}`}>
                      <Icon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                    </span>
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="px-4 py-3">
            <div className="text-[15px] font-medium text-slate-900 mb-2">Resources</div>
            <div className="pl-4 space-y-1 border-l-2 border-slate-100 ml-2">
              {resourcesLinks.map(link => {
                const Icon = link.icon;
                const active = location.pathname === link.path;
                return (
                  <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 py-2.5 text-[14px] transition-colors ${active ? "text-[#f97316] font-bold" : "text-slate-600 hover:text-[#f97316]"}`}>
                    <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-[#f97316] text-white" : "bg-orange-50 text-[#f97316]"}`}>
                      <Icon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                    </span>
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <Link to="/about-us" className={`block px-4 py-3.5 text-[15px] font-medium rounded-xl hover:bg-slate-50 ${location.pathname === '/about-us' ? 'text-[#f97316] font-bold' : 'text-slate-900'}`} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact-us" className={`block px-4 py-3.5 text-[15px] font-medium rounded-xl hover:bg-slate-50 ${location.pathname === '/contact-us' ? 'text-[#f97316] font-bold' : 'text-slate-900'}`} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          
          <div className="p-4 pt-2">
            <Link
              to={DEMO_PATH}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full font-bold text-[15px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2"
            >
              Request Demo
            </Link>
          </div>
        </div>
        </div>
      </div>
    </header>
  );
}
