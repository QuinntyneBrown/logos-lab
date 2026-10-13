# Button group

| Field | Value |
|---|---|
| Selector | `div[llButtonGroup]` |
| Library path | `frontend/projects/components/src/lib/button-group/` |
| Status | planned |
| Traces to | L2-023, L2-046, L2-052, L2-077, L2-078, L2-101, L2-120, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-147, L2-150 |
| Design system | [`button-group.html`](../../design-system/components/button-group.html) |
| Source mocks | [`pages/event-page/default`](../../mocks/pages/event-page/default.html), [`pages/event-page/visitor`](../../mocks/pages/event-page/visitor.html), [`pages/admin-analytics/default`](../../mocks/pages/admin-analytics/default.html), [`pages/admin-analytics/table`](../../mocks/pages/admin-analytics/table.html), [`pages/preview/default`](../../mocks/pages/preview/default.html), [`pages/preview/phone`](../../mocks/pages/preview/phone.html), [`notifications/preview-banner/with-action`](../../mocks/notifications/preview-banner/with-action.html), [`pages/article-editor/default`](../../mocks/pages/article-editor/default.html), [`pages/studio-editor/default`](../../mocks/pages/studio-editor/default.html), [`pages/studio-editor/in-review`](../../mocks/pages/studio-editor/in-review.html), [`pages/policy-editor/default`](../../mocks/pages/policy-editor/default.html), [`pages/studio-profile/default`](../../mocks/pages/studio-profile/default.html) |
| Rendering | [`button-group.html`](button-group.html) |

## Purpose and scope

A button group keeps a few related [buttons](button.md) together and tells assistive technology that
they belong together. It comes in three kinds, chosen by `variant`. An **actions** group holds two to
four quiet, equal-weight actions on one object, with at most one primary action last. A **segmented**
group is a view switcher: two to four buttons on a shared track, exactly one of them pressed, as in
"Show times in" on the event page ("Your time (ET)", "Event time (ET)"), "View" on platform analytics
("Charts", "Table") and "Preview width" in the preview banner ("XS", "MD", "XL"). A **toolbar** is a
set of independent toggles and actions for one editing surface, the "Formatting" toolbar of the
article, studio and profile editors, where any number of toggles can be pressed.

Use [tabs](tabs.md) to move between whole views that have their own panel or page, a
[select](select.md) when there are more than four options or the labels are long, a
[chip](chip.md) toggle for a filter that sits among many, a [menu](menu.md) for more than four
actions, and the form's own actions row for the buttons that submit a form ([form layout](form-layout.md)).

Out of scope:

- Which segment is pressed, which toggles are on, and what changing them does (switching the zone of
  the times, the chart or the table, the width of the preview frame, applying bold to the selection).
  The page or the editor owns the state and binds `pressed` on each button; the group never flips it.
- Telling the reader what changed after a press ("Showing times in Pacific time"). The page announces
  it through its own polite live region (`L2-127`).
- The editor surface the toolbar belongs to: its border, its `--color-bg-surface-sunken` bar, its
  width, and returning focus to the text after a toolbar action. The editor owns them.
- The buttons themselves: their variants, sizes, busy and paused states ([button](button.md)).
- The preview banner's "Dark theme" toggle and "Back to editor" action. They are single buttons beside
  the group, not members of it.
- Menus and overflow. A toolbar wraps onto further rows; it never collapses into a menu.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/event-page/*`: `default`, `cancelled`, `changed`, `closed`, `full`, `in-person`, `join-open`, `live`, `past`, `registered`, `waitlisted` | segmented, label "Show times in", two `button[llButton]` at `sm` | "Your time (ET)", "Event time (ET)" | first segment pressed; second pressed after a press | canvas, in the event head |
| `pages/event-page/visitor` | segmented, label "Show times in", `sm` | "Your time (PT)", "Event time (ET)" | first segment pressed | canvas, in the event head |
| `pages/admin-analytics/*`: `default`, `comparison`, `empty`, `error`, `export-queued`, `loading` | segmented, label "View", `sm`, at the end of a row it shares with the "Compare with the previous 30 days" switch | "Charts", "Table" | "Charts" pressed | canvas |
| `pages/admin-analytics/table` | segmented, label "View", `sm` | "Charts", "Table" | "Table" pressed | canvas |
| `pages/preview/default`, `loading`, `dark`; `notifications/preview-banner/persistent`, `with-action` | segmented, label "Preview width", `sm`; the mocks draw links, the product draws buttons (D-1) | "XS", "MD", "XL", named "XS, phone, 375 pixels", "MD, tablet, 768 pixels", "XL, desktop, 1280 pixels" (D-9) | "XL" pressed | info band of the preview banner |
| `pages/preview/phone` | the same group | the same three | "XS" pressed | info band of the preview banner |
| `pages/article-editor/*`: `default`, `empty`, `invalid`, `long`, `scripture` | toolbar, label "Formatting", `button[llButton]` ghost `sm`, two separators; the editor's own `editor__toolbar` class (D-12) | "Bold", "Italic", "Heading 2", "Heading 3", "List", "Quote", "Pull quote", "Link", "Scripture reference", "Footnote", "Language", "Image", "Video" | none pressed; wraps at XS | editor bar on `--color-bg-surface-sunken` |
| `pages/studio-editor/*`: `default`, `changes-requested`, `co-editing`, `empty`, `invalid`, `not-saved`, `offline`, `revision`, `saving` | toolbar, label "Formatting", ghost `sm`, two separators | "Bold", "Italic", "Heading 2", "Quote", "Link", "Scripture reference", "Image" | "Heading 2" pressed | editor bar |
| `pages/studio-editor/*`: `in-review`, `approved`, `scheduled`, `published`, `archived` | the same toolbar, every button `disabled` | the same seven | disabled | editor bar |
| `pages/policy-editor/*` | toolbar, label "Formatting", ghost `sm`, one separator | "Bold", "Heading 2", "List", "Link" | "Heading 2" pressed | editor bar |
| `pages/studio-profile/*` | toolbar, label "Formatting", ghost `sm`, one separator | "Bold", "Italic", "Link" | none pressed | editor bar |
| The design-system page | actions "Project actions": quiet; "Note actions": ghost, quiet, primary last | "Share", "Duplicate", "Export"; "Discard", "Save draft", "Publish note" | default | surface |
| The design-system page | segmented "View" and "Calendar range" | "List", "Board", "Calendar"; "Week", "Month" | default, hover, focus, active, pressed, disabled | surface |
| The design-system page | toolbar "Text formatting", icon-only toggles (D-5) | "Bold", "Italic", "Bulleted list", "Link" | default, hover, focus, active, pressed, disabled | surface |

Every row is buildable with the API below. The plain actions group appears only on the design-system
page; it costs nothing beyond the base class, so it is specified here (D-14).

## Anatomy

1. **Group** — `.btn-group` on the host `div`, with `.btn-group--segmented` or `.btn-group--toolbar`
   for those kinds. A flex row that wraps, with a `--space-2` gap (toolbar `--space-1`), as wide as its
   content and never wider than its container. It carries `role` and `aria-label`.
2. **Track (segmented only)** — the group's own `--color-bg-subtle` pill: `--space-1` padding,
   `--radius-full`, no gap between segments, no wrapping of the segments.
3. **Buttons** — `.btn` (`button[llButton]`), or in a toolbar also `.icon-btn` (`button[llIconButton]`).
   Segments are plain `.btn`; toolbar buttons are `.btn--ghost`; an actions group takes quiet, ghost and
   at most one primary `.btn`.
4. **Pressed segment or toggle** — a button with `aria-pressed="true"`: in a segmented group a raised
   segment on `--color-bg-surface` with `--shadow-1`; in a toolbar an `--color-accent-subtle` wash with
   an accent label.
5. **Separator (toolbar only, optional)** — the consumer's `span.editor__sep` with `aria-hidden="true"`,
   a hairline between sets of buttons. The group neither styles nor focuses it.

Host: `div[llButtonGroup]` **is** the native `div`. The component adds the classes, the `role` and the
`aria-label` with host bindings, keeps the consumer's own `class`, and renders only `<ng-content />`.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string` | — | yes | Becomes the `aria-label` of the group. It names the task ("Show times in", "View", "Formatting") and is distinct on a page. Arrives translated (`L2-147`). |
| `variant` | `'actions' \| 'segmented' \| 'toolbar'` | `'actions'` | no | Always adds `.btn-group`. `'segmented'` adds `.btn-group--segmented` and sets `role="group"`; `'toolbar'` adds `.btn-group--toolbar`, sets `role="toolbar"` and turns on the roving focus; `'actions'` adds no modifier and sets `role="group"` (D-8). |

- Inputs are signal inputs.
- There is no `size` input: the buttons carry the size (`size="sm"` on every `llButton`, or leave the
  default `md`). A group whose `llButton` children do not share one size raises a development-mode
  error. A toolbar's icon buttons stay at their own `md` target.
- There is no `disabled` input: the consumer disables each button it wants disabled (D-7).
- Content rules checked in development mode and never at run time: a segmented group holds two to
  four `button[llButton]` and nothing else, each with a boolean `pressed`; a toolbar holds
  `button[llButton]`, `button[llIconButton]` and separators; an actions group holds `button[llButton]`
  with at most one `variant="primary"`, last.

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| None | | The state belongs to the page. Each button is a native element, so the consumer listens to its `click` and sets `pressed` (the same rule as [button](button.md)). |

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | `button[llButton]`; in a toolbar also `button[llIconButton]` and `span` separators with `aria-hidden="true"` | The buttons in order. A button is a toggle when its `pressed` is a boolean and a plain action when it is `null`; a toolbar may mix both. An icon button needs `aria-label`. |

Buttons in a segmented group take no variant: the group draws them. Buttons in a toolbar take
`variant="ghost"`.

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Actions | — (`.btn-group` only) | Two to four equal-weight actions on one object: "Share", "Duplicate", "Export". Order from least to most important with the primary last: "Discard", "Save draft", "Publish note". |
| Segmented | `.btn-group--segmented` | Switching two to four views of the same content in place, exactly one on: "Your time (ET)" or "Event time (ET)"; "Charts" or "Table"; "XS", "MD" or "XL". Never for actions. |
| Toolbar | `.btn-group--toolbar` | Independent toggles and actions that act on one surface, text or icon-only: "Bold", "Italic", "Heading 2", "Link". |

| Size | Modifier | Height | Padding | Type |
|---|---|---|---|---|
| Group | — | the tallest button plus `--space-1` above and below in a segmented group | `--space-1` (segmented track only) | the buttons' |
| Buttons `md` | — | `--control-height-md` | `--space-5` | `--text-label` |
| Buttons `sm` | `.btn--sm` on every `.btn` | `--control-height-sm` | `--space-4` | `--text-label` |
| Icon button | `.icon-btn` | `--target-comfortable` square | — | — |

The group follows its buttons. Every mock uses `sm`.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default, segment | — | Transparent over the `--color-bg-subtle` track, `--color-fg-default` label | "Charts, toggle button, not pressed" |
| Default, toolbar button | — | `--color-transparent` fill (ghost), `--color-fg-default` label | Toggle: "Bold, toggle button, not pressed". Action: "Link, button" |
| Hover, unpressed segment | `:hover` | `--color-bg-subtle-hover` fill | — |
| Hover, toolbar button | `:hover` | The ghost button's `--color-bg-subtle` wash | — |
| Focus | `:focus-visible` | `--focus-ring-width` ring in `--color-focus-ring` at `--focus-ring-offset`, drawn on every button, the pressed one included, and distinct from the pressed fill | Name, role and state announced |
| Active | `:active` | The button's own press down | — |
| Pressed, segment | `aria-pressed="true"` | `--color-bg-surface` fill, `--shadow-1`, a `--border-width-hairline` `--color-border-strong` edge (D-3), no accent outline; hover changes nothing | "pressed" |
| Pressed, toolbar toggle | `aria-pressed="true"` | `--color-accent-subtle` fill, `--color-fg-accent` label, a `--border-width-hairline` `--color-accent` edge (D-4); hover `--color-accent-subtle-hover`; several at once | "pressed" |
| Disabled | `disabled` on the button | The button's disabled colours; a segmented group keeps its track. When every button is disabled the group has no tab stop | Skipped by Tab and the arrow keys; "dimmed" |
| Long label | A label wider than its share | A segment's label wraps inside the segment (D-2); in an actions group or a toolbar the buttons wrap onto the next row | Name unchanged |
| Forced colours | `forced-colors: active` | A pressed segment or toggle draws a `--border-width-thick` `Highlight` outline | — |

Hover, focus and active are the buttons'; the group only changes what a pressed button looks like. A
busy or paused button (`busy`, `paused`) keeps its own treatment and is not used in a group.

## Markup

```html
<!-- rendered: actions, with a primary last -->
<div class="btn-group" role="group" aria-label="Note actions">
  <button class="btn btn--ghost" type="button">Discard</button>
  <button class="btn btn--quiet" type="button">Save draft</button>
  <button class="btn btn--primary" type="button">Publish note</button>
</div>
```

```html
<!-- rendered: segmented, the event page time zone toggle -->
<div class="btn-group btn-group--segmented" role="group" aria-label="Show times in">
  <button class="btn btn--sm" type="button" aria-pressed="true">Your time (ET)</button>
  <button class="btn btn--sm" type="button" aria-pressed="false">Event time (ET)</button>
</div>
```

```html
<!-- rendered: segmented, the preview width in the preview banner (buttons, not links; the names begin with the visible text) -->
<div class="btn-group btn-group--segmented" role="group" aria-label="Preview width">
  <button class="btn btn--sm" type="button" aria-pressed="false" aria-label="XS, phone, 375 pixels">XS</button>
  <button class="btn btn--sm" type="button" aria-pressed="false" aria-label="MD, tablet, 768 pixels">MD</button>
  <button class="btn btn--sm" type="button" aria-pressed="true" aria-label="XL, desktop, 1280 pixels">XL</button>
</div>
```

```html
<!-- rendered: toolbar, the article editor (shortened); toggles carry aria-pressed, actions do not -->
<div class="btn-group btn-group--toolbar editor__toolbar" role="toolbar" aria-label="Formatting">
  <button class="btn btn--ghost btn--sm" type="button" aria-pressed="false" tabindex="0">Bold</button>
  <button class="btn btn--ghost btn--sm" type="button" aria-pressed="true" tabindex="-1">Heading 2</button>
  <span class="editor__sep" aria-hidden="true"></span>
  <button class="btn btn--ghost btn--sm" type="button" tabindex="-1">Link</button>
  <button class="btn btn--ghost btn--sm" type="button" tabindex="-1">Scripture reference</button>
</div>
```

```html
<!-- rendered: toolbar, icon-only toggles (D-5) -->
<div class="btn-group btn-group--toolbar" role="toolbar" aria-label="Text formatting">
  <button class="icon-btn" type="button" aria-pressed="false" aria-label="Bold" tabindex="0"><svg class="icon" aria-hidden="true">…</svg></button>
  <button class="icon-btn" type="button" aria-pressed="true" aria-label="Italic" tabindex="-1"><svg class="icon" aria-hidden="true">…</svg></button>
</div>
```

A disabled toolbar is the same markup with `disabled` on every button and no `tabindex`. A segmented
group at `md` drops `btn--sm`. The `.btn-group--toolbar` and `.editor__toolbar` classes are the host's;
the buttons' classes are added by `llButton` and `llIconButton`, and `tabindex` by the toolbar.

```html
<!-- consumer: segmented -->
<div llButtonGroup variant="segmented" label="Show times in" i18n-label>
  <button llButton size="sm" type="button" [pressed]="zone() === 'viewer'" (click)="zone.set('viewer')">{{ viewerLabel() }}</button>
  <button llButton size="sm" type="button" [pressed]="zone() === 'event'" (click)="zone.set('event')">{{ eventLabel() }}</button>
</div>

<!-- consumer: toolbar -->
<div llButtonGroup variant="toolbar" class="editor__toolbar" label="Formatting" i18n-label>
  <button llButton variant="ghost" size="sm" type="button" [pressed]="marks().bold" [disabled]="locked()" (click)="toggle('bold')" i18n>Bold</button>
  <span class="editor__sep" aria-hidden="true"></span>
  <button llButton variant="ghost" size="sm" type="button" [disabled]="locked()" (click)="openLinkDialog()" i18n>Link</button>
</div>
```

## Design

- Group: `display: flex`, `flex-wrap: wrap`, gap `--space-2`; `inline-size: max-content` and
  `max-inline-size: 100%`, so it is as wide as its buttons and never wider than its container.
- Segmented: `flex-wrap: nowrap`, gap `0`, padding `--space-1`, `--radius-full`, background
  `--color-bg-subtle`. Each segment may shrink (`min-width: 0`) and wraps its label with the text centred
  (D-2); the segments share the width the label needs, not equal widths.
- Pressed segment: `--color-bg-surface` fill, `--shadow-1`, `--border-width-hairline` edge in
  `--color-border-strong`; the button's accent outline is removed. Every button keeps a transparent
  `--border-width-hairline` edge, so pressing changes no size.
- Toolbar: gap `--space-1`. Pressed toggle: `--color-accent-subtle` fill, `--color-fg-accent` label, edge
  `--color-accent`, no outline. The icon button gets the same treatment as a `.btn` (D-5).
- Separator: the editor's `.editor__sep`: a `--border-width-hairline` rule `--space-6` tall in
  `--color-border-default`, with `--space-1` of inline margin.
- Motion: none of its own. A button's background, border and colour transitions use `--duration-base` and
  `--duration-fast` with `--ease-standard`; the pressed surface does not slide between segments.
- Layer: none.

Component tokens:

| Token | Aliases | Overridden by |
|---|---|---|
| `--ll-button-bg` (on each segment) | `--color-transparent` | The group sets it on the segments so they show the track. A pressed segment sets the background itself. |

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Track | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |
| Segment hover | `--color-bg-subtle-hover` | `--palette-oat-300` | `--palette-night-700` |
| Pressed segment fill | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |
| Pressed segment edge | `--color-border-strong` | `--palette-stone-500` | `--palette-night-500` |
| Label | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Pressed toggle fill | `--color-accent-subtle` | `--palette-accent-50` | `--palette-accent-950` |
| Pressed toggle hover | `--color-accent-subtle-hover` | `--palette-accent-100` | `--palette-accent-900` |
| Pressed toggle label | `--color-fg-accent` | `--palette-accent-700` | `--palette-accent-300` |
| Pressed toggle edge | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Editor bar | `--color-bg-surface-sunken` | `--palette-oat-200` | `--palette-night-850` |
| Focus ring | `--color-focus-ring` | `--palette-accent-700` | `--palette-accent-300` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-subtle` | 4.5:1 | Unpressed segment label on the track |
| `--color-fg-default` | `--color-bg-subtle-hover` | 4.5:1 | Hovered segment label |
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Pressed segment label |
| `--color-fg-accent` | `--color-accent-subtle` | 4.5:1 | Pressed toggle label |
| `--color-fg-accent` | `--color-accent-subtle-hover` | 4.5:1 | Hovered pressed toggle label |
| `--color-border-strong` | `--color-bg-subtle` | 3:1 | Pressed segment edge against the track |
| `--color-accent` | `--color-bg-surface` | 3:1 | Pressed toggle edge on a surface |
| `--color-accent` | `--color-bg-surface-sunken` | 3:1 | Pressed toggle edge on the editor bar |
| `--color-focus-ring` | `--color-bg-surface` | 3:1 | Focus ring on a surface or the pressed segment |
| `--color-focus-ring` | `--color-bg-subtle` | 3:1 | Focus ring on the track |

In forced colours a pressed segment or toggle draws a `--border-width-thick` `Highlight` outline, as the
design-system stylesheet does, so the state survives when the fills are removed.

## Responsive behaviour

- An actions group and a toolbar wrap their buttons onto further rows rather than shrink them; a
  toolbar of 13 buttons and two separators is two or three rows at XS and one at LG. The group never
  scrolls sideways.
- A segmented group is one row at every width. It is as wide as its labels and never wider than its
  container; when the container is narrower than the labels need, each label wraps inside its segment
  (D-2). Two to four short labels fit 320 px; "Your time (ET)" and "Event time (ET)" do in English and
  wrap in a longer language.
- In the preview banner the banner's own row wraps, so the group moves to the next line as a whole at
  XS and is never split.
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom everything stays available; every
  button is at least `--target-min` (24 × 24 CSS px, `L2-132`), the `md` buttons and icon buttons 44 px
  tall, the `sm` ones `--control-height-sm` (36 px).

## Accessibility

### Role and pattern

- Actions and segmented groups are `role="group"` named by `aria-label`. A segmented group is a set of
  independent [toggle buttons](https://www.w3.org/WAI/ARIA/apg/patterns/button/) (`aria-pressed`), not a
  radio group and not a tablist: each segment is a tab stop and the arrow keys do nothing (D-11).
- A toolbar follows the [APG toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/):
  `role="toolbar"` named by `aria-label`, with a single tab stop and arrow-key movement between its
  buttons. Its horizontal orientation is the default and needs no attribute.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Actions and segmented: moves through every enabled button in order. Toolbar: one tab stop, on the button that last had focus (the first enabled button when none has), then on to the next control. |
| <kbd>→</kbd> / <kbd>←</kbd> | Toolbar only: focuses the next or previous enabled button, wrapping at the ends and passing over separators. Other groups: none. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Toolbar only: focuses the first or last enabled button. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Presses the focused button; a toggle changes `pressed`. |

### Focus

- A toolbar uses a roving `tabindex`: the tab-stop button is `0` and the others `-1`. If the tab-stop
  button becomes disabled or is removed, the first enabled button takes it. Disabled buttons are skipped. A
  toolbar whose buttons are all disabled has no tab stop.
- Pressing a button leaves focus on it. The group never moves focus; an editor that wants focus back in the
  text does it from its own handler (out of scope).
- The ring is `--color-focus-ring`, at least 2 CSS px and 3:1, drawn on the button itself and visible on the
  pressed segment and inside the track; no sticky header or banner covers it (`L2-126`).

### Labelling

- The group's name comes from `label`: a task, not "buttons" ("Show times in", "View", "Preview width",
  "Formatting"). A page with two groups names them differently.
- A button's name is its visible label, so speech-input users can say it (WCAG 2.5.3, `L2-127`). Where a
  segment adds words with `aria-label`, the name begins with the visible text: "XS, phone, 375 pixels", not
  "Phone, 375 pixels" (D-9).
- An icon-only button has an `aria-label`; its icon is `aria-hidden`.
- The pressed state comes from `aria-pressed`, never from a changing label or from colour alone. A toolbar
  button that is an action (a dialog opener such as "Link") carries no `aria-pressed`.

### Announcements

- The group announces nothing itself. A screen reader announces the new pressed state of the button the
  user pressed ("Event time (ET), toggle button, pressed"). Telling the user what the change did is the
  page's (out of scope).

### Motion

- Fills and edges change at once under `prefers-reduced-motion: reduce`; the buttons' transitions are
  already limited to `no-preference`. The pressed segment never slides between segments.

## Content and internationalisation

- A segment label is one to three words in sentence case: "List", "Board", "Calendar"; "Charts", "Table";
  "Your time (ET)", "Event time (ET)". Keep the labels of one group parallel in grammar and similar in
  length. An action reads as a verb and an object ("Save draft", "Publish note"); a toolbar button names
  what it applies ("Bold", "Heading 2", "Pull quote").
- Order actions from least to most important with the primary last. Do not put unrelated actions
  ("Sign out", "Export notes") in one group.
- The time zone abbreviation is data: the toggle's labels are one message with a zone placeholder ("Your
  time ({zone})", "Event time ({zone})"), and the zone abbreviation comes from the event and the viewer,
  never from the group (`L2-148`).
- Translatable inputs: `label` and every button's label and `aria-label`. Data values: the zone
  abbreviation and the pressed states.
- A label 30 % longer, as in French or the pseudo-locale, wraps inside its segment and never clips or
  overflows the group (`L2-150`).

## Performance

- Change detection: `OnPush`, signal inputs. The group does no work per press: a toolbar's roving
  focus reads its buttons with `contentChildren` and updates `tabindex` on focus movement only.
- Perf-test scenario: none in this repository yet. The event page renders the "Show times in" toggle for
  "Live Q&A: Imago Dei and Machine Personhood", and the article editor renders the 13-button "Formatting"
  toolbar; page budgets per `L2-120` and `L2-123` cover them (as [button](button.md) D-3 records).
- Composite scenarios: none.
- Layout stability: the group's size is fixed by its buttons, whose hairline edge is reserved even when
  not pressed, so pressing a button, changing the zone or toggling a mark shifts nothing (`L2-120`).
- Weight: no dependency beyond [button](button.md) and the CDK a11y key manager if the toolbar uses it.

## Acceptance criteria

### Rendering

- **AC-1** Given Miriam Clarke (Eastern time) on the page of "Live Q&A: Imago Dei and Machine Personhood", when it renders, then the group named "Show times in" has the classes `btn-group` and `btn-group--segmented` and `role="group"`, and holds "Your time (ET)" with `aria-pressed="true"` and "Event time (ET)" with `aria-pressed="false"`. (L2-052)
- **AC-2** Given a visitor in Pacific time on the same event, when the page renders, then the group holds "Your time (PT)" pressed and "Event time (ET)" not pressed. (L2-052)
- **AC-3** Given an editor on platform analytics, when the page renders with the charts, then the group named "View" holds "Charts" pressed and "Table" not pressed, and when the table view is open, "Table" is pressed and "Charts" is not. (L2-101)
- **AC-4** Given Naomi Ellis previewing an unpublished article at 1280 px, when the "Preview notice" banner renders, then the group named "Preview width" holds the buttons "XS", "MD" and "XL", "XL" is pressed, and they are named "XS, phone, 375 pixels", "MD, tablet, 768 pixels" and "XL, desktop, 1280 pixels". (L2-078)
- **AC-5** Given an author on the article editor, when the body field renders, then a `role="toolbar"` named "Formatting" holds, in order, "Bold", "Italic", a separator, "Heading 2", "Heading 3", "List", "Quote", "Pull quote", a separator, "Link", "Scripture reference", "Footnote", "Language", "Image" and "Video", and neither separator is focusable or announced. (L2-046)
- **AC-6** Given the studio editor with the caret in a "Heading 2", when the toolbar renders, then "Heading 2" has `aria-pressed="true"` and "Bold", "Italic" and "Quote" have `aria-pressed="false"`. (L2-046)
- **AC-7** Given Dr. Abena Mensah editing her expert profile, when the profile editor renders, then its "Formatting" toolbar holds exactly "Bold", "Italic" and "Link". (L2-023)
- **AC-8** Given a toolbar named "Text formatting" of icon-only toggles "Bold", "Italic", "Bulleted list" and "Link", when it renders, then each button is an icon button whose `aria-label` is its name, its icon is `aria-hidden`, and "Italic" is pressed. (L2-127)
- **AC-9** Given an actions group named "Note actions" holding "Discard", "Save draft" and "Publish note", when it renders, then it has `btn-group` and `role="group"`, the three buttons are separated by `--space-2`, none has `aria-pressed`, and the primary "Publish note" is last. (L2-127)
- **AC-10** Given the pseudo-locale build, when the event page, the preview banner and the article editor render, then the group names and every button label and `aria-label` are pseudo-localised. (L2-147)

### States

- **AC-11** Given a segmented group, when a segment is pressed, then it has a `--color-bg-surface` fill, `--shadow-1` and a `--border-width-hairline` `--color-border-strong` edge and no accent outline, and an unpressed segment is transparent over the `--color-bg-subtle` track. (L2-129)
- **AC-12** Given "Your time (ET)" pressed, when Miriam presses "Event time (ET)", then the page sets "Event time (ET)" to `aria-pressed="true"` and "Your time (ET)" to `aria-pressed="false"`, exactly one segment is pressed, and the group itself changes neither attribute. (L2-052)
- **AC-13** Given the article toolbar, when "Bold" and "Italic" are both pressed, then both show the `--color-accent-subtle` fill, the `--color-fg-accent` label and a `--color-accent` edge, and the other buttons stay unfilled. (L2-046)
- **AC-14** Given an unpressed segment and a pressed toolbar toggle, when the pointer rests on each, then the segment fills with `--color-bg-subtle-hover` and the toggle with `--color-accent-subtle-hover`, and each label keeps at least 4.5:1. (L2-129)
- **AC-15** Given the studio editor with an article "In review", when it renders, then every toolbar button is natively `disabled`, the toolbar keeps `role="toolbar"` and the name "Formatting", and no button is in the tab order. (L2-077)
- **AC-16** Given the article toolbar, when a screen reader reaches "Bold" and then "Link", then "Bold" reads as a toggle button, not pressed, and "Link" reads as a plain button with no pressed state. (L2-127)

### Keyboard and focus

- **AC-17** Given the "Show times in" group, when a keyboard user presses <kbd>Tab</kbd>, then focus reaches "Your time (ET)" and then "Event time (ET)", <kbd>Enter</kbd> or <kbd>Space</kbd> presses the focused one, and the arrow keys do not move focus between them. (L2-126)
- **AC-18** Given the article editor toolbar, when a keyboard user tabs in from the "Body" label, then focus lands on "Bold", and the next <kbd>Tab</kbd> leaves the toolbar for the text without visiting "Italic". (L2-126)
- **AC-19** Given focus on "Bold", when the user presses <kbd>→</kbd> twice, then focus is on "Heading 2", having passed over the separator; pressing <kbd>←</kbd> from "Bold" focuses "Video", and <kbd>→</kbd> from "Video" focuses "Bold". (L2-126)
- **AC-20** Given focus on "Heading 3", when the user presses <kbd>Home</kbd> and then <kbd>End</kbd>, then "Bold" and then "Video" is focused. (L2-126)
- **AC-21** Given the user moved focus to "Heading 2", when they tab out and press <kbd>Shift</kbd>+<kbd>Tab</kbd>, then focus returns to "Heading 2", which is the only toolbar button with `tabindex="0"` while the others have `-1`. (L2-126)
- **AC-22** Given a toolbar in which "Italic" is disabled, when the user presses <kbd>→</kbd> on "Bold", then focus skips "Italic" and lands on "Heading 2". (L2-126)
- **AC-23** Given focus on the pressed segment "XL" and then on the unpressed "MD", when each is measured, then each shows a ring in `--color-focus-ring` at least 2 CSS px thick with at least 3:1 contrast, fully visible and not clipped by the track or the banner. (L2-126)
- **AC-24** Given focus on "Bold", when the user presses <kbd>Space</kbd>, then "Bold" toggles its `aria-pressed` and keeps focus; the group moves no focus. (L2-126)

### Screen readers

- **AC-25** Given the "Show times in" group, when a screen reader reaches it, then it announces the group name and each segment by its visible label with its state: "Your time (ET), toggle button, pressed". (L2-127)
- **AC-26** Given the "Preview width" group, when the segments are read, then each name begins with its visible text ("XS, phone, 375 pixels"), so a speech-input user can say "click XS". (L2-127)
- **AC-27** Given the icon-only "Bold" toggle, when its pressed state changes, then its name stays "Bold" and the change is exposed through `aria-pressed` alone. (L2-127)

### Theming

- **AC-28** Given the dark theme, when the segmented, toolbar and actions groups render, then the track, the pressed surface, the accent wash, the hover fills and the edges use tokens with dark values, and none keeps a light-only colour. (L2-134)
- **AC-29** Given both themes, when contrast is measured, then labels meet 4.5:1 on the track, the hover fills, the pressed surface and the accent wash, and the pressed segment's edge meets 3:1 against the track and a pressed toggle's edge 3:1 against its surface or the editor bar. (L2-129)

### Responsive

- **AC-30** Given the event page at 320 px, when the "Show times in" group renders, then it stays inside the column, the page does not scroll horizontally, both labels show in full, and each segment is at least 24 CSS px wide and tall. (L2-130)
- **AC-31** Given the pseudo-locale with labels 30 % longer at 320 px, when the "Show times in" group renders, then each label wraps inside its segment, the group stays inside the column and no label is clipped. (L2-150)
- **AC-32** Given the article editor toolbar at 360 px, when it renders, then its 13 buttons wrap onto further rows, the page does not scroll horizontally, and each button is at least 24 × 24 CSS px. (L2-132)
- **AC-33** Given the preview banner at 375 px, when it renders, then the "Preview width" group stays one row of three segments, and the banner moves the group to a new line as a whole rather than splitting it. (L2-130)

### Motion

- **AC-34** Given a user with reduced motion, when a segment is pressed, then the pressed surface appears at once with no fade, and in every mode it never slides between segments. (L2-129)

### Performance

- **AC-35** Given the event page on a mobile profile, when it loads, then the "Show times in" group is in the first paint at its final size, and pressing a segment shifts no layout. (L2-120)

## Implementation notes

- Planned. Folder `frontend/projects/components/src/lib/button-group/`, one type per file:
  `button-group.ts` (`ButtonGroup`, selector `div[llButtonGroup]`) and `button-group-variant.ts`
  (`ButtonGroupVariant`), with `button-group.html` (`<ng-content />`) and `button-group.scss`. The detailed
  designs call it `ll-button-group`; the library's attribute-selector convention makes it
  `div[llButtonGroup]`.
- Host bindings add `.btn-group`, the variant modifier, `role` and `aria-label`; the consumer's `class`
  (`editor__toolbar`) is kept. Styles are the `button-group` block of `components.css`, written as
  `:host(.btn-group--segmented)` rules with the buttons styled under `:host ::ng-deep .btn`, because the
  buttons are projected.
- Roving focus for the toolbar: `contentChildren` over the `button[llButton]` and `button[llIconButton]`
  elements (`descendants: true`, `read: ElementRef`), or a CDK `ListKeyManager` with
  `withHorizontalOrientation('ltr')`, `withHomeAndEnd()`, `withWrap()` and a predicate that skips disabled
  buttons. Separators are not items.
- Composes [button](button.md) (`button[llButton]`, `pressed`, `size`) and its icon button
  (`button[llIconButton]`, `pressed`).
- Design-system and stylesheet changes the CRD requires, to be made upstream first: the page's Overview and
  Sources still say "Unused in mocks" and its index row counts 0 uses, but 25 mocks draw the segmented group
  and 29 the toolbar; the pressed edges (D-3, D-4); the label wrap (D-2); `.icon-btn[aria-pressed="true"]` in
  the toolbar and the page's `.btn--ghost.btn--icon` toggles replaced by `.icon-btn` (D-5); the rule
  `.btn-group--segmented .btn[aria-current="page"]` has no consumer and goes (a segmented group never holds
  links, D-1); `.editor__toolbar` sets `inline-size: auto` and `max-inline-size: none` so the bar still spans
  the editor now that it carries `.btn-group` (D-12).
- Mock changes the CRD requires: the preview banner's three `a.btn[role=button]` links become `button`
  elements with the names of D-9; the editor toolbars' `a` items ("Scripture reference", "Image") become
  buttons, and every toolbar adds `.btn-group` beside `.btn-group--toolbar`.
- [Event head](event-head.md) projects the time zone toggle as the page's own markup. When this component is
  built, that consumer markup becomes `div[llButtonGroup]` with `button[llButton] [pressed]`.

## Decisions

- **D-1** *The preview banner's mock segments are `a` links with `role="button"` and `aria-pressed`. Links or
  buttons?* Buttons. The mock draws links only because a static page cannot switch in place; the preview
  detailed design says the width control acts in the browser and resizes the frame without a request, and a
  link with `role="button"` and `aria-pressed` misses the <kbd>Space</kbd> key a button gives. A segmented
  group therefore holds `button[llButton]` only, and the CSS rule for `aria-current="page"` segments is
  dropped (links that load pages are [tabs](tabs.md)).
- **D-2** *A segmented group does not wrap, yet the event page's two 14-character labels cannot fit a
  320 px column once a language lengthens them. What gives?* The label wraps inside its segment. `L2-150`
  requires buttons to wrap or reflow rather than overflow their container, the design-system page's advice
  to keep one-word labels does not cover a mock that already uses "Your time (ET)", and a select is not an
  option for a two-way toggle. The segments may shrink (`min-width: 0`), keep their text centred, and the
  group stays within its container. This overrides the button's `white-space: nowrap` inside a segmented
  group only; the [event head](event-head.md) already relies on it.
- **D-3** *How does a pressed segment differ from the track by more than a fill?* A
  `--border-width-hairline` edge in `--color-border-strong`. The surface fill on the track is about 1.2:1 in
  both themes, which fails the 3:1 for the boundary of a state (`L2-129`, criterion 5); the edge measures
  3.4:1 in light and 3.6:1 in dark. Every button already reserves a transparent hairline, so nothing moves.
- **D-4** *The same question for a pressed toolbar toggle.* A `--border-width-hairline` edge in
  `--color-accent`, 4.3:1 on the editor bar in light and higher in dark. The wash and the accent label alone
  are not 3:1 against the unpressed state.
- **D-5** *The design-system toolbar page draws icon-only toggles as `.btn.btn--ghost.btn--icon`; the button
  CRD has no such modifier and no mock uses it. Which element?* `button[llIconButton]`, the round `.icon-btn`
  already specified with `pressed`. It keeps one icon-only button in the library; the toolbar gives it the
  same pressed treatment as a `.btn` (D-3's rule for toolbars, D-4) and the design-system page changes to match.
- **D-6** *Does a toolbar hold links?* No. The mock's "Scripture reference" and "Image" are links to dialog
  mocks; in the product they are buttons that open a dialog, since button-triggered editing opens a dialog
  (`AGENTS.md`), and a toolbar item is a button whether it toggles or acts.
- **D-7** *Is there a group-level `disabled`?* No. The design-system page says disabling the group disables
  every button, which the consumer does by binding `disabled` on each, as the locked studio editor does. A
  group input would need [button](button.md) to read its group, a change to a built component for no extra
  behaviour; the result on screen and for assistive technology is identical.
- **D-8** *Is the role an input?* No, the variant decides it: `toolbar` is `role="toolbar"`, the other two
  `role="group"`, as the design-system page and the mocks do. One input cannot contradict the other.
- **D-9** *The preview mock names the segments "Phone, 375 pixels" while showing "XS".* The names begin with
  the visible text: "XS, phone, 375 pixels". A name that omits the visible label fails WCAG 2.5.3 and
  `L2-127`, and the pixel widths come from `L2-078`.
- **D-10** *Which toolbar button holds the tab stop?* The one that last had focus; the first enabled button
  until then. This is the APG roving pattern; resetting to the first button on every entry would make a user
  press arrows again after each trip to the text.
- **D-11** *Do arrow keys move between segmented buttons?* No. The design-system page lists arrows for the
  toolbar only. A segmented group is a set of toggle buttons that each stay in the tab order, so a group of
  two to four needs at most four Tab presses and no new keyboard model.
- **D-12** *The editor mocks draw `editor__toolbar btn-group--toolbar` without `.btn-group`.* The component
  always renders `.btn-group`, so its `max-content` width would shorten the editor's bar. The `.editor__toolbar`
  rule gains `inline-size: auto; max-inline-size: none`, and the editor's CRD owns the bar around the group.
- **D-13** *Does the group check that its children are sensible?* Only in development mode: wrong element,
  mixed button sizes, a segmented group without two to four boolean-`pressed` buttons, or an actions group with
  more than one primary. Production builds do not check, so a mistake costs no run-time work.
- **D-14** *The plain actions group is unused in the mocks; is it specified?* Yes. It is the base class of the
  other two kinds, the design-system page defines it with a primary-last rule, and specifying it adds no input
  or markup; leaving it out would make the next screen that needs "Discard, Save draft, Publish" reshape the API.
- **D-15** *Is pressed state on a toolbar action allowed to be absent?* Yes. "Link", "Footnote", "Language",
  "Image" and "Video" open dialogs or insert content and are not on or off, so `pressed` stays `null` and no
  `aria-pressed` is rendered; `L2-127` asks toggles, not actions, to expose a state.
