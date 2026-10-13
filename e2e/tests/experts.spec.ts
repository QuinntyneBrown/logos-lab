import { expertDirectory, expertPage } from '../data/experts-directory';
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
});
