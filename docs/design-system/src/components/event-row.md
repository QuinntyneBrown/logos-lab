---
title: Event row
tier: sample
order: 91
summary: A sample domain row for a dated gathering, kept as a reference. A large day number, the title, when and where, how many are going and one action; plus the matching header for the event's own page.
selector: .events, .event, .event-head
layout: block
target: .event__title a
states: default, focus, going, full, cancelled, past
matrix-variants: default
contrast: --color-fg-default|--color-bg-canvas|4.5; --color-fg-muted|--color-bg-canvas|4.5; --color-fg-subtle|--color-bg-canvas|4.5; --color-fg-accent|--color-accent-subtle|4.5; --color-focus-ring|--color-bg-canvas|3
---

## Overview

**This is a sample component.** It comes from the original Banaro domain (local gatherings) and ships as
a worked example of a dated list row, not as part of every system. An app should either prune it
(`audit_usage.py --prune` removes it when no mock uses `.event`) or adapt it for its own dated things
(sessions, deliveries, appointments) by copying the block and renaming the classes. For an undated list
use [list](list.html) rows; for a history of changes use a [timeline](timeline.html).

## Anatomy

1. **List** — `ul.events`, rows divided by hairlines.
2. **Date** — a large display day over a small uppercase month (`__date` with `__day` and `__mon`), as a `<time>`.
3. **Title** — the event's name as a link (`__title`).
4. **Meta** — when and where, each with a small icon (`__meta`).
5. **Side** — how many are going (`__going`) and one action, on the right from 1024px (`__side`).
6. **Event header** — on the event's own page, `.event-head` pairs a date chip (`__date`) with the title and actions.

## Variants

### default
One upcoming event with spots left.
```html
<ul class="events"><li class="event"><div class="event__date"><time datetime="2026-10-17T10:00"><span class="event__day">17</span><span class="event__mon">Oct</span></time></div><div class="event__main"><h3 class="event__title"><a href="#">Field Day</a></h3><p class="event__meta"><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>Sat 17 Oct, 10:00 am – 2:00 pm</span><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>Riverside Park, north lawn</span></p></div><div class="event__side"><span class="event__going">18 going · 12 spots left</span><a class="btn btn--quiet btn--sm" href="#">Reserve a spot</a></div></li></ul>
```

### list
Upcoming events, soonest first.
```html
<ul class="events"><li class="event"><div class="event__date"><time datetime="2026-10-13T18:30"><span class="event__day">13</span><span class="event__mon">Oct</span></time></div><div class="event__main"><h3 class="event__title"><a href="#">Northwind demo evening</a></h3><p class="event__meta"><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>Tue 13 Oct, 6:30 – 8:00 pm</span><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>Online</span></p></div><div class="event__side"><span class="event__going">42 going</span><a class="btn btn--quiet btn--sm" href="#">Reserve a spot</a></div></li><li class="event"><div class="event__date"><time datetime="2026-10-17T10:00"><span class="event__day">17</span><span class="event__mon">Oct</span></time></div><div class="event__main"><h3 class="event__title"><a href="#">Field Day</a></h3><p class="event__meta"><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>Sat 17 Oct, 10:00 am – 2:00 pm</span><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>Riverside Park, north lawn</span></p></div><div class="event__side"><span class="event__going">18 going · 12 spots left</span><a class="btn btn--quiet btn--sm" href="#">Reserve a spot</a></div></li><li class="event"><div class="event__date"><time datetime="2026-10-24T14:00"><span class="event__day">24</span><span class="event__mon">Oct</span></time></div><div class="event__main"><h3 class="event__title"><a href="#">Harbour Notes reading hour</a></h3><p class="event__meta"><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>Sat 24 Oct, 2:00 – 3:00 pm</span><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>The library, room 2</span></p></div><div class="event__side"><span class="event__going">9 going · 6 spots left</span><a class="btn btn--quiet btn--sm" href="#">Reserve a spot</a></div></li></ul>
```

### compact
No side column: for a sidebar ("Coming up") where the row itself links to the event.
```html
<ul class="events"><li class="event"><div class="event__date"><time datetime="2026-10-17T10:00"><span class="event__day">17</span><span class="event__mon">Oct</span></time></div><div class="event__main"><h3 class="event__title"><a href="#">Field Day</a></h3><p class="event__meta"><span>Sat, 10:00 am · Riverside Park</span></p></div></li></ul>
```

### header
The event's own page opens with `.event-head`: a sage date chip, the title, the facts and the main actions.
```html
<header class="event-head"><div class="event-head__date"><time datetime="2026-10-17T10:00"><span class="event__day">17</span><span class="event__mon">Oct</span></time></div><div class="event__main"><h2 class="event-head__title">Field Day</h2><p class="event__meta"><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>Saturday 17 October 2026, 10:00 am – 2:00 pm</span><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>Riverside Park, north lawn</span><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8.5" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M15.5 6a3 3 0 0 1 0 5.5M17.5 19a5 5 0 0 0-2.5-4.3"/></svg>Hosted by Ruth Alvarez</span></p></div><div class="event-head__actions"><a class="btn btn--primary" href="#">Reserve a spot</a><button class="btn btn--quiet" type="button"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7.5 8.5 12 4l4.5 4.5M5 13v5.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V13"/></svg>Share</button></div></header>
```

## Sizes

N/A: One size per form: the row in lists, `.event-head` on the event's page. The day number always uses the `--font-size-3xl` display size.

## States

Focus rings the title link. **Going** swaps the count and action for a success status ("You're going")
and a quiet way to change it. **Full** says so and offers the waitlist. **Cancelled** strikes through the
title, greys the day and replaces the action with a badge. **Past** greys the date and title and offers
the notes instead of a reservation.

### going
```html
<ul class="events"><li class="event"><div class="event__date"><time datetime="2026-10-17T10:00"><span class="event__day">17</span><span class="event__mon">Oct</span></time></div><div class="event__main"><h3 class="event__title"><a href="#">Field Day</a></h3><p class="event__meta"><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>Sat 17 Oct, 10:00 am – 2:00 pm</span><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>Riverside Park, north lawn</span></p></div><div class="event__side"><span class="inline-status inline-status--success"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>You're going</span><a class="btn btn--text btn--sm" href="#">Change</a></div></li></ul>
```

### full
```html
<ul class="events"><li class="event"><div class="event__date"><time datetime="2026-10-17T10:00"><span class="event__day">17</span><span class="event__mon">Oct</span></time></div><div class="event__main"><h3 class="event__title"><a href="#">Field Day</a></h3><p class="event__meta"><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>Sat 17 Oct, 10:00 am – 2:00 pm</span><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>Riverside Park, north lawn</span></p></div><div class="event__side"><span class="badge badge--warning">Full · 30 going</span><a class="btn btn--quiet btn--sm" href="#">Join the waitlist</a></div></li></ul>
```

### cancelled
```html
<ul class="events"><li class="event is-cancelled"><div class="event__date"><time datetime="2026-10-17T10:00"><span class="event__day">17</span><span class="event__mon">Oct</span></time></div><div class="event__main"><h3 class="event__title"><a href="#">Field Day</a></h3><p class="event__meta"><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>Was Sat 17 Oct, 10:00 am</span><span>Called off because of the storm forecast</span></p></div><div class="event__side"><span class="badge badge--danger">Cancelled</span></div></li></ul>
```

### past
```html
<ul class="events"><li class="event is-past"><div class="event__date"><time datetime="2026-09-26T10:00"><span class="event__day">26</span><span class="event__mon">Sep</span></time></div><div class="event__main"><h3 class="event__title"><a href="#">Autumn planning morning</a></h3><p class="event__meta"><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>Sat 26 Sep · ended</span><span>24 went</span></p></div><div class="event__side"><a class="btn btn--text btn--sm" href="#">Read the notes</a></div></li></ul>
```

## Responsive

`.events` is a size container, so the row follows the width of its list rather than the screen. Below
40rem (every phone, and narrow columns such as an aside) the date sits in a narrow left column and the
title, meta and side stack to its right, with the action under the meta. From 40rem (a full page column
from 768px up) the row becomes three columns: date, details and the side, with the count and action
aligned right. `.event-head` stacks the
date chip above the title at every width.

## Accessibility

**Role:** `ul.events` with one `li.event` per gathering. The date is a `<time datetime>`; the title is a heading containing the only link to the event.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves from the title link to the row's action, then to the next row. |
| Enter | Opens the event or activates the action. |

**Focus:** the shared 2px `--color-focus-ring` outline on the title link and the action.

**Labelling:** the meta repeats the weekday and time in full, so the big day number is not the only
date. Icons are decorative. Make actions specific when several rows share them ("Reserve a spot for
Field Day" as `aria-label` on a short visible label). Status is text ("You're going", "Full",
"Cancelled"); the strike-through on cancelled titles is backed by the badge.

**Motion:** no motion of its own.

**Touch:** row actions are 36px small buttons with 12px between them; keep a whole row at least 64px tall.

## Content

Titles are the event's name: **Field Day**. Meta lines are short: **Sat 17 Oct, 10:00 am – 2:00 pm**,
**Riverside Park, north lawn**. Counts read **18 going · 12 spots left**. Say why a gathering was
cancelled in a few words when you can: **Called off because of the storm forecast**.

## Do and don't

### Do
Keep one action per row and make it say what happens.
```html
<ul class="events"><li class="event"><div class="event__date"><time datetime="2026-10-17T10:00"><span class="event__day">17</span><span class="event__mon">Oct</span></time></div><div class="event__main"><h3 class="event__title"><a href="#">Field Day</a></h3><p class="event__meta"><span>Sat 17 Oct, 10:00 am</span></p></div><div class="event__side"><a class="btn btn--quiet btn--sm" href="#">Reserve a spot</a></div></li></ul>
```

### Don't
Stack several equal buttons in the side column.
```html
<ul class="events"><li class="event"><div class="event__date"><time datetime="2026-10-17T10:00"><span class="event__day">17</span><span class="event__mon">Oct</span></time></div><div class="event__main"><h3 class="event__title"><a href="#">Field Day</a></h3><p class="event__meta"><span>Sat 17 Oct, 10:00 am</span></p></div><div class="event__side"><a class="btn btn--primary btn--sm" href="#">Go</a><a class="btn btn--primary btn--sm" href="#">Maybe</a><a class="btn btn--primary btn--sm" href="#">Share</a></div></li></ul>
```

### Do
Keep a cancelled event in the list, marked in words.
```html
<ul class="events"><li class="event is-cancelled"><div class="event__date"><time datetime="2026-10-17T10:00"><span class="event__day">17</span><span class="event__mon">Oct</span></time></div><div class="event__main"><h3 class="event__title"><a href="#">Field Day</a></h3><p class="event__meta"><span>Called off because of the storm forecast</span></p></div><div class="event__side"><span class="badge badge--danger">Cancelled</span></div></li></ul>
```

### Don't
Rely on the strike-through alone.
```html
<ul class="events"><li class="event is-cancelled"><div class="event__date"><time datetime="2026-10-17T10:00"><span class="event__day">17</span><span class="event__mon">Oct</span></time></div><div class="event__main"><h3 class="event__title"><a href="#">Field Day</a></h3><p class="event__meta"><span>Sat 17 Oct, 10:00 am</span></p></div></li></ul>
```

## Tokens

Rows read the canvas, hairline and text roles, the display type for the day, `--size-event-date` for the
date column, `--color-accent-subtle` and `--color-fg-accent` for the header's date chip, and the status
roles for badges.

## Code

Use `ul.events` of `li.event`: `__date` (a `<time>` with `__day` and `__mon`), `__main` (title and meta) and
`__side`. Add `is-cancelled` or `is-past` as needed. When adapting, rename the `event` classes and the
`@component event-row` block together.
