---
title: Container, grid and stack
tier: core
order: 40
summary: The layout primitives every page is built from. A centred container, vertical stacks, wrapping clusters, an auto-fit grid and the page's column patterns.
selector: .wrap, .stack, .cluster, .grid, .two-col, .split, .sidebar-layout, .section
states: default
matrix-variants: cluster
contrast: --color-fg-default|--color-bg-canvas|4.5; --color-fg-link|--color-bg-canvas|4.5
---

## Overview

These classes place components; they have no colour or content of their own. Build every page from them instead of
writing one-off margins: `.wrap` sets the page container, `.stack` spaces things vertically, `.cluster` lines things up
in a wrapping row, `.grid` tiles cards, and `.two-col`, `.split` and `.sidebar-layout` are the three page shapes.
`.section` with `.section__head` opens each band of a long page. Spacing comes only from the
[spacing](../foundations/spacing.html) and [layout](../foundations/layout.html) tokens, so pages stay on one rhythm.

## Anatomy

1. **Container** — `.wrap`: full width up to `--layout-container-max` (74rem) plus the responsive `--layout-margin` on each side, centred. `.narrow` caps a block at `--layout-narrow` (44rem) for forms and prose.
2. **Stack** — `.stack`: a one-column grid with `--space-4` between children; `.stack--lg` uses `--space-8`.
3. **Cluster** — `.cluster`: a wrapping row with `--space-3` gaps, centred vertically; `.cluster--between` pushes the ends apart.
4. **Grid** — `.grid`: as many columns of at least `--layout-card-min` (18rem) as fit, with the `--layout-gutter` between them.
5. **Page shapes** — `.two-col` (content and a 21rem aside), `.split` (a 22rem list pane and detail), `.sidebar-layout` (a 17rem sidebar and content); all one column below 64rem.
6. **Section** — `.section` adds the section gap above; `.section__head` holds an eyebrow, a `.section__title` and an optional `.section__more` link.

```html
<section class="section" aria-labelledby="layout-anatomy-title"><div class="section__head"><p class="eyebrow">This week</p><h2 class="section__title" id="layout-anatomy-title">Recent projects</h2><a class="section__more" href="#">All projects<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></a></div><div class="grid"><article class="card"><h3 class="card__name">Northwind</h3><p class="card__text">Launch checklist, 14 of 18 done.</p></article><article class="card"><h3 class="card__name">Harbour Notes</h3><p class="card__text">148 notes, 12 edited this week.</p></article></div></section>
```

## Variants

### stack
Vertical rhythm between siblings: a heading, a sentence and a form, or a column of cards.
```html
<div class="stack"><article class="card"><h3 class="card__name">Northwind</h3><p class="card__text">Launch checklist, 14 of 18 done.</p></article><article class="card"><h3 class="card__name">Harbour Notes</h3><p class="card__text">148 notes, 12 edited this week.</p></article><article class="card"><h3 class="card__name">Field Day</h3><p class="card__text">Saturday 17 October, 18 going.</p></article></div>
```

### stack large
`.stack--lg` separates bigger blocks: sections of a settings page, or a form and the danger zone below it.
```html
<div class="stack stack--lg"><section class="stack" aria-labelledby="stack-lg-a"><h3 class="card__name" id="stack-lg-a">Profile</h3><p class="muted">Your name and photo appear on notes and comments.</p></section><section class="stack" aria-labelledby="stack-lg-b"><h3 class="card__name" id="stack-lg-b">Notifications</h3><p class="muted">E-mail for mentions and replies; a weekly digest on Fridays.</p></section></div>
```

### cluster
A wrapping row: tags, small actions, people. Items keep their size and move to the next line rather than shrink.
```html
<div class="cluster"><span class="badge badge--success">On track</span><span class="badge">Design</span><span class="badge">Research</span><span class="badge badge--plain">Due Friday 23 October</span><a class="link-standalone" href="#">Edit tags</a></div>
```

### cluster between
`.cluster--between` puts a title and its action at opposite ends; it wraps to two lines on narrow screens.
```html
<div class="cluster cluster--between"><h3 class="card__name">Members of Northwind</h3><button class="btn btn--quiet btn--sm" type="button">Invite people</button></div>
```

### grid
Auto-fit columns of cards, never narrower than 18rem: one column on a phone, two on a tablet, three or four on a desktop.
```html
<div class="grid"><article class="card"><h3 class="card__name">Northwind</h3><p class="card__text">Launch checklist, 14 of 18 done.</p></article><article class="card"><h3 class="card__name">Harbour Notes</h3><p class="card__text">148 notes, 12 edited this week.</p></article><article class="card"><h3 class="card__name">Field Day</h3><p class="card__text">Saturday 17 October, 18 going.</p></article></div>
```

### two column
`.two-col`: the content and a 21rem aside, from 64rem. The aside follows the content in source order.
```html
<div class="two-col"><div class="stack"><h3 class="card__name">Launch checklist</h3><p class="muted">14 of 18 done. Grace Liu is reviewing the launch copy; Daniel Reyes is fixing the sign-in redirect.</p></div><aside class="aside-card" aria-label="Project details"><h3 class="aside-card__title">Details</h3><p class="muted">Owner: Amara Osei. Due Friday 23 October.</p></aside></div>
```

### split
`.split`: a 22rem list pane beside the detail, for inboxes and note lists.
```html
<div class="split"><ul class="rows" aria-label="Notes"><li aria-current="true"><div class="rows__main"><p class="rows__title">Launch copy, second pass</p><p class="rows__meta">Grace Liu · today</p></div></li><li><div class="rows__main"><p class="rows__title">Interview with Hannah</p><p class="rows__meta">Hannah Kowalski · Tuesday</p></div></li></ul><article class="card"><h3 class="card__name">Launch copy, second pass</h3><p class="card__text">Shorter headline, and the pricing line moves under the fold.</p></article></div>
```

### sidebar layout
`.sidebar-layout`: a 17rem [sidebar navigation](sidebar-navigation.html) beside the content, from 64rem.
```html
<div class="sidebar-layout"><nav class="sidebar-nav" aria-label="Workspace"><a href="#" aria-current="page">Projects</a><a href="#">Notes</a><a href="#">Gatherings</a></nav><div class="stack"><h3 class="card__name">Projects</h3><p class="muted">12 active projects across three teams.</p></div></div>
```

### section
`.section` opens a band of a long page with the section gap above; `.section__more` links to the full list.
```html
<section class="section" aria-labelledby="layout-section-title"><div class="section__head"><p class="eyebrow">Coming up</p><h2 class="section__title" id="layout-section-title">Gatherings</h2><a class="section__more" href="#">All gatherings<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></a></div><p class="muted">Field Day, Saturday 17 October 2026, 10:00 am.</p></section>
```

### narrow container
`.wrap.narrow` caps a form or a column of prose at 44rem inside the page container.
```html
<div class="wrap narrow"><div class="stack"><h3 class="card__name">Write a note</h3><p class="muted">Notes in Harbour Notes are shared with everyone in the workspace. Mention someone with @ to let them know.</p></div></div>
```

## Sizes

N/A: the primitives have no sizes of their own. Spacing steps are fixed (`.stack` `--space-4`, `.stack--lg`
`--space-8`, `.cluster` `--space-3`); the container margin grows with the viewport through `--layout-margin`.

## States

Layout has no interactive states. The one row in the matrix shows that a cluster is the same in both themes: layout
never changes colour.

## Responsive

- **360px:** `--layout-margin` is `--space-5`; every page shape is one column with the aside, list pane or sidebar
  after the content; `.grid` shows one column; clusters wrap.
- **768px:** `--layout-margin` is `--space-10`; `.grid` shows two columns; `.section__head` puts the more link at the
  trailing edge.
- **1024px and up:** `--layout-margin` is `--space-16`; `.two-col`, `.split` and `.sidebar-layout` become two
  columns; `.grid` shows three or four columns; the container stops growing at 74rem.

## Theming

N/A in practice: layout reads no colour. Components inside a layout follow the theme on their own.

## Accessibility

**Role:** none. Layout classes go on the element whose meaning fits: `<section>` with `aria-labelledby` for a section,
`<aside>` for an aside, `<nav>` for a sidebar, `<ul>` for a list of cards.

**Focus:** source order is reading and focus order. Every page shape keeps the main content first in the source, so
keyboard and screen reader users reach it before the aside; never reorder with `order` or `grid-area` against the
source.

**Labelling:** name every `<section>` by its visible heading. Headings follow the page's outline, whatever their size.

**Motion:** none.

**Touch:** clusters keep a `--space-3` gap, so adjacent small targets keep at least 8px between them.

## Content

N/A: layout has no copy of its own. Section titles follow the [content foundation](../foundations/content.html):
sentence case nouns such as **Recent projects**; the more link names the destination: **All projects**.

## Do and don't

### Do
Space siblings with a stack and let the token decide the gap.
```html
<div class="stack"><p class="muted">Northwind launches on Friday 23 October.</p><p class="muted">14 of 18 checklist items are done.</p></div>
```

### Don't
Hand-tune margins on each element; gaps drift and pages lose their rhythm.
```html
<div><p class="muted" style="margin-bottom: 13px">Northwind launches on Friday 23 October.</p><p class="muted" style="margin-top: 7px">14 of 18 checklist items are done.</p></div>
```

### Do
Let the grid decide the number of columns from the space available.
```html
<div class="grid"><article class="card"><h3 class="card__name">Northwind</h3></article><article class="card"><h3 class="card__name">Harbour Notes</h3></article></div>
```

### Don't
Reorder content visually against the source; the aside is read and focused before the main content.
```html
<div class="two-col"><aside class="aside-card" aria-label="Details"><h3 class="aside-card__title">Details</h3><p class="muted">Owner: Amara Osei.</p></aside><div class="stack"><h3 class="card__name">Launch checklist</h3><p class="muted">The main content comes second in the source.</p></div></div>
```

## Tokens

Layout reads the layout tokens (`--layout-container-max`, `--layout-margin`, `--layout-gutter`, `--layout-card-min`,
the column widths and `--layout-section-gap`) and the spacing scale.

## Code

Compose primitives rather than adding margins: a page is usually `.wrap` > page header > `.two-col` (or `.split`,
`.sidebar-layout`) > `.stack` of sections.
