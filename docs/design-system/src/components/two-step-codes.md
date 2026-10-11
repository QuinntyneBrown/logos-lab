---
title: Two-step codes
tier: standard
order: 103
summary: The parts of setting up and using two-step verification: a QR code to scan, the same key to type, a one-time code field, and a sheet of recovery codes.
selector: .qr, .secret, .codes, .otp
layout: block
target: .otp
states: default, focus, invalid
error: That code didn’t work. Enter the newest 6-digit code from your app.
matrix-variants: challenge
matrix-cell: 24rem
contrast: --color-qr-fg|--color-qr-bg|3; --color-fg-default|--color-bg-surface-sunken|4.5; --color-fg-subtle|--color-bg-surface-sunken|4.5; --color-border-strong|--color-bg-surface|3
---

## Overview

Members turn on two-step verification in Settings › Security, and staff must. Setup shows a QR code for an
authenticator app with the same key as text, asks for a code to confirm, then shows ten recovery codes
once. Sign-in asks for a code with the `otp` field. These parts always sit inside a
[form layout](form-layout.html) or an [auth card](auth-card.html) with headings and instructions; they are
not used alone. For a plain number field use a [text field](text-field.html).

## Anatomy

1. **QR code**: `.qr`, a fixed `--size-qr` square on `--color-qr-bg` (light in both themes so phones can scan it) holding a 21×21 SVG of `rect` modules. The SVG is hidden; the wrapper is `role="img"` named in words.
2. **Key**: `.secret`, the same secret as text in code type, grouped in fours, with a Copy button.
3. **One-time code**: `input.input.otp`, a centred, wide-spaced code field with `inputmode="numeric"` and `autocomplete="one-time-code"`.
4. **Recovery codes**: `ol.codes`, ten codes in two columns on a sunken panel; a used code (`li.is-used`) is struck through.

## Variants

### setup
Scan or type the key, then confirm with a code.
```html
<div class="stack"><div class="qr" role="img" aria-label="QR code to add {{app}} for miriam.clarke@example.ca to an authenticator app"><svg viewBox="0 0 21 21" aria-hidden="true"><rect x="0" y="0" width="7" height="1"/><rect x="8" y="0" width="2" height="1"/><rect x="11" y="0" width="1" height="1"/><rect x="14" y="0" width="7" height="1"/><rect x="0" y="1" width="1" height="1"/><rect x="6" y="1" width="1" height="1"/><rect x="8" y="1" width="2" height="1"/><rect x="11" y="1" width="2" height="1"/><rect x="14" y="1" width="1" height="1"/><rect x="20" y="1" width="1" height="1"/><rect x="0" y="2" width="1" height="1"/><rect x="2" y="2" width="3" height="1"/><rect x="6" y="2" width="1" height="1"/><rect x="8" y="2" width="3" height="1"/><rect x="12" y="2" width="1" height="1"/><rect x="14" y="2" width="1" height="1"/><rect x="16" y="2" width="3" height="1"/><rect x="20" y="2" width="1" height="1"/><rect x="0" y="3" width="1" height="1"/><rect x="2" y="3" width="3" height="1"/><rect x="6" y="3" width="1" height="1"/><rect x="8" y="3" width="1" height="1"/><rect x="12" y="3" width="1" height="1"/><rect x="14" y="3" width="1" height="1"/><rect x="16" y="3" width="3" height="1"/><rect x="20" y="3" width="1" height="1"/><rect x="0" y="4" width="1" height="1"/><rect x="2" y="4" width="3" height="1"/><rect x="6" y="4" width="1" height="1"/><rect x="9" y="4" width="1" height="1"/><rect x="11" y="4" width="2" height="1"/><rect x="14" y="4" width="1" height="1"/><rect x="16" y="4" width="3" height="1"/><rect x="20" y="4" width="1" height="1"/><rect x="0" y="5" width="1" height="1"/><rect x="6" y="5" width="1" height="1"/><rect x="8" y="5" width="2" height="1"/><rect x="11" y="5" width="1" height="1"/><rect x="14" y="5" width="1" height="1"/><rect x="20" y="5" width="1" height="1"/><rect x="0" y="6" width="7" height="1"/><rect x="8" y="6" width="1" height="1"/><rect x="10" y="6" width="1" height="1"/><rect x="12" y="6" width="1" height="1"/><rect x="14" y="6" width="7" height="1"/><rect x="9" y="7" width="1" height="1"/><rect x="11" y="7" width="2" height="1"/><rect x="0" y="8" width="1" height="1"/><rect x="2" y="8" width="2" height="1"/><rect x="5" y="8" width="3" height="1"/><rect x="10" y="8" width="1" height="1"/><rect x="15" y="8" width="1" height="1"/><rect x="17" y="8" width="2" height="1"/><rect x="20" y="8" width="1" height="1"/><rect x="0" y="9" width="2" height="1"/><rect x="7" y="9" width="1" height="1"/><rect x="11" y="9" width="1" height="1"/><rect x="14" y="9" width="1" height="1"/><rect x="16" y="9" width="1" height="1"/><rect x="0" y="10" width="2" height="1"/><rect x="3" y="10" width="6" height="1"/><rect x="10" y="10" width="3" height="1"/><rect x="14" y="10" width="2" height="1"/><rect x="20" y="10" width="1" height="1"/><rect x="0" y="11" width="2" height="1"/><rect x="4" y="11" width="2" height="1"/><rect x="7" y="11" width="3" height="1"/><rect x="11" y="11" width="4" height="1"/><rect x="0" y="12" width="1" height="1"/><rect x="5" y="12" width="4" height="1"/><rect x="10" y="12" width="11" height="1"/><rect x="10" y="13" width="5" height="1"/><rect x="17" y="13" width="4" height="1"/><rect x="0" y="14" width="7" height="1"/><rect x="8" y="14" width="2" height="1"/><rect x="11" y="14" width="2" height="1"/><rect x="15" y="14" width="1" height="1"/><rect x="17" y="14" width="1" height="1"/><rect x="0" y="15" width="1" height="1"/><rect x="6" y="15" width="1" height="1"/><rect x="9" y="15" width="3" height="1"/><rect x="15" y="15" width="2" height="1"/><rect x="0" y="16" width="1" height="1"/><rect x="2" y="16" width="3" height="1"/><rect x="6" y="16" width="1" height="1"/><rect x="10" y="16" width="1" height="1"/><rect x="12" y="16" width="5" height="1"/><rect x="19" y="16" width="1" height="1"/><rect x="0" y="17" width="1" height="1"/><rect x="2" y="17" width="3" height="1"/><rect x="6" y="17" width="1" height="1"/><rect x="10" y="17" width="5" height="1"/><rect x="18" y="17" width="1" height="1"/><rect x="0" y="18" width="1" height="1"/><rect x="2" y="18" width="3" height="1"/><rect x="6" y="18" width="1" height="1"/><rect x="8" y="18" width="1" height="1"/><rect x="13" y="18" width="2" height="1"/><rect x="16" y="18" width="1" height="1"/><rect x="19" y="18" width="2" height="1"/><rect x="0" y="19" width="1" height="1"/><rect x="6" y="19" width="1" height="1"/><rect x="10" y="19" width="3" height="1"/><rect x="15" y="19" width="1" height="1"/><rect x="19" y="19" width="1" height="1"/><rect x="0" y="20" width="7" height="1"/><rect x="8" y="20" width="2" height="1"/><rect x="14" y="20" width="1" height="1"/><rect x="17" y="20" width="4" height="1"/></svg></div><div class="field"><p class="field__label" id="tsc-key-label">Can’t scan it? Enter this key</p><div class="cluster"><code class="secret" aria-labelledby="tsc-key-label">K7QM 4XTB 9RHD 2WPL</code><button class="btn btn--quiet btn--sm" type="button" data-copy-demo>Copy key</button></div></div><div class="field"><label class="field__label" for="tsc-otp">6-digit code from your app</label><input class="input otp" id="tsc-otp" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}"></div></div>
```

### challenge
At sign-in, after the password.
```html
<div class="field"><label class="field__label" for="tsc-c-otp">6-digit code from your app</label><input class="input otp" id="tsc-c-otp" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" aria-describedby="tsc-c-help"><p class="field__help" id="tsc-c-help">Lost your phone? <a href="#">Use a recovery code</a></p></div>
```

### recovery codes
Shown once after setup, and again only when regenerated. One code has been used.
```html
<div class="stack"><ol class="codes" aria-label="Recovery codes"><li>4KQ7-9XTB</li><li>R2MD-8HWP</li><li>7TZC-3LQN</li><li class="is-used"><span class="vh">Used: </span>X9FB-6KJR</li><li>M5VH-2PTD</li><li>Q8NL-4CZW</li><li>3JRK-7DMX</li><li>W6PT-9QBH</li><li>H4XZ-5NLC</li><li>B7DQ-2RVM</li></ol><div class="cluster"><button class="btn btn--quiet btn--sm" type="button"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14"/></svg>Download codes</button><button class="btn btn--quiet btn--sm" type="button">Print</button></div></div>
```

## Sizes

N/A: the QR code is a fixed `--size-qr` square; the code field caps at `--space-40`; the codes fill their column.

## States

Focus rings the code field. **Invalid** marks the field and says what to do; the code is cleared so the
next one can be typed. A used recovery code is struck through and announced as used.

## Responsive

The QR code keeps its size at every width; at 360px it sits above the key rather than beside it. Recovery
codes stay in two columns down to 360px; code type keeps every code on one line. The code field stays
short and centred.

## Accessibility

**Role:** the QR code is an image named in words (its SVG is hidden). The key is text that can be selected
and copied. The code field is a labelled text input with numeric input mode, not `type="number"`, so
leading zeros survive and no spinner appears. Recovery codes are an ordered list.

| Key | Effect |
|---|---|
| Tab | Moves from Copy key to the code field. |
| Enter in the code field | Submits the code. |

**Focus:** after a wrong code, focus returns to the cleared field with the error linked through
`aria-describedby`.

**Labelling:** the field's label says where the code comes from ("6-digit code from your app"). Used
recovery codes carry visually hidden "Used:". The copied key is confirmed in a polite status.

**Motion:** none.

**Touch:** `inputmode="numeric"` opens the number pad and `autocomplete="one-time-code"` lets the phone
fill the code from a message.

## Content

Explain each step in one sentence: **Scan this code with your authenticator app.** **Can’t scan it? Enter
this key.** Group the key in fours: **K7QM 4XTB 9RHD 2WPL**. Recovery codes are two groups of four:
**4KQ7-9XTB**. Tell people to keep codes somewhere safe, and that each works once.

## Do and don't

### Do
Offer the key as text beside the QR code.
```html
<div class="field"><p class="field__label" id="tsc-do-label">Can’t scan it? Enter this key</p><code class="secret" aria-labelledby="tsc-do-label">K7QM 4XTB 9RHD 2WPL</code></div>
```

### Don't
Show only the QR code.
```html
<div class="qr" role="img" aria-label="QR code"><svg viewBox="0 0 21 21" aria-hidden="true"><rect x="0" y="0" width="7" height="7"/><rect x="14" y="0" width="7" height="7"/><rect x="0" y="14" width="7" height="7"/></svg></div>
```

### Do
Use a text field with a numeric keypad and one-time-code autofill.
```html
<div class="field"><label class="field__label" for="tsc-do-otp">6-digit code from your app</label><input class="input otp" id="tsc-do-otp" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6"></div>
```

### Don't
Split the code into six boxes that break paste and autofill.
```html
<div class="cluster"><label class="vh" for="tsc-d1">Digit 1</label><input class="input" id="tsc-d1" type="number"><label class="vh" for="tsc-d2">Digit 2</label><input class="input" id="tsc-d2" type="number"><label class="vh" for="tsc-d3">Digit 3</label><input class="input" id="tsc-d3" type="number"></div>
```
