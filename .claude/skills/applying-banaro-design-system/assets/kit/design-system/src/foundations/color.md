---
title: Color
summary: Oat, birch and one accent by day; warm charcoal by lamplight. Roles, not values, decide which colours touch.
---

## Principles

The palette is warm and quiet. Pages sit on **oat**, cards and fields on **birch paper**, and dialogs and menus
on a slightly brighter raised surface. Linen wells (`--color-bg-surface-sunken`) sit *below* the reading
plane. One **accent** (sage by default) marks the single most important thing on a screen: the primary
action, the current tab, a selected filter. Everything else stays neutral.

- **Read colour by role.** Components use `--color-bg-*`, `--color-fg-*`, `--color-border-*`,
  `--color-accent*` and the status families. They never use `--palette-*` primitives or hex values.
- **One accent moment per view.** If two things are sage, neither is important.
- **Status always has words.** Info is fjord blue, success is sage, warning is clay and danger is
  lingonberry red. Each tone appears with an icon or dot *and* text, never colour alone.
- **Hairlines before boxes.** `--color-border-default` separates content quietly. Inputs and focus
  indicators use `--color-border-strong` and `--color-focus-ring` so that controls meet 3:1.
- **Dark is lamplight, not blue-black.** Night surfaces are warm charcoal and get *lighter* as they rise.
  The accent turns pale with near-black text on it.

### Role hierarchy

| Role | Light | Dark | Use |
|---|---|---|---|
| `--color-bg-canvas` | oat | night 950 | the page behind everything |
| `--color-bg-surface` | birch paper | night 900 | cards, fields, panels |
| `--color-bg-surface-raised` | white | night 850 | dialogs, menus, toasts |
| `--color-bg-surface-sunken` | linen | night 850 | wells, table headers |
| `--color-bg-subtle` | linen | night 800 | hover washes, disabled fills, tags |
| `--color-bg-panel` | clay 100 | night 850 | the grain panel |
| `--color-accent` | accent 600 | accent 300 | primary fills, current markers |
| `--color-fg-default / muted / subtle` | ink / stone 700 / stone 600 | night 50 / 200 / 300 | text hierarchy |

### Tiles

Initials, project marks and illustrated tiles use the four tile roles (`--color-tile-sage`, `-clay`,
`-fjord`, `-oat`) with `--color-tile-fg`. Choose a tile from a stable hash of the name so a person keeps
their colour.

## Specimens

Ramps, roles and pairs above update live with the theme toggle (or press `t`).

## Usage

- **New colour roles** are added to `tokens.css` in the `:root` block *and* the dark block, and every new
  foreground/background combination is added to `tokens/contrast-pairs.json`. Run `check_contrast.py`
  before using the role.
- **The accent ramp** lives between `accent:start` and `accent:end`. Recolour it only with
  `recolour_accent.py`, which rebuilds the ramp, keeps every pair at AA and leaves success sage.
- **Disabled content** is deliberately subdued and exempt from the contrast minimum. Never use the disabled
  roles for content that is merely secondary; use `--color-fg-subtle`.
- **Overlays** use `--color-bg-backdrop` (a translucent ink in light mode, a deeper black in dark mode).
