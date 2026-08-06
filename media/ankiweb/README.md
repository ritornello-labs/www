# AnkiWeb media

This directory is the canonical public host for images, animated GIFs, and
videos referenced by Ritornello AnkiWeb listings.

- Release directories are immutable. A recapture gets a new dated directory.
  Removing accidentally published private-project media is the sole exception.
- Original real-Anki captures stay in their originating project repositories.
- Public derivatives are committed once here instead of duplicating GIF/MP4
  binaries across every project repository.
- `manifest.json` records source and output checksums for each generated set.
- AnkiWeb descriptions show multiple gallery images and link to short MP4s when
  motion materially explains the feature. GIFs are used selectively for a site
  thumbnail or an AnkiWeb-safe animated preview, never as a requirement for
  still-only projects.

Rebuild the 2026-07-30 derivatives from the repository root with:

```sh
python3 scripts/build_ankiweb_motion.py
```

The script requires Pillow and `ffmpeg`; the validated
`anki-addon-workbench` media Docker image supplies both.
