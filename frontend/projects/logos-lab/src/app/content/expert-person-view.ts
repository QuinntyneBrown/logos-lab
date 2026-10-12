import { ExpertSummary } from '@logos-lab/api';
import { plural } from './plural';

/** The inputs of a person row for one featured expert. */
export interface ExpertPersonView {
  readonly name: string;
  readonly path: string;
  readonly photoUrl: string | null;
  readonly meta: readonly string[];
}

export function toExpertPerson(expert: ExpertSummary, locale: string): ExpertPersonView {
  const count = new Intl.NumberFormat(locale).format(expert.itemCount);
  return {
    name: expert.name,
    path: `/experts/${expert.slug}`,
    photoUrl: expert.photoUrl,
    meta: [
      plural(locale, expert.itemCount, {
        one: $localize`:@@expert.meta.one:${expert.expertise}:expertise: · ${count}:count: item`,
        other: $localize`:@@expert.meta.other:${expert.expertise}:expertise: · ${count}:count: items`,
      }),
    ],
  };
}
