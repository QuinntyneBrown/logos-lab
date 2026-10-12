import { people } from './people';

/** Featured experts as GET /api/v1/home returns them (ExpertSummary). */
export const experts = {
  abena: { ...people.abena, expertise: 'Theological anthropology', itemCount: 7 },
  thomas: { ...people.thomas, expertise: 'Christian ethics', itemCount: 11 },
  joel: { ...people.joel, expertise: 'Machine learning', itemCount: 9 },
} as const;
