---
name: Onyx & Bronze
colors:
  surface: "#f9f9f9"
  surface-dim: "#dadada"
  surface-bright: "#f9f9f9"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f3f3f3"
  surface-container: "#eeeeee"
  surface-container-high: "#e8e8e8"
  surface-container-highest: "#e2e2e2"
  on-surface: "#1a1c1c"
  on-surface-variant: "#444748"
  inverse-surface: "#2f3131"
  inverse-on-surface: "#f0f1f1"
  outline: "#747878"
  outline-variant: "#c4c7c7"
  surface-tint: "#5f5e5e"
  primary: "#000000"
  on-primary: "#ffffff"
  primary-container: "#1c1b1b"
  on-primary-container: "#858383"
  inverse-primary: "#c9c6c5"
  secondary: "#7c5730"
  on-secondary: "#ffffff"
  secondary-container: "#fdcb9b"
  on-secondary-container: "#79542d"
  tertiary: "#000000"
  on-tertiary: "#ffffff"
  tertiary-container: "#1a1c1c"
  on-tertiary-container: "#838484"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#e5e2e1"
  primary-fixed-dim: "#c9c6c5"
  on-primary-fixed: "#1c1b1b"
  on-primary-fixed-variant: "#474646"
  secondary-fixed: "#ffdcbd"
  secondary-fixed-dim: "#eebd8e"
  on-secondary-fixed: "#2c1600"
  on-secondary-fixed-variant: "#61401b"
  tertiary-fixed: "#e2e2e2"
  tertiary-fixed-dim: "#c6c6c7"
  on-tertiary-fixed: "#1a1c1c"
  on-tertiary-fixed-variant: "#454747"
  background: "#f9f9f9"
  on-background: "#1a1c1c"
  surface-variant: "#e2e2e2"
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: "400"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: "400"
    lineHeight: "1.2"
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: "400"
    lineHeight: "1.2"
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: "400"
    lineHeight: "1.3"
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: "400"
    lineHeight: "1.4"
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: "1.5"
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1440px
---

## Brand & Style

This design system is defined by an atmosphere of "Quiet Luxury"—a sophisticated, editorial approach that balances the authoritative weight of Onyx with the refined warmth of Metallic Bronze. The brand personality is architectural, confident, and permanent, specifically curated for high-end audiences who value structural integrity and minimalist clarity.

The visual style is **Minimalist Editorial**. It utilizes high-contrast tonal shifts and generous whitespace to create a gallery-like experience. Every element is intentional, avoiding decorative clutter in favor of precision, solid fills, and sharp, structural lines. The emotional response should be one of calm exclusivity and unwavering reliability.

## Colors

The palette is rooted in a high-contrast relationship between deep darks and airy lights.

- **Primary (Deep Onyx):** Used for typography, primary actions, and structural anchors. It provides the "solid" foundation of the system.
- **Secondary (Metallic Bronze):** Reserved for meaningful accents, call-to-actions, and moments of luxury. It should be used sparingly to maintain its value.
- **Surface (Alabaster):** The primary canvas. This off-white ensures the high-contrast Onyx text remains legible without the harshness of pure white.
- **Neutral (Warm Grey):** Used for subtle layering, background shifts, and UI borders to define space without introducing heavy shadows.

## Typography

The typography strategy leverages a classic editorial contrast. **Libre Caslon Text** is used for headlines to evoke a sense of literary authority and timeless elegance. These serif headers should be set with tight letter-spacing for a modern, high-fashion impact.

**Inter** serves as the functional counterpart, providing a clean, utilitarian engine for body copy and system labels. Labels are frequently set in uppercase with increased letter-spacing to reinforce the architectural feel of the UI. For mobile devices, display sizes are scaled down aggressively to ensure elegance is maintained on smaller viewports.

## Layout & Spacing

This design system utilizes a **Fixed Grid** philosophy to mirror the structured layout of a luxury print magazine.

- **Desktop:** A 12-column grid with a maximum container width of 1440px. Large margins (64px) create the "breathable" gallery feel.
- **Mobile:** A 4-column fluid grid with 16px margins.
- **Rhythm:** All spacing is based on a 4px baseline unit. Internal component padding should favor generous vertical space to emphasize the minimalist aesthetic.

Content should be aligned to a strict vertical axis. Asymmetry can be used in imagery and layout blocks to create visual interest, provided the underlying grid remains the primary governor of alignment.

## Elevation & Depth

Depth in this design system is achieved through **Tonal Layering** and **Low-Contrast Outlines** rather than traditional shadows.

1.  **Surfaces:** The Alabaster (#FDFDFD) base is interrupted by Warm Grey (#F1F1F1) containers to indicate depth or grouping.
2.  **Borders:** Use solid, 1px lines in Onyx (#0A0A0A) for high-contrast separation, or Warm Grey for subtle containment.
3.  **Shadows:** Shadows are almost entirely avoided. If necessary for extreme elevation (e.g., a modal), use a very hard, "brutalist" style shadow with no blur, or a faint, wide-spread neutral tint to maintain the "solid" feel of the interface.

## Shapes

The shape language is **Architectural**. Corners are kept intentionally sharp with a minimal 4px radius (Level 1) to convey precision and structural integrity.

Avoid circles or large pill shapes. UI elements like buttons, inputs, and cards should look like precisely cut blocks. This sharpness reflects the high-end, "Onyx" branding and ensures the interface feels formal and deliberate.

## Components

- **Buttons:**
  - _Primary:_ Solid Onyx (#0A0A0A) background with Alabaster text. Sharp 4px corners.
  - _Secondary:_ Solid Bronze (#A67C52) background. Used for the most critical conversion points.
  - _Ghost:_ 1px Onyx border with no fill.
- **Input Fields:** 1px solid Onyx borders on all sides or a bottom-border only for a more "minimalist form" feel. No rounded corners beyond the 4px standard. Focus states should transition the border to Bronze.
- **Cards:** No shadows. Use 1px Warm Grey borders or a slight background shift to #F1F1F1. Images within cards should fill the container entirely with no internal padding.
- **Chips/Tags:** Rectangular with 4px corners. Use Alabaster background with Onyx borders and small Inter uppercase labels.
- **Lists:** Separated by thin, 1px Warm Grey horizontal rules. Generous vertical padding (24px+) between list items to maintain the editorial rhythm.
- **Dividers:** Used frequently to separate content sections. Always solid, 1px or 2px thickness.
