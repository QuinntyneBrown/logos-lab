---
title: Timeline
tier: standard
order: 57
summary: Tell what happened, or what will happen, in order. A hairline spine with small sage rings, a time and one sentence each.
selector: .timeline
layout: block
target: li
states: default, current
contrast: --color-fg-subtle|--color-bg-canvas|4.5; --color-fg-default|--color-bg-canvas|4.5; --color-accent|--color-bg-canvas|3
---

## Overview

Use a timeline for a short sequence where order and time matter: a project's history, the agenda for a
gathering, the milestones of a release. Each entry is one moment with a time and one sentence. For a feed
people act on, use [notification items](notification-item.html); for steps someone completes, use a
[stepper](stepper.html); for many dated records, use a [table](table.html).

## Anatomy

1. **Spine** — a hairline down the left edge in `--color-border-default`.
2. **Marker** — a small ring in `--color-accent` on the canvas colour; the current entry fills it.
3. **Time** — a `<time datetime>` in the subtle caption style.
4. **Entry** — one sentence, optionally with a bold title and a muted detail line.

```html
<ol class="timeline"><li><time datetime="2026-10-09T09:12">Fri 9 Oct, 9:12 am</time><p>Grace Liu moved <a href="#">Onboarding checklist</a> to Review.</p></li><li><time datetime="2026-10-08T16:40">Thu 8 Oct, 4:40 pm</time><p>Daniel Reyes added 3 notes to Harbour Notes.</p></li></ol>
```

## Variants

### activity
A project's history, newest first. Name the person and link the thing they changed.
```html
<ol class="timeline" aria-label="Northwind activity"><li><time datetime="2026-10-09T09:12">Today, 9:12 am</time><p>Grace Liu moved <a href="#">Onboarding checklist</a> to Review.</p></li><li><time datetime="2026-10-08T16:40">Yesterday, 4:40 pm</time><p>Daniel Reyes added 3 notes to <a href="#">Harbour Notes</a>.</p></li><li><time datetime="2026-10-07T11:05">Wed 7 Oct, 11:05 am</time><p>Amara Osei invited Noah Fischer to Northwind.</p></li><li><time datetime="2026-10-05T08:30">Mon 5 Oct, 8:30 am</time><p>Caleb Morgan created Northwind.</p></li></ol>
```

### agenda
What will happen, in time order, oldest first. Times only, because the day is in the heading.
```html
<ol class="timeline" aria-label="Field Day agenda, Saturday 17 October"><li><time datetime="2026-10-17T10:00">10:00 am</time><p>Arrive, coffee and name tags</p></li><li><time datetime="2026-10-17T10:30">10:30 am</time><p>Show and tell: what each team built this month</p></li><li><time datetime="2026-10-17T12:00">12:00 pm</time><p>Lunch on the lawn</p></li><li><time datetime="2026-10-17T13:30">1:30 pm</time><p>Walk to the harbour and goodbyes</p></li></ol>
```

### milestones
A bold title and a muted line of detail for each step of a longer story.
```html
<ol class="timeline" aria-label="Northwind milestones"><li><time datetime="2026-09">September 2026</time><p><strong>First prototype</strong></p><p class="muted">Amara Osei tested the note editor with six people.</p></li><li><time datetime="2026-10">October 2026</time><p><strong>Shared notebooks</strong></p><p class="muted">Harbour Notes opened to the whole team.</p></li><li><time datetime="2026-11">November 2026</time><p><strong>Public beta</strong></p><p class="muted">Planned. Invitations go out after Field Day.</p></li></ol>
```

## Sizes

N/A: one size. Entries grow with their text; the marker and spine stay the same.

## States

A timeline is passive. The **current** entry — the session happening now in an agenda, or the step a
project is on — fills its marker with sage and adds a soft halo, and carries `aria-current` (`"time"` in
an agenda, `"step"` in milestones) so the meaning is not in colour alone. Links inside follow the
[link](link.html) states.

## Responsive

The timeline is one column at every width; the spine stays on the left and entries wrap. At 360px times
sit above the sentence (as always), so nothing needs to change. From 1024px keep the column under 44ch
for activity and agenda; do not stretch it across a wide page.

## Theming

The spine, marker and text read semantic roles. In dark mode the ring turns light sage and its centre
takes the dark canvas, so the marker reads as a ring on both themes.

## Accessibility

**Role:** an ordered list (`<ol class="timeline">`), because order is the meaning. Give it an
`aria-label` when there is no visible heading. Each entry starts with a `<time datetime>` so assistive
tech and translation tools get the exact moment.

**Focus:** the list is not a focus stop; links inside are.

**Labelling:** the current entry uses `aria-current="time"` or `aria-current="step"`. Write each entry so
it makes sense on its own: "Grace Liu moved Onboarding checklist to Review", not "Moved it".

**Motion:** none. New entries appear without animation.

**Touch:** links inside keep the 24px minimum target; give the whole sentence enough line height to tap.

## Content

One sentence per entry, in the past tense for history and as a plain noun phrase for an agenda. Name the
person first and the thing second: **Daniel Reyes added 3 notes to Harbour Notes**. Use relative days
for the last two days (**Today, 9:12 am**, **Yesterday, 4:40 pm**), then the short date (**Wed 7 Oct**).
Times use **am** and **pm** in lowercase.

## Do and don't

### Do
Start each entry with the time and name the person.
```html
<ol class="timeline" aria-label="Recent activity"><li><time datetime="2026-10-09T09:12">Today, 9:12 am</time><p>Hannah Kowalski shared her interview notes.</p></li></ol>
```

### Don't
Entries without times or people lose the point of a timeline.
```html
<ol class="timeline" aria-label="Recent activity"><li><p>Updated.</p></li><li><p>Changed some things.</p></li></ol>
```

### Do
Keep entries short and in one order.
```html
<ol class="timeline" aria-label="Field Day agenda"><li><time datetime="2026-10-17T10:00">10:00 am</time><p>Arrive and coffee</p></li><li><time datetime="2026-10-17T10:30">10:30 am</time><p>Show and tell</p></li></ol>
```

### Don't
A paragraph per entry turns the timeline into a wall of text; link to the detail instead.
```html
<ol class="timeline" aria-label="Field Day agenda"><li><time datetime="2026-10-17T10:00">10:00 am</time><p>Arrive at the hall by the harbour, where Leah Thompson and Marcus Bennett will hand out name tags and coffee, and where you can leave coats and bags in the side room before the show and tell begins upstairs at half past ten.</p></li></ol>
```

## Tokens

The timeline reads `--color-border-default` for the spine, `--color-accent` and `--color-bg-canvas` for
markers, `--color-fg-subtle` for times, and the spacing scale for the indent and gaps.

## Code

Use `<ol class="timeline">` with one `<li>` per entry, each starting with `<time datetime>`. Add
`aria-current="time"` or `aria-current="step"` to the current entry.
