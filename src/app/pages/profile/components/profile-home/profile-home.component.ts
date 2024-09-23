import { Component, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivitiesFacade } from '@core/ngrx/activities/activities.facade';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { User, UserActivity } from '@shared/types/interface.user';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ProfileHomeComponent {

  user$: Observable<User> | undefined;
  activities$: Observable<UserActivity[]> | undefined;

  constructor(
    private userFacade: UsersFacade, 
    private activityFacade: ActivitiesFacade,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.activityFacade.get()
    this.user$ = this.userFacade.user$;
    this.activities$ = this.activityFacade.activities$;
  }

}
