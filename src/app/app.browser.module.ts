import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//NGX-TRANSLATE
import { TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { KiiTranslateHttpLoader} from './_kiilib/_utils/kii-translate-http-loader';
import { RouterModule } from '@angular/router';
import {routes} from './app-routing.module';
import {Location} from '@angular/common';
import {LocalizeRouterModule, LocalizeParser, ManualParserLoader,LocalizeRouterSettings} from './_kiilib/_libraries/localize-router';



import { environment } from '../environments/environment';
import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';
import { KiiPwaService } from './_kiilib/_services/kii-pwa.service';
import { KiiMiscService } from './_kiilib/_services/kii-misc.service';
import { KiiBottomSheetSoftwareUpdateComponent } from './_kiilib/_components/kii-bottom-sheet-software-update/kii-bottom-sheet-software-update.component';
import { KiiHttpInterceptor } from './_kiilib/_utils/kii-http-interceptor';
import { KiiSpinnerService } from './_kiilib/_services/kii-spinner.service';
import { KiiHttpErrorComponent } from './_kiilib/_components/kii-http-error/kii-http-error.component';
import { KiiBottomSheetCookiesComponent } from './_kiilib/_components/kii-bottom-sheet-cookies/kii-bottom-sheet-cookies.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { KiiImageGalleryDialogComponent } from './_kiilib/_components/kii-image-gallery-dialog/kii-image-gallery-dialog.component';
import { KiiVideoGalleryDialogComponent } from './_kiilib/_components/kii-video-gallery-dialog/kii-video-gallery-dialog.component';
import { LocalizeRouterPipe } from './_kiilib/_libraries/localize-router/localize-router.pipe';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    AppModule,
    BrowserTransferStateModule,
    //NGX-TRANSLATE PART
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient, TransferState]
      }
    }),
    //LOCALIZE ROUTER
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
          provide: LocalizeParser,
          useFactory: localizeLoaderFactory,
          deps: [TranslateService, Location, LocalizeRouterSettings]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production}),//, scope:"/"}),
  ],
  entryComponents: [KiiBottomSheetSoftwareUpdateComponent, KiiBottomSheetCookiesComponent, KiiHttpErrorComponent],
  providers: [KiiSpinnerService,{provide: HTTP_INTERCEPTORS, useClass: KiiHttpInterceptor, multi: true },DeviceDetectorService, CookieService],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { 
/*  constructor(private swupdate: SwUpdate, private swpush: SwPush,
    private kiiMisc : KiiMiscService,private http: HttpClient) {
      new KiiPwaService(this.swupdate, this.swpush, this.kiiMisc, this.http);
  }*/
}

export function HttpLoaderFactory(http: HttpClient,transferState:TransferState) {
  return new KiiTranslateHttpLoader(http,transferState);
}
export function localizeLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new ManualParserLoader(translate, location, settings, environment.languages, "ROUTES.");
}