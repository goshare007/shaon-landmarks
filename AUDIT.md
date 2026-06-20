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
