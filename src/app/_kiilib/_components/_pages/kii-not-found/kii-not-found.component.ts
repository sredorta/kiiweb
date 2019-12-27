import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RESPONSE } from '@nguniversal/express-engine/tokens'
import { Response } from 'express'

@Component({
  selector: 'app-kii-not-found',
  templateUrl: './kii-not-found.component.html',
  styleUrls: ['./kii-not-found.component.scss']
})
export class KiiNotFoundComponent implements OnInit {
  private response: Response;
  constructor(@Optional() @Inject(RESPONSE) response: any,private _location: Location, private _router:Router) {
    this.response = response;
  }

  ngOnInit() {
    if (this.response) {
      // response will only be if we have express
      // this.response.statusCode = 404;
      this.response.status(404);
    }
  }


  goHome() {
      this._router.navigate([""]);
  }

}
