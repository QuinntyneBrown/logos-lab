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
  readonly panel: Locator;
  readonly panelTitle: Locator;
  readonly panelText: Locator;
  readonly panelStatus: Locator;
  readonly panelBadge: Locator;
  readonly notice: Locator;
  readonly noticeTitle: Locator;
  readonly noticeBody: Locator;
  readonly noticeLink: Locator;
  readonly panelLink: Locator;
  readonly places: Locator;
  readonly placesText: Locator;
  readonly panelHelp: Locator;
  readonly signIn: Locator;
  readonly createAccount: Locator;
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
    this.panel = main.locator('aside.rsvp');
    this.panelTitle = this.panel.locator('.rsvp__title');
    this.panelText = this.panel.locator('p.rsvp__text');
    this.panelStatus = this.panel.locator('.inline-status');
    this.panelBadge = this.panel.locator('.badge');
    this.notice = main.locator('.event__notice .alert');
    this.noticeTitle = this.notice.locator('.alert__title');
    this.noticeBody = this.notice.locator('.alert__body');
    this.noticeLink = this.notice.getByRole('link');
    this.panelLink = this.panel.getByRole('link');
    this.places = this.panel.getByRole('progressbar', { name: 'Places taken' });
    this.placesText = this.panel.locator('.rsvp__meter p');
    this.panelHelp = this.panel.locator('p.field__help');
    this.signIn = this.panel.getByRole('link', { name: 'Sign in to register' });
    this.createAccount = this.panel.getByRole('link', { name: 'Create an account' });
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
