import { Component, OnInit, Input } from '@angular/core';
import { KiiFormAbstract } from '../../../_abstracts/kii-form.abstract';
import { User } from 'src/app/_kiilib/_models/user';
import { TranslateService } from '@ngx-translate/core';
import { KiiApiLanguageService } from 'src/app/_kiilib/_services/kii-api-language.service';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { KiiCustomValidators } from '../../../_utils/kii-custom-validators';


@Component({
  selector: 'kii-profile-form',
  templateUrl: './kii-profile-form.component.html',
  styleUrls: ['./kii-profile-form.component.scss']
})
export class KiiProfileFormComponent extends KiiFormAbstract implements OnInit {

  /**Input user set for defaults */
  @Input() defaults : User = new User(null);  //Default values if any

  /**Variable that toggles the password modification visibility */
  modifyPassword : boolean = false;

  /**Contains the tooltip of the password info */
  passwordInfo : string = "";

  constructor(private kiiApiLang : KiiApiLanguageService,
            private trans: TranslateService) {super() }

  ngOnInit() {
    console.log("ngOnInit !!!");
    console.log(this.defaults);
    this.createForm();
    this.addSubscriber(this.kiiApiLang.onChange().subscribe((res : any) => {
      this.getPasswordInfo();
    }));
    this.getPasswordInfo();
  }


  /**Gets translated tooltip of password */
  getPasswordInfo() {
    this.addSubscriber(this.trans.get("kiilib.tooltip.password").subscribe(res => {
      this.passwordInfo = res;
    }));
  }

  /**Creates the form with all dependencies of shared */
  createForm() {
      this.myForm =  new FormGroup({
        firstName : new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])),
        lastName : new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])),        
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(5)
        ])),
        phone: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ])),
        mobile: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ])),
        passwordOld: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          KiiCustomValidators.password
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          KiiCustomValidators.password
        ])),
        passwordConfirm: new FormControl('', Validators.compose([    //It needs to be called passwordConfirm so that validator works
          KiiCustomValidators.checkPasswordsMatch
        ])),
      });
      this.disableControls();
  }

  /**Disables all controls */
  public disableControls() {
    Object.keys(this.myForm.controls).forEach(key => {
      this.myForm.get(key).disable();
    });
  }

  /**Returns if controls is enabled or disabled */
  isEnabled(control:string) {
    return this.myForm.controls[control].enabled;
  }
  /**Closes and resets password area */
  public resetPasswords() {
    Object.keys(this.myForm.controls).forEach(key => {
      if (key.search("password")>=0)
        this.myForm.get(key).reset();
        this.myForm.get(key).markAsPristine();
        this.myForm.get(key).markAsUntouched();
    })
    if (this.modifyPassword)
      this.togglePassword();
  }

  /**toggles enabled/disabled of control */
  toggleControl(control:string)  {
    if (this.myForm.controls[control].disabled) {
      this.myForm.controls[control].enable();
    } else {
      //Only allow redisable if value has not changed !
      if (this.myForm.controls[control].value != this.defaults[control]) {
        this.myForm.controls[control].patchValue(this.defaults[control]);
      }
      this.myForm.controls[control].disable();
    }
  }

  /**Toggle password visibility */
  togglePassword() {
    this.modifyPassword = !this.modifyPassword;
    if (this.modifyPassword == true)
      Object.keys(this.myForm.controls).forEach(key => {
        if (key.search("password")>=0)
          this.myForm.get(key).enable();
      })
    else
      Object.keys(this.myForm.controls).forEach(key => {
        if (key.search("password")>=0)
          this.myForm.get(key).disable();
      })   
  }    
}
