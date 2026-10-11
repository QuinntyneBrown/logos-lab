# Logos Lab detailed designs

One detailed design per feature, grouped by subsystem. Each feature folder holds a `README.md` with
four sections (Overview, Description, Requirements, Diagrams) and a `diagrams/` folder of PlantUML
sources with their rendered PNG images.

```
docs/detailed-designs/{subsystem}/{feature}/
├── README.md
└── diagrams/   *.puml sources and the *.png images the README embeds
```

The designs refine the requirements in [`docs/specs/L1.md`](../specs/L1.md) and
[`docs/specs/L2.md`](../specs/L2.md). Each design lists only L2 requirements, each with the L1 it
refines. Screen behaviour follows the mocks in [`docs/mocks/`](../mocks/README.md), and screen parts
use the components in [`docs/design-system/`](../design-system/README.md). Shared library components
also have component requirements documents in `docs/specs/components/`.

Render every diagram after an edit:

```bash
python ~/.claude/skills/writing-software-design-documents/scripts/render_puml.py docs/detailed-designs
```

## Architecture baseline

Every feature design uses the containers, layers and names below. A design that departs from this
baseline records the reason in an ADR in `docs/adr/`. Choices that the specifications do not fix are
marked "baseline choice"; each should be confirmed by an ADR before implementation.

### Containers

| Container | Technology | Responsibility |
|---|---|---|
| **Logos Lab Web** | Angular, with Angular SSR on Node.js | The single web application for every role. Server-renders public pages (`L2-142`) and runs as a single-page application after hydration. |
| **Logos Lab API** | Next.js route handlers (App Router), TypeScript | The JSON API under `/api/v1`. Holds the domain services, actions and jobs. |
| **Logos Lab Worker** | Node.js process that shares the API's domain code (baseline choice) | Runs background jobs: media processing, email, reminders, scheduled publishing, exports and retention (`L2-140`). |
| **Logos Lab database** | PostgreSQL on Amazon RDS, Multi-AZ, Canada (Central) | System of record. Also holds the full-text search index (baseline choice). |
| **Media storage** | Amazon S3, private buckets, Canada (Central) | Uploaded images, video sources and renditions, SCORM packages, exports. |
| **SCORM content origin** | Amazon CloudFront on a separate registrable domain (`<TO SUPPLY>`) | Serves unpacked SCORM content on an origin that shares no cookies with `www.logoslab.ca` (`L2-034`). |
| **CDN** | Amazon CloudFront with AWS WAF | Serves the web application, public content and signed media. Never caches personal data (`L2-113`). |
| **Job queue** | Amazon SQS with a dead-letter queue (baseline choice) | Carries job messages from the API to the Worker. |
| **Cache** | Amazon ElastiCache for Redis (baseline choice) | Rate-limit counters and short-lived caches. |

External systems: **Amazon SES** (email), **AWS Elemental MediaConvert** (video transcoding to HLS),
**malware scanner** (`<TO SUPPLY>`), **AWS KMS** and **AWS Secrets Manager**, **Amazon CloudWatch**
(logs, metrics, alarms), **on-call channel** (`<TO SUPPLY>`). The **Tessera video-player** and
**Tessera scorm-player** are libraries embedded in Logos Lab Web.

### Logos Lab Web structure

- `projects/logos-lab` — the application. Pages are routed, standalone Angular components named
  `<Name>Page` (for example `CourseOverviewPage`). Dialogs are components named `<Name>Dialog`, opened
  with the Angular CDK `Dialog` service.
- `projects/components` — the shared components library. Components use the `ll-` selector prefix and
  the design-system names (`ll-button`, `ll-content-card`, `ll-course-outline`, `ll-player`, …). Each
  component has a CRD in `docs/specs/components/`.
- `projects/api` — the shared API library. Each area has a contract interface (for example
  `CoursesApi`), an `InjectionToken` (for example `COURSES_API`) and an HTTP implementation (for
  example `HttpCoursesApi`). Pages depend on the contract; the application binds the token at its
  composition root.
- Every component has separate `.ts`, `.html` and `.scss` files. Styles read design tokens by role
  (`--color-fg-default`, `--space-*`), never by value.

### Logos Lab API structure

- **Route handlers** — `app/api/v1/<area>/.../route.ts`. Thin: parse and validate the request, call one
  action, map the result to JSON or an RFC 9457 problem response. No business rules.
- **Middleware pipeline** — in order: request logging, exception handling, security headers, CSRF
  check, rate limiting, authentication (session resolution), authorization policy. Request logging sits
  outside exception handling so handled statuses are logged. Endpoints require authentication unless
  marked anonymous.
- **Actions** — one use case each, named `<Verb><Noun>Action` (for example `EnrolInCourseAction`).
  Actions own the transaction and call domain services and repositories.
- **Domain services and entities** — business rules, named `<Noun>Service` and plain entity names
  (`Course`, `Enrolment`).
- **Repositories** — `<Noun>Repository`, PostgreSQL access through a query builder (`<TO SUPPLY>`).
  Every query for user-owned data takes the current user's id (`L2-017`).
- **Jobs** — `<Noun><Verb>Job` (for example `EventReminderJob`), enqueued to SQS and run by the Worker.
  Jobs are idempotent and retried with backoff (`L2-140`).
- **Migrations** — run explicitly in the deployment pipeline, never at API start-up (`L2-139`).

### Diagram conventions

Every feature has `c4-context`, `c4-container` and `c4-component` diagrams built from the C4-PlantUML
macros, a `class-structure` diagram, and one `sequence-<behaviour>` diagram per behaviour. Sequence
diagrams group participants in boxes: `Frontend — Logos Lab Web` (`#E0F2FE`),
`Backend — Logos Lab API` (`#D1FADF`), `Backend — Logos Lab Application and Domain` (`#ECFDF3`) and
`Backend — Logos Lab Infrastructure` (`#FFF4E5`).

## Subsystems and features

<!-- features:start -->
### discovery

Home page, catalogue, search and topic pages (`L1-001`).

| Feature | L2 requirements |
|---|---|
| [Browse the catalogue](discovery/browse-catalogue/README.md) | `L2-002` |
| [Browse a topic](discovery/browse-topic/README.md) | `L2-005` |
| [Home page](discovery/home-page/README.md) | `L2-001` |
| [Search content](discovery/search-content/README.md) | `L2-003`, `L2-004` |

### accounts

Registration, sign-in, sessions, password and profile (`L1-002`).

| Feature | L2 requirements |
|---|---|
| [Change password and email](accounts/change-password-and-email/README.md) | `L2-012` |
| [Edit member profile](accounts/edit-member-profile/README.md) | `L2-013` |
| [Manage sessions](accounts/manage-sessions/README.md) | `L2-010` |
| [Register an account](accounts/register-account/README.md) | `L2-006` |
| [Reset password](accounts/reset-password/README.md) | `L2-011` |
| [Set up two-step verification](accounts/set-up-two-step-verification/README.md) | `L2-014` |
| [Sign in](accounts/sign-in/README.md) | `L2-008`, `L2-009` |
| [Verify email](accounts/verify-email/README.md) | `L2-007` |

### authorization

Roles, permissions, ownership and account states (`L1-003`).

| Feature | L2 requirements |
|---|---|
| [Change user roles](authorization/change-user-roles/README.md) | `L2-018` |
| [Enforce anonymous boundaries](authorization/enforce-anonymous-boundaries/README.md) | `L2-015` |
| [Enforce role permissions](authorization/enforce-role-permissions/README.md) | `L2-016` |
| [Manage account states](authorization/manage-account-states/README.md) | `L2-019` |
| [Scope owned data](authorization/scope-owned-data/README.md) | `L2-017` |

### experts

Expert onboarding, profiles, directory and follows (`L1-004`).

| Feature | L2 requirements |
|---|---|
| [Browse experts](experts/browse-experts/README.md) | `L2-022` |
| [Edit an expert profile](experts/edit-expert-profile/README.md) | `L2-023` |
| [Follow an expert](experts/follow-expert/README.md) | `L2-024` |
| [Onboard an invited expert](experts/onboard-invited-expert/README.md) | `L2-020` |
| [View an expert profile](experts/view-expert-profile/README.md) | `L2-021` |

### courses

Course pages, structure, enrolment, lessons, progress and certificates (`L1-005`).

| Feature | L2 requirements |
|---|---|
| [Build a course structure](courses/build-course-structure/README.md) | `L2-026` |
| [Complete a course and earn a certificate](courses/complete-course-and-earn-certificate/README.md) | `L2-031` |
| [Enrol in a course](courses/enrol-in-course/README.md) | `L2-027` |
| [Play a lesson](courses/play-lesson/README.md) | `L2-028`, `L2-029` |
| [Track course progress](courses/track-course-progress/README.md) | `L2-030` |
| [Verify a certificate](courses/verify-certificate/README.md) | `L2-032` |
| [View a course overview](courses/view-course-overview/README.md) | `L2-025` |

### learning-modules

SCORM upload, isolation, launch and runtime data (`L1-006`).

| Feature | L2 requirements |
|---|---|
| [Launch a learning module](learning-modules/launch-learning-module/README.md) | `L2-034`, `L2-035` |
| [Record SCORM runtime data](learning-modules/record-scorm-runtime-data/README.md) | `L2-036`, `L2-037` |
| [Upload a SCORM package](learning-modules/upload-scorm-package/README.md) | `L2-033` |
| [View a module page](learning-modules/view-module-page/README.md) | `L2-038` |

### videos

Video processing, playback, captions and protected delivery (`L1-007`).

| Feature | L2 requirements |
|---|---|
| [Play a video](videos/play-video/README.md) | `L2-040`, `L2-042` |
| [Protect video delivery](videos/protect-video-delivery/README.md) | `L2-043` |
| [Provide captions and transcripts](videos/provide-captions-and-transcripts/README.md) | `L2-041` |
| [Upload and process a video](videos/upload-and-process-video/README.md) | `L2-039` |
| [View a video page](videos/view-video-page/README.md) | `L2-044` |

### articles

Article reading and related content (`L1-008`).

| Feature | L2 requirements |
|---|---|
| [Read an article](articles/read-article/README.md) | `L2-045`, `L2-046` |
| [Show related content](articles/show-related-content/README.md) | `L2-047` |

### collections

Curated collections (`L1-009`).

| Feature | L2 requirements |
|---|---|
| [Follow a collection](collections/follow-collection/README.md) | `L2-050` |
| [Manage a collection](collections/manage-collection/README.md) | `L2-049` |
| [View a collection](collections/view-collection/README.md) | `L2-048` |

### events

Events, registration, waitlists, reminders and recordings (`L1-010`).

| Feature | L2 requirements |
|---|---|
| [Add an event to a calendar](events/add-event-to-calendar/README.md) | `L2-056` |
| [Browse events](events/browse-events/README.md) | `L2-051` |
| [Cancel a registration and change an event](events/cancel-registration-and-change-event/README.md) | `L2-055` |
| [Join an online event](events/join-online-event/README.md) | `L2-058` |
| [Register for an event](events/register-for-event/README.md) | `L2-053`, `L2-054` |
| [Send event reminders](events/send-event-reminders/README.md) | `L2-057` |
| [View an event](events/view-event/README.md) | `L2-052` |
| [Watch an event recording](events/watch-event-recording/README.md) | `L2-059` |

### community

Comments, cohorts, direct messages and guidelines (`L1-011`).

| Feature | L2 requirements |
|---|---|
| [Accept the community guidelines](community/accept-community-guidelines/README.md) | `L2-068` |
| [Block a member](community/block-member/README.md) | `L2-067` |
| [Comment on content](community/comment-on-content/README.md) | `L2-060`, `L2-061`, `L2-062` |
| [Manage cohorts](community/manage-cohorts/README.md) | `L2-063` |
| [Send direct messages](community/send-direct-messages/README.md) | `L2-065`, `L2-066` |
| [Take part in a cohort](community/take-part-in-cohort/README.md) | `L2-064` |

### learner-dashboard

The learner's personal space (`L1-012`).

| Feature | L2 requirements |
|---|---|
| [Save items](learner-dashboard/save-items/README.md) | `L2-071` |
| [View the dashboard overview](learner-dashboard/view-dashboard-overview/README.md) | `L2-069` |
| [View following](learner-dashboard/view-following/README.md) | `L2-074` |
| [View my certificates](learner-dashboard/view-my-certificates/README.md) | `L2-073` |
| [View my events](learner-dashboard/view-my-events/README.md) | `L2-072` |
| [View my learning](learner-dashboard/view-my-learning/README.md) | `L2-070` |

### authoring

Studio and the editorial workflow (`L1-013`).

| Feature | L2 requirements |
|---|---|
| [Archive content](authoring/archive-content/README.md) | `L2-081` |
| [Autosave and resolve conflicts](authoring/autosave-and-resolve-conflicts/README.md) | `L2-084` |
| [Move through the editorial workflow](authoring/move-through-editorial-workflow/README.md) | `L2-076`, `L2-077` |
| [Preview content](authoring/preview-content/README.md) | `L2-078` |
| [Revise published content](authoring/revise-published-content/README.md) | `L2-080` |
| [Schedule and publish](authoring/schedule-and-publish/README.md) | `L2-079` |
| [Upload images](authoring/upload-images/README.md) | `L2-083` |
| [Use the authoring workspace](authoring/use-authoring-workspace/README.md) | `L2-075` |
| [Validate required metadata](authoring/validate-required-metadata/README.md) | `L2-082` |

### moderation

Reports, moderation actions, audit trail and appeals (`L1-014`).

| Feature | L2 requirements |
|---|---|
| [Appeal a moderation decision](moderation/appeal-decision/README.md) | `L2-090` |
| [Hide content automatically](moderation/hide-content-automatically/README.md) | `L2-088` |
| [Record the moderation audit trail](moderation/record-moderation-audit-trail/README.md) | `L2-089` |
| [Report content](moderation/report-content/README.md) | `L2-085` |
| [Take a moderation action](moderation/take-moderation-action/README.md) | `L2-087` |
| [Work the moderation queue](moderation/work-moderation-queue/README.md) | `L2-086` |

### notifications

In-app and email notifications, preferences and CASL (`L1-015`).

| Feature | L2 requirements |
|---|---|
| [Comply with CASL](notifications/comply-with-casl/README.md) | `L2-094` |
| [Manage notification preferences](notifications/manage-notification-preferences/README.md) | `L2-093` |
| [Send email notifications](notifications/send-email-notifications/README.md) | `L2-092` |
| [Show in-app notifications](notifications/show-in-app-notifications/README.md) | `L2-091` |

### administration

Users, taxonomy, featured content, settings and audit log (`L1-016`).

| Feature | L2 requirements |
|---|---|
| [Curate featured content](administration/curate-featured-content/README.md) | `L2-097` |
| [Manage site settings and announcements](administration/manage-site-settings-and-announcements/README.md) | `L2-098` |
| [Manage the topic taxonomy](administration/manage-topic-taxonomy/README.md) | `L2-096` |
| [Manage users](administration/manage-users/README.md) | `L2-095` |
| [Record the administrative audit log](administration/record-admin-audit-log/README.md) | `L2-099` |

### analytics

Expert and platform analytics and exports (`L1-017`).

| Feature | L2 requirements |
|---|---|
| [Export analytics](analytics/export-analytics/README.md) | `L2-103` |
| [View expert content analytics](analytics/view-expert-content-analytics/README.md) | `L2-100`, `L2-102` |
| [View platform analytics](analytics/view-platform-analytics/README.md) | `L2-101`, `L2-102` |

### security

OWASP controls, sessions, uploads, secrets and encryption (`L1-018`).

| Feature | L2 requirements |
|---|---|
| [Encrypt data at rest](security/encrypt-data-at-rest/README.md) | `L2-112` |
| [Enforce transport security and headers](security/enforce-transport-security-and-headers/README.md) | `L2-104` |
| [Log security events](security/log-security-events/README.md) | `L2-111` |
| [Protect sessions and CSRF](security/protect-sessions-and-csrf/README.md) | `L2-106` |
| [Rate limit requests](security/rate-limit-requests/README.md) | `L2-107` |
| [Secure dependencies and code](security/secure-dependencies-and-code/README.md) | `L2-110` |
| [Secure file uploads](security/secure-file-uploads/README.md) | `L2-108` |
| [Store passwords and secrets](security/store-passwords-and-secrets/README.md) | `L2-109` |
| [Validate input and encode output](security/validate-input-and-encode-output/README.md) | `L2-105` |

### privacy

Residency, consent, export, deletion and retention (`L1-019`).

| Feature | L2 requirements |
|---|---|
| [Delete an account](privacy/delete-account/README.md) | `L2-117` |
| [Enforce data retention](privacy/enforce-data-retention/README.md) | `L2-118` |
| [Export personal data](privacy/export-personal-data/README.md) | `L2-116` |
| [Keep data in Canada](privacy/keep-data-in-canada/README.md) | `L2-113` |
| [Manage cookie consent](privacy/manage-cookie-consent/README.md) | `L2-115` |
| [Record privacy consent](privacy/record-privacy-consent/README.md) | `L2-114`, `L2-119` |

### performance

Web vitals, API budgets, load and caching (`L1-020`).

| Feature | L2 requirements |
|---|---|
| [Cache responses](performance/cache-responses/README.md) | `L2-124` |
| [Meet API response times](performance/meet-api-response-times/README.md) | `L2-121`, `L2-122` |
| [Meet Core Web Vitals](performance/meet-core-web-vitals/README.md) | `L2-120`, `L2-123` |

### accessibility

WCAG 2.2 AA conformance and keyboard operation (`L1-021`).

| Feature | L2 requirements |
|---|---|
| [Ensure accessible pages](accessibility/ensure-accessible-pages/README.md) | `L2-125`, `L2-127`, `L2-128`, `L2-129` |
| [Support keyboard and focus](accessibility/support-keyboard-and-focus/README.md) | `L2-126` |

### responsive-theming

Viewports, global navigation and themes (`L1-022`).

| Feature | L2 requirements |
|---|---|
| [Adapt layouts across viewports](responsive-theming/adapt-layouts-across-viewports/README.md) | `L2-130`, `L2-132` |
| [Navigate globally](responsive-theming/navigate-globally/README.md) | `L2-131` |
| [Select theme](responsive-theming/select-theme/README.md) | `L2-133`, `L2-134` |

### operations

Availability, monitoring, backups, deployment, jobs and error pages (`L1-023`).

| Feature | L2 requirements |
|---|---|
| [Back up and recover](operations/back-up-and-recover/README.md) | `L2-138` |
| [Deploy and migrate](operations/deploy-and-migrate/README.md) | `L2-139` |
| [Log and trace](operations/log-and-trace/README.md) | `L2-137` |
| [Monitor and alert](operations/monitor-and-alert/README.md) | `L2-136` |
| [Run background jobs](operations/run-background-jobs/README.md) | `L2-140` |
| [Show error pages](operations/show-error-pages/README.md) | `L2-141` |
| [Stay available](operations/stay-available/README.md) | `L2-135` |

### seo

Server rendering, metadata, indexing and stable URLs (`L1-024`).

| Feature | L2 requirements |
|---|---|
| [Control indexing](seo/control-indexing/README.md) | `L2-145` |
| [Keep stable URLs](seo/keep-stable-urls/README.md) | `L2-146` |
| [Publish page metadata](seo/publish-page-metadata/README.md) | `L2-143`, `L2-144` |
| [Server-render public pages](seo/server-render-public-pages/README.md) | `L2-142` |

### internationalization

Externalized text and locale formatting (`L1-025`).

| Feature | L2 requirements |
|---|---|
| [Externalize UI text](internationalization/externalize-ui-text/README.md) | `L2-147`, `L2-149` |
| [Format for locale](internationalization/format-for-locale/README.md) | `L2-148` |
<!-- features:end -->
