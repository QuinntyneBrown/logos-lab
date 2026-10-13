# Dialog

| Field | Value |
|---|---|
| Selector | `ll-dialog` |
| Library path | `frontend/projects/components/src/lib/dialog/` |
| Status | planned |
| Traces to | L2-015, L2-024, L2-026, L2-028, L2-055, L2-068, L2-084, L2-085, L2-117, L2-120, L2-123, L2-125, L2-126, L2-127, L2-128, L2-129, L2-130, L2-132, L2-134, L2-147, L2-150 |
| Design system | [`dialog.html`](../../design-system/components/dialog.html) |
| Source mocks | [`dialogs/unfollow/default`](../../mocks/dialogs/unfollow/default.html), [`dialogs/unfollow/busy`](../../mocks/dialogs/unfollow/busy.html), [`dialogs/unfollow/failed`](../../mocks/dialogs/unfollow/failed.html), [`dialogs/cancel-registration/success`](../../mocks/dialogs/cancel-registration/success.html), [`dialogs/sign-in-required/default`](../../mocks/dialogs/sign-in-required/default.html), [`dialogs/leave-course/default`](../../mocks/dialogs/leave-course/default.html), [`dialogs/delete-account/default`](../../mocks/dialogs/delete-account/default.html), [`dialogs/delete-account/scroll`](../../mocks/dialogs/delete-account/scroll.html), [`dialogs/report-content/default`](../../mocks/dialogs/report-content/default.html), [`dialogs/report-content/invalid`](../../mocks/dialogs/report-content/invalid.html), [`dialogs/block-member/default`](../../mocks/dialogs/block-member/default.html), [`dialogs/session-timeout/default`](../../mocks/dialogs/session-timeout/default.html), [`dialogs/unsaved-changes/default`](../../mocks/dialogs/unsaved-changes/default.html), [`dialogs/conflict/default`](../../mocks/dialogs/conflict/default.html), [`dialogs/community-guidelines/scroll`](../../mocks/dialogs/community-guidelines/scroll.html), [`dialogs/item-picker/default`](../../mocks/dialogs/item-picker/default.html), [`dialogs/course-outline/default`](../../mocks/dialogs/course-outline/default.html), [`dialogs/announcement-edit/invalid`](../../mocks/dialogs/announcement-edit/invalid.html) and every other `dialogs/*` state that renders `.dialog` (246 states in about 58 dialogs) |
| Rendering | [`dialog.html`](dialog.html) |

## Purpose and scope

A dialog is the centred modal shell that asks for one decision or one short piece of input while the page
behind waits: confirm an unfollow, leave a course, cancel a registration, report a comment, delete an
account, resolve a save conflict, accept the community guidelines, pick items to add. It is a frame with
three regions: a header (an optional icon tile, the title and a close control), a body that scrolls, and a
footer of actions (the quiet way out first, the primary action last). On phones it is a bottom sheet.

`ll-dialog` is the visual frame of a CDK `Dialog`. The application opens its own dialog component (for
example `UnfollowDialog`) with the CDK `Dialog` service; that component renders `ll-dialog` and fills it.

Who owns what:

- **`ll-dialog`** renders the frame and its three regions from inputs and slots, gives the title its `id`,
  emits `closeRequested` from the close control and from Escape, and enforces the close gate
  (`closeLabel`, `closeDisabled`). It owns no state about the work being done.
- **The application's dialog component** supplies the content (copy, fields, buttons), owns opening and
  closing through `DialogRef`, owns the busy, failed, invalid and success states of its own action,
  sets `disableClose`, `ariaLabelledBy`, `ariaDescribedBy`, `role` and the overlay classes when it is
  opened, marks the initial focus target, and moves focus when its content changes.
- **The CDK `Dialog` service** owns the overlay, the focus trap, hiding the page behind from assistive
  technology, the scroll lock, focus return to the opener and closing on navigation.

Use the [drawer](drawer.md) for navigation and filters people browse alongside the page, the popover for
small anchored panels and a full page for anything longer than one screen of fields. Never stack a second
dialog on a dialog.

Out of scope:

- Opening, the focus trap, scroll locking and focus return: the CDK `Dialog` service.
- The content, the busy and result states of the action, and the copy: the application's dialog component.
- The alert, form summary, fields and buttons inside the body and footer: their own components
  ([alert](alert.md), [form field](form-field.md), [button](button.md)).

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `dialogs/unfollow/*` (`UnfollowDialog`) | `sm`, no icon, close "Close" | title "Unfollow Dr. Abena Mensah?"; one consequence paragraph; footer quiet "Keep following", primary "Unfollow" | default, busy ("Unfollowing…"), failed (danger alert, "Try again") | raised surface over the backdrop |
| `dialogs/leave-course`, `leave-waitlist`, `unschedule`, `confirm-captions`, `reissue-certificate`, `sign-out-others`, `event-full`, `cancel-registration` | `sm`, no icon | one or two paragraphs; footer quiet keep, primary action | default, busy, failed, success ("Done") | raised surface |
| `dialogs/delete-account/*`, `delete-comment/*`, `mfa-disable/*`, `cancel-event/*` | `sm` or default, `icon` with `iconTone="danger"` (`trash`, `shield`, `calendar`) | consequence list, password field (delete-account); footer quiet keep, `btn--danger` | default, busy, failed, invalid, scroll, success | raised surface |
| `dialogs/block-member`, `delete-topic`, `revoke-invitation`, `revoke-certificate` | `sm` or default, no icon, danger primary | a `dialog__who` row (block-member), consequence list | default, busy, failed, in-use, success | raised surface |
| `dialogs/report-content/*` | default, `icon="flag"` (accent tile) | quoted comment card, radio choices, optional note; footer "Cancel", "Send report" | default, busy, failed, invalid (form summary), rate-limited (warning alert), already-reported, success | raised surface |
| `dialogs/sign-in-required/default`, `verify-email-prompt/*` | `sm`, `icon="lock"` / `icon="message"` | one paragraph; footer links styled as buttons ("Create account", "Sign in"; "Not now", "Resend email") | default, busy, success | raised surface |
| `dialogs/session-timeout/*` (`SessionTimeoutDialog`) | `sm`, `icon="clock"`, `closeLabel` null, `role="alertdialog"` | countdown title "You'll be signed out in 2:00"; footer "Sign out now", "Stay signed in" | default, busy, failed, success | raised surface |
| `dialogs/unsaved-changes/default` | `sm`, no icon | footer quiet "Leave without saving", primary "Stay on this page" (the safe choice) | default | raised surface |
| `dialogs/report-problem`, `appeal-decision`, `data-export`, `publish-schedule`, `change-attribution`, `date-range`, `cookie-settings`, `request-changes`, `restore-version` | default | a `form` of fields, choices or switches; footer "Cancel" and a submit button (`form="…"`) | default, busy, failed, invalid (form summary), success | raised surface |
| `dialogs/announcement-edit`, `new-content`, `moderation-action`, `invite-expert`, `edit-roles`, `topic-edit`, `merge-topic` | `lg` or default | a `form` with paired fields; footer "Cancel" and a submit button | default, busy, failed, invalid, success | raised surface |
| `dialogs/community-guidelines/*`, `conflict/*`, `item-picker/*` | `lg` | long prose, a split diff, or a searchable list of checkboxes: the body scrolls between the fixed header and footer | default, scroll, busy, failed, updated, selected, empty, no-results | raised surface |
| `dialogs/course-outline/*` | default, no footer | course progress and an outline | default, scroll, locked | raised surface |
| `dialogs/player-settings/*` | default | settings choices; footer primary "Done" only | default, selected | raised surface |

## Anatomy

1. **Frame** — `div.dialog` with `.dialog--sm` or `.dialog--lg`: the raised surface, hairline border,
   `--shadow-4`; a grid of header, body and footer so only the body scrolls.
2. **Header** — `header.dialog__header`: icon tile, title and close control on one row.
3. **Icon tile (optional)** — `span.dialog__icon` (+ `.dialog__icon--danger`): a decorative
   `--size-dialog-icon` tile holding an [icon](icon.md).
4. **Title** — `h1.dialog__title`; its `id` is the dialog's accessible name.
5. **Close control (optional)** — an [icon button](button.md) `.icon-btn` with the close glyph, named by
   `closeLabel`, 32 px, aligned to the header's trailing edge.
6. **Body** — `div.dialog__body`: projected content, `--space-5` apart; direct paragraphs are muted; it
   scrolls on its own. Content classes the frame styles: `dialog__who` (a person row: avatar or photo,
   name, one line) and the failed-state alert at the top.
7. **Footer (optional)** — `footer.dialog__footer`: a hairline, then actions right-aligned, wrapping.
   Hidden when empty.

Host: `ll-dialog` is `display: contents`; it renders the `div.dialog`. The CDK dialog container around it
(`.cdk-dialog-container`, inside the overlay pane carrying `ll-dialog-panel`) carries `role`,
`aria-modal="true"`, `aria-labelledby` and `aria-describedby`; the `div.dialog` itself carries none of them.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `heading` | `string` | — | yes | The title text, "Unfollow Dr. Abena Mensah?". Arrives translated. |
| `headingId` | `string` | — | yes | The `id` of the `h1`; the opener passes the same id as the CDK dialog's `ariaLabelledBy` (`dialog-title`). |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | no | `sm` adds `.dialog--sm` (`--size-dialog-sm`), `lg` adds `.dialog--lg` (`--size-dialog-lg`), `md` adds nothing (`--size-dialog-md`). |
| `icon` | `IconName \| null` | `null` | no | When set, renders the icon tile before the title. Decorative: the title carries the meaning. |
| `iconTone` | `'accent' \| 'danger'` | `'accent'` | no | `danger` adds `.dialog__icon--danger`; used when the primary action is destructive. Ignored when `icon` is `null`. |
| `closeLabel` | `string \| null` | — | yes | The close control's accessible name ("Close"). `null` renders no close control and makes the dialog non-dismissible (Escape is ignored too). |
| `closeDisabled` | `boolean` | `false` | no | While `true` the close control is disabled and Escape is ignored. The application sets it while the action is busy. |

### Outputs

| Output | Payload | Emitted when |
|---|---|---|
| `closeRequested` | `void` | The close control is activated, or Escape is pressed (not by a modifier combination, not already handled by a control inside), while the gate is open (`closeLabel` is set and `closeDisabled` is `false`). The application closes its `DialogRef` or runs its own leave logic. |

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | the description paragraph (carrying the id the opener passes as `ariaDescribedBy`), fields, a `form`, lists, an [alert](alert.md), prose | Rendered in `div.dialog__body`. A `form` that is a direct child is `display: contents`, so its children lay out on the body's grid. |
| `[slot=footer]` | [buttons](button.md) or links styled as buttons, quiet first and primary last | Rendered in `footer.dialog__footer`. An empty footer is `display: none`. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Plain | — | A confirmation or a form with no tile. |
| With icon | `.dialog__icon` | A dialog whose subject benefits from a glyph: report (`flag`), sign in (`lock`), verify (`message`), session (`clock`), a result (`done`). |
| Danger icon | `.dialog__icon--danger` | The primary action is destructive: delete account (`trash`), turn off two-step verification (`shield`), cancel an event (`calendar`). |
| Non-dismissible | `closeLabel` null | A blocking dialog the person must answer: the session timeout (`role="alertdialog"`). |

| Size | Modifier | Width | Use for |
|---|---|---|---|
| Small | `.dialog--sm` | `--size-dialog-sm` | A one-line question with short answers: unfollow, leave course, block member. |
| Medium | — | `--size-dialog-md` | Most dialogs: a few fields, a list of consequences. |
| Large | `.dialog--lg` | `--size-dialog-lg` | An edit with several related fields, long prose, a diff or a picker: announcement, community guidelines, conflict, item picker. |

Height follows the content up to the window height less `--space-12`; beyond that only the body scrolls.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Open | the CDK dialog is attached | Dialog over `--color-bg-backdrop`; rises `--space-4` over `--duration-slow` | "Unfollow Dr. Abena Mensah?, dialog", described by its consequence paragraph; focus moves in; the page behind is hidden |
| Busy | the application's primary action is running | The primary keeps its label's verb as "…ing" ("Unfollowing…") with a spinner and `aria-busy`; the quiet button, the close control and every field are disabled; `closeDisabled` is `true` | Focus stays on the busy primary; Escape does nothing |
| Failed | the action failed | A danger [alert](alert.md) is the first child of the body ("We couldn't unfollow just now"); the primary reads "Try again"; fields keep what was typed | The alert (`role="alert"`) is announced assertively; focus stays on the primary |
| Invalid | the form was submitted with errors | A form summary at the top of the body; each field shows its error | The summary takes focus (`role="alert"`, `tabindex="-1"`); fields set `aria-invalid="true"` |
| Success | the action worked | The title and body change to the result ("Registration cancelled", a `role="status"` line "You're no longer registered"); the footer becomes a single primary "Done" (or the next steps) | The status is announced politely; focus moves to the new primary |
| Scrolling | the body is taller than the room | Only the body scrolls; header and footer stay in view | The scrolling body is keyboard focusable (`tabindex="0"`) |
| Non-dismissible | `closeLabel` is `null` | No close control | `role="alertdialog"`; Escape ignored |
| Close disabled | `closeDisabled` is `true` | The close control is disabled | Escape ignored |
| Focus | `:focus-visible` on any control | `--color-focus-ring` outline | — |
| Closed | the dialog is closed | Removed | Focus returns to the opener |

## Markup

```html
<!-- rendered: confirmation, small. The CDK container carries role="dialog" aria-modal="true"
     aria-labelledby="dialog-title" aria-describedby="dialog-desc" -->
<div class="dialog dialog--sm">
  <header class="dialog__header">
    <h1 class="dialog__title" id="dialog-title">Unfollow Dr. Abena Mensah?</h1>
    <button class="icon-btn" type="button" aria-label="Close"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">…</svg></button>
  </header>
  <div class="dialog__body">
    <p id="dialog-desc">You'll stop getting notifications when Dr. Mensah publishes or announces an event. You can follow again at any time.</p>
  </div>
  <footer class="dialog__footer">
    <button class="btn btn--quiet" type="button">Keep following</button>
    <button class="btn btn--primary" type="button">Unfollow</button>
  </footer>
</div>
```

```html
<!-- rendered: destructive, with the danger icon tile -->
<div class="dialog">
  <header class="dialog__header">
    <span class="dialog__icon dialog__icon--danger"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">…</svg></span>
    <h1 class="dialog__title" id="dialog-title">Delete your account?</h1>
    <button class="icon-btn" type="button" aria-label="Close"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">…</svg></button>
  </header>
  <div class="dialog__body">
    <p id="dialog-desc">Here's what happens when you delete your account:</p>
    <ul class="list list--plain"><li>…</li></ul>
    <div class="field">…password…</div>
  </div>
  <footer class="dialog__footer">
    <button class="btn btn--quiet" type="button">Keep my account</button>
    <button class="btn btn--danger" type="button">Delete my account</button>
  </footer>
</div>
```

```html
<!-- rendered: busy, then failed (the body's first child is the danger alert) -->
<footer class="dialog__footer">
  <button class="btn btn--quiet" type="button" disabled>Keep following</button>
  <button class="btn btn--primary" type="button" aria-busy="true"><span class="spinner" aria-hidden="true"></span>Unfollowing…</button>
</footer>
<div class="dialog__body">
  <div class="alert alert--danger" role="alert"><svg class="icon" aria-hidden="true">…</svg><p class="alert__title">We couldn't unfollow just now</p><p class="alert__body">You're still following Dr. Mensah. Check your connection and try again.</p></div>
  <p id="dialog-desc">You'll stop getting notifications when Dr. Mensah publishes or announces an event. You can follow again at any time.</p>
</div>
```

```html
<!-- rendered: non-dismissible (role="alertdialog" on the container), no close control -->
<div class="dialog dialog--sm">
  <header class="dialog__header">
    <span class="dialog__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">…</svg></span>
    <h1 class="dialog__title" id="dialog-title">You’ll be signed out in 2:00</h1>
  </header>
  <div class="dialog__body"><p id="dialog-desc">For your security, staff sessions end after 30 minutes without activity. …</p></div>
  <footer class="dialog__footer">…</footer>
</div>
```

```html
<!-- rendered: a form dialog; the submit button sits in the footer and names its form -->
<div class="dialog dialog--lg">
  <header class="dialog__header">…</header>
  <div class="dialog__body">
    <p id="dialog-desc">Shows as a dismissible banner at the top of every page during its window.</p>
    <form id="a-form" novalidate>…fields…</form>
  </div>
  <footer class="dialog__footer">
    <button class="btn btn--quiet" type="button">Cancel</button>
    <button class="btn btn--primary" type="submit" form="a-form">Schedule announcement</button>
  </footer>
</div>
```

```html
<!-- consumer: UnfollowDialog template -->
<ll-dialog heading="Unfollow Dr. Abena Mensah?" headingId="dialog-title" size="sm" closeLabel="Close"
           [closeDisabled]="busy()" (closeRequested)="close()" i18n-heading i18n-closeLabel>
  @if (failed()) {
    <ll-alert tone="danger" heading="We couldn't unfollow just now">You're still following Dr. Mensah. Check your connection and try again.</ll-alert>
  }
  <p id="dialog-desc">You'll stop getting notifications when Dr. Mensah publishes or announces an event. You can follow again at any time.</p>
  <ng-container slot="footer">
    <button llButton variant="quiet" type="button" [disabled]="busy()" cdkFocusInitial (click)="close()">Keep following</button>
    <button llButton variant="primary" type="button" [busy]="busy()" (click)="unfollow()">{{ label() }}</button>
  </ng-container>
</ll-dialog>
```

```ts
// consumer: how the application opens it
this.dialog.open(UnfollowDialog, {
  role: 'dialog',            // 'alertdialog' for a non-dismissible dialog
  ariaModal: true,
  ariaLabelledBy: 'dialog-title',
  ariaDescribedBy: 'dialog-desc',
  disableClose: true,        // Escape is handled by ll-dialog; a click on the backdrop never closes
  hasBackdrop: true,
  backdropClass: 'll-backdrop',
  panelClass: 'll-dialog-panel',
  autoFocus: 'first-tabbable', // [cdkFocusInitial] inside the dialog wins
  restoreFocus: true,
  closeOnNavigation: true,
});
```

## Design

- Frame: `--color-bg-surface-raised`, `--color-fg-default`, a `--border-width-hairline` border in
  `--color-border-default`, `--shadow-4`, corners `--radius-xl`; a grid of header, body and footer rows
  (auto, flexible, auto).
- Header: padding `--space-6` on the top and sides and `--space-3` below, items `--space-4` apart,
  aligned to the start; title `--text-h3`, filling the row; when an icon tile precedes the title the
  title is centred against it. The close control is `--space-8` square and pulled `--space-1` up and
  `--space-2` toward the edge so its glyph lines up with the title.
- Icon tile: `--size-dialog-icon` square, `--radius-md`, the icon centred.
- Body: grid, rows `--space-5` apart, padding `--space-3` above and `--space-6` on the sides and below;
  direct paragraphs in `--color-fg-muted`; `overflow-y: auto`. `dialog__who`: `--space-4` gap, a
  `--space-12` square photo with `--radius-md` corners.
- Footer: a `--border-width-hairline` top border in `--color-border-default`; padding `--space-4`
  above and `--space-6` on the sides and below; actions end-aligned, `--space-3` apart, wrapping to a new
  line rather than shrinking.
- Width: `--size-dialog-md`, `--size-dialog-sm` or `--size-dialog-lg`, never wider than the viewport.
- Overlay (global styles of the components library, because the CDK overlay container sits outside every
  component): the backdrop class `ll-backdrop` paints `--color-bg-backdrop`; the pane class
  `ll-dialog-panel` fills the width up to `--size-dialog-lg`, centres the frame, and at 40rem and wider
  keeps `--space-6` of room on every side (height at most the window less `--space-12`); below 40rem it
  anchors the pane to the bottom edge at full width with height at most the window less `--space-4`;
  the overlay container is on `--z-modal`.
- Corners: `--radius-xl` on all four corners from 40rem; below 40rem only the top corners.
- Motion: the frame rises `--space-4` over `--duration-slow` with `--ease-enter` (the shared `rise`
  keyframes) when the viewer has not asked for reduced motion; the busy spinner is the spinner component's.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Frame | `--color-bg-surface-raised` | `--palette-white` | `--palette-night-850` |
| Title and fields | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Body paragraphs | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Border and footer hairline | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Backdrop | `--color-bg-backdrop` | ink at 45 % | black at 60 % |
| Icon tile | `--color-accent-subtle` / `--color-fg-accent` | `--palette-accent-50` / `--palette-accent-700` | `--palette-accent-950` / `--palette-accent-300` |
| Danger icon tile | `--color-danger-bg` / `--color-danger-icon` | `--palette-lingon-100` / `--palette-lingon-600` | `--palette-lingon-950` / `--palette-lingon-300` |
| Focus ring | `--color-focus-ring` | `--palette-accent-700` | `--palette-accent-300` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-surface-raised` | 4.5:1 | Title, fields, consequence text |
| `--color-fg-muted` | `--color-bg-surface-raised` | 4.5:1 | Body paragraphs |
| `--color-fg-accent` | `--color-accent-subtle` | 3:1 | Icon tile glyph |
| `--color-danger-icon` | `--color-danger-bg` | 3:1 | Danger icon tile glyph |
| `--color-focus-ring` | `--color-bg-surface-raised` | 3:1 | Focus indicator |

## Responsive behaviour

- From 40rem (640 px) the dialog is centred with `--space-6` of room on every side and all four corners
  rounded. Below 40rem it is a bottom sheet: full width up to its size's maximum, rounded only at the
  top, rising from the bottom edge, at most the window height less `--space-4`.
- The footer's buttons wrap onto a second line rather than shrink; they stay end-aligned.
- Paired fields in a large dialog stack below 768 px (the application's form layout).
- At 320 px nothing scrolls horizontally or clips; at 200 % and 400 % zoom everything stays available
  because the body scrolls; every footer button is at least 44 × 44 CSS px on touch devices; the close
  control is 32 px (above the 24 px minimum) and sits at least `--space-4` from the title.
- On a short window (a phone on its side) the body scrolls and the header and footer stay in view.

## Accessibility

### Role and pattern

APG modal dialog, provided by the CDK dialog container: `role="dialog"` (or `alertdialog` for a
non-dismissible dialog), `aria-modal="true"`, `aria-labelledby` the title's id and `aria-describedby` the
consequence paragraph's id. The CDK hides the page behind the overlay from assistive technology while it
is open, so the dialog's `h1` is the only `h1` in the accessibility tree.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Cycles through the dialog's controls only; focus never leaves the dialog. |
| <kbd>Escape</kbd> | Emits `closeRequested` (the dialog closes without acting, like the quiet button) unless the gate is shut (busy or non-dismissible), a control inside handled the key, or a modifier is held. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Activates the focused button; Enter in a field submits the form. |
| Arrow keys, <kbd>Page Down</kbd> | Scroll a focused scrolling body. |

### Focus

- On open, focus moves into the dialog. The application marks the target with `cdkFocusInitial`: the
  first field when there is one; otherwise the safest control, which is the quiet keep button when the
  primary action is destructive or consequential ("Keep my account", "Keep following"), the primary
  when it is itself the safe choice ("Stay on this page", "Stay signed in"), or "Done" on a result.
  With nothing marked, CDK focuses the first tabbable control, the close control.
- A destructive dialog never starts on its danger button.
- Focus is trapped while open and returns to the control that opened it when it closes. When the result
  removed the opener, the page moves focus to the control that replaced it (the "Follow" button after
  "Unfollow").
- A busy primary stays focusable and keeps focus (`aria-busy`, not native `disabled`), so Failed and
  Success keep a focus position. After a failed submit with an error summary, the summary takes focus.
  After a success the new primary takes focus.
- A click on the backdrop does not close the dialog and does not move focus out of it.

### Labelling

The dialog is named by its title and described by its consequence paragraph. The close control is named by
`closeLabel` and its glyph is hidden. The icon tile and a person's photo in `dialog__who` are decorative.
A busy primary keeps its name and sets `aria-busy`. A scrolling body is a focus stop (`tabindex="0"`) so
keyboard users can scroll it.

### Announcements

A failed action is a danger alert (`role="alert"`, assertive) placed first in the body; a success is a
`role="status"` line (polite); an error summary is `role="alert"`. None moves focus except the summary and
the success primary named above. A countdown title (session timeout) is announced by the application once
a minute, not every second.

### Motion

The rise is removed under reduced motion; the dialog appears in place.

## Content and internationalisation

- Title: a question naming the thing for a confirmation ("Unfollow Dr. Abena Mensah?", "Delete your
  account?"), a verb and object for a task ("Report Samuel Okafor's comment"). One sentence of consequence
  follows, with numbers when they matter ("Publish and notify 87 people").
- Buttons repeat the verb and name both outcomes ("Keep following" / "Unfollow"); "OK" and a bare
  "Cancel" are not used for a destructive choice. A busy label ends in an ellipsis ("Unfollowing…");
  a failed label is "Try again".
- Failure copy says what did not happen and what was kept ("You're still following Dr. Mensah").
- Translatable inputs: `heading`, `closeLabel`. Messages with counts use ICU plurals ("Sign out 2
  sessions", "Add 3 lessons"). Data values: names, dates and times, formatted by the application with the
  active locale. Strings grow by 30 % without clipping: titles and button labels wrap.

## Performance

- Change detection: `OnPush`, signal inputs; no timers, no `ResizeObserver` unless the body overflows
  (one observer, removed on destroy). Rendered only while open.
- Perf-test scenario: `frontend/projects/perf-test/src/scenarios/Dialog.ts` renders "Unfollow Dr. Abena
  Mensah?" as a small dialog with one paragraph and the two footer buttons; iterations in
  `e2e/perf-test/config/scenario-iterations.mjs` keep it at roughly 100–300 ms.
- Composite scenarios: DarkTheme.
- Layout stability: the dialog is in a fixed overlay, so opening it never shifts the page; the scroll lock
  keeps the scrollbar's width so the page behind does not jump. Application dialog components are loaded
  on first open (dynamic import), not in the initial route bundle.

## Acceptance criteria

### Rendering

- **AC-1** Given Miriam Clarke on Dr. Abena Mensah's profile who presses "Following", when the dialog opens, then a small dialog titled "Unfollow Dr. Abena Mensah?" shows one consequence paragraph, a close control named "Close", a quiet "Keep following" and a primary "Unfollow", in that order. (L2-024)
- **AC-2** Given the open dialog, when it is inspected, then its container has `role="dialog"`, `aria-modal="true"`, `aria-labelledby` the title's id and `aria-describedby` the consequence paragraph's id, and the title is an `h1`. (L2-127)
- **AC-3** Given dialogs of the three sizes at 1280 px, when their widths are measured, then the small one is `--size-dialog-sm` wide, the default one `--size-dialog-md` and the large one `--size-dialog-lg`. (L2-130)
- **AC-4** Given Miriam Clarke's "Delete your account?" dialog, when it renders, then a danger icon tile precedes the title, the footer reads "Keep my account" then a danger "Delete my account", and the dialog lists what happens before asking for her password. (L2-117)
- **AC-5** Given the report dialog for Samuel Okafor's comment, when it renders, then an accent icon tile precedes the title "Report Samuel Okafor's comment", and the footer reads "Cancel" then "Send report". (L2-085)
- **AC-6** Given a visitor who presses "Enrol" on Imago Dei in an Age of Machines, when the dialog opens, then "Sign in to enrol" offers "Create account" and a primary "Sign in" as links styled as buttons. (L2-015)
- **AC-7** Given an Editor's session with 2 minutes left, when the timeout dialog opens, then "You'll be signed out in 2:00" has no close control, its container has `role="alertdialog"`, and Escape does not close it. (L2-128)
- **AC-8** Given the course outline dialog on a lesson, when it renders, then it has a header and a scrolling body and no footer, and no empty footer takes space. (L2-028)

### States

- **AC-9** Given the unfollow dialog, when "Unfollow" is pressed and the request is running, then the primary reads "Unfollowing…" with a spinner and `aria-busy="true"`, the "Keep following" button and the close control are disabled, and a second press does nothing. (L2-024)
- **AC-10** Given the request failed, when the dialog updates, then a danger alert "We couldn't unfollow just now" is the first child of the body, above the consequence paragraph, the primary reads "Try again", and focus is on the primary. (L2-024)
- **AC-11** Given Clara Novak cancelling her registration to the Faith and AI Evening, when the request succeeds, then the title reads "Registration cancelled", a `role="status"` line reads "You're no longer registered", the footer is a single primary "Done", and focus is on "Done". (L2-055)
- **AC-12** Given Dr. Abena Mensah's announcement form submitted with two problems, when it is invalid, then a summary at the top of the body lists both as links to their fields and has focus, and each field shows its error. (L2-128)
- **AC-13** Given the announcement dialog with a long message, when the viewer types in it and clicks the backdrop, then the dialog stays open and the typed text is kept. (L2-084)
- **AC-14** Given the community guidelines dialog on a short window, when it is open, then only the body scrolls, the title and "Accept and post" stay in view, and the body can be scrolled with the keyboard. (L2-068)
- **AC-15** Given the item picker for section 3 of the course builder, when "Add items" is open with 3 items chosen, then the footer reads "Cancel" then "Add 3 lessons" and stays in view while the list scrolls. (L2-026)
- **AC-16** Given the save-conflict dialog, when it renders, then the large dialog shows Naomi Ellis's version beside the viewer's with "Keep yours" and "Keep Naomi’s", and a quiet "Decide later" in the footer. (L2-084)

### Keyboard and focus

- **AC-17** Given the "Delete your account?" dialog has just opened, when it is inspected, then focus is on "Keep my account", not on "Delete my account" and not on the close control. (L2-126)
- **AC-18** Given a report dialog with fields, when it opens, then focus is on the first field. (L2-126)
- **AC-19** Given an open dialog, when the viewer presses Tab and Shift+Tab repeatedly, then focus cycles through its controls and never reaches the page behind. (L2-126)
- **AC-20** Given the open unfollow dialog, when the viewer presses Escape, then it closes and focus returns to "Following". (L2-126)
- **AC-21** Given the open unfollow dialog, when the viewer activates "Close", then it closes and focus returns to the control that opened it. (L2-126)
- **AC-22** Given the dialog is busy, when the viewer presses Escape, then it stays open. (L2-126)
- **AC-23** Given the "Leave without saving?" dialog over a draft with unsaved changes, when the viewer presses Escape, then it closes and the viewer is still editing the draft. (L2-084)
- **AC-24** Given "Sign in to enrol", when the viewer follows "Sign in", then the dialog closes with the navigation and the sign-in page returns them to the course afterwards. (L2-015)
- **AC-25** Given an open dialog, when the page behind is scrolled with the mouse wheel or the keyboard, then it does not scroll and does not shift sideways. (L2-120)

### Screen readers

- **AC-26** Given a screen reader and the open unfollow dialog, when it is announced, then it reads "Unfollow Dr. Abena Mensah?, dialog" followed by the consequence paragraph, and the page behind is not reachable. (L2-127)
- **AC-27** Given the open dialog, when the accessibility tree is read, then the dialog's title is the only `h1`, and the icon tile, the close glyph and the busy spinner are hidden from assistive technology. (L2-127)
- **AC-28** Given a failed action, when the danger alert appears, then it is announced assertively without moving focus. (L2-127)
- **AC-29** Given the page's accessibility scan, when every dialog state is scanned, then there are no serious or critical violations, including for a scrolling body. (L2-125)

### Theming

- **AC-30** Given the dark theme, when a dialog opens, then the frame, hairlines, icon tiles and backdrop use their dark token values, and no element keeps a light-only colour. (L2-134)
- **AC-31** Given both themes, when contrast is measured, then title and body text meet 4.5:1 on the raised surface, the icon glyphs meet 3:1 on their tiles, and the focus ring meets 3:1. (L2-129)

### Responsive

- **AC-32** Given a viewport of 1280 px, when the unfollow dialog is open, then it is centred with all four corners rounded and the backdrop around it. (L2-130)
- **AC-33** Given a viewport of 375 px, when the same dialog is open, then it is full width, anchored to the bottom edge with only its top corners rounded. (L2-130)
- **AC-34** Given a viewport of 320 px and the "Publish and notify 87 people" confirmation, when the dialog is open, then the footer buttons wrap onto two lines and nothing scrolls horizontally. (L2-130)
- **AC-35** Given a viewport of 375 px, when the footer buttons are measured, then each is at least 44 × 44 CSS px, and the close control is at least 24 × 24 CSS px. (L2-132)
- **AC-36** Given a browser zoomed to 400 % at 1280 px, when the "Delete your account?" dialog is open, then every control stays reachable by scrolling the body and nothing scrolls horizontally. (L2-129)
- **AC-37** Given the pseudo-locale with 30 % longer strings at 375 px, when a dialog opens, then the title and buttons wrap and nothing is clipped. (L2-150)

### Motion

- **AC-38** Given reduced motion, when a dialog opens, then it appears in place with no rise. (L2-129)

### Content and translation

- **AC-39** Given the pseudo-locale, when a dialog opens, then its title, close label, body and button labels are pseudo-localised, and a count in a button ("Sign out 2 sessions") follows the plural rules. (L2-147)

### Performance

- **AC-40** Given a production build, when the public home route's initial bundle is measured, then the application dialog components are separate lazy chunks and the initial JavaScript is within budget. (L2-123)
- **AC-41** Given the unfollow dialog opening, when layout shift is measured, then it adds none to the page behind. (L2-120)

## Implementation notes

Planned. Folder `frontend/projects/components/src/lib/dialog/`:

- `dialog.ts` (`Dialog`), `dialog.html`, `dialog.scss` (the `dialog` block under `:host ::ng-deep`, as the
  drawer does), `dialog-size.ts` (`DialogSize`), `dialog-icon-tone.ts` (`DialogIconTone`); one type per
  file, no inline template or styles. Composes `Icon` and `IconButton`.
- Escape: a `@HostListener('document:keydown.escape')` on the component that ignores events that are
  `defaultPrevented` or carry a modifier, and emits `closeRequested` only when the gate is open.
- Scrolling body: one `ResizeObserver` on `.dialog__body` sets `tabindex="0"` while its content overflows.
- Overlay foundation: add `.ll-dialog-panel` to `frontend/projects/components/styles/_overlay.scss` beside
  `.ll-drawer-panel--left`; `.ll-backdrop` already exists. The `rise` keyframes already exist in
  `styles/_foundations.scss`.
- The application's dialog components live in `frontend/projects/logos-lab/src/app/dialogs/<name>/`
  (like `nav-drawer`), are loaded with a dynamic import and each set the `Dialog.open` configuration shown
  in Markup; a shared helper may wrap the common options, but `disableClose: true`, `ariaModal: true` and
  both overlay classes are required.
- Mock gaps for the design system and mocks to catch up with: 21 failed states (for example
  `leave-course/failed`, `approve/failed`) put the danger alert after the description paragraph where this
  CRD (and the design-system page) put it first; some busy states disable the primary with the native
  attribute (`block-member/busy`) or leave the quiet button enabled (`unfollow/busy`) where this CRD keeps
  the primary focusable and disables the quiet button and close control; `form class="dialog__body"` in
  the mocks becomes a form inside the body.

## Decisions

- **D-1** *`h1` or `h2` for the title?* `h1`, as in every dialog mock and as the design-system code uses a
  heading in the same place. The CDK hides the page behind the overlay from assistive technology while the
  dialog is open (`aria-modal` true on the container), so the dialog's `h1` is the only `h1` in the
  accessibility tree and `L2-127` AC1 holds. The [drawer](drawer.md) chose `h2` (D-1 there) because its mock
  keeps the page's `h1` visible beside the sheet; a dialog is modal over everything.
- **D-2** *Native `<dialog>` with `showModal()` (design-system code) or the CDK `Dialog`?* The CDK `Dialog`,
  as `AGENTS.md` requires. The `.backdrop` wrapper of the design system becomes the CDK backdrop class
  `ll-backdrop` and the pane class `ll-dialog-panel`; the `.dialog*` classes and the children are unchanged.
- **D-3** *Is `descriptionId` an input?* No. `ll-dialog` has nothing to render with it: the application puts
  the id on its consequence paragraph and passes the same id as the CDK dialog's `ariaDescribedBy`, as the
  mocks do (`dialog-desc`). `headingId` stays an input because `ll-dialog` renders the `h1` that carries it.
- **D-4** *Is the close control always present?* `closeLabel` is required and `string | null`: the session
  timeout dialog has no close control and must not be dismissed with Escape, so `null` means non-dismissible
  (`role="alertdialog"` is set by the opener). Making it required forces every consumer to choose.
- **D-5** *Is an `iconTone` input needed?* Yes: 18 danger icon tiles (delete account, delete comment, turn off
  two-step verification, cancel event) and 21 accent tiles in the mocks need the choice; `size` defaults to
  `md` because 129 of the 246 mock states are default width.
- **D-6** *Does a click on the backdrop close the dialog?* No. The design system and `L2-126` AC3 name Escape
  and Cancel as the ways out and are silent on the scrim; closing on a stray click would throw away what a
  person typed in a long form (`L2-084`). The opener sets `disableClose: true`, so the CDK ignores the
  scrim and Escape, and `ll-dialog` handles Escape itself and emits `closeRequested` through one gate shared
  with the close control (`closeLabel` set and `closeDisabled` false).
- **D-7** *What does a busy dialog allow?* Nothing: the quiet button and the close control are disabled and
  Escape is ignored, because the request cannot be abandoned safely. The primary stays a focusable
  `aria-busy` button (the button component never uses native `disabled` for busy) so focus is not lost. The
  mocks vary (some disable the primary natively, some leave the quiet button a live link); this is the
  strictest consistent reading and the one the design-system page describes ("the dialog stays open until
  the work finishes").
- **D-8** *Where does the failed alert go?* First in the body, above the consequence paragraph, as the
  design-system page says and as 17 failed mocks do; 21 mocks put it below the paragraph. It goes first so it
  is visible and announced even when the body scrolls.
- **D-9** *The mocks make the form the body (`form.dialog__body`); how does `ll-dialog` do it?* The body is
  always `div.dialog__body`; a `form` child is `display: contents` so its children keep the body's grid and
  gaps (`.form` has a wider gap than the body). The footer's submit button names the form with `form="…"`,
  as the mocks do.
- **D-10** *Empty footer?* `course-outline` has none. The footer element is always rendered and hidden when
  empty, because content projection cannot be conditional; a hidden footer is not in the accessibility tree.
- **D-11** *How does a long body scroll for keyboard users?* The scrolling body is a focus stop
  (`tabindex="0"`) only while it overflows; otherwise axe reports a scrollable region that cannot be reached
  (`L2-125`).
- **D-12** *Initial focus?* Set by the application with `cdkFocusInitial`, by the rule in Accessibility >
  Focus: first field, else the safest control. The design-system page says the same; the default of the
  first tabbable would otherwise always land on the close control.
- **D-13** *Where is the phone breakpoint?* 40rem (640 px), from the design-system CSS; the page text says
  the same. Below it the dialog is a bottom sheet; the 375 and 320 px criteria sit below it.
- **D-14** *Close control size?* 32 px (`--space-8`) as the design system draws it. `L2-132` AC1 asks 24 px for
  any target and 44 px for primary actions on touch viewports; the footer buttons (44 px) are the primary
  actions, so the close control is compliant. The drawer's close control is a larger target because it is the
  sheet's main exit.
- **D-15** *Success inside the dialog or close at once?* Where the mocks show a success state, the dialog
  stays open, swaps its title and body for the result with a `role="status"` line, and offers "Done" or the
  next steps; focus moves to the new primary. A dialog whose result is visible on the page behind (unfollow)
  closes at once and the page moves focus to the control that replaced the opener.
- **D-16** *One dialog at a time?* Yes: dialogs are never stacked (design-system do and don't); a second
  request replaces the first.
- **D-17** *Which render-performance scenario?* `Dialog.ts`, rendering the small unfollow confirmation,
  consistent with the other planned CRDs; the repository's perf-test project does not exist yet, so until it
  does the budgets of `L2-120` and `L2-123` are measured on whole pages (see [button](button.md) D-3).
