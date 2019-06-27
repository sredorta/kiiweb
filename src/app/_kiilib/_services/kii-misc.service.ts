import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { MatBottomSheet } from '@angular/material';
import { KiiBottomSheetSoftwareUpdateComponent } from '../_components/kii-bottom-sheet-software-update/kii-bottom-sheet-software-update.component';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Setting } from '../_models/setting';
import { IUser } from '../_models/user';

export interface IInitialData  {
  settings: Setting[],
  articles: any[],   //TODO use article model here !
  user: IUser
}

@Injectable({
  providedIn: 'root'
})
export class KiiMiscService {


  constructor(private http: HttpClient) { }
  /**When we load the app we load everything in one single http call */
  public loadInitialData() {
    return this.http.get<IInitialData>(environment.apiURL + '/initial');

  }

  /**Send email from contact form, we expect email, subject and message as parameters */
  public contact(value:any) {
    return this.http.post<any>(environment.apiURL + '/contact/email', value);
  }
}
