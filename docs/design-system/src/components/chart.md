---
title: Chart
tier: standard
order: 97
summary: A single-series chart in the one sage hue, for the analytics an expert or editor reads: a column chart over time or horizontal bars across categories, each with the same numbers as a table.
selector: .chart
layout: block
target: .chart__col
states: default, hover, focus, loading, suppressed
matrix-variants: columns
matrix-cell: 30rem
contrast: --color-accent|--color-bg-surface|3; --color-fg-muted|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-fg-inverse|--color-bg-inverse|4.5; --color-border-strong|--color-bg-surface|3
---

## Overview

{{app}} analytics are small, honest charts: one measure, one hue, a title that says what is being
counted, and the same numbers as a table one click away. Use **columns** for a measure over time (weekly
completions) and **bars** for a measure across named categories (how far learners reach in a course, how
much of a video is watched). Never compare two series in one chart; draw two charts. For a single number
use a [stat](stat.html); for one person's progress use a [progress bar](progress-bar.html).

## Anatomy

1. **Chart**: `section.chart`, the head, the plot and the data twin.
2. **Head**: `__head`, the title (`__title`) and a note (`__note`) giving the period and the count of learners.
3. **Plot**: `__plot`, a row of columns over a strong baseline. Height is `--size-chart-height`.
4. **Column**: `__col`, focusable, named in words, with its value as `--ll-chart-value` (a percentage of the plot's maximum).
5. **Bar**: `__bar`, the sage fill. The one series colour.
6. **Label**: `__label`, the value over selected columns only: the highest and the latest.
7. **Tip**: `__tip`, a dark tooltip with the exact value on hover or focus.
8. **Axis**: `ol.chart__axis`, the column labels under the baseline.
9. **Rows**: `ol.chart__rows` of `__row` (label `__row-label`, track `__track` with its bar, value `__row-value`) for horizontal bars.
10. **Data**: `details.chart__data`, the same numbers in a [table](table.html).

## Variants

### columns
Weekly completions of a course's lessons. Labels sit on the highest week and the latest full week; every other value is in the tip and the table.
```html
<section class="chart" aria-labelledby="ch-weekly"><div class="chart__head"><h3 class="chart__title" id="ch-weekly">Lesson completions per week</h3><p class="chart__note">Imago Dei in an Age of Machines · last 8 weeks</p></div><div class="chart__plot"><div class="chart__col" role="img" tabindex="0" aria-label="Week of 24 Aug: 18 completions" style="--ll-chart-value: 35%"><span class="chart__tip" aria-hidden="true">Week of 24 Aug · 18</span><span class="chart__bar"></span></div><div class="chart__col" role="img" tabindex="0" aria-label="Week of 31 Aug: 22 completions" style="--ll-chart-value: 42%"><span class="chart__tip" aria-hidden="true">Week of 31 Aug · 22</span><span class="chart__bar"></span></div><div class="chart__col" role="img" tabindex="0" aria-label="Week of 7 Sep: 27 completions" style="--ll-chart-value: 52%"><span class="chart__tip" aria-hidden="true">Week of 7 Sep · 27</span><span class="chart__bar"></span></div><div class="chart__col" role="img" tabindex="0" aria-label="Week of 14 Sep: 35 completions" style="--ll-chart-value: 67%"><span class="chart__tip" aria-hidden="true">Week of 14 Sep · 35</span><span class="chart__bar"></span></div><div class="chart__col" role="img" tabindex="0" aria-label="Week of 21 Sep: 52 completions, the highest" style="--ll-chart-value: 100%"><span class="chart__tip" aria-hidden="true">Week of 21 Sep · 52</span><span class="chart__label" aria-hidden="true">52</span><span class="chart__bar"></span></div><div class="chart__col" role="img" tabindex="0" aria-label="Week of 28 Sep: 47 completions" style="--ll-chart-value: 90%"><span class="chart__tip" aria-hidden="true">Week of 28 Sep · 47</span><span class="chart__bar"></span></div><div class="chart__col" role="img" tabindex="0" aria-label="Week of 5 Oct: 41 completions" style="--ll-chart-value: 79%"><span class="chart__tip" aria-hidden="true">Week of 5 Oct · 41</span><span class="chart__label" aria-hidden="true">41</span><span class="chart__bar"></span></div><div class="chart__col" role="img" tabindex="0" aria-label="Week of 12 Oct, so far: 12 completions" style="--ll-chart-value: 23%"><span class="chart__tip" aria-hidden="true">Week of 12 Oct, so far · 12</span><span class="chart__bar"></span></div></div><ol class="chart__axis" aria-hidden="true"><li>24 Aug</li><li>31 Aug</li><li>7 Sep</li><li>14 Sep</li><li>21 Sep</li><li>28 Sep</li><li>5 Oct</li><li>12 Oct</li></ol><details class="chart__data"><summary>Show the numbers as a table</summary><div class="table-wrap"><table class="data-table"><caption>Lesson completions per week, Imago Dei in an Age of Machines</caption><thead><tr><th scope="col">Week of</th><th scope="col" class="num">Completions</th></tr></thead><tbody><tr><td>24 Aug 2026</td><td class="num">18</td></tr><tr><td>31 Aug 2026</td><td class="num">22</td></tr><tr><td>7 Sep 2026</td><td class="num">27</td></tr><tr><td>14 Sep 2026</td><td class="num">35</td></tr><tr><td>21 Sep 2026</td><td class="num">52</td></tr><tr><td>28 Sep 2026</td><td class="num">47</td></tr><tr><td>5 Oct 2026</td><td class="num">41</td></tr><tr><td>12 Oct 2026 (so far)</td><td class="num">12</td></tr></tbody></table></div></details></section>
```

### bars
How far learners get: the share of enrolled learners who reached each section.
```html
<section class="chart" aria-labelledby="ch-reach"><div class="chart__head"><h3 class="chart__title" id="ch-reach">Learners who reached each section</h3><p class="chart__note">Imago Dei in an Age of Machines · 212 enrolled</p></div><ol class="chart__rows"><li class="chart__row" style="--ll-chart-value: 100%"><span class="chart__row-label">1. Beginnings</span><span class="chart__track" aria-hidden="true"><span class="chart__bar"></span></span><span class="chart__row-value">100%</span></li><li class="chart__row" style="--ll-chart-value: 82%"><span class="chart__row-label">2. Made, not manufactured</span><span class="chart__track" aria-hidden="true"><span class="chart__bar"></span></span><span class="chart__row-value">82%</span></li><li class="chart__row" style="--ll-chart-value: 62%"><span class="chart__row-label">3. Image and likeness</span><span class="chart__track" aria-hidden="true"><span class="chart__bar"></span></span><span class="chart__row-value">62%</span></li><li class="chart__row" style="--ll-chart-value: 45%"><span class="chart__row-label">4. Minds and machines</span><span class="chart__track" aria-hidden="true"><span class="chart__bar"></span></span><span class="chart__row-value">45%</span></li><li class="chart__row" style="--ll-chart-value: 29%"><span class="chart__row-label">5. Vocation and dominion</span><span class="chart__track" aria-hidden="true"><span class="chart__bar"></span></span><span class="chart__row-value">29%</span></li><li class="chart__row" style="--ll-chart-value: 21%"><span class="chart__row-label">6. Hope and limits</span><span class="chart__track" aria-hidden="true"><span class="chart__bar"></span></span><span class="chart__row-value">21%</span></li></ol><details class="chart__data"><summary>Show the numbers as a table</summary><div class="table-wrap"><table class="data-table"><caption>Learners who reached each section, Imago Dei in an Age of Machines</caption><thead><tr><th scope="col">Section</th><th scope="col" class="num">Learners</th><th scope="col" class="num">Share</th></tr></thead><tbody><tr><td>1. Beginnings</td><td class="num">212</td><td class="num">100%</td></tr><tr><td>2. Made, not manufactured</td><td class="num">174</td><td class="num">82%</td></tr><tr><td>3. Image and likeness</td><td class="num">131</td><td class="num">62%</td></tr><tr><td>4. Minds and machines</td><td class="num">96</td><td class="num">45%</td></tr><tr><td>5. Vocation and dominion</td><td class="num">61</td><td class="num">29%</td></tr><tr><td>6. Hope and limits</td><td class="num">44</td><td class="num">21%</td></tr></tbody></table></div></details></section>
```

### video watched
How much of a video viewers watch, by quarter.
```html
<section class="chart" aria-labelledby="ch-watched"><div class="chart__head"><h3 class="chart__title" id="ch-watched">How much viewers watched</h3><p class="chart__note">Can a Machine Pray? · 24:18 · 640 viewers</p></div><ol class="chart__rows"><li class="chart__row" style="--ll-chart-value: 88%"><span class="chart__row-label">A quarter (6:05)</span><span class="chart__track" aria-hidden="true"><span class="chart__bar"></span></span><span class="chart__row-value">88%</span></li><li class="chart__row" style="--ll-chart-value: 64%"><span class="chart__row-label">Half (12:09)</span><span class="chart__track" aria-hidden="true"><span class="chart__bar"></span></span><span class="chart__row-value">64%</span></li><li class="chart__row" style="--ll-chart-value: 47%"><span class="chart__row-label">Three quarters (18:14)</span><span class="chart__track" aria-hidden="true"><span class="chart__bar"></span></span><span class="chart__row-value">47%</span></li><li class="chart__row" style="--ll-chart-value: 39%"><span class="chart__row-label">To the end</span><span class="chart__track" aria-hidden="true"><span class="chart__bar"></span></span><span class="chart__row-value">39%</span></li></ol><details class="chart__data"><summary>Show the numbers as a table</summary><div class="table-wrap"><table class="data-table"><caption>How much viewers watched, Can a Machine Pray?</caption><thead><tr><th scope="col">Watched at least</th><th scope="col" class="num">Viewers</th><th scope="col" class="num">Share</th></tr></thead><tbody><tr><td>A quarter</td><td class="num">563</td><td class="num">88%</td></tr><tr><td>Half</td><td class="num">410</td><td class="num">64%</td></tr><tr><td>Three quarters</td><td class="num">301</td><td class="num">47%</td></tr><tr><td>To the end</td><td class="num">250</td><td class="num">39%</td></tr></tbody></table></div></details></section>
```

## Sizes

N/A: columns share the chart's width; the plot height is `--size-chart-height`. Bar rows are content height.

## States

Hover or focus on a column deepens its bar, hides its label and shows the tip with the exact value. Focus
also draws the ring. **Loading** (`aria-busy="true"` on the chart) greys the bars and, unless motion is
reduced, shimmers them. **Suppressed**: when fewer than 5 learners are in the group, the chart is replaced
by a sentence so no one can be identified; the table is not offered either.

### loading
```html
<section class="chart" aria-labelledby="ch-load" aria-busy="true"><div class="chart__head"><h3 class="chart__title" id="ch-load">Lesson completions per week</h3><p class="chart__note">Loading…</p></div><div class="chart__plot"><div class="chart__col" style="--ll-chart-value: 40%"><span class="chart__bar"></span></div><div class="chart__col" style="--ll-chart-value: 55%"><span class="chart__bar"></span></div><div class="chart__col" style="--ll-chart-value: 70%"><span class="chart__bar"></span></div><div class="chart__col" style="--ll-chart-value: 60%"><span class="chart__bar"></span></div><div class="chart__col" style="--ll-chart-value: 45%"><span class="chart__bar"></span></div></div></section>
```

### suppressed
```html
<section class="chart" aria-labelledby="ch-supp"><div class="chart__head"><h3 class="chart__title" id="ch-supp">Lesson completions per week</h3><p class="chart__note">Imago Dei, Autumn 2026 · Halifax learners</p></div><p class="inline-status" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.5h.01"/></svg>Fewer than 5 learners are in this group, so we don’t show their numbers.</p></section>
```

## Responsive

Columns share the width at every size; at 360px the axis shows every label in caption type, and the chart
keeps all eight weeks rather than scrolling. Bar rows put the label above the bar under 480px and beside
it from 480px. The table twin scrolls inside its `table-wrap` if it must.

## Accessibility

**Role:** a `section` named by its title. Each column is a focusable `role="img"` named in words ("Week
of 5 Oct: 41 completions"); the tip, labels and axis are hidden from screen readers because the name
already carries them. Bar rows are a list whose label and value are text. The table twin is the full
accessible version.

| Key | Effect |
|---|---|
| Tab | Moves column by column through the plot, then to Show the numbers as a table. |
| Enter or Space on the summary | Opens or closes the table. |

**Focus:** the ring draws around the column and the tip appears above it, so a keyboard user sees the same
value as a mouse user.

**Labelling:** the title says what is counted and the note says over what and for whom. Values are never
colour-coded; there is only one series.

**Motion:** the shimmer while loading and the hover fade stop under reduced motion. In forced colours the
bars draw in `CanvasText`.

**Touch:** tapping a column shows its tip; the table is the comfortable way to read exact numbers on a
phone.

## Content

Titles name the measure in sentence case: **Lesson completions per week**, **Learners who reached each
section**, **How much viewers watched**. Notes give the subject and the base: **Imago Dei in an Age of
Machines · 212 enrolled**. Weeks are **Week of 5 Oct**. Percentages are whole numbers. The suppression
sentence is always the same: **Fewer than 5 learners are in this group, so we don’t show their numbers.**

## Do and don't

### Do
Label only the values that matter: the highest and the latest.
```html
<div class="chart__plot"><div class="chart__col" role="img" tabindex="0" aria-label="Week of 21 Sep: 52 completions, the highest" style="--ll-chart-value: 100%"><span class="chart__label" aria-hidden="true">52</span><span class="chart__bar"></span></div><div class="chart__col" role="img" tabindex="0" aria-label="Week of 28 Sep: 47 completions" style="--ll-chart-value: 90%"><span class="chart__bar"></span></div><div class="chart__col" role="img" tabindex="0" aria-label="Week of 5 Oct: 41 completions" style="--ll-chart-value: 79%"><span class="chart__label" aria-hidden="true">41</span><span class="chart__bar"></span></div></div>
```

### Don't
Print a number on every column.
```html
<div class="chart__plot"><div class="chart__col" style="--ll-chart-value: 100%"><span class="chart__label">52</span><span class="chart__bar"></span></div><div class="chart__col" style="--ll-chart-value: 90%"><span class="chart__label">47</span><span class="chart__bar"></span></div><div class="chart__col" style="--ll-chart-value: 79%"><span class="chart__label">41</span><span class="chart__bar"></span></div></div>
```

### Do
Offer the same numbers as a table.
```html
<details class="chart__data"><summary>Show the numbers as a table</summary><div class="table-wrap"><table class="data-table"><caption>Learners who reached each section</caption><thead><tr><th scope="col">Section</th><th scope="col" class="num">Share</th></tr></thead><tbody><tr><td>1. Beginnings</td><td class="num">100%</td></tr><tr><td>2. Made, not manufactured</td><td class="num">82%</td></tr></tbody></table></div></details>
```

### Don't
Show a small group's numbers.
```html
<ol class="chart__rows"><li class="chart__row" style="--ll-chart-value: 67%"><span class="chart__row-label">Halifax learners (3)</span><span class="chart__track"><span class="chart__bar"></span></span><span class="chart__row-value">2 of 3</span></li></ol>
```
