---
title: Footer
tier: standard
order: 38
summary: The quiet end of every page. A hairline, a line about who makes the product, a few muted links and one line of fine print.
selector: .footer
target: .footer__links a
states: default, hover, focus
matrix-variants: minimal
contrast: --color-fg-muted|--color-bg-canvas|4.5; --color-fg-subtle|--color-bg-canvas|4.5; --color-fg-default|--color-bg-canvas|4.5; --color-focus-ring|--color-bg-canvas|3
---

## Overview

The footer closes every public page and most product pages. It holds what people look for last: who makes the
product, the legal and help links, and one line of fine print. It is deliberately small and muted, with lots of
space above it, so a page ends calmly instead of with a second navigation bar. Don't repeat the
[top bar](top-bar.html) here, and don't put actions or sign-up forms in it; those belong on the page.

## Anatomy

1. **Footer** — `<footer class="footer">`: the section gap above, a hairline, then generous padding.
2. **Made line** — `.footer__made`, who makes the product and the copyright, in the body-small muted style.
3. **Links** — `nav[aria-label="Footer"] > ul.footer__links`, muted links that wrap as a row.
4. **Fine print** — `.footer__land`, one or two sentences in the subtle role at a wide measure: a data promise, an acknowledgement, a registered address.

```html
<footer class="footer"><div class="wrap footer__grid"><p class="footer__made">Made by a small, independent team. © 2026 {{app}}.</p><nav aria-label="Footer"><ul class="footer__links"><li><a href="#">About</a></li><li><a href="#">Privacy</a></li><li><a href="#">Help</a></li></ul></nav><p class="footer__land">Your notes stay yours. We never sell what you write or use it to train models.</p></div></footer>
```

## Variants

### default
The full footer for public pages: made line and links side by side from 64rem, fine print underneath.
```html
<footer class="footer"><div class="wrap footer__grid"><p class="footer__made">Made by a small, independent team. © 2026 {{app}}.</p><nav aria-label="Footer"><ul class="footer__links"><li><a href="#">About</a></li><li><a href="#">Privacy</a></li><li><a href="#">Terms</a></li><li><a href="#">Help</a></li><li><a href="#">Status</a></li></ul></nav><p class="footer__land">Your notes stay yours. We never sell what you write or use it to train models, and you can export everything at any time.</p></div></footer>
```

### with brand
The [brand](brand.html) above the made line, for marketing pages where the footer is the last thing people see.
```html
<footer class="footer"><div class="wrap footer__grid"><div class="stack"><a class="brand" href="#" aria-label="{{app}} home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 24.5C7.5 14 14 7.5 25 7.5c0 11-6.5 17-17.5 17zM7.5 24.5l9.5-9.5M7.5 24.5 5 27" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle class="brand__sun" cx="8.5" cy="8.5" r="2.4"/></svg><span>{{app_lower}}</span></a><p class="footer__made">A calm workspace for small teams. © 2026 {{app}}.</p></div><nav aria-label="Footer"><ul class="footer__links"><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li><li><a href="#">Changelog</a></li><li><a href="#">Privacy</a></li><li><a href="#">Contact</a></li></ul></nav><p class="footer__land">{{app}} is independent and funded by the people who use it.</p></div></footer>
```

### minimal
Inside the product: the made line and the links people need while signed in. No fine print.
```html
<footer class="footer"><div class="wrap footer__grid"><p class="footer__made">© 2026 {{app}}</p><nav aria-label="Footer"><ul class="footer__links"><li><a href="#">Help</a></li><li><a href="#">Privacy</a></li><li><a href="#">Shortcuts</a></li></ul></nav></div></footer>
```

## Sizes

N/A: one size. The footer sits `--layout-section-gap` below the content, with `--space-16` above and `--space-24`
below its contents; text uses `--text-body-sm` and the body size for links.

## States

Links rest in the muted text role with no underline. Hover lifts them to the default text role and adds the
underline; keyboard focus draws the sage ring. The made line and fine print are static text.

## Responsive

- **360px:** everything stacks: made line, links wrapping in a row with `--space-6` between them, then the fine print.
- **768px:** the same stack, with the links on one line.
- **1024px and up:** `.footer__grid` becomes two columns, the made line beside the links, and the fine print spans
  both columns at `--layout-measure-wide`.

## Theming

Every colour reads a semantic role: the hairline is the default border, links are muted, fine print is subtle. In
dark mode they keep the same order of emphasis on the charcoal canvas.

## Accessibility

**Role:** `<footer>` (the contentinfo landmark when it is a direct child of `<body>`) containing a
`<nav aria-label="Footer">` of plain links.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves through the footer links in reading order. |
| Enter | Follows the focused link. |

**Focus:** the shared 2px `--color-focus-ring`, offset 3px, on each link.

**Labelling:** name the nav "Footer" so it is distinct from the "Primary" nav in the top bar. Link text names the
destination; never "Click here".

**Motion:** only the shared link colour transition; nothing to reduce.

**Touch:** links wrap with `--space-2` rows and `--space-6` columns between them; on touch screens give each link at
least a 24px target.

## Content

Keep the made line to one sentence: who makes it and the copyright, **© 2026 {{app}}**. Link labels are one or two
words: **Privacy**, **Help**, **Status**. The fine print is plain and specific, a promise or a fact, never marketing.
Never put a newsletter form or a wall of social icons here.

## Do and don't

### Do
Keep it short and muted, with one line of plain fine print.
```html
<footer class="footer"><div class="wrap footer__grid"><p class="footer__made">© 2026 {{app}}</p><nav aria-label="Footer"><ul class="footer__links"><li><a href="#">Privacy</a></li><li><a href="#">Help</a></li></ul></nav><p class="footer__land">You can export all your notes at any time.</p></div></footer>
```

### Don't
Turn the footer into a second call to action; the page has already asked.
```html
<footer class="footer"><div class="wrap footer__grid"><p class="footer__made">© 2026 {{app}}</p><a class="btn btn--primary" href="#">Start your free trial today</a></div></footer>
```

### Do
Name the footer navigation so it is distinct from the top bar's.
```html
<nav aria-label="Footer"><ul class="footer__links"><li><a href="#">About</a></li><li><a href="#">Privacy</a></li><li><a href="#">Contact</a></li></ul></nav>
```

### Don't
Repeat every top-bar destination in the footer; two identical "navigation" landmarks confuse screen reader users.
```html
<nav aria-label="Navigation"><ul class="footer__links"><li><a href="#">Projects</a></li><li><a href="#">Notes</a></li><li><a href="#">Gatherings</a></li><li><a href="#">People</a></li></ul></nav>
```

## Tokens

The footer reads the default border, the muted and subtle text roles, `--layout-section-gap`, `--layout-measure-wide`
and the body-small type style.

## Code

Use `<footer class="footer">` as the last child of `<body>`, with `.wrap.footer__grid` inside to align it to the
page container.
