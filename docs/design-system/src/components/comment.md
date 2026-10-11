---
title: Comment
tier: standard
order: 78
summary: A short, signed reply under a piece of work. Portrait, name, when, then the words, separated from the next comment by a hairline.
selector: .comment
layout: block
target: .comment
states: default, new, sending, failed, deleted
matrix-variants: default
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-fg-default|--color-accent-subtle|4.5; --color-danger-fg|--color-danger-bg|4.5
---

## Overview

Use comments for public replies attached to one thing: an update on Northwind, a page in Harbour Notes.
Each comment is signed and dated, and the list reads top to bottom, oldest first. For a private
back-and-forth between people use a [message thread](message-thread.html); for system events (someone
joined, a date changed) use a [timeline](timeline.html) or a [notification item](notification-item.html).

## Anatomy

1. **Portrait** — a 40px square [avatar](avatar.html), or initials on a tile when there is no photo. Decorative: the name sits beside it.
2. **Name** — the author (`__name`), a link to their profile.
3. **Meta** — when, and whether it was edited (`__meta`), as a `<time>`.
4. **Body** — the comment itself (`__body`), muted text at a readable measure.
5. **Actions** — optional text buttons (`__actions`): Edit and Delete on your own comments, Reply on others'.

```html
<ul class="comments"><li class="comment"><img class="avatar" src="../assets/photos/grace-liu.jpg" width="40" height="40" alt=""><div><p class="comment__head"><span class="comment__name"><a href="#">Grace Liu</a></span><span class="comment__meta"><time datetime="2026-10-09T09:12">Today, 9:12 am</time></span></p><p class="comment__body">The new board view is so much calmer. Could the done column fold away on phones?</p><p class="comment__actions"><button class="btn btn--text btn--sm" type="button">Reply</button></p></div></li></ul>
```

## Variants

### default
Someone else's comment, with a photo and a Reply action.
```html
<ul class="comments" aria-label="Comments"><li class="comment"><img class="avatar" src="../assets/photos/grace-liu.jpg" width="40" height="40" alt=""><div><p class="comment__head"><span class="comment__name"><a href="#">Grace Liu</a></span><span class="comment__meta"><time datetime="2026-10-09T09:12">Today, 9:12 am</time></span></p><p class="comment__body">The new board view is so much calmer. Could the done column fold away on phones?</p><p class="comment__actions"><button class="btn btn--text btn--sm" type="button">Reply to Grace</button></p></div></li></ul>
```

### initials
No photo: the author's initials on a tile tone, at the same 40px.
```html
<ul class="comments" aria-label="Comments"><li class="comment"><span class="avatar-initials tile--oat" aria-hidden="true">PW</span><div><p class="comment__head"><span class="comment__name"><a href="#">Peter Walsh</a></span><span class="comment__meta"><time datetime="2026-10-08T17:40">Yesterday, 5:40 pm</time></span></p><p class="comment__body">I tried it with our Thursday list and it held up well. The keyboard shortcuts saved me a lot of clicks.</p></div></li></ul>
```

### own
The viewer's own comment: Edit and Delete instead of Reply, and "edited" in the meta once it has changed.
```html
<ul class="comments" aria-label="Comments"><li class="comment"><img class="avatar" src="../assets/photos/amara-osei.jpg" width="40" height="40" alt=""><div><p class="comment__head"><span class="comment__name">Amara Osei <span class="muted">(you)</span></span><span class="comment__meta"><time datetime="2026-10-09T10:05">Today, 10:05 am</time> · edited</span></p><p class="comment__body">Yes, folding it away is next on the list. I'll share a sketch on Monday.</p><p class="comment__actions"><button class="btn btn--text btn--sm" type="button">Edit</button><button class="btn btn--text btn--sm comment__delete" type="button">Delete</button></p></div></li></ul>
```

### list
A conversation under one update: oldest first, one hairline between comments.
```html
<ul class="comments" aria-label="3 comments on the Northwind update"><li class="comment"><img class="avatar" src="../assets/photos/grace-liu.jpg" width="40" height="40" alt=""><div><p class="comment__head"><span class="comment__name"><a href="#">Grace Liu</a></span><span class="comment__meta"><time datetime="2026-10-09T09:12">Today, 9:12 am</time></span></p><p class="comment__body">The new board view is so much calmer. Could the done column fold away on phones?</p></div></li><li class="comment"><img class="avatar" src="../assets/photos/amara-osei.jpg" width="40" height="40" alt=""><div><p class="comment__head"><span class="comment__name">Amara Osei <span class="muted">(you)</span></span><span class="comment__meta"><time datetime="2026-10-09T10:05">Today, 10:05 am</time></span></p><p class="comment__body">Yes, that is next on the list. I'll share a sketch on Monday.</p></div></li><li class="comment comment--new"><img class="avatar" src="../assets/photos/noah-fischer.jpg" width="40" height="40" alt=""><div><p class="comment__head"><span class="comment__name"><a href="#">Noah Fischer</a></span><span class="comment__meta"><time datetime="2026-10-09T11:30">Today, 11:30 am</time></span><span class="badge badge--solid badge--plain">New</span></p><p class="comment__body">Happy to pair on the gestures. Thursday afternoon works for me.</p></div></li></ul>
```

## Sizes

N/A: One size. Comments follow the body type and a 40px portrait; a denser list is a list, not a smaller comment.

## States

**New** marks comments that arrived since the person last looked, with the accent wash and a **New** pill.
**Sending** shows the viewer's own comment straight away in the subtle text colour with "Sending…" in
the meta, so typing never feels lost. **Failed** keeps the words, explains in the danger colour and offers
**Try again** and **Delete**. **Deleted** leaves a quiet placeholder so replies still make sense.

### new
```html
<ul class="comments" aria-label="Comments"><li class="comment comment--new"><img class="avatar" src="../assets/photos/grace-liu.jpg" width="40" height="40" alt=""><div><p class="comment__head"><span class="comment__name"><a href="#">Grace Liu</a></span><span class="comment__meta"><time datetime="2026-10-09T09:12">Today, 9:12 am</time></span><span class="badge badge--solid badge--plain">New</span></p><p class="comment__body">The new board view is so much calmer. Could the done column fold away on phones?</p><p class="comment__actions"><button class="btn btn--text btn--sm" type="button">Reply to Grace</button></p></div></li></ul>
```

### sending
```html
<ul class="comments" aria-label="Comments"><li class="comment" aria-busy="true"><img class="avatar" src="../assets/photos/amara-osei.jpg" width="40" height="40" alt=""><div><p class="comment__head"><span class="comment__name">Amara Osei <span class="muted">(you)</span></span><span class="comment__meta inline-status"><span class="spinner spinner--sm" aria-hidden="true"></span>Sending…</span></p><p class="comment__body">Yes, folding it away is next on the list. I'll share a sketch on Monday.</p></div></li></ul>
```

### failed
```html
<ul class="comments" aria-label="Comments"><li class="comment comment--failed"><img class="avatar" src="../assets/photos/amara-osei.jpg" width="40" height="40" alt=""><div><p class="comment__head"><span class="comment__name">Amara Osei <span class="muted">(you)</span></span><span class="comment__meta">Not posted</span></p><p class="comment__body">Yes, folding it away is next on the list. I'll share a sketch on Monday.</p><p class="comment__actions"><span class="inline-status inline-status--danger" role="alert"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>We couldn't post this. Check your connection.</span><button class="btn btn--text btn--sm" type="button">Try again</button><button class="btn btn--text btn--sm comment__delete" type="button">Delete</button></p></div></li></ul>
```

### deleted
```html
<ul class="comments" aria-label="Comments"><li class="comment"><span class="comment__ghost" aria-hidden="true"></span><div><p class="comment__head"><span class="comment__meta"><time datetime="2026-10-09T09:12">Today, 9:12 am</time></span></p><p class="comment__deleted">This comment was deleted by its author.</p></div></li></ul>
```

## Responsive

The portrait stays beside the text at every width; the name, time and New pill wrap onto two lines at
360px. The body never grows wider than the wide reading measure, so long comments stay readable on a
1024px screen and up. Action buttons wrap rather than shrink.

## Accessibility

**Role:** a `<ul class="comments">` named for what it belongs to ("3 comments on the Northwind update"), one `<li class="comment">` per comment. Times are `<time datetime>`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves through the author links and comment actions in reading order. |
| Enter, Space | Activates Reply, Edit, Delete or Try again. |

**Focus:** the shared sage ring on author links and text buttons. After Delete, focus moves to the next comment's first control, or to the comment box if none is left.

**Labelling:** portraits are decorative (`alt=""`) because the name sits beside them. Action labels name
the person where it helps ("Reply to Grace"). Your own comments say "(you)" in text. The New pill is real
text, not only colour. A sending comment sets `aria-busy="true"`; a failure is announced with `role="alert"`.

**Motion:** the spinner and the New wash do not animate under reduced motion.

**Touch:** text buttons are at least 36px tall; author names are links with a full line-height target.

## Content

Times are relative for the last day (**Today, 9:12 am**, **Yesterday, 5:40 pm**) and dates after that
(**Wed 7 Oct**). Write errors as what happened and what to do: **We couldn't post this. Check your
connection.** Keep action labels to one or two words: **Reply**, **Edit**, **Delete**, **Try again**.

## Do and don't

### Do
Keep the words of a failed comment and offer a retry beside them.
```html
<ul class="comments" aria-label="Comments"><li class="comment comment--failed"><img class="avatar" src="../assets/photos/amara-osei.jpg" width="40" height="40" alt=""><div><p class="comment__head"><span class="comment__name">Amara Osei <span class="muted">(you)</span></span><span class="comment__meta">Not posted</span></p><p class="comment__body">I'll share a sketch on Monday.</p><p class="comment__actions"><button class="btn btn--text btn--sm" type="button">Try again</button></p></div></li></ul>
```

### Don't
Throw the text away and leave only a red error.
```html
<p class="inline-status inline-status--danger">Error 503. Comment failed.</p>
```

### Do
Let the hairline separate comments; keep the list open and quiet.
```html
<ul class="comments" aria-label="Comments"><li class="comment"><img class="avatar" src="../assets/photos/grace-liu.jpg" width="40" height="40" alt=""><div><p class="comment__head"><span class="comment__name"><a href="#">Grace Liu</a></span><span class="comment__meta">Today, 9:12 am</span></p><p class="comment__body">Could the done column fold away on phones?</p></div></li><li class="comment"><img class="avatar" src="../assets/photos/noah-fischer.jpg" width="40" height="40" alt=""><div><p class="comment__head"><span class="comment__name"><a href="#">Noah Fischer</a></span><span class="comment__meta">Today, 11:30 am</span></p><p class="comment__body">Happy to pair on the gestures.</p></div></li></ul>
```

### Don't
Box every comment in its own card; a stack of borders is noisy.
```html
<div class="stack"><div class="card"><p class="comment__body">Could the done column fold away on phones?</p></div><div class="card"><p class="comment__body">Happy to pair on the gestures.</p></div></div>
```

## Tokens

Comments read the text roles on the surface, `--color-accent-subtle` for new comments, the danger roles
for failures and the shared hairline border.

## Code

Use `ul.comments` with one `li.comment` each: a portrait, then a `div` holding `__head`, `__body` and an
optional `__actions` row. Add `comment--new` for unread comments and `comment--failed` when posting fails.
