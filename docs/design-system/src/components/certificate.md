---
title: Certificate
tier: standard
order: 89
summary: The certificate of completion a learner earns for a course: their name, the course, the date, the author's signature and a code anyone can verify. A revoked certificate is stamped and greyed.
selector: .certificate
layout: block
target: .certificate
states: default, revoked
matrix-variants: certificate
matrix-cell: 36rem
contrast: --color-fg-default|--color-bg-surface|4.5; --color-fg-muted|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-surface|4.5; --color-fg-subtle|--color-bg-subtle|4.5; --color-danger-fg|--color-danger-bg|4.5
---

## Overview

{{app}} issues a certificate when a learner completes a course. The certificate page shows it, prints it
and offers it as a PDF; the public verification page shows the same certificate to anyone who has the
code. Use it only for a completed course; for progress use the [progress bar](progress-bar.html) and for
a short completion fact on a card use a [badge](badge.html).

## Anatomy

1. **Certificate**: `article.certificate`, a centred birch sheet with a double hairline frame (border and inset outline) and a soft shadow.
2. **Title**: `__title`, "Certificate of completion".
3. **Name**: `__name`, the learner's name as on their profile, large and light.
4. **For**: `__for`, the joining words "has completed".
5. **Course**: `__course`, the course title.
6. **Facts**: `dl.certificate__facts`, completion date, author and length.
7. **Signature**: `__sign` with `__signature`, the author's name set as a signature over their full name and role.
8. **Code**: `__code`, the verification address and code.
9. **Stamp**: `__stamp`, only on a revoked certificate.

## Variants

### certificate
```html
<article class="certificate" aria-labelledby="cert-title"><p class="certificate__title" id="cert-title">Certificate of completion</p><p class="certificate__name">Miriam Clarke</p><p class="certificate__for">has completed</p><p class="certificate__course">Christian Ethics for AI Builders</p><dl class="certificate__facts"><div><dt>Completed</dt><dd>2 Sep 2026</dd></div><div><dt>Course by</dt><dd>Rev. Dr. Thomas Hale</dd></div><div><dt>Length</dt><dd>18 lessons · 4 h 10 min</dd></div></dl><div class="certificate__sign"><span class="certificate__signature">Thomas Hale</span><span>Rev. Dr. Thomas Hale, course author</span></div><p class="certificate__code">Verify at logoslab.ca/verify · LL-7K4Q-29XM</p></article>
```

### verified
On the public verification page, a success alert above the certificate confirms the code.
```html
<div class="stack"><div class="alert alert--success" role="status"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><p class="alert__title">This certificate is valid</p><p class="alert__body">{{app}} issued LL-7K4Q-29XM to Miriam Clarke on 2 Sep 2026.</p></div><article class="certificate" aria-labelledby="cert-v-title"><p class="certificate__title" id="cert-v-title">Certificate of completion</p><p class="certificate__name">Miriam Clarke</p><p class="certificate__for">has completed</p><p class="certificate__course">Christian Ethics for AI Builders</p><dl class="certificate__facts"><div><dt>Completed</dt><dd>2 Sep 2026</dd></div><div><dt>Course by</dt><dd>Rev. Dr. Thomas Hale</dd></div></dl><p class="certificate__code">LL-7K4Q-29XM</p></article></div>
```

### revoked
`certificate--revoked` greys the sheet and adds the stamp; the verification page says why in words.
```html
<div class="stack"><div class="alert alert--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg><p class="alert__title">This certificate was revoked</p><p class="alert__body">{{app}} revoked LL-7K4Q-29XM on 13 Oct 2026. It no longer shows that the course was completed.</p></div><article class="certificate certificate--revoked" aria-labelledby="cert-r-title"><p class="certificate__stamp">Revoked</p><p class="certificate__title" id="cert-r-title">Certificate of completion</p><p class="certificate__name">Miriam Clarke</p><p class="certificate__for">has completed</p><p class="certificate__course">Christian Ethics for AI Builders</p><dl class="certificate__facts"><div><dt>Completed</dt><dd>2 Sep 2026</dd></div><div><dt>Revoked</dt><dd>13 Oct 2026</dd></div></dl><p class="certificate__code">LL-7K4Q-29XM</p></article></div>
```

## Sizes

N/A: one size, capped at `--size-certificate`; print scales it to the page.

## States

**Default** is a valid certificate. **Revoked** greys the sheet, subdues the name and course, and adds the
red **Revoked** stamp; a revoked certificate is never shown without the words that explain it.

### revoked
```html
<article class="certificate certificate--revoked" aria-labelledby="cert-rs-title"><p class="certificate__stamp">Revoked</p><p class="certificate__title" id="cert-rs-title">Certificate of completion</p><p class="certificate__name">Miriam Clarke</p><p class="certificate__for">has completed</p><p class="certificate__course">Christian Ethics for AI Builders</p><dl class="certificate__facts"><div><dt>Completed</dt><dd>2 Sep 2026</dd></div><div><dt>Revoked</dt><dd>13 Oct 2026</dd></div></dl><p class="certificate__code">LL-7K4Q-29XM</p></article>
```

## Responsive

The sheet narrows with the page; under 640px the padding drops from 64px to 48px and the facts wrap onto
two lines. Long names and codes wrap rather than overflow. Print uses the same layout on a white page.

## Accessibility

**Role:** an `article` named by its title. Facts are a description list. The stamp is plain text, so
"Revoked" is read first.

**Focus:** the certificate itself takes no focus; its actions (Download PDF, Copy link) sit outside it.

**Labelling:** the code is printed as text and the verification address is spelled out so it can be typed.
The signature is decorative type over the author's printed name, which carries the meaning.

**Motion:** none.

**Touch:** none on the certificate; actions outside it follow the button rules.

## Content

The learner's name is exactly as on their profile: **Miriam Clarke**. Dates are **2 Sep 2026**. The code
is uppercase in two groups of four: **LL-7K4Q-29XM**. The joining words are **has completed**. The
revocation alert gives the date and what it means, not the reason, which goes to the learner privately.

## Do and don't

### Do
Print the verification code as text.
```html
<p class="certificate__code">Verify at logoslab.ca/verify · LL-7K4Q-29XM</p>
```

### Don't
Hide the code inside an image or a QR code alone.
```html
<p class="certificate__code">Scan to verify</p>
```

### Do
Explain a revocation in words beside the stamp.
```html
<div class="alert alert--danger" role="alert"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg><p class="alert__title">This certificate was revoked</p><p class="alert__body">It no longer shows that the course was completed.</p></div>
```

### Don't
Grey the certificate without saying it was revoked.
```html
<article class="certificate certificate--revoked" aria-labelledby="cert-d-title"><p class="certificate__title" id="cert-d-title">Certificate of completion</p><p class="certificate__name">Miriam Clarke</p></article>
```
