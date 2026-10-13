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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EVENTS_API, EventAttendance, EventPageModel, EventVenue } from '@logos-lab/api';
import {
  Badge,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Chip,
  Chips,
  EventHead,
  Icon,
  InlineStatus,
  Person,
  PersonList,
  Prose,
  RsvpPanel,
  Timeline,
} from '@logos-lab/components';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { eventDay, eventTime, eventWhen } from '../../content/event-when';
import { viewerZone } from '../../content/viewer-zone';
import { Session } from '../../session';
import { NotFoundPage } from '../not-found/not-found-page';
import { toEventNotice } from './to-event-notice';
import { toEventPanel } from './to-event-panel';
import { EventPageState } from './event-page-state';
import { EventViewer } from './event-viewer';
import { MyEventStatus } from './my-event-status';

@Component({
  selector: 'll-event-page',
  imports: [
    RouterLink,
    Alert,
    Badge,
    Breadcrumb,
    Button,
    ButtonGroup,
    Chip,
    Chips,
    EventHead,
    Icon,
    NotFoundPage,
    Person,
    InlineStatus,
    PersonList,
    Prose,
    RsvpPanel,
    Timeline,
  ],
  templateUrl: './event-page.html',
  styleUrl: './event-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly api = inject(EVENTS_API);
  private readonly session = inject(Session);
  private readonly router = inject(Router);
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

  /** The head's first fact: the time, "Was …" once cancelled, and "· ended" once over. */
  private when(event: EventPageModel): string {
    const when = eventWhen(this.locale, event.startsAt, event.endsAt, this.zone());
    if (event.cancellation) return $localize`:@@eventPage.when.was:Was ${when}:when:`;
    return new Date() >= new Date(event.endsAt)
      ? $localize`:@@eventPage.when.ended:${when}:when: · ended`
      : when;
  }

  /** "Hybrid · online and at St. Brigid's Hall, Ottawa". */
  private where(attendance: EventAttendance, venue: EventVenue | null): string {
    const place = venue ? `${venue.name}, ${venue.city}` : null;
    switch (attendance) {
      case 'online':
        return $localize`:@@eventPage.where.online:Online`;
      case 'hybrid':
        return place
          ? $localize`:@@eventPage.where.hybrid:Hybrid · online and at ${place}:place:`
          : $localize`:@@eventPage.where.hybridNoVenue:Hybrid · online and in person`;
      default:
        return place
          ? $localize`:@@eventPage.where.inPerson:In person · ${place}:place:`
          : $localize`:@@eventPage.where.inPersonNoVenue:In person`;
    }
  }

  /** The address in the maps app of the viewer's device. */
  protected mapsLink(venue: EventVenue): string {
    return `geo:0,0?q=${encodeURIComponent(venue.address)}`;
  }

  /** The member's own place in the event, asked for once the page shows and only for a member. */
  private readonly mine = toSignal(
    toObservable(
      computed(() => ({ id: this.event()?.id ?? null, member: this.session.member() })),
    ).pipe(
      switchMap(({ id, member }) =>
        !id || !member
          ? of<MyEventStatus>({ kind: 'none' })
          : this.api.getMyEvent(id).pipe(
              map((state): MyEventStatus => ({ kind: 'loaded', state })),
              catchError(() => of<MyEventStatus>({ kind: 'failed' })),
              startWith<MyEventStatus>({ kind: 'pending' }),
            ),
      ),
    ),
    { initialValue: { kind: 'none' } as MyEventStatus },
  );
  /** Who is looking; `null` while the session or the member's own state is still coming. */
  private readonly viewer = computed<EventViewer | null>(() => {
    const member = this.session.member();
    if (member === undefined) return null;
    if (member === null) return 'visitor';
    const mine = this.mine();
    if (mine.kind === 'pending') return null;
    if (mine.kind !== 'loaded') return 'member';
    return mine.state.registration?.status ?? 'member';
  });

  protected readonly returnQuery = computed(() => ({ returnUrl: this.router.url }));
  protected readonly panel = computed(() => {
    const event = this.event();
    const viewer = this.viewer();
    const mine = this.mine();
    if (!event || !viewer) return null;
    const position = mine.kind === 'loaded' ? mine.state.registration?.waitlistPosition : null;
    return toEventPanel({
      event,
      viewer,
      waitlistPosition: position ?? null,
      now: new Date(),
      locale: this.locale,
      timeZone: this.zone(),
    });
  });

  protected readonly notice = computed(() => {
    const event = this.event();
    return event
      ? toEventNotice(event, this.viewer() === 'registered', this.locale, this.zone())
      : null;
  });

  protected readonly head = computed(() => {
    const event = this.event();
    if (!event) return null;
    const hosts = new Intl.ListFormat(this.locale, { type: 'conjunction' }).format(
      event.hosts.map((host) => host.name),
    );
    return {
      ...eventDay(this.locale, event.startsAt, this.zone()),
      when: this.when(event),
      cancelled: event.cancellation !== null,
      where: this.where(event.attendance, event.venue),
      online: event.attendance === 'online',
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
