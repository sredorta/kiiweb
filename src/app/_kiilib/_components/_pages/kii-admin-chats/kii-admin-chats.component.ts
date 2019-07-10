import { Component, OnInit } from '@angular/core';
import { KiiSocketService, IChatRoom, ChatDataType, IChatData, SocketEvents } from '../../../_services/kii-socket.service';
import { KiiBaseAbstract } from '../../../_abstracts/kii-base.abstract';

@Component({
  selector: 'kii-admin-chats',
  templateUrl: './kii-admin-chats.component.html',
  styleUrls: ['./kii-admin-chats.component.scss']
})
export class KiiAdminChatsComponent extends KiiBaseAbstract implements OnInit {

  rooms : IChatRoom[] = [];
  currentRoom: IChatRoom;
  
  initialStatus:boolean = true;

  constructor(private kiiSocket: KiiSocketService) { super() }

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
                if (myRoomIndex>=0) this.rooms[myRoomIndex].messages = res.object.messages; 
                break;
            default:
              break;   
          }    
        }

      })
    )
  }

  openRoom(room:IChatRoom) {
    this.initialStatus = false;
    console.log("openning room",room);
    this.currentRoom = room;
    this.kiiSocket.socket.emit(SocketEvents.CHAT_DATA,{room:this.currentRoom.id, type:ChatDataType.JoinRoom, object:null});

    //this.kiiSocket.socket.emit(SocketEvents.CHAT_DATA,{room:this.currentRoom, type:ChatDataType.StoredMessages, object:null});

  }


}
