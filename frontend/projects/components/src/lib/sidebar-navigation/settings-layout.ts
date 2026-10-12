import { ChangeDetectionStrategy, Component } from '@angular/core';

/** The body of Settings, Admin and Moderation: the settings navigation beside or above the content. */
@Component({
  selector: 'll-settings-layout',
  templateUrl: './settings-layout.html',
  styleUrl: './settings-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsLayout {}
