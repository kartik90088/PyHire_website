import { Link } from 'react-router-dom';
import { UserPlus, Users, Filter, CheckCircle2, Award, Sparkles, Star } from 'lucide-react';
import { DEMO_PATH, QUOTE_PATH } from '../lib/routes';

/**
 * Candidate Management hero.
 *
 * Previously a single flat PNG with the headline and standfirst baked into the
 * pixels — invisible to crawlers and to screen readers, and 94KB before it drew
 * anything. This rebuilds the same composition as real markup, matching the
 * structure of the other platform heroes (JobManagementHero et al.).
 *
 * Only the candidate photography is raster; every card, badge, score and
 * connector below is live DOM, so it stays sharp at any resolution and reflows
 * instead of cropping.
 *
 * Layout follows the brief: text column ~40%, dashboard ~60%, cards grouped
 * tightly with no dead space in the middle.
 */
export function CandidateManagementHero() {
  return (
    <section className="relative w-full bg-[#fdfdfd] pt-12 pb-12 lg:pt-10 lg:pb-8 overflow-hidden flex justify-center">
      {/* Background shapes, matching the sibling heroes */}
      <div className="absolute top-1/2 -left-24 w-44 h-44 bg-[#2563eb] rounded-full opacity-90 -translate-y-1/2 hidden lg:block" aria-hidden="true" />
      <div className="absolute -right-40 -bottom-24 w-72 h-72 bg-[#f97316] rounded-full hidden lg:block -z-10" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-6">

          {/* ---------- Left: copy (~40%) ---------- */}
          <div className="w-full lg:w-[40%] shrink-0">
            <h1 className="text-[2.5rem] sm:text-[3rem] xl:text-[3.5rem] font-bold text-[#111111] leading-[1.08] tracking-tight mb-5">
              Smart Candidate<br className="hidden sm:block" /> Management<br className="hidden sm:block" /> With PyHire
            </h1>
            <p className="text-[1.0625rem] xl:text-[1.125rem] text-[#4B5563] leading-relaxed mb-8 max-w-[460px]">
              Attract, organize, and engage top talent from one central platform. Streamline
              candidate profiles, resume parsing, pipeline stages, and hiring decisions
              effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
              <Link
                to={DEMO_PATH}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full font-bold text-[16px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgb(249,115,22,0.4)] hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2"
              >
                Book a Demo
              </Link>
              <Link
                to={QUOTE_PATH}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-4 text-[#f97316] font-bold text-[16px] transition-colors hover:text-[#ea580c] underline underline-offset-8 decoration-2 outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] rounded-full"
              >
                Get Free Quote
              </Link>
            </div>
          </div>

          {/* ---------- Right: dashboard composition (~60%) ---------- */}
          {/*
            One relative canvas with a fixed aspect ratio. Children are placed in
            percentages of it, so the whole cluster scales as a unit and keeps its
            spacing instead of scattering at different widths.
          */}
          <div className="w-full lg:w-[60%] relative" aria-hidden="true">
            <div className="relative w-full aspect-[16/12] max-w-[760px] mx-auto lg:mx-0 hidden sm:block">

              {/* dotted connectors, drawn under the cards */}
              <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 760 522" fill="none" preserveAspectRatio="none">
                <path d="M300 120 C 380 90, 430 70, 505 92" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 6" />
                <path d="M330 250 C 430 250, 470 180, 520 150" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 6" />
                <path d="M470 330 C 530 360, 560 380, 600 372" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 6" />
                <path d="M250 400 C 330 430, 420 430, 500 405" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 6" />
              </svg>

              {/* -- Candidate card 1 -- */}
              <div className="absolute left-0 top-[7%] w-[36%] bg-white rounded-[20px] shadow-[0_12px_40px_rgba(15,23,42,0.10)] border border-slate-100 p-2.5 z-20">
                <div className="relative rounded-[14px] overflow-hidden bg-slate-100 aspect-square">
                  <img src="/cm-candidate-1.webp" alt="" className="w-full h-full object-cover" width={384} height={516} decoding="async" />
                  <span className="absolute top-2 right-2 bg-emerald-50 text-emerald-700 text-[10px] xl:text-[11px] font-bold px-2 py-1 rounded-full leading-tight text-center shadow-sm">
                    96%<br /><span className="font-semibold">Match</span>
                  </span>
                </div>
                <div className="pt-3 px-1">
                  <p className="font-bold text-[#111111] text-[13px] xl:text-[15px] leading-tight">Sarah Jenkins</p>
                  <p className="text-slate-500 text-[11px] xl:text-[12px] mb-2">Lead React Architect</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {['React', 'TypeScript', 'Node.js'].map((t) => (
                      <span key={t} className="bg-blue-50 text-blue-600 text-[9px] xl:text-[10px] font-semibold px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50/70 rounded-lg p-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <UserPlus className="w-3.5 h-3.5" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[8px] xl:text-[9px] font-bold text-emerald-700 tracking-wider">STATUS</span>
                      <span className="block text-[10px] xl:text-[11px] font-bold text-emerald-800">Shortlisted for Final Round</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* -- Candidate card 2 -- */}
              <div className="absolute left-[31%] top-[36%] w-[30%] bg-white rounded-[20px] shadow-[0_12px_40px_rgba(15,23,42,0.10)] border border-slate-100 p-2.5 z-30">
                <div className="relative rounded-[14px] overflow-hidden bg-slate-100 aspect-square">
                  <img src="/cm-candidate-2.webp" alt="" className="w-full h-full object-cover" width={384} height={508} decoding="async" />
                  <span className="absolute top-2 right-2 bg-orange-50 text-[#ea580c] text-[10px] xl:text-[11px] font-bold px-2 py-1 rounded-full leading-tight text-center shadow-sm">
                    92%<br /><span className="font-semibold">Match</span>
                  </span>
                </div>
                <div className="pt-3 px-1">
                  <p className="font-bold text-[#111111] text-[13px] xl:text-[15px] leading-tight">David Chen</p>
                  <p className="text-slate-500 text-[11px] xl:text-[12px] mb-1.5">Cloud DevOps Engineer</p>
                  <div className="flex items-center gap-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[10px] xl:text-[11px] font-bold text-slate-600 ml-1">5.0</span>
                  </div>
                </div>
              </div>

              {/* -- Candidate Pipeline -- */}
              <div className="absolute right-0 top-0 w-[42%] bg-white rounded-[20px] shadow-[0_12px_40px_rgba(15,23,42,0.10)] border border-slate-100 p-3.5 z-40">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-[#111111] text-[12px] xl:text-[14px]">Candidate Pipeline</p>
                  <span className="bg-orange-50 text-[#f97316] text-[9px] xl:text-[10px] font-bold px-2 py-0.5 rounded-full">Live</span>
                </div>
                <dl className="flex flex-col gap-2.5">
                  {[
                    { icon: Users, tint: 'text-blue-500 bg-blue-50', label: 'Total Talent Pool', value: '14,280', vc: 'text-[#111111]' },
                    { icon: Filter, tint: 'text-[#f97316] bg-orange-50', label: 'In Screening', value: '420', vc: 'text-[#f97316]' },
                    { icon: CheckCircle2, tint: 'text-emerald-600 bg-emerald-50', label: 'Interviewed', value: '188', vc: 'text-emerald-600' },
                    { icon: Award, tint: 'text-purple-600 bg-purple-50', label: 'Offers Extended', value: '34', vc: 'text-purple-600' },
                  ].map(({ icon: Icon, tint, label, value, vc }) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${tint}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <dt className="text-[10px] xl:text-[12px] text-slate-600 flex-1">{label}</dt>
                      <dd className={`text-[11px] xl:text-[13px] font-bold ${vc}`}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* -- AI Resume Parser -- */}
              <div className="absolute right-0 bottom-[2%] w-[40%] bg-white rounded-[20px] shadow-[0_12px_40px_rgba(15,23,42,0.10)] border border-slate-100 p-3.5 z-40">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 rounded-lg bg-orange-50 text-[#f97316] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <span className="leading-tight">
                    <span className="block font-bold text-[#111111] text-[11px] xl:text-[13px]">AI Resume Parser</span>
                    <span className="block text-slate-400 text-[9px] xl:text-[10px]">Auto-Enriched Profile</span>
                  </span>
                </div>
                <dl className="flex flex-col gap-1.5">
                  {[
                    { label: 'Skills Verified', value: '18 / 18', vc: 'text-emerald-600' },
                    { label: 'Experience Match', value: '7+ Years', vc: 'text-blue-600' },
                    { label: 'Culture Fit', value: 'Exceptional', vc: 'text-[#f97316]' },
                  ].map(({ label, value, vc }) => (
                    <div key={label} className="flex items-center justify-between bg-slate-50/80 rounded-lg px-2.5 py-1.5">
                      <dt className="text-[10px] xl:text-[11px] text-slate-600">{label}</dt>
                      <dd className={`text-[10px] xl:text-[11px] font-bold ${vc}`}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* -- floating avatars -- */}
              <span className="absolute left-[26%] top-0 w-9 h-9 xl:w-11 xl:h-11 rounded-full overflow-hidden ring-4 ring-white shadow-lg z-30">
                <img src="/cm-avatar-1.webp" alt="" className="w-full h-full object-cover" width={128} height={128} decoding="async" />
              </span>
              <span className="absolute left-[64%] top-[30%] w-8 h-8 xl:w-10 xl:h-10 rounded-full overflow-hidden ring-4 ring-white shadow-lg z-30">
                <img src="/cm-avatar-2.webp" alt="" className="w-full h-full object-cover" width={128} height={128} decoding="async" />
              </span>
              <span className="absolute left-[14%] bottom-[8%] w-9 h-9 xl:w-11 xl:h-11 rounded-full overflow-hidden ring-4 ring-white shadow-lg z-30">
                <img src="/cm-avatar-3.webp" alt="" className="w-full h-full object-cover" width={128} height={128} decoding="async" />
              </span>
              <span className="absolute left-[19%] top-[3%] w-8 h-8 rounded-full bg-orange-50 border border-orange-100 text-[#f97316] flex items-center justify-center shadow-sm z-30">
                <UserPlus className="w-4 h-4" />
              </span>
            </div>

            {/*
              Below sm the absolute canvas would collapse into overlapping cards,
              so the same three data cards stack instead.
            */}
            <div className="sm:hidden flex flex-col gap-4">
              <div className="bg-white rounded-[20px] shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-slate-100 p-4 flex items-center gap-3">
                <img src="/cm-candidate-1.webp" alt="" className="w-14 h-16 rounded-xl object-cover shrink-0" width={384} height={516} decoding="async" />
                <div className="min-w-0">
                  <p className="font-bold text-[#111111] text-[14px]">Sarah Jenkins</p>
                  <p className="text-slate-500 text-[12px] mb-1">Lead React Architect</p>
                  <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full">96% Match</span>
                </div>
              </div>
              <div className="bg-white rounded-[20px] shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-slate-100 p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-[#111111] text-[14px]">Candidate Pipeline</p>
                  <span className="bg-orange-50 text-[#f97316] text-[10px] font-bold px-2 py-0.5 rounded-full">Live</span>
                </div>
                <dl className="grid grid-cols-2 gap-2">
                  {[
                    ['Total Talent Pool', '14,280'],
                    ['In Screening', '420'],
                    ['Interviewed', '188'],
                    ['Offers Extended', '34'],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-slate-50/80 rounded-lg px-3 py-2">
                      <dt className="text-[11px] text-slate-600">{label}</dt>
                      <dd className="text-[15px] font-bold text-[#111111]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
