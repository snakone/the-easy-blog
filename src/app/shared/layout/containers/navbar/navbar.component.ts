import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { debounceTime, filter, map, Observable } from 'rxjs';

import { User } from '@shared/types/interface.user';
import { UsersFacade } from '@store/users/users.facade';
import { StorageService } from '@services/storage/storage.service';
import { CrafterService } from '@services/crafter/crafter.service';

import { NAVBAR_ICONS, NAVBAR_MENU } from '@shared/data/data';
import { THEME_KEY } from '@shared/data/constants';
import { LOGIN_DIALOG } from '@shared/data/dialogs';
import { ThemeEnum } from '@shared/types/types.enums';
import { NavigationStart, Router } from '@angular/router';
import { SETTINGS_SAVED } from '@shared/data/sentences';
import { Snack } from '@shared/types/interface.app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {

  ls = inject(StorageService);
  crafter = inject(CrafterService);
  userFacade = inject(UsersFacade);
  router = inject(Router);

  user$!: Observable<User | null>;
  showSearchBar = false;
  menuOpened = false;
  mode: string | undefined;

  icons = NAVBAR_ICONS;
  dropdown = NAVBAR_MENU;

  constructor() { }

  ngOnInit(): void {
    this.mode = this.ls.getSettings(THEME_KEY) as string;
    this.user$ = this.userFacade.user$;
    this.subToRouter();
    this.subToThemeChange();
  }

  private subToRouter(): void {
    this.router.events.pipe(
      filter((e): e is NavigationStart => 
        (e instanceof NavigationStart) && this.menuOpened),
    )
    .subscribe(_ => this.menuOpened = false);
  }

  private subToThemeChange(): void {
    this.crafter.snack$
     .pipe(
      filter(snack => this.isSnackFromSettings(snack)),
      debounceTime(100),
      map(_ => this.ls.get(THEME_KEY))
    )
    .subscribe(res => this.mode = res);
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
    this.ls.setKey(THEME_KEY, this.mode);
  }

  public isSnackFromSettings(snack: Snack): boolean {
    return snack.message === SETTINGS_SAVED && snack.type === 'info';
  }

}
