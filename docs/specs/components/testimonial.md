# Testimonial

| Field | Value |
|---|---|
| Selector | `ll-verse` |
| Library path | `frontend/projects/components/src/lib/testimonial/` |
| Status | planned |
| Traces to | L2-127, L2-129, L2-130, L2-134 |
| Design system | [`testimonial.html`](../../design-system/components/testimonial.html) |
| Source mocks | [`pages/home/default`](../../mocks/pages/home/default.html), [`pages/home/error`](../../mocks/pages/home/error.html) |
| Rendering | [`testimonial.html`](testimonial.html) |

## Purpose and scope

The verse closes the home page with the line that gives Logos Lab its name — John 1:1 — set large and
quiet between a short accent rule and its reference. It is the product's one use of the testimonial
block.

Out of scope:

- The block's `.quote` card: no screen in the mocks uses it; it gets its API in this CRD when one does.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/home/*` (every state, including error) | label "Our name" | "In the beginning was the Word, and the Word was with God, and the Word was God." · "John 1:1 · the Logos" | default | canvas |

## Anatomy

1. **Section** — `section.verse[aria-label]`: centred grid.
2. **Rule** — `span.verse__rule`, `aria-hidden="true"`, a short accent line.
3. **Text** — `p.verse__text`, large light display type.
4. **Reference** — `p.verse__ref`, overline.

Host: `ll-verse` is `display: contents`; it renders the section.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `label` | `string` | — | yes | The section's `aria-label`, "Our name". |
| `reference` | `string` | — | yes | "John 1:1 · the Logos". |

### Outputs

None.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | text | The verse. |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Verse | `.verse` | The home page's closing line. |

One size; the text grows from `--font-size-2xl` to `--font-size-3xl` at LG.

## States

The verse is static.

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Rule, text, reference | Region "Our name" |

## Markup

```html
<!-- rendered -->
<section class="verse" aria-label="Our name">
  <span class="verse__rule" aria-hidden="true"></span>
  <p class="verse__text">In the beginning was the Word, and the Word was with God, and the Word was God.</p>
  <p class="verse__ref">John 1:1 · the Logos</p>
</section>
```

```html
<!-- consumer -->
<ll-verse label="Our name" reference="John 1:1 · the Logos" i18n>In the beginning was the Word…</ll-verse>
```

## Design

- Gap `--space-5`; padding-top `--layout-section-gap`; centred.
- Text `--font-weight-light` display, `--font-size-2xl` (LG `--font-size-3xl`), max width
  `--layout-measure-verse`; reference `--text-overline` subtle; rule `--space-10` wide, hairline tall,
  `--color-accent`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Text | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Reference | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |
| Rule | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | Text |
| `--color-fg-subtle` | `--color-bg-canvas` | 4.5:1 | Reference |

## Responsive behaviour

- Centred at every width; the text wraps within its measure; at 320 px nothing scrolls horizontally.

## Accessibility

### Role and pattern

A labelled `section` (region) with two paragraphs.

### Keyboard

| Key | Action |
|---|---|
| — | Nothing focusable. |

### Focus

None.

### Labelling

`aria-label` names the region; the rule is hidden.

### Announcements

None.

### Motion

None.

## Content and internationalisation

- The verse and reference arrive translated (a French build uses the French text of John 1:1).

## Performance

- `OnPush`; static. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given the home page, when it renders, then it ends with a region "Our name" holding the verse and "John 1:1 · the Logos", and the rule is hidden from assistive technology. (L2-127)

### Theming

- **AC-2** Given the dark theme, when the verse renders, then text, reference and rule use dark token values. (L2-134)
- **AC-3** Given both themes, when contrast is measured, then text and reference meet 4.5:1. (L2-129)

### Responsive

- **AC-4** Given a viewport of 320 px, when the verse renders, then it wraps and nothing scrolls horizontally. (L2-130)

## Implementation notes

- Folder `frontend/projects/components/src/lib/testimonial/`: `verse.ts` (`Verse`), `.html`, `.scss` with
  the `.verse` rules.

## Decisions

- **D-1** *Build `.quote` now?* No; nothing in the mocks uses it, and the CRD does not invent an API
  without a screen.
