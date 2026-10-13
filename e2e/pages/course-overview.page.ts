import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class CourseOverviewPage {
  readonly shell: AppShell;
  readonly breadcrumb: Locator;
  readonly eyebrow: Locator;
  readonly heading: Locator;
  readonly summary: Locator;
  readonly cover: Locator;
  readonly outcomes: Locator;
  readonly contentSummary: Locator;
  readonly outline: Locator;
  readonly sections: Locator;
  readonly lessons: Locator;
  readonly taughtBy: Locator;
  readonly facts: Locator;
  readonly topics: Locator;
  readonly talk: Locator;
  readonly signIn: Locator;
  readonly createAccount: Locator;
  readonly enrol: Locator;
  readonly enrolling: Locator;
  readonly enrolAlertTitle: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const main = this.shell.main;
    this.breadcrumb = main.getByRole('navigation', { name: 'Breadcrumb' });
    this.eyebrow = main.locator('.hero .eyebrow');
    this.heading = page.getByRole('heading', { level: 1 });
    this.summary = main.locator('.hero__lead');
    this.cover = main.locator('.hero__aside .content-card__cover, .hero__aside img');
    this.outcomes = main.getByRole('region', { name: 'What you’ll learn' }).getByRole('listitem');
    this.contentSummary = main.getByRole('region', { name: 'Course content' }).locator('p.muted');
    this.outline = main.getByRole('navigation', { name: 'Course outline' });
    this.sections = this.outline.locator('.outline__section');
    this.lessons = this.outline.locator('.outline__lesson');
    this.taughtBy = main.getByRole('region', { name: 'Taught by' });
    this.facts = main.getByRole('region', { name: 'About this course' }).locator('dl > div');
    this.topics = main.getByRole('list', { name: 'Topics' });
    this.talk = main.getByRole('region', { name: 'Talk about it' });
    const actions = main.locator('.hero__actions');
    this.signIn = actions.getByRole('link', { name: 'Sign in to enrol' });
    this.createAccount = actions.getByRole('link', { name: 'Create a free account' });
    this.enrol = actions.getByRole('button', { name: 'Enrol' });
    this.enrolling = actions.getByRole('button', { name: 'Enrolling…' });
    this.enrolAlertTitle = main.locator('.course__alert .alert__title');
  }

  /** The names of the sections with their counts: "1. Beginnings4 lessons". */
  async sectionSummaries(): Promise<string[]> {
    return this.sections.locator('summary').allTextContents();
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }
}
