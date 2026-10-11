# Component requirements documents

One CRD per shared component in `frontend/projects/components`: `<component>.md` holds the
requirements and Given/When/Then acceptance criteria, `<component>.html` renders every variant and
state in light and dark with the design system's own styles. A component is built only after its CRD
exists; when its behaviour changes, the CRD changes first (`AGENTS.md`).

Check the set after every edit:

```bash
python .claude/skills/writing-component-requirements-documents/scripts/check_crds.py docs/specs/components
```

| Component | Selector | Status | Traces to | Requirements | Rendering | Design system |
|---|---|---|---|---|---|---|
| Brand | `ll-brand` | built | L2-127, L2-130, L2-132, L2-134 | [brand.md](brand.md) | [brand.html](brand.html) | [brand](../../design-system/components/brand.html) |
| Button | `button[llButton]`, `a[llButton]`, `button[llIconButton]`, `a[llIconButton]` | built | L2-126, L2-127, L2-129, L2-132, L2-134, L2-150 | [button.md](button.md) | [button.html](button.html) | [button](../../design-system/components/button.html) |
| Error page | `ll-error-page` | planned | L2-127, L2-129, L2-130, L2-134, L2-141, L2-150 | [error-page.md](error-page.md) | [error-page.html](error-page.html) | [error-page](../../design-system/components/error-page.html) |
| Footer | `ll-footer` | built | L2-127, L2-130, L2-134, L2-150 | [footer.md](footer.md) | [footer.html](footer.html) | [footer](../../design-system/components/footer.html) |
| Hero | `ll-hero` | built | L2-001, L2-120, L2-127, L2-129, L2-130, L2-134, L2-150 | [hero.md](hero.md) | [hero.html](hero.html) | [hero](../../design-system/components/hero.html) |
| Skip link | `ll-skip-link` | built | L2-126, L2-129, L2-134, L2-147 | [skip-link.md](skip-link.md) | [skip-link.html](skip-link.html) | [skip-link](../../design-system/components/skip-link.html) |
| Text field | `input[llInput]`, `form[llSearch]`, `div[llSearch]` | built | L2-001, L2-003, L2-126, L2-127, L2-128, L2-129, L2-130, L2-132, L2-134, L2-150 | [text-field.md](text-field.md) | [text-field.html](text-field.html) | [text-field](../../design-system/components/text-field.html) |
| Top bar | `ll-top-bar` | built | L2-126, L2-127, L2-129, L2-130, L2-131, L2-132, L2-134, L2-150 | [top-bar.md](top-bar.md) | [top-bar.html](top-bar.html) | [top-bar](../../design-system/components/top-bar.html) |
