# Menu

| Field | Value |
|---|---|
| Selector | `ll-menu` |
| Library path | `frontend/projects/components/src/lib/menu/` |
| Status | planned |
| Traces to | L2-126, L2-127, L2-129, L2-130, L2-132, L2-133, L2-134, L2-150 |
| Design system | [`menu.html`](../../design-system/components/menu.html) |
| Source mocks | [`dialogs/theme-menu/default`](../../mocks/dialogs/theme-menu/default.html), [`dialogs/theme-menu/selected`](../../mocks/dialogs/theme-menu/selected.html), [`dialogs/account-menu/default`](../../mocks/dialogs/account-menu/default.html), [`dialogs/account-menu/staff`](../../mocks/dialogs/account-menu/staff.html), [`dialogs/nav-drawer/default`](../../mocks/dialogs/nav-drawer/default.html), [`pages/studio/default`](../../mocks/pages/studio/default.html) |
| Rendering | [`menu.html`](menu.html) |

## Purpose and scope

A menu lists actions or choices that belong to one control: the theme menu from the top bar's theme
button, the account menu from the avatar, and the row "More" menus in the studio and admin lists. Items
can be links, actions or radio choices; groups can be labelled and are divided by hairlines. The menu
is built on the CDK menu (`cdkMenu`, `cdkMenuItem`, `cdkMenuItemRadio`), which provides the roles,
arrow-key movement, typeahead, Escape and focus return. Inside the navigation drawer the theme choice is
the same menu rendered inline.

Use a select for a form value and sidebar navigation for destinations of an area.

Out of scope:

- What an action does (sign out, apply a theme): the consumer handles `itemSelected`.
- The trigger button: the consumer puts `[cdkMenuTriggerFor]` on its own button.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `dialogs/theme-menu/*` (top bar theme button, LG and up) | popup, group "Theme" of three radios | "Match my device", "Light", "Dark"; check icons | checked "Match my device" or "Dark" | raised surface |
| `dialogs/account-menu/default` (avatar, LG and up) | popup, label "Your account", header "Miriam Clarke · miriam.clarke@example.ca" | links Dashboard, My learning, Saved "14", Messages "1 unread", Settings; group "Theme"; action "Sign out" | default, hover, focus | raised surface |
| `dialogs/account-menu/staff` | popup | adds group "Staff": Studio, Review queue "5 waiting", Moderation "7 open", Admin | default | raised surface |
| `dialogs/nav-drawer/*` Display group (below LG) | inline, group "Theme" | the three theme radios | checked | drawer surface |
| studio and admin row "More" menus (`pages/studio/*`, `pages/admin-users/*`) | popup | Edit, Duplicate, Archive (danger), Delete (danger) | default, danger | raised surface |

## Anatomy

1. **Menu** — `div.menu[role=menu]` (`cdkMenu`), labelled by `aria-label` or by its only group label.
2. **Header (optional)** — `div.menu__header[role=presentation]` with the person's name and email.
3. **Group** — `div[role=group]` labelled by its `p.menu__label` (`cdkMenuGroup`).
4. **Item** — `a.menu__item` or `button.menu__item` with `role="menuitem"`, or `role="menuitemradio"`
   with `aria-checked`; an optional leading [icon](icon.md); an optional trailing `span.menu__shortcut`.
5. **Check** — a `check` icon with `.menu__check` on radio items, visible only when checked.
6. **Divider** — `hr.menu__divider[role=separator]` between sections.

Host: `ll-menu` is `display: contents`; it renders the `div.menu`.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string \| null` | `null` | no | `aria-label` of the menu; when `null` the menu is labelled by its first group's label. |
| `header` | `MenuHeader \| null` | `null` | no | `{ title: string; meta?: string }` rendered in `.menu__header`. |
| `sections` | `readonly MenuSection[]` | — | yes | Rendered in order with a divider between sections. |
| `inline` | `boolean` | `false` | no | Adds `.menu--inline`: no frame or shadow, for a menu inside the drawer. |

`MenuSection` is `{ label?: string; items: readonly MenuItem[] }`. `MenuItem` is `{ id: string; label:
string; icon?: IconName; path?: string; queryParams?: Params; checked?: boolean; shortcut?: string;
shortcutLabel?: string; danger?: boolean }`. An item with `path` renders a link; an item with a boolean
`checked` renders a radio choice; any other item renders an action button. `shortcut` is the trailing
text ("14", "1 unread"); `shortcutLabel` replaces it for assistive technology when the visible text is
not a full phrase.

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| `itemSelected` | `string` — the item's `id` | An item is activated with a pointer, Enter or Space. The CDK closes a popup menu afterwards. |

### Content slots

None.

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Popup | — | Opened from a trigger with `cdkMenuTriggerFor`. |
| Inline | `.menu--inline` | The theme choice inside the drawer. |
| Danger item | `.menu__item--danger` | Destructive actions such as Delete. |

One size: items `--target-comfortable` tall; minimum width `--size-menu-min`.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Item default | — | `--color-fg-default` | "Dashboard, menu item" |
| Item hover | `:hover` | `--color-bg-subtle` | — |
| Item focus | `:focus-visible` (arrow keys move focus) | Shared focus ring | Item announced |
| Checked | `aria-checked="true"` | `--color-fg-accent`, check visible | "checked" |
| Unchecked | `aria-checked="false"` | Check hidden | "not checked" |
| Danger | `.menu__item--danger` | `--color-danger-fg`; hover `--color-danger-bg` | — |
| Disabled | `aria-disabled="true"` | `--color-fg-disabled` | "dimmed" |

## Markup

```html
<!-- rendered: theme menu -->
<div class="menu" role="menu" aria-labelledby="menu-theme">
  <div role="group" aria-labelledby="menu-theme">
    <p class="menu__label" id="menu-theme">Theme</p>
    <button class="menu__item" type="button" role="menuitemradio" aria-checked="true"><svg class="icon icon--sm menu__check" …></svg>Match my device</button>
    <button class="menu__item" type="button" role="menuitemradio" aria-checked="false"><svg class="icon icon--sm menu__check" …></svg>Light</button>
    <button class="menu__item" type="button" role="menuitemradio" aria-checked="false"><svg class="icon icon--sm menu__check" …></svg>Dark</button>
  </div>
</div>
```

```html
<!-- consumer -->
<button llIconButton class="header__lg" [cdkMenuTriggerFor]="themeMenu" [attr.aria-label]="themeLabel()">…</button>
<ng-template #themeMenu><ll-menu [sections]="themeSections()" (itemSelected)="choose($event)" /></ng-template>
```

## Design

- Menu: padding `--space-2`, `--radius-lg`, hairline `--color-border-default`,
  `--color-bg-surface-raised`, `--shadow-3`; width `max-content`, minimum `--size-menu-min`.
- Header padding `--space-3` `--space-4`; label `--text-overline`, `--letter-spacing-wide`, subtle.
- Items: gap `--space-3`, padding `0 --space-4`, `--radius-md`, `--text-body`; shortcut
  `--text-caption`, subtle, pushed to the end; divider hairline with `--space-2` margins.
- Layer `--z-popover` (the CDK overlay).

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Surface | `--color-bg-surface-raised` | `--palette-white` | `--palette-night-850` |
| Item | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Item hover | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |
| Checked | `--color-fg-accent` | `--palette-accent-700` | `--palette-accent-300` |
| Label, shortcut | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Danger | `--color-danger-fg` | danger text role | danger text role |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface-raised` | 4.5:1 | Items |
| `--color-fg-accent` | `--color-bg-surface-raised` | 4.5:1 | Checked item |
| `--color-fg-subtle` | `--color-bg-surface-raised` | 4.5:1 | Labels and shortcuts |

## Responsive behaviour

- Popup menus are used from LG, where the triggers are visible; below LG the same choices live in the
  drawer (theme) or move into the page.
- The menu never exceeds the viewport (`max-width: 100%`); labels wrap. Items are at least 44 px tall.

## Accessibility

### Role and pattern

APG menu (menu button pattern) through the CDK menu: `role="menu"`, `menuitem`, `menuitemradio` with
`aria-checked`, `group` with a label, `separator`.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Enter</kbd> / <kbd>Space</kbd> / <kbd>↓</kbd> on the trigger | Opens the menu and focuses the first item. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Moves between items, wrapping. |
| <kbd>Home</kbd> / <kbd>End</kbd> | First or last item. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Activates the item; a popup closes and focus returns to the trigger. |
| <kbd>Escape</kbd> | Closes a popup and returns focus to the trigger. |
| A letter | Moves to the next item starting with it. |

### Focus

Roving focus inside the menu; the shared focus ring on the focused item.

### Labelling

The menu is named by `label` or its group label; the trigger has `aria-haspopup="menu"` and
`aria-expanded` (from the CDK). Shortcut text is part of the item's name unless `shortcutLabel` is given.

### Announcements

Choosing an option changes `aria-checked`; no extra live region.

### Motion

None.

## Content and internationalisation

- Labels and shortcuts arrive translated: "Match my device", "Light", "Dark", "Sign out", "1 unread".

## Performance

- `OnPush`; rendered only while open (popup). Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given a visitor at 1440 px, when they open the top bar's theme menu, then a menu labelled "Theme" lists the radio choices "Match my device", "Light" and "Dark", with "Match my device" checked on a first visit. (L2-133)
- **AC-2** Given the account menu for Miriam Clarke, when it opens, then its header shows "Miriam Clarke" and "miriam.clarke@example.ca", the "Messages" item reads "Messages 1 unread", and "Sign out" is the last item. (L2-127)
- **AC-3** Given the navigation drawer below LG, when it opens, then the Display group holds the same three theme choices as an inline menu. (L2-133)

### States

- **AC-4** Given the theme menu, when the visitor chooses "Dark", then "Dark" has `aria-checked="true"` and the other two `aria-checked="false"` the next time the menu opens. (L2-133)

### Keyboard and focus

- **AC-5** Given focus on the theme button, when the user presses Enter, then the menu opens with focus on its first item, ↓ moves to "Light", and Escape closes it with focus back on the theme button. (L2-126)
- **AC-6** Given an open popup menu, when an item is focused, then a focus ring at least 2 CSS px thick with at least 3:1 contrast is visible. (L2-126)

### Theming

- **AC-7** Given the dark theme, when a menu opens, then its surface, items, label and check use dark token values. (L2-134)
- **AC-8** Given both themes, when contrast is measured, then items, the checked item and labels meet 4.5:1 on the menu surface. (L2-129)

### Responsive

- **AC-9** Given the inline theme menu in the drawer at 320 px, when it renders, then nothing scrolls horizontally. (L2-130)
- **AC-10** Given a viewport of 375 px, when an inline menu item is measured, then it is at least 44 CSS px tall. (L2-132)
- **AC-11** Given the pseudo-locale's longer labels, when the account menu opens at 1024 px, then no label is clipped. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/menu/`: `menu.ts` (`Menu`), `menu-item.ts`,
  `menu-section.ts`, `menu-header.ts`, `.html`, `.scss` with the `menu` block under `:host ::ng-deep`.
  Uses `CdkMenu`, `CdkMenuGroup`, `CdkMenuItem`, `CdkMenuItemRadio` from `@angular/cdk/menu`, and
  `Icon`.

## Decisions

- **D-1** *How does the drawer show the theme choice?* As the same menu rendered inline under the
  "Display" group label, instead of the mock's single "Theme: match my device" row that links to the
  theme menu. A menu cannot open from inside the drawer's sidebar navigation without a second overlay,
  and the detailed design *Select theme* names the drawer's Display group as one of the three places the
  menu appears. The inline variant drops the frame and shadow.
- **D-2** *Option labels: "System" (`L2-133` AC2) or "Match my device" (mocks)?* "Match my device", the
  user-facing wording in every mock; the stored value is `system`, which is what `L2-133` describes.
