# Shaon Landmarks — Full Project Audit (2026-06-19)

> **Stack:** TanStack Start + React 19 + TanStack Router + Tailwind CSS v4 + GSAP  
> **Domain:** Real Estate — Bangladesh market  
> **Codebase:** ~12 routes, ~30 components, 6 projects  
> **Audit scope:** Bugs, performance, SEO, accessibility, code quality, UX, security, build

---

## 🟣 Feature Gaps

_1 item remaining. ~~12~~ 11 completed._### F7. No Blog / News Section

No content marketing infrastructure. No `/blog` route, no blog data schema, no components. Real estate benefits from area guides, market trends, project updates.

**Fix:** Create blog data types and mock data (6–8 articles). Set up route `/blog` (index) + `/blog/$slug` (detail). Build index page with card grid, detail page with article layout + breadcrumbs. Add article JSON-LD schema. Add blog link to navigation. Requires full route + component + data buildout.

**Effort:** ~1 week

## ⚪ Visual & UX

### U1. Inconsistent Focus Indicators

Some interactive elements use `focus-visible:outline-2` (mobile menu, form inputs) while others rely on browser defaults (footer links, nav items, card links). Audit all interactive elements for consistent focus rings.

### U2. Color Contrast Check Needed

Key pairs to verify against WCAG AA 4.5:1:

- `text-on-surface-variant (#444748)` on `surface (#f9f9f9)` — should pass but verify
- `text-on-surface-variant` on `surface-container-low (#f3f3f3)` — borderline
- White text on secondary/accent backgrounds
- Placeholder text colors

---

## 🏗 Build & Config

### C1. `nitro` Explicit Dependency (Version Mismatch Risk)

**File:** `package.json` — `nitro: ^3.0.260603-beta` as explicit dependency while TanStack Start bundles its own Nitro version. If versions diverge, unpredictable build behavior.

### C2. `components.json` Paths May Be Wrong

Verify `components.json` uses correct path aliases for this project structure (not from a generic shadcn template).

### C3. Biome Excludes `src/styles.css` from Formatting

**File:** `biome.json` — excludes `src/styles.css`. Tailwind v4 CSS with `@theme`, `@utility` would benefit from formatting. Consider removing exclusion or adding CSS-specific config.

### C4. Build Script Runs Sitemap Generation Every Time

`prebuild: bun run gen-sitemap` — sitemap regenerates every build, even when project data hasn't changed. Minor but unnecessary I/O.

### C5. No Docker/Deployment Config

No Dockerfile, deploy script, or CI config in repo. Makes reproducing production environment harder.

### C6. No Environment Variable Validation

`WHATSAPP_NUMBER` and `SITE_URL` read from `import.meta.env` / `process.env` without runtime validation. Missing env vars silently fall back to defaults (test phone number, vercel.app URL).

### C7. README Still Template Boilerplate

**File:** `README.md` — still contains TanStack Start template content ("Removing Tailwind CSS" section, demo files instructions).

### C8. `sharp` in devDependencies But No Image Pipeline

Sharp is installed but no build-time image optimization pipeline. Images are manually converted to WebP format without automated resizing, compression, or responsive breakpoints.

---

## 🛡️ Security

### SEC1. Form Has No CSRF Protection

Server functions have no CSRF token validation. While TanStack Start's server functions handle some security, forms are vulnerable to cross-site request forgery.

### SEC2. Rate Limiting Uses In-Memory Map

`submissionTimestamps` Map resets on every cold start. IP-based rate limiting not implemented (relies on email address which users can change).

### SEC3. No Input Length Limit on Server Side

Zod schema validates lengths, but `sanitize-html` runs after validation. If Zod is bypassed (e.g., direct API call), raw HTML could pass through. Add length check in server handler.

### SEC4. No HTTPS Enforcement

No `Strict-Transport-Security` header or HTTPS redirect config visible. Vercel handles this by default, but not documented.

### SEC5. No Content Security Policy

No CSP headers or meta tags. Leaves site vulnerable to XSS if any user content is rendered (currently none, but future blog/comments).

---

## 🧪 Testing

### T1. Vitest Close Timeout After Test Run

After `bun test` passes, Vitest reports a close timeout. Pre-existing issue, doesn't affect results but noisy.

### T2. `ReferenceError: module is not defined` on Test Start

Pre-existing React CJS/ESM interop noise. 19/19 tests pass despite warning.

### T3. No E2E Tests

No Playwright or Cypress tests for critical user flows: form submission, portfolio navigation, mobile menu, filter interactions.

### T4. Test Files Import Ordering

Tests import from relative paths (`./seo`, `./forms`, `./utils`) which works but could break if file structure changes. Use path aliases.

---

## 📋 Priority Action Plan

### 🔴 P0 — Fix Now (1-2 hrs)

| ID  | Item | Effort | Impact |
| --- | ---- | ------ | ------ |

### 🟢 P2 — Medium Priority (8-16 hrs)

| ID  | Item                                         | Effort | Impact          |
| --- | -------------------------------------------- | ------ | --------------- |
| U1  | Consistent focus indicators audit | 2 hrs | Accessibility |

### 🔵 P3 — Longer Term (16-40 hrs)

| ID  | Item                                       | Effort | Impact                 |
| --- | ------------------------------------------ | ------ | ---------------------- |
| F7  | Blog/news section with RSS, article schema | 1 week | Content marketing, SEO |
| C6  | Env var validation + error handling        | 1 hr   | Reliability            |
| T1  | Fix Vitest close timeout                   | 1 hr   | DX                     |

### ⚪ P4 — Polish (4-8 hrs)

| ID  | Item                                                 | Effort | Impact        |
| --- | ---------------------------------------------------- | ------ | ------------- |
| P6  | Preloader: non-blocking overlay or shorter animation | 1 hr   | UX            |
| C3  | Re-enable biome formatting on CSS                    | 15 min | Consistency   |
| C7  | Rewrite README                                       | 1 hr   | Documentation |

---

## Summary

**Top remaining priorities:**

1. **Blog/news section** (F7) — content marketing, SEO

**Recently completed:** F1 (lightbox), F2 (floor plans), F3 (interactive maps), F4 (EMI calculator), F5+F6 (analytics + cookie consent), F8 (route transitions), F9 (email notifications), F11 (project comparison), F12 (print-friendly pages), F10 replaced (simplified testimonial data file), U3 (WhatsApp FAB), U4 (hero parallax ticker), U5 (portfolio empty state), U6 (mobile menu exit animation), U7 (Lenis RAF cleanup), U8 (testimonial focus pause).

_Audit generated 2026-06-19. Items verified against current codebase state._
