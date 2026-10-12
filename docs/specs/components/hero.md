# Hero

| Field | Value |
|---|---|
| Selector | `ll-hero` |
| Library path | `frontend/projects/components/src/lib/hero/` |
| Status | built |
| Traces to | L2-001, L2-120, L2-127, L2-129, L2-130, L2-134, L2-150 |
| Design system | [`hero.html`](../../design-system/components/hero.html) |
| Source mocks | [`pages/home/default`](../../mocks/pages/home/default.html), [`pages/home/signed-in`](../../mocks/pages/home/signed-in.html), [`pages/course-overview/visitor`](../../mocks/pages/course-overview/visitor.html), [`pages/course-overview/default`](../../mocks/pages/course-overview/default.html) |
| Rendering | [`hero.html`](hero.html) |

## Purpose and scope

The hero opens a page that introduces something: the home page's promise with the site search and the
way into the catalogue, or a course's title, summary and enrolment actions. It pairs a text column
(eyebrow, display title, lead, actions) with an aside (a captioned photo or a cover tile).

Use the page header for ordinary page titles and the profile header for experts.

Out of scope:

- The search form's behaviour (the text-field CRD's search) and the enrolment actions (the page).
- Choosing the photo; the page passes it.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/home/*` | default | eyebrow "Faith and artificial intelligence"; `h1` "Think clearly about AI, *rooted in faith.*"; lead; search form; "Browse the catalogue" quiet lg link; aside: photo "Two people talking over coffee at a wooden table" captioned "After the September panel · Ottawa" | default, signed-in (same) | canvas |
| `pages/course-overview/*` | compact | eyebrow "Course · Dr. Abena Mensah"; `h1` "Imago Dei in an Age of Machines"; lead summary; actions "Sign in to enrol" + "Create a free account", or "Enrol", or "Continue lesson 3.2"; aside: cover tile `.content-card__cover.tile--sage` | visitor, member, enrolled, busy | canvas |

## Anatomy

1. **Section** — `section.hero` labelled by its title; a grid of two columns from LG.
2. **Text column** — first `div`: `p.eyebrow`, `h1.hero__title` (an `em` takes `--color-fg-accent`),
   `p.lead.hero__lead`, then a search form and/or `div.hero__actions`.
3. **Aside** — `div.hero__aside` holding a `figure.photo` (`.photo__frame` with an `img`,
   `figcaption.photo__caption` of two spans) or a cover tile.

Host: `ll-hero` is `display: contents`; it renders the `<section class="hero">` with the text column
and the aside, projecting the page's content into each.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `variant` | `'default' \| 'compact' \| 'centred'` | `'default'` | no | `compact` adds `.hero--compact`; `centred` adds `.hero--centred` and renders no aside. |
| `labelledBy` | `string` | — | yes | `id` of the projected title; set as the section's `aria-labelledby`. |

### Outputs

None.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | eyebrow, `h1.hero__title`, `p.hero__lead`, search form, `div.hero__actions` | Rendered in the text column in order. |
| `[slot=aside]` | `figure.photo` or a cover tile | Rendered in `.hero__aside`; omitted when `centred`. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Default | — | The home page: display title, generous space. |
| Compact | `.hero--compact` | Item pages such as a course overview: `--text-h1` title. |
| Centred | `.hero--centred` | A single centred column without an aside. |

## States

The hero has no interactive states of its own; its links and form follow their components. In the
loading state of an item page the page renders skeletons in the slots, not the hero.

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Two columns from LG, one below | `region` named by the title |
| Photo hover | `:hover` on `.photo` | The image scales to 1.03 over `--duration-deliberate` | — |

## Markup

```html
<!-- rendered: home -->
<section class="hero" aria-labelledby="hero-title">
  <div>
    <p class="eyebrow">Faith and artificial intelligence</p>
    <h1 class="hero__title" id="hero-title">Think clearly about AI, <em>rooted in faith.</em></h1>
    <p class="lead hero__lead">Courses, talks and reading from theologians, ethicists and engineers, reviewed by the Logos Lab editors. Everything is free with an account.</p>
    <form class="search" role="search">…</form>
    <div class="hero__actions"><a class="btn btn--quiet btn--lg" href="/explore">Browse the catalogue …</a></div>
  </div>
  <div class="hero__aside">
    <figure class="photo"><div class="photo__frame"><img src="…/coffee-together.jpg" alt="Two people talking over coffee at a wooden table" width="800" height="800"></div><figcaption class="photo__caption"><span>After the September panel</span><span>Ottawa</span></figcaption></figure>
  </div>
</section>
```

```html
<!-- consumer -->
<ll-hero labelledBy="hero-title">
  <p class="eyebrow" i18n>Faith and artificial intelligence</p>
  <h1 class="hero__title" id="hero-title" i18n>Think clearly about AI, <em>rooted in faith.</em></h1>
  …
  <figure class="photo" slot="aside">…</figure>
</ll-hero>
```

## Design

- Default: gap `--space-12`, padding `--space-16` / `--space-12`; from LG columns 1.6fr / 1fr, gap
  `--space-20`, padding `--space-24` / `--space-16`.
- Title `--text-display`, `--letter-spacing-tight`, max width `--layout-measure-display`; compact title
  `--text-h1`, max width `--layout-measure-title`.
- Lead margin `--space-8` (compact `--space-6`); actions margin `--space-10` (compact `--space-8`), gap
  `--space-3`.
- Photo frame `--radius-lg`, `--color-bg-subtle` behind the image, square (`photo--wide` 16:9);
  caption `--text-caption`, `--color-fg-subtle`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Title | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Title emphasis | `--color-fg-accent` | `--palette-accent-700` | `--palette-accent-300` |
| Lead | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Eyebrow, caption | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Photo frame | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-accent` | `--color-bg-canvas` | 3:1 | Display emphasis (large text) |
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Lead |
| `--color-fg-subtle` | `--color-bg-canvas` | 4.5:1 | Eyebrow and caption |

Photos are never filtered or inverted in the dark theme.

## Responsive behaviour

- Below LG one column: text first, aside after. From LG two columns aligned to the end.
- The display title wraps with balanced lines; at 320 px nothing scrolls horizontally; the image keeps
  its reserved square so it never shifts the page.

## Accessibility

### Role and pattern

A `<section>` named by its `h1` through `aria-labelledby` (a region landmark).

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Moves through the projected search and actions in order. |

### Focus

Owned by the projected controls.

### Labelling

`aria-labelledby` points at the title; the photo has meaningful `alt` text from the page.

### Announcements

None.

### Motion

The photo zoom is removed under reduced motion.

## Content and internationalisation

- All copy is projected and translated by the page; the caption is data.

## Performance

- `OnPush`; no inputs beyond two strings. The home photo is the LCP candidate: the page renders it with
  `width`, `height` and `fetchpriority="high"`.
- Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given a visitor opens `/`, when the hero renders, then it is a region named "Think clearly about AI, rooted in faith." whose `h1` is the page's only `h1`. (L2-127)
- **AC-2** Given the home hero, when it renders, then it offers a search field labelled "Search courses, videos, articles and experts" and a "Browse the catalogue" link to `/explore`. (L2-001)
- **AC-3** Given the home hero photo, when it loads, then its width and height are reserved so it causes no layout shift. (L2-120)

### Theming

- **AC-4** Given the dark theme, when the hero renders, then the title emphasis, lead and caption use dark token values and the photo is not filtered. (L2-134)
- **AC-5** Given both themes, when contrast is measured, then the lead and caption meet 4.5:1 and the title emphasis meets 3:1. (L2-129)

### Responsive

- **AC-6** Given a viewport of 320 px, when the hero renders, then it is one column and the page does not scroll horizontally. (L2-130)
- **AC-7** Given the pseudo-locale's 30 % longer copy at 375 px, when the hero renders, then no text is clipped. (L2-150)

### Motion

- **AC-8** Given reduced motion, when the user hovers the photo, then it does not zoom. (L2-129)

## Implementation notes

- Folder `frontend/projects/components/src/lib/hero/`: `hero.ts` (`Hero`), `.html`, `.scss` with the
  `hero` block (including `.photo`) under `:host ::ng-deep`.

## Decisions

- **D-1** *Does the hero own the photo markup?* No; the page projects `figure.photo`, because the course
  hero uses a cover tile instead. The hero styles both.
