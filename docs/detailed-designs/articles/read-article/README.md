# Read an article

## Overview

An *article* is a piece of published long-form writing on Logos Lab, written by an expert or by Logos
Lab. The *articles* subsystem covers how articles are read, how their bodies are formatted and kept
safe, and how they point to related content. This feature covers reading an article and the rules
that govern its body.

Anyone can read a published article at `/articles/{slug}` without signing in. A signed-in member can
save it for later. Authors write the body in the article editor in Studio; the server removes
everything outside a defined set of formatting when the body is saved. Terms used below:

- **article body** — rich-text content of an article, stored after server-side sanitization
- **reading time** — word count divided by 230, rounded up to whole minutes, with a minimum of 1
- **measure** — length of a line of body text, in characters
- **Scripture reference** — citation of a Bible passage, such as "John 1:1-5", shown with its
  translation
- **pull quote** — short passage from the body repeated in larger type for emphasis
- **decorative image** — image that carries no information and is marked so that assistive technology
  skips it

## Description

The slice runs from `ArticlePage` and `ArticleEditorPage` in Logos Lab Web to the Logos Lab API, the
Logos Lab database and Media storage.

**Logos Lab Web — reading**

- **`ArticlePage`** — routed standalone component for `/articles/{slug}`, server-rendered. It shows
  title, subtitle, cover image with alt text, contributors with profile links, publish date,
  last-updated date when updated after publication, reading time, body, topics and comments.
- **Body measure** — `ll-prose` limits the body column to a maximum of 75 characters per line
  (`max-inline-size: 75ch`) at every viewport.
- **Save** — `ll-button` toggle with `aria-pressed`, calling `SavedItemsApi` from the saved-items
  feature (`L2-071`). A visitor is asked to sign in first. A toast announces "Saved" with Undo.
- **Design-system components** — `ll-breadcrumb`, `ll-prose`, `ll-avatar`, `ll-button`, `ll-chip`
  (topics), `ll-toast`, `ll-comment` (comments, `L2-060`), `ll-content-card` (related content,
  `L2-047`), `ll-alert` and `ll-skeleton`.
- **`ArticlesApi`** — contract with `getArticle(slug)`. `ARTICLES_API` is its token and
  `HttpArticlesApi` its HTTP implementation.
- **Screen states** — `docs/mocks/pages/article-page/` covers `default`, `visitor`, `saved`, `updated`,
  `loading`, `error` and `long`.

**Logos Lab Web — authoring**

- **`ArticleEditorPage`** — Studio page for the article body, using `ll-rich-editor` and
  `ll-workflow-bar`. Its route is `/studio/articles/{articleId}/edit` (baseline choice). Mocks:
  `docs/mocks/pages/article-editor/` (`default`, `empty`, `scripture`, `invalid`, `loading`, `error`,
  `long`).
- **`ImageUploadDialog`** — CDK dialog that uploads an image, asks for alt text or the decorative
  mark, and sets a focal point. Mocks: `docs/mocks/dialogs/image-upload/` (`default`, `busy`,
  `alt-text`, `focal-point`, `invalid`, `failed`, `success`). Upload and malware scanning are owned
  by `L2-083` and `L2-108`.
- **`StudioArticlesApi`** — contract with `saveBody(articleId, body)` and `submit(articleId)`.
  `STUDIO_ARTICLES_API` is its token and `HttpStudioArticlesApi` its HTTP implementation.

**Logos Lab API**

- **`GET /api/v1/articles/{slug}`** — anonymous. Calls `GetArticleAction`, which returns a published
  article or `404`.
- **`PUT /api/v1/studio/articles/{articleId}/body`** — Expert or Editor, owner-scoped (`L2-017`).
  Calls `SaveArticleBodyAction`, which runs `ArticleBodySanitizer` before storing.
- **`POST /api/v1/studio/articles/{articleId}/submit`** — Expert or Editor, owner-scoped. Calls
  `SubmitArticleAction`, which runs `ArticleSubmissionValidator` and then hands over to the editorial
  workflow (`L2-077`).
- **`ArticleBodySanitizer`** — allow-list sanitizer. It keeps headings h2-h4, paragraphs, bold, italic,
  links, ordered and unordered lists, block quotes, pull quotes, images with captions, embedded
  platform videos, footnotes and Scripture references. It removes `<script>`, inline event handlers,
  `javascript:` URLs, `<iframe>` elements from origins that are not allow-listed, and `style`
  attributes. The iframe origin allow-list is `<TO SUPPLY>`.
- **`ArticleSubmissionValidator`** — refuses submission when an image has no alt text and is not marked
  decorative, or when a heading level is skipped (for example h2 then h4). It returns each problem
  with its location so the editor can flag it.
- **`ScriptureReferenceParser`** — recognises references such as "John 1:1-5" and stores the book,
  chapter, verses and translation (for example ESV or NIV) on the reference element. The default
  translation and the source of the translation list are `<TO SUPPLY>`.
- **`ReadingTimeCalculator`** — computes `ceil(words / 230)`, minimum 1, when the body is saved.
- **`ArticleService`** and **`ArticleRepository`** — read and write `articles` (body, reading time,
  subtitle, cover image reference, `publishedAt`, `lastUpdatedAt`), `content_contributors` and
  `content_topics`.

**Key rules**

- A published article shows title, subtitle, cover image with alt text, contributors with profile
  links, publish date, last-updated date (if updated after publication), reading time, body, topics
  and comments.
- Reading time is the word count divided by 230, rounded up to whole minutes, minimum 1.
- The body text measure does not exceed 75 characters per line at any viewport.
- A signed-in member pressing "Save" adds the article to their saved items (`L2-071`).
- Scripture references render as references with their translation shown.
- Forbidden elements and attributes are removed on the server when the body is saved.
- Submission is refused for an image without alt text that is not marked decorative, and for a
  skipped heading level.

## Decisions for the web build

- **Contract.** `ArticlesApi.getArticle(slug)` returns `Article`: `id`, `slug`, `title`, `subtitle`,
  `coverUrl` and `coverAlt` (both `null` when there is no cover), `contributors` (name, profile slug or
  `null` for Logos Lab, photo), `publishedAt`, `updatedAt` (`null` unless the article changed after
  publication), `readingMinutes`, `bodyHtml` (already sanitized by the server), `topics`, `commentCount`,
  `saved` (`false` for a visitor) and `correction` (`{ date, note }` or `null`). A `404` problem means no
  published article has that slug. Related items come from `RelatedContentApi.getRelated(contentId)`
  (`show-related-content`), so a failed related request omits that section and nothing else.
- **Header.** The eyebrow reads "Article · 12 min read". The byline sits under the subtitle: each
  contributor's avatar and name linking to their profile (a name without a profile is plain text), joined
  by "with" when there are several, then "Published" and, only when `updatedAt` is set, "Updated" with
  dates in the member's locale. The breadcrumb is Explore, the article's first topic, then "Article".
- **Body.** The cover (`coverUrl` with `coverAlt`) comes first, then `ll-prose` in its article variant
  with `bodyHtml`. The measure rule (75 characters) is the prose component's. Headings, Scripture
  references, footnotes and figures need nothing from the page.
- **Correction.** A non-null `correction` shows a `role="note"` alert "Corrected on {date}" above the body
  with its note, as in `updated`.
- **Related.** Up to 4 `ll-content-card` items under "Related" with the eyebrow "Shares a topic". A
  member sees each card's save toggle; a visitor sees none. An empty list or a failed request omits the
  section (`L2-047` AC3).
- **Comments.** The section shows "Comments" with the count and the line from the mock: "Dr. Ortega
  replies to questions on Fridays." is the expert's own note and is not in the contract, so the page
  shows "Sign in to join the conversation. Anyone can read it." to a visitor and nothing else for a
  member. The "Read the N comments" link and the thread itself arrive with the comments feature, which
  owns the `#comments` section; until then the count in the header's comments button links to it.
- **Save.** The Save button in the actions is a toggle. A member presses it: `PUT` to the saved-items
  route, the button reads "Saved" with `aria-pressed="true"`, and a polite status says "Saved". Pressing
  again removes it and says "Removed from Saved". A visitor sees the sign-in prompt (dialog
  `sign-in-required`) that returns to the article. A failure keeps the previous state and shows a danger
  alert; the `saved-limit-reached` problem shows the "Saved is full" warning from `pages/saved/limit`.
  While the request runs the button is `aria-busy`.
- **Toast deferred.** The design pairs the "Saved" status with a toast and Undo. The toast waits for the
  notification work, so the status line carries the confirmation and pressing the button again undoes it.
- **Loading and failure.** `loading` shows the busy header and body skeleton and announces "Loading the
  article…" once. A failed load shows the error state with "Try again" and the help address. A `404`
  shows the not-found page.
- **Saved flag.** `ContentSummary` gains an optional `saved` flag, which the API sets for a signed-in
  member on list and page responses (`save-items`).

## Requirements

| L2 ID | Refines (L1) | Requirement |
|-------|--------------|-------------|
| `L2-045` | `L1-008` | **Article page.** Each published article has a public page at `/articles/{slug}`. |
| `L2-046` | `L1-008` | **Article content formatting and sanitization.** Article bodies support a defined set of rich formatting, and everything else is removed on save. |

## Diagrams

### System context

Visitors and learners read articles in Logos Lab; experts and editors write them in Studio.

![C4 system context for reading an article](diagrams/c4-context.png)

### Containers

Logos Lab Web server-renders the article from the Logos Lab API. The API reads and writes the Logos
Lab database, and the CDN serves cover and body images from Media storage.

![C4 container view for reading an article](diagrams/c4-container.png)

### Components

The read path runs through `GetArticleAction`. The write path runs every saved body through
`ArticleBodySanitizer`, and every submission through `ArticleSubmissionValidator`.

![C4 component view for reading an article](diagrams/c4-component.png)

### Class structure

`Article` stores a sanitized body and a reading time. `ArticleSubmissionValidator` returns
`SubmissionProblem` values with the kind and location of each issue.

![Class diagram for reading an article](diagrams/class-structure.png)

### Behaviour — read an article

The server render loads the published article. A draft or unknown slug returns HTTP 404.

![Sequence diagram for reading an article](diagrams/sequence-read-article.png)

### Behaviour — save an article for later

A signed-in member presses Save, and the saved-items endpoint records the item for the current user
only.

![Sequence diagram for saving an article](diagrams/sequence-save-article.png)

### Behaviour — save the article body

The author saves; the server removes forbidden markup, tags Scripture references and recalculates
reading time before storing.

![Sequence diagram for saving an article body](diagrams/sequence-save-body.png)

### Behaviour — submit an article

Submission is refused with a list of problems when an image lacks alt text or a heading level is
skipped; otherwise the editorial workflow takes over.

![Sequence diagram for submitting an article](diagrams/sequence-submit-article.png)
