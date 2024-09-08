import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { filter, Observable, of, switchMap } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

import { HttpService } from '../http/http.service';
import { StorageService } from '../storage/storage.service';
import { CrafterService } from '../crafter/crafter.service';
import { PushDeniedDialogComponent } from '@layout/overlays/push-denied/push-denied.component';
import { NotificationPayload } from '@shared/types/interface.app';
import { Post } from '@shared/types/interface.post';
import { SWResponse } from '@shared/types/interface.server';

import { URI, USER_ID_KEY } from '@shared/data/constants';
import { WELCOME_PUSH } from '@shared/data/notifications';
import { ERROR_SERVICE_WORKER, SUB_UPDATED_SENTENCE } from '@shared/data/sentences';
import { environment } from '@env/environment';
import { PUSH_DENIED_DIALOG } from '@shared/data/dialogs';
import { SnackTypeEnum } from '@shared/types/types.enums';

@Injectable({providedIn: 'root'})

export class PWAService {

  readonly API_SUBSCRIPTION = environment.api + 'subscription';
  readonly API_NOTIFICATION = environment.api + 'notification';
  readonly pushKey = environment.keys.push;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpService,
    private ls: StorageService,
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    private deviceDetector: DeviceDetectorService,
    private crafter: CrafterService
  ) { }

  public updateSW(): void {
    this.swUpdate.versionUpdates
     .pipe(
       filter(event => !!event && (event.type !== 'NO_NEW_VERSION_DETECTED' && 
                                   event.type !== 'VERSION_INSTALLATION_FAILED'))
      )
      .subscribe(_ => {
        this.swUpdate.activateUpdate()
        .then(() => this.document.location.reload());
    });
  }

  public showPrompt(timer = 10000): void {
    setTimeout(() => {
      this.swPush.requestSubscription({
        serverPublicKey: this.pushKey
      }).then((sub: PushSubscription) => {
        if (sub) {
          this.save(sub)
            .pipe(
              switchMap(_ => !_.updated ? 
                this.send(
                  this.set(Object.assign({}, WELCOME_PUSH)
              )) : of(null))
            ).subscribe(_ => !_ ? this.crafter.setSnack(SUB_UPDATED_SENTENCE) : null);
        }
      }).catch(_ => {
        this.crafter.setSnack(ERROR_SERVICE_WORKER, SnackTypeEnum.ERROR);
        console.error(_);
      });
    }, timer);
  }

  public async requestNotification(): Promise<void> {
    const permission = await Notification.requestPermission()
     .catch(error => {
      this.crafter.setSnack(ERROR_SERVICE_WORKER,  SnackTypeEnum.ERROR);
      console.error(error);
    });
    permission !== 'granted' ? this.openPushModal() : this.showPrompt(1000);
  }

  public save(
    sub: PushSubscription
  ): Observable<SWResponse> {
    return this.http
      .post<SWResponse>(
        this.API_SUBSCRIPTION,
        { sub, device: this.setDevice() }
      ).pipe(
        filter(res => res && !!res.ok)
      );
  }

  public send(
    payload: NotificationPayload
  ): Observable<SWResponse> {
    return this.http
      .post<SWResponse>(this.API_NOTIFICATION, { payload })
      .pipe(
        filter(res => res && !!res.ok)
      );
  }

  public set(
    payload: NotificationPayload,
    draft?: Post
  ): NotificationPayload {
    payload.user = this.ls.get(USER_ID_KEY);
    if (draft) {
      payload.image = draft.cover;
      payload.data.url = `${URI}/article/${draft.slug}`;
      payload.body = payload.body
      .concat(`.\n${draft.title}\nEscrito por ${draft.author}.`);
    }
    return payload;
  }

  private setDevice(): string {
    return this.deviceDetector.isDesktop() ? 'Desktop' : 'Mobile';
  }

  private openPushModal(): void {
    setTimeout(() => this.crafter.dialog(PUSH_DENIED_DIALOG), 333);
  }

}