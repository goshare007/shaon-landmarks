# Shaon Landmarks & Housing — Codebase Analysis & Improvement Plan

**Generated:** 2026-06-04  
**Project:** Shaon Landmarks & Housing  
**Tech Stack:** TanStack Start, React 19, Tailwind CSS v4, shadcn/ui, Framer Motion, TypeScript  
**Status:** Phase 1 — Static site with 6 route pages  
**Design System:** Onyx & Bronze (Minimalist Editorial)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Critical Bugs](#2-critical-bugs)
3. [Medium-Priority Bugs](#3-medium-priority-bugs)
4. [Minor Issues](#4-minor-issues)
5. [Missing Pages](#5-missing-pages)
6. [Missing Features](#6-missing-features)
7. [UX & Polish Improvements](#7-ux--polish-improvements)
8. [Code Quality & Architecture](#8-code-quality--architecture)
9. [Recommended Priority Order](#9-recommended-priority-order)

---

## 1. Project Overview

| Aspect | Detail |
|--------|--------|
| **Root directory** | `shaon-landmark/` |
| **Pages built** | Home (`/`), About (`/about`), Contact (`/contact`), Portfolio (`/portfolio`), Services (`/services`), Sustainability (`/sustainability`) |
| **Home sections** | HeroSection, PillarsSection, FeaturedProjects, SustainabilitySection, TestimonialSection, TrustStats, CtaSection |
| **Data layer** | Static TypeScript constants in `src/data/` (projects, pillars, testimonials) |
| **UI library** | shadcn/ui primitives in `src/components/ui/` (badge, button, card — only 3 components) |
| **Backend** | None — no server functions, no database, no auth |
| **Testing** | Vitest configured but zero test files |

### Current Routes

```
src/routes/
├── __root.tsx              Root layout (html, head, Header, Footer, devtools)
├── index.tsx               Home page
├── about.tsx               About Us (hero, story, mission/vision, leadership, certifications)
├── contact.tsx             Contact (hero, consultation form, locations, CTA)
├── portfolio.tsx           Portfolio (hero, filter tabs, project grid)
├── services.tsx            Services (hero, bento grid, process steps, CTA)
└── sustainability.tsx      Sustainability (hero, philosophy, three pillars, certifications, CTA)
```

---

## 2. Critical Bugs

### 2.1 —— Duplicate/identical project images

**Files:** `src/data/projects.ts`, `src/routes/portfolio.tsx`, `src/components/home/featured-projects.tsx`

Four image constants are defined but many are duplicates:

| Constant | URL | Shared With |
|----------|-----|-------------|
| `HERO_IMAGE` | `...aida-public/AB6AXuC8Bwo...` | Also used as `PROJ_IMAGE_3` |
| `PROJ_IMAGE_1` | `...aida-public/AB6AXuCPgx4...` | Also used as `PROJ_IMAGE_4` |
| `PROJ_IMAGE_2` | `...aida-public/AB6AXuDH0UU...` | Unique |
| `PROJ_IMAGE_3` | Same as `HERO_IMAGE` | Duplicate |
| `PROJ_IMAGE_4` | Same as `PROJ_IMAGE_1` | Duplicate |

**Impact:** On the portfolio page and home page featured grid, multiple projects show the same image. This undermines the premium brand image.

**Fix:** Source unique images for each project, or at minimum assign separate AIDA-public URLs per project.

---

### 2.2 —— Duplicate sustainability images on homepage

**File:** `src/components/home/sustainability-section.tsx`

All three sustainability cards use `HERO_IMAGE` as their background image. The three items (Sustainable Materials, Green Spaces, Energy Efficiency) are visually indistinguishable.

**Fix:** Assign distinct images per card.

---

### 2.3 —— Mobile hamburger button does nothing

**File:** `src/components/Header.tsx`

```tsx
<button
  type="button"
  className="flex h-8 w-8 items-center justify-center text-on-tertiary md:hidden"
  aria-label="Menu"
>
  {/* hamburger SVG icon */}
</button>
```

There is no state tracking whether the menu is open, no slide-out drawer/sheet rendered, and no click handler beyond the default form submission. On mobile, tapping the hamburger icon does nothing — navigation links are completely inaccessible.

**Fix:** Implement a mobile navigation drawer (using shadcn's `Sheet` component or a custom slide-out panel) with the same nav links.

---

### 2.4 —— All forms are dead ends

**Files:**
- `src/routes/contact.tsx` (Consultation Request form)
- `src/components/home/cta-section.tsx` (CTA form)
- `src/components/Footer.tsx` (Newsletter form)

Every form uses the following pattern:

```tsx
<form onSubmit={(e) => e.preventDefault()}>
  {/* inputs, select, textarea */}
  <button type="submit">Submit</button>
</form>
```

No form state management, no validation, no API call, no user feedback (toast, success message, error state). Filling any form and hitting submit silently does nothing.

**Fix:** Implement server functions (TanStack Start `createServerFn`) or at minimum client-side `console.log` + toast feedback. Long-term, persist submissions to a database.

---

## 3. Medium-Priority Bugs

### 3.1 —— All footer links use `href="#"`

**File:** `src/components/Footer.tsx`

- "About Us", "Our Portfolio", "Sustainability", "Careers" — all link to `#`
- "RAJUK Certified", "REHAB Member", "Legal Disclosures", "Privacy Policy" — all link to `#`
- Social icons (Leaderboard, Camera, Link) — all link to `#`

Additionally, the social icon SVGs don't represent real social media platforms (they're generic Material Symbols: `leaderboard`, `camera`, `link`). The aria-labels are "Leaderboard", "Camera", "Link" — not Facebook, LinkedIn, Instagram, etc.

**Fix:** Replace with TanStack Router `<Link>` components for internal routes, real URLs for external links, and proper social media icons (Facebook, LinkedIn, Instagram, YouTube).

---

### 3.2 —— Hero CTA links nowhere

**File:** `src/components/home/hero-section.tsx`, line:

```tsx
<motion.a href="#" ...>Explore Portfolio</motion.a>
```

The primary call-to-action on the entire site links to `#`.

**Fix:** Change `href` to `"/portfolio"`.

---

### 3.3 —— "View All Projects" links nowhere

**File:** `src/components/home/featured-projects.tsx`

Both the desktop and mobile "View All Projects" buttons use `href="#"`.

**Fix:** Change to `href="/portfolio"`.

---

### 3.4 —— About page "View Our Portfolio" is a dead button

**File:** `src/routes/about.tsx`

```tsx
<motion.button type="button" ...>
  View Our Portfolio
  <span>arrow_forward</span>
</motion.button>
```

This is a `<button>` with no `onClick` handler. It does nothing when clicked.

**Fix:** Either convert to a TanStack Router `<Link>` or add `onClick` navigation.

---

### 3.5 —— Testimonial data file unused

**File:** `src/data/testimonials.ts` exports a typed `Testimonial[]` array, but `src/components/home/testimonials.tsx` hardcodes the quote text inline. The data file is dead code.

**Fix:** Import `testimonials` from the data file in the component and render dynamically (which also enables future carousel/multiple testimonials).

---

### 3.6 —— `gap-gutter` is an undefined Tailwind utility

**Files:** `src/routes/about.tsx` (line), `src/routes/contact.tsx` (line)

```tsx
<div className="grid gap-gutter md:grid-cols-12">
```

The plan.md mentions `gutter: 24px`, but no `--spacing-gutter` is defined in `src/styles.css` or any Tailwind theme. `gap-gutter` will resolve to nothing, producing a 0px gap.

**Fix:** Either define `@property --spacing-gutter` in the Tailwind theme, or replace with a standard gap like `gap-6`.

---

### 3.7 —— Project portfolio cards have no click handler

**File:** `src/routes/portfolio.tsx`

Cards display "View Landmark" text with an arrow icon, but nothing happens when clicked. There's no `onClick`, no `<Link>` wrapper, and no destination route.

**Fix:** Wrap each card in a TanStack Router `<Link to="/portfolio/$slug" params={{ slug: project.slug }}>`.

---

### 3.8 —— "Load More Landmarks" button is cosmetic

**File:** `src/routes/portfolio.tsx`

```tsx
<p>Viewing {filtered.length} of {allProjects.length} projects</p>
<button type="button">Load More Landmarks</button>
```

All projects are always rendered. The button does nothing. No pagination or lazy loading exists.

**Fix:** Either implement actual pagination (show N items, load more on click), or remove the button and show all projects.

---

## 4. Minor Issues

| # | Issue | File | Detail |
|---|-------|------|--------|
| 4.1 | `ThemeToggle` is a null-returning stub | `src/components/ThemeToggle.tsx` | Returns `null`. Not imported anywhere. Dead code. |
| 4.2 | All images are remote Google-hosted | Every page | Served from `lh3.googleusercontent.com/aida-public/...`. No local fallback. If the CDN goes down, the site loses all visuals. |
| 4.3 | Manifest.json still references "Create TanStack App Sample" | `public/manifest.json` | PWA manifest hasn't been updated for the Shaon Landmarks brand. |
| 4.4 | `TanStackDevtools` plugin config may be incorrect | `src/routes/__root.tsx` | `@tanstack/react-devtools` is for React Query, but `@tanstack/react-query` is not installed. Router devtools panel may not render correctly. |

---

## 5. Missing Pages

The `doc/plan.md` outlines several pages that have not been implemented.

| Missing Page | Route | Plan Ref | Priority | Notes |
|-------------|-------|----------|----------|-------|
| **Project Detail** | `/portfolio/$slug` | §2 | 🔴 **High** | Portfolio cards are unclickable — no detail page exists. Each project needs a full page with gallery, specs, status, and inquiry CTA. |
| **Careers** | `/career` | §2 | 🟢 Medium | Footer has a "Careers" link (broken). Plan includes a careers/jobs page. |
| **Consultation** | `/consultation` | §2 | 🟢 Medium | Dedicated private consultation form page was planned separately from the contact page. |
| **About Preview** | (home section) | §4 | 🟡 Medium | Plan describes an "About Preview" on the home page between FeaturedProjects and Services. Not present in `index.tsx`. |
| **Services Section** | (home section) | §4 | 🟡 Medium | Plan includes 4 service cards (Land Development, Architecture, Construction, Interior) on the home page. Not present. |
| **Contact Preview** | (home section) | §4 | 🟢 Low | Plan includes a quick contact form with office address and map placeholder on the home page. The current CTA section is different. |
| **404 / Not Found** | — | — | 🟡 **High** | Typing any unknown route will likely crash. No custom 404 page exists. |

### Route Architecture (Planned vs Actual)

**Planned:**
```
app/routes/
├── __root.tsx
├── index.tsx               ← ✓ Done
├── projects/
│   ├── index.tsx           ← Named portfolio.tsx (different location)
│   └── $slug.tsx           ← ✗ Missing
├── about.tsx               ← ✓ Done
├── services.tsx            ← ✓ Done
├── contact.tsx             ← ✓ Done
├── career.tsx              ← ✗ Missing
└── consultation.tsx        ← ✗ Missing
```

**Actual:**
```
src/routes/
├── __root.tsx
├── index.tsx
├── about.tsx
├── contact.tsx
├── portfolio.tsx           ← renamed from projects/
├── services.tsx
└── sustainability.tsx      ← extra page (not in original plan but built)
```

---

## 6. Missing Features

### 6.1 —— Form submission handling

No form on the site actually captures or processes data. Needed actions:

- **Contact form** → send email notification or store in DB
- **CTA consultation form** → same
- **Newsletter signup** → store email for mailing list

**Recommended approach:** Use TanStack Start's `createServerFn` to handle form submissions server-side. At minimum, implement a `POST` handler that logs/emails the data and returns a success response.

### 6.2 —— Server functions / API routes

The project is a TanStack Start (SSR) application but has zero server-side logic. All data is static TypeScript constants. Needed:

- Form submission endpoints
- (Future) Project data API for dynamic content
- (Future) Authentication endpoints

### 6.3 —— SEO meta per route

Only the root layout (`__root.tsx`) sets `<title>` and `<meta name="description">`. Individual routes do not override these. Every page shares the same title and description, which is bad for SEO.

**Fix:** Add `head: () => ({ meta: [...] })` to each route's `createFileRoute` call.

### 6.4 —— Image optimization

- All images are full-resolution originals from Google's CDN
- No `<img loading="lazy">` attributes
- No responsive image sets (`srcSet`)
- No local optimized copies

### 6.5 —— Sitemap & robots.txt

`robots.txt` exists in `public/` but is the default TanStack boilerplate. No `sitemap.xml` exists.

### 6.6 —— WhatsApp integration

The plan emphasizes WhatsApp integration as "critical":
- Floating WhatsApp button (fixed bottom-right)
- Click-to-chat link (`wa.me`)

The Contact page has a WhatsApp CTA section, but no persistent floating button exists across the site.

### 6.7 —— Error boundaries

No route-level error boundaries or 404 page. If any route throws during rendering, the user sees a white screen.

---

## 7. UX & Polish Improvements

| # | Suggestion | Detail |
|---|-----------|--------|
| 7.1 | **Animated stat counters** | TrustStats shows "15+", "25+", "500+". A count-up animation on scroll would add impact. |
| 7.2 | **Testimonial carousel** | Only 1 testimonial is shown. A carousel with dots/arrows (as planned) would make the section more dynamic. |
| 7.3 | **Smooth scroll between sections** | CTAs like "Explore Portfolio" and "View Our Portfolio" should use smooth scrolling or navigation. |
| 7.4 | **Loading states / route transitions** | Route navigation currently has no loading indicator. TanStack Router supports pending/loading states. |
| 7.5 | **Keyboard accessibility** | Forms lack `required` attributes, error messages, and proper focus management. Mobile menu inaccessibility is critical. |
| 7.6 | **Descriptive image alt text** | Most images use `alt=""` (decorative). Project images should have descriptive alt text for SEO and screen readers. |
| 7.7 | **Active nav link styling** | Header uses `activeProps` for text color, but no persistent visual indicator of the current page beyond a subtle color change. |
| 7.8 | **Touch targets on mobile** | Navigation links, buttons, and form inputs should have adequate touch target sizes (minimum 44×44px). |

---

## 8. Code Quality & Architecture

### 8.1 —— Hardcoded image URLs scattered across 10+ files

| File | Number of Image URLs |
|------|---------------------|
| `src/data/projects.ts` | 5 constants |
| `src/routes/about.tsx` | 3 URLs |
| `src/routes/contact.tsx` | 3 URLs |
| `src/routes/portfolio.tsx` | 1 URL |
| `src/routes/services.tsx` | 5 URLs |
| `src/routes/sustainability.tsx` | 1 URL |
| `src/components/home/hero-section.tsx` | 1 URL |
| `src/components/home/featured-projects.tsx` | (uses data/projects) |
| `src/components/home/sustainability-section.tsx` | 1 URL (3 cards using same one) |

**Recommendation:** Centralize all image URLs in a config file or the data files. Avoid raw URL strings in components.

### 8.2 —— Duplicated Framer Motion animation variants

The following animation variant objects are redefined in almost every file:

```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.15, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
```

**Recommendation:** Extract to `src/lib/animations.ts` and import where needed.

### 8.3 —— Redundant project card markup

The featured-projects component renders 5 project cards with nearly identical JSX (~50 lines per card). The portfolio page also renders cards with similar structure.

**Recommendation:** Create a shared `<ProjectCard>` component in `src/components/shared/`.

### 8.4 —— Empty `src/components/shared/` directory

The plan calls for several shared components that don't exist:

- `ProjectCard`
- `ServiceCard`
- `TrustBadge`
- `StatItem`
- `WhatsAppFloat`
- `SectionHeading`

**Recommendation:** Extract common patterns into shared components.

### 8.5 —— Inconsistent color values

Some places use theme CSS variables correctly (`text-on-surface-variant`), while others use hardcoded hex values:

| Value | Used At |
|-------|---------|
| `text-[#d6d8d8]` | Hero section, portfolio hero |
| `text-[#9a9c9c]` | Footer, sustainability CTA |
| `bg-[#454747]` | Footer divider |

**Recommendation:** Replace arbitrary hex values with the appropriate theme token from `styles.css` or add new tokens if needed.

### 8.6 —— Zero tests

`package.json` includes `"test": "vitest run"`, and the project has `vitest`, `@testing-library/react`, `@testing-library/dom`, and `jsdom` as devDependencies. But there are no test files anywhere.

**Recommendation:** Add at minimum:
- Unit tests for utility functions (`cn()` in `lib/utils.ts`)
- Smoke tests for each route renders without crashing
- Accessibility tests for forms and navigation

### 8.7 —— TypeScript strictness gaps

- All image URLs are plain `string` with no type safety
- Animation variant objects lack proper typing
- Form state is untyped

---

## 9. Recommended Priority Order

### Phase A — Critical Fixes (Do First)

| Order | Task | Est. Time | Files Affected |
|-------|------|-----------|----------------|
| 1 | Fix duplicate images — assign unique images per project and sustainability card | 30 min | `src/data/projects.ts`, `src/components/home/sustainability-section.tsx` |
| 2 | Implement mobile navigation drawer | 1 hr | `src/components/Header.tsx` + new mobile nav component |
| 3 | Wire all `href="#"` to real routes | 20 min | Header, Footer, Hero CTA, FeaturedProjects CTA, About button |
| 4 | Add 404 / not-found route + error boundary | 30 min | New `src/routes/404.tsx` or `notFoundRoute` |

### Phase B — Functionality

| Order | Task | Est. Time | Files Affected |
|-------|------|-----------|----------------|
| 5 | Build Project Detail page (`/portfolio/$slug`) | 1.5 hr | New route + data plumbing |
| 6 | Add form submission handling (server functions) | 1.5 hr | Contact, CTA, Footer forms + new server functions |
| 7 | Implement WhatsApp floating button | 30 min | New shared component |
| 8 | Add SEO meta per route | 30 min | Each route file |

### Phase C — Content & Polish

| Order | Task | Est. Time | Files Affected |
|-------|------|-----------|----------------|
| 9 | Add missing homepage sections (AboutPreview, ServicesSection) | 1 hr | New components, updated `index.tsx` |
| 10 | Extract shared components (ProjectCard, SectionHeading, etc.) | 1 hr | New files in `shared/` |
| 11 | Extract animation variants to `lib/animations.ts` | 20 min | `src/lib/animations.ts` |
| 12 | Replace arbitrary hex colors with theme tokens | 30 min | Several component files |
| 13 | Add loading states and route transition animations | 30 min | Router config + components |

### Phase D — Foundation

| Order | Task | Est. Time | Files Affected |
|-------|------|-----------|----------------|
| 14 | Add unit/smoke tests | 1 hr | New test files |
| 15 | Fix `gap-gutter` to use defined value | 10 min | `about.tsx`, `contact.tsx`, `styles.css` |
| 16 | Update `manifest.json` for brand identity | 10 min | `public/manifest.json` |
| 17 | Add image optimization (lazy loading, responsive) | 1 hr | Component updates |
| 18 | Add Careers page + sitemap | 1 hr | New route + `public/sitemap.xml` |
