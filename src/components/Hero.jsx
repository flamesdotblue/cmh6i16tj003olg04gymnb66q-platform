import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] md:min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EQgEIs2r5cMbWroZ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-white/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-36 pb-24 flex flex-col gap-10">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-serif text-white text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight"
        >
          GlotBrowser — Your Local AI Browser
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          className="max-w-2xl text-white/90 text-base md:text-lg leading-relaxed"
        >
          AI automation for any browser. Runs locally. Fully Open Source.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
          className="flex items-center gap-6"
        >
          <a
            href="#download"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-black border border-white font-semibold tracking-tight hover:opacity-90 transition"
          >
            Download GlotBrowser
          </a>
          <a
            href="https://github.com/qryp-ai"
            target="_blank"
            rel="noreferrer"
            className="text-white underline underline-offset-4 decoration-1 hover:opacity-80"
          >
            View on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
