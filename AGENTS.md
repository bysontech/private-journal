# Agent Instructions for PrivateJournal

This file contains instructions for AI coding agents (Claude, Cursor, etc.)

**IMPORTANT**: Read this file completely before starting any work.

---

name: Agent Task: Build Privacy-First Local AI Journal PWA

about: Creating a fully client-side journal app with local AI analysis using HonoX and transformers.js

title: "[TASK] PrivateJournal - Complete Privacy-First Journal with Local AI"

labels: ["new-project", "honox", "pwa", "ai", "privacy", "client-only"]

---

# Task: Build Privacy-First Local AI Journal PWA (Client-only Architecture)

We will build a privacy-first journal web app that runs fully in the browser using local AI.

This project must follow these principles:

- **Fully client-side** (no user data sent to servers)
- **Static hosting only** (Cloudflare Pages)
- **Offline-first PWA**
- **Local AI** using transformers.js
- **Zero backend** for data storage
- **Suitable for solo operation** and low-cost scaling

---

## Project Overview

**Name**: PrivateJournal

**Goal**:
Create a Progressive Web App journal that stores all data in IndexedDB and performs sentiment analysis and summarization locally using transformers.js.

**Hosting**:
Cloudflare Pages (static site generation only)

**Development Timeline**: 4 weeks

---

## URL Structure

```
/               Landing page (static)
/app            Journal application (SPA)
/pricing        Pricing page (static)
/privacy        Privacy policy (static)
/terms          Terms of service (static)
```

---

## Tech Stack

### Framework

- **HonoX** (SSG mode for static pages, SPA for /app)
- **Vite** (build tool)

### Styling

- **Tailwind CSS** 3.x
- **shadcn/ui** (manually copied components)

### Storage

- **IndexedDB** (primary storage via idb-keyval)
- **localStorage** (fallback + preferences)

### AI

- **@xenova/transformers** 2.x
- Sentiment model: `Xenova/distilbert-base-multilingual-cased-sentiments-student` (~65MB)
- Summarization: `Xenova/distilbart-cnn-6-6` (~120MB) OR simple extractive fallback

### PWA

- **vite-plugin-pwa** (workbox strategy)
- Service Worker with offline support

### Security

- **DOMPurify** (XSS prevention)
- **Web Crypto API** (AES-GCM encryption for export/import)

### Build & Deploy

- **Vite** (bundler)
- **Cloudflare Pages** (static hosting)

---

## Architecture Constraints

### Data Flow

```
User Input → Sanitization → IndexedDB → Local AI Processing → UI Update
```

- All journal data must stay in the browser
- No server-side database
- No cloud sync (future feature, not MVP)
- No authentication (local-only app)
- Pro features must work offline
- AI models downloaded on-demand and cached in browser
- Encryption only for local export/import files

### Critical Rules

- **NEVER send user content to external servers**
- **NEVER use remote APIs for AI processing**
- **ALL processing happens client-side**

---

## Directory Structure

```
private-journal/
├── app/
│   ├── routes/
│   │   ├── index.tsx              # Landing page (SSG)
│   │   ├── app.tsx                # Main journal app (SPA)
│   │   ├── pricing.tsx            # Pricing page (SSG)
│   │   ├── privacy.tsx            # Privacy policy (SSG)
│   │   ├── terms.tsx              # Terms of service (SSG)
│   │   └── _renderer.tsx          # Common layout + meta tags
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── select.tsx
│   │   ├── Editor.tsx             # Markdown editor
│   │   ├── AIAnalysis.tsx         # Sentiment display
│   │   ├── EntryList.tsx          # Journal entries list
│   │   ├── TrendChart.tsx         # Emotion trend visualization
│   │   ├── SearchBar.tsx          # Search functionality
│   │   ├── ExportDialog.tsx       # Export/backup UI
│   │   └── ErrorBoundary.tsx      # Error handling
│   ├── lib/
│   │   ├── db.ts                  # IndexedDB wrapper
│   │   ├── ai.ts                  # transformers.js wrapper
│   │   ├── crypto.ts              # Encryption utilities
│   │   ├── sanitize.ts            # DOMPurify wrapper
│   │   ├── i18n.ts                # Language detection/switching
│   │   ├── constants.ts           # All text strings (ja/en)
│   │   └── utils.ts               # Helper functions
│   └── islands/                   # Interactive components (if needed)
├── public/
│   ├── manifest.json              # PWA manifest
│   ├── robots.txt
│   ├── favicon.ico
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── assets/                    # Images, icons
├── .cloudflare/
│   └── pages.toml                 # Cloudflare Pages config (optional)
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## HonoX SSG Configuration

### vite.config.ts

```typescript
import { defineConfig } from "vite";
import honox from "honox/vite";
import pages from "@hono/vite-cloudflare-pages";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    honox({
      // Client-side only for /app route
      client: {
        input: ["/app"],
      },
    }),
    pages(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "pwa-*.png"],
      manifest: {
        name: "PrivateJournal",
        short_name: "Journal",
        description: "Privacy-first local AI journal",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/app",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net/,
            handler: "CacheFirst",
            options: {
              cacheName: "ai-models",
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "ai-vendor": ["@xenova/transformers"],
        },
      },
    },
  },
});
```

**Key Points**:

- `/app` runs as SPA (client-side only)
- Landing, pricing, privacy, terms are pre-rendered (SSG)
- PWA caching for AI models from CDN
- Code splitting for AI libraries

---

## Data Model

### app/lib/db.ts

```typescript
import { get, set, del, keys } from "idb-keyval";

export interface Entry {
  id: string;
  content: string; // Markdown text
  mood?: "positive" | "neutral" | "negative";
  moodScore?: number; // 0-1 confidence
  summary?: string; // AI-generated summary
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
}

// CRUD Operations
export async function saveEntry(entry: Entry): Promise<void> {
  try {
    await set(`entry:${entry.id}`, entry);
  } catch (error) {
    console.error("Failed to save entry:", error);
    // Fallback to localStorage if IndexedDB fails
    localStorage.setItem(`entry:${entry.id}`, JSON.stringify(entry));
    throw new Error("Storage failed. Please check browser settings.");
  }
}

export async function getEntry(id: string): Promise<Entry | undefined> {
  try {
    return await get(`entry:${id}`);
  } catch (error) {
    console.error("Failed to get entry:", error);
    // Fallback to localStorage
    const stored = localStorage.getItem(`entry:${id}`);
    return stored ? JSON.parse(stored) : undefined;
  }
}

export async function listEntries(limit?: number): Promise<Entry[]> {
  try {
    const allKeys = await keys();
    const entryKeys = allKeys.filter(
      (k) => typeof k === "string" && k.startsWith("entry:"),
    );

    const entries = await Promise.all(
      entryKeys.map((key) => get(key as string)),
    );

    const sorted = entries
      .filter((e): e is Entry => e !== undefined)
      .sort((a, b) => b.createdAt - a.createdAt);

    return limit ? sorted.slice(0, limit) : sorted;
  } catch (error) {
    console.error("Failed to list entries:", error);
    return [];
  }
}

export async function deleteEntry(id: string): Promise<void> {
  try {
    await del(`entry:${id}`);
    localStorage.removeItem(`entry:${id}`); // Clean fallback too
  } catch (error) {
    console.error("Failed to delete entry:", error);
    throw error;
  }
}

export async function searchEntries(query: string): Promise<Entry[]> {
  const allEntries = await listEntries();
  const lowerQuery = query.toLowerCase();

  return allEntries.filter(
    (entry) =>
      entry.content.toLowerCase().includes(lowerQuery) ||
      entry.summary?.toLowerCase().includes(lowerQuery),
  );
}
```

---

## AI Implementation

### app/lib/ai.ts

```typescript
import { pipeline, env } from "@xenova/transformers";

// Configure transformers.js to use CDN
env.allowRemoteModels = true;
env.allowLocalModels = false;

let sentimentPipeline: any = null;
let summarizationPipeline: any = null;

/**
 * Analyze sentiment of text
 * Returns mood label and confidence score
 */
export async function analyzeSentiment(
  text: string,
): Promise<{ label: "positive" | "neutral" | "negative"; score: number }> {
  try {
    // Lazy load model on first use
    if (!sentimentPipeline) {
      sentimentPipeline = await pipeline(
        "sentiment-analysis",
        "Xenova/distilbert-base-multilingual-cased-sentiments-student",
      );
    }

    // Limit text length for performance
    const truncated = text.slice(0, 512);
    const result = await sentimentPipeline(truncated);

    // Map model output to our mood types
    const label = result[0].label.toLowerCase();
    const mood =
      label === "positive"
        ? "positive"
        : label === "negative"
          ? "negative"
          : "neutral";

    return {
      label: mood,
      score: result[0].score,
    };
  } catch (error) {
    console.error("Sentiment analysis failed:", error);
    // Graceful degradation
    return { label: "neutral", score: 0 };
  }
}

/**
 * Generate summary of text
 * Falls back to extractive summary if model fails
 */
export async function generateSummary(text: string): Promise<string> {
  try {
    // Only summarize if text is long enough
    if (text.length < 200) {
      return text.slice(0, 100) + (text.length > 100 ? "..." : "");
    }

    // Lazy load model
    if (!summarizationPipeline) {
      summarizationPipeline = await pipeline(
        "summarization",
        "Xenova/distilbart-cnn-6-6",
      );
    }

    // Limit input length
    const truncated = text.slice(0, 1024);
    const result = await summarizationPipeline(truncated, {
      max_length: 100,
      min_length: 30,
    });

    return result[0].summary_text;
  } catch (error) {
    console.error("Summarization failed, using extractive fallback:", error);
    // Extractive fallback: first few sentences
    return extractiveSummary(text);
  }
}

/**
 * Simple extractive summary as fallback
 */
function extractiveSummary(text: string, maxLength: number = 150): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  let summary = "";

  for (const sentence of sentences) {
    if (summary.length + sentence.length > maxLength) break;
    summary += sentence;
  }

  return summary || text.slice(0, maxLength) + "...";
}

/**
 * Check if AI features are available
 */
export async function checkAIAvailability(): Promise<{
  sentiment: boolean;
  summarization: boolean;
}> {
  try {
    await pipeline(
      "sentiment-analysis",
      "Xenova/distilbert-base-multilingual-cased-sentiments-student",
    );
    return { sentiment: true, summarization: true };
  } catch {
    return { sentiment: false, summarization: false };
  }
}
```

**Key Features**:

- Lazy loading (models only downloaded when needed)
- Graceful degradation (fallback if AI fails)
- Error handling with console logging
- Text truncation for performance
- CDN-based model loading

---

## Encryption (Pro Feature)

### app/lib/crypto.ts

```typescript
/**
 * Encrypt data using Web Crypto API (AES-GCM)
 * Password is derived using PBKDF2
 */
export async function encryptData(
  data: string,
  password: string,
): Promise<{ encrypted: Uint8Array; salt: Uint8Array; iv: Uint8Array }> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  // Generate random salt and IV
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Derive key from password
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"],
  );

  // Encrypt
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    dataBuffer,
  );

  return {
    encrypted: new Uint8Array(encrypted),
    salt,
    iv,
  };
}

/**
 * Decrypt data using Web Crypto API
 */
export async function decryptData(
  encrypted: Uint8Array,
  salt: Uint8Array,
  iv: Uint8Array,
  password: string,
): Promise<string> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  // Derive key from password
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );

  // Decrypt
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encrypted,
  );

  return decoder.decode(decrypted);
}

/**
 * Export all entries as encrypted file
 */
export async function exportEncrypted(
  entries: Entry[],
  password: string,
): Promise<Blob> {
  const json = JSON.stringify(entries);
  const { encrypted, salt, iv } = await encryptData(json, password);

  // Combine salt + iv + encrypted data
  const combined = new Uint8Array(salt.length + iv.length + encrypted.length);
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(encrypted, salt.length + iv.length);

  return new Blob([combined], { type: "application/octet-stream" });
}

/**
 * Import entries from encrypted file
 */
export async function importEncrypted(
  file: Blob,
  password: string,
): Promise<Entry[]> {
  const buffer = await file.arrayBuffer();
  const data = new Uint8Array(buffer);

  // Extract salt, iv, encrypted data
  const salt = data.slice(0, 16);
  const iv = data.slice(16, 28);
  const encrypted = data.slice(28);

  const json = await decryptData(encrypted, salt, iv, password);
  return JSON.parse(json);
}
```

---

## Security Implementation

### app/lib/sanitize.ts

```typescript
import DOMPurify from "dompurify";

/**
 * Sanitize HTML to prevent XSS
 * Used before rendering user content
 */
export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "a",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ],
    ALLOWED_ATTR: ["href", "class", "target"],
    ALLOW_DATA_ATTR: false,
  });
}

/**
 * Sanitize plain text (remove any HTML)
 */
export function sanitizeText(text: string): string {
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}
```

**Usage**:

- Sanitize before rendering Markdown preview
- Sanitize before PDF export
- Sanitize before saving to IndexedDB (optional, but recommended)

---

## i18n Implementation

### app/lib/i18n.ts

```typescript
export type Language = "ja" | "en";

/**
 * Detect user's preferred language
 */
export function detectLanguage(): Language {
  // 1. Check localStorage
  const stored = localStorage.getItem("lang");
  if (stored === "ja" || stored === "en") return stored;

  // 2. Check browser language
  const browserLang = navigator.language.split("-")[0];
  if (browserLang === "ja") return "ja";

  // 3. Default to English
  return "en";
}

/**
 * Set language preference
 */
export function setLanguage(lang: Language): void {
  localStorage.setItem("lang", lang);
  window.location.reload();
}

/**
 * Get current language
 */
export function getCurrentLanguage(): Language {
  return (localStorage.getItem("lang") as Language) || detectLanguage();
}
```

### app/lib/constants.ts

```typescript
export const TEXTS = {
  ja: {
    app: {
      title: "プライベート日記",
      newEntry: "新しい日記を書く",
      search: "検索",
      settings: "設定",
      export: "エクスポート",
      import: "インポート",
      delete: "削除",
      save: "保存",
      cancel: "キャンセル",
    },
    editor: {
      placeholder: "今日の出来事を書いてください...",
      analyzing: "感情を分析中...",
      summarizing: "要約を生成中...",
    },
    mood: {
      positive: "ポジティブ",
      neutral: "ニュートラル",
      negative: "ネガティブ",
    },
    export: {
      title: "データをエクスポート",
      password: "暗号化パスワード",
      download: "ダウンロード",
      success: "エクスポートが完了しました",
    },
    pricing: {
      free: "無料",
      pro: "プロ版",
      features: {
        encryption: "暗号化バックアップ",
        pdf: "PDF出力",
        unlimited: "無制限のエントリー",
      },
    },
  },
  en: {
    app: {
      title: "Private Journal",
      newEntry: "New Entry",
      search: "Search",
      settings: "Settings",
      export: "Export",
      import: "Import",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
    },
    editor: {
      placeholder: "Write about your day...",
      analyzing: "Analyzing sentiment...",
      summarizing: "Generating summary...",
    },
    mood: {
      positive: "Positive",
      neutral: "Neutral",
      negative: "Negative",
    },
    export: {
      title: "Export Data",
      password: "Encryption Password",
      download: "Download",
      success: "Export completed successfully",
    },
    pricing: {
      free: "Free",
      pro: "Pro",
      features: {
        encryption: "Encrypted Backup",
        pdf: "PDF Export",
        unlimited: "Unlimited Entries",
      },
    },
  },
};

export function t(key: string, lang: Language = "en"): string {
  const keys = key.split(".");
  let value: any = TEXTS[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}
```

---

## Cloudflare Pages Configuration

### .cloudflare/pages.toml (optional)

```toml
[build]
command = "npm run build"
destination = "dist"

[[headers]]
for = "/*"
[headers.values]
X-Frame-Options = "DENY"
X-Content-Type-Options = "nosniff"
Referrer-Policy = "strict-origin-when-cross-origin"
Permissions-Policy = "geolocation=(), microphone=(), camera=()"

# CSP: Allow WASM for transformers.js
Content-Security-Policy = "default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' https://cdn.jsdelivr.net; font-src 'self' data:; worker-src 'self' blob:;"

[[headers]]
for = "/pwa-*.png"
[headers.values]
Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
for = "/*.js"
[headers.values]
Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
for = "/*.css"
[headers.values]
Cache-Control = "public, max-age=31536000, immutable"
```

**Critical CSP Notes**:

- `wasm-unsafe-eval` required for ONNX runtime in transformers.js
- `jsdelivr.net` for AI model CDN
- `blob:` for Web Workers
- `data:` for inline images

---

## UI Requirements

### Responsive Design

- **Mobile-first**: 320px minimum width
- **Breakpoints**:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

### Layout

- **Mobile**: Single column, bottom navigation
- **Tablet/Desktop**: Two-column (entry list + editor/detail)

### Dark Mode

```typescript
// app/lib/theme.ts
export function detectTheme(): "light" | "dark" {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Apply to <html> element
document.documentElement.classList.toggle("dark", detectTheme() === "dark");
```

### Components

- Markdown editor with preview
- Searchable entry list with filters
- Emotion trend chart (weekly/monthly)
- Modal dialogs for export/import
- Toast notifications

---

## Pro Features (Client-only)

### Free Tier

- 50 entries maximum
- Basic sentiment analysis
- Basic search

### Pro Tier (¥980 one-time payment)

- Unlimited entries
- Encrypted backup export/import (.pjournal file)
- PDF export (single or batch)
- Advanced analytics dashboard
- AI summarization
- Priority features

**Implementation**:

```typescript
// app/lib/license.ts
export function isPro(): boolean {
  return localStorage.getItem("license_key") !== null;
}

export function activatePro(licenseKey: string): boolean {
  // Validate license key format (simple check)
  if (licenseKey.length === 32 && /^[A-Z0-9]+$/.test(licenseKey)) {
    localStorage.setItem("license_key", licenseKey);
    return true;
  }
  return false;
}
```

**Note**: No server validation needed. License key is static string provided after Stripe purchase.

---

## Error Handling Strategy

### app/components/ErrorBoundary.tsx

```typescript
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('App error:', error, errorInfo)
  }

  resetApp = () => {
    if (confirm('This will clear all data. Continue?')) {
      indexedDB.deleteDatabase('keyval-store')
      localStorage.clear()
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {this.state.error?.message || 'Unknown error'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="btn btn-primary mr-2"
            >
              Try Again
            </button>
            <button
              onClick={this.resetApp}
              className="btn btn-danger"
            >
              Reset App
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

### Error Handling Checklist

- [ ] IndexedDB operations wrapped in try-catch
- [ ] AI loading failures handled gracefully
- [ ] Network errors for model downloads handled
- [ ] User-friendly error messages
- [ ] Console logging for debugging
- [ ] App reset option as last resort

---

## Performance Requirements

### Lighthouse Targets

- **Performance**: 90+
- **Accessibility**: 100
- **Best Practices**: 95+
- **SEO**: 100
- **PWA**: 100

### Core Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Bundle Size Limits

- **Initial bundle**: < 200KB (gzipped)
- **AI models**: Lazy loaded (not counted)
- **Images**: WebP format, lazy loading
- **Fonts**: Subsetting, preload critical fonts

### Optimization Strategies

```typescript
// vite.config.ts optimizations
export default defineConfig({
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "ai-vendor": ["@xenova/transformers"],
          "ui-vendor": ["react", "react-dom"],
          utils: ["idb-keyval", "dompurify"],
        },
      },
    },
  },
});
```

---

## shadcn/ui Setup

### Installation

```bash
# Install dependencies
npm install class-variance-authority clsx tailwind-merge lucide-react

# Create components directory
mkdir -p app/components/ui
```

### Required Components

Copy these from https://ui.shadcn.com/docs/components:

- **button** - Primary actions
- **card** - Entry cards
- **dialog** - Modals (export/import)
- **textarea** - Editor
- **select** - Dropdowns
- **toast** - Notifications
- **dropdown-menu** - Context menus
- **progress** - Loading indicators

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... rest of shadcn colors
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## Development Schedule

### Week 1: Infrastructure + Basic CRUD

**Days 1-2**:

- [x] Initialize HonoX project
- [x] Setup Tailwind + shadcn/ui
- [x] Configure Vite + PWA plugin
- [x] Setup routing structure

**Days 3-5**:

- [x] Implement IndexedDB wrapper (db.ts)
- [x] Create Entry model and CRUD operations
- [x] Build basic Editor component
- [x] Build EntryList component

**Days 6-7**:

- [x] Implement search functionality
- [x] Add delete confirmation
- [x] Basic styling and layout

### Week 2: AI Integration

**Days 1-3**:

- [x] Integrate @xenova/transformers
- [x] Implement sentiment analysis
- [x] Show loading states for AI
- [x] Handle AI failures gracefully

**Days 4-5**:

- [x] Implement summarization
- [x] Add AI toggle (enable/disable)
- [x] Optimize model loading

**Days 6-7**:

- [x] Build TrendChart component
- [x] Aggregate mood data by week/month
- [x] Visualize with Chart.js or Recharts

### Week 3: Pro Features

**Days 1-3**:

- [x] Implement encryption (crypto.ts)
- [x] Build export dialog
- [x] Implement encrypted export
- [x] Implement encrypted import

**Days 4-5**:

- [x] PDF export using jsPDF or @react-pdf/renderer
- [x] Single entry PDF
- [x] Batch PDF export

**Days 6-7**:

- [x] License key system
- [x] Pro feature gating
- [x] Pricing page

### Week 4: PWA + Polish

**Days 1-2**:

- [x] Configure Service Worker
- [x] Test offline functionality
- [x] Add install prompt

**Days 3-4**:

- [x] Implement ErrorBoundary
- [x] Add toast notifications
- [x] Improve loading states
- [x] Accessibility audit

**Days 5-6**:

- [x] Landing page
- [x] Privacy policy
- [x] Terms of service
- [x] i18n implementation

**Day 7**:

- [x] Final testing
- [x] Lighthouse optimization
- [x] README documentation
- [x] Deploy to Cloudflare Pages

---

## Testing Checklist

### Functional Testing

- [ ] Create entry
- [ ] Edit entry
- [ ] Delete entry
- [ ] Search entries
- [ ] AI sentiment analysis
- [ ] AI summarization
- [ ] Export encrypted backup
- [ ] Import encrypted backup
- [ ] PDF export
- [ ] Offline mode
- [ ] PWA installation
- [ ] Language switching

### Browser Compatibility

- [ ] Chrome 100+
- [ ] Firefox 100+
- [ ] Safari 15+
- [ ] Edge 100+

### Performance Testing

- [ ] Lighthouse audit (all metrics green)
- [ ] Large dataset (1000+ entries)
- [ ] AI model loading time
- [ ] IndexedDB performance

### Security Testing

- [ ] XSS prevention (DOMPurify)
- [ ] Encryption/decryption
- [ ] No data leakage to network
- [ ] CSP compliance

---

## Build Instructions

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Access at http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to Cloudflare Pages

**Option 1: Dashboard**

1. Go to Cloudflare Pages dashboard
2. Create new project
3. Connect to Git repository
4. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy

**Option 2: Wrangler CLI**

```bash
# Install wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy dist
```

---

## Project Dependencies

### package.json

```json
{
  "name": "private-journal",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "hono": "^4.0.0",
    "@hono/vite-cloudflare-pages": "^0.4.0",
    "honox": "^0.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@xenova/transformers": "^2.17.0",
    "idb-keyval": "^6.2.1",
    "dompurify": "^3.0.9",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "lucide-react": "^0.344.0",
    "recharts": "^2.12.0",
    "jspdf": "^2.5.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/dompurify": "^3.0.5",
    "vite": "^5.1.0",
    "vite-plugin-pwa": "^0.19.0",
    "tailwindcss": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "typescript": "^5.3.3"
  }
}
```

---

## README.md Template

````markdown
# PrivateJournal

A privacy-first journal app with local AI analysis. All your data stays on your device.

## Features

- 📝 **Markdown Editor** - Rich text formatting
- 🤖 **Local AI** - Sentiment analysis & summarization (no cloud)
- 🔒 **Privacy First** - All data stored locally in your browser
- 📊 **Emotion Trends** - Visualize your mood over time
- 💾 **Encrypted Backup** - Export/import with password protection
- 📄 **PDF Export** - Save entries as PDF
- 🌐 **Offline Ready** - Works without internet (PWA)
- 🌙 **Dark Mode** - Auto-detects system preference
- 🌍 **i18n** - English & Japanese

## Quick Start

### Development

```bash
npm install
npm run dev
```

Visit http://localhost:5173

### Production Build

```bash
npm run build
```

Output in `dist/` directory.

### Deploy to Cloudflare Pages

```bash
wrangler pages deploy dist
```

## Tech Stack

- **Framework**: HonoX (SSG)
- **Styling**: Tailwind CSS + shadcn/ui
- **Storage**: IndexedDB
- **AI**: transformers.js (local inference)
- **PWA**: Vite PWA Plugin

## Privacy & Security

- ✅ All data stays on your device
- ✅ No analytics or tracking
- ✅ No cloud sync (by design)
- ✅ Encrypted export with AES-256-GCM
- ✅ XSS protection with DOMPurify

## Browser Support

- Chrome 100+
- Firefox 100+
- Safari 15+
- Edge 100+

## License

MIT
````

---

## Final Checklist

### Before Starting

- [ ] Read this document completely
- [ ] Understand client-only architecture
- [ ] Confirm no server-side database needed
- [ ] Understand AI will run in browser

### During Development

- [ ] Follow directory structure exactly
- [ ] Use TypeScript strictly
- [ ] Implement error handling everywhere
- [ ] Test in multiple browsers
- [ ] Keep bundle size under limits
- [ ] Sanitize all user input
- [ ] No external API calls for user data

### Before Deployment

- [ ] Run Lighthouse audit (all green)
- [ ] Test PWA installation
- [ ] Test offline mode
- [ ] Verify CSP headers
- [ ] Test with 1000+ entries
- [ ] Test encryption/decryption
- [ ] Update README with accurate info

---

## Critical Reminders

1. **NO SERVER DATABASE** - Everything in IndexedDB
2. **NO AUTHENTICATION** - Local app only
3. **NO CLOUD SYNC** - Future feature, not MVP
4. **AI RUNS LOCALLY** - Never send text to external APIs
5. **PRIVACY FIRST** - This is our core value proposition
6. **STATIC HOSTING ONLY** - Cloudflare Pages, no Workers for data

---

## Success Criteria

✅ **Must Have**:

- Journal CRUD works offline
- AI sentiment analysis works
- PWA installable
- Encrypted export/import
- No data sent to servers
- Lighthouse 90+ performance

✅ **Nice to Have**:

- AI summarization
- PDF export
- Advanced analytics
- Multiple themes

✅ **Out of Scope for MVP**:

- Cloud sync
- Multi-device sync
- Authentication
- Social features
- Collaboration

---

**Start implementation now. Follow this document as the source of truth. Ask questions if anything is unclear.**

---

## Additional Notes

- Follow TypeScript strict mode
- Use functional components (no class components)
- Prefer composition over inheritance
- Write meaningful commit messages
- Test in multiple browsers before considering a feature complete

---

Last updated: 2026-01-28
