import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { MatBottomSheet } from '@angular/material';
import { KiiMiscService } from '../../_services/kii-misc.service';
import { KiiBottomSheetSoftwareUpdateComponent } from '../kii-bottom-sheet-software-update/kii-bottom-sheet-software-update.component';
import { KiiBottomSheetSoftwareInstallComponent } from '../kii-bottom-sheet-software-install/kii-bottom-sheet-software-install.component';


@Component({
  selector: 'kii-app',
  templateUrl: './kii-app.component.html',
  styleUrls: ['./kii-app.component.scss']
})
export class KiiAppComponent extends KiiBaseAbstract implements OnInit {

  constructor(private bottomSheet: MatBottomSheet,
              @Inject(PLATFORM_ID) private _platformId: any,
              private kiiMisc : KiiMiscService) {super()}
  
  ngOnInit() {
    //Show software update bottom-sheet and install
    if (isPlatformBrowser(this._platformId)) {
      //SW update
      this.addSubscriber(
        this.kiiMisc.onAppUpdate().subscribe(res => {
          if (res==true) {
            let myBottomSheet = this.bottomSheet.open(KiiBottomSheetSoftwareUpdateComponent, {
              panelClass :"default-theme",
            })
            myBottomSheet.afterDismissed().subscribe(res => {
              if (res==true) {
                window.location.reload();
              }
            })
          }
        })
      )
      //SW install
      this.addSubscriber(
        this.kiiMisc.onAppCanInstall().subscribe(res => {
          if (res==true) {
            //We need to see if 5 connexions are there and then show install
            if (!localStorage.getItem("app.visit")) localStorage.setItem("app.visit", '1');
            else localStorage.setItem("app.visit", (parseInt(localStorage.getItem("app.visit")) + 1).toString());
            if (parseInt(localStorage.getItem("app.visit"))>5) {
              localStorage.setItem("app.visit", '1');
              let myBottomSheet = this.bottomSheet.open(KiiBottomSheetSoftwareInstallComponent, {
                panelClass :"default-theme",
              })
              myBottomSheet.afterDismissed().subscribe(res => {
                if (res==true) {
                  this.kiiMisc.AppInstall();
                }
              })
            } 
          }
        })
      )

    
    }


  }
/*  constructor(private update : SwUpdate, private snackBar : MatSnackBar,    @Inject(PLATFORM_ID) private _platformId: any,
  ) { super()}

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      console.log("HERE !!!!!!!!!!!!!!");
      this.update.available.subscribe(update => {
        console.log("update available");
        const snack = this.snackBar.open('update available', 'reload');
        snack.onAction().subscribe(res => {
          window.location.reload();
        })
      })
    }*/
/*      push.messages.subscribe(msg => {
        console.log(msg);
      })
      const key = '';
      push.requestSubscription({serverPublicKey: key}).then(pushSubscription => {
        console.log(pushSubscription.toJSON())
      } )*/



  //Each time a route is activated we come here
  onActivate(event : any) {
    //Scroll to sidenav top !
    //this.sidenavContent.scrollTo({top:0,left:0, behavior: 'smooth'});
  } 
}
