import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KiiMiscService {

  private _appinstall$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
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

//We need to move this in the kii-app, along with the install bottom sheet
/*
  this.translate.get(['kiilib.pwa.update.text', 'kiilib.pwa.update.button']).subscribe(trans => {
    const snack = this.snackBar.open(trans['kiilib.pwa.update.text'], trans['kiilib.pwa.update.button']);
    snack.onAction().subscribe(res => {
      window.location.reload();
    })
  })*/

}
