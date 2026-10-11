---
title: Person list
tier: standard
order: 74
summary: Introduce people as calm rows of small square portraits, a name that links to them and one line of context.
selector: .people, .person
target: .person__name a
states: default, hover
matrix-variants: stacked
contrast: --color-fg-default|--color-bg-canvas|4.5; --color-fg-muted|--color-bg-canvas|4.5; --color-fg-accent|--color-accent-subtle|4.5; --color-fg-link|--color-bg-canvas|4.5; --color-focus-ring|--color-bg-canvas|3
---

## Overview

Use a person list to show a handful of people — a team, the people going to Field Day, who worked on a
note — when the name and one line of context are enough to decide whom to open. Rows are separated by
hairlines rather than boxed, so a page of people stays light. When each person needs facts, actions and a
summary, use a [card](card.html) grid; for a single person's page, use a [profile header](profile-header.html).

## Anatomy

1. **Portrait** — `.person__photo`, a 64px square with `--radius-md`; decorative (`alt=""`) because the name sits beside it. People without a photo get initials on a tile.
2. **Name** — `.person__name`, an `h3` in the `h4` role whose link opens the person.
3. **Meta** — `.person__meta`, one muted line: role · team or place.
4. **Open line** — `.person__open`, optional: a status [pill](badge.html) or one small link.
5. **Row** — `.person`, a two-column grid with a hairline under it; the list draws the top hairline.

```html
<ul class="people">
  <li class="person">
    <img class="person__photo" src="../assets/photos/amara-osei.jpg" width="64" height="64" alt="">
    <div>
      <h3 class="person__name"><a href="#">Amara Osei</a></h3>
      <p class="person__meta">Product designer · Northwind</p>
      <p class="person__open"><span class="pill pill--accent">Free for feedback</span></p>
    </div>
  </li>
</ul>
```

## Variants

### with status
The default list: three across on wide screens, each person with a status pill.
```html
<ul class="people">
  <li class="person"><img class="person__photo" src="../assets/photos/amara-osei.jpg" width="64" height="64" alt=""><div><h3 class="person__name"><a href="#">Amara Osei</a></h3><p class="person__meta">Product designer · Northwind</p><p class="person__open"><span class="pill pill--accent">Free for feedback</span></p></div></li>
  <li class="person"><img class="person__photo" src="../assets/photos/daniel-reyes.jpg" width="64" height="64" alt=""><div><h3 class="person__name"><a href="#">Daniel Reyes</a></h3><p class="person__meta">Engineer · Northwind</p><p class="person__open"><span class="pill">Focused until 2 pm</span></p></div></li>
  <li class="person"><img class="person__photo" src="../assets/photos/grace-liu.jpg" width="64" height="64" alt=""><div><h3 class="person__name"><a href="#">Grace Liu</a></h3><p class="person__meta">Designer · Harbour Notes</p><p class="person__open"><span class="pill pill--accent">Free for feedback</span></p></div></li>
  <li class="person"><img class="person__photo" src="../assets/photos/hannah-kowalski.jpg" width="64" height="64" alt=""><div><h3 class="person__name"><a href="#">Hannah Kowalski</a></h3><p class="person__meta">Researcher · Harbour Notes</p><p class="person__open"><span class="pill">Away until Monday</span></p></div></li>
  <li class="person"><img class="person__photo" src="../assets/photos/caleb-morgan.jpg" width="64" height="64" alt=""><div><h3 class="person__name"><a href="#">Caleb Morgan</a></h3><p class="person__meta">Founder · Northwind</p><p class="person__open"><span class="pill pill--accent">Hosting Field Day</span></p></div></li>
  <li class="person"><img class="person__photo" src="../assets/photos/noah-fischer.jpg" width="64" height="64" alt=""><div><h3 class="person__name"><a href="#">Noah Fischer</a></h3><p class="person__meta">Engineer · Platform</p><p class="person__open"><span class="pill">Focused until 4:30</span></p></div></li>
</ul>
```

### with action
Each row offers one small, specific action after the meta line.
```html
<ul class="people">
  <li class="person"><img class="person__photo" src="../assets/photos/leah-thompson.jpg" width="64" height="64" alt=""><div><h3 class="person__name"><a href="#">Leah Thompson</a></h3><p class="person__meta">Writer · Harbour Notes</p><p class="person__open"><a class="link-standalone" href="#">Message Leah</a></p></div></li>
  <li class="person"><img class="person__photo" src="../assets/photos/marcus-bennett.jpg" width="64" height="64" alt=""><div><h3 class="person__name"><a href="#">Marcus Bennett</a></h3><p class="person__meta">Operations · Field Day</p><p class="person__open"><a class="link-standalone" href="#">Message Marcus</a></p></div></li>
  <li class="person"><img class="person__photo" src="../assets/photos/ruth-alvarez.jpg" width="64" height="64" alt=""><div><h3 class="person__name"><a href="#">Ruth Alvarez</a></h3><p class="person__meta">Engineer · Northwind</p><p class="person__open"><a class="link-standalone" href="#">Message Ruth</a></p></div></li>
</ul>
```

### initials
For someone without a photo, a 64px initials tile from [Avatar](avatar.html) takes the portrait's place.
```html
<ul class="people">
  <li class="person"><span class="avatar-initials avatar--lg tile--sage" aria-hidden="true">PW</span><div><h3 class="person__name"><a href="#">Peter Walsh</a></h3><p class="person__meta">Engineer · Platform</p></div></li>
  <li class="person"><span class="avatar-initials avatar--lg tile--clay" aria-hidden="true">SM</span><div><h3 class="person__name"><a href="#">Sofia Marquez</a></h3><p class="person__meta">Designer · Northwind</p></div></li>
  <li class="person"><span class="avatar-initials avatar--lg tile--fjord" aria-hidden="true">EB</span><div><h3 class="person__name"><a href="#">Elijah Brooks</a></h3><p class="person__meta">Researcher · Harbour Notes</p></div></li>
</ul>
```

### stacked
`people--stacked`: always one column, with 48px portraits, for an aside such as "Going to Field Day".
```html
<ul class="people people--stacked">
  <li class="person"><img class="person__photo" src="../assets/photos/caleb-morgan.jpg" width="48" height="48" alt=""><div><h3 class="person__name"><a href="#">Caleb Morgan</a></h3><p class="person__meta">Hosting · Founder, Northwind</p></div></li>
  <li class="person"><img class="person__photo" src="../assets/photos/grace-liu.jpg" width="48" height="48" alt=""><div><h3 class="person__name"><a href="#">Grace Liu</a></h3><p class="person__meta">Going · Designer</p></div></li>
  <li class="person"><img class="person__photo" src="../assets/photos/daniel-reyes.jpg" width="48" height="48" alt=""><div><h3 class="person__name"><a href="#">Daniel Reyes</a></h3><p class="person__meta">Going · Engineer</p></div></li>
</ul>
```

## Sizes

Two densities by modifier: the **default** row (64px portrait, 24px vertical padding) for a page of people,
and **`people--stacked`** (48px portrait, 16px padding, one column) for asides and side panels.

## States

Rows are passive; the name link carries the states. Hover underlines the name and eases the portrait to
103%; keyboard focus draws the sage ring around the name. A person's own status lives in the open line,
never in the row's colour.

## Responsive

- **360px:** one column; each row keeps the portrait beside the text. Long names and meta lines wrap.
- **768px:** two columns with the layout gutter between them; hairlines run under each row.
- **1024px and up:** three columns. `people--stacked` stays one column at every width.

## Theming

Rows sit directly on the canvas and read `--color-border-default` for their hairlines. Pills read
`--color-accent-subtle` with `--color-fg-accent`, or the neutral subtle surface. The portrait placeholder
reads `--color-bg-subtle` while the image loads.

## Accessibility

**Role:** a `<ul>` of people; each name is an `h3` with a link, so screen-reader users can move person by
person with the heading key.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to each name link, then to the row's action link if there is one. |
| Enter | Opens the person, or follows the action. |

**Focus:** the shared 2px `--color-focus-ring`, offset 3px, around the name link.

**Labelling:** portraits and initials tiles are decorative (`alt=""`, `aria-hidden="true"`) because the name is
written beside them. Action links name the person: **Message Leah**, never just "Message".

**Motion:** the portrait's 103% scale runs only under `prefers-reduced-motion: no-preference`.

**Touch:** the name link is at least 24px tall; keep the action link on its own line so it does not crowd the name.

## Content

- Names are full names as people write them: **Hannah Kowalski**.
- Meta is **role · team or place**, under 40 characters: "Researcher · Harbour Notes".
- A status pill states availability in plain words, with a time when it ends: "Focused until 2 pm".
- In a stacked list, start the meta with the person's relation to the thing: "Hosting", "Going".

## Do and don't

### Do
A decorative portrait beside the written name.
```html
<ul class="people people--stacked"><li class="person"><img class="person__photo" src="../assets/photos/grace-liu.jpg" width="48" height="48" alt=""><div><h3 class="person__name"><a href="#">Grace Liu</a></h3><p class="person__meta">Designer · Harbour Notes</p></div></li></ul>
```

### Don't
Repeating the name in `alt` makes screen readers say it twice; a vague action hides whom it is for.
```html
<ul class="people people--stacked"><li class="person"><img class="person__photo" src="../assets/photos/grace-liu.jpg" width="48" height="48" alt="Grace Liu"><div><h3 class="person__name"><a href="#">Grace Liu</a></h3><p class="person__open"><a class="link-standalone" href="#">Click here</a></p></div></li></ul>
```

### Do
One short line of meta and at most one pill.
```html
<ul class="people people--stacked"><li class="person"><img class="person__photo" src="../assets/photos/amara-osei.jpg" width="48" height="48" alt=""><div><h3 class="person__name"><a href="#">Amara Osei</a></h3><p class="person__meta">Product designer · Northwind</p><p class="person__open"><span class="pill pill--accent">Free for feedback</span></p></div></li></ul>
```

### Don't
A pile of pills turns a calm row into a tag cloud; move detail to the person's page.
```html
<ul class="people people--stacked"><li class="person"><img class="person__photo" src="../assets/photos/amara-osei.jpg" width="48" height="48" alt=""><div><h3 class="person__name"><a href="#">Amara Osei</a></h3><p class="person__open tags"><span class="pill">Figma</span><span class="pill">Research</span><span class="pill">Writing</span><span class="pill pill--accent">Free</span><span class="pill">Remote</span></p></div></li></ul>
```

## Tokens

The person list reads the border, muted and accent-subtle roles, the `h4` type role, `--radius-md`, the
`--space-12` and `--space-16` portrait sizes and `--layout-gutter` between columns.
