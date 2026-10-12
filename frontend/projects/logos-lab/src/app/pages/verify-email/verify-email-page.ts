import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AUTH_API, EmailVerification } from '@logos-lab/api';
import { AuthCard, Button, Form, SpinnerRegion } from '@logos-lab/components';
import { VerifyEmailState } from './verify-email-state';

@Component({
  selector: 'll-verify-email-page',
  imports: [RouterLink, AuthCard, Form, Button, SpinnerRegion],
  templateUrl: './verify-email-page.html',
  styleUrl: './verify-email-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailPage {
  private readonly authApi = inject(AUTH_API);
  private readonly injector = inject(Injector);
  private readonly token = inject(ActivatedRoute).snapshot.queryParamMap.get('token') ?? '';
  private readonly heading = viewChild<ElementRef<HTMLElement>>('heading');

  protected readonly state = signal<VerifyEmailState>({ kind: 'loading' });

  constructor() {
    this.authApi.lookUpEmailVerification(this.token).subscribe({
      next: (verification) => this.state.set({ kind: 'ready', verification }),
      error: (error: unknown) => this.refused(error, null),
    });
  }

  protected confirm(verification: EmailVerification): void {
    this.state.set({ kind: 'loading' });
    this.authApi.confirmEmail(this.token).subscribe({
      next: () => this.show({ kind: 'verified', verification }, true),
      error: (error: unknown) => this.refused(error, verification),
    });
  }

  private refused(error: unknown, verification: EmailVerification | null): void {
    if (error instanceof HttpErrorResponse && error.status === 410) {
      const email = (error.error as { email?: string } | null)?.email ?? verification?.email;
      this.show({ kind: 'expired', email: email ?? null }, verification !== null);
    }
  }

  /** Shows a new state; after the visitor has acted, focus moves to its heading. */
  private show(state: VerifyEmailState, focus: boolean): void {
    this.state.set(state);
    if (focus) {
      afterNextRender(() => this.heading()?.nativeElement.focus(), { injector: this.injector });
    }
  }

  /** The greeting uses the first word of the display name: "Miriam Clarke" is greeted as "Miriam". */
  protected firstName(verification: EmailVerification): string {
    return verification.displayName.trim().split(/\s+/)[0];
  }
}
