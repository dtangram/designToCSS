import React, { createContext, useState, useRef, useEffect, ReactNode } from "react";
import { PRESETS } from "../presets";
import { AnalysisResponse, IterationMessage, PresetItem } from "../types";

export interface DesignContextType {
  selectedPreset: string;
  setSelectedPreset: (val: string) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  imageData: { base64: string; mimeType: string; preview: string } | null;
  setImageData: (data: { base64: string; mimeType: string; preview: string } | null) => void;
  svgContent: string;
  setSvgContent: (val: string) => void;
  svgTextInput: string;
  setSvgTextInput: (val: string) => void;
  dragActive: boolean;
  setDragActive: (val: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  componentType: string;
  setComponentType: (val: string) => void;
  darkModeEnabled: boolean;
  setDarkModeEnabled: (val: boolean) => void;
  colorPaletteLimit: string;
  setColorPaletteLimit: (val: string) => void;
  activeTab: "preview" | "html" | "react" | "sass" | "css3" | "mappings";
  setActiveTab: (val: "preview" | "html" | "react" | "sass" | "css3" | "mappings") => void;
  previewDarkMode: boolean;
  setPreviewDarkMode: (val: boolean) => void;
  analyzing: boolean;
  setAnalyzing: (val: boolean) => void;
  analysisProgress: string;
  setAnalysisProgress: (val: string) => void;
  error: { message: string; detail?: string } | null;
  setError: (val: { message: string; detail?: string } | null) => void;
  analysisResult: AnalysisResponse | null;
  setAnalysisResult: (val: AnalysisResponse | null) => void;
  copiedText: string | null;
  setCopiedText: (val: string | null) => void;
  chatInput: string;
  setChatInput: (val: string) => void;
  chatHistory: IterationMessage[];
  setChatHistory: (val: IterationMessage[]) => void;
  refining: boolean;
  setRefining: (val: boolean) => void;
  chatBottomRef: React.RefObject<HTMLDivElement | null>;
  handleCopy: (text: string) => void;
  handleDownload: (content: string, filename: string, mimeType: string) => void;
  handleSelectPreset: (preset: PresetItem) => void;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  processFile: (file: File) => void;
  handleSvgTextInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleClearUpload: () => void;
  triggerVisualMapping: (format?: "css" | "sass" | "tailwind") => Promise<void>;
  sendRefinementPrompt: (e: React.FormEvent) => Promise<void>;
  getIframeSource: () => string;
}

export const DesignContext = createContext<DesignContextType | undefined>(undefined);

interface DesignProviderProps {
  children: ReactNode;
}

const DesignProvider = ({ children }: DesignProviderProps) => {
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<{
    base64: string;
    mimeType: string;
    preview: string;
  } | null>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [svgTextInput, setSvgTextInput] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [componentType, setComponentType] = useState<string>("Card Widget");
  const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(true);
  const [colorPaletteLimit, setColorPaletteLimit] = useState<string>("Auto-detect");

  const [activeTab, setActiveTab] = useState<"preview" | "html" | "react" | "sass" | "css3" | "mappings">("preview");
  const [previewDarkMode, setPreviewDarkMode] = useState<boolean>(false);
  
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<string>("");
  const [error, setError] = useState<{ message: string; detail?: string } | null>(null);

  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const [chatInput, setChatInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<IterationMessage[]>([]);
  const [refining, setRefining] = useState<boolean>(false);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, refining]);

  useEffect(() => {
    handleSelectPreset(PRESETS[0]);
  }, []);

  // Track rendering preferences and input source updates to clear out stale mappings
  useEffect(() => {
    setAnalysisResult(null);
  }, [imageData?.preview, svgContent, componentType, darkModeEnabled, colorPaletteLimit]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleDownload = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSelectPreset = (preset: PresetItem) => {
    setSelectedPreset(preset.id);
    setImageFile(null);
    setSvgTextInput("");
    
    const base64Svg = btoa(unescape(encodeURIComponent(preset.svgContent)));
    setImageData({
      base64: "", 
      mimeType: "image/svg+xml",
      preview: `data:image/svg+xml;base64,${base64Svg}`
    });
    setSvgContent(preset.svgContent);
    setError(null);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setSelectedPreset("");
    setImageFile(file);
    setError(null);

    const reader = new FileReader();

    if (file.type === "image/svg+xml") {
      const textReader = new FileReader();
      textReader.onload = (e) => {
        const rawSvg = e.target?.result as string;
        setSvgContent(rawSvg);
        setSvgTextInput(rawSvg);
      };
      textReader.readAsText(file);
    } else {
      setSvgContent("");
      setSvgTextInput("");
    }

    reader.onload = () => {
      const base64Str = (reader.result as string).split(",")[1];
      setImageData({
        base64: base64Str,
        mimeType: file.type,
        preview: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSvgTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setSvgTextInput(val);
    setSelectedPreset("");
    setImageFile(null);
    
    if (val.trim()) {
      setSvgContent(val);
      const base64Svg = btoa(unescape(encodeURIComponent(val)));
      setImageData({
        base64: "",
        mimeType: "image/svg+xml",
        preview: `data:image/svg+xml;base64,${base64Svg}`
      });
    } else {
      setSvgContent("");
      setImageData(null);
    }
  };

  const handleClearUpload = () => {
    setImageFile(null);
    setImageData(null);
    setSvgContent("");
    setSvgTextInput("");
    setSelectedPreset("");
    setError(null);
  };

  const triggerVisualMapping = async (format?: "css" | "sass" | "tailwind") => {
    if (!imageData && !svgContent) {
      setError({
        message: "Source Element Required",
        detail: "Please upload a screenshot mockup or select a preset layout to parse."
      });
      return;
    }

    setAnalyzing(true);
    setError(null);
    setAnalysisResult(null);
    
    setAnalysisProgress("Uploading source layout blueprint...");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setAnalysisProgress("Parsing geometric structure & element layers...");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setAnalysisProgress("Extracting typography metrics & color schemas...");
    await new Promise((resolve) => setTimeout(resolve, 800));

    let progressMessage = "Generating robust Tailwind CSS components...";
    if (format === "css") {
      progressMessage = "Generating robust CSS...";
    } else if (format === "sass") {
      progressMessage = "Generating robust SASS...";
    }
    setAnalysisProgress(progressMessage);

    try {
      const payload = {
        image: imageData?.base64 || null,
        mimeType: imageData?.mimeType || null,
        svgContent: svgContent || null,
        componentType,
        darkModeEnabled,
        colorPaletteLimit
      };

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.message || `Server responded with status ${response.status}`);
      }

      const result: AnalysisResponse = await response.json();
      setAnalysisResult(result);
      
      setChatHistory([
        {
          role: "assistant",
          content: "🎨 Welcome to your design iteration workspace! I've completed the initial Visual-to-Utility analysis of your mockup. Check out the generated preview, code formats, and visual configuration breakdown tabs on the right. \n\nYou can refine these outputs directly by typing instructions in the chat box below (e.g. *'make all card padding twice as wide'*, *'add a subtle hover scaling effect to the action items'* or *'change the style of the main action button'*).",
          timestamp: new Date().toLocaleTimeString(),
          generatedCode: {
            htmlTailwind: result.htmlTailwind,
            reactTailwind: result.reactTailwind,
            vueTailwind: result.vueTailwind,
            sassCode: result.sassCode,
            css3Code: result.css3Code
          }
        }
      ]);
      setActiveTab("preview");
    } catch (err: any) {
      console.error(err);
      setError({
        message: "Visual Analysis Failed",
        detail: err.message || "An issue occurred querying the design engine. Check process status."
      });
    } finally {
      setAnalyzing(false);
      setAnalysisProgress("");
    }
  };

  const sendRefinementPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !analysisResult) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setRefining(true);

    const updatedHistory: IterationMessage[] = [
      ...chatHistory,
      {
        role: "user",
        content: userMessage,
        timestamp: new Date().toLocaleTimeString()
      }
    ];

    setChatHistory(updatedHistory);

    try {
      const payload = {
        history: updatedHistory.map(h => ({ role: h.role, content: h.content })),
        instruction: userMessage,
        currentCode: {
          htmlTailwind: analysisResult.htmlTailwind,
          reactTailwind: analysisResult.reactTailwind,
          vueTailwind: analysisResult.vueTailwind,
          sassCode: analysisResult.sassCode,
          css3Code: analysisResult.css3Code
        },
        darkModeEnabled,
        componentType
      };

      const response = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Refinement parsing error. Check configuration.");
      }

      const refinedResult: AnalysisResponse = await response.json();
      
      setAnalysisResult(refinedResult);

      setChatHistory([
        ...updatedHistory,
        {
          role: "assistant",
          content: `⚡ I've refined the design structure based on your instruction: "${userMessage}".\n\nI updated the spacing margins and revised the HTML markup, React component, SASS/SCSS styles, and CSS3 outputs. See the changes in real-time!`,
          timestamp: new Date().toLocaleTimeString(),
          generatedCode: {
            htmlTailwind: refinedResult.htmlTailwind,
            reactTailwind: refinedResult.reactTailwind,
            vueTailwind: refinedResult.vueTailwind,
            sassCode: refinedResult.sassCode,
            css3Code: refinedResult.css3Code
          }
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setChatHistory([
        ...updatedHistory,
        {
          role: "assistant",
          content: `⚠️ Refinement mapping failed: ${err.message || 'An unexpected error occurred.'}`,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setRefining(false);
    }
  };

  const getIframeSource = () => {
    if (!analysisResult) return "";
    
    return `
      <!DOCTYPE html>
      <html class="${previewDarkMode ? 'dark' : ''}">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
          <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
          <style>
            body { 
              font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
              margin: 0;
              padding: 2rem;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background-color: var(--bg-color);
              transition: background-color 0.2s ease, color 0.2s ease;
            }
            html {
              --bg-color: #f8fafc;
            }
            html.dark {
              --bg-color: #0f172a;
            }
          </style>
        </head>
        <body class="text-slate-900 dark:text-slate-100">
          <div class="w-full h-full flex items-center justify-center">
            ${analysisResult.htmlTailwind}
          </div>
        </body>
      </html>
    `;
  };

  return (
    <DesignContext.Provider
      value={{
        selectedPreset,
        setSelectedPreset,
        imageFile,
        setImageFile,
        imageData,
        setImageData,
        svgContent,
        setSvgContent,
        svgTextInput,
        setSvgTextInput,
        dragActive,
        setDragActive,
        fileInputRef,
        componentType,
        setComponentType,
        darkModeEnabled,
        setDarkModeEnabled,
        colorPaletteLimit,
        setColorPaletteLimit,
        activeTab,
        setActiveTab,
        previewDarkMode,
        setPreviewDarkMode,
        analyzing,
        setAnalyzing,
        analysisProgress,
        setAnalysisProgress,
        error,
        setError,
        analysisResult,
        setAnalysisResult,
        copiedText,
        setCopiedText,
        chatInput,
        setChatInput,
        chatHistory,
        setChatHistory,
        refining,
        setRefining,
        chatBottomRef,
        handleCopy,
        handleDownload,
        handleSelectPreset,
        handleDrag,
        handleDrop,
        handleFileChange,
        processFile,
        handleSvgTextInputChange,
        handleClearUpload,
        triggerVisualMapping,
        sendRefinementPrompt,
        getIframeSource
      }}
    >
      {children}
    </DesignContext.Provider>
  );
}

export default DesignProvider;
