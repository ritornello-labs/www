# ritornello.dev

The Ritornello organization homepage — a single static page served by GitHub
Pages at <https://ritornello.dev>.

## Stack

No build step. Plain HTML + CSS, self-hosted fonts (Fraunces and IBM Plex,
SIL OFL latin woff2 subsets in `assets/fonts/`), and outlined brand SVGs
copied from the private `ritornello-brand` repo — that repo is the source of
truth for the identity (`brand.md` there carries the tokens and standing
rules; regenerate marks there, then re-copy into `assets/`).

## Preview

```bash
python3 -m http.server 8493
```

## Deploy

Push to `main`; GitHub Pages serves the repo root. `CNAME` pins the custom
domain. DNS lives at Porkbun: apex `A` records to GitHub Pages plus a `www`
CNAME to `ritornello-labs.github.io`.

## Social card

`assets/og-card.png` (1200×630) renders from `tools/og.html`:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --screenshot=assets/og-card.png --window-size=1200,630 --hide-scrollbars "file://$PWD/tools/og.html"
```

## Screenshots

`assets/shots/*.webp` are downscaled copies of real-Anki renders from the
project repos (`docs/images/`, `release/screenshots/`, or
`anki-shared-deck-assets`) — never HTML reconstructions, per workspace
policy.

## AnkiWeb media

`media/ankiweb/<release>/` is the canonical public host for AnkiWeb listing
images, GIF fallbacks, and MP4 demos. Release directories are immutable.
Project listing files and READMEs link here instead of committing duplicate
videos to every repository.

Motion must be recorded from an actual disposable Anki session. Run
`scripts/finalize_ankiweb_captures.py --release <date>` after copying final
derivatives to check each project's still set and refresh its checksummed
manifest. `scripts/render_ankiweb_review.py` builds the ignored local review
page from the current listing sources before an upload session. The
`2026-09-23-v5` release adds template-by-template card clips and real
interaction captures; public listing text links to these hosted files.
`2026-09-23-v6` supersedes the U.S. and Brazilian States template galleries:
the reference cards now wait for the lazy Wikipedia pane to load before their
answer stills are taken. The previous release remains unchanged.

Gallery buttons show a play indicator when their first item is a video, and a
small count describing the available workflows, games, or templates. The modal
uses the same hosted media as the listing sources, with stills alongside clips
for visitors who cannot play video.

## Cache busting

`index.html` links `styles.css?v=N`. Pages serves assets with
`max-age=600`, so a stylesheet change can lag the HTML by up to 10 minutes
in browsers that cached the old file — bump `N` whenever `styles.css`
changes so the pair updates atomically.
