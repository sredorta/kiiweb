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

  /**Initial editor Config */
  editorConfig = {
    editable: true,
    spellcheck: true,
    height: '250px',
    minHeight: '200px',
    placeholder: 'Text ...',
    translate: 'no',
    uploadUrl: '/upload/editor/emails'};

  constructor() { super() }

  ngOnInit() {
    console.log("Initial email",this.email);
    this.previewEmail = JSON.parse(JSON.stringify(this.email));
    this.createForm();

    Object.keys(this.myForm.controls).forEach( (key) => {
      this.addSubscriber(
        this.myForm.controls[key].valueChanges.subscribe(res => {
          this.refreshPreview();
        })
      )
    })

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
      header: new FormControl('', Validators.compose([
      ])),  
      backgroundHeader: new FormControl('', Validators.compose([
      ])),        
      content: new FormControl('', Validators.compose([
      ])),      
      backgroundContent: new FormControl('', Validators.compose([
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

  /**When we change the backgroundHeader */
  onBackgroundHeader(image:string) {
    this.myForm.controls["backgroundHeader"].patchValue(image);
  }

  /**When we change the backgroundHeader */
  onBackgroundContent(image:string) {
    this.myForm.controls["backgroundContent"].patchValue(image);
  }

  /**Refreshes the preview*/
  refreshPreview() {
    let result = JSON.parse(JSON.stringify(this.email));
    Object.keys(this.myForm.controls).forEach( (key) => {
      result[key] = this.myForm.controls[key].value;
    });
    this.previewEmail = result;
  }

}
