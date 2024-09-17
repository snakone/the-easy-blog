import { Component, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { filter } from 'rxjs';

import { UsersFacade } from '@store/users/users.facade';
import { USER_INDEX } from '@shared/data/data';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { LOGOUT_CONFIRMATION } from '@shared/data/dialogs';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileHeaderComponent {

  crafter = inject(CrafterService);
  userFacade = inject(UsersFacade);
  destroyRef = inject(DestroyRef);

  list = USER_INDEX;

  constructor() { }

  ngOnInit(): void { }

  logOut(): void {
    this.crafter.confirmation(LOGOUT_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
    ).subscribe(_ => this.userFacade.logOut());
  }

}
