import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about.routing';
import { AboutComponent } from './about.component';
import { LayoutModule } from '@shared/layout/layout.module';
import { AboutContentComponent } from './components/about-content/about-content.component';

@NgModule({
  declarations: [
    AboutComponent,
    AboutContentComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    LayoutModule
  ]
})

export class AboutModule { }
