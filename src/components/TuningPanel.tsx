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

          {/* Alternate format quick toggles */}
          <span className="col-span-2 border-t border-slate-100 pt-3">
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Alternate Style Mapping Outputs</span>
            <span className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("sass");
                  if (!analysisResult) {
                    triggerVisualMapping();
                  }
                }}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:outline-hidden ${
                  activeTab === "sass"
                    ? "bg-pink-50 border-pink-200 text-pink-700 shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
                title={analysisResult ? "View compiled SASS Variables & Rules" : "Analyze and map style directly to SASS format"}
                aria-label="View or generate SASS output"
              >
                <Sliders className="w-3.5 h-3.5 text-pink-500" /> SASS / SCSS
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("html");
                  if (!analysisResult) {
                    triggerVisualMapping();
                  }
                }}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-550 focus-visible:outline-hidden ${
                  activeTab === "html"
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
                title={analysisResult ? "View compiled Tailwind HTML code" : "Analyze and map style directly to Tailwind format"}
                aria-label="View or generate Tailwind HTML output"
              >
                <FileCode className="w-3.5 h-3.5 text-indigo-500" /> Tailwind HTML
              </button>
            </span>
          </span>

        </section>

        {/* Execute Button */}
        <button
          type="button"
          onClick={triggerVisualMapping}
          disabled={analyzing || (!imageData && !svgContent)}
          className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-200 disabled:text-slate-400 border border-cyan-700/10 shadow-md shadow-cyan-600/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-hidden"
          aria-label={analyzing ? "Analyzing designer layers and elements" : "Convert imported design model to clean CSS3 components"}
        >
          {analyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Analyzing CSS3 Layout...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Map Design to CSS3
            </>
          )}
        </button>
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
