import {Subscription} from 'rxjs';
import { KiiBaseAbstract } from './kii-base.abstract';
import { User } from '../_models/user';
import { KiiApiAuthService } from '../_services/kii-api-auth.service';

export abstract class KiiBaseAuthAbstract extends KiiBaseAbstract  {

  /**Contains current loggedin user */
  protected loggedInUser : User = new User(null);

  protected _subscriptions : Subscription[] = new Array<Subscription>();        //Subscriptions array


  constructor(private _kiiApiAuth : KiiApiAuthService) {super()}

  /**Add a subscriber in the subscriptions list that will be unsubscribed during destroy */
  protected getAuthUser() {
    this.addSubscriber(
        this._kiiApiAuth.getLoggedInUser().subscribe(res => {
          this.loggedInUser = res;
        })
      );    
  }
}