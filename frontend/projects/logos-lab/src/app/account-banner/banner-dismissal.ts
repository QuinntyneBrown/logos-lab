/** Kept for the browser session, so "Dismiss for now" lasts until the next sign-in. */
const DISMISSED_KEY = 'll.accountBanner.dismissed';

/** Whether the member dismissed the account banner in this browser session. */
export function readBannerDismissal(): boolean {
  try {
    return sessionStorage.getItem(DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function saveBannerDismissal(): void {
  try {
    sessionStorage.setItem(DISMISSED_KEY, 'true');
  } catch {
    // Storage can be unavailable; the banner then stays hidden for this page only.
  }
}

/** Signing out forgets the dismissal, so the next sign-in shows the banner again. */
export function clearBannerDismissal(): void {
  try {
    sessionStorage.removeItem(DISMISSED_KEY);
  } catch {
    // Nothing was kept.
  }
}
