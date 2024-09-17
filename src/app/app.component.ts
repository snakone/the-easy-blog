import { Component, inject } from '@angular/core';

import { UsersFacade } from '@store/users/users.facade';
import { PWAService } from '@services/pwa/pwa.service';
import { StorageService } from '@services/storage/storage.service';

import { AUTO_LOGIN_KEY, THEME_KEY, TOKEN_KEY } from '@shared/data/constants';
import { ThemeEnum } from '@shared/types/types.enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  ls = inject(StorageService);
  pwa = inject(PWAService);
  userFacade = inject(UsersFacade);

  constructor() {
    this.checkTheme();
    this.checkToken();
    this.pwa.updateSW();
  }

  /**
   * Check the theme with the Storage value.
   * Toggle document.body class if "Dark"
  */
  public checkTheme(): void {
    if (this.ls.getSettings(THEME_KEY) === ThemeEnum.DARK) {
      document.body.classList.toggle(ThemeEnum.DARK);
    }
  }

  /**
   * Check the Storage 'autoLogin' value.
   * If **true**, check the Token.
  */
  public checkToken(): void {
    const token = this.ls.get(TOKEN_KEY);
    const autoLogin = this.ls.getSettings(AUTO_LOGIN_KEY);
    if (token && autoLogin) { this.userFacade.verifyToken(); }
  }

}
