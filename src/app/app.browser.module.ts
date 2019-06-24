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
import {LocalizeRouterModule, LocalizeParser, ManualParserLoader,LocalizeRouterSettings} from 'localize-router';
import { environment } from '../environments/environment';



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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }

export function HttpLoaderFactory(http: HttpClient,transferState:TransferState) {
  return new KiiTranslateHttpLoader(http,transferState);
}
export function localizeLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new ManualParserLoader(translate, location, settings, environment.languages, "ROUTES.");
}