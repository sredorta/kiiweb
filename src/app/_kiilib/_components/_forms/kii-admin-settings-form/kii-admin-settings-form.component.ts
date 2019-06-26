import { Component, OnInit } from '@angular/core';
import { KiiFormAbstract } from '../../../_abstracts/kii-form.abstract';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { KiiCustomValidators } from '../../../_utils/kii-custom-validators';
import { KiiApiSettingService } from '../../../_services/kii-api-setting.service';
import { Setting } from '../../../_models/setting';

@Component({
  selector: 'kii-admin-settings-form',
  templateUrl: './kii-admin-settings-form.component.html',
  styleUrls: ['./kii-admin-settings-form.component.scss']
})
export class KiiAdminSettingsFormComponent extends KiiFormAbstract implements OnInit {

  /**Stores current settings */
  settings : Setting[] = [];

  constructor(public kiiApiSetting : KiiApiSettingService) { super() }

  ngOnInit() {
    this.createForm();
  }

  /**Creates all form controls */
  createForm() {
    this.myForm =  new FormGroup({    
      companyPhone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])),
      companyAddress: new FormControl('', Validators.compose([
        Validators.required, 
        Validators.minLength(10), 
        Validators.pattern(/^.*;.*;.*/)   
      ])),

    });
  }

  /**Handle internally the submit */
  onSubmit(value:any) {
    console.log(value);
    if (this.myForm.valid) {

    }
  }

}
