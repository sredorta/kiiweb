import { Component, OnInit } from '@angular/core';
import { KiiBaseAbstract } from '../../../../_kiilib/_abstracts/kii-base.abstract';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';

@Component({
  selector: 'kii-reset-password',
  templateUrl: './kii-reset-password.component.html',
  styleUrls: ['./kii-reset-password.component.scss']
})
export class KiiResetPasswordComponent extends KiiBaseAbstract implements OnInit {
  loading:boolean = false;
  constructor(private kiiApiAuth: KiiApiAuthService) {super() }

  ngOnInit() {
  }
  onSubmit(value:any) {
    this.loading = true;
    this.addSubscriber(
      this.kiiApiAuth.resetpassword(value).subscribe(res => {
        this.loading = false;
      }, () => this.loading = false)
    );
  }
}
