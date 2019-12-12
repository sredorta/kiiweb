import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { SwUpdate } from '@angular/service-worker';
import { Router } from '@angular/router';
import { KiiBaseAbstract } from './_kiilib/_abstracts/kii-base.abstract';
import { LocalizeRouterService } from './_kiilib/_libraries/localize-router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kiiweb';
  constructor() { }
  ngOnInit() {



  }

}

