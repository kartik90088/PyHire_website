import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSiteJsonLd } from "./lib/useSeo";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/medic/MHome2";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Footer } from "./components/Footer";
import { ChatbotWidget } from "./components/ChatbotWidget";
import { legacyRedirects } from "./data/navigation";
import { productPages } from "./data/productPages";

/* The redesigned inner pages (PyHire website content document, Oct 2026) are
   split into their own chunks so the home page bundle stays lean. The eight
   product pages share one template chunk. */
const ProductPage = lazy(() => import("./pages/site/ProductPage").then((m) => ({ default: m.ProductPage })));
const Solutions = lazy(() => import("./pages/site/Solutions").then((m) => ({ default: m.Solutions })));
const Pricing = lazy(() => import("./pages/site/Pricing").then((m) => ({ default: m.Pricing })));
const Partners = lazy(() => import("./pages/site/Partners").then((m) => ({ default: m.Partners })));
const About = lazy(() => import("./pages/site/About").then((m) => ({ default: m.About })));
const Contact = lazy(() => import("./pages/site/Contact").then((m) => ({ default: m.Contact })));

// Route-level code splitting: the blog listing and article pages ship as their
// own chunks, so the content store isn't downloaded by visitors who never
// open the blog.
const Blog = lazy(() => import("./pages/Blog").then((m) => ({ default: m.Blog })));
const BlogPost = lazy(() => import("./pages/BlogPost").then((m) => ({ default: m.BlogPost })));
const CaseStudies = lazy(() => import("./pages/CaseStudies").then((m) => ({ default: m.CaseStudies })));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail").then((m) => ({ default: m.CaseStudyDetail })));

// Legal pages: rarely visited, but must be reachable and indexable. Split out
// so the policy text is not carried by every other page in the main bundle.
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse").then((m) => ({ default: m.TermsOfUse })));

function RouteFallback() {
  return (
    <div className="min-h-[60vh] pt-32 px-5" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <div className="max-w-[1320px] mx-auto animate-pulse space-y-6">
        <div className="h-4 w-24 bg-slate-100 rounded-full" />
        <div className="h-12 w-3/4 max-w-2xl bg-slate-100 rounded-2xl" />
        <div className="h-4 w-full max-w-xl bg-slate-100 rounded-full" />
        <div className="h-64 w-full bg-slate-100 rounded-[24px]" />
      </div>
    </div>
  );
}

export default function App() {
  /* Organization + WebSite graphs, emitted on every route — including the pages
     that set no per-route metadata of their own. */
  useSiteJsonLd();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans text-[#1B1650] selection:bg-[#DDD6FE] selection:text-[#1B1650]">
        <ScrollProgress />
        <Navbar />
        <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {productPages.map((page) => (
            <Route key={page.path} path={page.path} element={<ProductPage page={page} />} />
          ))}
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          {/* Pre-redesign URLs → their new pages (see data/navigation.ts). */}
          {Object.entries(legacyRedirects).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          {/* Catch-all — unmatched URLs previously rendered an empty gap between
              the navbar and footer. Marked noindex inside the component. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        <Footer />
        <ChatbotWidget />
      </div>
    </BrowserRouter>
  );
}
