import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@shared/layout/layout.module';
import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { AdminContentComponent } from './components/admin-content/admin-content.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { DraftsAccessModule } from '@store/drafts/data-access/drafts-access.module';
import { DraftLayoutModule } from '@shared/layout/draft/draft-layout.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { AdminDraftComponent } from './components/admin-draft/admin-draft.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

const Material = [
  MatFormFieldModule,
  MatDialogModule,
  MatTooltipModule
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminContentComponent,
    AdminSidebarComponent,
    AdminDraftComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    DraftsAccessModule,
    DraftLayoutModule,
    PipesModule,
    ...Material,
    FormsModule
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    { provide: MatDialogRef, useValue: {} }
  ]
})

export class AdminModule { }
