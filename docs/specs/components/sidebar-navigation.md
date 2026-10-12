# Sidebar navigation

| Field | Value |
|---|---|
| Selector | `ll-sidebar-nav`, `ll-settings-layout` |
| Library path | `frontend/projects/components/src/lib/sidebar-navigation/` |
| Status | built |
| Traces to | L2-126, L2-127, L2-129, L2-130, L2-131, L2-132, L2-134, L2-150 |
| Design system | [`sidebar-navigation.html`](../../design-system/components/sidebar-navigation.html) |
| Source mocks | [`dialogs/nav-drawer/default`](../../mocks/dialogs/nav-drawer/default.html), [`dialogs/nav-drawer/staff`](../../mocks/dialogs/nav-drawer/staff.html), [`pages/settings-profile/default`](../../mocks/pages/settings-profile/default.html), [`pages/admin/default`](../../mocks/pages/admin/default.html), [`pages/moderation-queue/default`](../../mocks/pages/moderation-queue/default.html) |
| Rendering | [`sidebar-navigation.html`](sidebar-navigation.html) |

## Purpose and scope

Sidebar navigation lists the destinations of one area in labelled groups: the site navigation inside
the navigation drawer, and the section navigation of Settings, Admin and Moderation. The current
destination is highlighted with the accent wash. In the settings variant the list scrolls sideways
below LG and becomes a column from LG.

Use the top bar for the five primary destinations and tabs for views of one page.

Out of scope:

- The page header and the forms inside a settings page: the [page header](page-header.md) and the [form layout](form-layout.md).

- What an action item does (opening the theme menu, signing out): the consumer handles `itemSelected`.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `dialogs/nav-drawer/default` | site, label "Site" | Browse: Explore, Courses, Events, Experts, Collections; Display: action "Theme: match my device" | default, hover, focus | drawer |
| `dialogs/nav-drawer/signed-in` | site | Browse; You: Dashboard (current), Messages with count "1 unread", Settings; Account: action "Sign out" | current, count | drawer |
| `dialogs/nav-drawer/staff` | site | Browse; You; Staff: Studio, Review queue "5 waiting", Moderation "7 open reports", Admin (current); Account | current, counts | drawer |
| `pages/settings-*/*` | settings, label "Settings" | group "Settings": Profile, Email and password, Security, Sessions, Notifications, Privacy and messaging, Your data, Blocked members | current | canvas |
| `pages/admin*/*` | settings, label "Admin" | Overview, Users, Expert invitations "3", Topics, Featured, Announcements, Policies, Site settings, Audit log, Analytics | current, count | canvas |
| `pages/moderation-*/*`, `pages/appeals/*` | settings, label "Moderation" | Queue "7", Held for review "1", Appeals "1", Audit trail | current, counts | canvas |

## Anatomy

1. **Nav** — `nav.sidebar-nav[aria-label]` (plus `.settings-nav` in the settings variant): a grid of
   rows with `--space-1` gaps.
2. **Group label** — `p.sidebar-nav__group`: overline, uppercase, subtle.
3. **Link row** — `a`, at least `--target-comfortable` tall, muted; the current row has
   `aria-current="page"` and the accent wash.
4. **Action row** — `button` with the same look, for items that act instead of navigate.
5. **Count** — `span.badge.badge--count` at the end of a row, with a visually hidden word
   (`span.vh` " unread").

6. **Settings layout** — `div.wrap.settings-layout`: the page body of Settings, Admin and Moderation.
   It places the settings navigation beside (from LG) or above (below LG) the page's content.

Host: `ll-sidebar-nav` is `display: contents`; it renders the `nav`. `ll-settings-layout` is
`display: contents`; it renders the layout and projects the navigation and the content.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string` | — | yes | The `nav`'s `aria-label`: "Site", "Settings", "Admin", "Moderation". |
| `groups` | `readonly SidebarNavGroup[]` | — | yes | Rendered in order; a group with a `label` starts with `p.sidebar-nav__group`. |
| `variant` | `'site' \| 'settings'` | `'site'` | no | `settings` adds `.settings-nav`. |

`SidebarNavGroup` is `{ label?: string; items: readonly SidebarNavItem[] }`. `SidebarNavItem` is
`{ id: string; label: string; path?: string; queryParams?: Params; exact?: boolean; count?: number;
countLabel?: string }`. An item with a `path` renders a link marked current by the router (path as a
prefix unless `exact`, query parameters exactly); an item without one renders an action row. A
positive `count` renders the badge with `countLabel` as its hidden word.

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| `itemSelected` | `string` — the item's `id` | Any row is activated (links too, so a drawer can close itself). |

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| `[slot=nav]` (`ll-settings-layout`) | one `ll-sidebar-nav` in the settings variant | Rendered first: the column from LG, the scrolling row below. |
| default (`ll-settings-layout`) | the page header and the page's content in one wrapper | Rendered in the second column; `min-width: 0` so wide content never pushes the page sideways. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Site | — | The navigation drawer. |
| Settings | `.settings-nav` | Settings, Admin and Moderation section navigation. |

One size: rows `--target-comfortable` tall.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | `--color-fg-muted` | link or button |
| Hover | `:hover` | `--color-bg-subtle`, `--color-fg-default` | — |
| Focus | `:focus-visible` | Shared ring (inset in the settings row, which scrolls) | — |
| Current | `aria-current="page"` | `--color-accent-subtle` wash, `--color-fg-accent` | "current page" |
| Count | `count > 0` | Accent count badge at the row end | "Messages, 1 unread" |

## Markup

```html
<!-- rendered: site -->
<nav class="sidebar-nav" aria-label="Site">
  <p class="sidebar-nav__group">Browse</p>
  <a href="/explore">Explore</a>
  …
  <p class="sidebar-nav__group">You</p>
  <a href="/dashboard" aria-current="page">Dashboard</a>
  <a href="/messages">Messages <span class="badge badge--count">1<span class="vh"> unread</span></span></a>
  <p class="sidebar-nav__group">Display</p>
  <button type="button">Theme: match my device</button>
</nav>
```

```html
<!-- consumer -->
<ll-sidebar-nav label="Site" [groups]="groups()" (itemSelected)="select($event)" />
```

```html
<!-- rendered: settings layout -->
<div class="wrap settings-layout">
  <nav class="sidebar-nav settings-nav" aria-label="Settings">…</nav>
  <div>…page header and form…</div>
</div>

<!-- consumer -->
<ll-settings-layout>
  <ll-sidebar-nav slot="nav" label="Settings" variant="settings" [groups]="settings" />
  <div>…</div>
</ll-settings-layout>
```

## Design

- Grid gap `--space-1`; max width `--layout-sidebar-width` (none in the settings variant).
- Group label padding `--space-4` `--space-3` `--space-1`, `--text-overline`, `--letter-spacing-wide`.
- Rows: gap `--space-3`, padding `0 --space-3`, `--radius-md`, `--font-weight-medium`.
- Settings variant below LG: a single scrolling row; from LG a column `--layout-settings-nav` wide.
- Settings layout: grid, gap `--space-8`, padding-block `--space-8` 0; from LG two columns,
  `--layout-settings-nav` and the rest.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Group label | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Row | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Row hover | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |
| Current wash | `--color-accent-subtle` | accent subtle role | accent subtle role |
| Current text | `--color-fg-accent` | `--palette-accent-700` | `--palette-accent-300` |
| Count | `--color-accent` / `--color-fg-on-accent` | `--palette-accent-600` / `--palette-birch-50` | `--palette-accent-300` / `--palette-accent-950` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-muted` | `--color-bg-surface-raised` | 4.5:1 | Rows in the drawer |
| `--color-fg-accent` | `--color-accent-subtle` | 4.5:1 | Current row |
| `--color-fg-on-accent` | `--color-accent` | 4.5:1 | Count |

## Responsive behaviour

- Site variant: a column at every width (it lives in the drawer).
- Settings variant: below LG one row that scrolls inside its own box with keyboard access; from LG a
  column. The page itself never scrolls horizontally at 320 px.
- Every row is at least 44 px tall; longer labels wrap in the site variant.

## Accessibility

### Role and pattern

A labelled `nav` of links (and buttons for actions); group labels are plain text.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Moves through the rows in order. |
| <kbd>Enter</kbd> | Follows a link; activates an action (also <kbd>Space</kbd>). |

### Focus

Shared ring; the settings row draws it inside the row so the scroll box does not clip it.

### Labelling

Each `nav` has its own label. Counts carry a hidden word so the row reads "Messages 1 unread".

### Announcements

None.

### Motion

Hover colour changes only; no motion.

## Content and internationalisation

- Labels, group labels and count words arrive translated; counts are numbers formatted by the consumer.

## Performance

- `OnPush`; `groups` is a signal input. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given the visitor's navigation drawer, when it renders, then a `nav` named "Site" lists the group "Browse" with Explore, Courses, Events, Experts and Collections. (L2-131)
- **AC-2** Given Settings with "Profile" current, when the navigation renders, then the "Profile" row has `aria-current="page"` and the accent wash, and no other row does. (L2-127)
- **AC-3** Given the staff drawer, when it renders, then "Review queue" shows the count "5" and its accessible name is "Review queue 5 waiting". (L2-127)
- **AC-4** Given an action row "Theme: match my device", when it is activated, then `itemSelected` emits its id and no navigation happens. (L2-131)

### Keyboard and focus

- **AC-5** Given the drawer navigation, when a keyboard user tabs through it, then every row receives a visible focus ring at least 2 CSS px thick. (L2-126)

### Theming

- **AC-6** Given the dark theme, when the navigation renders, then rows, group labels, the current wash and counts use dark token values. (L2-134)
- **AC-7** Given both themes, when contrast is measured, then rows and the current row meet 4.5:1. (L2-129)

### Responsive

- **AC-8** Given Settings at 320 px, when the settings navigation renders, then it scrolls within its own row and the page does not scroll horizontally. (L2-130)
- **AC-9** Given a viewport of 375 px, when a row is measured, then it is at least 44 CSS px tall. (L2-132)
- **AC-11** Given Settings at 1440 px, when the settings layout renders, then the navigation is a column beside the page content; at 375 px it is a scrolling row above the content. (L2-130)
- **AC-10** Given the pseudo-locale's longer labels, when the drawer navigation renders at 320 px, then labels wrap and none is clipped. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/sidebar-navigation/`: `sidebar-navigation.ts`
  (`SidebarNavigation`), `sidebar-nav-group.ts`, `sidebar-nav-item.ts`, `.html`, `.scss` with the
  `sidebar-navigation` block and the badge count rules.

## Decisions

- **D-1** *How do action items look?* Exactly like link rows; the design system styles only `a`, so the
  component applies the row rules to `button` too. Actions (theme, sign out) must be buttons because
  they do not navigate.
- **D-3** *Who owns the settings layout?* This component: the layout is defined in the
  `sidebar-navigation` block of the design system, it exists only to place the settings navigation,
  and Settings, Admin and Moderation share it.
- **D-2** *Does a link emit `itemSelected`?* Yes, so the navigation drawer can close when a destination is
  chosen.
