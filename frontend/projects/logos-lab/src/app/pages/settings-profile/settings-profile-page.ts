import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  LOCALE_ID,
  signal,
  viewChild,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ACCOUNT_API, MemberProfile } from '@logos-lab/api';
import {
  Alert,
  Button,
  Checkbox,
  Form,
  FormError,
  FormField,
  FormSummary,
  InlineStatus,
  Input,
  PageHeader,
  PhotoEdit,
  SettingsLayout,
  SidebarNavigation,
  Skeleton,
  Textarea,
} from '@logos-lab/components';
import { countWords } from '../../content/count-words';
import { plural } from '../../content/plural';
import { Session } from '../../session';
import { SETTINGS_NAVIGATION } from '../../settings-navigation';
import { SettingsProfileState } from './settings-profile-state';

const BIO_LIMIT = 500;

@Component({
  selector: 'll-settings-profile-page',
  imports: [
    RouterLink,
    SettingsLayout,
    SidebarNavigation,
    PageHeader,
    Alert,
    Button,
    Checkbox,
    Form,
    FormField,
    FormSummary,
    InlineStatus,
    Input,
    PhotoEdit,
    Skeleton,
    Textarea,
  ],
  templateUrl: './settings-profile-page.html',
  styleUrl: './settings-profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsProfilePage {
  private readonly locale = inject(LOCALE_ID);
  private readonly accountApi = inject(ACCOUNT_API);
  private readonly session = inject(Session);
  private readonly summary = viewChild(FormSummary);
  protected readonly member = this.session.member;
  protected readonly settingsNavigation = SETTINGS_NAVIGATION;

  protected readonly state = signal<SettingsProfileState>('loading');
  protected readonly avatarUrl = signal<string | null>(null);
  protected readonly displayName = signal('');
  protected readonly bio = signal('');
  protected readonly pronouns = signal('');
  protected readonly profileVisible = signal(true);
  protected readonly bioCounter = computed(() => `${this.bio().length} / ${BIO_LIMIT}`);
  protected readonly busy = signal(false);
  protected readonly saved = signal(false);
  protected readonly saveFailed = signal(false);
  protected readonly errors = signal<readonly FormError[]>([]);
  protected readonly displayNameError = computed(() => this.errorFor('display-name'));
  protected readonly bioError = computed(() => this.errorFor('bio'));
  protected readonly summaryHeading = computed(() =>
    plural(this.locale, this.errors().length, {
      one: $localize`:@@settingsProfile.summary.one:One thing to fix before you can save`,
      other: $localize`:@@settingsProfile.summary.other:${countWords(this.locale, this.errors().length)}:count: things to fix before you can save`,
    }),
  );

  constructor() {
    this.load();
  }

  protected load(): void {
    this.state.set('loading');
    this.accountApi.getProfile().subscribe({
      next: (profile) => {
        this.show(profile);
        this.state.set('ready');
      },
      error: () => this.state.set('failed'),
    });
  }

  protected submit(): void {
    if (this.busy()) return;
    const errors = this.validate();
    this.errors.set(errors);
    this.saved.set(false);
    this.saveFailed.set(false);
    if (errors.length) {
      this.summary()?.focus();
      return;
    }
    this.busy.set(true);
    this.accountApi
      .updateProfile({
        displayName: this.displayName().trim(),
        bio: this.bio(),
        pronouns: this.pronouns().trim(),
        profileVisible: this.profileVisible(),
      })
      .subscribe({
        next: (profile) => {
          this.busy.set(false);
          this.show(profile);
          this.saved.set(true);
          this.session.member.update((member) =>
            member
              ? { ...member, displayName: profile.displayName, avatarUrl: profile.avatarUrl }
              : member,
          );
        },
        error: (error: unknown) => {
          this.busy.set(false);
          const refused = error instanceof HttpErrorResponse ? this.refusals(error) : [];
          if (refused.length) {
            this.errors.set(refused);
            setTimeout(() => this.summary()?.focus());
            return;
          }
          this.saveFailed.set(true);
        },
      });
  }

  /** The field errors of a 422, in this page's words. */
  private refusals(error: HttpErrorResponse): FormError[] {
    if (error.status !== 422) return [];
    const fields = ((error.error?.errors ?? []) as { field?: string }[]).map((e) => e.field);
    const errors: FormError[] = [];
    if (fields.includes('displayName')) errors.push(this.nameError());
    if (fields.includes('bio')) errors.push(this.bioLengthError());
    return errors;
  }

  private validate(): FormError[] {
    const errors: FormError[] = [];
    const name = this.displayName().trim().length;
    if (name < 2 || name > 50) errors.push(this.nameError());
    if (this.bio().length > BIO_LIMIT) errors.push(this.bioLengthError());
    return errors;
  }

  private nameError(): FormError {
    const count = this.displayName().trim().length;
    return {
      controlId: 'display-name',
      message: $localize`:@@settingsProfile.error.displayName:Enter a display name of 2 to 50 characters. This one has ${count}:count:.`,
    };
  }

  private bioLengthError(): FormError {
    const count = this.bio().length;
    return {
      controlId: 'bio',
      message: $localize`:@@settingsProfile.error.bio:Shorten your bio to 500 characters. It has ${count}:count: now.`,
    };
  }

  private errorFor(controlId: string): string | null {
    return this.errors().find((error) => error.controlId === controlId)?.message ?? null;
  }

  private show(profile: MemberProfile): void {
    this.avatarUrl.set(profile.avatarUrl);
    this.displayName.set(profile.displayName);
    this.bio.set(profile.bio);
    this.pronouns.set(profile.pronouns);
    this.profileVisible.set(profile.profileVisible);
  }
}
