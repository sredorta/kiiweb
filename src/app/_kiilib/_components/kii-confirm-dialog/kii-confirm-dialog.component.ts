import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-kii-confirm-dialog',
  templateUrl: './kii-confirm-dialog.component.html',
  styleUrls: ['./kii-confirm-dialog.component.scss']
})
export class KiiConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
