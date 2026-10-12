import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AUTH_API } from '@logos-lab/api';
import { AuthCard, Button, Form, SpinnerRegion } from '@logos-lab/components';
import { VerifyEmailState } from './verify-email-state';

@Component({
  selector: 'll-verify-email-page',
  imports: [AuthCard, Form, Button, SpinnerRegion],
  templateUrl: './verify-email-page.html',
  styleUrl: './verify-email-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailPage {
  private readonly authApi = inject(AUTH_API);
  private readonly token = inject(ActivatedRoute).snapshot.queryParamMap.get('token') ?? '';

  protected readonly state = signal<VerifyEmailState>({ kind: 'loading' });

  constructor() {
    this.authApi.lookUpEmailVerification(this.token).subscribe({
      next: (verification) => this.state.set({ kind: 'ready', verification }),
    });
  }

  protected confirm(): void {
    // Confirming arrives in the next slice.
  }
}
