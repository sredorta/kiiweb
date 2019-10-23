import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef, HostListener } from '@angular/core';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { MatBottomSheet, MatDialog } from '@angular/material';
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
import { Article } from '../../_models/article';
import { KiiApiArticleService } from '../../_services/kii-api-article.service';
import { KiiBottomSheetCookiesComponent } from '../kii-bottom-sheet-cookies/kii-bottom-sheet-cookies.component';
import { LocalizeRouterService } from '../../_libraries/localize-router/localize-router.service';
import { KiiSocketService, SocketEvents, ChatDataType } from '../../_services/kii-socket.service';
import { KiiChatDialogComponent } from '../kii-chat-dialog/kii-chat-dialog.component';
import { KiiApiStatsService } from '../../_services/kii-api-stats.service';
import { Router, RouterEvent,NavigationStart, NavigationEnd } from '@angular/router';
import { StatAction } from '../../_models/stat';
import { start } from 'repl';
import { KiiPopupDialogComponent } from '../kii-popup-dialog/kii-popup-dialog.component';



@Component({
  selector: 'kii-app',
  templateUrl: './kii-app.component.html',
  styleUrls: ['./kii-app.component.scss']
})
export class KiiAppComponent extends KiiBaseAuthAbstract implements OnInit {

  public isBrowser = isPlatformBrowser(this.platformId);
  public alertCount : number = 0;
  public offline = false;

  constructor(
              @Inject(PLATFORM_ID) private platformId: any,
              private kiiPwa : KiiPwaService, private swPush : SwPush,
              private kiiSocket: KiiSocketService, //Required to start sockets !
              private bottomSheet: MatBottomSheet,
              private kiiApiAuth: KiiApiAuthService,
              private kiiMisc: KiiMiscService,
              private kiiApiSetting: KiiApiSettingService,
              private kiiApiLang: KiiApiLanguageService,
              private kiiApiArticle: KiiApiArticleService,
              private kiiApiStats: KiiApiStatsService,
              private localize: LocalizeRouterService,
              private changeDetectorRef: ChangeDetectorRef,
              private router : Router,
              private dialog: MatDialog,
              ) {super(kiiApiAuth, platformId)}
  //kiiPwa has on its constructor the handling of versions and install so nothing to do
  //Subscriptions to onPush needs to be called
  ngOnInit() {
    //Subscribe to authUser
    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
        if (this.loggedInUser.exists()) {
            //Subscribe to onPush notifications
            this.kiiPwa.onPushNotificationSubscription();
        }
        if (isPlatformBrowser(this.platformId)) {
            this.kiiSocket.updateAuth();
        }
      })
    )
    this.addSubscriber(
      this.kiiApiAuth.getUnreadNotifications().subscribe(count => {
        this.alertCount = count;
      })
    )

    this.loadInitialData();
    /**Loads user if we are browser */
    if (isPlatformBrowser(this.platformId)) {
      if (User.hasToken())
        this.addSubscriber(
          this.kiiApiAuth.getAuthUser().subscribe(res => {
              this.kiiApiAuth.setLoggedInUser(new User(res));
          }, error => {
            User.removeToken();
            console.log("Got error",error);
          })
        )
    }

    //Get initial data when we change language
    this.addSubscriber(
      this.kiiApiLang.onChange().subscribe(res => {
        this.loadInitialData();
      })
    )


    //Initialize cookies
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem("cookies") == "true") {
        this.kiiMisc.cookiesAccept();
      } else {
        //Show cookies accept !
        this.openBottomSheetCookies();
      }
    }  

    //Subscribe to notifications click and redirect to site if click
    if (isPlatformBrowser(this.platformId)) {
      this.addSubscriber(
        this.swPush.notificationClicks.subscribe( event => {
          const url = event.notification.data.url;
          window.open(url, '_blank');
        })
      )
    }
    //Subscribe to online/offline
    this.addSubscriber(
        this.kiiPwa.offline.subscribe(res => {
          this.offline = res;
        })
    )

  }

  /**Opens chat dialog */
  onOpenChat():void {
    if (isPlatformBrowser(this.platformId)) {
        let dialogRef = this.dialog.open(KiiChatDialogComponent, {
          panelClass: 'kii-chat-dialog',
          minWidth:'300px',
          maxWidth:'500px',
          width:"100vw",
          maxHeight:'90vh',
          position: {
            top: '10px'
          },
          data:  null 
        });
        dialogRef.afterClosed().subscribe(result => {
           //Leave all rooms
           this.kiiSocket.chatLeave(result);

        });
    }
  }

  /** Shows cookies acceptance bottom sheet */
  openBottomSheetCookies(): void {
          this.bottomSheet.open(KiiBottomSheetCookiesComponent, {
              panelClass :"default-theme",
              });
          //When cookies form is closed    
          this.addSubscriber(    
            this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe(res => {
              if (localStorage.getItem("cookies") == "true") {
                this.kiiApiStats.send(StatAction.NAVIGATION_START ,this.router.url);
              }
            })    
          )
  }

  /**Loads all initial data like articles,settings and auth user */
  loadInitialData() {
    //Get all initial data
    this.addSubscriber(
      this.kiiMisc.loadInitialData().subscribe(res => {
        if (isPlatformBrowser(this.platformId))
          this.kiiApiAuth.setLoggedInUser(new User(res.user));
            //Set language based on user language 
        let mySettings = [];
        for (let setting of res.settings) {
          mySettings.push(new Setting(setting));
        }
        this.kiiApiSetting.set(mySettings);
        let myArticles = [];
        for (let article of res.articles) {
          myArticles.push(new Article(article));
        }
        this.kiiApiArticle.set(myArticles);
        this.openPopupDialog(); //Opens popup if required
      })
    )
  }

  /**Opens temrs and conditions dialog */  
  openPopupDialog(): void {
    if (isPlatformBrowser(this.platformId)) {
      //Get the popup setting from localstorage
      let storage = localStorage.getItem("popup");
      let value = this.kiiApiSetting.getByKey("popup-show").value;
      if (value != "disabled" && (!storage || !storage.includes(value))) {
        setTimeout(() => {
            this.dialog.open(KiiPopupDialogComponent, {
              panelClass: '',
              data:  null,
              maxHeight:'90vh',
              minWidth:'320px'
            });
        },500);
        localStorage.setItem("popup", value );
      }
    }
  }




  //Each time a route is activated we come here and we send stats if cookies accepted
  onActivate(event : any) {
    //Send stats if we are in browser and cookies accepted
    this.kiiApiStats.send(StatAction.NAVIGATION_START, this.router.url);

    //this.kiiApiStats.send(this.router.url);
    //Scroll to sidenav top !
    //this.sidenavContent.scrollTo({top:0,left:0, behavior: 'smooth'});
  } 


  //Detect when user closes the app so that we can save end-time of the session
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.kiiApiStats.send(StatAction.APP_END,this.router.url);
    this.kiiApiStats.clearSession();
  }



}
