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
    this.items = Array(this.limit).fill("").map(_ => Math.random());
  }

}
