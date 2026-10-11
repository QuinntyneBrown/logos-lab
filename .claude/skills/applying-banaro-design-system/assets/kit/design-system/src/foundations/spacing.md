---
title: Spacing
summary: A 4px rhythm with a generous top end. Room is part of the calm.
---

## Principles

Spacing follows a **4px base**: 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128 and 160px. The scale
is dense at the small end, for the inside of controls, and generous at the large end, for space between
sections. The look depends on that generosity: sections breathe with `--layout-section-gap` (96px, rising
to 128px on wide screens) and cards hold 24px of padding.

- **Inside components:** `--space-1` to `--space-6`.
- **Between related items:** `--space-3` to `--space-6`. Use `.stack` and `.cluster`, not margins on
  children.
- **Between groups:** `--space-8` to `--space-12`.
- **Between page sections:** `--layout-section-gap`.

## Usage

- Use `gap` on grid and flex parents (`.stack`, `.cluster`, `.grid`, `.form`) instead of margins.
- Never introduce an off-grid value such as 14px or 18px. If a component needs a new geometry, add a named
  token to `tokens.css` under *component geometry*.
- Keep vertical rhythm consistent within a component family. Cards, panels and dialogs all pad 24px on
  phones; larger surfaces grow to 40–64px on desktop.
- `--space-0-5` (2px) is only for hairline nudges such as the pressed-button offset.
