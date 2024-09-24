import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentPostBoxComponent } from './recent-post-box/recent-post-box.component';
import { CategoryBoxComponent } from './category-box/category-box.component';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from '@shared/snippets/skeleton/skeleton.module';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    RecentPostBoxComponent,
    CategoryBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
    PipesModule
  ],
  exports: [
    RecentPostBoxComponent,
    CategoryBoxComponent
  ]
})

export class BoxesModule { }
