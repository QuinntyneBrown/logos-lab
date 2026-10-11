---
title: Dialogs and overlays
order: 50
summary: Ask for one focused decision on top of the page, then return the person exactly where they were.
selector: .dialog, .sheet, .popover, .menu, .tooltip
components: dialog, drawer, popover, menu, tooltip, button, form-field, danger-zone
---

## Overview

An overlay borrows the person's attention for a moment. Use it for one short, focused task: confirm a
deletion, send a quick note, pick from a few options. Name the task in the title, keep the safe choice first
and the decision last, and when it closes, put focus back on the control that opened it. Anything longer
than a few fields, or anything a person might want to bookmark, is a page.

| Need | Use |
|---|---|
| Confirm a destructive or consequential action | [Dialog](../components/dialog.html), small, with a danger button |
| A short task with one to three fields | Dialog |
| Filters or options on a phone | [Sheet](../components/drawer.html) from the bottom |
| A few actions for one object | [Menu](../components/menu.html) |
| A short, non-blocking explanation or quick action | [Popover](../components/popover.html) |
| A name for an icon-only button | [Tooltip](../components/tooltip.html) |
| Long editing, many fields, or anything shareable | A page |

## When to use

- **Confirmation** before something that can't be undone, or that affects other people.
- **Quick tasks** that make sense without leaving the page: rename, send a note, invite one person.
- **Not** for information a person needs while doing something else (use an inline message or a popover),
  for a success message (use a [toast](notifications.html)), or for a dialog opened from another dialog.

## Structure

A dialog has three parts:

1. **Header** — an optional icon tile, the title as a question or task ("Delete Northwind?", "Invite to
   Northwind"), and a close button.
2. **Body** — one or two sentences saying exactly what will happen, then any fields. It scrolls if it must;
   the header and footer don't.
3. **Footer** — the safe action first (**Cancel**, **Keep project**), the decision last. Only one primary or
   danger button.

### Destructive confirmation

```html
<div class="dialog dialog--sm ds-static-dialog" role="region" aria-labelledby="dl-del-title">
  <div class="dialog__header">
    <span class="dialog__icon dialog__icon--danger"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 4h4M7 7l.8 12.5h8.4L17 7M10 11v5M14 11v5"/></svg></span>
    <h4 class="dialog__title" id="dl-del-title">Delete Northwind?</h4>
    <button class="icon-btn" type="button" aria-label="Close"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
  </div>
  <div class="dialog__body">
    <p>This permanently deletes the project, its 48 notes and the Field Day gathering for all 14 members. It can't be undone.</p>
    <div class="field">
      <label class="field__label" for="dl-confirm">Type the project name to confirm</label>
      <input class="input" id="dl-confirm" type="text" autocomplete="off" aria-describedby="dl-confirm-help">
      <p class="field__help" id="dl-confirm-help">Type <span class="typed-name">Northwind</span> exactly as shown.</p>
    </div>
  </div>
  <div class="dialog__footer">
    <button class="btn btn--quiet" type="button">Keep project</button>
    <button class="btn btn--danger" type="button" disabled>Delete project</button>
  </div>
</div>
```

### A short task

```html
<div class="dialog ds-static-dialog" role="region" aria-labelledby="dl-inv-title">
  <div class="dialog__header">
    <h4 class="dialog__title" id="dl-inv-title">Invite Grace Liu to Northwind</h4>
    <button class="icon-btn" type="button" aria-label="Close"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
  </div>
  <div class="dialog__body">
    <div class="dialog__who"><img src="../assets/photos/grace-liu.jpg" width="48" height="48" alt=""><div><p><strong>Grace Liu</strong></p><p class="muted">Designer</p></div></div>
    <div class="field">
      <label class="field__label" for="dl-note">Note <span class="field__optional">(optional)</span></label>
      <textarea class="textarea" id="dl-note" rows="3" aria-describedby="dl-note-help">We'd love your eye on the Field Day signage.</textarea>
      <p class="field__help" id="dl-note-help">Only Grace sees this, in the invitation email.</p>
    </div>
  </div>
  <div class="dialog__footer">
    <button class="btn btn--quiet" type="button">Cancel</button>
    <button class="btn btn--primary" type="button">Send invitation</button>
  </div>
</div>
```

### Menu and popover

```html
<div class="cluster">
  <div class="menu" role="menu" aria-label="Northwind actions">
    <button class="menu__item" type="button" role="menuitem">Rename</button>
    <button class="menu__item" type="button" role="menuitem">Duplicate</button>
    <hr class="menu__divider">
    <button class="menu__item menu__item--danger" type="button" role="menuitem">Delete project</button>
  </div>
  <div class="popover" role="region" aria-labelledby="dl-pop-title">
    <p class="popover__title" id="dl-pop-title">Who can see this note?</p>
    <p class="popover__body">Everyone on Northwind. Notes in private notebooks are visible only to the people they're shared with.</p>
    <div class="popover__actions"><button class="btn btn--text btn--sm" type="button">Got it</button></div>
  </div>
</div>
```

## States

A dialog moves **open → busy → closed**, or **open → invalid / failed** and stays open.

- **Open:** focus moves to the first field, or to the safe action when there are no fields. Never to the
  danger button.
- **Busy:** the decision button shows a spinner and a present-tense label; fields become read-only; the
  safe action stays until the request is sent.
- **Invalid:** errors appear beside the field, and the dialog stays open.
- **Failed:** an alert at the top of the body explains what happened. Every answer is kept.
- **Done:** the dialog closes, focus returns to the opener, and a toast confirms the outcome.

```html
<div class="dialog dialog--sm ds-static-dialog" role="region" aria-labelledby="dl-busy-title" aria-busy="true">
  <div class="dialog__header"><h4 class="dialog__title" id="dl-busy-title">Leave Harbour Notes?</h4></div>
  <div class="dialog__body"><p>You'll lose access to its 120 pages until someone shares it with you again.</p></div>
  <div class="dialog__footer">
    <button class="btn btn--quiet" type="button">Stay</button>
    <button class="btn btn--danger" type="button" aria-busy="true"><span class="spinner" aria-hidden="true"></span>Leaving…</button>
  </div>
</div>
```

```html
<div class="dialog ds-static-dialog" role="region" aria-labelledby="dl-fail-title">
  <div class="dialog__header">
    <h4 class="dialog__title" id="dl-fail-title">Invite Grace Liu to Northwind</h4>
    <button class="icon-btn" type="button" aria-label="Close"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
  </div>
  <div class="dialog__body">
    <div class="alert alert--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><p class="alert__title">Invitation not sent</p><p class="alert__body">Your note is still here. Try again in a moment.</p></div>
    <div class="field">
      <label class="field__label" for="dl-fail-note">Note <span class="field__optional">(optional)</span></label>
      <textarea class="textarea" id="dl-fail-note" rows="3">We'd love your eye on the Field Day signage.</textarea>
    </div>
  </div>
  <div class="dialog__footer">
    <button class="btn btn--quiet" type="button">Cancel</button>
    <button class="btn btn--primary" type="button">Try again</button>
  </div>
</div>
```

## Responsive

- **360px:** dialogs rise from the bottom as full-width sheets with rounded top corners; footer buttons wrap
  and stay above the safe area. Menus and filter panels become bottom sheets too.
- **640px and up:** dialogs centre over a dimmed backdrop at their capped width (small for confirmations,
  medium for short tasks).
- **1024px and up:** filter sheets usually become a side column on the page and stop being overlays at all.

The body scrolls inside the dialog when it is taller than the screen; the title and actions stay in view.

## Accessibility

**Role:** use a native `<dialog>` opened with `showModal()`, or `role="dialog"` with `aria-modal="true"`
while the page behind is truly inert. Name it with `aria-labelledby` (the title) and describe it with
`aria-describedby` (the consequence sentence). The static specimens on this page are labelled regions.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves between controls inside the dialog only. |
| Escape | Closes the dialog without acting, like Cancel. |
| Enter | Activates the focused button; never the danger action by default. |

**Focus:** on open, to the first field or the safe action. On close, back to the control that opened it.

**Menus:** `role="menu"` only for real action menus with arrow-key support; a list of links stays a `nav`.

**Motion:** the rise-in animation is removed under reduced motion.

Try a live dialog:

```html
<button class="btn" type="button" data-open-dialog="dl-live">Delete Northwind</button>
<dialog class="dialog dialog--sm" id="dl-live" aria-labelledby="dl-live-title" aria-describedby="dl-live-desc">
  <div class="dialog__header"><h4 class="dialog__title" id="dl-live-title">Delete Northwind?</h4></div>
  <div class="dialog__body"><p id="dl-live-desc">This permanently deletes the project and its 48 notes for everyone. It can't be undone.</p></div>
  <div class="dialog__footer"><button class="btn btn--quiet" type="button" data-close-dialog>Keep project</button><button class="btn btn--danger" type="button" data-close-dialog>Delete project</button></div>
</dialog>
```

## Content

- **Title:** a question for a confirmation ("Delete Northwind?"), a task for anything else ("Invite Grace Liu
  to Northwind"). Name the object.
- **Body:** what will happen, to what, for whom, and whether it can be undone. "This permanently deletes the project,
  its 48 notes and the Field Day gathering for all 14 members."
- **Buttons:** the decision repeats the verb from the title (**Delete project**); the safe choice says what
  it keeps (**Keep project**, **Stay**) or simply **Cancel**. Never Yes / No or OK.

## Do and don't

### Do
Put the safe action first and name exactly what will be deleted.
```html
<div class="dialog dialog--sm ds-static-dialog" role="region" aria-labelledby="dd-a-title"><div class="dialog__header"><h4 class="dialog__title" id="dd-a-title">Delete this note?</h4></div><div class="dialog__body"><p>"Field Day checklist" will be deleted from Harbour Notes for everyone.</p></div><div class="dialog__footer"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--danger" type="button">Delete note</button></div></div>
```

### Don't
Ask a vague question with Yes and No buttons.
```html
<div class="dialog dialog--sm ds-static-dialog" role="region" aria-labelledby="dd-b-title"><div class="dialog__header"><h4 class="dialog__title" id="dd-b-title">Are you sure?</h4></div><div class="dialog__body"><p>This action cannot be undone.</p></div><div class="dialog__footer"><button class="btn btn--primary" type="button">Yes</button><button class="btn btn--quiet" type="button">No</button></div></div>
```

### Do
Keep a failed dialog open with everything the person wrote.
```html
<div class="form"><div class="alert alert--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><p class="alert__title">Note not sent</p><p class="alert__body">Your words are still here. Try again in a moment.</p></div><div class="field"><label class="field__label" for="dd-kept">Note for Daniel</label><textarea class="textarea" id="dd-kept" rows="2">Could we move the Northwind review to Thursday?</textarea></div></div>
```

### Don't
Open a dialog from inside another dialog.
```html
<div class="dialog dialog--sm ds-static-dialog" role="region" aria-labelledby="dd-c-title"><div class="dialog__header"><h4 class="dialog__title" id="dd-c-title">Edit Field Day</h4></div><div class="dialog__body"><p>Change the venue in another dialog.</p></div><div class="dialog__footer"><button class="btn" type="button">Open venue picker</button></div></div>
```
