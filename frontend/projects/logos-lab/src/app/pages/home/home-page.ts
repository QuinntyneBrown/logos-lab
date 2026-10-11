import { ChangeDetectionStrategy, Component, computed, inject, LOCALE_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { HOME_API } from '@logos-lab/api';
import {
  Badge,
  Button,
  ContentCard,
  EventList,
  EventRow,
  Hero,
  Icon,
  Panel,
  Person,
  PersonList,
  Search,
  Verse,
} from '@logos-lab/components';
import { catchError, map, of, startWith } from 'rxjs';
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
    Panel,
    Icon,
    EventList,
    EventRow,
    Badge,
    PersonList,
    Person,
    Verse,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly searchNavigation = inject(SearchNavigation);
  private readonly locale = inject(LOCALE_ID);

  protected readonly state = toSignal(
    inject(HOME_API)
      .getHome()
      .pipe(
        map((view): HomeState => ({ kind: 'loaded', view })),
        catchError(() => of<HomeState>({ kind: 'failed' })),
        startWith<HomeState>({ kind: 'loading' }),
      ),
    { requireSync: true },
  );

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
