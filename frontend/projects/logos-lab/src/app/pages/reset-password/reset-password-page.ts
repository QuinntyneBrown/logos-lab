import { HttpErrorResponse } from '@angular/common/http';
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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AUTH_API } from '@logos-lab/api';
import {
  AuthCard,
  Button,
  Form,
  FormError,
  FormField,
  FormSummary,
  Input,
  SpinnerRegion,
} from '@logos-lab/components';
import { Session } from '../../session';
import { ResetPasswordState } from './reset-password-state';

@Component({
  selector: 'll-reset-password-page',
  imports: [RouterLink, AuthCard, Form, FormField, FormSummary, Input, Button, SpinnerRegion],
  templateUrl: './reset-password-page.html',
  styleUrl: './reset-password-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPage {
  private readonly authApi = inject(AUTH_API);
  private readonly session = inject(Session);
  private readonly injector = inject(Injector);
  private readonly summary = viewChild(FormSummary);
  private readonly heading = viewChild<ElementRef<HTMLElement>>('heading');
  private readonly token = inject(ActivatedRoute).snapshot.queryParamMap.get('token') ?? '';

  protected readonly state = signal<ResetPasswordState>({ kind: 'loading' });
  protected readonly password = signal('');
  protected readonly passwordShown = signal(false);
  protected readonly busy = signal(false);
  protected readonly errors = signal<readonly FormError[]>([]);
  protected readonly passwordError = computed(() => this.errors()[0]?.message ?? null);

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

  protected submit(email: string): void {
    if (this.busy()) return;
    const errors = this.validate();
    this.errors.set(errors);
    if (errors.length) {
      this.summary()?.focus();
      return;
    }
    this.busy.set(true);
    this.authApi.completePasswordReset(this.token, this.password()).subscribe({
      next: () => {
        this.busy.set(false);
        this.state.set({ kind: 'changed', email });
        // Every session has ended, this tab's included.
        if (this.session.member()) this.session.member.set(null);
        afterNextRender(() => this.heading()?.nativeElement.focus(), { injector: this.injector });
      },
    });
  }

  private validate(): FormError[] {
    const length = this.password().length;
    const error = (message: string): FormError[] => [{ controlId: 'password', message }];
    if (!length) return error($localize`:@@resetPassword.error.missing:Enter a new password`);
    if (length < 12)
      return error(
        $localize`:@@resetPassword.error.short:Use at least 12 characters. This one has ${length}:count:.`,
      );
    if (length > 128)
      return error(
        $localize`:@@resetPassword.error.long:Use at most 128 characters. This one has ${length}:count:.`,
      );
    return [];
  }
}
