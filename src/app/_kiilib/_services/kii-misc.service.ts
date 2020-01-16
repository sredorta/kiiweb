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
import { KiiApiPageService } from './kii-api-page.service';
import {CookieService} from 'ngx-cookie-service';
import galite from 'ga-lite'

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
              private kiiApiPage : KiiApiPageService,
              private kiiApiLang: KiiApiLanguageService,
              private kiiApiSetting: KiiApiSettingService,
              private cookieService: CookieService,
              @Inject(PLATFORM_ID) private platformId: any) { }

  /**Accept cookies */
  public cookiesAccept() {
    if (isPlatformBrowser(this.platformId)) {
        galite('create', 'UA-156082499-1', 'auto');// add your tracking ID here.
        galite('set', 'page', "");
        galite('send', 'pageview');
    }
    this._cookies$.next(true);
  }

  /**Sets galite */
  public galite(first:any,second:any,third?:any) {
    console.log("Running galite !");
    if (!third)
      galite(first,second);
    else
      galite(first,second,third);

  }


  /**Refuse accepted cookies */
  public cookiesRefuse() {
    console.log("Removing cookies !");
    this._cookies$.next(false);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('cookies');
      galite('send', 'remove');
      galite('send', 'timing', 'JS Dependencies', 'unload')
      this.cookieService.deleteAll('/','.kubiiks.com');
      this.cookieService.deleteAll('/', '/');
      console.log(this.cookieService.getAll());
    }
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

    if (title !== null && description !== null) {

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
    }
  }


    //Add schema data
  schemaInit(type: 'site' | 'corporation' | 'localBusiness') {
    if (type == 'site')
          return {
            '@context': 'http://schema.org',
            '@type': 'WebSite',
            'name' : this.kiiApiSetting.getByKey('sitename').value,
            'url' : this.kiiApiSetting.getByKey('url').value
          }
    if (type == 'corporation' )      
        return {
            '@context': 'http://schema.org',
            '@type': 'Corporation',
            '@id':  this.kiiApiSetting.getByKey('url').value.replace('www','corporation'),
            'description': this.kiiApiPage.getByKey('home').description,
            'url': this.kiiApiSetting.getByKey('url').value,
            'address': {
                '@type': "PostalAddress",
                'addressLocality': this.kiiApiSetting.getByKey('companyAddress').value.split(';')[1].replace(/[0-9]*/gi,''),
                'addressCountry':this.kiiApiSetting.getByKey('companyAddress').value.split(';')[2],
                'postalCode':this.kiiApiSetting.getByKey('companyAddress').value.split(';')[1].replace(/[a-zA-Z] */gi,''),
                'streetAddress':this.kiiApiSetting.getByKey('companyAddress').value.split(';')[0],
            },
            'logo':this.kiiApiSetting.getByKey('appicon512').value,
            'sameAs': [
              this.kiiApiSetting.getByKey('linkFacebook').value,
              this.kiiApiSetting.getByKey('linkGoogleplus').value,
              this.kiiApiSetting.getByKey('linkInstagram').value,
              this.kiiApiSetting.getByKey('linkLinkedin').value,
              this.kiiApiSetting.getByKey('linkTwitter').value,
              this.kiiApiSetting.getByKey('linkYoutube').value,
            ].filter(a => a !== "")
          }
    if (type == 'localBusiness')      
        return {
          '@context': 'http://schema.org',
          '@type': 'Organization',
          'url' : this.kiiApiSetting.getByKey('url').value,
          'contactPoint': {
             'telephone' : this.kiiApiSetting.getByKey('companyPhone').value,
             'email' : this.kiiApiSetting.getByKey('companyEmail').value,
             'contactType' : 'customer service'
          }
        }
  }

}


