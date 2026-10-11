---
title: Notification item
tier: standard
order: 76
summary: A list of updates people can come back to: unread rows wear a sage wash and a dot, read rows fall quiet.
selector: .notice-list
target: li
states: default, unread
matrix-variants: read, with action
contrast: --color-fg-default|--color-accent-subtle|4.5; --color-fg-muted|--color-accent-subtle|4.5; --color-fg-subtle|--color-accent-subtle|4.5; --color-fg-default|--color-bg-canvas|4.5; --color-fg-muted|--color-bg-canvas|4.5; --color-accent|--color-accent-subtle|3
---

## Overview

Use a notification list on a notifications page or in a [popover](popover.html) from the top bar's bell,
for updates people may want to revisit: a comment, a reminder, an invitation. Each row says who did what,
gives one line of context and the time. Unread rows have a sage wash and a dot; reading them clears both.
For a message that needs attention right now and then goes away, use a [toast](toast.html); for a
conversation, use an [inbox](inbox.html).

## Anatomy

1. **Dot** — `.unread-dot` (8px sage) on unread rows; `.read-dot`, an empty spacer of the same size, on read rows so the text never shifts.
2. **Title** — `.notice__title`, one line in the `h4` role that links to the thing: "Grace Liu commented on the Northwind brief".
3. **Text** — `.notice__text`, one muted line of context or a short quote.
4. **Actions** — `.notice__actions`, optional: at most two small buttons for an invitation or a request.
5. **Time** — `.notice__time`, a caption with a `<time datetime>`: "9:42 am", "Yesterday, 4:20 pm", "Thu 8 Oct".
6. **Row** — `li`, a hairline under each; unread rows (`.is-unread`) get `--color-accent-subtle` and rounded corners.

```html
<ul class="notice-list" aria-label="Today">
  <li class="is-unread">
    <span class="unread-dot" aria-hidden="true"></span>
    <div>
      <p class="notice__title"><span class="vh">Unread: </span><a href="#">Grace Liu commented on the Northwind brief</a></p>
      <p class="notice__text">“Can we move the launch note above the timeline?”</p>
    </div>
    <time class="notice__time" datetime="2026-10-09T09:42">9:42 am</time>
  </li>
</ul>
```

## Variants

### unread
New since the last visit: sage wash, sage dot, and "Unread" announced before the title.
```html
<ul class="notice-list" aria-label="Today">
  <li class="is-unread">
    <span class="unread-dot" aria-hidden="true"></span>
    <div>
      <p class="notice__title"><span class="vh">Unread: </span><a href="#">Grace Liu commented on the Northwind brief</a></p>
      <p class="notice__text">“Can we move the launch note above the timeline?”</p>
    </div>
    <time class="notice__time" datetime="2026-10-09T09:42">9:42 am</time>
  </li>
  <li class="is-unread">
    <span class="unread-dot" aria-hidden="true"></span>
    <div>
      <p class="notice__title"><span class="vh">Unread: </span><a href="#">Field Day is in 8 days</a></p>
      <p class="notice__text">Saturday 17 October, 10:00 am. 14 people are going.</p>
    </div>
    <time class="notice__time" datetime="2026-10-09T08:00">8:00 am</time>
  </li>
</ul>
```

### read
Seen before: no wash, an empty dot column, the same text.
```html
<ul class="notice-list" aria-label="Earlier">
  <li>
    <span class="read-dot" aria-hidden="true"></span>
    <div>
      <p class="notice__title"><a href="#">Daniel Reyes shipped the sync fix</a></p>
      <p class="notice__text">Northwind · three files changed, all checks passing.</p>
    </div>
    <time class="notice__time" datetime="2026-10-08T16:20">Yesterday, 4:20 pm</time>
  </li>
  <li>
    <span class="read-dot" aria-hidden="true"></span>
    <div>
      <p class="notice__title"><a href="#">Hannah Kowalski shared Interview notes</a></p>
      <p class="notice__text">Added to Harbour Notes · six pages.</p>
    </div>
    <time class="notice__time" datetime="2026-10-08">Thu 8 Oct</time>
  </li>
  <li>
    <span class="read-dot" aria-hidden="true"></span>
    <div>
      <p class="notice__title"><a href="#">Your weekly digest is ready</a></p>
      <p class="notice__text">Three things moved in Northwind this week.</p>
    </div>
    <time class="notice__time" datetime="2026-10-05">Mon 5 Oct</time>
  </li>
</ul>
```

### with action
An invitation or request that can be answered in place, with one primary and one quiet button.
```html
<ul class="notice-list" aria-label="Requests">
  <li>
    <span class="read-dot" aria-hidden="true"></span>
    <div>
      <p class="notice__title"><a href="#">Amara Osei invited you to Harbour Notes</a></p>
      <p class="notice__text">You'll be able to read and edit every page in the notebook.</p>
      <div class="notice__actions">
        <button class="btn btn--primary btn--sm" type="button">Accept invitation</button>
        <button class="btn btn--quiet btn--sm" type="button">Not now</button>
      </div>
    </div>
    <time class="notice__time" datetime="2026-10-09T10:15">10:15 am</time>
  </li>
  <li>
    <span class="read-dot" aria-hidden="true"></span>
    <div>
      <p class="notice__title"><a href="#">Caleb Morgan asked you to host a demo at Field Day</a></p>
      <p class="notice__text">Ten minutes on Northwind's new sync, at 10:30 am.</p>
      <div class="notice__actions">
        <button class="btn btn--primary btn--sm" type="button">Say yes</button>
        <button class="btn btn--quiet btn--sm" type="button">Reply</button>
      </div>
    </div>
    <time class="notice__time" datetime="2026-10-08T17:05">Yesterday, 5:05 pm</time>
  </li>
</ul>
```

## Sizes

N/A: one content-driven size. Rows grow with their text; the dot and time columns keep their widths.

## States

**Unread** rows have the sage wash, the sage dot and a hidden "Unread:" prefix. **Hover** washes a read row
in `--color-bg-subtle` (an unread row deepens to `--color-accent-subtle-hover`) to show the whole row
leads somewhere. Opening the item, or **Mark all as read**, removes the wash. After answering an action,
replace the buttons with an [inline message](inline-message.html) such as "Accepted".

## Responsive

- **360px:** two columns: dot and content. The time drops under the text in the content column so titles
  keep the full width. Action buttons wrap.
- **640px and up:** three columns, with the time right-aligned on the title's line and never wrapping.
- **1024px and up:** the list sits within the reading measure of its page or a 400px popover; nothing else changes.

## Theming

Unread rows read `--color-accent-subtle` (sage 50 in light, sage 950 in dark), and the dot reads
`--color-accent`. Read rows sit on the canvas with only the hairline. All text roles keep at least 4.5:1 on
both backgrounds.

## Accessibility

**Role:** a `<ul>` with an `aria-label` that names the group ("Today", "Earlier"). Each title is a link to
the thing it describes; times are `<time datetime>`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to each title link, then to that row's action buttons. |
| Enter | Opens the item (and marks it read). Enter or Space answers an action. |

**Focus:** the shared sage ring around the title link or the focused button. Answering an action moves focus
to the inline confirmation that replaces it.

**Labelling:** the dot is `aria-hidden="true"`; unread rows add a visually hidden "Unread:" before the
title, so the state never relies on colour. Action buttons are specific: **Accept invitation**, **Say yes**.

**Motion:** the row's background changes over 240ms; under reduced motion it changes instantly.

**Touch:** title links span the text column; `sm` buttons are 36px tall with an 8px gap.

## Content

- Title: **who did what to which thing**, in the past tense: "Daniel Reyes shipped the sync fix".
- Text: one line of context or a short quote in curly quotation marks; no repetition of the title.
- Time: today as a clock time ("9:42 am"), yesterday as "Yesterday, 4:20 pm", older as "Thu 8 Oct".
- Group by "Today" and "Earlier" rather than showing a date on every row.

## Do and don't

### Do
Say who did what, with the time.
```html
<ul class="notice-list" aria-label="Today"><li class="is-unread"><span class="unread-dot" aria-hidden="true"></span><div><p class="notice__title"><span class="vh">Unread: </span><a href="#">Hannah Kowalski shared Interview notes</a></p><p class="notice__text">Added to Harbour Notes · six pages.</p></div><time class="notice__time" datetime="2026-10-09T11:10">11:10 am</time></li></ul>
```

### Don't
A vague system message gives no reason to open it.
```html
<ul class="notice-list" aria-label="Today"><li class="is-unread"><span class="unread-dot" aria-hidden="true"></span><div><p class="notice__title"><a href="#">New activity</a></p><p class="notice__text">Something changed in your workspace.</p></div><time class="notice__time" datetime="2026-10-09">Today</time></li></ul>
```

### Do
Keep the empty dot spacer on read rows so text lines up.
```html
<ul class="notice-list" aria-label="Earlier"><li><span class="read-dot" aria-hidden="true"></span><div><p class="notice__title"><a href="#">Your weekly digest is ready</a></p></div><time class="notice__time" datetime="2026-10-05">Mon 5 Oct</time></li></ul>
```

### Don't
More than two buttons in a row turns a notification into a form; link to the page instead.
```html
<ul class="notice-list" aria-label="Requests"><li><span class="read-dot" aria-hidden="true"></span><div><p class="notice__title"><a href="#">Caleb Morgan asked for a demo</a></p><div class="notice__actions"><button class="btn btn--primary btn--sm" type="button">Yes</button><button class="btn btn--sm" type="button">Maybe</button><button class="btn btn--quiet btn--sm" type="button">No</button><button class="btn btn--text btn--sm" type="button">Snooze</button></div></div><time class="notice__time" datetime="2026-10-08">Thu 8 Oct</time></li></ul>
```

## Tokens

Notification rows read `--color-accent-subtle`, `--color-accent-subtle-hover`, `--color-bg-subtle`,
`--color-accent` for the dot, the border role for hairlines, and the `h4`, small-body and caption type roles.
