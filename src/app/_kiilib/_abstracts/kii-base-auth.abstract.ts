import {Subscription} from 'rxjs';
import { KiiBaseAbstract } from './kii-base.abstract';
import { User } from '../_models/user';
import { KiiApiAuthService } from '../_services/kii-api-auth.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export abstract class KiiBaseAuthAbstract extends KiiBaseAbstract  {

  /**Contains current loggedin user */
  public loggedInUser : User = new User(null);

  protected _subscriptions : Subscription[] = new Array<Subscription>();        //Subscriptions array


  constructor(private _kiiApiAuth : KiiApiAuthService,@Inject(PLATFORM_ID) private _platformId: any,) {super()}

  /**Add subscription to get LoggedInUser */
/*  protected getAuthUserSubscription() {
    if (isPlatformBrowser(this._platformId)) {
        if (localStorage.getItem('token')!= null)
            this.addSubscriber(
                this._kiiApiAuth.getAuthUser().subscribe(res => {
                    this._kiiApiAuth.setLoggedInUser(new User(res));
                })
            )  
        this.getLoggedInUserSubscription();    
    }
  }*/
  protected getLoggedInUserSubscription() {
    this.addSubscriber(
        this._kiiApiAuth.getLoggedInUser().subscribe(res => {
          this.loggedInUser = res;
        })
      );    
  }
}