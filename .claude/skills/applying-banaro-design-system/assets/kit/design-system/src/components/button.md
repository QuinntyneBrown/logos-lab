---
title: Button
tier: core
order: 10
summary: Trigger one action. A sage pill marks the one thing that matters; everything else stays quiet.
selector: .btn, .icon-btn
layout: inline
target: button, a
states: default, hover, focus, active, disabled, loading, pressed
sizes: sm, md, lg
size-class: btn--{size}
apg: button
knobs: --bn-button-bg = `--color-bg-surface`; primary `--color-accent`; danger `--color-danger-solid`; quiet, ghost and text are transparent; --bn-button-fg = `--color-fg-default`; primary `--color-fg-on-accent`; text `--color-fg-link`
contrast: --color-fg-on-accent|--color-accent|4.5; --color-fg-default|--color-bg-surface|4.5; --color-fg-on-danger|--color-danger-solid|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a button to do something: save, send, invite, confirm. Use a [link](link.html) to go somewhere.
Keep **one primary button** in each group of actions — the sage pill is the single thing a person should
notice first. Secondary actions are quiet outlined pills; the least important actions are text buttons.

## Anatomy

1. **Leading icon** — optional, decorative (`aria-hidden="true"`), 20px line icon.
2. **Label** — a verb and an object in sentence case: Save changes, Invite Grace.
3. **Container** — a fully rounded pill, 44px tall at the default size, with the shared 2px focus ring offset 3px.

```html
<button class="btn btn--primary" type="button"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>New project</button>
```

## Variants

### primary
For the one action that moves the task forward.
```html
<button class="btn btn--primary" type="button">Save changes</button>
```

### secondary
The default surface button for a second, equal-weight action.
```html
<button class="btn" type="button">Preview</button>
```

### quiet
An outlined pill beside a primary action: Cancel, Back, Skip.
```html
<button class="btn btn--quiet" type="button">Cancel</button>
```

### ghost
No border; for toolbars and dense rows.
```html
<button class="btn btn--ghost" type="button">Duplicate</button>
```

### text
Reads like a link but performs an action.
```html
<button class="btn btn--text" type="button">Clear all</button>
```

### danger
Only for a confirmed, destructive action — usually inside a confirmation dialog.
```html
<button class="btn btn--danger" type="button">Delete project</button>
```

### trailing arrow
For "continue" moments; the arrow nudges on hover.
```html
<a class="btn btn--primary" href="#">Get started <svg class="btn__arrow icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></a>
```

### icon only
A round icon button needs an `aria-label`. Use `.icon-btn` in bars, dialogs and toasts.
```html
<button class="icon-btn" type="button" aria-label="Edit project"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg></button>
```

### block
Full width, for narrow forms and mobile sheets.
```html
<button class="btn btn--primary btn--block" type="button">Continue</button>
```

## Sizes

`sm` (36px) for dense rows and toolbars, `md` (44px, default) for most actions, `lg` (52px) for the hero and
sign-in. Touch targets never drop below 24px; mobile primary actions use `md` or larger.

## States

Hover darkens the fill (primary) or adds a linen wash (others); active presses 2px down; focus shows the
sage ring. A busy button keeps its label and width, adds a spinner and sets `aria-busy="true"`. Disabled
buttons use the linen surface and the disabled text role. Toggle buttons announce `aria-pressed`.

### primary / loading
```html
<button class="btn btn--primary" type="button" aria-busy="true"><span class="spinner" aria-hidden="true"></span>Saving…</button>
```

## Responsive

Buttons keep their label on every width and wrap inside a `.form-actions` or `.cluster` row instead of
shrinking. Below 40rem, the primary action of a form or sheet may become `btn--block`. Icon-only buttons
keep a 44px target at every width.

## Theming

Every colour reads a semantic role. In dark mode the primary pill turns light sage with near-black text;
focus rings follow `--color-focus-ring`. Component knobs `--bn-button-bg` and `--bn-button-fg` let a
product tint a button without new classes.

## Accessibility

**Role:** a native `<button type="button">` (or `type="submit"` inside a form). A link styled as a button stays an `<a href>`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves focus to and from the button. |
| Enter, Space | Activates it. Links styled as buttons activate with Enter only. |

**Focus:** the 2px `--color-focus-ring` outline, offset 3px, is always visible on keyboard focus.

**Labelling:** icon-only buttons need `aria-label`; a busy button keeps its accessible name and sets `aria-busy`.
Toggle buttons use `aria-pressed`, never a changing label.

**Motion:** colour transitions take 240–420ms; the 1px lift and arrow nudge disappear under reduced motion.

**Touch:** 44px tall by default; never smaller than the 24px minimum target.

## Content

Start with a verb, name the object, use sentence case: **Save changes**, **Invite Grace**, **Delete project**.
Avoid "OK", "Submit" and "Click here". Keep labels to three words where you can; never end with punctuation.

## Do and don't

### Do
One primary action, with a quiet Cancel beside it.
```html
<div class="form-actions"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="button">Save changes</button></div>
```

### Don't
Two sage pills side by side compete for attention.
```html
<div class="form-actions"><button class="btn btn--primary" type="button">Save draft</button><button class="btn btn--primary" type="button">Publish</button></div>
```

### Do
Name the object of a destructive action.
```html
<button class="btn btn--danger" type="button">Delete project</button>
```

### Don't
A vague label hides the consequence.
```html
<button class="btn btn--danger" type="button">OK</button>
```

## Tokens

Buttons read the accent, surface, danger and focus roles plus the control-height and radius scales.

## Code

Use `.btn` with one modifier. Add `.btn--sm` or `.btn--lg` for size, `.btn--block` for full width, and put a
`.spinner` first while busy.
