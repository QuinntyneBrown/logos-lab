import { expect, test } from '../fixtures/test';
import { content } from '../data/content';
import { homePage } from '../data/home';
import { HomePage } from '../pages/home.page';

test.describe('Home page content', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-001 AC1 · content-card AC-1, AC-2, AC-3
  test('Featured shows the editor’s items in their order, each as a card', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/home', homePage());
    const home = new HomePage(page);
    await home.open();

    expect(await home.cardTitles(home.featured)).toEqual([
      'Imago Dei in an Age of Machines',
      'Can a Machine Pray?',
      'What Augustine Might Say About Large Language Models',
      'AI in the Pulpit',
    ]);

    const course = home.card(home.featured, 0);
    await expect(course.type).toHaveText('Course');
    await expect(course.titleLink).toHaveAttribute(
      'href',
      '/courses/imago-dei-in-an-age-of-machines',
    );
    await expect(course.byline).toHaveText('Dr. Abena Mensah');
    expect(await course.facts()).toEqual(['24 lessons', '5 h 40 min']);
    expect(await course.coverTone()).toBe('tile--sage');

    const video = home.card(home.featured, 1);
    await expect(video.type).toHaveText('Video');
    await expect(video.duration).toHaveText('24:18');
    expect(await video.coverTone()).toBe('tile--fjord');
    expect(await video.facts()).toEqual(['Philosophy of mind']);

    expect(await home.card(home.featured, 2).facts()).toEqual(['12 min read']);
    expect(await home.card(home.featured, 3).facts()).toEqual(['8 items']);
    await expect(home.seeAll(home.featured)).toHaveAttribute('href', '/explore');
  });

  // L2-001 AC2 · content-card AC-3
  test('Latest shows the eight newest items in the order the API sends them', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/home', homePage());
    const home = new HomePage(page);
    await home.open();

    expect(await home.cardTitles(home.latest)).toEqual([
      'Augustine and the Algorithm',
      'Five Questions to Ask Before Your Church Adopts AI',
      'Bias in the Training Data',
      'Live Q&A: Imago Dei and Machine Personhood',
      'Faith, Work and Automation',
      'Sabbath for the Always-On Mind',
      'Inside a Neural Network in Ten Minutes',
      'A Personhood Reading List',
    ]);
    const byLogosLab = home.card(home.latest, 1);
    await expect(byLogosLab.byline).toHaveText('Logos Lab');
    await expect(byLogosLab.logosLabMark).toBeVisible();
    expect(await home.card(home.latest, 2).facts()).toEqual(['20 min', 'Scored']);
    expect(await home.card(home.latest, 3).facts()).toEqual([
      'Tue, Oct 27, 12:00 PM EDT',
      'Online',
    ]);
    expect(await home.card(home.latest, 6).facts()).toEqual(['Free preview']);
    await expect(home.card(home.latest, 3).titleLink).toHaveAttribute(
      'href',
      `/events/${content.liveQa.slug}`,
    );
  });

  // L2-001 · panel AC-1, AC-2
  test('a visitor is invited to start with the "Start Here" collection', async ({ page, api }) => {
    api.respond('GET', '/home', homePage());
    const home = new HomePage(page);
    await home.open();

    await expect(home.startPanel).toBeVisible();
    await expect(
      home.startPanel.getByRole('link', { name: 'Open the collection' }),
    ).toHaveAttribute('href', '/collections/start-here-faith-and-ai');
    await expect(home.startPanel.locator('.panel__item')).toHaveCount(3);
  });
});

test.describe('Home grids across viewports', () => {
  // L2-130 AC1 · content-card AC-11
  for (const [width, columns] of [
    [375, 1],
    [768, 2],
    [1024, 3],
    [1440, 4],
  ] as const) {
    test(`at ${width}px the Latest grid shows ${columns} column(s)`, async ({ page, api }) => {
      await page.setViewportSize({ width, height: 900 });
      api.respond('GET', '/home', homePage());
      const home = new HomePage(page);
      await home.open();
      await home.latest.waitFor();

      expect(await home.gridColumns(home.latest)).toBe(columns);
    });
  }
});
