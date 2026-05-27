import React from "react";
import { PRESETS } from "../presets";
import { useDesign } from "../hooks/useDesign";

const PresetSelector = () => {
  const { selectedPreset, handleSelectPreset } = useDesign();

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs" aria-label="Interactive design presets">
      <h3 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
        <span className="p-1 bg-amber-50 text-amber-600 rounded">✨</span>
        Interactive Design Presets (Click any to test)
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 list-none m-0 p-0" role="group" aria-label="Preset options">
        {PRESETS.map((p) => (
          <li key={p.id} className="list-none m-0 p-0">
            <button
              type="button"
              onClick={() => handleSelectPreset(p)}
              aria-pressed={selectedPreset === p.id}
              className={`w-full flex flex-col text-left p-3 rounded-lg border text-xs transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                selectedPreset === p.id
                  ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/55"
              }`}
            >
              <span className="font-bold text-slate-800 truncate">{p.name}</span>
              <span className="text-[10px] text-slate-500 mt-1 leading-normal line-clamp-2">{p.description}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PresetSelector;
