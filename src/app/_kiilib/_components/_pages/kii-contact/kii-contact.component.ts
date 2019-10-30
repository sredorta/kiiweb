import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { KiiContactFormComponent } from '../../_forms/kii-contact-form/kii-contact-form.component';
import { KiiAinimations } from '../../../_utils/kii-animations';

interface Icons  {
  id:number,
  class:string[],
  text:string,
  isActive:boolean
}

@Component({
  selector: 'kii-contact',
  templateUrl: './kii-contact.component.html',
  styleUrls: ['./kii-contact.component.scss'],
  animations: KiiAinimations.contact()
})




export class KiiContactComponent implements OnInit {


  showAnimation : boolean = false;

  constructor() { }

  ngOnInit() {

  }


  animate(event : boolean) {
    console.log("Recieved onAppear",event);
    this.showAnimation = true;
  }
}
