import { createReducer, on, Action } from '@ngrx/store';
import * as ErrorActions from './errors.actions';
import { CustomError } from '@shared/types/class.types';

export interface ErrorsState {
  errors: CustomError[] | null;
  error: string | null;
  loaded: boolean;
}

export const initialState: ErrorsState = {
  errors: null,
  error: null,
  loaded: false,
};

const featureReducer = createReducer(
  initialState,
  // GET
  on(ErrorActions.getSuccess, (state, {errors}) => ({ ...state, loaded: true, errors })),
);

export function reducer(state: ErrorsState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getErrors = (state: ErrorsState) => state.errors;
export const getLoaded = (state: ErrorsState) => state.loaded;