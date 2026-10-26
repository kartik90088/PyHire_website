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
import React from 'react';
import { ProductPageLayout } from '../components/ProductPageLayout';
import { AnalyticsDashboardsHero } from './AnalyticsDashboardsHero';

export function AnalyticsDashboards() {
  return (
    <ProductPageLayout 
      customHero={<AnalyticsDashboardsHero />}
      
      hero={{ imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" }}
      title="Analytics & Dashboards"
      seoTitle="Recruitment Analytics & Hiring Dashboards"
      description="Track recruitment KPIs, hiring performance, recruiter productivity, pipeline analytics, source effectiveness, and executive dashboards in real time."
      features={[
        { title: "Real-time Dashboards", desc: "Interactive, customizable dashboards providing instant visibility into your hiring metrics.", icon: <Activity /> },
        { title: "Source Effectiveness", desc: "Identify which job boards and channels yield the highest quality candidates.", icon: <PieChart /> },
        { title: "Time-to-Hire Tracking", desc: "Pinpoint bottlenecks in your hiring pipeline with stage-by-stage velocity reports.", icon: <Clock /> },
        { title: "Recruiter Productivity", desc: "Track individual and team performance metrics effortlessly.", icon: <TrendingUp /> }
      ]}
      workflowTitle="From Data to Insights"
      workflowDesc="Transform raw recruitment data into actionable strategic intelligence."
      workflowSteps={[
        { id: "01", title: "Data Collection", desc: "System automatically captures all recruitment activities.", icon: <Database className="w-6 h-6 text-[#f97316]" /> },
        { id: "02", title: "Real-time Processing", desc: "Metrics are calculated and updated instantly.", icon: <Activity className="w-6 h-6 text-[#f97316]" /> },
        { id: "03", title: "Dashboard Generation", desc: "Visualize data through intuitive charts and graphs.", icon: <PieChart className="w-6 h-6 text-[#f97316]" /> },
        { id: "04", title: "Custom Filtering", desc: "Slice data by department, recruiter, role, or date.", icon: <Filter className="w-6 h-6 text-[#f97316]" /> },
        { id: "05", title: "Identify Bottlenecks", desc: "Spot pipeline delays and source inefficiencies.", icon: <Target className="w-6 h-6 text-[#f97316]" /> },
        { id: "06", title: "Executive Reporting", desc: "Export and share beautiful reports with stakeholders.", icon: <Presentation className="w-6 h-6 text-[#f97316]" /> }
      ]}
      benefitsTitle="Make Data-Driven Hiring Decisions"
      benefitsDesc="Stop guessing and start optimizing your talent acquisition strategy with precise analytics."
      benefitsImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      benefits={[
        { title: "Optimize Spend", desc: "Reallocate budget away from underperforming job boards to high-yield sources.", icon: <Zap /> },
        { title: "Improve Forecasting", desc: "Predict time-to-fill for future roles based on historical data.", icon: <LineChart /> },
        { title: "Enhance Candidate Quality", desc: "Correlate candidate sources with long-term employee success.", icon: <Award /> },
        { title: "Executive Visibility", desc: "Provide leadership with transparent, easy-to-understand hiring metrics.", icon: <Users /> }
      ]}
      overview={{
        eyebrow: "Analytics & Dashboards",
        title: "Recruitment reporting that does not require a week of spreadsheet work",
        blocks: [
          {
            type: 'p',
            text: "Most recruitment teams have plenty of hiring data. What they lack is a connected view of it. Candidates sit in one place, requisitions in another, vendor performance in a third, and the monthly report is assembled by someone exporting all three and reconciling them by hand — which is why it arrives late, describes a month that has already ended, and is rarely questioned closely.",
          },
          {
            type: 'p',
            text: "**PyHire captures recruitment activity as it happens and calculates the metrics continuously.** Because the requisitions, candidates, interviews and channel data all reference the same records, reporting is a view over the live process rather than a reconstruction of it.",
          },
          {
            type: 'p',
            text: "That changes what the numbers are for. A report describing last quarter is a scorecard. A dashboard describing this week is an operational tool — it shows which roles are stalling now, while there is still time to do something about it.",
          },
          {
            type: 'p',
            text: "It also settles arguments that are otherwise unresolvable. Which job board is worth renewing, whether a role is slow because of sourcing or because of interview scheduling, which vendor actually converts submittals into placements: these are answerable questions, but only if every stage transition was recorded as it happened.",
          },
        ],
        highlights: [
          { label: "Tracks", value: "Recruitment KPIs, hiring performance, recruiter productivity, pipeline analytics and source effectiveness." },
          { label: "Updates", value: "In real time — metrics recalculate as recruitment activity is captured, not at month end." },
          { label: "Filter by", value: "Department, recruiter, role or date range, so each stakeholder sees their own slice." },
          { label: "Sharing", value: "Custom reports can be built, exported, and scheduled to stakeholders weekly or monthly." },
        ],
      }}
      deepDive={{
        title: "The four questions the dashboards answer",
        desc: "Recruitment analytics is only useful where it changes a decision. These are the decisions.",
        items: [
          {
            title: "Where is the money going, and is it working?",
            blocks: [
              {
                type: 'p',
                text: "Source effectiveness reporting shows which job boards and channels produce the highest quality candidates — not simply the most applications, which is the metric boards themselves prefer to be judged on.",
              },
              {
                type: 'p',
                text: "Because candidates are tagged with their source at the point of application and that tag follows them through the pipeline, a channel can be evaluated on the hires it produced. A board delivering high volume and no placements looks very different under that measure than under an application count.",
              },
              {
                type: 'p',
                text: "The practical outcome is budget reallocation: spend moves away from underperforming sources toward the ones actually producing joins.",
              },
            ],
          },
          {
            title: "Where is time actually being lost?",
            blocks: [
              {
                type: 'p',
                text: "Time-to-hire as a single number tells you a role was slow. Stage-by-stage velocity tells you where it was slow, which is the part you can act on.",
              },
              {
                type: 'p',
                text: "A role stuck at screening is a sourcing or capacity problem. A role stuck between shortlist and first interview is a scheduling problem. A role stuck at offer is a compensation or approval problem. Each has a different fix, and the aggregate number hides which one you have.",
              },
              {
                type: 'p',
                text: "Historical stage data also improves forecasting — predicted time-to-fill for a new role is based on how comparable roles actually behaved rather than on an optimistic estimate.",
              },
            ],
          },
          {
            title: "How is the team performing?",
            blocks: [
              {
                type: 'p',
                text: "Recruiter productivity metrics track individual and team performance across the activities that make up recruitment work — requisitions handled, candidates progressed, interviews arranged, placements made.",
              },
              {
                type: 'p',
                text: "For agencies this connects to profitability directly: which recruiter, client or vendor is contributing most is a question that normally requires assembling several sources by hand, and here it is a report.",
              },
            ],
          },
          {
            title: "What does leadership need to see?",
            blocks: [
              {
                type: 'p',
                text: "Executive dashboards present hiring performance in a form leadership can read without a recruiter interpreting it, and custom filtering means a department head sees their department rather than a company-wide average that describes nobody.",
              },
              {
                type: 'p',
                text: "Reports can be built to specific metrics, filters and chart types, then scheduled to the stakeholders who need them weekly or monthly — so the reporting cycle stops consuming recruiter time it was meant to save.",
              },
              {
                type: 'p',
                text: "Because dashboards respect role-based access, giving a hiring manager visibility does not mean giving them visibility into everything.",
              },
            ],
          },
        ],
      }}
      useCases={{
        title: "Who reads these dashboards",
        desc: "The same underlying data, filtered to the decision each role is responsible for.",
        items: [
          {
            persona: "Talent acquisition leaders",
            situation: "Pipeline health is assessed in a weekly meeting, from numbers assembled the night before.",
            outcome: "Live dashboards show which roles are stalling and at which stage, while there is still time to intervene.",
          },
          {
            persona: "Finance and procurement",
            situation: "Job board contracts are renewed on relationship and habit rather than on measured return.",
            outcome: "Source effectiveness measured on hires, not applications, makes renewal decisions evidence-based.",
          },
          {
            persona: "Agency owners",
            situation: "Client, recruiter and vendor profitability is buried across spreadsheets and manual calculations.",
            outcome: "A connected view of hiring outcomes answers which relationships are actually contributing value.",
          },
          {
            persona: "Hiring managers",
            situation: "No visibility into their own open roles without asking a recruiter for a status update.",
            outcome: "Filtered dashboards show their roles and their pipeline, within their permissions.",
          },
        ],
      }}
      faqsTitle="Frequently Asked Questions"
      faqsDesc="Learn about our reporting capabilities."
      faqs={[
        { q: "Can I create custom reports?", a: "Yes. The custom report builder lets you select specific metrics, filters and chart types, so you can build the view your team actually reviews rather than working around a fixed set of standard reports." },
        { q: "Can reports be scheduled automatically?", a: "Yes. Reports can be scheduled and emailed to stakeholders weekly or monthly, so the reporting cycle stops consuming the recruiter time the analytics were meant to free up." },
        { q: "Does it track diversity metrics?", a: "Yes. PyHire includes EEOC and diversity tracking dashboards where legally compliant. Because requirements differ by jurisdiction, what is collected and reported is scoped to what the law in your market permits." },
        { q: "How current is the data?", a: "Recruitment activity is captured automatically as it happens and metrics recalculate in real time. Dashboards describe the process as it currently stands rather than reconstructing a period that has already closed." },
        { q: "Can I see which job boards are actually worth paying for?", a: "Yes. Candidates are tagged with their source at application and that tag follows them through the pipeline, so channels are measured on the hires they produced rather than the applications they delivered — which is usually a very different ranking." },
        { q: "Can I find out where a role is getting stuck?", a: "Stage-by-stage velocity reporting shows where time is being lost, not just that a role was slow. A delay at screening, at interview scheduling, and at offer are three different problems with three different fixes, and an aggregate time-to-hire figure hides which one you have." },
        { q: "Can different people see different data?", a: "Yes. Dashboards respect role-based access and can be filtered by department, recruiter, role or date, so a hiring manager sees their own roles rather than a company-wide view — and giving them visibility does not mean giving them access to everything." },
        { q: "Can I forecast time-to-fill for new roles?", a: "Yes. Forecasting draws on how comparable roles actually performed historically, so a projection is grounded in your own recruitment data rather than in an estimate." },
      ]}
      ctaTitle="Ready to Unlock Recruitment Insights?"
      ctaDesc="Track KPIs, monitor productivity, and optimize your hiring pipeline with powerful analytics."
      ctaImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    />
  );
}

// Ensure Database is imported
