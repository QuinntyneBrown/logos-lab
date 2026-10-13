import { expertDirectory } from '../data/experts-directory';
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
});
