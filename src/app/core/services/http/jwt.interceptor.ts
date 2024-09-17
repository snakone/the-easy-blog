import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '@services/storage/storage.service';
import { UsersFacade } from '@store/users/users.facade';
import { HOME_ROUTE, REFRESH_TOKEN_KEY, USER_ID_KEY } from '@shared/data/constants';
import { CrafterService } from '../crafter/crafter.service';
import { Router } from '@angular/router';
import { SnackTypeEnum } from '@shared/types/types.enums';
import { SESSION_OVER } from '@shared/data/sentences';

@Injectable({providedIn: 'root'})

export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private userFacade: UsersFacade,
    private ls: StorageService,
    private crafter: CrafterService,
    private router: Router
  ) { }

  intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        const refreshToken = this.ls.getSettings(REFRESH_TOKEN_KEY);
        if (err.status === 401) {  // Invalid Token
          const id = this.ls.get(USER_ID_KEY);
          if (!id) throw err;
          refreshToken ? this.userFacade.refreshToken(id) : 
                         this.sessionOver();
        }
        throw err;
      }));
  }

  private sessionOver(): void {
    this.crafter.setSnack(SESSION_OVER, SnackTypeEnum.INFO);
    this.router.navigateByUrl(HOME_ROUTE);
  }
}