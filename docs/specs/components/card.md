# Card

| Field | Value |
|---|---|
| Selector | `aside[llCard]`, `section[llCard]`, `div[llCard]` |
| Library path | `frontend/projects/components/src/lib/card/` |
| Status | planned |
| Traces to | L2-021, L2-025, L2-031, L2-048, L2-061, L2-069, L2-073, L2-078, L2-082, L2-085, L2-086, L2-087, L2-090, L2-095, L2-098, L2-120, L2-126, L2-127, L2-129, L2-130, L2-134, L2-147, L2-150 |
| Design system | [`card.html`](../../design-system/components/card.html) |
| Source mocks | [`pages/expert-profile/default`](../../mocks/pages/expert-profile/default.html), [`pages/course-overview/default`](../../mocks/pages/course-overview/default.html), [`pages/collection-page/default`](../../mocks/pages/collection-page/default.html), [`pages/certificate/default`](../../mocks/pages/certificate/default.html), [`pages/admin-user/default`](../../mocks/pages/admin-user/default.html), [`pages/appeal-review/default`](../../mocks/pages/appeal-review/default.html), [`pages/dashboard/default`](../../mocks/pages/dashboard/default.html), [`pages/dashboard/loading`](../../mocks/pages/dashboard/loading.html), [`pages/my-certificates/default`](../../mocks/pages/my-certificates/default.html), [`pages/policy/default`](../../mocks/pages/policy/default.html), [`pages/studio-editor/default`](../../mocks/pages/studio-editor/default.html), [`pages/studio-video-media/loading`](../../mocks/pages/studio-video-media/loading.html), [`pages/review-item/default`](../../mocks/pages/review-item/default.html), [`pages/report-detail/default`](../../mocks/pages/report-detail/default.html), [`dialogs/moderation-action/default`](../../mocks/dialogs/moderation-action/default.html), [`dialogs/delete-comment/default`](../../mocks/dialogs/delete-comment/default.html), [`dialogs/report-content/default`](../../mocks/dialogs/report-content/default.html), [`dialogs/unfollow/success`](../../mocks/dialogs/unfollow/success.html), [`pages/preview/phone`](../../mocks/pages/preview/phone.html) |
| Rendering | [`card.html`](card.html) |

## Purpose and scope

A card is a quiet, titled block of supporting information on the page's surface: "Areas of expertise"
beside an expert's biography, "Taught by" and "About this course" beside a syllabus, "Verification"
beside a certificate, "Before you submit" beside an article in the studio, "Account" and "Consent
records" in an administrator's view of Miriam Clarke. It has a surface, a hairline, rounded corners,
an optional title and any content: chips, a plain list, a definition list of key facts, a progress
bar, a table, a link or a button. Several cards stack in a column. A plain variant gives the same
surface to a quoted comment in a dialog and to the phone frame in a preview.

Use a [content card](content-card.md) for one published item (course, video, article) in a grid, a
[panel](panel.md) for a page's one warm invitation, a [form layout](form-layout.md) `form-card` for
settings that contain a form, an [alert](alert.md) for a message about the screen, and an [empty
state](empty-state.md) for a block with nothing in it.

Out of scope:

- What goes inside the card: chips, lists, facts, progress, tables and links are their own
  components or page markup; the card projects them.
- Spacing between cards and the column they sit in: the page's layout (`.stack`, `.stack--lg`,
  `.two-col`).
- The aside landmark that groups a stack of cards: the page writes `aside.stack[aria-label]`.
- The kit's person card on the design-system page (photo, role, facts, footer, selectable and
  interactive cards): no mock or L2 requirement uses it (D-6).

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/expert-profile/*`, `dialogs/unfollow/success` | `aside`, h2 "Areas of expertise" | chips (3 to 7), a second projected title "Elsewhere", plain list of 1 to 3 external links | default, empty, following, long, rate-limited | canvas, `two-col` aside cell |
| `pages/course-overview/*` | three `section` cards in `aside.stack`: "Taught by", "About this course", "Talk about it" (also "Made by", "Your cohort") | people list; inline facts and topic pills; muted text and a standalone link | default, long, enrolled, visitor, cohort, loading | canvas |
| `pages/collection-page/*` | `section` cards "Your progress" and "Curated by" | progress bar and help text; a person and inline facts | default, progress, following, long, empty, partial | canvas |
| `pages/certificate/*` | `section` cards "Verification", "The course" | inline status, facts, standalone link; link and muted text | default, name-changed, revoked | canvas |
| `pages/admin-user/*` | `section` cards "Account", "Consent records", "Moderation history", "Certificates" in the main column | column facts and help text; tables in `.table-wrap` with badges; a compact empty state | default, suspended, deactivated, unverified, last-admin, loading | canvas |
| `pages/appeal-review/*` | `section` cards "The original action", "This appeal" in `aside.stack` | inline facts | default, decided, loading | canvas |
| `pages/dashboard/*` | `aside`, h2 "Your learning so far" | KPI list and a standalone link, or a zero-state help line | default, empty, partial, loading | canvas |
| `pages/my-certificates/*` | `aside`, h2 "How certificates work" | paragraph, standalone link "Find a course" | default, loading, revoked | canvas |
| `pages/policy/*` | `aside`, h2 "Versions" | rows of three versions, muted paragraph | default, long, upcoming, previous-version | canvas |
| studio and authoring pages (`studio-editor`, `studio-profile`, `studio-module-package`, `studio-video-media`, `studio-video-captions`, `article-editor`, `course-builder`, `collection-builder`, `event-editor`) | `section` cards "Details", "Before you submit", "Checks", "Video files", "Captions", "Comments", "Related content", "Registrations" in `aside.stack` | inline facts, checklists of inline statuses, rule lists, help text, a switch, buttons | default, empty, invalid, long, loading | canvas |
| `pages/review-item/*`, `pages/studio-editor/*` (comments) | `section` cards "Details", "Your comments", "Earlier comments" | facts; annotation notes with small text buttons | default, with comments | canvas |
| `pages/report-detail/*` | `section` cards "This report" and a card whose title "Samuel Okafor" sits beside an avatar, projected heading | facts, a badge, an ordered timeline | default, former member, loading | canvas |
| `dialogs/moderation-action/*` | `section`, h3 "What Samuel will see" | one paragraph | default, busy, failed, invalid | dialog surface |
| loading states (`pages/dashboard/loading`, `pages/admin-user/loading`, `pages/studio-video-*/loading`, `pages/appeal-review/loading`, `pages/report-detail/loading`) | busy `aside` with its real title and hidden skeleton lines; or a `div` card with no title and `aria-hidden` skeleton lines | skeleton title and lines | loading | canvas |
| `dialogs/delete-comment/*`, `dialogs/report-content/*` | `variant="plain"`, `div`, tight gap | quoted comment: name "Miriam Clarke (you)" or "Samuel Okafor", time, body | default, busy, failed, invalid, rate-limited, already-reported | dialog surface |
| `pages/preview/phone` | `variant="plain"`, `div`, consumer's `narrow` class | the whole previewed article | phone width | canvas |

## Anatomy

1. **Card** — `.aside-card` (default variant) or `.card` (plain variant) on the host element. A grid
   with one column that may shrink to `0`, padded by `--space-6`, `--radius-lg`, filled with
   `--color-bg-surface`, hairline `--color-border-default`.
2. **Title (optional)** — `h2.aside-card__title` (or `h3` for level 3) rendered from `heading`; `--text-h4`.
   More titles may be projected as content, in the same class; a title that is not the card's first
   child has `--space-6` above it (D-8).
3. **Content** — projected: any blocks, direct children of the card so the card's gap spaces them. A
   direct `.btn` child does not stretch (`justify-self: start`).

Host: `aside[llCard]`, `section[llCard]` or `div[llCard]` is the consumer's own element and keeps its
tag, so the landmark stays the page's decision (D-4). The component adds the classes and attributes to
the host and renders the optional title and the projected content inside it; it adds no wrapper.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `variant` | `'aside' \| 'plain'` | `'aside'` | no | `aside` adds `.aside-card` (grid gap `--space-4`). `plain` adds `.card` (gap `--space-5`, a minimum width of `--layout-card-min` limited to the viewport less twice `--layout-margin`, `scroll-margin-top` `--space-8`). |
| `heading` | `string \| null` | `null` | no | Renders the title element with this text as the first child. `null` renders no title. |
| `headingLevel` | `2 \| 3` | `2` | no | The title's element: `h2` or `h3`. Ignored without `heading`. |
| `headingId` | `string \| null` | `null` | no | The id of the title element. With `heading`, `null` generates a unique id (`ll-card-title-{n}`). Without `heading`, a given id names a projected title the consumer wrote (D-3). |
| `tight` | `boolean` | `false` | no | Adds `.aside-card--tight` or `.card--tight`: the grid gap is `--space-2` (D-7). |
| `busy` | `boolean` | `false` | no | Writes `aria-busy="true"` on the host while the card's content loads; the attribute is absent otherwise. |

- Inputs are signal inputs; booleans accept bare attributes (`booleanAttribute`).
- The host writes `aria-labelledby` with the title's id when the host is an `aside` or a `section` and
  there is a title (`heading` given, or `headingId` given). It writes none on a `div`, whose generic
  role cannot take a name (D-4), and none when there is no title.
- Translation: the title arrives translated as `heading`; the card has no copy of its own (L2-147).

### Outputs

None. The card is static.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | any blocks: chips, lists, facts, progress, tables, links, buttons, text, skeleton lines, projected titles | Rendered after the title as direct children of the card. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Aside (default) | `.aside-card` | Supporting facts and actions beside or below the main content, and titled sections in an administrator's main column. |
| Plain | `.card` | An untitled quoted block in a dialog, and the phone frame in a preview. |

| Modifier | Class | Use for |
|---|---|---|
| Tight | `.aside-card--tight`, `.card--tight` | A quoted comment: the gap between the name line and the body is `--space-2`. |

One size: the card takes the width of its column; padding is `--space-6` at every width. A card has
no width of its own beyond the plain variant's minimum.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Surface, hairline, title and content | Named region or complementary landmark when titled |
| Busy | `busy` → `aria-busy="true"` | The title stays; the page fills the body with skeleton lines | The page announces "Loading …" once; the lines are `aria-hidden` |
| Skeleton card | `div` host, no title, `aria-hidden` body | Surface with a skeleton title and lines | Hidden |
| Empty content | the page projects an [empty state](empty-state.md) (`empty--compact`) | Same card with a compact empty block | The empty block's own title |
| Hover, active, selected | — | None: the card is static and has no pointer states (D-5) | — |
| Focus | `:focus-visible` on a projected link or button | The control's own ring; the card never clips it | Owned by the control |

## Markup

```html
<!-- rendered: aside, titled, with a second projected title -->
<aside class="aside-card" aria-labelledby="expertise-title">
  <h2 class="aside-card__title" id="expertise-title">Areas of expertise</h2>
  <ul class="chips" aria-label="Areas of expertise">
    <li><a class="chip chip--sm" href="/topics/ai-ethics">The image of God and personhood</a></li>
    <li><a class="chip chip--sm" href="/topics/theology-of-technology">Theology of technology</a></li>
  </ul>
  <h2 class="aside-card__title">Elsewhere</h2>
  <ul class="list list--plain"><li><a href="https://kingsgate.example.ca/faculty/mensah" target="_blank" rel="noopener noreferrer">Faculty page<span class="vh"> (external site, opens in a new tab)</span></a></li></ul>
</aside>
```

```html
<!-- consumer -->
<aside llCard heading="Areas of expertise" i18n-heading headingId="expertise-title">
  <ul llChips aria-label="Areas of expertise" i18n-aria-label>…</ul>
  <h2 class="aside-card__title" i18n>Elsewhere</h2>
  <ul class="list list--plain">…</ul>
</aside>
```

```html
<!-- rendered: stacked section cards in the page's aside landmark -->
<aside class="stack" aria-label="About this course">
  <section class="aside-card" aria-labelledby="by-title"><h2 class="aside-card__title" id="by-title">Taught by</h2>…</section>
  <section class="aside-card" aria-labelledby="facts-title"><h2 class="aside-card__title" id="facts-title">About this course</h2><dl class="facts facts--inline">…</dl></section>
</aside>
```

```html
<!-- consumer -->
<aside class="stack" aria-label="About this course" i18n-aria-label>
  <section llCard heading="Taught by" i18n-heading>…</section>
  <section llCard heading="About this course" i18n-heading>…</section>
</aside>
```

```html
<!-- rendered: heading level 3 inside a dialog -->
<section class="aside-card" aria-labelledby="preview-title"><h3 class="aside-card__title" id="preview-title">What Samuel will see</h3><p>Your account is suspended until Tue 20 Oct 2026. …</p></section>
```

```html
<!-- consumer -->
<section llCard heading="What Samuel will see" [headingLevel]="3" i18n-heading>…</section>
```

```html
<!-- rendered: projected title with an avatar (no heading input) -->
<section class="aside-card" aria-labelledby="member-title">
  <div class="cluster"><span class="avatar-initials tile--clay" role="img" aria-label="Samuel Okafor">SO</span><h2 class="aside-card__title" id="member-title">Samuel Okafor</h2></div>
  <dl class="facts facts--inline">…</dl>
</section>
```

```html
<!-- consumer -->
<section llCard headingId="member-title">
  <div class="cluster"><ll-avatar …/><h2 class="aside-card__title" id="member-title">{{ member().name }}</h2></div>
  <dl class="facts facts--inline">…</dl>
</section>
```

```html
<!-- rendered: busy card with its real title -->
<aside class="aside-card" aria-labelledby="numbers-title" aria-busy="true">
  <h2 class="aside-card__title" id="numbers-title">Your learning so far</h2>
  <div aria-hidden="true"><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div>
</aside>
```

```html
<!-- consumer -->
<aside llCard heading="Your learning so far" [busy]="loading()" i18n-heading>
  @if (loading()) { <div aria-hidden="true"><span llSkeleton></span>…</div> } @else { <dl class="kpis">…</dl> }
</aside>
```

```html
<!-- rendered: skeleton card without a title -->
<div class="aside-card" aria-hidden="true"><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div>
```

```html
<!-- rendered: plain and tight, a quoted comment in a dialog -->
<div class="card card--tight">
  <p class="comment__head"><span class="comment__name">Miriam Clarke (you)</span><span class="comment__meta">12 minutes ago</span></p>
  <div class="comment__body"><p>Reading this alongside lesson 3.2 of <em>Imago Dei</em>. …</p></div>
</div>
```

```html
<!-- consumer -->
<div llCard variant="plain" tight>…</div>
```

The Angular component keeps the mock's element, so every e2e locator on `.aside-card`,
`.aside-card__title`, `.card` and the landmark roles keeps matching. The titled and untitled `div`,
`section` and `aside` forms above are the whole structural range; `variant`, `headingLevel` and `tight`
change only the classes and the title's tag.

## Design

- Padding `--space-6`; corner `--radius-lg`; hairline `--border-width-hairline` in
  `--color-border-default`; fill `--color-bg-surface`; no shadow and no outer margin (the page spaces
  cards).
- Grid with one column `minmax(0, 1fr)` so wide or unbroken content shrinks instead of widening the
  card (D-9). Gap `--space-4` for `aside`, `--space-5` for `plain`, `--space-2` when tight.
- Title `--text-h4` (the semibold small heading), wrapping at any character when a word is longer than
  the card (`overflow-wrap: break-word`, D-9). A title that is not the first child gets `--space-6`
  above it (D-8).
- A direct button or link-button child keeps its own width (`justify-self: start`).
- The plain variant adds `scroll-margin-top` `--space-8` and a minimum width of `--layout-card-min`,
  limited to the viewport less twice `--layout-margin`.
- No overflow clipping, no transition, no transform: projected focus rings and shadows draw in full.
- Forced colours and increased contrast come from the tokens: `--color-border-default` resolves to
  the system text colour in forced colours and to `--color-border-strong` under `prefers-contrast: more`.

Component tokens: none. The card reads semantic tokens directly.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Fill | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |
| Hairline | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Title and body text | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Secondary text (help, muted, meta) | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Title and body |
| `--color-fg-muted` | `--color-bg-surface` | 4.5:1 | Help text and meta |

The hairline is a decorative edge: the title and content name the card, so the edge carries no
information and has no 3:1 requirement (D-10).

## Responsive behaviour

- The card is one column at every width and fills its column. A page puts a stack of cards beside the
  main content from LG (`.two-col`, aside width `--layout-aside-width`) and below it before that.
- At 320 px nothing scrolls horizontally or clips: titles and long unbroken text, such as the address
  "/articles/can-software-bear-the-image-of-god", wrap inside the card; a table scrolls inside its own
  `.table-wrap`, never the card or page.
- At 400 % zoom the card keeps one column; with WCAG text-spacing overrides nothing clips or overlaps,
  because no height is fixed.
- Touch targets belong to the projected controls. The card itself is not interactive.
- No sticky variant: no mock sticks a card, and the card has no position of its own (D-5).

## Accessibility

### Role and pattern

No role of its own. The element the page chooses decides the landmark. An `aside` with a name is a
complementary landmark, a `section` with a name is a region landmark, and a `div` has no role. A stack
of cards sits in one page-level `aside[aria-label]`; its cards are `section` regions named by their
titles (D-4). Follows the APG [landmark regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) practice.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Moves through the controls the card projects, in reading order. The card itself is not focusable. |

### Focus

The card has no focus state. A projected control draws its own ring, and the card never clips it.

### Labelling

The title names the card: `aria-labelledby` points at the title's id, which is unique on the page. A
`div` card is not named. A decorative skeleton or icon is `aria-hidden`. A card whose title the page
wrote itself (avatar beside the name) gives the same `headingId`.

### Announcements

None from the card. While content loads, the page announces "Loading …" once in its own status
region; the card writes `aria-busy="true"` only.

### Motion

None: the card has no transition or animation, so reduced-motion needs no special case.

## Content and internationalisation

- The title is a short noun phrase in sentence case: "Areas of expertise", "Your learning so far",
  "Before you submit", "Consent records". It is not a sentence and carries no colon or full stop.
- A card holds one subject. A second title inside the same card (the expert's "Elsewhere") is allowed
  only when the second block belongs to the same landmark.
- Dates, times and counts inside the card are the page's: "Wed 2 Sep 2026", "1,284 enrolled",
  "3 of 8 completed".
- Translatable inputs: `heading`. Data values: everything the page projects.
- French and pseudo-locale titles run about 30 % longer: they wrap to more lines and the card grows.

## Performance

- Change detection: `OnPush`, signal inputs; the class list, the title tag and the `aria-labelledby`
  value are `computed` or host bindings; no timers, no effects.
- Perf-test scenario: no perf-test project exists in this repository ([button](button.md) D-3); the
  card is measured through the page budgets of `L2-120` and `L2-123`. The measured scenario is the
  course overview of "Imago Dei in an Age of Machines": the three stacked cards "Taught by", "About
  this course" and "Talk about it".
- Layout stability: the card has no images of its own. A busy card keeps its title and holds the
  body's height with skeleton lines of the loaded layout, so its data arrives without a shift
  (`L2-120`).
- Weight: the card imports no other component and no router; the page projects the rest.

## Acceptance criteria

### Rendering

- **AC-1** Given the public profile of Dr. Abena Mensah, when it renders at LG, then an `aside.aside-card` titled "Areas of expertise" holds the chips "The image of God and personhood", "Theology of technology" and "Formation and education". (L2-021)
- **AC-2** Given the same profile, when the page projects the title "Elsewhere" and a list of three external links into the same card, then the title is an `h2.aside-card__title` with `--space-6` above it, and the links follow it inside the card. (L2-021)
- **AC-3** Given the overview of "Imago Dei in an Age of Machines", when the page renders, then `aside.stack[aria-label="About this course"]` holds three `section.aside-card` blocks "Taught by" (Dr. Abena Mensah), "About this course" (Lessons "24 in 6 sections", Level "Intermediate", Learners "1,284 enrolled", topic pills) and "Talk about it", one `--space-4` apart. (L2-025)
- **AC-4** Given the collection "AI in the Pulpit" and a signed-in learner, when the page renders, then the card "Your progress" shows a progress bar at 38 % and "3 of 8 completed", and the card "Curated by" shows Rev. Dr. Thomas Hale with Items "8" and Length "About 10 hours". (L2-048)
- **AC-5** Given the certificate for "Christian Ethics for AI Builders", when it renders, then the card "Verification" shows "Valid", the code "LL-7K4Q-29XM", Issued "Wed 2 Sep 2026" and the link "Open the public page". (L2-031)
- **AC-6** Given an administrator viewing Miriam Clarke, when the page renders, then the main column holds the `section.aside-card` blocks "Account", "Consent records", "Moderation history" and "Certificates", each labelled by its title, and the account card shows Roles "Learner", State "Active" and Two-step verification "Off · optional for Learners". (L2-095)
- **AC-7** Given Jonah Fraser's appeal, when a moderator opens it, then two cards "The original action" (Action "Hid the post", Taken by "Isaac Moreau") and "This appeal" (Filed "Mon 12 Oct 2026, 7:15 pm ET", Assigned to "You") sit in `aside.stack[aria-label="About the action and the appeal"]`. (L2-090)
- **AC-8** Given Miriam Clarke's dashboard, when it renders for a learner with no activity, then the `aside.aside-card` "Your learning so far" shows "0" for In progress, Completed, Certificates and Saved, plus "Everything on Logos Lab is free with your account.", and is not blank. (L2-069)
- **AC-9** Given Miriam's My certificates page, when it renders, then the `aside.aside-card` "How certificates work" explains how a certificate is earned and links "Find a course". (L2-073)
- **AC-10** Given the Privacy policy at version 2, when it renders, then the `aside.aside-card` "Versions" lists "Version 3", "Version 2" and "Version 1" with their dates, so earlier versions stay reachable. (L2-098)
- **AC-11** Given the article "Can Software Bear the Image of God?" in the studio, when the editor renders, then the card "Before you submit" lists its checks with their statuses and the help line "Drafts save on their own, even when something here is missing." (L2-082)
- **AC-12** Given a moderator viewing the report on Samuel Okafor's comment, when the card for the member renders, then the avatar and the title "Samuel Okafor" sit in one `.cluster` inside the card, the card is labelled by that title through `headingId`, and the prior actions follow as a list. (L2-086)

### Variants

- **AC-13** Given the moderation dialog for Samuel Okafor's comment, when its preview card renders with `headingLevel` 3, then the title is an `h3.aside-card__title` "What Samuel will see" and the card is labelled by it. (L2-087)
- **AC-14** Given the dialog "Delete your comment?", when it renders, then Miriam Clarke's comment sits in a `div.card` with the tight gap of `--space-2`, showing "Miriam Clarke (you)", "12 minutes ago" and the text, and the card has no `aria-labelledby`. (L2-061)
- **AC-15** Given the dialog that reports Samuel Okafor's comment, when it renders, then the quoted comment sits in a plain tight `div.card` and the dialog's reason field follows. (L2-085)
- **AC-16** Given a preview of the article at phone width, when it renders, then the previewed article sits inside a `div.card` that also carries the page's `narrow` class, and the card is no wider than its container. (L2-078)

### States

- **AC-17** Given the dashboard while it loads, when the card renders with `busy`, then the title "Your learning so far" is shown, the host has `aria-busy="true"`, the skeleton body is `aria-hidden`, and when the data arrives the attribute is removed and the card does not move. (L2-120)
- **AC-18** Given the appeal review while it loads, when the card renders on a `div` host with no title, then it has no `aria-labelledby` and no region role, and its skeleton lines are hidden from assistive technology. (L2-127)

### Screen readers

- **AC-19** Given the profile's `aside` card, when a screen reader lists landmarks, then it announces a complementary landmark named "Areas of expertise". (L2-127)
- **AC-20** Given the course overview's stack, when a screen reader lists landmarks, then each `section` card is a region named by its own title ("Taught by", "About this course", "Talk about it"). (L2-127)
- **AC-21** Given two cards on one page with no `headingId`, when they render, then their titles have different generated ids and each card's `aria-labelledby` points at its own title. (L2-127)

### Keyboard and focus

- **AC-22** Given the card "Verification", when a keyboard user tabs to "Open the public page", then the link's focus ring is drawn in full inside and around the card, and no part of it is clipped. (L2-126)

### Theming

- **AC-23** Given the dark theme, when any card renders, then its fill, hairline and text come from the dark token values and none keeps a light-only colour. (L2-134)
- **AC-24** Given both themes, when contrast is measured, then the title and body on the card meet 4.5:1 and the muted help text meets 4.5:1. (L2-129)

### Responsive

- **AC-25** Given a viewport of 320 px, when the stack of three cards on the course overview renders, then the page has no horizontal scroll and the facts card is the width of its column. (L2-130)
- **AC-26** Given the administrator's "Consent records" card at 320 px, when its table renders, then the table scrolls inside its own container and the card keeps the width of the column. (L2-130)
- **AC-27** Given the pseudo-locale with strings 30 % longer, when every title "Areas of expertise", "Before you submit" and "Your learning so far" renders at 320 px and at 1280 px, then each wraps and none is clipped. (L2-150)
- **AC-28** Given the text-spacing overrides (line height 1.5, paragraph spacing 2, letter spacing 0.12, word spacing 0.16), when the profile's card renders, then no text is clipped or overlaps. (L2-129)

### Motion

- **AC-29** Given a member who prefers reduced motion, when any card renders or content inside it changes, then the card itself animates nothing. (L2-129)

### Content and internationalisation

- **AC-30** Given the pseudo-locale build, when the profile renders, then the card's title is pseudo-localised text from the translation catalogue and the card adds no string of its own. (L2-147)

### Performance

- **AC-31** Given the overview of "Imago Dei in an Age of Machines" at 4G mobile, when the three stacked cards render, then they add no layout shift of their own (Cumulative Layout Shift 0.1 or less) and no image request. (L2-120)

## Implementation notes

- Folder `frontend/projects/components/src/lib/card/`: `card.ts` (`Card`), `card.html`, `card.scss`,
  `card-variant.ts` (`CardVariant`), `card-heading-level.ts` (`CardHeadingLevel`), one type per file.
- Selector `aside[llCard], section[llCard], div[llCard]`. Host bindings: `class.aside-card` when the
  variant is `aside`, `class.card` when `plain`, the `--tight` modifiers, `attr.aria-busy`, and
  `attr.aria-labelledby` (see the API rule: `aside` and `section` hosts only, with a title). Read the
  host tag from the injected `ElementRef`.
- Template: an `@if (heading())` block renders `h2` or `h3` (`.aside-card__title`, `[id]`) from one
  `ng-template`, then `<ng-content />`. A shared id counter in `card.ts` produces `ll-card-title-{n}`.
- Styles: `card.scss` holds the `.aside-card`, `.aside-card__title`, `.card` and tight rules under
  `:host ::ng-deep`, plus the single-column `minmax(0, 1fr)` grid, the title wrap and the
  second-title margin (D-8, D-9). Do not copy the design system's person-card rules (`.card__top`,
  `.card__photo`, `.card__initials`, `.card__media`, `.card__facts` and the rest), the
  `.card--interactive` rules or the `[data-state]` and `:has(...)` selected rules: no mock uses them
  (D-5, D-6). The class `.card__*` names used by the content card belong to that component.
- Pages replace the mocks' inline `margin-top: var(--space-8)` between main-column cards with
  `.stack.stack--lg`, and `style="gap: var(--space-2)"` with `tight`.
- Design-system follow-ups (the CRD leads): add `.aside-card--tight`, `.card--tight`, the
  second-title spacing and the shrinkable grid column to `components.css`; add an aside-card section
  to `components/card.html` (it renders only the person card today).

## Decisions

- **D-1** *One component or two?* One `Card` with `variant` `aside | plain`. The mocks use `.aside-card`
  in 249 section, 17 aside and 8 div usages and `.card` in 11 usages (two dialogs and the preview). Both
  are the same surface (padding, corner, fill, hairline) and take any content; they differ only in
  gap, a minimum width and a scroll margin, which a two-value input expresses without a second
  selector. `tone` is not used: no card in any mock is coloured.
- **D-2** *How does the title get its id and level?* A `heading` input renders the title and the
  component generates a unique `ll-card-title-{n}` id for `aria-labelledby`; `headingId` overrides it
  so a page can keep a stable id such as "expertise-title". `headingLevel` is `2 | 3` because the
  mocks use `h2` everywhere except one `h3` in the moderation dialog, whose page title is already an
  `h1` with other headings beside it.
- **D-3** *What if the title is not one plain heading (avatar beside the name, a second title)?* The
  page writes the heading and passes `headingId`. The report-detail member card puts an avatar and
  the name in a `.cluster`; the expert profile has a second "Elsewhere" title. A `lead` slot would
  need a wrapper that cannot be omitted when empty, so one slot (default) and one extra input keep
  the API small.
- **D-4** *Which element is the card?* The page's: `aside`, `section` or `div`. The mocks use `aside`
  for a card that stands alone (profile, dashboard, certificates, policy) and `section` inside an
  `aside.stack[aria-label]` or in a main column. `aria-labelledby` goes only on `aside` and `section`,
  because ARIA gives a `div` no role to name. The nested landmark stays as in the mocks.
- **D-5** *Is there a sticky, hover, selectable or interactive card?* No. No mock sticks a card or
  makes one clickable, so none of those states is specified; the stack's position is layout. If a
  later screen needs one, this CRD changes first.
- **D-6** *What of the person card on the design-system page?* It is not part of this component. The
  page documents the kit's person card (photo, role, facts, status footer, selectable, interactive)
  and lists only two source mocks, both of which use `.aside-card`; no L2 requirement or mock needs
  a person card, and the [content card](content-card.md) and [person list](person-list.md) cover the
  product's people and items. A person card would be its own component with its own CRD.
- **D-7** *How is the quoted comment's tighter gap expressed?* A `tight` input and a `--tight`
  modifier replace the mocks' inline `style="gap: var(--space-2)"` on ten dialog states, since
  inline styles are not an API.
- **D-8** *How is a second title spaced?* A title that is not the card's first child has
  `--space-6` above it, replacing the profile mock's inline `margin-top: var(--space-6)`.
- **D-9** *What stops long content widening a card at 320 px?* A single grid column that may shrink
  (`minmax(0, 1fr)`) and a title that breaks long words. The design-system rule sets neither, so an
  address such as "/articles/can-software-bear-the-image-of-god" in a facts list could widen the
  card; the facts' own `overflow-wrap` handles the common case and the column rule guards the rest.
- **D-10** *Does the hairline need 3:1?* No, as the [chip](chip.md)'s resting border (D-4 there): it
  is a decorative edge, and the title and content identify the card. Text on the fill meets 4.5:1.
- **D-11** *What announces a loading card?* Not the card. It sets `aria-busy` and the page owns the
  single "Loading …" status, as the [skeleton](skeleton.md) CRD states; the skeleton lines are
  `aria-hidden`. A fully skeleton `div` card has no title and no label.
- **D-12** *Where is the render-performance budget measured?* On whole pages by the budgets of
  `L2-120` and `L2-123`, because the repository has no perf-test project (button D-3). The scenario is
  the course overview with its three stacked cards.
