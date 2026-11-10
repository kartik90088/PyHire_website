import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { DEMO_PATH, TRIAL_PATH } from "../lib/routes";
import { mainLinks, productLinks } from "../data/navigation";

/**
 * Site header — the menu from the PyHire website content document's site map:
 * Home · Product (8 pages) · Solutions · Pricing · Partners · About ·
 * Contact, with Book a demo (primary) and Start free trial (secondary).
 *
 * The Product menu opens on hover, click or keyboard focus and closes on
 * Escape, outside click or navigation — it is no longer hover-only.
 */
export function Navbar() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setProductOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!productOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setProductOpen(false);
    const onDown = (e: MouseEvent) => {
      if (!productRef.current?.contains(e.target as Node)) setProductOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [productOpen]);

  const onProduct = pathname.startsWith("/product/");
  const navLink = ({ isActive }: { isActive: boolean }) =>
    `font-medium text-[15px] transition-colors rounded-full px-3.5 py-2 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] ${
      isActive ? "bg-[#EEEAFE] text-[#1B1650] font-semibold" : "text-[#3A3766] hover:bg-[#F8F6FD] hover:text-[#1B1650]"
    }`;

  return (
    /* Floating pill: the <header> is only a fixed positioning frame with no
       surface of its own — the rounded bar inside carries the background, so
       the corners can curve away from the viewport edges rather than butting
       against them. */
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 lg:px-8 pt-3 lg:pt-4 pointer-events-none">
      <div
        className={`relative max-w-[1400px] mx-auto rounded-[28px] border pointer-events-auto transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-[#E7E3F6] shadow-[0_14px_34px_-14px_rgba(27,22,80,0.22)]"
            : "bg-white/90 backdrop-blur-md border-[#E7E3F6] shadow-[0_10px_30px_-16px_rgba(27,22,80,0.18)]"
        }`}
      >
        <div className="px-5 sm:px-6 lg:px-7 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 py-1 -my-1 shrink-0 rounded outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]">
              {/* width/height are the intrinsic size so the row does not reflow while it loads. */}
              <img src="/pyhire-logo.webp" alt="PyHire" width={400} height={123} className="h-8 w-auto" decoding="async" />
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Main" className="hidden xl:flex items-center gap-1">
              <NavLink to="/" end className={navLink}>Home</NavLink>

              <div
                ref={productRef}
                className="relative"
                onMouseEnter={() => setProductOpen(true)}
                onMouseLeave={() => setProductOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={productOpen}
                  aria-controls="product-menu"
                  /* A mouse click lands after hover has already opened the menu,
                     so toggling would snap it shut — mouse clicks only open.
                     Keyboard activation (detail === 0) toggles. */
                  onClick={(e) => setProductOpen((open) => (e.detail === 0 ? !open : true))}
                  className={`flex items-center gap-1 py-2 ${navLink({ isActive: onProduct })}`}
                >
                  Product
                  <ChevronDown className={`w-4 h-4 transition-transform ${productOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {/* pt-2 keeps a hoverable bridge between the trigger and the panel. */}
                <div
                  id="product-menu"
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                    productOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
                  }`}
                >
                  <ul className="w-[620px] bg-white rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-3 grid grid-cols-2 gap-1">
                    {productLinks.map(({ path, label, desc, icon: Icon }) => {
                      const active = pathname === path;
                      return (
                        <li key={path}>
                          <Link
                            to={path}
                            className={`group/item flex items-start gap-3 p-3 rounded-xl transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] ${active ? "bg-violet-50" : "hover:bg-violet-50"}`}
                          >
                            <span className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${active ? "bg-[#6D28D9] text-white" : "bg-violet-50 text-[#6D28D9] group-hover/item:bg-[#6D28D9] group-hover/item:text-white"}`}>
                              <Icon className="w-[18px] h-[18px]" strokeWidth={2} aria-hidden="true" />
                            </span>
                            <span className="min-w-0">
                              <span className={`block text-[14px] font-bold leading-snug ${active ? "text-[#6D28D9]" : "text-slate-800 group-hover/item:text-[#6D28D9]"}`}>{label}</span>
                              <span className="block text-[12.5px] text-slate-500 leading-snug mt-0.5">{desc}</span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {mainLinks.map(({ path, label }) => (
                <NavLink key={path} to={path} className={navLink}>{label}</NavLink>
              ))}
            </nav>

            {/* CTAs & mobile toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to={TRIAL_PATH}
                className="hidden xl:inline-flex px-4 py-2.5 rounded-full border border-[#DDD8F0] bg-white text-[#1B1650] font-bold text-[14px] hover:border-[#6D28D9] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
              >
                Start free trial
              </Link>
              <Link
                to={DEMO_PATH}
                className="hidden sm:inline-flex px-5 py-2.5 bg-[#6D28D9] hover:bg-[#8B5CF6] text-white rounded-full font-bold text-[14px] transition-all shadow-[0_4px_14px_rgb(253,101,0,0.3)] hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2"
              >
                Book a demo
              </Link>
              <button
                type="button"
                className="xl:hidden text-slate-600 p-2 rounded outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`xl:hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-[24px] border border-slate-100 shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-100 visible max-h-[80vh] overflow-y-auto" : "opacity-0 invisible max-h-0 overflow-hidden"
          }`}
        >
          <nav aria-label="Main (mobile)" className="p-4 space-y-1">
            <NavLink to="/" end className={({ isActive }) => `block px-4 py-3 text-[15px] font-medium rounded-xl hover:bg-slate-50 ${isActive ? "bg-[#EEEAFE] text-[#1B1650] font-bold" : "text-[#1B1650]"}`}>
              Home
            </NavLink>

            <div className="px-4 py-3">
              <div className="text-[15px] font-medium text-slate-900 mb-2">Product</div>
              <ul className="pl-4 space-y-1 border-l-2 border-slate-100 ml-2">
                {productLinks.map(({ path, label, icon: Icon }) => {
                  const active = pathname === path;
                  return (
                    <li key={path}>
                      <Link to={path} className={`flex items-center gap-3 py-2 text-[14px] transition-colors ${active ? "text-[#6D28D9] font-bold" : "text-slate-600 hover:text-[#6D28D9]"}`}>
                        <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-[#6D28D9] text-white" : "bg-violet-50 text-[#6D28D9]"}`}>
                          <Icon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                        </span>
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {mainLinks.map(({ path, label }) => (
              <NavLink key={path} to={path} className={({ isActive }) => `block px-4 py-3 text-[15px] font-medium rounded-xl hover:bg-slate-50 ${isActive ? "bg-[#EEEAFE] text-[#1B1650] font-bold" : "text-[#1B1650]"}`}>
                {label}
              </NavLink>
            ))}

            <div className="p-4 pt-3 grid gap-2">
              <Link to={DEMO_PATH} className="w-full px-6 py-3 bg-[#6D28D9] hover:bg-[#8B5CF6] text-white rounded-full font-bold text-[15px] text-center shadow-[0_4px_14px_rgb(253,101,0,0.3)]">
                Book a demo
              </Link>
              <Link to={TRIAL_PATH} className="w-full px-6 py-3 rounded-full border border-slate-300 text-slate-800 font-semibold text-[15px] text-center">
                Start free trial
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
