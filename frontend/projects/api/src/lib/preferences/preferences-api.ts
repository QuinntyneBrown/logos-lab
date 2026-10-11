import { Observable } from 'rxjs';
import { ThemePreference } from './theme-preference';

/** The member's display preferences (detailed design responsive-theming/select-theme). */
export interface PreferencesApi {
  /** PATCH /api/v1/me/preferences. */
  updateTheme(themePreference: ThemePreference): Observable<void>;
}
