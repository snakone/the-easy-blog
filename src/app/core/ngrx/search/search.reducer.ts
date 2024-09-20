import { createReducer, on, Action } from '@ngrx/store';
import * as SearchActions from './search.actions';
import { SearchResult } from '@shared/types/interface.user';

export interface SearchState {
  value: string;
  result: SearchResult;
  loaded: boolean;
}

export const initialState: SearchState = {
  value: '',
  result: null,
  loaded: false
};

const featureReducer = createReducer(
  initialState,
  // GET
  on(SearchActions.fullSearchSuccess, (state, {result, value}) => ({ ...state, loaded: true, result, value })),
  on(SearchActions.fullSearchFailure, (state, {error}) => ({ ...state, error, loaded: false, result: null })),
  // RESET
  on(SearchActions.reset, (state) => ({
    ...state,
    result: null,
    loaded: false,
    value: initialState.value
  }))
);

export function reducer(state: SearchState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getResult = (state: SearchState) => state.result;
export const getValue = (state: SearchState) => state.value;
export const getLoaded = (state: SearchState) => state.loaded;