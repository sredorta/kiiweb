import { Component, OnInit, Output,EventEmitter, Inject, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MatSelectChange, MAT_DIALOG_DATA } from '@angular/material';
import { DiskType } from '../../_services/kii-api-disk.service';
import { KiiItemFormComponent } from '../_forms/kii-item-form/kii-item-form.component';

@Component({
  selector: 'app-kii-link-dialog',
  templateUrl: './kii-link-dialog.component.html',
  styleUrls: ['./kii-link-dialog.component.scss']
})
export class KiiLinkDialogComponent implements OnInit {
  validator : Validators;
  validatorTitle: Validators;

  disk: DiskType = DiskType.ALL;
  type:string = "default";


  @ViewChild('titleForm', {static:false}) title : KiiItemFormComponent

  constructor(private dialogRef:MatDialogRef<KiiLinkDialogComponent>,@Inject(MAT_DIALOG_DATA) data:any) { 
    this.disk = data.disk;
  }

  ngOnInit() {
    this.validator = Validators.compose([
      Validators.pattern("https://.*"),
    ]);
    this.validatorTitle = Validators.compose([
      Validators.required,Validators.minLength(2),
    ]);
  }

  onLink(url:string) {
    if (this.title.myForm.invalid) {
      this.title.validate();
    } else {
      console.log("Result is:",this.title.myForm.controls['result'].value);
      this.dialogRef.close({url:url,title:this.title.myForm.controls['result'].value,class:this.type});
    }
  }


  onClose() {
    this.dialogRef.close(null);
  }

  onTypeChange(event:MatSelectChange) {
    this.type = event.value;
  }

}
