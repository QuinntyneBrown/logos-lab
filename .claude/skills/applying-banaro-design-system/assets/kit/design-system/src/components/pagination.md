---
title: Pagination
tier: core
order: 36
summary: Move through a long list a page at a time. The signature is calm: one Show more button, a thin sage meter and a plain count.
selector: .pager
target: button, a
states: default, hover, focus, loading, complete
matrix-variants: load more, previous and next
knobs: --bn-pager-progress = share of the list shown, as a percentage; default `1%`, never below `--space-2` wide
contrast: --color-fg-subtle|--color-bg-canvas|4.5; --color-fg-on-accent|--color-accent|4.5; --color-accent|--color-border-default|3; --color-focus-ring|--color-bg-canvas|3
---

## Overview

Use pagination below any list that is too long to show at once: search results, notes, people. The default is
**load more**: one quiet button that appends the next page, a meter that shows how far through the list someone
is, and a count. It keeps people's place and works well with filters. Use **numbered pages** when people need to
return to a known position or share a link to page 3, and **previous and next** for small, fixed-size views such
as a table in a card. Don't paginate lists under 30 items; show them all.

## Anatomy

1. **Container** — `.pager`, centred below the list with generous space above it.
2. **Action** — a quiet, large Show more button; or `.pager__pages`, a row of previous, page and next controls.
3. **Meter** — `.pager__meter`, a 2px track with a sage fill set by `--bn-pager-progress`; decorative.
4. **Count** — `.pager__text`, tabular figures in the subtle text role; it is the meter's text equivalent.

```html
<div class="pager"><button type="button" class="btn btn--quiet btn--lg">Show 12 more notes</button><div class="pager__meter" role="presentation" style="--bn-pager-progress: 8%"><span></span></div><p class="pager__text">12 of 148 notes · page 1 of 13</p></div>
```

## Variants

### load more
The default. The button appends the next page below the last item and moves focus to the first new one.
```html
<div class="pager"><button type="button" class="btn btn--quiet btn--lg">Show 12 more notes</button><div class="pager__meter" role="presentation" style="--bn-pager-progress: 8%"><span></span></div><p class="pager__text" aria-live="polite">12 of 148 notes · page 1 of 13</p></div>
```

### numbered pages
Links to real URLs, so a page can be bookmarked and shared. Show the first, the last and the pages around the
current one; an ellipsis stands for the rest.
```html
<nav class="pager" aria-label="Notes pages"><div class="pager__pages"><a class="btn btn--quiet" href="#" rel="prev"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 6-6 6 6 6"/></svg>Previous</a><a class="btn btn--ghost btn--icon" href="#" aria-label="Page 1">1</a><a class="btn btn--ghost btn--icon" href="#" aria-label="Page 2">2</a><a class="btn btn--ghost btn--icon" href="#" aria-label="Page 3" aria-current="page">3</a><a class="btn btn--ghost btn--icon" href="#" aria-label="Page 4">4</a><span class="pager__text" aria-hidden="true">…</span><a class="btn btn--ghost btn--icon" href="#" aria-label="Page 13">13</a><a class="btn btn--quiet" href="#" rel="next">Next<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 6 6 6-6 6"/></svg></a></div><p class="pager__text">Showing 25–36 of 148 notes</p></nav>
```

### previous and next
For a small view that pages in place, such as a table inside a card. Buttons, because the URL does not change.
```html
<nav class="pager" aria-label="Members pages"><div class="pager__pages"><button type="button" class="btn btn--quiet"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 6-6 6 6 6"/></svg>Previous</button><p class="pager__text" aria-live="polite">Page 2 of 4</p><button type="button" class="btn btn--quiet">Next<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 6 6 6-6 6"/></svg></button></div></nav>
```

## Sizes

N/A: one size per variant. Show more uses the large button (52px) so it reads as the end of the list; page
controls use the default 44px size. The meter is `--size-pager-meter` (16rem) wide and `--border-width-thick` tall.

## States

The controls follow [button](button.html): hover adds the linen wash, focus draws the sage ring. While the next page
loads, the button keeps its label, adds a spinner and sets `aria-busy="true"`; the list keeps its place. When
everything is shown (**complete**), the button goes away, the meter fills and the count says so; in a previous and
next pager the control at the end is disabled. The current page in numbered pages is the sage pill with
`aria-current="page"`.

### complete
```html
<div class="pager"><div class="pager__meter" role="presentation" style="--bn-pager-progress: 100%"><span></span></div><p class="pager__text" aria-live="polite">All 148 notes shown</p></div>
```

### previous and next / loading
```html
<nav class="pager" aria-label="Members pages"><div class="pager__pages"><button type="button" class="btn btn--quiet"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 6-6 6 6 6"/></svg>Previous</button><p class="pager__text" aria-live="polite">Page 2 of 4</p><button type="button" class="btn btn--quiet" aria-busy="true"><span class="spinner" aria-hidden="true"></span>Next</button></div></nav>
```

### previous and next / complete
```html
<nav class="pager" aria-label="Members pages"><div class="pager__pages"><button type="button" class="btn btn--quiet"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 6-6 6 6 6"/></svg>Previous</button><p class="pager__text" aria-live="polite">Page 4 of 4</p><button type="button" class="btn btn--quiet" disabled>Next<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 6 6 6-6 6"/></svg></button></div></nav>
```

## Responsive

- **360px:** load more is unchanged; numbered pages collapse to Previous, "Page 3 of 13" and Next so the row never
  wraps; the meter shrinks to the container.
- **768px:** numbered pages show the first, last and one page either side of the current one.
- **1024px and up:** two pages either side of the current one. The pager stays centred under the list at every width.

## Theming

Every colour reads a semantic role. In dark mode the meter's fill and the current page turn light sage, the track
is the dark default border and the count stays in the subtle text role. `--bn-pager-progress` is the only knob.

## Accessibility

**Role:** load more is a native `<button>`; numbered pages are links inside `<nav aria-label="… pages">`, with
`aria-current="page"` on the current one; previous and next in place are buttons. The meter is
`role="presentation"`: the count says the same thing in words.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves between the pager's controls. |
| Enter, Space | Activates Show more, Previous or Next. Page links activate with Enter. |

**Focus:** after Show more, move focus to the first new item so keyboard users continue where the new content
starts. After paging in place, keep focus on the control that was pressed. Never send focus to the top of the page.

**Labelling:** page links are named "Page 3", not "3". The count is `aria-live="polite"`, so the new total is
announced after loading. On the last page, disable Next rather than removing it, so the row doesn't shift under the pointer.

**Motion:** new items may settle in with the shared entrance; the meter's fill changes without animation. Reduced
motion removes the entrance.

**Touch:** every control is at least 44px. Show more spans the comfortable large size so it is easy to hit with a thumb.

## Content

Say what loads and how many: **Show 12 more notes**, not "Load more" or "More". The count uses figures and the
item's name: **12 of 148 notes · page 1 of 13**, **Showing 25–36 of 148 notes**. At the end, say **All 148 notes
shown**; never "No more results".

## Do and don't

### Do
Name the thing and the number in the button, and keep a count beside it.
```html
<div class="pager"><button type="button" class="btn btn--quiet btn--lg">Show 12 more people</button><div class="pager__meter" role="presentation" style="--bn-pager-progress: 25%"><span></span></div><p class="pager__text">12 of 48 people</p></div>
```

### Don't
Use a vague primary button; Show more is quiet, and "Load more" says nothing about what comes.
```html
<div class="pager"><button type="button" class="btn btn--primary btn--lg">Load more</button></div>
```

### Do
Number pages only when a page has a URL people return to.
```html
<nav class="pager" aria-label="Search results pages"><div class="pager__pages"><a class="btn btn--ghost btn--icon" href="#" aria-label="Page 1" aria-current="page">1</a><a class="btn btn--ghost btn--icon" href="#" aria-label="Page 2">2</a><a class="btn btn--ghost btn--icon" href="#" aria-label="Page 3">3</a><a class="btn btn--quiet" href="#" rel="next">Next</a></div></nav>
```

### Don't
Hide the end of the list behind endless scrolling with no count; people can't reach the footer or know how much is left.
```html
<div class="pager"><span class="spinner spinner--lg" aria-hidden="true"></span><p class="pager__text">Loading…</p></div>
```

## Tokens

The pager reads the subtle text role for the count, the default border and accent for the meter, `--size-pager-meter`,
and the button roles for its controls.

## Code

Set `--bn-pager-progress` on `.pager__meter` to the share already shown (`12 / 148` is `8%`). Use `nav.pager` with a
name when it holds page links; a plain `div.pager` is enough around a single Show more button.
