# Drawer

| Field | Value |
|---|---|
| Selector | `ll-drawer` |
| Library path | `frontend/projects/components/src/lib/drawer/` |
| Status | planned |
| Traces to | L2-126, L2-127, L2-129, L2-130, L2-131, L2-132, L2-134 |
| Design system | [`drawer.html`](../../design-system/components/drawer.html) |
| Source mocks | [`dialogs/nav-drawer/default`](../../mocks/dialogs/nav-drawer/default.html), [`dialogs/nav-drawer/signed-in`](../../mocks/dialogs/nav-drawer/signed-in.html), [`dialogs/nav-drawer/staff`](../../mocks/dialogs/nav-drawer/staff.html), [`dialogs/explore-filters/default`](../../mocks/dialogs/explore-filters/default.html) |
| Rendering | [`drawer.html`](drawer.html) |

## Purpose and scope

A drawer is a modal sheet that slides over the page from an edge: the full-height navigation drawer
from the left below LG, and bottom sheets for filters on phones. It has a head with a title and a close
control, then scrolling content. It is the visual frame of a CDK `Dialog`: the application opens its
dialog component with the CDK `Dialog` service, and that component renders `ll-drawer`.

Use the dialog component for centred confirmations and forms, and the popover for small anchored panels.

Out of scope:

- Opening, closing, the focus trap, focus return and Escape: the CDK `Dialog` service.
- The content (navigation groups, filters, buttons): the dialog component that renders the drawer.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `dialogs/nav-drawer/default` (`NavDrawerDialog`, visitor) | left | title "Menu"; close "Close menu"; site navigation; "Create account" primary (`sheet__done`), "Sign in" quiet block | open | raised surface over the backdrop |
| `dialogs/nav-drawer/signed-in` | left | title "Menu"; navigation with Browse, You, Account | open | raised surface |
| `dialogs/nav-drawer/staff` | left | navigation with Browse, You, Staff, Account and count badges | open | raised surface |
| `dialogs/explore-filters/*` (`ExploreFiltersDialog`, below LG) | bottom | title "Filters"; filter groups; "Show 24 results" done button | open, busy | raised surface |

## Anatomy

1. **Sheet** — `div.sheet` with `.sheet--left`, `.sheet--right` or `.sheet--bottom`: the raised surface,
   `--shadow-4`, scrolling content.
2. **Head** — `div.sheet__head`: the title and the close control on one row.
3. **Title** — `h2.sheet__title`; its `id` names the dialog.
4. **Close** — an [icon button](button.md) with the close glyph and the close label.
5. **Content** — projected; a full-width done button takes `.sheet__done`.

Host: `ll-drawer` is `display: contents`; it renders the `div.sheet`. The CDK dialog container around it
carries `role="dialog"`, `aria-modal="true"` and `aria-labelledby` set to the title's id.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `side` | `'left' \| 'right' \| 'bottom'` | `'left'` | no | Adds `.sheet--{side}`. |
| `heading` | `string` | — | yes | The title text, "Menu". |
| `headingId` | `string` | — | yes | The title's `id`; the opener passes the same id as the dialog's `ariaLabelledBy`. |
| `closeLabel` | `string` | — | yes | The close control's accessible name, "Close menu". |

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| `closeRequested` | `void` | The close control is activated; the dialog component closes its `DialogRef`. |

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | navigation, forms, buttons | Rendered after the head, in order. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Left | `.sheet--left` | The navigation drawer: full height, `--layout-aside-width` wide. |
| Right | `.sheet--right` | Detail panels from the trailing edge. |
| Bottom | `.sheet--bottom` | Phone sheets for filters: full width, at most 86 % of the viewport tall. |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Open | the CDK dialog is attached | Sheet over `--color-bg-backdrop`; settles in over `--duration-slow` | "Menu, dialog"; focus moves to the first focusable element |
| Closed | the dialog is closed | Removed | Focus returns to the opener |

## Markup

```html
<!-- rendered inside the CDK dialog container (role="dialog" aria-modal="true" aria-labelledby="drawer-title") -->
<div class="sheet sheet--left">
  <div class="sheet__head">
    <h2 class="sheet__title" id="drawer-title">Menu</h2>
    <button class="icon-btn" type="button" aria-label="Close menu"><svg class="icon" aria-hidden="true">…</svg></button>
  </div>
  <nav class="sidebar-nav" aria-label="Site">…</nav>
  <a class="btn btn--primary sheet__done" href="/register">Create account</a>
</div>
```

```html
<!-- consumer: NavDrawerDialog template -->
<ll-drawer heading="Menu" headingId="drawer-title" closeLabel="Close menu" (closeRequested)="dialogRef.close()">…</ll-drawer>
```

## Design

- Sheet: `--color-bg-surface-raised`, `--shadow-4`, padding `--space-8` top, `--space-6` sides (left
  and right) or `--layout-margin` (bottom), `--space-6` bottom; corners `--radius-xl` on the open edge.
- Left and right: width `min(100%, --layout-aside-width)`, full dynamic viewport height.
- Head gap `--space-4`, margin-bottom `--space-4`; title `--text-h4`; done button margin-top `--space-6`.
- Backdrop `--color-bg-backdrop`; layer `--z-modal` (the CDK overlay container).

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Sheet | `--color-bg-surface-raised` | `--palette-white` | `--palette-night-850` |
| Title | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Backdrop | `--color-bg-backdrop` | ink at 45 % | black at 60 % |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface-raised` | 4.5:1 | Title and content |
| `--color-focus-ring` | `--color-bg-surface-raised` | 3:1 | Focus |

## Responsive behaviour

- The left drawer is used only below LG; the application closes it when the viewport crosses LG
  (`L2-131`). At 320 px it is the full width and its content scrolls; nothing scrolls horizontally.
- The close control and every row inside are at least 44 × 44 CSS px.

## Accessibility

### Role and pattern

APG modal dialog, provided by the CDK `Dialog` container (`role="dialog"`, `aria-modal="true"`,
`aria-labelledby`).

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Cycles within the drawer. |
| <kbd>Escape</kbd> | Closes the drawer; focus returns to the opener. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> on Close | Closes the drawer. |

### Focus

Focus moves into the drawer when it opens and returns to the control that opened it when it closes.

### Labelling

The dialog is named by the title; the close control by `closeLabel`.

### Announcements

The screen reader announces the dialog and its name on open.

### Motion

The settle-in animation is removed under reduced motion.

## Content and internationalisation

- Title and close label arrive translated: "Menu", "Close menu"; "Filters", "Close filters".

## Performance

- `OnPush`; rendered only while open. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given a visitor at 375 px, when they press "Menu", then a dialog named "Menu" opens as a left sheet holding the site navigation, "Create account" and "Sign in". (L2-131)
- **AC-2** Given the open drawer, when it is inspected, then its container has `role="dialog"` and `aria-modal="true"` and its title is an `h2`, so the page keeps one `h1`. (L2-127)

### Keyboard and focus

- **AC-3** Given the drawer has just opened, when the user presses Tab repeatedly, then focus stays inside the drawer. (L2-126)
- **AC-4** Given the open drawer, when the user presses Escape, then it closes and focus returns to "Menu". (L2-131)
- **AC-5** Given the open drawer, when the user activates "Close menu", then it closes and focus returns to "Menu". (L2-131)

### Theming

- **AC-6** Given the dark theme, when the drawer opens, then the sheet, title and backdrop use their dark token values and the content meets 4.5:1. (L2-134)
- **AC-7** Given both themes, when contrast is measured on the sheet, then text meets 4.5:1 and the focus ring 3:1. (L2-129)

### Responsive

- **AC-8** Given a viewport of 320 px, when the drawer is open, then it fits the width and nothing scrolls horizontally. (L2-130)
- **AC-9** Given a viewport of 375 px, when the close control is measured, then it is at least 44 × 44 CSS px. (L2-132)

### Motion

- **AC-10** Given reduced motion, when the drawer opens, then it appears without animation. (L2-129)

## Implementation notes

- Folder `frontend/projects/components/src/lib/drawer/`: `drawer.ts` (`Drawer`), `drawer-side.ts`
  (`DrawerSide`), `.html`, `.scss` with the `drawer` block under `:host ::ng-deep`. Composes
  `IconButton`.
- The opener uses `Dialog.open(Component, { ariaLabelledBy, panelClass: 'll-drawer-panel--left',
  backdropClass: 'll-backdrop' })`; the global overlay styles (backdrop colour, pane position) live in
  the components library's foundations because the overlay container sits outside every component.

## Decisions

- **D-1** *`h1` (mock) or `h2` for the drawer title?* `h2`: the page behind keeps its `h1` in the
  accessibility tree order of the document, and `L2-127` AC1 asks for one `h1` per page.
- **D-2** *`<dialog>` element (mock) or CDK `Dialog`?* The CDK `Dialog`, as `AGENTS.md` and the detailed
  design require; the rendered sheet keeps the mock's `.sheet` classes.
