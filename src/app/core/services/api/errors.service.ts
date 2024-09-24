import { Injectable } from '@angular/core';
import { catchError, filter, map} from 'rxjs/operators';
import { EMPTY, firstValueFrom, Observable } from 'rxjs';

import { HttpService } from '../http/http.service';
import { environment } from '@env/environment';
import { ErrorsResponse } from '@shared/types/interface.server';
import { CustomError } from '@shared/types/class.types';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class ErrorsService {

  readonly API_ERRORS = environment.api + 'errors';

  constructor(
    private http: HttpService
  ) { }

  public getErrors(): Observable<CustomError[]> {
    return this.http
      .get<ErrorsResponse>(this.API_ERRORS)
      .pipe(
        filter(res => !!res && res.ok),
        map(res => res.errors)
    );
  }

  public async saveError(err: CustomError): Promise<void> {
    await firstValueFrom(
      this.http.post(this.API_ERRORS, err)
    .pipe(catchError(() => EMPTY)));
  }

}