# AnkiWeb media

This directory is the canonical public host for images, animated GIFs, and
videos referenced by Ritornello AnkiWeb listings.

- Release directories are immutable. A recapture gets a new dated directory.
- Original real-Anki captures stay in their originating project repositories.
- Public derivatives are committed once here instead of duplicating GIF/MP4
  binaries across every project repository.
- `manifest.json` records source and output checksums for each generated set.
- AnkiWeb descriptions embed `preview.gif`, show multiple gallery images, and
  link to `demo.mp4` because animated GIF support is more predictable than
  inline HTML video support on AnkiWeb.

Rebuild the 2026-07-30 derivatives from the repository root with:

```sh
python3 scripts/build_ankiweb_motion.py
```

The script requires Pillow and `ffmpeg`; the validated
`anki-addon-workbench` media Docker image supplies both.
