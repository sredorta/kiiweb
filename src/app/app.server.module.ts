import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings, ManualParserLoader } from './_kiilib/_libraries/localize-router';
import {routes} from './app-routing.module';
import { Location } from '@angular/common';

import { Observable, Observer } from 'rxjs';
import * as merge from 'deepmerge';
import { environment } from '../environments/environment';
import {makeStateKey, StateKey, TransferState} from '@angular/platform-browser';
import { SwUpdate, SwPush, ServiceWorkerModule } from '@angular/service-worker';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KiiHttpInterceptor } from './_kiilib/_utils/kii-http-interceptor';
import { KiiBottomSheetSoftwareUpdateComponent } from './_kiilib/_components/kii-bottom-sheet-software-update/kii-bottom-sheet-software-update.component';
import { KiiHttpErrorComponent } from './_kiilib/_components/kii-http-error/kii-http-error.component';


//Equivalent to import fs
declare var require: any;
const fs = require('fs');

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    NoopAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, 
        useFactory: translateFactory,
        deps: [TransferState]
      }
    }),
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
          provide: LocalizeParser,
          useFactory: (translate, location, settings) =>
              new ManualParserLoader(translate, location, settings, environment.languages, 'ROUTES.'),
          deps: [TranslateService, Location, LocalizeRouterSettings]
      }
    }), 
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
       
  ],
  entryComponents: [],

  providers: [{provide: HTTP_INTERCEPTORS, useClass: KiiHttpInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppServerModule {}


export class TranslateServerLoader implements TranslateLoader {
   constructor(private transferState: TransferState) {}
   public getTranslation(lang: string) : Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      const jsonKii = JSON.parse(fs.readFileSync(`./dist/browser/assets/kiilib/i18n/${lang}.json`, 'utf8'));
      const jsonProject = JSON.parse(fs.readFileSync(`./dist/browser/assets/i18n/${lang}.json`, 'utf8'));
      let jsonData = merge.all([jsonKii,jsonProject]);
      // Here we save the translations in the transfer-state to avoid glitch
      const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
      this.transferState.set(key, jsonData);
      observer.next(jsonData);
      observer.complete();
    });
  }
}

export function translateFactory(transferState: TransferState) {
  return new TranslateServerLoader(transferState);
}

