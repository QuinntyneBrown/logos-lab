---
title: Spinner
tier: core
order: 64
summary: Say "working on it" for a moment of unknown length. A small open ring in the text colour, always beside words.
selector: .spinner
layout: inline
target: .spinner
states: default
sizes: sm, md, lg
size-class: spinner--{size}
contrast: --color-fg-default|--color-bg-surface|3; --color-fg-on-accent|--color-accent|3; --color-fg-muted|--color-bg-surface|4.5
---

## Overview

Use a spinner for a short wait of unknown length that belongs to one control or one region: a button
that is saving, a list that is refreshing, a panel loading its first content. It inherits the text colour,
so it works on any surface. Use a [skeleton](skeleton.html) when the layout of the coming content is
known (pages, cards, lists); use a [progress bar](progress-bar.html) when the work can be measured. Never
use a spinner for a whole page.

## Anatomy

1. **Ring** — a circle with a 2px border in `currentColor` and one open quarter.
2. **Label** — the words that say what is loading, visible or in a `.vh` span. A spinner is never on its own.

```html
<p class="inline-status" role="status"><span class="spinner" aria-hidden="true"></span>Loading Harbour Notes…</p>
```

## Variants

### quiet
The ring alone on screen, with the label for screen readers only. Use where the context already says what is loading.
```html
<span role="status"><span class="spinner" aria-hidden="true"></span><span class="vh">Loading comments</span></span>
```

### with label
The ring and the words side by side, in muted small text.
```html
<p class="inline-status" role="status"><span class="spinner" aria-hidden="true"></span>Loading Harbour Notes…</p>
```

### in a button
A busy button keeps its width, puts the spinner first and says what it is doing. See [button](button.html).
```html
<button class="btn btn--primary" type="button" aria-busy="true"><span class="spinner" aria-hidden="true"></span>Saving…</button>
```

### region
A larger ring centred in a panel that is loading its first content.
```html
<div class="spinner-region" role="status"><span class="spinner spinner--lg" aria-hidden="true"></span>Loading the Field Day agenda…</div>
```

## Sizes

`sm` (16px, the default) sits inside buttons and text; `md` (24px) next to a heading or in a toolbar;
`lg` (32px, with a thicker ring) in an empty panel. Match the spinner to the text beside it, not to the
size of the wait.

## States

A spinner has one state: turning. It appears only after about 300ms, so quick responses never flash a
spinner, and once shown it stays for at least 500ms so it does not flicker. When the work ends, the
spinner is replaced by the content or by a result message.

## Responsive

N/A: a spinner keeps its size at every width; the region variant centres in whatever space it has.

## Theming

The ring uses `currentColor`, so it follows its context: the default text colour on a surface,
`--color-fg-on-accent` inside a primary button, muted text inside an inline message. Nothing changes in
dark mode except the inherited colour.

## Accessibility

**Role:** the spinner itself is `aria-hidden="true"`. The words go in a `role="status"` container that is
already in the page, so the change to "Loading…" and then to the result is announced politely. The region
being loaded carries `aria-busy="true"`.

**Focus:** a spinner is not a focus stop. A busy button keeps focus and its name; do not disable it
mid-click, or focus is lost.

**Labelling:** say what is loading — "Loading comments", not "Loading". Inside a button, the label changes
to the ongoing verb ("Saving…") and the button sets `aria-busy="true"`.

**Motion:** the ring turns once every 1.2 seconds. Under reduced motion it stops as an open ring, and the
words still say that something is happening.

**Touch:** N/A: a spinner is never a target; the button around it keeps its own size.

## Content

Name the thing and use the ellipsis character: **Loading Harbour Notes…**, **Saving…**, **Sending your
invitation…**. Avoid "Please wait" and jokes. If a wait passes 10 seconds, replace the label with what is
happening and what to do: **Still working on it. You can leave this page; we'll email you.**

## Do and don't

### Do
Always pair the spinner with words.
```html
<p class="inline-status" role="status"><span class="spinner" aria-hidden="true"></span>Loading 14 open tasks…</p>
```

### Don't
A bare ring tells nobody what is happening.
```html
<span class="spinner spinner--lg" aria-hidden="true"></span>
```

### Do
Keep the button's label and width while it works.
```html
<button class="btn btn--primary" type="button" aria-busy="true"><span class="spinner" aria-hidden="true"></span>Sending invitation…</button>
```

### Don't
Swapping the label for a spinner makes the button shrink and lose its name.
```html
<button class="btn btn--primary" type="button" aria-label="Send invitation"><span class="spinner" aria-hidden="true"></span></button>
```

## Tokens

The spinner reads the spacing scale for its sizes, `--border-width-thick` and `--border-width-heavy` for
the ring, and `--duration-deliberate` for one turn.

## Code

Use `<span class="spinner" aria-hidden="true">` beside text inside a `role="status"` element. Add
`spinner--md` or `spinner--lg` for size, and wrap a panel's loading message in `.spinner-region`.
