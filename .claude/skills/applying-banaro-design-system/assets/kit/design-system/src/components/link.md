---
title: Link
tier: core
order: 12
summary: Go somewhere — an underlined sage word in a sentence, or a standalone link with an arrow that leads on.
selector: .link-standalone, .link-danger
layout: inline
target: a
states: default, hover, focus
apg: link
contrast: --color-fg-link|--color-bg-surface|4.5; --color-fg-link-hover|--color-bg-surface|4.5; --color-fg-link|--color-bg-canvas|4.5; --color-danger-fg|--color-bg-surface|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a link to go somewhere: another page, a section, a file, another site. Use a [button](button.html) to do
something — save, send, delete — even when it should look light (`.btn--text`). Links inside running text
stay underlined so they never depend on colour alone. Standalone links (`.link-standalone`) sit on their own
line at the end of a card or section, set in the label face with an optional icon.

## Anatomy

1. **Text** — says where the link goes, in sentence case.
2. **Underline** — a 1px line offset from the text; it thickens to 2px on hover.
3. **Icon** — optional 16px arrow (leading on), chevron (back) or external glyph, decorative.

```html
<a class="link-standalone" href="#">Open Northwind <svg class="icon link__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></a>
```

## Variants

### inline
A link inside a sentence keeps its underline.
```html
<p>Read the <a href="#">Harbour Notes sharing guide</a> before you invite guests.</p>
```

### standalone
A link on its own, with an arrow that nudges forward on hover.
```html
<a class="link-standalone" href="#">See all notes in Harbour Notes <svg class="icon link__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></a>
```

### back
A leading chevron for returning to the parent page.
```html
<a class="link-standalone" href="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 6-6 6 6 6"/></svg>Back to projects</a>
```

### external
Leaves the product. Say so in the text read by screen readers and show the external glyph.
```html
<a class="link-standalone" href="#" target="_blank" rel="noopener">Field Day park map<span class="vh"> (opens in a new tab)</span> <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5"/><path d="M19 5 11 13"/><path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/></svg></a>
```

### download
Name the file type and size so people know what they will get.
```html
<a class="link-standalone" href="#" download>Download the agenda <span class="muted">(PDF, 240 KB)</span></a>
```

### danger
Leads to a page or dialog that confirms a destructive action. The action itself is a danger button.
```html
<a class="link-standalone link-danger" href="#">Leave Northwind</a>
```

## Sizes

N/A: Links take the size of the text around them. Standalone links use the label style (15px, medium weight).

## States

Hover shifts the colour to the deeper link role and thickens the underline; a standalone arrow nudges
forward. Focus draws the 2px sage ring offset 3px. Danger links keep their danger colour on hover. Links
are never disabled: if a destination is not available, remove the link and show plain text explaining why.

## Responsive

Inline links wrap with their sentence. Standalone links keep their icon with the last word and wrap
underneath on narrow screens. On phones, give a standalone link its own line so its target is at least 24px
tall and does not crowd neighbouring links.

## Accessibility

**Role:** native `<a href>` (link). An anchor without `href` is not a link; never use one as a button.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to and from the link. |
| Enter | Follows the link. Space scrolls the page, as for every link. |

**Focus:** the shared 2px sage ring, offset 3px, with a small radius, always visible on keyboard focus.

**Labelling:** the link text alone must say where it goes, because screen reader users browse lists of
links: **See all notes in Harbour Notes**, not "Click here". Repeated links (one per card) add context with
visually hidden text. Links that open a new tab say "(opens in a new tab)".

**Motion:** colour changes take 160ms; the arrow nudge is removed under reduced motion.

**Touch:** keep at least 24px between stacked standalone links, or give each one its own line.

## Content

- Say where it goes, front-loaded: **Back to projects**, **Field Day park map**, **See all notes in Harbour Notes**.
- Never "Click here", "Learn more" or "Read more" on their own.
- Name files with their type and size: **Download the agenda (PDF, 240 KB)**.
- Keep an inline link to the few words that describe the destination, not the whole sentence.

## Do and don't

### Do
Make the link text describe the destination.
```html
<p>Field Day starts at 10:00 am. <a href="#">See the full Field Day plan</a>.</p>
```

### Don't
"Click here" means nothing out of context, and screen readers list links out of context.
```html
<p>Field Day starts at 10:00 am. To see the full plan, <a href="#">click here</a>.</p>
```

### Do
Use a button for an action, even a light one.
```html
<button class="btn btn--text" type="button">Mark all as read</button>
```

### Don't
A link that performs an action breaks the back button and keyboard expectations.
```html
<a class="link-standalone" href="#">Mark all as read</a>
```

## Tokens

Links read `--color-fg-link` and `--color-fg-link-hover`, the danger foreground for `.link-danger`, the hairline
and thick border widths for the underline, and the underline offset.

## Code

A plain `<a href>` needs no class. Add `.link-standalone` for a link on its own line, `.link__arrow` on its
trailing arrow icon, and `.link-danger` for a link to a destructive flow.
