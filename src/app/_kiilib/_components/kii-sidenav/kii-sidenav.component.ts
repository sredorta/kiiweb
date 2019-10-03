import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { KiiPwaService } from '../../_services/kii-pwa.service';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';

@Component({
  selector: 'kii-sidenav',
  templateUrl: './kii-sidenav.component.html',
  styleUrls: ['./kii-sidenav.component.scss']
})
export class KiiSidenavComponent extends KiiBaseAbstract implements OnInit {
  
  /**Show or not install app */
  showApp = false;

  constructor(private _location : Location, private kiiPwa : KiiPwaService) { super() }

  ngOnInit() {
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
  }

}
