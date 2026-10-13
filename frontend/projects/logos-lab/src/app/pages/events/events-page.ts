import { ChangeDetectionStrategy, Component, computed, inject, LOCALE_ID } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EVENTS_API, EventListQuery, EventListTab } from '@logos-lab/api';
import {
  Badge,
  Button,
  EventList,
  EventRow,
  Icon,
  InlineStatus,
  PageHeader,
  SearchFilterToolbar,
  Tab,
  Tabs,
  ToolbarCount,
} from '@logos-lab/components';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { toEventListingRow } from '../../content/event-listing-row';
import { viewerZone } from '../../content/viewer-zone';
import { EventsState } from './events-state';

@Component({
  selector: 'll-events-page',
  imports: [
    RouterLink,
    Badge,
    Button,
    EventList,
    EventRow,
    Icon,
    InlineStatus,
    PageHeader,
    SearchFilterToolbar,
    Tab,
    Tabs,
    ToolbarCount,
  ],
  templateUrl: './events-page.html',
  styleUrl: './events-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly api = inject(EVENTS_API);
  private readonly params = toSignal(inject(ActivatedRoute).queryParamMap, { requireSync: true });

  /** Anything but `past` in the address is the upcoming events. */
  protected readonly tab = computed<EventListTab>(() =>
    this.params().get('tab') === 'past' ? 'past' : 'upcoming',
  );
  private readonly query = computed<EventListQuery>(
    () => ({ tab: this.tab(), format: null, topic: null, host: null, cursor: null }),
    { equal: (a, b) => a.tab === b.tab },
  );
  private readonly state = toSignal(
    toObservable(this.query).pipe(
      switchMap((query) =>
        this.api.listEvents(query).pipe(
          map((list): EventsState => ({ kind: 'loaded', list, tab: query.tab })),
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
  /** The tab the list on show was asked for, which is not the address's while a new one loads. */
  protected readonly listedTab = computed(() => {
    const state = this.state();
    return state.kind === 'loaded' ? state.tab : null;
  });
  protected readonly total = computed(() =>
    new Intl.NumberFormat(this.locale).format(this.list()?.total ?? 0),
  );
  protected readonly rows = computed(() => {
    const past = this.listedTab() === 'past';
    return (this.list()?.events ?? []).map((event) =>
      toEventListingRow(event, this.locale, new Date(), past),
    );
  });
  protected readonly happeningNow = computed(
    () => (this.list()?.events ?? []).filter((event) => event.happeningNow).length,
  );

  private readonly zone = viewerZone(this.locale, new Date());
  protected readonly sub = $localize`:@@events.sub:Live Q&As, workshops and evenings with Logos Lab experts. Times are in your time zone, ${this.zone.long}:zone: (${this.zone.short}:abbreviation:).`;
}
