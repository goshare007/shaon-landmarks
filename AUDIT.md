# Shaon Landmarks — Full Project Audit (2026-06-19)

> **Stack:** TanStack Start + React 19 + TanStack Router + Tailwind CSS v4 + GSAP  
> **Domain:** Real Estate — Bangladesh market  
> **Codebase:** ~12 routes, ~30 components, 6 projects  
> **Audit scope:** Bugs, performance, SEO, accessibility, code quality, UX, security, build

---

## 🔴 Critical Bugs

### B1. `portfolio-hero.tsx` — Raw `import('gsap')` Instead of Shared Loader

**File:** `src/components/portfolio-index/portfolio-hero.tsx` (line 16)

Uses `import('gsap')` directly instead of `loadGsap()` from shared singleton loader. Every page visit creates a separate GSAP import chunk. Fix: import + use `loadGsap()`.

```tsx
// BUG
import('gsap').then(({ gsap }) => { ... });

// FIX
import { loadGsap } from '@/lib/gsap-loader';
loadGsap().then(({ gsap }) => { ... });
```

### B2. `cta-section.tsx` — Magnetic Button Raw GSAP Import

**File:** `src/components/home/cta-section.tsx` (line 117)

```tsx
useEffect(() => {
  if (!magneticPos.x && !magneticPos.y) return;
  import('gsap').then(({ gsap }) => { ... }); // BUG: separate chunk
}, [magneticPos]);
```

Every mouse move that triggers non-zero position creates a GSAP import. Should use `loadGsap()` from module-level or ref.

### B3. `smooth-scroll.tsx` — Raw Dynamic GSAP Imports Defeat Singleton

**File:** `src/lib/smooth-scroll.tsx` (line 27-29)

```tsx
const Lenis = (await import("lenis")).default;
const { gsap } = await import("gsap");
const { ScrollTrigger } = await import("gsap/ScrollTrigger");
```

Uses raw dynamic imports for GSAP, completely bypassing `loadGsap()` shared loader. This means GSAP loads twice (once via `loadGsap()` in components, once here). Fix: use `loadGsap()` and import Lenis separately.

### B4. `portfolio-hero.tsx` — CSS `backgroundImage` Instead of Optimized `<Image>` Component

**File:** `src/components/portfolio-index/portfolio-hero.tsx` (line 53)

```tsx
style={{ backgroundImage: `url(${HERO_IMG})` }}
```

Uses CSS background-image instead of `<Image>` from `@unpic/react`. Loses:

- Lazy loading (image always loads on mount)
- Responsive image breakpoints
- CLS optimization (no intrinsic dimensions)
- WebP format enforcement
- `loading="lazy"` / `fetchpriority="high"` control

Same bug in:

- `portfolio-detail-hero.tsx` (line 71)
- `sustainability-section.tsx` (line 133)
- `portfolio-grid.tsx` (line 251)

### B5. Footer Social Links — All Point to Generic URLs

**File:** `src/components/Footer.tsx` (lines 283-336)

```tsx
{ name: 'Facebook', href: 'https://facebook.com' },     // should be /shaonlandmarks
{ name: 'Instagram', href: 'https://instagram.com' },   // should be /shaonlandmarks
{ name: 'LinkedIn', href: 'https://linkedin.com' },     // should be /company/shaonlandmarks
{ name: 'Twitter', href: 'https://twitter.com' },       // should be @shaonlandmarks
```

All four social icon links point to homepage URLs, not the brand's actual profiles. Navigation data in `FooterSection` already has correct URLs for link text, but hardcoded icon array below duplicates wrong generic URLs. **Users clicking these go nowhere useful.**

### B6. `vite.config.ts` — `nitro()` + `tanstackStart()` Duplicate Plugin

**File:** `vite.config.ts` (line 10)

```tsx
plugins: [devtools(), tailwindcss(), tanstackStart(), nitro(), viteReact()],
```

TanStack Start v1 bundles Nitro internally. Adding both can cause duplicate plugin registration, conflicting build steps, or version incompatibility with the bundled Nitro.

### B7. `portfolio-hero.tsx` Has Unused `doneRef` — No Shared Loader

Component has `doneRef` pattern but never uses `loadGsap()`. If the raw import is replaced, `doneRef` would work. Currently `doneRef` guards nothing because the import path is different from all other components.

---

## 🟡 Performance

### P1. GSAP Loads Multiple Times (Defeats Singleton Purpose)

Three separate GSAP loading paths coexist:

1. `loadGsap()` — shared singleton (used by 12+ components)
2. Raw `import('gsap')` — `portfolio-hero.tsx`, `cta-section.tsx`
3. Raw `import('gsap')` + `import('gsap/ScrollTrigger')` — `smooth-scroll.tsx`

Each creates a separate chunk. In worst case, GSAP loads 3 times per page.

### P2. `@unpic/react` Images Missing Intrinsic Dimensions

**Files:** `portfolio-detail-gallery.tsx`, `hero-section.tsx`, `featured-projects.tsx`

```tsx
<Image src={...} alt="..." layout="fullWidth" />
```

Missing `width` + `height` attributes causes CLS as images load. Add intrinsic dimensions:

```tsx
<Image src={...} alt="..." layout="fullWidth" width={1200} height={800} />
```

### P3. CSS `backgroundImage` Components No Lazy Loading

Four components use CSS background images (see B4). These always load eagerly, even when below the fold. `sustainability-section.tsx` cards load all three background images on mount regardless of viewport position.

### P4. Hero Parallax Runs When Tab Hidden

**File:** `hero-section.tsx` (line 143)

```tsx
gsap.ticker.add(updateParallax);
```

`gsap.ticker` runs on `requestAnimationFrame` which fires even when tab is hidden. Add `document.hidden` check to kill ticker when not visible.

### P5. Material Symbols Full Font for ~10 Icons

`Material+Symbols+Outlined` font (~350KB woff2) loaded for ~10 icon usages (pillars, amenities, contact form cards). Lucide-React SVG icons (already a dependency) could replace all usages with ~5KB total. **Alternative:** Use `&text=` parameter to subset font to needed characters only.

### P6. Preloader Blocks Interaction for ~3.5s

**File:** `preloader.tsx` — ~3s animation sequence before user can interact. On repeat visits `sessionStorage` skips it, but first visit/incognito always blocks. Consider non-blocking overlay or shorter timeout.

### P7. No Image Lazy Loading on Gallery Below-Fold Images

Gallery images in `portfolio-detail-gallery.tsx` use Embla layout but no explicit `loading="lazy"`. Verify `@unpic/react` defaults — if not, add explicitly.

### P8. No Bundle Analysis / Code Splitting Audit

No bundle visualization or analysis run. With 6 projects in static data (~200 lines each), the data module is loaded on every page (even non-portfolio routes). Consider lazy-loading project data or code-splitting route data.

---

## 🔵 SEO

### S1. Missing `hreflang` Tags for Bengali Market

Bangladesh has ~98% Bengali speakers. Even with English content, `hreflang` signals target market. Add to `__root.tsx`:

```tsx
{ rel: 'alternate', hrefLang: 'bn', href: `${SITE_URL}/bn` },
{ rel: 'alternate', hrefLang: 'en', href: SITE_URL },
```

### S2. Missing `og:locale:alternate`

Add for social sharing:

```tsx
{ property: 'og:locale', content: 'en_US' },
{ property: 'og:locale:alternate', content: 'bn_BD' },
```

### S3. No `twitter:site` or `twitter:creator` Tags

Only `twitter:card` + `twitter:title` + `twitter:description` + `twitter:image` present. Add brand's Twitter handle.

### S4. Sitemap Missing Image Title/Caption

**File:** `scripts/generate-sitemap.ts` — image tags have `<image:loc>` but no `<image:title>` or `<image:caption>`. These improve Google Image search ranking.

### S5. Static Pages Missing From Sitemap

Pages exist for `/legal` and `/privacy` but these have priority 0.3 — while technically present, the low priority may signal less importance than warranted.

### S6. No `robots.txt` Allow/Disallow Rules Beyond Sitemap

Current `robots.txt` is minimal:

```
User-agent: *
Allow: /
Sitemap: https://...
```

Consider blocking `/projects` (301 redirect page) and any future admin routes.

### S7. No Breadcrumb JSON-LD on Inner Pages

Only `portfolio.$slug.tsx` includes breadcrumb structured data. About, Services, Career, Contact, Privacy, Legal pages lack breadcrumb schemas.

### S8. Meta Description Lengths Not Validated

Some descriptions exceed Google's ~160 character display limit. Verify all route descriptions with a character count check.

### S9. Missing `article:published_time` / `article:modified_time`

If blog/news added later. For now, not critical but noted for future.

---

## 🟠 Code Quality

### Q1. `doneRef` Anti-Pattern Used in 12+ Components

Every animated component repeats:

```tsx
const doneRef = useRef(false);
useEffect(() => {
  if (doneRef.current) return;
  doneRef.current = true;
  // ...
}, []);
```

This is a manual singleton guard that React patterns should handle. In StrictMode the second run is silently skipped. Prevents re-initialization on re-mount. **Fix:** Create shared `useOnce` hook:

```tsx
export function useOnce(fn: () => () => void) {
  const doneRef = useRef(false);
  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    return fn();
  }, []);
}
```

**Affected components:** HeroSection, FeaturedProjects, Testimonials, PillarsSection, SustainabilitySection, CtaSection, TrustStats, ContactForm, Footer, WhatsAppFab, Preloader, MobileMenu, PortfolioHero, PortfolioDetailHero, PortfolioDetailGallery, PortfolioGrid

### Q2. `forms.test.ts` Duplicates Source Code

**File:** `src/lib/forms.test.ts` — duplicates `contactFormSchema`, `newsletterSchema`, and `sanitize` function. If source schemas change, tests still pass on stale versions. Import from `forms.ts` instead.

### Q3. `gsap.registerPlugin(ScrollTrigger)` Called Multiple Times

In `loadGsap()` this is called once in the singleton — correct. But `contact-form.tsx`, `footer.tsx`, `trust-stats.tsx`, `portfolio-detail-gallery.tsx` all call `gsap.registerPlugin(ScrollTrigger)` again inside their effects. This is harmless (GSAP ignores duplicate registrations) but indicates confusion about whether the shared loader handles it.

### Q4. Fragile Cleanup Pattern

```tsx
const ctrls: (() => void)[] = [];
loadGsap().then(({ gsap }) => {
  // push cleanup functions
});
return () => {
  for (const fn of ctrls) fn();
};
```

If the async import fails (network error), cleanup array is empty but component still unmounts. No error handling for failed GSAP loads. No fallback UI.

### Q5. Field Name Mismatch (`vision` → `message`)

**File:** `contact-form.tsx` — field ID/name is `vision` but handler maps it to `message` in the data object. Works but confusing. Rename field to `message`.

### Q6. `CtaSection` Hardcodes Message

**File:** `cta-section.tsx` (line 29)

```tsx
message: 'Request consultation via CTA section',
```

Loses user context. If user fills name/email/interest, the message should reflect what they selected. **Fix:** dynamically compose message from form values.

### Q7. Test Coverage Gaps

| Area       | Coverage                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `seo.ts`   | Only `generateMeta` tested (5 tests). Zero tests for `productLd`, `faqLd`, `breadcrumbLd`, `webpageLd`, `ldScript` |
| `forms.ts` | Only schema validation tested. Zero tests for `submitContactForm`, `submitNewsletterSignup`, `isRateLimited`       |
| `utils.ts` | Only `cn` tested (3 tests)                                                                                         |
| Components | **Zero tests** for any component                                                                                   |
| Routes     | **Zero tests** for any route                                                                                       |

### Q8. No Pending/Loading States for Routes

Only `portfolio.$slug.tsx` has a `pendingComponent` skeleton. All other routes show nothing during navigation. Add skeleton states for about, services, contact, career, sustainability, privacy, legal.

### Q9. TypeScript `strict: true` but 2 `biome-ignore` Suppressions

- `testimonials.tsx` line 157 — array index key
- `portfolio-detail-hero.tsx` line 85 — array index key

Both legitimate uses (static data, no reordering), but documenting them as acceptable technical debt.

### Q10. `portfolio-grid.tsx` GSAP Flip Imported Dynamically

Uses `import('gsap/Flip')` dynamically inside filter handler — creates a new chunk on every filter click. Consider pre-loading Flip alongside GSAP singleton.

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

### U4. Carousel Uses Array Index Key

**File:** `testimonials.tsx` (line 157) — suppressed with `biome-ignore`. For static list it works but pattern is fragile.

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

| ID  | Item                                                             | Effort | Impact                         |
| --- | ---------------------------------------------------------------- | ------ | ------------------------------ |
| B1  | `portfolio-hero.tsx` raw GSAP import → `loadGsap()`              | 5 min  | Bundle size, consistency       |
| B2  | `cta-section.tsx` magnetic button raw GSAP import → `loadGsap()` | 10 min | Bundle size, consistency       |
| B3  | `smooth-scroll.tsx` raw GSAP imports → `loadGsap()`              | 10 min | Bundle size, duplicate loading |
| B5  | Footer social icon URLs → point to real brand pages              | 5 min  | User trust, broken links       |
| S5  | Add missing hreflang + og:locale:alternate                       | 5 min  | SEO for Bangladesh market      |

### 🟡 P1 — Important (4-8 hrs)

| ID  | Item                                                       | Effort | Impact                               |
| --- | ---------------------------------------------------------- | ------ | ------------------------------------ |
| Q1  | Create `useOnce` hook, refactor 12+ components             | 3 hrs  | Code quality, reusability            |
| P2  | Add intrinsic image dimensions to all `<Image>` components | 1 hr   | CLS reduction                        |
| P4  | Hero parallax tab visibility check                         | 30 min | Battery/performance                  |
| B4  | Convert 4 CSS background-image components to `<Image>`     | 2 hrs  | Lazy loading, CLS, responsive images |
| F9  | Forms: add email notification (Resend/SendGrid)            | 2 hrs  | Business-critical                    |
| S2  | Add breadcrumb JSON-LD to all inner pages                  | 1 hr   | SEO                                  |
| Q2  | Fix test duplication — import schemas from source          | 30 min | Test reliability                     |

### 🟢 P2 — Medium Priority (8-16 hrs)

| ID  | Item                                                          | Effort | Impact          |
| --- | ------------------------------------------------------------- | ------ | --------------- |
| B6  | Remove `nitro()` from vite.config (bundled in TanStack Start) | 15 min | Build stability |
| F1  | Image lightbox for galleries                                  | 3 hrs  | UX              |
| F2  | Floor plan assets per project                                 | 2 hrs  | Feature parity  |
| F4  | EMI calculator                                                | 3 hrs  | Conversion tool |
| F3  | Interactive maps (Leaflet)                                    | 4 hrs  | UX, local SEO   |
| U1  | Consistent focus indicators audit                             | 2 hrs  | Accessibility   |
| U9  | Testimonial autoplay pause on keyboard focus                  | 30 min | WCAG compliance |
| P5  | Replace Material Symbols with lucide-react SVGs               | 1 hr   | -350KB font     |
| Q3  | Remove redundant `registerPlugin` calls                       | 15 min | Cleanup         |

### 🔵 P3 — Longer Term (16-40 hrs)

| ID  | Item                                       | Effort | Impact                 |
| --- | ------------------------------------------ | ------ | ---------------------- |
| F7  | Blog/news section with RSS, article schema | 1 week | Content marketing, SEO |
| F5  | Analytics + cookie consent                 | 2 hrs  | Data-driven decisions  |
| F8  | Page transition animations                 | 4 hrs  | UX polish              |
| F10 | Dynamic testimonials admin                 | 8 hrs  | Maintainability        |
| C6  | Env var validation + error handling        | 1 hr   | Reliability            |
| T1  | Fix Vitest close timeout                   | 1 hr   | DX                     |
| Q7  | Add component tests (critical paths)       | 8 hrs  | Quality assurance      |

### ⚪ P4 — Polish (4-8 hrs)

| ID  | Item                                                 | Effort | Impact        |
| --- | ---------------------------------------------------- | ------ | ------------- |
| P6  | Preloader: non-blocking overlay or shorter animation | 1 hr   | UX            |
| U6  | Portfolio empty state: suggested projects            | 1 hr   | UX            |
| U7  | Mobile menu exit animation                           | 1 hr   | UX polish     |
| Q9  | Refactor array index keys                            | 30 min | Clean code    |
| C3  | Re-enable biome formatting on CSS                    | 15 min | Consistency   |
| C7  | Rewrite README                                       | 1 hr   | Documentation |

---

## Summary

**Top 5 most impactful fixes:**

1. **Fix GSAP loading** (B1, B2, B3) — eliminate duplicate GSAP chunks, use singleton everywhere
2. **Fix Footer social links** (B5) — broken links → real brand pages
3. **Convert CSS background images to `<Image>`** (B4) — lazy loading + CLS reduction
4. **Remove `nitro()` from vite.config** (B6) — prevent build conflicts
5. **Add intrinsic image dimensions** (P2) — reduce CLS site-wide

**Biggest feature gap:** Forms are in-memory only (F9) — no email notification means lost leads.

**Biggest SEO gap:** No hreflang (S1) for primary market language.

_Audit generated 2026-06-19. Items verified against current codebase state._
