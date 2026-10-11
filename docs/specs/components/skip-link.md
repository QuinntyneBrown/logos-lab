# Skip link

| Field | Value |
|---|---|
| Selector | `ll-skip-link` |
| Library path | `frontend/projects/components/src/lib/skip-link/` |
| Status | planned |
| Traces to | L2-126, L2-129, L2-134, L2-147 |
| Design system | [`skip-link.html`](../../design-system/components/skip-link.html) |
| Source mocks | every page, for example [`pages/home/default`](../../mocks/pages/home/default.html) and [`pages/sign-in/default`](../../mocks/pages/sign-in/default.html) |
| Rendering | [`skip-link.html`](skip-link.html) |

## Purpose and scope

The skip link is the first focusable element on every page. It stays hidden until it receives keyboard
focus, then appears at the top left as an inverse pill, and moves focus to the page's `main` element
so a keyboard or screen-reader user can pass the top bar in one step.

Out of scope:

- The `main` element and its `id`: the application shell renders `<main id="main" tabindex="-1">`.
- Moving focus to the page heading after a route change: the shell does that (`L2-126`).

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| every page, first child of `body` (application shell) | target `main` | label "Skip to main content" | hidden, focus | canvas, over the top bar |
| every dialog mock's page behind | same, inside an `inert` page | same | hidden | canvas |

## Anatomy

1. **Link** — `a.skip-link`. An inverse pill positioned at the top left, translated out of view and
   clipped until focused.

Host: `ll-skip-link` is `display: contents`; it renders one `<a class="skip-link">`.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `target` | `string` | `'main'` | no | The `id` of the element that receives focus; the link's `href` is `#` + target. |

### Outputs

None. Activation moves focus itself; the page needs no notification.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | text | The translated label, "Skip to main content". |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Default | — | The only variant. |

One size: padding `--space-3` `--space-5`, type `--text-label`; the width follows the label.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Hidden | not focused | Translated up by 200 % and clipped with `clip-path: inset(50%)` | Still in the tab order and the accessibility tree |
| Focus | `:focus` | Slides to `--space-4` from the top and left, inverse colours, focus ring | Announced as "Skip to main content, link" |
| Hover | `:hover` while focused | Keeps `--color-fg-inverse` | — |

## Markup

```html
<!-- rendered -->
<a class="skip-link" href="#main">Skip to main content</a>
```

```html
<!-- consumer: the application shell -->
<ll-skip-link i18n>Skip to main content</ll-skip-link>
```

## Design

- Position `absolute`, `--space-4` from the top and left, layer `--z-tooltip` so it sits above the
  sticky top bar and banners.
- Padding `--space-3` `--space-5`, `--radius-full`, `--text-label`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Fill | `--color-bg-inverse` | `--palette-ink-900` | `--palette-night-50` |
| Label | `--color-fg-inverse` | `--palette-birch-50` | `--palette-night-950` |
| Focus ring | `--color-focus-ring` | `--palette-accent-700` | `--palette-accent-300` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-inverse` | `--color-bg-inverse` | 4.5:1 | Label |
| `--color-focus-ring` | `--color-bg-canvas` | 3:1 | Focus indicator |

## Responsive behaviour

- The same at every breakpoint. The label wraps if a translation is longer than the viewport allows.
- At 320 px nothing scrolls horizontally or clips; the focused pill is at least 44 px tall.

## Accessibility

### Role and pattern

A native `<a href="#main">`; the WebAIM skip-navigation pattern.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> (first press on a page) | Focuses and reveals the skip link. |
| <kbd>Enter</kbd> | Moves focus to `#main` and scrolls it into view. |

### Focus

Activation focuses the target (`main` carries `tabindex="-1"`), so the next Tab continues from the start
of the main content. The URL fragment is not left behind in the single-page router.

### Labelling

The visible label is the accessible name.

### Announcements

None.

### Motion

The slide-in is instant under reduced motion.

## Content and internationalisation

- Label: "Skip to main content", marked for translation in the consumer. French runs longer; the pill
  grows and wraps.

## Performance

- Change detection: `OnPush`; one signal input.
- Measured through the page budgets of `L2-120` and `L2-123` (no perf-test project; see the button CRD,
  D-3).
- Layout stability: absolutely positioned, so it never shifts the page.

## Acceptance criteria

### Rendering

- **AC-1** Given any page, when a keyboard user presses Tab once from the top, then the focused element is the link "Skip to main content" and it is visible. (L2-126)
- **AC-2** Given the focused skip link, when the user presses Enter, then focus moves to the `main` element and the next Tab focuses the first focusable element inside it. (L2-126)

### States

- **AC-3** Given the skip link is not focused, when the page is viewed, then the link is not visible and takes no space in the layout. (L2-126)

### Keyboard and focus

- **AC-4** Given the focused skip link, when it is measured, then its focus ring is at least 2 CSS px thick with at least 3:1 contrast and is not covered by the top bar. (L2-126)

### Screen readers

- **AC-5** Given the en-CA build, when the page renders, then the label comes from the translation catalogue with the message "Skip to main content". (L2-147)

### Theming

- **AC-6** Given the dark theme, when the skip link is focused, then its label and fill come from the inverse tokens and meet 4.5:1. (L2-134)

### Responsive

The skip link's layout does not change across breakpoints; AC-1 holds at 375 px and 1440 px.

### Motion

- **AC-7** Given reduced motion, when the skip link receives focus, then it appears without a transition. (L2-129)

### Performance

Covered by the page budgets; no component-specific criterion.

## Implementation notes

- Folder `frontend/projects/components/src/lib/skip-link/`: `skip-link.ts` (`SkipLink`), `.html`,
  `.scss` with the `skip-link` block.
- The click handler prevents the router from treating `#main` as navigation, focuses the target and
  calls `scrollIntoView`.

## Decisions

- **D-1** *"Skip to content" (mocks) or "Skip to main content" (`L2-126` AC1)?* "Skip to main
  content". The requirement names the label exactly; the mocks' shorter copy predates it. The mocks
  keep their copy as a design reference.
- **D-2** *Does the target need `tabindex="-1"`?* Yes, on `main`, so focus moves reliably in every
  browser; the shell owns it.
