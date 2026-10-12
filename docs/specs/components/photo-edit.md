# Photo edit

| Field | Value |
|---|---|
| Selector | `ll-photo-edit` |
| Library path | `frontend/projects/components/src/lib/photo-edit/` |
| Status | planned |
| Traces to | L2-013, L2-023, L2-108, L2-126, L2-127, L2-130, L2-134, L2-150 |
| Design system | [`file-upload.html`](../../design-system/components/file-upload.html) (photo) |
| Source mocks | [`pages/settings-profile/default`](../../mocks/pages/settings-profile/default.html), [`pages/studio-profile/default`](../../mocks/pages/studio-profile/default.html), [`pages/studio-profile/onboarding`](../../mocks/pages/studio-profile/onboarding.html), [`dialogs/avatar-upload/crop`](../../mocks/dialogs/avatar-upload/crop.html), [`dialogs/avatar-upload/success`](../../mocks/dialogs/avatar-upload/success.html) |
| Rendering | [`photo-edit.html`](photo-edit.html) |

## Purpose and scope

The photo edit shows a member's or expert's current square photo beside the controls that change it.
With no photo it shows their initials on a tinted tile. It appears in Profile settings, in the expert's
Studio profile and inside the avatar upload dialog, where it previews the cropped photo and confirms the
update.

Out of scope:

- Choosing, cropping and uploading the file: the avatar upload dialog with the file upload and slider.
- The rules text and the status line: the consumer projects them into `[slot=text]`.
- Computing initials and choosing the tile: the same rules as the [avatar](avatar.md) (`name`, `tone`).

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/settings-profile/*` | photo `hannah-kowalski.jpg`, alt "Miriam Clarke's current photo", group labelled by the field label "Photo" | action "Change photo" (quiet, sm, opens the dialog); help "JPEG, PNG or WebP, up to 5 MB and at least 128 × 128 pixels. We crop it to a square and remove location data." | default, long | surface (form card) |
| `pages/studio-profile/default` | photo `amara-osei.jpg`, alt "Your current photo" | help "JPEG or PNG, at least 400 by 400. Shown square, with your name as its description."; action "Change photo" | default | surface |
| `pages/studio-profile/onboarding` | no photo, initials "MC" on sage | help "No photo yet. A clear, recent portrait works best."; action "Add a photo" | empty | surface |
| `dialogs/avatar-upload/crop` | preview, alt "Preview of your new photo, cropped to a square" | help "This is how your photo appears beside your name. Drag the photo to move it inside the square." | default | dialog |
| `dialogs/avatar-upload/success` | new photo, alt "Your new photo" | status "Photo updated" (success inline status); help "It now shows on your profile, comments and cohort posts…" | success | dialog |
| `dialogs/avatar-upload/*` behind the dialog | photo, `alt=""` (decorative copy of the page's) | action "Change photo" | default | surface |
| design system file upload · photo | photo `amara-osei.jpg` | actions "Change photo" and "Remove"; help | default | surface |

## Anatomy

1. **Row** — `div.photo-edit`: a wrapping flex row, centred, gap `--space-5`; a `role="group"` named by
   `labelledBy` when it stands for a field.
2. **Photo** — `img.photo-edit__img`, 96 × 96 (`--space-24`), `--radius-lg`, `object-fit: cover` on
   `--color-bg-subtle`.
3. **Initials (no photo)** — `span.photo-edit__img.photo-edit__initials` with a `.tile--*` class,
   `aria-hidden="true"`: the same square holding the initials in the display face.
4. **Text** — `div.photo-edit__text`: a start-aligned grid, gap `--space-2`, holding the projected
   help, status and actions in source order.

Host: `ll-photo-edit` is `display: contents` and renders the row.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `photoUrl` | `string \| null` | `null` | no | Renders the photo; `null` renders the initials tile. |
| `alt` | `string` | `''` | no | The photo's text alternative ("Miriam Clarke's current photo"); empty when the photo is a decorative copy. |
| `name` | `string` | — | yes | The person's name, for the initials (avatar rules: first letters of the first two name words, skipping titles). |
| `tone` | `'sage' \| 'clay' \| 'fjord' \| 'oat'` | `'sage'` | no | The initials tile. |
| `labelledBy` | `string \| null` | `null` | no | The id of the field label ("Photo"): the row gets `role="group"` and `aria-labelledby`. |

### Outputs

None. The projected buttons carry their own handlers.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | help paragraphs (`p.field__help`), an inline status, buttons and button links (`button[llButton]`, `a[llButton]` quiet or text, size `sm`), a `div.cluster` of several actions | Rendered inside `div.photo-edit__text` in source order; the mocks put the action first or the help first, and both are kept. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Photo | `img.photo-edit__img` | A member or expert with a photo. |
| Initials | `.photo-edit__initials` + `.tile--*` | No photo yet. |

One size: the image is `--space-24` square.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | `photoUrl` set | photo beside the text | image with its `alt`; group named "Photo" when `labelledBy` |
| Empty | `photoUrl` null | initials tile beside the text | tile hidden; the help says there is no photo |
| Loading photo | image still downloading | `--color-bg-subtle` square holds the space | same |
| Success | consumer projects a success status | photo with "Photo updated" | the status is read politely |

## Markup

```html
<!-- rendered: settings profile -->
<div class="photo-edit" role="group" aria-labelledby="photo-label">
  <img class="photo-edit__img" src="/media/hannah-kowalski.jpg" width="96" height="96" alt="Miriam Clarke's current photo">
  <div class="photo-edit__text">
    <button class="btn btn--quiet btn--sm" type="button">Change photo</button>
    <p class="field__help">JPEG, PNG or WebP, up to 5 MB and at least 128 × 128 pixels. We crop it to a square and remove location data.</p>
  </div>
</div>

<!-- rendered: no photo -->
<div class="photo-edit">
  <span class="photo-edit__img photo-edit__initials tile--sage" aria-hidden="true">MC</span>
  <div class="photo-edit__text">
    <p class="field__help">No photo yet. A clear, recent portrait works best.</p>
    <button class="btn btn--quiet btn--sm" type="button">Add a photo</button>
  </div>
</div>
```

```html
<!-- consumer -->
<ll-photo-edit [photoUrl]="member.avatarUrl" [name]="member.displayName" alt="{{ member.displayName }}'s current photo" labelledBy="photo-label">
  <button llButton variant="quiet" size="sm" type="button" (click)="openAvatarUpload()">Change photo</button>
  <p class="field__help">JPEG, PNG or WebP, up to 5 MB and at least 128 × 128 pixels…</p>
</ll-photo-edit>
```

## Design

- Row: flex, wrap, `align-items: center`, gap `--space-5`.
- Image and initials: `--space-24` square, `--radius-lg`, `flex: none`; the photo is `object-fit:
  cover` on `--color-bg-subtle`; initials are centred in `--font-family-display`, `--font-weight-light`,
  `--font-size-3xl`, in `--color-tile-fg` on the tile colour.
- Text column: grid, gap `--space-2`, `justify-items: start`; help in `--text-body-sm`
  `--color-fg-muted`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Photo placeholder | `--color-bg-subtle` | subtle background | subtle background |
| Initials tile | `--color-tile-sage` | sage tile | sage tile |
| Initials | `--color-tile-fg` | tile foreground | tile foreground |
| Help | `--color-fg-muted` | muted foreground | muted foreground |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-tile-fg` | `--color-tile-sage` | 4.5:1 | Initials |
| `--color-fg-muted` | `--color-bg-surface` | 4.5:1 | Help text |

## Responsive behaviour

- The text column sits beside the photo while it fits and wraps under it otherwise (a long help
  paragraph wraps at every width); the action stays start-aligned.
- At 320 px nothing scrolls horizontally or clips; the action keeps a 44 × 44 CSS px target on touch.

## Accessibility

### Role and pattern

A group (`role="group"` with `aria-labelledby`) when it stands for the "Photo" field; otherwise a plain
row. The photo is an image with a meaningful `alt` or, when it repeats one shown elsewhere, `alt=""`.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Moves through the projected actions in source order. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Activates the focused action ("Change photo" opens the upload dialog). |

### Focus

The component takes no focus; projected buttons show their own focus ring. When the upload dialog
closes, focus returns to "Change photo" (the dialog's job).

### Labelling

The group is named by the field label "Photo"; each action is named by its text.

### Announcements

A projected status ("Photo updated") is a polite live region.

### Motion

None.

## Content and internationalisation

- The help states the file rules plainly (types, size, minimum pixels, what happens to the photo).
- Alt text names whose photo it is ("Miriam Clarke's current photo"), never "image of".
- Translatable: `alt` and the projected help and action labels. Data values: `name`, `photoUrl`.
- A display name with HTML or script renders as literal text in `alt` and the initials (L2-013 AC4).

## Performance

- `OnPush`, signal inputs. The image has `width` and `height` 96, so it reserves its box and causes no
  layout shift.
- Perf-test scenario: none in this repository yet; the settings profile renders Miriam's photo.

## Acceptance criteria

### Rendering

- **AC-1** Given Miriam opens Profile settings, when the photo field renders, then her photo shows square, followed by "Change photo" and the help "JPEG, PNG or WebP, up to 5 MB and at least 128 × 128 pixels. We crop it to a square and remove location data." (L2-013)
- **AC-2** Given an expert with no photo during Studio onboarding, when the field renders, then a sage tile with "MC" stands in for the photo, hidden from assistive technology, beside "No photo yet. A clear, recent portrait works best." and "Add a photo". (L2-023)
- **AC-3** Given the avatar upload's crop step, when the preview renders, then it shows the cropped photo with the alt "Preview of your new photo, cropped to a square" and the help "This is how your photo appears beside your name…". (L2-108)
- **AC-4** Given a successful upload, when the dialog's photo edit renders with the projected status, then "Photo updated" is announced politely beside the new photo. (L2-108)

### Keyboard and focus

- **AC-5** Given the settings profile, when Tab reaches the photo field, then "Change photo" takes focus with a visible ring and Enter opens the upload dialog. (L2-126)

### Screen readers

- **AC-6** Given `labelledBy="photo-label"`, when the row is inspected, then it is a group named "Photo" containing the image "Miriam Clarke's current photo". (L2-127)
- **AC-7** Given the display name `<b>Miriam</b>`, when the photo edit renders, then the alt and the initials show the characters literally. (L2-013)

### Theming

- **AC-8** Given the dark theme, when the photo and the initials tile render, then the placeholder, tile and help use dark token values and the initials meet 4.5:1. (L2-134)

### Responsive

- **AC-9** Given a 320 px viewport, when the settings profile's photo field renders, then the text column wraps under the photo and nothing scrolls horizontally. (L2-130)

### Content

- **AC-10** Given help text 30 % longer, when the field renders at 360 px, then the help wraps and nothing is clipped. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/photo-edit/`: `photo-edit.ts` (`PhotoEdit`),
  `photo-edit.html`, `photo-edit.scss` from the `photo-edit` rules of `components.css`; the initials
  rules reuse the `profile-head__initials` values under `.photo-edit__initials`, and the tile classes
  from the shared `.tile--*` rules.
- Reuse the avatar's initials function for `name` so both read the same.
- Projected help needs `:host ::ng-deep .field__help` styles, as the form field's help.

## Decisions

- **D-1** *Initials markup?* `span.photo-edit__img.photo-edit__initials` with a tile class, instead of
  the onboarding mock's `profile-head__initials`: the photo-edit block owns its square, and the size and
  type match the profile head exactly.
- **D-2** *Actions as an input list or projected?* Projected: the mocks mix links, buttons, a cluster of
  two actions, help before or after, and a status line, and each consumer wires its own handler.
- **D-3** *Default tone?* Sage, as the onboarding mock; consumers pass the member's own tone when the API
  gives one.
