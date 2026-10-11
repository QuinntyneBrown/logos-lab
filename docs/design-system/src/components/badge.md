---
title: Badge and status
tier: core
order: 54
summary: Label the state of a thing in two or three words, or tag it with a topic. Quiet tinted pills; the word always carries the meaning.
selector: .badge, .pill
layout: inline
target: .badge, .pill
states: default
contrast: --color-fg-muted|--color-bg-subtle|4.5; --color-info-fg|--color-info-bg|4.5; --color-success-fg|--color-success-bg|4.5; --color-warning-fg|--color-warning-bg|4.5; --color-danger-fg|--color-danger-bg|4.5; --color-fg-on-accent|--color-accent|4.5; --color-fg-accent|--color-accent-subtle|4.5
---

## Overview

A **badge** (`.badge`) tells people the state of something: Draft, In review, Published, Overdue. It has
a small dot and a tone. A **tag** (`.pill`) names a topic or category — Research, Design systems — and
has no dot. Neither is interactive; a badge never doubles as a button. To let people filter by a topic,
use a [chip](chip.html). For a sentence about what happened, use an [inline message](inline-message.html)
or an [alert](alert.html).

## Anatomy

1. **Dot** — a small circle in the text colour; it marks a status badge and is hidden on count and plain badges.
2. **Label** — one to three words in sentence case, `--text-caption`.
3. **Container** — a fully rounded tinted pill, 24px tall for badges and 28px for tags.

```html
<div class="cluster"><span class="badge badge--success">Published</span><span class="pill">Research</span></div>
```

## Variants

### neutral
The default for a state that needs no attention: Draft, Archived, Paused.
```html
<span class="badge">Draft</span>
```

### info
Something is in progress or worth knowing.
```html
<span class="badge badge--info">In review</span>
```

### success
Done, live or healthy.
```html
<span class="badge badge--success">Published</span>
```

### warning
Needs attention soon, but nothing is broken.
```html
<span class="badge badge--warning">Due Friday</span>
```

### danger
Late, failed or blocked. Keep it rare so it still means something.
```html
<span class="badge badge--danger">Overdue</span>
```

### solid
The one badge on a screen that should be seen first, such as a new item. Use one at a time.
```html
<span class="badge badge--solid">New</span>
```

### plain
A neutral label without the dot, for a type rather than a state: Template, Shared, Pinned.
```html
<span class="badge badge--plain">Shared</span>
```

### count
A number beside a navigation item or heading. Add the noun for screen readers.
```html
<span class="badge badge--count">3<span class="vh"> unread notes</span></span>
```

### tags
Topics on a note or project, wrapped in `.tags`.
```html
<ul class="tags" aria-label="Topics"><li class="pill">Research</li><li class="pill">Design systems</li><li class="pill">Onboarding</li></ul>
```

### accent tag
Marks the tag that matches what the person is looking for, or their own topic.
```html
<ul class="tags" aria-label="Topics"><li class="pill pill--accent">Accessibility</li><li class="pill">Field Day</li></ul>
```

### removable tag
In an editor, each tag has a remove button that names the tag.
```html
<ul class="tags" aria-label="Topics on this note"><li class="pill">Harbour Notes<button class="icon-btn" type="button" aria-label="Remove topic Harbour Notes" data-remove-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></li><li class="pill">Weekly review<button class="icon-btn" type="button" aria-label="Remove topic Weekly review" data-remove-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></li></ul>
```

## Sizes

N/A: badges and tags have one size each (24px and 28px), sized to sit on a line of body text. In dense
tables they keep the same size; the row grows instead.

## States

Badges and tags are passive and have one state. The tone *is* the state of the thing they describe, so
choose the variant, never a hover or selected look. A removable tag's remove button follows the
[button](button.html) states; once removed, the tag leaves the list and focus moves to the next tag, or
to the input that adds tags.

## Responsive

Badges never wrap inside themselves; long labels belong in text, not in a badge. A `.tags` list wraps onto
new lines at 360px and keeps an 8px gap. Inside a table row at narrow widths, a badge moves under the title
rather than shrinking.

## Theming

Each tone pairs a `*-bg` and `*-fg` role that both change in dark mode, so a badge stays at 4.5:1 on
either theme. The solid and count badges read the accent pair, which turns light sage with dark text in
dark mode.

## Accessibility

**Role:** plain text in a `<span>`; a list of tags is a `<ul class="tags">` with an `aria-label`. When a
badge changes while the page is open (Draft → Published), announce the change in a separate
`role="status"` message; do not make the badge itself a live region.

**Focus:** badges and tags are not focus stops. A removable tag's button is, and shows the shared focus ring.

**Labelling:** the word is the meaning — the colour and dot only repeat it. A count badge includes the
noun in a `.vh` span ("3 unread notes"). A remove button names the tag: "Remove topic Harbour Notes".

**Motion:** none. A badge that changes tone swaps instantly.

**Touch:** the remove button keeps at least the 24px minimum target inside the pill.

## Content

Use one to three words in sentence case, describing the state of the thing, not an instruction:
**In review**, **Due Friday**, **Overdue by 2 days**. Tags are nouns: **Research**, **Field Day**.
Do not end with punctuation, do not use all caps, and do not invent new tone meanings — warning always
means "soon", danger always means "late, failed or blocked".

## Do and don't

### Do
Let the word say the state; the tone repeats it.
```html
<span class="badge badge--danger">Overdue by 2 days</span>
```

### Don't
A bare coloured dot leaves people guessing.
```html
<span class="badge badge--danger"><span class="vh">Status</span></span>
```

### Do
One tone per meaning, used consistently.
```html
<div class="cluster"><span class="badge badge--success">Published</span><span class="badge">Draft</span><span class="badge badge--info">In review</span></div>
```

### Don't
Danger for a normal state makes the screen look broken.
```html
<div class="cluster"><span class="badge badge--danger">Draft</span><span class="badge badge--warning">Shared</span></div>
```

### Don't
Badges are not buttons; use a chip to filter.
```html
<a class="badge badge--info" href="#">Filter by In review</a>
```

### Do
Use a chip when people choose a topic.
```html
<button class="chip" type="button" aria-pressed="false">In review</button>
```

## Tokens

Badges read the paired status roles (`--color-*-bg` and `--color-*-fg`), the accent pair for solid and
count badges, `--size-pill` and `--radius-full`.

## Code

Use `.badge` with one tone modifier, or `.pill` (plus `.pill--accent`) inside `.tags` for topics. Count
badges use `.badge--count` with a `.vh` noun.
