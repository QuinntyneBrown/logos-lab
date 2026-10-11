#!/usr/bin/env python3
"""Shared helpers for the applying-banaro-design-system scripts (stdlib only).

- read the design-system config, sources, CSS blocks and tokens
- a small Markdown renderer for page sources
- a tiny HTML fragment DOM used to derive state specimens
- a scanner that finds which components the mocks use
"""
from __future__ import annotations

import html
import json
import re
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path

esc = html.escape

FOUNDATIONS = ["color", "typography", "spacing", "layout", "elevation", "shape", "motion",
               "iconography", "theming", "responsive", "accessibility", "content"]
COMPONENT_SECTIONS = ["overview", "anatomy", "variants", "sizes", "states", "responsive", "theming",
                      "accessibility", "content", "do-dont", "tokens", "code", "sources"]
PATTERN_SECTIONS = ["overview", "when", "structure", "states", "responsive", "accessibility",
                    "content", "do-dont", "sources"]
FOUNDATION_SECTIONS = ["principles", "specimens", "tokens", "usage", "sources"]
SECTION_TITLES = {
    "overview": "Overview", "anatomy": "Anatomy", "variants": "Variants", "sizes": "Sizes",
    "states": "States", "responsive": "Responsive behaviour", "theming": "Theming",
    "accessibility": "Accessibility", "content": "Content", "do-dont": "Do and don’t",
    "tokens": "Tokens", "code": "Code", "sources": "Sources", "when": "When to use",
    "structure": "Structure", "principles": "Principles", "specimens": "Specimens", "usage": "Usage",
}
SECTION_ALIASES = {
    "responsive behaviour": "responsive", "responsive behavior": "responsive", "do and don't": "do-dont",
    "do and don’t": "do-dont", "do and dont": "do-dont", "when to use": "when", "dos and don'ts": "do-dont",
}
TIERS = ["core", "standard", "sample"]
LIST_KEYS = {"variants", "states", "sizes", "matrix-variants", "tokens", "selector-classes"}

# Leftover words that betray un-adapted kit or Banaro copy.
BANARO_WORDS = ["Banaro", "banaro", "Toronto", "GTA", "Leslieville", "Psalter", "Roncesvalles", "Scripture"]
KIT_CAST = ["Amara Osei", "Daniel Reyes", "Grace Liu", "Hannah Kowalski", "Caleb Morgan", "Noah Fischer",
            "Elijah Brooks", "Leah Thompson", "Marcus Bennett", "Peter Walsh", "Ruth Alvarez", "Sofia Marquez",
            "Northwind", "Harbour Notes", "Field Day"]


# ---------------------------------------------------------------------------
# Config and paths
# ---------------------------------------------------------------------------

def load_config(ds_root: Path) -> dict:
    path = ds_root / "design-system.json"
    if not path.exists():
        return {"app": "Product", "prefix": "bn", "version": "1.0"}
    return json.loads(path.read_text(encoding="utf-8"))


def save_config(ds_root: Path, config: dict) -> None:
    (ds_root / "design-system.json").write_text(json.dumps(config, indent=2) + "\n", encoding="utf-8")


def mocks_root_for(ds_root: Path) -> Path:
    return ds_root.parent / "mocks"


# ---------------------------------------------------------------------------
# Page sources: front matter + "## Section" blocks
# ---------------------------------------------------------------------------

@dataclass
class Source:
    kind: str                    # foundations | components | patterns
    slug: str
    path: Path
    meta: dict
    sections: dict               # id -> raw markdown body
    order: list = field(default_factory=list)

    @property
    def title(self) -> str:
        return self.meta.get("title") or self.slug.replace("-", " ").capitalize()

    @property
    def summary(self) -> str:
        return self.meta.get("summary", "")

    @property
    def tier(self) -> str:
        return self.meta.get("tier", "standard")


def section_id(title: str) -> str:
    t = title.strip().lower()
    t = SECTION_ALIASES.get(t, t)
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-")


def parse_source(path: Path, kind: str) -> Source:
    text = path.read_text(encoding="utf-8").replace("\r\n", "\n")
    meta: dict = {}
    if text.startswith("---\n"):
        end = text.find("\n---", 4)
        if end == -1:
            raise ValueError(f"{path}: front matter is not closed with ---")
        for line in text[4:end].splitlines():
            if not line.strip() or line.lstrip().startswith("#"):
                continue
            key, _, value = line.partition(":")
            key, value = key.strip().lower(), value.strip()
            meta[key] = [v.strip() for v in value.split(",") if v.strip()] if key in LIST_KEYS else value
        text = text[end + 4:]
    sections: dict = {}
    order: list = []
    current = None
    fence = False
    for line in text.splitlines():
        if line.startswith("```"):
            fence = not fence
        if not fence and line.startswith("## "):
            current = section_id(line[3:])
            sections[current] = []
            order.append(current)
            continue
        if current is not None:
            sections[current].append(line)
    return Source(kind, path.stem, path, meta, {k: "\n".join(v).strip() for k, v in sections.items()}, order)


def load_sources(ds_root: Path) -> dict:
    src = ds_root / "src"
    result = {}
    for kind in ("foundations", "components", "patterns"):
        folder = src / kind
        items = [parse_source(p, kind) for p in sorted(folder.glob("*.md"))] if folder.exists() else []
        if kind == "foundations":
            items.sort(key=lambda s: FOUNDATIONS.index(s.slug) if s.slug in FOUNDATIONS else 99)
        else:
            items.sort(key=lambda s: (int(s.meta.get("order", "500")), s.title.lower()))
        result[kind] = items
    return result


def subsections(body: str) -> list:
    """Split a section body on '### Title' lines → [(title, body)]. Text before the first ### has title ''."""
    parts, title, buf, fence = [], "", [], False
    for line in body.splitlines():
        if line.startswith("```"):
            fence = not fence
        if not fence and line.startswith("### "):
            parts.append((title, "\n".join(buf).strip()))
            title, buf = line[4:].strip(), []
        else:
            buf.append(line)
    parts.append((title, "\n".join(buf).strip()))
    return [p for p in parts if p[0] or p[1]]


FENCE_RE = re.compile(r"```(\w*)\n(.*?)\n```", re.S)


def fences(body: str, lang: str | None = "html") -> list:
    return [code for l, code in FENCE_RE.findall(body) if lang is None or l == lang]


def strip_fences(body: str) -> str:
    return FENCE_RE.sub("", body).strip()


def na_reason(body: str) -> str | None:
    m = re.match(r"^\s*N/?A\s*:\s*(.+)$", body.strip(), re.I | re.S)
    return m.group(1).strip() if m else None


# ---------------------------------------------------------------------------
# Markdown (the subset page sources use)
# ---------------------------------------------------------------------------

ALLOWED_INLINE = ("kbd", "abbr", "em", "strong", "code", "small", "br", "sup", "sub", "mark")


def inline(text: str) -> str:
    codes: list = []

    def keep_code(m):
        codes.append(esc(m.group(1), quote=False))
        return f"\x00{len(codes) - 1}\x00"

    out = re.sub(r"`([^`]+)`", keep_code, text)  # code spans first, so tags inside them stay text
    out = esc(out, quote=False)
    for tag in ALLOWED_INLINE:
        out = re.sub(rf"&lt;(/?){tag}( [^&]*?)?&gt;", lambda m, t=tag: f"<{m.group(1)}{t}{html.unescape(m.group(2) or '')}>", out)
    out = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", out)
    out = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", out)
    out = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>', out)
    out = re.sub(r"\x00(\d+)\x00", lambda m: f"<code>{codes[int(m.group(1))]}</code>", out)
    return out


def markdown(text: str, live_html=None) -> str:
    """Render Markdown. ```html fences become live examples through live_html(code) when given."""
    lines = text.replace("\r\n", "\n").split("\n")
    out: list = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        if line.startswith("```"):
            lang = line[3:].strip()
            j = i + 1
            buf = []
            while j < len(lines) and not lines[j].startswith("```"):
                buf.append(lines[j])
                j += 1
            code = "\n".join(buf)
            if lang == "html" and live_html is not None:
                out.append(live_html(code))
            else:
                out.append(f"<pre><code>{esc(code)}</code></pre>")
            i = j + 1
            continue
        m = re.match(r"^(#{3,4})\s+(.*)$", line)
        if m:
            level = len(m.group(1))
            out.append(f"<h{level}>{inline(m.group(2))}</h{level}>")
            i += 1
            continue
        if line.lstrip().startswith("|"):
            rows = []
            while i < len(lines) and lines[i].lstrip().startswith("|"):
                rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
                i += 1
            rows = [r for r in rows if not all(re.fullmatch(r":?-{2,}:?", c or "--") for c in r)]
            if rows:
                head, body = rows[0], rows[1:]
                out.append(table(head, [[inline(c) for c in r] for r in body], head_html=[inline(h) for h in head]))
            continue
        if re.match(r"^\s*([-*]|\d+\.)\s+", line):
            ordered = bool(re.match(r"^\s*\d+\.", line))
            items = []
            while i < len(lines) and (re.match(r"^\s*([-*]|\d+\.)\s+", lines[i]) or (lines[i].startswith("  ") and items)):
                if re.match(r"^\s*([-*]|\d+\.)\s+", lines[i]):
                    items.append(re.sub(r"^\s*([-*]|\d+\.)\s+", "", lines[i]))
                else:
                    items[-1] += " " + lines[i].strip()
                i += 1
            tag = "ol" if ordered else "ul"
            out.append(f"<{tag}>" + "".join(f"<li>{inline(x)}</li>" for x in items) + f"</{tag}>")
            continue
        buf = []
        while i < len(lines) and lines[i].strip() and not lines[i].startswith("```") and not re.match(r"^(#{3,4})\s", lines[i]) \
                and not lines[i].lstrip().startswith("|") and not re.match(r"^\s*([-*]|\d+\.)\s+", lines[i]):
            buf.append(lines[i].strip())
            i += 1
        out.append(f"<p>{inline(' '.join(buf))}</p>")
    return "\n".join(out)


def table(headers, rows, caption=None, head_html=None) -> str:
    heads = head_html or [esc(h) for h in headers]
    return ('<div class="ds-table-wrap"><table class="ds-table">' + (f"<caption>{esc(caption)}</caption>" if caption else "")
            + "<thead><tr>" + "".join(f'<th scope="col">{h}</th>' for h in heads) + "</tr></thead><tbody>"
            + "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows) + "</tbody></table></div>")


# ---------------------------------------------------------------------------
# A tiny HTML fragment DOM
# ---------------------------------------------------------------------------

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}


class Node:
    def __init__(self, tag: str | None, attrs=None, text: str = "", raw: bool = False):
        self.tag = tag
        self.attrs: list = [list(a) for a in (attrs or [])]
        self.children: list = []
        self.parent: Node | None = None
        self.text = text
        self.raw = raw  # comments / doctype etc.

    # attributes -----------------------------------------------------------
    def get(self, name, default=None):
        for k, v in self.attrs:
            if k == name:
                return default if v is None else v
        return default

    def has(self, name) -> bool:
        return any(k == name for k, _ in self.attrs)

    def set(self, name, value=""):
        for a in self.attrs:
            if a[0] == name:
                a[1] = value
                return
        self.attrs.append([name, value])

    def remove(self, name):
        self.attrs = [a for a in self.attrs if a[0] != name]

    @property
    def classes(self) -> list:
        return (self.get("class") or "").split()

    def add_class(self, name):
        if name not in self.classes:
            self.set("class", " ".join(self.classes + [name]))

    # tree ------------------------------------------------------------------
    def elements(self):
        for child in self.children:
            if child.tag:
                yield child
                yield from child.elements()

    def first_element(self):
        return next((c for c in self.children if c.tag), None)

    def insert(self, index, node):
        node.parent = self
        self.children.insert(index, node)

    def append(self, node):
        node.parent = self
        self.children.append(node)

    def insert_after(self, node):
        siblings = self.parent.children
        node.parent = self.parent
        siblings.insert(siblings.index(self) + 1, node)

    def text_content(self) -> str:
        if self.tag is None:
            return "" if self.raw else self.text
        return "".join(c.text_content() for c in self.children)

    def select(self, selector: str) -> list:
        groups = [g.strip() for g in selector.split(",") if g.strip()]
        found = []
        for el in self.elements():
            if any(match_complex(el, g) for g in groups):
                found.append(el)
        return found

    def select_one(self, selector: str):
        for group in [g.strip() for g in selector.split(",") if g.strip()]:
            for el in self.elements():
                if match_complex(el, group):
                    return el
        return None

    # serialise -----------------------------------------------------------
    def html(self) -> str:
        if self.tag is None:
            return self.text if self.raw else esc(self.text, quote=False)
        attrs = "".join(f" {k}" if v is None or (v == "" and k in BOOLEAN_ATTRS) else f' {k}="{esc(v, quote=True)}"' for k, v in self.attrs)
        if self.tag == "#root":
            return "".join(c.html() for c in self.children)
        if self.tag in VOID:
            return f"<{self.tag}{attrs}>"
        inner = "".join(c.html() if c.tag or c.raw or self.tag not in ("script", "style") else c.text for c in self.children)
        return f"<{self.tag}{attrs}>{inner}</{self.tag}>"

    def inner_html(self) -> str:
        return "".join(c.html() for c in self.children)


BOOLEAN_ATTRS = {"disabled", "checked", "readonly", "required", "hidden", "open", "inert", "selected", "multiple",
                 "popover", "autofocus", "novalidate", "controls", "muted", "loop", "playsinline"}


class _Builder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("#root")
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.stack[-1].append(Node(tag, attrs))

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return

    def handle_data(self, data):
        self.stack[-1].append(Node(None, text=data))

    def handle_comment(self, data):
        self.stack[-1].append(Node(None, text=f"<!--{data}-->", raw=True))


def parse_fragment(markup: str) -> Node:
    builder = _Builder()
    builder.feed(markup)
    builder.close()
    return builder.root


SIMPLE_RE = re.compile(r"([a-zA-Z][\w-]*)|\.([\w-]+)|#([\w-]+)|\[([\w:-]+)(?:([~|^$*]?=)\"?([^\"\]]*)\"?)?\]|:not\(([^)]*)\)")


def match_compound(el: Node, compound: str) -> bool:
    if compound == "*":
        return True
    pos = 0
    for m in SIMPLE_RE.finditer(compound):
        if m.start() != pos:
            return False
        pos = m.end()
        tag, cls, ident, attr, op, val, neg = m.groups()
        if tag and el.tag != tag.lower():
            return False
        if cls and cls not in el.classes:
            return False
        if ident and el.get("id") != ident:
            return False
        if attr:
            if not el.has(attr):
                return False
            if op:
                actual = el.get(attr) or ""
                if op == "=" and actual != val:
                    return False
                if op == "~=" and val not in actual.split():
                    return False
                if op == "^=" and not actual.startswith(val):
                    return False
                if op == "*=" and val not in actual:
                    return False
        if neg and match_compound(el, neg.strip()):
            return False
    return pos == len(compound)


def match_complex(el: Node, selector: str) -> bool:
    parts = selector.split()
    if not parts or not match_compound(el, parts[-1]):
        return False
    node = el.parent
    for part in reversed(parts[:-1]):
        while node is not None and node.tag != "#root" and not match_compound(node, part):
            node = node.parent
        if node is None or node.tag == "#root":
            return False
        node = node.parent
    return True


# ---------------------------------------------------------------------------
# CSS blocks and tokens
# ---------------------------------------------------------------------------

BLOCK_RE = re.compile(r"/\* @component ([a-z0-9-]+)[^*]*\*/\n?(.*?)/\* @end \1 \*/\n?", re.S)
BASE_RE = re.compile(r"/\* @base[^*]*\*/\n?(.*?)/\* @end base \*/\n?", re.S)


def css_blocks(css: str) -> dict:
    return {m.group(1): m.group(2) for m in BLOCK_RE.finditer(css)}


def remove_css_block(css: str, slug: str) -> str:
    return re.sub(rf"/\* @component {re.escape(slug)}[^*]*\*/\n?.*?/\* @end {re.escape(slug)} \*/\n?\n?", "", css, flags=re.S)


def block_classes(block: str) -> set:
    block = re.sub(r'url\("[^"]*"\)', "", block)
    block = re.sub(r"\{[^{}]*\}", "{}", block)  # drop declarations, keep selectors
    return set(re.findall(r"\.([a-zA-Z][\w-]*)", block))


def var_refs(css: str) -> list:
    return list(dict.fromkeys(re.findall(r"var\((--[\w-]+)", css)))


def token_names(tokens_css: str) -> list:
    return list(dict.fromkeys(re.findall(r"(--[\w-]+)\s*:", tokens_css)))


def root_declarations(tokens_css: str) -> dict:
    """Declarations of the first top-level :root block (the light source of truth)."""
    m = re.search(r"^:root\s*\{(.*?)^\}", tokens_css, re.S | re.M)
    return dict(re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", m.group(1))) if m else {}


def dark_declarations(tokens_css: str) -> dict:
    m = re.search(r"/\* dark:start \*/\s*\[data-theme=\"dark\"\]\s*\{(.*?)\}\s*/\* dark:end \*/", tokens_css, re.S)
    if not m:
        return {}
    return dict(re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", m.group(1)))


def dark_block_body(tokens_css: str) -> str:
    m = re.search(r"/\* dark:start \*/\s*\[data-theme=\"dark\"\]\s*\{\n?(.*?)\}\s*/\* dark:end \*/", tokens_css, re.S)
    return m.group(1) if m else ""


TOPIC_PREFIXES = [
    (("--palette-", "--color-", "--grain-"), "color"),
    (("--font-", "--line-height-", "--letter-spacing-", "--text-", "--link-"), "typography"),
    (("--space-",), "spacing"),
    (("--layout-",), "layout"),
    (("--size-",), "layout"),
    (("--shadow-", "--z-"), "elevation"),
    (("--radius-", "--border-width-"), "shape"),
    (("--duration-", "--ease-", "--lift"), "motion"),
    (("--target-", "--focus-", "--control-height-"), "accessibility"),
]


def token_topic(name: str) -> str:
    for prefixes, topic in TOPIC_PREFIXES:
        if name.startswith(prefixes):
            return topic
    return "layout"


# ---------------------------------------------------------------------------
# Mock usage
# ---------------------------------------------------------------------------

CLASS_ATTR_RE = re.compile(r'class\s*=\s*"([^"]*)"')


def mock_files(mocks_root: Path) -> list:
    if not mocks_root.exists():
        return []
    files = []
    for kind in ("pages", "dialogs", "notifications"):
        folder = mocks_root / kind
        if folder.exists():
            files += [p for p in sorted(folder.rglob("*.html")) if ".cache" not in p.parts]
    return files


def mock_class_index(mocks_root: Path) -> dict:
    """{path: set(classes)} for every mock state file."""
    index = {}
    for path in mock_files(mocks_root):
        text = path.read_text(encoding="utf-8", errors="replace")
        classes = set()
        for value in CLASS_ATTR_RE.findall(text):
            classes.update(value.split())
        index[path] = classes
    return index


def selector_classes(source: Source) -> set:
    explicit = source.meta.get("selector-classes")
    if explicit:
        return {c.lstrip(".") for c in explicit}
    return set(re.findall(r"\.([a-zA-Z][\w-]*)", source.meta.get("selector", "")))


def usage(source: Source, index: dict) -> list:
    wanted = selector_classes(source)
    if not wanted:
        return []
    hits = [p for p, classes in index.items() if classes & wanted]
    hits.sort(key=lambda p: (p.name != "default.html", p.as_posix()))
    return hits
