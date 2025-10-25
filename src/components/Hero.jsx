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

  // Background transforms (gentler on mobile)
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, isMobile ? 1.05 : 1.1, isMobile ? 1.08 : 1.18]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 3 : 7]);

  // Text micro-motions
  const h1Y = useTransform(scrollYProgress, [0, 1], ['10px', '-4px']);
  const subY = useTransform(scrollYProgress, [0, 1], ['12px', '-2px']);
  const ctaY = useTransform(scrollYProgress, [0, 1], ['14px', '0px']);

  // App bar appears in phase 2
  const appBarOpacity = useTransform(scrollYProgress, [0.55, 0.68, 1], [0, 1, 1]);
  const appBarScale = useTransform(scrollYProgress, [0.55, 1], [1.05, 0.92]);
  const appBarY = useTransform(scrollYProgress, [0.55, 1], ['10px', '0px']);

  // Teaser in phase 2
  const teaserOpacity = useTransform(scrollYProgress, [0.52, 0.65, 1], [0, 1, 1]);
  const teaserY = useTransform(scrollYProgress, [0.52, 1], ['24px', '0px']);

  // White panel handoff from bottom to top after ~60%
  const panelHeight = useTransform(scrollYProgress, [0.6, 1], ['0%', '100%']);

  return (
    <section id="top" ref={containerRef} className="relative w-full min-h-[240vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Left-aligned 3D background */}
        <motion.div style={{ scale: bgScale, rotateZ: bgRotate }} className="absolute inset-0 z-0">
          <NeuralField className="absolute inset-0 w-full h-full" density={isMobile ? 900 : 1500} stroke={!isMobile} alignLeft />
        </motion.div>

        {/* Main grid content */}
        <div className="relative z-10 mx-auto max-w-6xl h-full px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 xl:gap-16 h-full">
            {/* Reserve left visual space for field */}
            <div className="md:col-span-5" />

            {/* Right-side hero copy */}
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
                  style={{ y: h1Y }}
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

          {/* App bar in phase 2 */}
          <motion.div
            style={{ opacity: appBarOpacity, scale: appBarScale, y: appBarY }}
            className="pointer-events-none absolute top-20 left-6 md:left-8 text-white"
          >
            <div className="font-serif text-xl md:text-2xl leading-none">GlotBrowser</div>
            <div className="text-[11px] md:text-xs tracking-wider uppercase opacity-80">Local • Open • Private</div>
          </motion.div>

          {/* Feature teaser inside hero */}
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

        {/* White panel handoff: rises from bottom, sits above background but below content */}
        <motion.div
          aria-hidden
          className="absolute left-0 right-0 bottom-0 bg-white z-[5] pointer-events-none"
          style={{ height: panelHeight }}
        />
      </div>
    </section>
  );
}
