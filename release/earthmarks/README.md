# Earthmarks — Ritornello entry proposal

Status: design preview only, awaiting Elvis's review. Do not deploy this proposal
or prepare its AnkiWeb adaptation until the Ritornello version is accepted.

The entry leads with a genuine Anki attempt and reveal, then explains the
arbitrary 704-city starting set and coordinate-only map extension. It uses the existing gallery
interaction and a larger full-width presentation inside Programme I: Geography.

- `entry.html`: insert before GeoTrainer; update the group count from 13 to 14.
- `entry.css`: append to the site stylesheet, preserving the Score identity.
- `gallery-entry.js`: add inside `window.ritornelloGalleries`.
- Proposed media: Earthmarks repo `docs/images/2026-11-09-v2/{locate.gif,settings.gif,front.png,back.png,settings-borders-on.png}`.
  Copy only approved media to the named immutable website directory at rollout.
- Preserve the reduced-motion still and meaningful alt text.
- GitHub is the only external product link until real release/AnkiWeb links exist.
- The AnkiDroid storage setup requirement is in the linked repository instructions.

No AnkiWeb listing or public website update is submitted by preparing these files.

November 9 refinement: hero includes a short globe rotation/zoom tour before
placing the guess and revealing. The second demo opens settings, enables borders,
then closes the menu and holds the visible border result for several seconds.
The settings link opens that demo directly. Both videos remain native Anki GIFs.
