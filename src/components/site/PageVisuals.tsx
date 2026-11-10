import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLoops } from './PageParts';

/**
 * Animated hero illustration for the Partners page (the About page's is AboutVisual.tsx).
 * Decorative (aria-hidden); every label restates the page's own copy from the
 * PyHire website content document. Brand names in the partner preview are
 * illustrative.
 */

export function useCycle(length: number, ms: number) {
  const loops = useLoops();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!loops) return;
    const id = setInterval(() => setI((n) => (n + 1) % length), ms);
    return () => clearInterval(id);
  }, [length, ms, loops]);
  return { i, loops };
}

export function PartnerVisual() {
  const brands = [
    { name: 'YourCo Hire', color: '#6D28D9', initial: 'Y' },
    { name: 'TalentWorks', color: '#0f766e', initial: 'T' },
    { name: 'HireDesk', color: '#4f46e5', initial: 'H' },
  ];
  const { i } = useCycle(brands.length, 2200);
  const brand = brands[i];
  return (
    <div aria-hidden="true" className="w-[380px] max-w-full rounded-[28px] bg-white border border-black/5 p-6 shadow-[0_24px_60px_-24px_rgba(17,17,17,0.3)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={brand.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3"
        >
          <span className="w-11 h-11 rounded-xl text-white font-display font-bold text-[20px] flex items-center justify-center" style={{ backgroundColor: brand.color }}>
            {brand.initial}
          </span>
          <span className="font-display font-bold text-[1.3rem] text-[#1B1650]">{brand.name}</span>
        </motion.div>
      </AnimatePresence>
      <div className="mt-6 space-y-3">
        <div className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 flex items-center text-[13px] text-slate-400">Work email</div>
        <div className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 flex items-center text-[13px] text-slate-400">Password</div>
        <motion.div
          className="h-11 rounded-xl text-white text-[14px] font-semibold flex items-center justify-center"
          animate={{ backgroundColor: brand.color }}
          transition={{ duration: 0.5 }}
        >
          Sign in
        </motion.div>
      </div>
      <p className="mt-4 text-center text-[12px] text-slate-500">Your product name, logo and colours</p>
    </div>
  );
}
