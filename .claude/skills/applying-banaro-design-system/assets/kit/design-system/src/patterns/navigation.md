---
title: Navigation and page structure
order: 40
summary: Keep every page in the same calm order, so people always know where they are and how to get back.
selector: .header, .breadcrumb, .page-head, .tabs, .sidebar-nav, .settings-nav, .pager, .footer, .skip-link
components: skip-link, brand, top-bar, breadcrumb, page-header, tabs, sidebar-navigation, pagination, footer, layout, link
---

## Overview

Every page is built in the same order: skip link, top bar, page title with its one main action, content,
footer. The top bar names the same few destinations in the same order on every page; the current one is
marked. Detail pages add a [breadcrumb](../components/breadcrumb.html) back to their parent. Peer views of
one object use [tabs](../components/tabs.html); settings and admin areas use a
[side navigation](../components/sidebar-navigation.html).

The specimen below shows the top bar and the start of `main`; in a page the `.skip-link` comes first and
the content sits in `main#main`.

```html
<div>
  <header class="header">
    <div class="header__inner">
      <a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M5 27V14.5L16 5.5l11 9V27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12.5 27v-6.5h7V27" fill="none" stroke="currentColor" stroke-width="1.6"/><circle class="brand__sun" cx="25.5" cy="6.5" r="2.4"/></svg><span>{{app_lower}}</span></a>
      <nav class="nav" aria-label="Primary">
        <ul class="nav__list"><li><a class="nav__link" href="#">Home</a></li><li><a class="nav__link" href="#" aria-current="page">Projects</a></li><li><a class="nav__link" href="#">Notes</a></li><li><a class="nav__link" href="#">Gatherings</a></li></ul>
      </nav>
      <div class="header__actions">
        <a class="icon-btn" href="#" aria-label="Notifications, 3 unread"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/></svg><span class="icon-btn__count" aria-hidden="true">3</span></a>
        <a class="avatar-btn" href="#" aria-label="Your account, Amara Osei"><img class="avatar" src="../assets/photos/amara-osei.jpg" width="40" height="40" alt=""><span>Amara</span></a>
      </div>
    </div>
  </header>
  <div class="stack">
    <nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><a href="#">Projects</a></li><li aria-current="page">Northwind</li></ol></nav>
    <div class="page-head page-head--actions">
      <p class="eyebrow">Project</p>
      <h4 class="page-head__title">Northwind</h4>
      <p class="page-head__sub">Planning the spring field season with 14 people.</p>
      <div class="page-head__actions"><a class="btn btn--quiet" href="#">Share</a><a class="btn btn--primary" href="#">New note</a></div>
    </div>
  </div>
</div>
```

## When to use

- **Top bar:** on every page, signed in or out. Four to six destinations; anything more goes in a menu or a
  section page.
- **Breadcrumb:** on detail and edit pages that sit below a list (Projects / Northwind / Edit). Not on
  top-level pages, where it would only repeat the top bar.
- **Page header:** on every page, with exactly one `h1` and at most one primary action.
- **Tabs:** for two to six peer views of the same object (Overview, Notes, People). Not for steps in a
  sequence; use a [stepper](../components/stepper.html).
- **Side navigation:** for settings and other areas with more than five sections.
- **Pagination:** for long, stable lists people page through; "Show more" for feeds.

## Structure

Source order matches visual order:

1. `.skip-link` → `#main`, the first focusable element on the page.
2. `header.header` with the [brand](../components/brand.html), `nav[aria-label="Primary"]` and account actions.
3. `main#main`, containing an optional breadcrumb, then `.page-head` with eyebrow, title, one-line lead and
   actions.
4. The page's content, in sections that each start with a heading.
5. `footer.footer` with secondary links.

### Peer views with tabs

```html
<div data-demo-tabs>
  <div class="tabs" role="tablist" aria-label="Northwind">
    <button class="tab" type="button" role="tab" id="nv-t1" aria-controls="nv-p1" aria-selected="true">Overview</button>
    <button class="tab" type="button" role="tab" id="nv-t2" aria-controls="nv-p2" aria-selected="false" tabindex="-1">Notes <span class="badge badge--count">12</span></button>
    <button class="tab" type="button" role="tab" id="nv-t3" aria-controls="nv-p3" aria-selected="false" tabindex="-1">People</button>
  </div>
  <div role="tabpanel" id="nv-p1" aria-labelledby="nv-t1"><p class="muted">Northwind is planning the spring field season. The next review is Thu 15 Oct, 2:00 pm.</p></div>
  <div role="tabpanel" id="nv-p2" aria-labelledby="nv-t2" hidden><p class="muted">12 notes, the latest from Daniel Reyes yesterday.</p></div>
  <div role="tabpanel" id="nv-p3" aria-labelledby="nv-t3" hidden><p class="muted">Amara Osei, Daniel Reyes, Grace Liu and 11 others.</p></div>
</div>
```

### Settings with side navigation

```html
<div class="settings-layout">
  <nav class="settings-nav sidebar-nav" aria-label="Settings">
    <a href="#" aria-current="page">Profile</a>
    <a href="#">Notifications</a>
    <a href="#">Privacy</a>
    <a href="#">Account</a>
  </nav>
  <div class="card">
    <h4 class="card__name">Profile</h4>
    <p class="card__text">How you appear to people on your projects.</p>
  </div>
</div>
```

### Paging through a long list

```html
<nav class="pager" aria-label="Pagination">
  <p class="pager__text">Showing 25–48 of 120 notes</p>
  <div class="pager__pages">
    <a class="btn btn--quiet btn--sm" href="#" rel="prev">Previous</a>
    <a class="btn btn--ghost btn--sm" href="#" aria-label="Page 1">1</a>
    <a class="btn btn--ghost btn--sm" href="#" aria-label="Page 2, current page" aria-current="page">2</a>
    <a class="btn btn--ghost btn--sm" href="#" aria-label="Page 3">3</a>
    <a class="btn btn--quiet btn--sm" href="#" rel="next">Next</a>
  </div>
</nav>
```

## States

- **Current:** the active destination carries `aria-current="page"` and shows the small sage dot (top bar),
  the sage underline (tabs) or the tinted row (side navigation). The current breadcrumb item is plain text.
- **Hover and focus:** links gain a linen wash and the shared focus ring; nothing moves.
- **Collapsed:** below 1024px the primary navigation sits behind a **Menu** button that opens a popover; it
  closes on Escape, on selection and with its own **Close menu** button.
- **Counts:** unread counts sit on the icon and are part of the accessible name ("Notifications, 3 unread").
- **Signed out:** the same destinations in the same order, with **Sign in** and **Join** in place of the
  account button.

```html
<header class="header">
  <div class="header__inner">
    <a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M5 27V14.5L16 5.5l11 9V27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12.5 27v-6.5h7V27" fill="none" stroke="currentColor" stroke-width="1.6"/><circle class="brand__sun" cx="25.5" cy="6.5" r="2.4"/></svg><span>{{app_lower}}</span></a>
    <div class="header__actions">
      <a class="btn btn--ghost btn--sm" href="#">Sign in</a>
      <a class="btn btn--primary btn--sm" href="#">Join {{app}}</a>
      <button class="menu-btn" type="button" aria-label="Menu" aria-expanded="false"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg><span class="menu-btn__label">Menu</span></button>
    </div>
  </div>
</header>
```

## Responsive

- **360px:** the brand, account button and a round **Menu** button fill the bar; destinations live in the
  menu popover. Breadcrumbs may show only the nearest parent ("← Projects"). Tabs scroll sideways rather than
  wrap. Settings links become a horizontal scrolling row.
- **768px:** the **Menu** button shows its label. Page header actions move beside the title.
- **1024px and up:** destinations sit inline in the top bar; the menu button disappears. Settings navigation
  becomes a vertical column beside the content.

The page title and its primary action are never hidden behind a menu at any width.

## Accessibility

**Landmarks:** one `header`, one `main` with `id="main"`, one `footer`. Every `nav` has a distinct
`aria-label`: Primary, Breadcrumb, Settings, Pagination, Footer.

**Skip link:** first in the source, visible when focused, and moves focus to `main`.

**Current page:** `aria-current="page"` on the active link, never only a colour change.

**Menus are lists of links:** a navigation popover is a `nav` with a list of links, not `role="menu"`.
Tabs use the full tab pattern (`role="tablist"`, arrow keys move between tabs, Tab moves into the panel).

| Key | Effect |
|---|---|
| Tab | Moves through skip link, top bar, main content, footer, in that order. |
| Enter | Follows a link or opens the Menu popover. |
| Escape | Closes the Menu popover and returns focus to the Menu button. |
| Left / Right arrow | Moves between tabs in a tablist. |

**Focus after navigation:** on a client-side route change, move focus to the new page's `h1` (or to
`main`) and update the document title.

**Touch:** every navigation target is at least 44px tall.

## Content

- **Destinations** are short, plural nouns that match the page titles they lead to: Projects, Notes,
  Gatherings. Use the same words in the top bar, breadcrumbs, page titles and emails.
- **Page titles** name the thing, not the action: "Northwind", "Notifications", "Edit Northwind".
- **Leads** are one sentence of context: "Planning the spring field season with 14 people."
- **Breadcrumbs** use the parent pages' titles exactly.
- Never rename or reorder destinations between signed-out and signed-in pages.

## Do and don't

### Do
Mark the current destination with `aria-current`, so it reads as current to everyone.
```html
<nav class="nav" aria-label="Primary"><ul class="nav__list"><li><a class="nav__link" href="#">Home</a></li><li><a class="nav__link" href="#" aria-current="page">Projects</a></li><li><a class="nav__link" href="#">Notes</a></li></ul></nav>
```

### Don't
Use tabs to move between unrelated pages of the product.
```html
<div class="tabs" role="tablist" aria-label="Site"><button class="tab" type="button" role="tab" aria-selected="true">Projects</button><button class="tab" type="button" role="tab" aria-selected="false">Account settings</button><button class="tab" type="button" role="tab" aria-selected="false">Help centre</button></div>
```

### Do
Link every parent in a breadcrumb, using the parents' real titles.
```html
<nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><a href="#">Notes</a></li><li><a href="#">Harbour Notes</a></li><li aria-current="page">Edit</li></ol></nav>
```

### Don't
Put more than one primary action in the page header.
```html
<div class="page-head__actions"><a class="btn btn--primary btn--sm" href="#">New note</a><a class="btn btn--primary btn--sm" href="#">Invite people</a><a class="btn btn--primary btn--sm" href="#">Plan a gathering</a></div>
```
