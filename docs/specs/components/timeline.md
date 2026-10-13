# Timeline

| Field | Value |
|---|---|
| Selector | `ol[llTimeline]` |
| Library path | `frontend/projects/components/src/lib/timeline/` |
| Status | planned |
| Traces to | L2-023, L2-052, L2-076, L2-080, L2-086, L2-099, L2-120, L2-125, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-147, L2-148, L2-150 |
| Design system | [`timeline.html`](../../design-system/components/timeline.html) |
| Source mocks | [`pages/event-page/default`](../../mocks/pages/event-page/default.html), [`pages/event-page/visitor`](../../mocks/pages/event-page/visitor.html), [`pages/event-page/registered`](../../mocks/pages/event-page/registered.html), [`pages/event-page/waitlisted`](../../mocks/pages/event-page/waitlisted.html), [`pages/event-page/full`](../../mocks/pages/event-page/full.html), [`pages/event-page/live`](../../mocks/pages/event-page/live.html), [`pages/event-page/join-open`](../../mocks/pages/event-page/join-open.html), [`pages/event-page/changed`](../../mocks/pages/event-page/changed.html), [`pages/event-page/in-person`](../../mocks/pages/event-page/in-person.html), [`pages/event-page/cancelled`](../../mocks/pages/event-page/cancelled.html), [`pages/event-page/closed`](../../mocks/pages/event-page/closed.html), [`pages/content-history/default`](../../mocks/pages/content-history/default.html), [`pages/content-history/long`](../../mocks/pages/content-history/long.html), [`pages/content-history/loading`](../../mocks/pages/content-history/loading.html), [`pages/expert-profile-history/default`](../../mocks/pages/expert-profile-history/default.html), [`pages/expert-profile-history/loading`](../../mocks/pages/expert-profile-history/loading.html), [`dialogs/restore-profile-version/default`](../../mocks/dialogs/restore-profile-version/default.html), [`dialogs/restore-profile-version/busy`](../../mocks/dialogs/restore-profile-version/busy.html), [`dialogs/restore-profile-version/failed`](../../mocks/dialogs/restore-profile-version/failed.html), [`dialogs/restore-profile-version/success`](../../mocks/dialogs/restore-profile-version/success.html), [`pages/admin/default`](../../mocks/pages/admin/default.html), [`pages/report-detail/default`](../../mocks/pages/report-detail/default.html), [`pages/report-detail/claimed`](../../mocks/pages/report-detail/claimed.html), [`pages/report-detail/message-context`](../../mocks/pages/report-detail/message-context.html), [`pages/report-detail/resolved`](../../mocks/pages/report-detail/resolved.html) |
| Rendering | [`timeline.html`](timeline.html) |

## Purpose and scope

A timeline tells what happened, or what will happen, in order. A hairline spine runs down the left
edge, a small sage ring marks each moment, and each moment is a time and its words. The event page's
"Agenda" is a timeline ("12:00 pm Welcome and opening prayer"), and so are the workflow history of an
article ("Today, 9:05 am Dr. Abena Mensah started a revision"), the version history of an expert's
profile, the administrator's "Recent changes" and the moderator's "Prior actions" for a member. One
entry can be marked as the current one: the live session, or the version that is live now.

Use a [list](list.md) for items that have no time, a [description list](description-list.md) for the
facts about one thing, a [course outline](course-outline.md) for the lessons of a course, and a table
for many dated records that people compare by column. The audit log and the notification feed are not
timelines: the first is a filtered table and the second is a feed people act on.

Out of scope:

- Which entries a screen shows, their order and their copy. The page writes every `li`, sorts them
  (newest first for a history, oldest first for an agenda) and formats every time (L2-148).
- The time-zone toggle and the "Times in Eastern time (ET)" note under the event page's agenda: the
  event page owns them.
- What sits inside an entry beyond its time: a badge ([badge](badge.md)), a "Restore this version"
  button ([button](button.md)), a `cluster`, a quoted comment or the version `diff` blocks. The page
  writes them; the timeline only lays them out under the time.
- The heading that introduces the list ("Agenda", "Every change of state") and the spacing around it.
- The restore dialog opened from a version entry ([dialog](dialog.md)) and the status line a page
  announces while its history loads.
- Loading skeleton shapes ([skeleton](skeleton.md) owns them).

## Usage

The inventory covers 25 `ol.timeline` lists in 25 mock files. Every one is an `ol` of `li` entries; no
mock uses `ul`, a modifier class or a class on an `li`. Eleven lists have no name of their own because the
section heading around them names them; the other fourteen carry an `aria-label` or are a loading state.

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/event-page/{default,visitor,registered,live,join-open,changed}` "Agenda" (Live Q&A: Imago Dei and Machine Personhood, Tue 27 Oct 2026) | agenda, oldest first, no `label` (named by the "Agenda" section) | four entries: "12:00 pm Welcome and opening prayer", "12:05 pm Dr. Abena Mensah: what the image of God is not", "12:20 pm Your questions, live and sent in advance", "12:55 pm Closing reflection"; `time` has no `datetime` in the mock | default; no entry is marked current, even on `live` | canvas, main column |
| `pages/event-page/{in-person,cancelled,closed}` "Agenda" (Faith and AI Evening: Is Creativity Sacred?, Thu 22 Oct 2026) | agenda, oldest first | "7:00 pm Doors open, coffee and dessert", "7:30 pm Conversation: is creativity sacred?", "8:30 pm Questions from the room", "9:00 pm Close" | default; the cancelled event still lists its agenda | canvas, main column |
| `pages/event-page/{full,waitlisted}` "Agenda" (Workshop: Writing an AI Policy for Your Church, Sat 7 Nov 2026) | agenda, oldest first | "10:00 am Why your church needs a policy, and what it is for", "10:45 am Drafting in small groups", "11:45 am Sharing drafts and feedback", "12:30 pm Close" | default | canvas, main column |
| `pages/content-history/{default,long}` "Every change of state" | activity, newest first, `label` "Workflow history, newest first" | eight or nine entries: `time` with `datetime`, then `p` with `strong` name, a verb phrase and a state `badge` ("Revision draft", "Published", "Approved", "In review", "Changes requested", "Draft"); an optional `p.muted` quoted comment, which wraps over several lines in `long` | default, long | canvas, left column of a two-column page |
| `pages/content-history/loading` | five skeleton entries, no label | five `li[aria-hidden="true"]`, each with a short and a full `span.skeleton--text` | loading | canvas |
| `pages/expert-profile-history/default` and the history behind `dialogs/restore-profile-version/{default,busy,failed}` | activity, newest first, `label` "Versions, newest first" | four entries (two behind the dialog): `time` "Today, 9:48 am ET", a `cluster` holding a `p` and either a `badge` "Current version" or a "Restore this version" button, then one or more `div.diff` groups; the first is `aria-current="true"` | default, current entry, entries with a button | canvas; behind a dialog backdrop |
| `dialogs/restore-profile-version/success` (behind the dialog) | activity, newest first, same `label` | five entries; the new first entry "Today, 10:24 am ET Naomi Ellis restored the version from Thu 1 Oct 2026" is current and the previous current entry has moved down with its button | current moved | canvas, behind a dialog backdrop |
| `pages/expert-profile-history/loading` | busy, no label | `aria-busy="true"`; three `li[aria-hidden="true"]` skeleton entries (short line, title, block); the mock also puts a visually hidden `li[role="status"]` "Loading profile history…" in the list (D-7) | loading | canvas |
| `pages/admin/default` "Recent changes" | activity, newest first, `label` "Recent administrative changes" | three entries: "Today, 10:12 am ET Isaac Moreau reordered featured content.", "Today, 9:05 am ET Isaac Moreau published the planned maintenance announcement.", "Today, 8:51 am ET Owen Bradley suspended Samuel Okafor until Tue 20 Oct 2026."; each ends in or holds a link | default | canvas |
| `pages/report-detail/{default,claimed,message-context,resolved}` "Prior actions" | activity, one entry, `label` "Samuel Okafor's prior moderation actions" | one entry: "Mon 21 Sep 2026 Warned by Owen Bradley for a personal attack in a comment on *Can a Machine Pray?* Guideline 2, No harassment or hate." with an `em` title | default | aside card |
| The design-system page | activity, agenda, milestones; current and not current; one-entry lists | "Northwind activity", "Field Day agenda, Saturday 17 October", "Northwind milestones" with `strong` title and `p.muted` detail | default, current | canvas |

Every row is buildable with the API below: the page writes the `li` entries (each starting with a
`time`), the list adds the spine and markers, and `label` and `busy` cover the named, stand-alone and
loading cases. The three content patterns of the design-system page (activity, agenda, milestones) and
the three of the mocks (workflow history, versions, prior actions) are the same markup; none needs an
input beyond `label` and `busy` (D-1, D-3, D-6).

## Anatomy

1. **List** — `ol.timeline`. A grid with `--space-5` between entries and `--space-6` of padding on the
   left, where the spine and markers sit. The host element is the `ol` itself.
2. **Spine** — `.timeline::before`. A `--border-width-hairline` rule in `--color-border-default` down the
   left edge, from `--space-2` below the top of the list to `--space-2` above its bottom. Decorative.
3. **Entry** — `li`, a direct child of the list. A grid with `--space-1` between its parts. It holds a
   time and the entry's content, and nothing else is a child of the list.
4. **Marker** — `.timeline > li::before`. A `--space-2` ring (`--border-width-thick` in `--color-accent`)
   with a `--color-bg-canvas` centre, at the left of the entry. Decorative: it has no text and no name.
5. **Time** — `time[datetime]`, the first child of the entry. The caption style, `--color-fg-subtle`.
6. **Content** — one or more blocks after the time: a `p` with the sentence, optionally a `strong` name
   or title, a `p.muted` detail line, a badge, a link, a button or a diff. The page's own markup.
7. **Current entry (optional)** — `li[aria-current]`. The marker is filled with `--color-accent` and gets
   a `--space-1` halo in `--color-accent-subtle`.
8. **Loading entry (optional)** — `li[aria-hidden="true"]` holding skeleton lines, while the list is busy.

Host: `ol[llTimeline]` is the consumer's own `ol`. The component adds the class `timeline`, `role="list"`
and the two accessibility attributes; its template is only `<ng-content />`. The entries are the page's
own projected `li`, which the component's styles reach with `:host ::ng-deep` as the other library
components reach projected content (D-1).

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string \| null` | `null` | no | A non-empty string sets `aria-label` on the `ol`. `null` sets nothing. Use it for a list no visible heading names (the history, versions, "Recent changes" and "Prior actions" lists); the event page's agenda is named by its section heading. A native `aria-labelledby` written by the consumer is never overwritten (D-3). |
| `busy` | `boolean` | `false` | no | `true` sets `aria-busy="true"`; `false` removes the attribute rather than writing `"false"`. The page puts `li[aria-hidden="true"]` skeleton entries in the list while it is `true` (D-7). |

- Inputs are signal inputs; `busy` accepts a bare attribute (`booleanAttribute`).
- The component has no data input and no `entries` array (D-1). The page writes the `li` markup, which is
  also how it adds a link, a badge, a button or a diff to an entry.
- There is no `TimelineItem` component or directive (D-1). The only state an entry has is the native
  `aria-current` attribute, which the page writes as `"true"`, `"time"` or `"step"` and omits when the
  entry is not current (D-5).
- There is no `variant` input: activity, agenda and milestones are the same markup (D-6).
- The consumer's own `class`, `id`, `style` and ARIA attributes stay on the host. The component never
  overwrites a `role` the consumer wrote.
- The component never sorts, groups, truncates or collapses entries (D-14).
- Translation: `label` and every entry arrive from the page already translated and formatted; the
  component holds no copy (L2-147).

### Outputs

None. The timeline is read-only; a link or button inside an entry emits its own events.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | `li` entries, in the order they should read | Every entry starts with `time[datetime]` unless it is a loading entry. The entry may hold any inline or block content after the time. Nothing other than `li` is a child of the list; no `li` carries a `role`. |

## Variants and sizes

There are no variants and no modifier classes: the class is `timeline` for every use. The design-system
page's three variants are content patterns, and the mocks add three more:

| Pattern | Order | Time shows | Entry content | Where |
|---|---|---|---|---|
| Agenda | oldest first | the time only ("12:05 pm"); the day is in the page | one sentence | event page "Agenda" |
| Activity | newest first | relative day for the last two days, then the short date, then the time ("Today, 9:12 am", "Mon 12 Oct, 2:15 pm") | person, verb, thing; a link or a badge | admin "Recent changes", content history |
| Versions | newest first | the full date and the time with zone ("Thu 1 Oct 2026, 3:12 pm ET") | `cluster` with the title and a badge or a button, then `diff` groups | expert profile history |
| Prior actions | newest first | the full date ("Mon 21 Sep 2026") | one sentence with an `em` title | report detail |
| Milestones | oldest first | the month and year ("October 2026") | `strong` title and a `p.muted` detail | design-system page only |

There is one size. Entries grow with their text; the marker (`--space-2`) and the spine
(`--border-width-hairline`) never change.

## States

A timeline is passive: the list and its entries have no hover, focus or active state of their own.
A link or button inside an entry follows its own component.

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Hairline spine, a ring marker per entry, time in `--color-fg-subtle`, content in `--color-fg-default` | An ordered list; each entry is read time first, then its content |
| Current entry | `li[aria-current]` with `"true"`, `"time"` or `"step"` | The marker is filled with `--color-accent` and has a `--space-1` halo in `--color-accent-subtle` | "current", "current time" or "current step" is announced with the entry |
| Not current | no `aria-current`, or `aria-current="false"` | The ring marker; `"false"` never draws the current marker | Nothing extra |
| Entry with a link or control | `a`, `button` in the entry | The component's own look, focus ring and hover | Reached in tab order, announced as a link or button |
| Entry with a quoted or muted detail | `p.muted` after the sentence | `--color-fg-muted` on the same type | Read as part of the entry |
| One entry | a single `li` | One marker and a spine of one entry's height | A list of one item |
| Loading | `aria-busy="true"` on the list, `li[aria-hidden="true"]` with skeleton lines | The spine and a marker per skeleton entry hold the place; lines shimmer | The list is busy; the skeleton is hidden; the page announces the status (D-7) |
| Reduced motion | `prefers-reduced-motion: reduce` | The skeleton lines stop shimmering; the list itself never animates | — |
| More contrast | `prefers-contrast: more` | `--color-border-default` and `--color-fg-subtle` resolve to the stronger tokens | — |
| Forced colours | `forced-colors: active` | The spine resolves to `CanvasText`; the current marker fills with `Highlight` (D-12) | — |

## Markup

```html
<!-- rendered: agenda (event page "Agenda", named by its section heading) -->
<ol class="timeline" role="list">
  <li><time datetime="2026-10-27T12:00-04:00">12:00 pm</time><p>Welcome and opening prayer</p></li>
  <li><time datetime="2026-10-27T12:05-04:00">12:05 pm</time><p>Dr. Abena Mensah: what the image of God is not</p></li>
  <li><time datetime="2026-10-27T12:20-04:00">12:20 pm</time><p>Your questions, live and sent in advance</p></li>
  <li><time datetime="2026-10-27T12:55-04:00">12:55 pm</time><p>Closing reflection</p></li>
</ol>
```

```html
<!-- rendered: agenda with the session happening now -->
<ol class="timeline" role="list">
  <li><time datetime="2026-10-27T12:00-04:00">12:00 pm</time><p>Welcome and opening prayer</p></li>
  <li aria-current="time"><time datetime="2026-10-27T12:05-04:00">12:05 pm</time><p>Dr. Abena Mensah: what the image of God is not</p></li>
  <li><time datetime="2026-10-27T12:20-04:00">12:20 pm</time><p>Your questions, live and sent in advance</p></li>
</ol>
```

```html
<!-- rendered: activity with links (admin "Recent changes") -->
<ol class="timeline" role="list" aria-label="Recent administrative changes">
  <li><time datetime="2026-10-13T10:12-04:00">Today, 10:12 am ET</time><p>Isaac Moreau reordered <a href="/admin/featured">featured content</a>.</p></li>
  <li><time datetime="2026-10-13T08:51-04:00">Today, 8:51 am ET</time><p>Owen Bradley suspended <a href="/admin/users/samuel-okafor">Samuel Okafor</a> until Tue 20 Oct 2026.</p></li>
</ol>
```

```html
<!-- rendered: workflow history (content history), with badges and a quoted comment -->
<ol class="timeline" role="list" aria-label="Workflow history, newest first">
  <li><time datetime="2026-10-13T09:05">Today, 9:05 am</time><p><strong>Dr. Abena Mensah</strong> started a revision <span class="badge">Revision draft</span></p></li>
  <li><time datetime="2026-10-12T14:15">Mon 12 Oct, 2:15 pm</time><p><strong>Naomi Ellis</strong> published a correction <span class="badge badge--success">Published</span></p><p class="muted">“Fixed a broken link to Genesis 1:27.”</p></li>
</ol>
```

```html
<!-- rendered: versions (expert profile history); the current version and one with a button -->
<ol class="timeline" role="list" aria-label="Versions, newest first">
  <li aria-current="true">
    <time datetime="2026-10-13T09:48-04:00">Today, 9:48 am ET</time>
    <div class="cluster cluster--between"><p><strong>Dr. Abena Mensah changed Professional title and Bio</strong></p><span class="badge badge--success">Current version</span></div>
    <div class="diff" role="group" aria-label="Changes to Professional title">…</div>
  </li>
  <li>
    <time datetime="2026-10-01T15:12-04:00">Thu 1 Oct 2026, 3:12 pm ET</time>
    <div class="cluster cluster--between"><p><strong>Dr. Abena Mensah changed Areas of expertise</strong></p><a class="btn btn--quiet btn--sm" href="/studio/profile/history/restore" aria-label="Restore the version from Thu 1 Oct 2026, 3:12 pm ET">Restore this version</a></div>
    <div class="diff" role="group" aria-label="Changes to Areas of expertise">…</div>
  </li>
</ol>
```

```html
<!-- rendered: prior actions (report detail, aside card), one entry -->
<ol class="timeline" role="list" aria-label="Samuel Okafor's prior moderation actions">
  <li><time datetime="2026-09-21">Mon 21 Sep 2026</time><p>Warned by Owen Bradley for a personal attack in a comment on <em>Can a Machine Pray?</em> Guideline 2, No harassment or hate.</p></li>
</ol>
```

```html
<!-- rendered: milestones (design-system page), the current step -->
<ol class="timeline" role="list" aria-label="Northwind milestones">
  <li aria-current="step"><time datetime="2026-10">October 2026</time><p><strong>Shared notebooks</strong></p><p class="muted">Harbour Notes opened to the whole team.</p></li>
  <li><time datetime="2026-11">November 2026</time><p><strong>Public beta</strong></p><p class="muted">Planned. Invitations go out after Field Day.</p></li>
</ol>
```

```html
<!-- rendered: loading (the status line is a sibling, outside the list) -->
<p class="vh" role="status">Loading profile history…</p>
<ol class="timeline" role="list" aria-busy="true">
  <li aria-hidden="true"><span class="skeleton skeleton--text is-short"></span><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--block"></span></li>
  <li aria-hidden="true"><span class="skeleton skeleton--text is-short"></span><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--block"></span></li>
  <li aria-hidden="true"><span class="skeleton skeleton--text is-short"></span><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--block"></span></li>
</ol>
```

```html
<!-- consumer: the event page agenda -->
<section aria-labelledby="agenda-title">
  <h2 class="section__title" id="agenda-title" i18n>Agenda</h2>
  <ol llTimeline>
    @for (session of event().agenda; track session.startsAt) {
      <li [attr.aria-current]="session.isNow ? 'time' : null">
        <time [attr.datetime]="session.startsAt">{{ session.startsAt | date: 'h:mm a' : event().timeZone }}</time>
        <p>{{ session.title }}</p>
      </li>
    }
  </ol>
</section>
```

```html
<!-- consumer: the profile history, loading and loaded -->
<p class="vh" role="status">{{ loading() ? loadingMessage : '' }}</p>
<ol llTimeline label="Versions, newest first" i18n-label [busy]="loading()">
  @if (loading()) {
    @for (n of [1, 2, 3]; track n) {
      <li aria-hidden="true"><span llSkeleton shape="text-short"></span><span llSkeleton shape="title"></span><span llSkeleton shape="block"></span></li>
    }
  } @else {
    @for (version of versions(); track version.id) {
      <li [attr.aria-current]="version.isCurrent ? 'true' : null">…</li>
    }
  }
</ol>
```

The e2e page objects find a list by `ol.timeline`, an entry by `ol.timeline > li`, its time by `time`, and the
current entry by `li[aria-current]`; the class, the `li[aria-current]` attribute and `aria-busy` are part
of the contract.

## Design

- Layout: the list is `display: grid` with `--space-5` between entries and `padding-left: --space-6`;
  each entry is a grid with `--space-1` between its time and its content. The list adds no outer margin;
  the page places it (D-10).
- Spine: `--border-width-hairline` wide, `left: --space-1`, from `--space-2` below the list's top to
  `--space-2` above its bottom, so it starts level with the first marker and stops just short of the end of
  the last entry.
- Marker: `--space-2` square, `--radius-full`, a `--border-width-thick` border in `--color-accent` over a
  `--color-bg-canvas` fill, `top: --space-2` and `left` of the entry by `--space-6` less `--space-0-5`.
  The spine and the marker are `::before` pseudo-elements, so entries need no extra markup.
- Current: the fill becomes `--color-accent` and a `0 0 0 --space-1` shadow in `--color-accent-subtle`
  surrounds it.
- Time: `--text-caption` (medium, 12 px), `--color-fg-subtle`, on its own line above the content.
- Entry text: inherits the page's `--text-body` and `--color-fg-default`. A `strong` is the browser's
  bold; a `p.muted` is `--color-fg-muted`, owned by the page's utility class.
- Entries wrap: nothing in the list sets `white-space: nowrap`, so a long sentence or a quoted comment
  wraps inside the entry and the spine stretches with it.
- `ol.timeline` restates `padding-left: --space-6`, because the global reset sets `ol[class]` padding to
  zero at the same specificity.
- Geometry as drawn by the design system: the spine's centre is `--space-1` plus half a hairline from
  the list's left edge, and the marker's centre is `--space-0-5` plus half of `--space-2` from it, a
  difference of 1.5 px that the design keeps (D-11).
- No elevation, motion or layering of its own. The halo is a shadow ring, not a layer.

Component tokens: none declared. The timeline reads semantic tokens directly (`--color-border-default`,
`--color-accent`, `--color-accent-subtle`, `--color-bg-canvas`, `--color-fg-subtle`), so a surface
re-skins it by the tokens it sets, and it needs no dark-mode rules.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Spine | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Marker ring | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Marker centre | `--color-bg-canvas` | `--palette-oat-100` | `--palette-night-950` |
| Current marker fill | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Current halo | `--color-accent-subtle` | `--palette-accent-50` | `--palette-accent-950` |
| Time | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Entry text | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Muted detail | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Link in an entry | `--color-fg-link` | `--palette-accent-700` | `--palette-accent-300` |
| Focus ring | `--color-focus-ring` | `--palette-accent-700` | `--palette-accent-300` |
| Surface: page | `--color-bg-canvas` | `--palette-oat-100` | `--palette-night-950` |
| Surface: card | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-subtle` | `--color-bg-canvas` | 4.5:1 | Time on the page |
| `--color-fg-subtle` | `--color-bg-surface` | 4.5:1 | Time in the report's aside card |
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | Entry text on the page |
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Entry text in a card |
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Quoted comment or detail line on the page |
| `--color-fg-link` | `--color-bg-canvas` | 4.5:1 | Link in an entry |
| `--color-accent` | `--color-bg-canvas` | 3:1 | Marker ring and current fill on the page |
| `--color-accent` | `--color-bg-surface` | 3:1 | Marker ring and current fill in a card |
| `--color-focus-ring` | `--color-bg-canvas` | 3:1 | Focus ring on a link or button in an entry |

The spine and the halo are decorative: the time and the text identify each moment and `aria-current`
identifies the current one, so neither needs 3:1 (as [description list](description-list.md) does for its
hairline). In a card the marker's centre stays the canvas colour, so the ring is what carries the 3:1
against the card (D-11). Under `prefers-contrast: more` the tokens resolve to stronger values and the
timeline follows without a rule of its own. In forced colours the spine is `CanvasText` through the token
and the current marker's fill is `Highlight`, because forced colours would otherwise replace the
accent fill with the canvas colour and the current entry would look like the others (D-12).

## Responsive behaviour

- The timeline is one column at every width: the spine stays on the left and entries wrap. There are no
  breakpoints and nothing changes between XS and XL; at 360 px the time already sits above the sentence,
  as it does at every width.
- The component sets no maximum width (D-10). The event page's agenda fills its main column, the history
  fills the left column of a two-column page and the "Prior actions" list fills its aside card; a page
  that wants a narrower column sets it on a wrapper.
- A long sentence, a long quoted comment ("Attributed to Dr. Abena Mensah instead of Logos Lab, at her
  request, because the piece grew out of her autumn cohort.") and a long link wrap inside the entry
  (L2-130).
- At 320 px nothing scrolls horizontally or clips; at 400 % zoom (a 320 px viewport) everything stays
  available and in the same one column (L2-129). The list has no target of its own; a link in a sentence
  keeps the line height of its text, and a button keeps its component's target.

## Accessibility

### Role and pattern

A native `ol`, because order is the meaning, with `role="list"` written by the component: the global reset
removes the markers (`list-style: none`), and Safari with VoiceOver stops exposing a list without
markers (D-4). It is the HTML ordered list; there is no ARIA widget, no `aria-live` and no roving focus.
Each `li` is a plain `listitem`. The marker and spine are CSS pseudo-elements and are not exposed.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Moves to and from each link or button inside an entry, in visual order. The list, an entry, a time and plain text are not focusable. |
| <kbd>Enter</kbd> | Follows the focused link or presses the focused button (<kbd>Space</kbd> as well for a button). |

### Focus

The list never takes focus and never moves it. A link or button inside an entry shows the shared
`--color-focus-ring` outline, `--focus-ring-width` thick and offset by `--focus-ring-offset`; the gap
between entries (`--space-5`) and the list's padding leave room, so the ring is not clipped by the spine
or a neighbouring entry.

### Labelling

- A list is named by the heading of the section around it (`aria-labelledby` on the section, as the
  event page's "Agenda"), or by `label` when no heading names it ("Workflow history, newest first",
  "Versions, newest first", "Recent administrative changes", "Samuel Okafor's prior moderation actions")
  (D-3). A `label` states the order when it matters ("newest first").
- Every entry starts with `time[datetime]` so assistive technology and translation tools get the exact
  moment; the visible text is the page's formatted string (D-8).
- Each entry makes sense on its own: "Grace Liu moved Onboarding checklist to Review", never "Moved it".
- The current entry carries `aria-current` with `"time"` for the session happening now in an agenda,
  `"step"` for the step a project is on, and `"true"` for the version that is live now (D-5). The meaning
  is never only the filled marker.
- The marker, the spine and the halo are decorative and have no text.
- A button or link in an entry has the name its own component gives it. The version history's "Restore
  this version" carries an `aria-label` that must begin with its visible label (WCAG 2.5.3 Label in Name);
  the page owns that name (see *Implementation notes*).

### Announcements

The timeline announces nothing itself, and a change of the current session in a live agenda is not
announced (D-9). A busy list is announced as busy; the page owns the polite status that says the history
is loading and has loaded, and writes it as a sibling of the list, never as an `li` (D-7).

### Motion

None. New entries appear without animation. The only motion is the skeleton's shimmer, which stops
under `prefers-reduced-motion: reduce`.

## Content and internationalisation

- One sentence per entry, in the past tense for a history ("Isaac Moreau reordered featured content.")
  and as a plain noun phrase for an agenda ("Closing reflection"). Name the person first and the thing
  second: "Daniel Reyes added 3 notes to Harbour Notes".
- Times use am and pm in lowercase ("12:05 pm", "Today, 9:48 am ET"). The last two days are relative
  ("Today, 9:12 am", "Yesterday, 4:40 pm"), then the short date ("Mon 12 Oct, 2:15 pm"), and a full date
  with the year where the list spans months ("Thu 1 Oct 2026, 3:12 pm ET"). An agenda shows the time
  only, because the day is in the page (D-8).
- The same kind of time uses the same format everywhere in one list. A time that names a zone ("ET")
  has a `datetime` with that offset ("2026-10-13T09:48-04:00").
- Dates, times and relative days are formatted by the page with the locale's formatting (L2-148); the
  timeline renders the string it is given and never builds one. The `datetime` value is the same in
  every locale.
- A quoted comment keeps its quotation marks as data ("Fixed a broken link to Genesis 1:27.").
- Translatable inputs: `label`. Translated by the page: every entry's sentence, badge text, link text and
  the loading status. Data values: names ("Dr. Abena Mensah", "Naomi Ellis", "Owen Bradley", "Isaac
  Moreau"), titles ("Can a Machine Pray?") and times.
- French runs about 30 % longer: an entry wraps, a time string wraps under itself, and nothing is clipped
  (L2-150).

## Performance

- Change detection: `OnPush`, signal inputs. The class, `role`, `aria-label` and `aria-busy` are host
  bindings computed from the inputs; the component has no template logic beyond `<ng-content />`, so a
  page adding an entry re-renders only the new `li`.
- Perf-test scenario: this repository has no perf-test project (D-15), so the timeline is measured through
  the page budgets of L2-120. The measured scenario is the content-history page for "Can Software Bear the
  Image of God?": the eight entries from "Today, 9:05 am Dr. Abena Mensah started a revision" to "Fri 9
  Oct, 9:12 am Dr. Abena Mensah created the draft".
- Composite scenarios: the event page (Agenda) and the expert profile history.
- Layout stability: the loading list draws the same spine, markers and entry spacing as the loaded list,
  and each skeleton entry is the height of the text lines it stands for, so the history does not jump
  when the entries arrive (L2-120). A time and a sentence need no image or font beyond the page's own.
- Weight: no dependency beyond `@angular/core`. The timeline imports none of the badge, button or
  skeleton components; the page composes them inside the entries.

## Acceptance criteria

### Rendering

- **AC-1** Given the event "Live Q&A: Imago Dei and Machine Personhood" on Tue 27 Oct 2026, when its page renders the "Agenda" section, then the list is an `ol.timeline` of four `li` entries, oldest first: "12:00 pm Welcome and opening prayer", "12:05 pm Dr. Abena Mensah: what the image of God is not", "12:20 pm Your questions, live and sent in advance" and "12:55 pm Closing reflection", each a `time` followed by a `p`. (L2-052)
- **AC-2** Given the cancelled event "Faith and AI Evening: Is Creativity Sacred?", when its page renders, then the agenda still lists "7:00 pm Doors open, coffee and dessert", "7:30 pm Conversation: is creativity sacred?", "8:30 pm Questions from the room" and "9:00 pm Close". (L2-052)
- **AC-3** Given the article "Can Software Bear the Image of God?" with eight workflow transitions, when its history renders, then the list named "Workflow history, newest first" shows all eight entries from "Today, 9:05 am Dr. Abena Mensah started a revision" with the badge "Revision draft" to "Fri 9 Oct, 9:12 am Dr. Abena Mensah created the draft" with the badge "Draft", and no entry is omitted or merged. (L2-076)
- **AC-4** Given Naomi Ellis published a correction on Mon 12 Oct 2026 at 2:15 pm, when the history renders, then its entry reads "Mon 12 Oct, 2:15 pm Naomi Ellis published a correction" with the badge "Published" and the muted line "“Fixed a broken link to Genesis 1:27.”" under it. (L2-080)
- **AC-5** Given Dr. Abena Mensah's profile with four saved versions, when an editor opens "Profile history", then the list named "Versions, newest first" shows four entries newest first, the first marked `aria-current="true"` with the badge "Current version", and each of the other three with a "Restore this version" button and its changes below. (L2-023)
- **AC-6** Given Naomi Ellis restores the version from Thu 1 Oct 2026, when the history re-renders, then it has five entries, the first reads "Today, 10:24 am ET Naomi Ellis restored the version from Thu 1 Oct 2026" with `aria-current="true"`, and the entry "Today, 9:48 am ET" has no `aria-current` and shows "Restore this version". (L2-023)
- **AC-7** Given Isaac Moreau reordered featured content at 10:12 am ET, when the administrator's "Recent changes" renders, then the list named "Recent administrative changes" shows three entries newest first beginning "Today, 10:12 am ET Isaac Moreau reordered featured content.", with "featured content" as a link. (L2-099)
- **AC-8** Given the report on Samuel Okafor's comment with one earlier warning, when "Prior actions" renders in the aside card, then the list named "Samuel Okafor's prior moderation actions" has one entry "Mon 21 Sep 2026 Warned by Owen Bradley for a personal attack in a comment on Can a Machine Pray? Guideline 2, No harassment or hate.", with one marker and a spine that ends at that entry. (L2-086)

### States

- **AC-9** Given the versions list with the current version, when it renders in the light theme, then the marker of the `li[aria-current]` is filled with `--color-accent` and has a `--space-1` halo in `--color-accent-subtle`, and every other marker is a `--space-2` ring with a `--border-width-thick` `--color-accent` border over a `--color-bg-canvas` centre. (L2-129)
- **AC-10** Given a live agenda where the session "12:05 pm Dr. Abena Mensah: what the image of God is not" is happening, when the page marks it, then only that `li` has `aria-current="time"`, its marker is filled, and a screen reader announces it as current. (L2-127)
- **AC-11** Given an entry that carries `aria-current="false"`, when the list renders, then its marker is the ring marker and not the current one. (L2-127)
- **AC-12** Given the content-history page while its entries load, when the list renders with `busy`, then it has `aria-busy="true"`, five `li[aria-hidden="true"]` skeleton entries hold the spine and five markers, and no skeleton line is read by a screen reader; and given `busy` is `false`, then no `aria-busy` attribute is present. (L2-120)
- **AC-13** Given the profile history after loading, when the three skeleton entries are replaced by the four versions, then the page's cumulative layout shift stays at or below 0.1. (L2-120)

### Keyboard and focus

- **AC-14** Given the administrator's "Recent changes", when the user tabs through the page, then focus reaches "featured content", "planned maintenance announcement" and "Samuel Okafor" in visual order, each with a `--color-focus-ring` outline at least 2 CSS px thick that the spine and the marker do not clip, <kbd>Enter</kbd> follows the link, and the list, the times and the text take no focus. (L2-126)

### Screen readers

- **AC-15** Given any timeline, when it is inspected, then the host is an `ol` with `class="timeline"` and `role="list"`, every child is an `li` with no `role`, and each entry's first child is a `time` with a `datetime` attribute. (L2-127)
- **AC-16** Given the agenda's entry "12:05 pm", when it is inspected, then its `time` has `datetime="2026-10-27T12:05-04:00"` and the visible text "12:05 pm", and the marker and spine are not in the accessibility tree. (L2-127)
- **AC-17** Given `label` "Versions, newest first", when the list renders, then the `ol` has that `aria-label`; given `label` is `null` and the section is named by the heading "Agenda", then no `aria-label` is written and the consumer's `aria-labelledby` is kept. (L2-127)
- **AC-18** Given the profile history while loading with the status "Loading profile history…", when an automated axe-core scan runs, then it reports no `list` or `aria-allowed-role` violation, because the status is a sibling of the list and every child of the `ol` is an `li`. (L2-125)

### Theming

- **AC-19** Given the content history in the dark theme, when it renders, then the spine uses `--color-border-default`, the rings `--color-accent`, the marker centres `--color-bg-canvas`, the times `--color-fg-subtle` and the sentences `--color-fg-default`, each resolving to its dark value, and no part keeps a light-only colour. (L2-134)
- **AC-20** Given both themes, when contrast is measured, then a time and a muted detail meet 4.5:1 on the page and in a card, the entry text and a link meet 4.5:1, and a marker ring and the current fill meet 3:1 against `--color-bg-canvas` and `--color-bg-surface`. (L2-129)

### Responsive

- **AC-21** Given the agenda at 320 px, when it renders, then "Dr. Abena Mensah: what the image of God is not" wraps inside its entry, the spine and markers stay at the left, each time sits above its sentence, and the page does not scroll horizontally. (L2-130)
- **AC-22** Given the long content history at 320 px with the comment "Attributed to Dr. Abena Mensah instead of Logos Lab, at her request, because the piece grew out of her autumn cohort.", when it renders, then the comment wraps over several lines, the spine runs the full height of that entry, and nothing is clipped. (L2-130)
- **AC-23** Given the content history at 400 % zoom on a 1280 px window, when it renders, then every entry is available in one column with no horizontal scroll. (L2-129)
- **AC-24** Given WCAG text-spacing overrides (line height 1.5, letter spacing 0.12, word spacing 0.16) on the versions list, when it renders, then no time, sentence, badge or button is clipped or overlaps another. (L2-129)
- **AC-25** Given the pseudo-locale with strings 30 % longer, when the agenda and the versions list render at 320 px and at 1440 px, then each entry wraps, every time stays above its text, and nothing is clipped or overlaps. (L2-150)
- **AC-26** Given the administrator's "Recent changes" on a touch device, when the link "featured content" is measured, then its line box is at least 24 CSS px tall (`--target-min`), so the sentence is tappable. (L2-132)

### Content and internationalisation

- **AC-27** Given the content history in en-CA and then in fr-CA, when it renders, then the visible times such as "Mon 12 Oct, 2:15 pm" change to the locale's format with no code change while each `datetime` value stays the same. (L2-148)
- **AC-28** Given the pseudo-locale build, when the profile history renders, then `label` and the page's sentences are pseudo-localized, while names such as "Dr. Abena Mensah" and "Naomi Ellis" are unchanged. (L2-147)

### Motion

- **AC-29** Given a restore adds "Today, 10:24 am ET" to the top of the history, when the entry appears with and without reduced motion, then it appears without animation, and the skeleton lines of a loading list do not shimmer under reduced motion. (L2-129)

### Performance

- **AC-30** Given the content history with eight entries, when a ninth entry is added at the top, then the other eight `li` elements are not re-rendered and the page's cumulative layout shift stays at or below 0.1. (L2-120)

## Implementation notes

- Planned. Folder `frontend/projects/components/src/lib/timeline/`, one type per file, the component with
  its own `.html` and `.scss`: `timeline.ts` (`Timeline`, selector `ol[llTimeline]`), `timeline.html`
  (`<ng-content />` only), `timeline.scss`, and `index.ts` re-exporting `Timeline`. It is exported from
  the library's `public-api.ts`. There is no enum, no variant file and no item component (D-1, D-6).
- `Timeline` is standalone and `OnPush`. Host bindings: `class.timeline` (always), `attr.role` (`"list"`,
  unless the consumer wrote one), `attr.aria-label` from `label` (nothing when `null`) and
  `attr.aria-busy` (`"true"` or nothing) from `busy`. Host classes are bindings, so the consumer's own
  `class` is kept.
- Styles: the `timeline` block of `components.css` (`.timeline`, `.timeline::before`, `.timeline > li`,
  `.timeline > li::before`, `.timeline time`, `.timeline > li[aria-current]::before`), written as
  `:host(.timeline)` for the list and `:host ::ng-deep > li`, `> li::before` and `time` for the projected
  entries. Keep `ol.timeline { padding-left: var(--space-6) }` at higher specificity than the global
  `ol[class]` reset. Change the current rule to `li[aria-current]:not([aria-current="false"])::before`
  (AC-11), add `:host { margin: 0 }`, and add
  `@media (forced-colors: active) { li[aria-current]::before { background: Highlight } }` (D-12). The
  `ul.timeline` selector in `components.css` is unused (D-2).
- The component composes nothing; the page puts [badge](badge.md), [button](button.md) and
  [skeleton](skeleton.md) inside entries. The version `diff` blocks and the `cluster` row are page markup
  without a CRD of their own.
- No frontend page uses a timeline yet. The slice that builds the event page's Agenda uses
  `ol llTimeline` with `time[datetime]` from the event's start and each session's offset, and gives the
  agenda no `label` because the "Agenda" section names it.
- Mock drift, none of it part of the component (a design-artifact change for the mocks):
  - All eleven `pages/event-page/*` agendas write `<time>` with no `datetime`, against the design-system
    rule and AC-15; the event head already carries a `datetime` for the start.
  - `pages/expert-profile-history/loading` puts `<li class="vh" role="status">` inside the `ol`. Measured
    with axe-core it reports `list` (serious) and `aria-allowed-role` (minor), which fails L2-125
    AC1. The status moves outside the list as in the *Markup* loading block (D-7).
  - `pages/content-history/loading` has no `aria-busy` on its list; `busy` writes it.
  - No mock marks the agenda's current session, even `pages/event-page/live` (D-9), and no mock writes
    `role="list"` (D-4).
  - The "Restore this version" buttons of the version history carry `aria-label="Restore the version
    from …"`, which does not contain the visible text "Restore this version" (WCAG 2.5.3). The button's
    name belongs to the page's slice; the label must begin with the visible label, for example "Restore
    this version, from Thu 1 Oct 2026, 3:12 pm ET".
- Design-system catch-up: the `timeline` page says "No mock uses `.timeline` yet" and is marked "Unused
  in mocks", while 25 mocks do; its states matrix writes `aria-current="page"` against its own text
  (`"time"` or `"step"`) and the mocks' `"true"`; it advises a column under 44ch where the mocks fill
  their column (D-10); and its code section omits `role="list"` (D-4). Its overview offers
  "milestones" but no mock needs it.

## Decisions

- **D-1** *Is there an item component, an item directive or an `entries` input?* No. The brief offered
  `li[llTimelineItem]` as an option. An entry has no input, no state and no slot of its own: the only
  state is the native `aria-current` attribute, and the content is the page's own (links, badges, buttons,
  diffs, `strong` and `em`). A typed `entries` input would have to model all of them and would be
  outgrown by the next screen. Native `li` carries the semantics, and the list's styles reach `> li` with
  `:host ::ng-deep`, as [description list](description-list.md) D-2 and D-4 do for `div`, `dt` and `dd`.
- **D-2** *Is `ul[llTimeline]` supported?* No; the selector is `ol[llTimeline]`. The design-system page
  says "an ordered list, because order is the meaning", and all 25 mock lists are `ol`. The `ul.timeline`
  selector in `components.css` only repeats the padding reset and no markup uses it.
- **D-3** *Are `label` and `busy` inputs, and what names a list?* Yes, both, as [description list](description-list.md)
  D-1 and D-3. Twelve of the 25 lists carry an `aria-label` (history, versions, "Recent administrative
  changes", "Samuel Okafor's prior moderation actions"), eleven agendas are named by their "Agenda"
  section and two are loading states. `label` is optional and a native `aria-labelledby` is the
  alternative and is never overwritten. `busy` writes `aria-busy` consistently instead of each page
  writing it, and one loading mock already does.
- **D-4** *Does the host add `role="list"`?* Yes. No mock does, but the global reset gives an `ol[class]`
  `list-style: none`, and Safari with VoiceOver then stops exposing a list, which loses the count and the
  order that this component is for. The attribute is redundant elsewhere and harmless, as [list](list.md)
  D-2 decided. An axe-core scan of `ol[role="list"]` reports no violation.
- **D-5** *What values does `aria-current` take, and does `"false"` draw the current marker?* The page
  writes `"true"` for the version that is live now (the version history marks one in five mocks), `"time"`
  for the session happening now and `"step"` for the step a project is on, as the design-system text
  says. The design-system states matrix writes `"page"`; that is a navigation value and not used here.
  The component keys its style on `[aria-current]` but ignores `"false"`, so a page that binds a boolean
  with `[attr.aria-current]="isCurrent"` does not mark every entry. The page still omits the attribute
  for entries that are not current.
- **D-6** *Is there a `variant` input for activity, agenda and milestones?* No. The design-system page
  separates them by their content (time format, a bold title and a muted line), not by any class: the
  markup and CSS are identical, and the mocks add three more patterns (workflow history, versions, prior
  actions) that also differ only in content. The *Variants and sizes* table names the patterns so a page
  author picks the time format that fits.
- **D-7** *How is loading expressed, and where does the status line go?* The list is `aria-busy="true"`
  (the `busy` input) and holds `li[aria-hidden="true"]` skeleton entries, as the two loading mocks do, so
  the spine and markers hold the place and the loaded entries do not shift the page (L2-120). The
  expert-profile-history mock also writes `<li role="status">` inside the `ol`; axe-core reports `list`
  (serious) and `aria-allowed-role` (minor) for it, which breaks L2-125 AC1. The status is a sibling of
  the list, so the page keeps the polite announcement (L2-127 AC3) and the list contains only `li`
  entries. The component never writes the status; the page owns it.
- **D-8** *Is `datetime` required, and what is shown?* Yes: every entry's `time` has a `datetime`, as the
  design-system page says, and the event-page mocks drift from it. The agenda shows the time only because
  the day is in the page; the `datetime` carries the full date and the offset, so the machine-readable
  moment is complete (the event head already has one: `2026-10-27T12:00-04:00`). A time that names a zone
  has an offset; one that names none ("Today, 9:05 am" in the content history) has a local date-time.
- **D-9** *Does the event page's agenda mark the current session?* The component supports it
  (`aria-current="time"`), and the design-system page shows it, but no L2 requirement and no mock marks one,
  even on the live event. The event page therefore marks nothing today; when product asks for it, the
  page binds `[attr.aria-current]` and no change to the API follows. A change of the current session is
  not announced, because no requirement asks for it.
- **D-10** *Does the timeline limit its width?* No. The design-system page advises a column under 44ch
  from 1024 px, but the event page's agenda fills its 768 px main column and the history fills its
  two-column layout in the mocks, which are what the pages follow. The page places the list, as
  [card](card.md) D-7 and D-8 decide for spacing. The design-system advice reads as guidance for pages
  that put a timeline alone on a wide canvas.
- **D-11** *Does the marker centre change inside a card, and is the geometry adjusted?* No to both. The
  design-system CSS fills every marker's centre with `--color-bg-canvas`, so on the aside card of the
  report page the centre is the canvas tone and the ring carries the 3:1 (AC-20). The spine centre is
  1.5 px left of the marker centre as drawn; the offset is not visible at this size and changing it is a
  design-system change first.
- **D-12** *What does the current marker do in forced colours?* The design-system CSS fills it with
  `--color-accent` and a halo shadow, which forced colours replace with the canvas colour and remove, so
  the current entry would look like the others to a sighted high-contrast user. `aria-current` already
  serves assistive technology. Decision: the fill is `Highlight` under `forced-colors: active`, one rule,
  consistent with the focus ring token that already resolves to `Highlight`. No L2 requirement states it,
  so it is a design-system rule without a criterion.
- **D-13** *Do the spine and the halo need 3:1?* No. Both are decorative: the time identifies each
  moment and `aria-current` and the filled ring identify the current one. The ring does meet 3:1
  (AC-20). This follows [description list](description-list.md) for its hairline.
- **D-14** *Does the timeline sort, group by day, collapse or paginate?* No. The page sorts (newest first
  for histories, oldest first for agendas) and formats; L2-076 AC4 and L2-080 AC3 require every transition
  and every published version to be listed, so no entry is hidden behind a "Show more". If a history grows
  long enough to need paging, that is a page behaviour with its own requirement.
- **D-15** *Where is the render-performance budget measured?* This repository has no perf-test project, as
  [button](button.md) D-3 and [chip](chip.md) D-3; the budgets of L2-120 measured on whole pages cover the
  timeline. The scenario is the content-history page for the article "Can Software Bear the Image of God?".
- **D-16** *Is the `time` required to be the first child, and what goes under it?* Yes for every real
  entry, as in all 23 non-loading mock lists and the design-system page; the grid puts the time on its own
  line above the content. What follows is free page markup (a `p`, a `cluster`, `diff` groups) and the
  list lays each block out with `--space-1` between them.
