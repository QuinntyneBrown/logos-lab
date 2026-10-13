# ADR-0002: Players for on-demand video and learning modules

- **Status:** Proposed
- **Date:** 2026-10-13
- **Deciders:** Logos Lab engineering (to decide)

## Context

`L2-040` requires videos to play on demand with adaptive bitrate, seeking, speed, quality, captions
and picture-in-picture in the Tessera video-player. The published `@tessera/video-player` plays
live fragmented-MP4 streams over SignalR. It has no seek bar, speed, quality selection or
picture-in-picture, and takes one caption track. The `play-video` design records this and leaves the
resolution as `<TO SUPPLY>`. The same player is embedded by the video page and the lesson player.

Both Tessera libraries also declare Angular 22.2 and CDK 22.2 as peer dependencies. ADR-0001 keeps
the workspace on Angular 21.2 until the build images provide a newer Node.js.

## Options

1. **Add an on-demand mode to the Tessera video-player.** One player for the product, as the L1 asks.
   Needs work in the Tessera repository and a peer-dependency decision (Angular 22 or a 21 build).
2. **Build `ll-player` over a native `video` element with HLS** (native HLS where the browser has it,
   a small HLS library elsewhere). Gives every control in `L2-040` now. Departs from the L1 wording
   "Tessera video-player" and adds a dependency.
3. **Keep the live player for live events only** and use option 1 or 2 for recorded video.

## Decision

Not yet taken. The video page and the video lessons of the lesson player wait for the choice above.
The learning-module player (`@tessera/scorm-player`) plays SCORM on demand, so only the Angular 22.2
peer dependency stands in its way. The roadmap continues with features that need no player and
returns to these once the choices are made.

## Consequences

- Until then `/videos/{slug}`, `/courses/{slug}/lessons/{id}` for video lessons
  stay unrouted; `/modules/{slug}` waits for the Angular version.
- Whichever option is chosen, `ll-player` stays the shared frame (`play-video` design), so the
  overlays for resume, error and the sign-in prompt are written once.
