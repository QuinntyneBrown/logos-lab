# RSVP panel

| Field | Value |
|---|---|
| Selector | `aside[llRsvpPanel]` |
| Library path | `frontend/projects/components/src/lib/rsvp-panel/` |
| Status | planned |
| Traces to | L2-052, L2-053, L2-054, L2-055, L2-058, L2-120, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-147, L2-150 |
| Design system | [`rsvp-panel.html`](../../design-system/components/rsvp-panel.html) |
| Source mocks | [`pages/event-page/default`](../../mocks/pages/event-page/default.html), [`pages/event-page/visitor`](../../mocks/pages/event-page/visitor.html), [`pages/event-page/in-person`](../../mocks/pages/event-page/in-person.html), [`pages/event-page/full`](../../mocks/pages/event-page/full.html), [`pages/event-page/closed`](../../mocks/pages/event-page/closed.html), [`pages/event-page/registered`](../../mocks/pages/event-page/registered.html), [`pages/event-page/waitlisted`](../../mocks/pages/event-page/waitlisted.html), [`pages/event-page/join-open`](../../mocks/pages/event-page/join-open.html), [`pages/event-page/live`](../../mocks/pages/event-page/live.html), [`pages/event-page/changed`](../../mocks/pages/event-page/changed.html), [`pages/event-page/cancelled`](../../mocks/pages/event-page/cancelled.html), [`pages/event-page/past`](../../mocks/pages/event-page/past.html), [`pages/event-page/loading`](../../mocks/pages/event-page/loading.html) |
| Rendering | [`rsvp-panel.html`](rsvp-panel.html) |

## Purpose and scope

The RSVP panel is the registration panel of the event page, in the aside column beside the description. It
tells a person where they stand with this event and holds the one action that fits: "Register" while there
is room, "Join the waitlist" when the event is full, "Sign in to register" for a visitor, "Join event" once
the room is open, "Cancel registration" or "Leave the waitlist" for someone who is in, "See other events"
when registration has ended. It shows a title that names the state, one short status line, how full the
event is (the places meter and its count in words), the explanation of what happens next, and the actions.

The panel owns the frame and the order of its parts, the three looks (open, going, closed), the places
meter built on the [progress bar](progress-bar.md) and the loading skeleton. It owns no wording and no
behaviour: the page decides which state the member is in and supplies the title, the text, the status
line, the actions and the help text, so a later feature adds an action or a help line without changing
the panel. Use a [card](card.md) for any other titled block in the aside, a [panel](panel.md) for the
page's one warm invitation, and an [alert](alert.md) for the notice above the event head ("The time of
this event has changed", "Cancelled").

Out of scope:

- Which state the member is in, its wording and the copy of each action: the event page and the feature
  that owns the action (register, waitlist, cancel, join).
- What an action does: the page's button or link handles the press and any busy or failed state of its own
  ([button](button.md)).
- The dialogs the actions open (cancel registration, leave the waitlist, event full) and the notices above
  the event head.
- Where the panel sits on the page: the page's two-column layout owns the column, the order below the
  description at narrow widths and any stickiness (D-13).
- Dates, times and counts: the page formats them for the locale and writes them into the text.
- `pages/my-events/*` does not use the panel: its rows show the member's registrations as
  [event rows](event-row.md).

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/event-page/default` | default variant, h2 "Register for this Q&A", text "Free for members. We'll email you a calendar file and remind you a day and an hour before.", places 311 of 500 | default slot: primary block "Register"; help slot: "The join link is shown only to registered members, from 15 minutes before the start." | default | canvas, aside column |
| `pages/event-page/in-person` | default variant, h2 "Register for the evening", text "Free. Coffee and dessert are on us; tell us about allergies when you register.", places 87 of 120 | primary block "Register" | default | canvas, aside column |
| `pages/event-page/visitor` | default variant, h2 "Sign in to register", text "Registration is free with a Logos Lab account. After you sign in, we bring you back here to finish.", places 312 of 500 | primary block "Sign in to register" link; text block "Create an account" link | default | canvas, aside column |
| `pages/event-page/full` | default variant, h2 "This workshop is full", status warning "2 people on the waitlist", places 40 of 40, note "If someone cancels more than 2 hours before the start, the first person waiting gets the place automatically and an email. Closer to the start, they get 30 minutes to accept." | primary block "Join the waitlist" | full | canvas, aside column |
| `pages/event-page/waitlisted` | default variant, h2 "You're on the waitlist", status warning "You're number 3 of 3", places 40 of 40, note about automatic registration and the 30 minutes to accept | text block "Leave the waitlist" | waitlisted | canvas, aside column |
| `pages/event-page/registered` | going variant, h2 "You're registered", status success with `role="status"` "Registered. We sent a calendar file to miriam.clarke@example.ca.", places 312 of 500 | quiet block "Join event" disabled and described by its help, help inside the actions "The join link appears here from 11:45 am ET on Tue 27 Oct, 15 minutes before the start.", text block "Cancel registration" | registered, join not yet open | canvas, aside column |
| `pages/event-page/changed` | going variant, as registered, with the join time moved to 12:45 pm ET | the same slots as registered | registered after a change of time | canvas, aside column |
| `pages/event-page/join-open` | going variant, h2 "You're registered", status success "Registered · starts in 12 minutes" (no live role), places text "312 registered, including you" | primary block "Join event" with the hidden suffix " (opens in a new tab)", help inside the actions "Opens the online room in a new tab. Please don't share the link.", text block "Cancel registration" | join open | canvas, aside column |
| `pages/event-page/live` | going variant, h2 "Happening now", a success badge "Happening now", status success "Registered", places text "312 registered, including you · 286 in the room" | primary block "Join event", help inside the actions "Started at 12:00 pm ET. Ends at 1:00 pm ET."; no cancel | live | canvas, aside column |
| `pages/event-page/closed` | closed variant, h2 "Registration has closed", text with the cut-off and "116 people are coming", no meter | quiet block "See other events" | closed | canvas, aside column |
| `pages/event-page/cancelled` | closed variant, h2 "Registration is unavailable", text "This event was cancelled on Tue 13 Oct 2026. If you were registered, there is nothing more to do.", no meter | no actions | cancelled | canvas, aside column |
| `pages/event-page/past` | closed variant, h2 "This event has ended", text "The panel took place on Thu 24 Sep 2026. Registrants were emailed when the recording was ready.", no meter | quiet block "See upcoming events" | past | canvas, aside column |
| `pages/event-page/loading` | `loading`, the page's own status "Loading the event…" outside the panel | skeleton title, text and pill | loading | canvas, aside column |
| design-system page: a failed action | default variant, status danger with `role="alert"`, meter, primary "Try again" | status slot, default slot | error | canvas, aside column |

`pages/event-page/error` shows the page-level "We couldn't load this event" and has no panel. Every row
above is built with the same API: the variant, the heading, two optional texts, optional places, and three
slots (D-3).

## Anatomy

1. **Panel** — `.rsvp`, the host `aside`. A one-column grid with `--space-4` between its parts, padded by
   `--space-6`, `--radius-lg`, `--color-bg-surface`, hairline `--color-border-default`. `.rsvp--going`
   washes it in `--color-accent-subtle` with a `--color-accent` edge; `.rsvp--closed` fills it with
   `--color-bg-subtle`.
2. **Title** — `h2.rsvp__title` (or `h3`), `--text-h4`. It names the state and is the panel's accessible
   name.
3. **Status (optional)** — the page's projected inline message ([inline message](inline-message.md)),
   and in the live state a badge in a paragraph before it. Direct children of the panel, between the
   title and the text.
4. **Text (optional)** — `p.rsvp__text`, `--color-fg-muted`: the terms, from the `text` input, before the
   meter.
5. **Places meter (optional)** — `div.rsvp__meter`, a grid with `--space-2` between a
   [progress bar](progress-bar.md) (`div.progress`, "Places taken") and a `p` that says the count in
   words, `--text-body-sm` in `--color-fg-muted`.
6. **Note (optional)** — `p.rsvp__text` after the meter, from the `note` input: what happens next (the
   waitlist rule).
7. **Actions** — `div.rsvp__actions`, a grid with `--space-2` between the projected controls and any help
   line that belongs to one of them. Not shown when nothing is projected.
8. **Help (optional)** — the page's projected `p.field__help` after the actions: a line about the panel as
   a whole.
9. **Skeleton (loading only)** — `span.skeleton.skeleton--title`, `span.skeleton.skeleton--text` and
   `span.skeleton.skeleton--pill` in place of parts 2 to 8.

Host: `aside[llRsvpPanel]` is the consumer's own `aside` and keeps its tag, so the complementary landmark
stays on the page (D-1). The component adds `.rsvp`, the variant modifier, `aria-labelledby` (or, while
loading, `aria-busy` and `aria-hidden`) and renders parts 2 to 9 inside it; it adds no wrapper.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `variant` | `'default' \| 'going' \| 'closed'` | `'default'` | no | `going` adds `.rsvp--going`, `closed` adds `.rsvp--closed`; `default` adds no modifier. The page maps its state to a variant (D-2). |
| `heading` | `string` | — | yes | The title's text. It changes with the state so the panel's name always says where the person stands. Ignored while `loading`. |
| `headingLevel` | `2 \| 3` | `2` | no | The title's element: `h2` or `h3` (D-11). |
| `headingId` | `string \| null` | `null` | no | The title's `id`. `null` generates a unique `ll-rsvp-title-{n}`. The host's `aria-labelledby` points at it. |
| `text` | `string \| null` | `null` | no | Renders `p.rsvp__text` before the meter. `null` renders nothing (D-4). |
| `note` | `string \| null` | `null` | no | Renders `p.rsvp__text` after the meter. `null` renders nothing. |
| `places` | `RsvpPlaces \| null` | `null` | no | The places meter. `null` renders no meter: a closed, cancelled or ended event, and an event with no capacity (D-5, D-7). |
| `loading` | `boolean` | `false` | no | Renders the skeleton in place of the content and writes `aria-busy="true"` and `aria-hidden="true"` on the host (D-10). |

`RsvpPlaces` is one type in its own file, `rsvp-places.ts`:

| Field | Type | Rule |
|---|---|---|
| `taken` | `number` | The places taken, including the member when they are registered. A whole number of 0 or more. |
| `capacity` | `number` | The event's capacity, a whole number of 1 or more. |
| `label` | `string` | The progress bar's accessible name: "Places taken". |
| `text` | `string` | The count in words, already translated and formatted by the page: "311 registered · 189 places left", "40 registered · no places left", "312 registered, including you · 188 places left", "312 registered, including you · 286 in the room". |

- Inputs are signal inputs. `loading` accepts a bare attribute (`booleanAttribute`).
- The meter's fill is `floor(min(taken, capacity) / capacity × 100)` as a percentage handed to the
  progress bar, so it reads 100 only when the event is full (D-5).
- Translation: the component holds no copy of its own. The heading, `text`, `note`, `places.label`,
  `places.text` and everything projected arrive translated (L2-147).

### Outputs

None. Pressing an action is the page's control's own event; the panel is read-only.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| `[slot=status]` | `p[llInlineStatus]` or `span[llInlineStatus]`, and in the live state a `p` holding a badge, in the order they read | Rendered between the title and the text. The inline message carries its own tone, icon and live role (D-8). Zero, one or two children. |
| default | `a[llButton]` and `button[llButton]` with `block`, in the order they read, and `p.field__help` lines that describe the control above them | Rendered inside `div.rsvp__actions`. One `primary` action at most; a leaving action is `text`; an alternative is `quiet` (D-15). A help line that a button names with `aria-describedby` goes here, right after that button. |
| `[slot=help]` | `p.field__help` | Rendered after the actions as a direct child of the panel: a help line about the panel as a whole (D-12). |

Each slot is declared once. While `loading`, the content slots are not attached and nothing projected
shows.

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Default | `.rsvp` | A member or visitor who can still act: register, join the waitlist, sign in, leave the waitlist, and the full event. |
| Going | `.rsvp--going` | A registered member: "You're registered", the join states and "Happening now". The surface is washed in `--color-accent-subtle` with a `--color-accent` edge. |
| Closed | `.rsvp--closed` | Registration is over for this person: closed, cancelled and ended. The surface is `--color-bg-subtle`. |

| State of the event for this person | Variant |
|---|---|
| Open, full, visitor, waitlisted | Default |
| Registered (before the join window, join open, live, after a change of time) | Going |
| Closed, cancelled, ended | Closed |

One size. The panel takes the width of its column: `--layout-aside-width` from the page's two-column
breakpoint (64 rem) and the full width of the page below it. It has no width of its own and no size input.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Open | default variant, `text`, `places`, a primary action | Surface, hairline, title, terms, meter and count, one primary block button | Complementary landmark named by the title; meter is a progress bar named "Places taken" |
| Visitor | default variant, primary "Sign in to register" and a text "Create an account" | As open | As open |
| Full | default variant, a warning status, `places` at 100 %, `note` | Warning status line with its icon, a full meter, the waitlist rule, "Join the waitlist" | The status is text with an icon, never colour alone |
| Waitlisted | default variant, a warning status "You're number 3 of 3", a full meter, `note` | As full with a text "Leave the waitlist" | As full |
| Registered | going variant, a success status | Washed surface with an accent edge; "Join event" quiet and disabled with its help; "Cancel registration" | The status line is a polite live region only in the registered and changed mocks (D-8); the disabled button is described by its help |
| Join open | going variant, primary "Join event" | As registered with an enabled primary action and "Registered · starts in 12 minutes" | The button's name ends "(opens in a new tab)" in visually hidden text |
| Live | going variant, title "Happening now", a success badge | As join open without the cancel action | The badge text is not repeated by colour |
| Changed | going variant, join time moved | As registered with the new time in the help | As registered |
| Closed | closed variant, `text`, no `places` | Linen surface, a plain explanation, "See other events" | As open |
| Cancelled | closed variant, `text`, nothing projected | Linen surface, title and one paragraph; the actions grid is hidden | No control in the panel |
| Past | closed variant, `text`, "See upcoming events" | As closed | As open |
| Error | a danger inline message in `[slot=status]`, "Try again" in the default slot | The panel as it was, with the danger line in place of the status or text | `role="alert"` announces the failure; focus stays on the control that was pressed |
| Loading | `loading` | Skeleton title, text and pill on the panel surface | The panel is `aria-hidden` and `aria-busy`; the page announces "Loading the event…" once |
| Focus | `:focus-visible` on a projected control | The control's own ring, never clipped by the panel | Owned by the control |
| Hover, active | — | None on the panel; the controls have their own | — |

## Markup

```html
<!-- rendered: default (open): title, text, meter, one action, help after the actions -->
<aside class="rsvp" aria-labelledby="rsvp-title">
  <h2 class="rsvp__title" id="rsvp-title">Register for this Q&amp;A</h2>
  <p class="rsvp__text">Free for members. We'll email you a calendar file and remind you a day and an hour before.</p>
  <div class="rsvp__meter">
    <div class="progress" role="progressbar" aria-label="Places taken" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 62%"><div class="progress__bar"></div></div>
    <p>311 registered · 189 places left</p>
  </div>
  <div class="rsvp__actions"><button class="btn btn--primary btn--block" type="button">Register</button></div>
  <p class="field__help">The join link is shown only to registered members, from 15 minutes before the start.</p>
</aside>
```

```html
<!-- rendered: full (default variant): status, meter at 100 %, note, one action. Waitlisted is the same with "You're on the waitlist", "You're number 3 of 3" and a text action -->
<aside class="rsvp" aria-labelledby="rsvp-title">
  <h2 class="rsvp__title" id="rsvp-title">This workshop is full</h2>
  <span class="inline-status inline-status--warning"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 21 19.5H3z"/><path d="M12 10v4.5M12 17.2v.3"/></svg>2 people on the waitlist</span>
  <div class="rsvp__meter">
    <div class="progress" role="progressbar" aria-label="Places taken" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 100%"><div class="progress__bar"></div></div>
    <p>40 registered · no places left</p>
  </div>
  <p class="rsvp__text">If someone cancels more than 2 hours before the start, the first person waiting gets the place automatically and an email. Closer to the start, they get 30 minutes to accept.</p>
  <div class="rsvp__actions"><button class="btn btn--primary btn--block" type="button">Join the waitlist</button></div>
</aside>
```

```html
<!-- rendered: going, registered before the join window: live status, a disabled button described by help inside the actions -->
<aside class="rsvp rsvp--going" aria-labelledby="rsvp-title">
  <h2 class="rsvp__title" id="rsvp-title">You're registered</h2>
  <span class="inline-status inline-status--success" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Registered. We sent a calendar file to miriam.clarke@example.ca.</span>
  <div class="rsvp__meter">
    <div class="progress" role="progressbar" aria-label="Places taken" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 62%"><div class="progress__bar"></div></div>
    <p>312 registered, including you · 188 places left</p>
  </div>
  <div class="rsvp__actions">
    <button class="btn btn--quiet btn--block" type="button" disabled aria-describedby="join-help">Join event</button>
    <p class="field__help" id="join-help">The join link appears here from 11:45 am ET on Tue 27 Oct, 15 minutes before the start.</p>
    <button class="btn btn--text btn--block" type="button">Cancel registration</button>
  </div>
</aside>
```

```html
<!-- rendered: going, live: a badge paragraph then the status, both in the status slot; no cancel -->
<aside class="rsvp rsvp--going" aria-labelledby="rsvp-title">
  <h2 class="rsvp__title" id="rsvp-title">Happening now</h2>
  <p><span class="badge badge--success">Happening now</span></p>
  <span class="inline-status inline-status--success"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Registered</span>
  <div class="rsvp__meter">
    <div class="progress" role="progressbar" aria-label="Places taken" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 62%"><div class="progress__bar"></div></div>
    <p>312 registered, including you · 286 in the room</p>
  </div>
  <div class="rsvp__actions">
    <button class="btn btn--primary btn--block" type="button">Join event<span class="vh"> (opens in a new tab)</span></button>
    <p class="field__help">Started at 12:00 pm ET. Ends at 1:00 pm ET.</p>
  </div>
</aside>
```

```html
<!-- rendered: closed variant, no meter. Past is the same with its own copy; cancelled is the same with no actions element shown -->
<aside class="rsvp rsvp--closed" aria-labelledby="rsvp-title">
  <h2 class="rsvp__title" id="rsvp-title">Registration has closed</h2>
  <p class="rsvp__text">Registration closed at 12:00 pm ET on Wed 21 Oct, the cut-off the hosts set so St. Brigid's Hall can plan seating. 116 people are coming.</p>
  <div class="rsvp__actions"><a class="btn btn--quiet btn--block" href="/events">See other events</a></div>
</aside>
```

```html
<!-- rendered: a failed action (design-system page): a danger message in place of the status, the action becomes "Try again" -->
<aside class="rsvp" aria-labelledby="rsvp-title">
  <h2 class="rsvp__title" id="rsvp-title">Register for this Q&amp;A</h2>
  <p class="inline-status inline-status--danger" role="alert"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>We couldn't save your place. Check your connection and try again.</p>
  <div class="rsvp__meter">
    <div class="progress" role="progressbar" aria-label="Places taken" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" style="--ll-progress-value: 62%"><div class="progress__bar"></div></div>
    <p>311 registered · 189 places left</p>
  </div>
  <div class="rsvp__actions"><button class="btn btn--primary btn--block" type="button">Try again</button></div>
</aside>
```

```html
<!-- rendered: loading -->
<aside class="rsvp" aria-busy="true" aria-hidden="true">
  <span class="skeleton skeleton--title"></span>
  <span class="skeleton skeleton--text"></span>
  <span class="skeleton skeleton--pill"></span>
</aside>
```

```html
<!-- consumer: default (open), signed-in member -->
<aside llRsvpPanel i18n-heading heading="Register for this Q&A" headingId="rsvp-title" i18n-text text="Free for members. We'll email you a calendar file and remind you a day and an hour before." [places]="places()">
  <button llButton variant="primary" block type="button" [busy]="registering()" (click)="register()" i18n>Register</button>
  <p slot="help" class="field__help" i18n>The join link is shown only to registered members, from 15 minutes before the start.</p>
</aside>
```

```html
<!-- consumer: registered before the join window -->
<aside llRsvpPanel variant="going" i18n-heading heading="You're registered" headingId="rsvp-title" [places]="places()">
  <span slot="status" llInlineStatus tone="success" live="polite" i18n>Registered. We sent a calendar file to {{ email() }}.</span>
  <button llButton variant="quiet" block type="button" disabled aria-describedby="join-help" i18n>Join event</button>
  <p class="field__help" id="join-help" i18n>The join link appears here from {{ opensAt() }}, 15 minutes before the start.</p>
  <a llButton variant="text" block [routerLink]="[]" (click)="openCancelDialog()" i18n>Cancel registration</a>
</aside>
```

```html
<!-- consumer: loading -->
<p class="vh" role="status" i18n>Loading the event…</p>
<aside llRsvpPanel loading></aside>
```

The e2e page objects locate the panel by `.rsvp`, its title by `.rsvp__title` and the meter by `.rsvp__meter`,
so these classes and the order of the parts are part of the contract. The `svg` icons and the inline
status markup come from the [inline message](inline-message.md); the meter's inner markup comes from the
progress bar.

## Design

- Padding `--space-6`; corner `--radius-lg`; hairline `--border-width-hairline` in
  `--color-border-default`; fill `--color-bg-surface`; no shadow, no outer margin (the page spaces it).
- A one-column grid `minmax(0, 1fr)` with `--space-4` between parts, so a long word or an email address
  shrinks inside the panel instead of widening it. Title, text, note, count and help wrap anywhere a
  long word needs it (`overflow-wrap: break-word`, D-17).
- Title `--text-h4`. Text and note `--color-fg-muted` in the body style. Count under the meter
  `--text-body-sm`, `--color-fg-muted`, `--space-2` below the bar.
- Actions: a grid with `--space-2` between controls, each control full width (`.btn--block`). The grid
  is not displayed when it is empty (`:empty`, D-18). A help line inside the actions sits `--space-2`
  from its button.
- Going: edge `--color-accent`, fill `--color-accent-subtle`. Closed: fill `--color-bg-subtle`.
- The meter's track and fill, and the skeleton's pulse, come from the progress bar and the
  [skeleton](skeleton.md); the panel adds none.
- No overflow clipping, no transform, no transition, no position: projected focus rings draw in full
  and the page owns placement (D-13).
- Forced colours and increased contrast come from the tokens: `--color-border-default` resolves to the
  system text colour in forced colours and to `--color-border-strong` under `prefers-contrast: more`.
  The going and closed fills are decoration; the state is also the title and the status text.

Component tokens: none. The panel reads semantic tokens directly.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Surface | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |
| Hairline | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Title | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Text, note, count, help | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Going fill | `--color-accent-subtle` | `--palette-accent-50` | `--palette-accent-950` |
| Going edge | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Closed fill | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |
| Meter track | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Meter fill | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Success status | `--color-success-fg` | `--palette-sage-700` | `--palette-sage-200` |
| Warning status | `--color-warning-fg` | `--palette-clay-700` | `--palette-clay-300` |
| Danger status | `--color-danger-fg` | `--palette-lingon-700` | `--palette-lingon-300` |
| Skeleton | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Title on the open panel |
| `--color-fg-muted` | `--color-bg-surface` | 4.5:1 | Text, note, count and help on the open panel |
| `--color-fg-default` | `--color-accent-subtle` | 4.5:1 | Title on the going panel |
| `--color-fg-muted` | `--color-accent-subtle` | 4.5:1 | Count and help on the going panel |
| `--color-success-fg` | `--color-accent-subtle` | 4.5:1 | "Registered" status on the going panel |
| `--color-fg-muted` | `--color-bg-subtle` | 4.5:1 | Text on the closed panel |
| `--color-warning-fg` | `--color-bg-surface` | 4.5:1 | "You're number 3 of 3" |
| `--color-danger-fg` | `--color-bg-surface` | 4.5:1 | A failed-action message |
| `--color-accent` | `--color-border-default` | 3:1 | Meter fill against its track |
| `--color-accent` | `--color-accent-subtle` | 3:1 | Meter fill and edge on the going panel |

The pair `--color-fg-muted` on `--color-accent-subtle` is not in `tokens/contrast-pairs.json`; measured it
is above 7:1 in both themes, and the pair is added to the file (D-16).

## Responsive behaviour

- The panel fills its column. From the page's two-column breakpoint (64 rem) the column is
  `--layout-aside-width` and the panel sits beside the description; below it the panel is the full width
  of the page, after the main column (D-13).
- Nothing else changes with the breakpoint: padding is `--space-6` and the controls are full width at
  every width.
- At 320 px nothing scrolls horizontally or clips: the title, the cut-off text of the closed panel and an
  address such as "miriam.clarke@example.ca" in the status wrap inside the panel.
- At 400 % zoom the panel keeps one column; with WCAG text-spacing overrides nothing clips or overlaps
  because no height is fixed.
- Every action is at least 44 px high on touch viewports (`--control-height-md` on a block control;
  `--target-comfortable`), full width, with `--space-2` between controls (L2-132).

## Accessibility

### Role and pattern

An `aside` named by its title: a complementary landmark. The title is a heading (`h2`, or `h3`), so a
screen-reader user can jump to it. The meter is `role="progressbar"` from the progress bar. No custom
widget: every control is a native button or link. Follows the APG
[landmark regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) practice.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd>, <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves through the projected actions in reading order. The panel, its title and the meter are not tab stops. A disabled "Join event" is skipped. |
| <kbd>Enter</kbd>, <kbd>Space</kbd> | Activates the focused button; <kbd>Enter</kbd> follows a focused link. |

### Focus

The panel has no focus ring of its own; a projected control draws its own and the panel never clips it.
The title has `tabindex="-1"` so the panel can move focus to it (below), and shows the focus ring only
for `:focus-visible`.

When a change of state removes the control that had focus, because the person pressed it ("Register"
becomes "You're registered"), focus moves to the title so it is not lost and the new state is named.
When the state changes while focus is somewhere else (the join window opens, the member's state arrives
after the page shows), focus does not move (D-9). On an error the pressed control keeps focus.

### Labelling

`aria-labelledby` on the host points at the title's id, which is unique on the page, so the landmark is
named by what the panel says now. The meter is named "Places taken" and the count under it repeats it in
words. Status is text with an icon, never colour alone; icons are `aria-hidden`. A button whose help line
sits beside it names it with `aria-describedby`. A control whose visible label is extended for assistive
technology keeps the visible words first ("Join event (opens in a new tab)", WCAG 2.5.3). While loading
the host has no name because it is hidden.

### Announcements

The panel renders no live region of its own. The status line is the one place a change is announced, and
the page decides whether it is live (D-8):

- After the member's own action succeeds, the page marks the status `live="polite"` (`role="status"`):
  "Registered. We sent a calendar file to miriam.clarke@example.ca." The registered and changed mocks
  do this.
- A failed action is `live="assertive"` (`role="alert"`) in the same slot.
- Statuses present when the state arrives (waitlisted, full, join open, live) are not live regions.
- The count, the badge and the meter are never live; the meter's value is read when the person reaches it.
- Loading is announced once by the page's own `p.vh[role=status]` "Loading the event…", outside the panel.

### Motion

The panel has no animation. The meter's fill transition and the skeleton's pulse come from the progress
bar and the skeleton, and `prefers-reduced-motion: reduce` removes both: the fill appears at its value
and the skeleton holds still.

## Content and internationalisation

- The title says where the person stands, in sentence case, with no full stop: "Register for this Q&A",
  "You're registered", "You're on the waitlist", "This workshop is full", "Registration has closed",
  "Registration is unavailable", "This event has ended". The page owns the wording; the web build writes
  "this event" for every kind (the view-event design) and the mocks write "this Q&A" or "this workshop".
- Text and note are one or two plain sentences. Status lines are short ("You're number 3 of 3",
  "Registered · starts in 12 minutes"). The count reads "311 registered · 189 places left", "40
  registered · no places left", "312 registered, including you".
- Actions are verbs the person recognises: "Register", "Join the waitlist", "Sign in to register",
  "Join event", "Cancel registration", "Leave the waitlist", "See other events". Leaving is a text action,
  never the loudest control in the panel.
- Dates and times follow L2-148 and the cast: "Tue 27 Oct", "11:45 am ET", "12:00 pm ET". Counts use the
  locale's grouping and ICU plurals ("1 place left", "189 places left"); the page builds them.
- Translatable inputs: `heading`, `text`, `note`, `places.label`, `places.text`. Translatable slots: every
  status, action label and help line. Data values: counts, dates, names and the member's email.
- French and pseudo-locale strings run about 30 % longer: title, text, labels and help wrap onto more
  lines and the panel grows; nothing truncates.

## Performance

- Change detection: `OnPush`, signal inputs; the meter's percentage, the host classes, the title tag and
  the `aria-labelledby` value are `computed` or host bindings; no timers, no effects beyond one
  `afterNextRender` that restores focus (D-9).
- Perf-test scenario: no perf-test project exists in this repository ([button](button.md) D-3); the panel
  is measured through the page budgets of `L2-120`. The measured scenario is the event page "Live Q&A:
  Imago Dei and Machine Personhood" for Miriam Clarke, registered, with the panel in the going variant.
- Layout stability: the skeleton uses the panel's own padding, hairline, corner and grid, and a title, a
  text line and a pill, so the surface does not change size across columns when the real panel replaces
  it; the aside column's width is the page's (`L2-120`).
- Weight: imports the [progress bar](progress-bar.md) and the [skeleton](skeleton.md) directive and
  nothing else; no router, no overlay, no date or number library (the page formats).

## Acceptance criteria

### Rendering

- **AC-1** Given the event "Live Q&A: Imago Dei and Machine Personhood" with 311 of 500 places taken and Miriam Clarke a verified member who is not registered, when the panel renders with variant `default`, then it is an `aside.rsvp` named by an `h2` "Register for this Q&A", shows the text, a "Places taken" meter at 62 % with the count "311 registered · 189 places left", one full-width primary "Register" and the help line "The join link is shown only to registered members, from 15 minutes before the start." after the actions. (L2-053)
- **AC-2** Given the in-person "Faith and AI Evening: Is Creativity Sacred?" with 87 of 120 places taken, when the panel renders, then the meter is at 72 % with "87 registered · 33 places left". (L2-052)
- **AC-3** Given a visitor on the event page, when the panel renders, then the title is "Sign in to register", the primary action is the link "Sign in to register" and a text link "Create an account" follows it, with the meter at 62 % and "312 registered · 188 places left". (L2-052)
- **AC-4** Given an event with no capacity, when the panel renders with `places` set to `null`, then no `.rsvp__meter` is rendered and the title, text and actions render as before. (L2-053)

### Variants and states

- **AC-5** Given a full event with 40 of 40 places and 2 people waiting, when the panel renders, then the title is "This workshop is full", the warning status "2 people on the waitlist" comes before the meter, the meter is at 100 % with "40 registered · no places left", the waitlist rule follows the meter as the note, and the primary action is "Join the waitlist". (L2-054)
- **AC-6** Given Miriam Clarke is third of three on the waitlist, when the panel renders, then the title is "You're on the waitlist", the warning status reads "You're number 3 of 3", the meter is at 100 %, the note explains that a place more than 2 hours before the start registers her automatically and gives her 30 minutes to accept closer to it, and the only action is the text action "Leave the waitlist". (L2-054)
- **AC-7** Given Miriam Clarke has just registered for the Live Q&A, when the panel renders with variant `going`, then it has `.rsvp--going`, the title "You're registered", the success status "Registered. We sent a calendar file to miriam.clarke@example.ca." and the meter at 62 % with "312 registered, including you · 188 places left". (L2-053)
- **AC-8** Given the join link is not open yet, when the panel renders, then "Join event" is disabled, is described by the help line "The join link appears here from 11:45 am ET on Tue 27 Oct, 15 minutes before the start.", which sits directly under it inside the actions, and "Cancel registration" follows as a text action. (L2-058)
- **AC-9** Given the join window has opened 12 minutes before the start, when the panel renders, then the status reads "Registered · starts in 12 minutes", "Join event" is an enabled primary action whose name ends "(opens in a new tab)" and the help line "Opens the online room in a new tab. Please don't share the link." sits under it. (L2-058)
- **AC-10** Given the event is under way, when the panel renders, then the title is "Happening now", a success badge "Happening now" and the status "Registered" follow it, the count reads "312 registered, including you · 286 in the room", "Join event" is primary, the help line "Started at 12:00 pm ET. Ends at 1:00 pm ET." follows it and there is no "Cancel registration". (L2-058)
- **AC-11** Given the host moved the Live Q&A to 1:00 pm ET, when Miriam's panel renders, then it stays in the going variant as "You're registered" and its help line gives the new time, "The join link appears here from 12:45 pm ET on Tue 27 Oct, 15 minutes before the start." (L2-055)
- **AC-12** Given registration closed at 12:00 pm ET on Wed 21 Oct for someone who is not registered, when the panel renders with variant `closed`, then it has `.rsvp--closed`, the title "Registration has closed", the cut-off and "116 people are coming" as its text, no meter, and the quiet action "See other events". (L2-053)
- **AC-13** Given the event was cancelled on Tue 13 Oct 2026, when the panel renders with variant `closed` and nothing projected, then the title is "Registration is unavailable", the text says "If you were registered, there is nothing more to do.", there is no meter, and `.rsvp__actions` is not displayed and leaves no extra gap. (L2-052)
- **AC-14** Given the event ended on Thu 24 Sep 2026, when the panel renders with variant `closed`, then the title is "This event has ended", there is no meter and the quiet action "See upcoming events" is the only control. (L2-052)
- **AC-15** Given registering failed, when the page projects a danger inline message with `role="alert"` into `[slot=status]` and a primary "Try again", then the panel keeps its title, meter and variant, shows the message before the meter, and announces it once. (L2-127)
- **AC-16** Given a later feature projects a quiet "Add to calendar" button before "Cancel registration", when the going panel renders, then both appear inside `.rsvp__actions` in that order with `--space-2` between them and the panel's inputs and slots are unchanged. (L2-052)

### Loading

- **AC-17** Given the event is loading, when the panel renders with `loading`, then the host has `aria-busy="true"` and `aria-hidden="true"`, shows a skeleton title, a skeleton text line and a skeleton pill, renders no heading, meter or projected content, and has no accessible name. (L2-120)
- **AC-18** Given the event has loaded, when `loading` turns off, then the panel keeps the same width, padding, hairline and corner, and the content replaces the skeleton without the main column moving. (L2-120)

### Keyboard and focus

- **AC-19** Given the registered panel before the join window, when a keyboard user presses Tab from the last link of the main column, then focus lands on "Cancel registration" (the disabled "Join event" is skipped) and Enter opens its dialog. (L2-126)
- **AC-20** Given focus is on "Register", when the press succeeds and the panel becomes "You're registered", then focus moves to the title (`tabindex="-1"`) and the title's name is announced. (L2-126)
- **AC-21** Given focus is in the page's breadcrumb, when the join window opens and the panel changes from a disabled to an enabled "Join event", then focus stays where it was and nothing is announced except a status the page marked live. (L2-127)
- **AC-22** Given focus is on "Join the waitlist" with a keyboard, when it is drawn, then the ring is at least 2 px thick with at least 3:1 contrast, and the panel's edge does not clip it. (L2-126)

### Screen readers

- **AC-23** Given the open panel, when it is inspected, then it is a complementary landmark named "Register for this Q&A" by its `h2`, and after the state changes the name is the new title. (L2-127)
- **AC-24** Given the meter at 62 %, when it is inspected, then it is a progress bar named "Places taken" with `aria-valuenow="62"`, `aria-valuemin="0"` and `aria-valuemax="100"`, and the paragraph below it gives the count in words. (L2-127)
- **AC-25** Given the registered panel right after Register was pressed, when it renders, then the status line has `role="status"` and the panel's other parts carry no live role; given the waitlisted, full, join-open and live panels, then no part is a live region. (L2-127)

### Theming

- **AC-26** Given the dark theme, when the open, going and closed panels render, then every fill, edge, text and status colour comes from a token with a dark value and no part keeps a light-only colour. (L2-134)
- **AC-27** Given both themes, when contrast is measured, then title and text on the surface, the going fill and the closed fill meet 4.5:1, the success, warning and danger status text meets 4.5:1 on its surface, and the meter fill meets 3:1 against its track. (L2-129)

### Responsive

- **AC-28** Given a 320 px wide viewport, when the closed panel with the cut-off text and the registered panel with the email address render, then nothing scrolls horizontally and no text is cut off. (L2-130)
- **AC-29** Given an XS touch viewport, when the open panel is measured, then every action spans the panel's width and is at least 44 px high. (L2-132)
- **AC-30** Given 400 % zoom at 1280 px or WCAG text-spacing overrides, when the full panel renders, then it keeps one column and nothing is clipped or overlaps. (L2-129)

### Content and internationalisation

- **AC-31** Given the pseudo-locale build, when the panel renders in each state, then the title, text, note, meter label and count, statuses, actions and help are all pseudo-localised, so the panel holds no hard-coded string. (L2-147)
- **AC-32** Given strings 30 % longer, when the full and registered panels render at XS and XL, then labels, text and help wrap and the panel grows without clipping or truncation. (L2-150)

### Motion

- **AC-33** Given reduced motion is on, when the meter updates and the loading skeleton shows, then the fill has no transition and the skeleton does not pulse. (L2-129)

## Implementation notes

- Folder `frontend/projects/components/src/lib/rsvp-panel/`: `rsvp-panel.ts` (`RsvpPanel`), `rsvp-panel.html`,
  `rsvp-panel.scss`, `rsvp-panel-variant.ts` (`RsvpPanelVariant`), `rsvp-panel-heading-level.ts`
  (`RsvpPanelHeadingLevel`), `rsvp-places.ts` (`RsvpPlaces`), one type per file. Export through the
  library's public API.
- Selector `aside[llRsvpPanel]`. Host bindings: `class.rsvp`, `class.rsvp--going`, `class.rsvp--closed`,
  `attr.aria-labelledby` (the title's id, absent while loading), `attr.aria-busy` and `attr.aria-hidden`
  (`"true"` while loading, absent otherwise). A shared counter in `rsvp-panel.ts` produces
  `ll-rsvp-title-{n}`.
- Template: an `@if (loading())` block with the three skeletons (`span[llSkeleton]` with shapes `title`,
  `text` and `pill`), an `@else` block with the title (`h2` or `h3` from one `ng-template`), the
  `[slot=status]` projection, the `text` paragraph, the meter, the `note` paragraph, `div.rsvp__actions`
  holding the default `<ng-content />`, and the `[slot=help]` projection. Composes `ll-progress-bar`
  (`[value]` from `places`, `[label]` from `places.label`) inside `div.rsvp__meter`, then
  `<p>{{ places.text }}</p>`.
- Focus recovery: remember the focused element on `focusin`; after a render that changes `heading`, if
  the remembered element is no longer connected and `document.activeElement` is the body, focus the
  title. Never move focus otherwise (D-9).
- Styles: `rsvp-panel.scss` holds the `.rsvp`, `.rsvp__title`, `.rsvp__meter`, `.rsvp__text`,
  `.rsvp__actions`, `.rsvp--going` and `.rsvp--closed` rules (with `:host ::ng-deep` for the projected
  parts), the `minmax(0, 1fr)` column, the word wrap (D-17) and `.rsvp__actions:empty { display: none }`
  (D-18).
- Design-system follow-ups (the CRD leads): update `components/rsvp-panel.html` from the Banaro sample to
  the Logos Lab cast and states (D-14), draw the title as the mocks do (`h2`, `aria-label` "Places
  taken"), add the closed text and status line markup, add the word-wrap and shrinkable column to
  `components.css`, drop its sticky and "before the description" prose (D-13) and add the contrast pair
  `--color-fg-muted` on `--color-accent-subtle` to `tokens/contrast-pairs.json` (D-16).
- Page change: the mocks write the meter as `aria-valuenow="311" aria-valuemax="500"`; the panel
  writes the percentage (D-5). The page object reads the count paragraph, not the numbers.
- Detailed designs `view-event`, `register-for-event` and `join-online-event` call the component
  `ll-rsvp-panel`; they should read `aside[llRsvpPanel]` (D-1).

## Decisions

- **D-1** *One component or several, and what is the selector?* One `RsvpPanel`, selector
  `aside[llRsvpPanel]`. The mocks have one `aside.rsvp` with different content in 13 states; the host
  stays the page's own `aside` so the landmark is the page's decision, as the [card](card.md) does
  (card D-4). The detailed designs write `ll-rsvp-panel`; the attribute selector replaces it.
- **D-2** *Which variants?* Three, from the two modifiers in `components.css`: `default`, `going`
  (`.rsvp--going`) and `closed` (`.rsvp--closed`). Registered, join-open, live and changed use `going`;
  closed, cancelled and past use `closed`; open, visitor, full and waitlisted use `default`, as the
  mocks do. The waitlisted and full panels do not get a modifier because no mock gives them one, and the
  design-system page draws "full" with no modifier.
- **D-3** *How does the panel stay complete as actions are added?* Three content slots (status, default,
  help) and two plain-text inputs. The page projects every action and help line, so Register, Join the
  waitlist, Join event, Cancel registration, Leave the waitlist, Sign in to register, See other events,
  Create an account and a future "Add to calendar" need no change to the panel. The panel adds the
  frame, the order, the gap and the loading state only.
- **D-4** *Why `text` and `note` are inputs, not slots?* Every text in the 13 mocks is one plain
  paragraph, and Angular cannot detect an empty slot, so a slot would leave an empty `p` and a stray
  grid gap. A `null` input renders nothing. The text appears before the meter (the terms in open,
  visitor, closed, cancelled, past) or after it (the waitlist rule in full and waitlisted), so there are
  two inputs, `text` and `note`; the mocks never use both, and the API allows it.
- **D-5** *How is the meter built, and why not the mocks' raw numbers?* It reuses the
  [progress bar](progress-bar.md), which takes a 0 to 100 value, so `places` gives `taken` and `capacity`
  and the panel hands over `floor(min(taken, capacity) / capacity × 100)`: 62 for 311 of 500 (62.2),
  72 for 87 of 120 (72.5), 100 for 40 of 40. Floor keeps 100 for a full event only. The mocks'
  `aria-valuenow="311" aria-valuemax="500"` becomes 62 of 100; the count in words under the bar stays the
  exact figure, and extending the progress bar with a `max` would change a built component for one
  consumer. A capacity of 0 or less is not a valid `capacity`.
- **D-6** *Is the count text computed by the panel?* No. It varies by state ("including you", "no places
  left", "286 in the room") and needs ICU plurals and the member's state, so the page writes it as
  `places.text` (L2-147). The panel renders it in the paragraph under the bar.
- **D-7** *When is there no meter?* When `places` is `null`: the closed, cancelled and past mocks show
  none, and an event with no capacity (L2-053 allows one) has no figure to show. The page passes `null`
  for all four.
- **D-8** *Where does `role="status"` or aria live apply?* The panel has no live region of its own, so a
  panel arriving with its state (the member's state loads after the page shows) is not announced as news.
  The status slot is the only announcer: the page projects an inline message with `live="polite"`
  right after the member's own action (the registered and changed mocks do, "Registered. We sent a
  calendar file to …") and `live="assertive"` for a failure (the design-system page's `role="alert"`).
  Every other status (full, waitlisted, join open, live) has no role in the mocks, and the count, badge
  and meter are never live, which keeps one announcement per change (L2-127).
- **D-9** *Does focus move after a state change?* The design-system page says focus moves to the new
  title after reserving; L2-127 says results are announced without moving focus. Both hold: focus
  moves to the title only when the control that had focus is removed by the change (the pressed
  "Register"), because focus would otherwise be lost to the page; a change that arrives while focus is
  elsewhere (the join window opening, the member's state loading) never moves focus. The title gets
  `tabindex="-1"`.
- **D-10** *What does the panel do while loading?* `loading` shows a skeleton title, text line and pill,
  as `pages/event-page/loading` draws, and hides the panel from assistive technology with
  `aria-hidden="true"` and `aria-busy="true"` (the mock hides the whole container), so no unnamed
  landmark is exposed. The mock's `div.rsvp` becomes the same `aside` host, so the surface is the same
  element before and after. The page announces "Loading the event…" in its own `p.vh[role=status]`.
  Action busy states (the button's spinner while saving) are the button's, not the panel's.
- **D-11** *Which heading level?* An `h2` by default, as the mocks write it (the event page's `h1` is
  the title, the panel is a section of the page), with `headingLevel` `2 | 3` as the card has. The
  design-system page draws `h3` because its sample sits inside a card.
- **D-12** *Where does help text go?* Two places, as the mocks use both. A line about the panel as a
  whole ("The join link is shown only to registered members…") is `[slot=help]`, after the actions,
  separated by `--space-4`. A line that describes one control ("The join link appears here from 11:45 am
  ET…", "Opens the online room in a new tab…") is projected in the default slot right after that control,
  `--space-2` from it, so `aria-describedby` and the visual pairing agree.
- **D-13** *Where does the panel sit and does it stick?* The page's `.two-col`: beside the description
  from 64 rem and after the main column below it. The design-system page's prose says it sits before the
  description on phones and stays in view while the page scrolls; the mocks and the stylesheet do
  neither, so the panel has no position of its own. The mocks win; that prose should be removed.
- **D-14** *The design-system page is a Banaro sample ("Unused in mocks").* Its copy ("Reserve a spot",
  "Field Day"), its `h3`, its "Add to calendar" and "Cancel my spot" actions and its sticky prose do not
  match the Logos Lab mocks. The CRD follows the mocks and the stylesheet and takes from the page only
  what the mocks lack: the failed-action state.
- **D-15** *Which action is primary?* The mocks' rule: the one action that moves the person on is
  `primary` (Register, Join the waitlist, Sign in to register, an open "Join event"); the one that
  cannot be used yet is `quiet` ("Join event" disabled); the way out of a finished state is `quiet`
  ("See other events"); leaving or cancelling is `text`, never `danger`. The design-system page draws
  "Join the waitlist" as quiet; the mock draws it primary and wins because joining is the action for a
  full event.
- **D-16** *Is `--color-fg-muted` on `--color-accent-subtle` checked?* It is used by the count and help
  lines on the going panel and is not in `tokens/contrast-pairs.json`. It measures above 7:1 in both
  themes, so the panel passes; the pair is added to the file as a follow-up.
- **D-17** *Do long words wrap?* Yes. `components.css` gives the panel a plain grid with no
  `minmax(0, 1fr)` column and no word wrap, so an email address in the status can widen it at 320 px.
  The panel adds both, as the card does.
- **D-18** *What if nothing is projected into the actions?* The cancelled mock has no actions; an empty
  grid would still add `--space-4`. `.rsvp__actions:empty` is hidden, which relies on the page projecting
  no whitespace-only text (Angular removes it by default).
- **D-19** *Does the panel show the member's calendar action?* No. The mocks put "Add to calendar" in the
  event head, and the design-system page's sample places it in the going panel. The default slot takes it
  if a later page wants it (AC-16); the panel does not add it.
- **D-20** *Is the title wording fixed?* No: the page's. The view-event design says the panel's wording
  is generic ("this event") because the model has no event kind, while the mocks say "this Q&A" and "this
  workshop". The panel renders either; the page object finds the title by `.rsvp__title`.
