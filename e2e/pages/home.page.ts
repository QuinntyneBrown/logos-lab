import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';
import { ContentCard } from './content-card';

export class HomePage {
  readonly shell: AppShell;
  readonly hero: Locator;
  readonly heading: Locator;
  readonly heroSearch: Locator;
  readonly heroSearchButton: Locator;
  readonly browseCatalogue: Locator;
  readonly heroPhoto: Locator;
  readonly featured: Locator;
  readonly latest: Locator;
  readonly startPanel: Locator;
  readonly events: Locator;
  readonly experts: Locator;
  readonly verse: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    this.hero = page.locator('section.hero');
    this.heading = page.getByRole('heading', { level: 1 });
    this.heroSearch = this.hero.getByRole('searchbox', {
      name: 'Search courses, videos, articles and experts',
    });
    this.heroSearchButton = this.hero.getByRole('button', { name: 'Search' });
    this.browseCatalogue = this.hero.getByRole('link', { name: 'Browse the catalogue' });
    this.heroPhoto = this.hero.locator('.photo img');
    this.featured = page.getByRole('region', { name: 'Featured' });
    this.latest = page.getByRole('region', { name: 'Latest' });
    this.startPanel = page.getByRole('region', { name: 'Start with twelve short pieces' });
    this.events = page.getByRole('region', { name: 'Upcoming events' });
    this.experts = page.getByRole('complementary', { name: 'Experts' });
    this.verse = page.getByRole('region', { name: 'Our name' });
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await this.heading.waitFor();
  }

  card(section: Locator, index: number): ContentCard {
    return new ContentCard(section.locator('article.content-card').nth(index));
  }

  async cardTitles(section: Locator): Promise<string[]> {
    return section.locator('.content-card__title').allInnerTexts();
  }

  eventRow(index: number) {
    const row = this.events.locator('li.event').nth(index);
    return {
      row,
      day: row.locator('.event__day'),
      month: row.locator('.event__mon'),
      time: row.locator('time'),
      titleLink: row.locator('.event__title a'),
      meta: row.locator('.event__meta > span'),
      side: row.locator('.event__side'),
    };
  }

  async eventTitles(): Promise<string[]> {
    return this.events.locator('.event__title').allInnerTexts();
  }

  person(index: number) {
    const row = this.experts.locator('li.person').nth(index);
    return { row, name: row.locator('.person__name a'), meta: row.locator('.person__meta') };
  }

  seeAll(section: Locator): Locator {
    return section.locator('.section__more');
  }

  /** How many columns the section's card grid shows. */
  async gridColumns(section: Locator): Promise<number> {
    return section
      .locator('.content-grid')
      .evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(' ').length);
  }

  async searchFor(query: string): Promise<void> {
    await this.heroSearch.fill(query);
    await this.heroSearch.press('Enter');
  }

  async headingCount(): Promise<number> {
    return this.page.getByRole('heading', { level: 1 }).count();
  }

  title(): Promise<string> {
    return this.page.title();
  }
}
