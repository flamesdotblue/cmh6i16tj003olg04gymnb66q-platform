import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NeuralField from './NeuralField';

export default function Hero() {
  // Scroll-driven hero: tall container with sticky viewport content
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  // Background parallax and scale for the NeuralField canvas
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.6]);

  // Text motion: enter from offset-left, then gently rise
  const h1X = useTransform(scrollYProgress, [0, 0.4, 1], ['-6%', '0%', '0%']);
  const h1Y = useTransform(scrollYProgress, [0, 1], ['8px', '-6px']);
  const subY = useTransform(scrollYProgress, [0, 1], ['12px', '-4px']);
  const ctaY = useTransform(scrollYProgress, [0, 1], ['14px', '0px']);
  const asideOpacity = useTransform(scrollYProgress, [0, 1], [0.0, 1.0]);

  return (
    <section id="top" ref={containerRef} className="relative w-full min-h-[180vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Monochrome animated particle sphere background */}
        <motion.div style={{ scale: bgScale, rotateZ: bgRotate }} className="absolute inset-0">
          <NeuralField className="absolute inset-0 w-full h-full" density={1500} stroke={true} />
        </motion.div>

        {/* Editorial grid overlay (monochrome lines, parallax) */}
        <motion.div
          aria-hidden
          style={{ translateY: gridY }}
          className="pointer-events-none absolute inset-0 opacity-20"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 120px)',
              backgroundSize: '120px 100%',
            }}
          />
        </motion.div>

        {/* Vignette for contrast control */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 35%, rgba(255,255,255,0.75) 100%)', opacity: vignetteOpacity }}
        />

        {/* Content Layout */}
        <div className="relative z-10 mx-auto max-w-6xl h-full px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
            {/* Left: Headline + sub + CTA - aligned like a modern app hero */}
            <div className="md:col-span-7 flex items-center">
              <div className="w-full">
                {/* Micro label */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
                  className="text-xs tracking-widest uppercase text-white/80 mb-6"
                >
                  Local • Open • Private
                </motion.div>

                {/* Headline */}
                <motion.h1
                  style={{ x: h1X, y: h1Y }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="font-serif text-white text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight"
                >
                  GlotBrowser — Your Local AI Browser
                </motion.h1>

                {/* Subheading */}
                <motion.p
                  style={{ y: subY }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: 0.08 }}
                  className="max-w-xl text-white/90 text-base md:text-lg leading-relaxed mt-4"
                >
                  AI automation for any browser. Runs locally. Fully Open Source.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  style={{ y: ctaY }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, ease: 'easeOut', delay: 0.12 }}
                  className="flex items-center gap-6 mt-8"
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
            </div>

            {/* Right: Minimal app-style info rail with scrolling animation */}
            <div className="md:col-span-5 relative">
              <motion.aside
                style={{ opacity: asideOpacity }}
                className="hidden md:flex absolute right-0 top-24 bottom-24 w-[1px] bg-white/20"
              >
                {/* Progress Node */}
                <motion.div
                  style={{ translateY: useTransform(scrollYProgress, [0, 1], ['0%', '75%']) }}
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white"
                />
              </motion.aside>

              <div className="hidden md:flex h-full items-end justify-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
                  className="bg-white/5 backdrop-blur px-5 py-4 border border-white/20 text-white text-sm max-w-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="opacity-80">Platforms</span>
                    <span>Windows · Mac · Linux</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="opacity-80">Mode</span>
                    <span>Local-first</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="pointer-events-none absolute left-6 right-6 bottom-6 flex items-center justify-between text-white/70 text-xs"
          >
            <div className="hidden md:block">Scroll</div>
            <div className="flex-1 mx-4 h-px bg-white/30" />
            <div className="">Features ↓</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
