import {
  Play,
  ArrowRight,
  Search,
  Zap,
  FileText,
  Database,
  GitBranch,
  History,
  UserCheck,
  Tags,
  MessageSquare,
  PlusSquare,
  Target,
  Clock,
  Star,
  Users,
  Briefcase,
  FileSearch,
  User,
  PenTool,
  CheckCircle,
  Award,
  Calendar,
  Filter,
  Mail,
  Building,
  Globe,
  Share2,
  BarChart,
  FileCheck,
  Layers,
  BrainCircuit,
  Shield,
  BarChart2,
  Video,
  ClipboardList,
  CalendarCheck,
  FileQuestion,
  Building2,
  FileSignature,
  Handshake,
  ScrollText,
  CheckSquare,
  BarChart3,
  Network,
  ShieldCheck,
  Phone,
  Smartphone,
  Inbox,
  Send,
  Bell,
  PieChart,
  TrendingUp,
  LineChart,
  Activity,
  Presentation,
  Lock,
  Eye,
  Server,
  Key,
  AlertTriangle,
  Settings
} from "lucide-react";
import { Hero } from "../components/Hero";
import { Mission } from "../components/Mission";
import { PlatformOverview } from "../components/PlatformOverview";
import { Features } from "../components/Features";
import { Compliance } from "../components/Compliance";
import { VideoSection } from "../components/VideoSection";
import { FeatureHighlight } from "../components/FeatureHighlight";
import { Testimonials } from "../components/Testimonials";
import { Insights } from "../components/Insights";
import { FAQ, knowledgeBase } from "../components/FAQ";
import { CTA } from "../components/CTA";
import { useSeo } from "../lib/useSeo";
import { absoluteUrl } from "../lib/site";

export function Home() {
  /* The shell tags in index.html happen to describe the home page correctly, but
     they carry no canonical, no Open Graph and no structured data — and they are
     what every other page fell back to before Phase 3. Set explicitly here. */
  useSeo({
    title: 'PyHire — AI-Powered Platform for End-to-End Recruitment',
    description:
      'Simplify and automate every stage of hiring with PyHire — from candidate sourcing and screening to interviews, communication and hiring decisions.',
    canonicalPath: '/',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${absoluteUrl('/')}#faq`,
        mainEntity: knowledgeBase.map((entry) => ({
          '@type': 'Question',
          name: entry.question,
          acceptedAnswer: { '@type': 'Answer', text: entry.answer },
        })),
      },
    ],
  });

  return (
    <main>
      <Hero />
      <Mission />
      <PlatformOverview />
      <Features />
      <Compliance />
      <FeatureHighlight />
      <VideoSection />
      <Testimonials />
      <FAQ />
      <Insights />
      <CTA />
    </main>
  );
}
