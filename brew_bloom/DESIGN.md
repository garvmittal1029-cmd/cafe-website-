---
name: Brew & Bloom
colors:
  surface: '#fafaf5'
  surface-dim: '#dadad5'
  surface-bright: '#fafaf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4ef'
  surface-container: '#eeeee9'
  surface-container-high: '#e8e8e3'
  surface-container-highest: '#e3e3de'
  on-surface: '#1a1c19'
  on-surface-variant: '#504442'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f1f1ec'
  outline: '#827472'
  outline-variant: '#d3c3c0'
  surface-tint: '#745853'
  primary: '#271310'
  on-primary: '#ffffff'
  primary-container: '#3e2723'
  on-primary-container: '#ae8d87'
  inverse-primary: '#e3beb8'
  secondary: '#625f4d'
  on-secondary: '#ffffff'
  secondary-container: '#e6e0c9'
  on-secondary-container: '#676351'
  tertiary: '#360700'
  on-tertiary: '#ffffff'
  tertiary-container: '#5a1200'
  on-tertiary-container: '#fd6137'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#e3beb8'
  on-primary-fixed: '#2b1613'
  on-primary-fixed-variant: '#5b403c'
  secondary-fixed: '#e9e2cc'
  secondary-fixed-dim: '#ccc6b1'
  on-secondary-fixed: '#1e1c0e'
  on-secondary-fixed-variant: '#4a4737'
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#ffb5a1'
  on-tertiary-fixed: '#3b0800'
  on-tertiary-fixed-variant: '#881f00'
  background: '#fafaf5'
  on-background: '#1a1c19'
  surface-variant: '#e3e3de'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  caption:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 40px
  section-gap: 80px
---

## Brand & Style
The design system embodies an **Artisanal Modernism** style—fusing the precision of specialty coffee culture with the organic warmth of a botanical garden. It is designed to evoke a sense of "slow living," prioritizing tranquility, craftsmanship, and sustainability.

The visual narrative relies on a **Tactile-Minimalist** approach: high-end editorial layouts balanced by soft, organic UI elements. The interface should feel like a premium physical menu or a well-curated lifestyle magazine. Generous whitespace is used not just for clarity, but to create a "breathable" atmosphere that mirrors a quiet morning in a cafe. The emotional response is one of comfort, reliability, and premium quality.

## Colors
The palette is grounded in the "Earth & Roast" spectrum. 

*   **Primary (Deep Coffee):** Used for primary typography, icons, and heavy brand moments to provide a solid, authoritative foundation.
*   **Secondary (Cream/Beige):** The primary surface color. It replaces pure white to reduce eye strain and enhance the cozy, parchment-like warmth.
*   **Tertiary (Terracotta):** Used for calls to action, highlights, and "warmth" accents. It represents the heat of the brew and the fired clay of artisanal mugs.
*   **Accent (Sage Green):** Reserved for sustainability indicators, fresh ingredients, or "Bloom" related elements (e.g., botanical additions to drinks).

Maintain a high contrast ratio between the Deep Coffee text and the Cream backgrounds to ensure accessibility while preserving the artisanal aesthetic.

## Typography
The typography system uses a classic **Serif/Sans-Serif pairing** to balance heritage with modern utility.

*   **Headlines (Playfair Display):** Utilize the Serif for all major headings and product names. It conveys the "Premium" and "Artisanal" nature of the brand. Use "Display" sizes for editorial moments and hero sections.
*   **Body & UI (Montserrat):** Use the Sans-Serif for all functional text, descriptions, and buttons. It provides a clean, geometric counterpoint to the Serif and ensures legibility at small sizes.
*   **Labels:** Labels should often use uppercase with slight letter spacing to create a structured, organized feel reminiscent of coffee bean packaging.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for desktop to maintain an editorial, magazine-like feel, centering the content with generous outer margins.

*   **Desktop:** 12-column grid with 24px gutters. Use wide margins (40px+) to push content inward, emphasizing the premium nature of the brand.
*   **Mobile:** 4-column grid with 20px margins.
*   **Rhythm:** Spacing follows an 8px base unit. Section gaps are intentionally large (80px+) to separate different "experiences" (e.g., the menu vs. the sustainability story).

Elements should often be offset or use asymmetrical padding to mimic the organic, handcrafted feel of a physical space.

## Elevation & Depth
This design system avoids harsh dropshadows in favor of **Tonal Layering** and **Ambient Depth**.

*   **Layers:** Depth is primarily communicated through subtle shifts in background color (e.g., a Card using a slightly lighter or darker beige than the main surface).
*   **Shadows:** When shadows are necessary for interactivity (like a hovering card), use highly diffused, low-opacity shadows with a hint of the Primary brown color (`rgba(62, 39, 35, 0.08)`). The blur should be large (16px+) to feel "soft" rather than "heavy."
*   **Outlines:** Use very thin (1px) borders in a slightly darker shade of the background color to define shapes without creating visual noise.

## Shapes
The shape language is defined by **Softened Geometries**. Surfaces should feel like smoothed river stones or ceramic glaze.

*   **Cards and Containers:** Use a 16px (`rounded-lg`) corner radius as the standard for coffee cards and menu items.
*   **Buttons:** Apply a 12px corner radius or a full pill-shape for smaller interactive elements like tags or chips.
*   **Images:** Photos of coffee and interiors should always feature the standard 16px radius to maintain the "soft" brand character.

## Components
Consistent component styling reinforces the "Brew & Bloom" aesthetic:

*   **Buttons:** Primary buttons use the Terracotta (#BF360C) background with white text. Secondary buttons use a Deep Coffee (#3E2723) outline with no fill. Always use Montserrat Bold for button text.
*   **Cards:** Product cards should use the Secondary Beige (#FFF8E1) as a base, with a subtle 1px border. Product images should sit at the top with a soft-corner crop.
*   **Input Fields:** Fields should have a Secondary Cream background and a bottom-border only (for a minimal "form" feel) or a very soft 12px rounded stroke.
*   **Chips/Tags:** Use the Sage Green (#81C784) background with Deep Coffee text for "Vegan," "Organic," or "New" labels.
*   **Lists:** Menu lists should use Playfair Display for the item name and Montserrat for the price and description, separated by generous whitespace or a subtle dotted leader.
*   **Specialty Component - "The Bloom Reveal":** A transition or hover state where a subtle floral or coffee-leaf illustration fades in behind a product image.