import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { KiiBaseAuthAbstract } from '../../../_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';

@Component({
  selector: 'app-kii-admin-menu',
  templateUrl: './kii-admin-menu.component.html',
  styleUrls: ['./kii-admin-menu.component.scss']
})
export class KiiAdminMenuComponent extends KiiBaseAuthAbstract implements OnInit {

  constructor(private kiiApiAuth : KiiApiAuthService,@Inject(PLATFORM_ID) private platformId: any) { super(kiiApiAuth,platformId) }

  ngOnInit() {
    this.getLoggedInUserSubscription();
  }

}
