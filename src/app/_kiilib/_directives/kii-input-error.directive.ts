import { Directive,Inject,Input, PLATFORM_ID,ElementRef,Renderer2, OnDestroy} from '@angular/core';
import { ControlContainer, FormGroupDirective, AbstractControl } from '@angular/forms';
import { Observable, Subscription,merge, of } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[kiiInputError]'
})
export class KiiInputErrorDirective  implements OnDestroy{
  @Input('kiiInputError') controlName: string = "";
  control : AbstractControl;
  hasView = false;
  controlValue$: Observable<any>;
  controlSubscription: Subscription;
  hasSubmitted: boolean;
  span : any;  //Span element of the error message

  constructor(
      private _element: ElementRef,
      private _renderer: Renderer2,
      private _fg : ControlContainer,
      private _trans : TranslateService,
    @Inject(PLATFORM_ID) private _platformId) { }

  /**Get current form where directive is applied */  
  get form(){ return this._fg.formDirective ? (this._fg.formDirective as FormGroupDirective).form : null; }

  ngOnInit() {
    this.control = this.form.get(this.controlName);
    if (!this.control) {
      console.error("mat-error: Invalid form control provided in HTML");
    }
    let formSubmit$ = (<FormGroupDirective>this._fg).ngSubmit.pipe(map(res => this.hasSubmitted = true));
    this.controlValue$ =  merge(this.control.valueChanges, of(''), formSubmit$ );
    this.controlSubscription = this.controlValue$.subscribe((submit:boolean) => {
      //Reset password confirm if there is a change on password
      if (this.controlName == "password") {
        if (submit != true)
          if (this.form.get("passwordConfirm"))
            this.form.get("passwordConfirm").setValue("");
      }
      this.setError();
    });
  }


  //Shows or hides error depending on conditions
  private setError() {
    if (this.control.invalid && (this.control.dirty || this.hasSubmitted)) {
          this.getMessage(this.control.errors);
    } else {
      this._renderer.setStyle(this._element.nativeElement, 'display', 'none');
    }
  }  

  //Gets the translated message and calls addSpan
  private getMessage(error : any) {
    let myError : string;
    if (error.required) 
      myError = "kiilib.error.required";
    else if(error.minlength)
      myError = "kiilib.error.minlength";
    else if(error.maxlength)
      myError = "kiilib.error.maxlength";
    else if(error.min) 
      myError = "kiilib.error.min";
    else if(error.max) 
      myError = "kiilib.error.max";
    else if(error.email) 
      myError = "kiilib.error.email";
    //Send first attribute as this is most probably a custom attribute
    if (!myError) {
      myError = "kiilib.error." + Object.keys(error)[0];
    }  
    let subscr = this._trans.get(myError).subscribe(res => {
        //In case this is an unknown element we just give the default error
        if (res == myError) {
          let subscr2 = this._trans.get("kiilib.error.default").subscribe(res => {
              this.addSpan(res);
          });
          subscr2.unsubscribe()
        } else {
        //Known error
        this.addSpan(res);
        }
    });
    subscr.unsubscribe();
  }
  //Adds a span element on the mat-error component with the message provided
  private addSpan(message:string) {
    //Remove previous span if any

    if (this.span) {
      this._renderer.removeChild(this._element, this.span);
    }
    //Add span with correct error message
    this.span = this._renderer.createElement('span');
    const text = this._renderer.createText(message);
    this._renderer.appendChild(this.span,text);
    this._renderer.appendChild(this._element.nativeElement, this.span);
    //Show the error  
    this._renderer.removeStyle(this._element.nativeElement, 'display');
    
  }


  //Unsubscribe
  ngOnDestroy() {
    this.controlSubscription.unsubscribe();
  }
}
