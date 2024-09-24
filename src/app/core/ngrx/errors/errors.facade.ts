import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ErrorActions from './errors.actions';
import * as fromErrors from './errors.selectors';
import { ErrorsState } from './errors.reducer';

@Injectable()

export class ErrorsFacade {

  public errors$ = this.store.select(fromErrors.get);
  public loaded$ = this.store.select(fromErrors.getLoaded);

  constructor(private store: Store<ErrorsState>) { }

  public get(): void {
    this.store.dispatch(ErrorActions.get());
  }

}