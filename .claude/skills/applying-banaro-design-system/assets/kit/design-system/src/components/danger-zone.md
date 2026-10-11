---
title: Danger zone
tier: standard
order: 83
summary: Fence off the actions that cannot be undone, say exactly what will be lost, and ask for the name before acting.
selector: .danger-zone
target: .input, .btn--danger
states: default, disabled, invalid, busy
matrix-variants: typed confirmation
error: Type Northwind exactly as shown to confirm.
contrast: --color-danger-fg|--color-bg-canvas|4.5; --color-fg-muted|--color-bg-canvas|4.5; --color-fg-on-danger|--color-danger-solid|4.5; --color-fg-default|--color-bg-subtle|4.5; --color-border-strong|--color-bg-surface|3; --color-focus-ring|--color-bg-canvas|3
---

## Overview

A danger zone sits at the very end of a settings page and holds the actions that destroy or give away
something: delete a project, leave a notebook, transfer ownership. A thin lingonberry border sets it
apart without shouting. The explanation names **what will be lost and for whom**, and the most severe
action asks people to type the thing's name before the [danger button](button.html) wakes up. Put the
same confirmation in a [dialog](dialog.html) when the action starts elsewhere; never put a danger zone in
the middle of a form.

## Anatomy

1. **Container** — `.danger-zone`: 24px padding, `--radius-lg`, a hairline in `--color-danger-border`.
2. **Title** — `.danger-zone__title`, an `h3` in the `h4` role and `--color-danger-fg`: "Delete Northwind".
3. **Explanation** — a muted paragraph that lists what disappears and says it cannot be undone.
4. **Typed confirmation** — a [form field](form-field.html) whose label shows the exact name in a `.typed-name` chip.
5. **Action** — one `btn--danger` that repeats the verb and the object, disabled until the name matches.
6. **Rows** — optional `.danger-zone__row`s with a `.danger-zone__label`, a line of text and one button each.

```html
<section class="danger-zone" aria-labelledby="dz-anatomy-title">
  <h3 class="danger-zone__title" id="dz-anatomy-title">Delete Northwind</h3>
  <p>Deleting Northwind removes its 48 tasks, 112 notes and every attached file for everyone on the team. This can't be undone.</p>
  <div class="field">
    <label class="field__label" for="dz-anatomy-name">Type <span class="typed-name">Northwind</span> to confirm</label>
    <input class="input" id="dz-anatomy-name" name="confirm-name" type="text" autocomplete="off" spellcheck="false">
  </div>
  <div class="form-actions"><button class="btn btn--danger" type="button">Delete Northwind</button></div>
</section>
```

## Variants

### typed confirmation
The most severe case: the name must be typed before the button acts. Shown ready, with the name matching and the button awake.
```html
<section class="danger-zone" aria-labelledby="dz-typed-title">
  <h3 class="danger-zone__title" id="dz-typed-title">Delete Northwind</h3>
  <p>Deleting Northwind removes its 48 tasks, 112 notes and every attached file for everyone on the team. This can't be undone.</p>
  <div class="field">
    <label class="field__label" for="dz-typed-name">Type <span class="typed-name">Northwind</span> to confirm</label>
    <input class="input" id="dz-typed-name" name="confirm-name" type="text" autocomplete="off" spellcheck="false" value="Northwind">
  </div>
  <div class="form-actions"><button class="btn btn--danger" type="button">Delete Northwind</button></div>
</section>
```

### simple
A reversible-by-someone-else action that still deserves the fence: one sentence and one button, confirmed
in a dialog.
```html
<section class="danger-zone" aria-labelledby="dz-leave-title">
  <h3 class="danger-zone__title" id="dz-leave-title">Leave Harbour Notes</h3>
  <p>You'll lose access to its 112 pages straight away. Amara Osei, the owner, can invite you back.</p>
  <div class="form-actions"><button class="btn btn--danger" type="button">Leave Harbour Notes</button></div>
</section>
```

### several actions
One zone for every irreversible action on the page, each on its own row, mildest first.
```html
<section class="danger-zone" aria-labelledby="dz-rows-title">
  <h3 class="danger-zone__title" id="dz-rows-title">Danger zone</h3>
  <p>These change Northwind for everyone on the team.</p>
  <div class="danger-zone__row">
    <div><p class="danger-zone__label">Transfer ownership</p><p>Give Northwind to Caleb Morgan. You'll stay on as an editor.</p></div>
    <button class="btn btn--quiet" type="button">Transfer</button>
  </div>
  <div class="danger-zone__row">
    <div><p class="danger-zone__label">Archive Northwind</p><p>Hide it from everyone's list. You can restore it within a year.</p></div>
    <button class="btn btn--quiet" type="button">Archive</button>
  </div>
  <div class="danger-zone__row">
    <div><p class="danger-zone__label">Delete Northwind</p><p>Remove its tasks, notes and files for good.</p></div>
    <button class="btn btn--danger" type="button">Delete project</button>
  </div>
</section>
```

## Sizes

N/A: one size. The zone fills its settings column; the confirmation field is capped at
`--layout-measure-short` (44ch) so the name stays close to the label.

## States

**Disabled** is the resting state of a typed confirmation: the button stays disabled until the typed text
matches exactly (case-sensitive, trimmed). **Focus** draws the sage ring on the field. **Invalid** appears
only if someone presses Enter with the wrong name: the field turns lingonberry and says what to type.
**Busy** keeps the label, adds a spinner and makes the field read-only until the work is done; then the
page moves away with a toast.

### disabled
```html
<section class="danger-zone" aria-labelledby="dz-disabled-title">
  <h3 class="danger-zone__title" id="dz-disabled-title">Delete Northwind</h3>
  <p>Deleting Northwind removes its 48 tasks, 112 notes and every attached file for everyone on the team. This can't be undone.</p>
  <div class="field">
    <label class="field__label" for="dz-disabled-name">Type <span class="typed-name">Northwind</span> to confirm</label>
    <input class="input" id="dz-disabled-name" name="confirm-name" type="text" autocomplete="off" spellcheck="false" value="North">
  </div>
  <div class="form-actions"><button class="btn btn--danger" type="button" disabled>Delete Northwind</button></div>
</section>
```

### invalid
```html
<section class="danger-zone" aria-labelledby="dz-invalid-title">
  <h3 class="danger-zone__title" id="dz-invalid-title">Delete Northwind</h3>
  <p>Deleting Northwind removes its 48 tasks, 112 notes and every attached file for everyone on the team. This can't be undone.</p>
  <div class="field">
    <label class="field__label" for="dz-invalid-name">Type <span class="typed-name">Northwind</span> to confirm</label>
    <input class="input" id="dz-invalid-name" name="confirm-name" type="text" autocomplete="off" spellcheck="false" value="northwind" aria-invalid="true" aria-describedby="dz-invalid-error">
    <p class="field__error" id="dz-invalid-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Type Northwind exactly as shown, with a capital N.</p>
  </div>
  <div class="form-actions"><button class="btn btn--danger" type="button" disabled>Delete Northwind</button></div>
</section>
```

### busy
```html
<section class="danger-zone" aria-labelledby="dz-busy-title" aria-busy="true">
  <h3 class="danger-zone__title" id="dz-busy-title">Delete Northwind</h3>
  <p>Deleting Northwind removes its 48 tasks, 112 notes and every attached file for everyone on the team. This can't be undone.</p>
  <div class="field">
    <label class="field__label" for="dz-busy-name">Type <span class="typed-name">Northwind</span> to confirm</label>
    <input class="input" id="dz-busy-name" name="confirm-name" type="text" value="Northwind" readonly>
  </div>
  <div class="form-actions"><button class="btn btn--danger" type="button" aria-busy="true"><span class="spinner" aria-hidden="true"></span>Deleting Northwind…</button></div>
</section>
```

## Responsive

- **360px:** everything stacks; the field and the button fill the width, and rows put their button under
  the text.
- **768px:** rows place the text and the button side by side, with the button aligned to the end.
- **1024px and up:** unchanged; the zone stays within the settings column's measure.

## Theming

The border reads `--color-danger-border` and the title `--color-danger-fg` (lingonberry 700 in light, 300 in
dark). The button is `--color-danger-solid` with `--color-fg-on-danger`. The typed-name chip reads
`--color-bg-subtle`. The border is decorative: the title and the button carry the meaning.

## Accessibility

**Role:** a `<section>` labelled by its title. The confirmation is an ordinary labelled text field; the
button is a native `<button>` with `disabled` until the name matches.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to the field, then to the button once it is enabled. |
| Enter | In the field: deletes when the name matches, otherwise shows the error. |
| Enter, Space | On the button: performs the action. |

**Focus:** the shared sage ring on the field and the button. After an error, focus stays in the field; after
success, focus moves to the page heading of the screen people land on.

**Labelling:** the label includes the exact name ("Type Northwind to confirm"), and the error is linked with
`aria-describedby`. The button names the verb and the object, never "Confirm". A busy zone sets `aria-busy`.

**Motion:** only the spinner turns while busy; under reduced motion it holds still and the label says
"Deleting Northwind…".

**Touch:** the field is 52px tall and the button 44px; on phones the button spans the full width.

## Content

- Title: the verb and the object, "Delete Northwind", or "Danger zone" when it holds several rows.
- Explanation: list what goes, with numbers, and who it affects: "removes its 48 tasks, 112 notes and every
  attached file for everyone on the team". End with "This can't be undone." only when it is true.
- Offer the gentler path first: Archive before Delete, Transfer before Leave.
- Button: repeat the verb and object, **Delete Northwind**; busy: **Deleting Northwind…**.

## Do and don't

### Do
Name the loss and repeat it on the button.
```html
<section class="danger-zone" aria-label="Delete Northwind"><p>Deleting Northwind removes its 48 tasks and 112 notes for everyone. This can't be undone.</p><div class="form-actions"><button class="btn btn--danger" type="button">Delete Northwind</button></div></section>
```

### Don't
A vague warning with a generic button hides what will happen.
```html
<section class="danger-zone" aria-label="Warning"><p>Are you sure? This action is permanent.</p><div class="form-actions"><button class="btn btn--danger" type="button">Confirm</button></div></section>
```

### Do
Keep the danger zone last on the page, after the ordinary settings.
```html
<div class="stack stack--lg"><div class="field"><label class="field__label" for="dd-project-name">Project name</label><input class="input" id="dd-project-name" type="text" value="Northwind"></div><section class="danger-zone" aria-label="Delete project"><p class="danger-zone__title">Delete Northwind</p><div class="form-actions"><button class="btn btn--danger" type="button">Delete Northwind</button></div></section></div>
```

### Don't
A solid red block shouts before anyone has chosen to act; the fence should whisper.
```html
<div class="alert alert--danger"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg><p class="alert__title">DANGER: Delete Northwind</p><div class="alert__actions"><button class="btn btn--danger" type="button">Delete</button></div></div>
```

## Tokens

The danger zone reads the danger border, foreground and solid roles, `--color-bg-subtle` for the typed name,
`--radius-lg` and `--radius-xs`, and `--layout-measure-short` for the field.
