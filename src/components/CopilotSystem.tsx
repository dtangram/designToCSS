import React from "react";
import { Sparkles, RefreshCw, Send } from "lucide-react";
import { useDesign } from "../hooks/useDesign";

const CopilotSystem = () => {
  const {
    chatHistory,
    refining,
    chatInput,
    setChatInput,
    sendRefinementPrompt,
    chatBottomRef
  } = useDesign();

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col min-h-[300px] shrink-0" aria-label="Design Co-pilot System">
      <header className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
        <span className="flex items-center gap-2">
          <figure className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg m-0 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </figure>
          <span className="flex flex-col">
            <h4 className="text-xs font-bold text-slate-700">Refine Generated Design with Copilot</h4>
            <p className="text-[10px] text-slate-400">Describe visual or spacing adjustments and watch code update</p>
          </span>
        </span>
      </header>

      {/* Message Logs */}
      <section className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-3 overflow-y-auto flex flex-col gap-3 min-h-[160px] max-h-[220px]" aria-label="Conversation logs">
        {chatHistory.map((m, idx) => (
          <article 
            key={idx} 
            className={`p-2.5 rounded-lg text-xs leading-relaxed max-w-[85%] ${
              m.role === "user" 
                ? "bg-indigo-600 text-white self-end rounded-br-none" 
                : "bg-white border border-slate-200 text-slate-700 self-start rounded-bl-none shadow-3xs"
            }`}
            aria-label={m.role === "user" ? "Your prompt" : "Copilot suggested code revision"}
          >
            <p className="whitespace-pre-wrap">{m.content}</p>
            <time className={`text-[9px] font-medium block mt-1 ${m.role === "user" ? "text-indigo-200 text-right" : "text-slate-400"}`}>
              {m.timestamp}
            </time>
          </article>
        ))}
        {refining && (
          <aside className="bg-white border border-slate-200 text-slate-700 self-start rounded-lg rounded-bl-none p-2.5 text-xs flex items-center gap-2 max-w-[85%] shadow-3xs" aria-live="polite">
            <RefreshCw className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
            <span>Applying requested updates and generating revised code...</span>
          </aside>
        )}
        <span ref={chatBottomRef} className="block h-0" aria-hidden="true" />
      </section>

      {/* Action input bar */}
      <form onSubmit={sendRefinementPrompt} className="flex items-center gap-2 mt-3">
        <label htmlFor="refinement-input" className="sr-only">Describe visual adjustments</label>
        <input
          type="text"
          id="refinement-input"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          disabled={refining}
          placeholder="e.g., Make the background grid spacing twice as large or replace the primary color..."
          className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
        <button
          type="submit"
          disabled={refining || !chatInput.trim()}
          className="p-2 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 text-white disabled:text-slate-400 border border-indigo-700/10 shadow-sm transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="Send refinement instruction"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </section>
  );
}

export default CopilotSystem;
