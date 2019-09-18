import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { KiiBaseAuthAbstract } from '../../../_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'kii-admin-stats',
  templateUrl: './kii-admin-stats.component.html',
  styleUrls: ['./kii-admin-stats.component.scss']
})
export class KiiAdminStatsComponent extends KiiBaseAuthAbstract implements OnInit {



  constructor(private translate: TranslateService,private kiiApiAuth : KiiApiAuthService,@Inject(PLATFORM_ID) private platformId: any) { super(kiiApiAuth,platformId); }

  ngOnInit() {

  }

  //When we change the period we recompute the stats
  onDaysSliderChange(event:MatSliderChange) {
    console.log(event);
  }

  



}
