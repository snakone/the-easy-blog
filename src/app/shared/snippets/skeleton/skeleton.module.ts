import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardSkeletonComponent } from './post-card-skeleton/post-card-skeleton.component';
import { RecentPostSkeletonComponent } from './recent-post-skeleton/recent-post-skeleton.component';
import { ActivitySkeletonComponent } from './activity-skeleton/activity-skeleton.component';
import { PostIndexSkeletonComponent } from './post-index-skeleton/post-index-skeleton.component';

@NgModule({
  declarations: [
    PostCardSkeletonComponent,
    RecentPostSkeletonComponent,
    ActivitySkeletonComponent,
    PostIndexSkeletonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PostCardSkeletonComponent,
    RecentPostSkeletonComponent,
    ActivitySkeletonComponent,
    PostIndexSkeletonComponent
  ]
})

export class SkeletonModule { }
