---
title: Top bar
tier: core
order: 32
summary: The bar across the top of every page. Brand on the left, a few quiet links, the person's actions on the right, and one hairline beneath.
selector: .header
target: .nav__link
states: default, hover, focus, current
matrix-variants: signed out
contrast: --color-fg-muted|--color-bg-canvas|4.5; --color-fg-default|--color-bg-canvas|4.5; --color-accent|--color-bg-canvas|3; --color-fg-on-accent|--color-accent|4.5; --color-focus-ring|--color-bg-canvas|3
---

## Overview

The top bar is the one piece of navigation on every page: the [brand](brand.html) that links home, three to five
primary destinations, and the actions that belong to the person, such as sign in, messages or their account.
It sits on the page canvas with no fill, separated by a single hairline. Keep it short: section navigation
belongs in [tabs](tabs.html) or a [sidebar navigation](sidebar-navigation.html), and page actions belong in the
[page header](page-header.html). Below 64rem the links fold into a Menu button that opens them as a sheet.

## Anatomy

1. **Bar** — `header.header` around `.header__inner`: 72px tall, aligned to the page container by `.wrap` (on either element), with a hairline bottom border.
2. **Brand** — the [brand](brand.html) lockup, first after the skip link.
3. **Primary navigation** — `nav.nav` with `.nav__link` items; the current page gets a small sage dot beneath its label.
4. **Actions** — `.header__actions`, pushed to the trailing edge: text and primary buttons when signed out; icon buttons with counts and the account button when signed in.
5. **Menu button** — `.menu-btn`, shown below 64rem; it opens the navigation as a popover sheet.

```html
<header class="header wrap"><div class="header__inner"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a><nav class="nav" id="nav-anatomy" popover aria-label="Primary"><ul class="nav__list"><li><a class="nav__link" href="#" aria-current="page">Projects</a></li><li><a class="nav__link" href="#">Notes</a></li><li><a class="nav__link" href="#">Gatherings</a></li></ul><button type="button" class="btn btn--quiet nav__close" popovertarget="nav-anatomy" popovertargetaction="hide">Close menu</button></nav><div class="header__actions"><a class="icon-btn" href="#" aria-label="Notifications, 3 unread"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/></svg><span class="icon-btn__count" aria-hidden="true">3</span></a><button type="button" class="menu-btn" popovertarget="nav-anatomy" aria-label="Menu"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg><span class="menu-btn__label">Menu</span></button></div></div></header>
```

## Variants

### signed out
Marketing and public pages: product links, a text Sign in and one primary call to action.
```html
<header class="header wrap"><div class="header__inner"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a><nav class="nav" id="nav-out" popover aria-label="Primary"><ul class="nav__list"><li><a class="nav__link" href="#">Features</a></li><li><a class="nav__link" href="#">Pricing</a></li><li><a class="nav__link" href="#">Changelog</a></li></ul><button type="button" class="btn btn--quiet nav__close" popovertarget="nav-out" popovertargetaction="hide">Close menu</button></nav><div class="header__actions"><a class="btn btn--text header__signin" href="#">Sign in</a><a class="btn btn--primary btn--sm" href="#">Get started</a><button type="button" class="menu-btn" popovertarget="nav-out" aria-label="Menu"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg><span class="menu-btn__label">Menu</span></button></div></div></header>
```

### signed in
Inside the product: the current section carries the sage dot; icon buttons announce their unread counts; the
account button opens the account [menu](menu.html). `.header__link` highlights one timely thing.
```html
<header class="header wrap"><div class="header__inner"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a><nav class="nav" id="nav-in" popover aria-label="Primary"><ul class="nav__list"><li><a class="nav__link" href="#" aria-current="page">Projects</a></li><li><a class="nav__link" href="#">Notes</a></li><li><a class="nav__link" href="#">Gatherings</a></li></ul><button type="button" class="btn btn--quiet nav__close" popovertarget="nav-in" popovertargetaction="hide">Close menu</button></nav><div class="header__actions"><a class="header__link" href="#"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 16h-5.5L7 19.5V16a2.5 2.5 0 0 1-2.5-2.5z"/></svg>2 new replies</a><a class="icon-btn" href="#" aria-label="Notifications, 3 unread"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/></svg><span class="icon-btn__count" aria-hidden="true">3</span></a><button type="button" class="avatar-btn" aria-haspopup="menu" aria-expanded="false" aria-label="Your account, Amara Osei"><img class="avatar" src="../assets/photos/amara-osei.jpg" width="40" height="40" alt=""><span>Amara</span></button><button type="button" class="menu-btn" popovertarget="nav-in" aria-label="Menu"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg><span class="menu-btn__label">Menu</span></button></div></div></header>
```

### with search
For products where finding comes first. `.header__search` grows between the brand and the actions, and wraps to
its own row on phones.
```html
<header class="header wrap"><div class="header__inner"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a><form class="search header__search" role="search" action="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg><label class="vh" for="bar-search">Search notes, projects and people</label><input class="search__input" id="bar-search" name="q" type="search" placeholder="Search notes and people" autocomplete="off"></form><div class="header__actions"><a class="icon-btn" href="#" aria-label="Messages, 1 unread"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 16h-5.5L7 19.5V16a2.5 2.5 0 0 1-2.5-2.5z"/></svg><span class="icon-btn__count" aria-hidden="true">1</span></a><button type="button" class="avatar-btn" aria-haspopup="menu" aria-expanded="false" aria-label="Your account, Daniel Reyes"><img class="avatar" src="../assets/photos/daniel-reyes.jpg" width="40" height="40" alt=""><span>Daniel</span></button></div></div></header>
```

### compact
`.header--compact` keeps the Menu button at every width. Use it in focused shells where a sidebar already holds
the section navigation, or where the bar must stay to one short row.
```html
<header class="header header--compact wrap"><div class="header__inner"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a><nav class="nav" id="nav-compact" popover aria-label="Primary"><ul class="nav__list"><li><a class="nav__link" href="#">Projects</a></li><li><a class="nav__link" href="#" aria-current="page">Notes</a></li><li><a class="nav__link" href="#">Gatherings</a></li><li><a class="nav__link" href="#">People</a></li></ul><button type="button" class="btn btn--quiet nav__close" popovertarget="nav-compact" popovertargetaction="hide">Close menu</button></nav><div class="header__actions"><a class="btn btn--primary btn--sm" href="#">New note</a><button type="button" class="menu-btn" popovertarget="nav-compact" aria-label="Menu"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg><span class="menu-btn__label">Menu</span></button></div></div></header>
```

### minimal
For flows that should not be left by accident: sign-up, onboarding, checkout. No navigation; one clear way out.
```html
<header class="header wrap"><div class="header__inner"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a><div class="header__actions"><a class="btn btn--quiet btn--sm" href="#">Save and exit</a></div></div></header>
```

## Sizes

N/A: one size. The bar is `--layout-topbar-height` (72px) at every width; nav links are 44px tall at desktop
and in the sheet, and every action keeps a 44px target.

## States

The matrix shows the primary links, where the bar's own states live. A link is muted at rest; hover lifts it to
the default text role (and adds a linen wash in the mobile sheet); keyboard focus draws the sage ring. The
current page keeps the default text role and gains a 4px sage dot beneath its label, with
`aria-current="page"`. Icon buttons, the account button and the Menu button follow [button](button.html):
a linen wash on hover and the shared ring on focus. When the sheet is open, the page behind takes the backdrop.

### default
```html
<nav aria-label="Primary"><ul class="nav__list"><li><a class="nav__link" href="#" aria-current="page">Home</a></li><li><a class="nav__link" href="#">Notes</a></li><li><a class="nav__link" href="#">People</a></li></ul></nav>
```

### hover
```html
<nav aria-label="Primary"><ul class="nav__list"><li><a class="nav__link" href="#" aria-current="page">Home</a></li><li><a class="nav__link" href="#" data-state="hover">Notes</a></li><li><a class="nav__link" href="#">People</a></li></ul></nav>
```

### focus
```html
<nav aria-label="Primary"><ul class="nav__list"><li><a class="nav__link" href="#" aria-current="page">Home</a></li><li><a class="nav__link" href="#" data-state="focus">Notes</a></li><li><a class="nav__link" href="#">People</a></li></ul></nav>
```

### current
```html
<nav aria-label="Primary"><ul class="nav__list"><li><a class="nav__link" href="#">Home</a></li><li><a class="nav__link" href="#" aria-current="page">Notes</a></li><li><a class="nav__link" href="#">People</a></li></ul></nav>
```

## Responsive

- **360px:** brand, the primary call to action or the account button, and an icon-only Menu button (the label
  hides below 30rem). Sign in, `.header__link` and the nav links move into the sheet. A `.header__search` wraps to
  a full-width second row.
- **768px:** the same bar, with the Menu button's label visible and the search back on the first row.
- **1024px and up:** the nav links sit inline after the brand, Sign in and `.header__link` appear, the account
  button shows the first name, and the Menu button and the sheet's Close button disappear. `.header--compact`
  keeps the Menu button and the sheet at every width.

The sheet opens from the top as a popover with `--shadow-4` over `--color-bg-backdrop`, inset `--space-3` from the
viewport edges.

## Theming

The bar has no fill; it takes the page canvas and the default border role, so it needs no dark-mode rules. In dark
mode the current-page dot and the primary button turn light sage, and the sheet uses the raised charcoal surface.

## Accessibility

**Role:** `<header>` (the banner landmark when it is a direct child of `<body>`) containing a `<nav aria-label="Primary">`
of plain links. The Menu button is a native `<button popovertarget>`, which exposes `aria-expanded` for free; the
sheet is the same `<nav>` with the `popover` attribute, so there is one list of links, not two.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves through the skip link, brand, nav links and actions in visual order. |
| Enter | Follows a link or activates a button. |
| Enter, Space (Menu button) | Opens the navigation sheet; focus stays on the button and Tab moves into the links. |
| Escape | Closes the open sheet (light dismiss) and returns focus to the Menu button. |

**Focus:** every link and button shows the 2px `--color-focus-ring`, offset 3px. Nothing in the bar is
`position: sticky` by default; if a product makes it sticky, give `main` a matching `scroll-margin-top`.

**Labelling:** name the nav "Primary". Icon buttons carry their count in the name ("Notifications, 3 unread") and hide
the visual badge with `aria-hidden`. The account button names the person ("Your account, Amara Osei") and announces
`aria-haspopup="menu"`. Mark the current link with `aria-current="page"`, never with colour alone.

**Motion:** link colours change over 240ms and the sheet settles in over 640ms; reduced motion removes both.

**Touch:** every link and action is at least 44px tall. The sheet's Close menu button spans its full width.

## Content

Use nouns for destinations, in sentence case and one or two words: **Projects**, **Notes**, **Gatherings**. Keep to
five links. Signed out, pair **Sign in** with one invitation: **Get started**, never two primary buttons. A
`.header__link` states something new and specific: **2 new replies**, not "Activity". Use the first name on the
account button: **Amara**.

## Do and don't

### Do
Keep the bar short: three to five destinations and one primary action.
```html
<header class="header wrap"><div class="header__inner"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a><div class="header__actions"><a class="btn btn--primary btn--sm" href="#">Get started</a></div></div></header>
```

### Don't
Crowd the bar with every section and two competing calls to action.
```html
<header class="header wrap"><div class="header__inner"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a><div class="header__actions"><a class="btn btn--primary btn--sm" href="#">Try free</a><a class="btn btn--primary btn--sm" href="#">Book a demo</a></div></div></header>
```

### Do
Put the count in the icon button's name, and hide the visual badge from assistive technology.
```html
<a class="icon-btn" href="#" aria-label="Notifications, 3 unread"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/></svg><span class="icon-btn__count" aria-hidden="true">3</span></a>
```

### Don't
Leave an icon button unnamed or name it by its shape; "Bell" says nothing about what is waiting.
```html
<a class="icon-btn" href="#" aria-label="Bell"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/></svg><span class="icon-btn__count">3</span></a>
```

## Tokens

The bar reads `--layout-topbar-height`, the default border and the canvas; links read the muted and default text roles
and the accent for the current dot; the sheet reads the raised surface, `--shadow-4` and the backdrop.

## Code

Put `.wrap` on the `<header>` or on `.header__inner`; both align the bar to the page container. One
`<nav class="nav" popover>` serves both layouts: inline at 64rem and up, a sheet below. Point the Menu button and
the sheet's Close button at its id with `popovertarget`. Add `.header--compact` to keep the sheet at every width and
`.header__search` to a `.search` form to give it the flexible slot.
