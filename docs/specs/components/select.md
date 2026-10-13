# Select

| Field | Value |
|---|---|
| Selector | `ll-select` |
| Library path | `frontend/projects/components/src/lib/select/` |
| Status | planned |
| Traces to | L2-002, L2-022, L2-040, L2-041, L2-046, L2-051, L2-052, L2-060, L2-070, L2-077, L2-082, L2-099, L2-101, L2-120, L2-126, L2-127, L2-128, L2-129, L2-130, L2-132, L2-134, L2-150 |
| Design system | [`select.html`](../../design-system/components/select.html) |
| Source mocks | [`pages/explore/default`](../../mocks/pages/explore/default.html), [`pages/events/default`](../../mocks/pages/events/default.html), [`pages/events/loading`](../../mocks/pages/events/loading.html), [`pages/experts/default`](../../mocks/pages/experts/default.html), [`pages/comments/default`](../../mocks/pages/comments/default.html), [`pages/my-learning/default`](../../mocks/pages/my-learning/default.html), [`pages/admin-analytics/default`](../../mocks/pages/admin-analytics/default.html), [`pages/admin-audit/default`](../../mocks/pages/admin-audit/default.html), [`pages/studio-editor/default`](../../mocks/pages/studio-editor/default.html), [`pages/studio-editor/in-review`](../../mocks/pages/studio-editor/in-review.html), [`pages/studio-video-captions/invalid`](../../mocks/pages/studio-video-captions/invalid.html), [`pages/event-editor/default`](../../mocks/pages/event-editor/default.html), [`dialogs/moderation-action/invalid`](../../mocks/dialogs/moderation-action/invalid.html), [`dialogs/merge-topic/invalid`](../../mocks/dialogs/merge-topic/invalid.html), [`dialogs/player-settings/default`](../../mocks/dialogs/player-settings/default.html), [`pages/article-editor/scripture`](../../mocks/pages/article-editor/scripture.html) |
| Rendering | [`select.html`](select.html) |

## Purpose and scope

A select picks one answer from a short list the member already understands: a sort order ("Newest",
"Most popular"), a filter ("Any format", "Online", "In person", "Hybrid"), a period ("Last 30 days"), a
level, a language, a time zone. It is the native `select` element, so the platform's picker, keyboard
handling and screen-reader support are kept, dressed as the design system's `.select` block. It comes
in two shapes. The **inline** select is a pill with its visible label beside it, for toolbars and
filter rows. The **field** select fills its column at the height and radius of a text field and sits
inside a [form field](form-field.md), which owns its label, help and error.

Use radios or a segmented button group when there are four options or fewer, so all of them show; a
[combobox](combobox.md) when the list is long and searched (topics to add, experts); checkboxes when
several answers are allowed.

Out of scope:

- Which option is chosen, applying the sort or filter, the URL parameters and the results: the page
  binds `value` and reacts to `valueChange` (L2-002, L2-051).
- The label, help, error and the `aria-describedby` and `aria-invalid` wiring of a field select: the
  [form field](form-field.md) (form-field D-1).
- Announcing the result of a change ("9 upcoming events, soonest first"): the page's polite live
  region.
- Selecting several options (`multiple`) and a list size (`size`): no screen needs them.
- The option list's own look: it is the browser's picker.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/explore/*` toolbar | inline, label "Sort by" | "Newest", "Most popular" | default, disabled (empty, error, loading) | canvas toolbar |
| `pages/comments/*` | inline, label "Sort" | "Newest", "Oldest" | default | canvas |
| `pages/my-learning/*` | inline, label "Sort by" | "Recently opened" (or "Recently completed"), "Title A–Z" | default, disabled (error, loading) | canvas toolbar |
| `pages/events/*` filter row | three inline selects: "Format", "Topic", "Host" | "Any format", "Online", "In person", "Hybrid"; "Any topic" and seven topics; "Any host", "Logos Lab", "Dr. Abena Mensah", "Rev. Dr. Thomas Hale" | default, disabled (empty, error, loading) | canvas toolbar, inside a `form.cluster` named "Filter events" |
| `pages/experts/*` | inline, label "Topic", next to a name search | "Any topic" and seven topics, the longest "The image of God and personhood" | default | canvas toolbar |
| `pages/admin-users/*` | inline, labels "Role" and "State" | "Any role", "Learner", "Expert", "Editor", "Moderator", "Administrator"; "Any state", "Active", "Unverified", "Suspended", "Deactivated" | default | canvas toolbar |
| `pages/admin-audit/*` | inline, labels "Actor" and "Action" | "Anyone", "Isaac Moreau", "Naomi Ellis", "Owen Bradley"; "Any action" and seven action groups | default | canvas toolbar |
| `pages/moderation-queue/*`, `pages/appeals/*` | inline, labels "Reason", "Type", "Status", "Show" | "Any reason" … "Other"; "Any type" … "Published content"; "Any status" … "Overdue"; "Open appeals", "Decided appeals", "All appeals" | default | canvas toolbar |
| `pages/admin-analytics/*`, `pages/analytics-item/*`, `pages/studio-analytics/*` | inline, labels "Date range" and "Period" | "Last 7 days", "Last 30 days", "Last 90 days", "This year", "Custom range" or "All time" | default | canvas toolbar |
| `pages/studio/editor`, `dialogs/item-picker/*` | inline, label "Type" | "Any type" and the content types (up to seven) | default | canvas toolbar, dialog |
| `pages/moderation-audit/*` | field, labels "Moderator" and "Action" | "Any moderator", "Owen Bradley", "Isaac Moreau"; "Any action" … "Decided appeal" | default | surface filter form |
| `pages/studio-editor/*` | field, label "Level" | "Introductory", "Intermediate", "Advanced" | default, disabled (In review, Approved, Published, Archived) | surface (form card) |
| `pages/event-editor/*` | field, label "Time zone" | "Eastern Time (ET)" … "Newfoundland Time (NT)" | default, disabled (past, cancelled) | surface |
| `pages/studio-video-captions/*` | field, label "Language" with the placeholder option "Choose a language" | "Français (fr-CA)", "English (en)", "Español (es)" | default (placeholder), invalid "Choose the language this track is in." | surface |
| `dialogs/moderation-action/*`, `dialogs/merge-topic/*` | field with a placeholder option ("Choose a guideline", "Choose a topic") | six guidelines; eight topics | default (placeholder), invalid "Choose the guideline this breaks", "Choose the topic to merge Data and privacy into" | dialog |
| `dialogs/player-settings/*` | field, labels "Playback speed" and "Quality", help "Auto changes with your connection." | "0.5×" … "2×" with "Normal (1×)"; "Auto (720p now)", "1080p", "720p", "360p" | default, selected | dialog |
| `pages/article-editor/scripture` | field, label "Translation" | "NRSV", "ESV", "NIV", "KJV" | default | popover |
| design-system page "Move to notebook" | field with `optgroup`: "Shared with Northwind", "Only you" | notebooks | default, invalid | surface |

No mock uses the `sm` or `lg` size or `required`; the design system defines both sizes, and the API
below supports all of them so a later screen needs no change.

## Anatomy

1. **Label** — the visible text. Inline: `.select > span`, beside the pill in `--text-body-sm`. Field:
   the form field's `label.field__label`, above the control.
2. **Wrap** — `span.select__wrap`: positions the chevron over the control.
3. **Control** — `select.select__control`: the native select. A pill (`--radius-full`) inline; a
   rounded rectangle (`--radius-md`) in a field.
4. **Chevron** — `svg.select__chev.icon.icon--sm`: the decorative down chevron at the control's end; it
   never takes clicks.
5. **Options** — `option` and `optgroup` children of the control, supplied by the consumer.

Host: `ll-select` is `display: contents`. It renders the wrap, the native control and the chevron;
with a `label` it also renders the inline label around them, as `label.select`. The consumer's `option`
and `optgroup` elements are projected into the control.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string \| null` | `null` | no | Set: the inline select, `label.select` with the visible label beside the pill. `null`: the field select, whose name comes from the form field's label for `controlId`. A select with neither is invalid use. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | no | Inline only: control height `--control-height-sm`, `--control-height-md` or `--control-height-lg`. Adds `.select--sm` or `.select--lg` to the control; the field select ignores it and always takes `--control-height-lg`. |
| `value` | `string` (model) | `''` | no | The selected option's `value` (its text when the option has no `value`). Two-way: `[(value)]`. The select shows the option whose value equals it. When none matches, the first option shows and nothing is emitted. |
| `controlId` | `string \| null` | `null` | no | The control's `id`. Required for a field select: it is the id the form field was given, so the field can label and describe it. Optional inline, where the wrapping label names the control. |
| `name` | `string \| null` | `null` | no | The control's `name`. |
| `disabled` | `boolean` | `false` | no | Sets `disabled` on the control. A control inside a disabled `fieldset` is disabled natively and looks the same. |
| `required` | `boolean` | `false` | no | Sets `required` on the control. The label states "required" or "(optional)" in text; the select adds nothing visual. |
| `invalid` | `boolean` | `false` | no | Sets `aria-invalid="true"`. Only for a select outside a form field; inside one the field sets it from its `error` (select D-3). |
| `describedBy` | `string \| null` | `null` | no | Sets `aria-describedby`. Only outside a form field; inside one the field lists the help, error and counter ids. |

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| `valueChange` | `string` | The member commits a choice (the native `change` event). It is not emitted for `value` set by the page, for options replaced under a set `value`, or for the first-option fallback. |

The native `change` event also bubbles out of `ll-select`, so a `(change)` handler on the host works.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | `option` and `optgroup` elements, or `@for` and `@if` blocks that produce them | Projected into the control. Options give a `value` attribute; the placeholder option is `<option value="">`. Option text is plain text, short and parallel. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Inline | `label.select` around the wrap | Sorts, filters and periods in a toolbar, with the label beside the pill. |
| Field | `.select__wrap` inside `.field` | A labelled question in a form, dialog or popover; fills the column. |
| Placeholder | first option `value=""` | No safe default: the control starts on a prompt ("Choose when") read in the subtle text role until chosen. |
| Grouped | `optgroup[label]` | A longer list split into named sets ("Shared with Northwind", "Only you"). |

| Size | Modifier | Height | Padding | Type |
|---|---|---|---|---|
| sm | `.select--sm` on the control | `--control-height-sm` | `0 var(--space-10) 0 var(--space-4)` | `--text-label`, size `--font-size-sm` |
| md (default) | — | `--control-height-md` | `0 var(--space-10) 0 var(--space-4)` | `--text-label` |
| lg | `.select--lg` on the control | `--control-height-lg` | `0 var(--space-10) 0 var(--space-4)` | `--text-label` |
| Field | none (the field sets it) | `--control-height-lg` | `0 var(--space-10) 0 var(--space-4)` | `--text-body` |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | `--color-border-strong` hairline on `--color-bg-surface`, text `--color-fg-default` | combobox with a listbox popup, named by its label, value read |
| Hover | `:hover` on an enabled control | border `--color-fg-default`, fill `--color-bg-subtle` | — |
| Focus | `:focus-visible` | `--focus-ring-width` ring in `--color-focus-ring` at `--focus-ring-offset`, following the pill or field shape | focused, name and value read |
| Open (active) | the native list is open | border `--color-focus-ring` with a hairline ring in the same colour, fill `--color-bg-surface` | expanded |
| Invalid | `aria-invalid="true"` | border `--color-danger-solid`, fill `--color-danger-bg`; stays in hover and open (select D-1); the field shows the error text below | "invalid entry", the error read as the description |
| Placeholder | first option `value=""` is selected | text in `--color-fg-subtle` until a real option is chosen; the listed options stay `--color-fg-default` | the prompt read as the value |
| Disabled | `disabled` | fill `--color-bg-subtle`, text `--color-fg-disabled`, no hover, `cursor: not-allowed` | dimmed, skipped by Tab |

There is no read-only state: a locked select is `disabled`, as the studio editor's "Level" is while an
item is In review (select D-4).

## Markup

```html
<!-- rendered: inline -->
<label class="select"><span>Sort by</span><span class="select__wrap"><select class="select__control" name="sort"><option value="newest" selected>Newest</option><option value="popular">Most popular</option></select><svg class="select__chev icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span></label>

<!-- rendered: inline, small, disabled -->
<label class="select"><span>Format</span><span class="select__wrap"><select class="select__control select--sm" disabled><option>Any format</option></select><svg class="select__chev icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span></label>
```

```html
<!-- rendered: field with a placeholder option, help and an error -->
<div class="field">
  <label class="field__label" for="track-lang">Language</label>
  <span class="select__wrap"><select class="select__control" id="track-lang" name="lang" aria-invalid="true" aria-describedby="lang-error"><option value="" selected>Choose a language</option><option value="fr-CA">Français (fr-CA)</option><option value="en">English (en)</option><option value="es">Español (es)</option></select><svg class="select__chev icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span>
  <p class="field__error" id="lang-error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true">…</svg>Choose the language this track is in.</p>
</div>

<!-- rendered: grouped, with help -->
<div class="field">
  <label class="field__label" for="notebook">Move to notebook</label>
  <span class="select__wrap"><select class="select__control" id="notebook" name="notebook" aria-describedby="notebook-help"><optgroup label="Shared with Northwind"><option selected>Harbour Notes</option><option>Field Day plans</option></optgroup><optgroup label="Only you"><option>Drafts</option><option>Reading list</option></optgroup></select><svg class="select__chev icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span>
  <p class="field__help" id="notebook-help">The note takes on the notebook's sharing.</p>
</div>
```

```html
<!-- consumer: inline -->
<ll-select label="Sort by" name="sort" [(value)]="sort" [disabled]="loading()">
  <option value="newest">Newest</option>
  <option value="popular">Most popular</option>
</ll-select>

<!-- consumer: field, with a placeholder option and an error from the page -->
<ll-form-field label="Language" controlId="track-lang" [error]="languageError()">
  <ll-select controlId="track-lang" name="lang" [(value)]="language">
    <option value="">Choose a language</option>
    @for (track of languages; track track.code) {
      <option [value]="track.code">{{ track.name }}</option>
    }
  </ll-select>
</ll-form-field>
```

## Design

- Inline: label in `--text-body-sm` and `--color-fg-muted`, `--space-3` from the pill; the pill is
  `inline-flex` and does not wrap its label (`white-space: nowrap`), so a toolbar wraps whole selects
  onto the next line.
- Control: left padding `--space-4`, right padding `--space-10` to clear the chevron; hairline border
  `--border-width-hairline` in `--color-border-strong`; radius `--radius-full` inline and `--radius-md`
  in a field; text `--text-label` inline and `--text-body` in a field; `appearance: none`.
- Chevron: absolutely placed `--space-3` from the end, centred vertically, `--color-fg-subtle`,
  `pointer-events: none`, so a press anywhere on the control opens the list.
- A select never exceeds its container: the pill shrinks (`max-width: 100%`, `min-width: 0` on the wrap
  and control) and the selected text ends in an ellipsis rather than overflowing (select D-2).
- Motion: only the border colour transitions, `--duration-base` with `--ease-standard`, and not under
  reduced motion.

Component tokens: none. The select reads the semantic tokens below directly.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Fill | `--color-bg-surface` | surface | surface |
| Border | `--color-border-strong` | strong border | strong border |
| Text | `--color-fg-default` | default foreground | default foreground |
| Label | `--color-fg-muted` | muted foreground | muted foreground |
| Placeholder and chevron | `--color-fg-subtle` | subtle foreground | subtle foreground |
| Hover border | `--color-fg-default` | default foreground | default foreground |
| Hover and disabled fill | `--color-bg-subtle` | subtle background | subtle background |
| Open border and ring | `--color-focus-ring` | focus ring | focus ring |
| Invalid border | `--color-danger-solid` | danger solid | danger solid |
| Invalid fill | `--color-danger-bg` | danger background | danger background |
| Disabled text | `--color-fg-disabled` | disabled foreground | disabled foreground |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Selected text |
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Inline label |
| `--color-fg-subtle` | `--color-bg-surface` | 4.5:1 | Placeholder |
| `--color-fg-subtle` | `--color-danger-bg` | 4.5:1 | Placeholder in an invalid select |
| `--color-fg-default` | `--color-bg-subtle` | 4.5:1 | Selected text on hover |
| `--color-border-strong` | `--color-bg-surface` | 3:1 | Control boundary |
| `--color-danger-solid` | `--color-bg-surface` | 3:1 | Invalid boundary |
| `--color-focus-ring` | `--color-bg-surface` | 3:1 | Focus ring |

## Responsive behaviour

- Inline selects keep their label beside the pill and wrap to the next line of the toolbar as whole
  units. A select is never wider than its row: at 320 px "Topic" with "The image of God and personhood"
  shrinks and ends the text in an ellipsis (select D-2).
- Field selects fill their column at every width.
- On phones the platform's picker (a wheel or a sheet) replaces the dropdown, so option text makes sense
  without the label.
- Heights are 44 px inline and 52 px in a field, so the target is at least 44 × 44 CSS px on touch
  devices; `sm` (36 px) is for dense toolbars on larger screens and still meets the 24 px minimum.
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom everything stays available.

## Accessibility

### Role and pattern

The native `select` (a combobox with a listbox popup). It is never rebuilt from `div`s.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Moves to and from the select; a disabled select is skipped. |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Changes the selected option (Windows) or opens the list (macOS). |
| <kbd>Alt</kbd>+<kbd>↓</kbd>, <kbd>Space</kbd>, <kbd>Enter</kbd> | Opens the list. |
| A letter | Jumps to the next option starting with it. |
| <kbd>Escape</kbd> | Closes the list without changing the value. |

### Focus

The ring is `--focus-ring-width` in `--color-focus-ring` at `--focus-ring-offset`, at least 3:1 against
the surface, following the pill or the field shape. Changing the value never moves focus and never
submits the form; the page applies the sort or filter and leaves focus on the select.

### Labelling

A visible label always names the select: the wrapping `label.select` inline, or the form field's
`label for` (the control's `id` is `controlId`) in a field. A first option never stands in for the
label ("-- Show --"). The chevron is `aria-hidden`. Help and errors are listed in `aria-describedby` by
the form field; outside a field the page passes `describedBy`.

### Announcements

The select announces itself and its value natively. The result of a change (a new count, a reordered
list) is announced by the page through a polite live region, without moving focus (L2-127). An invalid
select is read with its error as the description.

### Motion

Only the border colour transitions; under `prefers-reduced-motion: reduce` nothing does.

## Content and internationalisation

- Labels are nouns: "Sort by", "Format", "Remind me". Options are short, parallel and in a meaningful
  order: time, frequency of use, or alphabetical for names. The "no filter" choice is a real first
  option ("Any format", "Anyone"), and a "none" answer is an option ("No reminder"), never an empty
  select.
- A placeholder option is a prompt, not an answer: "Choose a language". Never "Select…" or
  "-- Please select --".
- Option text is plain text. Numbers and dates inside an option label are formatted by the page for the
  locale ("Normal (1×)", "Last 30 days").
- A label or option 30 % longer ends in an ellipsis in the control and the toolbar wraps; nothing is
  clipped without the full text being readable in the picker.
- Translatable: the `label` input and the option text. Data values: the `value` strings, which stay
  the same in every locale.

## Performance

- Change detection: `OnPush`; inputs are signals and `value` is a `model`. Changing one select
  re-renders only that select, never its siblings in the toolbar.
- No perf-test project exists in this repository (see D-5); the select is measured through the page
  budgets of `L2-120` and `L2-123`. The measured scenario is the events page for Miriam Clarke: the
  three filters "Format", "Topic" and "Host".
- Layout stability: the control's height is fixed by its size token and its width by its widest option,
  so choosing a shorter option does not move the next control in the row (the wrap keeps the intrinsic
  width of the list).
- Weight: no dependencies beyond `@angular/core` and the icon component.

## Acceptance criteria

### Rendering

- **AC-1** Given Miriam Clarke opens the catalogue at `/explore`, when the toolbar renders, then "Sort by" is an inline select with its label beside the pill, showing "Newest", and listing "Newest" then "Most popular". (L2-002)
- **AC-2** Given the URL `/explore?sort=hot`, which names no sort, when the page loads, then the select shows "Newest", the first option, and `valueChange` does not fire; and given `?sort=popular`, then it shows "Most popular". (L2-002)
- **AC-3** Given `/events?format=hybrid&topic=ai-ethics&host=logos-lab`, when the filter row renders, then "Format", "Topic" and "Host" are three inline selects showing "Hybrid", "AI ethics" and "Logos Lab", each with its label beside it. (L2-051)
- **AC-4** Given the experts directory, when "Topic" renders, then "Any topic" is first, "The image of God and personhood" is an option, and choosing it makes `valueChange` emit its value once. (L2-022)
- **AC-5** Given Miriam's saved sort choice "Oldest", when the comments of "Sabbath for the Always-On Mind" load, then the "Sort" select shows "Oldest" and the comments are listed as the page orders them. (L2-060)
- **AC-6** Given Miriam opens My learning, when the toolbar renders, then "Sort by" shows "Recently opened" and offers "Title A–Z". (L2-070)
- **AC-7** Given Isaac Moreau opens platform analytics, when the toolbar renders, then "Date range" shows "Last 30 days" and lists "Last 7 days", "Last 30 days", "Last 90 days", "This year" and "Custom range". (L2-101)
- **AC-8** Given Isaac opens the administrative audit log, when the filters render, then "Actor" shows "Anyone" and lists "Isaac Moreau", "Naomi Ellis" and "Owen Bradley", and "Action" shows "Any action". (L2-099)
- **AC-9** Given Dr. Abena Mensah edits a draft in the studio, when the metadata form renders, then "Level" is a field select labelled by its form field, fills the column at the field height, shows "Introductory", and lists "Introductory", "Intermediate" and "Advanced". (L2-082)
- **AC-10** Given a video's caption track form, when it renders, then "Language" starts on the placeholder "Choose a language" in the subtle text role, and after choosing "Français (fr-CA)" the text is in the default text role and `valueChange` emits "fr-CA". (L2-041)
- **AC-11** Given a new event in the event editor, when the schedule renders, then "Time zone" is a field select showing "Eastern Time (ET)" and listing six zones to "Newfoundland Time (NT)". (L2-052)
- **AC-12** Given the player settings dialog, when it opens, then "Playback speed" shows "Normal (1×)", and "Quality" shows "Auto (720p now)" and is described by "Auto changes with your connection." (L2-040)
- **AC-13** Given the scripture popover in the article editor, when it opens, then "Translation" is a field select listing "NRSV", "ESV", "NIV" and "KJV", and choosing "ESV" emits "ESV". (L2-046)

### States

- **AC-14** Given the events page while it loads, when the three filters render, then each is disabled with the `--color-bg-subtle` fill and `--color-fg-disabled` text, shows no hover change, and is skipped by Tab. (L2-051)
- **AC-15** Given an item In review, when the studio editor renders, then "Level" is disabled, keeps its value "Introductory", and the owner cannot change it. (L2-077)
- **AC-16** Given a moderator submits "Suspend member" without a guideline, when the error shows, then the "Guideline" select, still on "Choose a guideline", has `aria-invalid="true"`, the `--color-danger-solid` border and the `--color-danger-bg` fill, keeps them while hovered and open, and is described by "Choose the guideline this breaks". (L2-128)
- **AC-17** Given the audit log's "Actor" options arrive after the page renders and the page set `value` to "Naomi Ellis" first, when the options appear, then the select shows "Naomi Ellis" and `valueChange` does not fire. (L2-099)

### Keyboard and focus

- **AC-18** Given a keyboard user on the events page, when Tab reaches "Format", then a ring of at least 2 CSS px and 3:1 contrast follows the pill shape and is not clipped by the toolbar. (L2-126)
- **AC-19** Given focus on "Sort by", when the user presses Alt+Down, then the list opens, Down then Enter chooses "Most popular", and Escape in an open list closes it without changing the value; the page receives the new value only on the choice. (L2-126)
- **AC-20** Given Miriam chooses "Most popular", when the page applies the sort, then focus stays on the select, the form is not submitted by the choice, and `valueChange` fires once. (L2-126)

### Screen readers

- **AC-21** Given the inline "Sort by" select, when it is inspected, then its role is combobox, its accessible name is "Sort by", its value is "Newest", and the chevron is not in the accessibility tree. (L2-127)
- **AC-22** Given the "Level" field with help and an error, when it is inspected, then the control is named by the field's label, `aria-describedby` lists the help and error ids, `aria-invalid="true"` is set by the form field, and the select neither removes nor overwrites them. (L2-128)
- **AC-23** Given the user chooses "Online" in "Format", when the page updates its count line, then it is announced politely and focus stays on the select. (L2-127)

### Theming

- **AC-24** Given the dark theme, when any select renders in each state, then fill, border, text, placeholder, chevron and ring use dark token values, and no light-only colour remains. (L2-134)
- **AC-25** Given both themes, when contrast is measured on the pairs in the Colour section, then text is at least 4.5:1 and the boundary, invalid boundary and focus ring at least 3:1. (L2-129)

### Responsive

- **AC-26** Given a 320 px viewport, when the experts directory shows "Topic" on "The image of God and personhood", then the select shrinks to its row, the text ends in an ellipsis, and the page does not scroll horizontally. (L2-130)
- **AC-27** Given a 375 px viewport, when the inline and field selects are measured, then the inline select is at least 44 CSS px tall and the field select 52 CSS px, and the whole control opens the list. (L2-132)
- **AC-28** Given the pseudo-locale with text 30 % longer at 320 px, when the events filters render, then the three selects wrap as whole units, labels stay beside their pill, and no text overlaps or is clipped without its full text being readable in the picker. (L2-150)

### Motion

- **AC-29** Given reduced motion, when the user hovers, focuses or opens a select, then the border colour changes instantly with no transition. (L2-129)

### Performance

- **AC-30** Given the events page with three filters, when Miriam changes "Topic", then only that select re-renders, and the page's cumulative layout shift stays at or below 0.1. (L2-120)

## Implementation notes

- Planned. Folder `frontend/projects/components/src/lib/select/`, one type per file, the component with
  its own `.html` and `.scss`: `select.ts` (`Select`, selector `ll-select`), `select.html`,
  `select.scss`, `select-size.ts` (`SelectSize = 'sm' | 'md' | 'lg'`). Exported from the library's
  `public-api.ts`. No `ngModel`; pages bind `[(value)]`.
- Template: one `<ng-template>` holds the wrap (`span.select__wrap`), the native `select.select__control`
  with `<ng-content />`, and `svg llIcon name="chevron-down" size="sm"` with the class `select__chev`;
  `@if (label())` renders it inside `label.select` after `span`, otherwise on its own. Host
  `display: contents`.
- The native control's `id`, `name`, `disabled`, `required`, `aria-invalid` and `aria-describedby` are
  attribute bindings that are `null` unless set, so the form field's `aria-describedby` and
  `aria-invalid` (set on the DOM node by id after render) are never overwritten.
- `value`: an `afterRenderEffect` writes `control.value = value()` and falls back to
  `selectedIndex = 0` when no option matches; a `MutationObserver` on the control (child list, subtree,
  the `value` attribute) re-applies it when options are replaced. The `change` listener sets the model.
  The server HTML shows each option's own `selected`; pages that pre-select from the URL set `[selected]`
  on the matching option so the first paint is right.
- Styles: `select.scss` from the `select` block of `components.css`, with the field rules (`.field
  .select__wrap`, `.field .select__control`) written as `:host-context(.field)`, and the two decisions
  D-1 and D-2 applied. The inline label's `span` is styled from the component.
- BEM parity: the classes `select`, `select__wrap`, `select__control`, `select__chev`, `select--sm` and
  `select--lg` stay as in the mocks, since e2e locators use them.

## Decisions

- **D-1** *Does a hover or an open list override the invalid look?* No: the invalid border and fill win.
  The design-system CSS orders `.select__control:hover:not(:disabled)` ahead of the invalid rule by
  specificity, so an invalid select would lose its danger border on hover. The CRD requires the invalid
  look to stay in every pointer state, so the error stays visible while the member reaches for the list.
  The design-system stylesheet should raise the invalid rule above hover and open.
- **D-2** *Can an inline select overflow its row?* No. The design-system CSS gives the pill no maximum
  width, and the longest topic ("The image of God and personhood") pushes the experts row past 320 px.
  The component sets `max-width: 100%` on `.select`, `min-width: 0` on `.select__wrap` and the control, and
  `text-overflow: ellipsis` on the control; the picker still shows the full text (L2-150).
- **D-3** *Why one `ll-select` component rather than an attribute on the native select?* An attribute
  component cannot create the wrap and the chevron around its own host, and the inline label must wrap
  both. `ll-select` renders the native control itself, so the control stays a real `select`, and the form
  field finds it by `controlId` as for the search pill's input. `invalid` and `describedBy` exist for the
  selects outside a form field, as for the other controls; inside a field the field is the single source
  (textarea D-3).
- **D-4** *Is there a read-only select?* No. A native select has no `readonly`, and the mocks lock a
  select with `disabled` (Level while In review). A disabled select keeps its value and is skipped by
  Tab; a page that must show a locked value in a way that can be focused and read uses plain text.
- **D-5** *Where is the render-performance budget measured?* This repository has no perf-test project, as
  [button](button.md) D-3 and [chip](chip.md) D-3; the budgets of `L2-120` and `L2-123` on whole pages
  cover the select. The scenario is the events page for Miriam Clarke.
- **D-6** *Which chevron glyph?* The icon library's `chevron-down` (`m6 9 6 6 6-6`), the glyph in 163 of
  the mock selects. The design-system page's specimens draw a slightly different path (`m7 10 5 5 5-5`);
  the page should adopt the library's.
- **D-7** *Is there a hidden-label option?* No. Every mock shows the label, and the design-system page
  says to keep it visible; an inline select without a visible label is not a supported shape. If a screen
  needs one, a `labelHidden` input is added to the CRD first.
- **D-8** *How is `value` used when no option matches it?* The first option shows and nothing is
  emitted, so a URL with an unknown filter value ignores it (L2-002 criterion 4) without an error. The
  page decides whether to rewrite the URL.
- **D-9** *What happens when options change under a set `value`?* The control re-applies `value` to the
  new options and does not emit, so the audit log's "Actor" list can load after the page renders without
  resetting the member's choice.
- **D-10** *Are `optgroup`, `multiple` and `size` supported?* `optgroup` yes, natively, as the
  design-system page's "Move to notebook" shows, though no mock groups options yet. `multiple` and `size`
  are not supported: the design system says a select picks one answer, and several answers use checkboxes.
- **D-11** *The mocks use `.select--sm` and `.select--lg` nowhere. Are they kept?* Yes. The design
  system defines the sizes and the cost of leaving them out is an API change later.
