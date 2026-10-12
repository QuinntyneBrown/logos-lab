# Spinner

| Field | Value |
|---|---|
| Selector | `span[llSpinner]`, `ll-spinner-region` |
| Library path | `frontend/projects/components/src/lib/spinner/` |
| Status | built |
| Traces to | L2-007, L2-127, L2-129, L2-134, L2-150 |
| Design system | [`spinner.html`](../../design-system/components/spinner.html) |
| Source mocks | [`pages/verify-email/loading`](../../mocks/pages/verify-email/loading.html), [`pages/reset-password/loading`](../../mocks/pages/reset-password/loading.html), [`pages/email-change-confirm/loading`](../../mocks/pages/email-change-confirm/loading.html), [`pages/unsubscribe/loading`](../../mocks/pages/unsubscribe/loading.html), [`pages/expert-invitation/loading`](../../mocks/pages/expert-invitation/loading.html), [`pages/studio-editor/saving`](../../mocks/pages/studio-editor/saving.html) |
| Rendering | [`spinner.html`](spinner.html) |

## Purpose and scope

A spinner says work is under way when its length is unknown and there is no layout to hold with a
skeleton. The spinner region is the whole body of a focused card while a link from an email is checked
("Checking your link…"). The bare spinner sits beside a short status line, such as "Saving…" in the
Studio.

Out of scope:

- The busy button's spinner: the [button](button.md) renders its own.
- The combobox's "Searching…" row: the [combobox](combobox.md).
- The text and tone of an inline status line (`.inline-status`): the inline message component, which
  places a `span[llSpinner]` before its text.
- Loading lists and grids: the [skeleton](skeleton.md).

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/verify-email/loading` | region | "Checking your link…" | loading | surface (auth card) |
| `pages/reset-password/loading` | region | "Checking your reset link…" | loading | surface (auth card) |
| `pages/email-change-confirm/loading` | region | "Confirming your new email…" | loading | surface (auth card) |
| `pages/unsubscribe/loading` | region | "Unsubscribing you…" | loading | surface (auth card) |
| `pages/expert-invitation/loading` | region | "Checking your invitation…" | loading | surface (auth card) |
| Studio status lines (`studio-editor/saving`, `studio-module-package/uploading`, `studio-video-captions/generating`) | bare, size `sm` | the line's text beside it | loading | surface |
| Player stages (`video-page/loading`, `module-player/loading`) | bare, size `sm` | visually hidden or short text beside it | loading | stage |

## Anatomy

1. **Spinner** — `span.spinner`, `aria-hidden="true"`: a ring with one transparent side.
2. **Region** — `div.spinner-region`, `role="status"`, `aria-live="polite"`: a `--lg` spinner over a
   `p` holding the message.

Host: `span[llSpinner]` is the consumer's span and receives the classes; `ll-spinner-region` is
`display: contents` and renders the region.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `size` (`span[llSpinner]`) | `'sm' \| 'md' \| 'lg'` | `'sm'` | no | `sm` adds no modifier (`.spinner` is the small size); `md` and `lg` add `.spinner--md` and `.spinner--lg`. |
| `message` (`ll-spinner-region`) | `string` | — | yes | The text in the `p`; announced politely when the region appears. |

### Outputs

None.

### Content slots

None.

## Variants and sizes

| Variant | Modifier | Size |
|---|---|---|
| Small | — | `--space-4` square, `--border-width-thick` ring |
| Medium | `.spinner--md` | `--space-6` square |
| Large | `.spinner--lg` | `--space-8` square, `--border-width-heavy` ring |
| Region | `.spinner-region` | grid, gap `--space-3`, padding `--space-10` `--space-6`, centred |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Spinning | rendered | ring turns over `--duration-deliberate`, linear, endless | spinner hidden; the region announces its message once |
| Reduced motion | `prefers-reduced-motion: reduce` | ring still | same |

## Markup

```html
<!-- rendered: region -->
<div class="spinner-region" role="status" aria-live="polite">
  <span class="spinner spinner--lg" aria-hidden="true"></span>
  <p>Checking your link…</p>
</div>

<!-- rendered: bare -->
<span class="spinner" aria-hidden="true"></span>
```

```html
<!-- consumer -->
<ll-spinner-region message="Checking your link…" i18n-message />
<span llSpinner></span>
```

## Design

- The ring is drawn in `currentColor`, so it takes the text colour it sits in; in a region that is
  `--color-fg-muted`.
- Region message `--text-body-sm`, centred.
- Rotation uses the `spin` keyframes over `--duration-deliberate`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Region text and ring | `--color-fg-muted` | muted foreground | muted foreground |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-muted` | `--color-bg-surface` | 4.5:1 | Region message in an auth card |

## Responsive behaviour

- The region centres in its container at every width; the message wraps and never clips.
- At 320 px nothing scrolls horizontally or clips; at 200 % zoom everything stays available.

## Accessibility

### Role and pattern

The spinner is decorative (`aria-hidden="true"`). The region is a polite live region (`role="status"`).

### Keyboard

| Key | Action |
|---|---|
| — | Nothing focusable. |

### Focus

None. The page that swaps the region in keeps focus where it was or moves it to the next state's
heading.

### Labelling

The message is the region's accessible text.

### Announcements

The message is announced once, politely, when the region appears.

### Motion

Rotation stops under reduced motion; the message still says what is happening.

## Content and internationalisation

- The message is a present-tense phrase ending in an ellipsis character: "Checking your link…".
- Translatable inputs: `message`.

## Performance

- `OnPush`, signal inputs; the animation is pure CSS.
- The region keeps the card close to the height of the state that follows, so the swap shifts little.

## Acceptance criteria

### Rendering

- **AC-1** Given Miriam opens her verification link, when the page checks it, then the card shows a large spinner over "Checking your link…". (L2-007)
- **AC-2** Given a bare spinner, when it renders, then it is the small ring with no size modifier; `size="lg"` adds `.spinner--lg`. (L2-127)

### Screen readers

- **AC-3** Given the spinner region appears, when a screen reader is running, then "Checking your link…" is announced once, politely, and the spinner itself is hidden. (L2-127)

### Theming

- **AC-4** Given the dark theme, when the region renders, then its text and ring use the dark muted foreground. (L2-134)

### Motion

- **AC-5** Given reduced motion, when a spinner renders, then it does not rotate. (L2-129)

### Content

- **AC-6** Given a message 30 % longer, when the region is 320 px wide, then the message wraps and nothing is clipped. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/spinner/`: `spinner.ts` (`Spinner`, attribute
  component), `spinner-size.ts`, `spinner-region.ts` (`SpinnerRegion`), each with `.html` and `.scss`
  from the `spinner` block.
- The button and combobox keep their own spinner rules; moving them onto `span[llSpinner]` is outside
  this CRD.

## Decisions

- **D-1** *One component or two?* Two selectors in one folder: the bare spinner is placed by inline
  status lines and players; the region is a whole card body with its own live region. They share the
  ring's rules.
- **D-2** *Message as input or content?* An input: every usage is plain text, and an input guarantees
  the live region is never empty.
