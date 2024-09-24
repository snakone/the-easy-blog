import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as ErrorActions from './errors.actions';
import { map, concatMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ErrorsState } from './errors.reducer';
import { ErrorsService } from '@core/services/api/errors.service';

@Injectable()

export class ErrorsEffects {

  constructor(
    private actions: Actions,
    private errorsService: ErrorsService,
    private store: Store<ErrorsState>,
  ) { }

  // GET ERRORS
  getErrorsEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(ErrorActions.get),
      concatMap(() =>
      this.errorsService.getErrors()
        .pipe(
          map(errors => ErrorActions.getSuccess({ errors })),
          catchError(error =>
              of(ErrorActions.getFailure({ error: error.message }))
    ))))
  );

}