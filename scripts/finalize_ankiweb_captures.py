#!/usr/bin/env python3
"""Validate authentic Anki captures and write an immutable release manifest."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def finalize(release: str) -> Path:
    release_dir = ROOT / "media" / "ankiweb" / release
    if not release_dir.is_dir():
        raise FileNotFoundError(f"release directory does not exist: {release_dir}")

    projects: dict[str, object] = {}
    for project_dir in sorted(path for path in release_dir.iterdir() if path.is_dir()):
        required = (project_dir / "demo.mp4", project_dir / "preview.gif")
        missing = [path.name for path in required if not path.is_file()]
        galleries = sorted(project_dir.glob("gallery-*.png"))
        if len(galleries) < 2:
            missing.append("at least two gallery-*.png files")
        if missing:
            raise FileNotFoundError(f"{project_dir.name}: missing {', '.join(missing)}")

        files = sorted(
            path
            for path in project_dir.iterdir()
            if path.is_file() and path.suffix.lower() in {".gif", ".mp4", ".png"}
        )
        projects[project_dir.name] = {
            "files": [
                {
                    "file": path.name,
                    "bytes": path.stat().st_size,
                    "sha256": _sha256(path),
                }
                for path in files
            ],
            "gallery_count": len(galleries),
            "motion": ["preview.gif", "demo.mp4"],
        }

    manifest = {
        "release": release,
        "policy": {
            "canonical_host": "https://ritornello.dev",
            "capture_standard": (
                "Motion is recorded from actual Anki/workbench UI interaction; "
                "gallery images are distinct real states from the same workflows."
            ),
            "repository_policy": (
                "Hosted derivatives live here; project repositories link to them "
                "instead of committing duplicate videos."
            ),
        },
        "projects": projects,
    }
    output = release_dir / "manifest.json"
    output.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return output


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--release", required=True, help="immutable release directory name")
    args = parser.parse_args()
    print(finalize(args.release))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
