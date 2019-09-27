import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { MatBottomSheet } from '@angular/material';
import { KiiBottomSheetSoftwareUpdateComponent } from '../_components/kii-bottom-sheet-software-update/kii-bottom-sheet-software-update.component';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Setting } from '../_models/setting';
import { IUser } from '../_models/user';
import {map} from 'rxjs/operators';


export interface IInitialData  {
  settings: Setting[],
  articles: any[],   //TODO use article model here !
  user: IUser
}

@Injectable({
  providedIn: 'root'
})
export class KiiMiscService {

  private _cookies$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

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


  /**Uploads article image to server */
  public uploadImage(url:string,data:FormData) {
    return this.http.post<any>(url, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };
        case HttpEventType.Response:
          return { status: 'completed', message:event.body};
        default:
          return {status: 'unhandled',message:event.type};
        
      }
    })
    );
  }
  /**Uploads video to server */
  public uploadVideo(url:string,data:FormData) {
    return this.http.post<any>(url, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };
        case HttpEventType.Response:
          return { status: 'completed', message:event.body};
        default:
          return {status: 'unhandled',message:event.type};
      }
    })
    );
  }    
}
