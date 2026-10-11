import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { ThemePreference } from './theme-preference';

const STORAGE_KEY = 'll-theme';

/**
 * Holds the theme preference and applies it at once through `<html data-theme>` (L2-133). Visitors'
 * choices are kept in local storage; the boot script in index.html reads them before first paint.
 */
@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly document = inject(DOCUMENT);

  readonly preference = signal<ThemePreference>(this.read());

  choose(preference: ThemePreference): void {
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
