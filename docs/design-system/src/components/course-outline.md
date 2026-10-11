---
title: Course outline
tier: standard
order: 85
summary: A course's sections and lessons in order, each lesson marked done, current or locked, with its length. It sits on the course page and beside every lesson.
selector: .outline
layout: block
target: .outline__lesson
states: default, hover, focus, current, done, locked
matrix-variants: sections, compact
matrix-cell: 24rem
contrast: --color-fg-muted|--color-bg-surface|4.5; --color-fg-accent|--color-accent-subtle|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-success-icon|--color-success-bg|3; --color-focus-ring|--color-bg-surface|3
---

## Overview

The course outline lists a course's sections and their lessons so a learner can see where they are, what
they have finished and what comes next. It appears on the course page, in the aside of the
[lesson layout](lesson-layout.html) from 1024px, and in the Outline drawer below that. Each section is a
native disclosure. For a flat list of steps in a form flow use the [stepper](stepper.html); to reorder
lessons in the studio use the [sortable](sortable.html) list.

## Anatomy

1. **Outline**: `div.outline`, a stack of sections divided by hairlines.
2. **Section**: `details.outline__section` with a `summary` holding the section name (`__name`), a count (`__count`) and a plus or minus sign drawn by CSS.
3. **Lessons**: `ol.outline__lessons`, the section's lessons in order.
4. **Lesson**: `a.outline__lesson`, or a `span` when locked: a mark, the title and the length.
5. **Mark**: `__mark`, a round 24px badge: a tick when done, a lock when locked, empty otherwise.
6. **Time**: `__time`, the lesson length in tabular numerals.

```html
<div class="outline"><details class="outline__section" open><summary><span class="outline__name">3. Image and likeness</span><span class="outline__count">1 of 4 done</span></summary><ol class="outline__lessons"><li><a class="outline__lesson is-done" href="#"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span>3.1 Tselem and demuth: the words in Genesis<span class="vh">, completed</span></span><span class="outline__time">15 min</span></a></li><li><a class="outline__lesson" href="#" aria-current="page"><span class="outline__mark"></span><span>3.2 Representing, not resembling<span class="vh">, current lesson</span></span><span class="outline__time">14 min</span></a></li><li><span class="outline__lesson is-locked" aria-disabled="true"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="10.5" width="13" height="10" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg></span><span>3.3 The image restored in Christ<span class="vh">, locked: finish the previous lesson first</span></span><span class="outline__time">13 min</span></span></li></ol></details></div>
```

## Variants

### sections
The full outline on a course page: open sections show their lessons, closed ones only their name and count.
```html
<div class="outline"><details class="outline__section" open><summary><span class="outline__name">1. Beginnings</span><span class="outline__count">5 of 5 done</span></summary><ol class="outline__lessons"><li><a class="outline__lesson is-done" href="#"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span>1.1 Why this course<span class="vh">, completed</span></span><span class="outline__time">8 min</span></a></li><li><a class="outline__lesson is-done" href="#"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span>1.2 Questions we bring<span class="vh">, completed</span></span><span class="outline__time">10 min</span></a></li></ol></details><details class="outline__section" open><summary><span class="outline__name">3. Image and likeness</span><span class="outline__count">1 of 4 done</span></summary><ol class="outline__lessons"><li><a class="outline__lesson" href="#"><span class="outline__mark"></span><span>3.1 Tselem and demuth: the words in Genesis</span><span class="outline__time">15 min</span></a></li><li><a class="outline__lesson" href="#"><span class="outline__mark"></span><span>3.2 Representing, not resembling</span><span class="outline__time">14 min</span></a></li><li><a class="outline__lesson" href="#"><span class="outline__mark"></span><span>3.3 The image restored in Christ</span><span class="outline__time">13 min</span></a></li></ol></details><details class="outline__section"><summary><span class="outline__name">4. Minds and machines</span><span class="outline__count">4 lessons</span></summary><ol class="outline__lessons"><li><a class="outline__lesson" href="#"><span class="outline__mark"></span><span>4.1 What a model is</span><span class="outline__time">16 min</span></a></li></ol></details></div>
```

### compact
`outline--compact` tightens the rows for the lesson aside and the Outline drawer.
```html
<div class="outline outline--compact"><details class="outline__section" open><summary><span class="outline__name">3. Image and likeness</span><span class="outline__count">1 of 4 done</span></summary><ol class="outline__lessons"><li><a class="outline__lesson" href="#"><span class="outline__mark"></span><span>3.2 Representing, not resembling</span><span class="outline__time">14 min</span></a></li><li><a class="outline__lesson" href="#"><span class="outline__mark"></span><span>3.3 The image restored in Christ</span><span class="outline__time">13 min</span></a></li></ol></details></div>
```

### sequential
In a sequential course, lessons after the next one are locked until the one before is finished.
```html
<div class="outline"><details class="outline__section" open><summary><span class="outline__name">4. Minds and machines</span><span class="outline__count">0 of 4 done</span></summary><ol class="outline__lessons"><li><a class="outline__lesson" href="#" aria-current="page"><span class="outline__mark"></span><span>4.1 What a model is<span class="vh">, current lesson</span></span><span class="outline__time">16 min</span></a></li><li><span class="outline__lesson is-locked" aria-disabled="true"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="10.5" width="13" height="10" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg></span><span>4.2 Understanding without a mind<span class="vh">, locked: finish the previous lesson first</span></span><span class="outline__time">18 min</span></span></li><li><span class="outline__lesson is-locked" aria-disabled="true"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="10.5" width="13" height="10" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg></span><span>4.3 Case Study: The Chatbot Chaplain<span class="vh">, locked: finish the previous lesson first</span></span><span class="outline__time">25 min</span></span></li></ol></details></div>
```

## Sizes

N/A: one size; `outline--compact` is the denser form for the aside and drawer.

## States

Hover washes an available lesson in `--color-bg-subtle`. Focus draws the shared ring around the lesson
row. **Current** (`aria-current="page"`) fills the row with the sage wash, rings the mark in the accent and
sets the title in semibold. **Done** (`.is-done`) fills the mark with the success tick. **Locked**
(`.is-locked`, a `span` with `aria-disabled`) dashes the mark, shows a lock and turns the text subtle; it
is not a link.

### done
```html
<div class="outline"><details class="outline__section" open><summary><span class="outline__name">2. Made, not manufactured</span><span class="outline__count">4 of 4 done</span></summary><ol class="outline__lessons"><li><a class="outline__lesson is-done" href="#"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span>2.1 Dust and breath<span class="vh">, completed</span></span><span class="outline__time">12 min</span></a></li><li><a class="outline__lesson is-done" href="#"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span>2.2 The potter and the clay<span class="vh">, completed</span></span><span class="outline__time">11 min</span></a></li></ol></details></div>
```

### locked
```html
<div class="outline"><details class="outline__section" open><summary><span class="outline__name">4. Minds and machines</span><span class="outline__count">0 of 4 done</span></summary><ol class="outline__lessons"><li><span class="outline__lesson is-locked" aria-disabled="true"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="10.5" width="13" height="10" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg></span><span>4.2 Understanding without a mind<span class="vh">, locked: finish the previous lesson first</span></span><span class="outline__time">18 min</span></span></li></ol></details></div>
```

## Responsive

The outline fills its container at every width. Titles wrap and the time stays on the right; the summary
keeps the count beside the name until it runs out of room. Below 1024px it moves out of the lesson aside
into the Outline drawer; on the course page it sits in the main column at every width.

## Accessibility

**Role:** native `details` and `summary` for each section and an ordered list of links for the lessons.
The current lesson has `aria-current="page"`. A locked lesson is a `span` with `aria-disabled="true"`, so
it is skipped by Tab but still read in the list.

| Key | Effect |
|---|---|
| Tab | Moves through section summaries and available lessons in order. |
| Enter or Space on a summary | Opens or closes the section. |
| Enter on a lesson | Opens the lesson. |

**Focus:** the shared ring sits on the summary or the lesson row. Opening the lesson page puts the current
lesson in view in the aside.

**Labelling:** state is never the mark alone: each done, current or locked lesson carries visually hidden
text (", completed", ", current lesson", ", locked: finish the previous lesson first"). The count says
"1 of 4 done" in words.

**Motion:** none; sections open instantly.

**Touch:** every row is at least 44px tall and the whole row is the target.

## Content

Number sections and lessons as the course does: **3. Image and likeness**, **3.2 Made, not
manufactured**. Times are whole minutes: **12 min**. The count reads **1 of 4 done**, or **4 lessons**
before a learner starts. Explain a lock in words: **finish the previous lesson first**.

## Do and don't

### Do
Say why a lesson is locked.
```html
<div class="outline"><details class="outline__section" open><summary><span class="outline__name">4. Minds and machines</span><span class="outline__count">0 of 4 done</span></summary><ol class="outline__lessons"><li><span class="outline__lesson is-locked" aria-disabled="true"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="10.5" width="13" height="10" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg></span><span>4.2 Understanding without a mind<span class="vh">, locked: finish the previous lesson first</span></span><span class="outline__time">18 min</span></span></li></ol></details></div>
```

### Don't
Make a locked lesson a link that leads nowhere.
```html
<div class="outline"><details class="outline__section" open><summary><span class="outline__name">4. Minds and machines</span></summary><ol class="outline__lessons"><li><a class="outline__lesson is-locked" href="#"><span class="outline__mark"></span><span>4.2 Understanding without a mind</span></a></li></ol></details></div>
```

### Do
Keep the lesson length on every row.
```html
<div class="outline outline--compact"><details class="outline__section" open><summary><span class="outline__name">3. Image and likeness</span><span class="outline__count">1 of 4 done</span></summary><ol class="outline__lessons"><li><a class="outline__lesson" href="#"><span class="outline__mark"></span><span>3.3 The image restored in Christ</span><span class="outline__time">13 min</span></a></li></ol></details></div>
```

### Don't
Show done only with the tick colour.
```html
<div class="outline outline--compact"><details class="outline__section" open><summary><span class="outline__name">2. Made, not manufactured</span></summary><ol class="outline__lessons"><li><a class="outline__lesson is-done" href="#"><span class="outline__mark"></span><span>2.1 Dust and breath</span></a></li></ol></details></div>
```
