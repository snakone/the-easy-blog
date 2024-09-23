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
    { image: '02-img.jpg', id: 1 },
    { image: '03-img.jpg', id: 2 },
    { image: '04-img.jpg', id: 3 },
    { image: '03-img.jpg', id: 4 },
  ];

  constructor() { }

  ngOnInit(): void { }

}
