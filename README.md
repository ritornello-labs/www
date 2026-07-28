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
