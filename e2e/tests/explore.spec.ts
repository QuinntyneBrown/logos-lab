import { cataloguePage, coursesAndVideosPage, coursesPage, popularPage } from '../data/catalogue';
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

  // L2-002 AC6 · select AC-1
  test('sorting by most popular asks for it and says so', async ({ page, api }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    api.respond('GET', '/catalogue?sort=popular', popularPage());
    const explore = new ExplorePage(page);
    await explore.open();
    await expect(explore.sort).toHaveValue('newest');

    await explore.sortBy('Most popular');

    await expect(page).toHaveURL('/explore?sort=popular');
    await expect(explore.sort).toHaveValue('popular');
    await expect(explore.count).toHaveText('Showing 1–24 of 212 items, most popular first');
    await expect(explore.card(0).titleLink).toHaveText('Notes on Faith and Technology, Part 12');
  });

  // L2-002 AC3, AC6 · select AC-2
  test('an address with a sort opens sorted, and an unknown sort is ignored', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    const explore = new ExplorePage(page);

    await explore.open('/explore?sort=popular');
    await expect(explore.sort).toHaveValue('popular');
    await expect(explore.count).toContainText('most popular first');

    await explore.open('/explore?sort=random');
    await expect(explore.sort).toHaveValue('newest');
    await expect(explore.count).toContainText('newest first');
    expect(api.queriesTo('GET', '/catalogue')).toEqual(['?sort=popular', '']);
  });

  // L2-002 AC2, AC6
  test('sorting keeps the filters that are on', async ({ page, api }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    const explore = new ExplorePage(page);
    await explore.open('/explore?type=course');

    await explore.sortBy('Most popular');

    await expect(page).toHaveURL('/explore?type=course&sort=popular');
    await expect(explore.pills).toHaveText(['Type: Course']);
  });

  // L2-002 AC1 · pagination AC-1, AC-12
  test('the catalogue is paged, with the pages and the one you are on', async ({ page, api }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    api.respond('GET', '/catalogue?page=2', cataloguePage({ page: 2 }));
    const explore = new ExplorePage(page);

    await explore.open();

    await expect(explore.pagerText).toHaveText('Page 1 of 9');
    await expect(explore.pagerLinks).toHaveText(
      ['Previous page', '1', '2', '3', '9', 'Next page'],
      { useInnerText: true },
    );
    await expect(explore.pageLink(1)).toHaveAttribute('aria-current', 'page');
    await expect(explore.pageLink(2)).toHaveAttribute('href', '/explore?page=2');

    await explore.goToPage(2);

    await expect(page).toHaveURL('/explore?page=2');
    await expect(explore.pagerText).toHaveText('Page 2 of 9');
    await expect(explore.count).toHaveText('Showing 25–48 of 212 items, newest first');
    await expect(explore.pageLink(2)).toHaveAttribute('aria-current', 'page');
  });

  // L2-002 AC2 · pagination AC-12
  test('paging keeps the filters, and changing a filter goes back to page one', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/catalogue', cataloguePage({ page: 2 }));
    const explore = new ExplorePage(page);
    await explore.open('/explore?type=video&page=2');

    await expect(explore.pageLink(3)).toHaveAttribute('href', '/explore?type=video&page=3');
    await expect(explore.pageLink(1)).toHaveAttribute('href', '/explore?type=video');

    await explore.choose('Topic', 'AI ethics');

    await expect(page).toHaveURL('/explore?type=video&topic=ai-ethics');
    expect(api.queriesTo('GET', '/catalogue')).toEqual([
      '?type=video&page=2',
      '?type=video&topic=ai-ethics',
    ]);
  });

  // L2-002 AC4 · pagination AC-11
  test('a page that is not a positive whole number is ignored', async ({ page, api }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    const explore = new ExplorePage(page);

    await explore.open('/explore?page=abc');
    await explore.open('/explore?page=0');

    await expect(explore.pagerText).toHaveText('Page 1 of 9');
    expect(api.queriesTo('GET', '/catalogue')).toEqual(['', '']);
  });

  // L2-127 AC3 · skeleton AC-1, search-filter-toolbar AC-26
  test('while the catalogue loads, the page is busy and announces it once', async ({
    page,
    api,
  }) => {
    const release = api.hold('GET', '/catalogue', cataloguePage());
    const explore = new ExplorePage(page);

    await explore.open();

    await expect(explore.count).toHaveText('Loading the catalogue…');
    await expect(explore.sort).toBeDisabled();
    await expect(explore.loadingMessage).toHaveText('Loading the catalogue…');
    await expect(explore.skeletonCards).toHaveCount(6);
    await expect(explore.pager).toHaveCount(0);

    release();

    await expect(explore.cards).toHaveCount(24);
    await expect(explore.skeletonCards).toHaveCount(0);
    await expect(explore.sort).toBeEnabled();
  });

  // L2-141 AC2 · empty-state AC-2, search-filter-toolbar AC-27
  test('a catalogue that fails keeps the address and offers another try', async ({ page, api }) => {
    api.fail('GET', '/catalogue', 500);
    const explore = new ExplorePage(page);

    await explore.open('/explore?type=course');

    await expect(explore.count).toHaveText('Results unavailable');
    await expect(explore.sort).toBeDisabled();
    await expect(explore.emptyTitle).toHaveText("We couldn't load the catalogue");
    await expect(explore.emptyState).toContainText('your filters are kept');
    await expect(page).toHaveURL('/explore?type=course');

    api.respond('GET', '/catalogue', coursesPage());
    await explore.tryAgain.click();

    await expect(explore.cards).toHaveCount(24);
    await expect(explore.emptyTitle).toHaveCount(0);
    await expect(explore.pills).toHaveText(['Type: Course']);
  });

  // L2-141 AC3 · alert AC-1
  test('when keyword search is limited, browsing still shows everything', async ({ page, api }) => {
    api.respond('GET', '/catalogue', cataloguePage({ searchDegraded: true }));
    const explore = new ExplorePage(page);

    await explore.open();

    await expect(explore.warning).toContainText('Search is limited for now');
    await expect(explore.warning).toContainText(
      'Keyword search is having trouble, so results may be incomplete. Browsing and filters here still show everything published.',
    );
    await expect(explore.cards).toHaveCount(24);

    api.respond('GET', '/catalogue', cataloguePage());
    await explore.checkAgain.click();

    await expect(explore.warning).toHaveCount(0);
  });

  // L2-002 AC5 · empty-state AC-10
  test('filters that match nothing are named, with one way to clear them', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    api.respond(
      'GET',
      '/catalogue?type=video&topic=creativity-and-the-arts&duration=over-60',
      cataloguePage({ items: [], total: 0, pageCount: 0 }),
    );
    const explore = new ExplorePage(page);

    await explore.open('/explore?type=video&topic=creativity-and-the-arts&duration=over-60');

    await expect(explore.count).toHaveText(
      // The list is the locale's own: CLDR versions differ on the serial comma.
      /^\s*No items match Video, Creativity and the arts,? and Over 60 min\s*$/,
    );
    await expect(explore.pills).toHaveCount(3);
    await expect(explore.emptyTitle).toHaveText('No videos match these filters');
    await expect(explore.emptyState).toContainText('Clear the filters to see all 212 items.');
    await expect(explore.clearFilters).toHaveCount(1);
    await expect(explore.pager).toBeHidden();

    await explore.clearFilters.click();

    await expect(page).toHaveURL('/explore');
    await expect(explore.cards).toHaveCount(24);
  });

  // L2-002 · empty-state AC-1
  test('a catalogue with nothing published says so and points to the experts', async ({
    page,
    api,
  }) => {
    api.respond(
      'GET',
      '/catalogue',
      cataloguePage({
        items: [],
        total: 0,
        pageCount: 0,
        facets: { types: [], topics: [], contributors: [] },
      }),
    );
    const explore = new ExplorePage(page);

    await explore.open();

    await expect(explore.count).toHaveText('No items published yet');
    await expect(explore.sort).toBeDisabled();
    await expect(explore.emptyTitle).toHaveText('Nothing is published yet');
    await expect(explore.emptyAction('Meet the experts')).toHaveAttribute('href', '/experts');
    await expect(explore.cards).toHaveCount(0);
  });
});
