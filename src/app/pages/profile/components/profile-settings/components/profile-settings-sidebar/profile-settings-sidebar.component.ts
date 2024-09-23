import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileSettingsService } from '../../services/profile-settings.service';
import { StorageService } from '@core/services/storage/storage.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { SnackTypeEnum, ThemeEnum } from '@shared/types/types.enums';
import { THEME_KEY } from '@shared/data/constants';
import { SETTINGS_SAVED } from '@shared/data/sentences';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-profile-settings-sidebar',
  templateUrl: './profile-settings-sidebar.component.html',
  styleUrl: './profile-settings-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileSettingsSidebarComponent {

  dialogOpen$: Observable<boolean>;

  constructor(
    private settingsSrv: ProfileSettingsService,
    private ls: StorageService,
    private crafter: CrafterService
  ) {
    this.dialogOpen$ = crafter.snack$.pipe(map(snack => Boolean(snack.message)));
  }
  
  public saveSettings(): void {
    const settings = this.settingsSrv.settingsState();
    if (settings.theme === ThemeEnum.LIGHT) {
      document.body.classList.remove(ThemeEnum.DARK);
    } else {
      document.body.classList.add(ThemeEnum.DARK);
    }
    this.ls.setSettings(settings);
    this.ls.setKey(THEME_KEY, settings.theme);
    this.crafter.setSnack(SETTINGS_SAVED, SnackTypeEnum.INFO);
  }

}
