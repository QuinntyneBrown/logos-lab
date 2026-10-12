# Form layout

| Field | Value |
|---|---|
| Selector | `form[llForm]`, `ll-form-summary` |
| Library path | `frontend/projects/components/src/lib/form-layout/` |
| Status | built |
| Traces to | L2-126, L2-127, L2-128, L2-129, L2-130, L2-134, L2-150 |
| Design system | [`form-layout.html`](../../design-system/components/form-layout.html) |
| Source mocks | [`pages/sign-in/invalid`](../../mocks/pages/sign-in/invalid.html), [`pages/register/invalid`](../../mocks/pages/register/invalid.html), [`pages/settings-account/default`](../../mocks/pages/settings-account/default.html), [`pages/settings-profile/default`](../../mocks/pages/settings-profile/default.html), [`pages/studio-editor/default`](../../mocks/pages/studio-editor/default.html), [`dialogs/report-content/invalid`](../../mocks/dialogs/report-content/invalid.html) |
| Rendering | [`form-layout.html`](form-layout.html) |

## Purpose and scope

The form layout spaces a form's fields, groups them into sections, aligns its actions, and — when a
submission fails validation — opens it with a summary that lists every error as a link to its field and
takes focus, so a keyboard or screen-reader user knows at once what to fix (`L2-128`).

Out of scope:

- Validation rules and the messages: the page.
- Each field's label, help and error: the [form field](form-field.md).

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/sign-in/*`, `pages/register/*`, `pages/forgot-password/*` | form; summary | "Two things to fix before you can sign in": "Enter your email in the form name@example.ca", "Enter your password" | default, invalid | auth card |
| `pages/settings-*/*` | form with sections (`fieldset.form-section` and `section.form-section` with `legend`/`h2.form-section__title`) and actions | "Save changes", "Cancel" | default, invalid, busy | surface |
| studio editors, admin settings | sections, actions, form card (`.form-card`) | — | default, invalid | surface |
| dialogs with forms (`dialogs/*/invalid`) | summary at the top of the dialog body | "One thing to fix before you send" | invalid | dialog surface |
| `pages/comments/*` | actions at the end (`.form-actions--end`) | "Post comment" | default | surface |

## Anatomy

1. **Form** — `form.form`: a grid with `--space-6` gaps; `novalidate` so the page's validation speaks.
2. **Summary** — `div.form-summary[role=alert][tabindex=-1]` labelled by `h2.form-summary__title` (with
   the attention icon) and a `ul` of links to fields.
3. **Section** — `fieldset.form-section > legend.form-section__title`, or `section.form-section >
   h2.form-section__title`.
4. **Actions** — `div.form-actions` (+ `--end`).
5. **Form card** — `div.form-card`: a surface card around a long form.

Host: `form[llForm]` is the consumer's form; `ll-form-summary` is `display: contents` and renders the
summary.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `heading` (`ll-form-summary`) | `string` | — | yes | "Two things to fix before you can sign in". |
| `errors` (`ll-form-summary`) | `readonly FormError[]` | — | yes | `{ controlId: string; message: string }`; one link per error to `#{controlId}`. |
| `card` (`form[llForm]`) | `boolean` | `false` | no | Adds `.form-card` to the form itself, as the settings forms do (`form.form-card`): the surface card with its own gap and padding. |

`form[llForm]` adds `.form` and `novalidate`.

### Outputs

None. Following an error link focuses its control (the component handles the click).

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default (`form[llForm]`) | fields, sections, actions | Laid out by the grid; `.form-section`, `.form-actions` and `.form-card` are styled within the form. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Form | `.form` | Every form. |
| Section | `.form-section` | A titled group of fields. |
| Actions | `.form-actions` (+ `--end`) | The submit row. |
| Summary | `.form-summary` | Validation errors. |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Valid | no summary | Fields only | — |
| Invalid | summary rendered | Danger panel listing errors | Focus moves to the summary; `role="alert"` announces it |

## Markup

```html
<!-- rendered -->
<form class="form" novalidate>
  <div class="form-summary" role="alert" tabindex="-1" aria-labelledby="summary-title">
    <h2 class="form-summary__title" id="summary-title"><svg class="icon" aria-hidden="true">…</svg>Two things to fix before you can sign in</h2>
    <ul><li><a href="#email">Enter your email in the form name@example.ca</a></li><li><a href="#password">Enter your password</a></li></ul>
  </div>
  …
</form>
```

```html
<!-- consumer -->
<form llForm (submit)="submit()">@if (errors().length) {<ll-form-summary [heading]="summaryHeading()" [errors]="errors()" />}…</form>
```

## Design

- Form gap `--space-6`; section gap `--space-6`, title `--text-h3`; actions gap `--space-3`,
  padding-top `--space-2`.
- Summary padding `--space-5`, `--radius-md`, hairline `--color-danger-border`, `--color-danger-bg`,
  `--color-danger-fg`; title `--text-h4`; list indented `--space-6`.
- Form card padding `--space-6` (`--space-10` from 40rem), `--radius-xl`, surface and hairline.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Summary | `--color-danger-bg` / `--color-danger-fg` / `--color-danger-border` | danger roles | danger roles |
| Form card | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-danger-fg` | `--color-danger-bg` | 4.5:1 | Summary text and links |

## Responsive behaviour

- Single column at every width (field rows split from MD with `.field-row`); actions wrap; at 320 px
  nothing scrolls horizontally; long error links wrap (`overflow-wrap: anywhere`).

## Accessibility

### Role and pattern

GOV.UK-style error summary: `role="alert"`, focused on appearance, links to fields.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Enter</kbd> on an error link | Moves focus to that field's control. |

### Focus

When the summary appears after a submit, focus moves to it (`L2-128` AC2); its focus ring shows.

### Labelling

The summary is labelled by its title.

### Announcements

`role="alert"` announces the summary when it appears.

### Motion

None.

## Content and internationalisation

- The title counts the problems with plural rules ("One thing to fix…", "Two things to fix…"); messages
  match the fields' errors. All copy arrives translated.

## Performance

- `OnPush`; static. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given the sign-in form submitted with a malformed email and no password, when validation fails, then a summary titled "Two things to fix before you can sign in" lists "Enter your email in the form name@example.ca" and "Enter your password" as links. (L2-128)
- **AC-2** Given the summary appears, when it is rendered, then focus moves to it and it has `role="alert"`. (L2-128)

### Keyboard and focus

- **AC-3** Given the summary, when the user follows "Enter your password", then focus moves to the password input. (L2-126)

### Screen readers

- **AC-4** Given the summary, when it is inspected, then it is labelled by its title and its icon is hidden. (L2-127)

### Theming

- **AC-5** Given the dark theme, when the summary renders, then it uses the dark danger roles. (L2-134)
- **AC-6** Given both themes, when contrast is measured, then summary text meets 4.5:1. (L2-129)

### Responsive

- **AC-9** Given Miriam's profile settings, when the form renders as a card, then the form element itself is the surface card with `--radius-xl`, a hairline border and `--space-6` padding, `--space-10` from SM. (L2-130)
- **AC-7** Given a viewport of 320 px, when the summary renders, then its links wrap and nothing scrolls horizontally. (L2-130)
- **AC-8** Given the pseudo-locale's longer messages, when the summary renders at 375 px, then nothing is clipped. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/form-layout/`: `form.ts` (`Form`, selector
  `form[llForm]`), `form-summary.ts` (`FormSummary`), `form-error.ts` (`FormError`), each with `.html` and
  `.scss` from the `form-layout` block. Composes `Icon`.

## Decisions

- **D-1** *Who moves focus to the summary?* The summary, when it is created, so every form gets
  `L2-128` AC2 without page code.
- **D-2** *A form card around the form, or the form as the card?* Both appear: the settings mocks make
  the form itself the card (`form.form-card`), the studio wraps several fields in a `div.form-card`.
  The `card` input covers the first; a projected `.form-card` still covers the second.
