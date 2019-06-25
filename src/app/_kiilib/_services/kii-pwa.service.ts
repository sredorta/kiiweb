import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { isPlatformBrowser } from '@angular/common';
import { MatBottomSheet } from '@angular/material';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { KiiBottomSheetSoftwareUpdateComponent } from '../_components/kii-bottom-sheet-software-update/kii-bottom-sheet-software-update.component';
import { KiiBottomSheetSoftwareInstallComponent } from '../_components/kii-bottom-sheet-software-install/kii-bottom-sheet-software-install.component';


//NOTE: This service is only running on the browser

@Injectable({
  providedIn: 'root'
})
export class KiiPwaService {

  promptEvent : any = null;

  constructor(private swUpdate: SwUpdate, 
              private swPush: SwPush,
              private http : HttpClient,
              private bottomSheet: MatBottomSheet,
              @Inject(PLATFORM_ID) private _platformId: any,) {


    if (isPlatformBrowser(this._platformId)) {
      //Handle version updates if required we show bottom sheet and upload new version
      swUpdate.available.subscribe(event => {
        let myBottomSheet = this.bottomSheet.open(KiiBottomSheetSoftwareUpdateComponent, {
          panelClass :"default-theme",
        })
        myBottomSheet.afterDismissed().subscribe(res => {
          if (res==true) {
            window.location.reload();
          }
        })
      });

      //Handle install button and tell that we show the install bottom sheet
      window.addEventListener('beforeinstallprompt', event => {
        this.promptEvent = event;
        if (!localStorage.getItem("app.visits")) localStorage.setItem("app.visits", '1');
        else localStorage.setItem("app.visits", (parseInt(localStorage.getItem("app.visits")) + 1).toString());
        if (parseInt(localStorage.getItem("app.visits"))>5) {
          localStorage.setItem("app.visits", '1');
          let myBottomSheet = this.bottomSheet.open(KiiBottomSheetSoftwareInstallComponent, {
            panelClass :"default-theme",
          })
          myBottomSheet.afterDismissed().subscribe(res => {
            if (res==true) {
              this.promptEvent.prompt();
            }
          })
        } 
      });
    }
  }
  /**Returns if browser has service worker */
  hasServiceWorker() : boolean {
    return this.swUpdate.isEnabled;
  }

  /**Requests for subscribription to onPush notifications */
  onPushNotificationSubscription() {
    if (isPlatformBrowser(this._platformId)) {
      this.swPush.requestSubscription({
        serverPublicKey: environment.vapidPublic
      })
      .then(sub => {
        console.log(sub);
        this.http.post(environment.apiURL + '/notifications', { notification : sub }).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
    }
  }





}
