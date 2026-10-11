# Recolouring the accent

The Banaro look has one accent. By default it is sage, the green-grey that marks the primary action, links,
the focus ring, the current tab and selected states. An app may choose another accent **only when the user
asks for it**. Everything else stays Banaro.

```sh
python <skill>/scripts/recolour_accent.py docs/design-system --colour "#3e5f8a" --name "harbour blue"
python <skill>/scripts/recolour_accent.py docs/design-system --colour "#3e5f8a" --dry-run   # preview the ramp
python <skill>/scripts/recolour_accent.py docs/design-system --reset                        # back to sage
```

How it works:

- **Lightness is kept, hue is swapped.** Each of the 11 steps keeps the OKLCH lightness of the matching sage
  step and takes the new hue. Chroma is scaled to the source colour and clamped into sRGB. Because lightness
  drives contrast, every pairing that passed with sage passes again. The script still checks every declared
  pair in both themes, and **leaves tokens.css untouched if any pair fails**.
- **Success stays sage.** Success reads its own `--palette-sage-*` primitives, so "done" stays green
  whatever the accent.
- **Only the `accent:start … accent:end` block changes.** The script also records `accent` in
  `design-system.json` and rebuilds the pages.

Choosing a source colour:

- Pick a muted, natural colour of medium lightness, the way sage is: fjord blue, plum, ochre, moss or brick.
  Neon or fully saturated colours fight the oat neutrals. The clamp tames them, but the result can still feel
  loud.
- Avoid hues that read as status: a red accent looks like danger, an amber one like warning. If the brand
  insists, keep danger buttons explicit with their icon and words.
- Review the colour, button and tabs pages and three mocks in both themes after recolouring. Add a
  changelog line: "Accent recoloured to harbour blue (#3e5f8a) at the user's request."
