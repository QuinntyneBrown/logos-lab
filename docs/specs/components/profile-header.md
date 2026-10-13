# Profile header

| Field | Value |
|---|---|
| Selector | `ll-profile-header` |
| Library path | `frontend/projects/components/src/lib/profile-header/` |
| Status | planned |
| Traces to | L2-013, L2-021, L2-024, L2-095, L2-120, L2-126, L2-127, L2-129, L2-130, L2-132, L2-134, L2-141, L2-148, L2-150 |
| Design system | [`profile-header.html`](../../design-system/components/profile-header.html) |
| Source mocks | [`pages/expert-profile/default`](../../mocks/pages/expert-profile/default.html), [`pages/expert-profile/following`](../../mocks/pages/expert-profile/following.html), [`pages/expert-profile/rate-limited`](../../mocks/pages/expert-profile/rate-limited.html), [`pages/expert-profile/long`](../../mocks/pages/expert-profile/long.html), [`pages/expert-profile/empty`](../../mocks/pages/expert-profile/empty.html), [`pages/expert-profile/loading`](../../mocks/pages/expert-profile/loading.html), [`pages/admin-user/default`](../../mocks/pages/admin-user/default.html), [`pages/admin-user/suspended`](../../mocks/pages/admin-user/suspended.html), [`pages/admin-user/unverified`](../../mocks/pages/admin-user/unverified.html), [`pages/admin-user/deactivated`](../../mocks/pages/admin-user/deactivated.html), [`pages/admin-user/last-admin`](../../mocks/pages/admin-user/last-admin.html), [`pages/admin-user/loading`](../../mocks/pages/admin-user/loading.html), [`dialogs/unfollow/default`](../../mocks/dialogs/unfollow/default.html) |
| Rendering | [`profile-header.html`](profile-header.html) |

## Purpose and scope

The profile header is the top of a page that is about one person: a public expert's profile
(`/experts/{slug}`) and an administrator's view of a member's account (`/admin/users/{id}`). It shows a
96 px portrait (or a tile with the person's initials, or a mark for a thing), the person's name as the
page's `h1`, one muted line of context (a professional title and affiliation, an email address), a row
of facts ("1,284 followers", "7 published items", an account-state badge) and the actions that belong to
the whole page (Follow, Edit roles).

Use the [page header](page-header.md) for an ordinary screen's title, the [person list](person-list.md)
for a person inside a list, and the [avatar](avatar.md) for a person's small square beside a comment or
in the top bar.

Out of scope:

- The Follow toggle: its label, `aria-pressed`, its busy and rate-limited states, the unfollow dialog and
  the live status message "Following. You'll hear when Dr. Mensah publishes or announces an event."
  The page owns them and projects them into the actions slot (see D-6).
- The rate-limit [alert](alert.md) that follows the header, and the account actions' dialogs.
- Whether a member may see an action and what it does: the page.
- Formatting follower counts, dates and roles: the page formats them with the locale and hands the
  header finished text (D-4).
- Moving focus to the `h1` after navigation: the shell's route focus (`L2-126`).
- The photo upload square in the studio profile form: the [photo edit](photo-edit.md) component.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/expert-profile/default`, `following`, `rate-limited` | photo, `top` md | name "Dr. Abena Mensah"; sub "Associate Professor of Systematic Theology, Kingsgate Theological College"; meta `people` "1,284 followers" and `course` "7 published items"; actions Follow (primary toggle) | default; following (count 1,285, quiet "Following" and a status line); rate-limited (Follow `aria-disabled`) | canvas |
| `pages/expert-profile/long` | photo, `top` md | "The Rev. Canon Dr. Thomas Alexander Hale-Whitcombe"; a 155-character sub; "2,317 followers", "13 published items"; Follow | default, wrapping at 320 px | canvas |
| `pages/expert-profile/empty` | photo, `top` md | "Dr. Mei Lin Chen"; "Data scientist, fairness and human dignity"; "12 followers", "No published items yet"; Follow | default | canvas |
| `pages/expert-profile/loading` | `loading`, `busyActions` 1 | status "Loading Dr. Abena Mensah's profile…"; hidden `h1` "Expert profile" | loading | canvas |
| `pages/admin-user/default`, `last-admin` | photo, `top` sm | "Miriam Clarke" and "Isaac Moreau"; sub is the email; meta badge success "Active", "Learner" or "Learner, Editor, Administrator", "Joined Mon 2 Mar 2026"; actions "Edit roles" (primary), "Force password reset", "Revoke all sessions" (quiet) | default | canvas (admin layout column) |
| `pages/admin-user/suspended`, `unverified`, `deactivated` | initials tile with a tone, `top` sm | "Samuel Okafor" (clay), "Ethan Wu" (fjord), "Peter Lindqvist" (oat); meta badge danger "Suspended until Tue 20 Oct 2026", warning "Unverified", neutral "Deactivated, purge Wed 4 Nov 2026"; actions "Reactivate", "Resend verification" or only "See audit entries" | default | canvas |
| `pages/admin-user/loading` | `loading`, `busyActions` 3, `top` sm | status "Loading the account…"; hidden `h1` "User account" | loading | canvas |
| `dialogs/unfollow/*`, `dialogs/edit-roles/*`, `dialogs/user-action/*`, `dialogs/revoke-certificate/*` | as the page behind | the page's header drawn inert behind the dialog | default | canvas (inert, behind a backdrop) |
| `pages/studio-profile/onboarding` | not used; the photo-edit block draws its own tile with the initials class | initials "MC" | — | form surface |

The dialog mocks draw the page behind as a picture with a `p` for the name, an empty `alt` and an inert
span for the button, so the dialog's title is the document's only `h1` (D-2). The mock for the studio
form reuses the initials class for a different component (D-10). Every other row is buildable with the
API below; `docs/design-system/components/profile-header.html` also shows a project mark and a person
without a photo, which the API covers (`mark`, `initials`).

## Anatomy

1. **Container** — `header.profile-head`, a one-column grid with `--space-6` gaps and a size container, so
   it responds to the width of its own column.
2. **Who** — `div.profile-head__who`: the tile and the text side by side, centred, `--space-5` apart.
3. **Tile** — exactly one of `img.profile-head__photo`, `span.profile-head__initials` or
   `span.profile-head__mark`. The photo is 96 px square with `--radius-lg`. Initials and mark sit on a
   tone tile (`tile--sage`, `tile--clay`, `tile--fjord`, `tile--oat`) in the light display face.
4. **Text** — `div.profile-head__text`, a grid with `--space-2` gaps that may shrink below its content
   (`min-width: 0`).
5. **Name** — `h1.profile-head__name`, the page's only `h1`, in the display face at the h1 size.
6. **Sub** — `p.profile-head__sub`, one muted sentence (a title and affiliation, or an email address).
7. **Meta (optional)** — `p.profile-head__meta`: a wrapping row of facts. Each fact is a `span` with a
   small icon and text, a `span.badge` with a tone, or plain text.
8. **Actions (optional)** — `div.profile-head__actions`: a wrapping row below the text for the page's
   buttons and an optional inline status.
9. **Loading** — `aria-busy="true"` on the container, a visually hidden status and `h1`, and skeletons in
   place of the tile, the text lines and the actions.

Host: `ll-profile-header` is `display: contents` and renders the container.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `name` | `string` | — | yes | The `h1` text, rendered as text, never as markup (`L2-013`). It is also the photo's `alt` and the source of the derived initials. While `loading`, it is the generic page name in the visually hidden `h1` ("Expert profile"). |
| `photoUrl` | `string \| null` | `null` | no | Renders `img.profile-head__photo` with `width="96"` and `height="96"`, `alt` set to `name`, not lazy loaded. When the image fails to load, the tile falls back to the initials (D-3). |
| `initials` | `string \| null` | `null` | no | The letters on the initials tile, one to three. `null` derives them from `name` (D-1). Used when there is no `photoUrl` and no `mark`. |
| `mark` | `string \| null` | `null` | no | One or two letters for a thing rather than a person; renders `span.profile-head__mark` instead of initials. A `photoUrl` takes precedence over a `mark`, a `mark` over initials. |
| `tone` | `ProfileHeaderTone \| null` | `null` | no | The tile of initials and marks: `'sage' \| 'clay' \| 'fjord' \| 'oat'`. `null` picks one from `name` with a stable hash, so a person has the same tone everywhere (D-1). |
| `sub` | `string \| null` | `null` | no | Renders `p.profile-head__sub`. Long text wraps. |
| `meta` | `readonly ProfileMeta[]` | `[]` | no | The facts row. An empty array renders no `p.profile-head__meta`. |
| `top` | `'md' \| 'sm'` | `'md'` | no | Space above: `md` `--space-12` (a profile page under a breadcrumb), `sm` `--space-6` (the admin column). `sm` adds `.profile-head--top-sm` (D-5). |
| `loading` | `boolean` | `false` | no | Renders the skeleton form (see Loading) and sets `aria-busy="true"`; `meta`, `sub`, the photo and the actions slot are not rendered. |
| `busyMessage` | `string \| null` | `null` | no | While `loading`, a visually hidden `p[role=status]` ("Loading Dr. Abena Mensah's profile…"). |
| `busyActions` | `0 \| 1 \| 2 \| 3` | `1` | no | While `loading`, how many pill skeletons stand in for the actions. |

```ts
// profile-meta.ts
export interface ProfileMeta {
  readonly text: string;            // finished, translated, locale-formatted text
  readonly icon?: IconName;         // renders svg[llIcon] size sm before the text
  readonly badge?: BadgeTone;       // renders span[llBadge] with this tone instead of an icon; wins over icon
}
```

```ts
// profile-header-tone.ts
export type ProfileHeaderTone = 'sage' | 'clay' | 'fjord' | 'oat';
```

### Outputs

None. Every control is the page's own button or link, so the page handles their events. The header has no
state of its own beyond the photo-error fallback.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| `[slot=actions]` | `a[llButton]`, `button[llButton]`, one `p[llInlineStatus]` | Rendered inside `div.profile-head__actions`, in order. The div is hidden when nothing is projected. Projected nodes are never re-created when other inputs change, so a focused button keeps focus (`L2-126`). |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Photo | `.profile-head__photo` | A person with a photo. |
| Initials | `.profile-head__initials` + `.tile--*` | A person without a photo, or whose photo failed to load. |
| Mark | `.profile-head__mark` + `.tile--*` | A thing (a collection, Logos Lab itself) that has no portrait. |

| Top | Modifier | Padding top | Padding bottom |
|---|---|---|---|
| md (default) | — | `--space-12` | `--space-8` |
| sm | `.profile-head--top-sm` | `--space-6` | `--space-8` |

| Tile size | Where | Size | Type |
|---|---|---|---|
| Large | container 34rem and wider | `--space-24` square | `--font-size-3xl` light display |
| Compact | container narrower than 34rem | `--space-16` square | `--font-size-2xl` light display |

There is one size otherwise: a smaller summary of a person is an avatar or a person-list row.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | rendered | tile, name, sub, meta, actions | `h1` is the name; photo `alt` is the name; meta icons hidden |
| Initials / mark | no `photoUrl`, or the photo failed | tone tile with letters | tile `aria-hidden="true"`; the `h1` names the person |
| Following | the page projects the quiet "Following" toggle and a status line | actions row shows "Following" and a success status line | toggle `aria-pressed="true"`; the status line is `role="status"` |
| Rate-limited | the page projects Follow with `aria-disabled="true"` | Follow stays primary but inert; the alert after the header explains | `aria-describedby` points at the alert |
| No meta | `meta` is empty | no meta row | — |
| No actions | nothing projected | no actions row, no extra gap | — |
| Loading | `loading` | photo skeleton, three text lines, pill skeletons | `aria-busy="true"`; the status is read once; skeletons hidden; hidden `h1` stays |
| Action focus | `:focus-visible` on a projected control | the button's focus ring | per control |

## Markup

```html
<!-- rendered: expert, photo (pages/expert-profile/default) -->
<header class="profile-head">
  <div class="profile-head__who">
    <img class="profile-head__photo" src="…/amara-osei.jpg" width="96" height="96" alt="Dr. Abena Mensah">
    <div class="profile-head__text">
      <h1 class="profile-head__name">Dr. Abena Mensah</h1>
      <p class="profile-head__sub">Associate Professor of Systematic Theology, Kingsgate Theological College</p>
      <p class="profile-head__meta">
        <span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true">…</svg>1,284 followers</span>
        <span><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true">…</svg>7 published items</span>
      </p>
    </div>
  </div>
  <div class="profile-head__actions">
    <a class="btn btn--primary" href="…" aria-pressed="false" role="button">Follow</a>
  </div>
</header>
```

```html
<!-- rendered: following (pages/expert-profile/following); the page owns the actions -->
<div class="profile-head__actions">
  <a class="btn btn--quiet" href="…" aria-pressed="true" role="button"><svg class="icon icon--sm" aria-hidden="true">…</svg>Following</a>
  <p class="inline-status inline-status--success" role="status"><svg class="icon icon--sm" aria-hidden="true">…</svg>Following. You'll hear when Dr. Mensah publishes or announces an event.</p>
</div>
<!-- rendered: rate-limited (pages/expert-profile/rate-limited) -->
<div class="profile-head__actions">
  <button type="button" class="btn btn--primary" aria-pressed="false" aria-disabled="true" aria-describedby="limit-alert">Follow</button>
</div>
```

```html
<!-- rendered: initials, admin account (pages/admin-user/suspended) -->
<header class="profile-head profile-head--top-sm">
  <div class="profile-head__who">
    <span class="profile-head__initials tile--clay" aria-hidden="true">SO</span>
    <div class="profile-head__text">
      <h1 class="profile-head__name">Samuel Okafor</h1>
      <p class="profile-head__sub">samuel.okafor@example.ca</p>
      <p class="profile-head__meta"><span class="badge badge--danger">Suspended until Tue 20 Oct 2026</span><span>Learner</span><span>Joined Sun 2 Aug 2026</span></p>
    </div>
  </div>
  <div class="profile-head__actions"><button class="btn btn--primary" type="button">Reactivate</button><a class="btn btn--quiet" href="…">Edit roles</a>…</div>
</header>
<!-- rendered: mark (a thing, not a person) -->
<span class="profile-head__mark tile--oat" aria-hidden="true">LL</span>
```

```html
<!-- rendered: loading (pages/expert-profile/loading, pages/admin-user/loading) -->
<header class="profile-head" aria-busy="true">
  <p class="vh" role="status">Loading Dr. Abena Mensah's profile…</p>
  <h1 class="vh">Expert profile</h1>
  <div class="profile-head__who" aria-hidden="true">
    <span class="skeleton profile-head__photo"></span>
    <div class="profile-head__text"><span class="skeleton skeleton--title"></span><span class="skeleton skeleton--text"></span><span class="skeleton skeleton--text is-short"></span></div>
  </div>
  <div class="profile-head__actions" aria-hidden="true"><span class="skeleton skeleton--pill"></span></div>
</header>
```

```html
<!-- consumer -->
<ll-profile-header [name]="expert.name" [photoUrl]="expert.photoUrl" [sub]="expert.title + ', ' + expert.affiliation"
                   [meta]="meta()" [loading]="loading()" [busyMessage]="busyMessage()">
  <a llButton slot="actions" variant="primary" [pressed]="following()" (click)="toggleFollow()" i18n>Follow</a>
  @if (message()) { <p slot="actions" llInlineStatus tone="success" live="polite">{{ message() }}</p> }
</ll-profile-header>
```

## Design

- Container: grid, gap `--space-6`, padding-block `--space-12` above and `--space-8` below (`--space-6`
  above for `top="sm"`), `container-type: inline-size`.
- Who: flex, centred, gap `--space-5`. Text: grid, gap `--space-2`, `min-width: 0`, grows to fill.
- Tile: `--space-24` square, `--radius-lg`, `object-fit: cover`, photo placeholder `--color-bg-subtle`.
  Initials and mark: centred, `--font-weight-light` at `--font-size-3xl`, display face, `--color-tile-fg`.
- Name: `--text-h1` with `--letter-spacing-tight`, `overflow-wrap: break-word`. Sub: the body style in
  `--color-fg-muted`. Meta: `--text-body-sm` in `--color-fg-muted`, flex wrap, gap `--space-2` by `--space-4`;
  each item inline flex, gap `--space-2`.
- Actions: flex wrap, gap `--space-3`.
- Below 34rem of the container's own width: the who row becomes a column (gap `--space-4`), the tile
  shrinks to `--space-16` with `--font-size-2xl`, and the name drops to `--font-size-3xl`.
- Loading: shapes in `--color-bg-subtle`; the photo skeleton keeps the 96 px tile so the swap does not
  shift the layout.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Name | `--color-fg-default` | default foreground | default foreground |
| Sub, meta | `--color-fg-muted` | muted foreground | muted foreground |
| Photo placeholder, skeleton | `--color-bg-subtle` | subtle background | subtle background |
| Initials and mark glyph | `--color-tile-fg` | tile glyph role | tile glyph role |
| Tiles | `--color-tile-sage`, `--color-tile-clay`, `--color-tile-fjord`, `--color-tile-oat` | tile roles | tile roles |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | Name |
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Sub line and meta |
| `--color-tile-fg` | `--color-tile-sage` | 4.5:1 | Initials on sage |
| `--color-tile-fg` | `--color-tile-clay` | 4.5:1 | Initials on clay |
| `--color-tile-fg` | `--color-tile-fjord` | 4.5:1 | Initials on fjord |
| `--color-tile-fg` | `--color-tile-oat` | 4.5:1 | Initials on oat |

Photos are never filtered in the dark theme. Badges and the inline status take their colours from their
own components.

## Responsive behaviour

- The header responds to the width of its own container, not the viewport: below 34rem (every phone, and
  a narrow column on a wide screen) the tile is `--space-16` and sits above the name, which uses
  `--font-size-3xl`, so a long name wraps between words. From 34rem the 96 px tile sits beside the name.
- The actions always sit below the text and wrap onto more lines; they never shrink below 44 px tall on
  touch viewports (the button's rule, `L2-132`).
- The meta row wraps item by item; a long badge ("Suspended until Tue 20 Oct 2026") wraps inside itself
  rather than overflow.
- The header stays one left-aligned column at every width, so the name lines up with the content beneath.
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom everything stays available; at 400 % at
  1280 px the header reflows to the compact layout with nothing lost.

## Accessibility

### Role and pattern

A `header` inside `main` (no landmark role) holding the page's only `h1`. Plain content: the facts are
paragraphs and spans, the actions are the page's own controls.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Reaches the projected actions in reading order; the header has no stop of its own. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Activates the focused action (the button's behaviour). |

### Focus

Nothing is focusable in the header itself. A projected control keeps focus through updates of `meta` and
`sub` (follower counts change when Follow is pressed), and when the unfollow dialog closes the page returns
focus to the "Following" button.

### Labelling

- The photo's `alt` is the person's name (`L2-021`). Initials and marks are `aria-hidden="true"` because
  the `h1` says the name.
- Meta icons are `aria-hidden="true"`; a fact is read as its text ("1,284 followers"). A badge states the
  account state in words.
- The document `<title>` starts with the same words as the `h1` ("Dr. Abena Mensah - Logos Lab").

### Announcements

A loading header announces its `busyMessage` once, politely; skeletons are hidden. A status line the page
projects ("Following. You'll hear …") is a polite live region inserted after the action, without moving
focus.

### Motion

Skeletons breathe; reduced motion stops them.

## Content and internationalisation

- The name is the heading: "Dr. Abena Mensah", never "Profile of …". The sub is one sentence or phrase:
  "Data scientist, fairness and human dignity". A long biography belongs in the page body.
- Meta items are facts with units in words ("7 published items", "No published items yet"), not a bare
  number. Numbers and dates arrive formatted for the locale ("1,284 followers", "Joined Mon 2 Mar 2026").
- Action labels name the action ("Follow", "Edit roles").
- Translatable inputs: `sub` (for fixed copy), `meta[].text`, `busyMessage`. Data values: `name`,
  `initials`, `mark`, `photoUrl`, and the title, affiliation and email put in `sub`.

## Performance

- Change detection: `OnPush`, signal inputs; no timers. The photo error handler is a single listener.
- Perf-test scenario: `frontend/projects/perf-test/src/scenarios/ProfileHeader.ts` renders Dr. Abena Mensah
  with a photo, two meta items and a Follow button; iterations in
  `e2e/perf-test/config/scenario-iterations.mjs` keep it at roughly 100–300 ms.
- Composite scenarios: DarkTheme.
- Layout stability: the photo carries `width` and `height` (`L2-120`); the loading header keeps the same
  tile size, so the swap shifts little.

## Acceptance criteria

### Rendering

- **AC-1** Given an anonymous visitor opens Dr. Abena Mensah's profile, when it renders, then the header shows her photo, the `h1` "Dr. Abena Mensah", the sub "Associate Professor of Systematic Theology, Kingsgate Theological College", the facts "1,284 followers" and "7 published items", and a "Follow" button. (L2-021)
- **AC-2** Given Dr. Mensah's photo, when the header renders, then the image is 96 by 96 CSS px with its width and height set, is not lazy loaded and its `alt` is "Dr. Abena Mensah". (L2-120)
- **AC-3** Given Dr. Mei Lin Chen has no photo, when her profile renders with tone sage, then the tile shows the initials "MC" on the sage tile, hidden from assistive technology, and the `h1` "Dr. Mei Lin Chen" beside it. (L2-127)
- **AC-4** Given Dr. Abena Mensah's photo URL fails to load, when the browser reports the error, then the tile shows the initials "AM" in place of the photo and the header keeps its size. (L2-141)
- **AC-5** Given a collection page with `mark` "LL" and tone oat, when it renders, then the tile shows "LL" as a mark hidden from assistive technology and the `h1` carries the name. (L2-127)
- **AC-6** Given an administrator opens Miriam Clarke's account, when the page renders, then the header has `--space-6` above, her photo, the `h1` "Miriam Clarke", the sub "miriam.clarke@example.ca", a success badge "Active", the facts "Learner" and "Joined Mon 2 Mar 2026", and the actions "Edit roles", "Force password reset" and "Revoke all sessions". (L2-095)
- **AC-7** Given an administrator opens Samuel Okafor, Ethan Wu and Peter Lindqvist, when each account renders, then the badge reads "Suspended until Tue 20 Oct 2026" (danger), "Unverified" (warning) and "Deactivated, purge Wed 4 Nov 2026" (neutral), each beside an initials tile "SO", "EW" and "PL", and the first action is "Reactivate", "Resend verification" and "See audit entries". (L2-095)
- **AC-8** Given a member whose display name is `<b>Samuel</b> Okafor`, when the header renders, then the `h1` shows those characters literally and creates no element. (L2-013)
- **AC-9** Given Dr. Mensah in the fr-CA locale, when the page passes "1 284 abonnés" and "7 éléments publiés", then the header shows each text exactly as given and formats nothing itself. (L2-148)
- **AC-10** Given Dr. Mei Lin Chen has published nothing, when her profile renders, then the facts read "12 followers" and "No published items yet", and the Follow button is shown. (L2-021)
- **AC-11** Given a header with no `meta` and nothing projected in the actions slot, when it renders, then neither the facts row nor the actions row exists and no empty gap shows. (L2-130)

### States

- **AC-12** Given Miriam presses "Follow" on Dr. Mensah's profile, when the follow succeeds, then the page re-renders the header with "Following" and "1,285 followers", the same header element and the focused button are kept, and the status line "Following. You'll hear when Dr. Mensah publishes or announces an event." appears beside the button. (L2-024)
- **AC-13** Given Miriam has followed and unfollowed Dr. Mensah more than 10 times in a minute, when the profile shows, then "Follow" is `aria-disabled="true"` and described by the alert "Give it a minute", and the header layout is unchanged. (L2-024)
- **AC-14** Given Dr. Mensah's profile while it loads, when the header renders with `loading`, then it has `aria-busy="true"`, a skeleton tile, three skeleton lines and one skeleton pill, and no photo, sub, facts or actions. (L2-127)
- **AC-15** Given an account while it loads, when the header renders with `busyActions` 3 and `top` sm, then three pill skeletons stand in for the actions and the status "Loading the account…" is the only text read. (L2-127)
- **AC-16** Given Dr. Mensah's profile, when the loading header is replaced by the loaded one, then the cumulative layout shift stays within 0.1 because the tile keeps its 96 px square. (L2-120)

### Keyboard and focus

- **AC-17** Given Miriam on Dr. Mensah's profile, when she tabs forward from the breadcrumb, then focus reaches "Follow" next with a visible focus ring at least 2 CSS px thick and 3:1 against the canvas. (L2-126)
- **AC-18** Given Miriam follows Dr. Mensah and presses "Following", when she chooses "Keep following" in the dialog, then the dialog closes and focus returns to "Following" in the header, whose element was never re-created. (L2-126)

### Screen readers

- **AC-19** Given any profile page, when its headings are listed, then the header's name is the page's only `h1`, the photo is announced as "Dr. Abena Mensah", and the meta icons and initials are not announced. (L2-127)
- **AC-20** Given Miriam follows Dr. Mensah, when the status line is inserted, then it is announced once, politely, and focus stays on "Following". (L2-127)
- **AC-21** Given the Follow toggle in the header, when a screen reader reads it, then it reports "Follow, toggle button, not pressed" before following and "Following, toggle button, pressed" after. (L2-127)

### Theming

- **AC-22** Given the dark theme, when the header renders with a photo and with initials on each tone, then every colour comes from a token with a dark value and the photo is not filtered. (L2-134)
- **AC-23** Given both themes, when contrast is measured, then name and sub meet 4.5:1 on the canvas and the initials meet 4.5:1 on each tile. (L2-129)

### Responsive

- **AC-24** Given a 320 px viewport, when Dr. Thomas Alexander Hale-Whitcombe's profile renders, then the tile is 64 px above the name, "The Rev. Canon Dr. Thomas Alexander Hale-Whitcombe" wraps between words, the 155-character sub wraps, and nothing scrolls horizontally. (L2-130)
- **AC-25** Given a 1440 px viewport where the header sits in a 30rem column, when it renders, then it uses the compact layout because the container, not the viewport, is below 34rem. (L2-130)
- **AC-26** Given a 375 px viewport, when "Edit roles", "Force password reset" and "Revoke all sessions" render, then they wrap onto further lines and each is at least 44 CSS px tall. (L2-132)
- **AC-27** Given the pseudo-locale with strings 30 % longer, when the admin header for Samuel Okafor renders at 320 px and at 1440 px, then the badge, facts, sub and actions wrap and none is clipped. (L2-150)
- **AC-28** Given the browser zoomed to 400 % at 1280 px, when the profile header renders, then it reflows into one column with no horizontal scroll and no lost content. (L2-129)

### Motion

- **AC-29** Given reduced motion, when a loading header renders, then its skeletons do not animate. (L2-129)

## Implementation notes

- Planned. Folder `frontend/projects/components/src/lib/profile-header/`: `profile-header.ts`
  (`ProfileHeader`, selector `ll-profile-header`), `profile-meta.ts` (`ProfileMeta`),
  `profile-header-tone.ts` (`ProfileHeaderTone`), `profile-header.html`, `profile-header.scss` from the
  `profile-header` block of `components.css`, plus `.profile-head--top-sm` and `.profile-head__actions:empty`
  (D-5, D-8). Export all three types from the library's `public-api.ts`.
- Compose `svg[llIcon]` for fact icons, `span[llBadge]` for fact badges and `span[llSkeleton]` for the
  loading shapes; the actions slot takes `a[llButton]`, `button[llButton]` and `p[llInlineStatus]`.
- Derive initials and the default tone in the component (a pure function in its own file if it grows);
  `name` is rendered through text interpolation only.
- Use `(error)` on the `img` to flip a signal that swaps to the initials tile.
- The design-system page shows a "More" menu and an "Online now" presence status that no mock or L2 uses.
  They are not in this API; if a later screen needs them they arrive as projected actions content (the page
  can project a `details.more`) and as one more `ProfileMeta` kind, with this CRD changing first.
- The page-behind pictures in `dialogs/*` and the mock loading markup differ from the loading form here
  (`div` versus `header`, two versus three text lines); mocks catch up with the CRD.

## Decisions

- **D-1** *Which initials and which tone?* `initials` is explicit when the page passes it; otherwise the
  component takes the first letter of the first and of the last word of `name` after dropping words that end
  in a full stop ("Dr. Mei Lin Chen" gives "MC", "Peter Lindqvist" gives "PL"), matching the mocks. The
  [avatar](avatar.md) takes the first two words ("ML" for the same name); the two differ for three-word names
  and the avatar CRD should adopt this rule (an explicit `initials` input also covers a name with
  unpunctuated titles, "The Rev. Canon Dr. Thomas Alexander Hale-Whitcombe"). With no `tone`, one of the four
  tones is picked by a stable hash of `name`, as the design system says ("chosen from the name"), and the
  page overrides it when a mock fixes it (clay for Samuel Okafor).
- **D-2** *Name as `h1` or as `p` (the dialog mocks)?* Always an `h1`; there is no heading-level input. The
  dialog mocks draw the page behind with a `p`, an empty `alt` and an inert span so the dialog's title is the
  only `h1` of the picture; in the product the page keeps its `h1` and the CDK dialog makes it inert, as the
  [page header](page-header.md) decides (its D-2). The dialog rows therefore need no smaller size or other
  variant, and the photo stays 96 px there as in the mocks.
- **D-3** *What if the photo fails to load?* The tile falls back to the initials tile, keeping the header's
  shape (the design system: "give a missing photo its initials"). No mock shows it.
- **D-4** *Who formats meta text?* The page, with the locale's number and date formatting (`L2-148`); the
  header renders `ProfileMeta.text` as given. This keeps the component free of locale logic and lets "No
  published items yet" replace "0 published items" without a rule inside it.
- **D-5** *What replaces the admin mocks' inline `padding-top: var(--space-6)`?* A `top` input with two
  steps: `md` the block's own `--space-12`, `sm` `--space-6` as `.profile-head--top-sm`. The design system
  page should add the modifier; the rendering shows it as a specimen-only style.
- **D-6** *Does the header own the Follow toggle?* No. It hosts the page's controls in `[slot=actions]`, so
  the same header serves Follow, Following, rate-limited and the admin actions, and the page keeps the
  toggle state, the unfollow dialog and the status message. The status line lives inside the actions row,
  as the following mock shows, so it wraps with the buttons.
- **D-7** *Alt text.* The photo's `alt` is always `name` (`L2-021`). The admin-user mocks and the design
  system say "Portrait of Miriam Clarke"; the single rule wins, and the mocks catch up. Adjacent identical
  text (photo `alt` and `h1`) is the requirement's own.
- **D-8** *Empty slots.* The actions div and the meta row take no space when empty: the meta row is not
  rendered for an empty array, and the actions div hides with `:empty` (Angular leaves no whitespace node
  in an empty projection).
- **D-9** *Loading form.* One form for both pages: `header.profile-head[aria-busy]` containing the hidden
  status, a hidden `h1` with `name`, a skeleton tile and three text lines (title, line, short line) that
  hold a long title and sub, and `busyActions` pills. This replaces the expert mock's `div` with a
  `skeleton-card` and the admin mock's `aria-hidden` header with no status inside the component. The
  page's `h1.vh` ("Expert profile", "User account") moves into the component through `name`.
- **D-10** *Mark and the studio form's initials class.* The design system defines `__mark` for things and
  no mock uses it; it stays so a collection or Logos Lab page needs no new API. The studio profile form
  uses `profile-head__initials` for its photo-edit tile; the photo-edit block owns that square (its CRD),
  so the profile header does not.
- **D-11** *Meta as an input, not a slot.* The inventory needs icon facts and tone badges; one typed input
  keeps the icon size, gap and hiding rules inside the component and lets an empty list remove the row.
  A fact with a `badge` renders the badge instead of an icon.
- **D-12** *Perf scenario.* Named `ProfileHeader` and renders the expert profile header, the case with the
  photo, the longest text and a button.
