import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'kii-chat-dialog',
  templateUrl: './kii-chat-dialog.component.html',
  styleUrls: ['./kii-chat-dialog.component.scss']
})
export class KiiChatDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<KiiChatDialogComponent>) { 
    }

  ngOnInit() {
     
  }

}
