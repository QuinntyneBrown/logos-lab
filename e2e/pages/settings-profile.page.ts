import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class SettingsProfilePage {
  readonly shell: AppShell;
  readonly settingsNav: Locator;
  readonly currentSection: Locator;
  readonly heading: Locator;
  readonly eyebrow: Locator;
  readonly sub: Locator;
  readonly form: Locator;
  readonly photo: Locator;
  readonly changePhoto: Locator;
  readonly displayName: Locator;
  readonly bio: Locator;
  readonly bioCounter: Locator;
  readonly pronouns: Locator;
  readonly visible: Locator;
  readonly save: Locator;
  readonly viewProfile: Locator;
  readonly loading: Locator;
  readonly alert: Locator;
  readonly tryAgain: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    this.settingsNav = page.getByRole('navigation', { name: 'Settings' });
    this.currentSection = this.settingsNav.locator('[aria-current="page"]');
    this.heading = page.getByRole('heading', { level: 1 });
    const head = page.locator('.page-head');
    this.eyebrow = head.locator('.eyebrow');
    this.sub = head.locator('.page-head__sub');
    this.form = page.locator('form.form-card');
    this.photo = page.getByRole('group', { name: 'Photo' }).getByRole('img');
    this.changePhoto = page.getByRole('button', { name: 'Change photo' });
    this.displayName = page.getByLabel('Display name', { exact: true });
    this.bio = page.locator('textarea#bio');
    this.bioCounter = page.locator('#bio-counter');
    this.pronouns = page.locator('input#pronouns');
    this.visible = page.getByRole('checkbox', { name: /Show my profile page to other members/ });
    this.save = page.getByRole('button', { name: /Save changes|Saving/ });
    this.viewProfile = page.getByRole('link', { name: 'View your profile' });
    this.loading = page.locator('.form-card[aria-busy="true"]');
    this.alert = page.locator('main .alert');
    this.tryAgain = page.getByRole('button', { name: 'Try again' });
  }

  async open(path = '/settings/profile'): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }

  /** Whether a field's help and counter sit on the same row (form-field CRD AC-14). */
  async helpAndCounterShareARow(controlId: string): Promise<boolean> {
    const help = await this.page.locator(`#${controlId}-help`).boundingBox();
    const counter = await this.page.locator(`#${controlId}-counter`).boundingBox();
    return !!help && !!counter && Math.abs(help.y - counter.y) < 4;
  }

  sections(): Locator {
    return this.settingsNav.getByRole('link');
  }
}
