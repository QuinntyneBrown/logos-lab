---
title: Select
tier: core
order: 23
summary: Pick one answer from a short, known list — a native select with the kit's pill or field styling and a quiet chevron.
selector: .select, .select__control
target: select
states: default, hover, focus, active, disabled, invalid
sizes: sm, md, lg
size-class: select--{size}
error: Choose a project lead.
matrix-variants: field, placeholder, grouped
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-border-strong|--color-bg-surface|3; --color-danger-solid|--color-bg-surface|3; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a select when people choose one option from a list of roughly 5 to 15 items they already understand:
a project lead, a sort order, a reminder time. With four or fewer options, show them all with a
[radio group](radio-group.html) or a segmented [button group](button-group.html). For long lists that
people search, use a combobox built on the [text field](text-field.html). For several answers, use
[checkboxes](checkbox.html). The control is always the native `<select>`, so the platform's picker,
keyboard and screen reader support come for free.

## Anatomy

1. **Label** — visible text: inline beside the pill (`.select > span`) or above it in a `.field`.
2. **Control** — `.select__control`: the native select, a pill inline and a rounded rectangle in a field.
3. **Chevron** — `.select__chev`, a decorative 16px icon that never takes clicks.
4. **Wrapper** — `.select__wrap` positions the chevron over the control.

```html
<div class="field"><label class="field__label" for="anat-lead">Project lead</label><span class="select__wrap"><select class="select__control" id="anat-lead" name="lead"><option>Amara Osei</option><option selected>Daniel Reyes</option><option>Grace Liu</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></div>
```

## Variants

### inline
A pill with its label beside it, for toolbars: sort, filter, page size.
```html
<label class="select"><span>Sort by</span><span class="select__wrap"><select class="select__control" name="sort"><option selected>Recently updated</option><option>Name</option><option>Date created</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></label>
```

### field
Inside a `.field` the control fills the width, takes the 52px height and the medium radius of a text field.
```html
<div class="field"><label class="field__label" for="se-lead">Project lead</label><span class="select__wrap"><select class="select__control" id="se-lead" name="lead"><option>Amara Osei</option><option selected>Daniel Reyes</option><option>Grace Liu</option><option>Hannah Kowalski</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></div>
```

### placeholder
When there is no safe default, start on an empty option; it reads in the subtle text role until chosen.
```html
<div class="field"><label class="field__label" for="se-remind">Remind me</label><span class="select__wrap"><select class="select__control" id="se-remind" name="remind" aria-describedby="se-remind-help"><option value="" selected>Choose when</option><option value="day">The day before</option><option value="2h">Two hours before</option><option value="none">No reminder</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span><p class="field__help" id="se-remind-help">Field Day starts at 10:00 am on Saturday 17 October.</p></div>
```

### grouped
`<optgroup>` labels split a longer list into named sets.
```html
<div class="field"><label class="field__label" for="se-notebook">Move to notebook</label><span class="select__wrap"><select class="select__control" id="se-notebook" name="notebook" aria-describedby="se-notebook-help"><optgroup label="Shared with Northwind"><option selected>Harbour Notes</option><option>Field Day plans</option></optgroup><optgroup label="Only you"><option>Drafts</option><option>Reading list</option></optgroup></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span><p class="field__help" id="se-notebook-help">The note takes on the notebook's sharing.</p></div>
```

## Sizes

The inline pill comes in `sm` (36px) for dense toolbars, `md` (44px, default) and `lg` (52px) to sit beside
large buttons. Inside a `.field`, the select always takes the 52px field height so it lines up with
text fields.

## States

Hover darkens the border to the muted role. Focus draws the sage ring; while the native list is open
(active) the border takes the focus colour. Disabled fills with linen and uses the disabled text role.
Invalid turns the border to danger and adds an error message under the control. The empty placeholder
option reads in the subtle role so it is not mistaken for an answer.

### placeholder / invalid
```html
<div class="field"><label class="field__label" for="st-remind">Remind me</label><span class="select__wrap"><select class="select__control" id="st-remind" name="remind" aria-invalid="true" aria-describedby="st-remind-error"><option value="" selected>Choose when</option><option value="day">The day before</option><option value="2h">Two hours before</option><option value="none">No reminder</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span><p class="field__error" id="st-remind-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Choose when to be reminded, or No reminder.</p></div>
```

### grouped / invalid
```html
<div class="field"><label class="field__label" for="st-notebook">Move to notebook</label><span class="select__wrap"><select class="select__control" id="st-notebook" name="notebook" aria-invalid="true" aria-describedby="st-notebook-error"><optgroup label="Shared with Northwind"><option>Harbour Notes</option><option>Field Day plans</option></optgroup><optgroup label="Only you"><option selected>Drafts</option><option>Reading list</option></optgroup></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span><p class="field__error" id="st-notebook-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>This note is shared, so move it to a shared notebook.</p></div>
```

## Responsive

Inline pills keep their label beside them and wrap to the next line of a toolbar rather than shrinking.
Field selects fill their column at every width. On phones the native picker takes over (a wheel or a
sheet), so option text must make sense on its own without the label.

## Accessibility

**Role:** native `<select>` (combobox with a listbox popup). Never rebuild it from `div`s.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to and from the select. |
| Up / Down | Changes the selected option (Windows) or opens the list (macOS). |
| Alt+Down, Space, Enter | Opens the list. |
| Type a letter | Jumps to the next option starting with that letter. |
| Escape | Closes the list without changing the value. |

**Focus:** the 2px sage ring follows the pill or the field shape. Changing the value never moves focus or
submits the form; apply a sort or filter with the new value, but keep focus on the select.

**Labelling:** a visible label, either wrapping the inline pill (`label.select`) or linked with `for`.
The chevron is `aria-hidden`. Help and errors are linked with `aria-describedby`.

**Motion:** only the border colour transitions (240ms), and not at all under reduced motion.

**Touch:** 44px tall inline and 52px in a field. The chevron sits inside the control's target and passes
clicks through with `pointer-events: none`.

## Content

- Labels are nouns: **Project lead**, **Sort by**, **Remind me**.
- Options are short, parallel and in a meaningful order: by time (The day before, Two hours before), by
  frequency of use, or alphabetically for names.
- A placeholder option is a prompt, not an answer: **Choose when**. Never "Select…" or "-- Please select --".
- Include the "none" answer as a real option (**No reminder**) rather than leaving the select empty.

## Do and don't

### Do
Use radios when there are only a few options, so all of them are visible.
```html
<fieldset class="choices choices--plain"><legend>Who can open this note?</legend><label class="choice"><input type="radio" name="dd-access" checked><span class="choice__title">Just me</span></label><label class="choice"><input type="radio" name="dd-access"><span class="choice__title">Northwind team</span></label></fieldset>
```

### Don't
A select for two options hides the choice behind an extra click.
```html
<div class="field"><label class="field__label" for="dd-access-bad">Who can open this note?</label><span class="select__wrap"><select class="select__control" id="dd-access-bad" name="access"><option>Just me</option><option>Northwind team</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></div>
```

### Do
Keep the label visible beside an inline select.
```html
<label class="select"><span>Show</span><span class="select__wrap"><select class="select__control" name="show"><option selected>All notes</option><option>My notes</option><option>Shared with me</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></label>
```

### Don't
An unlabelled select whose first option pretends to be the label.
```html
<span class="select__wrap"><select class="select__control" name="show" aria-label="Show"><option selected>-- Show --</option><option>All notes</option><option>My notes</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span>
```

## Tokens

Selects read the surface, default and muted text roles, the strong border (muted on hover, focus colour when
open), the danger border for invalid, the control heights and the full or medium radius.

## Code

Inline: `label.select` with a `span` label and a `.select__wrap`. In a form: put `.select__wrap` inside a
`.field` with a `label for`. Add `select--sm` or `select--lg` to the control (or the `.select`) for size.
