import React from 'react';
import { motion } from 'motion/react';

export function VideoSection() {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center mb-10">
          <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold text-[#111111] mb-6 tracking-tight">
            See PyHire in Action
          </h2>
          <p className="text-[1.125rem] text-[#4B5563] max-w-2xl mx-auto">
            Watch how our intelligent platform transforms your recruitment process from start to finish.
          </p>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
        >
          {/*
            Encoded to this box rather than shipped as authored. The section is
            capped at max-w-5xl (1024px), so the 1920x1080 master is re-encoded
            at 1080p — still ~1.9x the display width, so it stays sharp on
            retina — with a bitrate tuned for flat animation. That lands under
            the 720p file it replaced, adding resolution without adding weight.

            `poster` matters because `preload="metadata"` fetches no frames:
            without it this box renders as an empty well until the visitor
            presses play. `width`/`height` give it an aspect ratio to reserve,
            so the surrounding copy does not shift as the video loads.
          */}
          <video
            className="block w-full h-auto"
            src="/pyhire-website-video.mp4"
            poster="/pyhire-website-video-poster.jpg"
            controls
            playsInline
            preload="metadata"
            width={1920}
            height={1080}
            aria-label="See PyHire in Action"
          />
        </motion.div>
      </div>
    </section>
  );
}
