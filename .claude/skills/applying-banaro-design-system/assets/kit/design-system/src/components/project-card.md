---
title: Project card
tier: sample
order: 90
summary: A sample domain card for a piece of work in progress, kept as a reference. A letter mark, the name, who leads it, one line about it, a few facts and its stage.
selector: .projects, .project
layout: block
target: .project
states: default, hover, focus, loading
matrix-variants: default, compact
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-tile-fg|--color-tile-sage|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

**This is a sample component.** It comes from the original Banaro domain (people sharing products they
are building) and ships as a worked example of a domain card, not as part of every system. An app should
either prune it (`audit_usage.py --prune` removes it when no mock uses `.project`) or adapt it into its
own card (a course, a listing, a case) by copying the block, renaming the classes (`.project` to `.course`,
`__mark`, `__facts` and so on) and rewriting the facts. For a generic container use a [card](card.html).

## Anatomy

1. **Card** — a surface with a hairline border and soft corners (`.project`) that lifts on hover.
2. **Mark** — a 48px letter tile on a tile tone (`__mark`), decorative.
3. **Name** — the project's name as a link (`__name`), the card's heading.
4. **Owner** — who leads it (`__owner`), subtle text.
5. **Line** — one sentence about what it is (`__line`).
6. **Facts** — a short description list of label and value pairs (`__facts`).
7. **More row** — when it last changed and its stage [badge](badge.html) (`__more`).

## Variants

### default
The full card with facts, for a project grid.
```html
<article class="project" aria-labelledby="p-northwind"><div class="project__head"><span class="project__mark tile--sage" aria-hidden="true">N</span><div><h3 class="project__name" id="p-northwind"><a href="#">Northwind</a></h3><p class="project__owner">Led by Caleb Morgan</p></div></div><p class="project__line">A calm planning board for small teams, with a weekly summary instead of a feed.</p><dl class="project__facts"><div><dt>Team</dt><dd>4 people</dd></div><div><dt>Looking for</dt><dd>A designer</dd></div><div><dt>Started</dt><dd>March 2026</dd></div></dl><p class="project__more"><span>Updated 2 days ago</span><span class="badge badge--success">In beta</span></p></article>
```

### compact
No facts: for a sidebar ("Also by Caleb") or a narrow column.
```html
<article class="project project--compact" aria-labelledby="p-harbour"><div class="project__head"><span class="project__mark tile--fjord" aria-hidden="true">H</span><div><h3 class="project__name" id="p-harbour"><a href="#">Harbour Notes</a></h3><p class="project__owner">Led by Grace Liu</p></div></div><p class="project__line">A shared notebook for a team's decisions.</p><p class="project__more"><span>Updated today</span><span class="badge badge--info">Building</span></p></article>
```

### grid
Cards in `.projects`: one column on phones, two from 768px and four from 1280px.
```html
<div class="projects"><article class="project" aria-labelledby="g-northwind"><div class="project__head"><span class="project__mark tile--sage" aria-hidden="true">N</span><div><h3 class="project__name" id="g-northwind"><a href="#">Northwind</a></h3><p class="project__owner">Led by Caleb Morgan</p></div></div><p class="project__line">A calm planning board for small teams.</p><p class="project__more"><span>Updated 2 days ago</span><span class="badge badge--success">In beta</span></p></article><article class="project" aria-labelledby="g-harbour"><div class="project__head"><span class="project__mark tile--fjord" aria-hidden="true">H</span><div><h3 class="project__name" id="g-harbour"><a href="#">Harbour Notes</a></h3><p class="project__owner">Led by Grace Liu</p></div></div><p class="project__line">A shared notebook for a team's decisions.</p><p class="project__more"><span>Updated today</span><span class="badge badge--info">Building</span></p></article></div>
```

### list
`.projects--list` caps a long list at three columns on wide screens so each card has room for its facts.
```html
<div class="projects projects--list"><article class="project" aria-labelledby="l-northwind"><div class="project__head"><span class="project__mark tile--sage" aria-hidden="true">N</span><div><h3 class="project__name" id="l-northwind"><a href="#">Northwind</a></h3><p class="project__owner">Led by Caleb Morgan</p></div></div><p class="project__line">A calm planning board for small teams.</p><dl class="project__facts"><div><dt>Team</dt><dd>4 people</dd></div><div><dt>Looking for</dt><dd>A designer</dd></div></dl></article><article class="project" aria-labelledby="l-harbour"><div class="project__head"><span class="project__mark tile--fjord" aria-hidden="true">H</span><div><h3 class="project__name" id="l-harbour"><a href="#">Harbour Notes</a></h3><p class="project__owner">Led by Grace Liu</p></div></div><p class="project__line">A shared notebook for a team's decisions.</p><dl class="project__facts"><div><dt>Team</dt><dd>2 people</dd></div><div><dt>Looking for</dt><dd>An engineer</dd></div></dl></article><article class="project" aria-labelledby="l-fieldday"><div class="project__head"><span class="project__mark tile--clay" aria-hidden="true">F</span><div><h3 class="project__name" id="l-fieldday"><a href="#">Field Day kit</a></h3><p class="project__owner">Led by Ruth Alvarez</p></div></div><p class="project__line">Sign-up sheets and checklists for small outdoor gatherings.</p><dl class="project__facts"><div><dt>Team</dt><dd>3 people</dd></div><div><dt>Looking for</dt><dd>Nobody right now</dd></div></dl></article></div>
```

### stages
The stage badge uses one status colour per stage: idea (neutral), building (info), in beta (success), paused (warning).
```html
<div class="cluster"><span class="badge">Idea</span><span class="badge badge--info">Building</span><span class="badge badge--success">In beta</span><span class="badge badge--warning">Paused</span></div>
```

## Sizes

N/A: One size; `project--compact` is the denser form. Cards take the width of their grid column.

## States

Hover darkens the hairline and lifts the card with `--shadow-3` (and 3px of movement when motion is
welcome). Focus lands on the name link; the forced state here rings the whole card the way `:focus-within`
styling would. **Loading** shows a [skeleton](skeleton.html) card of the same shape.

### loading
```html
<div class="skeleton-card" aria-busy="true" aria-label="Loading project"><div class="skeleton-card__top"><span class="skeleton project__mark" aria-hidden="true"></span><span><span class="skeleton skeleton--text" aria-hidden="true"></span><span class="skeleton skeleton--text is-short" aria-hidden="true"></span></span></div><span class="skeleton skeleton--text" aria-hidden="true"></span><span class="skeleton skeleton--pill" aria-hidden="true"></span></div>
```

## Responsive

One column at 360px, two from 768px and four from 1280px (`.projects--list` stops at three). Inside a
card, facts keep label and value on one line, wrapping the value under itself when long; the more row
wraps the badge below the date at 360px.

## Theming

Every colour comes from a semantic role. Tile tones darken in the dark theme and the mark's letter
follows `--color-tile-fg`, so marks stay legible in both.

## Accessibility

**Role:** each card is an `<article>` labelled by its name heading; the name is the only link, and the facts are a `<dl>`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves from card name to card name. |
| Enter | Opens the project. |

**Focus:** the shared 2px `--color-focus-ring` outline on the name link.

**Labelling:** the letter mark is decorative (`aria-hidden="true"`). Stage badges are text, never colour alone.

**Motion:** the hover lift is removed under reduced motion; only the shadow and border change.

**Touch:** the name link is the target; keep cards at least 16px apart in the grid.

## Content

The line says what the project is, in one sentence: **A calm planning board for small teams.** Facts are
short nouns: **Team: 4 people**, **Looking for: A designer**. Update times are relative: **Updated 2 days
ago**. Stages are one or two words in sentence case: **Idea**, **Building**, **In beta**, **Paused**.

## Do and don't

### Do
Keep one link per card: the name.
```html
<article class="project project--compact" aria-labelledby="d-northwind"><div class="project__head"><span class="project__mark tile--sage" aria-hidden="true">N</span><div><h3 class="project__name" id="d-northwind"><a href="#">Northwind</a></h3><p class="project__owner">Led by Caleb Morgan</p></div></div><p class="project__line">A calm planning board for small teams.</p></article>
```

### Don't
Fill the card with buttons; each one competes with the name.
```html
<article class="project project--compact" aria-labelledby="x-northwind"><div class="project__head"><span class="project__mark tile--sage" aria-hidden="true">N</span><div><h3 class="project__name" id="x-northwind"><a href="#">Northwind</a></h3><p class="project__owner">Led by Caleb Morgan</p></div></div><div class="cluster"><a class="btn btn--primary btn--sm" href="#">View</a><a class="btn btn--sm" href="#">Follow</a><a class="btn btn--sm" href="#">Share</a><a class="btn btn--sm" href="#">Message</a></div></article>
```

### Do
Rename the classes when you adapt the card to your own domain.
```html
<article class="project project--compact" aria-labelledby="d-course"><div class="project__head"><span class="project__mark tile--clay" aria-hidden="true">R</span><div><h3 class="project__name" id="d-course"><a href="#">Reading slowly</a></h3><p class="project__owner">Taught by Hannah Kowalski</p></div></div><p class="project__line">Becomes <code>.course</code>, <code>.course__mark</code> and <code>.course__name</code> in your system.</p></article>
```

### Don't
Ship the sample unchanged into a product about something else.
```html
<article class="project project--compact" aria-labelledby="x-sample"><div class="project__head"><span class="project__mark tile--sage" aria-hidden="true">N</span><div><h3 class="project__name" id="x-sample"><a href="#">Northwind</a></h3><p class="project__owner">Led by Caleb Morgan</p></div></div><p class="project__line">Sample copy left in a product that has no projects.</p></article>
```

## Tokens

The card reads the surface, hairline and text roles, the tile tones for the mark, the status roles for
stage badges and `--shadow-3` on hover.

## Code

Wrap cards in `.projects` (add `projects--list` for long lists). Each `.project` holds `__head` (mark and
name), `__line`, optional `__facts` and a `__more` row. When adapting, rename every `project` class and
its `@component project-card` block together.
