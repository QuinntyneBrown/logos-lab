---
title: Tabs
tier: core
order: 34
summary: Switch between a few views of the same thing without leaving the page. Muted labels on a hairline, the selected one underlined in sage.
selector: .tabs
target: .tab:not([aria-selected="true"]):not([aria-current])
states: default, hover, focus, disabled
matrix-variants: underline, pill, with counts
apg: tabs
contrast: --color-fg-muted|--color-bg-surface|4.5; --color-fg-default|--color-bg-surface|4.5; --color-fg-accent|--color-accent-subtle|4.5; --color-accent|--color-bg-surface|3; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use tabs for two to six views of one object that people move between freely: a project's overview, notes and
activity; a list filtered to all, mine or shared. Every tab shows the same kind of content and none depends on
another. For steps that must happen in order, use a [stepper](stepper.html); for the sections of a whole area,
use a [sidebar navigation](sidebar-navigation.html); for a single on/off choice between modes, use a segmented
[button group](button-group.html).

## Anatomy

1. **Tab list** — `.tabs` with `role="tablist"` and a name; a hairline runs beneath it and it scrolls sideways when it overflows.
2. **Tab** — a 44px `button.tab` in the label type style, muted until selected.
3. **Selection indicator** — a 2px sage underline under the selected tab (or a sage pill in `.tabs--pill`).
4. **Count** — optional trailing [badge](badge.html).
5. **Panel** — `role="tabpanel"`, labelled by its tab; only the selected panel is shown.

```html
<div class="tabs" role="tablist" aria-label="Northwind"><button class="tab" type="button" role="tab" aria-selected="true">Overview</button><button class="tab" type="button" role="tab" aria-selected="false" tabindex="-1">Notes<span class="badge badge--plain">12</span></button></div>
```

## Variants

### underline
The default: an underline marks the selected tab. Use it at the top of a page or card. Try the arrow keys.
```html
<div class="stack" data-demo-tabs><div class="tabs" role="tablist" aria-label="Northwind"><button class="tab" type="button" role="tab" id="tab-overview" aria-selected="true" aria-controls="panel-overview">Overview</button><button class="tab" type="button" role="tab" id="tab-notes" aria-selected="false" aria-controls="panel-notes" tabindex="-1">Notes</button><button class="tab" type="button" role="tab" id="tab-activity" aria-selected="false" aria-controls="panel-activity" tabindex="-1">Activity</button><button class="tab" type="button" role="tab" id="tab-files" aria-selected="false" aria-controls="panel-files" tabindex="-1">Files</button></div><div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" tabindex="0"><p class="muted">Northwind launches on Friday 23 October. 14 of 18 checklist items are done.</p></div><div role="tabpanel" id="panel-notes" aria-labelledby="tab-notes" tabindex="0" hidden><p class="muted">12 notes, most recently "Launch copy, second pass" by Grace Liu.</p></div><div role="tabpanel" id="panel-activity" aria-labelledby="tab-activity" tabindex="0" hidden><p class="muted">Daniel Reyes closed "Fix sign-in redirect" an hour ago.</p></div><div role="tabpanel" id="panel-files" aria-labelledby="tab-files" tabindex="0" hidden><p class="muted">No files yet. Drop a file on any note to attach it.</p></div></div>
```

### pill
`.tabs--pill` drops the hairline and fills the selected tab. Use it for filters of one list, inside a toolbar or card.
```html
<div class="stack" data-demo-tabs><div class="tabs tabs--pill" role="tablist" aria-label="Show notes"><button class="tab" type="button" role="tab" id="pill-all" aria-selected="true" aria-controls="pill-all-panel">All</button><button class="tab" type="button" role="tab" id="pill-mine" aria-selected="false" aria-controls="pill-mine-panel" tabindex="-1">Mine</button><button class="tab" type="button" role="tab" id="pill-shared" aria-selected="false" aria-controls="pill-shared-panel" tabindex="-1">Shared with me</button></div><div role="tabpanel" id="pill-all-panel" aria-labelledby="pill-all" tabindex="0"><p class="muted">36 notes in Harbour Notes.</p></div><div role="tabpanel" id="pill-mine-panel" aria-labelledby="pill-mine" tabindex="0" hidden><p class="muted">9 notes written by you.</p></div><div role="tabpanel" id="pill-shared-panel" aria-labelledby="pill-shared" tabindex="0" hidden><p class="muted">4 notes shared with you by Hannah Kowalski.</p></div></div>
```

### with counts
A plain badge after the label says how much each view holds. Keep counts exact and short.
```html
<div class="stack" data-demo-tabs><div class="tabs" role="tablist" aria-label="Tasks"><button class="tab" type="button" role="tab" id="count-open" aria-selected="true" aria-controls="count-open-panel">Open<span class="badge badge--plain">12</span></button><button class="tab" type="button" role="tab" id="count-done" aria-selected="false" aria-controls="count-done-panel" tabindex="-1">Done<span class="badge badge--plain">48</span></button><button class="tab" type="button" role="tab" id="count-archived" aria-selected="false" aria-controls="count-archived-panel" tabindex="-1">Archived<span class="badge badge--plain">3</span></button></div><div role="tabpanel" id="count-open-panel" aria-labelledby="count-open" tabindex="0"><p class="muted">12 open tasks, 4 due this week.</p></div><div role="tabpanel" id="count-done-panel" aria-labelledby="count-done" tabindex="0" hidden><p class="muted">48 tasks done since September.</p></div><div role="tabpanel" id="count-archived-panel" aria-labelledby="count-archived" tabindex="0" hidden><p class="muted">3 archived tasks.</p></div></div>
```

### with icons
A 20px line icon before each label, for views people recognise by shape. Never use icons alone.
```html
<div class="stack" data-demo-tabs><div class="tabs" role="tablist" aria-label="Northwind view"><button class="tab" type="button" role="tab" id="view-board" aria-selected="true" aria-controls="view-board-panel"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4.5" width="6.5" height="15" rx="1.5"/><rect x="13.5" y="4.5" width="6.5" height="9" rx="1.5"/></svg>Board</button><button class="tab" type="button" role="tab" id="view-list" aria-selected="false" aria-controls="view-list-panel" tabindex="-1"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7h11M9 12h11M9 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01"/></svg>List</button><button class="tab" type="button" role="tab" id="view-calendar" aria-selected="false" aria-controls="view-calendar-panel" tabindex="-1"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/></svg>Calendar</button></div><div role="tabpanel" id="view-board-panel" aria-labelledby="view-board" tabindex="0"><p class="muted">Three columns: To do, Doing, Done.</p></div><div role="tabpanel" id="view-list-panel" aria-labelledby="view-list" tabindex="0" hidden><p class="muted">18 tasks, sorted by due date.</p></div><div role="tabpanel" id="view-calendar-panel" aria-labelledby="view-calendar" tabindex="0" hidden><p class="muted">October 2026, with Field Day on Saturday the 17th.</p></div></div>
```

### navigation tabs
The same look for links between sibling pages. These are links in a named `<nav>` with `aria-current="page"`,
not ARIA tabs: each one loads a page.
```html
<nav aria-label="Field Day"><div class="tabs"><a class="tab" href="#" aria-current="page">Details</a><a class="tab" href="#">Who's coming</a><a class="tab" href="#">Photos</a><a class="tab" href="#">Discussion</a></div></nav>
```

## Sizes

N/A: one size. Tabs are `--target-comfortable` (44px) tall in the label type style with `--space-4` inline
padding; the underline is `--border-width-thick`.

## States

Unselected tabs rest in the muted text role. Hover adds the linen wash and the default text role; keyboard focus
draws the sage ring. The selected tab takes the default text role and the sage underline (in `.tabs--pill`, the
sage-tinted fill with accent text); it is announced with `aria-selected="true"`. A disabled tab uses the disabled
text role and is skipped by the arrow keys. The matrix forces each state on the first unselected tab.

### underline / disabled
```html
<div class="tabs" role="tablist" aria-label="Northwind"><button class="tab" type="button" role="tab" aria-selected="true">Overview</button><button class="tab" type="button" role="tab" aria-selected="false" tabindex="-1">Notes</button><button class="tab" type="button" role="tab" aria-selected="false" tabindex="-1">Activity</button><button class="tab" type="button" role="tab" aria-selected="false" disabled>Files</button></div>
```

### pill / disabled
```html
<div class="tabs tabs--pill" role="tablist" aria-label="Show notes"><button class="tab" type="button" role="tab" aria-selected="true">All</button><button class="tab" type="button" role="tab" aria-selected="false" tabindex="-1">Mine</button><button class="tab" type="button" role="tab" aria-selected="false" disabled>Shared with me</button></div>
```

### with counts / disabled
```html
<div class="tabs" role="tablist" aria-label="Tasks"><button class="tab" type="button" role="tab" aria-selected="true">Open<span class="badge badge--plain">12</span></button><button class="tab" type="button" role="tab" aria-selected="false" tabindex="-1">Done<span class="badge badge--plain">48</span></button><button class="tab" type="button" role="tab" aria-selected="false" disabled>Archived<span class="badge badge--plain">0</span></button></div>
```

## Responsive

The tab list never wraps. When the tabs are wider than their container, at 360px for example, the list scrolls
sideways with a swipe or the arrow keys, and the selected tab is scrolled into view on load. At 768px and
1024px and up most lists fit. Keep labels short so the first three tabs fit at 360px.

## Theming

Every colour reads a semantic role. In dark mode the underline and the pill fill turn light sage; the hover wash is
a lighter charcoal.

## Accessibility

**Role:** `role="tablist"` (named with `aria-label` or `aria-labelledby`) of `button role="tab"`, each with
`aria-selected` and `aria-controls` pointing at its `role="tabpanel"`; the panel has `aria-labelledby` its tab and
`tabindex="0"` when it holds no focusable content. This follows the WAI-ARIA APG tabs pattern with automatic
activation. Navigation tabs are links with `aria-current="page"` instead.

| Key | Effect |
|---|---|
| Tab | Moves focus into the tab list, onto the selected tab; the next Tab moves into the panel. |
| Right Arrow / Left Arrow | Moves to and selects the next or previous tab, wrapping at the ends. |
| Home / End | Moves to and selects the first or last tab. |
| Enter, Space | Selects the focused tab when activation is manual (use manual activation if a panel is slow to load). |

**Focus:** a roving `tabindex`: only the selected tab is `0`, the rest are `-1`. The focused tab shows the shared
2px `--color-focus-ring`.

**Labelling:** name the tab list after the object ("Northwind", "Tasks"). Counts are part of the tab's name; don't
hide them. Icons are decorative.

**Motion:** the selection changes at once; nothing animates, so nothing to reduce.

**Touch:** tabs are 44px tall; a scrolling list scrolls with a swipe without selecting a tab.

## Content

Label tabs with one or two nouns in sentence case: **Overview**, **Notes**, **Shared with me**. Keep the order
stable and put the most-used view first. Don't number tabs, end them with punctuation, or write instructions
("Click to see files"). Counts are bare numbers: **12**, never "(12)".

## Do and don't

### Do
Use tabs for parallel views of one thing, with short noun labels.
```html
<div class="tabs" role="tablist" aria-label="Northwind"><button class="tab" type="button" role="tab" aria-selected="true">Overview</button><button class="tab" type="button" role="tab" aria-selected="false" tabindex="-1">Notes</button><button class="tab" type="button" role="tab" aria-selected="false" tabindex="-1">Activity</button></div>
```

### Don't
Use tabs for steps that depend on each other; that is a stepper.
```html
<div class="tabs" role="tablist" aria-label="New gathering"><button class="tab" type="button" role="tab" aria-selected="true">1. Details</button><button class="tab" type="button" role="tab" aria-selected="false" tabindex="-1">2. Invite</button><button class="tab" type="button" role="tab" aria-selected="false" tabindex="-1">3. Review</button></div>
```

### Do
Keep one style per list: underline at the top of a page, pills for filters inside it.
```html
<div class="tabs tabs--pill" role="tablist" aria-label="Show notes"><button class="tab" type="button" role="tab" aria-selected="true">All</button><button class="tab" type="button" role="tab" aria-selected="false" tabindex="-1">Mine</button></div>
```

### Don't
Use icon-only tabs; a shape alone doesn't say which view it is.
```html
<div class="tabs" role="tablist" aria-label="Northwind view"><button class="tab" type="button" role="tab" aria-selected="true" aria-label="Board"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4.5" width="6.5" height="15" rx="1.5"/><rect x="13.5" y="4.5" width="6.5" height="9" rx="1.5"/></svg></button><button class="tab" type="button" role="tab" aria-selected="false" tabindex="-1" aria-label="List"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7h11M9 12h11M9 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01"/></svg></button></div>
```

## Tokens

Tabs read the muted, default and accent text roles, the subtle and accent-subtle washes, the accent for the
underline, the default border for the hairline and `--target-comfortable` for height.

## Code

Wrap the list and its panels together. Script switches `aria-selected`, the roving `tabindex` and the panels'
`hidden` attribute; `.tabs--pill` changes only the look.
