import {Subscription} from 'rxjs';
import { KiiBaseAbstract } from './kii-base.abstract';
import { User } from '../_models/user';
import { KiiApiAuthService } from '../_services/kii-api-auth.service';
import { Inject, PLATFORM_ID } from '@angular/core';

export abstract class KiiBaseAuthAbstract extends KiiBaseAbstract  {

  /**Contains current loggedin user */
  public loggedInUser : User = new User(null);

  protected _subscriptions : Subscription[] = new Array<Subscription>();        //Subscriptions array


  constructor(private _kiiApiAuth : KiiApiAuthService,@Inject(PLATFORM_ID) private _platformId: any) {super()}


  protected getLoggedInUserSubscription() {
    this.addSubscriber(
        this._kiiApiAuth.getLoggedInUser().subscribe(res => {
          this.loggedInUser = res;
        })
      );    
  }
}