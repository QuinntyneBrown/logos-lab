---
title: Popover
tier: standard
order: 46
summary: A small raised panel anchored to the control that opened it, for a short explanation or one light choice that does not block the page.
selector: .popover
target: button[aria-expanded]
states: default, hover, focus, closed
contrast: --color-fg-default|--color-bg-surface-raised|4.5; --color-fg-muted|--color-bg-surface-raised|4.5; --color-focus-ring|--color-bg-surface-raised|3
---

## Overview

Use a popover for a few lines of help, a quick share or rename, or a preview of a person — anything
people may glance at and dismiss without losing their place. It never blocks the page and closes when
focus or a click moves elsewhere. Use a [tooltip](tooltip.html) for a short label on hover or focus with
nothing to click, a [menu](menu.html) for a list of commands, and a [dialog](dialog.html) when the choice
must be made before anything else.

## Anatomy

1. **Trigger** — the button that opens it, with `aria-expanded` and `aria-controls`.
2. **Panel** — a raised surface, 18rem wide, with a large radius and `--shadow-3` (`.popover`).
3. **Title** — a short heading in the h4 style (`.popover__title`) that names the panel.
4. **Body** — one or two sentences in muted small text (`.popover__body`).
5. **Actions** — optional small buttons, right-aligned, primary last (`.popover__actions`).

```html
<div class="popover-anchor"><button class="btn btn--quiet btn--sm" type="button" aria-expanded="true" aria-controls="anat-pop">Share</button><div class="popover" id="anat-pop" role="dialog" aria-labelledby="anat-pop-title"><p class="popover__title" id="anat-pop-title">Share Harbour Notes</p><p class="popover__body">Everyone in Northwind can read it. Invite people to let them edit.</p><div class="popover__actions"><button class="btn btn--quiet btn--sm" type="button">Copy link</button><button class="btn btn--primary btn--sm" type="button">Invite people</button></div></div></div>
```

## Variants

### with actions
The base popover: a title, one sentence and two small actions, primary last.
```html
<div class="popover-anchor">
  <button class="btn btn--quiet btn--sm" type="button" aria-expanded="true" aria-controls="pop-share"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>Share</button>
  <div class="popover" id="pop-share" role="dialog" aria-labelledby="pop-share-title">
    <p class="popover__title" id="pop-share-title">Share Harbour Notes</p>
    <p class="popover__body">Everyone in Northwind can read it. Invite people to let them edit.</p>
    <div class="popover__actions"><button class="btn btn--quiet btn--sm" type="button">Copy link</button><button class="btn btn--primary btn--sm" type="button">Invite people</button></div>
  </div>
</div>
```

### explainer
A toggletip behind an info button: a few words of help, no actions. It opens on click, not hover, so it
works on touch.
```html
<div class="popover-anchor">
  <button class="icon-btn" type="button" aria-label="About sync" aria-expanded="true" aria-controls="pop-sync"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/></svg></button>
  <div class="popover" id="pop-sync" role="dialog" aria-labelledby="pop-sync-title">
    <p class="popover__title" id="pop-sync-title">How sync works</p>
    <p class="popover__body">Harbour Notes saves as you type and syncs with everyone in Northwind every few seconds. Offline edits sync when you reconnect.</p>
  </div>
</div>
```

### with field
One field and a save, for quick edits such as a rename. Anything longer belongs in a dialog.
```html
<div class="popover-anchor">
  <button class="btn btn--ghost btn--sm" type="button" aria-expanded="true" aria-controls="pop-rename"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>Rename</button>
  <div class="popover" id="pop-rename" role="dialog" aria-labelledby="pop-rename-title">
    <p class="popover__title" id="pop-rename-title">Rename notebook</p>
    <div class="field popover__body"><label class="field__label" for="pop-rename-name">Notebook name</label><input class="input input--md" id="pop-rename-name" type="text" value="Harbour Notes"></div>
    <div class="popover__actions"><button class="btn btn--quiet btn--sm" type="button">Cancel</button><button class="btn btn--primary btn--sm" type="button">Save name</button></div>
  </div>
</div>
```

### person preview
Opened from a name, it shows who someone is and the next step, without leaving the page.
```html
<div class="popover-anchor">
  <button class="btn btn--text" type="button" aria-expanded="true" aria-controls="pop-grace">Grace Liu</button>
  <div class="popover" id="pop-grace" role="dialog" aria-labelledby="pop-grace-title">
    <div class="cluster"><img class="avatar avatar--md" src="../assets/photos/grace-liu.jpg" width="48" height="48" alt=""><div><p class="popover__title" id="pop-grace-title">Grace Liu</p><p class="muted">Designer · Lisbon</p></div></div>
    <p class="popover__body">Working on Harbour Notes. Usually replies within a day.</p>
    <div class="popover__actions"><a class="btn btn--quiet btn--sm" href="#">View profile</a><button class="btn btn--primary btn--sm" type="button">Message Grace</button></div>
  </div>
</div>
```

## Sizes

N/A: one width, `--layout-card-min` (18rem) or the space available, whichever is smaller; height follows the content.

## States

**Default** is open, with the trigger marked `aria-expanded="true"`. **Hover** and **focus** show on the
trigger as on any button; focus inside the panel uses the same sage ring. **Closed** leaves only the trigger,
with `aria-expanded="false"`; nothing of the panel stays in the layout.

### with actions / closed
```html
<div class="popover-anchor"><button class="btn btn--quiet btn--sm" type="button" aria-expanded="false"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>Share</button></div>
```

### explainer / closed
```html
<div class="popover-anchor"><button class="icon-btn" type="button" aria-label="About sync" aria-expanded="false"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/></svg></button></div>
```

### with field / closed
```html
<div class="popover-anchor"><button class="btn btn--ghost btn--sm" type="button" aria-expanded="false"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>Rename</button></div>
```

### person preview / closed
```html
<div class="popover-anchor"><button class="btn btn--text" type="button" aria-expanded="false">Grace Liu</button></div>
```

## Responsive

From 768px the popover opens below its trigger and flips above when there is no room
(`position-try-fallbacks: flip-block`). At 360px it is never wider than the screen less the page margins;
when a popover would hold more than a sentence and two buttons on a phone, use a bottom
[sheet](drawer.html) instead.

## Theming

The panel uses `--color-bg-surface-raised`, a hairline `--color-border-default` and `--shadow-3`. In dark mode
the raised surface is lighter than the page, and the hairline keeps the edge crisp where the shadow fades.

## Accessibility

**Role:** a non-modal dialog (`role="dialog"`, labelled by its title) when it holds controls. In production
use the `popover` attribute and `popovertarget` on the trigger, which give light dismiss and top-layer
stacking for free. The trigger carries `aria-expanded` and `aria-controls`.

| Key | Effect |
|---|---|
| Enter, Space | On the trigger, opens or closes the popover. |
| Tab / Shift+Tab | Moves into the panel and through its controls; tabbing past the last control closes it. |
| Escape | Closes the popover and returns focus to the trigger. |

**Focus:** opening moves focus to the first control in the panel, or keeps it on the trigger when the
panel is text only. Closing — by Escape, an action or a click outside — returns focus to the trigger.

**Labelling:** icon-only triggers need `aria-label` (**About sync**). The person's photo is decorative because
their name is the title.

**Motion:** none beyond the shared colour transitions; the panel appears in place.

**Touch:** explainers open on tap, never on hover. Actions are `btn--sm` (36px) and sit `--space-2` apart.

## Content

Title with the object: **Share Harbour Notes**, **Rename notebook**. Keep the body to one or two sentences
that answer the question the trigger raises. Action labels are a verb and an object: **Copy link**,
**Invite people**, **Save name**.

## Do and don't

### Do
Open explanations on click with a labelled info button.
```html
<button class="icon-btn" type="button" aria-label="About sync" aria-expanded="false"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/></svg></button>
```

### Don't
Put a long form in a popover; it belongs in a dialog or on a page.
```html
<div class="popover" role="dialog" aria-labelledby="dont-pop-title"><p class="popover__title" id="dont-pop-title">Edit Field Day</p><div class="field"><label class="field__label" for="dont-date">Date</label><input class="input input--md" id="dont-date" type="date" value="2026-10-17"></div><div class="field"><label class="field__label" for="dont-place">Place</label><input class="input input--md" id="dont-place" type="text" value="The long room"></div><div class="field"><label class="field__label" for="dont-about">About</label><textarea class="textarea" id="dont-about" rows="3">Coffee and demos.</textarea></div></div>
```

### Do
Keep actions small and put the primary last.
```html
<div class="popover__actions"><button class="btn btn--quiet btn--sm" type="button">Copy link</button><button class="btn btn--primary btn--sm" type="button">Invite people</button></div>
```

### Don't
Fill a popover with full-size buttons that crowd the panel.
```html
<div class="popover__actions"><button class="btn btn--primary btn--lg" type="button">Copy link</button><button class="btn btn--primary btn--lg" type="button">Invite people</button></div>
```

## Tokens

Popovers read the raised surface, the hairline border, `--shadow-3`, `--radius-lg`, `--space-5` padding and
`--layout-card-min` for width.

## Code

Wrap the trigger and the panel in `.popover-anchor`. In production add `popover` to `.popover` and
`popovertarget` to the trigger; keep `aria-expanded` in sync when you open it from script.
