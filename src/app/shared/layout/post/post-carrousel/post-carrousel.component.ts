import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CARROUSEL_OPTS } from '@shared/data/data';

@Component({
  selector: 'app-post-carrousel',
  templateUrl: './post-carrousel.component.html',
  styleUrls: ['./post-carrousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostCarrouselComponent {

  /**
   * Carrousel options. <owl-carousel-o>
  */
  customOptions = CARROUSEL_OPTS;

  items = [
    '02-img.jpg',
    '03-img.jpg',
    '04-img.jpg',
  ];

  constructor() { }

  ngOnInit(): void { }

}
