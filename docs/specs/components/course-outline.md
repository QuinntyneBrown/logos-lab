# Course outline

| Field | Value |
|---|---|
| Selector | `nav[llCourseOutline]` |
| Library path | `frontend/projects/components/src/lib/course-outline/` |
| Status | planned |
| Traces to | L2-025, L2-026, L2-028, L2-120, L2-123, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-147, L2-148, L2-150 |
| Design system | [`course-outline.html`](../../design-system/components/course-outline.html) |
| Source mocks | [`pages/course-overview/default`](../../mocks/pages/course-overview/default.html), [`pages/course-overview/visitor`](../../mocks/pages/course-overview/visitor.html), [`pages/course-overview/submitting`](../../mocks/pages/course-overview/submitting.html), [`pages/course-overview/enrolled`](../../mocks/pages/course-overview/enrolled.html), [`pages/course-overview/cohort`](../../mocks/pages/course-overview/cohort.html), [`pages/course-overview/completed`](../../mocks/pages/course-overview/completed.html), [`pages/course-overview/archived`](../../mocks/pages/course-overview/archived.html), [`pages/course-overview/long`](../../mocks/pages/course-overview/long.html), [`pages/lesson-player/default`](../../mocks/pages/lesson-player/default.html), [`pages/lesson-player/completed`](../../mocks/pages/lesson-player/completed.html), [`pages/lesson-player/locked`](../../mocks/pages/lesson-player/locked.html), [`dialogs/course-outline/default`](../../mocks/dialogs/course-outline/default.html), [`dialogs/course-outline/locked`](../../mocks/dialogs/course-outline/locked.html), [`dialogs/course-outline/scroll`](../../mocks/dialogs/course-outline/scroll.html), [`notifications/offline-notice/persistent`](../../mocks/notifications/offline-notice/persistent.html) |
| Rendering | [`course-outline.html`](course-outline.html) |

## Purpose and scope

The course outline is a course's syllabus as a navigable list: numbered sections, each a native
disclosure, each holding its lessons in order. A learner sees where they are, what they have finished,
what is next and what is still locked, with each lesson's type and length. It sits in the main column of
the course overview (full), in the aside of the lesson player from LG (compact), and in the Outline
drawer below LG (compact, inside the [dialog](dialog.md) or [drawer](drawer.md)).

Use [sidebar navigation](sidebar-navigation.md) for destinations of one area, [tabs](tabs.md) for views
of one page, and a stepper for the steps of a form flow. The studio's lesson ordering is a separate
sortable list.

Out of scope:

- Deciding which lesson is current, done, locked or next, what the count says, and which sections start
  open: the page works those out from the course, the enrolment and the navigation mode, and passes
  them in (D-3, D-4).
- The course progress bar and "10 of 24 lessons" line above the outline in the drawer: the
  [progress bar](progress-bar.md) and the dialog's own text.
- Opening and closing the drawer: the [dialog](dialog.md) or [drawer](drawer.md); the outline only
  reports `lessonChosen` so the drawer can close (D-5).
- Locking rules and completion rules: the API (L2-028 AC2, L2-029). The outline shows what it is given.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/course-overview/default`, `visitor`, `submitting` | full; label "Course outline"; six sections, sections 1 and 3 open | counts "4 lessons", "5 lessons", "3 lessons"; every lesson locked ("locked: enrol to open", or "locked: sign in and enrol to open" for a visitor); labels "Video · 6 min", "Text · 8 min", "Article · 12 min", "Module · 15 min", "Cohort discussion" | locked, closed and open sections | canvas |
| `pages/course-overview/enrolled`, `cohort` | full; section 3 open | counts "4 of 4", "5 of 5", "1 of 5", "0 of 4"; sections 1 and 2 done; 3.1 done, 3.2 current (a link), 3.3 to 3.5 locked "finish the previous lesson first" | done, current, locked | canvas |
| `pages/course-overview/completed` | full; section 1 open | every section complete, every lesson a done link | done | canvas |
| `pages/course-overview/archived` | full; section 1 open, four sections of a free-navigation course | counts "1 of 4", "0 of 4", "0 of 3"; 1.1 done, 1.2 current, every other lesson an available link with no hidden state text | done, current, available | canvas |
| `pages/course-overview/long` | full; all six sections open | 24 locked lessons, the whole course visible | locked, long list | canvas |
| `pages/lesson-player/default`, `article`, `video`, `module`, `scroll-to-complete`, `error`, `offline`, `archived` | compact, in the aside; only the section holding the current lesson open (section 3; section 1 in `article` and `archived`) | time only ("14 min"), "Cohort" for the discussion; 3.2 current | done, current, locked | surface |
| `pages/lesson-player/completed` | compact; 3.2 done and current, 3.3 "up next" (a link), 3.4 and 3.5 locked | "up next" hidden text; type icon on the next lesson | done and current, up next, locked | surface |
| `pages/lesson-player/locked` | compact; same outline as `default` | locked rows | locked | surface |
| `dialogs/course-outline/default`, `locked` | compact in the Outline drawer; only section 3 open | the course's six sections with counts "4 of 4" to "0 of 3" | done, current, locked | raised surface |
| `dialogs/course-outline/scroll` | compact; all six sections open, the dialog body scrolls | every lesson | all | raised surface |
| `notifications/offline-notice/*` | compact; section 3 open, the other sections show one lesson each, titled without its number ("Why this course") | hidden state text "locked" without a reason on closed sections | done, current, locked | surface |

## Anatomy

1. **Outline** — `nav.outline`: a labelled navigation landmark; a grid with a hairline above it.
2. **Section** — `details.outline__section`: a native disclosure with a hairline below it.
3. **Summary** — `summary`: a three-column grid, the section name, the count and a plus (closed) or
   minus (open) drawn by CSS; at least `--target-comfortable` tall; the native marker is hidden.
4. **Name** — `span.outline__name`: the section's number and title, `--text-h4`; wraps anywhere.
5. **Count** — `span.outline__count`: the section's progress or size, `--text-caption`, tabular numerals,
   never wraps ("4 lessons", "1 of 5"), plus an optional visually hidden `span.vh` that completes it
   (" lessons completed").
6. **Lessons** — `ol.outline__lessons`: the section's lessons in order, one `li` each.
7. **Lesson** — `a.outline__lesson` for a lesson that can be opened, `span.outline__lesson.is-locked`
   (with `aria-disabled="true"`) for one that cannot; a three-column grid: mark, title, label.
   Modifiers: `.is-done`, `.is-locked`, and `aria-current` for the current lesson.
8. **Mark** — `span.outline__mark`: a 24 px ring holding an icon: a tick when done, a lock when locked,
   otherwise the lesson type's icon (video, article, module, cohort).
9. **Title** — the lesson's number and title, then a visually hidden `span.vh` with the state text.
10. **Label** — `span.outline__time`: the type and length ("Video · 6 min"), `--text-caption`, tabular
    numerals, never wraps.

Host: the consumer's own `<nav llCourseOutline>`; the component adds the classes `outline` and
`outline--compact`, sets `aria-label`, and renders the sections inside it. The mark icons are
`svg[llIcon]` from the [icon](icon.md) component.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string` | — | yes | The `nav`'s `aria-label`: "Course outline". Distinct from every other `nav` on the page (L2-127 AC1). |
| `sections` | `readonly CourseOutlineSection[]` | — | yes | Rendered in order. An empty array renders an empty, hidden `nav`. |
| `compact` | `boolean` | `false` | no | Adds `outline--compact`: tighter rows, and the label shows the length only (D-6). |
| `currentToken` | `'page' \| 'step'` | `'page'` | no | The value of `aria-current` on the current lesson: `page` where the outline sits beside the lesson being shown (the lesson player and its drawer), `step` where it does not (the course overview) (D-7). |
| `revealCurrent` | `boolean` | `false` | no | When `true`, the current lesson is scrolled into view the first time the outline renders, inside its own scrolling ancestor only (D-9). |

`CourseOutlineSection` is `{ id: string; name: string; countLabel: string; countHint: string | null;
open: boolean; lessons: readonly CourseOutlineLesson[] }`.

| Section field | Rule |
|---|---|
| `id` | Stable; the track key and the `sectionToggled` payload. |
| `name` | The section's number and title, already translated: "3. Image and likeness". |
| `countLabel` | The visible count, built by the page with ICU plurals (L2-147 AC3): "4 lessons" before the learner starts, "1 of 5" once they have, where the first number is the lessons finished. |
| `countHint` | Hidden text that completes a bare "1 of 5": "lessons completed". `null` where the count already says what it counts ("4 lessons"). Rendered after the count, preceded by a space. |
| `open` | The section's initial state; see D-4. A later change of the value applies; the learner's own toggling is never reset by an unrelated re-render. |
| `lessons` | The section's lessons in order; a section with none renders its summary only. |

`CourseOutlineLesson` is `{ id: string; title: string; type: CourseOutlineLessonType; kind: string;
shortKind: string | null; timeLabel: string | null; optionalLabel: string | null; state:
CourseOutlineLessonState; current: boolean; stateLabel: string | null; path: string | null }`.

| Lesson field | Rule |
|---|---|
| `id` | Stable; the track key and the `lessonChosen` payload. |
| `title` | The lesson's number and title, translated or authored: "3.2 Representing, not resembling". |
| `type` | `'video' \| 'text' \| 'article' \| 'module' \| 'cohort'`. Chooses the mark icon of a lesson that is not done and not locked: `video`, `article` (text and article), `module`, `people` (cohort) (D-8). |
| `kind` | The type's display label: "Video", "Text", "Article", "Module", "Cohort discussion". |
| `shortKind` | The compact label for a lesson with no length: "Cohort". `null` otherwise. |
| `timeLabel` | The formatted length, "6 min" (L2-148); `null` for a lesson with no length ("Cohort discussion"). |
| `optionalLabel` | "Optional" for an optional lesson (L2-026), else `null`. Appended to the label (D-10). |
| `state` | `'locked' \| 'available' \| 'done'`. `locked` renders a non-link; `available` and `done` render a link when `path` is set. |
| `current` | `true` for the lesson the learner is on (lesson player) or should continue with (course overview). Independent of `state`: a finished lesson can be current. Ignored on a `locked` lesson. At most one lesson in the outline is current. |
| `stateLabel` | The translated hidden text that says the state beyond icon and colour, without the leading comma: "completed", "locked: enrol to open", "locked: sign in and enrol to open", "locked: finish the previous lesson first", "up next". `null` for none. |
| `path` | The lesson's route, a string handed to `routerLink`. `null` renders the row as a plain non-link `span` with no `aria-disabled`. |

`CourseOutlineLessonType` is the union above; `CourseOutlineLessonState` is `'locked' | 'available' |
'done'`. Each is its own file (D-1).

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| `sectionToggled` | `CourseOutlineSectionToggle` — `{ id: string; open: boolean }` | The learner opens or closes a section (the native `toggle` event after a user action, not after an input change). The page keeps the state so that an outline destroyed and recreated by a drawer, or by a resize across LG, restores it (D-4). |
| `lessonChosen` | `string` — the lesson's `id` | A lesson link is activated (click, Enter, or the context-menu "open" action on a link). Navigation proceeds normally; the signal lets a hosting drawer close (D-5). Locked rows never emit. |

### Content slots

None. The outline is data-driven: every row has the same structure, and a slot would let a page break
the list semantics. See D-2.

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Full | — | The course overview's main column. |
| Compact | `.outline--compact` | The lesson aside and the Outline drawer. |

| Size | Modifier | Row height | Padding | Type |
|---|---|---|---|---|
| Full | — | `--target-comfortable` minimum | `--space-2` `--space-3` | `--text-body-sm`, label `--text-caption` |
| Compact, from LG | `.outline--compact` | `--control-height-sm` minimum | as full | as full |
| Compact, below LG | `.outline--compact` | `--target-comfortable` minimum (D-11) | as full | as full |

Section summaries are `--target-comfortable` tall in both variants.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Section closed | `details` without `open` | Plus sign, name and count only | "collapsed" (native); the lessons are not exposed |
| Section open | `details[open]` | Minus sign, lessons listed | "expanded" |
| Summary hover | `:hover` | Name turns `--color-fg-accent` | — |
| Summary focus | `:focus-visible` | Shared ring | name, count, "collapsed" or "expanded" |
| Available | `a.outline__lesson` | `--color-fg-muted`; empty-ring mark with the type icon | "link", title, "up next" where `stateLabel` says so |
| Available hover | `a:hover` | `--color-bg-subtle`, `--color-fg-default` | — |
| Available focus | `a:focus-visible` | Shared ring around the row | link name |
| Done | `.is-done` | Mark filled `--color-success-bg`, ringed `--color-success-border`, tick in `--color-success-icon` | link, title, ", completed" |
| Current | `aria-current="page"` or `"step"` | `--color-accent-subtle` wash, `--color-fg-accent`, semibold title, mark ringed `--color-accent` | "current page" or "current step" (native to the attribute) |
| Done and current | `.is-done` with `aria-current` | Current wash with the tick mark | link, title, ", completed", "current page" |
| Locked | `span.is-locked[aria-disabled="true"]` | `--color-fg-subtle`, dashed mark ring with a lock, `not-allowed` cursor, no hover wash | title and the reason, ", locked: finish the previous lesson first"; skipped by Tab, read in the list |
| Optional | `optionalLabel` set | "Optional" appended to the label | read as part of the label |
| Not a link | `path: null` | As available or done, no hover wash | plain text, no role |
| Empty | `sections` is `[]` | Nothing visible | landmark hidden |
| Loading, error | — | None: the page shows its own skeleton or error message instead of the outline (D-12) | — |

## Markup

```html
<!-- rendered: course overview, signed-out visitor (full); section 1 open, section 2 closed -->
<nav class="outline" aria-label="Course outline">
  <details class="outline__section" open>
    <summary><span class="outline__name">1. Beginnings</span><span class="outline__count">4 lessons</span></summary>
    <ol class="outline__lessons">
      <li><span class="outline__lesson is-locked" aria-disabled="true"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="10.5" width="13" height="10" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg></span><span>1.1 Why this course<span class="vh">, locked: sign in and enrol to open</span></span><span class="outline__time">Video · 6 min</span></span></li>
      <li><span class="outline__lesson is-locked" aria-disabled="true">…<span class="outline__time">Text · 8 min</span></span></li>
    </ol>
  </details>
  <details class="outline__section">
    <summary><span class="outline__name">2. Made, not manufactured</span><span class="outline__count">5 lessons</span></summary>
    <ol class="outline__lessons">…</ol>
  </details>
</nav>
```

```html
<!-- rendered: enrolled learner on the course overview (full): done, current, locked in section 3 -->
<nav class="outline" aria-label="Course outline">
  <details class="outline__section" open>
    <summary><span class="outline__name">3. Image and likeness</span><span class="outline__count">1 of 5<span class="vh"> lessons completed</span></span></summary>
    <ol class="outline__lessons">
      <li><a class="outline__lesson is-done" href="/courses/imago-dei-in-an-age-of-machines/lessons/3-1"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span>3.1 Tselem and demuth: the words in Genesis<span class="vh">, completed</span></span><span class="outline__time">Text · 12 min</span></a></li>
      <li><a class="outline__lesson" href="/courses/imago-dei-in-an-age-of-machines/lessons/3-2" aria-current="step"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h8l3 3v14h-11z"/><path d="M9 11h6M9 14.5h6M9 18h3.5"/></svg></span><span>3.2 Representing, not resembling</span><span class="outline__time">Text · 14 min</span></a></li>
      <li><span class="outline__lesson is-locked" aria-disabled="true"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="10.5" width="13" height="10" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg></span><span>3.3 The image restored in Christ<span class="vh">, locked: finish the previous lesson first</span></span><span class="outline__time">Video · 18 min</span></span></li>
    </ol>
  </details>
</nav>
```

```html
<!-- rendered: lesson player aside (compact): 3.2 done and current, 3.3 up next, a cohort lesson -->
<nav class="outline outline--compact" aria-label="Course outline">
  <details class="outline__section" open>
    <summary><span class="outline__name">3. Image and likeness</span><span class="outline__count">2 of 5<span class="vh"> lessons completed</span></span></summary>
    <ol class="outline__lessons">
      <li><a class="outline__lesson is-done" href="…/3-2" aria-current="page"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span>3.2 Representing, not resembling<span class="vh">, completed</span></span><span class="outline__time">14 min</span></a></li>
      <li><a class="outline__lesson" href="…/3-3"><span class="outline__mark"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m10.5 9.5 4 2.5-4 2.5z"/></svg></span><span>3.3 The image restored in Christ<span class="vh">, up next</span></span><span class="outline__time">18 min</span></a></li>
      <li><span class="outline__lesson is-locked" aria-disabled="true">…<span>3.5 Discussion: what would a machine image be?<span class="vh">, locked: finish the previous lesson first</span></span><span class="outline__time">Cohort</span></span></li>
    </ol>
  </details>
</nav>
```

```html
<!-- consumer -->
<nav llCourseOutline label="Course outline" [sections]="outline()" [compact]="true"
     currentToken="page" [revealCurrent]="true"
     (sectionToggled)="remember($event)" (lessonChosen)="drawer.close()"></nav>
```

## Design

- The outline is a grid; `border-block-start` hairline `--border-width-hairline` in `--color-border-default`;
  each section has the same hairline below.
- Summary: grid `minmax(0, 1fr) auto auto`, gaps `--space-1` and `--space-3`, aligned centre,
  minimum height `--target-comfortable`, padding-block `--space-3`, pointer cursor. The plus and minus
  are `--text-h4` in `--color-fg-subtle`. The name wraps with `overflow-wrap: anywhere`.
- Lessons list: grid, gap `--space-1`, no margin, padding-bottom `--space-4`, no list marker.
- Lesson row: grid `auto minmax(0, 1fr) auto`, gap `--space-3`, centred, minimum height
  `--target-comfortable`, padding `--space-2` `--space-3`, `--radius-md`, `--text-body-sm`, no text
  decoration. The title column wraps with `overflow-wrap: anywhere` (D-13); the label never wraps.
- Mark: `--space-6` square circle (`--radius-full`), hairline ring `--color-border-strong`, icon
  `--space-4`. Locked: dashed ring.
- Compact: row minimum height `--control-height-sm` from LG (D-11).
- No motion: sections open and close instantly.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Section name | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Name on hover | `--color-fg-accent` | `--palette-accent-700` | `--palette-accent-300` |
| Count, label, plus and minus, locked row | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Available row | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Available row on hover | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |
| Hairlines | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Mark ring | `--color-border-strong` | `--palette-stone-500` | `--palette-night-500` |
| Done mark fill | `--color-success-bg` | `--palette-sage-50` | `--palette-sage-950` |
| Done mark ring | `--color-success-border` | `--palette-sage-300` | `--palette-sage-800` |
| Done tick | `--color-success-icon` | `--palette-sage-500` | `--palette-sage-300` |
| Current wash | `--color-accent-subtle` | `--palette-accent-50` | `--palette-accent-950` |
| Current text and mark icon | `--color-fg-accent` | `--palette-accent-700` | `--palette-accent-300` |
| Current mark ring | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Focus ring | `--color-focus-ring` | `--palette-accent-700` | `--palette-accent-300` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-muted` | `--color-bg-surface` | 4.5:1 | Available lesson titles |
| `--color-fg-subtle` | `--color-bg-surface` | 4.5:1 | Locked titles, counts, labels |
| `--color-fg-accent` | `--color-accent-subtle` | 4.5:1 | Current lesson |
| `--color-success-icon` | `--color-success-bg` | 3:1 | Done tick |
| `--color-focus-ring` | `--color-bg-surface` | 3:1 | Focus ring |

## Responsive behaviour

- The outline fills its container at every width; it has no breakpoints of its own except the compact
  row height below LG (D-11).
- Titles wrap in their column and the label stays on the right on one line; a long section name wraps
  in its column while the count stays beside it, and the plus or minus never leaves the summary.
- At 320 px the label "Cohort discussion" takes about a third of the row and its title wraps to four lines; that is accepted, because nothing clips and the label is never wrapped or truncated (AC-24).
- Placement is the page's: the course overview puts the outline in the main column at every width; the
  lesson player puts it in the aside from LG and behind the "Outline" button as a drawer below LG
  (L2-028 AC4). Only one instance is in the page at a time, so the `nav` label stays distinct.
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom everything stays available; every row
  and summary is at least 44 × 44 CSS px on touch viewports.

## Accessibility

### Role and pattern

A labelled `nav` landmark. Each section is a native `details` and `summary` disclosure; the lessons are
an ordered list, one `li` per lesson, so the list reports its length ("list, 5 items") and the lesson's
position. A lesson that can be opened is a link; one that cannot is a `span` with `aria-disabled="true"`,
which is read in the list but is not focusable. The current lesson carries `aria-current`.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Moves through the section summaries and the available lessons of open sections, in order. Locked rows and the lessons of closed sections are skipped. |
| <kbd>Enter</kbd> or <kbd>Space</kbd> on a summary | Opens or closes the section. |
| <kbd>Enter</kbd> on a lesson link | Opens the lesson. |

### Focus

The shared ring: `--color-focus-ring`, `--focus-ring-width`, offset `--focus-ring-offset`, around the
summary or the whole lesson row. Opening or closing a section keeps focus on its summary. The ring is
not clipped by the row or by a scrolling drawer body.

### Labelling

State is never conveyed by the mark's colour or icon alone: each done, locked or up-next lesson carries
visually hidden text after its title (", completed", ", locked: finish the previous lesson first",
", up next"), built from `stateLabel`. The current lesson is announced by `aria-current`. The name of a
lesson link includes its visible title and label (L2-127 AC2). A bare count such as "1 of 5" is completed
by its hidden hint, so the summary reads "3. Image and likeness 1 of 5 lessons completed".

### Announcements

None. Toggling a section changes native expanded state, which assistive technology announces itself.
Progress changing after a lesson completes re-renders the outline silently; the lesson page's own live
region announces it.

### Motion

None. Sections open instantly; `revealCurrent` scrolls instantly (`behavior: 'auto'`), so
`prefers-reduced-motion` needs no special case.

## Content and internationalisation

- Section names and lesson titles are numbered as the course numbers them: "3. Image and likeness",
  "3.2 Representing, not resembling". Lengths are whole minutes: "12 min" (L2-148).
- The label reads type then length with a middle dot: "Video · 6 min", "Text · 8 min", "Article · 12 min",
  "Module · 15 min", "Cohort discussion", "Text · 8 min · Optional" (D-10). In the compact variant it is the
  length alone ("14 min"), or `shortKind` for a lesson with no length ("Cohort").
- A lock is explained in words: "finish the previous lesson first", "enrol to open", "sign in and enrol to
  open". Never "locked" alone where a reason exists.
- Counts: "4 lessons" before the learner starts, "4 of 4" once they have; the page builds them with ICU
  plural messages (L2-147 AC3).
- Translatable inputs: `label`, every `name`, `countLabel`, `countHint`, `title`, `kind`, `shortKind`,
  `timeLabel`, `optionalLabel`, `stateLabel`. Data values: `id`, `type`, `state`, `current`, `open`, `path`.
- The component writes the comma before a hidden state text and the middle dot between label parts; both
  are punctuation and are not translated.

## Performance

- Change detection: `OnPush`, signal inputs. Rows are tracked by `id`, so toggling progress on one
  lesson re-renders one row. Sections are native `details`: opening one runs no script beyond the
  `toggle` listener.
- Every lesson of every section is rendered, closed sections included: the content stays findable by the
  browser, the DOM is small (a row is a list item, a link, three spans and an icon), and no layout
  depends on a section's contents until it opens.
- Perf-test scenario: this repository has no perf-test project, so the outline is measured through the
  page budgets of L2-120 and L2-123 and the acceptance test of the maximum course: 20 sections of 30
  lessons (600 rows, L2-026) on the course overview for Miriam Clarke, with section 1 open, rendered
  within a 200 ms interaction budget for opening a section.
- Composite scenarios: the course overview page and the lesson player.
- Layout stability: the outline's height is not reserved; the page shows a skeleton of the same width
  until the course loads. The mark has a fixed 24 px box and icons are inline, so a row never changes
  height when state arrives.
- Weight: no dependency beyond `@angular/core`, `@angular/router` and the icon component.

## Acceptance criteria

### Rendering

- **AC-1** Given Imago Dei in an Age of Machines viewed by a signed-out visitor, when the course overview renders its outline, then a `nav` named "Course outline" holds six `details.outline__section`, the first summary reads "1. Beginnings" with the count "4 lessons", and sections 1 and 3 are open while section 2, "2. Made, not manufactured" (count "5 lessons"), shows only its name and count. (L2-025)
- **AC-2** Given the visitor's outline, when lesson "1.1 Why this course" renders, then it is a `span.outline__lesson.is-locked` with `aria-disabled="true"`, not a link, its mark holds a lock, its label reads "Video · 6 min", and its accessible text reads "1.1 Why this course, locked: sign in and enrol to open". (L2-025)
- **AC-3** Given the course's lessons, when their labels render, then "1.2 How to study with others" reads "Text · 8 min", "1.4 What we mean by “AI”" reads "Article · 12 min", "2.5 Practice: Prompting with Wisdom" reads "Module · 15 min" and "3.5 Discussion: what would a machine image be?" reads "Cohort discussion" with no length. (L2-025)
- **AC-4** Given a lesson with `optionalLabel` "Optional", when it renders in the full variant, then its label reads "Text · 8 min · Optional" and the compact variant reads "8 min · Optional". (L2-026)
- **AC-5** Given Miriam Clarke enrolled in the course, when her course overview renders, then the section counts read "4 of 4", "5 of 5", "1 of 5" and "0 of 4", and the summary of "3. Image and likeness" reads "3. Image and likeness 1 of 5 lessons completed" to a screen reader. (L2-028)
- **AC-6** Given a course with a free-navigation setting such as Faith, Work and Automation, when its lessons render, then every lesson that is not done is an available link with no lock and no hidden state text. (L2-028)
- **AC-7** Given a lesson with `path` set to null, when it renders, then it is a `span.outline__lesson` without `aria-disabled`, with no link role and no hover wash. (L2-028)

### States

- **AC-8** Given Miriam on the course overview, when lesson "3.1 Tselem and demuth: the words in Genesis" renders as done, then it is an `a.outline__lesson.is-done` with a tick in a mark filled with the success roles, its title is followed by the hidden text ", completed", and it links to the lesson. (L2-028)
- **AC-9** Given Miriam's current lesson "3.2 Representing, not resembling", when the outline renders in the lesson player with `currentToken` `page`, then its row has `aria-current="page"`, the accent wash, a semibold title and an accent-ringed mark with the document icon, and no other row has `aria-current`. (L2-028)
- **AC-10** Given the same outline on the course overview with `currentToken` `step`, when it renders, then the current row has `aria-current="step"` and the same look. (L2-127)
- **AC-11** Given Miriam has just completed lesson 3.2 on the lesson player, when the outline renders, then 3.2 is `.is-done` and has `aria-current="page"`, shows the tick, and reads "3.2 Representing, not resembling, completed". (L2-028)
- **AC-12** Given the next lesson "3.3 The image restored in Christ" is available, when it renders, then it is a link with the video icon and the hidden text ", up next". (L2-028)
- **AC-13** Given a sequential course where "3.4 Practice: Bias in the Training Data" follows an incomplete lesson, when it renders, then it is a non-link `span` with `aria-disabled="true"`, a dashed mark with a lock, and the reason ", locked: finish the previous lesson first" is read in the list. (L2-028)
- **AC-14** Given done, current and locked lessons, when colour is removed (forced colours or a grayscale filter), then done shows a tick, locked shows a lock in a dashed ring, current has `aria-current` and a semibold title, and each of done and locked still has its hidden text. (L2-127)
- **AC-15** Given the compact outline in the lesson player, when it renders, then sections 1 and 2 are closed and section 3 open, each lesson's label shows the length only ("14 min") and "3.5 Discussion: what would a machine image be?" shows "Cohort". (L2-028)

### Disclosure and navigation

- **AC-16** Given the closed section "2. Made, not manufactured", when a keyboard user focuses its summary and presses Enter or Space, then the section opens, its five lessons appear, the plus becomes a minus, focus stays on the summary, and `sectionToggled` emits `{ id, open: true }`. (L2-127)
- **AC-17** Given a section the learner has opened, when the page re-renders the outline with unchanged `open` values, then that section stays open; when the page sets `open` to true on "4. Minds and machines", then it opens without emitting `sectionToggled`. (L2-127)
- **AC-18** Given Miriam in the Outline drawer, when she activates "3.3 The image restored in Christ", then the router navigates to that lesson and `lessonChosen` emits its id, so the drawer closes; activating a locked row emits nothing. (L2-028)
- **AC-19** Given the compact outline with `revealCurrent` in a dialog body that scrolls (all six sections open), when it first renders, then "3.2 Representing, not resembling" is inside the visible area of the dialog body and the page behind has not scrolled. (L2-028)

### Keyboard and focus

- **AC-20** Given the open outline in section 3, when a keyboard user presses Tab through it, then focus visits each summary and each available lesson link in visual order, skips the locked lessons and the lessons of closed sections, and every stop shows a `--color-focus-ring` outline at least 2 CSS px thick with at least 3:1 contrast against the surface, not clipped by the row. (L2-126)

### Screen readers

- **AC-21** Given a screen reader on the outline, when it reads section 3, then the landmark is named "Course outline", the lessons are announced as a list of five items, each section summary is announced with its expanded or collapsed state, and the lesson names include their visible title and label. (L2-127)

### Theming

- **AC-22** Given the dark theme, when the outline renders in the course overview and in the drawer, then names, counts, hairlines, marks, the done tick and the current wash use dark token values and no element keeps a light-only colour. (L2-134)
- **AC-23** Given both themes, when contrast is measured, then available titles, locked titles, counts and labels meet 4.5:1, the current lesson meets 4.5:1 on the accent wash, and the done tick and the focus ring meet 3:1. (L2-129)

### Responsive

- **AC-24** Given the course overview at 320 px with "3.5 Discussion: what would a machine image be?" and a title of "Case Study: The Chatbot Chaplain", when the outline renders, then the page does not scroll horizontally, titles wrap, the label stays on one line at the right, and nothing is clipped. (L2-130)
- **AC-25** Given a viewport of 375 px, when a summary or a lesson row is measured in the full or the compact variant, then it is at least 44 CSS px tall; at 1440 px the compact row is at least `--control-height-sm`. (L2-132)
- **AC-26** Given the pseudo-locale build with strings 30 % longer, when the outline renders at 320 px and at 1280 px, then section names wrap beside their counts, lesson titles wrap, labels stay whole, and none of them is clipped or overlapped. (L2-150)

### Internationalisation

- **AC-27** Given the pseudo-locale build, when the outline renders, then every visible and hidden string (the landmark name, section names, counts, count hints, lesson labels, "Optional" and each state text) is pseudo-localised, and only the comma before a hidden state text and the middle dot in a label are written by the component. (L2-147)
- **AC-28** Given the fr-CA locale, when the outline renders, then the lengths and counts the page passes are formatted by the locale with no change to the component. (L2-148)

### Motion

- **AC-29** Given a user with reduced motion enabled, when a section opens or closes and when `revealCurrent` runs, then nothing animates. (L2-129)

### Performance

- **AC-30** Given a course of 20 sections of 30 lessons, when the course overview renders with section 1 open, then all 600 rows are in the page, the outline adds no layout shift, and opening a closed section responds within 200 ms. (L2-120)
- **AC-31** Given a production build, when bundles are measured, then the outline adds no dependency beyond `@angular/core`, `@angular/router` and the icon component, and the initial JavaScript for the course overview stays within budget. (L2-123)

## Implementation notes

- Planned. Folder `frontend/projects/components/src/lib/course-outline/`, one type per file, each
  component with its own `.html` and `.scss`: `course-outline.ts` (`CourseOutline`, selector
  `nav[llCourseOutline]`), `course-outline.html`, `course-outline.scss`, `course-outline-section.ts`
  (`CourseOutlineSection`), `course-outline-lesson.ts` (`CourseOutlineLesson`),
  `course-outline-lesson-type.ts`, `course-outline-lesson-state.ts`, `course-outline-current-token.ts`
  (`'page' | 'step'`), `course-outline-section-toggle.ts` (`CourseOutlineSectionToggle`), and `index.ts`
  re-exporting them. Everything is exported from the library's `public-api.ts`.
- `CourseOutline` is standalone and `OnPush`. Host bindings: `class.outline` (always),
  `class.outline--compact`, `attr.aria-label` from `label`, and `hidden` when `sections` is empty. Host
  classes are bindings, so the consumer's own `class` is kept. Imports: `RouterLink` and the icon
  component. The template is one `@for (section of sections(); track section.id)` over `details`, with a
  nested `@for` over lessons; a link row and a locked row are two branches of an `@if`.
- Section toggle: `(toggle)` on the `details` reads `open` and emits `sectionToggled` only when the new
  state differs from the input, which keeps input-driven changes silent (AC-17). The `open` attribute is
  bound with `[open]`, so Angular writes it only when the input changes.
- `lessonChosen` is a `(click)` on the link rows; `routerLink` still navigates.
- `revealCurrent`: an `afterNextRender` call that finds `[aria-current]` and calls `scrollIntoView({
  block: 'nearest' })`. It runs once per instance.
- Styles: the `course-outline` block of `components.css`, written as `:host(.outline)` for the list, and
  the `.outline__*` rules inside the component's own stylesheet (view-encapsulated). Add the rules the
  design-system CSS lacks: D-11 (compact row minimum below LG) and D-13 (`overflow-wrap: anywhere` on the
  title column). The `.outline__lesson[aria-current="page"]`
  rules become `[aria-current]` rules so that `step` looks the same (D-7).
- The course overview and lesson player pages hand-write nothing yet; the slice that builds the outline
  adds `CourseOutline` to the course overview page and builds the page-level mapping (current, state,
  state text, counts, open sections) in the page or a mapper in the API library, not in this component.
- E2E: `e2e/pages/course-overview.page.ts` locates the outline by role "navigation" named "Course
  outline" and the classes `.outline__section` and `.outline__lesson`; the component keeps both classes
  on the same elements. Its `lessons` locator counts every row, closed sections included (D-14).
- Design-system catch-up: the `course-outline` page draws a `div.outline`, but all 25 mock usages
  are `nav.outline[aria-label]`; it uses the hidden text ", current lesson" that no mock uses (D-7); and
  its "4 of 4 done" counts are "4 of 4" in the mocks (D-15). It lists one source mock; the usage is the
  25 files in the inventory. The page's own code sample shows no `nav`. The [icon](icon.md) CRD lists
  `done` and `circle` for the course outline; the mocks draw the done mark with the `check` icon
  (a tick from 5, 12.5 to 19, 7.5) and no mock draws `circle`. The offline-notice mocks draw the
  current text lesson with a bare document and no text lines; that is drift from the `article` icon.

## Decisions

- **D-1** *Types and files.* `CourseOutlineLessonType`, `CourseOutlineLessonState`, the current token
  and the toggle payload are each their own file, per the repository's one-type-per-file rule. They are
  unions or small interfaces, never enums.
- **D-2** *Data-driven or slotted?* Data-driven: `sections` with `lessons`. All 25 mock outlines have the
  same row structure and the only variation is data (state, type, label, path). A slot (`ll-course-outline-section`
  children) would let a page write a row whose list semantics, state text or `aria-disabled` differ, and
  the page already holds the data. The brief's `sections` input is kept and extended.
- **D-3** *Where does state come from, and is `'current'` a state?* The brief's `state` had four values with
  `current` one of them. The mocks show a lesson that is done and current at once (`pages/lesson-player/completed`:
  `a.is-done[aria-current="page"]`), so `current` is a separate boolean and `state` has three values:
  `locked`, `available`, `done`. The page computes both; the component never infers a lock or the
  current lesson. A locked lesson is never current, so `current` is ignored on it.
- **D-4** *Which sections start open, and is `open` controlled?* The mocks open the section that holds the
  current lesson: `enrolled`, `cohort`, the other `lesson-player` mocks and `dialogs/course-outline/default` open section 3 only;
  `archived`, `completed` and `lesson-player/article` open section 1 (in `archived` and `article` it holds the current
  lesson; the completed course has no current lesson); the visitor mocks (`default`, `visitor`, `submitting`) open sections 1 and 3
  (the first and the section with the cohort discussion); `long` and `dialogs/course-outline/scroll` open
  all of them. That is the page's decision, so the component renders `open` as given and does not infer
  it. `open` is an initial state, not a controlled one: the native `details` owns the state afterwards,
  which keeps keyboard and assistive technology behaviour native. `sectionToggled` exists because the
  outline in the lesson aside and the one in the drawer are separate instances (the drawer destroys
  its content on close, and a resize across LG swaps one for the other): the page stores the toggles and
  feeds them back as `open` so a learner's expanded sections survive. No mock needs it today; leaving it
  out would force a later API change.
- **D-5** *Does the component render links and close a surrounding dialog?* Yes to links: a non-locked
  lesson with `path` renders `a[routerLink]`, so the page depends on the contract and no row is built
  twice. The component never closes a dialog itself, because it does not know it is in one: it emits
  `lessonChosen`, and the drawer's owner closes on it (`dialogs/course-outline`: the Close control returns
  focus to the "Outline" button; choosing a lesson navigates and the drawer closes).
- **D-6** *What does the label show in the compact variant?* The brief's `kind` and `timeLabel` are kept,
  and `shortKind` and the compact rule are added. The inventory proved two strings are needed: the full
  variant reads "Video · 6 min" and "Cohort discussion", the compact one "6 min" and "Cohort" (all 17
  compact outlines drop the type name; the mark's icon tells the type). So compact shows `timeLabel` when
  present, else `shortKind`, else `kind`.
- **D-7** *`aria-current`: `page`, `step`, and the hidden "current lesson".* The mocks use `aria-current="page"`
  on the current lesson everywhere, including the course overview, where the link goes to another page,
  so "current page" would be announced for a link that is not the page the learner is on. The component
  adds `currentToken`: `page` in the lesson player and drawer (the lesson shown is the current page),
  `step` on the overview (the next step in the course). The look is identical (rules keyed on
  `[aria-current]`). The design-system page says the hidden text ", current lesson"; no mock has it, and
  `aria-current` already announces it, so the component renders none for the current lesson: the page
  passes `stateLabel` null for it (and "completed" when it is also done). The mocks and e2e locators
  that use `[aria-current="page"]` on the overview need `step`; the page object is updated in the slice
  that builds the overview.
- **D-8** *How is the lesson type shown, and what is the cohort lesson's icon?* The mark shows the type
  for a lesson that is not done or locked: `video` for Video, `article` for Text and Article (the mocks
  draw both with the same document and lines), `module` for Module (the cube). The mocks never show a
  cohort lesson that is open, so `people` is chosen from the icon set. L2-026 lists four types; the
  cohort discussion (L2-064) appears in every course mock, so `cohort` is a fifth type here.
- **D-9** *Scroll to the current lesson.* The design-system page says "opening the lesson page puts the
  current lesson in view in the aside", and the dialog's scroll mock shows a long outline. `revealCurrent`
  does it with `scrollIntoView({ block: 'nearest' })`, off by default so the course overview never moves
  the page. A component method was rejected: pages cannot call into a child at the right time.
- **D-10** *Optional lessons.* L2-026 says a lesson is required or optional, but no mock or design-system
  page shows the difference. `optionalLabel` is appended to the label ("Text · 8 min · Optional") so it
  is visible to everyone and read as part of the row, in both variants; no new visual treatment.
- **D-11** *Compact row height on touch.* The design-system CSS gives the compact row `--control-height-sm`
  (36 px), and the drawer, which uses it, is shown on XS to MD, touch viewports. L2-132 AC1 asks for 44 px
  on primary actions on touch viewports and the design-system page says "every row is at least 44px
  tall". So below LG the compact row keeps `--target-comfortable`; from LG it drops to `--control-height-sm`.
  The HTML renders the rule as a specimen.
- **D-12** *Loading and error.* The outline has none. The course overview and lesson player mocks show
  the page's own skeleton or error message in place of the outline (`course-overview/loading`, `error`),
  and no mock draws a half-loaded outline.
- **D-13** *Long titles.* The design-system CSS wraps the section name (`overflow-wrap: anywhere`) but
  the title column has no rule, so a long unbroken word would widen a row at 320 px. The component adds
  `overflow-wrap: anywhere` to the title column.
- **D-14** *Closed sections render their lessons.* The DOM keeps every row so find-in-page and the
  e2e `lessons` locator see them, and the cost is small (L2-026's maximum is 600 rows).
- **D-15** *Counts.* The mocks write "4 lessons" before the learner starts and "N of M" after it, where
  N is the finished lessons (section 3: 1 of 5 with 3.1 done); the design-system page writes "1 of 4 done".
  The mocks are followed, and the bare "N of M" is completed for screen readers by `countHint`
  ("lessons completed"), so the visible text matches the mocks and the spoken text matches the design
  system's intent that the count be "in words".
- **D-16** *Empty outline and empty section.* An empty `sections` array hides the landmark, so a stray
  "Course outline" navigation is not announced; the page shows its own message. A section with no lessons
  is a content error (L2-026 AC2 refuses to submit it), so it renders its summary only and no empty list.
- **D-17** *The label's separator.* The middle dot with spaces is part of the component, as in every mock;
  it carries no meaning of its own and reads acceptably in every target locale.
