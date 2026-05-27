import React from "react";
import Header from "./Header";
import PresetSelector from "./PresetSelector";
import FileUploader from "./FileUploader";
import TuningPanel from "./TuningPanel";
import Workspace from "./Workspace";

const MainContent = () => {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-900">
      
      {/* Header Panel */}
      <Header />

      {/* Main Grid Wrapper */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-y-auto">
        
        {/* Left Hand Column: Mockup Upload and Tuning panel (5 cols) */}
        <section className="lg:col-span-5 border-r border-slate-200 bg-slate-50/50 p-6 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-73px)]">
          
          {/* Section Heading */}
          <header className="flex flex-col justify-start">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md w-fit">STEP 1: DESIGN SELECTION</span>
            <h2 className="text-lg font-bold text-slate-800 mt-1.5">Acquire Source Layout Design</h2>
            <p className="text-xs text-slate-500 mt-0.5">Choose an asset below or upload an image to identify visual-to-utility rules</p>
          </header>

          <PresetSelector />

          <FileUploader />

          <TuningPanel />

        </section>

        {/* Right Hand Column: Workspace view & Iteration logs (7 cols) */}
        <section className="col-span-1 lg:col-span-7 flex flex-col min-h-full max-h-[calc(100vh-73px)] overflow-hidden">
          <Workspace />
        </section>

      </main>

    </section>
  );
}

export default MainContent;
