import { Component, OnInit } from '@angular/core';
import { KiiMiscService } from '../../_services/kii-misc.service';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';

@Component({
  selector: 'kii-share',
  templateUrl: './kii-share.component.html',
  styleUrls: ['./kii-share.component.scss']
})
export class KiiShareComponent extends KiiBaseAbstract implements OnInit {

  /**Shows or hides sharing depening on cookies */
  cookies : boolean = false;

  constructor(private kiiMisc : KiiMiscService) { super() }

  ngOnInit() {
    this.addSubscriber(
      this.kiiMisc.onCookiesChange().subscribe(res => {
        this.cookies = res;
      })
    )

  }

}
