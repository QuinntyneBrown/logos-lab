import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AUTH_API } from '@logos-lab/api';
import {
  AuthCard,
  Button,
  Form,
  FormError,
  FormField,
  FormSummary,
  Input,
} from '@logos-lab/components';
import { safeReturnUrl } from '../../return-url';
import { Session } from '../../session';

const SIX_DIGITS = /^\d{6}$/;

/** The second sign-in step (detailed design accounts/set-up-two-step-verification). */
@Component({
  selector: 'll-sign-in-verify-page',
  imports: [RouterLink, AuthCard, Form, FormField, FormSummary, Input, Button],
  templateUrl: './sign-in-verify-page.html',
  styleUrl: './sign-in-verify-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInVerifyPage {
  private readonly authApi = inject(AUTH_API);
  private readonly session = inject(Session);
  private readonly router = inject(Router);
  private readonly summary = viewChild(FormSummary);
  private readonly query = toSignal(inject(ActivatedRoute).queryParamMap, { requireSync: true });
  private readonly returnUrl = computed(() => safeReturnUrl(this.query().get('returnUrl')));

  protected readonly code = signal('');
  protected readonly busy = signal(false);
  protected readonly errors = signal<readonly FormError[]>([]);
  protected readonly fieldError = computed(() => this.errors()[0]?.message ?? null);

  protected submit(): void {
    if (this.busy()) return;
    const errors = this.validate();
    this.errors.set(errors);
    if (errors.length) {
      this.summary()?.focus();
      return;
    }
    this.busy.set(true);
    this.authApi.verifySecondFactor({ code: this.code().trim() }).subscribe({
      next: () => {
        this.session.load();
        void this.router.navigateByUrl(this.returnUrl());
      },
      error: () => this.busy.set(false),
    });
  }

  private validate(): FormError[] {
    const value = this.code().trim();
    return SIX_DIGITS.test(value)
      ? []
      : [
          {
            controlId: 'code',
            message: $localize`:@@signInVerify.error.code:Enter the 6-digit code from your app`,
          },
        ];
  }
}
