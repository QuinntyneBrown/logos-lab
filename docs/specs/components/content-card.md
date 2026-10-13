# Content card

| Field | Value |
|---|---|
| Selector | `ll-content-card` |
| Library path | `frontend/projects/components/src/lib/content-card/` |
| Status | built |
| Traces to | L2-001, L2-003, L2-071, L2-120, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-150 |
| Design system | [`content-card.html`](../../design-system/components/content-card.html) |
| Source mocks | [`pages/home/default`](../../mocks/pages/home/default.html), [`pages/explore/default`](../../mocks/pages/explore/default.html), [`pages/article-page/default`](../../mocks/pages/article-page/default.html), [`pages/my-learning/default`](../../mocks/pages/my-learning/default.html), [`pages/collection-page/default`](../../mocks/pages/collection-page/default.html), [`pages/saved/default`](../../mocks/pages/saved/default.html), [`pages/search-results/default`](../../mocks/pages/search-results/default.html), [`pages/gone/default`](../../mocks/pages/gone/default.html) |
| Rendering | [`content-card.html`](content-card.html) |

## Purpose and scope

A content card presents one published item — course, learning module, video, article, collection or
event — so a person can recognise and open it: a cover (a tinted tile with the type's glyph, or an
image), the type, the title as the card's one link, the author, and short facts. It appears in grids
(home, catalogue, related content) and as a row in lists (my learning, collection items, search
results), where it can also carry progress, status badges and a save toggle.

Use the media tile for large video previews and the event row for upcoming events in lists.

Out of scope:

- Saving and removing (the API call, the toast): the page handles `saveToggled` and the remove action.
- Choosing and formatting the facts ("24 lessons", "12 min read", "Published 12 Oct 2026"): the page
  formats them for the locale and passes strings.
- The grid or list around the cards (`.content-grid`): the page, with the grid rules this component
  documents.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/home/*` Featured and Latest | card; course, video (duration "24:18"), article, collection, module, event; author photo or Logos Lab mark | meta "24 lessons · 5 h 40 min", "12 min read", "8 items", "Published 12 Oct 2026" | default, hover, focus | canvas |
| `pages/explore/*`, `pages/topic/*`, `pages/expert-profile/*`, related content on item pages | card with save toggle | "Save Augustine and the Algorithm" / "Saved: Sabbath for the Always-On Mind" | saved true/false | canvas |
| `pages/gone/*` "Read these instead" | card | — | default | canvas |
| `pages/my-learning/*`, `pages/dashboard/*` | row with progress | "42% · 10 of 24 lessons · Next: 3.2 Representing, not resembling · Opened today, 9:58 am" | in progress | canvas |
| `pages/my-learning/*`, `pages/following/*`, `pages/my-events/*` | row with status | success "Completed" with check; plain "Not started"; warning | default | canvas |
| `pages/collection-page/*` | row, numbered type label "3 · Module" | status, progress | default | canvas |
| `pages/search-results/*` | row | `[slot=snippet]` with the matched words highlighted, meta | default | canvas |
| `pages/video-page/*` | row | meta | default | canvas |
| `pages/saved/*` | card, unavailable | badge "No longer available", action "Remove" | unavailable | subtle surface |

## Anatomy

1. **Card** — `article.content-card` (+ `.content-card--row`, + `.is-unavailable`): surface, hairline,
   `--radius-lg`.
2. **Cover** — `div.content-card__cover` with a tile class (`tile--sage`, `tile--fjord`, `tile--clay`,
   `tile--oat`) and a `svg.content-card__glyph`, or an `img` filling it; `aria-hidden` content.
3. **Duration (video)** — `span.content-card__duration` on the cover.
4. **Save toggle (optional)** — an [icon button](button.md) `.content-card__save` with `aria-pressed`.
5. **Body** — `div.content-card__body`:
   - **Type** — `p.content-card__type` ("Course", "3 · Module");
   - **Title** — `h3.content-card__title > a`, whose `::after` stretches over the whole card;
   - **By-line** — `p.content-card__by` with a 24 px photo (`alt=""`) or the Logos Lab mark
     (`span.content-card__mark`) and the name;
   - **Snippet (optional)** — a projected `p.muted[slot=snippet]` between the by-line and the meta: an
     excerpt in which the page marks matched words with `mark.hit`;
   - **Meta** — `p.content-card__meta` of `span`s;
   - **Progress** — `div.content-card__progress` with a [progress bar](progress-bar.md) and a caption;
   - **Status** — `p.content-card__status` of [badges](badge.md);
   - **Actions (unavailable)** — projected buttons.

Host: `ll-content-card` is `display: contents`; it renders the `article`.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `type` | `ContentType` = `'course' \| 'module' \| 'video' \| 'article' \| 'collection' \| 'event'` | — | yes | Picks the tile and glyph: course and module sage, video fjord, article clay, collection and event oat. |
| `typeLabel` | `string` | — | yes | The visible type line, translated ("Course", "Learning module", "3 · Module"). |
| `title` | `string` | — | yes | The link text and the card's name. |
| `path` | `string` | — | yes | Router link of the item. |
| `headingLevel` | `2 \| 3 \| 4` | `3` | no | The title's heading level, to fit the page outline. |
| `author` | `ContentCardAuthor \| null` | `null` | no | `{ name: string; photoUrl?: string \| null; logosLab?: boolean }`; `logosLab` shows the mark instead of a photo. |
| `meta` | `readonly string[]` | `[]` | no | One `span` each. |
| `duration` | `string \| null` | `null` | no | Video duration on the cover ("24:18"). |
| `coverUrl` | `string \| null` | `null` | no | A cover image replacing the glyph; decorative (`alt=""`), with reserved size. |
| `variant` | `'card' \| 'row'` | `'card'` | no | `row` adds `.content-card--row`. |
| `progress` | `ContentCardProgress \| null` | `null` | no | `{ value: number; label: string; caption: string }`. |
| `statuses` | `readonly ContentCardStatus[]` | `[]` | no | `{ label: string; tone: BadgeTone; plain?: boolean; icon?: IconName }`. |
| `saved` | `boolean \| null` | `null` | no | `null` renders no toggle; a boolean renders it with `aria-pressed`. |
| `saveLabel` | `string` | `''` | when `saved` is not null | The toggle's name, "Save Augustine and the Algorithm" or "Saved: …". |
| `unavailable` | `boolean` | `false` | no | Adds `.is-unavailable`; the title stays a link to the item's gone page. |

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| `saveToggled` | `boolean` — the new saved state | The save toggle is activated. |

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| `[slot=actions]` | buttons | Rendered at the end of the body (the unavailable card's "Remove"). |
| `[slot=snippet]` | one `p.muted` | Rendered between the by-line and the meta. The page builds it, text nodes and `mark.hit` only; the card adds nothing when the slot is empty. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Card | — | Grids. |
| Row | `.content-card--row` | Lists: cover beside the body. |
| Unavailable | `.is-unavailable` | A saved item that was archived. |

Card width comes from the grid: `.content-grid` columns of at least `--size-content-card-min`; rows use
`.content-grid--rows`.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Surface, hairline | `article` with a heading link |
| Hover | `:hover` | Lifts by `--lift`, `--color-border-strong`, `--shadow-3`; a cover image scales to 1.03 | — |
| Focus | title link `:focus-visible` | The whole card shows the focus ring | Link announced with its title |
| Saved | `aria-pressed="true"` on the toggle | Toggle in `--color-fg-accent`, filled bookmark | "pressed" |
| Unavailable | `.is-unavailable` | `--color-bg-subtle` card, subtle title | Status badge read |
| In progress | progress set | Progress bar and caption | progressbar with value |

## Markup

```html
<!-- rendered: card, course -->
<article class="content-card">
  <div class="content-card__cover tile--sage"><svg class="icon content-card__glyph" viewBox="0 0 24 24" aria-hidden="true">…</svg></div>
  <div class="content-card__body">
    <p class="content-card__type">Course</p>
    <h3 class="content-card__title"><a href="/courses/imago-dei-in-an-age-of-machines">Imago Dei in an Age of Machines</a></h3>
    <p class="content-card__by"><img src="…/abena-mensah.jpg" alt="" width="24" height="24">Dr. Abena Mensah</p>
    <p class="content-card__meta"><span>24 lessons</span><span>5 h 40 min</span></p>
  </div>
</article>

<!-- rendered: video with duration and save toggle -->
<article class="content-card">
  <div class="content-card__cover tile--fjord"><svg class="icon content-card__glyph" …></svg><span class="content-card__duration">24:18</span></div>
  <button class="icon-btn content-card__save" type="button" aria-pressed="false" aria-label="Save Can a Machine Pray?"><svg class="icon" …></svg></button>
  <div class="content-card__body">…</div>
</article>

<!-- rendered: row with a search snippet -->
<article class="content-card content-card--row">
  <div class="content-card__cover tile--sage">…</div>
  <div class="content-card__body">
    <p class="content-card__type">Course</p>
    <h3 class="content-card__title"><a href="/courses/imago-dei-in-an-age-of-machines">Imago Dei in an Age of Machines</a></h3>
    <p class="content-card__by">…Dr. Abena Mensah</p>
    <p class="muted">…why <mark class="hit">personhood</mark> is a calling we receive…</p>
    <p class="content-card__meta"><span>24 lessons</span><span>5 h 40 min</span></p>
  </div>
</article>

<!-- rendered: Logos Lab author -->
<p class="content-card__by"><span class="content-card__mark"><svg viewBox="0 0 32 32" aria-hidden="true">…</svg></span>Logos Lab</p>
```

```html
<!-- consumer -->
<ll-content-card type="course" typeLabel="Course" title="Imago Dei in an Age of Machines" path="/courses/imago-dei-in-an-age-of-machines" [author]="{ name: 'Dr. Abena Mensah', photoUrl }" [meta]="['24 lessons', '5 h 40 min']" />
```

## Design

- Card `--radius-lg`, hairline `--color-border-default`, `--color-bg-surface`; body padding
  `--space-5` `--space-5` `--space-6`, gap `--space-3`.
- Cover 16:9 (21:9 below 30rem), `--color-tile-fg` glyph `--size-cover-glyph` at stroke 1.2.
- Type `--text-overline` uppercase subtle; title `--text-h4` at `--font-size-lg`; by-line
  `--text-body-sm` muted with a `--space-6` image; meta `--text-caption` subtle, tabular.
- Duration: `--color-bg-media` / `--color-fg-on-media`, `--radius-xs`, `--text-caption`.
- Row: cover column `--space-32` (`--space-20` below 30rem), body padding `--space-4` `--space-5`.
- Motion: lift `--duration-base`, shadow `--duration-slow`, image scale `--duration-deliberate`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Card | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |
| Border | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Tiles | `--color-tile-sage`, `--color-tile-fjord`, `--color-tile-clay`, `--color-tile-oat` | tile roles | tile roles |
| Glyph | `--color-tile-fg` | tile glyph role | tile glyph role |
| Type, meta | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| By-line | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Duration | `--color-bg-media` / `--color-fg-on-media` | media roles | media roles |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Title |
| `--color-fg-subtle` | `--color-bg-surface` | 4.5:1 | Type and meta |
| `--color-fg-on-media` | `--color-bg-media` | 4.5:1 | Duration |
| `--color-tile-fg` | `--color-tile-sage` | 3:1 | Glyph |

Cover images and author photos are never filtered in the dark theme.

## Responsive behaviour

- The grid gives 1 column at XS, 2 at SM and MD, 3 at LG and 4 at XL (`L2-130`) through the minimum card
  width; below 30rem covers flatten to 21:9 and row covers narrow.
- Titles wrap (`overflow-wrap: break-word`); nothing scrolls horizontally at 320 px. The save toggle is a
  44 px target.

## Accessibility

### Role and pattern

An `article` with a heading; the title link is the card's only link and its `::after` makes the whole
card clickable. The save toggle sits above the stretched link (`--z-raised`) and is a separate control.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | The save toggle (if any), then the title link. |
| <kbd>Enter</kbd> on the title | Opens the item. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> on the toggle | Saves or unsaves. |

### Focus

Focus on the title link draws the ring around the whole card.

### Labelling

The card is named by its title; the cover, glyph and author photo are decorative; the toggle's name
includes the title.

### Announcements

The page announces "Saved" or "Removed from saved" through its polite live region.

### Motion

The lift and the image zoom are removed under reduced motion.

## Content and internationalisation

- Type labels and facts arrive translated and formatted ("12 min read", "Published 12 Oct 2026"); titles
  and names are data. Long French type labels wrap.

## Performance

- `OnPush`; inputs are signals; the tile and glyph are `computed`. Cover images carry `width`, `height`,
  `loading="lazy"` and reserve the 16:9 box, so they never shift the page (`L2-120`).

## Acceptance criteria

### Rendering

- **AC-1** Given the home page's Featured section, when the card for "Imago Dei in an Age of Machines" renders, then it shows the type "Course", the title linking to `/courses/imago-dei-in-an-age-of-machines`, "Dr. Abena Mensah" and the facts "24 lessons" and "5 h 40 min". (L2-001)
- **AC-2** Given the video "Can a Machine Pray?", when its card renders, then the cover is the fjord tile with the video glyph and the duration "24:18". (L2-001)
- **AC-3** Given an item by Logos Lab, when its card renders, then the by-line shows the Logos Lab mark and "Logos Lab" instead of a photo. (L2-001)
- **AC-4** Given any card, when it is inspected, then it is an `article` whose heading link is its only link, and its cover and author photo are hidden from assistive technology. (L2-127)

### States

- **AC-5** Given a card with a save toggle for "Augustine and the Algorithm" not saved, when the learner activates it, then `saveToggled` emits `true`. (L2-071)
- **AC-6** Given a saved item that was archived, when its card renders, then it carries `.is-unavailable`, a badge "No longer available" and the projected "Remove" action. (L2-071)
- **AC-7** Given a course in progress in My learning, when its row renders, then it shows a progressbar at 42 % and the caption "42% · 10 of 24 lessons". (L2-127)

### Keyboard and focus

- **AC-8** Given a card, when its title link receives keyboard focus, then the focus ring surrounds the whole card with at least 3:1 contrast. (L2-126)

### Theming

- **AC-9** Given the dark theme, when cards of each type render, then surface, tile, glyph and text use dark token values and cover images are not filtered. (L2-134)
- **AC-10** Given both themes, when contrast is measured, then title and meta meet 4.5:1 on the card and the glyph meets 3:1 on its tile. (L2-129)

### Responsive

- **AC-11** Given the Latest grid, when it is viewed at 375, 768, 1024 and 1440 px, then it shows 1, 2, 3 and 4 columns. (L2-130)
- **AC-12** Given a viewport of 375 px, when a save toggle is measured, then it is at least 44 × 44 CSS px. (L2-132)
- **AC-13** Given a title 30 % longer in the pseudo-locale, when the card renders at 320 px, then the title wraps and nothing scrolls horizontally. (L2-150)

### Performance

- **AC-14** Given a card with a cover image, when it loads, then the image has `width` and `height` and causes no layout shift. (L2-120)

### Snippet

- **AC-15** Given the search results for "personhood", when the row for "Imago Dei in an Age of Machines" renders with a projected snippet, then the snippet paragraph sits between "Dr. Abena Mensah" and "24 lessons" and the word "personhood" in it is a `mark.hit`. (L2-003)
- **AC-16** Given a card with nothing projected into the snippet slot, when it renders, then no empty snippet paragraph is in the body. (L2-003)

## Implementation notes

- Folder `frontend/projects/components/src/lib/content-card/`: `content-card.ts` (`ContentCard`),
  `content-type.ts`, `content-card-author.ts`, `content-card-progress.ts`, `content-card-status.ts`,
  `.html`, `.scss` with the `content-card` block (including `.content-grid`) under `:host ::ng-deep`.
  Composes `Icon`, `IconButton`, `Badge` and `ProgressBar`.
- Pages lay cards out with `.content-grid`, a layout utility added to the global foundations so a page
  can wrap any number of cards.

## Decisions

- **D-1** *Which tile does each type use?* Course and module sage, video fjord, article clay,
  collection and event oat — every card in the mocks follows this pairing.
- **D-2** *Where does `.content-grid` live?* In the global layout foundations, because pages own the
  grid and the component renders one card.
- **D-3** *Does the card format numbers and dates?* No; the page formats them for the locale (`L2-148`)
  and passes strings, so the card stays free of locale logic.
- **D-4** *How does a card show a search snippet?* Through a projected `[slot=snippet]`, not an input. The
  snippet is text with highlighted runs, the library must not know the API's segment type, and the page
  must create each `mark` itself so that no API text is ever bound as HTML (`L2-003` AC6). The mock's
  `strong` around matches is replaced by `mark.hit`, which the design system already styles
  (`components.css`) and which assistive technology can announce as a highlight.
