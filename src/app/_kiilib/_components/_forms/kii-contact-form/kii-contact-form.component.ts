import { Component, OnInit } from '@angular/core';
import { KiiFormAbstract } from '../../../_abstracts/kii-form.abstract';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {KiiCustomValidators} from '../../../_utils/kii-custom-validators';
import { KiiMiscService } from '../../../_services/kii-misc.service';

@Component({
  selector: 'kii-contact-form',
  templateUrl: './kii-contact-form.component.html',
  styleUrls: ['./kii-contact-form.component.scss']
})
export class KiiContactFormComponent extends KiiFormAbstract implements OnInit {

  constructor(private kiiApi : KiiMiscService) { super() }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.myForm =  new FormGroup({    
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
      ])),
      subject: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])),
      message: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])),
    });
  }
  //Do send the message
  onSubmit(value:any) {
    if (this.myForm.valid) {
      this.isFormLoading = true;
      this.addSubscriber(
        this.kiiApi.contact(value).subscribe(res => {
          this.isFormLoading = false;
        }, () => this.isFormLoading = false)
      )
    } 
  }
}
