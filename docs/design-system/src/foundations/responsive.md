---
title: Responsive
summary: Mobile-first at 360px, comfortable at 768px, spacious from 1024px, without losing context on the way.
---

## Principles

Design and review every screen at **360px, 768px and 1280px**. Styles are mobile-first: base rules serve
phones, and `min-width` queries at the named breakpoints add room.

| Breakpoint | Token | What changes |
|---|---|---|
| 40rem (640px) | `--layout-breakpoint-sm` | dialogs centre instead of rising from the bottom; form cards gain padding |
| 48rem (768px) | `--layout-breakpoint-md` | 8 columns; two-up card grids; field rows sit side by side |
| 64rem (1024px) | `--layout-breakpoint-lg` | 12 columns; the full top-bar navigation; sidebars, split panes and filters dock |
| 80rem (1280px) | `--layout-breakpoint-xl` | four-up feature and project grids |

- **Reflow, don't hide.** Content keeps its reading order. Navigation moves into a popover menu, and
  filters move into a bottom sheet.
- **No horizontal page scroll** at 360px. Only data tables, tab lists and state matrices scroll inside their
  own container.
- **Targets grow, not shrink.** Controls stay at least 44px tall on touch layouts.

## Usage

- Use the breakpoints as literal values in media queries (`@media (min-width: 64rem)`). Custom properties
  cannot be read inside media queries; the tokens document the values.
- Long words and names wrap (`overflow-wrap: anywhere` on names and facts). Never truncate a person's name
  without a full version nearby.
- Test every mock state at all three widths in both themes with `screenshot_mocks.py`.
