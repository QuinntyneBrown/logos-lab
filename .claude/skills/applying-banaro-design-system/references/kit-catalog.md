# Kit catalog

The kit ships the components below. Each one is a source file (`src/components/<slug>.md`) plus one
`/* @component <slug> */ … /* @end <slug> */` block in `assets/components.css`. The **selector** column
lists the classes that count as "used" when `audit_usage.py` scans `docs/mocks`.

**Tiers**

- **core:** the set every product needs (actions, fields, navigation, containers, data display,
  feedback). `audit_usage.py --prune` keeps these even when no mock uses them. Pass `--include-core`
  only when the user explicitly wants a minimal system.
- **standard:** generic compositions that carry the Banaro feel: hero, grain panel, testimonial, inbox and
  others. They are kept only if the mocks use them.
- **sample:** Banaro-domain compositions (project card, event row, RSVP panel, suggestion). These are the
  "default scaffolded components": prune them unless the app's mocks genuinely use them. They are also good
  starting points to adapt into the app's own domain card.

| Order | Slug | Title | Tier | Selector |
|---|---|---|---|---|
| 10 | button | Button | core | `.btn, .icon-btn` |
| 11 | button-group | Button group | standard | `.btn-group` |
| 12 | link | Link | core | `.link-standalone, .link-danger` |
| 13 | menu | Menu | core | `.menu, .more` |
| 20 | form-field | Form field | core | `.field` |
| 21 | text-field | Text field | core | `.input, .search` |
| 22 | textarea | Textarea | core | `.textarea` |
| 23 | select | Select | core | `.select, .select__control` |
| 24 | checkbox | Checkbox | core | `.check, .check__box` |
| 25 | radio-group | Radio group | core | `.choices, .choice` |
| 26 | switch | Switch | core | `.switch` |
| 27 | slider | Slider | standard | `.range` |
| 28 | file-upload | File upload | standard | `.dropzone, .photo-edit` |
| 29 | form-layout | Form layout | core | `.form, .form-card, .form-actions, .form-summary` |
| 30 | skip-link | Skip link | core | `.skip-link` |
| 31 | brand | Brand | core | `.brand` |
| 32 | top-bar | Top bar | core | `.header` |
| 33 | sidebar-navigation | Sidebar navigation | core | `.sidebar-nav, .settings-nav` |
| 34 | tabs | Tabs | core | `.tabs` |
| 35 | breadcrumb | Breadcrumb | core | `.breadcrumb` |
| 36 | pagination | Pagination | core | `.pager` |
| 37 | stepper | Stepper | standard | `.stepper` |
| 38 | footer | Footer | standard | `.footer` |
| 39 | page-header | Page header | core | `.page-head` |
| 40 | layout | Container, grid and stack | core | `.wrap, .stack, .cluster, .grid, .two-col, .split, .sidebar-layout, .section` |
| 41 | card | Card | core | `.card, .aside-card` |
| 42 | accordion | Accordion | standard | `.accordion` |
| 43 | divider | Divider | core | `.divider` |
| 44 | dialog | Dialog | core | `.dialog` |
| 45 | drawer | Drawer and sheet | standard | `.sheet` |
| 46 | popover | Popover | standard | `.popover` |
| 47 | tooltip | Tooltip | core | `.tooltip` |
| 48 | auth-card | Sign-in card | standard | `.auth` |
| 50 | table | Table | core | `.data-table` |
| 51 | list | List | core | `.list, .rows` |
| 52 | description-list | Description list | core | `.facts` |
| 53 | avatar | Avatar | core | `.avatar, .avatar-initials, .status` |
| 54 | badge | Badge and status | core | `.badge, .pill` |
| 55 | chip | Chip and tag | core | `.chip` |
| 56 | stat | Stat and KPI | standard | `.stats, .kpis` |
| 57 | timeline | Timeline | standard | `.timeline` |
| 58 | code-block | Code block | standard | `.code-block` |
| 60 | alert | Alert and banner | core | `.alert, .banner, .strip` |
| 61 | toast | Toast | core | `.toast` |
| 62 | inline-message | Inline message | core | `.inline-status` |
| 63 | progress-bar | Progress bar | core | `.progress` |
| 64 | spinner | Spinner | core | `.spinner` |
| 65 | skeleton | Skeleton | core | `.skeleton, .skeleton-card` |
| 66 | empty-state | Empty state | core | `.empty` |
| 67 | error-page | Error page | core | `.error-page` |
| 70 | hero | Hero | standard | `.hero` |
| 71 | feature-area | Feature area | standard | `.areas, .area` |
| 72 | panel | Grain panel | standard | `.panel` |
| 73 | testimonial | Testimonial and verse | standard | `.quote, .verse` |
| 74 | person-list | Person list | standard | `.people, .person` |
| 75 | search-filter-toolbar | Search and filter toolbar | standard | `.toolbar, .filters, .filter` |
| 76 | notification-item | Notification item | standard | `.notice-list` |
| 77 | profile-header | Profile header | standard | `.profile-head` |
| 78 | comment | Comment | standard | `.comment` |
| 79 | message-thread | Message thread | standard | `.thread, .bubble` |
| 80 | inbox | Inbox | standard | `.inbox` |
| 81 | media-tile | Media tile | standard | `.shots, .shot` |
| 82 | prose | Prose | standard | `.prose` |
| 83 | danger-zone | Danger zone | standard | `.danger-zone` |
| 90 | project-card | Project card | sample | `.projects, .project` |
| 91 | event-row | Event row | sample | `.events, .event, .event-head` |
| 92 | rsvp-panel | RSVP panel | sample | `.rsvp` |
| 93 | suggestion | Suggestion | sample | `.suggest` |

Patterns: forms, feedback, empty-states, navigation, dialogs, tables, notifications, content.

## Kit cast (sample copy in the seeded system)

The seeded sources use one neutral sample domain: a small team's calm workspace of projects, notes and
gatherings. It exists so the kit renders believably. **Rewrite it with the app's own cast when you adapt
the system** (Step 5); `audit_usage.py` warns about every leftover name below.

- **People:** each has a portrait in `assets/photos/<first>-<last>.jpg`.
  - Amara Osei, product designer
  - Daniel Reyes, engineer
  - Grace Liu, designer
  - Hannah Kowalski, researcher
  - Caleb Morgan, founder
  - Noah Fischer, engineer
  - Elijah Brooks, Leah Thompson, Marcus Bennett, Peter Walsh, Ruth Alvarez, Sofia Marquez
- **Scene photo:** `coffee-together.jpg`, two people at a wooden table.
- **Things:** the project **Northwind**, the shared notebook **Harbour Notes**, the gathering **Field Day**
  (Sat 17 Oct 2026, 10:00 am).
- **Today:** Friday 9 October 2026.

The portraits are Unsplash stand-ins (see `assets/photos/README.md`). An app may reuse them for its own cast,
giving them new names in its own copy, or add its own photographs.
