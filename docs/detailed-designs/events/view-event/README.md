# View an event

## Overview

Each published Logos Lab event has a page at `/events/{slug}`. The page tells a newcomer what the event is,
when and where it happens, who hosts it, and whether places remain. It is also where a member registers,
joins a waitlist, adds the event to a calendar, joins online, or watches the recording afterwards.

This feature covers the page itself and its read-only content. The actions on the page belong to sibling
features in the events subsystem: `register-for-event`, `cancel-registration-and-change-event`,
`add-event-to-calendar`, `join-online-event` and `watch-event-recording`.

Terms used below:

- **event time zone** — IANA time zone in which the host scheduled the event (for example `America/Toronto`)
- **time zone toggle** — two-button control that switches displayed times between the viewer's zone and the event time zone
- **agenda** — ordered list of timed items within the event
- **capacity state** — one of: places left, full with a waitlist, unlimited, registration closed
- **venue** — named physical place with an address, used by in-person and hybrid events

## Description

### Screens and states

- **`EventPage`** — routed page at `/events/:slug`, server-rendered (`L2-142`). It covers
  `docs/mocks/pages/event-page/`: `default` (online, before registering), `visitor` (times in the visitor's
  zone, "Sign in to register"), `in-person` (venue, maps link, map on request), `full`, `closed`
  (registration cut-off passed), `registered`, `waitlisted`, `join-open`, `live`, `changed`, `cancelled`,
  `past`, `loading` and `error`.
- **Sections and components** — `ll-breadcrumb`; the event head (date block, title, full date and time,
  format, venue, hosts); the time zone toggle (`ll-button-group` with "Your time (ET)" and "Event time
  (ET)"); "About" (`ll-prose`, topic `ll-chip` links); "Agenda" (`ll-timeline`); "Where" (venue name,
  address, "Open in your maps app", "Show the map"); "Host" (`ll-person-list`); the registration panel
  (`ll-rsvp-panel`); `ll-alert` for the changed and cancelled notices.
- **Venue map** — the venue block (`venue-map` in the mock) shows no third-party map until the user
  activates "Show the map" (`L2-052` criterion 2). The mock names OpenStreetMap as the tile source. The
  design-system page for this block is `<TO SUPPLY>`. The maps-app link format is `<TO SUPPLY>`.

### API contract

- **`EventsApi`** (token `EVENTS_API`) method `getEvent(slug)`.

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/v1/events/by-slug/{slug}` | Returns the public event model; anonymous. 404 when not published |
| `GET` | `/api/v1/me/events/{eventId}` | Returns the caller's registration state and, when allowed, the join link (`join-online-event`) |

The public model holds title, description, hosts, format, start, end, event time zone, agenda, venue
(name, address) for in-person and hybrid events, capacity state, registration cut-off, cancellation state
and reason, change notice, recording reference and topics. It never contains the join link (`L2-052`
criterion 3, `L2-058`), so the CDN may cache it. The caller-specific part comes from the `/me` call after
hydration.

### Application and domain

- **`GetEventAction`** — loads a published event by slug and maps it with `EventViewService`.
- **`EventViewService`** — computes the capacity state and excludes the join link by construction: the
  public model type has no join-link field.
- **Entities and tables** — `Event` (`events`), `EventHost` (`event_hosts`), `AgendaItem`
  (`event_agenda_items`), and the registration count from `event_registrations`.

### Rules from the acceptance criteria

- The page shows title, description, hosts, format, start and end in the viewer's zone with a toggle to the
  event's zone, agenda, capacity state and registration action (`L2-052` criterion 1).
- In-person and hybrid events show venue name and address with a maps link; no third-party map loads until
  activated (criterion 2).
- The join link is never shown on the public page (criterion 3).
- A cancelled event shows a prominent "Cancelled" notice with the reason, and registration is unavailable
  (criterion 4).

## Requirements

The feature realizes the following level-2 (L2) requirements. Each L2 requirement refines the level-1 (L1) requirement cited beside it.

| L2 ID | Refines (L1) | Requirement |
|-------|--------------|-------------|
| `L2-052` | `L1-010` | **Event page.** Each published event has a page at `/events/{slug}`. |

## Diagrams

### System context

Members and visitors read event pages on Logos Lab. The map provider is contacted only when the viewer asks
for the map.

![C4 system context for viewing an event](diagrams/c4-context.png)

### Containers

Logos Lab Web server-renders the public model; the caller-specific state arrives after hydration from an
authenticated call.

![C4 container view for viewing an event](diagrams/c4-container.png)

### Components

`EventPage` composes the shared components; `GetEventAction` uses `EventViewService`, whose public model
has no join-link field.

![C4 component view for viewing an event](diagrams/c4-component.png)

### Class structure

`PublicEventModel` holds the public facts; `EventViewerState` holds what only the caller may see.

![Class diagram for viewing an event](diagrams/class-structure.png)

### Behaviour — open an event page

The page renders the public model, then loads the caller's state. The map loads only on request, and a
cancelled event shows its notice in place of registration.

![Sequence diagram for opening an event page](diagrams/sequence-open-event.png)
