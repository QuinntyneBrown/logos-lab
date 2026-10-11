# Top bar

| Field | Value |
|---|---|
| Selector | `ll-top-bar` |
| Library path | `frontend/projects/components/src/lib/top-bar/` |
| Status | built |
| Traces to | L2-126, L2-127, L2-129, L2-130, L2-131, L2-132, L2-134, L2-150 |
| Design system | [`top-bar.html`](../../design-system/components/top-bar.html) |
| Source mocks | [`pages/home/default`](../../mocks/pages/home/default.html), [`pages/home/signed-in`](../../mocks/pages/home/signed-in.html), [`pages/admin/default`](../../mocks/pages/admin/default.html), [`pages/studio/default`](../../mocks/pages/studio/default.html), [`pages/sign-in/default`](../../mocks/pages/sign-in/default.html), [`dialogs/nav-drawer/default`](../../mocks/dialogs/nav-drawer/default.html) |
| Rendering | [`top-bar.html`](top-bar.html) |

## Purpose and scope

The top bar is the header of every page: the brand that links home, the primary destinations, and the
person's actions (search, theme, notifications, account, or "Sign in" and "Create account"). It sits
on the page canvas with one hairline beneath. From LG (64rem) the destinations sit inline; below LG
they fold behind a "Menu" button that asks the application to open the navigation drawer.

Out of scope:

- The navigation drawer itself: `NavDrawerDialog` in the application, styled by the drawer component,
  opened with the CDK `Dialog` service (detailed design *Navigate globally*).
- The search suggestions dialog, theme menu and account menu that the action buttons open.
- Deciding which actions a person sees (visitor, member, staff): the application shell projects them.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| public and learner pages (`pages/home/*`, `pages/explore/*`, `pages/course-overview/*`, …) visitor | compact brand, nav "Primary" with Explore, Courses, Events, Experts, Collections; Menu | actions: wide search, search icon button, theme icon button, "Sign in", "Create account" | default, current link, Menu expanded | canvas |
| same pages, member (`pages/home/signed-in`, `pages/dashboard/*`) | same nav | actions: wide search, search icon button, notifications icon button with count, avatar button | default, current link | canvas |
| admin and moderation (`pages/admin/*`, `pages/moderation-queue/*`) | nav "Primary" | actions: search, notifications, avatar | default | canvas |
| studio (`pages/studio/*`, `pages/studio-editor/*`) | nav "Studio" with Studio, Review queue (editors), Cohorts, Analytics, Your profile | actions: notifications, avatar | current link | canvas |
| focused flows (`pages/sign-in/*`, `pages/register/*`, `pages/report-change/*`, `pages/sign-in-verify/*`) | minimal: full brand, no nav, no Menu | actions: one text link, "Sign in" or "Create account" | default | canvas |
| dialog mocks' pages behind (`dialogs/*`) | minimal with an avatar or notifications | actions: avatar | default | canvas, inert |

## Anatomy

1. **Bar** — `header.header` around `div.wrap.header__inner`: `--layout-topbar-height` tall, a
   `--border-width-hairline` bottom border in `--color-border-default`.
2. **Brand** — the [brand](brand.md) lockup, compact in product pages, full in minimal bars.
3. **Primary navigation** — `nav.nav[popover]` with `ul.nav__list` of `a.nav__link`. Visible inline from
   LG; hidden below LG (the `popover` attribute keeps it out of the layout and it is never opened).
   The current destination has `aria-current="page"` and a 4 px accent dot.
4. **Actions** — `div.header__actions`, pushed to the trailing edge, holding the projected actions.
   The top bar styles the action roles it knows: `.header__search--wide`, `.header__search-btn`,
   `.header__lg`, `.header__signin`, `.header__cta`, `.header__link` and `.avatar-btn`.
5. **Menu button** — `button.menu-btn` with `span.menu-btn__label`, last in the actions, shown below LG
   (at every width when compact). It carries `aria-expanded` and `aria-haspopup="dialog"`.

Host: `ll-top-bar` is `display: contents`; it renders the `<header class="header">`, which is the
`banner` landmark because the shell places it directly in the page, outside `main`.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `homeLabel` | `string` | — | yes | Brand link name, "Logos Lab home". |
| `brand` | `'compact' \| 'full'` | `'compact'` | no | Brand variant. |
| `links` | `readonly TopBarLink[]` | `[]` | no | Destinations; empty renders no `nav` and no Menu button (minimal bar). |
| `navLabel` | `string` | `''` | when `links` is not empty | The `nav`'s `aria-label`: "Primary" or "Studio". |
| `menuLabel` | `string` | `''` | when `links` is not empty | Menu button label and accessible name, "Menu". |
| `menuExpanded` | `boolean` | `false` | no | Mirrors the drawer state on the Menu button's `aria-expanded`. |
| `compact` | `boolean` | `false` | no | Adds `.header--compact`: the Menu button shows at every width and inline links hide. |

`TopBarLink` is `{ label: string; path: string; queryParams?: Params; exact?: boolean }`. The current
link is the one whose path matches the router URL (exactly when `exact`, otherwise as a prefix) and
whose query parameters match exactly, so "Courses" (`/explore?type=course`) and "Explore"
(`/explore`) are never current together; it gets `aria-current="page"`.

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| `menuOpened` | `HTMLButtonElement` (the Menu button, for focus return) | The Menu button is activated. |

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| `[slot=actions]` | search form, icon buttons, buttons, avatar button | Projected in order before the Menu button, inside `.header__actions`. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Product | — | Public, learner, admin, moderation and studio pages. |
| Compact | `.header--compact` | Focused shells whose sidebar holds the navigation. |
| Minimal | no `links` | Sign-in, registration and account flows: brand plus one action. |

One size: `--layout-topbar-height` at every width; nav links `--target-comfortable` tall below LG and
`--control-height-md` from LG; every action keeps a 44 px target.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Link default | — | `--color-fg-muted` | link |
| Link hover | `:hover` | `--color-fg-default` | — |
| Link focus | `:focus-visible` | Shared focus ring | — |
| Link current | `aria-current="page"` | `--color-fg-default` and a `--space-1` accent dot beneath | "current page" |
| Menu collapsed | `aria-expanded="false"` | Outlined pill on `--color-bg-surface` | "Menu, button, collapsed" |
| Menu expanded | `aria-expanded="true"` (drawer open) | Same; the drawer covers the page | "expanded" |
| Menu hover | `:hover` | `--color-bg-subtle` | — |

## Markup

```html
<!-- rendered: product bar, visitor, LG -->
<header class="header">
  <div class="wrap header__inner">
    <a class="brand brand--compact" href="/" aria-label="Logos Lab home">…<span>logos lab</span></a>
    <nav class="nav" popover aria-label="Primary">
      <ul class="nav__list">
        <li><a class="nav__link" href="/explore" aria-current="page">Explore</a></li>
        <li><a class="nav__link" href="/explore?type=course">Courses</a></li>
        <li><a class="nav__link" href="/events">Events</a></li>
        <li><a class="nav__link" href="/experts">Experts</a></li>
        <li><a class="nav__link" href="/explore?type=collection">Collections</a></li>
      </ul>
    </nav>
    <div class="header__actions">
      <form class="search header__search--wide" role="search">…</form>
      <a class="icon-btn header__search-btn" href="/search" aria-label="Search">…</a>
      <button class="icon-btn header__lg" type="button" aria-label="Theme: match my device" aria-haspopup="menu">…</button>
      <a class="btn btn--text header__signin" href="/sign-in">Sign in</a>
      <a class="btn btn--primary btn--sm header__cta" href="/register">Create account</a>
      <button type="button" class="menu-btn" aria-expanded="false" aria-haspopup="dialog" aria-label="Menu"><svg class="icon icon--sm" aria-hidden="true">…</svg><span class="menu-btn__label">Menu</span></button>
    </div>
  </div>
</header>
```

```html
<!-- consumer: application shell -->
<ll-top-bar homeLabel="Logos Lab home" navLabel="Primary" menuLabel="Menu" [links]="primaryLinks" [menuExpanded]="drawerOpen()" (menuOpened)="openDrawer($event)">
  <form llSearch slot="actions" class="header__search--wide" …></form>
  <a llButton variant="text" slot="actions" class="header__signin" routerLink="/sign-in">Sign in</a>
  <a llButton variant="primary" size="sm" slot="actions" class="header__cta" routerLink="/register">Create account</a>
</ll-top-bar>
```

## Design

- Bar: `--layout-topbar-height`, gap `--space-4`, hairline bottom border `--color-border-default`,
  layer `--z-sticky`.
- Nav from LG: margin-left `--space-10`, links gap `--space-2`, padding `--space-3`.
- Menu button: `--target-comfortable` tall, padding `--space-4`, `--radius-full`, hairline border; icon
  only below 30rem.
- Wide search from 80rem: `flex: 0 1 var(--size-header-search)`, minimum `--size-header-search-min`.
- Transitions: colour `--duration-fast`, background `--duration-base`, `--ease-standard`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Bar | none (canvas shows through) | `--color-bg-canvas` | `--color-bg-canvas` |
| Hairline | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Link | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Current link and hover | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Current dot | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Menu button fill | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Links at rest |
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | Current link |
| `--color-accent` | `--color-bg-canvas` | 3:1 | Current dot |
| `--color-focus-ring` | `--color-bg-canvas` | 3:1 | Focus |

## Responsive behaviour

- XS to MD (below 64rem): nav hidden; the Menu button shows (icon only below 30rem, labelled from
  30rem); the search icon button shows; "Sign in", the theme button and `.header__link` hide; "Create
  account" shows from 30rem.
- LG (64rem) and up: nav inline after the brand; "Sign in" and the theme button show; Menu hides.
- XL (80rem) and up: the wide search field replaces the search icon button.
- At 320 px nothing scrolls horizontally; every action is at least 44 × 44 CSS px; nav labels 30 %
  longer wrap rather than overflow.

## Accessibility

### Role and pattern

`<header>` (banner landmark) containing `<nav aria-label="Primary">` of plain links (disclosure
navigation). The Menu button is a native `<button>` that opens a modal dialog, so it carries
`aria-haspopup="dialog"` and `aria-expanded`.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Brand, nav links, actions and Menu in visual order. |
| <kbd>Enter</kbd> | Follows a link; activates a button. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> on Menu | Emits `menuOpened`; the application opens the drawer and moves focus into it. |

### Focus

Shared focus ring on every link and button. When the drawer closes, the application returns focus to
the Menu button the top bar passed in `menuOpened`.

### Labelling

The nav is labelled ("Primary" or "Studio"), distinct from the footer's "Footer". The current link has
`aria-current="page"`. Icon buttons are named with counts in words.

### Announcements

None by the bar.

### Motion

Link and Menu colour transitions are removed under reduced motion.

## Content and internationalisation

- Destinations are nouns in sentence case, one or two words: Explore, Courses, Events, Experts,
  Collections. All labels arrive translated through inputs and slots.

## Performance

- `OnPush`; `links` and the current-link match are signals derived from the router URL.
- Measured through the page budgets of `L2-120` and `L2-123`.
- Layout stability: the bar's height is fixed by `--layout-topbar-height`, so actions arriving after the
  member loads do not move the page.

## Acceptance criteria

### Rendering

- **AC-1** Given a visitor on the home page at 1440 px, when the top bar renders, then the links Explore, Courses, Events, Experts and Collections are visible inline in a `nav` named "Primary", with "Sign in" and "Create account". (L2-131)
- **AC-2** Given a visitor on `/events` at 1440 px, when the top bar renders, then the "Events" link has `aria-current="page"` and no other nav link does. (L2-127)
- **AC-3** Given any page, when its landmarks are inspected, then the top bar is the only `banner`, and its `nav` label differs from the footer's. (L2-127)
- **AC-4** Given the sign-in page, when the minimal top bar renders, then it has the full brand and one action and no `nav` or Menu button. (L2-127)

### States

- **AC-5** Given a viewport of 375 px, when the top bar renders, then the nav links are hidden, and a "Menu" button with `aria-expanded="false"` and a "Search" icon button are visible. (L2-131)
- **AC-6** Given the Menu button, when the user activates it, then `menuOpened` is emitted with the button, and once the application reports the drawer open, `aria-expanded` is "true". (L2-131)

### Keyboard and focus

- **AC-7** Given the home page at 1440 px, when a keyboard user tabs from the skip link, then focus moves through the brand, the five nav links and the actions in visual order, each with a visible focus ring. (L2-126)

### Theming

- **AC-8** Given the dark theme, when the top bar renders, then the links, hairline and current dot use their dark token values and the links meet 4.5:1 on the canvas. (L2-134)
- **AC-9** Given both themes, when nav link contrast is measured, then muted and current links meet 4.5:1 and the current dot meets 3:1. (L2-129)

### Responsive

- **AC-10** Given viewports of 320, 768, 1024 and 1440 px, when the top bar renders, then the page does not scroll horizontally. (L2-130)
- **AC-11** Given a viewport of 375 px, when the Menu and Search buttons are measured, then each is at least 44 × 44 CSS px. (L2-132)
- **AC-12** Given nav labels 30 % longer in the pseudo-locale at 1024 px, when the top bar renders, then no label is clipped or overlaps another. (L2-150)

### Motion

- **AC-13** Given reduced motion, when the user hovers a nav link, then its colour changes without transition. (L2-129)

## Implementation notes

- Folder `frontend/projects/components/src/lib/top-bar/`: `top-bar.ts` (`TopBar`), `top-bar-link.ts`
  (`TopBarLink`), `.html`, `.scss` with the `top-bar` block under `:host ::ng-deep` so projected actions
  take their roles. Composes `Brand`; uses `RouterLink` and the router URL for the current link.
- The drawer and the breakpoint observer live in the application (`GlobalNavigationService`).

## Decisions

- **D-1** *Popover sheet (design system) or CDK dialog drawer (detailed design)?* The drawer: the
  detailed design *Navigate globally* and the `dialogs/nav-drawer` mock specify `NavDrawerDialog` with
  the CDK `Dialog`. The bar keeps the `popover` attribute on its `nav` only so it is hidden below LG
  exactly as in the mocks; it is never opened, so the sheet's "Close menu" button is not rendered.
- **D-2** *Which breakpoint is LG: 992 px (L1-022) or 64rem?* 64rem (1024 px), the value in the design
  system, the mocks and the CSS; recorded for *Adapt layouts across viewports*.
- **D-3** *What do Courses and Collections link to?* The catalogue filtered by type
  (`/explore?type=course`, `/explore?type=collection`), as the mocks link both to the filtered explore
  page.
- **D-4** *Does the Menu button use `popovertarget`?* No; it opens a dialog, so it emits `menuOpened`
  and the application binds `menuExpanded`.
