---
title: Breadcrumb
tier: core
order: 35
summary: A short trail from the current page back up through its parents. Small text, quiet slashes, and the current page unlinked at the end.
selector: .breadcrumb
target: a
states: default, hover, focus
matrix-variants: trail, with home, collapsed
contrast: --color-fg-link|--color-bg-canvas|4.5; --color-fg-default|--color-bg-canvas|4.5; --color-fg-muted|--color-bg-canvas|4.5; --color-focus-ring|--color-bg-canvas|3
---

## Overview

Use a breadcrumb on pages that sit two or more levels deep, so people can see where they are and step back up:
a checklist inside a project, a note inside a notebook. It goes above the page title in the
[page header](page-header.html). Leave it off top-level pages and flows; the [top bar](top-bar.html) already
covers those, and a [stepper](stepper.html) shows progress through a flow. A breadcrumb shows hierarchy, not
history: never fill it from the back button.

## Anatomy

1. **Landmark** — `<nav aria-label="Breadcrumb">` around an ordered list.
2. **Ancestor link** — each parent level as a link, in the body-small type style.
3. **Separator** — a slash in the subtle text role, drawn by CSS so screen readers skip it.
4. **Current page** — the last item, unlinked, in the default text role with `aria-current="page"`.

```html
<nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><a href="#">Projects</a></li><li><a href="#">Northwind</a></li><li><span aria-current="page">Launch checklist</span></li></ol></nav>
```

## Variants

### trail
The default: every ancestor linked, the current page last.
```html
<nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><a href="#">Projects</a></li><li><a href="#">Northwind</a></li><li><span aria-current="page">Launch checklist</span></li></ol></nav>
```

### with home
A home icon starts the trail when the root has no better name. The icon link needs an accessible name.
```html
<nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><a class="link-standalone" href="#" aria-label="Home"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 10.5 12 4.5l7.5 6V19a1 1 0 0 1-1 1h-4v-5.5h-5V20h-4a1 1 0 0 1-1-1z"/></svg></a></li><li><a href="#">Harbour Notes</a></li><li><a href="#">Research log</a></li><li><span aria-current="page">Interview with Hannah</span></li></ol></nav>
```

### collapsed
Past four levels, keep the root and the last two, and fold the middle into a button that expands the trail in place.
```html
<nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><a href="#">Projects</a></li><li><button class="btn btn--text btn--sm" type="button" aria-expanded="false" aria-label="Show 2 more levels">…</button></li><li><a href="#">Launch checklist</a></li><li><span aria-current="page">Copy review</span></li></ol></nav>
```

### back link
On phones, a single link to the parent replaces the trail. It still sits in the Breadcrumb landmark.
```html
<nav aria-label="Breadcrumb"><a class="link-standalone" href="#"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 6-6 6 6 6"/></svg>Northwind</a></nav>
```

### long labels
Long names wrap to a second line between items; they are never truncated.
```html
<nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><a href="#">Gatherings</a></li><li><a href="#">Field Day, Saturday 17 October 2026</a></li><li><span aria-current="page">Who's bringing what to the picnic and the afternoon workshop</span></li></ol></nav>
```

## Sizes

N/A: one size. The trail uses `--text-body-sm` with `--space-2` between items and separators; links keep the
underline as their affordance.

## States

Ancestor links rest in the link role with an underline; hover moves them to the link-hover role; keyboard focus
draws the sage ring. The current page is plain text in the default role and has no hover or focus. The fold button
in a collapsed trail follows the text [button](button.html) and sets `aria-expanded="true"` once opened. The matrix
forces each state on the first link.

## Responsive

- **360px:** show the back link to the parent, or the collapsed trail when the hierarchy matters; long labels wrap.
- **768px:** the full trail, collapsing past four levels.
- **1024px and up:** the full trail; it shares the [page header](page-header.html)'s measure and never stretches the
  page.

## Theming

Every colour reads a semantic role: links read the link roles, the separator the subtle text role. In dark mode the
links turn light sage and the current page stays the default text role.

## Accessibility

**Role:** a `<nav>` landmark named "Breadcrumb", containing an `<ol>` so the number of levels is announced. The
current page carries `aria-current="page"`. Separators are CSS generated content, so they are not read.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves between the ancestor links (and the fold button). |
| Enter | Follows the focused link; on the fold button, expands the trail and moves focus to the first revealed link. |

**Focus:** the shared 2px `--color-focus-ring`, offset 3px, on each link.

**Labelling:** use one "Breadcrumb" landmark per page. Name an icon-only home link ("Home") and the fold button
("Show 2 more levels").

**Motion:** none; nothing to reduce.

**Touch:** links in the trail are small text links; on touch screens prefer the back link, whose row is 44px tall.

## Content

Use each page's own title, exactly as its page header writes it: **Northwind**, **Launch checklist**. Don't add the
current section from the top bar unless it is a real parent page. Never end with a separator, never link the current
page, and never add "You are here".

## Do and don't

### Do
Leave the current page unlinked, at the end.
```html
<nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><a href="#">Projects</a></li><li><a href="#">Northwind</a></li><li><span aria-current="page">Launch checklist</span></li></ol></nav>
```

### Don't
Link the page people are already on, or end with a separator.
```html
<nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><a href="#">Projects</a></li><li><a href="#">Northwind</a></li><li><a href="#">Launch checklist</a></li><li></li></ol></nav>
```

### Do
Fold the middle of a deep trail and keep both ends.
```html
<nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><a href="#">Projects</a></li><li><button class="btn btn--text btn--sm" type="button" aria-expanded="false" aria-label="Show 2 more levels">…</button></li><li><span aria-current="page">Copy review</span></li></ol></nav>
```

### Don't
Use a breadcrumb on a top-level page; one crumb is not a trail.
```html
<nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><span aria-current="page">Projects</span></li></ol></nav>
```

## Tokens

The trail reads the link, default, muted and subtle text roles, `--text-body-sm` and `--space-2`.

## Code

Use `nav[aria-label="Breadcrumb"] > ol.breadcrumb > li`, with a link in every item but the last and
`aria-current="page"` on the last.
