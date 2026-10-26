import { Fingerprint, HeartPulse, BadgeCheck, KeyRound } from "lucide-react";

export function Compliance() {
  const badges = [
    {
      icon: <Fingerprint className="w-6 h-6 stroke-[1.5]" />,
      title: "DPDPA",
      desc: "Aligned for India"
    },
    {
      icon: <HeartPulse className="w-6 h-6 stroke-[1.5]" />,
      title: "HIPAA",
      desc: "Programme in progress"
    },
    {
      icon: <BadgeCheck className="w-6 h-6 stroke-[1.5]" />,
      title: "ISO 27001",
      desc: "Aligned controls"
    },
    {
      icon: <KeyRound className="w-6 h-6 stroke-[1.5]" />,
      title: "SSO / SAML",
      desc: "Enterprise plan"
    }
  ];

  return (
    <section className="py-4 lg:py-8 bg-white text-center">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="text-[2.5rem] md:text-[3rem] font-bold text-[#111827] mb-6 tracking-tight">
          Built to enterprise hiring standards.
        </h2>
        <p className="text-[#6b7280] max-w-[800px] mx-auto mb-6 text-[1.125rem] leading-relaxed">
          Data governance is not an afterthought. Every call, every profile and every piece of candidate data sits inside a compliant pipeline.
        </p>

        <div className="bg-[#fffcf4] border border-orange-50/50 rounded-[2.5rem] relative p-8 md:p-12 mx-auto shadow-sm"
          style={{
            backgroundImage: "radial-gradient(#fb923c 0.75px, transparent 0.75px)",
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0"
          }}
        >
          {/* Inner overlay to soften the dots if needed, or we can just rely on the background color */}
          <div className="absolute inset-0 bg-[#fffcf4]/80 rounded-[2.5rem] pointer-events-none"></div>

          <div className="relative z-10">
            {/* Header pill */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-5 mb-6 md:mb-8">
               <span className="uppercase tracking-wide text-[13px] font-bold text-[#f97316] bg-white rounded-full px-5 py-2.5 shadow-sm border border-orange-100/50">
                 ENTERPRISE-GRADE COMPLIANCE
               </span>
               <span className="text-[#4b5563] text-[15px] font-medium">
                 Independently auditable controls across data, calling, and access.
               </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {badges.map((badge, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300 border border-slate-50">
                   <div className="w-14 h-14 rounded-full border border-orange-100 flex items-center justify-center mb-6 text-[#f97316] bg-orange-50/30">
                      {badge.icon}
                   </div>
                   <h4 className="text-[#111827] font-bold text-[1.125rem] mb-2">{badge.title}</h4>
                   <p className="text-[#6b7280] text-[14px] flex items-center justify-center gap-2">
                     {badge.title === "HIPAA" && <span className="w-1.5 h-1.5 rounded-full bg-[#fbbc04] ring-4 ring-yellow-50"></span>}
                     {badge.desc}
                   </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
