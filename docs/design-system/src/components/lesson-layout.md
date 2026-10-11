---
title: Lesson layout
tier: standard
order: 86
summary: The frame of every lesson page: the course outline beside the lesson from 1024px, the lesson's head, its body, and a foot with previous, next and Mark as complete.
selector: .lesson
layout: block
target: .lesson__complete .btn
states: default, hover, focus, loading, completed
matrix-variants: article lesson
matrix-cell: 40rem
contrast: --color-fg-default|--color-bg-canvas|4.5; --color-fg-muted|--color-bg-canvas|4.5; --color-fg-on-accent|--color-accent|4.5; --color-success-fg|--color-bg-canvas|4.5
---

## Overview

The lesson layout frames a single lesson of a course: a reading lesson, a video lesson or a learning
module. It keeps the [course outline](course-outline.html) in a sticky aside on wide screens and behind an
**Outline** button below 1024px, so a learner always knows where they are. The foot moves them on. The
lesson content itself is [prose](prose.html), a [player](player.html) or both. For a course's landing
page use the page header and the outline in the main column instead.

## Anatomy

1. **Lesson**: `div.lesson`, one column below 1024px; from 1024px an aside column of `--layout-aside-width` and the main column.
2. **Aside**: `aside.lesson__aside`, sticky from 1024px, holding the course title (`__aside-title`), a [progress bar](progress-bar.html) and the compact outline. Hidden below 1024px.
3. **Outline button**: `__outline-btn`, a quiet button that opens the outline in a [drawer](drawer.html); shown only below 1024px.
4. **Main**: `__main`, the lesson column.
5. **Head**: `__head`, the [breadcrumb](breadcrumb.html), the lesson title (`__title`) and meta (`__meta`): section, length, type.
6. **Body**: the lesson content: `.prose`, a player, or both.
7. **Foot**: `__foot`, previous and next links (`__nav`) and the completion control (`__complete`).

## Variants

### article lesson
A reading lesson with the outline in the aside.
```html
<div class="lesson"><aside class="lesson__aside" aria-label="Course outline"><div class="lesson__aside-head"><p class="lesson__aside-title">Imago Dei in an Age of Machines</p><div class="progress" role="progressbar" aria-label="Course progress" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 42%"><div class="progress__bar"></div></div><p class="outline__count">42% · 10 of 24 lessons</p></div><div class="outline outline--compact"><details class="outline__section" open><summary><span class="outline__name">3. Image and likeness</span><span class="outline__count">1 of 4 done</span></summary><ol class="outline__lessons"><li><a class="outline__lesson is-done" href="#"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span>3.1 Tselem and demuth: the words in Genesis<span class="vh">, completed</span></span><span class="outline__time">15 min</span></a></li><li><a class="outline__lesson" href="#" aria-current="page"><span class="outline__mark"></span><span>3.2 Representing, not resembling<span class="vh">, current lesson</span></span><span class="outline__time">14 min</span></a></li></ol></details></div></aside><div class="lesson__main"><button class="btn btn--quiet btn--sm lesson__outline-btn" type="button" aria-haspopup="dialog"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6.5h12M8 12h12M8 17.5h12M4 6.5h.01M4 12h.01M4 17.5h.01"/></svg>Outline</button><div class="lesson__head"><h3 class="lesson__title">Representing, not resembling</h3><p class="lesson__meta"><span>Section 3 · Lesson 2</span><span>14 min read</span></p></div><div class="prose"><p>Genesis does not describe a factory. The potter bends over the clay; the breath that makes the dust a living being is given, not installed.</p><p>When we ask whether a machine could bear the image of God, we are first asking what kind of making the image is.</p></div><div class="lesson__foot"><nav class="lesson__nav" aria-label="Lesson"><a class="btn btn--quiet" href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 6-6 6 6 6"/></svg>Previous<span class="vh">: Tselem and demuth</span></a><a class="btn" href="#">Next<span class="vh">: The image restored in Christ</span><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 6 6 6-6 6"/></svg></a></nav><div class="lesson__complete"><button class="btn btn--primary" type="button">Mark as complete</button></div></div></div></div>
```

### video lesson
A video lesson puts the player first in the body; the transcript follows.
```html
<div class="lesson"><aside class="lesson__aside" aria-label="Course outline"><div class="lesson__aside-head"><p class="lesson__aside-title">Imago Dei in an Age of Machines</p></div><div class="outline outline--compact"><details class="outline__section" open><summary><span class="outline__name">4. Minds and machines</span><span class="outline__count">0 of 4 done</span></summary><ol class="outline__lessons"><li><a class="outline__lesson" href="#" aria-current="page"><span class="outline__mark"></span><span>4.1 Can a Machine Pray?<span class="vh">, current lesson</span></span><span class="outline__time">24 min</span></a></li></ol></details></div></aside><div class="lesson__main"><div class="lesson__head"><h3 class="lesson__title">Can a Machine Pray?</h3><p class="lesson__meta"><span>Section 4 · Lesson 1</span><span>Video · 24:18</span><span>Prof. Simon Keller</span></p></div><div class="player"><div class="player__screen"><button class="player__play" type="button" aria-label="Play Can a Machine Pray?"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg></button></div></div><div class="lesson__foot"><nav class="lesson__nav" aria-label="Lesson"><a class="btn btn--quiet" href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 6-6 6 6 6"/></svg>Previous<span class="vh">: The image restored in Christ</span></a></nav><div class="lesson__complete"><button class="btn btn--primary" type="button">Mark as complete</button></div></div></div></div>
```

### last lesson
On the final lesson, next becomes **Back to course** and completing it finishes the course.
```html
<div class="lesson"><div class="lesson__main"><div class="lesson__head"><h3 class="lesson__title">Hope without illusions</h3><p class="lesson__meta"><span>Section 6 · Lesson 4</span><span>10 min read</span></p></div><div class="prose"><p>We end where we began: with creatures who make things, and a Maker who does not need them to.</p></div><div class="lesson__foot"><nav class="lesson__nav" aria-label="Lesson"><a class="btn btn--quiet" href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 6-6 6 6 6"/></svg>Previous<span class="vh">: Limits as gift</span></a><a class="btn" href="#">Back to course</a></nav><div class="lesson__complete"><button class="btn btn--primary" type="button">Complete the course</button></div></div></div></div>
```

## Sizes

N/A: the layout fills the page container; the aside width is `--layout-aside-width`.

## States

The states are on the completion control. Hover and focus are the button's own. **Loading** shows the
spinner while the completion saves. **Completed** replaces the button with a success status and a quiet
**Mark as not complete** text button, and the outline ticks the lesson.

### completed
```html
<div class="lesson"><div class="lesson__main"><div class="lesson__head"><h3 class="lesson__title">Representing, not resembling</h3><p class="lesson__meta"><span>Section 3 · Lesson 2</span><span>14 min read</span></p></div><div class="lesson__foot"><nav class="lesson__nav" aria-label="Lesson"><a class="btn btn--quiet" href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 6-6 6 6 6"/></svg>Previous<span class="vh">: Tselem and demuth</span></a><a class="btn btn--primary" href="#">Next<span class="vh">: The image restored in Christ</span><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 6 6 6-6 6"/></svg></a></nav><div class="lesson__complete"><span class="inline-status inline-status--success" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Completed</span><button class="btn btn--text btn--sm" type="button">Mark as not complete</button></div></div></div></div>
```

## Responsive

Below 1024px the aside is hidden and the **Outline** button opens the outline in a drawer; the lesson is
one column. From 1024px the aside is a sticky column that scrolls on its own and the button disappears.
The foot wraps: at 360px the navigation sits above the completion control.

## Accessibility

**Role:** the aside is an `aside` landmark named "Course outline"; previous and next sit in a `nav` named
"Lesson". The lesson title is the page's `h1`.

| Key | Effect |
|---|---|
| Tab | Moves through the outline, the lesson content, then previous, next and Mark as complete. |
| Enter | Follows previous or next, or opens the Outline drawer. |
| Space | Marks the lesson complete. |

**Focus:** after Mark as complete, focus stays on the completion area and the status is announced; it does
not jump to the next lesson.

**Labelling:** Previous and Next carry the lesson title as visually hidden text ("Next: Representatives,
not replicas").

**Motion:** none of its own; the drawer follows the drawer's motion rules.

**Touch:** the foot buttons are full-size 44px pills, spaced apart.

## Content

The title is the lesson title alone; the meta gives **Section 3 · Lesson 2** and length (**14 min read**,
**Video · 24:18**). The completion button reads **Mark as complete**; after it, **Completed**. On the last
lesson say **Complete the course**.

## Do and don't

### Do
Make Next the primary action once the lesson is complete.
```html
<div class="lesson__foot"><nav class="lesson__nav" aria-label="Lesson"><a class="btn btn--primary" href="#">Next<span class="vh">: The image restored in Christ</span><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 6 6 6-6 6"/></svg></a></nav><div class="lesson__complete"><span class="inline-status inline-status--success" role="status">Completed</span></div></div>
```

### Don't
Give the foot two primary buttons.
```html
<div class="lesson__foot"><nav class="lesson__nav" aria-label="Lesson"><a class="btn btn--primary" href="#">Next</a></nav><div class="lesson__complete"><button class="btn btn--primary" type="button">Mark as complete</button></div></div>
```

### Do
Name the lesson that Previous and Next lead to.
```html
<nav class="lesson__nav" aria-label="Lesson"><a class="btn btn--quiet" href="#">Previous<span class="vh">: Tselem and demuth</span></a><a class="btn" href="#">Next<span class="vh">: The image restored in Christ</span></a></nav>
```

### Don't
Complete the lesson silently on scroll with no control.
```html
<div class="lesson__foot"><nav class="lesson__nav" aria-label="Lesson"><a class="btn" href="#">Next</a></nav></div>
```
