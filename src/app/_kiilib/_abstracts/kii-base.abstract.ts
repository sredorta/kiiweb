import {Subscription} from 'rxjs';

export abstract class KiiBaseAbstract  {

  protected _subscriptions : Subscription[] = new Array<Subscription>();        //Subscriptions array

  /**Add a subscriber in the subscriptions list that will be unsubscribed during destroy */
  protected addSubscriber(subscriber: Subscription) {
    this._subscriptions.push(subscriber);
  }

  /**Removes all subscriptions done using addSubscriber */
  protected ngOnDestroy() {
    //Unsubscribe all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}