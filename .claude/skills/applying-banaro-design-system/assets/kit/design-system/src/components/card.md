---
title: Card
tier: core
order: 41
summary: Hold one person, project or gathering as a calm, rounded surface: a small square photo, a name, a few facts and one quiet action.
selector: .card, .aside-card
target: .card, .aside-card
states: default, hover, focus, selected, loading
matrix-variants: interactive, person, with media
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-fg-accent|--color-bg-surface|4.5; --color-fg-default|--color-accent-subtle|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a card when each item in a collection is a thing in its own right — a person, a project, a gathering —
and people compare items side by side in a grid. A card shows a summary and leads somewhere; it is never
the whole record. Use a [list](list.html) when people scan many items in one column, a
[table](table.html) when they compare the same fields across rows, and an aside card for a block of
supporting facts beside the main content.

## Anatomy

1. **Media** — optional 16:9 photo bleeding to the top edge (`.card__media`), for gatherings and places.
2. **Photo or initials** — a 64px square with soft corners (`.card__photo`, or `.card__initials` on a `.tile--*` colour).
3. **Name and role** — the heading (`.card__name`) and one line of context (`.card__role`).
4. **Aside figure** — optional number or short status at the top right (`.card__aside`), in the display face.
5. **Facts** — two short label and value pairs between hairlines (`.card__facts`).
6. **Footer** — presence or timing on the left, one quiet action on the right (`.card__foot`).

```html
<article class="card" aria-labelledby="anat-name">
  <div class="card__top">
    <img class="card__photo" src="../assets/photos/amara-osei.jpg" width="64" height="64" alt="">
    <div><h3 class="card__name" id="anat-name">Amara Osei</h3><p class="card__role">Product designer · Northwind</p></div>
    <p class="card__aside"><strong>12</strong>notes</p>
  </div>
  <dl class="card__facts"><div><dt>Working on</dt><dd>Northwind</dd></div><div><dt>Available</dt><dd>Tue to Thu</dd></div></dl>
  <div class="card__foot"><span class="status status--online"><span class="status__dot" aria-hidden="true"></span>Online now</span><button class="btn btn--quiet btn--sm" type="button">Message Amara</button></div>
</article>
```

## Variants

### person
The base card for a member of the team: photo, role, place, skills, two facts and one action.
```html
<article class="card" aria-labelledby="card-grace">
  <div class="card__top">
    <img class="card__photo" src="../assets/photos/grace-liu.jpg" width="64" height="64" alt="">
    <div><h3 class="card__name" id="card-grace">Grace Liu</h3><p class="card__role">Designer</p></div>
    <p class="card__aside"><strong>12</strong>notes</p>
  </div>
  <p class="card__place"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>Lisbon · one hour ahead of you</p>
  <ul class="tags" aria-label="Skills"><li class="pill">Figma</li><li class="pill">Design systems</li><li class="pill">Prototyping</li></ul>
  <dl class="card__facts"><div><dt>Working on</dt><dd>Harbour Notes</dd></div><div><dt>Available</dt><dd>Tue to Thu</dd></div></dl>
  <div class="card__foot"><span class="status status--online"><span class="status__dot" aria-hidden="true"></span>Online now</span><button class="btn btn--quiet btn--sm" type="button">Message Grace</button></div>
</article>
```

### with initials
When there is no photo, two initials sit on a tinted tile. Missing facts say so plainly instead of disappearing.
```html
<article class="card" aria-labelledby="card-daniel">
  <div class="card__top">
    <span class="card__initials tile--clay" aria-hidden="true">DR</span>
    <div><h3 class="card__name" id="card-daniel">Daniel Reyes</h3><p class="card__role">Engineer · joined this week</p></div>
  </div>
  <dl class="card__facts"><div><dt>Working on</dt><dd>Northwind</dd></div><div><dt>Available</dt><dd class="is-empty">Not added yet</dd></div></dl>
  <div class="card__foot"><span class="status"><span class="status__dot" aria-hidden="true"></span>Away</span><button class="btn btn--quiet btn--sm" type="button">Welcome Daniel</button></div>
</article>
```

### interactive
The whole card opens the record. The name link stretches over the card, so the card lifts on hover and
takes one focus ring; keep other controls out of an interactive card.
```html
<article class="card card--interactive" aria-labelledby="card-northwind">
  <div class="card__top">
    <span class="card__initials tile--sage" aria-hidden="true">N</span>
    <div><h3 class="card__name" id="card-northwind"><a href="#">Northwind</a></h3><p class="card__role">Calm planning for small teams</p></div>
    <p class="card__aside"><strong>4</strong>people</p>
  </div>
  <p class="card__text">The roadmap, research notes and launch checklist for the private beta.</p>
  <dl class="card__facts"><div><dt>Stage</dt><dd>Private beta</dd></div><div><dt>Updated</dt><dd>Today, 9:40 am</dd></div></dl>
  <div class="card__foot"><div class="avatar-group" role="img" aria-label="Amara Osei, Daniel Reyes, Grace Liu and 1 other"><img class="avatar avatar--sm" src="../assets/photos/amara-osei.jpg" width="32" height="32" alt=""><img class="avatar avatar--sm" src="../assets/photos/daniel-reyes.jpg" width="32" height="32" alt=""><img class="avatar avatar--sm" src="../assets/photos/grace-liu.jpg" width="32" height="32" alt=""><span class="avatar-group__more">+1</span></div></div>
</article>
```

### with media
A photo leads for gatherings and places. The heading still names the card; the photo is decorative.
```html
<article class="card" aria-labelledby="card-fieldday">
  <div class="card__media"><img src="../assets/photos/coffee-together.jpg" width="640" height="360" alt=""></div>
  <div><h3 class="card__name" id="card-fieldday">Field Day</h3><p class="card__role">Saturday 17 October 2026 · 10:00 am</p></div>
  <p class="card__text">A slow morning of coffee, short demos and planning the next quarter together.</p>
  <div class="card__foot"><span class="card__place">14 people going</span><button class="btn btn--primary btn--sm" type="button">Save a spot</button></div>
</article>
```

### selected
In a pick-several flow a checkbox sits in the top-right slot; checking it tints the card sage.
```html
<article class="card" aria-labelledby="card-hannah">
  <div class="card__top">
    <img class="card__photo" src="../assets/photos/hannah-kowalski.jpg" width="64" height="64" alt="">
    <div><h3 class="card__name" id="card-hannah">Hannah Kowalski</h3><p class="card__role">Researcher</p></div>
    <input class="check__box" type="checkbox" checked aria-label="Add Hannah Kowalski to Field Day">
  </div>
  <dl class="card__facts"><div><dt>Working on</dt><dd>Interview notes</dd></div><div><dt>Available</dt><dd>Mornings</dd></div></dl>
</article>
```

### aside card
A quieter container for supporting facts beside the main column: a title, a description list and a link.
```html
<aside class="aside-card" aria-labelledby="aside-glance">
  <h3 class="aside-card__title" id="aside-glance">At a glance</h3>
  <dl class="facts"><div><dt>Owner</dt><dd>Amara Osei</dd></div><div><dt>Members</dt><dd>4 people</dd></div><div><dt>Created</dt><dd>March 2026</dd></div></dl>
  <a class="btn btn--quiet btn--sm" href="#">Open Northwind</a>
</aside>
```

### in a grid
Cards live in `.cards`: one column on phones, two from 768px. Every card in a grid shares one shape.
```html
<ul class="cards" aria-label="People in Northwind">
  <li><article class="card" aria-labelledby="grid-noah"><div class="card__top"><img class="card__photo" src="../assets/photos/noah-fischer.jpg" width="64" height="64" alt=""><div><h3 class="card__name" id="grid-noah">Noah Fischer</h3><p class="card__role">Engineer</p></div></div><dl class="card__facts"><div><dt>Working on</dt><dd>Sync service</dd></div><div><dt>Available</dt><dd>Afternoons</dd></div></dl></article></li>
  <li><article class="card" aria-labelledby="grid-caleb"><div class="card__top"><img class="card__photo" src="../assets/photos/caleb-morgan.jpg" width="64" height="64" alt=""><div><h3 class="card__name" id="grid-caleb">Caleb Morgan</h3><p class="card__role">Founder</p></div></div><dl class="card__facts"><div><dt>Working on</dt><dd>Field Day</dd></div><div><dt>Available</dt><dd>Fridays</dd></div></dl></article></li>
</ul>
```

## Sizes

N/A: cards take the width of their grid column; padding stays at `--space-6` and the photo at 64px.

## States

Hover lifts an interactive card by `--lift` and deepens its shadow and border; a static card has no hover
of its own, only its action button does. Focus draws the 2px sage ring around the whole card. A
selected card turns sage-tinted with an accent border. While data loads, a skeleton card of the same shape
holds the space so the grid does not jump.

### loading
```html
<div class="skeleton-card" aria-hidden="true"><div class="skeleton-card__top"><span class="skeleton skeleton--photo"></span><div><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div></div><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div>
```

### with media / loading
```html
<div class="skeleton-card" aria-hidden="true"><span class="skeleton skeleton--block"></span><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div>
```

## Responsive

At 360px cards stack in one column and the footer action may wrap under the status. From 768px `.cards`
becomes two columns; from 1024px a page may set three columns with `.grid`. The photo stays 64px at every
width and long names wrap rather than truncate.

## Theming

Cards sit on `--color-bg-surface` with a hairline `--color-border-default`; in dark mode the surface lifts
slightly above the canvas so cards still read as objects. Initials tiles use the `--color-tile-*` roles,
which are tuned for both themes.

## Accessibility

**Role:** an `<article>` labelled by its heading (`aria-labelledby`), inside a `<ul>` when cards form a
collection. An aside card is an `<aside>` or a plain `<section>` with a heading.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to the card's link or its action, in reading order. |
| Enter | On an interactive card, opens the record through the name link. |
| Space | Toggles the checkbox on a selectable card. |

**Focus:** an interactive card shows one ring around the whole card when its stretched name link has focus;
a static card focuses only its own action button.

**Labelling:** the photo and initials are decorative (`alt=""`, `aria-hidden`) because the name sits beside
them. Name every action after the person or thing: **Message Grace**, not **Message**. The selection
checkbox needs its own label (`aria-label="Add Hannah Kowalski to Field Day"`).

**Motion:** the hover lift is 1px over `--duration-base`; it is removed under reduced motion.

**Touch:** the whole interactive card is the target. Footer actions use `btn--sm`, 36px tall, above the
24px minimum.

## Content

Lead with the name, then one line of role or context: **Grace Liu — Designer**. Keep facts to two pairs,
each a short noun phrase: **Working on — Harbour Notes**. Write missing values as **Not added yet**, never a
dash. Times are specific and local: **Today, 9:40 am**, **Saturday 17 October 2026 · 10:00 am**.

## Do and don't

### Do
Name the action after the person, and keep one action per card.
```html
<div class="card__foot"><span class="status status--online"><span class="status__dot" aria-hidden="true"></span>Online now</span><button class="btn btn--quiet btn--sm" type="button">Message Grace</button></div>
```

### Don't
Stack several equal buttons in a card footer; the card stops being a summary.
```html
<div class="card__foot"><button class="btn btn--primary btn--sm" type="button">Message</button><button class="btn btn--primary btn--sm" type="button">Follow</button><button class="btn btn--primary btn--sm" type="button">Invite</button></div>
```

### Do
Say when a fact is missing.
```html
<dl class="card__facts"><div><dt>Working on</dt><dd>Northwind</dd></div><div><dt>Available</dt><dd class="is-empty">Not added yet</dd></div></dl>
```

### Don't
Leave a dash or an empty value that reads as broken.
```html
<dl class="card__facts"><div><dt>Working on</dt><dd>Northwind</dd></div><div><dt>Available</dt><dd>—</dd></div></dl>
```

## Tokens

Cards read the surface, border, accent-subtle and focus roles, the large radius, `--space-6` padding and
`--shadow-3` on hover.

## Code

Wrap collections in `<ul class="cards">` and give each `<article class="card">` an `aria-labelledby` that
points at its `.card__name`. Add `.card--interactive` only when the name is a link and the card has no other
controls.
