import { NgModule } from '@angular/core';

import { ImagePipe } from './image/image.pipe';
import { SanitizerPipe } from './sanitizer/sanitizer.pipe';
import { ShortMessagePipe } from './short-message/short-message.pipe';
import { DraftStatusPipe } from './draft-status/draft-status.pipe';
import { LimitArrayPipe } from './limit-array/limit-array.pipe';

@NgModule({
  declarations: [
    ImagePipe,
    SanitizerPipe,
    ShortMessagePipe,
    DraftStatusPipe,
    LimitArrayPipe
  ],
  exports: [
    ImagePipe,
    SanitizerPipe,
    ShortMessagePipe,
    DraftStatusPipe,
    LimitArrayPipe
  ]
})

export class PipesModule { }
