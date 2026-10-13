import { cataloguePage, coursesAndVideosPage, coursesPage } from '../data/catalogue';
import { expect, test } from '../fixtures/test';
import { ExplorePage } from '../pages/explore.page';

test.describe('Explore', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-002 AC1 · page-header AC-1, search-filter-toolbar AC-1, content-card AC-1
  test('opens on the newest items, each as a card', async ({ page, api }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    const explore = new ExplorePage(page);

    await explore.open();

    await expect(explore.eyebrow).toHaveText('The catalogue');
    await expect(explore.heading).toHaveText('Explore');
    await expect(explore.sub).toHaveText(
      'Every published course, module, video, article, collection and event, from 38 experts and the Logos Lab editors.',
    );
    await expect(page).toHaveTitle('Explore - Logos Lab');
    await expect(explore.count).toHaveText('Showing 1–24 of 212 items, newest first');
    await expect(explore.cards).toHaveCount(24);
    const first = explore.card(0);
    await expect(first.type).toHaveText('Course');
    await expect(first.titleLink).toHaveText('Imago Dei in an Age of Machines');
    await expect(first.titleLink).toHaveAttribute(
      'href',
      '/courses/imago-dei-in-an-age-of-machines',
    );
    await expect(first.byline).toHaveText('Dr. Abena Mensah');
    await expect(explore.card(1).duration).toHaveText('24:18');
  });

  // L2-002 AC2 · search-filter-toolbar AC-17, filter option AC-1
  test('the filters panel lists each type with how many items it has', async ({ page, api }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    const explore = new ExplorePage(page);

    await explore.open();

    await expect(explore.filters.getByRole('heading', { name: 'Filters' })).toBeVisible();
    await expect(explore.optionNames('Type')).toHaveText(
      ['Course 24', 'Module 11', 'Video 86', 'Article 64', 'Collection 18', 'Event 9'],
      { useInnerText: true },
    );
    await expect(explore.group('Type').getByRole('checkbox', { checked: true })).toHaveCount(0);
  });

  // L2-002 AC2 · search-filter-toolbar AC-12, AC-16
  test('choosing a type shows only that type and puts it in the address', async ({ page, api }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    api.respond('GET', '/catalogue?type=course', coursesPage());
    const explore = new ExplorePage(page);
    await explore.open();

    await explore.choose('Type', 'Course');

    await expect(page).toHaveURL('/explore?type=course');
    await expect(explore.option('Type', 'Course')).toBeChecked();
    await expect(explore.count).toHaveText('Showing 1–24 of 24 courses, newest first');
    await expect(explore.cards).toHaveCount(24);
    await expect(explore.card(0).type).toHaveText('Course');
  });

  // L2-002 AC3 · search-filter-toolbar AC-12, AC-13
  test('a chosen type shows as a pill that can be removed', async ({ page, api }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    api.respond('GET', '/catalogue?type=course', coursesPage());
    const explore = new ExplorePage(page);

    await explore.open('/explore?type=course');

    await expect(explore.pills).toHaveText(['Type: Course']);
    await expect(explore.option('Type', 'Course')).toBeChecked();

    await explore.removePill('Type: Course');

    await expect(page).toHaveURL('/explore');
    await expect(explore.option('Type', 'Course')).not.toBeChecked();
    await expect(explore.pills).toHaveCount(0);
    await expect(explore.count).toHaveText('Showing 1–24 of 212 items, newest first');
  });

  // L2-002 AC5 · search-filter-toolbar AC-14, AC-15
  test('Clear all, in the panel or beside the pills, removes every filter', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    api.respond('GET', '/catalogue?type=course&type=video', coursesAndVideosPage());
    const explore = new ExplorePage(page);
    await explore.open('/explore?type=course&type=video');

    await expect(explore.pills).toHaveText(['Type: Course', 'Type: Video']);
    await expect(explore.count).toHaveText(
      'Showing 1–6 of 110 items that match all 2 filters, newest first',
    );

    await explore.clearAllInPanel.click();

    await expect(page).toHaveURL('/explore');
    await expect(explore.pills).toHaveCount(0);
    await expect(explore.clearAllInPanel).toHaveCount(0);

    await explore.open('/explore?type=course&type=video');
    await explore.clearAllInPills.click();

    await expect(page).toHaveURL('/explore');
    await expect(explore.pills).toHaveCount(0);
  });
});
