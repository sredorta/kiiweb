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

  constructor(private kiiSocket: KiiSocketService) { super() }

  ngOnInit() {
    //Ask for open chat rooms just in case we had missed them
    this.kiiSocket.chatRooms();

    this.addSubscriber(
      this.kiiSocket.onChatRooms().subscribe(res => {
        this.rooms = res;
        console.log("Current chat rooms",res);
      })
    )
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