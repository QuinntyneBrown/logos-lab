---
title: Divider
tier: core
order: 43
summary: A single hairline that separates groups of content when spacing alone is not enough.
selector: .divider
target: hr, .divider--label
states: default
contrast: --color-fg-subtle|--color-bg-surface|4.5; --color-fg-default|--color-bg-surface|4.5
---

## Overview

Reach for space first: most groups separate cleanly with `--space-8` and a heading. Use a divider when two
groups sit close together and still need to read as separate — the sections of a settings form, two sets of
toolbar actions, or the "or" between two ways to sign in. Don't wrap content in boxes to separate it; a
[card](card.html) is for an object, not a gap.

## Anatomy

1. **Rule** — a 1px hairline in `--color-border-default`, never darker.
2. **Label** — optional overline text centred between two rules (`.divider--label`).
3. **Spacing** — `--space-6` above and below a horizontal or labelled divider; none on a vertical one.

```html
<p class="divider--label">or</p>
```

## Variants

### horizontal
A native `<hr>` between two groups of related content.
```html
<div><p>Harbour Notes saves every change as you type.</p><hr class="divider"><p>Exports keep your headings, links and images.</p></div>
```

### vertical
Separates two clusters in a row, such as formatting and sharing actions in a toolbar. It stretches to the
height of the row.
```html
<div class="cluster" role="toolbar" aria-label="Page actions"><button class="btn btn--ghost btn--sm" type="button">Bold</button><button class="btn btn--ghost btn--sm" type="button">Italic</button><hr class="divider divider--vertical" aria-orientation="vertical"><button class="btn btn--ghost btn--sm" type="button">Share page</button></div>
```

### labelled
A short overline between two alternatives, most often between two ways to continue.
```html
<div class="stack"><button class="btn btn--block" type="button">Continue with a sign-in link</button><p class="divider--label">or</p><button class="btn btn--quiet btn--block" type="button">Use a password</button></div>
```

## Sizes

N/A: dividers are one hairline thick; only their spacing changes with the layout around them.

## States

Dividers are passive and have no interactive states. They keep the same hairline in both themes.

## Responsive

Horizontal and labelled dividers span their container at every width. A vertical divider in a toolbar
that wraps at 360px can end up dangling at the start or end of a line; when a toolbar wraps below 768px,
drop the vertical divider and let the cluster gap separate the groups.

## Accessibility

**Role:** a native `<hr>` is a `separator`. Use it when the break is meaningful. A labelled divider is a
plain paragraph of text, so its word ("or") is read in place.

**Labelling:** a vertical `<hr>` inside a toolbar takes `aria-orientation="vertical"`. Decorative rules that
only tidy a layout can be borders on the surrounding element instead of separators.

**Motion:** none.

**Touch:** dividers are not targets; keep at least `--space-2` between the controls on either side of a vertical divider.

## Content

The labelled divider holds one lowercase word: **or**, **and**, **then**. Never a sentence, never a heading
in disguise; if the group needs a name, give it a real heading.

## Do and don't

### Do
Let space and a heading separate sections first.
```html
<div class="stack"><h3>Notifications</h3><p>Choose which updates reach your inbox.</p></div>
```

### Don't
Draw a rule under every heading and between every paragraph.
```html
<div><h3>Notifications</h3><hr class="divider"><p>Choose which updates reach your inbox.</p><hr class="divider"></div>
```

### Do
Use one short word in a labelled divider.
```html
<p class="divider--label">or</p>
```

### Don't
Turn a labelled divider into a sentence.
```html
<p class="divider--label">Alternatively you can choose another way</p>
```

## Tokens

Dividers read `--color-border-default` for the rule, `--color-fg-subtle` and the overline style for the label,
and `--space-6` for their margins.

## Code

Use `<hr class="divider">` for horizontal breaks, add `divider--vertical` inside a flex row, and use
`<p class="divider--label">` for a labelled break.
