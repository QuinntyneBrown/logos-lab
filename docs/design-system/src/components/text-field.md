---
title: Text field
tier: core
order: 21
summary: A single line of typed answer, from a project name to a password, plus the signature search pill.
selector: .input, .search
target: input
states: default, hover, focus, disabled, read-only, invalid
sizes: sm, md, lg
size-class: input--{size}
error: Enter a project name.
matrix-variants: text, password, number, prefix, search
knobs: --ll-field-border = `--color-border-strong`; hover `--color-fg-muted`; invalid `--color-danger-solid`
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-border-strong|--color-bg-surface|3; --color-danger-solid|--color-bg-surface|3; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a text field for a short, single-line answer: a name, an email address, a number, a link. Use a
[textarea](textarea.html) when the answer is a sentence or more, a [select](select.html) when there is a
short fixed list, and a [slider](slider.html) only when an approximate value is fine. Every text field sits
in a [form field](form-field.html) with a visible label. The **search pill** is the one exception: it
lives in toolbars and heroes with a visually hidden label and its action inside the pill.

## Anatomy

1. **Label** — from the surrounding `.field`; always present, visible except in the search pill.
2. **Container** — `.input`: a 52px rounded rectangle with a hairline strong border on the surface.
3. **Value or placeholder** — body text; the placeholder is a subtle example, never instructions.
4. **Addon** — optional `.input-group__addon` before or after the input for a unit or a fixed prefix.
5. **Trailing action** — optional quiet button in an `.input-group`: Show password, Add, Send invite.

```html
<div class="field"><label class="field__label" for="anat-hours">Weekly hours</label><div class="input-group"><input class="input" id="anat-hours" name="hours" type="number" inputmode="numeric" min="0" max="60" value="12"><span class="input-group__addon">hours a week</span></div></div>
```

## Variants

### text
The default single-line answer.
```html
<div class="field"><label class="field__label" for="tf-name">Project name</label><input class="input" id="tf-name" name="project-name" type="text" value="Northwind" autocomplete="off"></div>
```

### email
Use `type="email"` and `autocomplete` so phones show the right keyboard and browsers can fill it.
```html
<div class="field"><label class="field__label" for="tf-email">Email address</label><input class="input" id="tf-email" name="email" type="email" autocomplete="email" placeholder="amara@example.com" aria-describedby="tf-email-help"><p class="field__help" id="tf-email-help">We send meeting notes from Harbour Notes here.</p></div>
```

### password
A separate, labelled button shows the password. Never disable paste or the password manager.
```html
<div class="field"><label class="field__label" for="tf-password">Password</label><div class="input-group"><input class="input" id="tf-password" name="password" type="password" value="field-day-2026" autocomplete="current-password"><button class="btn btn--quiet" type="button" data-password-toggle>Show password</button></div></div>
```

### number
A unit sits after the value as an addon, outside the input, so it is never typed or lost.
```html
<div class="field"><label class="field__label" for="tf-hours">Weekly hours</label><div class="input-group"><input class="input" id="tf-hours" name="hours" type="number" inputmode="numeric" min="0" max="60" value="12" aria-describedby="tf-hours-unit"><span class="input-group__addon" id="tf-hours-unit">hours a week</span></div></div>
```

### prefix
A fixed prefix before the value, for addresses and handles.
```html
<div class="field"><label class="field__label" for="tf-url">Public link</label><div class="input-group"><span class="input-group__addon" id="tf-url-prefix">harbournotes.app/</span><input class="input" id="tf-url" name="slug" type="text" value="northwind" autocomplete="off" aria-describedby="tf-url-prefix"></div></div>
```

### with action
An input and the quiet button that acts on it, such as adding a person by email.
```html
<div class="field"><label class="field__label" for="tf-invite">Invite by email</label><div class="input-group"><input class="input" id="tf-invite" name="invite" type="email" autocomplete="off" placeholder="daniel.reyes@example.com"><button class="btn btn--quiet" type="button">Send invite</button></div></div>
```

### counter
A short answer with a soft limit and a live count.
```html
<div class="field"><label class="field__label" for="tf-status">Status message</label><input class="input" id="tf-status" name="status" type="text" value="Planning Field Day" aria-describedby="tf-status-count"><p class="field__counter" id="tf-status-count">18 / 80</p></div>
```

### search
The signature pill: a leading icon, a hidden label and the action inside. Use `type="search"`.
```html
<form class="search" role="search" action="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.5-4.5"/></svg><label class="vh" for="tf-search">Search notes and people</label><input class="search__input" id="tf-search" name="q" type="search" placeholder="Search notes and people"><button class="btn btn--primary" type="submit">Search</button></form>
```

## Sizes

`lg` (52px) is the default and the size for every form. `md` (44px) suits filters, toolbars and dialogs
with several short fields; `sm` (36px) is only for dense table rows and inline edits on desktop. Keep one
size per form. The search pill is one size: 44px controls inside a pill.

## States

Hover darkens the border to the muted role. Focus draws the 2px sage ring offset 3px. Read-only fills
with linen, softens the border and keeps full-strength text that can still be selected and is submitted.
Disabled also fills with linen but drops the border and fades the text; it is skipped by the form, so
prefer read-only to show a fixed value. Invalid turns
the border to danger, tints the fill and adds an error message linked by `aria-describedby`.

### password / invalid
```html
<div class="field"><label class="field__label" for="st-password">Password</label><div class="input-group"><input class="input" id="st-password" name="password" type="password" value="field" autocomplete="new-password" aria-invalid="true" aria-describedby="st-password-error"><button class="btn btn--quiet" type="button" data-password-toggle>Show password</button></div><p class="field__error" id="st-password-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Use at least 12 characters.</p></div>
```

### number / invalid
```html
<div class="field"><label class="field__label" for="st-hours">Weekly hours</label><div class="input-group"><input class="input" id="st-hours" name="hours" type="number" inputmode="numeric" min="0" max="60" value="72" aria-invalid="true" aria-describedby="st-hours-unit st-hours-error"><span class="input-group__addon" id="st-hours-unit">hours a week</span></div><p class="field__error" id="st-hours-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Enter a number from 0 to 60.</p></div>
```

### prefix / invalid
```html
<div class="field"><label class="field__label" for="st-url">Public link</label><div class="input-group"><span class="input-group__addon" id="st-url-prefix">harbournotes.app/</span><input class="input" id="st-url" name="slug" type="text" value="north wind" autocomplete="off" aria-invalid="true" aria-describedby="st-url-prefix st-url-error"></div><p class="field__error" id="st-url-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Use letters, numbers and hyphens only, like north-wind.</p></div>
```

### search / invalid
```html
<div class="field"><form class="search" role="search" action="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.5-4.5"/></svg><label class="vh" for="st-search">Search notes and people</label><input class="search__input" id="st-search" name="q" type="search" value="N" aria-invalid="true" aria-describedby="st-search-error"><button class="btn btn--primary" type="submit">Search</button></form><p class="field__error" id="st-search-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Type at least two letters to search.</p></div>
```

## Responsive

Text fields fill their column at every width. In an `.input-group`, the input shrinks and the addon or
button keeps its natural width; on a 360px screen, keep addons to a short unit and buttons to one or two
words. The search pill caps at `--layout-narrow` (44rem) and keeps its button inside the pill at every width.

## Accessibility

**Role:** native `<input>` with the right `type` (`text`, `email`, `password`, `number`, `url`, `search`)
and `autocomplete` token. The search pill is a `<form role="search">`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves into and out of the field, then to any trailing button. |
| Arrow keys, Home, End | Move the caret; in a number field, Up and Down change the value by one step. |
| Enter | Submits the surrounding form; in the search pill it runs the search. |
| Escape | In a search field, clears the query. Never clears any other field. |

**Focus:** the ring sits on the input itself, or around the whole pill for search. Never move focus on its
own while someone types.

**Labelling:** a visible `<label for>` for every field; the search pill uses a `.vh` label that matches
its placeholder. Units and prefixes are linked with `aria-describedby` so they are read with the value. The
password toggle is a separate button whose label says what it will do: Show password, Hide password.

**Motion:** border and fill changes take 240ms and disappear under reduced motion.

**Touch:** 52px tall by default and never below 36px. Set `inputmode` and `type` so phones offer the
right keyboard, and do not block zoom.

## Content

- Label the thing, not the action: **Email address**, not "Enter your email".
- Placeholders show a real example in the expected format (amara@example.com), never instructions and
  never the label repeated.
- Units belong in an addon: **hours a week**, **km**, **harbournotes.app/**, so the value stays a plain number or slug.
- Errors name the fix: "Use at least 12 characters", "Enter a number from 0 to 60".

## Do and don't

### Do
Put the unit outside the value, as an addon.
```html
<div class="field"><label class="field__label" for="dd-length">Meeting length</label><div class="input-group"><input class="input" id="dd-length" name="length" type="number" inputmode="numeric" value="45"><span class="input-group__addon">minutes</span></div></div>
```

### Don't
A unit typed into the value cannot be validated or sorted.
```html
<div class="field"><label class="field__label" for="dd-length-bad">Meeting length</label><input class="input" id="dd-length-bad" name="length" type="text" value="45 minutes"></div>
```

### Do
Use the right type and autocomplete so browsers fill it and phones show the right keyboard.
```html
<div class="field"><label class="field__label" for="dd-mail">Email address</label><input class="input" id="dd-mail" name="email" type="email" autocomplete="email" value="grace.liu@example.com"></div>
```

### Don't
Instructions in the placeholder vanish while typing and fail contrast as a label.
```html
<div class="field"><label class="field__label" for="dd-mail-bad">Email</label><input class="input" id="dd-mail-bad" name="email" type="text" placeholder="Please type your work email here"></div>
```

## Tokens

Text fields read the surface, default and subtle text roles, the strong border (darkening to muted on
hover), the danger roles for invalid, the control heights and the medium radius. Override
`--ll-field-border` to tint a single field without a new class.

## Code

Use `.input` inside a `.field`; add `.input--md` or `.input--sm` only in dense layouts. Wrap an input and its
addon or button in `.input-group`. The search pill is `form.search` with a `.search__input` and a `.vh` label.
