import { Component, OnInit, ViewChild } from '@angular/core';
import { KiiFormAbstract } from '../../../../_kiilib/_abstracts/kii-form.abstract';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { KiiApiPageService } from '../../../_services/kii-api-page.service';
import { Page } from '../../../_models/page';
import { MatSelectChange } from '@angular/material';
import { KiiImageUploadComponent } from '../../kii-image-upload/kii-image-upload.component';

@Component({
  selector: 'kii-seo-form',
  templateUrl: './kii-seo-form.component.html',
  styleUrls: ['./kii-seo-form.component.scss']
})
export class KiiSeoFormComponent extends KiiFormAbstract implements OnInit {

  pages : Page[] =[];
  currentPage : Page = new Page(null);
  storage :string ="content";

  @ViewChild(KiiImageUploadComponent, {static:false}) uploader : KiiImageUploadComponent;

  constructor(private kiiApiPage : KiiApiPageService) {super(); }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.myForm =  new FormGroup({    
      page: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      title: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),      
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),   
      image: new FormControl('', Validators.compose([])),
    });
    //Load current pages data
    this.addSubscriber(
      this.kiiApiPage.onChange().subscribe(res => {
        if (res.length>0) {
          this.pages = res;
          this.currentPage = this.pages[0]; //Set current page
          this.myForm.controls['page'].setValue(this.currentPage.page);
        }
      })
    )

  }

  /**When we change page */
  onPageChange(event:MatSelectChange) {
    this.currentPage = this.kiiApiPage.getByKey(event.value);
    this.uploader.setImage(this.currentPage.image);
    this.myForm.controls["image"].setValue(this.currentPage.image);
  }


  /**Patch the value of image once we recieve onUpload */
  onUpload(url:string) {
    this.myForm.controls["image"].setValue(url);
    this.myForm.markAsDirty();
  }

}

