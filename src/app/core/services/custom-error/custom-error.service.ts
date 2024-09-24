import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { StorageService } from '../storage/storage.service';
import { ErrorsService } from '../api/errors.service';
import { USER_ID_KEY } from '@shared/data/constants';
import { ErrorsTypeEnum } from '@shared/types/types.enums';
import { CustomError } from '@shared/types/class.types';

@Injectable()

export class CustomErrorService {

  errorsService = inject(ErrorsService);
  ls = inject(StorageService);

  readonly HttpStatus = [400, 406, 409, 500];

  constructor() { }

  public async saveCustomError(err: Error | HttpErrorResponse): Promise<void> {
    if(this.checkError(err)) { return; }
    const error = this.manageError(err);
    this.errorsService.saveError(error);
  }

  private manageError(err: Error | HttpErrorResponse): CustomError {
    if (err instanceof HttpErrorResponse) {
      return new CustomError(
        err?.name || 'Error',
        ErrorsTypeEnum.HTTP,
        err?.error?.message || 'Unkwon Error',
        err?.statusText,
        this.ls.get(USER_ID_KEY) || null,
        err?.status,
        err?.url
      );
    } else {
      return new CustomError(
        err?.name || 'Error',
        ErrorsTypeEnum.CODE,
        err?.message || 'Unknown Error',
        err?.stack,
        this.ls.get(USER_ID_KEY) || null,
      );
    }
  }

  public checkError(err: Error | HttpErrorResponse): boolean {
    if ((err instanceof HttpErrorResponse &&
      (err.status === 0 ||
       !this.HttpStatus.includes(err.status)))) { return true; }
    return false;
  }
}
