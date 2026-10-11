---
title: Media tile
tier: standard
order: 81
summary: A captioned 4:3 tile for a screenshot or photo, or a calm illustrated placeholder when there is no image yet. Tiles sit in a two- or three-column grid.
selector: .shots, .shot
layout: block
target: .shot__tile
states: default, hover, focus, loading, error
matrix-variants: linked
contrast: --color-fg-subtle|--color-bg-canvas|4.5; --color-fg-muted|--color-bg-subtle|4.5; --color-focus-ring|--color-bg-canvas|3
---

## Overview

Use media tiles to show a few images of a piece of work: screenshots of Northwind, photos from Field
Day, pages from Harbour Notes. Each tile has a short caption beneath. When there is no image yet, the
illustrated placeholder (soft bars on a tile tone) keeps the grid's rhythm without pretending to be
content. For one large image use the hero's photo frame, and for a person's picture use an
[avatar](avatar.html).

## Anatomy

1. **Grid** — `.shots`: two columns, three from 768px, with a 16px gap.
2. **Figure** — one `figure.shot` per image.
3. **Tile** — the 4:3 frame (`__tile`) with soft corners and a hairline; a link when it opens a larger view.
4. **Image or placeholder** — an `<img>` that covers the tile, or `__bars` on a `tile--*` tone.
5. **Caption** — a `figcaption` in the caption style, one short line.

## Variants

### gallery
Three tiles that open a larger view: a photo and two placeholders still waiting for screenshots.
```html
<div class="shots"><figure class="shot"><a class="shot__tile" href="#" aria-label="Open photo: The team planning Northwind"><img src="../assets/photos/coffee-together.jpg" width="400" height="300" alt="Two people planning at a wooden table"></a><figcaption>Planning the board view</figcaption></figure><figure class="shot"><a class="shot__tile tile--sage" href="#" aria-label="Open screenshot: The board view"><span class="shot__bars" aria-hidden="true"><span></span><span></span><span></span></span></a><figcaption>The board view</figcaption></figure><figure class="shot"><a class="shot__tile tile--fjord" href="#" aria-label="Open screenshot: Weekly summary e-mail"><span class="shot__bars" aria-hidden="true"><span></span><span></span><span></span></span></a><figcaption>Weekly summary e-mail</figcaption></figure></div>
```

### linked
One tile that opens a larger view: the whole frame is the link.
```html
<figure class="shot"><a class="shot__tile" href="#" aria-label="Open photo: Planning the board view"><img src="../assets/photos/coffee-together.jpg" width="400" height="300" alt="Two people planning at a wooden table"></a><figcaption>Planning the board view</figcaption></figure>
```

### photo
A single image that does not open anywhere: the tile is a plain frame.
```html
<figure class="shot"><div class="shot__tile"><img src="../assets/photos/coffee-together.jpg" width="400" height="300" alt="Two people talking over coffee at a wooden table"></div><figcaption>Field Day planning, Thursday</figcaption></figure>
```

### placeholder
No screenshot yet: the bars suggest a screen without inventing one. The tile has an accessible name.
```html
<figure class="shot"><div class="shot__tile tile--clay" role="img" aria-label="Placeholder for a screenshot of the Harbour Notes reading view"><span class="shot__bars" aria-hidden="true"><span></span><span></span><span></span></span></div><figcaption>Harbour Notes reading view</figcaption></figure>
```

### tones
The four tile tones. Pick one per project and keep it, so its placeholders read as one set.
```html
<div class="shots"><figure class="shot"><div class="shot__tile tile--sage" role="img" aria-label="Placeholder: sage tone"><span class="shot__bars" aria-hidden="true"><span></span><span></span><span></span></span></div><figcaption>Sage</figcaption></figure><figure class="shot"><div class="shot__tile tile--clay" role="img" aria-label="Placeholder: clay tone"><span class="shot__bars" aria-hidden="true"><span></span><span></span><span></span></span></div><figcaption>Clay</figcaption></figure><figure class="shot"><div class="shot__tile tile--fjord" role="img" aria-label="Placeholder: fjord tone"><span class="shot__bars" aria-hidden="true"><span></span><span></span><span></span></span></div><figcaption>Fjord</figcaption></figure><figure class="shot"><div class="shot__tile tile--oat" role="img" aria-label="Placeholder: oat tone"><span class="shot__bars" aria-hidden="true"><span></span><span></span><span></span></span></div><figcaption>Oat</figcaption></figure></div>
```

## Sizes

N/A: One shape. Tiles are always 4:3 and take the width of their grid column, so a row of mixed images stays even.

## States

Hover on a linked tile darkens the hairline, lifts a soft shadow and eases the image in by 3%; focus draws
the sage ring around the tile. **Loading** fills the tile with the subtle background and a slow shimmer
until the image arrives. **Error** keeps the tile's place with a dashed outline, an icon and a plain
"Image didn't load" so the caption still makes sense.

### error
```html
<figure class="shot"><div class="shot__tile shot__tile--error" role="img" aria-label="Image didn't load: Planning the board view"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.5"/><path d="m4 18 5-5 4 4 3-3 4 4"/><path d="M4 4l16 16"/></svg><span>Image didn't load</span></div><figcaption>Planning the board view</figcaption></figure>
```

## Responsive

Two columns at 360px, three from 768px; tiles keep 4:3 at every width. Captions wrap onto a second line
rather than being cut off. At 1024px and up the grid sits inside the page column and never grows past
three tiles per row; show more images in a viewer, not in a wider grid.

## Accessibility

**Role:** each tile is a `<figure>` with a `<figcaption>`. A tile that opens a larger view is a link (`a.shot__tile`); a placeholder is `role="img"` with an `aria-label`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves between linked tiles. |
| Enter | Opens the larger view. |

**Focus:** linked tiles show the 2px `--color-focus-ring` outline around the frame.

**Labelling:** images have `alt` that says what is shown, not "screenshot of". A linked tile's
`aria-label` says what opening it does ("Open screenshot: The board view"). Placeholder bars are
decorative; the tile itself carries the name. A failed image says so in text.

**Motion:** the hover zoom and the loading shimmer stop under reduced motion.

**Touch:** tiles are far larger than the 44px target; leave the 16px gap so neighbours are not tapped by mistake.

## Content

Captions name what the image shows in a few words, in sentence case and without a full stop: **The board
view**, **Weekly summary e-mail**, **Field Day planning, Thursday**. Avoid "Screenshot 1" or file names.
Write `alt` text as one plain sentence about the picture.

## Do and don't

### Do
Use the placeholder until there is a real screenshot.
```html
<div class="shots"><figure class="shot"><div class="shot__tile tile--sage" role="img" aria-label="Placeholder for the board view"><span class="shot__bars" aria-hidden="true"><span></span><span></span><span></span></span></div><figcaption>The board view</figcaption></figure><figure class="shot"><div class="shot__tile"><img src="../assets/photos/coffee-together.jpg" width="400" height="300" alt="Two people planning at a wooden table"></div><figcaption>Planning the board view</figcaption></figure></div>
```

### Don't
Caption tiles with file names or numbers.
```html
<div class="shots"><figure class="shot"><div class="shot__tile"><img src="../assets/photos/coffee-together.jpg" width="400" height="300" alt="IMG_2041.jpg"></div><figcaption>IMG_2041.jpg</figcaption></figure><figure class="shot"><div class="shot__tile tile--sage" role="img" aria-label="Screenshot 2"><span class="shot__bars" aria-hidden="true"><span></span><span></span><span></span></span></div><figcaption>Screenshot 2</figcaption></figure></div>
```

### Do
Keep one tone for a project's placeholders.
```html
<div class="shots"><figure class="shot"><div class="shot__tile tile--fjord" role="img" aria-label="Placeholder for the inbox"><span class="shot__bars" aria-hidden="true"><span></span><span></span><span></span></span></div><figcaption>Inbox</figcaption></figure><figure class="shot"><div class="shot__tile tile--fjord" role="img" aria-label="Placeholder for settings"><span class="shot__bars" aria-hidden="true"><span></span><span></span><span></span></span></div><figcaption>Settings</figcaption></figure></div>
```

### Don't
Mix every tone in one gallery; it reads as four different products.
```html
<div class="shots"><figure class="shot"><div class="shot__tile tile--clay" role="img" aria-label="Placeholder for the inbox"><span class="shot__bars" aria-hidden="true"><span></span><span></span><span></span></span></div><figcaption>Inbox</figcaption></figure><figure class="shot"><div class="shot__tile tile--oat" role="img" aria-label="Placeholder for settings"><span class="shot__bars" aria-hidden="true"><span></span><span></span><span></span></span></div><figcaption>Settings</figcaption></figure><figure class="shot"><div class="shot__tile tile--sage" role="img" aria-label="Placeholder for search"><span class="shot__bars" aria-hidden="true"><span></span><span></span><span></span></span></div><figcaption>Search</figcaption></figure></div>
```

## Tokens

Tiles read the tile tones and `--color-tile-fg` for placeholders, the hairline border roles, `--shadow-2`
on hover and the caption text role.

## Code

Put `figure.shot` items in `.shots`. Use `a.shot__tile` when the tile opens a viewer and `div.shot__tile`
otherwise; add a `tile--*` tone and `.shot__bars` for a placeholder, or an `<img>` for an image.
