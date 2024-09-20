import { Pipe, PipeTransform } from '@angular/core';
import { IMAGE_PATH } from '@shared/data/constants';

@Pipe({name: 'image'})

export class ImagePipe implements PipeTransform {

  /**
   * Transform the image file name into an image path.
   * Returns 'placeholder.png' if no value.
   * @param value The image name with extension.
   * @param args Extra folders to add to the image path
  */
  transform(value: string | undefined, args?: string): string {
    if (args) return `${IMAGE_PATH}${args}/${value}`;
    return `${IMAGE_PATH}${value || 'placeholder.png'}`;
  }
}
