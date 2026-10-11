---
title: Data tables and lists
order: 60
summary: Show many things so they are easy to scan, compare and act on, at every width.
selector: .data-table, .bulk-bar, .list, .rows, .toolbar, .pager
components: table, list, search-filter-toolbar, pagination, checkbox, badge, avatar, card, empty-state, skeleton
---

## Overview

Choose the shape by what people do with the items. Compare values across columns: a
[table](../components/table.html). Read and open items one by one: a [list](../components/list.html) of
rows. Browse with pictures and a few facts: [cards](../components/card.html) in a grid. Whatever the shape,
the same frame sits around it: a search and filter [toolbar](../components/search-filter-toolbar.html) with a
visible count above, and [pagination](../components/pagination.html) or **Show more** below.

```html
<div class="stack">
  <div class="toolbar">
    <p class="toolbar__count" role="status"><strong>4</strong> of 48 notes in Harbour Notes</p>
    <div class="toolbar__tools">
      <label class="select"><span>Sort by</span><span class="select__wrap"><select class="select__control"><option>Last edited</option><option>Title</option><option>Author</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span></label>
    </div>
  </div>
  <div class="table-wrap">
    <table class="data-table">
      <caption>Notes in Harbour Notes</caption>
      <thead><tr><th scope="col">Title</th><th scope="col">Author</th><th scope="col">Status</th><th scope="col" class="num">Words</th><th scope="col">Last edited</th></tr></thead>
      <tbody>
        <tr><td><a href="#">Field Day checklist</a></td><td>Amara Osei</td><td><span class="badge badge--success">Ready</span></td><td class="num">412</td><td>Today, 9:40 am</td></tr>
        <tr><td><a href="#">Spring route options</a></td><td>Daniel Reyes</td><td><span class="badge badge--warning">Needs review</span></td><td class="num">1,284</td><td>Yesterday, 4:15 pm</td></tr>
        <tr><td><a href="#">Signage sketches</a></td><td>Grace Liu</td><td><span class="badge">Draft</span></td><td class="num">96</td><td>Wed 7 Oct</td></tr>
        <tr><td><a href="#">Interview notes, round 2</a></td><td>Hannah Kowalski</td><td><span class="badge badge--success">Ready</span></td><td class="num">2,050</td><td>Mon 5 Oct</td></tr>
      </tbody>
    </table>
  </div>
</div>
```

## When to use

- **Table:** people compare the same attributes across many items (status, owner, dates, counts), sort by
  columns, or select several items to act on together.
- **Rows list:** items are read one at a time, with a title and a line of detail: notes, messages, activity.
- **Card grid:** items are recognised by a picture or a mark as much as by name: people, projects.
- **Not a table** for layout, for a single record (use a [description list](../components/description-list.html)),
  or for fewer than about three items.

## Structure

1. **Toolbar** — search, filters and sort, with the result count as a sentence ("4 of 48 notes").
2. **Active filters** — removable pills, so people can see and undo what narrowed the list.
3. **Bulk bar** — appears only while items are selected, above the collection, and names the count.
4. **Collection** — a captioned table, a list of rows or a grid of cards.
5. **Paging** — numbered pages for stable lists, **Show more** for feeds.

### Selection and bulk actions

```html
<div class="table-wrap">
  <div class="bulk-bar" role="region" aria-label="Bulk actions">
    <span role="status">2 notes selected</span>
    <button class="btn btn--sm" type="button">Move to notebook</button>
    <button class="btn btn--sm" type="button">Archive</button>
    <button class="btn btn--text btn--sm" type="button">Clear selection</button>
  </div>
  <table class="data-table">
    <caption class="vh">Notes in Harbour Notes</caption>
    <thead><tr>
      <th scope="col"><input class="check__box" type="checkbox" aria-label="Select all notes" data-indeterminate="true"></th>
      <th scope="col" aria-sort="ascending"><button class="btn btn--ghost btn--sm" type="button" data-sort-demo>Title<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M7 10l5-5 5 5"/></svg></button></th>
      <th scope="col">Author</th>
      <th scope="col">Last edited</th>
    </tr></thead>
    <tbody>
      <tr aria-selected="true"><td><input class="check__box" type="checkbox" aria-label="Select Field Day checklist" checked></td><td><a href="#">Field Day checklist</a></td><td>Amara Osei</td><td>Today, 9:40 am</td></tr>
      <tr><td><input class="check__box" type="checkbox" aria-label="Select Interview notes, round 2"></td><td><a href="#">Interview notes, round 2</a></td><td>Hannah Kowalski</td><td>Mon 5 Oct</td></tr>
      <tr aria-selected="true"><td><input class="check__box" type="checkbox" aria-label="Select Signage sketches" checked></td><td><a href="#">Signage sketches</a></td><td>Grace Liu</td><td>Wed 7 Oct</td></tr>
    </tbody>
  </table>
</div>
```

### A list of rows

```html
<ul class="rows">
  <li><img class="avatar" src="../assets/photos/daniel-reyes.jpg" width="40" height="40" alt=""><div class="rows__main"><p class="rows__title"><a href="#">Spring route options</a></p><p class="rows__meta">Daniel Reyes · edited yesterday, 4:15 pm · 1,284 words</p></div><span class="badge badge--warning">Needs review</span></li>
  <li><img class="avatar" src="../assets/photos/grace-liu.jpg" width="40" height="40" alt=""><div class="rows__main"><p class="rows__title"><a href="#">Signage sketches</a></p><p class="rows__meta">Grace Liu · edited Wed 7 Oct · 96 words</p></div><span class="badge">Draft</span></li>
  <li><img class="avatar" src="../assets/photos/hannah-kowalski.jpg" width="40" height="40" alt=""><div class="rows__main"><p class="rows__title"><a href="#">Interview notes, round 2</a></p><p class="rows__meta">Hannah Kowalski · edited Mon 5 Oct · 2,050 words</p></div><span class="badge badge--success">Ready</span></li>
</ul>
```

## States

- **Loading:** skeleton rows or cards in the final layout; the toolbar stays usable.
- **Refreshing:** current rows stay, the count says "Updating…", and new results replace them in place.
- **Empty and no results:** an [empty state](empty-states.html) in the collection's place, with **Clear
  filters** when filters caused it. The toolbar stays.
- **Sorted:** the sorted column's header carries `aria-sort` and shows its direction; only one column at a
  time.
- **Selected:** rows tint sage and the bulk bar names the count. Select-all becomes mixed when only some
  rows are selected.
- **Failed:** an inline error in the collection's place with **Try again**; search terms and filters are
  kept.

```html
<div class="table-wrap" aria-busy="true" aria-label="Loading notes">
  <table class="data-table">
    <caption class="vh">Notes in Harbour Notes</caption>
    <thead><tr><th scope="col">Title</th><th scope="col">Author</th><th scope="col">Last edited</th></tr></thead>
    <tbody aria-hidden="true">
      <tr><td><span class="skeleton skeleton--text is-short"></span></td><td><span class="skeleton skeleton--text"></span></td><td><span class="skeleton skeleton--text is-short"></span></td></tr>
      <tr><td><span class="skeleton skeleton--text"></span></td><td><span class="skeleton skeleton--text is-short"></span></td><td><span class="skeleton skeleton--text is-short"></span></td></tr>
    </tbody>
  </table>
</div>
```

## Responsive

- **360px:** prefer a rows list or cards. When a table is the right shape, it scrolls sideways inside
  `.table-wrap`, with the first column as the row's name; the page itself never scrolls sideways. The bulk
  bar wraps its buttons; filters move into a bottom sheet behind a **Filters** button.
- **768px:** card grids go to two columns; tables show their full width when it fits.
- **1024px and up:** filters sit in a column beside the results; card grids go to three or four columns.

Long names and labels wrap; never truncate the one piece of text that identifies an item.

## Accessibility

**Tables:** a native `<table>` with a `<caption>` (visually hidden if a heading already says it) and
`<th scope="col">` headers. Use `scope="row"` when the first cell names the row. Don't add grid roles to a
table people only read.

**Sorting:** the header holds a button; the `th` carries `aria-sort="ascending"` or `"descending"`.

**Selection:** every checkbox is labelled with the item's name ("Select Field Day checklist"); select-all is
labelled for the collection and uses the mixed state. Announce the selected count in a status region.

**Row actions:** each names its object ("Archive Field Day checklist"), since a screen reader hears many
identical buttons otherwise.

**Lists:** use real `ul` and `li` so the count is announced. Result counts live in a `role="status"` region.

| Key | Effect |
|---|---|
| Tab | Moves through the links, checkboxes and buttons in reading order. |
| Space | Toggles the focused row checkbox. |
| Enter | Opens the focused item or activates a sort header. |

## Content

- **Counts** are numerals in a sentence: "4 of 48 notes", "2 notes selected", "Showing 25–48 of 120".
- **Column headers** are short nouns in sentence case: Title, Last edited, Words. Units go in the header,
  not every cell.
- **Dates** are relative when recent ("Today, 9:40 am", "Yesterday") and absolute after that ("Wed 7 Oct").
- **Empty cells** show an em dash or "Not set", never a blank.
- **Numbers** align right and use tabular figures, with thousands separators (1,284).

## Do and don't

### Do
Right-align numbers and keep the units in the header.
```html
<div class="table-wrap"><table class="data-table"><caption class="vh">Pages per notebook</caption><thead><tr><th scope="col">Notebook</th><th scope="col" class="num">Pages</th></tr></thead><tbody><tr><td>Harbour Notes</td><td class="num">120</td></tr><tr><td>Field Day planning</td><td class="num">1,048</td></tr></tbody></table></div>
```

### Don't
Use a table to lay out a single record.
```html
<div class="table-wrap"><table class="data-table"><caption class="vh">Profile</caption><tbody><tr><td>Name</td><td>Amara Osei</td></tr><tr><td>Role</td><td>Product designer</td></tr></tbody></table></div>
```

### Do
Name the object in every row action and selection label.
```html
<ul class="rows"><li><div class="rows__main"><p class="rows__title"><a href="#">Signage sketches</a></p><p class="rows__meta">Grace Liu · Wed 7 Oct</p></div><button class="btn btn--quiet btn--sm" type="button" aria-label="Archive Signage sketches">Archive</button></li></ul>
```

### Don't
Truncate the name that identifies an item.
```html
<ul class="rows"><li><div class="rows__main"><p class="rows__title"><a href="#">Interview notes, r…</a></p><p class="rows__meta">Hannah Kowalski</p></div></li></ul>
```
