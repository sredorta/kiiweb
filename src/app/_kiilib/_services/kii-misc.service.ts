import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { MatBottomSheet } from '@angular/material';
import { KiiBottomSheetSoftwareUpdateComponent } from '../_components/kii-bottom-sheet-software-update/kii-bottom-sheet-software-update.component';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class KiiMiscService {

  private _appinstall$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _appcaninstall$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _appupdate$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  /**Tells if the event for installation ready has been recieved */
  public canInstall : boolean = false;

  /**Tells if the browser is supporting the service worker */
  public hasServiceWorker : boolean = false;

  constructor() { }


  /**Tells if install should be shown */
  AppShowInstall() {
    return this.canInstall && this.hasServiceWorker;
  }

  /**Triggers event that we can install the app */
  AppCanInstall() {
    this._appcaninstall$.next(true);
  }

  /**When we got the event that we can install the app */
  onAppCanInstall() {
    return this._appcaninstall$;
  }




  /**Triggers event to install the app */
  AppInstall() {
    this._appinstall$.next(true);
  }

  /**Returns event when user has clicked for installing the app */
  onAppInstall() {
    return this._appinstall$;
  }


  /**Triggers event to show update app message */
  AppUpdate() {
    this._appupdate$.next(true);
  }

  /**Returns event when update of the app is required */
  onAppUpdate() {
    return this._appupdate$;
  }
}
