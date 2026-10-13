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
  readonly where: Locator;
  readonly venueName: Locator;
  readonly venueAddress: Locator;
  readonly mapsLink: Locator;
  readonly zoneToggle: Locator;
  readonly agenda: Locator;
  readonly agendaItems: Locator;
  readonly agendaNote: Locator;

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
    this.zoneToggle = this.head.getByRole('group', { name: 'Show times in' });
    this.agenda = main.getByRole('region', { name: 'Agenda' });
    this.agendaItems = this.agenda.locator('ol.timeline > li');
    this.agendaNote = this.agenda.locator('.field__help');
    this.where = main.getByRole('region', { name: 'Where' });
    this.venueName = this.where.locator('strong');
    this.venueAddress = this.where.locator('address');
    this.mapsLink = this.where.getByRole('link', { name: 'Open in your maps app' });
    this.hosts = main.getByRole('region', { name: 'Host' }).locator('li.person');
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }

  /** A segment of the time zone toggle, by its label: "Your time (ET)". */
  zone(label: string): Locator {
    return this.zoneToggle.getByRole('button', { name: label });
  }
}
