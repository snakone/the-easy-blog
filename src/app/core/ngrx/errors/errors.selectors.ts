import { createSelector } from '@ngrx/store';

import * as fromErrors from './errors.reducer';
import { ErrorsPartialState, getErrorsPartialState } from '../ngrx.index';

export const getErrorState = createSelector(
  getErrorsPartialState,
  (state: ErrorsPartialState) => state.errors
);

export const get = createSelector(getErrorState, fromErrors.getErrors);
export const getLoaded = createSelector(getErrorState, fromErrors.getLoaded);