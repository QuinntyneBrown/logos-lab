/** GET /api/v1/search/suggestions?q=imag (SearchSuggestions). */
export const imagSuggestions = {
  suggestions: [
    {
      kind: 'course',
      slug: 'imago-dei-in-an-age-of-machines',
      label: [
        { text: 'Imag', highlighted: true },
        { text: 'o Dei in an Age of Machines', highlighted: false },
      ],
    },
    {
      kind: 'expert',
      slug: 'abena-mensah',
      label: [{ text: 'Dr. Abena Mensah', highlighted: false }],
    },
    {
      kind: 'topic',
      slug: 'the-image-of-god-and-personhood',
      itemCount: 28,
      label: [
        { text: 'The ', highlighted: false },
        { text: 'imag', highlighted: true },
        { text: 'e of God and personhood', highlighted: false },
      ],
    },
  ],
};
