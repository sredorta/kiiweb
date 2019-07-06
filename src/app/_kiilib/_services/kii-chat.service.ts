import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

export interface IChatMessage {
  /**Actual text message */
  message:string;
  
  /**Date of the message */
  date:Date;  

  /**Defines if message is incomming or outgoing */
  iAmSender:boolean;

}

@Injectable({
  providedIn: 'root'
})
export class KiiChatService {
  /**Socket for comunication */
  socket: SocketIOClient.Socket;

  /**Chat messages */
  private _messages:Array<IChatMessage> = [];

  /**Contains observable with messages sent/recieved recieved */
  //private _message$ = new BehaviorSubject<any>({}); 
  private _messages$ = new BehaviorSubject<IChatMessage[]>([]); 

  constructor() {
    this.socket = io(environment.socketURL,{secure:true});

    this.socket.on('chat-echo', (msg:any) => {
      let result : IChatMessage = {
        message:msg,
        date:new Date(),
        iAmSender:false
      }
      this._messages.push(result); //Add message
      this._messages$.next(this._messages);
    })

  }

  /**Emits message and recieves same message */
  echo(msg:string) {
    let result : IChatMessage = {
      message:msg,
      date:new Date(),
      iAmSender:true
    }
    this._messages.push(result);
    this._messages$.next(this._messages);

    this.socket.emit("chat-echo",msg);
  }
  /**Returns current message recieved */
  onMessages() {
    return this._messages$;
  }





  sendMessage(msg:string) {
    this.socket.emit("chat-echo",{message:msg});
  }




}