# About Page Audit — Shaon Landmarks

Generated: 2026-06-26

---

## Section Order — Current Flow

```
AboutHero (dark) → AboutStory (white) → AboutMissionVision (raised)
→ AboutLeadership (raised) → AboutCertifications (white)
```

Two `raised` sections back-to-back with no visual separator. Leadership → Certifications jumps abruptly from `raised` → `white`.

**Recommended:** Alternate intentionally like the home page, or insert a `border-b` between sections that share the same background.

---

## Bug (Runtime Crash)

| File | Line | Issue | Fix |
|---|---|---|---|
| `about-certifications.tsx` | 26-27 | Uses `gsap.context()` / `gsap.from()` but imports only `{ MOTION }` — `gsap` is never imported | Change `import { MOTION }` to `import { gsap, MOTION }` |

---

## Hardcoded Colors (bypass theme tokens)

### `#a67c52` (should be `text-custom` / `bg-custom` / `border-custom`)

| File | Line | Current | Should be |
|---|---|---|---|
| `about-hero.tsx` | 111 | `via-[#a67c52]` | `via-custom` |
| `about-hero.tsx` | 117 | `bg-[#a67c52]` | `bg-custom` |
| `about-hero.tsx` | 118 | `text-[#a67c52]/80` | `text-custom/80` |
| `about-hero.tsx` | 152 | `border-[#a67c52]/30` | `border-custom/30` |
| `about-hero.tsx` | 232 | `from-[#a67c52]/50` | `from-custom/50` |
| `about-hero.tsx` | 244 | `bg-[#a67c52]` | `bg-custom` |

### Near-Black Surfaces (should use surface tokens)

| File | Line | Current | Should be |
|---|---|---|---|
| `about-hero.tsx` | 104 | `bg-[#0a0a0a]` | `bg-surface-brand` |
| `about-mission-vision.tsx` | 101 | `bg-[#0f0f0f]` | `bg-surface-overlay` |

### `bg-neutral-50` (should be `bg-surface-raised`)

| File | Line | Context | Should be |
|---|---|---|---|
| `about-mission-vision.tsx` | 43 | Section background | `bg-surface-raised` |
| `about-mission-vision.tsx` | 68 | Icon container bg | `bg-surface-raised` |
| `about-leadership.tsx` | 63 | Section background | `bg-surface-raised` |
| `about-certifications.tsx` | 75 | Icon container bg | `bg-surface-raised` |

**Total: 13 hardcoded color values.** The about page was not part of the Phase 2 design token refactor applied to the home page.

---

## Design Inconsistencies

### Low Contrast

| File | Line | Current | Issue |
|---|---|---|---|
| `about-hero.tsx` | 154 | `text-white/35` on quote | ~2.8:1 ratio. Home uses `text-white/55` for equivalent text. Bump to `text-white/55` |

### Stat Format Mismatch (About Hero vs Home Hero)

| Element | Home Hero | About Hero | Should match |
|---|---|---|---|
| Stat numbers | `text-[22px] md:text-[26px]` | `text-xl` (20px) | Use same scale |
| Stat labels | `text-[8px] md:text-[10px]` | `text-[9px]` | Use same scale |
| Eyebrow divider | `w-10 h-px` | `w-10 h-px` | Consistent (OK) |

### Inline SVG vs Tabler Icons

| File | Line | Current | Should be |
|---|---|---|---|
| `about-story.tsx` | 108-117 | Inline arrow SVG (~100 chars) | `IconArrowRight` from `@tabler/icons-react` (matches home page pattern) |

### Missing SectionHeading Component

| File | Context | Current | Should use |
|---|---|---|---|
| `about-story.tsx` | Eyebrow + heading | Manual pattern | `<SectionHeading eyebrow="Since 2008" heading="Our" highlight="Story" />` |
| `about-mission-vision.tsx` | Eyebrow + heading | Manual pattern | `<SectionHeading eyebrow="Purpose & Direction" heading="Mission &" highlight="Vision" />` |
| `about-leadership.tsx` | Eyebrow + heading | Manual pattern (centered) | `<SectionHeading eyebrow="The Board" heading="Visionary" highlight="Leadership" align="center" />` |

The 3 manual patterns are identical to the `SectionHeading` component's output. Using the component ensures consistency and reduces duplication.

---

## Accessibility

| File | Line | Issue | Fix |
|---|---|---|---|
| `about.tsx` | 53 | `<main>` missing `id="main-content"` | Add `id="main-content"` — skip-to-content link in `__root.tsx:57` points to `#main-content` |
| `about-hero.tsx` | 154 | Low contrast quote | Bump to `text-white/55` |

---

## Route Skeleton (Loading State)

| File | Lines | Issue |
|---|---|---|
| `route-skeleton.tsx` | 6-23 | Uses non-existent CSS tokens: `bg-surface`, `bg-surface-container-high`, `bg-surface-container-higher`, `bg-surface-container-low`, `border-outline-variant` |

None of these classes exist in `styles.css`. The skeleton renders with transparent backgrounds — invisible during loading. This is a pre-existing component from the boilerplate that was never themed.

---

## Suggested Implementation Order

| Phase | Items | Effort |
|---|---|---|
| 1 — Fix bug + quick wins | `gsap` import, skip-link `id`, low contrast | ~10 min |
| 2 — Design tokens | Replace all hardcoded colors with surface/custom tokens | ~25 min |
| 3 — Component extraction | Use `SectionHeading`, replace inline SVG with `IconArrowRight` | ~15 min |
| 4 — Route skeleton | Theme skeleton with valid Tailwind tokens | ~10 min |
| 5 — Stat consistency | Align about-hero stats with home-hero scale | ~10 min |

---

## File Touch List

| File | Change |
|---|---|
| `about-certifications.tsx` | Fix `gsap` import |
| `about-hero.tsx` | 6x `#a67c52` → theme tokens, `bg-[#0a0a0a]` → `bg-surface-brand`, contrast bump, stat sizes |
| `about-mission-vision.tsx` | `bg-[#0f0f0f]` → `bg-surface-overlay`, `bg-neutral-50` → `bg-surface-raised`, use `SectionHeading` |
| `about-leadership.tsx` | `bg-neutral-50` → `bg-surface-raised`, use `SectionHeading` |
| `about-story.tsx` | Use `SectionHeading`, replace inline SVG with `IconArrowRight` |
| `about.tsx` | Add `id="main-content"` to `<main>` |
| `route-skeleton.tsx` | Replace non-existent tokens with real Tailwind classes |
