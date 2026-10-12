/** The cast from docs/mocks/README.md, as the API returns authors and experts. */
export const people = {
  abena: { name: 'Dr. Abena Mensah', slug: 'abena-mensah', photoUrl: '/media/amara-osei.jpg' },
  thomas: { name: 'Rev. Dr. Thomas Hale', slug: 'thomas-hale', photoUrl: '/media/peter-walsh.jpg' },
  joel: { name: 'Dr. Joel Santos', slug: 'joel-santos', photoUrl: '/media/daniel-reyes.jpg' },
  lucia: { name: 'Dr. Lucía Ortega', slug: 'lucia-ortega', photoUrl: '/media/ruth-alvarez.jpg' },
  simon: {
    name: 'Prof. Simon Keller',
    slug: 'simon-keller',
    photoUrl: '/media/marcus-bennett.jpg',
  },
  meiLin: { name: 'Dr. Mei Lin Chen', slug: 'mei-lin-chen', photoUrl: '/media/grace-liu.jpg' },
  logosLab: { name: 'Logos Lab', slug: null, photoUrl: null, isLogosLab: true },
} as const;
