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
