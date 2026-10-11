---
title: Sign-in card
tier: standard
order: 48
summary: The calm, centred card for signing in, creating an account and the steps around them: one title, a few fields and one way forward.
selector: .auth
target: input
states: default, focus, invalid, submitting, error
matrix-variants: sign in, create account
error: Enter your email address, like amara.osei@example.com.
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-fg-link|--color-bg-surface|4.5; --color-danger-fg|--color-danger-bg|4.5; --color-focus-ring|--color-bg-surface|3
---

## Overview

Use the sign-in card for every step of getting into {{app}}: sign in, create an account, reset a password
and the "check your email" pause between them. It sits alone in the middle of an otherwise quiet page, with
nothing to distract from the one task. Each card has one title, one primary action and one link to the
neighbouring step. For forms inside the product, use a [form layout](form-layout.html) instead.

## Anatomy

1. **Card** — a surface up to 30rem wide with an extra-large radius, centred on the page (`.auth__card`).
2. **Title** — the step, in the display size (`.auth__title`); it is the page's only `h1`.
3. **Subtitle** — one sentence of reassurance or instruction (`.auth__sub`).
4. **Form** — labelled fields, a help link and one full-width primary button.
5. **Alternative** — a single line that links to the neighbouring step (`.auth__alt`).

```html
<div class="auth"><section class="auth__card" aria-labelledby="anat-auth"><div><h1 class="auth__title" id="anat-auth">Sign in</h1><p class="auth__sub">Welcome back. Your notes are where you left them.</p></div><form class="form" action="#" novalidate aria-labelledby="anat-auth"><div class="field"><label class="field__label" for="anat-email">Email</label><input class="input" id="anat-email" type="email" autocomplete="email"></div><button class="btn btn--primary btn--lg btn--block" type="submit">Sign in</button></form><p class="auth__alt">New to {{app}}? <a href="#">Create an account</a></p></section></div>
```

## Variants

### sign in
Email and password, a way back in if the password is forgotten, and a link to create an account.
```html
<div class="auth"><section class="auth__card" aria-labelledby="auth-in">
  <div><h1 class="auth__title" id="auth-in">Sign in</h1><p class="auth__sub">Welcome back. Your notes are where you left them.</p></div>
  <form class="form" action="#" novalidate aria-labelledby="auth-in">
    <div class="field"><label class="field__label" for="in-email">Email</label><input class="input" id="in-email" name="email" type="email" autocomplete="email" required></div>
    <div class="field"><label class="field__label" for="in-pass">Password</label><input class="input" id="in-pass" name="password" type="password" autocomplete="current-password" required></div>
    <p class="field__help"><a href="#">Forgot your password?</a></p>
    <button class="btn btn--primary btn--lg btn--block" type="submit">Sign in</button>
  </form>
  <p class="auth__alt">New to {{app}}? <a href="#">Create an account</a></p>
</section></div>
```

### create account
Three fields, a password rule stated up front, and an optional choice that starts unticked.
```html
<div class="auth"><section class="auth__card" aria-labelledby="auth-new">
  <div><h1 class="auth__title" id="auth-new">Create your account</h1><p class="auth__sub">Set up {{app}} for you and your team in a minute.</p></div>
  <form class="form" action="#" novalidate aria-labelledby="auth-new">
    <div class="field"><label class="field__label" for="new-name">Your name</label><input class="input" id="new-name" name="name" type="text" autocomplete="name" required></div>
    <div class="field"><label class="field__label" for="new-email">Email</label><input class="input" id="new-email" name="email" type="email" autocomplete="email" required></div>
    <div class="field"><label class="field__label" for="new-pass">Password</label><input class="input" id="new-pass" name="password" type="password" autocomplete="new-password" required aria-describedby="new-pass-help"><p class="field__help" id="new-pass-help">At least 12 characters. A short sentence works well.</p></div>
    <label class="check"><input class="check__box" type="checkbox" name="news"><span class="check__text">Send me occasional product news</span></label>
    <button class="btn btn--primary btn--lg btn--block" type="submit">Create account</button>
  </form>
  <p class="auth__alt">Already have an account? <a href="#">Sign in</a></p>
</section></div>
```

### reset password
One field and a plain promise about what happens next.
```html
<div class="auth"><section class="auth__card" aria-labelledby="auth-reset">
  <div><h1 class="auth__title" id="auth-reset">Reset your password</h1><p class="auth__sub">Enter the email you signed up with and we'll send a link to choose a new password.</p></div>
  <form class="form" action="#" novalidate aria-labelledby="auth-reset">
    <div class="field"><label class="field__label" for="reset-email">Email</label><input class="input" id="reset-email" name="email" type="email" autocomplete="email" required></div>
    <button class="btn btn--primary btn--lg btn--block" type="submit">Send reset link</button>
  </form>
  <p class="auth__alt">Remembered it? <a href="#">Back to sign in</a></p>
</section></div>
```

### check your email
The pause after a link is sent: where it went, how long it lasts and how to try again.
```html
<div class="auth"><section class="auth__card" aria-labelledby="auth-mail">
  <span class="empty__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 6 8-6"/></svg></span>
  <div><h1 class="auth__title" id="auth-mail">Check your email</h1><p class="auth__sub">We sent a sign-in link to <strong>amara.osei@example.com</strong>. It works for the next 15 minutes.</p></div>
  <button class="btn btn--quiet btn--block" type="button">Send the link again</button>
  <p class="auth__alt">Wrong address? <a href="#">Use a different email</a></p>
</section></div>
```

## Sizes

N/A: one size. The card is at most `--size-auth-card` (30rem) wide; its padding grows from `--space-8`
by `--space-6` on phones to `--space-12` from 640px.

## States

**Focus** shows the sage ring on the field. **Invalid** marks each field that needs fixing with a
message beneath it, and a form with more than one problem lists them first. **Submitting** turns the
primary button into a busy button with a spinner and a present-tense label, and the fields stay as typed.
**Error** puts a danger alert at the top of the card when the server says no, such as a wrong password or an
email that already has an account.

### create account / invalid
```html
<div class="auth"><section class="auth__card" aria-labelledby="new2-title">
  <div><h1 class="auth__title" id="new2-title">Create your account</h1><p class="auth__sub">Set up {{app}} for you and your team in a minute.</p></div>
  <form class="form" action="#" novalidate aria-labelledby="new2-title">
    <div class="form-summary" role="alert" aria-labelledby="new2-sum"><p class="form-summary__title" id="new2-sum"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Fix two things to continue</p><ul><li><a href="#new2-email">Enter a full email address</a></li><li><a href="#new2-pass">Use a longer password</a></li></ul></div>
    <div class="field"><label class="field__label" for="new2-name">Your name</label><input class="input" id="new2-name" type="text" autocomplete="name" value="Amara Osei"></div>
    <div class="field"><label class="field__label" for="new2-email">Email</label><input class="input" id="new2-email" type="email" autocomplete="email" value="amara.osei@" aria-invalid="true" aria-describedby="new2-email-err"><p class="field__error" id="new2-email-err"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Enter a full email address, like amara.osei@example.com.</p></div>
    <div class="field"><label class="field__label" for="new2-pass">Password</label><input class="input" id="new2-pass" type="password" autocomplete="new-password" value="northwind" aria-invalid="true" aria-describedby="new2-pass-err"><p class="field__error" id="new2-pass-err"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Use at least 12 characters. This one has 9.</p></div>
    <button class="btn btn--primary btn--lg btn--block" type="submit">Create account</button>
  </form>
  <p class="auth__alt">Already have an account? <a href="#">Sign in</a></p>
</section></div>
```

### sign in / submitting
```html
<div class="auth"><section class="auth__card" aria-labelledby="in2-title">
  <div><h1 class="auth__title" id="in2-title">Sign in</h1><p class="auth__sub">Welcome back. Your notes are where you left them.</p></div>
  <form class="form" action="#" novalidate aria-labelledby="in2-title">
    <div class="field"><label class="field__label" for="in2-email">Email</label><input class="input" id="in2-email" type="email" autocomplete="email" value="amara.osei@example.com"></div>
    <div class="field"><label class="field__label" for="in2-pass">Password</label><input class="input" id="in2-pass" type="password" autocomplete="current-password" value="a quiet harbour at dawn"></div>
    <p class="field__help"><a href="#">Forgot your password?</a></p>
    <button class="btn btn--primary btn--lg btn--block" type="submit" aria-busy="true"><span class="spinner" aria-hidden="true"></span>Signing in…</button>
  </form>
  <p class="auth__alt">New to {{app}}? <a href="#">Create an account</a></p>
</section></div>
```

### create account / submitting
```html
<div class="auth"><section class="auth__card" aria-labelledby="new3-title">
  <div><h1 class="auth__title" id="new3-title">Create your account</h1><p class="auth__sub">Set up {{app}} for you and your team in a minute.</p></div>
  <form class="form" action="#" novalidate aria-labelledby="new3-title">
    <div class="field"><label class="field__label" for="new3-name">Your name</label><input class="input" id="new3-name" type="text" autocomplete="name" value="Amara Osei"></div>
    <div class="field"><label class="field__label" for="new3-email">Email</label><input class="input" id="new3-email" type="email" autocomplete="email" value="amara.osei@example.com"></div>
    <div class="field"><label class="field__label" for="new3-pass">Password</label><input class="input" id="new3-pass" type="password" autocomplete="new-password" value="a quiet harbour at dawn"></div>
    <label class="check"><input class="check__box" type="checkbox" checked><span class="check__text">Send me occasional product news</span></label>
    <button class="btn btn--primary btn--lg btn--block" type="submit" aria-busy="true"><span class="spinner" aria-hidden="true"></span>Creating your account…</button>
  </form>
  <p class="auth__alt">Already have an account? <a href="#">Sign in</a></p>
</section></div>
```

### sign in / error
```html
<div class="auth"><section class="auth__card" aria-labelledby="in3-title">
  <div><h1 class="auth__title" id="in3-title">Sign in</h1><p class="auth__sub">Welcome back. Your notes are where you left them.</p></div>
  <div class="alert alert--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg><p class="alert__title">That didn't match</p><p class="alert__body">Check your email and password and try again, or reset your password.</p></div>
  <form class="form" action="#" novalidate aria-labelledby="in3-title">
    <div class="field"><label class="field__label" for="in3-email">Email</label><input class="input" id="in3-email" type="email" autocomplete="email" value="amara.osei@example.com"></div>
    <div class="field"><label class="field__label" for="in3-pass">Password</label><input class="input" id="in3-pass" type="password" autocomplete="current-password"></div>
    <p class="field__help"><a href="#">Forgot your password?</a></p>
    <button class="btn btn--primary btn--lg btn--block" type="submit">Sign in</button>
  </form>
  <p class="auth__alt">New to {{app}}? <a href="#">Create an account</a></p>
</section></div>
```

### create account / error
```html
<div class="auth"><section class="auth__card" aria-labelledby="new4-title">
  <div><h1 class="auth__title" id="new4-title">Create your account</h1><p class="auth__sub">Set up {{app}} for you and your team in a minute.</p></div>
  <div class="alert alert--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg><p class="alert__title">That email already has an account</p><p class="alert__body">Sign in to that account instead, or use a different email.</p><div class="alert__actions"><a href="#">Sign in instead</a></div></div>
  <form class="form" action="#" novalidate aria-labelledby="new4-title">
    <div class="field"><label class="field__label" for="new4-name">Your name</label><input class="input" id="new4-name" type="text" autocomplete="name" value="Amara Osei"></div>
    <div class="field"><label class="field__label" for="new4-email">Email</label><input class="input" id="new4-email" type="email" autocomplete="email" value="amara.osei@example.com"></div>
    <div class="field"><label class="field__label" for="new4-pass">Password</label><input class="input" id="new4-pass" type="password" autocomplete="new-password" value="a quiet harbour at dawn"></div>
    <button class="btn btn--primary btn--lg btn--block" type="submit">Create account</button>
  </form>
  <p class="auth__alt">Already have an account? <a href="#">Sign in</a></p>
</section></div>
```

## Responsive

At 360px the card fills the width less the page margins and its padding tightens to `--space-8` by
`--space-6`; the primary button is full width at every size. From 640px the card is centred at up to
30rem with `--space-12` of padding. The page around it keeps only the brand and a footer link; no
navigation competes with the form.

## Theming

The card sits on `--color-bg-surface` against the canvas with a hairline border. In dark mode the surface
is a step lighter than the canvas, so the card still reads as one object; the alert uses the danger roles,
tuned for both themes.

## Accessibility

**Role:** a `<section>` labelled by the title, which is the page's single `h1`, containing a `<form>`
labelled by the same title. Each field has a visible `<label>`.

| Key | Effect |
|---|---|
| Tab / Shift+Tab | Moves through the fields, the help link, the button and the alternative link. |
| Enter | Submits the form from any field. |
| Space | Toggles the checkbox and activates buttons. |

**Focus:** on load, focus goes to the first field. After an invalid submit it moves to the form summary
(or to the only invalid field); after a server error it moves to the alert.

**Labelling:** fields use the right `type` and `autocomplete` (`email`, `current-password`, `new-password`,
`name`) so password managers and autofill work, and pasting into password fields is never blocked (WCAG
3.3.8). Offer the show-password toggle from the [text field](text-field.html) on longer forms. A busy button
keeps a readable label (**Signing in…**) and sets `aria-busy`.

**Motion:** only the spinner moves while submitting; it stops under reduced motion and the label carries the meaning.

**Touch:** fields are 52px tall and the primary button is `btn--lg`; links have at least `--space-3` around them.

## Content

Title each step with what people are doing: **Sign in**, **Create your account**, **Reset your password**,
**Check your email**. Keep the subtitle to one warm, specific sentence. Say password rules before people
type, and failures without blame: **That didn't match**, not **Invalid credentials**. Never say which of
email or password was wrong when signing in.

## Do and don't

### Do
Name the step and offer one way forward.
```html
<div class="auth"><section class="auth__card" aria-labelledby="do-auth"><div><h1 class="auth__title" id="do-auth">Reset your password</h1><p class="auth__sub">We'll email you a link to choose a new one.</p></div><button class="btn btn--primary btn--lg btn--block" type="button">Send reset link</button></section></div>
```

### Don't
Offer several equal actions that compete with the task.
```html
<div class="auth"><section class="auth__card" aria-labelledby="dont-auth"><div><h1 class="auth__title" id="dont-auth">Welcome</h1></div><div class="cluster"><button class="btn btn--primary" type="button">Sign in</button><button class="btn btn--primary" type="button">Sign up</button><button class="btn btn--primary" type="button">Learn more</button></div></section></div>
```

### Do
Say what went wrong without blaming anyone, and how to recover.
```html
<div class="alert alert--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg><p class="alert__title">That didn't match</p><p class="alert__body">Check your email and password and try again, or reset your password.</p></div>
```

### Don't
Use system language or reveal which part was wrong.
```html
<div class="alert alert--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg><p class="alert__title">Error 401: invalid password for user</p></div>
```

## Tokens

The card reads the surface and border roles, `--radius-xl`, `--size-auth-card`, the h1 type role at
`--font-size-3xl` with tight letter spacing, and the `--space-8` to `--space-24` spacing steps.

## Code

Centre the card with `.auth` inside the page's main column. Put the title and subtitle in one wrapper so the
card's `--space-8` gap separates them from the form, not from each other.
