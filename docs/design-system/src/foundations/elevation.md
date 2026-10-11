---
title: Elevation
summary: Hairlines before boxes; four warm, very soft shadows; named layers for everything that floats.
---

## Principles

Most surfaces are separated by a **hairline** and a small change of tone, not by a shadow. Shadows are
warm (tinted with `--shadow-color`, a brown in light mode) and very soft, with long, low blur. They signal
that something *floats*:

| Shadow | Use |
|---|---|
| `--shadow-1` | resting items on a tinted panel (panel list items) |
| `--shadow-2` | hover lift on cards and areas |
| `--shadow-3` | menus, popovers, toasts, hovered interactive cards |
| `--shadow-4` | dialogs, sheets, the mobile navigation |

In dark mode shadows become deeper and black. Surfaces also get lighter as they rise, so depth stays
visible without glow.

## Specimens

The z-order layers are fixed:

| Layer | Token | Value |
|---|---|---|
| Base | `--z-base` | 0 |
| Raised | `--z-raised` | 1 |
| Sticky header | `--z-sticky` | 100 |
| Dropdown | `--z-dropdown` | 1000 |
| Overlay | `--z-overlay` | 1200 |
| Modal | `--z-modal` | 1300 |
| Popover | `--z-popover` | 1400 |
| Toast | `--z-toast` | 1500 |
| Tooltip | `--z-tooltip` | 1600 |

## Usage

- Never invent a z-index. Pick a layer, and prefer the browser top layer (`<dialog>`, the Popover API) for
  overlays.
- Hover lifts move cards up by `--lift` (3px) and raise the shadow one step. Under reduced motion they stay
  put; the shadow change alone is enough.
- Do not stack shadows on nested surfaces. A card inside a dialog uses a hairline.
