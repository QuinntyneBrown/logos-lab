/** GET /api/v1/events/by-slug/{slug} for the online Live Q&A (EventPageModel), before anyone registers. */
export const liveQaPage = {
  id: 'e-live-qa',
  slug: 'live-qa-imago-dei-and-machine-personhood',
  title: 'Live Q&A: Imago Dei and Machine Personhood',
  description: [
    'Bring your questions about personhood, the image of God and the machines we are building. Dr. Abena Mensah opens with fifteen minutes on what the image of God is not, then takes questions from registrants, live and sent in advance.',
    'Members of the Imago Dei, Autumn 2026 cohort will find this a good companion to section 3 of the course, but everyone is welcome. A recording is shared with registrants afterwards.',
  ],
  attendance: 'online',
  startsAt: '2026-10-27T16:00:00Z',
  endsAt: '2026-10-27T17:00:00Z',
  timeZone: 'America/Toronto',
  hosts: [
    {
      name: 'Dr. Abena Mensah',
      slug: 'abena-mensah',
      meta: 'Theologian · leads the Imago Dei cohort',
      photoUrl: '/media/amara-osei.jpg',
    },
  ],
  topics: [
    { slug: 'the-image-of-god-and-personhood', name: 'The image of God and personhood' },
    { slug: 'philosophy-of-mind', name: 'Philosophy of mind' },
  ],
  agenda: [
    { startsAt: '2026-10-27T16:00:00Z', text: 'Welcome and opening prayer' },
    { startsAt: '2026-10-27T16:05:00Z', text: 'Dr. Abena Mensah: what the image of God is not' },
    { startsAt: '2026-10-27T16:20:00Z', text: 'Your questions, live and sent in advance' },
    { startsAt: '2026-10-27T16:55:00Z', text: 'Closing reflection' },
  ],
  venue: null,
  registeredCount: 311,
  capacity: 500,
  waitlistCount: 0,
  registrationClosesAt: null,
  cancellation: null,
  change: null,
};

/** The event page model with some fields changed. */
export function eventPage(overrides: Record<string, unknown> = {}) {
  return { ...liveQaPage, ...overrides };
}

/** The in-person evening hosted by Logos Lab itself, which has no expert profile. */
export const creativityEveningPage = eventPage({
  id: 'e-creativity',
  slug: 'faith-and-ai-evening-is-creativity-sacred',
  title: 'Faith and AI Evening: Is Creativity Sacred?',
  description: ['An evening of conversation about making things: art, music, writing and code.'],
  attendance: 'in-person',
  startsAt: '2026-10-22T23:00:00Z',
  endsAt: '2026-10-23T01:00:00Z',
  hosts: [
    { name: 'Logos Lab', slug: null, meta: 'Organised by the Logos Lab editors', photoUrl: null },
  ],
  topics: [{ slug: 'creativity-and-the-arts', name: 'Creativity and the arts' }],
  agenda: [],
  venue: { name: "St. Brigid's Hall", address: '210 Bank Street, Ottawa', city: 'Ottawa' },
  registeredCount: 87,
  capacity: 120,
});

/** The hybrid workshop that is full, with two people waiting. */
export const policyWorkshopPage = eventPage({
  id: 'e-policy-workshop',
  slug: 'workshop-writing-an-ai-policy-for-your-church',
  title: 'Workshop: Writing an AI Policy for Your Church',
  attendance: 'hybrid',
  startsAt: '2026-11-07T15:00:00Z',
  endsAt: '2026-11-07T17:30:00Z',
  venue: creativityEveningPage.venue,
  agenda: [],
  registeredCount: 40,
  capacity: 40,
  waitlistCount: 2,
});
