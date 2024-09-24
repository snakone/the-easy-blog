
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { errorsReducers } from '../../ngrx.index';
import { ErrorsFacade } from '../errors.facade';
import { ErrorsEffects } from '../errors.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('ErrorsState', errorsReducers),
    EffectsModule.forFeature([
      ErrorsEffects
    ]),
  ],
  providers: [ErrorsFacade]
})

export class ErrorsAccessModule { }