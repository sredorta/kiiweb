import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../../../_models/article';
import { KiiFormAbstract } from '../../../_abstracts/kii-form.abstract';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'kii-article-summary-form',
  templateUrl: './kii-article-summary-form.component.html',
  styleUrls: ['./kii-article-summary-form.component.scss']
})
export class KiiArticleSummaryFormComponent extends KiiFormAbstract implements OnInit {

  @Input() article : Article = new Article(null);
  
  /**Storage to be used for images : content (default), blog */
  @Input() storage : "content" | "blog" | "email" = "content";

  @Output() onChange = new EventEmitter<any>();

  constructor() { super() }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myForm =  new FormGroup({
      title: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      image : new FormControl('', Validators.compose([
      ]))
    });
    this.myForm.controls["image"].patchValue(this.article.image);
    
    //Emit changes each time the form changes
    this.addSubscriber(
      this.myForm.valueChanges.subscribe(res => {
        this.onChange.emit(res);
      })
    )
  }

  /**Patch the value of image once we recieve onUpload */
  onUpload(url:string) {
    this.myForm.controls["image"].setValue(url);
  }




}
