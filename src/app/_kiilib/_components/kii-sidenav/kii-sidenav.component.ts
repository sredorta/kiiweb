import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { KiiPwaService } from '../../_services/kii-pwa.service';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiAuthService } from '../../_services/kii-api-auth.service';
import { User } from '../../_models/user';
import { KiiApiStatsService } from '../../_services/kii-api-stats.service';
import { StatAction } from '../../_models/stat';

@Component({
  selector: 'kii-sidenav',
  templateUrl: './kii-sidenav.component.html',
  styleUrls: ['./kii-sidenav.component.scss']
})
export class KiiSidenavComponent extends KiiBaseAbstract implements OnInit {
  
  /**Show or not install app */
  showApp = false;

  loggedInUser : User = new User(null);

  constructor(private _location : Location, private kiiPwa : KiiPwaService, private kiiApiAuth : KiiApiAuthService, private kiiApiStats: KiiApiStatsService) { super() }

  ngOnInit() {
    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    )
    this.addSubscriber(
      this.kiiPwa.canInstallApp().subscribe(res => {
         if (res ==true) {
            this.showApp = true;
         }
      })
    )
  }
  onClose() {
    this._location.back();
  }

  /**Install the app */
  installApp() {
    this.kiiPwa.installApp();
    this.kiiApiStats.send(StatAction.APP_INSTALL,null);
  }

}
