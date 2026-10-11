---
title: Search and filter toolbar
tier: standard
order: 75
summary: Say how many results there are, let people sort them, and keep every filter in view and easy to undo.
selector: .toolbar, .filters, .filter
target: .select__control
states: default, empty
matrix-variants: toolbar, active filters
contrast: --color-fg-default|--color-bg-canvas|4.5; --color-fg-muted|--color-bg-canvas|4.5; --color-fg-subtle|--color-bg-canvas|4.5; --color-fg-accent|--color-accent-subtle|4.5; --color-border-strong|--color-bg-surface|3; --color-focus-ring|--color-bg-canvas|3
---

## Overview

The toolbar sits between a page's search and its results. It states the **result count**, offers a
**sort** [select](select.html) and, below 1024px, a **Filters** button that opens the filter sheet. When
filters are on, a stacked toolbar lists them as removable pills so nothing narrows the results silently.
The **filters panel** groups [checkboxes](checkbox.html), [chips](chip.html) and a [slider](slider.html)
into labelled fieldsets: a sticky sidebar from 1024px, a bottom sheet (`popover`) below it. For a table's
own sort and paging use [table](table.html) and [pagination](pagination.html).

## Anatomy

1. **Count** — `.toolbar__count`: "Showing **1–12** of **86** notes", with the numbers in the default colour.
2. **Tools** — `.toolbar__tools`: the Filters button (`.filters-btn`, hidden from 1024px) and a labelled sort select.
3. **Active filters** — `.active-filters`: removable pills for each applied filter, plus **Clear all**.
4. **Filters panel** — `.filters`: a head (`.filters__head`) with title and Clear all, then one `.filter` fieldset per facet.
5. **Facet** — `fieldset.filter` with an overline `.filter__legend` and its controls: a `.filter__list` of checks with counts, a row of chips, or a range.
6. **Done** — `.filters__done`: a full-width primary button that closes the sheet and states the new count.

```html
<div class="toolbar">
  <p class="toolbar__count">Showing <strong>1–12</strong> of <strong>86</strong> notes</p>
  <div class="toolbar__tools">
    <button class="btn btn--quiet btn--sm filters-btn" type="button"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/></svg>Filters</button>
    <label class="select"><span>Sort by</span><span class="select__wrap"><select class="select__control"><option selected>Recently edited</option><option>Newest first</option><option>Oldest first</option><option>Title, A to Z</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></label>
  </div>
</div>
```

## Variants

### toolbar
Count on the left, tools on the right. From 1024px the Filters button hides because the panel is in view.
```html
<div class="toolbar">
  <p class="toolbar__count" aria-live="polite">Showing <strong>1–12</strong> of <strong>86</strong> notes</p>
  <div class="toolbar__tools">
    <button class="btn btn--quiet btn--sm filters-btn" type="button"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/></svg>Filters</button>
    <label class="select"><span>Sort by</span><span class="select__wrap"><select class="select__control"><option selected>Recently edited</option><option>Newest first</option><option>Oldest first</option><option>Title, A to Z</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></label>
  </div>
</div>
```

### active filters
`toolbar--stacked`: the count and tools on one line, the applied filters as removable pills beneath.
```html
<div class="toolbar toolbar--stacked">
  <div class="cluster cluster--between">
    <p class="toolbar__count" aria-live="polite"><strong>14</strong> notes match</p>
    <div class="toolbar__tools">
      <button class="btn btn--quiet btn--sm filters-btn" type="button"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/></svg>Filters · 3</button>
      <label class="select"><span>Sort by</span><span class="select__wrap"><select class="select__control"><option selected>Recently edited</option><option>Newest first</option><option>Title, A to Z</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></label>
    </div>
  </div>
  <ul class="active-filters" aria-label="Active filters">
    <li><span class="pill pill--accent">Type: Decisions <button class="icon-btn icon-btn--sm" type="button" data-remove-demo aria-label="Remove filter Type: Decisions"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></span></li>
    <li><span class="pill pill--accent">Author: Grace Liu <button class="icon-btn icon-btn--sm" type="button" data-remove-demo aria-label="Remove filter Author: Grace Liu"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></span></li>
    <li><span class="pill pill--accent">Edited in the last 30 days <button class="icon-btn icon-btn--sm" type="button" data-remove-demo aria-label="Remove filter Edited in the last 30 days"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></span></li>
    <li><button class="btn btn--text btn--sm" type="button">Clear all</button></li>
  </ul>
</div>
```

### filters panel
The facets, shown in flow. In a product the same `aside.filters` carries the `popover` attribute and opens
as a bottom sheet below 1024px; from 1024px it is a sticky sidebar and the Done button hides.
```html
<aside class="filters" aria-labelledby="notes-filters-title">
  <div class="filters__head">
    <h3 class="filters__title" id="notes-filters-title">Filters</h3>
    <button class="btn btn--text btn--sm" type="button">Clear all</button>
  </div>
  <fieldset class="filter">
    <legend class="filter__legend">Type</legend>
    <ul class="filter__list">
      <li><label class="check"><input class="check__box" type="checkbox" name="type" value="notes"><span>Notes</span><span class="check__count">54</span></label></li>
      <li><label class="check"><input class="check__box" type="checkbox" name="type" value="decisions" checked><span>Decisions</span><span class="check__count">18</span></label></li>
      <li><label class="check"><input class="check__box" type="checkbox" name="type" value="meetings"><span>Meeting notes</span><span class="check__count">14</span></label></li>
    </ul>
  </fieldset>
  <fieldset class="filter">
    <legend class="filter__legend">Author</legend>
    <ul class="chips">
      <li><button class="chip" type="button" aria-pressed="false">Amara Osei <span class="chip__count">21</span></button></li>
      <li><button class="chip" type="button" aria-pressed="false">Daniel Reyes <span class="chip__count">17</span></button></li>
      <li><button class="chip" type="button" aria-pressed="true">Grace Liu <span class="chip__count">29</span></button></li>
      <li><button class="chip" type="button" aria-pressed="false">Hannah Kowalski <span class="chip__count">19</span></button></li>
    </ul>
  </fieldset>
  <fieldset class="filter">
    <legend class="filter__legend">Last edited</legend>
    <div class="range">
      <label class="range__label" for="notes-edited"><span>Within the last</span><output for="notes-edited" data-format="{value} days">30 days</output></label>
      <input class="range__input" id="notes-edited" name="edited" type="range" min="1" max="90" value="30" aria-valuetext="30 days">
      <div class="range__ends" aria-hidden="true"><span>1 day</span><span>90 days</span></div>
    </div>
  </fieldset>
  <button class="btn btn--primary filters__done" type="button">Show 14 notes</button>
</aside>
```

## Sizes

N/A: one size. Tools use the small button and the default select so the toolbar stays one line high on
wide screens; facets inherit their controls' sizes.

## States

The sort select and Filters button follow their own states: hover darkens the border, focus draws the
sage ring. **Empty** replaces the count with what matched nothing and offers to clear filters; the
toolbar never disappears, so people can always undo. Checked facets, pressed chips and the range value
are reflected in the active-filter pills.

### toolbar / empty
```html
<div class="toolbar">
  <p class="toolbar__count" aria-live="polite"><strong>No notes</strong> match “launch plan” in Decisions</p>
  <div class="toolbar__tools">
    <button class="btn btn--text btn--sm" type="button">Clear filters</button>
    <label class="select"><span>Sort by</span><span class="select__wrap"><select class="select__control" disabled><option selected>Recently edited</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></label>
  </div>
</div>
```

### active filters / empty
```html
<div class="toolbar toolbar--stacked">
  <p class="toolbar__count" aria-live="polite"><strong>No notes</strong> match these filters. Try removing one.</p>
  <ul class="active-filters" aria-label="Active filters">
    <li><span class="pill pill--accent">Type: Decisions <button class="icon-btn icon-btn--sm" type="button" data-remove-demo aria-label="Remove filter Type: Decisions"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></span></li>
    <li><span class="pill pill--accent">Author: Hannah Kowalski <button class="icon-btn icon-btn--sm" type="button" data-remove-demo aria-label="Remove filter Author: Hannah Kowalski"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></span></li>
    <li><span class="pill pill--accent">Edited in the last 7 days <button class="icon-btn icon-btn--sm" type="button" data-remove-demo aria-label="Remove filter Edited in the last 7 days"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></span></li>
    <li><button class="btn btn--primary btn--sm" type="button">Clear all filters</button></li>
  </ul>
</div>
```

## Responsive

- **360px:** the count takes its own line and the tools wrap beneath it; the Filters button opens the
  panel as a bottom sheet (up to 86% of the viewport, scrolling inside) with a full-width **Show 14 notes**
  button. Active-filter pills wrap onto as many lines as they need.
- **768px:** count and tools share one line; the sheet still opens from the bottom.
- **1024px and up:** the panel becomes a sticky sidebar beside the results, the Filters button and the
  Done button hide, and changes apply as they are made.

## Theming

The toolbar draws only a hairline (`--color-border-default`) under itself; the sheet uses
`--color-bg-surface-raised` with `--shadow-4` and the shared backdrop. Pressed chips and active pills read
`--color-accent-subtle` with `--color-fg-accent` in both themes.

## Accessibility

**Role:** the count is a paragraph with `aria-live="polite"` so a new count is announced after each change.
The panel is an `<aside>` labelled by its title; each facet is a `<fieldset>` with a `<legend>`; active
filters are a labelled `<ul>`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves through the Filters button, the sort select, each pill's remove button and Clear all. |
| Enter, Space | Opens the sheet, toggles a chip or checkbox, or removes a filter. |
| Arrow keys | Change the sort option or the range value. |
| Escape | Closes the filter sheet and returns focus to the Filters button. |

**Focus:** the shared sage ring on every control. When a pill is removed, focus moves to the next pill, or
to the count when none are left.

**Labelling:** the sort select is wrapped in its visible label "Sort by". Each remove button says what it
removes ("Remove filter Author: Grace Liu"). The range has `aria-valuetext` in words.

**Motion:** the sheet settles in over 360ms; under reduced motion it appears without movement.

**Touch:** checks and chips are at least 36px tall; pill remove buttons keep the 24px minimum and sit at
the pill's end, away from the next pill.

## Content

- Count with the noun: "Showing **1–12** of **86** notes", "**14** notes match". Never "Results: 14".
- Empty states say what matched nothing and how to widen it: "No notes match “launch plan” in Decisions".
- Pills read **Facet: value** ("Author: Grace Liu"), or a short phrase for ranges ("Edited in the last 30 days").
- The Done button states the outcome: **Show 14 notes**, not "Apply".

## Do and don't

### Do
Show every applied filter as a pill that can be removed on its own.
```html
<ul class="active-filters" aria-label="Active filters"><li><span class="pill pill--accent">Author: Grace Liu <button class="icon-btn icon-btn--sm" type="button" aria-label="Remove filter Author: Grace Liu"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></span></li><li><button class="btn btn--text btn--sm" type="button">Clear all</button></li></ul>
```

### Don't
Hide applied filters behind a count; people cannot tell why results are missing.
```html
<div class="toolbar"><p class="toolbar__count">14 results</p><div class="toolbar__tools"><button class="btn btn--quiet btn--sm" type="button">Filters (3)</button></div></div>
```

### Do
Name the Done button with the outcome.
```html
<button class="btn btn--primary btn--block" type="button">Show 14 notes</button>
```

### Don't
A generic "Apply" hides what will happen.
```html
<button class="btn btn--primary btn--block" type="button">Apply</button>
```

## Tokens

The toolbar reads the border, muted and subtle roles and the overline type role for legends. The sheet
reads `--color-bg-surface-raised`, `--shadow-4`, `--radius-xl` and the backdrop role.

## Code

Give the panel an `id` and the `popover` attribute in production, and point the Filters button at it with
`popovertarget`. The panel's CSS turns it into a sticky sidebar from 1024px, so one element serves both layouts.
