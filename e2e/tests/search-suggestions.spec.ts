import { expect, test } from '../fixtures/test';
import { imagSuggestions } from '../data/suggestions';
import { HomePage } from '../pages/home.page';
import { SiteSearch } from '../pages/site-search';

test.describe('Search suggestions', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-003 · combobox AC-1, AC-2, text-field AC-14
  test('typing two or more characters suggests matching courses, experts and topics', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/search/suggestions?q=imag', imagSuggestions);
    const home = new HomePage(page);
    const search = new SiteSearch(page);
    await home.open();

    await search.type('imag');

    await expect(search.list).toHaveAccessibleName('Suggestions for imag');
    expect(await search.groupLabels()).toEqual(['Courses', 'Experts', 'Topics']);
    await expect(search.option(0).text).toHaveText('Imago Dei in an Age of Machines');
    await expect(search.option(0).highlighted).toHaveText('Imag');
    await expect(search.option(0).meta).toHaveText('Course');
    await expect(search.option(1).text).toHaveText('Dr. Abena Mensah');
    await expect(search.option(2).meta).toHaveText('28 items');
    await expect(search.foot).toHaveText('See all results for “imag”');
    await expect(search.input).toHaveAttribute('aria-expanded', 'true');
    await expect(search.announcement).toHaveText(
      '3 suggestions. Use the up and down arrows to move through them.',
    );
  });

  // L2-126 · combobox AC-7
  test('arrow keys move through the suggestions and Enter opens the active one', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/search/suggestions?q=imag', imagSuggestions);
    const home = new HomePage(page);
    const search = new SiteSearch(page);
    await home.open();
    await search.type('imag');
    await expect(search.options()).toHaveCount(3);

    await search.press('ArrowDown');
    await search.press('ArrowDown');

    await expect(search.option(1).root).toHaveAttribute('aria-selected', 'true');
    const active = await search.option(1).root.getAttribute('id');
    await expect(search.input).toHaveAttribute('aria-activedescendant', active ?? '');
    await expect(search.input).toBeFocused();

    await search.press('Enter');

    await expect(page).toHaveURL('/experts/abena-mensah');
  });

  // L2-126 · combobox AC-8
  test('Escape closes the suggestions', async ({ page, api }) => {
    api.respond('GET', '/search/suggestions?q=imag', imagSuggestions);
    const home = new HomePage(page);
    const search = new SiteSearch(page);
    await home.open();
    await search.type('imag');
    await expect(search.options()).toHaveCount(3);

    await search.press('Escape');

    await expect(search.list).toHaveCount(0);
    await expect(search.input).toHaveAttribute('aria-expanded', 'false');
  });

  // L2-003 · combobox AC-3
  test('while suggestions load, the list says it is searching', async ({ page, api }) => {
    api.hold('GET', '/search/suggestions?q=imag', imagSuggestions);
    const home = new HomePage(page);
    const search = new SiteSearch(page);
    await home.open();

    await search.type('imag');

    await expect(search.status).toHaveText('Searching…');
    await expect(search.list).toHaveAttribute('aria-busy', 'true');
  });

  // L2-003 · combobox AC-4
  test('one character asks for at least two and sends no request', async ({ page, api }) => {
    const home = new HomePage(page);
    const search = new SiteSearch(page);
    await home.open();

    await search.type('i');

    await expect(search.status).toHaveText('Enter at least 2 characters.');
    await expect(search.input).toHaveAttribute('aria-invalid', 'true');
    expect(api.requestsTo('GET', '/search/suggestions')).toHaveLength(0);
  });

  // L2-003 · combobox AC-5
  test('when nothing matches, the list offers to search anyway', async ({ page, api }) => {
    api.respond('GET', '/search/suggestions?q=liturgy', { suggestions: [] });
    const home = new HomePage(page);
    const search = new SiteSearch(page);
    await home.open();

    await search.type('liturgy');

    await expect(search.status).toHaveText('No courses, experts or topics match “liturgy”.');
    await expect(search.foot).toHaveText('Search for “liturgy”');
  });

  // L2-003, L2-141 AC2 · combobox AC-6
  test('when suggestions fail, Enter still searches', async ({ page, api }) => {
    api.fail('GET', '/search/suggestions?q=imag', 503);
    const home = new HomePage(page);
    const search = new SiteSearch(page);
    await home.open();

    await search.type('imag');
    await expect(search.status).toHaveText(
      'Suggestions aren’t available right now. Press Enter to search.',
    );
    await search.press('Enter');

    await expect(page).toHaveURL('/search?q=imag');
  });
});
