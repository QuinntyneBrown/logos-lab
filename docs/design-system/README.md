# Logos Lab design system

Version 1.0. Built from `src/` by `build_design_system.py` (applying-banaro-design-system skill). Open [index.html](index.html) from disk; toggle themes with the button or the `t` key.

Courses and conversations on faith and AI, curated by experts.

Edit the sources, never the generated pages:

- `src/foundations/*.md`, `src/components/*.md`, `src/patterns/*.md` — page content and specimens
- `tokens/tokens.css` — primitives, roles and the dark block (the generated block is rebuilt)
- `assets/components.css` — one `@component <slug>` block per component
- `design-system.json` — product name, component prefix, accent and version

## Foundations

| Page | Covers |
|---|---|
| [Color](foundations/color.html) | Oat, birch and one accent by day; warm charcoal by lamplight. Roles, not values, decide which colours touch. |
| [Typography](foundations/typography.html) | Manrope for every product role, light and tight at display sizes, relaxed at body sizes; JetBrains Mono only for code. |
| [Spacing](foundations/spacing.html) | A 4px rhythm with a generous top end. Room is part of the calm. |
| [Layout](foundations/layout.html) | A centred 74rem container on a 4/8/12-column grid with margins that widen as the screen does. |
| [Elevation](foundations/elevation.html) | Hairlines before boxes; four warm, very soft shadows; named layers for everything that floats. |
| [Shape](foundations/shape.html) | Soft corners, pill-shaped actions and small square portraits with rounded edges. |
| [Motion](foundations/motion.html) | Slow and quiet, only when welcome — 240ms colour, 420ms movement, 640ms entrances, nothing that delays. |
| [Iconography](foundations/iconography.html) | A restrained line set on a 24-unit grid — 1.5 stroke, round caps and joins, drawn in currentColor. |
| [Theming](foundations/theming.html) | Semantic roles carry light and dark; components never know which theme they are in. |
| [Responsive](foundations/responsive.html) | Mobile-first at 360px, comfortable at 768px, spacious from 1024px, without losing context on the way. |
| [Accessibility](foundations/accessibility.html) | WCAG 2.2 AA is part of every component — native semantics first, visible focus, real labels, generous targets. |
| [Content](foundations/content.html) | Warm, plain and specific — write like a thoughtful neighbour, not a marketing department. |

## Components

| Component | Tier | Variants | States | Mock states using it |
|---|---|---|---|---|
| [Button](components/button.html) | core | primary, secondary, quiet, ghost, text, danger, trailing arrow, icon only, block | hover, focus, active, disabled, loading, pressed | 9 |
| [Button group](components/button-group.html) | standard | actions, with primary, segmented, toolbar | hover, focus, active, pressed, disabled | 0 |
| [Link](components/link.html) | core | inline, standalone, back, external, download, danger | hover, focus | 2 |
| [Menu](components/menu.html) | core | actions, account, grouped, shortcuts, checkable, danger, more disclosure | hover, focus, active, disabled | 0 |
| [Form field](components/form-field.html) | core | standard, optional, counter, group, side by side | hover, focus, disabled, read-only, invalid | 3 |
| [Text field](components/text-field.html) | core | text, email, password, number, prefix, with action, counter, search | hover, focus, disabled, read-only, invalid | 7 |
| [Textarea](components/textarea.html) | core | default, counter, auto-grow, with actions | hover, focus, disabled, read-only, invalid | 1 |
| [Select](components/select.html) | core | inline, field, placeholder, grouped | hover, focus, active, disabled, invalid | 2 |
| [Checkbox](components/checkbox.html) | core | single, description, count, grid, select all | hover, focus, checked, indeterminate, disabled, invalid | 0 |
| [Radio group](components/radio-group.html) | core | cards, inline, plain, compact | hover, focus, checked, disabled, invalid | 0 |
| [Switch](components/switch.html) | core | description, title only, label first, settings list | hover, focus, checked, disabled | 0 |
| [Slider](components/slider.html) | standard | value, ends, stepped, with number | focus, disabled | 0 |
| [File upload](components/file-upload.html) | standard | dropzone, chosen, attachments, photo | dragging, uploading, complete, invalid, failed, disabled | 1 |
| [Form layout](components/form-layout.html) | core | stacked, card with sections, inline, error summary | submitting, invalid, saved | 3 |
| [Skip link](components/skip-link.html) | core | to main content, to search, revealed | focus | 9 |
| [Brand](components/brand.html) | core | wordmark, mark only, static | hover, focus | 9 |
| [Top bar](components/top-bar.html) | core | signed out, signed in, with search, compact, minimal | hover, focus, current | 9 |
| [Sidebar navigation](components/sidebar-navigation.html) | core | workspace, grouped, with counts, collapsible, settings | hover, focus | 1 |
| [Tabs](components/tabs.html) | core | underline, pill, with counts, with icons, navigation tabs | hover, focus, disabled | 1 |
| [Breadcrumb](components/breadcrumb.html) | core | trail, with home, collapsed, back link, long labels | hover, focus | 2 |
| [Pagination](components/pagination.html) | core | load more, numbered pages, previous and next | hover, focus, loading, complete | 1 |
| [Stepper](components/stepper.html) | standard | progress, with links, five steps, vertical, with errors | invalid, complete | 0 |
| [Footer](components/footer.html) | standard | default, with brand, minimal | hover, focus | 5 |
| [Page header](components/page-header.html) | core | title, with actions, with search, with breadcrumb, with meta | loading | 4 |
| [Container, grid and stack](components/layout.html) | core | stack, stack large, cluster, cluster between, grid, two column, split, sidebar layout, section, narrow container | passive | 9 |
| [Card](components/card.html) | core | person, with initials, interactive, with media, selected, aside card, in a grid | hover, focus, selected, loading | 2 |
| [Accordion](components/accordion.html) | standard | single, group, exclusive, with icon, with count | hover, focus, open | 0 |
| [Divider](components/divider.html) | core | horizontal, vertical, labelled | passive | 0 |
| [Dialog](components/dialog.html) | core | confirm, form, destructive, small, large, with person | busy, invalid, failed | 1 |
| [Drawer and sheet](components/drawer.html) | standard | bottom, action sheet, left, right | hover, focus | 0 |
| [Popover](components/popover.html) | standard | with actions, explainer, with field, person preview | hover, focus, closed | 0 |
| [Tooltip](components/tooltip.html) | core | icon button, with shortcut, unavailable action, exact time | hover, focus | 0 |
| [Sign-in card](components/auth-card.html) | standard | sign in, create account, reset password, check your email | focus, invalid, submitting, error | 2 |
| [Table](components/table.html) | core | default, dense, sortable, selectable, row actions, sticky header, numeric | hover, selected, loading, empty, error | 1 |
| [List](components/list.html) | core | links, plain, people, with actions, navigation | hover, focus, current, loading, empty | 1 |
| [Description list](components/description-list.html) | core | stacked, inline, columns, with links, with missing values | loading | 1 |
| [Avatar](components/avatar.html) | core | photo, initials, tile colours, with name, group, online, away, account button | loading | 6 |
| [Badge and status](components/badge.html) | core | neutral, info, success, warning, danger, solid, plain, count, tags, accent tag, removable tag | passive | 4 |
| [Chip and tag](components/chip.html) | core | filter, with count, with icon, selected, group, removable, applied filters | hover, focus, active, pressed, disabled | 1 |
| [Stat and KPI](components/stat.html) | standard | row, with trend, pair, kpi list, kpi card | loading | 1 |
| [Timeline](components/timeline.html) | standard | activity, agenda, milestones | current | 0 |
| [Code block](components/code-block.html) | standard | block, inline, with copy, scrolling | hover, focus, copied | 0 |
| [Alert and banner](components/alert.html) | core | info, success, warning, danger, with actions, dismissible, banner, banner with action, strip | passive | 0 |
| [Toast](components/toast.html) | core | info, success, warning, danger, with undo, title only, stacked | leaving | 1 |
| [Inline message](components/inline-message.html) | core | neutral, saving, success, warning, danger, with action, beside a button | passive | 2 |
| [Progress bar](components/progress-bar.html) | core | determinate, bare, steps, indeterminate, success, danger | loading | 2 |
| [Spinner](components/spinner.html) | core | quiet, with label, in a button, region | passive | 0 |
| [Skeleton](components/skeleton.html) | core | text, heading and text, photo, circle, media, tags, card, card list | passive | 0 |
| [Empty state](components/empty-state.html) | core | first run, no results, permission, error, all done, compact | passive | 0 |
| [Error page](components/error-page.html) | core | not found, forbidden, server error, offline, maintenance | passive | 0 |
| [Hero](components/hero.html) | standard | promise, centred, with stats | focus | 1 |
| [Feature area](components/feature-area.html) | standard | four areas, two areas, without icons, single | hover | 0 |
| [Grain panel](components/panel.html) | standard | invitation, compact, without grain | hover | 2 |
| [Testimonial and verse](components/testimonial.html) | standard | quote, verse, quote row | passive | 1 |
| [Person list](components/person-list.html) | standard | with status, with action, initials, stacked | hover | 1 |
| [Search and filter toolbar](components/search-filter-toolbar.html) | standard | toolbar, active filters, filters panel | empty | 1 |
| [Notification item](components/notification-item.html) | standard | unread, read, with action | unread | 0 |
| [Profile header](components/profile-header.html) | standard | person, initials, project, own profile | focus, open, loading | 0 |
| [Comment](components/comment.html) | standard | default, initials, own, list | new, sending, failed, deleted | 0 |
| [Message thread](components/message-thread.html) | standard | conversation, history, group, read only | focus, sending, failed, empty | 0 |
| [Inbox](components/inbox.html) | standard | default, compact, counts, initials | hover, focus, current, unread, loading, empty | 0 |
| [Media tile](components/media-tile.html) | standard | gallery, linked, photo, placeholder, tones | hover, focus, loading, error | 0 |
| [Prose](components/prose.html) | standard | privacy, terms, help article, about | passive | 2 |
| [Danger zone](components/danger-zone.html) | standard | typed confirmation, simple, several actions | disabled, invalid, busy | 0 |
| [Content card](components/content-card.html) | standard | course, video, logos lab, row | hover, focus, saved, in-progress, completed, unavailable | 2 |
| [Course outline](components/course-outline.html) | standard | sections, compact, sequential | hover, focus, current, done, locked | 1 |
| [Lesson layout](components/lesson-layout.html) | standard | article lesson, video lesson, last lesson | hover, focus, loading, completed | 1 |
| [Player](components/player.html) | standard | video, playing, module, module saving | hover, focus, loading, resume, error, sign-in | 0 |
| [Transcript](components/transcript.html) | standard | cues, compact | hover, focus, current, search, no-matches | 0 |
| [Certificate](components/certificate.html) | standard | certificate, verified, revoked | revoked | 0 |
| [Project card](components/project-card.html) | sample | default, compact, grid, list, stages | hover, focus, loading | 0 |
| [Event row](components/event-row.html) | sample | default, list, compact, header | focus, going, full, cancelled, past | 2 |
| [RSVP panel](components/rsvp-panel.html) | sample | available, going, full, closed | focus, loading, error | 0 |
| [Suggestion](components/suggestion.html) | sample | person, scored, initials, paused | focus, loading, accepted, passed | 0 |
| [Workflow bar](components/workflow-bar.html) | standard | draft, in review, published | hover, focus, loading, saving, not-saved | 1 |
| [Annotation](components/annotation.html) | standard | comment, in text, thread | current, resolved | 0 |
| [Diff](components/diff.html) | standard | field, inline, split | selected | 0 |
| [Chart](components/chart.html) | standard | columns, bars, video watched | hover, focus, loading, suppressed | 0 |
| [Consent banner](components/consent-banner.html) | standard | banner, customize | hover, focus | 0 |
| [Notice panel](components/notice-panel.html) | standard | unread, all read | loading, empty, error | 0 |
| [Combobox](components/combobox.html) | standard | suggestions, single group | hover, selected, searching, too-short, no-matches, failed | 0 |
| [Rich editor](components/rich-editor.html) | standard | article body, quote and reference | focus, invalid | 1 |
| [Sortable](components/sortable.html) | standard | section, collection items | dragging, drop-target, invalid | 0 |
| [Two-step codes](components/two-step-codes.html) | standard | setup, challenge, recovery codes | focus, invalid | 0 |

## Patterns

| Pattern | Covers |
|---|---|
| [Forms](patterns/forms.html) | Ask for a clear answer, keep everything a person typed, and say what happens next. |
| [Feedback and loading](patterns/feedback.html) | Show what is happening and what changed, close to where it happened, for as long as it matters. |
| [Empty and error states](patterns/empty-states.html) | When there is nothing to show, say why in one calm sentence and offer the one next step that helps. |
| [Navigation and page structure](patterns/navigation.html) | Keep every page in the same calm order, so people always know where they are and how to get back. |
| [Dialogs and overlays](patterns/dialogs.html) | Ask for one focused decision on top of the page, then return the person exactly where they were. |
| [Data tables and lists](patterns/tables.html) | Show many things so they are easy to scan, compare and act on, at every width. |
| [Notifications](patterns/notifications.html) | Tell people what changed through the quietest channel that still reaches them in time. |
| [Content and tone](patterns/content.html) | Write the way a thoughtful colleague talks: calm, warm, specific and plain. |

## Tokens

- [tokens.css](tokens/tokens.css): 280 custom properties — primitives, semantic roles, the dark theme and preference overrides. Read them by role.
- [tokens.json](tokens/tokens.json): the same tokens exported in the W3C Design Tokens format.
- [contrast-pairs.json](tokens/contrast-pairs.json): every foreground/background pairing checked in both themes.
- [components.css](assets/components.css): BEM classes, one marked block per component. Component knobs use the `--ll-` prefix.

## Changelog

### v1.0 — 2026-10-11

Seeded from the Banaro component kit by the applying-banaro-design-system skill. Component knobs use the `--ll-` prefix.

## Re-run

```sh
python <skill>/scripts/build_design_system.py docs/design-system
python <skill>/scripts/audit_usage.py docs/design-system
python <skill>/scripts/check_design_system.py docs/design-system
python <skill>/scripts/check_contrast.py docs/design-system/tokens/tokens.css
python <skill>/scripts/check_mocks.py docs/mocks
```

`<skill>` is `.claude/skills/applying-banaro-design-system` (or the `.agents/skills` mirror).
