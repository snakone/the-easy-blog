import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DraftRoutingModule } from './draft.routing';
import { DraftComponent } from './draft.component';
import { DraftContentComponent } from './components/draft-content/draft-content.component';
import { DraftSidebarComponent } from './components/draft-sidebar/draft-sidebar.component';
import { LayoutModule } from '@shared/layout/layout.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

const Material = [
  MatTooltipModule,
  MatProgressBarModule
];

@NgModule({
  declarations: [
    DraftComponent,
    DraftContentComponent,
    DraftSidebarComponent
  ],
  imports: [
    CommonModule,
    DraftRoutingModule,
    LayoutModule,
    ...Material
  ]
})
export class DraftModule { }
