import React from 'react';
import NeuralField from './NeuralField';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] md:min-h-screen w-full overflow-hidden">
      {/* Left-aligned monochrome 3D background with embedded logo */}
      <div className="absolute inset-0">
        <NeuralField className="absolute inset-0 w-full h-full" density={1400} stroke alignLeft />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-white/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-36 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 xl:gap-16">
          {/* Reserve space for the left 3D visual */}
          <div className="md:col-span-5" />

          {/* Right column: editorial, modern app hero */}
          <div className="md:col-span-7">
            <div className="text-xs tracking-widest uppercase text-white/80 mb-6">Local • Open • Private</div>
            <h1 className="font-serif text-white text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight">
              GlotBrowser — Your Local AI Browser
            </h1>
            <p className="max-w-xl text-white/90 text-base md:text-lg leading-relaxed mt-4">
              AI automation for any browser. Runs locally. Fully Open Source.
            </p>
            <div className="flex items-center gap-6 mt-8">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
