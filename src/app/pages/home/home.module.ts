import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing';
import { LayoutModule } from '@layout/layout.module';
import { HomeComponent } from './home.component';
import { MainPostComponent } from './components/main-post/main-post.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { HomeSidebarComponent } from './components/home-sidebar/home-sidebar.component';
import { SkeletonModule } from '@shared/snippets/skeleton/skeleton.module';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    HomeComponent,
    MainPostComponent,
    HomeContentComponent,
    HomeSidebarComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    SkeletonModule,
    PipesModule
  ]
})

export class HomeModule { }
