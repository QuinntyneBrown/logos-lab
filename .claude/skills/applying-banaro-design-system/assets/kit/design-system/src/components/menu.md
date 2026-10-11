---
title: Menu
tier: core
order: 13
summary: A short list of actions that opens from a button. Quiet rows on a raised surface, with the destructive action last and set apart.
selector: .menu, .more
layout: inline
target: .menu__item
states: default, hover, focus, active, disabled
matrix-variants: actions, account, checkable
apg: menu-button
contrast: --color-fg-default|--color-bg-surface-raised|4.5; --color-fg-accent|--color-bg-surface-raised|4.5; --color-danger-fg|--color-bg-surface-raised|4.5; --color-danger-fg|--color-danger-bg|4.5; --color-focus-ring|--color-bg-surface-raised|3
---

## Overview

Use a menu for a handful of actions that belong to one object but don't deserve a button each: rename,
duplicate or archive a project, or the account actions behind the avatar. Keep it to seven items or fewer.
If people need to see the options before they choose, use a [select](select.html) or a
[radio group](radio-group.html). If the list is navigation, use a [sidebar navigation](sidebar-navigation.html)
or plain links. A menu that asks for more input belongs in a [popover](popover.html) or a [dialog](dialog.html).

## Anatomy

1. **Trigger** — a [button](button.html) or icon button with `aria-haspopup="menu"` and `aria-expanded`; it names the object: More actions for Northwind.
2. **Surface** — the raised panel: `--color-bg-surface-raised`, hairline border, `--shadow-3`, 15rem minimum width.
3. **Header** — optional; who or what the menu acts on, such as the signed-in person.
4. **Group label** — optional overline that names a set of items.
5. **Item** — a 44px row: optional 16px icon, a verb-first label and an optional shortcut hint.
6. **Divider** — a hairline that sets the destructive item apart.
7. **Danger item** — last in the list, in the danger text role.

```html
<div class="menu" role="menu" aria-label="Northwind actions"><p class="menu__label">Project</p><button class="menu__item" type="button" role="menuitem"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>Rename<span class="menu__shortcut" aria-hidden="true">F2</span></button><hr class="menu__divider" role="separator"><button class="menu__item menu__item--danger" type="button" role="menuitem"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 12.5h9l1-12.5M10 11v5M14 11v5"/></svg>Delete Northwind</button></div>
```

## Variants

### actions
The everyday menu: icon and verb for each action on one object.
```html
<div class="menu" role="menu" aria-label="Northwind actions"><button class="menu__item" type="button" role="menuitem"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>Rename</button><button class="menu__item" type="button" role="menuitem"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5v-2a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/></svg>Duplicate</button><button class="menu__item" type="button" role="menuitem"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>Copy link</button><button class="menu__item" type="button" role="menuitem"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="4" rx="1"/><path d="M5 8.5V18a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 18V8.5M10 12.5h4"/></svg>Archive</button></div>
```

### account
Behind the avatar in the [top bar](top-bar.html). A header says who is signed in; items are links.
```html
<div class="menu" role="menu" aria-label="Your account"><div class="menu__header" role="presentation"><p class="rows__title">Amara Osei</p><p class="rows__meta">Product designer · amara@example.com</p></div><a class="menu__item" role="menuitem" href="#"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.8-4 3.6-6 7-6s6.2 2 7 6"/></svg>Your profile</a><a class="menu__item" role="menuitem" href="#"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18"/></svg>Settings</a><a class="menu__item" role="menuitem" href="#"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="M3.5 10h17M7 14.5h3"/></svg>Billing</a><hr class="menu__divider" role="separator"><a class="menu__item" role="menuitem" href="#"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 4.5h-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3M15 8l4 4-4 4M19 12H9.5"/></svg>Sign out</a></div>
```

### grouped
Group labels split a longer menu into named sets. Each set is a `role="group"` named by its label.
```html
<div class="menu" role="menu" aria-label="Add to Harbour Notes"><div role="group" aria-labelledby="menu-create"><p class="menu__label" id="menu-create">Create</p><button class="menu__item" type="button" role="menuitem">New note</button><button class="menu__item" type="button" role="menuitem">New checklist</button></div><hr class="menu__divider" role="separator"><div role="group" aria-labelledby="menu-invite"><p class="menu__label" id="menu-invite">Invite</p><button class="menu__item" type="button" role="menuitem">Invite by email</button><button class="menu__item" type="button" role="menuitem">Copy invite link</button></div></div>
```

### shortcuts
Shortcut hints sit at the trailing edge in the caption role. The item carries `aria-keyshortcuts`; the hint itself is hidden from assistive technology so it isn't read twice.
```html
<div class="menu" role="menu" aria-label="Edit"><button class="menu__item" type="button" role="menuitem" aria-keyshortcuts="Control+Z">Undo<span class="menu__shortcut" aria-hidden="true">Ctrl Z</span></button><button class="menu__item" type="button" role="menuitem" aria-keyshortcuts="Control+Shift+Z">Redo<span class="menu__shortcut" aria-hidden="true">Ctrl Shift Z</span></button><hr class="menu__divider" role="separator"><button class="menu__item" type="button" role="menuitem" aria-keyshortcuts="Control+F">Find in note<span class="menu__shortcut" aria-hidden="true">Ctrl F</span></button><button class="menu__item" type="button" role="menuitem" aria-keyshortcuts="Control+P">Print<span class="menu__shortcut" aria-hidden="true">Ctrl P</span></button></div>
```

### checkable
Radio items pick one option; checkbox items toggle a setting. The check mark (`.menu__check`) is always in the markup and only shows when `aria-checked="true"`, so labels stay aligned.
```html
<div class="menu" role="menu" aria-label="View options"><p class="menu__label" id="menu-sort">Sort notes by</p><div role="group" aria-labelledby="menu-sort"><button class="menu__item" type="button" role="menuitemradio" aria-checked="true"><svg class="icon icon--sm menu__check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Last edited</button><button class="menu__item" type="button" role="menuitemradio" aria-checked="false"><svg class="icon icon--sm menu__check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Title</button><button class="menu__item" type="button" role="menuitemradio" aria-checked="false"><svg class="icon icon--sm menu__check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Due date</button></div><hr class="menu__divider" role="separator"><button class="menu__item" type="button" role="menuitemcheckbox" aria-checked="false"><svg class="icon icon--sm menu__check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Show archived notes</button></div>
```

### danger
The destructive item goes last, below a divider, and names what it removes.
```html
<div class="menu" role="menu" aria-label="Northwind settings"><button class="menu__item" type="button" role="menuitem"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5v10M7.5 10.5 12 15l4.5-4.5M5 19.5h14"/></svg>Export as PDF</button><button class="menu__item" type="button" role="menuitem"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 4.5h-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3M15 8l4 4-4 4M19 12H9.5"/></svg>Leave Northwind</button><hr class="menu__divider" role="separator"><button class="menu__item menu__item--danger" type="button" role="menuitem"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 12.5h9l1-12.5M10 11v5M14 11v5"/></svg>Delete Northwind</button></div>
```

### more disclosure
A `<details class="more">` that works without script. It is a disclosure of links, not an ARIA menu: the surface is a named `role="group"` and Tab moves through it.
```html
<details class="more" open><summary class="btn btn--quiet btn--sm" aria-label="More actions for Daniel Reyes">More <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></summary><div class="menu more__menu" role="group" aria-label="More actions for Daniel Reyes"><a class="menu__item" href="#">Message Daniel</a><a class="menu__item" href="#">View Daniel's projects</a><hr class="menu__divider"><a class="menu__item menu__item--danger" href="#">Remove Daniel from Northwind</a></div></details>
```

## Sizes

N/A: one size. Items are 44px rows so every action is a comfortable touch target; the surface is at least
15rem wide and grows to its longest label.

## States

Hover and keyboard focus on an item add a linen wash (`--color-bg-subtle`); focus also draws the sage ring.
Active (pressed) deepens the wash to the sage tint. A danger item keeps its red label on hover and takes the
danger background. Disabled items stay in the list, and in the arrow-key order, with `aria-disabled="true"`
and the disabled text role, so people learn the action exists. Checked radio and checkbox items show the
check mark in the accent text role.

### actions / disabled
```html
<div class="menu" role="menu" aria-label="Northwind actions"><button class="menu__item" type="button" role="menuitem"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>Rename</button><button class="menu__item" type="button" role="menuitem"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5v-2a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/></svg>Duplicate</button><button class="menu__item" type="button" role="menuitem" aria-disabled="true"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>Copy link</button><button class="menu__item" type="button" role="menuitem"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="4" rx="1"/><path d="M5 8.5V18a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 18V8.5M10 12.5h4"/></svg>Archive</button></div>
```

### account / disabled
```html
<div class="menu" role="menu" aria-label="Your account"><div class="menu__header" role="presentation"><p class="rows__title">Amara Osei</p><p class="rows__meta">Product designer · amara@example.com</p></div><a class="menu__item" role="menuitem" href="#"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.8-4 3.6-6 7-6s6.2 2 7 6"/></svg>Your profile</a><a class="menu__item" role="menuitem" href="#"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18"/></svg>Settings</a><a class="menu__item" role="menuitem" aria-disabled="true"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="M3.5 10h17M7 14.5h3"/></svg>Billing</a><hr class="menu__divider" role="separator"><a class="menu__item" role="menuitem" href="#"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 4.5h-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3M15 8l4 4-4 4M19 12H9.5"/></svg>Sign out</a></div>
```

### checkable / disabled
```html
<div class="menu" role="menu" aria-label="View options"><p class="menu__label" id="menu-sort-off">Sort notes by</p><div role="group" aria-labelledby="menu-sort-off"><button class="menu__item" type="button" role="menuitemradio" aria-checked="true"><svg class="icon icon--sm menu__check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Last edited</button><button class="menu__item" type="button" role="menuitemradio" aria-checked="false"><svg class="icon icon--sm menu__check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Title</button><button class="menu__item" type="button" role="menuitemradio" aria-checked="false" aria-disabled="true"><svg class="icon icon--sm menu__check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Due date</button></div><hr class="menu__divider" role="separator"><button class="menu__item" type="button" role="menuitemcheckbox" aria-checked="false"><svg class="icon icon--sm menu__check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Show archived notes</button></div>
```

## Responsive

The surface opens below its trigger and is aligned to the trigger's nearer edge, flipping above it when there is
no room below. It never grows wider than the viewport minus the page margin; long labels wrap rather than
truncate. Below 40rem, a menu of more than five items, or one opened from the bottom of the screen, may open as a
bottom [sheet](drawer.html) with the same items. At 768px and 1024px and up nothing else changes.

## Theming

Every colour reads a semantic role. In dark mode the surface is the raised charcoal, the wash is a lighter
charcoal and the danger label turns light coral; the shadow is deeper so the panel still lifts from the page.
There are no component knobs; tint the surface by changing `--color-bg-surface-raised`.

## Accessibility

**Role:** the trigger is a `<button>` with `aria-haspopup="menu"`, `aria-expanded` and `aria-controls`. The
surface is `role="menu"` named by `aria-label` or by the trigger (`aria-labelledby`). Items are `menuitem`,
`menuitemradio` or `menuitemcheckbox` with `aria-checked`; dividers are `role="separator"`; group labels name
a `role="group"`. The `.more` disclosure is a list of plain links in a named group, not an ARIA menu. This
follows the WAI-ARIA APG menu button pattern; CSS alone gives none of the keyboard behaviour below.

| Key | Effect |
|---|---|
| Enter, Space, Down Arrow (on the trigger) | Opens the menu and focuses the first enabled item. |
| Up Arrow (on the trigger) | Opens the menu and focuses the last item. |
| Down Arrow / Up Arrow | Moves to the next or previous item, wrapping at the ends. Disabled items are focusable but do nothing. |
| Home / End | Moves to the first or last item. |
| A letter key | Moves to the next item whose label starts with that letter. |
| Enter | Activates the item and closes the menu. |
| Space | Toggles a checkbox or radio item and keeps the menu open; activates any other item. |
| Escape | Closes the menu and returns focus to the trigger. |
| Tab | Closes the menu and moves focus to the next control after the trigger. |

**Focus:** focus moves into the menu when it opens (roving `tabindex="-1"` on items) and always returns to
the trigger when it closes. The 2px `--color-focus-ring` sits inside the surface's padding, so it is never
clipped.

**Labelling:** the trigger names the object, never just "More": `aria-label="More actions for Northwind"`.
Icons are decorative. Shortcut hints are `aria-hidden` and repeated as `aria-keyshortcuts` on the item. Use
`aria-disabled="true"`, not `disabled`, so a disabled item is still announced.

**Motion:** items change colour at once, so the highlight never lags behind the arrow keys. If the app animates
the surface open, use the shared `settle` entrance over `--duration-slow`; reduced motion removes it and the menu
appears at once.

**Touch:** items are 44px tall and span the full surface width. A tap outside the surface closes it; nothing
depends on hover.

## Content

Start each item with a verb and keep it to three words: **Rename**, **Copy link**, **Export as PDF**. Name the
object on destructive items: **Delete Northwind**, **Remove Daniel from Northwind**, not "Delete". Use sentence
case and no full stops. Add an ellipsis only when the item opens a dialog that asks for more input
(**Move to…**). Order items by frequency, keep related items together, and put the destructive item last.
Write shortcuts as people press them on the platform: **Ctrl Z** on Windows and Linux, **⌘ Z** on macOS.

## Do and don't

### Do
Set the destructive action apart: last, under a divider, naming what it deletes.
```html
<div class="menu" role="menu" aria-label="Northwind actions"><button class="menu__item" type="button" role="menuitem">Rename</button><button class="menu__item" type="button" role="menuitem">Duplicate</button><hr class="menu__divider" role="separator"><button class="menu__item menu__item--danger" type="button" role="menuitem">Delete Northwind</button></div>
```

### Don't
Bury a destructive action between everyday ones, with a label that hides its consequence.
```html
<div class="menu" role="menu" aria-label="Northwind actions"><button class="menu__item" type="button" role="menuitem">Rename</button><button class="menu__item menu__item--danger" type="button" role="menuitem">Delete</button><button class="menu__item" type="button" role="menuitem">Duplicate</button></div>
```

### Do
Use a menu for actions on one thing. Short labels, one verb each.
```html
<div class="menu" role="menu" aria-label="Field Day actions"><button class="menu__item" type="button" role="menuitem">Edit details</button><button class="menu__item" type="button" role="menuitem">Copy invite link</button><button class="menu__item" type="button" role="menuitem">Add to calendar</button></div>
```

### Don't
Put site navigation in an ARIA menu; it removes links from the Tab order. Use navigation links instead.
```html
<div class="menu" role="menu" aria-label="Site"><a class="menu__item" role="menuitem" href="#">Projects</a><a class="menu__item" role="menuitem" href="#">Notes</a><a class="menu__item" role="menuitem" href="#">Gatherings</a></div>
```

### Do
Keep a disabled item in place so people learn the action exists, and say why in a trailing hint.
```html
<div class="menu" role="menu" aria-label="Northwind actions"><button class="menu__item" type="button" role="menuitem">Duplicate</button><button class="menu__item" type="button" role="menuitem" aria-disabled="true">Copy link<span class="menu__shortcut">Sharing is off</span></button><button class="menu__item" type="button" role="menuitem">Archive</button></div>
```

### Don't
Hide the only way to sign out behind an unlabelled icon.
```html
<button class="icon-btn" type="button" aria-haspopup="menu" aria-label="Open"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/></svg></button>
```

## Tokens

The surface reads the raised surface, default border and `--shadow-3`; items read the subtle and accent-subtle
washes, the danger roles and `--target-comfortable` for row height.

## Code

Render the menu in a popover layer next to its trigger (`.menu-anchor` under the top bar, or `.more__menu`
inside a `.more` disclosure). Add `.menu__item--danger` for destructive items, `.menu__check` inside checkable
items, and `aria-disabled="true"` to disable an item.
