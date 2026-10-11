---
title: Grain panel
tier: standard
order: 72
summary: The signature invitation: a warm clay panel with a whisper of wood grain that asks for one considered next step.
selector: .panel
target: .btn--primary
states: default, hover
matrix-variants: compact, without grain
contrast: --color-fg-default|--color-bg-panel|4.5; --color-fg-muted|--color-bg-panel|4.5; --color-fg-subtle|--color-bg-panel|4.5; --color-fg-on-accent|--color-accent|4.5; --color-fg-default|--color-bg-surface|4.5; --color-focus-ring|--color-bg-panel|3
---

## Overview

The grain panel is the Banaro look in one component: a clay-tinted surface (`--color-bg-panel`) with large
rounded corners and a barely-there wood grain, holding a short invitation and one primary action. Use it
for the **one** moment on a screen that deserves a pause: turning on a digest, saving a seat, inviting the
team. The grain is **decorative and used at most once per screen**; a second panel on the same screen drops
it. For a routine message use an [alert](alert.html) or a [card](card.html); for the page's opening promise
use the [hero](hero.html).

## Anatomy

1. **Panel** — `.panel`: `--color-bg-panel`, `--radius-xl`, generous padding (48px, 80px by 64px from 1024px).
2. **Grain** — `.grain`: a `::before` layer of fractal-noise wood grain in `--color-grain`, masked and tiled at 900 × 420px, at 9% opacity in light and 6% in dark. It never carries meaning.
3. **Eyebrow** — optional overline naming the feature.
4. **Title** — `.panel__title`, a short question or invitation in the `h2` role, about 16 characters a line.
5. **Text** — `.panel__text`, one or two muted sentences that say exactly what happens next.
6. **Actions** — `.panel__actions`: one primary `lg` button and an optional `.panel__note` of social proof.
7. **Example list** — optional `.panel__list` of `.panel__item` rows (40px photo, text, `.panel__meta`) that shows what the invitation leads to.

```html
<div class="panel grain">
  <div class="panel__grid">
    <div>
      <p class="eyebrow">Weekly digest</p>
      <h3 class="panel__title">Start the week knowing what moved.</h3>
      <p class="panel__text">Every Monday at 8:00 am, {{app}} gathers the three changes in Northwind worth your attention, and nothing more.</p>
      <div class="panel__actions"><button class="btn btn--primary btn--lg" type="button">Turn on the digest</button><span class="panel__note">Read by 1,240 teams</span></div>
    </div>
    <div>
      <p class="eyebrow">A Monday, for example</p>
      <ul class="panel__list">
        <li class="panel__item"><img src="../assets/photos/daniel-reyes.jpg" width="40" height="40" alt=""><p><strong>Daniel Reyes</strong>Shipped the Northwind sync fix</p><span class="panel__meta">Mon</span></li>
      </ul>
    </div>
  </div>
</div>
```

## Variants

### invitation
The full panel: the invitation on one side, a short example list on the other. At 1024px and up the two
sides sit in a 1.2fr / 1fr grid with an 80px gap.
```html
<section class="panel grain" aria-labelledby="digest-title">
  <div class="panel__grid">
    <div>
      <p class="eyebrow">Weekly digest</p>
      <h3 class="panel__title" id="digest-title">Start the week knowing what moved.</h3>
      <p class="panel__text">Every Monday at 8:00 am, {{app}} gathers the three changes in Northwind worth your attention, and nothing more.</p>
      <div class="panel__actions">
        <button class="btn btn--primary btn--lg" type="button">Turn on the digest</button>
        <span class="panel__note">Read by 1,240 teams</span>
      </div>
    </div>
    <div>
      <p class="eyebrow">A Monday, for example</p>
      <ul class="panel__list">
        <li class="panel__item"><img src="../assets/photos/daniel-reyes.jpg" width="40" height="40" alt=""><p><strong>Daniel Reyes</strong>Shipped the Northwind sync fix</p><span class="panel__meta">Mon</span></li>
        <li class="panel__item"><img src="../assets/photos/grace-liu.jpg" width="40" height="40" alt=""><p><strong>Grace Liu</strong>Left four notes on the onboarding draft</p><span class="panel__meta">Mon</span></li>
        <li class="panel__item"><img src="../assets/photos/hannah-kowalski.jpg" width="40" height="40" alt=""><p><strong>Hannah Kowalski</strong>Shared interview findings in Harbour Notes</p><span class="panel__meta">Mon</span></li>
      </ul>
    </div>
  </div>
</section>
```

### compact
`panel--compact`: text and actions only, with tighter padding. For an invitation inside a page section or
at the end of a detail screen.
```html
<section class="panel panel--compact grain" aria-labelledby="fieldday-title">
  <p class="eyebrow">Field Day · Sat 17 Oct</p>
  <h3 class="panel__title" id="fieldday-title">Save a seat at Field Day.</h3>
  <p class="panel__text">A slow morning of demos and coffee. Doors at 10:00 am; 14 people are going.</p>
  <div class="panel__actions">
    <button class="btn btn--primary btn--lg" type="button">Save my seat</button>
    <a class="btn btn--quiet btn--lg" href="#">See the plan</a>
  </div>
</section>
```

### without grain
`.panel` alone: the same warm surface with no grain, for the second panel on a screen or a quieter
closing note.
```html
<section class="panel panel--compact" aria-labelledby="invite-title">
  <h3 class="panel__title" id="invite-title">Bring the team into Harbour Notes.</h3>
  <p class="panel__text">Notes are better with readers. Amara, Daniel and Grace haven't joined yet.</p>
  <div class="panel__actions">
    <button class="btn btn--primary" type="button">Invite three people</button>
    <span class="panel__note">They'll get one email, nothing more.</span>
  </div>
</section>
```

## Sizes

Two sizes by modifier: the **default** panel (48px by 24px padding, 80px by 64px from 1024px) for a full
invitation with an example list, and **`panel--compact`** (32px by 24px, 40px from 1024px) for text and
actions only. The panel always fills its container's width.

## States

The panel is static; its action carries the states. Hover deepens the primary pill, focus draws the sage
ring, and each `.panel__item` lifts 3px with a soft shadow under the pointer when motion is welcome. While
the action is working, the button shows its own busy state; the panel never dims.

## Responsive

- **360px:** one column with 24px side padding. The example list follows the actions; actions wrap and
  the note drops under the button.
- **768px:** still one column, with the title on two lines and wider text.
- **1024px and up:** the invitation and the list sit side by side (1.2fr / 1fr), vertically centred, with
  80px between them. The grain tile stays 900 × 420px at every width, so it never stretches or blurs.

## Theming

The panel reads `--color-bg-panel` (clay 100 in light, night 850 in dark) and the grain reads
`--color-grain` at `--grain-opacity`: clay 500 at **9%** in light, clay 300 at **6%** in dark. Example items
sit on `--color-bg-surface` with `--shadow-1`. Adjust the grain only through those tokens; never paint it
with an image or a raw colour.

## Accessibility

**Role:** a `<section>` labelled by the panel title. The grain is a CSS pseudo-element with
`pointer-events: none`, so it is invisible to assistive technology and never intercepts a click.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to the primary action, then any secondary action. Example items are not focusable. |
| Enter, Space | Activates the focused action. |

**Focus:** the shared 2px `--color-focus-ring` stays above 3:1 on the clay panel in both themes.

**Labelling:** example portraits use `alt=""` because the name is written beside them. The title states the
offer, so the button can stay short.

**Motion:** the example items' 3px lift runs only under `prefers-reduced-motion: no-preference`. The grain
never moves.

**Touch:** `lg` actions are 52px tall; the note is plain text, not a target.

## Content

- The title is a question or an invitation, under 40 characters: "Start the week knowing what moved."
- The text says what happens and when: "Every Monday at 8:00 am, …". No exclamation marks.
- The action names the outcome: **Turn on the digest**, **Save my seat**.
- The note is one honest fact of social proof: "Read by 1,240 teams". Leave it out rather than invent one.

## Do and don't

### Do
One grain panel, with one primary action.
```html
<section class="panel panel--compact grain" aria-label="Digest"><h3 class="panel__title">Start the week knowing what moved.</h3><div class="panel__actions"><button class="btn btn--primary btn--lg" type="button">Turn on the digest</button></div></section>
```

### Don't
Two grain panels stacked turn a signature into wallpaper; drop the grain on the second.
```html
<div class="stack"><section class="panel panel--compact grain" aria-label="Digest"><h3 class="panel__title">Turn on the digest.</h3></section><section class="panel panel--compact grain" aria-label="Field Day"><h3 class="panel__title">Save a seat at Field Day.</h3></section></div>
```

### Do
Show what the invitation leads to with two or three real examples.
```html
<ul class="panel__list"><li class="panel__item"><img src="../assets/photos/grace-liu.jpg" width="40" height="40" alt=""><p><strong>Grace Liu</strong>Left four notes on the onboarding draft</p><span class="panel__meta">Mon</span></li><li class="panel__item"><img src="../assets/photos/hannah-kowalski.jpg" width="40" height="40" alt=""><p><strong>Hannah Kowalski</strong>Shared interview findings</p><span class="panel__meta">Mon</span></li></ul>
```

### Don't
Use the panel for an error or a warning; the warm surface reads as an invitation, not a problem.
```html
<section class="panel panel--compact grain" aria-label="Sync"><h3 class="panel__title">Sync failed.</h3><p class="panel__text">Northwind could not reach the server.</p></section>
```

## Tokens

The panel reads `--color-bg-panel`, `--color-grain`, `--grain-opacity`, `--grain-tile-width` and
`--grain-tile-height`, the `h2` type role, `--radius-xl` and the shadow scale for example items.

## Code

Put `.grain` on the panel only when it is the single signature moment on the screen. The panel creates its
own stacking context (`isolation: isolate`), so the grain stays behind the content without a z-index on
the children.
