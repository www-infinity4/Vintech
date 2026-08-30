# Next-session plan — Infinity ® cinema

## Scope today

Preserve Vintech's working double feature and deliver GitHub Pages-ready files. Save the film and album shortlists. Do not build new apps, create extra repositories, implement rewards or change StarQuest yet.

## Co-curation

The owner supplies songs/albums and judges the experience; AI proposes pairings and explains its choices. Preserve Sherlock Jr. × Back in the High Life as a favorite based on the owner's first 8:33. Keep Dick Tracy × Eliminator as the second current feature, without claiming a completed viewing test. Dick Tracy is from 1945 and is not part of the 1920s catalog.

The 30 albums in MUSIC.md are a candidate pool, not 30 certified playable embeds. The first reserve is Dazed and Confused. Final pairings remain open for the owner's contribution.

## Build order for a later session

| Stage | Deliverable | Acceptance |
|---|---|---|
| 1 | New two-film theater with its own design | Both pairings play in-page; switching stops old media |
| 2 | Drive-in with three or four films | Program order, skip, resume, accessible mobile controls |
| 3 | Eight-film theater | Browse all eight; load only selected players, not eight simultaneous streams |
| 4 | Read-only StarQuest diagnosis | Reproduce failure and document auth, API, storage and deployment causes before choosing fixes |
| 5 | Shared StarCoin prototype | Approved identity, ledger and reward rules work across test apps |

New repository names and designs will be chosen with the owner. No new repositories were authorized for creation today. Share a versioned playback engine and content manifest across different designs to avoid fixing the same bug in many places.

## Pairing process

1. Confirm a complete film edition: actual media URL, cut, runtime, playback speed, source page, rights notes, mobile/range-request support. Silent films may be tinted or have an added score.
2. Find an authorized embeddable album sequence; check every track, album order, regional availability, loop boundary and a fallback. Do not assume a search result or working first song proves the whole album works.
3. Propose matches by movement/tempo, emotional arc, visual atmosphere and lyrical contrast. These are creative hypotheses, not claims of intentional historical synchronization.
4. Start with zero offset. Compare opening ten minutes, a middle section, climax and the album repeat transition; record exact edition, offset and viewing notes. User approval chooses the final match.
5. Test start/pause/restart, skip, seek, buffering, blocked music, device switching and ended-film behavior. Clearly distinguish approximate shared playback from frame-exact sync.
6. Keep source attribution and visible player controls. Add graceful unavailable-state messages; never substitute unrelated media silently.

Candidate manifest fields: film title/year/edition/source URL/media URL/runtime; album artist/title/ordered source IDs; start offset; loop policy; fallback; rights review notes; last checked date; curator notes; approval status. Nothing marked ready until exact source testing passes.

## First experiments, not final assignments

- Our Hospitality × Lynyrd Skynyrd debut: rustic action and guitar-driven movement.
- The Navigator × Journey's Escape: buoyant momentum and romantic comedy.
- Metropolis × Pink Floyd's Animals: industrial imagery and social tension.
- The Phantom Carriage × The Division Bell: atmosphere and reflective passages.
- Steamboat Bill, Jr. × Texas Flood: physical action and blues-guitar energy.
- Man with a Movie Camera × ELO's Out of the Blue: machinery, editing rhythm and bright arrangements.

## StarQuest and a unified StarCoin wallet — future design

First inspect StarQuest and clarify whether it has an existing identity system or ledger. Do not invent balances or migrate funds based on chat statements. Agree on whether StarCoin is simply an internal reward point; no cash value, blockchain deployment or conversion promise is assumed.

Use one authenticated backend and authoritative ledger shared by apps. GitHub Pages can host a client but is not the trusted ledger. Cross-site identity needs an explicit sign-in integration; visiting a page does not automatically give it a user's ChatGPT account or AI session.

Proposed flow: authenticated viewing session → server-validated eligibility → idempotent reward entry → shared balance → atomic unlock/transfer entries. Use immutable audit events, double-entry transfers, replay prevention, unique transaction IDs and rate limits. Do not reward arbitrary client counters, seeking or repeated heartbeats. Browser watch telemetry is imperfect and cannot prove human attention.

Before implementation the owner decides reward rate, daily caps, minimum eligible watch time, replay rules, unlock prices, transfer limits and correction policy. Use privacy-minimizing telemetry, explicit consent where needed, and data deletion rules. Test two accounts, multiple devices, duplicate events, insufficient balance and interrupted transfers before real rewards.

Coins unlock only experiences/content we are entitled to offer. Commercial music, advertising, payouts and tradability need separate source/platform and rights review. No advertiser deals, payout system, wallet balances or StarQuest repair are completed by this plan.

## Next-session starting point

Choose four films and four albums together, validate their exact sources, then build the next theater. Wallet work follows the StarQuest diagnosis, not the other way around. No scheduled task has been created.
