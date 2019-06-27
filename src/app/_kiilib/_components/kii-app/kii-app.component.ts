import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { MatBottomSheet } from '@angular/material';
import { KiiPwaService } from '../../_services/kii-pwa.service';
import { SwPush } from '@angular/service-worker';
import { KiiBaseAuthAbstract } from '../../_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../_services/kii-api-auth.service';
import { isPlatformBrowser } from '@angular/common';
import { KiiMiscService } from '../../_services/kii-misc.service';
import { Setting } from '../../_models/setting';
import { IUser, User } from '../../_models/user';
import { KiiApiSettingService } from '../../_services/kii-api-setting.service';
import { KiiApiLanguageService } from '../../_services/kii-api-language.service';



@Component({
  selector: 'kii-app',
  templateUrl: './kii-app.component.html',
  styleUrls: ['./kii-app.component.scss']
})
export class KiiAppComponent extends KiiBaseAuthAbstract implements OnInit {

  constructor(private bottomSheet: MatBottomSheet,
              @Inject(PLATFORM_ID) private platformId: any,
              private kiiPwa : KiiPwaService, private swPush : SwPush,
              private kiiApiAuth: KiiApiAuthService,
              private kiiMisc: KiiMiscService,
              private kiiApiSetting: KiiApiSettingService,
              private kiiApiLang: KiiApiLanguageService) {super(kiiApiAuth, platformId)}
  //kiiPwa has on its constructor the handling of versions and install so nothing to do
  //Subscriptions to onPush needs to be called
  ngOnInit() {
    //Subscribe to authUser
    this.getLoggedInUserSubscription();
    this.loadInitialData();
    //Get initial data when we change language
    this.addSubscriber(
      this.kiiApiLang.onChange().subscribe(res => {
        this.loadInitialData();
      })
    )


/*
    //TODO: Only subscribe if you are admin or registered...
    this.kiiPwa.onPushNotificationSubscription();

    //TODO: Move this to kiiPwa and define actions and what to do with actions...
    this.swPush.notificationClicks.subscribe( event => {
      console.log('Received notification: ', event);
      const url = event.notification.data.url;
      window.open(url, '_blank');
    });*/

  }


  loadInitialData() {
    //Get all initial data
    this.addSubscriber(
      this.kiiMisc.loadInitialData().subscribe(res => {
        console.log("INTIAL DATA");
        console.log(res);
        this.kiiApiAuth.setLoggedInUser(new User(res.user));
        let mySettings = [];
        for (let setting of res.settings) {
          mySettings.push(new Setting(setting));
        }
        this.kiiApiSetting.set(mySettings);
        //TODO: Init articles
      })
    )
  }


  //Each time a route is activated we come here
  onActivate(event : any) {
    //Scroll to sidenav top !
    //this.sidenavContent.scrollTo({top:0,left:0, behavior: 'smooth'});
  } 
}
