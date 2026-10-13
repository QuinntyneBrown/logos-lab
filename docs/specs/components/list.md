# List

| Field | Value |
|---|---|
| Selector | `ul[llList]`, `ol[llList]`, `a[llExternalLink]` |
| Library path | `frontend/projects/components/src/lib/list/` |
| Status | planned |
| Traces to | L2-020, L2-021, L2-025, L2-033, L2-038, L2-041, L2-046, L2-047, L2-056, L2-067, L2-077, L2-082, L2-117, L2-120, L2-125, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-147, L2-150 |
| Design system | [`list.html`](../../design-system/components/list.html), [`link.html`](../../design-system/components/link.html) |
| Source mocks | [`pages/expert-profile/default`](../../mocks/pages/expert-profile/default.html), [`pages/expert-profile/empty`](../../mocks/pages/expert-profile/empty.html), [`pages/expert-profile/long`](../../mocks/pages/expert-profile/long.html), [`dialogs/unfollow/success`](../../mocks/dialogs/unfollow/success.html), [`dialogs/add-to-calendar/default`](../../mocks/dialogs/add-to-calendar/default.html), [`pages/course-overview/default`](../../mocks/pages/course-overview/default.html), [`pages/module-page/default`](../../mocks/pages/module-page/default.html), [`dialogs/request-changes/default`](../../mocks/dialogs/request-changes/default.html), [`dialogs/delete-account/default`](../../mocks/dialogs/delete-account/default.html), [`dialogs/block-member/default`](../../mocks/dialogs/block-member/default.html), [`dialogs/submit-for-review/default`](../../mocks/dialogs/submit-for-review/default.html), [`pages/article-editor/default`](../../mocks/pages/article-editor/default.html), [`pages/course-builder/default`](../../mocks/pages/course-builder/default.html), [`pages/collection-builder/default`](../../mocks/pages/collection-builder/default.html), [`pages/studio-editor/default`](../../mocks/pages/studio-editor/default.html), [`pages/studio-module-package/failed`](../../mocks/pages/studio-module-package/failed.html), [`pages/studio-video-captions/default`](../../mocks/pages/studio-video-captions/default.html), [`pages/studio-video-media/default`](../../mocks/pages/studio-video-media/default.html), [`pages/studio/onboarding`](../../mocks/pages/studio/onboarding.html) |
| Rendering | [`list.html`](list.html) |

## Purpose and scope

A list is a single column of short items, one under the other: the links in an "Elsewhere" panel, the
steps and rules in a dialog, the checks under "Before you submit", the learning outcomes of a course.
Items are separated by hairlines, or sit close together in the plain variant when the card around the
list already groups them. An item holds a link, a line of text, or a status line from an
[inline message](inline-message.md). The component ships two parts that always travel together in the
mocks:

- **`List`** (`ul[llList]`, `ol[llList]`): the list itself, with the hairline and plain variants, the
  current-item and busy states, and the name.
- **`ExternalLink`** (`a[llExternalLink]`): the external link pattern. A link to another site opens in a
  new tab, is marked `rel="noopener noreferrer"`, and says so to assistive technology through visually
  hidden text. An expert's "Elsewhere" links are the main use (L2-021 AC3); the calendar links in the
  add-to-calendar dialog are the other.

Use [person list](person-list.md) for experts with a photo and a line of context, a table for fields
people compare across items, [tabs](tabs.md) or [sidebar navigation](sidebar-navigation.md) for the
sections of a page or an area, and [chips](chip.md) for topics. An in-application link is a plain
`<a routerLink>`; only a link that leaves the product is an `ExternalLink`.

Out of scope:

- The `.rows` block of the design-system list page (photo, title, meta and a trailing slot). Mocks use
  it on 16 screens (account menu, following, notification settings, video page, content history, policy,
  report detail and others). It is a different block from `.list` and has no CRD yet; the person-list
  CRD covers only the experts' rows (D-9).
- Bulleted and numbered lists inside running text, such as an article body or a policy page. They keep
  their markers and live in the prose component (D-3).
- The empty state that replaces a list with no items, the skeleton rows in a loading list, and the
  status lines inside items: [empty state](empty-state.md), [skeleton](skeleton.md) and
  [inline message](inline-message.md) own them. The page decides when to show each.
- Plain inline links, `.link-standalone`, `.link-danger` and the other link styles of the design-system
  link page. They are global element rules, not components; only the external link is a component
  (D-1).
- Links in member comments (`rel="nofollow ugc noopener noreferrer"`, L2-062), which the server writes
  into the sanitised HTML.
- Which items are in a list, their order, and what happens when an item is activated: the page owns
  them.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/expert-profile/{default,following,rate-limited}`, `dialogs/unfollow/success` "Elsewhere" | `ul[llList] plain` of `li > a[llExternalLink]`, `externalLabel` "(external site, opens in a new tab)" | "Faculty page", "Made, Not Manufactured", "Sermons and lectures" (Dr. Abena Mensah) | default, hover, focus | aside card on the canvas |
| `pages/expert-profile/empty` "Elsewhere" | the same, one item | "Research page" (Dr. Mei Lin Chen) | default | aside card |
| `pages/expert-profile/long` "Elsewhere" | the same, five items | "Faculty profile and publications", "Christian Ethics for AI Builders, the companion reading list", "Sermons, lectures and occasional writing", "Writing an AI policy for your church: templates", "Diocesan working group on technology" (The Rev. Canon Dr. Thomas Alexander Hale-Whitcombe) | default, wrapping at 320 px | aside card |
| `dialogs/add-to-calendar/default` | `ul[llList] label="Calendar options"`, hairlines; items with a leading `svg.icon`; two use `a[llExternalLink]` with `externalLabel` "(opens in a new tab)" | "Download a calendar file (.ics)" (a plain link), "Open in Google Calendar", "Open in Outlook.com" | default, hover, focus | dialog body |
| `pages/course-overview/*` (eight states) "What you'll learn" | `ul[llList]`, hairlines, text items | "Explain what Genesis means by “image” and “likeness”, and why the words matter" and 4 to 7 more (8 in `long`) | default | canvas |
| `pages/module-page/*` (five states) "What you'll do" | `ul[llList]`, hairlines, text items | "Sort 24 training examples and see what a model learns from them", "Trace one unfair outcome back to the data", "Answer five scored questions; 80% passes" | default | canvas |
| `dialogs/request-changes/*` "3 comments go with it" | `ul[llList]`, hairlines; each item is `span` with a bold lead-in | "Summary. It calls the sample data “unbiased”, but scene 4 argues no data set is." and two more | default, busy, failed, invalid | dialog body |
| `dialogs/block-member/*`, `dialogs/delete-account/*` consequences | `ul[llList] plain`, text items | "Samuel can't message you or start a conversation with you." (4 items); "Your account is deactivated now, and you're signed out on every device." (5 items, 10 in `scroll`) | default, busy, failed, invalid, scroll | dialog body |
| `dialogs/submit-for-review/*` "Ready to submit", "Already done" | `ul[llList] plain`; each item `span[llInlineStatus]` success | "Title, summary, topics and level" and three more; one item in `invalid` | default, busy, failed, invalid | dialog body |
| `pages/studio-editor/*` (twelve states), `pages/collection-builder/*`, `pages/course-builder/*`, `pages/event-editor/empty`, `pages/studio-video-captions/*`, `pages/studio-video-media/*`, `pages/studio-profile/onboarding` "Before you submit" | `ul[llList] plain`; each item `span[llInlineStatus]` with tone success, danger, warning or neutral and a visually hidden state word (", done", ", needs fixing", ", still to do") | "Title, 5 to 120 characters", "Summary, 50 to 300 characters", "1 to 5 topics, and a level", "Cover image with alt text" | done, needs fixing, still to do, warning | aside card |
| `pages/studio/onboarding` "Profile checklist" | `ul[llList] plain label="Profile checklist"`, `span[llInlineStatus]` items | "Photo", "Professional title", "Bio, 100 to 2,000 characters", "At least one area of expertise" | done, still to do | aside card |
| `pages/article-editor/*` "Outline" | `ol[llList] plain` of `li > a` to `#body` | "What the image is not", "Representing, not resembling", "Three things a model cannot do (heading 4)" | default, invalid (a skipped heading level named in the item) | aside card |
| `pages/article-editor/*` "Images in the body" | `ul[llList] plain`, one item holding two `span[llInlineStatus]` | "coffee-together.jpg" and "No alt text" | default, danger | aside card |
| `pages/course-builder/*` "Related content" | `ol[llList] plain`; each item `span[llInlineStatus]` with a leading icon | "A Personhood Reading List", "Christian Ethics for AI Builders" | default, reordering | aside card |
| `pages/studio-module-package/*` rules and errors | `ul[llList] plain`, text items | "A .zip file of 500 MB or less", "imsmanifest.xml at the top level of the zip"; the three refusal reasons in `failed` | default, failed | aside card, panel |
| `pages/studio-video-captions/*`, `pages/studio-video-media/*` rules | `ul[llList] plain`, text items | "Every video needs at least one English track before you can submit it.", "MP4, MOV or WebM, up to 10 GB." | default | aside card |

Every row is buildable with the API below: `plain` and the element choose the variant, `label` names the
list, the consumer writes the `li` items, and `a[llExternalLink]` with its `externalLabel` covers every
link that leaves the product. The design-system pages also show the current item (`aria-current`), the
busy list and the navigation list; no mock uses them yet, so they follow the design-system pages
(D-6, D-7). The thirteen `margin-top` inline styles in the course overview and module page mocks are
the page's own spacing between heading and list; the list owns no outer margin (D-8).

## Anatomy

1. **List** — `.list`, a `ul` or `ol`: a one-column grid with no marker and no padding. It is the host
   element. With `plain` it also has `.list--plain`.
2. **Item** — `.list > li`, the consumer's own `li`. It has `--space-3` padding above and below and, in
   the default variant, a `--border-width-hairline` bottom border in `--color-border-default`. The last
   item keeps its border, as in the design-system page.
3. **Link (optional)** — `.list a`: an `a` that fills the item as a flex row, centred, with a
   `--space-3` gap and a minimum height of `--target-comfortable`. It keeps the underline of every link.
4. **Leading icon (optional)** — a projected `svg.icon`, `aria-hidden="true"`, in front of the link text.
5. **Text or status (optional)** — the item's content when it is not a link: a sentence, a bold lead-in
   and a sentence, or an inline message.
6. **External marker** — inside `a[llExternalLink]`: `span.vh`, the visually hidden text " (external
   site, opens in a new tab)", directly after the link text. It is the only part of the external link
   the component adds.
7. **External glyph (optional)** — inside `a[llExternalLink]` with `icon`: `svg.icon.icon--sm`,
   `aria-hidden="true"`, after the hidden text. No mock draws it (D-4).

Host: the consumer's own `<ul>`, `<ol>` or `<a>`; the component adds classes, attributes and, for the
external link, the hidden text and glyph after the projected content. The consumer writes every `li`.

## API

### Inputs

`List` (`ul[llList]`, `ol[llList]`):

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `plain` | `boolean` | `false` | no | `true` adds `.list--plain`: no hairline between items. Use it when the container (card, dialog, aside) already groups the items. |
| `label` | `string \| null` | `null` | no | Sets `aria-label` on the list. A list is named when it is a section by itself ("Calendar options", "Profile checklist"). A list under a visible heading is named with a native `aria-labelledby`, or left unnamed when the section already carries the name (D-6). The component never overwrites a native `aria-labelledby`. |
| `busy` | `boolean` | `false` | no | `true` sets `aria-busy="true"` on the list, for a list whose items are skeleton rows. `false` renders no attribute. |

`ExternalLink` (`a[llExternalLink]`):

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `href` | `string` | none | yes | The destination, an absolute `https://` URL (L2-021 AC3). The component writes it to the host's `href`. See the rule below for any other value. |
| `externalLabel` | `string` | none | yes | The translated phrase read after the link text, with its parentheses: "(external site, opens in a new tab)". The component prefixes one space; the consumer does not. The component holds no copy of its own (D-5). |
| `icon` | `boolean` | `false` | no | `true` draws the external glyph after the link text, as in the design-system link page. |

- Inputs are signal inputs; `plain` is the only input of `List` that adds a class, and `busy` the only
  one that adds an attribute besides the name.
- `List` always renders `class="list"` and `role="list"` (D-2). The consumer's own classes, `id` and
  ARIA attributes stay on the host.
- `ExternalLink` always renders `target="_blank"` and `rel="noopener noreferrer"`. A `target` or `rel`
  written by the consumer is replaced, so a caller cannot weaken the pair.
- An `href` that is missing, relative, `http://`, `mailto:` or `javascript:` is not an external link.
  The component renders the host without `href`, `target`, `rel`, the hidden text and the glyph, so the
  element is plain text rather than a link that claims to be external; in development it also throws an
  error that names the value. The API never saves such a link (L2-021 AC3); the rule is the second line
  of defence.
- The consumer's classes (`link-standalone`, `link-danger`), `id`, ARIA attributes and projected content
  stay on the host. A leading `svg.icon` is projected like any content.

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| None | | `List` and `ExternalLink` are native elements; the consumer listens to the native `click` on an item or link, and a link follows its `href` without help. |

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default (`List`) | `li` elements only | The consumer writes each `li`. An item holds a link, text, or an inline status; one primary link per item. A control that is not a link goes in the item's own markup. |
| default (`ExternalLink`) | link text, with an optional leading `svg.icon` | The text says where the link goes and is the visible name: "Faculty page", not "click here". The hidden text and glyph come after it and are not projected. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Hairlines | `.list` | Items that need a visible rule between them: the calendar options, "What you'll learn", the comments in a change request. |
| Plain | `.list--plain` | Short groups inside a card, dialog or aside: the "Elsewhere" links, the checks, the consequences. |
| Unordered | `ul[llList]` | Items with no sequence. |
| Ordered | `ol[llList]` | Items whose order matters and is read out: the article outline, pinned related content. No numerals are drawn (D-4). |
| Navigation | `nav > ul[llList] plain` | A list of links to sections, with the current one marked `aria-current="page"`. The `nav` and its label belong to the page. |

| Item content | Markup | Use for |
|---|---|---|
| Link | `li > a` | One destination per item, with an optional leading `svg.icon`. |
| External link | `li > a[llExternalLink]` | A destination on another site. |
| Text | `li` with text, or `li > span` with a `strong` lead-in | Rules, outcomes, consequences, refusal reasons. |
| Status | `li > span[llInlineStatus]` | A check that is done, still to do, needs fixing or has a warning. |

There is one size. Every item has `--space-3` of padding above and below; a link inside has at least
`--target-comfortable` of height, so an item with a link is at least 68 px tall at the default scale. An
item with text is as tall as its lines plus the padding. Text in an item uses `--text-body`; status
lines use their own `--text-body-sm`.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Items in `--color-fg-default`; links in `--color-fg-link`, underlined, `--border-width-hairline` thick, offset `--link-underline-offset` | List, with the item count; each link by its text |
| Link hover | `:hover`, `data-state="hover"` | `--color-fg-link-hover` text, underline `--border-width-thick` thick | — |
| Link focus | `:focus-visible`, `data-state="focus"` | `--focus-ring-width` ring in `--color-focus-ring`, offset `--focus-ring-offset`, `--radius-sm` | Focus announced with the name |
| Current page | `a[aria-current="page"]` | `--color-accent-subtle` fill, `--color-fg-accent` text, `--font-weight-semibold` | "current page" |
| Current item | `[aria-current="true"]` on the item or link | `--color-accent-subtle` fill, for the item shown beside a list in a split view | "current" |
| Busy | `busy`, `aria-busy="true"` | Skeleton items of the same shape: three `li > span.skeleton.skeleton--text`, the second `.is-short` | The list is busy; skeletons are not read |
| External | `a[llExternalLink]` | The link looks like any link; the optional glyph follows the text | Name ends with the hidden text, "Faculty page (external site, opens in a new tab)" |
| Invalid external | `href` is not `https://` | Plain text, not a link | Not announced as a link |
| Empty | no items | The page shows an empty state instead of the list | Owned by the empty state |

A link is never disabled: when a destination is not available the page removes the link and shows plain
text that says why (design-system link page). Status tones inside items (done, needs fixing) are the
inline message's states, not the list's.

## Markup

```html
<!-- rendered: plain list of external links (expert-profile default, "Elsewhere") -->
<ul class="list list--plain" role="list" aria-labelledby="elsewhere-title">
  <li><a href="https://kingsgate.example.ca/faculty/mensah" target="_blank" rel="noopener noreferrer">Faculty page<span class="vh"> (external site, opens in a new tab)</span></a></li>
  <li><a href="https://made-not-manufactured.example.ca" target="_blank" rel="noopener noreferrer">Made, Not Manufactured<span class="vh"> (external site, opens in a new tab)</span></a></li>
  <li><a href="https://abenamensah.example.ca/talks" target="_blank" rel="noopener noreferrer">Sermons and lectures<span class="vh"> (external site, opens in a new tab)</span></a></li>
</ul>

<!-- rendered: external link with the glyph (design-system link page) -->
<a class="link-standalone" href="https://parks.example.ca/field-day-map" target="_blank" rel="noopener noreferrer">Field Day park map<span class="vh"> (opens in a new tab)</span> <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5"/><path d="M19 5 11 13"/><path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/></svg></a>

<!-- rendered: hairline list with leading icons (add-to-calendar) -->
<ul class="list" role="list" aria-label="Calendar options">
  <li><a href="/events/imago-dei-and-machine-personhood.ics"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v12M7 11l5 5 5-5"/><path d="M4.5 15v3.5A1.5 1.5 0 0 0 6 20h12a1.5 1.5 0 0 0 1.5-1.5V15"/></svg>Download a calendar file (.ics)</a></li>
  <li><a href="https://calendar.google.com/calendar/render?action=TEMPLATE" target="_blank" rel="noopener noreferrer"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="15" rx="2.5"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/></svg>Open in Google Calendar<span class="vh"> (opens in a new tab)</span></a></li>
</ul>

<!-- rendered: hairline text list (course-overview, "What you'll learn") -->
<ul class="list" role="list" aria-labelledby="learn-title">
  <li>Explain what Genesis means by “image” and “likeness”, and why the words matter</li>
  <li>Tell the difference between representing God and resembling human abilities</li>
</ul>

<!-- rendered: plain status list (studio-editor, "Before you submit") -->
<ul class="list list--plain" role="list">
  <li><span class="inline-status inline-status--success"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Title, 5 to 120 characters<span class="vh">, done</span></span></li>
  <li><span class="inline-status inline-status--danger"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5.5M12 16.2v.3"/></svg>Summary, 50 to 300 characters<span class="vh">, needs fixing</span></span></li>
</ul>

<!-- rendered: ordered plain list of anchors (article-editor, "Outline") -->
<ol class="list list--plain" role="list" aria-labelledby="outline-title">
  <li><a href="#body">What the image is not</a></li>
  <li><a href="#body">Representing, not resembling</a></li>
</ol>

<!-- rendered: navigation list with the current page -->
<nav aria-label="Harbour Notes sections"><ul class="list list--plain" role="list">
  <li><a href="/overview" aria-current="page">Overview</a></li>
  <li><a href="/agenda">Field Day agenda</a></li>
</ul></nav>

<!-- rendered: busy list -->
<ul class="list" role="list" aria-busy="true" aria-label="Loading notebooks">
  <li><span class="skeleton skeleton--text"></span></li>
  <li><span class="skeleton skeleton--text is-short"></span></li>
  <li><span class="skeleton skeleton--text"></span></li>
</ul>
```

```html
<!-- consumer -->
<h2 class="aside-card__title" id="elsewhere-title" i18n>Elsewhere</h2>
<ul llList plain aria-labelledby="elsewhere-title">
  @for (link of profile().links; track link.url) {
    <li><a llExternalLink [href]="link.url" [externalLabel]="externalSiteLabel">{{ link.label }}</a></li>
  }
</ul>

<ul llList label="Calendar options" i18n-label>
  <li><a llExternalLink [href]="googleUrl()" externalLabel="(opens in a new tab)" i18n-externalLabel>
    <svg llIcon name="calendar" aria-hidden="true"></svg>Open in Google Calendar</a></li>
</ul>

<ol llList plain aria-labelledby="outline-title">
  @for (heading of outline(); track heading.id) {
    <li><a [routerLink]="[]" [fragment]="heading.id">{{ heading.text }}</a></li>
  }
</ol>
```

## Design

- List: `display: grid`, `list-style: none`, no padding, no margin. Items are the consumer's `li`
  elements, reached by `:host ::ng-deep > li` as the other library components reach projected content.
- Item: `--space-3` padding above and below; `--border-width-hairline` solid `--color-border-default`
  bottom border; in `.list--plain` the border is `0`.
- Link: `display: flex`, `align-items: center`, `--space-3` gap, `min-height: var(--target-comfortable)`.
  The underline stays; thickness `--border-width-hairline`, offset `--link-underline-offset`, and
  `--border-width-thick` on hover.
- Wrapping: items and links use `overflow-wrap: anywhere`, so a long name, a long phrase or a URL used as
  link text wraps inside the item and never widens it (D-10). The leading icon is `flex: none`.
- Current: `--color-accent-subtle` fill; the page link also takes `--color-fg-accent` and
  `--font-weight-semibold`.
- External marker: the `.vh` utility of the shared foundations styles (clipped, one hairline square,
  `position: absolute`). The component adds no style of its own to it. The glyph is `--space-4` square
  and `currentColor`.
- Motion: link colour changes over `--duration-fast` with `--ease-standard`, only when
  `prefers-reduced-motion: no-preference`.
- Forced colours: links keep the system link colour and the focus ring uses `Highlight`; the current
  fill relies on the underline and bold, not on colour alone.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Text | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Hairline | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Link | `--color-fg-link` | `--palette-accent-700` | `--palette-accent-300` |
| Link hover | `--color-fg-link-hover` | `--palette-accent-800` | `--palette-accent-200` |
| Current fill | `--color-accent-subtle` | `--palette-accent-50` | `--palette-accent-950` |
| Current text | `--color-fg-accent` | `--palette-accent-700` | `--palette-accent-300` |
| Focus ring | `--color-focus-ring` | `--palette-accent-700` | `--palette-accent-300` |
| Surface | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Text items |
| `--color-fg-link` | `--color-bg-surface` | 4.5:1 | Links |
| `--color-fg-link-hover` | `--color-bg-surface` | 4.5:1 | Hovered links |
| `--color-fg-accent` | `--color-accent-subtle` | 4.5:1 | Current page |
| `--color-focus-ring` | `--color-bg-surface` | 3:1 | Focus indicator |

The hairline is a separator, not a control boundary, so it has no contrast minimum; the items and their
text identify each row (as the [chip](chip.md) resting border, D-4 there).

## Responsive behaviour

- A list is one column at every width and never scrolls sideways. It fills its container, whether the
  main column, a 320 px dialog body or an aside card.
- A link and a text item wrap onto further lines; the leading icon stays on the first line's side and
  the text column shrinks. A long URL used as the link text wraps at any character (L2-150).
- At XS to MD every link row is at least 44 px tall: `--target-comfortable` is 44 CSS px, more than the
  24 CSS px minimum of WCAG 2.2 AA, and neighbouring links are separated by the padding of their items.
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom every item stays available; at 400 %
  zoom on a 1280 px width the list reflows in its single column.
- In a split view from 1024 px the list pane marks the open item as current; the layout is the page's.

## Accessibility

### Role and pattern

A native `ul` or `ol`, with `role="list"` written on the host so the semantics survive
`list-style: none` in Safari and VoiceOver (D-2). Items are native `li`. A link is a native `<a href>`
(APG Link). An external link adds `target="_blank"` and the hidden text; it is still an `<a>` with no
role. A navigation list sits in a `nav` that has its own label.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Moves to and from each link and each control inside an item, in visual order. Items with only text are skipped. |
| <kbd>Enter</kbd> | Follows the focused link; an external link opens in a new tab and leaves the page where it was. |

### Focus

The shared `--color-focus-ring` outline, `--focus-ring-width` thick and offset `--focus-ring-offset`,
shows on `:focus-visible` around the link. The item's `--space-3` padding leaves room, so the ring is not
clipped by the neighbouring item or the list. An external link that opens a new tab does not move focus
in the original tab.

### Labelling

- A list is named by its section: `label` for a stand-alone list, a native `aria-labelledby` pointing
  at a visible heading ("Elsewhere", "Outline"), or the surrounding labelled section.
- A link's text says where it goes: "Faculty page", "Download a calendar file (.ics)". An external link's
  name continues with the hidden text: "Faculty page (external site, opens in a new tab)", so the visible
  label is contained in the name (L2-127 AC2).
- A leading icon is `aria-hidden="true"`; the name comes from the text.
- A status item's state is the hidden word after the text (", done", ", needs fixing"), written by the
  consumer inside its inline message.
- The current item is marked with `aria-current`, never by colour or weight alone.

### Announcements

A screen reader announces "list, 3 items" on entering the list and "Faculty page (external site, opens
in a new tab), link" on a link. The list announces nothing else. A busy list is announced as busy; the
page owns the polite status that says when it has loaded.

### Motion

Under `prefers-reduced-motion: reduce` the link colour change is instant.

## Content and internationalisation

- Lead each item with the name people look for ("Faculty page", "Harbour Notes"). Link text is
  sentence case, and a file link names its type and size: "Download a calendar file (.ics)". Order items
  by what people need first and say how in the heading when it is not obvious.
- Items are short facts, one idea each, with a full stop only when the item is a sentence ("Samuel
  can't message you or start a conversation with you."). A list of more than about eight items is a
  table or a page.
- `externalLabel` is a complete translated phrase with its parentheses, "(external site, opens in a new
  tab)" or "(opens in a new tab)"; the component adds the one space before it. Strings with variables use
  ICU message format, never concatenation (L2-147).
- Translatable inputs: `label`, `externalLabel`. Data values: the link text and `href` (an expert's
  `links` are `{ label, url }` from the profile), the item text.
- A label 30 % longer wraps inside the item; nothing is clipped.

## Performance

- Change detection: `OnPush`, signal inputs. `List` has no template logic beyond `<ng-content />`;
  `ExternalLink` is one `computed` that decides whether `href` is a valid `https://` URL.
- Perf-test scenario: no perf-test project exists in this repository yet (see [chip](chip.md) D-3 and
  [button](button.md) D-3); the list is measured through the page budgets of `L2-120` and `L2-123`. The
  measured scenario is the expert profile of The Rev. Canon Dr. Thomas Alexander Hale-Whitcombe with
  its five "Elsewhere" links, and the studio editor's "Before you submit" list of five checks.
- Composite scenarios: none.
- Layout stability: the list has no size of its own, so it grows with its items; a busy list renders
  three skeleton items of the same row height, so replacing them with the loaded items shifts nothing
  below. No image or font loads inside a list.
- Weight: `List` is a template-only component; `ExternalLink` imports only the icon component, and only
  renders it when `icon` is set.

## Acceptance criteria

### Rendering

- **AC-1** Given the expert profile of Dr. Abena Mensah, when the "Elsewhere" list renders, then it is a `ul.list.list--plain` of three links, "Faculty page", "Made, Not Manufactured" and "Sermons and lectures", with no markers and no hairline between items. (L2-021)
- **AC-2** Given an expert's external link, when it renders, then the `a` has an `https://` `href`, `target="_blank"` and `rel="noopener noreferrer"`, and a consumer-written `rel="noopener"` or `target="_self"` on it is replaced. (L2-021)
- **AC-3** Given the link "Faculty page", when it renders, then its visible text is "Faculty page" and it ends with `span.vh` whose text is one space followed by "(external site, opens in a new tab)", which is clipped and takes no room. (L2-021)
- **AC-4** Given the profile of The Rev. Canon Dr. Thomas Alexander Hale-Whitcombe with five links, when the list renders, then all five show in order, including "Christian Ethics for AI Builders, the companion reading list", and the list stays within its aside card. (L2-021)
- **AC-5** Given the profile of Dr. Mei Lin Chen with one link, when the list renders, then it holds the single item "Research page" and is still a list. (L2-021)
- **AC-6** Given an `ExternalLink` whose `href` is `http://example.ca`, `/experts` or `javascript:alert(1)`, when it renders, then it has no `href`, `target`, `rel` or hidden text, it is not announced as a link, and in development an error names the value. (L2-021)
- **AC-7** Given the add-to-calendar dialog for "Imago Dei and Machine Personhood", when the options render, then a `ul.list` named "Calendar options" shows three items separated by hairlines, each link with a leading icon, and "Open in Google Calendar" and "Open in Outlook.com" end with the hidden text "(opens in a new tab)". (L2-056)
- **AC-8** Given the course "Imago Dei in an Age of Machines", when "What you'll learn" renders, then it is a `ul.list` of text items separated by hairlines, with no marker and no link styling. (L2-025)
- **AC-9** Given the module "Bias in the Training Data", when "What you'll do" renders, then it is a `ul.list` of three text items separated by hairlines. (L2-038)
- **AC-10** Given the delete-account dialog for Miriam Clarke, when the consequences render, then a `ul.list.list--plain` shows five text items, beginning "Your account is deactivated now, and you're signed out on every device.". (L2-117)
- **AC-11** Given the block-member dialog for Samuel Okafor, when it renders, then a `ul.list.list--plain` shows four items, beginning "Samuel can't message you or start a conversation with you.". (L2-067)
- **AC-12** Given the request-changes dialog with three comments, when it renders, then a `ul.list` of three items separated by hairlines shows each comment with its bold lead-in ("Summary.", "Cover image."). (L2-077)
- **AC-13** Given the studio editor for an article that fails four checks, when "Before you submit" renders, then a `ul.list.list--plain` shows five `inline-status` items, one done and four needing fixing, each with its hidden state word. (L2-082)
- **AC-14** Given the article editor, when "Outline" renders, then it is an `ol.list.list--plain` of three links to `#body`, named "Outline" by its heading, and "Three things a model cannot do (heading 4)" names the skipped level. (L2-046)
- **AC-15** Given the course builder with the pinned items "A Personhood Reading List" and "Christian Ethics for AI Builders", when "Related content" renders, then an `ol.list.list--plain` shows them in the pinned order. (L2-047)
- **AC-16** Given the package "Image and Likeness: A Guided Reading" that failed validation, when the reasons render, then a `ul.list.list--plain` shows the three refusal reasons, each as its own item, beginning "imsmanifest.xml is inside a folder". (L2-033)
- **AC-17** Given a video with no caption track, when the captions rules render, then a `ul.list.list--plain` shows three text items, beginning "Every video needs at least one English track before you can submit it.". (L2-041)
- **AC-18** Given a new expert's studio, when "Profile checklist" renders, then a list named "Profile checklist" shows "Photo, done", "Professional title, done", "Bio, 100 to 2,000 characters, still to do" and "At least one area of expertise, still to do". (L2-020)

### States

- **AC-19** Given the "Elsewhere" list, when the pointer is over "Faculty page", then its text takes `--color-fg-link-hover` and its underline thickens to `--border-width-thick`. (L2-129)
- **AC-20** Given a navigation list in a `nav` named "Harbour Notes sections", when "Overview" is the open page, then its link has `aria-current="page"`, the `--color-accent-subtle` fill, `--color-fg-accent` text and semibold weight, and no other link has them. (L2-127)
- **AC-21** Given a list that is loading, when it renders, then it has `aria-busy="true"` and three skeleton items hidden from assistive technology, and when the items arrive nothing below the list moves. (L2-120)
- **AC-22** Given a list with `busy` false, when it renders, then it has no `aria-busy` attribute. (L2-127)

### Keyboard and focus

- **AC-23** Given the profile's "Elsewhere" list, when the user tabs through it, then focus reaches each link once in visual order, and <kbd>Enter</kbd> opens the destination in a new tab while the profile page stays where it was. (L2-126)
- **AC-24** Given any link in a list, when it receives keyboard focus, then a `--color-focus-ring` outline at least 2 CSS px thick with at least 3:1 contrast against the surface is visible and not clipped by its item or the list. (L2-126)

### Screen readers

- **AC-25** Given "Faculty page", when it is read by a screen reader, then it is announced as "Faculty page (external site, opens in a new tab), link", and the visible label "Faculty page" is contained in the name. (L2-127)
- **AC-26** Given the "Elsewhere" list under its heading, when it is inspected, then it has `role="list"`, is named "Elsewhere" by `aria-labelledby`, and is announced with its item count; and given a list with `list-style: none`, then it still exposes list semantics in Safari. (L2-127)
- **AC-27** Given "Download a calendar file (.ics)" with its leading icon, when it is inspected, then the icon is `aria-hidden` and the accessible name is the text alone. (L2-127)
- **AC-28** Given every list state in the mocks, when an automated accessibility scan (axe-core) runs, then it reports zero serious or critical violations. (L2-125)

### Theming

- **AC-29** Given the "Elsewhere" and calendar lists in the dark theme, when each state renders (default, hover, focus, current), then every colour comes from a token with a dark value and no state keeps a light-only colour. (L2-134)
- **AC-30** Given both themes, when contrast is measured, then text meets 4.5:1 on the surface, links and hovered links 4.5:1, the current text 4.5:1 on its fill, and the focus ring 3:1 against the surface. (L2-129)

### Responsive

- **AC-31** Given the long profile's "Elsewhere" list at 320 px, when it renders, then each link wraps inside its item, the hidden text adds no width, and the page does not scroll horizontally. (L2-130)
- **AC-32** Given a link whose text is the 72-character unbroken string "https://staidans.example.ca/divinity/faculty/hale-whitcombe/publications" at 320 px in the pseudo-locale 30 % longer, when it renders, then the text wraps at any character and nothing is clipped or overflows. (L2-150)
- **AC-33** Given a viewport of 375 px, when a link row in the add-to-calendar list is measured, then the link is at least 44 CSS px tall. (L2-132)
- **AC-34** Given the browser zoomed to 400 % at 1280 px, when the course overview's "What you'll learn" list renders, then it stays in one column with no horizontal scrolling and no loss of content. (L2-129)

### Motion

- **AC-35** Given reduced motion, when the user hovers a link, then its colour and underline change instantly without a transition. (L2-129)

### Performance

- **AC-36** Given the expert profile with five "Elsewhere" links on a mobile profile, when the page loads, then the list adds no layout shift and no request of its own. (L2-120)

### Internationalisation

- **AC-37** Given the pseudo-locale build, when "Elsewhere" renders, then both the link labels and the hidden text "(external site, opens in a new tab)" come from translation resources, and none is hard-coded in the component. (L2-147)

## Implementation notes

- Planned. Folder `frontend/projects/components/src/lib/list/`, one type per file, each component with
  its own `.html` and `.scss`: `list.ts` (`List`, selector `ul[llList], ol[llList]`, host class `list`,
  `role="list"`, `[class.list--plain]`, `[attr.aria-label]`, `[attr.aria-busy]`), `external-link.ts`
  (`ExternalLink`, selector `a[llExternalLink]`), and `index.ts` re-exporting both. Both are exported
  from the library's `public-api.ts`.
- `List`'s template is `<ng-content />`. Its styles are the `list` block of
  `docs/design-system/assets/components.css` (`.list`, `.list > li`, `.list a`, the `aria-current` rules,
  `.list--plain > li`), written under `:host ::ng-deep` as the other library components do, with the
  `.rows` rules left out.
- `ExternalLink`'s template is `<ng-content /><span class="vh"> {{ externalLabel() }}</span>` followed by
  `@if (icon()) { <svg llIcon name="external" size="sm" aria-hidden="true" /> }`. The host binds
  `[attr.href]`, `[attr.target]` and `[attr.rel]` from one `computed` that is `null` for an invalid
  `href`, and hides the span and the glyph with `@if` in the same case. The span's text keeps its one
  leading space; the template must not trim it. The `vh` rule is the global utility in
  `frontend/projects/components/styles/_foundations.scss`.
- The icon set has no `external` glyph yet (`IconName` lists no external or open-in-new icon). Adding
  it, from the design-system link page's path data, belongs to the icon CRD and component before the
  `icon` input can render.
- The design-system link page shows `rel="noopener"` and the hidden text "(opens in a new tab)" with a
  glyph. The mocks and L2-021 AC3 use `rel="noopener noreferrer"`, the hidden text "(external site, opens
  in a new tab)" and no glyph. The component follows L2-021 and the mocks, and the link page catches up
  (D-4, D-5).
- The add-to-calendar mock links to `success.html` and carries no `target` or `rel` on its Google
  Calendar and Outlook.com links; in the product they are `https://` links built by the API and use
  `a[llExternalLink]`.
- The "Elsewhere" lists and the "Outline" list in the mocks have no name of their own; the page gives
  each `aria-labelledby` its heading's `id` (AC-26). This changes no pixel.
- The design-system list page lists only `pages/studio-editor/default` under *Sources*; the mocks use the
  list on the screens in the usage table, and the `.rows` block on 16 more.
- The 13 inline `style="margin-top: var(--space-5)"` on the course overview and module page lists move
  into the page's section layout.

## Decisions

- **D-1** *Is the list a component, or only the global `.list` and `.list--plain` classes with a small
  directive for external links?* Components. AGENTS.md requires every reusable piece to live in the
  shared library, application styles are limited to foundations and utilities, and the mocks use the
  list on about 70 screens and the external link on 18 anchors, so each needs one owner for its name,
  semantics and rules. `List` is a component with an attribute selector like `Chips`; `ExternalLink` is
  a component, not a bare directive, because it renders the hidden text and the optional glyph, which a
  directive could add only by hand-built DOM nodes. The other link styles (inline, standalone, danger) stay
  global element rules and are not components.
- **D-2** *Does the list host add `role="list"`?* Yes. The mocks omit it, but `list-style: none` removes
  list semantics in Safari with VoiceOver, and the list is a core structure in about 70 screens
  (L2-127). The attribute is redundant elsewhere and harmless.
- **D-3** *Is there a marker list (bullets or numerals)?* No. Every list in the mocks is `list-style:
  none`, including the two `ol`. Bulleted and numbered lists with markers are body content and live in
  the prose component, so `List` never draws markers.
- **D-4** *What does an ordered list look like, and does the external link draw a glyph?* The `ol` has the
  same classes as the `ul` and draws no numerals; the order is read out by the list, as in the article
  outline and the pinned related content. The design-system link page draws an external glyph, but no
  mock does, so `icon` is an opt-in input that defaults to `false`. The link page's `rel="noopener"` is
  `noopener noreferrer` here, from L2-021 AC3.
- **D-5** *Where does the hidden text come from?* A required `externalLabel` input, with its parentheses.
  The mocks use two phrases, "(external site, opens in a new tab)" for an expert's links and "(opens in a
  new tab)" for the calendar links, and L2-147 puts all text in translation resources, so the component
  holds no default. A shared token for the default phrase was rejected: the consumer binds one constant,
  and a default hidden inside the component would hide copy from the translators.
- **D-6** *Must a list always be named?* No. Most lists in the mocks sit in a section or aside card whose
  heading already names it, and a second name would repeat it. `label` or `aria-labelledby` is required
  only when the list is not inside a named section, as in "Calendar options" and "Profile checklist". The
  "Elsewhere" and "Outline" lists are named by their headings.
- **D-7** *Which states belong to the list?* Default, link hover and focus, current page and current
  item, and busy, from the design-system list page. No mock shows the last three; they are specified so
  a navigation or split-view list needs no later API change. The skeleton items and the empty state are
  the consumer's, because they are other components.
- **D-8** *Does the list own its outer spacing?* No. The 13 inline `margin-top` styles of the mocks are
  the page's gap between heading and list, so `List` has no margin and no `spacing` input.
- **D-9** *Is `.rows` part of this CRD?* No. The design-system list page documents `.rows` beside
  `.list`, but they are separate blocks with different rules (photo, title, meta, trailing slot). It is
  used on 16 more screens and needs its own CRD; the person-list CRD covers only the experts' rows.
- **D-10** *How do long names and URLs wrap?* The `.list` CSS has no `overflow-wrap` rule, so a
  72-character URL used as link text would widen the page at 320 px (the `.prose a` rule already sets
  `overflow-wrap: anywhere`). The component sets `overflow-wrap: anywhere` on items and links, and the
  design-system list page should add it.
- **D-11** *What is an invalid external `href`?* L2-021 AC3 allows only `https://`, enforced when the
  link is saved. The component repeats the check: anything else renders as plain text with no `href`, no
  `target`, no `rel` and no hidden text, so a link is never announced as external when it is not safe to
  treat it as one, and in development it throws so the mistake is found early.
- **D-12** *Does `List` need an item component?* No. The consumer writes native `li` elements; the list's
  styles reach them with `:host ::ng-deep`, as the other library components reach their projected
  content, and an item has no inputs.
