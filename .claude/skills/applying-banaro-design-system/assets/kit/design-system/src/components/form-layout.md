---
title: Form layout
tier: core
order: 29
summary: Arrange fields into a calm, single-column form — sections, side-by-side pairs, an error summary and one clear submit action.
selector: .form, .form-card, .form-actions, .form-summary
target: button[type="submit"]
states: default, submitting, invalid, saved
matrix-variants: stacked
contrast: --color-fg-default|--color-bg-surface|4.5; --color-danger-fg|--color-danger-bg|4.5; --color-success-fg|--color-bg-surface|4.5; --color-fg-on-accent|--color-accent|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

Form layout is how [form fields](form-field.html) become a form: one column, generous 24px gaps, related
questions grouped into sections, and a single row of actions at the end. Use `.form` for a plain stack (in
a page or a [dialog](dialog.html)), `.form-card` to set a long form on its own surface with sections, and
`.form-inline` for a one-line form such as inviting a person. When a submit fails, put a `.form-summary` at
the top that links to every problem.

## Anatomy

1. **Form** — `.form`: a grid with 24px between fields. `.form-card` adds a surface, hairline and padding.
2. **Section** — `fieldset.form-section` with a `legend.form-section__title`, for a group of related questions.
3. **Field row** — `.field-row`: two short fields side by side from 48rem.
4. **Error summary** — `.form-summary`: a danger panel listing each problem as a link to its field.
5. **Actions** — `.form-actions`: the submit button and its quiet alternative; `--end` aligns them right.

```html
<form class="form" action="#" novalidate><div class="form-summary" role="alert" tabindex="-1" aria-labelledby="anat-summary-title"><p class="form-summary__title" id="anat-summary-title"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Fix one problem to continue</p><ul><li><a href="#anat-name">Enter a project name</a></li></ul></div><div class="field"><label class="field__label" for="anat-name">Project name</label><input class="input" id="anat-name" name="project-name" type="text" aria-invalid="true" aria-describedby="anat-name-error"><p class="field__error" id="anat-name-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Enter a project name.</p></div><div class="form-actions"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="submit">Create project</button></div></form>
```

## Variants

### stacked
The default: one column of fields with the actions at the end. The primary action is last.
```html
<form class="form" action="#"><div class="field"><label class="field__label" for="fl-name">Project name</label><input class="input" id="fl-name" name="project-name" type="text" value="Northwind" autocomplete="off"></div><div class="field"><label class="field__label" for="fl-lead">Project lead</label><span class="select__wrap"><select class="select__control" id="fl-lead" name="lead"><option selected>Amara Osei</option><option>Daniel Reyes</option><option>Grace Liu</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></div><div class="form-actions"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="submit">Create project</button></div></form>
```

### card with sections
A long form on its own surface, split into titled sections.
```html
<form class="form-card" action="#"><fieldset class="form-section"><legend class="form-section__title">About Field Day</legend><div class="field"><label class="field__label" for="fl-title">Gathering name</label><input class="input" id="fl-title" name="title" type="text" value="Field Day"></div><div class="field-row"><div class="field"><label class="field__label" for="fl-date">Date</label><input class="input" id="fl-date" name="date" type="date" value="2026-10-17"></div><div class="field"><label class="field__label" for="fl-time">Start time</label><input class="input" id="fl-time" name="time" type="time" value="10:00"></div></div></fieldset><fieldset class="form-section"><legend class="form-section__title">Who can join</legend><div class="choices choices--plain"><label class="choice"><input type="radio" name="fl-who" value="team" checked><span class="choice__title">Northwind team</span></label><label class="choice"><input type="radio" name="fl-who" value="guests"><span class="choice__title">Team and invited guests</span></label></div></fieldset><div class="form-actions form-actions--end"><button class="btn btn--quiet" type="button">Save draft</button><button class="btn btn--primary" type="submit">Publish gathering</button></div></form>
```

### inline
`.form-inline` puts a short form on one line and wraps it on narrow screens.
```html
<form class="form-inline" action="#"><div class="field"><label class="field__label" for="fl-invite">Invite by email</label><input class="input" id="fl-invite" name="invite" type="email" autocomplete="off" placeholder="hannah.kowalski@example.com"></div><div class="field"><label class="field__label" for="fl-role">Role</label><span class="select__wrap"><select class="select__control" id="fl-role" name="role"><option selected>Can edit</option><option>Can comment</option><option>Can view</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></div><button class="btn btn--primary btn--lg" type="submit">Send invite</button></form>
```

### error summary
After a failed submit: the summary first, each field keeps its answer and shows its own error.
```html
<form class="form" action="#" novalidate><div class="form-summary" role="alert" tabindex="-1" aria-labelledby="fl-err-title"><p class="form-summary__title" id="fl-err-title"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Fix 2 problems to continue</p><ul><li><a href="#fl-err-email">Enter an email address like grace.liu@example.com</a></li><li><a href="#fl-err-msg">Write a message so Grace knows why you are inviting her</a></li></ul></div><div class="field"><label class="field__label" for="fl-err-email">Email address</label><input class="input" id="fl-err-email" name="email" type="email" value="grace.liu@" aria-invalid="true" aria-describedby="fl-err-email-error"><p class="field__error" id="fl-err-email-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Enter an email address like grace.liu@example.com.</p></div><div class="field"><label class="field__label" for="fl-err-msg">Message</label><textarea class="textarea" id="fl-err-msg" name="message" rows="3" aria-invalid="true" aria-describedby="fl-err-msg-error"></textarea><p class="field__error" id="fl-err-msg-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Write a message so Grace knows why you are inviting her.</p></div><div class="form-actions"><button class="btn btn--primary" type="submit">Send invitation</button></div></form>
```

## Sizes

N/A: Forms take the width of their container, capped at the 44rem narrow measure on wide pages. Spacing is fixed: 24px between fields, 32px between sections, 40px of card padding from 40rem.

## States

A submitting form keeps every answer visible, sets the submit button busy with a spinner and a present-tense
label ("Creating project…"), and keeps Cancel available. An invalid form shows the error summary at the top,
moves focus to it and marks each field with its own message; answers are never cleared. A saved form
confirms next to the actions with a success message, or moves on to the next page.

### stacked / submitting
```html
<form class="form" action="#"><div class="field"><label class="field__label" for="st-sub-name">Project name</label><input class="input" id="st-sub-name" name="project-name" type="text" value="Northwind"></div><div class="field"><label class="field__label" for="st-sub-lead">Project lead</label><span class="select__wrap"><select class="select__control" id="st-sub-lead" name="lead"><option selected>Amara Osei</option><option>Daniel Reyes</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></div><div class="form-actions"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="submit" aria-busy="true"><span class="spinner" aria-hidden="true"></span>Creating project…</button></div></form>
```

### stacked / invalid
```html
<form class="form" action="#" novalidate><div class="form-summary" role="alert" tabindex="-1" aria-labelledby="st-inv-title"><p class="form-summary__title" id="st-inv-title"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Fix one problem to continue</p><ul><li><a href="#st-inv-name">Enter a project name</a></li></ul></div><div class="field"><label class="field__label" for="st-inv-name">Project name</label><input class="input" id="st-inv-name" name="project-name" type="text" aria-invalid="true" aria-describedby="st-inv-name-error"><p class="field__error" id="st-inv-name-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Enter a project name.</p></div><div class="field"><label class="field__label" for="st-inv-lead">Project lead</label><span class="select__wrap"><select class="select__control" id="st-inv-lead" name="lead"><option selected>Amara Osei</option><option>Daniel Reyes</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></div><div class="form-actions"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="submit">Create project</button></div></form>
```

### stacked / saved
```html
<form class="form" action="#"><div class="field"><label class="field__label" for="st-ok-name">Project name</label><input class="input" id="st-ok-name" name="project-name" type="text" value="Northwind"></div><div class="field"><label class="field__label" for="st-ok-lead">Project lead</label><span class="select__wrap"><select class="select__control" id="st-ok-lead" name="lead"><option selected>Amara Osei</option><option>Daniel Reyes</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></div><div class="form-actions"><button class="btn btn--primary" type="submit">Save changes</button><p class="inline-status inline-status--success" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Changes saved</p></div></form>
```

## Responsive

Forms are one column at every width; only `.field-row` pairs short fields from 48rem. `.form-card` padding
grows from 24px to 40px at 40rem. `.form-inline` wraps its fields and button onto new lines when there is no
room. On phones, `.form-actions` wraps and the primary button may become `btn--block` at the bottom of a
sheet or dialog.

## Accessibility

**Role:** a native `<form>`; give it an accessible name (`aria-label` or `aria-labelledby` the page heading)
when a page has more than one. Sections are `fieldset` / `legend`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves through fields in visual order, then to the actions. |
| Enter | In a single-line field, submits the form through its submit button. |
| Activating a summary link | Moves focus to the field with the problem. |

**Focus:** after a failed submit, focus moves to the error summary (`tabindex="-1"`, `role="alert"`); its
links move focus to each field. After success, focus moves to the confirmation or the next page's heading.
Never move focus while someone is typing.

**Labelling:** every field has a visible label; the summary lists the same messages as the fields, each as a
link to its control. A busy submit button keeps its accessible name and sets `aria-busy="true"`.

**Motion:** nothing animates except the button spinner, which stops under reduced motion.

**Touch:** actions keep 44px targets with a 12px gap; the primary action never sits next to a destructive one.

## Content

- Ask only what you need, in the order people think about it.
- Section titles are short nouns: **About Field Day**, **Who can join**.
- The summary title counts the problems: **Fix 2 problems to continue**; each item repeats the field's error.
- The submit button names the outcome: **Create project**, **Send invitation**, **Publish gathering** —
  never "Submit". While busy: **Creating project…**. Afterwards: **Changes saved**.

## Do and don't

### Do
One column, so the eye travels straight down.
```html
<form class="form" action="#"><div class="field"><label class="field__label" for="dd-first">First name</label><input class="input" id="dd-first" name="given-name" type="text" autocomplete="given-name" value="Hannah"></div><div class="field"><label class="field__label" for="dd-team">Team</label><input class="input" id="dd-team" name="team" type="text" value="Northwind"></div></form>
```

### Don't
Unrelated questions side by side make people zig-zag and miss fields.
```html
<form class="form" action="#"><div class="field-row"><div class="field"><label class="field__label" for="dd-first-bad">First name</label><input class="input" id="dd-first-bad" name="given-name" type="text" value="Hannah"></div><div class="field"><label class="field__label" for="dd-bio-bad">Tell us about your work</label><textarea class="textarea" id="dd-bio-bad" name="bio" rows="3"></textarea></div></div></form>
```

### Do
Keep answers and link every problem from the summary to its field.
```html
<form class="form" action="#" novalidate><div class="form-summary" role="alert" tabindex="-1" aria-labelledby="dd-sum-title"><p class="form-summary__title" id="dd-sum-title"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Fix one problem to continue</p><ul><li><a href="#dd-sum-team">Enter a team name</a></li></ul></div><div class="field"><label class="field__label" for="dd-sum-team">Team name</label><input class="input" id="dd-sum-team" name="team" type="text" aria-invalid="true" aria-describedby="dd-sum-team-error"><p class="field__error" id="dd-sum-team-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Enter a team name.</p></div></form>
```

### Don't
A vague banner with no links leaves people hunting for the problem.
```html
<div class="form-summary" role="alert"><p class="form-summary__title">Something went wrong. Please check the form.</p></div>
```

## Tokens

Form layout reads the 24px (`--space-6`) field gap, 32px section gap, the extra-large card radius and
surface, the danger roles for the summary and the 12px action gap.

## Code

Use `form.form` (or `.form-card` with `fieldset.form-section`s) around your `.field`s, end with
`.form-actions`, and render `.form-summary` first when a submit fails, then focus it.
