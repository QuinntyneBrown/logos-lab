#!/usr/bin/env python3
"""Audit how the mocks use the design system; optionally prune what they don't use.

Reports:
  - every component, its tier and how many mock states use it (by its `selector` classes)
  - classes used in the mocks that the design system does not define
    (add them to a component's @component block; never style mocks locally)
  - classes used in the remaining page sources that no CSS block defines
  - leftover Banaro or kit sample copy in docs/design-system/src and docs/mocks

--prune removes every unused standard and sample component: its source, its
@component CSS block and any --size-*/grain token nothing references any more,
then notes the removal in src/CHANGELOG.md and rebuilds. Core components are
kept unless --include-core is given.

Usage:
    python audit_usage.py                                   # report on docs/design-system + docs/mocks
    python audit_usage.py docs/design-system --prune
    python audit_usage.py --prune --keep hero,panel         # keep these even if unused
    python audit_usage.py --strict                          # exit 1 on leftovers or undefined classes
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import kitlib as K  # noqa: E402

PRUNABLE_TOKEN = re.compile(r"^--(size-|grain-|color-grain$|color-bg-panel$|layout-measure-(?:title|display|verse)$)")
CHROME_CLASSES = {"mock-bar", "mock-note", "is-mock"}


def defined_classes(*css_texts: str) -> set:
    found = set()
    for css in css_texts:
        css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
        found |= K.block_classes(css)
    return found


def src_classes(sources: dict) -> dict:
    """{source path: set(classes used in its html fences)}"""
    out = {}
    for items in sources.values():
        for s in items:
            classes = set()
            for body in s.sections.values():
                for code in K.fences(body):
                    for value in K.CLASS_ATTR_RE.findall(code):
                        classes.update(value.split())
            out[s.path] = classes
    return out


def leftovers(paths: list, words: list) -> list:
    hits = []
    for path in paths:
        text = path.read_text(encoding="utf-8", errors="replace")
        for word in words:
            pattern = rf"(?<![\w-]){re.escape(word)}(?![\w-])"
            for m in re.finditer(pattern, text):
                line = text.count("\n", 0, m.start()) + 1
                hits.append((path, line, word))
    return hits


def remove_tokens(tokens_css: str, names: list) -> str:
    for name in names:
        tokens_css = re.sub(rf"^[ \t]*{re.escape(name)}\s*:[^;]*;[^\n]*\n", "", tokens_css, flags=re.M)
    return tokens_css


def note_changelog(ds: Path, line: str) -> None:
    path = ds / "src" / "CHANGELOG.md"
    text = path.read_text(encoding="utf-8") if path.exists() else ""
    if text.startswith("### Unreleased\n"):
        head, _, rest = text.partition("\n\n")
        text = f"{head}\n\n- {line}\n{rest}"
    else:
        text = f"### Unreleased\n\n- {line}\n\n{text}"
    path.write_text(text, encoding="utf-8")


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("root", nargs="?", default="docs/design-system", type=Path)
    parser.add_argument("--mocks", type=Path, help="Mocks folder (default: sibling 'mocks')")
    parser.add_argument("--prune", action="store_true", help="Remove unused standard and sample components")
    parser.add_argument("--include-core", action="store_true", help="With --prune, also remove unused core components")
    parser.add_argument("--keep", default="", help="Comma-separated component slugs never to prune")
    parser.add_argument("--allow", default="", help="Comma-separated words not to report as leftovers (e.g. a reused cast name)")
    parser.add_argument("--strict", action="store_true", help="Exit 1 when leftovers or undefined classes remain")
    args = parser.parse_args(argv)

    ds = args.root
    mocks = args.mocks or K.mocks_root_for(ds)
    sources = K.load_sources(ds)
    css_path = ds / "assets" / "components.css"
    css = css_path.read_text(encoding="utf-8")
    mock_css = (mocks / "assets" / "mock.css").read_text(encoding="utf-8") if (mocks / "assets" / "mock.css").exists() else ""
    index = K.mock_class_index(mocks)
    keep = {k.strip() for k in args.keep.split(",") if k.strip()}
    allow = {a.strip() for a in args.allow.split(",") if a.strip()}

    print(f"{len(index)} mock states scanned in {mocks}")
    if not index:
        print("note: no mocks found — usage cannot be measured yet. Write the mocks first (Step 4).")

    # 1. Component usage ---------------------------------------------------
    unused = []
    print("\nComponent usage")
    for s in sources["components"]:
        uses = K.usage(s, index)
        mark = "used" if uses else "UNUSED"
        print(f"  {mark:6} {len(uses):4}  {s.tier:8} {s.slug}")
        if not uses:
            unused.append(s)

    # 2. Classes in mocks the system does not define -------------------------
    defined = defined_classes(css, mock_css) | CHROME_CLASSES
    undefined_in_mocks: dict = {}
    for path, classes in index.items():
        for cls in classes - defined:
            if cls.startswith(("mock-",)):
                continue
            undefined_in_mocks.setdefault(cls, []).append(path)
    if undefined_in_mocks:
        print("\nClasses used in the mocks but not defined in components.css (add them to a component block):")
        for cls, paths in sorted(undefined_in_mocks.items()):
            print(f"  .{cls:28} {len(paths)} state(s), e.g. {paths[0].relative_to(mocks).as_posix()}")

    # 3. Leftover copy --------------------------------------------------------
    src_files = sorted(p for p in (ds / "src").rglob("*.md") if p.name != "CHANGELOG.md")
    mock_html = K.mock_files(mocks)
    banaro = [w for w in K.BANARO_WORDS if w not in allow]
    cast = [w for w in K.KIT_CAST if w not in allow]
    config = K.load_config(ds)
    if config.get("app", "").lower() == "banaro":
        banaro = []
    hard = leftovers(src_files + mock_html, banaro)
    soft = leftovers(src_files + mock_html, cast) if index else []
    if hard:
        print("\nBanaro copy left behind (rewrite it in the app's voice):")
        for path, line, word in hard[:40]:
            print(f"  {path.as_posix()}:{line}: {word}")
    if soft:
        files = sorted({p for p, _, _ in soft})
        print(f"\nKit sample cast still present in {len(files)} file(s) (re-voice with the app's cast, or --allow names you reuse):")
        for path in files[:40]:
            names = sorted({w for p, _, w in soft if p == path})
            print(f"  {path.as_posix()}: {', '.join(names)}")

    # 4. Prune ----------------------------------------------------------------
    if args.prune:
        if not index:
            print("\nerror: refusing to prune without mocks — every component would look unused.", file=sys.stderr)
            return 2
        victims = [s for s in unused if s.slug not in keep and (s.tier != "core" or args.include_core)]
        if not victims:
            print("\nNothing to prune.")
        else:
            for s in victims:
                s.path.unlink()
                css = K.remove_css_block(css, s.slug)
                print(f"pruned {s.slug} ({s.tier})")
            css_path.write_text(css, encoding="utf-8")
            tokens_path = ds / "tokens" / "tokens.css"
            tokens_css = tokens_path.read_text(encoding="utf-8")
            haystack = css + (ds / "assets" / "ds.css").read_text(encoding="utf-8")
            haystack += "".join(p.read_text(encoding="utf-8") for p in (ds / "src").rglob("*.md"))
            haystack += "".join(p.read_text(encoding="utf-8", errors="replace") for p in mock_html)
            body_without_decls = re.sub(r"(--[\w-]+)\s*:", ":", tokens_css)  # references inside tokens.css
            dead = [n for n in K.token_names(tokens_css) if PRUNABLE_TOKEN.match(n)
                    and f"var({n}" not in haystack and f"var({n}" not in body_without_decls]
            if dead:
                tokens_path.write_text(remove_tokens(tokens_css, dead), encoding="utf-8")
                print(f"removed {len(dead)} unreferenced token(s): {', '.join(dead)}")
            note_changelog(ds, "Pruned components no mock uses: " + ", ".join(s.title for s in victims) + ".")
            import build_design_system  # noqa: E402
            code = build_design_system.main([str(ds)])
            if code:
                return code
            sources = K.load_sources(ds)
            css = css_path.read_text(encoding="utf-8")

    # 5. Classes in remaining sources that no CSS defines ----------------------
    defined = defined_classes(css, (ds / "assets" / "ds.css").read_text(encoding="utf-8"))
    orphan = {}
    for path, classes in src_classes(sources).items():
        missing = {c for c in classes - defined if not c.startswith("ds-")}
        if missing:
            orphan[path] = missing
    if orphan:
        print("\nClasses used in page sources but defined by no CSS block (a pruned dependency or a typo):")
        for path, missing in orphan.items():
            print(f"  {path.as_posix()}: {', '.join('.' + m for m in sorted(missing))}")

    problems = bool(undefined_in_mocks or hard or orphan or soft)
    print("\nsummary: "
          f"{len(sources['components'])} components, {len(unused) if not args.prune else 0} unused remaining, "
          f"{len(undefined_in_mocks)} undefined mock classes, {len(hard)} Banaro leftovers, "
          f"{len({p for p, _, _ in soft})} files with kit cast, {len(orphan)} sources with orphan classes")
    return 1 if (args.strict and problems) else 0


if __name__ == "__main__":
    sys.exit(main())
