---
title: Rich editor
tier: standard
order: 101
summary: The studio's article body editor: a formatting toolbar, a writing surface that shows the text as readers will see it, and a status bar with the word count and save state.
selector: .editor
layout: block
target: .editor
states: default, focus, invalid
matrix-variants: article body
matrix-cell: 36rem
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-fg-accent|--color-accent-subtle|4.5; --color-border-strong|--color-bg-surface|3; --color-danger-solid|--color-bg-surface|3
---

## Overview

Experts and editors write article bodies, lesson text and course descriptions in the rich editor. The
surface uses the same [prose](prose.html) styles readers see, so there is no separate preview for the text.
The toolbar covers only what {{app}} publishes: bold, italic, two heading levels, quotes, links, Scripture
references and images. For a plain multi-line answer use a [textarea](textarea.html); for comments use
the [comment](comment.html) composer.

## Anatomy

1. **Editor**: `div.editor`, a birch box with a strong hairline; focus inside it rings the whole editor.
2. **Toolbar**: `__toolbar`, a `role="toolbar"` [button group](button-group.html) (`btn-group--toolbar`) of ghost icon buttons; toggles carry `aria-pressed`. `__sep` divides groups.
3. **Surface**: `__surface`, the editable area holding `.prose`; at least `--space-40` tall.
4. **Status**: `__status`, the word count and reading time on the left, the save state on the right.
5. **Flag**: `__flag`, a dashed danger outline around content that blocks publishing, such as an image with no alt text.

## Variants

### article body
The body of an article being written, with the caret in bold text.
```html
<div class="field"><p class="field__label" id="re-label">Body</p><div class="editor"><div class="editor__toolbar"><div class="btn-group btn-group--toolbar" role="toolbar" aria-label="Formatting"><button class="btn btn--ghost btn--icon" type="button" aria-pressed="true" aria-label="Bold"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7z"/><path d="M7 12h7a3.5 3.5 0 0 1 0 7H7z"/></svg></button><button class="btn btn--ghost btn--icon" type="button" aria-pressed="false" aria-label="Italic"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5h8M6 19h8M14 5l-4 14"/></svg></button><span class="editor__sep" aria-hidden="true"></span><button class="btn btn--ghost btn--icon" type="button" aria-pressed="false" aria-label="Heading 2">H2</button><button class="btn btn--ghost btn--icon" type="button" aria-pressed="false" aria-label="Heading 3">H3</button><button class="btn btn--ghost btn--icon" type="button" aria-pressed="false" aria-label="Quote"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 17.5c0-4 1.5-7 4.5-8.5M14 17.5c0-4 1.5-7 4.5-8.5"/></svg></button><span class="editor__sep" aria-hidden="true"></span><button class="btn btn--ghost btn--icon" type="button" aria-haspopup="dialog" aria-label="Link"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg></button><button class="btn btn--ghost btn--icon" type="button" aria-haspopup="dialog" aria-label="Scripture reference"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 4.5h11a1 1 0 0 1 1 1v14h-11a1 1 0 0 1-1-1z"/><path d="M11.5 8v6M9 10.5h5"/></svg></button><button class="btn btn--ghost btn--icon" type="button" aria-haspopup="dialog" aria-label="Image"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m20.5 16-5-5-8 8.5"/></svg></button></div></div><div class="editor__surface prose" contenteditable="true" role="textbox" aria-multiline="true" aria-labelledby="re-label"><h3>1. Who is it for?</h3><p>Before you choose a tool, name the people it will serve. <strong>A tool that saves the office an hour</strong> may cost a grieving family a conversation.</p></div><div class="editor__status"><span>1,284 words · 6 min read</span><span class="inline-status" role="status">Saved 10:24 am</span></div></div></div>
```

### quote and reference
A quotation with a Scripture reference; the Quote toggle is pressed.
```html
<div class="field"><p class="field__label" id="re-q-label">Body</p><div class="editor"><div class="editor__toolbar"><div class="btn-group btn-group--toolbar" role="toolbar" aria-label="Formatting"><button class="btn btn--ghost btn--icon" type="button" aria-pressed="false" aria-label="Bold"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7z"/><path d="M7 12h7a3.5 3.5 0 0 1 0 7H7z"/></svg></button><button class="btn btn--ghost btn--icon" type="button" aria-pressed="false" aria-label="Italic"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5h8M6 19h8M14 5l-4 14"/></svg></button><span class="editor__sep" aria-hidden="true"></span><button class="btn btn--ghost btn--icon" type="button" aria-pressed="true" aria-label="Quote"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 17.5c0-4 1.5-7 4.5-8.5M14 17.5c0-4 1.5-7 4.5-8.5"/></svg></button><button class="btn btn--ghost btn--icon" type="button" aria-haspopup="dialog" aria-label="Scripture reference"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 4.5h11a1 1 0 0 1 1 1v14h-11a1 1 0 0 1-1-1z"/><path d="M11.5 8v6M9 10.5h5"/></svg></button></div></div><div class="editor__surface prose" contenteditable="true" role="textbox" aria-multiline="true" aria-labelledby="re-q-label"><blockquote><p>Six days you shall labour and do all your work, but the seventh day is a Sabbath. <a href="#">Exodus 20:9–10</a></p></blockquote></div><div class="editor__status"><span>8 min read</span><span class="inline-status" role="status"><span class="spinner" aria-hidden="true"></span>Saving…</span></div></div></div>
```

## Sizes

N/A: the editor fills the form column; the surface grows with its content from `--space-40`.

## States

**Focus** inside the surface or toolbar rings the whole editor. Toolbar toggles show their pressed state
with the sage wash. **Invalid** turns the border danger, flags the content that blocks publishing with a
dashed outline and explains it below the editor; publishing stays blocked until it is fixed.

### invalid
```html
<div class="field"><p class="field__label" id="re-i-label">Body</p><div class="editor is-invalid" aria-describedby="re-i-error"><div class="editor__surface prose" contenteditable="true" role="textbox" aria-multiline="true" aria-invalid="true" aria-labelledby="re-i-label" aria-describedby="re-i-error"><p>Our working group met three times before writing a word of policy.</p><figure><img class="editor__flag" src="../assets/photos/coffee-together.jpg" alt=""><figcaption>The working group at St. Brigid’s Hall</figcaption></figure></div><div class="editor__status"><span>1,284 words · 6 min read</span><span class="inline-status" role="status">Saved 10:24 am</span></div></div><p class="field__error" id="re-i-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Add alt text to 1 image before you submit. Select the image, then choose Image.</p></div>
```

## Responsive

The toolbar wraps onto a second row at 360px; the separators keep the groups readable. The surface padding
stays 24px. The status bar wraps the save state under the word count on narrow screens.

## Accessibility

**Role:** the surface is a multi-line `textbox` labelled by the field label. The toolbar is a `toolbar`
with roving `tabindex`: one Tab stop, arrows inside.

| Key | Effect |
|---|---|
| Tab | Moves between the toolbar and the surface. |
| Left / Right arrow in the toolbar | Moves between buttons. |
| Ctrl + B / Ctrl + I | Bold / italic. |
| Ctrl + K | Opens the Link dialog. |
| Ctrl + Alt + 2 / 3 | Heading 2 / Heading 3. |

**Focus:** after a toolbar dialog (Link, Scripture reference, Image) closes, focus returns to the surface
at the caret.

**Labelling:** every toolbar button has a name; toggles report `aria-pressed`. The save state is a polite
status. The invalid message is linked with `aria-describedby`.

**Motion:** none beyond the spinner, which stops under reduced motion.

**Touch:** toolbar buttons are 44px; on a phone the toolbar stays above the on-screen keyboard.

## Content

Toolbar names are plain nouns: **Bold**, **Italic**, **Heading 2**, **Heading 3**, **Quote**, **Link**,
**Scripture reference**, **Image**. The status reads **1,284 words · 6 min read** and **Saved 10:24 am**.
Error messages say how many and how to fix: **Add alt text to 1 image before you submit.**

## Do and don't

### Do
Offer only the formatting {{app}} publishes.
```html
<div class="btn-group btn-group--toolbar" role="toolbar" aria-label="Formatting"><button class="btn btn--ghost btn--icon" type="button" aria-pressed="false" aria-label="Bold"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7z"/><path d="M7 12h7a3.5 3.5 0 0 1 0 7H7z"/></svg></button><button class="btn btn--ghost btn--icon" type="button" aria-pressed="false" aria-label="Italic"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5h8M6 19h8M14 5l-4 14"/></svg></button><button class="btn btn--ghost btn--icon" type="button" aria-pressed="false" aria-label="Heading 2">H2</button></div>
```

### Don't
Add font, size and colour pickers.
```html
<div class="btn-group btn-group--toolbar" role="toolbar" aria-label="Formatting"><button class="btn btn--ghost btn--sm" type="button">Font</button><button class="btn btn--ghost btn--sm" type="button">Size</button><button class="btn btn--ghost btn--sm" type="button">Colour</button></div>
```

### Do
Point at what blocks publishing and say how to fix it.
```html
<p class="field__error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Add alt text to 1 image before you submit.</p>
```

### Don't
Block submitting with a vague message.
```html
<p class="field__error">There are errors in the body.</p>
```
