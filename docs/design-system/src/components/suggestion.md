---
title: Suggestion
tier: sample
order: 93
summary: A sample domain card that suggests a person to meet, kept as a reference. Who they are, a plain reason why, and two calm choices.
selector: .suggest
layout: block
target: .btn--primary
states: default, focus, loading, accepted, passed
matrix-variants: person
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-fg-default|--color-bg-subtle|4.5; --color-fg-accent|--color-bg-surface|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

**This is a sample component.** It comes from the original Banaro domain (suggesting people to work
with) and ships as a worked example of a recommendation card, not as part of every system. An app should
either prune it (`audit_usage.py --prune` removes it when no mock uses `.suggest`) or adapt it for its
own recommendations (a course to take next, a note to revisit) by copying the block and renaming the
classes. Keep the reason box whatever you adapt it to: a suggestion without a "why" feels like a guess.
For a plain list of people use a [person list](person-list.html).

## Anatomy

1. **Card** — a surface with a hairline border (`.suggest`); linen when suggestions are paused (`--paused`).
2. **Person** — a 48px portrait, the name as a link and one line of context (`__who`, `__name`, `__meta`).
3. **Score** — optional: how strong the fit is, in the display face (`__score`).
4. **Reason** — a linen box that says in one or two sentences why (`__why`).
5. **Actions** — one primary choice and one quiet pass (`__actions`).

## Variants

### person
The suggestion: who, why, and two choices.
```html
<article class="suggest" aria-labelledby="sg-daniel"><div class="suggest__who"><img class="avatar avatar--md" src="../assets/photos/daniel-reyes.jpg" width="48" height="48" alt=""><div><h3 class="suggest__name" id="sg-daniel"><a href="#">Daniel Reyes</a></h3><p class="suggest__meta">Engineer · works on Northwind</p></div></div><p class="suggest__why"><strong>Why Daniel.</strong> You both wrote about offline sync in Harbour Notes, and he is looking for a designer.</p><div class="suggest__actions"><button class="btn btn--primary btn--sm" type="button">Introduce yourself</button><button class="btn btn--quiet btn--sm" type="button">Not now</button></div></article>
```

### scored
With a fit score in the corner, for lists sorted by fit.
```html
<article class="suggest" aria-labelledby="sg-noah"><div class="suggest__who"><img class="avatar avatar--md" src="../assets/photos/noah-fischer.jpg" width="48" height="48" alt=""><div><h3 class="suggest__name" id="sg-noah"><a href="#">Noah Fischer</a></h3><p class="suggest__meta">Engineer · free on Thursdays</p></div><p class="suggest__score"><strong>92%</strong>fit</p></div><p class="suggest__why"><strong>Why Noah.</strong> He has built two offline-first apps and asked to pair on gestures for Northwind.</p><div class="suggest__actions"><button class="btn btn--primary btn--sm" type="button">Introduce yourself</button><button class="btn btn--quiet btn--sm" type="button">Not now</button></div></article>
```

### initials
No photo: initials on a tile, same 48px.
```html
<article class="suggest" aria-labelledby="sg-hannah"><div class="suggest__who"><span class="avatar-initials avatar--md tile--clay" aria-hidden="true">HK</span><div><h3 class="suggest__name" id="sg-hannah"><a href="#">Hannah Kowalski</a></h3><p class="suggest__meta">Researcher · joined in September</p></div></div><p class="suggest__why"><strong>Why Hannah.</strong> She ran the interviews for Harbour Notes and wants to try them on a planning tool.</p><div class="suggest__actions"><button class="btn btn--primary btn--sm" type="button">Introduce yourself</button><button class="btn btn--quiet btn--sm" type="button">Not now</button></div></article>
```

### paused
The person has paused suggestions: no one is shown, and turning them back on is one step.
```html
<section class="suggest suggest--paused" aria-labelledby="sg-paused"><h3 class="suggest__title" id="sg-paused">Suggestions are paused</h3><p class="suggest__text">You paused them on Mon 5 Oct. Nobody sees you in their suggestions while they are off.</p><div class="suggest__actions"><button class="btn btn--quiet btn--sm" type="button">Turn suggestions back on</button></div></section>
```

## Sizes

N/A: One size. Cards fill their grid column; use `.btn--sm` for the actions so two fit on one line at 360px.

## States

Focus rings the primary action. **Loading** keeps the label and adds a spinner while the introduction is
sent. **Accepted** replaces the choices with a success line and a link to the new conversation.
**Passed** collapses the card to one quiet line with **Undo**, so a mis-tap is easy to take back.

### accepted
```html
<article class="suggest" aria-labelledby="sg-daniel-yes"><div class="suggest__who"><img class="avatar avatar--md" src="../assets/photos/daniel-reyes.jpg" width="48" height="48" alt=""><div><h3 class="suggest__name" id="sg-daniel-yes"><a href="#">Daniel Reyes</a></h3><p class="suggest__meta">Engineer · works on Northwind</p></div></div><p class="inline-status inline-status--success" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Introduction sent to Daniel</p><div class="suggest__actions"><a class="btn btn--quiet btn--sm" href="#">Open the conversation</a></div></article>
```

### passed
```html
<article class="suggest suggest--paused" aria-labelledby="sg-daniel-no"><p class="suggest__text" id="sg-daniel-no" role="status">You passed on Daniel Reyes. We won't suggest him again.</p><div class="suggest__actions"><button class="btn btn--text btn--sm" type="button">Undo</button></div></article>
```

## Responsive

At 360px the portrait, name and score share one row and the two actions sit side by side below the
reason. From 768px suggestions sit two to a row in a [grid](layout.html); at 1024px and up, three. The
reason box always spans the card.

## Accessibility

**Role:** each suggestion is an `<article>` labelled by the person's name; a paused panel is a `<section>` labelled by its title.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves from the name link to the two choices. |
| Enter, Space | Activates the focused choice. |

**Focus:** after accepting or passing, focus moves to the new status line's action (Open the conversation, or Undo).

**Labelling:** the portrait is decorative (`alt=""`); the name heading names the card. The score is text
("92% fit"). Results use `role="status"` so they are announced without stealing focus. Choice labels say
what happens: **Introduce yourself**, **Not now**.

**Motion:** the passed card collapses without animation under reduced motion.

**Touch:** small 36px pills with 12px between them; never put the two choices closer.

## Content

The reason starts with "Why" and the first name, then one or two plain, specific sentences drawn from
what the two people share: **Why Daniel.** *You both wrote about offline sync in Harbour Notes.* Never
show raw signals ("Overlap score 0.87"). Passing is gentle: **Not now**, and the result says what it means:
**We won't suggest him again.**

## Do and don't

### Do
Give a concrete reason drawn from what they share.
```html
<p class="suggest__why"><strong>Why Daniel.</strong> You both wrote about offline sync in Harbour Notes, and he is looking for a designer.</p>
```

### Don't
Show a bare number as the only reason.
```html
<p class="suggest__why">Match score: 0.87</p>
```

### Do
Make passing quiet and reversible.
```html
<div class="suggest__actions"><button class="btn btn--primary btn--sm" type="button">Introduce yourself</button><button class="btn btn--quiet btn--sm" type="button">Not now</button></div>
```

### Don't
Use a red "Reject" for an ordinary pass.
```html
<div class="suggest__actions"><button class="btn btn--primary btn--sm" type="button">Accept</button><button class="btn btn--danger btn--sm" type="button">Reject</button></div>
```

## Tokens

Suggestions read the surface and subtle backgrounds, the text roles, `--color-fg-accent` for the score
and the success role for the accepted line.

## Code

Use `.suggest` with `__who` (portrait, name and meta, optional `__score`), `__why` and `__actions`. Add
`suggest--paused` for the paused panel and the passed line. When adapting, rename the `suggest` classes and
the `@component suggestion` block together.
