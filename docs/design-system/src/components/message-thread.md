---
title: Message thread
tier: standard
order: 79
summary: A private conversation between people. Soft bubbles, theirs on the left and yours on the right in sage, with a labelled reply box beneath.
selector: .thread, .bubble
layout: block
target: .thread__composer .btn
states: default, focus, sending, failed, empty
matrix-variants: conversation
contrast: --color-fg-default|--color-bg-subtle|4.5; --color-fg-default|--color-accent-subtle|4.5; --color-fg-subtle|--color-bg-subtle|4.5; --color-danger-fg|--color-danger-bg|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a message thread for a private conversation between two or a few people, read and written in turn.
Pair it with an [inbox](inbox.html) that lists the conversations. For public replies under a piece of
work use [comments](comment.html); for a one-way announcement use a [notification item](notification-item.html)
or an [alert](alert.html).

## Anatomy

1. **Thread** — the surface card (`.thread`) that holds the log and the reply box.
2. **Day divider** — a centred caption between hairlines (`__day`): Today, Wed 7 Oct.
3. **Their bubble** — linen (`.bubble`), aligned left, at most 34rem wide.
4. **Your bubble** — sage wash (`.bubble--mine`), aligned right.
5. **Meta** — time, and Read or Sending… for your last message (`__meta`).
6. **Reply box** — a labelled textarea and a Send button (`__composer`).

```html
<section class="thread" aria-label="Conversation with Daniel Reyes"><div class="thread__log" role="log" aria-label="Messages"><p class="thread__day">Today</p><div class="bubble"><p>Morning! Did the Northwind notes make it into Harbour Notes?</p><p class="bubble__meta"><span class="vh">Daniel Reyes,</span><time datetime="2026-10-09T09:02">9:02 am</time></p></div><div class="bubble bubble--mine"><p>They did. I added the sketches from Thursday too.</p><p class="bubble__meta"><span class="vh">You,</span><time datetime="2026-10-09T09:06">9:06 am</time> · Read</p></div></div><form class="thread__composer"><label class="vh" for="anatomy-reply">Message Daniel Reyes</label><textarea class="textarea" id="anatomy-reply" rows="1" placeholder="Write a message"></textarea><button class="btn btn--primary" type="submit">Send</button></form></section>
```

## Variants

### conversation
Two people, today, with the reply box ready.
```html
<section class="thread" aria-label="Conversation with Daniel Reyes"><div class="thread__log" role="log" aria-label="Messages"><p class="thread__day">Today</p><div class="bubble"><p>Morning! Did the Northwind notes make it into Harbour Notes?</p><p class="bubble__meta"><span class="vh">Daniel Reyes,</span><time datetime="2026-10-09T09:02">9:02 am</time></p></div><div class="bubble bubble--mine"><p>They did. I added the sketches from Thursday too.</p><p class="bubble__meta"><span class="vh">You,</span><time datetime="2026-10-09T09:06">9:06 am</time></p></div><div class="bubble"><p>Perfect. Are you coming to Field Day next Saturday?</p><p class="bubble__meta"><span class="vh">Daniel Reyes,</span><time datetime="2026-10-09T09:15">9:15 am</time></p></div><div class="bubble bubble--mine"><p>Yes, I'll bring the board printouts.</p><p class="bubble__meta"><span class="vh">You,</span><time datetime="2026-10-09T09:18">9:18 am</time> · Read</p></div></div><form class="thread__composer"><label class="vh" for="reply-daniel">Message Daniel Reyes</label><textarea class="textarea" id="reply-daniel" rows="1" placeholder="Write a message"></textarea><button class="btn btn--primary" type="submit">Send</button></form></section>
```

### history
A longer conversation across days: a divider starts each day; no reply box while it is shown in a preview.
```html
<section class="thread" aria-label="Conversation with Grace Liu"><div class="thread__log" role="log" aria-label="Messages"><p class="thread__day"><time datetime="2026-10-07">Wed 7 Oct</time></p><div class="bubble"><p>Could you look over the Harbour Notes cover before Friday?</p><p class="bubble__meta"><span class="vh">Grace Liu,</span><time datetime="2026-10-07T16:20">4:20 pm</time></p></div><div class="bubble bubble--mine"><p>Of course. Send it over whenever it's ready.</p><p class="bubble__meta"><span class="vh">You,</span><time datetime="2026-10-07T16:31">4:31 pm</time></p></div><p class="thread__day">Today</p><div class="bubble"><p>Here it is. Two versions, I prefer the quieter one.</p><p class="bubble__meta"><span class="vh">Grace Liu,</span><time datetime="2026-10-09T08:40">8:40 am</time></p></div></div></section>
```

### group
Three or more people: their bubbles start with the sender's name.
```html
<section class="thread" aria-label="Conversation with Caleb Morgan and Noah Fischer"><div class="thread__log" role="log" aria-label="Messages"><p class="thread__day">Today</p><div class="bubble"><p class="bubble__from">Caleb Morgan</p><p>Shall we demo Northwind at Field Day?</p><p class="bubble__meta"><time datetime="2026-10-09T11:02">11:02 am</time></p></div><div class="bubble"><p class="bubble__from">Noah Fischer</p><p>Yes. I can have the offline mode ready by Thursday.</p><p class="bubble__meta"><time datetime="2026-10-09T11:09">11:09 am</time></p></div><div class="bubble bubble--mine"><p>I'll write the two-minute walkthrough.</p><p class="bubble__meta"><span class="vh">You,</span><time datetime="2026-10-09T11:12">11:12 am</time></p></div></div><form class="thread__composer"><label class="vh" for="reply-group">Message Caleb Morgan and Noah Fischer</label><textarea class="textarea" id="reply-group" rows="1" placeholder="Write a message"></textarea><button class="btn btn--primary" type="submit">Send</button></form></section>
```

### read only
The conversation can no longer be answered: the reply box gives way to a note that says why.
```html
<section class="thread" aria-label="Conversation with Peter Walsh"><div class="thread__log" role="log" aria-label="Messages"><p class="thread__day"><time datetime="2026-09-28">Mon 28 Sep</time></p><div class="bubble"><p>Thanks for all the help on Harbour Notes this summer.</p><p class="bubble__meta"><span class="vh">Peter Walsh,</span><time datetime="2026-09-28T14:10">2:10 pm</time></p></div></div><p class="thread__note"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg>Peter Walsh closed his account. You can read this conversation but not reply.</p></section>
```

## Sizes

N/A: One size. Bubbles size to their words up to 34rem, and the thread fills its column.

## States

Focus rings the Send button. **Sending** adds your bubble at once with a dashed outline and "Sending…";
the reply box empties and stays usable. **Failed** turns that bubble to the danger wash and offers **Try
again** in the meta. **Empty** is a new conversation: one line says who it is with, and the reply box is
ready.

### sending
```html
<section class="thread" aria-label="Conversation with Daniel Reyes"><div class="thread__log" role="log" aria-label="Messages"><p class="thread__day">Today</p><div class="bubble"><p>Perfect. Are you coming to Field Day next Saturday?</p><p class="bubble__meta"><span class="vh">Daniel Reyes,</span><time datetime="2026-10-09T09:15">9:15 am</time></p></div><div class="bubble bubble--mine bubble--sending" aria-busy="true"><p>Yes, I'll bring the board printouts.</p><p class="bubble__meta"><span class="inline-status"><span class="spinner spinner--sm" aria-hidden="true"></span>Sending…</span></p></div></div><form class="thread__composer"><label class="vh" for="reply-sending">Message Daniel Reyes</label><textarea class="textarea" id="reply-sending" rows="1" placeholder="Write a message"></textarea><button class="btn btn--primary" type="submit">Send</button></form></section>
```

### failed
```html
<section class="thread" aria-label="Conversation with Daniel Reyes"><div class="thread__log" role="log" aria-label="Messages"><p class="thread__day">Today</p><div class="bubble"><p>Perfect. Are you coming to Field Day next Saturday?</p><p class="bubble__meta"><span class="vh">Daniel Reyes,</span><time datetime="2026-10-09T09:15">9:15 am</time></p></div><div class="bubble bubble--mine bubble--failed"><p>Yes, I'll bring the board printouts.</p><p class="bubble__meta" role="alert"><span class="inline-status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Not sent.</span> <button class="btn btn--text btn--sm" type="button">Try again</button></p></div></div><form class="thread__composer"><label class="vh" for="reply-failed">Message Daniel Reyes</label><textarea class="textarea" id="reply-failed" rows="1" placeholder="Write a message"></textarea><button class="btn btn--primary" type="submit">Send</button></form></section>
```

### empty
```html
<section class="thread" aria-label="Conversation with Ruth Alvarez"><div class="thread__log" role="log" aria-label="Messages"><div class="thread__empty"><strong>Start a conversation with Ruth</strong><p>Messages are private to the two of you.</p></div></div><form class="thread__composer"><label class="vh" for="reply-empty">Message Ruth Alvarez</label><textarea class="textarea" id="reply-empty" rows="1" placeholder="Write a message"></textarea><button class="btn btn--primary" type="submit">Send</button></form></section>
```

## Responsive

At 360px bubbles take up to 85% of the thread so both sides stay distinct, and the Send button stays
beside the reply box; the thread is a size container, and only when it is narrower than 18rem does Send
drop below the box. At 768px a thread usually sits beside its [inbox](inbox.html) in a split view; at
1024px and up bubbles stop at 34rem so lines stay readable. The log scrolls; the reply box stays at the
bottom of the view.

## Accessibility

**Role:** a `<section>` named "Conversation with …"; the messages sit in a `role="log"` region so new messages are announced politely. The reply box is a `<form>`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves between the reply box, Send and any Try again button. |
| Enter | In the reply box, adds a line break (Ctrl+Enter or the Send button sends). |
| Enter, Space | On Send or Try again: activates it. |

**Focus:** after sending, focus stays in the emptied reply box. Try again moves focus back to the reply box.

**Labelling:** alignment and colour are not enough to tell who spoke: every bubble's meta starts with a
visually hidden "You," or the sender's name, and group bubbles show the name in text. The reply box's
label names the recipient ("Message Daniel Reyes"); the placeholder is never the only label. Failures use
`role="alert"`, and a sending bubble sets `aria-busy="true"`.

**Motion:** new bubbles appear without sliding under reduced motion; the spinner stops.

**Touch:** Send is a 44px pill; Try again is at least 36px tall.

## Content

Times are short (**9:06 am**) with a day divider above each day (**Today**, **Wed 7 Oct**). Only your
last message says **Read** or **Sending…**. Explain what cannot be done and why in one sentence: **Peter
Walsh closed his account. You can read this conversation but not reply.** The empty line invites a first
message: **Start a conversation with Ruth**.

## Do and don't

### Do
Name the sender in text for every bubble in a group.
```html
<section class="thread" aria-label="Conversation with Caleb Morgan and Noah Fischer"><div class="thread__log" role="log" aria-label="Messages"><div class="bubble"><p class="bubble__from">Caleb Morgan</p><p>Shall we demo Northwind at Field Day?</p></div><div class="bubble"><p class="bubble__from">Noah Fischer</p><p>Yes, offline mode will be ready.</p></div></div></section>
```

### Don't
Rely on side and colour alone to show who wrote what.
```html
<section class="thread" aria-label="Conversation"><div class="thread__log" role="log" aria-label="Messages"><div class="bubble"><p>Shall we demo Northwind at Field Day?</p></div><div class="bubble"><p>Yes, offline mode will be ready.</p></div></div></section>
```

### Do
Keep a failed message in place and say how to fix it.
```html
<section class="thread" aria-label="Conversation with Daniel Reyes"><div class="thread__log" role="log" aria-label="Messages"><div class="bubble bubble--mine bubble--failed"><p>Yes, I'll bring the board printouts.</p><p class="bubble__meta">Not sent. <button class="btn btn--text btn--sm" type="button">Try again</button></p></div></div></section>
```

### Don't
Mark a failure with a bare "Error" and no way forward.
```html
<section class="thread" aria-label="Conversation with Daniel Reyes"><div class="thread__log" role="log" aria-label="Messages"><div class="bubble bubble--mine bubble--failed"><p>Yes, I'll bring the board printouts.</p><p class="bubble__meta">Error</p></div></div></section>
```

### Do
Start each day with one divider and keep bubble times short.
```html
<section class="thread" aria-label="Conversation with Grace Liu"><div class="thread__log" role="log" aria-label="Messages"><p class="thread__day">Today</p><div class="bubble"><p>Here is the cover.</p><p class="bubble__meta">8:40 am</p></div><div class="bubble bubble--mine"><p>The quieter one, please.</p><p class="bubble__meta">8:44 am</p></div></div></section>
```

### Don't
Stamp every bubble with the full date; the noise buries the words.
```html
<section class="thread" aria-label="Conversation with Grace Liu"><div class="thread__log" role="log" aria-label="Messages"><div class="bubble"><p>Here is the cover.</p><p class="bubble__meta">Friday 9 October 2026 at 08:40:12</p></div><div class="bubble bubble--mine"><p>The quieter one, please.</p><p class="bubble__meta">Friday 9 October 2026 at 08:44:57</p></div></div></section>
```

## Tokens

Threads read the surface and subtle backgrounds, `--color-accent-subtle` for your bubbles, the danger
roles for failures and `--size-bubble-max` for the bubble width.

## Code

Wrap the messages in `.thread__log` with `role="log"`. Add `bubble--mine` to your messages, `bubble--sending`
while one is in flight and `bubble--failed` when it fails. Put the reply box in `.thread__composer`.
