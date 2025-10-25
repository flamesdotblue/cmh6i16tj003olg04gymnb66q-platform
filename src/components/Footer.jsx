import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <nav className="flex items-center gap-8 text-sm">
            <a href="https://github.com/qryp-ai" target="_blank" rel="noreferrer" className="hover:underline underline-offset-4 decoration-1">GitHub</a>
            <a href="#" className="hover:underline underline-offset-4 decoration-1">Privacy</a>
            <a href="#" className="hover:underline underline-offset-4 decoration-1">Contact</a>
          </nav>
          <div className="text-xs text-white/70">© 2025 qryp.ai.</div>
        </div>
      </div>
    </footer>
  );
}
