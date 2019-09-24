import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { KiiMiscService } from '../../_services/kii-misc.service';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { KiiApiStatsService } from '../../_services/kii-api-stats.service';
import { StatAction } from '../../_models/stat';

@Component({
  selector: 'kii-share',
  templateUrl: './kii-share.component.html',
  styleUrls: ['./kii-share.component.scss']
})
export class KiiShareComponent extends KiiBaseAbstract implements OnInit {

  /**Shows or hides sharing depening on cookies */
  cookies : boolean = false;
  /**Current url */
  url : string = "";

  constructor(private kiiStats: KiiApiStatsService,
              private router: Router, 
              private kiiMisc : KiiMiscService, 
              @Inject(PLATFORM_ID) private platformId: any ) { super() }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.url = window.location.href;
      console.log("URL IS:",this.url)
      this.addSubscriber(
        this.kiiMisc.onCookiesChange().subscribe(res => {
          this.cookies = res;
        })
      )
    }
  }

  sendStats(social:string) {
      console.log("SENDING STATS !!");
      this.kiiStats.send(StatAction.SOCIAL_CLICK, social);
  }



}
