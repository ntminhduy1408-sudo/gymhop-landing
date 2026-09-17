Design & Theme Guide: The Klarna Editorial-Fintech Aesthetic

Target Audience: AI Coding Agents & Frontend Engineers
Objective: Replicate the structural silhouette, typography hierarchy, line
spacing, layout geometry, component anatomy, and micro-interactions of Klarna
(klarna.com/au) without replicating its proprietary color palette. Use this
document as the system prompt or ruleset for UI generation.

1. Aesthetic DNA & Design Philosophy

Klarna’s visual identity balances Swedish minimalism with editorial poster
typography and playful, tactile geometry:

1.  Massive Headline Scale vs. Compact Body: Headlines are unapologetically
    loud, heavy, and tightly tracked. Body text acts in a strictly functional,
    highly legible supporting role.
2.  Pill & Soft-Curvature Geometry: Buttons, chips, search inputs, and badges
    almost exclusively use full pill geometry (border-radius: 9999px). Content
    cards use large, friendly corner radii (20px to 32px).
3.  Flat, High-Definition Elevation: Avoid traditional fuzzy drop shadows.
    Klarna relies on flat planes, hairline structural borders (1px), and sharp
    surface contrast rather than heavy elevations.
4.  Editorial Whitespace: Generous vertical breathing room between sections (up
    to 120px–160px on desktop) paired with tight, structured internal component
    gaps.

2. Typography System

Klarna’s typography relies on high-contrast sizing, tight headline leading
(line-height), and negative tracking (letter-spacing).

Font Stack Alternatives (Open Source / System Fallbacks)

Klarna uses proprietary fonts (Klarna Title and Klarna Text). Replicate the
exact visual feel using:

  - Display / Headlines: Clash Display, Plus Jakarta Sans, Syne, or Gilroy
    (weights: 700, 800, 900).
  - Body & UI Elements: Inter, Plus Jakarta Sans, or system-ui, -apple-system,
    sans-serif (weights: 400, 500, 600).

:root {
  --font-display: "Plus Jakarta Sans", "Clash Display", -apple-system, sans-serif;
  --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

Typographic Scale & Rhythm Specifications

| Style                    | Size (Desktop / Mobile)   | Weight        | Line Height (Leading)        | Letter Spacing (Tracking) | Case          |
| :----------------------- | :------------------------ | :------------ | :--------------------------- | :------------------------ | :------------ |
| **Hero / Display XXL**   | `72px–96px` / `44px–56px` | `800` / `900` | `90% – 95%` (`0.9 – 0.95`)   | `-0.035em` to `-0.04em`   | Sentence case |
| **Heading 1 (H1)**       | `48px–64px` / `36px–42px` | `800`         | `95% – 100%` (`0.95 – 1.0`)  | `-0.03em`                 | Sentence case |
| **Heading 2 (H2)**       | `32px–40px` / `26px–30px` | `700`         | `105% – 110%` (`1.05 – 1.1`) | `-0.025em`                | Sentence case |
| **Heading 3 (H3)**       | `24px–28px` / `20px–22px` | `700`         | `115% – 120%` (`1.15 – 1.2`) | `-0.02em`                 | Sentence case |
| **Subtitle / Lead**      | `20px–24px` / `18px–20px` | `500`         | `130% – 140%` (`1.3 – 1.4`)  | `-0.01em`                 | Sentence case |
| **Body (Large)**         | `18px` / `16px`           | `400` / `500` | `145% – 150%` (`1.45 – 1.5`) | `0` to `-0.005em`         | Sentence case |
| **Body (Default)**       | `15px–16px` / `14px–15px` | `400` / `500` | `140% – 150%` (`1.4 – 1.5`)  | `0`                       | Sentence case |
| **Caption / Fine Print** | `12px–13px` / `11px–12px` | `500`         | `135% – 140%` (`1.35 – 1.4`) | `+0.01em`                 | Sentence case |
| **Button / Label**       | `15px–16px` / `14px–15px` | `600` / `700` | `100%` (`1.0`)               | `-0.01em`                 | Sentence case |

Crucial Typography Rules for Agents

  - Never use uppercase for large headings. Headings are always clean Sentence
    case with tight punctuation.
  - Aggressive Tight Leading: For headings > 32px, line-height must never exceed
    1.05. Lines should feel closely grouped, almost kissing descenders to
    ascenders.
  - Negative Tracking on Big Sizes: The larger the text, the tighter the
    letter-spacing (down to -0.04em). Do not leave display fonts at
    letter-spacing: normal.

3. Spatial System, Line Gaps & Grid

The layout follows a strict 4px/8px modular base unit paired with wide editorial
margins.

Spacing Scale

--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;

Layout Hierarchy & Gaps

1.  Container Max-Widths:
      - Standard Content: 1200px to 1320px.
      - Editorial / Wide Sections: 1440px.
      - Hero / Full Bleed: 100vw with internal gutter margins.
2.  Page Margins (Gutter Safety):
      - Mobile (< 640px): 16px to 20px.
      - Tablet (640px - 1024px): 32px to 40px.
      - Desktop (> 1024px): 5% to 6% of screen width (responsive dynamic
        margin).
3.  Vertical Section Gaps (margin-bottom / padding-y):
      - Compact sections: 64px desktop / 40px mobile.
      - Standard sections: 96px desktop / 56px mobile.
      - Major feature dividers: 120px–140px desktop / 80px mobile.
4.  Component Grid Gaps:
      - Card Grids (3–4 columns): gap: 20px to gap: 24px.
      - Compact Grid (e.g. category pills, merchant icons): gap: 12px to
        gap: 16px.
      - Form Stack: gap: 16px.

4. Geometry, Radii & Border Styles

Klarna’s unique tactility comes from soft, pill-shaped geometry combined with
razor-thin hairline borders.

Corner Radii Scale

--radius-xs: 6px;       /* Micro elements / tooltips */
--radius-sm: 10px;      /* Small inputs / dropdown menus */
--radius-md: 16px;      /* Secondary cards / nested media */
--radius-lg: 24px;      /* Standard hero/feature cards */
--radius-xl: 32px;      /* Large container boxes / modal dialogs */
--radius-full: 9999px;  /* Buttons, search bars, chips, tags, pills */

Borders & Dividers

  - Line Width: Strictly 1px (or 1.5px for active input states).
  - Style: Solid, crisp, flat.
  - Divider Treatment: Full-bleed horizontal rules or inset dividers with 32px
    margin spacing. Never use dashed or dotted borders.

Elevation & Shadows

Klarna avoids muddy drop shadows in favor of a clean, modern, flat finish:

  - Default Surface: Flat with 1px subtle border.
  - Card Hover Elevation:
    /* Extremely soft, diffuse ambient shadow or zero shadow with subtle scale */
    box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.06);
  - Popovers / Flyouts:
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);

5. Component Anatomy & Styling Specs

1. Buttons

Buttons are predominantly full pills (border-radius: 9999px).

  - Primary Button:
      - Height: 48px to 54px (Desktop), 44px (Mobile).
      - Padding: 0 28px (Horizontal).
      - Font: 15px–16px, Weight 600 or 700, Line-height 1.
      - Border: None.
      - Shape: border-radius: 9999px.
  - Secondary / Outlined Button:
      - Same sizing as primary.
      - Border: 1.5px solid currentColor.
      - Background: Transparent.
  - Micro / Tag Button:
      - Height: 32px to 36px.
      - Padding: 0 16px.
      - Font: 13px–14px, Weight 600.

2. Search & Filter Bar

Prominent, pill-shaped central bar characteristic of Klarna shopping:

  - Height: 56px to 60px.
  - Border-radius: 9999px.
  - Internal Layout: display: flex; align-items: center; padding: 0 20px;
    gap: 12px;.
  - Leading Icon: 20px search glyph.
  - Trailing Elements: Optional pill button or clear trigger inside the bar.

3. Feature & Product Cards

  - Card Container:
      - Border-radius: 24px or 32px.
      - Padding: 24px to 32px (or 0px with edge-to-edge media at the top).
      - Overflow: hidden (ensures child images respect rounded corners).
  - Media Ratio: 1:1 (square), 4:3, or 16:9.
  - Card Typography Stacking:
      - Small category label or badge: 12px, Weight 600, Uppercase or sentence
        case.
      - Gap to title: 6px.
      - Card Title: 20px–24px, Weight 700, Line-height 1.15.
      - Gap to description: 8px.
      - Supporting text: 14px–15px, Line-height 1.4.

4. Interactive Carousels & Horizontal Sliders

  - Cards in carousels use snap scrolling:
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 0 24px;
    gap: 16px;
  - Mobile edge-overflow: Section content extends to the screen edge with
    trailing padding so the next card peeks into view (encouraging horizontal
    swipe).

5. Accordions (FAQ / Disclosures)

  - Border: 1px solid top and bottom divider lines.
  - Padding: 24px 0.
  - Trigger: Flex layout, justify-content: space-between, font 18px–20px, weight
    700.
  - Icon: Minimal circular pill button (32px circle) housing a plus/minus + / -
    or chevron with rotation animation.
  - Content panel: padding-top: 12px, body typography 15px–16px,
    line-height: 1.5.

6. Motion & Micro-Interactions

Klarna’s animations feel responsive, springy, and snappy rather than heavy or
sluggish.

Timing & Easings

--ease-standard: cubic-bezier(0.16, 1, 0.3, 1); /* Custom brisk ease-out */
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;

Micro-interaction Behaviors

  - Card Hover:
    transition: transform 300ms var(--ease-standard), box-shadow 300ms var(--ease-standard);
    /* On Hover */
    transform: translateY(-4px);
  - Button Hover:
      - Smooth opacity shift (0.85) or slight scale (scale(1.02)).
      - Press/Active state: scale(0.97) for immediate tactile feedback.
  - Image Zoom inside Cards:
      - Card hover triggers child image zoom:
    img {
      transition: transform 500ms var(--ease-standard);
    }
    .card:hover img {
      transform: scale(1.04);
    }

7. Tailwind CSS Configuration Reference

Agents generating markup using Tailwind CSS should enforce this preset:

// tailwind.config.js snippet
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xxl': ['5.5rem', { lineHeight: '0.92', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display-xl': ['4rem', { lineHeight: '0.95', letterSpacing: '-0.035em', fontWeight: '800' }],
        'heading-lg': ['2.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'heading-md': ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '700' }],
        'body-lg': ['1.125rem', { lineHeight: '1.45', letterSpacing: '-0.005em' }],
        'body-base': ['0.9375rem', { lineHeight: '1.5', letterSpacing: '0' }],
      },
      borderRadius: {
        'card-lg': '32px',
        'card-md': '24px',
        'card-sm': '16px',
        'pill': '9999px',
      },
      spacing: {
        'section-sm': '48px',
        'section-md': '80px',
        'section-lg': '128px',
      },
      transitionTimingFunction: {
        'klarna': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
}

8. Agent Code Checklist (Validation Rules)

Before completing any page or component layout, verify against these criteria:

- [ ] Headings: Are hero titles rendered at least 48px+ on desktop with
  line-height \le 1.0 and negative letter spacing?
- [ ] Buttons & Chips: Are all interactive call-to-actions, category tags, and
  search inputs styled with rounded-full (9999px)?
- [ ] Cards: Are cards using 20px to 32px corner radii with overflow-hidden?
- [ ] Section Gaps: Are section vertical margins generous (at least 80px on
  desktop, 48px on mobile)?
- [ ] Shadows: Are heavy dark drop shadows omitted in favor of flat planes,
  high-contrast borders, or subtle hover elevations?
- [ ] Text Case: Are headings kept strictly in sentence case (never all-caps,
  never small-caps)?
