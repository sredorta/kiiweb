import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { MatBottomSheet } from '@angular/material';
import { KiiBottomSheetSoftwareUpdateComponent } from '../_components/kii-bottom-sheet-software-update/kii-bottom-sheet-software-update.component';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Setting } from '../_models/setting';
import { IUser } from '../_models/user';
import {map} from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';
import { KiiApiLanguageService } from './kii-api-language.service';
import { KiiApiSettingService } from './kii-api-setting.service';
import { Page } from '../_models/page';


export interface IInitialData  {
  settings: Setting[],
  pages: Page[],
  articles: any[],   //TODO use article model here !
  user: IUser
}

@Injectable({
  providedIn: 'root'
})
export class KiiMiscService {

  private _cookies$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, 
              private title : Title,
              private meta: Meta,
              private kiiApiLang: KiiApiLanguageService,
              private kiiApiSetting: KiiApiSettingService,
              @Inject(PLATFORM_ID) private platformId: any) { }

  /**Accept cookies */
  public cookiesAccept() {
    this._cookies$.next(true);
  }

  /**Returns observable with cookies status */
  public onCookiesChange() {
    return this._cookies$;
  }



  /**When we load the app we load everything in one single http call */
  public loadInitialData() {
    return this.http.get<IInitialData>(environment.apiURL + '/initial');

  }

  /**Send email from contact form, we expect email, subject and message as parameters */
  public contact(value:any) {
    return this.http.post<any>(environment.apiURL + '/contact/email', value);
  }




  /**Updates meta tags for seo */
  seo(title:string,description:string,image:string,url:string) {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.lang = this.kiiApiLang.get()
    }

    this.title.setTitle( this.kiiApiSetting.getByKey('sitename').value + " - "+ title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({name:"robots", content:"index, follow"});
    this.meta.updateTag({ property: 'og:title', content: this.kiiApiSetting.getByKey('sitename').value + " : " + title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: this.kiiApiSetting.getByKey('url').value + url });
    if (!image) 
      this.meta.updateTag({ property: 'og:image', content: this.kiiApiSetting.getByKey('url_image').value });
    else
      this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:site_name', content: this.kiiApiSetting.getByKey('sitename').value });
    this.meta.updateTag({ property: 'og:type', content: "website" });
    this.meta.updateTag({ property: 'article:author', content: this.kiiApiSetting.getByKey('url').value });


    this.meta.updateTag({ property: 'fb:app_id', content: this.kiiApiSetting.getByKey('fb_app_id').value });
    this.meta.updateTag({ property: 'twitter:card', content: "summary" });
    this.meta.updateTag({ property: 'twitter:title', content: this.kiiApiSetting.getByKey('sitename').value + " : " + title });
    this.meta.updateTag({ property: 'twitter:description', content: description });
    this.meta.updateTag({ property: 'twitter:site', content: this.kiiApiSetting.getByKey('sitename').value });
    if (!image) 
      this.meta.updateTag({ property: 'twitter:image', content: this.kiiApiSetting.getByKey('url_image').value });
    else
      this.meta.updateTag({ property: 'twitter:image', content: image });


    console.log("TITLE", this.kiiApiSetting.getByKey('sitename').value + " - "+ title);
    console.log("DESCRIPTION", description);
    console.log("URL", this.kiiApiSetting.getByKey('url').value + url);
    if (!image) 
      console.log("IMAGE", this.kiiApiSetting.getByKey('url_image').value);
    else
      console.log("IMAGE", image);
    console.log("SITE", this.kiiApiSetting.getByKey('sitename').value);
  }

  //REMOVE ME !!!!!
  publish() {
    return this.http.get(environment.apiURL + '/facebook/post');
  }
}


