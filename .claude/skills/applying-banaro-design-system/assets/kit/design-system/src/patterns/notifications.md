---
title: Notifications
order: 70
summary: Tell people what changed through the quietest channel that still reaches them in time.
selector: .toast, .banner, .alert, .notice-list, .strip
components: toast, alert, inline-message, notification-item, badge, button
---

## Overview

There are four channels, from quietest to loudest. Choose by **how urgent** the news is and **how long it
stays true**, and use the quietest one that works.

| Channel | For | Example | Goes away |
|---|---|---|---|
| [Inline message](../components/inline-message.html) | A result next to the thing that changed | Saved at 10:42 am | On the next change |
| [Toast](../components/toast.html) | A short outcome of the person's own action | Northwind saved | After about 6 seconds; errors stay |
| [Alert or banner](../components/alert.html) | A condition that keeps affecting the page or account | You're offline | When the condition ends |
| [Notification centre](../components/notification-item.html) | News from other people or the product, worth revisiting | Daniel Reyes commented on Spring route options | When read; history stays |

Email and push follow the same words as the notification centre, and are for things people asked to hear
about.

```html
<div class="stack">
  <p class="inline-status inline-status--success"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Saved at 10:42 am</p>
  <div class="toast toast--success" role="status">
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>
    <p class="toast__title">Northwind saved</p>
    <button class="icon-btn toast__close" type="button" aria-label="Dismiss: Northwind saved" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    <p class="toast__body">Everyone on the project sees the new timeline.</p>
  </div>
  <div class="banner banner--warning" role="status"><div class="banner__inner"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3.5 19h17z"/><path d="M12 10v4M12 16.5h.01"/></svg><p class="banner__text">You're offline. What you write stays on this page until you reconnect.</p></div></div>
</div>
```

## When to use

- **Toast:** the person just did something on this page and it worked (or didn't). Brief, with at most one
  action, usually **Undo** or **View**.
- **Banner:** a condition that affects everything on the page or in the account: offline, read-only mode,
  an unverified email, scheduled maintenance. Sits at the top of the page, above the header.
- **Alert:** a condition that affects one region or form on the page.
- **Notification centre:** something happened that the person didn't do themselves and may want to come back
  to: a comment, an invitation, a reminder.
- **Not** for marketing, tips or anything a person didn't ask to hear.

## Structure

Every notification follows the same order: **what happened**, then **to what**, then an optional **action**
and a way to dismiss it.

### Toast with an action

```html
<div class="toast" role="status">
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 4h4M7 7l.8 12.5h8.4L17 7"/></svg>
  <p class="toast__title">Note archived</p>
  <button class="icon-btn toast__close" type="button" aria-label="Dismiss: Note archived" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
  <p class="toast__body">"Signage sketches" moved to the archive.</p>
  <button class="btn btn--text btn--sm toast__action" type="button">Undo</button>
</div>
```

### Account banner

```html
<div class="banner" role="region" aria-label="Account notice"><div class="banner__inner"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/></svg><p class="banner__text">Confirm your email to start inviting people. We sent a link to amara@example.com.</p><button class="btn btn--sm" type="button">Send it again</button></div></div>
```

### Notification centre

Unread items are tinted and carry a word, not only a dot. Each title is a link to the thing it mentions.

```html
<section class="stack" aria-labelledby="nt-new-title">
  <div class="cluster cluster--between"><h4 id="nt-new-title">New</h4><button class="btn btn--quiet btn--sm" type="button">Mark all as read</button></div>
  <ul class="notice-list">
    <li class="is-unread">
      <span class="dialog__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 16h-5.5L7 19.5V16a2.5 2.5 0 0 1-2.5-2.5z"/></svg></span>
      <div><p class="notice__title"><span class="badge badge--info">New</span> <a href="#">Daniel Reyes commented on Spring route options</a></p><p class="notice__text">"The coastal route adds 20 minutes but the view is worth it."</p></div>
      <span class="notice__time">9:12 am</span>
    </li>
    <li class="is-unread">
      <span class="dialog__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg></span>
      <div><p class="notice__title"><span class="badge badge--info">New</span> <a href="#">Field Day is coming up</a></p><p class="notice__text">Sat 17 Oct, 10:00 am. 11 people are coming.</p></div>
      <span class="notice__time">Yesterday, 6:00 pm</span>
    </li>
    <li>
      <span class="dialog__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19.5c.6-3.3 2.8-5 5.5-5s4.9 1.7 5.5 5"/><path d="M16 5.6a3.2 3.2 0 0 1 0 5.8M17.5 14.7c1.7.5 2.8 2.1 3 4.8"/></svg></span>
      <div><p class="notice__title"><a href="#">Hannah Kowalski shared Harbour Notes with you</a></p><p class="notice__text">You can read and comment on all 120 pages.</p></div>
      <span class="notice__time">Wed 7 Oct</span>
    </li>
  </ul>
</section>
```

## States

- **Toast — info, success, warning, danger:** the icon and its colour change; the words always say which.
  Success and info dismiss themselves after about 6 seconds (10 or more with an action); warnings and errors
  stay until dismissed.
- **Toast — stacked:** at most three at once, newest at the bottom; older ones leave first. Group repeats:
  "3 notes archived", not three toasts.
- **Banner — persistent:** some conditions can't be dismissed (offline, read-only); others can, and stay
  dismissed for that session.
- **Notification centre — unread, read, empty, failed:** reading an item or **Mark all as read** removes the
  tint and the word New; the history stays. Empty says "You're all caught up".

```html
<div class="toast toast--danger" role="alert">
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg>
  <p class="toast__title">Northwind wasn't saved</p>
  <button class="icon-btn toast__close" type="button" aria-label="Dismiss: Northwind wasn't saved" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
  <p class="toast__body">Your changes are still on the page.</p>
  <button class="btn btn--text btn--sm toast__action" type="button">Try again</button>
</div>
```

```html
<div class="banner banner--danger" role="alert"><div class="banner__inner"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><p class="banner__text">{{app}} is read-only for a few minutes while we finish maintenance. Nothing you've saved is affected.</p></div></div>
```

## Responsive

- **360px:** toasts stretch across the bottom inside the page margins, above the safe area and above any
  bottom navigation. Banner text wraps; its action drops below the text.
- **768px and up:** toasts sit in the bottom-right corner at a capped width. Banners keep text and action on
  one line when they fit.
- **Notification centre:** rows wrap long titles at every width; the time moves under the title when space
  runs out.

## Accessibility

**Live regions:** keep one polite `role="status"` region on the page for toasts and add messages into it.
Use `role="alert"` only for a new error. Never move focus to a notification.

**Timing:** auto-dismiss pauses while the toast is hovered or has focus; any toast with an action stays at
least 10 seconds. Nothing important exists only inside a toast; the same action is available on the page.

**Dismiss buttons** name the message ("Dismiss: Note archived"), so a list of them makes sense.

**Notification centre:** it is a normal list, not a live region; don't re-announce history. Unread is said
in words (a "New" badge or visually hidden text), not only by tint or a dot. The bell's accessible name
includes the count ("Notifications, 3 unread").

**Not colour alone:** each variant has its own icon and its own words.

## Content

- **Lead with the outcome**, past tense, naming the object: "Northwind saved", "Note archived", "Invitation
  sent to Grace Liu".
- **Other people's actions** start with the person: "Daniel Reyes commented on Spring route options".
- **Conditions** say what is true and what still works: "You're offline. What you write stays on this page
  until you reconnect."
- **Actions** are one or two words: **Undo**, **View**, **Try again**, **Send it again**.
- **Times** are relative when recent ("9:12 am", "Yesterday, 6:00 pm") and dates after that ("Wed 7 Oct").
- No exclamation marks, no "Oops", and never "Success!".

## Do and don't

### Do
Name the object and offer Undo when the change can be reversed.
```html
<div class="toast" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/></svg><p class="toast__title">2 notes moved to Field Day planning</p><button class="btn btn--text btn--sm toast__action" type="button">Undo</button></div>
```

### Don't
Use a toast for an error that needs the person to act; it may vanish before they read it.
```html
<div class="toast toast--warning" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3.5 19h17z"/><path d="M12 10v4M12 16.5h.01"/></svg><p class="toast__title">Your session is about to expire!</p></div>
```

### Do
Use a banner for a condition that affects the whole page, and say what still works.
```html
<div class="banner banner--warning" role="status"><div class="banner__inner"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3.5 19h17z"/><path d="M12 10v4M12 16.5h.01"/></svg><p class="banner__text">You're offline. You can keep writing; changes save when you reconnect.</p></div></div>
```

### Don't
Mark unread items with colour alone.
```html
<ul class="notice-list"><li class="is-unread"><span class="unread-dot" aria-hidden="true"></span><div><p class="notice__title"><a href="#">Grace Liu replied</a></p></div><span class="notice__time">9:30 am</span></li></ul>
```
