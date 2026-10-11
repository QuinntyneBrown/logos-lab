---
title: Notice panel
tier: standard
order: 99
summary: The notifications popover from the top bar's bell: a head with Mark all as read, the list of notifications, and a link to notification settings. It becomes a full-screen sheet under 640px.
selector: .notice-panel
layout: block
target: .notice-panel
states: default, loading, empty, error
matrix-variants: unread
matrix-cell: 26rem
contrast: --color-fg-default|--color-bg-surface-raised|4.5; --color-fg-muted|--color-bg-surface-raised|4.5; --color-fg-link|--color-bg-surface-raised|4.5
---

## Overview

{{app}} has no notifications page: the bell in the [top bar](top-bar.html) opens this panel. It holds the
member's notifications as a [notification list](notification-item.html), newest first, with unread ones
marked. On a phone it fills the screen. For a short-lived confirmation use a [toast](toast.html); for
a small piece of help beside a control use a [popover](popover.html).

## Anatomy

1. **Panel**: `div.notice-panel`, a raised card anchored under the bell: absolutely positioned below the top bar at the right margin, `--size-notice-panel` wide, never taller than the viewport. The specimens on this page add `style="position: static"` only so the panel shows in flow.
2. **Head**: `__head`, the title (`__title`) and a **Mark all as read** text button.
3. **Body**: `__body`, scrolls on its own and holds a `.notice-list`.
4. **Foot**: `__foot`, a link to Notification settings.

## Variants

### unread
Three unread notifications above earlier ones.
```html
<div class="notice-panel" role="dialog" aria-labelledby="np-title" style="position: static"><div class="notice-panel__head"><h3 class="notice-panel__title" id="np-title">Notifications</h3><button class="btn btn--text btn--sm" type="button">Mark all as read</button></div><div class="notice-panel__body"><ul class="notice-list" aria-label="Notifications"><li class="is-unread"><span class="unread-dot" aria-hidden="true"></span><div><p class="notice__title"><span class="vh">Unread: </span><a href="#">Jonah Fraser replied to your comment</a></p><p class="notice__text">On What Augustine Might Say About Large Language Models</p></div><time class="notice__time" datetime="2026-10-13T10:02">10:02 am</time></li><li class="is-unread"><span class="unread-dot" aria-hidden="true"></span><div><p class="notice__title"><span class="vh">Unread: </span><a href="#">Dr. Abena Mensah posted in Imago Dei, Autumn 2026</a></p><p class="notice__text">“This week, read 3.2 before Thursday’s discussion.”</p></div><time class="notice__time" datetime="2026-10-13T09:15">9:15 am</time></li><li class="is-unread"><span class="unread-dot" aria-hidden="true"></span><div><p class="notice__title"><span class="vh">Unread: </span><a href="#">Live Q&amp;A: Imago Dei and Machine Personhood is in 2 weeks</a></p><p class="notice__text">Tue 27 Oct 2026, 12:00 to 1:00 pm ET · Online</p></div><time class="notice__time" datetime="2026-10-12T16:40">Yesterday, 4:40 pm</time></li><li><span class="read-dot" aria-hidden="true"></span><div><p class="notice__title"><a href="#">Your certificate for Christian Ethics for AI Builders is ready</a></p></div><time class="notice__time" datetime="2026-09-02T14:00">Wed 2 Sep</time></li></ul></div><div class="notice-panel__foot"><a href="#">Notification settings</a></div></div>
```

### all read
When everything is read, the head action is hidden and the rows fall quiet.
```html
<div class="notice-panel" role="dialog" aria-labelledby="np-r-title" style="position: static"><div class="notice-panel__head"><h3 class="notice-panel__title" id="np-r-title">Notifications</h3></div><div class="notice-panel__body"><ul class="notice-list" aria-label="Notifications"><li><span class="read-dot" aria-hidden="true"></span><div><p class="notice__title"><a href="#">Jonah Fraser replied to your comment</a></p><p class="notice__text">On What Augustine Might Say About Large Language Models</p></div><time class="notice__time" datetime="2026-10-13T10:02">10:02 am</time></li><li><span class="read-dot" aria-hidden="true"></span><div><p class="notice__title"><a href="#">You’re number 3 on the waitlist</a></p><p class="notice__text">Workshop: Writing an AI Policy for Your Church · Sat 7 Nov 2026</p></div><time class="notice__time" datetime="2026-10-03T11:20">Sat 3 Oct</time></li></ul></div><div class="notice-panel__foot"><a href="#">Notification settings</a></div></div>
```

## Sizes

N/A: `--size-notice-panel` wide from 640px; the whole screen below.

## States

**Loading** shows skeleton rows in the body while the list arrives. **Empty** says there is nothing yet
and what will appear here. **Error** says the list could not load and offers **Try again**; the head and
foot stay so settings are still reachable.

### loading
```html
<div class="notice-panel" role="dialog" aria-labelledby="np-l-title" style="position: static"><div class="notice-panel__head"><h3 class="notice-panel__title" id="np-l-title">Notifications</h3></div><div class="notice-panel__body" aria-busy="true"><span class="vh">Loading notifications</span><div class="stack"><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text"></span></div></div><div class="notice-panel__foot"><a href="#">Notification settings</a></div></div>
```

### empty
```html
<div class="notice-panel" role="dialog" aria-labelledby="np-e-title" style="position: static"><div class="notice-panel__head"><h3 class="notice-panel__title" id="np-e-title">Notifications</h3></div><div class="notice-panel__body"><div class="empty"><span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z"/><path d="M10 20.5h4"/></svg></span><h4 class="empty__title">You’re all caught up</h4><p>Replies, cohort posts and event reminders will appear here.</p></div></div><div class="notice-panel__foot"><a href="#">Notification settings</a></div></div>
```

### error
```html
<div class="notice-panel" role="dialog" aria-labelledby="np-x-title" style="position: static"><div class="notice-panel__head"><h3 class="notice-panel__title" id="np-x-title">Notifications</h3></div><div class="notice-panel__body"><div class="stack"><p class="inline-status inline-status--danger" role="alert"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>We couldn’t load your notifications.</p><div><button class="btn btn--quiet btn--sm" type="button">Try again</button></div></div></div><div class="notice-panel__foot"><a href="#">Notification settings</a></div></div>
```

## Responsive

From 640px the panel hangs under the bell at the right page margin, `--size-notice-panel` wide, and its
body scrolls when the list is longer than the viewport. Under 640px it is a full-screen sheet with no
corners or border, and the head carries a Close button so the sheet can be dismissed by touch.

## Accessibility

**Role:** a non-modal `dialog` named "Notifications", opened by the bell button (`aria-expanded`,
`aria-controls`). On a phone it is modal. The list is a `ul` of notification items.

| Key | Effect |
|---|---|
| Enter or Space on the bell | Opens the panel and moves focus to its title. |
| Tab | Moves through Mark all as read, each notification link and any actions, then Notification settings. |
| Escape | Closes the panel and returns focus to the bell. |

**Focus:** focus goes to the panel's title on open and back to the bell on close. Clicking outside closes
it.

**Labelling:** unread rows begin with visually hidden "Unread:". The bell's name includes the count
("Notifications, 3 unread").

**Motion:** the panel settles in from just above; under reduced motion it appears in place.

**Touch:** every row is a 44px target through its link; the full-screen sheet keeps the close button in
reach at the top.

## Content

Titles say who did what, with the thing named: **Jonah Fraser replied to your comment**, **Dr. Abena
Mensah posted in Imago Dei, Autumn 2026**. The context line names the item or quotes a sentence. Times
follow the relative rule: **10:02 am**, **Yesterday, 4:40 pm**, **Sat 3 Oct**. The empty title is
**You’re all caught up**.

## Do and don't

### Do
Name the person and the item in the title.
```html
<ul class="notice-list" aria-label="Notifications"><li class="is-unread"><span class="unread-dot" aria-hidden="true"></span><div><p class="notice__title"><span class="vh">Unread: </span><a href="#">Jonah Fraser replied to your comment</a></p><p class="notice__text">On What Augustine Might Say About Large Language Models</p></div><time class="notice__time" datetime="2026-10-13T10:02">10:02 am</time></li></ul>
```

### Don't
Write a title that only says something happened.
```html
<ul class="notice-list" aria-label="Notifications"><li class="is-unread"><span class="unread-dot" aria-hidden="true"></span><div><p class="notice__title"><a href="#">New activity</a></p></div></li></ul>
```

### Do
Keep the settings link in the foot in every state.
```html
<div class="notice-panel__foot"><a href="#">Notification settings</a></div>
```

### Don't
Mark everything as read just because the panel opened.
```html
<div class="notice-panel__head"><p class="notice-panel__title">Notifications</p><span class="inline-status">3 marked as read</span></div>
```
