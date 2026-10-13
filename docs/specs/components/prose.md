# Prose

| Field | Value |
|---|---|
| Selector | `ll-prose` |
| Library path | `frontend/projects/components/src/lib/prose/` |
| Status | planned |
| Traces to | L2-021, L2-045, L2-046, L2-105, L2-120, L2-123, L2-125, L2-126, L2-127, L2-129, L2-130, L2-134, L2-147, L2-150 |
| Design system | [`prose.html`](../../design-system/components/prose.html) |
| Source mocks | [`pages/expert-profile/default`](../../mocks/pages/expert-profile/default.html), [`pages/article-page/default`](../../mocks/pages/article-page/default.html), [`pages/article-page/loading`](../../mocks/pages/article-page/loading.html), [`pages/accessibility-statement/default`](../../mocks/pages/accessibility-statement/default.html), [`pages/policy/default`](../../mocks/pages/policy/default.html), [`dialogs/community-guidelines/default`](../../mocks/dialogs/community-guidelines/default.html), [`notifications/cookie-banner/persistent`](../../mocks/notifications/cookie-banner/persistent.html), [`pages/lesson-player/article`](../../mocks/pages/lesson-player/article.html), [`pages/event-page/default`](../../mocks/pages/event-page/default.html), [`pages/video-page/default`](../../mocks/pages/video-page/default.html), [`dialogs/course-outline/default`](../../mocks/dialogs/course-outline/default.html), [`pages/email-change-confirm/default`](../../mocks/pages/email-change-confirm/default.html), [`pages/article-editor/scripture`](../../mocks/pages/article-editor/scripture.html) |
| Rendering | [`prose.html`](prose.html) |

## Purpose and scope

Prose sets text that a person wrote, not the interface, in a calm reading column: an expert's bio, an
article, a policy, the accessibility statement, an event or video description, a lesson's text. It
styles the plain elements that text is made of (paragraphs, headings, lists, quotes, figures, tables,
Scripture references) so nobody classes them one by one, and it keeps the column to a readable measure.

The text arrives in one of two ways. Text that the API stores and has already sanitized (the expert bio,
the article body, a policy version, an event or video description) is passed as an HTML string and
rendered through Angular's `[innerHTML]`, with Angular's own sanitizer as a second line of defence.
Text the page writes itself (the accessibility statement, the three-bullet "what happens next" lists on
the email-change and invitation pages) is projected.

Out of scope:

- Sanitizing for storage: the API's `BioSanitizer` and `ArticleBodySanitizer` run on save and again on
  read (`L2-021`, `L2-046`). This component never replaces them.
- The article's header, cover, byline, topics and comments, the policy's version list, the page title:
  the page.
- The rich-text editor surface: `.editor__surface` shares the prose rules through the same stylesheet
  partial (D-9) but is the editor's component, not `ll-prose`.
- Embedded platform videos (`iframe`): Angular's sanitizer removes them (D-3); the page renders them.
- Review annotations (`mark.annotation`) and the loading skeleton themselves: projected by the page
  ([skeleton](skeleton.md)).

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/expert-profile/*` (every state but empty) and `dialogs/unfollow/success` | default, `html` = bio, `externalLabel` | two paragraphs: `em` "theological anthropology", `strong` "Made, Not Manufactured" | default | canvas |
| `pages/article-page/default`, `saved`, `updated`, `visitor`, `long` | article, `html` = body | `h2`, `p`, `em` (`lang="la"`, `lang="grc"`, `lang="he"`), `span.ref` with `span.muted` translation, `blockquote`, `h3`, `ul`, `sup` footnote links, footnote `ol`, `figure` | default, long | canvas |
| `pages/article-page/loading` | article, `loading`, slot | skeleton block and text lines | loading | canvas |
| `pages/lesson-player/*` (article lessons), `dialogs/course-outline/*`, `notifications/offline-notice/*`, `notifications/preview-banner/*`, `pages/preview/*`, `notifications/cookie-banner/persistent` | article, `html` = lesson or article body | `p`, `span.ref` "Exodus 20:8–11", `h2`, `blockquote`, `h3`, `ul`, `p.lead` | default, dark | canvas |
| `pages/accessibility-statement/default` | article, slot | `p`, `h2`, `ul` with `strong` | default | canvas |
| `pages/policy/*` (default, long, previous version, upcoming), `pages/policy-reconsent/*` | default, `html` = policy version | `h2`, `p`, `ul`, `div.table-wrap` with `table.data-table` "Retention schedule", `a` to `mailto:help@logoslab.ca` | default, long | canvas |
| `dialogs/community-guidelines/*` | default, `html` = guidelines version | numbered `h2`, `p` | default, scroll | dialog (raised surface) |
| `pages/event-page/*`, `pages/video-page/*` | default, `html` = description | `p`, `em` | default | canvas |
| `pages/email-change-confirm`, `pages/expert-invitation`, `pages/forgot-password/success`, `pages/register/success`, `pages/report-change/*` | default, slot | short `ul` or `ol` with `strong` | default | auth card or canvas |
| `pages/appeal-review/*`, `pages/review-item/*` | default, slot | `blockquote` (the member's appeal), paragraphs with `mark.annotation` | default | canvas |

The editor surfaces (`pages/article-editor/*`, `pages/policy-editor/*`, `pages/studio-editor/*`,
`pages/studio-profile/*`) apply the same rules to a `contenteditable` surface (D-9); their `h4`,
`.editor__flag` and `aria-invalid` markup belongs to the editor.

## Anatomy

1. **Column** — `div.prose` (+ `.prose--article`): a one-column grid with `--space-5` between blocks,
   capped at the measure, `overflow-wrap: anywhere`.
2. **Headings** — `h2` (light display face, `--font-size-2xl`, extra `--space-6` above), `h3` (`--text-h3`,
   extra `--space-4` above), `h4` (`--text-h4`, extra `--space-4` above). The first child never has extra
   space above.
3. **Paragraphs and list items** — `p`, `li`: `--text-body-lg`, `--color-fg-muted`. `p.lead` is the
   opening paragraph some pages class.
4. **Inline** — `strong` (semibold, `--color-fg-default`), `em`, `a` (`--color-fg-link`, breaks anywhere),
   `sup` with a footnote link, `span.ref` (Scripture reference: semibold, dotted underline), `span.muted`
   (translation), `code` and `kbd`.
5. **Lists** — `ul`, `ol`: inset `--space-6`, `--space-2` between items.
6. **Quote** — `blockquote > p`: `--space-5` inset, thick `--color-border-strong` rule, `--color-fg-default`.
7. **Figure** — `figure > img + figcaption`: the image is full column width with `--radius-lg`; the caption
   is `--text-caption` in `--color-fg-subtle`.
8. **Table** — `div.table-wrap > table.data-table > caption, thead, tbody`: scrolls inside its own container.
9. **Code and rule** — `pre > code` scrolls inside its own box; `hr` is a hairline.
10. **Footnotes** — an `ol` whose items end with a back link `a[href^="#fnref-"]`.

Host: `ll-prose` is `display: block`; it renders the column `div.prose` and nothing else. The page puts
its own `article` or `section` (with the label) around it.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `html` | `string \| null` | `null` | no | HTML the API already sanitized. Bound with `[innerHTML]`. `null` renders the projected content instead; any string, including `''`, renders the string and not the slot. |
| `variant` | `'default' \| 'article'` | `'default'` | no | `'article'` adds `.prose--article`: the measure for articles and lessons (`--layout-measure-article`). |
| `loading` | `boolean` | `false` | no | Sets `aria-hidden="true"` on the column and renders the projected skeleton, not `html`. The page owns the "Loading…" status message and `aria-busy` (see [skeleton](skeleton.md)). |
| `externalLabel` | `string \| null` | `null` | no | Visually hidden text added to every external link in `html` ("(external site, opens in a new tab)"). While `null`, external links are left as the API wrote them. Pages that render a bio or body pass it (`L2-147`). |

- Inputs are signal inputs; `loading` uses `booleanAttribute`.
- The component holds no other state and renders no copy of its own; every string arrives as input or content.

### Outputs

None. The component is passive; a link inside it navigates as a link does.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | the page's own markup: `p`, `h2`, `h3`, `ul`, `ol`, `blockquote` and so on, with `i18n` | Rendered only when `html` is `null`. Never post-processed (D-6). Declared once in an `<ng-template>` and placed in the column. |

### Security contract

This is the one requirement that matters most, and tests rely on it.

- `html` is rendered only through Angular's `[innerHTML]` binding. The component never calls
  `DomSanitizer.bypassSecurityTrustHtml` (or any `bypassSecurityTrust*` method), never assigns
  `innerHTML` or `outerHTML` itself, never uses `insertAdjacentHTML`, and never compiles the string as an
  Angular template.
- What Angular's sanitizer does to the string, and so what a test can rely on:
  - `script`, `style` and `template` elements are removed together with their content; `iframe`, `object`,
    `embed`, `svg`, `form`, `input` and `button` elements are removed.
  - Every attribute outside Angular's allow-list is removed: all `on*` handlers, `style`, `id`, `data-*`,
    `srcdoc` and `loading`. `class`, `lang`, `dir`, `role`, `aria-*`, `title`, `width`, `height`, `target`,
    `rel`, `scope`, `colspan`, `rowspan` and `tabindex` are kept.
  - A `javascript:` URL in `href`, `src` or `cite` is rewritten with an `unsafe:` prefix and does nothing.
  - `{{ … }}`, `{% … %}` and unknown tags such as `<ll-panel>` stay inert: they are text or empty elements,
    never bound or instantiated.
- The tags `p`, `h1`–`h6`, `ul`, `ol`, `li`, `blockquote`, `figure`, `figcaption`, `img`, `a`, `em`, `strong`,
  `b`, `i`, `u`, `sup`, `sub`, `code`, `pre`, `kbd`, `mark`, `hr`, `br`, `span`, `div`, `section`, `table`
  and its parts survive; this is wider than the API's allow-lists, which are the first line of defence.
- The `html` is data from the API, never a template and never a component input of another component.

## Variants and sizes

| Variant | Modifier | Measure | Use for |
|---|---|---|---|
| Default | none | `--layout-narrow` | Expert bio, event and video descriptions, policies, guidelines, short "what happens next" lists. |
| Article | `.prose--article` | `--layout-measure-article` (70 characters) | Articles, lessons, the accessibility statement, reading text over a preview or banner. |

One size. The column fills its container up to the measure. There is no `sm` size: no mock needs one.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Muted paragraphs, default-colour headings and `strong`, link-colour links | Document semantics unchanged |
| Link hover | `:hover` on `a` | `--color-fg-link-hover`, thick underline | — |
| Link focus | `:focus-visible` on `a` | `--focus-ring-width` ring in `--color-focus-ring`, offset `--focus-ring-offset` | Link name read, then the external-link text |
| Footnote target | `:target` on a footnote `li` or reference | Scrolled into view below sticky chrome (`--space-8` scroll margin) | The note's text is the reference link's description |
| External link | `a[target="_blank"]` | Same as a link | "Faculty page (external site, opens in a new tab)" |
| Loading | `loading` | The projected skeleton in the same column width | Hidden (`aria-hidden="true"`) |
| Empty | `html` is `''` | An empty column | Nothing |
| Scrolling table or code | content wider than the column | The `table-wrap` or `pre` scrolls on its own | Focusable region with a name |

Prose has no disabled, busy, error or selected state. An article that fails to load is the page's error
state, not the prose's.

## Markup

```html
<!-- rendered: default, expert bio -->
<ll-prose>
  <div class="prose">
    <p>Abena Mensah is a theologian who writes about what it means to be human. Dr. Mensah's work in <em>theological anthropology</em> asks how the church's teaching that we are made in the image of God should shape the way we build and use machines that speak and reason.</p>
    <p>Dr. Mensah teaches systematic theology, leads the Imago Dei cohort on Logos Lab each autumn, and preaches regularly in congregations across the Maritimes and Ontario. The book <strong>Made, Not Manufactured</strong> came out in 2025.</p>
  </div>
</ll-prose>
```

```html
<!-- rendered: article, after sanitization and enhancement -->
<div class="prose prose--article">
  <p>Augustine never saw a computer. But few writers have thought harder about what it is to remember, to pay attention and to be distracted.</p>
  <h2>What a model “remembers”</h2>
  <p>… it is predicting, very well, what a plausible answer would look like.<sup><a href="#fn-1" id="fnref-1" aria-describedby="fn-1">1</a></sup></p>
  <p>The psalmist asks, <span class="ref">Psalm 8:4 <span class="muted">(NRSV)</span></span>, “what are human beings that you are mindful of them?”</p>
  <blockquote><p>“A store of data is not a self. Augustine would have said that a self is a memory turned toward love.”</p></blockquote>
  <h3>Three questions to take with you</h3>
  <ul><li>What do I hope a chatbot will remember for me, and what should I remember myself?</li></ul>
  <ol><li id="fn-1">Dr. Joel Santos explains this well in <a href="/videos/inside-a-neural-network-in-ten-minutes">Inside a Neural Network in Ten Minutes</a>. <a href="#fnref-1" aria-label="Back to reference 1">↩</a></li></ol>
</div>
```

```html
<!-- rendered: external link in a bio, after enhancement -->
<a href="https://kingsgate.example.ca/faculty/mensah" target="_blank" rel="noopener noreferrer">Faculty page<span class="vh"> (external site, opens in a new tab)</span></a>
```

```html
<!-- rendered: figure and scrolling table -->
<figure><img src="…" alt="Hands holding three cups of coffee together over a wooden table." width="1200" height="800" loading="lazy" decoding="async"><figcaption>What we share at the table is more than the sum of what we can do.</figcaption></figure>
<div class="table-wrap" tabindex="0" role="region" aria-label="Retention schedule">
  <table class="data-table"><caption class="vh">Retention schedule</caption><thead><tr><th scope="col">Data</th><th scope="col">How long</th></tr></thead><tbody><tr><th scope="row">Request logs</th><td>90 days</td></tr></tbody></table>
</div>
```

```html
<!-- rendered: loading -->
<div class="prose prose--article" aria-hidden="true">
  <span class="skeleton skeleton--block"></span>
  <div><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div>
</div>
```

```html
<!-- consumer: stored text -->
<article aria-labelledby="body-title">
  <h2 class="vh" id="body-title" i18n>The article</h2>
  <ll-prose variant="article" [html]="article().bodyHtml" [externalLabel]="externalLabel" />
</article>
<ll-prose [html]="expert().bioHtml" [externalLabel]="externalLabel" />
<ll-prose variant="article" [loading]="loading()"><span llSkeleton class="skeleton--block"></span>…</ll-prose>
```

```html
<!-- consumer: page-written text -->
<ll-prose variant="article">
  <p i18n>Logos Lab is for everyone who wants to think carefully about faith and artificial intelligence.</p>
  <h2 i18n>How we check</h2>
  <ul><li i18n>Every page and every state is scanned automatically with axe-core before each release.</li></ul>
</ll-prose>
```

## Design

- Anything with an `id` (heading or footnote) keeps `scroll-margin-top: var(--space-8)` (D-5).
- Column: `display: grid`, `gap: var(--space-5)`; width `max-width: var(--layout-narrow)`, article
  `max-width: var(--layout-measure-article)`; text breaks anywhere (`overflow-wrap: anywhere`) so no string
  widens the column (D-5).
- `h2`: `--text-h2` at `--font-size-2xl`, `margin-top: var(--space-6)`. `h3`: `--text-h3`, `margin-top:
  var(--space-4)`. `h4`: `--text-h4`, `--color-fg-default`, `margin-top: var(--space-4)` (D-1). Headings use
  `text-wrap: balance` (D-5). `h2[id]` and `h3[id]` keep `scroll-margin-top: var(--space-8)`.
- Text: `p`, `li` in `--text-body-lg`; `strong` uses `--font-weight-semibold`.
- Lists: `padding-left: var(--space-6)`, `gap: var(--space-2)`. Nested lists use the same rule.
- Quote: `padding-left: var(--space-5)`, `border-left: var(--border-width-thick) solid var(--color-border-strong)`;
  its paragraphs inherit `--color-fg-default`. A pull quote arrives as a `blockquote` and looks the same (D-4).
- Figure: `gap: var(--space-3)`; `img` `width: 100%`, `height: auto` (D-5), `border-radius: var(--radius-lg)`;
  `figcaption` `--text-caption`, `--color-fg-subtle`.
- Scripture reference `.ref`: `--font-weight-semibold`, dotted underline, `white-space: nowrap` from SM
  (`--layout-breakpoint-sm`) and may wrap below it (D-5); the translation in `span.muted` uses `--color-fg-muted`.
- `hr`: hairline `--border-width-hairline` in `--color-border-default`, `margin-block: var(--space-4)` (D-1).
- `code`: `--font-family-mono` at `--font-size-sm`, `--color-bg-surface-sunken`, `--radius-xs`, `--space-1`
  inline padding. `pre`: `--space-4` padding, `--radius-md`, scrolls horizontally, `code` inside it has no
  fill (D-1).
- Table: the table-wrap and `.data-table` rules of the design system, unchanged; the container scrolls
  horizontally and is focusable (D-7).
- Footnotes: `li` in `--text-body-sm` (`.prose .footnotes` in the design system applies when the page adds
  the class; the API's `ol` needs none).
- Links: global `a` rules; no prose-specific colour exists.
- Motion: none.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Paragraph, list item | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Heading, `strong`, quote | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Link | `--color-fg-link` | `--palette-accent-700` | `--palette-accent-300` |
| Link hover | `--color-fg-link-hover` | `--palette-accent-800` | `--palette-accent-200` |
| Caption | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Quote rule | `--color-border-strong` | `--palette-stone-500` | `--palette-night-500` |
| Focus ring | `--color-focus-ring` | `--palette-accent-700` | `--palette-accent-300` |
| Code fill | `--color-bg-surface-sunken` | `--palette-oat-200` | `--palette-night-850` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | Headings, `strong`, quote |
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Paragraphs |
| `--color-fg-muted` | `--color-bg-surface-raised` | 4.5:1 | Paragraphs in the community-guidelines dialog |
| `--color-fg-link` | `--color-bg-canvas` | 4.5:1 | Links |
| `--color-fg-subtle` | `--color-bg-canvas` | 4.5:1 | Figure caption |
| `--color-focus-ring` | `--color-bg-canvas` | 3:1 | Link focus ring |

## Responsive behaviour

- The column fills its container up to the measure (`--layout-narrow` or `--layout-measure-article`); from
  MD up it sits at the start of the content area, never centred by the component.
- At 320 px nothing scrolls horizontally: long link text, long unbroken strings and a Scripture reference
  wrap; a table or `pre` scrolls inside its own container, and the page does not.
- Headings wrap and balance; images are full column width at every size.
- At 200 % and 400 % zoom the column stays one column and no text is clipped. With WCAG text-spacing
  overrides (line height 1.5, paragraph spacing 2 times, letter spacing 0.12, word spacing 0.16) nothing
  clips or overlaps.
- Links inside paragraphs have about 32 px of line height; the design system says to put important links on
  their own line. The 44 px target rule does not apply to links inside a sentence.

## Accessibility

### Role and pattern

Plain document semantics; the component adds no role to the column. The page's `h1` is in the page header;
`h2` starts sections and `h3`, `h4` nest inside, and the component never changes a heading level or adds a
heading (`L2-046` refuses a skipped level on submission). `ol` is for steps and footnotes, `ul` otherwise.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Moves through links, then a focusable table region or code block, in document order. |
| <kbd>Enter</kbd> | Follows a link; a footnote reference moves to its note and the back link returns. |
| <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd> | Scroll a focused table region or code block. |

### Focus

Only links, a `.table-wrap` and a `pre` take focus. Links use the shared ring (`--focus-ring-width`,
`--focus-ring-offset`), which is at least 3:1 and 2 px thick (`L2-126`) and is not hidden by sticky chrome
because headings and footnote targets keep `scroll-margin-top`.

### Labelling

- Link text names the destination ("how we protect your workspace"), never "here"; that is the author's
  rule, in the content guidance below.
- An external link's accessible name ends with `externalLabel`.
- A footnote reference link is described by its note (`aria-describedby` to the note's id); the back link
  keeps the API's `aria-label` ("Back to reference 1").
- A scrolling table region is named by its table caption; a code block is named by the `aria-label` the API
  wrote. A table without a caption, or a `pre` without an `aria-label`, is not made focusable (D-7).
- Interface names are in `strong` so they stand out without colour.
- Images carry the API's `alt`; the component never writes, changes or invents alternative text
  (`ArticleSubmissionValidator` refuses an image without `alt` that is not marked decorative).
- Foreign-language text keeps its `lang` (`la`, `grc`, `he`, `he-Latn`) so a screen reader switches voice.

### Announcements

None. A loading column is hidden; the page announces the loading status.

### Motion

None. Nothing animates in prose and nothing autoplays.

## Content and internationalisation

- The component owns no copy. Stored text arrives translated by the API in the viewer's language; page-written
  text carries `i18n` (`L2-147`).
- Translatable input: `externalLabel` ("(external site, opens in a new tab)"; French "(site externe, s'ouvre
  dans un nouvel onglet)"). Data values: `html`, `variant`, `loading`.
- Scripture references stay as written ("Psalm 8:4", "Exodus 20:8–11") with the translation in `span.muted`
  ("(NRSV)"); the component does not parse or reformat them (the API's `ScriptureReferenceParser` does).
- Quotes keep their typographic quotation marks as stored.
- Author guidance from the design system: plain words, second person, short sentences; lead each section with
  the answer; real dates in full ("Friday 9 October 2026"); paragraphs of about four sentences; bold interface
  names.
- Layouts accept 30 % longer text: paragraphs wrap, headings wrap and balance, nothing is truncated (`L2-150`).

## Performance

- Change detection: `OnPush`, signal inputs. The enhancement pass (D-6) runs once per change of `html` or
  `externalLabel`, in one DOM walk, after render; it never re-parses the string.
- Perf-test scenario: none in this repository yet. The scenario to add is
  `frontend/projects/perf-test/src/scenarios/Prose.ts`, rendering "What Augustine Might Say About Large Language
  Models" (the long article body, with footnote, figure and Scripture references) in the article variant, plus Dr.
  Abena Mensah's two-paragraph bio; iterations in `e2e/perf-test/config/scenario-iterations.mjs` keep it at
  roughly 100–300 ms.
- Composite scenarios: the article page and the policy page, once they exist.
- Layout stability: images carry the API's `width` and `height` and are full width with `height: auto`, so the
  box is reserved (`L2-120`); the loading skeleton uses the same column width as the loaded body.
- Images below the fold are `loading="lazy"` and `decoding="async"`; the cover (the LCP image) is the page's, not the prose's (`L2-123`).
- No third-party library: no markdown parser, no sanitizer package, no highlighter.

## Acceptance criteria

### Rendering

- **AC-1** Given Dr. Abena Mensah's expert profile, when her bio renders from `html`, then the column `div.prose` holds two paragraphs, the words "theological anthropology" are in an `em` and "Made, Not Manufactured" is in a `strong`, and the paragraphs are `--color-fg-muted` while the `strong` is `--color-fg-default`. (L2-021)
- **AC-2** Given the article "What Augustine Might Say About Large Language Models", when its body renders with `variant="article"`, then the column has `.prose--article`, the "What a model “remembers”" `h2` and "Three questions to take with you" `h3` appear in order, the `ul` has three items, and no element appears that the HTML string did not contain. (L2-046)
- **AC-3** Given the accessibility statement, when its page-written paragraphs and "How we check" and "Known limitations" headings are projected and `html` is `null`, then the column renders exactly the projected markup and nothing else. (L2-125)
- **AC-4** Given the article page while the article loads, when `loading` is true with skeleton lines projected, then the column is `aria-hidden="true"`, `html` is not rendered, and the column has the same width as the loaded article. (L2-120)

### Security

- **AC-5** Given `html` equal to `<p onclick="window.pwned = 1">Hello</p><script>window.pwned = 2</script>`, when it renders and the paragraph is clicked, then the DOM has no `script` element and no `onclick` attribute, the text "Hello" remains, and `window.pwned` is still undefined. (L2-105)
- **AC-6** Given `html` equal to `<p><a href="javascript:window.pwned = 3">Read the guidelines</a></p>`, when it renders and the link is activated, then the link's `href` starts with `unsafe:` and `window.pwned` is still undefined. (L2-105)
- **AC-7** Given `html` containing a `style="position: fixed"` attribute, an `iframe` and an `id="admin"` attribute, when it renders, then the rendered DOM has no `style` attribute, no `iframe` and no `id="admin"`. (L2-046)
- **AC-8** Given `html` equal to `<p>{{ 7 * 7 }} and <ll-button>Pay</ll-button></p>`, when it renders, then the paragraph shows the literal text "{{ 7 * 7 }} and " and no Logos Lab button is created. (L2-105)

### Links and notes

- **AC-9** Given `externalLabel` "(external site, opens in a new tab)" and a bio link `<a href="https://kingsgate.example.ca/faculty/mensah">Faculty page</a>`, when it renders, then the link has `target="_blank"` and `rel="noopener noreferrer"`, ends with a `.vh` span holding the label, and its accessible name is "Faculty page (external site, opens in a new tab)". (L2-021)
- **AC-10** Given links to `/experts/amara-osei`, `#fn-1` and `mailto:help@logoslab.ca` in the same string, when it renders, then none of them gains `target`, `rel` or the hidden label. (L2-021)
- **AC-11** Given the article "What Augustine Might Say About Large Language Models", when a keyboard user tabs to the "Inside a Neural Network in Ten Minutes" link, then it shows a 2 px `--color-focus-ring` outline offset by `--focus-ring-offset`, at least 3:1 against the canvas, and the sticky header does not cover it. (L2-126)
- **AC-12** Given an article with a footnote reference `<sup><a href="#fn-1">1</a></sup>` and a note whose back link is `#fnref-1`, when it renders, then the list item holding the back link has `id="fn-1"`, the reference link has `id="fnref-1"` and `aria-describedby="fn-1"`, activating "1" scrolls "fn-1" into view, and the back link "Back to reference 1" returns to the reference. (L2-046)

### Content

- **AC-13** Given an article figure with the alt text "Hands holding three cups of coffee together over a wooden table.", when it renders, then the image is the full column width with `--radius-lg`, has the API's `width` and `height` and `height: auto`, the caption "What we share at the table is more than the sum of what we can do." sits below it in `--color-fg-subtle`, and the page does not shift when the image loads. (L2-120)
- **AC-14** Given an article image below the fold, when it renders, then the image has `loading="lazy"` and `decoding="async"`. (L2-123)
- **AC-15** Given the sentence "The psalmist asks, Psalm 8:4 (NRSV), …", when it renders, then "Psalm 8:4" is a `span.ref` in semibold with a dotted underline, "(NRSV)" is a `span.muted` inside it in `--color-fg-muted`, and at 640 px the reference does not break across lines. (L2-046)
- **AC-16** Given the quotation “The image is not a trait we possess; it is a calling we receive.”, when it renders, then it is a `blockquote` with a thick `--color-border-strong` rule on its start edge, `--color-fg-default` text and its quotation marks unchanged. (L2-046)
- **AC-17** Given the privacy policy's "Retention schedule" table, when it renders at 320 px, then the `.table-wrap` scrolls horizontally on its own, it is focusable with the name "Retention schedule", and the page itself does not scroll horizontally. (L2-130)
- **AC-18** Given a paragraph containing a link whose text is a 120-character unbroken address, when it renders at 320 px, then the text wraps inside the column and nothing is cut off. (L2-130)

### Measure

- **AC-19** Given the article body at 1440 px, when its longest paragraph is measured, then no line is longer than 75 characters and the column is no wider than `--layout-measure-article`. (L2-045)
- **AC-20** Given the privacy policy at 1440 px, when a paragraph is measured, then the column is no wider than `--layout-narrow` and no line is longer than 75 characters. (L2-130)

### Theming

- **AC-21** Given the article page in the dark theme, when the body renders, then paragraphs use `--color-fg-muted`, headings and `strong` use `--color-fg-default`, links use `--color-fg-link`, the quote rule uses `--color-border-strong`, all at their dark values, and no element keeps a light-only colour. (L2-134)
- **AC-22** Given both themes, when contrast is measured, then paragraphs, links and captions on the canvas and paragraphs on the community-guidelines dialog surface are at least 4.5:1. (L2-129)

### Responsive

- **AC-23** Given the article at 320 px containing "1 Corinthians 15:51–57 (NRSV)", when it renders, then the reference wraps inside the column and the page does not scroll horizontally. (L2-130)
- **AC-24** Given the browser zoomed to 400 % at 1280 px, when the article renders, then it reflows into one column with no horizontal scrolling and no lost content. (L2-129)
- **AC-25** Given WCAG text-spacing overrides (line height 1.5, paragraph spacing 2, letter spacing 0.12, word spacing 0.16), when the privacy policy renders, then no text is clipped or overlaps. (L2-129)
- **AC-26** Given the pseudo-locale build with 30 % longer strings, when the community guidelines render at XS and XL, then every paragraph and numbered heading wraps and none is clipped or truncated. (L2-150)

### Screen readers

- **AC-27** Given the article body, when its structure is read, then headings keep the levels in the string (`h2`, then `h3`), the three questions are a list of three items, and the component adds no heading, landmark or role. (L2-127)
- **AC-28** Given `externalLabel` "(site externe, s'ouvre dans un nouvel onglet)" in a French build, when an external link renders, then its hidden text is exactly that string and no English label is present. (L2-147)

## Implementation notes

- Planned. Folder `frontend/projects/components/src/lib/prose/`, one type per file: `prose.ts` (`Prose`),
  `prose.html`, `prose.scss`, `prose-variant.ts` (`ProseVariant`), and `prose-enhancer.ts`
  (`ProseEnhancer`, the post-render pass); export from the library's `public-api.ts`.
- `Prose`: standalone, `OnPush`, `ViewEncapsulation.Emulated`. Because `[innerHTML]` content never receives the
  component's encapsulation attribute, the `prose` block lives under `:host ::ng-deep`, as the other block
  components do. Put the rules in a shared partial (`_prose.scss`) so the editor surface includes it (D-9).
- Template: one `<ng-template #projected><ng-content /></ng-template>`; `@if (html() !== null)` renders
  `<div class="prose" [class.prose--article]="…" [innerHTML]="html()">`, otherwise the same `div` with the
  template outlet. `loading` renders the slot branch and `aria-hidden`.
- Enhancement (D-6) runs in `afterRenderEffect` on the `html` and `externalLabel` signals and only on the
  `[innerHTML]` branch. It uses DOM APIs (`setAttribute`, `append`) on the already sanitized nodes and never
  builds HTML strings. It is idempotent: a second run changes nothing.
- Enhancements, in order: (1) external links (absolute `http:` or `https:` URL whose origin differs from the page's
  origin, no existing `.vh` child): `target`, `rel`, hidden `span.vh` with `externalLabel`; (2) footnotes: the
  `li` containing `a[href^="#fnref-"]` gets `id` from that fragment's pair (`#fnref-1` gives `fn-1`), the
  `a[href^="#fn-"]` gets `id="fnref-n"` and `aria-describedby="fn-n"`; (3) images: `loading="lazy"`,
  `decoding="async"`; (4) `.table-wrap` with a `caption` and every `pre`: `tabindex="0"`, `role="region"` and
  `aria-label` from the caption text (for `pre`, only if the element has an `aria-label`).
- The existing `.prose` rules live in `docs/design-system/assets/components.css`. The additions D-1 and D-5 (`h4`,
  `hr`, `code`, `pre`, `figure img` height, `overflow-wrap`, `text-wrap`, `.ref` wrapping) are not there yet; the
  design-system page catches up (listed under Decisions).
- The design-system page lists `.prose` for only two mocks and does not mention `.prose--article`; this CRD records
  both from the inventory.
- Do not add a Playwright test that asserts `bypassSecurityTrustHtml` is absent from the source (AGENTS.md: no
  architecture tests). AC-5 to AC-8 prove the behaviour.

## Decisions

- **D-1** *Which elements does prose style beyond the design system's list?* The design system styles `h2`, `h3`,
  `p`, `ul`, `ol`, `strong`, `a`, `blockquote`, `figure`, `figcaption`, `.ref`. The article allow-list (`L2-046`) adds `h4`,
  and the API and the sanitizer let `hr`, `code`, `pre` and `table` through. The CRD styles them from existing tokens
  (`h4` with `--text-h4`, `hr` as a hairline, `code` and `pre` on `--color-bg-surface-sunken`, the table with `table-wrap`
  and `data-table`) so no element renders with browser defaults. The design-system page is updated to match.
- **D-2** *One component or one per use?* One. Stored text and page-written text differ only in where the markup
  comes from, so `html` and the default slot share the column; `html` wins whenever it is not `null`.
- **D-3** *Embedded platform videos in an article body (`L2-046`).* Angular's sanitizer removes `iframe`, and the
  component never bypasses it, so prose does not render embeds. No mock shows one inside prose; the article page
  renders an embed from structured data beside the prose, and the API's allow-listed origins matter there, not
  here. If a mock adds an embedded video inside the body, the article page's design decides it; this CRD does not
  loosen the security contract.
- **D-4** *Pull quotes (`L2-046`).* They render as `blockquote`, identical to a block quote. No mock draws a
  different pull quote, so the CRD adds no variant.
- **D-5** *Gaps between the design-system CSS and the mocks and L2.* Applied as specimens in the HTML:
  `.prose { overflow-wrap: anywhere }` so no unbroken string widens the grid column (`L2-130`); `text-wrap:
  balance` on headings (the design-system page claims it, the CSS lacks it); `figure img { height: auto }` so
  width and height attributes reserve a box without stretching it (`L2-120`); `.ref` wraps below 30rem so a long
  reference ("1 Corinthians 15:51–57 (NRSV)") cannot overflow at 320 px (`L2-130`); `.prose [id]` keeps the
  heading scroll margin so a footnote target is not hidden under sticky chrome (`L2-126`).
- **D-6** *Angular's sanitizer removes `id`, but the article needs footnote targets.* The mocks use `id="fn-1"`
  and `id="fnref-1"` (and heading ids), and no screen links to a heading id. Heading ids are not restored: nothing
  needs them. Footnote ids are restored by the component from the back link's fragment, as a post-render pass
  that sets `id` with DOM APIs on the sanitized nodes. This is not a bypass: Angular has already
  sanitized the string, and the pass only sets known attributes on the resulting elements. The same pass adds the external-link, image and scroll-region
  attributes the sanitizer strips or the API cannot know. Slot content is never enhanced: the page wrote it.
  Consequence: one prose with footnotes per page, because ids are page-wide.
- **D-7** *Scrolling tables and code (`L2-130` AC2 asks for keyboard access).* The mocks' `.table-wrap` is not
  focusable. The component makes a `.table-wrap` with a caption focusable (`tabindex="0"`, `role="region"`,
  named by the caption); a table without a caption is not made focusable, and the API must supply one.
  `pre` is made focusable the same way only when it has an `aria-label`. This keeps every focusable region named.
- **D-8** *`externalLabel` default.* `null`, not an English string: the library has no hard-coded copy
  (`L2-147`). A page that renders a bio or body without passing it leaves external links as the API wrote them;
  the expert profile and article pages always pass it (`L2-021`).
- **D-9** *The editor's `.editor__surface prose`.* The rich-text editor surface uses the prose rules so authors see
  what readers see (`L2-078` previews content as published). It is a `contenteditable` element owned by the editor's
  component, so it cannot be an `ll-prose`. Both include the same `_prose.scss` partial; the editor CRD cites
  this decision. The editor's own markup (`.editor__flag`, `aria-invalid`) is not prose.
- **D-10** *Two variants only.* `default` (44rem) and `article` (70 characters). The mocks use no third measure; the
  lead paragraph (`p.lead`, `--layout-measure`) stays a class on a paragraph, not a variant.
- **D-11** *Where do the cover image, the hidden "The article" heading and the footnote section sit in the article
  page?* They stay the page's: the page wraps `ll-prose` in `article[aria-labelledby]` with the hidden heading and the
  cover above it, at the same width. The mock's `article.prose` becomes `article > ll-prose > div.prose`; the
  `.prose` class and the BEM parity remain, so locators keep working.
- **D-12** *The footnote reference's description.* The mock describes a reference by the "Notes" heading. The
  heading's id would be stripped, so the component describes the reference by its note (`aria-describedby="fn-n"`),
  which gives a screen-reader user the note's text without leaving the sentence.
- **D-13** *No `size` input.* The brief allowed `sm` only if a mock needed it; none does. Short lists on the auth
  pages use the same column and the card's width caps it.
