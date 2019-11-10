import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { KiiFormAbstract } from '../../../_abstracts/kii-form.abstract';
import { FormGroup, Validators, FormControl, ValidatorFn, NgForm } from '@angular/forms';

@Component({
  selector: 'kii-item-form',
  templateUrl: './kii-item-form.component.html',
  styleUrls: ['./kii-item-form.component.scss']
})
export class KiiItemFormComponent extends KiiFormAbstract implements OnInit {
  /**Contains current values for all languages: {fr:<content>, es:<content>...} */
  @Input() value : string = "";

  /**Input type: "input" (default), "textarea", "editor" */
  @Input() type : "input" | "textarea" | "editor" = "input";

  /**Determines if cancel save button should be shown */
  @Input() hasCancelSave : boolean = true;

  /**FontAwesome icon class in the prefix */
  @Input() icon : string = "fas fa-cog";

  /**Defines the validators */
  @Input() validators : ValidatorFn = Validators.compose([Validators.required]);
  

  /**Hint of the mat form field */
  @Input() hint : string = "";

  /**Placeholder of the mat form field */
  @Input() placeholder : string  = "";

  /**Label of the mat form field */
  @Input() label : string = "";


  /**When any control changes we emit new changes with content of the current language */
  @Output() onChange = new EventEmitter<string>();

  constructor() { super() }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myForm =  new FormGroup({
      result: new FormControl('', this.validators),
    });
  }

  /**Show any validation error */
  validate() {
    this.myForm.controls["result"].markAsTouched({onlySelf:true});
    this.myForm.controls["result"].updateValueAndValidity({onlySelf:true});
  }



}
