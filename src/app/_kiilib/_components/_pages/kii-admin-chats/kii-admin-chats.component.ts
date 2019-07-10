import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { KiiSocketService, IChatRoom, ChatDataType, IChatData, SocketEvents } from '../../../_services/kii-socket.service';
import { KiiBaseAbstract } from '../../../_abstracts/kii-base.abstract';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material';
import { KiiChatDialogComponent } from '../../kii-chat-dialog/kii-chat-dialog.component';

@Component({
  selector: 'kii-admin-chats',
  templateUrl: './kii-admin-chats.component.html',
  styleUrls: ['./kii-admin-chats.component.scss']
})
export class KiiAdminChatsComponent extends KiiBaseAbstract implements OnInit {

  rooms : IChatRoom[] = [];
  currentRoom: IChatRoom;
  
  initialStatus:boolean = true;

  constructor(private kiiSocket: KiiSocketService,
              private dialog: MatDialog,
              @Inject(PLATFORM_ID) private platformId: any) { super() }

  ngOnInit() {
    //Ask for all current open rooms
    this.kiiSocket.socket.emit(SocketEvents.CHAT_DATA,{room:null, type:ChatDataType.WaitingRooms, object:null});
    
    this.addSubscriber(
      this.kiiSocket.onDataChange().subscribe(res => {
        console.log("RECIEVED ONDATACHANGE",res);
        if (res) {
          switch (res.type) {
            case ChatDataType.WaitingRooms:
                this.rooms = res.object.rooms;
                this.currentRoom = res.object.rooms[0];
                //Ask for the messages of the first client of the room
                for (let room of this.rooms) {
                  this.kiiSocket.socket.emit(SocketEvents.CHAT_DATA,{room:room.id, type:ChatDataType.StoredMessagesRequest, object:null});
                }
                break;
            case ChatDataType.StoredMessagesResponse:
                let myRoomIndex = this.rooms.findIndex(obj=> obj.id == res.room);
                if (myRoomIndex>=0) {
                  this.rooms[myRoomIndex].messages = res.object.messages; 
                  this.rooms[myRoomIndex].language = res.object.language;
                }
                break;
            default:
              break;   
          }    
        }

      })
    )
  }

  openRoom(room:IChatRoom) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentRoom = room;
      this.kiiSocket.socket.emit(SocketEvents.CHAT_DATA,{room:this.currentRoom.id, type:ChatDataType.JoinRoom, object:{room:this.currentRoom}});
  
      let dialogRef = this.dialog.open(KiiChatDialogComponent, {
        panelClass: 'kii-chat-dialog',
        minWidth:'300px',
        maxWidth:'700px',
        width:'80vw',
        data:  {messages:this.currentRoom.messages,room:this.currentRoom, isAdmin:true} 
      });
      dialogRef.afterClosed().subscribe(result => {
         //Leave all rooms
         this.kiiSocket.chatLeave();

      });
    }
  }


}
