import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { KiiApiLanguageService } from './kii-api-language.service';

/**Socket auth data format */
export interface ISocketToken {
  token:string|null;
}

export interface ISocketLanguage {
  language:string;
}

/**Socket auth data format*/
export interface ISocketAuth extends ISocketToken, ISocketLanguage {
}

/**Chat message data format */
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
export class KiiSocketService {
  /**Socket for comunication */
  socket: SocketIOClient.Socket;

  /**Chat messages */
  private _chatMessages:Array<IChatMessage> = [];

  /**Contains observable with messages sent/recieved recieved */
  //private _message$ = new BehaviorSubject<any>({}); 
  private _chatMessages$ = new BehaviorSubject<IChatMessage[]>([]); 

  constructor(private kiiApiLang: KiiApiLanguageService) {
    this.socket = io(environment.socketURL,{secure:true});

    //When we recieve the settings we need to provide to server our token and our language
    this.socket.on('authenticate', () => {
      console.log("Recieved settings !!!");
      let data : ISocketAuth = {
        language: this.kiiApiLang.get(),
        token: localStorage.getItem('token'),
      }
      console.log("Sending authentication",data);
      this.socket.emit('authenticate',data);
    });


/*    this.socket.on('chat-echo', (msg:any) => {
      let result : IChatMessage = {
        message:msg,
        date:new Date(),
        iAmSender:false
      }
      this._chatMessages.push(result); //Add message
      this._chatMessages$.next(this._chatMessages);
    })*/

    this.socket.on('chat-message', (msg:any) => {
      let result : IChatMessage = {
        message:msg,
        date:new Date(),
        iAmSender:false
      }
      this._chatMessages.push(result); //Add message
      this._chatMessages$.next(this._chatMessages);
    })

  }

  /**Updates authentication */
  updateAuth() {
    let data : ISocketToken = {
      token: localStorage.getItem('token'),
    }
    this.socket.emit('update-token',data);
  }

  /**Updates language */
  updateLanguage() {
    let data : ISocketLanguage = {
      language : this.kiiApiLang.get()
    }
    this.socket.emit('update-language',data);
  }




  ///////////////////////////////////////////////////////
  // CHAT PART
  ///////////////////////////////////////////////////////

  /**Starts chat so that we get the welcome message */
  chatStart() {
    this.socket.emit('chat-start');
  }

  /**Emits message and recieves same message */
  chatSendEcho(msg:string) {
    let result : IChatMessage = {
      message:msg,
      date:new Date(),
      iAmSender:true
    }
    this._chatMessages.push(result);
    this._chatMessages$.next(this._chatMessages);

    this.socket.emit("chat-echo",msg);
  }

  /**Emits message to the chat */
  chatSendMessage(msg:string) {
    let result : IChatMessage = {
      message:msg,
      date:new Date(),
      iAmSender:true
    }
    this._chatMessages.push(result);
    this._chatMessages$.next(this._chatMessages);

    this.socket.emit("chat-message",msg);
  }


  /**Emits when user is writting or not in the chat */
  chatSetWritting(value:boolean) {
    this.socket.emit("chat-writting", value);
  }

  /**Returns current messages send and recieved */
  onChatMessages() {
    return this._chatMessages$;
  }

}