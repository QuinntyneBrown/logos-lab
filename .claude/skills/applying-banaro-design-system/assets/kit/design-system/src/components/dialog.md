---
title: Dialog
tier: core
order: 44
summary: Ask for one decision or one short piece of input without leaving the page, while everything behind it waits.
selector: .dialog
target: .dialog__footer .btn--primary, .dialog__footer .btn--danger
states: default, busy, invalid, failed
matrix-variants: form, destructive, with person
matrix-cell: 30rem
apg: dialog-modal
contrast: --color-fg-default|--color-bg-surface-raised|4.5; --color-fg-muted|--color-bg-surface-raised|4.5; --color-danger-icon|--color-danger-bg|3; --color-danger-fg|--color-danger-bg|4.5; --color-focus-ring|--color-bg-surface-raised|3
---

## Overview

Use a dialog for a short, focused task that has to be finished or abandoned before anything else happens:
confirm a destructive action, send a message, invite someone, edit a handful of fields. Keep the page
behind it intact so people return to where they were. Use a [drawer](drawer.html) for filters or detail
people browse alongside the page, a [popover](popover.html) for light, non-blocking choices, and a full
page for anything longer than one screen of fields.

## Anatomy

1. **Icon** — optional 44px tile that sets the tone (`.dialog__icon`; `--danger` for destructive actions).
2. **Title** — a question or a verb and object in the heading face (`.dialog__title`); it names the dialog.
3. **Close button** — a 32px icon button labelled **Close dialog**, top right.
4. **Body** — one line of consequence in muted text, then fields, people or messages (`.dialog__body`); it scrolls when tall.
5. **Footer** — a hairline, then the quiet way out first and the one primary action last (`.dialog__footer`).

```html
<div class="dialog ds-static-dialog" role="region" aria-labelledby="anat-title"><div class="dialog__header"><span class="dialog__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="8" r="3.5"/><path d="M3.5 19a6.5 6.5 0 0 1 13 0M18.5 8v6M15.5 11h6"/></svg></span><h3 class="dialog__title" id="anat-title">Invite people to Northwind</h3><button class="icon-btn" type="button" aria-label="Close dialog"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div><div class="dialog__body"><p>They'll get an email from Amara Osei with a link to join.</p></div><div class="dialog__footer"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="button">Send invitation</button></div></div>
```

## Variants

### confirm
The base dialog: a question, one sentence of consequence and two buttons.
```html
<div class="dialog ds-static-dialog" role="region" aria-labelledby="dlg-publish" aria-describedby="dlg-publish-desc">
  <div class="dialog__header"><h3 class="dialog__title" id="dlg-publish">Publish the Northwind roadmap?</h3><button class="icon-btn" type="button" aria-label="Close dialog"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div class="dialog__body"><p id="dlg-publish-desc">Everyone in Northwind will see the roadmap and get one notification. You can unpublish it at any time.</p></div>
  <div class="dialog__footer"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="button">Publish roadmap</button></div>
</div>
```

### form
A few fields that belong to one action. Labels sit above fields; optional fields say so.
```html
<div class="dialog ds-static-dialog" role="region" aria-labelledby="dlg-invite">
  <div class="dialog__header"><span class="dialog__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="8" r="3.5"/><path d="M3.5 19a6.5 6.5 0 0 1 13 0M18.5 8v6M15.5 11h6"/></svg></span><h3 class="dialog__title" id="dlg-invite">Invite people to Northwind</h3><button class="icon-btn" type="button" aria-label="Close dialog"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div class="dialog__body">
    <p>They'll get an email from Amara Osei with a link to join.</p>
    <div class="field"><label class="field__label" for="inv-email">Email addresses</label><input class="input" id="inv-email" type="email" multiple autocomplete="off" value="grace.liu@example.com" aria-describedby="inv-email-help"><p class="field__help" id="inv-email-help">Separate several addresses with commas.</p></div>
    <div class="field"><label class="field__label" for="inv-note">Note <span class="field__optional">(optional)</span></label><textarea class="textarea" id="inv-note" rows="3">Join us for Field Day planning.</textarea></div>
  </div>
  <div class="dialog__footer"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="button">Send invitation</button></div>
</div>
```

### destructive
A danger icon, a title that names the thing, the full consequence, and typed confirmation for anything
that cannot be undone. The safe button comes first and takes focus; the danger button is last.
```html
<div class="dialog ds-static-dialog" role="region" aria-labelledby="dlg-delete" aria-describedby="dlg-delete-desc">
  <div class="dialog__header"><span class="dialog__icon dialog__icon--danger"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 4h4M7 7l.8 12.5h8.4L17 7M10 11v5M14 11v5"/></svg></span><h3 class="dialog__title" id="dlg-delete">Delete Harbour Notes?</h3><button class="icon-btn" type="button" aria-label="Close dialog"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div class="dialog__body">
    <p id="dlg-delete-desc">This permanently removes the notebook, its 128 pages and every comment on them. It can't be undone.</p>
    <div class="field"><label class="field__label" for="del-name">Type the notebook name to confirm</label><input class="input" id="del-name" type="text" autocomplete="off" value="Harbour Notes" aria-describedby="del-help"><p class="field__help" id="del-help">Type Harbour Notes exactly as shown.</p></div>
  </div>
  <div class="dialog__footer"><button class="btn btn--quiet" type="button">Keep notebook</button><button class="btn btn--danger" type="button">Delete notebook</button></div>
</div>
```

### small
`dialog--sm` (24rem) for a one-line question with short answers.
```html
<div class="dialog dialog--sm ds-static-dialog" role="region" aria-labelledby="dlg-leave" aria-describedby="dlg-leave-desc">
  <div class="dialog__header"><h3 class="dialog__title" id="dlg-leave">Leave Field Day?</h3><button class="icon-btn" type="button" aria-label="Close dialog"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div class="dialog__body"><p id="dlg-leave-desc">You'll stop getting updates about Saturday 17 October.</p></div>
  <div class="dialog__footer"><button class="btn btn--quiet" type="button">Stay</button><button class="btn btn--primary" type="button">Leave Field Day</button></div>
</div>
```

### large
`dialog--lg` (40rem) for an edit with several related fields. Paired fields share a row from 768px; the body scrolls when the window is short.
```html
<div class="dialog dialog--lg ds-static-dialog" role="region" aria-labelledby="dlg-edit">
  <div class="dialog__header"><span class="dialog__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/></svg></span><h3 class="dialog__title" id="dlg-edit">Edit Field Day</h3><button class="icon-btn" type="button" aria-label="Close dialog"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div class="dialog__body">
    <div class="field-row"><div class="field"><label class="field__label" for="fd-date">Date</label><input class="input" id="fd-date" type="date" value="2026-10-17"></div><div class="field"><label class="field__label" for="fd-time">Start time</label><input class="input" id="fd-time" type="time" value="10:00"></div></div>
    <div class="field"><label class="field__label" for="fd-place">Place</label><input class="input" id="fd-place" type="text" value="The long room, Harbour Street"></div>
    <div class="field"><label class="field__label" for="fd-about">About this gathering</label><textarea class="textarea" id="fd-about" rows="4">A slow morning of coffee, short demos and planning the next quarter together.</textarea></div>
  </div>
  <div class="dialog__footer"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="button">Save changes</button></div>
</div>
```

### with person
When the action is about someone, show who: a small photo, their name and one line of context.
```html
<div class="dialog ds-static-dialog" role="region" aria-labelledby="dlg-msg">
  <div class="dialog__header"><h3 class="dialog__title" id="dlg-msg">Message Grace Liu</h3><button class="icon-btn" type="button" aria-label="Close dialog"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div class="dialog__body">
    <div class="dialog__who"><img src="../assets/photos/grace-liu.jpg" width="48" height="48" alt=""><div><p class="rows__title">Grace Liu</p><p class="rows__meta">Designer · online now</p></div></div>
    <div class="field"><label class="field__label" for="msg-text">Your message</label><textarea class="textarea" id="msg-text" rows="4" aria-describedby="msg-count">Could we look at the Field Day agenda together on Tuesday?</textarea><p class="field__counter" id="msg-count">58 / 500</p></div>
  </div>
  <div class="dialog__footer"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="button">Send message</button></div>
</div>
```

## Sizes

Three widths, set by class: `dialog--sm` (24rem) for a one-line question, the default (32rem) for most
dialogs, and `dialog--lg` (40rem) for a short form with paired fields. Height follows the content up to
the window height less `--space-12`; beyond that only the body scrolls, so the title and the footer stay put.

## States

**Busy:** after the primary action is pressed, it keeps its label, gains a spinner and `aria-busy`, and
the dialog stays open until the work finishes. **Invalid:** each problem shows under its field; a dialog
with more than one field also lists the problems in a form summary at the top of the body. **Failed:** when
the action fails, a danger alert at the top of the body says what happened and that nothing was lost; the
fields keep what people typed.

### form / invalid
```html
<div class="dialog ds-static-dialog" role="region" aria-labelledby="inv2-title">
  <div class="dialog__header"><span class="dialog__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="8" r="3.5"/><path d="M3.5 19a6.5 6.5 0 0 1 13 0M18.5 8v6M15.5 11h6"/></svg></span><h3 class="dialog__title" id="inv2-title">Invite people to Northwind</h3><button class="icon-btn" type="button" aria-label="Close dialog"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div class="dialog__body">
    <div class="form-summary" role="alert" aria-labelledby="inv2-sum"><p class="form-summary__title" id="inv2-sum"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Fix one thing to send the invitation</p><ul><li><a href="#inv2-email">Enter a full email address</a></li></ul></div>
    <div class="field"><label class="field__label" for="inv2-email">Email addresses</label><input class="input" id="inv2-email" type="email" multiple autocomplete="off" value="grace.liu@" aria-invalid="true" aria-describedby="inv2-err"><p class="field__error" id="inv2-err"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Enter a full email address, like grace.liu@example.com.</p></div>
    <div class="field"><label class="field__label" for="inv2-note">Note <span class="field__optional">(optional)</span></label><textarea class="textarea" id="inv2-note" rows="3">Join us for Field Day planning.</textarea></div>
  </div>
  <div class="dialog__footer"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="button">Send invitation</button></div>
</div>
```

### form / failed
```html
<div class="dialog ds-static-dialog" role="region" aria-labelledby="inv3-title">
  <div class="dialog__header"><span class="dialog__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="8" r="3.5"/><path d="M3.5 19a6.5 6.5 0 0 1 13 0M18.5 8v6M15.5 11h6"/></svg></span><h3 class="dialog__title" id="inv3-title">Invite people to Northwind</h3><button class="icon-btn" type="button" aria-label="Close dialog"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div class="dialog__body">
    <div class="alert alert--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg><p class="alert__title">The invitation didn't send</p><p class="alert__body">We couldn't reach the mail service. Your note is still here, so try again in a moment.</p></div>
    <div class="field"><label class="field__label" for="inv3-email">Email addresses</label><input class="input" id="inv3-email" type="email" multiple autocomplete="off" value="grace.liu@example.com"></div>
    <div class="field"><label class="field__label" for="inv3-note">Note <span class="field__optional">(optional)</span></label><textarea class="textarea" id="inv3-note" rows="3">Join us for Field Day planning.</textarea></div>
  </div>
  <div class="dialog__footer"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="button">Try again</button></div>
</div>
```

### destructive / invalid
```html
<div class="dialog ds-static-dialog" role="region" aria-labelledby="del2-title">
  <div class="dialog__header"><span class="dialog__icon dialog__icon--danger"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 4h4M7 7l.8 12.5h8.4L17 7M10 11v5M14 11v5"/></svg></span><h3 class="dialog__title" id="del2-title">Delete Harbour Notes?</h3><button class="icon-btn" type="button" aria-label="Close dialog"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div class="dialog__body">
    <p>This permanently removes the notebook, its 128 pages and every comment on them. It can't be undone.</p>
    <div class="field"><label class="field__label" for="del2-name">Type the notebook name to confirm</label><input class="input" id="del2-name" type="text" autocomplete="off" value="Harbor Notes" aria-invalid="true" aria-describedby="del2-err"><p class="field__error" id="del2-err"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>That doesn't match. Type Harbour Notes, with a u.</p></div>
  </div>
  <div class="dialog__footer"><button class="btn btn--quiet" type="button">Keep notebook</button><button class="btn btn--danger" type="button">Delete notebook</button></div>
</div>
```

### destructive / failed
```html
<div class="dialog ds-static-dialog" role="region" aria-labelledby="del3-title">
  <div class="dialog__header"><span class="dialog__icon dialog__icon--danger"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 4h4M7 7l.8 12.5h8.4L17 7M10 11v5M14 11v5"/></svg></span><h3 class="dialog__title" id="del3-title">Delete Harbour Notes?</h3><button class="icon-btn" type="button" aria-label="Close dialog"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div class="dialog__body">
    <div class="alert alert--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg><p class="alert__title">Harbour Notes wasn't deleted</p><p class="alert__body">Something went wrong on our side and nothing was removed. Try again, or keep the notebook for now.</p></div>
    <div class="field"><label class="field__label" for="del3-name">Type the notebook name to confirm</label><input class="input" id="del3-name" type="text" autocomplete="off" value="Harbour Notes"></div>
  </div>
  <div class="dialog__footer"><button class="btn btn--quiet" type="button">Keep notebook</button><button class="btn btn--danger" type="button">Try again</button></div>
</div>
```

### with person / invalid
```html
<div class="dialog ds-static-dialog" role="region" aria-labelledby="msg2-title">
  <div class="dialog__header"><h3 class="dialog__title" id="msg2-title">Message Grace Liu</h3><button class="icon-btn" type="button" aria-label="Close dialog"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div class="dialog__body">
    <div class="dialog__who"><img src="../assets/photos/grace-liu.jpg" width="48" height="48" alt=""><div><p class="rows__title">Grace Liu</p><p class="rows__meta">Designer · online now</p></div></div>
    <div class="field"><label class="field__label" for="msg2-text">Your message</label><textarea class="textarea" id="msg2-text" rows="4" aria-invalid="true" aria-describedby="msg2-err"></textarea><p class="field__error" id="msg2-err"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Write a short message so Grace knows why you're getting in touch.</p></div>
  </div>
  <div class="dialog__footer"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="button">Send message</button></div>
</div>
```

### with person / failed
```html
<div class="dialog ds-static-dialog" role="region" aria-labelledby="msg3-title">
  <div class="dialog__header"><h3 class="dialog__title" id="msg3-title">Message Grace Liu</h3><button class="icon-btn" type="button" aria-label="Close dialog"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div class="dialog__body">
    <div class="alert alert--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg><p class="alert__title">Your message didn't send</p><p class="alert__body">Check your connection and try again. What you wrote is still here.</p></div>
    <div class="field"><label class="field__label" for="msg3-text">Your message</label><textarea class="textarea" id="msg3-text" rows="4">Could we look at the Field Day agenda together on Tuesday?</textarea></div>
  </div>
  <div class="dialog__footer"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="button">Try again</button></div>
</div>
```

## Responsive

Below 640px a dialog becomes a bottom sheet: full width, rounded only at the top, rising from the bottom
edge, with its height capped at the window less `--space-4`. From 640px it centres with `--space-6` around
it and rounds all four corners. Footer buttons wrap onto a second line rather than shrink; paired fields
in `dialog--lg` stack below 768px.

## Theming

The dialog sits on `--color-bg-surface-raised` with `--shadow-4` over the `--color-bg-backdrop` scrim. In dark
mode the raised surface is lighter than the page, so the dialog still reads as lifted; the danger tile uses
`--color-danger-bg` and `--color-danger-icon` in both themes.

## Accessibility

**Role:** a native `<dialog>` opened with `showModal()`, which makes the rest of the page inert. Label it
with its title (`aria-labelledby`) and describe it with its consequence sentence (`aria-describedby`). It
follows the APG [modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). The specimens
above are static copies (`role="region"`) so they can sit in the page.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Cycles through the dialog's controls only; focus never leaves the dialog. |
| Escape | Closes the dialog without acting, like Cancel. |
| Enter | Activates the focused button, or submits the form from a field. |

**Focus:** on open, focus moves to the first field, or to the safe button when there is no field. A
destructive dialog always starts on Cancel (**Keep notebook**), never on the danger button. Focus is trapped
inside while open and returns to the button that opened it on close. After a failed submit, focus moves
to the form summary or the first invalid field.

**Labelling:** the close button is an icon button labelled **Close dialog**. The person's photo in
`.dialog__who` is decorative because their name sits beside it. A busy primary button keeps its name and sets `aria-busy`.

**Motion:** the dialog rises `--space-4` over `--duration-slow` with `--ease-enter`; under reduced motion it
appears in place.

**Touch:** footer buttons are 44px tall; the close button is 32px, above the 24px minimum, and sits at
least `--space-4` from the title. Footer buttons keep `--space-3` between them so a thumb cannot hit both.

Try it: the dialog below opens with focus on **Keep notebook**. Tab stays inside, Escape closes it, and
focus returns to the trigger.

```html
<button class="btn btn--quiet" type="button" data-open-dialog="live-delete">Delete Harbour Notes…</button>
<dialog class="dialog dialog--sm" id="live-delete" aria-labelledby="live-delete-title" aria-describedby="live-delete-desc"><div class="dialog__header"><span class="dialog__icon dialog__icon--danger"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 4h4M7 7l.8 12.5h8.4L17 7M10 11v5M14 11v5"/></svg></span><h3 class="dialog__title" id="live-delete-title">Delete Harbour Notes?</h3></div><div class="dialog__body"><p id="live-delete-desc">This removes 128 pages for everyone in Northwind. It can't be undone.</p></div><div class="dialog__footer"><button class="btn btn--quiet" type="button" data-close-dialog>Keep notebook</button><button class="btn btn--danger" type="button" data-close-dialog>Delete notebook</button></div></dialog>
```

## Content

Title a confirmation as the question people are answering, naming the thing: **Delete Harbour Notes?**,
**Leave Field Day?**. Title a task with a verb and object: **Invite people to Northwind**. Follow with one
sentence of consequence that includes numbers when they matter: **its 128 pages and every comment**. Button
labels repeat the verb: **Delete notebook**, **Keep notebook** — never **OK** and **Cancel** for a
destructive choice. Failure messages say what did not happen and what was kept.

## Do and don't

### Do
Put the safe choice first and name both outcomes.
```html
<div class="dialog__footer"><button class="btn btn--quiet" type="button">Keep notebook</button><button class="btn btn--danger" type="button">Delete notebook</button></div>
```

### Don't
Use generic labels that hide what the button does.
```html
<div class="dialog__footer"><button class="btn btn--danger" type="button">OK</button><button class="btn btn--quiet" type="button">Cancel</button></div>
```

### Do
Keep a dialog to one task with a few fields.
```html
<div class="dialog dialog--sm ds-static-dialog" role="region" aria-labelledby="do-title"><div class="dialog__header"><h3 class="dialog__title" id="do-title">Rename notebook</h3></div><div class="dialog__body"><div class="field"><label class="field__label" for="do-name">Notebook name</label><input class="input" id="do-name" type="text" value="Harbour Notes"></div></div><div class="dialog__footer"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="button">Rename</button></div></div>
```

### Don't
Stack a second dialog on top of the first; finish or replace the first one instead.
```html
<div class="dialog dialog--sm ds-static-dialog" role="region" aria-labelledby="dont-title"><div class="dialog__header"><h3 class="dialog__title" id="dont-title">Are you sure you want to cancel?</h3></div><div class="dialog__body"><p>You are about to close the Rename notebook dialog.</p></div><div class="dialog__footer"><button class="btn btn--quiet" type="button">No</button><button class="btn btn--primary" type="button">Yes</button></div></div>
```

## Tokens

Dialogs read the raised surface, backdrop, border and danger roles, the extra-large radius, `--shadow-4`,
the three `--size-dialog-*` widths and `--size-dialog-icon`.

## Code

In production use `<dialog class="dialog">` with `showModal()`; the `.backdrop` wrapper is for frameworks
that render their own overlay (such as the Angular CDK). Keep the header, body and footer as direct children
so only the body scrolls.
