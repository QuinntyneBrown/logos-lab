import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  LOCALE_ID,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EVENTS_API } from '@logos-lab/api';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Chip,
  Chips,
  EventHead,
  Person,
  PersonList,
  Prose,
  Timeline,
} from '@logos-lab/components';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { eventDay, eventTime, eventWhen } from '../../content/event-when';
import { viewerZone } from '../../content/viewer-zone';
import { NotFoundPage } from '../not-found/not-found-page';
import { EventPageState } from './event-page-state';

@Component({
  selector: 'll-event-page',
  imports: [
    RouterLink,
    Breadcrumb,
    Button,
    ButtonGroup,
    Chip,
    Chips,
    EventHead,
    NotFoundPage,
    Person,
    PersonList,
    Prose,
    Timeline,
  ],
  templateUrl: './event-page.html',
  styleUrl: './event-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly api = inject(EVENTS_API);
  private readonly params = toSignal(inject(ActivatedRoute).paramMap, { requireSync: true });
  protected readonly slug = computed(() => this.params().get('slug') ?? '');

  private readonly state = toSignal(
    toObservable(this.slug).pipe(
      switchMap((slug) =>
        this.api.getEvent(slug).pipe(
          map((event): EventPageState => ({ kind: 'loaded', event })),
          catchError((error: unknown) =>
            of<EventPageState>({
              kind:
                error instanceof HttpErrorResponse && error.status === 404 ? 'not-found' : 'failed',
            }),
          ),
          startWith<EventPageState>({ kind: 'loading' }),
        ),
      ),
    ),
    { initialValue: { kind: 'loading' } as EventPageState },
  );
  protected readonly event = computed(() => {
    const state = this.state();
    return state.kind === 'loaded' ? state.event : null;
  });
  protected readonly notFound = computed(() => this.state().kind === 'not-found');

  protected readonly trail = computed<readonly BreadcrumbItem[]>(() => [
    { label: $localize`:@@eventPage.crumb.events:Events`, path: '/events' },
    { label: this.event()?.title ?? '', path: null },
  ]);

  /** Whose time the page shows: the viewer's own until they ask for the event's. */
  protected readonly inEventZone = signal(false);
  private readonly zone = computed(() => (this.inEventZone() ? this.event()?.timeZone : undefined));
  private readonly start = computed(() => new Date(this.event()?.startsAt ?? Date.now()));
  private readonly yourZone = computed(() => viewerZone(this.locale, this.start()));
  private readonly eventZone = computed(() =>
    viewerZone(this.locale, this.start(), this.event()?.timeZone),
  );
  protected readonly zoneNote = computed(() => {
    const { long, short } = this.inEventZone() ? this.eventZone() : this.yourZone();
    return $localize`:@@eventPage.zoneNote:Times in ${long}:zone: (${short}:abbreviation:).`;
  });
  protected readonly yourTimeLabel = computed(() => {
    const zone = this.yourZone().short;
    return $localize`:@@eventPage.yourTime:Your time (${zone}:zone:)`;
  });
  protected readonly eventTimeLabel = computed(() => {
    const zone = this.eventZone().short;
    return $localize`:@@eventPage.eventTime:Event time (${zone}:zone:)`;
  });

  protected readonly agenda = computed(() =>
    (this.event()?.agenda ?? []).map((item) => ({
      startsAt: item.startsAt,
      time: eventTime(this.locale, item.startsAt, this.zone()),
      text: item.text,
    })),
  );

  protected readonly head = computed(() => {
    const event = this.event();
    if (!event) return null;
    const hosts = new Intl.ListFormat(this.locale, { type: 'conjunction' }).format(
      event.hosts.map((host) => host.name),
    );
    return {
      ...eventDay(this.locale, event.startsAt, this.zone()),
      when: eventWhen(this.locale, event.startsAt, event.endsAt, this.zone()),
      where: $localize`:@@eventPage.where.online:Online`,
      hosts: hosts ? $localize`:@@eventPage.hostedBy:Hosted by ${hosts}:hosts:` : '',
    };
  });

  constructor() {
    const title = inject(Title);
    effect(() => {
      const name = this.event()?.title;
      if (name) title.setTitle($localize`:@@eventPage.pageTitle:${name}:title: - Logos Lab`);
      else if (this.notFound())
        title.setTitle($localize`:@@notFound.pageTitle:Page not found - Logos Lab`);
    });
  }
}
