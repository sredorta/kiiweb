import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-kii-link-dialog',
  templateUrl: './kii-link-dialog.component.html',
  styleUrls: ['./kii-link-dialog.component.scss']
})
export class KiiLinkDialogComponent implements OnInit {
  validator : Validators;


  constructor(private dialogRef:MatDialogRef<KiiLinkDialogComponent>) { }

  ngOnInit() {
    this.validator = Validators.compose([
      Validators.pattern("https://.*"),
    ]);
  }

  onLink(url:string) {
    console.log("Sending url", url);
    this.dialogRef.close(url);
  }


  onClose() {
    this.dialogRef.close(null);
  }

}
