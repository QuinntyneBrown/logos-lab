---
title: Testimonial and verse
tier: standard
order: 73
summary: Let a real person speak: a small quote card with a portrait, or one centred line set like a verse between sections.
selector: .quote, .verse
states: default
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-fg-default|--color-bg-canvas|4.5; --color-fg-subtle|--color-bg-canvas|4.5; --color-accent|--color-bg-canvas|3
---

## Overview

Two quiet ways to quote someone. The **quote** is a small surface card with a square portrait, the words
and who said them; it sits beside a [hero](hero.html) or in a row of three. The **verse** is one centred line
in the light display face with a short sage rule above it; it marks a pause between two page sections,
once per page at most. Neither is interactive. To show a person's profile use a
[person list](person-list.html); to show a comment in a thread use a [comment](comment.html).

## Anatomy

1. **Portrait** — `.quote__photo`, a 56px square photo with `--radius-md`; decorative (`alt=""`).
2. **Words** — `.quote__text` in the body role, wrapped in curly quotation marks.
3. **Attribution** — `.quote__by`, a caption with name · role, organisation.
4. **Rule** — `.verse__rule`, a 40px hairline in `--color-accent`, decorative.
5. **Verse text** — `.verse__text`, light display face, 28px (36px from 1024px), at most 30 characters a line.
6. **Reference** — `.verse__ref`, an overline naming the speaker and the occasion.

```html
<blockquote class="quote">
  <img class="quote__photo" src="../assets/photos/grace-liu.jpg" width="56" height="56" alt="">
  <div>
    <p class="quote__text">“We stopped losing decisions in chat. Everything we agree on is in Harbour Notes by lunch.”</p>
    <p class="quote__by">Grace Liu · Designer, Northwind</p>
  </div>
</blockquote>
```

## Variants

### quote
A single quote card: portrait, words and attribution.
```html
<blockquote class="quote">
  <img class="quote__photo" src="../assets/photos/grace-liu.jpg" width="56" height="56" alt="">
  <div>
    <p class="quote__text">“We stopped losing decisions in chat. Everything we agree on is in Harbour Notes by lunch.”</p>
    <p class="quote__by">Grace Liu · Designer, Northwind</p>
  </div>
</blockquote>
```

### verse
One centred line between sections, with the sage rule above and the reference below.
```html
<section class="verse" aria-label="A word from Field Day">
  <span class="verse__rule" aria-hidden="true"></span>
  <p class="verse__text">“Make the work visible, keep the meetings short, and always leave room for coffee.”</p>
  <p class="verse__ref">Hannah Kowalski · Field Day 2025</p>
</section>
```

### quote row
Three quotes in a responsive [grid](layout.html): one column on phones, three across on wide screens.
```html
<div class="grid">
  <blockquote class="quote">
    <img class="quote__photo" src="../assets/photos/daniel-reyes.jpg" width="56" height="56" alt="">
    <div><p class="quote__text">“I read the Monday digest before my coffee is cold. That's the whole review.”</p><p class="quote__by">Daniel Reyes · Engineer</p></div>
  </blockquote>
  <blockquote class="quote">
    <img class="quote__photo" src="../assets/photos/hannah-kowalski.jpg" width="56" height="56" alt="">
    <div><p class="quote__text">“Interview notes finally live next to the decisions they changed.”</p><p class="quote__by">Hannah Kowalski · Researcher</p></div>
  </blockquote>
  <blockquote class="quote">
    <img class="quote__photo" src="../assets/photos/amara-osei.jpg" width="56" height="56" alt="">
    <div><p class="quote__text">“Planning Field Day took one page instead of forty messages.”</p><p class="quote__by">Amara Osei · Product designer</p></div>
  </blockquote>
</div>
```

## Sizes

N/A: one content-driven size. The quote card fills its column; the verse is centred and capped at
the verse measure (30 characters), stepping up from 28px to 36px at 1024px.

## States

Both are passive content with no interactive states. A quote never links as a whole; if the speaker has a
profile, link their name inside `.quote__by` and it follows the [link](link.html) states.

## Responsive

- **360px:** the quote keeps its portrait beside the words (56px column); long quotes wrap under the
  portrait's height. The verse wraps to four or five short lines and its top padding stays at the section gap.
- **768px:** a quote row shows one or two cards per line, depending on the container.
- **1024px and up:** the verse text steps up to 36px; a quote row fits three cards across a full-width
  container.

## Theming

The quote card reads `--color-bg-surface` and `--color-border-default`; the verse sits directly on the page
canvas. The rule reads `--color-accent`, sage in both themes. Portraits keep their own colours in dark mode;
the card's border separates them from the canvas.

## Accessibility

**Role:** a `<blockquote>` for each quote. The verse is a `<section>` with an `aria-label` that names the
occasion, so it appears in the landmarks list only when it adds meaning; its rule is `aria-hidden="true"`.

**Focus:** neither component takes focus. Any link inside the attribution uses the shared focus ring.

**Labelling:** the portrait uses `alt=""` because the speaker's name is in the attribution; never repeat the
name in `alt`. Use real curly quotation marks so screen readers announce the words naturally.

**Motion:** none. The verse may use the page's scroll-driven `.reveal` drift, which is off under reduced motion.

**Touch:** no targets, apart from an optional name link in the attribution.

## Content

- Quote real people, with their permission, in their own words. Keep it under 25 words and specific:
  "Everything we agree on is in Harbour Notes by lunch", not "Great product!".
- Attribution is **name · role, organisation**. Drop the organisation rather than invent one.
- A verse is one sentence of encouragement or a principle the team lives by, under 20 words, with a
  reference that names the speaker and occasion: "Hannah Kowalski · Field Day 2025".
- One verse per page. Never use a verse for marketing claims.

## Do and don't

### Do
A specific line, from a named person, with a real portrait.
```html
<blockquote class="quote"><img class="quote__photo" src="../assets/photos/daniel-reyes.jpg" width="56" height="56" alt=""><div><p class="quote__text">“I read the Monday digest before my coffee is cold. That's the whole review.”</p><p class="quote__by">Daniel Reyes · Engineer, Northwind</p></div></blockquote>
```

### Don't
Generic praise with an anonymous attribution reads as invented.
```html
<blockquote class="quote"><img class="quote__photo" src="../assets/photos/peter-walsh.jpg" width="56" height="56" alt=""><div><p class="quote__text">“Amazing!!! Best tool ever, 10/10.”</p><p class="quote__by">A happy customer</p></div></blockquote>
```

### Do
One short verse, centred, between two sections.
```html
<section class="verse" aria-label="A word from the team"><span class="verse__rule" aria-hidden="true"></span><p class="verse__text">“Small steps, written down, add up.”</p><p class="verse__ref">Grace Liu · Northwind retro</p></section>
```

### Don't
A long paragraph set as a verse loses the pause and becomes hard to read.
```html
<section class="verse" aria-label="About us"><span class="verse__rule" aria-hidden="true"></span><p class="verse__text">“Our platform empowers teams of every size to collaborate, plan, track, share and ship faster than ever before, across every device and timezone.”</p></section>
```

## Tokens

The quote reads the surface, border and caption roles, `--size-quote-photo` and `--radius-lg`. The verse
reads the display family, `--layout-measure-verse`, `--layout-section-gap` and `--color-accent` for the rule.
