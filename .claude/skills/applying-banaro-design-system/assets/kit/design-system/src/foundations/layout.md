---
title: Layout
summary: A centred 74rem container on a 4/8/12-column grid with margins that widen as the screen does.
---

## Principles

Content sits in `.wrap`: a centred container capped at `--layout-container-max` (74rem), with side margins
of 20px on phones, 40px on tablets and 64px on desktops. The grid has **4 columns on phones, 8 from 48rem
and 12 from 64rem**. The gutter grows from 20px to 40px.

- **Reading columns stay narrow.** Prose, forms and search live in `--layout-narrow` (44rem). Text never
  runs wider than its measure.
- **Two-pane layouts** use named roles:
  - `.two-col` puts content beside an aside of `--layout-aside-width`.
  - `.split` puts a list pane of `--layout-list-pane` beside a detail pane.
  - `.sidebar-layout` puts filters or navigation in `--layout-sidebar-width`.
  - `.settings-layout` puts settings navigation in `--layout-settings-nav`.
- **Card grids** use `.grid`, which places as many `--layout-card-min` (18rem) columns as fit.
- The top bar is `--layout-topbar-height` (72px) with a hairline beneath it.

## Specimens

The live grid above uses the current breakpoint's column count, gutter and margin.

## Usage

- Compose pages from `.wrap` > `.page-head` > content blocks (`.page-block`, `.section`).
- Collapse every multi-column layout to one column below 64rem unless the content is a short, related pair.
- Keep z-order to the named layers in [Elevation](elevation.html).
- Component geometry such as dialog widths, the toast width and the textarea minimum lives in named
  `--size-*` tokens. Never write raw widths in components.
