# Breadcrumb

| Field | Value |
|---|---|
| Selector | `nav[llBreadcrumb]` |
| Library path | `frontend/projects/components/src/lib/breadcrumb/` |
| Status | planned |
| Traces to | L2-005, L2-021, L2-025, L2-028, L2-044, L2-045, L2-052, L2-075, L2-095, L2-120, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-141, L2-142, L2-147, L2-150 |
| Design system | [`breadcrumb.html`](../../design-system/components/breadcrumb.html) |
| Source mocks | [`pages/topic/default`](../../mocks/pages/topic/default.html), [`pages/article-page/default`](../../mocks/pages/article-page/default.html), [`pages/course-overview/default`](../../mocks/pages/course-overview/default.html), [`pages/course-overview/long`](../../mocks/pages/course-overview/long.html), [`pages/video-page/default`](../../mocks/pages/video-page/default.html), [`pages/video-page/loading`](../../mocks/pages/video-page/loading.html), [`pages/event-page/error`](../../mocks/pages/event-page/error.html), [`pages/expert-profile/default`](../../mocks/pages/expert-profile/default.html), [`pages/lesson-player/default`](../../mocks/pages/lesson-player/default.html), [`pages/module-player/default`](../../mocks/pages/module-player/default.html), [`pages/studio-editor/default`](../../mocks/pages/studio-editor/default.html), [`pages/article-editor/long`](../../mocks/pages/article-editor/long.html), [`pages/admin-user/default`](../../mocks/pages/admin-user/default.html), [`pages/admin-user/loading`](../../mocks/pages/admin-user/loading.html), [`pages/policy-editor/default`](../../mocks/pages/policy-editor/default.html), [`pages/report-detail/default`](../../mocks/pages/report-detail/default.html), [`pages/data-export-download/default`](../../mocks/pages/data-export-download/default.html), [`dialogs/confirm-captions/default`](../../mocks/dialogs/confirm-captions/default.html) |
| Rendering | [`breadcrumb.html`](breadcrumb.html) |

## Purpose and scope

A breadcrumb is the short trail from the current page back up through its parents: "Explore", then
"Theology of technology"; "Studio", "Articles", then the article being edited. Every ancestor is a link,
the current page is the last item and is plain text. It sits above the page's lead block (the page header,
the hero, a profile head) on every page that is two or more levels deep, so a member can see where they
are and step back up. The trail is data: the page hands the component the items, and the component draws
the list, the slashes, the current page and the wrapping.

A breadcrumb shows hierarchy, never history: it is not filled from the back button. Use the
[top bar](top-bar.md) and [sidebar navigation](sidebar-navigation.md) for the areas of the product,
[tabs](tabs.md) for sibling views of one page, [pagination](pagination.md) for pages of one list, and the
page header's [eyebrow](page-header.md) for the kind of thing a page is ("Topic", "Article · 12 min read").

Out of scope:

- Which pages are two or more levels deep and what each page's parents are: the page, from the route
  hierarchy. A top-level page (Explore, Events, the dashboard) renders no breadcrumb.
- The page's `BreadcrumbList` structured data (`L2-144`): the page's metadata service builds it from the
  same items it passes to this component; the component emits no `script`.
- The page header, hero or profile head below the trail and the space between them (see *Responsive
  behaviour*, the `top` rule), and moving focus to the new page's `h1` after navigation: the shell's route
  focus.
- Choosing a page title: the page's own title, exactly as its header writes it.

## Usage

The mocks hold 226 breadcrumbs. Every one is a `nav[aria-label="Breadcrumb"]` around `ol.breadcrumb`; they
differ only in their items and in the inline spacing each page gives the `nav` (which the `top` and
`bottom` inputs replace, D-2).

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/topic/*` | `top="md"`; header below `top="md"` | "Explore" › "Theology of technology" | current | canvas |
| `pages/article-page/*` | `top="md"` | "Explore" › "Theology of technology" › "Article" | current; the current label is the page's word, not the long title | canvas |
| `pages/course-overview/*` (default, enrolled, archived, long) | `top="md"` above the hero | "Courses" › "Imago Dei in an Age of Machines"; long: "Imago Dei in an Age of Machines: Personhood, Vocation and the Limits of Making in a World of Thinking Tools" | current; long label wraps | canvas |
| `pages/video-page/*`, `pages/comments/*`, `pages/module-page/*` | `top="md"` | "Explore" › "Videos" › "Augustine and the Algorithm"; "Explore" › "Articles" › "Comments"; "Explore" › "Prompting with Wisdom" | current; loading and error | canvas |
| `pages/video-page/loading`, `pages/video-page/error` | `top="md"` | "Explore" › "Videos", both links, no current item (the title is not known) | no current item | canvas |
| `pages/event-page/*` | `top="md"` | "Events" › "Faith and AI Evening: Is Creativity Sacred?"; loading and error: "Events" alone, a link | current; one link only | canvas |
| `pages/collection-page/*`, `pages/expert-profile/*`, `dialogs/unfollow/*` | `top="md"` | "Collections" › "AI in the Pulpit"; "Experts" › "Dr. Abena Mensah"; "Experts" › "The Rev. Canon Dr. Thomas Alexander Hale-Whitcombe" | current | canvas |
| `pages/certificate/*` | `top="md"` | "Dashboard" › "Certificates" › "Christian Ethics for AI Builders" | current | canvas |
| `pages/studio-editor/*`, `pages/article-editor/*`, `pages/course-builder/*`, `pages/collection-builder/*`, `pages/event-editor/*`, `pages/studio-module-package/*`, `pages/review-item/*`, `pages/studio-video-media/*`, `pages/studio-video-captions/*`, `pages/studio-profile/*`, `pages/content-history/*`, `pages/expert-profile-history/*`, `dialogs/restore-profile-version/*` | `top="md"`; an `h1.vh` or the header follows | "Studio" › "Articles" › "Can Software Bear the Image of God?"; "Studio" › "Videos" › "Made, Not Manufactured"; "Studio" › "Review queue" › "Bias in the Training Data v2"; "Studio" › "Dr. Abena Mensah" › "Profile history"; "Studio" › "Your profile"; "Studio" › "Untitled article" (a new item) | current; long titles wrap | canvas |
| `pages/analytics-item/*` | `top="md"` | "Analytics" › "Imago Dei in an Age of Machines" | current | canvas |
| `pages/lesson-player/*`, `notifications/offline-notice/*` | `top="none"`, inside the lesson header above the `h1` | "Imago Dei in an Age of Machines" › "3. Image and likeness" (the first item links to the enrolled course overview) | current | canvas |
| `pages/module-player/*` | `top="md"`, `bottom="sm"` | "Case Study: The Chatbot Chaplain" › "Module player" | current | canvas |
| `pages/admin-user/*`, `pages/report-detail/*`, `pages/appeal-review/*` | `top="none"`, first thing in the sidebar layout's column; the header below sets its own top | "Admin" › "Users" › "Miriam Clarke"; "Queue" › "Comment by Samuel Okafor"; "Appeals" › "Jonah Fraser" | current; admin-user loading: current "Loading account" | canvas |
| `pages/policy-editor/*` | `top="xs"`; header below `top="xs"` | "Admin" › "Policies" › "Privacy Policy v4" | current | canvas |
| `pages/data-export-download/*` | `bottom="sm"`, placed below the page header | "Your data" › "Export" | current | canvas |
| `dialogs/confirm-captions/*` (the page behind the dialog) | `top="md"` | "Studio" › "Videos" › "Made, Not Manufactured", rendered as the page renders it (D-7) | the page is inert behind the dialog | canvas |
| A five-level trail (no mock yet; the rule is in the design-system page) | `foldLabel` "Show 2 more levels" | "Studio" › "Courses" › "Imago Dei in an Age of Machines" › "3. Image and likeness" › "3.2 Representing, not resembling" | folded, expanded | canvas |

## Anatomy

1. **Landmark** — `nav[llBreadcrumb]`, the host. A `nav` named by `label` ("Breadcrumb"). It carries
   the spacing modifiers; it has no border, background or margin.
2. **List** — `ol.breadcrumb`. A wrapping flex row in `--text-body-sm`, so the number of levels is
   announced.
3. **Item** — `li`. One level. Every item after the first draws its separator.
4. **Ancestor link** — `a` in an item that has a `path`. In the link colour, underlined, never styled as
   a button.
5. **Current page** — `span[aria-current="page"]` in the last item, when that item has no `path`.
   Plain text in `--color-fg-default`; not focusable.
6. **Separator** — `li + li::before`, a slash in `--color-fg-subtle` drawn by CSS. It is not in the DOM
   and is not read.
7. **Fold button (collapsed trails only)** — `button.btn.btn--text.btn--sm` in an item of its own,
   showing "…" and named by `foldLabel`.

Host: the consumer's own `<nav llBreadcrumb>`; the component adds the `aria-label`, the spacing classes
and renders `ol.breadcrumb`. `Breadcrumb` has a template (the list, the items, the fold button).

## API

### `Breadcrumb` (`nav[llBreadcrumb]`)

Types, one per file: `BreadcrumbItem` (`{ readonly label: string; readonly path: string | null }`),
`BreadcrumbTop` (`'none' | 'xs' | 'md'`), `BreadcrumbBottom` (`'none' | 'sm'`).

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `items` | `readonly BreadcrumbItem[]` | — | yes | The trail from the root to the current page, in order. An item with a `path` renders a link; an item with a `path` of `null` renders the current page. Only the last item may have no `path`. At least one item; a trail of one item must have a `path` (a lone current page is not a trail). A trail may end in a link, and then has no current page (D-3). Breaking a rule raises a development-mode error. |
| `label` | `string` | — | yes | The `aria-label` of the landmark: "Breadcrumb". Translated; the same on every page, because a page has one breadcrumb (`L2-127`). |
| `top` | `'none' \| 'xs' \| 'md'` | `'none'` | no | Space above, replacing the mocks' inline `padding-top`: `md` `--space-8` (the first thing in the page container), `xs` `--space-2` (the first thing in a sidebar layout's column under a page header); `none` adds nothing. Adds `.breadcrumb-nav--top-xs` or `--top-md`. |
| `bottom` | `'none' \| 'sm'` | `'none'` | no | Space below: `sm` `--space-6` (the module player, the data export). Adds `.breadcrumb-nav--bottom-sm`. |
| `foldLabel` | `string \| null` | `null` | when `items` holds more than four | The accessible name of the fold button, naming the number: "Show 2 more levels". The page works out the number (`items.length - 3`) and translates it with ICU plural rules (`L2-147`). Ignored when nothing folds. |

`Breadcrumb` has no outputs: ancestor links navigate through the router, and the fold button's expansion
is internal to the component.

A `path` is an application URL, with an optional query string, as the catalogue's filtered links are
("/explore?type=video"). The component navigates with the router, so a link never reloads the page, and
the `href` it renders is the resolved URL, so a crawler, a middle-click and a copied link all work.

### Content slots

None. The items are data; the component renders its own children.

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Trail | — | The default: every ancestor linked, the current page last. |
| Without a current page | — | A page whose own title is not known yet (loading) or never will be (error): every item is a link and nothing has `aria-current` (D-3). |
| Folded | — | More than four items: the first item, the fold button, and the last two items (D-5). |

One size: `--text-body-sm` with `--space-2` between items and separators. The width follows the container;
the trail never stretches the page.

| Spacing | Modifier | Padding |
|---|---|---|
| `top="md"` | `.breadcrumb-nav--top-md` | `--space-8` above |
| `top="xs"` | `.breadcrumb-nav--top-xs` | `--space-2` above |
| `bottom="sm"` | `.breadcrumb-nav--bottom-sm` | `--space-6` below |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default (ancestor link) | — | `--color-fg-link` text, underlined with `--border-width-hairline` | "Explore, link" |
| Hover | `:hover` | `--color-fg-link-hover` text, underline `--border-width-thick` | — |
| Focus | `:focus-visible` | `--color-focus-ring` ring, `--focus-ring-width`, offset `--focus-ring-offset` | The link is announced |
| Current page | `aria-current="page"` | `--color-fg-default` plain text, no underline, no hover, no focus | "Theology of technology, current page" |
| No current page | last item has a `path` | Every item is a link; the last is not marked | The last link reads as a link only |
| Fold button, collapsed | `aria-expanded="false"` | "…" in the text-button style (`--color-fg-link`) | "Show 2 more levels, button, collapsed" |
| Fold button, hover and focus | `:hover`, `:focus-visible` | As the text [button](button.md): link-hover colour; shared ring | Announced as a button |
| Expanded | the fold button is activated | The hidden items appear in order, the button is gone | Focus lands on the first revealed link |
| Long item | a label wider than the line | Wraps inside its item, hanging beside the separator; never truncated | The full text is read |

The component has no disabled, busy or loading state of its own: a page that is loading passes the labels it
has (D-3), or a translated placeholder as the current page ("Loading account").

## Markup

```html
<!-- rendered: trail (topic page), top="md" -->
<nav class="breadcrumb-nav breadcrumb-nav--top-md" aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li><a href="/explore">Explore</a></li>
    <li><span aria-current="page">Theology of technology</span></li>
  </ol>
</nav>
```

```html
<!-- rendered: three levels (article page); the current label is the page's own word -->
<nav class="breadcrumb-nav breadcrumb-nav--top-md" aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li><a href="/explore">Explore</a></li>
    <li><a href="/topics/theology-of-technology">Theology of technology</a></li>
    <li><span aria-current="page">Article</span></li>
  </ol>
</nav>
```

```html
<!-- rendered: no current page (video page while it loads or fails) -->
<nav class="breadcrumb-nav breadcrumb-nav--top-md" aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li><a href="/explore">Explore</a></li>
    <li><a href="/explore?type=video">Videos</a></li>
  </ol>
</nav>
```

```html
<!-- rendered: folded (five items) -->
<nav class="breadcrumb-nav" aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li><a href="/studio">Studio</a></li>
    <li><button class="btn btn--text btn--sm" type="button" aria-expanded="false" aria-label="Show 2 more levels">…</button></li>
    <li><a href="/studio/courses/imago-dei-in-an-age-of-machines/lessons/3">3. Image and likeness</a></li>
    <li><span aria-current="page">3.2 Representing, not resembling</span></li>
  </ol>
</nav>
```

The same trail after the fold button is activated: the button's item is replaced by the hidden items
"Courses" and "Imago Dei in an Age of Machines", in order, and focus is on the "Courses" link.

The spacing classes are the only classes the host adds beyond `breadcrumb-nav`; the `ol.breadcrumb`, the
`li`s, the `a`s and the `span[aria-current="page"]` are the contract e2e page objects locate. The mocks'
`nav` has no class and an inline `style`; the host's classes replace the `style` (D-2).

```html
<!-- consumer -->
<nav llBreadcrumb label="Breadcrumb" i18n-label top="md" [items]="trail()"></nav>
```

```ts
// consumer: the topic page's items
protected readonly trail = computed<readonly BreadcrumbItem[]>(() => [
  { label: $localize`Explore`, path: '/explore' },
  { label: this.topic().name, path: null },
]);
```

```html
<!-- consumer: folded trail, the page works out the count -->
<nav llBreadcrumb label="Breadcrumb" i18n-label [items]="trail()" [foldLabel]="foldLabel()"></nav>
```

## Design

- List: `display: flex`, `flex-wrap: wrap`, `align-items: baseline`, gap `--space-2` in both directions,
  `--text-body-sm`, colour `--color-fg-muted`.
- Item: `display: inline-flex`, `align-items: baseline`, `min-width: 0`, `overflow-wrap: anywhere`, so a
  label that is wider than the line wraps inside its item (D-4).
- Separator: `li + li::before`, `content: "/" / ""` (empty alternative text, so assistive technology
  skips it; `content: "/"` declared before it as the fallback), `margin-inline-end` `--space-2`, colour
  `--color-fg-subtle` (D-6).
- Link: the global link style (`--color-fg-link`, underline `--border-width-hairline`, offset
  `--link-underline-offset`); `display: inline-flex`, `align-items: center` and `min-block-size`
  `--target-min`, so the target is at least 24 CSS px tall (D-8).
- Current page: `--color-fg-default`; no underline, no cursor change.
- Fold button: the text button at the small size (`.btn--text.btn--sm`), `--color-fg-link`.
- Spacing modifiers on the host as in *Variants and sizes*; the component adds no margin.
- Layer: none. Motion: none; hover changes colour and underline weight at once.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Ancestor link | `--color-fg-link` | `--palette-accent-700` | `--palette-accent-300` |
| Hovered link | `--color-fg-link-hover` | `--palette-accent-800` | `--palette-accent-200` |
| Current page | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Separator | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Focus ring | `--color-focus-ring` | `--palette-accent-700` | `--palette-accent-300` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-link` | `--color-bg-canvas` | 4.5:1 | Ancestor links on the page |
| `--color-fg-link-hover` | `--color-bg-surface` | 4.5:1 | Hovered links |
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | The current page |
| `--color-fg-subtle` | `--color-bg-canvas` | 4.5:1 | The separator (decorative, held to the text minimum anyway) |
| `--color-focus-ring` | `--color-bg-canvas` | 3:1 | Focus ring |

In forced-colours mode the link, muted and subtle roles resolve to the system colours the token file
defines; links stay underlined, so a link is never told from the current page by colour alone.

## Responsive behaviour

- The full trail shows at every width, wrapping onto further lines between items: the design-system page
  suggests a back link on phones, but no mock does it and the mocks' trails (at most three levels) fit
  or wrap (D-9). Past four items the middle folds at every width (D-5).
- An item that is wider than the line wraps inside itself, hanging beside its separator, and is never
  truncated. A label such as "Imago Dei in an Age of Machines: Personhood, Vocation and the Limits of
  Making in a World of Thinking Tools" takes three lines at 320 px, and an unbroken string breaks anywhere
  rather than push the page wider (D-4).
- Separators belong to the item after them, so a wrapped line can begin with its slash (D-6).
- The trail has the page container's measure and never stretches past it.
- Space around the trail follows where the page puts it. When a breadcrumb leads the page content, the
  page gives it `top="md"` and the page header or hero below it `top="md"`, so the gap from the top bar
  to the trail and from the trail to the eyebrow are each `--space-8` (the 178 mocks). Under a sidebar
  layout's column the trail is `top="xs"` with a header `top="xs"` (the policy editor), or `top="none"`
  when the column's own header sets its top (admin user, report detail, appeal review). Inside a lead
  block, as in the lesson player, it is `top="none"`. The module player adds `bottom="sm"`, and the data
  export, which puts the trail below its page header, uses `bottom="sm"` alone.
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom and at 400 % at 1280 px everything stays
  available; every link is at least `--target-min` (24 CSS px) tall, and no two links' 24 px target
  circles overlap (`L2-132`).

## Accessibility

### Role and pattern

- A `nav` landmark named by `label` ("Breadcrumb") around an ordered list, the
  [WAI-ARIA breadcrumb pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/): `ol` so the
  number of levels is announced, `aria-current="page"` on the last item when it is the current page.
- The separator is generated content with empty alternative text, so it is not read. The component
  adds no ARIA beyond `aria-label`, `aria-current` and the fold button's `aria-expanded` and
  `aria-label`.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Moves through the ancestor links (and the fold button) in visual order. The current page is skipped: it is not interactive. |
| <kbd>Enter</kbd> | On a link, follows it. On the fold button, expands the trail and moves focus to the first revealed link. |
| <kbd>Space</kbd> | On the fold button, the same as <kbd>Enter</kbd>. |

### Focus

- The shared ring (`--color-focus-ring`, `--focus-ring-width`, offset `--focus-ring-offset`) on each link
  and on the fold button; no sticky header covers a focused link.
- Activating the fold button moves focus to the first revealed link, because the button leaves the DOM.
  Following a link moves focus to the new page's `h1` (the shell's route focus, `L2-126`).

### Labelling

- The landmark is named by `label`. A page has one breadcrumb, so its name does not clash with the
  primary navigation, a sidebar's "Studio views" or a tab list (`L2-127`).
- Each link is named by its text, which is the page's own title. The current page is named by its text and
  announced as "current page".
- The fold button's name is `foldLabel` ("Show 2 more levels"). Its visible "…" is a glyph, not a word,
  so the name does not need to contain it.
- Never add "You are here": the current page is marked by `aria-current`, not by a label.

### Announcements

None. The trail is static between navigations; a route change is announced by the page's title and heading
(`L2-126`), and the fold button's result is carried by the focus move.

### Motion

None: nothing animates, so reduced motion changes nothing.

## Content and internationalisation

- Each label is the page's own title, exactly as its header writes it: "Theology of technology", "Imago
  Dei in an Age of Machines", "Dr. Abena Mensah", "Made, Not Manufactured". Do not add the current
  section from the top bar unless it is a real parent page, never end the trail with a separator, never
  link the current page, and never fill the trail from the back button.
- The first items name areas ("Explore", "Studio", "Admin", "Courses", "Events", "Experts",
  "Collections", "Queue", "Appeals", "Analytics", "Your data"); the last item is the item's title, or
  a word for its kind when the title is long ("Article") or a loading placeholder ("Loading account").
- Translatable inputs: `label`, `foldLabel`, and the area labels the page passes in `items`. Data values:
  item titles (topic names, course titles, member names) and every `path`.
- A label 30 % longer, or a long title in French, wraps; nothing clips (`L2-150`).

## Performance

- Change detection: `OnPush`, signal inputs. The visible items are a `computed` of `items` and the
  expanded flag; the template holds no function calls.
- Perf-test scenario: `frontend/projects/perf-test/src/scenarios/Breadcrumb.ts` renders the article page's
  trail ("Explore" › "Theology of technology" › "Article"); iterations in
  `e2e/perf-test/config/scenario-iterations.mjs` keep it at roughly 100–300 ms.
- Composite scenarios: none.
- Layout stability: the trail is server-rendered with the page (`L2-142`) and renders the same items
  on hydration, so its height does not change; the nav's height is its text, with no image or late font
  dependency beyond the page's own font loading.

## Acceptance criteria

### Rendering

- **AC-1** Given the topic "Theology of technology", when its page renders, then the "Breadcrumb" navigation lists "Explore" as a link to the catalogue and "Theology of technology" as plain text with `aria-current="page"`, and the page's header below it still shows the eyebrow "Topic". (L2-005)
- **AC-2** Given the article "What Augustine Might Say About Large Language Models" in the topic "Theology of technology", when its page renders, then the trail lists "Explore" and "Theology of technology" as links and "Article" as the current page. (L2-045)
- **AC-3** Given the profile of Dr. Abena Mensah, when it renders, then the trail lists "Experts" as a link to the directory and "Dr. Abena Mensah" as the current page; and on the profile of The Rev. Canon Dr. Thomas Alexander Hale-Whitcombe the current page reads that full name. (L2-021)
- **AC-4** Given the course "Imago Dei in an Age of Machines", when its overview renders, then the trail lists "Courses" as a link and "Imago Dei in an Age of Machines" as the current page. (L2-025)
- **AC-5** Given Miriam Clarke in lesson "3.2 Representing, not resembling" of "Imago Dei in an Age of Machines", when the lesson player renders, then the trail above the lesson title lists "Imago Dei in an Age of Machines" as a link to the course overview and "3. Image and likeness" as the current page. (L2-028)
- **AC-6** Given the video "Augustine and the Algorithm", when its page renders, then the trail lists "Explore" and "Videos" as links and the video's title as the current page. (L2-044)
- **AC-7** Given the event "Faith and AI Evening: Is Creativity Sacred?", when its page renders, then the trail lists "Events" as a link and the event's title as the current page. (L2-052)
- **AC-8** Given Dr. Abena Mensah editing "Can Software Bear the Image of God?" in the studio, when the editor renders, then the trail lists "Studio" and "Articles" as links and the article's title as the current page. (L2-075)
- **AC-9** Given an Administrator opening the account of Miriam Clarke, when the page renders, then the trail lists "Admin" and "Users" as links and "Miriam Clarke" as the current page. (L2-095)
- **AC-10** Given the page of the video "Augustine and the Algorithm" while it is loading or has failed, when the trail renders, then "Explore" and "Videos" are both links, no item has `aria-current`, and the page's skeleton or error state follows it. (L2-141)
- **AC-11** Given the event page after its request failed, when the trail renders, then it holds one item, "Events", a link, and no current page. (L2-141)
- **AC-12** Given an Administrator opening an account that is still loading, when the trail renders, then the last item reads "Loading account" as the current page and is not a link, and when the account loads it reads the member's name. (L2-141)
- **AC-13** Given any trail, when its DOM is inspected, then it is `nav > ol.breadcrumb > li`, each `li` holds one `a` or one `span[aria-current="page"]` (or the fold button), and no `li` or `ol` text contains a slash or any other separator. (L2-127)
- **AC-14** Given the video page's trail whose "Videos" item has the `path` "/explore?type=video", when the member follows that link, then the rendered `href` is "/explore?type=video", the app navigates without a full page load, the page title updates and focus moves to the catalogue's main heading. (L2-126)

### Collapsed trails

- **AC-15** Given a studio trail of five items ("Studio", "Courses", "Imago Dei in an Age of Machines", "3. Image and likeness", "3.2 Representing, not resembling") and `foldLabel` "Show 2 more levels", when it renders, then it shows "Studio", a button named "Show 2 more levels" with `aria-expanded="false"`, "3. Image and likeness" and "3.2 Representing, not resembling"; and a trail of four items shows all four with no button. (L2-127)
- **AC-16** Given the folded studio trail with focus on its fold button, when the user presses <kbd>Enter</kbd>, then "Courses" and "Imago Dei in an Age of Machines" appear in order between "Studio" and "3. Image and likeness", the button is gone, and focus is on the "Courses" link. (L2-126)
- **AC-17** Given the folded trail at 320 px, when it renders, then the folded trail and the expanded trail both wrap without clipping or horizontal scrolling. (L2-130)

### States

- **AC-18** Given an ancestor link, when the pointer hovers it, then its colour becomes `--color-fg-link-hover` with an underline of `--border-width-thick`, and the hovered colour meets 4.5:1 against its background. (L2-129)
- **AC-19** Given the current page, when a keyboard user tabs through the trail, then the current page is never focused, it has no hover change and no link cursor. (L2-126)

### Keyboard and focus

- **AC-20** Given the lesson player's trail, when a keyboard user presses <kbd>Tab</kbd> from the "Skip to main content" link past the top bar, then the "Imago Dei in an Age of Machines" link is reached before the lesson's controls, in visual order, and <kbd>Enter</kbd> opens the course overview. (L2-126)
- **AC-21** Given a focused ancestor link, when it is measured, then it shows a focus ring at least 2 CSS px thick with at least 3:1 contrast against the canvas, and a sticky header does not cover it. (L2-126)

### Screen readers

- **AC-22** Given the course overview, when a screen reader reads the trail, then it announces a navigation named "Breadcrumb", a list of 2 items, "Courses, link" and "Imago Dei in an Age of Machines, current page", and no slash. (L2-127)
- **AC-23** Given the studio page with its top bar navigation, the sidebar navigation and the trail, when the landmarks are listed, then the trail's navigation is named "Breadcrumb" and no two navigations share a name. (L2-127)
- **AC-24** Given the pseudo-locale build, when any trail renders, then its landmark's accessible name is the pseudo-localized "Breadcrumb", and the fold button's name is the pseudo-localized "Show 2 more levels". (L2-147)

### Theming

- **AC-25** Given the dark theme, when a trail renders, then the links, the current page and the separator use tokens with dark values and nothing keeps a light-only colour. (L2-134)
- **AC-26** Given both themes, when contrast is measured, then links meet 4.5:1 on the canvas, the current page meets 4.5:1, and the focus ring meets 3:1. (L2-129)

### Responsive

- **AC-27** Given the course "Imago Dei in an Age of Machines: Personhood, Vocation and the Limits of Making in a World of Thinking Tools" at 320 px, when its overview renders, then the long title wraps onto further lines inside its item, hanging beside its separator, is not truncated, and the page does not scroll horizontally. (L2-130)
- **AC-28** Given the pseudo-locale build at XS, when a trail of three items renders, then no label is clipped or overlaps another and every full label can be read. (L2-150)
- **AC-29** Given the browser at 400 % zoom at 1280 px, when the studio trail "Studio" › "Collections" › "The Complete Personhood Library: Every Course, Talk, Article and Exercise on the Image of God, Minds and Machines" renders, then it reflows with no horizontal scrolling and no loss of text. (L2-129)
- **AC-30** Given a touch viewport of 375 px, when the trail renders, then each link is at least 24 CSS px tall and no two links' 24 px target circles overlap. (L2-132)
- **AC-31** Given the topic page at 375, 768, 1024 and 1440 px, when it renders with `top="md"` on the trail and `top="md"` on the page header, then the trail starts `--space-8` below the top bar and the header's eyebrow starts `--space-8` below the trail, matching the mock. (L2-130)

### Motion

- **AC-32** Given a user with reduced motion, when a link is hovered or the fold button expands the trail, then nothing animates. (L2-129)

### Performance

- **AC-33** Given the topic page fetched without running JavaScript, when the initial HTML is read, then it contains the "Breadcrumb" navigation with the "Explore" link and the current page "Theology of technology". (L2-142)
- **AC-34** Given the article page on the Lighthouse mobile profile, when it loads and hydrates, then the trail causes no layout shift and the page's Cumulative Layout Shift stays at or below 0.1. (L2-120)

## Implementation notes

- Planned. Folder `frontend/projects/components/src/lib/breadcrumb/`, one type per file: `breadcrumb.ts`
  (`Breadcrumb`), `breadcrumb.html`, `breadcrumb.scss`, `breadcrumb-item.ts` (`BreadcrumbItem`),
  `breadcrumb-top.ts` (`BreadcrumbTop`), `breadcrumb-bottom.ts` (`BreadcrumbBottom`), exported from the
  library's public API. Selector `nav[llBreadcrumb]` (an attribute component with a template).
- Template: `<ol class="breadcrumb">` with `@for` over the visible items; `@if (item.path !== null)`
  renders `<a [routerLink]="…">`, else `<span aria-current="page">`; the fold item renders the fold button
  once and only when `items().length > 4` and not expanded. Visible items are a `computed`; the expanded
  flag is a `signal(false)` that resets in an `effect` when `items` changes. Focus after expansion goes to
  the first revealed link through a `viewChild` and `afterNextRender`.
- Links use `RouterLink` with a `UrlTree` from `Router.parseUrl(path)`, so the query string stays a query
  string and `href` resolves; the component reads no route state itself.
- Composes the text [button](button.md) (`.btn.btn--text.btn--sm`, rendered as markup with the classes
  the library's button uses; the fold control is a plain `button`, not a projected `button[llButton]`).
- The design-system CSS needs: the separator's empty alternative text, `align-items: baseline` and
  `min-width: 0` with `overflow-wrap: anywhere` on `li`, `min-block-size: var(--target-min)` on links
  (D-4, D-6, D-8), and the `breadcrumb-nav` spacing modifiers (D-2). Keep the `.breadcrumb` class names:
  the e2e locators depend on them.
- The mocks change: the 226 inline `style` attributes become `breadcrumb-nav` modifier classes and the
  four `dialogs/confirm-captions/*` mocks render links and `aria-current` (D-7).
- The page-header CRD changes in the same pass (D-1): its `[slot=context]` and the "With breadcrumb"
  variant go, and its `top` rule keeps `md` for "under a breadcrumb". This CRD does not edit it.
- The design-system page lists two mocks as sources, and its "with home", "back link" variants are not
  built (D-9, D-10).

## Decisions

- **D-1** *The page-header CRD puts the breadcrumb in a `[slot=context]` that replaces the eyebrow; the
  mocks put it outside the header, above it, and keep the eyebrow. Which is it?* The mocks. All 226
  breadcrumbs are siblings before the lead block, never inside `.page-head`, and the lead block is not
  always a page header (a hero on the course overview, a profile head, an event head, the lesson title, a
  visually hidden `h1` in the studio editors). The eyebrow stays: "Topic", "Article · 12 min read" and
  "Course · Dr. Abena Mensah" say what kind of page it is, which the trail does not. So the page owns the
  placement, `ll-page-header` has no context slot, and the header below a breadcrumb uses `top="md"` (its
  existing "under a back link, band or breadcrumb" step). The page-header CRD's context slot, its "With
  breadcrumb" variant, its eyebrow-ignored rule and its Source rows need to follow; this CRD does not edit
  it. The design-system page's "goes above the page title in the page header" also reads as "above the
  header".
- **D-2** *What replaces the mocks' inline `padding-top`, `padding-block` and `margin-bottom` on the
  `nav`?* Two inputs, as the page header's `top` replaced its own inline styles: `top` (`none`, `xs`
  `--space-2`, `md` `--space-8`) and `bottom` (`none`, `sm` `--space-6`), as classes on the host. They
  cover every spacing in the mocks (178 `md`, 7 `xs`, 5 `md` + `sm`, 4 `sm` alone, 32 none); the `margin-bottom` of the data export
  becomes padding, which looks the same. The component still has no margin. When a breadcrumb leads
  the page content, the trail is `top="md"` and the header or hero below it `top="md"`.
- **D-3** *The loading and error mocks show a trail that ends in a link ("Explore" › "Videos", "Events")
  because the page's title is not known; the design-system page always ends in the current page. Which?*
  Both. An item with a `path` is a link; an item without one is the current page; a trail may have none.
  Nothing is marked `aria-current` when the page's own title is not known, and a page that can name
  its loading state ("Loading account", `pages/admin-user/loading`) passes that as the current item.
  The design-system page's "don't" (a lone current crumb on a top-level page) is kept as the rule that a
  trail of one item must be a link.
- **D-4** *How does a long last item wrap, and what happens to an unbroken string?* It wraps inside its
  item, hanging beside the separator, and is never truncated (design-system page: "Long names wrap … they
  are never truncated"); `L2-150` and `L2-129` forbid clipping. The current CSS only wraps between items,
  so `li` gets `min-width: 0` and `overflow-wrap: anywhere`, so a single long word breaks rather than
  widen the page at 320 px. The design-system CSS and page need the same rule.
- **D-5** *When does a trail fold, and what does the fold keep?* More than four items: the first item, the
  fold button and the last two items, as the design-system page says ("collapsing past four levels",
  "keep the root and the last two"), so the button hides `items.length - 3` levels. It applies at every
  width, not only on phones. Activation expands in place, one way, removes the button and moves focus to
  the first revealed link; the button's `aria-expanded` is set to `true` for the moment it leaves. The
  expanded state resets when the page passes new items. No mock has more than three levels, so this is
  specified ahead of use, and the first page that needs it passes `foldLabel`.
- **D-6** *The separator is CSS generated content; are those read?* Not if its alternative text is empty:
  `content: "/" / ""`, with the plain `content: "/"` before it for browsers that do not read the
  alternative form. The design-system page says screen readers skip generated content, which is true of
  some and not others, so the alternative text closes the gap. The separator belongs to the item after it,
  so a wrapped line can start with a slash: moving it to the end of the previous line needs script, and a
  leading slash still reads as a separator.
- **D-7** *`dialogs/confirm-captions/*` renders the page behind its dialog with plain `span`s for all
  three items and no `aria-current`. Is that a variant?* No; it is drift. The page behind a dialog is the
  page, made inert (page-header D-2), so the trail renders as it does on the page: "Studio" and "Videos"
  as links and "Made, Not Manufactured" as the current page. The four mocks change.
- **D-8** *Are small text links a problem for the 24 px target minimum (`L2-132`)?* They need a defined
  size, not a spacing argument: each link has `min-block-size: var(--target-min)` (the target is 24 px
  tall), with `--space-2` on both sides of each separator so adjacent targets do not overlap. The
  design-system page leaves links at line height and recommends a back link on phones for 44 px; the
  44 px rule is for primary actions (`L2-132`), and a breadcrumb is not one.
- **D-9** *The design-system page suggests a back link, instead of the trail, on phones; the mocks show
  the full trail at 360 px. Which?* The mocks: the trail at every width, wrapping. No mock draws a back
  link, and the icon set has no left chevron for it. A page that wants a back action at XS uses its own
  "Back to …" link; this component stays one list.
- **D-10** *The design-system page's "with home" variant (a home icon starting the trail)?* Not built. No
  mock uses it, every root in the product has a name ("Explore", "Studio", "Admin", "Courses"), and the
  icon set has no home icon. If a mock needs one, the CRD and the icon set change first. The design-system
  page's variants "With home" and "Back link" and its two listed source mocks need to follow the 226
  uses.
- **D-11** *Does the component emit the `BreadcrumbList` JSON-LD (`L2-144`)?* No. The structured data is
  built for every page below the home page, including pages with no breadcrumb, from the page's metadata
  service; it takes the same `items` the page passes here, and adds the current page's own address.
  Keeping it out of the component keeps the component pure and the JSON-LD in one place.
- **D-12** *`label` default?* None; it is required. The text is translated (`L2-147`) and the component
  holds no copy, so every page passes "Breadcrumb" from the catalogue. The value is the same
  across pages and kept that way by the catalogue entry.
- **D-13** *Does the `path` type allow route arrays or query parameters as separate fields?* No: one
  string, parsed with the router, so the item stays two fields and a page can build it from a route
  definition or a literal. Items are data the page builds, not the router's own state, so the component
  needs no route-data convention.
