---
title: Transcript
tier: standard
order: 88
summary: A video's words as timed cues under the player. Each time seeks the video, the cue being spoken is highlighted, and a search marks every match.
selector: .transcript
layout: block
target: .transcript__time
states: default, hover, focus, current, search, no-matches
matrix-variants: cues
matrix-cell: 26rem
contrast: --color-fg-link|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-fg-default|--color-accent-subtle|4.5; --color-fg-default|--color-warning-bg|4.5
---

## Overview

Every {{app}} video has a transcript under the [player](player.html). It lets a learner read instead of
watch, find a passage, and jump the video to it. The cue being spoken follows playback. Use it only with a
player; for an article's text use [prose](prose.html), and for a long list of results use the
[search and filter toolbar](search-filter-toolbar.html).

## Anatomy

1. **Transcript**: `div.transcript`, the search field above the list.
2. **Search**: a [text field](text-field.html) of `type="search"` labelled "Search the transcript".
3. **List**: `ol.transcript__list`, scrolls on its own up to `--size-transcript-max`.
4. **Cue**: `li.transcript__cue`, a time and a sentence or two.
5. **Time**: `__time`, a link-coloured button that seeks the video to that cue.
6. **Text**: `__text`, the words in muted small text; the current cue turns default.
7. **Hit**: `mark.transcript__hit`, a warm highlight on each search match.

## Variants

### cues
The default list, following playback.
```html
<div class="transcript"><div class="field"><label class="field__label" for="tr-search">Search the transcript</label><input class="input" id="tr-search" type="search"></div><ol class="transcript__list" aria-label="Transcript of Can a Machine Pray?"><li class="transcript__cue"><button class="transcript__time" type="button" aria-label="Play from 12:02">12:02</button><p class="transcript__text">So the question is not whether the words are right.</p></li><li class="transcript__cue"><button class="transcript__time" type="button" aria-label="Play from 12:18">12:18</button><p class="transcript__text">A machine can produce a flawless psalm. Many already do.</p></li><li class="transcript__cue"><button class="transcript__time" type="button" aria-label="Play from 12:34">12:34</button><p class="transcript__text">Prayer is not a transaction of words. It is attention turned toward someone.</p></li><li class="transcript__cue"><button class="transcript__time" type="button" aria-label="Play from 12:51">12:51</button><p class="transcript__text">And attention is the first gift we give to anyone, human or divine.</p></li></ol></div>
```

### compact
Without the search field, for the narrow column beside a video in a lesson.
```html
<div class="transcript"><ol class="transcript__list" aria-label="Transcript of Inside a Neural Network in Ten Minutes"><li class="transcript__cue"><button class="transcript__time" type="button" aria-label="Play from 0:00">0:00</button><p class="transcript__text">A neural network is a very long sum with adjustable numbers in it.</p></li><li class="transcript__cue" aria-current="true"><button class="transcript__time" type="button" aria-label="Play from 0:14">0:14</button><p class="transcript__text">Training means nudging those numbers until the answers improve.</p></li></ol></div>
```

## Sizes

N/A: the transcript fills its column; the list height caps at `--size-transcript-max` and scrolls.

## States

Hover underlines a time and focus rings it. **Current** (`aria-current="true"` on the cue) washes the cue
in sage and darkens its text. **Search** marks each match and says how many there are. **No matches**
replaces the list with a sentence and keeps the query.

### current
```html
<div class="transcript"><ol class="transcript__list" aria-label="Transcript of Can a Machine Pray?"><li class="transcript__cue"><button class="transcript__time" type="button" aria-label="Play from 12:18">12:18</button><p class="transcript__text">A machine can produce a flawless psalm. Many already do.</p></li><li class="transcript__cue" aria-current="true"><button class="transcript__time" type="button" aria-label="Play from 12:34">12:34</button><p class="transcript__text">Prayer is not a transaction of words. It is attention turned toward someone.</p></li><li class="transcript__cue"><button class="transcript__time" type="button" aria-label="Play from 12:51">12:51</button><p class="transcript__text">And attention is the first gift we give to anyone, human or divine.</p></li></ol></div>
```

### search
```html
<div class="transcript"><div class="field"><label class="field__label" for="tr-hit">Search the transcript</label><input class="input" id="tr-hit" type="search" value="attention" aria-describedby="tr-hit-count"><p class="field__help" id="tr-hit-count" role="status">2 matches</p></div><ol class="transcript__list" aria-label="Transcript of Can a Machine Pray?"><li class="transcript__cue"><button class="transcript__time" type="button" aria-label="Play from 12:34">12:34</button><p class="transcript__text">Prayer is not a transaction of words. It is <mark class="transcript__hit">attention</mark> turned toward someone.</p></li><li class="transcript__cue"><button class="transcript__time" type="button" aria-label="Play from 12:51">12:51</button><p class="transcript__text">And <mark class="transcript__hit">attention</mark> is the first gift we give to anyone, human or divine.</p></li></ol></div>
```

### no-matches
```html
<div class="transcript"><div class="field"><label class="field__label" for="tr-none">Search the transcript</label><input class="input" id="tr-none" type="search" value="liturgy" aria-describedby="tr-none-count"><p class="field__help" id="tr-none-count" role="status">No matches for “liturgy” in this video.</p></div></div>
```

## Responsive

Times keep their column and the text wraps beside them at every width. On a phone the list sits below the
player; from 1024px a lesson may place it beside the player at the same height.

## Accessibility

**Role:** an ordered list of cues; each time is a native button. The current cue has
`aria-current="true"`. The match count is a polite `role="status"`.

| Key | Effect |
|---|---|
| Tab | Moves to the search field, then through each cue's time. |
| Enter or Space on a time | Seeks the video to that cue and keeps playing. |
| Escape in search | Clears the search and shows every cue. |

**Focus:** seeking leaves focus on the time button; it does not move to the player. The list does not
auto-scroll while focus is inside it.

**Labelling:** each time's name says what it does ("Play from 12:34"). The list is named after the video.

**Motion:** following playback scrolls the list smoothly; under reduced motion it jumps.

**Touch:** each time is at least 44px tall; the hit area spans the cue's full height.

## Content

Times are `m:ss`, matching the player. Cues are the speaker's words as spoken, in sentences, without
speaker labels unless more than one person speaks. The count reads **2 matches**, **1 match** or **No
matches for “liturgy” in this video.**

## Do and don't

### Do
Name each time by what it does.
```html
<ol class="transcript__list" aria-label="Transcript of Can a Machine Pray?"><li class="transcript__cue"><button class="transcript__time" type="button" aria-label="Play from 12:34">12:34</button><p class="transcript__text">It is attention turned toward someone.</p></li></ol>
```

### Don't
Show times as plain text that cannot seek.
```html
<ol class="transcript__list" aria-label="Transcript of Can a Machine Pray?"><li class="transcript__cue"><span class="transcript__text">12:34</span><p class="transcript__text">It is attention turned toward someone.</p></li></ol>
```

### Do
Say how many matches a search found.
```html
<div class="field"><label class="field__label" for="tr-do">Search the transcript</label><input class="input" id="tr-do" type="search" value="psalm" aria-describedby="tr-do-count"><p class="field__help" id="tr-do-count" role="status">1 match</p></div>
```

### Don't
Highlight the current cue with colour and no `aria-current`.
```html
<ol class="transcript__list" aria-label="Transcript of Can a Machine Pray?"><li class="transcript__cue"><button class="transcript__time" type="button" aria-label="Play from 12:34">12:34</button><p class="transcript__text"><mark class="transcript__hit">It is attention turned toward someone.</mark></p></li></ol>
```
