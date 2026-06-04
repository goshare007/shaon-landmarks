# Shaon Landmarks & Housing — Website Implementation Plan

**Tech Stack:** TanStack Start + shadcn/ui + Prisma + NeonDB (PostgreSQL) + Better Auth
**Design Reference:** Onyx & Bronze variant (Stitch project: `projects/15309103799160234087`)
**Language:** English (EN)
**Status:** Phase 1 — Static Homepage

---

## 1. Project Scaffold

### 1.1 Initialize TanStack Start

```bash
npm create tanstack-app@latest . -- --template react
```

This scaffolds a TanStack Start app with:
- `@tanstack/react-router` — file-based routing
- `@tanstack/start` — SSR framework on Vinxi
- `react` + `react-dom`
- `typescript`
- `tailwindcss` (v4 via `@tailwindcss/vite`)
- `vite` / `vinxi`

### 1.2 Install shadcn/ui

```bash
npx shadcn@latest init
```

Select the default style, neutral color, and CSS variables mode. This creates:
- `components/ui/` — shared UI primitives
- `lib/utils.ts` — `cn()` utility
- `components.json` — shadcn configuration

### 1.3 Install Prisma + Better Auth

```bash
npm install @prisma/client @better-auth/kit
npm install -D prisma
npx prisma init
```

Better Auth setup (deferred to Phase 3):
- `auth.ts` — Better Auth config with Prisma adapter
- `auth-client.ts` — client-side auth helpers

### 1.4 NeonDB (PostgreSQL)

- Connection string already configured in `.zed/settings.json`
- Add `DATABASE_URL` to `.env` pointing to the existing Neon instance
- Prisma schema will define models: `Project`, `Service`, `TeamMember`, `ContactSubmission`, `User`, `Session`, etc.

---

## 2. Route Architecture

All routes live under `app/routes/`.

```
app/routes/
├── __root.tsx              # Root layout (html, head, body, providers)
├── index.tsx               # Home page ("/")
├── projects/
│   ├── index.tsx           # Projects listing + filter tabs
│   └── $slug.tsx           # Individual project detail
├── about.tsx               # About Us
├── services.tsx            # Services
├── contact.tsx             # Contact Us
├── career.tsx              # Career / Job openings
└── consultation.tsx        # Private consultation form
```

**Phase 1** only implements `__root.tsx` and `index.tsx`. All other routes are stubs added later.

---

## 3. Design Token Translation (Onyx & Bronze)

### 3.1 Color Palette

The Onyx & Bronze variant uses a darker, more premium palette. Map into `tailwind.config` / CSS variables:

| Token | Hex | Tailwind Usage |
|-------|-----|----------------|
| `--background` | `#f9f9fd` | `bg-background` |
| `--surface` | `#f9f9fd` | `bg-surface` |
| `--surface-dim` | `#d9dade` | `bg-surface-dim` |
| `--primary` | `#000000` | `text-primary`, `bg-primary` |
| `--primary-container` | `#131b2e` | deep navy panel bg |
| `--on-primary` | `#ffffff` | white text on dark |
| `--secondary` | `#775a19` | gold/bronze accents |
| `--secondary-container` | `#fed488` | gold tint bg |
| `--champagne-glint` | `#E2D1B0` | decorative gold |
| `--deep-navy-obsidian` | `#080C14` | near-black footer/nav |
| `--success-emerald` | `#064E3B` | status badges |
| `--surface-muted` | `#F1F5F9` | muted section bg |
| `--border` | `#e2e2e6` | borders/dividers |

The Onyx & Bronze variant skews darker and warmer (bronze/gold tones) compared to the original navy-focused scheme. The changes are primarily in surface contrast and accent warmth.

### 3.2 Typography

| Level | Font | Size | Weight | Line Height | Letter Spacing |
|-------|------|------|--------|-------------|----------------|
| `display-lg` | Montserrat | 48px (32px mobile) | 700 | 56px (40px) | -0.02em |
| `headline-md` | Montserrat | 30px | 600 | 38px | -0.01em |
| `headline-sm` | Montserrat | 24px | 600 | 32px | normal |
| `body-lg` | Inter | 18px | 400 | 28px | normal |
| `body-md` | Inter | 16px | 400 | 24px | normal |
| `label-caps` | Inter | 12px | 700 | 16px | 0.1em |

Implement as `tailwind.config` `fontSize` extensions under `theme.extend.fontSize`.

### 3.3 Spacing System

Base unit: **8px**

| Token | Value |
|-------|-------|
| Container max-width | 1200px |
| Section gap (vertical) | 120px |
| Gutter | 24px |
| Margin desktop | 64px |
| Margin mobile | 16px |

### 3.4 Shapes (Border Radius)

| Token | Value |
|-------|-------|
| Default | `0.25rem` (4px) |
| Cards/buttons | `0.25rem` |
| Full | `9999px` (badges) |

No heavy shadows — use 1px subtle borders and tonal layering for depth.

---

## 4. Component Tree — Homepage

```
RootLayout (__root.tsx)
├── <head> — SEO meta, fonts, favicon
├── <body>
│   ├── Navbar (sticky top bar, deep-navy-obsidian bg)
│   │   ├── Logo (SVG from Stitch design)
│   │   ├── NavLinks — Home, Projects, About Us, Services, Contact
│   │   ├── WhatsApp CTA button (floating fixed)
│   │   └── Mobile hamburger menu
│   │
│   ├── main
│   │   ├── HeroSection
│   │   │   ├── Full-bleed background image (drone shot / render)
│   │   │   ├── Headline (display-lg): "Your Trusted Address for Quality Living"
│   │   │   ├── Subheadline (body-lg): Timely Handover, Premium Quality Construction
│   │   │   ├── Primary CTA: "View Projects" → /projects
│   │   │   └── Secondary CTA: "Contact Us" → /contact
│   │   │
│   │   ├── TrustBar
│   │   │   ├── TrustBadge (RAJUK certified, ISO, etc.)
│   │   │   ├── StatsCounter (X Years, Y Projects, Z Clients)
│   │   │   └── Horizontal layout, muted surface bg
│   │   │
│   │   ├── FeaturedProjects
│   │   │   ├── Section heading (headline-md)
│   │   │   ├── ProjectGrid (2×2 or 3-column)
│   │   │   │   └── ProjectCard × 4
│   │   │   │       ├── Full-bleed image (aspect-ratio locked)
│   │   │   │       ├── Status badge (label-caps): "Ongoing"
│   │   │   │       ├── Project name (headline-sm)
│   │   │   │       ├── Location (body-md)
│   │   │   │       └── CTA: "View Details"
│   │   │   └── "View All Projects" link
│   │   │
│   │   ├── AboutPreview
│   │   │   ├── Side-by-side: image + text
│   │   │   ├── Headline: "About Us"
│   │   │   ├── Body text describing company values
│   │   │   ├── Timeline/Process: vertical stepper with gold connector lines
│   │   │   └── CTA: "Learn More"
│   │   │
│   │   ├── ServicesSection
│   │   │   ├── Section heading
│   │   │   ├── ServiceCard × 4 (grid)
│   │   │   │   ├── Icon
│   │   │   │   ├── Title
│   │   │   │   └── Description
│   │   │   └── Land Development, Architecture, Construction, Interior
│   │   │
│   │   ├── Testimonials
│   │   │   ├── Carousel/slider
│   │   │   ├── Client quote card
│   │   │   └── Navigation dots/arrows
│   │   │
│   │   ├── CtaBanner
│   │   │   ├── Full-width banner, deep-navy-obsidian bg
│   │   │   ├── "Find Your Dream Property Today"
│   │   │   ├── Gold accent CTA button
│   │   │   └── WhatsApp quick link
│   │   │
│   │   └── ContactPreview
│   │       ├── Quick contact form (name, phone, email, message)
│   │       ├── Office address(es)
│   │       └── Map placeholder / iframe
│   │
│   ├── Footer (deep-navy-obsidian bg)
│   │   ├── Logo + tagline
│   │   ├── Quick links
│   │   ├── Contact info (phone, email, address)
│   │   ├── Social media icons
│   │   └── Copyright
│   │
│   └── WhatsAppFloat (fixed bottom-right)
│       └── Click-to-chat link
```

---

## 5. shadcn/ui Components to Use

Core shadcn components (install via `npx shadcn@latest add <name>`):

| Component | Usage |
|-----------|-------|
| `button` | CTA buttons, form submit |
| `card` | Project cards, service cards, testimonial cards |
| `badge` | Project status labels ("Ongoing", "Completed") |
| `input` | Contact form fields |
| `textarea` | Contact form message |
| `form` | Contact form wrapper + validation |
| `carousel` | Testimonial slider |
| `separator` | Section dividers |
| `dialog` | Consultation modal |
| `sheet` | Mobile navigation drawer |

Custom components to build:
- `ProjectCard` — image + badge + title + location + CTA
- `TrustBadge` — certification pill
- `StatItem` — animated counter
- `TimelineStepper` — vertical/horizontal progress
- `ServiceCard` — icon + title + description
- `Navbar` — responsive top nav
- `Footer` — site footer
- `WhatsAppFloat` — floating action button

---

## 6. Data Layer (Prisma + NeonDB)

### 6.1 Schema (for reference — Phase 2+)

```prisma
model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  location    String?
  status      String   // ONGOING, UPCOMING, COMPLETED
  images      String[] // URLs
  handoverAt  DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Service {
  id          String @id @default(cuid())
  title       String
  description String
  icon        String
  order       Int
}

model TeamMember {
  id    String @id @default(cuid())
  name  String
  role  String
  image String
  bio   String?
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  phone     String
  email     String?
  message   String
  createdAt DateTime @default(now())
}
```

### 6.2 Phase 1 — Static Data

For the initial static homepage, project/service/team data lives in `app/data/` as TypeScript constants:

```
app/data/
├── projects.ts    → Project[]
├── services.ts    → Service[]
├── testimonials.ts → Testimonial[]
└── team.ts        → TeamMember[]
```

This allows the homepage to render without a database. Migrating to Prisma later requires only swapping data fetchers — the component interfaces remain the same.

---

## 7. Route Implementation (Phase 1)

### `app/routes/__root.tsx`
- Wraps all pages in `<RootLayout>` containing `<Navbar>` and `<Footer>`
- Imports fonts (Montserrat + Inter from Google Fonts via `<link>` in `head`)
- Sets `<html lang="en">`
- Injects global CSS overrides (design tokens)

### `app/routes/index.tsx`
- Assembles sections in order: Hero → TrustBar → FeaturedProjects → AboutPreview → Services → Testimonials → CTA → ContactPreview
- All data imported from `app/data/` constants
- Fully static — no server data fetching needed for Phase 1

---

## 8. File Structure (Phase 1)

```
shaon-landmark/
├── app/
│   ├── routes/
│   │   ├── __root.tsx
│   │   └── index.tsx
│   ├── components/
│   │   ├── ui/              (shadcn primitives)
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   └── root-layout.tsx
│   │   ├── home/
│   │   │   ├── hero-section.tsx
│   │   │   ├── trust-bar.tsx
│   │   │   ├── featured-projects.tsx
│   │   │   ├── about-preview.tsx
│   │   │   ├── services-section.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── cta-banner.tsx
│   │   │   └── contact-preview.tsx
│   │   └── shared/
│   │       ├── project-card.tsx
│   │       ├── trust-badge.tsx
│   │       ├── stat-item.tsx
│   │       ├── service-card.tsx
│   │       ├── timeline-stepper.tsx
│   │       ├── whatsapp-float.tsx
│   │       └── section-heading.tsx
│   ├── data/
│   │   ├── projects.ts
│   │   ├── services.ts
│   │   ├── testimonials.ts
│   │   └── team.ts
│   ├── lib/
│   │   └── utils.ts          (shadcn cn() utility)
│   ├── config.ts             (site config, social links, etc.)
│   └── styles/
│       └── app.css           (Tailwind directives + design tokens)
├── public/
│   ├── images/               (hero, project photos, team)
│   └── favicon.ico
├── prisma/
│   └── schema.prisma         (for Phase 2+)
├── .env                      (DATABASE_URL)
├── app.config.ts             (TanStack Start config)
├── components.json           (shadcn config)
├── tailwind.config.ts        (design token extensions)
├── tsconfig.json
└── package.json
```

---

## 9. Implementation Order (Phase 1)

| Step | Task | Est. Time |
|------|------|-----------|
| 1 | Scaffold TanStack Start project | 5 min |
| 2 | Install & configure shadcn/ui | 10 min |
| 3 | Configure Tailwind with design tokens (colors, fonts, spacing, shapes) | 15 min |
| 4 | Set up `app/config.ts` + `app/data/*` constants | 15 min |
| 5 | Build `Navbar` component | 30 min |
| 6 | Build `Footer` + `WhatsAppFloat` | 20 min |
| 7 | Wire up `RootLayout` in `__root.tsx` | 10 min |
| 8 | Build `HeroSection` | 30 min |
| 9 | Build `TrustBar` + `StatItem` + `TrustBadge` | 20 min |
| 10 | Build `ProjectCard` + `FeaturedProjects` section | 30 min |
| 11 | Build `TimelineStepper` + `AboutPreview` | 25 min |
| 12 | Build `ServiceCard` + `ServicesSection` | 20 min |
| 13 | Build `Testimonials` carousel | 25 min |
| 14 | Build `CtaBanner` | 15 min |
| 15 | Build `ContactPreview` (static form, map placeholder) | 20 min |
| 16 | Assemble all sections in `index.tsx` | 10 min |
| 17 | Add images to `public/images/` + wire up | 15 min |
| 18 | Verify — `npm run dev`, check layout, responsiveness | 15 min |

**Total estimated: ~5-6 hours**

---

## 10. Notes & Decisions

- **"Onyx & Bronze" variant** uses darker surface tones and warmer bronze/gold accents compared to the original navy-focused scheme. The homepage follows this darker, more premium aesthetic.
- **No i18n.** All content is in English. Hardcoded in components/data files.
- **Better Auth** is installed at scaffold time but wired in a later phase (auth routes, middleware, protected pages).
- **Prisma** schema is created now but only populated and queried when pages go dynamic (Phase 2+).
- **WhatsApp integration** is critical — a floating FAB with `wa.me` link, plus a phone field in every form.
- **Images** need to be sourced: hero drone shot, project photos, team headshots. Placeholders used initially.
- **Fonts** (Montserrat + Inter) loaded from Google Fonts via `<link>` in the root layout head.
