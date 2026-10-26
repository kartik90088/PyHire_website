import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSiteJsonLd } from "./lib/useSeo";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { CandidateManagement } from "./pages/CandidateManagement";
import { JobManagement } from "./pages/JobManagement";
import { AICandidateMatching } from "./pages/AICandidateMatching";
import { InterviewManagement } from "./pages/InterviewManagement";
import { ClientVendorManagement } from "./pages/ClientVendorManagement";
import { UnifiedCommunication } from "./pages/UnifiedCommunication";
import { AnalyticsDashboards } from "./pages/AnalyticsDashboards";
import { ComplianceSecurity } from "./pages/ComplianceSecurity";
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { NotFound } from "./pages/NotFound";
import { Footer } from "./components/Footer";
import { ChatbotWidget } from "./components/ChatbotWidget";

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
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-emerald-200 selection:text-emerald-900">
        <Navbar />
        <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidate-management" element={<CandidateManagement />} />
          <Route path="/job-management" element={<JobManagement />} />
          <Route path="/ai-candidate-matching" element={<AICandidateMatching />} />
          <Route path="/interview-management" element={<InterviewManagement />} />
          <Route path="/client-vendor-management" element={<ClientVendorManagement />} />
          <Route path="/unified-communication" element={<UnifiedCommunication />} />
          <Route path="/analytics-dashboards" element={<AnalyticsDashboards />} />
          <Route path="/compliance-security" element={<ComplianceSecurity />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
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
