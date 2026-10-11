---
title: Motion
summary: Slow and quiet, only when welcome — 240ms colour, 420ms movement, 640ms entrances, nothing that delays.
---

## Principles

Motion explains continuity; it never performs. The tempo is deliberately unhurried:

| Duration | Use |
|---|---|
| `--duration-fast` 240ms | colour and opacity feedback (hover, focus wash) |
| `--duration-base` 420ms | small movement: card lift, arrow nudge, border changes |
| `--duration-slow` 640ms | entrances: dialogs and toasts *rise*, sheets and menus *settle* |
| `--duration-deliberate` 900ms | photographic emphasis (a slow 3% zoom on hover), spinner turn |
| `--duration-breath` 3600ms | ambient loops: skeleton shimmer, the presence dot's breathing |

The curves are `--ease-standard` for most changes and `--ease-enter` for arrivals. `--ease-exit` is for
the rare departures, and `--ease-breath` is for loops.

- **Only the thing being used moves.** Lifts are 3px (`--lift`) and arrow nudges 3px (`--lift-nudge`).
- **Entrances share one gesture.** Dialogs and toasts rise 16px; menus and sheets settle 12px.
- **Ambient motion is decorative.** The breathing presence dot is never the only sign of being online.

## Specimens

Play each duration to feel the tempo. Under reduced motion the demos stay still.

## Usage

- Wrap every transition and animation in `@media (prefers-reduced-motion: no-preference)`. Under
  `reduce`, the tokens collapse to 0.01ms, a global rule removes animation, and lifts become 0px. Busy text
  and progress values stay readable.
- Never animate layout properties (width, height, top) on large areas. Use `translate`, `scale` and
  `opacity`.
- The shared keyframes are `rise`, `settle`, `shimmer`, `spin` and `breathe`. They live in the base block of
  `components.css`; reuse them before writing new ones.
