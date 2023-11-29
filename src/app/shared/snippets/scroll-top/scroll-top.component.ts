import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ScrollTopComponent {

  constructor() { }

  public goTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

}
