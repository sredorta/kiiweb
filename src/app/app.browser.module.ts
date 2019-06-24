import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//NGX-TRANSLATE
import { TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { KiiTranslateHttpLoader} from './_kiilib/_utils/kii-translate-http-loader';



@NgModule({
  imports: [
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }

export function HttpLoaderFactory(http: HttpClient,transferState:TransferState) {
  return new KiiTranslateHttpLoader(http,transferState);
}