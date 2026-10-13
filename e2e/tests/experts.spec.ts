import { expertDirectory, expertPage, noExperts } from '../data/experts-directory';
import { expect, test } from '../fixtures/test';
import { ExpertsPage } from '../pages/experts.page';

test.describe('Experts directory', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-022 AC1 · person-list AC-2, page-header AC-1
  test('lists the experts alphabetically with their title and item count', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/experts', expertDirectory());
    const experts = new ExpertsPage(page);

    await experts.open();

    await expect(page).toHaveTitle('Experts - Logos Lab');
    await expect(experts.eyebrow).toHaveText('Who teaches here');
    await expect(experts.heading).toHaveText('Experts');
    await expect(experts.sub).toHaveText(
      '38 theologians, ethicists, historians, philosophers and engineers, sorted by surname.',
    );
    await expect(experts.count).toHaveText('Showing 1–24 of 38 experts');
    await expect(experts.rows).toHaveCount(24);
    await expect(experts.row(0)).toContainText('Dr. Lucía Ortega');
    await expect(experts.row(0)).toContainText(
      'Church historian · Augustine, attention and memory',
    );
    await expect(experts.row(0)).toContainText('8 published items');
    await expect(experts.row(0).getByRole('link')).toHaveAttribute('href', '/experts/lucia-ortega');
  });

  // L2-022 AC1 · pagination AC-1
  test('the directory is paged, 24 to a page', async ({ page, api }) => {
    api.respond('GET', '/experts', expertDirectory());
    api.respond(
      'GET',
      '/experts?page=2',
      expertDirectory({ page: 2, experts: expertPage.slice(0, 14) }),
    );
    const experts = new ExpertsPage(page);
    await experts.open();

    await expect(experts.pagerText).toHaveText('Page 1 of 2');

    await experts.goToPage(2);

    await expect(page).toHaveURL('/experts?page=2');
    await expect(experts.pagerText).toHaveText('Page 2 of 2');
    await expect(experts.count).toHaveText('Showing 25–38 of 38 experts');
    await expect(experts.rows).toHaveCount(14);
  });

  // L2-022 AC2 · select AC-4, search-filter-toolbar AC-1
  test('choosing a topic narrows the directory and goes back to the first page', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/experts', expertDirectory());
    api.respond(
      'GET',
      '/experts?topic=philosophy-of-mind',
      expertDirectory({ experts: expertPage.slice(0, 2), total: 2, pageCount: 1 }),
    );
    const experts = new ExpertsPage(page);
    await experts.open('/experts?page=2');
    await expect(experts.topic).toHaveValue('');
    await expect(experts.topic.locator('option').first()).toHaveText('Any topic');

    await experts.chooseTopic('Philosophy of mind');

    await expect(page).toHaveURL('/experts?topic=philosophy-of-mind');
    await expect(experts.topic).toHaveValue('philosophy-of-mind');
    await expect(experts.count).toHaveText('2 experts in Philosophy of mind');
    await expect(experts.rows).toHaveCount(2);
    await expect(experts.pager).toHaveCount(0);
  });

  // L2-022 AC2 · search-filter-toolbar AC-12
  test('an address with a topic opens with it chosen', async ({ page, api }) => {
    api.respond('GET', '/experts', expertDirectory({ total: 2, pageCount: 1 }));
    const experts = new ExpertsPage(page);

    await experts.open('/experts?topic=philosophy-of-mind');

    await expect(experts.topic).toHaveValue('philosophy-of-mind');
    expect(api.queriesTo('GET', '/experts')).toEqual(['?topic=philosophy-of-mind']);
  });

  // L2-022 AC3 · search-filter-toolbar AC-1
  test('searching by name asks for it and says what was searched', async ({ page, api }) => {
    api.respond('GET', '/experts', expertDirectory());
    api.respond(
      'GET',
      '/experts?q=Ortega',
      expertDirectory({ experts: expertPage.slice(0, 1), total: 1, pageCount: 1 }),
    );
    const experts = new ExpertsPage(page);
    await experts.open();

    await experts.searchFor('Ortega');

    await expect(page).toHaveURL('/experts?q=Ortega');
    await expect(experts.search).toHaveValue('Ortega');
    await expect(experts.count).toHaveText('1 expert matching “Ortega”');
    await expect(experts.rows).toHaveCount(1);
  });

  // L2-022 AC3 · form-layout AC-1
  test('a one-letter search is refused before any request', async ({ page, api }) => {
    api.respond('GET', '/experts', expertDirectory());
    const experts = new ExpertsPage(page);
    await experts.open();

    await experts.searchFor('M');

    await expect(experts.summary).toContainText('One thing to fix before you search');
    await expect(experts.summary).toContainText('Enter at least 2 characters of a name');
    await expect(experts.fieldError).toHaveText('Enter at least 2 characters of a name');
    await expect(experts.search).toHaveAttribute('aria-invalid', 'true');
    await expect(experts.search).toHaveValue('M');
    await expect(experts.rows).toHaveCount(24);
    expect(api.queriesTo('GET', '/experts')).toEqual(['']);
  });

  // L2-022 AC3 · empty-state AC-10
  test('a search that matches nobody names it and offers to clear the filters', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/experts', expertDirectory());
    api.respond('GET', '/experts?q=Bonhoeffer&topic=pastoral-care', noExperts());
    const experts = new ExpertsPage(page);

    await experts.open('/experts?q=Bonhoeffer&topic=pastoral-care');

    await expect(experts.count).toHaveText(
      /^\s*No experts match “Bonhoeffer” in Pastoral care\s*$/,
    );
    await expect(experts.emptyTitle).toHaveText('No experts match “Bonhoeffer” in Pastoral care');
    await expect(experts.emptyState).toContainText(
      'Check the spelling, or clear the filters to see all 38 experts.',
    );
    await expect(experts.rows).toHaveCount(0);

    await experts.clearFilters.click();

    await expect(page).toHaveURL('/experts');
    await expect(experts.rows).toHaveCount(24);
    await expect(experts.search).toHaveValue('');
    await expect(experts.topic).toHaveValue('');
  });

  // L2-127 AC3 · skeleton AC-1, person-list AC-9
  test('while the experts load, the list is busy and announces it once', async ({ page, api }) => {
    const release = api.hold('GET', '/experts', expertDirectory());
    const experts = new ExpertsPage(page);

    await experts.open();

    await expect(experts.count).toHaveText('Loading experts…');
    await expect(experts.loadingMessage).toHaveText('Loading experts…');
    await expect(experts.skeletonRows).toHaveCount(6);

    release();

    await expect(experts.rows).toHaveCount(24);
    await expect(experts.skeletonRows).toHaveCount(0);
  });

  // L2-141 AC2 · empty-state AC-2
  test('a directory that fails to load keeps the filters and offers another try', async ({
    page,
    api,
  }) => {
    api.fail('GET', '/experts', 500);
    const experts = new ExpertsPage(page);

    await experts.open('/experts?topic=philosophy-of-mind');

    await expect(experts.count).toHaveText('Experts unavailable');
    await expect(experts.emptyTitle).toHaveText("We couldn't load the experts");
    await expect(page).toHaveURL('/experts?topic=philosophy-of-mind');

    api.respond('GET', '/experts', expertDirectory({ total: 2, pageCount: 1 }));
    await experts.tryAgain.click();

    await expect(experts.rows).toHaveCount(24);
    await expect(experts.emptyTitle).toHaveCount(0);
  });

  // L2-022 · empty-state AC-1
  test('with no experts yet, the page says so and points to the catalogue', async ({
    page,
    api,
  }) => {
    api.respond(
      'GET',
      '/experts',
      expertDirectory({ experts: [], total: 0, totalExperts: 0, pageCount: 0, topics: [] }),
    );
    const experts = new ExpertsPage(page);

    await experts.open();

    await expect(experts.count).toHaveText('No experts yet');
    await expect(experts.emptyTitle).toHaveText('Our first experts are finishing their profiles');
    await expect(experts.emptyAction('Browse the catalogue')).toHaveAttribute('href', '/explore');
    await expect(experts.rows).toHaveCount(0);
  });
});
