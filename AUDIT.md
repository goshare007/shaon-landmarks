# Shaon Landmarks — Full Project Audit (2026-06-19)

> **Stack:** TanStack Start + React 19 + TanStack Router + Tailwind CSS v4 + GSAP  
> **Domain:** Real Estate — Bangladesh market  
> **Codebase:** ~12 routes, ~30 components, 6 projects  
> **Audit scope:** Bugs, performance, SEO, accessibility, code quality, UX, security, build

---

## 🟣 Feature Gaps

### F1. No Image Lightbox

Gallery images in `portfolio-detail-gallery.tsx` have cursor `cursor-crosshair` suggesting they should be clickable, but clicking does nothing. Users cannot see full-resolution images.

### F2. No Floor Plans

Each project has specs (totalArea, units, floorCount) but no floor plan images or downloadable PDFs. Critical missing feature for real estate.

### F3. No Interactive Location Maps

Location sections use static `landmark-map.webp` image. No Google Maps / Leaflet integration. Missing: nearby amenities markers, transit info, street view, directions.

### F4. No EMI / Payment Calculator

Top conversion tool for real estate sites. Simple client-side calculator based on principal, rate, tenure.

### F5. No Analytics

No page views, conversion tracking, or user behavior measurement. Cannot measure:

- Which projects get most views
- Form conversion rates
- Traffic sources
- User flow

### F6. No Cookie Consent Banner

If analytics is added, GDPR/ePrivacy compliance requires consent. Add lightweight cookie banner.

### F7. No Blog / News Section

No content marketing. Real estate sites benefit from area guides, market trends, project updates, client stories.

### F8. No Page Transition Animations

GSAP + Lenis loaded but routes snap-change. TanStack Router could enable fade transitions via route `head` or `onBeforeLoad`.

### F9. Forms Are In-Memory Only

**File:** `forms.ts` — both contact and newsletter store nothing persistently. Resets on every deploy. No email notifications. Marked as "Phase B/D" but no timeline.

### F10. No Testimonials Admin / Dynamic Data

Testimonials are static data in `src/data/testimonials.ts`. No CMS integration or ability to add/edit remotely.

### F11. No Project Comparison Tool

Users can't compare specs across projects side-by-side.

### F12. No Print-Friendly Project Detail Pages

No print stylesheet for portfolio detail pages. Buyers often print property details.

---

## ⚪ Visual & UX

### U1. Inconsistent Focus Indicators

Some interactive elements use `focus-visible:outline-2` (mobile menu, form inputs) while others rely on browser defaults (footer links, nav items, card links). Audit all interactive elements for consistent focus rings.

### U2. Color Contrast Check Needed

Key pairs to verify against WCAG AA 4.5:1:

- `text-on-surface-variant (#444748)` on `surface (#f9f9f9)` — should pass but verify
- `text-on-surface-variant` on `surface-container-low (#f3f3f3)` — borderline
- White text on secondary/accent backgrounds
- Placeholder text colors

### U3. WhatsApp FAB May Obstruct Content

Fixed `bottom-6 right-6` FAB overlaps with:

- Footer on scroll
- Form submit buttons on mobile
- Mobile menu close button

Consider adding bottom margin to page content or adjusting position per viewport.

### U5. Hero Parallax Mouse Tracking Runs Continuously

`gsap.ticker.add(updateParallax)` runs every frame even when mouse hasn't moved. Consider only updating on mouse events and killing ticker when idle.

### U6. No Empty State for Portfolio Search

When filters match no projects, shows "No projects match your filters" with clear button. Functional but could show suggested projects or "try different criteria" guidance.

### U7. Mobile Menu Animation: No Exit Animation on Close

Open animation uses GSAP timeline (fade in + stagger items). Close just sets opacity 0 — no stagger-out animation. Feels abrupt.

### U8. Lenis Smooth Scroll — No Reduced Motion Check

`LenisScrollProvider` checks `prefers-reduced-motion` but only for initialization. No CSS `scroll-behavior: smooth` fallback or GSAP `reducedMotion` config.

### U9. Testimonial Autoplay No Pause on Focus

Carousel autoplay stops on `mouseEnter` but not on keyboard focus within the carousel. WCAG 2.2.2 requirement.

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

| ID  | Item                                                       | Effort | Impact                    |
| --- | ---------------------------------------------------------- | ------ | ------------------------- |


### 🟡 P1 — Important (4-8 hrs)

| ID  | Item                                                       | Effort | Impact                               |
| --- | ---------------------------------------------------------- | ------ | ------------------------------------ |
| F9  | Forms: add email notification (Resend/SendGrid)            | 2 hrs  | Business-critical                    |

### 🟢 P2 — Medium Priority (8-16 hrs)

| ID  | Item                                                    | Effort | Impact          |
| --- | ------------------------------------------------------- | ------ | --------------- |
| F1  | Image lightbox for galleries                            | 3 hrs  | UX              |
| F2  | Floor plan assets per project                           | 2 hrs  | Feature parity  |
| F4  | EMI calculator                                          | 3 hrs  | Conversion tool |
| F3  | Interactive maps (Leaflet)                              | 4 hrs  | UX, local SEO   |
| U1  | Consistent focus indicators audit                       | 2 hrs  | Accessibility   |
| U9  | Testimonial autoplay pause on keyboard focus            | 30 min | WCAG compliance |

### 🔵 P3 — Longer Term (16-40 hrs)

| ID  | Item                                       | Effort | Impact                 |
| --- | ------------------------------------------ | ------ | ---------------------- |
| F7  | Blog/news section with RSS, article schema | 1 week | Content marketing, SEO |
| F5  | Analytics + cookie consent                 | 2 hrs  | Data-driven decisions  |
| F8  | Page transition animations                 | 4 hrs  | UX polish              |
| F10 | Dynamic testimonials admin                 | 8 hrs  | Maintainability        |
| C6  | Env var validation + error handling        | 1 hr   | Reliability            |
| T1  | Fix Vitest close timeout                   | 1 hr   | DX                     |

### ⚪ P4 — Polish (4-8 hrs)

| ID  | Item                                                 | Effort | Impact        |
| --- | ---------------------------------------------------- | ------ | ------------- |
| P6  | Preloader: non-blocking overlay or shorter animation | 1 hr   | UX            |
| U6  | Portfolio empty state: suggested projects            | 1 hr   | UX            |
| U7  | Mobile menu exit animation                           | 1 hr   | UX polish     |
| C3  | Re-enable biome formatting on CSS                    | 15 min | Consistency   |
| C7  | Rewrite README                                       | 1 hr   | Documentation |

---

## Summary

**Top remaining priorities:**

1. **Forms: email notifications** (F9) — stop losing leads to in-memory store
2. **Image lightbox** (F1) — gallery images should be clickable
3. **Interactive maps** (F3) — replace static map images

**Biggest feature gap:** Forms are in-memory only (F9) — no email notification means lost leads.

_Audit generated 2026-06-19. Items verified against current codebase state._
