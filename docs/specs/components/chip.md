# Chip

| Field | Value |
|---|---|
| Selector | `a[llChip]`, `button[llChip]`, `span[llChip]`, `ul[llChips]`, `div[llChips]` |
| Library path | `frontend/projects/components/src/lib/chip/` |
| Status | planned |
| Traces to | L2-003, L2-005, L2-071, L2-075, L2-082, L2-120, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-148, L2-150 |
| Design system | [`chip.html`](../../design-system/components/chip.html) |
| Source mocks | [`pages/search-results/no-results`](../../mocks/pages/search-results/no-results.html), [`pages/saved/default`](../../mocks/pages/saved/default.html), [`pages/saved/limit`](../../mocks/pages/saved/limit.html), [`pages/article-page/default`](../../mocks/pages/article-page/default.html), [`pages/studio-editor/default`](../../mocks/pages/studio-editor/default.html), [`pages/studio-editor/published`](../../mocks/pages/studio-editor/published.html), [`pages/studio-profile/default`](../../mocks/pages/studio-profile/default.html), [`pages/event-editor/default`](../../mocks/pages/event-editor/default.html), [`dialogs/change-attribution/default`](../../mocks/dialogs/change-attribution/default.html) |
| Rendering | [`chip.html`](chip.html) |

## Purpose and scope

A chip is a small pill that names a topic, a person or a filter. It comes in three kinds, chosen by the
element it sits on. A **link chip** (`a`) goes to a topic page: the "Popular topics" on a search with no
results, and the topic tags on articles, events, videos and expert profiles. A **toggle chip**
(`button`) turns one filter on or off, as in the saved items' type filter. A **static chip** (`span`)
shows a choice already made, an expert, a host, a topic or an area of expertise, and may carry a remove
button when the author can still change it. The `chips` group wraps a row of them and keeps an 8 px gap
at every width.

Use a [badge](badge.md) for a status the reader cannot act on ("Completed", "Scheduled"), tabs to switch
between whole views, and a [combobox](combobox.md) to search for and add a new topic or expert. A chip
only shows the choices that were already made.

Out of scope:

- Filtering the list, owning which chips are pressed, and the URL state: the page owns the value and
  binds `pressed` (L2-002 and L2-071 describe the page behaviour).
- Adding a chip ("Add topic" is a [button](button.md) beside the group) and deleting one from the
  model: the page handles `removed`.
- Where focus goes after a chip is removed, and the polite announcement of the new total ("14 saved
  items"): the page owns both.
- The `.chip__count` number style inside tabs and section titles ("Saved 14", "Comments 23"). The
  tab and section-title components own it; it is not a chip.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/search-results/no-results` "Popular topics" | `ul[llChips]` of `li > a[llChip]`, md, `count` | "Theology of technology" 41, "AI ethics" 37, "Church and ministry" 33, "The image of God and personhood" 28, "Formation and education" 22 | default, hover, focus | canvas, in an empty state |
| `pages/article-page/*`, `pages/event-page/*`, `pages/video-page/*`, `pages/expert-profile/*`, `dialogs/unfollow/success` topic tags | `ul[llChips]` of `li > a[llChip]`, `size="sm"`, no count | "Theology of technology", "Philosophy of mind", "Formation and education" | default, hover, focus | canvas, surface |
| `pages/expert-profile/*` areas of expertise | `ul[llChips]` of `li > a[llChip]`, `size="sm"` | "AI ethics" | default | canvas |
| `pages/saved/*` type filter (`default`, `limit`, `long`, `no-results`) | `ul[llChips]` of `li > button[llChip]`, md, `pressed`, `count` | "All 14", "Courses 3", "Modules 0", "Videos 3", "Articles 3", "Collections 3", "Events 2"; "All 1,000", "Courses 96", "Modules 41" | pressed true, pressed false, disabled (count 0), hover, focus | canvas, toolbar |
| `pages/studio-editor/*` topics (draft states) | `div[llChips]` of `span[llChip]` with `removeLabel` | "The image of God and personhood", "Theology of technology" | default, hover on the remove button, focus on the remove button | surface |
| `pages/studio-editor/{approved,archived,in-review,published,scheduled}`, `pages/event-editor/{cancelled,past}` | `div[llChips]` of `span[llChip]` without `removeLabel` (locked) | the same topics and hosts | default | surface |
| `pages/studio-profile/*` areas of expertise | `div[llChips]` of `span[llChip]` with `removeLabel` | "Formation and education", "The image of God and personhood" | default, invalid group (`aria-describedby` an error) | surface |
| `pages/event-editor/*` hosts | `div[llChips]` of `span[llChip]` with `removeLabel` | "Dr. Abena Mensah", "Rev. Dr. Thomas Hale" | default | surface |
| `dialogs/new-content/editor`, `dialogs/change-attribution/*` experts | `div[llChips]` of `span[llChip]` with `removeLabel` | "Dr. Abena Mensah", "Logos Lab" | default, busy dialog, invalid group (`aria-describedby` "Choose at least one expert, or attribute it to Logos Lab") | dialog surface |

Every row is buildable with the API below: the element selects the kind, and `size`, `count`, `pressed`
and `removeLabel` cover the rest. The design-system page also shows a leading `svg.icon.icon--sm` in a
toggle chip ("This week"); the default slot takes it, although no mock uses it yet.

## Anatomy

1. **Chip** — `.chip`. An inline-flex pill with a hairline border, `--control-height-sm` tall (or
   `--size-pill` with `.chip--sm`). It is the host element itself: `a`, `button` or `span`.
2. **Leading icon (optional)** — a projected `svg.icon.icon--sm`, `aria-hidden="true"`.
3. **Label** — the projected text. It is the accessible name.
4. **Count (optional)** — `.chip__count`, a `span` after the label, rendered by the component when
   `count` is not `null`. It is part of the accessible name ("Courses 3").
5. **Remove button (optional, static chips only)** — `.chip__remove`, a `button type="button"` holding
   an `svg.icon.icon--sm` close glyph with `aria-hidden="true"`, rendered by the component when
   `removeLabel` is set. It is `--target-min` square, and its own name is `removeLabel`.
6. **Group** — `.chips`, a `ul` of `li` or a `div` with `role="group"`; flex, wrapping, `--space-2` gap.

Host: the consumer's own `<a>`, `<button>` or `<span>`; the component adds the classes and renders the
count and remove button inside it, after the projected label. For a `ul` group the consumer writes the
`li` wrappers, each holding one chip.

## API

### Inputs

`Chip` (`a[llChip]`, `button[llChip]`, `span[llChip]`):

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `size` | `'md' \| 'sm'` | `'md'` | no | `sm` adds `.chip--sm`; `md` adds nothing. |
| `count` | `number \| null` | `null` | no | A number, including `0`, renders `.chip__count` after the label. The component formats it with the active locale (`LOCALE_ID`), so `1000` reads "1,000" in en-CA (D-2). `null` renders nothing. |
| `pressed` | `boolean \| null` | `null` | no | On a `button` only. `null` renders no `aria-pressed`; a boolean renders `aria-pressed="true\|false"`. Ignored on `a` and `span`. |
| `removeLabel` | `string \| null` | `null` | no | On a `span` only. A non-empty string renders the `.chip__remove` button with that string as its `aria-label`. `null` renders no button (a locked, read-only chip). Ignored on `a` and `button`, which must not contain a nested control. |

`Chips` (`ul[llChips]`, `div[llChips]`):

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string \| null` | `null` | no | Sets `aria-label` on the group. A group is always named: either `label` is set, or the consumer sets a native `aria-labelledby` pointing at the visible label ("Topics"). The component never overwrites a native `aria-labelledby` or `aria-describedby`; in development it throws when a group has neither (D-1). |

- Inputs are signal inputs; `size` is the only input that adds a modifier class.
- A `button` without a `type` becomes `type="button"`. `disabled` stays the native attribute on the
  `button`; the component adds nothing for it.
- The component never flips `pressed` itself. The page owns the value and rebinds it on click.
- The consumer's `routerLink`, `href`, extra classes and ARIA attributes stay on the host.

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| `removed` (`Chip`) | `void` | The user activates the `.chip__remove` button, by pointer, <kbd>Enter</kbd> or <kbd>Space</kbd>. Never emitted when `removeLabel` is `null`. |

`Chips` has no outputs. A link chip and a toggle chip are native elements, so the consumer listens to
their native `click` (or uses `routerLink`).

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | label text, with an optional leading `svg.icon.icon--sm` | The text is the name of the filter or choice, in sentence case. Icons carry `aria-hidden="true"`. |

## Variants and sizes

| Variant | Element | Modifier | Use for |
|---|---|---|---|
| Link | `a[llChip]` | — | A topic that opens its topic page: the topic tags and the popular topics. |
| Toggle | `button[llChip]` with `pressed` | — | One filter that is on or off, inside a labelled group. |
| Static | `span[llChip]` | — | A choice already made, read-only. |
| Removable | `span[llChip]` with `removeLabel` | — | A choice the author can still take away; the remove button is the control. |
| With count | any, with `count` | `.chip__count` | The number of items behind the chip. |

| Size | Modifier | Height | Padding | Type |
|---|---|---|---|---|
| md | — | `--control-height-sm` | `--space-4` | `--text-body-sm` |
| sm | `.chip--sm` | `--size-pill` | `--space-3` | `--text-caption` |

The pill grows with its label and never truncates it. Only the md size renders a count in the mocks and
only the sm size renders topic tags; the combinations are not restricted.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | `--color-bg-surface` fill, `--color-border-default` hairline, `--color-fg-default` label | Name from the label (and count) |
| Hover | `:hover`, `data-state="hover"` | `--color-border-strong` border, `--color-bg-subtle` fill | — |
| Focus | `:focus-visible`, `data-state="focus"` | `--focus-ring-width` ring in `--color-focus-ring`, offset `--focus-ring-offset` | Focus announced with the name |
| Active | `:active`, `data-state="active"` | `--color-accent-subtle-hover` fill while pressed down (not on a removable chip) | — |
| Pressed | `aria-pressed="true"` | `--color-accent-subtle` fill, `--color-accent` border, `--color-fg-accent` label | "pressed" |
| Not pressed | `aria-pressed="false"` | Default look | "not pressed" |
| Disabled | `disabled` (button only) | `--color-bg-subtle` fill, `--color-fg-disabled` label, `not-allowed` cursor; the count stays visible | Removed from the tab order; read as dimmed |
| Static | `span`, no remove button | Default look, `cursor` default for removable chips | Plain text |
| Remove hover | `:hover` on `.chip__remove` | `--color-bg-subtle-hover` round wash behind the glyph | — |
| Remove focus | `:focus-visible` on `.chip__remove` | The same focus ring, around the round button | Focus announced with `removeLabel` |
| Group invalid | `aria-describedby` points at the field's error text | The group is unchanged; the error shows below it | The error is read with the group's name |

A disabled chip is a filter with no results right now; it keeps its count of `0` so people see why
(L2-071 AC3).

## Markup

```html
<!-- rendered: link chip with count (search-results no-results) -->
<ul class="chips" aria-label="Popular topics">
  <li><a class="chip" href="/topics/theology-of-technology">Theology of technology <span class="chip__count">41</span></a></li>
</ul>

<!-- rendered: link chip, small, no count (article-page) -->
<ul class="chips" aria-labelledby="topics-label">
  <li><a class="chip chip--sm" href="/topics/theology-of-technology">Theology of technology</a></li>
</ul>

<!-- rendered: toggle chips (saved) -->
<ul class="chips" aria-label="Filter by type">
  <li><button class="chip" type="button" aria-pressed="true">All <span class="chip__count">14</span></button></li>
  <li><button class="chip" type="button" aria-pressed="false">Courses <span class="chip__count">3</span></button></li>
  <li><button class="chip" type="button" aria-pressed="false" disabled>Modules <span class="chip__count">0</span></button></li>
</ul>

<!-- rendered: removable static chips (studio-editor) -->
<div class="chips" role="group" aria-labelledby="topics-label" aria-describedby="topics-help">
  <span class="chip">The image of God and personhood <button class="chip__remove" type="button" aria-label="Remove The image of God and personhood"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></span>
</div>

<!-- rendered: locked static chip (studio-editor published) -->
<div class="chips" role="group" aria-labelledby="topics-label"><span class="chip">Theology of technology</span></div>
```

```html
<!-- consumer -->
<ul llChips label="Filter by type" i18n-label>
  <li><button llChip type="button" [count]="3" [pressed]="type() === 'course'" (click)="select('course')" i18n>Courses</button></li>
  <li><button llChip type="button" [count]="0" [pressed]="false" disabled i18n>Modules</button></li>
</ul>
<ul llChips aria-labelledby="topics-label">
  <li><a llChip size="sm" routerLink="/topics/theology-of-technology">Theology of technology</a></li>
</ul>
<div llChips aria-labelledby="topics-label" aria-describedby="topics-help">
  <span llChip [removeLabel]="removeTopicLabel(t)" (removed)="removeTopic(t)">{{ t.name }}</span>
</div>
```

## Design

- Chip: `inline-flex`, items centred, gap `--space-2`; `--control-height-sm` minimum height; padding
  `0 --space-4`; `--radius-full`; `--border-width-hairline` solid border; label `--text-body-sm`.
- Small: `--size-pill` minimum height; padding `0 --space-3`; label `--text-caption`.
- Count: `--text-caption` in `--color-fg-subtle`, tabular numerals.
- Remove button: `--target-min` square, `--radius-full`, no border, glyph in `currentColor`, pulled
  `--space-2` into the chip's right padding so the pill stays compact.
- Group: flex, wrapping, `--space-2` gap in both directions; a `ul` group has no list marker or padding.
- Cursor: pointer on link and toggle chips; default on a removable chip; `not-allowed` on a disabled one.
- Motion: background and border colour over `--duration-base` with `--ease-standard`, only when
  `prefers-reduced-motion: no-preference`.
- Forced colours: every chip keeps a `CanvasText` hairline border.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Fill | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |
| Resting border | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Label | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Count | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Hover border | `--color-border-strong` | `--palette-stone-500` | `--palette-night-500` |
| Hover fill | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |
| Active fill | `--color-accent-subtle-hover` | `--palette-accent-100` | `--palette-accent-900` |
| Pressed fill | `--color-accent-subtle` | `--palette-accent-50` | `--palette-accent-950` |
| Pressed border | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Pressed label | `--color-fg-accent` | `--palette-accent-700` | `--palette-accent-300` |
| Disabled fill | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |
| Disabled label | `--color-fg-disabled` | `--palette-oat-400` | `--palette-night-500` |
| Remove hover wash | `--color-bg-subtle-hover` | `--palette-oat-300` | `--palette-night-700` |
| Focus ring | `--color-focus-ring` | `--palette-accent-700` | `--palette-accent-300` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Label |
| `--color-fg-subtle` | `--color-bg-surface` | 4.5:1 | Count |
| `--color-fg-accent` | `--color-accent-subtle` | 4.5:1 | Pressed label |
| `--color-border-strong` | `--color-bg-surface` | 3:1 | Hover border |
| `--color-accent` | `--color-bg-surface` | 3:1 | Pressed border |
| `--color-focus-ring` | `--color-bg-surface` | 3:1 | Focus indicator |

A disabled chip is exempt from the contrast minimum. The resting border is decoration: the text and
the pill shape identify the control, and every state change is carried by tokens that meet 3:1 (D-4).

## Responsive behaviour

- A `.chips` row wraps at every width with the `--space-2` gap and never scrolls sideways. It sits
  beside the search field from 768 px and fills the container below it.
- A chip never truncates. A long name such as "The image of God and personhood" wraps inside the pill
  when the pill is wider than the row, so the pill never overflows (L2-150).
- The md chip is `--control-height-sm` tall and the remove button is at least `--target-min`
  (24 × 24 CSS px), the WCAG 2.2 AA minimum. Filter chips are not primary actions, so the 44 px
  touch target does not apply; the 8 px gap keeps neighbours from being hit by mistake.
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom every chip stays reachable.
- The filters collapse into a "Filters" dialog on narrow screens, and the applied filters show as
  removable pills above the list (the active-filter pill of the search and filter toolbar, not a chip).
  That layout belongs to the page; the chip does not change.

## Accessibility

### Role and pattern

A link chip is a native `<a href>`. A toggle chip is a native `<button type="button" aria-pressed>`
(APG Button, toggle). A static chip is plain text in a `span` with no role; its remove button is a native
`<button>`. A `div` group has `role="group"`; a `ul` group keeps its list semantics. Every group is
named.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Moves between chips; every link chip, enabled toggle chip and remove button is a stop. Static text and disabled chips are skipped. |
| <kbd>Enter</kbd> | Follows a link chip; toggles a toggle chip; activates a remove button. |
| <kbd>Space</kbd> | Toggles a toggle chip; activates a remove button. |

### Focus

The shared `--color-focus-ring` outline, `--focus-ring-width` thick and offset `--focus-ring-offset`,
shows on `:focus-visible` around the pill (or around the round remove button), and is not clipped by
the group. After a removal the page moves focus to the next chip, or to the group (`tabindex="-1"`) when
none is left; the chip does not manage focus itself.

### Labelling

- The label never changes when a chip is pressed; `aria-pressed` carries the state.
- The count is part of the name ("Courses 3"). Counts are not hidden words; a page that needs words
  states them in the label.
- A removable chip's text is read as text and its button is named by `removeLabel`, a complete phrase
  the consumer writes: "Remove Dr. Abena Mensah". The close glyph is `aria-hidden`.
- A group is named by `aria-label` ("Filter by type", "Popular topics") or by a visible label through
  `aria-labelledby` ("Topics"); the field's help or error text is attached with `aria-describedby`.

### Announcements

The chip announces nothing. After a toggle the page updates its polite live region ("14 saved items");
after a removal the page announces the new count where it has one.

### Motion

Under `prefers-reduced-motion: reduce` the colour transitions are removed and changes are instant.

## Content and internationalisation

- Name the filter or topic, not the action: "Courses", "Theology of technology". Sentence case, no
  terminal punctuation. Topic and area names are data from the taxonomy; people keep their titles
  ("Dr. Abena Mensah", "Rev. Dr. Thomas Hale").
- Counts are bare numbers, formatted with the locale's grouping (L2-148): "1,000" in en-CA, "1 000" in
  fr-CA.
- `removeLabel` is a complete translated phrase with the name inside it, not the name plus a fixed word
  built in the component.
- Translatable inputs: `label` (group), `removeLabel`. Data values: the label text, the topic and
  person names, `count`.
- A label 30 % longer wraps inside the pill and the row wraps; nothing is clipped.

## Performance

- Change detection: `OnPush`; inputs are signals, and the class list, `aria-pressed` and the formatted
  count are `computed`. A page toggling one chip re-renders only that chip.
- No perf-test project exists in this repository (see D-3); the chip is measured through the page
  budgets of `L2-120` and `L2-123`. The measured scenario is the saved-items page of Miriam Clarke:
  the seven type chips with counts "All 14" to "Events 2".
- Layout stability: a chip's size comes from its label, so a pressed toggle does not change the pill's
  size (the border width is the same pressed and not); the page reserves the toolbar row, so a count
  that updates shifts nothing outside its own pill.
- Weight: no dependencies beyond `@angular/core`, the icon component and the router link directive.

## Acceptance criteria

### Rendering

- **AC-1** Given a search for "transhumanist liturgy" that matches nothing, when the no-results state renders, then "Popular topics" lists five `a.chip` links beginning "Theology of technology 41" and "AI ethics 37", each with a `.chip__count`, in a list named "Popular topics". (L2-003)
- **AC-2** Given the article "Sabbath for the Always-On Mind" with the topic "Theology of technology", when the user activates its topic tag, then the page navigates to `/topics/theology-of-technology`, and the tag is an `a.chip.chip--sm` with no count. (L2-005)
- **AC-3** Given Miriam Clarke's saved items, when the type filter renders, then it shows seven `button.chip[type=button]` in a list named "Filter by type", with "All 14" pressed and "Courses 3" not pressed, each showing its count after the label. (L2-071)
- **AC-4** Given a member with 1,000 saved items in the en-CA locale, when the filter renders, then the first chip reads "All 1,000"; and given the fr-CA locale, then it reads "All" followed by the locale's grouped number with no code change. (L2-148)
- **AC-5** Given the studio editor for a draft with the topics "The image of God and personhood" and "Theology of technology", when the topics group renders, then each is a `span.chip` followed by a `.chip__remove` button, and the group is named "Topics" and described by "1 to 5 topics." (L2-082)
- **AC-6** Given the studio editor for an item In review, when the topics group renders, then each topic is a `span.chip` without a remove button, because editing is locked. (L2-075)
- **AC-7** Given the expert's name "Dr. Abena Mensah" chosen as the attribution of a new item, when the chip renders, then it is a removable `span.chip`; and given a chip with `removeLabel` null, then no `.chip__remove` is rendered. (L2-075)

### States

- **AC-8** Given the "Courses 3" toggle chip not pressed, when the user presses it, then it renders `aria-pressed="true"`, the `--color-accent-subtle` fill, `--color-accent` border and `--color-fg-accent` label, and its text still reads "Courses 3". (L2-071)
- **AC-9** Given the "Courses 3" chip pressed, when the user presses it again, then it renders `aria-pressed="false"` and the default look. (L2-071)
- **AC-10** Given the saved type filter with no modules, when "Modules 0" renders, then it is natively disabled, keeps its count "0" visible, shows the disabled fill and label, and is skipped by Tab. (L2-127)
- **AC-11** Given a removable chip "Formation and education", when the user activates its remove button, then `removed` is emitted once and the chip itself is not a button. (L2-127)

### Keyboard and focus

- **AC-12** Given the saved type filter, when the user tabs through it, then focus reaches each enabled chip in visual order, skips "Modules 0", and <kbd>Space</kbd> and <kbd>Enter</kbd> toggle the focused chip. (L2-126)
- **AC-13** Given any chip, link, toggle or remove button, when it receives keyboard focus, then a `--color-focus-ring` outline at least 2 CSS px thick with at least 3:1 contrast against the surface is visible and not clipped by its group. (L2-126)
- **AC-14** Given the last topic chip in the studio editor, when the user presses <kbd>Enter</kbd> on its remove button and the page removes it, then focus lands on the topics group and not on the page top. (L2-126)

### Screen readers

- **AC-15** Given the "All 14" toggle chip pressed, when it is read by a screen reader, then it is announced as "All 14, toggle button, pressed", and when another chip is pressed its label does not change. (L2-127)
- **AC-16** Given the remove button of "Dr. Abena Mensah", when it is inspected, then its accessible name is "Remove Dr. Abena Mensah" and its close glyph is hidden from assistive technology. (L2-127)
- **AC-17** Given a `div[llChips]` with `aria-labelledby="topics-label"`, when it is inspected, then it has `role="group"` named "Topics"; and given a `ul[llChips]` with `label` "Filter by type", then it is a list named "Filter by type". (L2-127)

### Theming

- **AC-18** Given the saved type filter in the dark theme, when each state renders (default, hover, active, pressed, disabled), then every colour comes from a token with a dark value and no state keeps a light-only colour. (L2-134)
- **AC-19** Given both themes, when contrast is measured, then the label meets 4.5:1 on the fill, the count 4.5:1, the pressed label 4.5:1 on its tint, and the hover border, pressed border and focus ring 3:1 against the surface. (L2-129)

### Responsive

- **AC-20** Given the saved type filter at 320 px, when it renders, then the chips wrap onto further rows with an 8 px gap and the page does not scroll horizontally. (L2-130)
- **AC-21** Given the popular topic "The image of God and personhood 28" in the pseudo-locale 30 % longer at 320 px, when it renders, then the label wraps inside the pill and nothing is clipped. (L2-150)
- **AC-22** Given a viewport of 375 px, when a chip and a remove button are measured, then the chip is at least 36 CSS px tall and the remove button at least 24 × 24 CSS px. (L2-132)

### Motion

- **AC-23** Given reduced motion, when the user hovers and presses a chip, then its fill and border change instantly without a transition. (L2-129)

### Performance

- **AC-24** Given the saved items page with seven toggle chips, when the user presses "Courses 3", then only that chip and the previously pressed chip re-render, and the page's cumulative layout shift stays at or below 0.1. (L2-120)

## Implementation notes

- Planned. Folder `frontend/projects/components/src/lib/chip/`, one type per file, each component with
  its own `.html` and `.scss`: `chip.ts` (`Chip`, selector `a[llChip], button[llChip], span[llChip]`),
  `chips.ts` (`Chips`, selector `ul[llChips], div[llChips]`), `chip-size.ts` (`ChipSize`), and
  `index.ts` re-exporting the three. Both are exported from the library's `public-api.ts`.
- `Chip`'s template projects the label, renders `.chip__count` when `count` is not `null`, and renders the
  `.chip__remove` button (with `svg llIcon name="close" size="sm"`) when `removeLabel` is set; both
  branches sit in one `<ng-template>`. Host class and `aria-pressed` are host bindings, so the
  consumer's own `class` is kept.
- The count is formatted with Angular's `formatNumber` and `LOCALE_ID`.
- Styles: the `chip` block of `components.css` with host selectors written `:host(.chip…)`; the
  `:has(.chip__remove)` rules become a `removable` host class set when `removeLabel` is set.
- The `.chip__count` class used inside tabs and section titles ("Saved 14", "Comments 23") is not part
  of `Chip`; the tab and section-title components re-declare the muted number style under their own
  names.
- The design-system page lists only `pages/studio-editor/default` under *Sources*; the mocks use the
  chip on the screens in the usage table.
- The design-system page shows the remove button named "Remove filter: tagged research" while the mocks
  say "Remove Theology of technology"; both are consumer copy through `removeLabel`.

## Decisions

- **D-1** *How is a group named when the mocks use a visible label?* The brief gave `label` as required
  (`aria-label`). The usage inventory shows eight groups named by a visible label with
  `aria-labelledby` and `aria-describedby` (studio editor, profile, event editor, attribution), so
  `label` is optional (`null`) and a native `aria-labelledby` is the alternative; one of the two must
  be present. The component never overwrites a native `aria-labelledby` or `aria-describedby`.
- **D-2** *Who formats the count?* The brief said the consumer. The input is numeric, and the saved mock
  shows "1,000", so the component formats the number with `LOCALE_ID` (L2-148 AC2) and the consumer
  passes the raw number. A `0` count renders, because disabled chips show "0".
- **D-3** *Where is the render-performance budget measured?* This repository has no perf-test project, as
  [button](button.md) D-3; the budgets of `L2-120` and `L2-123` measured on whole pages cover the chip.
  The scenario is the saved-items page for Miriam Clarke.
- **D-4** *Does the resting border need 3:1?* No. The design-system page names `--color-border-strong`
  and `--color-accent` for the 3:1 pairs, while the CSS draws the resting border in
  `--color-border-default`. The label is 4.5:1 and identifies the control, so the border is decoration;
  hover and pressed use the 3:1 tokens. The design-system page's "the hairline border keeps 3:1" should
  read "the hover and pressed borders keep 3:1".
- **D-5** *Is the remove button part of `Chip`'s template?* Yes. Every mock repeats the same button,
  label and glyph, and a template-owned button makes the name, the type and the icon consistent. The
  consumer supplies only the complete `removeLabel`, so the name is "Remove Dr. Abena Mensah" and the
  component holds no copy.
- **D-6** *What is a removable chip's accessible name?* None for the chip: a `span` has no role. The
  label is read as text and the button is named by `removeLabel`, as the mocks and the design-system
  page ("Removable chips are plain text with a real remove button") show.
- **D-7** *May a link or toggle chip be removable?* No. A control inside a `button` or `a` is invalid
  nesting, so `removeLabel` is ignored there. A removable chip is a choice the author made, such as the
  topics of an item; an applied catalogue filter is a pill of the search and filter toolbar.
- **D-8** *Who owns focus after a removal?* The page. The design-system page says focus moves to the
  next chip or the heading; the studio mocks give the group `tabindex="-1"` as the fallback target.
  The chip emits `removed` only.
- **D-9** *Who owns the pressed value?* The page. The chip renders `aria-pressed` from `pressed` and
  never toggles itself, so URL-driven filters (L2-002 AC3) and the saved filter stay in sync.
- **D-10** *Is `disabled` an input?* No. It stays the native attribute on `button[llChip]`, as in the
  mocks; disabled links and spans are not used (as [button](button.md) D-4).
- **D-11** *Are counts given hidden words?* No. The design-system page reads the count as part of the name
  ("Research 12") and no mock needs more; a page that needs words puts them in the label.
- **D-12** *Does the chip show a leading icon?* The default slot accepts a leading `svg.icon.icon--sm`
  for the design-system page's "with icon" chip, though no mock uses it yet, so adding one later does not
  change the API.
