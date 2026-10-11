---
title: Description list
tier: core
order: 52
summary: Pairs of small uppercase labels and plain values, for the facts about a person, project or gathering.
selector: .facts
target: dl
states: default, loading
matrix-variants: stacked, inline, columns
contrast: --color-fg-subtle|--color-bg-surface|4.5; --color-fg-default|--color-bg-surface|4.5; --color-fg-link|--color-bg-surface|4.5
---

## Overview

Use a description list for read-only facts that each have a name: who owns a project, when a gathering
starts, someone's role and local time. It is quieter than a table and keeps label and value together when
the layout reflows. Use a [table](table.html) to compare the same facts across several items, and a
[form](form-field.html) when the values can be edited in place.

## Anatomy

1. **Term** — the label, in the overline style: small, uppercase, widely tracked, `--color-fg-subtle`.
2. **Value** — the fact in body text; long values wrap.
3. **Pair** — a `<div>` that keeps one term with its value, `--space-1` apart.
4. **Rhythm** — `--space-4` between pairs; inline lists add a hairline under each pair.

```html
<dl class="facts"><div><dt>Owner</dt><dd>Amara Osei</dd></div><div><dt>Started</dt><dd>March 2026</dd></div></dl>
```

## Variants

### stacked
Labels above values, in one column. The default for asides and narrow cards.
```html
<dl class="facts">
  <div><dt>Owner</dt><dd>Amara Osei</dd></div>
  <div><dt>Members</dt><dd>4 people</dd></div>
  <div><dt>Started</dt><dd>March 2026</dd></div>
</dl>
```

### inline
Label and value side by side with a hairline under each pair, for longer lists such as settings summaries.
```html
<dl class="facts facts--inline">
  <div><dt>When</dt><dd>Saturday 17 October 2026, 10:00 am</dd></div>
  <div><dt>Where</dt><dd>The long room, Harbour Street</dd></div>
  <div><dt>Host</dt><dd>Caleb Morgan</dd></div>
  <div><dt>Going</dt><dd>14 people</dd></div>
</dl>
```

### columns
`facts--columns` flows pairs into as many columns as fit, for a summary across the top of a page.
```html
<dl class="facts facts--columns">
  <div><dt>Stage</dt><dd>Private beta</dd></div>
  <div><dt>Notebooks</dt><dd>3</dd></div>
  <div><dt>Members</dt><dd>4 people</dd></div>
  <div><dt>Updated</dt><dd>Today, 9:40 am</dd></div>
</dl>
```

### with links
Values can be links or contact details when that is the natural next step.
```html
<dl class="facts">
  <div><dt>Notebook</dt><dd><a href="#">Harbour Notes</a></dd></div>
  <div><dt>Email</dt><dd><a href="mailto:grace.liu@example.com">grace.liu@example.com</a></dd></div>
  <div><dt>Local time</dt><dd>10:42 am in Lisbon</dd></div>
</dl>
```

### with missing values
A fact nobody has filled in says so in subtle text instead of disappearing, so every profile has the same shape.
```html
<dl class="facts">
  <div><dt>Role</dt><dd>Engineer</dd></div>
  <div><dt>Working on</dt><dd>Northwind</dd></div>
  <div><dt>Available</dt><dd class="is-empty">Not added yet</dd></div>
</dl>
```

## Sizes

N/A: one size. Terms use the overline style and values use body text; inside cards use `.card__facts`,
which sets values in body-small.

## States

Description lists are read-only, so they have no hover or focus of their own; links inside them behave
like any link. While the facts load, each value is replaced by a skeleton line and the terms stay, so
people can see what is coming.

### loading
```html
<dl class="facts" aria-busy="true"><div><dt>Owner</dt><dd><span class="skeleton skeleton--text"></span></dd></div><div><dt>Members</dt><dd><span class="skeleton skeleton--text is-short"></span></dd></div><div><dt>Started</dt><dd><span class="skeleton skeleton--text is-short"></span></dd></div></dl>
```

### inline / loading
```html
<dl class="facts facts--inline" aria-busy="true"><div><dt>When</dt><dd><span class="skeleton skeleton--text"></span></dd></div><div><dt>Where</dt><dd><span class="skeleton skeleton--text is-short"></span></dd></div><div><dt>Host</dt><dd><span class="skeleton skeleton--text is-short"></span></dd></div></dl>
```

### columns / loading
```html
<dl class="facts facts--columns" aria-busy="true"><div><dt>Stage</dt><dd><span class="skeleton skeleton--text"></span></dd></div><div><dt>Notebooks</dt><dd><span class="skeleton skeleton--text is-short"></span></dd></div><div><dt>Members</dt><dd><span class="skeleton skeleton--text"></span></dd></div><div><dt>Updated</dt><dd><span class="skeleton skeleton--text is-short"></span></dd></div></dl>
```

## Responsive

Stacked lists are the same at every width. Inline lists keep label and value side by side (one third and
two thirds) down to 360px, where long values wrap under themselves. Column lists fit as many 10rem columns
as their container allows: one at 360px and up to four from 768px.

## Theming

Terms use `--color-fg-subtle`, values `--color-fg-default`, hairlines `--color-border-default`; all are
semantic roles, so the list needs no dark-mode rules.

## Accessibility

**Role:** a native `<dl>` with each `<dt>`/`<dd>` pair wrapped in a `<div>`, which HTML allows and which keeps
pairs together in grid layouts. Screen readers announce the list and its number of terms.

**Labelling:** terms are real text, uppercase only through CSS, so they are read normally. Give a list a
heading (such as **At a glance**) when it stands alone. Missing values are written out (**Not added yet**)
so nothing is announced as blank.

**Motion:** none; skeletons stop shimmering under reduced motion.

**Touch:** links inside values keep a comfortable line height; put no more than one link in a value.

## Content

Terms are one or two words in sentence case before the CSS uppercases them: **Owner**, **Local time**.
Values are short facts, not sentences: **4 people**, **Saturday 17 October 2026, 10:00 am**. Use the same
format for the same kind of value everywhere. Write missing values as **Not added yet**, never a dash.

## Do and don't

### Do
Keep terms short and values specific.
```html
<dl class="facts"><div><dt>Host</dt><dd>Caleb Morgan</dd></div><div><dt>Going</dt><dd>14 people</dd></div></dl>
```

### Don't
Write terms as questions or values as sentences.
```html
<dl class="facts"><div><dt>Who is hosting this event?</dt><dd>It will be hosted by Caleb Morgan, who organised it.</dd></div></dl>
```

### Do
Say when a value is missing.
```html
<dl class="facts"><div><dt>Available</dt><dd class="is-empty">Not added yet</dd></div></dl>
```

### Don't
Leave a blank or a dash that reads as an error.
```html
<dl class="facts"><div><dt>Available</dt><dd>–</dd></div></dl>
```

## Tokens

Description lists read the overline and body type roles, the subtle and default text roles, the hairline
border and `--space-1` to `--space-6` gaps.

## Code

Use `<dl class="facts">` and wrap each pair in a `<div>`. Add `facts--inline` or `facts--columns` for the
other layouts, and `class="is-empty"` on a `<dd>` with no value.
