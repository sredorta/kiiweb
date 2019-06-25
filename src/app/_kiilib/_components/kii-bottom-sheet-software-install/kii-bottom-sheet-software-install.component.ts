import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'kii-bottom-sheet-software-install',
  templateUrl: './kii-bottom-sheet-software-install.component.html',
  styleUrls: ['./kii-bottom-sheet-software-install.component.scss']
})
export class KiiBottomSheetSoftwareInstallComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<KiiBottomSheetSoftwareInstallComponent>) { }

  ngOnInit() {
  }

  onClick() {
    this._bottomSheetRef.dismiss(true);
  }
}
