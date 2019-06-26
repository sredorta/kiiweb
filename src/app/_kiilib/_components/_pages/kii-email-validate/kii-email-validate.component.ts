import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';
import { KiiApiLanguageService } from '../../../_services/kii-api-language.service';
import { KiiSpinnerService } from '../../../_services/kii-spinner.service';
import { KiiBaseAbstract } from '../../../_abstracts/kii-base.abstract';
import { User } from '../../../_models/user';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-kii-email-validate',
  templateUrl: './kii-email-validate.component.html',
  styleUrls: ['./kii-email-validate.component.scss']
})
export class KiiEmailValidateComponent extends KiiBaseAbstract implements OnInit {

  /**When there are parameter errors or response is error we show error part */
  isError : boolean = false;
  isCompleted:boolean = false;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private kiiApiAuth : KiiApiAuthService,
    private kiiApiLanguage : KiiApiLanguageService,
    private spinner : KiiSpinnerService) { super() }

  ngOnInit() {
  }
  ngAfterViewInit() {
    //If we are on server we only show the waiting page
    //If we are on browser then we detect if we are ok or not and then login
    if (isPlatformBrowser(this.platformId)) {
        this.addSubscriber(
          this.route.queryParams.subscribe(params => {
            if (!this.hasValidParams(params)) this.isError = true;
            else {
              //Check if the account is validated
              this.addSubscriber(
                this.kiiApiAuth.validateEmail(params).subscribe(res => {
                  //We are getting token and authUser so we need to save everything
                  this.kiiApiAuth.setLoggedInUser(new User(res.user));
                  User.saveToken(res.token);
                  this.isCompleted = true;
                  setTimeout(()=> {
                    this.router.navigate([""]);
                  },100);
                }, (error) => {
                  this.isCompleted = true;
                  this.isError = true;
                })
              )
            }      
          })
        )
    }
  }

  /**Checks that parameters are valid */
  hasValidParams(params:any) {
    if (!params['id']) return false;
    if (!params['key']) return false;
    return true;
  }
}
