import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@shared/layout/layout.module';
import { NewsAccessModule } from '@core/ngrx/news/data-access/news-access.module';
import { DirectivesModule } from '@shared/directives/directives.module';
import { MasonryService } from '@core/services/masonry/masonry.service';
import { SnippetsModule } from '@shared/snippets/snippets.module';

import { NewsRoutingModule } from './news.routing';
import { NewsComponent } from './news.component';
import { NewsMasonryComponent } from './news-masonry/news-masonry.component';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    NewsComponent,
    NewsMasonryComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    LayoutModule,
    DirectivesModule,
    SnippetsModule,
    NewsAccessModule,
    PipesModule
  ],
  providers: [
    MasonryService
  ]
})

export class NewsModule { }
