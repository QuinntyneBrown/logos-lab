---
title: Accordion
tier: standard
order: 42
summary: Fold secondary detail under a short question or heading, so a long page stays calm until someone asks for more.
selector: .accordion
target: summary
states: default, hover, focus, open
matrix-variants: single, group, with icon, with count
apg: disclosure
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-fg-accent|--color-bg-surface|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use an accordion for answers and detail that only some people need: questions about a gathering, the fine
print of a plan, optional settings. Each item is a native `<details>` element, so it works without script.
Don't hide anything most people need to finish their task — put that on the page. Use [tabs](tabs.html)
when the sections are peers of equal weight, and a [dialog](dialog.html) when the content needs a decision.

## Anatomy

1. **Summary** — the always-visible row: a question or heading in the label face, 44px tall at least.
2. **Leading icon** — optional, decorative 20px line icon.
3. **Indicator** — the plus that becomes a minus when the item is open, drawn in `--color-fg-subtle`.
4. **Body** — the answer, in muted body text (`.accordion__body`).
5. **Hairline** — a bottom rule that separates one item from the next.

```html
<details class="accordion" open><summary><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/></svg>When does Field Day start?</summary><div class="accordion__body"><p>Saturday 17 October 2026 at 10:00 am. Coffee is ready from 9:30.</p></div></details>
```

## Variants

### single
One item on its own, for a single piece of optional detail.
```html
<details class="accordion"><summary>What should I bring to Field Day?</summary><div class="accordion__body"><p>Just yourself and a laptop if you are showing a demo. Lunch and coffee are covered.</p></div></details>
```

### group
Several independent items. Any number can be open at once; this suits a list of questions people read in any order.
```html
<div><details class="accordion"><summary>Who can see Harbour Notes?</summary><div class="accordion__body"><p>Everyone in Northwind can read every page. Only people you invite can edit.</p></div></details><details class="accordion"><summary>Can I export my notes?</summary><div class="accordion__body"><p>Yes. Export any notebook as Markdown or PDF from its settings.</p></div></details><details class="accordion"><summary>What happens when I leave a project?</summary><div class="accordion__body"><p>Your pages stay with the project and keep your name as the author.</p></div></details></div>
```

### exclusive
Items that share a `name` attribute open one at a time; opening one closes the others. Use it for steps or
alternatives that people compare one by one.
```html
<div><details class="accordion" name="plan"><summary>Morning: demos</summary><div class="accordion__body"><p>Ten-minute demos from each team, starting at 10:00 am.</p></div></details><details class="accordion" name="plan" open><summary>Midday: lunch together</summary><div class="accordion__body"><p>A long table, no agenda. Grace Liu is organising the food.</p></div></details><details class="accordion" name="plan"><summary>Afternoon: planning</summary><div class="accordion__body"><p>We set three goals for the next quarter and write them in Harbour Notes.</p></div></details></div>
```

### with icon
A leading icon helps people scan a settings page; the summary text still carries the meaning.
```html
<details class="accordion"><summary><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>Notification settings</summary><div class="accordion__body"><p>Choose which Northwind updates reach your inbox and which stay in the app.</p></div></details>
```

### with count
A count beside the summary tells people how much is inside before they open it.
```html
<details class="accordion"><summary>Open questions <span class="badge badge--count">3</span></summary><div class="accordion__body"><ul><li>Who books the room for Field Day?</li><li>Do we record the demos?</li><li>Which notebook holds the agenda?</li></ul></div></details>
```

## Sizes

N/A: one size. The summary is at least `--target-comfortable` (44px) tall and grows with its text.

## States

Hover turns the summary text sage; keyboard focus draws the 2px ring around the summary. Open swaps the
plus for a minus and reveals the body. There is no disabled accordion: if the content is not available,
leave the item out.

## Responsive

Accordions are full width at every breakpoint. At 360px long questions wrap onto two lines and the indicator
stays pinned to the right edge. On wide pages keep accordions inside the reading measure (`--layout-narrow`)
so the indicator does not drift far from the question.

## Accessibility

**Role:** the native `<details>` / `<summary>` disclosure: the summary is exposed as a button with its
expanded state. It follows the APG [disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/);
use the full [accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) with heading-wrapped
buttons only when the items must appear in the page outline.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves between summaries and any links inside open bodies. |
| Enter, Space | Opens or closes the focused item. |

**Focus:** focus stays on the summary when the item opens; the body follows it in tab order.

**Labelling:** write the summary as a complete question or heading. Icons and counts are supplementary;
the count badge is read as part of the summary text.

**Motion:** the body appears instantly; there is no height animation to wait for or to disable.

**Touch:** the whole summary row is the target, 44px tall at minimum.

## Content

Write summaries as the question people actually ask: **Can I export my notes?**, not **Export**. Answer in
the first sentence of the body, then add detail. Keep each body to a short paragraph or a list of three to
five items; if it needs more, it needs its own page.

## Do and don't

### Do
Phrase the summary as a real question and answer it straight away.
```html
<details class="accordion" open><summary>Can I export my notes?</summary><div class="accordion__body"><p>Yes. Export any notebook as Markdown or PDF from its settings.</p></div></details>
```

### Don't
Use a one-word label that makes people open the item to learn what it is about.
```html
<details class="accordion" open><summary>Export</summary><div class="accordion__body"><p>See settings.</p></div></details>
```

### Do
Keep the steps of a task on the page where people can see them.
```html
<ol><li>Open Harbour Notes.</li><li>Choose Export.</li><li>Pick Markdown or PDF.</li></ol>
```

### Don't
Hide the one thing everyone needs inside a closed item.
```html
<details class="accordion"><summary>How to export</summary><div class="accordion__body"><p>Open Harbour Notes, choose Export, then pick a format.</p></div></details>
```

## Tokens

Accordions read the default, muted and accent text roles, the hairline border and the comfortable target height.

## Code

Use native `<details class="accordion">` with a `<summary>` and one `.accordion__body`. Give related items the
same `name` to make them exclusive. Add `open` to start an item expanded.
