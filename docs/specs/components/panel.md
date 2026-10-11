# Panel

| Field | Value |
|---|---|
| Selector | `ll-panel` |
| Library path | `frontend/projects/components/src/lib/panel/` |
| Status | planned |
| Traces to | L2-001, L2-127, L2-129, L2-130, L2-134, L2-150 |
| Design system | [`panel.html`](../../design-system/components/panel.html) |
| Source mocks | [`pages/home/default`](../../mocks/pages/home/default.html), [`pages/home/signed-in`](../../mocks/pages/home/signed-in.html), [`pages/dashboard/default`](../../mocks/pages/dashboard/default.html), [`pages/course-complete/default`](../../mocks/pages/course-complete/default.html), [`pages/studio/default`](../../mocks/pages/studio/default.html) |
| Rendering | [`panel.html`](panel.html) |

## Purpose and scope

The grain panel is a warm, softly textured block that sets one invitation apart from the page: "Start
with twelve short pieces" for a visitor, "Continue learning" for a member, the certificate moment after
a course, the studio's welcome. A text column (eyebrow, title, text, actions) sits beside an optional
list of small item tiles.

Out of scope:

- The content of the text column and the list: the page projects them.
- Progress inside the panel: the [progress bar](progress-bar.md).

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/home/*` (visitor) | default, grain | eyebrow "New to Logos Lab"; `h2` "Start with twelve short pieces"; text; "Open the collection"; list of 3 numbered items with photos | default, long title | canvas |
| `pages/home/signed-in` | compact, grain | "Continue learning"; `h2` "Representing, not resembling"; text; progress; "Continue the lesson"; list "Also in progress" of 2 items | default | canvas |
| `pages/dashboard/*` | compact, grain or plain | continue learning, no list | default, empty | canvas |
| `pages/course-complete/*` | default, grain | certificate message and actions | default | canvas |
| `pages/studio/*`, notifications | compact, grain | welcome and next steps | default | canvas |

## Anatomy

1. **Panel** — `div.panel` (+ `.panel--compact`, + `.grain`): `--color-bg-panel`, `--radius-xl`; the grain
   texture is a masked `::before` layer.
2. **Grid** — `div.panel__grid`: one column, two from LG.
3. **Text column** — projected: `p.eyebrow`, `h2.panel__title`, `p.panel__text`, `p.panel__note`,
   `div.panel__actions`.
4. **List (optional)** — projected `ul.panel__list` of `li.panel__item`: a 40 px image or mark, a
   paragraph with `strong` title and `span.panel__meta`, and an optional trailing meta.

Host: `ll-panel` is `display: contents`; it renders the panel and grid and projects both columns.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `compact` | `boolean` | `false` | no | Adds `.panel--compact`. |
| `grain` | `boolean` | `true` | no | Adds `.grain`. |

### Outputs

None.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | the text column's elements | Rendered in the first grid cell, wrapped in a `div`. |
| `[slot=list]` | a `ul.panel__list` | Rendered as the second grid cell; omitted when empty. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Default | — | A page's one invitation. |
| Compact | `.panel--compact` | Continue learning, studio welcome. |
| Plain | no `.grain` | When texture would compete (dashboard empty state). |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Panel surface with grain | Content read in order |
| Item hover | `:hover` on `.panel__item` | Lifts by `--lift` with `--shadow-2` | — |

## Markup

```html
<!-- rendered -->
<div class="panel grain">
  <div class="panel__grid">
    <div>
      <p class="eyebrow">New to Logos Lab</p>
      <h2 class="panel__title" id="start-title">Start with twelve short pieces</h2>
      <p class="panel__text">Start Here: Faith and AI walks through the questions people ask first, in about three hours, at your own pace.</p>
      <div class="panel__actions"><a class="btn btn--primary" href="/collections/start-here-faith-and-ai">Open the collection</a></div>
    </div>
    <ul class="panel__list">
      <li class="panel__item"><img src="…" alt=""><p><strong>Inside a Neural Network in Ten Minutes</strong><span class="panel__meta">Video · 10:12</span></p><span class="panel__meta">1</span></li>
    </ul>
  </div>
</div>
```

```html
<!-- consumer -->
<ll-panel><p class="eyebrow" i18n>New to Logos Lab</p>…<ul class="panel__list" slot="list">…</ul></ll-panel>
```

## Design

- Padding `--space-12` `--space-6` (compact `--space-8` `--space-6`); from LG `--space-20` `--space-16`
  (compact `--space-10`). Grid gap `--space-10`, from LG `--space-20` with columns 1.2fr / 1fr.
- Title `--text-h2`, max width `--layout-measure-title`; text margin `--space-5`, max width
  `--layout-measure-short`; actions margin `--space-8`, gap `--space-4`.
- Items: padding `--space-3` `--space-4`, `--radius-md`, `--color-bg-surface`, `--shadow-1`; image
  `--space-10` square.
- Grain: `--color-grain` at `--grain-opacity`, tile `--grain-tile-width` by `--grain-tile-height`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Panel | `--color-bg-panel` | panel role | panel role |
| Grain | `--color-grain` | grain role | grain role |
| Text | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Item | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-panel` | 4.5:1 | Title |
| `--color-fg-muted` | `--color-bg-panel` | 4.5:1 | Text |

## Responsive behaviour

- One column below LG (text, then list); two from LG. A long title wraps; at 320 px nothing scrolls
  horizontally.

## Accessibility

### Role and pattern

Plain content; the page wraps the panel in a `section` labelled by its title.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Moves through projected links and buttons. |

### Focus

Owned by projected controls.

### Labelling

The list may carry an `aria-label` ("Also in progress"); item images are decorative (`alt=""`).

### Announcements

None.

### Motion

The item lift is removed under reduced motion.

## Content and internationalisation

- All copy is projected and translated by the page.

## Performance

- `OnPush`; the grain is a CSS mask, no image request. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given a visitor on the home page, when the start panel renders, then it shows "Start with twelve short pieces", the action "Open the collection" and three numbered items. (L2-001)
- **AC-2** Given the start panel, when it is inspected, then its title is an `h2` that labels its section and its item images have empty `alt`. (L2-127)

### Theming

- **AC-3** Given the dark theme, when the panel renders, then its surface, grain and text use dark token values. (L2-134)
- **AC-4** Given both themes, when contrast is measured, then title and text meet 4.5:1 on the panel. (L2-129)

### Responsive

- **AC-5** Given a viewport of 320 px, when the panel renders, then it is one column and nothing scrolls horizontally. (L2-130)
- **AC-6** Given the long title "Start with twelve short pieces on faith, technology and the questions people ask first", when the panel renders at 375 px, then the title wraps and is not clipped. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/panel/`: `panel.ts` (`Panel`), `.html`, `.scss` with the
  `panel` block under `:host ::ng-deep`.

## Decisions

- **D-1** *Is the grain on by default?* Yes; every panel in the mocks but one carries it.
