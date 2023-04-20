import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersFacade } from '@store/users/users.facade';
import { StorageService } from '@services/storage/storage.service';
import { CrafterService } from '@services/crafter/crafter.service';
import { User } from '@shared/types/interface.types';
import { NAVBAR_ICONS, NAVBAR_MENU } from '@shared/data/data';
import { LogInOverlayComponent } from '@shared/layout/overlays/log-in/log-in.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

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
    this.mode = this.ls.get('theme');
    this.user$ = this.userFcd.user$;
  }

  public onScroll(ev: boolean): void {
    if (ev) {
      this.menuOpened ? (this.menuOpened = false) : null;
    }
  }

  public openModal(): void {
    this.crafter.dialog(
      LogInOverlayComponent, 
      null, 
      'login', 
      'login-overlay'
    );
  }

  public theme(): void {
    const res = document.body.classList.toggle('dark');
    res ? this.mode = 'dark' : this.mode = 'light';
    this.ls.setKey('theme', this.mode);
  }

}