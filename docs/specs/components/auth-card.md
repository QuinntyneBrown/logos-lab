# Sign-in card

| Field | Value |
|---|---|
| Selector | `ll-auth-card` |
| Library path | `frontend/projects/components/src/lib/auth-card/` |
| Status | built |
| Traces to | L2-008, L2-127, L2-129, L2-130, L2-134, L2-150 |
| Design system | [`auth-card.html`](../../design-system/components/auth-card.html) |
| Source mocks | [`pages/sign-in/default`](../../mocks/pages/sign-in/default.html), [`pages/register/default`](../../mocks/pages/register/default.html), [`pages/forgot-password/default`](../../mocks/pages/forgot-password/default.html), [`pages/reset-password/default`](../../mocks/pages/reset-password/default.html), [`pages/verify-email/default`](../../mocks/pages/verify-email/default.html), [`pages/mfa-setup/default`](../../mocks/pages/mfa-setup/default.html), [`pages/account-notice/default`](../../mocks/pages/account-notice/default.html), [`pages/expert-invitation/default`](../../mocks/pages/expert-invitation/default.html) |
| Rendering | [`auth-card.html`](auth-card.html) |

## Purpose and scope

The sign-in card centres one focused task on the page: sign in, create an account, reset a password,
verify an email, set up two-step verification, read an account notice, accept an expert invitation. A
card on the canvas holds an introduction (eyebrow, title, one sentence), an optional alert, the form and
an alternative path ("New to Logos Lab? Create a free account").

Out of scope:

- The form, its fields and its validation: the page with the [form field](form-field.md) and
  [form layout](form-layout.md) components.
- The focused shell (minimal top bar and quiet footer): the application.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/sign-in/*` | eyebrow "Welcome back", title "Sign in to Logos Lab", sub; alert; form; alt "New to Logos Lab? Create a free account" | all sign-in states | default, with alert | canvas |
| `pages/register/*` | "Create your Logos Lab account" | form; alt "Already have an account? Sign in" | default, invalid, submitting | canvas |
| `pages/register/success`, `pages/forgot-password/success`, `pages/verify-email/*` | mail icon tile; "Check your email" | list of next steps; alt "Wrong address? Start again" | success | canvas |
| `pages/forgot-password/*`, `pages/reset-password/*`, `pages/verify-email/*`, `pages/email-change-confirm/*` | short forms or messages | — | default, success, expired | canvas |
| `pages/mfa-setup/*`, `pages/sign-in-verify/*` | codes and steps | — | default | canvas |
| `pages/account-notice/*`, `pages/account-deleted/*`, `pages/restore-account/*`, `pages/policy-reconsent/*`, `pages/expert-invitation/*`, `pages/report-change/*` | notice and actions | — | default | canvas |

## Anatomy

1. **Area** — `div.wrap.auth`: centres the card with `--space-16` / `--space-24` block padding.
2. **Card** — `div.auth__card`: surface, hairline, `--radius-xl`, a grid with `--space-8` gaps, at most
   `--size-auth-card` wide.
3. **Icon tile (optional)** — `span.empty__icon` holding an [icon](icon.md), hidden from assistive
   technology, before the introduction.
4. **Introduction** — projected: `p.eyebrow`, `h1.auth__title`, `p.auth__sub`.
5. **Body** — projected: an alert, a form, messages.
6. **Alternative** — projected `p.auth__alt`.

Host: `ll-auth-card` is `display: contents`; it renders the area and the card and projects the parts.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `icon` | `IconName \| null` | `null` | no | Renders the icon tile (`mail` on "Check your email") before the introduction. |

### Outputs

None.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| `[slot=intro]` | eyebrow, `h1.auth__title`, `p.auth__sub` | Rendered in the card's first cell. |
| default | alert, form, messages | Rendered after the introduction. |
| `[slot=alt]` | `p.auth__alt` | Rendered last. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Card | — | Every focused task. |
| With icon | `icon` set | A confirmation or message: "Check your email". |

One size: at most `--size-auth-card` wide; padding `--space-8` `--space-6`, `--space-12` from 40rem.

## States

The card has no states of its own; its alert and form carry them.

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Centred card | The `h1` names the page |

## Markup

```html
<!-- rendered -->
<div class="wrap auth">
  <div class="auth__card">
    <div><p class="eyebrow">Welcome back</p><h1 class="auth__title">Sign in to Logos Lab</h1><p class="auth__sub">Pick up your courses, saved items and conversations where you left them.</p></div>
    <form class="form" novalidate>…</form>
    <p class="auth__alt">New to Logos Lab? <a href="/register">Create a free account</a></p>
  </div>
</div>
```

```html
<!-- consumer -->
<ll-auth-card><div slot="intro">…</div><form llForm>…</form><p class="auth__alt" slot="alt">…</p></ll-auth-card>
```

## Design

- Icon tile: `--size-empty-icon` square, `--radius-md`, `--color-accent-subtle` fill, glyph
  `--size-empty-glyph` in `--color-fg-accent`; the same tile as the [empty state](empty-state.md).
- Title `--text-h1` at `--font-size-3xl`, `--letter-spacing-tight`, margin-top `--space-4` after the
  eyebrow; sub margin-top `--space-3`, muted; alt `--text-body-sm`, centred, muted.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Card | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |
| Border | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Sub, alt | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Title |
| `--color-fg-muted` | `--color-bg-surface` | 4.5:1 | Sub and alt |

## Responsive behaviour

- Full width with `--space-6` padding on phones; centred at most `--size-auth-card` wide from SM. At
  320 px nothing scrolls horizontally.

## Accessibility

### Role and pattern

Plain content; the title is the page's `h1`.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Through the projected form and links. |

### Focus

Owned by the page (the form summary takes focus on invalid submit).

### Labelling

None of its own.

### Announcements

None of its own.

### Motion

None.

## Content and internationalisation

- All copy is projected and translated.

## Performance

- `OnPush`; static. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given a visitor opens `/sign-in`, when the page renders, then a centred card shows "Welcome back", the heading "Sign in to Logos Lab", the form and "New to Logos Lab? Create a free account". (L2-008)
- **AC-2** Given the sign-in page, when it is inspected, then its only `h1` is "Sign in to Logos Lab". (L2-127)
- **AC-7** Given a visitor whose registration was accepted, when the card shows "Check your email", then a mail icon tile sits above the title and is hidden from assistive technology. (L2-127)

### Theming

- **AC-3** Given the dark theme, when the card renders, then surface, border and text use dark token values. (L2-134)
- **AC-4** Given both themes, when contrast is measured, then title, sub and alt meet 4.5:1 on the card. (L2-129)

### Responsive

- **AC-5** Given a viewport of 320 px, when the sign-in page renders, then the card fits and nothing scrolls horizontally. (L2-130)
- **AC-6** Given the pseudo-locale's longer copy at 375 px, when the card renders, then nothing is clipped. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/auth-card/`: `auth-card.ts` (`AuthCard`), `.html`, `.scss`
  with the `auth-card` block and the `.empty__icon` tile rules under `:host ::ng-deep`. Composes `Icon`.

## Decisions

- **D-1** *Does the card take a title input?* No; the introduction is projected so pages can add a
  `strong` item name ("Sign in and we'll bring you straight back to **Imago Dei…**").
- **D-2** *Why an `icon` input when the introduction is projected?* The tile is the same on every
  confirmation card, so the card draws it; pages name only the glyph.
