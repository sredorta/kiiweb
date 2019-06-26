import { Component, OnInit } from '@angular/core';
import { KiiFormAbstract } from '../../../../_kiilib/_abstracts/kii-form.abstract';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'kii-reset-password-form',
  templateUrl: './kii-reset-password-form.component.html',
  styleUrls: ['./kii-reset-password-form.component.scss']
})
export class KiiResetPasswordFormComponent extends KiiFormAbstract implements OnInit {

  constructor(private _location: Location) {super(); }

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
    });
  }

  goBack() {
    this._location.back();
  }
}
