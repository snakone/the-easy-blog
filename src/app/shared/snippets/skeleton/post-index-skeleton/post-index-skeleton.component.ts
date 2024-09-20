import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-post-index-skeleton',
  templateUrl: './post-index-skeleton.component.html',
  styleUrl: './post-index-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostIndexSkeletonComponent {
  items: SkeletonPostIndex[] = [1,2,3,4,5,6,7,8].map(i => ({id: i, width: this.getRandomWidth()}))

  /**
   * Returns a random number used for the width of Post Index Skeleton.
   * Number between 100 and 251.
  */
  private getRandomWidth(): number {
    return Math.floor(Math.random() * (250 - 100 + 1)) + 100;
  }
}

interface SkeletonPostIndex {
  id: number;
  width: number;
}
