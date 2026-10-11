---
title: Stat and KPI
tier: standard
order: 56
summary: Show a few numbers that matter, large and light, with a plain label underneath. Hairlines divide them; nothing shouts.
selector: .stats, .kpis
layout: block
target: .stats, .kpis
states: default, loading
matrix-variants: pair, kpi list, kpi card
contrast: --color-fg-default|--color-bg-canvas|4.5; --color-fg-muted|--color-bg-canvas|4.5; --color-success-fg|--color-bg-canvas|4.5; --color-danger-fg|--color-bg-canvas|4.5; --color-fg-subtle|--color-bg-surface|4.5
---

## Overview

Use a stat row (`.stats`) for the two to four numbers that summarise a page — on a home page, a project
overview or a report. Use the compact KPI list (`.kpis`) inside a [card](card.html) or aside, where the
numbers support something else. Show a number only when people will act on it or feel something about
it; a [table](table.html) is better for comparing many values, and a [progress bar](progress-bar.html)
is better for "how far along".

## Anatomy

1. **Value** — the number in the light display face, tabular figures, `--font-size-3xl` (`--font-size-2xl` in a KPI list).
2. **Label** — a short noun phrase in muted body text under the value.
3. **Trend** — optional: the change since the last period, in words and a sign, coloured by whether it is good or bad.
4. **Dividers** — hairlines above and between items; on wide screens the row sits on one line with vertical rules.

```html
<div class="stats" role="list" aria-label="Northwind this week"><p class="stats__item" role="listitem"><span class="stats__value">23</span><span class="stats__label">tasks closed</span><span class="stats__delta">+6 on last week</span></p><p class="stats__item" role="listitem"><span class="stats__value">4</span><span class="stats__label">people active today</span></p></div>
```

## Variants

### row
Four numbers in a row, divided by hairlines. Two per row below 1024px.
```html
<div class="stats" role="list" aria-label="Northwind at a glance"><p class="stats__item" role="listitem"><span class="stats__value">128</span><span class="stats__label">notes in Harbour Notes</span></p><p class="stats__item" role="listitem"><span class="stats__value">14</span><span class="stats__label">open tasks</span></p><p class="stats__item" role="listitem"><span class="stats__value">7</span><span class="stats__label">people on the team</span></p><p class="stats__item" role="listitem"><span class="stats__value">8</span><span class="stats__label">days until Field Day</span></p></div>
```

### with trend
Each value says how it changed. The trend colour follows meaning, not direction: review time going down is good news.
```html
<div class="stats" role="list" aria-label="Northwind this week compared with last week"><p class="stats__item" role="listitem"><span class="stats__value">23</span><span class="stats__label">tasks closed</span><span class="stats__delta">+6 on last week</span></p><p class="stats__item" role="listitem"><span class="stats__value">1.4</span><span class="stats__label">days to review, median</span><span class="stats__delta">0.6 days faster</span></p><p class="stats__item" role="listitem"><span class="stats__value">41</span><span class="stats__label">notes added</span><span class="stats__delta stats__delta--down">−12 on last week</span></p><p class="stats__item" role="listitem"><span class="stats__value">3</span><span class="stats__label">tasks overdue</span><span class="stats__delta stats__delta--down">+2 on last week</span></p></div>
```

### pair
Two numbers side by side for a card, an aside or a narrow column. `.stats--pair` keeps two columns at every width.
```html
<div class="stats stats--pair" role="list" aria-label="Northwind tasks this week"><p class="stats__item" role="listitem"><span class="stats__value">23</span><span class="stats__label">tasks closed</span><span class="stats__delta">+6 on last week</span></p><p class="stats__item" role="listitem"><span class="stats__value">3</span><span class="stats__label">tasks overdue</span><span class="stats__delta stats__delta--down">+2 on last week</span></p></div>
```

### kpi list
A compact description list for a card or aside.
```html
<dl class="kpis"><div><dt>Sign-ups</dt><dd>36</dd></div><div><dt>Spaces left</dt><dd>14</dd></div><div><dt>Volunteers</dt><dd>6</dd></div><div><dt>Days to go</dt><dd>8</dd></div></dl>
```

### kpi card
The KPI list in a card with a heading and a way to see more.
```html
<section class="card" aria-labelledby="fd-kpi"><h3 class="card__name" id="fd-kpi">Field Day</h3><p class="card__text">Saturday 17 October, 10:00 am</p><dl class="kpis"><div><dt>Sign-ups</dt><dd>36</dd></div><div><dt>Spaces left</dt><dd>14</dd></div></dl><a class="section__more" href="#">See who is coming <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg></a></section>
```

## Sizes

N/A: stats use one display size per form — `--font-size-3xl` in a row and `--font-size-2xl` in a KPI list.
Do not scale a number up to make it feel important; give it the first position instead.

## States

A stat is passive. While numbers load, set `aria-busy="true"` on the `.stats` row or `.kpis` list: each
value and trend becomes a soft shimmering bar at its final size, so labels stay readable and nothing moves
when the numbers arrive. If a number cannot load, show "—" with the label and explain once nearby; never
show 0 for unknown.

## Responsive

At 360px and 768px a stat row shows two items per line, divided by hairlines under each item. From 1024px
all four sit in one row with vertical hairlines between them and more vertical room. A pair (`.stats--pair`) and
a KPI list stay two columns at every width. Long labels wrap under the value; values never wrap.

## Theming

Values use `--color-fg-default`, labels `--color-fg-muted`, trends the success and danger text roles, and
dividers `--color-border-default`; every one has a dark value, so the row needs no dark-mode rules.

## Accessibility

**Role:** a stat row is a list (`role="list"` with `role="listitem"` items, or a real `<ul>`) with an
`aria-label` that says what is being counted and when. A KPI list is a `<dl>` so each label is tied to
its value. Neither is a focus stop.

**Focus:** only links inside, such as "See who is coming", take focus.

**Labelling:** read in order, a stat says value then label ("23 tasks closed"), so write labels that make
sense after the number. Trends say the comparison in words — "+6 on last week", "0.6 days faster" — so
colour is never the only clue. Use a real minus sign (−) so screen readers say "minus".

**Motion:** the loading shimmer stops under reduced motion; values never count up.

**Touch:** N/A for the numbers; any link inside keeps a 24px minimum target.

## Content

Numbers use tabular figures, a thousands separator (1,284) and at most one decimal place (1.4 days).
Labels are lowercase noun phrases that follow the number: **tasks closed**, **people on the team**,
**days until Field Day**. Trends name the comparison: **+6 on last week**, never a bare "+35%". Round to
what people can feel; "about 1,300" is fine on a home page, exact counts belong in reports.

## Do and don't

### Do
Say what the number counts and over what time.
```html
<div class="stats" role="list" aria-label="Harbour Notes this month"><p class="stats__item" role="listitem"><span class="stats__value">41</span><span class="stats__label">notes added this month</span></p><p class="stats__item" role="listitem"><span class="stats__value">6</span><span class="stats__label">people writing</span></p></div>
```

### Don't
A bare percentage with no label or period means nothing.
```html
<div class="stats" role="list" aria-label="Stats"><p class="stats__item" role="listitem"><span class="stats__value">+35%</span><span class="stats__label">growth</span></p><p class="stats__item" role="listitem"><span class="stats__value">0.82</span><span class="stats__label">score</span></p></div>
```

### Do
Colour the trend by meaning: fewer overdue tasks is good news.
```html
<dl class="kpis"><div><dt>Overdue tasks</dt><dd>1</dd></div><div><dt>Change</dt><dd><span class="stats__delta">2 fewer than last week</span></dd></div></dl>
```

### Don't
Ten numbers in a row bury the two that matter; use a table.
```html
<dl class="kpis"><div><dt>Notes</dt><dd>128</dd></div><div><dt>Tasks</dt><dd>14</dd></div><div><dt>Comments</dt><dd>312</dd></div><div><dt>Files</dt><dd>58</dd></div><div><dt>Links</dt><dd>97</dd></div><div><dt>Views</dt><dd>2,140</dd></div></dl>
```

## Tokens

Stats read the display font at `--font-size-3xl` and `--font-size-2xl`, the default, muted and subtle
text roles, the success and danger text roles for trends, and `--color-border-default` for hairlines.

## Code

Use `.stats` with `.stats__item` children for a row (add `.stats--pair` for two columns), or `<dl class="kpis">`
for a compact list. Add
`.stats__delta` (or `.stats__delta--down` when the change is bad) under a label, and `aria-busy="true"` on
the container while values load.
