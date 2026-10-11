---
title: Hero
tier: standard
order: 70
summary: Open a landing or welcome page with one calm promise, one sage action and a small, human photograph.
selector: .hero
target: .hero__actions .btn
states: default, focus
matrix-variants: centred
contrast: --color-fg-default|--color-bg-canvas|4.5; --color-fg-accent|--color-bg-canvas|4.5; --color-fg-muted|--color-bg-canvas|4.5; --color-fg-subtle|--color-bg-canvas|4.5; --color-fg-on-accent|--color-accent|4.5; --color-focus-ring|--color-bg-canvas|3
---

## Overview

Use the hero once, at the top of a landing, welcome or event page, to say what the place is for in one
sentence. It is the loudest type in the system — a light display face with one phrase turned sage — so it
appears **once per product surface**, never inside an app screen. Signed-in screens open with a
[page header](page-header.html) instead; a mid-page invitation is a [grain panel](panel.html).

## Anatomy

1. **Eyebrow** — optional overline that names the audience or the occasion, with its short hairline.
2. **Title** — the page's one `h1` in the display role, at most about 14 characters per line.
3. **Accent phrase** — one `em` inside the title, set in `--color-fg-accent`, never italic.
4. **Lead** — one or two sentences in the large body role, muted, within the reading measure.
5. **Actions** — one primary `lg` button and, optionally, one quiet `lg` button with a trailing arrow.
6. **Aside** — optional: a small square photograph with a two-part caption, and one short [quote](testimonial.html).

```html
<section class="hero hero--compact" aria-labelledby="hero-anatomy-title">
  <div>
    <p class="eyebrow">For small teams</p>
    <h1 class="hero__title" id="hero-anatomy-title">Do good work, <em>together.</em></h1>
    <p class="lead hero__lead">Projects, notes and gatherings in one calm place.</p>
    <div class="hero__actions">
      <a class="btn btn--primary btn--lg" href="#">Start a project</a>
      <a class="btn btn--quiet btn--lg" href="#">See how it works <svg class="btn__arrow icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></a>
    </div>
  </div>
  <div class="hero__aside">
    <figure class="photo photo--small">
      <div class="photo__frame"><img src="../assets/photos/coffee-together.jpg" width="480" height="480" alt="Two people talking over coffee at a wooden table"></div>
      <figcaption class="photo__caption"><span>Planning Field Day</span><span>Fri, 9:30 am</span></figcaption>
    </figure>
  </div>
</section>
```

## Variants

### promise
The full landing hero: promise, two actions, and an aside with a photograph and one quote. At 1024px and up
the aside sits to the right and aligns to the bottom of the text.
```html
<section class="hero" aria-labelledby="hero-promise-title">
  <div>
    <p class="eyebrow">For small teams who make things</p>
    <h1 class="hero__title" id="hero-promise-title">Do your best work, <em>alongside people you trust.</em></h1>
    <p class="lead hero__lead">{{app}} keeps a small team's projects, notes and gatherings in one calm place, so the week goes to making things, not chasing them.</p>
    <div class="hero__actions">
      <a class="btn btn--primary btn--lg" href="#">Start a project</a>
      <a class="btn btn--quiet btn--lg" href="#">See how it works <svg class="btn__arrow icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></a>
    </div>
  </div>
  <div class="hero__aside">
    <figure class="photo photo--small">
      <div class="photo__frame"><img src="../assets/photos/coffee-together.jpg" width="480" height="480" alt="Two people talking over coffee at a wooden table"></div>
      <figcaption class="photo__caption"><span>Planning Field Day</span><span>Fri, 9:30 am</span></figcaption>
    </figure>
    <blockquote class="quote">
      <img class="quote__photo" src="../assets/photos/grace-liu.jpg" width="56" height="56" alt="">
      <div>
        <p class="quote__text">“We stopped losing decisions in chat. Everything we agree on is in Harbour Notes by lunch.”</p>
        <p class="quote__by">Grace Liu · Designer, Northwind</p>
      </div>
    </blockquote>
  </div>
</section>
```

### centred
Text only, centred and compact (`hero--centred hero--compact`): for an event page, a welcome after sign-up
or a short campaign. The title steps down to the `h1` role.
```html
<section class="hero hero--centred hero--compact" aria-labelledby="hero-centred-title">
  <div>
    <p class="eyebrow">Field Day · Saturday 17 October</p>
    <h1 class="hero__title" id="hero-centred-title">A slow morning of <em>show and tell.</em></h1>
    <p class="lead hero__lead">Bring what you're working on. Coffee from 10:00 am, demos at 10:30, done by noon.</p>
    <div class="hero__actions">
      <button class="btn btn--primary btn--lg" type="button">Save my seat</button>
      <a class="btn btn--quiet btn--lg" href="#">Read the plan <svg class="btn__arrow icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></a>
    </div>
  </div>
</section>
```

### with stats
A compact hero followed by a [stat](stat.html) row that backs the promise with four real numbers.
```html
<div>
  <section class="hero hero--compact" aria-labelledby="hero-stats-title">
    <div>
      <p class="eyebrow">Northwind, one year in</p>
      <h1 class="hero__title" id="hero-stats-title">Quiet tools for <em>teams that ship.</em></h1>
      <p class="lead hero__lead">Twelve months of projects, notes and Field Days, and not one status meeting we missed.</p>
      <div class="hero__actions">
        <a class="btn btn--primary btn--lg" href="#">Read the year in review</a>
      </div>
    </div>
  </section>
  <ul class="stats" aria-label="Northwind in numbers">
    <li class="stats__item"><span class="stats__value">1,240</span><span class="stats__label">teams at work</span></li>
    <li class="stats__item"><span class="stats__value">38,600</span><span class="stats__label">notes in Harbour Notes</span></li>
    <li class="stats__item"><span class="stats__value">212</span><span class="stats__label">Field Days hosted</span></li>
    <li class="stats__item"><span class="stats__value">94%</span><span class="stats__label">come back each week</span></li>
  </ul>
</div>
```

## Sizes

Two sizes, set by modifier rather than a size scale: the **default** hero uses the display role and roomy
section padding (96px above at 1024px and up); **`hero--compact`** uses the `h1` role and roughly two thirds
of the padding, for event pages, welcome screens and heroes followed by stats. The photograph is capped at
`--size-photo-sm` (18rem) at every size.

## States

The hero itself is static; its actions carry the states. Hover deepens the primary pill and nudges the
quiet button's arrow; keyboard focus draws the sage ring around the focused action. The photograph eases
to 103% on pointer hover when motion is welcome.

## Responsive

- **360px:** one column. Eyebrow, title, lead and actions stack; actions wrap onto two lines at full
  label width; the aside follows the text with the photo at its natural width and the quote below it.
- **768px:** still one column, with wider measure. The two actions sit side by side.
- **1024px and up:** two columns (1.6fr and 1fr) with an 80px gap, aligned to the bottom so the photo's
  caption lines up with the actions. `hero--centred` stays one column at every width.

The display size is fluid (`clamp(2.75rem, 1.5rem + 5vw, 5.25rem)`), so the title never needs a manual break.

## Theming

Every colour reads a role: the title uses `--color-fg-default`, the accent phrase `--color-fg-accent`
(sage 700 in light, sage 300 in dark), the lead `--color-fg-muted`. The photo frame shows
`--color-bg-subtle` while the image loads, so a dark page never flashes a light square.

## Accessibility

**Role:** a `<section>` labelled by its title (`aria-labelledby`). The title is the page's one `<h1>`. The
photograph is a `<figure>` with a `<figcaption>`; the quote is a `<blockquote>`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves through the actions in reading order: primary first, then quiet. |
| Enter | Follows a link action; Enter or Space activates a button action. |

**Focus:** the shared 2px `--color-focus-ring`, offset 3px, around each action. Nothing else in the hero
takes focus.

**Labelling:** the `em` is visual emphasis only and is read as part of the title. The scene photo has a
descriptive `alt`; the quote portrait uses `alt=""` because the name sits beside it.

**Motion:** the photo's 103% scale and the arrow nudge run only under `prefers-reduced-motion: no-preference`;
with reduced motion the hero is completely still.

**Touch:** `lg` actions are 52px tall; wrapped actions keep a 12px gap so neighbouring targets never touch.

## Content

- Write the title as a **promise in plain words**, about 6 to 10 words: "Do your best work, alongside
  people you trust." Put the benefit, not the product name, in the accent phrase.
- The lead says who it is for and what they get, in one or two sentences under 30 words.
- The primary action is a verb and an object: **Start a project**, **Save my seat**. The quiet action
  invites a look: **See how it works**.
- Captions are two facts, place and time: "Planning Field Day · Fri, 9:30 am".

## Do and don't

### Do
One accent phrase that carries the benefit, and one primary action.
```html
<section class="hero hero--centred hero--compact" aria-label="Welcome"><div><h1 class="hero__title">Your notes, <em>finally in one place.</em></h1><div class="hero__actions"><a class="btn btn--primary btn--lg" href="#">Open Harbour Notes</a></div></div></section>
```

### Don't
Accenting the whole title, or adding a second primary action, leaves nothing to notice first.
```html
<section class="hero hero--centred hero--compact" aria-label="Welcome"><div><h1 class="hero__title"><em>Your notes, finally in one place.</em></h1><div class="hero__actions"><a class="btn btn--primary btn--lg" href="#">Open notes</a><a class="btn btn--primary btn--lg" href="#">Start a project</a></div></div></section>
```

### Do
A small, real photograph with a place-and-time caption.
```html
<div class="photo photo--small"><div class="photo__frame"><img src="../assets/photos/coffee-together.jpg" width="480" height="480" alt="Two people talking over coffee at a wooden table"></div><p class="photo__caption"><span>Planning Field Day</span><span>Fri, 9:30 am</span></p></div>
```

### Don't
A vague, salesy title with no audience and no promise.
```html
<section class="hero hero--compact" aria-label="Welcome"><div><h1 class="hero__title">The future of <em>synergy.</em></h1><p class="lead hero__lead">Revolutionise your workflow today!</p></div></section>
```

## Tokens

The hero reads the display and `h1` type roles, the accent text role, the section padding scale and the
photo size token. The quote in the aside reads its own tokens from [Testimonial and verse](testimonial.html).

## Code

Use `.hero` with a text column and, optionally, `.hero__aside`. Add `hero--centred` for a single centred
column and `hero--compact` for the smaller title and padding. Keep exactly one `em` in the title.
