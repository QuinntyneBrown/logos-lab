# Inline message

| Field | Value |
|---|---|
| Selector | `p[llInlineStatus]`, `span[llInlineStatus]` |
| Library path | `frontend/projects/components/src/lib/inline-message/` |
| Status | planned |
| Traces to | L2-007, L2-013, L2-082, L2-084, L2-091, L2-127, L2-129, L2-130, L2-134, L2-141, L2-150 |
| Design system | [`inline-message.html`](../../design-system/components/inline-message.html) |
| Source mocks | [`pages/settings-profile/success`](../../mocks/pages/settings-profile/success.html), [`pages/studio-editor/saving`](../../mocks/pages/studio-editor/saving.html), [`pages/course-builder/default`](../../mocks/pages/course-builder/default.html), [`pages/studio-video-captions/generating`](../../mocks/pages/studio-video-captions/generating.html), [`pages/comments/held`](../../mocks/pages/comments/held.html), [`dialogs/verify-email-prompt/cooldown`](../../mocks/dialogs/verify-email-prompt/cooldown.html), [`dialogs/notification-centre/failed`](../../mocks/dialogs/notification-centre/failed.html), [`pages/offline/retrying`](../../mocks/pages/offline/retrying.html) |
| Rendering | [`inline-message.html`](inline-message.html) |

## Purpose and scope

An inline message is one short line beside the thing it is about: "Saving…", "Saved 10:24 am",
"Profile saved. Members see the change straight away.", "Couldn't save. Your text is still here." It
is the smallest piece of feedback. It also labels a status in a list or a checklist row, such as
"Registered" on an event row or "Cover image with alt text, done" in a readiness list.

Use the [alert](alert.md) for a problem that concerns a whole form or page, the field's own error
text in the [form field](form-field.md) for validation, the [banner](banner.md) for something about
the whole site, and a toast for a passing confirmation that leaves by itself.

Out of scope:

- An action that fixes the problem ("Try again"): the consumer places a `button[llButton]` (text,
  `sm`) beside the message; the message does not contain it.
- When a message changes or goes back to neutral (after about 4 seconds of success): the consumer.
- Debouncing announcements while typing: the consumer changes the text once for "Saving…" and once
  for the result.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/settings-profile/success`, other settings forms | `p`, success, live, check icon, in `.form-actions` | "Profile saved. Members see the change straight away." | success | surface |
| `pages/studio-editor/*`, `pages/article-editor/*`, `pages/course-builder/*`, `pages/collection-builder/*` toolbar | `span`, live | "Saving…" with spinner; "Saved 10:24 am" with check; warning "Not saved – retrying", "Offline – kept on this device" | saving, neutral, warning | surface |
| studio readiness and submit checklists (`dialogs/submit-for-review/*`, editors) | `span`, success or danger, check or circle icon, visually hidden suffix | "Title, summary, topics and level" + ", done"; danger "Summary, 50 to 300 characters" | success, danger, neutral | surface, dialog |
| `pages/course-builder/invalid`, `pages/collection-builder/invalid`, `pages/article-editor/invalid` | `p` or `span`, danger, attention icon, `id` referenced by `aria-describedby` | "Add at least one lesson, or remove this section.", "Can't be nested…", "No alt text" | danger | surface |
| `pages/studio-video-captions/*`, `pages/studio-video-media/*`, `pages/studio-module-package/*` | `span` or `p`, live, spinner | "Generating · about 4 minutes left", "Processing", "Validating: reading imsmanifest.xml…" | saving, warning | surface |
| event rows, course overview, dashboard, home (`.event__side`) | `span`, success or warning | "Registered", "You're number 3 of 3", "2 people on the waitlist" | success, warning | canvas, surface |
| `pages/certificate/*`, `pages/module-page/*` | `span`, danger | "Revoked 13 Oct 2026", "Not passed" | danger | surface |
| `pages/comments/held` | `p`, neutral, clock icon | "Your comment is awaiting review. Only you can see it until a moderator approves it." | neutral | canvas |
| `pages/settings-security/mandatory`, `pages/settings-notifications/locked` | `p`, neutral, lock icon | "Required for your Expert role" | neutral | surface |
| `pages/offline/*` | `p`, live, clock icon | "Offline since 10:21 am ET", "Trying again now. We try every 15 seconds on our own." | neutral | canvas |
| `dialogs/verify-email-prompt/cooldown` | `p`, neutral, clock icon, `id` describing the disabled "Resend in 42 s" | "We sent the last email 18 seconds ago." | neutral | dialog |
| dialog results (`dialogs/*/success`: add-to-calendar, avatar-upload, certificate-share, data-export…) | `p`, success, live | "Photo updated", "Link copied. Paste it anywhere." | success | dialog |
| `dialogs/notification-centre/failed` | `p`, danger, `role="alert"` | "We couldn't load your notifications." | danger | dialog |
| `dialogs/waitlist-offer/expired` | `p`, warning | "The hold ended at 9:00 am ET" | warning | dialog |
| analytics (`pages/studio-analytics/*`, `pages/admin-analytics/*`, `pages/analytics-item/*`) | `p`, neutral, clock icon | "Updated at 9:00 am ET…", "Fewer than 5 learners are in this group…" | neutral | canvas |
| players (`pages/module-player/loading`, `pages/video-page/loading`) | `span`, spinner, not live (the stage is `aria-busy`) | "Opening the module…" | saving | stage |
| message bubbles (`.bubble__meta .inline-status`) | `span`, inherits the meta font and colour | "Sending…", "Not sent" | saving, danger | surface |

## Anatomy

1. **Line** — `p.inline-status` or `span.inline-status` with a tone modifier: an inline flex row,
   gap `--space-2`.
2. **Indicator (optional)** — `svg.icon.icon--sm` (`aria-hidden="true"`) or, while work is under way,
   a small `span.spinner` ([spinner](spinner.md)), coloured with the text.
3. **Message** — the projected text, which may end in a visually hidden suffix (`span.vh`
   ", done") and may contain a link.

Host: the consumer's `p` or `span` receives `.inline-status`, the tone modifier and the role; the
component renders the indicator before the projected text.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `tone` | `'neutral' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | no | `success`, `warning` and `danger` add `.inline-status--{tone}`; neutral adds none. |
| `icon` | `IconName \| null \| undefined` | `undefined` | no | `undefined` uses the tone's icon: success `check`, warning `warning`, danger `attention`, neutral none. `null` renders no icon; a name renders that icon (`clock`, `lock`, `circle`, `offline`…). |
| `busy` | `boolean` | `false` | no | Renders a small spinner in place of the icon. The words stay. |
| `live` | `'polite' \| 'assertive' \| null` | `null` | no | `polite` sets `role="status"`, `assertive` sets `role="alert"` (only for a load failure the person is waiting on); `null` sets no role, for a static label in a row. |

### Outputs

None.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | text, `span.vh` suffix, `a` | The message. A visually hidden suffix completes the meaning for screen readers (", done"). |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Neutral | — | Quiet facts: "Saved 10:24 am", "Required for your Expert role" |
| Saving | — + `busy` | Work under way: "Saving…", "Generating · about 4 minutes left" |
| Success | `.inline-status--success` | It worked: "Profile saved…", "Registered" |
| Warning | `.inline-status--warning` | Pending but safe: "Not saved – retrying" |
| Danger | `.inline-status--danger` | It failed or is missing: "No alt text" |

One size: `--text-body-sm`, icon `.icon--sm` (`--space-4`). Inside `.bubble__meta` it inherits the
meta font and colour.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Neutral | `tone="neutral"` | `--color-fg-muted` | text read in place; announced if `live` |
| Saving | `busy` | small spinner turning, muted text | "Saving…" announced politely once |
| Success | `tone="success"` | `--color-success-fg`, check icon | "Profile saved…" announced politely |
| Warning | `tone="warning"` | `--color-warning-fg`, warning icon | announced politely if live |
| Danger | `tone="danger"` | `--color-danger-fg`, attention icon | announced politely, or assertively for a load failure |
| Reduced motion | `prefers-reduced-motion: reduce` | spinner still | same |

An inline message has no hover or focus state; it is never focusable.

## Markup

```html
<!-- rendered: success, live -->
<p class="inline-status inline-status--success" role="status">
  <svg class="icon icon--sm" aria-hidden="true">…</svg>Profile saved. Members see the change straight away.
</p>

<!-- rendered: saving -->
<span class="inline-status" role="status"><span class="spinner" aria-hidden="true"></span>Saving…</span>

<!-- rendered: checklist row -->
<span class="inline-status inline-status--success"><svg class="icon icon--sm" aria-hidden="true">…</svg>Cover image with alt text<span class="vh">, done</span></span>
```

```html
<!-- consumer -->
<p llInlineStatus tone="success" live="polite" i18n>Profile saved. Members see the change straight away.</p>
<span llInlineStatus live="polite" [busy]="saving()">{{ saving() ? 'Saving…' : 'Saved ' + savedAt() }}</span>
<p llInlineStatus icon="clock" id="resend-wait">We sent the last email 18 seconds ago.</p>
```

## Design

- Inline flex, items centred, gap `--space-2`, `--text-body-sm`.
- Text and indicator share one colour role per tone: `--color-fg-muted`, `--color-success-fg`,
  `--color-warning-fg`, `--color-danger-fg`.
- The spinner is the bare small [spinner](spinner.md), drawn in `currentColor`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Neutral | `--color-fg-muted` | muted foreground | muted foreground |
| Success | `--color-success-fg` | success foreground | success foreground |
| Warning | `--color-warning-fg` | warning foreground | warning foreground |
| Danger | `--color-danger-fg` | danger foreground | danger foreground |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-muted` | `--color-bg-surface` | 4.5:1 | Neutral line on a card |
| `--color-success-fg` | `--color-bg-surface` | 4.5:1 | Success line |
| `--color-warning-fg` | `--color-bg-surface` | 4.5:1 | Warning line |
| `--color-danger-fg` | `--color-bg-surface` | 4.5:1 | Danger line |
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Neutral line on the page |

## Responsive behaviour

- The line wraps onto more lines rather than truncating; the ending is often the important part.
  Beside a button it wraps under the button.
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom everything stays readable.

## Accessibility

### Role and pattern

A plain `p` or `span`. A live message is a polite status (`role="status"`), rendered once and then
changed in place so each change is announced; a failure the person is waiting for may be an alert.
A static label in a list row has no role.

### Keyboard

| Key | Action |
|---|---|
| — | Nothing focusable; Tab moves past it to any action beside it. |

### Focus

Never moves focus.

### Labelling

The text is the message. The icon and spinner are hidden. A row label may complete its meaning with
a visually hidden suffix (", done"). A message that explains a control is tied to it with the
consumer's `id` and the control's `aria-describedby`.

### Announcements

Live messages are announced when their text changes: one "Saving…", then one result.

### Motion

The spinner stops under reduced motion; the words remain.

## Content and internationalisation

- A few words, sentence case, no exclamation marks. Ongoing work ends with the ellipsis character
  ("Saving…"); a full stop only when there are two sentences.
- Failures say what is safe: "Couldn't save. Your text is still here."
- Times in the locale's format ("Saved 10:24 a.m.").
- Translatable content: the message and its hidden suffix.

## Performance

- `OnPush`, signal inputs; no timers in the component.
- The line keeps its place as its text changes, so swapping "Saving…" for "Saved 10:24 am" causes no
  layout shift.

## Acceptance criteria

### Rendering

- **AC-1** Given Miriam saves her profile, when the save succeeds, then "Profile saved. Members see the change straight away." appears beside "Save changes" in the success colour with a check icon. (L2-013)
- **AC-2** Given the article editor saving a change, when the save is under way, then the toolbar line reads "Saving…" with a small spinner, and when it finishes it reads "Saved 10:24 am". (L2-084)
- **AC-3** Given the submit-for-review checklist, when "Cover image with alt text" is complete, then its row shows the success line with a check icon and its accessible text ends ", done". (L2-082)
- **AC-4** Given an invalid course section, when the builder renders, then "Add at least one lesson, or remove this section." is a danger line with the attention icon and the section's control references it with `aria-describedby`. (L2-082)
- **AC-5** Given a neutral line with `icon="clock"`, when it renders, then the clock icon precedes the text in the muted colour; with `icon` set to `null` no icon renders. (L2-127)
- **AC-6** Given the verify prompt in cooldown, when it renders, then "We sent the last email 18 seconds ago." describes the disabled "Resend in 42 s" button. (L2-007)

### States

- **AC-7** Given a line with `busy`, when it renders, then a small spinner replaces the icon and the words stay. (L2-084)
- **AC-8** Given the offline page retrying, when it renders, then "Trying again now. We try every 15 seconds on our own." shows with the clock icon. (L2-141)

### Screen readers

- **AC-9** Given a live line, when its text changes from "Saving…" to "Saved 10:24 am", then each change is announced politely and the indicator is not read. (L2-127)
- **AC-10** Given the notification centre fails to load, when the danger line appears with `live="assertive"`, then "We couldn't load your notifications." is announced at once. (L2-091)
- **AC-11** Given a static "Registered" label on an event row, when it is inspected, then it has no live role and is read in place. (L2-127)

### Theming

- **AC-12** Given the dark theme, when each tone renders, then text and icon use the tone's dark value and meet 4.5:1 against the surface. (L2-134)

### Responsive

- **AC-13** Given a 320 px viewport, when "Profile saved. Members see the change straight away." renders beside "Save changes", then it wraps under the button and nothing scrolls horizontally. (L2-130)

### Content

- **AC-14** Given text 30 % longer, when a line renders at 320 px, then it wraps and nothing is truncated. (L2-150)

### Motion

- **AC-15** Given reduced motion, when a busy line renders, then its spinner does not turn. (L2-129)

## Implementation notes

- Folder `frontend/projects/components/src/lib/inline-message/`: `inline-status.ts` (`InlineStatus`,
  attribute component on `p` and `span`), `inline-status-tone.ts`, `inline-status-live.ts`,
  `inline-status.html` (indicator then `<ng-content />`), `inline-status.scss` from the
  `inline-message` block.
- The spinner is `span[llSpinner]`; the icon is `svg[llIcon]` with `size="sm"`.
- `.bubble__meta .inline-status` stays in the message thread's own styles.

## Decisions

- **D-1** *Element or attribute selector?* Attribute on `p` and `span`: the mocks use a paragraph
  where the line stands alone and a span inside rows and toolbars, and the host must stay that element
  for layout and for `aria-describedby` targets with consumer ids.
- **D-2** *Does the tone pick the role?* No. Most of the 400 usages are static labels in rows that must
  not be announced; `live` is chosen by use. `assertive` exists only for a load failure the person is
  waiting on (`dialogs/notification-centre/failed`); the design system forbids it for save status.
- **D-3** *Default icon per tone?* Success, warning and danger get their tone's icon because every mock
  shows one; neutral gets none by default because neutral lines carry many different icons (clock,
  lock, circle, offline, book) chosen by meaning.
- **D-4** *Does the message hold its action?* No. The design system's "with action" example places the
  text button beside the line, so the button keeps its own focus and target size.
