# Browse events

## Overview

Logos Lab runs live events: Q&As, workshops, panels and evenings with experts, online, in person or both.
The events page at `/events` is where anyone, signed in or not, finds what is coming up and what has
already happened. It is the entry point of the events subsystem; each row leads to an event page
(`view-event`).

Terms used below:

- **event format** — how an event is attended: Online, In person or Hybrid (online and at a venue at once)
- **upcoming event** — published event whose end time is still in the future
- **past event** — published event whose end time has passed
- **happening now** — upcoming event whose start time has passed and whose end time has not
- **remaining capacity** — capacity minus confirmed registrations, shown only for events with limited capacity
- **viewer's time zone** — IANA time zone of the person viewing the page, used to show event times

## Description

### Screens and states

- **`EventsPage`** — routed page at `/events`, server-rendered (`L2-142`). It covers
  `docs/mocks/pages/events/`: `default` (upcoming, soonest first), `live` ("Happening now" leads the list),
  `past` (newest first, with the "Recording available" filter), `empty`, `no-results` (names the filters,
  "Clear filters"), `loading`, `error` and `long`.
- **`ExploreFiltersDialog`** — the filter sheet on narrow viewports, covering the event variant of
  `docs/mocks/dialogs/explore-filters/` (`default`, `selected`, `busy`).
- **Shared components** — `ll-page-header`, `ll-tabs` (Upcoming, Past), `ll-search-filter-toolbar`
  (format, topic, host selects; active filter pills), `ll-event-row` (date block, title, time with the zone
  named, format and venue, host, badges), `ll-badge` ("Happening now", "You're registered", "Full ·
  waitlist open", "Recording available"), `ll-pagination` ("Show more events"), `ll-empty-state`,
  `ll-skeleton`.

### URL and filters

The URL holds the state, so a filtered list is shareable and survives reload (`L2-051` criterion 3):
`/events?tab=past&format=online&topic={topicSlug}&host={hostSlug}&recording=1`. `EventsPage` reads the
query parameters on load and writes them back on each change with the Angular router.

### Time zones

The API returns instants in UTC with the event's own IANA zone. Logos Lab Web formats times in the viewer's
time zone with `Intl.DateTimeFormat` and names the zone (for example "ET"). During server rendering the
viewer's zone is not known, so the server renders the member's saved zone when signed in, and the event's
zone otherwise; the browser re-renders in its own zone after hydration (baseline choice, `L2-148`).

### API contract

- **`EventsApi`** contract, **`EVENTS_API`** token, **`HttpEventsApi`** implementation; method
  `listEvents(query)`.

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/v1/events?tab=&format=&topic=&host=&recording=&cursor=` | Lists published events; anonymous |

Each item holds id, slug, title, format, start, end, event time zone, venue name, hosts, remaining
capacity (null when unlimited), `isHappeningNow`, `hasRecording`, and, for a signed-in caller, the caller's
registration status.

### Application and domain

- **`ListEventsAction`** — validates the query and calls `EventListingService`.
- **`EventListingService`** — upcoming: `ends_at > now`, ordered by `starts_at` ascending (`L2-051`
  criterion 1); past: `ends_at <= now`, ordered by `starts_at` descending (criterion 2). It computes
  `isHappeningNow` as `starts_at <= now < ends_at` (criterion 4) and remaining capacity from confirmed
  registrations. The `recording=1` filter keeps events with a recording (`L2-059`).
- **`EventRepository`** — reads `events`, `event_hosts`, `content_topics` and a count of
  `event_registrations`. Only published events are returned; cancelled events stay listed with their
  state (baseline choice, `<TO SUPPLY>` confirmation).
- **Caching** — the anonymous response may be cached by the CDN for a short time (`L2-124`); the
  caller-specific registration badges come from a separate authenticated call after hydration.

Open points: page size for "Show more events" is `<TO SUPPLY>`. CDN cache lifetime for the anonymous list
is `<TO SUPPLY>`.

## Requirements

The feature realizes the following level-2 (L2) requirements. Each L2 requirement refines the level-1 (L1) requirement cited beside it.

| L2 ID | Refines (L1) | Requirement |
|-------|--------------|-------------|
| `L2-051` | `L1-010` | **Event listing.** The events page (`/events`) lists published events. |

## Diagrams

### System context

Members and visitors browse events on Logos Lab without signing in.

![C4 system context for browsing events](diagrams/c4-context.png)

### Containers

Logos Lab Web server-renders `/events` from the API's event list; the CDN caches the anonymous response.

![C4 container view for browsing events](diagrams/c4-container.png)

### Components

`EventsPage` keeps filters in the URL and calls `EventsApi`; `ListEventsAction` uses
`EventListingService` for ordering, "Happening now" and remaining capacity.

![C4 component view for browsing events](diagrams/c4-component.png)

### Class structure

`EventListQuery` carries the tab and filters; `EventListItem` carries what one `ll-event-row` shows.

![Class diagram for browsing events](diagrams/class-structure.png)

### Behaviour — list and filter events

A filter change updates the URL and reloads the list; the service applies the ordering and labels from
`L2-051`.

![Sequence diagram for listing and filtering events](diagrams/sequence-list-events.png)
