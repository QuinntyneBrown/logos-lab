---
title: Chip and tag
tier: core
order: 55
summary: Narrow a list with one tap. A pressed chip turns sage; an applied filter shows as a chip you can remove.
selector: .chip
layout: inline
target: .chip
states: default, hover, focus, active, pressed, disabled
matrix-variants: filter, with count, with icon
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-accent|--color-accent-subtle|4.5; --color-border-strong|--color-bg-surface|3; --color-accent|--color-bg-surface|3; --color-focus-ring|--color-bg-surface|3
---

## Overview

A chip is a toggle button for filtering: Design, Engineering, Within 10 km. Pressing it adds the filter
and turns it sage; pressing again removes it. A row of chips sits above a list or in a
[search and filter toolbar](search-filter-toolbar.html). An applied filter that came from elsewhere (a
search, a link) shows as a removable chip. Use a [badge or tag](badge.html) for a label people cannot
change, [tabs](tabs.html) to switch between views, and a [radio group](radio-group.html) when exactly one
option must be chosen in a form.

## Anatomy

1. **Leading icon** — optional, 16px, decorative.
2. **Label** — one to three words naming the filter.
3. **Count** — optional, the number of results the filter would show, in subtle tabular figures.
4. **Container** — a 36px pill with a hairline border; pressed chips fill with `--color-accent-subtle` and an accent border.
5. **Remove** — on applied filters only: a 24px round button that names the filter.

```html
<button class="chip" type="button" aria-pressed="true"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>Within 10 km <span class="chip__count">8</span></button>
```

## Variants

### filter
The base: a `<button>` with `aria-pressed`. Click it in the specimen to toggle it.
```html
<button class="chip" type="button" aria-pressed="false">Design</button>
```

### with count
Shows how many results the filter leaves, so nobody presses into an empty list.
```html
<button class="chip" type="button" aria-pressed="false">Open tasks <span class="chip__count">14</span></button>
```

### with icon
A small leading icon for filters that are easier to scan by shape: place, date, people.
```html
<button class="chip" type="button" aria-pressed="false"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>This week</button>
```

### selected
A chip that is already pressed when the page loads.
```html
<button class="chip" type="button" aria-pressed="true">Harbour Notes</button>
```

### group
A labelled row of chips. Several can be pressed at once; each is its own toggle.
```html
<div class="chips" role="group" aria-label="Filter notes by topic"><button class="chip" type="button" aria-pressed="true">Research <span class="chip__count">12</span></button><button class="chip" type="button" aria-pressed="false">Design <span class="chip__count">9</span></button><button class="chip" type="button" aria-pressed="false">Engineering <span class="chip__count">21</span></button><button class="chip" type="button" aria-pressed="false" disabled>Field Day <span class="chip__count">0</span></button></div>
```

### removable
An applied filter. The chip is not a button; its remove button is, and it names the filter.
```html
<span class="chip">Tagged research<button class="chip__remove" type="button" aria-label="Remove filter: tagged research"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></span>
```

### applied filters
Every applied filter in one row, with a text button that clears them all.
```html
<div class="chips" role="group" aria-label="Applied filters"><span class="chip">Daniel Reyes<button class="chip__remove" type="button" aria-label="Remove filter: Daniel Reyes"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></span><span class="chip">Last 7 days<button class="chip__remove" type="button" aria-label="Remove filter: last 7 days"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></span><button class="btn btn--text btn--sm" type="button">Clear all</button></div>
```

## Sizes

N/A: chips have one 36px height so a row of filters lines up. The pill grows with its label; the whole
chip is the target, and it never drops below the 24px minimum.

## States

Hover adds a linen wash and a stronger border; active deepens the wash while pressed; focus shows the
sage ring. Pressed (`aria-pressed="true"`) fills the chip with the accent tint and an accent border, and
stays that way until pressed again. A disabled chip — a filter with no results right now — is greyed out
and keeps its count of 0 so people can see why.

## Responsive

A `.chips` row wraps at every width with an 8px gap; it never scrolls sideways out of sight. At 360px,
long filter sets collapse into a "Filters" button that opens a [drawer](drawer.html), and the applied
filters show as removable chips above the list. From 768px the full row fits beside the search field.

## Theming

Chips read surface, border and accent roles. In dark mode the pressed fill becomes a deep sage tint with
light sage text; the hairline border keeps 3:1 against the surface. In forced-colours mode each chip gets
a `CanvasText` border.

## Accessibility

**Role:** a native `<button type="button" aria-pressed>` for each filter, inside a `role="group"` with an
`aria-label` that names the filter set. Removable chips are plain text with a real remove `<button>`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves between chips; every chip is a stop. |
| Enter, Space | Toggles the chip and updates `aria-pressed`. |
| Enter, Space on remove | Removes the filter; focus moves to the next chip, or to the list heading when none are left. |

**Focus:** the shared 2px `--color-focus-ring`, offset 3px, around the pill.

**Labelling:** the label never changes when pressed — `aria-pressed` carries the state. Counts are read as
part of the name ("Research 12"); if that is unclear, add a `.vh` "notes". Remove buttons say
"Remove filter: tagged research". After the list updates, announce the new total in a `role="status"`
message ("14 notes").

**Motion:** background and border fade over 240ms; reduced motion swaps them instantly.

**Touch:** 36px tall with at least an 8px gap between chips.

## Content

Name the filter, not the action: **Research**, **This week**, **Within 10 km** — not "Show research".
Use sentence case, one to three words, no punctuation. Counts are bare numbers. Applied filters read as a
short phrase: **Tagged research**, **Last 7 days**, **Daniel Reyes**.

## Do and don't

### Do
Toggle with `aria-pressed` and keep the label still.
```html
<button class="chip" type="button" aria-pressed="true">Research</button>
```

### Don't
Changing the label to show state confuses screen readers and shifts the layout.
```html
<button class="chip" type="button">✓ Research (on)</button>
```

### Do
Label the group so the chips have context.
```html
<div class="chips" role="group" aria-label="Filter tasks by owner"><button class="chip" type="button" aria-pressed="false">Amara Osei</button><button class="chip" type="button" aria-pressed="false">Grace Liu</button></div>
```

### Don't
Chips are not tabs: switching between whole views belongs in a tab list.
```html
<div class="chips" role="group" aria-label="Views"><button class="chip" type="button" aria-pressed="true">Overview</button><button class="chip" type="button" aria-pressed="false">Settings</button><button class="chip" type="button" aria-pressed="false">Members</button></div>
```

## Tokens

Chips read the surface, border, subtle and accent roles, `--control-height-sm`, `--radius-full` and the
24px `--target-min` for the remove button.

## Code

Use `<button class="chip" aria-pressed="false">` inside a `.chips` group. Add `.chip__count` after the
label, a leading `.icon.icon--sm`, or a `.chip__remove` button for applied filters.
