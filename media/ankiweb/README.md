# AnkiWeb media

This directory hosts the approved images and animated GIFs used by Ritornello
AnkiWeb listings, repository READMEs and website galleries.

- Release directories and existing public asset URLs are immutable. A recapture
  gets a new dated directory.
- New listing and README demonstrations use GIFs, without links to MP4 files or
  video services. Historical files remain available for existing references.
- Capture actual Anki with `anki-addon-workbench` in a disposable profile seeded
  by the current shareable artifact. Use a credible study or add-on workflow;
  never substitute an HTML/CSS reconstruction for a card screenshot.
- For recall drills, hold the question for two seconds and the answer for three.
  Similar static templates may share a GIF; distinct games or workflows benefit
  from separate examples. Show every template when that helps explain the deck.
- Show each complete proposed deck listing and its images to Elvis, one batch at
  a time, and wait for explicit approval before upload.
- Host approved derivatives once here and reuse their URLs across public copy.
  Bind source/output hashes in the review records. Keep collection data, raw
  responses and private verification records outside every Git checkout.
- Update both `gallery-data.js` and the matching `data-gallery` thumbnail control
  in `index.html`. Verify the deployed media bytes and the live gallery.

Historical derivative rebuild helpers remain in `scripts/`; they do not override
the current GIF and approval policy. The media tooling uses Pillow and `ffmpeg`
from the disposable workbench media image.
