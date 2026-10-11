---
title: Avatar
tier: core
order: 53
summary: Put a face or initials beside a name. A softly rounded square photo, never a circle, with presence shown in words.
selector: .avatar, .avatar-initials, .status
layout: inline
target: .avatar, .avatar-initials
states: default, loading
sizes: sm, md, lg
size-class: avatar--{size}
matrix-variants: photo, initials, with name, group
contrast: --color-tile-fg|--color-tile-sage|4.5; --color-tile-fg|--color-tile-clay|4.5; --color-tile-fg|--color-tile-fjord|4.5; --color-tile-fg|--color-tile-oat|4.5; --color-success-fg|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5
---

## Overview

Use an avatar to help people recognise each other at a glance: in a [list](list.html), a
[comment](comment.html), a [card](card.html) or the account button in the [top bar](top-bar.html).
The photo is a small, softly rounded square — the kit never crops faces into circles. When there is no
photo, show initials on one of the four warm tiles. An avatar never replaces a name: put the name beside
it, or give it one. For a person with their role and an action, use the [person list](person-list.html).

## Anatomy

1. **Portrait** — a square photo cropped with `object-fit: cover`, `--radius-md` corners, 40px by default.
2. **Initials tile** — the fallback: one or two letters on a sage, clay, fjord or oat tile, announced as an image with the person's name.
3. **Presence** — optional: a dot and a word (Online, Last active 2 hours ago). The word is the signal; the dot only repeats it.
4. **Overflow count** — in a group, "+4 more" after the last face.

```html
<div class="cluster"><img class="avatar" src="../assets/photos/amara-osei.jpg" alt="Amara Osei" width="40" height="40"><span class="avatar-initials tile--sage" role="img" aria-label="Daniel Reyes">DR</span><span class="status status--online"><span class="status__dot" aria-hidden="true"></span>Online</span></div>
```

## Variants

### photo
The default. The `alt` is the person's name when no visible name sits beside it.
```html
<img class="avatar" src="../assets/photos/amara-osei.jpg" alt="Amara Osei" width="40" height="40">
```

### initials
When someone has not added a photo, or it fails to load. The tile takes `role="img"` and the full name.
```html
<span class="avatar-initials tile--clay" role="img" aria-label="Daniel Reyes">DR</span>
```

### tile colours
Sage, clay, fjord and oat. Pick the tile from a stable hash of the person's id so it never changes between visits.
```html
<div class="cluster"><span class="avatar-initials tile--sage" role="img" aria-label="Grace Liu">GL</span><span class="avatar-initials tile--clay" role="img" aria-label="Hannah Kowalski">HK</span><span class="avatar-initials tile--fjord" role="img" aria-label="Noah Fischer">NF</span><span class="avatar-initials tile--oat" role="img" aria-label="Caleb Morgan">CM</span></div>
```

### with name
The most common use. The name is visible, so the photo is decorative (`alt=""`).
```html
<div class="cluster"><img class="avatar" src="../assets/photos/grace-liu.jpg" alt="" width="40" height="40"><p><strong>Grace Liu</strong><br><span class="muted">Designer, Northwind</span></p></div>
```

### group
Up to three faces, then a count. Label the group with what it is and how many people it holds.
```html
<div class="avatar-group" role="group" aria-label="Northwind team, 7 people"><img class="avatar avatar--sm" src="../assets/photos/amara-osei.jpg" alt="Amara Osei" width="32" height="32"><img class="avatar avatar--sm" src="../assets/photos/daniel-reyes.jpg" alt="Daniel Reyes" width="32" height="32"><img class="avatar avatar--sm" src="../assets/photos/hannah-kowalski.jpg" alt="Hannah Kowalski" width="32" height="32"><span class="avatar-group__more">+4 more</span></div>
```

### online
Presence for someone available now. The dot breathes slowly; the word carries the meaning.
```html
<div class="cluster"><img class="avatar" src="../assets/photos/noah-fischer.jpg" alt="" width="40" height="40"><p><strong>Noah Fischer</strong><br><span class="status status--online"><span class="status__dot" aria-hidden="true"></span>Online</span></p></div>
```

### away
A hollow dot and a relative time. Never show "Offline" in red; being away is normal.
```html
<div class="cluster"><span class="avatar-initials tile--fjord" aria-hidden="true">LT</span><p><strong>Leah Thompson</strong><br><span class="status"><span class="status__dot" aria-hidden="true"></span>Last active 2 hours ago</span></p></div>
```

### account button
The signed-in person's avatar opens the account menu. The button carries the name; the photo inside is decorative.
```html
<button class="icon-btn" type="button" aria-label="Account menu for Amara Osei" aria-haspopup="menu" aria-expanded="false"><img class="avatar avatar--sm" src="../assets/photos/amara-osei.jpg" alt="" width="32" height="32"></button>
```

## Sizes

`sm` (32px) for groups, dense rows and the account button; the default (40px, no class) for lists and
comments; `md` (48px) for cards and message threads; `lg` (64px) for a profile header or person card.
Initials scale with the tile: the `lg` tile switches to the light display face. Never stretch an avatar
past 96px — use a full photo instead.

## States

An avatar is passive: it has no hover, focus or disabled state of its own. When it sits inside a link or
the account button, that control owns the interaction. While a photo or a person record loads, reserve the
exact size with a busy tile (`aria-busy="true"`) that shimmers softly, so nothing shifts when the photo arrives.

### loading
```html
<span class="avatar-initials" role="img" aria-label="Loading photo" aria-busy="true"></span>
```

### with name / loading
```html
<div class="cluster" aria-busy="true"><span class="avatar-initials" aria-hidden="true" aria-busy="true"></span><p><strong>Grace Liu</strong><br><span class="muted">Designer, Northwind</span></p></div>
```

### group / loading
```html
<div class="avatar-group" role="group" aria-label="Loading the Northwind team" aria-busy="true"><span class="avatar-initials avatar--sm" aria-hidden="true" aria-busy="true"></span><span class="avatar-initials avatar--sm" aria-hidden="true" aria-busy="true"></span><span class="avatar-initials avatar--sm" aria-hidden="true" aria-busy="true"></span></div>
```

## Responsive

Avatars keep their size at every width; they never shrink to make a row fit. At 360px a group shows at
most three faces and the count; a name beside an avatar wraps under itself rather than pushing the photo
out. From 1024px, profile headers may use `lg`.

## Theming

Photos are unchanged in dark mode. The four tiles and `--color-tile-fg` have their own dark values, so
initials keep 4.5:1 contrast on both themes. Presence reads `--color-online` for the dot and
`--color-success-fg` for the word.

## Accessibility

**Role:** an `<img>` with `alt`, or a `<span role="img" aria-label="…">` for initials. A group is
`role="group"` with an `aria-label` that names it and gives the full count. An avatar is not a focus stop
unless it sits inside a link or button.

**Focus:** when an avatar is the content of a link or `.icon-btn`, the control shows the shared 2px focus ring.

**Labelling:** give the person's full name — never the file name or "avatar". When the name is visible
beside it, use `alt=""` (or `aria-hidden="true"` on initials) so screen readers do not hear the name twice.
A button that holds only an avatar names its action: "Account menu for Amara Osei".

**Motion:** the presence dot breathes over 3–4 seconds and the loading tile shimmers; both stop under
reduced motion, and the word "Online" stays.

**Touch:** an avatar inside a control sits in a 44px target, even at `sm`.

## Content

Initials are the first letter of the first and last name, uppercase: **DR** for Daniel Reyes, **GL** for
Grace Liu. For a single name use one letter. Presence is plain and relative: **Online**, **Last active 2
hours ago**, **Away until Monday** — never "Offline" or "Inactive". Group counts say what they count:
**+4 more**, and the label says **Northwind team, 7 people**.

## Do and don't

### Do
Show initials on a tile when there is no photo.
```html
<div class="cluster"><span class="avatar-initials tile--oat" role="img" aria-label="Ruth Alvarez">RA</span><span class="avatar-initials tile--sage" role="img" aria-label="Peter Walsh">PW</span></div>
```

### Don't
A generic silhouette tells nobody who this is.
```html
<span class="avatar-initials tile--oat" role="img" aria-label="User"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="3.5"/><path d="M5.5 19.5c.8-3.3 3.3-5 6.5-5s5.7 1.7 6.5 5"/></svg></span>
```

### Do
Say presence in words; the dot only repeats it.
```html
<span class="status status--online"><span class="status__dot" aria-hidden="true"></span>Online</span>
```

### Don't
A dot on its own is invisible to screen readers and to people who cannot tell the colours apart.
```html
<span class="status status--online"><span class="status__dot" aria-hidden="true"></span></span>
```

### Do
Decorative photo beside a visible name.
```html
<div class="cluster"><img class="avatar avatar--sm" src="../assets/photos/caleb-morgan.jpg" alt="" width="32" height="32"><span>Caleb Morgan</span></div>
```

### Don't
Naming the photo as well makes screen readers say the name twice.
```html
<div class="cluster"><img class="avatar avatar--sm" src="../assets/photos/caleb-morgan.jpg" alt="Photo of Caleb Morgan" width="32" height="32"><span>Caleb Morgan</span></div>
```

## Tokens

Avatars read the spacing scale for their sizes, `--radius-md` for corners, the four tile roles with
`--color-tile-fg`, and `--color-online` for presence.

## Code

Use `<img class="avatar">` with `width` and `height` attributes that match the size, so the page does not
shift while the photo loads. Fall back to `.avatar-initials` with a `tile--*` class. Add `avatar--sm`,
`avatar--md` or `avatar--lg` for size, and `aria-busy="true"` on an empty tile while loading.
