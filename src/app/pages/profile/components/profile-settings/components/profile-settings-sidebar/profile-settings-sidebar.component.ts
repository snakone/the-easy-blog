import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileSettingsService } from '../../services/profile-settings.service';
import { StorageService } from '@core/services/storage/storage.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { SnackTypeEnum, ThemeEnum } from '@shared/types/types.enums';
import { THEME_KEY } from '@shared/data/constants';

@Component({
  selector: 'app-profile-settings-sidebar',
  templateUrl: './profile-settings-sidebar.component.html',
  styleUrl: './profile-settings-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileSettingsSidebarComponent {

  constructor(
    private settingsSrv: ProfileSettingsService,
    private ls: StorageService,
    private crafter: CrafterService
  ) {}
  
  public saveSettings(): void {
    const settings = this.settingsSrv.settingsState();
    if (settings.theme === ThemeEnum.LIGHT) {
      document.body.classList.remove(ThemeEnum.DARK);
    } else {
      document.body.classList.add(ThemeEnum.DARK);
    }
    this.ls.setSettings(settings);
    this.ls.setKey(THEME_KEY, settings.theme);
    this.crafter.setSnack('Configuración guardada', SnackTypeEnum.INFO);
  }

}
