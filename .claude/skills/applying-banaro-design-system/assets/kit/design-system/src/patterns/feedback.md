---
title: Feedback and loading
order: 20
summary: Show what is happening and what changed, close to where it happened, for as long as it matters.
selector: .skeleton, .skeleton-card, .spinner, .progress, .toast, .alert, .inline-status
components: skeleton, spinner, progress-bar, inline-message, toast, alert, button
---

## Overview

Every action gets an answer, and the answer sits where the person is looking. Loading reserves the space
that content will fill, so nothing jumps. Work in progress shows on the control that started it. Outcomes
are quiet and specific: "Northwind saved", not "Success!". Failures keep everything in place and offer one
way forward.

Pick the feedback by **where** the change happened and **how long** it matters:

| What happened | Use | Lasts |
|---|---|---|
| A field or row changed on its own | [Inline message](../components/inline-message.html) | Until the next change |
| A page region is loading | [Skeleton](../components/skeleton.html) matching the final layout | Until the content arrives |
| A button's action is running | [Spinner](../components/spinner.html) inside the button | Until it finishes |
| A long task with known progress | [Progress bar](../components/progress-bar.html) with a count | Until it completes |
| A short action finished | [Toast](../components/toast.html) | About 6 seconds; errors stay |
| A condition affects the whole page | [Alert or banner](../components/alert.html) | While the condition lasts |
| A decision is needed before continuing | [Dialog](dialogs.html) | Until the person decides |

## When to use

- **Loading content** on first visit or navigation: a skeleton for anything that takes more than about
  300ms. Show nothing for faster loads; a flash of grey is worse than a short wait.
- **Refreshing content** that is already visible: keep it on screen and show a small inline status
  ("Updating…"). Never swap loaded content back to a skeleton.
- **Running an action:** a spinner inside the pressed button, with a present-tense label.
- **Uploading, importing or syncing:** a progress bar when the total is known; otherwise a spinner with a
  sentence.
- **Confirming an outcome:** inline for a field-level save, a toast for a page-level action, the new page
  itself for a created object.

## Structure

### Skeleton, then content

A skeleton is a calm outline of the real layout: same cards, same rows, same gaps. It is decorative, so the
region around it carries the busy state and an accessible name.

```html
<section class="stack" aria-busy="true" aria-label="Loading your projects">
  <div class="skeleton-card" aria-hidden="true">
    <div class="skeleton-card__top"><span class="skeleton skeleton--photo"></span><div><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text is-short"></span></div></div>
    <span class="skeleton skeleton--text"></span>
    <span class="skeleton skeleton--text is-short"></span>
  </div>
</section>
```

```html
<section class="stack" aria-label="Your projects">
  <article class="card">
    <div class="card__top">
      <span class="card__initials tile--sage" aria-hidden="true">N</span>
      <div><h4 class="card__name">Northwind</h4><p class="card__role">Led by Amara Osei · 14 members</p></div>
      <span class="badge badge--success">On track</span>
    </div>
    <p class="card__text">Planning the spring field season. Next review on Thu 15 Oct, 2:00 pm.</p>
  </article>
</section>
```

### Work on the control that started it

```html
<div class="cluster">
  <button class="btn btn--quiet" type="button">Cancel</button>
  <button class="btn btn--primary" type="button" aria-busy="true"><span class="spinner" aria-hidden="true"></span>Sending invitation…</button>
</div>
```

### Known progress

```html
<div>
  <div class="progress-label"><span>Importing Harbour Notes</span><span class="num">42 of 120 pages</span></div>
  <div class="progress" role="progressbar" aria-label="Importing Harbour Notes" aria-valuemin="0" aria-valuemax="120" aria-valuenow="42" style="--bn-progress-value: 35%"><div class="progress__bar"></div></div>
</div>
```

### Outcomes, from smallest to largest

```html
<div class="stack">
  <p class="inline-status inline-status--success"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Saved at 10:42 am</p>
  <div class="toast toast--success" role="status">
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>
    <p class="toast__title">Northwind saved</p>
    <button class="icon-btn toast__close" type="button" aria-label="Dismiss: Northwind saved" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    <p class="toast__body">Everyone on the project sees the new timeline.</p>
  </div>
  <div class="alert alert--warning" role="status">
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3.5 19h17z"/><path d="M12 10v4M12 16.5h.01"/></svg>
    <p class="alert__title">Changes are saving slowly</p>
    <p class="alert__body">Keep working. Your edits stay on this page and save when the connection settles.</p>
  </div>
</div>
```

## States

- **Idle:** no feedback at all. Don't pre-announce what hasn't happened.
- **Pending:** skeleton for a region, spinner for an action, progress for a known total. Everything around
  it stays usable.
- **Optimistic:** for small, reversible changes (a star, a checkbox, a rename), show the result at once and
  confirm quietly. If the save fails, put the old value back and say so beside it.
- **Success:** say what changed, in the past tense, naming the object. Offer **Undo** when the change can be
  reversed.
- **Failure:** say what didn't happen, that nothing was lost, and one way forward. Errors never disappear on
  their own.

```html
<div class="toast toast--danger" role="alert">
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg>
  <p class="toast__title">Invitation not sent</p>
  <button class="icon-btn toast__close" type="button" aria-label="Dismiss: Invitation not sent" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
  <p class="toast__body">Grace Liu didn't get it. Your message is still in the form.</p>
  <button class="btn btn--text btn--sm toast__action" type="button">Try again</button>
</div>
```

```html
<ul class="list">
  <li class="cluster cluster--between"><span>Share Harbour Notes with Hannah Kowalski</span><span class="inline-status inline-status--danger"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg>Couldn't save. Sharing is off again.</span></li>
  <li class="cluster cluster--between"><span>Share Harbour Notes with Daniel Reyes</span><span class="inline-status"><span class="spinner spinner--sm" aria-hidden="true"></span>Saving…</span></li>
</ul>
```

## Responsive

- **360px:** skeletons match the one-column layout, so reserve one card per row. Toasts span the bottom of the
  screen inside the page margins, above the safe area.
- **768px:** skeletons follow the two-column grid. Toasts move to the bottom-right corner, capped at the
  toast width and stacked with the newest at the bottom.
- **1024px and up:** reserve space for side columns too; a missing aside that appears later shifts the
  whole page.

A busy button keeps its width at every size; a spinner never replaces a label.

## Accessibility

**Busy regions:** set `aria-busy="true"` on the region that is loading and give it a name ("Loading your
projects"). Skeleton shapes are `aria-hidden="true"`.

**Announcements:** outcomes go to a polite live region (`role="status"`) that already exists on the page.
Use `role="alert"` only for a new failure that needs attention. Never move focus to a toast.

**Timing:** a toast with an action stays at least 10 seconds and pauses while hovered or focused. Error
toasts stay until dismissed. Never put the only route to an action inside a toast.

**Progress:** `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and a label. An
indeterminate bar drops `aria-valuenow`.

**Motion:** the shimmer, spinner and toast rise stop under `prefers-reduced-motion`; the static shapes and
words still carry the meaning.

**Colour:** success and error are always said in words and shown with an icon, not by colour alone.

## Content

- **Pending:** present tense with an ellipsis: Saving…, Sending invitation…, Importing 42 of 120 pages.
- **Success:** past tense, naming the object: Northwind saved. Invitation sent to Grace Liu.
- **Failure:** what didn't happen, then reassurance, then the fix: "Invitation not sent. Your message is
  still in the form. Try again."
- **Undo** is a verb on its own; never "Click here to undo".
- No exclamation marks, no "Oops", no "Success!".

## Do and don't

### Do
Make the skeleton the same shape as the content that replaces it.
```html
<div class="skeleton-card" aria-hidden="true"><div class="skeleton-card__top"><span class="skeleton skeleton--photo"></span><div><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text is-short"></span></div></div><span class="skeleton skeleton--text"></span></div>
```

### Don't
Cover a whole page with one spinner while its layout is already known.
```html
<div class="empty empty--compact" aria-busy="true"><span class="spinner spinner--lg" aria-hidden="true"></span><p>Loading…</p></div>
```

### Do
Keep the label on a busy button and say what it is doing.
```html
<button class="btn btn--primary" type="button" aria-busy="true"><span class="spinner" aria-hidden="true"></span>Saving changes…</button>
```

### Don't
Swap the label for a bare spinner; the button shrinks and loses its name.
```html
<button class="btn btn--primary" type="button" aria-busy="true" aria-label="Loading"><span class="spinner" aria-hidden="true"></span></button>
```

### Do
Report a failure plainly and keep the way forward visible.
```html
<div class="alert alert--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><p class="alert__title">Field Day wasn't published</p><p class="alert__body">Nothing was sent to the team. Your details are still here.</p><div class="alert__actions"><button class="btn btn--sm" type="button">Try again</button></div></div>
```

### Don't
Celebrate with a success message when part of the action failed.
```html
<div class="toast toast--success" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><p class="toast__title">Success!</p><p class="toast__body">Invitations sent (2 failed).</p></div>
```
