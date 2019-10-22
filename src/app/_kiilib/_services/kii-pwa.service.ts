import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { isPlatformBrowser } from '@angular/common';
import { MatBottomSheet } from '@angular/material';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { KiiBottomSheetSoftwareUpdateComponent } from '../_components/kii-bottom-sheet-software-update/kii-bottom-sheet-software-update.component';
import { KiiBottomSheetSoftwareInstallComponent } from '../_components/kii-bottom-sheet-software-install/kii-bottom-sheet-software-install.component';
import {map} from 'rxjs/operators';
import { KiiApiAuthService } from './kii-api-auth.service';
import { User } from '../_models/user';
import { KiiApiStatsService } from './kii-api-stats.service';
import { StatAction } from '../_models/stat';
import { BehaviorSubject, Subscription } from 'rxjs';


//NOTE: This service is only running on the browser
export interface Notification {
  action:string;
  data:any;
  title:string;
  body:string;
  icon:string;
  vibrate:any;

}


@Injectable({
  providedIn: 'root'
})
export class KiiPwaService {

  promptEvent : any = null;
  public offline = new BehaviorSubject<boolean>(false);
  private hasApp = new BehaviorSubject<boolean>(false);

  constructor(private kiiStats : KiiApiStatsService,
              private swUpdate: SwUpdate, 
              private swPush: SwPush,
              private http : HttpClient,
              private bottomSheet: MatBottomSheet,
              private kiiApiAuth: KiiApiAuthService,
              @Inject(PLATFORM_ID) private _platformId: any,) {


    if (isPlatformBrowser(this._platformId)) {
      //Handle version updates if required we show bottom sheet and upload new version
     /* swUpdate.available.subscribe(event => {
        let myBottomSheet = this.bottomSheet.open(KiiBottomSheetSoftwareUpdateComponent, {
          panelClass :"default-theme",
        })
        myBottomSheet.afterDismissed().subscribe(res => {
          if (res==true) {
            window.location.reload();
          }
        })
      });*/

      //Online/Offline detection
      this.checkInternet();
      /*window.addEventListener('online', event => {
        console.log("RECIEVED ONLINE EVENT !!!");
        this.init();
      })
      window.addEventListener('offline', event => {
        console.log("RECIEVED OFFLINE EVENT !!!");
        this.init();

      })*/

      //Handle version updates if required we show bottom sheet and upload new version
      var refreshing;
      let myObj = this;
      navigator.serviceWorker.addEventListener('controllerchange',
        function() {
          console.log("GOT CONTROLLER CHANGE !!!!!");
          if (refreshing) return;
          refreshing = true;
          console.log("NEED REFRESHING !!!!!");
          //window.location.reload();
          let myBottomSheet = myObj.bottomSheet.open(KiiBottomSheetSoftwareUpdateComponent, {
            panelClass :"default-theme",
          })
          myBottomSheet.afterDismissed().subscribe(res => {
            if (res==true) {
              window.location.reload();
            }
          })
        }
      );

      //Handle install button and tell that we show the install bottom sheet
      window.addEventListener('beforeinstallprompt', event => {
        console.log("Recieved beforeinstallprompt!")
        this.promptEvent = event;
        this.hasApp.next(true);
        if (!localStorage.getItem("app.visits")) localStorage.setItem("app.visits", '1');
        else localStorage.setItem("app.visits", (parseInt(localStorage.getItem("app.visits")) + 1).toString());
        if (parseInt(localStorage.getItem("app.visits"))>549760) {
          localStorage.setItem("app.visits", '1');
          let myBottomSheet = this.bottomSheet.open(KiiBottomSheetSoftwareInstallComponent, {
            panelClass :"default-theme",
          })
          myBottomSheet.afterDismissed().subscribe(res => {
            if (res==true) {
              this.promptEvent.prompt();
              this.kiiStats.send(StatAction.APP_INSTALL,null)
            }
          })
        } 
      });
    }
  }

  checkInternet() {
    if (isPlatformBrowser(this._platformId)) {
      let subscr : Subscription = new Subscription();
      setInterval(() => {
        console.log("CHECKING INTERNET CONNECTION");
        subscr = this.http.get(environment.mainExtURL + '/server/api/connected').subscribe(res => {
            console.log("OFFLINE:",false);
            this.offline.next(false);
            subscr.unsubscribe();
        }, error => {
            console.log("OFFLINE", true);
            this.offline.next(true);
            subscr.unsubscribe();
        })
      },10000);
    }
  }


  /**Returns if browser has service worker */
  hasServiceWorker() : boolean {
    return this.swUpdate.isEnabled;
  }

  /**Requests for subscribription to onPush notifications */
  onPushNotificationSubscription() {
    if (isPlatformBrowser(this._platformId) && this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: environment.vapidPublic
      })
      .then(sub => {
        this.http.post(environment.apiURL + '/notification/settings', { onPush : sub }).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));

      //When we recieve an onPush notification let's do whatever is required
      this.swPush.messages.pipe(map((res:any) => <Notification>res.notification)).subscribe(notification => {
        console.log("swPush.messages.subscription");
        console.log("Notification is:",notification)
      })
    }
  }

  installApp() {
    if (this.promptEvent)
     this.promptEvent.prompt();
  }

  canInstallApp() {
    return this.hasApp;
  }

  setOffline(value:boolean) {
    this.offline.next(value);
  }

  isOffline() {
    return this.offline.value;
  }

}
