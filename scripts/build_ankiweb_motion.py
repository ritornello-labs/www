#!/usr/bin/env python3
"""Build compact AnkiWeb galleries, GIFs, and MP4s from real Anki captures."""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import subprocess
import tempfile
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
RELEASE = ROOT / "media" / "ankiweb" / "2026-07-30"
VIDEO_SIZE = (960, 540)
GIF_SIZE = (640, 360)
VIDEO_FPS = 12
GIF_FPS = 5


@dataclass(frozen=True)
class Shot:
    filename: str
    caption: str


@dataclass(frozen=True)
class Project:
    title: str
    shots: tuple[Shot, ...]


PROJECTS: dict[str, Project] = {
    "geo-trainer": Project(
        "GeoTrainer",
        (
            Shot("01-which-borderless.png", "Identify countries from borderless maps"),
            Shot("02-deserts.png", "Learn deserts and other physical geography"),
            Shot("03-draw-overlay.png", "Draw the answer directly on the map"),
            Shot("04-river-trace.png", "Trace rivers and linear features"),
            Shot("05-ranges.png", "Practice mountain ranges and regions"),
            Shot("06-which-country-reviewer.png", "Review inside real Anki"),
            Shot("07-place-reviewer.png", "Place countries from memory"),
            Shot("08-trace-reviewer.png", "Compare your trace with the answer"),
        ),
    ),
    "hanzi-handwriting": Project(
        "HSK 3.0 Hanzi Handwriting",
        (
            Shot("handwriting-stroke-add.png", "Write, reveal, and rewind individual strokes"),
        ),
    ),
    "sight-singing": Project(
        "Sight Singing",
        (
            Shot("sing-front.png", "Read the prompt before singing"),
            Shot("sing-back.png", "Reveal notation and compare"),
        ),
    ),
    "dictation": Project(
        "Music Dictation",
        (
            Shot("dictation-front.png", "Transcribe what you hear"),
            Shot("dictation-back.png", "Grade against the engraved answer"),
        ),
    ),
    "chinese-regions": Project(
        "Regions of China",
        (
            Shot("readme-preview.png", "Recognize provinces from locator maps"),
            Shot("china-regions-map-to-name-pair.png", "Study both directions"),
        ),
    ),
    "us-regions": Project(
        "U.S. Regions and Divisions",
        (
            Shot("readme-preview.png", "Move from map recall to member states"),
        ),
    ),
    "taiwan-divisions": Project(
        "Taiwan Divisions",
        (
            Shot("tainan-front-back.png", "Recall a division, then reveal its answer"),
        ),
    ),
    "web-embed-tools": Project(
        "Web Embed Tools",
        (
            Shot("editor-web-embed-toolbar.png", "Insert and resize embeds in Anki's editor"),
        ),
    ),
    "fractional-scheduler": Project(
        "Fractional Scheduler",
        (
            Shot("config-window.png", "Tune per-deck scheduling fractions"),
        ),
    ),
    "study-triage": Project(
        "Study Triage",
        (
            Shot("study-triage-workbench.png", "Triage a deck from Anki's deck browser"),
            Shot("menu-open.png", "Choose a safe, explicit triage action"),
        ),
    ),
    "chat-with-your-cards": Project(
        "Chat With Your Cards",
        (
            Shot("chat-with-your-cards.png", "Ask questions beside your collection"),
            Shot("chat-with-your-cards-explain.png", "Explain the current reviewer card"),
            Shot("chat-with-your-cards-proposal.png", "Review proposed changes before applying"),
        ),
    ),
}


def _font(size: int, *, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    family = "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    candidates = (
        Path("/usr/share/fonts/truetype/dejavu") / family,
        Path("/System/Library/Fonts/Supplemental/Arial.ttf"),
    )
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


def _visible_bbox(image: Image.Image) -> tuple[int, int, int, int]:
    rgb = image.convert("RGB")
    background = Image.new("RGB", rgb.size, rgb.getpixel((rgb.width - 1, rgb.height - 1)))
    difference = ImageOps.autocontrast(ImageOps.grayscale(ImageChops.difference(rgb, background)))
    bbox = difference.getbbox()
    if bbox is None:
        return (0, 0, image.width, image.height)
    left, top, right, bottom = bbox
    padding = 10
    return (
        max(0, left - padding),
        max(0, top - padding),
        min(image.width, right + padding),
        min(image.height, bottom + padding),
    )


def _frame(
    source: Image.Image,
    *,
    size: tuple[int, int],
    progress: float,
    title: str,
    caption: str,
) -> Image.Image:
    source = source.convert("RGB").crop(_visible_bbox(source))
    width, height = size
    scale = max(width / source.width, height / source.height)
    zoom = 1.0 + 0.025 * progress
    resized = source.resize(
        (
            max(width, round(source.width * scale * zoom)),
            max(height, round(source.height * scale * zoom)),
        ),
        Image.Resampling.LANCZOS,
    )
    max_x = max(0, resized.width - width)
    max_y = max(0, resized.height - height)
    left = round(max_x * (0.12 + 0.76 * progress))
    top = round(max_y * progress)
    canvas = resized.crop((left, top, left + width, top + height))

    draw = ImageDraw.Draw(canvas, "RGBA")
    title_font = _font(max(18, round(width / 38)), bold=True)
    caption_font = _font(max(14, round(width / 52)))
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    caption_bbox = draw.textbbox((0, 0), caption, font=caption_font)
    overlay_height = max(title_bbox[3] - title_bbox[1], caption_bbox[3] - caption_bbox[1]) + 24
    draw.rounded_rectangle(
        (18, height - overlay_height - 18, width - 18, height - 18),
        radius=12,
        fill=(17, 24, 39, 210),
    )
    draw.text((34, height - overlay_height - 8), title, font=title_font, fill=(255, 255, 255, 255))
    caption_x = min(
        width - (caption_bbox[2] - caption_bbox[0]) - 34,
        max(34 + title_bbox[2] - title_bbox[0] + 22, round(width * 0.36)),
    )
    draw.text(
        (caption_x, height - overlay_height - 5),
        caption,
        font=caption_font,
        fill=(226, 232, 240, 255),
    )
    return canvas


def _timeline(project: Project, directory: Path, *, size: tuple[int, int], fps: int) -> list[Image.Image]:
    hold_frames = round(1.35 * fps)
    fade_frames = max(1, round(0.3 * fps))
    sections: list[list[Image.Image]] = []
    for shot in project.shots:
        source = Image.open(directory / shot.filename)
        sections.append(
            [
                _frame(
                    source,
                    size=size,
                    progress=index / max(1, hold_frames - 1),
                    title=project.title,
                    caption=shot.caption,
                )
                for index in range(hold_frames)
            ]
        )

    frames: list[Image.Image] = []
    for section_index, section in enumerate(sections):
        if section_index:
            previous = frames[-1]
            for fade_index in range(1, fade_frames + 1):
                frames.append(
                    Image.blend(previous, section[0], fade_index / (fade_frames + 1))
                )
        frames.extend(section)
    return frames


def _write_gif(frames: list[Image.Image], output: Path) -> None:
    palette = [
        frame.quantize(
            colors=128,
            method=Image.Quantize.MEDIANCUT,
            dither=Image.Dither.FLOYDSTEINBERG,
        )
        for frame in frames
    ]
    palette[0].save(
        output,
        save_all=True,
        append_images=palette[1:],
        duration=round(1000 / GIF_FPS),
        loop=0,
        optimize=True,
        disposal=2,
    )


def _write_mp4(frames: list[Image.Image], output: Path, ffmpeg: str) -> None:
    with tempfile.TemporaryDirectory(prefix="ankiweb-motion-") as temp:
        temp_dir = Path(temp)
        for index, frame in enumerate(frames):
            frame.save(temp_dir / f"{index:05d}.png", optimize=True)
        subprocess.run(
            [
                ffmpeg,
                "-y",
                "-framerate",
                str(VIDEO_FPS),
                "-i",
                str(temp_dir / "%05d.png"),
                "-an",
                "-c:v",
                "libx264",
                "-preset",
                "slow",
                "-crf",
                "24",
                "-pix_fmt",
                "yuv420p",
                "-movflags",
                "+faststart",
                str(output),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def build(slugs: list[str], ffmpeg: str) -> None:
    manifest: dict[str, object] = {
        "release": "2026-07-30",
        "policy": {
            "canonical_host": "https://ritornello.dev",
            "sources": "Real Anki/workbench captures retained in their originating project repositories.",
            "derivatives": "Immutable gallery, GIF, and MP4 derivatives hosted from this directory.",
        },
        "projects": {},
    }
    for slug in slugs:
        project = PROJECTS[slug]
        directory = RELEASE / slug
        missing = [shot.filename for shot in project.shots if not (directory / shot.filename).exists()]
        if missing:
            raise FileNotFoundError(f"{slug}: missing {', '.join(missing)}")

        video_frames = _timeline(project, directory, size=VIDEO_SIZE, fps=VIDEO_FPS)
        gif_frames = _timeline(project, directory, size=GIF_SIZE, fps=GIF_FPS)
        gallery_indexes = (0, len(video_frames) - 1)
        outputs = {
            "gallery-01.png": video_frames[gallery_indexes[0]],
            "gallery-02.png": video_frames[gallery_indexes[1]],
        }
        for filename, image in outputs.items():
            image.save(directory / filename, optimize=True)
        _write_gif(gif_frames, directory / "preview.gif")
        _write_mp4(video_frames, directory / "demo.mp4", ffmpeg)

        files = [directory / name for name in (*outputs, "preview.gif", "demo.mp4")]
        manifest["projects"][slug] = {
            "title": project.title,
            "sources": [
                {
                    "file": shot.filename,
                    "caption": shot.caption,
                    "sha256": _sha256(directory / shot.filename),
                }
                for shot in project.shots
            ],
            "outputs": [
                {
                    "file": path.name,
                    "bytes": path.stat().st_size,
                    "sha256": _sha256(path),
                }
                for path in files
            ],
        }

    (RELEASE / "manifest.json").write_text(
        json.dumps(manifest, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("slugs", nargs="*", choices=tuple(PROJECTS))
    parser.add_argument("--ffmpeg", default=shutil.which("ffmpeg"))
    args = parser.parse_args()
    if not args.ffmpeg:
        parser.error("ffmpeg is required (pass --ffmpeg or put it on PATH)")
    build(args.slugs or list(PROJECTS), args.ffmpeg)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
