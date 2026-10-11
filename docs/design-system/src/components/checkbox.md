---
title: Checkbox
tier: core
order: 24
summary: Turn one option on or off, or pick any number from a list — a soft square that fills with sage when chosen.
selector: .check, .check__box
target: .check__box
states: default, hover, focus, checked, indeterminate, disabled, invalid
error: Agree to the sharing guide to continue.
matrix-variants: single, description, count
apg: checkbox
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-border-strong|--color-bg-surface|3; --color-accent|--color-bg-surface|3; --color-fg-on-accent|--color-accent|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a checkbox for an independent yes-or-no answer that takes effect when the form is submitted
("Email me a copy"), or to pick any number of options from a list (filters, days, topics). For a setting
that applies the moment it changes, use a [switch](switch.html). For exactly one answer from a list, use a
[radio group](radio-group.html). Larger, described choices that people compare side by side can use the
`.choice` card from the radio group with `type="checkbox"`.

## Anatomy

1. **Row** — `label.check`: a 44px tall target that wraps the box and its text, with a linen wash on hover.
2. **Box** — `.check__box`: a native checkbox restyled as a 20px soft square; sage fill and a white tick when checked.
3. **Label** — the text that names the option; clicking it toggles the box.
4. **Description** — optional `.check__desc` second line inside `.check__text`.
5. **Count** — optional `.check__count` at the end of the row, for filter results.

```html
<label class="check"><input class="check__box" type="checkbox" name="share" checked><span class="check__text"><span>Share with the team</span><span class="check__desc">Everyone in Northwind can read and comment.</span></span><span class="check__count">6 people</span></label>
```

## Variants

### single
One independent option.
```html
<label class="check"><input class="check__box" type="checkbox" name="copy"><span>Email me a copy of these notes</span></label>
```

### description
A second line explains the consequence.
```html
<label class="check"><input class="check__box" type="checkbox" name="share" aria-describedby="cb-share-desc"><span class="check__text"><span>Share with the team</span><span class="check__desc" id="cb-share-desc">Everyone in Northwind can read and comment.</span></span></label>
```

### count
Filter rows show how many results each option keeps. Group them in a `fieldset.check-group`.
```html
<fieldset class="check-group"><legend>Status</legend><label class="check"><input class="check__box" type="checkbox" name="status" value="progress"><span>In progress</span><span class="check__count">12</span></label><label class="check"><input class="check__box" type="checkbox" name="status" value="review" checked><span>In review</span><span class="check__count">4</span></label><label class="check"><input class="check__box" type="checkbox" name="status" value="done"><span>Done</span><span class="check__count">31</span></label></fieldset>
```

### grid
`.check-grid` lays short options in two columns from 40rem.
```html
<fieldset class="check-group"><legend>Topics for Field Day</legend><div class="check-grid"><label class="check"><input class="check__box" type="checkbox" name="topics" value="roadmap" checked><span>Roadmap</span></label><label class="check"><input class="check__box" type="checkbox" name="topics" value="research"><span>Research</span></label><label class="check"><input class="check__box" type="checkbox" name="topics" value="hiring" checked><span>Hiring</span></label><label class="check"><input class="check__box" type="checkbox" name="topics" value="retro"><span>Retrospective</span></label><label class="check"><input class="check__box" type="checkbox" name="topics" value="budget"><span>Budget</span></label><label class="check"><input class="check__box" type="checkbox" name="topics" value="lunch"><span>Lunch plans</span></label></div></fieldset>
```

### select all
A parent box is mixed (`indeterminate`) while only some children are checked.
```html
<fieldset class="check-group"><legend class="vh">Notebooks to export</legend><label class="check"><input class="check__box" type="checkbox" name="all" data-indeterminate="true" aria-controls="cb-books"><span>All notebooks</span><span class="check__count">2 of 3</span></label><ul class="check-group check-group--nested" id="cb-books"><li><label class="check"><input class="check__box" type="checkbox" name="book" value="harbour" checked><span>Harbour Notes</span></label></li><li><label class="check"><input class="check__box" type="checkbox" name="book" value="fieldday" checked><span>Field Day plans</span></label></li><li><label class="check"><input class="check__box" type="checkbox" name="book" value="drafts"><span>Drafts</span></label></li></ul></fieldset>
```

## Sizes

N/A: One size. The box is 20px inside a 44px row, so the whole row is the target at every width.

## States

Hover washes the row with linen and darkens the box border. Focus draws the sage ring around the box.
Checked fills the box with sage and shows the tick; indeterminate shows a dash for a partly checked
group. Disabled greys the box and the text and drops the hover wash; a disabled checked box keeps its
tick on a grey fill. Invalid turns the box border to danger and adds an error message after the row.

### single / invalid
```html
<div class="field"><label class="check"><input class="check__box" type="checkbox" name="agree" aria-invalid="true" aria-describedby="st-agree-error"><span>I have read the Harbour Notes sharing guide</span></label><p class="field__error" id="st-agree-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Agree to the sharing guide to continue.</p></div>
```

### description / invalid
```html
<div class="field"><label class="check"><input class="check__box" type="checkbox" name="share" aria-invalid="true" aria-describedby="st-share-desc st-share-error"><span class="check__text"><span>Share with the team</span><span class="check__desc" id="st-share-desc">Everyone in Northwind can read and comment.</span></span></label><p class="field__error" id="st-share-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Share the note so Grace can review it.</p></div>
```

### count / invalid
```html
<fieldset class="check-group" aria-describedby="st-status-error"><legend>Status</legend><p class="field__error" id="st-status-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Choose at least one status.</p><label class="check"><input class="check__box" type="checkbox" name="status" value="progress" aria-invalid="true"><span>In progress</span><span class="check__count">12</span></label><label class="check"><input class="check__box" type="checkbox" name="status" value="review" aria-invalid="true"><span>In review</span><span class="check__count">4</span></label><label class="check"><input class="check__box" type="checkbox" name="status" value="done" aria-invalid="true"><span>Done</span><span class="check__count">31</span></label></fieldset>
```

## Responsive

Rows fill their column and wrap long labels under themselves, never under the box. `.check-grid` is one
column on phones and two from 40rem. Filter lists in a sidebar become a sheet on phones; the rows keep
their 44px height.

## Accessibility

**Role:** native `<input type="checkbox">` inside its `<label>`. A partly checked parent sets the
`indeterminate` property (announced as "mixed").

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to and from each checkbox; every box is its own tab stop. |
| Space | Toggles the focused checkbox. A mixed parent becomes checked, which checks every child. |

**Focus:** the 2px ring, offset 3px, sits on the box. Toggling never moves focus; filter results update
around the list, and their new count is announced politely.

**Labelling:** wrap the box and its text in one `label`, so the whole row toggles it. Group related boxes in
a `fieldset` with a `legend` that asks the question. Link a description with `aria-describedby`. Errors for a
group are linked from the `fieldset`.

**Motion:** the tick fades in over 160ms and the row wash over 240ms; both are removed under reduced
motion. In forced-colours mode the native checkbox is restored.

**Touch:** the whole 44px row is the target, not just the 20px box.

## Content

- Write labels as positive statements of what will happen when checked: **Email me a copy of these
  notes**, not "Don't email me".
- Keep options parallel and short; put any consequence in the description.
- Legends ask the question: **Topics for Field Day**, **Status**.
- Never pre-check consent, marketing or sharing boxes.

## Do and don't

### Do
Phrase the label so checked means yes.
```html
<label class="check"><input class="check__box" type="checkbox" name="digest"><span>Send me a weekly digest</span></label>
```

### Don't
A negative label makes people work out a double negative.
```html
<label class="check"><input class="check__box" type="checkbox" name="digest"><span>Don't stop sending me the weekly digest</span></label>
```

### Do
Use a switch for a setting that applies the moment it changes.
```html
<div class="switch switch--plain"><label class="switch__title" for="dd-dark">Dark theme</label><input class="switch__control" id="dd-dark" type="checkbox" role="switch"></div>
```

### Don't
A checkbox that changes a live setting without a Save button surprises people.
```html
<label class="check"><input class="check__box" type="checkbox" name="dark" checked><span>Dark theme (applies now)</span></label>
```

## Tokens

Checkboxes read the strong border and surface for the empty box, the accent and on-accent roles for the
checked box and tick, the subtle background for the row hover, and the 4px (`--radius-xs`) box radius.

## Code

Wrap `input.check__box` and its text in `label.check`. Use `.check__text` with `.check__desc` for two lines,
`.check__count` for filter counts, and a `fieldset.check-group` with a `legend` for a list. Set the
`indeterminate` property from script (`data-indeterminate="true"` previews it).
