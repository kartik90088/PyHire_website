import re

with open('src/components/ProductPageLayout.tsx', 'r') as f:
    content = f.read()

target = r'          <div className="hidden lg:block relative w-full overflow-x-auto pb-8 pt-12 scrollbar-hide">.*?<div className="lg:hidden space-y-4 max-w-xl mx-auto">'

replacement = """          <div className="hidden lg:block relative w-full overflow-hidden pb-8 pt-12">
            <style>{`
              @keyframes marqueeWorkflow {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
            <div className="w-max flex relative h-[450px] animate-[marqueeWorkflow_40s_linear_infinite] hover:[animation-play-state:paused]">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#111111] -translate-y-1/2 z-0"></div>
              
              <div className="flex items-center h-full relative z-10 w-max gap-[150px] pr-[150px] pl-[75px]">
                {[...workflowSteps, ...workflowSteps].map((step, idx) => {
                  const isTop = idx % 2 === 0;
                  return (
                    <div 
                      key={idx} 
                      className={`relative flex flex-col items-center justify-center w-[220px] shrink-0 ${isTop ? 'mb-[220px]' : 'mt-[220px]'}`}
                    >
                      <div className={`absolute left-1/2 -translate-x-1/2 w-[1px] h-[60px] border-l border-dashed border-[#111111] ${isTop ? '-bottom-[60px]' : '-top-[60px]'}`}></div>
                      <div className={`absolute left-1/2 -translate-x-1/2 ${isTop ? '-bottom-[68px]' : '-top-[68px]'} w-4 h-4 rounded-full bg-[#111111] ring-[6px] ring-white shadow-sm z-10`}></div>
                      <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#f2f2f2] w-[220px] flex flex-col gap-4 relative z-20 hover:shadow-[0_8px_30px_rgb(249,115,22,0.12)] transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-inner">
                            {step.icon}
                          </div>
                          <div className="flex flex-col pt-1">
                            <span className="text-[#f97316] font-extrabold text-[18px] leading-none mb-1">{step.id}</span>
                            <h4 className="font-bold text-[#111111] text-[13px] leading-snug">{step.title}</h4>
                          </div>
                        </div>
                        <p className="text-[12px] text-[#6b7280] leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="lg:hidden space-y-4 max-w-xl mx-auto">"""

new_content = re.sub(target, replacement, content, flags=re.DOTALL)

with open('src/components/ProductPageLayout.tsx', 'w') as f:
    f.write(new_content)
