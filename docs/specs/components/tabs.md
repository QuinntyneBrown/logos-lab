# Tabs

| Field | Value |
|---|---|
| Selector | `nav[llTabs]`, `div[llTabs]`, `a[llTab]`, `button[llTab]` |
| Library path | `frontend/projects/components/src/lib/tabs/` |
| Status | planned |
| Traces to | L2-003, L2-021, L2-041, L2-051, L2-069, L2-070, L2-072, L2-074, L2-077, L2-120, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-150 |
| Design system | [`tabs.html`](../../design-system/components/tabs.html) |
| Source mocks | [`pages/search-results/default`](../../mocks/pages/search-results/default.html), [`pages/search-results/selected`](../../mocks/pages/search-results/selected.html), [`pages/dashboard/default`](../../mocks/pages/dashboard/default.html), [`pages/saved/default`](../../mocks/pages/saved/default.html), [`pages/my-events/default`](../../mocks/pages/my-events/default.html), [`pages/my-events/empty`](../../mocks/pages/my-events/empty.html), [`pages/my-learning/completed`](../../mocks/pages/my-learning/completed.html), [`pages/following/collections`](../../mocks/pages/following/collections.html), [`pages/following/empty`](../../mocks/pages/following/empty.html), [`pages/expert-profile/default`](../../mocks/pages/expert-profile/default.html), [`pages/expert-profile/long`](../../mocks/pages/expert-profile/long.html), [`pages/events/default`](../../mocks/pages/events/default.html), [`pages/review-queue/default`](../../mocks/pages/review-queue/default.html), [`pages/studio/editor`](../../mocks/pages/studio/editor.html), [`pages/studio-video-media/default`](../../mocks/pages/studio-video-media/default.html), [`pages/studio-video-captions/default`](../../mocks/pages/studio-video-captions/default.html) |
| Rendering | [`tabs.html`](tabs.html) |

## Purpose and scope

Tabs switch between a few sibling views of one thing: the content types in a search ("Videos 3"), the
sections of the member dashboard ("My learning", "Saved 14"), "Upcoming" and "Past" events, the content
an expert has published by type, and the "Media" and "Captions and transcript" pages of a studio video.
Muted labels sit on a hairline and the current one is underlined in the accent, or filled in the pill
variant. A tab can carry a count.

There are two kinds, chosen by the host element, and they are different widgets:

- **Link tabs** (`nav[llTabs]` holding `a[llTab]`): each tab is a link that loads a page or a route
  with different query parameters. The current one is marked `aria-current="page"`. This is
  navigation, not the ARIA tab pattern.
- **Tablist tabs** (`div[llTabs]` holding `button[llTab]`): each tab swaps a panel on the same page,
  the WAI-ARIA tabs pattern with automatic activation.

Use a [stepper](../../design-system/components/stepper.html) for steps that depend on each other,
[sidebar navigation](sidebar-navigation.md) for the sections of a whole area, and a segmented button
group for a single on or off choice.

Out of scope:

- Which tab is selected or current, what its count is, and what its panel or page shows. The page owns
  the selection, routing and data; "only tabs that have items" (`L2-021`) is the page's rule.
- The panel. It is plain markup the page owns; this CRD states the contract it keeps (see *API*).
- Counts, labels and routes of any particular page.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/search-results/default`, `selected`, `long`, `corrected`, `partial` | link, underline, label "Result types" | "All 14", "Courses 2", "Modules 1", "Videos 3", "Articles 2", "Collections 1", "Events 1", "Experts 2" | current "All" or "Videos"; scrolls at XS | canvas |
| `pages/dashboard/*`, `pages/my-learning/*`, `pages/saved/*`, `pages/my-events/*`, `pages/my-certificates/*`, `pages/following/*` | link, underline, label "Dashboard" | "Overview", "My learning", "Saved 14", "My events", "Certificates", "Following" | current is the page's own tab | canvas |
| `pages/events/*` | link, underline, label "When" | "Upcoming", "Past" | current | canvas |
| `pages/studio/editor`, `pages/review-queue/*` | link, underline, label "Studio views" | "All content", "Review queue 5" | current | canvas |
| `pages/studio-video-media/*`, `pages/studio-video-captions/*` | link, underline, label "Video", spaced `--space-6` below the header by the page | "Media", "Captions and transcript" | current | canvas |
| `pages/my-events/*` | link, pill, label "Show" | "Upcoming 2" (or "Upcoming 0" when empty), "Past" | current | canvas |
| `pages/my-learning/*` | link, pill, label "Show" | "In progress 3", "Completed 2" | current | canvas |
| `pages/following/*` | link, pill, label "Following" | "Experts 4", "Collections 2" (both "0" when empty) | current | canvas |
| `pages/expert-profile/*` (and the profile behind `dialogs/unfollow/success`) | tablist, underline, label "Published content by type" | "Courses 1", "Videos 1", "Articles 3", "Collections 1", "Events 1" for Dr. Abena Mensah; "Courses 2", "Modules 1", "Videos 3", "Articles 4", "Collections 1", "Events 2" for the long profile | selected, unselected | canvas |
| The design-system page | tablist underline, pill, counts, icons, disabled | "Overview", "Notes", "Activity", "Files"; "All", "Mine", "Shared with me" | all states | surface |

## Anatomy

1. **Tab list** — `.tabs` on the `nav` or `div` host. One row that never wraps, with a hairline
   beneath it, scrolling sideways inside itself when the tabs are wider than it.
2. **Tab** — `.tab` on an `a` or `button`. A `--target-comfortable` tall row in the label type style,
   muted until current or selected.
3. **Indicator** — `::after` on the selected or current tab: a `--border-width-thick` accent underline
   that sits on the hairline (pill variant: an `--color-accent-subtle` fill with accent text instead).
4. **Icon (optional)** — a leading decorative `svg[llIcon]` before the label (tablist and link tabs).
5. **Label** — the projected text: one or two nouns.
6. **Count (optional)** — `span.badge.badge--plain` after the label, a bare number.
7. **Panel** — owned by the page, for tablist tabs only: `[role=tabpanel]` labelled by its tab.

Host: the consumer's own `<nav llTabs>` or `<div llTabs>` and `<a llTab>` or `<button llTab>`; the
components add the classes, roles and state attributes. `Tab` has a template (the projected label, the
space and the count).

## API

### `Tabs` (`nav[llTabs]`, `div[llTabs]`)

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string` | — | yes | Becomes `aria-label` of the list. Distinct on a page (`L2-127`). |
| `variant` | `'underline' \| 'pill'` | `'underline'` | no | `'pill'` adds `.tabs--pill`. |

The host element decides the kind. A `div` host is a tablist: it sets `role="tablist"` and holds
`button[llTab]` only. A `nav` host holds `a[llTab]` only and sets no role. A tab of the wrong element
for its host raises a development-mode error.

`Tabs` has no outputs. It adds no outer margin: the page spaces it.

### `Tab` (`a[llTab]`, `button[llTab]`)

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `count` | `number \| null` | `null` | no | A number renders the count badge, formatted with the active locale; `0` renders "0"; `null` renders none. |
| `current` | `boolean` | `false` | no | Links only. `true` sets `aria-current="page"`; `false` removes the attribute. Ignored on a button. |
| `selected` | `boolean` | `false` | no | Buttons only. Sets `aria-selected` to `true` or `false` and the roving `tabindex` (`0` or `-1`). Ignored on a link. |
| `panelId` | `string \| null` | `null` | no | Buttons only. Sets `aria-controls` to the panel's `id`. |
| `disabled` | `boolean` | `false` | no | Buttons only. Sets the native `disabled` attribute. A link tab is never disabled (D-6). |

| Output | Payload | Emitted when |
|---|---|---|
| `activated` | `void` | A button tab that is not selected is chosen: by a click, by Enter or Space on it, or by an arrow, Home or End key landing on it. A link tab never emits it; the consumer's `routerLink` navigates. |

The consumer owns the state. It sets `selected` on exactly one tab from its own signal and updates the
signal in the `activated` handler. The component never flips `selected` itself.

Host attributes the consumer supplies and the component leaves alone: `id` (required on a button tab
whose panel is labelled by it), `routerLink`, `queryParams` and `href` on a link, and any `data-*`
attribute for tests. A button tab gets `type="button"`.

### Panel contract (page markup)

A tablist's panel is plain markup with `role="tabpanel"`, an `id` equal to the tabs' `panelId`,
`aria-labelledby` the id of the selected tab, and `tabindex="0"`. Either one panel per tab (the
unselected panels carry `hidden`, as the design-system page renders them), or one shared panel whose
`aria-labelledby` and content follow the selected tab, as the expert profile does (every tab has the
same `panelId`).

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default (`Tab`) | text and an optional leading `svg[llIcon]` | The label in words. An icon is decorative (`aria-hidden`) and never replaces the label. The count is not projected; it is the `count` input. |
| default (`Tabs`) | `Tab` elements | The tabs, in order. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Underline | — | The top of a page or card: dashboard, search result types, studio views, profile content types. |
| Pill | `.tabs--pill` | A filter of one list, below a page's own navigation: "Show" upcoming or past, followed experts or collections. |

| Size | Modifier | Height | Padding | Type |
|---|---|---|---|---|
| One | — | `--target-comfortable` | `--space-4` inline | `--text-label` |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | `--color-fg-muted` label on `--color-transparent` | Button: "Videos 3, tab, not selected, 3 of 6". Link: "Videos 3, link" |
| Hover | `:hover` | `--color-bg-subtle` wash, `--color-fg-default` label | — |
| Focus | `:focus-visible` | The shared ring drawn inside the tab (offset `-1 ×` `--focus-ring-width`) so the scrolling list never clips it | The tab is announced |
| Selected | `aria-selected="true"` | `--color-fg-default` label with the underline; pill: `--color-accent-subtle` fill, `--color-fg-accent` label | "selected" |
| Current | `aria-current="page"` | Same visual as selected | "current page" |
| Disabled | `disabled` (buttons) | `--color-fg-disabled` label, `not-allowed` cursor, skipped by arrow keys and Tab | "dimmed" |
| With count | `count` is a number | Plain badge after the label | Read as part of the name: "Videos 3" |
| Overflowing | Tabs wider than the list | The list scrolls sideways; the selected or current tab is scrolled into view | — |

## Markup

```html
<!-- rendered: link tabs, underline (search results) -->
<nav class="tabs" aria-label="Result types">
  <a class="tab" href="/search?q=imago+dei" aria-current="page">All <span class="badge badge--plain">14</span></a>
  <a class="tab" href="/search?q=imago+dei&amp;type=video">Videos <span class="badge badge--plain">3</span></a>
</nav>
```

```html
<!-- rendered: link tabs, pill (my events) -->
<nav class="tabs tabs--pill" aria-label="Show">
  <a class="tab" href="/dashboard/events" aria-current="page">Upcoming <span class="badge badge--plain">2</span></a>
  <a class="tab" href="/dashboard/events/past">Past</a>
</nav>
```

```html
<!-- rendered: tablist (expert profile), one shared panel -->
<div class="tabs" role="tablist" aria-label="Published content by type">
  <button class="tab" type="button" role="tab" id="tab-courses" aria-selected="true" aria-controls="panel-courses">Courses <span class="badge badge--plain">1</span></button>
  <button class="tab" type="button" role="tab" id="tab-videos" aria-selected="false" aria-controls="panel-courses" tabindex="-1">Videos <span class="badge badge--plain">1</span></button>
  <button class="tab" type="button" role="tab" id="tab-files" aria-selected="false" tabindex="-1" disabled>Files</button>
</div>
<div role="tabpanel" id="panel-courses" aria-labelledby="tab-courses" tabindex="0">…</div>
```

The space before the count is a text node in the rendered DOM, so the name reads "Videos 3". The design
system and the mocks write the count without one, which reads "Videos3" in some engines (D-2).

```html
<!-- consumer: link tabs -->
<nav llTabs label="Result types">
  @for (t of types(); track t.id) {
    <a llTab [routerLink]="[]" [queryParams]="t.query" [current]="t.id === type()" [count]="t.count" i18n>{{ t.label }}</a>
  }
</nav>

<!-- consumer: tablist -->
<div llTabs label="Published content by type" i18n-label>
  @for (t of tabs(); track t.id) {
    <button llTab [id]="'tab-' + t.id" panelId="panel-content" [selected]="t.id === active()" [count]="t.count" (activated)="active.set(t.id)" i18n>{{ t.label }}</button>
  }
</div>
<div role="tabpanel" id="panel-content" [attr.aria-labelledby]="'tab-' + active()" tabindex="0">…</div>
```

## Design

- List: `display: flex`; gap `--space-2`; `overflow-x: auto`; hairline `--border-width-hairline`
  `--color-border-default` beneath (pill variant: no border). The list never wraps.
- Tab: `flex: none`; `inline-flex`; gap `--space-2`; minimum height `--target-comfortable`; padding
  `0 --space-4`; `--text-label`; `--radius-sm` (pill variant `--radius-full`); no border; no underline
  text decoration on links.
- Indicator: `--border-width-thick` high, inset `--space-4` from each side, sitting `--border-width-hairline`
  below the tab so it overlays the list's hairline.
- A tab whose label is wider than the list is capped at the list's width and its label wraps; the
  list still never wraps its tabs (D-3).
- Layer: none. Motion: none; the selection changes at once.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Label (default) | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Label (hover, selected, current) | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Hover wash | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |
| Underline | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Pill fill | `--color-accent-subtle` | `--palette-accent-50` | `--palette-accent-950` |
| Pill label | `--color-fg-accent` | `--palette-accent-700` | `--palette-accent-300` |
| Hairline | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Disabled label | `--color-fg-disabled` | `--palette-oat-400` | `--palette-night-500` |
| Focus ring | `--color-focus-ring` | `--palette-accent-700` | `--palette-accent-300` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-muted` | `--color-bg-surface` | 4.5:1 | Unselected label on a surface |
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Unselected label on the page canvas |
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Selected and hovered label |
| `--color-fg-default` | `--color-bg-subtle` | 4.5:1 | Hovered label on its wash |
| `--color-fg-accent` | `--color-accent-subtle` | 4.5:1 | Selected pill label |
| `--color-accent` | `--color-bg-surface` | 3:1 | Underline |
| `--color-focus-ring` | `--color-bg-surface` | 3:1 | Focus ring |

## Responsive behaviour

- The list is one row at every width. When the tabs are wider than the list, as the eight result types
  are at 360 px, the list scrolls sideways inside itself by swipe, trackpad or the Tab key, and the page
  does not scroll horizontally. On first render, and whenever the selected or current tab changes, that
  tab is scrolled into view with `scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'instant' })`,
  never animated.
- At SM and above (768 px) the dashboard, events, studio and profile lists fit without scrolling; the
  search results list scrolls only when the pseudo-locale lengthens its labels.
- At 320 px nothing scrolls horizontally outside the list or clips; at 200 % zoom everything stays
  available; every tab is at least `--target-comfortable` (44 px) tall on touch devices.

## Accessibility

### Role and pattern

- Tablist tabs follow the WAI-ARIA tabs pattern with automatic activation: `div[role=tablist]` named
  by `aria-label`, `button[role=tab]` with `aria-selected` and `aria-controls`, and a
  `role=tabpanel` labelled by its tab.
- Link tabs are links in a named `nav` landmark with `aria-current="page"` on the current one. They
  carry no tab roles: each one loads a page, and the mocks' `role="tab"` on links (D-1) is replaced.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Tablist: moves focus onto the selected tab (the only one in the tab order); the next <kbd>Tab</kbd> moves into the panel. Links: moves through every link in order. |
| <kbd>→</kbd> / <kbd>←</kbd> | Tablist: focuses and selects the next or previous enabled tab, wrapping at the ends. Links: none. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Tablist: focuses and selects the first or last enabled tab. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Button tab: selects it (a no-op when already selected). Link tab: <kbd>Enter</kbd> follows the link. |

### Focus

- Roving `tabindex` on a tablist: the selected tab is `0` and the others `-1`; if no tab is selected
  the first enabled tab is `0`. Selecting by key moves focus with the selection and keeps it there.
- Focus is drawn inside the tab (`--color-focus-ring`, at least 2 CSS px, 3:1) so the scrolling list
  does not clip it, and no sticky header covers a focused tab.
- The panel is focusable (`tabindex="0"`) so keyboard users can scroll its content.

### Labelling

- The list is named by `label`; the names on one page are distinct ("Dashboard", "Show").
- The count is part of the tab's name: "Videos 3". It is never hidden and never wrapped in
  parentheses. Icons are decorative; an icon never stands alone.
- A tablist panel is named by its selected tab through `aria-labelledby`.

### Announcements

- A screen reader announces the new tab as selected when arrow keys move to it; the panel change is
  not announced separately. Link tabs announce "current page" on the current link.
- No live region: the page's own navigation or result announcements (`L2-127`) cover route changes.

### Motion

None: selection changes at once, and scrolling into view is instant for everyone, so reduced motion
changes nothing.

## Content and internationalisation

- One or two nouns in sentence case: "Overview", "Notes", "Shared with me", "Captions and transcript".
  Do not number tabs, end them with punctuation or write instructions.
- Counts are bare numbers: "Videos 3", never "Videos (3)". Formatted with the active locale, so 1,240
  reads "1 240" in French.
- Translatable inputs: the projected label and `label`. Data values: `count`, `id`, `panelId`, routes.
- A label 30 % longer in the pseudo-locale still works: the list scrolls, and a tab wider than the
  list wraps its label (`L2-150`).

## Performance

- Change detection: `OnPush`, signal inputs; `Tabs` reads its tabs with `contentChildren` and reacts
  only to selection changes.
- Perf-test scenario: none in this repository yet; the search results page renders the eight result
  types for a query with 14 matches, and Dr. Abena Mensah's profile renders her five content tabs.
  Page budgets per `L2-120` and `L2-123`.
- Composite scenarios: none.
- Layout stability: the list is `--target-comfortable` tall from the first paint, and the count is part
  of the first render, so tabs add no layout shift.

## Acceptance criteria

### Rendering

- **AC-1** Given a search whose results hold 14 items, when the results page renders, then the "Result types" navigation lists "All 14", "Courses 2", "Modules 1", "Videos 3", "Articles 2", "Collections 1", "Events 1" and "Experts 2" as links, and only "All 14" has `aria-current="page"`. (L2-003)
- **AC-2** Given the search results, when the member follows "Videos 3", then the results narrow to videos, "Videos 3" has `aria-current="page"` and "All 14" no longer does. (L2-003)
- **AC-3** Given Miriam Clarke on "Saved", when the page renders, then the "Dashboard" navigation lists "Overview", "My learning", "Saved 14", "My events", "Certificates" and "Following" as links, and "Saved 14" is the current page. (L2-069)
- **AC-4** Given Miriam on "My events" with two upcoming events, when the page renders, then the pill navigation labelled "Show" lists "Upcoming 2" as the current page and "Past" without a count. (L2-072)
- **AC-5** Given Miriam on "My learning", when she opens the completed items, then the "Show" navigation lists "In progress 3" and "Completed 2", with "Completed 2" as the current page. (L2-070)
- **AC-6** Given Miriam who follows 4 experts and 2 collections, when she opens "Following", then a pill navigation labelled "Following" lists "Experts 4" and "Collections 2", and when she has none, both read "0". (L2-074)
- **AC-7** Given the events page, when it renders, then the navigation labelled "When" lists "Upcoming" as the current page and "Past" as a link, and the "Past" link lists past events. (L2-051)
- **AC-8** Given an editor on the review queue with 5 items waiting, when the page renders, then the "Studio views" navigation lists "All content" and "Review queue 5", with "Review queue 5" as the current page. (L2-077)
- **AC-9** Given the studio page of a video, when it renders, then the "Video" navigation lists "Media" and "Captions and transcript", and following the second link makes it the current page. (L2-041)
- **AC-10** Given the profile of Dr. Abena Mensah, when it renders, then a tablist labelled "Published content by type" holds "Courses 1", "Videos 1", "Articles 3", "Collections 1" and "Events 1" and no "Modules" tab, with "Courses 1" selected. (L2-021)
- **AC-11** Given the profile of The Rev. Canon Dr. Thomas Alexander Hale-Whitcombe, when it renders, then the tablist holds six tabs with the counts 2, 1, 3, 4, 1 and 2. (L2-021)
- **AC-12** Given a tab with `count` of `0`, when it renders, then the badge reads "0"; and given a `count` of `null`, then the tab shows no badge. (L2-072)

### States

- **AC-13** Given the profile tablist with "Courses 1" selected, when the member clicks "Videos 1", then "Videos 1" has `aria-selected="true"` and `tabindex="0"`, every other tab has `aria-selected="false"` and `tabindex="-1"`, and the panel is labelled by "Videos 1" and shows her video. (L2-021)
- **AC-14** Given the underline variant, when a tab is selected or current, then it shows an accent underline of `--border-width-thick` on the list's hairline and `--color-fg-default` text, and unselected tabs show `--color-fg-muted` text with no underline. (L2-021)
- **AC-15** Given the pill variant, when a tab is current, then it shows an `--color-accent-subtle` fill with `--color-fg-accent` text and no underline, and the list has no hairline. (L2-072)
- **AC-16** Given a tablist in which "Files" is disabled, when a user presses → from the tab before it, then focus skips "Files" and a click on it does nothing. (L2-126)
- **AC-17** Given a tab with an icon, when it renders, then the icon is hidden from assistive technology and the label still names the tab. (L2-127)

### Keyboard and focus

- **AC-18** Given the profile tablist with "Courses 1" selected, when a keyboard user tabs in, then focus lands on "Courses 1", and pressing <kbd>Tab</kbd> again moves focus to the panel, not to "Videos 1". (L2-126)
- **AC-19** Given focus on "Courses 1", when the user presses →, then focus and selection move to "Videos 1" and the panel shows her video; pressing ← from "Courses 1" wraps to the last tab. (L2-126)
- **AC-20** Given focus on any tab of the profile tablist, when the user presses End and then Home, then the last tab, then the first, is focused and selected. (L2-126)
- **AC-21** Given the "Dashboard" navigation, when a keyboard user presses <kbd>Tab</kbd>, then each link is reached in visual order, <kbd>Enter</kbd> follows the focused link, and the arrow keys do not move focus between links. (L2-126)
- **AC-22** Given any focused tab, when it is measured, then it shows a focus ring at least 2 CSS px thick with at least 3:1 contrast, drawn fully inside the tab and not clipped by a scrolling list. (L2-126)

### Screen readers

- **AC-23** Given the "Videos 3" tab, when a screen reader reads it, then a link reads "Videos 3, link" (current: "Videos 3, link, current page") and on the long profile a tab reads "Videos 3, tab, 3 of 6, not selected". (L2-127)
- **AC-24** Given a page with the "Dashboard" and "Show" navigations, when the landmarks are listed, then each navigation has a distinct name. (L2-127)
- **AC-25** Given the profile's shared panel, when "Videos 1" is selected, then the panel's `aria-labelledby` points at the "Videos 1" tab and every tab's `aria-controls` points at the panel. (L2-127)

### Theming

- **AC-26** Given the dark theme, when tabs render in both variants, then the underline, the pill fill, the labels, the wash and the hairline use tokens with dark values. (L2-134)
- **AC-27** Given both themes, when contrast is measured, then unselected, selected and hovered labels meet 4.5:1 on their backgrounds, the selected pill label meets 4.5:1 on its fill, and the underline and focus ring meet 3:1. (L2-129)

### Responsive

- **AC-28** Given the eight result types at 360 px with "Events 1" current, when the page loads, then the list scrolls sideways inside itself with "Events 1" in view, the page does not scroll horizontally, and no tab wraps onto a second row. (L2-130)
- **AC-29** Given a touch viewport of 375 px, when any tab is measured, then it is at least 44 CSS px tall, and swiping the list scrolls it without selecting a tab. (L2-132)
- **AC-30** Given the pseudo-locale with labels 30 % longer, when the "Video" navigation renders at 320 px, then no label is clipped, and a tab wider than the list wraps its label inside the list. (L2-150)

### Motion

- **AC-31** Given a user with reduced motion, when selection changes or a tab is scrolled into view, then nothing animates. (L2-129)

### Performance

- **AC-32** Given the search results page on a mobile profile, when it loads with all eight tabs and their counts, then the list is 44 px tall from first paint and adds no layout shift. (L2-120)

## Implementation notes

- Planned. Folder `frontend/projects/components/src/lib/tabs/`, one type per file: `tabs.ts` (`Tabs`),
  `tab.ts` (`Tab`), `tabs-variant.ts` (`TabsVariant`), each with `.html` and `.scss`; a `tabs.scss`
  carrying the `tabs` block rules on `:host` and a `tab.scss` for `.tab`, `.tabs--pill` and the
  indicator. Selectors `nav[llTabs], div[llTabs]` and `a[llTab], button[llTab]` (attribute components;
  `Tab` has a template with `<ng-content />`, a space and `@if (count() !== null)`
  `<span llBadge [plain]="true">{{ count() | number }}</span>`).
- `Tab` injects `Tabs` (optional) to decide its kind and role; `Tabs` uses `contentChildren(Tab)` for
  roving focus (arrow, Home and End skip disabled tabs) and to scroll the selected or current tab into
  view after render.
- Composes [badge](badge.md) (`span[llBadge]`, `plain`) and [icon](icon.md) (`svg[llIcon]`).
- Link tabs take `routerLink` and `queryParams` on the anchor itself; the component does not read the
  router, so the page sets `current`.
- `.tab` needs `max-width: 100%` for D-3, and the design-system page needs the plain-badge count and the
  `nav`-hosted list recorded (D-1, D-2, D-4).

## Decisions

- **D-1** *The mocks render "Show" and "Following" as `div[role=tablist]` of links with `role="tab"` and
  `aria-selected`, which the design-system page does not allow. Which is it?* Link tabs. These tabs each
  load a different page and have no panel, which the design-system page names as navigation tabs
  ("links in a named `nav` with `aria-current="page"`, not ARIA tabs"); a `role=tab` without a panel and
  without arrow-key behaviour breaks the ARIA tabs pattern (`L2-127`). The mocks `my-events/*`,
  `my-learning/*` and `following/*` change to `<nav class="tabs tabs--pill" aria-label="…">` with
  `aria-current="page"` and no tab roles.
- **D-2** *The mocks render a count as `.chip__count` in link tabs and `.badge.badge--plain` in tablists;
  which one?* The plain badge, as the design-system page defines ("a plain badge after the label"). A
  tab count is a badge, `.chip__count` belongs to the chip, and one rendering lets one component serve
  every host. The mocks' `<span class="chip__count">` in the navigation tabs change to `<span class="badge
  badge--plain">`. The rendered DOM also gets a space before the count so the name reads "Videos 3"; the
  design system and mocks put none.
- **D-3** *`L2-150` says tabs reflow rather than overflow, the design-system page says the list never
  wraps.* Both: the list never wraps its tabs and scrolls inside itself (like a table, `L2-130`), and a
  single tab wider than the list is capped at `max-width: 100%` with a wrapping label, so no tab ever
  overflows the list. The cap is new to the design-system page.
- **D-4** *Is `nav[llTabs]` the host, or a `.tabs` `div` inside a `nav` as the design-system page draws
  it?* The `nav` itself carries `.tabs`, as the mocks do (402 anchors, 46 times for "Dashboard"); a
  wrapper adds a node with no purpose. The design-system page draws the wrapped form and should follow.
- **D-5** *Who owns the selection of a tablist?* The page. `Tab` has a `selected` input and an
  `activated` output, not a model, because exactly one tab is selected and only the page knows which;
  the keyboard arrows emit `activated` on the tab they land on (automatic activation, as the design
  system's "Try the arrow keys" and APG default). Manual activation is not offered: no panel in the
  product is slow to load.
- **D-6** *Can a link tab be disabled?* No: no mock renders one and a disabled link is not focusable or
  followable. A page removes or replaces an unavailable link. Disabled exists for button tabs, from the
  design-system page.
- **D-7** *Does the count format itself?* Yes. `count` is a number so the component can format it with
  the active locale (and so `0` renders and `null` does not); the page never builds the string.
- **D-8** *The selected tab scrolls into view how?* Instantly (`inline: 'nearest'`, `behavior: 'instant'`, so a smooth-scrolling
  page never animates it), once after first render and on each change of the selected or current tab, in line with the
  design-system page ("the selected tab is scrolled into view on load") and with the no-animation rule.
- **D-9** *`aria-label` or `aria-labelledby` for the list?* `label` only: every use in the mocks is a
  short fixed name ("Dashboard", "Result types"); the design-system page allows either, and one input
  keeps the API small.
- **D-10** *Does `badge.md` list tabs under the count tone?* Its usage table says so; the mocks and the
  design-system page use `badge--plain` in tabs (D-2), and `badge.md` should read "plain" for that row.
  This CRD does not edit it.
