# Shaon Landmarks & Housing — Architectural Integrity

[![Stack: TanStack Start](https://img.shields.io/badge/TanStack-Start-ef4444?logo=react)](https://tanstack.com/start)
[![React](https://img.shields.io/badge/React-19-58c4dc?logo=react)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Bun-1.x-f9f9f9?logo=bun)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Biome](https://img.shields.io/badge/Biome-2.4-60a5fa?logo=biome)](https://biomejs.dev)
[![GSAP](https://img.shields.io/badge/GSAP-3-88ce02)](https://gsap.com)

Premium real estate showcase for **Shaon Landmarks & Housing**, a Dhaka-based developer known for architectural integrity, timely handover, and sophisticated design.

The site is a **server-rendered React SPA** — a portfolio, lead-generation tool, and brand presence rolled into one.

---

## Key Features

- **Portfolio** — project listing with detail pages for each landmark: hero imagery, vision/mission, floor plans, amenities, specifications, location on Leaflet map, and full-screen lightbox galleries
- **Blog** — markdown-backed articles with full layout, hero banners, CTA, and social sharing
- **Services** — architecture, construction, interior design, land development
- **About** — company story, mission/vision, leadership team, certifications, testimonials
- **Contact** — EmailJS-powered form, Leaflet office locations map, WhatsApp integration
- **EMI Calculator** — interactive loan/EMI calculator for prospective buyers
- **Sustainability** — dedicated page with philosophy, pillars, and certifications
- **Smooth scroll** — powered by Lenis with custom easing
- **Scroll animations** — GSAP + ScrollTrigger throughout every section
- **SEO** — JSON-LD structured data (WebPage, BreadcrumbList, Organization), canonical URLs, sitemap
- **Performance** — WebP images, optimized via Sharp, lazy loading, skeleton/error route states

---

## Tech Stack

| Layer | Choice |
|---|---|
| **Framework** | [TanStack Start](https://tanstack.com/start) (React 19 SSR) |
| **Routing** | [TanStack Router](https://tanstack.com/router) — file-based |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **UI Primitives** | [Base UI React](https://base-ui.com) + hand-built shadcn-style components |
| **Icons** | [Tabler Icons](https://tabler.io/icons) |
| **Animation** | [GSAP](https://gsap.com) with ScrollTrigger |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering) |
| **Carousel** | [Embla](https://www.embla-carousel.com) |
| **Maps** | [React Leaflet](https://react-leaflet.js.org) |
| **Contact** | [EmailJS](https://www.emailjs.com) |
| **Image Optimization** | [Sharp](https://sharp.pixelplumbing.com) |
| **Build / Dev** | [Vite](https://vitejs.dev) + [Bun](https://bun.sh) |
| **Linting** | [Biome](https://biomejs.dev) |
| **Testing** | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) |
| **Server** | [Nitro](https://nitro.build) (deploy anywhere) |

---

## Getting Started

**Prerequisites:** [Bun](https://bun.sh) ≥ 1.3

```bash
# 1. Clone the repo
git clone <repo-url>
cd shaon-landmarks

# 2. Set up environment variables
cp .env.example .env
# Then edit .env with your EmailJS credentials (see below)

# 3. Install dependencies
bun install

# 4. Start dev server
bun --bun run dev
```

The app opens at `http://localhost:3000`.

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_SITE_URL` | Yes | `https://shaon-landmarks.pages.dev` | Canonical site URL |
| `VITE_EMAILJS_PUBLIC_KEY` | Yes | — | EmailJS public API key |
| `VITE_EMAILJS_SERVICE_ID` | Yes | — | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Yes | — | Contact form template ID |
| `VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID` | Yes | — | Newsletter signup template ID |
| `VITE_WHATSAPP_NUMBER` | No | `+8801712345678` | WhatsApp business number |
| `VITE_CONTACT_PHONE` | No | `+8801712345678` | Display phone number |
| `VITE_CONTACT_EMAIL` | No | `info@shaonlandmarks.com` | Display email address |

EmailJS vars are required for the contact and newsletter forms. Get them at [emailjs.com](https://www.emailjs.com).

---

## Available Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite dev --port 3000` | Start development server |
| `build` | `vite build` | Build for production |
| `preview` | `vite preview` | Preview production build |
| `test` | `bun test` | Run tests (Vitest) |
| `lint` | `biome lint` | Lint source files |
| `format` | `biome format` | Format source files |
| `check` | `biome check . --write` | Lint + format + apply fixes |
| `typecheck` | `tsc --noEmit` | TypeScript type checking |
| `gen-sitemap` | `bun run scripts/generate-sitemap.ts` | Generate `public/sitemap.xml` |
| `gen-images` | `bun run scripts/optimize-images.ts` | Optimize images with Sharp |
| `analyze:bundle` | `ANALYZE=true vite build` | Bundle analysis |
| `knip` | `knip` | Dead file/export detection |

---

## Project Structure

```
shaon-landmarks/
├── src/
│   ├── routes/          # File-based routes (TanStack Router)
│   │   ├── __root.tsx   # Layout shell (header, footer, Lenis)
│   │   ├── index.tsx    # Home page
│   │   ├── about.tsx
│   │   ├── services.tsx
│   │   ├── contact.tsx
│   │   ├── portfolio.tsx / portfolio.$slug.tsx
│   │   ├── blog.tsx / blog.$slug.tsx
│   │   ├── sustainability.tsx
│   │   ├── emi-calculator.tsx
│   │   ├── privacy.tsx
│   │   └── legal.tsx
│   ├── components/
│   │   ├── layout/      # Header, Footer, Newsletter
│   │   ├── ui/          # Button, Card, Badge, Carousel, Sheet, etc.
│   │   ├── shared/      # RouteError, RouteSkeleton
│   │   └── pages/       # Section components per page
│   ├── content/         # Data files (projects, blog, navigation, etc.)
│   │   └── blog/        # Markdown blog articles
│   ├── lib/             # Utilities (env, seo, email, gsap, lenis, markdown)
│   └── assets/          # WebP images (projects, about, contact, etc.)
├── scripts/             # Build-time scripts (sitemap, image optimization)
├── doc/                 # Documentation
│   └── design-system.md # Full design token reference
├── public/              # Static assets (favicon, manifest, sitemap)
└── .env.example         # Environment variable template
```

---

## Design System

Canonical tokens (typography, colors, spacing, icons, animations) are documented in [`doc/design-system.md`](doc/design-system.md). It covers:

- Font stack (Inter Variable + Cormorant Garamond)
- Color palette (OKLCH values, bronze/gold brand)
- Type scale and letter-spacing
- Spacing and grid patterns
- All component variants
- GSAP animation patterns
- Hover effect patterns

---

## Deployment

The project uses **Nitro** as the server adapter. Build produces a self-contained Node server:

```bash
bun --bun run build
node .output/server/index.mjs
```

Push the `.output/` directory to any Node-compatible host (Render, Fly.io, VPS, etc.).

For platform-specific presets (Vercel, Netlify, Cloudflare, AWS Lambda), see [Nitro deployment docs](https://v3.nitro.build/deploy).

---

## License

Private — all rights reserved. Shaon Landmarks & Housing.
