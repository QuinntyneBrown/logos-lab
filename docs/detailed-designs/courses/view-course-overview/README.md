# View a course overview

## Overview

Logos Lab publishes structured courses written by invited experts or by Logos Lab itself. The
**course overview page** — public page at `/courses/{slug}` that describes one published course and
offers the learner's next action — is the entry point to every course. It is the page that search
results, catalogue cards, expert profiles and shared links open.

The page serves three kinds of viewer. A **visitor** — person who is not signed in — and a
**non-enrolled member** — signed-in member without an active enrolment in the course — see the full
description and syllabus, with every lesson title visible but no lesson openable. An **enrolled
learner** — member with an active enrolment in the course — sees a "Continue" action and a progress
percentage. When the learner belongs to an active **cohort** — group of learners who take a course
together in a shared space (`L2-064`) — the page links to the cohort space.

The overview sits at the front of the courses subsystem. Enrolment, the lesson player, progress and
certificates are separate features that this page links to.

## Description

The slice runs from a server-rendered page in Logos Lab Web to the course tables in the Logos Lab
database.

**Frontend (Logos Lab Web)**

- **`CourseOverviewPage`** — routed standalone page for `/courses/:slug`. Angular SSR renders it for
  visitors and crawlers (`L2-142`); after hydration it requests the viewer's own state. The page
  depends on the `CoursesApi` contract, never on the HTTP implementation.
- **Components used** — `ll-breadcrumb`, `ll-hero` (compact variant with title, summary, contributor
  eyebrow, cover and actions), `ll-progress-bar`, `ll-button`, `ll-course-outline` (sections as
  disclosures; lessons as done, current or locked rows with type and duration), `ll-description-list`
  (lessons, length, level, order, enrolled learners), `ll-chip` (topics), `ll-person-list`
  ("Taught by"), `ll-notice-panel` (archived notice), `ll-content-card` (related content, `L2-047`),
  `ll-skeleton` and `ll-error-page`.
- **Screen states** — `docs/mocks/pages/course-overview/` covers `default` (signed-in, not enrolled,
  with "Enrol"), `visitor` ("Sign in to enrol"), `submitting`, `enrolled` ("Continue" and progress),
  `completed` ("View your certificate"), `cohort`, `archived`, `loading`, `error` and `long`.
- **`CoursesApi`** / **`COURSES_API`** / **`HttpCoursesApi`** — API contract, injection token and HTTP
  implementation in `projects/api`. Methods: `getCourse(slug)` and `getMyCourseState(slug)`.

**API (Logos Lab API)**

- **`GET /api/v1/courses/{slug}`** — anonymous endpoint. Returns `CourseOverview`: title, summary,
  cover image, contributors (one or more experts, or Logos Lab), level, estimated total duration,
  3-8 learning outcomes, topics, navigation mode, the syllabus of sections and lessons with each
  lesson's type and duration, and the enrolled-learner count. The response holds no personal data,
  so the CDN may cache it (`L2-113`).
- **`GET /api/v1/courses/{slug}/me`** — authenticated endpoint. Returns `MyCourseState`: enrolment
  status, progress percentage, per-lesson completion and lock state, the first incomplete lesson for
  "Continue", the cohort link when one applies, and the certificate code when one is issued. Sent
  with `Cache-Control: no-store`.
- **`GetCourseOverviewAction`** and **`GetMyCourseStateAction`** — the two use cases behind the
  endpoints.
- **`CourseCatalogueService`** — decides visibility. A published course is visible to all. An
  archived course is visible only to learners enrolled in it; every other viewer receives `404`.
- **`ProgressService`** — supplies the stored progress percentage and lesson lock state (see
  `track-course-progress` and `play-lesson`).
- **`CourseRepository`**, **`EnrolmentRepository`**, **`LessonCompletionRepository`** — read the
  `courses`, `course_sections`, `course_lessons`, `course_contributors`, `enrolments` and
  `lesson_completions` tables. Queries for user-owned rows take the current user's id (`L2-017`).

**Key rules**

- Visitors and non-enrolled members see lesson titles, types and durations; lesson links are not
  rendered and the lesson endpoint refuses them (`play-lesson`).
- For an enrolled learner the primary action is "Continue", which opens the first incomplete lesson,
  and the progress indicator shows the percentage with the accessible name required by `L2-030`.
- An archived course shows enrolled learners a notice that it is no longer maintained and can still
  be finished. Non-enrolled users receive `404`.
- The enrolled-learner count counts active enrolments. Whether the count is cached, and for how long,
  is `<TO SUPPLY>`.

## Decisions for the web build

- **Contract.** `CoursesApi.getCourse(slug)` returns `CourseOverview`: `id`, `slug`, `title`, `summary`,
  `coverUrl`, `contributors` (experts, or Logos Lab), `level` (`beginner`, `intermediate` or `advanced`),
  `totalMinutes`, `outcomes` (3 to 8), `topics`, `navigation` (`sequential` or `free`), `sections` (each
  with its lessons: `id`, `title`, `kind` of `video`, `article`, `module`, `text` or `discussion`, and
  `minutes` or `null`), `enrolledCount`, `commentCount`, `saved` (`false` for a visitor) and `archivedOn`
  (`YYYY-MM-DD` or `null`). `getMyCourseState(slug)` returns `MyCourseState`: `status` (`not-enrolled`,
  `enrolled` or `completed`), `percent`, `completedLessons`, `totalLessons`, each lesson's `state`
  (`done`, `current`, `available` or `locked`), the `nextLesson` for Continue, the `cohort` when one
  applies, the `certificateCode` and `completedOn`. `enrol(slug)` answers with the `firstLessonId` to open.
  `leave(slug)` answers with `keepUntil`, the day the kept progress expires. An unverified member's
  enrol is refused with `403` and the problem `email-unverified`. A `404` for the course means no
  published course, or an archived one the viewer is not enrolled in.
- **Who sees what.** The overview needs no sign-in. A signed-in member's own state is requested after
  the page shows. While it loads, a member sees the visitor's outline and the hero without actions, so
  nothing offers "Enrol" to someone already enrolled.
- **Hero.** The eyebrow is "Course" and the contributors' names. The summary is the lead. The cover is
  the aside. The actions depend on the viewer:
  a visitor gets "Sign in to enrol" and "Create a free account", both returning to the course; a
  member who is not enrolled gets "Enrol" and Save; an enrolled learner gets the progress ("Your
  progress", the percentage, "10 of 24 lessons · next up: 3.2 …, about 14 minutes"), "Continue" to the
  next lesson and "Leave course"; a learner who completed it gets the full bar, "Completed {date} ·
  18 of 18 lessons", "View your certificate" and "Review the lessons".
- **Outline.** Course content shows "6 sections · 24 lessons · about 5 h 40 min" and a sentence about how
  lessons open, then the course outline. Lessons are locked for everyone who is not enrolled, and the
  section counts read "4 lessons"; an enrolled learner's read "4 of 4" and the lessons they may open are
  links. The section holding the next lesson starts open, and for a visitor the first and third sections
  start open as in the mock.
- **Aside.** "Taught by" (each contributor linked to their profile), "About this course" (lessons in
  sections, length, level, order, learners enrolled, and the topics as links), "Talk about it" (the
  count and a link to the comments section, which the comments feature owns), and for a learner in a
  cohort "Your cohort" with its name and a link to the cohort space. The cohort card shows the name and
  the link only; the member avatars and meeting times come with the cohorts feature, whose mocks are
  missing.
- **Enrol.** Pressing "Enrol" sends the enrolment, the button reads "Enrolling…" and is `aria-busy`, and
  on success the page opens the first lesson. An unverified member sees the verify-email prompt and
  nothing is sent a second time. A failure shows a danger alert "We couldn't enrol you just now" and the
  button comes back. The lesson player is a later feature, so until it exists the lesson address shows
  the not-found page.
- **Leave.** "Leave course" opens a confirmation dialog: "Leave {title}?", "Stay enrolled" and "Leave
  course", the busy "Leaving…", the failed alert "We couldn't remove the course" with "Try again", and
  on success a result that says progress is kept until the date with "Explore courses" and "Go to My
  learning". The overview then shows the not-enrolled state again.
- **Archived.** A learner enrolled in an archived course sees the warning "This course is no longer
  maintained" above the hero, with the date, and can continue.
- **Save.** The hero's Save works as on the article page.
- **Related, loading, failure.** Related items as on the article page, with the eyebrow "Shares topics
  with this course". Loading shows the busy skeleton and says "Loading the course…" once; a failure shows
  "We couldn't load this course" with "Try again" and a link to support; a `404` shows the not-found page.

## Requirements

| L2 ID | Refines (L1) | Requirement |
|-------|--------------|-------------|
| `L2-025` | `L1-005` | **Course overview page.** Each course has a public overview page at `/courses/{slug}`. |

## Diagrams

### System context

Visitors and learners read course overviews in Logos Lab; no external system takes part in this
slice.

![C4 system context for viewing a course overview](diagrams/c4-context.png)

### Containers

The CDN serves the server-rendered page and the cacheable public course response; the personal
learner state goes straight to the API and is never cached.

![C4 container view for viewing a course overview](diagrams/c4-container.png)

### Components

`CourseOverviewPage` calls the two `CoursesApi` methods; inside the API, two actions share the
catalogue visibility rule and read progress from `ProgressService`.

![C4 component view for viewing a course overview](diagrams/c4-component.png)

### Class structure

`CourseOverview` composes sections and lessons; `MyCourseState` carries only the viewer's own
enrolment, progress and links.

![Class diagram for viewing a course overview](diagrams/class-structure.png)

### Behaviour — view a course overview

The page loads the public overview first, then the learner state when a session exists; an archived
course returns `404` to anyone not enrolled.

![Sequence diagram for viewing a course overview](diagrams/sequence-view-overview.png)
