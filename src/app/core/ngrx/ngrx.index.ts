import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

// STATE
import * as fromUsers from '@store/users/users.reducer';
import * as fromPosts from '@store/posts/posts.reducer';
import * as fromDrafts from '@store/drafts/drafts.reducer';
import * as fromActivities from '@store/activities/activities.reducer';
import * as fromNews from '@store/news/news.reducer';
import * as fromSearch from '@store/search/search.reducer';
import * as fromErrors from '@store/errors/errors.reducer';

// APP STATE
export interface AppState {
  user: fromUsers.UserState;
  posts: fromPosts.PostState;
  search: fromSearch.SearchState
}

export const appReducers: ActionReducerMap<AppState> = {
  user: fromUsers.reducer,
  posts: fromPosts.reducer,
  search: fromSearch.reducer
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

// ACTIVITIES
export interface ActivitiesPartialState {
  activities: fromActivities.ActivitiesState;
}
export const activitiesReducers: ActionReducerMap<ActivitiesPartialState> = {
  activities: fromActivities.reducer
};
export const getActivitiesPartialState = createFeatureSelector<ActivitiesPartialState>('ActivitiesState');

// NEWS
export interface NewsPartialState {
  news: fromNews.NewsState;
}
export const newsReducers: ActionReducerMap<NewsPartialState> = {
  news: fromNews.reducer
};
export const getNewsPartialState = createFeatureSelector<NewsPartialState>('NewsState');

// ERRORS
export interface ErrorsPartialState {
  errors: fromErrors.ErrorsState;
}
export const errorsReducers: ActionReducerMap<ErrorsPartialState> = {
  errors: fromErrors.reducer
};
export const getErrorsPartialState = createFeatureSelector<ErrorsPartialState>('ErrorsState');
