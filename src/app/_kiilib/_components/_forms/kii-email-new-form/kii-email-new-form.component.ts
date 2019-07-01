import { Component, OnInit } from '@angular/core';
import { KiiFormAbstract } from '../../../_abstracts/kii-form.abstract';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'kii-email-new-form',
  templateUrl: './kii-email-new-form.component.html',
  styleUrls: ['./kii-email-new-form.component.scss']
})
export class KiiEmailNewFormComponent extends KiiFormAbstract implements OnInit {

  constructor() { super() }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.myForm =  new FormGroup({    
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
      ])),
    });
  }
}
