export function Mission() {
  const stats = [
    {
      value: "1M",
      label: "Profiles processed in the last\n6 months",
    },
    {
      value: "10K+",
      label: "Profiles processed daily",
    },
    {
      value: "9.2/10",
      label: "Total Reviews out of 10 in app\n(Interviews module)",
    },
    {
      value: "99.87%",
      label: "AI Accuracy Rate",
    },
    {
      value: "99.3%",
      label: "Matching Candidate\n(Accuracy)",
    },
  ];

  return (
    <section className="py-4 lg:py-8 relative overflow-hidden bg-white">
      {/* Warm glow effect behind cards */}
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[300px] bg-[#fde047] blur-[140px] opacity-30 pointer-events-none rounded-full"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-[3.25rem] font-bold text-[#111827] mb-6 tracking-tight">Our Mission</h2>
        <p className="text-[#4b5563] max-w-[1000px] mx-auto mb-6 text-[1.125rem] leading-relaxed">
          To make hiring products radically simple, powerful, and accessible. Whether you're supercharging your spreadsheets or searching across your<br className="hidden md:block" /> candidate database, our tools empower every recruiter to make faster, more confident decisions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center min-h-[220px]">
              <h3 className="text-[2.75rem] font-medium text-[#111827] mb-3 tracking-tight">{stat.value}</h3>
              <p className="text-[15px] text-[#6b7280] leading-[1.6] whitespace-pre-line">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
