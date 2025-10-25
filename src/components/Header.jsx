import React, { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const base = 'fixed top-0 left-0 right-0 z-40 transition-colors duration-300';
  const bg = scrolled ? 'bg-white/95 backdrop-blur border-b border-black/10' : 'bg-transparent';
  const text = scrolled ? 'text-black' : 'text-white';

  return (
    <header className={[base, bg, text].join(' ')}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#top" className="font-serif text-xl tracking-tight select-none">
            <span className="font-black">Glot</span>Browser
          </a>
          <nav className="flex items-center gap-8 text-sm">
            <a href="#features" className="hover:underline underline-offset-4 decoration-1">Features</a>
            <a href="#about" className="hover:underline underline-offset-4 decoration-1">About</a>
            <a
              href="https://github.com/qryp-ai"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 decoration-1 hover:opacity-70"
            >
              GitHub
            </a>
            <a href="#download" className="hover:underline underline-offset-4 decoration-1">Download</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
