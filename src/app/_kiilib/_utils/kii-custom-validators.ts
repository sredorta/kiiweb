import { FormControl, FormGroup, NgForm, FormGroupDirective } from '@angular/forms';

export class KiiCustomValidators {
    constructor() { }

  /**Validates password quality */
  static password(fc: FormControl) {
    if (fc.value == null) {
        return(null)
    }
    if (fc.value.length < 5 ) 
      return({minlength : true});
    var re = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,}';
    if (fc.value.match(re)) {
        return (null);
    } else {
        return({password : true})
    }
  }    

  /**Validates that password and passwordConfirm are matching */
  static checkPasswordsMatch(fc:FormControl | any) {
    if (fc.parent) {
        if (fc.parent.controls) {
            let fc1 = fc.parent.controls.password;
            let fc2 = fc.parent.controls.passwordConfirm;
            if (fc1.value != fc2.value) {
                return({checkPasswordsMatch: true});
            }
        }
    }
    return null;
  }
 /**Validates it's a boolean */
 static boolean(fc: FormControl) {
    if (fc.value == null) {
        return {boolean:true};
    }
    if (fc.value == true || fc.value == false)
        return null;
    return {boolean:true};
  }    

 /**Validates it's a boolean and true */
 static isBooleanTrue(fc: FormControl) {
    if (fc.value == null) {
        return {boolean:true};
    }
    if (fc.value == true)
        return null;
    return {boolean:true};
  }  

}
