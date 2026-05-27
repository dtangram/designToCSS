import React from "react";
import { Sliders, ChevronRight } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
      <section className="flex items-center gap-3">
        <figure className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-600/15 flex items-center justify-center m-0">
          <Sliders className="w-5 h-5 stroke-[2.25]" />
        </figure>
        <hgroup className="flex flex-col gap-0.5">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Design to <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">CSS Code Mapper</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Visual UI design mockup analyser & automated component generator</p>
        </hgroup>
      </section>

      <aside className="flex items-center gap-3 text-xs">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-mono font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          GEMINI ENGINE COMPLIANT
        </span>
        <a 
          href="https://ai.studio/build" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Google AI Studio Build Home (opens in a new tab)"
          className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-indigo-505 focus-visible:ring-2 focus-visible:ring-indigo-500 text-slate-600 rounded-lg transition-colors font-medium flex items-center gap-1 shadow-2xs"
        >
          Studio Home
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </aside>
    </header>
  );
}

export default Header;
