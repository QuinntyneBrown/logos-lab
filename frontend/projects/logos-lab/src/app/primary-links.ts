import { TopBarLink } from '@logos-lab/components';

/** The five primary destinations (L2-131). Courses and Collections filter the catalogue. */
export const PRIMARY_LINKS: readonly TopBarLink[] = [
  { label: $localize`:@@nav.explore:Explore`, path: '/explore' },
  { label: $localize`:@@nav.courses:Courses`, path: '/explore', queryParams: { type: 'course' } },
  { label: $localize`:@@nav.events:Events`, path: '/events' },
  { label: $localize`:@@nav.experts:Experts`, path: '/experts' },
  {
    label: $localize`:@@nav.collections:Collections`,
    path: '/explore',
    queryParams: { type: 'collection' },
  },
];
