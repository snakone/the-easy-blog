import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-recent-post-skeleton',
  templateUrl: './recent-post-skeleton.component.html',
  styleUrls: ['./recent-post-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class RecentPostSkeletonComponent {

  @Input() first: boolean;
  @Input() limit = 6;
  items: number[];

  ngOnInit() {
    this.fillArray();
  }

  /**
   * Fills an array to display Skeleton Items.
   * Uses {limit} and random number to trackId
  */
  private fillArray(): void {
    this.items = Array(this.limit).fill("").map(_ => Math.random());
  }

}
