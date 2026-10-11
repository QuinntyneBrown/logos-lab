import { ContentSummary } from '../content/content-summary';
import { EventSummary } from './event-summary';
import { ExpertSummary } from './expert-summary';
import { Section } from './section';

/** GET /api/v1/home: the four public sections of the home page. */
export interface HomePageView {
  readonly featured: Section<ContentSummary>;
  readonly latest: Section<ContentSummary>;
  readonly upcomingEvents: Section<EventSummary>;
  readonly featuredExperts: Section<ExpertSummary>;
}
