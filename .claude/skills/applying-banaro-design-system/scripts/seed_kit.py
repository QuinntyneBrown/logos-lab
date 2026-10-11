#!/usr/bin/env python3
"""Seed a project with the Banaro-look design system kit.

Copies the kit into <docs>/design-system (tokens, component styles, doc-site
assets, fonts, photos and page sources), adds the mock assets to <docs>/mocks/assets
(mock chrome plus two @import shims so mocks link ../../assets/tokens.css and
ui.css), writes design-system.json, then builds the documentation site.

Usage:
    python seed_kit.py --app "Tally" --prefix ty
    python seed_kit.py --app "Logos Lab" --prefix ll --description "Courses and conversations on faith and AI."
    python seed_kit.py --app "Tally" --prefix ty --docs path/to/docs --force   # replace an existing seed

The component prefix replaces the kit's --bn- knobs (and is the prefix for
framework component selectors later, e.g. ty-button). It must be 2-4 lowercase letters.
"""
from __future__ import annotations

import argparse
import datetime as dt
import re
import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import kitlib as K  # noqa: E402

SKILL = Path(__file__).resolve().parent.parent
KIT = SKILL / "assets" / "kit"

TOKENS_SHIM = """/* Mock entry point: fonts and tokens come from the design system (its source of truth). */
@import url("../../design-system/assets/fonts/fonts.css");
@import url("../../design-system/tokens/tokens.css");
"""
UI_SHIM = """/* Mock entry point: component styles come from the design system. Add new components there, not here. */
@import url("../../design-system/assets/components.css");
"""


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--app", required=True, help="Product name, e.g. 'Tally'")
    parser.add_argument("--prefix", required=True, help="2-4 lowercase letters for component knobs and selectors")
    parser.add_argument("--description", default="", help="One sentence describing the product's visual language")
    parser.add_argument("--docs", default="docs", type=Path, help="Docs folder (default: docs)")
    parser.add_argument("--force", action="store_true", help="Replace an existing docs/design-system")
    parser.add_argument("--no-build", action="store_true", help="Copy only; do not build pages")
    args = parser.parse_args(argv)

    if not re.fullmatch(r"[a-z]{2,4}", args.prefix):
        print("error: --prefix must be 2-4 lowercase letters (e.g. ty)", file=sys.stderr)
        return 2
    ds = args.docs / "design-system"
    mocks = args.docs / "mocks"
    if ds.exists() and any(ds.iterdir()):
        if not args.force:
            print(f"error: {ds} already exists. This skill updates an existing system in place; "
                  "re-seed only with --force (it replaces tokens, styles and sources).", file=sys.stderr)
            return 2
        shutil.rmtree(ds)

    shutil.copytree(KIT / "design-system", ds)
    (mocks / "assets").mkdir(parents=True, exist_ok=True)
    for name in ("mock.css", "mock.js"):
        target = mocks / "assets" / name
        if not target.exists():
            shutil.copy2(KIT / "mocks" / "assets" / name, target)
    (mocks / "assets" / "tokens.css").write_text(TOKENS_SHIM, encoding="utf-8")
    (mocks / "assets" / "ui.css").write_text(UI_SHIM, encoding="utf-8")
    photos = mocks / "assets" / "photos"
    if not photos.exists():
        shutil.copytree(KIT / "design-system" / "assets" / "photos", photos)

    # Component knobs take the product prefix.
    files = [ds / "assets" / "components.css", ds / "assets" / "ds.css"] + list((ds / "src").rglob("*.md"))
    for path in files:
        text = path.read_text(encoding="utf-8")
        if "--bn-" in text:
            path.write_text(text.replace("--bn-", f"--{args.prefix}-"), encoding="utf-8")

    today = dt.date.today().isoformat()
    K.save_config(ds, {
        "app": args.app,
        "prefix": args.prefix,
        "description": args.description,
        "version": "1.0",
        "accent": {"name": "sage", "source": "#55715a"},
        "kit": "banaro-1.0",
        "seeded": today,
    })
    (ds / "src" / "CHANGELOG.md").write_text(
        f"### v1.0 — {today}\n\nSeeded from the Banaro component kit by the applying-banaro-design-system skill. "
        f"Component knobs use the `--{args.prefix}-` prefix.\n", encoding="utf-8")
    print(f"seeded {ds} and {mocks / 'assets'} for {args.app} (prefix --{args.prefix}-)")

    if args.no_build:
        return 0
    import build_design_system  # noqa: E402
    return build_design_system.main([str(ds)])


if __name__ == "__main__":
    sys.exit(main())
