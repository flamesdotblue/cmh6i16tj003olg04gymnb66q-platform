import React from 'react';
import { motion } from 'framer-motion';

const featureItems = [
  { num: '01', title: 'Local-first, privacy-friendly', body: 'Your data stays on your machine. No clouds, no leaks.' },
  { num: '02', title: 'Open Source, transparent', body: 'Inspect, fork, and improve. No black boxes.' },
  { num: '03', title: 'Works with any browser', body: 'Automate Chrome, Firefox, Safari — your choice.' },
  { num: '04', title: 'AI-powered automation', body: 'Scripts that understand pages and act with intent.' },
];

export default function Sections() {
  return (
    <div>
      {/* Features */}
      <section id="features" className="bg-white text-black">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">Features</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {featureItems.map((f, i) => (
              <motion.article
                key={f.num}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-start gap-6"
              >
                <div className="shrink-0 font-mono text-sm md:text-base tracking-widest">{f.num}</div>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl leading-snug">{f.title}</h3>
                  <p className="mt-2 text-sm md:text-base text-black/70 max-w-md">{f.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* About / Philosophy */}
      <section id="about" className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
          <div className="md:max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">About</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/90">
              GlotBrowser is built by qryp.ai with a mission to bring AI automation to browsing — without sacrificing privacy or control. Designed to be minimal, efficient, and fully open source.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="download" className="bg-white text-black border-t border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="md:max-w-2xl">
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight">Download GlotBrowser</h2>
              <p className="mt-4 text-black/70">Available for Windows / Mac / Linux.</p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white border border-black font-semibold tracking-tight hover:opacity-90 transition"
              >
                Download Now
              </a>
              <a
                href="https://github.com/qryp-ai"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-1 hover:opacity-70"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
