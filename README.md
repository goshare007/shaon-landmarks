# Shaon Landmarks & Housing

Premium real estate showcase for Shaon Landmarks & Housing, a Bangladesh-based architectural development firm. Built with TanStack Start, React 19, Tailwind CSS v4, and GSAP.

## Stack

| Layer | Tech |
| ----- | ---- |
| **Framework** | TanStack Start (SSR) + React 19 |
| **Routing** | TanStack Router (file-based) |
| **Styling** | Tailwind CSS v4 |
| **Animations** | GSAP (ScrollTrigger, Flip) |
| **Smooth Scroll** | Lenis |
| **Carousel** | Embla |
| **Icons** | Lucide React |
| **Forms** | Zod + sanitize-html + Nodemailer |
| **Lightbox** | Yet Another React Lightbox |
| **Linting** | Biome |
| **Testing** | Vitest + bun test |
| **Deployment** | Vercel |

## Getting Started

```bash
bun install
bun --bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| ------- | ----------- |
| `bun run dev` | Start dev server on port 3000 |
| `bun run build` | Production build |
| `bun run test` | Run Vitest tests |
| `bun run check` | Biome lint + format (all files) |
| `bun run gen-sitemap` | Generate `public/sitemap.xml` |
| `bun run knip` | Find unused files/dependencies |

## Environment Variables

Copy `.env.example` to `.env`:

| Variable | Required | Default |
| -------- | -------- | ------- |
| `SITE_URL` | Yes | `https://shaonlandmarks.vercel.app` |
| `VITE_WHATSAPP_NUMBER` | Yes | `+8801712345678` |
| `SMTP_HOST` | For email | `smtp.gmail.com` |
| `SMTP_PORT` | For email | `587` |
| `SMTP_USER` | For email | — |
| `SMTP_PASS` | For email | — |
| `NOTIFICATION_EMAIL` | For email | — |

If SMTP vars are misconfigured, contact form submissions will appear successful but emails won't be sent. Check server logs for warnings.

## Project Structure

```
src/
├── assets/        — Images (WebP), logo
├── components/    — React components
│   ├── home/      — Hero, testimonials, featured projects, CTA
│   ├── layout/    — Header, footer, navigation
│   ├── contact/   — Contact form, CTA
│   ├── portfolio-* — Portfolio grid, detail, comparison, floor plans
│   ├── services/  — Services section
│   ├── about/     — About page sections
│   ├── emi/       — EMI calculator
│   ├── shared/    — Cookie banner, WhatsApp FAB
│   └── ui/        — shadcn-style primitives (Button, Input, Carousel, Select)
├── data/          — Static data (projects, testimonials, navigation, home content)
├── hooks/         — Shared hooks (useGsapAnimation)
├── lib/           — Utilities (seo, email, forms, env validation, formatting)
├── routes/        — TanStack Router file-based routes
└── styles.css     — Tailwind v4 theme, utilities, global styles
```

## Routes

| Path | Page |
| ---- | ---- |
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/portfolio` | Portfolio index |
| `/portfolio/$slug` | Project detail |
| `/portfolio/compare` | Project comparison (`?ids=1,2,4`) |
| `/contact` | Contact |
| `/emi-calculator` | EMI calculator |
| `/sustainability` | Sustainability |
| `/career` | Careers |
| `/legal` | Legal info |
| `/privacy` | Privacy policy |
