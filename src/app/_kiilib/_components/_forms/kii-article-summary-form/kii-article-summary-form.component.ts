import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/_kiilib/_models/article';
import { KiiFormAbstract } from 'src/app/_kiilib/_abstracts/kii-form.abstract';
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
        Validators.required
      ]))
    });
    this.myForm.controls["image"].patchValue(this.article.image);
  }

  /**When we cancel */
  onCancel() {
    //this.myForm.reset();
  }

  onUpload(url:string) {
    console.log("onUpload !!!!");
    console.log(url);
    this.myForm.controls["image"].setValue(url);
  }

  /**When we submit */
  onSave() {
    if (this.myForm.valid) {
      console.log("EMITTING : ", this.myForm.value);
      this.kiiOnSubmit.emit(this.myForm.value);
    }
  }



}
