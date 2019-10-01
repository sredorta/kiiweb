import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-kii-link-dialog',
  templateUrl: './kii-link-dialog.component.html',
  styleUrls: ['./kii-link-dialog.component.scss']
})
export class KiiLinkDialogComponent implements OnInit {
  validator : Validators;

  type:string = "default";

  constructor(private dialogRef:MatDialogRef<KiiLinkDialogComponent>) { }

  ngOnInit() {
    this.validator = Validators.compose([
      Validators.pattern("https://.*"),
    ]);
  }

  onLink(url:string) {
    this.dialogRef.close({url:url,class:this.type});
  }


  onClose() {
    this.dialogRef.close(null);
  }

  onTypeChange(event:MatSelectChange) {
    this.type = event.value;
  }

}
