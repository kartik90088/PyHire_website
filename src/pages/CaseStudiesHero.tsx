import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { DEMO_PATH, QUOTE_PATH } from '../lib/routes';
import {
  Award,
  CheckCircle2,
  FileText,
  Star,
  UserSearch,
  Users,
} from 'lucide-react';

/** Pipeline rows in the floating "Hiring Pipeline" card. */
const pipelineStages = [
  { icon: FileText, label: 'Application', count: '120' },
  { icon: UserSearch, label: 'Screening', count: '86' },
  { icon: Users, label: 'Interview', count: '32' },
  { icon: Award, label: 'Offer', count: '12' },
  { icon: CheckCircle2, label: 'Hired', count: '08' },
];

/** Team photo anchoring the collage. */
const TEAM_PHOTO =
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=80';
const TEAM_PHOTO_ALT = 'A hiring team celebrating a successful placement together';

/** Small circular avatars scattered around the collage. */
const floatingAvatars = [
  {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2.5&w=160&h=160&q=80',
    className: 'top-[74px] right-[286px] w-[52px] h-[52px]',
    delay: 0.5,
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2.5&w=160&h=160&q=80',
    className: 'top-[268px] left-0 w-[56px] h-[56px]',
    delay: 0.6,
  },
  {
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2.5&w=160&h=160&q=80',
    className: 'top-[404px] right-[16px] w-[54px] h-[54px]',
    delay: 0.7,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function CaseStudiesHero() {
  // Top padding clears the fixed navbar on every breakpoint.
  return (
    <section className="relative w-full bg-[#FFFCF4] pt-28 pb-16 lg:pt-24 lg:pb-20 overflow-hidden">

      {/* Decorative brand shapes */}
      <div className="absolute top-[52%] -left-20 w-36 h-36 bg-[#f97316] rounded-full hidden lg:block" aria-hidden="true" />
      <div className="absolute -bottom-40 -right-32 w-[380px] h-[380px] bg-[#f97316] rounded-full hidden lg:block" aria-hidden="true" />
      <div className="absolute bottom-[12%] right-[30%] w-56 h-56 bg-orange-100/40 rounded-full hidden lg:block" aria-hidden="true" />
      <div className="absolute top-[22%] right-[10%] w-64 h-64 bg-orange-50/70 rounded-full hidden lg:block" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8 relative">

        {/* Left Content */}
        <div className="w-full lg:w-5/12 z-10 relative">
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-[3rem] sm:text-[3.5rem] lg:text-[4.25rem] font-bold text-[#111111] leading-[1.1] tracking-tight mb-6"
          >
            Success stories<br />of Hiring<br />with <span className="text-[#f97316]">PyHire</span>
          </motion.h1>

          {/* Accent rule */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="flex items-center gap-2 mb-7"
            aria-hidden="true"
          >
            <span className="block w-20 h-1 rounded-full bg-[#f97316]" />
            <span className="block w-1.5 h-1.5 rounded-full bg-[#f97316]" />
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[1.125rem] text-[#4B5563] mb-8 leading-relaxed max-w-md"
          >
            Discover how organizations simplify hiring, improve collaboration, and build winning teams with PyHire.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <Link to={DEMO_PATH} className="group px-8 py-4 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full font-bold text-[16px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgb(249,115,22,0.4)] hover:-translate-y-0.5 inline-flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2">
              Book a Demo
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
            <Link to={QUOTE_PATH} className="inline-flex items-center justify-center px-4 py-4 text-[#f97316] font-bold text-[16px] transition-colors hover:text-[#ea580c] underline underline-offset-8 decoration-2 outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] rounded-full">
              Get Free Quote
            </Link>
          </motion.div>
        </div>

        {/* Right Content - Visual Collage */}
        <div className="w-full lg:w-7/12 relative">

          {/* Mobile / tablet fallback: the photo alone, no absolute collage */}
          <div className="lg:hidden relative w-full h-[320px] sm:h-[400px] rounded-[28px] overflow-hidden shadow-xl border-4 border-white bg-slate-100">
            <img
              src={TEAM_PHOTO}
              alt={TEAM_PHOTO_ALT}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Desktop collage — fixed pixel offsets inside a fixed-height stage,
              so cards never overlap each other or the fixed navbar. */}
          <div className="hidden lg:block relative h-[680px] w-full">

            {/* Dashed connectors */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox="0 0 760 680"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <g fill="none" stroke="#f9a56a" strokeWidth="1.5" strokeDasharray="5 6" opacity="0.75">
                <path d="M 96 58 Q 190 30 300 74" />
                <path d="M 40 300 Q 8 380 70 430" />
                <path d="M 700 470 Q 748 520 690 556" />
                <path d="M 330 620 Q 430 686 560 640" />
              </g>
            </svg>

            {/* Central photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute top-[72px] left-[56px] w-[420px] h-[330px] rounded-[28px] overflow-hidden shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)] z-10 bg-slate-100"
            >
              <img
                src={TEAM_PHOTO}
                alt={TEAM_PHOTO_ALT}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>

            {/* Orange icon badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="absolute top-[26px] left-[36px] w-[62px] h-[62px] rounded-full bg-[#f97316] flex items-center justify-center shadow-[0_10px_24px_-6px_rgba(249,115,22,0.55)] z-30"
              aria-hidden="true"
            >
              <Users className="w-7 h-7 text-white" strokeWidth={2} />
            </motion.div>

            {/* Floating avatars */}
            {floatingAvatars.map((avatar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: avatar.delay }}
                className={`absolute ${avatar.className} rounded-full overflow-hidden border-[3px] border-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.25)] bg-slate-100 z-30`}
                aria-hidden="true"
              >
                <img src={avatar.src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}

            {/* Hiring Pipeline card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="absolute top-[36px] right-0 w-[270px] bg-white rounded-[22px] p-5 shadow-[0_20px_45px_-18px_rgba(0,0,0,0.18)] z-30"
            >
              <h2 className="font-bold text-[15px] text-[#111111] mb-4">Hiring Pipeline</h2>
              <ul className="space-y-3.5">
                {pipelineStages.map(({ icon: Icon, label, count }) => (
                  <li key={label} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#f97316]" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <span className="text-[14px] font-medium text-slate-700">{label}</span>
                    </span>
                    <span className="text-[13px] font-bold text-[#f97316] bg-orange-50 rounded-full px-2.5 py-1 tabular-nums">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Testimonial card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-[24px] left-[16px] w-[310px] bg-white rounded-[22px] p-6 shadow-[0_20px_45px_-18px_rgba(0,0,0,0.18)] z-30"
            >
              <div className="flex items-center gap-1 mb-4" aria-label="Rated 5 out of 5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#f97316] fill-[#f97316]" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-[15px] text-[#111111] leading-relaxed font-medium mb-5">
                “PyHire has transformed our hiring journey. We hire better, faster and smarter.”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src="/job-management-hiring-manager.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </span>
                <span>
                  <span className="block text-[14px] font-bold text-[#111111]">Rohan Mehta</span>
                  <span className="block text-[13px] text-slate-500">HR Manager, TechNova</span>
                </span>
              </figcaption>
            </motion.div>

            {/* Time to Hire card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute bottom-[76px] right-0 w-[280px] bg-white rounded-[22px] p-5 shadow-[0_20px_45px_-18px_rgba(0,0,0,0.18)] z-20"
            >
              <h2 className="font-bold text-[15px] text-[#111111] mb-4">Time to Hire</h2>
              <div className="flex items-end gap-4">
                <svg className="w-[130px] h-[62px] shrink-0" viewBox="0 0 130 62" fill="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="tth-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M2 50 L20 40 L34 46 L50 26 L66 34 L82 16 L98 24 L114 6 L128 12 L128 62 L2 62 Z"
                    fill="url(#tth-fill)"
                  />
                  <path
                    d="M2 50 L20 40 L34 46 L50 26 L66 34 L82 16 L98 24 L114 6 L128 12"
                    stroke="#f97316"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <div className="text-[26px] font-bold text-[#f97316] leading-none mb-1.5">-35%</div>
                  <p className="text-[13px] text-slate-500 leading-snug">Improved<br />Time to Hire</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
