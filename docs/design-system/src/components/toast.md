---
title: Toast
tier: core
order: 61
summary: Confirm that something just happened without taking people away from their work. Raised, brief, and in the corner.
selector: .toast
layout: block
target: .toast
states: default, leaving
contrast: --color-fg-default|--color-bg-surface-raised|4.5; --color-fg-muted|--color-bg-surface-raised|4.5; --color-success-icon|--color-bg-surface-raised|3; --color-danger-icon|--color-bg-surface-raised|3; --color-fg-link|--color-bg-surface-raised|4.5
---

## Overview

A toast confirms the result of something the person just did — Note saved, Invitation sent — and offers
at most one follow-up action, such as Undo. It appears in the bottom corner, above everything, and leaves
on its own. Use an [alert](alert.html) when the message must stay on the page, an
[inline message](inline-message.html) when it belongs to one field or button, and a [dialog](dialog.html)
when the person must decide something. Never use a toast for the only copy of important information.

## Anatomy

1. **Icon** — a 20px line icon in the tone's icon colour; decorative.
2. **Title** — the outcome in a few words, in `--text-label`.
3. **Body** — optional: one sentence of detail in muted text.
4. **Action** — optional: one text button, such as Undo or View.
5. **Dismiss** — a 32px icon button, last in reading order and top right on screen.
6. **Region** — `.toast-region`, the fixed stack in the bottom corner that holds every toast.

```html
<div class="toast toast--success" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><p class="toast__title">Note moved to Archive</p><p class="toast__body">Find it under Archive in Harbour Notes.</p><button class="btn btn--text btn--sm toast__action" type="button">Undo</button><button class="icon-btn toast__close" type="button" aria-label="Dismiss notification" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
```

## Variants

### info
Neutral news that follows an action. Leaves after 6 seconds.
```html
<div class="toast" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/></svg><p class="toast__title">Export started</p><p class="toast__body">We'll email the file to amara@northwind.example when it's ready.</p><button class="icon-btn toast__close" type="button" aria-label="Dismiss notification" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
```

### success
The most common toast: the thing you did worked.
```html
<div class="toast toast--success" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><p class="toast__title">Invitation sent to Grace Liu</p><p class="toast__body">Grace will get an email with a link to Northwind.</p><button class="icon-btn toast__close" type="button" aria-label="Dismiss notification" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
```

### warning
It worked, with a side effect people should know about.
```html
<div class="toast toast--warning" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3.5 19h17z"/><path d="M12 10v4M12 16.5h.01"/></svg><p class="toast__title">Saved without the photo</p><p class="toast__body">The file is larger than 10 MB. Add a smaller one from the note.</p><button class="icon-btn toast__close" type="button" aria-label="Dismiss notification" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
```

### danger
The action failed. Danger toasts stay until dismissed and offer a retry.
```html
<div class="toast toast--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><p class="toast__title">Comment not posted</p><p class="toast__body">Your comment is still in the box. Check your connection and try again.</p><button class="btn btn--text btn--sm toast__action" type="button">Try again</button><button class="icon-btn toast__close" type="button" aria-label="Dismiss notification" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
```

### with undo
A reversible action gets Undo, and the toast stays for 10 seconds so there is time to use it.
```html
<div class="toast toast--success" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><p class="toast__title">Task deleted</p><p class="toast__body">Venue booking was removed from Field Day.</p><button class="btn btn--text btn--sm toast__action" type="button">Undo</button><button class="icon-btn toast__close" type="button" aria-label="Dismiss notification" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
```

### title only
When the title says it all, leave the body out.
```html
<div class="toast toast--success" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><p class="toast__title">Link copied</p><button class="icon-btn toast__close" type="button" aria-label="Dismiss notification" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
```

### stacked
Several toasts in the region, newest at the bottom. Show at most three; older ones leave first.
```html
<div class="toast-region" role="region" aria-label="Notifications"><div class="toast toast--success" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><p class="toast__title">Message sent to Daniel Reyes</p><button class="btn btn--text btn--sm toast__action" type="button">View conversation</button><button class="icon-btn toast__close" type="button" aria-label="Dismiss notification" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div><div class="toast toast--warning" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3.5 19h17z"/><path d="M12 10v4M12 16.5h.01"/></svg><p class="toast__title">Reminder moved to Tuesday</p><p class="toast__body">Monday 12 October is a holiday for the team.</p><button class="icon-btn toast__close" type="button" aria-label="Dismiss notification" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div><div class="toast toast--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><p class="toast__title">We couldn't sync Harbour Notes</p><p class="toast__body">Your changes are kept on this device.</p><button class="btn btn--text btn--sm toast__action" type="button">Try again</button><button class="icon-btn toast__close" type="button" aria-label="Dismiss notification" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div></div>
```

## Sizes

N/A: one size. A toast is 24rem wide in the desktop region and full width (less the page margin) on
phones. It grows taller with its text; keep it to a title and one sentence.

## States

A toast **rises** in over 420ms when it arrives (reduced motion: it simply appears). While the pointer is
over it, or focus is inside it, the timer pauses. When it times out or is dismissed it is **leaving**: it
fades before it is removed, and the toasts below close the gap. Danger toasts have no timer. The action
and dismiss buttons follow the [button](button.html) states.

## Responsive

Below 768px the region spans the bottom of the screen, 16px from each edge and above the safe area, and
toasts take the full width. From 768px the region sits 24px from the bottom-right corner, 24rem wide.
Toasts never cover the mobile bottom navigation; lift the region above it.

## Theming

Toasts use `--color-bg-surface-raised` with `--shadow-3` so they float above both themes; in dark mode
the raised surface is a lighter charcoal than the page. Icons read the tone's `*-icon` role; danger also
tints the border.

## Accessibility

**Role:** keep one empty `.toast-region` in the page from the start, so new toasts inside it are
announced. Each toast is `role="status"` (polite); a danger toast is `role="alert"` (assertive). Do not
add `aria-live` to the region as well, or messages are read twice.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Reaches the action and the dismiss button in reading order; the timer pauses while focus is inside. |
| Enter, Space | Activates the action or dismisses the toast. |
| Escape | Dismisses the toast that has focus. |

**Focus:** a toast never takes focus when it appears. If the person is on the dismiss button when it
leaves, return focus to the control that caused it.

**Labelling:** the title and body are the message. Dismiss buttons say "Dismiss notification". Anything in
a toast must also be reachable elsewhere (Undo in the menu, the message in Sent), because a toast may
leave before someone can use it.

**Motion:** the 420ms rise and the fade on leaving disappear under reduced motion; timing is unchanged.

**Touch:** the action is 36px tall and the dismiss button keeps a 32px button inside a 44px target area.
Give people at least 6 seconds (10 with an action) before a toast leaves — WCAG 2.2.1.

## Content

The title is the outcome in the past tense and names the thing: **Invitation sent to Grace Liu**,
**Note moved to Archive**, **Comment not posted**. Add a body only when it says something new: where to
find it, what is safe, what to do. One action, named with a verb: **Undo**, **View conversation**,
**Try again**. No "Success!" or "Oops", and no exclamation marks.

## Do and don't

### Do
Name the thing and offer Undo for reversible actions.
```html
<div class="toast toast--success" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><p class="toast__title">Noah Fischer removed from Northwind</p><button class="btn btn--text btn--sm toast__action" type="button">Undo</button><button class="icon-btn toast__close" type="button" aria-label="Dismiss notification"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
```

### Don't
A generic message tells people nothing they can check.
```html
<div class="toast toast--success" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><p class="toast__title">Success!</p><p class="toast__body">The operation completed.</p><button class="icon-btn toast__close" type="button" aria-label="Dismiss notification"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
```

### Do
Keep a failure on screen until it is dismissed, with a retry.
```html
<div class="toast toast--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><p class="toast__title">File not uploaded</p><p class="toast__body">field-day-map.pdf is still on your device.</p><button class="btn btn--text btn--sm toast__action" type="button">Try again</button><button class="icon-btn toast__close" type="button" aria-label="Dismiss notification"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
```

### Don't
Two actions turn a toast into a dialog; ask in a dialog instead.
```html
<div class="toast toast--warning" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3.5 19h17z"/><path d="M12 10v4M12 16.5h.01"/></svg><p class="toast__title">Delete all archived notes?</p><div class="cluster toast__action"><button class="btn btn--danger btn--sm" type="button">Delete</button><button class="btn btn--quiet btn--sm" type="button">Keep</button></div><button class="icon-btn toast__close" type="button" aria-label="Dismiss notification"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
```

## Tokens

Toasts read `--color-bg-surface-raised`, `--shadow-3`, `--radius-lg`, the status icon roles,
`--size-toast-width` for the desktop region, `--z-toast`, and `--duration-slow` with `--ease-enter` for
the rise.

## Code

Render toasts into one `.toast-region` that is always in the page. Each `.toast` has an icon,
`.toast__title`, optional `.toast__body` and `.toast__action`, and an `.icon-btn.toast__close` last.
Use `role="status"`, or `role="alert"` for danger.
