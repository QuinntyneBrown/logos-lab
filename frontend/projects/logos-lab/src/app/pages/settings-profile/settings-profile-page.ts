import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACCOUNT_API, MemberProfile } from '@logos-lab/api';
import {
  Alert,
  Button,
  Checkbox,
  Form,
  FormField,
  Input,
  PageHeader,
  PhotoEdit,
  SettingsLayout,
  SidebarNavigation,
  Skeleton,
  Textarea,
} from '@logos-lab/components';
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
  private readonly accountApi = inject(ACCOUNT_API);
  protected readonly member = inject(Session).member;
  protected readonly settingsNavigation = SETTINGS_NAVIGATION;

  protected readonly state = signal<SettingsProfileState>('loading');
  protected readonly avatarUrl = signal<string | null>(null);
  protected readonly displayName = signal('');
  protected readonly bio = signal('');
  protected readonly pronouns = signal('');
  protected readonly profileVisible = signal(true);
  protected readonly bioCounter = computed(() => `${this.bio().length} / ${BIO_LIMIT}`);

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
    // Saving arrives with the next slice.
  }

  private show(profile: MemberProfile): void {
    this.avatarUrl.set(profile.avatarUrl);
    this.displayName.set(profile.displayName);
    this.bio.set(profile.bio);
    this.pronouns.set(profile.pronouns);
    this.profileVisible.set(profile.profileVisible);
  }
}
