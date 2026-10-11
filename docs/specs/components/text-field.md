# Text field

| Field | Value |
|---|---|
| Selector | `input[llInput]`, `form[llSearch]`, `div[llSearch]` |
| Library path | `frontend/projects/components/src/lib/text-field/` |
| Status | built |
| Traces to | L2-001, L2-003, L2-126, L2-127, L2-128, L2-129, L2-130, L2-132, L2-134, L2-150 |
| Design system | [`text-field.html`](../../design-system/components/text-field.html) |
| Source mocks | [`pages/home/default`](../../mocks/pages/home/default.html), [`pages/search-results/default`](../../mocks/pages/search-results/default.html), [`pages/experts/default`](../../mocks/pages/experts/default.html), [`pages/certificate-verify/default`](../../mocks/pages/certificate-verify/default.html), [`pages/sign-in/default`](../../mocks/pages/sign-in/default.html), [`pages/settings-profile/default`](../../mocks/pages/settings-profile/default.html), [`dialogs/search-suggest/default`](../../mocks/dialogs/search-suggest/default.html) |
| Rendering | [`text-field.html`](text-field.html) |

## Purpose and scope

The text field is the single-line input of every form — name, email, password, title, links, dates —
and, in its search form, the signature pill that holds a magnifier, the query and an optional action
inside. The input never carries its own label or error: the form field component wraps it with the
label, help and error text. The search pill does carry its own visually hidden label because it
stands alone in the top bar and the hero.

Use the textarea for multi-line text, the select for fixed choices, and the combobox for suggestions.

Out of scope:

- Labels, help, counts and error text around an input: the form field component.
- Search suggestions while typing: the search suggestions dialog and combobox.
- Validation rules: the page's form.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| top bar on every product page | search, `form`, extra class `header__search--wide`, no action | label "Search Logos Lab", placeholder "Search Logos Lab" | default, hover, focus | canvas |
| `pages/home/*` hero | search, `form`, with primary "Search" action | label "Search courses, videos, articles and experts", placeholder "Try “personhood” or “Augustine”" | default, focus | canvas |
| `pages/not-found/*`, `pages/gone/*` | search, `form`, with "Search" action | label "Search Logos Lab" | default | canvas |
| `pages/certificate-verify/*` | search, `form`, with "Check code" action | label "Certificate code" | default, invalid | canvas |
| `pages/admin-users/*`, `pages/studio/*`, `dialogs/item-picker/*` | search, `form` | "Search users by name or email", "Search published items" | default | surface |
| `dialogs/search-suggest/*` (top bar) | search, `form`, combobox query, `maxlength` 200 | label "Search Logos Lab" | default, busy, invalid, empty, failed, long | canvas |
| `pages/search-results/*`, `pages/experts/*` | search, `div` inside the page's filter form, with "Search" action | "Search all content", "Search experts by name" | default, focus | canvas |
| `pages/sign-in/*`, `pages/register/*`, `pages/settings-*/*`, studio editors, admin dialogs | input, lg (default) | types text, email, password, url, date, search; `autocomplete`, `inputmode`, `maxlength`, `aria-describedby` | default, hover, focus, invalid, readonly, disabled | surface, dialog |
| filter toolbars, dense admin rows | input, md or sm | type search or date | default | surface |

## Anatomy

1. **Input** — `input.input`: lg height by default, `--radius-md`, hairline border whose colour is the
   `--ll-field-border` knob.
2. **Search pill** — `.search` on the host `form` or `div`: a full pill with:
   - **Icon** — `svg.icon`, `aria-hidden="true"`, `--color-fg-subtle`;
   - **Label** — `label.vh`, visually hidden, tied to the input;
   - **Query** — `input.search__input[type=search]`, borderless, no outline of its own;
   - **Action (optional)** — a projected `button` (normally a primary [button](button.md)).

Host: `input[llInput]` is the native input itself; the component adds `.input` and the size modifier.
`form[llSearch]` and `div[llSearch]` are the pill itself; the component renders the icon, label and
query inside and projects the action after them.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `size` (`llInput`) | `'sm' \| 'md' \| 'lg'` | `'lg'` | no | Adds `.input--sm` or `.input--md`; `lg` adds nothing. |
| `invalid` (`llInput`) | `boolean` | `false` | no | Sets `aria-invalid="true"`; the form field sets it when the field has an error. |
| `label` (`llSearch`) | `string` | — | yes | Visually hidden label text. |
| `placeholder` (`llSearch`) | `string` | `''` | no | Placeholder; never a substitute for the label. |
| `inputId` (`llSearch`) | `string` | — | yes | `id` of the query input, unique on the page. |
| `name` (`llSearch`) | `string` | `'q'` | no | The query's `name`. |
| `value` (`llSearch`) | `string` | `''` | no | Initial query text, for example the current search on the results page. |
| `invalid` (`llSearch`) | `boolean` | `false` | no | Sets `aria-invalid="true"` on the query. |
| `describedBy` (`llSearch`) | `string \| null` | `null` | no | `aria-describedby` on the query, for an error or hint the page renders. |
| `maxlength` (`llSearch`) | `number \| null` | `null` | no | The query's `maxlength`; the site search sets 200. |
| `listboxId` (`llSearch`) | `string \| null` | `null` | no | Makes the query a combobox: `role="combobox"`, `aria-autocomplete="list"`, `aria-controls` set to this id. Used by the [combobox](combobox.md). |
| `expanded` (`llSearch`) | `boolean` | `false` | no | `aria-expanded` when `listboxId` is set. |
| `activeDescendant` (`llSearch`) | `string \| null` | `null` | no | `aria-activedescendant` when `listboxId` is set. |

Native attributes on `input[llInput]` (`type`, `name`, `autocomplete`, `inputmode`, `required`,
`readonly`, `disabled`, `maxlength`, `aria-describedby`) are set by the consumer and never blocked.

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| `searched` (`form[llSearch]`) | `string` — the trimmed query | The form is submitted with Enter or the action; the native submit is prevented. |
| `queryChanged` (`llSearch`) | `string` — the raw query | The person types or clears the query. |
| `queryKeydown` (`llSearch`) | `KeyboardEvent` | A key is pressed in the query, so a combobox can handle arrows, Enter and Escape. |

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default (`llSearch`) | one `button` | Rendered after the query, inside the pill. |

`input[llInput]` has no content.

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Input | `.input` | Every single-line form control. |
| Search, standalone form | `.search` on `form[role=search]` | Top bar, hero, error pages, verification, admin lists. |
| Search, inside a form | `.search` on `div` | Search box inside a larger filter form. |

| Size | Modifier | Height | Padding | Type |
|---|---|---|---|---|
| lg (input default) | — | `--control-height-lg` | `--space-4` | `--text-body` |
| md | `.input--md` | `--control-height-md` | `--space-4` | `--text-body` |
| sm | `.input--sm` | `--control-height-sm` | `--space-4` | `--font-size-sm` |
| search | — | query `--control-height-md` inside `--space-1` padding | `--space-5` start | `--text-body` |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | `--color-border-strong` border, `--color-bg-surface` | Name from the label |
| Hover | `:hover` | Border `--color-fg-muted` | — |
| Focus | `:focus-visible` (input); `:focus-within` (search) | Shared focus ring around the input or the whole pill | — |
| Invalid | `aria-invalid="true"` | Border `--color-danger-solid`, fill `--color-danger-bg` | "invalid entry" plus the described error |
| Read-only | `readonly` | `--color-border-default` border, `--color-bg-subtle` fill | "read only" |
| Disabled | `disabled` | No border, `--color-bg-subtle` fill, `--color-fg-disabled` text | "dimmed", skipped by Tab |

## Markup

```html
<!-- rendered: search form in the top bar -->
<form class="search header__search--wide" role="search">
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>
  <label class="vh" for="site-search">Search Logos Lab</label>
  <input class="search__input" id="site-search" name="q" type="search" placeholder="Search Logos Lab" autocomplete="off">
</form>

<!-- rendered: hero search with action -->
<form class="search" role="search">
  <svg class="icon" …></svg>
  <label class="vh" for="hero-search">Search courses, videos, articles and experts</label>
  <input class="search__input" id="hero-search" name="q" type="search" placeholder="Try “personhood” or “Augustine”" autocomplete="off">
  <button class="btn btn--primary" type="submit">Search</button>
</form>

<!-- rendered: input, invalid -->
<input class="input" id="email" name="email" type="email" autocomplete="email" inputmode="email" required aria-invalid="true" aria-describedby="email-error">
```

```html
<!-- consumer -->
<form llSearch class="header__search--wide" label="Search Logos Lab" i18n-label placeholder="Search Logos Lab" i18n-placeholder inputId="site-search" (searched)="search($event)"></form>
<form llSearch label="…" inputId="hero-search" (searched)="search($event)"><button llButton variant="primary" type="submit" i18n>Search</button></form>
<input llInput id="email" name="email" type="email" autocomplete="email" [invalid]="emailError()" />
```

## Design

- Input: `--control-height-lg`, padding `--space-4`, `--border-width-hairline`, `--radius-md`,
  `--text-body`; placeholder `--color-fg-subtle`.
- Search: max width `--layout-narrow` (the top bar overrides it), padding `--space-1` and `--space-5`
  at the start, gap `--space-3`, `--radius-full`, hairline `--color-border-strong`.
- Border and background transitions `--duration-base`, `--ease-standard`.

Component tokens:

| Token | Aliases | Overridden by |
|---|---|---|
| `--ll-field-border` | `--color-border-strong` | hover `--color-fg-muted`, invalid `--color-danger-solid`, read-only `--color-border-default`, disabled `--color-transparent` |

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Fill | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |
| Border | `--color-border-strong` | `--palette-stone-500` | `--palette-night-500` |
| Text | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Placeholder, icon | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Invalid border | `--color-danger-solid` | `--palette-lingon-600` | `--palette-lingon-300` |
| Invalid fill | `--color-danger-bg` | danger background role | danger background role |
| Disabled | `--color-bg-subtle` / `--color-fg-disabled` | `--palette-oat-200` / `--palette-oat-400` | `--palette-night-800` / `--palette-night-500` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Entered text |
| `--color-fg-subtle` | `--color-bg-surface` | 4.5:1 | Placeholder |
| `--color-border-strong` | `--color-bg-canvas` | 3:1 | Field boundary |
| `--color-focus-ring` | `--color-bg-canvas` | 3:1 | Focus |

In forced colours the input keeps a `CanvasText` border.

## Responsive behaviour

- Inputs fill their container's width. The search pill shrinks with its container; the query input
  takes the remaining space (`min-width: 0`), so nothing overflows at 320 px.
- The lg input and the search pill are at least 44 px tall on touch viewports.

## Accessibility

### Role and pattern

Native `<input>`; the search pill is a `form` with `role="search"` (a search landmark) or a plain `div`
inside another form.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Focuses the input or query, then the action. |
| <kbd>Enter</kbd> in the query | Submits the search; `searched` fires with the trimmed query. |
| <kbd>Escape</kbd> in a `type=search` query | Clears it (native). |

### Focus

The input shows the shared ring; the search pill shows the ring around the whole pill while the query
has focus.

### Labelling

The search query is labelled by its hidden `label`; inputs are labelled by their form field. Paste is
never blocked; personal-data inputs carry the correct `autocomplete`.

### Announcements

None by the field; the form field announces errors.

### Motion

Border and fill transitions are removed under reduced motion.

## Content and internationalisation

- Labels and placeholders arrive translated. A placeholder gives an example ("Try “personhood” or
  “Augustine”"), never the label.

## Performance

- `OnPush`; signal inputs; no work in the template. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given the home page, when the hero search renders, then it is a search landmark whose query is labelled "Search courses, videos, articles and experts" and whose action is "Search". (L2-001)
- **AC-2** Given the top bar at 1440 px, when it renders, then its search query is labelled "Search Logos Lab" and has `type="search"`. (L2-127)

### States

- **AC-3** Given the hero search with the query "  personhood ", when the user presses Enter, then `searched` emits "personhood" and the browser does not reload the page. (L2-003)
- **AC-4** Given the hero search with an empty query, when the user submits it, then `searched` is not emitted. (L2-003)
- **AC-5** Given an email input with an error, when it renders, then it has `aria-invalid="true"`, the danger border and fill, and the `aria-describedby` the form field supplied. (L2-128)
- **AC-6** Given the sign-in email input, when it renders, then it keeps `autocomplete="email"` and accepts pasted text. (L2-128)

### Keyboard and focus

- **AC-7** Given the hero search, when its query receives keyboard focus, then the focus ring surrounds the whole pill with at least 3:1 contrast and 2 CSS px thickness. (L2-126)

- **AC-14** Given the site search as a combobox with suggestions open, when it is inspected, then the query has `role="combobox"`, `aria-autocomplete="list"`, `aria-controls` naming the listbox, `aria-expanded="true"` and `maxlength="200"`. (L2-003)

### Screen readers

- **AC-8** Given any search pill, when it is inspected, then its icon is hidden and its query's name is the hidden label, not the placeholder. (L2-127)

### Theming

- **AC-9** Given the dark theme, when the search pill and an input render, then fill, border, text and placeholder use dark token values. (L2-134)
- **AC-10** Given both themes, when contrast is measured, then entered text and placeholder meet 4.5:1 and the field border meets 3:1 against the canvas. (L2-129)

### Responsive

- **AC-11** Given a viewport of 320 px, when the hero search renders with its "Search" action, then the pill fits and the page does not scroll horizontally. (L2-130)
- **AC-12** Given a viewport of 375 px, when the hero search and an lg input are measured, then each is at least 44 CSS px tall. (L2-132)
- **AC-13** Given the pseudo-locale's longer placeholder at 375 px, when the hero search renders, then the action button is not clipped. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/text-field/`: `search.ts` (`Search`, selector
  `form[llSearch], div[llSearch]`), `input.ts` (`Input`, selector `input[llInput]`), each with `.html`
  and `.scss` from the `text-field` block. `Search` styles its host with `:host(.search)` rules and its
  projected action under `:host ::ng-deep`.
- `Input` has an empty template; its styles target `:host`. It is built with the first form slice
  (sign-in); the search pill is built with the app shell.

## Decisions

- **D-1** *Does the search component navigate?* No; it emits `searched` and the page or shell decides
  (the shell routes to `/search?q=…`). This keeps the component free of routes.
- **D-2** *Is an empty query submitted?* No; an empty or blank query emits nothing, so a stray Enter
  does not open an empty results page.
- **D-3** *`autocomplete` on the search query?* `off`, as in the mocks, so the browser's history list
  does not cover the suggestions dialog.
