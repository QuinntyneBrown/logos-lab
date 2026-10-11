---
title: Empty and error states
order: 30
summary: When there is nothing to show, say why in one calm sentence and offer the one next step that helps.
selector: .empty, .error-page
components: empty-state, error-page, alert, button, search-filter-toolbar
---

## Overview

Absence is a state of the page, not a failure of it. Keep the page around it (header, title, filters) and
put a short, warm explanation where the content would have been, with one action that changes the
situation. Different reasons for emptiness need different words and different actions, so name the reason.

| Situation | Title | Primary action |
|---|---|---|
| **First use:** nothing created yet | No projects yet | Create a project |
| **No results:** search or filters exclude everything | No notes match "harbour budget" | Clear filters |
| **All done:** a queue that has been worked through | You're all caught up | none, or a link back |
| **Couldn't load:** the request failed | We couldn't load your notes | Try again |
| **No access:** the person can't see this | This notebook is private | Ask for access |
| **Gone:** the page doesn't exist | We can't find that page | Go to your home page |

Use the [empty state](../components/empty-state.html) inside a page region and the
[error page](../components/error-page.html) when the whole route can't be shown.

## When to use

- **A collection is empty** on first use, after filtering, or after everything has been handled.
- **A region failed to load** while the rest of the page is fine: show the error in that region only.
- **The whole route fails** (not found, no access, server error, offline): use an error page inside the
  normal shell, so navigation still works.
- **Not** for a single empty field or value; show an em dash or "Not set" in place, without a panel.

## Structure

Inside the region: an icon tile, a title, one sentence of explanation, then one primary action and at most
one quiet alternative. Keep the region's header and controls above it.

### First use

```html
<section class="stack" aria-labelledby="es-first-title">
  <div class="cluster cluster--between"><h4 id="es-first-title">Projects</h4><button class="btn btn--sm" type="button">New project</button></div>
  <div class="empty">
    <span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h3l2 2h6A2.5 2.5 0 0 1 20 9.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z"/></svg></span>
    <h4 class="empty__title">No projects yet</h4>
    <p>Projects keep a team's notes, people and dates together. Start one and invite whoever you work with.</p>
    <div class="empty__actions"><button class="btn btn--primary" type="button">Create a project</button><a class="btn btn--quiet" href="#">See how projects work</a></div>
  </div>
</section>
```

### No results

Keep the search and filters visible above the message so the person can see, and undo, what excluded
everything.

```html
<section class="stack" aria-labelledby="es-nr-title">
  <h4 id="es-nr-title" class="vh">Search results</h4>
  <div class="toolbar toolbar--stacked">
    <form class="search" role="search" action="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg><input class="search__input" type="search" value="harbour budget" aria-label="Search notes"><button class="btn btn--primary btn--sm" type="submit">Search</button></form>
    <p class="toolbar__count" role="status"><strong>0</strong> notes</p>
  </div>
  <div class="empty empty--compact">
    <span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg></span>
    <h4 class="empty__title">No notes match "harbour budget"</h4>
    <p>Only notes in Harbour Notes from the last 30 days are included. Try a shorter phrase or a wider date range.</p>
    <div class="empty__actions"><button class="btn btn--primary" type="button">Clear filters</button><button class="btn btn--quiet" type="button">Search all notebooks</button></div>
  </div>
</section>
```

### Couldn't load a region

```html
<div class="empty empty--error" role="alert">
  <span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg></span>
  <h4 class="empty__title">We couldn't load your notes</h4>
  <p>Nothing has been lost. This is usually a short connection problem.</p>
  <div class="empty__actions"><button class="btn btn--primary" type="button">Try again</button></div>
</div>
```

### The whole route

```html
<div class="error-page">
  <p class="error-page__code" aria-hidden="true">404</p>
  <h4 class="error-page__title">We can't find that page</h4>
  <p class="error-page__text">The link may be old, or the page may have moved. Everything you've saved is still where you left it.</p>
  <div class="error-page__actions"><a class="btn btn--primary" href="#">Go to your home page</a><a class="btn btn--quiet" href="#">Search {{app}}</a></div>
</div>
```

## States

- **First use** invites creation and explains, in one sentence, what the thing is for.
- **No results** names the query or filters, says what was searched, and offers to clear them.
- **All done** is calm and brief, with no call to action unless there is a real next thing.
- **Couldn't load** keeps controls and context in place and offers **Try again**. After a second failure, add
  a way to report it.
- **No access** explains who can see it and how to ask; never pretend the page is missing when it isn't.
- **Offline** says what still works and that changes wait on the page until the connection returns.

```html
<div class="empty empty--compact">
  <span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span>
  <h4 class="empty__title">You're all caught up</h4>
  <p>New comments on Northwind and Harbour Notes will appear here.</p>
</div>
```

```html
<div class="empty">
  <span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg></span>
  <h4 class="empty__title">Harbour Notes is private</h4>
  <p>Only people Hannah Kowalski has shared it with can read it. Ask for access and you'll get an email with the answer.</p>
  <div class="empty__actions"><button class="btn btn--primary" type="button">Ask for access</button><a class="btn btn--quiet" href="#">Back to notebooks</a></div>
</div>
```

## Responsive

- **360px:** the panel spans the column with comfortable padding; actions wrap and may stack. Keep the icon
  tile small; never add a large illustration that pushes the action below the fold.
- **768px:** the message stays centred at a short measure (about 30rem) so lines stay easy to read.
- **1024px and up:** an empty region sits where the content would be, in the same column. Don't let it
  stretch across side columns. An error page aligns with the page's left edge like any page title.

## Accessibility

**Headings:** the empty title is a real heading at the right level for its region, so it appears in the
page outline.

**Focus:** don't move focus when a region turns out to be empty in the background. After a person clears
filters or retries, keep focus on the control they used. On a full error route, focus moves to the page
heading like any navigation.

**Announcements:** a result count that changes to zero lives in a `role="status"` region ("0 notes").
A region that fails after load uses `role="alert"` once.

**Not colour alone:** the error tile is tinted, but the title says what happened in words.

**Decorative icons:** `aria-hidden="true"`. The error page's large code is hidden from assistive technology
because the title already says it.

## Content

- **Title:** what is true now, in plain words: "No projects yet", "We couldn't load your notes". Not "Nothing
  here!" and not "Error 500".
- **Sentence:** why, and what will make it change. One sentence, two at most.
- **Action:** a verb and an object that fixes this exact situation: **Create a project**, **Clear filters**,
  **Try again**, **Ask for access**.
- **Reassure** when something failed: "Nothing has been lost." Never blame the person or the network by name.
- Error codes are for support, not for headlines; put them in small print if they help.

## Do and don't

### Do
Name what's missing and offer the action that fills it.
```html
<div class="empty empty--compact"><h4 class="empty__title">No gatherings planned</h4><p>Plan one and everyone on Northwind gets an invitation.</p><div class="empty__actions"><button class="btn btn--primary" type="button">Plan a gathering</button></div></div>
```

### Don't
Leave a blank region or a bare "No data".
```html
<div class="empty empty--compact"><p>No data.</p></div>
```

### Do
Keep the search and filters on screen when nothing matches.
```html
<div class="stack"><div class="cluster"><span class="pill pill--accent">Owner: Grace Liu</span><span class="pill pill--accent">Last 7 days</span></div><div class="empty empty--compact"><h4 class="empty__title">No notes match these filters</h4><div class="empty__actions"><button class="btn btn--primary" type="button">Clear filters</button></div></div></div>
```

### Don't
Offer Try again when retrying can't help, such as for missing access.
```html
<div class="empty empty--error empty--compact"><h4 class="empty__title">Error 403</h4><p>Something went wrong.</p><div class="empty__actions"><button class="btn btn--primary" type="button">Try again</button></div></div>
```
