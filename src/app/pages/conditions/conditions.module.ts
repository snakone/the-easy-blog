import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConditionsRoutingModule } from './conditions.routing';
import { ConditionsComponent } from './conditions.component';
import { LayoutModule } from '@shared/layout/layout.module';

@NgModule({
  declarations: [
    ConditionsComponent
  ],
  imports: [
    CommonModule,
    ConditionsRoutingModule,
    LayoutModule,
  ]
})

export class ConditionsModule { }
