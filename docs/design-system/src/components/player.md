---
title: Player
tier: standard
order: 87
summary: The frame for a video or a learning module: a dark media stage with play, captions and controls for video, and a light stage with a status bar for SCORM modules. It stands in for the Tessera video-player and scorm-player.
selector: .player
layout: block
target: .player__play
states: default, hover, focus, loading, resume, error, sign-in
matrix-variants: video
matrix-cell: 30rem
contrast: --color-fg-on-media|--color-bg-media|4.5; --color-fg-media-muted|--color-bg-media|4.5; --color-fg-media-accent|--color-bg-media|3; --color-fg-on-accent|--color-accent|4.5; --color-fg-on-media|--color-bg-media-scrim|4.5; --color-fg-default|--color-bg-surface-raised|4.5
---

## Overview

{{app}} plays videos with the [Tessera video-player](https://github.com/QuinntyneBrown/Tessera/tree/main/src/video-player)
and learning modules with the [Tessera scorm-player](https://github.com/QuinntyneBrown/Tessera/tree/main/src/scorm-player).
This component is the frame around them in the mocks and the design system: it fixes the stage, the
overlays, the controls and the module bar so the embedded players look like {{app}}. The video stage is
dark in both themes so the picture keeps its contrast. Use `player--module` for SCORM modules. Pair a video
with its [transcript](transcript.html); place either inside the [lesson layout](lesson-layout.html).

## Anatomy

1. **Player**: `div.player`, a rounded frame on `--color-bg-media` with on-media text.
2. **Screen**: `__screen`, the 16:9 picture area; a poster `img` fills it when there is one.
3. **Play**: `__play`, a large round sage button in the centre before playback starts.
4. **Overlay**: `__overlay`, a scrim over the screen with a title (`__overlay-title`), a sentence and actions (`__overlay-actions`): resume, error or sign in.
5. **Captions**: `__captions`, one or two lines on a scrim near the bottom of the screen.
6. **Controls**: `__controls`, a row of round `__btn` buttons, the time (`__time`), the scrub slider (`__scrub` with `__scrub-fill`) and a spacer (`__spacer`).
7. **Module bar**: `__bar`, for `player--module`: the module title (`__bar-title`), the save status, Exit and Full screen.
8. **Stage**: `__stage`, the light area that holds the SCORM package.

## Variants

### video
Before playback: the play button over the screen and the controls below.
```html
<div class="player"><div class="player__screen"><button class="player__play" type="button" aria-label="Play Can a Machine Pray?"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg></button></div><div class="player__controls"><button class="player__btn" type="button" aria-label="Play"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg></button><span class="player__time">0:00 / 24:18</span><div class="player__scrub" role="slider" tabindex="0" aria-label="Seek" aria-valuemin="0" aria-valuemax="1458" aria-valuenow="0" aria-valuetext="0:00 of 24:18" style="--ll-player-progress: 0%"><span class="player__scrub-fill"></span></div><button class="player__btn" type="button" aria-pressed="false" aria-label="Captions"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M10.5 10.5a2 2 0 1 0 0 3M16.5 10.5a2 2 0 1 0 0 3"/></svg></button><button class="player__btn" type="button" aria-haspopup="menu" aria-label="Settings"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 3.5V6M12 18v2.5M3.5 12H6M18 12h2.5M6 6l1.8 1.8M16.2 16.2 18 18M6 18l1.8-1.8M16.2 7.8 18 6"/></svg></button><button class="player__btn" type="button" aria-label="Full screen"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button></div></div>
```

### playing
During playback: captions on, the scrub filled to the current time and the speed shown on the settings button.
```html
<div class="player"><div class="player__screen"><p class="player__captions">Prayer is not a transaction of words. It is attention turned toward someone.</p></div><div class="player__controls"><button class="player__btn" type="button" aria-label="Pause"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 5v14M15.5 5v14"/></svg></button><button class="player__btn" type="button" aria-label="Mute"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6"/></svg></button><span class="player__time">12:34 / 24:18</span><div class="player__scrub" role="slider" tabindex="0" aria-label="Seek" aria-valuemin="0" aria-valuemax="1458" aria-valuenow="754" aria-valuetext="12:34 of 24:18" style="--ll-player-progress: 52%"><span class="player__scrub-fill"></span></div><button class="player__btn" type="button" aria-pressed="true" aria-label="Captions"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M10.5 10.5a2 2 0 1 0 0 3M16.5 10.5a2 2 0 1 0 0 3"/></svg></button><button class="player__btn" type="button" aria-haspopup="menu" aria-label="Settings, speed 1.25×">1.25×</button><button class="player__btn" type="button" aria-label="Full screen"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button></div></div>
```

### module
`player--module` frames a SCORM learning module: a bar with the title, the save status, Exit and Full screen above a light stage.
```html
<div class="player player--module"><div class="player__bar"><p class="player__bar-title">Bias in the Training Data</p><span class="inline-status inline-status--success" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Progress saved</span><button class="btn btn--quiet btn--sm" type="button">Exit</button><button class="btn btn--quiet btn--sm" type="button"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>Full screen</button></div><div class="player__stage"><h3>Where does bias come from?</h3><p>A model learns from the examples it is given. If the examples leave people out, so will the model.</p><div><button class="btn btn--primary" type="button">Continue</button></div></div></div>
```

### module saving
While the module reports progress, the bar says so; if saving fails it retries and says that too.
```html
<div class="player player--module"><div class="player__bar"><p class="player__bar-title">Case Study: The Chatbot Chaplain</p><span class="inline-status inline-status--warning" role="status"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Not saved — retrying</span><button class="btn btn--quiet btn--sm" type="button">Exit</button><button class="btn btn--quiet btn--sm" type="button">Full screen</button></div><div class="player__stage" aria-busy="true"><span class="inline-status"><span class="spinner" aria-hidden="true"></span>Opening the module…</span></div></div>
```

## Sizes

N/A: the player fills its column at 16:9 (16:10 for modules); `player--fill` removes the frame for full-width and full-screen use.

## States

Hover deepens the play button and focus rings it in the media accent. **Loading** dims the screen and
shows a spinner. **Resume** offers to continue from the saved point. **Error** explains that the video
cannot play and offers to try again. **Sign in** covers a members-only video for a visitor.

### loading
```html
<div class="player"><div class="player__screen" aria-busy="true"><span class="inline-status"><span class="spinner" aria-hidden="true"></span><span class="vh">Loading video</span></span></div><div class="player__controls"><button class="player__btn" type="button" aria-label="Play" disabled><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg></button><span class="player__time">0:00 / 24:18</span><span class="player__spacer"></span></div></div>
```

### resume
```html
<div class="player"><div class="player__screen"><div class="player__overlay"><p class="player__overlay-title">Pick up where you left off?</p><p>You stopped at 12:34 of Can a Machine Pray?</p><div class="player__overlay-actions"><button class="btn btn--primary" type="button">Resume from 12:34</button><button class="btn btn--quiet" type="button">Start over</button></div></div></div></div>
```

### error
```html
<div class="player"><div class="player__screen"><div class="player__overlay" role="alert"><p class="player__overlay-title">This video won’t play right now</p><p>Check your connection, then try again. Your place is saved.</p><div class="player__overlay-actions"><button class="btn btn--quiet" type="button">Try again</button></div></div></div></div>
```

### sign-in
```html
<div class="player"><div class="player__screen"><div class="player__overlay"><p class="player__overlay-title">Sign in to watch</p><p>Can a Machine Pray? is free for members. Inside a Neural Network in Ten Minutes is open to everyone.</p><div class="player__overlay-actions"><a class="btn btn--primary" href="#">Sign in</a><a class="btn btn--quiet" href="#">Create an account</a></div></div></div></div>
```

## Responsive

The screen keeps 16:9 at every width. Under 640px the time is hidden to give the scrub room; the buttons
stay 44px. The module stage drops its fixed ratio under 640px and grows with its content; the bar wraps
so Exit and Full screen move below the title. `player--fill` takes the whole viewport in full screen.

## Accessibility

**Role:** a group of native buttons; the scrub is `role="slider"` with `aria-valuetext` in minutes and
seconds. Captions is a toggle with `aria-pressed`. Settings opens a [menu](menu.html). Overlays that report
a failure use `role="alert"`.

| Key | Effect |
|---|---|
| Space or K | Plays or pauses. |
| Left / Right arrow on the scrub | Moves back or forward 5 seconds. |
| Home / End on the scrub | Goes to the start or the end. |
| C | Turns captions on or off. |
| F | Enters or leaves full screen. |
| Escape | Leaves full screen, or exits a module after confirming. |

**Focus:** controls use the media accent ring so it shows on the dark stage. Focus never lands on the
picture itself.

**Labelling:** every icon button has a name ("Play", "Captions", "Settings, speed 1.25×"). The play button
names the video. The save status is a polite `role="status"`.

**Motion:** the play button's grow on hover stops under reduced motion. Nothing autoplays.

**Touch:** every control is a 44px target; the scrub has an invisible 12px band above and below it.

## Content

Times are `m:ss` or `h:mm:ss`: **12:34 / 24:18**. Overlay titles are short questions or plain facts:
**Pick up where you left off?**, **This video won’t play right now**. Module status reads **Progress
saved**, **Saving…** or **Not saved — retrying**. The module title is the module's catalogue title.

## Do and don't

### Do
Offer to resume from the saved point and to start over.
```html
<div class="player"><div class="player__screen"><div class="player__overlay"><p class="player__overlay-title">Pick up where you left off?</p><div class="player__overlay-actions"><button class="btn btn--primary" type="button">Resume from 12:34</button><button class="btn btn--quiet" type="button">Start over</button></div></div></div></div>
```

### Don't
Jump to the saved point without saying so.
```html
<div class="player"><div class="player__screen"><p class="player__captions">…attention turned toward someone.</p></div></div>
```

### Do
Say whether a module's progress has been saved.
```html
<div class="player player--module"><div class="player__bar"><p class="player__bar-title">Prompting with Wisdom</p><span class="inline-status" role="status"><span class="spinner" aria-hidden="true"></span>Saving…</span><button class="btn btn--quiet btn--sm" type="button">Exit</button></div></div>
```

### Don't
Make the captions toggle a bare abbreviation with no pressed state.
```html
<div class="player"><div class="player__controls"><button class="player__btn" type="button">CC</button></div></div>
```
