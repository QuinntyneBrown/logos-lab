## Project Overview

Logos Lab ([www.logoslab.ca](https://www.logoslab.ca)) is an LMS-driven platform centred on the
intersection of Christianity and AI. Experts curate the content, and the site is responsive across
devices. It offers:

- **Expert profiles**
- **Courses** developed by experts, alongside courses developed by Logos Lab itself
- **Curated collections** of content and videos, from both experts and Logos Lab
- **Videos**
- **Articles**
- **Events**
- **Learning modules**
- **Community**

- **Frontend:** Angular
- **Backend:** Next.js with PostgreSQL
- **Hosting:** AWS
- **Video player:** [Tessera video-player](https://github.com/QuinntyneBrown/Tessera/tree/main/src/video-player)
- **SCORM player:** [Tessera scorm-player](https://github.com/QuinntyneBrown/Tessera/tree/main/src/scorm-player)

Founder and Chief Product Officer: Quinntyne Brown.

## Repository layout

- `frontend/` — the Angular workspace: the `logos-lab` application and the `@logos-lab/components` and
  `@logos-lab/api` libraries (see `docs/adr/0001-frontend-workspace-and-testing.md`)
- `e2e/` — the Playwright acceptance suite: `tests/`, page objects in `pages/`, the API stub in `fixtures/`
- `docs/specs/` — requirements (`L1.md` high-level, `L2.md` detailed with acceptance criteria)
- `docs/specs/components/` — component requirements documents (CRDs): `<component>.md` and
  `<component>.html` per component, tracing to L2; see `docs/specs/components/README.md`
- `docs/detailed-designs/` — one detailed design per feature, grouped by subsystem; see `docs/detailed-designs/README.md`
- `docs/mocks/` — static design reference (every page and state, light and dark); see `docs/mocks/README.md`
- `docs/design-system/` — tokens, foundations, components, and patterns extracted from the mocks; to give
  the product the Banaro look, seed it and write the mocks with the `applying-banaro-design-system` skill
- `docs/adr/` — architecture decisions; read relevant ADRs before changing the areas they cover
- `.claude/skills/` and `.agents/skills/` — the skills this repository expects agents to follow
- `.claude/references/` and `.agents/references/` — shared references the skills link to, such as the
  Definition of Done

`AGENTS.md` is the single source of agent guidance; `CLAUDE.md`, `GEMINI.md`, and
`.github/copilot-instructions.md` point here. Skills in `.agents/skills/` mirror `.claude/skills/`;
change both together. If a change needs a different layout, record the decision in `docs/adr/` and
update this section in the same change.

## Backend conventions

- Business rules live in domain services, actions, and jobs — not controllers.
- The API does **not** run database migrations on startup. Run them explicitly.
- Seed data is idempotent and safe to re-run.
- Endpoints require authentication by default. Preserve intentional anonymous access and middleware ordering when changing API auth.
- Keep request logging outside the exception-handling middleware so handled response statuses are logged correctly.
- User-owned data must remain scoped to the current user; resources belonging to other users should never be exposed.

### Tests

Back end tests are integration tests against the API. Follow the existing test patterns when adding coverage.

## Frontend conventions

- The formatter owns formatting and the linter owns lint; CI fails on either. Run both before pushing.
- **One type per file, strictly.** Every class, interface, type alias, and enum gets its own file, named after the type (`course-summary.ts` exports `CourseSummary`). No file declares a second exported or unexported type, and no barrel or `models.ts` file holds several types. Barrels (`index.ts`, `public-api.ts`) only re-export.
- **No single-file components.** Every Angular component has separate `.ts`, `.html`, and `.scss` files and uses `templateUrl` and `styleUrl`; never `template` or `styles` inline, however small the component.
- Components should preserve the mock design's BEM classes and accessible state semantics; e2e locators depend on that parity.
- Keep component styles encapsulated and global styles limited to shared foundations and utilities.
- **Read design tokens by role, never by value.** Use the CSS custom properties from the design system (for example `--color-fg-default` for text, `--color-accent` for fills, `--color-border-strong` for borders, `--space-*` for spacing), never hex values or magic numbers.
- Every reusable component lives in a shared components library; applications import it and never copy it.
- API services live in a shared API library with a contract and injection token; each application binds the tokens at its composition root, and pages depend on the contract, not the concrete implementation.
- **No inline forms in pages.** Button-triggered editing always opens a dialog or navigates to a screen.
- Use the framework's dialog/overlay primitives for modal behavior; don't hand-roll modals.

## Scope, Simplicity, and Zero-Waste Engineering (CRITICAL)

This is the absolute highest-priority rule in this repository. AI agents tend to over-engineer, hallucinate future needs, and balloon codebase complexity. This kills project velocity and comprehensibility. You must resist this impulse. Deliver radically simple solutions that fulfill the exact prompt—nothing more.

### 1. Absolute Scope Lock
*   **Deliver Only the Explicit Request:** Implement exactly what is asked for in the immediate task. Do not invent features, add unrequested states, create predictive API endpoints, or spin up new UI screens/components unless explicitly ordered.
*   **Zero Future-Proofing:** Do not write code for "imagined future use cases." Write code strictly for the present moment. If the user didn't ask for it today, it does not exist.
*   **Ignore Unsent Requirements:** Documents, specs, or mocks may contain broader context or future phases. Do not implement them early. Only implement what is requested in the active prompt.

### 2. Radical Simplicity & Proportionality
*   **Proportional Diffs:** The size and footprint of your code change must match the size of the request. A small feature or fix must result in a small, clean, readable diff.
*   **Path of Least Resistance:** Always choose the simplest, most direct code path that solves the problem. Do not introduce new abstractions, architectural layers, design patterns, wrappers, or external libraries unless it is physically impossible to solve the issue without them.
*   **No Unsolicited Refactoring:** Do not "improve," rewrite, or clean up code adjacent to your task unless it is strictly broken and blocking your implementation. Leave surrounding code alone.

### 3. Hard Stop & Query Clause
*   **When in Doubt, Ask:** If a task seems to logically require expanding the scope, introduces a major jump in complexity, or conflicts with the existing architecture, **STOP IMMEDIATELY**. Do not guess. Present the trade-offs to the user and await explicit confirmation before writing a single line of code.


## E2E architecture (Playwright)

- Run the relevant Playwright tests for UI changes; update visual baselines only for intentional design changes.
- Run frontend tests in Chromium only. Do not configure or run Firefox, WebKit, or any other browser for frontend testing.

## Incremental Implementation and ATDD - mandatory

Mocks and the design system are design artifacts. ATDD does not apply to their
development. Do not write tests for mocks or the design system.

Every new feature or change to production behavior MUST have a requirement, a
detailed design, and a mock before implementation begins. This includes
behavioral changes to existing features, such as changing how a page behaves.
This requirement applies to production-code changes only; documentation-only,
design-system-only, mock-only, and test-only changes are out of scope unless
they are part of implementing a production behavior change.

A component in the shared components library also MUST have a component
requirements document (CRD) in `docs/specs/components/` before it is built or
changed. Write it with the `writing-component-requirements-documents` skill
(`.claude/skills/writing-component-requirements-documents` and
`.agents/skills/writing-component-requirements-documents`), and only after L1/L2
and the design system or mocks exist. The CRD is complete enough to build the
whole component without later API changes, and its Given-When-Then criteria
are the slices' acceptance criteria. If a component's behaviour has to change,
the CRD changes first.

Every production behavior implementation MUST invoke and follow the
`implementing-incrementally` skill (`.claude/skills/implementing-incrementally`
and `.agents/skills/implementing-incrementally`) before any code is written,
combined with acceptance test-driven development (ATDD). Plan small,
reviewable slices, then complete one slice at a time: write Given-When-Then
acceptance criteria, write the acceptance test, and run it to prove it fails for
the expected reason BEFORE writing production code. Implement only what satisfies
that slice, refactor with tests green, and run the relevant regression checks.
Do not move to the next slice until those checks pass. No bulk implementation,
no tests added afterward, and no weakening tests to manufacture a pass. Keep
the requirement, detailed design, mock, criteria, tests, and implementation
aligned until the entire feature or behavior change is complete. Before
declaring a slice done, clear the Definition of Done in
`.claude/references/definition-of-done.md`.

Back end: integration tests against the API. Front end: Playwright, using the
Page Object Model - one page object per screen, owning the selectors and the
interactions. Tests state intent; page objects know the DOM. Never put a
selector in a test.

### Never write architecture tests

Never add a test that asserts the shape of the codebase rather than its behavior:
no structure, layout, or naming tests; no banned-API scans; no traceability tests
that parse the specifications. Those constraints belong to the compiler, the
formatter, and review. A test suite exists to prove behavior.
