import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { KiiContactFormComponent } from '../../_forms/kii-contact-form/kii-contact-form.component';
import { KiiAinimations } from '../../../_utils/kii-animations';
import { KiiBlogAbstract } from '../../../_abstracts/kii-blog.abstract';
import { KiiApiArticleService } from '../../../_services/kii-api-article.service';
import { KiiApiPageService } from '../../../_services/kii-api-page.service';
import { KiiMiscService } from '../../../_services/kii-misc.service';
import { Router } from '@angular/router';

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




export class KiiContactComponent extends KiiBlogAbstract implements OnInit {


  showAnimation : boolean = false;

  constructor(private kiiApiArticle: KiiApiArticleService, 
    private kiiApiPage: KiiApiPageService, 
    private kiiMisc : KiiMiscService, 
    private router: Router) { super(kiiApiArticle, kiiApiPage, kiiMisc,router); }


  ngOnInit() {
    this.page="contact";
    this.initialize();
  }


  animate(event : boolean) {
    console.log("Recieved onAppear",event);
    this.showAnimation = true;
  }
}
