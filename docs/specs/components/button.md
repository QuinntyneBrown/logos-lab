# Button

| Field | Value |
|---|---|
| Selector | `button[llButton]`, `a[llButton]`, `button[llIconButton]`, `a[llIconButton]` |
| Library path | `frontend/projects/components/src/lib/button/` |
| Status | built |
| Traces to | L2-024, L2-126, L2-127, L2-129, L2-132, L2-134, L2-150 |
| Design system | [`button.html`](../../design-system/components/button.html) |
| Source mocks | [`pages/home/default`](../../mocks/pages/home/default.html), [`pages/course-overview/visitor`](../../mocks/pages/course-overview/visitor.html), [`dialogs/nav-drawer/default`](../../mocks/dialogs/nav-drawer/default.html), [`dialogs/delete-account/default`](../../mocks/dialogs/delete-account/default.html), [`notifications/toast/default`](../../mocks/notifications/toast/default.html) |
| Rendering | [`button.html`](button.html) |

## Purpose and scope

A button triggers one action: save, send, enrol, confirm. A link that should look like a button (for
example "Create account" in the top bar or "Browse the catalogue" in the hero) uses the same component
on an `<a>`, so it keeps link semantics. The sage primary pill marks the single action that matters in a
group; everything else stays quiet. The round icon button (`.icon-btn`) is the same component family
for bars, dialogs, cards and toasts.

Use a plain link (the `link` foundation) for navigation inside prose, the
[top bar](top-bar.md)'s `.menu-btn` and `.avatar-btn` for its own controls, and a button group for
segmented or toolbar sets.

Out of scope:

- Form validation, submission and the busy copy ("Sending…"): the page sets `busy` and the label.
- Where focus goes after the action: the page or dialog decides.
- Toggle state logic: the page owns the value and binds `pressed`.
- Deciding that an action is paused, and the alert that says why: the page sets `paused` and renders
  the alert, linked to the button with `aria-describedby`.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/home/*` top bar | `a`, text, sm | "Sign in" | default, hover, focus | canvas |
| `pages/home/*` top bar | `a`, primary, sm, extra class `header__cta` | "Create account" | default, hover, focus | canvas |
| `pages/home/*` hero | `a`, quiet, lg, trailing arrow | "Browse the catalogue" + `.btn__arrow` | default, hover | canvas |
| `pages/home/*` hero search | `button type=submit`, primary | "Search" | default, hover, focus | inside `.search` |
| `pages/course-overview/*` hero | `a`, primary, lg / quiet, lg | "Sign in to enrol", "Create a free account", "Enrol" | default, busy "Enrolling…" | canvas |
| `pages/expert-profile/rate-limited` | `button`, primary, toggle (`pressed` false), extra `aria-describedby="limit-alert"` | "Follow" | default, paused | canvas |
| every dialog footer | `button`, primary or danger + quiet | "Delete account", "Cancel", "Send report" | default, busy "Sending…", disabled | dialog surface |
| `dialogs/nav-drawer/*` | `a`, primary with `sheet__done`; `a`, quiet, block | "Create account", "Sign in" | default | drawer surface |
| top-bar sheet (every page) | `button`, quiet, extra class `nav__close` | "Close menu" | default | raised surface |
| filter toolbars (`pages/explore/*`, `pages/search-results/*`) | `button`, text, sm; `a`, quiet, sm, `filters-btn` | "Clear all", "Filters" | default, pressed | canvas |
| studio and admin rows | `button`/`a`, ghost, sm | "Duplicate", "Edit", "Preview" | default, hover | surface rows |
| `pages/sign-in/*`, `pages/register/*` | `button type=submit`, primary, lg, block | "Sign in", "Create account" | default, busy "Signing in…" | auth card |
| toasts | `a`, text, sm, `toast__action`; icon button `toast__close` | "Undo", "Dismiss notification" | default | inverse toast |
| top bar | icon button `a` with `header__search-btn`, `header__lg` | search glyph, theme glyph; `aria-label` | default, hover, focus | canvas |
| top bar, signed in | icon button `a` with count | bell glyph + `.icon-btn__count` "3"; label "Notifications, 3 unread" | default | canvas |
| content cards | icon button `button` with `content-card__save`, toggle | bookmark glyph; "Save Imago Dei in an Age of Machines" | pressed true/false | card cover |
| sortable rows | icon button sm with `sortable__handle` | grip glyph | default, focus | surface |
| dialogs | icon button `button`, sm | close glyph; "Close dialog" | default, hover | dialog head |

Every row is buildable with the API below: variant, size, block, the `busy`/`paused`/`disabled`/`pressed`
inputs, extra classes from the consumer, and projected label and icons.

## Anatomy

1. **Container** — `.btn`. A fully rounded pill; height from the size; the consumer's extra classes
   (for example `header__cta`) stay on the same element.
2. **Spinner (busy only)** — `.spinner`, `aria-hidden="true"`, rendered by the component before the
   label while `busy` is true.
3. **Leading icon (optional)** — projected `svg.icon`, `aria-hidden="true"`, 20 px line icon.
4. **Label** — projected text; it is the accessible name.
5. **Trailing arrow (optional)** — projected `svg.btn__arrow`, `aria-hidden="true"`; nudges on hover.
6. **Icon button** — `.icon-btn`, a 44 px round borderless target holding one `svg.icon` and an
   optional `.icon-btn__count` badge (`aria-hidden="true"`).

Host: the component is an attribute component. The host **is** the native `<button>` or `<a>`; the
component adds the classes to it and renders the spinner and the projected content inside it.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `variant` (`llButton`) | `'primary' \| 'secondary' \| 'quiet' \| 'ghost' \| 'text' \| 'danger'` | `'secondary'` | no | Adds `.btn--{variant}`; secondary adds no modifier. |
| `size` (`llButton`) | `'sm' \| 'md' \| 'lg'` | `'md'` | no | `sm` adds `.btn--sm`, `lg` adds `.btn--lg`; `md` adds nothing. |
| `block` (`llButton`) | `boolean` | `false` | no | Adds `.btn--block`. |
| `busy` (`llButton`) | `boolean` | `false` | no | Sets `aria-busy="true"` and `aria-disabled="true"`, renders the spinner, and stops click and submit events. Never sets native `disabled`, so focus stays. |
| `paused` (`llButton`) | `boolean` | `false` | no | Sets `aria-disabled="true"`, shows no spinner, and stops click and submit events (`preventDefault` and `stopImmediatePropagation`, as `busy` does). Never sets native `disabled`, so the button keeps its focus and its variant's own appearance. The page explains why with `aria-describedby` on the element, pointing at a nearby alert. When `busy` is also set, `busy` wins and the spinner shows. |
| `disabled` (`llButton` on `button`) | `boolean` | `false` | no | Native `disabled`. On an `<a>` the consumer removes the link instead; a disabled link is not used. |
| `pressed` (`llButton`, `llIconButton`) | `boolean \| null` | `null` | no | `null` renders no `aria-pressed`; a boolean renders `aria-pressed="true\|false"` (toggle buttons). |
| `size` (`llIconButton`) | `'md' \| 'sm'` | `'md'` | no | `sm` adds `.icon-btn--sm` (32 px, used only where a larger hit area surrounds it). |
| `count` (`llIconButton`) | `number \| null` | `null` | no | A positive number renders `.icon-btn__count` with `aria-hidden="true"`; the consumer's `aria-label` carries the count in words. |

- Inputs are signal inputs; booleans accept bare attributes (`booleanAttribute`).
- `type` stays a native attribute set by the consumer; the component defaults a `<button>` without one to
  `type="button"`.

### Outputs

None. The host is a native element, so consumers listen to its native `click`. While `busy` or
`paused`, the component stops the click (and the form submit it would cause) before it reaches listeners.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | label text, `svg.icon` before it, `svg.btn__arrow` after it | Icons carry `aria-hidden="true"`; an icon button holds only an icon and gets its name from `aria-label`. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Primary | `.btn--primary` | The one action that moves the task forward. One per group. |
| Secondary | — | A second, equal-weight action on a surface. |
| Quiet | `.btn--quiet` | Outlined pill beside a primary: Cancel, Back, Browse the catalogue. |
| Ghost | `.btn--ghost` | Borderless, for toolbars and dense rows. |
| Text | `.btn--text` | Reads like a link but acts, or a header link such as Sign in. |
| Danger | `.btn--danger` | A confirmed destructive action, usually in a confirmation dialog. |
| Block | `.btn--block` | Full width in narrow forms and sheets. |
| Icon button | `.icon-btn` | Round icon-only target in bars, dialogs, cards and toasts. |

| Size | Modifier | Height | Padding | Type |
|---|---|---|---|---|
| sm | `.btn--sm` | `--control-height-sm` | `--space-4` | `--text-label` |
| md | — | `--control-height-md` | `--space-5` | `--text-label` |
| lg | `.btn--lg` | `--control-height-lg` | `--space-8` | `--text-label` at `--font-size-md` |
| icon md | `.icon-btn` | `--target-comfortable` square | — | — |
| icon sm | `.icon-btn--sm` | `--space-8` square | — | — |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Variant fill and label | Name from the label or `aria-label` |
| Hover | `:hover` | Primary darkens to `--color-accent-hover` and lifts 1 px; others take `--color-bg-subtle`; the arrow nudges by `--lift-nudge` | — |
| Focus | `:focus-visible` | `--focus-ring-width` ring in `--color-focus-ring`, offset `--focus-ring-offset` | Focus announced with name |
| Active | `:active` | Presses down by `--space-0-5`; primary uses `--color-accent-active` | — |
| Pressed | `aria-pressed="true"` | `--border-width-thick` accent outline | "pressed" / "not pressed" |
| Busy | `aria-busy="true"` + `aria-disabled="true"` | Spinner before the label; the variant's own fill and label, with no hover change (D-5); `cursor: progress` | Name kept, focus kept, activation ignored |
| Paused | `aria-disabled="true"` without `aria-busy` (`paused`) | The variant's own fill and label, with `cursor: not-allowed` and no hover change (D-6); no spinner | Name kept, focus kept, activation ignored; the reason is read from the page's `aria-describedby` alert |
| Disabled | `disabled` | `--color-bg-subtle` fill, `--color-fg-disabled` label | Removed from the tab order |
| Count | `.icon-btn__count` present | Accent badge at the top right | Badge hidden; the count is in the name |

## Markup

```html
<!-- rendered: primary link, small, in the top bar -->
<a class="btn btn--primary btn--sm header__cta" href="/register">Create account</a>

<!-- rendered: quiet, large, trailing arrow -->
<a class="btn btn--quiet btn--lg" href="/explore">Browse the catalogue <svg class="btn__arrow icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></a>

<!-- rendered: busy submit -->
<button class="btn btn--primary" type="submit" aria-busy="true" aria-disabled="true"><span class="spinner" aria-hidden="true"></span>Sending…</button>

<!-- rendered: paused toggle, the reason in a nearby alert -->
<button class="btn btn--primary" type="button" aria-pressed="false" aria-disabled="true" aria-describedby="limit-alert">Follow</button>
<div class="alert alert--warning" role="alert" id="limit-alert">…</div>

<!-- rendered: icon button with count -->
<a class="icon-btn" href="/notifications" aria-label="Notifications, 3 unread"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">…</svg><span class="icon-btn__count" aria-hidden="true">3</span></a>

<!-- rendered: toggle icon button -->
<button class="icon-btn content-card__save" type="button" aria-pressed="true" aria-label="Save Imago Dei in an Age of Machines"><svg class="icon" …></svg></button>
```

```html
<!-- consumer -->
<a llButton variant="primary" size="sm" class="header__cta" routerLink="/register" i18n>Create account</a>
<button llButton variant="primary" type="submit" [busy]="sending()">{{ sending() ? sendingLabel : sendLabel }}</button>
<button llButton variant="primary" type="button" [pressed]="following()" [paused]="limited()" aria-describedby="limit-alert" i18n>Follow</button>
<a llIconButton routerLink="/notifications" [count]="unread()" [attr.aria-label]="notificationsLabel()"><svg class="icon" …></svg></a>
```

## Design

- Container: height and padding from the size; `--radius-full`; `--border-width-hairline` border;
  label `--text-label` with `--letter-spacing-subtle`; gap `--space-2` (`--space-3` while busy).
- Icon button: `--target-comfortable` square, `--radius-full`, no border, `--color-fg-muted` glyph.
- Count badge: `--space-5` tall, `--radius-full`, `--font-weight-bold` `--font-size-xs`.
- Motion: background, border and transform over `--duration-base` with `--ease-standard`; colour over
  `--duration-fast`.

Component tokens:

| Token | Aliases | Overridden by |
|---|---|---|
| `--ll-button-bg` | `--color-bg-surface` | primary `--color-accent`, danger `--color-danger-solid`, quiet/ghost/text `--color-transparent` |
| `--ll-button-fg` | `--color-fg-default` | primary `--color-fg-on-accent`, danger `--color-fg-on-danger`, text `--color-fg-link` |

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Primary fill | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Primary label | `--color-fg-on-accent` | `--palette-birch-50` | `--palette-accent-950` |
| Secondary fill | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |
| Quiet border | `--color-border-strong` | `--palette-stone-500` | `--palette-night-500` |
| Text label | `--color-fg-link` | `--palette-accent-700` | `--palette-accent-300` |
| Danger fill | `--color-danger-solid` | `--palette-lingon-600` | `--palette-lingon-300` |
| Danger label | `--color-fg-on-danger` | `--palette-white` | `--palette-lingon-950` |
| Disabled fill | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |
| Disabled label | `--color-fg-disabled` | `--palette-oat-400` | `--palette-night-500` |
| Focus ring | `--color-focus-ring` | `--palette-accent-700` | `--palette-accent-300` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-on-accent` | `--color-accent` | 4.5:1 | Primary label |
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Secondary label |
| `--color-fg-on-danger` | `--color-danger-solid` | 4.5:1 | Danger label |
| `--color-focus-ring` | `--color-bg-surface` | 3:1 | Focus indicator |

In forced colours every `.btn` keeps a `CanvasText` hairline border.

## Responsive behaviour

- The label never truncates; a long label wraps the row the button sits in, not the button
  (`white-space: nowrap` on the label, the parent cluster wraps).
- Below 40rem the primary action of a form or sheet may be `block`.
- Every md and lg button and every md icon button is at least 44 × 44 CSS px; sm buttons are at least
  24 × 24 CSS px and are used only in dense rows on LG and XL or with surrounding hit area.
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom every button stays reachable.

## Accessibility

### Role and pattern

Native `<button>` (APG Button) or native `<a href>` for navigation. Toggle buttons use
`aria-pressed`.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Moves focus to and from the button, including while busy or paused. |
| <kbd>Enter</kbd> | Activates a button or follows a link. |
| <kbd>Space</kbd> | Activates a `<button>`. |

### Focus

The `--color-focus-ring` outline, `--focus-ring-width` thick and offset `--focus-ring-offset`, shows on
keyboard focus. A busy or paused button keeps focus.

### Labelling

The label is the accessible name. Icon buttons need `aria-label`; when it extends a visible label
it starts with that label (WCAG 2.5.3). Counts are spoken from the name ("Notifications, 3 unread"),
never from the badge.

### Announcements

None by the button. A paused button is conveyed by `aria-disabled="true"` and by the page's
`aria-describedby` alert, which a screen reader reads with the name; the button itself announces nothing. A page announces the result of the action through its polite live region.

### Motion

Under `prefers-reduced-motion: reduce` the hover lift, press offset and arrow nudge are removed and
colour changes are instant.

## Content and internationalisation

- Start with a verb and name the object, in sentence case: "Create account", "Enrol", "Delete
  account". No terminal punctuation; busy labels end with an ellipsis: "Sending…".
- Every label arrives from the consumer's template, marked for translation; the component holds no
  copy. Labels may grow 30 % in French and must wrap the surrounding row rather than overflow.

## Performance

- Change detection: `OnPush`; inputs are signals and the class list is a `computed`.
- No perf-test project exists in this repository (see D-3); the button is measured through the page
  budgets of `L2-120` and `L2-123`.
- Layout stability: a busy button keeps its width-defining label, so toggling busy shifts nothing
  around it beyond the spinner's inline space.
- Weight: no dependencies beyond `@angular/core`.

## Acceptance criteria

### Rendering

- **AC-1** Given the top bar for a visitor, when it renders, then "Create account" is an `a.btn.btn--primary.btn--sm` that keeps the consumer's `header__cta` class and links to `/register`. (L2-127)
- **AC-2** Given the hero's "Browse the catalogue" link, when it renders, then it is an `a.btn.btn--quiet.btn--lg` whose arrow icon has `aria-hidden="true"` and whose accessible name is "Browse the catalogue". (L2-127)
- **AC-3** Given a `<button llButton>` without a `type`, when it renders inside a form, then it has `type="button"` and does not submit the form. (L2-127)

### States

- **AC-4** Given a primary submit button labelled "Sending…" with `busy` set, when it renders, then it has `aria-busy="true"` and `aria-disabled="true"`, shows a `.spinner` with `aria-hidden="true"`, and is not natively disabled. (L2-127)
- **AC-15** Given a primary submit button with `busy` set and the pointer still over it, when it renders, then it keeps the primary fill and label colours, not the hover or the disabled colours. (L2-127)
- **AC-5** Given a busy submit button with keyboard focus, when the user presses Enter again, then focus stays on it and no second click or submit reaches the page. (L2-126)
- **AC-6** Given a "Save Imago Dei in an Age of Machines" icon toggle with `pressed` false, when the page sets it to true, then it renders `aria-pressed="true"` and the accent outline. (L2-127)
- **AC-7** Given a notifications icon button with `count` 3 and the label "Notifications, 3 unread", when it renders, then the badge reads "3", has `aria-hidden="true"`, and the accessible name is "Notifications, 3 unread". (L2-127)

- **AC-16** Given the "Follow" button of Dr. Abena Mensah's profile with `paused` set and `aria-describedby="limit-alert"`, when it renders, then it has `aria-disabled="true"` and no `aria-busy`, shows no `.spinner`, is not natively disabled, keeps the primary fill and label colours with `cursor: not-allowed`, and its accessible description is the alert's text. (L2-024)
- **AC-17** Given a paused "Follow" button, when the user clicks it or presses Enter or Space on it, then no click or submit reaches the page, no request is sent, and focus stays on the button. (L2-024)
- **AC-18** Given a paused "Follow" toggle with `pressed` false, when it renders and the user activates it, then it keeps `aria-pressed="false"`; and given the same toggle with `pressed` true, it keeps `aria-pressed="true"`. (L2-127)

### Keyboard and focus

- **AC-8** Given any button or button-styled link, when it receives keyboard focus, then a `--color-focus-ring` outline at least 2 CSS px thick is visible with at least 3:1 contrast against the surface. (L2-126)

### Screen readers

- **AC-9** Given an icon button with no visible label, when it is inspected, then it exposes the name from its `aria-label` and its icon is hidden from assistive technology. (L2-127)

### Theming

- **AC-10** Given the primary "Create account" button in the dark theme, when its colours are measured, then the label on the fill is at least 4.5:1 and both come from tokens with dark values. (L2-134)
- **AC-11** Given every variant in both themes, when contrast is measured, then each label meets 4.5:1 against its fill. (L2-129)

### Responsive

- **AC-12** Given a viewport of 375 px, when an md button or an md icon button is measured, then its target is at least 44 × 44 CSS px. (L2-132)
- **AC-13** Given a button label 30 % longer in the pseudo-locale, when it renders at 320 px, then it is not clipped and the row wraps instead of overflowing. (L2-150)

### Motion

- **AC-14** Given reduced motion, when the user hovers and presses a primary button, then it neither lifts nor moves and colours change without transition. (L2-129)

## Implementation notes

- Folder `frontend/projects/components/src/lib/button/` with `button.ts` (`Button`, selector
  `button[llButton], a[llButton]`), `icon-button.ts` (`IconButton`, selector
  `button[llIconButton], a[llIconButton]`), each with its own `.html` and `.scss`.
- Styles: the `button` and `spinner` blocks of `components.css`, rewritten so the host selectors read
  `:host(.btn…)`; projected children are styled under `:host ::ng-deep`.
- The design-system rule `.btn[aria-disabled="true"]:not([aria-busy="true"])` greys the button out, and its
  primary and danger hover rules do not exclude `aria-disabled`. Paused (D-6) needs the variant's own
  colours and no hover change, so the design-system stylesheet changes first (the paused mock currently
  inherits the grey look); the HTML rendering shows the required look with a labelled specimen style.
- Classes are applied with host bindings, so the consumer's own `class` attribute is kept.

## Decisions

- **D-1** *Does busy use native `disabled`?* No. Some mocks render `disabled` with `aria-busy`, but a
  disabled button loses focus mid-submit; busy keeps focus and blocks activation instead, which the
  design-system page describes ("keeps its label and width, adds a spinner").
- **D-2** *Is the secondary variant named?* Yes, `'secondary'`, the default; it adds no modifier class,
  as on the design-system page.
- **D-3** *Where is the render-performance budget measured?* This repository has no perf-test project;
  the budgets of `L2-120` and `L2-123` measured on whole pages cover the button. A perf-test project is
  added by its own ADR if page budgets prove insufficient.
- **D-4** *How is a disabled link shown?* It is not: the mocks never render one, so a consumer removes
  or replaces an unavailable link rather than disabling it.
- **D-5** *Which colours does a busy button wear?* Its variant's own, as the design-system page ("keeps
  its label and width, adds a spinner") and the submitting mocks show. `aria-disabled` on a busy button
  only blocks activation, so it neither greys the button out nor lets hover darken it under the pointer
  that pressed it. A natively `disabled` button keeps the disabled colours, under the pointer too.
- **D-6** *Why is `paused` separate from `busy`?* They tell the user opposite things. `busy` means "working,
  wait": a spinner shows and the action will finish by itself. `paused` means "refused for now, see the
  message": no spinner, and the reason (for example the 429 of L2-024 AC4, "Give it a minute") sits in an
  alert that the button points to with `aria-describedby`. Both use `aria-disabled` rather than native
  `disabled` so the button stays in the tab order and keeps its name, and both ignore activation. A paused
  button wears its variant's own colours, as a busy one does (D-5), because greying it out would hide the
  name the alert refers to; the `not-allowed` cursor and the alert say it is refused. `busy` wins when both
  are set, since a request in flight is the more specific fact.
