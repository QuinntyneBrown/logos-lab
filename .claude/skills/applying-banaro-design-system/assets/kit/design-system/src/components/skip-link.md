---
title: Skip link
tier: core
order: 30
summary: The first thing a keyboard reaches. A dark pill that appears on focus and jumps past the top bar to the page's main content.
selector: .skip-link
target: .skip-link
states: default, focus
matrix-variants: to main content, to search
contrast: --color-fg-inverse|--color-bg-inverse|4.5; --color-focus-ring|--color-bg-canvas|3
---

## Overview

Every page starts with a skip link so keyboard and switch users can pass the [top bar](top-bar.html) in one
keystroke instead of tabbing through every link in it. It stays hidden until it has focus, then appears over
the top-left corner of the bar. It is required on every page that has repeated navigation before the content;
pages without any, such as a bare [sign-in card](auth-card.html), can leave it out.

## Anatomy

1. **Link** — the first focusable element in `<body>`, pointing at the main landmark: `href="#main"`.
2. **Pill** — inverse surface and text, fully rounded, the label type style; it sits above every layer (`--z-tooltip`).
3. **Target** — `<main id="main" tabindex="-1">`, so focus really moves there and the next Tab continues from the content.

```html
<div class="header"><a class="skip-link" href="#main" data-state="focus">Skip to content</a><div class="header__inner"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a></div></div>
```

## Variants

### to main content
The one every page needs. It is hidden here until it has focus: Tab into this specimen to reveal it.
```html
<div class="header"><a class="skip-link" href="#main">Skip to content</a><div class="header__inner"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a><div class="header__actions"><a class="btn btn--primary btn--sm" href="#">New note</a></div></div></div>
```

### to search
A second skip link for pages where people come to search first, such as a people directory. It follows the
first one in source order and appears in the same place.
```html
<div class="header"><a class="skip-link" href="#main">Skip to content</a><a class="skip-link" href="#skip-search">Skip to search</a><div class="header__inner"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a><form class="search header__search" role="search" action="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg><label class="vh" for="skip-search">Search people</label><input class="search__input" id="skip-search" type="search" placeholder="Name or skill"></form></div></div>
```

### revealed
What a keyboard user sees after the first Tab: the pill over the brand, clear of the bar's own controls.
```html
<div class="header"><a class="skip-link" href="#main" data-state="focus">Skip to content</a><div class="header__inner"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a><nav class="nav" aria-label="Primary"><ul class="nav__list"><li><a class="nav__link" href="#">Projects</a></li><li><a class="nav__link" href="#">Notes</a></li><li><a class="nav__link" href="#">Gatherings</a></li></ul></nav><div class="header__actions"><a class="btn btn--text header__signin" href="#">Sign in</a><a class="btn btn--primary btn--sm" href="#">Get started</a></div></div></div>
```

## Sizes

N/A: one size. The pill is 44px tall (label type with `--space-3` padding) so it is easy to see and to tap
on a tablet with a keyboard.

## States

Hidden by default: moved above the viewport and clipped, so it never shows through a nested or scrolled header.
On focus it slides to `--space-4` from the top-left corner, above every other layer, and keeps the shared focus
ring. Hover only matters while it is visible; the label stays in the inverse text role.

### to search / focus
```html
<div class="header"><a class="skip-link" href="#main">Skip to content</a><a class="skip-link" href="#skip-search-f" data-state="focus">Skip to search</a><div class="header__inner"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a><form class="search header__search" role="search" action="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg><label class="vh" for="skip-search-f">Search people</label><input class="search__input" id="skip-search-f" type="search" placeholder="Name or skill"></form></div></div>
```

## Responsive

N/A: the link is the same at every width. It sits `--space-4` from the top-left corner at 360px, 768px and
1024px and up, over the brand, and never pushes the layout.

## Theming

The pill reads `--color-bg-inverse` and `--color-fg-inverse`, so it is charcoal on linen in light mode and linen on
charcoal in dark mode; it always contrasts with the bar beneath it.

## Accessibility

**Role:** a native link (`<a href="#main">`). The target is the `<main>` landmark with `id="main"` and
`tabindex="-1"`; a `role="search"` region can be a second target.

| Key | Effect |
|---|---|
| Tab (first press on the page) | Focuses the skip link and reveals it. |
| Enter | Moves focus to the main content; the next Tab continues from there. |
| Tab (again, without Enter) | Hides the skip link and moves to the brand in the top bar. |

**Focus:** the pill shows the shared 2px `--color-focus-ring`, offset 3px. A sticky header must not cover the
target: give `main` a `scroll-margin-top` equal to `--layout-topbar-height`.

**Labelling:** say where the link goes: **Skip to content**, **Skip to search**. The text is visible whenever the
link has focus, so it needs no `aria-label`.

**Motion:** the pill appears in place without animation; nothing to reduce.

**Touch:** the pill is 44px tall. It only appears with a keyboard; it is never the only way to reach the content.

## Content

Use **Skip to content** on every page. Add **Skip to search** only where search is the main task. Never more than
two. Sentence case, no "Click here", no "main" (people don't think in landmarks).

## Do and don't

### Do
Make the skip link the first focusable element and point it at a real target.
```html
<div class="header"><a class="skip-link" href="#main" data-state="focus">Skip to content</a><div class="header__inner"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a></div></div>
```

### Don't
Hide it with `display: none`, or point it at an id that doesn't exist: the link then does nothing, silently.

### Do
Keep the label short and say where it goes.
```html
<div class="header"><a class="skip-link" href="#main" data-state="focus">Skip to content</a><div class="header__inner"><span class="muted">Projects · Notes · Gatherings</span></div></div>
```

### Don't
Say what the link is instead of where it goes; "Skip navigation links" and "Accessibility shortcut" make people guess.
```html
<div class="header"><a class="skip-link" href="#main" data-state="focus">Skip navigation links</a><div class="header__inner"><span class="muted">Projects · Notes · Gatherings</span></div></div>
```

## Tokens

The pill reads the inverse surface and text roles, the full radius, the label type style and `--z-tooltip`.

## Code

Put `<a class="skip-link" href="#main">Skip to content</a>` directly after `<body>`, before the header, and
give the main landmark `id="main" tabindex="-1"`.
