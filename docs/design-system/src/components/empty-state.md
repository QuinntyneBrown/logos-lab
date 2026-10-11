---
title: Empty state
tier: core
order: 66
summary: Turn an empty list into a next step. A sage icon tile, a plain title, one helpful sentence and the action that fills the space.
selector: .empty
layout: block
target: .empty
states: default
contrast: --color-fg-accent|--color-accent-subtle|3; --color-danger-icon|--color-danger-bg|3; --color-fg-muted|--color-bg-canvas|4.5; --color-border-strong|--color-bg-canvas|3
---

## Overview

Show an empty state wherever a list, table or panel has nothing to show: before anything is created,
when a search or filter matches nothing, when the person cannot see the content, or when it failed to
load. It sits in the exact space the content would take, inside a dashed outline. It always explains why
it is empty and offers the next step. For a whole screen that failed, use an [error page](error-page.html);
for a problem with something that is still on screen, use an [alert](alert.html).

## Anatomy

1. **Icon tile** — a 56px rounded square in the accent tint with a 28px line icon; danger tint for errors.
2. **Title** — a heading that states the situation, in `--text-h3`.
3. **Text** — one or two sentences, up to 44 characters wide, in muted text.
4. **Actions** — one primary action that fixes the emptiness, plus at most one quiet alternative.
5. **Outline** — a dashed hairline in `--color-border-strong` with large corners.

```html
<div class="empty"><span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10.5A.5.5 0 0 1 6.5 20V4a.5.5 0 0 1 .5-.5z"/><path d="M14 3.5V8h4M9.5 12.5h5M9.5 16h5"/></svg></span><h3 class="empty__title">No notes yet</h3><p>Notes you and your team write appear here, newest first.</p><div class="empty__actions"><button class="btn btn--primary" type="button">Write the first note</button></div></div>
```

## Variants

### first run
Nothing has been created yet. Welcome people and help them make the first one.
```html
<div class="empty"><span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10.5A.5.5 0 0 1 6.5 20V4a.5.5 0 0 1 .5-.5z"/><path d="M14 3.5V8h4M9.5 12.5h5M9.5 16h5"/></svg></span><h3 class="empty__title">Harbour Notes is ready for its first note</h3><p>Notes you and your team write appear here, newest first. Start with something you learned this week.</p><div class="empty__actions"><button class="btn btn--primary" type="button">Write the first note</button><button class="btn btn--quiet" type="button">Import notes</button></div></div>
```

### no results
A search or filter matched nothing. Repeat the query and offer a way out.
```html
<div class="empty"><span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg></span><h3 class="empty__title">No notes match “venue budget”</h3><p>Try fewer words, or check the spelling. You are also filtering by Tagged research and Last 7 days.</p><div class="empty__actions"><button class="btn btn--quiet" type="button">Clear filters</button><button class="btn btn--text" type="button">Search all of Northwind</button></div></div>
```

### permission
The content exists but this person cannot see it. Say who to ask.
```html
<div class="empty"><span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg></span><h3 class="empty__title">These notes are private</h3><p>Only the Field Day planning group can read them. Caleb Morgan can add you.</p><div class="empty__actions"><button class="btn btn--primary" type="button">Ask Caleb for access</button></div></div>
```

### error
The list failed to load. Say that nothing is lost and offer a retry.
```html
<div class="empty empty--error"><span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg></span><h3 class="empty__title">We couldn't load the tasks</h3><p>This is on our side, and nothing you saved is lost. Try again in a moment.</p><div class="empty__actions"><button class="btn btn--primary" type="button">Try again</button></div></div>
```

### all done
A list that was emptied by finishing everything. Celebrate quietly.
```html
<div class="empty"><span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><h3 class="empty__title">You're all caught up</h3><p>Every task for Field Day has an owner and a date. New ones will appear here.</p></div>
```

### compact
Inside a card, aside or tab panel: less padding, no icon, a small action.
```html
<div class="empty empty--compact"><h3 class="empty__title">No comments yet</h3><p>Start the conversation about this note.</p><div class="empty__actions"><button class="btn btn--quiet btn--sm" type="button">Add a comment</button></div></div>
```

## Sizes

N/A: an empty state fills the space of the content it replaces. Use the default for a page-level list
and `empty--compact` inside cards, asides and tab panels.

## States

An empty state is itself a state of the list or panel, so it has no states of its own. Its actions follow
the [button](button.html) states. When the person acts (writes the first note, clears filters), replace
the empty state with the content in the same place.

## Responsive

At 360px the padding shrinks with the container, the text wraps to the narrow measure and the actions
wrap, centred, one per line if needed. From 768px actions sit side by side. The outline always matches the
content area; it never spans wider than the list it stands in for.

## Theming

The icon tile reads the accent-subtle pair (or the danger pair for errors), the text reads muted, and the
dashed outline reads `--color-border-strong`; each has a dark value, so dark mode needs no extra rules.

## Accessibility

**Role:** a group of ordinary content: a heading at the right level for the page (usually `h2` or `h3`),
a paragraph and buttons or links. When it replaces results after a search, announce the change in a
`role="status"` message ("No notes match venue budget").

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to the actions in order. |
| Enter, Space | Activates an action. |

**Focus:** do not move focus into the empty state. After "Clear filters", keep focus on a sensible
control, such as the search field.

**Labelling:** the icon is decorative (`aria-hidden="true"`); the title says what is going on. Actions
name the result: "Write the first note", "Ask Caleb for access".

**Motion:** none.

**Touch:** actions are full-size buttons, 44px tall (36px in the compact form).

## Content

The title states the situation plainly, without blame or jokes: **No notes match “venue budget”**,
**These notes are private**, **We couldn't load the tasks**. The sentence says why and what happens next.
The action starts with a verb and names the result. Say "we" for our failures and never "you" for the
person's mistakes. Use real names: **Caleb Morgan can add you**.

## Do and don't

### Do
Explain the emptiness and give the one action that fills it.
```html
<div class="empty empty--compact"><h3 class="empty__title">No one is assigned yet</h3><p>Assign this task so it shows up in someone's list.</p><div class="empty__actions"><button class="btn btn--primary btn--sm" type="button">Assign a person</button></div></div>
```

### Don't
"No data" with no reason and no way forward.
```html
<div class="empty empty--compact"><h3 class="empty__title">No data</h3><p>There is nothing here.</p></div>
```

### Do
After a search, say what was searched and how to widen it.
```html
<div class="empty empty--compact"><h3 class="empty__title">No people match “Grase”</h3><p>Check the spelling, or search by email.</p><div class="empty__actions"><button class="btn btn--quiet btn--sm" type="button">Clear search</button></div></div>
```

### Don't
Blaming or joking about an error makes it worse.
```html
<div class="empty empty--error empty--compact"><h3 class="empty__title">Oops! You broke it</h3><p>Something bad happened.</p></div>
```

## Tokens

Empty states read the accent-subtle and danger pairs for the icon tile, `--color-fg-muted`,
`--color-border-strong`, `--size-empty-icon`, `--size-empty-glyph`, `--layout-measure-short` and
`--radius-lg`.

## Code

Use `.empty` with an `.empty__icon` tile, a heading with `.empty__title`, one `<p>` and
`.empty__actions`. Add `.empty--error` for load failures and `.empty--compact` inside small containers.
