# Vintech

Infinity ® alternate-soundtrack double-feature cinema. Watch a muted film while a visible YouTube music player plays a repeating album sequence. No uploads, AI subscription, or backend is needed for this edition.

## Current double feature

1. **Sherlock Jr. (1924)** × **Steve Winwood — Back in the High Life**.
2. **Dick Tracy, Detective (1945)** × **ZZ Top — Eliminator**.

Film playback stays on the page using Internet Archive media. Shared start/pause/restart controls are supported, with separate native controls and music recovery options. Switching features stops the previous pair. Ads, buffering, regional restrictions, and source removal can affect playback and timing; frame-exact synchronization is not promised. The ZZ Top sequence uses 11 individual uploads, including remasters.

The owner reported enjoying Sherlock Jr./Winwood through 8:33. This is a partial viewing report, not a full verification of both features. This export preserves the existing production pairing code without redesigning it.

## GitHub Pages

In this repository open **Settings → Pages → Deploy from a branch → main → / (root) → Save**. The committed index.html, app.js, styles.css and .nojekyll require no build workflow. Intended URL after Pages is enabled: https://www-infinity4.github.io/Vintech/ . A repository commit alone does not confirm Pages deployment.

## Editing

Edit app/page.tsx for pairings and app/globals.css for styling. Run `npm install` then `npm run build`; commit both source changes and regenerated app.js/styles.css. Serve over HTTP(S), not a file:// URL, for embedded players.

## Saved next-session work

- [Plan: theaters, curation, StarQuest and StarCoin](docs/PLAN.md)
- [25 silent films from the 1920s](docs/SILENT_FILMS.md)
- [30 album candidates: 15 from your suggestions, 15 additional](docs/MUSIC.md)

These are planning documents, not new working sites or a wallet implementation. Album and film candidates are not blanket claims of free streaming availability or cleared reuse rights. Exact editions, source permissions and embedding availability must be checked before publishing a new pairing. No film or commercial music files are redistributed in this repository.

Source snapshot: Vintech production version 2, commit 419f5e269703c245aed0f5636f3ad2eac418a09f. Existing third-party dependency notices are retained; this repository does not grant rights to third-party media.

## Sharing and unified wallet
A shared wallet bar offers native sharing, copy-link fallback, and an X post composer. Confirmed sharing earns 0.1 StarCoin once per site per wallet. Opening a composer or copying a link alone earns nothing; manual confirmation is self-reported. Credits use the same browser-local wallet as StarQuest’s unified-wallet integration, not its separate cloud ledger. Pending claims retry on return. Social preview metadata is in index.html and the card is assets/share-preview-v1.png.
