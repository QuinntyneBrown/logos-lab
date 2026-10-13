import { personhoodResults, personhoodVideos } from '../data/searches';
import { expect, test } from '../fixtures/test';
import { SearchResultsPage } from '../pages/search-results.page';

test.describe('Search results', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-003 AC2 · tabs AC-1, page-header AC-1
  test('results are grouped by type, with a count for each', async ({ page, api }) => {
    api.respond('GET', '/search?q=personhood', personhoodResults());
    const results = new SearchResultsPage(page);

    await results.open('/search?q=personhood');

    await expect(results.eyebrow).toHaveText('Search');
    await expect(results.heading).toHaveText('Results for “personhood”');
    await expect(results.sub).toHaveText('14 results across 7 types, best matches first.');
    await expect(page).toHaveTitle('Search - Logos Lab');
    await expect(results.search).toHaveValue('personhood');
    await expect(results.tabs).toHaveText([
      'All 14',
      'Courses 2',
      'Modules 1',
      'Videos 3',
      'Articles 2',
      'Collections 1',
      'Events 1',
      'Experts 2',
    ]);
    await expect(results.currentTab).toHaveText('All 14');
    await expect(results.groupHeadings).toHaveText([
      'Courses 2',
      'Videos 3',
      'Articles 2',
      'Collections 1',
      'Events 1',
      'Modules 1',
      'Experts 2',
    ]);
  });

  // L2-003 AC2 · content-card AC-1
  test('each hit is a card, and a group with more hits links to its type', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/search?q=personhood', personhoodResults());
    const results = new SearchResultsPage(page);
    await results.open('/search?q=personhood');

    const courses = results.group('Courses');
    await expect(results.cards(courses)).toHaveCount(2);
    const imago = results.card(courses, 0);
    await expect(imago.type).toHaveText('Course');
    await expect(imago.titleLink).toHaveText('Imago Dei in an Age of Machines');
    await expect(imago.titleLink).toHaveAttribute(
      'href',
      '/courses/imago-dei-in-an-age-of-machines',
    );
    await expect(imago.byline).toHaveText('Dr. Abena Mensah');
    await expect(imago.meta).toHaveText(['24 lessons', '5 h 40 min']);
    await expect(results.moreLink(courses)).toHaveCount(0);

    const videos = results.group('Videos');
    await expect(results.cards(videos)).toHaveCount(2);
    await expect(results.moreLink(videos)).toHaveText('All 3 videos');
    await expect(results.moreLink(videos)).toHaveAttribute(
      'href',
      '/search?q=personhood&type=video',
    );
  });

  // L2-003 AC2 · person-list AC-1, AC-3
  test('experts are listed as people with a way to their profiles', async ({ page, api }) => {
    api.respond('GET', '/search?q=personhood', personhoodResults());
    const results = new SearchResultsPage(page);
    await results.open('/search?q=personhood');

    const experts = results.group('Experts');
    await expect(results.people(experts)).toHaveCount(2);
    await expect(results.people(experts).first().getByRole('link')).toHaveText('Dr. Abena Mensah');
    await expect(results.people(experts).first().getByRole('link')).toHaveAttribute(
      'href',
      '/experts/abena-mensah',
    );
  });

  // L2-127 AC3 · skeleton AC-1, page-header AC-4
  test('while searching, the results are busy and announce it once', async ({ page, api }) => {
    const release = api.hold('GET', '/search?q=personhood', personhoodResults());
    const results = new SearchResultsPage(page);

    await results.open('/search?q=personhood');

    await expect(results.heading).toHaveText('Results for “personhood”');
    await expect(results.sub).toHaveText('Searching…');
    await expect(results.search).toHaveValue('personhood');
    await expect(results.loadingMessage()).toHaveText('Searching for “personhood”…');
    await expect(results.skeletonCards()).toHaveCount(4);

    release();

    await expect(results.tabs.first()).toHaveText('All 14');
    await expect(results.skeletonCards()).toHaveCount(0);
  });

  // L2-003 AC2 · tabs AC-2
  test('choosing a type narrows the results to it', async ({ page, api }) => {
    api.respond('GET', '/search?q=personhood', personhoodResults());
    api.respond('GET', '/search?q=personhood&type=video', personhoodVideos());
    const results = new SearchResultsPage(page);
    await results.open('/search?q=personhood');

    await results.chooseTab('Videos');

    await expect(page).toHaveURL('/search?q=personhood&type=video');
    await expect(results.currentTab).toHaveText('Videos 3');
    await expect(results.sub).toHaveText('3 videos, best matches first.');
    await expect(results.tabs).toHaveCount(8);
    await expect(results.groupHeadings).toHaveCount(0);
    await expect(results.cards(results.group('Videos'))).toHaveCount(3);
    await expect(results.card(results.group('Videos'), 2).titleLink).toHaveText(
      'Inside a Neural Network in Ten Minutes',
    );
  });

  // L2-003 AC2 · tabs AC-2
  test('a type in the address is selected when the page opens', async ({ page, api }) => {
    api.respond('GET', '/search?q=personhood&type=video', personhoodVideos());
    const results = new SearchResultsPage(page);

    await results.open('/search?q=personhood&type=video');

    await expect(results.currentTab).toHaveText('Videos 3');
    await expect(results.cards(results.group('Videos'))).toHaveCount(3);
  });

  // L2-003 AC2 · tabs AC-2
  test('an unknown type in the address is ignored', async ({ page, api }) => {
    api.respond('GET', '/search?q=personhood', personhoodResults());
    const results = new SearchResultsPage(page);

    await results.open('/search?q=personhood&type=podcast');

    await expect(results.currentTab).toHaveText('All 14');
    await expect(results.groupHeadings).toHaveCount(7);
  });
});

test.describe('Search without a usable query', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-003 · mock search-results/empty
  test('with no query, the page invites a search and sends no request', async ({ page, api }) => {
    const results = new SearchResultsPage(page);

    await results.open('/search');

    await expect(results.heading).toHaveText('Search Logos Lab');
    await expect(results.sub).toHaveText(
      "Try a topic, a question, a book of the Bible or an expert's name.",
    );
    await expect(results.emptyTitle).toHaveText('What would you like to find?');
    await expect(results.emptyAction('Browse the catalogue')).toHaveAttribute('href', '/explore');
    await expect(results.tabs).toHaveCount(0);
    expect(api.requestsTo('GET', '/search')).toHaveLength(0);
  });

  // L2-004 AC1 · form-layout AC-1
  test('a query under 2 characters sends no request and says why', async ({ page, api }) => {
    const results = new SearchResultsPage(page);

    await results.open('/search?q=a');

    await expect(results.heading).toHaveText('Search Logos Lab');
    await expect(results.summary).toContainText('One thing to fix before you search');
    await expect(results.summary).toContainText('Enter at least 2 characters');
    await expect(results.summary).toBeFocused();
    await expect(results.fieldError).toHaveText('Enter at least 2 characters');
    await expect(results.search).toHaveAttribute('aria-invalid', 'true');
    await expect(results.search).toHaveValue('a');
    expect(api.requestsTo('GET', '/search')).toHaveLength(0);
  });

  // L2-004 AC1
  test('submitting one character from the page field shows the same', async ({ page, api }) => {
    const results = new SearchResultsPage(page);
    await results.open('/search');

    await results.submitSearch('a');

    await expect(page).toHaveURL('/search?q=a');
    await expect(results.fieldError).toHaveText('Enter at least 2 characters');
    expect(api.requestsTo('GET', '/search')).toHaveLength(0);
  });

  // L2-004 AC2
  test('the field stops typing at 200 characters', async ({ page }) => {
    const results = new SearchResultsPage(page);

    await results.open('/search');

    await expect(results.search).toHaveAttribute('maxlength', '200');
  });

  // L2-004 AC3
  test('markup in the query is shown as text', async ({ page, api }) => {
    api.respond('GET', '/search', personhoodResults({ query: '<b>bold</b>' }));
    const results = new SearchResultsPage(page);

    await results.open('/search?q=%3Cb%3Ebold%3C%2Fb%3E');

    await expect(results.heading).toHaveText('Results for “<b>bold</b>”');
    await expect(results.search).toHaveValue('<b>bold</b>');
  });
});
