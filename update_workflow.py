import re

with open('src/pages/CandidateManagement.tsx', 'r') as f:
    content = f.read()

target = r'        \{\/\* Desktop Timeline \*\/\}' + r'.*?' + r'        \{\/\* Mobile \/ Tablet View \*\/\}'

replacement = """        {/* Desktop Timeline */}
        <div className="hidden xl:block relative w-full overflow-hidden pb-12 pt-16">
          <style>{`
            @keyframes marqueeHorizontal {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
          <div className="w-[5800px] relative px-0 h-[560px] animate-[marqueeHorizontal_40s_linear_infinite] hover:[animation-play-state:paused]">
            
            {/* Wavy Line SVG */}
            <div className="absolute top-1/2 left-0 w-full h-[200px] -translate-y-1/2 z-0 pointer-events-none">
              <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 5800 200" fill="none">
                 <path d="M 0 100 Q 161 160, 322 100 T 644 100 T 966 100 T 1288 100 T 1610 100 T 1932 100 T 2254 100 T 2576 100 T 2900 100 T 3222 100 T 3544 100 T 3866 100 T 4188 100 T 4510 100 T 4832 100 T 5154 100 T 5476 100 T 5800 100" 
                       fill="none" stroke="url(#orange-grad)" strokeWidth="4" />
                 <defs>
                   <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                     <stop offset="10%" stopColor="#f97316" stopOpacity="1" />
                     <stop offset="90%" stopColor="#f97316" stopOpacity="1" />
                     <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
                   </linearGradient>
                 </defs>
              </svg>
            </div>
            
            <div className="grid grid-cols-[repeat(18,1fr)] gap-0 w-full h-full relative z-10">
              {[...steps, ...steps].map((step, idx) => {
                const isTop = idx % 2 === 0;
                return (
                  <div key={idx} className="relative flex justify-center w-full h-full">
                     {/* Node */}
                     <div className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#f97316] ring-[6px] ring-white shadow-[0_0_15px_rgba(249,115,22,0.5)] z-20 flex items-center justify-center ${isTop ? 'top-[calc(50%+60px)]' : 'top-[calc(50%-60px)]'} -translate-y-1/2`}>
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                     </div>
                     
                     {/* Dashed line */}
                     <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-[75px] border-l-[2.5px] border-dashed border-orange-200 z-10 ${isTop ? 'bottom-[calc(50%-60px)]' : 'top-[calc(50%-60px)]'}`}></div>

                     {/* Card */}
                     <div className={`absolute left-1/2 -translate-x-1/2 w-[310px] bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-orange-50 z-30 ${isTop ? 'bottom-[calc(50%+25px)]' : 'top-[calc(50%+25px)]'} hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] transition-all hover:-translate-y-1`}>
                       {/* Floating icon */}
                       <div className={`absolute -top-5 right-6 w-12 h-12 rounded-full bg-[#f97316] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(249,115,22,0.4)] border-4 border-white`}>
                          {step.icon}
                       </div>
                       
                       <div className="flex gap-4 h-full items-center">
                          {/* Left text */}
                          <div className="flex-1 flex flex-col justify-center">
                             <span className="text-[#f97316] font-bold text-[20px] leading-none mb-1.5">{step.id}</span>
                             <h4 className="font-bold text-[#111111] text-[16px] leading-tight mb-2">{step.title}</h4>
                             <p className="text-[12px] text-[#4B5563] leading-relaxed">
                               {step.desc}
                             </p>
                          </div>
                          {/* Right illustration */}
                          <div className="w-[110px] shrink-0 bg-slate-50/50 rounded-xl overflow-hidden border border-slate-100 flex flex-col items-center justify-center relative p-1.5 h-[110px]">
                             {step.illustration}
                          </div>
                       </div>
                     </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet View */}"""

new_content = re.sub(target, replacement, content, flags=re.DOTALL)
with open('src/pages/CandidateManagement.tsx', 'w') as f:
    f.write(new_content)
