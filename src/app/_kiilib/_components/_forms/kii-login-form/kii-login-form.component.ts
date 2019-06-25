import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KiiFormAbstract } from '../../../_abstracts/kii-form.abstract';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {KiiCustomValidators} from '../../../_utils/kii-custom-validators';

@Component({
  selector: 'kii-login-form',
  templateUrl: './kii-login-form.component.html',
  styleUrls: ['./kii-login-form.component.scss']
})
export class KiiLoginFormComponent extends KiiFormAbstract implements OnInit {

  constructor() { super(); }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myForm =  new FormGroup({    
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(5)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        KiiCustomValidators.password
      ])),
      keepconnected: new FormControl(false,null),
    });
  }
}
