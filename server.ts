import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, GenerateContentResponse, Part, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Set up body parsers with limits for base64 image data
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Initialize the shared Google Gen AI client with a mandatory custom User-Agent header for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Prompt schema for the response mapping
const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    colors: {
      type: Type.ARRAY,
      description: "Visual-to-utility color mapping matching source colors to predicted Tailwind classes",
      items: {
        type: Type.OBJECT,
        properties: {
          hex: { type: Type.STRING, description: "Hex value of the aesthetic color node found" },
          tailwind: { type: Type.STRING, description: "Direct Tailwind utility class matching this color, e.g. bg-sky-500, border-slate-200" },
          usage: { type: Type.STRING, description: "Role/usage of this color in the elements, e.g., Primary Accent, Page Gradient Backing, Base Text Color" },
          label: { type: Type.STRING, description: "Name of the element, e.g., Accent blue, Midnight text" }
        },
        required: ["hex", "tailwind", "usage", "label"]
      }
    },
    spacing: {
      type: Type.ARRAY,
      description: "Analysis of spacing nodes (padding, margins, gap sizes, grid intervals) and their Tailwind mappings",
      items: {
        type: Type.OBJECT,
        properties: {
          concept: { type: Type.STRING, description: "Aesthetic spacing category, e.g., Hero Grid Column Spacing, Button Inner Margins" },
          tailwind: { type: Type.STRING, description: "The specific Tailwind class structure including responsive variants, e.g., px-4 py-2 sm:px-6, gap-6 md:gap-8" },
          description: { type: Type.STRING, description: "How spacing is structured to create balance and breathing room in the canvas" }
        },
        required: ["concept", "tailwind", "description"]
      }
    },
    typography: {
      type: Type.ARRAY,
      description: "Mapping of lettering, weights, text sizes, tracking, and leading properties to custom or standard Tailwind scales",
      items: {
        type: Type.OBJECT,
        properties: {
          element: { type: Type.STRING, description: "The typography cluster element name, e.g. Main Statement Display Word, Small Disclaimer Label" },
          tailwind: { type: Type.STRING, description: "Exact matching Tailwind tags, e.g., text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight" },
          details: { type: Type.STRING, description: "Detected style indicators like heavy, serif, slim tracking" },
          fontVibe: { type: Type.STRING, description: "The feeling matches, e.g. Editorial, Brutalist, Technical Mono, Corporate Swiss" }
        },
        required: ["element", "tailwind", "details", "fontVibe"]
      }
    },
    layoutStructure: {
      type: Type.STRING,
      description: "Detailed evaluation of structural layers (e.g. 3-column flex rows, bento style CSS grids, centered hero overlays)"
    },
    htmlTailwind: {
      type: Type.STRING,
      description: "Humble, beautiful, fully responsive HTML structure using pure Tailwind utility classes. Must be a self-contained div/element with meticulous attention to grid systems, custom buttons with hover states, gorgeous card borders, SVGs, and absolute visually-identical alignment."
    },
    reactTailwind: {
      type: Type.STRING,
      description: "A complete, premium interactive React functional component written in TypeScript (TSX). Use Lucide-react placeholders, clean react hooks (useState for interactive buttons, tabs, dropdowns or inputs if appropriate), styled purely with responsive Tailwind classes, and beautifully structured. Export default function."
    },
    sassCode: {
      type: Type.STRING,
      description: "A professional SASS/SCSS stylesheet adhering strictly to industry standards. Must use variables for colors/spacing, placeholders (e.g. %flex-center), custom mixins for media queries/flex layouts, '@extend', custom '@if' or 'if()' functions, transition animations/keyframes, and fully nested class-only selectors (NEVER using IDs) for optimal DRY styling."
    },
    css3Code: {
      type: Type.STRING,
      description: "A fully self-contained HTML document with an embedded style block containing native CSS3 variables (--primary, --font-size-base, etc.), responsive media queries, state transition animations/keyframes, clean class selectors only (No ID elements), and dry property rules."
    }
  },
  required: ["colors", "spacing", "typography", "layoutStructure", "htmlTailwind", "reactTailwind", "sassCode", "css3Code"]
};

const TIMEOUT_MS = 28_000;

const generateWithTimeout = (
  params: Parameters<typeof ai.models.generateContent>[0]
): Promise<GenerateContentResponse> => {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`Request timed out after ${TIMEOUT_MS / 1000}s`)), TIMEOUT_MS)
  );
  return Promise.race<GenerateContentResponse>([
    ai.models.generateContent(params),
    timeoutPromise
  ]);
};

// Main analyze route
app.post("/api/analyze", async (req, res) => {
  try {
    const { image, mimeType, svgContent, componentType, darkModeEnabled, colorPaletteLimit } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Missing API Key",
        message: "The server's GEMINI_API_KEY environment variable is not defined. Please configure it in your Secrets / Env panel."
      });
    }

    if (!image && !svgContent) {
      return res.status(400).json({
        error: "Validation Failed",
        message: "You must provide either an uploaded mockup image / screenshot or raw SVG string content."
      });
    }

    // Set up standard target instructions
    const systemPrompt = `You are an elite Visual UI Architect and Senior Front-End Developer. Your craft is providing visual-to-utility mappings that convert screenshots, design mockups, and SVGs into clean, high-fidelity, and fully responsive code using Tailwind CSS, as well as alternative options like SASS/SCSS and native CSS3.

Instructions:
1. Thoroughly map detected elements to modern typography scales (e.g. font-sans tracking-tight), spacing systems (paddings, margins, flexbox, CSS Grid), and modern color theory.
2. Formulate exceptionally clean, aesthetic, responsive utility groupings. Make layouts fluid using max widths (e.g., max-w-7xl, mx-auto) so they survive desktop-to-mobile context transitions perfectly using standard flexbox and CSS Grid combinations.
3. Automatically generate dark mode utilities natively ("dark:bg-slate-900", "dark:text-slate-100") on relevant elements if the dark mode toggle is enabled (Enabled check: ${darkModeEnabled ? "YES" : "NO"}). Even if false, implement high-contrast slate-neutral tones.
4. If an SVG text node is supplied, analyze its XML tags, groups, coordinates, colors, and design properties directly to build an exact code match.
5. Provide standard mock SVGs for icons directly embedded in the HTML using clean tags, and use proper imports or standard React SVG wrappers in the React block.
6. The HTML and React components should look visually premium, featuring gorgeous padding rhythm, micro-interactive feedback (hover transitions, active clicks), and beautiful spacing. For React components, make sure to add interactive functional state (e.g. tabs, input forms, disclosure menus, toggles, state hooks) so that users get a fully proto-typed visual model immediately.
7. For ALL outputs, strictly implement WCAG 2.2 Accessibility guidelines:
   - Ensure color combinations strictly pass at least WCAG 2.2 AAA or AA contrast levels (text colors have high contrast against background colors).
   - Use correct semantic HTML elements (like <main>, <section>, <article>, <header>, navbar <nav>, and proper heading hierarchies h1-h6).
   - Ensure interactive buttons have explicit type="button", and include helpful "aria-label" tags for screen readers.
   - For interactive elements, add highly visible keyboard keyboard focus feedback indicators (such as "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none" or clean :focus-visible rules in SASS/CSS3 styles).
8. Under "sassCode", compile a highly structured, valid SASS/SCSS module. You MUST thoroughly employ professional SASS industry features:
   - Declare explicit, semantic SASS variables (e.g. $primary, $transition-base) representing mock colors, spacing, and typography weights.
   - Use custom SASS mixins with parameters (e.g., dynamic spacing or responsive breakpoints) and placeholder classes (%card-hover, %flex-center) with '@extend' to maximize reusability and avoid duplicate code.
   - Use SASS conditional rules (like '@if' blocks or 'if()' function values) to dynamically apply properties based on dark mode states, sizes, or button emphasis levels.
   - Set up custom subtle state transitions, transforms, or keyframe animations (like @keyframes pulse-glow) on micro-interactive hover nodes.
   - Organize rules sequentially using nested sass elements and nested @media queries to preserve high readability and logical specificity.
   - Strictly use ONLY class name selectors (e.g. .ui-card, .btn-primary) to capture elements. You are FORBIDDEN from using any ID selectors (no '#id-tag' styling).
9. Under "css3Code", generate a complete, valid, self-contained HTML document with an embedded '<style>' block. You MUST adhere to maximum hand-crafted quality standards:
   - Instantiate native CSS custom property variables inside a global ':root' selector with robust defaults and explicit fallbacks using the 'var(--name, fallback)' pattern.
   - Write responsive layouts using fluid media query logic with precise class cascades matching spacing scales.
   - Implement premium animations using custom transitions or '@keyframes' to produce a modern visual flow.
   - Expressly structure layout elements with semantic classes and target them with class-only selectors, NEVER style using HTML element IDs. Do not include any Tailwind classes inside the styled markup.`;

    const userPromptText = `Please analyze this uploaded design. Here are the configuration options selected:
- Target component shape / type: ${componentType || "Auto-detect"}
- Target Dark Mode auto-generation: ${darkModeEnabled ? "Yes, include native dark:... utility classes on appropriate structural tags" : "No, stick to balanced high-contrast light theme pairings with slate accents"}
- Selected Color Palette Scheme: ${colorPaletteLimit || "Auto-match"}
    
Analyze its physical colors, hierarchy, gaps, and font elements.
Return a structured JSON output mapping these elements to Tailwind utilities. Provide standard HTML and React TSX copies that reflect high-fidelity, elegant, and fully functional implementations of this layout, and additionally generate both a structured SASS/SCSS stylesheet and a pure CSS3-only component with native variables.`;

    const contents: Part[] = [];

    // Bundle the base 64 image if uploaded
    if (image && mimeType) {
      contents.push({
        inlineData: {
          data: image,
          mimeType: mimeType
        }
      });
    }

    // Include the raw SVG string as a text payload block to guarantee 100% reading fidelity
    if (svgContent) {
      contents.push({
        text: `--- RAW VALUE SVG TARGET EXTRACT: ---\n${svgContent}\n----------------------`
      });
    }

    contents.push({ text: userPromptText });


const response = await generateWithTimeout({
  model: "gemini-2.5-flash",
  contents: contents,
  config: {
    systemInstruction: systemPrompt,
    responseMimeType: "application/json",
    responseSchema: analysisSchema
  }
});

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No generative response retrieved from Gemini.");
    }

    const payload = JSON.parse(responseText.trim());
    return res.json(payload);
  } catch (error: any) {
    console.error("Analysis api error:", error);
    return res.status(500).json({
      error: "Analysis Failed",
      message: error.message || "An unexpected error occurred during design parsing."
    });
  }
});

// Iterative code refinement API route
app.post("/api/refine", async (req, res) => {
  try {
    const { instruction, currentCode, darkModeEnabled, componentType } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Missing API Key",
        message: "Gemini API Key is not configured."
      });
    }

    const systemPrompt = `You are a visual design refiner. You take a current design generated from mockups, and apply descriptive user updates (e.g., "Add more padding to buttons", "Make the background gradient darker", "Convert this card into a three-column grid layout") while preserving the visual identity and aesthetic value of the original component.
    
Make sure to generate visual-to-utility mappings matching the refined code, and return a structured JSON output reflecting these visual updates across all format options: Tailwind HTML, React Component, SASS/SCSS, and CSS3 with variables. Please verify that dark-mode utilities are correctly applied to the revised tags if requested.

When updating the style formats, adhere strictly to these industry code standards:
1. WCAG 2.2 Accessibility:
   - Color contrast ratios must strictly pass WCAG AA/AAA level.
   - Use semantic tags such as <main>, <header>, <section>, headings h1-h6.
   - Attach explicit "aria-label", "aria-expanded", keyboard focused states such as outline focus rings.
2. SASS/SCSS files:
   - Always use SASS Variables ($name: value) for main colors, fonts, margins.
   - Use placeholding base rules (%name) with '@extend' and parameterized '@mixins' for responsive styles/flex/grid patterns.
   - Employ logical sass conditional control structures (using '@if' conditions or 'if()' valuations) to modify properties without duplicating stylesheet lines.
   - Use nested CSS styling rules structure with fluid, nested support for media queries and class inheritance.
   - Ensure you use ONLY clean class selectors. You are FORBIDDEN from using any ID selector targets (e.g. style elements via classes, never IDs).
   - Support seamless transition animations, transforms, or custom keyframe triggers.
3. Native CSS3 files:
   - Establish modern global custom properties (CSS variables) inside ':root' with fallbacks inside 'var(--color, default)'.
   - Build fluid media queries, layout parameters, transitions, and keyframe animations.
   - Express layout rules using clean class selectors only, fully avoiding ID-based specificity override struggles.`;

    const refinementPrompt = `Here is the current interface generated:
HTML:
${currentCode?.htmlTailwind || ""}

React TSX:
${currentCode?.reactTailwind || ""}

SASS Code:
${currentCode?.sassCode || ""}

CSS3 with variables:
${currentCode?.css3Code || ""}

User's refinement request: "${instruction}"
Target Dark-mode requested: ${darkModeEnabled ? "YES" : "NO"}
Component type constraint: ${componentType || "As before"}

Apply this refinement. Preserve the design style. Return updated utility mappings and complete revised responsive snippets for HTML, React TSX, sassCode, and css3Code.`;

    const response = await generateWithTimeout({
      model: "gemini-2.5-flash",
      contents: [
        { text: refinementPrompt }
      ],
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: analysisSchema
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response returned during refinement.");
    }

    const payload = JSON.parse(text.trim());
    return res.json(payload);
  } catch (err: any) {
    console.error("Refinement api error:", err);
    return res.status(500).json({
      error: "Refinement Failed",
      message: err.message || "An unexpected error occurred during iterative code update."
    });
  }
});


// Configure routing of static and server-side assets
const mountApplication = async () => {
  if (process.env.NODE_ENV !== "production") {
    // DEV MODE: Mount Vite dev server middleware to allow hot compilation and source streaming
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // PRODUCTION MODE: Serve compiled static files from dist directory
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched successfully routing port ${PORT}`);
  });
}

mountApplication();
