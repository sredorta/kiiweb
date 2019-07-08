import { Injectable, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { KiiApiLanguageService } from './kii-api-language.service';
import { isPlatformBrowser } from '@angular/common';
import { IUser, User } from '../_models/user';
import { KiiApiAuthService } from './kii-api-auth.service';


/**Enumerator with all socket events*/
export enum SocketEvents {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  AUTHENTICATE = "authenticate",
  UPDATE_USER = "update-user-data",
  JOIN_ROOM = "join-room",
  LEAVE_ROOM = "leave-room",
  LANGUAGE = "update-language",
  TOKEN = "update-token",
  CHAT_START = "chat-start",
  CHAT_ADMINS_DATA = "chat-admins",
  CHAT_NEW_NOTIFY ="chat-new-notify",
  CHAT_ROOM_UPDATE ="chat-room-update",
  CHAT_JOIN = "chat-join",
  CHAT_LEAVE = "chat-leave",
  CHAT_ECHO = "chat-echo",
  CHAT_BOT_MESSAGE= "chat-bot-message",
  CHAT_MESSAGE = "chat-message",
  CHAT_WRITTING = "chat-writting"

}

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
  /**Defines if the message is generated from bot */
  isBot:boolean;
}

export interface IChatUser {
  userId:number;
  firstName:string;
  avatar:string;
  connected:boolean;
}

interface IChatRoom {
  id:string;
  date:Date;
}

@Injectable({
  providedIn: 'root'
})
export class KiiSocketService {
  /**Socket for comunication */
  socket: SocketIOClient.Socket;




  /**Chat messages */
  private _chatMessages:Array<IChatMessage> = [];

  /**Chat admins */
  private _chatAdmins:Array<IChatUser> = [];
  private _chatAdmins$ = new BehaviorSubject<IChatUser[]>([]); 


  /**Contains observable with messages sent/recieved recieved */
  //private _message$ = new BehaviorSubject<any>({}); 
  private _chatMessages$ = new BehaviorSubject<IChatMessage[]>([]); 

  constructor(private kiiApiLang: KiiApiLanguageService,
              private kiiApiAuth: KiiApiAuthService,
              private ngZone: NgZone,
              @Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(platformId)) {
      //Start socket outside from Angular zone to fix issue #9098
      this.ngZone.runOutsideAngular(() => {
        this.socket = io(environment.socketURL,{secure:true});
      });
      this.loadOnAuthentication();  //Answers authentication requests
      this.loadOnUpdateUser();
      //Chat part
      this.loadOnChatMessage();     //Handles incoming chat messages
      this.loadOnChatBotMessage();     //Handles incoming chat messages
      this.loadOnChatAdminsData();  //Handles when we recieve the chat admins
      this.loadOnChatRoomsUpdate(); //When new user has joined a chat and written a first message
      this.loadOnChatJoin();
      this.loadOnChatLeave();
    }
  }

  ////////////////////////////////////////////////////////////////////////
  //Functions for handling socket events
  ////////////////////////////////////////////////////////////////////////
  /**Handles authentification of user */
  private loadOnAuthentication() {
    this.socket.on(SocketEvents.AUTHENTICATE, () => {
        this.updateAuth();
    });       
  }

  /**Adds message when we recieve it */
  private loadOnChatMessage() {
    this.socket.on(SocketEvents.CHAT_MESSAGE, (msg:any) => {
      let result : IChatMessage = {
        message:msg,
        date:new Date(),
        iAmSender:false,
        isBot:false
      }
      this._chatMessages.push(result); //Add message
      this._chatMessages$.next(this._chatMessages);
    })    
  }
  /**Adds bot message when we recieve it */
  private loadOnChatBotMessage() {
      this.socket.on(SocketEvents.CHAT_BOT_MESSAGE, (msg:any) => {
        let result : IChatMessage = {
          message:msg,
          date:new Date(),
          iAmSender:false,
          isBot:true
        }
        this._chatMessages.push(result); //Add message
        this._chatMessages$.next(this._chatMessages);
      })    
  }

  /**Adds message when somebody joins the chat */
  private loadOnChatJoin() {
    this.socket.on(SocketEvents.CHAT_JOIN, (msg:any) => {
      let result : IChatMessage = {
        message:msg,
        date:new Date(),
        iAmSender:false,
        isBot:true
      }
      this._chatMessages.push(result); //Add message
      this._chatMessages$.next(this._chatMessages);
    })    
  }
  /**Adds message when somebody joins the chat */
  private loadOnChatLeave() {
    this.socket.on(SocketEvents.CHAT_LEAVE, (msg:any) => {
      let result : IChatMessage = {
        message:msg,
        date:new Date(),
        iAmSender:false,
        isBot:true
      }
      this._chatMessages.push(result); //Add message
      this._chatMessages$.next(this._chatMessages);
    })    
  }

  /**Get who are the chat admins at this moment and if they are connected */
  private loadOnChatAdminsData() {
    this.socket.on(SocketEvents.CHAT_ADMINS_DATA, (users:IChatUser[]) => {
      console.log("Recieved chat admins",users);
      this._chatAdmins = users;
      this._chatAdmins$.next(this._chatAdmins);
    })
  }

  /**When we are asked to update auth user we update it so that alerts... are updated */
  private loadOnUpdateUser() {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.on(SocketEvents.UPDATE_USER, (user:IUser) => {
          console.log("ON-USER-UPDATE !!!", user);
          this.kiiApiAuth.setLoggedInUser(new User(user));
      })
    }
  }
  /**When a new chat is waiting for admins, only chat admins recieves such notif*/
  private loadOnChatRoomsUpdate() {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.on(SocketEvents.CHAT_ROOM_UPDATE, (rooms:IChatRoom[]) => {
        
          console.log("ON-ROOMS-UPDATE !!!", rooms);

      })
    }
  }
  ////////////////////////////////////////////////////////////////////////
  //Functions for triggering socket events
  ////////////////////////////////////////////////////////////////////////
  /**Updates authentication, only if we are on browser */
  updateAuth() {
    if (isPlatformBrowser(this.platformId)) {
      let data : ISocketAuth = {
        token: localStorage.getItem('token'),
        language: this.kiiApiLang.get()
      }
      console.log("update auth sending event",data)
      this.socket.emit(SocketEvents.AUTHENTICATE,data);
    }
  }

  /**Updates language, only if we are on browser */
  updateLanguage() {
    if (isPlatformBrowser(this.platformId)) {
      let data : ISocketLanguage = {
        language : this.kiiApiLang.get()
      }
      this.socket.emit(SocketEvents.LANGUAGE,data);
    }
  }

  ///////////////////////////////////////////////////////
  // CHAT PART
  // Chat part is protected as only is shown after a click that server cannot handle
  ///////////////////////////////////////////////////////

  /**Starts chat so that we get the welcome message */
  chatStart() {
    this.socket.emit(SocketEvents.CHAT_START);
  }

  /**Notifies all admin that a new chat is waiting */
  chatNewNotify(msg:string) {
    this.socket.emit(SocketEvents.CHAT_NEW_NOTIFY,msg);
  }


  /**Emits message and recieves same message */
  chatSendEcho(msg:string) {
    let result : IChatMessage = {
      message:msg,
      date:new Date(),
      iAmSender:true,
      isBot:false
    }
    this._chatMessages.push(result);
    this._chatMessages$.next(this._chatMessages);
    this.socket.emit(SocketEvents.CHAT_ECHO,msg);
  }

  /**Emits message to the chat */
  chatSendMessage(msg:string) {
    let result : IChatMessage = {
      message:msg,
      date:new Date(),
      iAmSender:true,
      isBot:false
    }
    this._chatMessages.push(result);
    this._chatMessages$.next(this._chatMessages);

    this.socket.emit(SocketEvents.CHAT_MESSAGE,msg);
  }


  /**Emits when user is writting or not in the chat */
  chatSetWritting(value:boolean) {
    this.socket.emit(SocketEvents.CHAT_WRITTING, value);
  }

  /**Returns current messages send and recieved */
  onChatMessages() {
    return this._chatMessages$;
  }
  /**Returns if this is the first chat message sent */
  isFirstChatMessage() {
    const myMsgs = this._chatMessages.filter(obj => obj.iAmSender == true);
    if (!myMsgs) return false;
    if (myMsgs.length == 1) return true;
    return false;
  }

  /**Returns chat admins */
  onChatAdmins() {
    return this._chatAdmins$;
  }

}