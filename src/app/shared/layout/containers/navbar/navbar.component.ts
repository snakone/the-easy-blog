import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '@shared/types/interface.user';
import { UsersFacade } from '@store/users/users.facade';
import { StorageService } from '@services/storage/storage.service';
import { CrafterService } from '@services/crafter/crafter.service';

import { NAVBAR_ICONS, NAVBAR_MENU } from '@shared/data/data';
import { THEME_KEY } from '@shared/data/constants';
import { LOGIN_DIALOG } from '@shared/data/dialogs';
import { ThemeEnum } from '@shared/types/types.enums';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {

  user$!: Observable<User | null>;
  showSearchBar = false;
  menuOpened = false;
  mode: string | undefined;

  icons = NAVBAR_ICONS;
  dropdown = NAVBAR_MENU;

  constructor(
    private ls: StorageService,
    private crafter: CrafterService,
    private userFcd: UsersFacade
  ) { }

  ngOnInit(): void {
    this.mode = this.ls.getSettings(THEME_KEY) as string;
    this.user$ = this.userFcd.user$;
  }

  public onScroll(detected: boolean): void {
    if (detected) {
      this.menuOpened = false;
    }
  }

  public openModal(): void {
    this.crafter.dialog(LOGIN_DIALOG);
  }

  public toggleTheme(): void {
    const isDark = document.body.classList.toggle(ThemeEnum.DARK);
    this.mode = isDark ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    this.ls.setKeySettings(THEME_KEY, this.mode);
  }

}
