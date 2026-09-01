#!/usr/bin/env python3
"""Generate README.md, README.zh.md, and README.ja.md from data/catalog.json."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CAT = json.loads((ROOT / "data" / "catalog.json").read_text(encoding="utf-8"))

LANGS = ("en", "zh", "ja")
README_NAME = {
    "en": "README.md",
    "zh": "README.zh.md",
    "ja": "README.ja.md",
}
LANG_LABEL = {
    "en": "EN",
    "zh": "中文",
    "ja": "日本語",
}


def require_i18n(obj: dict, path: str) -> None:
    missing = [lang for lang in LANGS if not str(obj.get(lang, "")).strip()]
    if missing:
        raise SystemExit(f"catalog missing {missing} at {path}")


def anchor(text: str) -> str:
    out = []
    for ch in text.lower():
        out.append(ch if ch.isalnum() else "-")
    slug = "".join(out)
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug.strip("-")


def switcher(lang: str) -> str:
    parts = []
    for code in LANGS:
        label = f"<strong>{LANG_LABEL[code]}</strong>"
        parts.append(label if code == lang else f'<a href="./{README_NAME[code]}">{label}</a>')
    return " · ".join(parts)


def render(lang: str) -> str:
    require_i18n(CAT["title"], "title")
    require_i18n(CAT["intro"], "intro")
    require_i18n(CAT["contributing"], "contributing")
    require_i18n(CAT["license"], "license")
    for sec in CAT["sections"]:
        require_i18n(sec["title"], f"sections.{sec['id']}.title")
        for item in sec["items"]:
            require_i18n(item["blurb"], f"sections.{sec['id']}.items.{item['title']}")

    lines = [
        f"# {CAT['title'][lang]}",
        "",
        f'<p align="center">{switcher(lang)}</p>',
        "",
        f'> {CAT["intro"][lang]}',
        "",
        "## Contents",
        "",
    ]

    for sec in CAT["sections"]:
        lines.append(f'- [{sec["title"][lang]}](#{anchor(sec["title"][lang])})')

    lines.append("")

    for sec in CAT["sections"]:
        lines.append(f'## {sec["title"][lang]}')
        lines.append("")
        for item in sec["items"]:
            lines.append(f'- [{item["title"]}]({item["url"]}) - {item["blurb"][lang]}')
        lines.append("")

    lines.extend(
        [
            "## Contributing",
            "",
            CAT["contributing"][lang],
            "",
            "## License",
            "",
            CAT["license"][lang],
            "",
        ]
    )

    return "\n".join(lines)


def main() -> None:
    for lang, name in README_NAME.items():
        (ROOT / name).write_text(render(lang), encoding="utf-8")


if __name__ == "__main__":
    main()

