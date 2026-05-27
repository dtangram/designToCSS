import { PresetItem } from "./types";

export const PRESETS: PresetItem[] = [
  {
    id: "profile-card",
    name: "Minimalist Bio Profile Card",
    description: "Compact modern card with avatars, colored tags, metrics row, and subtle outlines",
    icon: "User",
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 300" width="100%" height="100%">
  <!-- Card Background -->
  <rect x="10" y="10" width="430" height="280" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
  
  <!-- Subtle Header Cover Color -->
  <path d="M10 26 C10 17 17 10 26 10 L424 10 C433 10 440 17 440 26 L440 80 L10 80 Z" fill="#6366f1" opacity="0.15" />
  
  <!-- Profile Avatar -->
  <circle cx="225" cy="80" r="42" fill="#ffffff" stroke="#6366f1" stroke-width="3" />
  <circle cx="225" cy="80" r="36" fill="#e2e8f0" />
  <!-- Simulated avatar user icon -->
  <path d="M211 96 C211 88 217 80 225 80 C233 80 239 88 239 96 Z" fill="#475569" />
  <circle cx="225" cy="70" r="12" fill="#475569" />

  <!-- Verification Badge -->
  <circle cx="255" cy="105" r="9" fill="#0ea5e9" />
  <path d="M252 105 L254 107 L258 103" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />

  <!-- Name & Title -->
  <text x="225" y="145" font-family="'Inter', sans-serif" font-size="18" font-weight="700" fill="#0f172a" text-anchor="middle">Marcus Vance</text>
  <text x="225" y="162" font-family="'Inter', sans-serif" font-size="12" font-weight="500" fill="#64748b" text-anchor="middle">PRINCIPAL PRODUCT DESIGNER</text>

  <!-- Bio Tags -->
  <rect x="130" y="174" width="80" height="18" rx="9" fill="#f1f5f9" />
  <text x="170" y="187" font-family="'Inter', sans-serif" font-size="10" font-weight="600" fill="#475569" text-anchor="middle">UI Design</text>

  <rect x="216" y="174" width="104" height="18" rx="9" fill="#e0f2fe" />
  <text x="268" y="187" font-family="'Inter', sans-serif" font-size="10" font-weight="600" fill="#0369a1" text-anchor="middle">Tailwind Expert</text>

  <!-- Metrics Row -->
  <line x1="50" y1="208" x2="400" y2="208" stroke="#f1f5f9" stroke-width="2" />
  
  <!-- Metric 1 -->
  <text x="100" y="228" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#0f172a" text-anchor="middle">92.4k</text>
  <text x="100" y="244" font-family="'Inter', sans-serif" font-size="10" font-weight="500" fill="#94a3b8" text-anchor="middle">FOLLOWERS</text>

  <!-- Divider -->
  <line x1="225" y1="216" x2="225" y2="246" stroke="#f1f5f9" stroke-width="2" />

  <!-- Metric 2 -->
  <text x="350" y="228" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#0f172a" text-anchor="middle">482</text>
  <text x="350" y="244" font-family="'Inter', sans-serif" font-size="10" font-weight="500" fill="#94a3b8" text-anchor="middle">DESIGNS</text>

  <!-- Follow Button -->
  <rect x="150" y="258" width="150" height="26" rx="13" fill="#6366f1" />
  <text x="225" y="275" font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">Consult Design</text>
</svg>
`
  },
  {
    id: "pricing-card",
    name: "Premium Dark Pricing Widget",
    description: "Elegant charcoal-sleek pricing option with glowing borders and solid primary CTA",
    icon: "DollarSign",
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 300" width="100%" height="100%">
  <!-- Card Background - Charcoal Dark -->
  <rect x="10" y="10" width="430" height="280" rx="20" fill="#0f172a" stroke="#334155" stroke-width="2" />
  
  <!-- Premium Badge Header -->
  <rect x="30" y="30" width="105" height="22" rx="11" fill="#ec4899" opacity="0.2" />
  <rect x="30" y="30" width="105" height="22" rx="11" fill="none" stroke="#ec4899" stroke-width="1.5" />
  <text x="82.5" y="44" font-family="'Inter', sans-serif" font-size="9" font-weight="700" fill="#f472b6" text-anchor="middle">STORYTELLER EXCLUSIVE</text>

  <!-- Pricing Title and Value -->
  <text x="30" y="78" font-family="'Inter', sans-serif" font-size="20" font-weight="800" fill="#ffffff">Creator Tier</text>
  <text x="30" y="100" font-family="'Inter', sans-serif" font-size="11" font-weight="500" fill="#94a3b8">The design toolkit for scaling micro-studios.</text>

  <!-- Cost cluster -->
  <text x="30" y="145" font-family="'Inter', sans-serif" font-size="36" font-weight="800" fill="#ffffff">$49</text>
  <text x="105" y="143" font-family="'Inter', sans-serif" font-size="14" font-weight="500" fill="#64748b">/ month</text>

  <!-- Features List -->
  <!-- Checkmark icon 1 -->
  <circle cx="40" cy="174" r="8" fill="#10b981" />
  <path d="M37 174 L39 176 L43 172" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
  <text x="56" y="178" font-family="'Inter', sans-serif" font-size="11" font-weight="500" fill="#e2e8f0">Dynamic Visual Code Export</text>

  <!-- Checkmark icon 2 -->
  <circle cx="40" cy="198" r="8" fill="#10b981" />
  <path d="M37 198 L39 200 L43 196" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
  <text x="56" y="202" font-family="'Inter', sans-serif" font-size="11" font-weight="500" fill="#e2e8f0">Adaptive dark-mode auto-engine</text>

  <!-- Checkmark icon 3 -->
  <circle cx="40" cy="222" r="8" fill="#10b981" />
  <path d="M37 222 L39 224 L43 220" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
  <text x="56" y="226" font-family="'Inter', sans-serif" font-size="11" font-weight="500" fill="#e2e8f0">Unlimited structural templates</text>

  <!-- Subscription CTA Button -->
  <rect x="30" y="244" width="390" height="36" rx="10" fill="none" stroke="#6366f1" stroke-width="2" />
  <rect x="40" y="244" width="370" height="36" fill="#6366f1" rx="8" />
  <text x="225" y="266" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">Unlock Unlimited Power</text>
</svg>
`
  },
  {
    id: "newsletter-box",
    name: "Newsletter Form Panel",
    description: "Compact input panel with clean email target field and prominent subscribe arrow CTA",
    icon: "Mail",
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 300" width="100%" height="100%">
  <!-- Outside layout box -->
  <rect x="10" y="10" width="430" height="280" rx="12" fill="#faf9f6" stroke="#d6d3d1" stroke-width="2" />
  
  <!-- Left Side Warm Amber Accent Border Strip -->
  <path d="M10 22 C10 15 15 10 22 10 L30 10 L30 290 L22 290 C15 290 10 285 10 278 Z" fill="#f59e0b" />

  <!-- Sub-header -->
  <text x="50" y="55" font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="#d97706" letter-spacing="1">WEEKLY CHRONICLES</text>
  
  <!-- Deep statement title -->
  <text x="50" y="85" font-family="'Inter', sans-serif" font-size="22" font-weight="800" fill="#1c1917">Design Utility Insights</text>
  
  <text x="50" y="112" font-family="'Inter', sans-serif" font-size="12" font-weight="400" fill="#57534e">Receive premium CSS layouts and spacing checklists directly in your inbox.</text>
  <text x="50" y="128" font-family="'Inter', sans-serif" font-size="12" font-weight="400" fill="#57534e">No marketing fluff. Just raw building strategies built for engineers.</text>

  <!-- Form Fields -->
  <text x="50" y="172" font-family="'Inter', sans-serif" font-size="10" font-weight="700" fill="#78716c">EMAIL ADDRESS</text>
  
  <!-- Target text box -->
  <rect x="50" y="184" width="240" height="38" rx="8" fill="#ffffff" stroke="#e7e5e4" stroke-width="2" />
  <text x="64" y="208" font-family="'Inter', sans-serif" font-size="12" font-weight="400" fill="#a8a29e">developer@studio.com</text>

  <!-- Subscribe Button alongside -->
  <rect x="300" y="184" width="100" height="38" rx="8" fill="#1c1917" />
  <text x="350" y="207" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">Subscribe</text>

  <!-- Footer indicators -->
  <text x="50" y="248" font-family="'Inter', sans-serif" font-size="10" font-weight="400" fill="#a8a29e">🔒 Strictly zero spam. Opt-out directly with a single click at any time.</text>
</svg>
`
  }
];
