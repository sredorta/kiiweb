import { Component, OnInit,  Inject, PLATFORM_ID } from '@angular/core';
import { KiiBaseAuthAbstract } from '../../_kiilib/_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../_kiilib/_services/kii-api-auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent extends KiiBaseAuthAbstract implements OnInit {

  constructor(private kiiApiAuth: KiiApiAuthService, @Inject(PLATFORM_ID) private platformId: any) {super(kiiApiAuth,platformId); }

  ngOnInit() {
    this.getLoggedInUserSubscription();
  }

}
