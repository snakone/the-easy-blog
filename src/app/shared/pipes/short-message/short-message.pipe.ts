import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shortMessage'})

export class ShortMessagePipe implements PipeTransform {

  /**
   * Transform the Post/Draft message into a shorten message depending on the arguments.
   * @param value The Post/Draft message.
   * @param alone If watching a single Post/Draft by slug.
   * @param small The size of the Post/Draft.
   * @param showIntro Usually to display the intro on the first Post/Draft list.
  */
  transform(
    value: string, 
    alone: boolean,
    small?: boolean,
    showIntro?: boolean
  ): string | null {
    if (!value) return '';
    return alone ? value : 
           small && showIntro ? (value.slice(0, 325) + '...') : 
           showIntro ? (value.slice(0, 610) + '...') : '';
  }

}
