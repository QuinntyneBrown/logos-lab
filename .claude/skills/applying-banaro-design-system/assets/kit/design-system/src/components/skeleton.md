---
title: Skeleton
tier: core
order: 65
summary: Hold the shape of content while it loads, so the page does not jump. Soft linen blocks that breathe slowly.
selector: .skeleton, .skeleton-card
layout: block
target: .skeleton, .skeleton-card
states: default
contrast: --color-fg-default|--color-bg-surface|4.5
---

## Overview

Use skeletons when you know the shape of what is coming: a list of notes, a profile card, a page header.
Each block sits exactly where the real content will appear, at the same size, so nothing shifts when it
arrives (CLS stays at 0). Use a [spinner](spinner.html) for a short wait inside a control and a
[progress bar](progress-bar.html) for measurable work. If loading fails, replace the skeleton with an
[empty state](empty-state.html) in its error form.

## Anatomy

1. **Busy region** — the container that will hold the content, with `aria-busy="true"`.
2. **Status label** — a `.vh` `role="status"` line, such as "Loading notes…", for screen readers.
3. **Shapes** — `.skeleton` blocks sized like the content: title, text lines, photo, circle, pill, media.

```html
<div aria-busy="true"><p class="vh" role="status">Loading the note…</p><div aria-hidden="true"><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div></div>
```

## Variants

### text
Lines of body text. End with a short line, as a real paragraph does.
```html
<div aria-busy="true"><p class="vh" role="status">Loading the description…</p><div aria-hidden="true"><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div></div>
```

### heading and text
A title above a paragraph, for a page header or article.
```html
<div aria-busy="true"><p class="vh" role="status">Loading Harbour Notes…</p><div aria-hidden="true"><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div></div>
```

### photo
A square photo, the size of a large avatar or card photo.
```html
<div aria-busy="true"><p class="vh" role="status">Loading photo…</p><span class="skeleton skeleton--photo" aria-hidden="true"></span></div>
```

### circle
A round placeholder for an icon tile or chart marker.
```html
<div aria-busy="true"><p class="vh" role="status">Loading…</p><span class="skeleton skeleton--circle" aria-hidden="true"></span></div>
```

### media
A large block for an image, chart or map.
```html
<div aria-busy="true"><p class="vh" role="status">Loading the venue map…</p><span class="skeleton skeleton--block" aria-hidden="true"></span></div>
```

### tags
Pills for tags or chips that have not arrived yet.
```html
<div aria-busy="true"><p class="vh" role="status">Loading topics…</p><div class="tags" aria-hidden="true"><span class="skeleton skeleton--pill"></span><span class="skeleton skeleton--pill"></span><span class="skeleton skeleton--pill"></span></div></div>
```

### card
The composition for a person or project card: photo, name, role, two lines and tags.
```html
<div class="skeleton-card" aria-busy="true"><p class="vh" role="status">Loading Grace Liu's profile…</p><div class="skeleton-card__top" aria-hidden="true"><span class="skeleton skeleton--photo"></span><div><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text is-short"></span></div></div><div aria-hidden="true"><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div><div class="tags" aria-hidden="true"><span class="skeleton skeleton--pill"></span><span class="skeleton skeleton--pill"></span></div></div>
```

### card list
Three cards in the grid the results will use. Show as many as fit the first screen, not more.
```html
<div class="grid" aria-busy="true"><p class="vh" role="status">Loading people on Northwind…</p><div class="skeleton-card" aria-hidden="true"><div class="skeleton-card__top"><span class="skeleton skeleton--photo"></span><div><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text is-short"></span></div></div></div><div class="skeleton-card" aria-hidden="true"><div class="skeleton-card__top"><span class="skeleton skeleton--photo"></span><div><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text is-short"></span></div></div></div><div class="skeleton-card" aria-hidden="true"><div class="skeleton-card__top"><span class="skeleton skeleton--photo"></span><div><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text is-short"></span></div></div></div></div>
```

## Sizes

N/A: every shape copies the size of the content it stands in for — `--size-skeleton-line` for body text,
`--space-8` for a title, `--space-16` for a photo, `--space-32` for media. Change the shape, not a size
modifier, when the content changes.

## States

A skeleton has one state: waiting. It breathes between full and 55% opacity every few seconds. When the
content arrives, swap it in one step — no fade, no slide — and remove `aria-busy`. If it takes longer
than about 10 seconds, add a line under it ("Still loading…"); if it fails, replace the skeleton with an
error message in the same space.

## Responsive

Skeletons follow the layout of the real content at every width: one column of cards at 360px, two at
768px, three or four from 1024px. Text lines are percentages of their container, so they reflow with it.
Show only as many placeholders as fit the first screen.

## Theming

Shapes read `--color-bg-subtle`, which is a warm linen in light mode and a lifted charcoal in dark mode,
always a step away from the surface behind it. The skeleton card reads the card's surface and border roles.

## Accessibility

**Role:** put `aria-busy="true"` on the region that is loading and a single `.vh` `role="status"` line
inside it that names what is loading. Hide the shapes with `aria-hidden="true"`. Remove `aria-busy` and
update the status ("12 notes loaded") when the content arrives.

**Focus:** skeletons are never focus stops. Keep focus where it was; do not move it into new content
when loading ends.

**Labelling:** one status line per region — "Loading Grace Liu's profile…" — not one per shape.

**Motion:** the slow breathing (`--duration-breath`) stops under reduced motion, leaving still linen
blocks. There is no sweeping shimmer gradient.

**Touch:** N/A: skeletons have no targets.

## Content

The hidden status line names the thing: **Loading Harbour Notes…**, **Loading people on Northwind…**.
Never put fake words, lorem ipsum or grey text in a skeleton; the shapes stand in for content on their own.

## Do and don't

### Do
Match the shape and size of the real content.
```html
<div class="skeleton-card" aria-busy="true"><p class="vh" role="status">Loading Daniel Reyes's profile…</p><div class="skeleton-card__top" aria-hidden="true"><span class="skeleton skeleton--photo"></span><div><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text is-short"></span></div></div></div>
```

### Don't
A generic block in place of a card makes the page jump when the card arrives.
```html
<div aria-busy="true"><p class="vh" role="status">Loading…</p><span class="skeleton skeleton--block" aria-hidden="true"></span></div>
```

### Do
One status line for the whole region.
```html
<div aria-busy="true"><p class="vh" role="status">Loading 3 comments…</p><div aria-hidden="true"><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div></div>
```

### Don't
A skeleton and a spinner together say the same thing twice and add motion.
```html
<div aria-busy="true"><p class="inline-status" role="status"><span class="spinner" aria-hidden="true"></span>Loading…</p><div aria-hidden="true"><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div></div>
```

## Tokens

Skeletons read `--color-bg-subtle`, `--size-skeleton-line`, `--size-pill`, the spacing scale for shapes,
the radius scale, and `--duration-breath` with `--ease-breath` for the breathing.

## Code

Wrap the loading region in `aria-busy="true"` with one `.vh` `role="status"` line, and use `.skeleton`
with a shape modifier for each block. `.skeleton-card` with `.skeleton-card__top` gives the card
composition; add `.is-short` to the last text line.
