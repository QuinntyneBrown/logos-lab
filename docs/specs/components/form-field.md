# Form field

| Field | Value |
|---|---|
| Selector | `ll-form-field` |
| Library path | `frontend/projects/components/src/lib/form-field/` |
| Status | built (help placement, rich help and a label-less field planned) |
| Traces to | L2-126, L2-127, L2-128, L2-129, L2-130, L2-134, L2-150 |
| Design system | [`form-field.html`](../../design-system/components/form-field.html) |
| Source mocks | [`pages/sign-in/default`](../../mocks/pages/sign-in/default.html), [`pages/sign-in/invalid`](../../mocks/pages/sign-in/invalid.html), [`pages/register/invalid`](../../mocks/pages/register/invalid.html), [`pages/settings-profile/default`](../../mocks/pages/settings-profile/default.html), [`pages/studio-editor/default`](../../mocks/pages/studio-editor/default.html), [`dialogs/report-content/default`](../../mocks/dialogs/report-content/default.html) |
| Rendering | [`form-field.html`](form-field.html) |

## Purpose and scope

A form field puts a visible label, the control, help, an error and a character count together and ties
them to the control for assistive technology: the label by `for`, help and error by
`aria-describedby`, the error by `aria-invalid`. It also lays out a control row (`.input-group`) such
as the password input with its "Show" toggle, and an action beside the label ("Forgot your password?").

Out of scope:

- The control itself: the [text field](text-field.md) input, textarea, select, checkbox and radio
  components.
- Validation rules and messages: the page's form.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/sign-in/*` email | label "Email" | input type email | default, invalid "Enter your email in the form name@example.ca", disabled | auth card |
| `pages/sign-in/*` password | label "Password", label action "Forgot your password?", control row with "Show" toggle | input type password | default, invalid "Enter your password", disabled | auth card |
| `pages/register/*` | labels "Your name", "Email", "Password"; help before the control "12 to 128 characters…" | inputs | default, invalid | auth card |
| `pages/register/*` terms, `pages/policy-reconsent/*` | no label (the checkbox row names the box); help and error after the row | `label[llCheck]` | default, invalid | auth card |
| `pages/settings-*/*` | optional "(optional)", help, counter "18 of 30" | inputs, textareas, selects | default, read-only | surface |
| studio editors and admin dialogs | counter "42 of 120", help | inputs, textareas | default, invalid, read-only | surface, dialog |

## Anatomy

1. **Field** — `div.field`: a grid with `--space-2` gaps.
2. **Label row** — `label.field__label[for]` with an optional `span.field__optional` ("(optional)");
   when a label action exists, the label and the action sit in `div.cluster.cluster--between`. Omitted
   when the field has no label.
3. **Help** — `p.field__help[id]`, here when help is placed before the control.
4. **Control** — projected; with a trailing button it sits in `div.input-group`.
5. **Help** — `p.field__help[id]`, here when help is placed after the control (the default).
6. **Error** — `p.field__error[id]` with the attention icon.
7. **Counter** — `p.field__counter[id]`, end-aligned ("18 of 30").

Host: `ll-form-field` is `display: contents`; it renders the field and sets the control's ARIA through
the control id it is given.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string \| null` | `null` | no | The visible label; `null` only when the control names itself, as a checkbox row does. |
| `controlId` | `string` | — | yes | The control's `id`; help, error and counter ids derive from it (`{id}-help`, `{id}-error`, `{id}-counter`). |
| `optional` | `string \| null` | `null` | no | Text after the label, "(optional)". |
| `help` | `string \| null` | `null` | no | Help text. |
| `helpPlacement` | `'before' \| 'after'` | `'after'` | no | Help between the label and the control (`before`), as the registration mocks place it, or after the control. |
| `error` | `string \| null` | `null` | no | Error text; while set the control gets `aria-invalid="true"`. |
| `counter` | `string \| null` | `null` | no | Counter text, formatted by the page ("18 of 30"). |

The field sets on the control element (found by `controlId` within the field): `aria-describedby`
listing the help, error and counter ids that are present, and `aria-invalid` while an error is shown.

### Outputs

None.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | one control, or a control row `div.input-group` | Rendered after the label row. |
| `[slot=label-action]` | a small text button or link | Rendered at the end of the label row. |
| `[llFieldHelp]` | inline content with links, on any element (`span llFieldHelp`) | Help with links ("Read the Terms of Use and the Privacy Policy…"), rendered in `p.field__help` at `helpPlacement` with the help id, in place of `help`. The `FieldHelp` directive marks it so the field knows it is there. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Field | — | Every labelled control. |
| Control row | `.input-group` | A control with a trailing button or addon. |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Label, control | Name from the label |
| Invalid | `error` set | Error text in `--color-danger-fg` with icon; the control's invalid style | `aria-invalid="true"`; error read as description |
| With help | `help` set | Help in muted text | Read as description |
| With counter | `counter` set | Counter at the end | Read as description |

## Markup

```html
<!-- rendered: help before the control -->
<div class="field">
  <label class="field__label" for="name">Your name</label>
  <p class="field__help" id="name-help">Shown on your comments and certificates. 2 to 50 characters.</p>
  <input class="input" id="name" type="text" autocomplete="name" required maxlength="50" aria-describedby="name-help">
</div>

<!-- rendered: no label, a checkbox row with help and an error -->
<div class="field">
  <label class="check"><input class="check__box" type="checkbox" id="terms" required aria-invalid="true" aria-describedby="terms-help terms-error"><span>I accept the Terms of Use and the Privacy Policy</span></label>
  <p class="field__help" id="terms-help">Read the Terms of Use and the Privacy Policy.</p>
  <p class="field__error" id="terms-error"><svg class="icon icon--sm" aria-hidden="true">…</svg>Accept the Terms of Use and the Privacy Policy to create an account</p>
</div>
```

```html
<!-- rendered: invalid email -->
<div class="field">
  <label class="field__label" for="email">Email</label>
  <input class="input" id="email" name="email" type="email" autocomplete="email" inputmode="email" required aria-invalid="true" aria-describedby="email-error">
  <p class="field__error" id="email-error"><svg class="icon icon--sm" aria-hidden="true">…</svg>Enter your email in the form name@example.ca</p>
</div>

<!-- rendered: password with label action and control row -->
<div class="field">
  <div class="cluster cluster--between"><label class="field__label" for="password">Password</label><a class="btn btn--text btn--sm" href="/forgot-password">Forgot your password?</a></div>
  <div class="input-group"><input class="input" id="password" type="password" autocomplete="current-password" required><button type="button" class="btn btn--quiet" aria-pressed="false" aria-controls="password">Show</button></div>
</div>
```

```html
<!-- consumer -->
<ll-form-field label="Email" controlId="email" [error]="emailError()"><input llInput id="email" type="email" autocomplete="email" /></ll-form-field>
```

## Design

- Field gap `--space-2`; label `--text-label`; optional `--font-weight-regular` subtle.
- Help `--text-body-sm` muted; error `--text-body-sm` `--color-danger-fg` with the icon nudged by
  `--space-1`; counter `--text-caption` subtle, tabular.
- Control row: gap `--space-3`; the control flexes; addon `--text-body-sm` muted.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Label | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Help | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Error | `--color-danger-fg` | danger text role | danger text role |
| Optional, counter | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Label |
| `--color-danger-fg` | `--color-bg-surface` | 4.5:1 | Error |
| `--color-fg-muted` | `--color-bg-surface` | 4.5:1 | Help |

## Responsive behaviour

- One column at every width; the label row wraps when the action does not fit; at 320 px nothing
  scrolls horizontally.

## Accessibility

### Role and pattern

Native label and control; descriptions by `aria-describedby`.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | The label action, then the control, then a row button. |

### Focus

The page moves focus to the control when its error link in the form summary is followed.

### Labelling

Visible label tied by `for`; required fields are marked by text in the label or help, never by colour
or an asterisk alone (`L2-128`).

### Announcements

Errors are announced through the form summary; the field's error is the control's description.

### Motion

None.

## Content and internationalisation

- Labels are nouns; errors say how to fix ("Enter your email in the form name@example.ca"). All copy
  arrives translated.

## Performance

- `OnPush`; ARIA updates in an effect, no layout work. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given the sign-in form, when it renders, then the email and password inputs have visible labels "Email" and "Password" tied to them. (L2-128)
- **AC-2** Given the email field with the error "Enter your email in the form name@example.ca", when it renders, then the input has `aria-invalid="true"` and `aria-describedby` naming the error. (L2-128)
- **AC-3** Given a field with help and a counter, when it renders, then the control's `aria-describedby` lists both. (L2-127)
- **AC-9** Given the registration name field with help placed before the control, when it renders, then the help sits between the label and the input and the input's `aria-describedby` names it. (L2-127)
- **AC-10** Given the terms field with no label and the error "Accept the Terms of Use and the Privacy Policy to create an account", when it renders, then no field label shows, the checkbox has `aria-invalid="true"` and its `aria-describedby` names the help and the error. (L2-128)
- **AC-11** Given the terms field with help containing the links "Terms of Use" and "Privacy Policy", when it renders, then the links show inside the help and the checkbox's `aria-describedby` names the help. (L2-127)

### Keyboard and focus

- **AC-4** Given the password field, when a keyboard user tabs, then focus moves to "Forgot your password?", the input and "Show" in order with visible rings. (L2-126)

### Theming

- **AC-5** Given the dark theme, when fields render, then label, help, error and counter use dark token values. (L2-134)
- **AC-6** Given both themes, when contrast is measured, then label, help and error meet 4.5:1. (L2-129)

### Responsive

- **AC-7** Given a viewport of 320 px, when the password field renders, then the label row wraps if needed and nothing scrolls horizontally. (L2-130)
- **AC-8** Given the pseudo-locale's longer labels at 375 px, when fields render, then no label is clipped. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/form-field/`: `form-field.ts` (`FormField`),
  `field-help.ts` (`FieldHelp`, selector `[llFieldHelp]`, no behaviour), `.html`,
  `.scss` with the `form-field` block and the `.input-group` rules under `:host ::ng-deep`. Composes
  `Icon`.

## Decisions

- **D-1** *Who sets `aria-describedby` and `aria-invalid`?* The field, on the control found by its id, so
  every page gets the association right without repeating ids.
- **D-2** *Where do the `.input-group` rules live?* In the form field, the only place a control row
  appears.
- **D-3** *Where does help go?* Where the page's mock puts it: the design system and most settings mocks
  put it after the control, the registration mocks before. `helpPlacement` keeps both without page CSS.
- **D-4** *A field without a label?* Only for a control that names itself (a checkbox row); the field
  still ties its help and error to the control.
- **D-5** *Help with links?* A projected `[llFieldHelp]` element rather than an HTML string input, so
  links keep their router bindings and the copy stays in the page's translated template.
