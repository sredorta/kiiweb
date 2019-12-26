import { Component, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { KiiContactFormComponent } from '../../_forms/kii-contact-form/kii-contact-form.component';
import { KiiAinimations } from '../../../_utils/kii-animations';
import { KiiBlogAbstract } from '../../../_abstracts/kii-blog.abstract';
import { KiiApiArticleService } from '../../../_services/kii-api-article.service';
import { KiiApiPageService } from '../../../_services/kii-api-page.service';
import { KiiMiscService } from '../../../_services/kii-misc.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../../_models/user';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';
import { KiiSocketService } from '../../../_services/kii-socket.service';
import { MatDialog } from '@angular/material';
import { KiiChatDialogComponent } from '../../kii-chat-dialog/kii-chat-dialog.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { KiiApiSettingService } from '../../../_services/kii-api-setting.service';


interface Icons  {
  id:number,
  class:string[],
  text:string,
  isActive:boolean
}

@Component({
  selector: 'kii-contact',
  templateUrl: './kii-contact.component.html',
  styleUrls: ['./kii-contact.component.scss'],
  animations: KiiAinimations.contact()
})




export class KiiContactComponent extends KiiBlogAbstract implements OnInit {

  public isBrowser = isPlatformBrowser(this.platformId);
  /**Contains current loggedin user */
  public loggedInUser : User = new User(null);

  showAnimation : boolean = false;

  schemaOrganization : any = {};

  constructor(private kiiApiArticle: KiiApiArticleService, 
    private kiiSocket: KiiSocketService, //Required to start sockets !
    private dialog: MatDialog,
    private kiiApiPage: KiiApiPageService, 
    private kiiMisc : KiiMiscService, 
    private kiiApiSettings : KiiApiSettingService,
    private kiiApiAuth : KiiApiAuthService,
    private device : DeviceDetectorService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router) { super(kiiApiArticle, kiiApiPage, kiiMisc,router); }


  ngOnInit() {
    this.page="contact";
    this.initialize();
    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    );  
    
    //Add contact schema
    this.addSubscriber (
      this.kiiApiSettings.onChange().subscribe(res => {
        if (res.length) 
          this.schemaOrganization = this.kiiMisc.schemaInit("localBusiness");
      })
    )
    
  }


  animate(event : boolean) {
    if (!this.device.isMobile())
      this.showAnimation = true;
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
              top: '0px',
              right:'0px'
            },
            data:  null 
          });
          dialogRef.afterClosed().subscribe(result => {
             //Leave all rooms
             this.kiiSocket.chatLeave(result);
  
          });
      }
    }
}
