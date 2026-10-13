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

  // L2-002 AC7 · search-filter-toolbar AC-17, AC-21
  test('the panel also offers topic, level, contributor and length', async ({ page, api }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    const explore = new ExplorePage(page);

    await explore.open();

    await expect(explore.optionNames('Topic')).toHaveText(
      [
        'Theology of technology 41',
        'AI ethics 37',
        'Church and ministry 33',
        'The image of God and personhood 28',
        'Formation and education 22',
        'Work and vocation 19',
      ],
      { useInnerText: true },
    );
    await expect(explore.optionNames('Level')).toHaveText(
      ['Introductory', 'Intermediate', 'Advanced'],
      { useInnerText: true },
    );
    await expect(explore.optionNames('Contributor')).toHaveCount(6);
    await expect(explore.optionNames('Contributor').first()).toHaveText('Logos Lab');
    await expect(explore.optionNames('Length')).toHaveText(
      ['Under 15 min', '15 to 60 min', 'Over 60 min'],
      { useInnerText: true },
    );

    await explore.showAll('Show all 12 topics').click();

    await expect(explore.optionNames('Topic')).toHaveCount(12);
    await expect(explore.showAll('Show all 12 topics')).toHaveCount(0);
    await expect(explore.showAll('Show all 38 experts')).toBeVisible();
  });

  // L2-002 AC2, AC7 · search-filter-toolbar AC-12, AC-16
  test('filters from every group combine in the address', async ({ page, api }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    const explore = new ExplorePage(page);
    await explore.open();

    await explore.choose('Type', 'Video');
    await explore.choose('Topic', 'AI ethics');

    await expect(page).toHaveURL('/explore?type=video&topic=ai-ethics');
    await expect(explore.pills).toHaveText(['Type: Video', 'Topic: AI ethics']);

    await explore.choose('Level', 'Intermediate');
    await explore.choose('Contributor', 'Logos Lab');
    await explore.choose('Length', 'Over 60 min');

    await expect(page).toHaveURL(
      '/explore?type=video&topic=ai-ethics&level=intermediate&contributor=logos-lab&duration=over-60',
    );
    await expect(explore.pills).toHaveText([
      'Type: Video',
      'Topic: AI ethics',
      'Level: Intermediate',
      'Contributor: Logos Lab',
      'Length: Over 60 min',
    ]);
    await expect(explore.count).toHaveText(
      'Showing 1–24 of 212 videos that match all 5 filters, newest first',
    );
  });

  // L2-002 AC3 · search-filter-toolbar AC-12
  test('an address with filters opens with them applied', async ({ page, api }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    const explore = new ExplorePage(page);

    await explore.open(
      '/explore?type=video&topic=ai-ethics&level=intermediate&contributor=thomas-hale&duration=over-60',
    );

    await expect(explore.option('Type', 'Video')).toBeChecked();
    await expect(explore.option('Topic', 'AI ethics')).toBeChecked();
    await expect(explore.option('Level', 'Intermediate')).toBeChecked();
    await expect(explore.option('Contributor', 'Rev. Dr. Thomas Hale')).toBeChecked();
    await expect(explore.option('Length', 'Over 60 min')).toBeChecked();
    await expect(explore.pills).toHaveCount(5);
    expect(api.queriesTo('GET', '/catalogue')).toEqual([
      '?type=video&topic=ai-ethics&level=intermediate&contributor=thomas-hale&duration=over-60',
    ]);
  });

  // L2-002 AC4 · search-filter-toolbar AC-13
  test('an unknown filter value is ignored and the rest still apply', async ({ page, api }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    const explore = new ExplorePage(page);

    await explore.open('/explore?type=podcast&type=course&level=expert&duration=forever');

    await expect(explore.pills).toHaveText(['Type: Course']);
    await expect(explore.checkedOptions('Level')).toHaveCount(0);
    expect(api.queriesTo('GET', '/catalogue')).toEqual(['?type=course']);
  });
});
