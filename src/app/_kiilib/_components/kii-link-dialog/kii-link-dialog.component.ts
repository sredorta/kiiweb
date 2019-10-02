import { Component, OnInit, Output,EventEmitter, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MatSelectChange, MAT_DIALOG_DATA } from '@angular/material';
import { DiskType } from '../../_services/kii-api-disk.service';

@Component({
  selector: 'app-kii-link-dialog',
  templateUrl: './kii-link-dialog.component.html',
  styleUrls: ['./kii-link-dialog.component.scss']
})
export class KiiLinkDialogComponent implements OnInit {
  validator : Validators;

  disk: DiskType = DiskType.ALL;
  type:string = "default";

  constructor(private dialogRef:MatDialogRef<KiiLinkDialogComponent>,@Inject(MAT_DIALOG_DATA) data:any) { 
    this.disk = data.disk;
    console.log("Disk is:", this.disk);
  }

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
