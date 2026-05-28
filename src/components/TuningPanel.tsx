import React from "react";
import { Sliders, FileCode, RefreshCw, Sparkles } from "lucide-react";
import { useDesign } from "../hooks/useDesign";

const TuningPanel = () => {
  const {
    componentType,
    setComponentType,
    darkModeEnabled,
    setDarkModeEnabled,
    colorPaletteLimit,
    setColorPaletteLimit,
    activeTab,
    setActiveTab,
    analyzing,
    analysisProgress,
    error,
    imageData,
    svgContent,
    triggerVisualMapping,
    analysisResult
  } = useDesign();

  return (
    <section className="flex flex-col gap-6" aria-label="Fine-tuning controls">
      {/* Step 2: Fine-Tuning Panel */}
      <fieldset className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col gap-4 border-slate-200">
        <legend className="float-left text-xs font-bold text-slate-700 select-none">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md">STEP 2: RENDER RULES</span>
          <h3 className="text-sm font-bold text-slate-800 mt-1">Configuration Preferences</h3>
        </legend>

        <section className="grid grid-cols-2 gap-3.5 pt-1">
          
          {/* Target Outline Shape */}
          <span className="col-span-1 flex flex-col">
            <label htmlFor="component-vibe-select" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Component Vibe</label>
            <select
              id="component-vibe-select"
              value={componentType}
              onChange={(e) => setComponentType(e.target.value)}
              className="w-full text-xs font-bold p-2 border border-slate-200 rounded-lg bg-slate-50/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-hidden"
            >
              <option value="Card Widget">Compact Card</option>
              <option value="Pricing Matrix">Pricing Grid</option>
              <option value="Interactive Header">Header Section</option>
              <option value="Signup Form">Input Form</option>
              <option value="Landing Hero Module">Hero Layout</option>
              <option value="Statistics Board">Bento Metrics</option>
            </select>
          </span>

          {/* Palette Limit Preset */}
          <span className="col-span-1 flex flex-col">
            <label htmlFor="color-palette-select" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Color Palette Mode</label>
            <select
              id="color-palette-select"
              value={colorPaletteLimit}
              onChange={(e) => setColorPaletteLimit(e.target.value)}
              className="w-full text-xs font-bold p-2 border border-slate-200 rounded-lg bg-slate-50/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-hidden"
            >
              <option value="Auto-detect">Auto Match</option>
              <option value="Strictly Minimalist">Strict Minimalist Scale</option>
              <option value="Brand Focused Palette">Brand Colors Focus</option>
              <option value="Ultra Vibrant Accent">Vibrant Primary Accent</option>
            </select>
          </span>

          {/* Dark mode auto config */}
          <span className="col-span-2 border-t border-slate-100 pt-3 flex items-center justify-between">
            <span className="flex flex-col">
              <h4 className="text-xs font-bold text-slate-700">Auto Dark-Mode Utilities</h4>
              <p className="text-[10px] text-slate-400 font-medium">Inject native dark:... class pairings securely</p>
            </span>
            <button
              type="button"
              id="dark-mode-utilities-toggle"
              onClick={() => setDarkModeEnabled(!darkModeEnabled)}
              className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-505 focus:outline-hidden ${
                darkModeEnabled ? "bg-indigo-600" : "bg-slate-200"
              }`}
              aria-label="Toggle auto dark-mode utilities"
              aria-checked={darkModeEnabled}
              role="switch"
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  darkModeEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </span>

        </section>

        {/* Style Mapping Outputs - Three identical same-line buttons */}
        <section className="border-t border-slate-100 pt-3 flex flex-col gap-2">
          <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Style Mapping Outputs</span>
          <div className="grid grid-cols-3 gap-2 w-full">
            <button
              type="button"
              onClick={() => {
                setActiveTab("sass");
                if (!analysisResult) {
                  triggerVisualMapping("sass");
                }
              }}
              disabled={analyzing || (!imageData && !svgContent)}
              className={`py-3 px-2 rounded-xl text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-hidden border border-cyan-700/10 ${
                activeTab === "sass"
                  ? "bg-cyan-700 shadow-inner scale-[0.98] border-b-2 border-cyan-800 font-extrabold"
                  : "bg-cyan-600 hover:bg-cyan-700 shadow-md shadow-cyan-600/10"
              } disabled:bg-slate-200 disabled:text-slate-400 disabled:border-slate-300 disabled:shadow-none`}
              title={analysisResult ? "View SASS Code" : "Analyze and map style to SASS"}
              aria-label="Generate or view SASS"
            >
              {analyzing && activeTab === "sass" ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
              ) : (
                <Sliders className="w-3.5 h-3.5 text-cyan-200 shrink-0" />
              )}
              <span className="truncate">SASS/SCSS</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("html");
                if (!analysisResult) {
                  triggerVisualMapping("tailwind");
                }
              }}
              disabled={analyzing || (!imageData && !svgContent)}
              className={`py-3 px-2 rounded-xl text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-hidden border border-cyan-700/10 ${
                activeTab === "html"
                  ? "bg-cyan-700 shadow-inner scale-[0.98] border-b-2 border-cyan-800 font-extrabold"
                  : "bg-cyan-600 hover:bg-cyan-700 shadow-md shadow-cyan-600/10"
              } disabled:bg-slate-200 disabled:text-slate-400 disabled:border-slate-300 disabled:shadow-none`}
              title={analysisResult ? "View Tailwind HTML" : "Analyze and map style to Tailwind"}
              aria-label="Generate or view Tailwind"
            >
              {analyzing && activeTab === "html" ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
              ) : (
                <FileCode className="w-3.5 h-3.5 text-cyan-200 shrink-0" />
              )}
              <span className="truncate">Tailwind</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("css3");
                if (!analysisResult) {
                  triggerVisualMapping("css");
                }
              }}
              disabled={analyzing || (!imageData && !svgContent)}
              className={`py-3 px-2 rounded-xl text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-hidden border border-cyan-700/10 ${
                activeTab === "css3"
                  ? "bg-cyan-700 shadow-inner scale-[0.98] border-b-2 border-cyan-800 font-extrabold"
                  : "bg-cyan-600 hover:bg-cyan-700 shadow-md shadow-cyan-600/10"
              } disabled:bg-slate-200 disabled:text-slate-400 disabled:border-slate-300 disabled:shadow-none`}
              title={analysisResult ? "View CSS3 Code" : "Analyze and map style to CSS3"}
              aria-label="Generate or view CSS3"
            >
              {analyzing && activeTab === "css3" ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-cyan-200 shrink-0" />
              )}
              <span className="truncate">CSS3</span>
            </button>
          </div>
        </section>
      </fieldset>

      {/* Staged Load Screen */}
      {analyzing && (
        <aside className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3 shadow-2xs animate-pulse" aria-live="polite">
          <RefreshCw className="w-5 h-5 text-indigo-600 animate-spin shrink-0 mt-0.5" />
          <span className="flex flex-col">
            <h4 className="text-xs font-bold text-indigo-900">Deconstructing Design Spec</h4>
            <p className="text-[11px] text-indigo-600/80 font-medium leading-normal mt-0.5">{analysisProgress}</p>
          </span>
        </aside>
      )}

      {/* Error Banner */}
      {error && (
        <aside className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3" role="alert">
          <span className="p-1 px-2 bg-red-100 text-red-700 text-xs font-bold rounded-lg shrink-0">FAIL</span>
          <span className="flex flex-col">
            <h4 className="text-xs font-bold text-red-900">{error.message}</h4>
            <p className="text-[10px] text-red-600 leading-relaxed mt-0.5">{error.detail}</p>
          </span>
        </aside>
      )}
    </section>
  );
}

export default TuningPanel;
