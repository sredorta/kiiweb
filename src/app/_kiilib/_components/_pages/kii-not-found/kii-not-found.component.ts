import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-kii-not-found',
  templateUrl: './kii-not-found.component.html',
  styleUrls: ['./kii-not-found.component.scss']
})
export class KiiNotFoundComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this._location.back();
  }

}
