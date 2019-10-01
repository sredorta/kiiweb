import { Component, OnInit, Input, Renderer2, ViewChild } from '@angular/core';
import { KiiFormAbstract } from '../../../_abstracts/kii-form.abstract';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Email } from '../../../_models/email';
import { KiiApiEmailService } from '../../../_services/kii-api-email.service';
import { AngularEditorComponent } from '../../angular-editor/angular-editor.component';
import { DiskType } from '../../../_services/kii-api-disk.service';

@Component({
  selector: 'kii-email-edit-form',
  templateUrl: './kii-email-edit-form.component.html',
  styleUrls: ['./kii-email-edit-form.component.scss']
})
export class KiiEmailEditFormComponent extends KiiFormAbstract implements OnInit {

  @Input() email:Email = new Email(null);

  previewEmail : Email = new Email(null);

  cancel:boolean = false;

  disk : DiskType = DiskType.EMAIL;

  /**Initial editor Config */
  editorConfig = {
    editable: true,
    spellcheck: true,
    height: '250px',
    minHeight: '200px',
    placeholder: 'Text ...',
    translate: 'no',
    uploadUrl: '/upload/editor/emails'};
    @ViewChild('editorHeader',{static:false}) editorHeader : AngularEditorComponent;

    @ViewChild('editorContent',{static:false}) editorContent : AngularEditorComponent;

  constructor(private kiiApiEmail: KiiApiEmailService, private renderer: Renderer2) { super() }

  ngOnInit() {
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
    this.myForm.controls["logo"].patchValue(this.email.logo);
    this.myForm.controls["backgroundHeader"].patchValue(this.email.backgroundHeader);
    this.myForm.controls["backgroundContent"].patchValue(this.email.backgroundContent);
    this.addSubscriber(
      this.myForm.controls["textColor"].valueChanges.subscribe(color => {
        this.setColor(color);
      })
    )
  }

  ngAfterViewInit() {
    this.setColor(this.email.textColor);
  }

  /**Sets color for textareas so that they match with email */
  setColor(color:string) {
    this.renderer.removeStyle(this.editorHeader.textArea.nativeElement, 'color');
    this.renderer.setStyle(this.editorHeader.textArea.nativeElement, 'color', color,1);
    this.renderer.removeStyle(this.editorContent.textArea.nativeElement, 'color');
    this.renderer.setStyle(this.editorContent.textArea.nativeElement, 'color', color,1);
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

  /**Sends email to current loggedin user for testing */
  onSendEmailTest() {
    this.addSubscriber(
      this.kiiApiEmail.sendToMe(this.previewEmail).subscribe(res => {
      })
    )
  }

}
