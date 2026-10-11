---
title: Stepper
tier: standard
order: 37
summary: Show where someone is in a short, ordered flow. A row of quiet bars that fill with sage as each step is done.
selector: .stepper
target: .stepper__step[aria-current]
states: default, invalid, complete
matrix-variants: progress, vertical
contrast: --color-fg-default|--color-bg-canvas|4.5; --color-fg-subtle|--color-bg-canvas|4.5; --color-danger-fg|--color-bg-canvas|4.5; --color-accent|--color-border-default|3
---

## Overview

Use a stepper above a flow of three to five steps that must happen in order: setting up a workspace, creating a
gathering, importing notes. It answers two questions at a glance: how far along am I, and how much is left. It is
not navigation; people move with the flow's Back and Continue buttons (see [form layout](form-layout.html)). For
parallel views, use [tabs](tabs.html); for a single long task, a [progress bar](progress-bar.html).

## Anatomy

1. **List** — `ol.stepper` named for the flow, so the step count is announced.
2. **Bar** — each step's 4px rounded bar: the default border role ahead, sage once done or current, the danger role when the step has errors.
3. **Position** — "Step 2 of 3" in the caption style.
4. **Name** — what the step is about, in a few words.
5. **Current step** — `aria-current="step"`; done steps add `.is-done` and a visually hidden "done".

```html
<ol class="stepper" aria-label="Set up your workspace"><li class="stepper__step is-done"><span>Step 1 of 3<span class="vh">, done</span></span><span>Your profile</span></li><li class="stepper__step" aria-current="step"><span>Step 2 of 3</span><span>Invite your team</span></li><li class="stepper__step"><span>Step 3 of 3</span><span>First project</span></li></ol>
```

## Variants

### progress
The default: one bar per step, filled up to and including the current one.
```html
<ol class="stepper" aria-label="Set up your workspace"><li class="stepper__step is-done"><span>Step 1 of 3<span class="vh">, done</span></span><span>Your profile</span></li><li class="stepper__step" aria-current="step"><span>Step 2 of 3</span><span>Invite your team</span></li><li class="stepper__step"><span>Step 3 of 3</span><span>First project</span></li></ol>
```

### with links
Done steps link back so people can change an earlier answer; steps ahead stay plain text until they are reached.
```html
<ol class="stepper" aria-label="New gathering"><li class="stepper__step is-done"><span>Step 1 of 4<span class="vh">, done</span></span><a href="#">Details</a></li><li class="stepper__step is-done"><span>Step 2 of 4<span class="vh">, done</span></span><a href="#">Date and place</a></li><li class="stepper__step" aria-current="step"><span>Step 3 of 4</span><span>Invitations</span></li><li class="stepper__step"><span>Step 4 of 4</span><span>Review</span></li></ol>
```

### five steps
The most a stepper should hold. Names stay short so each column fits at 360px.
```html
<ol class="stepper" aria-label="Import notes"><li class="stepper__step is-done"><span>Step 1 of 5<span class="vh">, done</span></span><span>Source</span></li><li class="stepper__step is-done"><span>Step 2 of 5<span class="vh">, done</span></span><span>Files</span></li><li class="stepper__step is-done"><span>Step 3 of 5<span class="vh">, done</span></span><span>Notebook</span></li><li class="stepper__step" aria-current="step"><span>Step 4 of 5</span><span>Tags</span></li><li class="stepper__step"><span>Step 5 of 5</span><span>Review</span></li></ol>
```

### vertical
`.stepper--vertical` stacks the steps beside a form on wide screens, with room for a longer name.
```html
<ol class="stepper stepper--vertical" aria-label="Set up your workspace"><li class="stepper__step is-done"><span>Step 1 of 3<span class="vh">, done</span></span><span>Your profile: name, photo and role</span></li><li class="stepper__step" aria-current="step"><span>Step 2 of 3</span><span>Invite your team: Daniel, Grace and Hannah</span></li><li class="stepper__step"><span>Step 3 of 3</span><span>Your first project</span></li></ol>
```

### with errors
`.is-invalid` marks a step that needs attention, such as one reached from a review page with missing answers.
```html
<ol class="stepper" aria-label="New gathering"><li class="stepper__step is-done"><span>Step 1 of 3<span class="vh">, done</span></span><span>Details</span></li><li class="stepper__step is-invalid" aria-current="step"><span>Step 2 of 3 · 2 answers to check</span><span>Date and place</span></li><li class="stepper__step"><span>Step 3 of 3</span><span>Review</span></li></ol>
```

## Sizes

N/A: one size. Bars are `--space-1` (4px) tall and share the row equally; text uses the caption style with
`--space-2` between steps.

## States

Steps ahead are the default border bar with subtle text. Done steps and the current step fill the bar with sage and
take the default text role; only the current step has `aria-current="step"`. **Invalid** turns a step's bar and text
to the danger roles and says how many answers to check. **Complete** fills every bar on the final review or
confirmation screen.

### progress / invalid
```html
<ol class="stepper" aria-label="Set up your workspace"><li class="stepper__step is-done"><span>Step 1 of 3<span class="vh">, done</span></span><span>Your profile</span></li><li class="stepper__step is-invalid" aria-current="step"><span>Step 2 of 3 · 1 answer to check</span><span>Invite your team</span></li><li class="stepper__step"><span>Step 3 of 3</span><span>First project</span></li></ol>
```

### progress / complete
```html
<ol class="stepper" aria-label="Set up your workspace"><li class="stepper__step is-done"><span>Step 1 of 3<span class="vh">, done</span></span><span>Your profile</span></li><li class="stepper__step is-done"><span>Step 2 of 3<span class="vh">, done</span></span><span>Invite your team</span></li><li class="stepper__step is-done" aria-current="step"><span>Step 3 of 3<span class="vh">, done</span></span><span>First project</span></li></ol>
```

### vertical / invalid
```html
<ol class="stepper stepper--vertical" aria-label="Set up your workspace"><li class="stepper__step is-done"><span>Step 1 of 3<span class="vh">, done</span></span><span>Your profile: name, photo and role</span></li><li class="stepper__step is-invalid" aria-current="step"><span>Step 2 of 3 · 1 answer to check</span><span>Invite your team: Daniel, Grace and Hannah</span></li><li class="stepper__step"><span>Step 3 of 3</span><span>Your first project</span></li></ol>
```

### vertical / complete
```html
<ol class="stepper stepper--vertical" aria-label="Set up your workspace"><li class="stepper__step is-done"><span>Step 1 of 3<span class="vh">, done</span></span><span>Your profile: name, photo and role</span></li><li class="stepper__step is-done"><span>Step 2 of 3<span class="vh">, done</span></span><span>Invite your team: Daniel, Grace and Hannah</span></li><li class="stepper__step is-done" aria-current="step"><span>Step 3 of 3<span class="vh">, done</span></span><span>Your first project</span></li></ol>
```

## Responsive

- **360px:** the row keeps every bar; names wrap within their column and break long words. With five steps, drop
  the names and keep "Step 4 of 5" with the current step's name in the page title.
- **768px:** the full row with names.
- **1024px and up:** the row above a narrow form, or `.stepper--vertical` in a side column beside it.

## Theming

Every colour reads a semantic role. In dark mode filled bars turn light sage, empty bars use the dark default border
and the invalid bar uses the dark danger fill.

## Accessibility

**Role:** an ordered list (`<ol>`) with an `aria-label` naming the flow; the current step has
`aria-current="step"`. Done steps add a visually hidden ", done" so the state is not carried by colour alone. Links
to done steps are ordinary links.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Reaches only the links to done steps; plain steps are not focusable. |
| Enter | Follows a link back to a done step. |

**Focus:** links show the shared 2px `--color-focus-ring`. On each new step, move focus to the step's heading so
the new position is announced.

**Labelling:** "Step 2 of 3" is real text, so the position is read even where the list count is not. An invalid
step says how many answers to check in words.

**Motion:** bars fill without animation; nothing to reduce.

**Touch:** the stepper is not a control; only links to done steps are targets, and their rows are at least 24px tall.

## Content

Name each step with a short noun phrase in sentence case: **Your profile**, **Date and place**, **Review**. Always
write the position as **Step 2 of 3**. Keep names to three words in a horizontal stepper. An invalid step says what
to do: **2 answers to check**, never "Error".

## Do and don't

### Do
Keep the flow to three to five steps and say the position in words.
```html
<ol class="stepper" aria-label="New gathering"><li class="stepper__step is-done"><span>Step 1 of 3<span class="vh">, done</span></span><span>Details</span></li><li class="stepper__step" aria-current="step"><span>Step 2 of 3</span><span>Invitations</span></li><li class="stepper__step"><span>Step 3 of 3</span><span>Review</span></li></ol>
```

### Don't
Split a short form into many tiny steps; eight bars feel like a long road.
```html
<ol class="stepper" aria-label="Sign up"><li class="stepper__step is-done"><span>1</span></li><li class="stepper__step" aria-current="step"><span>2</span></li><li class="stepper__step"><span>3</span></li><li class="stepper__step"><span>4</span></li><li class="stepper__step"><span>5</span></li><li class="stepper__step"><span>6</span></li><li class="stepper__step"><span>7</span></li><li class="stepper__step"><span>8</span></li></ol>
```

### Do
Link back to done steps so an answer can be changed.
```html
<ol class="stepper" aria-label="New gathering"><li class="stepper__step is-done"><span>Step 1 of 2<span class="vh">, done</span></span><a href="#">Details</a></li><li class="stepper__step" aria-current="step"><span>Step 2 of 2</span><span>Review</span></li></ol>
```

### Don't
Mark progress with colour alone; without "Step 1 of 2" and ", done" a screen reader hears only names.
```html
<ol class="stepper" aria-label="New gathering"><li class="stepper__step is-done"><span>Details</span></li><li class="stepper__step"><span>Review</span></li></ol>
```

## Tokens

Steps read the default border, accent and danger fills for the bars, the subtle, default and danger text roles,
`--text-caption` and `--space-1` for bar height.

## Code

Mark done steps with `.is-done`, the current one with `aria-current="step"`, and a step with errors with
`.is-invalid`. Add `.stepper--vertical` for a column.
