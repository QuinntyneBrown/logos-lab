import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeader, SettingsLayout, SidebarNavigation } from '@logos-lab/components';
import { SETTINGS_NAVIGATION } from '../../settings-navigation';

@Component({
  selector: 'll-settings-profile-page',
  imports: [SettingsLayout, SidebarNavigation, PageHeader],
  templateUrl: './settings-profile-page.html',
  styleUrl: './settings-profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsProfilePage {
  protected readonly settingsNavigation = SETTINGS_NAVIGATION;
}
