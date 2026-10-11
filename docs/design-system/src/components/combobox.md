---
title: Combobox
tier: standard
order: 100
summary: Search suggestions under the site search field, grouped into Courses, Experts and Topics, with the typed text highlighted and a last row to see all results.
selector: .combobox
layout: block
target: .combobox__option
states: default, hover, selected, searching, too-short, no-matches, failed
matrix-variants: suggestions
matrix-cell: 26rem
contrast: --color-fg-default|--color-bg-surface-raised|4.5; --color-fg-subtle|--color-bg-surface-raised|4.5; --color-fg-default|--color-accent-subtle|4.5; --color-danger-fg|--color-bg-surface-raised|4.5
---

## Overview

The combobox turns the site search field into a quick jump: after two characters it suggests matching
courses, experts and topics, and Enter on the field goes to the full `/search` page. Use it only for site
search in the [top bar](top-bar.html) and on the search page. For choosing a value in a form use a
[select](select.html); for a list of actions use a [menu](menu.html).

## Anatomy

1. **Combobox**: `div.combobox`, a positioning wrapper around the field and the list.
2. **Field**: the site [search](text-field.html) field, with `role="combobox"`, `aria-expanded` and `aria-controls`.
3. **List**: `ul.combobox__list`, a raised `listbox` absolutely positioned 8px below the field, up to `--size-combobox-max` tall, scrolling. The specimens on this page add `style="position: static"` only so the list shows in flow.
4. **Group**: `__group`, an overline naming the group: Courses, Experts, Topics.
5. **Option**: `__option`, an icon, the text (`__text`) with the typed characters in `mark`, and a meta (`__meta`).
6. **Status**: `__status`, one line for searching, too short, no matches or failed; `__status--danger` for failure.
7. **Foot**: `__foot`, the last option, See all results for the query.

## Variants

### suggestions
Three groups for "im", before an option is made active with the arrow keys.
```html
<div class="combobox"><form class="search" role="search" action="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg><label class="vh" for="cbx-q">Search {{app}}</label><input class="search__input" id="cbx-q" name="q" type="search" value="im" role="combobox" aria-expanded="true" aria-controls="cbx-list" aria-autocomplete="list" autocomplete="off"></form><ul class="combobox__list" id="cbx-list" role="listbox" aria-label="Suggestions for im" style="position: static"><li class="combobox__group" role="presentation">Courses</li><li class="combobox__option" role="option" aria-selected="false"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 5.5A1.5 1.5 0 0 1 6 4h12.5v14H6a1.5 1.5 0 0 0-1.5 1.5zM4.5 19.5A1.5 1.5 0 0 0 6 21h12.5v-3"/></svg><span class="combobox__text"><mark>Im</mark>ago Dei in an Age of Machines</span><span class="combobox__meta">Course</span></li><li class="combobox__group" role="presentation">Experts</li><li class="combobox__option" role="option" aria-selected="false"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg><span class="combobox__text">Prof. S<mark>im</mark>on Keller</span><span class="combobox__meta">Philosopher of mind</span></li><li class="combobox__group" role="presentation">Topics</li><li class="combobox__option" role="option" aria-selected="false"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7.5l8.5 8.5-7.5 7.5L4 11.5z"/><path d="M8.5 8.5h.01"/></svg><span class="combobox__text">The <mark>im</mark>age of God and personhood</span><span class="combobox__meta">28 items</span></li><li class="combobox__foot" role="option" aria-selected="false">See all results for “im”</li></ul></div>
```

### single group
When only one group matches, the others are left out rather than shown empty.
```html
<div class="combobox"><form class="search" role="search" action="#"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg><label class="vh" for="cbx-q2">Search {{app}}</label><input class="search__input" id="cbx-q2" name="q" type="search" value="voc" role="combobox" aria-expanded="true" aria-controls="cbx-list2" aria-autocomplete="list" autocomplete="off"></form><ul class="combobox__list" id="cbx-list2" role="listbox" aria-label="Suggestions for voc" style="position: static"><li class="combobox__group" role="presentation">Topics</li><li class="combobox__option" role="option" aria-selected="true"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7.5l8.5 8.5-7.5 7.5L4 11.5z"/><path d="M8.5 8.5h.01"/></svg><span class="combobox__text">Work and <mark>voc</mark>ation</span><span class="combobox__meta">19 items</span></li><li class="combobox__foot" role="option" aria-selected="false">See all results for “voc”</li></ul></div>
```

## Sizes

N/A: the list matches the field's width and caps at `--size-combobox-max`.

## States

Hover washes an option in `--color-bg-subtle`. **Selected** (the active option, reached by arrow keys)
fills it with the sage wash and sets `aria-selected="true"`. **Searching** shows a spinner and
"Searching…". **Too short** asks for at least 2 characters. **No matches** says so and still offers the
full search. **Failed** says suggestions are unavailable; Enter still runs the full search.

### searching
```html
<div class="combobox"><ul class="combobox__list" role="listbox" aria-label="Suggestions for imag" aria-busy="true" style="position: static"><li class="combobox__status" role="presentation"><span class="spinner" aria-hidden="true"></span>Searching…</li></ul></div>
```

### too-short
```html
<div class="combobox"><ul class="combobox__list" role="listbox" aria-label="Suggestions" style="position: static"><li class="combobox__status" role="presentation">Enter at least 2 characters.</li></ul></div>
```

### no-matches
```html
<div class="combobox"><ul class="combobox__list" role="listbox" aria-label="Suggestions for liturgy" style="position: static"><li class="combobox__status" role="presentation">No courses, experts or topics match “liturgy”.</li><li class="combobox__foot" role="option" aria-selected="false">See all results for “liturgy”</li></ul></div>
```

### failed
```html
<div class="combobox"><ul class="combobox__list" role="listbox" aria-label="Suggestions for imago" style="position: static"><li class="combobox__status combobox__status--danger" role="presentation"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>Suggestions aren’t available right now. Press Enter to search.</li></ul></div>
```

## Responsive

The list is as wide as the field at every size. Under 640px the top-bar search opens as a full-width
sheet and the list fills the space below the field; long option text truncates with an ellipsis and the
meta stays. From 1024px the list hangs under the field in the top bar.

## Accessibility

**Role:** the field is a `combobox` (`aria-autocomplete="list"`, `aria-expanded`, `aria-controls`) that
owns a `listbox`. The active option is announced through `aria-activedescendant`; group labels are
presentation and their names are repeated in each option's meta. A separate polite live region announces
the count ("3 suggestions") and each status line.

| Key | Effect |
|---|---|
| Down / Up arrow | Moves the active option; opens the list if closed. |
| Enter | Opens the active option, or runs the full search when none is active. |
| Escape | Closes the list; a second Escape clears the field. |
| Home / End | Moves the caret in the field, not the list. |

**Focus:** focus stays in the field the whole time; only the active option changes.

**Labelling:** the field has a visually hidden label, "Search {{app}}". Highlighting uses `mark` and weight,
never colour alone.

**Motion:** none; the list appears and updates instantly.

**Touch:** options are 44px tall; tapping one opens it.

## Content

Group names are plural nouns: **Courses**, **Experts**, **Topics**. Options use the item's real name, with
a meta that tells similar names apart: **Course**, **Philosopher of mind**, **28 items**. Status lines:
**Searching…**, **Enter at least 2 characters.**, **No courses, experts or topics match “liturgy”.**,
**Suggestions aren’t available right now. Press Enter to search.** The foot reads **See all results for
“im”**.

## Do and don't

### Do
Offer the full search even when nothing matches.
```html
<ul class="combobox__list" role="listbox" aria-label="Suggestions for liturgy" style="position: static"><li class="combobox__status" role="presentation">No courses, experts or topics match “liturgy”.</li><li class="combobox__foot" role="option" aria-selected="false">See all results for “liturgy”</li></ul>
```

### Don't
Leave an empty list open with no explanation.
```html
<ul class="combobox__list" role="listbox" aria-label="Suggestions for liturgy" style="position: static"><li class="combobox__group" role="presentation">Courses</li></ul>
```

### Do
Highlight what the person typed.
```html
<ul class="combobox__list" role="listbox" aria-label="Suggestions for ethic" style="position: static"><li class="combobox__option" role="option" aria-selected="false"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 5.5A1.5 1.5 0 0 1 6 4h12.5v14H6a1.5 1.5 0 0 0-1.5 1.5zM4.5 19.5A1.5 1.5 0 0 0 6 21h12.5v-3"/></svg><span class="combobox__text">Christian <mark>Ethic</mark>s for AI Builders</span><span class="combobox__meta">Course</span></li></ul>
```

### Don't
Suggest after a single character.
```html
<ul class="combobox__list" role="listbox" aria-label="Suggestions for i" style="position: static"><li class="combobox__option" role="option" aria-selected="false"><span class="combobox__text"><mark>I</mark>nside a Neural Network in Ten Minutes</span></li><li class="combobox__option" role="option" aria-selected="false"><span class="combobox__text"><mark>I</mark>mago Dei in an Age of Machines</span></li></ul>
```
