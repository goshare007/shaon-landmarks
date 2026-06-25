# Homepage Audit — Shaon Landmarks

Generated: 2026-06-25

---

## Section Order — Current vs Recommended

### Current flow

```
Hero → Pillars → FeaturedProjects → Sustainability → Testimonials → TrustStats → CTA
```

### Problem

TrustStats ("48+ projects", "500+ families") are the strongest credibility metrics but sit **after** Testimonials. The user reads social proof *before* seeing the raw numbers backing it. Narrative is backwards.

The Hero already has inline stats (48 Projects, 16 Years, 3.2M Sq Ft), so TrustStats as a standalone section repeats information.

### Recommended order

```
Hero → Pillars → TrustStats → FeaturedProjects → Sustainability → Testimonials → CTA
```

**Rationale**: Hero hooks → Pillars establish values → TrustStats immediately backs values with scale → FeaturedProjects shows the work → Sustainability differentiates → Testimonials provides social proof → CTA converts.

**Alternative**: Merge TrustStats into the Pillars section as a stat row beneath the cards, removing the standalone section entirely.

### File to change

`src/routes/index.tsx:14-20` — reorder the component calls.

---

## Typography

### Problem

| Intent | Reality | File |
|--------|---------|------|
| `--font-heading: var(--font-sans)` | Theme says headings = Inter | `styles.css:10` |
| `font-serif` on every heading | Components use serif | Every section file |
| Only Inter imported | No serif font loaded | `styles.css:4` |

Headings render in the browser default serif stack (`Georgia, "Times New Roman"`). This works accidentally but isn't intentional. On Windows without Georgia it falls to Times New Roman, changing the feel.

### Fix

Import [Cormorant Garamond](https://fontsource.org/fonts/cormorant-garamond):

```bash
bun add @fontsource-variable/cormorant-garamond
```

Add to `src/styles.css`:

```css
@import "@fontsource-variable/cormorant-garamond";

@theme inline {
  --font-serif: "Cormorant Garamond", serif;
  /* ... rest stays */
}
```

---

## Design System — Color Architecture

### `--color-custom` (#a67c52) Issues

`--color-custom` is the brand gold/bronze but it's a flat hex while every other color uses `oklch()`. This means:

- Can't use `color-mix(in oklch, ...)` for hover states
- Dark mode variants need manual overrides
- `button.tsx` already uses `color-mix(in oklch, ...)` for secondary hover — custom variant can't participate in that system

### Hardcoded values (not theme tokens)

| Location | Code | Should be |
|----------|------|-----------|
| Hero CTA hover | `hover:bg-[#8f6438]` | `hover:bg-custom/90` |
| Dark section backgrounds | `bg-[#0a0a0a]` | Named token if reused |
| Dark section backgrounds | `bg-[#0f0f0f]` | Named token if reused |
| Pillars description | `text-neutral-700` | `text-muted-foreground` |
| Stats hover | `hover:bg-neutral-50` | `hover:bg-muted` |
| CTA form placeholder | `text-white/20` | Bump to `text-white/50` |

### Fix

1. Convert `--color-custom` to oklch:
   ```css
   --color-custom: oklch(0.6 0.1 60);
   ```

2. Add dark-surface tokens if `bg-[#0a0a0a]` / `bg-[#0f0f0f]` are reused across sections:
   ```css
   --color-surface-dark: #0a0a0a;
   --color-surface-darker: #0f0f0f;
   ```

3. Audit all hardcoded colors across home section files.

---

## Component Extraction Opportunities

These patterns are repeated verbatim and should be extracted.

### `SectionHeading`

Used 6 times identically. Pattern:

```tsx
<div className='flex items-center gap-4 mb-5'>
  <div className='w-8 h-px bg-custom' />
  <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom'>
    {LABEL}
  </span>
</div>
<h2 className='font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-light text-foreground leading-tight max-w-sm'>
  {heading} <span className='italic text-muted-foreground'>{highlight}</span>
</h2>
```

**Proposed API:**
```tsx
// src/components/ui/section-heading.tsx
interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  highlight?: string;
  align?: 'left' | 'center';
}
```

**Affected files**: `pillars-section.tsx`, `featured-projects.tsx`, `sustainability-section.tsx`, `testimonials.tsx`, `cta-section.tsx`.

### `ArrowIcon`

The right-arrow SVG is inlined 4+ times:

- `hero-section.tsx:209`
- `featured-projects.tsx:105, 183, 325`
- `cta-section.tsx:225`
- `footer/index.tsx:462`

Extract to `src/components/ui/arrow-icon.tsx`.

### `StatusBadge`

Already extracted as a local function in `featured-projects.tsx:42`. Promote to `src/components/ui/status-badge.tsx` so it can be reused on project detail pages.

### `ShimmerButton`

The shimmer overlay effect is repeated:
- `hero-section.tsx:207` — "Explore Portfolio"
- `cta-section.tsx:222` — "Request Consultation"

Same pattern: `-skew-x-12, via-white/15, translate-x-[-150%] → group-hover:translate-x-[250%]`.

Could be a Button variant or a standalone `ShimmerOverlay` component.

---

## Component-Level Issues

### Hero Section (`hero-section.tsx`)

| Issue | Line(s) | Fix |
|-------|---------|-----|
| LCP image missing `priority` | 243 | Add `priority` prop to the hero `<Image>` |
| Static year runs on every render | 305 | `useMemo` or constant outside component |
| Headline children type-unsafe | 59 | Cast `Array.from(headlineRef.current!.children)` |
| No explicit `alt=""` on hero image | 245 | Add `alt=""` (purely decorative) |

### Pillars Section (`pillars-section.tsx`)

| Issue | Line(s) | Fix |
|-------|---------|-----|
| Icon mapping via `id` ignores content data | 12-16 | Use content string as key, or remove `icon` from `Pillar` interface |
| `flex-1` on description container does nothing in flex-col | 93 | Remove or restructure layout |

### Featured Projects (`featured-projects.tsx`)

| Issue | Line(s) | Fix |
|-------|---------|-----|
| Featured project hardcoded by slug | 265 | Add `featured?: boolean` to `Project` interface |
| No empty state for grid | 301-308 | Guard with `gridProjects.length > 0` |
| Double gradient overlays are redundant | 77-78 | Can likely remove one |

### Sustainability Section (`sustainability-section.tsx`)

| Issue | Line(s) | Fix |
|-------|---------|-----|
| `max-h-24` clips long descriptions on hover | 176 | Use `max-h-[500px]` or similar safe value |
| Stats hardcoded in component | 104-118 | Move to content file |
| No `min-h-0` on grid items | 128 | Add to prevent uneven heights |

### Testimonials (`testimonials.tsx`)

| Issue | Line(s) | Fix |
|-------|---------|-----|
| No fallback for empty array | 150 | Guard with `testimonials.length > 0` |
| Dot transition lacks `will-change` | 222-226 | Add `will-change: width` |

### Trust Stats (`trust-stats.tsx`)

| Issue | Line(s) | Fix |
|-------|---------|-----|
| No heading / context | — | Add `<h2 className="sr-only">Company Statistics</h2>` |
| Border-right hack | 43 | Replace with `divide-x` on the grid |
| Long labels may overflow at 320px | 39-59 | Add `break-words` or reduce font size |

### CTA Section (`cta-section.tsx`)

| Issue | Line(s) | Fix |
|-------|---------|-----|
| Form does nothing | 83-88 | Wire to actual API endpoint |
| No loading state on submit | — | Add spinner + disabled state |
| Interest options hardcoded | 208-211 | Move to content file |
| `htmlFor="cta-interest"` doesn't match input ID | 194 | Input doesn't have `id` attribute |

---

## Accessibility Issues

### Skip-to-content (High)
No skip link. Add to `__root.tsx`:
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only ...">
  Skip to content
</a>
```
Add `id="main-content"` to `<main>` in `routes/index.tsx`.

### Low-contrast text on dark backgrounds (High)

| Current | Location | Ratio (approx) | Fix |
|---------|----------|----------------|-----|
| `text-white/20` | Hero scroll label (line 229) | ~1.2:1 | `text-white/50` |
| `text-white/30` | Hero stats labels (line 189), year tag (line 303) | ~2.3:1 | `text-white/60` |
| `text-white/30` | CTA section heading (line 146) | ~2.3:1 | `text-white/60` |
| `text-white/35` | Testimonial role (line 197) | ~2.8:1 | `text-white/60` |

### Other issues

| Issue | Severity | Fix |
|-------|----------|-----|
| No `aria-current="page"` on nav | Medium | Add to active nav link |
| CTA form errors no `role="alert"` | Medium | Add `role="alert"` to status container |
| No `<h2>` in TrustStats for screenreaders | Low | Add `sr-only` heading |
| Page title is "TanStack Start Starter" | Low | Change to brand name in `__root.tsx:22` |

---

## CTA Form Wiring

The form currently `console.log()`s on submit. The project has Nodemailer + Nitro in `package.json` — wire it properly:

1. Create `src/routes/api/contact.ts` (TanStack Start API route)
2. Add Zod schema for validation
3. POST to the API from the form
4. Add loading spinner + success/error feedback

---

## File Touch List

| File | Change |
|------|--------|
| `src/routes/__root.tsx` | Page title + skip link |
| `src/routes/index.tsx` | Reorder sections |
| `src/styles.css` | Serif font import, `--color-custom` to oklch |
| `src/components/pages/home/hero-section.tsx` | Contrast fixes, hover token, priority prop |
| `src/components/pages/home/pillars-section.tsx` | Icon mapping, text color token |
| `src/components/pages/home/featured-projects.tsx` | Featured flag, empty state |
| `src/components/pages/home/sustainability-section.tsx` | max-h fix, extract stats |
| `src/components/pages/home/testimonials.tsx` | Empty guard, will-change |
| `src/components/pages/home/trust-stats.tsx` | sr-only heading, divide-x |
| `src/components/pages/home/cta-section.tsx` | API wiring, loading state |
| `src/components/ui/section-heading.tsx` | **New** |
| `src/components/ui/arrow-icon.tsx` | **New** |
| `src/components/ui/status-badge.tsx` | **New** (promote from local) |
| `package.json` | Add font package |

---

## Suggested Implementation Order

| Phase | Items | Effort |
|-------|-------|--------|
| 1 — Quick wins | Page title, section reorder, serif font, contrast fixes | ~30 min |
| 2 — Design tokens | Custom color → oklch, hardcoded values → tokens | ~1 hr |
| 3 — Component extraction | SectionHeading, ArrowIcon, StatusBadge | ~1.5 hr |
| 4 — Accessibility | Skip link, aria-current, aria-live, sr-only | ~1 hr |
| 5 — CTA wiring | API route, form submission, feedback | ~2-4 hr |
| 6 — Data integrity | Icon mapping, featured flag, content extraction | ~1 hr |
