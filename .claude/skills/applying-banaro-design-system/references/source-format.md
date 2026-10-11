# Page source format

Every documentation page is generated from one Markdown file in `docs/design-system/src/`:

```
src/
  foundations/<topic>.md      # the 12 required foundations
  components/<slug>.md        # one per component; <slug> matches its @component block in components.css
  patterns/<slug>.md          # cross-component guidance
  CHANGELOG.md                # pasted into README.md under "Changelog"
```

`build_design_system.py` renders the pages, the sidebar nav on every page, `index.html` and `README.md`.
Never edit generated HTML or the README by hand; edit the source and rebuild. `{{app}}`, `{{app_lower}}`
and `{{prefix}}` are replaced with values from `design-system.json` at build time.

## Component source

```markdown
---
title: Button                    # page title and nav label (sentence case)
tier: core                       # core | standard | sample — see kit-catalog.md
order: 10                        # nav order (lower first); groups: see kit-catalog.md
summary: One sentence: what it is for. Shown as the page lead and on the index card.
selector: .btn, .icon-btn        # classes that mean "this component is used" when scanning the mocks
layout: inline                   # inline (buttons, badges) | block (cards, panels; default) — specimen width
target: button, a                # where forced states land in each specimen (CSS selector, first match)
states: default, hover, focus, active, disabled, loading, pressed
sizes: sm, md, lg                # optional; with size-class renders one example per size
size-class: btn--{size}
error: Enter a task name.        # optional; message used for the derived "invalid" state
knobs: --bn-button-bg = default `--color-bg-surface`; primary `--color-accent`   # optional; ';'-separated
contrast: --color-fg-on-accent|--color-accent|4.5; --color-focus-ring|--color-bg-surface|3   # optional
matrix-variants: primary, quiet  # optional; limit the rows of the state matrix
tokens: --color-accent, --space-4 # optional; otherwise derived from the component's CSS block
---

## Overview
## Anatomy
## Variants
## Sizes
## States
## Responsive
## Theming          (optional; a default sentence is used)
## Accessibility
## Content
## Do and don't
## Tokens           (optional prose; the token table is generated)
## Code             (optional prose; the code sample is generated from the first variant)
```

`## Sources` is always generated. It lists the mock states that use the component's `selector`.

### Section rules

- **Overview:** two to four sentences on when to use it, when not to, and which component to use instead. Link
  siblings as `[Link](link.html)`. A link to a page that has been pruned turns into plain text automatically.
- **Anatomy:** a numbered list of parts written as `1. **Part** — what it is.` Add an optional ```html
  fence for the anatomy specimen; otherwise the first variant is used.
- **Variants:** one `### name` per variant (lowercase name), an optional sentence, then exactly one
  ```html fence. **Every variant has its own markup.** Never repeat the same markup under two names. The
  first variant is the base: it is used for sizes, theming, the code sample and the default do example.
- **Sizes:** prose, or `N/A: reason` when the component has one content-driven size. Leave `sizes:` out
  of the front matter in that case.
- **States:** a sentence or two describing every state. The build creates a light and dark matrix (variants
  down, `states:` across) by changing the base markup:

  | State | What the build does to the `target` element |
  |---|---|
  | hover, focus, active | `data-state="…"` (components.css styles these hooks) |
  | disabled | `disabled` on every control in the specimen; links lose `href` and get `aria-disabled` |
  | loading, busy, submitting | `aria-busy="true"`; buttons get a leading `.spinner` |
  | selected, checked, pressed | `checked` on checkbox/radio, `aria-selected` on tabs/options/rows, `aria-pressed` on buttons, else `data-state="selected"` |
  | invalid | `aria-invalid="true"`; for inputs an error message (`error:`) is inserted and linked |
  | read-only, required, indeterminate, current, open/expanded | the matching native or ARIA attribute |
  | anything else (empty, error, failed, dragging, leaving, unread…) | `data-state="…"` |

  If a state needs different markup (an empty table, a failed message), add an override:
  `### state` applies to every row and `### variant / state` applies to one cell. Each override has one
  ```html fence. Every state named in `states:` must render visibly differently, through the CSS hook or
  through an override.
- **Responsive:** what changes at 360px, 768px and 1024px and up (stacking, wrapping, scrolling), or `N/A: reason`.
- **Accessibility:** start with `**Role:**`. Include a `| Key | Effect |` table for interactive components,
  then **Focus:**, **Labelling:**, **Motion:** and **Touch:** paragraphs. Contrast pairs are rendered from `contrast:`.
- **Content:** voice and copy rules with concrete examples in the product's own words.
- **Do and don't:** pairs of `### Do` and `### Don't`. Each has a one-sentence caption and, ideally, an
  ```html fence. Give at least two pairs.

### Specimen markup rules

- Use only classes that exist in `assets/components.css`. If a specimen needs a new class, add it to the
  component's own `@component` block. Never use inline colours. `style="--bn-progress-value: 40%"` style
  knobs are fine.
- Real, specific copy from the product's cast and catalog. Never lorem ipsum, "Item 1", "Label" or "Button".
- Specimens must pass `check_design_system.py`:
  - Every control is labelled.
  - Every link and button has an accessible name.
  - Every `<img>` has `alt` (use `alt=""` when the image is decorative and a name sits beside it).
  - Links use `href="#"` or a real page.
- Headings inside specimens are `h3` or lower. The build demotes any `h1`.
- Photos: `../assets/photos/<file>.jpg`. Pages sit one folder deep.
- Icons: inline 24×24 line SVGs, `class="icon"`, `aria-hidden="true"`, stroke only. They inherit
  `stroke-width: 1.5`, round caps and joins.
- Overlays are shown in flow:
  - Dialog specimens use `class="dialog ds-static-dialog" role="region" aria-labelledby="…"`.
  - Sheets and popovers are shown without the `popover` attribute.
  - A live `<dialog>` may sit in Accessibility with `data-open-dialog` / `data-close-dialog` buttons. `examples.js` wires them.
- Interactive demos that `examples.js` supports:
  - `data-demo-tabs` around a tablist
  - `chip[aria-pressed]` toggles
  - `data-dismiss-demo` on a toast or alert close button
  - `data-remove-demo` inside a `.pill`
  - `data-sort-demo` on a sortable header button
  - `data-password-toggle` inside `.input-group`
  - `data-copy-demo` next to a `<code>`
  - a range with an `<output data-format="{value} km">`

## Pattern source

Front matter: `title`, `summary`, `order`, plus optional values:

- `selector` (classes whose use in the mocks is listed under Sources)
- `components` (comma-separated component slugs to link)

The required sections, in order, are:

1. `## Overview`
2. `## When to use`
3. `## Structure`
4. `## States`
5. `## Responsive`
6. `## Accessibility`
7. `## Content`
8. `## Do and don't`

Sources is generated. ```html fences become live examples.

## Foundation source

Front matter: `title` and `summary`. Sections:

- `## Principles`
- `## Specimens` (optional prose, shown after the generated specimens)
- `## Usage`

The build generates the specimens for the topic: colour ramps, roles and contrast, type roles, the spacing
and radius scales, shadows, motion demos, the grid, theme pairs and breakpoints. It also builds the token
table from every token whose prefix belongs to the topic. The 12 foundation slugs are fixed: color,
typography, spacing, layout, elevation, shape, motion, iconography, theming, responsive, accessibility, content.
