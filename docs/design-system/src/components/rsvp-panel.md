---
title: RSVP panel
tier: sample
order: 92
summary: A sample domain panel for reserving a place at a gathering, kept as a reference. It says whether there is room, shows how full it is and holds the one action that fits.
selector: .rsvp
layout: block
target: button, a
states: default, focus, loading, error
matrix-variants: available, going, full
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-fg-default|--color-accent-subtle|4.5; --color-success-fg|--color-accent-subtle|4.5; --color-accent|--color-border-default|3; --color-fg-muted|--color-bg-subtle|4.5
---

## Overview

**This is a sample component.** It comes from the original Banaro domain (reserving a spot at a
gathering) and ships as a worked example of a booking side panel, not as part of every system. An app
should either prune it (`audit_usage.py --prune` removes it when no mock uses `.rsvp`) or adapt it for
its own capacity-limited action (enrolling in a course, booking a slot) by copying the block and renaming
the classes. It sits in the aside of the event's page next to the [event header](event-row.html). For a
generic side box use an aside [card](card.html).

## Anatomy

1. **Panel** — a surface with a hairline border (`.rsvp`); sage-washed once you are going (`--going`), linen once it is closed (`--closed`).
2. **Title** — what the panel is for right now (`__title`): Reserve a spot, You're going, Field Day is full.
3. **Status or text** — one line of terms or status (`__text`, or an [inline message](inline-message.html)).
4. **Meter** — a [progress bar](progress-bar.html) with the count beneath (`__meter`), so people see how full it is.
5. **Actions** — one full-width primary action and at most one quiet or text action (`__actions`).

## Variants

### available
Spots are left: terms, the meter and one primary action.
```html
<aside class="rsvp" aria-labelledby="rsvp-open"><h3 class="rsvp__title" id="rsvp-open">Reserve a spot</h3><p class="rsvp__text">Free. You can cancel up to Friday evening.</p><div class="rsvp__meter"><div class="progress" role="progressbar" aria-label="Spots taken" aria-valuenow="18" aria-valuemin="0" aria-valuemax="30" style="--ll-progress-value: 60%"><div class="progress__bar"></div></div><p>18 going · 12 spots left</p></div><div class="rsvp__actions"><button class="btn btn--primary btn--block" type="button">Reserve a spot</button></div></aside>
```

### going
You have a spot: a success status, the date, a calendar action and a quiet way out.
```html
<aside class="rsvp rsvp--going" aria-labelledby="rsvp-going"><h3 class="rsvp__title" id="rsvp-going">You're going</h3><p class="inline-status inline-status--success"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Spot reserved for Sat 17 Oct, 10:00 am</p><div class="rsvp__meter"><div class="progress" role="progressbar" aria-label="Spots taken" aria-valuenow="19" aria-valuemin="0" aria-valuemax="30" style="--ll-progress-value: 63%"><div class="progress__bar"></div></div><p>19 going, including you · 11 spots left</p></div><div class="rsvp__actions"><button class="btn btn--quiet btn--block" type="button"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>Add to calendar</button><button class="btn btn--text btn--block" type="button">Cancel my spot</button></div></aside>
```

### full
No spots left: the meter is full, the waitlist is the action and it says what happens next.
```html
<aside class="rsvp" aria-labelledby="rsvp-full"><h3 class="rsvp__title" id="rsvp-full">Field Day is full</h3><p class="inline-status inline-status--warning"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>4 people on the waitlist</p><div class="rsvp__meter"><div class="progress" role="progressbar" aria-label="Spots taken" aria-valuenow="30" aria-valuemin="0" aria-valuemax="30" style="--ll-progress-value: 100%"><div class="progress__bar"></div></div><p>30 going · no spots left</p></div><p class="rsvp__text">If someone cancels, the first person on the list gets the spot and an e-mail.</p><div class="rsvp__actions"><button class="btn btn--quiet btn--block" type="button">Join the waitlist</button></div></aside>
```

### closed
Reservations are over: no meter, a plain explanation and a way on.
```html
<aside class="rsvp rsvp--closed" aria-labelledby="rsvp-closed"><h3 class="rsvp__title" id="rsvp-closed">This gathering has ended</h3><p class="rsvp__text">Field Day took place on Sat 17 Oct. Notes and photos are on the event page.</p><div class="rsvp__actions"><a class="btn btn--quiet btn--block" href="#">See upcoming gatherings</a></div></aside>
```

## Sizes

N/A: One size. The panel takes the width of the page's aside column (`--layout-aside-width`) or the full width on phones.

## States

Focus rings the panel's first action. **Loading** keeps the button's label and width and adds a spinner
while the reservation is saved. **Error** keeps the panel as it was, adds a danger message that says what
to do, and turns the action into **Try again**.

### available / error
```html
<aside class="rsvp" aria-labelledby="rsvp-open-error"><h3 class="rsvp__title" id="rsvp-open-error">Reserve a spot</h3><p class="inline-status inline-status--danger" role="alert"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>We couldn't save your spot. Check your connection and try again.</p><div class="rsvp__meter"><div class="progress" role="progressbar" aria-label="Spots taken" aria-valuenow="18" aria-valuemin="0" aria-valuemax="30" style="--ll-progress-value: 60%"><div class="progress__bar"></div></div><p>18 going · 12 spots left</p></div><div class="rsvp__actions"><button class="btn btn--primary btn--block" type="button">Try again</button></div></aside>
```

### going / error
```html
<aside class="rsvp rsvp--going" aria-labelledby="rsvp-going-error"><h3 class="rsvp__title" id="rsvp-going-error">You're going</h3><p class="inline-status inline-status--danger" role="alert"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>We couldn't cancel your spot. You're still going.</p><div class="rsvp__meter"><div class="progress" role="progressbar" aria-label="Spots taken" aria-valuenow="19" aria-valuemin="0" aria-valuemax="30" style="--ll-progress-value: 63%"><div class="progress__bar"></div></div><p>19 going, including you · 11 spots left</p></div><div class="rsvp__actions"><button class="btn btn--quiet btn--block" type="button">Add to calendar</button><button class="btn btn--text btn--block" type="button">Try cancelling again</button></div></aside>
```

### full / error
```html
<aside class="rsvp" aria-labelledby="rsvp-full-error"><h3 class="rsvp__title" id="rsvp-full-error">Field Day is full</h3><p class="inline-status inline-status--danger" role="alert"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>We couldn't add you to the waitlist. Try again in a moment.</p><div class="rsvp__meter"><div class="progress" role="progressbar" aria-label="Spots taken" aria-valuenow="30" aria-valuemin="0" aria-valuemax="30" style="--ll-progress-value: 100%"><div class="progress__bar"></div></div><p>30 going · no spots left</p></div><div class="rsvp__actions"><button class="btn btn--quiet btn--block" type="button">Try again</button></div></aside>
```

## Responsive

At 360px the panel is full width and sits directly under the [event header](event-row.html), before the
description, so the action is on the first screen. From 768px it keeps that place. At 1024px and up it
moves into the aside column beside the description and stays in view while the page scrolls.

## Accessibility

**Role:** an `<aside>` labelled by its title. The meter is a `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and an `aria-label`; the count beneath repeats it in words.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves through the panel's actions. |
| Enter, Space | Activates the focused action. |

**Focus:** after reserving, focus moves to the new title ("You're going") so the change is announced; on error it stays on the action.

**Labelling:** the title changes with the state so the panel's name always says where you stand. A busy
button sets `aria-busy="true"` and keeps its label. Errors use `role="alert"`. Status is text with an
icon, never colour alone.

**Motion:** the meter fills without animating under reduced motion; the spinner stops.

**Touch:** actions are full-width 44px pills.

## Content

Titles say where the person stands: **Reserve a spot**, **You're going**, **Field Day is full**, **This
gathering has ended**. Counts read **18 going · 12 spots left**. Terms are one sentence (**Free. You can
cancel up to Friday evening.**). Errors say what did not happen and what is still true: **We couldn't
cancel your spot. You're still going.**

## Do and don't

### Do
Show how full it is in words and in the meter.
```html
<aside class="rsvp" aria-labelledby="do-rsvp"><h3 class="rsvp__title" id="do-rsvp">Reserve a spot</h3><div class="rsvp__meter"><div class="progress" role="progressbar" aria-label="Spots taken" aria-valuenow="18" aria-valuemin="0" aria-valuemax="30" style="--ll-progress-value: 60%"><div class="progress__bar"></div></div><p>18 going · 12 spots left</p></div><div class="rsvp__actions"><button class="btn btn--primary btn--block" type="button">Reserve a spot</button></div></aside>
```

### Don't
Leave a full gathering with a dead button and no next step.
```html
<aside class="rsvp" aria-labelledby="dont-rsvp"><h3 class="rsvp__title" id="dont-rsvp">Reserve a spot</h3><div class="rsvp__actions"><button class="btn btn--primary btn--block" type="button" disabled>Reserve a spot</button></div></aside>
```

### Do
Make cancelling quiet and specific once someone is going.
```html
<aside class="rsvp rsvp--going" aria-labelledby="do-going"><h3 class="rsvp__title" id="do-going">You're going</h3><div class="rsvp__actions"><button class="btn btn--quiet btn--block" type="button">Add to calendar</button><button class="btn btn--text btn--block" type="button">Cancel my spot</button></div></aside>
```

### Don't
Make Cancel the loudest thing in the panel.
```html
<aside class="rsvp rsvp--going" aria-labelledby="dont-going"><h3 class="rsvp__title" id="dont-going">You're going</h3><div class="rsvp__actions"><button class="btn btn--danger btn--block" type="button">CANCEL</button></div></aside>
```

## Tokens

The panel reads the surface and hairline roles, `--color-accent-subtle` and `--color-accent` for the
going state, `--color-bg-subtle` when closed, the progress track and fill, and the status roles.

## Code

Use `aside.rsvp` with `__title`, a status line or `__text`, an optional `__meter` and `__actions`. Add
`rsvp--going` or `rsvp--closed` for those states and set `--ll-progress-value` on the bar. When adapting,
rename the `rsvp` classes and the `@component rsvp-panel` block together.
