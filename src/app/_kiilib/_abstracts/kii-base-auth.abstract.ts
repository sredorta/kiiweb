import {Subscription} from 'rxjs';
import { KiiBaseAbstract } from './kii-base.abstract';
import { User } from '../_models/user';
import { KiiApiAuthService } from '../_services/kii-api-auth.service';

export abstract class KiiBaseAuthAbstract extends KiiBaseAbstract  {

  /**Contains current loggedin user */
  public loggedInUser : User = new User(null);

  protected _subscriptions : Subscription[] = new Array<Subscription>();        //Subscriptions array


  constructor(private _kiiApiAuth : KiiApiAuthService) {super()}

  /**Add subscription to get LoggedInUser */
  protected getAuthUserSubscription() {
    this.addSubscriber(
        this._kiiApiAuth.getAuthUser().subscribe(res => {
            this._kiiApiAuth.setLoggedInUser(new User(res));
        })
    )  
    this.addSubscriber(
        this._kiiApiAuth.getLoggedInUser().subscribe(res => {
            console.log("AuthUser : ");
            console.log(res);
          this.loggedInUser = res;
        })
      );    
  }
}