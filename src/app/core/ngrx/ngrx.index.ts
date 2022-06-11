import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

// STATE
import * as fromUsers from '@store/users/users.reducer';
import * as fromPosts from '@store/posts/posts.reducer';
import * as fromDrafts from '@store/drafts/drafts.reducer';

export interface AppState {
  users: fromUsers.UserState;
  posts: fromPosts.PostState;
}

export const appReducers: ActionReducerMap<AppState> = {
  users: fromUsers.reducer,
  posts: fromPosts.reducer
};

export const getAppState = createFeatureSelector<AppState>('AppState');

// DRAFTS
export interface DraftsPartialState {
  drafts: fromDrafts.DraftsState;
}

export const draftsReducers: ActionReducerMap<DraftsPartialState> = {
  drafts: fromDrafts.reducer
};

export const getDraftsPartialState = createFeatureSelector<DraftsPartialState>('DraftsState');
