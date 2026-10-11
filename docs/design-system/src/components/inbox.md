---
title: Inbox
tier: standard
order: 80
summary: The list of conversations. Each row is a link with a portrait, a name, the last line and when it was sent; unread rows carry a sage dot.
selector: .inbox
layout: block
target: .inbox__item
states: default, hover, focus, current, unread, loading, empty
matrix-variants: default, compact
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-fg-default|--color-accent-subtle|4.5; --color-accent|--color-bg-surface|3; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use an inbox to list someone's conversations, newest first, beside or above the open [message
thread](message-thread.html). Every row is one link to one conversation. For a feed of events that are not
conversations (mentions, reminders) use a [notification item](notification-item.html) list; for people
you have not talked to yet use a [person list](person-list.html).

## Anatomy

1. **Container** — a rounded surface (`.inbox`) with a hairline border; rows are divided by hairlines.
2. **Row** — one link per conversation (`a.inbox__item`), the whole row is the target.
3. **Portrait** — a 40px [avatar](avatar.html), decorative beside the name.
4. **Name** — who the conversation is with (`__name`), cut off with an ellipsis when long.
5. **Snippet** — the last message, one line (`__snippet`).
6. **Time** — when the last message arrived (`__time`); optionally stacked with an unread count (`__end`).
7. **Unread dot** — a sage dot after the name on `.is-unread` rows.

## Variants

### default
Portraits, names and the last line. One conversation is open (`aria-current`); one is unread.
```html
<nav class="inbox" aria-label="Conversations"><a class="inbox__item" href="#"><img class="avatar" src="../assets/photos/grace-liu.jpg" width="40" height="40" alt=""><div><p class="inbox__name">Grace Liu</p><p class="inbox__snippet">Here it is. Two versions, I prefer the quieter one.</p></div><time class="inbox__time" datetime="2026-10-09T08:40">8:40 am</time></a><a class="inbox__item" href="#" aria-current="true"><img class="avatar" src="../assets/photos/daniel-reyes.jpg" width="40" height="40" alt=""><div><p class="inbox__name">Daniel Reyes</p><p class="inbox__snippet">You: Yes, I'll bring the board printouts.</p></div><time class="inbox__time" datetime="2026-10-09T09:18">9:18 am</time></a><a class="inbox__item is-unread" href="#"><img class="avatar" src="../assets/photos/caleb-morgan.jpg" width="40" height="40" alt=""><div><p class="inbox__name">Caleb Morgan <span class="vh">(unread)</span></p><p class="inbox__snippet">Shall we demo Northwind at Field Day?</p></div><time class="inbox__time" datetime="2026-10-08">Yesterday</time></a></nav>
```

### compact
No portraits: for a narrow side panel or a sheet. The time keeps its column.
```html
<nav class="inbox inbox--compact" aria-label="Conversations"><a class="inbox__item" href="#"><div><p class="inbox__name">Grace Liu</p><p class="inbox__snippet">Here it is. Two versions, I prefer the quieter one.</p></div><time class="inbox__time" datetime="2026-10-09T08:40">8:40 am</time></a><a class="inbox__item is-unread" href="#"><div><p class="inbox__name">Hannah Kowalski <span class="vh">(unread)</span></p><p class="inbox__snippet">I've finished the interview notes for Harbour Notes.</p></div><time class="inbox__time" datetime="2026-10-08">Yesterday</time></a><a class="inbox__item" href="#"><div><p class="inbox__name">Peter Walsh</p><p class="inbox__snippet">Thanks for all the help this summer.</p></div><time class="inbox__time" datetime="2026-09-28">28 Sep</time></a></nav>
```

### counts
Busy group conversations show how many messages are unread under the time.
```html
<nav class="inbox" aria-label="Conversations"><a class="inbox__item is-unread" href="#"><span class="avatar-initials tile--fjord" aria-hidden="true">NW</span><div><p class="inbox__name">Northwind team</p><p class="inbox__snippet">Noah: Offline mode is ready to try.</p></div><span class="inbox__end"><time class="inbox__time" datetime="2026-10-09T11:09">11:09 am</time><span class="badge badge--count"><span class="vh">Unread messages: </span>4</span></span></a><a class="inbox__item" href="#"><span class="avatar-initials tile--sage" aria-hidden="true">FD</span><div><p class="inbox__name">Field Day volunteers</p><p class="inbox__snippet">Ruth: I can bring the tables and two urns.</p></div><span class="inbox__end"><time class="inbox__time" datetime="2026-10-08">Yesterday</time></span></a></nav>
```

### initials
People without a photo use their initials on a tile, at the same 40px.
```html
<nav class="inbox" aria-label="Conversations"><a class="inbox__item" href="#"><span class="avatar-initials tile--clay" aria-hidden="true">HK</span><div><p class="inbox__name">Hannah Kowalski</p><p class="inbox__snippet">I've finished the interview notes for Harbour Notes.</p></div><time class="inbox__time" datetime="2026-10-08">Yesterday</time></a><a class="inbox__item" href="#"><span class="avatar-initials tile--oat" aria-hidden="true">MB</span><div><p class="inbox__name">Marcus Bennett</p><p class="inbox__snippet">See you on Saturday.</p></div><time class="inbox__time" datetime="2026-10-05">Mon</time></a></nav>
```

## Sizes

N/A: One size. Rows are at least 64px with a portrait and 56px in the compact variant, so each one is a comfortable target.

## States

Hover washes a row in linen; focus draws the sage ring inside the row so the container does not clip it.
**Current** (the conversation that is open) keeps the sage wash. **Unread** adds the sage dot after the
name and lifts the snippet to the default text colour. **Loading** shows skeleton rows in the same shape;
**empty** says there are no conversations yet and how to start one.

### loading
```html
<div class="inbox" aria-busy="true" aria-label="Loading conversations"><div class="inbox__item"><span class="skeleton avatar" aria-hidden="true"></span><div><span class="skeleton skeleton--text" aria-hidden="true"></span><span class="skeleton skeleton--text is-short" aria-hidden="true"></span></div><span class="skeleton skeleton--pill" aria-hidden="true"></span></div><div class="inbox__item"><span class="skeleton avatar" aria-hidden="true"></span><div><span class="skeleton skeleton--text" aria-hidden="true"></span><span class="skeleton skeleton--text is-short" aria-hidden="true"></span></div><span class="skeleton skeleton--pill" aria-hidden="true"></span></div></div>
```

### empty
```html
<div class="inbox"><div class="inbox__empty"><strong>No conversations yet</strong><p>Message someone from their profile and the conversation will appear here.</p></div></div>
```

## Responsive

At 360px the inbox is the whole screen; opening a row shows the thread full screen with a Back link.
From 768px the inbox sits beside the thread in a split view, about 22rem wide (`--layout-list-pane`),
and the open conversation stays marked current. At 1024px and up nothing else changes; names and
snippets cut off with an ellipsis rather than wrapping, so rows keep one height.

## Accessibility

**Role:** a `<nav>` named "Conversations" containing one link per conversation. The open conversation has `aria-current="true"` (or `"page"` when each conversation has its own URL).

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves from row to row. |
| Enter | Opens the conversation. |

**Focus:** the 2px `--color-focus-ring` outline is drawn inside the row, because the rounded container clips anything outside it.

**Labelling:** each link's name is its text: the name, the last line and the time. Unread is not only a
dot: add "(unread)" as visually hidden text after the name, and a hidden "Unread messages:" before a
count. Portraits are decorative (`alt=""`). Prefix your own last message with "You:".

**Motion:** hover and current washes change colour only, with no movement.

**Touch:** every row is at least 56px tall and the whole row is the link.

## Content

Names are full names or a group's name (**Northwind team**). The snippet is the last message, cut off by
the layout rather than by hand; prefix it with the sender in groups (**Noah: Offline mode is ready to
try.**) and with **You:** for your own. Times are short: **9:18 am** today, **Yesterday**, a weekday this
week (**Mon**), then a date (**28 Sep**).

## Do and don't

### Do
Make the whole row one link.
```html
<nav class="inbox" aria-label="Conversations"><a class="inbox__item" href="#"><img class="avatar" src="../assets/photos/grace-liu.jpg" width="40" height="40" alt=""><div><p class="inbox__name">Grace Liu</p><p class="inbox__snippet">Here it is. Two versions.</p></div><time class="inbox__time" datetime="2026-10-09T08:40">8:40 am</time></a></nav>
```

### Don't
Put a small Open button in each row; the target shrinks and the list gets noisy.
```html
<div class="inbox"><div class="inbox__item"><img class="avatar" src="../assets/photos/grace-liu.jpg" width="40" height="40" alt=""><div><p class="inbox__name">Grace Liu</p><p class="inbox__snippet">Here it is. Two versions.</p></div><a class="btn btn--quiet btn--sm" href="#">Open</a></div></div>
```

### Do
Show unread with the dot and hidden text together.
```html
<nav class="inbox" aria-label="Conversations"><a class="inbox__item is-unread" href="#"><img class="avatar" src="../assets/photos/caleb-morgan.jpg" width="40" height="40" alt=""><div><p class="inbox__name">Caleb Morgan <span class="vh">(unread)</span></p><p class="inbox__snippet">Shall we demo Northwind at Field Day?</p></div><time class="inbox__time" datetime="2026-10-08">Yesterday</time></a></nav>
```

### Don't
Shout unread with bold red text; it reads as an error.
```html
<nav class="inbox" aria-label="Conversations"><a class="inbox__item" href="#"><img class="avatar" src="../assets/photos/caleb-morgan.jpg" width="40" height="40" alt=""><div><p class="inbox__name link-danger">CALEB MORGAN — NEW!</p><p class="inbox__snippet">Shall we demo Northwind at Field Day?</p></div><time class="inbox__time" datetime="2026-10-08">Yesterday</time></a></nav>
```

## Tokens

The inbox reads the surface and subtle backgrounds, `--color-accent-subtle` for the current row,
`--color-accent` for the unread dot and count, and the text roles for name, snippet and time.

## Code

Use a `nav.inbox` of `a.inbox__item` rows: a portrait, a `div` with `__name` and `__snippet`, and a
`__time` (or `__end` holding the time and a count). Add `is-unread` and `aria-current="true"` as needed;
add `inbox--compact` to drop the portraits.
