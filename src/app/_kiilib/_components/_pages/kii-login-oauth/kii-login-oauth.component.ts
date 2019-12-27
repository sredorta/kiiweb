import { Component, OnInit,Inject,PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationStart } from '@angular/router';
import { Router } from '@angular/router';
import { KiiBaseAbstract } from '../../../../_kiilib/_abstracts/kii-base.abstract';
import { User } from '../../../_models/user';
import { KiiApiLanguageService } from '../../../_services/kii-api-language.service';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'kii-login-oauth',
  templateUrl: './kii-login-oauth.component.html',
  styleUrls: ['./kii-login-oauth.component.scss']
})
export class KiiLoginOauthComponent extends KiiBaseAbstract implements OnInit {
  /**Token recieved as query param */
  public token:string = "";

  /**Current user */
  user : User = new User(null); //Current user
  /**When we load the data */
  loading:boolean = true;

  /**Show terms and conditions or not */
  showTerms:boolean = false;

  /**Newsletter subscription */
  newsletter: boolean = true;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private kiiApiAuth : KiiApiAuthService,
    private kiiApiLanguage : KiiApiLanguageService) {super() }

  ngOnInit() {
    //If we navigate away and terms are not accepted we reset user
    this.addSubscriber(
      this.router.events.subscribe((event)=> {
        if (event instanceof NavigationStart) {
          if (!this.user.terms && this.user.exists()) {
            this.kiiApiAuth.setLoggedInUser(new User(null));
            User.removeToken();
          }
          if (this.user.terms == true && this.user.exists()) {
            this.kiiApiAuth.setLoggedInUser(this.user);
          }
        }
      })
    )
  }

  ngAfterViewInit() {

      this.addSubscriber(this.route.params.subscribe(params => {
        this.token = params['token'];
        if (isPlatformBrowser(this.platformId)) {
          User.saveToken(this.token);
        }
        //We got a temporary token... but we still need to check if all parameters are valid in the user
        this.addSubscriber(this.kiiApiAuth.oauth2Validate().subscribe(res => {
            this.loading = false;
            if (res.complete != true) {
              this.user = new User(res.user);
              this.showTerms = true;
            } else {
              this.user = new User(res.user);
              this.user.terms = true;
              this.router.navigate([""]);
            }
          }, () => {this.loading = false}
        ));
      }));
  }

  /**When terms are rejected */
  onRejectTerms() {
    //Do not log in
    this.router.navigate([""]);
  }

  /**When terms are accepted */
  onAcceptTerms() {
    this.loading = true;
    //Now we neet to update the user with the given extra data and move to home
    this.user.update({terms:true, language: this.kiiApiLanguage.get(), isEmailValidated:true});
    this.addSubscriber(this.kiiApiAuth.oauth2Update(this.user.to("IUser"),this.newsletter).subscribe(res => {
      this.router.navigate([""]);
      this.loading = false;
    },() => this.loading = false));
  }

  /**When checkbox changes value */
  onNewsletterChange(event: MatCheckboxChange) {
    this.newsletter = event.checked;
  }




}
