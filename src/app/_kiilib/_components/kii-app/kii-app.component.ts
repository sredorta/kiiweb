import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';


@Component({
  selector: 'kii-app',
  templateUrl: './kii-app.component.html',
  styleUrls: ['./kii-app.component.scss']
})
export class KiiAppComponent extends KiiBaseAbstract implements OnInit {

  constructor() {super()}
  ngOnInit() {


  }
/*  constructor(private update : SwUpdate, private snackBar : MatSnackBar,    @Inject(PLATFORM_ID) private _platformId: any,
  ) { super()}

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      console.log("HERE !!!!!!!!!!!!!!");
      this.update.available.subscribe(update => {
        console.log("update available");
        const snack = this.snackBar.open('update available', 'reload');
        snack.onAction().subscribe(res => {
          window.location.reload();
        })
      })
    }*/
/*      push.messages.subscribe(msg => {
        console.log(msg);
      })
      const key = '';
      push.requestSubscription({serverPublicKey: key}).then(pushSubscription => {
        console.log(pushSubscription.toJSON())
      } )*/



  //Each time a route is activated we come here
  onActivate(event : any) {
    //Scroll to sidenav top !
    //this.sidenavContent.scrollTo({top:0,left:0, behavior: 'smooth'});
  } 
}
