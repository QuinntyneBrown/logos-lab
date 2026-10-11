---
title: Slider
tier: standard
order: 27
summary: Set an approximate value along a range — focus hours, text size, distance — with the current value always in words beside it.
selector: .range
target: .range__input
states: default, focus, disabled
matrix-variants: value, ends, stepped, with number
apg: slider
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-accent|--color-bg-surface|3; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a slider when an approximate value is fine and seeing it change helps: how many hours to protect for
focus, how large the text is, how far to search. When people know the exact number they want, use a number
[text field](text-field.html) — or pair the two, as in the *with number* variant. Do not use a slider for a
handful of named choices; use a [radio group](radio-group.html) or [select](select.html). The control is the
native `input type="range"` tinted with the accent.

## Anatomy

1. **Label row** — `.range__label`: the label on the left and the current value on the right.
2. **Value** — `output.range__value`, the value with its unit, updated as the thumb moves.
3. **Track and thumb** — `.range__input`, the native range in the accent colour, with a 44px tall target.
4. **Ends** — optional `.range__ends`, the minimum and maximum in caption text (hidden from assistive technology).

```html
<div class="field"><div class="range"><div class="range__label"><label for="anat-text">Text size</label><output class="range__value" for="anat-text" data-format="{value} px">16 px</output></div><input class="range__input" id="anat-text" name="text-size" type="range" min="12" max="24" value="16" aria-valuetext="16 pixels"><div class="range__ends" aria-hidden="true"><span>12 px</span><span>24 px</span></div></div></div>
```

## Variants

### value
The label and the live value in one row.
```html
<div class="field"><div class="range"><div class="range__label"><label for="sl-focus">Weekly focus time</label><output class="range__value" for="sl-focus" data-format="{value} hours">12 hours</output></div><input class="range__input" id="sl-focus" name="focus" type="range" min="0" max="20" value="12" aria-valuetext="12 hours"></div></div>
```

### ends
Show the limits when they help people judge the value.
```html
<div class="field"><div class="range"><div class="range__label"><label for="sl-text">Text size in Harbour Notes</label><output class="range__value" for="sl-text" data-format="{value} px">16 px</output></div><input class="range__input" id="sl-text" name="text-size" type="range" min="12" max="24" value="16" aria-valuetext="16 pixels"><div class="range__ends" aria-hidden="true"><span>12 px</span><span>24 px</span></div></div></div>
```

### stepped
A `step` and a `datalist` add tick marks when only some values make sense.
```html
<div class="field"><div class="range"><div class="range__label"><label for="sl-group">Group size for Field Day</label><output class="range__value" for="sl-group" data-format="{value} people">6 people</output></div><input class="range__input" id="sl-group" name="group" type="range" min="2" max="12" step="2" value="6" list="sl-group-ticks" aria-valuetext="6 people"><datalist id="sl-group-ticks"><option value="2"></option><option value="4"></option><option value="6"></option><option value="8"></option><option value="10"></option><option value="12"></option></datalist><div class="range__ends" aria-hidden="true"><span>2</span><span>12</span></div></div></div>
```

### with number
A number field beside the slider gives an exact, drag-free way to set the value. Both stay in sync.
```html
<div class="field"><label class="field__label" for="sl-radius">Distance from Field Day</label><div class="input-group"><div class="range"><input class="range__input" id="sl-radius" name="radius" type="range" min="1" max="50" value="15" aria-valuetext="15 kilometres"><div class="range__ends" aria-hidden="true"><span>1 km</span><span>50 km</span></div></div><label class="vh" for="sl-radius-km">Distance from Field Day in kilometres</label><input class="input input--md range__number" id="sl-radius-km" name="radius-km" type="number" inputmode="numeric" min="1" max="50" value="15"><span class="input-group__addon">km</span></div></div>
```

## Sizes

N/A: One size. The native track fills its column and the input keeps a 44px tall target.

## States

Focus draws the sage ring around the slider's target area. Disabled greys the track and thumb, and the
label and value. Hovering and dragging use the browser's native thumb feedback; the value in the label row
updates while dragging. A slider is never invalid — it cannot hold an out-of-range value — so validate the
paired number field instead.

## Responsive

The slider fills its column at every width, and the value stays at the end of the label row. With a paired
number field, the slider shrinks and the number field keeps its 5rem width; below 360px, keep the unit
addon to a short abbreviation (**km**, **px**).

## Accessibility

**Role:** native `<input type="range">` (slider). Set `aria-valuetext` to the value with its unit, and update
it with the visible value.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to and from the slider. |
| Right / Up | Increases the value by one step. |
| Left / Down | Decreases the value by one step. |
| Page Up / Page Down | Changes the value by a larger step (about a tenth of the range). |
| Home / End | Jumps to the minimum or maximum. |

**Focus:** the 2px ring sits around the slider; the thumb keeps the accent colour.

**Labelling:** a visible label linked with `for`; the `output` uses `for` to point back at the slider. The
ends are `aria-hidden`, because the minimum and maximum are already announced. A paired number field has
its own label, visually hidden when the slider's label already shows on screen.

**Motion:** the thumb follows the pointer with no easing; nothing animates on its own.

**Touch:** dragging must never be the only way to set a value (WCAG 2.5.7): the keyboard always works, and
precise values get a paired number field.

## Content

- Label what is being set: **Weekly focus time**, **Group size for Field Day**.
- Always show the value with its unit, in words people would say: **12 hours**, **6 people**, **15 km**.
- Ends use the same unit as the value, or plain words when the scale has no unit (**Smaller**, **Larger**).

## Do and don't

### Do
Show the current value and its unit beside the label.
```html
<div class="field"><div class="range"><div class="range__label"><label for="dd-focus">Weekly focus time</label><output class="range__value" for="dd-focus" data-format="{value} hours">8 hours</output></div><input class="range__input" id="dd-focus" type="range" min="0" max="20" value="8" aria-valuetext="8 hours"></div></div>
```

### Don't
Without a value, people have to guess where the thumb landed.
```html
<div class="field"><div class="range"><label class="range__label" for="dd-focus-bad">Weekly focus time</label><input class="range__input" id="dd-focus-bad" type="range" min="0" max="20" value="8"></div></div>
```

### Do
Pair an exact number field with a slider for values people know precisely.
```html
<div class="field"><label class="field__label" for="dd-budget">Lunch budget per person</label><div class="input-group"><div class="range"><input class="range__input" id="dd-budget" type="range" min="5" max="40" value="18" aria-valuetext="18 dollars"></div><label class="vh" for="dd-budget-num">Lunch budget per person in dollars</label><input class="input input--md range__number" id="dd-budget-num" type="number" min="5" max="40" value="18"><span class="input-group__addon">dollars</span></div></div>
```

### Don't
A slider for named options hides the names until someone drags.
```html
<div class="field"><div class="range"><div class="range__label"><label for="dd-remind-bad">Reminder</label><output class="range__value" for="dd-remind-bad">2</output></div><input class="range__input" id="dd-remind-bad" type="range" min="1" max="3" value="2"></div></div>
```

## Tokens

The slider reads the accent for the track fill and thumb, the default and subtle text roles for the value
and ends, and the comfortable target height.

## Code

Wrap the label row, `input.range__input` and optional `.range__ends` in `.range`, inside a `.field`. Put
the value in `output.range__value` and update it, with `aria-valuetext`, on `input`.
