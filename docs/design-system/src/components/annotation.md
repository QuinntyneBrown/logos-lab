---
title: Annotation
tier: standard
order: 95
summary: An editor's review comment anchored to a passage: a warm highlight in the text and a note beside it that can be replied to and resolved.
selector: .annotation, .annotation-note
layout: block
target: .annotation-note
states: default, current, resolved
matrix-variants: comment
matrix-cell: 30rem
contrast: --color-fg-default|--color-warning-bg|4.5; --color-fg-default|--color-accent-subtle-hover|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-fg-muted|--color-bg-subtle|4.5; --color-warning-icon|--color-bg-surface|3
---

## Overview

Annotations are how an editor reviews a submission in the studio. Naomi Ellis selects a passage, writes a
note, and the expert sees the highlight in their draft and the note in the review panel. Selecting either
one makes both current. Notes are resolved, not deleted, so the history stays. For public discussion under
published content use the [comment](comment.html) component; for comparing versions use the
[diff](diff.html).

## Anatomy

1. **Highlight**: `mark.annotation`, a warm wash with a thick underline over the passage.
2. **Notes**: `ol.annotations`, the review panel's list, in the order the passages appear.
3. **Note**: `li.annotation-note`, a birch card with a warm left rule.
4. **Head**: `__head`, the reviewer's portrait, name (`__who`) and time.
5. **Quote**: `__quote`, the passage the note is anchored to, in italics.
6. **Text**: `__text`, the comment.
7. **Actions**: `__actions`, Reply and Resolve (or Reopen).

## Variants

### comment
A passage with its note.
```html
<div class="stack"><div class="prose"><p>Augustine did not think of memory as a warehouse. For him <mark class="annotation">memory is not storage but a kind of presence</mark>, and that is where a language model is most unlike us.</p></div><ol class="annotations" aria-label="Review comments"><li class="annotation-note"><div class="annotation-note__head"><img src="../assets/photos/sofia-marquez.jpg" alt=""><span class="annotation-note__who">Naomi Ellis</span><time datetime="2026-10-13T10:02">10:02 am</time></div><p class="annotation-note__quote">“memory is not storage but a kind of presence”</p><p class="annotation-note__text">Can we cite the passage in Confessions X here? Readers will want the source.</p><div class="annotation-note__actions"><button class="btn btn--text btn--sm" type="button">Reply</button><button class="btn btn--quiet btn--sm" type="button">Resolve</button></div></li></ol></div>
```

### in text
Several highlights in a draft; the current one is accent, a resolved one is a dashed underline.
```html
<div class="prose"><p>The question is not whether <mark class="annotation is-resolved">a model can quote the Psalms</mark>. It plainly can. The question is <mark class="annotation" aria-current="true">whether quoting is the same as remembering</mark>, and whether <mark class="annotation">a church should hand its memory to one</mark>.</p></div>
```

### thread
A note with the author's reply.
```html
<ol class="annotations" aria-label="Review comments"><li class="annotation-note"><div class="annotation-note__head"><img src="../assets/photos/sofia-marquez.jpg" alt=""><span class="annotation-note__who">Naomi Ellis</span><time datetime="2026-10-12T16:40">Yesterday, 4:40 pm</time></div><p class="annotation-note__quote">“a church should hand its memory to one”</p><p class="annotation-note__text">This reads as a recommendation. Is that what you mean?</p><div class="annotation-note__head"><img src="../assets/photos/ruth-alvarez.jpg" alt=""><span class="annotation-note__who">Dr. Lucía Ortega</span><time datetime="2026-10-13T09:15">9:15 am</time></div><p class="annotation-note__text">No, it is a question. I have reworded it.</p><div class="annotation-note__actions"><button class="btn btn--text btn--sm" type="button">Reply</button><button class="btn btn--quiet btn--sm" type="button">Resolve</button></div></li></ol>
```

## Sizes

N/A: notes fill the review panel; highlights follow the text.

## States

**Default** notes have a warm left rule. **Current** (the note or its passage is selected) turns the note's
border and the highlight to the accent and sets `aria-current="true"` on both. **Resolved** greys the note,
turns its rule green, mutes its text, and leaves only a dashed underline in the text.

### current
```html
<div class="stack"><div class="prose"><p>For him <mark class="annotation" aria-current="true">memory is not storage but a kind of presence</mark>.</p></div><ol class="annotations" aria-label="Review comments"><li class="annotation-note" aria-current="true"><div class="annotation-note__head"><img src="../assets/photos/sofia-marquez.jpg" alt=""><span class="annotation-note__who">Naomi Ellis</span><time datetime="2026-10-13T10:02">10:02 am</time></div><p class="annotation-note__quote">“memory is not storage but a kind of presence”</p><p class="annotation-note__text">Can we cite the passage in Confessions X here?</p><div class="annotation-note__actions"><button class="btn btn--text btn--sm" type="button">Reply</button><button class="btn btn--quiet btn--sm" type="button">Resolve</button></div></li></ol></div>
```

### resolved
```html
<div class="stack"><div class="prose"><p>For him <mark class="annotation is-resolved">memory is not storage but a kind of presence</mark>.</p></div><ol class="annotations" aria-label="Review comments"><li class="annotation-note is-resolved"><div class="annotation-note__head"><img src="../assets/photos/sofia-marquez.jpg" alt=""><span class="annotation-note__who">Naomi Ellis</span><time datetime="2026-10-13T10:02">10:02 am</time><span class="badge badge--success">Resolved</span></div><p class="annotation-note__quote">“memory is not storage but a kind of presence”</p><p class="annotation-note__text">Can we cite the passage in Confessions X here?</p><div class="annotation-note__actions"><button class="btn btn--text btn--sm" type="button">Reopen</button></div></li></ol></div>
```

## Responsive

From 1024px the notes sit in a panel beside the draft. Below 1024px they move into a Review comments
drawer opened from the workflow bar, and selecting a highlight opens the drawer at its note. Quotes and
text wrap; nothing truncates.

## Accessibility

**Role:** the highlight is a `mark`; screen readers announce it as highlighted. Notes are a list named
"Review comments". Current note and highlight carry `aria-current="true"`.

| Key | Effect |
|---|---|
| Tab | Moves through each note's Reply and Resolve. |
| Enter on a highlight's note | Scrolls the draft to the passage and makes both current. |
| Alt + Down / Alt + Up | Moves to the next or previous comment. |

**Focus:** resolving a note moves focus to the next open note, or to the panel heading if none remain.

**Labelling:** each note repeats its passage in the quote, so the note makes sense on its own. Resolved
notes say **Resolved** in a badge, not only by colour.

**Motion:** scrolling to a passage is smooth unless reduced motion is set.

**Touch:** Reply and Resolve are separate small pills with room between them.

## Content

Notes are specific and kind: ask a question or say what would make it better. **Can we cite the passage in
Confessions X here?** beats **Source?** Quote the passage exactly, in curly quotes. Times follow the
relative-time rule: **10:02 am**, **Yesterday, 4:40 pm**, **Sat 3 Oct**.

## Do and don't

### Do
Quote the passage in the note.
```html
<ol class="annotations" aria-label="Review comments"><li class="annotation-note"><p class="annotation-note__quote">“memory is not storage but a kind of presence”</p><p class="annotation-note__text">Can we cite the passage in Confessions X here?</p></li></ol>
```

### Don't
Leave a note that only makes sense beside the highlight.
```html
<ol class="annotations" aria-label="Review comments"><li class="annotation-note"><p class="annotation-note__text">Source?</p></li></ol>
```

### Do
Resolve a note and keep it in the list.
```html
<ol class="annotations" aria-label="Review comments"><li class="annotation-note is-resolved"><div class="annotation-note__head"><span class="annotation-note__who">Naomi Ellis</span><span class="badge badge--success">Resolved</span></div><p class="annotation-note__text">This reads as a recommendation. Is that what you mean?</p></li></ol>
```

### Don't
Delete review comments once they are dealt with.
```html
<ol class="annotations" aria-label="Review comments"></ol>
```
