---
title: Profile header
tier: standard
order: 77
summary: The top of a person's or a thing's own page. A square portrait or tile, a large name, one quiet line of context and the actions that belong to it.
selector: .profile-head
layout: block
target: summary, .btn
states: default, focus, open, loading
matrix-variants: person, project
contrast: --color-fg-default|--color-bg-canvas|4.5; --color-fg-muted|--color-bg-canvas|4.5; --color-tile-fg|--color-tile-sage|4.5; --color-tile-fg|--color-tile-fjord|4.5; --color-focus-ring|--color-bg-canvas|3
---

## Overview

Use a profile header once, at the top of a page that is about one person or one thing: Amara's profile,
the Northwind project, the Harbour Notes notebook. It names the subject, says in one line what it is, and
holds the two or three actions that apply to the whole page. For the title of an ordinary screen (Settings,
Projects) use a [page header](page-header.html); for a person inside a list use a [person list](person-list.html)
or a [card](card.html).

## Anatomy

1. **Portrait or tile** — a 96px square with soft corners: a photo (`__photo`), a person's initials (`__initials`) or a thing's mark (`__mark`) on a tile tone.
2. **Name** — the page's heading (`__name`), set in the display face at the h1 size.
3. **Context line** — one muted sentence (`__sub`): a role, or what the thing is.
4. **Meta** — optional facts with small icons (`__meta`): presence, place, team size.
5. **Actions** — one primary action and quiet secondaries (`__actions`). Rare and destructive actions go into a **More** menu (`.more` with a `.menu`).

```html
<header class="profile-head"><div class="profile-head__who"><img class="profile-head__photo" src="../assets/photos/amara-osei.jpg" width="96" height="96" alt="Portrait of Amara Osei"><div class="profile-head__text"><h2 class="profile-head__name">Amara Osei</h2><p class="profile-head__sub">Product designer on Northwind</p><p class="profile-head__meta"><span class="status status--online"><span class="status__dot" aria-hidden="true"></span>Online now</span></p></div></div><div class="profile-head__actions"><a class="btn btn--primary" href="#">Message Amara</a><details class="more"><summary class="btn btn--quiet" aria-label="More actions for Amara Osei">More <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></summary><div class="menu more__menu" role="group" aria-label="More actions"><a class="menu__item" href="#">Copy profile link</a></div></details></div></header>
```

## Variants

### person
Someone else's profile, with a photo, their presence and a single way to reach them.
```html
<header class="profile-head"><div class="profile-head__who"><img class="profile-head__photo" src="../assets/photos/daniel-reyes.jpg" width="96" height="96" alt="Portrait of Daniel Reyes"><div class="profile-head__text"><h2 class="profile-head__name">Daniel Reyes</h2><p class="profile-head__sub">Engineer on Northwind and Harbour Notes</p><p class="profile-head__meta"><span class="status status--online"><span class="status__dot" aria-hidden="true"></span>Online now</span><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>Replies within a day</span></p></div></div><div class="profile-head__actions"><a class="btn btn--primary" href="#">Message Daniel</a><details class="more"><summary class="btn btn--quiet" aria-label="More actions for Daniel Reyes">More <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></summary><div class="menu more__menu" role="group" aria-label="More actions for Daniel Reyes"><a class="menu__item" href="#"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.5 5a3.5 3.5 0 0 1 5 5L16 11.5M13 17.5 11.5 19a3.5 3.5 0 0 1-5-5L8 12.5"/></svg>Copy profile link</a><a class="menu__item" href="#"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 20.5V4M6 5h11l-2 3.5 2 3.5H6"/></svg>Report Daniel</a><hr class="menu__divider"><a class="menu__item menu__item--danger" href="#"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="m6 6 12 12"/></svg>Block Daniel</a></div></details></div></header>
```

### initials
No photo yet: the person's initials on a tile tone. The tone is chosen from the name, so it stays the same everywhere.
```html
<header class="profile-head"><div class="profile-head__who"><span class="profile-head__initials tile--clay" aria-hidden="true">HK</span><div class="profile-head__text"><h2 class="profile-head__name">Hannah Kowalski</h2><p class="profile-head__sub">Researcher · Joined in September</p></div></div><div class="profile-head__actions"><a class="btn btn--primary" href="#">Message Hannah</a></div></header>
```

### project
A thing, not a person: a letter mark on a tile, what it is, and who leads it.
```html
<header class="profile-head"><div class="profile-head__who"><span class="profile-head__mark tile--fjord" aria-hidden="true">N</span><div class="profile-head__text"><h2 class="profile-head__name">Northwind</h2><p class="profile-head__sub">A calm planning board for small teams</p><p class="profile-head__meta"><span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8.5" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M15.5 6a3 3 0 0 1 0 5.5M17.5 19a5 5 0 0 0-2.5-4.3"/></svg>Led by Caleb Morgan · 4 people</span><span class="badge badge--success">In beta</span></p></div></div><div class="profile-head__actions"><a class="btn btn--primary" href="#">Ask to join</a><a class="btn btn--quiet" href="#">Follow updates</a><details class="more"><summary class="btn btn--quiet" aria-label="More actions for Northwind">More <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></summary><div class="menu more__menu" role="group" aria-label="More actions for Northwind"><a class="menu__item" href="#">Copy project link</a><a class="menu__item" href="#">Report Northwind</a></div></details></div></header>
```

### own profile
The viewer's own page: edit and share instead of message, and no report or block.
```html
<header class="profile-head"><div class="profile-head__who"><img class="profile-head__photo" src="../assets/photos/amara-osei.jpg" width="96" height="96" alt="Portrait of Amara Osei"><div class="profile-head__text"><h2 class="profile-head__name">Amara Osei</h2><p class="profile-head__sub">Product designer on Northwind</p><p class="profile-head__meta"><span class="pill pill--accent">This is how others see you</span></p></div></div><div class="profile-head__actions"><a class="btn btn--primary" href="#"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>Edit profile</a><button class="btn btn--quiet" type="button"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7.5 8.5 12 4l4.5 4.5M5 13v5.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V13"/></svg>Share profile</button></div></header>
```

## Sizes

N/A: One size. The tile is 96px and the name uses the h1 role, so a profile page looks the same wherever it is reached from; only a narrow container scales it down. A smaller summary of a person is a card or an avatar.

## States

Focus puts the shared sage ring on the action that has it (here the **More** button). Open shows the More
menu below its button; on a live page it floats above the content. Loading keeps the header's shape with
skeleton blocks so the page does not jump when the name arrives.

### loading
```html
<header class="profile-head" aria-busy="true" aria-label="Loading profile"><div class="profile-head__who"><span class="skeleton profile-head__photo" aria-hidden="true"></span><div class="profile-head__text"><span class="skeleton skeleton--title" aria-hidden="true"></span><span class="skeleton skeleton--text is-short" aria-hidden="true"></span></div></div><div class="profile-head__actions"><span class="skeleton skeleton--pill" aria-hidden="true"></span><span class="skeleton skeleton--pill" aria-hidden="true"></span></div></header>
```

## Responsive

The header is a size container. Below 34rem of its own width (every phone, and narrow columns on larger
screens) the tile shrinks to 64px and sits above the name, which drops to the `--font-size-3xl` size, so
long names wrap between words instead of inside them. From 34rem up the 96px tile sits beside the name.
The actions always sit below and wrap onto a second line when needed. The header stays a single,
left-aligned column at 1024px and up so the name lines up with the page content beneath. The More menu
opens below its button and is never wider than the screen.

## Accessibility

**Role:** a `<header>` at the top of the page's `<main>`, with the name as the page's only `<h1>`. The More control is a `<details>`/`<summary>` disclosure that reveals a group of links.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves through the actions, then into the open menu's items. |
| Enter, Space | On **More**: opens or closes the menu. On an action: activates it. |
| Escape | Closes the open menu and returns focus to **More** (wire this in the app). |

**Focus:** every action shows the 2px `--color-focus-ring` outline. When the menu closes, focus returns to the More button.

**Labelling:** a photo's `alt` names the person ("Portrait of Daniel Reyes"); initials and marks are
decorative (`aria-hidden="true"`) because the heading says the name. The More button carries an
`aria-label` that names whose actions they are. Presence is text ("Online now"), not only a dot.

**Motion:** the menu appears without animation under reduced motion; the presence dot stops breathing.

**Touch:** actions are 44px pills; menu items are 44px tall.

## Content

The name is the heading: **Daniel Reyes**, **Northwind**. Never prefix it with "Profile of". The context
line is one sentence in plain words: **Engineer on Northwind and Harbour Notes**, **A calm planning board
for small teams**. Action labels name the person or thing: **Message Daniel**, **Ask to join**, **Edit
profile**. Put report and block in the More menu, with the person's name: **Report Daniel**.

## Do and don't

### Do
One primary action; rare and destructive actions wait in More.
```html
<header class="profile-head"><div class="profile-head__who"><img class="profile-head__photo" src="../assets/photos/grace-liu.jpg" width="96" height="96" alt="Portrait of Grace Liu"><div class="profile-head__text"><h2 class="profile-head__name">Grace Liu</h2><p class="profile-head__sub">Designer on Harbour Notes</p></div></div><div class="profile-head__actions"><a class="btn btn--primary" href="#">Message Grace</a><details class="more"><summary class="btn btn--quiet" aria-label="More actions for Grace Liu">More <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></summary><div class="menu more__menu" role="group" aria-label="More actions for Grace Liu"><a class="menu__item menu__item--danger" href="#">Block Grace</a></div></details></div></header>
```

### Don't
A row of equal buttons, with Block sitting beside Message.
```html
<header class="profile-head"><div class="profile-head__who"><img class="profile-head__photo" src="../assets/photos/grace-liu.jpg" width="96" height="96" alt="Portrait of Grace Liu"><div class="profile-head__text"><h2 class="profile-head__name">Grace Liu</h2><p class="profile-head__sub">Designer on Harbour Notes</p></div></div><div class="profile-head__actions"><a class="btn btn--primary" href="#">Message</a><a class="btn btn--primary" href="#">Follow</a><a class="btn btn--primary" href="#">Report</a><a class="btn btn--danger" href="#">Block</a></div></header>
```

### Do
Give a missing photo its initials on a tile, so the header keeps its shape.
```html
<header class="profile-head"><div class="profile-head__who"><span class="profile-head__initials tile--sage" aria-hidden="true">NF</span><div class="profile-head__text"><h2 class="profile-head__name">Noah Fischer</h2><p class="profile-head__sub">Engineer on Northwind</p></div></div></header>
```

### Don't
Stretch a long biography into the context line; it belongs in the page body.
```html
<header class="profile-head"><div class="profile-head__who"><span class="profile-head__initials tile--sage" aria-hidden="true">NF</span><div class="profile-head__text"><h2 class="profile-head__name">Noah Fischer</h2><p class="profile-head__sub">Engineer who has worked on Northwind since the first sketch, cares about quiet tools, reads a lot on the train, and is happy to talk about databases, gardening or good bread any time.</p></div></div></header>
```

## Tokens

The header reads the canvas and text roles, the tile tones and `--color-tile-fg`, the display type for the
name and the `--space-24` tile size.

## Code

Use `.profile-head` with `__who` (tile plus `__text`) and `__actions`. Choose exactly one of `__photo`,
`__initials` or `__mark`, and add a `tile--*` tone to initials and marks.
