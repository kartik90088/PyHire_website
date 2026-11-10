import React from 'react';
import { Link } from 'react-router-dom';
import { DEMO_PATH, QUOTE_PATH } from '../lib/routes';

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f8fbfa] min-h-[700px] flex items-center pt-28 pb-8 lg:pt-32 lg:pb-10">
      {/* Decorative background shapes mimicking the video */}
      <div className="absolute left-0 top-[25%] w-12 h-24 bg-[#4285F4] rounded-r-full hidden md:block opacity-90"></div>
      <div className="absolute top-[10%] right-[30%] w-8 h-8 bg-teal-200 rounded-full"></div>
      <div className="absolute bottom-[20%] left-[45%] w-6 h-6 bg-violet-200 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="max-w-xl">
            <h1 className="text-[3.5rem] md:text-[4.5rem] font-bold text-[#1f2937] tracking-tight leading-[1.05] mb-8">
              AI-Powered Platform for End-to-End Recruitment
            </h1>
            <p className="text-[1.1rem] md:text-[1.25rem] text-slate-500 mb-6 leading-relaxed pr-8">
              Simplify and automate every stage of your hiring process with PyHire. From sourcing and screening candidates to interviews and communication, manage everything in one platform. Reduce manual work, save time, and hire the right talent faster.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link to={DEMO_PATH} className="inline-flex items-center justify-center px-8 py-4 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full font-medium text-lg transition-colors w-full sm:w-auto shadow-lg shadow-violet-500/25 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2">
                Book a Demo
              </Link>
              <Link to={QUOTE_PATH} className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-[#6D28D9] hover:bg-violet-50 rounded-full font-medium text-lg transition-colors w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]">
                Get Free Quote
              </Link>
            </div>
          </div>

          {/* Right Content - Animation Video */}
          <div className="relative flex justify-center lg:justify-end lg:-mr-12 xl:-mr-24 2xl:-mr-32">
            <video
              className="w-full h-auto rounded-3xl border-4 border-[#5B21B6]"
              src="/ai-recruitment-platform-mvp.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="AI recruitment platform animation"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
