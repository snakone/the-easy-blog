import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { UserService } from '@core/services/api/users.service';
import { StorageService } from '@core/services/storage/storage.service';
import { REMEMBER_EMAIL_KEY, USER_ID_KEY } from '@shared/data/constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LogInDialogComponent {

  userService = inject(UserService);
  ls = inject(StorageService);

  register = false;
  rememberEmail$: Observable<string>;

  constructor() { }

  ngOnInit() {
    this.checkRememberEmail(); 
  }

  /**
   * Function to check if remember email of User.
   * Check Local Storage and call {getUserEmailById}
  */
  private checkRememberEmail(): void {
    const remember = this.ls.getSettings(REMEMBER_EMAIL_KEY) as boolean;
    const id = this.ls.get(USER_ID_KEY);
    if (id && remember) {
      this.rememberEmail$ = this.userService.getUserEmailById(id);
    }
  }

}
