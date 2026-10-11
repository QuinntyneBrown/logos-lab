---
name: applying-banaro-design-system
description: >-
  Give a new web app the Banaro look and feel: seed docs/design-system with
  the Banaro design-system kit (oat and birch neutrals, one sage accent,
  Manrope, soft corners, wood-grain panel, quiet motion, light and dark),
  write complete HTML mocks for the app in docs/mocks using only the kit's
  components, add the components the app needs, prune the kit's unused and
  sample components, and finish with a polished, verified design system the
  app can be built from. Use whenever the user says "use the Banaro design
  system / look / style", "same look as Banaro", "apply Banaro", or asks to
  create mocks and a design system for a new app (a TO DO app, an LMS, a
  dashboard…) in this house style; also to add a component to, re-voice,
  prune, recolour the accent of, or re-verify a design system seeded from the
  Banaro kit. Prefer this over writing-html-mocks + extracting-design-systems
  when the target look is Banaro.
---

# Applying the Banaro design system

Start a new product with Banaro's visual language and end with two artifacts that agree with each other:

- **`docs/mocks/`** has every page, dialog and notification of the app in every state. The mocks are
  responsive, work in light and dark, can be used by keyboard, and carry real copy.
- **`docs/design-system/`** is a polished, Figma-grade design system:
  - tokens
  - 12 foundations
  - one page per component, covering anatomy, variants, sizes, every state in both themes, responsive
    behaviour, accessibility, content, do and don't, tokens, code and sources
  - patterns
  - an index, a README and a DTCG `tokens.json`

  It contains exactly the components the mocks use plus the core set, named and voiced for this app.

The look stays Banaro. The app's name, brand mark, components and copy are its own.

```
docs/design-system/
  design-system.json            app name, component prefix, accent, version
  src/                          ← EDIT THESE: page sources (foundations/, components/, patterns/, CHANGELOG.md)
  tokens/tokens.css             ← and this: primitives, roles, dark block (generated blocks are rebuilt)
  assets/components.css         ← and this: one /* @component <slug> */ block per component
  assets/ds.css ds.js examples.js fonts/ photos/
  index.html  README.md  foundations/ components/ patterns/  tokens/tokens.json  tokens/contrast-pairs.json   (generated)
docs/mocks/
  manifest.json  README.md  index.html  assets/  pages/  dialogs/  notifications/
```

Read the references as you reach the steps that need them:

- `references/look-and-feel.md`: the Banaro signatures, what may change, and the fidelity review.
- `references/kit-catalog.md`: every kit component with its tier, order and selector, plus the kit's sample cast.
- `references/mocks.md`: the manifest, the states vocabulary, templates, checks and the per-mock checklist.
- `references/adding-components.md`: how to add a component the Banaro way.
- `references/source-format.md`: how page sources are written. `button.md` in the kit is the model.
- `references/recolouring.md`: changing the accent, only when asked.

Resolve `references/`, `assets/` and `scripts/` relative to this skill's folder (written below as
`<skill>`). Resolve `docs/` relative to the project. Scripts are Python 3.10+ standard library;
screenshots need Playwright with Chromium (`pip install playwright && playwright install chromium`, or
`npx playwright`).

Mocks and the design system are design artifacts. Do not write tests for them. If the project follows
ATDD, that applies when the app is built from them, not here.

---

## Step 0: Intake (never a hard stop)

1. Read what exists:
   - `docs/specs/` (keep requirement IDs)
   - `docs/detailed-designs/`
   - any existing `docs/mocks/` or `docs/design-system/`
   - the project's AGENTS.md or CLAUDE.md conventions
2. Settle and state your choices:
   - **app name**
   - a one-sentence **description**
   - a 2–4 letter **component prefix** (`td` for a Todo app; it becomes the `--td-*` knobs and later the
     `td-*` component selectors)
3. Settle whether the user wants a different **accent**. The default is sage; recolour only on request.
4. Record gaps as *Open questions* in `docs/mocks/README.md` and continue with sensible assumptions.
5. If `docs/design-system/design-system.json` already exists, this is an **update**. Skip Step 1, keep
   names and URLs stable, and log every change in `src/CHANGELOG.md`.

## Step 1: Seed the kit

```sh
python <skill>/scripts/seed_kit.py --app "Tally" --prefix ty --description "A calm place to plan the week."
```

This copies the kit into `docs/design-system/`, which includes:

- tokens and component styles
- page sources for 12 foundations, 8 patterns and about 65 components
- fonts and photos

It also adds the mock assets: `mock.css`, `mock.js`, the `tokens.css` and `ui.css` shims that import the
design system, and photos. It writes `design-system.json`, then builds the site.

Open `docs/design-system/index.html`. You now have a complete, neutral Banaro system, voiced with the kit's
sample cast. Do not hand-edit the generated HTML. Everything is rebuilt from `src/`.

## Step 2: Inventory the screens

Write `docs/mocks/manifest.json` with every page, dialog and notification and their states
(`references/mocks.md` §1). Include the screens every product has: sign in, reset password, settings, 404,
403, 500 and offline.

## Step 3: Cast and copy

Write the app's cast and catalog at the top of `docs/mocks/README.md`:

- people (reuse the kit portraits under new names, or add photos)
- the domain's real objects
- counts
- "today"

Every mock and every design-system specimen uses this cast and copy from now on. Follow the voice in the
content foundation and pattern.

## Step 4: Mocks

Write each screen from `<skill>/assets/templates/` (`page.html`, `app-page.html`, `dialog.html`,
`notification.html`). Write `default` first, then derive the other states. Use only design-system classes.

**When the app needs something the kit lacks, add it to the design system before using it**
(`references/adding-components.md`):

1. a `@component` block in `components.css`
2. a source file in `src/components/`
3. a rebuild

Prefer composing or extending existing components. Adapting a sample component into a domain card is often
the quickest route.

Run `python <skill>/scripts/check_mocks.py docs/mocks --write` as you go. It must end with zero errors.

## Step 5: Fit the system to the app

1. **Prune.**
   ```sh
   python <skill>/scripts/audit_usage.py docs/design-system --prune
   ```
   This removes every standard and sample component no mock uses, along with its CSS block and
   now-unreferenced tokens. It logs the removal and rebuilds. Core components stay; prune them only if the
   user explicitly wants a minimal system (`--include-core`). Keep a component the app will need soon with
   `--keep slug`.
2. **Close the gaps the audit reports:**
   - *Classes used in the mocks but not defined*: move them into a component block. Mocks never carry their
     own styles.
   - *Classes used in page sources but defined by no block*: a kept page used a pruned component. Rewrite
     its specimen or `--keep` the dependency.
3. **Re-voice.** Rewrite every remaining source in `src/` with the app's cast, objects and voice: names,
   copy, dates and examples, in specimens and prose alike. Until `audit_usage.py` reports no kit cast and no
   Banaro words, the system is not finished. Names you deliberately reuse go in `--allow`.
4. **Brand.**
   - Draw the app's mark in `src/components/brand.md`: a 32×32 line drawing with a 1.6 stroke in
     `currentColor`, plus one `.brand__sun` dot.
   - Use the same SVG in every mock's `.brand`.
   - Keep the wordmark lowercase.
5. **Accent.** Only if the user asked:
   `python <skill>/scripts/recolour_accent.py docs/design-system --colour "#…" --name "…"`.
6. **Polish the new components.** Each needs:
   - every variant with distinct markup
   - every state visible in both themes
   - real Accessibility and Content sections
   - two or more do/don't pairs

## Step 6: Build and verify (all must pass)

```sh
python <skill>/scripts/build_design_system.py docs/design-system
python <skill>/scripts/audit_usage.py docs/design-system --strict                 # no undefined classes, no leftovers
python <skill>/scripts/check_design_system.py docs/design-system                   # 0 errors
python <skill>/scripts/check_contrast.py docs/design-system/tokens/tokens.css      # 0 failures
python <skill>/scripts/check_mocks.py docs/mocks --write                           # 0 errors
python <skill>/scripts/screenshot_mocks.py docs/mocks                              # 360/768/1280 × light/dark
python <skill>/scripts/screenshot_mocks.py docs/design-system --out docs/design-system/.cache/shots
```

Look at the screenshots, not just the exit codes. Review every mock with the checklist in
`references/mocks.md`, and the whole set with the fidelity review in `references/look-and-feel.md`.
Fix what you find, then rebuild and re-run. Keep `.cache/` out of version control.

## Step 7: Hand over

1. Bump `version` in `design-system.json` if this was an update.
2. Turn `### Unreleased` in `src/CHANGELOG.md` into a dated version entry, and rebuild.
3. Tell the user:
   - where the gallery (`docs/mocks/index.html`) and the system (`docs/design-system/index.html`) are
   - the counts: screens, states, components kept, added and pruned
   - the accent and prefix
   - the open questions
4. Point to what comes next: component requirements and implementation. Frontend components keep the BEM
   classes and accessible state semantics from the mocks, read tokens by role, and use the `--<prefix>-`
   knobs.

---

## Quality bar

- Every check in Step 6 passes with zero errors. `audit_usage.py --strict` is clean.
- Every manifest state has a file. Every component the mocks use has a page. No component without a mock
  use survives, apart from the core set and explicit `--keep`s.
- No raw colours or off-scale values anywhere. New values become named tokens with changelog entries.
- Every component page shows distinct variants and visibly different states in light and dark, with real
  app copy.
- Side by side with Banaro, the app is clearly the same family, and clearly its own product.
