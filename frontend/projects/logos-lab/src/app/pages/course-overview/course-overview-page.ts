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
import { COURSES_API, CourseLevel, MyCourseState, RELATED_CONTENT_API } from '@logos-lab/api';
import {
  Alert,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Chip,
  Chips,
  ContentCard,
  CourseOutline,
  CourseOutlineSectionToggle,
  DescriptionList,
  Hero,
  List,
} from '@logos-lab/components';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { toContentCard } from '../../content/content-card-view';
import { hoursAndMinutes } from '../../content/content-facts';
import { OutlineViewer, toCourseOutline } from '../../content/course-outline-view';
import { plural } from '../../content/plural';
import { Session } from '../../session';
import { NotFoundPage } from '../not-found/not-found-page';
import { CourseOverviewState } from './course-overview-state';
import { MyStateStatus } from './my-state-status';

@Component({
  selector: 'll-course-overview-page',
  imports: [
    RouterLink,
    Alert,
    Avatar,
    Breadcrumb,
    Button,
    Card,
    Chip,
    Chips,
    ContentCard,
    CourseOutline,
    DescriptionList,
    Hero,
    List,
    NotFoundPage,
  ],
  templateUrl: './course-overview-page.html',
  styleUrl: './course-overview-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseOverviewPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly api = inject(COURSES_API);
  private readonly relatedApi = inject(RELATED_CONTENT_API);
  protected readonly session = inject(Session);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly params = toSignal(this.route.paramMap, { requireSync: true });
  private readonly attempt = signal(0);
  protected readonly slug = computed(() => this.params().get('slug') ?? '');

  private readonly state = toSignal(
    toObservable(computed(() => ({ slug: this.slug(), attempt: this.attempt() }))).pipe(
      switchMap(({ slug }) =>
        this.api.getCourse(slug).pipe(
          map((course): CourseOverviewState => ({ kind: 'loaded', course })),
          catchError((error: unknown) =>
            of<CourseOverviewState>({
              kind:
                error instanceof HttpErrorResponse && error.status === 404 ? 'not-found' : 'failed',
            }),
          ),
          startWith<CourseOverviewState>({ kind: 'loading' }),
        ),
      ),
    ),
    { initialValue: { kind: 'loading' } as CourseOverviewState },
  );

  protected readonly course = computed(() => {
    const state = this.state();
    return state.kind === 'loaded' ? state.course : null;
  });
  protected readonly notFound = computed(() => this.state().kind === 'not-found');
  protected readonly failed = computed(() => this.state().kind === 'failed');

  /** The related items as cards; a failed request is the same as nothing related. */
  protected readonly related = toSignal(
    toObservable(computed(() => this.course()?.id ?? null)).pipe(
      switchMap((id) =>
        id === null
          ? of([])
          : this.relatedApi.getRelated(id).pipe(
              map((items) => items.slice(0, 4).map((item) => toContentCard(item, this.locale))),
              catchError(() => of([])),
            ),
      ),
    ),
    { initialValue: [] },
  );

  /** The member's own state in the course, asked for once the page shows and only for a member. */
  private readonly myState = toSignal(
    toObservable(
      computed(() => ({
        slug: this.course()?.slug ?? null,
        member: this.session.member(),
        attempt: this.attempt(),
      })),
    ).pipe(
      switchMap(({ slug, member }) =>
        !slug || !member
          ? of<MyStateStatus>({ kind: 'none' })
          : this.api.getMyCourseState(slug).pipe(
              map((state): MyStateStatus => ({ kind: 'loaded', state })),
              catchError(() => of<MyStateStatus>({ kind: 'failed' })),
              startWith<MyStateStatus>({ kind: 'none' }),
            ),
      ),
    ),
    { initialValue: { kind: 'none' } as MyStateStatus },
  );
  protected readonly mine = computed<MyCourseState | null>(() => {
    const status = this.myState();
    return status.kind === 'loaded' ? status.state : null;
  });

  /** Who is looking: decides the hero's actions and how the outline reads. */
  protected readonly viewer = computed<'visitor' | 'pending' | 'member'>(() => {
    const member = this.session.member();
    if (member === null) return 'visitor';
    if (member === undefined || this.mine() === null) return 'pending';
    return 'member';
  });

  /** The sections the learner opened or closed themselves, kept while the page lives. */
  private readonly sectionChoices = signal<Readonly<Record<string, boolean>>>({});
  protected readonly outline = computed(() => {
    const course = this.course();
    if (!course) return [];
    const viewer: OutlineViewer = this.session.member() === null ? 'visitor' : 'member';
    return toCourseOutline(course, this.mine(), viewer, course.slug, this.sectionChoices());
  });

  protected remember(toggle: CourseOutlineSectionToggle): void {
    this.sectionChoices.update((choices) => ({ ...choices, [toggle.id]: toggle.open }));
  }

  protected readonly returnQuery = computed(() => ({ returnUrl: this.router.url }));
  protected readonly enrolling = signal(false);
  protected readonly enrolFailed = signal(false);

  /** Enrols the member and opens the first lesson. */
  protected enrol(): void {
    const course = this.course();
    if (!course || this.enrolling()) return;
    this.enrolling.set(true);
    this.enrolFailed.set(false);
    this.api.enrol(course.slug).subscribe({
      next: (result) => {
        void this.router.navigate(['/courses', course.slug, 'lessons', result.firstLessonId]);
      },
      error: () => {
        this.enrolling.set(false);
        this.enrolFailed.set(true);
      },
    });
  }

  constructor() {
    const title = inject(Title);
    effect(() => {
      const name = this.course()?.title;
      if (name) title.setTitle($localize`:@@course.pageTitle:${name}:title: - Logos Lab`);
      else if (this.notFound())
        title.setTitle($localize`:@@notFound.pageTitle:Page not found - Logos Lab`);
    });
  }

  protected retry(): void {
    this.attempt.update((n) => n + 1);
  }

  protected readonly trail = computed<readonly BreadcrumbItem[]>(() => [
    { label: $localize`:@@course.crumb.courses:Courses`, path: '/explore?type=course' },
    { label: this.course()?.title ?? '', path: null },
  ]);

  protected readonly eyebrow = computed(() => {
    const names = (this.course()?.contributors ?? []).map((c) => c.name);
    const who = new Intl.ListFormat(this.locale, { style: 'long', type: 'conjunction' }).format(
      names,
    );
    return $localize`:@@course.eyebrow:Course · ${who}:contributors:`;
  });

  private readonly lessonCount = computed(() =>
    (this.course()?.sections ?? []).reduce((total, section) => total + section.lessons.length, 0),
  );
  private readonly format = computed(() => new Intl.NumberFormat(this.locale));
  protected readonly length = computed(() => hoursAndMinutes(this.course()?.totalMinutes ?? 0));

  protected readonly contentSummary = computed(() => {
    const sections = this.course()?.sections.length ?? 0;
    const lessons = this.lessonCount();
    const length = this.length();
    const sectionText = plural(this.locale, sections, {
      one: $localize`:@@course.sections.one:${sections}:count: section`,
      other: $localize`:@@course.sections.other:${sections}:count: sections`,
    });
    const lessonText = plural(this.locale, lessons, {
      one: $localize`:@@course.lessons.one:${lessons}:count: lesson`,
      other: $localize`:@@course.lessons.other:${lessons}:count: lessons`,
    });
    return $localize`:@@course.contentSummary:${sectionText}:sections: · ${lessonText}:lessons: · about ${length}:length:.`;
  });

  /** How lessons open, said for the viewer: a visitor is also told to sign in. */
  protected readonly openingRule = computed(() => {
    const free = this.course()?.navigation === 'free';
    switch (this.viewer()) {
      case 'visitor':
        return free
          ? $localize`:@@course.rule.visitor.free:Sign in and enrol to open the lessons; they open in any order.`
          : $localize`:@@course.rule.visitor.sequential:Sign in and enrol to open the lessons; they open in order.`;
      case 'member':
        return free
          ? $localize`:@@course.rule.member.free:Enrol to open the lessons; they open in any order.`
          : $localize`:@@course.rule.member.sequential:Enrol to open the lessons; they open in order.`;
      default:
        return '';
    }
  });

  protected readonly lessonsFact = computed(() => {
    const sections = this.course()?.sections.length ?? 0;
    const lessons = this.lessonCount();
    return $localize`:@@course.fact.lessons:${lessons}:lessons: in ${sections}:sections: sections`;
  });
  protected readonly lengthFact = computed(
    () => $localize`:@@course.fact.length:About ${this.length()}:length:`,
  );
  protected readonly levelFact = computed(() => {
    const labels: Record<CourseLevel, string> = {
      beginner: $localize`:@@course.level.beginner:Beginner`,
      intermediate: $localize`:@@course.level.intermediate:Intermediate`,
      advanced: $localize`:@@course.level.advanced:Advanced`,
    };
    return labels[this.course()?.level ?? 'beginner'];
  });
  protected readonly orderFact = computed(() =>
    this.course()?.navigation === 'free'
      ? $localize`:@@course.order.free:In any order`
      : $localize`:@@course.order.sequential:In sequence`,
  );
  protected readonly learnersFact = computed(() => {
    const count = this.course()?.enrolledCount ?? 0;
    const formatted = this.format().format(count);
    return $localize`:@@course.fact.learners:${formatted}:count: enrolled`;
  });
  protected readonly commentsText = computed(() => {
    const count = this.course()?.commentCount ?? 0;
    const formatted = this.format().format(count);
    return plural(this.locale, count, {
      one: $localize`:@@course.comments.one:${formatted}:count: comment from learners.`,
      other: $localize`:@@course.comments.other:${formatted}:count: comments from learners.`,
    });
  });
}
