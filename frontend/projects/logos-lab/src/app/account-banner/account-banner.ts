import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Banner, Button } from '@logos-lab/components';
import { Session } from '../session';

/** Kept for the browser session, so "Dismiss for now" lasts until the next sign-in. */
const DISMISSED_KEY = 'll.accountBanner.dismissed';

/**
 * The account banner below the header for an unverified member (detailed design
 * accounts/verify-email, "Account banner rules").
 */
@Component({
  selector: 'll-account-banner',
  imports: [Banner, Button],
  templateUrl: './account-banner.html',
  styleUrl: './account-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountBanner {
  private readonly session = inject(Session);
  private readonly dismissed = signal(readDismissed());

  protected readonly unverified = computed(() => {
    const member = this.session.member();
    return member && !member.emailVerified ? member : null;
  });

  protected readonly shown = computed(() => !!this.unverified() && !this.dismissed());

  protected dismiss(): void {
    this.dismissed.set(true);
    try {
      sessionStorage.setItem(DISMISSED_KEY, 'true');
    } catch {
      // Storage can be unavailable; the banner then stays hidden for this page only.
    }
  }
}

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}
