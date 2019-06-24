import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'kii-sidenav',
  templateUrl: './kii-sidenav.component.html',
  styleUrls: ['./kii-sidenav.component.scss']
})
export class KiiSidenavComponent implements OnInit {

  constructor(private _location : Location) { }

  ngOnInit() {
  }
  onClose() {
    this._location.back();
  }

}
