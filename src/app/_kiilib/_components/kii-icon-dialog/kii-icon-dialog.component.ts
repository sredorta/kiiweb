import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { KiiItemFormComponent } from '../_forms/kii-item-form/kii-item-form.component';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-kii-icon-dialog',
  templateUrl: './kii-icon-dialog.component.html',
  styleUrls: ['./kii-icon-dialog.component.scss']
})
export class KiiIconDialogComponent extends KiiBaseAbstract implements  OnInit {
  validator : Validators;
  @ViewChild(KiiItemFormComponent, {static:false}) iconForm : KiiItemFormComponent;

  iconClass : string[] = [];

  constructor(private dialogRef:MatDialogRef<KiiIconDialogComponent>) { super(); }

  ngOnInit() {
    this.validator = Validators.compose([
      Validators.required,
      Validators.pattern(/^fa[s|b] fa-.*$/)
    ]);
  }
  ngAfterViewInit() {
    this.addSubscriber(
      this.iconForm.myForm.valueChanges.subscribe(res => {
        if (res.result) {
          //Check that we have one space and that we start each word with fa
          let myClasses = res.result.split(' ');
          if (myClasses.length==2) {
            this.updateClasses(myClasses);
          }
        }
      })
    )
  }

  updateClasses(myClasses:string[]) {
    if (myClasses[0]=='fas' || myClasses[0]=='fab') {
      if (myClasses[1].match(/^fa-.*/)) {
        this.iconClass = myClasses;
      }
    }
  }

  onInsertIcon() {
    this.dialogRef.close(this.iconClass.join(" "));
  }

}
