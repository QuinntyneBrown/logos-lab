# View a collection

## Overview

A *collection* is a themed, ordered group of published Logos Lab content of any type, curated by an
expert or by Logos Lab. The *collections* subsystem covers viewing, building and following
collections; this feature covers the public collection page at `/collections/{slug}`.

The page presents the collection and its items in the curator's order. For a signed-in learner it
also shows how far they have got through the items. Terms used below:

- **curator** — expert or Logos Lab, credited as the author of a collection
- **collection item** — reference from a collection to one published item, with a position and an
  optional note
- **visible item** — collection item whose target is still published and not archived or hidden
- **completion state** — learner's standing on one item: Completed, In progress, Not passed or Not
  started
- **estimated duration** — sum of the visible items' durations, shown as the collection's length

## Description

The slice runs from the server-rendered `CollectionPage` in Logos Lab Web to the Logos Lab API and the
Logos Lab database.

**Logos Lab Web**

- **`CollectionPage`** — routed standalone component for `/collections/{slug}`, server-rendered for
  the public parts. For a signed-in learner it requests progress after hydration and shows each item's
  completion state and a summary such as "4 of 12 completed".
- **Design-system components** — `ll-breadcrumb`, `ll-page-header`, `ll-content-card` (item rows with
  position, type, title and contributor), `ll-badge` (completion state), `ll-progress-bar`,
  `ll-description-list` (curator, items, length, updated, followers), `ll-button` (Follow, `L2-050`),
  `ll-empty-state`, `ll-alert` and `ll-skeleton`.
- **`CollectionsApi`** — contract with `getCollection(slug)` and `getMyProgress(collectionId)`.
  `COLLECTIONS_API` is its token and `HttpCollectionsApi` its HTTP implementation.
- **Screen states** — `docs/mocks/pages/collection-page/` covers `default`, `progress`, `following`,
  `partial` (progress failed; items shown without marks and a Try again notice), `empty` (every item
  archived or hidden), `loading`, `error` and `long`.

**Logos Lab API**

- **`GET /api/v1/collections/{slug}`** — anonymous route handler. Returns the published collection with
  its visible items in order, or `404`. The response holds no personal data, so the CDN may cache it.
- **`GET /api/v1/me/collections/{collectionId}/progress`** — authenticated route handler. Returns the
  completion state of each item for the current user only (`L2-017`). The CDN does not cache it.
- **`GetCollectionAction`** — loads the collection through `CollectionService`.
- **`CollectionService`** — keeps items in position order, omits items that are archived or hidden,
  counts the remaining items and sums their durations. How events and nested collections contribute to
  the total duration is `<TO SUPPLY>`.
- **`GetCollectionProgressAction`** — calls `LearningProgressService` for the visible item ids and
  builds the "n of m completed" summary.
- **`CollectionRepository`** — reads `collections` and `collection_items` (`collection_id`,
  `content_id`, `position`, `note`). **`LearningProgressRepository`** reads `learning_progress`.

**Key rules**

- A published collection shows title, description, cover image, curator (an expert or Logos Lab),
  item count, total estimated duration and its items in order.
- An archived or hidden item is omitted, and the count excludes it.
- A signed-in learner sees each item's completion state and a summary such as "4 of 12 completed".

## Decisions for the web build

- **Contract.** `CollectionsApi.getCollection(slug)` returns `Collection`: `id`, `slug`, `title`,
  `description`, `coverUrl` (or `null`), `curator` (an expert, or Logos Lab), `items` (visible items in
  position order, each a `ContentSummary` with its optional `note`), `itemCount`, `totalMinutes` (`null`
  when no item has a duration), `updatedAt` (`YYYY-MM-DD`), `followerCount` and `following` (`false` for
  a visitor). A `404` problem means no published collection has that slug. `getMyProgress(collectionId)`
  returns `CollectionProgress`: `completed`, `total` and one entry per item with its `state`
  (`not-started`, `in-progress`, `completed` or `not-passed`), a `percent` for in-progress items and the
  `score` and `passMark` of a scored item that was not passed.
- **Header.** The eyebrow reads "Collection · 8 items · about 10 hours", and just "Collection · 0 items"
  when empty. The breadcrumb is "Collections" (the catalogue filtered to collections) then the title.
  The page header carries the Follow toggle.
- **Items.** An ordered list of row cards. The type line is the position and the type ("1 · Article"). A
  signed-in member's rows show the state as a badge ("Completed", "Not started", "Not passed · 64%, pass
  mark 80%") or a progress bar with "In progress". A visitor's rows show none of these.
- **Progress.** Requested only for a signed-in member, after the page shows. The summary card "Your
  progress" shows the bar and "3 of 8 completed". If the request fails the items stay without marks and
  a warning notice says "Your progress isn't showing right now" with "Try again"; the page is otherwise
  unchanged.
- **Aside.** The cover, then "Curated by" with the curator linked to their profile (plain text for Logos
  Lab) and the facts: Items, Length ("About 10 hours", "None yet" when empty), Updated and Followers.
- **Follow.** Same behaviour as an expert follow (`follow-expert`): the toggle, the status "Following.
  You'll get one notification whenever items are added.", the count in Followers going up or down by
  one, the sign-in prompt for a visitor, a danger alert on failure. Pressing "Following" opens the
  shared unfollow dialog, with the collection's own words. The follow routes are
  `PUT` and `DELETE /api/v1/me/follows/collections/{collectionId}`, answering the new follower count.
- **Empty.** When every item is archived or hidden, the list gives way to "Nothing to show in this
  collection right now" with a link to browse other collections, and no progress summary.
- **Loading and failure.** As the other pages: a busy header and skeleton rows announcing "Loading
  items…" once, an error with "Try again" and the help address, and the not-found page for a `404`.
- **Unfollow dialog.** The dialog takes its title, description and failure text, and the call that
  removes the follow, from its opener, so experts and collections share it.

## Requirements

| L2 ID | Refines (L1) | Requirement |
|-------|--------------|-------------|
| `L2-048` | `L1-009` | **Collection page.** Each published collection has a page at `/collections/{slug}`. |

## Diagrams

### System context

Visitors and learners view collections in Logos Lab. Experts and editors curate them.

![C4 system context for viewing a collection](diagrams/c4-context.png)

### Containers

Logos Lab Web server-renders the collection from the Logos Lab API and then requests the learner's
progress. The CDN caches only the public collection response.

![C4 container view for viewing a collection](diagrams/c4-container.png)

### Components

`CollectionService` filters items to visible ones and totals them. `GetCollectionProgressAction`
reads progress scoped to the current user.

![C4 component view for viewing a collection](diagrams/c4-component.png)

### Class structure

`Collection` composes ordered `CollectionItem` values. `CollectionProgress` pairs each item with a
`CompletionState`.

![Class diagram for viewing a collection](diagrams/class-structure.png)

### Behaviour — view a collection

The server render loads the collection with visible items only, so the item count and duration exclude
archived or hidden items.

![Sequence diagram for viewing a collection](diagrams/sequence-view-collection.png)

### Behaviour — show the learner's progress

After hydration, the page requests progress for the current user. A failure leaves the items in
place without marks and shows a Try again notice.

![Sequence diagram for collection progress](diagrams/sequence-load-progress.png)
