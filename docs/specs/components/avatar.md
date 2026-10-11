# Avatar

| Field | Value |
|---|---|
| Selector | `ll-avatar` |
| Library path | `frontend/projects/components/src/lib/avatar/` |
| Status | planned |
| Traces to | L2-120, L2-127, L2-129, L2-134 |
| Design system | [`avatar.html`](../../design-system/components/avatar.html) |
| Source mocks | [`pages/home/signed-in`](../../mocks/pages/home/signed-in.html), [`pages/comments/default`](../../mocks/pages/comments/default.html), [`dialogs/block-member/default`](../../mocks/dialogs/block-member/default.html), [`pages/course-overview/default`](../../mocks/pages/course-overview/default.html), [`pages/settings-blocked/default`](../../mocks/pages/settings-blocked/default.html), [`dialogs/verify-email-prompt/default`](../../mocks/dialogs/verify-email-prompt/default.html) |
| Rendering | [`avatar.html`](avatar.html) |

## Purpose and scope

An avatar is a member's small square photo, or their initials on a tinted tile when they have no photo:
in the top bar's account button, beside comments and messages, in cohort and block lists. It is always
decorative next to the person's name, which is shown or spoken beside it.

Out of scope:

- The account button that wraps it (`.avatar-btn`): the [top bar](top-bar.md).
- Expert photos in lists: the [person list](person-list.md).

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| top bar account button (`pages/home/signed-in`, every member page) | photo, md (40 px) | Miriam Clarke's photo | default | canvas |
| comments and replies (`pages/comments/*`, article and lesson discussions) | photo or initials, sm | "Samuel Okafor" initials "SO" on clay | default | surface |
| `dialogs/block-member/*`, `pages/settings-blocked/*` | initials, md, clay or fjord | "Clara Novak" "CN" | default | dialog surface |
| course and module instructors (`pages/course-overview/*`) | initials md on oat for Logos Lab | "LL" | default | canvas |
| `dialogs/verify-email-prompt/*`, account banners | initials on fjord | "MC" | default, busy | tinted |

## Anatomy

1. **Photo** — `img.avatar` (+ size), `alt=""`, square, `--radius-md`, `object-fit: cover`.
2. **Initials** — `span.avatar-initials` (+ size, + a tile class), the first letters of the name,
   `aria-hidden="true"`.

Host: `ll-avatar` is `display: contents`; it renders the image or the initials.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `name` | `string` | — | yes | Used for the initials (first letters of the first two name words, skipping titles such as "Dr."). |
| `photoUrl` | `string \| null` | `null` | no | Renders the photo; otherwise the initials. |
| `size` | `'sm' \| 'default' \| 'md' \| 'lg'` | `'default'` | no | `sm` 32 px, default 40 px, `md` 48 px, `lg` 64 px. |
| `tone` | `'sage' \| 'clay' \| 'fjord' \| 'oat'` | `'oat'` | no | The initials tile. |
| `busy` | `boolean` | `false` | no | `aria-busy="true"`: the initials tile shimmers while the person loads. |

### Outputs

None.

### Content slots

None.

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Photo | `.avatar` | A member with a photo. |
| Initials | `.avatar-initials` + `.tile--*` | A member without one. |

| Size | Modifier | Height | Padding | Type |
|---|---|---|---|---|
| sm | `.avatar--sm` | `--space-8` | — | initials `--font-size-xs` |
| default | — | `--space-10` | — | initials `--font-size-sm` semibold |
| md | `.avatar--md` | `--space-12` | — | initials `--font-size-md` |
| lg | `.avatar--lg` | `--space-16` | — | initials light `--font-size-xl` display |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Photo or initials | Hidden (decorative) |
| Busy | `aria-busy="true"` | Subtle tile shimmering, initials transparent | Hidden |

## Markup

```html
<!-- rendered: photo -->
<img class="avatar" src="…/miriam-clarke.jpg" width="40" height="40" alt="">
<!-- rendered: initials -->
<span class="avatar-initials avatar--sm tile--clay" aria-hidden="true">SO</span>
```

```html
<!-- consumer -->
<ll-avatar name="Miriam Clarke" [photoUrl]="member.avatarUrl" />
```

## Design

- `--radius-md`; sizes from the space scale; initials `--color-tile-fg` on the tile.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Initials | `--color-tile-fg` | tile glyph role | tile glyph role |
| Tiles | `--color-tile-sage`, `--color-tile-clay`, `--color-tile-fjord`, `--color-tile-oat` | tile roles | tile roles |
| Busy | `--color-bg-subtle` | `--palette-oat-200` | `--palette-night-800` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-tile-fg` | `--color-tile-clay` | 4.5:1 | Initials |
| `--color-tile-fg` | `--color-tile-oat` | 4.5:1 | Initials |

Photos are never filtered in the dark theme.

## Responsive behaviour

- Fixed sizes at every breakpoint.

## Accessibility

### Role and pattern

Decorative: `alt=""` on the photo, `aria-hidden="true"` on the initials. The surrounding control or text
names the person ("Your account, Miriam Clarke").

### Keyboard

| Key | Action |
|---|---|
| — | Not focusable. |

### Focus

None.

### Labelling

None of its own.

### Announcements

None.

### Motion

The busy shimmer stops under reduced motion.

## Content and internationalisation

- Initials come from the name data; no copy.

## Performance

- `OnPush`; the photo carries `width` and `height`, so it never shifts the layout (`L2-120`).

## Acceptance criteria

### Rendering

- **AC-1** Given Miriam Clarke signed in with a photo, when the top bar renders, then her avatar is a 40 px square image with empty `alt` inside the account button named "Your account, Miriam Clarke". (L2-127)
- **AC-2** Given Samuel Okafor without a photo, when his avatar renders, then it shows "SO" on the clay tile hidden from assistive technology. (L2-127)
- **AC-3** Given an avatar photo, when it loads, then its width and height are reserved. (L2-120)

### Theming

- **AC-4** Given the dark theme, when initials render, then tile and text use dark token values and photos are not filtered. (L2-134)
- **AC-5** Given both themes, when contrast is measured, then initials meet 4.5:1 on each tile. (L2-129)

## Implementation notes

- Folder `frontend/projects/components/src/lib/avatar/`: `avatar.ts` (`Avatar`), `avatar-size.ts`,
  `.html`, `.scss` with the avatar rules (the `.status` rules go with the message thread).

## Decisions

- **D-1** *Which letters are the initials?* The first letters of the first two words of the name that are
  not titles ending in a full stop: "Dr. Abena Mensah" gives "AM".
