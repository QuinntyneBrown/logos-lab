# Skeleton

| Field | Value |
|---|---|
| Selector | `span[llSkeleton]`, `ll-skeleton-card` |
| Library path | `frontend/projects/components/src/lib/skeleton/` |
| Status | built |
| Traces to | L2-120, L2-127, L2-129, L2-134 |
| Design system | [`skeleton.html`](../../design-system/components/skeleton.html) |
| Source mocks | [`pages/home/loading`](../../mocks/pages/home/loading.html), [`pages/explore/loading`](../../mocks/pages/explore/loading.html), [`pages/course-overview/loading`](../../mocks/pages/course-overview/loading.html), [`pages/admin-users/loading`](../../mocks/pages/admin-users/loading.html), [`pages/dashboard/loading`](../../mocks/pages/dashboard/loading.html), [`pages/following/loading`](../../mocks/pages/following/loading.html) |
| Rendering | [`skeleton.html`](skeleton.html) |

## Purpose and scope

Skeletons hold the shape of content that is still loading — titles, lines, photos, covers, pills — so
the page does not jump when it arrives. They breathe gently, and they are hidden from assistive
technology: the region they fill announces "Loading …" once through a status message instead. The
skeleton card stands in for a content card in a grid.

Out of scope:

- The loading region's `aria-busy` and its status message: the page or the component whose loading
  state it is (for example the [event row](event-row.md) and [person](person-list.md) rows).
- Spinners for actions: the [button](button.md)'s busy state.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/home/loading` Featured and Latest | 4 skeleton cards each: block, short text, title, text | — | loading | canvas |
| `pages/home/loading` events and experts | photo, title, short text inside rows | — | loading | canvas |
| catalogue, topic, search, directory loading | skeleton cards; photos | — | loading | canvas |
| item pages loading (course, article, event, certificate) | title, text lines, block, pills | — | loading | canvas |
| admin and studio tables loading | text and short text in cells; circles for avatars | — | loading | surface |

## Anatomy

1. **Skeleton** — `span.skeleton` with one shape modifier: `--title`, `--text` (+ `.is-short`),
   `--photo`, `--circle`, `--block`, `--pill`.
2. **Skeleton card** — `div.skeleton-card` holding a block, a short line, a title and a line.

Host: `span[llSkeleton]` is the consumer's span; `ll-skeleton-card` is `display: contents` and renders the
card, `aria-hidden="true"`.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `shape` (`llSkeleton`) | `'title' \| 'text' \| 'text-short' \| 'photo' \| 'circle' \| 'block' \| 'pill'` | `'text'` | no | Adds `.skeleton--{shape}`; `text-short` adds `.skeleton--text.is-short`. |

The skeleton sets `aria-hidden="true"` on itself.

### Outputs

None.

### Content slots

None.

## Variants and sizes

| Variant | Modifier | Size |
|---|---|---|
| Title | `.skeleton--title` | `--space-8` tall, 55 % wide |
| Text | `.skeleton--text` | `--size-skeleton-line` tall, full width (`.is-short` 60 %) |
| Photo | `.skeleton--photo` | `--space-16` square |
| Circle | `.skeleton--circle` | `--space-12` round |
| Block | `.skeleton--block` | `--space-32` tall |
| Pill | `.skeleton--pill` | `--size-pill` by `--space-20` |
| Card | `.skeleton-card` | a content card's footprint |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Loading | rendered | `--color-bg-subtle` shape breathing with `shimmer` | Hidden |

## Markup

```html
<!-- rendered -->
<div class="content-grid" aria-busy="true">
  <p class="vh" role="status">Loading featured content…</p>
  <div class="skeleton-card" aria-hidden="true"><span class="skeleton skeleton--block"></span><span class="skeleton skeleton--text is-short"></span><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text"></span></div>
</div>
```

```html
<!-- consumer -->
<div class="content-grid" aria-busy="true"><p class="vh" role="status" i18n>Loading featured content…</p><ll-skeleton-card /></div>
```

## Design

- Shapes `--color-bg-subtle`, `--radius-sm` (photo `--radius-md`, block `--radius-lg`, circle and pill
  `--radius-full`); text lines spaced `--space-3`.
- Card: gap `--space-4`, padding `--space-6`, `--radius-lg`, surface and hairline as a content card.
- Breathing: `shimmer` over `--duration-breath` with `--ease-breath`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Shape | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |
| Card | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-bg-subtle` | `--color-bg-surface` | 1:1 | Decorative; no text, no contrast requirement |
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | The page's text around skeletons |

## Responsive behaviour

- Shapes fill their containers; cards follow the content grid, so the loading layout matches the loaded
  one at every breakpoint.

## Accessibility

### Role and pattern

Decorative; `aria-hidden="true"`. The surrounding region carries `aria-busy="true"` and a polite status
message.

### Keyboard

| Key | Action |
|---|---|
| — | Nothing focusable. |

### Focus

None.

### Labelling

None.

### Announcements

The consumer's `role="status"` message ("Loading featured content…").

### Motion

The breathing stops under reduced motion; shapes stay still.

## Content and internationalisation

- No text of its own; the status message is the consumer's, translated.

## Performance

- `OnPush`; pure CSS. Skeletons reserve the loaded content's size so its arrival causes no layout shift
  (`L2-120`).

## Acceptance criteria

### Rendering

- **AC-1** Given the home page while its sections load, when Featured renders, then it shows four skeleton cards in a region with `aria-busy="true"` and the status message "Loading featured content…". (L2-127)
- **AC-2** Given skeletons, when they are inspected, then they are hidden from assistive technology. (L2-127)

### Performance

- **AC-3** Given the home page, when its sections replace the skeletons, then the cumulative layout shift stays within 0.1. (L2-120)

### Theming

- **AC-4** Given the dark theme, when skeletons render, then they use the dark subtle surface. (L2-134)

### Motion

- **AC-5** Given reduced motion, when skeletons render, then they do not animate. (L2-129)

## Implementation notes

- Folder `frontend/projects/components/src/lib/skeleton/`: `skeleton.ts` (`Skeleton`), `skeleton-shape.ts`,
  `skeleton-card.ts` (`SkeletonCard`), each with `.html` and `.scss` from the `skeleton` block.

## Decisions

- **D-1** *Do skeletons announce anything?* No; one status message per loading region does, so a screen
  reader hears "Loading featured content…" once instead of every shape.
