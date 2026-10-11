---
title: Error page
tier: core
order: 67
summary: When a whole screen cannot be shown, say so calmly, say what is safe, and offer the next step. A large quiet number, a plain title and a way out.
selector: .error-page
layout: block
target: .error-page
states: default
contrast: --color-fg-subtle|--color-bg-canvas|3; --color-fg-default|--color-bg-canvas|4.5; --color-fg-muted|--color-bg-canvas|4.5
---

## Overview

An error page replaces the whole main content when the screen cannot be shown: the page does not exist
(404), the person may not see it (403), something broke on our side (500), the device is offline, or
the service is down for planned work. The top bar and footer stay, so people are never stranded. For a
part of the page that failed, use an [empty state](empty-state.html) in its error form; for a problem
people can fix in place, use an [alert](alert.html).

## Anatomy

1. **Code or icon** — the status number in the light display face, subtle and decorative; or an icon tile when there is no number (offline, maintenance).
2. **Title** — the page's single `h1`, saying what happened in plain words.
3. **Text** — one or two sentences in the large body style: why, what is safe, what to do.
4. **Actions** — a primary way forward and at most two quiet alternatives; on a 404, a search field.

```html
<div class="error-page"><p class="error-page__code" aria-hidden="true">404</p><h1 class="error-page__title">We can't find that page</h1><p class="error-page__text">The link may be old, or the page may have moved.</p><div class="error-page__actions"><a class="btn btn--primary" href="#">Go to your workspace</a></div></div>
```

## Variants

### not found
A 404. Offer search and the two most likely places to go.
```html
<div class="error-page"><p class="error-page__code" aria-hidden="true">404</p><h1 class="error-page__title">We can't find that page</h1><p class="error-page__text">The link may be old, or the page may have moved. Search Northwind, or go back to where you were.</p><form class="search" role="search"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg><label class="vh" for="nf-q">Search Northwind</label><input class="search__input" id="nf-q" name="q" type="search" placeholder="Notes, tasks or people" autocomplete="off"><button class="btn btn--primary" type="submit">Search</button></form><div class="error-page__actions"><a class="btn btn--quiet" href="#">Go to your workspace</a><a class="btn btn--quiet" href="#">Open Harbour Notes</a></div></div>
```

### forbidden
A 403. The page exists, but this person cannot see it. Say who can help.
```html
<div class="error-page"><p class="error-page__code" aria-hidden="true">403</p><h1 class="error-page__title">This page is private</h1><p class="error-page__text">Northwind's billing settings are open to its owners only. Caleb Morgan can give you access.</p><div class="error-page__actions"><button class="btn btn--primary" type="button">Ask Caleb for access</button><a class="btn btn--quiet" href="#">Back to Northwind</a></div></div>
```

### server error
A 500. It is our fault; say so, and say the work is safe.
```html
<div class="error-page"><p class="error-page__code" aria-hidden="true">500</p><h1 class="error-page__title">Something went wrong on our side</h1><p class="error-page__text">We've been told and are looking into it. Everything you saved is safe. Try again in a minute.</p><div class="error-page__actions"><button class="btn btn--primary" type="button">Try again</button><a class="btn btn--quiet" href="#">Go to your workspace</a></div><p class="muted">Reference NW-5021 · if you write to us, include this.</p></div>
```

### offline
No code: an icon tile instead. Reassure people that what they wrote is kept.
```html
<div class="error-page"><span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 3.5 20.5 20.5"/><path d="M8.5 15.5a5 5 0 0 1 4-1.4M5 12a9 9 0 0 1 3.5-2M19 12a9 9 0 0 0-6-3"/><path d="M12 19h.01"/></svg></span><h1 class="error-page__title">You're offline</h1><p class="error-page__text">We can't reach the internet right now. We'll reconnect on our own and keep what you were writing. Nothing is sent until you send it.</p><div class="error-page__actions"><button class="btn btn--primary" type="button">Try again</button></div></div>
```

### maintenance
Planned downtime. Give the end time and where to follow along.
```html
<div class="error-page"><span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg></span><h1 class="error-page__title">Back at 3:00 am</h1><p class="error-page__text">Northwind is closed for planned maintenance on Saturday 10 October, 2:00 to 3:00 am ET. Your notes and tasks are safe.</p><div class="error-page__actions"><a class="btn btn--quiet" href="#">Status updates</a></div></div>
```

## Sizes

N/A: one layout. The error page takes the main column with generous vertical space and keeps its text to
the reading measure.

## States

An error page is a state of the whole screen, so it has none of its own. Its actions follow the
[button](button.html) states; "Try again" becomes busy while it retries, and the page is replaced by the
real screen when it succeeds.

## Responsive

At 360px the code shrinks with the display scale, the search field takes the full width and the actions
wrap, one per line if needed. From 768px actions sit in one row. Content stays left-aligned at every width,
under the top bar, so it reads like the rest of the product.

## Theming

The code reads `--color-fg-subtle`, the title `--color-fg-default` and the text `--color-fg-muted`, all on
the canvas, each with a dark value. The icon tile reads the accent-subtle pair.

## Accessibility

**Role:** an ordinary page: one `<h1 class="error-page__title">` inside `<main>`, and the document
`<title>` repeats it ("We can't find that page · Northwind"). The server returns the real status code. The
big number is `aria-hidden="true"`; the title says the same thing in words.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves through the skip link, top bar, search and actions in order. |
| Enter | Submits the search or follows an action. |

**Focus:** on a client-side route change to an error page, move focus to the `h1` (with
`tabindex="-1"`), as for any new page. Never trap focus.

**Labelling:** the search field has a label ("Search Northwind"); actions name where they go ("Back to
Northwind").

**Motion:** none. The offline page may retry quietly in the background; it never animates.

**Touch:** actions are 44px buttons with at least 12px between them.

## Content

Plain words, no codes in the title, no jokes: **We can't find that page**, **This page is private**,
**Something went wrong on our side**, **You're offline**, **Back at 3:00 am**. The text says why, what is
safe, and what to do. Use "we" for our failures; never blame the link-follower. Give a reference only on
server errors, labelled so people know when to use it.

## Do and don't

### Do
Say what is safe and offer the next step.
```html
<div class="error-page"><h1 class="error-page__title">Something went wrong on our side</h1><p class="error-page__text">Everything you saved is safe. Try again in a minute.</p><div class="error-page__actions"><button class="btn btn--primary" type="button">Try again</button></div></div>
```

### Don't
A bare code and technical text with no way out.
```html
<div class="error-page"><p class="error-page__code">500</p><h1 class="error-page__title">Internal Server Error</h1><p class="error-page__text">An unhandled exception occurred while processing the request.</p></div>
```

### Do
On a 404, help people find what they wanted.
```html
<div class="error-page"><h1 class="error-page__title">We can't find that page</h1><div class="error-page__actions"><a class="btn btn--primary" href="#">Go to your workspace</a><a class="btn btn--quiet" href="#">Open Harbour Notes</a></div></div>
```

### Don't
Blame and jokes do not help someone who is lost.
```html
<div class="error-page"><h1 class="error-page__title">Oops! You took a wrong turn</h1><p class="error-page__text">Looks like you broke the internet.</p></div>
```

## Tokens

Error pages read the display font at `--font-size-5xl`, `--text-h1`, `--text-body-lg`, the subtle,
default and muted text roles, `--layout-measure` and the spacing scale.

## Code

Inside `<main>`, use `.error-page` with an `.error-page__code` (or an `.empty__icon` tile), an `<h1
class="error-page__title">`, `.error-page__text` and `.error-page__actions`. The documentation shows the
title as `h3` because each specimen sits inside this page; production pages use `h1`.
