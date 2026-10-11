---
title: Forms
order: 10
summary: Ask for a clear answer, keep everything a person typed, and say what happens next.
selector: .form, .field
components: form-field, text-field, textarea, select, checkbox, radio-group, switch, form-layout, inline-message, button, file-upload, stepper
---

## Overview

A form is a short conversation: a few plain questions, one at a time, in the order a person would answer
them. Every field has a visible label, help sits under the label it explains, and a single sage
[button](../components/button.html) moves the task forward. When something is wrong, the form says so
once at the top in a linked [error summary](../components/form-layout.html) and again beside the field,
and nothing the person typed is ever cleared.

```html
<form class="form-card" action="#" novalidate aria-labelledby="fo-title">
  <h4 class="form-section__title" id="fo-title">New project</h4>
  <div class="field">
    <label class="field__label" for="fo-name">Project name</label>
    <input class="input" id="fo-name" name="name" type="text" value="Northwind" aria-describedby="fo-name-help" required>
    <p class="field__help" id="fo-name-help">The name your team will search for.</p>
  </div>
  <div class="field">
    <label class="field__label" for="fo-summary">Summary <span class="field__optional">(optional)</span></label>
    <textarea class="textarea" id="fo-summary" name="summary" rows="3" aria-describedby="fo-summary-help">A calmer way to plan the spring field season.</textarea>
    <p class="field__help" id="fo-summary-help">One or two sentences. Everyone on the project can see it.</p>
  </div>
  <div class="form-actions">
    <button class="btn btn--quiet" type="button">Cancel</button>
    <button class="btn btn--primary" type="submit">Create project</button>
  </div>
</form>
```

## When to use

- **Setting up and editing:** creating an account, a project, a gathering or a profile.
- **Choosing preferences:** notification settings, privacy and display options (often [switches](../components/switch.html) that save as they change).
- **A short decision inside a task:** one or two fields belong in a [dialog](dialogs.html). Anything longer,
  or anything a person may want to come back to, gets its own screen.

Do not put editable fields inline in a read-only page. A button such as **Edit details** opens a dialog or
navigates to an edit screen; the page itself stays calm and readable.

## Structure

Build every form from the same parts, top to bottom:

1. **Title and one-line lead** — what this form is for and who will see the answers.
2. **Error summary** — only after a failed submit; a linked list of every problem.
3. **Sections** — a `fieldset.form-section` with a `legend` for each group of related questions.
4. **Fields** — label, optional marker, help, control, error, in that order. Short related answers
   (first and last name, start and end time) may share a `.field-row`.
5. **Actions** — `.form-actions` at the end: the safe action first, then the one primary action.

```html
<form class="form-card" action="#" novalidate aria-labelledby="fs-title">
  <div>
    <h4 class="form-section__title" id="fs-title">Plan a gathering</h4>
    <p class="muted">Invitations go out when you publish. You can change the details until then.</p>
  </div>
  <fieldset class="form-section">
    <legend class="form-section__title">The basics</legend>
    <div class="field">
      <label class="field__label" for="fs-name">Name</label>
      <input class="input" id="fs-name" name="name" type="text" value="Field Day" required>
    </div>
    <div class="field-row">
      <div class="field">
        <label class="field__label" for="fs-date">Date</label>
        <input class="input" id="fs-date" name="date" type="date" value="2026-10-17" required>
      </div>
      <div class="field">
        <label class="field__label" for="fs-time">Start time</label>
        <input class="input" id="fs-time" name="time" type="time" value="10:00" required>
      </div>
    </div>
  </fieldset>
  <fieldset class="form-section">
    <legend class="form-section__title">Who can come</legend>
    <fieldset class="choices">
      <legend class="field__label">Visibility</legend>
      <label class="choice"><input type="radio" name="vis" checked><span class="choice__title">Everyone on Northwind</span><span class="choice__text">All 14 members see it on their home page.</span></label>
      <label class="choice"><input type="radio" name="vis"><span class="choice__title">Only people I invite</span><span class="choice__text">Nobody else can see it or find it.</span></label>
    </fieldset>
    <label class="switch"><span><span class="switch__title">Send a reminder</span><span class="switch__text">The day before, at 9:00 am.</span></span><input class="switch__control" type="checkbox" role="switch" checked></label>
  </fieldset>
  <div class="form-actions">
    <button class="btn btn--quiet" type="button">Save draft</button>
    <button class="btn btn--primary" type="submit">Publish gathering</button>
  </div>
</form>
```

For a long task, split the work into steps with a [stepper](../components/stepper.html) above the form and
keep one primary action per step: **Continue**, then **Create project** on the last one.

## States

A form moves through **default → invalid → submitting → saved**, or **failed** with everything kept.

- **Default:** no errors are shown before a person has answered. Required fields are the norm; mark the
  exceptions *(optional)*.
- **Invalid:** validate a field when the person leaves it, and re-check it as they type once it has shown an
  error, so the message disappears the moment it is fixed. On submit, show the summary and move focus to it.
- **Submitting:** the primary button keeps its width, adds a spinner and says what is happening
  (**Saving…**). Fields stay readable; Cancel stays available until the request is sent.
- **Saved:** a [toast](notifications.html) confirms a change on the same page; a new screen confirms a
  created object by showing it.
- **Failed:** say what happened, keep every answer, and offer **Try again**.

### Invalid, after submit

```html
<form class="form" action="#" novalidate aria-label="Join {{app}}">
  <div class="form-summary" role="alert" tabindex="-1">
    <p class="form-summary__title"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg>Check 2 answers before continuing</p>
    <ul>
      <li><a href="#fi-email">Enter an email address like name@example.com</a></li>
      <li><a href="#fi-password">Use at least 12 characters (you have 7)</a></li>
    </ul>
  </div>
  <div class="field">
    <label class="field__label" for="fi-name">Full name</label>
    <input class="input" id="fi-name" name="name" type="text" value="Amara Osei" autocomplete="name">
  </div>
  <div class="field">
    <label class="field__label" for="fi-email">Email</label>
    <input class="input" id="fi-email" name="email" type="email" value="amara@" aria-invalid="true" aria-describedby="fi-email-err" autocomplete="email">
    <p class="field__error" id="fi-email-err"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><span>Enter an email address like name@example.com</span></p>
  </div>
  <div class="field">
    <label class="field__label" for="fi-password">Password</label>
    <input class="input" id="fi-password" name="password" type="password" value="harbour" aria-invalid="true" aria-describedby="fi-password-help fi-password-err" autocomplete="new-password">
    <p class="field__help" id="fi-password-help">At least 12 characters. A short sentence is easy to remember.</p>
    <p class="field__error" id="fi-password-err"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><span>Use at least 12 characters (you have 7)</span></p>
  </div>
  <div class="form-actions"><button class="btn btn--primary" type="submit">Create account</button></div>
</form>
```

### Submitting

```html
<form class="form" action="#" novalidate aria-label="Rename notebook" aria-busy="true">
  <div class="field">
    <label class="field__label" for="fb-name">Notebook name</label>
    <input class="input" id="fb-name" name="name" type="text" value="Harbour Notes" readonly>
  </div>
  <div class="form-actions">
    <button class="btn btn--quiet" type="button">Cancel</button>
    <button class="btn btn--primary" type="submit" aria-busy="true"><span class="spinner" aria-hidden="true"></span>Saving…</button>
  </div>
</form>
```

### Failed, with answers kept

```html
<form class="form" action="#" novalidate aria-label="Leave a note">
  <div class="alert alert--danger" role="alert">
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg>
    <p class="alert__title">Your note wasn't saved</p>
    <p class="alert__body">The connection dropped. Your words are still here, so nothing is lost.</p>
  </div>
  <div class="field">
    <label class="field__label" for="ff-note">Note for Daniel</label>
    <textarea class="textarea" id="ff-note" name="note" rows="3">Thanks for the Northwind timeline. Could we move the review to Thursday?</textarea>
  </div>
  <div class="form-actions">
    <button class="btn btn--quiet" type="button">Cancel</button>
    <button class="btn btn--primary" type="submit">Try again</button>
  </div>
</form>
```

## Responsive

- **360px:** one column. Every field, row and action stacks; the primary action may become `btn--block` at
  the end of the form. Keep labels above inputs, never beside them.
- **768px:** `.field-row` pairs short, related answers side by side. A description textarea stays full width.
- **1024px and up:** keep forms to a readable measure (`.narrow`, about 40rem) even on a wide screen, and let
  a summary or help card sit in the side column of a `.two-col` layout.

`.form-card` pads more generously from 640px. Long labels, help and error text wrap; nothing truncates.

## Accessibility

**Labels:** every control has a visible `<label for>`, or a `fieldset` with a `legend` for a group of
radios, checkboxes or switches. Placeholder text is never the label.

**Help and errors:** connect both with `aria-describedby` (help first, then the error). Set
`aria-invalid="true"` only on fields that are actually wrong, and only after the person has answered or
submitted.

**Error summary:** on a failed submit, focus the summary (`tabindex="-1"`, `role="alert"`). Each item is a
link to its field, with the same words as the inline error.

**Busy:** while submitting, set `aria-busy="true"` on the form and on the pressed button; keep its label so
screen readers still announce **Saving…** rather than an unnamed spinner. Don't disable every field.

**Keyboard:** native tab order follows the visual order. Enter submits from a single-line field; never
submit on change of a select.

**Autocomplete:** use `autocomplete` tokens (`name`, `email`, `new-password`) and the right `type` so phones
show the right keyboard.

## Content

- **Labels** are short nouns in sentence case: Full name, Email, Project name. No colons, no "Please enter".
- **Help** answers the question a person is about to ask: who sees this, how long it can be, what format.
  "Everyone on Northwind can see this."
- **Errors** say what to do, not what went wrong: "Enter a date after today", not "Invalid date". Never
  blame: avoid "You forgot" and "wrong".
- **Optional** fields say *(optional)*; required is the default and needs no asterisk.
- **Buttons** name the result: **Create project**, **Save changes**, **Send invitation**. Not "Submit".

## Do and don't

### Do
Link each summary item to its field, using the same words as the inline error.
```html
<div class="form">
  <div class="form-summary" role="alert" tabindex="-1">
    <p class="form-summary__title">Check 1 answer before saving</p>
    <ul><li><a href="#dd-date">Choose a date after today</a></li></ul>
  </div>
  <div class="field">
    <label class="field__label" for="dd-date">Date</label>
    <input class="input" id="dd-date" type="date" value="2026-10-02" aria-invalid="true" aria-describedby="dd-date-err">
    <p class="field__error" id="dd-date-err">Choose a date after today</p>
  </div>
</div>
```

### Don't
Mark fields as invalid before anyone has typed in them.
```html
<div class="field">
  <label class="field__label" for="dn-email">Email</label>
  <input class="input" id="dn-email" type="email" aria-invalid="true" aria-describedby="dn-email-err">
  <p class="field__error" id="dn-email-err">This field is required</p>
</div>
```

### Do
Keep the label visible above the field, with help underneath it.
```html
<div class="field">
  <label class="field__label" for="dl-title">Notebook name</label>
  <input class="input" id="dl-title" type="text" value="Harbour Notes" aria-describedby="dl-title-help">
  <p class="field__help" id="dl-title-help">Shown to everyone you share it with.</p>
</div>
```

### Don't
Use placeholder text as the only label; it disappears as soon as someone types.
```html
<input class="input" type="text" placeholder="Notebook name" aria-label="Notebook name">
```

### Do
Put the safe action first and keep one primary action.
```html
<div class="form-actions"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="submit">Save changes</button></div>
```

### Don't
Clear the form after a failed save.
```html
<div class="form">
  <div class="alert alert--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><p class="alert__title">Something went wrong. Please fill in the form again.</p></div>
  <div class="field"><label class="field__label" for="dc-note">Note for Daniel</label><textarea class="textarea" id="dc-note" rows="2"></textarea></div>
</div>
```
