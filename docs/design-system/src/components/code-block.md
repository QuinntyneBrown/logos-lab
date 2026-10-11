---
title: Code block
tier: standard
order: 58
summary: Monospaced text on a soft linen panel for commands, settings and snippets people read closely or copy.
selector: .code-block
target: button, pre
states: default, hover, focus, copied
matrix-variants: with copy
contrast: --color-fg-default|--color-bg-subtle|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use a code block for anything people type or paste exactly: a command, a settings file, an address, a key.
Inline code marks a short literal inside a sentence; a block holds one or more whole lines and keeps their
spacing. Add a copy button when copying is the main reason the block is there. Don't use code styling for
emphasis or for product names — use plain text, and [badges](badge.html) for status.

## Anatomy

1. **Panel** — `--color-bg-subtle` with a medium radius and `--space-4` padding (`.code-block`).
2. **Code** — the monospace code style; whitespace and line breaks are kept exactly.
3. **Copy button** — optional small quiet button after the block (`.code-copy`).
4. **Status** — a polite live region that confirms the copy.

```html
<div class="code-copy"><pre class="code-block"><code>notes export "Harbour Notes" --format markdown</code></pre><button class="btn btn--quiet btn--sm" type="button" data-copy-demo><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5"/></svg>Copy command</button><p class="field__help" role="status"></p></div>
```

## Variants

### block
Several lines, such as a settings file. Indentation is kept exactly as written.
```html
<pre class="code-block"><code>{
  "notebook": "Harbour Notes",
  "format": "markdown",
  "since": "2026-10-01",
  "include_comments": true
}</code></pre>
```

### inline
A short literal inside a sentence: a command, a file name or a value someone will type.
```html
<p>Run <code class="code-block code-block--inline">notes sync</code> to pull the latest pages, or open <code class="code-block code-block--inline">settings.json</code> to change the folder.</p>
```

### with copy
A command people will paste into a terminal. The button copies the exact text and a status line confirms it.
```html
<div class="code-copy"><pre class="code-block"><code>notes export "Harbour Notes" --format markdown</code></pre><button class="btn btn--quiet btn--sm" type="button" data-copy-demo><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5"/></svg>Copy command</button><p class="field__help" role="status"></p></div>
```

### scrolling
A long line scrolls sideways instead of wrapping, so it stays exact. The panel is a focusable, labelled region so keyboard users can scroll it.
```html
<pre class="code-block" tabindex="0" role="region" aria-label="Webhook address for Northwind"><code>https://hooks.example.com/northwind/harbour-notes/v2/events?include=pages,comments,exports&amp;since=2026-10-01T09:00:00Z</code></pre>
```

## Sizes

N/A: one size. Code uses `--text-code` in blocks and inline; inline code drops to `--space-1` side padding.

## States

**Hover** and **focus** show on the copy button like any quiet button, and on a scrolling block focus draws
the sage ring around the panel. **Copied** confirms in the status line and briefly switches the button to
a check and **Copied**; it returns to **Copy command** after a few seconds. If the clipboard is unavailable,
the status line asks people to select the text instead.

### with copy / copied
```html
<div class="code-copy"><pre class="code-block"><code>notes export "Harbour Notes" --format markdown</code></pre><button class="btn btn--quiet btn--sm" type="button" data-copy-demo><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Copied</button><p class="field__help" role="status">Command copied to your clipboard.</p></div>
```

## Responsive

Blocks never wrap code: at 360px long lines scroll sideways inside the panel while the page stays still.
Inline code wraps with the sentence around it. The copy button sits under the block at every width so it
never covers the code.

## Theming

The panel uses `--color-bg-subtle` and the text `--color-fg-default`, both semantic roles, so code reads at
more than 4.5:1 in light and dark themes without a separate syntax palette.

## Accessibility

**Role:** `<pre><code>` for blocks and `<code>` inline. A block that scrolls is a focusable region
(`tabindex="0"`, `role="region"`) with an `aria-label` that says what it holds.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves to the copy button, or to a scrolling block. |
| Enter, Space | Copies the code from the focused button. |
| Arrow keys | Scroll a focused block sideways. |

**Focus:** the copy button and scrolling blocks show the sage ring. Focus stays on the button after copying.

**Labelling:** name the button after what it copies (**Copy command**, **Copy address**). The status line is
`role="status"`, so the confirmation is announced without moving focus.

**Motion:** none.

**Touch:** the copy button is 36px tall; on touch screens it is the dependable way to copy, because selecting
monospace text by hand is fiddly.

## Content

Show exactly what people should type, with no prompt character (`$`) unless they must type it, and no
placeholder they could paste by mistake. Introduce the block with a sentence saying where to use it. Keep a
copyable block to one command; split several commands into several blocks.

## Do and don't

### Do
One command per block, ready to paste.
```html
<pre class="code-block"><code>notes sync</code></pre>
```

### Don't
Include a prompt and several commands, so a paste fails.
```html
<pre class="code-block"><code>$ notes login &amp;&amp; notes sync
$ notes export "Harbour Notes"</code></pre>
```

### Do
Use inline code for literals people type.
```html
<p>Open <code class="code-block code-block--inline">settings.json</code> to change the folder.</p>
```

### Don't
Use code styling for emphasis or product names.
```html
<p>Harbour Notes is <code class="code-block code-block--inline">really fast</code> in <code class="code-block code-block--inline">Northwind</code>.</p>
```

## Tokens

Code blocks read `--color-bg-subtle`, `--text-code`, `--radius-md` (blocks), `--radius-xs` (inline) and
`--space-4` padding.

## Code

Use `<pre class="code-block"><code>…</code></pre>` for blocks and `<code class="code-block code-block--inline">`
inline. Wrap a block, its copy button and a `role="status"` line in `.code-copy`.
