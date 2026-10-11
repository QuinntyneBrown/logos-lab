---
title: Diff
tier: standard
order: 96
summary: What changed between two versions of a piece of content, field by field: removed lines in red, added lines in green, inline insertions and deletions, and two versions side by side when an edit conflicts.
selector: .diff, .diff-split
layout: block
target: .diff-split__pane
states: default, selected
matrix-variants: split
matrix-cell: 40rem
contrast: --color-success-fg|--color-success-bg|4.5; --color-danger-fg|--color-danger-bg|4.5; --color-fg-default|--color-success-bg|4.5; --color-fg-default|--color-danger-bg|4.5; --color-fg-muted|--color-bg-surface-sunken|4.5
---

## Overview

The studio shows a diff wherever someone needs to see what changed: in version history, when an editor
reviews a resubmission, and when two people saved the same item at once. Each field is its own block so
a long article body does not hide a changed title. Use `diff-split` only to choose between two versions.
For review comments on a passage use the [annotation](annotation.html); for an audit log of who did what
use the [timeline](timeline.html).

## Anatomy

1. **Diff**: `div.diff`, a birch block with a hairline, one per field.
2. **Field**: `__field`, the field's name on a sunken strip.
3. **Row**: `__row`, a sign column and the text; `__row--removed` on the red wash, `__row--added` on the green.
4. **Sign**: `__sign`, a minus or plus in code type, hidden from screen readers.
5. **Text**: `__text`, the line, with visually hidden "Removed:" or "Added:" before it.
6. **Inline change**: `del.diff__del` and `ins.diff__ins` inside an unchanged row, for small edits within a sentence.
7. **Split**: `diff-split`, two panes (`__pane`) each with a head (`__head`) naming the version and a Keep button.

## Variants

### field
A changed field: the old line removed, the new line added.
```html
<div class="diff" role="group" aria-label="Changes to Title"><p class="diff__field">Title</p><div class="diff__row diff__row--removed"><span class="diff__sign" aria-hidden="true">−</span><span class="diff__text"><span class="vh">Removed: </span>Augustine and the Language Machine</span></div><div class="diff__row diff__row--added"><span class="diff__sign" aria-hidden="true">+</span><span class="diff__text"><span class="vh">Added: </span>What Augustine Might Say About Large Language Models</span></div></div>
```

### inline
A small edit inside a sentence, marked in place.
```html
<div class="diff" role="group" aria-label="Changes to Summary"><p class="diff__field">Summary</p><div class="diff__row"><span class="diff__sign" aria-hidden="true"></span><span class="diff__text">A church historian reads <del class="diff__del">the newest chatbots</del> <ins class="diff__ins">large language models</ins> alongside the Confessions.</span></div></div>
```

### split
Two versions side by side when an edit conflicts; choosing one selects its pane.
```html
<div class="diff-split"><section class="diff-split__pane" aria-labelledby="dsp-mine"><div class="diff-split__head"><span id="dsp-mine">Your version, not saved</span><button class="btn btn--quiet btn--sm" type="button">Keep yours</button></div><div class="diff" role="group" aria-label="Your Summary"><p class="diff__field">Summary</p><div class="diff__row diff__row--added"><span class="diff__sign" aria-hidden="true">+</span><span class="diff__text"><span class="vh">Added: </span>A church historian reads large language models alongside the Confessions.</span></div></div></section><section class="diff-split__pane" aria-labelledby="dsp-theirs"><div class="diff-split__head"><span id="dsp-theirs">Saved by Naomi Ellis at 10:21 am</span><button class="btn btn--quiet btn--sm" type="button">Keep Naomi’s</button></div><div class="diff" role="group" aria-label="Naomi Ellis’s Summary"><p class="diff__field">Summary</p><div class="diff__row diff__row--added"><span class="diff__sign" aria-hidden="true">+</span><span class="diff__text"><span class="vh">Added: </span>Dr. Lucía Ortega reads large language models with Augustine’s Confessions.</span></div></div></section></div>
```

## Sizes

N/A: a diff fills its column; text wraps inside it.

## States

Diff blocks are read-only. In a split, **selected** rings the chosen pane's diff in the accent once a
person picks it, before they confirm; the Keep button then reads as pressed.

## Responsive

Rows wrap long text and never scroll sideways. `diff-split` stacks its panes below 768px (yours first)
and sits side by side from 768px.

## Accessibility

**Role:** each diff is a `group` named after its field. Removed and added lines carry visually hidden
"Removed:" and "Added:"; `del` and `ins` are announced by screen readers that support them, and the
colour is never the only cue (the sign and the underline on `ins` remain).

| Key | Effect |
|---|---|
| Tab | Moves to each pane's Keep button in a split. |
| Enter or Space | Chooses that version. |

**Focus:** after choosing a version, focus moves to the confirmation button below the split.

**Labelling:** split panes are named by their head: who saved them and when.

**Motion:** none.

**Touch:** Keep buttons are small pills with a 44px target.

## Content

Name fields as the editor does: **Title**, **Summary**, **Body**, **Cover image**. Name versions by person
and time: **Saved by Naomi Ellis at 10:21 am**, **Your version, not saved**. Keep buttons name whose
version: **Keep yours**, **Keep Naomi’s**.

## Do and don't

### Do
Show each changed field on its own.
```html
<div class="diff" role="group" aria-label="Changes to Reading time"><p class="diff__field">Reading time</p><div class="diff__row diff__row--removed"><span class="diff__sign" aria-hidden="true">−</span><span class="diff__text"><span class="vh">Removed: </span>10 min</span></div><div class="diff__row diff__row--added"><span class="diff__sign" aria-hidden="true">+</span><span class="diff__text"><span class="vh">Added: </span>12 min</span></div></div>
```

### Don't
Rely on red and green alone.
```html
<div class="diff"><div class="diff__row diff__row--removed"><span class="diff__text">10 min</span></div><div class="diff__row diff__row--added"><span class="diff__text">12 min</span></div></div>
```

### Do
Say who saved the other version and when.
```html
<div class="diff-split__head"><span>Saved by Naomi Ellis at 10:21 am</span><button class="btn btn--quiet btn--sm" type="button">Keep Naomi’s</button></div>
```

### Don't
Label conflicting versions A and B.
```html
<div class="diff-split__head"><span>Version B</span><button class="btn btn--quiet btn--sm" type="button">Use B</button></div>
```
