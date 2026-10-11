---
title: Sortable
tier: standard
order: 102
summary: The course and collection builder's reorderable list: sections holding lessons, each with a drag handle and Move up and Move down buttons, so order can be changed by mouse, touch or keyboard.
selector: .sortable, .sortable__group
layout: block
target: .sortable__item
states: default, dragging, drop-target, invalid
matrix-variants: section
matrix-cell: 30rem
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-fg-default|--color-bg-surface-sunken|4.5; --color-accent|--color-accent-subtle|3; --color-danger-fg|--color-danger-bg|4.5
---

## Overview

In the studio, experts order a course's sections and lessons and a collection's items with the sortable
list. Dragging is a shortcut: every move can also be made with the **Move up** and **Move down** buttons
or with the keyboard on the handle, and every move is announced. For a fixed, read-only list of lessons use
the [course outline](course-outline.html); for tabular data use a [table](table.html).

## Anatomy

1. **Group**: `div.sortable__group`, a sunken panel for one section: a head (`__group-head`) with the section title (`__group-title`) and Add lesson, then its list.
2. **List**: `ol.sortable`, the items in order.
3. **Item**: `li.sortable__item`, a birch row: handle, main text and actions.
4. **Handle**: `__handle`, an [icon button](button.html) with a grip; drag it, or press Space on it to pick up and arrows to move.
5. **Main**: `__main`, the title (`__title`) and meta (`__meta`): type and length.
6. **Actions**: `__actions`, Move up and Move down icon buttons (and Remove where allowed).
7. **Drop line**: `li.sortable__drop`, the 4px accent line where a dragged item will land.

## Variants

### section
One section of a course with its lessons. The first item cannot move up.
```html
<div class="sortable__group"><div class="sortable__group-head"><h3 class="sortable__group-title">3. Image and likeness</h3><button class="btn btn--text btn--sm" type="button">Add lesson</button></div><ol class="sortable" aria-label="Lessons in Image and likeness"><li class="sortable__item"><button class="icon-btn sortable__handle" type="button" aria-label="Reorder 3.1 Tselem and demuth: the words in Genesis"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"/></svg></button><div class="sortable__main"><span class="sortable__title">3.1 Tselem and demuth: the words in Genesis</span><span class="sortable__meta">Article · 15 min</span></div><div class="sortable__actions"><button class="icon-btn icon-btn--sm" type="button" aria-label="Move 3.1 Tselem and demuth: the words in Genesis up" disabled><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button><button class="icon-btn icon-btn--sm" type="button" aria-label="Move 3.1 Tselem and demuth: the words in Genesis down"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg></button></div></li><li class="sortable__item"><button class="icon-btn sortable__handle" type="button" aria-label="Reorder 3.2 Representing, not resembling"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"/></svg></button><div class="sortable__main"><span class="sortable__title">3.2 Representing, not resembling</span><span class="sortable__meta">Article · 14 min</span></div><div class="sortable__actions"><button class="icon-btn icon-btn--sm" type="button" aria-label="Move 3.2 Representing, not resembling up"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button><button class="icon-btn icon-btn--sm" type="button" aria-label="Move 3.2 Representing, not resembling down"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg></button></div></li><li class="sortable__item"><button class="icon-btn sortable__handle" type="button" aria-label="Reorder 3.3 The image restored in Christ"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"/></svg></button><div class="sortable__main"><span class="sortable__title">3.3 The image restored in Christ</span><span class="sortable__meta">Article · 13 min</span></div><div class="sortable__actions"><button class="icon-btn icon-btn--sm" type="button" aria-label="Move 3.3 The image restored in Christ up"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button><button class="icon-btn icon-btn--sm" type="button" aria-label="Move 3.3 The image restored in Christ down" disabled><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg></button></div></li></ol></div>
```

### collection items
A flat list for a collection, with Remove on each item.
```html
<ol class="sortable" aria-label="Items in Start Here: Faith and AI"><li class="sortable__item"><button class="icon-btn sortable__handle" type="button" aria-label="Reorder Five Questions to Ask Before Your Church Adopts AI"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"/></svg></button><div class="sortable__main"><span class="sortable__title">Five Questions to Ask Before Your Church Adopts AI</span><span class="sortable__meta">Article · 6 min read</span></div><div class="sortable__actions"><button class="icon-btn icon-btn--sm" type="button" aria-label="Move Five Questions to Ask Before Your Church Adopts AI down"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg></button><button class="btn btn--text btn--sm" type="button">Remove<span class="vh"> Five Questions to Ask Before Your Church Adopts AI</span></button></div></li><li class="sortable__item"><button class="icon-btn sortable__handle" type="button" aria-label="Reorder Inside a Neural Network in Ten Minutes"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"/></svg></button><div class="sortable__main"><span class="sortable__title">Inside a Neural Network in Ten Minutes</span><span class="sortable__meta">Video · 10:12</span></div><div class="sortable__actions"><button class="icon-btn icon-btn--sm" type="button" aria-label="Move Inside a Neural Network in Ten Minutes up"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button><button class="btn btn--text btn--sm" type="button">Remove<span class="vh"> Inside a Neural Network in Ten Minutes</span></button></div></li></ol>
```

## Sizes

N/A: rows are content height with 44px controls; the list fills its column.

## States

**Dragging** lifts the picked-up item with the sage wash, an accent border and a shadow. **Drop target**
shows the accent drop line where the item will land. **Invalid** marks a section that cannot be saved,
such as an empty one, with a danger wash and a message in its head.

### drop-target
```html
<div class="sortable__group"><div class="sortable__group-head"><h3 class="sortable__group-title">3. Image and likeness</h3></div><ol class="sortable" aria-label="Lessons in Image and likeness"><li class="sortable__item"><button class="icon-btn sortable__handle" type="button" aria-label="Reorder 3.1 Tselem and demuth: the words in Genesis"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"/></svg></button><div class="sortable__main"><span class="sortable__title">3.1 Tselem and demuth: the words in Genesis</span><span class="sortable__meta">Article · 15 min</span></div></li><li class="sortable__drop" aria-hidden="true"></li><li class="sortable__item" data-state="dragging"><button class="icon-btn sortable__handle" type="button" aria-label="Reorder 3.3 The image restored in Christ" aria-pressed="true"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"/></svg></button><div class="sortable__main"><span class="sortable__title">3.3 The image restored in Christ</span><span class="sortable__meta">Article · 13 min</span></div></li><li class="sortable__item"><button class="icon-btn sortable__handle" type="button" aria-label="Reorder 3.2 Representing, not resembling"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"/></svg></button><div class="sortable__main"><span class="sortable__title">3.2 Representing, not resembling</span><span class="sortable__meta">Article · 14 min</span></div></li></ol><p class="vh" role="status">3.3 The image restored in Christ, position 2 of 3.</p></div>
```

### invalid
```html
<div class="sortable__group is-invalid" role="group" aria-labelledby="so-inv-title" aria-describedby="so-inv-msg"><div class="sortable__group-head"><h3 class="sortable__group-title" id="so-inv-title">5. Vocation and dominion</h3><button class="btn btn--text btn--sm" type="button">Add lesson</button></div><p class="inline-status inline-status--danger" id="so-inv-msg"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Add at least one lesson, or remove this section.</p><ol class="sortable" aria-label="Lessons in Vocation and dominion"></ol></div>
```

## Responsive

Under 480px each item's actions move below its title, beside the handle's column. Drag works with touch at
every size; the Move buttons are always there as the reliable alternative. Groups keep 16px padding.

## Accessibility

**Role:** an ordered list of items; each handle is a button. Picking up an item with the keyboard sets
`aria-pressed="true"` on its handle. A polite live region announces each move ("3.3 The image restored in Christ,
position 2 of 3") and the drop.

| Key | Effect |
|---|---|
| Space or Enter on a handle | Picks the item up, or drops it. |
| Up / Down arrow while picked up | Moves the item one place; across a section boundary it moves to the next section. |
| Escape while picked up | Puts the item back where it was. |
| Enter on Move up / Move down | Moves the item one place. |

**Focus:** after a move, focus stays on the same item's handle or button in its new place.

**Labelling:** handles and Move buttons include the item's title ("Move 3.2 Representing, not resembling up").
Move up is disabled on the first item and Move down on the last.

**Motion:** the lift and the slide of neighbouring items stop under reduced motion; items swap in place.

**Touch:** a long press on the handle starts a drag; handles and Move buttons are at least 44px.

## Content

Titles carry their number in courses (**3.2 Representing, not resembling**) and their real title in collections.
Meta is the type and length: **Article · 14 min**, **Video · 24:18**. The empty-section message says what
to do: **Add at least one lesson, or remove this section.**

## Do and don't

### Do
Give every item Move up and Move down as well as the handle.
```html
<ol class="sortable" aria-label="Lessons in Beginnings"><li class="sortable__item"><button class="icon-btn sortable__handle" type="button" aria-label="Reorder 1.2 Questions we bring"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"/></svg></button><div class="sortable__main"><span class="sortable__title">1.2 Questions we bring</span></div><div class="sortable__actions"><button class="icon-btn icon-btn--sm" type="button" aria-label="Move 1.2 Questions we bring up"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button><button class="icon-btn icon-btn--sm" type="button" aria-label="Move 1.2 Questions we bring down"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg></button></div></li></ol>
```

### Don't
Make dragging the only way to reorder.
```html
<ol class="sortable" aria-label="Lessons in Beginnings"><li class="sortable__item"><span class="sortable__handle" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"/></svg></span><div class="sortable__main"><span class="sortable__title">1.2 Questions we bring</span></div></li></ol>
```

### Do
Name the item in every control.
```html
<button class="icon-btn icon-btn--sm" type="button" aria-label="Move 3.2 Representing, not resembling down"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg></button>
```

### Don't
Use the same "Move down" name on every row.
```html
<button class="icon-btn icon-btn--sm" type="button" aria-label="Move down"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg></button>
```
