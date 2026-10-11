---
title: Page header
tier: core
order: 39
summary: The top of a page's content. An eyebrow, a light display title and one muted line that says what is here, with the page's actions to the side.
selector: .page-head
states: default, loading
matrix-variants: title, with actions
contrast: --color-fg-default|--color-bg-canvas|4.5; --color-fg-muted|--color-bg-canvas|4.5; --color-fg-subtle|--color-bg-canvas|4.5
---

## Overview

Every page that is more than a single card starts with a page header, directly under the [top bar](top-bar.html).
It holds the page's one `<h1>`, a sentence of context that usually carries a live count, and the actions that apply
to the whole page, such as New project. Things that belong to one item go on that item's [card](card.html); the
landing page uses a [hero](hero.html) instead. A [breadcrumb](breadcrumb.html) or a [search](text-field.html) field
may sit inside it when the page needs one.

## Anatomy

1. **Context** — optional: an `.eyebrow` naming the area, or a [breadcrumb](breadcrumb.html) on deeper pages.
2. **Title** — `.page-head__title`, the page's `<h1>` in the light display style.
3. **Sub** — `.page-head__sub`, one muted sentence at the large body size, often with a live count.
4. **Actions** — `.page-head__actions`, with `.page-head--actions` on the container: one primary button and up to two quiet ones.
5. **Slot** — optional content below, such as a search form or a row of tags.

```html
<div class="page-head page-head--actions"><p class="eyebrow">Workspace</p><h1 class="page-head__title">Projects</h1><p class="page-head__sub">12 active projects across three teams.</p><div class="page-head__actions"><a class="btn btn--quiet" href="#">Import</a><a class="btn btn--primary" href="#">New project</a></div></div>
```

## Variants

### title
The default: an eyebrow, the title and one line of context.
```html
<div class="page-head"><p class="eyebrow">Workspace</p><h1 class="page-head__title">Projects</h1><p class="page-head__sub">12 active projects across three teams.</p></div>
```

### with actions
`.page-head--actions` moves the actions to the trailing edge from 48rem, aligned to the bottom of the text.
```html
<div class="page-head page-head--actions"><p class="eyebrow">Harbour Notes</p><h1 class="page-head__title">Notes</h1><p class="page-head__sub">148 notes, 12 edited this week.</p><div class="page-head__actions"><a class="btn btn--quiet" href="#">Import</a><a class="btn btn--primary" href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>New note</a></div></div>
```

### with search
For directories and lists people search first: the search pill sits under the sub line.
```html
<div class="page-head"><p class="eyebrow">Directory</p><h1 class="page-head__title">People</h1><p class="page-head__sub">48 people across Northwind, Harbour Notes and Field Day.</p><form class="search" role="search" action="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg><label class="vh" for="people-q">Search people</label><input class="search__input" id="people-q" name="q" type="search" placeholder="Name, role or skill" autocomplete="off"><button type="submit" class="btn btn--primary">Search</button></form></div>
```

### with breadcrumb
On pages two or more levels deep, a breadcrumb replaces the eyebrow.
```html
<div class="page-head page-head--actions"><nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><a href="#">Projects</a></li><li><a href="#">Northwind</a></li><li><span aria-current="page">Launch checklist</span></li></ol></nav><h1 class="page-head__title">Launch checklist</h1><p class="page-head__sub">14 of 18 done · due Friday 23 October.</p><div class="page-head__actions"><button class="btn btn--quiet" type="button">Share</button></div></div>
```

### with meta
Facts about the thing the page is about, as badges under the sub line.
```html
<div class="page-head"><p class="eyebrow">Gathering</p><h1 class="page-head__title">Field Day</h1><p class="page-head__sub">Saturday 17 October 2026, 10:00 am, hosted by Caleb Morgan.</p><div class="tags"><span class="badge badge--success">18 going</span><span class="badge">4 spots left</span><span class="badge badge--plain">Outdoors</span></div></div>
```

## Sizes

N/A: one size. The header uses `--space-16` above and `--space-10` below, the h1 type style for the title and the
large body style for the sub line.

## States

The header itself is static. While the page's data loads, the title and sub become skeleton lines inside an
`aria-busy` container and the actions stay usable; the eyebrow and breadcrumb are known and stay real text.

### title / loading
```html
<div class="page-head" aria-busy="true"><p class="eyebrow">Workspace</p><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text is-short"></span><span class="vh" role="status">Loading projects</span></div>
```

### with actions / loading
```html
<div class="page-head page-head--actions" aria-busy="true"><p class="eyebrow">Harbour Notes</p><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text is-short"></span><span class="vh" role="status">Loading notes</span><div class="page-head__actions"><a class="btn btn--quiet" href="#">Import</a><a class="btn btn--primary" href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>New note</a></div></div>
```

## Responsive

- **360px:** everything stacks in one column; actions wrap below the sub line and the primary action may be
  `.btn--block`.
- **768px:** `.page-head--actions` moves the actions to the trailing edge, bottom-aligned with the text.
- **1024px and up:** the same, inside the page container; the title balances across lines and never exceeds the
  container.

## Theming

Every colour reads a semantic role: the title is the default text role, the sub line muted and the eyebrow subtle.
In dark mode they keep the same order of emphasis.

## Accessibility

**Role:** plain content. The title is the page's only `<h1>`; the eyebrow is a `<p>`, not a heading. A search form
inside it has `role="search"` and a label.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Reaches the breadcrumb links, the search field and the actions in reading order. |

**Focus:** controls inside show the shared 2px `--color-focus-ring`. After navigation, move focus to `main` (or the
`<h1>`) so the new title is announced first.

**Labelling:** the `<title>` element starts with the same words as the `<h1>`. A loading header keeps a polite status
("Loading projects") so the skeleton is not silent.

**Motion:** skeletons shimmer slowly; reduced motion stops the shimmer.

**Touch:** actions keep their 44px targets and wrap rather than shrink.

## Content

Title the page with a noun people use: **Projects**, **Notes**, **Field Day**. Sentence case, no full stop. The sub
line is one sentence with a real number: **148 notes, 12 edited this week.** Don't restate the title ("Here are your
projects") or explain the interface. The eyebrow names the area in one or two words: **Workspace**, **Gathering**.

## Do and don't

### Do
Give the page one title and one useful sentence.
```html
<div class="page-head"><h1 class="page-head__title">Notes</h1><p class="page-head__sub">148 notes, 12 edited this week.</p></div>
```

### Don't
Restate the title in the sub line, or welcome people instead of telling them something.
```html
<div class="page-head"><h1 class="page-head__title">Notes</h1><p class="page-head__sub">Welcome to your notes page, where you can see all of your notes.</p></div>
```

### Do
Keep one primary action, with a quiet one beside it.
```html
<div class="page-head page-head--actions"><h1 class="page-head__title">Projects</h1><div class="page-head__actions"><a class="btn btn--quiet" href="#">Import</a><a class="btn btn--primary" href="#">New project</a></div></div>
```

### Don't
Line up a row of primary buttons; nothing stands out.
```html
<div class="page-head page-head--actions"><h1 class="page-head__title">Projects</h1><div class="page-head__actions"><a class="btn btn--primary" href="#">Import</a><a class="btn btn--primary" href="#">Export</a><a class="btn btn--primary" href="#">New project</a></div></div>
```

## Tokens

The header reads the h1 and large body type styles, the default, muted and subtle text roles, and `--space-5`,
`--space-10` and `--space-16`.

## Code

Use `div.page-head` as the first child of `main` inside `.wrap`. Add `.page-head--actions` when it has
`.page-head__actions`.
