import { expect, test } from '../fixtures/test';
import { homePage } from '../data/home';
import { HomePage } from '../pages/home.page';

test.describe('Home page events, experts and verse', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(({ api }) => {
    api.respond('GET', '/home', homePage());
  });

  // L2-001 AC3 · event-row AC-1, AC-2, AC-3, badge AC-1
  test('Upcoming events lists the next three events with when, where and their state', async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.open();

    expect(await home.eventTitles()).toEqual([
      'Faith and AI Evening: Is Creativity Sacred?',
      'Live Q&A: Imago Dei and Machine Personhood',
      'Workshop: Writing an AI Policy for Your Church',
    ]);

    const evening = home.eventRow(0);
    await expect(evening.day).toHaveText('22');
    await expect(evening.month).toHaveText('Oct');
    await expect(evening.time).toHaveAttribute('datetime', '2026-10-22T23:00:00Z');
    await expect(evening.titleLink).toHaveAttribute(
      'href',
      '/events/faith-and-ai-evening-is-creativity-sacred',
    );
    await expect(evening.meta).toHaveText([
      'Thu, Oct 22, 7:00 – 9:00 PM EDT',
      "St. Brigid's Hall, Ottawa",
    ]);
    await expect(evening.side).toHaveText('33 places left');

    await expect(home.eventRow(1).meta.nth(1)).toHaveText('Online');
    await expect(home.eventRow(1).side).toHaveText('312 registered');
    await expect(home.eventRow(2).side).toHaveText('Full · waitlist open');
    await expect(home.seeAll(home.events)).toHaveAttribute('href', '/events');
  });

  // L2-001 · person-list AC-1, AC-3
  test('Experts introduces the featured experts with a way to meet them all', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();

    await expect(home.person(0).name).toHaveText('Dr. Abena Mensah');
    await expect(home.person(0).name).toHaveAttribute('href', '/experts/abena-mensah');
    await expect(home.person(0).meta).toHaveText('Theological anthropology · 7 items');
    await expect(home.person(1).meta).toHaveText('Christian ethics · 11 items');
    await expect(home.experts.getByRole('link', { name: 'Meet all our experts' })).toHaveAttribute(
      'href',
      '/experts',
    );
  });

  // testimonial AC-1
  test('the page closes with the verse that gives Logos Lab its name', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();

    await expect(home.verse).toContainText(
      'In the beginning was the Word, and the Word was with God, and the Word was God.',
    );
    await expect(home.verse).toContainText('John 1:1 · the Logos');
  });
});
