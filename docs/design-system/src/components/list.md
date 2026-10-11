---
title: List
tier: core
order: 51
summary: A single column of items separated by hairlines, from plain links to rich rows with a photo, two lines of text and an action.
selector: .list, .rows
target: a
states: default, hover, focus, current, loading, empty
matrix-variants: links, people
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-fg-link|--color-bg-surface|4.5; --color-fg-accent|--color-accent-subtle|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a list when people read items one after another: notebooks in a sidebar, members of a project, the
next few things to do. `.list` is for short items — usually links; `.rows` is for richer items with a photo,
a title, a line of detail and an action. Use a [table](table.html) when people compare the same fields
across items, and [cards](card.html) when each item needs room for a photo and several facts.

## Anatomy

1. **Item** — one `<li>`, separated from the next by a hairline (`.list > li` or `.rows > li`).
2. **Leading visual** — optional icon, photo (`.avatar`) or initials tile.
3. **Title** — a link or plain text; in rows, the h4-sized `.rows__title`.
4. **Meta** — one muted line of detail under the title (`.rows__meta`).
5. **Trailing slot** — optional status, badge or one small action at the end of the row.

```html
<ul class="rows" aria-label="Northwind members"><li><img class="avatar" src="../assets/photos/amara-osei.jpg" width="40" height="40" alt=""><div class="rows__main"><h3 class="rows__title"><a href="#">Amara Osei</a></h3><p class="rows__meta">Product designer · owns Northwind</p></div><span class="badge badge--success">Active</span></li></ul>
```

## Variants

### links
The plain list: one link per item with a leading icon, separated by hairlines.
```html
<ul class="list" aria-label="Notebooks">
  <li><a href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h10a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10"/></svg>Harbour Notes</a></li>
  <li><a href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h10a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10"/></svg>Field Day plan</a></li>
  <li><a href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h10a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10"/></svg>Northwind roadmap</a></li>
</ul>
```

### plain
`list--plain` drops the hairlines for short lists inside a card or sidebar, where the container already groups them.
```html
<ul class="list list--plain" aria-label="Useful links">
  <li><a href="#">How Harbour Notes syncs</a></li>
  <li><a href="#">Export a notebook</a></li>
  <li><a href="#">Invite people to Northwind</a></li>
</ul>
```

### people
Rows with a photo, a linked name, a line of context and presence at the end.
```html
<ul class="rows" aria-label="Northwind members">
  <li><img class="avatar" src="../assets/photos/grace-liu.jpg" width="40" height="40" alt=""><div class="rows__main"><h3 class="rows__title"><a href="#">Grace Liu</a></h3><p class="rows__meta">Designer · Lisbon</p></div><span class="status status--online"><span class="status__dot" aria-hidden="true"></span>Online</span></li>
  <li><img class="avatar" src="../assets/photos/daniel-reyes.jpg" width="40" height="40" alt=""><div class="rows__main"><h3 class="rows__title"><a href="#">Daniel Reyes</a></h3><p class="rows__meta">Engineer · joined this week</p></div><span class="status"><span class="status__dot" aria-hidden="true"></span>Away</span></li>
  <li><img class="avatar" src="../assets/photos/hannah-kowalski.jpg" width="40" height="40" alt=""><div class="rows__main"><h3 class="rows__title"><a href="#">Hannah Kowalski</a></h3><p class="rows__meta">Researcher · interviews on Thursday</p></div><span class="status"><span class="status__dot" aria-hidden="true"></span>Away</span></li>
</ul>
```

### with actions
Rows with an initials tile, a status badge and one small action each. Name the action after the item.
```html
<ul class="rows" aria-label="Your projects">
  <li><span class="avatar-initials tile--sage" aria-hidden="true">N</span><div class="rows__main"><h3 class="rows__title"><a href="#">Northwind</a></h3><p class="rows__meta">4 people · updated today, 9:40 am</p></div><span class="badge badge--success">Active</span><button class="btn btn--quiet btn--sm" type="button">Open<span class="vh"> Northwind</span></button></li>
  <li><span class="avatar-initials tile--fjord" aria-hidden="true">HN</span><div class="rows__main"><h3 class="rows__title"><a href="#">Harbour Notes</a></h3><p class="rows__meta">128 pages · updated yesterday</p></div><span class="badge badge--warning">In review</span><button class="btn btn--quiet btn--sm" type="button">Open<span class="vh"> Harbour Notes</span></button></li>
  <li><span class="avatar-initials tile--oat" aria-hidden="true">FD</span><div class="rows__main"><h3 class="rows__title"><a href="#">Field Day</a></h3><p class="rows__meta">Saturday 17 October 2026 · 14 going</p></div><span class="badge badge--info">Planning</span><button class="btn btn--quiet btn--sm" type="button">Open<span class="vh"> Field Day</span></button></li>
</ul>
```

### navigation
A list of links inside `<nav>`, with the current page marked by `aria-current="page"`.
```html
<nav aria-label="Harbour Notes sections"><ul class="list list--plain">
  <li><a href="#" aria-current="page">Overview</a></li>
  <li><a href="#">Field Day agenda</a></li>
  <li><a href="#">Interview notes</a></li>
  <li><a href="#">Release checklist</a></li>
</ul></nav>
```

## Sizes

N/A: list items are at least `--target-comfortable` (44px) tall; rows add `--space-4` above and below their content.

## States

**Hover** changes a link's colour (and underlines a row title); **focus** draws the sage ring on the link.
**Current** marks the open page or the item shown beside the list in sage. **Loading** shows skeleton rows of
the same shape, and **empty** replaces the list with a short message and the action that fills it.

### loading
```html
<ul class="rows" aria-busy="true" aria-label="Loading members"><li><span class="skeleton skeleton--photo"></span><div class="rows__main"><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div></li><li><span class="skeleton skeleton--photo"></span><div class="rows__main"><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div></li></ul>
```

### links / loading
```html
<ul class="list" aria-busy="true" aria-label="Loading notebooks"><li><span class="skeleton skeleton--text"></span></li><li><span class="skeleton skeleton--text is-short"></span></li><li><span class="skeleton skeleton--text"></span></li></ul>
```

### empty
```html
<div class="empty empty--compact"><p class="empty__title">No members yet</p><p>Invite your team and they will appear here.</p><div class="empty__actions"><button class="btn btn--primary btn--sm" type="button">Invite people</button></div></div>
```

### links / empty
```html
<div class="empty empty--compact"><p class="empty__title">No notebooks yet</p><p>Start one for notes you want the whole team to see.</p><div class="empty__actions"><button class="btn btn--primary btn--sm" type="button">New notebook</button></div></div>
```

## Responsive

Lists are single-column at every width. At 360px row meta wraps under the title, and a trailing badge or
button stays on the right while the text column shrinks (`min-width: 0`). From 768px rows may show a
second trailing item, such as a date. In a split view from 1024px, the list pane marks the open item as current.

## Theming

Lists inherit the surface they sit on and draw hairlines in `--color-border-default`. The current item uses
`--color-accent-subtle` with `--color-fg-accent` text, tuned for 4.5:1 in both themes.

## Accessibility

**Role:** a native `<ul>` with an `aria-label` (or a visible heading) that names the collection. Navigation
lists sit in a `<nav>` with its own label. Row titles are headings when the list is a main section of the page.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves through each item's link and action in order. |
| Enter | Follows the focused link. |

**Focus:** every link and action shows the sage ring. Don't make a whole row clickable around other
controls; one link per row plus an optional action keeps focus order clear.

**Labelling:** photos and initials are decorative (`alt=""`, `aria-hidden`) because the name follows. Give
repeated actions a hidden suffix (**Open Northwind**). Mark the current page with `aria-current="page"`,
not only with colour. A loading list sets `aria-busy="true"`.

**Motion:** none besides the shared colour transitions; skeletons stop shimmering under reduced motion.

**Touch:** links are at least 44px tall; small row actions are 36px and sit `--space-4` from the badge.

## Content

Lead each item with the name people look for: **Harbour Notes**, **Grace Liu**. Meta lines join two or three
short facts with a middle dot: **Designer · Lisbon**. Order lists by what people need first — most recent,
most used or alphabetical — and say which in the heading when it is not obvious.

## Do and don't

### Do
Keep meta to one short line of the facts that matter.
```html
<ul class="rows" aria-label="Members"><li><img class="avatar" src="../assets/photos/noah-fischer.jpg" width="40" height="40" alt=""><div class="rows__main"><h3 class="rows__title"><a href="#">Noah Fischer</a></h3><p class="rows__meta">Engineer · sync service</p></div></li></ul>
```

### Don't
Pack a paragraph into the meta line; it belongs on the detail page.
```html
<ul class="rows" aria-label="Members"><li><img class="avatar" src="../assets/photos/noah-fischer.jpg" width="40" height="40" alt=""><div class="rows__main"><h3 class="rows__title"><a href="#">Noah Fischer</a></h3><p class="rows__meta">Noah is an engineer who joined Northwind in March and works on the sync service, release checklists, the export tool and occasionally Field Day logistics.</p></div></li></ul>
```

### Do
Mark the current page with `aria-current`.
```html
<nav aria-label="Sections"><ul class="list list--plain"><li><a href="#" aria-current="page">Overview</a></li><li><a href="#">Field Day agenda</a></li></ul></nav>
```

### Don't
Show the current page with colour or bold text alone.
```html
<nav aria-label="Sections"><ul class="list list--plain"><li><a href="#"><strong>Overview</strong></a></li><li><a href="#">Field Day agenda</a></li></ul></nav>
```

## Tokens

Lists read the hairline border, the default, muted and accent text roles, `--color-accent-subtle` for the
current item and `--target-comfortable` for row height.

## Code

Use `<ul class="list">` for short items and `<ul class="rows">` for rich rows built from an optional visual,
`.rows__main` (title and meta) and a trailing slot.
