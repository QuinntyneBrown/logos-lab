# The Banaro look

What makes a screen read as "Banaro", what an app may change, and the review checklist that keeps it so.

## The idea

**Scandinavian calm.** The surfaces are oat and birch paper, with one sage accent for the one thing that
matters. Corners are soft, portraits are small rounded squares, and there is generous room and slow, quiet
motion. Light mode is a birch-paper morning; dark mode is a winter evening by lamplight, warm charcoal rather
than blue-black. Nothing shouts. The product feels considered, local and human.

## The signatures (keep every one)

1. **Warm neutrals.** The oat canvas, birch surfaces and linen wells. Hairlines (`--color-border-default`)
   separate content before boxes or shadows do.
2. **One accent moment per view.** The primary pill, the current-tab underline, the selected chip or the
   dot under the current nav link. If two things compete in the accent colour, one of them is wrong.
3. **Light, tight display type.** Manrope 300 with `-0.03em` tracking at h1 and h2 and in the hero, and
   relaxed 1.65 body text. One phrase of a hero may turn the accent colour with `<em>`.
4. **Overlines with a rule.** `.eyebrow` (small uppercase, wide tracking, a short line before it) introduces
   sections and page heads.
5. **Pills for actions, soft rectangles for content.** Buttons, chips, search and selects are fully rounded;
   cards are 20px; dialogs and panels are 28px.
6. **Small square portraits** with 16px corners, never circles. Initials sit on muted tiles (sage, clay,
   fjord, oat) when there is no photo.
7. **The grain panel.** One birch-and-clay `.panel.grain` with a whisper of wood grain, at most once per
   screen, usually for the single most inviting next step.
8. **Generous space.** 96–128px between page sections, 24px inside cards, `.stack` and `.cluster` gaps on a
   4px rhythm.
9. **Quiet, slow motion.** 240ms colour, 420ms lifts (3px), 640ms entrances that rise or settle, a 900ms
   photo zoom, and the breathing presence dot. Everything stops under reduced motion.
10. **Warm, specific copy.** Sentence case, verbs on buttons, numbers as numerals, no exclamation marks and
    no blame (see the content foundation and pattern).
11. **The brand line.** A lowercase wordmark next to a line-art mark that carries one warm "sun" dot
    (`.brand__sun`).

## What an app may change

| Change | How | Notes |
|---|---|---|
| Product name and wordmark | `design-system.json` → `app`; `{{app}}`/`{{app_lower}}` in sources | Lowercase wordmark, semibold, slight negative tracking |
| Brand mark | Edit `src/components/brand.md` and the mock templates | 32×32, 1.6 stroke, `currentColor` (accent), one `.brand__sun` dot |
| Accent hue | `recolour_accent.py --colour … --name …` | Only on request; success stays sage; contrast is rechecked |
| Component prefix | `seed_kit.py --prefix` | Knobs become `--<prefix>-*`; framework selectors use `<prefix>-*` |
| New components | `references/adding-components.md` | Built from existing roles and the same signatures |
| Photography | Add files to `docs/design-system/assets/photos` and `docs/mocks/assets/photos` | Warm, natural light, real places; square portraits at 480px |

## What an app must not change

- Token **values** for neutrals, status colours, type, spacing, radius, elevation and motion. A real need
  for a new value becomes a new **named** token with a changelog entry, never an edit to an existing one.
- Fonts: Manrope and JetBrains Mono only.
- Raw colours or magic numbers in components; everything reads roles.
- Circular portraits, heavy shadows, gradients, saturated full-bleed colour blocks, all-caps buttons, or
  bold display headings.

## Fidelity review (run on screenshots at 360, 768 and 1280px, light and dark)

- [ ] The canvas is oat (light) or warm charcoal (dark); cards are birch or night-900 with hairlines.
- [ ] Each view has exactly one accent-coloured primary moment.
- [ ] Page titles are light and large (`.page-head__title` or `--text-h1`), preceded by an eyebrow where useful.
- [ ] Actions are pills; content containers use the radius scale; portraits are rounded squares.
- [ ] Spacing feels generous; nothing is cramped against a hairline or edge.
- [ ] Status uses the four tones with words and icons; nothing relies on colour alone.
- [ ] Dark mode looks intentional: no pure black, no blue tint, legible muted text.
- [ ] Motion is slow and small; nothing bounces or slides far.
- [ ] Copy is calm, specific and in sentence case, with no lorem, no shouting and no blame.
- [ ] The wordmark and mark follow the brand line.
- [ ] Side by side with a Banaro screen at the same width, a stranger would say they are the same family.
