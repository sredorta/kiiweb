import { Component, OnInit,PLATFORM_ID,Inject,ViewChild,ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from '../../../../_kiilib/_abstracts/kii-base.abstract';
import { KiiSpinnerService } from '../../../_services/kii-spinner.service';
import { User } from '../../../_models/user';
import { Router } from '@angular/router';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'kii-login-signup',
  templateUrl: './kii-login-signup.component.html',
  styleUrls: ['./kii-login-signup.component.scss'],
  animations: [
    trigger('detailExpand', [
      transition(':enter', [
        style({ height:'0px',maxHeight:'0px'}),
        animate('300ms ease-in', style({ height:'*',maxHeight:'1000px'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ maxHeight:'0px'}))
      ])
    ])
  ]  
})
export class KiiLoginSignupComponent extends KiiBaseAbstract implements OnInit {
  showLogin : boolean = false;
  showSignup : boolean = false;
  constructor(private kiiApiAuth: KiiApiAuthService,
    private spinner: KiiSpinnerService, 
    private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object) {super() }


  ngOnInit() {
  }


  toggleLogin() {
    this.showLogin = !this.showLogin;
    if (this.showLogin) this.showSignup = false;
  }


  toggleSignup() {
    this.showSignup = !this.showSignup;
    if (this.showSignup) this.showLogin = false;
  }

  onSubmitLogin(value:any) {
    this.spinner.show();
    this.addSubscriber(
      this.kiiApiAuth.login(value).subscribe(res => {
        User.saveToken(res.token);
        this.kiiApiAuth.getAuthUser().subscribe(res => {
          this.spinner.hide();
          this.kiiApiAuth.setLoggedInUser(new User(res));
          this.router.navigate([""]);
        }, () => this.spinner.hide());        
      }, () => this.spinner.hide())
    );
  }

  onSubmitSignup(value:any) {
    if (isPlatformBrowser(this.platformId)) {
        this.spinner.show();
        this.addSubscriber(
          this.kiiApiAuth.signup(value).subscribe(res => {
            //Now create the token, getAuthUser and move to home if we are with direct login
            if (res.token) {
              User.saveToken(res.token);
              this.kiiApiAuth.getAuthUser().subscribe(res => {
                this.spinner.hide();
                this.kiiApiAuth.setLoggedInUser(new User(res));
                this.router.navigate([""]);
              }, () => this.spinner.hide());
            } else {
              //We need to validate email before login
              this.spinner.hide();
              this.router.navigate([""]);
            }
          }, () => this.spinner.hide())
        );
      }
  }   
}
