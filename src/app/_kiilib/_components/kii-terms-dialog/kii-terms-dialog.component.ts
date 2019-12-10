import { Component, OnInit, Inject, ContentChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogContainer} from '@angular/material';

//NOTE: Mat-dialog scrolls to the first tabable element in the dialog, so we need to do tabindex="-1" on buttons... if we want to scroll to top

@Component({
  selector: 'kii-terms-dialog',
  templateUrl: './kii-terms-dialog.component.html',
  styleUrls: ['./kii-terms-dialog.component.scss']
})
export class KiiTermsDialogComponent implements OnInit {
  hasButtons : boolean = true;
  constructor(
    public dialogRef: MatDialogRef<KiiTermsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      if (data)
        if (data.noButtons) { 
          this.hasButtons = false;
          console.log("hasButtons is", this.hasButtons)
        } 
    }

  ngOnInit() {
     
  }

}
