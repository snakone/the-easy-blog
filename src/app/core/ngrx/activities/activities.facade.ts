import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ActivityActions from './activities.actions';
import * as fromActivities from './activities.selectors';
import { ActivitiesState } from './activities.reducer';
import { UserActivity } from '@shared/types/interface.user';

@Injectable()

export class ActivitiesFacade {

  public activities$ = this.store.select(fromActivities.get);
  public loaded$ = this.store.select(fromActivities.getLoaded);
  public public$ = this.store.select(fromActivities.getPublic);

  constructor(private store: Store<ActivitiesState>) { }

  public get(): void {
    this.store.dispatch(ActivityActions.get());
  }

  public setPublic(activities: UserActivity[]): void {
    this.store.dispatch(ActivityActions.setPublic({activities}));
  }

  public reset(): void {
    this.store.dispatch(ActivityActions.reset());
  }

}