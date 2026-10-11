---
title: Inline message
tier: core
order: 62
summary: One short line beside the thing it is about — Saving…, All changes saved, Couldn't save. The smallest piece of feedback.
selector: .inline-status
layout: inline
target: .inline-status
states: default
contrast: --color-fg-muted|--color-bg-surface|4.5; --color-success-fg|--color-bg-surface|4.5; --color-warning-fg|--color-bg-surface|4.5; --color-danger-fg|--color-bg-surface|4.5
---

## Overview

Use an inline message for a one-line status next to the control or content it describes: the save state
in an editor toolbar, the result of a "Check availability" button, sync status under a list. It is quieter
than an [alert](alert.html) and does not leave like a [toast](toast.html). Field-level validation errors
use the field's own error text in [form field](form-field.html); a whole-page problem uses an alert.

## Anatomy

1. **Indicator** — a 16px icon or a small [spinner](spinner.html), coloured with the text.
2. **Message** — one short sentence in `--text-body-sm`.
3. **Action** — optional: a text button that fixes the problem, such as Try again.

```html
<p class="inline-status inline-status--success" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>All changes saved</p>
```

## Variants

### neutral
Quiet facts: when it was last saved, who is editing.
```html
<p class="inline-status" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>Saved 2 minutes ago</p>
```

### saving
While a save or check is under way. The spinner repeats the words; it never replaces them.
```html
<p class="inline-status" role="status"><span class="spinner" aria-hidden="true"></span>Saving…</p>
```

### success
The thing worked. Replace it with the neutral time after a few seconds.
```html
<p class="inline-status inline-status--success" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>All changes saved</p>
```

### warning
Something is pending but safe.
```html
<p class="inline-status inline-status--warning" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3.5 19h17z"/><path d="M12 10v4M12 16.5h.01"/></svg>Offline — changes will sync when you reconnect</p>
```

### danger
It failed. Say what is safe.
```html
<p class="inline-status inline-status--danger" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg>Couldn't save. Your text is still here.</p>
```

### with action
A failure with the fix right beside it.
```html
<div class="cluster"><p class="inline-status inline-status--danger" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg>Couldn't save the agenda.</p><button class="btn btn--text btn--sm" type="button">Try again</button></div>
```

### beside a button
The result of an action appears next to the button that caused it.
```html
<div class="cluster"><button class="btn btn--quiet btn--sm" type="button">Check the name</button><p class="inline-status inline-status--success" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>northwind is available</p></div>
```

## Sizes

N/A: one size, matching small body text so it sits on the same line as a `btn--sm` or a toolbar.

## States

An inline message has no interactive states. It moves through its variants as the thing it describes
changes: neutral → saving → success, then back to neutral after about 4 seconds; or saving → danger,
which stays until the next attempt. Keep it in the same place so the text changes and nothing jumps.

## Responsive

The message wraps onto two lines at 360px; keep it short enough that it rarely does. Beside a button it
wraps under the button. It never truncates with an ellipsis, because the ending is often the important part.

## Theming

Text and icon share one role per tone — `--color-fg-muted`, `--color-success-fg`, `--color-warning-fg`
or `--color-danger-fg` — each with its own dark value.

## Accessibility

**Role:** render the element once, empty, with `role="status"`, then change its text, so screen readers
announce each update politely. Do not use `role="alert"` for save status; it interrupts typing.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Skips the message; reaches the action button if there is one. |
| Enter, Space | Activates the action. |

**Focus:** never move focus to an inline message.

**Labelling:** the text is the message; icons and spinners are `aria-hidden`. Do not announce every
keystroke save — debounce to one "Saving…" and one result.

**Motion:** the spinner turns while saving and stops under reduced motion; the words remain.

**Touch:** an action beside the message keeps a 36px button.

## Content

Use a few words, sentence case, no exclamation marks: **Saving…**, **All changes saved**, **Saved 2
minutes ago**. Failures say what is safe: **Couldn't save. Your text is still here.** Use the ellipsis
character for ongoing work and a full stop only when there are two sentences.

## Do and don't

### Do
Say the result in words next to the control.
```html
<p class="inline-status inline-status--success" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Saved to Harbour Notes</p>
```

### Don't
An icon with no words is a puzzle.
```html
<p class="inline-status inline-status--success"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></p>
```

### Do
Calm, specific failure text.
```html
<p class="inline-status inline-status--danger" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg>Couldn't save. Your text is still here.</p>
```

### Don't
Shouting and blame make a small problem feel big.
```html
<p class="inline-status inline-status--danger" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg>ERROR: YOU ARE OFFLINE!</p>
```

## Tokens

Inline messages read the muted, success, warning and danger text roles, `--text-body-sm`, and the small
icon size.

## Code

Use `<p class="inline-status" role="status">` and swap the tone modifier and text as the state changes.
Put a `.spinner` first while working, or an `.icon.icon--sm` for a result.
