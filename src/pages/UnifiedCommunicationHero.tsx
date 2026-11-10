import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { DEMO_PATH, QUOTE_PATH } from '../lib/routes';
import { Bell, MessageCircle, Phone, Mail, Send, Calendar, Mic, CalendarDays } from 'lucide-react';

export function UnifiedCommunicationHero() {
  return (
    <section className="relative w-full bg-[#fdfdfd] pt-12 pb-12 lg:pt-10 lg:pb-8 overflow-hidden flex justify-center">
      
      {/* Background Shapes */}
      <div className="absolute top-1/2 -left-20 w-40 h-40 bg-violet-500 rounded-full opacity-90 -translate-y-1/2 hidden lg:block"></div>
      <div className="absolute bottom-20 left-40 w-6 h-6 bg-green-400 rounded-full hidden lg:block"></div>
      <div className="absolute -bottom-20 right-[-100px] w-80 h-80 bg-violet-600 rounded-full hidden lg:block"></div>
      
      {/* Decorative Dots */}
      <div className="absolute bottom-[20%] left-[8%] w-3 h-3 bg-green-400 rounded-full hidden lg:block"></div>
      <div className="absolute bottom-16 left-16 hidden lg:grid grid-cols-4 gap-2 opacity-50">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-violet-300 rounded-full"></div>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-8">
        
        {/* Left Content */}
        <div className="w-full lg:w-5/12 z-10 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[3.5rem] lg:text-[4.5rem] font-bold text-[#111111] leading-[1.1] tracking-tight mb-6"
          >
            Unified<br/>Communication
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[1.125rem] text-[#4B5563] mb-6 leading-relaxed max-w-md"
          >
            Connect with candidates and clients across multiple channels from one platform. Faster conversations. Better engagement. Stronger relationships.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Link to={DEMO_PATH} className="inline-flex items-center justify-center px-8 py-4 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full font-bold text-[16px] transition-all shadow-[0_4px_14px_rgb(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgb(249,115,22,0.4)] hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2">
              Book a Demo
            </Link>
            <Link to={QUOTE_PATH} className="inline-flex items-center justify-center px-4 py-4 text-[#6D28D9] font-bold text-[16px] transition-colors hover:text-[#5B21B6] underline underline-offset-8 decoration-2 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded-full">
              Get Free Quote
            </Link>
          </motion.div>
        </div>

        {/* Right Content - Visual Collage */}
        <div className="w-full lg:w-7/12 relative h-[600px] hidden lg:block">
          
          {/* Background Dotted Circles */}
          <div className="absolute top-[30px] left-[20px] w-[500px] h-[500px] rounded-full border-[3px] border-dotted border-violet-200/60 z-0"></div>
          <div className="absolute top-[80px] left-[70px] w-[400px] h-[400px] rounded-full border-[3px] border-dotted border-purple-200/60 z-0"></div>

          {/* Squircle 1: Notifications */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-[40px] left-[70px] w-[130px] h-[130px] bg-violet-600 rounded-[40px] flex flex-col items-center justify-center text-white shadow-xl z-10"
          >
            <Bell className="w-9 h-9 mb-2" fill="currentColor" />
            <span className="font-bold text-[12px]">Notifications</span>
          </motion.div>

          {/* Squircle 2: SMS */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute top-[30px] left-[220px] w-[140px] h-[140px] bg-amber-400 rounded-[45px] flex flex-col items-center justify-center text-white shadow-xl z-10"
          >
            <MessageCircle className="w-10 h-10 mb-2" fill="currentColor" />
            <span className="font-bold text-[13px]">SMS</span>
          </motion.div>

          {/* Squircle 3: Calls */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute top-[40px] left-[380px] w-[130px] h-[130px] bg-[#6D28D9] rounded-[40px] flex flex-col items-center justify-center text-white shadow-xl z-10"
          >
            <Phone className="w-9 h-9 mb-2" fill="currentColor" />
            <span className="font-bold text-[12px]">Calls</span>
          </motion.div>

          {/* Squircle 4: Email */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute top-[190px] left-[30px] w-[140px] h-[140px] bg-[#5B21B6] rounded-[45px] flex flex-col items-center justify-center text-white shadow-xl z-10"
          >
            <Mail className="w-10 h-10 mb-2" fill="currentColor" />
            <span className="font-bold text-[13px]">Email</span>
          </motion.div>

          {/* Squircle 5: WhatsApp */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute top-[350px] left-[40px] w-[140px] h-[140px] bg-[#22c55e] rounded-[45px] flex flex-col items-center justify-center text-white shadow-xl z-10"
          >
            <div className="mb-2">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
            </div>
            <span className="font-bold text-[13px]">WhatsApp</span>
          </motion.div>

          {/* Squircle 6: Social Media */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute top-[370px] left-[200px] w-[140px] h-[140px] bg-[#06b6d4] rounded-[45px] flex flex-col items-center justify-center text-white shadow-xl z-10"
          >
            <Send className="w-10 h-10 mb-2" fill="currentColor" />
            <span className="font-bold text-[13px]">Social Media</span>
          </motion.div>

          {/* Large Card: Photo */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="absolute top-[210px] left-[360px] w-[210px] h-[280px] bg-violet-600 rounded-[50px] overflow-hidden shadow-2xl z-10 border-[6px] border-white"
          >
             <img src="/recruiter-portrait.jpg" alt="Recruiter" className="w-full h-full object-cover" width={600} height={849} />
          </motion.div>

          {/* Floating Card: Book a Meeting */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="absolute top-[160px] left-[180px] w-[280px] bg-white rounded-3xl p-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] z-30 flex items-center gap-4"
          >
             <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600">
                <CalendarDays className="w-6 h-6" />
             </div>
             <div>
                <h3 className="font-bold text-[15px] text-[#111111] mb-1">Book a Meeting</h3>
                <div className="flex items-center gap-2 text-[13px] text-slate-500 font-medium">
                   <span className="text-violet-600">07 Mon</span>
                   <div className="w-0.5 h-3 bg-slate-300"></div>
                   <span>11:30 AM</span>
                </div>
             </div>
          </motion.div>

          {/* Floating Squircle: Voice */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="absolute top-[260px] left-[180px] w-[110px] h-[110px] bg-white rounded-[32px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] z-20 flex flex-col items-center justify-center gap-2"
          >
             <Mic className="w-8 h-8 text-violet-600" />
             <span className="font-bold text-[12px] text-slate-700">Voice</span>
          </motion.div>
          
        </div>

        {/* Mobile Visual Fallback */}
        <div className="w-full relative h-[400px] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-white lg:hidden mt-8">
          <img src="/unified-communication-team.webp" alt="Unified Communication" className="w-full h-full object-cover" />
        </div>

      </div>
    </section>
  );
}
