---
title: Brand
tier: core
order: 31
summary: The product's mark and lowercase wordmark. A quiet line drawing in the accent, with one warm sun dot.
selector: .brand
layout: inline
target: a
states: default, hover, focus
matrix-variants: wordmark, mark only
contrast: --color-fg-default|--color-bg-canvas|4.5; --color-accent|--color-bg-canvas|3; --color-focus-ring|--color-bg-canvas|3
---

## Overview

The brand sits first in the [top bar](top-bar.html) and links home. Use the wordmark with the mark wherever
there is room, the mark alone where there isn't, and the unlinked lockup on screens that should not offer a way
out, such as sign-in and e-mail. The brand is not a heading and not a button: page titles belong in the
[page header](page-header.html).

The kit ships a placeholder mark: a leaf with its midrib and stem, the sun dot in the open corner above it. **Each product replaces it** with its own
mark, drawn in the same style: a 32×32 `viewBox`, `fill="none" stroke="currentColor"`, a 1.6 stroke with round
caps, and one small filled circle with `class="brand__sun"` — the warm sun dot that every product in this family
keeps.

## Anatomy

1. **Link** — the whole lockup is one `<a>` with `aria-label="{{app}} home"`.
2. **Mark** — a 32px inline SVG, line-drawn in `--color-accent`, `aria-hidden="true"`.
3. **Sun dot** — `circle.brand__sun`, filled with the warm `--color-warning-icon`; the signature motif.
4. **Wordmark** — the product name, `{{app_lower}}`, lowercase, semibold, slightly tightened.

```html
<a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a>
```

## Variants

### wordmark
The default lockup: mark, then the lowercase name. Use it in the top bar and the footer.
```html
<a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a>
```

### mark only
`.brand--mark-only` hides the wordmark visually but keeps it in the markup. Use it in compact shells and a
collapsed sidebar; the link keeps its `aria-label`.
```html
<a class="brand brand--mark-only" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a>
```

### static
The same lockup without a link, for sign-in cards, e-mail headers and printed pages. It is one image named by
the product.
```html
<div class="brand" role="img" aria-label="{{app}}"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span aria-hidden="true">{{app_lower}}</span></div>
```

### replacement mark
How a product swaps in its own mark: new paths in the same 32×32 line style, the sun dot kept. This sample
draws a folded page, as a notes product might.
```html
<a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M8 5.5h11l5 5V26a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 7 26V7a1.5 1.5 0 0 1 1-1.5zM19 5.5v5h5M11.5 16h9M11.5 20.5h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="26.5" cy="5" r="2.4"/></svg><span>{{app_lower}}</span></a>
```

## Sizes

N/A: one size. The mark is 32px and the wordmark uses `--font-size-lg`; the lockup has a 44px minimum height, so
the link is a comfortable target. Don't scale the brand up for heroes; let the [hero](hero.html) title carry the
page.

## States

Hover deepens the mark to `--color-accent-hover` and lifts the sun dot 2px, a small sunrise; the wordmark stays
in the default text role. Keyboard focus draws the shared sage ring around the whole 44px lockup. The static lockup has no states.

## Responsive

The lockup never wraps. Below 30rem in a crowded bar (search, three actions), switch to the mark only; at
768px and 1024px and up the wordmark always shows. The brand keeps its 44px target at every width.

## Theming

The mark reads `--color-accent`, so it turns light sage in dark mode; the sun dot reads `--color-warning-icon`
and stays warm in both themes. The wordmark uses `--color-fg-default`. Never recolour the lockup per page.

## Accessibility

**Role:** a native link home (`<a href>`), named by `aria-label="{{app}} home"`. The SVG is
`aria-hidden="true"`. The static lockup is `role="img"` named `{{app}}`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves focus to and from the brand; it is the first stop after the skip link. |
| Enter | Goes to the home page. |

**Focus:** the 2px `--color-focus-ring`, offset 3px, wraps the mark and the wordmark together.

**Labelling:** the accessible name says where the link goes: "{{app}} home". Keep the visible wordmark inside
the link so the name and the visible text agree. On the home page itself, keep the link and add
`aria-current="page"`.

**Motion:** on hover the mark's colour changes over `--duration-base` (420ms) and the sun dot rises 2px over `--duration-slow` (640ms); reduced motion removes both transitions and the dot simply moves.

**Touch:** the lockup is at least 44px tall in the top bar. The mark-only link keeps the same 44px target.

## Content

Write the product name exactly as the wordmark does: **{{app_lower}}** in the lockup, **{{app}}** in sentences
and in the accessible name. Never add a tagline, a version number or "Beta" inside the lockup; put status in a
[badge](badge.html) beside it.

## Do and don't

### Do
Keep the wordmark beside the mark when there is room, and name the link by where it goes.
```html
<a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a>
```

### Don't
Ship a mark-only link with no name; a screen reader announces only "link".
```html
<a class="brand brand--mark-only" href="#" aria-label="Link"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg></a>
```

### Do
Draw a replacement mark in the same line style and keep the sun dot.
```html
<a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M8 5.5h11l5 5V26a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 7 26V7a1.5 1.5 0 0 1 1-1.5zM19 5.5v5h5M11.5 16h9M11.5 20.5h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="26.5" cy="5" r="2.4"/></svg><span>{{app_lower}}</span></a>
```

### Don't
Turn the sun dot into a status or notification indicator; it is decoration, not information.
```html
<a class="brand" href="#" aria-label="{{app}} home, 3 unread"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="5"/></svg><span>{{app_lower}} (3)</span></a>
```

## Tokens

The mark reads the accent and accent-hover roles, the sun dot the warning icon role, and the wordmark the
default text role and large font size.

## Code

Paste the lockup as inline SVG (never an `<img>`) so the mark follows the theme through `currentColor`. To
replace the mark, change only the `<path>`; keep the `viewBox`, the stroke attributes and `circle.brand__sun`.
