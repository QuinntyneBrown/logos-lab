---
title: Consent banner
tier: standard
order: 98
summary: The cookie consent card on a first visit: one plain sentence and three equal choices, Accept all, Reject non-essential and Customize.
selector: .consent
layout: block
target: .consent__actions .btn
states: default, hover, focus
matrix-variants: banner
matrix-cell: 26rem
contrast: --color-fg-default|--color-bg-surface-raised|4.5; --color-fg-muted|--color-bg-surface-raised|4.5; --color-focus-ring|--color-bg-surface-raised|3
---

## Overview

The consent banner asks a visitor once whether {{app}} may use non-essential cookies (analytics). It
floats over the bottom of the page until they choose, and it does not block reading. The three choices
have **equal prominence** (L2-115): the same quiet button style, the same size, so rejecting is as easy
as accepting. **Customize** opens the choices in place. For product announcements use an
[alert](alert.html); for a confirmation use a [toast](toast.html).

## Anatomy

1. **Banner**: `div.consent`, a raised card fixed to the bottom of the viewport, 12px from the edges on a phone and a `--size-consent` card at the bottom right from 768px. `consent--inline` puts it in flow (settings page, documentation).
2. **Title**: `__title`, "Cookies on {{app}}".
3. **Text**: `__text`, one or two sentences and a link to the privacy policy.
4. **Actions**: `__actions`, three quiet buttons that share the row equally.

## Variants

### banner
The first-visit banner.
```html
<div class="consent consent--inline" role="region" aria-labelledby="cb-title"><p class="consent__title" id="cb-title">Cookies on {{app}}</p><p class="consent__text">We use essential cookies to keep you signed in. With your permission we also use analytics cookies to learn which courses help people. <a href="#">Privacy policy</a></p><div class="consent__actions"><button class="btn btn--quiet" type="button">Accept all</button><button class="btn btn--quiet" type="button">Reject non-essential</button><button class="btn btn--quiet" type="button">Customize</button></div></div>
```

### customize
Customize opens the categories in the same card; essential cookies are always on.
```html
<div class="consent consent--inline" role="region" aria-labelledby="cb-c-title"><p class="consent__title" id="cb-c-title">Choose your cookies</p><div class="switch"><div><label class="switch__title" for="cb-essential">Essential</label><p class="switch__text" id="cb-essential-text">Keep you signed in and remember this choice. Always on.</p></div><input class="switch__control" id="cb-essential" type="checkbox" role="switch" aria-describedby="cb-essential-text" checked disabled></div><div class="switch"><div><label class="switch__title" for="cb-analytics">Analytics</label><p class="switch__text" id="cb-analytics-text">Count visits and lesson completions so we can improve courses. No advertising.</p></div><input class="switch__control" id="cb-analytics" type="checkbox" role="switch" aria-describedby="cb-analytics-text"></div><div class="consent__actions"><button class="btn btn--quiet" type="button">Save choices</button><button class="btn btn--quiet" type="button">Back</button></div></div>
```

## Sizes

N/A: one size; `--size-consent` wide from 768px, full width less the margins below that.

## States

Hover and focus are the buttons' own. The three buttons never change weight relative to each other: none
is primary, none is a text link. After a choice the banner goes away and does not return until the policy
changes; the choice can be changed later in Privacy and messaging settings.

## Responsive

Under 768px the banner spans the bottom of the screen with a 12px margin and the three buttons wrap to
fill the row, each at least as wide as its label. From 768px it is a card at the bottom right. Page
content stays scrollable beneath it at every width.

## Accessibility

**Role:** a `region` named by its title. It is not a modal: focus is not trapped and the page stays usable.
It comes first in the tab order after the skip link so keyboard users meet it early.

| Key | Effect |
|---|---|
| Tab | Moves through the privacy link and the three buttons. |
| Enter or Space | Makes the choice and closes the banner. |

**Focus:** after a choice, focus moves to the skip link (or the top of the page), never lost to the body.

**Labelling:** button labels are full phrases; the switches in Customize each have a label and a
description.

**Motion:** the banner rises in once; under reduced motion it appears without movement.

**Touch:** buttons are full-size 44px pills that share the row.

## Content

Say what cookies do in plain words, without legal language: **We use essential cookies to keep you signed
in.** Name the choices as actions: **Accept all**, **Reject non-essential**, **Customize**. Never use
"Got it", "Maybe later" or guilt ("Help us improve!").

## Do and don't

### Do
Give the three choices the same style and size.
```html
<div class="consent__actions"><button class="btn btn--quiet" type="button">Accept all</button><button class="btn btn--quiet" type="button">Reject non-essential</button><button class="btn btn--quiet" type="button">Customize</button></div>
```

### Don't
Make accepting primary and rejecting a text link.
```html
<div class="consent__actions"><button class="btn btn--primary" type="button">Accept all</button><button class="btn btn--text btn--sm" type="button">Reject</button></div>
```

### Do
Say what analytics cookies are for.
```html
<div class="consent consent--inline" role="region" aria-labelledby="cb-do-title"><p class="consent__title" id="cb-do-title">Cookies on {{app}}</p><p class="consent__text">With your permission we use analytics cookies to learn which courses help people.</p></div>
```

### Don't
Ask for consent with a vague dismissal.
```html
<div class="consent consent--inline" role="region" aria-labelledby="cb-dont-title"><p class="consent__title" id="cb-dont-title">We value your privacy</p><div class="consent__actions"><button class="btn btn--quiet" type="button">Got it</button></div></div>
```
