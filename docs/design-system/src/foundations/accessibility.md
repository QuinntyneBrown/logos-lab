---
title: Accessibility
summary: WCAG 2.2 AA is part of every component — native semantics first, visible focus, real labels, generous targets.
---

## Principles

Accessibility is designed in, not added later. Every component page documents its role, keyboard map,
focus, labelling, contrast, motion and touch behaviour, and every specimen passes the automated checks.

- **Native first.** Use `<button>`, `<a href>`, `<label>`, `<fieldset>`, `<dialog>` and `<details>`
  before ARIA. Add ARIA only for patterns HTML cannot express (tabs, menus, live regions), following the
  WAI-ARIA Authoring Practices.
- **Visible focus everywhere:** a 2px `--color-focus-ring` outline offset 3px (`--focus-ring-width`,
  `--focus-ring-offset`), on every interactive element, in both themes.
- **Contrast:** text meets 4.5:1 and large text, control edges and focus indicators meet 3:1. Every
  declared pair is verified in both themes by `check_contrast.py`.
- **Targets:** at least 24×24px (`--target-min`), and 44px (`--target-comfortable`) for primary and
  touch actions.
- **Never colour alone.** Status pairs a tone with an icon or dot and words.

## Specimens

Key pairs, live in both themes.

## Usage

- **Labels:** every control has a visible label. Help and errors are linked with `aria-describedby`;
  invalid fields set `aria-invalid="true"`; required fields say so in words.
- **Errors:** on submit, show an error summary at the top with links to each field, move focus to it, and
  keep the person's input.
- **Live updates:** use `role="status"` for confirmations and `role="alert"` only for errors that need
  attention now.
- **Overlays:** dialogs trap focus, close on Escape and return focus to their opener. Destructive dialogs
  start on Cancel.
- **Motion:** honour `prefers-reduced-motion`. Honour `prefers-contrast` and `forced-colors` through the
  token overrides.
- **Every page** has a skip link, one `main` landmark, one `h1` and named navigation landmarks.
