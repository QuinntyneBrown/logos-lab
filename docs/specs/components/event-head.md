# Event head

| Field | Value |
|---|---|
| Selector | `header[llEventHead]` |
| Library path | `frontend/projects/components/src/lib/event-head/` |
| Status | built |
| Traces to | L2-052, L2-055, L2-056, L2-105, L2-120, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-147, L2-148, L2-150 |
| Design system | [`event-row.html`](../../design-system/components/event-row.html) |
| Source mocks | [`pages/event-page/default`](../../mocks/pages/event-page/default.html), [`pages/event-page/visitor`](../../mocks/pages/event-page/visitor.html), [`pages/event-page/in-person`](../../mocks/pages/event-page/in-person.html), [`pages/event-page/full`](../../mocks/pages/event-page/full.html), [`pages/event-page/closed`](../../mocks/pages/event-page/closed.html), [`pages/event-page/registered`](../../mocks/pages/event-page/registered.html), [`pages/event-page/waitlisted`](../../mocks/pages/event-page/waitlisted.html), [`pages/event-page/join-open`](../../mocks/pages/event-page/join-open.html), [`pages/event-page/live`](../../mocks/pages/event-page/live.html), [`pages/event-page/changed`](../../mocks/pages/event-page/changed.html), [`pages/event-page/cancelled`](../../mocks/pages/event-page/cancelled.html), [`pages/event-page/past`](../../mocks/pages/event-page/past.html), [`pages/event-page/loading`](../../mocks/pages/event-page/loading.html) |
| Rendering | [`event-head.html`](event-head.html) |

## Purpose and scope

The event head is the top of an event's own page (`/events/{slug}`). It shows a date block (the day
over a short month, in the accent tint), the event's title as the page's `h1`, three lines of facts
(when, in the viewer's time zone with the zone named; the format and venue; the hosts), a place for the
control that switches the times between the viewer's zone and the event's own, and the page's main
actions ("Add to calendar"). It stands for the whole page, so it also has a loading form, a
cancelled form (the title struck through) and a past form (the time says "ended").

Use the [event row](event-row.md) for an event inside a list (the home page, `/events`, "My events"),
the [page header](page-header.md) for an ordinary screen's title, and the [profile header](profile-header.md)
for a page about one person.

Out of scope:

- The venue map block (`.venue-map`), which the design-system page also documents. It sits lower on the
  page, holds the venue name, address and the "open in maps" link of `L2-052`, and is built with the
  event page's body, not here.
- Everything below the header: the description, agenda, registration panel, the "changed" and
  "cancelled" notices, the join link (`L2-058`) and the load-error state, which replaces the header with an
  [empty state](empty-state.md).
- Formatting dates and times, and choosing which zone shows: the page passes finished strings. The page also
  writes the wording that marks a state ("Was Thursday 22 October 2026, …", "… · ended").
- The time zone toggle itself, its labels, its pressed state and what pressing it does: the page projects a
  segmented button group and owns the behaviour.
- What the actions do, whether a member sees them, and which ones exist for each state: the page.
- The inert picture of the header that the `dialogs/*` mocks draw behind a dialog: it is a static
  stand-in, not this component.
- Moving focus to the `h1` after navigation: the shell's route focus (`L2-126`).

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/event-page/{default,registered,live,join-open}` | online; date "27" "Oct" | title "Live Q&A: Imago Dei and Machine Personhood"; when "Tuesday 27 October 2026, 12:00 to 1:00 pm ET"; where "Online" (monitor icon); hosts "Hosted by Dr. Abena Mensah"; time zone toggle "Your time (ET)" / "Event time (ET)"; actions: "Add to calendar" (quiet, calendar icon) | default | canvas |
| `pages/event-page/visitor` | online; viewer in Pacific time | when "Tuesday 27 October 2026, 9:00 to 10:00 am PT"; toggle "Your time (PT)" pressed, "Event time (ET)"; actions "Add to calendar" | viewer's zone differs from the event's | canvas |
| `pages/event-page/changed` | online; time changed | when "Tuesday 27 October 2026, 1:00 to 2:00 pm ET"; toggle; actions "Add to calendar" | default (the page's alert explains the change) | canvas |
| `pages/event-page/in-person` | in person; date "22" "Oct" | title "Faith and AI Evening: Is Creativity Sacred?"; when "Thursday 22 October 2026, 7:00 to 9:00 pm ET"; where "In person · St. Brigid's Hall, Ottawa" (place icon); hosts "Hosted by Logos Lab"; toggle; actions "Add to calendar" | default | canvas |
| `pages/event-page/closed` | in person; registration closed | as in-person; the actions slot is empty | no actions | canvas |
| `pages/event-page/{full,waitlisted}` | hybrid; date "7" "Nov" | title "Workshop: Writing an AI Policy for Your Church"; when "Saturday 7 November 2026, 10:00 am to 12:30 pm ET"; where "Hybrid · online and at St. Brigid's Hall, Ottawa" (place icon); hosts "Hosted by Rev. Dr. Thomas Hale"; toggle; actions "Add to calendar" | default | canvas |
| `pages/event-page/cancelled` | `cancelled`; in person | title struck through; when "Was Thursday 22 October 2026, 7:00 to 9:00 pm ET"; where "In person · St. Brigid's Hall, Ottawa"; hosts "Hosted by Logos Lab"; toggle; the actions slot is empty | cancelled | canvas |
| `pages/event-page/past` | online; date "24" "Sep" | title "Panel: Work, Rest and Automation"; when "Thursday 24 September 2026, 7:00 to 8:00 pm ET · ended"; where "Online"; hosts "Hosted by Logos Lab"; toggle; the actions slot is empty | past | canvas |
| `pages/event-page/loading` | `loading` | visually hidden status "Loading the event…"; visually hidden `h1` "Loading event"; a photo-sized skeleton and a title and two short lines | loading | canvas |
| `pages/event-page/error` | not used | the page shows an empty state in place of the header | — | canvas |
| design-system page `event-row` ("Header") | online or on site | title "Field Day" in an `h2`; when "Saturday 17 October 2026, 10:00 am – 2:00 pm"; where "Riverside Park, north lawn"; hosts "Hosted by Ruth Alvarez"; no toggle; actions: "Reserve a spot" (primary) and "Share" (quiet, upload icon) | default | canvas |

Every row is buildable with the API below: the strings come from the page, `online` picks the icon,
`cancelled` strikes the title, `loading` swaps the whole header for its skeleton form, and the two slots hold
whatever the page projects (a toggle or nothing; one action, two actions or none). The "ended" and "Was …"
wording is part of the `when` string, so past and cancelled need no input beyond `cancelled` (D-7).

## Anatomy

1. **Container** — `header.event-head`. A grid with `--space-6` between its children and `--space-12` above
   and `--space-8` below. One column below `--layout-breakpoint-md` (48rem); from 48rem two columns, the date
   block in the first and everything else in the second.
2. **Date block** — `div.event-head__date`. A tinted chip (`--color-accent-subtle`, `--radius-md`) holding
   `time[datetime]` with `span.event__day` (the day in large light numerals) over `span.event__mon` (the
   short month in the overline style, uppercase by CSS). It stays at the start of the container.
3. **Main** — `div.event__main`. A grid with `--space-2` between the title, the facts and the time zone slot.
4. **Title** — `h1.event-head__title`. The event's name, in `--text-h1`. Cancelled: its text sits inside
   `<s>`.
5. **Facts** — `p.event__meta`. Three `span` lines, each with a small decorative icon then text: when
   (`clock`), where (`place`, or `monitor` when online) and hosts (`people`).
6. **Time zone slot (optional)** — projected after the facts, a `div.btn-group.btn-group--segmented` with
   `role="group"`.
7. **Actions (optional)** — `div.event-head__actions`. A wrapping row of `--space-3` between the projected
   buttons. Not rendered when nothing is projected (D-4).
8. **Loading form** — the container with `aria-busy="true"`, a visually hidden `p.vh[role=status]`, a
   visually hidden `h1.vh`, one `span.skeleton.skeleton--photo` and one `div[aria-hidden]` with a title line and
   two short text lines.

Host: `header[llEventHead]` is the consumer's own `header` element; the component adds the class
`event-head` and `aria-busy`, and renders the parts above. The `header` sits inside the page's `main`, so it is
not the page's banner landmark.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `title` | `string` | — | yes | The `h1` text, rendered as text and never as markup (`L2-105`). While `loading`, it is the text of the visually hidden `h1` ("Loading event"). |
| `day` | `string` | `''` | unless `loading` | The day of the month, formatted by the page ("27", "7"); no leading zero. |
| `month` | `string` | `''` | unless `loading` | The short month in sentence case ("Oct", "Nov", "Sep"); the CSS uppercases it. |
| `datetime` | `string` | `''` | unless `loading` | The ISO start with its offset ("2026-10-27T12:00-04:00"), set on `time[datetime]`. |
| `when` | `string` | `''` | unless `loading` | The date and time range with the zone named, in the viewer's zone or the event's, as the page decides ("Tuesday 27 October 2026, 12:00 to 1:00 pm ET"). Any state wording ("Was …", "· ended") is part of the string. |
| `where` | `string` | `''` | unless `loading` | The format and venue as the page words it: "Online", "In person · St. Brigid's Hall, Ottawa", "Hybrid · online and at St. Brigid's Hall, Ottawa". |
| `online` | `boolean` | `false` | no | `true` shows the `monitor` icon before `where`; `false` shows `place`. Hybrid and in-person events use `place`. |
| `hosts` | `string` | `''` | unless `loading` | The hosts line with its lead-in ("Hosted by Dr. Abena Mensah"); the page builds multiple hosts with an ICU message. |
| `cancelled` | `boolean` | `false` | no | `true` wraps the title text in `<s>`. The `when` string carries the wording in words. |
| `loading` | `boolean` | `false` | no | `true` renders the loading form and sets `aria-busy="true"`; the date, facts and both slots are not rendered, and the other inputs except `title` and `loadingLabel` are ignored. |
| `loadingLabel` | `string \| null` | `null` | no | While `loading`, the text of the visually hidden `p[role=status]` ("Loading the event…"). `null` renders no status element. |

- Inputs are signal inputs; booleans accept bare attributes (`booleanAttribute`).
- There is no heading level input: the title is always an `h1` (D-3).
- There is no `past` input and no `startsAt` or `Date` input: the page decides the wording and formats every
  value, and the component holds none of it (D-7, `L2-148`).
- The consumer's own `class`, `id` and ARIA attributes stay on the host.
- Translation: every string arrives from the page already translated and formatted (`L2-147`); the component
  holds no copy. Translatable inputs are named under *Content and internationalisation*.

### Outputs

None. The header is read-only; a toggle button or action emits its own events to the page.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| `[slot=timeZone]` | one `div.btn-group.btn-group--segmented[role=group]` with two `button.btn.btn--sm[aria-pressed]` | Rendered inside `.event__main` after the facts. Nothing around it is rendered when it is empty. Not rendered while `loading`. The page keeps the group's `aria-label` ("Show times in") and the buttons' `aria-pressed`. |
| `[slot=actions]` | `a[llButton]`, `button[llButton]` | Rendered inside `div.event-head__actions`, in order. The wrapper is not rendered when nothing is projected (D-4). Not rendered while `loading`. |

Projected nodes are never re-created when other inputs change, so a focused toggle button keeps focus while
the page swaps `when` (`L2-126`).

## Variants and sizes

| Variant | Trigger | Use for |
|---|---|---|
| Default | — | A published event, upcoming or live. |
| Cancelled | `cancelled` | A cancelled event: the title is struck through and `when` reads "Was …". |
| Past | none; the page words `when` ("… · ended") | An event that has ended. |
| Loading | `loading` | While the event loads. |

| Layout | Trigger | Shape |
|---|---|---|
| Stacked | below 48rem | One column: date block, title, facts, toggle, actions. |
| Side by side | from 48rem | Two columns (`auto` and `minmax(0, 1fr)`), `--space-8` between; the date block spans the rows beside the rest. |

There is one size: the title is `--text-h1` (a fluid size, 2.5rem at the narrowest) and the day uses
`--font-size-3xl`. The width comes from the page's column.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Date block in `--color-accent-subtle`; title in `--color-fg-default`; facts in `--color-fg-muted` | `h1` is the title; icons hidden; `time` carries the start |
| Cancelled | `cancelled` | Title struck through (the `s` element's own line), colour unchanged | The title is read; the `when` string says "Was …" in words; the page's own notice says "Cancelled" |
| Past | `when` ends "· ended" | Same look as default; the wording carries it | The word "ended" is read |
| No actions | slot empty | No `.event-head__actions` element and no empty row | — |
| No toggle | slot empty | No toggle; the facts end the main column | — |
| Toggle pressed | page sets `aria-pressed` on a projected button | The pressed button sits on a raised pill in the segmented group | Announced as a pressed toggle button |
| Action hover | `:hover` on a projected action | The button's own hover | — |
| Focus | `:focus-visible` on a toggle button or action | `--color-focus-ring` outline, `--focus-ring-width` thick, `--focus-ring-offset` out | — |
| Loading | `loading` | A photo-sized skeleton in the date column and a title line and two short text lines in the main column | `aria-busy="true"`; the status is read once; skeletons hidden; a hidden `h1` stays |
| Reduced motion | `prefers-reduced-motion: reduce` | The skeletons stop shimmering | — |

## Markup

```html
<!-- rendered: default, online (pages/event-page/default) -->
<header class="event-head">
  <div class="event-head__date"><time datetime="2026-10-27T12:00-04:00"><span class="event__day">27</span><span class="event__mon">Oct</span></time></div>
  <div class="event__main">
    <h1 class="event-head__title">Live Q&amp;A: Imago Dei and Machine Personhood</h1>
    <p class="event__meta">
      <span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true">…clock…</svg>Tuesday 27 October 2026, 12:00 to 1:00 pm ET</span>
      <span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true">…monitor…</svg>Online</span>
      <span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true">…people…</svg>Hosted by Dr. Abena Mensah</span>
    </p>
    <div class="btn-group btn-group--segmented" role="group" aria-label="Show times in"><button class="btn btn--sm" type="button" aria-pressed="true">Your time (ET)</button><button class="btn btn--sm" type="button" aria-pressed="false">Event time (ET)</button></div>
  </div>
  <div class="event-head__actions"><a class="btn btn--quiet" href="…"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true">…calendar…</svg>Add to calendar</a></div>
</header>
```

The in-person and hybrid forms differ only in the second fact, which uses the `place` icon:
`In person · St. Brigid's Hall, Ottawa` and `Hybrid · online and at St. Brigid's Hall, Ottawa`.

```html
<!-- rendered: cancelled, no actions (pages/event-page/cancelled) -->
<header class="event-head">
  <div class="event-head__date"><time datetime="2026-10-22T19:00-04:00"><span class="event__day">22</span><span class="event__mon">Oct</span></time></div>
  <div class="event__main">
    <h1 class="event-head__title"><s>Faith and AI Evening: Is Creativity Sacred?</s></h1>
    <p class="event__meta">
      <span><svg class="icon icon--sm" aria-hidden="true">…clock…</svg>Was Thursday 22 October 2026, 7:00 to 9:00 pm ET</span>
      <span><svg class="icon icon--sm" aria-hidden="true">…place…</svg>In person · St. Brigid's Hall, Ottawa</span>
      <span><svg class="icon icon--sm" aria-hidden="true">…people…</svg>Hosted by Logos Lab</span>
    </p>
    <div class="btn-group btn-group--segmented" role="group" aria-label="Show times in">…</div>
  </div>
</header>
```

```html
<!-- rendered: past (pages/event-page/past); the first fact ends "· ended", with no actions -->
<span><svg class="icon icon--sm" aria-hidden="true">…clock…</svg>Thursday 24 September 2026, 7:00 to 8:00 pm ET · ended</span>
```

```html
<!-- rendered: loading (pages/event-page/loading) -->
<header class="event-head" aria-busy="true">
  <p class="vh" role="status">Loading the event…</p>
  <h1 class="vh">Loading event</h1>
  <span class="skeleton skeleton--photo" aria-hidden="true"></span>
  <div aria-hidden="true"><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text is-short"></span><span class="skeleton skeleton--text is-short"></span></div>
</header>
```

```html
<!-- consumer -->
<header llEventHead [title]="event().title" [day]="event().day" [month]="event().month"
        [datetime]="event().startsAt" [when]="when()" [where]="where()" [online]="event().online"
        [hosts]="hosts()" [cancelled]="event().cancelled">
  <div class="btn-group btn-group--segmented" slot="timeZone" role="group" aria-label="Show times in" i18n-aria-label>
    <button class="btn btn--sm" type="button" [attr.aria-pressed]="zone() === 'viewer'" (click)="zone.set('viewer')">{{ viewerLabel() }}</button>
    <button class="btn btn--sm" type="button" [attr.aria-pressed]="zone() === 'event'" (click)="zone.set('event')">{{ eventLabel() }}</button>
  </div>
  <a llButton variant="quiet" slot="actions" [routerLink]="calendarPath()"><svg llIcon name="calendar" size="sm"></svg><ng-container i18n>Add to calendar</ng-container></a>
</header>
<header llEventHead [loading]="true" title="Loading event" loadingLabel="Loading the event…" i18n-title i18n-loadingLabel></header>
```

The e2e page objects find the header by `header.event-head`, the title by `.event-head__title`, the date
by `.event-head__date`, the facts by `.event__meta`, the actions by `.event-head__actions` and the loading
form by `aria-busy="true"`; the classes, the `s` element in the cancelled title and the attributes are
part of the contract. `.event__main`, `.event__day`, `.event__mon` and `.event__meta` are shared with the
[event row](event-row.md), so the header keeps those class names.

## Design

- Container: grid, `gap: var(--space-6)`, `padding-block: var(--space-12) var(--space-8)`. From
  `--layout-breakpoint-md` (48rem, a viewport media query): `grid-template-columns: auto minmax(0, 1fr)`,
  column gap `--space-8`, `align-items: start`; every child except the date block is in column 2, and the
  date block spans the rows from the first.
- Date block: `display: inline-grid`, centred items, `--space-1` between day and month, padding
  `--space-4` by `--space-6`, `--radius-md`, `--color-accent-subtle` fill, `--color-fg-accent` text, aligned
  to the start of its column. Day `--font-weight-light` `--font-size-3xl` in `--font-family-display`, tabular
  numerals, `--letter-spacing-tight`. Month `--text-overline`, `--letter-spacing-wide`, uppercase by CSS
  (the source copy stays sentence case), inheriting the block's colour.
- Title: `--text-h1` with `--letter-spacing-tight`; wraps between words and breaks anywhere inside a word
  too long for the column (D-6). `s` keeps the browser's strike-through and the text colour.
- Facts: `--text-body-sm`, `--color-fg-muted`, `--space-1` between lines; each line is an inline flex row with
  `--space-2` between a small icon and its text, which breaks anywhere when it must (D-6).
- Main: `--space-2` between title, facts and toggle; `min-width: 0` so long text wraps instead of widening
  the column.
- Actions: flex, wrapping, `--space-3` between buttons.
- Loading: the photo skeleton is `--space-16` square with `--radius-md`; the title line is `--space-8` tall and
  55 % wide; the text lines are `--size-skeleton-line` tall, 60 % wide; all use `--color-bg-subtle`. From 48rem
  the photo skeleton sits in the date column, like the date block (D-5).
- No elevation of its own. The only motion is the skeleton's shimmer.

Component tokens: none declared. The header reads semantic tokens directly, so a surface re-skins it by the
tokens it sets, and the header needs no dark-mode rules.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Date block fill | `--color-accent-subtle` | `--palette-accent-50` | `--palette-accent-950` |
| Date block text | `--color-fg-accent` | `--palette-accent-700` | `--palette-accent-300` |
| Title | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Facts | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Skeleton | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |
| Focus ring | `--color-focus-ring` | `--palette-accent-700` | `--palette-accent-300` |
| Surface: page | `--color-bg-canvas` | `--palette-oat-100` | `--palette-night-950` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-accent` | `--color-accent-subtle` | 4.5:1 | Day and month in the date block |
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | Title |
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Facts |
| `--color-focus-ring` | `--color-bg-canvas` | 3:1 | Focus ring on the toggle and actions |

The toggle and actions colour themselves (the [button](button.md) and the segmented group). Under
`prefers-contrast: more` the tokens resolve to stronger values and the header follows without a rule of its
own.

## Responsive behaviour

- The layout follows the viewport (a media query at 48rem), not the container, because the header always
  spans the page's column. Below 48rem: one column, the date block above the title, then the facts, the
  toggle and the actions. From 48rem: the date block at the start, the rest beside it, aligned to the top.
- The title is fluid (`--text-h1`, 2.5rem at 320 px) and wraps between words; a word too wide for the
  column breaks. Facts wrap inside their line and the icon stays at the start of it.
- The toggle never exceeds the column: its buttons wrap their labels rather than overflow (`L2-150`; D-13). Actions wrap onto more rows.
- Touch targets: each toggle button and action is at least `--target-min` (24 × 24 CSS px); an action keeps its
  button's comfortable height (`--target-comfortable`, 44 px) on touch viewports (`L2-132`).
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom everything stays available; at 400 % at 1280 px
  the header reflows to the stacked layout with nothing lost (`L2-129`).

## Accessibility

### Role and pattern

A native `header` holding the page's one `h1`, a `time` for the start, and a paragraph of facts. A `header`
inside `main` has no landmark role, which is correct: the page's banner is the top bar. The strike-through is
the `s` element, "content that is no longer accurate or relevant". The toggle is the page's segmented group
of toggle buttons (`role="group"`, `aria-pressed`), not the ARIA tabs pattern.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Moves through the toggle buttons, then the actions, in visual order. The date block, title and facts take no focus. |
| <kbd>Space</kbd> / <kbd>Enter</kbd> | Presses the focused toggle button; <kbd>Enter</kbd> follows a focused link. |

### Focus

The header never takes focus and never moves it. A toggle button or action shows the shared
`--color-focus-ring` outline, `--focus-ring-width` thick and offset by `--focus-ring-offset`; the group's
padding and the container's gap leave room, so the ring is not clipped. When the page changes `when`, `day`,
`month` or `datetime` after a toggle press, the projected buttons are not re-created, so the pressed button
keeps focus.

### Labelling

- The `h1` is the event's name ("Live Q&A: Imago Dei and Machine Personhood"); the document `<title>` starts
  with the same words ("Live Q&A: Imago Dei and Machine Personhood - Logos Lab").
- The date block's `time[datetime]` carries the machine-readable start; its visible day and month are the
  page's formatted strings. The block repeats the date that the first fact gives in full, and stays exposed
  (D-10).
- Fact icons are `aria-hidden="true"`; a fact is read as its text, so "Online" and "Hosted by Dr. Abena
  Mensah" make sense without the icon.
- Cancellation is stated in words in the `when` string ("Was Thursday 22 October 2026, …") and by the page's
  own "Cancelled" notice; the strike-through is never the only signal (`L2-052`).
- The projected group is named by the page ("Show times in"), and each button's name is its visible label
  ("Your time (ET)").

### Announcements

A loading header announces its `loadingLabel` once, politely (`role="status"`); the skeletons are
`aria-hidden`. The header announces nothing else; a change of `when` after a toggle press is not announced,
because the pressed state of the button already says which zone is shown.

### Motion

The only motion is the skeleton's shimmer. Under `prefers-reduced-motion: reduce` it stops.

## Content and internationalisation

- The title is the event's name as the host wrote it: "Faith and AI Evening: Is Creativity Sacred?", never
  prefixed with "Event:". The first fact is the full date and range with the zone named, as the page
  formats it for the viewer ("Tuesday 27 October 2026, 12:00 to 1:00 pm ET"); the date block is the short
  form ("27" over "Oct").
- The format and venue read "Online", "In person · St. Brigid's Hall, Ottawa" or "Hybrid · online and at St.
  Brigid's Hall, Ottawa": the format first, then the place after a middle dot. Hosts read "Hosted by Dr.
  Abena Mensah" or "Hosted by Logos Lab".
- State wording is the page's: "Was Thursday 22 October 2026, 7:00 to 9:00 pm ET" for a cancelled event and
  "Thursday 24 September 2026, 7:00 to 8:00 pm ET · ended" for a past one.
- Dates, times and the zone abbreviation are formatted by the page with the locale's formatting
  (`L2-148`); the header renders the strings it is given and never builds one. In fr-CA the same event reads
  with the locale's day, month and hour forms.
- Hosts with a count use an ICU message with plural rules (`L2-147` AC3), never concatenation.
- French runs about 30 % longer: the title, the facts and the toggle's labels wrap; nothing is clipped
  (`L2-150`).
- Translatable inputs: `loadingLabel`, `title` while `loading` ("Loading event"), and the strings the page
  builds for `when`, `where` and `hosts`. Data values: the event's `title`, the venue name and address, the
  hosts' names, `datetime`.

## Performance

- Change detection: `OnPush`, signal inputs; no timers. The icon choice and the loading switch are
  template conditions on inputs, so toggling the zone updates only the changed text nodes.
- Perf-test scenario: this repository has no perf-test project ([button](button.md) D-3), so the header is
  measured through the page budgets of `L2-120` and `L2-123`. The measured scenario is the event page for
  "Live Q&A: Imago Dei and Machine Personhood" with its toggle and "Add to calendar".
- Composite scenarios: the event page.
- Layout stability: the loading form reserves the date column and the title and fact lines, so the page
  below it moves only by the difference between those and the loaded header, within the page's
  Cumulative Layout Shift budget (`L2-120`); the loaded header never changes height after paint except when the
  page swaps `when` for a string of a different wrap.
- Weight: it imports `Icon` and `Skeleton` from the library and nothing else; the page composes the
  buttons and the toggle.

## Acceptance criteria

### Rendering

- **AC-1** Given "Live Q&A: Imago Dei and Machine Personhood" on Tuesday 27 October 2026, 12:00 to 1:00 pm ET, online, hosted by Dr. Abena Mensah, when the header renders, then it is a `header.event-head` holding a date block "27" over "Oct" with `time[datetime="2026-10-27T12:00-04:00"]`, an `h1` with the title, and three facts in order: "Tuesday 27 October 2026, 12:00 to 1:00 pm ET", "Online" with the monitor icon, and "Hosted by Dr. Abena Mensah". (L2-052)
- **AC-2** Given "Faith and AI Evening: Is Creativity Sacred?" at St. Brigid's Hall, hosted by Logos Lab, when the header renders, then its second fact reads "In person · St. Brigid's Hall, Ottawa" with the place icon, and its third reads "Hosted by Logos Lab". (L2-052)
- **AC-3** Given "Workshop: Writing an AI Policy for Your Church" as a hybrid event, when the header renders, then its date block reads "7" over "Nov" and its second fact reads "Hybrid · online and at St. Brigid's Hall, Ottawa" with the place icon, not the monitor icon. (L2-052)
- **AC-4** Given a visitor whose browser is in Pacific time, when the Live Q&A header renders, then the first fact reads "Tuesday 27 October 2026, 9:00 to 10:00 am PT", and the projected toggle reads "Your time (PT)" pressed and "Event time (ET)" not pressed. (L2-052)
- **AC-5** Given the Live Q&A moved to 1:00 to 2:00 pm ET, when the header renders, then the first fact reads "Tuesday 27 October 2026, 1:00 to 2:00 pm ET" and the date block still reads "27" over "Oct". (L2-055)
- **AC-6** Given a page that projects "Add to calendar" into the actions slot, when the header renders, then the link is inside `div.event-head__actions`, shows the calendar icon before its label, and follows the toggle in the tab order. (L2-056)
- **AC-7** Given a title containing `<img src=x onerror="window.pwned = 1">`, when the header renders, then the `h1` shows that text literally and no script runs. (L2-105)
- **AC-8** Given the en-CA locale and an event on Saturday 7 November 2026, when the date block renders, then the page's strings "7" and "Nov" show with no leading zero and in sentence case in the DOM, and the month is drawn uppercase by CSS only. (L2-148)

### States

- **AC-9** Given the cancelled "Faith and AI Evening: Is Creativity Sacred?", when the header renders, then the `h1` holds the title inside an `s` element drawn struck through in the default text colour, the first fact reads "Was Thursday 22 October 2026, 7:00 to 9:00 pm ET", and no `.event-head__actions` element exists. (L2-052)
- **AC-10** Given the past "Panel: Work, Rest and Automation", when the header renders, then the first fact reads "Thursday 24 September 2026, 7:00 to 8:00 pm ET · ended", the date block reads "24" over "Sep", and no `.event-head__actions` element exists. (L2-052)
- **AC-11** Given the event page whose registration has closed and which projects no actions, when the header renders, then there is no `.event-head__actions` element and no empty row beneath the toggle. (L2-052)
- **AC-12** Given the header with `loading` and `loadingLabel` "Loading the event…", when it renders, then it has `aria-busy="true"`, a visually hidden `p[role=status]` reading "Loading the event…", a visually hidden `h1` reading "Loading event", a photo skeleton and a `div[aria-hidden="true"]` with one title line and two short text lines, and no date block, facts, toggle or actions. (L2-127)
- **AC-13** Given the loading header, when the event arrives and `loading` becomes `false`, then the visually hidden `h1` is replaced by the title's `h1`, so the page never holds two `h1` elements, and `aria-busy` is removed. (L2-127)
- **AC-14** Given Miriam presses "Event time (ET)" in the toggle, when the page passes the event-zone strings, then the first fact reads "Tuesday 27 October 2026, 12:00 to 1:00 pm ET", and the title and date block are unchanged apart from the page's new values. (L2-052)

### Keyboard and focus

- **AC-15** Given the Live Q&A page, when a keyboard user tabs forward from the breadcrumb, then focus reaches "Your time (ET)", then "Event time (ET)", then "Add to calendar", in visual order, and the date block, title and facts take no focus. (L2-126)
- **AC-16** Given focus on "Event time (ET)", when the user presses <kbd>Space</kbd> and the page swaps the strings, then the same button element still has focus and its `aria-pressed` is `"true"`. (L2-126)
- **AC-17** Given any focused toggle button or "Add to calendar", when it is measured, then it shows a focus ring at least 2 CSS px thick with at least 3:1 contrast against the canvas, drawn fully and not clipped by the header. (L2-126)

### Screen readers

- **AC-18** Given any non-loading header, when it is inspected, then it contains exactly one `h1`, the facts' icons are `aria-hidden="true"`, and the `time` element has a `datetime` value. (L2-127)
- **AC-19** Given the first fact, when a screen reader reads the facts, then it reads "Tuesday 27 October 2026, 12:00 to 1:00 pm ET", "Online" and "Hosted by Dr. Abena Mensah" as three separate lines. (L2-127)
- **AC-20** Given the projected toggle, when a screen reader reaches it, then it announces the group "Show times in" and each button by its visible label with its pressed state ("Your time (ET), toggle button, pressed"). (L2-127)
- **AC-21** Given the cancelled header read without sight of the strike-through, when a screen reader reads it, then the first fact says "Was Thursday 22 October 2026, 7:00 to 9:00 pm ET", so the cancellation is understood from the words. (L2-127)

### Theming

- **AC-22** Given the header in the dark theme, when it renders in its default and loading forms, then the date block fill is `--color-accent-subtle` and its text `--color-fg-accent`, the title `--color-fg-default`, the facts `--color-fg-muted` and the skeletons `--color-bg-subtle`, each resolving to its dark value on `--color-bg-canvas`, and no part keeps a light-only colour. (L2-134)
- **AC-23** Given both themes, when contrast is measured, then the day and month meet 4.5:1 on the date block fill, the title and the facts meet 4.5:1 on the canvas, and the focus ring meets 3:1. (L2-129)

### Responsive

- **AC-24** Given the default header at 320 px, when it renders, then the date block sits above the title with the toggle and "Add to calendar" below the facts, the title wraps between words, and the page does not scroll horizontally or clip anything. (L2-130)
- **AC-25** Given the default header at 1280 px, when it renders, then the date block is in the first column beside the title, facts, toggle and actions, which share the second column, and the title's top aligns with the date block's top. (L2-130)
- **AC-26** Given viewports of 767 px and 768 px, when the header renders, then it is stacked at 767 px and side by side at 768 px. (L2-130)
- **AC-27** Given a touch viewport of 375 px, when "Add to calendar" is measured, then it is at least 44 CSS px tall, and each toggle button is at least 24 × 24 CSS px. (L2-132)
- **AC-28** Given the browser zoomed to 400 % at a width of 1280 px, when the header is viewed, then it reflows to the stacked layout with no horizontal scrolling and no loss of content or function. (L2-129)
- **AC-29** Given the pseudo-locale with strings 30 % longer, when the header for "Workshop: Writing an AI Policy for Your Church" renders at 320 px, then the title, the three facts and both toggle labels wrap without clipping or overlap. (L2-150)

### Internationalisation

- **AC-30** Given the Live Q&A in en-CA and then in fr-CA, when the header renders, then the first fact and the date block change to the locale's day, month, time and zone forms with no code change, because the page formats each string and the header renders what it is given. (L2-148)
- **AC-31** Given the pseudo-locale build, when the loading header renders, then the status text and the hidden `h1` are pseudo-localized, which shows the header holds no hard-coded copy. (L2-147)

### Motion

- **AC-32** Given a user with reduced motion, when the loading header renders, then its skeletons do not shimmer. (L2-129)

### Performance

- **AC-33** Given the event page on a mobile profile, when it loads from its skeleton, then the header's swap from the loading form to the loaded form adds no layout shift beyond the page's Cumulative Layout Shift of 0.1. (L2-120)

## Implementation notes

- Planned. Folder `frontend/projects/components/src/lib/event-head/`, one type per file: `event-head.ts`
  (`EventHead`, selector `header[llEventHead]`), `event-head.html`, `event-head.scss`, and `index.ts`
  re-exporting `EventHead`, which is exported from the library's `public-api.ts`.
- `EventHead` is standalone and `OnPush`. Host bindings: `class.event-head` (always) and `attr.aria-busy`
  (`"true"` or nothing) from `loading`; host classes are bindings, so the consumer's own `class` is kept.
  The template has an `@if (loading())` branch for the loading form and an `@else` branch for the head; each
  slot is declared once with `ng-content` and its selector (`[slot=timeZone]`, `[slot=actions]`), the
  actions wrapper wrapped in a condition that checks for projected content (as the profile header does
  with `:empty`, D-4).
- Compose `svg[llIcon]` (`clock`, `place`, `monitor`, `people`) and `span[llSkeleton]` (`photo`, `title`,
  `text-short`). The projected buttons are `a[llButton]` and `button[llButton]`; the segmented group is the
  page's markup (the `button-group` design-system page has no CRD).
- Styles: the `event-head` block of `components.css` (`.event-head`, `__date`, `__title`, `__actions`) and the
  `.event__main`, `.event__day`, `.event__mon` and `.event__meta` rules the header shares with the row, copied
  into `event-head.scss` and scoped by the component's own encapsulation; do not edit the row's styles. Add
  the three rules the design-system CSS lacks (D-5, D-6, D-13): from 48rem `.skeleton--photo` takes the date
  block's column and rows, `overflow-wrap: anywhere` on the title and the facts' text, and `white-space: normal`
  on the buttons of a projected segmented group.
- Design-system catch-up: the `event-row` page's *Header* example uses an `h2` for the title (the page was
  written without a page `h1`), and its responsive paragraph says the head "stacks the date chip above the
  title at every width", while `components.css` and every mock lay it out in two columns from 48rem. The page
  follows the CSS and this CRD. The page lists only two sources; the thirteen `event-page` states are the same
  component. An `event-head` page of its own would document the toggle slot and the loading form.
- The mocks `closed`, `cancelled` and `past` draw an empty `div.event-head__actions`; they catch up with the
  CRD (D-4). The mock loading markup puts the photo skeleton and the skeleton lines directly in the
  container; the component keeps that shape.
- The page that consumes it is the event page (`/events/{slug}`), not yet built in
  `frontend/projects/logos-lab/src/app/pages/`.

## Decisions

- **D-1** *Attribute or element component?* An attribute component on the consumer's `header`, like the
  event list and row, so the page keeps native `header` semantics and its own `class`, `id` and ARIA
  attributes. The template renders every part, which leaves the two projected regions as the only slots.
- **D-2** *Is it a variant of the event row?* No. The row is a list item whose title is a link, with a side
  column and container-driven layout; the head is a page header whose title is the `h1`, with a tinted date
  block, a toggle and actions, and a viewport-driven layout. They share only the `.event__*` class names for
  the day, month, main and facts. The row's CRD says the same in its scope.
- **D-3** *Can the title level change?* No. The title is always the page's `h1` (`L2-127`: one `h1`). Every
  mock uses an `h1`; the design-system demo's `h2` is that page's own context. Hence no `headingLevel` input,
  unlike the row.
- **D-4** *What if there are no actions?* The wrapper is not rendered. The closed, cancelled and past mocks
  draw an empty `div.event-head__actions`, which is an empty grid row that adds a `--space-6` gap under the
  header. The profile header hides its empty actions the same way. The mocks and the design-system page catch
  up.
- **D-5** *Where does the loading skeleton sit from 48rem?* In the date column, as the date block does. The
  mock's skeleton photo is the container's first child, which the design-system rule
  (`.event-head > :not(.event-head__date)` into column 2) sends to column 2 above the lines, so the
  loading form would stack where the loaded form does not. The component places the photo skeleton in column
  1, which keeps the title lines in the column where the title will appear.
- **D-6** *What if a word is wider than the column?* The title and the facts break anywhere inside it
  (`overflow-wrap: anywhere`), as the description list does (its D-7). Titles wrap between words in the
  usual case (`text-wrap: balance` is the base rule for headings); a host's long name or a venue address
  must never widen the page at 320 px (`L2-130`).
- **D-7** *How are the cancelled and past forms driven?* `cancelled` is the only input, and it only draws the
  strike-through, which is a visual treatment of the title. "Was …" and "· ended" are words in the `when` string
  because the page already composes and translates that string (`L2-147`, `L2-148`), and a `past` input would
  have nothing visual to switch: no mock changes the date block, the title or the colours for a past event.
  A cancelled event's date block is likewise unchanged.
- **D-8** *Are `where` and `hosts` optional?* No. Every published event has a format and at least one host
  (`L2-052`), and every mock shows both. They are required unless `loading`, which keeps the API small.
  `online` is optional because it only chooses an icon.
- **D-9** *Who owns the time zone toggle?* The page. The header projects it and never reads its state: the
  toggle changes which strings the page passes, so the header needs no zone logic, no output and no event.
  The slot's content is the segmented button group from the design system's `button-group` page.
- **D-10** *Is the date block hidden from assistive technology, since the first fact repeats it?* No. No mock
  hides it, and it holds the one `time[datetime]` of the page; hiding it would remove the machine-readable
  start. It is short ("27 Oct") and precedes the `h1`, so it reads as the event's date.
- **D-11** *What does the loading form read?* The status text is `loadingLabel`, as the row list's
  `loadingLabel`, and the hidden `h1` text is `title`, so the page keeps one `h1` through loading and loaded
  states, and both strings are translatable inputs. While loading the page projects nothing.
- **D-12** *Where is the render-performance budget measured?* This repository has no perf-test project, as
  [button](button.md) D-3; the budgets of `L2-120` and `L2-123` measured on the whole event page cover the
  header.
- **D-13** *Can the toggle's labels wrap?* Yes. `.btn` is `white-space: nowrap`, so two labels 30 % longer ("Yóóúúr tíííme (ET)" and "Évéént tíííme (ET)") make the segmented group wider than the 288 px column at 320 px. The header sets `white-space: normal` on the buttons of the group projected into `[slot=timeZone]`, so each button shrinks and wraps its label inside the pill, as `L2-150` AC2 asks of buttons.
