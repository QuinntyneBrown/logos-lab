---
title: Workflow bar
tier: standard
order: 94
summary: The sticky bar at the top of every studio editor: what is being edited, where it is in the publishing workflow, whether it is saved, and the next action.
selector: .workflow
layout: block
target: .workflow__actions .btn--primary
states: default, hover, focus, loading, saving, not-saved
matrix-variants: draft
matrix-cell: 40rem
contrast: --color-fg-default|--color-bg-canvas|4.5; --color-fg-subtle|--color-bg-canvas|4.5; --color-fg-accent|--color-bg-canvas|4.5; --color-warning-fg|--color-bg-canvas|4.5
---

## Overview

Every editor in the {{app}} studio (course, article, collection, event) sits under the workflow bar.
It names the item, shows its state with a [badge](badge.html), reports autosave, shows the path from Draft
to Published, and holds the one or two actions that move the item on. Experts see **Submit for review**;
editors see **Request changes** and **Approve**. For a page's static title and actions outside the studio
use the [page header](page-header.html); for a multi-step form use the [stepper](stepper.html).

## Anatomy

1. **Bar**: `div.workflow`, sticky to the top of the editor on the canvas, with a hairline below.
2. **Inner**: `__inner`, the page container's width; wraps its parts.
3. **Title**: `__title`, the item's name (`__name`, one line, truncated) over the meta row (`__meta`).
4. **State**: a [badge](badge.html) in the meta: Draft, In review, Changes requested, Approved, Scheduled, Published.
5. **Autosave**: an [inline status](inline-message.html) in the meta: "Saved 10:24 am", "Saving…", "Not saved — retrying".
6. **Steps**: `ol.workflow__steps`, Draft › In review › Approved › Scheduled › Published; done steps are muted, the current one is accent and semibold.
7. **Actions**: `__actions`, Preview and the next workflow action, primary last.

## Variants

### draft
An expert's draft, saved, ready to submit.
```html
<div class="workflow"><div class="workflow__inner"><div class="workflow__title"><p class="workflow__name">What Augustine Might Say About Large Language Models</p><div class="workflow__meta"><span class="badge">Draft</span><span class="inline-status" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Saved 10:24 am</span></div></div><ol class="workflow__steps" aria-label="Publishing workflow"><li aria-current="step">Draft</li><li>In review</li><li>Approved</li><li>Scheduled</li><li>Published</li></ol><div class="workflow__actions"><button class="btn btn--quiet btn--sm" type="button">Preview</button><button class="btn btn--primary btn--sm" type="button">Submit for review</button></div></div></div>
```

### in review
What the editor, Naomi Ellis, sees on an item in review.
```html
<div class="workflow"><div class="workflow__inner"><div class="workflow__title"><p class="workflow__name">Bias in the Training Data v2</p><div class="workflow__meta"><span class="badge badge--info">In review</span><span>Submitted by Dr. Mei Lin Chen 6 days ago</span></div></div><ol class="workflow__steps" aria-label="Publishing workflow"><li class="is-done">Draft</li><li aria-current="step">In review</li><li>Approved</li><li>Scheduled</li><li>Published</li></ol><div class="workflow__actions"><button class="btn btn--quiet btn--sm" type="button">Preview</button><button class="btn btn--quiet btn--sm" type="button">Request changes</button><button class="btn btn--primary btn--sm" type="button">Approve</button></div></div></div>
```

### published
A published item being edited again: changes become a new version.
```html
<div class="workflow"><div class="workflow__inner"><div class="workflow__title"><p class="workflow__name">Five Questions to Ask Before Your Church Adopts AI</p><div class="workflow__meta"><span class="badge badge--success">Published</span><span>Editing a new version</span></div></div><ol class="workflow__steps" aria-label="Publishing workflow"><li class="is-done">Draft</li><li class="is-done">In review</li><li class="is-done">Approved</li><li class="is-done">Scheduled</li><li aria-current="step">Published</li></ol><div class="workflow__actions"><a class="btn btn--quiet btn--sm" href="#">View live</a><button class="btn btn--primary btn--sm" type="button">Submit changes for review</button></div></div></div>
```

## Sizes

N/A: one size; small buttons keep the bar short.

## States

Hover, focus and loading are the primary action's own: loading shows the spinner while the item is
submitted. **Saving** replaces the saved time with a spinner and "Saving…". **Not saved** turns the status
warning-coloured and says it is retrying; the actions stay available and the edits stay on the page.

### saving
```html
<div class="workflow"><div class="workflow__inner"><div class="workflow__title"><p class="workflow__name">What Augustine Might Say About Large Language Models</p><div class="workflow__meta"><span class="badge">Draft</span><span class="inline-status" role="status"><span class="spinner" aria-hidden="true"></span>Saving…</span></div></div><div class="workflow__actions"><button class="btn btn--quiet btn--sm" type="button">Preview</button><button class="btn btn--primary btn--sm" type="button">Submit for review</button></div></div></div>
```

### not-saved
```html
<div class="workflow"><div class="workflow__inner"><div class="workflow__title"><p class="workflow__name">What Augustine Might Say About Large Language Models</p><div class="workflow__meta"><span class="badge">Draft</span><span class="inline-status inline-status--warning" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Not saved — retrying</span></div></div><div class="workflow__actions"><button class="btn btn--quiet btn--sm" type="button">Preview</button><button class="btn btn--primary btn--sm" type="button">Submit for review</button></div></div></div>
```

## Responsive

At 360px the title takes the full row, the steps wrap below it, and the actions wrap last; the name
truncates with an ellipsis and its full text is in the editor's title field. From 768px the steps sit
beside the title. From 1024px everything fits on one row for most titles.

## Accessibility

**Role:** a plain region at the top of the editor; the steps are an ordered list named "Publishing
workflow" with `aria-current="step"` on the current one. The autosave status is a polite `role="status"`.

| Key | Effect |
|---|---|
| Tab | Moves to Preview, then the workflow actions. |
| Enter or Space | Runs the action; Submit for review opens a confirmation dialog. |

**Focus:** after an action the focus returns to the bar's primary action, now showing the next step.

**Labelling:** the state is written in the badge and the current step, never only the step's colour.
Autosave announces "Saving…" once per save, not on every keystroke.

**Motion:** the spinner stops under reduced motion and the text alone carries the state.

**Touch:** buttons are small pills but keep a 44px target through their padding and spacing.

## Content

States are single words or short phrases in sentence case: **Draft**, **In review**, **Changes
requested**, **Approved**, **Scheduled**, **Published**. Autosave reads **Saved 10:24 am**, **Saving…**,
**Not saved — retrying**. Actions name the workflow step: **Submit for review**, **Request changes**,
**Approve**, **Schedule**, **Publish now**.

## Do and don't

### Do
Name the next workflow step on the primary action.
```html
<div class="workflow__actions"><button class="btn btn--quiet btn--sm" type="button">Preview</button><button class="btn btn--primary btn--sm" type="button">Submit for review</button></div>
```

### Don't
Use a generic Save button: autosave already saves.
```html
<div class="workflow__actions"><button class="btn btn--primary btn--sm" type="button">Save</button></div>
```

### Do
Say when saving failed and that it is retrying.
```html
<div class="workflow__meta"><span class="inline-status inline-status--warning" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Not saved — retrying</span></div>
```

### Don't
Leave the last saved time standing after a save fails.
```html
<div class="workflow__meta"><span class="inline-status" role="status">Saved 10:24 am</span></div>
```
