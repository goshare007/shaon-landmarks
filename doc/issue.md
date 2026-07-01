# Scroll Jank / Image Optimization — Problem & Solution Summary

## Problem

While scrolling past the `FeaturedProjects` section (TanStack Start project), the page content appeared to "shake" or vibrate slightly. This is a classic symptom of **main-thread jank caused by image decode/paint work happening during scroll**, not a CSS or layout bug.

## Root Cause

The project images (`the-obsidian.webp`, `bronze-heights.webp`, etc.) are **local static assets** imported directly:

```ts
import theObsidian from "@/assets/images/projects/the-obsidian.webp";
```

These are rendered through `@unpic/react`'s `<Image>` component — which **TanStack Start's official docs do recommend** as the `next/image` equivalent.

However, Unpic can only generate a real responsive `srcset` (i.e. actually resize the image) when:

- it detects the URL belongs to a **known image CDN** (Cloudinary, Imgix, Shopify, etc.), **or**
- a **`fallback` provider** is explicitly configured.

For a plain local file with no CDN and no fallback set, Unpic has no way to resize pixel data — it just renders the image close to its original resolution. This is a documented limitation (confirmed via Unpic's GitHub issues and docs), not a misconfiguration or bug on our end — it's simply unconfigured.

**Result:** the browser downloads and decodes full-resolution `.webp` files exactly as each card scrolls into the viewport, which blocks the main thread for a frame or two → visible stutter/"vibration" during scroll.

## Solution

Keep using `@unpic/react` (per TanStack's recommendation) but configure it correctly for local assets, based on deployment target:

### Option A — Deploying on Vercel or Netlify (recommended, least setup)

Both platforms provide a built-in image-resizing endpoint. Set it as Unpic's fallback provider:

```tsx
import { Image } from "@unpic/react";

<Image
  src={project.image}
  alt={project.title}
  layout="fullWidth"
  height={800}
  fallback="vercel" // or 'netlify'
/>;
```

This lets Unpic auto-detect known CDNs as usual, and fall back to the platform's own image CDN for local/unrecognized images — producing a real `srcset` with no extra build tooling.

### Option B — Self-hosted / no platform image CDN

TanStack Start has no built-in image CDN (unlike Next.js), so two paths:

1. **Pre-generate real resized variants at build time** using `vite-imagetools`, and use Unpic's `transformer` prop to select the right variant instead of hitting a CDN. (Most correct, more setup.)
2. **Pre-resize/compress source `.webp` files** to sane target dimensions (e.g. ~1600px for hero images, ~800px for grid cards) using `sharp`, so the base file itself is already right-sized. Unpic still provides layout/lazy-loading/CLS-prevention benefits even without CDN-based `srcset` generation.

### Supporting optimizations (regardless of option chosen)

- Set `priority`/`loading='eager'` on the above-the-fold featured image; leave grid images lazy.
- Provide explicit `width`/`height` (or `layout='fullWidth'` + `height`) so image boxes have a reserved aspect ratio before load, avoiding any reflow.
- Add `content-visibility: auto` + `contain-intrinsic-size` to offscreen card wrappers so the browser skips layout/paint work for cards not yet in view — a second layer of defense against scroll jank even with correctly-sized images.

## Next Step

Confirm deployment target (Vercel / Netlify / self-hosted) to apply the exact fallback provider config, or set up the `sharp`/`vite-imagetools` pre-resize pipeline if self-hosted.
