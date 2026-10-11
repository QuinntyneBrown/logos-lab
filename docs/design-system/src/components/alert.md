---
title: Alert and banner
tier: core
order: 60
summary: Tell people something that stays true while they are on the page. Tinted, calm, specific, and always with a way forward.
selector: .alert, .banner, .strip
layout: block
target: .alert, .banner, .strip
states: default
contrast: --color-info-fg|--color-info-bg|4.5; --color-success-fg|--color-success-bg|4.5; --color-warning-fg|--color-warning-bg|4.5; --color-danger-fg|--color-danger-bg|4.5; --color-fg-default|--color-warning-bg|4.5; --color-fg-accent|--color-accent-subtle|4.5
---

## Overview

An **alert** (`.alert`) sits in the page content and explains a condition that affects this screen: a
form that did not send, a project that is read-only, a change that worked. A **banner** (`.banner`) runs
across the top of the app for something that affects everything — planned maintenance, delayed messages.
A **strip** (`.strip`) is a quiet sage band for one friendly sentence and one link. For a short
confirmation that goes away, use a [toast](toast.html); for one line beside a field or button, use an
[inline message](inline-message.html); for a whole screen that failed, use an [error page](error-page.html).

## Anatomy

1. **Icon** — a 20px line icon in the tone's icon colour; decorative.
2. **Title** — one short line in `--text-h4` that says what happened.
3. **Body** — one or two sentences in the default text colour: why, and what happens next.
4. **Actions** — optional small buttons or links that resolve it.
5. **Dismiss** — optional icon button, only for alerts that do not need to stay.

```html
<div class="alert alert--warning"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3.5 19h17z"/><path d="M12 10v4M12 16.5h.01"/></svg><p class="alert__title">Northwind is read-only</p><p class="alert__body">Caleb Morgan is moving it to a new workspace. You can read and copy notes until 4:00 pm.</p><div class="alert__actions"><a class="btn btn--quiet btn--sm" href="#">See what's changing</a></div></div>
```

## Variants

### info
Useful context that changes nothing for now.
```html
<div class="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/></svg><p class="alert__title">Harbour Notes is shared with 7 people</p><p class="alert__body">Everyone on Northwind can read and comment. Only editors can change notes.</p></div>
```

### success
Confirms a change that has a lasting result on this page.
```html
<div class="alert alert--success" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><p class="alert__title">Invitation sent to Noah Fischer</p><p class="alert__body">Noah will join Northwind once the invitation is accepted. We'll tell you when that happens.</p></div>
```

### warning
Something needs attention soon, but nothing is lost.
```html
<div class="alert alert--warning"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3.5 19h17z"/><path d="M12 10v4M12 16.5h.01"/></svg><p class="alert__title">Field Day sign-up closes tomorrow</p><p class="alert__body">14 spaces are left. Sign-up closes at 6:00 pm on Friday 16 October.</p></div>
```

### danger
Something failed or is blocked. Say what is safe and what to do.
```html
<div class="alert alert--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><p class="alert__title">We couldn't save your note</p><p class="alert__body">Your text is still here. Check your connection, then save again.</p></div>
```

### with actions
Give the next step right inside the alert.
```html
<div class="alert alert--warning"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3.5 19h17z"/><path d="M12 10v4M12 16.5h.01"/></svg><p class="alert__title">Two tasks have no owner</p><p class="alert__body">Onboarding checklist and Venue booking are due before Field Day.</p><div class="alert__actions"><a class="btn btn--quiet btn--sm" href="#">Assign owners</a><button class="btn btn--text btn--sm" type="button">Remind me tomorrow</button></div></div>
```

### dismissible
An alert people may close once they have read it. The dismiss button sits top right.
```html
<div class="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/></svg><p class="alert__title">New: weekly digest</p><p class="alert__body">Every Friday we'll email a summary of what changed in Harbour Notes. Turn it off in Settings.</p><button class="icon-btn alert__close" type="button" aria-label="Dismiss: new weekly digest" data-dismiss-demo><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
```

### banner
A site-wide notice above the top bar. This one stays until the work is done.
```html
<div class="banner"><div class="wrap banner__inner"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/></svg><p class="banner__text">Planned maintenance on Saturday 10 October, 2:00 to 3:00 am ET. Notes stay readable while we work.</p></div></div>
```

### banner with action
A warning banner with one link and a dismiss button.
```html
<div class="banner banner--warning" role="status"><div class="wrap banner__inner"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3.5 19h17z"/><path d="M12 10v4M12 16.5h.01"/></svg><p class="banner__text">Comments are arriving slowly. They are safe and will appear shortly.</p><a class="btn btn--quiet btn--sm" href="#">Status updates</a><button class="icon-btn" type="button" aria-label="Dismiss banner"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div></div>
```

### strip
A quiet sage band inside the content: one sentence and one link.
```html
<div class="strip"><p><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 16h-5.5L7 19.5V16a2.5 2.5 0 0 1-2.5-2.5z"/></svg>4 new comments since you last looked</p><a class="section__more" href="#">Read the new comments <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></a></div>
```

## Sizes

N/A: alerts fill their container and grow with their text. Banners span the full width and keep the page
container inside. A strip is as wide as its column.

## States

Alerts, banners and strips are passive messages, so they have one state. Their tone is chosen for what
they say, not changed by interaction. A dismissible alert disappears when closed and does not return on
the next visit; focus moves to the next heading or the main content. Actions inside follow the
[button](button.html) and [link](link.html) states.

## Responsive

At 360px an alert keeps its icon column and its actions wrap under the body; a banner's text takes the
full line and its action and dismiss button drop below it. A strip stacks its sentence above the link.
From 768px banner actions sit at the end of the line. Alerts never exceed the content column width.

## Theming

Each tone pairs `*-bg`, `*-border`, `*-fg` and `*-icon` roles that all change in dark mode. Body text
uses `--color-fg-default` so it stays readable on every tint; the strip reads the accent-subtle pair.

## Accessibility

**Role:** an alert that is on the page when it loads needs no live role. One that appears after an action
gets `role="status"` (info, success, warning) or `role="alert"` (danger), and must be inserted into a
container that already exists so it is announced once. A banner inserted after load takes `role="status"`.
Never put `role="alert"` on content that is always present.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to the actions and the dismiss button in reading order. |
| Enter, Space | Activates an action or dismisses the alert. |

**Focus:** do not move focus to an alert, except after a failed form submit, where focus goes to the
alert (with `tabindex="-1"`) so people hear the problem first. Dismissing moves focus to the next
logical element.

**Labelling:** the title and body are the message; the icon is `aria-hidden`. The dismiss button names
what it closes: "Dismiss: new weekly digest".

**Motion:** none. Alerts appear in place without sliding; dismissing removes them instantly.

**Touch:** actions use `btn--sm` (36px) and the dismiss button keeps a 44px target.

## Content

Lead with the outcome, then the reason, then the next step: **We couldn't save your note** · Your text
is still here · Check your connection, then save again. Be specific — name the project, the person, the
time (**until 4:00 pm**). Never blame ("You entered an invalid…"), never use "Error!" or "Oops", and
keep the title under eight words. Success alerts say what changed; info alerts say why it matters.

## Do and don't

### Do
Say what happened, what is safe and what to do.
```html
<div class="alert alert--danger"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><p class="alert__title">We couldn't send the invitation</p><p class="alert__body">Grace Liu's address bounced. Check the spelling, or invite Grace with a link instead.</p><div class="alert__actions"><button class="btn btn--quiet btn--sm" type="button">Copy invite link</button></div></div>
```

### Don't
A vague, blaming error with no way forward.
```html
<div class="alert alert--danger"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><p class="alert__title">Error!</p><p class="alert__body">Invalid input. Please try again.</p></div>
```

### Do
Use a strip for friendly news inside the content.
```html
<div class="strip"><p>Field Day is next Saturday</p><a class="section__more" href="#">See the agenda</a></div>
```

### Don't
Stacked alerts compete; combine them or keep only the most important.
```html
<div class="stack"><div class="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/></svg><p class="alert__title">Notes are shared</p></div><div class="alert alert--warning"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3.5 19h17z"/><path d="M12 10v4M12 16.5h.01"/></svg><p class="alert__title">Two tasks have no owner</p></div><div class="alert alert--success"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><p class="alert__title">Settings saved</p></div></div>
```

## Tokens

Alerts and banners read the four status families (`--color-*-bg`, `-border`, `-fg`, `-icon`), the
accent-subtle pair for strips, `--radius-md` and the spacing scale.

## Code

Use `.alert` with a tone modifier, an icon, `.alert__title`, `.alert__body` and optional
`.alert__actions`; add an `.icon-btn.alert__close` last to make it dismissible. Banners wrap a
`.wrap.banner__inner`; strips hold one `<p>` and one link.
