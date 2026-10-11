import { ChangeDetectionStrategy, Component } from '@angular/core';

/** A hairline list of event rows, laid out by its own width. */
@Component({
  selector: 'ul[llEventList]',
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'events' },
})
export class EventList {}
