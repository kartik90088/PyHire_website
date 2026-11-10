export function LogoCloud() {
  return (
    <section className="py-4 lg:py-8 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
          
          {/* Left Text */}
          <div className="lg:w-[45%] flex flex-col items-start lg:pr-8">
            <h2 className="text-[3rem] lg:text-[4rem] font-serif text-black mb-6 leading-[1.1] tracking-tight">
              Top companies<br />
              choose PyHire.
            </h2>
            <button className="px-8 py-3.5 bg-[#6D28D9] hover:bg-[#e04e1a] text-white rounded-full font-medium text-[16px] transition-colors shadow-sm">
              Read customer stories
            </button>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-[1px] h-[300px] bg-emerald-200/60"></div>

          {/* Right Logos */}
          <div className="lg:w-[55%] grid grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12 items-center justify-items-center lg:pl-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-7 sm:h-9 object-contain hover:scale-105 transition-transform" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-6 sm:h-8 object-contain hover:scale-105 transition-transform" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-7 sm:h-9 object-contain hover:scale-105 transition-transform mt-2" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-5 sm:h-6 object-contain hover:scale-105 transition-transform" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" alt="Airbnb" className="h-7 sm:h-9 object-contain hover:scale-105 transition-transform" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Adobe_Corporate_logo.svg" alt="Adobe" className="h-6 sm:h-8 object-contain hover:scale-105 transition-transform" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Tata_Consultancy_Services_old_logo.svg" alt="TCS" className="h-8 sm:h-10 object-contain hover:scale-105 transition-transform" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" className="h-6 sm:h-8 object-contain hover:scale-105 transition-transform" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Accenture_logo.svg" alt="Accenture" className="h-6 sm:h-8 object-contain hover:scale-105 transition-transform mt-1" />
          </div>
        </div>
      </div>
    </section>
  );
}
