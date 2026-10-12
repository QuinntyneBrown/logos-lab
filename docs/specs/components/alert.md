# Alert

| Field | Value |
|---|---|
| Selector | `ll-alert` |
| Library path | `frontend/projects/components/src/lib/alert/` |
| Status | built |
| Traces to | L2-008, L2-009, L2-010, L2-019, L2-127, L2-129, L2-130, L2-134, L2-150 |
| Design system | [`alert.html`](../../design-system/components/alert.html) |
| Source mocks | [`pages/sign-in/error`](../../mocks/pages/sign-in/error.html), [`pages/sign-in/rate-limited`](../../mocks/pages/sign-in/rate-limited.html), [`pages/sign-in/suspended`](../../mocks/pages/sign-in/suspended.html), [`pages/sign-in/deactivated`](../../mocks/pages/sign-in/deactivated.html), [`pages/sign-in/session-expired`](../../mocks/pages/sign-in/session-expired.html), [`pages/sign-in/signed-out`](../../mocks/pages/sign-in/signed-out.html), [`dialogs/delete-account/default`](../../mocks/dialogs/delete-account/default.html), [`notifications/service-notice/warning`](../../mocks/notifications/service-notice/warning.html) |
| Rendering | [`alert.html`](alert.html) |

## Purpose and scope

An alert tells a person something important about the screen they are on, in place, above the content
it concerns: a sign-in that failed, a pause, a suspended account, a successful sign-out, a dialog's
failed request, a service that is limited. It has a tone (information, success, warning, danger), an
icon, a short title, an optional body and optional links.

Use a toast for a passing confirmation, a banner for a site-wide message and the form summary for a
list of field errors.

Out of scope:

- Deciding the tone and copy: the page.
- Moving focus: the alert announces itself through its role; the page decides whether focus moves.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/sign-in/error` | danger, role alert | "Email or password is incorrect"; body; link "Reset your password" | default | auth card |
| `pages/sign-in/rate-limited` | warning, role status | "Sign-in is paused for 15 minutes"; "Try again at 10:39 AM EDT"; links "Reset your password", "Write to help@logoslab.ca" | default | auth card |
| `pages/sign-in/suspended`, `pages/sign-in/deactivated` | warning, role status | "Your account is suspended until …" / "This account is set to be deleted"; links | default | auth card |
| `pages/sign-in/session-expired` | info, role status | "You were signed out after 14 days away" | default | auth card |
| `pages/sign-in/signed-out` | success, role status | "You're signed out"; body | default | auth card |
| dialogs (`dialogs/*/failed`, `dialogs/*/success`) | danger or success | "We couldn't save your report", "Report sent" | default | dialog surface |
| page notices (`pages/search-results/partial`, `notifications/service-notice/*`, `pages/certificate/*`) | info, warning, danger; lock or clock icon | "Search is limited right now" | default | canvas |

## Anatomy

1. **Alert** — `div.alert` (+ `.alert--success`, `--warning`, `--danger`) with `role="alert"`
   (danger), `role="status"` (other tones) or `role="note"` (a static note).
2. **Icon** — an [icon](icon.md): `attention` (info and danger), `done` (success), `warning`
   (warning), or a given icon (`lock`, `clock`).
3. **Title** — `p.alert__title`.
4. **Body (optional)** — `p.alert__body`.
5. **Actions (optional)** — `div.alert__actions` of links or small buttons.

Host: `ll-alert` is `display: contents`; it renders the `div.alert`.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `tone` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | no | Adds `.alert--{tone}` (info adds nothing) and picks the default icon and role. |
| `heading` | `string` | — | yes | The title. |
| `icon` | `IconName \| null` | `null` | no | Overrides the tone's icon. |
| `role` | `'alert' \| 'status' \| 'note' \| null` | `null` | no | Overrides the role (`null`: `alert` for danger, `status` otherwise). |

### Outputs

None.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | text | The body; omitted when empty. |
| `[slot=actions]` | links and small buttons | Rendered in `.alert__actions`; omitted when empty. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Information | — | Neutral facts: a session ended, a limit. |
| Success | `.alert--success` | Something worked: signed out, report sent. |
| Warning | `.alert--warning` | A pause, a suspension, a limited service. |
| Danger | `.alert--danger` | Something failed. |

One size; the width follows the container.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Shown | rendered | Tone colours and icon | `alert` is announced assertively; `status` politely |

## Markup

```html
<!-- rendered -->
<div class="alert alert--danger" role="alert"><svg class="icon" aria-hidden="true">…</svg><p class="alert__title">Email or password is incorrect</p><p class="alert__body">Check both and try again. If you've forgotten your password, you can reset it by email.</p><div class="alert__actions"><a href="/forgot-password">Reset your password</a></div></div>
```

```html
<!-- consumer -->
<ll-alert tone="danger" heading="Email or password is incorrect" i18n-heading>Check both and try again…<a slot="actions" routerLink="/forgot-password">Reset your password</a></ll-alert>
```

## Design

- Grid of icon and text, gap `--space-3` `--space-4`, padding `--space-5`, `--radius-md`, hairline in
  the tone's border role.
- Title `--text-h4`; body `--text-body-sm` in `--color-fg-default`; actions gap `--space-3`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Info | `--color-info-bg` / `--color-info-fg` / `--color-info-border` / `--color-info-icon` | info roles | info roles |
| Success | `--color-success-bg` / `--color-success-fg` / `--color-success-border` / `--color-success-icon` | success roles | success roles |
| Warning | `--color-warning-bg` / `--color-warning-fg` / `--color-warning-border` / `--color-warning-icon` | warning roles | warning roles |
| Danger | `--color-danger-bg` / `--color-danger-fg` / `--color-danger-border` / `--color-danger-icon` | danger roles | danger roles |
| Body | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-danger-fg` | `--color-danger-bg` | 4.5:1 | Danger title |
| `--color-warning-fg` | `--color-warning-bg` | 4.5:1 | Warning title |
| `--color-success-fg` | `--color-success-bg` | 4.5:1 | Success title |
| `--color-info-fg` | `--color-info-bg` | 4.5:1 | Info title |

## Responsive behaviour

- The same layout at every width; text and actions wrap; at 320 px nothing scrolls horizontally.

## Accessibility

### Role and pattern

`role="alert"` for failures (assertive), `role="status"` for information that may wait (polite),
`role="note"` for a static note.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | The action links. |

### Focus

Not moved by the alert.

### Labelling

The icon is decorative; the title carries the message.

### Announcements

Through its role when it appears.

### Motion

None.

## Content and internationalisation

- Title says what happened; body says what to do. All copy arrives translated; dates and times formatted
  by the page.

## Performance

- `OnPush`; static. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given wrong sign-in details, when the API answers 401, then a danger alert with `role="alert"` reads "Email or password is incorrect" with the link "Reset your password". (L2-008)
- **AC-2** Given too many sign-in attempts, when the API answers 429 with `Retry-After`, then a warning alert "Sign-in is paused for 15 minutes" names the time sign-in reopens. (L2-009)
- **AC-3** Given a suspended account, when it signs in, then a warning alert explains the suspension and its end date with "Read the notice". (L2-019)
- **AC-4** Given a member who just signed out, when the sign-in page shows, then a success alert with `role="status"` reads "You're signed out". (L2-010)
- **AC-5** Given an alert, when it is inspected, then its icon is hidden from assistive technology. (L2-127)

### Theming

- **AC-6** Given the dark theme, when alerts of each tone render, then their colours come from dark token values. (L2-134)
- **AC-7** Given both themes, when contrast is measured, then each tone's title meets 4.5:1 on its fill. (L2-129)

### Responsive

- **AC-8** Given a viewport of 320 px, when an alert with two actions renders, then the actions wrap and nothing scrolls horizontally. (L2-130)
- **AC-9** Given the pseudo-locale's longer copy at 375 px, when an alert renders, then nothing is clipped. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/alert/`: `alert.ts` (`Alert`), `alert-tone.ts`, `.html`,
  `.scss` with the `.alert` rules under `:host ::ng-deep` (banner and strip rules go with their own
  components). Composes `Icon`.

## Decisions

- **D-1** *Which icon does each tone use?* Information and danger the attention circle, success the done
  tick, warning the triangle — the pairings used by most alerts in the mocks; lock and clock are given
  explicitly.
- **D-2** *Which role?* Danger is `alert`; every other tone is `status`, as in the mocks.
