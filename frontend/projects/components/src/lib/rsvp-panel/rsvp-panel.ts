import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ProgressBar } from '../progress-bar/progress-bar';
import { RsvpPanelVariant } from './rsvp-panel-variant';
import { RsvpPlaces } from './rsvp-places';

let nextTitleId = 0;

/** The registration panel of an event page: where the viewer stands, the places, and what they can do. */
@Component({
  selector: 'aside[llRsvpPanel]',
  imports: [ProgressBar],
  templateUrl: './rsvp-panel.html',
  styleUrl: './rsvp-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'rsvp',
    '[class.rsvp--going]': "variant() === 'going'",
    '[class.rsvp--closed]': "variant() === 'closed'",
    '[attr.aria-labelledby]': 'titleId()',
  },
})
export class RsvpPanel {
  readonly variant = input<RsvpPanelVariant>('default');
  /** The title: it changes with the state, so the panel's name says where the person stands. */
  readonly heading = input.required<string>();
  readonly headingLevel = input<2 | 3>(2);
  readonly headingId = input<string | null>(null);
  /** The terms, before the meter. */
  readonly text = input<string | null>(null);
  /** What happens next, after the meter. */
  readonly note = input<string | null>(null);
  readonly places = input<RsvpPlaces | null>(null);

  private readonly generatedId = `ll-rsvp-title-${nextTitleId++}`;
  protected readonly titleId = computed(() => this.headingId() ?? this.generatedId);
  /** Whole percent taken; 100 only when every place is. */
  protected readonly percent = computed(() => {
    const places = this.places();
    return places
      ? Math.floor((Math.min(places.taken, places.capacity) / places.capacity) * 100)
      : 0;
  });
}
