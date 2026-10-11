import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  LOCALE_ID,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { HOME_API } from '@logos-lab/api';
import {
  Badge,
  Button,
  ContentCard,
  EmptyState,
  EventList,
  EventRow,
  Hero,
  Icon,
  Panel,
  Person,
  PersonList,
  Search,
  SkeletonCard,
  Verse,
} from '@logos-lab/components';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { toContentCard } from '../../content/content-card-view';
import { toEventRow } from '../../content/event-row-view';
import { toExpertPerson } from '../../content/expert-person-view';
import { SearchNavigation } from '../../search-navigation';
import { HomeState } from './home-state';

@Component({
  selector: 'll-home-page',
  imports: [
    RouterLink,
    Hero,
    Search,
    Button,
    ContentCard,
    EmptyState,
    Panel,
    Icon,
    EventList,
    EventRow,
    Badge,
    PersonList,
    Person,
    Verse,
    EmptyState,
    SkeletonCard,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly searchNavigation = inject(SearchNavigation);
  private readonly locale = inject(LOCALE_ID);
  private readonly homeApi = inject(HOME_API);
  private readonly attempt = signal(0);

  protected readonly state = toSignal(
    toObservable(this.attempt).pipe(
      switchMap(() =>
        this.homeApi.getHome().pipe(
          map((view): HomeState => ({ kind: 'loaded', view })),
          catchError(() => of<HomeState>({ kind: 'failed' })),
          startWith<HomeState>({ kind: 'loading' }),
        ),
      ),
    ),
    { initialValue: { kind: 'loading' } as HomeState },
  );

  /** Skeleton placeholders while loading: four cards, three rows. */
  protected readonly placeholderCards = [0, 1, 2, 3];
  protected readonly placeholderRows = [0, 1, 2];

  protected readonly loadingEventsLabel = $localize`:@@home.events.loading:Loading upcoming events…`;
  protected readonly loadingExpertsLabel = $localize`:@@home.experts.loading:Loading experts…`;

  protected retry(): void {
    this.attempt.update((n) => n + 1);
  }

  protected readonly loading = computed(() => this.state().kind === 'loading');
  protected readonly failed = computed(() => this.state().kind === 'failed');
  protected readonly eventsStatus = computed(() => this.view()?.upcomingEvents.status ?? null);
  protected readonly expertsStatus = computed(() => this.view()?.featuredExperts.status ?? null);

  private readonly view = computed(() => {
    const state = this.state();
    return state.kind === 'loaded' ? state.view : null;
  });

  protected readonly featured = computed(
    () => this.view()?.featured.items.map((item) => toContentCard(item, this.locale)) ?? [],
  );
  protected readonly latest = computed(
    () => this.view()?.latest.items.map((item) => toContentCard(item, this.locale)) ?? [],
  );
  protected readonly events = computed(
    () => this.view()?.upcomingEvents.items.map((event) => toEventRow(event, this.locale)) ?? [],
  );
  protected readonly experts = computed(
    () =>
      this.view()?.featuredExperts.items.map((expert) => toExpertPerson(expert, this.locale)) ?? [],
  );
}
