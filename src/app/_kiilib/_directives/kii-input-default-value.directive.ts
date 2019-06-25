import { Directive, Input, Self, HostBinding, HostListener, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ControlContainer, FormGroupDirective,  NgControl } from '@angular/forms';


@Directive({
  selector: '[kiiInputDefaultValue]'
})
export class KiiInputDefaultValueDirective {
  @Input('kiiInputDefaultValue') value: string = "";
  controlName : string = "";
  isDefaultSet : boolean = false;

   //Add the class kii-input-default-value if the value is matching the default
   @HostBinding('class.kii-input-default-value')
   get hasDefault() {
     return this.isDefaultSet;
   }
 
   //Listen to keyup events and do the checking to update the value
   @HostListener("keyup")
   keyEvent() {
     if (this.value != "") {
       if (this.ngControl.value != this.value) this.isDefaultSet = false;
       else this.isDefaultSet = true;
     }
   }
 
  //TODO: 
  //Issue happens on HostListener of DefaultValue directive
  //https://github.com/angular/universal/issues/844

   //Listen to reset of form and set default if reseted
   @HostListener('ngModelChange', ['$event']) 
   onModelChange(value: any) {
     if(event)
     if (!value && event.type == "reset") {
       setTimeout(()=>this._setDefaultValue());
     }
   }

 
  constructor(private ngControl: NgControl,private _fg: ControlContainer) { }

  get form(){ return this._fg.formDirective ? (this._fg.formDirective as FormGroupDirective).form : null; }

  ngOnInit() {
    if (this.ngControl) {
      this._setDefaultValue();
    }
  }

  //If input changes later we update the default
  ngOnChanges(changes : SimpleChanges) {
    this.value = changes.value.currentValue;
    this._setDefaultValue();
  }

  //Sets the default value and variable for class binding
  private _setDefaultValue() {
    if (this.value != "") {
      this.form.controls[this.ngControl.name].setValue(this.value,{emitEvent:false});
      this.isDefaultSet = true;
    }
  }
}
