# Page header

| Field | Value |
|---|---|
| Selector | `ll-page-header` |
| Library path | `frontend/projects/components/src/lib/page-header/` |
| Status | planned |
| Traces to | L2-002, L2-003, L2-005, L2-013, L2-045, L2-069, L2-075, L2-086, L2-090, L2-095, L2-120, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-150 |
| Design system | [`page-header.html`](../../design-system/components/page-header.html) |
| Source mocks | [`pages/settings-profile/default`](../../mocks/pages/settings-profile/default.html), [`pages/dashboard/default`](../../mocks/pages/dashboard/default.html), [`pages/explore/default`](../../mocks/pages/explore/default.html), [`pages/search-results/default`](../../mocks/pages/search-results/default.html), [`pages/admin-topics/default`](../../mocks/pages/admin-topics/default.html), [`pages/studio/default`](../../mocks/pages/studio/default.html), [`pages/report-detail/default`](../../mocks/pages/report-detail/default.html), [`pages/article-page/default`](../../mocks/pages/article-page/default.html), [`pages/topic/default`](../../mocks/pages/topic/default.html), [`pages/comments/blocked`](../../mocks/pages/comments/blocked.html), [`pages/article-page/loading`](../../mocks/pages/article-page/loading.html), [`pages/dashboard/loading`](../../mocks/pages/dashboard/loading.html) |
| Rendering | [`page-header.html`](page-header.html) |

## Purpose and scope

The page header is the top of a page's content, directly under the top bar or the start of a layout
column. It holds an eyebrow naming the area, the page's only `h1` in the light
display style, one muted line of context ("13 topics. Names are unique…"), and the actions that apply
to the whole page ("New topic", "Export CSV"). Content that belongs under the line, such as a search
form, a row of meta badges or an inline status, follows in the default slot.

Use the [hero](hero.md) for the landing page, a card's own heading for one item, and the
[sign-in card](auth-card.md) for focused tasks.

Out of scope:

- The page's layout around it (settings, admin and studio sidebars, two-column detail pages): the
  page or its layout component.
- What each action does and whether the member may see it: the page.
- Moving focus to the `h1` after navigation: the shell's route focus.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/settings-*/*`, `pages/data-export-download/*` | top `xs` | eyebrow "Settings"; "Profile"; sub "How other members see you…" | default | canvas (settings layout column) |
| `pages/admin*/*`, `pages/moderation-*/*`, `pages/appeals/*`, `pages/policy-editor/*` | top `xs`, actions `side` | eyebrow "Admin"; "Topics"; sub "13 topics…"; actions "New topic", "Export CSV" | default | canvas (sidebar layout column) |
| `pages/report-detail/*`, `pages/appeal-review/*`, `pages/analytics-item/*` | top `sm`, actions `side` | eyebrow "Report R-1044 · Harassment"; "Comment by Samuel Okafor"; actions "Claim", "Take action"; default slot: meta cluster | default, loading (sub) | canvas |
| `pages/article-page/*`, `pages/collection-page/*`, `pages/expert-profile-history/*` | top `md`, actions `side` | eyebrow "Article · 12 min read"; long title; byline sub; default slot: topic chips; actions "Save", "23 comments"; inline status "Following" | default, loading (all) | canvas |
| `pages/topic/*`, `pages/studio-profile/*` | top `md` | eyebrow "Topic"; "Theology of technology"; lead slot paragraph; sub | default | canvas |
| `pages/comments/*` | top `md`, actions `below` | eyebrow; article title; sub; action "Back to the article" | default | canvas |
| `pages/dashboard/*`, `pages/my-*/*`, `pages/saved/*`, `pages/following/*` | top `lg` | eyebrow "Tuesday 13 October"; "Good morning, Miriam"; sub "3 courses in progress…" | default, loading (sub) | canvas |
| `pages/explore/*`, `pages/events/*`, `pages/experts/*`, `pages/policy/*`, `pages/accessibility-statement/*` | top `lg` | eyebrow "The catalogue"; "Explore"; sub | default | canvas |
| `pages/search-results/*` | top `lg` | eyebrow "Search"; "Results for “personhood”"; default slot: search form, correction alert or form summary | default, invalid, corrected | canvas |
| `pages/studio/*`, `pages/studio-analytics/*`, `pages/certificate/*`, `pages/module-page/*`, `pages/video-page/*`, `pages/content-history/*` | top `lg`, actions `side` | eyebrow "Studio"; "Your studio"; actions "New item", "Download PDF", "Share", "Start" | default, loading (all) | canvas |
| every page behind a dialog in `dialogs/*` | as its page | the page's header stays an `h1`; the open dialog makes the page inert | default | canvas |

## Anatomy

1. **Container** — `div.page-head` (+ `.page-head--actions` when actions sit to the side), a
   one-column grid with `--space-5` gaps.
2. **Context** — `p.eyebrow` with the area or item kind. A breadcrumb is not part of the header: it is
   the [breadcrumb](breadcrumb.md) component above it (breadcrumb CRD D-1).
3. **Title** — `h1.page-head__title`, the page's only `h1`.
4. **Lead (optional)** — a projected paragraph between the title and the sub line.
5. **Sub** — `p.page-head__sub`, one muted sentence in the large body style.
6. **Extra (optional)** — projected content after the sub: a search form, meta badges, an alert, an
   inline status.
7. **Actions (optional)** — `div.page-head__actions`: one primary and up to two quiet buttons.
8. **Loading** — `aria-busy="true"` on the container, a visually hidden status, and skeleton lines in
   place of the parts that are still loading.

Host: `ll-page-header` is `display: contents` and renders the container.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `heading` | `string` | — | yes | The `h1` text. While `busy` is `all`, it is rendered visually hidden ("Article"). |
| `eyebrow` | `string \| null` | `null` | no | Renders `p.eyebrow`. |
| `sub` | `string \| null` | `null` | no | Renders `p.page-head__sub` as text. `[slot=sub]` replaces it for a sub line with links or `strong`. |
| `actions` | `'none' \| 'side' \| 'below'` | `'none'` | no | `side` adds `.page-head--actions` and renders `div.page-head__actions` beside the text from 48rem; `below` renders the actions div in the flow, under the sub line. |
| `top` | `'lg' \| 'md' \| 'sm' \| 'xs'` | `'lg'` | no | Space above: `lg` `--space-16` (a standalone page), `md` `--space-8` (under a back link, band or breadcrumb), `sm` `--space-6` (two-column review pages), `xs` `--space-2` (the first thing in a sidebar layout's column). Adds `.page-head--top-md`, `--top-sm` or `--top-xs`. |
| `busy` | `'none' \| 'sub' \| 'all'` | `'none'` | no | `sub`: title stays, the sub line is a skeleton line. `all`: eyebrow stays if given (else a short skeleton line), the title and sub are skeleton lines and the `h1` is visually hidden. Both set `aria-busy="true"`. |
| `busyMessage` | `string \| null` | `null` | no | While busy, a visually hidden `role="status"` paragraph ("Loading the article…"). |

### Outputs

None. Actions are the consumer's buttons and links.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| `[slot=lead]` | a paragraph (`p.lead`) | Rendered between the title and the sub line (topic pages). |
| `[slot=sub]` | text and inline elements | Rendered inside `p.page-head__sub` in place of the `sub` input. |
| default | search form, meta cluster, alert, form summary, inline status | Rendered after the sub line. |
| `[slot=actions]` | `a[llButton]`, `button[llButton]` | Rendered inside `div.page-head__actions` when `actions` is not `none`. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Title | — | Eyebrow, title, sub. |
| With actions (side) | `.page-head--actions` | Lists and items with page-wide actions; actions trail from 48rem. |
| With actions (below) | — | A single back action under the sub (comments). |
| With search / extra | — | Search results, directories, meta rows. |

| Top | Modifier | Padding top | Padding bottom |
|---|---|---|---|
| lg (default) | — | `--space-16` | `--space-10` |
| md | `.page-head--top-md` | `--space-8` | `--space-10` |
| sm | `.page-head--top-sm` | `--space-6` | `--space-10` |
| xs | `.page-head--top-xs` | `--space-2` | `--space-10` |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | rendered | eyebrow, light display title, muted sub | `h1`; eyebrow is a paragraph |
| Loading (sub) | `busy="sub"` | sub line is a short skeleton | `aria-busy`; status message read once |
| Loading (all) | `busy="all"` | short line, two title lines, one text line as skeletons | `h1` still present, visually hidden; status read once |
| Action focus | `:focus-visible` on an action | the button's focus ring | per button |

## Markup

```html
<!-- rendered: settings -->
<div class="page-head page-head--top-xs">
  <p class="eyebrow">Settings</p>
  <h1 class="page-head__title">Profile</h1>
  <p class="page-head__sub">How other members see you. Your email address, enrolments and progress are never shown on your profile.</p>
</div>

<!-- rendered: with actions -->
<div class="page-head page-head--actions page-head--top-xs">
  <p class="eyebrow">Admin</p>
  <h1 class="page-head__title">Topics</h1>
  <p class="page-head__sub">13 topics. Names are unique; content uses 1 to 5 topics.</p>
  <div class="page-head__actions"><button class="btn btn--primary" type="button">New topic</button></div>
</div>

<!-- rendered: loading (all) -->
<div class="page-head page-head--top-md" aria-busy="true">
  <p class="vh" role="status">Loading the article…</p>
  <h1 class="vh">Article</h1>
  <div aria-hidden="true"><span class="skeleton skeleton--text is-short"></span><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text"></span></div>
</div>
```

```html
<!-- consumer -->
<ll-page-header eyebrow="Admin" heading="Topics" actions="side" top="xs" i18n-eyebrow i18n-heading>
  <ng-container slot="sub">{{ count }} topics. Names are unique; content uses 1 to 5 topics.</ng-container>
  <button llButton variant="primary" slot="actions" (click)="newTopic()">New topic</button>
</ll-page-header>
```

## Design

- Grid, one column, gap `--space-5`; padding-block per `top` and `--space-10` below.
- Title `--text-h1` with `--letter-spacing-tight`; sub `--text-body-lg` in `--color-fg-muted`; eyebrow
  the shared `.eyebrow` (overline in `--color-fg-subtle` with its rule).
- From 48rem, `.page-head--actions` makes two columns (`minmax(0, 1fr) auto`); the actions occupy the
  second column across the first three rows, aligned to the end.
- Actions: flex, wrap, gap `--space-3`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Title | `--color-fg-default` | default foreground | default foreground |
| Sub | `--color-fg-muted` | muted foreground | muted foreground |
| Eyebrow | `--color-fg-subtle` | subtle foreground | subtle foreground |
| Skeleton | `--color-bg-subtle` | subtle background | subtle background |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | Title |
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Sub line |
| `--color-fg-subtle` | `--color-bg-canvas` | 4.5:1 | Eyebrow |

## Responsive behaviour

- Below 48rem everything stacks in one column; side actions wrap under the sub line.
- From 48rem, side actions move to the trailing edge, bottom-aligned with the text.
- Long titles ("What Augustine Might Say About Large Language Models") wrap and never exceed the
  container.
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom everything stays available; actions
  keep 44 × 44 CSS px targets and wrap rather than shrink.

## Accessibility

### Role and pattern

Plain content. The title is the page's only `h1`; the eyebrow is a paragraph, not a heading.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Reaches the breadcrumb links, projected controls and the actions in reading order. |

### Focus

Nothing focusable of its own. After navigation the shell moves focus to the `h1`.

### Labelling

The document `<title>` starts with the same words as the `h1` ("Topics - Logos Lab").

### Announcements

A loading header announces its `busyMessage` once, politely; skeletons are hidden.

### Motion

Skeletons breathe; reduced motion stops them.

## Content and internationalisation

- Eyebrow: a noun naming the area or item kind, sentence case ("Settings", "Article · 12 min read").
- Title: the page's name or the item's title, no full stop. Sub: one sentence, often with a live count.
- Translatable inputs: `heading`, `eyebrow`, `sub`, `busyMessage`. Data values: item titles and counts.

## Performance

- `OnPush`, signal inputs; no timers.
- Perf-test scenario: `frontend/projects/perf-test/src/scenarios/PageHeader.ts` renders the Admin
  "Topics" header with "New topic"; iterations keep it at roughly 100–300 ms.
- Layout stability: the loading header reserves the loaded header's lines, so the swap shifts little
  (`L2-120`).

## Acceptance criteria

### Rendering

- **AC-1** Given Miriam opens Profile settings, when the page renders, then the header shows the eyebrow "Settings", the `h1` "Profile" and the sub line "How other members see you. Your email address, enrolments and progress are never shown on your profile.", with `--space-2` above. (L2-013)
- **AC-2** Given Isaac opens Admin › Topics, when the page renders at 1440 px, then "New topic" sits at the trailing edge of the header, bottom-aligned with the sub line. (L2-095)
- **AC-3** Given Miriam's dashboard, when it renders, then the header reads "Tuesday 13 October", "Good morning, Miriam" and "3 courses in progress, 2 events coming up and 5 saved items." with `--space-16` above. (L2-069)
- **AC-4** Given the search results for "personhood", when they render, then the search form follows the sub line inside the header. (L2-003)
- **AC-5** Given the topic "Theology of technology", when it renders, then its lead paragraph sits between the title and the sub line. (L2-005)
- **AC-6** Given the comments page, when it renders, then "Back to the article" sits under the sub line, not beside it. (L2-045)
- **AC-7** Given a report in the moderation queue, when it opens, then the header has `--space-6` above and "Claim" and "Take action" as its actions. (L2-086)
- **AC-8** Given the explore page, when it renders, then the eyebrow "The catalogue" precedes the `h1` "Explore". (L2-002)

### States

- **AC-9** Given the dashboard while its summary loads, when the header renders with `busy="sub"`, then the title stays and the sub line is a skeleton inside an `aria-busy="true"` container. (L2-120)
- **AC-10** Given an article while it loads, when the header renders with `busy="all"`, then it shows a short line, two title lines and a text line as skeletons, and keeps a visually hidden `h1` "Article". (L2-127)

### Keyboard and focus

- **AC-11** Given the Studio header with "New item", when Tab moves from the top bar, then focus reaches "New item" with a visible focus ring. (L2-126)

### Screen readers

- **AC-12** Given any page, when its headings are listed, then the page header's title is the only `h1` and the eyebrow is not a heading. (L2-127)
- **AC-13** Given a loading article header with `busyMessage` "Loading the article…", when it appears, then the message is announced once and the skeletons are hidden. (L2-127)

### Theming

- **AC-14** Given the dark theme, when the header renders, then title, sub and eyebrow keep their order of emphasis and each meets 4.5:1 on the canvas. (L2-134)

### Responsive

- **AC-15** Given a 360 px viewport, when Admin › Topics renders, then "New topic" wraps under the sub line and nothing scrolls horizontally. (L2-130)
- **AC-16** Given a 375 px viewport, when header actions render, then each is at least 44 CSS px tall. (L2-132)

### Content

- **AC-17** Given the pseudo-locale with strings 30 % longer, when "What Augustine Might Say About Large Language Models" renders at 320 px with "Save" and "23 comments", then the title wraps and no action is clipped. (L2-150)

### Motion

- **AC-18** Given reduced motion, when a loading header renders, then its skeletons do not animate. (L2-129)

### Performance

- **AC-19** Given the article page, when its loading header is replaced by the loaded one, then the cumulative layout shift stays within 0.1. (L2-120)

### Studio

- **AC-20** Given an expert opens the Studio, when it renders, then the header reads "Studio", "Your studio" with the action "New item". (L2-075)

### Appeals

- **AC-21** Given an appeal under review, when it loads, then the header keeps the eyebrow "Appeal" and title "Loading the appeal…" and shows the sub line as a skeleton. (L2-090)

## Implementation notes

- Folder `frontend/projects/components/src/lib/page-header/`: `page-header.ts` (`PageHeader`),
  `page-header-actions.ts`, `page-header-top.ts`, `page-header-busy.ts` (type aliases), with
  `page-header.html` and `page-header.scss` from the `page-header` block of `components.css`, plus the
  `--top-*` modifiers of D-1.
- Use `span[llSkeleton]` for the loading lines.

## Decisions

- **D-1** *What replaces the mocks' inline `padding-top` styles?* A `top` input with four steps that
  match every value the mocks use: `lg` `--space-16` (the block's default), `md` `--space-8`, `sm`
  `--space-6` and `xs` `--space-2`, as `.page-head--top-*` modifiers. The design system's page should
  add these modifiers; the CRD rendering shows them as specimen-only styles.
- **D-2** *A `p.page-head__title` behind dialogs?* No. The dialog mocks render the page behind as a
  picture with a `p` so the dialog's title is the document's only `h1`. In the product the page keeps
  its `h1`; the CDK dialog is modal and makes the page inert.
- **D-3** *A `header` element (article page)?* No. A `header` inside `main` has no landmark role, so
  every page header renders a `div`, as the design system does.
- **D-4** *How is loading shown?* Two levels, matching the mocks: `sub` when the title is known (the
  dashboard greeting, "Loading the appeal…"), `all` when nothing is (article, collection, module). In
  `all`, a known eyebrow stays real text, as the design system says; otherwise it is a short skeleton.
- **D-5** *Actions beside or below?* An explicit `actions` input, because the comments page puts its
  single back action under the sub line while list pages put actions beside the title.
- **D-6** *Sub as input or content?* Both: an input for plain sentences, `[slot=sub]` for a byline
  with links or `strong`.
