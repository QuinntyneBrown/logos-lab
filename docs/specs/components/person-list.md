# Person list

| Field | Value |
|---|---|
| Selector | `ul[llPersonList]`, `li[llPerson]` |
| Library path | `frontend/projects/components/src/lib/person-list/` |
| Status | planned |
| Traces to | L2-001, L2-022, L2-120, L2-127, L2-129, L2-130, L2-134, L2-150 |
| Design system | [`person-list.html`](../../design-system/components/person-list.html) |
| Source mocks | [`pages/home/default`](../../mocks/pages/home/default.html), [`pages/experts/default`](../../mocks/pages/experts/default.html), [`pages/course-overview/default`](../../mocks/pages/course-overview/default.html), [`pages/event-page/default`](../../mocks/pages/event-page/default.html), [`pages/module-page/default`](../../mocks/pages/module-page/default.html), [`pages/search-results/default`](../../mocks/pages/search-results/default.html), [`pages/topic/default`](../../mocks/pages/topic/default.html) |
| Rendering | [`person-list.html`](person-list.html) |

## Purpose and scope

A person list presents experts: a square photo, the name as a link to their profile, and one or two
lines about them. In grids it fills two columns from MD and three from LG (the expert directory, search
results, topic pages); stacked, it is a single column for a sidebar (the home page's experts, a course's
instructor, an event's hosts).

Out of scope:

- Following an expert: the profile page.
- The directory's filters and pagination: the page.

## Usage

| Where | Configuration | Slots / content | States seen | Surface |
|---|---|---|---|---|
| `pages/home/*` Experts | stacked, 3 people | "Dr. Abena Mensah" · "Theological anthropology · 7 items" | default, hover | canvas |
| `pages/experts/*`, `pages/topic/*`, `pages/search-results/*` | grid | name; "Theologian · theological anthropology and the image of God"; "7 published items" | default | canvas |
| `pages/course-overview/*`, `pages/module-page/*`, `pages/event-page/*` | stacked | instructor or hosts with one meta line | default | canvas |

## Anatomy

1. **List** — `ul.people` (+ `.people--stacked`): hairline on top, grid of people.
2. **Person** — `li.person` (+ `.person--plain`): photo beside text, bottom hairline.
3. **Photo** — `img.person__photo`, `alt=""`, 64 px (48 px stacked), `--radius-md`.
4. **Name** — `p.person__name > a`.
5. **Meta** — one or two `p.person__meta`.

Host: the consumer's own `ul` and `li`; the components add the classes and render the person's parts.

## API

### Inputs

| Input | Type | Default | Required | Rule |
|---|---|---|---|---|
| `stacked` (`llPersonList`) | `boolean` | `false` | no | Adds `.people--stacked`. |
| `name` (`llPerson`) | `string` | — | yes | Link text. |
| `path` (`llPerson`) | `string` | — | yes | Router link of the profile. |
| `photoUrl` (`llPerson`) | `string \| null` | `null` | no | The photo; without one an initials tile is shown. |
| `meta` (`llPerson`) | `readonly string[]` | `[]` | no | One `p.person__meta` each. |
| `plain` (`llPerson`) | `boolean` | `false` | no | Adds `.person--plain` (no padding or hairline) for a single person in a card. |

### Outputs

None.

### Content slots

None.

## Variants and sizes

| Variant | Modifier | Use for |
|---|---|---|
| Grid | — | Directories: 1, 2 (MD) and 3 (LG) columns. |
| Stacked | `.people--stacked` | Sidebars. |
| Plain person | `.person--plain` | One person inside another component. |

## States

| State | Trigger | Visual | Assistive technology |
|---|---|---|---|
| Default | — | Photo, name, meta | Link with the name |
| Hover | `:hover` on the person | Photo scales to 1.03; name underlined on link hover | — |
| Focus | name `:focus-visible` | Shared focus ring | — |
| No photo | `photoUrl` null | Initials on the oat tile | Initials hidden |

## Markup

```html
<!-- rendered -->
<ul class="people people--stacked">
  <li class="person"><img class="person__photo" src="…/abena-mensah.jpg" alt="" width="48" height="48"><div><p class="person__name"><a href="/experts/abena-mensah">Dr. Abena Mensah</a></p><p class="person__meta">Theological anthropology · 7 items</p></div></li>
</ul>
```

```html
<!-- consumer -->
<ul llPersonList stacked><li llPerson name="Dr. Abena Mensah" path="/experts/abena-mensah" [photoUrl]="photo" [meta]="['Theological anthropology · 7 items']"></li></ul>
```

## Design

- Person: gap `--space-5` (stacked `--space-4`), block padding `--space-6` (stacked `--space-4`),
  hairlines `--color-border-default`.
- Photo `--space-16` (stacked `--space-12`), `--radius-md`, `--color-bg-subtle` behind.
- Name `--text-h4`; meta `--text-body-sm` muted. Grid column gap `--layout-gutter`.

Component tokens: none.

## Colour

| Part | Token | Light | Dark |
|---|---|---|---|
| Hairlines | `--color-border-default` | `--palette-oat-300` | `--palette-night-700` |
| Name | `--color-fg-default` | `--palette-ink-900` | `--palette-night-50` |
| Meta | `--color-fg-muted` | `--palette-stone-700` | `--palette-night-200` |
| Initials tile | `--color-tile-oat` | tile role | tile role |

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| `--color-fg-default` | `--color-bg-canvas` | 4.5:1 | Name |
| `--color-fg-muted` | `--color-bg-canvas` | 4.5:1 | Meta |

## Responsive behaviour

- Grid: one column below MD, two from MD, three from LG; stacked: one column always.
- Names and meta wrap; at 320 px nothing scrolls horizontally.

## Accessibility

### Role and pattern

A list of people, each with a link to the profile.

### Keyboard

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Each name link in order. |

### Focus

Shared focus ring.

### Labelling

Photos are decorative because the name follows.

### Announcements

None.

### Motion

The photo zoom is removed under reduced motion.

## Content and internationalisation

- Meta lines arrive formatted and translated; names are data.

## Performance

- `OnPush`. Photos carry `width` and `height` and lazy-load below the fold (`L2-120`).

## Acceptance criteria

### Rendering

- **AC-1** Given three featured experts, when the home page renders, then "Experts" lists them stacked with photo, name linking to the profile and "Theological anthropology · 7 items". (L2-001)
- **AC-2** Given the expert directory, when it renders, then each expert shows two meta lines. (L2-022)
- **AC-3** Given a person, when it is inspected, then the photo has empty `alt` and the name is a link. (L2-127)
- **AC-4** Given a photo, when it loads, then its width and height are reserved. (L2-120)

### Theming

- **AC-5** Given the dark theme, when the list renders, then hairlines and text use dark token values and photos are not filtered. (L2-134)
- **AC-6** Given both themes, when contrast is measured, then name and meta meet 4.5:1. (L2-129)

### Responsive

- **AC-7** Given the directory grid, when viewed at 375, 768 and 1024 px, then it shows 1, 2 and 3 columns. (L2-130)
- **AC-8** Given longer meta in the pseudo-locale at 320 px, when the stacked list renders, then nothing is clipped. (L2-150)

## Implementation notes

- Folder `frontend/projects/components/src/lib/person-list/`: `person-list.ts` (`PersonList`),
  `person.ts` (`Person`), each with `.html` and `.scss` from the `person-list` block.

## Decisions

- **D-1** *What shows without a photo?* The person's initials on the oat tile, as the cast's photo-less
  learners appear elsewhere in the mocks.
