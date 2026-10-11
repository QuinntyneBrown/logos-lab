import { expect, test } from '../fixtures/test';
import { homePage, section } from '../data/home';
import { HomePage } from '../pages/home.page';

test.describe('Home page states', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-127 AC3 · skeleton AC-1, AC-2, event-row AC-10, person-list AC-9
  test('while the sections load, each region is busy and announces it once', async ({
    page,
    api,
  }) => {
    const release = api.hold('GET', '/home', homePage());
    const home = new HomePage(page);
    await home.open();

    await expect(home.loadingMessage(home.featured)).toHaveText('Loading featured content…');
    await expect(home.skeletonCards(home.featured)).toHaveCount(4);
    await expect(home.loadingMessage(home.latest)).toHaveText('Loading the latest content…');
    await expect(home.loadingMessage(home.events)).toHaveText('Loading upcoming events…');
    await expect(home.skeletonRows(home.events)).toHaveCount(3);
    await expect(home.loadingMessage(home.experts)).toHaveText('Loading experts…');
    await expect(home.skeletonRows(home.experts)).toHaveCount(3);

    release();

    await expect(home.card(home.featured, 0).titleLink).toHaveText(
      'Imago Dei in an Age of Machines',
    );
    await expect(home.skeletonCards(home.featured)).toHaveCount(0);
  });

  // L2-001 AC4 · empty-state AC-1, AC-4
  test('with no upcoming events, the events section points to past recordings', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/home', homePage({ upcomingEvents: section([]) }));
    const home = new HomePage(page);
    await home.open();

    const empty = home.emptyState(home.events);
    await expect(empty.title).toHaveText('No events are scheduled right now');
    await expect(empty.action('Watch past event recordings')).toHaveAttribute(
      'href',
      '/events?when=past',
    );
  });

  // L2-141 AC2 · empty-state AC-2
  test('when only the events section fails, the rest of the page still shows and it can be retried', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/home', homePage({ upcomingEvents: section([], 'unavailable') }));
    const home = new HomePage(page);
    await home.open();

    await expect(home.emptyState(home.events).title).toHaveText("Events didn't load");
    await expect(home.card(home.featured, 0).titleLink).toBeVisible();

    api.respond('GET', '/home', homePage());
    await home.retry(home.events);

    await expect(home.eventRow(0).titleLink).toHaveText(
      'Faith and AI Evening: Is Creativity Sacred?',
    );
  });

  // L2-141 AC1, AC2 · empty-state AC-3
  test('when the home request fails, the hero still works and the sections can be retried', async ({
    page,
    api,
  }) => {
    api.fail('GET', '/home', 500);
    const home = new HomePage(page);
    await home.open();

    await expect(home.pageError().title).toHaveText("We couldn't load what's new");
    await expect(home.featured).toHaveCount(0);
    await expect(home.events).toHaveCount(0);
    await expect(home.heroSearch).toBeVisible();
    await expect(home.browseCatalogue).toBeVisible();
    await expect(home.verse).toBeVisible();

    api.respond('GET', '/home', homePage());
    await home.pageError().action('Try again').click();

    await expect(home.card(home.featured, 0).titleLink).toBeVisible();
  });

  // Home-page detailed design: an editor may feature nothing
  test('an empty Featured list hides the section', async ({ page, api }) => {
    api.respond('GET', '/home', homePage({ featured: section([]) }));
    const home = new HomePage(page);
    await home.open();
    await home.latest.waitFor();

    await expect(home.featured).toHaveCount(0);
  });
});
