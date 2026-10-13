# Empty state

| Field | Value |
|---|---|
| Selector | `ll-empty-state` |
| Library path | `frontend/projects/components/src/lib/empty-state/` |
| Status | built |
| Traces to | L2-001, L2-003, L2-127, L2-129, L2-130, L2-134, L2-141, L2-150 |
| Design system | [`empty-state.html`](../../design-system/components/empty-state.html) |
| Source mocks | [`pages/home/empty`](../../mocks/pages/home/empty.html), [`pages/home/partial`](../../mocks/pages/home/partial.html), [`pages/home/error`](../../mocks/pages/home/error.html), [`pages/my-learning/empty`](../../mocks/pages/my-learning/empty.html), [`pages/search-results/no-results`](../../mocks/pages/search-results/no-results.html), [`pages/admin-users/error`](../../mocks/pages/admin-users/error.html), [`dialogs/notification-centre/empty`](../../mocks/dialogs/notification-centre/empty.html) |
| Rendering | [`empty-state.html`](empty-state.html) |

## Purpose and scope

An empty state fills a region that has nothing to show — no events scheduled, nothing in progress, no
search results — or whose content failed to load. It says what happened in plain words, why it is
fine (or what to do), and offers the next step. A dashed frame marks it as a placeholder, not content.

Use the error page for a whole page that failed and an alert for an inline warning above content.

Out of scope:

- Deciding when a region is empty or failed: the page.
- Retrying: the page handles its "Try again" action.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/home/empty` events | default, calendar icon, `h3` | "No events are scheduled right now"; "New talks and workshops appear here…"; quiet "Watch past event recordings" | empty | canvas |
| `pages/home/partial` events | error, compact, no icon, `h3` | "Events didn't load"; "Everything else on this page is up to date…"; quiet sm "Try again" | failed | canvas |
| `pages/home/error` | error, attention icon, `h2` | "We couldn't load what's new"; "This is on our side. Search and the catalogue still work…"; primary "Try again" | failed | canvas |
| `pages/my-learning/empty`, `pages/saved/empty`, `pages/following/empty` | default, course or bookmark icon | "Nothing in progress yet"; primary "Browse the catalogue" | empty | canvas |
| `pages/search-results/no-results` | default, search icon, `h2` | "Nothing matches “transhumanist liturgy”"; "Try fewer or different words…"; `[slot=suggestions]` the five popular topics as link chips; quiet "Browse the catalogue" | no results | canvas |
| admin, studio and moderation lists | default or error, with icons | "No reports waiting", "We couldn't load the users" | empty, failed | surface |
| dialogs (`dialogs/notification-centre/empty`, `dialogs/item-picker/*`) | compact | "You're all caught up" | empty | dialog surface |

## Anatomy

1. **Container** — `div.empty` (+ `.empty--error`, + `.empty--compact`): centred grid, dashed
   `--color-border-strong` frame, `--radius-lg`.
2. **Icon (optional)** — `span.empty__icon` holding an [icon](icon.md) on the accent (or danger) tile.
3. **Title** — `h2.empty__title` or `h3.empty__title`.
4. **Text** — `p`, muted, short measure.
5. **Actions** — `div.empty__actions`, centred, wrapping.

Host: `ll-empty-state` is `display: contents`; it renders the `div.empty`.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `heading` | `string` | — | yes | The title. |
| `headingLevel` | `2 \| 3` | `3` | no | Fits the page outline. |
| `icon` | `IconName \| null` | `null` | no | Renders `.empty__icon` with the icon. |
| `tone` | `'default' \| 'error'` | `'default'` | no | `error` adds `.empty--error`. |
| `compact` | `boolean` | `false` | no | Adds `.empty--compact`. |

### Outputs

None.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | text | The explanation, rendered in a `p`. |
| `[slot=suggestions]` | a `ul[llChips]` | Rendered after the explanation and before the actions: topics to try instead of the search that found nothing. The page owns the list and its label. |
| `[slot=actions]` | buttons and links | Rendered in `.empty__actions`; omitted when empty. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Empty | — | Nothing to show yet. |
| Error | `.empty--error` | A region that failed to load. |
| Compact | `.empty--compact` | Inside a column, card or dialog. |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Empty | `tone="default"` | Accent icon tile | Heading and text read in order |
| Error | `tone="error"` | Danger icon tile | Same; the page announces the failure through its status region |

## Markup

```html
<!-- rendered -->
<div class="empty">
  <span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">…</svg></span>
  <h3 class="empty__title">No events are scheduled right now</h3>
  <p>New talks and workshops appear here as soon as they're announced. Meanwhile, past events are worth watching.</p>
  <div class="empty__actions"><a class="btn btn--quiet" href="/events?when=past">Watch past event recordings</a></div>
</div>
```

```html
<!-- consumer -->
<ll-empty-state heading="No events are scheduled right now" icon="calendar">New talks…<a llButton variant="quiet" slot="actions" routerLink="/events" [queryParams]="{ when: 'past' }">Watch past event recordings</a></ll-empty-state>
```

## Design

- Gap `--space-4`; padding `--space-16` `--space-6` (compact `--space-6`); dashed hairline
  `--color-border-strong`; `--radius-lg`.
- Icon tile `--size-empty-icon`, glyph `--size-empty-glyph`, `--radius-md`.
- Title `--text-h3`; text muted, max width `--layout-measure-short`; actions gap `--space-3`, margin-top
  `--space-2`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Frame | `--color-border-strong` | `--palette-stone-500` | `--palette-night-500` |
| Icon tile | `--color-accent-subtle` / `--color-fg-accent` | accent subtle / `--palette-accent-700` | accent subtle / `--palette-accent-300` |
| Error tile | `--color-danger-bg` / `--color-danger-icon` | danger roles | danger roles |
| Text | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | Title |
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Text |
| `--color-fg-accent` | `--color-accent-subtle` | 3:1 | Icon |
| `--color-danger-icon` | `--color-danger-bg` | 3:1 | Error icon |

## Responsive behaviour

- Centred single column at every width; actions wrap; at 320 px nothing scrolls horizontally.

## Accessibility

### Role and pattern

Plain content: a heading, a paragraph and controls.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | The actions in order. |

### Focus

Owned by the actions.

### Labelling

The icon is decorative; the heading says what happened.

### Announcements

None by the component.

### Motion

None.

## Content and internationalisation

- Plain words, no blame, one next step. All copy arrives translated.

## Performance

- `OnPush`; static. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given no upcoming events, when the home page renders, then the events section shows "No events are scheduled right now" with the action "Watch past event recordings" linking to past events. (L2-001)
- **AC-2** Given the events section failed on its own, when the home page renders, then it shows the compact error "Events didn't load" with "Try again", and the other sections render normally. (L2-141)
- **AC-3** Given the whole home request failed, when the page renders, then "We couldn't load what's new" replaces the sections with "Try again", and the hero's search and catalogue link still work. (L2-141)
- **AC-4** Given an empty state, when it is inspected, then its icon is hidden from assistive technology and its title is a heading at the requested level. (L2-127)

### Theming

- **AC-9** Given a search for "transhumanist liturgy" that matches nothing, when the results page renders, then "Nothing matches “transhumanist liturgy”" is the title, the list "Popular topics" of five link chips sits between the explanation and "Browse the catalogue". (L2-003)
- **AC-5** Given the dark theme, when empty and error states render, then frame, tile and text use dark token values. (L2-134)
- **AC-6** Given both themes, when contrast is measured, then title and text meet 4.5:1 and the icon 3:1 on its tile. (L2-129)

### Responsive

- **AC-7** Given a viewport of 320 px, when an empty state renders, then it fits without horizontal scrolling. (L2-130)
- **AC-8** Given the pseudo-locale's longer copy at 375 px, when an empty state renders, then its actions wrap rather than overflow. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/empty-state/`: `empty-state.ts` (`EmptyState`), `.html`,
  `.scss` with the `empty-state` block under `:host ::ng-deep`. Composes `Icon`.

## Decisions

- **D-1** *Is the icon optional?* Yes; the compact partial error in the mocks has none.
- **D-2** *How does an empty state offer other places to go?* Through a `[slot=suggestions]` between the
  text and the actions, because the search results mock puts its popular-topic chips there and a list
  cannot live inside the explanation's `p`.
