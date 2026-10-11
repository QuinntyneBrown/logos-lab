---
title: Shape
summary: Soft corners, pill-shaped actions and small square portraits with rounded edges.
---

## Principles

Shapes are soft but never bubbly:

| Radius | Use |
|---|---|
| `--radius-xs` (4px) | checkboxes, typed-name chips, inline code |
| `--radius-sm` (8px) | tooltips, skeleton lines, small images in lists |
| `--radius-md` (16px) | inputs, avatars and portraits, menu items, alerts, tiles |
| `--radius-lg` (20px) | cards, tables, toasts, panels inside pages |
| `--radius-xl` (28px) | dialogs, sheets, the sign-in card, the grain panel |
| `--radius-full` | buttons, chips, badges, search, switches |

**Actions are pills.** Buttons, chips, the search field and select triggers are fully rounded.
**Portraits are small rounded squares** (`--radius-md`), never circles. This is one of the clearest
signatures of the look. Circles are reserved for presence dots, spinners and the generic avatar-icon
fallback.

## Usage

- Borders are `--border-width-hairline` (1px). Selected states and focus rings use
  `--border-width-thick` (2px), and only the large spinner uses `--border-width-heavy` (3px).
- Nested corners step down one size. A card (lg) holds inputs (md), and an input group holds pills (full).
- Media inside cards takes the card's top radius (`.card__media`).
- Never mix radii within one component family. If a new surface needs a radius, pick it from the scale.
