---
title: Content and tone
order: 80
summary: Write the way a thoughtful colleague talks: calm, warm, specific and plain.
selector: .btn, .field__error, .empty, .toast
components: button, form-field, empty-state, toast, alert, dialog, prose
---

## Overview

The words carry the look as much as the colours do. {{app}} sounds like a thoughtful colleague sitting
across a wooden table: **calm, warm and unhurried**, never loud, never cute. It says exactly what is
happening, in plain words, and then gets out of the way.

| Principle | What it means | Write | Not |
|---|---|---|---|
| **Calm** | No urgency we don't have. No exclamation marks. | Northwind saved | Saved successfully! |
| **Warm** | Speak to a person, gently, without blame. | Enter a date after today | You entered an invalid date |
| **Specific** | Name the thing, the number and the time. | Delete 3 notes from Harbour Notes? | Delete selected items? |
| **Plain** | Everyday words, short sentences. | Couldn't connect. Try again in a moment. | A network error occurred (ERR_503). |
| **Unhurried** | Say what happens next; don't push. | You can change this later in Settings. | Act now before it's too late |
| **Inclusive** | Anyone, anywhere, any ability. | Everyone on Northwind can see this. | Guys, check this out |

```html
<div class="stack">
  <div class="field">
    <label class="field__label" for="ct-date">Date</label>
    <input class="input" id="ct-date" type="date" value="2026-10-02" aria-invalid="true" aria-describedby="ct-date-err">
    <p class="field__error" id="ct-date-err"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><span>Choose a date after today, Fri 9 Oct</span></p>
  </div>
  <div class="form-actions"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--primary" type="button">Plan gathering</button></div>
</div>
```

## When to use

These rules apply to every word in the product: page titles, buttons, labels, help, errors, empty states,
notifications, emails and documentation. When a team adapts the kit, they rewrite the sample copy in their
own domain but keep this voice. Legal text keeps its meaning, but still uses plain words where it can.

## Structure

Most messages have the same three parts, in this order. Leave out any part that adds nothing.

1. **What is true** — the state or outcome, naming the object: "Field Day wasn't published."
2. **What it means** — one short sentence of context or reassurance: "Nothing was sent to the team."
3. **What to do** — a button or link that starts with a verb: **Try again**.

```html
<div class="alert alert--danger" role="alert">
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg>
  <p class="alert__title">Field Day wasn't published</p>
  <p class="alert__body">Nothing was sent to the team, and your details are still here.</p>
  <div class="alert__actions"><button class="btn btn--sm" type="button">Try again</button></div>
</div>
```

### Mechanics

| Topic | Rule | Example |
|---|---|---|
| **Case** | Sentence case everywhere: titles, buttons, labels, menus. Capitalise only names. | Plan a gathering |
| **Buttons** | A verb, then the object. Three words or fewer. No full stops. | Save changes, Invite Grace |
| **Links** | Say where they go; never "click here" or "learn more" on its own. | See how projects work |
| **Numbers** | Always numerals, with thousands separators. | 3 notes, 1,284 words |
| **Dates** | Short day, date, short month; add the year only when it isn't this year. | Sat 17 Oct |
| **Times** | 12-hour with a space and lower-case am/pm; minutes always shown. | 10:00 am, 6:30 pm |
| **Date and time** | Date, a comma, then the time. | Sat 17 Oct, 10:00 am |
| **Ranges** | An en dash with no spaces. | 10:00–11:30 am, 25–48 of 120 |
| **Relative time** | For the last day or so; dates after that. | 9:12 am, Yesterday, Wed 7 Oct |
| **Punctuation** | Full stops on sentences, not on titles, labels or buttons. No exclamation marks. | Northwind saved |
| **Contractions** | Use them; they sound human. | can't, you'll, we couldn't |
| **Person** | "You" for the reader, "we" for the product, sparingly. | We sent a link to your email. |

## States

Each state has its own job, so each has its own kind of sentence.

- **Empty:** what will be here and how to start. "No projects yet. Start one and invite whoever you work
  with."
- **Loading:** present tense with an ellipsis. "Saving…", "Importing 42 of 120 pages…"
- **Success:** past tense, naming the object. "Invitation sent to Grace Liu."
- **Error:** what didn't happen, reassurance, then the fix. Never blame the person.
- **Destructive:** name exactly what will be lost and whether it can be undone.
- **Offline or degraded:** what still works. "You can keep writing; changes save when you reconnect."

```html
<div class="stack">
  <p class="inline-status"><span class="spinner spinner--sm" aria-hidden="true"></span>Importing 42 of 120 pages…</p>
  <p class="inline-status inline-status--success"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>Invitation sent to Grace Liu</p>
  <p class="inline-status inline-status--danger"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg>Couldn't save. Your note is still here.</p>
  <div class="empty empty--compact">
    <h4 class="empty__title">No gatherings planned</h4>
    <p>Plan one and everyone on Northwind gets an invitation.</p>
    <div class="empty__actions"><button class="btn btn--primary" type="button">Plan a gathering</button></div>
  </div>
</div>
```

## Responsive

Write so that the words survive any width.

- Put the important word first, so a wrapped line still makes sense: "Field Day · Sat 17 Oct, 10:00 am".
- Never rely on truncation to shorten copy; write it shorter instead. Names and titles always wrap.
- Leave room for longer languages: German and French run about a third longer than English. Don't size
  buttons or columns to the English text.
- On small screens, keep the same words; don't swap in abbreviations a person has to decode.

## Accessibility

**Visible text is the name.** A button's accessible name starts with its visible label, so voice control
works ("Archive", not an `aria-label` of "Remove item").

**Links make sense out of context.** Screen reader users often list links; "See how projects work" works
there, "Learn more" doesn't.

**Say it in words.** Status, success and error are always stated, never only shown by colour or an icon.

**Machine-readable dates.** Wrap dates and times in `<time datetime="2026-10-17T10:00">` so assistive tech
and calendars can read them.

**Plain language** helps everyone, including people reading in a second language and people with cognitive
disabilities. Aim for sentences under 20 words.

```html
<p>Field Day is on <time datetime="2026-10-17T10:00">Sat 17 Oct, 10:00 am</time>. <a href="#">See who's coming to Field Day</a></p>
```

## Content

### Words we use, and words we don't

| Use | Instead of |
|---|---|
| Sign in, Sign out | Log in, Login, Log off |
| Delete (gone for good) | Remove, Destroy, Erase |
| Remove (from a list; still exists) | Delete |
| Archive | Hide, Trash |
| Couldn't, wasn't, didn't | Failed to, Unable to |
| Try again | Retry, Resubmit |
| Settings | Preferences, Options, Config |
| People | Users, Members (in the interface) |
| Choose | Select (except for checkboxes) |

### Inclusive and local

- Use names people choose; ask for "Full name", not "First name" and "Last name".
- Use "they" when a person's pronouns aren't known.
- Avoid idioms, metaphors about ability ("blind spot", "crippled"), and jokes that don't translate.
- Use the reader's local format for dates, times, numbers and distances; this page shows the default.
- Describe images for what they show, in a short phrase, in their `alt` text.

## Do and don't

### Do
Name the action and its object on the button.
```html
<div class="form-actions"><button class="btn btn--quiet" type="button">Cancel</button><button class="btn btn--danger" type="button">Delete 3 notes</button></div>
```

### Don't
Use labels that hide what will happen.
```html
<div class="form-actions"><button class="btn btn--quiet" type="button">No</button><button class="btn btn--danger" type="button">OK</button></div>
```

### Do
Explain what to do, kindly and specifically.
```html
<p class="field__error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><span>Use at least 12 characters (you have 7)</span></p>
```

### Don't
Shout, blame or use codes.
```html
<p class="field__error"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.5h.01"/></svg><span>INVALID PASSWORD! Error code PW-07.</span></p>
```

### Do
Write dates as Sat 17 Oct, 10:00 am, and numbers as numerals.
```html
<p class="muted">Field Day · <time datetime="2026-10-17T10:00">Sat 17 Oct, 10:00 am</time> · 11 people coming</p>
```

### Don't
Mix formats or spell out numbers.
```html
<p class="muted">Field Day · 10/17/2026 @ 10AM · eleven people coming!</p>
```
