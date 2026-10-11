---
title: Switch
tier: core
order: 26
summary: Turn a setting on or off the moment it is touched — a sage track for on, a quiet grey track for off.
selector: .switch
target: .switch__control
states: default, hover, focus, checked, disabled
matrix-variants: description, title only, label first
apg: switch
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-border-strong|--color-bg-surface|3; --color-accent|--color-bg-surface|3; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a switch for a setting that takes effect immediately, with no Save button: notifications, the dark
theme, showing weekends. If the change only applies when a form is submitted, use a
[checkbox](checkbox.html). If there are more than two positions, use a [radio group](radio-group.html) or a
segmented [button group](button-group.html). Switches live in settings lists, one per row, with a hairline
between rows.

## Anatomy

1. **Row** — `.switch`: a two-column grid with a hairline under it, so a list of settings reads as one column.
2. **Title** — `.switch__title`, the name of the setting; a `label` linked to the control.
3. **Description** — optional `.switch__text`, what the setting does, linked with `aria-describedby`.
4. **Track** — `.switch__control`: a native checkbox with `role="switch"`, 44 × 28px, sage when on.
5. **Thumb** — a 20px surface dot that sits left for off and right for on.

```html
<div class="switch"><div><label class="switch__title" for="anat-comments">Comment notifications</label><p class="switch__text" id="anat-comments-text">Email me when someone replies to my notes.</p></div><input class="switch__control" id="anat-comments" name="comments" type="checkbox" role="switch" aria-describedby="anat-comments-text" checked></div>
```

## Variants

### description
The settings row: a title, a sentence on what it does and the switch at the end.
```html
<div class="switch"><div><label class="switch__title" for="sw-digest">Weekly digest</label><p class="switch__text" id="sw-digest-text">A Monday summary of what changed in Harbour Notes.</p></div><input class="switch__control" id="sw-digest" name="digest" type="checkbox" role="switch" aria-describedby="sw-digest-text"></div>
```

### title only
A self-explanatory setting; the whole row is the label.
```html
<label class="switch"><span class="switch__title">Show weekends in the calendar</span><input class="switch__control" name="weekends" type="checkbox" role="switch"></label>
```

### label first
`.switch--label-right` puts the switch before its text, for narrow panels and forms. Pair it with
`.switch--plain` to drop the hairline outside a list.
```html
<label class="switch switch--label-right switch--plain"><input class="switch__control" name="remember" type="checkbox" role="switch"><span class="switch__title">Remember me on this device</span></label>
```

### settings list
A `fieldset.switch-list` groups related settings under a legend.
```html
<fieldset class="switch-list"><legend>Email</legend><div class="switch"><div><label class="switch__title" for="sw-mentions">Mentions</label><p class="switch__text" id="sw-mentions-text">When someone mentions you in a note.</p></div><input class="switch__control" id="sw-mentions" name="mentions" type="checkbox" role="switch" aria-describedby="sw-mentions-text" checked></div><div class="switch"><div><label class="switch__title" for="sw-fieldday">Field Day updates</label><p class="switch__text" id="sw-fieldday-text">Changes to the plan for Saturday 17 October.</p></div><input class="switch__control" id="sw-fieldday" name="fieldday" type="checkbox" role="switch" aria-describedby="sw-fieldday-text" checked></div><div class="switch"><div><label class="switch__title" for="sw-news">Product news</label><p class="switch__text" id="sw-news-text">At most once a month.</p></div><input class="switch__control" id="sw-news" name="news" type="checkbox" role="switch" aria-describedby="sw-news-text"></div></fieldset>
```

## Sizes

N/A: One size. The track is 44 × 28px (`--size-switch-width` × `--size-switch-height`) and the row is at least 44px tall.

## States

Off is a grey track with the thumb on the left; hover darkens it. On (checked) is a sage track with the
thumb on the right; hover deepens the sage. Focus draws the sage ring around the track. Disabled uses the
linen track and greys the title and description. While a change is saving, keep the switch in its new
position and show progress beside it with an [inline message](inline-message.html); if saving fails, move it
back and say why.

## Responsive

The row is a two-column grid at every width: text takes the remaining space and wraps, the switch stays the
same size at the end. `.switch--label-right` keeps the switch first on any width. Settings lists fill their
column; on phones they span the screen with the page margin.

## Accessibility

**Role:** `<input type="checkbox" role="switch">`, announced as "switch, on" or "switch, off".

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to and from the switch. |
| Space | Turns the setting on or off. Enter does nothing, so it never submits a surrounding form. |

**Focus:** the 2px sage ring, offset 3px, follows the pill shape of the track. Toggling never moves focus.

**Labelling:** the title is a `label` for the control (or the whole row is the `label`), and the description
is linked with `aria-describedby`. The label names the setting and never changes with the state.

**Motion:** the track colour changes over 240ms; the thumb jumps rather than slides, and colour transitions
are removed under reduced motion. In forced-colours mode the track gets a system-colour border.

**Touch:** the label row extends the target; the track itself is 44px wide.

## Content

- Name the setting, not the action: **Weekly digest**, **Show weekends in the calendar** — never
  "Turn on digest" or a label that flips to "Turn off".
- Descriptions say what happens when it is on: "A Monday summary of what changed in Harbour Notes."
- Do not add On/Off text beside the switch; the role announces the state and the track shows it.

## Do and don't

### Do
Keep the label stable and describe what the setting does.
```html
<div class="switch"><div><label class="switch__title" for="dd-sw-dark">Dark theme</label><p class="switch__text" id="dd-sw-dark-text">Follows lamplight colours across Harbour Notes.</p></div><input class="switch__control" id="dd-sw-dark" type="checkbox" role="switch" aria-describedby="dd-sw-dark-text" checked></div>
```

### Don't
A label that changes with the state is confusing and is announced twice.
```html
<div class="switch"><label class="switch__title" for="dd-sw-dark-bad">Turn dark theme off</label><input class="switch__control" id="dd-sw-dark-bad" type="checkbox" role="switch" checked></div>
```

### Do
Use a checkbox when the choice is only applied on submit.
```html
<form class="form" action="#"><label class="check"><input class="check__box" type="checkbox" name="copy"><span>Email me a copy of the invitation</span></label><div class="form-actions"><button class="btn btn--primary" type="submit">Send invitation</button></div></form>
```

### Don't
A switch inside a form that still needs Save leaves people unsure whether it worked.
```html
<form class="form" action="#"><label class="switch switch--plain"><span class="switch__title">Email me a copy of the invitation</span><input class="switch__control" type="checkbox" role="switch"></label><div class="form-actions"><button class="btn btn--primary" type="submit">Send invitation</button></div></form>
```

## Tokens

Switches read the strong border role for the off track, the accent for on, the surface for the thumb, the
default border for the row hairline and the switch size tokens.

## Code

Use `input.switch__control` with `type="checkbox"` and `role="switch"`. Wrap it with its text in `.switch`;
link the title with `for` (or make the row a `label`) and the description with `aria-describedby`.
