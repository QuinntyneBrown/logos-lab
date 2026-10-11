---
title: Typography
summary: Manrope for every product role, light and tight at display sizes, relaxed at body sizes; JetBrains Mono only for code.
---

## Principles

**Manrope** carries the whole product. Large headings are **light (300) with tight tracking** (`-0.03em`),
which is the calm, airy signature of the look. Small headings step up to medium and semibold so they still
hold their place. Body text is **16px with a relaxed 1.65 line height**, and the lead paragraph is 19px at
1.85. **JetBrains Mono** is reserved for code, tokens and keyboard keys.

- Use the composite roles (`font: var(--text-h2)`), not separate size and weight values.
- One `h1` per page. Sections step down in order, h2 then h3, with no skipped levels.
- **Display** (`--text-display`) is for a marketing promise only, usually once per product. Accent one
  phrase with `<em>`, which turns it into the accent colour, never italic.
- Overlines (`.eyebrow`, `--text-overline`) are uppercase with wide tracking (`0.14em`). They label a
  section; they never replace its heading.
- Metadata is never smaller than 12px (`--font-size-xs`).

## Specimens

Each line above renders the role with its token name. `h1` and display sizes are fluid (`clamp()`) between
fixed limits; body text never shrinks with the viewport.

## Usage

- **Measure:** cap reading text at `--layout-measure` (58ch). Supporting text under a title uses
  `--layout-measure-short` (44ch).
- **Numbers:** use `font-variant-numeric: tabular-nums` (`.num`) wherever digits line up or change in
  place: stats, counts, times and tables.
- **Wrapping:** headings use `text-wrap: balance` and paragraphs `text-wrap: pretty`. Never set fixed
  heights around labels or translated copy.
- **Fonts ship offline:** `assets/fonts/fonts.css` declares Manrope (200–800) and JetBrains Mono (100–800)
  as local WOFF2 files under the SIL Open Font Licence. Applications serve the same files.
