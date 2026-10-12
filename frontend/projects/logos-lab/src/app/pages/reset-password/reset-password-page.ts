import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AUTH_API } from '@logos-lab/api';
import { AuthCard, Button, Form, FormField, Input, SpinnerRegion } from '@logos-lab/components';
import { ResetPasswordState } from './reset-password-state';

@Component({
  selector: 'll-reset-password-page',
  imports: [RouterLink, AuthCard, Form, FormField, Input, Button, SpinnerRegion],
  templateUrl: './reset-password-page.html',
  styleUrl: './reset-password-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPage {
  private readonly authApi = inject(AUTH_API);
  private readonly token = inject(ActivatedRoute).snapshot.queryParamMap.get('token') ?? '';

  protected readonly state = signal<ResetPasswordState>({ kind: 'loading' });
  protected readonly password = signal('');
  protected readonly passwordShown = signal(false);

  constructor() {
    this.authApi.checkPasswordResetLink(this.token).subscribe({
      next: ({ email }) => this.state.set({ kind: 'ready', email }),
      error: (error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 410) {
          this.state.set({ kind: 'expired' });
        }
      },
    });
  }

  protected submit(): void {
    // Saving arrives with a later slice.
  }
}
