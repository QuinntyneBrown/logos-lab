---
title: Button group
tier: standard
order: 11
summary: Keep related buttons together — a row of actions, a segmented switcher for views, or a toolbar of toggles.
selector: .btn-group
layout: inline
target: button:not([aria-pressed="true"])
states: default, hover, focus, active, pressed, disabled
matrix-variants: segmented, toolbar
apg: toolbar
contrast: --color-fg-default|--color-bg-subtle|4.5; --color-fg-default|--color-bg-surface|4.5; --color-fg-accent|--color-accent-subtle|4.5; --color-fg-on-accent|--color-accent|4.5; --color-accent|--color-bg-surface|3; --color-focus-ring|--color-bg-surface|3
---

## Overview

A button group keeps a few related [buttons](button.html) together. Use a plain group for two to four
actions on the same object (Share, Duplicate, Export). Use the **segmented** group to switch between two to
four views of the same content, where exactly one is on. Use a **toolbar** for independent toggles such as
text formatting. The actions that submit a form belong in `.form-actions` (see
[form layout](form-layout.html)); more than four actions belong in a [menu](menu.html).

## Anatomy

1. **Group** — `.btn-group`: a wrapping flex row with an 8px gap, `role="group"` (or `toolbar`) and an `aria-label`.
2. **Buttons** — ordinary `.btn` buttons; quiet or ghost for secondary actions, at most one primary.
3. **Track** — segmented only: a linen pill (`.btn-group--segmented`) behind the segments.
4. **Selected segment** — `aria-pressed="true"` lifts it onto the surface with a soft shadow.

```html
<div class="btn-group btn-group--segmented" role="group" aria-label="View"><button class="btn btn--sm" type="button" aria-pressed="false">List</button><button class="btn btn--sm" type="button" aria-pressed="true">Board</button><button class="btn btn--sm" type="button" aria-pressed="false">Calendar</button></div>
```

## Variants

### actions
Quiet, equal-weight actions on one object.
```html
<div class="btn-group" role="group" aria-label="Project actions"><button class="btn btn--quiet" type="button">Share</button><button class="btn btn--quiet" type="button">Duplicate</button><button class="btn btn--quiet" type="button">Export</button></div>
```

### with primary
One primary action last, with its quiet alternatives before it.
```html
<div class="btn-group" role="group" aria-label="Note actions"><button class="btn btn--ghost" type="button">Discard</button><button class="btn btn--quiet" type="button">Save draft</button><button class="btn btn--primary" type="button">Publish note</button></div>
```

### segmented
A view switcher. Exactly one segment is pressed; switching changes the view in place.
```html
<div class="btn-group btn-group--segmented" role="group" aria-label="View"><button class="btn" type="button" aria-pressed="false">List</button><button class="btn" type="button" aria-pressed="true">Board</button><button class="btn" type="button" aria-pressed="false">Calendar</button></div>
```

### toolbar
Independent toggles for formatting in Harbour Notes. Any number can be pressed.
```html
<div class="btn-group btn-group--toolbar" role="toolbar" aria-label="Text formatting"><button class="btn btn--ghost btn--icon" type="button" aria-pressed="false" aria-label="Bold"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7z"/><path d="M7 12h7a3.5 3.5 0 0 1 0 7H7z"/></svg></button><button class="btn btn--ghost btn--icon" type="button" aria-pressed="true" aria-label="Italic"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5h8M6 19h8M14 5l-4 14"/></svg></button><button class="btn btn--ghost btn--icon" type="button" aria-pressed="false" aria-label="Bulleted list"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7h11M9 12h11M9 17h11"/><path d="M4.5 7h.01M4.5 12h.01M4.5 17h.01"/></svg></button><button class="btn btn--ghost btn--icon" type="button" aria-pressed="false" aria-label="Link"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg></button></div>
```

## Sizes

N/A: The group follows its buttons. Add `.btn--sm` to every button for dense toolbars and table rows, or leave them at the 44px default; never mix sizes in one group.

## States

Each button keeps its own hover, focus, active and disabled states. In a segmented group, hovering an
unpressed segment deepens the linen; the pressed segment sits on the surface with a soft shadow and moves
when another segment is chosen. In a toolbar (`.btn-group--toolbar`), a pressed toggle fills with the sage wash and accent
text, and several can be pressed at once; the focus ring stays distinct from the pressed fill. Disabling the group disables every button in it.

### segmented / pressed
```html
<div class="btn-group btn-group--segmented" role="group" aria-label="View"><button class="btn" type="button" aria-pressed="true">List</button><button class="btn" type="button" aria-pressed="false">Board</button><button class="btn" type="button" aria-pressed="false">Calendar</button></div>
```

## Responsive

Plain groups and toolbars wrap onto a second line on narrow screens instead of shrinking their buttons.
Segmented groups do not wrap: keep them to two to four short labels (one word each) so they fit a 360px
screen; with longer labels, use a [select](select.html) on phones.

## Accessibility

**Role:** `role="group"` with an `aria-label` for actions and segmented switchers; `role="toolbar"` for a set
of toggles. Toggle buttons use `aria-pressed`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves between buttons in a group. A toolbar is a single tab stop. |
| Left / Right | In a toolbar, moves focus between buttons (roving `tabindex`), wrapping at the ends. |
| Home / End | In a toolbar, moves focus to the first or last button. |
| Enter, Space | Activates the focused button or toggles it. |

**Focus:** every button keeps the 2px sage ring, including the pressed segment.

**Labelling:** name the group by its task (Project actions, View, Text formatting). Icon-only toggles need
`aria-label`; the pressed state comes from `aria-pressed`, never from a changing label.

**Motion:** background and colour transitions take 240ms; the pressed segment does not slide.

**Touch:** buttons keep their 44px height (36px with `.btn--sm`) and the 8px gap prevents mis-taps.

## Content

- Give each button a verb and object, or a one-word view name in a segmented group: **List**, **Board**, **Calendar**.
- Order actions from least to most important, with the primary last: Discard, Save draft, **Publish note**.
- Keep labels parallel in length and grammar so the group reads as one set.

## Do and don't

### Do
Put the one primary action last, after its quiet alternatives.
```html
<div class="btn-group" role="group" aria-label="Invitation actions"><button class="btn btn--quiet" type="button">Copy link</button><button class="btn btn--primary" type="button">Send invitation</button></div>
```

### Don't
Unrelated actions in one group suggest they act on the same thing.
```html
<div class="btn-group" role="group" aria-label="Actions"><button class="btn btn--quiet" type="button">Sign out</button><button class="btn btn--quiet" type="button">Export notes</button><button class="btn btn--quiet" type="button">Invite Grace</button></div>
```

### Do
Use a segmented group for two to four views of the same content.
```html
<div class="btn-group btn-group--segmented" role="group" aria-label="Calendar range"><button class="btn" type="button" aria-pressed="true">Week</button><button class="btn" type="button" aria-pressed="false">Month</button></div>
```

### Don't
A segmented group for actions makes buttons look like a choice that stays selected.
```html
<div class="btn-group btn-group--segmented" role="group" aria-label="Note actions"><button class="btn" type="button" aria-pressed="true">Save</button><button class="btn" type="button" aria-pressed="false">Delete</button></div>
```

## Tokens

The group reads the 8px gap, the subtle background and full radius for the segmented track, the surface and
`--shadow-1` for the pressed segment, and the button roles for everything else.

## Code

Wrap the buttons in `.btn-group` with `role="group"` and an `aria-label`. Add `.btn-group--segmented` and
`aria-pressed` for a view switcher; use `.btn-group--toolbar` with `role="toolbar"`, ghost icon buttons and roving `tabindex` for toggles.
