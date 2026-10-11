---
title: Progress bar
tier: core
order: 63
summary: Show how far along a task is when you can measure it. A thin sage line on a hairline track, with the words above it.
selector: .progress
layout: block
target: .progress
states: default, loading
matrix-variants: determinate, bare, steps
knobs: --ll-progress-value = `0%`; set it on `.progress` to the current percentage
contrast: --color-accent|--color-border-default|3; --color-accent|--color-bg-surface|3; --color-success-solid|--color-bg-surface|3; --color-danger-solid|--color-bg-surface|3; --color-fg-default|--color-bg-surface|4.5
---

## Overview

Use a progress bar for work with a known size — an upload, an import, a setup checklist, a profile that
is 80% complete. When you cannot measure the work, use the indeterminate bar for a region or a
[spinner](spinner.html) for a control. For steps people move through themselves, use a
[stepper](stepper.html). Never show a bar for work that finishes in under a second.

## Anatomy

1. **Label** — what is happening, in body-small text above the track (`.progress-label`).
2. **Value** — the percentage or "Step 2 of 4", right-aligned in tabular figures.
3. **Track** — an 8px pill in `--color-border-default`.
4. **Fill** — `.progress__bar` in `--color-accent`, as wide as `--ll-progress-value`.

```html
<div><div class="progress-label"><span id="pa-label">Uploading field-day-photos.zip</span><span class="num">64%</span></div><div class="progress" role="progressbar" aria-labelledby="pa-label" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 64%"><div class="progress__bar"></div></div></div>
```

## Variants

### determinate
A label and a value above the bar. The base for most uploads and imports.
```html
<div><div class="progress-label"><span id="pd-label">Uploading field-day-photos.zip</span><span class="num">64%</span></div><div class="progress" role="progressbar" aria-labelledby="pd-label" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 64%"><div class="progress__bar"></div></div></div>
```

### bare
No visible label, for a bar inside a card that already says what it measures. It still has an accessible name.
```html
<div class="progress" role="progressbar" aria-label="Profile completeness" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 80%"><div class="progress__bar"></div></div>
```

### steps
For a setup checklist, read the value as a step with `aria-valuetext`.
```html
<div><div class="progress-label"><span id="ps-label">Set up Northwind</span><span class="num">Step 2 of 4</span></div><div class="progress" role="progressbar" aria-labelledby="ps-label" aria-valuenow="2" aria-valuemin="0" aria-valuemax="4" aria-valuetext="Step 2 of 4: invite your team" style="--ll-progress-value: 50%"><div class="progress__bar"></div></div></div>
```

### indeterminate
When the size is unknown: `aria-busy="true"` and no `aria-valuenow`. A short fill floats free of the start, so it never reads as a value, and drifts slowly across the track.
```html
<div><div class="progress-label"><span id="pi-label">Preparing your export…</span></div><div class="progress" role="progressbar" aria-labelledby="pi-label" aria-busy="true"><div class="progress__bar"></div></div></div>
```

### success
Complete. Keep it for a moment, then replace it with the result.
```html
<div><div class="progress-label"><span id="pc-label">Upload complete</span><span class="num">12 photos</span></div><div class="progress progress--success" role="progressbar" aria-labelledby="pc-label" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 100%"><div class="progress__bar"></div></div></div>
```

### danger
Stopped part-way. The bar keeps its place, and a message underneath says what to do.
```html
<div class="stack"><div><div class="progress-label"><span id="pf-label">Upload stopped</span><span class="num">62%</span></div><div class="progress progress--danger" role="progressbar" aria-labelledby="pf-label" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 62%"><div class="progress__bar"></div></div></div><div class="cluster"><p class="inline-status inline-status--danger" role="status">The connection dropped. 8 of 12 photos are uploaded.</p><button class="btn btn--text btn--sm" type="button">Upload the rest</button></div></div>
```

## Sizes

N/A: one 8px track. A taller bar does not make progress clearer; put the bar near what it measures instead.

## States

**Default** shows the measured value and animates the fill to each new width over 420ms. **Loading**
(indeterminate) is for the moment before the size is known: `aria-busy="true"` removes the value, and a short fill lifts off the start of the track and drifts across it until the first real value arrives. Success and danger are outcomes, shown as
variants above.

### determinate / loading
```html
<div><div class="progress-label"><span id="pl-label">Checking field-day-photos.zip…</span></div><div class="progress" role="progressbar" aria-labelledby="pl-label" aria-busy="true"><div class="progress__bar"></div></div></div>
```

### bare / loading
```html
<div class="progress" role="progressbar" aria-label="Loading profile completeness" aria-busy="true"><div class="progress__bar"></div></div>
```

### steps / loading
```html
<div><div class="progress-label"><span id="psl-label">Set up Northwind</span><span class="num">Loading steps…</span></div><div class="progress" role="progressbar" aria-labelledby="psl-label" aria-busy="true"><div class="progress__bar"></div></div></div>
```

## Responsive

The bar always fills its container. At 360px a long label wraps and the value stays on the right of the
first line. From 768px, keep bars inside cards or form columns; never stretch one across a wide page.

## Theming

The track reads `--color-border-default` and the fill `--color-accent` (or the success and danger solid
roles), each with a dark value; in dark mode the fill is light sage on a charcoal track. The fill keeps
3:1 against the track and the surface.

## Accessibility

**Role:** `role="progressbar"` with `aria-valuenow`, `aria-valuemin` and `aria-valuemax`. Use
`aria-valuetext` when the number alone is unclear ("Step 2 of 4: invite your team"). An indeterminate bar
leaves out `aria-valuenow` and sets `aria-busy="true"`.

**Focus:** a progress bar is not a focus stop.

**Labelling:** name it with `aria-labelledby` pointing at the visible label, or `aria-label` for a bare
bar. Do not announce every percent; announce the start and the result in a `role="status"` message
("Upload complete. 12 photos added.").

**Motion:** the fill eases to each new width and the indeterminate fill drifts across the track over 3.6 seconds;
under reduced motion the width jumps and the indeterminate fill rests in the middle of the track, and the
label still says what is happening.

**Touch:** N/A: a progress bar has no target. Any cancel or retry button beside it keeps 36px.

## Content

The label says what is happening, with the object: **Uploading field-day-photos.zip**, **Importing 128
notes**. Values are whole percentages (**64%**) or steps (**Step 2 of 4**). When it finishes, say the
result (**Upload complete**, **12 photos**); when it stops, say how much was kept (**8 of 12 photos are
uploaded**).

## Do and don't

### Do
Say what is in progress and how far it has got.
```html
<div><div class="progress-label"><span id="pdo-label">Importing 128 notes</span><span class="num">45%</span></div><div class="progress" role="progressbar" aria-labelledby="pdo-label" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 45%"><div class="progress__bar"></div></div></div>
```

### Don't
An unlabelled bar leaves everyone guessing what it measures.
```html
<div class="progress" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 45%"><div class="progress__bar"></div></div>
```

### Do
Switch to indeterminate when you cannot measure.
```html
<div><div class="progress-label"><span id="pid-label">Preparing your export…</span></div><div class="progress" role="progressbar" aria-labelledby="pid-label" aria-busy="true"><div class="progress__bar"></div></div></div>
```

### Don't
A fake value that stalls at 99% breaks trust.
```html
<div><div class="progress-label"><span id="pfk-label">Preparing your export…</span><span class="num">99%</span></div><div class="progress" role="progressbar" aria-labelledby="pfk-label" aria-valuenow="99" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 99%"><div class="progress__bar"></div></div></div>
```

## Tokens

The bar reads `--color-border-default` for the track, `--color-accent` and the success and danger solid
roles for the fill, `--size-progress-indeterminate`, `--radius-full`, and `--duration-slow` for the fill
transition.

## Code

Set `style="--ll-progress-value: 64%"` on `.progress` together with `aria-valuenow="64"`, and keep a
`.progress__bar` child. Put a `.progress-label` above it with an `id` for `aria-labelledby`.
