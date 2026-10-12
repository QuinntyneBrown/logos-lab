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
  private readonly verifiedHeading = viewChild<ElementRef<HTMLElement>>('verifiedHeading');

  protected readonly state = signal<VerifyEmailState>({ kind: 'loading' });

  constructor() {
    this.authApi.lookUpEmailVerification(this.token).subscribe({
      next: (verification) => this.state.set({ kind: 'ready', verification }),
    });
  }

  protected confirm(verification: EmailVerification): void {
    this.state.set({ kind: 'loading' });
    this.authApi.confirmEmail(this.token).subscribe({
      next: () => {
        this.state.set({ kind: 'verified', verification });
        afterNextRender(() => this.verifiedHeading()?.nativeElement.focus(), {
          injector: this.injector,
        });
      },
    });
  }

  /** The greeting uses the first word of the display name: "Miriam Clarke" is greeted as "Miriam". */
  protected firstName(verification: EmailVerification): string {
    return verification.displayName.trim().split(/\s+/)[0];
  }
}
