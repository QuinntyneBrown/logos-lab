---
title: Form field
tier: core
order: 20
summary: The wrapper that ties a label, a control, help text and an error together, so every question is understood the first time it is read.
selector: .field
target: input, textarea, select
states: default, hover, focus, disabled, read-only, invalid
error: Enter a project name.
matrix-variants: standard, optional, counter
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-danger-fg|--color-bg-surface|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

A form field is the frame around one question: a visible label, the control, optional help, and the error
message when the answer needs fixing. Every [text field](text-field.html), [textarea](textarea.html),
[select](select.html) and group of [checkboxes](checkbox.html) or [radios](radio-group.html) sits inside a
`.field`. Use [form layout](form-layout.html) to arrange several fields, sections and the actions that
submit them. A [switch](switch.html) carries its own label row and does not need a `.field`.

## Anatomy

1. **Label** — a short noun in sentence case, always visible, linked with `for` / `id`.
2. **Optional marker** — `(optional)` in the label, in the subtle text role. Required fields carry no marker.
3. **Control** — the input, textarea, select or group of choices.
4. **Error message** — appears after the control when the answer needs fixing, with an icon and a sentence that says what to do.
5. **Help text** — explains why the question is asked or what format works; linked with `aria-describedby`.
6. **Counter** — characters used against a soft limit, aligned to the end of the row.

```html
<div class="field"><label class="field__label" for="anat-tagline">Tagline <span class="field__optional">(optional)</span></label><input class="input" id="anat-tagline" name="tagline" type="text" value="Calm, unhurried planning for small teams who meet every week together" aria-invalid="true" aria-describedby="anat-tagline-error anat-tagline-help anat-tagline-count"><p class="field__error" id="anat-tagline-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Keep the tagline to 60 characters or fewer.</p><div class="cluster cluster--between"><p class="field__help" id="anat-tagline-help">One line under the project name on Northwind's card.</p><p class="field__counter" id="anat-tagline-count">69 / 60</p></div></div>
```

## Variants

### standard
Label, control and a line of help. The default for almost every question.
```html
<div class="field"><label class="field__label" for="ff-name">Project name</label><input class="input" id="ff-name" name="project-name" type="text" value="Northwind" autocomplete="off" aria-describedby="ff-name-help"><p class="field__help" id="ff-name-help">Shown on the project card and in every invitation.</p></div>
```

### optional
Say "(optional)" in the label. Never mark required fields with an asterisk instead.
```html
<div class="field"><label class="field__label" for="ff-site">Project website <span class="field__optional">(optional)</span></label><input class="input" id="ff-site" name="website" type="url" inputmode="url" placeholder="https://northwind.studio" autocomplete="url"></div>
```

### counter
A soft limit with a live count. Let people type past it and flag the overflow; never cut text off.
```html
<div class="field"><label class="field__label" for="ff-tagline">Tagline</label><input class="input" id="ff-tagline" name="tagline" type="text" value="Calm planning for small teams" aria-describedby="ff-tagline-help ff-tagline-count"><div class="cluster cluster--between"><p class="field__help" id="ff-tagline-help">One line under the project name.</p><p class="field__counter" id="ff-tagline-count">29 / 60</p></div></div>
```

### group
A `fieldset.field` whose `legend` is the label, for a question answered with several controls.
```html
<fieldset class="field" aria-describedby="ff-days-help"><legend class="field__label">Meeting days</legend><p class="field__help" id="ff-days-help">Harbour Notes reminds the team the evening before.</p><div class="check-grid"><label class="check"><input class="check__box" type="checkbox" name="days" value="mon" checked><span>Monday</span></label><label class="check"><input class="check__box" type="checkbox" name="days" value="tue"><span>Tuesday</span></label><label class="check"><input class="check__box" type="checkbox" name="days" value="wed" checked><span>Wednesday</span></label><label class="check"><input class="check__box" type="checkbox" name="days" value="thu"><span>Thursday</span></label></div></fieldset>
```

### side by side
`.field-row` pairs two short, related answers. It stacks below 48rem.
```html
<div class="field-row"><div class="field"><label class="field__label" for="ff-first">First name</label><input class="input" id="ff-first" name="given-name" type="text" value="Amara" autocomplete="given-name"></div><div class="field"><label class="field__label" for="ff-last">Last name</label><input class="input" id="ff-last" name="family-name" type="text" value="Osei" autocomplete="family-name"></div></div>
```

## Sizes

N/A: The field has one rhythm (an 8px gap between label, control, help and error). The control inside it sets the height; see the text field and select sizes.

## States

The field itself has no states; it shows the state of its control. Hover darkens the control's border,
focus draws the sage ring around the control, read-only fills it with linen and keeps the text strong,
disabled fills it with linen and fades the text, and
invalid turns the border and fill to the danger roles and inserts an error message linked with
`aria-describedby`. Help text stays visible in every state so the reason for the question is never lost.

## Responsive

Fields fill the width of their column at every size. Labels always sit above the control, never beside it,
so long labels and translations wrap instead of squeezing the input. `.field-row` places two fields side by
side from 48rem and stacks them below; keep a row to short answers (names, dates, postcodes).

## Accessibility

**Role:** no role of its own. A `<label for>` names a single control; a `fieldset` with a `legend` names a group.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to and from the control. Labels, help, errors and counters never take focus. |
| Click or tap on the label | Focuses the control, or toggles a checkbox or radio. |

**Focus:** the ring sits on the control, never on the wrapper. After a failed submit, focus moves to the
error summary (see [form layout](form-layout.html)), whose links move focus to each field.

**Labelling:** every control has a visible label; placeholders are examples, never labels. Link help, error
and counter with `aria-describedby` (error first) and set `aria-invalid="true"` on the control. A group's
help is linked from the `fieldset`.

**Motion:** errors appear without animation; nothing shifts the label or the control.

**Touch:** the label extends the control's target. Controls are at least 44px tall at the default size.

## Content

- **Labels** are short nouns in sentence case with no colon: **Project name**, **Meeting days**, **Email address**.
- **Help** says why or how, in one sentence: "Shown on the project card and in every invitation."
- **Errors** say what to do next, not what went wrong: "Enter a project name", "Enter an email address
  like amara@example.com", "Keep the tagline to 60 characters or fewer". Never "Invalid input" or
  "This field is required".
- Mark the few optional questions with **(optional)**; ask only what you need.

## Do and don't

### Do
Keep the label visible above the control, with a real example in help.
```html
<div class="field"><label class="field__label" for="dd-email">Email address</label><input class="input" id="dd-email" name="email" type="email" autocomplete="email" aria-describedby="dd-email-help"><p class="field__help" id="dd-email-help">For example, grace.liu@example.com.</p></div>
```

### Don't
A placeholder used as the label disappears as soon as someone starts typing.
```html
<div class="field"><input class="input" name="email" type="email" placeholder="Email address" aria-label="Email address"></div>
```

### Do
Say exactly how to fix the answer, next to the control.
```html
<div class="field"><label class="field__label" for="dd-invite">Invite by email</label><input class="input" id="dd-invite" name="invite" type="email" value="daniel.reyes@" aria-invalid="true" aria-describedby="dd-invite-error"><p class="field__error" id="dd-invite-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Enter an email address like daniel.reyes@example.com.</p></div>
```

### Don't
A red border and "Invalid" give no way forward.
```html
<div class="field"><label class="field__label" for="dd-invite-bad">Invite by email</label><input class="input" id="dd-invite-bad" name="invite" type="email" value="daniel.reyes@" aria-invalid="true" aria-describedby="dd-invite-bad-error"><p class="field__error" id="dd-invite-bad-error">Invalid.</p></div>
```

### Do
Mark the rare optional question in words.
```html
<div class="field"><label class="field__label" for="dd-pronouns">Pronouns <span class="field__optional">(optional)</span></label><input class="input" id="dd-pronouns" name="pronouns" type="text"></div>
```

### Don't
Asterisks need a legend to decode and are easy to miss.
```html
<div class="field"><label class="field__label" for="dd-team">Team name *</label><input class="input" id="dd-team" name="team" type="text"></div>
```

## Tokens

The field reads the label, muted and subtle text roles, the danger foreground for errors and the 8px
(`--space-2`) rhythm between its parts. `.field-row` uses the 24px gutter.

## Code

Wrap each question in `.field`. Link help, error and counter ids from the control's `aria-describedby`,
set `aria-invalid="true"` while the answer is wrong, and use `fieldset.field` with a `legend.field__label`
for groups.
