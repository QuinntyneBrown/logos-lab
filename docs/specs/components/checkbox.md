# Checkbox

| Field | Value |
|---|---|
| Selector | `label[llCheck]` |
| Library path | `frontend/projects/components/src/lib/checkbox/` |
| Status | built |
| Traces to | L2-114, L2-126, L2-127, L2-128, L2-129, L2-130, L2-134, L2-150 |
| Design system | [`checkbox.html`](../../design-system/components/checkbox.html) |
| Source mocks | [`pages/register/default`](../../mocks/pages/register/default.html), [`pages/register/invalid`](../../mocks/pages/register/invalid.html), [`pages/settings-privacy/default`](../../mocks/pages/settings-privacy/default.html), [`pages/policy-reconsent/default`](../../mocks/pages/policy-reconsent/default.html), [`pages/explore/default`](../../mocks/pages/explore/default.html), [`dialogs/explore-filters/default`](../../mocks/dialogs/explore-filters/default.html) |
| Rendering | [`checkbox.html`](checkbox.html) |

## Purpose and scope

A checkbox row turns one option on or off when the form is submitted: accepting the Terms and Privacy
Policy, opting in to Platform news, picking filters. The whole row is a 44 px target: the native box
restyled as a soft square and the text that names it, with an optional description and count.

Out of scope:

- The help and error beneath the row, and the control's `aria-describedby` and `aria-invalid`: the
  [form field](form-field.md) without a label of its own.
- A setting that applies the moment it changes: the switch. One answer from a list: the radio group.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/register/*` terms | row in a field with help and error | "I accept the Terms of Use and the Privacy Policy" | default, checked, invalid, disabled | auth card |
| `pages/register/*` news | row with text and description | "Email me Platform news" + "Optional"; "New courses and events, about once a month…" | default, checked | auth card |
| `pages/policy-reconsent/*` | row in a field | "I accept the updated Terms of Use" | default, invalid | auth card |
| `pages/settings-privacy/*`, `pages/settings-profile/*` | rows with descriptions | consent choices | default, checked | surface |
| `pages/explore/*`, `pages/events/*`, `dialogs/explore-filters/*` | rows with counts in a `fieldset.check-group` | "Courses 12" | default, checked | surface, dialog |

## Anatomy

1. **Row** — `label.check`: a grid of box, text and optional count, at least `--target-comfortable`
   tall, washed on hover.
2. **Box** — the consumer's `input.check__box[type=checkbox]`: a native checkbox restyled as a
   `--space-5` soft square, filled with the accent and a tick when checked.
3. **Text** — a `span`, or `span.check__text` holding the name and `span.check__desc`.
4. **Count (optional)** — `span.check__count` at the end of the row.
5. **Group** — `fieldset.check-group > legend`, and `.check-grid` for two columns from 40rem; styled by
   this component when the rows sit in them.

Host: `label[llCheck]` is the row; the component adds `.check` and styles the projected box and text.

## API

### Inputs

None. The native input carries `checked`, `disabled`, `required`, `indeterminate`, `name` and `id`.

### Outputs

None; the consumer listens to the input's `change`.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | one `input.check__box[type=checkbox]`, then the text, then an optional count | The input comes first so the label names it. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Single | — | One independent option. |
| Description | `.check__text` + `.check__desc` | A second line with the consequence. |
| Count | `.check__count` | Filter rows. |

One size: a `--space-5` box in a row at least `--target-comfortable` tall.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Bordered box | Checkbox named by the row text |
| Hover | pointer over the row | Row washed `--color-bg-subtle`, box border `--color-fg-muted` | — |
| Focus | keyboard focus on the box | Focus ring on the box | — |
| Checked | `checked` | Accent fill and tick | "checked" |
| Indeterminate | `indeterminate` | Accent fill and a dash | "mixed" |
| Invalid | `aria-invalid="true"` (set by the form field) | Box border `--color-danger-solid` | Invalid; the error is read as its description |
| Disabled | `disabled` | Box and text in disabled roles, no hover | Dimmed, not focusable |

## Markup

```html
<!-- rendered -->
<label class="check"><input class="check__box" type="checkbox" id="terms" required aria-invalid="true" aria-describedby="terms-help terms-error"><span>I accept the Terms of Use and the Privacy Policy</span></label>
<label class="check"><input class="check__box" type="checkbox" id="news" aria-describedby="news-desc"><span class="check__text"><span>Email me Platform news <span class="field__optional">Optional</span></span><span class="check__desc" id="news-desc">New courses and events, about once a month.</span></span></label>
```

```html
<!-- consumer -->
<ll-form-field controlId="terms" [help]="termsHelp" [error]="termsError()">
  <label llCheck><input class="check__box" type="checkbox" id="terms" required (change)="terms.set($any($event.target).checked)" /><span i18n>I accept the Terms of Use and the Privacy Policy</span></label>
</ll-form-field>
```

## Design

- Row: grid `auto 1fr auto`, gap `--space-3`, padding-inline `--space-2`, `--radius-sm`,
  `--text-body-sm`, min-height `--target-comfortable`.
- Box: `--space-5` square, `--radius-xs`, hairline `--color-border-strong` on `--color-bg-surface`;
  tick drawn with `--border-width-thick` in `--color-fg-on-accent`.
- Description `--color-fg-muted`; count `--color-fg-subtle`, tabular.
- Motion: background and tick fade with `--duration-base` / `--duration-fast` only without reduced
  motion; forced colours restore the native box.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Box | `--color-bg-surface` / `--color-border-strong` | `--palette-birch-50` / strong border | `--palette-night-900` / strong border |
| Checked | `--color-accent` / `--color-fg-on-accent` | sage | sage |
| Invalid border | `--color-danger-solid` | danger role | danger role |
| Hover | `--color-bg-subtle` | linen | night |
| Description | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Row text |
| `--color-fg-muted` | `--color-bg-surface` | 4.5:1 | Description |
| `--color-border-strong` | `--color-bg-surface` | 3:1 | Box border |

## Responsive behaviour

- Rows fill their column; long text wraps beside the box; `.check-grid` splits into two columns from
  40rem. At 320 px nothing scrolls horizontally.

## Accessibility

### Role and pattern

Native checkbox in a wrapping `label`, which names it and extends its target.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Moves to the box. |
| <kbd>Space</kbd> | Toggles it. |

### Focus

The ring sits on the box; the row never takes focus.

### Labelling

The row text names the box; a description inside the row is tied with `aria-describedby` on the input
by the consumer; help and error beneath the row are tied by the form field.

### Announcements

Native checked and mixed states.

### Motion

Fades only without `prefers-reduced-motion: reduce`.

## Content and internationalisation

- The row text says what checking it means ("I accept…", "Email me…"); "Optional" marks an optional box,
  never an asterisk on the required one. All copy arrives translated.

## Performance

- `OnPush`; static. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given the registration form, when it renders, then "I accept the Terms of Use and the Privacy Policy" and "Email me Platform news" are unchecked checkboxes named by their rows. (L2-114)
- **AC-2** Given the terms box, when the visitor clicks its text, then it becomes checked. (L2-126)

### Keyboard and focus

- **AC-3** Given the terms box has focus, when the visitor presses Space, then it toggles and a focus ring shows on the box. (L2-126)

### Screen readers

- **AC-4** Given the terms box after an unchecked submit, when it is inspected, then it has `aria-invalid="true"` and its error is part of its description. (L2-128)
- **AC-5** Given the news box, when it is inspected, then its description "New courses and events, about once a month…" is part of its description. (L2-127)

### Theming

- **AC-6** Given the dark theme, when rows render in each state, then box, tick and text use dark token values. (L2-134)
- **AC-7** Given both themes, when contrast is measured, then row text and description meet 4.5:1 and the box border 3:1. (L2-129)

### Responsive

- **AC-8** Given a viewport of 320 px, when the registration form renders, then long row text wraps beside the box and nothing scrolls horizontally. (L2-130)
- **AC-9** Given the pseudo-locale's longer copy at 375 px, when rows render, then nothing is clipped. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/checkbox/`: `checkbox.ts` (`Checkbox`, selector
  `label[llCheck]`, host class `check`), `.html` (`<ng-content />`), `.scss` with the `checkbox` block
  of `components.css`: `.check` rules on `:host(...)`, the box, text, description and count under
  `:host ::ng-deep`. The `.check-group` and `.check-grid` rules go to the global foundations, since they
  style the rows' container.

## Decisions

- **D-1** *Component or attribute?* An attribute on the consumer's `label`, so the native input stays in
  the page's template with its own bindings, `id` and `name`; the component only styles.
- **D-2** *Who ties help and error?* The form field, given `controlId` and no label, so a checkbox with
  help and an error works like every other control.
