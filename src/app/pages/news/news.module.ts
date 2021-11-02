import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news.routing';
import { NewsComponent } from './news.component';
import { LayoutModule } from '@shared/layout/layout.module';
import { NewsMasonryComponent } from './news-masonry/news-masonry.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { MasonryService } from '@core/services/masonry/masonry.service';

@NgModule({
  declarations: [
    NewsComponent,
    NewsMasonryComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    LayoutModule,
    DirectivesModule
  ],
  providers: [
    MasonryService
  ]
})

export class NewsModule { }
