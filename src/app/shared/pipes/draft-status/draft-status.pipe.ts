import { Pipe, PipeTransform } from '@angular/core';
import { DraftStatusEnum } from '@shared/types/types.enums';

@Pipe({name: 'draftStatus'})

export class DraftStatusPipe implements PipeTransform {
  /**
   * Transform the Post/Draft status to a readable format.
   * Returns 'No Visto' if no value.
   * @param value The Post/Draft status.
  */
  transform(value: DraftStatusEnum | undefined): string {
    if (!value) { return switchStatus[DraftStatusEnum.NOT_SEEN]; }
    return switchStatus[value];
  }

}

/**
 * Object to map the Post/Draft status into string.
*/
const switchStatus: {[key in DraftStatusEnum]: string} = {
  [DraftStatusEnum.NOT_SEEN]: "No visto",
  [DraftStatusEnum.SEEN]: "Visto",
  [DraftStatusEnum.PENDING]: "Pendiente",
  [DraftStatusEnum.APPROVED]: "Aprobado",
  [DraftStatusEnum.ALL]: "Todos"
};
