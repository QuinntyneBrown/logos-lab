import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  LOCALE_ID,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  EVENTS_API,
  EventAttendance,
  EventList as EventListResponse,
  EventListQuery,
  EventListTab,
} from '@logos-lab/api';
import {
  ActiveFilter,
  ActiveFilters,
  Badge,
  Button,
  Checkbox,
  EmptyState,
  EventList,
  EventRow,
  Icon,
  InlineStatus,
  PageHeader,
  SearchFilterToolbar,
  Select,
  Tab,
  Tabs,
  ToolbarCount,
} from '@logos-lab/components';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { toEventListingRow } from '../../content/event-listing-row';
import { viewerZone } from '../../content/viewer-zone';
import { EventsPill } from './events-pill';
import { EventsState } from './events-state';

/** A topic or host slug: lower-case words joined by hyphens. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

@Component({
  selector: 'll-events-page',
  imports: [
    RouterLink,
    ActiveFilter,
    ActiveFilters,
    Badge,
    Button,
    Checkbox,
    EmptyState,
    EventList,
    EventRow,
    Icon,
    InlineStatus,
    PageHeader,
    SearchFilterToolbar,
    Select,
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
  private readonly router = inject(Router);
  private readonly params = toSignal(inject(ActivatedRoute).queryParamMap, { requireSync: true });

  /** Anything but `past` in the address is the upcoming events. */
  protected readonly tab = computed<EventListTab>(() =>
    this.params().get('tab') === 'past' ? 'past' : 'upcoming',
  );
  protected readonly formats: readonly { value: EventAttendance; label: string }[] = [
    { value: 'online', label: $localize`:@@events.format.online:Online` },
    { value: 'in-person', label: $localize`:@@events.format.inPerson:In person` },
    { value: 'hybrid', label: $localize`:@@events.format.hybrid:Hybrid` },
  ];

  /** What the address asks for; a value it does not know is dropped. */
  protected readonly query = computed<EventListQuery>(
    () => {
      const format = this.params().get('format');
      const topic = this.params().get('topic') ?? '';
      const host = this.params().get('host') ?? '';
      const tab = this.tab();
      return {
        tab,
        format: this.formats.find((f) => f.value === format)?.value ?? null,
        topic: SLUG.test(topic) ? topic : null,
        host: SLUG.test(host) ? host : null,
        recording: tab === 'past' && this.params().get('recording') === '1',
        cursor: null,
      };
    },
    {
      equal: (a, b) =>
        a.tab === b.tab &&
        a.format === b.format &&
        a.topic === b.topic &&
        a.host === b.host &&
        a.recording === b.recording,
    },
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
  /** The last options seen, so the selects keep their choices while the next list loads. */
  private readonly lastList = linkedSignal<EventsState, EventListResponse | null>({
    source: this.state,
    computation: (state, previous) =>
      state.kind === 'loaded' ? state.list : (previous?.value ?? null),
  });
  protected readonly topics = computed(() => this.lastList()?.topics ?? []);
  protected readonly hosts = computed(() => this.lastList()?.hosts ?? []);

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

  private readonly recordingLabel = $localize`:@@events.recording:Recording available`;
  /** The filters that are on, in the order the toolbar offers them. */
  protected readonly pills = computed<readonly EventsPill[]>(() => {
    const query = this.query();
    const pill = (group: string, value: string, remove: () => void): EventsPill => {
      const label = $localize`:@@events.pill:${group}:group:: ${value}:value:`;
      return {
        label,
        removeLabel: $localize`:@@events.pill.remove:Remove filter ${label}:pill:`,
        remove,
      };
    };
    const pills: EventsPill[] = [];
    const format = this.formats.find((f) => f.value === query.format);
    if (format) {
      pills.push(
        pill($localize`:@@events.filter.format:Format`, format.label, () =>
          this.go({ format: null }),
        ),
      );
    }
    if (query.topic) {
      const name = this.topics().find((t) => t.slug === query.topic)?.name ?? query.topic;
      pills.push(
        pill($localize`:@@events.filter.topic:Topic`, name, () => this.go({ topic: null })),
      );
    }
    if (query.host) {
      const name = this.hosts().find((h) => h.slug === query.host)?.name ?? query.host;
      pills.push(pill($localize`:@@events.filter.host:Host`, name, () => this.go({ host: null })));
    }
    if (query.recording) {
      const label = this.recordingLabel;
      pills.push({
        label,
        removeLabel: $localize`:@@events.pill.remove:Remove filter ${label}:pill:`,
        remove: () => this.go({ recording: false }),
      });
    }
    return pills;
  });

  /** Nothing matched the filters that are on, though the tab has events. */
  protected readonly noMatches = computed(() => {
    const list = this.list();
    if (!list || list.total > 0 || list.totalEvents === 0 || this.pills().length === 0) return null;
    const names = new Intl.ListFormat(this.locale, { type: 'conjunction' }).format(
      this.pills().map((pill) => pill.label.replace(/^[^:]+: /, '')),
    );
    const all = new Intl.NumberFormat(this.locale).format(list.totalEvents);
    return {
      names,
      text: $localize`:@@events.none.text:Try another format, topic or host, or clear the filters to see all ${all}:count:.`,
    };
  });

  protected setFormat(value: string): void {
    this.go({ format: this.formats.find((f) => f.value === value)?.value ?? null });
  }
  protected setTopic(value: string): void {
    this.go({ topic: value || null });
  }
  protected setHost(value: string): void {
    this.go({ host: value || null });
  }
  protected setRecording(on: boolean): void {
    this.go({ recording: on });
  }
  protected clearFilters(): void {
    this.go({ format: null, topic: null, host: null, recording: false });
  }

  /** Writes the filters to the address, replacing the last one, and so loads the list again. */
  private go(changes: Partial<Omit<EventListQuery, 'tab' | 'cursor'>>): void {
    const next = { ...this.query(), ...changes };
    void this.router.navigate(['/events'], {
      queryParams: {
        tab: next.tab === 'past' ? 'past' : null,
        format: next.format,
        topic: next.topic,
        host: next.host,
        recording: next.recording ? '1' : null,
      },
      replaceUrl: true,
    });
  }

  private readonly zone = viewerZone(this.locale, new Date());
  protected readonly sub = $localize`:@@events.sub:Live Q&As, workshops and evenings with Logos Lab experts. Times are in your time zone, ${this.zone.long}:zone: (${this.zone.short}:abbreviation:).`;
}
