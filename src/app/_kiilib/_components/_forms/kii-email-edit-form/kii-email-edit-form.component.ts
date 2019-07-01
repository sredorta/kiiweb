import { Component, OnInit, Input } from '@angular/core';
import { KiiFormAbstract } from 'src/app/_kiilib/_abstracts/kii-form.abstract';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Email } from 'src/app/_kiilib/_models/email';

@Component({
  selector: 'kii-email-edit-form',
  templateUrl: './kii-email-edit-form.component.html',
  styleUrls: ['./kii-email-edit-form.component.scss']
})
export class KiiEmailEditFormComponent extends KiiFormAbstract implements OnInit {

  @Input() email:Email = new Email(null);

  previewEmail : Email = new Email(null);

  constructor() { super() }

  ngOnInit() {
    this.previewEmail = JSON.parse(JSON.stringify(this.email));
    this.createForm();
  }

  createForm() {
    this.myForm =  new FormGroup({    
      headerColor: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/(^#[0-9A-F]{6}$)/i)
      ])),
      footerColor: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/(^#[0-9A-F]{6}$)/i)
      ])),
      textColor: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/(^#[0-9A-F]{6}$)/i)
      ])),
      titleColor: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/(^#[0-9A-F]{6}$)/i)
      ])),      
      subtitleColor: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/(^#[0-9A-F]{6}$)/i)
      ])),     
      title: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),         
      subtitle: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),         
      logo: new FormControl('', Validators.compose([
      ])),
    });  
    this.myForm.controls["logo"].patchValue(this.email.logo)
  }
  /**When we upload a logo */
  onLogoUpload(image:string) {
    this.myForm.controls["logo"].patchValue(image);
  }

  /**When we want to see the preview */
  onPreviewRefresh() {
    let result = JSON.parse(JSON.stringify(this.email));
    Object.keys(this.myForm.controls).forEach( (key) => {
      result[key] = this.myForm.controls[key].value;
    });
    this.previewEmail = result;

  }

}
