# Error page

| Field | Value |
|---|---|
| Selector | `ll-error-page` |
| Library path | `frontend/projects/components/src/lib/error-page/` |
| Status | planned |
| Traces to | L2-127, L2-129, L2-130, L2-134, L2-141, L2-150 |
| Design system | [`error-page.html`](../../design-system/components/error-page.html) |
| Source mocks | [`pages/not-found/default`](../../mocks/pages/not-found/default.html), [`pages/not-found/signed-in`](../../mocks/pages/not-found/signed-in.html), [`pages/forbidden/default`](../../mocks/pages/forbidden/default.html), [`pages/gone/default`](../../mocks/pages/gone/default.html), [`pages/too-many-requests/default`](../../mocks/pages/too-many-requests/default.html), [`pages/server-error/default`](../../mocks/pages/server-error/default.html), [`pages/maintenance/default`](../../mocks/pages/maintenance/default.html), [`pages/offline/default`](../../mocks/pages/offline/default.html), [`pages/offline/retrying`](../../mocks/pages/offline/retrying.html) |
| Rendering | [`error-page.html`](error-page.html) |

## Purpose and scope

The error page explains in plain language what went wrong — a missing, forbidden, archived or
rate-limited page, a server fault, maintenance or a lost connection — and offers the next step. It is
the body of the 404, 403, 410, 429, 500, 503 and offline pages, rendered inside the normal shell so the
top bar and footer stay available.

Use an empty state for a list with no items and an alert for an inline failure inside a page.

Out of scope:

- Choosing the page and setting the HTTP status: `ErrorPageResolver` and `ResponseStatusService`.
- The retry timer of the offline page and the `Retry-After` wording of the 429 page: the page.
- Related content under a 410 ("Read these instead"): the page renders it after the component.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/not-found/*` | code "404" | title "We can't find that page"; text; search form; actions "Go to the home page" (visitor) or "Go to your dashboard" (member) and "Browse the catalogue" | default, signed-in | canvas |
| `pages/forbidden/default` | code "403" | "You don't have access to this page"; actions "Go to your dashboard", "Write to help@logoslab.ca" | default | canvas |
| `pages/gone/*` | code "410" | "This article is no longer available"; text with a `strong` title; action "Browse the catalogue" | default, no-related | canvas |
| `pages/too-many-requests/default` | code "429" | "Too many requests at once"; actions "Try again", "Write to help@logoslab.ca" | default | canvas |
| `pages/server-error/default` | code "500" | "Something went wrong on our side"; actions "Try again", "Go to your dashboard"; after: muted "Reference 7f3a-91c2…" | default | canvas |
| `pages/maintenance/default` | code "503" | "Back by 3:00 am ET"; action "Write to help@logoslab.ca" | default | canvas |
| `pages/offline/*` | icon instead of a code | "You're offline"; text; status "Trying again now…"; action "Try again" or busy "Reconnecting…" | default, retrying | canvas |

## Anatomy

1. **Container** — `div.error-page`: a start-aligned grid with `--space-6` gaps and `--space-24` block
   padding.
2. **Code** — `p.error-page__code`, `aria-hidden="true"`, large light numerals; or an icon in its place.
3. **Title** — `h1.error-page__title`, the page's only `h1`.
4. **Text** — `p.error-page__text`, at most `--layout-measure` wide.
5. **Extra (optional)** — a search form (stretched to the full width), a status line or a note.
6. **Actions** — `div.error-page__actions`, wrapping buttons.
7. **After (optional)** — a muted line after the actions, such as the server-error reference.

Host: `ll-error-page` is `display: contents`; it renders the `div.error-page` and projects the parts.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `code` | `string \| null` | `null` | no | Renders `p.error-page__code` with `aria-hidden="true"`; `null` renders the `[slot=icon]` content instead. |

### Outputs

None.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| `[slot=icon]` | an icon element | Shown in place of the code when `code` is `null`. |
| `[slot=title]` | text | Rendered inside `h1.error-page__title`. |
| `[slot=text]` | text and inline elements | Rendered inside `p.error-page__text`. |
| default | search form, status line, note | Rendered between the text and the actions. |
| `[slot=actions]` | buttons and button links | Rendered inside `div.error-page__actions`. |
| `[slot=after]` | a paragraph | Rendered after the actions. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| With code | — | 403, 404, 410, 429, 500, 503. |
| With icon | — | Offline, where no status code applies. |

One size; the width follows the page container.

## States

The component has no states of its own; its buttons and search follow their components (the offline
"Reconnecting…" button is a busy [button](button.md)).

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Code, title, text, actions | The `h1` names the page; the code is hidden |

## Markup

```html
<!-- rendered: 404 -->
<div class="error-page">
  <p class="error-page__code" aria-hidden="true">404</p>
  <h1 class="error-page__title">We can't find that page</h1>
  <p class="error-page__text">The link may be old, or the page may have moved. Search Logos Lab, or start again from the catalogue.</p>
  <form class="search" role="search">…</form>
  <div class="error-page__actions">
    <a class="btn btn--quiet" href="/">Go to the home page</a>
    <a class="btn btn--quiet" href="/explore">Browse the catalogue</a>
  </div>
</div>
```

```html
<!-- consumer -->
<ll-error-page code="404">
  <span slot="title" i18n>We can't find that page</span>
  <span slot="text" i18n>The link may be old…</span>
  <form llSearch …></form>
  <a llButton variant="quiet" slot="actions" routerLink="/" i18n>Go to the home page</a>
</ll-error-page>
```

## Design

- Grid gap `--space-6`; block padding `--space-24`; items start-aligned; a search form stretches.
- Code: `--font-weight-light` `--font-size-5xl` in `--font-family-display`, `--color-fg-subtle`,
  tabular numerals.
- Title `--text-h1`, `--letter-spacing-tight`; text `--text-body-lg`, `--color-fg-muted`, max width
  `--layout-measure`; actions gap `--space-3`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Code | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Title | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Text | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | Title |
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Text |
| `--color-fg-subtle` | `--color-bg-canvas` | 3:1 | Code (decorative, large) |

## Responsive behaviour

- The same single column at every breakpoint; actions wrap. At 320 px nothing scrolls horizontally;
  the search form fits with its action.

## Accessibility

### Role and pattern

Plain content inside `main`; the title is the page's `h1`.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Moves through the search and actions in order. |

### Focus

After a route change the shell moves focus to the `h1` (`L2-126`).

### Labelling

The status code is hidden from assistive technology because the title says the same in words.

### Announcements

The offline page's status line is a `role="status"` region supplied by the page.

### Motion

None.

## Content and internationalisation

- Plain language, no blame, one next step: "We can't find that page", "Something went wrong on our
  side". All copy arrives translated through slots; the code is a number.

## Performance

- `OnPush`; one input. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given a visitor opens `/no-such-page`, when the page renders, then it shows the hidden code "404", the heading "We can't find that page", a search form and the actions "Go to the home page" and "Browse the catalogue". (L2-141)
- **AC-2** Given the 404 page, when it is inspected, then the code has `aria-hidden="true"` and the page has exactly one `h1`. (L2-127)
- **AC-3** Given the offline page, when it renders, then an icon stands in place of a code and the heading is "You're offline". (L2-141)

### Theming

- **AC-4** Given the dark theme, when the 404 page renders, then the code, title and text use dark token values and the title and text meet 4.5:1. (L2-134)
- **AC-5** Given both themes, when contrast is measured, then the text meets 4.5:1 on the canvas. (L2-129)

### Responsive

- **AC-6** Given a viewport of 320 px, when the 404 page renders, then its search form and actions fit and the page does not scroll horizontally. (L2-130)
- **AC-7** Given the pseudo-locale's longer copy at 375 px, when the 404 page renders, then the action labels wrap onto new rows rather than overflow. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/error-page/`: `error-page.ts` (`ErrorPage`), `.html`,
  `.scss` with the `error-page` block under `:host ::ng-deep`.
- Pages in the application: `NotFoundPage`, `ForbiddenPage`, `GonePage`, `TooManyRequestsPage`,
  `ServerErrorPage`, `MaintenancePage`, `OfflinePage`.

## Decisions

- **D-1** *Does the component render the `h1`?* Yes, so every error page has exactly one and the shell
  can focus it after navigation; the title copy arrives through a slot.
