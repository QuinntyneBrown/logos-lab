---
title: Sidebar navigation
tier: core
order: 33
summary: A vertical list of places inside one area of the product. Muted rows, a sage-tinted current page, and optional groups and counts.
selector: .sidebar-nav, .settings-nav
target: a:not([aria-current])
states: default, hover, focus
matrix-variants: workspace, with counts, settings
contrast: --color-fg-muted|--color-bg-canvas|4.5; --color-fg-accent|--color-accent-subtle|4.5; --color-fg-default|--color-bg-subtle|4.5; --color-focus-ring|--color-bg-canvas|3
---

## Overview

Use a sidebar navigation when one area of the product has more destinations than the [top bar](top-bar.html)
should carry: the sections of a workspace, the projects someone belongs to, the pages of settings. It sits in the
first column of a `.sidebar-layout` or `.settings-layout` and stays put while the content changes. For two to five
views of the same object, use [tabs](tabs.html) instead; for a trail back up a hierarchy, use a
[breadcrumb](breadcrumb.html). Never use it for actions; those belong in [buttons](button.html) or a
[menu](menu.html).

## Anatomy

1. **Landmark** — a `<nav>` named for what it navigates: Workspace, Settings, Northwind.
2. **Group label** — optional `.sidebar-nav__group` overline that names a set of links.
3. **Item** — a 44px row: optional 20px icon, a label, and an optional trailing [badge](badge.html) count.
4. **Current item** — `aria-current="page"`, on the sage tint with the accent text role.
5. **Collapsible group** — optional `<details>` whose `<summary>` hides a set of links until opened.

```html
<nav class="sidebar-nav" aria-label="Workspace"><p class="sidebar-nav__group">Workspace</p><a href="#" aria-current="page"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/></svg>Projects</a><a href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13.5 6.5 5.5h11l2.5 8V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18z"/><path d="M4 13.5h4.5l1 2h5l1-2H20"/></svg>Inbox<span class="badge badge--count">4<span class="vh"> unread</span></span></a></nav>
```

## Variants

### workspace
The default: icon and label for each section, the current one tinted.
```html
<nav class="sidebar-nav" aria-label="Workspace"><a href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 10.5 12 4.5l7.5 6V19a1 1 0 0 1-1 1h-4v-5.5h-5V20h-4a1 1 0 0 1-1-1z"/></svg>Home</a><a href="#" aria-current="page"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/></svg>Projects</a><a href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.5h10.5A1.5 1.5 0 0 1 18 6v13.5H7.5A1.5 1.5 0 0 1 6 18z"/><path d="M6 18a1.5 1.5 0 0 1 1.5-1.5H18M9.5 8.5h5"/></svg>Notes</a><a href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/></svg>Gatherings</a><a href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="9" r="3"/><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><path d="M15 6.2a3 3 0 0 1 0 5.6M17 14.3c1.8.6 3 2.2 3.5 4.7"/></svg>People</a></nav>
```

### grouped
Group labels split a longer list. Each group is its own list, named by its label.
```html
<nav class="sidebar-nav" aria-label="Workspace"><p class="sidebar-nav__group" id="side-projects">Your projects</p><ul class="sidebar-nav" aria-labelledby="side-projects"><li><a href="#" aria-current="page">Northwind</a></li><li><a href="#">Field Day planning</a></li></ul><p class="sidebar-nav__group" id="side-notebooks">Notebooks</p><ul class="sidebar-nav" aria-labelledby="side-notebooks"><li><a href="#">Harbour Notes</a></li><li><a href="#">Research log</a></li></ul></nav>
```

### with counts
A trailing count badge marks what is waiting. The count is part of the link's name ("Inbox, 4 unread").
```html
<nav class="sidebar-nav" aria-label="Activity"><a href="#" aria-current="page"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13.5 6.5 5.5h11l2.5 8V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18z"/><path d="M4 13.5h4.5l1 2h5l1-2H20"/></svg>Inbox<span class="badge badge--count">4<span class="vh"> unread</span></span></a><a href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 16h-5.5L7 19.5V16a2.5 2.5 0 0 1-2.5-2.5z"/></svg>Mentions<span class="badge badge--count">2<span class="vh"> unread</span></span></a><a href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/></svg>Reminders</a><a href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="4" rx="1"/><path d="M5 8.5V18a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 18V8.5M10 12.5h4"/></svg>Archive</a></nav>
```

### collapsible
A `<details>` group folds away links people visit rarely. It works without script and remembers nothing; open it
when it holds the current page.
```html
<nav class="sidebar-nav" aria-label="Northwind"><a href="#">Overview</a><a href="#" aria-current="page">Launch checklist</a><a href="#">Decisions</a><details open><summary>Archived pages<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></summary><div class="sidebar-nav"><a href="#">Spring kickoff notes</a><a href="#">Old roadmap</a></div></details></nav>
```

### settings
`.settings-nav` scrolls sideways as a row on narrow screens and stacks as a column from 64rem. Pair it with
`.settings-layout`.
```html
<nav aria-label="Settings"><ul class="sidebar-nav settings-nav"><li><a href="#" aria-current="page">Account</a></li><li><a href="#">Notifications</a></li><li><a href="#">Privacy</a></li><li><a href="#">Members</a></li><li><a href="#">Billing</a></li></ul></nav>
```

## Sizes

N/A: one size. Rows are `--target-comfortable` (44px) tall with `--space-3` inline padding; the column is
`--layout-sidebar-width` (17rem) in `.sidebar-layout` and `--layout-settings-nav` (14rem) in `.settings-layout`.

## States

Links rest in the muted text role. Hover adds the linen wash and lifts the label to the default text role;
keyboard focus draws the sage ring around the row. The current page sits on `--color-accent-subtle` with
`--color-fg-accent` text and stays tinted while hovered. A collapsed `<details>` group shows only its summary
row. The matrix forces each state on the first link that is not the current page.

## Responsive

- **360px:** a workspace sidebar collapses behind the [top bar](top-bar.html)'s Menu button or into a
  [sheet](drawer.html); `.settings-nav` becomes a single row that scrolls sideways, keeping the current link in view.
- **768px:** the same as 360px, with room for more of the settings row.
- **1024px and up:** `.sidebar-layout` and `.settings-layout` place the nav in a fixed first column; `.settings-nav`
  stacks vertically.

## Theming

Every colour reads a semantic role. In dark mode the current item's tint turns deep sage with light sage text; the
hover wash is a lighter charcoal.

## Accessibility

**Role:** a `<nav>` landmark with a unique `aria-label`, containing plain links (or a list of links). Group labels
name their list with `aria-labelledby`. Never use `role="menu"` or `role="tree"` here: these are links, reached
with Tab.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves from link to link, including the summary of a collapsible group. |
| Enter | Follows the focused link. |
| Enter, Space (on a summary) | Opens or closes the group. |

**Focus:** the 2px `--color-focus-ring`, offset 3px, wraps the whole row. In a scrolling `.settings-nav`, scroll
the focused link into view.

**Labelling:** mark the current page with `aria-current="page"`; the tint alone says nothing to a screen reader.
Put unread counts inside the link with a visually hidden word ("4 unread"). Icons are decorative.

**Motion:** none beyond the shared colour transition; nothing to reduce.

**Touch:** rows are 44px tall and span the column; the settings row scrolls with a swipe.

## Content

Label destinations with nouns in sentence case: **Projects**, **Notifications**, **Billing**. Keep labels to two
words and avoid verbs ("Manage billing" is a button). Name groups by what they hold: **Your projects**,
**Notebooks**. Show counts only for things that need attention, and cap them at **99+**.

## Do and don't

### Do
Name the nav, mark the current page with `aria-current`, and keep labels to nouns.
```html
<nav class="sidebar-nav" aria-label="Settings"><a href="#" aria-current="page">Account</a><a href="#">Notifications</a><a href="#">Billing</a></nav>
```

### Don't
Mix actions into the navigation; "Invite people" belongs in a button.
```html
<nav class="sidebar-nav" aria-label="Workspace"><a href="#" aria-current="page">Projects</a><a href="#">Notes</a><a href="#">+ Invite people</a></nav>
```

### Do
Count only what is waiting for the person.
```html
<nav class="sidebar-nav" aria-label="Activity"><a href="#" aria-current="page">Inbox<span class="badge badge--count">4<span class="vh"> unread</span></span></a><a href="#">Reminders</a></nav>
```

### Don't
Badge every row; when everything has a number, none of them stand out.
```html
<nav class="sidebar-nav" aria-label="Activity"><a href="#" aria-current="page">Inbox<span class="badge badge--count">4</span></a><a href="#">Reminders<span class="badge badge--count">12</span></a><a href="#">Archive<span class="badge badge--count">318</span></a></nav>
```

## Tokens

Rows read the muted, default and accent text roles, the subtle and accent-subtle washes, `--radius-md` and
`--target-comfortable`; layouts read `--layout-sidebar-width` and `--layout-settings-nav`.

## Code

Use `nav.sidebar-nav` with links as direct children, or a `ul.sidebar-nav` of `li > a` inside a named `<nav>`. Add
`.settings-nav` for the settings row-to-column behaviour.
