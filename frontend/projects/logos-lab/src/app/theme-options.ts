import { MenuSection } from '@logos-lab/components';
import { ThemePreference } from './theme-preference';

const LABELS: Record<ThemePreference, string> = {
  system: $localize`:@@theme.system:Match my device`,
  light: $localize`:@@theme.light:Light`,
  dark: $localize`:@@theme.dark:Dark`,
};

/** The theme choices as menu items, with the current one checked. */
export function themeItems(current: ThemePreference): MenuSection['items'] {
  return (['system', 'light', 'dark'] as const).map((value) => ({
    id: value,
    label: LABELS[value],
    checked: value === current,
  }));
}

/** The theme button's accessible name, "Theme: match my device". */
export function themeButtonLabel(current: ThemePreference): string {
  switch (current) {
    case 'light':
      return $localize`:@@theme.button.light:Theme: light`;
    case 'dark':
      return $localize`:@@theme.button.dark:Theme: dark`;
    default:
      return $localize`:@@theme.button.system:Theme: match my device`;
  }
}
