---
title: Prose
tier: standard
order: 82
summary: Set long-form pages such as privacy, terms and help articles in a calm, readable column with a clear heading rhythm.
selector: .prose
states: default
matrix-variants: about
contrast: --color-fg-default|--color-bg-canvas|4.5; --color-fg-muted|--color-bg-canvas|4.5; --color-fg-link|--color-bg-canvas|4.5; --color-focus-ring|--color-bg-canvas|3
---

## Overview

Wrap any long-form text you do not control line by line — privacy policy, terms, help articles, an about
page, rendered Markdown — in `.prose`. It styles plain `h2`, `h3`, `p`, `ul`, `ol`, `strong` and `a`
elements, caps the column at `--layout-narrow` (44rem) and spaces every block evenly, so content authors
never add classes. Use it under a [page header](page-header.html). Do not use it for interface copy such as
form help or card text; those components set their own type.

## Anatomy

1. **Column** — `.prose`, a grid capped at 44rem with 20px between blocks.
2. **Section heading** — `h2`, light display face at 28px, with 24px extra space above.
3. **Subheading** — `h3` in the `h3` role (22px sans, medium), with 16px extra space above.
4. **Paragraph** — `p` in the large body role (19px) and `--color-fg-muted`, wrapped with `text-wrap: pretty`.
5. **List** — `ul` or `ol` indented 24px, 8px between items.
6. **Emphasis and links** — `strong` returns to `--color-fg-default`; links keep the underlined link role.

```html
<div class="prose">
  <h2>What we collect</h2>
  <p>{{app}} keeps only what it needs to run your workspace: your name, your email address, and the projects, notes and gatherings your team creates.</p>
  <ul>
    <li>Account details you give us when you sign up.</li>
    <li>Content your team writes in projects and notes.</li>
  </ul>
</div>
```

## Variants

### privacy
A policy section: heading, paragraph, bulleted list, subheading and a link.
```html
<div class="prose">
  <h2>What we collect</h2>
  <p>{{app}} keeps only what it needs to run your workspace: your name, your email address, and the projects, notes and gatherings your team creates.</p>
  <ul>
    <li><strong>Account details</strong> you give us when you sign up.</li>
    <li><strong>Your content:</strong> what your team writes in projects such as Northwind and notebooks such as Harbour Notes.</li>
    <li><strong>Basic logs</strong> of sign-ins and errors, kept for 30 days so we can fix problems.</li>
  </ul>
  <h3>What we never do</h3>
  <p>We never sell your data, show you ads or read your notes to train anything. Read <a href="#">how we protect your workspace</a> for the detail.</p>
</div>
```

### terms
Numbered clauses as subheadings, with short paragraphs and a last-updated line.
```html
<div class="prose">
  <h2>Terms of use</h2>
  <p>Last updated Friday 9 October 2026. These terms are written to be read; if anything is unclear, <a href="#">ask us</a>.</p>
  <h3>1. Your account</h3>
  <p>You are responsible for the people you invite. Remove anyone who leaves the team from <strong>Settings › People</strong>.</p>
  <h3>2. Your content</h3>
  <p>What you write stays yours. You give {{app}} permission to store it and show it to the people you share it with, and nothing more.</p>
  <h3>3. Ending your account</h3>
  <p>You can export everything and delete your workspace at any time. We remove your content within 30 days.</p>
</div>
```

### help article
Steps as an ordered list, with interface names in bold and a closing tip.
```html
<div class="prose">
  <h2>Invite someone to Harbour Notes</h2>
  <p>Anyone with edit access can invite people to a notebook. Invitations last seven days.</p>
  <ol>
    <li>Open <strong>Harbour Notes</strong> and choose <strong>Share</strong> at the top right.</li>
    <li>Type a name or email address, for example Daniel Reyes.</li>
    <li>Choose <strong>Can edit</strong> or <strong>Can read</strong>, then <strong>Send invitation</strong>.</li>
  </ol>
  <h3>If the invitation does not arrive</h3>
  <p>Ask them to check their spam folder, or copy the invitation link from <strong>Share › Pending</strong> and send it yourself.</p>
</div>
```

### about
A short introduction: one heading and two paragraphs.
```html
<div class="prose">
  <h2>Why we built {{app}}</h2>
  <p>We are a small team who kept losing decisions in chat threads and meeting notes nobody could find. Northwind, Harbour Notes and Field Day were our own projects first.</p>
  <p>{{app}} is the calm place we wanted: fewer notifications, clearer notes, and more time for the work itself.</p>
</div>
```

## Sizes

N/A: one size. The column caps at `--layout-narrow` (44rem, about 75 characters of 19px text) and
otherwise fills its container.

## States

Prose is passive content. Links inside it follow the [link](link.html) states: hover darkens the link
colour and focus draws the sage ring.

## Responsive

- **360px:** the column fills the width inside the page margins; headings wrap with `text-wrap: balance`
  and long links break anywhere rather than overflowing.
- **768px:** the column reaches its 44rem cap and sits at the start of the content area.
- **1024px and up:** unchanged; pair it with an [aside](card.html) or a sidebar navigation for long policies.

## Theming

Paragraphs read `--color-fg-muted`, headings and `strong` read `--color-fg-default`, links read
`--color-fg-link`. In dark mode every role shifts with the theme; no prose-specific colours exist.

## Accessibility

**Role:** plain document semantics. Put the page's `h1` in the page header, then `h2` for sections and `h3`
inside them; never skip a level for size. Use `ol` for steps that happen in order and `ul` otherwise.

**Focus:** only links take focus, with the shared sage ring offset 3px.

**Labelling:** link text names the destination ("how we protect your workspace"), never "here".
Interface names are in `strong` so they stand out without colour.

**Motion:** none.

**Touch:** links inside paragraphs use the large body line height (about 32px), which keeps adjacent lines'
links apart; put important links on their own line.

## Content

- Write in plain words, second person, short sentences: "What you write stays yours."
- Lead each section with the answer, then the detail.
- Use real dates in full ("Friday 9 October 2026") and real interface names in bold: **Settings › People**.
- Keep paragraphs to four sentences; split a long list into sections with `h3`.

## Do and don't

### Do
Descriptive link text and interface names in bold.
```html
<div class="prose"><p>Remove anyone who leaves the team from <strong>Settings › People</strong>. Read <a href="#">how removal works</a>.</p></div>
```

### Don't
"Click here" links and shouting in capitals make policies harder to trust.
```html
<div class="prose"><p>PLEASE NOTE: TO REMOVE A USER <a href="#">click here</a>.</p></div>
```

### Do
Numbered steps for a task that happens in order.
```html
<div class="prose"><ol><li>Open <strong>Harbour Notes</strong>.</li><li>Choose <strong>Share</strong>.</li><li>Send the invitation.</li></ol></div>
```

### Don't
A wall of text with no headings or lists hides the one answer people came for.
```html
<div class="prose"><p>To invite someone you first need to make sure you have edit access which you can check in the share menu and then you can type their name or email address and choose whether they can edit or read and then you send it and it lasts seven days unless it is revoked or accepted earlier.</p></div>
```

## Tokens

Prose reads the `h2`, `h3` and large body type roles, `--layout-narrow`, the default, muted and link
colour roles, and `--space-5` for the block rhythm.
