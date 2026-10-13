# Description list

| Field | Value |
|---|---|
| Selector | `dl[llDescriptionList]` |
| Library path | `frontend/projects/components/src/lib/description-list/` |
| Status | planned |
| Traces to | L2-025, L2-031, L2-033, L2-038, L2-048, L2-077, L2-086, L2-095, L2-120, L2-126, L2-127, L2-129, L2-130, L2-134, L2-147, L2-148, L2-150 |
| Design system | [`description-list.html`](../../design-system/components/description-list.html) |
| Source mocks | [`pages/collection-page/default`](../../mocks/pages/collection-page/default.html), [`pages/collection-page/empty`](../../mocks/pages/collection-page/empty.html), [`pages/collection-page/long`](../../mocks/pages/collection-page/long.html), [`pages/course-overview/default`](../../mocks/pages/course-overview/default.html), [`pages/course-overview/archived`](../../mocks/pages/course-overview/archived.html), [`pages/certificate/default`](../../mocks/pages/certificate/default.html), [`pages/module-page/default`](../../mocks/pages/module-page/default.html), [`pages/module-page/in-progress`](../../mocks/pages/module-page/in-progress.html), [`pages/appeal-review/default`](../../mocks/pages/appeal-review/default.html), [`pages/account-notice/decided`](../../mocks/pages/account-notice/decided.html), [`pages/account-deleted/default`](../../mocks/pages/account-deleted/default.html), [`pages/admin-user/default`](../../mocks/pages/admin-user/default.html), [`pages/review-item/default`](../../mocks/pages/review-item/default.html), [`pages/report-detail/default`](../../mocks/pages/report-detail/default.html), [`pages/studio-editor/default`](../../mocks/pages/studio-editor/default.html), [`pages/studio-module-package/default`](../../mocks/pages/studio-module-package/default.html), [`pages/settings-account/default`](../../mocks/pages/settings-account/default.html), [`pages/settings-security/default`](../../mocks/pages/settings-security/default.html), [`pages/event-editor/default`](../../mocks/pages/event-editor/default.html), [`dialogs/restore-version/default`](../../mocks/dialogs/restore-version/default.html), [`dialogs/revoke-certificate/default`](../../mocks/dialogs/revoke-certificate/default.html) |
| Rendering | [`description-list.html`](description-list.html) |

## Purpose and scope

A description list is the product's "key facts" block: small uppercase terms, each with its value
beside or under it, for the facts about one thing. The collection page's "Curated by" card says
"Items 8", "Length About 10 hours", "Updated 2 Oct 2026", "Followers 412". The course overview's "About
this course", a moderator's "The original action", an administrator's "Account" and an author's
"Details" are the same block. It is a quiet, read-only way to keep a label with its value when the
layout reflows. It comes in three layouts: stacked (term above value), inline (term and value side by
side with a hairline under each pair) and columns (pairs flowing into as many columns as fit).

Use a [table](../../design-system/components/table.html) to compare the same facts across several
items, a [form field](form-field.md) when the value can be edited in place, a [list](list.md) for items
that are not name and value pairs, and [chips](chip.md) for topics that open a topic page. A person's
headline facts ("1,284 followers", "7 published items") in a profile header are
[profile header](profile-header.md) meta, not a description list.

Out of scope:

- The card, section or dialog that frames the list and its title ([card](card.md), [dialog](dialog.md)):
  the list is only the `dl`.
- Which facts a screen shows, their order, and the formatting of their values ("Wed 2 Sep 2026",
  "About 5 h 40 min", "1,284 enrolled"): the page formats every value for the locale (L2-148).
- The spacing around the list: the page or the card's layout places it (see D-6).
- A link, badge, status line or skeleton inside a value: the [badge](badge.md),
  [inline message](inline-message.md) and [skeleton](skeleton.md) components own them; the list only
  lays them out.
- The three other `dl` blocks that share the term and value type but not the layout:
  `.certificate__facts` (the certificate sheet), `.project__facts` (the kit's project card) and
  `.card__facts` (the kit's person card). No mock uses the last two, and the first belongs to the
  certificate component (D-9).
- Tables of many rows with column headers (`dl` is for one thing's facts).

## Usage

The inventory covers 146 lists in 127 mock files (504 term and value pairs). Every
list is a `dl` of `div` groups, each holding one `dt` and one `dd`; no mock puts an attribute on a `dl`,
`div`, `dt` or `dd` except the page's own `style` for outer spacing on 12 lists (D-6).

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/collection-page/{default,progress,following,partial,long}` "Curated by" | inline, four groups | "Items 8", "Length About 10 hours", "Updated 2 Oct 2026", "Followers 412"; long: "Items 12", "Length About 3 hours", "Followers 1,906" | default | aside card on the canvas |
| `pages/collection-page/empty` "Curated by" | inline, four groups | "Items 0", "Length None yet", "Updated 2 Oct 2026", "Followers 412" | zero value as plain text | aside card |
| `pages/collection-builder/*` details | inline | "Items", "Author", "Address" | default, long | aside card |
| `pages/course-overview/{default,long,enrolled,completed,cohort,visitor,submitting}` "About this course" | inline, five groups | "Lessons 24 in 6 sections", "Length About 5 h 40 min", "Level Intermediate", "Order In sequence", "Learners 1,284 enrolled" | default | aside card |
| `pages/course-overview/archived` | inline, five groups | "Status" value is a `badge` "Archived" then the text "since Fri 9 Oct 2026" | badge and text | aside card |
| `pages/course-builder/*` | inline | "Sections", "Lessons", "Duration", "Author", "Address" | default, long | aside card |
| `pages/module-page/*` "About this module" | inline | "Length About 20 min", "Level Introductory", "Scoring Scored · pass mark 80%" | default | aside card |
| `pages/module-page/*` "Your progress" | inline | "Status" as `badge` "Not started", `inline-status` "Completed" / "In progress" / "Not passed"; "Best score" as `span.muted` "No attempts yet" or a score; "Last attempt", "Last opened", "Left" | default, in progress, completed, failed | aside card |
| `pages/certificate/default` "Verification" | inline, three groups | "Code LL-7K4Q-29XM", "Issued Wed 2 Sep 2026", "Public page logoslab.ca/certificates/LL-7K4Q-29XM" | default, revoked | aside card |
| `pages/appeal-review/*` "The original action" | inline, six groups | "Action Hid the post", "Taken by Isaac Moreau", "When Fri 9 Oct 2026, 4:12 pm ET", a one-sentence "Reason", "Guideline 1. Disagree with ideas, not people", "Reports 1, R-1028" | default, decided | aside card |
| `pages/appeal-review/*` "This appeal" | inline | "Filed Mon 12 Oct 2026, 7:15 pm ET, 3 days after the action", "Assigned to You", "Prior actions None" | default, decided | aside card |
| `pages/account-notice/*` | inline, two to four groups | "Action", "Reason", "Guideline" (a link to the community guidelines), "Your comment", "Moderator's note", "Suspension ends Tue 20 Oct 2026. Your account returns to Active on its own, and we'll email you." | default, appeal, appealed, decided, expired, submitting | auth card |
| `pages/account-deleted/default` | inline, five groups, no heading of its own | terms that are dates or steps: "Now", "Thu 12 Nov 2026", "Comments", "Messages", "Certificates"; values are sentences | default | auth card |
| `pages/admin-user/*` "Account" | columns, seven groups | "Roles Learner", "State Active", "Email Verified on Mon 2 Mar 2026", "Two-step verification Off · optional for Learners", "Created Mon 2 Mar 2026, 2:14 pm ET", "Last sign-in Today, 10:02 am ET", "Active sessions 2"; "Roles Learner, Editor, Administrator"; "State Suspended until Tue 20 Oct 2026"; "Email Not verified" | default, deactivated, suspended, unverified, last administrator | card in the main column |
| `pages/review-item/*` "Details" | stacked, four to six groups | "Title Bias in the Training Data v2", a two-line "Summary", "Topics AI ethics, Justice and society, Data and privacy", "Level", "Scoring", "Cover alt text" | default, commenting, resubmitted, self-authored | aside card |
| `pages/review-item/*` "Package" | inline | "File bias-in-the-training-data-v2.zip, SCORM 2004"; "Checks" as a success `inline-status` "Valid package, no threats found" | default, commenting | canvas |
| `pages/report-detail/*` | inline, three to five groups | "Member since 2 Aug 2026", "Account" as success or danger `badge` ("Active", "Suspended until 20 Oct"), "Earlier reports", "Reference R-1044", "First reported", "Auto-hidden", "Overdue since", "Status Unclaimed"; the action card repeats "Action", "Reason", "Guideline", "The comment" | default, claimed, resolved, read-only, message context | aside card |
| `pages/studio-editor/*`, `pages/studio-module-package/*` "Details" | inline, four to seven groups | "Type Article", "Author Dr. Abena Mensah", "Created Fri 9 Oct 2026", "Address /articles/can-software-bear-the-image-of-god"; module: "SCORM 2004 4th edition", "Launch file index_lms.html", "Files 412 · 196 MB unzipped" | the editor's fourteen workflow states, package upload states | aside card |
| `pages/studio-profile/*` "Details" | inline | "Last saved", "Followers 1,284", "Address /experts/abena-mensah"; the loading mock writes "Loading…" as the value | default, loading, restored | aside card |
| `pages/article-editor/*`, `pages/event-editor/*`, `pages/video-page/*`, `pages/data-export-download/default`, `pages/policy-editor/success` | inline | "Type", "Author", "Language", "Reading time"; "Registered 312 of 500", "Waitlist None", "Reminders 24 hours and 1 hour before"; "Length", "Published", "Captions"; "Size", "Requested", "Ready", "Link expires"; "Policy", "Effective", "Material change" | default, cancelled, past, success | aside card, page |
| `pages/settings-account/*` | inline, one group | "Current email" value is a `span.cluster` holding the address and a `badge` "Verified" (success) or "Emails bouncing" (warning) | default, bounced, pending email | form card |
| `pages/settings-security/*`, `pages/settings-privacy/*` | inline | "Password Last changed 2 Mar 2026 · Change it" (text then a link), "Where you're signed in 3 sessions · Review them", "Sign-in alerts", "Authenticator app", "Recovery codes", "Your consent", "Your choice", "Chosen" | default, enabled, mandatory, submitting, success | form card, form section |
| `dialogs/{approve,edit-roles,restore-version,revoke-certificate,topic-edit,user-action}/*` | inline, two to three groups; restore-version stacked | "Submitted Wed 7 Oct 2026", "Comments 3 of 3 resolved"; "Course", "Issued to"; "Old address", "New address"; "Until", "Recorded"; "Restoring Version 1, published Tue 29 Sep 2026 by …", "Live now" | default, busy, failed, invalid, success | dialog surface |
| design-system page `description-list` | stacked, inline, columns; link values; `dd.is-empty` "Not added yet"; loading (skeleton) in all three | "Owner Amara Osei", "Email grace.liu@example.com", "Available Not added yet" | default, loading, missing value | canvas |

Every row is buildable with the API below: the variant chooses the layout, the page writes the groups,
and the value is whatever markup the page needs inside the `dd`. No row needs an input beyond `variant`;
`label` and `busy` come from the design-system page and the stand-alone and loading cases (D-1, D-2, D-3).

## Anatomy

1. **List** — `dl.facts`. A grid with a `--space-4` gap between groups. The host element is the `dl`
   itself.
2. **Group** — `div`, a direct child of the list. A grid holding one term and one value, `--space-1`
   apart. The group keeps its two parts together when the layout reflows, and HTML allows it inside a
   `dl`.
3. **Term** — `dt`. The label, in the overline style: small, uppercase by CSS only, widely tracked,
   `--color-fg-subtle`. It is the name of the fact and is never hidden.
4. **Value** — `dd`. The fact in body text, `--color-fg-default`, wrapping anywhere a long word needs it.
   It holds plain text, a link, a `time`, a badge, a status line or the page's own inline markup.
5. **Empty value (optional)** — `dd.is-empty`. A value nobody has filled in, written out ("Not added yet")
   in `--color-fg-subtle`.
6. **Loading value (optional)** — `span.skeleton.skeleton--text` inside the `dd`, with the list marked
   `aria-busy="true"`. The terms stay.
7. **Rule (inline only)** — a hairline under each group, `--border-width-hairline` in
   `--color-border-default`, with `--space-2` padding above and below the group.

Host: `dl[llDescriptionList]` is the consumer's own `dl`. The component adds the class `facts`, the layout
modifier and the two accessibility attributes; its template is only `<ng-content />`. The groups, terms
and values are the page's own projected `div`, `dt` and `dd`, which the component's styles reach with
`:host ::ng-deep` as the other library components reach projected content (D-4).

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `variant` | `'stacked' \| 'inline' \| 'columns'` | `'stacked'` | no | Selects the layout. `stacked` adds no modifier class; `inline` adds `.facts--inline`; `columns` adds `.facts--columns`. The class `facts` is always present. |
| `label` | `string \| null` | `null` | no | A non-empty string sets `aria-label` on the `dl`. `null` sets nothing. Use it only for a list that no visible heading names (D-1). A native `aria-labelledby` written by the consumer is never overwritten. |
| `busy` | `boolean` | `false` | no | `true` sets `aria-busy="true"`; `false` removes the attribute rather than writing `"false"`. The page puts skeleton lines in the values while it is `true` (D-3). |

- Inputs are signal inputs; `busy` accepts a bare attribute (`booleanAttribute`).
- The component has no data input and no `items` array (D-2). The page writes the `div`, `dt` and `dd`
  markup, which is also how it adds a link, a badge, a status line or a `time`.
- There are no separate `DescriptionTerm` or `DescriptionDetail` components (D-4). Native `dt` and `dd`
  carry the semantics and every style is reached from the list.
- The consumer's own `class`, `id`, `style` and ARIA attributes stay on the host. The component never
  sets a `role` (D-5).
- Translation: every `dt`, every value and `label` arrive from the page already translated and formatted;
  the component holds no copy (L2-147).

### Outputs

None. The list is read-only; a link or button inside a value emits its own events.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | `div` groups, each holding exactly one `dt` and one `dd`, in the order they should read | A group with a term but no value, or a value but no term, is a defect: write `dd.is-empty` with "Not added yet" for a missing value. Nothing other than `div` groups is a child of the list. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Stacked | `.facts` | Terms above values in one column: asides and narrow cards, and fields the reader reads as a form ("Details" of a review item, "Restoring" in a dialog). The default. |
| Inline | `.facts--inline` | Term and value side by side, one third to two thirds, with a hairline under each pair: the product's usual summary of a course, a collection, a certificate, an appeal, a settings section. |
| Columns | `.facts--columns` | Pairs flowing into as many columns as fit, for a summary across the top of a wide card: the administrator's "Account". |

There is one size: terms use `--text-overline` and values `--text-body`. A card's smaller value type
belongs to the person card (D-9), not to this component. The width comes from the container.

## States

The list is read-only, so it has no hover, focus or active state of its own; a link inside a value
behaves like any link.

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Terms in the overline style and `--color-fg-subtle`, values in `--color-fg-default`; `--space-4` between stacked groups | Native list of terms and details |
| Value with a link | `a` in the `dd` | The link's own look, focus ring and hover from the link style | Reached in tab order, announced as a link |
| Value with a badge or status | `span.badge`, `span.inline-status` in the `dd` | The component's own look, on the value's baseline | The badge text is read as part of the value; an icon is `aria-hidden` |
| Empty value | `dd.is-empty` | `--color-fg-subtle` instead of `--color-fg-default` | The text ("Not added yet") is read; nothing is blank |
| Loading | `aria-busy="true"` on the list, `span.skeleton.skeleton--text` in each `dd` | Terms stay; each value is a shimmering line, one of them `.is-short` | The terms are read; the skeleton is `aria-hidden`; the list is busy |
| Narrow (inline) | viewport below 40rem | Each group becomes term over value, keeping its hairline | The same reading order |
| Reduced motion | `prefers-reduced-motion: reduce` | The skeleton stops shimmering | — |
| More contrast | `prefers-contrast: more` | `--color-fg-subtle` and `--color-border-default` resolve to the stronger tokens | — |

## Markup

```html
<!-- rendered: stacked -->
<dl class="facts">
  <div><dt>Title</dt><dd>Bias in the Training Data v2</dd></div>
  <div><dt>Level</dt><dd>Introductory</dd></div>
  <div><dt>Scoring</dt><dd>Scored, pass mark 80%</dd></div>
</dl>
```

```html
<!-- rendered: inline (collection page, "Curated by") -->
<dl class="facts facts--inline">
  <div><dt>Items</dt><dd>8</dd></div>
  <div><dt>Length</dt><dd>About 10 hours</dd></div>
  <div><dt>Updated</dt><dd>2 Oct 2026</dd></div>
  <div><dt>Followers</dt><dd>412</dd></div>
</dl>
```

```html
<!-- rendered: columns (admin user, "Account") -->
<dl class="facts facts--columns">
  <div><dt>Roles</dt><dd>Learner</dd></div>
  <div><dt>State</dt><dd>Active</dd></div>
  <div><dt>Email</dt><dd>Verified on Mon 2 Mar 2026</dd></div>
  <div><dt>Two-step verification</dt><dd>Off · optional for Learners</dd></div>
</dl>
```

```html
<!-- rendered: the kinds of value -->
<dl class="facts facts--inline">
  <div><dt>Guideline</dt><dd><a href="/guidelines">2. No harassment or hate</a></dd></div>
  <div><dt>Password</dt><dd>Last changed 2 Mar 2026 · <a href="/settings/account">Change it</a></dd></div>
  <div><dt>Issued</dt><dd><time datetime="2026-09-02">Wed 2 Sep 2026</time></dd></div>
  <div><dt>Status</dt><dd><span class="badge">Archived</span> since Fri 9 Oct 2026</dd></div>
  <div><dt>Current email</dt><dd><span class="cluster">miriam.clarke@example.ca <span class="badge badge--success">Verified</span></span></dd></div>
  <div><dt>Checks</dt><dd><span class="inline-status inline-status--success"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Valid package, no threats found</span></dd></div>
  <div><dt>Best score</dt><dd><span class="muted">No attempts yet</span></dd></div>
  <div><dt>Available</dt><dd class="is-empty">Not added yet</dd></div>
</dl>
```

```html
<!-- rendered: loading -->
<dl class="facts facts--inline" aria-busy="true">
  <div><dt>Items</dt><dd><span class="skeleton skeleton--text"></span></dd></div>
  <div><dt>Length</dt><dd><span class="skeleton skeleton--text is-short"></span></dd></div>
  <div><dt>Updated</dt><dd><span class="skeleton skeleton--text is-short"></span></dd></div>
</dl>
```

```html
<!-- rendered: stand-alone list with a name -->
<dl class="facts facts--inline" aria-label="What happens to your account">
  <div><dt>Now</dt><dd>Your account is deactivated and nobody can sign in to it.</dd></div>
  <div><dt>Thu 12 Nov 2026</dt><dd>We delete your personal data. Backups age out within 35 days after that.</dd></div>
</dl>
```

```html
<!-- consumer -->
<section class="aside-card" aria-labelledby="curator-title">
  <h2 class="aside-card__title" id="curator-title" i18n>Curated by</h2>
  <dl llDescriptionList variant="inline" [busy]="loading()">
    <div><dt i18n="@@collection.fact.items">Items</dt><dd>{{ itemTotal() }}</dd></div>
    <div><dt i18n="@@collection.fact.length">Length</dt><dd>{{ length() }}</dd></div>
    <div><dt i18n="@@collection.fact.updated">Updated</dt><dd>{{ updated() | date: 'd MMM y' }}</dd></div>
    <div>
      <dt i18n="@@collection.fact.followers">Followers</dt>
      @if (loading()) { <dd><span llSkeleton shape="text-short"></span></dd> } @else { <dd>{{ followers() | number }}</dd> }
    </div>
  </dl>
</section>
<dl llDescriptionList variant="columns">
  <div><dt i18n>Roles</dt><dd>{{ roles() }}</dd></div>
  <div><dt i18n>Email</dt><dd i18n>Verified on {{ verifiedOn() | date: 'EEE d MMM y' }}</dd></div>
</dl>
<dl llDescriptionList variant="inline" label="What happens to your account" i18n-label>…</dl>
```

The e2e page objects find a list by `dl.facts`, a group by `dl.facts > div`, and its term and value by
`dt` and `dd`; the modifier classes, `dd.is-empty` and `aria-busy` are part of the contract.

## Design

- Layout: the list is `display: grid` with `--space-4` between groups (stacked); each group is a grid
  with `--space-1` between term and value.
- Terms: `--text-overline` (semibold, small), `--letter-spacing-wide`, `text-transform: uppercase`. The
  source copy stays sentence case ("Last sign-in", "Two-step verification").
- Values: `--text-body`, `overflow-wrap: anywhere`, so a long address or reason wraps instead of widening
  its card.
- Terms also wrap anywhere (D-7): a term that cannot fit its column breaks rather than running into
  the value.
- Inline: each group is two columns, `minmax(0, 1fr)` for the term and `minmax(0, 2fr)` for the value,
  baseline-aligned, with `--space-2` padding above and below and a `--border-width-hairline` rule in
  `--color-border-default` under it. Below 40rem (`--layout-breakpoint-sm`) the group is one column
  with the term over the value, the same rule and padding kept (D-7).
- Columns: `repeat(auto-fit, minmax(min(100%, var(--space-40)), 1fr))` with `--space-6` between pairs, so
  one column fits at 320 px and four fit from 64rem in a wide card.
- Skeleton in a value: `.facts .skeleton--text` has no top margin, so the line sits where the text
  would.
- No elevation, shape, motion or layering of its own.

Component tokens: none declared. The list reads semantic tokens directly (`--color-fg-subtle`,
`--color-fg-default`, `--color-border-default`), so a surface re-skins it by the tokens it sets, and the
list needs no dark-mode rules.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Term | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Value | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Empty value | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Hairline (inline) | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Link in a value | `--color-fg-link` | `--palette-accent-700` | `--palette-accent-300` |
| Surface: card | `--color-bg-surface` | `--palette-birch-50` | `--palette-night-900` |
| Surface: page | `--color-bg-canvas` | `--palette-oat-100` | `--palette-night-950` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-subtle` | `--color-bg-surface` | 4.5:1 | Term and empty value in a card (12 px text) |
| `--color-fg-subtle` | `--color-bg-canvas` | 4.5:1 | Term on the page ("Package" in the review) |
| `--color-fg-subtle` | `--color-bg-surface-raised` | 4.5:1 | Term inside a dialog |
| `--color-fg-default` | `--color-bg-surface` | 4.5:1 | Value in a card |
| `--color-fg-default` | `--color-bg-surface-raised` | 4.5:1 | Value in a dialog |
| `--color-fg-link` | `--color-bg-surface` | 4.5:1 | Link in a value |

The hairline is decorative; the term and value identify each pair, so it does not need 3:1 (as
[card](card.md) D-10). Under `prefers-contrast: more` the tokens resolve to stronger values and the list
follows without a rule of its own. In forced colours the hairline resolves to `CanvasText`.

## Responsive behaviour

- Stacked: the same at every width.
- Inline: from 40rem the term takes one third and the value two thirds, and a long value wraps under
  itself. Below 40rem each group stacks, the term over its value, with the hairline kept (D-7). At
  320 px and 360 px the one-third column is 75 to 89 px wide, narrower than "Followers", "Registered" or
  "Moderator's note" in the overline style, so the side-by-side layout would draw the term over its
  value.
- Columns: as many columns of at least `--space-40` (10rem) as the container holds: one at 320 px, up to
  four in a wide card.
- A long value or address breaks at any character rather than widening the card (L2-130).
- At 320 px nothing scrolls horizontally or clips; at 400 % zoom (a 320 px viewport) the list is the
  stacked layout and everything stays available. The list has no target of its own; a link in a value
  keeps the link's own target and line height.

## Accessibility

### Role and pattern

A native `dl` whose children are `div` groups, each with one `dt` and one `dd`: the grouping HTML allows,
which keeps a pair together in a grid layout. It is the HTML description list pattern, with no ARIA role
and no role override (D-5). Assistive technology announces the list and its terms.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Moves to and from each link or control inside a value, in visual order. The list itself, a term and a plain value are not focusable. |
| <kbd>Enter</kbd> | Follows the focused link. |

### Focus

The list never takes focus and never moves it. A link in a value shows the shared
`--color-focus-ring` outline, `--focus-ring-width` thick and offset by `--focus-ring-offset`; the
group's padding and the list's gap leave room, so the ring is not clipped by the hairline or the
neighbouring group.

### Labelling

- A term is real text, uppercase only through CSS, so it is read as written ("Two-step verification").
  It is never `aria-hidden`, `display: none` or visually hidden.
- A list is named by the heading of the card or section around it (`aria-labelledby` on that section),
  or by `label` when no heading names it (D-1). One of the two is how a stand-alone list such as the
  list under the "Your account is deleted" title is named.
- A missing value is written out ("Not added yet"); nothing is announced as blank, and a dash is never
  used.
- A badge or status line inside a value keeps its own text; its icon is `aria-hidden="true"`.
- A value that carries a date may use `time` with a `datetime`; the visible text stays the page's
  formatted string.

### Announcements

The list announces nothing itself. A busy list is announced as busy; the page owns the polite status
that says the facts have loaded, and a skeleton is `aria-hidden`.

### Motion

The only motion is the skeleton's shimmer. Under `prefers-reduced-motion: reduce` it stops.

## Content and internationalisation

- A term is one or two words in sentence case before the CSS uppercases it: "Owner", "Local time",
  "Two-step verification". A term may also be a date when the facts are a timeline ("Thu 12 Nov 2026"
  on the account-deleted page); it is the page's formatted text.
- A value is a short fact, not a sentence, where it can be: "4 people", "Wed 2 Sep 2026", "1,284
  enrolled". Where the screen needs a sentence (the moderator's reason, "Suspension ends Tue 20 Oct 2026.
  Your account returns to Active on its own, and we'll email you."), the value wraps.
- The same kind of value uses the same format everywhere: "Wed 2 Sep 2026" for an issue date, "Mon 12
  Oct 2026, 7:15 pm ET" for a time, "1,906" for a count.
- A missing value says "Not added yet"; a zero count or a state that is simply "none" is a value:
  "Waitlist None", "Prior actions None", "Length None yet".
- Dates, times, numbers and durations are formatted by the page with the locale's formatting (L2-148);
  the list renders the string it is given and never builds one.
- Counts and plurals use the catalogue's ICU messages, never concatenation of a number and a word
  (L2-147 AC3): "24 in 6 sections" is one message.
- Translatable inputs: `label`. Translated by the page: every `dt`, every value, every value's link text
  and badge text. Data values: names ("Dr. Abena Mensah", "Isaac Moreau"), codes ("LL-7K4Q-29XM",
  "R-1044"), addresses ("/modules/image-and-likeness").
- French runs about 30 % longer: a term wraps within its column or stacks, and a value wraps under
  itself; nothing is clipped (L2-150).

## Performance

- Change detection: `OnPush`, signal inputs. The class list, `aria-label` and `aria-busy` are host
  bindings computed from the inputs; the list has no template logic, so a page updating one value
  re-renders only that value.
- Perf-test scenario: this repository has no perf-test project (D-8), so the list is measured through the
  page budgets of L2-120 and L2-123. The measured scenario is the collection page's "Curated by" card for
  Rev. Dr. Thomas Hale: the inline list with "Items 8", "Length About 10 hours", "Updated 2 Oct 2026",
  "Followers 412".
- Composite scenarios: the collection page and the course overview page; both put the list in an aside
  card.
- Layout stability: terms are always rendered, and a loading value is a skeleton line of the text's
  height, so the card keeps its height when the values arrive; a value never changes its group's
  height by more than the wrap of its own text.
- Weight: no dependency beyond `@angular/core`. The list imports none of the badge, status or skeleton
  components; the page composes them.

## Acceptance criteria

### Rendering

- **AC-1** Given the collection "AI in the Pulpit" curated by Rev. Dr. Thomas Hale, when the "Curated by" card renders, then the list is `dl.facts.facts--inline` of four `div` groups, each with one `dt` and one `dd`, in the order "Items 8", "Length About 10 hours", "Updated 2 Oct 2026", "Followers 412". (L2-048)
- **AC-2** Given an empty collection, when the "Curated by" card renders, then the groups still show "Items 0" and "Length None yet", and the other two facts stay, so the card has the same four terms. (L2-048)
- **AC-3** Given the course "Christian Ethics for AI Builders", when "About this course" renders, then the inline list shows "Lessons 24 in 6 sections", "Length About 5 h 40 min", "Level Intermediate", "Order In sequence" and "Learners 1,284 enrolled". (L2-025)
- **AC-4** Given an archived course, when "About this course" renders, then the "Status" value is a `badge` "Archived" followed by the text "since Fri 9 Oct 2026", on one baseline. (L2-025)
- **AC-5** Given the editor reviewing "Bias in the Training Data v2", when "Details" renders as a stacked `dl.facts`, then each term sits above its value with `--space-1` between them and `--space-4` between groups, and the two-line "Summary" wraps inside its value. (L2-077)
- **AC-6** Given an administrator opening Miriam Clarke's account, when "Account" renders as `dl.facts.facts--columns`, then the seven groups from "Roles Learner" to "Active sessions 2" flow into columns of at least `--space-40`, with `--space-6` between pairs. (L2-095)
- **AC-7** Given a learner who has not started the module "Bias in the Training Data", when "Your progress" renders, then "Status" shows the `badge` "Not started" and "Best score" shows "No attempts yet" in `span.muted`; and given Miriam Clarke has completed "Prompting with Wisdom", then its "Status" shows a success `inline-status` "Completed" whose check icon is hidden from assistive technology. (L2-038)
- **AC-8** Given the certificate issued to Miriam Clarke for "Christian Ethics for AI Builders", when the "Verification" card renders, then it lists "Code LL-7K4Q-29XM", "Issued Wed 2 Sep 2026" and "Public page logoslab.ca/certificates/LL-7K4Q-29XM". (L2-031)
- **AC-9** Given the package "bias-in-the-training-data-v2.zip", when the review's "Package" list renders, then "File" reads "bias-in-the-training-data-v2.zip, SCORM 2004" and "Checks" shows a success `inline-status` "Valid package, no threats found". (L2-033)
- **AC-10** Given the report R-1044 open for more than 24 hours, when "This report" renders, then the list shows "Reference R-1044", "First reported Mon 12 Oct 2026, 8:15 am ET" and "Overdue since Tue 13 Oct 2026, 8:15 am ET" beside "Status Unclaimed". (L2-086)

### States

- **AC-11** Given the collection page while the collection loads, when the "Curated by" list renders with `busy`, then it has `aria-busy="true"`, the four terms "Items", "Length", "Updated" and "Followers" are visible, and each value is a `span.skeleton.skeleton--text` hidden from assistive technology; and given `busy` is `false`, then no `aria-busy` attribute is present. (L2-120)
- **AC-12** Given an expert whose "Available" fact has no value, when the list renders it as `dd.is-empty` "Not added yet", then the value is drawn in `--color-fg-subtle`, the text is read by a screen reader, and no dash or blank is shown. (L2-129)
- **AC-13** Given the loaded collection after loading, when the skeleton lines are replaced by "8", "About 10 hours", "2 Oct 2026" and "412", then the list's height changes by no more than the wrap of its own text and the page's cumulative layout shift stays at or below 0.1. (L2-120)

### Keyboard and focus

- **AC-14** Given the suspension notice with "Guideline 2. No harassment or hate" as a link, when the user tabs through the page, then focus reaches the link in visual order, a `--color-focus-ring` outline at least 2 CSS px thick is visible and not clipped by the hairline, and <kbd>Enter</kbd> follows it; and the terms and plain values take no focus. (L2-126)

### Screen readers

- **AC-15** Given any list, when it is inspected, then the host is a `dl` with no `role` attribute, each `div` child holds exactly one `dt` and one `dd`, and no `dt` is `aria-hidden`, `display: none` or visually hidden. (L2-127)
- **AC-16** Given the term "Two-step verification" drawn uppercase, when a screen reader reads it, then it reads "Two-step verification" from the sentence-case source text, followed by "Off · optional for Learners". (L2-127)
- **AC-17** Given the account-deleted page for Miriam Clarke, when its list has no heading of its own and is given `label` "What happens to your account", then the `dl` has `aria-label` with that translated string; and given `label` is `null`, then no `aria-label` is written. (L2-147)

### Theming

- **AC-18** Given the "Curated by" card in the dark theme, when it renders, then the terms use `--color-fg-subtle`, the values `--color-fg-default` and the hairlines `--color-border-default`, each resolving to its dark value on `--color-bg-surface`, and no part keeps a light-only colour. (L2-134)
- **AC-19** Given both themes, when contrast is measured, then a term and an empty value meet 4.5:1 on a card, on the page and in a dialog, a value meets 4.5:1 on a card and in a dialog, and a link in a value meets 4.5:1 on a card. (L2-129)

### Responsive

- **AC-20** Given the "Curated by" list at 320 px, when it renders, then each group is one column with the term over its value, the hairline stays under each group, "Followers" does not overlap "412", and the page does not scroll horizontally. (L2-130)
- **AC-21** Given the "Curated by" list at 1440 px, when it renders, then each term takes one third and each value two thirds of the group, the term and value share a baseline, and a hairline sits under every group. (L2-130)
- **AC-22** Given the studio editor's "Details" with the address "/articles/can-software-bear-the-image-of-god" at 320 px, when it renders, then the address wraps inside its value and the card does not widen. (L2-130)
- **AC-23** Given the admin "Account" list at 320 px and at 1280 px, when it renders, then it shows one column at 320 px and more than one at 1280 px, and nothing is clipped at either. (L2-130)
- **AC-24** Given the pseudo-locale with strings 30 % longer and the term "Followers" lengthened to "Fóllówérsss", when the "Curated by" list renders at 1440 px and at 320 px, then the term wraps or stacks and never overlaps its value, and nothing is clipped. (L2-150)
- **AC-25** Given WCAG text-spacing overrides (line height 1.5, letter spacing 0.12, word spacing 0.16) on the admin "Account" list, when it renders, then no term or value is clipped or overlaps another. (L2-129)

### Content and internationalisation

- **AC-26** Given a Logos Lab collection with 1,906 followers in en-CA and then in fr-CA, when the list renders, then "Followers" shows "1,906" in en-CA and the locale's grouped number in fr-CA, and the dates "Updated 2 Oct 2026" change format with no code change, because the page formats each value and the list renders the string it is given. (L2-148)

### Motion

- **AC-27** Given reduced motion, when the loading "Curated by" list renders, then the skeleton lines do not shimmer. (L2-129)

### Performance

- **AC-28** Given the collection page, when the followers count changes from "412" to "413", then only that `dd` re-renders and the list's other groups are untouched. (L2-120)

## Implementation notes

- Planned. Folder `frontend/projects/components/src/lib/description-list/`, one type per file, each
  component with its own `.html` and `.scss`: `description-list.ts` (`DescriptionList`, selector
  `dl[llDescriptionList]`), `description-list.html` (`<ng-content />` only), `description-list.scss`,
  `description-list-variant.ts` (`DescriptionListVariant`), and `index.ts` re-exporting both. Both are
  exported from the library's `public-api.ts`.
- `DescriptionList` is standalone and `OnPush`. Host bindings: `class.facts` (always), the
  `facts--inline` or `facts--columns` class from `variant`, `attr.aria-label` from `label` (nothing when
  `null`) and `attr.aria-busy` (`"true"` or nothing) from `busy`. Host classes are bindings, so the
  consumer's own `class` is kept.
- Styles: the `description-list` block of `components.css` (`.facts`, `.facts > div`, `dt`, `dd`,
  `--inline`, `--columns`, `dd.is-empty`, `.skeleton--text`), written as `:host(.facts)` for the list and
  `:host ::ng-deep > div`, `> div > dt` and `> div > dd` for the projected groups. Add the two rules the
  design-system CSS lacks (D-7): `dt { overflow-wrap: anywhere }` and, in `@media (max-width: 39.99rem)`,
  `.facts--inline > div { grid-template-columns: minmax(0, 1fr) }`. Add `:host { margin: 0 }`.
- The list composes nothing; the page puts [badge](badge.md), [inline message](inline-message.md) and
  [skeleton](skeleton.md) inside the `dd`.
- The collection page (`frontend/projects/logos-lab/src/app/pages/collection/collection-page.html`) hand-writes
  `dl class="facts facts--inline"` inside its aside card; the slice that builds the
  component changes it to `dl llDescriptionList variant="inline"` and gives the loading state `busy`.
- Design-system catch-up: the `description-list` page says inline lists "keep label and value side by
  side down to 360px"; measured at 320 px and 360 px the term column is 75 to 89 px and overflows for
  "Followers", "Registered" and "Moderator's note". The page and `components.css` follow D-7. The page also
  says inside cards "use `.card__facts`", which D-9 leaves to the person card.
- The design-system page lists its sources as the two `appeal-review` and `course-overview` mocks only;
  the lists on the other screens in Usage are the same component.
- Mocks that put `style="margin-top: var(--space-4)"` on the `dl` (ten) and `margin-block` (two) are the
  page's spacing, not part of the component (D-6).

## Decisions

- **D-1** *Is `label` needed, and what names a list?* The brief proposed `label` (sets `aria-label`). No
  mock puts an `aria-label` on a `dl`: all 146 are named by the heading of the section or card around
  them, and one stands alone under a page title (`pages/account-deleted/default`). `label` stays as an
  optional input for that stand-alone case; a native `aria-labelledby` is the alternative and is never
  overwritten. ARIA defines no role for a `dl` and the design-system page says "give a list a heading when
  it stands alone", so `label` is a fallback and not the usual route. A scan with axe-core of a `dl`
  carrying `aria-label` reports no violation.
- **D-2** *Is there a data-driven `items` input?* No. The usage inventory shows the values are not plain
  text: nine links, twelve badges (some beside text, one beside an address in a `cluster`), six status lines
  with an icon, a muted "No attempts yet", and sentence values mixing text and a link ("Last changed 2 Mar
  2026 · Change it"). A typed `items` input would have to model all of these and would be outgrown by the
  next screen. The page writes the `div`, `dt` and `dd`, which is also what the design-system page's code
  section shows ("wrap each pair in a `<div>`").
- **D-3** *How is the loading state expressed, and is there a `busy` input?* The design-system page
  renders loading as `aria-busy="true"` on the `dl` with a skeleton line in each value, for all three
  layouts; the only mock with a loading list is `pages/studio-profile/loading`, which writes "Loading…" as
  one value. The brief had no input for it, so `busy` is added: it keeps the attribute consistent
  instead of each page writing it, and removes it when `false`. The skeleton lines are the page's own
  [skeleton](skeleton.md) spans, because they differ per value (`.is-short`), and the list never writes
  "Loading…" itself.
- **D-4** *Are `DescriptionTerm` and `DescriptionDetail` components needed?* No. Native `dt` and `dd`
  carry the semantics; neither has an input, a state or a slot beyond its text. The list's styles reach
  `div > dt` and `div > dd` with `:host ::ng-deep`, as [list](list.md) and [card](card.md) reach their
  projected children. A `div` wrapper component would also add a host element between the `dl` and its
  `dt` and `dd`, which HTML does not allow (a `dl` may contain only `div`, `dt`, `dd`, script-supporting
  elements).
- **D-5** *Does the list set a role?* No. The brief said "no role overrides". A native `dl` already
  exposes terms and details, and a role would replace that. The `list` CRD writes `role="list"` on a
  `ul` only because `list-style: none` drops list semantics in Safari; a `dl` has no such marker to lose.
- **D-6** *What of the page's inline `style` for spacing?* The mocks write `margin-top: var(--space-4)`
  or `margin-block` on 12 lists to space them from a heading or person above. That is the page's layout
  (a card's grid gap or a stack), not the component's: the list has no outer margin (`:host { margin: 0 }`
  overrides the browser default for a `dl`) and the page places it, as in [card](card.md) D-7 and D-8.
- **D-7** *How does the inline layout behave on a narrow screen?* The brief and the design-system page say
  the term and value stay side by side down to 360 px. Measured on the real mocks, the one-third column is
  75 px at 320 px and 89 px at 360 px, and the overline terms "Followers", "Registered", "Reminders",
  "Moderator's note", "Suspension ends" and "Password" are 80 to 102 px wide, so the term runs over the
  value, which L2-130 AC2 and L2-150 AC1 forbid. Decision: below 40rem an inline group is one column,
  term over value, keeping its hairline and padding; and a term wraps anywhere (`overflow-wrap:
  anywhere`) so a long translated word breaks instead of overlapping at any width. At 576 px and wider
  the one-third column is 142 to 211 px and nothing overflows in the mocks. This replaces the
  design-system page's responsive paragraph and changes the 360 px look of every inline list; if design
  prefers a fixed-width term column with a smaller type, that is a change to the page first.
- **D-8** *Where is the render-performance budget measured?* This repository has no perf-test project, as
  [button](button.md) D-3; the budgets of L2-120 and L2-123 measured on whole pages cover the list. The
  scenario is the collection page for Rev. Dr. Thomas Hale.
- **D-9** *What of `.card__facts`, `.certificate__facts` and `.project__facts`?* They are not variants of
  this component. They share the term style but differ in layout: `.card__facts` is a fixed two-column
  grid with hairlines above and below and semibold small values, `.certificate__facts` is a centred
  wrapping row of terms and values on the certificate sheet, `.project__facts` is label and value
  separated by space on one line. No mock uses `.card__facts` or `.project__facts`, and the certificate
  sheet is the certificate component's. [Card](card.md) D-6 leaves the person card out of the library;
  the columns variant covers the "pairs in a grid" need that the mocks have.
- **D-10** *Is a third variant, `columns`, part of the API?* Yes. The brief proposed `stacked` and
  `inline`; the inventory shows `facts--columns` on five states of `pages/admin-user`, and the
  design-system page documents it, so `variant` has three values and no later screen reshapes the API.
- **D-11** *May a value hold a `time` element?* Yes, optionally. No mock uses `time`, and the page's
  formatted text stays the visible content; the page may add `time[datetime]` where a machine-readable
  date helps. The list adds no style to it and needs no input, so it is not an API feature.
- **D-12** *Does the empty value need an input?* No. The design-system page marks a missing value with
  `class="is-empty"` on the `dd`; the mocks show a count of zero or "None" as plain text, and "No attempts
  yet" as `span.muted`. The class stays the page's, so the BEM selector the e2e page objects use is kept,
  and the list's styles colour it. A zero count is a value, not a missing one, so the collection page's
  "Length None yet" stays plain.
- **D-13** *Does the hairline appear under the last group?* Yes, as the design-system CSS draws it: every
  inline group has its rule, so the list ends with a hairline that sits on the card's padding. A change
  would be a design-system change.
