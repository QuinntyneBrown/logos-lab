---
title: Iconography
summary: A restrained line set on a 24-unit grid — 1.5 stroke, round caps and joins, drawn in currentColor.
---

## Principles

Icons are simple line drawings on a **24×24 viewBox** with `stroke-width: 1.5`, round caps and joins, no
fill, coloured by `currentColor`. They render at 20px (`.icon`), 16px (`.icon--sm`) or 24px
(`.icon--lg`). The `.icon` class sets all of this. Inline the SVG and give it only `viewBox` and paths.

- An icon **beside visible text** is decorative: `aria-hidden="true"`.
- A **standalone icon control** needs an action name on the control: `aria-label="Edit project"`.
- One meaning per icon across the product. Plus means add, the arrow means continue, the cross means close
  or remove.
- Status combines an icon or dot with words.

## Specimens

```html
<div class="cluster">
  <span class="cluster"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>Add</span>
  <span class="cluster"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>Search</span>
  <span class="cluster"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg>Continue</span>
  <span class="cluster"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>Close</span>
  <span class="cluster"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>Edit</span>
  <span class="cluster"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14.5" rx="2.5"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/></svg>Calendar</span>
  <span class="cluster"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 16h-5.5L7 19.5V16a2.5 2.5 0 0 1-2.5-2.5z"/></svg>Message</span>
  <span class="cluster"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/></svg>Notifications</span>
  <span class="cluster"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>Place</span>
  <span class="cluster"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4.5 12.5 5 5 10-11"/></svg>Done</span>
  <span class="cluster"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Attention</span>
  <span class="cluster"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg>Menu</span>
</div>
```

## Usage

- Draw new icons in the same hand: geometric, open and slightly rounded, with no filled shapes except the
  brand's sun dot.
- Keep icons optical: 2px of padding inside the 24-unit box, centred on the pixel grid.
- The **brand mark** is the only illustration with a fill. A single warm dot (`.brand__sun`, the warning
  icon tone) sits beside a line mark. Each product draws its own mark in this style. See
  [Brand](../components/brand.html).
- Never use an icon font or emoji as an icon.
