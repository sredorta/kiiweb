import { Component, OnInit,PLATFORM_ID,Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from '../../../../_kiilib/_abstracts/kii-base.abstract';
import { KiiSpinnerService } from '../../../_services/kii-spinner.service';
import { User } from '../../../_models/user';
import { Router } from '@angular/router';
import { KiiApiAuthService, IUserWithToken } from '../../../_services/kii-api-auth.service';

@Component({
  selector: 'kii-login-signup',
  templateUrl: './kii-login-signup.component.html',
  styleUrls: ['./kii-login-signup.component.scss']
})
export class KiiLoginSignupComponent extends KiiBaseAbstract implements OnInit {

  constructor(private kiiApiAuth: KiiApiAuthService,
    private spinner: KiiSpinnerService, 
    private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object) {super() }


  ngOnInit() {
  }


  onSubmitLogin(value:any) {
    this.spinner.show();
    this.addSubscriber(
      this.kiiApiAuth.login(value).subscribe(res => {
        User.saveToken(res.token);
        this.kiiApiAuth.setLoggedInUser(new User(res.user));
        this.spinner.hide();
        this.router.navigate([""]);  
      }, () => this.spinner.hide())
    );
  }

  onSubmitSignup(value:any) {
    if (isPlatformBrowser(this.platformId)) {
        this.spinner.show();
        this.addSubscriber(
          this.kiiApiAuth.signup(value).subscribe(res => {
            let tmp = <any>res;
            if (tmp.token) {
              tmp = <IUserWithToken>res;
              User.saveToken(tmp.token);
              this.kiiApiAuth.setLoggedInUser(new User(tmp.user));
            } 
            this.spinner.hide();
            this.router.navigate([""]);
          }, () => this.spinner.hide())
        );
      }
  }   
}
