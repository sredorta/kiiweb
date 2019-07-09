import { Component, OnInit } from '@angular/core';
import { KiiSocketService, IChatRoom } from '../../../_services/kii-socket.service';
import { KiiBaseAbstract } from '../../../_abstracts/kii-base.abstract';

@Component({
  selector: 'kii-admin-chats',
  templateUrl: './kii-admin-chats.component.html',
  styleUrls: ['./kii-admin-chats.component.scss']
})
export class KiiAdminChatsComponent extends KiiBaseAbstract implements OnInit {

  rooms : IChatRoom[] = [];
  currentRoom: IChatRoom;

  constructor(private kiiSocket: KiiSocketService) { super() }

  ngOnInit() {
    //Ask to all connections if they have messages

    this.kiiSocket.startChatAdmin();
    this.addSubscriber(
      this.kiiSocket.onChatRooms().subscribe(res => {
        if (res.length) {
          console.log("Rooms are",res);
          console.log("Current is", res[0]);
          this.currentRoom = res[0];
          this.rooms = res;
          this.kiiSocket.sendChatData({room:res[0].id, currentRoom:res[0]})
        }
      })
    )
  }

  openRoom(room:IChatRoom) {
    console.log("openning room",room);
    this.currentRoom = room;
  }



  joinRoom(room:IChatRoom) {
    console.log("Joining room", room);
    this.kiiSocket.joinRoom(room.id);
  }

  leaveRoom(room:IChatRoom) {
    console.log("Leaving room", room);
    this.kiiSocket.leaveRoom(room.id);
  }

  deleteRoom(room:IChatRoom) {
    console.log("Deleting room",room);
    this.kiiSocket.deleteRoom(room.id);
  }

}
/*
1) Ask for the current chat rooms
2) Display list with current chat rooms
3) Admin selects a room and then joins



*/