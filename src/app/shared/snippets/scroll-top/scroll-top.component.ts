import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ScrollTopComponent {

  behaviour = input<ScrollBehavior>('smooth');

  constructor() { }

  /**
   * Scroll to top: 0 with a smooth behaviour. {window.scrollTo()}
  */
  public goTop(): void {
    window.scrollTo({top: 0, behavior: this.behaviour()});
  }

}
