# Event row

| Field | Value |
|---|---|
| Selector | `ul[llEventList]`, `li[llEventRow]` |
| Library path | `frontend/projects/components/src/lib/event-row/` |
| Status | planned |
| Traces to | L2-001, L2-051, L2-126, L2-127, L2-129, L2-130, L2-134, L2-150 |
| Design system | [`event-row.html`](../../design-system/components/event-row.html) |
| Source mocks | [`pages/home/default`](../../mocks/pages/home/default.html), [`pages/events/default`](../../mocks/pages/events/default.html), [`pages/events/live`](../../mocks/pages/events/live.html), [`pages/events/past`](../../mocks/pages/events/past.html), [`pages/my-events/default`](../../mocks/pages/my-events/default.html), [`pages/dashboard/default`](../../mocks/pages/dashboard/default.html) |
| Rendering | [`event-row.html`](event-row.html) |

## Purpose and scope

An event row lists one event in a hairline-divided list: a large date block, the title as a link, when
and where it happens, and a trailing side for its state — places left, "Full · waitlist open",
"Registered", "Happening now", "Recording available", or an action such as "Add to calendar" or
"Watch". The list lays rows out by its own width (a container query), so it works in the home page's
narrow column and on the full-width events page.

Out of scope:

- The event page header (`.event-head`) and the venue map (`.venue-map`), which share the design-system
  block but are separate components built with the event page.
- Formatting the date and time: the page passes formatted strings.
- What the side's actions do: the page.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/home/*` Upcoming events (narrow column) | 3 rows | "Faith and AI Evening: Is Creativity Sacred?"; when "Thu, Oct 22, 7:00 – 9:00 PM EDT"; where "St. Brigid's Hall, Ottawa" (place icon) or "Online" (monitor icon); side "33 places left", "312 registered", warning badge "Full · waitlist open" | default | canvas |
| `pages/events/*` | many rows | where with host "hosted by Dr. Abena Mensah"; side "You're registered" status, places left | default, live "Happening now" | canvas |
| `pages/events/past` | past rows | "ended"; side badge "Recording available", quiet sm "Watch" | past | canvas |
| `pages/my-events/*`, `pages/dashboard/*` | rows | side "Registered" status, warning "Waitlisted · number 3", quiet sm "Add to calendar" | default | canvas |

## Anatomy

1. **List** — `ul.events`: a hairline on top; an inline-size container.
2. **Row** — `li.event` (+ `.is-past`, + `.is-cancelled`): a grid of date, main and side, with a bottom
   hairline.
3. **Date** — `div.event__date > time[datetime]` with `span.event__day` (large light numerals) and
   `span.event__mon` (overline).
4. **Main** — `div.event__main`: `h3.event__title > a`, then `p.event__meta` with a `span` for when
   (clock icon) and a `span` for where (place or monitor icon).
5. **Side** — `div.event__side`, projected: `span.event__going`, badges, inline statuses, buttons.

Host: `ul[llEventList]` and `li[llEventRow]` are the consumer's own list elements; the components add
the classes and render the row's parts.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `title` (`llEventRow`) | `string` | — | yes | The link text. |
| `path` (`llEventRow`) | `string` | — | yes | Router link of the event page. |
| `datetime` (`llEventRow`) | `string` | — | yes | ISO start, set on `time[datetime]`. |
| `day` (`llEventRow`) | `string` | — | yes | Day of the month, formatted ("22"). |
| `month` (`llEventRow`) | `string` | — | yes | Short month, formatted ("Oct"). |
| `when` (`llEventRow`) | `string` | — | yes | Date and time range, formatted. |
| `where` (`llEventRow`) | `string \| null` | `null` | no | Place or "Online", with host when given. |
| `online` (`llEventRow`) | `boolean` | `false` | no | Shows the monitor icon instead of the place icon. |
| `headingLevel` (`llEventRow`) | `2 \| 3` | `3` | no | Title heading level. |
| `past` (`llEventRow`) | `boolean` | `false` | no | Adds `.is-past`. |
| `cancelled` (`llEventRow`) | `boolean` | `false` | no | Adds `.is-cancelled` (title struck through). |

### Outputs

None.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default (`llEventRow`) | `span.event__going`, badges, inline statuses, small buttons | Rendered in `.event__side`; omitted when empty. |
| default (`llEventList`) | `li[llEventRow]` | The rows. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Upcoming | — | Future events. |
| Past | `.is-past` | Ended events; day and title subtle. |
| Cancelled | `.is-cancelled` | Cancelled events; title struck through. |

Layout by container width: below 40rem the date sits beside the main with the side beneath; from 40rem
the side moves to a third column.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Title in default text | Heading link |
| Hover | title `:hover` | Underline | — |
| Focus | title `:focus-visible` | Shared focus ring | — |
| Past | `.is-past` | Day and title `--color-fg-subtle` | Side states "ended" in words |
| Cancelled | `.is-cancelled` | Strike-through, subtle | Side says "Cancelled" in words |

## Markup

```html
<!-- rendered -->
<ul class="events">
  <li class="event">
    <div class="event__date"><time datetime="2026-10-22T23:00:00Z"><span class="event__day">22</span><span class="event__mon">Oct</span></time></div>
    <div class="event__main">
      <h3 class="event__title"><a href="/events/faith-and-ai-evening-is-creativity-sacred">Faith and AI Evening: Is Creativity Sacred?</a></h3>
      <p class="event__meta"><span><svg class="icon icon--sm" aria-hidden="true">…</svg>Thu, Oct 22, 7:00 – 9:00 PM EDT</span><span><svg class="icon icon--sm" aria-hidden="true">…</svg>St. Brigid's Hall, Ottawa</span></p>
    </div>
    <div class="event__side"><span class="event__going">33 places left</span></div>
  </li>
</ul>
```

```html
<!-- consumer -->
<ul llEventList><li llEventRow [title]="e.title" [path]="e.path" [datetime]="e.startsAt" [day]="e.day" [month]="e.month" [when]="e.when" [where]="e.where"><span class="event__going">{{ e.going }}</span></li></ul>
```

## Design

- Row: date column `--size-event-date` (`--space-24` from 40rem container), gap `--space-2` `--space-5`,
  block padding `--space-6` (`--space-8` wide); hairlines `--color-border-default`.
- Day `--font-weight-light` `--font-size-3xl` display; month `--text-overline` subtle.
- Title `--text-h3`; meta `--text-body-sm` muted with `--space-2` icon gap; going `--text-body-sm`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Hairlines | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Title, day | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Month, past | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Meta, going | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | Title |
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Meta |
| `--color-fg-subtle` | `--color-bg-canvas` | 4.5:1 | Month |

## Responsive behaviour

- Layout follows the list's own width (container query at 40rem), not the viewport.
- Titles and meta wrap; at 320 px nothing scrolls horizontally.

## Accessibility

### Role and pattern

A list of items, each with a heading link; `time` carries the machine-readable start.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | The title link, then any side actions. |

### Focus

Shared focus ring on the title link and side controls.

### Labelling

Icons in the meta are decorative; states in the side are words.

### Announcements

None.

### Motion

None.

## Content and internationalisation

- When and where arrive formatted and translated; titles and places are data.

## Performance

- `OnPush`; static rendering. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given three upcoming events, when the home page renders, then "Upcoming events" lists them in order as rows with the day and month, the title linking to the event page, when, and where. (L2-001)
- **AC-2** Given an online event, when its row renders, then its where line reads "Online" with the monitor icon. (L2-051)
- **AC-3** Given a row, when it is inspected, then it is a list item with a heading link and a `time` element carrying the ISO start. (L2-127)

### States

- **AC-4** Given a past event on the events page, when its row renders, then it carries `.is-past` and the side shows "Recording available" and "Watch". (L2-051)

### Keyboard and focus

- **AC-5** Given a row, when its title receives keyboard focus, then a focus ring at least 2 CSS px thick with 3:1 contrast is visible. (L2-126)

### Theming

- **AC-6** Given the dark theme, when rows render, then hairlines and text use dark token values. (L2-134)
- **AC-7** Given both themes, when contrast is measured, then title, meta and month meet 4.5:1. (L2-129)

### Responsive

- **AC-8** Given the home page's narrow column at 375 px, when the rows render, then the side sits beneath the main and nothing scrolls horizontally. (L2-130)
- **AC-9** Given titles 30 % longer in the pseudo-locale, when rows render at 320 px, then titles wrap without clipping. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/event-row/`: `event-list.ts` (`EventList`),
  `event-row.ts` (`EventRow`), each with `.html` and `.scss`; the list carries the container and
  hairline rules, the row the rest of the block under `:host` and `:host ::ng-deep`. Composes `Icon`.

## Decisions

- **D-1** *Element or attribute components?* Attribute components on `ul` and `li`, so the list keeps
  native list semantics.
- **D-2** *Who formats the date?* The page, as for the content card (`L2-148`); the row only lays out the
  strings it receives.
