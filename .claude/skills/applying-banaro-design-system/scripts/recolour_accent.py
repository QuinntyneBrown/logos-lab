#!/usr/bin/env python3
"""Recolour the accent ramp while keeping the Banaro look's lightness and contrast.

The accent is the one colour for the one thing that matters (primary buttons,
links, focus, current markers). This script builds a new 11-step ramp
(--palette-accent-50 … 950) from one source colour: each step keeps the OKLCH
lightness of the default sage step and takes the new hue, with the chroma scaled
to the source colour's and clamped into sRGB. It rewrites only the block between
`accent:start` and `accent:end`, records the accent in design-system.json, checks
every contrast pair in both themes and rebuilds. Success stays sage.

Usage:
    python recolour_accent.py --colour "#3e5f8a" --name "harbour blue"
    python recolour_accent.py docs/design-system --colour "#7a4c8c" --name plum
    python recolour_accent.py --reset                       # back to sage
    python recolour_accent.py --colour "#c2410c" --dry-run  # print the ramp only
"""
from __future__ import annotations

import argparse
import json
import math
import re
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import kitlib as K  # noqa: E402

STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
SAGE = ["#eef2ea", "#dfe7da", "#c8d6c3", "#a9bfa5", "#8ba887", "#6f8c72", "#55715a", "#45604a", "#374d3b", "#26352a", "#18221b"]


# --- colour maths (sRGB <-> OKLab <-> OKLCH) -------------------------------

def hex_to_rgb(value: str):
    value = value.strip().lstrip("#")
    if len(value) == 3:
        value = "".join(c * 2 for c in value)
    if not re.fullmatch(r"[0-9a-fA-F]{6}", value):
        raise ValueError(f"not a hex colour: #{value}")
    return tuple(int(value[i:i + 2], 16) / 255 for i in (0, 2, 4))


def rgb_to_hex(rgb) -> str:
    return "#" + "".join(f"{round(max(0.0, min(1.0, c)) * 255):02x}" for c in rgb)


def to_linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def from_linear(c):
    return 12.92 * c if c <= 0.0031308 else 1.055 * (c ** (1 / 2.4)) - 0.055


def rgb_to_oklch(rgb):
    r, g, b = (to_linear(c) for c in rgb)
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l_, m_, s_ = (math.copysign(abs(v) ** (1 / 3), v) for v in (l, m, s))
    L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
    a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
    bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    return L, math.hypot(a, bb), math.degrees(math.atan2(bb, a)) % 360


def oklch_to_rgb(L, C, H):
    a, b = C * math.cos(math.radians(H)), C * math.sin(math.radians(H))
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    return tuple(from_linear(c) if c >= 0 else -from_linear(-c) for c in (r, g, bl))


def in_gamut(rgb) -> bool:
    return all(-1e-4 <= c <= 1 + 1e-4 for c in rgb)


def build_ramp(source_hex: str) -> list:
    _, c_src, hue = rgb_to_oklch(hex_to_rgb(source_hex))
    _, c_sage600, _ = rgb_to_oklch(hex_to_rgb(SAGE[6]))
    scale = (c_src / c_sage600) if c_sage600 else 1.0
    scale = max(0.4, min(scale, 3.0))
    ramp = []
    for sage in SAGE:
        L, C, _ = rgb_to_oklch(hex_to_rgb(sage))
        chroma = C * scale
        rgb = oklch_to_rgb(L, chroma, hue)
        while not in_gamut(rgb) and chroma > 0.001:
            chroma *= 0.95
            rgb = oklch_to_rgb(L, chroma, hue)
        ramp.append(rgb_to_hex(rgb))
    return ramp


def write_ramp(tokens_css: str, ramp: list, label: str) -> str:
    lines = "\n".join(f"  --palette-accent-{step}: {value};" for step, value in zip(STEPS, ramp))
    block = f"/* accent:start — the one colour for the one thing that matters ({label}) */\n{lines}\n  /* accent:end */"
    new, count = re.subn(r"/\* accent:start.*?\*/.*?/\* accent:end \*/", lambda _m: block, tokens_css, flags=re.S)
    if count != 1:
        raise SystemExit("error: tokens.css has no accent:start … accent:end block")
    return new


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("root", nargs="?", default="docs/design-system", type=Path)
    parser.add_argument("--colour", "--color", dest="colour", help="Source colour, e.g. #3e5f8a (any lightness; its hue and chroma are used)")
    parser.add_argument("--name", default="", help="A name for the accent, e.g. 'harbour blue'")
    parser.add_argument("--reset", action="store_true", help="Restore the default sage accent")
    parser.add_argument("--dry-run", action="store_true", help="Print the ramp; change nothing")
    args = parser.parse_args(argv)
    if not args.reset and not args.colour:
        parser.error("give --colour or --reset")

    ramp = SAGE if args.reset else build_ramp(args.colour)
    label = "default: sage" if args.reset else (args.name or args.colour)
    print(f"accent ramp ({label}):")
    for step, value in zip(STEPS, ramp):
        print(f"  {step:>3}  {value}")
    if args.dry_run:
        return 0

    tokens_path = args.root / "tokens" / "tokens.css"
    original = tokens_path.read_text(encoding="utf-8")
    tokens_path.write_text(write_ramp(original, ramp, label), encoding="utf-8")
    check = subprocess.run([sys.executable, str(Path(__file__).with_name("check_contrast.py")), str(tokens_path)], capture_output=True, text=True)
    failures = [line for line in check.stdout.splitlines() if line.strip().startswith("FAIL")]
    if check.returncode != 0 or failures:
        tokens_path.write_text(original, encoding="utf-8")
        print("\nThis accent breaks contrast; tokens.css was left unchanged. Failing pairs:")
        print("\n".join(failures) or check.stdout[-2000:])
        print("\nTry a deeper or less saturated source colour.")
        return 1

    config = K.load_config(args.root)
    config["accent"] = {"name": "sage" if args.reset else (args.name or args.colour), "source": SAGE[6] if args.reset else args.colour}
    K.save_config(args.root, config)
    print("\n" + (check.stdout.strip().splitlines() or ["contrast ok"])[-1])
    import build_design_system  # noqa: E402
    return build_design_system.main([str(args.root)])


if __name__ == "__main__":
    sys.exit(main())
