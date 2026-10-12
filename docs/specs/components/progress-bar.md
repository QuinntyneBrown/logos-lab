# Progress bar

| Field | Value |
|---|---|
| Selector | `ll-progress-bar` |
| Library path | `frontend/projects/components/src/lib/progress-bar/` |
| Status | built |
| Traces to | L2-001, L2-030, L2-127, L2-129, L2-134 |
| Design system | [`progress-bar.html`](../../design-system/components/progress-bar.html) |
| Source mocks | [`pages/home/signed-in`](../../mocks/pages/home/signed-in.html), [`pages/dashboard/default`](../../mocks/pages/dashboard/default.html), [`pages/my-learning/default`](../../mocks/pages/my-learning/default.html), [`pages/course-overview/enrolled`](../../mocks/pages/course-overview/enrolled.html), [`dialogs/avatar-upload/busy`](../../mocks/dialogs/avatar-upload/busy.html) |
| Rendering | [`progress-bar.html`](progress-bar.html) |

## Purpose and scope

A progress bar shows how far something has come: a learner's course progress, an upload, an export.
It is a thin rounded track with an accent fill; an indeterminate bar drifts when the amount is unknown.
The words beside it ("42% · 10 of 24 lessons") are the consumer's.

Out of scope:

- The progress text and where it sits: the consumer.
- Computing the value: the page.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/home/signed-in`, `pages/dashboard/*` continue-learning panel | value 42, label "Imago Dei in an Age of Machines progress" | — | determinate | grain panel |
| `pages/my-learning/*`, `pages/collection-page/*` content cards | value 42, label "Course progress: 42%" | — | determinate | surface |
| `pages/course-overview/enrolled` | value 42; completed course with `success` tone at 100 | — | determinate, success | canvas |
| upload dialogs (`dialogs/avatar-upload/busy`, studio media) | caption "Uploading coffee-together.jpg", value text "45%"; indeterminate while processing | — | determinate, indeterminate | dialog surface |

## Anatomy

1. **Caption row (optional)** — `div.progress-label` with the caption and the value text.
2. **Track** — `div.progress[role=progressbar]`, `--space-2` tall, `--radius-full`, in
   `--color-border-default`.
3. **Fill** — `div.progress__bar`, width from `--ll-progress-value`, in `--color-accent` (or the tone).

Host: `ll-progress-bar` is `display: contents`; it renders the optional caption row and the track.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `value` | `number \| null` | `null` | no | 0–100, clamped; `null` is indeterminate (`aria-busy="true"`, no `aria-valuenow`). |
| `label` | `string` | — | yes | The bar's `aria-label`. |
| `tone` | `'accent' \| 'success' \| 'danger'` | `'accent'` | no | `success` adds `.progress--success`, `danger` `.progress--danger`. |
| `caption` | `string \| null` | `null` | no | Renders `.progress-label` with the caption. |
| `valueText` | `string \| null` | `null` | no | Shown at the end of the caption row and set as `aria-valuetext`. |

### Outputs

None.

### Content slots

None.

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Accent | — | Progress in general. |
| Success | `.progress--success` | Completed. |
| Danger | `.progress--danger` | A failed upload. |
| Indeterminate | `aria-busy="true"` | Processing of unknown length. |

One size: `--space-2` tall; the width follows the container.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Determinate | `value` set | Fill to the value | "progress bar, 42%" |
| Indeterminate | `value` null | A short fill drifting across | "progress bar, busy" |

## Markup

```html
<!-- rendered -->
<div class="progress" role="progressbar" aria-label="Imago Dei in an Age of Machines progress" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 42%"><div class="progress__bar"></div></div>
```

```html
<!-- consumer -->
<ll-progress-bar [value]="42" label="Imago Dei in an Age of Machines progress" />
```

## Design

- Track `--space-2`, `--radius-full`, `--color-border-default`; fill transition `--duration-slow`.
- Caption row `--text-body-sm`, gap `--space-3`, margin-bottom `--space-2`.
- Indeterminate fill width `--size-progress-indeterminate`.

Component tokens:

| Token | Aliases | Overridden by |
|---|---|---|
| `--ll-progress-value` | `0%` | the `value` input |

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Track | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Fill | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Success fill | `--color-success-solid` | success solid role | success solid role |
| Danger fill | `--color-danger-solid` | `--palette-lingon-600` | `--palette-lingon-300` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-accent` | `--color-border-default` | 3:1 | Fill against track |

## Responsive behaviour

- Fills its container at every width; nothing changes across breakpoints.

## Accessibility

### Role and pattern

`role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and `aria-label`.

### Keyboard

| Key | Action |
|---|---|
| — | Not focusable. |

### Focus

Not focusable.

### Labelling

Named by `label`; `aria-valuetext` when `valueText` is given.

### Announcements

None; pages announce completion through their live region.

### Motion

The fill transition and the indeterminate drift are removed under reduced motion; an indeterminate bar
then sits still at 30 %.

## Content and internationalisation

- The label and caption arrive translated; percentages are formatted by the consumer for the locale.

## Performance

- `OnPush`; the width is a CSS variable, so updates repaint without layout. Page budgets per `L2-120`.

## Acceptance criteria

### Rendering

- **AC-1** Given Miriam's course at 42 %, when the continue-learning progress renders, then it is a progressbar named "Imago Dei in an Age of Machines progress" with `aria-valuenow="42"` and the fill at 42 %. (L2-030)
- **AC-2** Given a signed-in learner on the home page, when the continue-learning strip renders, then its progress bar shows the item's progress. (L2-001)
- **AC-3** Given an upload of unknown length, when the bar is indeterminate, then it has `aria-busy="true"` and no `aria-valuenow`. (L2-127)

### Theming

- **AC-4** Given the dark theme, when the bar renders, then track and fill use dark token values. (L2-134)
- **AC-5** Given both themes, when contrast is measured, then the fill meets 3:1 against the track. (L2-129)

## Implementation notes

- Folder `frontend/projects/components/src/lib/progress-bar/`: `progress-bar.ts` (`ProgressBar`), `.html`,
  `.scss` with the `progress-bar` block.

## Decisions

- **D-1** *Values outside 0–100?* Clamped, so a stale count never draws past the track.
