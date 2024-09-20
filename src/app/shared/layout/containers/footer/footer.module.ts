import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer.component';
import { FooterNavComponent } from './components/footer-nav/footer-nav.component';
import { FooterGalleryComponent } from './components/footer-gallery/footer-gallery.component';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    FooterComponent,
    FooterNavComponent,
    FooterGalleryComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    FooterComponent
  ]
})

export class FooterModule { }
