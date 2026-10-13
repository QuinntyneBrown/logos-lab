import { members } from '../data/members';
import {
  creativityEveningPage,
  eventPage,
  liveQaPage,
  policyWorkshopPage,
} from '../data/event-pages';
import { expect, test } from '../fixtures/test';
import { EventPage } from '../pages/event.page';

const path = '/events/live-qa-imago-dei-and-machine-personhood';

test.describe('Event page', () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  // The events in the data are in late October 2026; the clock stands two weeks before them.
  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(new Date('2026-10-13T15:00:00Z'));
  });

  // L2-052 AC1 · event-head AC-1, breadcrumb AC-1, prose AC-1
  test('shows what the event is, when and where it happens, who hosts it and what it covers', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/events/by-slug/live-qa-imago-dei-and-machine-personhood', liveQaPage);
    const event = new EventPage(page);

    await event.open(path);

    await expect(page).toHaveTitle('Live Q&A: Imago Dei and Machine Personhood - Logos Lab');
    await expect(event.breadcrumb.getByRole('link', { name: 'Events' })).toHaveAttribute(
      'href',
      '/events',
    );
    await expect(event.breadcrumb.locator('[aria-current="page"]')).toHaveText(
      'Live Q&A: Imago Dei and Machine Personhood',
    );
    await expect(event.heading).toHaveText('Live Q&A: Imago Dei and Machine Personhood');
    await expect(event.date).toContainText('27');
    await expect(event.date).toContainText('Oct');
    await expect(event.facts.nth(0)).toContainText(/Tuesday.*October 27, 2026.*12:00.*1:00.*ET/);
    await expect(event.facts.nth(1)).toHaveText('Online');
    await expect(event.facts.nth(2)).toHaveText('Hosted by Dr. Abena Mensah');
    await expect(event.aboutText).toHaveCount(2);
    await expect(event.aboutText.first()).toContainText('Bring your questions about personhood');
    await expect(event.topics.getByRole('link')).toHaveText([
      'The image of God and personhood',
      'Philosophy of mind',
    ]);
    await expect(event.topics.getByRole('link').nth(1)).toHaveAttribute(
      'href',
      '/topics/philosophy-of-mind',
    );
    await expect(event.hosts).toHaveCount(1);
    await expect(event.hosts.first().getByRole('link')).toHaveAttribute(
      'href',
      '/experts/abena-mensah',
    );
    await expect(event.hosts.first()).toContainText('Theologian · leads the Imago Dei cohort');
  });

  // L2-052 AC1 · event-head AC-2
  test('names every host and gives a host without a profile no link', async ({ page, api }) => {
    api.respond(
      'GET',
      '/events/by-slug/live-qa-imago-dei-and-machine-personhood',
      eventPage({
        hosts: [
          {
            name: 'Logos Lab',
            slug: null,
            meta: 'Organised by the Logos Lab editors',
            photoUrl: null,
          },
          liveQaPage.hosts[0],
        ],
      }),
    );
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.facts.nth(2)).toHaveText('Hosted by Logos Lab and Dr. Abena Mensah');
    await expect(event.hosts).toHaveCount(2);
    await expect(event.hosts.first()).toContainText('Logos Lab');
    await expect(event.hosts.first().getByRole('link')).toHaveCount(0);
    await expect(event.hosts.nth(1).getByRole('link')).toHaveCount(1);
  });

  // L2-052 AC1 · L2-141
  test('an event that is not published shows the not-found page', async ({ page, api }) => {
    api.fail('GET', '/events/by-slug/live-qa-imago-dei-and-machine-personhood', 404, 'not-found');
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.heading).toHaveText("We can't find that page");
  });

  // L2-052 AC1 · timeline AC-1
  test('lists the agenda in order, with the zone its times are in', async ({ page, api }) => {
    api.respond('GET', '/events/by-slug/live-qa-imago-dei-and-machine-personhood', liveQaPage);
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.agendaItems).toHaveCount(4);
    await expect(event.agendaItems.nth(0)).toContainText(/12:00\s?(PM|p\.m\.)/);
    await expect(event.agendaItems.nth(0)).toContainText('Welcome and opening prayer');
    await expect(event.agendaItems.nth(1)).toContainText(/12:05\s?(PM|p\.m\.)/);
    await expect(event.agendaItems.nth(3)).toContainText('Closing reflection');
    await expect(event.agendaNote).toHaveText('Times in Eastern Time (ET).');
  });

  // L2-052 AC1
  test('an event with no agenda has no Agenda section', async ({ page, api }) => {
    api.respond(
      'GET',
      '/events/by-slug/live-qa-imago-dei-and-machine-personhood',
      eventPage({ agenda: [] }),
    );
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.agenda).toHaveCount(0);
  });

  // L2-052 AC2 · event-head AC-3
  test('an in-person event shows its venue and a link to the maps app, and loads no map', async ({
    page,
    api,
  }) => {
    api.respond(
      'GET',
      '/events/by-slug/faith-and-ai-evening-is-creativity-sacred',
      creativityEveningPage,
    );
    const event = new EventPage(page);

    await event.open('/events/faith-and-ai-evening-is-creativity-sacred');

    await expect(event.facts.nth(1)).toHaveText("In person · St. Brigid's Hall, Ottawa");
    await expect(event.venueName).toHaveText("St. Brigid's Hall");
    await expect(event.venueAddress).toContainText('210 Bank Street, Ottawa');
    await expect(event.mapsLink).toHaveAttribute(
      'href',
      'geo:0,0?q=210%20Bank%20Street%2C%20Ottawa',
    );
    await expect(page.locator('iframe')).toHaveCount(0);
  });

  // L2-052 AC2
  test('a hybrid event names both ways to attend', async ({ page, api }) => {
    api.respond(
      'GET',
      '/events/by-slug/live-qa-imago-dei-and-machine-personhood',
      eventPage({ attendance: 'hybrid', venue: creativityEveningPage.venue }),
    );
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.facts.nth(1)).toHaveText("Hybrid · online and at St. Brigid's Hall, Ottawa");
    await expect(event.venueName).toHaveText("St. Brigid's Hall");
  });

  // L2-052 AC2
  test('an online event has no Where section', async ({ page, api }) => {
    api.respond('GET', '/events/by-slug/live-qa-imago-dei-and-machine-personhood', liveQaPage);
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.where).toHaveCount(0);
  });

  // L2-053 AC1 · rsvp-panel AC-2
  test('a visitor is asked to sign in or create an account, returning to the event', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/events/by-slug/live-qa-imago-dei-and-machine-personhood', liveQaPage);
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.panelTitle).toHaveText('Sign in to register');
    await expect(event.panelText).toHaveText(
      'Registration is free with a Logos Lab account. After you sign in, we bring you back here to finish.',
    );
    await expect(event.signIn).toHaveAttribute(
      'href',
      '/sign-in?returnUrl=%2Fevents%2Flive-qa-imago-dei-and-machine-personhood',
    );
    await expect(event.createAccount).toHaveAttribute(
      'href',
      '/register?returnUrl=%2Fevents%2Flive-qa-imago-dei-and-machine-personhood',
    );
    await expect(event.places).toHaveAttribute('aria-valuenow', '62');
    await expect(event.placesText).toHaveText('311 registered · 189 places left');
  });

  // L2-052 AC1 · rsvp-panel AC-1
  test('a member who has not registered sees the places left and how the join link works', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/me/events/e-live-qa', { registration: null });
    api.respond('GET', '/events/by-slug/live-qa-imago-dei-and-machine-personhood', liveQaPage);
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.panelTitle).toHaveText('Register for this event');
    await expect(event.panelText).toHaveText(
      "Free for members. We'll email you a calendar file and remind you a day and an hour before.",
    );
    await expect(event.placesText).toHaveText('311 registered · 189 places left');
    await expect(event.panelHelp).toHaveText(
      'The join link is shown only to registered members, from 15 minutes before the start.',
    );
    await expect(event.signIn).toHaveCount(0);
  });

  // L2-054 AC1 · rsvp-panel AC-4
  test('a full event says so, and how the waitlist works', async ({ page, api }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/me/events/e-policy-workshop', { registration: null });
    api.respond(
      'GET',
      '/events/by-slug/workshop-writing-an-ai-policy-for-your-church',
      policyWorkshopPage,
    );
    const event = new EventPage(page);

    await event.open('/events/workshop-writing-an-ai-policy-for-your-church');

    await expect(event.panelTitle).toHaveText('This event is full');
    await expect(event.panelStatus).toHaveText('2 people on the waitlist');
    await expect(event.places).toHaveAttribute('aria-valuenow', '100');
    await expect(event.placesText).toHaveText('40 registered · no places left');
    await expect(event.panel).toContainText(
      'If someone cancels more than 2 hours before the start, the first person waiting gets the place automatically and an email.',
    );
  });

  // L2-052 AC1
  test('an event with no capacity limit shows no places meter', async ({ page, api }) => {
    api.respond(
      'GET',
      '/events/by-slug/live-qa-imago-dei-and-machine-personhood',
      eventPage({ capacity: null }),
    );
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.panelTitle).toHaveText('Sign in to register');
    await expect(event.places).toHaveCount(0);
  });

  // L2-053 AC1, L2-058 AC1 · rsvp-panel AC-5
  test('a registered member sees they are in, and when the join link appears', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/events/by-slug/live-qa-imago-dei-and-machine-personhood', liveQaPage);
    api.respond('GET', '/me/events/e-live-qa', {
      registration: { status: 'registered', waitlistPosition: null },
    });
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.panel).toHaveClass(/rsvp--going/);
    await expect(event.panelTitle).toHaveText("You're registered");
    await expect(event.panelStatus).toHaveText('Registered');
    await expect(event.placesText).toHaveText('311 registered, including you · 189 places left');
    await expect(event.panelHelp).toContainText(
      /The join link appears here from 11:45.*ET on Tue.*Oct 27, 15 minutes before the start\./,
    );
    await expect(event.signIn).toHaveCount(0);
  });

  // L2-058 AC1 · rsvp-panel AC-6
  test('in the quarter hour before the start the panel says how soon it begins', async ({
    page,
    api,
  }) => {
    await page.clock.setFixedTime(new Date('2026-10-27T15:48:00Z'));
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/events/by-slug/live-qa-imago-dei-and-machine-personhood', liveQaPage);
    api.respond('GET', '/me/events/e-live-qa', {
      registration: { status: 'registered', waitlistPosition: null },
    });
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.panelTitle).toHaveText("You're registered");
    await expect(event.panelStatus).toHaveText('Registered · starts in 12 minutes');
    await expect(event.placesText).toHaveText('311 registered, including you');
    await expect(event.panelHelp).toHaveCount(0);
  });

  // L2-052 AC1 · rsvp-panel AC-7
  test('while the event is on, the panel says Happening now and when it ends', async ({
    page,
    api,
  }) => {
    await page.clock.setFixedTime(new Date('2026-10-27T16:20:00Z'));
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/events/by-slug/live-qa-imago-dei-and-machine-personhood', liveQaPage);
    api.respond('GET', '/me/events/e-live-qa', {
      registration: { status: 'registered', waitlistPosition: null },
    });
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.panelTitle).toHaveText('Happening now');
    await expect(event.panelBadge).toHaveText('Happening now');
    await expect(event.panelStatus).toHaveText('Registered');
    await expect(event.panelHelp).toContainText(/Started at 12:00.*ET\. Ends at 1:00.*ET\./);
  });

  // L2-054 AC1 · rsvp-panel AC-8
  test('a member on the waitlist sees their number and how a place is offered', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/events/by-slug/workshop-writing-an-ai-policy-for-your-church', {
      ...policyWorkshopPage,
      waitlistCount: 3,
    });
    api.respond('GET', '/me/events/e-policy-workshop', {
      registration: { status: 'waitlisted', waitlistPosition: 3 },
    });
    const event = new EventPage(page);

    await event.open('/events/workshop-writing-an-ai-policy-for-your-church');

    await expect(event.panel).not.toHaveClass(/rsvp--going/);
    await expect(event.panelTitle).toHaveText("You're on the waitlist");
    await expect(event.panelStatus).toHaveText("You're number 3 of 3");
    await expect(event.placesText).toHaveText('40 registered · no places left');
    await expect(event.panel).toContainText(
      "If a place opens more than 2 hours before the start, we register you automatically and email you. Closer to the start, you'll have 30 minutes to accept.",
    );
  });

  // L2-052 AC1
  test('when the member state cannot be read, the member sees the panel any member would', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/events/by-slug/live-qa-imago-dei-and-machine-personhood', liveQaPage);
    api.fail('GET', '/me/events/e-live-qa', 500);
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.panelTitle).toHaveText('Register for this event');
  });
});

test.describe('Event page for a viewer in another time zone', () => {
  test.use({ viewport: { width: 1440, height: 900 }, timezoneId: 'America/Vancouver' });

  // L2-052 AC1 · button-group AC-1
  test("shows times in the viewer's zone, and in the event's on request", async ({ page, api }) => {
    api.respond('GET', '/events/by-slug/live-qa-imago-dei-and-machine-personhood', liveQaPage);
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.zone('Your time (PT)')).toHaveAttribute('aria-pressed', 'true');
    await expect(event.zone('Event time (ET)')).toHaveAttribute('aria-pressed', 'false');
    await expect(event.facts.nth(0)).toContainText(/9:00.*10:00.*PT/);
    await expect(event.agendaItems.nth(0)).toContainText(/9:00\s?(AM|a\.m\.)/);
    await expect(event.agendaNote).toHaveText('Times in Pacific Time (PT).');

    await event.zone('Event time (ET)').click();

    await expect(event.zone('Event time (ET)')).toHaveAttribute('aria-pressed', 'true');
    await expect(event.zone('Your time (PT)')).toHaveAttribute('aria-pressed', 'false');
    await expect(event.facts.nth(0)).toContainText(/12:00.*1:00.*ET/);
    await expect(event.agendaItems.nth(0)).toContainText(/12:00\s?(PM|p\.m\.)/);
    await expect(event.agendaNote).toHaveText('Times in Eastern Time (ET).');
  });
});
