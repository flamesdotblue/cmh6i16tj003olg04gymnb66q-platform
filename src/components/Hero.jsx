import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NeuralField from './NeuralField';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener ? mq.addEventListener('change', set) : mq.addListener(set);
    return () => { mq.removeEventListener ? mq.removeEventListener('change', set) : mq.removeListener(set); };
  }, []);

  // Phase 1 -> Phase 2
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, isMobile ? 1.05 : 1.1, isMobile ? 1.08 : 1.2]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 4 : 8]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.55]);

  // Left-align the content more strongly and nudge on scroll
  const h1X = useTransform(scrollYProgress, [0, 0.35, 1], ['-6%', '0%', '0%']);
  const h1Y = useTransform(scrollYProgress, [0, 1], ['10px', '-4px']);
  const subY = useTransform(scrollYProgress, [0, 1], ['12px', '-2px']);
  const ctaY = useTransform(scrollYProgress, [0, 1], ['14px', '0px']);

  // App bar compression in phase 2
  const appBarOpacity = useTransform(scrollYProgress, [0.55, 0.68, 1], [0, 1, 1]);
  const appBarScale = useTransform(scrollYProgress, [0.55, 1], [1.05, 0.9]);
  const appBarY = useTransform(scrollYProgress, [0.55, 1], ['10px', '0px']);

  // Feature teaser rises in phase 2
  const teaserOpacity = useTransform(scrollYProgress, [0.52, 0.65, 1], [0, 1, 1]);
  const teaserY = useTransform(scrollYProgress, [0.52, 1], ['24px', '0px']);

  // White mask handoff to reveal Features below after ~60%
  const maskProgress = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const maskClipTop = useTransform(maskProgress, (p) => `${(1 - p) * 100}%`);
  const heroBgOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

  return (
    <section id="top" ref={containerRef} className="relative w-full min-h-[260vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Background: shifted to the left side, not centered */}
        <motion.div style={{ scale: bgScale, rotateZ: bgRotate, opacity: heroBgOpacity }} className="absolute inset-0">
          <NeuralField className="absolute inset-0 w-full h-full" density={isMobile ? 900 : 1500} stroke={!isMobile} alignLeft />
        </motion.div>

        {/* Subtle vignette for contrast */}
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 35%, rgba(255,255,255,0.75) 100%)', opacity: vignetteOpacity }} />

        {/* Main content grid */}
        <div className="relative z-10 mx-auto max-w-6xl h-full px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 xl:gap-16 h-full">
            {/* Left column reserved for 3D visual spacing */}
            <div className="md:col-span-5" />

            {/* Right column: headline and CTAs arranged like a modern app hero */}
            <div className="md:col-span-7 flex items-center">
              <div className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
                  className="text-xs tracking-widest uppercase text-white/80 mb-6"
                >
                  Local • Open • Private
                </motion.div>

                <motion.h1
                  style={{ x: h1X, y: h1Y }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="font-serif text-white text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight"
                >
                  GlotBrowser — Your Local AI Browser
                </motion.h1>

                <motion.p
                  style={{ y: subY }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: 0.08 }}
                  className="max-w-xl text-white/90 text-base md:text-lg leading-relaxed mt-4"
                >
                  AI automation for any browser. Runs locally. Fully Open Source.
                </motion.p>

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
          </div>

          {/* Compressed app bar in phase 2 */}
          <motion.div
            style={{ opacity: appBarOpacity, scale: appBarScale, y: appBarY }}
            className="pointer-events-none absolute top-20 left-6 md:left-8 text-white"
          >
            <div className="font-serif text-xl md:text-2xl leading-none">GlotBrowser</div>
            <div className="text-[11px] md:text-xs tracking-wider uppercase opacity-80">Local • Open • Private</div>
          </motion.div>

          {/* Feature teaser rising in phase 2 (still part of the hero) */}
          <motion.div style={{ opacity: teaserOpacity, y: teaserY }} className="absolute left-0 right-0 bottom-24">
            <div className="mx-auto max-w-6xl px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-white">
                  <div className="font-mono text-xs tracking-widest opacity-70 mb-2">01</div>
                  <div className="font-serif text-2xl leading-snug">Local-first, privacy-friendly</div>
                  <div className="text-white/80 text-sm mt-2 max-w-md">Your data stays on your machine. No clouds, no leaks.</div>
                </div>
                <div className="text-white">
                  <div className="font-mono text-xs tracking-widest opacity-70 mb-2">02</div>
                  <div className="font-serif text-2xl leading-snug">Open Source, transparent</div>
                  <div className="text-white/80 text-sm mt-2 max-w-md">Inspect, fork, and improve. No black boxes.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* White mask handoff revealing the Features section below */}
        <motion.div
          aria-hidden
          className="absolute inset-0 z-[5] bg-white"
          style={{ clipPath: maskClipTop }}
        />
      </div>
    </section>
  );
}
