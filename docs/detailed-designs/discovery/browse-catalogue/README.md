# Browse the catalogue

## Overview

The *catalogue* is the complete, browsable list of published Logos Lab content at `/explore`. It sits
in the discovery subsystem beside the home page, search and topic pages, and it is the place a
person goes to look across everything rather than to find one known thing.

The catalogue lists courses, learning modules, videos, articles, collections and events together. A
person narrows the list with filters and changes its order with a sort. Terms used below:

- **filter** — constraint on one content attribute (type, topic, level, contributor or duration) that
  removes non-matching items from the results
- **active filter** — filter whose value is currently applied and shown as a removable pill
- **contributor** — expert or Logos Lab, credited as the author of an item
- **popularity** — number of distinct members who engaged with an item in the last 30 days

The filter state lives in the URL query string. A filtered view can therefore be shared, bookmarked
and reopened with the same results.

## Description

The slice runs from `ExplorePage` in Logos Lab Web to the Logos Lab API and the Logos Lab database.

**Logos Lab Web**

- **`ExplorePage`** — routed standalone component for `/explore`, server-rendered for the first
  page. It reads the filters and sort from the route's query parameters and writes them back on each
  change, so the URL always reflects the visible results.
- **`ExploreFiltersDialog`** — sheet opened with the Angular CDK `Dialog` service on small viewports.
  It holds the same filters as the sidebar. Its primary button states the outcome, for example
  "Show 24 courses", and shows a busy state while the count loads.
- **Design-system components** — `ll-search-filter-toolbar` (count and sort), `ll-checkbox` (filter
  options with counts), `ll-select` (sort), `ll-chip` (active-filter pills), `ll-content-card`
  (results), `ll-pagination`, `ll-empty-state`, `ll-alert`, `ll-skeleton` and `ll-dialog`.
- **`CatalogueApi`** — contract with `browse(query: CatalogueQuery)`. `CATALOGUE_API` is its token
  and `HttpCatalogueApi` its HTTP implementation.
- **Screen states** — `docs/mocks/pages/explore/` covers `default`, `selected` (filtered to courses),
  `loading`, `no-results`, `empty`, `error`, `partial` (search degraded, catalogue still loads) and
  `long`. `docs/mocks/dialogs/explore-filters/` covers `default`, `selected` and `busy`.

**Logos Lab API**

- **`GET /api/v1/catalogue`** — anonymous route handler. Query parameters: `type`, `topic`, `level`,
  `contributor`, `duration`, `sort` and `page`. It returns one page of `ContentSummary` items, the
  total count and the option counts for each filter.
- **`CatalogueQueryParser`** — turns raw query parameters into a `CatalogueQuery`. It drops unknown
  values (for example `type=podcast`) without error and keeps the valid ones.
- **`BrowseCatalogueAction`** — runs the query through `CatalogueService` and returns the page.
- **`CatalogueService`** — applies `PublishedContentPolicy`, the filters and the sort, and pages the
  results at 24 items per page.
- **`ContentRepository`** — builds the filtered SQL query over `content_items`, `content_topics` and
  `content_popularity`. Every value is a bound parameter.
- **`ContentPopularityRefreshJob`** — Worker job that recomputes `content_popularity`, the count of
  distinct members who engaged with each item in the last 30 days. The set of events that count as
  engagement and the refresh interval are `<TO SUPPLY>`.
- **`TopicFilterOptions`** — lists only topics that have published content (`L2-005`).

The catalogue reads the database directly, not the search index. When search is degraded, the
catalogue still loads every item and shows a notice that search is limited (`L2-141`).

**Key rules**

- Default: 24 items per page, sorted by "Newest".
- Each card shows type, title, contributor, topic, and duration or date.
- Filters: type; topic; level (Introductory, Intermediate, Advanced); contributor (an expert or Logos
  Lab); duration (`<15 min`, `15-60 min`, `>60 min`).
- Example URL encoding: type "Video" and topic "AI ethics" yield `type=video&topic=ai-ethics`.
- A URL with valid filter parameters pre-applies them and the controls show the selected values.
- Unknown filter values are ignored; the remaining filters apply; no error is shown.
- No matches: an empty state names the active filters and offers a single "Clear filters" action.
- "Most popular": items ordered by distinct engaged members in the last 30 days, descending.

### Explore page decisions

These settle what the design left open when `ExplorePage` was built against the mocks in
`docs/mocks/pages/explore/` and `docs/mocks/dialogs/explore-filters/`.

- **Address.** `/explore?type=&topic=&level=&contributor=&duration=&sort=&page=`. A filter with several
  values repeats its parameter (`type=course&type=module`). Values: `type` is a content type; `topic` is
  a topic slug; `level` is `introductory`, `intermediate` or `advanced`; `contributor` is an expert slug
  or `logos-lab`; `duration` is `under-15`, `15-60` or `over-60`; `sort` is `newest` (the default,
  left out) or `popular`; `page` is a number from 2 (page 1 is left out). An unknown value, or a page
  that is not a positive whole number, is dropped without a message and the rest apply.
- **Contract.** `CatalogueApi.browse(query)` calls `GET /api/v1/catalogue` with the same parameters and
  returns `CataloguePage`: `items` (the page's `ContentSummary` values), `total` (all matches),
  `page`, `pageCount`, `facets` and `searchDegraded`. Facets are the full option lists, never narrowed
  by the active filters: `types` carries `{ value, count }` and `topics` carries `{ value, label, count }`
  with the count of all published items, and `contributors` carries `{ value, label }` and starts with
  Logos Lab. Types, level and length are fixed sets, so the page owns their labels. The page size is
  24 and fixed.
- **Option lists.** The Topic and Contributor groups show their first 6 options and a "Show all 12
  topics" / "Show all 38 experts" button (`aria-expanded`) that reveals the rest. The totals are the
  list lengths; Logos Lab is not counted as an expert.
- **Count line.** "Showing 1–24 of 212 items, newest first". With exactly one type selected the noun is
  that type ("of 24 courses"); with 2 or more selected options the line adds "that match all N
  filters" ("of 4 items that match all 7 filters"). The sort ends the line: "newest first" or "most
  popular first". With no matches it reads "No items match Video, Creativity and the arts, and Over 60
  min", naming the selected options in group order. With an empty catalogue it reads "No items
  published yet".
- **Active filters.** Below the count line, one removable pill per selected option, in group order, named
  "Type: Course", "Topic: …", "Level: …", "Contributor: …", "Length: …", and a "Clear all" button.
  The Filters button shows the number selected: "Filters · 3".
- **States.** Loading keeps the toolbar and shows 6 skeleton cards with the sort disabled; "Loading the
  catalogue…" is announced once. Failure keeps the filters and says so, with "Try again". An empty
  catalogue invites "Meet the experts". No matches shows "No videos match these filters" (the noun
  follows the one selected type, otherwise "items") with one "Clear filters" action. A `searchDegraded`
  response shows the warning "Search is limited for now" with "Check again" above the toolbar; the list is
  complete.
- **Filters panel.** Beside the results from LG (64 rem) up; below LG the toolbar's Filters button opens
  the same panel in `ExploreFiltersDialog`, a CDK dialog sheet. In the sheet the choices are a draft: its
  primary button reads "Show 24 courses", is busy while the draft's count loads (the same `browse`
  call), and applies the draft to the address when pressed. Closing it discards the draft.
- **Address writes.** Every change replaces the address with the canonical query (no history entry for a
  checkbox), except page changes, which add one. Changing a filter or the sort returns to page 1.

## Requirements

| L2 ID | Refines (L1) | Requirement |
|-------|--------------|-------------|
| `L2-002` | `L1-001` | **Catalogue browsing and filtering.** The catalogue (`/explore`) shall list all published content and shall let users filter and sort it. Filter state shall be reflected in the URL so that it can be shared and bookmarked. |

## Diagrams

### System context

Visitors and learners browse the catalogue in Logos Lab. No external system takes part in this
slice.

![C4 system context for browsing the catalogue](diagrams/c4-context.png)

### Containers

Logos Lab Web calls the catalogue endpoint in the Logos Lab API, which reads the Logos Lab
database. The Worker refreshes the popularity counts that the "Most popular" sort reads.

![C4 container view for browsing the catalogue](diagrams/c4-container.png)

### Components

The route handler parses the query, dropping unknown values, and invokes `BrowseCatalogueAction`.
`CatalogueService` applies the published-content rule, filters, sort and paging.

![C4 component view for browsing the catalogue](diagrams/c4-component.png)

### Class structure

`ExplorePage` and `ExploreFiltersDialog` share one `CatalogueFilterState`. On the API side,
`CatalogueQuery` holds only valid filter values, typed by enumerations for type, level, duration and
sort.

![Class diagram for browsing the catalogue](diagrams/class-structure.png)

### Behaviour — filter and sort the catalogue

A filter change updates the URL, then calls the API. The parser ignores unknown values, and the page
shows either the results or an empty state that names the active filters.

![Sequence diagram for filtering the catalogue](diagrams/sequence-filter-catalogue.png)

### Behaviour — refresh popularity counts

The Worker recomputes the 30-day distinct-member engagement counts that the "Most popular" sort
reads, so the sort never aggregates engagement at request time.

![Sequence diagram for refreshing popularity counts](diagrams/sequence-refresh-popularity.png)
