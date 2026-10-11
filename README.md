# Logos Lab

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status: in design](https://img.shields.io/badge/status-in%20design-orange.svg)](#project-status)
[![WCAG 2.2 AA](https://img.shields.io/badge/accessibility-WCAG%202.2%20AA-green.svg)](docs/specs/L1.md#l1-021-accessibility)
[![Website](https://img.shields.io/badge/web-logoslab.ca-informational.svg)](https://www.logoslab.ca)

Logos Lab is an expert-curated learning platform centred on the intersection of Christianity and
artificial intelligence. Subject-matter experts author courses, videos, articles, interactive learning
modules and events; Logos Lab editors review and curate them; and learners study, discuss and earn
certificates in a responsive, accessible web experience.

This repository contains the requirements, designs and source code for
[www.logoslab.ca](https://www.logoslab.ca).

## Table of contents

- [Features](#features)
- [Project status](#project-status)
- [Architecture](#architecture)
- [Getting started](#getting-started)
- [Repository layout](#repository-layout)
- [Documentation](#documentation)
- [How we build](#how-we-build)
- [Contributing](#contributing)
- [Code of conduct](#code-of-conduct)
- [Reporting security issues](#reporting-security-issues)
- [Support](#support)
- [Contributors](#contributors)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Features

| Area | What it delivers |
|---|---|
| **Discovery and search** | Home page, filterable catalogue, topic pages and site-wide search across all published content. |
| **Expert profiles** | Public profiles presenting each expert and everything they have contributed; members can follow experts. |
| **Courses** | Structured courses of ordered sections and lessons, written by experts or by Logos Lab, with progress tracking and verifiable certificates of completion. |
| **Learning modules** | Interactive SCORM modules played in the [Tessera scorm-player](https://github.com/QuinntyneBrown/Tessera/tree/main/src/scorm-player), with recorded progress, scores and resume. |
| **Videos** | Adaptive-quality playback in the [Tessera video-player](https://github.com/QuinntyneBrown/Tessera/tree/main/src/video-player), with captions, transcripts and resume. |
| **Articles** | Long-form articles with author attribution, reading time and related content. |
| **Curated collections** | Themed, ordered collections of any content type, curated by experts and Logos Lab. |
| **Events** | Online and in-person events with registration, waitlists, calendar integration, reminders and recordings. |
| **Community** | Comments on content, private course cohorts and direct messages, governed by community guidelines. |
| **Learner dashboard** | In-progress and completed learning, saved items, follows, registered events and certificates. |
| **Authoring and publishing** | An editorial workflow — draft, review, schedule, publish, revise, archive — in which no expert content is published without editor approval. |
| **Moderation** | Reporting, a moderation queue, actions, appeals and a full audit trail. |
| **Notifications** | In-app and email notifications with user-controlled preferences and CASL-compliant email. |
| **Administration and analytics** | User, role, taxonomy and site management, plus privacy-preserving engagement and completion analytics. |

Across every feature the platform is held to the same quality bar:

- **Secure by default** — protection against the OWASP Top 10, encryption in transit and at rest.
- **Private** — PIPEDA compliance, personal data kept in Canada, data export and account deletion.
- **Accessible** — WCAG 2.2 Level AA on every page, dialog, player and notification.
- **Responsive and themed** — extra-small through extra-large viewports, in light and dark themes.
- **Fast** — defined Core Web Vitals, API latency and front-end asset budgets, held under peak load.
- **Ready for French** — launches in English (en-CA), with all UI text externalized for translation.

All content is free with an account at launch.

## Project status

Logos Lab is **in design**. The high-level and detailed requirements are written; detailed designs,
HTML mocks and the design system come next, followed by incremental implementation. Interfaces,
commands and layout described below reflect the target state and may change before the first release.

## Architecture

| Layer | Technology |
|---|---|
| Frontend | [Angular](https://angular.dev) — applications built on a shared components library and a shared API library |
| Backend | [Next.js](https://nextjs.org) API |
| Database | [PostgreSQL](https://www.postgresql.org) |
| Hosting | [Amazon Web Services](https://aws.amazon.com), Canadian regions |
| Video | [Tessera video-player](https://github.com/QuinntyneBrown/Tessera/tree/main/src/video-player) |
| SCORM | [Tessera scorm-player](https://github.com/QuinntyneBrown/Tessera/tree/main/src/scorm-player) |
| End-to-end tests | [Playwright](https://playwright.dev) (Chromium) |

Key principles:

- Business rules live in domain services, actions and jobs — never in controllers.
- Endpoints require authentication by default, and user-owned data is always scoped to its owner.
- Pages depend on API contracts and injection tokens, not on concrete implementations.
- Styles read design tokens by role (for example `--color-fg-default`), never by value.

Architecture decisions are recorded in [`docs/adr/`](docs/adr/).

## Getting started

### Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org) (current LTS) and npm
- [PostgreSQL](https://www.postgresql.org) 16 or later, or [Docker](https://www.docker.com) to run it in a container
- [Playwright](https://playwright.dev) Chromium, for end-to-end tests

### Clone

```sh
git clone https://github.com/QuinntyneBrown/logos-lab.git
cd logos-lab
```

### Build and run

> The commands below describe the target developer workflow. They become available as the
> corresponding slices of the platform land.

```sh
npm ci                 # install dependencies
npm run db:migrate     # apply database migrations (the API never migrates on startup)
npm run db:seed        # load idempotent seed data; safe to re-run
npm start              # start the API and the web application
```

### Test

```sh
npm test               # backend integration tests against the API
npm run lint           # lint
npm run format:check   # formatting check
npm run e2e            # Playwright end-to-end tests (Chromium only)
```

## Repository layout

```text
.
├── .agents/              # Skills and references for AI coding agents (mirrors .claude/)
├── .claude/              # Skills and references for Claude Code
├── .github/              # GitHub configuration and Copilot instructions
├── docs/
│   ├── adr/              # Architecture decision records
│   ├── design-system/    # Tokens, foundations, components and patterns
│   ├── detailed-designs/ # One detailed design per feature, grouped by subsystem
│   ├── mocks/            # Static HTML mocks for every page and state, light and dark
│   └── specs/            # L1 and L2 requirements and component requirements documents
├── AGENTS.md             # Single source of guidance for agents and contributors
├── LICENSE
└── README.md
```

## Documentation

| Document | Purpose |
|---|---|
| [`docs/specs/L1.md`](docs/specs/L1.md) | High-level requirements, scope decisions and roles |
| [`docs/specs/L2.md`](docs/specs/L2.md) | Detailed requirements with Given/When/Then acceptance criteria |
| [`docs/specs/components/`](docs/specs/components/) | Component requirements documents for the shared components library |
| [`docs/detailed-designs/`](docs/detailed-designs/) | Per-feature detailed designs with C4, class and sequence diagrams |
| [`docs/mocks/`](docs/mocks/) | Design reference for every page and state |
| [`docs/design-system/`](docs/design-system/) | Design tokens, foundations, components and patterns |
| [`docs/adr/`](docs/adr/) | Architecture decision records |
| [`AGENTS.md`](AGENTS.md) | Engineering conventions for humans and AI agents |

## How we build

Logos Lab is built with **acceptance test-driven development**, one thin slice at a time:

1. **Specify** — every production behaviour change starts with a requirement in
   [`docs/specs/`](docs/specs/), a detailed design and, for UI, a mock.
2. **Write the acceptance test first** — translate the Given/When/Then criteria into an acceptance test
   and watch it fail for the expected reason.
3. **Implement the slice** — write only the code that makes that test pass, then refactor with tests
   green.
4. **Verify** — run the regression checks and clear the
   [Definition of Done](.claude/references/definition-of-done.md) before starting the next slice.

Backend tests are integration tests against the API. Frontend tests use Playwright with the Page Object
Model: tests state intent, and page objects own the selectors.

## Contributing

Contributions are welcome. Before you start:

1. Read [`AGENTS.md`](AGENTS.md) — it is the single source of engineering conventions for everyone,
   human or agent.
2. Open an [issue](https://github.com/QuinntyneBrown/logos-lab/issues) to discuss a new feature or
   behaviour change, so its requirement, design and mock can be agreed before code is written.
3. Fork the repository, create a branch from `main`, and work in small, reviewable slices.
4. Run the formatter, linter and relevant tests locally — CI fails on any of them.
5. Open a pull request that names the L2 requirements it implements and describes how it was tested.

All contributions are licensed under the project's [MIT License](LICENSE).

## Code of conduct

This project has adopted the
[Contributor Covenant, version 2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
Everyone participating in the project's repositories, issues, discussions and community spaces is
expected to uphold it. Report unacceptable behaviour to the project maintainers through
[GitHub](https://github.com/QuinntyneBrown).

## Reporting security issues

**Please do not report security vulnerabilities through public GitHub issues.**

Report them privately through
[GitHub private vulnerability reporting](https://github.com/QuinntyneBrown/logos-lab/security/advisories/new).
Include a description of the issue, steps to reproduce it, the affected area and its likely impact. We
will acknowledge your report, keep you informed as we investigate, and credit you when the fix is
released, if you wish.

## Support

- **Bugs and feature requests:** [GitHub Issues](https://github.com/QuinntyneBrown/logos-lab/issues)
- **Questions and ideas:** [GitHub Discussions](https://github.com/QuinntyneBrown/logos-lab/discussions)
- **The platform:** [www.logoslab.ca](https://www.logoslab.ca)

## Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/QuinntyneBrown">
        <img src="https://github.com/QuinntyneBrown.png" width="100" alt="Quinntyne Brown"><br>
        <sub><b>Quinntyne Brown</b></sub>
      </a><br>
      <sub>Founder and Chief Product Officer</sub>
    </td>
  </tr>
</table>

See the full list of [contributors](https://github.com/QuinntyneBrown/logos-lab/graphs/contributors)
who have helped build Logos Lab.

## Acknowledgements

- [Tessera](https://github.com/QuinntyneBrown/Tessera) — video and SCORM players
- The experts who curate and author Logos Lab content

## License

Copyright (c) 2026 Quinntyne Brown and the Logos Lab contributors.

Licensed under the [MIT License](LICENSE).
