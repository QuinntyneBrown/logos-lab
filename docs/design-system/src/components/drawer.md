---
title: Drawer and sheet
tier: standard
order: 45
summary: A panel that slides in from an edge for filters, navigation or detail, keeping the page it belongs to in view.
selector: .sheet
target: .sheet__head .icon-btn
states: default, hover, focus
apg: dialog-modal
contrast: --color-fg-default|--color-bg-surface-raised|4.5; --color-fg-muted|--color-bg-surface-raised|4.5; --color-fg-accent|--color-accent-subtle|4.5; --color-focus-ring|--color-bg-surface-raised|3
---

## Overview

Use a sheet when people need a secondary surface while keeping their place: filters on a phone, the
workspace navigation on a small screen, or the detail of one row beside a list. A bottom sheet suits
phones and short, thumb-reachable choices; side drawers suit navigation (left) and detail (right). Use a
[dialog](dialog.html) when the task must be finished or abandoned before anything else, and a
[popover](popover.html) for a small choice anchored to one control.

## Anatomy

1. **Panel** — the raised surface with `--shadow-4`, rounded on the edges that face the page.
2. **Head** — the title (`.sheet__title`) and a close icon button (`.sheet__head`).
3. **Content** — choices, links or facts; the panel scrolls when it is taller than the window.
4. **Done action** — optional full-width primary button at the end (`.sheet__done`) that applies and closes.

```html
<div class="sheet sheet--bottom" role="region" aria-labelledby="anat-sheet"><div class="sheet__head"><h3 class="sheet__title" id="anat-sheet">Sort projects</h3><button class="icon-btn" type="button" aria-label="Close sorting"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div><p class="muted">Most recently updated first.</p><button class="btn btn--primary sheet__done" type="button">Done</button></div>
```

## Variants

### bottom
A filter sheet on phones: grouped choices with counts, and a done button that states the result.
```html
<div class="sheet sheet--bottom" role="region" aria-labelledby="sh-filter">
  <div class="sheet__head"><h3 class="sheet__title" id="sh-filter">Filter projects</h3><button class="icon-btn" type="button" aria-label="Close filters"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <fieldset class="check-group"><legend>Status</legend>
    <label class="check"><input class="check__box" type="checkbox" checked><span class="check__text">Active</span><span class="check__count">8</span></label>
    <label class="check"><input class="check__box" type="checkbox"><span class="check__text">In review</span><span class="check__count">3</span></label>
    <label class="check"><input class="check__box" type="checkbox"><span class="check__text">Archived</span><span class="check__count">12</span></label>
  </fieldset>
  <button class="btn btn--primary sheet__done" type="button">Show 8 projects</button>
</div>
```

### action sheet
A bottom sheet of actions for one item on a phone, in place of a small menu. The destructive action comes last.
```html
<div class="sheet sheet--bottom" role="region" aria-labelledby="sh-actions">
  <div class="sheet__head"><h3 class="sheet__title" id="sh-actions">Harbour Notes</h3><button class="icon-btn" type="button" aria-label="Close actions"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div role="group" aria-label="Notebook actions">
    <button class="menu__item" type="button"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>Rename notebook</button>
    <button class="menu__item" type="button"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>Copy link</button>
    <button class="menu__item menu__item--danger" type="button"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 4h4M7 7l.8 12.5h8.4L17 7M10 11v5M14 11v5"/></svg>Delete notebook</button>
  </div>
</div>
```

### left
The navigation drawer for small screens: the same links as the sidebar, with the current page marked.
```html
<div class="sheet sheet--left" role="region" aria-labelledby="sh-nav">
  <div class="sheet__head"><h3 class="sheet__title" id="sh-nav">Northwind</h3><button class="icon-btn" type="button" aria-label="Close menu"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <nav class="sidebar-nav" aria-label="Workspace">
    <a href="#" aria-current="page"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/></svg>Projects</a>
    <a href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h10a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10"/></svg>Harbour Notes</a>
    <a href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/></svg>Field Day</a>
    <a href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 19a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 13.5a6.5 6.5 0 0 1 3.5 5.5"/></svg>People</a>
  </nav>
</div>
```

### right
A detail drawer beside a list or table: who or what was picked, a few facts and one action.
```html
<div class="sheet sheet--right" role="region" aria-labelledby="sh-person">
  <div class="sheet__head"><h3 class="sheet__title" id="sh-person">Grace Liu</h3><button class="icon-btn" type="button" aria-label="Close details"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <dl class="facts"><div><dt>Role</dt><dd>Designer</dd></div><div><dt>Working on</dt><dd>Harbour Notes</dd></div><div><dt>Local time</dt><dd>10:42 am in Lisbon</dd></div></dl>
  <button class="btn btn--primary sheet__done" type="button">Message Grace</button>
</div>
```

## Sizes

N/A: a bottom sheet is full width and at most 86% of the window tall; side drawers are `--layout-aside-width`
(21rem) wide, or the full width on screens narrower than that.

## States

Open is the only resting state; closed sheets are not rendered. Hover and keyboard focus show on the close
button and every control inside, with the 2px sage ring for focus. Content that changes after a choice,
such as the count in **Show 8 projects**, updates in place without moving the button.

## Responsive

At 360px the bottom sheet is the default overlay for filters and item actions, with the done button at
thumb height. From 768px filters move into the page (a sidebar or toolbar) and bottom sheets are rarely
needed. The left drawer replaces the sidebar below 1024px; from 1024px the sidebar is always visible and the
drawer is not offered. The right drawer overlays the list below 1024px and may sit beside it on wider screens.

## Theming

Sheets use `--color-bg-surface-raised` over the `--color-bg-backdrop` scrim with `--shadow-4`. In dark mode
the raised surface is lighter than the page, so the edge stays visible without a border.

## Accessibility

**Role:** in production a sheet is a modal dialog — a `<dialog>` opened with `showModal()`, or an element
with the `popover` attribute for light-dismiss filters — labelled by its title. It follows the APG
[modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). The static specimens here use
`role="region"` so they can sit in the page.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves through the sheet's controls; focus stays inside while it is open. |
| Escape | Closes the sheet and returns focus to the button that opened it. |
| Enter, Space | Activates the focused control; the done button applies and closes. |

**Focus:** on open, focus moves to the close button (navigation, detail) or the first choice (filters). On
close it returns to the trigger — the menu button, the filter button or the row that was opened.

**Labelling:** name the trigger after what opens (**Filters**, **Menu**) and give it `aria-expanded` and
`aria-controls`. Label the close button after what it closes: **Close filters**, **Close menu**.

**Motion:** the sheet settles in over `--duration-slow` with `--ease-enter`; under reduced motion it appears
in place, and the backdrop never animates.

**Touch:** rows and links are 44px tall; the done button is a full-width 44px pill within thumb reach.

## Content

Title the sheet with what it holds: **Filter projects**, **Harbour Notes**, the person's name. Make the done
button state the outcome: **Show 8 projects**, not **Apply** or **Done** when a count is known. Name each
action with a verb and the object: **Rename notebook**, **Delete notebook**.

## Do and don't

### Do
State the result on the done button.
```html
<button class="btn btn--primary sheet__done" type="button">Show 8 projects</button>
```

### Don't
Use a vague label that hides what will happen.
```html
<button class="btn btn--primary sheet__done" type="button">OK</button>
```

### Do
Keep a side drawer to one person or one item, with one action.
```html
<div class="sheet sheet--right" role="region" aria-labelledby="do-sheet"><div class="sheet__head"><h3 class="sheet__title" id="do-sheet">Daniel Reyes</h3><button class="icon-btn" type="button" aria-label="Close details"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div><dl class="facts"><div><dt>Role</dt><dd>Engineer</dd></div></dl><button class="btn btn--primary sheet__done" type="button">Message Daniel</button></div>
```

### Don't
Leave a sheet without a visible way to close it.
```html
<div class="sheet sheet--right" role="region" aria-labelledby="dont-sheet"><div class="sheet__head"><h3 class="sheet__title" id="dont-sheet">Daniel Reyes</h3></div><dl class="facts"><div><dt>Role</dt><dd>Engineer</dd></div></dl></div>
```

## Tokens

Sheets read the raised surface, backdrop, `--shadow-4`, `--radius-xl`, `--layout-margin` for side padding and
`--layout-aside-width` for side drawers.

## Code

Add `sheet--bottom`, `sheet--left` or `sheet--right` to `.sheet`. In production put it on a `<dialog>` or an
element with `popover`, and wire the trigger's `popovertarget` or a `showModal()` call.
