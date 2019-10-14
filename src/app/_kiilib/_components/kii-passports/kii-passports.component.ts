import { Component, OnInit } from '@angular/core';
import { KiiSpinnerService } from '../../_services/kii-spinner.service';
import { environment } from '../../../../environments/environment';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiPwaService } from '../../_services/kii-pwa.service';

@Component({
  selector: 'kii-passports',
  templateUrl: './kii-passports.component.html',
  styleUrls: ['./kii-passports.component.scss']
})
export class KiiPassportsComponent extends KiiBaseAbstract implements OnInit {

  offline:boolean = false;
  
  constructor(public spinner: KiiSpinnerService, private kiiPwa: KiiPwaService) { super()}

  ngOnInit() {
        //Subscribe to online/offline
        this.addSubscriber(
          this.kiiPwa.offline.subscribe(res => {
            this.offline = res;
          })
        )
  }
  /**Returns the address that is required in href to trigger the fb passport */
  getOAuthAddress(type:string) {
    return environment.apiExtURL + '/auth/' + type;
  }

}
