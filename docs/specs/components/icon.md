# Icon

| Field | Value |
|---|---|
| Selector | `svg[llIcon]` |
| Library path | `frontend/projects/components/src/lib/icon/` |
| Status | planned |
| Traces to | L2-127, L2-129, L2-134 |
| Design system | [`iconography.html`](../../design-system/foundations/iconography.html) |
| Source mocks | every page; for example [`pages/home/default`](../../mocks/pages/home/default.html), [`dialogs/account-menu/default`](../../mocks/dialogs/account-menu/default.html), [`pages/lesson-player/default`](../../mocks/pages/lesson-player/default.html), [`pages/studio-editor/default`](../../mocks/pages/studio-editor/default.html) |
| Rendering | [`icon.html`](icon.html) |

## Purpose and scope

The icon set is the product's line drawings on a 24-unit grid: 1.5 stroke, round caps and joins, no
fill, drawn in `currentColor`. The component inlines one named icon into the `svg` it sits on, so the
markup is the same as the mocks' inline SVG and the consumer's classes and encapsulated styles still
reach it. Every icon in the mocks has a name; new icons are drawn in the same hand and added to the
set.

Out of scope:

- The brand mark (the [brand](brand.md)) and illustrations such as content-card glyphs drawn at other
  sizes: they keep their own SVG.
- Naming a control that shows only an icon: the control's `aria-label`.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| top bar, search pill, dialogs | `search`, `close`, `menu`, `bell`, `moon`, `sun` | — | inherits the control's colour | every surface |
| menus (`dialogs/account-menu/*`, `dialogs/theme-menu/*`) | `check` with `menu__check`, `monitor`, `course`, `bookmark`, `message`, `edit`, `sign-out`, `shield`, `flag`, `people` | — | checked, unchecked | raised surface |
| buttons with arrows, back links | `arrow-right` with `btn__arrow`, `arrow-left`, `arrow-up`, `arrow-down`, `chevron-down` | — | hover nudge (button) | every surface |
| course outline, lesson player | `lock`, `done`, `circle`, `article`, `video`, `module`, `message`, `play`, `pause`, `captions`, `sliders`, `fullscreen` | — | — | surface, player |
| events and profiles | `calendar`, `clock`, `place`, `monitor`, `people` | — | — | surface |
| alerts and inline status | `attention`, `warning`, `check`, `offline` | — | tone colours | tinted surfaces |
| studio and admin | `edit`, `trash`, `grip`, `more`, `upload`, `download`, `image`, `document`, `collection`, `mail` | — | — | surface |

## Anatomy

1. **SVG** — `svg.icon` with `viewBox="0 0 24 24"` and `aria-hidden="true"`; the host element.
2. **Shapes** — `path`, `circle` and `rect` children inlined from the set.

Host: the consumer's own `<svg llIcon name="…">`; the component adds the class, `viewBox` and
`aria-hidden`, and renders the shapes inside.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `name` | `IconName` | — | yes | One of the 47 names: `arrow-down`, `arrow-left`, `arrow-right`, `arrow-up`, `article`, `attention`, `bell`, `bookmark`, `calendar`, `captions`, `check`, `chevron-down`, `circle`, `clock`, `close`, `collection`, `course`, `document`, `done`, `download`, `edit`, `flag`, `fullscreen`, `grip`, `image`, `lock`, `mail`, `menu`, `message`, `module`, `monitor`, `moon`, `more`, `offline`, `pause`, `people`, `place`, `play`, `search`, `shield`, `sign-out`, `sliders`, `sun`, `trash`, `upload`, `video`, `warning`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | no | `sm` adds `.icon--sm` (16 px), `lg` adds `.icon--lg` (24 px); md is 20 px. |

### Outputs

None.

### Content slots

None.

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Line icon | `.icon` | Every icon. |

| Size | Modifier | Height | Padding | Type |
|---|---|---|---|---|
| sm | `.icon--sm` | `--space-4` | — | — |
| md | — | `--space-5` | — | — |
| lg | `.icon--lg` | `--space-6` | — | — |

## States

The icon has no states; it takes the colour of the text around it, so its control's states colour it.

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | `currentColor` stroke | Hidden |

## Markup

```html
<!-- rendered -->
<svg class="icon icon--sm menu__check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>
```

```html
<!-- consumer -->
<svg llIcon name="check" size="sm" class="menu__check"></svg>
```

## Design

- Stroke 1.5, round caps and joins, no fill (the `.icon` foundation class); 2 px optical padding inside
  the 24-unit box.
- Sizes from `--space-4`, `--space-5` and `--space-6`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Stroke | `currentColor` of the parent, typically `--color-fg-muted` or `--color-fg-default` | `--palette-stone-700` | `--palette-night-200` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-muted` | `--color-bg-canvas` | 3:1 | Icons in controls |
| `--color-fg-subtle` | `--color-bg-surface` | 3:1 | Icons in fields |

## Responsive behaviour

- Icons keep their size at every breakpoint; the control around them supplies the 44 px target.

## Accessibility

### Role and pattern

Decorative: `aria-hidden="true"` always. Meaning comes from visible text or the control's name.

### Keyboard

| Key | Action |
|---|---|
| — | Icons are never focusable. |

### Focus

Never focusable.

### Labelling

None on the icon; one meaning per icon across the product.

### Announcements

None.

### Motion

None of its own.

## Content and internationalisation

- No text. Direction-sensitive icons (`arrow-left`, `arrow-right`) are chosen by meaning by the
  consumer.

## Performance

- `OnPush`; shapes come from a constant map, no request. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given the account menu's "Dashboard" item, when its icon renders, then it is an `svg.icon` with `viewBox="0 0 24 24"`, `aria-hidden="true"` and the monitor shapes, and the item's accessible name is "Dashboard". (L2-127)
- **AC-2** Given a checked theme option, when its check icon renders with the consumer's `menu__check` class, then the class is kept on the `svg`. (L2-127)

### Theming

- **AC-3** Given the dark theme, when icons render in the top bar, then they draw in the dark value of their parent's text colour. (L2-134)
- **AC-4** Given both themes, when icon contrast is measured in the top bar, then it is at least 3:1 against the canvas. (L2-129)

## Implementation notes

- Folder `frontend/projects/components/src/lib/icon/`: `icon.ts` (`Icon`), `icon-name.ts` (`IconName`),
  `icon-shape.ts` (`IconShape`), `icons.ts` (the constant map, generated from the mocks), `.html`,
  `.scss` (empty: the `.icon` foundation styles it).

## Decisions

- **D-1** *Inline SVG or an icon component?* Both: the foundation asks for inline SVG, and the component
  inlines it into the consumer's own `svg`, so the DOM matches the mocks while data-driven components
  (menus, outlines) can name icons.
- **D-2** *Two "done" ticks?* Yes: `check` (`m5 12.5…`) marks a chosen option and a saved state, `done`
  (`m4.5 12.5…`) marks completed lessons and success, as the mocks use them.
