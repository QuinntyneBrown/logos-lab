---
title: Content card
tier: standard
order: 84
summary: One course, module, video, article, collection or event in a grid or list. A tinted cover with the type's glyph, the type, the title, who made it, a few facts and, for a member, their progress.
selector: .content-grid, .content-card
layout: block
target: .content-card
states: default, hover, focus, saved, in-progress, completed, unavailable
matrix-variants: course, row
matrix-cell: 20rem
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-fg-on-media|--color-bg-media|4.5; --color-tile-fg|--color-tile-sage|4.5; --color-focus-ring|--color-bg-canvas|3
---

## Overview

The content card is how {{app}} shows a piece of learning anywhere it is listed: the home page, Explore,
search results, a topic, an expert's profile, a collection, the dashboard and Saved. Every type uses the
same card so a learner reads them the same way; the type line and the cover glyph say what it is. Use the
`row` variant in narrow lists and the dashboard. For people use the [person list](person-list.html); for a
dated listing of events use the [event row](event-row.html).

## Anatomy

1. **Card**: `article.content-card`, a birch surface with a hairline, 20px corners. The whole card is one link through the title.
2. **Cover**: `__cover`, a 16:9 tile in one of the muted tile tones (`tile--sage`, `tile--clay`, `tile--fjord`, `tile--oat`) with the type's line glyph (`__glyph`), or a photograph.
3. **Duration**: `__duration`, videos only; a small dark tag on the cover.
4. **Save**: `__save`, an icon button with `aria-pressed`, above the stretched link.
5. **Type**: `__type`, an overline with a small icon: Course, Module, Video, Article, Collection, Event.
6. **Title**: `__title` with the only link; its `::after` stretches over the card.
7. **By**: `__by`, the expert's portrait and name, or the {{app}} mark on an oat tile.
8. **Meta**: `__meta`, two or three facts: lessons, length, reading time, items, date.
9. **Progress**: `__progress`, a member's [progress bar](progress-bar.html) and a sentence; or `__status` with a [badge](badge.html).

## Variants

### course
```html
<div class="content-grid"><article class="content-card"><div class="content-card__cover tile--sage"><svg class="content-card__glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 5.5A1.5 1.5 0 0 1 6 4h12.5v14H6a1.5 1.5 0 0 0-1.5 1.5zM4.5 19.5A1.5 1.5 0 0 0 6 21h12.5v-3"/></svg></div><button type="button" class="icon-btn content-card__save" aria-pressed="false" aria-label="Save Imago Dei in an Age of Machines"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v16.5l-5-3.5-5 3.5z"/></svg></button><div class="content-card__body"><p class="content-card__type">Course</p><h3 class="content-card__title"><a href="#">Imago Dei in an Age of Machines</a></h3><p class="content-card__by"><img src="../assets/photos/amara-osei.jpg" alt="">Dr. Abena Mensah</p><p class="content-card__meta"><span>24 lessons</span><span>5 h 40 min</span></p></div></article></div>
```

### video
```html
<div class="content-grid"><article class="content-card"><div class="content-card__cover tile--fjord"><svg class="content-card__glyph" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m10.5 9.5 4 2.5-4 2.5z"/></svg><span class="content-card__duration">24:18</span></div><button type="button" class="icon-btn content-card__save" aria-pressed="true" aria-label="Saved: Can a Machine Pray?"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v16.5l-5-3.5-5 3.5z"/></svg></button><div class="content-card__body"><p class="content-card__type">Video</p><h3 class="content-card__title"><a href="#">Can a Machine Pray?</a></h3><p class="content-card__by"><img src="../assets/photos/marcus-bennett.jpg" alt="">Prof. Simon Keller</p><div class="content-card__progress"><div class="progress" role="progressbar" aria-label="Watched" aria-valuenow="52" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 52%"><div class="progress__bar"></div></div><span>Resume at 12:34</span></div></div></article></div>
```

### logos lab
Content written by {{app}} itself carries the mark instead of a portrait.
```html
<div class="content-grid"><article class="content-card"><div class="content-card__cover tile--clay"><svg class="content-card__glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h8l3 3v14h-11z"/><path d="M9 11h6M9 14.5h6M9 18h3.5"/></svg></div><div class="content-card__body"><p class="content-card__type">Article</p><h3 class="content-card__title"><a href="#">Five Questions to Ask Before Your Church Adopts AI</a></h3><p class="content-card__by"><span class="content-card__mark"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 11c-3-2-7-2.5-11-2v15c4-.5 8 0 11 2M16 11c3-2 7-2.5 11-2v15c-4-.5-8 0-11 2M16 4v22M13.5 7h5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>{{app}}</p><p class="content-card__meta"><span>6 min read</span></p></div></article></div>
```

### row
A horizontal card for lists, the dashboard and narrow columns.
```html
<div class="content-grid content-grid--rows"><article class="content-card content-card--row"><div class="content-card__cover tile--sage"><svg class="content-card__glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 5.5A1.5 1.5 0 0 1 6 4h12.5v14H6a1.5 1.5 0 0 0-1.5 1.5zM4.5 19.5A1.5 1.5 0 0 0 6 21h12.5v-3"/></svg></div><div class="content-card__body"><p class="content-card__type">Course</p><h3 class="content-card__title"><a href="#">Imago Dei in an Age of Machines</a></h3><div class="content-card__progress"><div class="progress" role="progressbar" aria-label="Course progress" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 42%"><div class="progress__bar"></div></div><span>42% · 10 of 24 lessons · Next: Representing, not resembling</span></div></div></article></div>
```

## Sizes

N/A: the grid sets the width (at least `--layout-card-min`); the `row` variant is the compact form.

## States

Hover lifts the card 3px and strengthens its edge; focus on the title link rings the whole card. **Saved**
fills the bookmark in the accent. **In progress** shows the progress bar and the next step. **Completed**
shows a success badge. **Unavailable** (a saved item that was archived) dims the card, says so, and offers
Remove.

### saved
```html
<div class="content-grid"><article class="content-card"><div class="content-card__cover tile--sage"><svg class="content-card__glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 5.5A1.5 1.5 0 0 1 6 4h12.5v14H6a1.5 1.5 0 0 0-1.5 1.5zM4.5 19.5A1.5 1.5 0 0 0 6 21h12.5v-3"/></svg></div><button type="button" class="icon-btn content-card__save" aria-pressed="true" aria-label="Saved: How Language Models Work"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v16.5l-5-3.5-5 3.5z"/></svg></button><div class="content-card__body"><p class="content-card__type">Course</p><h3 class="content-card__title"><a href="#">How Language Models Work: A Primer for Pastors</a></h3><p class="content-card__by"><img src="../assets/photos/daniel-reyes.jpg" alt="">Dr. Joel Santos</p><p class="content-card__meta"><span>21 lessons</span><span>4 h 30 min</span></p></div></article></div>
```

### in-progress
```html
<div class="content-grid"><article class="content-card"><div class="content-card__cover tile--sage"><svg class="content-card__glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 5.5A1.5 1.5 0 0 1 6 4h12.5v14H6a1.5 1.5 0 0 0-1.5 1.5zM4.5 19.5A1.5 1.5 0 0 0 6 21h12.5v-3"/></svg></div><div class="content-card__body"><p class="content-card__type">Course</p><h3 class="content-card__title"><a href="#">Imago Dei in an Age of Machines</a></h3><div class="content-card__progress"><div class="progress" role="progressbar" aria-label="Course progress" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 42%"><div class="progress__bar"></div></div><span>42% · 10 of 24 lessons</span></div></div></article></div>
```

### completed
```html
<div class="content-grid"><article class="content-card"><div class="content-card__cover tile--clay"><svg class="content-card__glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 5.5A1.5 1.5 0 0 1 6 4h12.5v14H6a1.5 1.5 0 0 0-1.5 1.5zM4.5 19.5A1.5 1.5 0 0 0 6 21h12.5v-3"/></svg></div><div class="content-card__body"><p class="content-card__type">Course</p><h3 class="content-card__title"><a href="#">Christian Ethics for AI Builders</a></h3><p class="content-card__status"><span class="badge badge--success">Completed 2 Sep 2026</span></p></div></article></div>
```

### unavailable
```html
<div class="content-grid"><article class="content-card is-unavailable"><div class="content-card__cover"><svg class="content-card__glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h8l3 3v14h-11z"/><path d="M9 11h6M9 14.5h6M9 18h3.5"/></svg></div><div class="content-card__body"><p class="content-card__type">Article</p><h3 class="content-card__title">Notes Toward a Digital Liturgy</h3><p class="content-card__status"><span class="badge">No longer available</span></p><button type="button" class="btn btn--text btn--sm">Remove from Saved</button></div></article></div>
```

## Responsive

The grid fills as many 18rem columns as fit: one on a phone, two at 768px, three or four from 1024px.
Row cards keep an 8rem cover (5rem under 30rem) beside the text. Titles wrap; nothing truncates.

## Accessibility

**Role:** an `article` whose title heading holds the one link. The save button is a separate toggle with
`aria-pressed` and a name that includes the title.

| Key | Effect |
|---|---|
| Tab | Moves to the save button, then the title link. |
| Enter | Opens the item, or toggles Saved on the button. |
| Space | Toggles Saved. |

**Focus:** focusing the title link draws the ring around the whole card.

**Labelling:** the cover is decorative (`aria-hidden` glyph, `alt=""` photo). Progress bars carry
`aria-valuenow` and a visible sentence, so the number is never colour alone.

**Motion:** the lift and the photo zoom stop under reduced motion.

**Touch:** the save button is a 44px target in the cover's corner, clear of the title link.

## Content

Titles are the item's real title in title case as published: **Imago Dei in an Age of Machines**. Meta
uses numerals and units: **24 lessons · 5 h 40 min**, **12 min read**, **9 items**. Progress reads
**42% · 10 of 24 lessons**. Say who made it by name, never "by an expert".

## Do and don't

### Do
Keep one link per card, through the title.
```html
<div class="content-grid"><article class="content-card"><div class="content-card__cover tile--fjord"><svg class="content-card__glyph" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m10.5 9.5 4 2.5-4 2.5z"/></svg><span class="content-card__duration">31:05</span></div><div class="content-card__body"><p class="content-card__type">Video</p><h3 class="content-card__title"><a href="#">Augustine and the Algorithm</a></h3><p class="content-card__by"><img src="../assets/photos/ruth-alvarez.jpg" alt="">Dr. Lucía Ortega</p></div></article></div>
```

### Don't
Add buttons that compete with the card's own link.
```html
<div class="content-grid"><article class="content-card"><div class="content-card__body"><p class="content-card__type">Video</p><h3 class="content-card__title">Augustine and the Algorithm</h3><a class="btn btn--primary btn--sm" href="#">Watch</a><a class="btn btn--primary btn--sm" href="#">Details</a></div></article></div>
```

### Do
Say what kind of thing it is in words.
```html
<div class="content-grid"><article class="content-card"><div class="content-card__body"><p class="content-card__type">Collection</p><h3 class="content-card__title"><a href="#">Start Here: Faith and AI</a></h3><p class="content-card__meta"><span>12 items</span></p></div></article></div>
```

### Don't
Rely on the cover colour to tell types apart.
```html
<div class="content-grid"><article class="content-card"><div class="content-card__cover tile--sage"></div><div class="content-card__body"><h3 class="content-card__title"><a href="#">Start Here: Faith and AI</a></h3></div></article></div>
```
