# Badge

| Field | Value |
|---|---|
| Selector | `span[llBadge]` |
| Library path | `frontend/projects/components/src/lib/badge/` |
| Status | built |
| Traces to | L2-001, L2-127, L2-129, L2-134, L2-150 |
| Design system | [`badge.html`](../../design-system/components/badge.html) |
| Source mocks | [`pages/home/default`](../../mocks/pages/home/default.html), [`pages/my-learning/default`](../../mocks/pages/my-learning/default.html), [`pages/admin-users/default`](../../mocks/pages/admin-users/default.html), [`pages/moderation-queue/default`](../../mocks/pages/moderation-queue/default.html), [`pages/review-queue/default`](../../mocks/pages/review-queue/default.html), [`pages/saved/default`](../../mocks/pages/saved/default.html) |
| Rendering | [`badge.html`](badge.html) |

## Purpose and scope

A badge is a short status label — "Completed", "Full · waitlist open", "Scheduled", "Suspended", "Not
started" — or a count beside a navigation row. A dot (or an icon) and a word carry the meaning together,
never colour alone. Tones map to the status roles.

Use a chip for a removable filter and the pill for topic tags.

Out of scope:

- Choosing the tone for a status: the page maps its data to a tone.
- Counts inside icon buttons (`.icon-btn__count`): the [button](button.md).

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/home/*` event rows | warning | "Full · waitlist open" | default | canvas |
| `pages/my-learning/*`, `pages/collection-page/*` content cards | success with check icon; plain | "Completed"; "Not started", "In progress" | default | surface |
| `pages/saved/*` unavailable card | neutral | "No longer available" | default | subtle surface |
| studio, review and admin tables | info, warning, success, danger, neutral | "Scheduled", "In review", "Published", "Suspended", "Draft" | default | surface |
| moderation queue and reports | danger plain, warning plain, success plain | "Hidden automatically", "Open", "Upheld" | default | surface |
| sidebar navigation and tabs | count | "7", "3" with hidden words | default | canvas, drawer |

## Anatomy

1. **Badge** — `span.badge`: an inline pill, `--space-6` tall.
2. **Dot** — `::before`, `--space-2` round in `currentColor`; hidden for `count` and `plain`, and when an
   icon is projected.
3. **Icon (optional)** — a projected `svg.icon.icon--sm`.
4. **Label** — projected text.

Host: the consumer's own `<span llBadge>`; the component adds the classes.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `tone` | `'neutral' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'solid' \| 'count'` | `'neutral'` | no | Adds `.badge--{tone}`; neutral adds nothing. |
| `plain` | `boolean` | `false` | no | Adds `.badge--plain`: no dot (with the tone's colours). |

### Outputs

None.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | text, an optional leading `svg.icon` and a `span.vh` for hidden words | The text is the status in words. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Neutral | — | Draft, no longer available. |
| Success | `.badge--success` | Completed, published, upheld. |
| Warning | `.badge--warning` | Waitlist, in review, expiring. |
| Danger | `.badge--danger` | Suspended, failed, hidden. |
| Info | `.badge--info` | Scheduled, new. |
| Solid | `.badge--solid` | Accent emphasis. |
| Count | `.badge--count` | A number beside a row. |
| Plain | `.badge--plain` | Any tone without the dot. |

One size: `--space-6` tall, `--text-caption`.

## States

The badge is static.

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Tone fill and text | Read as text |

## Markup

```html
<!-- rendered -->
<span class="badge badge--warning">Full · waitlist open</span>
<span class="badge badge--success"><svg class="icon icon--sm" aria-hidden="true">…</svg>Completed</span>
<span class="badge badge--count">5<span class="vh"> waiting</span></span>
```

```html
<!-- consumer -->
<span llBadge tone="warning" i18n>Full · waitlist open</span>
```

## Design

- `--space-6` minimum height; padding `0 --space-3` (count `0 --space-2`, minimum width `--space-6`);
  `--radius-full`; gap `--space-2`; `--text-caption`; tabular numerals for counts.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Neutral | `--color-bg-subtle` / `--color-fg-muted` | `--palette-oat-200` / `--palette-stone-700` | `--palette-night-800` / `--palette-night-200` |
| Success | `--color-success-bg` / `--color-success-fg` | success roles | success roles |
| Warning | `--color-warning-bg` / `--color-warning-fg` | warning roles | warning roles |
| Danger | `--color-danger-bg` / `--color-danger-fg` | danger roles | danger roles |
| Info | `--color-info-bg` / `--color-info-fg` | info roles | info roles |
| Solid, count | `--color-accent` / `--color-fg-on-accent` | `--palette-accent-600` / `--palette-birch-50` | `--palette-accent-300` / `--palette-accent-950` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-success-fg` | `--color-success-bg` | 4.5:1 | Success |
| `--color-warning-fg` | `--color-warning-bg` | 4.5:1 | Warning |
| `--color-danger-fg` | `--color-danger-bg` | 4.5:1 | Danger |
| `--color-fg-on-accent` | `--color-accent` | 4.5:1 | Count |

## Responsive behaviour

- Badges do not change across breakpoints; a long label wraps the row the badge sits in.

## Accessibility

### Role and pattern

Plain text in a `span`; no role.

### Keyboard

| Key | Action |
|---|---|
| — | Badges are not focusable. |

### Focus

Not focusable.

### Labelling

The words carry the status; counts add hidden words ("5 waiting").

### Announcements

None.

### Motion

None.

## Content and internationalisation

- Sentence case, one to three words: "Completed", "Full · waitlist open". All labels arrive translated.

## Performance

- `OnPush`; static. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given an upcoming event that is full, when its row renders on the home page, then it shows a warning badge reading "Full · waitlist open". (L2-001)
- **AC-2** Given a count badge "5" with the hidden word "waiting", when it is read by a screen reader, then it reads "5 waiting". (L2-127)

### Theming

- **AC-3** Given the dark theme, when badges of each tone render, then fill and text come from tokens with dark values. (L2-134)
- **AC-4** Given both themes, when contrast is measured for each tone, then the text meets 4.5:1 on its fill. (L2-129)

### Responsive

- **AC-5** Given a badge label 30 % longer in the pseudo-locale, when it renders at 320 px, then it is not clipped. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/badge/`: `badge.ts` (`Badge`), `badge-tone.ts`, `.html`,
  `.scss` with the badge rules on `:host`.

## Decisions

- **D-1** *Does a projected icon replace the dot?* Yes: the success badge in the mocks shows a check icon
  and no dot; the component hides the dot when an icon is present.
