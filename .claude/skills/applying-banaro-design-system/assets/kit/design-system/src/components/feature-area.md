---
title: Feature area
tier: standard
order: 71
summary: Show the few places a product offers as numbered, quiet cards that each lead somewhere.
selector: .areas, .area
target: .area
states: default, hover
matrix-variants: single
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-fg-link|--color-bg-surface|4.5; --color-fg-accent|--color-accent-subtle|4.5; --color-focus-ring|--color-bg-canvas|3
---

## Overview

Use feature areas to introduce the two to four places a product is built around — on a landing page
below the [hero](hero.html), or on a welcome screen as next steps. Each card is one link with a number,
an icon, a title, one sentence and a "go" cue. For a list of records (projects, people), use a
[card](card.html) grid or a [person list](person-list.html); for a single invitation, use a
[grain panel](panel.html).

## Anatomy

1. **Index** — a two-digit caption ("01") that gives the set a gentle order.
2. **Icon tile** — optional 48px rounded square in `--color-accent-subtle` holding a 24px line icon.
3. **Title** — an `h3` naming the place in two or three words.
4. **Text** — one muted sentence on what you do there.
5. **Go cue** — a link-coloured label with a trailing arrow that nudges on hover.
6. **Container** — the whole card is one `<a>`: surface, hairline border, `--radius-lg`, lifting 3px on hover.

```html
<a class="area" href="#">
  <span class="area__index">01</span>
  <span class="area__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8z"/><path d="m3.5 12 8.5 4.5 8.5-4.5"/><path d="m3.5 16 8.5 4.5 8.5-4.5"/></svg></span>
  <h3 class="area__title">Projects</h3>
  <p class="area__text">Plan, track and ship the work that matters, one project at a time.</p>
  <span class="area__go">Open projects <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></span>
</a>
```

## Variants

### four areas
The landing set: four cards, one row at 1280px and up, two by two from 768px.
```html
<ul class="areas">
  <li><a class="area" href="#">
    <span class="area__index">01</span>
    <span class="area__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8z"/><path d="m3.5 12 8.5 4.5 8.5-4.5"/><path d="m3.5 16 8.5 4.5 8.5-4.5"/></svg></span>
    <h3 class="area__title">Projects</h3>
    <p class="area__text">Plan, track and ship the work that matters, one project at a time.</p>
    <span class="area__go">Open projects <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></span>
  </a></li>
  <li><a class="area" href="#">
    <span class="area__index">02</span>
    <span class="area__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h8l3 3v14h-11z"/><path d="M9 11h6M9 14.5h6M9 18h3.5"/></svg></span>
    <h3 class="area__title">Notes</h3>
    <p class="area__text">Write it down once. Harbour Notes keeps every decision easy to find.</p>
    <span class="area__go">Open notes <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></span>
  </a></li>
  <li><a class="area" href="#">
    <span class="area__index">03</span>
    <span class="area__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg></span>
    <h3 class="area__title">Gatherings</h3>
    <p class="area__text">Plan Field Day and every small meetup, from the invite to the follow-up.</p>
    <span class="area__go">Plan a gathering <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></span>
  </a></li>
  <li><a class="area" href="#">
    <span class="area__index">04</span>
    <span class="area__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19.5c.6-3.3 2.8-5 5.5-5s4.9 1.7 5.5 5"/><circle cx="16.8" cy="9.5" r="2.5"/><path d="M15.6 14.6c2.6-.3 4.4 1.3 4.9 4.4"/></svg></span>
    <h3 class="area__title">People</h3>
    <p class="area__text">See who is working on what, and who can help, without a status meeting.</p>
    <span class="area__go">Meet the team <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></span>
  </a></li>
</ul>
```

### two areas
`areas--two` keeps two columns at every width from 768px: first steps after sign-up, or a fork in a flow.
```html
<ul class="areas areas--two">
  <li><a class="area" href="#">
    <span class="area__index">01</span>
    <span class="area__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg></span>
    <h3 class="area__title">Write your first note</h3>
    <p class="area__text">Start with this week's decisions. Two lines is plenty; you can tidy it later.</p>
    <span class="area__go">Start writing <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></span>
  </a></li>
  <li><a class="area" href="#">
    <span class="area__index">02</span>
    <span class="area__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="8.5" r="3.5"/><path d="M3.5 20c.8-4 3.4-6 6.5-6s5.7 2 6.5 6"/><path d="M19 8v6M16 11h6"/></svg></span>
    <h3 class="area__title">Invite your team</h3>
    <p class="area__text">Bring in Daniel, Grace and Hannah so the notes have readers from day one.</p>
    <span class="area__go">Send invitations <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></span>
  </a></li>
</ul>
```

### without icons
Index, title and text only, for denser sets such as help topics where an icon would only decorate.
```html
<ul class="areas">
  <li><a class="area" href="#"><span class="area__index">01</span><h3 class="area__title">Getting started</h3><p class="area__text">Set up your workspace and your first project in ten minutes.</p><span class="area__go">Read the guide <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></span></a></li>
  <li><a class="area" href="#"><span class="area__index">02</span><h3 class="area__title">Projects and tasks</h3><p class="area__text">Milestones, owners and the quiet art of a short task list.</p><span class="area__go">Read the guide <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></span></a></li>
  <li><a class="area" href="#"><span class="area__index">03</span><h3 class="area__title">Notes and pages</h3><p class="area__text">Templates, links between pages, and sharing outside the team.</p><span class="area__go">Read the guide <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></span></a></li>
  <li><a class="area" href="#"><span class="area__index">04</span><h3 class="area__title">Account and billing</h3><p class="area__text">Plans, invoices, and moving your workspace to a new owner.</p><span class="area__go">Read the guide <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></span></a></li>
</ul>
```

### single
One area on its own, outside a list: a dashboard shortcut to the place that needs attention next.
```html
<a class="area" href="#">
  <span class="area__index">Next up</span>
  <span class="area__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg></span>
  <h3 class="area__title">Field Day is in 8 days</h3>
  <p class="area__text">Saturday 17 October, 10:00 am. 14 people are going; three demos still need a slot.</p>
  <span class="area__go">Finish the plan <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></span>
</a>
```

## Sizes

N/A: one content-driven size. Cards share a row height because each list item is a grid cell; the
container width decides the column count.

## States

Hover lifts the card 3px, deepens its shadow, darkens the border to `--color-border-strong` and nudges the
arrow. Keyboard focus draws the sage ring around the whole card. Feature areas are always links, so they
have no disabled or selected state: remove an area you cannot offer rather than greying it out.

## Responsive

- **360px:** one column; cards stack at full width with a 16px gap.
- **768px:** two columns. Four areas form a two-by-two block.
- **1280px and up:** four columns for the default set; `areas--two` stays at two columns so a pair never
  floats in a half-empty row. Text wraps inside each card; titles never truncate.

## Theming

Cards read `--color-bg-surface` and `--color-border-default`; the icon tile reads `--color-accent-subtle`
with `--color-fg-accent`. In dark mode the tile becomes a deep sage with a light sage glyph and the hover
shadow is replaced by the darker elevation scale, so the lift stays visible.

## Accessibility

**Role:** a `<ul>` of links. Each card is a single `<a>` whose accessible name is its title, text and go cue
in reading order; the title stays an `h3` so screen-reader users can jump between areas by heading.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves from card to card; each card is one stop. |
| Enter | Opens the area. |

**Focus:** the 2px `--color-focus-ring`, offset 3px, follows the card's rounded corners.

**Labelling:** icons are decorative (`aria-hidden="true"`). The index is visible text; keep it short so the
announced name starts quickly. Never put a second link or button inside a card.

**Motion:** the lift and the arrow nudge run only when motion is welcome. Under
`prefers-reduced-motion: reduce`, hover changes only the border and shadow.

**Touch:** the whole card is the target, at least 200px tall on phones.

## Content

- Titles name a place, not a feature: **Projects**, **Notes**, **Gatherings**. Two or three words.
- The sentence says what you do there, in under 15 words: "Plan, track and ship the work that matters,
  one project at a time."
- The go cue is a specific verb: **Open notes**, **Plan a gathering**. Avoid "Learn more" on every card.
- Keep the index to two digits, or one or two words ("Next up") for a single card.

## Do and don't

### Do
A specific go cue for each card.
```html
<a class="area" href="#"><span class="area__index">02</span><h3 class="area__title">Notes</h3><p class="area__text">Write it down once. Harbour Notes keeps every decision easy to find.</p><span class="area__go">Open notes <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></span></a>
```

### Don't
Buttons inside a linked card create nested targets and a confusing tab order.
```html
<div class="area"><span class="area__index">02</span><h3 class="area__title">Notes</h3><p class="area__text">Write it down once. Harbour Notes keeps every decision easy to find.</p><div class="cluster"><button class="btn btn--sm" type="button">New note</button><button class="btn btn--quiet btn--sm" type="button">Import</button></div></div>
```

### Do
Two to four areas, so each one is worth reading.
```html
<ul class="areas areas--two"><li><a class="area" href="#"><span class="area__index">01</span><h3 class="area__title">Write your first note</h3><p class="area__text">Start with this week's decisions.</p></a></li><li><a class="area" href="#"><span class="area__index">02</span><h3 class="area__title">Invite your team</h3><p class="area__text">Bring in Daniel, Grace and Hannah.</p></a></li></ul>
```

### Don't
Eight thin areas turn a calm overview into a menu; use navigation instead.
```html
<ul class="areas"><li><a class="area" href="#"><h3 class="area__title">Tasks</h3></a></li><li><a class="area" href="#"><h3 class="area__title">Files</h3></a></li><li><a class="area" href="#"><h3 class="area__title">Calendar</h3></a></li><li><a class="area" href="#"><h3 class="area__title">Reports</h3></a></li><li><a class="area" href="#"><h3 class="area__title">Billing</h3></a></li><li><a class="area" href="#"><h3 class="area__title">Settings</h3></a></li></ul>
```

## Tokens

Feature areas read the surface, border, accent-subtle and link roles, `--radius-lg` and `--radius-md`,
the shadow scale and the shared `--lift` and `--lift-nudge` motion tokens.
