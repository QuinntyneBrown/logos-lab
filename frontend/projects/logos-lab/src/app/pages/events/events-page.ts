import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  LOCALE_ID,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { EVENTS_API, EventListQuery } from '@logos-lab/api';
import {
  Badge,
  EventList,
  EventRow,
  PageHeader,
  SearchFilterToolbar,
  ToolbarCount,
} from '@logos-lab/components';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { toEventListingRow } from '../../content/event-listing-row';
import { viewerZone } from '../../content/viewer-zone';
import { EventsState } from './events-state';

@Component({
  selector: 'll-events-page',
  imports: [Badge, EventList, EventRow, PageHeader, SearchFilterToolbar, ToolbarCount],
  templateUrl: './events-page.html',
  styleUrl: './events-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly api = inject(EVENTS_API);

  private readonly query = signal<EventListQuery>({
    tab: 'upcoming',
    format: null,
    topic: null,
    host: null,
    cursor: null,
  });
  private readonly state = toSignal(
    toObservable(this.query).pipe(
      switchMap((query) =>
        this.api.listEvents(query).pipe(
          map((list): EventsState => ({ kind: 'loaded', list })),
          catchError(() => of<EventsState>({ kind: 'failed' })),
          startWith<EventsState>({ kind: 'loading' }),
        ),
      ),
    ),
    { initialValue: { kind: 'loading' } as EventsState },
  );
  protected readonly list = computed(() => {
    const state = this.state();
    return state.kind === 'loaded' ? state.list : null;
  });
  protected readonly total = computed(() =>
    new Intl.NumberFormat(this.locale).format(this.list()?.total ?? 0),
  );
  protected readonly rows = computed(() =>
    (this.list()?.events ?? []).map((event) => toEventListingRow(event, this.locale)),
  );

  private readonly zone = viewerZone(this.locale, new Date());
  protected readonly sub = $localize`:@@events.sub:Live Q&As, workshops and evenings with Logos Lab experts. Times are in your time zone, ${this.zone.long}:zone: (${this.zone.short}:abbreviation:).`;
}
