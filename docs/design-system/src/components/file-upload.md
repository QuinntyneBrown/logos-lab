---
title: File upload
tier: standard
order: 28
summary: Add a file by choosing or dropping it, then see it upload, succeed or fail — with the native chooser always one key press away.
selector: .dropzone, .photo-edit
target: .dropzone
states: default, dragging, uploading, complete, invalid, failed, disabled
matrix-variants: dropzone
contrast: --color-fg-default|--color-bg-subtle|4.5; --color-fg-muted|--color-bg-subtle|4.5; --color-border-strong|--color-bg-surface|3; --color-fg-accent|--color-accent-subtle|4.5; --color-danger-fg|--color-danger-bg|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a file upload to attach a document or an image: a cover image for Northwind, the agenda for Field Day, a
profile photo. The dashed dropzone is a convenience for pointer users; the native file chooser inside it is
the real control and always works with a keyboard, a screen reader and a phone. For a profile photo or
logo, use the compact `.photo-edit` row with the current image and a Change photo button that opens a
[dialog](dialog.html). Show progress with a [progress bar](progress-bar.html) inside the dropzone.

## Anatomy

1. **Label** — the `.field` label, linked to the file input.
2. **Dropzone** — `.dropzone`: a dashed, rounded linen area that accepts dropped files.
3. **Icon tile** — `.dropzone__icon`, a sage tile with an upload glyph (decorative).
4. **Prompt** — `.dropzone__title`, one line saying what to drop.
5. **Chooser** — the native `input type="file"`; its button is styled as a quiet pill.
6. **Requirements** — help text with formats and size limit, linked with `aria-describedby`.
7. **File row** — `.dropzone__file`: preview or icon, `.dropzone__name`, `.dropzone__meta` and actions.

```html
<div class="field"><label class="field__label" for="anat-cover">Cover image for Northwind</label><div class="dropzone"><span class="dropzone__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15"/></svg></span><p class="dropzone__title">Drag an image here, or choose one</p><input type="file" id="anat-cover" name="cover" accept="image/jpeg,image/png" aria-describedby="anat-cover-help"><p class="field__help" id="anat-cover-help">JPG or PNG, up to 5 MB. Wide images work best.</p></div></div>
```

## Variants

### dropzone
One file, dropped or chosen.
```html
<div class="field"><label class="field__label" for="fu-cover">Cover image for Northwind</label><div class="dropzone"><span class="dropzone__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15"/></svg></span><p class="dropzone__title">Drag an image here, or choose one</p><input type="file" id="fu-cover" name="cover" accept="image/jpeg,image/png" aria-describedby="fu-cover-help"><p class="field__help" id="fu-cover-help">JPG or PNG, up to 5 MB. Wide images work best.</p></div></div>
```

### chosen
After choosing: a preview, the file name and size, and ways to replace or remove it.
```html
<div class="field"><span class="field__label" id="fu-chosen-label">Cover image for Northwind</span><div class="dropzone" role="group" aria-labelledby="fu-chosen-label"><div class="dropzone__file"><img src="../assets/photos/coffee-together.jpg" width="64" height="64" alt="Preview of northwind-cover.jpg"><div><p class="dropzone__name">northwind-cover.jpg</p><p class="dropzone__meta">1.4 MB · Ready to upload</p></div><button class="btn btn--quiet btn--sm" type="button">Replace</button><button class="btn btn--text btn--sm" type="button">Remove</button></div></div></div>
```

### attachments
Several files: the dropzone stays available and each attached file gets its own row with a named remove button.
```html
<div class="field"><label class="field__label" for="fu-files">Attachments for Field Day</label><div class="dropzone"><span class="dropzone__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15"/></svg></span><p class="dropzone__title">Drag files here, or choose them</p><input type="file" id="fu-files" name="files" multiple accept=".pdf,image/jpeg,image/png" aria-describedby="fu-files-help"><p class="field__help" id="fu-files-help">PDF, JPG or PNG, up to 10 MB each.</p></div><ul class="dropzone__list" aria-label="Attached files"><li class="dropzone__file"><span class="dropzone__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3.5V8h4.5"/></svg></span><div><p class="dropzone__name">field-day-agenda.pdf</p><p class="dropzone__meta">240 KB</p></div><button class="icon-btn" type="button" aria-label="Remove field-day-agenda.pdf"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></li><li class="dropzone__file"><span class="dropzone__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3.5V8h4.5"/></svg></span><div><p class="dropzone__name">park-map.png</p><p class="dropzone__meta">1.1 MB</p></div><button class="icon-btn" type="button" aria-label="Remove park-map.png"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></li></ul></div>
```

### photo
`.photo-edit` for an avatar or logo: the current image, a Change photo button that opens a dialog, and the requirements.
```html
<div class="field"><span class="field__label" id="fu-photo-label">Profile photo</span><div class="photo-edit" role="group" aria-labelledby="fu-photo-label"><img class="photo-edit__img" src="../assets/photos/amara-osei.jpg" width="96" height="96" alt="Amara Osei's current photo"><div class="photo-edit__text"><div class="cluster"><button class="btn btn--quiet btn--sm" type="button">Change photo</button><button class="btn btn--text btn--sm" type="button">Remove</button></div><p class="field__help">A clear, square photo works best. JPG or PNG, up to 5 MB.</p></div></div></div>
```

## Sizes

N/A: One size. The dropzone fills its column and grows with its content; previews are 64px in the file row and 96px in `.photo-edit`.

## States

Dragging tints the zone sage and changes the prompt to "Drop the image to upload it". Uploading replaces
the prompt with the file row and a progress bar, with Cancel beside it. Complete confirms in the success
role and offers Replace and Remove. Invalid (wrong type or too large) and failed (the upload stopped) both
turn the zone to the danger roles with a sentence that says what to do; failed adds Try again. Disabled
mutes the border, the tile and the chooser.

### dragging
```html
<div class="field"><label class="field__label" for="st-drag">Cover image for Northwind</label><div class="dropzone" data-state="dragging"><span class="dropzone__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15"/></svg></span><p class="dropzone__title">Drop the image to upload it</p><input type="file" id="st-drag" name="cover" accept="image/jpeg,image/png" aria-describedby="st-drag-help"><p class="field__help" id="st-drag-help">JPG or PNG, up to 5 MB.</p></div></div>
```

### uploading
```html
<div class="field"><span class="field__label" id="st-up-label">Cover image for Northwind</span><div class="dropzone" role="group" aria-labelledby="st-up-label" aria-busy="true"><div class="dropzone__file"><img src="../assets/photos/coffee-together.jpg" width="64" height="64" alt="Preview of northwind-cover.jpg"><div><p class="dropzone__name">northwind-cover.jpg</p><p class="dropzone__meta">Uploading… 0.8 of 1.4 MB</p></div><button class="btn btn--quiet btn--sm" type="button">Cancel</button></div><div class="progress" role="progressbar" aria-label="Uploading northwind-cover.jpg" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 60%"><div class="progress__bar"></div></div></div></div>
```

### complete
```html
<div class="field"><span class="field__label" id="st-done-label">Cover image for Northwind</span><div class="dropzone" role="group" aria-labelledby="st-done-label"><div class="dropzone__file"><img src="../assets/photos/coffee-together.jpg" width="64" height="64" alt="Preview of northwind-cover.jpg"><div><p class="dropzone__name">northwind-cover.jpg</p><p class="inline-status inline-status--success" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Uploaded · 1.4 MB</p></div><button class="btn btn--quiet btn--sm" type="button">Replace</button><button class="btn btn--text btn--sm" type="button">Remove</button></div></div></div>
```

### invalid
```html
<div class="field"><label class="field__label" for="st-bad">Cover image for Northwind</label><div class="dropzone" aria-invalid="true"><span class="dropzone__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15"/></svg></span><p class="dropzone__title">Drag an image here, or choose one</p><input type="file" id="st-bad" name="cover" accept="image/jpeg,image/png" aria-invalid="true" aria-describedby="st-bad-error st-bad-help"><p class="field__help" id="st-bad-help">JPG or PNG, up to 5 MB.</p></div><p class="field__error" id="st-bad-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>field-day.heic is a HEIC photo. Choose a JPG or PNG.</p></div>
```

### failed
```html
<div class="field"><span class="field__label" id="st-fail-label">Cover image for Northwind</span><div class="dropzone" role="group" aria-labelledby="st-fail-label" data-state="failed"><div class="dropzone__file"><img src="../assets/photos/coffee-together.jpg" width="64" height="64" alt="Preview of northwind-cover.jpg"><div><p class="dropzone__name">northwind-cover.jpg</p><p class="field__error" role="alert"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>The upload stopped. Check your connection and try again.</p></div><button class="btn btn--quiet btn--sm" type="button">Try again</button></div></div></div>
```

## Responsive

The dropzone fills its column at every width. On phones, dragging is rare, so the prompt can read "Choose
an image" and the chooser opens the camera roll or files. File rows wrap their actions under the name below
24rem; long file names break anywhere rather than overflow. `.photo-edit` wraps the text under the photo on
narrow screens.

## Accessibility

**Role:** the native `<input type="file">` is the control; the dropzone is a drop target only. Remove and
Try again are separate, labelled buttons.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to the chooser, then to Replace, Remove, Cancel or Try again. |
| Enter, Space | Opens the system file chooser, or activates the focused button. |
| Escape | Closes the system chooser without changing the selection. |

**Focus:** the ring is on the chooser button. After a file is removed, focus moves to the chooser; after Try
again, it stays on the file row.

**Labelling:** the field label names the input; requirements are linked with `aria-describedby`. Remove
buttons name the file ("Remove park-map.png"). Upload progress uses `role="progressbar"` with a label;
success is announced with `role="status"` and failure with `role="alert"`.

**Motion:** the progress bar eases its width over 640ms; under reduced motion it jumps. Nothing else moves.

**Touch:** dragging is never required (WCAG 2.5.7); the chooser button is the main target on touch screens,
36px tall inside a padded zone.

## Content

- The label names what the file is for: **Cover image for Northwind**, **Attachments for Field Day**.
- State formats and limits before people choose: "JPG or PNG, up to 5 MB."
- Errors name the file and the fix: "field-day.heic is a HEIC photo. Choose a JPG or PNG."
- Do not claim success until the upload is processed: "Uploading… 0.8 of 1.4 MB", then "Uploaded".

## Do and don't

### Do
Keep the native chooser inside the dropzone, so the keyboard and phones work.
```html
<div class="field"><label class="field__label" for="dd-agenda">Field Day agenda</label><div class="dropzone"><p class="dropzone__title">Drag a PDF here, or choose one</p><input type="file" id="dd-agenda" name="agenda" accept=".pdf" aria-describedby="dd-agenda-help"><p class="field__help" id="dd-agenda-help">PDF, up to 10 MB.</p></div></div>
```

### Don't
A drop-only zone locks out keyboard, screen reader and phone users.
```html
<div class="field"><span class="field__label">Field Day agenda</span><div class="dropzone"><p class="dropzone__title">Drop a PDF here</p></div></div>
```

### Do
Say what went wrong and how to fix it, and keep the file name.
```html
<div class="field"><span class="field__label" id="dd-fail-label">Cover image for Northwind</span><div class="dropzone" role="group" aria-labelledby="dd-fail-label" data-state="failed"><div class="dropzone__file"><div><p class="dropzone__name">northwind-cover.jpg</p><p class="field__error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>This image is 9 MB. Choose one under 5 MB.</p></div><button class="btn btn--quiet btn--sm" type="button">Choose another</button></div></div></div>
```

### Don't
"Error" with no file name or next step leaves people stuck.
```html
<div class="field"><span class="field__label">Cover image for Northwind</span><div class="dropzone" data-state="failed"><p class="field__error">Upload error.</p></div></div>
```

## Tokens

The dropzone reads the subtle background, the strong border (dashed), the accent-subtle roles for dragging,
the danger roles for errors, the large radius and the 64px and 96px preview sizes.

## Code

Put a native `input type="file"` with `accept` inside `.dropzone`, and link it to the field label and its
requirements. Show chosen files as `.dropzone__file` rows (in a `ul.dropzone__list` for several), and set
`data-state="dragging"` while a file is over the zone.
