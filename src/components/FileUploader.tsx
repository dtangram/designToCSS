import React from "react";
import { Upload, Trash2, FileText } from "lucide-react";
import { useDesign } from "../hooks/useDesign";

const FileUploader = () => {
  const {
    imageData,
    imageFile,
    selectedPreset,
    svgTextInput,
    dragActive,
    fileInputRef,
    handleDrag,
    handleDrop,
    handleFileChange,
    handleSvgTextInputChange,
    handleClearUpload,
  } = useDesign();

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex-1 flex flex-col gap-4" aria-label="Mockup file upload manager">
      <h3 className="text-xs font-bold text-slate-700 flex items-center justify-between">
        <span>Or Upload Mockup File / SVG Markup</span>
        {imageData && (
          <button 
            type="button"
            onClick={handleClearUpload}
            className="text-red-500 hover:text-red-600 font-medium text-[10px] flex items-center gap-1 border border-red-100 hover:border-red-200 bg-red-50/50 px-2 py-0.5 rounded-lg transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <Trash2 className="w-3 h-3" /> Clear Source
          </button>
        )}
      </h3>

      {/* Drag & Drop Visual Box - Using semantic LABEL around hidden input */}
      <label
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all cursor-pointer min-h-[170px] relative focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-1 focus-within:outline-hidden ${
          dragActive ? "border-indigo-600 bg-indigo-50/20" : "border-slate-200 hover:border-slate-300"
        } ${imageData ? "cursor-default bg-slate-50/40 p-2" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          id="mockup-file-input"
          accept="image/*,.svg"
          onChange={handleFileChange}
          className="sr-only" /* Completely hides visual input but keeps it fully operable & accessible */
          aria-label="Upload visual screen layout file"
        />

        {imageData ? (
          <figure className="w-full flex flex-col items-center gap-2 m-0 p-0">
            <picture className="relative max-h-[180px] w-full overflow-hidden rounded-lg bg-white border border-slate-100 flex items-center justify-center p-2">
              <img
                src={imageData.preview}
                alt="Selected mockup visual preview panel"
                referrerPolicy="no-referrer"
                className="max-h-[150px] object-contain rounded"
              />
            </picture>
            <figcaption className="flex items-center justify-between w-full px-2 mt-1">
              <span className="flex items-center gap-1.5 truncate">
                <FileText className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-semibold text-slate-700 truncate">
                  {imageFile ? imageFile.name : selectedPreset ? "Interactive Preset SVG" : "Injected SVG Model"}
                </span>
              </span>
              {imageFile && (
                <span className="text-[10px] text-slate-400 font-mono font-bold">
                  {(imageFile.size / 1024).toFixed(1)} KB
                </span>
              )}
            </figcaption>
          </figure>
        ) : (
          <span className="text-center p-4 block select-none">
            <span className="mx-auto w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-2">
              <Upload className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-slate-700 block">Drag & drop visual mockup, or <span className="text-indigo-600 underline">browse files</span></span>
            <span className="text-[10px] text-slate-400 mt-1 block leading-normal max-w-xs mx-auto">Supports screenshot PNGs, JPEGs, SVG drawings, or pasted vector tags</span>
          </span>
        )}
      </label>

      {/* Raw XML Input Toggle */}
      <section className="border-t border-slate-100 pt-3">
        <label htmlFor="svg-raw-input" className="block text-xs font-bold text-slate-600 mb-1">
          Paste Raw SVG XML Code (Direct Input)
        </label>
        <textarea
          id="svg-raw-input"
          value={svgTextInput}
          onChange={handleSvgTextInputChange}
          placeholder="<svg xmlns='http://www.w3.org/2000/svg' ...>"
          className="w-full h-16 p-2 text-[11px] font-mono border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50"
        />
      </section>
    </section>
  );
}

export default FileUploader;
