import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  LOCALE_ID,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EVENTS_API } from '@logos-lab/api';
import {
  Breadcrumb,
  BreadcrumbItem,
  Chip,
  Chips,
  EventHead,
  Person,
  PersonList,
  Prose,
} from '@logos-lab/components';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { eventDay, eventWhen } from '../../content/event-when';
import { NotFoundPage } from '../not-found/not-found-page';
import { EventPageState } from './event-page-state';

@Component({
  selector: 'll-event-page',
  imports: [
    RouterLink,
    Breadcrumb,
    Chip,
    Chips,
    EventHead,
    NotFoundPage,
    Person,
    PersonList,
    Prose,
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

  protected readonly head = computed(() => {
    const event = this.event();
    if (!event) return null;
    const hosts = new Intl.ListFormat(this.locale, { type: 'conjunction' }).format(
      event.hosts.map((host) => host.name),
    );
    return {
      ...eventDay(this.locale, event.startsAt),
      when: eventWhen(this.locale, event.startsAt, event.endsAt),
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
