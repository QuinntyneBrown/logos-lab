import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_API, Capability, CurrentMember, ME_API } from '@logos-lab/api';
import { catchError, of } from 'rxjs';

/**
 * The signed-in member for this tab: `undefined` while it loads, `null` for a visitor. The shell
 * builds the header, account menu and drawer from it (detailed design responsive-theming/navigate-globally).
 */
@Injectable({ providedIn: 'root' })
export class Session {
  private readonly meApi = inject(ME_API);
  private readonly authApi = inject(AUTH_API);
  private readonly router = inject(Router);

  readonly member = signal<CurrentMember | null | undefined>(undefined);
  /** True once the member verifies their email during this session, until acknowledged. */
  readonly justVerified = signal(false);

  load(): void {
    this.meApi
      .getMe()
      .pipe(catchError(() => of(null)))
      .subscribe((member) => {
        const before = this.member();
        if (before && !before.emailVerified && member?.emailVerified) this.justVerified.set(true);
        this.member.set(member);
      });
  }

  can(capability: Capability): boolean {
    return this.member()?.capabilities.includes(capability) ?? false;
  }

  signOut(): void {
    this.authApi.signOut().subscribe({
      next: () => this.signedOut(),
      error: () => this.signedOut(),
    });
  }

  private signedOut(): void {
    this.member.set(null);
    void this.router.navigate(['/sign-in'], { queryParams: { signedOut: true } });
  }
}
