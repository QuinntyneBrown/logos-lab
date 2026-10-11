---
title: Table
tier: core
order: 50
summary: Compare the same few facts across many rows: a captioned, hairline table that sorts, selects and scrolls without losing its header.
selector: .data-table
target: tbody tr
states: default, hover, selected, loading, empty, error
matrix-variants: default, selectable
matrix-cell: 40rem
apg: table
knobs: --bn-table-max-height = `calc(var(--space-40) + var(--space-24))` on `.table-wrap--scroll`
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface-sunken|4.5; --color-fg-default|--color-accent-subtle|4.5; --color-fg-accent|--color-accent-subtle|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a table when people compare the same attributes across rows — members and their roles, a budget, an
activity log — and may sort or act on several rows at once. Keep it to the columns that drive a decision;
put the rest on the row's detail page. Use a [list](list.html) when each item is read on its own, and
[cards](card.html) when items are visual or have uneven content.

## Anatomy

1. **Frame** — a rounded hairline container that scrolls sideways when the table is wider than the page (`.table-wrap`).
2. **Caption** — the table's name, in the label style, above the header.
3. **Header row** — `<th scope="col">` cells on the sunken surface in muted label text; sortable headers hold a button.
4. **Rows** — body-small text separated by hairlines; numbers align right (`.num`).
5. **Bulk bar** — optional sage band above the table that counts the selection and offers bulk actions (`.bulk-bar`).

```html
<div class="table-wrap"><table class="data-table"><caption>Northwind members</caption><thead><tr><th scope="col">Name</th><th scope="col">Role</th><th scope="col" class="num">Notes</th></tr></thead><tbody><tr><td>Amara Osei</td><td>Product designer</td><td class="num">42</td></tr><tr><td>Daniel Reyes</td><td>Engineer</td><td class="num">31</td></tr></tbody></table></div>
```

## Variants

### default
A caption, column headers and a handful of rows. Status uses a badge; counts align right.
```html
<div class="table-wrap"><table class="data-table">
  <caption>Northwind members</caption>
  <thead><tr><th scope="col">Name</th><th scope="col">Role</th><th scope="col">Status</th><th scope="col" class="num">Notes</th><th scope="col">Last active</th></tr></thead>
  <tbody>
    <tr><td>Amara Osei</td><td>Product designer</td><td><span class="badge badge--success">Active</span></td><td class="num">42</td><td>Today, 9:12 am</td></tr>
    <tr><td>Daniel Reyes</td><td>Engineer</td><td><span class="badge badge--success">Active</span></td><td class="num">31</td><td>Today, 8:40 am</td></tr>
    <tr><td>Grace Liu</td><td>Designer</td><td><span class="badge badge--warning">Invited</span></td><td class="num">0</td><td>Not yet</td></tr>
    <tr><td>Hannah Kowalski</td><td>Researcher</td><td><span class="badge">Away</span></td><td class="num">18</td><td>2 Oct 2026</td></tr>
  </tbody>
</table></div>
```

### dense
`data-table--dense` tightens the rows for logs and long lists people scan rather than read.
```html
<div class="table-wrap"><table class="data-table data-table--dense">
  <caption>Harbour Notes activity today</caption>
  <thead><tr><th scope="col">Time</th><th scope="col">Person</th><th scope="col">Change</th></tr></thead>
  <tbody>
    <tr><td>9:42 am</td><td>Grace Liu</td><td>Edited “Field Day agenda”</td></tr>
    <tr><td>9:15 am</td><td>Daniel Reyes</td><td>Added “Sync service notes”</td></tr>
    <tr><td>8:58 am</td><td>Amara Osei</td><td>Commented on “Roadmap”</td></tr>
    <tr><td>8:30 am</td><td>Hannah Kowalski</td><td>Moved “Interview notes” to Research</td></tr>
    <tr><td>8:02 am</td><td>Noah Fischer</td><td>Restored “Release checklist”</td></tr>
  </tbody>
</table></div>
```

### sortable
Sortable headers hold a button. The sorted column carries `aria-sort`; the others say `none`.
```html
<div class="table-wrap"><table class="data-table">
  <caption>Northwind members, sorted by name</caption>
  <thead><tr>
    <th scope="col" aria-sort="ascending"><button class="btn btn--ghost btn--sm" type="button" data-sort-demo>Name<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button></th>
    <th scope="col" aria-sort="none"><button class="btn btn--ghost btn--sm" type="button" data-sort-demo>Role<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 9 4-4 4 4M8 15l4 4 4-4"/></svg></button></th>
    <th scope="col" class="num" aria-sort="none"><button class="btn btn--ghost btn--sm" type="button" data-sort-demo>Notes<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 9 4-4 4 4M8 15l4 4 4-4"/></svg></button></th>
  </tr></thead>
  <tbody>
    <tr><td>Amara Osei</td><td>Product designer</td><td class="num">42</td></tr>
    <tr><td>Caleb Morgan</td><td>Founder</td><td class="num">9</td></tr>
    <tr><td>Daniel Reyes</td><td>Engineer</td><td class="num">31</td></tr>
    <tr><td>Grace Liu</td><td>Designer</td><td class="num">0</td></tr>
  </tbody>
</table></div>
```

### selectable
A checkbox column for acting on several rows. Checking a row tints it, and the bulk bar counts the selection and offers the actions.
```html
<div class="table-wrap">
  <div class="bulk-bar"><span class="bulk-bar__count">1 selected</span><button class="btn btn--quiet btn--sm" type="button">Export notes</button><button class="btn btn--quiet btn--sm" type="button">Remove from Northwind</button></div>
  <table class="data-table">
    <caption>Northwind members</caption>
    <thead><tr><th scope="col" class="data-table__check"><input class="check__box" type="checkbox" data-indeterminate="true" aria-label="Select all members"></th><th scope="col">Name</th><th scope="col">Role</th><th scope="col">Status</th></tr></thead>
    <tbody>
      <tr><td class="data-table__check"><input class="check__box" type="checkbox" aria-label="Select Amara Osei"></td><td>Amara Osei</td><td>Product designer</td><td><span class="badge badge--success">Active</span></td></tr>
      <tr><td class="data-table__check"><input class="check__box" type="checkbox" checked aria-label="Select Daniel Reyes"></td><td>Daniel Reyes</td><td>Engineer</td><td><span class="badge badge--success">Active</span></td></tr>
      <tr><td class="data-table__check"><input class="check__box" type="checkbox" aria-label="Select Grace Liu"></td><td>Grace Liu</td><td>Designer</td><td><span class="badge badge--warning">Invited</span></td></tr>
    </tbody>
  </table>
</div>
```

### row actions
The last column holds one quiet action and a more button per row; its header is visually hidden but still read.
```html
<div class="table-wrap"><table class="data-table">
  <caption>Notebooks in Northwind</caption>
  <thead><tr><th scope="col">Notebook</th><th scope="col">Owner</th><th scope="col" class="num">Pages</th><th scope="col" class="data-table__actions"><span class="vh">Actions</span></th></tr></thead>
  <tbody>
    <tr><td>Harbour Notes</td><td>Amara Osei</td><td class="num">128</td><td class="data-table__actions"><button class="btn btn--ghost btn--sm" type="button">Open<span class="vh"> Harbour Notes</span></button><button class="icon-btn icon-btn--sm" type="button" aria-label="More actions for Harbour Notes"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg></button></td></tr>
    <tr><td>Field Day plan</td><td>Caleb Morgan</td><td class="num">14</td><td class="data-table__actions"><button class="btn btn--ghost btn--sm" type="button">Open<span class="vh"> Field Day plan</span></button><button class="icon-btn icon-btn--sm" type="button" aria-label="More actions for Field Day plan"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg></button></td></tr>
  </tbody>
</table></div>
```

### sticky header
In a height-limited frame the header stays in view while the rows scroll. The frame is a focusable, labelled region so keyboard users can scroll it.
```html
<div class="table-wrap table-wrap--scroll" role="region" aria-labelledby="fd-cap" tabindex="0"><table class="data-table data-table--sticky">
  <caption id="fd-cap">Field Day sign-ups</caption>
  <thead><tr><th scope="col">Name</th><th scope="col">Arriving</th><th scope="col">Bringing</th></tr></thead>
  <tbody>
    <tr><td>Amara Osei</td><td>9:30 am</td><td>Demo: Northwind roadmap</td></tr>
    <tr><td>Daniel Reyes</td><td>10:00 am</td><td>Demo: sync service</td></tr>
    <tr><td>Grace Liu</td><td>9:45 am</td><td>Pastries</td></tr>
    <tr><td>Hannah Kowalski</td><td>10:00 am</td><td>Interview highlights</td></tr>
    <tr><td>Caleb Morgan</td><td>9:00 am</td><td>Coffee</td></tr>
    <tr><td>Noah Fischer</td><td>10:15 am</td><td>Nothing yet</td></tr>
    <tr><td>Leah Thompson</td><td>10:00 am</td><td>Name badges</td></tr>
    <tr><td>Marcus Bennett</td><td>10:30 am</td><td>A projector</td></tr>
  </tbody>
</table></div>
```

### numeric
Money and counts align right in tabular figures, and a footer row carries the total.
```html
<div class="table-wrap"><table class="data-table">
  <caption>Field Day budget</caption>
  <thead><tr><th scope="col">Item</th><th scope="col" class="num">Quantity</th><th scope="col" class="num">Each</th><th scope="col" class="num">Total</th></tr></thead>
  <tbody>
    <tr><td>Room hire</td><td class="num">1</td><td class="num">$240.00</td><td class="num">$240.00</td></tr>
    <tr><td>Coffee and pastries</td><td class="num">30</td><td class="num">$4.50</td><td class="num">$135.00</td></tr>
    <tr><td>Lunch</td><td class="num">30</td><td class="num">$12.00</td><td class="num">$360.00</td></tr>
    <tr><td>Printing</td><td class="num">40</td><td class="num">$0.75</td><td class="num">$30.00</td></tr>
  </tbody>
  <tfoot><tr><td>Total</td><td class="num"></td><td class="num"></td><td class="num">$765.00</td></tr></tfoot>
</table></div>
```

## Sizes

Two row heights: the default (`--space-3` vertical padding) for most tables and `data-table--dense`
(`--space-2`) for logs and long lists. Type stays at body-small in both.

## States

**Hover** washes the row in `--color-bg-subtle`. **Selected** rows turn sage; in a selectable table the
checkbox is the source of truth and the bulk bar counts the rows. **Loading** keeps the caption and
header and fills the body with skeleton lines of the expected shape. **Empty** replaces the body with a short
message and the action that fills it. **Error** says the rows did not load and offers a retry, without
losing the header.

### selectable / selected
```html
<div class="table-wrap">
  <div class="bulk-bar"><span class="bulk-bar__count">2 selected</span><button class="btn btn--quiet btn--sm" type="button">Export notes</button><button class="btn btn--quiet btn--sm" type="button">Remove from Northwind</button></div>
  <table class="data-table">
    <caption>Northwind members</caption>
    <thead><tr><th scope="col" class="data-table__check"><input class="check__box" type="checkbox" data-indeterminate="true" aria-label="Select all members"></th><th scope="col">Name</th><th scope="col">Role</th><th scope="col">Status</th></tr></thead>
    <tbody>
      <tr><td class="data-table__check"><input class="check__box" type="checkbox" checked aria-label="Select Amara Osei"></td><td>Amara Osei</td><td>Product designer</td><td><span class="badge badge--success">Active</span></td></tr>
      <tr><td class="data-table__check"><input class="check__box" type="checkbox" checked aria-label="Select Daniel Reyes"></td><td>Daniel Reyes</td><td>Engineer</td><td><span class="badge badge--success">Active</span></td></tr>
      <tr><td class="data-table__check"><input class="check__box" type="checkbox" aria-label="Select Grace Liu"></td><td>Grace Liu</td><td>Designer</td><td><span class="badge badge--warning">Invited</span></td></tr>
    </tbody>
  </table>
</div>
```

### loading
```html
<div class="table-wrap"><table class="data-table" aria-busy="true">
  <caption>Northwind members</caption>
  <thead><tr><th scope="col">Name</th><th scope="col">Role</th><th scope="col">Status</th><th scope="col" class="num">Notes</th></tr></thead>
  <tbody>
    <tr><td><span class="skeleton skeleton--text"></span></td><td><span class="skeleton skeleton--text is-short"></span></td><td><span class="skeleton skeleton--pill"></span></td><td class="num"><span class="skeleton skeleton--text is-short"></span></td></tr>
    <tr><td><span class="skeleton skeleton--text"></span></td><td><span class="skeleton skeleton--text is-short"></span></td><td><span class="skeleton skeleton--pill"></span></td><td class="num"><span class="skeleton skeleton--text is-short"></span></td></tr>
    <tr><td><span class="skeleton skeleton--text"></span></td><td><span class="skeleton skeleton--text is-short"></span></td><td><span class="skeleton skeleton--pill"></span></td><td class="num"><span class="skeleton skeleton--text is-short"></span></td></tr>
  </tbody>
</table></div>
```

### empty
```html
<div class="table-wrap"><table class="data-table">
  <caption>Northwind members</caption>
  <thead><tr><th scope="col">Name</th><th scope="col">Role</th><th scope="col">Status</th><th scope="col" class="num">Notes</th></tr></thead>
  <tbody><tr><td colspan="4"><div class="empty empty--compact"><p class="empty__title">No one here yet</p><p>Invite your team to Northwind to see them listed.</p><div class="empty__actions"><button class="btn btn--primary btn--sm" type="button">Invite people</button></div></div></td></tr></tbody>
</table></div>
```

### error
```html
<div class="table-wrap"><table class="data-table">
  <caption>Northwind members</caption>
  <thead><tr><th scope="col">Name</th><th scope="col">Role</th><th scope="col">Status</th><th scope="col" class="num">Notes</th></tr></thead>
  <tbody><tr><td colspan="4"><div class="empty empty--compact empty--error" role="alert"><span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg></span><p class="empty__title">Members didn't load</p><p>Check your connection, then try again.</p><div class="empty__actions"><button class="btn btn--quiet btn--sm" type="button">Try again</button></div></div></td></tr></tbody>
</table></div>
```

## Responsive

At 360px the frame scrolls sideways while the page stays put; keep the identifying column first so it is
always in view, and drop optional columns before the table needs to scroll. From 768px most member and
budget tables fit without scrolling. Below 768px, a table of fewer than four columns that people read row by
row may become a [list](list.html) instead. The bulk bar wraps its actions under the count.

## Theming

The frame and rows sit on `--color-bg-surface`, the header on `--color-bg-surface-sunken`, and hairlines use
`--color-border-default`. Hover and selection read the subtle and accent-subtle roles, which keep body text
above 4.5:1 in both themes.

## Accessibility

**Role:** a native `<table>` with a `<caption>` and `<th scope="col">` headers; it follows the APG
[table pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/). Don't use `role="grid"` unless every cell
is navigable with the arrow keys (the APG [grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)).

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves through sort buttons, checkboxes and row actions in reading order. |
| Enter, Space | Activates a sort button; Space toggles a row's checkbox. |
| Arrow keys | Scroll a focused, scrollable frame sideways or down. |

**Focus:** every sort button, checkbox and action shows the sage ring. A scrolling frame is a labelled
region with `tabindex="0"` so keyboard users can reach and scroll it.

**Labelling:** the caption names the table. `aria-sort` on the sorted header announces the order; the sort
button's text is the column name. Row checkboxes are labelled with the row's name (**Select Daniel Reyes**),
row actions too (**More actions for Harbour Notes**). The action column's header is visually hidden but
present. A loading table sets `aria-busy`; an error row is an alert.

**Motion:** row hover is an instant colour change; skeletons shimmer slowly and stop under reduced motion.

**Touch:** checkboxes sit in a 48px column; row actions are `btn--sm` and `icon-btn--sm` targets with
`--space-2` between them.

## Content

Caption every table with what it lists: **Northwind members**, **Field Day budget**. Headers are one or two
words in sentence case. Write dates the same way in every row (**Today, 9:12 am**, **2 Oct 2026**), put units
in the header or on every value, and replace blanks with words (**Not yet**). Empty and error rows say what
happened and what to do next.

## Do and don't

### Do
Align numbers right and show units on every value.
```html
<div class="table-wrap"><table class="data-table"><caption>Field Day budget</caption><thead><tr><th scope="col">Item</th><th scope="col" class="num">Total</th></tr></thead><tbody><tr><td>Room hire</td><td class="num">$240.00</td></tr><tr><td>Printing</td><td class="num">$30.00</td></tr></tbody></table></div>
```

### Don't
Left-align money with mixed precision; the columns stop lining up.
```html
<div class="table-wrap"><table class="data-table"><caption>Field Day budget</caption><thead><tr><th scope="col">Item</th><th scope="col">Total</th></tr></thead><tbody><tr><td>Room hire</td><td>240</td></tr><tr><td>Printing</td><td>$30.5</td></tr></tbody></table></div>
```

### Do
Label each row's controls with the row it belongs to.
```html
<button class="icon-btn icon-btn--sm" type="button" aria-label="More actions for Harbour Notes"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg></button>
```

### Don't
Repeat an identical "Edit" link in every row; screen reader users hear a list of identical links.
```html
<div class="table-wrap"><table class="data-table"><caption>Notebooks</caption><thead><tr><th scope="col">Notebook</th><th scope="col">Action</th></tr></thead><tbody><tr><td>Harbour Notes</td><td><a href="#">Edit</a></td></tr><tr><td>Field Day plan</td><td><a href="#">Edit</a></td></tr></tbody></table></div>
```

## Tokens

Tables read the surface, sunken and subtle backgrounds, accent-subtle for selection, the hairline border,
`--radius-lg` for the frame and the body-small and label type roles.

## Code

Wrap every table in `.table-wrap`. Add `data-table--dense` or `data-table--sticky` as needed, and
`table-wrap--scroll` (with the `--bn-table-max-height` knob) to limit the frame's height.
