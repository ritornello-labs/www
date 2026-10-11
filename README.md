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

`media/ankiweb/<release>/` hosts the approved animated GIFs used in AnkiWeb
listings, repository READMEs and the website galleries. Release directories are
immutable. Existing historical assets remain available, but new public copy uses
GIFs without links to video files or video services.

Capture from actual Anki with `anki-addon-workbench`, in a disposable profile
seeded by the current deck artifact or a read-only Publisher export. Show a
credible study or add-on workflow. For recall drills, allow two seconds for the
question and three seconds for the answer. Similar static templates can share a
GIF; distinct games or workflows deserve separate examples. Every deck listing
batch needs explicit approval before upload.

`gallery-data.js` defines the gallery items. The corresponding thumbnail button
in `index.html` must use `data-gallery` with the same key. Each listed product
links its current AnkiWeb listing and canonical tagged GitHub release. Standalone
collection decks without a public product repository are archived in this repo's
releases. The archive must match the verified AnkiWeb-delivered artifact exactly.

The website lists GeoTrainer once, as the full edition. Component deck listings
are linked from AnkiWeb, rather than repeated in the website catalog.

## Cache busting

`index.html` links `styles.css?v=N`. Pages serves assets with
`max-age=600`, so a stylesheet change can lag the HTML by up to 10 minutes
in browsers that cached the old file — bump `N` whenever `styles.css`
changes so the pair updates atomically.

Support continued development: [ritornello.dev/support](https://ritornello.dev/support).

The stable contribution URL is `https://ritornello.dev/support`. Only `support/index.html` holds the payment-provider link; listings, READMEs and funding files link to the stable page.

## Project links

Every listing has a stable fragment ID. Click its project title to update the URL
to that listing, or copy the title link directly. For example,
[Chat With Your Cards](https://ritornello.dev/#chat-with-your-cards) links
directly to its listing. Fragment navigation opens any containing section
and deck programme, including when following browser history.

Publication requires the shared local hooks and the quiet required CI check.
The workflow and checker are pinned together to an immutable tool commit.
Install hooks from that reviewed checkout with
`PYTHONPATH=/path/to/anki-addon-release/src python3 -m anki_addon_release.publication_hooks`.
Before pushing, the hooks inspect staged objects and all outgoing commits against
the actual destination. Existing media bytes are retained; new listing media still
require the established native-Anki capture and visual approval process.
