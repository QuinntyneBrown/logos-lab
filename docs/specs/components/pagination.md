# Pagination

| Field | Value |
|---|---|
| Selector | `nav[llPagination]`, `div[llLoadMore]` |
| Library path | `frontend/projects/components/src/lib/pagination/` |
| Status | built |
| Traces to | L2-002, L2-005, L2-022, L2-051, L2-071, L2-089, L2-095, L2-099, L2-120, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-150 |
| Design system | [`pagination.html`](../../design-system/components/pagination.html) (the design-system "pager") |
| Source mocks | [`pages/explore/default`](../../mocks/pages/explore/default.html), [`pages/explore/partial`](../../mocks/pages/explore/partial.html), [`pages/topic/default`](../../mocks/pages/topic/default.html), [`pages/topic/long`](../../mocks/pages/topic/long.html), [`pages/experts/default`](../../mocks/pages/experts/default.html), [`pages/experts/long`](../../mocks/pages/experts/long.html), [`pages/experts/invalid`](../../mocks/pages/experts/invalid.html), [`pages/admin-users/default`](../../mocks/pages/admin-users/default.html), [`pages/admin-users/long`](../../mocks/pages/admin-users/long.html), [`pages/admin-users/invalid`](../../mocks/pages/admin-users/invalid.html), [`pages/admin-audit/default`](../../mocks/pages/admin-audit/default.html), [`pages/admin-audit/long`](../../mocks/pages/admin-audit/long.html), [`pages/moderation-audit/long`](../../mocks/pages/moderation-audit/long.html), [`pages/events/default`](../../mocks/pages/events/default.html), [`pages/events/long`](../../mocks/pages/events/long.html), [`pages/saved/long`](../../mocks/pages/saved/long.html), [`pages/saved/limit`](../../mocks/pages/saved/limit.html) |
| Rendering | [`pagination.html`](pagination.html) |

## Purpose and scope

Pagination moves through a list that is too long to show at once, one calm control under the list: a
thin sage meter, a plain count and the way to the rest. It comes in two forms, which are two components
that share the `.pager` look:

- **Pagination** (`nav[llPagination]`) is numbered pages. Every page is a real URL, so a page can be
  bookmarked and shared (`L2-002`): the catalogue "Page 1 of 9", the topic and expert directories,
  the user list "Page 2 of 97", the audit logs. It shows the first and last page, the pages around the
  current one, and "Previous page" and "Next page".
- **LoadMore** (`div[llLoadMore]`) is one quiet "Show 6 more events" button that appends the next batch
  below the last item, with the meter and a count: the events list ("3 of 9 upcoming events") and
  Miriam Clarke's saved items ("12 of 214 saved items").

Use neither for a list the page can show whole. A "Load more" inside a dialog or panel (the
notification centre) and the comments' "Show more comments" are plain [buttons](button.md) with no
meter (D-16). Use [tabs](tabs.md) to switch between a few sibling views, not pages of one list.

Out of scope:

- Which page is current, the page count and the batch size: the page, from its own data and the URL.
  The page resets to page 1 when a filter or sort changes (`L2-002`).
- Fetching, appending and the loading of items; moving focus to the first new item (D-9).
- Redirecting an invalid `page` value in the URL (the page; the component only clamps, D-14).
- The text of the count and of the labels: the page translates and formats it.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/explore/default`, `partial` | `Pagination`, label "Pages of the catalogue", page 1 of 9 (212 items, 24 per page) | "Page 1 of 9"; 1, 2, 3, …, 9; "Next page" | first page, current page | canvas |
| `pages/topic/default`, `long` | `Pagination`, label "Pages of Theology of technology" / "Pages of The image of God and personhood", page 1 of 2 | "Page 1 of 2"; 1, 2; "Next page" | first page | canvas |
| `pages/experts/default`, `long`, `invalid` | `Pagination`, label "Pages of experts", page 1 of 2 | "Page 1 of 2"; 1, 2; "Next page" | first page | canvas |
| `pages/admin-users/default`, `invalid` | `Pagination`, label "Pages of users", page 1 of 97 (4,812 users, 50 per page) | "Page 1 of 97"; 1, 2, 3, …, 97; "Next page" | first page | canvas |
| `pages/admin-users/long` | the same, page 2 of 97 | "Page 2 of 97"; "Previous page"; 1, 2, 3, …, 97; "Next page" | middle page, with Previous | canvas |
| `pages/admin-audit/default`, `long` | `Pagination`, label "Pages of audit entries", page 1 and page 2 of 25 | "Page 1 of 25"; 1, 2, 3, …, 25 | first, second page | canvas |
| `pages/moderation-audit/long` | `Pagination`, label "Pages of audit entries", page 1 of 13 | "Page 1 of 13"; 1, 2, 3, …, 13 | first page | canvas |
| `pages/events/default`, `long` | `LoadMore`, 3 of 9 | button "Show 6 more events"; "3 of 9 upcoming events" | default | canvas |
| `pages/saved/long` | `LoadMore`, 12 of 214 | button "Show 12 more saved items"; "12 of 214 saved items" | default | canvas |
| `pages/saved/limit` | `LoadMore`, 12 of 1,000 | button "Show 12 more saved items"; "12 of 1,000 saved items" | default, near-empty meter | canvas |
| The design-system page | numbered pages and load more, with the busy and complete states | "Show 12 more notes", "12 of 148 notes · page 1 of 13" | default, hover, focus, busy, complete | canvas |

## Anatomy

1. **Container** — `.pager` on the host. A centred grid below the list: `--space-16` above it,
   `--space-8` below, `--space-4` between its parts.
2. **Meter** — `div.pager__meter`, `--border-width-thick` tall and `min(--size-pager-meter, 100%)` wide,
   a `--color-border-default` track with a `--color-accent` fill (`span`) whose width is
   `--ll-pager-progress`, never narrower than `--space-2`. Decorative (`aria-hidden="true"`).
3. **Count** — `p.pager__text`, the page's count in `--text-body-sm`, `--color-fg-subtle`, tabular
   figures. It is the meter's text equivalent and a polite live region.
4. **Pages row (Pagination)** — `div.pager__pages`, a wrapping flex row, `--space-2` apart: Previous
   page, the page numbers with `span` ellipses, Next page.
5. **Page link** — `a.btn.btn--quiet.btn--sm`; the current page is `a.btn.btn--sm` with
   `aria-current="page"` and the accent fill.
6. **Previous and next (Pagination)** — `a.btn.btn--quiet.btn--sm` with `rel="prev"` and `rel="next"`,
   visible text "Previous page" and "Next page"; a plain disabled link at either end.
7. **More button (LoadMore)** — `button.btn.btn--quiet.btn--lg`, the first child, above the meter.

Order in the DOM: Pagination is meter, count, pages; LoadMore is button, meter, count (as the mocks
draw them).

Host: `nav[llPagination]` is the `nav` landmark itself; `div[llLoadMore]` is a plain `div`. Each adds
the `.pager` class and renders its children; neither adds outer margin beyond the container padding.

## API

### `Pagination` (`nav[llPagination]`)

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string` | — | yes | Becomes the `nav`'s `aria-label`: "Pages of the catalogue". Distinct on a page (`L2-127`). |
| `page` | `number` | — | yes | The current page, 1-based. Truncated to an integer and clamped to 1 to `pageCount` (D-14). |
| `pageCount` | `number` | — | yes | The number of pages. Fewer than 2 (or not a finite number) renders nothing (D-13). |
| `summary` | `string` | — | yes | The count text, translated by the page: "Page 2 of 97". |
| `pageLabel` | `string` | — | yes | The accessible name of a page link, with a `{page}` placeholder: "Page {page}" gives "Page 2" (D-3). |
| `previousLabel` | `string` | — | yes | Visible text and name of the previous link: "Previous page". |
| `nextLabel` | `string` | — | yes | Visible text and name of the next link: "Next page". |
| `queryParam` | `string` | `'page'` | no | The query parameter that carries the page. |

`Pagination` has no outputs: each control is a router link to the current route with the query
parameter set, `queryParamsHandling: 'merge'` (every other parameter is kept) and the parameter
removed for page 1, so `/explore?type=video&topic=ai-ethics&page=3` and `/explore?type=video&topic=ai-ethics`
(D-8). The component does not read the router state; the page passes the current `page`.

The window of numbers is the component's rule (see *Page window* below).

### `LoadMore` (`div[llLoadMore]`)

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `shown` | `number` | — | yes | How many items are on the page now. Clamped to 0 to `total`. |
| `total` | `number` | — | yes | How many items there are. Below 1 (or not finite) renders nothing. |
| `moreLabel` | `string` | — | yes | The button's text, naming the number and the thing: "Show 6 more events". The page works out the number. |
| `summary` | `string` | — | yes | The count text, translated and number-formatted by the page: "3 of 9 upcoming events", "12 of 1,000 saved items", and when complete "All 9 upcoming events shown". |
| `busy` | `boolean` | `false` | no | The next batch is loading. Keeps the label, adds the spinner, sets `aria-busy="true"` and `aria-disabled="true"`, ignores activation. Focus stays (D-9). |

| Output | Payload | Emitted when |
|---|---|---|
| `more` | `void` | The button is activated (click, Enter, Space) while not `busy` and not complete. Never emitted while busy. |

The page owns the state: it appends the batch, raises `shown`, clears `busy` and moves focus. When
`shown` reaches `total` the component is complete and shows no button.

### Content slots

None. Both components render their own children from the inputs; the strings arrive translated.

### Page window (Pagination)

With `N` = `pageCount` and `p` = the clamped `page`:

1. The **window** is three consecutive pages that contain `p`: it starts at `clamp(p − 1, 1, max(1, N − 2))`
   and ends at `min(N, start + 2)`. So page 1 and page 2 both show 1, 2, 3; page 5 shows 4, 5, 6; the last
   page shows `N − 2`, `N − 1`, `N`.
2. The pages shown are the first page, the window and the last page, sorted and without repeats.
3. Between two shown pages `a` and `b`: if `b − a = 2` the one page between them is shown (an ellipsis
   would hide a single number); if `b − a > 2` one ellipsis (`span[aria-hidden]`) is shown; otherwise
   nothing.
4. The window does not change with the viewport. Below `40rem` the numbers and ellipses are hidden
   altogether (*Responsive behaviour*).

| `p` of `N` | Renders |
|---|---|
| 1 of 1, 1 of 0 | nothing |
| 1 of 2 | 1 2 |
| 1 of 5 | 1 2 3 4 5 |
| 4 of 6 | 1 2 3 4 5 6 |
| 1 of 9 | 1 2 3 … 9 |
| 2 of 97 | 1 2 3 … 97 |
| 5 of 97 | 1 … 4 5 6 … 97 |
| 96 of 97 | 1 … 95 96 97 |
| 97 of 97 | 1 … 95 96 97 |

Previous page is present on every rendered pager and disabled on page 1; Next page is present and
disabled on the last page (D-4).

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Numbered pages | `nav.pager` with `.pager__pages` | Lists whose pages are URLs: catalogue, topic, experts, users, audit logs. |
| Load more | `div.pager` with a `btn--lg` button | Lists that grow in place: events, saved items. |

| Size | Modifier | Height | Padding | Type |
|---|---|---|---|---|
| Page controls | `.btn--sm` | `--control-height-sm`; at least `--target-comfortable` below `48rem` | `--space-4` | `--text-label` |
| More button | `.btn--lg` | `--control-height-lg` | `--space-8` | `--font-size-md` |

The meter is `--size-pager-meter` wide (or the container's width when narrower) and
`--border-width-thick` tall in both variants.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Quiet outlined pills; the current page filled | "Pages of the catalogue, navigation" |
| Hover | `:hover` | `--color-bg-subtle` wash and `--color-fg-default` border (the button's own) | — |
| Focus | `:focus-visible` | The shared sage ring | The control's name |
| Current page | `aria-current="page"` | `--color-accent` fill, `--color-fg-on-accent` text; no hover change | "Page 2, current page, link" |
| Disabled end | Previous on page 1, Next on the last page | The disabled button look, `not-allowed` cursor; not focusable, no `href` | "Previous page, link, dimmed" |
| Hidden | Fewer than 2 pages; `total` below 1 | Nothing rendered, host `hidden` | Not in the accessibility tree |
| Busy (LoadMore) | `busy` | Spinner before the label; same fill; `cursor: progress` | "Show 6 more events, button, busy"; focus kept |
| Complete (LoadMore) | `shown` ≥ `total` | No button; the meter full; the count says all are shown | The count is announced |
| Collapsed | Viewport under `40rem` | Page numbers and ellipses hidden; Previous and Next remain | The links are not in the tab order |

## Markup

```html
<!-- rendered: Pagination, page 2 of 97 -->
<nav class="pager" aria-label="Pages of users">
  <div class="pager__meter" aria-hidden="true" style="--ll-pager-progress: 2%"><span></span></div>
  <p class="pager__text" aria-live="polite">Page 2 of 97</p>
  <div class="pager__pages">
    <a class="btn btn--quiet btn--sm" href="/admin/users" rel="prev">Previous page</a>
    <a class="btn btn--quiet btn--sm" href="/admin/users" aria-label="Page 1">1</a>
    <a class="btn btn--sm" href="/admin/users?page=2" aria-label="Page 2" aria-current="page">2</a>
    <a class="btn btn--quiet btn--sm" href="/admin/users?page=3" aria-label="Page 3">3</a>
    <span aria-hidden="true">…</span>
    <a class="btn btn--quiet btn--sm" href="/admin/users?page=97" aria-label="Page 97">97</a>
    <a class="btn btn--quiet btn--sm" href="/admin/users?page=3" rel="next">Next page</a>
  </div>
</nav>
```

```html
<!-- rendered: Pagination, first page (Previous page disabled) -->
<nav class="pager" aria-label="Pages of the catalogue">
  <div class="pager__meter" aria-hidden="true" style="--ll-pager-progress: 11%"><span></span></div>
  <p class="pager__text" aria-live="polite">Page 1 of 9</p>
  <div class="pager__pages">
    <a class="btn btn--quiet btn--sm" role="link" aria-disabled="true" rel="prev">Previous page</a>
    <a class="btn btn--sm" href="/explore" aria-label="Page 1" aria-current="page">1</a>
    <a class="btn btn--quiet btn--sm" href="/explore?page=2" aria-label="Page 2">2</a>
    <a class="btn btn--quiet btn--sm" href="/explore?page=3" aria-label="Page 3">3</a>
    <span aria-hidden="true">…</span>
    <a class="btn btn--quiet btn--sm" href="/explore?page=9" aria-label="Page 9">9</a>
    <a class="btn btn--quiet btn--sm" href="/explore?page=2" rel="next">Next page</a>
  </div>
</nav>
```

```html
<!-- rendered: LoadMore, events (3 of 9) -->
<div class="pager">
  <button class="btn btn--quiet btn--lg" type="button">Show 6 more events</button>
  <div class="pager__meter" aria-hidden="true" style="--ll-pager-progress: 33%"><span></span></div>
  <p class="pager__text" aria-live="polite">3 of 9 upcoming events</p>
</div>
```

```html
<!-- rendered: LoadMore, busy -->
<div class="pager">
  <button class="btn btn--quiet btn--lg" type="button" aria-busy="true" aria-disabled="true"><span class="spinner" aria-hidden="true"></span>Show 12 more saved items</button>
  <div class="pager__meter" aria-hidden="true" style="--ll-pager-progress: 6%"><span></span></div>
  <p class="pager__text" aria-live="polite">12 of 214 saved items</p>
</div>
```

```html
<!-- rendered: LoadMore, complete -->
<div class="pager">
  <div class="pager__meter" aria-hidden="true" style="--ll-pager-progress: 100%"><span></span></div>
  <p class="pager__text" aria-live="polite">All 9 upcoming events shown</p>
</div>
```

```html
<!-- consumer: Pagination -->
<nav llPagination label="Pages of the catalogue" i18n-label
     [page]="page()" [pageCount]="pageCount()" [summary]="summary()"
     pageLabel="Page {page}" i18n-pageLabel
     previousLabel="Previous page" i18n-previousLabel
     nextLabel="Next page" i18n-nextLabel />

<!-- consumer: LoadMore -->
<div llLoadMore [shown]="events().length" [total]="total()" [busy]="loading()"
     [moreLabel]="moreLabel()" [summary]="summary()" (more)="loadNext()"></div>
```

The mocks draw the current page's link as `btn btn--sm` with no `aria-label`, the first page without a
disabled Previous page, and the load-more control as `a.btn` with `role="presentation"` on the meter; this
CRD supersedes those (D-3, D-4, D-10, D-11).

## Design

- Container: `display: grid`, `justify-items: center`, gap `--space-4`, `padding-block` `--space-16`
  above and `--space-8` below. A host with `hidden` is `display: none` (the component stylesheet states
  `.pager[hidden] { display: none; }`, because the grid would otherwise override the attribute).
- Meter: width `min(--size-pager-meter, 100%)`, height `--border-width-thick`, `--radius-full`,
  `overflow: hidden`, track `--color-border-default`. Fill `span`: `display: block`, width
  `--ll-pager-progress`, `min-width: --space-2`, full height, `--color-accent`. The fill changes with no
  transition.
- Count: `--text-body-sm`, `--color-fg-subtle`, `font-variant-numeric: tabular-nums`.
- Pages row: `display: flex`, `flex-wrap: wrap`, `align-items: center`, `justify-content: center`,
  gap `--space-2`.
- Current page: background `--color-accent`, text `--color-fg-on-accent`, unchanged on hover and focus
  (the ring still draws).
- Ellipsis: the surrounding text colour, `--color-fg-subtle`, not interactive.
- Below `48rem` every control in the row is at least `--target-comfortable` tall and wide
  (`min-height` and `min-width`), so a single digit is not a narrow pill (D-7).
- Below `40rem` the row shows only Previous page and Next page: `.pager__pages > a:not([rel])` and
  `.pager__pages > span` are `display: none` (D-6).
- The buttons take their shape, hover, active, disabled and busy looks from [button](button.md); the
  pager adds no button styling beyond the current page.
- Layer: none. Motion: none of its own; the spinner and the button's press follow the button.

Component tokens:

| Token | Aliases | Overridden by |
|---|---|---|
| `--ll-pager-progress` | `1%` | Set on `.pager__meter` by the component: `round(page / pageCount × 100)%` for `Pagination`, `round(shown / total × 100)%` for `LoadMore`, clamped to 0 to 100 |

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Count | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Meter track | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Meter fill | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Current page fill | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Current page text | `--color-fg-on-accent` | `--palette-birch-50` | `--palette-accent-950` |
| Control outline | `--color-border-strong` | `--palette-stone-500` | `--palette-night-500` |
| Control text | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Hover wash | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |
| Disabled text | `--color-fg-disabled` | `--palette-oat-400` | `--palette-night-500` |
| Focus ring | `--color-focus-ring` | `--palette-accent-700` | `--palette-accent-300` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-subtle` | `--color-bg-canvas` | 4.5:1 | The count |
| `--color-fg-on-accent` | `--color-accent` | 4.5:1 | The current page number |
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | Quiet page links and the more button |
| `--color-accent` | `--color-border-default` | 3:1 | Meter fill against its track |
| `--color-border-strong` | `--color-bg-canvas` | 3:1 | The outline of a page link |
| `--color-focus-ring` | `--color-bg-canvas` | 3:1 | Focus ring |

## Responsive behaviour

- **From 40rem (SM) up:** the full row: Previous page, the window of numbers with ellipses, Next page.
  The widest case (page 5 of 97: five numbers, two ellipses and both text links) fits in one row from
  `40rem`; if a longer translated label does not fit, the row wraps to a second line, centred, rather than
  overflowing (`L2-150`).
- **Below 40rem (XS):** the numbers and ellipses are hidden and the row is Previous page and Next page
  under the count "Page 3 of 13", so the row never wraps at 360 px (D-6). The meter shrinks to the
  container.
- **Below 48rem (XS and MD):** every control is at least 44 × 44 CSS px (`--target-comfortable`).
- LoadMore is unchanged at every width: the large button centred, wrapping its label rather than
  overflowing; the meter shrinks to the container.
- The pager stays centred under the list at every width.
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom everything stays available; every target is at least 44 × 44 CSS px on touch devices.

## Accessibility

### Role and pattern

`Pagination` is a `nav` landmark named by `label` holding links. The current page link has
`aria-current="page"`; there are no tab or button roles. `LoadMore` is a native `button` in a plain
`div`; it is not a landmark, because it is one button. The meter and the ellipses are decorative
(`aria-hidden="true"`); the count says the same in words.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Moves between the controls in visual order. A disabled Previous page or Next page is skipped. |
| <kbd>Enter</kbd> | Follows the focused page link. On the more button, activates it. |
| <kbd>Space</kbd> | Activates the more button. |

### Focus

- The shared focus ring (`--color-focus-ring`, at least 2 CSS px, 3:1) is drawn on every control and
  is not obscured by a sticky header.
- Paging keeps focus on the control that was pressed: the page link, or Previous or Next, stays focused
  after the route changes, and the component never sends focus to the top of the page. The one exception:
  when the focused Previous page or Next page becomes disabled (the first or last page is reached), focus
  moves to the current page link, so it is never lost (D-9).
- LoadMore keeps focus on the button while `busy`. The page moves focus to the first newly loaded item
  after it appends the batch (`L2-126`); that is also what keeps focus from falling to the page when the
  last batch removes the button (D-9).
- Whether the viewport scrolls after paging is the page's choice; the component does not scroll.

### Labelling

- The `nav` is named by `label`, distinct on a page ("Pages of the catalogue", "Pages of audit
  entries"); the page's other navigation (the dashboard's, the tabs') has other names (`L2-127`).
- A page link's name is `pageLabel` with the number ("Page 2"); its visible text is the number, which the
  name contains. Previous page and Next page are named by their visible text.
- The current page link reads "Page 2, current page". A disabled end reads as dimmed.
- The more button's name is `moreLabel`; busy adds "busy" and keeps the name.

### Announcements

- The count is `aria-live="polite"`: after paging within the page (the component persists across the
  route change) or loading more, the new "Page 3 of 97" or "24 of 214 saved items" is announced without
  moving focus (`L2-127`).
- No other live region; the page's own results count (the catalogue's "Showing 25–48 of 212 items")
  is announced by the page.

### Motion

The meter fill changes without animation, always. The spinner in the busy button and the button's press
follow [button](button.md) and are removed under reduced motion. New items may enter with the shared
entrance, which reduced motion removes; that is the page's.

## Content and internationalisation

- The page writes every string and passes it in: `label`, `summary`, `pageLabel`, `previousLabel`,
  `nextLabel`, `moreLabel`. The component adds no words of its own.
- Say what loads and how many: "Show 6 more events", "Show 12 more saved items", not "Load more" or "More"
  (D-15). The count uses figures and the item's name: "3 of 9 upcoming events", "12 of 1,000 saved
  items", "Page 2 of 97". When complete: "All 9 upcoming events shown", never "No more results".
- Numbers in `summary` and `moreLabel` are formatted by the page with the active locale (1,000 reads
  "1 000" in French). The component formats the digits of the page links with the active locale itself.
- A label 30 % longer in the pseudo-locale wraps within its button (`L2-150`).
- Translatable inputs: `label`, `summary`, `pageLabel`, `previousLabel`, `nextLabel`, `moreLabel`.
  Data values: `page`, `pageCount`, `shown`, `total`, `queryParam`, `busy`.

## Performance

- Change detection: `OnPush`, signal inputs. The window is a `computed` of `page` and `pageCount`;
  page links are tracked by page number so paging reuses the elements and the focused link keeps focus.
- Perf-test scenario: none in this repository yet; the catalogue page renders the pager for 212 items
  ("Page 1 of 9") and Miriam Clarke's saved items render the load-more for "12 of 214 saved items".
  Page budgets per `L2-120`.
- Composite scenarios: none.
- Layout stability: the pager renders with the first page of results, in one pass, with the meter and
  count at their final size, so it adds no layout shift; busy keeps the button's width-defining label.

## Acceptance criteria

### Rendering

- **AC-1** Given the catalogue of 212 published items at 24 per page, when `/explore` renders, then the "Pages of the catalogue" navigation shows "Page 1 of 9", a disabled "Previous page", "1" as the current page, links "2" and "3", an ellipsis, link "9" and "Next page". (L2-002)
- **AC-2** Given the topic "Theology of technology" with 30 published items, when its page renders, then the navigation is named "Pages of Theology of technology" and shows "Page 1 of 2", "1" as the current page, "2" and "Next page". (L2-005)
- **AC-3** Given 38 experts with completed profiles at 24 per page, when `/experts` renders, then the "Pages of experts" navigation shows "Page 1 of 2", links "1" and "2" and "Next page", and no ellipsis. (L2-022)
- **AC-4** Given an Administrator (Isaac Moreau) on page 2 of the 4,812 users at 50 per page, when `/admin/users?page=2` renders, then the "Pages of users" navigation shows "Page 2 of 97", an enabled "Previous page", links "1", "2" (current) and "3", an ellipsis, "97" and "Next page". (L2-095)
- **AC-5** Given page 5 of 97, when the pager renders, then the numbers are "1", an ellipsis, "4", "5" (current), "6", an ellipsis and "97", in that order. (L2-095)
- **AC-6** Given page 97 of 97, when the pager renders, then the numbers are "1", an ellipsis, "95", "96", "97" (current), "Previous page" is enabled and "Next page" is disabled; and given page 96, then the same numbers show with "96" current and "Next page" enabled. (L2-095)
- **AC-7** Given the administrative audit log with 25 pages, when `/admin/audit` renders on page 1, then the "Pages of audit entries" navigation shows "Page 1 of 25", links "1", "2" and "3", an ellipsis and "25". (L2-099)
- **AC-8** Given the moderation audit trail with 13 pages, when it renders on page 1, then the "Pages of audit entries" navigation shows "Page 1 of 13", links "1", "2" and "3", an ellipsis and "13". (L2-089)
- **AC-9** Given 5 pages on page 1 and 6 pages on page 4, when the pager renders, then it shows "1 2 3 4 5" and "1 2 3 4 5 6" with no ellipsis, because an ellipsis never stands for a single page. (L2-002)
- **AC-10** Given a topic with 10 published items (one page), or no published items, when its page renders, then no pager renders: no navigation landmark, no meter and no count. (L2-005)
- **AC-11** Given the URL `/explore?page=99` while the catalogue has 9 pages, or `?page=0`, or `?page=2.7`, when the pager renders, then the current page is 9, 1 and 2 respectively. (L2-002)
- **AC-12** Given `/explore?type=video&topic=ai-ethics` on page 1, when the member follows "Next page" and then "1", then the URLs are `/explore?type=video&topic=ai-ethics&page=2` and `/explore?type=video&topic=ai-ethics`, with the filters kept and no `page` parameter on page 1. (L2-002)
- **AC-13** Given page 1 of 9, when the meter renders, then it is hidden from assistive technology and its fill is 11 % wide, and given page 9 of 9 the fill is 100 %. (L2-127)
- **AC-14** Given the events list with 3 of 9 upcoming events shown, when it renders, then a button "Show 6 more events" shows above a meter filled to 33 % and the count "3 of 9 upcoming events". (L2-051)
- **AC-15** Given Miriam Clarke's 214 saved items with 12 shown, when `/dashboard/saved` renders, then the button reads "Show 12 more saved items", the meter is filled to 6 % and the count reads "12 of 214 saved items". (L2-071)
- **AC-16** Given Miriam at the 1,000-item limit with 12 shown, when the page renders, then the count reads "12 of 1,000 saved items", the meter fill is 1 % of the track but never narrower than `--space-2`, so it stays visible. (L2-071)
- **AC-17** Given the events list, when the member presses "Show 6 more events", then the component emits `more` once and the page appends the next batch below the last event. (L2-051)
- **AC-18** Given a member with no saved items (a `total` of 0), when the saved page renders, then no pager renders, and the page shows its own empty state. (L2-071)

### States

- **AC-19** Given page 2 of 97, when the pager renders, then only "2" has `aria-current="page"`, with the accent fill and `--color-fg-on-accent` text, and every other number is a quiet outlined link. (L2-127)
- **AC-20** Given page 1 of 9, when the pager renders, then "Previous page" is a link with `aria-disabled="true"`, no `href` and no tab stop, pressing it does nothing, and it takes the same space as on page 2. (L2-127)
- **AC-21** Given the saved items with the next batch loading, when `busy` is set, then the button shows a spinner before "Show 12 more saved items", has `aria-busy="true"` and `aria-disabled="true"`, is not natively disabled, and pressing it again emits no second `more`. (L2-127)
- **AC-22** Given the events list showing 9 of 9, when it renders, then there is no button, the meter is full, and the count reads "All 9 upcoming events shown". (L2-051)

### Keyboard and focus

- **AC-23** Given page 1 of 9, when a keyboard user presses <kbd>Tab</kbd> from the last result, then focus visits "1", "2", "3", "9" and "Next page" in order, skipping the disabled "Previous page", and <kbd>Enter</kbd> on "3" opens page 3. (L2-126)
- **AC-24** Given a keyboard user who activates "Next page" on page 8 of 9, when page 9 renders, then focus does not jump to the top of the page; and because "Next page" is now disabled, focus moves to "9", the current page, and is not lost. (L2-126)
- **AC-25** Given a keyboard user on "Show 6 more events", when they press <kbd>Enter</kbd> and the batch arrives, then focus stays on the button while it is busy, then moves to the first new event; and when that batch is the last, the button is removed and focus is on the first new event, not on the page. (L2-126)
- **AC-26** Given any focused control of the pager, when it is measured, then it shows a focus ring at least 2 CSS px thick with at least 3:1 contrast, not obscured by a sticky header. (L2-126)

### Screen readers

- **AC-27** Given the user-list page and the dashboard's own navigation, when the landmarks are listed, then "Pages of users" is a distinct navigation, the page links read "Page 2, current page, link" and "Page 3, link", and "Next page" reads "Next page, link". (L2-127)
- **AC-28** Given a screen-reader user on "Next page" of page 2 of 97, when page 3 loads, then "Page 3 of 97" is announced politely and focus does not move; and the ellipses and the meter are not read. (L2-127)

### Theming

- **AC-29** Given the dark theme, when both forms render, then the meter track and fill, the count, the current page and the controls use tokens with dark values, and no element keeps a light-only colour. (L2-134)
- **AC-30** Given both themes, when contrast is measured with the design-system pairs, then the count meets 4.5:1 on the canvas, the current page number meets 4.5:1 on its fill, the meter fill meets 3:1 on its track, and the focus ring meets 3:1. (L2-134)

### Responsive

- **AC-31** Given the catalogue pager at 360 px on page 3 of 9, when it renders, then only "Previous page" and "Next page" show under "Page 3 of 9" on one row, the numbers and ellipses are hidden and out of the tab order, and the page does not scroll horizontally. (L2-130)
- **AC-32** Given the events pager at 320 px, when it renders, then the meter shrinks to the container, the button label wraps if it must, and nothing is cut off or scrolls horizontally. (L2-130)
- **AC-33** Given a touch viewport of 375 px and a tablet of 768 px, when the numbered pager is measured, then every control is at least 44 × 44 CSS px below 768 px, and at 1280 px at least 24 × 24. (L2-132)
- **AC-34** Given the pseudo-locale with labels 30 % longer, when the pager renders at 320 px and 1280 px, then "Previous page", "Next page" and "Show 6 more events" wrap or reflow and nothing is clipped. (L2-150)

### Motion

- **AC-35** Given a user with reduced motion, when the member loads more events or changes page, then the meter fill changes without animation and the busy spinner does not spin. (L2-129)

### Performance

- **AC-36** Given the catalogue on a mobile profile, when it loads with its first 24 results, then the pager is at its final size from first paint and adds no layout shift. (L2-120)

## Implementation notes

- Planned. Folder `frontend/projects/components/src/lib/pagination/`, one type per file:
  `pagination.ts` (`Pagination`), `load-more.ts` (`LoadMore`), `pagination-window.ts`
  (`PaginationWindow`, the numbers and ellipses the template loops over) and
  `pagination-item.ts` (`PaginationItem`, a page number or an ellipsis), each component with `.html` and
  `.scss`. Selectors `nav[llPagination]` and `div[llLoadMore]` (attribute components; both set
  `class="pager"` and `[hidden]` on the host).
- The window is a pure function of `page` and `pageCount` (see *Page window*), a `computed` signal.
  Page links use `@for ... track item.page`; the ellipsis is tracked by its position.
- Page links are `<a llButton variant="quiet" size="sm" [routerLink]="[]" [queryParams]="{ [queryParam()]: page === 1 ? null : page }" queryParamsHandling="merge">`.
  The current page uses `llButton` with the default variant. The disabled ends are `<a llButton role="link" aria-disabled="true">`
  without `routerLink`. Focus rescue (AC-24): when the focused end control becomes disabled, focus the
  current page link after render.
- `LoadMore` renders `<button llButton variant="quiet" size="lg" [busy]="busy()">` and sets
  `--ll-pager-progress` through a style binding on the meter. It ignores `click` while busy or complete.
- Composes [button](button.md) (`button[llButton]`, `a[llButton]`, busy and its spinner).
- Dev-mode errors: an empty `label`, `pageLabel` without `{page}`, or a `moreLabel` of `''`.
- The design-system page and the mocks catch up with the decisions below (D-2 to D-5, D-10, D-11);
  `components.css` needs `.pager[hidden]` and the two responsive rules, which the specimen in the HTML
  draws.

## Decisions

- **D-1** *One component or two?* Two, in one CRD and one folder: `Pagination` (`nav[llPagination]`,
  numbered pages, links) and `LoadMore` (`div[llLoadMore]`, a button). They differ in element,
  role, inputs, outputs and focus rules, and one class with a mode input could not make the right inputs
  required. They share the `.pager` markup, meter and count, as the design-system page's two variants.
- **D-2** *Page controls: the design-system page draws "Previous" and "Next" with chevrons and ghost icon
  buttons; the mocks draw quiet small buttons with the text "Previous page" and "Next page".* The mocks. They
  are the product, the names are clearer in words (`L2-127`), and a text link survives translation. The
  design-system page, which says it is used in one mock state, should show the mocks' markup and the 17
  mock states.
- **D-3** *Page links in the mocks are named "2"; the design-system page names them "Page 2".* "Page 2"
  through an `aria-label`: a bare number out of context tells a screen-reader user nothing, and the name
  contains the visible number (`L2-127`). The mocks' page links gain the `aria-label`.
- **D-4** *The mocks omit "Previous page" on page 1; the design-system page says to disable the end
  control rather than remove it.* Disabled and kept, as a link with `aria-disabled="true"` and no `href`
  (a link cannot be natively disabled, and a link without `href` is not in the tab order). The row then does not
  shift when the member pages. The mocks' first pages gain a disabled "Previous page". The last page gets a
  disabled "Next page" for the same reason (no mock shows it).
- **D-5** *The window.* The mocks show 1 2 3 … N on pages 1 and 2 of 9, 97 and 13, but 1 2 … 25 on the
  audit log; the design-system page says two pages either side of the current one at 1024 px and up and
  one either side at 768 px. One rule at every width: three consecutive pages containing the current one, plus
  the first and last, a single hidden page shown instead of an ellipsis (*Page window*). It reproduces
  every mock except the audit log's, which becomes 1 2 3 … 25; the viewport-dependent windows are dropped
  because the same URL should render the same numbers, and the narrow case is handled by D-6.
- **D-6** *The design-system page collapses to "Previous, Page 3 of 13, Next" at 360 px; the mocks never
  collapse.* Collapse below `40rem`: the numbers and ellipses hide and the row is Previous page and
  Next page under the count, which is already "Page N of M". At 360 px the widest row is about 460 px, so
  it would otherwise wrap; from `40rem` (`--layout-breakpoint-sm`) it fits. The mocks' narrow views gain the
  rule.
- **D-7** *Touch size.* The mocks use `btn--sm` (`--control-height-sm`), the design-system page says every control
  is 44 px. Small buttons stay at 1280 px (at least 24 px, `L2-132`), and below `48rem` (XS to MD, where
  `L2-132` asks 44 px for primary actions) every pager control is at least `--target-comfortable` tall and
  wide.
- **D-8** *How do numbered pages navigate, and is there an in-place pager?* Router links to the same route
  with the page in a query parameter (`queryParamsHandling: 'merge'`, page 1 drops the parameter),
  because `L2-002` wants state in the URL and every mock page links to a URL. There is no output and no
  in-place "previous and next" buttons (the design-system page's third variant): no mock uses one. If a
  screen needs it, this CRD changes first.
- **D-9** *Who owns focus?* Pagination keeps focus on the control pressed (design-system rule: never send
  focus to the top), with one rescue: when that control becomes disabled, focus moves to the current page
  link. Scrolling is the page's. For LoadMore, the component keeps focus on the busy button and the page moves
  focus to the first new item after appending, as the design-system page says; the page does it
  because only it knows the list. When the last batch removes the button, the same hand-off covers it.
- **D-10** *The mocks draw "Show 6 more events" as `a.btn` with an `href`; the design-system page uses a
  button.* A button. It does not navigate: it appends in place (the design-system page: "appends the next page below the last item"). The
  mocks' `href="long.html"` is only how a static mock shows the next state. The mock markup changes to
  `<button type="button">`.
- **D-11** *Meter and count semantics.* The meter is `aria-hidden="true"` in both forms (the mocks use
  `aria-hidden` in one and `role="presentation"` in the other; `role="presentation"` on a plain `div` does
  nothing). `--ll-pager-progress` is set on `.pager__meter` in both (the numbered mocks set it on the
  `span`; the CSS reads it from either). The count gets `aria-live="polite"` in both, as the design-system
  page does and the mocks do not (`L2-127`).
- **D-12** *Does the component write "Page 1 of 9"?* No. The page passes `summary` and every label
  translated and number-formatted, as every CRD here does (`label`, `closeLabel`); the component adds no
  English words. Only `pageLabel` carries a `{page}` placeholder, because the number is the component's
  and the text around it is the page's.
- **D-13** *One page or none.* Nothing renders (the host is `hidden`, no empty landmark and no
  "Page 1 of 1"). The page does not need its own `@if`, though a page may add one.
- **D-14** *A `page` outside 1 to `pageCount`.* Truncated and clamped, so a stale or typed URL never
  draws a missing or half-empty window. Redirecting to the clamped URL is the page's.
- **D-15** *"Show 12 more" in the saved mocks has no noun.* The design-system page says to name the
  thing: "Show 12 more saved items". The text is the page's, so the API is unchanged; the saved mocks
  change.
- **D-16** *Do the notification centre's "Load more" and the comments' "Show more comments" belong here?*
  No. The notification centre's is a small quiet button in a dialog with no meter or count, and the
  comments' follows its own list; both are [buttons](button.md). `LoadMore` is the end-of-list control
  of a full page.
- **D-17** *The meter's fill.* `round(page / pageCount × 100)%` for numbered pages (page 1 of 9 is 11 %,
  2 of 97 is 2 %, 1 of 25 is 4 %), `round(shown / total × 100)%` for load more (3 of 9 is 33 %, 12 of
  1,000 is 1 %), as the mocks do. The CSS keeps a floor of `--space-2` so it never vanishes.
- **D-18** *Does `LoadMore` hide on a short list?* Not by itself: complete (`shown` ≥ `total` ≥ 1) is
  drawn, because the last batch must show it. A page that never needs paging simply does not render it.
- **D-19** *Hover on the current page.* No change; it is already the strongest fill, and the current page is
  not a link to somewhere else.
