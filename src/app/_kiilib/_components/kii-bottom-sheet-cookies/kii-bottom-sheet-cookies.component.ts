import { Component, OnInit } from '@angular/core';
import { KiiMiscService } from '../../_services/kii-misc.service';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-kii-bottom-sheet-cookies',
  templateUrl: './kii-bottom-sheet-cookies.component.html',
  styleUrls: ['./kii-bottom-sheet-cookies.component.scss']
})
export class KiiBottomSheetCookiesComponent implements OnInit {

  constructor(private kiiMisc: KiiMiscService,private _bottomSheetRef: MatBottomSheetRef<KiiBottomSheetCookiesComponent>) { }

  ngOnInit() {
  }

  /**Continue without cookies */
  reject() {
    this._bottomSheetRef.dismiss();
  }

  /**Cookies has been accepted */
  accept() {
    //As this form only is shown on the broser side we don't need to wrap anything
    localStorage.setItem("cookies", "true");
    this.kiiMisc.cookiesAccept();
    this._bottomSheetRef.dismiss();
  }
}
