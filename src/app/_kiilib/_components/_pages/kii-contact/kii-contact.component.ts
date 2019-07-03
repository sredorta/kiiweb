import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { KiiContactFormComponent } from '../../_forms/kii-contact-form/kii-contact-form.component';

interface Icons  {
  id:number,
  class:string[],
  isActive:boolean
}

@Component({
  selector: 'kii-contact',
  templateUrl: './kii-contact.component.html',
  styleUrls: ['./kii-contact.component.scss'],
  animations: [
    trigger('detailExpand', [
      transition(':enter', [
        style({opacity:0}),
        animate('400ms 200ms ease-in-out', style({ opacity:1}))
      ]),
      transition(':leave', [
        style({opacity:0}),
      ])
    ])
  ]  
})




export class KiiContactComponent implements OnInit {
 // @ViewChild(KiiContactFormComponent,{static:false}) contactForm : KiiContactFormComponent;

  icons : Icons[] = [];
  phone : string = "";
  address: string[] = [];
  timeTable: string[] = [];

  constructor() { }

  ngOnInit() {
    this.initIcons();
  }
  /**Initialize the icons */
  initIcons() {
    this.icons.push({id:0,class:['fas', 'fa-mobile-alt'], isActive:true});
    this.icons.push({id:1,class:['far', 'fa-clock'], isActive:false});
    this.icons.push({id:2,class:['fas', 'fa-comments'], isActive:false});
    this.icons.push({id:3,class:['fas', 'fa-file-signature'], isActive:false});
    this.icons.push({id:4,class:['fas', 'fa-map-marked-alt'], isActive:false});
  }

  /**Activates icon and desactivates others */
  activateIcon(id:number) {
    let myIcon = this.icons.find(obj => obj.id == id);
    myIcon.isActive =true;

    for (let icon of this.icons.filter(obj=> obj.id!= id)) {
      icon.isActive = false;
    }
  }

  /**Returns if icon is active */
  isActive(id:number) {
    return this.icons.find(obj=> obj.id == id).isActive
  }
}
