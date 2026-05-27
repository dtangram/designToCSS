import React from "react";
import { 
  Eye, 
  Box, 
  Code2, 
  Sliders, 
  FileCode, 
  LayoutGrid, 
  Check, 
  Copy, 
  Download, 
  Sun, 
  Moon, 
  CheckCircle2 
} from "lucide-react";
import { useDesign } from "../hooks/useDesign";
import CopilotSystem from "./CopilotSystem";

const Workspace = () => {
  const {
    activeTab,
    setActiveTab,
    previewDarkMode,
    setPreviewDarkMode,
    analysisResult,
    copiedText,
    handleCopy,
    handleDownload,
    getIframeSource
  } = useDesign();

  if (!analysisResult) {
    return (
      <section className="flex-1 flex flex-col items-center justify-center p-10 bg-slate-50 text-slate-400" aria-label="Canvas workspace offline state">
        <picture className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200/60 flex items-center justify-center mb-4 text-slate-300">
          <Box className="w-8 h-8 stroke-[1.5]" />
        </picture>
        <h3 className="text-sm font-bold text-slate-700">Canvas Workspace Offline</h3>
        <p className="text-xs text-slate-400 text-center max-w-sm mt-1 leading-normal">
          Upload a visual screenshot mockup, load a sample SVG drawing preset, or configure settings and click "Map Visuals to Tailwind" to activate.
        </p>

        {/* Instant guide card */}
        <aside className="bg-white border border-slate-200/80 rounded-xl p-4 max-w-sm mt-6 shadow-3xs text-left" aria-label="Design acceleration guidelines">
          <h4 className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase mb-1 flex items-center gap-1">
            <span className="p-0.5 bg-indigo-50 text-indigo-600 rounded">💡</span>
            Design Acceleration Tip
          </h4>
          <p className="text-[10px] text-slate-500 leading-normal mb-2">
            Already have a wireframe or component SVG markup from Figma, Penpot, or your workspace?
          </p>
          <ul className="flex flex-col gap-1.5 list-none m-0 p-0" role="list">
            <li className="flex items-center gap-1.5 text-[10px] text-slate-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Paste raw SVG tags directly in the editor below Step 1</span>
            </li>
            <li className="flex items-center gap-1.5 text-[10px] text-slate-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Check 'Auto Dark-Mode Utilities' for dark support</span>
            </li>
            <li className="flex items-center gap-1.5 text-[10px] text-slate-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Click analyze to retrieve visual-to-utility mappings</span>
            </li>
          </ul>
        </aside>
      </section>
    );
  }

  return (
    <section className="flex-1 flex flex-col min-h-0" aria-label="Interactive workspace container">
      
      {/* Tab Navigation bar - clean workspace tabs using semantic <nav> */}
      <nav className="bg-white border-b border-slate-200 px-6 py-2 flex flex-wrap items-center justify-between gap-4 shrink-0 shadow-3xs" aria-label="Workspace tabs navigation">
        <menu className="flex flex-wrap items-center gap-1 list-none m-0 p-0" role="tablist">
          <li className="list-none m-0 p-0" role="presentation">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "preview"}
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-hidden ${
                activeTab === "preview"
                  ? "bg-slate-100 text-slate-800"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Live Preview
            </button>
          </li>
          <li className="list-none m-0 p-0" role="presentation">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "css3"}
              onClick={() => setActiveTab("css3")}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-hidden ${
                activeTab === "css3"
                  ? "bg-slate-100 text-slate-800"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Box className="w-3.5 h-3.5" /> CSS3 Component
            </button>
          </li>
          <li className="list-none m-0 p-0" role="presentation">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "react"}
              onClick={() => setActiveTab("react")}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-hidden ${
                activeTab === "react"
                  ? "bg-slate-100 text-slate-800"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" /> React Component
            </button>
          </li>
          <li className="list-none m-0 p-0" role="presentation">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "sass"}
              onClick={() => setActiveTab("sass")}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-hidden ${
                activeTab === "sass"
                  ? "bg-slate-100 text-slate-800"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-pink-500" /> SASS / SCSS
            </button>
          </li>
          <li className="list-none m-0 p-0" role="presentation">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "html"}
              onClick={() => setActiveTab("html")}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-hidden ${
                activeTab === "html"
                  ? "bg-slate-100 text-slate-800"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-500" /> Tailwind HTML
            </button>
          </li>
          <li className="list-none m-0 p-0" role="presentation">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "mappings"}
              onClick={() => setActiveTab("mappings")}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-hidden ${
                activeTab === "mappings"
                  ? "bg-slate-100 text-slate-800"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Utility Mappings
            </button>
          </li>
        </menu>

        {/* Direct Action Export buttons stored in list menu */}
        <menu className="flex items-center gap-2 list-none m-0 p-0" aria-label="Code exports and shares">
          <li className="list-none m-0 p-0">
            <button
              type="button"
              onClick={() => {
                let copyTarget = "";
                if (activeTab === "react") copyTarget = analysisResult.reactTailwind;
                else if (activeTab === "sass") copyTarget = analysisResult.sassCode || "";
                else if (activeTab === "css3") copyTarget = analysisResult.css3Code || "";
                else if (activeTab === "mappings") copyTarget = JSON.stringify(analysisResult, null, 2);
                else copyTarget = analysisResult.htmlTailwind;
                handleCopy(copyTarget);
              }}
              className="p-1 px-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-[11px] font-bold border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-hidden"
              aria-label="Copy active panel code to clipboard"
            >
              {copiedText && (
                copiedText === analysisResult.htmlTailwind ||
                copiedText === analysisResult.reactTailwind ||
                copiedText === analysisResult.sassCode ||
                copiedText === analysisResult.css3Code ||
                copiedText === JSON.stringify(analysisResult, null, 2)
              ) ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </>
              )}
            </button>
          </li>

          <li className="list-none m-0 p-0">
            <button
              type="button"
              onClick={() => {
                if (activeTab === "react") {
                  handleDownload(analysisResult.reactTailwind, "GeneratedComponent.tsx", "text/javascript");
                } else if (activeTab === "sass") {
                  handleDownload(analysisResult.sassCode || "", "theme-styles.scss", "text/x-scss");
                } else if (activeTab === "css3") {
                  handleDownload(analysisResult.css3Code || "", "alternative-css3.html", "text/html");
                } else if (activeTab === "mappings") {
                  handleDownload(JSON.stringify(analysisResult, null, 2), "mappings-schema.json", "application/json");
                } else {
                  handleDownload(analysisResult.htmlTailwind, "component.html", "text/html");
                }
              }}
              className="p-1 px-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[11px] font-bold border border-indigo-150 transition-colors flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-hidden"
              aria-label="Download generated code module file"
            >
              <Download className="w-3.5 h-3.5" /> Export Module
            </button>
          </li>
        </menu>
      </nav>

      {/* Main Workspace Frame container using semantic <article> layout */}
      <section className="flex-1 bg-slate-100 p-4 min-h-0 overflow-y-auto flex flex-col gap-4" aria-label="Visual editor panel">
        
        {/* 1. Live Interactive Preview Tab */}
        {activeTab === "preview" && (
          <section className="flex-1 flex flex-col min-h-[300px] border border-slate-200 bg-white rounded-xl overflow-hidden shadow-sm" aria-label="Interactive live preview render">
            {/* Header Controls for Preview (Light/Dark Toggle render) */}
            <header className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2">
              <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                Render Playground Mode
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-bold">Render Canvas Scale:</span>
                <button
                  type="button"
                  onClick={() => setPreviewDarkMode(false)}
                  className={`p-1 px-2.5 rounded-md font-bold transition-all flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-hidden ${
                    !previewDarkMode ? "bg-white text-indigo-700 shadow-3xs" : "text-slate-500 hover:text-slate-700"
                  }`}
                  aria-label="Set light render theme background"
                >
                  <Sun className="w-3 h-3 text-amber-500" /> Light Background
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDarkMode(true)}
                  className={`p-1 px-2.5 rounded-md font-bold transition-all flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-hidden ${
                    previewDarkMode ? "bg-indigo-650 text-white shadow-3xs bg-slate-850" : "text-slate-500 hover:text-slate-700"
                  }`}
                  aria-label="Set dark render theme background"
                >
                  <Moon className="w-3 h-3 text-indigo-300" /> Dark Render
                </button>
              </span>
            </header>

            {/* Preview Iframe block wrapped in a semantic figure */}
            <figure className="flex-1 relative min-h-0 bg-slate-50 m-0">
              <iframe
                srcDoc={getIframeSource()}
                title="Live visual prototype render"
                className="w-full h-full border-0"
                sandbox="allow-scripts"
              />
            </figure>
          </section>
        )}

        {/* 2. Raw HTML Output Tab */}
        {activeTab === "html" && (
          <figure className="flex-1 flex flex-col bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-800 min-h-[300px] m-0">
            <figcaption className="px-4 py-2 bg-slate-850 border-b border-slate-800 text-[10px] font-mono font-bold text-slate-400 flex items-center justify-between">
              <span>HTML-TAILWIND-COMPLIANT.html</span>
              <span className="text-emerald-500 flex items-center gap-1">🟢 Self-contained layout block</span>
            </figcaption>
            <pre className="flex-1 p-4 text-[11px] font-mono text-slate-300 overflow-auto select-all selection:bg-indigo-600/40 leading-normal max-h-[480px]">
              <code>{analysisResult.htmlTailwind}</code>
            </pre>
          </figure>
        )}

        {/* 3. React Export Tab */}
        {activeTab === "react" && (
          <figure className="flex-1 flex flex-col bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-800 min-h-[300px] m-0">
            <figcaption className="px-4 py-2 bg-slate-850 border-b border-slate-800 text-[10px] font-mono font-bold text-slate-400 flex items-center justify-between">
              <span>GeneratedComponent.tsx</span>
              <span className="text-indigo-400 flex items-center gap-1">⚛️ Lucide & standard Hook state setup</span>
            </figcaption>
            <pre className="flex-1 p-4 text-[11px] font-mono text-slate-300 overflow-auto select-all selection:bg-indigo-600/40 leading-normal max-h-[480px]">
              <code>{analysisResult.reactTailwind}</code>
            </pre>
          </figure>
        )}

        {/* SASS / SCSS Tab */}
        {activeTab === "sass" && (
          <figure className="flex-1 flex flex-col bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-800 min-h-[300px] m-0">
            <figcaption className="px-4 py-2 bg-slate-850 border-b border-slate-800 text-[10px] font-mono font-bold text-slate-400 flex items-center justify-between">
              <span>theme-styles.scss</span>
              <span className="text-pink-400 flex items-center gap-1">💅 SASS Custom variables with nested selector structures</span>
            </figcaption>
            <pre className="flex-1 p-4 text-[11px] font-mono text-slate-300 overflow-auto select-all selection:bg-indigo-600/40 leading-normal max-h-[480px]">
              <code>{analysisResult.sassCode || "No SASS stylesheet generated. Re-map the visualization layout first."}</code>
            </pre>
          </figure>
        )}

        {/* CSS3 Alternative Component Tab */}
        {activeTab === "css3" && (
          <figure className="flex-1 flex flex-col bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-800 min-h-[300px] m-0">
            <figcaption className="px-4 py-2 bg-slate-850 border-b border-slate-800 text-[10px] font-mono font-bold text-slate-400 flex items-center justify-between">
              <span>alternative-css3.html</span>
              <span className="text-cyan-400 flex items-center gap-1">🌐 Standard HTML5 + CSS Variables layout (No utility class library)</span>
            </figcaption>
            <pre className="flex-1 p-4 text-[11px] font-mono text-slate-300 overflow-auto select-all selection:bg-indigo-600/40 leading-normal max-h-[480px]">
              <code>{analysisResult.css3Code || "No standard CSS3 markup compiled. Re-map the visualization layout first."}</code>
            </pre>
          </figure>
        )}

        {/* 4. Utility breakdown tab */}
        {activeTab === "mappings" && (
          <section className="flex-1 flex flex-col gap-4 min-h-[350px]" aria-label="Detailed design utility mappings">
            
            {/* Color Swatches Breakdown Grid */}
            <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs" aria-label="Extracted color mappings">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2 select-none">
                <span className="w-1.5 h-3.5 rounded-sm bg-indigo-600"></span>
                Extracted Color Swatches & Predicted Tailwind Values
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none m-0 p-0" role="list">
                {analysisResult.colors.map((c, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-100 rounded-lg hover:border-slate-200 transition-colors list-none m-0">
                    <span 
                      className="w-10 h-10 rounded-lg shrink-0 border border-slate-200 block shadow-3xs" 
                      style={{ backgroundColor: c.hex }} 
                    />
                    <span className="flex-1 min-w-0 flex flex-col">
                      <span className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-800 truncate">{c.label}</span>
                        <span className="text-[10px] text-slate-400 font-mono font-semibold">{c.hex}</span>
                      </span>
                      <p className="text-[11px] text-slate-500 font-semibold mt-0.5 leading-normal truncate font-mono text-indigo-700 bg-indigo-50/40 px-1.5 py-0.5 rounded-md inline-block">
                        {c.tailwind}
                      </p>
                      <p className="text-[10px] text-slate-400 leading-normal mt-0.5 line-clamp-1">{c.usage}</p>
                    </span>
                    <button 
                      type="button"
                      onClick={() => handleCopy(c.hex)}
                      className="p-1 text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 rounded-md bg-transparent cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-hidden"
                      title="Copy Hex"
                      aria-label={`Copy color ${c.hex}`}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Spacing Layout Model */}
            <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs" aria-label="Extracted spacing and layout mappings">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2 select-none">
                <span className="w-1.5 h-3.5 rounded-sm bg-emerald-600"></span>
                Spacings & Container Proportions Map
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 list-none m-0 p-0" role="list">
                {analysisResult.spacing.map((s, idx) => (
                  <li key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex flex-col justify-between list-none m-0">
                    <span className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">{s.concept}</span>
                      <span className="text-xs font-mono font-bold text-slate-800 bg-slate-200/60 px-2 py-0.5 rounded-md mt-1.5 inline-block w-fit">{s.tailwind}</span>
                    </span>
                    <p className="text-[10px] text-slate-500 leading-normal mt-2">{s.description}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Typography Mapping */}
            <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs" aria-label="Typography elements mappings">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2 select-none">
                <span className="w-1.5 h-3.5 rounded-sm bg-amber-600"></span>
                Typography Element Proportions
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none m-0 p-0" role="list">
                {analysisResult.typography.map((t, idx) => (
                  <li key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex gap-3.5 list-none m-0">
                    <span className="p-1 px-1.5 bg-amber-100 text-amber-700 rounded-md font-mono text-lg font-bold h-fit select-none shrink-0" aria-hidden="true">T</span>
                    <span className="flex-1 min-w-0 flex flex-col">
                      <span className="flex items-center justify-between gap-1.5">
                        <span className="text-xs font-bold text-slate-800 truncate">{t.element}</span>
                        <span className="text-[9px] text-slate-400 font-bold bg-slate-200/80 px-1.5 py-0.5 rounded-full uppercase tracking-wider">{t.fontVibe}</span>
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-amber-700 mt-1 block max-h-12 overflow-y-auto leading-normal">{t.tailwind}</span>
                      <p className="text-[10px] text-slate-400 leading-normal mt-1">{t.details}</p>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Layout Design Statement summary */}
            <aside className="bg-gradient-to-r from-slate-800 to-slate-950 text-slate-100 rounded-xl p-4">
              <h4 className="text-xs font-bold tracking-wide uppercase text-slate-400 mb-1.5 select-none">Evaluated Design Statement</h4>
              <p className="text-xs leading-relaxed text-slate-200 font-medium">{analysisResult.layoutStructure}</p>
            </aside>

          </section>
        )}

        {/* Iterative Refinement Copilot System */}
        <CopilotSystem />

      </section>

    </section>
  );
}

export default Workspace;
