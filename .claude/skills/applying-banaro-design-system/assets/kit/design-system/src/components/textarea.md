---
title: Textarea
tier: core
order: 22
summary: Room for a longer answer — a project summary, meeting notes, a reply — that grows with what people write.
selector: .textarea
target: textarea
states: default, hover, focus, disabled, read-only, invalid
error: Write a short summary so the team knows what Northwind is for.
matrix-variants: default, counter, auto-grow
knobs: --bn-field-border = `--color-border-strong`; hover `--color-fg-muted`; invalid `--color-danger-solid`
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-border-strong|--color-bg-surface|3; --color-danger-solid|--color-bg-surface|3; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a textarea when the answer is a sentence or more: a summary, notes, feedback, a message. For a name,
a number or anything that fits on one line, use a [text field](text-field.html). A textarea always sits
in a [form field](form-field.html) with a visible label, and starts tall enough to show what a good answer
looks like — three to five lines.

## Anatomy

1. **Label** — from the surrounding `.field`.
2. **Container** — `.textarea`: at least 120px tall, medium radius, hairline strong border, resizable vertically.
3. **Text** — body size at the normal line height, so long notes stay readable.
4. **Help and counter** — optional guidance and a soft character limit under the box.

```html
<div class="field"><label class="field__label" for="anat-summary">Project summary</label><textarea class="textarea" id="anat-summary" name="summary" rows="4" aria-describedby="anat-summary-help anat-summary-count">Northwind keeps the team's plans, notes and decisions in one calm place, so nobody has to dig through chat to find what was agreed.</textarea><div class="cluster cluster--between"><p class="field__help" id="anat-summary-help">Two or three sentences. Shown at the top of the project.</p><p class="field__counter" id="anat-summary-count">131 / 280</p></div></div>
```

## Variants

### default
A labelled box with help, sized with `rows`.
```html
<div class="field"><label class="field__label" for="ta-summary">Project summary</label><textarea class="textarea" id="ta-summary" name="summary" rows="4" aria-describedby="ta-summary-help">Northwind keeps the team's plans, notes and decisions in one calm place.</textarea><p class="field__help" id="ta-summary-help">Two or three sentences. Shown at the top of the project.</p></div>
```

### counter
A soft limit and a live count. People can type past it; the form flags the overflow instead of cutting text.
```html
<div class="field"><label class="field__label" for="ta-feedback">Feedback for Grace</label><textarea class="textarea" id="ta-feedback" name="feedback" rows="3" aria-describedby="ta-feedback-count">The new Field Day agenda reads beautifully. Could we move lunch to 12:30?</textarea><p class="field__counter" id="ta-feedback-count">73 / 500</p></div>
```

### auto-grow
`.textarea--grow` grows with its content (`field-sizing: content`) — for notes that can run long.
```html
<div class="field"><label class="field__label" for="ta-notes">Meeting notes <span class="field__optional">(optional)</span></label><textarea class="textarea textarea--grow" id="ta-notes" name="notes">Agreed: Field Day starts at 10:00 am on Saturday 17 October.
Daniel books the long tables; Hannah brings the printed maps.
Open question: do we need a rain plan?</textarea></div>
```

### with actions
A compact reply box with its own send action, as under a comment thread.
```html
<form class="form" action="#"><div class="field"><label class="field__label" for="ta-reply">Reply to Daniel</label><textarea class="textarea" id="ta-reply" name="reply" rows="2" placeholder="Thanks, Daniel — I can bring the maps."></textarea></div><div class="form-actions form-actions--end"><button class="btn btn--quiet btn--sm" type="button">Cancel</button><button class="btn btn--primary btn--sm" type="submit">Send reply</button></div></form>
```

## Sizes

N/A: Set the height with `rows` (3 for a reply, 4–5 for a summary, 8 or more for notes) and let `.textarea--grow` or the vertical resize handle take it from there. Width always fills the field.

## States

Hover darkens the border to the muted role; focus draws the sage ring. Read-only fills with linen but keeps
the text in the default colour so it stays easy to read and copy; disabled also mutes the text. Invalid
turns the border to danger, tints the fill and adds an error message below, keeping everything the person
wrote.

## Responsive

The textarea fills its column at every width. On phones keep `rows` at 3–4 so the label, the box and the
submit button fit above the keyboard. The resize handle stays vertical-only so the layout never breaks
sideways.

## Accessibility

**Role:** native `<textarea>`, multi-line by definition.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves into and out of the textarea. Tab never inserts a tab character. |
| Enter | Starts a new line. It never submits the form. |
| Arrow keys, Home, End, Page Up / Down | Move the caret through the text. |

**Focus:** the 2px ring offset 3px wraps the box. Focus never moves out on its own, not even when a
character limit is reached.

**Labelling:** a visible `<label for>`; help and the counter are linked with `aria-describedby`. Announce
the count politely (`aria-live="polite"` on a visually hidden copy, updated after typing pauses), not on
every keystroke.

**Motion:** border and fill colour changes only; `field-sizing` growth is instant and has no animation.

**Touch:** the whole box is the target. Keep at least 120px of height so the keyboard does not cover the
text being written.

## Content

- The label names the content: **Project summary**, **Meeting notes**, **Reply to Daniel**.
- Help sets expectations about length and audience: "Two or three sentences. Shown at the top of the project."
- Placeholders may show a starting line in the product's own voice ("Thanks, Daniel — I can bring the
  maps."), never "Type here…".
- Errors keep the text and say what is missing: "Write a short summary so the team knows what Northwind is for".

## Do and don't

### Do
Start tall enough to show what a good answer looks like.
```html
<div class="field"><label class="field__label" for="dd-why">Why are you joining Field Day?</label><textarea class="textarea" id="dd-why" name="why" rows="4"></textarea></div>
```

### Don't
A one-row textarea hides what has been written and signals a short answer.
```html
<div class="field"><label class="field__label" for="dd-why-bad">Why are you joining Field Day?</label><textarea class="textarea" id="dd-why-bad" name="why" rows="1" style="min-height: 0"></textarea></div>
```

### Do
Let people type past a soft limit and show the overflow.
```html
<div class="field"><label class="field__label" for="dd-bio">Short bio</label><textarea class="textarea" id="dd-bio" name="bio" rows="3" aria-invalid="true" aria-describedby="dd-bio-error dd-bio-count">Product designer on Northwind. I care about calm tools, careful words and well-run meetings that end on time, with notes everybody can find afterwards.</textarea><p class="field__error" id="dd-bio-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Shorten your bio to 140 characters.</p><p class="field__counter" id="dd-bio-count">151 / 140</p></div>
```

### Don't
A hard `maxlength` silently drops what people paste.
```html
<div class="field"><label class="field__label" for="dd-bio-bad">Short bio</label><textarea class="textarea" id="dd-bio-bad" name="bio" rows="3" maxlength="140">Product designer on Northwind. I care about calm tools, careful words and well-run meetings that end on time, with notes everybody c</textarea></div>
```

## Tokens

Textareas share the text field roles: surface, default and subtle text, the strong border, the danger roles,
the medium radius and `--size-textarea-min` for the starting height.

## Code

Use `textarea.textarea` inside a `.field` and set `rows`. Add `.textarea--grow` for notes that should grow
with their content.
