import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { PREFERENCES_API, ThemePreference } from '@logos-lab/api';

const STORAGE_KEY = 'll-theme';

/**
 * Holds the theme preference and applies it at once through `<html data-theme>` (L2-133). Visitors'
 * choices are kept in local storage; the boot script in index.html reads them before first paint.
 */
@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly document = inject(DOCUMENT);
  private readonly preferencesApi = inject(PREFERENCES_API);

  readonly preference = signal<ThemePreference>(this.read());

  /** Applies a choice at once; for a member it is also saved to their account (L2-133 AC2). */
  choose(preference: ThemePreference, member = false): void {
    this.adopt(preference);
    if (member) this.preferencesApi.updateTheme(preference).subscribe({ error: () => undefined });
  }

  /** Applies a preference that is already stored, such as the member's on arrival. */
  adopt(preference: ThemePreference): void {
    this.preference.set(preference);
    this.apply(preference);
    this.write(preference);
  }

  private apply(preference: ThemePreference): void {
    const root = this.document.documentElement;
    if (preference === 'system') delete root.dataset['theme'];
    else root.dataset['theme'] = preference;
  }

  private read(): ThemePreference {
    try {
      const stored = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      return stored === 'light' || stored === 'dark' ? stored : 'system';
    } catch {
      return 'system';
    }
  }

  private write(preference: ThemePreference): void {
    try {
      const storage = this.document.defaultView?.localStorage;
      if (preference === 'system') storage?.removeItem(STORAGE_KEY);
      else storage?.setItem(STORAGE_KEY, preference);
    } catch {
      // Private browsing can refuse storage; the theme still applies for this page.
    }
  }
}
