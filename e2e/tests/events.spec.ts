import { eventList, laterEvents, pastEvents, upcomingEvents } from '../data/events-listing';
import { members } from '../data/members';
import { expect, test } from '../fixtures/test';
import { EventsPage } from '../pages/events.page';

test.describe('Events listing', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-051 AC1 · event-row AC-1, AC-2, AC-3
  test('lists the upcoming events soonest first, with when, where, host and places left', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/events', eventList());
    const events = new EventsPage(page);

    await events.open();

    await expect(page).toHaveTitle('Events - Logos Lab');
    await expect(events.eyebrow).toHaveText('Live, online and in person');
    await expect(events.heading).toHaveText('Events');
    await expect(events.sub).toHaveText(
      'Live Q&As, workshops and evenings with Logos Lab experts. Times are in your time zone, Eastern Time (ET).',
    );
    await expect(events.count).toHaveText('3 upcoming events, soonest first');
    await expect(events.rows).toHaveCount(3);

    const first = events.row(0);
    await expect(first).toContainText('22');
    await expect(first).toContainText('Oct');
    await expect(first.getByRole('link')).toHaveText('Faith and AI Evening: Is Creativity Sacred?');
    await expect(first.getByRole('link')).toHaveAttribute(
      'href',
      '/events/faith-and-ai-evening-is-creativity-sacred',
    );
    // Browsers differ in "PM" and "p.m." and in the spaces round the dash.
    await expect(first).toContainText(/Thu, Oct 22, 7:00\s?[–-]\s?9:00\s?(PM|p\.m\.) ET/);
    await expect(first).toContainText(
      "In person · St. Brigid's Hall, Ottawa · hosted by Logos Lab",
    );
    await expect(first).toContainText('33 places left');
    await expect(events.row(1)).toContainText('Online · hosted by Dr. Abena Mensah');
    await expect(events.row(1)).not.toContainText('places left');
    await expect(events.row(2)).toContainText(
      'Hybrid · online and in Ottawa · hosted by Rev. Dr. Thomas Hale',
    );
    await expect(events.row(2)).toContainText('Full · waitlist open');
  });

  // L2-051 AC4 · badge AC-1
  test('an event that has started but not ended is labelled Happening now', async ({
    page,
    api,
  }) => {
    await page.clock.setFixedTime(new Date('2026-10-27T16:20:00Z'));
    const [, liveQa, workshop] = upcomingEvents;
    api.respond(
      'GET',
      '/events',
      eventList({
        events: [{ ...liveQa, happeningNow: true }, workshop],
        total: 2,
        totalEvents: 2,
      }),
    );
    const events = new EventsPage(page);

    await events.open();

    await expect(events.count).toHaveText('2 upcoming events, soonest first · 1 happening now');
    await expect(events.row(0)).toContainText('Happening now');
    await expect(events.row(0)).toContainText('started 20 minutes ago');
    await expect(events.row(1)).not.toContainText('Happening now');
    await expect(events.row(1)).not.toContainText('started');
  });

  // L2-051 AC1 · event-row AC-2
  test('a signed-in member sees which events they are registered for or waiting on', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    const [creativity, liveQa, workshop] = upcomingEvents;
    api.respond(
      'GET',
      '/events',
      eventList({
        events: [
          creativity,
          { ...liveQa, registration: { status: 'registered', waitlistPosition: null } },
          { ...workshop, registration: { status: 'waitlisted', waitlistPosition: 3 } },
        ],
      }),
    );
    const events = new EventsPage(page);

    await events.open();

    await expect(events.row(0)).not.toContainText("You're registered");
    await expect(events.row(1)).toContainText("You're registered");
    await expect(events.row(2)).toContainText("Full · you're number 3 on the waitlist");
    await expect(events.row(2)).not.toContainText('waitlist open');
  });

  // L2-051 AC2 · tabs AC-7
  test('the Past tab lists the events that ended, newest first', async ({ page, api }) => {
    api.respond('GET', '/events', eventList());
    api.respond(
      'GET',
      '/events?tab=past',
      eventList({ events: pastEvents, total: 2, totalEvents: 2 }),
    );
    const events = new EventsPage(page);
    await events.open();
    await expect(events.upcomingTab).toHaveAttribute('aria-current', 'page');
    await expect(events.pastTab).not.toHaveAttribute('aria-current', 'page');

    await events.pastTab.click();

    await expect(page).toHaveURL('/events?tab=past');
    await expect(events.pastTab).toHaveAttribute('aria-current', 'page');
    await expect(events.upcomingTab).not.toHaveAttribute('aria-current', 'page');
    await expect(events.count).toHaveText('2 past events, newest first');
    await expect(events.rows).toHaveCount(2);
    await expect(events.row(0)).toHaveClass(/is-past/);
    await expect(events.row(0)).toContainText('Panel: Work, Rest and Automation');
    await expect(events.row(0)).toContainText('Thu, Sep 24, 2026 · ended');

    await events.upcomingTab.click();

    await expect(page).toHaveURL('/events');
    await expect(events.count).toHaveText('3 upcoming events, soonest first');
  });

  // L2-051 AC2 · event-row AC-4
  test('a past event with a recording says so and offers to watch it', async ({ page, api }) => {
    api.respond(
      'GET',
      '/events?tab=past',
      eventList({ events: pastEvents, total: 2, totalEvents: 2 }),
    );
    const events = new EventsPage(page);

    await events.open('/events?tab=past');

    await expect(events.row(0)).toContainText('Recording available');
    await expect(events.row(0).getByRole('link', { name: 'Watch' })).toHaveAttribute(
      'href',
      '/events/panel-work-rest-and-automation',
    );
    await expect(events.row(1)).not.toContainText('Recording available');
    await expect(events.row(1).getByRole('link', { name: 'Watch' })).toHaveCount(0);
  });

  // L2-051 AC3 · select AC-4, search-filter-toolbar AC-5
  test('offers format, topic and host filters, and Recording available on the Past tab', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/events', eventList());
    api.respond('GET', '/events?tab=past', eventList({ events: pastEvents, total: 2 }));
    const events = new EventsPage(page);

    await events.open();

    await expect(events.format.locator('option')).toHaveText([
      'Any format',
      'Online',
      'In person',
      'Hybrid',
    ]);
    await expect(events.topic.locator('option')).toHaveText([
      'Any topic',
      'Theology of technology',
      'AI ethics',
      'Pastoral care',
    ]);
    await expect(events.host.locator('option')).toHaveText([
      'Any host',
      'Logos Lab',
      'Dr. Abena Mensah',
      'Rev. Dr. Thomas Hale',
    ]);
    await expect(events.format).toHaveValue('');
    await expect(events.recording).toHaveCount(0);

    await events.pastTab.click();

    await expect(events.recording).not.toBeChecked();
  });

  // L2-051 AC3 · search-filter-toolbar AC-16
  test('choosing filters narrows the list, and the address and a pill show them', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/events', eventList());
    api.respond(
      'GET',
      '/events?format=online',
      eventList({ events: [upcomingEvents[1]], total: 1 }),
    );
    api.respond(
      'GET',
      '/events?format=online&host=abena-mensah',
      eventList({ events: [upcomingEvents[1]], total: 1 }),
    );
    const events = new EventsPage(page);
    await events.open();
    await expect(events.pills).toHaveCount(0);

    await events.format.selectOption({ label: 'Online' });

    await expect(page).toHaveURL('/events?format=online');
    await expect(events.rows).toHaveCount(1);
    await expect(events.count).toHaveText('1 upcoming event, soonest first');
    await expect(events.pills).toHaveText(['Format: Online']);

    await events.host.selectOption({ label: 'Dr. Abena Mensah' });

    await expect(page).toHaveURL('/events?format=online&host=abena-mensah');
    await expect(events.pills).toHaveText(['Format: Online', 'Host: Dr. Abena Mensah']);
    await expect(events.format).toHaveValue('online');
  });

  // L2-051 AC3, L2-059 AC2 · search-filter-toolbar AC-12, AC-13
  test('the address applies its filters, and ignores what it does not know', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/events', eventList());
    api.respond(
      'GET',
      '/events?tab=past&format=hybrid&topic=ai-ethics&host=thomas-hale&recording=1',
      eventList({ events: pastEvents.slice(0, 1), total: 1 }),
    );
    const events = new EventsPage(page);

    await events.open(
      '/events?tab=past&format=hybrid&topic=ai-ethics&host=thomas-hale&recording=1',
    );

    await expect(events.format).toHaveValue('hybrid');
    await expect(events.topic).toHaveValue('ai-ethics');
    await expect(events.host).toHaveValue('thomas-hale');
    await expect(events.recording).toBeChecked();
    await expect(events.pills).toHaveText([
      'Format: Hybrid',
      'Topic: AI ethics',
      'Host: Rev. Dr. Thomas Hale',
      'Recording available',
    ]);
    await expect(events.rows).toHaveCount(1);

    await events.open('/events?format=virtual&topic=Not%20a%20slug&recording=1&tab=soon');

    await expect(events.rows).toHaveCount(3);
    await expect(events.pills).toHaveCount(0);
    expect(api.queriesTo('GET', '/events').at(-1)).toBe('');
  });

  // L2-051 AC3 · search-filter-toolbar AC-6, AC-14, empty-state AC-1
  test('filters that match nothing say so, and each can be taken off', async ({ page, api }) => {
    api.respond('GET', '/events', eventList({ totalEvents: 9, total: 9 }));
    api.respond(
      'GET',
      '/events?format=in-person&topic=pastoral-care',
      eventList({ events: [], total: 0, totalEvents: 9 }),
    );
    api.respond(
      'GET',
      '/events?topic=pastoral-care',
      eventList({ events: upcomingEvents.slice(0, 2), total: 2, totalEvents: 9 }),
    );
    const events = new EventsPage(page);

    await events.open('/events?format=in-person&topic=pastoral-care');

    await expect(events.count).toHaveText('No upcoming events match In person and Pastoral care');
    await expect(events.emptyTitle).toHaveText('No events match these filters');
    await expect(events.emptyState).toContainText('clear the filters to see all 9');
    await expect(events.pills).toHaveText(['Format: In person', 'Topic: Pastoral care']);

    await events.removeFilter('Format: In person');

    await expect(page).toHaveURL('/events?topic=pastoral-care');
    await expect(events.pills).toHaveText(['Topic: Pastoral care']);
    await expect(events.rows).toHaveCount(2);

    await events.format.selectOption({ label: 'In person' });
    await events.clearFilters.click();

    await expect(page).toHaveURL('/events');
    await expect(events.pills).toHaveCount(0);
    await expect(events.count).toHaveText('9 upcoming events, soonest first');
  });

  // L2-051 AC1 · pagination AC-14, AC-17, AC-21, AC-22, AC-25
  test('the list grows in place, a batch at a time, until every event is shown', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/events', eventList({ total: 9, totalEvents: 9, nextCursor: 'c2' }));
    const release = api.hold(
      'GET',
      '/events?cursor=c2',
      eventList({ events: laterEvents(6), total: 9, totalEvents: 9, nextCursor: null }),
    );
    const events = new EventsPage(page);
    await events.open();

    await expect(events.count).toHaveText('9 upcoming events, soonest first');
    await expect(events.rows).toHaveCount(3);
    await expect(events.showMore).toHaveText('Show 6 more events');
    await expect(events.moreText).toHaveText('3 of 9 upcoming events');
    await expect(events.moreMeter).toHaveCSS('--ll-pager-progress', '33%');

    await events.showMore.click();

    await expect(events.showMore).toHaveAttribute('aria-busy', 'true');
    await expect(events.showMore).toHaveAttribute('aria-disabled', 'true');
    await expect(events.rows).toHaveCount(3);

    release();

    await expect(events.rows).toHaveCount(9);
    await expect(events.showMore).toHaveCount(0);
    await expect(events.moreText).toHaveText('All 9 upcoming events shown');
    await expect(events.row(3).getByRole('link')).toBeFocused();
    expect(api.queriesTo('GET', '/events')).toEqual(['', '?cursor=c2']);
  });

  // L2-051 AC1 · pagination AC-14
  test('the button never promises more than a batch of 12', async ({ page, api }) => {
    api.respond('GET', '/events', eventList({ total: 40, totalEvents: 40, nextCursor: 'c2' }));
    const events = new EventsPage(page);

    await events.open();

    await expect(events.showMore).toHaveText('Show 12 more events');
    await expect(events.moreText).toHaveText('3 of 40 upcoming events');
  });

  // L2-051 AC1, L2-141 · pagination AC-21
  test('a batch that fails leaves the list as it was and can be tried again', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/events', eventList({ total: 9, totalEvents: 9, nextCursor: 'c2' }));
    api.fail('GET', '/events?cursor=c2', 500);
    const events = new EventsPage(page);
    await events.open();

    await events.showMore.click();

    await expect(events.moreFailed).toBeVisible();
    await expect(events.rows).toHaveCount(3);
    await expect(events.showMore).toBeEnabled();

    api.respond(
      'GET',
      '/events?cursor=c2',
      eventList({ events: laterEvents(6), total: 9, totalEvents: 9, nextCursor: null }),
    );
    await events.showMore.click();

    await expect(events.rows).toHaveCount(9);
    await expect(events.moreFailed).toHaveCount(0);
  });

  // L2-127 AC3 · event-row AC-10, skeleton AC-1
  test('while the events load the list is busy, announces it once and the filters wait', async ({
    page,
    api,
  }) => {
    const release = api.hold('GET', '/events', eventList());
    const events = new EventsPage(page);

    await events.open();

    await expect(events.heading).toHaveText('Events');
    await expect(events.loadingMessage).toHaveText(['Loading events…']);
    await expect(events.skeletonRows).toHaveCount(3);
    await expect(events.format).toBeDisabled();
    await expect(events.topic).toBeDisabled();
    await expect(events.host).toBeDisabled();

    release();

    await expect(events.rows).toHaveCount(3);
    await expect(events.skeletonRows).toHaveCount(0);
    await expect(events.format).toBeEnabled();
  });

  // L2-051 AC1 · empty-state AC-1
  test('with nothing scheduled, the page says so and points to the past events', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/events', eventList({ events: [], total: 0, totalEvents: 0 }));
    api.respond('GET', '/events?tab=past', eventList({ events: [], total: 0, totalEvents: 0 }));
    const events = new EventsPage(page);

    await events.open();

    await expect(events.count).toHaveText('No upcoming events');
    await expect(events.emptyTitle).toHaveText('No events scheduled right now');
    await expect(events.format).toBeDisabled();
    await expect(events.emptyAction('See past events')).toHaveAttribute('href', '/events?tab=past');

    await events.emptyAction('See past events').click();

    await expect(events.count).toHaveText('No past events');
    await expect(events.emptyTitle).toHaveText('No past events yet');
  });

  // L2-141 AC2 · empty-state AC-2
  test('events that fail to load offer another try and the way to support', async ({
    page,
    api,
  }) => {
    api.fail('GET', '/events', 500);
    const events = new EventsPage(page);

    await events.open();

    await expect(events.emptyTitle).toHaveText("We couldn't load events");
    await expect(events.format).toBeDisabled();
    await expect(events.emptyAction('Contact support')).toHaveAttribute(
      'href',
      'mailto:help@logoslab.ca',
    );

    api.respond('GET', '/events', eventList());
    await events.tryAgain.click();

    await expect(events.rows).toHaveCount(3);
    await expect(events.emptyState).toHaveCount(0);
  });
});
