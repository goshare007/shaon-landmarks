# Shaon Landmark — Full Project Audit

> Generated: 2025-06-05

---

## Critical Bugs (4 — will break)

| # | What | Where | Fix |
|---|---|---|---|
| **C1** | External URLs in router `Link` (WhatsApp, social, legal) | `whatsapp-fab.tsx:10`, `Footer.tsx:198-202` | Replace `<Link>` with `<a>` for external URLs |
| **C2** | Unchecked array bounds on projects `[0..4]` | `featured-projects.tsx:16-19` | Add length check or guard |
| **C3** | Invalid Tailwind v4 classes: `h-100`, `h-200`, `h-112.5` | `featured-projects.tsx:60,173,214` | Use `h-[25rem]`, `h-[50rem]`, `h-[28.125rem]` |
| **C4** | Images swapped btwn The Marble Collection & Azure Waterfront | `data/projects.ts:245,257` | Swap image vars |

---

## High Priority (8)

| # | What | Where | Fix |
|---|---|---|---|
| **H1** | Mobile menu: no focus trap, no Escape handler, no body scroll lock | `mobile-menu.tsx` | Add focus trap, `onKeyDown(Escape)`, `overflow-hidden` on body |
| **H2** | CTA form hangs on non-throwing failure | `cta-section.tsx:46-51` | Add `else` branch for `!result.success` |
| **H3** | Newsletter hang on empty email (bypass HTML validation) | `Footer.tsx:85-93` | Add error state for falsy email |
| **H4** | Logo: duplicate screen reader text (image alt + adjacent span) | `logo.tsx:11` | Set `alt=""` on image since text is right next to it |
| **H5** | Year hardcoded to 2025 | `hero-section.tsx:268` | Use `new Date().getFullYear()` |
| **H6** | Non-null assertion override `project.detail!` | `projects.$slug.tsx:1,173,189` | Remove `biome-ignore-all`, add proper type guard |
| **H7** | No max-length constraints on Zod form fields | `lib/forms.ts` | Add `.max(500)` to name/message |
| **H8** | Logo URL hardcoded `${SITE_URL}/logo.png` — won't resolve in production | `lib/seo.ts` | Use imported asset instead |

---

## Medium Priority (14)

| # | What | Where |
|---|---|---|
| **M1** | Variable name typo: `Sustinbility` | `sustainability.tsx:3` |
| **M2** | Missing `og:image` on most pages (only `projects.$slug.tsx` sets one) | All routes |
| **M3** | `statusColors[project.status]` can produce `undefined` in className | `portfolio.tsx:149` |
| **M4** | Missing `LayoutGroup` for layout animations — flicker risk | `portfolio.tsx:123` |
| **M5** | Carousel `mx-auto` without explicit width — no centering | `testimonials.tsx:48` |
| **M6** | Carousel dots lack `aria-live="polite"` and `aria-label` per slide | `testimonials.tsx` |
| **M7** | Sustainability section: content hidden until hover — invisible on mobile | `sustainability-section.tsx:79-86` |
| **M8** | Hero parallax: `getBoundingClientRect()` per mousemove — forced layout | `hero-section.tsx:54-64` |
| **M9** | CSS transitions + Framer Motion conflicting on same elements | `featured-projects.tsx:67-75` |
| **M10** | Footer doesn't use `submitNewsletterSignup` from forms lib | `Footer.tsx` |
| **M11** | `iconMap` dead code in pillars (keys map to themselves) | `pillars-section.tsx:4-8` |
| **M12** | The Obsidian vision section uses `bronzeHeights` image (copy-paste error) | `projects.ts:97` |
| **M13** | Wildcard `* { border-color }` can override Tailwind utility classes | `styles.css:32-34` |
| **M14** | No catch-all 404 route | `router.tsx` |

---

## Design System Deviations

| Token | DESIGN.md Spec | Actual Implementation |
|---|---|---|
| Secondary bronze | `#A67C52` | `#7c5730` — wrong shade, less golden |
| Border radius | 4px `rounded` | `rounded-sm`(2px), `rounded-md`(6px), `rounded-lg`(8px) — 4px never used |
| Circle/pill shapes | "Avoid circles" | `rounded-full` on WhatsApp FAB, Badge, Carousel nav |
| Label sizes | 12px/14px (`label-md`/`label-lg`) | `text-[11px]` everywhere |
| Type scale | Discrete tokens (display-lg 64px, headline-lg 48px, etc.) | Tailwind defaults + ad-hoc values |
| 12-column grid | Standard layout pattern | Underused; most sections use `grid-cols-2/3/4` |

---

## Accessibility Issues

| # | What | Where | Severity |
|---|---|---|---|
| **A1** | Mobile menu: no focus trap, no Escape, no scroll lock | `mobile-menu.tsx` | High |
| **A2** | Screen reader reads logo text twice | `logo.tsx:11` | High |
| **A3** | Carousel lacks `aria-live="polite"` and slide labels | `testimonials.tsx` | Medium |
| **A4** | Content hidden until hover (mobile inaccessible) | `sustainability-section.tsx:79-86` | Medium |
| **A5** | Social SVG icons lack `<title>` elements | `Footer.tsx` | Medium |
| **A6** | Nav links lack `focus-visible:` styles | `mobile-menu.tsx` | Medium |
| **A7** | Gallery/service images use `alt=""` (should describe the portfolio) | `projects.$slug.tsx`, `services.tsx` | Low |
| **A8** | No `aria-describedby` on form status messages | `Footer.tsx`, `cta-section.tsx` | Low |

---

## Suggested New Features / Pages

| # | Feature | Rationale |
|---|---|---|
| **F1** | **Blog/News page** (`/blog`) | Real estate authority content, SEO growth, project updates |
| **F2** | **Team page** (`/team`) | About page has 2 leaders — expand to full team grid |
| **F3** | **FAQ page** (`/faq`) | Common buyer questions, reduce contact form load |
| **F4** | **EMI / affordability calculator** | Interactive tool, lead gen, repeat visits |
| **F5** | **Virtual tour / 360 viewer** | Premium feature for property listings |
| **F6** | **Downloads / Brochure page** | PDF brochures, floor plans, legal docs |
| **F7** | **Dark mode toggle** | DESIGN.md has dark tokens but no implementation |
| **F8** | **Back to top button** | Long pages lack quick navigation |
| **F9** | **Image lazy loading + skeleton placeholders** | Gallery loads all at once; slow on slow connections |
| **F10** | **Scroll-triggered animations** (IntersectionObserver) | Some sections animate on mount, not on scroll-in |

---

## Architectural Improvements

| # | Suggestion |
|---|---|
| **A1** | Extract nav items to shared data file (duplicated in `desktop-nav.tsx` + `mobile-menu.tsx`) |
| **A2** | Create reusable SEO composable for per-page meta tags |
| **A3** | Move hardcoded stats/hero content to data files for CMS-readiness |
| **A4** | Extract repeated color animation values to CSS variables |
| **A5** | Add rate limiting + sanitization to form server functions |
| **A6** | Implement real `submitNewsletterSignup` handler (currently console.log only) |
| **A7** | Normalize hero heading sizes across pages (3 different strategies now) |
| **A8** | Write Vitest tests — framework ready, zero tests exist |
| **A9** | Replace `biome-ignore-all` with targeted suppressions |
| **A10** | Add route-level error boundaries for routes with loaders |

---

## Summary Stats

| Category | Count | Details |
|---|---|---|
| Critical bugs | 4 | Broken links, layout collapse, wrong images, crash risk |
| High priority | 8 | a11y, UX hangs, hardcoded values, security |
| Medium priority | 14 | Typos, SEO, performance, dead code, style conflicts |
| Design deviations | 6 | Color, radius, type scale, grid |
| Accessibility issues | 8 | Focus, labels, alt text, live regions |
| New features suggested | 10 | Blog, team, calculator, dark mode, etc. |
| Architecture improvements | 10 | Data extraction, testing, CMS-readiness |

**Total items: 58**
