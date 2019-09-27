import { Component, OnInit, Input } from '@angular/core';
import { KiiFormAbstract } from '../../../../_kiilib/_abstracts/kii-form.abstract';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {KiiCustomValidators} from '../../../_utils/kii-custom-validators';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { KiiTermsDialogComponent } from '../../kii-terms-dialog/kii-terms-dialog.component';


@Component({
  selector: 'kii-signup-form',
  templateUrl: './kii-signup-form.component.html',
  styleUrls: ['./kii-signup-form.component.scss']
})
export class KiiSignupFormComponent extends KiiFormAbstract implements OnInit {
  passwordInfo : string = "";
  /**Contains checkbox value */
  terms:boolean = false;

  constructor(private trans:TranslateService, private dialog: MatDialog) { super() }

  ngOnInit() {
    this.createForm();
    this.addSubscriber(this.trans.onLangChange.subscribe((res : any) => {
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
  /**Creates the form corresponding with the sharedSettings into account */
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
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        KiiCustomValidators.password
      ])),
      passwordConfirm: new FormControl('', Validators.compose([    //It needs to be called passwordConfirm so that validator works
        KiiCustomValidators.checkPasswordsMatch
      ])),
      terms: new FormControl('', Validators.compose([
        KiiCustomValidators.isBooleanTrue
      ])),  
    });

  }


  /**Opens temrs and conditions dialog */  
  openTermsAndConditionsDialog(): void {
    let dialogRef = this.dialog.open(KiiTermsDialogComponent, {
      panelClass: '',
      data:  null,
      maxHeight:'90vh',
      minHeight:'300px',
      minWidth:'320px',

    });
    dialogRef.afterClosed().subscribe(result => {
      this.myForm.patchValue({"terms" : result});
    });
  }

  /**Override abstract onSubmit due to checkbox checking */
  onSubmit(value:any) {
    this.myForm.controls["terms"].markAsDirty(); //Mark terms as dirty so that error appears
    if (this.myForm.valid) { //Validator doesn't work
      this.kiiOnSubmit.emit(value);
    } 
  }

}
