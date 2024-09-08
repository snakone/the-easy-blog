import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CORE_MODULE_CONFIG, CORE_MODULE_CONSTANTS } from './core.module.config';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '@env/environment';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerConfig } from './hammer.config';
import { ErrorHandlerService } from './services/error-handler/error-handler.service';
import { HttpService } from './services/http/http.service';
import { StorageModule } from './services/storage/storage.module';
import { appReducers } from './ngrx/ngrx.index';
import { UserEffects } from './ngrx/users/users.effects';
import { PostEffects } from './ngrx/posts/posts.effects';
import { JwtInterceptor } from './services/http/jwt.interceptor';
import { QuillFormatModule } from './services/quill/quill.module';
import { SearchEffects } from './ngrx/search/search.effects';

@NgModule({ imports: [BrowserAnimationsModule,
        NgxWebstorageModule.forRoot(CORE_MODULE_CONSTANTS.WEBSTORAGE_CONFIG),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        }),
        StoreModule.forFeature('AppState', appReducers),
        EffectsModule.forRoot([
            UserEffects,
            PostEffects,
            SearchEffects
        ]),
        QuillFormatModule,
        StorageModule], providers: [
        HttpService,
        { provide: CORE_MODULE_CONFIG, useValue: CORE_MODULE_CONSTANTS },
        { provide: ErrorHandler, useClass: ErrorHandlerService },
        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
