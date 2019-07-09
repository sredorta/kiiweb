import { Injectable, Inject, PLATFORM_ID, NgZone, ChangeDetectorRef } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { KiiApiLanguageService } from './kii-api-language.service';
import { isPlatformBrowser } from '@angular/common';
import { IUser, User } from '../_models/user';
import { KiiApiAuthService } from './kii-api-auth.service';
import { Socket } from 'net';


/**Enumerator with all socket events*/
export enum SocketEvents {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  AUTHENTICATE = "authenticate",
  UPDATE_USER = "update-user-data",
  CHAT_ADMINS_DATA = "chat-admins",
  CHAT_ADMIN_ROOMS="chat-admin-rooms",
  CHAT_NEW_NOTIFY ="chat-new-notify",
  CHAT_DATA="chat-data",
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
}

  /**Chat data structure */
export  interface IChatData {
    room:string | null;
    type:ChatDataType;
    object:any;
}

export enum ChatDataType {
     Message = "message",
     Room = "room",
}



@Injectable({
  providedIn: 'root'
})
export class KiiSocketService {
  /**Socket for comunication */
  socket: SocketIOClient.Socket;


  /**Contains current chat messages */
  private _chatMessages:Array<IChatMessage> = [];
  private _chatMessages$ = new BehaviorSubject<IChatMessage[]>([]); 

  /**Chat admins */
  private _chatAdmins:Array<IChatUser> = [];
  private _chatAdmins$ = new BehaviorSubject<IChatUser[]>([]); 

  private _chatRooms$ = new BehaviorSubject<any[]>([]);

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
      this.loadOnChatAdminStart();  //Finds rooms....
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
      console.log("update auth sending event",data)
      this.socket.emit(SocketEvents.AUTHENTICATE,data);
    }
  }

  /**When we are asked to update auth user we update it so that alerts... are updated */
  private loadOnUpdateUser() {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.on(SocketEvents.UPDATE_USER, (user:IUser) => {
        //WARNING:: NGZone is required if we want to see change detection working !!!!
        this.ngZone.run((status: string) => {
          console.log("ON-USER-UPDATE !!!", user);
          this.kiiApiAuth.setLoggedInUser(new User(user));
        })
      })
    }
  }

  /**Get who are the chat admins at this moment and if they are connected */
  private loadOnChatAdminsData() {
    this.socket.on(SocketEvents.CHAT_ADMINS_DATA, (users:IChatUser[]) => {
      this.ngZone.run((status: string) => {
        console.log("Recieved chat admins",users);
        this._chatAdmins = users;
        this._chatAdmins$.next(this._chatAdmins);
      });
    })
  }

  /**Notifies all admin that a new chat has a first message */
  chatNewNotify(msg:IChatMessage) {
    this.socket.emit(SocketEvents.CHAT_NEW_NOTIFY,msg);
  }


  /**Loads chat data */
  private loadOnChatData() {
    this.socket.on(SocketEvents.CHAT_DATA, (data:IChatData) => {
      console.log("Recieved CHAT_DATA data",data);
      console.log("DATA !!!!")
      console.log(data);
      console.log("END DATA");
      this.ngZone.run((status: string) => {
           this._data$.next(data);
      })   
    });
  }

  /**Sends chat data to the room */
  sendChatData(data:IChatData) {
    console.log("Sending CHAT_DATA to room " + data.room)
    this.socket.emit(SocketEvents.CHAT_DATA,data);
  }

  getChatAdmins() {
    this.socket.emit(SocketEvents.CHAT_ADMINS_DATA);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  // ADMIN PART
  /////////////////////////////////////////////////////////////////////////////////////////////
  startChatAdmin() {
    this.socket.emit(SocketEvents.CHAT_ADMIN_ROOMS);
  }
  private loadOnChatAdminStart() {
    this.socket.on(SocketEvents.CHAT_ADMIN_ROOMS, (res:IChatRoom[]) => {
      console.log("Recieved CHAT_ADMIN_START data",res);
      this.ngZone.run((status: string) => {
          this._chatRooms$.next(res);
      })   
    });
  }

  /**Returns rooms for admin */
  onChatRooms() {
    return this._chatRooms$;
  }


  /**Returns data when recieved by socket */
  onDataChange() {
    return this._data$;
  }

  /**Returns chat admins */
  onChatAdmins() {
    return this._chatAdmins$;
  }










/*
  private loadOnChatRoomClose(callback: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.on(SocketEvents.CHAT_ROOM_CLOSE, () => {
        this.ngZone.run((status: string) => {
          console.log("The chat room is closed now !");
          callback();
        });
      })
    }
  }  

 

  addChatMessage(message:IChatMessage) {
    this._chatMessages.push(message);
    this._chatMessages$.next(this._chatMessages);
  }

  onChatMessages() {
    return this._chatMessages$;
  }

  getChatStoredMessages(room:string) {
    this.socket.emit(SocketEvents.CHAT_STORED_MESSAGES, room);
  }

  chatRooms() {
    console.log("Sending to socket CHAT_ROOM_UPDATE");
    this.socket.emit(SocketEvents.CHAT_ROOMS_UPDATE);
  }

  joinRoom(room:string) {
    console.log("Joining room:",room)
    this.socket.emit(SocketEvents.CHAT_JOIN,room);
  }

  leaveRoom(room:string) {
    console.log("Leaving room:",room);
    this.socket.emit(SocketEvents.CHAT_LEAVE, room);
  }

  deleteRoom(room:string) {
    console.log("Deleting room:",room);
    this.socket.emit(SocketEvents.CHAT_ROOM_DELETE, room);
  }


  chatSendEcho(msg:string) {
    /*let result : IChatMessage = {
      message:msg,
      date:new Date(),
      iAmSender:true,
      isBot:false
    }
    this._chatMessages.push(result);
    this._chatMessages$.next(this._chatMessages);
    this.socket.emit(SocketEvents.CHAT_ECHO,msg);
  }

  chatSetWritting(value:boolean) {
    this.socket.emit(SocketEvents.CHAT_WRITTING, value);
  }
*/

  /**Returns if this is the first chat message sent */
  /*isFirstChatMessage() {
    const myMsgs = this._chatMessages.filter(obj => obj.sender == this.socket.id);
    if (!myMsgs) return false;
    if (myMsgs.length == 1) return true;
    return false;
  }*/






  /**When we get a chat room assigned then we store all the data */
 /* private loadOnChatRoomAssign() {
    this.socket.on(SocketEvents.CHAT_ROOM_ASSIGN, (room:IChatRoom) => {
      console.log("Recieved room assigned!!!!!!!!!!!!!!!!!!", room);
      this.ngZone.run((status: string) => {
         this._chatRoom = room;
         this._chatRoom$.next(this._chatRoom);
      })   
    });
  }*/  


   
   
     /**Returns current chat rooms */
     /*onChatAllRooms() {
       return this._chatAllRooms$;
     }*/
   
     /**Returns current active room when there are updates */
     /*onChatRoom() {
       return this._chatRoom$;
     }*/
     //This is the missing part now....
   
     /**Adds message when somebody joins the chat */
     /*private loadOnChatJoin() {
       this.socket.on(SocketEvents.CHAT_JOIN, (msg:any) => {
         this.ngZone.run((status: string) => {
             let result : IChatMessage = {
               message:msg,
               date:new Date(),
               iAmSender:false,
               isBot:true
             }
             this._chatMessages.push(result); //Add message
             this._chatMessages$.next(this._chatMessages);
         })    
       });
     }*/
     /**Adds message when somebody joins the chat */
     /*private loadOnChatLeave() {
       this.socket.on(SocketEvents.CHAT_LEAVE, (msg:any) => {
         this.ngZone.run((status: string) => {
             let result : IChatMessage = {
               message:msg,
               date:new Date(),
               iAmSender:false,
               isBot:true
             }
             this._chatMessages.push(result); //Add message
             this._chatMessages$.next(this._chatMessages);
         })    
       })
     }*/


}