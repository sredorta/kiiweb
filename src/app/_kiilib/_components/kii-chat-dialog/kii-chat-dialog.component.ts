import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IChatMessage, IChatRoom } from '../../_services/kii-socket.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'kii-chat-dialog',
  templateUrl: './kii-chat-dialog.component.html',
  styleUrls: ['./kii-chat-dialog.component.scss']
})
export class KiiChatDialogComponent implements OnInit {
  isAdmin:boolean;
  messages:IChatMessage[] = [];
  room: IChatRoom = {id:null,    
    participants:0,
    date:new Date(),
    messages: [],
    language: environment.languages[0]};
  constructor(public dialogRef: MatDialogRef<KiiChatDialogComponent>,@Inject(MAT_DIALOG_DATA) data) { 
      if (data.isAdmin) this.isAdmin = data.isAdmin;
      if (data.messages)this.messages = data.messages;
      if (data.room) this.room = data.room;
    }

  ngOnInit() {
     
  }

}
