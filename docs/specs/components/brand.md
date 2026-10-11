# Brand

| Field | Value |
|---|---|
| Selector | `ll-brand` |
| Library path | `frontend/projects/components/src/lib/brand/` |
| Status | planned |
| Traces to | L2-127, L2-130, L2-132, L2-134 |
| Design system | [`brand.html`](../../design-system/components/brand.html) |
| Source mocks | [`pages/home/default`](../../mocks/pages/home/default.html) (top bar and footer), [`pages/sign-in/default`](../../mocks/pages/sign-in/default.html), [`pages/report-change/default`](../../mocks/pages/report-change/default.html) |
| Rendering | [`brand.html`](brand.html) |

## Purpose and scope

The brand lockup is the Logos Lab mark (an open book with a small sun) and the lowercase wordmark
"logos lab". It always links home. It opens the top bar and the footer, and it heads the focused
flows (sign-in, registration, account notices).

Out of scope:

- The "Logos Lab" author mark inside content cards (`.content-card__mark`): the content card owns it.
- The certificate's brand: the certificate component owns it.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| top bar on every product page | compact | wordmark "logos lab"; label "Logos Lab home" | default, hover, focus | canvas |
| footer on public pages | full | same | default, hover | canvas |
| focused flows (`pages/sign-in/*`, `pages/register/*`, `pages/report-change/*`) top bar | full | same | default | canvas |

## Anatomy

1. **Link** — `a.brand`. Inline flex, at least `--target-comfortable` tall; links to `/`.
2. **Mark** — `svg.brand__mark` with `.brand__sun`, `aria-hidden="true"`, in `--color-accent` with a
   `--color-warning-icon` sun.
3. **Wordmark** — `span`, "logos lab"; visually hidden below 30rem in the compact variant and always in
   the mark-only variant.

Host: `ll-brand` is `display: contents`; it renders the `<a class="brand">`.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `variant` | `'full' \| 'compact' \| 'mark-only'` | `'full'` | no | `compact` adds `.brand--compact`; `mark-only` adds `.brand--mark-only`. |
| `label` | `string` | — | yes | The link's `aria-label`, "Logos Lab home" (translated by the consumer). |
| `href` | `string` | `'/'` | no | Router link target. |

### Outputs

None; it is a link.

### Content slots

None. The wordmark is the product name and is not translated.

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Full | — | Footer and focused flows. |
| Compact | `.brand--compact` | Top bar: the wordmark hides below 30rem to leave room for actions. |
| Mark only | `.brand--mark-only` | Very tight spaces; the wordmark is always visually hidden. |

One size: mark `--space-8` square, wordmark `--font-size-lg` semibold.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Accent mark, default text | "Logos Lab home, link" |
| Hover | `:hover` | Mark turns `--color-accent-hover`; the sun rises by `--space-0-5` | — |
| Focus | `:focus-visible` | Shared focus ring, `--radius-md` | Focus announced |

## Markup

```html
<!-- rendered: compact -->
<a class="brand brand--compact" href="/" aria-label="Logos Lab home"><svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true">…<circle class="brand__sun" cx="25.5" cy="4.5" r="2.4"/></svg><span>logos lab</span></a>
```

```html
<!-- consumer -->
<ll-brand variant="compact" label="Logos Lab home" i18n-label />
```

## Design

- Gap `--space-3`; minimum height `--target-comfortable`; `--radius-md` for the focus ring.
- Wordmark `--font-weight-semibold`, `--font-size-lg`, letter spacing `--letter-spacing-slight`
  tightened.
- Mark colour transition `--duration-base`; sun `--duration-slow`, both `--ease-standard`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Mark | `--color-accent` | `--palette-accent-600` | `--palette-accent-300` |
| Mark hover | `--color-accent-hover` | accent hover role | accent hover role |
| Sun | `--color-warning-icon` | warning icon role | warning icon role |
| Wordmark | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | Wordmark |
| `--color-accent` | `--color-bg-canvas` | 3:1 | Mark (non-text) |

## Responsive behaviour

- Compact: below 30rem only the mark shows; the wordmark stays in the accessibility tree hidden.
- The link stays at least 44 × 44 CSS px at every width; at 320 px nothing clips.

## Accessibility

### Role and pattern

A native link to the home page.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Enter</kbd> | Goes to the home page. |

### Focus

Shared focus ring.

### Labelling

`aria-label="Logos Lab home"` names the link; the mark is decorative.

### Announcements

None.

### Motion

The mark colour and sun lift are removed under reduced motion.

## Content and internationalisation

- The wordmark "logos lab" is the product name and is not translated; the `label` is translated.

## Performance

- `OnPush`, signal inputs; inline SVG, no image request. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given the top bar on the home page, when it renders, then the brand is a link to `/` named "Logos Lab home" whose mark has `aria-hidden="true"`. (L2-127)
- **AC-2** Given the footer, when it renders, then it contains the full brand lockup with the wordmark "logos lab" visible. (L2-127)

### Responsive

- **AC-3** Given the compact brand at 375 px, when it is measured, then only the mark is visible and the link target is at least 44 × 44 CSS px. (L2-132)
- **AC-4** Given the compact brand at 320 px, when the top bar renders, then the brand neither clips nor causes horizontal scrolling. (L2-130)

### Theming

- **AC-5** Given the dark theme, when the brand renders, then the mark and wordmark take their dark token values. (L2-134)

## Implementation notes

- Folder `frontend/projects/components/src/lib/brand/`: `brand.ts` (`Brand`), `.html`, `.scss` with the
  `brand` block. Uses `RouterLink`.

## Decisions

- **D-1** *Is the wordmark translatable?* No; it is the product name in its lowercase lockup. Only the
  accessible label is translated.
