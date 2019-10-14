import { Component, OnInit } from '@angular/core';
import { KiiSpinnerService } from '../../_services/kii-spinner.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'kii-passports',
  templateUrl: './kii-passports.component.html',
  styleUrls: ['./kii-passports.component.scss']
})
export class KiiPassportsComponent implements OnInit {

  constructor(public spinner: KiiSpinnerService) { }

  ngOnInit() {
  }
  /**Returns the address that is required in href to trigger the fb passport */
  getOAuthAddress(type:string) {
    return environment.apiExtURL + '/auth/' + type;
  }
}
