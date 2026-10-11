# Footer

| Field | Value |
|---|---|
| Selector | `ll-footer` |
| Library path | `frontend/projects/components/src/lib/footer/` |
| Status | planned |
| Traces to | L2-127, L2-130, L2-134, L2-150 |
| Design system | [`footer.html`](../../design-system/components/footer.html) |
| Source mocks | [`pages/home/default`](../../mocks/pages/home/default.html), [`pages/sign-in-verify/default`](../../mocks/pages/sign-in-verify/default.html), [`pages/admin/default`](../../mocks/pages/admin/default.html), [`pages/moderation-queue/default`](../../mocks/pages/moderation-queue/default.html), [`pages/account-notice/default`](../../mocks/pages/account-notice/default.html) |
| Rendering | [`footer.html`](footer.html) |

## Purpose and scope

The footer closes every page: the policy links, the help address and one sentence about Logos Lab. On
public pages it carries the full brand and the land sentence ("Made in Canada; your data is stored in
Canada."); in focused flows, admin and moderation it is a quiet link row with a short note.

Out of scope:

- What "Cookie settings" opens (the cookie settings dialog); the application handles the click.
- Choosing the links and note per area: the application shell.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| public and learner pages | full: brand + links + land sentence | Privacy, Terms, Community guidelines, Accessibility, Cookie settings, help@logoslab.ca; "Logos Lab is an expert-curated place to learn…" | default, link hover | canvas |
| focused flows (`pages/sign-in-verify/*`, `pages/sign-in/*`, …) | quiet: links + made note | Privacy, Terms, Accessibility, help@logoslab.ca; "Logos Lab · your data is stored in Canada" | default | canvas |
| `pages/admin/*` | quiet | same links; "Logos Lab admin · actions here are recorded in the audit log" | default | canvas |
| `pages/moderation-*/*` | quiet | same links; "Logos Lab moderation · every action is recorded in the audit trail" | default | canvas |
| `pages/account-notice/*` | quiet with Community guidelines | five links; made note | default | canvas |

## Anatomy

1. **Footer** — `footer.footer`: `--layout-section-gap` above, hairline top border.
2. **Grid** — `div.wrap.footer__grid`: one column, two from LG.
3. **Brand (full only)** — the [brand](brand.md), full variant.
4. **Links** — `nav[aria-label] > ul.footer__links > li > a`, muted, underlined on hover.
5. **Land sentence (full)** — `p.footer__land`, small, subtle, wide measure, full width from LG.
6. **Made note (quiet)** — `p.footer__made`, small, muted.

Host: `ll-footer` is `display: contents`; it renders the `<footer>` (the `contentinfo` landmark).

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `variant` | `'full' \| 'quiet'` | `'full'` | no | `full` renders the brand; the note slot is styled as land or made accordingly. |
| `navLabel` | `string` | — | yes | The `nav`'s `aria-label`, "Footer". |
| `homeLabel` | `string` | `''` | when `full` | Brand link name, "Logos Lab home". |

### Outputs

None; the consumer listens to its own projected links and buttons.

### Content slots

| Slot | Accepts | Rule |
|---|---|---|
| default | `<li>` items holding one `<a>` or a `button` styled as a link | Rendered inside `ul.footer__links`. |
| `[slot=note]` | text | Rendered in `p.footer__land` (full) or `p.footer__made` (quiet). |

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Full | — (brand + `.footer__land`) | Public and learner pages. |
| Quiet | — (no brand, `.footer__made`) | Focused flows, admin, moderation, account notices. |

One size; the width follows the page container.

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Link default | — | `--color-fg-muted`, no underline | link |
| Link hover | `:hover` | `--color-fg-default`, underline | — |
| Link focus | `:focus-visible` | Shared focus ring | — |

## Markup

```html
<!-- rendered: full -->
<footer class="footer">
  <div class="wrap footer__grid">
    <a class="brand" href="/" aria-label="Logos Lab home">…<span>logos lab</span></a>
    <nav aria-label="Footer"><ul class="footer__links"><li><a href="/policies/privacy">Privacy</a></li>…<li><a href="mailto:help@logoslab.ca">help@logoslab.ca</a></li></ul></nav>
    <p class="footer__land">Logos Lab is an expert-curated place to learn where Christian faith meets artificial intelligence. Made in Canada; your data is stored in Canada.</p>
  </div>
</footer>
```

```html
<!-- consumer -->
<ll-footer navLabel="Footer" homeLabel="Logos Lab home">
  <li><a routerLink="/policies/privacy" i18n>Privacy</a></li>
  <span slot="note" i18n>Logos Lab is an expert-curated place to learn…</span>
</ll-footer>
```

## Design

- Margin-top `--layout-section-gap`; padding `--space-16` top and `--space-24` bottom; hairline
  `--color-border-default` top border.
- Grid gap `--space-10`; links gap `--space-2` by `--space-6`.
- Land: `--text-body-sm`, `--color-fg-subtle`, max width `--layout-measure-wide`. Made:
  `--text-body-sm`, `--color-fg-muted`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Rule | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Links | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Link hover | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Land sentence | `--color-fg-subtle` | `--palette-stone-600` | `--palette-night-300` |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Links, made note |
| `--color-fg-subtle` | `--color-bg-canvas` | 4.5:1 | Land sentence |

## Responsive behaviour

- One column below LG; from LG the brand and links sit side by side and the land sentence spans both.
- Links wrap onto new lines; at 320 px nothing scrolls horizontally; each link line is at least 24 px
  tall.

## Accessibility

### Role and pattern

`<footer>` (contentinfo) with a labelled `nav` list of links.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Moves through the brand and links in order. |

### Focus

Shared focus ring.

### Labelling

The nav is named "Footer", distinct from the top bar's "Primary".

### Announcements

None.

### Motion

None beyond link colour, removed under reduced motion.

## Content and internationalisation

- Link labels and notes arrive translated; the help address is data.

## Performance

- `OnPush`; static content. Page budgets per `L2-120` and `L2-123`.

## Acceptance criteria

### Rendering

- **AC-1** Given the home page, when the footer renders, then it is the page's `contentinfo` landmark with the full brand, a `nav` named "Footer" listing Privacy, Terms, Community guidelines, Accessibility, Cookie settings and help@logoslab.ca, and the land sentence. (L2-127)
- **AC-2** Given the sign-in page, when the quiet footer renders, then it has no brand and shows "Logos Lab · your data is stored in Canada". (L2-127)

### Responsive

- **AC-3** Given a viewport of 320 px, when the footer renders, then the links wrap and the page does not scroll horizontally. (L2-130)
- **AC-4** Given link labels 30 % longer in the pseudo-locale, when the footer renders at 375 px, then no label is clipped. (L2-150)

### Theming

- **AC-5** Given the dark theme, when the footer renders, then its links and sentence use dark token values and meet 4.5:1. (L2-134)

## Implementation notes

- Folder `frontend/projects/components/src/lib/footer/`: `footer.ts` (`Footer`), `.html`, `.scss` with the
  `footer` block under `:host ::ng-deep`. Composes `Brand`.

## Decisions

- **D-1** *Where do Privacy, Terms and Community guidelines link?* `/policies/privacy`,
  `/policies/terms` and `/policies/community-guidelines`, one policy page per type (`pages/policy`).
- **D-2** *Is "Cookie settings" a link?* It is a `button` styled as a footer link in the product
  because it opens a dialog rather than navigating; the footer styles both.
