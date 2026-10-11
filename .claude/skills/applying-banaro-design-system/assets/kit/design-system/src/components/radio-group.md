---
title: Radio group
tier: core
order: 25
summary: Choose exactly one answer from a few visible options — as calm cards with a sentence each, or as a plain list.
selector: .choices, .choice
target: input:not([checked])
states: default, hover, focus, checked, disabled, invalid
error: Choose who can open Harbour Notes.
matrix-variants: cards, inline, plain
apg: radio
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-fg-default|--color-accent-subtle|4.5; --color-accent|--color-bg-surface|3; --color-border-strong|--color-bg-surface|3; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a radio group when people must choose exactly one of two to six options and benefit from seeing them
all at once: who can open a notebook, when to be reminded, how to sort. With more options, or options people
already know by heart, use a [select](select.html). To switch a view in place, use a segmented
[button group](button-group.html). For any number of answers use [checkboxes](checkbox.html); for a single
on/off setting use a [switch](switch.html). Pre-select the safest sensible option whenever one exists.

## Anatomy

1. **Group** — `fieldset.choices` with a `legend` that asks the question.
2. **Option card** — `label.choice`: hairline border on the surface; sage border and wash when chosen.
3. **Radio** — the native radio in the accent colour, 20px.
4. **Title** — `.choice__title`, the answer in a few words.
5. **Description** — optional `.choice__text`, one sentence on what the answer means.

```html
<fieldset class="choices"><legend>Who can open Harbour Notes?</legend><label class="choice"><input type="radio" name="anat-access" value="team" checked><span class="choice__title">Northwind team</span><span class="choice__text">Amara, Daniel, Grace and three others can read and edit.</span></label></fieldset>
```

## Variants

### cards
Bordered cards with a description, for decisions that need a sentence of explanation.
```html
<fieldset class="choices"><legend>Who can open Harbour Notes?</legend><label class="choice"><input type="radio" name="rg-access" value="me" checked><span class="choice__title">Just me</span><span class="choice__text">Private notes; nobody else sees them.</span></label><label class="choice"><input type="radio" name="rg-access" value="team"><span class="choice__title">Northwind team</span><span class="choice__text">Six people can read and edit.</span></label><label class="choice"><input type="radio" name="rg-access" value="link"><span class="choice__title">Anyone with the link</span><span class="choice__text">Read only. Good for sharing with guests.</span></label></fieldset>
```

### inline
`.choices--inline` puts short options side by side and wraps them on narrow screens.
```html
<fieldset class="choices choices--inline"><legend>Remind me about Field Day</legend><label class="choice"><input type="radio" name="rg-remind" value="day" checked><span class="choice__title">A day before</span></label><label class="choice"><input type="radio" name="rg-remind" value="hour"><span class="choice__title">An hour before</span></label><label class="choice"><input type="radio" name="rg-remind" value="none"><span class="choice__title">No reminder</span></label></fieldset>
```

### plain
`.choices--plain` drops the cards for a quiet list, for settings and short dialogs.
```html
<fieldset class="choices choices--plain"><legend>Sort comments</legend><label class="choice"><input type="radio" name="rg-sort" value="new" checked><span class="choice__title">Newest first</span></label><label class="choice"><input type="radio" name="rg-sort" value="old"><span class="choice__title">Oldest first</span></label><label class="choice"><input type="radio" name="rg-sort" value="replies"><span class="choice__title">Most replies</span></label></fieldset>
```

### compact
The checkbox row with a round box, for filter sidebars that mix radios and checkboxes.
```html
<fieldset class="check-group"><legend>Updated</legend><label class="check"><input class="check__box" type="radio" name="rg-updated" value="any" checked><span>Any time</span></label><label class="check"><input class="check__box" type="radio" name="rg-updated" value="week"><span>This week</span><span class="check__count">9</span></label><label class="check"><input class="check__box" type="radio" name="rg-updated" value="month"><span>This month</span><span class="check__count">23</span></label></fieldset>
```

## Sizes

N/A: One size. Cards grow with their text; plain and compact rows keep a 44px target.

## States

Hover strengthens the card border (or tints the title in the plain list). Focus draws the sage ring on the
radio. Checked moves the sage border and wash to the chosen card — in the matrix, the selection moves from
the first option to the second. Disabled fills cards with linen and greys the text. Invalid outlines every
card in the danger colour and shows the error under the question, with no option chosen.

### inline / invalid
```html
<fieldset class="choices choices--inline" aria-describedby="st-remind-error"><legend>Remind me about Field Day</legend><p class="field__error" id="st-remind-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Choose a reminder, or No reminder.</p><label class="choice"><input type="radio" name="st-remind" value="day" aria-invalid="true"><span class="choice__title">A day before</span></label><label class="choice"><input type="radio" name="st-remind" value="hour" aria-invalid="true"><span class="choice__title">An hour before</span></label><label class="choice"><input type="radio" name="st-remind" value="none" aria-invalid="true"><span class="choice__title">No reminder</span></label></fieldset>
```

### cards / invalid
```html
<fieldset class="choices" aria-describedby="st-access-error"><legend>Who can open Harbour Notes?</legend><p class="field__error" id="st-access-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Choose who can open Harbour Notes.</p><label class="choice"><input type="radio" name="st-access" value="me" aria-invalid="true"><span class="choice__title">Just me</span></label><label class="choice"><input type="radio" name="st-access" value="team" aria-invalid="true"><span class="choice__title">Northwind team</span></label></fieldset>
```

### plain / invalid
```html
<fieldset class="choices choices--plain" aria-describedby="st-sort-error"><legend>Sort comments</legend><p class="field__error" id="st-sort-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Choose how to sort comments.</p><label class="choice"><input type="radio" name="st-sort" value="new" aria-invalid="true"><span class="choice__title">Newest first</span></label><label class="choice"><input type="radio" name="st-sort" value="old" aria-invalid="true"><span class="choice__title">Oldest first</span></label></fieldset>
```

## Responsive

Cards stack in one column at every width. `.choices--inline` fits as many 10rem columns as the row allows
and wraps the rest, so three short options sit side by side on a tablet and stack on a 360px phone. Keep
inline titles to three words.

## Accessibility

**Role:** native radios sharing one `name`, inside a `fieldset` whose `legend` names the group (radiogroup).

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves into the group (to the checked radio, or the first) and out of it. The group is one tab stop. |
| Down / Right | Moves to and selects the next option, wrapping at the end. |
| Up / Left | Moves to and selects the previous option. |
| Space | Selects the focused option if none is selected. |

**Focus:** the ring sits on the radio; the card's sage border shows which option is chosen, the ring shows
where the keyboard is.

**Labelling:** each card is a `label` wrapping its radio, title and description, so the whole card selects
and the description is read with the title. The `legend` asks the question. Errors are linked from the
`fieldset` with `aria-describedby`.

**Motion:** border and wash changes use 240ms colour transitions only.

**Touch:** the whole card or row is the target, at least 44px tall.

## Content

- The legend is a question or a clear noun: **Who can open Harbour Notes?**, **Sort comments**.
- Titles are short and parallel: **Just me**, **Northwind team**, **Anyone with the link**.
- Descriptions state the consequence in one sentence: "Read only. Good for sharing with guests."
- Include a real "none" option (**No reminder**) instead of leaving the group empty.

## Do and don't

### Do
Pre-select the safest sensible option.
```html
<fieldset class="choices choices--plain"><legend>Who can see your status?</legend><label class="choice"><input type="radio" name="dd-status" value="team" checked><span class="choice__title">Northwind team</span></label><label class="choice"><input type="radio" name="dd-status" value="all"><span class="choice__title">Everyone</span></label></fieldset>
```

### Don't
Radios for options that are not mutually exclusive force a false choice.
```html
<fieldset class="choices choices--plain"><legend>Topics for Field Day</legend><label class="choice"><input type="radio" name="dd-topics" value="roadmap"><span class="choice__title">Roadmap</span></label><label class="choice"><input type="radio" name="dd-topics" value="hiring"><span class="choice__title">Hiring</span></label></fieldset>
```

### Do
Explain a consequential choice in each card.
```html
<fieldset class="choices"><legend>When Grace leaves Northwind</legend><label class="choice"><input type="radio" name="dd-leave" value="keep" checked><span class="choice__title">Keep her notes</span><span class="choice__text">They move to Amara and stay in Harbour Notes.</span></label><label class="choice"><input type="radio" name="dd-leave" value="archive"><span class="choice__title">Archive her notes</span><span class="choice__text">Hidden from the team; Amara can restore them.</span></label></fieldset>
```

### Don't
Unlabelled radios with the question in a heading lose their group name.
```html
<div><p class="field__label">When Grace leaves Northwind</p><label class="choice"><input type="radio" name="dd-leave-bad" value="keep"><span class="choice__title">Keep</span></label><label class="choice"><input type="radio" name="dd-leave-bad" value="archive"><span class="choice__title">Archive</span></label></div>
```

## Tokens

Radio cards read the default border, strong border on hover, the accent border and accent-subtle wash when
chosen, the danger border for invalid, the surface background and the medium radius.

## Code

Use `fieldset.choices` with a `legend`, then one `label.choice` per option holding the radio,
`.choice__title` and an optional `.choice__text`. Add `.choices--inline` or `.choices--plain` for the other
layouts.
