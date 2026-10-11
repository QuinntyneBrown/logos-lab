# Adding a component

When a mock needs something the kit does not have, such as a task row with a checkbox and due date, a
course progress card or a pricing table, **add it to the design system first, then use it in the mock.**
Never style a mock locally, and never put a component's CSS in a page.

## 1. Decide: reuse, extend or add

1. **Reuse.** Can existing classes compose it? A list of `.rows` with a `.check__box`, a `.badge` and
   `.rows__meta` might already be a task list. Composition is preferred.
2. **Extend.** Is it a variant of an existing component, such as a card with a progress bar or a dense
   table? Add a modifier class to that component's own `@component` block and a `### variant` to its source.
3. **Add.** It has its own anatomy, states or behaviour, such as a task row with done, overdue and dragging
   states. Create a new component.

Adapting a **sample** component is often the fastest way to add a domain card. For example, turn
`project-card` into `course-card`:

- Copy its CSS block under the new slug and rename the classes.
- Write a new source.
- Prune the original sample.

## 2. Write the CSS block

Append one block to `docs/design-system/assets/components.css`, before the sample-tier blocks:

```css
/* @component task-row ---------------------------------------------------------- */
.task-list { display: grid; border-top: var(--border-width-hairline) solid var(--color-border-default); }
.task { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: var(--space-4); align-items: center;
  padding-block: var(--space-4); border-bottom: var(--border-width-hairline) solid var(--color-border-default); }
.task__title { font: var(--text-h4); overflow-wrap: anywhere; }
.task__meta { font: var(--text-body-sm); color: var(--color-fg-muted); }
.task.is-done .task__title { color: var(--color-fg-subtle); text-decoration: line-through; }
.task[data-state="hover"], .task:hover { background: var(--color-bg-subtle); }
.task--overdue .task__meta { color: var(--color-danger-fg); }
@media (prefers-reduced-motion: no-preference) {
  .task { transition: background-color var(--duration-base) var(--ease-standard); }
}
/* @end task-row */
```

Rules:

- **BEM**: `.block`, `.block__element`, `.block--modifier`. `is-*` classes only for runtime state when no
  ARIA or native attribute fits.
- **Tokens by role only**:
  - colours: `--color-*`
  - spacing: `--space-*`
  - type: `--text-*`
  - shape: `--radius-*`, `--border-width-*`
  - motion: `--duration-*` and `--ease-*`
  - layers: `--z-*`
  - sizes: `--size-*` or `--layout-*`

  No hex, rgb, white or black (the checker rejects them), and no off-grid pixel values.
- **New geometry becomes a named token.** Add `--size-task-handle: 1.5rem;` to the *component geometry*
  section of `tokens.css`. Add a new colour role to `:root` *and* the dark block, and add its pairs to
  `contrast-pairs.json`.
- **State hooks**: style the native and ARIA states (`:hover`, `:focus-visible`, `[aria-selected="true"]`,
  `[aria-invalid="true"]`, `:disabled`, `[aria-busy="true"]`), and mirror each pointer state with
  `[data-state="hover|focus|active"]` so the state matrix can show it.
- **Motion** goes inside `@media (prefers-reduced-motion: no-preference)` and reuses the shared keyframes:
  `rise`, `settle`, `shimmer`, `spin` and `breathe`.
- **Self-contained**: rules for this component stay in its block. Reading a *core* component's classes
  inside your markup is fine (`.btn`, `.avatar`, `.badge`). Depending on a standard or sample block is not,
  because pruning could remove it.
- **Look**:
  - Hairlines first.
  - At most one accent element.
  - Pill-shaped actions.
  - Rounded-square portraits.
  - Generous padding (`--space-4` to `--space-6`).
  - Light display type for big numbers (`font: var(--font-weight-light) var(--font-size-3xl) / 1 var(--font-family-display)`).

## 3. Write the source

Create `docs/design-system/src/components/<slug>.md` following `references/source-format.md`, with
`button.md` as the model. Give it these front matter values:

- `tier: standard`
- an `order` in the right group (see `kit-catalog.md`)
- `selector` listing the root classes
- `layout`, `target` and `states`

Write every variant with its own markup, and every state the component really has. Fill in Accessibility,
Content and at least two Do/Don't pairs. Use the app's own cast and copy.

## 4. Use it, build, audit

1. Use the classes in the mocks.
2. `python <skill>/scripts/build_design_system.py docs/design-system`
3. `python <skill>/scripts/audit_usage.py docs/design-system`. The new component shows as used, and no
   mock class is reported as undefined.
4. `python <skill>/scripts/check_design_system.py docs/design-system`, `check_contrast.py` if you added
   colours, and `check_mocks.py docs/mocks`.
5. Screenshot the new page and two mocks that use it in both themes, and review them against
   `look-and-feel.md`.
6. Add a changelog line: "Added Task row (task-row) for the Today and Project screens."
