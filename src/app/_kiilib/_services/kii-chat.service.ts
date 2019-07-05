import { Injectable } from '@angular/core';
//import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class KiiChatService {

  //constructor(private socket:Socket) {}

  sendMessage(msg:string) {
    //this.socket.emit("chat-new-message",msg);
  }

  getMessages() {
    //return this.socket.fromEvent("chat-new-message");
  }

}