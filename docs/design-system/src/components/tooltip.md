---
title: Tooltip
tier: core
order: 47
summary: A few words on a dark chip that appear on hover or keyboard focus, to explain a control without adding to the page.
selector: .tooltip
layout: inline
target: button
states: default, hover, focus
apg: tooltip
contrast: --color-fg-inverse|--color-bg-inverse|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a tooltip to add a short description to a control whose purpose is clear but whose detail is not:
what an icon button affects, a keyboard shortcut, why an action is unavailable, the exact time behind
"2 min ago". The control must still make sense without it. Never put anything essential, interactive or
longer than one line in a tooltip; use an explainer [popover](popover.html) for that, and
[inline text](inline-message.html) for anything people must read.

## Anatomy

1. **Trigger** — a focusable control, usually an icon button, that references the tooltip with `aria-describedby`.
2. **Chip** — the inverse surface with small radius and caption text (`.tooltip`), 8px above the trigger.
3. **Shortcut** — optional `<kbd>` at slightly lower emphasis inside the chip.

```html
<span class="tooltip-anchor" data-state="open"><button class="btn btn--quiet btn--sm" type="button" aria-describedby="anat-tip" aria-keyshortcuts="Control+K"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>Search</button><span class="tooltip" role="tooltip" id="anat-tip">Search all notes <kbd>Ctrl K</kbd></span></span>
```

## Variants

### icon button
The most common use: an icon button keeps its `aria-label` as its name, and the tooltip adds a short description.
```html
<span class="tooltip-anchor"><button class="icon-btn" type="button" aria-label="Copy link" aria-describedby="tip-copy"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg></button><span class="tooltip" role="tooltip" id="tip-copy">Anyone in Northwind can open it</span></span>
```

### with shortcut
Teach the keyboard shortcut for a frequent action. Declare it on the trigger with `aria-keyshortcuts` too.
```html
<span class="tooltip-anchor"><button class="btn btn--quiet btn--sm" type="button" aria-describedby="tip-search" aria-keyshortcuts="Control+K"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>Search</button><span class="tooltip" role="tooltip" id="tip-search">Search all notes <kbd>Ctrl K</kbd></span></span>
```

### unavailable action
Explain why an action cannot be used yet. The button uses `aria-disabled`, not `disabled`, so it still takes focus and its tooltip can be reached.
```html
<span class="tooltip-anchor"><button class="btn btn--primary btn--sm" type="button" aria-disabled="true" aria-describedby="tip-publish">Publish</button><span class="tooltip" role="tooltip" id="tip-publish">Add a title before publishing</span></span>
```

### exact time
Behind a relative time, give the full date and time.
```html
<span class="tooltip-anchor"><button class="btn btn--text btn--sm" type="button" aria-describedby="tip-sync">Synced 2 min ago</button><span class="tooltip" role="tooltip" id="tip-sync">Friday 9 October 2026, 9:42 am</span></span>
```

## Sizes

N/A: one size. Caption text with `--space-2` by `--space-3` padding; the chip is as wide as its single line.

## States

**Default** is hidden. **Hover** shows the tooltip alongside the trigger's own hover wash; **focus** shows
it with the sage focus ring on the trigger. Escape hides it
until the pointer or focus moves away and back.

## Responsive

Tooltips behave the same at every width, but touch screens have no hover: on phones they appear only on
keyboard focus. Never rely on them for anything a phone user needs; at 360px put that text on the page or
in an explainer popover. The chip opens above the trigger and aligns to its start edge; keep triggers clear
of the right edge so a long chip does not run off screen.

## Theming

The chip inverts the theme: `--color-bg-inverse` with `--color-fg-inverse`, near-black on light pages and
near-white on dark ones, so it always stands apart from the surface beneath it.

## Accessibility

**Role:** `role="tooltip"` on the chip, referenced by the trigger's `aria-describedby`. It follows the APG
[tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/). The tooltip describes; the trigger is
still named by its own text or `aria-label`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Focusing the trigger shows the tooltip; leaving hides it. |
| Escape | Hides the tooltip while focus stays on the trigger. |

**Focus:** the tooltip never takes focus and holds nothing focusable. It stays visible while the pointer
is over the trigger or the chip itself, and until focus leaves, so people who zoom can read it (WCAG 1.4.13).

**Labelling:** don't repeat the trigger's name in the tooltip; add what the name leaves out. A disabled
reason only works on an `aria-disabled` button, because a `disabled` button cannot be focused.

**Motion:** the chip appears and disappears without animation.

**Touch:** tooltips cannot be the only way to learn something on touch screens. Icon buttons with tooltips
keep their 44px target.

## Content

One line, no full stop, sentence case: **Anyone in Northwind can open it**, **Add a title before
publishing**. Write shortcuts as people type them: **Ctrl K**. Give exact times in full: **Friday 9 October
2026, 9:42 am**. If it needs two sentences, it is not a tooltip.

## Do and don't

### Do
Add detail the label leaves out.
```html
<span class="tooltip-anchor" data-state="open"><button class="icon-btn" type="button" aria-label="Copy link" aria-describedby="do-tip"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg></button><span class="tooltip" role="tooltip" id="do-tip">Anyone in Northwind can open it</span></span>
```

### Don't
Repeat the label, which makes screen readers announce it twice.
```html
<span class="tooltip-anchor" data-state="open"><button class="icon-btn" type="button" aria-label="Copy link" aria-describedby="dont-tip"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg></button><span class="tooltip" role="tooltip" id="dont-tip">Copy link</span></span>
```

### Do
Explain an unavailable action on a focusable `aria-disabled` button.
```html
<span class="tooltip-anchor" data-state="open"><button class="btn btn--primary btn--sm" type="button" aria-disabled="true" aria-describedby="do-tip2">Publish</button><span class="tooltip" role="tooltip" id="do-tip2">Add a title before publishing</span></span>
```

### Don't
Hang a tooltip on a `disabled` button; keyboard users can never reach it.
```html
<span class="tooltip-anchor" data-state="open"><button class="btn btn--primary btn--sm" type="button" disabled aria-describedby="dont-tip2">Publish</button><span class="tooltip" role="tooltip" id="dont-tip2">Add a title before publishing</span></span>
```

## Tokens

Tooltips read the inverse background and text roles, the caption style, `--radius-sm` and `--z-tooltip`.

## Code

Wrap the trigger and the chip in `.tooltip-anchor`; the chip shows on `:hover` and `:focus-within`, and
Escape sets `data-dismissed` on the anchor. `data-state="open"` pins it open for review only.
