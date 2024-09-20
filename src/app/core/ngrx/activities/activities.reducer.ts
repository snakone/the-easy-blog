import { createReducer, on, Action } from '@ngrx/store';
import * as ActivitiesActions from './activities.actions';
import { UserActivity } from '@shared/types/interface.user';

export interface ActivitiesState {
  activities: UserActivity[] | null;
  error: string | null;
  loaded: boolean;
  public: UserActivity[] | null;
}

export const initialState: ActivitiesState = {
  activities: null,
  error: null,
  loaded: false,
  public: []
};

const featureReducer = createReducer(
  initialState,
  // GET
  on(ActivitiesActions.getSuccess, (state, {activities}) => ({ ...state, loaded: true, activities })),
  on(ActivitiesActions.getFailure, (state, {error}) => ({ ...state, error, loaded: false })),
  // RESET
  on(ActivitiesActions.reset, (state) => ({ ...state, activities: [], loaded: false })),
  // SET
  on(ActivitiesActions.setPublic, (state, {activities}) => ({ ...state, loaded: true, public: activities })),
);

export function reducer(state: ActivitiesState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getActivities = (state: ActivitiesState) => state.activities;
export const getLoaded = (state: ActivitiesState) => state.loaded;
export const getPublic = (state: ActivitiesState) => state.public;
