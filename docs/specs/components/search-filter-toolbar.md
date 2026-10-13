# Search and filter toolbar

| Field | Value |
|---|---|
| Selector | `div[llToolbar]`, `form[llToolbar]`, `p[llToolbarCount]`, `div[llToolbarTools]`, `ll-filters-button`, `ul[llActiveFilters]`, `li[llActiveFilter]`, `ll-filter-panel`, `fieldset[llFilterGroup]`, `li[llFilterOption]` |
| Library path | `frontend/projects/components/src/lib/search-filter-toolbar/` |
| Status | planned |
| Traces to | L2-002, L2-022, L2-051, L2-071, L2-086, L2-095, L2-099, L2-120, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-141, L2-148, L2-150 |
| Design system | [`search-filter-toolbar.html`](../../design-system/components/search-filter-toolbar.html) |
| Source mocks | [`pages/explore/default`](../../mocks/pages/explore/default.html), [`pages/explore/selected`](../../mocks/pages/explore/selected.html), [`pages/explore/long`](../../mocks/pages/explore/long.html), [`pages/explore/no-results`](../../mocks/pages/explore/no-results.html), [`pages/explore/loading`](../../mocks/pages/explore/loading.html), [`pages/explore/error`](../../mocks/pages/explore/error.html), [`pages/explore/partial`](../../mocks/pages/explore/partial.html), [`dialogs/explore-filters/default`](../../mocks/dialogs/explore-filters/default.html), [`dialogs/explore-filters/selected`](../../mocks/dialogs/explore-filters/selected.html), [`dialogs/explore-filters/busy`](../../mocks/dialogs/explore-filters/busy.html), [`pages/events/default`](../../mocks/pages/events/default.html), [`pages/events/no-results`](../../mocks/pages/events/no-results.html), [`pages/experts/default`](../../mocks/pages/experts/default.html), [`pages/saved/default`](../../mocks/pages/saved/default.html), [`pages/moderation-queue/default`](../../mocks/pages/moderation-queue/default.html), [`pages/admin-users/default`](../../mocks/pages/admin-users/default.html), [`pages/admin-audit/default`](../../mocks/pages/admin-audit/default.html), [`pages/my-learning/default`](../../mocks/pages/my-learning/default.html), [`pages/studio-analytics/default`](../../mocks/pages/studio-analytics/default.html) |
| Rendering | [`search-filter-toolbar.html`](search-filter-toolbar.html) |

## Purpose and scope

The toolbar sits between a page's heading (or search) and its results. It says how many results there
are, holds the controls that change them (a sort, a few selects, a search, a pair of tabs) and, when
filters are on, lists each one as a removable pill so nothing narrows the results silently. The same
family supplies the **filters panel** of the catalogue: groups of checkbox options with counts, shown
beside the results from LG and inside a modal sheet below it. The family is nine small parts, each a
native element with a directive-sized API, so a page composes the toolbar it needs: the Explore
catalogue uses all of them; the Experts, Events, Saved, Moderation and Admin lists use the bar, the
count line and the tools.

Use the [tabs](tabs.md) for views of one page, the [chip](chip.md) for a toggle filter or a topic tag,
the [empty state](empty-state.md) for "nothing matches", and a table's own pagination for paging. A
toolbar only states and changes the result set; it never shows results.

Out of scope:

- The copy of the count line ("Showing 1–24 of 212 items, newest first"), its numbers, its noun and its
  ICU plurals: the page writes them (L2-147 AC3).
- Which filters exist, their values and counts, the URL query (`/explore?type=course`), parsing it and
  ignoring unknown values, calling the API and paging: the page and its filter state own all of it.
- The sort control, the search form, the tabs and the other selects the toolbar holds: the sort and the other selects are
  `ll-select` of the [select](select.md) (D-16), the search is `form[llSearch]` of the
  [text field](text-field.md), the tabs are `nav[llTabs]` of [tabs](tabs.md), the chips are
  [chips](chip.md).
- The empty state, its "Clear filters" action and the error state under the toolbar.
- The filters dialog itself (`ExploreFiltersDialog`): its title, close button, footer, draft state,
  debounced count and the CDK `Dialog` call are application code. This CRD fixes what it holds and how
  it behaves (AC-28 to AC-33), because it is the below-LG presentation of the panel.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/explore/{default,partial}` | `div[llToolbar]`; count + tools; panel inline at LG | Count "Showing 1–24 of 212 items, newest first"; `ll-filters-button` "Filters"; "Sort by" select (Newest, Most popular) | default | canvas |
| `pages/explore/selected` | `llToolbar` `stacked`; row of count + tools, then `ul[llActiveFilters]` with `clearLabel` | "Showing 1–24 of 24 courses, newest first"; "Filters · 1"; pill "Type: Course"; "Clear all"; panel head shows "Clear all" | one filter on | canvas |
| `pages/explore/long` | stacked; seven pills | "Showing 1–4 of 4 items that match all 7 filters, newest first"; "Filters · 7"; Type: Course, Type: Module, Topic: The image of God and personhood, Topic: Scripture and interpretation, Level: Intermediate, Contributor: Rev. Dr. Thomas Hale, Length: Over 60 min; Topic group fully shown | seven filters, long pill wrap | canvas |
| `pages/explore/no-results` | stacked; three pills + "Clear all" | count `<strong>No items</strong> match Video, Creativity and the arts, and Over 60 min`; "Filters · 3"; Topic group fully shown because "Creativity and the arts" is the 12th | no matches | canvas |
| `pages/explore/loading` | count + tools, sort `disabled` | "Loading the catalogue…" | loading | canvas |
| `pages/explore/error` | count + tools, sort `disabled` | "Results unavailable" | error | canvas |
| `pages/explore/empty` | count + tools | "No items published yet" | empty catalogue | canvas |
| `pages/explore/*` panel | `ll-filter-panel` inline in `aside`, six groups | Type (6 options, counts 24, 11, 86, 64, 18, 9), Topic (12, counts, first 6 shown, "Show all 12 topics"), Level (3), Contributor (6 of 38, "Show all 38 experts"), Length (3: "Under 15 min", "15 to 60 min", "Over 60 min") | default, checked, "Clear all" shown | beside results |
| `dialogs/explore-filters/{default,selected,busy}` | `ll-filter-panel` `presentation="dialog"` in the dialog body | summary "Choose as many as you like. The count updates as you go." / "1 filter on. The count updates as you go."; "Clear all"; groups; footer (dialog code): "Cancel", "Show 212 items" / "Show 24 courses" / busy "Counting courses…" | default, selected, busy | dialog |
| `pages/events/{default,empty,error,live,loading,long,past}` | stacked; `form` named "Filter events" + count | selects Format, Topic, Host (and the check "Recording available" in `past`); "9 upcoming events, soonest first", "No upcoming events", "Loading events…" | default, empty, loading | canvas |
| `pages/events/no-results` | stacked; form + `ul[llActiveFilters]` without `clearLabel` + count | pills "Format: In person", "Topic: Pastoral care"; "No upcoming events match In person and Pastoral care" | no matches | canvas |
| `pages/experts/*` | `div[llToolbar]`; `form[llSearch]` + tools; count line outside the bar | search "Search experts by name"; "Topic" select; "Showing 1–24 of 38 experts" | default, invalid (field error), selected, no-results | canvas |
| `pages/saved/*` | stacked; chip group + count | chips "All 14" … "Events 2"; "14 saved items, newest saved first", "Loading your saved items…", "No saved items match the Modules filter" | default, loading (chips disabled), error (blank count) | canvas |
| `pages/moderation-queue/*`, `pages/appeals/*` | count + tools | "Showing 7 open reports"; selects Reason, Type, Status; "Showing 1 held comment"; "Loading open reports…"; appeals "Show" select | default, loading | canvas |
| `pages/admin-users/*` | bar; `form[llSearch]` + tools | "Search users by name or email"; selects Role, State | default, invalid, no-results | canvas |
| `pages/admin-audit/*` | `form[llToolbar]` stacked, `role="search"` named "Filter the audit log" | selects Actor, Action; fields Target, From, To; "Apply filters" (submit) and "Clear filters" | default, no-results | canvas |
| `pages/my-learning/*`, `pages/my-events/*`, `pages/following/*` | bar; `nav[llTabs]` pill (+ tools) | "In progress 3", "Completed 2", "Sort by"; "Upcoming 2", "Past"; "Experts 4", "Collections 2" | default | canvas |
| `pages/admin-analytics/*`, `pages/analytics-item/*`, `pages/studio-analytics/*` | bar or stacked; selects, switch, segmented view, status line | "Date range" / "Period" select, "Custom range" link button, "Updated at 9:00 am ET" | default, loading | canvas |

Every row is buildable with the API below. The bar is a layout container (D-2); a page places its own
rows in it, and `stacked` only changes how those rows are laid out.

## Anatomy

1. **Toolbar** — `.toolbar`. A wrapping flex row, space between, `--space-4` gap, with a hairline under
   it. With `.toolbar--stacked` it is a grid whose children are rows.
2. **Count line** — `p.toolbar__count`. `--text-body-sm` muted text; the numbers (`strong`) in the
   default colour. A polite live region that always reserves one line.
3. **Tools** — `div.toolbar__tools`. A wrapping flex group (`--space-3` gap) at the end of the bar: the
   Filters button, selects, small buttons.
4. **Filters button** — `button.btn.btn--quiet.btn--sm.filters-btn` with a sliders `svg.icon.icon--sm`
   and the label ("Filters", "Filters · 3"). It is shown below LG only.
5. **Active filters** — `ul.active-filters`: a wrapping flex list, `--space-2` gap, named "Active
   filters".
6. **Active filter** — `li > span.pill.pill--accent` holding the text ("Type: Course") and
   `button.icon-btn.icon-btn--sm` with a close glyph, named "Remove filter Type: Course".
7. **Clear all** — the last `li` of the active filters: `button.btn.btn--text.btn--sm`.
8. **Filters panel** — `aside.filters` inline (with `.filters__head`, `h2.filters__title`, and Clear
   all) or, in the dialog presentation, a summary row (`div.cluster.cluster--between` with
   `p.field__help` and Clear all).
9. **Filter group** — `fieldset.filter` with `legend.filter__legend` (overline), `ul.filter__list` of
   options and an optional `button.filter__more` ("Show all 12 topics").
10. **Filter option** — `li > label.check` with `input.check__box`, a `span` label and an optional
    `span.check__count`; the [checkbox](checkbox.md) row.

Hosts: `div[llToolbar]` or `form[llToolbar]` is the `.toolbar` element itself and projects the page's rows.
`p[llToolbarCount]`, `div[llToolbarTools]`, `ul[llActiveFilters]`, `fieldset[llFilterGroup]` and
`li[llFilterOption]` are the native element with the BEM class added. `li[llActiveFilter]` renders the
pill inside the `li`. `ll-filters-button` and `ll-filter-panel` are custom elements with
`display: contents`; they render the button and the `aside` (or summary row).

## API

### Inputs

`SearchFilterToolbar` (`div[llToolbar]`, `form[llToolbar]`):

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `stacked` | `boolean` | `false` | no | Adds `.toolbar--stacked`: the page's rows are stacked and stretched. The page sets it while filters are on (mocks `explore/selected`, `events/no-results`) or when the bar has more than one row. |

`ToolbarCount` (`p[llToolbarCount]`): no inputs. The host gets `.toolbar__count`, `aria-live="polite"` and
`tabindex="-1"` (so `focus()` works). It may sit outside a toolbar (the Experts count line).

`ToolbarTools` (`div[llToolbarTools]`): no inputs. The host gets `.toolbar__tools`.

`FiltersButton` (`ll-filters-button`):

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `activeCount` | `number` | `0` | no | A positive number renders " · " and the count after the label, formatted with `LOCALE_ID` ("Filters · 3"); `0` renders the label only. The page passes the number of selected options. |

`ActiveFilters` (`ul[llActiveFilters]`):

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string` | — | yes | `aria-label` of the list: "Active filters". |
| `clearLabel` | `string \| null` | `null` | no | A string renders a last `li` with a text button of that label ("Clear all"). `null` renders none (the empty state already offers "Clear filters", as in `events/no-results`). |

`ActiveFilter` (`li[llActiveFilter]`):

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string` | — | yes | The pill text: "Facet: value" ("Type: Course") or a short phrase for a range. |
| `removeLabel` | `string` | — | yes | A complete phrase naming what is removed, the accessible name of the remove button: "Remove filter Type: Course". |

`FilterPanel` (`ll-filter-panel`):

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `presentation` | `'inline' \| 'dialog'` | `'inline'` | no | `inline` renders the landmark `aside.filters` with a heading; `dialog` renders no heading (the dialog's title names it) and a summary row. |
| `heading` | `string \| null` | `null` | inline: yes | The `h2.filters__title`: "Filters". Ignored in the `dialog` presentation. In development the component throws when an inline panel has none. |
| `canClear` | `boolean` | `false` | no | `true` renders the Clear all button: in the head (inline) or beside the summary (dialog). The page sets it while any filter is on. |
| `clearLabel` | `string` | — | yes | The Clear all label: "Clear all". |
| `summary` | `string \| null` | `null` | no | `dialog` only: the `p.field__help` text ("1 filter on. The count updates as you go."). |
| `summaryId` | `string \| null` | `null` | no | `dialog` only: the `id` of the summary, so the dialog can use it as its description. |

`FilterGroup` (`fieldset[llFilterGroup]`):

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string` | — | yes | The `legend.filter__legend`: "Type", "Topic". |
| `name` | `string \| null` | `null` | no | The native `name` of each option's `input` ("type", "topic"). |
| `limit` | `number \| null` | `null` | no | With a number and more options than that, only the first `limit` options (and any checked one) show until the group is expanded. `null` shows all. |
| `moreLabel` | `string \| null` | `null` | no | The expander's label ("Show all 12 topics"). Required whenever `limit` hides options; the button renders only while options are hidden. |
| `expanded` | `boolean` (model) | `false` | no | Two-way. `true` shows every option and removes the expander. It becomes `true` by itself when a checked option lies beyond `limit` (D-9). |

`FilterOption` (`li[llFilterOption]`):

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string` | — | yes | The option text: "Course", "Theology of technology". |
| `count` | `number \| null` | `null` | no | A number, including `0`, renders `span.check__count` formatted with `LOCALE_ID` ("1,086" in en-CA). `null` renders none (Level, Contributor and Length). |
| `checked` | `boolean` | `false` | no | The native checkbox's `checked`. The page owns it (D-12). |
| `disabled` | `boolean` | `false` | no | The native `disabled`; the count stays visible. No mock uses it. |

- Inputs are signal inputs; booleans accept bare attributes (`booleanAttribute`).
- The consumer's own classes, `id`, `aria-*` and `data-*` attributes stay on the host element.
- Translation: every string arrives as an input or slot (L2-147). Translatable inputs: `label`,
  `clearLabel`, `heading`, `summary`, `moreLabel`, `removeLabel`, option `label` for fixed sets (type,
  level, length). Data values: topic and contributor names, `count`, `activeCount`.

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| `removed` (`ActiveFilter`) | `void` | The user activates the pill's remove button (pointer, <kbd>Enter</kbd>, <kbd>Space</kbd>). |
| `cleared` (`ActiveFilters`) | `void` | The user activates the "Clear all" button of the list. |
| `cleared` (`FilterPanel`) | `void` | The user activates the panel's Clear all button. |
| `changed` (`FilterOption`) | `boolean` | The user toggles the box; the payload is the new state. |
| `expandedChange` (`FilterGroup`) | `boolean` | The expander is activated. |

`ToolbarCount`, `ToolbarTools`, `FiltersButton`, `SearchFilterToolbar` and `ActiveFilters` (apart from
`cleared`) have no outputs. The Filters button is a native button inside `ll-filters-button`, so the
page listens to `(click)` on the host, which receives the bubbled click from pointer and keyboard.

### Methods

| Method | Rule |
|---|---|
| `ActiveFilters.focusAfterRemoval(index: number)` | Focuses the remove button of the pill now at `index`, else of the last pill, else the toolbar's count line. The page calls it once its state has dropped the pill (D-15). |
| `SearchFilterToolbar.focusCount()` | Focuses the `p[llToolbarCount]` inside the toolbar. |
| `ToolbarCount.focus()` | Focuses the line (it has `tabindex="-1"`). |

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default (`llToolbar`) | the page's rows in order: `p[llToolbarCount]`, `div[llToolbarTools]`, `ul[llActiveFilters]`, `form[llSearch]`, `nav[llTabs]`, `ul[llChips]`, `form.cluster`, `div.cluster` | A row is any element; the order is the visual order. |
| default (`llToolbarCount`) | text with optional `strong` for the numbers | Rich text from one ICU message; `strong` is styled by the component. |
| default (`llToolbarTools`) | `ll-filters-button`, `label.select`, `button[llButton]` | Wraps and never overflows the bar. |
| default (`ll-filters-button`) | the label text | Translated; the icon and count are the component's. |
| default (`llActiveFilters`) | `li[llActiveFilter]` | One per selected option, in group order. |
| default (`ll-filter-panel`) | `fieldset[llFilterGroup]` | In display order. |
| default (`llFilterGroup`) | `li[llFilterOption]`, then optional extra controls (a chip row, a range) | The options are placed in `ul.filter__list`; anything else follows the list (D-10). |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Bar | `.toolbar` | One row: count at the start, tools at the end (Explore default, Moderation, Experts, Analytics). |
| Stacked | `.toolbar--stacked` | Several rows: count and tools, then the active filters (Explore selected); chips then count (Saved); a filter form then count (Events). |
| Inline panel | `aside.filters` | Beside the results from LG. |
| Dialog panel | `presentation="dialog"` | Inside the modal sheet below LG. |
| Pill | `.pill.pill--accent` | One applied filter. |

One size for every part: the pill is `--size-pill` tall, the tools use the small button and the default
select so the bar stays one line high on wide screens, and the option rows are at least
`--target-comfortable` tall (the checkbox row).

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Count: ready | page text | "Showing **1–24** of **212** items, newest first" | polite live region |
| Count: loading | page text "Loading the catalogue…" | same line, sort `disabled` | announced once |
| Count: error | page text "Results unavailable" | same line, sort `disabled`, filters kept | announced |
| Count: empty | "No items published yet" / "No items match …" | same line; the bar never disappears | announced |
| Count: blank | `&nbsp;` while an error hides it | the line keeps its height | none |
| Filters button | default, hover, focus, active | quiet small button; the count suffix shows when `activeCount > 0` | "Filters · 3, button, opens dialog" |
| Pill | default | `--color-accent-subtle` fill, `--color-fg-accent` text | text + remove button |
| Remove hover | `:hover` on the remove button | round `--color-bg-subtle-hover` wash | — |
| Remove focus | `:focus-visible` | shared ring around the round button | "Remove filter Type: Course, button" |
| Clear all | default, hover, focus | text button | "Clear all, button" |
| Option unchecked / checked | `checked` | the checkbox box states | "checked" |
| Option hover | `:hover` on the row | row washed `--color-bg-subtle` | — |
| Option focus | `:focus-visible` on the box | ring on the box | name + state |
| Option disabled | `disabled` | disabled roles, count kept | dimmed |
| Group collapsed | `limit` hides options, `expanded` false | first `limit` options (and checked ones) + expander | button `aria-expanded="false"` |
| Group expanded | `expanded` true | every option; no expander | none |
| Panel: no filters | `canClear` false | head shows the heading only | — |
| Panel: filters on | `canClear` true | Clear all beside the heading | — |
| Panel: below LG | viewport < 64rem, inline presentation | `display: none` (the sheet replaces it) | removed from the accessibility tree |
| Dialog primary: ready | dialog code | "Show 24 courses" | name states the outcome |
| Dialog primary: busy | the draft's count is loading | spinner + "Counting courses…", `aria-busy="true"`, `aria-disabled="true"` | name kept; focus kept |

## Markup

```html
<!-- rendered: bar (explore/default) -->
<div class="toolbar">
  <p class="toolbar__count" aria-live="polite" tabindex="-1">Showing <strong>1–24</strong> of <strong>212</strong> items, newest first</p>
  <div class="toolbar__tools">
    <button class="btn btn--quiet btn--sm filters-btn" type="button" aria-haspopup="dialog"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true">…</svg>Filters</button>
    <label class="select"><span>Sort by</span><span class="select__wrap"><select class="select__control" name="sort"><option selected>Newest</option><option>Most popular</option></select><svg class="icon icon--sm select__chev" viewBox="0 0 24 24" aria-hidden="true">…</svg></span></label>
  </div>
</div>

<!-- rendered: stacked with active filters (explore/selected) -->
<div class="toolbar toolbar--stacked">
  <div class="cluster cluster--between">
    <p class="toolbar__count" aria-live="polite" tabindex="-1">Showing <strong>1–24</strong> of <strong>24</strong> courses, newest first</p>
    <div class="toolbar__tools">…the Filters button "Filters · 1" and the sort…</div>
  </div>
  <ul class="active-filters" aria-label="Active filters">
    <li><span class="pill pill--accent">Type: Course <button class="icon-btn icon-btn--sm" type="button" aria-label="Remove filter Type: Course"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></span></li>
    <li><button class="btn btn--text btn--sm" type="button">Clear all</button></li>
  </ul>
</div>

<!-- rendered: filter form host (admin-audit) -->
<form class="toolbar toolbar--stacked" role="search" aria-label="Filter the audit log">
  <div class="toolbar__tools">…selects and fields…</div>
  <div class="toolbar__tools"><button class="btn btn--quiet btn--sm" type="submit">Apply filters</button><a class="btn btn--text btn--sm" href="…">Clear filters</a></div>
</form>
```

```html
<!-- rendered: inline panel (explore/default, from LG) -->
<aside class="filters" aria-labelledby="filters-title">
  <div class="filters__head">
    <h2 class="filters__title" id="filters-title">Filters</h2>
    <button class="btn btn--text btn--sm" type="button">Clear all</button> <!-- only while a filter is on -->
  </div>
  <fieldset class="filter">
    <legend class="filter__legend">Type</legend>
    <ul class="filter__list">
      <li><label class="check"><input class="check__box" type="checkbox" name="type"><span>Course</span><span class="check__count">24</span></label></li>
      <li><label class="check"><input class="check__box" type="checkbox" name="type" checked><span>Module</span><span class="check__count">11</span></label></li>
    </ul>
  </fieldset>
  <fieldset class="filter">
    <legend class="filter__legend">Topic</legend>
    <ul class="filter__list"><li hidden>…the 7th to 12th options…</li></ul>
    <button type="button" class="btn btn--text btn--sm filter__more" aria-expanded="false">Show all 12 topics</button>
  </fieldset>
</aside>

<!-- rendered: dialog panel (dialogs/explore-filters/selected), inside .dialog__body -->
<div class="cluster cluster--between">
  <p id="dialog-desc" class="field__help">1 filter on. The count updates as you go.</p>
  <button class="btn btn--text btn--sm" type="button">Clear all</button>
</div>
<fieldset class="filter">…</fieldset>
```

```html
<!-- consumer: the Explore page -->
<div class="sidebar-layout">
  <ll-filter-panel [heading]="'Filters'" i18n-heading clearLabel="Clear all" i18n-clearLabel [canClear]="active().length > 0" (cleared)="clearAll()">
    <fieldset llFilterGroup label="Type" i18n-label name="type">
      @for (t of types(); track t.value) {
        <li llFilterOption [label]="t.label" [count]="t.count" [checked]="state.has('type', t.value)" (changed)="state.set('type', t.value, $event)"></li>
      }
    </fieldset>
    <fieldset llFilterGroup label="Topic" i18n-label name="topic" [limit]="6" [moreLabel]="moreTopics()">
      @for (t of topics(); track t.value) {
        <li llFilterOption [label]="t.label" [count]="t.count" [checked]="state.has('topic', t.value)" (changed)="state.set('topic', t.value, $event)"></li>
      }
    </fieldset>
  </ll-filter-panel>
  <div>
    <div llToolbar [stacked]="active().length > 0">
      <div class="cluster cluster--between">
        <p llToolbarCount i18n>Showing <strong>{{ first() }}–{{ last() }}</strong> of <strong>{{ total() }}</strong> items, newest first</p>
        <div llToolbarTools>
          <ll-filters-button [activeCount]="active().length" (click)="openFilters()" i18n>Filters</ll-filters-button>
          <label class="select">…sort…</label>
        </div>
      </div>
      @if (active().length) {
        <ul llActiveFilters label="Active filters" i18n-label clearLabel="Clear all" i18n-clearLabel (cleared)="clearAll()">
          @for (f of active(); track f.key) {
            <li llActiveFilter [label]="f.label" [removeLabel]="f.removeLabel" (removed)="remove(f)"></li>
          }
        </ul>
      }
    </div>
    …results…
  </div>
</div>
```

The dialog (application code) holds the same panel:

```html
<!-- consumer: ExploreFiltersDialog body -->
<ll-filter-panel presentation="dialog" clearLabel="Clear all" i18n-clearLabel [canClear]="draft.count() > 0" [summary]="summary()" summaryId="dialog-desc" (cleared)="draft.clear()">
  <fieldset llFilterGroup label="Type" i18n-label name="type">…the same options bound to the draft…</fieldset>
</ll-filter-panel>
```

## Design

- Toolbar: `display: flex`, wrap, items centred, space between, gap `--space-4`; padding-bottom
  `--space-6`, margin-bottom `--space-8`; a `--border-width-hairline` solid `--color-border-default`
  rule under it. Stacked: `display: grid`, gap `--space-4`, children stretch.
- Count line: `--text-body-sm`, `--color-fg-muted`; `strong` in `--color-fg-default` at
  `--font-weight-semibold`; `min-block-size: 1lh` so an empty or blank line keeps its height.
- Tools: flex, wrap, centred, gap `--space-3`; each child `max-width: 100%`.
- Filters button: the quiet small button; hidden with `display: none` from the LG breakpoint (64rem).
  Below LG its `min-height` is `--target-comfortable` (D-14).
- Active filters: flex, wrap, centred, gap `--space-2`, no list marker or padding. Pill: `.pill`
  (`inline-flex`, gap `--space-2`, `min-height: var(--size-pill)`, padding `0 --space-3`,
  `--radius-full`, `--text-caption`, wraps with `overflow-wrap: anywhere`, `max-width: 100%`)
  with the `.pill--accent` colours. Its remove button is the small icon button reduced to
  `min-height: var(--target-min)`, `width: auto`, padding `0 --space-1`.
- Inline panel: `margin: 0`, no border, `--color-fg-default`. Head: flex, centred, space between, gap
  `--space-4`, margin-bottom `--space-4`; title `--text-h4`. From LG: `position: sticky`,
  `top: var(--space-6)`, in the `sidebar-layout` column of `--layout-sidebar-width`, with
  `max-height: calc(100dvh - var(--space-12))` and `overflow-y: auto` so a long panel scrolls inside
  itself; the scroll box keeps `--space-1` inline padding so focus rings are not clipped (D-7). Below
  LG: `display: none`.
- Group: `fieldset.filter`, `min-width: 0`, no margin or border except a `--border-width-hairline`
  rule above (`--color-border-default`), padding-block `--space-6`. Legend: `float: left; width: 100%`,
  `--text-overline`, `--letter-spacing-wide`, uppercase, `--color-fg-subtle`, margin-bottom
  `--space-4`. List: grid, gap `--space-1`; an empty list is `display: none`. Expander: margin-top
  `--space-2`.
- Option: the checkbox row (grid `auto 1fr auto`, gap `--space-3`, min-height
  `--target-comfortable`); count `--color-fg-subtle`, tabular numerals.
- Dialog panel: the summary row is `.cluster.cluster--between`; `p.field__help` is the help style.
- Motion: option row background over `--duration-base` with `--ease-standard`, only when
  `prefers-reduced-motion: no-preference`. Expanding a group is instant. The dialog's own settle
  animation belongs to the dialog.
- Forced colours: the pill keeps a `CanvasText` hairline border; the checkbox restores the native box.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Toolbar rule | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Count line | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Count numbers | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Pill fill | `--color-accent-subtle` | `--palette-accent-50` | `--palette-accent-950` |
| Pill text | `--color-fg-accent` | `--palette-accent-700` | `--palette-accent-300` |
| Remove hover wash | `--color-bg-subtle-hover` | `--palette-oat-300` | `--palette-night-700` |
| Legend, option count | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Option hover | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |
| Checked box | `--color-accent` / `--color-fg-on-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Box border | `--color-border-strong` | `--palette-stone-500` | `--palette-night-500` |
| Dialog panel surface | `--color-bg-surface-raised` | `--palette-white` | `--palette-night-850` |
| Focus ring | `--color-focus-ring` | `--palette-accent-700` | `--palette-accent-300` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Count line |
| `--color-fg-subtle` | `--color-bg-canvas` | 4.5:1 | Legend and counts in the inline panel |
| `--color-fg-subtle` | `--color-bg-surface-raised` | 4.5:1 | Legend and counts in the dialog |
| `--color-fg-accent` | `--color-accent-subtle` | 4.5:1 | Pill text |
| `--color-border-strong` | `--color-bg-canvas` | 3:1 | Option box border |
| `--color-focus-ring` | `--color-bg-canvas` | 3:1 | Focus indicator |

The toolbar draws no other colour. Both themes use the same tokens; nothing is light-only.

## Responsive behaviour

- Below SM the count takes its own line and the tools wrap beneath it; the active-filter pills wrap
  onto as many lines as they need and a long pill wraps its text inside the pill.
- From MD the count and tools share a line.
- Below LG (64rem) the inline panel is not displayed; the Filters button shows and opens the dialog.
  From LG the Filters button is hidden and the panel is the sticky first column of `.sidebar-layout`;
  changes apply as they are made.
- If the viewport grows to LG while the dialog is open, the page closes the dialog and keeps its
  draft as the applied state (D-6).
- The sidebar layout is a global foundation (`.sidebar-layout`, `--layout-sidebar-width`, gap
  `--space-16` from LG); the panel does not own it.
- The Filters button is at least 44 px tall below LG; the remove button is at least 24 × 24 CSS px;
  option rows are at least 44 px tall. At 320 px nothing scrolls horizontally or clips; at 200 % zoom
  and 400 % zoom everything reflows into one column.
- Selects and the search form in the tools wrap beneath the count rather than overflow (L2-150).

## Accessibility

### Role and pattern

The count line is a paragraph and a polite live region. The inline panel is a `complementary` landmark
(`aside`) labelled by its heading; in the dialog the panel sits in the `dialog` role and has no
landmark of its own. Each group is a native `fieldset` with a `legend`; each option is a native
checkbox in a `label`. The active filters are a labelled list; each remove control and Clear all are
native buttons. The Filters button is a native button with `aria-haspopup="dialog"`. The expander is a
native button with `aria-expanded` (APG disclosure).

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Moves through the Filters button, the sort and other selects, each pill's remove button, Clear all, then (in visual order) the panel's Clear all, each option and each expander. Hidden options are skipped. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Opens the dialog from the Filters button, removes a filter, clears all, activates an expander. |
| <kbd>Space</kbd> | Toggles the focused option. |
| <kbd>Arrow keys</kbd> | Change the sort option (native select). |
| <kbd>Esc</kbd> | Closes the dialog, discarding the draft (dialog code). |

### Focus

The shared `--color-focus-ring` outline, `--focus-ring-width` thick with offset `--focus-ring-offset`,
shows on `:focus-visible` on every control and is not obscured by the toolbar. After a pill is removed
the page calls `ActiveFilters.focusAfterRemoval(index)`: focus goes to the next pill, else the last
pill, else the count line. Activating an expander moves focus to the first revealed option, because the
expander leaves the page. Opening the dialog moves focus into it; closing it returns focus to the
Filters button (L2-126 AC3).

### Labelling

- The pill text is plain text; its button is named by `removeLabel` ("Remove filter Type: Course"), a
  complete phrase the page writes; the close glyph is `aria-hidden`.
- An option's name is its text and, when present, its count ("Course 24"). The count is not a hidden
  word.
- The Filters button's name is its visible text ("Filters · 3"), so the name contains the label
  (WCAG 2.5.3).
- The list is named "Active filters"; the panel by its heading "Filters"; each group by its legend.

### Announcements

The count line is `aria-live="polite"`: a new count ("Showing 1–24 of 24 courses, newest first") is
announced after each change without moving focus (L2-127 AC3). Loading and error text in the same line
are announced the same way. In the dialog the page keeps a visually hidden `role="status"` line that
announces the new count when the draft's count arrives (D-19). The expander and options announce
through their native state.

### Motion

Under `prefers-reduced-motion: reduce` the option row's colour transition is removed; nothing in the
family moves otherwise.

## Content and internationalisation

- The count names the noun: "Showing 1–24 of 212 items, newest first", "9 upcoming events, soonest
  first", "Showing 7 open reports". Never "Results: 14". With one type selected the noun is that type
  ("of 24 courses"); with two or more selected options the line adds "that match all 7 filters". With
  no matches it names them: "No items match Video, Creativity and the arts, and Over 60 min". The
  page writes each line as one ICU message (L2-147 AC3).
- Pills read "Facet: value" ("Topic: Creativity and the arts") or a short phrase for a range ("Length:
  Over 60 min"), in group order. `removeLabel` is "Remove filter " plus the pill text, written as one
  translated message.
- The panel's outcome button (dialog) states the result: "Show 24 courses", never "Apply".
- Counts, option counts and `activeCount` are formatted with the active locale (L2-148 AC2): "1,086"
  in en-CA, a grouped number in fr-CA, with no code change. A range ("1–24") uses the page's formatter.
- Option and group names: type, level and length labels are translated by the page; topic and expert
  names are data and keep their titles ("Dr. Abena Mensah", "Rev. Dr. Thomas Hale").
- A label 30 % longer wraps: pill text wraps inside the pill, option text wraps beside the box, and
  tools wrap beneath the count (L2-150).

## Performance

- Change detection: `OnPush`; inputs are signals. An option's formatted count, the `Filters · N` text
  and the group's visible options are `computed`. Toggling one option re-renders that option, the
  pill list and the count line, not the other groups.
- Option lists use `@for` with `track` on the value; a collapsed group keeps its hidden options in
  the DOM (a few dozen inputs).
- No perf-test project exists in this repository (see D-17); the family is measured through the page
  budgets of `L2-120` and `L2-123`. The measured scenario is the Explore page of `pages/explore/long`
  for a visitor: six groups with 12 topics and 38 experts, seven selected options, seven pills, and
  toggling "Level: Intermediate".
- Layout stability: the count line reserves one line (`min-block-size: 1lh`), the pill row appears
  in the stacked bar only when a filter is on and the page reserves nothing more (the bar grows once
  with the results), and the panel's column width is fixed by `--layout-sidebar-width`, so loading or
  expanding a group moves nothing beside it (L2-120 AC1).
- Weight: depends on `@angular/core`, the checkbox, button, icon and `LOCALE_ID`; nothing from the
  page, the API or CDK (the dialog is application code).

## Acceptance criteria

### Toolbar rendering

- **AC-1** Given the Explore page with 212 published items at 1440 px, when it renders, then a `.toolbar` holds `p.toolbar__count` reading "Showing 1–24 of 212 items, newest first" with "1–24" and "212" in `strong`, and `.toolbar__tools` holding a "Sort by" select with "Newest" selected and no visible Filters button. (L2-002)
- **AC-2** Given a visitor who checks "Course" on Explore, when the page updates, then the toolbar is stacked: the count "Showing 1–24 of 24 courses, newest first" and the tools on one row, and below them a list named "Active filters" with the pill "Type: Course" and the button "Clear all". (L2-002)
- **AC-3** Given Explore with the seven selected options of `pages/explore/long`, when it renders at 768 px, then seven pills appear in group order ("Type: Course", "Type: Module", "Topic: The image of God and personhood", "Topic: Scripture and interpretation", "Level: Intermediate", "Contributor: Rev. Dr. Thomas Hale", "Length: Over 60 min"), the count reads "Showing 1–4 of 4 items that match all 7 filters, newest first" and the Filters button reads "Filters · 7". (L2-002)
- **AC-4** Given Explore filtered to Video, Creativity and the arts and Over 60 min, when nothing matches, then the toolbar stays, its count reads "No items match Video, Creativity and the arts, and Over 60 min" with "No items" in `strong`, and it lists three pills and "Clear all". (L2-002)
- **AC-5** Given the events page with nine upcoming events, when it renders, then a stacked toolbar holds a form named "Filter events" with the selects "Format", "Topic" and "Host", and the count "9 upcoming events, soonest first" as its last row. (L2-051)
- **AC-6** Given the events page filtered to "In person" and "Pastoral care" with no match, when it renders, then the toolbar lists the pills "Format: In person" and "Topic: Pastoral care", has no "Clear all" in the list, and its count reads "No upcoming events match In person and Pastoral care". (L2-051)
- **AC-7** Given the Experts directory, when it renders, then its toolbar holds the search "Search experts by name" and the "Topic" select, and the count line "Showing 1–24 of 38 experts" below it is a polite live region. (L2-022)
- **AC-8** Given Miriam Clarke's saved items, when the page renders, then a stacked toolbar holds the chip group "Filter by type" and then the count "14 saved items, newest saved first". (L2-071)
- **AC-9** Given seven open reports, when a moderator opens the queue, then the toolbar's count reads "Showing 7 open reports" as a polite live region, beside the selects "Reason", "Type" and "Status". (L2-086)
- **AC-10** Given `/admin/audit`, when an Administrator opens it, then a `form` named "Filter the audit log" with `role="search"` is the stacked toolbar and holds Actor, Action, Target, From and To, followed by the actions "Apply filters" and "Clear filters". (L2-099)
- **AC-11** Given `/admin/users`, when an Administrator opens it, then the toolbar holds the search "Search users by name or email" and the selects "Role" and "State". (L2-095)

### Active filters

- **AC-12** Given the URL `/explore?type=course`, when the page loads, then "Course" is checked in the panel, the toolbar shows the pill "Type: Course" and the Filters button reads "Filters · 1". (L2-002)
- **AC-13** Given the URL `/explore?type=podcast&topic=ai-ethics`, when the page loads, then only the pill "Topic: AI ethics" shows, "AI ethics" is checked, "Filters · 1" shows and no error appears. (L2-002)
- **AC-14** Given the pill "Type: Course", when the user activates "Remove filter Type: Course", then `removed` is emitted once, the component itself does not navigate, and once the page drops the filter the pill is gone, "Course" is unchecked and the count reads "Showing 1–24 of 212 items, newest first". (L2-002)
- **AC-15** Given three selected options, when the user activates "Clear all" in the pill list, then `cleared` is emitted once, and once the page clears them no pill remains, the toolbar is no longer stacked and the Filters button reads "Filters". (L2-002)
- **AC-16** Given the user selects the type "Video" and the topic "AI ethics" in the panel, when the page updates, then each option emitted `changed(true)`, the URL contains `type=video&topic=ai-ethics`, and the pills "Type: Video" and "Topic: AI ethics" show. (L2-002)

### Filters panel

- **AC-17** Given Explore at 1440 px, when it renders, then the panel is an `aside` named "Filters" in the first column of the sidebar layout, with the groups Type, Topic, Level, Contributor and Length in that order, each a `fieldset` with a `legend`, and it sticks while the results scroll. (L2-002)
- **AC-18** Given the Type group, when it renders, then its options read "Course 24", "Module 11", "Video 86", "Article 64", "Collection 18" and "Event 9", and the Level, Contributor and Length groups list "Introductory", "Intermediate" and "Advanced"; "Logos Lab", "Dr. Abena Mensah" and the other experts; "Under 15 min", "15 to 60 min" and "Over 60 min" without counts. (L2-002)
- **AC-19** Given no filter is on, when the panel renders, then its head shows only "Filters"; and given one is on, then "Clear all" shows beside the heading and activating it emits `cleared`. (L2-002)
- **AC-20** Given the Topic group of 12 topics collapsed at 6, when the user activates "Show all 12 topics", then all 12 options show, the button is removed, and focus lands on the 7th option "Philosophy of mind". (L2-002)
- **AC-21** Given "Creativity and the arts", the 12th topic, is checked on load, when the panel renders, then every topic shows, "Creativity and the arts" is checked, and there is no "Show all 12 topics" button. (L2-002)
- **AC-22** Given the Contributor group, when it renders collapsed, then it shows 6 experts and the button "Show all 38 experts" has `aria-expanded="false"`. (L2-127)
- **AC-23** Given the Video option with a count of 1086, when the page renders in en-CA, then it reads "Video 1,086", and in fr-CA it reads the locale's grouping with no code change. (L2-148)
- **AC-24** Given any viewport below 1024 px, when Explore renders, then the inline panel is not displayed, the Filters button shows, and the button is at least 44 CSS px tall. (L2-132)
- **AC-25** Given any viewport of 1024 px or wider, when Explore renders, then the Filters button is not displayed. (L2-130)

### States

- **AC-26** Given the catalogue is loading, when Explore renders, then the count reads "Loading the catalogue…", the sort is disabled, the panel stays in place with its options usable, and the page's layout shift stays at or below 0.1 when the results arrive. (L2-120)
- **AC-27** Given the catalogue request failed, when Explore renders, then the count reads "Results unavailable", the sort is disabled and the filters the visitor chose stay shown. (L2-141)

### Filters dialog

- **AC-28** Given a visitor on Explore at 375 px, when they activate the "Filters" button, then a modal dialog titled "Filters" opens holding the panel with the summary "Choose as many as you like. The count updates as you go." and its footer shows "Cancel" and the primary "Show 212 items". (L2-130)
- **AC-29** Given the dialog with "Course" checked in the draft, when it renders, then the summary reads "1 filter on. The count updates as you go.", "Clear all" shows beside it, and the primary reads "Show 24 courses". (L2-002)
- **AC-30** Given the draft just changed, when the count is loading, then the primary reads "Counting courses…", has `aria-busy="true"` and `aria-disabled="true"`, keeps focus, and a second press does nothing. (L2-127)
- **AC-31** Given the draft's count arrives, when the primary updates to "Show 24 courses", then a polite status announces the new count and focus does not move. (L2-127)
- **AC-32** Given the dialog open, when the visitor presses the primary "Show 24 courses", then the draft is written to the address as `type=course`, the dialog closes and focus returns to the Filters button. (L2-126)
- **AC-33** Given the dialog open with a changed draft, when the visitor presses <kbd>Esc</kbd> or "Cancel", then the draft is discarded, the address is unchanged and focus returns to the Filters button. (L2-126)

### Keyboard and focus

- **AC-34** Given the toolbar with pills on Explore, when a keyboard user tabs through it, then focus reaches the Filters button, the sort, each pill's remove button and "Clear all" in order, and every one shows a ring at least 2 CSS px thick with 3:1 contrast. (L2-126)
- **AC-35** Given the pills "Type: Course" and "Level: Intermediate", when the user presses <kbd>Enter</kbd> on "Remove filter Type: Course" and the page drops it, then focus moves to the "Level: Intermediate" remove button, and when the last pill is removed focus moves to the count line. (L2-126)
- **AC-36** Given the Type group, when the keyboard user presses <kbd>Space</kbd> on "Video", then the box toggles and `changed` is emitted with `true`. (L2-126)

### Screen readers

- **AC-37** Given Explore, when the visitor changes a filter, then the count line announces its new text through a polite live region without moving focus. (L2-127)
- **AC-38** Given the pill "Topic: AI ethics", when it is inspected, then the text is plain text in a list named "Active filters" and its button has the accessible name "Remove filter Topic: AI ethics" with the close glyph hidden. (L2-127)
- **AC-39** Given the Filters button with one filter on, when it is inspected, then its accessible name is "Filters · 1", it has `aria-haspopup="dialog"`, and the sliders glyph is hidden. (L2-127)
- **AC-40** Given the Type group, when it is read by a screen reader, then it is a group named "Type" and "Course 24" is a checkbox, not checked. (L2-127)

### Theming

- **AC-41** Given the dark theme, when the toolbar, pills and panel render in every state, then each colour is a token with a dark value and no state keeps a light-only colour. (L2-134)
- **AC-42** Given both themes, when contrast is measured, then the count line, legend, option counts and pill text meet 4.5:1 and the option box border and focus ring 3:1. (L2-129)

### Responsive

- **AC-43** Given Explore at 320 px with seven pills, when it renders, then the count takes its own line, the tools and pills wrap, nothing scrolls horizontally and the remove buttons are at least 24 × 24 CSS px. (L2-130)
- **AC-44** Given the pseudo-locale's strings 30 % longer at 320 px, when the pill "Topic: The image of God and personhood" renders, then its text wraps inside the pill and nothing is clipped. (L2-150)
- **AC-45** Given the browser zoomed to 400 % at 1280 px wide, when Explore renders, then the content reflows to one column, the Filters button shows and no function is lost. (L2-129)

### Motion

- **AC-46** Given reduced motion, when the visitor hovers an option row, then the wash appears without a transition. (L2-129)

### Performance

- **AC-47** Given Explore with seven selected options, when the visitor toggles "Level: Intermediate", then only that option, the pill list and the count line re-render, the layout shift of the page stays at or below 0.1, and the interaction completes within 200 ms. (L2-120)

## Implementation notes

- Planned; the first slice builds the Explore page only (AC-1 to AC-4, AC-12 to AC-21, AC-24 to AC-40, AC-47)
  and the parts it uses; the Events, Experts, Saved, Moderation and Admin lists reuse `SearchFilterToolbar`,
  `ToolbarCount` and `ToolbarTools` unchanged (AC-5 to AC-11).
- Folder `frontend/projects/components/src/lib/search-filter-toolbar/`, one type per file, each component
  with its own `.html` and `.scss`: `search-filter-toolbar.ts` (`SearchFilterToolbar`, selector
  `div[llToolbar], form[llToolbar]`), `toolbar-count.ts` (`ToolbarCount`), `toolbar-tools.ts`
  (`ToolbarTools`), `filters-button.ts` (`FiltersButton`, `ll-filters-button`), `active-filters.ts`
  (`ActiveFilters`), `active-filter.ts` (`ActiveFilter`), `filter-panel.ts` (`FilterPanel`,
  `ll-filter-panel`), `filter-panel-presentation.ts` (`FilterPanelPresentation`), `filter-group.ts`
  (`FilterGroup`), `filter-option.ts` (`FilterOption`), `index.ts` re-exporting them; all exported from
  `public-api.ts`.
- Composes `button[llButton]` (quiet small for the Filters button, text small for Clear all and the
  expander), `button[llIconButton]` (small, for remove), `svg[llIcon]` (`sliders`, `close`) and
  `label[llCheck]` (inside `FilterOption`'s template; the `check__count` span is already supported by
  the checkbox, so the checkbox needs no API change). Counts use Angular's `formatNumber` with
  `LOCALE_ID`.
- `SearchFilterToolbar` finds its count with `contentChild(ToolbarCount, { descendants: true })`;
  `ActiveFilters` injects it optionally. `FilterGroup` reads its options with `contentChildren(FilterOption)`
  and sets `hidden` on those beyond `limit` that are not checked; `FilterOption` injects its group for
  `name`. The pill's remove button, the expander and Clear all are in the components' own templates.
- Styles: the `search-filter-toolbar` block of `components.css`, with host selectors written
  `:host(.toolbar…)`; `.filters[popover]` and the `popover-open` animation are dropped (D-5); the panel
  gains the max-height and the below-LG `display: none` (D-6, D-7). `.sidebar-layout` and `.cluster`
  already exist in `styles/_foundations.scss`.
- The dialog is application code: `frontend/projects/logos-lab/src/app/dialogs/explore-filters/`
  (`ExploreFiltersDialog`) opened with the CDK `Dialog` service, like `NavDrawerDialog`. It owns the
  title, close button, footer, draft, debounce (about 300 ms), hidden status line and closing at LG.
- Mock parity changes: the pills' `a.icon-btn` remove links become `button.icon-btn` (D-3);
  `aside.filters[popover]` and `.filters__done` in `pages/explore/*` go (D-5); `p.toolbar__count` in
  `moderation-queue` and `appeals` gains `aria-live="polite"` (D-13); the Experts count loses its inline
  `margin-block` for a page layout rule; the `.toolbar` that holds tabs in `my-learning`, `my-events`
  and `following` keeps its markup and holds `nav[llTabs]` (the tabs CRD D-1).
- The design-system page is a worked sample with notes; it shows chip and range facets that no
  Logos Lab mock uses (D-10) and says the sheet is a `popover` (D-5). Its Sources list names only
  `pages/admin-users/default`; the usage table above is the full inventory.

## Decisions

- **D-1** *One component or a family, and what are the selectors?* A family of nine attribute and element
  parts, because the mocks use the bar with no count (analytics), with no tools (held comments), as a
  `form` (admin audit) and hosting tabs, so a single `ll-search-filter-toolbar` with fixed slots could
  not host every row. The host is a native `div` or `form` (a custom element cannot be a form), the
  pill is a `li`, and the group is a `fieldset`, so the DOM stays what the mocks and e2e locators expect.
- **D-2** *Is the toolbar a layout or a component with fixed slots?* A layout container. It owns the
  bar, the hairline and the stacked layout; the page owns the rows and their text. The count line, tools
  and active filters are small parts the page may use in any order.
- **D-3** *Are the pill's remove controls links or buttons?* Buttons that emit `removed`. The mocks use
  `a.icon-btn` links to the unfiltered page, but the page owns the URL state (a removal replaces the
  address, adds no history entry and resets the page number) and the design-system page uses `button`.
  A link would force the component to build URLs. The mocks' links change to buttons.
- **D-4** *Is an active filter a chip?* No. The mocks and the design system draw it as the accent-wash
  `.pill.pill--accent` with a small icon button, not the bordered [chip](chip.md). The chip CRD's D-7
  ("an applied filter is a static chip with a remove button") describes chips the author can still edit;
  an applied catalogue filter is this pill.
- **D-5** *The design system says the panel is a `popover` sheet; the repository says use the CDK
  dialog.* The panel below LG is a modal CDK dialog (`ExploreFiltersDialog`), as the Browse catalogue
  design and `AGENTS.md` require; `popover`, its animation and the `.filters__done` button of the page
  mocks are dropped. The dialog's footer primary ("Show 24 courses") is the outcome-stating done
  action, with the busy state "Counting courses…" of `dialogs/explore-filters/busy`. A done button inside
  the panel would sit in the scrolling body, outside the dialog footer, and never be visible inline.
- **D-6** *What happens to the inline panel below LG, and to the dialog at LG?* Below 64rem the inline
  panel is `display: none` (one panel on screen, no duplicate controls or ids in the accessibility
  tree). If the viewport reaches LG while the dialog is open, the page closes it and applies the draft;
  the sources do not say, and discarding a user's choices on rotate would lose work.
- **D-7** *A sticky panel taller than the viewport?* The sources let it grow (`overflow: visible`),
  which leaves the lower groups unreachable once Topic (12) and Contributor (38) expand. From LG the
  panel has a maximum height of the viewport minus `--space-12` and scrolls inside itself, with
  `--space-1` inline padding so focus rings are not clipped.
- **D-8** *Where is Clear all?* In the panel head (inline) or beside the summary (dialog), only while a
  filter is on (`canClear`), as `explore/selected` and `dialogs/explore-filters/selected` show; the
  pill list has its own (`clearLabel`). Explore's no-results state shows both this and the empty state's
  single "Clear filters"; they do the same thing and L2-002 AC5 governs only the empty state.
- **D-9** *How does "Show all" behave?* It is one-way: activating it shows every option, removes the
  button and moves focus to the first revealed option (the button leaves the page; moving focus avoids
  a lost focus). A checked option beyond `limit` expands the group on its own and the button is not
  rendered, as `explore/long` and `explore/no-results` show for "Creativity and the arts"; `expanded`
  then stays `true` so unchecking never collapses the list under the pointer. Checked options are always
  visible. The design-system page's `aria-expanded` stays on the button while it exists.
- **D-10** *What else may a group hold?* After its options, any control (the design-system sample shows a
  chip row and a range). No mock uses them; the slot keeps the API from changing if one is added.
- **D-11** *How does an option relate to the checkbox?* `li[llFilterOption]` renders `label[llCheck]` with
  the native input, the text and `span.check__count` in its own template. The checkbox already supports
  a trailing count and needs no change. Its CRD's usage row for Explore should name
  `fieldset.filter > ul.filter__list` (not `fieldset.check-group`).
- **D-12** *Who owns `checked`?* The page, which rebinds it from the URL or the draft (L2-002 AC3). After
  emitting `changed` the option resets the native box to its `checked` input, so a page that does not
  accept the change leaves the box unchanged. The same rule as [chip](chip.md) D-9.
- **D-13** *Does every count line announce?* Yes. The component always sets `aria-live="polite"` (L2-127
  AC3); the moderation and appeals mocks that lack it change. Loading and error text in the line use
  the same region. The line reserves one line so a blank (`&nbsp;`) or short text does not shift the
  page.
- **D-14** *How big is the Filters button?* Small, as the design system says, but at least
  `--target-comfortable` tall below LG, because it is the only way to reach the filters on touch and
  L2-132 AC1 asks primary touch actions for 44 px. It is hidden from LG, where the panel is in view.
- **D-15** *Who owns focus after a removal?* The page calls `ActiveFilters.focusAfterRemoval(index)`
  after its state drops the pill, because only the page knows when the update lands. The design-system
  page says "next pill, or the count when none are left"; the method also handles the last of several
  by going to the previous pill. The count line has `tabindex="-1"` so it can take focus.
- **D-16** *The sort select?* The inline `ll-select` of the [select](select.md) CRD (label "Sort by"), projected into the tools by the page; the family does not depend on it, so any select fits the slot. While loading or failed the select is disabled.
- **D-17** *Where is the render-performance budget measured?* This repository has no perf-test project,
  as [button](button.md) D-3; the budgets of `L2-120` and `L2-123` measured on whole pages cover the
  family. The scenario is the Explore page of `pages/explore/long`.
- **D-18** *Who formats counts?* The components, with `LOCALE_ID`, from raw numbers; the page formats the
  range "1–24" in its own count message (L2-148 AC2).
- **D-19** *How is the new count announced in the dialog?* The mock's primary button changes its name from
  "Counting courses…" to "Show 24 courses", which a button does not announce. The dialog adds a visually
  hidden `role="status"` line with the new count; its copy is the dialog's, and the design system and
  mocks should add it.
- **D-20** *How tall is the remove button?* At least 24 × 24 CSS px (WCAG 2.2 target size), the design
  system's rule for pills; it sits at the pill's end. The 44 px rule is for primary touch actions.
- **D-21** *Does the pill carry `aria-live`?* No. The count line announces the change; announcing every
  pill would repeat it.
