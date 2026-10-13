import { catalogueItems } from './catalogue';

/** GET /api/v1/experts/abena-mensah: docs/mocks/pages/expert-profile/default. */
export const abenaMensah = {
  slug: 'abena-mensah',
  name: 'Dr. Abena Mensah',
  photoUrl: '/media/amara-osei.jpg',
  title: 'Associate Professor of Systematic Theology',
  affiliation: 'Kingsgate Theological College',
  bioHtml:
    "<p>Abena Mensah is a theologian who writes about what it means to be human. Dr. Mensah's work in <em>theological anthropology</em> asks how the church's teaching that we are made in the image of God should shape the way we build and use machines that speak and reason.</p><p>Dr. Mensah teaches systematic theology and leads the Imago Dei cohort on Logos Lab each autumn. The book <strong>Made, Not Manufactured</strong> came out in 2025.</p><script>window.__bioScriptRan = true</script>",
  followerCount: 1284,
  itemCount: 7,
  expertise: [
    { slug: 'the-image-of-god-and-personhood', name: 'The image of God and personhood' },
    { slug: 'theology-of-technology', name: 'Theology of technology' },
    { slug: 'formation-and-education', name: 'Formation and education' },
  ],
  links: [
    { label: 'Faculty page', url: 'https://kingsgate.example.ca/faculty/mensah' },
    { label: 'Made, Not Manufactured', url: 'https://made-not-manufactured.example.ca' },
    { label: 'Sermons and lectures', url: 'https://abenamensah.example.ca/talks' },
  ],
  counts: [
    { type: 'course', count: 1 },
    { type: 'video', count: 1 },
    { type: 'article', count: 3 },
    { type: 'collection', count: 1 },
    { type: 'event', count: 1 },
  ],
};

/** GET /api/v1/experts/abena-mensah/content?type=course. */
export function expertContent(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    items: [catalogueItems[0]],
    total: 1,
    page: 1,
    pageCount: 1,
    ...overrides,
  };
}
