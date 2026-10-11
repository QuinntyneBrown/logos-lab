# ADR-0001: Front-end workspace, styling and acceptance testing

- **Status:** Accepted
- **Date:** 2026-10-11
- **Deciders:** Logos Lab engineering

## Context

The detailed-design baseline (`docs/detailed-designs/README.md`) names the Logos Lab Web structure
(`projects/logos-lab`, `projects/components`, `projects/api`) and leaves several choices to be
confirmed by an ADR before implementation: the Angular version, how design-system styles reach
components, how text is externalized, and how the Playwright suite runs without the API, which is
built separately.

## Decision

1. **Workspace.** The Angular workspace lives in `frontend/` with the application `logos-lab` and the
   libraries `@logos-lab/components` and `@logos-lab/api`, imported through TypeScript path aliases to
   their sources. Angular **21.2** is used: Angular 22 requires a newer Node.js than the build images
   provide (22.22.0). Upgrading is a separate change.
2. **Styles.** `frontend/projects/components/styles/logos-lab.scss` is the only global stylesheet. It
   loads the fonts and `tokens.css` straight from `docs/design-system/` (one source of truth) and the
   foundations: the `@base`, `link` and `layout` blocks of `components.css`. Every other block of
   `components.css` moves into the `.scss` of the component that owns it, with emulated
   encapsulation. A component whose classes other templates use on native elements (for example
   `.btn` on an `<a>`) is an attribute component (`a[llButton]`), so its styles stay encapsulated.
3. **Text.** User-facing text is marked with Angular's built-in i18n (`i18n` attributes and
   `$localize`), with en-CA as the source locale (`L2-147`). No runtime translation library is added.
4. **Rendering.** The application is client-rendered for now. Server rendering of public pages
   (`L2-142`) is delivered as its own slice of the *Server-render public pages* feature.
5. **Acceptance tests.** The Playwright suite lives in `e2e/`, runs in Chromium only, and starts the
   application with `ng serve`. The API is stubbed in the browser: the `api` fixture
   (`e2e/fixtures/api-stub.ts`) intercepts `/api/v1/**`, and each test declares the responses its
   screen needs, shaped like the contracts in the detailed designs. An undeclared call answers 501.
   Page objects in `e2e/pages/` own every selector; tests never contain one.

## Consequences

- The front end can be built and tested before the API exists, against the documented contracts.
- When server rendering lands, browser-side stubs no longer cover server-side requests; that slice
  must add a stub server for the API origin.
- Component styles are copied from `components.css`; a change to a component's design changes the
  design system first and then the component's `.scss`.
