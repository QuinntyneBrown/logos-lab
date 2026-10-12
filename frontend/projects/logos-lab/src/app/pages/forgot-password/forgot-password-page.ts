import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
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
import { EMAIL_PATTERN } from '../../forms/email-pattern';

@Component({
  selector: 'll-forgot-password-page',
  imports: [RouterLink, AuthCard, Form, FormField, FormSummary, Input, Button],
  templateUrl: './forgot-password-page.html',
  styleUrl: './forgot-password-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPage {
  private readonly authApi = inject(AUTH_API);
  private readonly injector = inject(Injector);
  private readonly summary = viewChild(FormSummary);
  private readonly sentHeading = viewChild<ElementRef<HTMLElement>>('sentHeading');
  private readonly emailInput = viewChild('emailInput', { read: ElementRef<HTMLInputElement> });

  protected readonly busy = signal(false);
  /** True once the API took the request; the page then shows the same message for any address. */
  protected readonly sent = signal(false);

  protected readonly email = signal('');
  protected readonly errors = signal<readonly FormError[]>([]);
  protected readonly emailError = computed(() => this.errors()[0]?.message ?? null);

  protected submit(): void {
    const errors = this.validate();
    this.errors.set(errors);
    if (errors.length) {
      this.summary()?.focus();
      return;
    }
    this.busy.set(true);
    this.authApi.requestPasswordReset(this.email().trim()).subscribe({
      next: () => {
        this.busy.set(false);
        this.sent.set(true);
        this.focusAfterRender(() => this.sentHeading()?.nativeElement);
      },
    });
  }

  protected useDifferentEmail(): void {
    this.email.set('');
    this.errors.set([]);
    this.sent.set(false);
    this.focusAfterRender(() => this.emailInput()?.nativeElement);
  }

  private focusAfterRender(target: () => HTMLElement | undefined): void {
    afterNextRender(() => target()?.focus(), { injector: this.injector });
  }

  private validate(): FormError[] {
    const email = this.email().trim();
    if (!email)
      return [
        {
          controlId: 'email',
          message: $localize`:@@forgotPassword.error.emailMissing:Enter your email`,
        },
      ];
    if (!EMAIL_PATTERN.test(email))
      return [
        {
          controlId: 'email',
          message: $localize`:@@forgotPassword.error.emailFormat:Enter your email in the form name@example.ca`,
        },
      ];
    return [];
  }
}
