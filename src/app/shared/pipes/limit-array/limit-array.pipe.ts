import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '@shared/types/interface.post';

@Pipe({name: 'limitArray'})

export class LimitArrayPipe implements PipeTransform {

  transform(value: Post[], limit: number): Post[] {
    if(limit == undefined) { return value; }
    return value.slice(0, limit);
  }

}
