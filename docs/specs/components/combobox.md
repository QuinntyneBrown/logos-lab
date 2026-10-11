# Combobox

| Field | Value |
|---|---|
| Selector | `ll-combobox` |
| Library path | `frontend/projects/components/src/lib/combobox/` |
| Status | planned |
| Traces to | L2-003, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-150 |
| Design system | [`combobox.html`](../../design-system/components/combobox.html) |
| Source mocks | [`dialogs/search-suggest/default`](../../mocks/dialogs/search-suggest/default.html), [`dialogs/search-suggest/busy`](../../mocks/dialogs/search-suggest/busy.html), [`dialogs/search-suggest/invalid`](../../mocks/dialogs/search-suggest/invalid.html), [`dialogs/search-suggest/empty`](../../mocks/dialogs/search-suggest/empty.html), [`dialogs/search-suggest/failed`](../../mocks/dialogs/search-suggest/failed.html), [`dialogs/search-suggest/long`](../../mocks/dialogs/search-suggest/long.html) |
| Rendering | [`combobox.html`](combobox.html) |

## Purpose and scope

The combobox is the site search with suggestions: as a person types, a list drops below the search pill
with up to six matching courses, experts and topics, grouped and with the typed part in bold, ending in
"See all results for “imag”". Arrow keys move through the options, Enter opens one (or searches), and
Escape closes the list. While suggestions load, are unavailable or there are none, the list says so,
and a polite live region announces the count or the state.

Use a select for a fixed choice and the search pill alone where no suggestions are offered.

Out of scope:

- Fetching suggestions, the 250 ms wait and the 2-character minimum: the application's
  `SiteSearchField`, which feeds the combobox its options and status.
- Highlighting: the options arrive as typed text segments; the combobox renders `mark` for the
  highlighted ones and never binds HTML.
- Where an option or a search leads: the consumer handles the outputs.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `dialogs/search-suggest/default` (top bar, wide field and search row) | label "Search Logos Lab", list label "Suggestions for imag" | groups Courses, Experts, Topics; options with icon, text with `mark`, meta "Course", "Expert", "28 items"; foot "See all results for “imag”"; live "3 suggestions. Use the up and down arrows to move through them." | open, active option | raised surface over canvas |
| `dialogs/search-suggest/busy` | status busy | spinner "Searching…" | busy | raised surface |
| `dialogs/search-suggest/invalid` | status invalid, query invalid | attention icon "Enter at least 2 characters." | invalid | raised surface |
| `dialogs/search-suggest/empty` | status empty | "No courses, experts or topics match “liturgy”."; foot "Search for “liturgy”" | empty | raised surface |
| `dialogs/search-suggest/failed` | status failed | danger "Suggestions aren’t available right now. Press Enter to search." | failed | raised surface |
| `dialogs/search-suggest/long` | status limit | "Searches can be up to 200 characters, so the field stops there."; foot with the full query | limit | raised surface |

## Anatomy

1. **Container** — `div.combobox` (+ the consumer's `header__search` or `header__search--wide`).
2. **Search pill** — the [text field](text-field.md)'s `form.search` with its query as the combobox
   input (`role="combobox"`).
3. **List** — `ul.combobox__list[role=listbox]` labelled "Suggestions for …", absolutely positioned
   below the pill.
4. **Group label** — `li.combobox__group[role=presentation]`.
5. **Option** — `li[role=presentation] > a.combobox__option[role=option]` with an [icon](icon.md),
   `span.combobox__text` (with `mark` around highlighted segments) and `span.combobox__meta`.
6. **Status** — `li.combobox__status[role=presentation]` (+ `--danger`) with a spinner or icon.
7. **Foot** — `li.combobox__foot[role=option]`: search for the whole query.
8. **Live region** — `p.vh[aria-live=polite]`.

Host: `ll-combobox` is `display: contents`; it renders the container, the search pill, the list and the
live region.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string` | — | yes | The query's hidden label, "Search Logos Lab". |
| `placeholder` | `string` | `''` | no | Placeholder. |
| `inputId` | `string` | — | yes | The query's `id`; the list's id derives from it. |
| `maxlength` | `number` | `200` | no | The query's `maxlength`. |
| `value` | `string` | `''` | no | Initial query. |
| `open` | `boolean` | `false` | no | Shows the list and sets `aria-expanded`. |
| `listLabel` | `string` | `''` | no | The listbox's name, "Suggestions for imag". |
| `groups` | `readonly ComboboxGroup[]` | `[]` | no | `{ label: string; options: readonly ComboboxOption[] }`; `ComboboxOption` is `{ id: string; segments: readonly TextSegment[]; meta: string; icon: IconName; path: string }`; `TextSegment` is `{ text: string; highlighted: boolean }`. |
| `status` | `'busy' \| 'invalid' \| 'empty' \| 'failed' \| 'limit' \| null` | `null` | no | Renders the status row; `invalid` also sets `aria-invalid` on the query and describes it by the status. |
| `statusText` | `string` | `''` | no | The status row's text. |
| `footText` | `string \| null` | `null` | no | Renders the foot option. |
| `announcement` | `string` | `''` | no | The live region's text. |

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| `queryChanged` | `string` | The person types. |
| `optionChosen` | `ComboboxOption` | An option is activated by pointer or by Enter while active. |
| `searched` | `string` — the trimmed query | Enter with no active option, the foot option, or the form submits. |
| `dismissed` | `void` | Escape is pressed while the list is closed (the consumer may close a search row). |

### Content slots

None.

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Site search | — | The top bar's search, wide (XL) or in the search row (below XL). |

One size: options `--target-comfortable` tall; list max height `--size-combobox-max`.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Closed | `open` false | Search pill only | `aria-expanded="false"` |
| Open | `open` true with groups | List below the pill | `aria-expanded="true"`; live "3 suggestions…" |
| Active option | arrow keys | `--color-accent-subtle` wash, `aria-selected="true"` | `aria-activedescendant` names it |
| Hover | `:hover` on an option | `--color-bg-subtle` | — |
| Busy | `status="busy"` | Spinner and "Searching…"; list `aria-busy="true"` | Live "Searching…" |
| Invalid | `status="invalid"` | Attention icon and "Enter at least 2 characters." | Query `aria-invalid="true"`, described by the status |
| Empty | `status="empty"` | "No courses, experts or topics match “liturgy”." and the foot | Live "No suggestions. Press Enter to search for liturgy." |
| Failed | `status="failed"` | Danger text "Suggestions aren’t available right now. Press Enter to search." | Live with the same text |
| Limit | `status="limit"` | "Searches can be up to 200 characters, so the field stops there." | Query described by the status; live "200 of 200 characters." |

## Markup

```html
<!-- rendered: open -->
<div class="combobox header__search">
  <form class="search" role="search">
    <svg class="icon" aria-hidden="true">…</svg>
    <label class="vh" for="site-search">Search Logos Lab</label>
    <input class="search__input" id="site-search" name="q" type="search" maxlength="200" role="combobox" aria-expanded="true" aria-controls="site-search-list" aria-autocomplete="list" autocomplete="off" aria-activedescendant="site-search-option-0">
  </form>
  <ul class="combobox__list" id="site-search-list" role="listbox" aria-label="Suggestions for imag">
    <li class="combobox__group" role="presentation">Courses</li>
    <li role="presentation"><a class="combobox__option" id="site-search-option-0" role="option" aria-selected="true" href="/courses/imago-dei-in-an-age-of-machines"><svg class="icon" aria-hidden="true">…</svg><span class="combobox__text"><mark>Imag</mark>o Dei in an Age of Machines</span><span class="combobox__meta">Course</span></a></li>
    <li class="combobox__foot" role="option" aria-selected="false" id="site-search-all">See all results for “imag”</li>
  </ul>
  <p class="vh" aria-live="polite">3 suggestions. Use the up and down arrows to move through them.</p>
</div>
```

```html
<!-- consumer: SiteSearchField -->
<ll-combobox label="Search Logos Lab" inputId="site-search" [open]="open()" [groups]="groups()" [status]="status()" [statusText]="statusText()" [footText]="footText()" [announcement]="announcement()" (queryChanged)="type($event)" (optionChosen)="open($event)" (searched)="search($event)" />
```

## Design

- List: `--z-dropdown`, `--space-2` below the pill, padding `--space-2`, `--radius-lg`,
  `--color-bg-surface-raised`, hairline, `--shadow-3`, max height `--size-combobox-max` with scrolling.
- Group label `--text-overline` uppercase subtle; option grid icon / text / meta, gap `--space-3`,
  padding `--space-2` `--space-3`, `--radius-md`; text truncates with an ellipsis; `mark` is semibold
  without a fill; meta `--text-caption` subtle.
- Status `--text-body-sm` muted (danger `--color-danger-fg`); foot separated by a hairline.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| List | `--color-bg-surface-raised` | `--palette-white` | `--palette-night-850` |
| Option | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Active | `--color-accent-subtle` | accent subtle role | accent subtle role |
| Group, meta | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Danger status | `--color-danger-fg` | danger text role | danger text role |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface-raised` | 4.5:1 | Options |
| `--color-fg-default` | `--color-accent-subtle` | 4.5:1 | Active option |
| `--color-fg-subtle` | `--color-bg-surface-raised` | 4.5:1 | Group labels and meta |
| `--color-danger-fg` | `--color-bg-surface-raised` | 4.5:1 | Failed status |

## Responsive behaviour

- The list matches the pill's width. In the search row below MD the pill spans the row, and so does the
  list. Option text truncates with an ellipsis, and the full text stays the option's accessible name.
  At 320 px nothing scrolls horizontally; options are at least 44 px tall.

## Accessibility

### Role and pattern

APG combobox with a listbox popup (editable, list autocomplete): the query has `role="combobox"`,
`aria-expanded`, `aria-controls`, `aria-autocomplete="list"` and `aria-activedescendant`; options have
`role="option"` and `aria-selected`.

### Keyboard

| Key | Action |
|---|---|
| <kbd>↓</kbd> / <kbd>↑</kbd> | Moves the active option (wrapping, the foot included); focus stays in the query. |
| <kbd>Enter</kbd> | Opens the active option, or searches for the query when none is active. |
| <kbd>Escape</kbd> | Closes the list; pressed again (list closed), emits `dismissed`. |
| <kbd>Tab</kbd> | Leaves the field; the list closes. |

### Focus

Focus never leaves the query while moving through options; the active option shows the accent wash.

### Labelling

The query is labelled "Search Logos Lab"; the list is named "Suggestions for …"; each option's name is
its text and meta.

### Announcements

The live region announces the count ("3 suggestions. Use the up and down arrows to move through them."),
"Searching…", the empty, failed and limit messages, without moving focus (`L2-127` AC3).

### Motion

None.

## Content and internationalisation

- Statuses, the foot and announcements arrive translated; option texts are data.

## Performance

- `OnPush`; options render from signals; the list is not rendered while closed. Page budgets per
  `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given a visitor types "imag" in the site search, when suggestions arrive, then a listbox "Suggestions for imag" shows the groups Courses, Experts and Topics with "Imago Dei in an Age of Machines", "Dr. Abena Mensah" and "The image of God and personhood", the typed part in bold, and the foot "See all results for “imag”". (L2-003)
- **AC-2** Given the suggestions open, when the live region is read, then it says "3 suggestions. Use the up and down arrows to move through them." without moving focus. (L2-127)

### States

- **AC-3** Given suggestions are loading, when the list renders, then it is busy and shows "Searching…". (L2-003)
- **AC-4** Given the query "i", when the person pauses, then the list shows "Enter at least 2 characters." and the query is invalid and described by it. (L2-003)
- **AC-5** Given no suggestions match "liturgy", when they arrive, then the list says "No courses, experts or topics match “liturgy”." and offers "Search for “liturgy”". (L2-003)
- **AC-6** Given the suggestions service fails, when the person types, then the list shows "Suggestions aren’t available right now. Press Enter to search." and Enter still searches. (L2-003)

### Keyboard and focus

- **AC-7** Given open suggestions, when the person presses ↓ twice and Enter, then the second option is active (named by `aria-activedescendant`), focus stays in the query, and Enter opens "Dr. Abena Mensah". (L2-126)
- **AC-8** Given open suggestions, when the person presses Escape, then the list closes and `aria-expanded` is "false". (L2-126)

### Theming

- **AC-9** Given the dark theme, when suggestions open, then list, options, active wash and meta use dark token values. (L2-134)
- **AC-10** Given both themes, when contrast is measured, then options, the active option, meta and the failed status meet 4.5:1. (L2-129)

### Responsive

- **AC-11** Given the search row at 375 px, when suggestions open, then the list spans the row and nothing scrolls horizontally. (L2-130)
- **AC-12** Given a viewport of 375 px, when an option is measured, then it is at least 44 CSS px tall. (L2-132)
- **AC-13** Given the 200-character query from the long state, when the list renders at 375 px, then the foot wraps and nothing is clipped. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/combobox/`: `combobox.ts` (`Combobox`),
  `combobox-group.ts`, `combobox-option.ts`, `text-segment.ts`, `combobox-status.ts`, `.html`, `.scss`
  with the `combobox` block. Composes `Search`, `Icon` and the spinner rules.

## Decisions

- **D-1** *Is the foot an option?* Yes, as in the mocks (`role="option"`), so arrow keys reach "See all
  results" and Enter on it searches.
- **D-2** *Does Escape with the list closed do anything?* It emits `dismissed`, so the search row opened
  from the icon below XL can close and return focus to the icon, as the drawer does for Menu.
