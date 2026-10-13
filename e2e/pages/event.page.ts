import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class EventPage {
  readonly shell: AppShell;
  readonly breadcrumb: Locator;
  readonly head: Locator;
  readonly heading: Locator;
  readonly date: Locator;
  readonly facts: Locator;
  readonly about: Locator;
  readonly aboutText: Locator;
  readonly topics: Locator;
  readonly hosts: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const main = this.shell.main;
    this.breadcrumb = main.getByRole('navigation', { name: 'Breadcrumb' });
    this.head = main.locator('header.event-head');
    this.heading = page.getByRole('heading', { level: 1 });
    this.date = this.head.locator('.event-head__date');
    this.facts = this.head.locator('.event__meta > span');
    this.about = main.getByRole('region', { name: 'About' });
    this.aboutText = this.about.locator('.prose p');
    this.topics = this.about.getByRole('list', { name: 'Topics' });
    this.hosts = main.getByRole('region', { name: 'Host' }).locator('li.person');
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }
}
