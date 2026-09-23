#!/usr/bin/env python3
"""Render local media and listing review pages for an AnkiWeb upload session."""

from __future__ import annotations

import html
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
WORKSPACE = ROOT.parent
OUTPUT = ROOT / ".tmp-ankiweb-review" / "index.html"
RELEASE = "2026-09-23-v5"

LISTINGS = (
    (
        "GeoTrainer", "geo-trainer", WORKSPACE / "anki-geo-trainer/release/ankiweb.md",
    ),
    (
        "Hanzi Handwriting",
        "hanzi-handwriting",
        WORKSPACE / "anki-deck-styling/release/hanzi-handwriting.md",
    ),
    (
        "Sight Singing", "sight-singing", WORKSPACE / "sight-singing-deck/release/ankiweb.md",
    ),
    (
        "Music Dictation", "dictation", WORKSPACE / "sight-singing-deck/release/dictation-ankiweb.md",
    ),
    (
        "Regions of China", "chinese-regions", WORKSPACE / "chinese-regions/release/ankiweb.md",
    ),
    (
        "U.S. Regions", "us-regions", WORKSPACE / "us-regions/release/ankiweb.md",
    ),
    (
        "Taiwan Divisions",
        "taiwan-divisions",
        WORKSPACE / "anki-deck-styling/release/taiwan-divisions.md",
    ),
    (
        "Web Embed Tools",
        "web-embed-tools",
        WORKSPACE / "anki-web-embed-tools/release/ankiweb.md",
    ),
    (
        "Fractional Scheduler",
        "fractional-scheduler",
        WORKSPACE / "anki-fractional-scheduler/release/ankiweb.md",
    ),
    (
        "Study Triage", "study-triage", WORKSPACE / "study-triage/release/ankiweb-description.md",
    ),
    (
        "Chinese Dynasties", "chinese-dynasties", WORKSPACE / "chinese-dynasties/release/ankiweb.md",
    ),
    (
        "Chat With Your Cards — v0.1.0 public preview",
        "chat-with-your-cards",
        WORKSPACE / "chat-with-your-cards/release/ankiweb.md",
    ),
    (
        "Brazilian DDD Codes", "brazil-ddd-codes", WORKSPACE / "brazil-ddd-codes/release/ankiweb.md",
    ),
    (
        "U.S. States", "us-states", WORKSPACE / "anki-deck-styling/release/us-states.md",
    ),
    (
        "Brazilian States", "brazilian-states",
        WORKSPACE / "anki-deck-styling/release/brazilian-states.md",
    ),
)

IMAGE_RE = re.compile(r"!\[(?P<alt>[^\]]*)\]\((?P<url>[^)]+)\)")
LINK_RE = re.compile(r"(?<!!)\[(?P<label>[^\]]+)\]\((?P<url>[^)]+)\)")
MEDIA_URL_RE = re.compile(r"https://ritornello\.dev/media/ankiweb/[^\s)\"<>]+")


def _inline(text: str) -> str:
    escaped = html.escape(text)
    escaped = IMAGE_RE.sub(
        lambda match: (
            f'<img alt="{html.escape(match.group("alt"))}" '
            f'src="{_local_url(match.group("url"))}">'
        ),
        escaped,
    )
    escaped = LINK_RE.sub(
        lambda match: (
            f'<a href="{html.escape(match.group("url"))}">{match.group("label")}</a>'
        ),
        escaped,
    )
    escaped = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(r"`(.+?)`", r"<code>\1</code>", escaped)
    return escaped


def _local_url(url: str) -> str:
    prefix = "https://ritornello.dev/media/ankiweb/"
    if url.startswith(prefix):
        return "/media/ankiweb/" + url.removeprefix("https://ritornello.dev/media/ankiweb/")
    return html.escape(url)


def _body(markdown: str) -> str:
    if markdown.startswith("---\n"):
        _, _, markdown = markdown.partition("\n---\n")

    blocks: list[str] = []
    paragraph: list[str] = []
    in_list = False

    def flush_paragraph() -> None:
        if paragraph:
            blocks.append(f"<p>{_inline(' '.join(paragraph))}</p>")
            paragraph.clear()

    for raw_line in markdown.splitlines():
        line = raw_line.strip()
        if not line:
            flush_paragraph()
            if in_list:
                blocks.append("</ul>")
                in_list = False
            continue
        if line.startswith("<img "):
            flush_paragraph()
            blocks.append(line.replace("https://ritornello.dev/", "/"))
            continue
        if line.startswith("#"):
            flush_paragraph()
            if in_list:
                blocks.append("</ul>")
                in_list = False
            level = min(4, len(line) - len(line.lstrip("#")))
            blocks.append(f"<h{level}>{_inline(line[level:].strip())}</h{level}>")
            continue
        if line.startswith("- "):
            flush_paragraph()
            if not in_list:
                blocks.append("<ul>")
                in_list = True
            blocks.append(f"<li>{_inline(line[2:])}</li>")
            continue
        paragraph.append(line)

    flush_paragraph()
    if in_list:
        blocks.append("</ul>")
    return "\n".join(blocks)


def render() -> Path:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    cards = []
    listings = []
    for title, slug, listing_path in LISTINGS:
        markdown = listing_path.read_text(encoding="utf-8")
        media_urls = list(dict.fromkeys(MEDIA_URL_RE.findall(markdown)))
        images = [_local_url(url) for url in media_urls if url.lower().endswith((".png", ".gif", ".webp"))]
        videos = [_local_url(url) for url in media_urls if url.lower().endswith(".mp4")]
        image_tags = "".join(f'<img src="{url}" alt="">' for url in images)
        poster = next((url for url in images if url.endswith(".png")), images[0] if images else "")
        video_tags = "".join(
            f'<video controls muted preload="metadata" poster="{poster}"><source src="{url}" type="video/mp4"></video>'
            for url in videos
        )
        media_links = " · ".join(f'<a href="{url}">{html.escape(Path(url).name)}</a>' for url in videos)
        cards.append(
            f"""
            <article class="media-card">
              <h2>{html.escape(title)}</h2>
              {video_tags}
              <div class="triptych">{image_tags}</div>
              <p>{media_links}{' · ' if media_links else ''}<code>{html.escape(str(listing_path.relative_to(WORKSPACE)))}</code></p>
            </article>
            """
        )
        listings.append(
            f"""
            <article class="listing" id="{slug}">
              <div class="listing-label">{html.escape(title)}</div>
              {_body(markdown)}
            </article>
            """
        )

    OUTPUT.write_text(
        f"""<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AnkiWeb media and listing review — {RELEASE}</title>
<style>
:root {{ color-scheme: light; font: 15px/1.5 system-ui, sans-serif; color: #172033; }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; background: #eef2f7; }}
header {{ padding: 32px 4vw; color: white; background: #172033; }}
header h1 {{ margin: 0 0 8px; }}
header p {{ margin: 0; color: #cbd5e1; }}
.media-grid {{ display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px;
  padding: 24px 3vw 42px; }}
.media-card {{ background: white; border: 1px solid #d6deea; border-radius: 14px; padding: 14px;
  box-shadow: 0 3px 12px #17203312; }}
.media-card h2 {{ margin: 0 0 10px; font-size: 18px; }}
.media-card p {{ margin: 10px 0 0; font-size: 12px; }}
.media-card video {{ display: block; width: 100%; aspect-ratio: 16/10; object-fit: contain; border-radius: 9px; background: #111; }}
.hero {{ width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 9px; background: #111; }}
.triptych {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 6px; margin-top: 6px; }}
.triptych img {{ width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 5px; background: #111; }}
.section-title {{ padding: 28px 4vw 10px; margin: 0; }}
.listings {{ display: grid; gap: 26px; padding: 12px 4vw 80px; }}
.listing {{ max-width: 960px; width: 100%; margin: auto; padding: 36px 42px; background: white;
  border: 1px solid #d6deea; border-radius: 12px; box-shadow: 0 3px 12px #17203312; }}
.listing-label {{ margin: -36px -42px 28px; padding: 12px 18px; color: white; background: #334155;
  border-radius: 11px 11px 0 0; font-weight: 700; }}
.listing img {{ display: block; max-width: 100%; max-height: 680px; margin: 22px auto; object-fit: contain; }}
.listing h1, .listing h2, .listing h3 {{ line-height: 1.2; }}
.listing a {{ color: #1d4ed8; }}
code {{ overflow-wrap: anywhere; }}
@media (max-width: 950px) {{ .media-grid {{ grid-template-columns: 1fr; }} }}
</style>
<header>
  <h1>AnkiWeb media and listing review</h1>
  <p>{RELEASE} · authentic disposable-Anki recordings · public listings first, development previews last</p>
</header>
<main>
  <section class="media-grid">{''.join(cards)}</section>
  <h1 class="section-title">Complete listing previews</h1>
  <section class="listings">{''.join(listings)}</section>
</main>
</html>
""",
        encoding="utf-8",
    )
    return OUTPUT


if __name__ == "__main__":
    print(render())
