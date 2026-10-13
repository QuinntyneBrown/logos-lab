import { CatalogueDuration, CatalogueLevel } from '@logos-lab/api';

/** The level filter's values, in the order the panel lists them. */
export const CATALOGUE_LEVELS: readonly CatalogueLevel[] = [
  'introductory',
  'intermediate',
  'advanced',
];

/** The length filter's values, shortest first. */
export const CATALOGUE_DURATIONS: readonly CatalogueDuration[] = ['under-15', '15-60', 'over-60'];

export function catalogueLevelLabel(level: CatalogueLevel): string {
  switch (level) {
    case 'introductory':
      return $localize`:@@catalogue.level.introductory:Introductory`;
    case 'intermediate':
      return $localize`:@@catalogue.level.intermediate:Intermediate`;
    case 'advanced':
      return $localize`:@@catalogue.level.advanced:Advanced`;
  }
}

export function catalogueDurationLabel(duration: CatalogueDuration): string {
  switch (duration) {
    case 'under-15':
      return $localize`:@@catalogue.duration.under15:Under 15 min`;
    case '15-60':
      return $localize`:@@catalogue.duration.15to60:15 to 60 min`;
    case 'over-60':
      return $localize`:@@catalogue.duration.over60:Over 60 min`;
  }
}
