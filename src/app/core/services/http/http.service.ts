import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable} from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { TOKEN_KEY } from '@shared/data/constants';

@Injectable()

export class HttpService {

  private readonly auth = 'formatted-token';
  private readonly content = 'Content-type';
  private readonly accept = 'Accept';
  private readonly type = 'application/json';
  private readonly default = 'application/json';

  constructor(
    private http: HttpClient,
    private ls: StorageService,
    private error: ErrorHandlerService
  ) {}

  public get<T>(url: string,
                headers?: HttpHeaders,
                params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { headers: this.createHeaders(headers), params })
            .pipe(catchError((err: HttpErrorResponse) => {
              this.onError(err);
              throw err;
            }
    ));
  }

  public post<T>(url: string,
                 body: any | null,
                 headers?: HttpHeaders,
                 params?: HttpParams): Observable<T> {
    return this.http.post<T>(url, body, { headers: this.createHeaders(headers), params })
            .pipe(catchError((err: HttpErrorResponse) => {
              this.onError(err);
              throw err;
            }
    ));
  }

  public put<T>(url: string,
                body: any | null,
                headers?: HttpHeaders,
                params?: HttpParams): Observable<T> {
    return this.http.put<T>(url, body, { headers: this.createHeaders(headers), params })
            .pipe(catchError((err: HttpErrorResponse) => {
              this.onError(err);
              throw err;
            }
    ));
  }

  public delete<T>(url: string,
                   body: any | null,
                   headers?: HttpHeaders,
                   params?: HttpParams): Observable<T> {
    return this.http.delete<T>(url, { headers: this.createHeaders(headers), params, body })
            .pipe(catchError((err: HttpErrorResponse) => {
              this.onError(err);
              throw err;
            }
    ));
  }

// tslint:disable-next-line: variable-name
  private createHeaders(_headers?: HttpHeaders): HttpHeaders {
    const contentType = _headers ? (_headers.get(this.type) || this.default) : this.default;
    const accept = _headers ? (_headers.get(this.accept) || this.default) : this.default;
    const headers = _headers || new HttpHeaders();

    return headers
      .set(this.auth, this.ls.get(TOKEN_KEY) || '')
      .set(this.content, contentType)
      .set(this.accept, accept)
  }

  private onError(err: HttpErrorResponse): void {
    this.error.showHttpError(err);
  }
}