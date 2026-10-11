---
title: Theming
summary: Semantic roles carry light and dark; components never know which theme they are in.
---

## Principles

Every component reads **semantic roles**, so the whole product changes theme by swapping role values:

- `:root` holds the light values: a birch-paper morning.
- `[data-theme="dark"]` holds the dark values: a winter evening by lamplight. This block is the only place
  dark values are written.
- `@media (prefers-color-scheme: dark)` applies the same dark values automatically unless the page asks for
  `data-theme="light"`. **The build generates this block** from the dark block.
- `[data-theme="light"]` resets roles inside a dark page so a light specimen nests correctly. The build
  generates it as well.

Theme state lives on `<html data-theme>`. Pages honour the user's system preference until they choose
otherwise; the choice is remembered.

## Specimens

The same card renders in both themes from the same markup.

## Usage

- Never write `[data-theme="dark"] .my-component { … }`. If a component looks wrong in dark mode, the role it
  reads is wrong. Fix the role, or add one to `tokens.css` in both `:root` and the dark block.
- Images and photos stay as they are. Illustrated tiles use tile roles, which have dark values.
- Component knobs (`--{{prefix}}-button-bg`, `--{{prefix}}-field-border`, `--{{prefix}}-progress-value`) alias semantic roles and
  inherit both themes for free.
- **Accent recolour:** the accent ramp can be swapped for another hue with `recolour_accent.py`. Success
  stays sage, so status meaning is unchanged.
- Preference overrides are part of theming. `prefers-contrast: more` strengthens borders and muted text;
  `forced-colors: active` hands focus and borders to system colours.
