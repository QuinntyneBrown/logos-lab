# Textarea

| Field | Value |
|---|---|
| Selector | `textarea[llTextarea]` |
| Library path | `frontend/projects/components/src/lib/textarea/` |
| Status | planned |
| Traces to | L2-013, L2-060, L2-085, L2-126, L2-127, L2-128, L2-129, L2-130, L2-134, L2-150 |
| Design system | [`textarea.html`](../../design-system/components/textarea.html) |
| Source mocks | [`pages/settings-profile/default`](../../mocks/pages/settings-profile/default.html), [`pages/settings-profile/invalid`](../../mocks/pages/settings-profile/invalid.html), [`pages/comments/default`](../../mocks/pages/comments/default.html), [`pages/comments/unverified`](../../mocks/pages/comments/unverified.html), [`dialogs/report-content/default`](../../mocks/dialogs/report-content/default.html), [`pages/studio-editor/default`](../../mocks/pages/studio-editor/default.html), [`pages/review-item/commenting`](../../mocks/pages/review-item/commenting.html), [`dialogs/request-changes/invalid`](../../mocks/dialogs/request-changes/invalid.html) |
| Rendering | [`textarea.html`](textarea.html) |

## Purpose and scope

The textarea takes text that runs over more than one line: a bio, a comment, a report's details, an
editor's note, a course summary. It is the native `textarea` element, styled as the design system's
`.textarea` block, and it sits inside a [form field](form-field.md), which owns its label, help,
error and counter.

Use the [text field](text-field.md) input for one line and the rich editor for formatted article or
lesson bodies.

Out of scope:

- The label, help, error and counter, and the `aria-describedby` and `aria-invalid` wiring: the
  [form field](form-field.md) (form-field D-1).
- Counting characters and formatting the counter ("136 of 500 characters"): the page, which passes the
  text to the field's `counter`.
- Enforcing the maximum: the native `maxlength` attribute the consumer sets, and the API.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/settings-profile/*` bio | `rows="5"`, `maxlength` 500, in a field with optional "optional", help and counter "136 of 500 characters" | Miriam's bio | default, invalid, disabled while saving | surface (form card) |
| `pages/comments/*` new comment and reply | `rows="4"`, placeholder "Share a thought or a question", `maxlength` 5000, counter "0 of 5,000 characters" | comment text | default, invalid, disabled (unverified, closed) | surface |
| `pages/comments/edited`, `pages/review-item/commenting` | `rows="3"` | an edited comment, a review comment | default, invalid | surface |
| `dialogs/report-content/*`, `dialogs/report-problem/*` | `rows="3"`, optional details | "What's wrong?" details | default, invalid, disabled while busy | dialog |
| `dialogs/request-changes/*`, `dialogs/approve/*`, `dialogs/moderation-action/*`, `dialogs/appeal-decision/*`, `dialogs/user-action/*`, `dialogs/revoke-certificate/*`, `dialogs/cancel-event/*`, `dialogs/event-change-notify/*`, `dialogs/publish-correction/*`, `dialogs/submit-for-review/*`, `dialogs/invite-expert/*`, `dialogs/topic-edit/*`, `dialogs/announcement-edit/*`, `dialogs/image-upload/*` | `rows="2"` to `"4"`, required or optional | reasons, notes, messages, descriptions, alt text | default, invalid, disabled while busy | dialog |
| `pages/studio-editor/*`, `pages/course-builder/*`, `pages/collection-builder/*`, `pages/event-editor/*` | `rows="3"` to `"8"`, counter "226 of 300 characters" | summary, outcomes, description | default, invalid, read-only (in review, published) | surface |
| `pages/admin-settings/*`, `pages/policy-editor/*`, `pages/account-notice/*` | `rows="4"` to `"8"` | site text, policy change note, appeal | default, invalid, read-only | surface |

## Anatomy

1. **Control** — `textarea.textarea`: a bordered surface box at least `--size-textarea-min` tall,
   resizable vertically.
2. **Grow (optional)** — `.textarea--grow`: the box grows with its content (`field-sizing: content`).

Host: `textarea[llTextarea]` is the consumer's native `textarea`; the component adds the classes and
leaves every native attribute (`rows`, `maxlength`, `placeholder`, `required`, `readonly`,
`disabled`, `name`, `id`) to the consumer.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `grow` | `boolean` | `false` | no | Adds `.textarea--grow`: the height follows the content, from `--size-textarea-min` up. |
| `invalid` | `boolean` | `false` | no | Sets `aria-invalid="true"` when the textarea is used outside a form field; inside one, the field sets it from its `error`. |

Native attributes stay on the element: `rows` sets the starting height above the minimum, `maxlength`
caps the length, `readonly` and `disabled` give their states.

### Outputs

None. The consumer listens to the native `input` event.

### Content slots

None; the value is the element's own text.

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Default | `.textarea` | Every multi-line field; resizes vertically. |
| Grow | `.textarea--grow` | A reply box that should show all of what is typed without scrolling. |

One size: padding `--space-3` `--space-4`, type `--text-body` at `--line-height-normal`, minimum height
`--size-textarea-min`; `rows` lengthens it.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | `--color-border-strong` hairline on `--color-bg-surface` | multi-line text box named by its label |
| Hover | `:hover` | border `--color-fg-muted` | — |
| Focus | `:focus-visible` | `--focus-ring-width` ring in `--color-focus-ring` at `--focus-ring-offset` | focused, label and description read |
| Invalid | `aria-invalid="true"` | border `--color-danger-solid`, fill `--color-danger-bg` | "invalid entry", the error read as its description |
| Read-only | `readonly` | border `--color-border-default`, fill `--color-bg-subtle` | read-only, still focusable and selectable |
| Disabled | `disabled` | no border, fill `--color-bg-subtle`, text `--color-fg-disabled`, no resize | dimmed, skipped by Tab |

## Markup

```html
<!-- rendered: in a form field with help and counter -->
<div class="field">
  <label class="field__label" for="bio">Bio <span class="field__optional">optional</span></label>
  <textarea class="textarea" id="bio" name="bio" rows="5" maxlength="500" aria-describedby="bio-help bio-counter">Communications lead at a church in Halifax.</textarea>
  <p class="field__help" id="bio-help">A few sentences about who you are and what brings you here.</p>
  <p class="field__counter" id="bio-counter">136 of 500 characters</p>
</div>

<!-- rendered: invalid -->
<textarea class="textarea" id="details" rows="3" aria-invalid="true" aria-describedby="details-error"></textarea>
```

```html
<!-- consumer -->
<ll-form-field label="Bio" controlId="bio" optional="optional" help="A few sentences about who you are and what brings you here." [counter]="bioCounter()">
  <textarea llTextarea id="bio" name="bio" rows="5" maxlength="500" [value]="bio()" (input)="bio.set($any($event.target).value)"></textarea>
</ll-form-field>
```

## Design

- Box: padding `--space-3` `--space-4`; radius `--radius-md`; hairline border in `--ll-field-border`;
  minimum height `--size-textarea-min`; `resize: vertical` (none when disabled).
- Text `--text-body`, line height `--line-height-normal`; placeholder `--color-fg-subtle`.
- Under forced colours the border is `CanvasText`.

Component tokens:

| Token | Aliases | Overridden by |
|---|---|---|
| `--ll-field-border` | `--color-border-strong` | hover `--color-fg-muted`, invalid `--color-danger-solid`, read-only `--color-border-default`, disabled `--color-transparent` |

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Fill | `--color-bg-surface` | surface | surface |
| Border | `--color-border-strong` | strong border | strong border |
| Text | `--color-fg-default` | default foreground | default foreground |
| Placeholder | `--color-fg-subtle` | subtle foreground | subtle foreground |
| Invalid fill | `--color-danger-bg` | danger background | danger background |
| Read-only and disabled fill | `--color-bg-subtle` | subtle background | subtle background |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Entered text |
| `--color-fg-subtle` | `--color-bg-surface` | 4.5:1 | Placeholder |
| `--color-border-strong` | `--color-bg-surface` | 3:1 | Field boundary |
| `--color-fg-default` | `--color-danger-bg` | 4.5:1 | Text in an invalid field |

## Responsive behaviour

- The textarea fills its field's width at every breakpoint; only its height is set by `rows`, the
  content (grow) or the member's resize.
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom and 400 % reflow the text wraps
  inside the box.

## Accessibility

### Role and pattern

Native `textarea` (multi-line text box). The [form field](form-field.md) labels it with a visible
`label for`, and lists help, error and counter in `aria-describedby`.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Moves into and out of the textarea; disabled textareas are skipped. |
| <kbd>Enter</kbd> | Starts a new line; it never submits the form. |

### Focus

A visible ring of `--focus-ring-width` in `--color-focus-ring`, at least 3:1 against the surface.

### Labelling

Always by the field's visible label; a placeholder is never the name.

### Announcements

The field's error is read as the description when the textarea is focused; the summary announces it
on submit.

### Motion

None.

## Content and internationalisation

- Placeholders give an example or invitation, not instructions ("Share a thought or a question").
- The counter text is formatted by the page with the locale's numbers ("0 of 5,000 characters").
- Translatable: the consumer's placeholder. Data values: the member's text, shown as entered and never
  as HTML.

## Performance

- `OnPush`, signal inputs; no listeners of its own.
- Perf-test scenario: none in this repository yet; the settings profile page renders Miriam's bio
  "Communications lead at a church in Halifax…" in one textarea.
- Layout stability: the minimum height is reserved before content loads.

## Acceptance criteria

### Rendering

- **AC-1** Given Miriam opens Profile settings, when the bio renders, then it is a textarea labelled "Bio" with "optional", her bio as its text, and the counter "136 of 500 characters" in its description. (L2-013)
- **AC-2** Given the comment box, when it renders, then it is at least `--size-textarea-min` tall, shows the placeholder "Share a thought or a question", and resizes only vertically. (L2-060)
- **AC-3** Given `grow`, when Miriam types a long reply, then the box grows with the text instead of scrolling. (L2-060)

### States

- **AC-4** Given the bio is over 500 characters when saved, when the field shows its error, then the textarea has `aria-invalid="true"`, the danger border and fill, and the error in its description. (L2-128)
- **AC-5** Given a report's details while the dialog sends, when the textarea is disabled, then it shows the disabled fill, cannot be resized and is skipped by Tab. (L2-085)
- **AC-6** Given a published course summary in the Studio, when it is read-only, then it shows the subtle fill, stays focusable and its text can be selected. (L2-127)

### Keyboard and focus

- **AC-7** Given the comment box, when it receives keyboard focus, then a focus ring of at least 3:1 contrast surrounds it, and Enter adds a new line without submitting. (L2-126)

### Screen readers

- **AC-8** Given any textarea in the product, when it is inspected, then its accessible name is its visible label, never its placeholder. (L2-127)

### Theming

- **AC-9** Given the dark theme, when the textarea renders in each state, then its fill, border, text and placeholder use dark token values and entered text meets 4.5:1. (L2-134)

### Responsive

- **AC-10** Given a 320 px viewport, when the comment box renders, then it fits the column and the page does not scroll horizontally. (L2-130)

### Content

- **AC-11** Given a translated placeholder 30 % longer, when the textarea is 320 px wide, then the placeholder wraps inside the box and nothing is clipped. (L2-150)

### Motion

- **AC-12** Given reduced motion, when the textarea changes state, then nothing animates. (L2-129)

## Implementation notes

- Folder `frontend/projects/components/src/lib/textarea/`: `textarea.ts` (`Textarea`, attribute
  component on `textarea[llTextarea]`), `textarea.html` (empty), `textarea.scss` from the `textarea`
  block of `components.css`, using `:host` selectors as `input[llInput]` does.
- `_foundations.scss` holds a copy of the `.textarea` rules; the component's own styles replace it once
  every page uses `llTextarea`.

## Decisions

- **D-1** *Counter inside the textarea component?* No: the form field already renders `counter` with
  its id in `aria-describedby`, so the textarea stays a plain control and every multi-line field counts
  the same way.
- **D-2** *Enforce `maxlength`?* The consumer sets the native attribute; the component adds nothing, so
  pasting past the limit behaves as the browser does and the API stays the authority.
- **D-3** *An `invalid` input when the field sets `aria-invalid`?* Kept for the few textareas outside a
  form field (inline replies); inside a field the field's `error` is the single source, as for
  `input[llInput]`.
