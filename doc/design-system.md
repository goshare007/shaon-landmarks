# Shaon Landmarks — Design System

Source: `src/styles.css` + component analysis. Values are canonical.

---

## 1. Typography

### Font Stack

| Token | Font | Usage |
|---|---|---|
| `--font-sans` | `"Inter Variable", sans-serif` | Body, UI labels, microcopy |
| `--font-serif` | `"Cormorant Garamond", serif` | All headings, display, quote text |
| `--font-heading` | `var(--font-serif)` | Card titles, sheet titles |

### Weights

| Class | Weight | Where |
|---|---|---|
| `font-light` | 300 | ALL headings (hero, section, card titles), stat numbers, quote, sustainability descriptions |
| `font-medium` | 500 | Eyebrow labels, stat labels, buttons, nav items, badges, footer headings, author names |
| `font-semibold` | 600 | CTA buttons |
| `font-extrabold` | 800 | Logo text only |

### Type Scale

```
9px   — badges, form labels, brand sub-labels
10px  — eyebrow text, stat labels, section headings, scroll indicators, badge pills
11px  — CTA buttons, location metadata, author names, index numbers
12px  — descriptors, card descriptions, copyright, status messages
14px  — body text (descriptions, links, form inputs, pillar cards)
16px  — quote text, card titles, testimonial author
20px  — pillar card titles, desktop logo
```

### Fluid Sizes

```
Hero h1:                clamp(2.5rem, 5vw,   4rem)
Section heading (h2):   clamp(1.8rem, 3.5vw, 2.8rem)
Featured projects h2:   clamp(1.7rem, 3.2vw, 2.6rem)
CTA / stats / testi:    clamp(2rem,   4vw,   3rem)
```

### Letter Spacing

```
0.10em — grid card location
0.12em — nav items, footer brand
0.15em — CTA buttons, project location
0.18em — badges, stat labels, "View Landmark" CTA
0.20em — eyebrow, scroll indicator, section titles, form labels
0.22em — eyebrow (heading variant), "Featured" label, sustainability index
0.30em — brand sub-label
-0.01em — hero headline, CTA headline (tight)
wide   — logo, testimonial role
```

### Italic Patterns

- **Muted italic**: `italic text-muted-foreground` — section heading highlights on light backgrounds
- **Stroke italic**: `italic` with `color: transparent; WebkitTextStroke: 1px rgba(255,255,255,0.28)` — highlights on dark backgrounds (hero, CTA)

---

## 2. Colors

### CSS Custom Properties (`:root`)

All in OKLCH format. Config in `@theme inline` or raw `:root`.

#### Surface & Text

| Token | OKLCH | Hex approx | Usage |
|---|---|---|---|
| `--background` | `oklch(1 0 0)` | #fff | Page bg |
| `--foreground` | `oklch(0.145 0 0)` | #252525 | Primary text |
| `--card` | `oklch(1 0 0)` | #fff | Card bg |
| `--card-foreground` | `oklch(0.145 0 0)` | #252525 | Card text |
| `--muted` | `oklch(0.97 0 0)` | #f7f7f7 | Muted bg |
| `--muted-foreground` | `oklch(0.556 0 0)` | #8e8e8e | Secondary text, descriptions |
| `--border` | `oklch(0.922 0 0)` | #ebebeb | Borders, dividers |
| `--input` | `oklch(0.922 0 0)` | #ebebeb | Form borders |
| `--ring` | `oklch(0.708 0 0)` | #b4b4b4 | Focus rings |

#### Brand — "custom" (gold/bronze)

| Token | OKLCH | Hex approx |
|---|---|---|
| `--color-custom` | `oklch(0.58 0.09 65)` | #a67c52 |

Usage: **EVERYWHERE** — dividers, borders, text highlights, active nav, icons, buttons, hover states, eyebrow text, focus rings, accent lines.

#### Surfaces (brand-specific)

| Token | OKLCH | Usage |
|---|---|---|
| `--color-surface-brand` | `oklch(0.04 0 0)` | Hero left panel, CTA section, `<select>` options (near-black) |
| `--color-surface-overlay` | `oklch(0.06 0 0)` | Footer, testimonials |
| `--color-surface-raised` | `oklch(0.97 0 0)` | Sustainability section, hovered trust-stats |
| `--color-surface-elevated` | `oklch(0.11 0 0)` | Footer badge, newsletter input, back-to-top |

#### Opacity Usage on White Text (dark backgrounds)

```
white/5   — divider lines on dark
white/6   — border-lines on dark
white/7   — border on dark
white/10  — subtle fills, stat dividers
white/20  — subtle borders (header, input outlines)
white/25  — card borders
white/30  — card borders, featured label, date text
white/40  — location text, scroll indicator
white/45  — descriptor text, stat borders
white/55  — description text, stat labels
white/60  — CTA heading, testimonial role
white/65  — location badge text
white/70  — nav links (inactive, on dark)
white/80  — eyebrow text on dark
```

### Status Colors (badges, hardcoded)

| Status | Dot | Text | Border |
|---|---|---|---|
| Completed | `bg-emerald-400` | `text-emerald-100` | `border-emerald-700/60` |
| Ongoing | `bg-amber-400` | `text-amber-100` | `border-amber-700/60` |
| Upcoming | `bg-sky-400` | `text-sky-100` | `border-sky-700/60` |

Form feedback: `text-emerald-400` (success), `text-red-400` (error).

---

## 3. Spacing & Layout

### Container

```css
@utility container {
  @apply mx-auto px-4;
}
```

All sections wrap content in `<div className='container'>`. Exception: CTA uses `container max-w-360`.

### Section Vertical Padding

Standard: `py-20 md:py-28`
Trust Stats: `py-14 md:py-16`
Footer: `py-14 md:py-20`
Hero panel: `px-6 py-10 md:px-14 md:py-12`

### Grid Patterns

| Grid | Context |
|---|---|
| `grid-cols-1 md:grid-cols-2` | Hero (split panel) |
| `md:grid-cols-3` | Pillars, sustainability |
| `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` | Featured projects grid |
| `grid-cols-2 md:grid-cols-4` | Trust stats |
| `lg:grid-cols-[2fr_1fr_1fr_1fr]` | Footer main |
| `grid-cols-2 gap-8 lg:contents` | Footer columns |

### Common Gaps

`gap-1.5` (buttons), `gap-2` (logo, author row), `gap-3` (nav, footer brand), `gap-4` (eyebrow, section heading), `gap-5` (social icons), `gap-6` (stats, pillars card), `gap-8` (stats md), `gap-10` (footer grid), `gap-12` (CTA grid)

### Card Padding

- Pillar card: `p-8 md:p-10`
- Testimonial card: `p-8 md:p-12`
- CTA card: `p-8 md:p-10`
- Default Card component: `py-6` (inner), `px-6` (via --card-spacing)

### Breakpoints

- `sm:` 640px — secondary grid, bottom bar
- `md:` 768px — **primary** grid switches, desktop nav shows, mobile nav hides
- `lg:` 1024px — footer grid, project grid columns, carousel item width

---

## 4. Components

### Button (`src/components/ui/button.tsx`)

Built on `@base-ui/react/button` + `class-variance-authority`.

**Variants:**
- `default` — `bg-primary text-primary-foreground hover:bg-primary/80`
- `outline` — `border-border bg-background hover:bg-muted`
- `secondary` — `bg-secondary text-secondary-foreground`
- `ghost` — transparent, `hover:bg-muted hover:text-foreground`
- `destructive` — `bg-destructive/10 text-destructive`
- `link` — `text-primary underline-offset-4 hover:underline`
- `custom` — **`bg-custom text-white hover:bg-custom/90`** (bronze accent button)

**Sizes:** `default` (h-9), `xs` (h-6), `sm` (h-8), `lg` (h-10), `icon` (size-9), `icon-xs`, `icon-sm`, `icon-lg`.

All icons in buttons: `[&_svg]:size-4` (via base styles).

**Shimmer element** (overlay on hero CTA / form submit):
```tsx
<div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/15 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
```

### Card (`src/components/ui/card.tsx`)

Sub-components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`.

Sizes: `default` (`[--card-spacing:--spacing(6)]`), `sm` (`[--card-spacing:--spacing(4)]`).

Base: `rounded-xl bg-card text-sm text-card-foreground shadow-xs ring-1 ring-foreground/10`.

### SectionHeading (`src/components/ui/section-heading.tsx`)

```tsx
interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  highlight?: string;
  highlightStyle?: 'muted' | 'stroke';   // default: 'muted'
  align?: 'left' | 'center';             // default: 'left'
  as?: 'h1' | 'h2' | 'h3';              // default: 'h2'
}
```

Structure:
```
[8px custom line]  [10px uppercase eyebrow text]
[clamp heading]  [italic highlight]
```

Heading: `font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-tight`

### StatusBadge (`src/components/ui/status-badge.tsx`)

```tsx
interface StatusBadgeProps {
  status: 'Completed' | 'Ongoing' | 'Upcoming';
}
```

Structure: `inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-[9px] font-medium tracking-[0.18em] uppercase` on a `rgba(0,0,0,0.45)`/`backdrop-blur-sm` background with a `size-1.5 rounded-full` color dot.

### Logo

Structure: `flex items-center gap-2.5` — constrained image (`h-6 w-auto md:h-8`) + `tracking-wide uppercase font-extrabold md:text-xl leading-none` text. Brand name: "Shaon" (default foreground) + bronze "Landmarks" (`text-custom`).

### Header

```tsx
<header className='sticky top-0 z-50 bg-background/80 backdrop-blur-sm transition-transform duration-300 border-b border-custom/10'>
  <div className='container flex items-center justify-between py-3 md:py-4'>
    <Logo />
    <DesktopNav />
    <Let's Talk button + MobileMenu />
  </div>
</header>
```

Auto-hides on scroll down via `isHidden` state → `-translate-y-full`.

DesktopNav: `font-medium tracking-[0.12em]`, active = `text-custom` + `w-5 h-[1.5px]` bottom indicator, inactive = `text-muted-foreground hover:text-custom`.

### Footer

Background: `bg-surface-overlay border-t border-white/6`.
Grid: `lg:grid-cols-[2fr_1fr_1fr_1fr]`.
Section headings: `text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400`.
Links: `text-sm text-neutral-400 hover:text-neutral-200`.
Back-to-top: `fixed bottom-6 right-6 z-50 size-10 rounded-full border border-white/10 bg-surface-elevated backdrop-blur-sm`.

---

## 5. Icon Usage

Library: **Tabler Icons** (`@tabler/icons-react` v3.44.0).

| Icon | Where | Size |
|---|---|---|
| `IconShieldCheck` | Integrity pillar | `size={20} stroke={1.5}` |
| `IconDiamond` | Quality pillar | `size={20} stroke={1.5}` |
| `IconHourglass` | Legacy pillar | `size={20} stroke={1.5}` |
| `IconLeaf` | Sustainable Materials | `size={16}` (in button default) |
| `IconSolarPanel` | Energy Efficiency | `size={16}` |
| `IconTree` | Green Spaces | `size={16}` |
| `IconArrowRight` | CTA buttons, links | `size={16}` or `size={14}` |
| `IconArrowUp` | Back-to-top | `size={16}` |
| `IconAdjustmentsHorizontal` | Mobile menu trigger | `size={16}` |
| `IconPhone` / `IconMail` | Footer contact | `size={14}` |
| `IconLock` | CTA exclusive label | `size={16}` |
| `IconChevronLeft` / `IconChevronRight` | Carousel | `size={16}` |
| `IconX` | Sheet close | `size={16}` |

Standard icon size in buttons: `size={16}` (`[&_svg:not([class*='size-'])]:size-4`).

---

## 6. Surfaces & Section Backgrounds

| Section | Class |
|---|---|
| Default white | `bg-background` (inherited) |
| Near-black | `bg-surface-brand` — hero, CTA |
| Dark overlay | `bg-surface-overlay` — testimonials, footer |
| Light raised | `bg-surface-raised` — sustainability |
| Elevated dark | `bg-surface-elevated` — footer accents |

### Border Patterns

- Light sections: `border-t border-border`
- Dark sections: `border-t border-white/[0.05-0.07]`

---

## 7. Hover Effects (Card/Interactive)

All use `group` + `group-hover:` pattern.

| Effect | CSS |
|---|---|
| Image zoom | `transition-transform duration-[900-1000ms] ease-out group-hover:scale-[1.03-1.04]` |
| Border accent | `border-white/[0.06] transition-colors duration-500 group-hover:border-custom/25` |
| Rule expand | `w-6 h-px bg-custom/40 transition-all duration-300 group-hover:w-10 group-hover:bg-custom` |
| CTA slide-in | `opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0` |
| Top accent draw | `absolute top-0 h-0.5 bg-custom origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100` |
| Content slide-up | `translate-y-1 transition-transform duration-300 group-hover:translate-y-0` |
| Description reveal | `max-h-0 opacity-0 overflow-hidden transition-all duration-400 group-hover:max-h-24 group-hover:opacity-100` |

---

## 8. Animation (GSAP)

Config in `src/lib/gsap.ts`:

```ts
gsap.defaults({ ease: 'power2.out', duration: 0.6 });
ScrollTrigger.config({ ignoreMobileResize: true });
```

**Motion respect**: Check `MOTION` constant (reads `prefers-reduced-motion: reduce`). Wrap all GSAP in `if (!MOTION) return;`.

### Standard Scroll-Triggered Pattern (ALL sections)

```ts
useEffect(() => {
  if (!MOTION) return;
  const ctx = gsap.context(() => {
    gsap.from(elementRef.current, {
      y: 20-40,
      opacity: 0,
      duration: 0.5-0.85,
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 82-90%',
        once: true,
      },
    });
  }, sectionRef);
  return () => ctx.revert();
}, []);
```

### Staggered Children

```ts
gsap.from(Array.from(containerRef.current.children), {
  y: 20-36, opacity: 0, stagger: 0.08-0.15, ...scrollTrigger
});
```

### Hero Timeline (the only timeline)

```ts
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
tl.from(image, { scale: 1.06, opacity: 0 }, 0)
  .from(divider, { scaleY: 0, transformOrigin: 'top center' }, 0.2)
  .from(eyebrow, { y: 16, opacity: 0 }, 0.4)
  .from(headline.children, { y: 40, opacity: 0, stagger: 0.12 }, 0.55)
  .from(descriptor, { y: 14, opacity: 0 }, 0.85)
  .from(stats.children, { y: 12, opacity: 0, stagger: 0.1 }, 1.0)
  .from(cta, { y: 10, opacity: 0 }, 1.2)
  .from(scrollIndicator, { opacity: 0 }, 1.4)
  .from(locationBadge + yearTag, { y: 10, opacity: 0, stagger: 0.1 }, 1.1)
  .from(particles.children, { opacity: 0, scale: 0, stagger: 0.03, ease: 'back.out(2)' }, 1.3);
```

---

## 9. How to Build a New Section

```tsx
import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

export function NewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, { y: 20, opacity: 0, duration: 0.7, scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true } });
      gsap.from(Array.from(contentRef.current!.children), { y: 24, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: contentRef.current, start: 'top 82%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='py-20 md:py-28 border-t border-border'>
      <div className='container'>
        <SectionHeading ref={headingRef} eyebrow="Label" heading="Title" highlight="accent" />
        <div ref={contentRef} className='grid md:grid-cols-3 gap-6'>
          {/* cards */}
        </div>
      </div>
    </section>
  );
}
```

---

## 10. Conventions Checklist

- [ ] All sections use `<div className='container'>` for content
- [ ] All components use `cn()` from `@/lib/utils` for class merging
- [ ] All animations wrapped in `if (!MOTION) return` + `gsap.context()` + `ctx.revert()`
- [ ] Cards use `group` + `group-hover:` for coordinated interactions
- [ ] Image containers use `overflow-hidden rounded-sm` + image inside
- [ ] Dark sections: `border-white/XX` borders, light: `border-border`
- [ ] Section headings use `<SectionHeading>`, eyebrow `text-[10px] font-medium tracking-[0.22em] uppercase text-custom`
- [ ] All icons from `@tabler/icons-react` (not lucide-react)
- [ ] `data-slot="component-name"` on all UI primitives
- [ ] Hover effects: image zoom, border accent, CTA slide-in, rule expand
