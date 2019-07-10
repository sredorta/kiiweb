import { Injectable, Inject, PLATFORM_ID, NgZone, ChangeDetectorRef } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { KiiApiLanguageService } from './kii-api-language.service';
import { isPlatformBrowser } from '@angular/common';
import { IUser, User } from '../_models/user';
import { KiiApiAuthService } from './kii-api-auth.service';
import { Socket } from 'socket.io-client';


/**Enumerator with all socket events*/
export enum SocketEvents {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  AUTHENTICATE = "authenticate",
  UPDATE_USER = "update-user-data",
  CHAT_ADMINS_DATA = "chat-admins",
  CHAT_DATA="chat-data",
    //CHAT_ADMIN_ROOMS="chat-admin-rooms",
  //CHAT_NEW_NOTIFY ="chat-new-notify",
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
  message:string;
  date:Date;  
  sender:string;
  room:string;
  isBot:boolean;
}

export interface IChatUser {
  userId:number;
  firstName:string;
  avatar:string;
  connected:boolean;
}

/**Room structure */
export interface IChatRoom {
    id:string;
    participants:number;
    date:Date;
    messages: IChatMessage[];
    language:string;
}

  /**Chat data structure */
export  interface IChatData {
    room:string | null;
    type:ChatDataType;
    object:any;
}

export enum ChatDataType {
     CreateRoom = "create-room",
     FirstMessage = "first-message",
     WaitingRooms = "waiting-rooms",
     JoinRoom = "join-room",
     LeaveRoom = "leave-room",
     StoredMessagesRequest = "stored-messages-request",
     StoredMessagesResponse = "stored-messages-response",
     Participants = "room-participants",
     Message = "message",
     Room = "room",
     Writting = "writting"
}



@Injectable({
  providedIn: 'root'
})
export class KiiSocketService {
  /**Socket for comunication */
  socket: SocketIOClient.Socket;


  /**Chat admins */
  private _chatAdmins:Array<IChatUser> = [];
  private _chatAdmins$ = new BehaviorSubject<IChatUser[]>([]); 

  /**Data provided by socket */
  private _data$ = new BehaviorSubject<IChatData>(null);


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
      this.loadOnUpdateUser();      //Updates user if required to show new alerts...
      this.loadOnChatAdminsData();  //Handles when we recieve the chat admins status
      this.loadOnChatData();        //Interface for all socket room to room data
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
  /**Updates authentication, only if we are on browser */
  updateAuth() {
    if (isPlatformBrowser(this.platformId)) {
      let data : ISocketAuth = {
        token: localStorage.getItem('token'),
        language: this.kiiApiLang.get()
      }
      this.socket.emit(SocketEvents.AUTHENTICATE,data);
    }
  }

  /**When we are asked to update auth user we update it so that alerts... are updated */
  private loadOnUpdateUser() {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.on(SocketEvents.UPDATE_USER, (user:IUser) => {
        //WARNING:: NGZone is required if we want to see change detection working !!!!
        this.ngZone.run((status: string) => {
          this.kiiApiAuth.setLoggedInUser(new User(user));
        })
      })
    }
  }

  /**Get who are the chat admins at this moment and if they are connected */
  private loadOnChatAdminsData() {
    this.socket.on(SocketEvents.CHAT_ADMINS_DATA, (users:IChatUser[]) => {
      this.ngZone.run((status: string) => {
        this._chatAdmins = users;
        this._chatAdmins$.next(this._chatAdmins);
      });
    })
  }


  /**Loads chat data */
  private loadOnChatData() {
    this.socket.on(SocketEvents.CHAT_DATA, (data:IChatData) => {
      console.log("Recieved CHAT_DATA",data);
      this.ngZone.run((status: string) => {
           this._data$.next(data);
      })   
    });
  }

  /**Sends chat data to the room */
  sendChatData(data:IChatData) {
    this.socket.emit(SocketEvents.CHAT_DATA,data);
  }

  getChatAdmins() {
    this.socket.emit(SocketEvents.CHAT_ADMINS_DATA);
  }

  chatStart() {
    this.socket.emit(SocketEvents.CHAT_DATA, {room:null, type:ChatDataType.CreateRoom, object:{language:this.kiiApiLang.get()}});
  }

  /**Leaves all the chats */
  chatLeave(room:IChatRoom) {
    this.socket.emit(SocketEvents.CHAT_DATA,{room:null, type:ChatDataType.LeaveRoom, object:{room:room}});
    this._data$.next(null);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  // OBSERVABLES
  /////////////////////////////////////////////////////////////////////////////////////////////

  /**Returns data when recieved by socket */
  onDataChange() {
    return this._data$;
  }

  /**Returns chat admins */
  onChatAdmins() {
    return this._chatAdmins$;
  }




}