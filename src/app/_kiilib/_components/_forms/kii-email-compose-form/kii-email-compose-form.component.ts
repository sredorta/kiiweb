import { Component, OnInit, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { KiiFormAbstract } from '../../../_abstracts/kii-form.abstract';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KiiApiEmailService } from '../../../_services/kii-api-email.service';
import { User } from '../../../_models/user';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';
import { Email } from '../../../_models/email';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'kii-email-compose-form',
  templateUrl: './kii-email-compose-form.component.html',
  styleUrls: ['./kii-email-compose-form.component.scss']
})
export class KiiEmailComposeFormComponent  extends KiiFormAbstract implements OnInit {

  constructor(private kiiApiEmail: KiiApiEmailService, private kiiApiAuth: KiiApiAuthService) { super(); }
  
  /**Tells if we need to hide input email or not */
  hideToEmail : boolean = true;

  /**Controls if preliminaryView is shown */
  showPreview : boolean = false;

  /**Contains the preview of the current email */
  @ViewChild('previewEmail',{static:false}) previewEmail : ElementRef;


  /**Contains all email models */
  @Input() emails : Email[] = [];
  
  /**Contains input user if any */
  @Input() user : User = null;

  /**When emails are loading we show spinner with this variable */
  isDataLoading : boolean = true;
  /**Contains current loggedin user */
  loggedInUser : User = new User(null);  

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.emails) {
      this.emails = changes.emails.currentValue;
    }
  }

  ngOnInit() {  
    if (this.user!=null) this.hideToEmail = false;
    this.createForm();
    this.addSubscriber(
    this.myForm.valueChanges.subscribe(res => {
      let myEmailModel = this.emails.find(obj=> obj.name == this.myForm.controls["emailModel"].value);
      if (myEmailModel) {
        this.showPreview = true;
        let myEmailTmp = new Email(JSON.parse(JSON.stringify(myEmailModel)));
        myEmailTmp.content = myEmailModel.content + this.myForm.controls["additionalHtml"].value;
        this.kiiApiEmail.preview(myEmailTmp).subscribe(html => {
          this.previewEmail.nativeElement.innerHTML = html;
        })
      } else {
        this.showPreview = false;
      }

    })
    )
  }
  createForm() {
    this.myForm =  new FormGroup({    
      sendToAll: new FormControl(true),
      email: new FormControl({value:'', disabled:true}, Validators.compose([
        Validators.required,
        Validators.email
      ])),
      additionalHtml: new FormControl({value:'', disabled:true}, Validators.compose([
      ])),
      emailModel: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });  
    if (this.user!=null) {
      this.myForm.controls["email"].patchValue(this.user.email);
      this.myForm.controls["email"].enable();
      this.myForm.controls["additionalHtml"].enable();
      this.myForm.controls["sendToAll"].patchValue(false);

    }
  }
  onSendToAllChange(change:MatCheckboxChange) {
    this.hideToEmail = !this.hideToEmail;
    if (change.checked) {
      this.myForm.controls["email"].disable();
      this.myForm.controls["additionalHtml"].disable();
    } else {
      this.myForm.controls["email"].enable();
      this.myForm.controls["additionalHtml"].enable();
    }
    console.log(change);
  }
  onSubmit(value) {
    console.log(value);
    if (this.myForm.valid) {
      console.log("VALID FORM !");
      let email = this.emails.find(obj=> obj.name == value.emailModel);
      if (email) {
        //Send email to all users or to specified email address
        if (value.sendToAll) {
          this.addSubscriber(
            this.kiiApiEmail.sendToAll(email).subscribe(res => {
            })
          )          
        } else {
          this.addSubscriber(
            this.kiiApiEmail.sendTo(value.email,value.additionalHtml,email).subscribe(res => {
            })
          )     
        }
      }
    }
  }
}
