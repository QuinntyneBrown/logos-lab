import { personhoodResults } from '../data/searches';
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
});
