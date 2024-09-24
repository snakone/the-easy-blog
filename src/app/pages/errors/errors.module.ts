import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors.routing';
import { ErrorsComponent } from './errors.component';
import { ErrorsContentComponent } from './components/errors-content/errors-content.component';
import { LayoutModule } from '@shared/layout/layout.module';
import { ErrorsAccessModule } from '@core/ngrx/errors/data-access/errors-access.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

const Material = [
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatPaginatorModule
]

@NgModule({
  declarations: [
    ErrorsComponent,
    ErrorsContentComponent
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule,
    LayoutModule,
    ErrorsAccessModule,
    ...Material
  ]
})

export class ErrorsModule { }
