# Banner

| Field | Value |
|---|---|
| Selector | `ll-banner` |
| Library path | `frontend/projects/components/src/lib/banner/` |
| Status | built |
| Traces to | L2-007, L2-078, L2-091, L2-098, L2-126, L2-127, L2-129, L2-130, L2-134, L2-141, L2-150 |
| Design system | [`alert.html`](../../design-system/components/alert.html) (banner variant), [`notifications`](../../design-system/patterns/notifications.html) |
| Source mocks | [`notifications/account-banner/*`](../../mocks/notifications/account-banner/warning.html), [`notifications/offline-notice/*`](../../mocks/notifications/offline-notice/warning.html), [`notifications/site-announcement/*`](../../mocks/notifications/site-announcement/info.html), [`notifications/preview-banner/*`](../../mocks/notifications/preview-banner/info.html), [`notifications/cookie-banner/stacked`](../../mocks/notifications/cookie-banner/stacked.html), [`pages/lesson-player/offline`](../../mocks/pages/lesson-player/offline.html), [`pages/event-editor/cancelled`](../../mocks/pages/event-editor/cancelled.html) |
| Rendering | [`banner.html`](banner.html) |

## Purpose and scope

A banner is a full-width strip below the header that says something about the member's account, the
connection, the site or the page as a whole. It carries one sentence, at most one action and an
optional dismiss. Use an [alert](alert.md) for a message inside a card or a section, and a toast for a
passing confirmation.

Out of scope:

- Deciding when a banner shows, what it says and whether a dismissal is remembered: the page or the
  shell service that owns it (account banner, offline notice, site announcement, preview notice).
- Stacking several banners: they are siblings in the order the shell renders them.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `notifications/account-banner/warning` | warning, region "Account", dismiss "Dismiss for now" | "Verify your email to enrol, comment…"; action "Resend email" | default | band |
| `notifications/account-banner/persistent` | warning, region "Account", no dismiss | "Verify your email by Wed 11 Nov 2026…"; action "Resend email" | default | band |
| `notifications/account-banner/info` | info, live, "Account", dismiss "Dismiss" | "We sent a new verification link…" | default | band |
| `notifications/account-banner/success` | success, live, "Account", dismiss "Dismiss" | "Your email is verified…" | default | band |
| `notifications/account-banner/danger` | danger, region "Account", dismiss "Dismiss for now" | "Emails to … are bouncing…"; action "Update email" | default | band |
| `notifications/offline-notice/*` | warning or success, live, "Connection", icon `offline` | "You're offline…"; action "Try again"; dismiss "Dismiss" | default, persistent, with-action, success | band |
| `notifications/site-announcement/*` | info or warning, region "Announcement", dismiss "Dismiss announcement" | announcement text; action "See the event" | default, stacked, with-action | band |
| `notifications/preview-banner/*` | info, region "Preview notice", no dismiss | `strong` "Preview – not published." and text | default, persistent, with-action | band |
| `pages/lesson-player/offline`, `pages/module-player/offline` | warning, live, no label, icon `offline` | text; action "Try again" | default | band |
| `pages/event-editor/cancelled` | danger, live, icon `close` | "Cancelled on Tue 13 Oct 2026 by Naomi Ellis…" | default | band |

## Anatomy

1. **Strip** — `div.banner` with a tone modifier, `role` and `aria-label`.
2. **Inner** — `div.wrap.banner__inner`: a wrapping flex row inside the content width.
3. **Icon** — `svg.icon`, decorative, coloured by tone.
4. **Text** — `p.banner__text`, the content slot.
5. **Action (optional)** — a small quiet button or link from `[slot=actions]`.
6. **Dismiss (optional)** — `button.icon-btn` with a small close icon and an `aria-label`.

Host: `ll-banner` is `display: contents` and renders the strip.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `tone` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | no | Adds `.banner--{tone}`; `info` adds none. |
| `live` | `boolean` | `false` | no | `true` sets `role="status"` so a change is announced; `false` sets `role="region"` when `label` is set, and no role otherwise. |
| `label` | `string \| null` | `null` | no | The strip's `aria-label`: "Account", "Connection", "Announcement", "Preview notice". |
| `icon` | `IconName \| null` | `null` | no | Overrides the tone's icon: info and danger `attention`, success `check`, warning `warning`. |
| `dismissLabel` | `string \| null` | `null` | no | Renders the dismiss button with this accessible name; `null` renders none. |

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| `dismissed` | `void` | The dismiss button is pressed. The consumer removes the banner. |

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | text and inline elements (`strong`, `a`) | Rendered inside `p.banner__text`. |
| `[slot=actions]` | one `button[llButton]` or `a[llButton]`, quiet, size `sm` | Rendered after the text. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Info | — | Announcements, a resent link, the preview notice |
| Success | `.banner--success` | A resolved account or connection problem |
| Warning | `.banner--warning` | An unverified account, offline, planned maintenance |
| Danger | `.banner--danger` | Bouncing email, a cancelled event |

One size: padding-block `--space-3`, gaps `--space-3` by `--space-5`, text `--text-body-sm`.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | rendered | tone background, hairline bottom border | region with its label, or status |
| Announced | `live` and rendered or its text changes | same | the text is read politely |
| Dismiss hover/focus | `:hover`, `:focus-visible` | icon button hover and focus ring | "Dismiss for now, button" |
| Dismissed | dismiss pressed | consumer removes the banner | focus moves to `main`'s first heading or stays in the page (consumer) |

## Markup

```html
<!-- rendered: account warning -->
<div class="banner banner--warning" role="region" aria-label="Account">
  <div class="wrap banner__inner">
    <svg class="icon" aria-hidden="true">…</svg>
    <p class="banner__text">Verify your email to enrol, comment, register for events and send messages. We sent a link to ethan.wu@example.ca.</p>
    <button class="btn btn--quiet btn--sm" type="button">Resend email</button>
    <button class="icon-btn" type="button" aria-label="Dismiss for now"><svg class="icon icon--sm" aria-hidden="true">…</svg></button>
  </div>
</div>
```

```html
<!-- consumer -->
<ll-banner tone="warning" label="Account" dismissLabel="Dismiss for now" (dismissed)="hide()">
  Verify your email to enrol, comment, register for events and send messages. We sent a link to {{ email }}.
  <button llButton variant="quiet" size="sm" slot="actions" (click)="resend()">Resend email</button>
</ll-banner>
```

## Design

- Strip: `--color-{tone}-bg` background, `--border-width-hairline` bottom border in `--color-{tone}-border`.
- Inner: flex, wrap, centred; gap `--space-3` `--space-5`; padding-block `--space-3`.
- Text: `--text-body-sm` in `--color-fg-default`, flexing from `--layout-card-min`.
- Icon: `--color-{tone}-icon`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Info strip | `--color-info-bg` | info background | info background |
| Warning strip | `--color-warning-bg` | warning background | warning background |
| Success strip | `--color-success-bg` | success background | success background |
| Danger strip | `--color-danger-bg` | danger background | danger background |
| Text | `--color-fg-default` | default foreground | default foreground |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-warning-bg` | 4.5:1 | Warning text |
| `--color-fg-default` | `--color-info-bg` | 4.5:1 | Info text |
| `--color-fg-default` | `--color-success-bg` | 4.5:1 | Success text |
| `--color-fg-default` | `--color-danger-bg` | 4.5:1 | Danger text |
| `--color-warning-icon` | `--color-warning-bg` | 3:1 | Warning icon |

## Responsive behaviour

- The row wraps: below the card-min width the text takes the whole line and the action and dismiss
  wrap under it.
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom everything stays available; the
  dismiss button keeps a 44 × 44 CSS px target on touch devices.

## Accessibility

### Role and pattern

A labelled region (`role="region"` plus `aria-label`) for a standing notice, or a status
(`role="status"`) for one that should be announced when it appears or changes.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Moves to the action, then the dismiss button. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Activates the focused button. |

### Focus

The banner takes no focus itself. After a dismissal the consumer keeps focus in the page.

### Labelling

The dismiss button is named by `dismissLabel` ("Dismiss for now", "Dismiss announcement").

### Announcements

A live banner's text is read politely when it appears or changes ("We sent a new verification link…").

### Motion

None.

## Content and internationalisation

- One or two sentences; dates in the locale's long form ("Wed 11 Nov 2026").
- Translatable inputs: `label`, `dismissLabel`, the text and action labels.

## Performance

- `OnPush`, signal inputs; no timers.
- The strip sits above the page content; it appears with the shell's first render where its data is
  already known, to avoid a layout shift.

## Acceptance criteria

### Rendering

- **AC-1** Given Ethan is signed in with an unverified email, when a product page renders, then a warning banner labelled "Account" says "Verify your email to enrol, comment, register for events and send messages. We sent a link to ethan.wu@example.ca." with "Resend email" and "Dismiss for now". (L2-007)
- **AC-2** Given the info tone, when the banner renders, then it has no tone modifier and the attention icon; warning, success and danger add `.banner--warning`, `.banner--success` and `.banner--danger`. (L2-127)
- **AC-3** Given an `icon`, when the banner renders, then that icon replaces the tone's icon, as the offline notice's `offline` icon does. (L2-141)
- **AC-4** Given a preview, when the banner renders without `dismissLabel`, then it has no dismiss button and its text keeps the strong "Preview – not published." (L2-078)
- **AC-5** Given a site announcement with an action, when the banner renders, then "See the event" follows the text and "Dismiss announcement" ends the row. (L2-098)

### States

- **AC-6** Given a dismissible banner, when its dismiss button is pressed, then `dismissed` is emitted once. (L2-091)

### Keyboard and focus

- **AC-7** Given a banner with an action and a dismiss button, when Tab is pressed from the header, then focus reaches the action, then the dismiss button, each with a visible focus ring. (L2-126)

### Screen readers

- **AC-8** Given a banner with `label` and not `live`, when it is inspected, then it is a region named by the label. (L2-127)
- **AC-9** Given a `live` banner, when its text changes to "We sent a new verification link to ethan.wu@example.ca…", then the new text is announced politely. (L2-127)

### Theming

- **AC-10** Given the dark theme, when each tone renders, then its strip, border and icon use the tone's dark tokens and the text meets 4.5:1. (L2-134)

### Responsive

- **AC-11** Given a 320 px viewport, when the account warning renders, then the text wraps, the action and dismiss wrap under it, and nothing scrolls horizontally. (L2-130)

### Content

- **AC-12** Given text 30 % longer, when the banner renders at 320 px, then nothing is clipped or overlapped. (L2-150)

### Motion

- **AC-13** Given reduced motion, when a banner appears or is dismissed, then nothing animates. (L2-129)

## Implementation notes

- Folder `frontend/projects/components/src/lib/banner/`: `banner.ts` (`Banner`), `banner-tone.ts`,
  `banner.html`, `banner.scss` from the `banner` rules of `components.css`.
- Reuse `svg[llIcon]` and `button[llIconButton]` for the icon and dismiss.

## Decisions

- **D-1** *A `section` for the preview notice?* No: one `div` with `role="region"` and a label is the
  same landmark, and keeps one element for every banner.
- **D-2** *Role from tone or from use?* From use: the `live` input. A standing warning is a region; a
  resent link, a restored connection or a cancelled event is a status the member should hear.
- **D-3** *Who remembers a dismissal?* The consumer. Each banner kind keeps its own rule (session for
  the account banner, per announcement for site announcements).
